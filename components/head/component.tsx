import React from 'react';
import Head from 'next/head'

export default function HeadComponent({ title, description }: any): JSX.Element {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Unica+One&display=swap" rel="stylesheet"></link>
      {/* Web Monetisation */}
      <meta name="monetization" content="$ilp.uphold.com/rYJjQZggnQQ6" />
      {/* Favicon */}
      <link rel="apple-touch-icon" sizes="57x57" href="/favicon/apple-icon-57x57.png"></link>
      <link rel="apple-touch-icon" sizes="60x60" href="/favicon/apple-icon-60x60.png"></link>
      <link rel="apple-touch-icon" sizes="72x72" href="/favicon/apple-icon-72x72.png"></link>
      <link rel="apple-touch-icon" sizes="76x76" href="/favicon/apple-icon-76x76.png"></link>
      <link rel="apple-touch-icon" sizes="114x114" href="/favicon/apple-icon-114x114.png"></link>
      <link rel="apple-touch-icon" sizes="120x120" href="/favicon/apple-icon-120x120.png"></link>
      <link rel="apple-touch-icon" sizes="144x144" href="/favicon/apple-icon-144x144.png"></link>
      <link rel="apple-touch-icon" sizes="152x152" href="/favicon/apple-icon-152x152.png"></link>
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-icon-180x180.png"></link>
      <link rel="icon" type="image/png" sizes="192x192"  href="/favicon/android-icon-192x192.png"></link>
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png"></link>
      <link rel="icon" type="image/png" sizes="96x96" href="/favicon/favicon-96x96.png"></link>
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png"></link>
    </Head>
  )
}