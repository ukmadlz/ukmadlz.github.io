export default class {
    data() {
        return {
            permalink: '/api/jobs.json'
        };
    }

    render(data) {
        const { jobs } = data;

        const response = {
            meta: {
                generated_at: new Date().toISOString(),
                version: '1.0.0'
            },
            data: jobs.map(job => ({
                company: job.company,
                title: job.title,
                logo: job.logo || null,
                description: job.description || null,
                start_date: job.start_date,
                end_date: job.end_date || null,
                current: job.current || false
            }))
        };

        return JSON.stringify(response, null, 2);
    }
}
