#!/usr/bin/env node
/**
 * Script to import talks from a YouTube playlist into Directus
 * Run with: node scripts/import-youtube-talks.js
 *
 * Required environment variables:
 * - DIRECTUS_URL: Your Directus instance URL
 * - DIRECTUS_TOKEN: Your Directus admin token
 * - YOUTUBE_API_KEY: Your YouTube Data API v3 key
 */

import 'dotenv/config';
import { createDirectus, rest, staticToken, createItem, readItems } from '@directus/sdk';

const PLAYLIST_ID = 'PLWbFNILTRyqPXvk5RARPgT_P5cm7-gmyI';
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';

const directus = createDirectus(process.env.DIRECTUS_URL)
    .with(staticToken(process.env.DIRECTUS_TOKEN))
    .with(rest());

/**
 * Fetch all videos from a YouTube playlist
 */
async function fetchPlaylistItems(playlistId) {
    const videos = [];
    let nextPageToken = null;

    do {
        const params = new URLSearchParams({
            part: 'snippet,contentDetails',
            playlistId: playlistId,
            maxResults: '50',
            key: YOUTUBE_API_KEY
        });

        if (nextPageToken) {
            params.append('pageToken', nextPageToken);
        }

        const response = await fetch(`${YOUTUBE_API_BASE}/playlistItems?${params}`);
        const data = await response.json();

        if (data.error) {
            throw new Error(`YouTube API error: ${data.error.message}`);
        }

        videos.push(...data.items);
        nextPageToken = data.nextPageToken;
    } while (nextPageToken);

    return videos;
}

/**
 * Fetch video details (for actual publish date)
 */
async function fetchVideoDetails(videoIds) {
    const details = {};

    // YouTube API allows max 50 IDs per request
    for (let i = 0; i < videoIds.length; i += 50) {
        const batch = videoIds.slice(i, i + 50);
        const params = new URLSearchParams({
            part: 'snippet',
            id: batch.join(','),
            key: YOUTUBE_API_KEY
        });

        const response = await fetch(`${YOUTUBE_API_BASE}/videos?${params}`);
        const data = await response.json();

        if (data.error) {
            throw new Error(`YouTube API error: ${data.error.message}`);
        }

        for (const video of data.items) {
            details[video.id] = video.snippet;
        }
    }

    return details;
}

/**
 * Parse video title to extract talk title and event name
 * Common patterns:
 * - "Talk Title - Event Name"
 * - "Talk Title | Event Name"
 * - "Talk Title at Event Name"
 * - "Event Name: Talk Title"
 */
function parseVideoTitle(title) {
    // Try various separators
    const separators = [' - ', ' | ', ' at ', ': '];

    for (const sep of separators) {
        if (title.includes(sep)) {
            const parts = title.split(sep);
            if (parts.length === 2) {
                // Check if it's "Event: Title" or "Title - Event" pattern
                if (sep === ': ') {
                    return { title: parts[1].trim(), event: parts[0].trim() };
                }
                return { title: parts[0].trim(), event: parts[1].trim() };
            }
        }
    }

    // No separator found, use full title
    return { title: title.trim(), event: 'Conference' };
}

/**
 * Get existing YouTube IDs from Directus to avoid duplicates
 */
async function getExistingYoutubeIds() {
    try {
        const talks = await directus.request(
            readItems('talks', {
                fields: ['youtube_id'],
                filter: { youtube_id: { _nnull: true } }
            })
        );
        return new Set(talks.map(t => t.youtube_id));
    } catch (error) {
        console.warn('Could not fetch existing talks:', error.message);
        return new Set();
    }
}

async function main() {
    console.log('Fetching videos from YouTube playlist...');
    console.log(`Playlist: https://www.youtube.com/playlist?list=${PLAYLIST_ID}\n`);

    // Fetch playlist items
    const playlistItems = await fetchPlaylistItems(PLAYLIST_ID);
    console.log(`Found ${playlistItems.length} videos in playlist\n`);

    if (playlistItems.length === 0) {
        console.log('No videos found in playlist.');
        return;
    }

    // Fetch video details for actual publish dates
    const videoIds = playlistItems.map(item => item.snippet.resourceId.videoId);
    console.log('Fetching video details...');
    const videoDetails = await fetchVideoDetails(videoIds);

    // Get existing YouTube IDs to avoid duplicates
    const existingIds = await getExistingYoutubeIds();
    console.log(`Found ${existingIds.size} existing talks with YouTube IDs\n`);

    // Process and insert videos
    let imported = 0;
    let skipped = 0;

    for (const item of playlistItems) {
        const videoId = item.snippet.resourceId.videoId;

        // Skip if already exists
        if (existingIds.has(videoId)) {
            console.log(`Skipping (duplicate): ${item.snippet.title}`);
            skipped++;
            continue;
        }

        const details = videoDetails[videoId] || item.snippet;
        const { title, event } = parseVideoTitle(item.snippet.title);

        // Use video's actual publish date
        const publishDate = details.publishedAt
            ? details.publishedAt.split('T')[0]
            : new Date().toISOString().split('T')[0];

        const talk = {
            status: 'draft', // Set as draft so user can review
            title: title,
            event: event,
            date: publishDate,
            description: item.snippet.description?.substring(0, 1000) || '',
            youtube_id: videoId,
            thumbnail: item.snippet.thumbnails?.maxres?.url
                || item.snippet.thumbnails?.high?.url
                || item.snippet.thumbnails?.default?.url
        };

        try {
            await directus.request(createItem('talks', talk));
            console.log(`Imported: "${title}" (${event})`);
            imported++;
        } catch (error) {
            console.error(`Failed to import "${title}":`, error.message);
        }
    }

    console.log(`\n--- Summary ---`);
    console.log(`Imported: ${imported}`);
    console.log(`Skipped (duplicates): ${skipped}`);
    console.log(`\nTalks imported as "draft" status. Review and publish them in Directus.`);
    console.log(`Directus URL: ${process.env.DIRECTUS_URL}`);
}

main().catch(error => {
    console.error('Import failed:', error);
    process.exit(1);
});
