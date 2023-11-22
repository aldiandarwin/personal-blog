import Head from 'next/head';
import React from 'react';

export default function Meta({
    title = 'Darwin Notes',
    description = 'There are so many questions where I currently work, from 2020 to 2 February 2024 I have worked in several Startup engaged in Software Agency and Edutech.',
    og = 'https://aldian-darwin-site.webflow.io/',
    url = 'https://aldian-darwin-site.webflow.io/',
}) {
    return (
        <Head>
            <title>{title}</title>
            <meta
                name='viewport'
                content='initial-scale=1.0, width=device-width'
            />
            <meta name='title' content={title} />
            <meta name='description' content={description} />

            <meta property='og:type' content='website' />
            <meta
                property='og:url'
                content='https://aldian-darwin-site.webflow.io/'
            />
            <meta property='og:title' content={title} />
            <meta property='og:description' content={description} />
            <meta property='og:image' content={og} />

            <meta property='twitter:card' content='summary_large_image' />
            <meta property='twitter:url' content={url} />
            <meta property='twitter:title' content={title} />
            <meta property='twitter:description' content={description} />
            <meta property='twitter:image' content={og} />
        </Head>
    );
}
