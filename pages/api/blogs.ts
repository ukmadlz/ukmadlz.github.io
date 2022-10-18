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

const devTo = async () => {
  const type = 'devto'
  const url = "https://dev.to/api/articles/me"
  const response = await fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached\\
      headers: {
          'api-key': String(process.env.DEV_TO_API_KEY)
      }
    })
  const articles = await response.json();
  return articles.filter((article: any) => {
      return article.published;
  })
  .map((article: any): IArticle => {
      const {
          id,
          title,
          description,
          url,
          published_timestamp,
      } = article;
      return {
          id: hashId(type, id),
          title,
          description,
          url,
          timestamp: published_timestamp,
          type,
          source: type,
      }
  })
}

const wordpress = async (url: string, source: string) => {
  const type = "wordpress";
  const response = await fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    })
  const rssString = await response.text();
  const wordpressData: any = await htmlparser2.parseFeed(rssString);
  return ((Array.isArray(wordpressData.items)) ? wordpressData.items : [wordpressData.items]).map((article: any) => {
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

const localStorage = async () => {
  const host = process.env.NEXT_PUBLIC_UKMADLZ_API || 'http://localhost:8888/'
  const response = await fetch(`${host}/blogs.json`, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached\\
  })
  const articles = await response.json();
  return articles.data;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const logzArticles = await wordpress("https://logz.io/author/mike-elsmore/feed/", "logz.io");
  const devRelArticles = await wordpress("https://developerrelations.com/author/mikeelsmore/feed/", "developerrelations.com");
  const devToArticles = await devTo();
  const localBlogs = await localStorage();
  res.status(200).json({
    data: [
        ...logzArticles,
        ...devRelArticles,
        ...devToArticles,
        ...localBlogs,
    ]
        .sort((a: IArticle, b: IArticle) => {
        return (new Date(a.timestamp) < new Date(b.timestamp)) ? 1 : -1;
    }),
    generated: new Date(),
});
}
