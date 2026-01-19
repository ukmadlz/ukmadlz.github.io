import directus from './directus.js';
import { readItems } from '@directus/sdk';
import { cloudinaryImage } from './utils/cloudinary.js'

export default async () => {
    const posts = await directus.request(
        readItems("posts", {
            fields: ["*"],
            filter: { status: { _eq: 'published' } },
            sort: ["-published_date"],
        })
    );
    return posts.map(post => {
        if(post.content) {
            post.content = cloudinaryImage(post.content);
        }
        if(post.image) {
            post.image = `https://res.cloudinary.com/elsmore-me/image/upload/elsmore.me/${post.image}`
        }
        return post;
    });
}