// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  data: [{
    id: string;
    name: string;
    link: string;
  }]|any;
  generated: Date;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({
    data: [{
       id: "twitter",
       name: "Twitter",
       link: "https://twitter.com/ukmadlz", 
    },
    {
        id: "github",
        name: "GitHub",
        link: "https://github.com/ukmadlz", 
    },
    {
        id: "twitch",
        name: "Twitch",
        link: "https://twitch.tv/ukmadlz", 
    },
    {
        id: "linkedin",
        name: "LinkedIn",
        link: "https://www.linkedin.com/in/mikeelsmore/", 
    }],
    generated: new Date(),
})
}
