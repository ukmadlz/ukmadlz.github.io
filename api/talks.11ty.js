export default class {
    data() {
        return {
            permalink: '/api/talks.json'
        };
    }

    render(data) {
        const { talks, site } = data;
        const limit = 10;
        const latestTalks = talks.slice(0, limit);

        const response = {
            meta: {
                generated_at: new Date().toISOString(),
                version: '1.0.0',
                total_count: talks.length,
                limit: limit
            },
            data: latestTalks.map(talk => ({
                id: talk.id,
                title: talk.title,
                slug: talk.slug,
                event: talk.event,
                event_url: talk.event_url || null,
                date: talk.date,
                location: talk.location || null,
                description: talk.description || null,
                youtube_id: talk.youtube_id || null,
                youtube_url: talk.youtube_url || null,
                slides_url: talk.slides_url || null,
                thumbnail: talk.thumbnail || null,
                url: `${site.url}/talks/${talk.slug}/`
            }))
        };

        return JSON.stringify(response, null, 2);
    }
}
