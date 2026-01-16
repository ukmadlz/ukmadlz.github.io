#!/usr/bin/env node
/**
 * Script to create the jobs collection in Directus
 * Run with: node scripts/setup-directus-jobs.js
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

async function createJobsCollection() {
    console.log('Creating jobs collection...');

    try {
        // Create the collection
        await directus.request(createCollection({
            collection: 'jobs',
            schema: {
                schema: 'public',
                name: 'jobs',
                comment: 'Work history/resume jobs'
            },
            meta: {
                collection: 'jobs',
                icon: 'work',
                note: 'Jobs/work history for the resume page',
                display_template: '{{company}} - {{title}}',
                archive_field: 'status',
                archive_value: 'archived',
                unarchive_value: 'published',
                sort_field: 'sort',
                singleton: false
            }
        }));
        console.log('Jobs collection created!');

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
                field: 'company',
                type: 'string',
                meta: {
                    interface: 'input',
                    options: {
                        placeholder: 'Company name'
                    },
                    width: 'half',
                    required: true
                }
            },
            {
                field: 'title',
                type: 'string',
                meta: {
                    interface: 'input',
                    options: {
                        placeholder: 'Job title'
                    },
                    width: 'half',
                    required: true
                }
            },
            {
                field: 'start_date',
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
                field: 'end_date',
                type: 'date',
                meta: {
                    interface: 'datetime',
                    options: {
                        includeSeconds: false
                    },
                    width: 'half'
                }
            },
            {
                field: 'current',
                type: 'boolean',
                meta: {
                    interface: 'boolean',
                    options: {
                        label: 'Currently employed here'
                    },
                    width: 'half'
                },
                schema: {
                    default_value: false
                }
            },
            {
                field: 'description',
                type: 'text',
                meta: {
                    interface: 'input-rich-text-html',
                    options: {
                        toolbar: ['bold', 'italic', 'link', 'bullist', 'numlist']
                    },
                    width: 'full'
                }
            },
            {
                field: 'logo',
                type: 'uuid',
                meta: {
                    interface: 'file-image',
                    width: 'half',
                    note: 'Company logo (optional)'
                },
                schema: {}
            }
        ];

        for (const field of fields) {
            console.log(`Creating field: ${field.field}`);
            await directus.request(createField('jobs', field));
        }

        console.log('All fields created!');
        console.log('\nJobs collection schema:');
        console.log('- id (auto-generated UUID)');
        console.log('- status (published/draft/archived)');
        console.log('- sort (integer for ordering)');
        console.log('- company (string, required)');
        console.log('- title (string, required)');
        console.log('- start_date (date, required)');
        console.log('- end_date (date, optional)');
        console.log('- current (boolean)');
        console.log('- description (rich text)');
        console.log('- logo (file/image)');

    } catch (error) {
        if (error.errors?.[0]?.extensions?.code === 'COLLECTION_ALREADY_EXISTS') {
            console.log('Jobs collection already exists!');
        } else {
            console.error('Error creating collection:', error);
            throw error;
        }
    }
}

async function seedJobs() {
    console.log('\nSeeding initial jobs data...');

    const jobs = [
        {
            status: 'published',
            sort: 1,
            company: 'Directus',
            title: 'Developer Experience Engineer',
            start_date: '2024-11-01',
            current: true,
            description: 'Improving the developer experience for Directus around extensions, including tooling development for JS/TS extensions and managing outsourced engineers.'
        },
        {
            status: 'published',
            sort: 2,
            company: 'Elsmore Consulting',
            title: 'Freelance',
            start_date: '2024-07-01',
            current: true,
            description: 'Senior engineering, architecture, SDK maintenance, API governance, and content creation. Clients include Mozilla Foundation (Node.js, MariaDB, React) and SOCOTEC UK (Java Spring Boot, Angular, Kafka).'
        },
        {
            status: 'published',
            sort: 3,
            company: 'Infobip',
            title: 'Senior Developer Advocate',
            start_date: '2022-11-01',
            end_date: '2024-05-01',
            current: false,
            description: 'SDK development and maintenance, sample applications, booth demos, internal tooling, documentation migration, community management, and event organization.'
        },
        {
            status: 'published',
            sort: 4,
            company: 'InfoSum',
            title: 'Lead Developer Advocate',
            start_date: '2022-05-01',
            end_date: '2022-10-01',
            current: false,
            description: 'API product launch integration, developer documentation portal creation, and initial SDK development.'
        },
        {
            status: 'published',
            sort: 5,
            company: 'CloudQuery',
            title: 'Senior Developer Advocate',
            start_date: '2021-10-01',
            end_date: '2022-04-01',
            current: false,
            description: 'Content generation and community ecosystem development.'
        },
        {
            status: 'published',
            sort: 6,
            company: 'Optic Labs',
            title: 'Developer Advocate',
            start_date: '2021-05-01',
            end_date: '2021-07-01',
            current: false,
            description: 'Designed and released initial SDKs, prototyping, documentation, and live streaming.'
        },
        {
            status: 'published',
            sort: 7,
            company: 'Logz.io',
            title: 'Developer Advocate',
            start_date: '2020-02-01',
            end_date: '2021-02-01',
            current: false,
            description: 'Streaming outreach, videocast production, and technical content creation for open-source observability tools.'
        },
        {
            status: 'published',
            sort: 8,
            company: 'Packt Publishing',
            title: 'Lead Developer',
            start_date: '2018-05-01',
            end_date: '2020-01-01',
            current: false,
            description: 'Microservice architecture redesign and team leadership.'
        },
        {
            status: 'published',
            sort: 9,
            company: 'BuiltByMe',
            title: 'Contractor',
            start_date: '2017-04-01',
            end_date: '2019-04-01',
            current: false,
            description: 'Node.js and PHP development, SDKs, and developer relations consulting.'
        },
        {
            status: 'published',
            sort: 10,
            company: 'IBM',
            title: 'Developer Advocate',
            start_date: '2014-09-01',
            end_date: '2017-04-01',
            current: false,
            description: 'Cloud Data Services with focus on European developer outreach.'
        },
        {
            status: 'published',
            sort: 11,
            company: 'Blubolt',
            title: 'Developer',
            start_date: '2014-04-01',
            end_date: '2014-09-01',
            current: false,
            description: 'Full-stack eCommerce platform integrations.'
        },
        {
            status: 'published',
            sort: 12,
            company: 'Winning Moves Ltd',
            title: 'PHP Developer',
            start_date: '2011-12-01',
            end_date: '2014-02-01',
            current: false,
            description: 'Web applications and internal CRM mobile interfaces.'
        },
        {
            status: 'published',
            sort: 13,
            company: 'BAM Agency',
            title: 'Web Developer',
            start_date: '2011-01-01',
            end_date: '2011-12-01',
            current: false,
            description: 'Web development services.'
        },
        {
            status: 'published',
            sort: 14,
            company: 'JB Global Ltd',
            title: 'SEO Specialist',
            start_date: '2010-06-01',
            end_date: '2010-12-01',
            current: false,
            description: 'Search engine optimization services.'
        },
        {
            status: 'published',
            sort: 15,
            company: '10Yetis/Petoba',
            title: 'Web Developer & Support',
            start_date: '2008-11-01',
            end_date: '2010-06-01',
            current: false,
            description: 'Web development and technical support.'
        }
    ];

    for (const job of jobs) {
        try {
            await directus.request(createItem('jobs', job));
            console.log(`Created job: ${job.company} - ${job.title}`);
        } catch (error) {
            console.error(`Failed to create job ${job.company}:`, error.message);
        }
    }

    console.log('\nDone seeding jobs!');
}

async function main() {
    try {
        await createJobsCollection();

        const args = process.argv.slice(2);
        if (args.includes('--seed')) {
            await seedJobs();
        } else {
            console.log('\nRun with --seed flag to also populate initial job data');
        }
    } catch (error) {
        console.error('Setup failed:', error);
        process.exit(1);
    }
}

main();
