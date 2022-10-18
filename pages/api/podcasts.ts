// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import md5 from 'md5';
import * as htmlparser2 from "htmlparser2";

interface IArticle {
  id: string,
  title: string,
  description: string,
  url: string,
  timestamp: Date,
  type: string,
  source: string,
}

type Data = {
  data: [IArticle]|any;
  generated: Date;
}

const hashId = (type: string, reference: string) => {
  return md5(`${type}:${reference}`);
}

const podcast = async (url: string, source: string) => {
  const type = "rss";
  const response = await fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    })
  const rssString = await response.text();
  const podcastData: any = await htmlparser2.parseFeed(rssString);
  return ((Array.isArray(podcastData.items)) ? podcastData.items : [podcastData.items]).map((article: any) => {
      const {
          title,
          pubDate,
          description,
          link
      } = article;
      return {
          id: hashId(type, link),
          title,
          description,
          url: link,
          timestamp: new Date(pubDate),
          type,
          source
      }
  })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const totPodcast = await podcast("https://anchor.fm/s/40177308/podcast/rss", "tech-off-topic");
  res.status(200).json({
      data: [].concat(
          totPodcast,
      ).sort((a: IArticle, b: IArticle) => {
          return (new Date(a.timestamp) < new Date(b.timestamp)) ? 1 : -1;
      }),
      generated: new Date(),
  });
}
