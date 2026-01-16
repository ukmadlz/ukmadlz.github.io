import { createDirectus, rest, createItem, staticToken } from '@directus/sdk';
import 'dotenv/config';

const directus = createDirectus(process.env.DIRECTUS_URL)
    .with(staticToken(process.env.DIRECTUS_TOKEN))
    .with(rest());

const posts = [
    {
        title: "Instrumenting Node.js for Tracing in Jaeger",
        slug: "jaeger-tracing-nodejs",
        origin: "https://logz.io/blog/jaeger-tracing-nodejs/",
        published_date: "2020-12-13"
    },
    {
        title: "Serverless Monitoring: Logs, Metrics & Traces with AWS Lambda",
        slug: "serverless-monitoring-logs-metrics-traces-with-aws-lambda",
        origin: "https://logz.io/blog/serverless-monitoring-logs-metrics-traces-with-aws-lambda/",
        published_date: "2020-11-15"
    },
    {
        title: "Kibana Visualization How-to's: Heatmaps",
        slug: "kibana-visualization-heatmap",
        origin: "https://logz.io/blog/kibana-visualization-heatmap/",
        published_date: "2020-10-06"
    },
    {
        title: "Full Observability with Your Node.js App",
        slug: "observability-nodejs-logs-metrics-traces",
        origin: "https://logz.io/blog/observability-nodejs-logs-metrics-traces/",
        published_date: "2020-09-10"
    },
    {
        title: "OpenObservability Talks with Paul Bruce and Jonah Kowall",
        slug: "openobservability-talks-podcast-paul-bruce-jonah-kowall",
        origin: "https://logz.io/blog/openobservability-talks-podcast-paul-bruce-jonah-kowall/",
        published_date: "2020-08-06"
    },
    {
        title: "Introducing the OpenObservability Talks Podcast",
        slug: "introducing-the-openobservability-talks-podcast",
        origin: "https://logz.io/blog/introducing-the-openobservability-talks-podcast/",
        published_date: "2020-07-16"
    },
    {
        title: "Chaos Engineering for a More Secure Kubernetes",
        slug: "kubernetes-chaos-engineering-security-networking",
        origin: "https://logz.io/blog/kubernetes-chaos-engineering-security-networking/",
        published_date: "2020-07-09"
    },
    {
        title: "How to Deploy an Azure Kubernetes Cluster with AKS",
        slug: "azure-kubernetes-cluster-aks",
        origin: "https://logz.io/blog/azure-kubernetes-cluster-aks/",
        published_date: "2020-05-06"
    },
    {
        title: "Grafana vs. Graphite",
        slug: "grafana-vs-graphite",
        origin: "https://logz.io/blog/grafana-vs-graphite/",
        published_date: "2020-04-07"
    },
    {
        title: "Best Practices for Monitoring Kubernetes using Grafana",
        slug: "best-practices-for-monitoring-kubernetes-using-grafana",
        origin: "https://logz.io/blog/best-practices-for-monitoring-kubernetes-using-grafana/",
        published_date: "2020-04-02"
    },
    {
        title: "Prometheus vs. InfluxDB: A Monitoring Comparison",
        slug: "prometheus-influxdb",
        origin: "https://logz.io/blog/prometheus-influxdb/",
        published_date: "2020-03-23"
    }
];

async function fetchPostContent(url) {
    try {
        const response = await fetch(url);
        const html = await response.text();

        // Extract the article content from the page
        // Logz.io uses <div class="entry-content"> for blog content
        const contentMatch = html.match(/<div class="entry-content"[^>]*>([\s\S]*?)<\/div>\s*<div class="author-bio/i) ||
                            html.match(/<div class="entry-content"[^>]*>([\s\S]*?)<footer/i) ||
                            html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);

        if (contentMatch) {
            let content = contentMatch[1];
            // Clean up the content
            content = content.replace(/<script[\s\S]*?<\/script>/gi, '');
            content = content.replace(/<style[\s\S]*?<\/style>/gi, '');
            content = content.replace(/<!--[\s\S]*?-->/g, '');
            // Remove sharing buttons and related posts sections
            content = content.replace(/<div class="sharedaddy[\s\S]*?<\/div>/gi, '');
            content = content.replace(/<div class="related-posts[\s\S]*?<\/div>/gi, '');
            return content.trim();
        }
        return null;
    } catch (error) {
        console.error(`Error fetching ${url}:`, error.message);
        return null;
    }
}

async function importPosts() {
    console.log('Starting Logz.io blog import...\n');

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
