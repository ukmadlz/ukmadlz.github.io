import directus from './directus.js';
import { readItems } from '@directus/sdk';

// Generate a URL-friendly slug from title and event
function generateSlug(title, event, date) {
    const base = `${title}-${event}`.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    // Add year to make slugs unique for repeated talks
    const year = new Date(date).getFullYear();
    return `${base}-${year}`;
}

export default async () => {
    try {
        const talks = await directus.request(
            readItems("talks", {
                fields: ["*"],
                filter: { status: { _eq: 'published' } },
                sort: ["-date"],
            })
        );

        return talks.map(talk => {
            // Generate slug if not provided
            if (!talk.slug) {
                talk.slug = generateSlug(talk.title, talk.event, talk.date);
            }

            // Generate YouTube thumbnail if youtube_id exists and no custom thumbnail
            if (talk.youtube_id && !talk.thumbnail) {
                talk.thumbnail = `https://img.youtube.com/vi/${talk.youtube_id}/maxresdefault.jpg`;
            }

            // Generate YouTube URL if youtube_id exists
            if (talk.youtube_id) {
                talk.youtube_url = `https://www.youtube.com/watch?v=${talk.youtube_id}`;
            }

            return talk;
        });
    } catch (error) {
        console.warn('Failed to fetch talks from Directus:', error.message);
        return [];
    }
}
