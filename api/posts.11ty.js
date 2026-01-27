export default class {
    data() {
        return {
            permalink: '/api/posts.json'
        };
    }

    render(data) {
        const { posts, site } = data;
        const limit = 10;
        const latestPosts = posts.slice(0, limit);

        const response = {
            meta: {
                generated_at: new Date().toISOString(),
                version: '1.0.0',
                total_count: posts.length,
                limit: limit
            },
            data: latestPosts.map(post => ({
                id: post.id,
                title: post.title,
                slug: post.slug,
                published_date: post.published_date,
                excerpt: post.excerpt || null,
                image: post.image || null,
                origin: post.origin || null,
                url: `${site.url}/blog/${post.slug}/`
            }))
        };

        return JSON.stringify(response, null, 2);
    }
}
