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

const posts = [
    {
        title: "You should build an SDK",
        slug: "you-should-build-an-sdk-infobip",
        origin: "https://www.infobip.com/developers/blog/you-should-build-an-sdk",
        published_date: "2024-01-10"
    },
    {
        title: "TechMids October 2023 Summary",
        slug: "techmids-october-2023-summary",
        origin: "https://www.infobip.com/developers/blog/techmids-october-2023-summary",
        published_date: "2023-11-03"
    },
    {
        title: "DevTalks Cluj 2023 Summary",
        slug: "devtalks-cluj-2023-summary",
        origin: "https://www.infobip.com/developers/blog/devtalks-cluj-2023-summary",
        published_date: "2023-10-13"
    },
    {
        title: "DevRelCon 2022 Prague",
        slug: "devrelcon-2022-prague",
        origin: "https://www.infobip.com/developers/blog/devrelcon-2022-prague",
        published_date: "2022-12-19"
    }
];

async function fetchPostContent(url) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            console.error(`  - HTTP error ${response.status} ${response.statusText} fetching ${url}`);
            return null;
        }

        const html = await response.text();

        // Infobip developer blog uses article content
        const contentMatch = html.match(/<article[^>]*class="[^"]*blog-post[^"]*"[^>]*>([\s\S]*?)<\/article>/i) ||
                            html.match(/<div[^>]*class="[^"]*blog-content[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<(?:div|footer|aside)/i) ||
                            html.match(/<div[^>]*class="[^"]*post-content[^"]*"[^>]*>([\s\S]*?)<\/div>/i) ||
                            html.match(/<div[^>]*class="[^"]*entry-content[^"]*"[^>]*>([\s\S]*?)<\/div>/i) ||
                            html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);

        if (contentMatch) {
            let content = contentMatch[1];
            // Clean up the content
            content = content.replace(/<script[\s\S]*?<\/script>/gi, '');
            content = content.replace(/<style[\s\S]*?<\/style>/gi, '');
            content = content.replace(/<!--[\s\S]*?-->/g, '');
            content = content.replace(/<nav[\s\S]*?<\/nav>/gi, '');
            content = content.replace(/<header[\s\S]*?<\/header>/gi, '');
            content = content.replace(/<footer[\s\S]*?<\/footer>/gi, '');
            return content.trim();
        }
        return null;
    } catch (error) {
        console.error(`Error fetching ${url}:`, error.message);
        return null;
    }
}

async function importPosts() {
    console.log('Starting Infobip blog import...\n');

    for (const post of posts) {
        console.log(`Processing: ${post.title}`);

        // Fetch the full content
        const content = await fetchPostContent(post.origin);

        if (!content) {
            console.log(`  - Skipping (could not fetch content)\n`);
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

        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log('Import complete!');
}

importPosts();
