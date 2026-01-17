import { createDirectus, rest, createItem, staticToken } from '@directus/sdk';
import 'dotenv/config';

// Validate required environment variables
const requiredEnvVars = ['DIRECTUS_URL', 'DIRECTUS_TOKEN'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
    console.error('Error: Missing required environment variables:');
    missingVars.forEach(varName => console.error(`  - ${varName}`));
    console.error('\nPlease set these variables in your .env file or environment.');
    process.exit(1);
}

const directus = createDirectus(process.env.DIRECTUS_URL)
    .with(staticToken(process.env.DIRECTUS_TOKEN))
    .with(rest());

// Only including posts that don't already exist in the collection
const posts = [
    {
        title: "Look what's back for 2017, Hackference",
        slug: "hackference-2017-announcement",
        origin: "https://medium.com/@ukmadlz/look-whats-back-for-2017-hackference-c49ea025eef4",
        published_date: "2017-02-22"
    },
    {
        title: "Blogging without the hosting",
        slug: "blogging-without-the-hosting",
        origin: "https://medium.com/codait/blogging-without-the-hosting-1b792fdda8f7",
        published_date: "2017-02-10"
    },
    {
        title: "The Last Hackference",
        slug: "the-last-hackference",
        origin: "https://medium.com/@ukmadlz/the-last-hackference-26c0fafa07e2",
        published_date: "2016-11-15"
    }
];

async function fetchMediumContent(url) {
    try {
        // Medium blocks scraping, so we'll fetch from the RSS feed content instead
        const feedUrl = 'https://medium.com/feed/@ukmadlz';
        const response = await fetch(feedUrl);
        const xml = await response.text();

        // Find the item matching this URL
        const urlPattern = url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const itemMatch = xml.match(new RegExp(`<item>[\\s\\S]*?<link>${urlPattern}</link>[\\s\\S]*?<content:encoded><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></content:encoded>[\\s\\S]*?</item>`, 'i'));

        if (itemMatch) {
            let content = itemMatch[1];
            // Clean up the content
            content = content.replace(/<script[\s\S]*?<\/script>/gi, '');
            content = content.replace(/<style[\s\S]*?<\/style>/gi, '');
            content = content.replace(/<!--[\s\S]*?-->/g, '');
            return content.trim();
        }

        // Try alternate URL format for codait posts
        if (url.includes('codait')) {
            const codaitFeedUrl = 'https://medium.com/feed/codait';
            const codaitResponse = await fetch(codaitFeedUrl);
            const codaitXml = await codaitResponse.text();

            const codaitMatch = codaitXml.match(new RegExp(`<item>[\\s\\S]*?<link>${urlPattern}</link>[\\s\\S]*?<content:encoded><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></content:encoded>[\\s\\S]*?</item>`, 'i'));

            if (codaitMatch) {
                let content = codaitMatch[1];
                content = content.replace(/<script[\s\S]*?<\/script>/gi, '');
                content = content.replace(/<style[\s\S]*?<\/style>/gi, '');
                content = content.replace(/<!--[\s\S]*?-->/g, '');
                return content.trim();
            }
        }

        return null;
    } catch (error) {
        console.error(`Error fetching ${url}:`, error.message);
        return null;
    }
}

async function fetchAllMediumContent() {
    // Fetch the RSS feed once and extract all content
    const feedUrl = 'https://medium.com/feed/@ukmadlz';
    try {
        const response = await fetch(feedUrl);

        if (!response.ok) {
            console.error(`HTTP error ${response.status} ${response.statusText} fetching ${feedUrl}`);
            return {};
        }

        const xml = await response.text();

        const contentMap = {};

        // Extract all items
        const items = xml.match(/<item>[\s\S]*?<\/item>/gi) || [];

        for (const item of items) {
            const linkMatch = item.match(/<link>(https:\/\/medium\.com[^<]+)<\/link>/);
            const contentMatch = item.match(/<content:encoded><!\[CDATA\[([\s\S]*?)\]\]><\/content:encoded>/);

            if (linkMatch && contentMatch) {
                let content = contentMatch[1];
                content = content.replace(/<script[\s\S]*?<\/script>/gi, '');
                content = content.replace(/<style[\s\S]*?<\/style>/gi, '');
                content = content.replace(/<!--[\s\S]*?-->/g, '');
                // Remove query string from URL for matching
                const cleanUrl = linkMatch[1].split('?')[0];
                contentMap[cleanUrl] = content.trim();
            }
        }

        return contentMap;
    } catch (error) {
        console.error('Error fetching RSS feed:', error.message);
        return {};
    }
}

async function importPosts() {
    console.log('Starting Medium blog import...\n');

    // Fetch all content from RSS feed
    console.log('Fetching RSS feed content...\n');
    const contentMap = await fetchAllMediumContent();
    console.log(`Found ${Object.keys(contentMap).length} posts in RSS feed\n`);

    for (const post of posts) {
        console.log(`Processing: ${post.title}`);

        // Get content from the map
        const content = contentMap[post.origin];

        if (!content) {
            console.log(`  - Skipping (content not found in RSS feed)\n`);
            continue;
        }

        try {
            const result = await directus.request(
                createItem('posts', {
                    title: post.title,
                    slug: post.slug,
                    content: content,
                    origin: post.origin,
                    published_date: post.published_date,
                    status: 'published'
                })
            );
            console.log(`  - Added successfully (ID: ${result.id})\n`);
        } catch (error) {
            if (error.errors?.[0]?.extensions?.code === 'RECORD_NOT_UNIQUE') {
                console.log(`  - Already exists, skipping\n`);
            } else {
                console.error(`  - Error:`, error.errors?.[0]?.message || error.message, '\n');
            }
        }

        // Small delay
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log('Import complete!');
}

importPosts();
