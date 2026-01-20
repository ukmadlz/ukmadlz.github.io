import 'dotenv/config'

export default {
    title: "Mike Elsmore",
    posthogKey: process.env.POSTHOG_KEY || '',
    posthogHost: process.env.POSTHOG_HOST || 'https://eu.i.posthog.com',
    description: "Developer, Technologist, Speaker, Community Organiser",
    author: "Mike Elsmore",
    url: "https://elsmore.me",
    email: "mike@elsmore.me",
    socials: [
        {
            name: "GitHub",
            url: "https://github.com/ukmadlz",
            icon: "github"
        },
        {
            name: "Mastodon",
            url: "https://mastodon.social/@ukmadlz",
            icon: "mastodon"
        },
        {
            name: "LinkedIn",
            url: "https://www.linkedin.com/in/mikeelsmore",
            icon: "linkedin"
        },
        {
            name: "Twitch",
            url: "https://twitch.tv/ukmadlz",
            icon: "twitch"
        },
        {
            name: "Dev.to",
            url: "https://dev.to/ukmadlz",
            icon: "devto"
        },
        {
            name: "Medium",
            url: "https://medium.com/@ukmadlz",
            icon: "medium"
        }
    ],
    navigation: [
        { name: "Resume/CV", url: "/resume/" },
        { name: "Talks", url: "/talks/" },
        { name: "Podcasts", url: "/podcasts/" },
        { name: "Blog", url: "/blog/" },
        { name: "Contact", url: "/contact/" }
    ]
}
