import directus from './directus.js';
import { readItems } from '@directus/sdk';
import { cloudinaryImage } from './utils/cloudinary.js'

export default async () => {
    const pages = await directus.request(readItems('pages', {
        filter: { status: { _eq: 'published' } },
        sort: ['-date_created']
      }))
    return pages.map(page => {
        if(page.content) {
            page.content = cloudinaryImage(page.content);
        }
        if(page.image) {
            page.image = cloudinaryImage(page.image)
        }
        return page;
    });
}