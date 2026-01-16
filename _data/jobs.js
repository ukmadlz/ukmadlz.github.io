import directus from './directus.js';
import { readItems } from '@directus/sdk';
import { cloudinaryImage } from './utils/cloudinary.js'

// Company logo mapping using Cloudinary
const companyLogos = {
    "Digital Speed": "https://res.cloudinary.com/elsmore-me/image/upload/c_lpad,w_200,h_200,q_auto,f_auto/elsmore.me/company/digital-speed",
    "Self-employed": "https://res.cloudinary.com/elsmore-me/image/upload/c_lpad,w_200,h_200,q_auto,f_auto/elsmore.me/company/builtbyme",
    "TuxCare": "https://res.cloudinary.com/elsmore-me/image/upload/c_lpad,w_200,h_200,q_auto,f_auto/elsmore.me/company/tuxcare",
    "Directus": "https://res.cloudinary.com/elsmore-me/image/upload/c_lpad,w_200,h_200,q_auto,f_auto/elsmore.me/company/directus",
    "Mozilla": "https://res.cloudinary.com/elsmore-me/image/upload/c_lpad,w_200,h_200,q_auto,f_auto/elsmore.me/company/mozilla",
    "Infobip": "https://res.cloudinary.com/elsmore-me/image/upload/c_lpad,w_200,h_200,q_auto,f_auto/elsmore.me/company/infobip",
    "InfoSum": "https://res.cloudinary.com/elsmore-me/image/upload/c_lpad,w_200,h_200,q_auto,f_auto/elsmore.me/company/infosum",
    "CloudQuery": "https://res.cloudinary.com/elsmore-me/image/upload/c_lpad,w_200,h_200,q_auto,f_auto/elsmore.me/company/cloudquery",
    "Optic": "https://res.cloudinary.com/elsmore-me/image/upload/c_lpad,w_200,h_200,q_auto,f_auto/elsmore.me/company/optic-lab",
    "Logz.io": "https://res.cloudinary.com/elsmore-me/image/upload/c_lpad,w_200,h_200,q_auto,f_auto/elsmore.me/company/logz-io",
    "Packt": "https://res.cloudinary.com/elsmore-me/image/upload/c_lpad,w_200,h_200,q_auto,f_auto/elsmore.me/company/packt",
    "BuiltByMe": "https://res.cloudinary.com/elsmore-me/image/upload/c_lpad,w_200,h_200,q_auto,f_auto/elsmore.me/company/builtbyme",
    "IBM": "https://res.cloudinary.com/elsmore-me/image/upload/c_lpad,w_200,h_200,q_auto,f_auto/elsmore.me/company/ibm",
    "Cloudant, an IBM Company": "https://res.cloudinary.com/elsmore-me/image/upload/c_lpad,w_200,h_200,q_auto,f_auto/elsmore.me/company/ibm",
    "blubolt Ltd": "https://res.cloudinary.com/elsmore-me/image/upload/c_lpad,w_200,h_200,q_auto,f_auto/elsmore.me/company/blubolt",
    "Winning Moves Ltd": "https://res.cloudinary.com/elsmore-me/image/upload/c_lpad,w_200,h_200,q_auto,f_auto/elsmore.me/company/winning-moves",
    "BAM Agency": "https://res.cloudinary.com/elsmore-me/image/upload/c_lpad,w_200,h_200,q_auto,f_auto/elsmore.me/company/bam-agency",
    "JB Global Ltd": "https://res.cloudinary.com/elsmore-me/image/upload/c_lpad,w_200,h_200,q_auto,f_auto/elsmore.me/company/jbglobal",
    "Petoba": "https://res.cloudinary.com/elsmore-me/image/upload/c_lpad,w_200,h_200,q_auto,f_auto/elsmore.me/company/10yetis",
    "10 Yetis PR Agency": "https://res.cloudinary.com/elsmore-me/image/upload/c_lpad,w_200,h_200,q_auto,f_auto/elsmore.me/company/10yetis"
};

export default async () => {
    const jobs = await directus.request(
        readItems("jobs", {
            fields: ["*"],
            filter: { status: { _eq: 'published' } },
            sort: ["sort"],
        })
    );
    return jobs.map(job => {
        if(job.description) {
            job.description = cloudinaryImage(job.description);
        }
        // Use Cloudinary logo from mapping if no logo in Directus
        if(job.logo) {
            job.logo = cloudinaryImage(job.logo);
        } else if(companyLogos[job.company]) {
            job.logo = companyLogos[job.company];
        }
        return job;
    });
}
