export default class {
    data() {
        return {
            permalink: '/api/social.json'
        };
    }

    render(data) {
        const { site } = data;

        const response = {
            meta: {
                generated_at: new Date().toISOString(),
                version: '1.0.0'
            },
            data: {
                name: site.author,
                description: site.description,
                email: site.email,
                url: site.url,
                socials: site.socials.map(social => ({
                    name: social.name,
                    url: social.url,
                    icon: social.icon
                }))
            }
        };

        return JSON.stringify(response, null, 2);
    }
}
