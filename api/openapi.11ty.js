export default class {
    data() {
        return {
            permalink: '/api/openapi.json'
        };
    }

    render(data) {
        const { site } = data;

        const spec = {
            openapi: '3.1.0',
            info: {
                title: `${site.author} API`,
                description: 'Static JSON API endpoints for site data',
                version: '1.0.0',
                contact: {
                    name: site.author,
                    email: site.email,
                    url: site.url
                }
            },
            servers: [
                {
                    url: site.url,
                    description: 'Production'
                }
            ],
            paths: {
                '/api/social.json': {
                    get: {
                        summary: 'Get social and contact information',
                        operationId: 'getSocial',
                        tags: ['Social'],
                        responses: {
                            '200': {
                                description: 'Social and contact information',
                                content: {
                                    'application/json': {
                                        schema: {
                                            $ref: '#/components/schemas/SocialResponse'
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                '/api/talks.json': {
                    get: {
                        summary: 'Get latest talks',
                        operationId: 'getTalks',
                        tags: ['Talks'],
                        responses: {
                            '200': {
                                description: 'List of latest talks',
                                content: {
                                    'application/json': {
                                        schema: {
                                            $ref: '#/components/schemas/TalksResponse'
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                '/api/posts.json': {
                    get: {
                        summary: 'Get latest blog posts',
                        operationId: 'getPosts',
                        tags: ['Posts'],
                        responses: {
                            '200': {
                                description: 'List of latest blog posts',
                                content: {
                                    'application/json': {
                                        schema: {
                                            $ref: '#/components/schemas/PostsResponse'
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                '/api/jobs.json': {
                    get: {
                        summary: 'Get work history',
                        operationId: 'getJobs',
                        tags: ['Jobs'],
                        responses: {
                            '200': {
                                description: 'List of jobs (work history)',
                                content: {
                                    'application/json': {
                                        schema: {
                                            $ref: '#/components/schemas/JobsResponse'
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            components: {
                schemas: {
                    Meta: {
                        type: 'object',
                        properties: {
                            generated_at: {
                                type: 'string',
                                format: 'date-time',
                                description: 'Timestamp when the response was generated'
                            },
                            version: {
                                type: 'string',
                                description: 'API version'
                            }
                        },
                        required: ['generated_at', 'version']
                    },
                    MetaWithPagination: {
                        allOf: [
                            { $ref: '#/components/schemas/Meta' },
                            {
                                type: 'object',
                                properties: {
                                    total_count: {
                                        type: 'integer',
                                        description: 'Total number of items available'
                                    },
                                    limit: {
                                        type: 'integer',
                                        description: 'Maximum number of items returned'
                                    }
                                },
                                required: ['total_count', 'limit']
                            }
                        ]
                    },
                    Social: {
                        type: 'object',
                        properties: {
                            name: {
                                type: 'string',
                                description: 'Platform name'
                            },
                            url: {
                                type: 'string',
                                format: 'uri',
                                description: 'Profile URL'
                            },
                            icon: {
                                type: 'string',
                                description: 'Icon identifier'
                            }
                        },
                        required: ['name', 'url', 'icon']
                    },
                    SocialData: {
                        type: 'object',
                        properties: {
                            name: {
                                type: 'string',
                                description: 'Full name'
                            },
                            description: {
                                type: 'string',
                                description: 'Bio or tagline'
                            },
                            email: {
                                type: 'string',
                                format: 'email',
                                description: 'Contact email'
                            },
                            url: {
                                type: 'string',
                                format: 'uri',
                                description: 'Website URL'
                            },
                            socials: {
                                type: 'array',
                                items: {
                                    $ref: '#/components/schemas/Social'
                                },
                                description: 'Social media profiles'
                            }
                        },
                        required: ['name', 'description', 'email', 'url', 'socials']
                    },
                    SocialResponse: {
                        type: 'object',
                        properties: {
                            meta: {
                                $ref: '#/components/schemas/Meta'
                            },
                            data: {
                                $ref: '#/components/schemas/SocialData'
                            }
                        },
                        required: ['meta', 'data']
                    },
                    Talk: {
                        type: 'object',
                        properties: {
                            id: {
                                type: 'integer',
                                description: 'Unique identifier'
                            },
                            title: {
                                type: 'string',
                                description: 'Talk title'
                            },
                            slug: {
                                type: 'string',
                                description: 'URL-friendly identifier'
                            },
                            event: {
                                type: 'string',
                                description: 'Event name'
                            },
                            event_url: {
                                type: ['string', 'null'],
                                format: 'uri',
                                description: 'Event website URL'
                            },
                            date: {
                                type: 'string',
                                format: 'date',
                                description: 'Date of the talk'
                            },
                            location: {
                                type: ['string', 'null'],
                                description: 'Event location'
                            },
                            description: {
                                type: ['string', 'null'],
                                description: 'Talk description'
                            },
                            youtube_id: {
                                type: ['string', 'null'],
                                description: 'YouTube video ID'
                            },
                            youtube_url: {
                                type: ['string', 'null'],
                                format: 'uri',
                                description: 'YouTube video URL'
                            },
                            slides_url: {
                                type: ['string', 'null'],
                                format: 'uri',
                                description: 'Slides URL'
                            },
                            thumbnail: {
                                type: ['string', 'null'],
                                format: 'uri',
                                description: 'Thumbnail image URL'
                            },
                            url: {
                                type: 'string',
                                format: 'uri',
                                description: 'Full URL to talk page'
                            }
                        },
                        required: ['id', 'title', 'slug', 'event', 'date', 'url']
                    },
                    TalksResponse: {
                        type: 'object',
                        properties: {
                            meta: {
                                $ref: '#/components/schemas/MetaWithPagination'
                            },
                            data: {
                                type: 'array',
                                items: {
                                    $ref: '#/components/schemas/Talk'
                                }
                            }
                        },
                        required: ['meta', 'data']
                    },
                    Post: {
                        type: 'object',
                        properties: {
                            id: {
                                type: 'integer',
                                description: 'Unique identifier'
                            },
                            title: {
                                type: 'string',
                                description: 'Post title'
                            },
                            slug: {
                                type: 'string',
                                description: 'URL-friendly identifier'
                            },
                            published_date: {
                                type: 'string',
                                format: 'date-time',
                                description: 'Publication date'
                            },
                            excerpt: {
                                type: ['string', 'null'],
                                description: 'Short excerpt or summary'
                            },
                            image: {
                                type: ['string', 'null'],
                                format: 'uri',
                                description: 'Featured image URL'
                            },
                            origin: {
                                type: ['string', 'null'],
                                description: 'Original publication source'
                            },
                            url: {
                                type: 'string',
                                format: 'uri',
                                description: 'Full URL to blog post'
                            }
                        },
                        required: ['id', 'title', 'slug', 'published_date', 'url']
                    },
                    PostsResponse: {
                        type: 'object',
                        properties: {
                            meta: {
                                $ref: '#/components/schemas/MetaWithPagination'
                            },
                            data: {
                                type: 'array',
                                items: {
                                    $ref: '#/components/schemas/Post'
                                }
                            }
                        },
                        required: ['meta', 'data']
                    },
                    Job: {
                        type: 'object',
                        properties: {
                            company: {
                                type: 'string',
                                description: 'Company name'
                            },
                            title: {
                                type: 'string',
                                description: 'Job title'
                            },
                            logo: {
                                type: ['string', 'null'],
                                format: 'uri',
                                description: 'Company logo URL'
                            },
                            description: {
                                type: ['string', 'null'],
                                description: 'Job description (HTML)'
                            },
                            start_date: {
                                type: 'string',
                                format: 'date',
                                description: 'Employment start date'
                            },
                            end_date: {
                                type: ['string', 'null'],
                                format: 'date',
                                description: 'Employment end date'
                            },
                            current: {
                                type: 'boolean',
                                description: 'Whether this is a current position'
                            }
                        },
                        required: ['company', 'title', 'start_date', 'current']
                    },
                    JobsResponse: {
                        type: 'object',
                        properties: {
                            meta: {
                                $ref: '#/components/schemas/Meta'
                            },
                            data: {
                                type: 'array',
                                items: {
                                    $ref: '#/components/schemas/Job'
                                }
                            }
                        },
                        required: ['meta', 'data']
                    }
                }
            }
        };

        return JSON.stringify(spec, null, 2);
    }
}
