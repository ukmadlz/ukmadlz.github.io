#!/usr/bin/env node
/**
 * Script to create the talks collection in Directus
 * Run with: node scripts/setup-directus-talks.js
 * Run with seed data: node scripts/setup-directus-talks.js --seed
 *
 * Required environment variables:
 * - DIRECTUS_URL: Your Directus instance URL
 * - DIRECTUS_TOKEN: Your Directus admin token
 */

import 'dotenv/config';
import { createDirectus, rest, staticToken, createCollection, createField, createItem } from '@directus/sdk';

const directus = createDirectus(process.env.DIRECTUS_URL)
    .with(staticToken(process.env.DIRECTUS_TOKEN))
    .with(rest());

async function createTalksCollection() {
    console.log('Creating talks collection...');

    try {
        // Create the collection
        await directus.request(createCollection({
            collection: 'talks',
            schema: {
                schema: 'public',
                name: 'talks',
                comment: 'Conference talks and presentations'
            },
            meta: {
                collection: 'talks',
                icon: 'mic',
                note: 'Conference talks, presentations, and speaking engagements',
                display_template: '{{title}} - {{event}}',
                archive_field: 'status',
                archive_value: 'archived',
                unarchive_value: 'published',
                sort_field: 'sort',
                singleton: false
            }
        }));
        console.log('Talks collection created!');

        // Create fields
        const fields = [
            {
                field: 'status',
                type: 'string',
                meta: {
                    interface: 'select-dropdown',
                    options: {
                        choices: [
                            { text: 'Published', value: 'published' },
                            { text: 'Draft', value: 'draft' },
                            { text: 'Archived', value: 'archived' }
                        ]
                    },
                    display: 'labels',
                    display_options: {
                        choices: [
                            { text: 'Published', value: 'published', foreground: '#FFFFFF', background: '#00C897' },
                            { text: 'Draft', value: 'draft', foreground: '#18222F', background: '#D3DAE4' },
                            { text: 'Archived', value: 'archived', foreground: '#FFFFFF', background: '#F7971C' }
                        ]
                    },
                    width: 'half'
                },
                schema: {
                    default_value: 'draft'
                }
            },
            {
                field: 'sort',
                type: 'integer',
                meta: {
                    interface: 'input',
                    hidden: true,
                    width: 'half'
                }
            },
            {
                field: 'title',
                type: 'string',
                meta: {
                    interface: 'input',
                    options: {
                        placeholder: 'Talk title'
                    },
                    width: 'full',
                    required: true
                }
            },
            {
                field: 'slug',
                type: 'string',
                meta: {
                    interface: 'input',
                    options: {
                        placeholder: 'url-friendly-slug (auto-generated if empty)'
                    },
                    width: 'full',
                    note: 'Leave empty to auto-generate from title and event'
                }
            },
            {
                field: 'event',
                type: 'string',
                meta: {
                    interface: 'input',
                    options: {
                        placeholder: 'Event/Conference name'
                    },
                    width: 'half',
                    required: true
                }
            },
            {
                field: 'event_url',
                type: 'string',
                meta: {
                    interface: 'input',
                    options: {
                        placeholder: 'https://example.com/event'
                    },
                    width: 'half'
                }
            },
            {
                field: 'date',
                type: 'date',
                meta: {
                    interface: 'datetime',
                    options: {
                        includeSeconds: false
                    },
                    width: 'half',
                    required: true
                }
            },
            {
                field: 'location',
                type: 'string',
                meta: {
                    interface: 'input',
                    options: {
                        placeholder: 'City, Country'
                    },
                    width: 'half'
                }
            },
            {
                field: 'description',
                type: 'text',
                meta: {
                    interface: 'input-multiline',
                    options: {
                        placeholder: 'Brief description of the talk'
                    },
                    width: 'full'
                }
            },
            {
                field: 'youtube_id',
                type: 'string',
                meta: {
                    interface: 'input',
                    options: {
                        placeholder: 'YouTube video ID (e.g., dQw4w9WgXcQ)'
                    },
                    width: 'half',
                    note: 'Just the video ID, not the full URL'
                }
            },
            {
                field: 'slides_url',
                type: 'string',
                meta: {
                    interface: 'input',
                    options: {
                        placeholder: 'https://slides.com/...'
                    },
                    width: 'half',
                    note: 'Link to slides (SlideShare, Speaker Deck, etc.)'
                }
            },
            {
                field: 'thumbnail',
                type: 'string',
                meta: {
                    interface: 'input',
                    options: {
                        placeholder: 'Thumbnail URL (optional, auto-generated from YouTube if empty)'
                    },
                    width: 'full'
                }
            }
        ];

        for (const field of fields) {
            console.log(`Creating field: ${field.field}`);
            await directus.request(createField('talks', field));
        }

        console.log('All fields created!');
        console.log('\nTalks collection schema:');
        console.log('- id (auto-generated UUID)');
        console.log('- status (published/draft/archived)');
        console.log('- sort (integer for ordering)');
        console.log('- title (string, required)');
        console.log('- slug (string, auto-generated if empty)');
        console.log('- event (string, required)');
        console.log('- event_url (string, optional)');
        console.log('- date (date, required)');
        console.log('- location (string, optional)');
        console.log('- description (text, optional)');
        console.log('- youtube_id (string, optional)');
        console.log('- slides_url (string, optional)');
        console.log('- thumbnail (string, optional)');

    } catch (error) {
        if (error.errors?.[0]?.extensions?.code === 'COLLECTION_ALREADY_EXISTS') {
            console.log('Talks collection already exists!');
        } else {
            console.error('Error creating collection:', error);
            throw error;
        }
    }
}

async function seedTalks() {
    console.log('\nSeeding initial talks data...');

    // Sample talks data - expand this with data from your YouTube playlist
    // YouTube Playlist: https://www.youtube.com/playlist?list=PLWbFNILTRyqPXvk5RARPgT_P5cm7-gmyI
    const talks = [
        {
            status: 'published',
            sort: 1,
            title: 'NoSQL is a lie',
            event: 'CrunchConf',
            date: '2016-10-14',
            location: 'Budapest, Hungary',
            description: 'Why NoSQL grew up the way it did and why it\'s just different databases for different jobs.',
            slides_url: 'https://www.slideshare.net/MikeElsmore/nosql-is-a-lie-55969474'
        },
        {
            status: 'published',
            sort: 2,
            title: 'NoSQL is a lie',
            event: 'GOTO Berlin',
            date: '2015-12-02',
            location: 'Berlin, Germany',
            description: 'Why NoSQL grew up the way it did and why it\'s just different databases for different jobs.'
        },
        {
            status: 'published',
            sort: 3,
            title: 'NoSQL is a lie',
            event: 'Topconf Tallinn',
            date: '2015-11-18',
            location: 'Tallinn, Estonia',
            description: 'Why NoSQL grew up the way it did and why it\'s just different databases for different jobs.'
        },
        {
            status: 'published',
            sort: 4,
            title: 'Port 80 All The Things',
            event: 'Droidcon Bucharest',
            date: '2016-03-12',
            location: 'Bucharest, Romania',
            description: 'A talk about networking, APIs, and web development.'
        },
        {
            status: 'published',
            sort: 5,
            title: 'What the hack!?',
            event: 'HackCon EU',
            date: '2015-08-29',
            location: 'Europe',
            description: 'A talk about hackathons and the hacking community.'
        },
        {
            status: 'published',
            sort: 6,
            title: 'No Service',
            event: 'Conference',
            date: '2016-01-01',
            description: 'A talk about service architecture and serverless computing.'
        }
    ];

    for (const talk of talks) {
        try {
            await directus.request(createItem('talks', talk));
            console.log(`Created talk: ${talk.title} at ${talk.event}`);
        } catch (error) {
            console.error(`Failed to create talk ${talk.title}:`, error.message);
        }
    }

    console.log('\nDone seeding talks!');
    console.log('\nNote: You can add more talks from your YouTube playlist:');
    console.log('https://www.youtube.com/playlist?list=PLWbFNILTRyqPXvk5RARPgT_P5cm7-gmyI');
}

async function main() {
    try {
        await createTalksCollection();

        const args = process.argv.slice(2);
        if (args.includes('--seed')) {
            await seedTalks();
        } else {
            console.log('\nRun with --seed flag to also populate initial talk data');
        }
    } catch (error) {
        console.error('Setup failed:', error);
        process.exit(1);
    }
}

main();
