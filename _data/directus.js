import 'dotenv/config'
import { createDirectus, rest, staticToken } from '@directus/sdk';

let directus = createDirectus(process.env.DIRECTUS_URL).with(rest());

// Add authentication if token is provided
if (process.env.DIRECTUS_TOKEN) {
    directus = createDirectus(process.env.DIRECTUS_URL)
        .with(staticToken(process.env.DIRECTUS_TOKEN))
        .with(rest());
}

export default directus;