import Head from 'next/head';
import Articles from '@/components/Articles';
import React from 'react';
import path from 'path';
import fs from 'fs';
import { sync } from 'glob';
import matter from 'gray-matter';
import { POSTS_PATH } from '@/libs/helpers';
import Container from '@/components/Container';
import Meta from '@/components/Meta';

export default function TagPage({ slug, articles }) {
    return (
        <>
            <Meta
                title={`${slug} / Darwin Notes`}
                url={`https://aldian-darwin-site.webflow.io/`}
            />
            <div className='bg-white'>
                <Container>
                    <h1>Tag: {slug}</h1>
                    <Articles articles={articles} />
                </Container>
            </div>
        </>
    );
}

export const getStaticProps = async ({ params }) => {
    const { slug } = params;
    const posts = getArticles().filter((post) => post.meta.tags.includes(slug));

    return {
        props: {
            slug,
            articles: posts.map((post) => post.meta),
        },
    };
};

export const getStaticPaths = async () => {
    const tags = new Set(
        getArticles()
            .map((post) => post.meta.tags)
            .flat()
    );
    const paths = Array.from(tags).map((tag) => ({ params: { slug: tag } }));

    return {
        paths,
        fallback: false,
    };
};

const getSlugs = () => {
    const paths = sync(`${POSTS_PATH}/*.mdx`);

    return paths.map((path) => {
        const parts = path.split('/');
        const fileName = parts[parts.length - 1];
        const [slug, _ext] = fileName.split('.');
        return slug;
    });
};

const getPostFromSlug = (slug) => {
    const postPath = path.join(POSTS_PATH, `${slug}.mdx`);
    const source = fs.readFileSync(postPath);
    const { content, data } = matter(source);

    return {
        content,
        meta: {
            slug,
            excerpt: data.excerpt ?? 'slug',
            title: data.title ?? slug,
            tags: data?.tags?.sort(),
            date: data?.date?.toString(),
        },
    };
};

const getArticles = () => {
    return getSlugs()
        .map((slug) => getPostFromSlug(slug))
        .sort((a, b) => {
            if (a.meta.date > b.meta.date) return 1;
            if (a.meta.date < b.meta.date) return -1;
            return 0;
        })
        .reverse();
};
