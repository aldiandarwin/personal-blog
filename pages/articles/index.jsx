import React from 'react';
import path from 'path';
import fs from 'fs';
import { sync } from 'glob';
import matter from 'gray-matter';
import { POSTS_PATH } from '@/libs/helpers';
import ArticlesGrid from '@/components/ArticlesGrid';
import PageTitle from '@/components/PageTitle';
import Container from '@/components/Container';
import clsx from 'clsx';
import styles from '@/components/styles';
import Meta from '@/components/Meta';

export default function index({ articles }) {
    return (
        <>
            <Meta
                title='Articles / Darwin Notes'
                url={`https://aldian-darwin-site.webflow.io/`}
            />
            <div
                className={clsx(
                    styles.whiteLayoutWithPaddingY,
                    'mb-4 sm:mb-8 lg:mb-16'
                )}
            >
                <Container>
                    <div className='mb-4'>
                        <PageTitle>
                            Elevate your projects with expert freelance
                            services. thats why here I'am !{' '}
                        </PageTitle>
                        <br></br>
                        <p className={clsx(styles.textMuted, 'mt-2 text-xl')}>
                            I'm thrilled to extend my professional experience to
                            offer you top-notch freelance services that can
                            truly elevate your projects. With a robust
                            background in front-end development, UX design,
                            digital marketing, and content creation, I bring a
                            versatile skill set to the table.
                        </p>
                        <br></br>
                        <p className={clsx(styles.textMuted, 'mt-2 text-xl')}>
                            <b>Crafting Digital Experiences that Resonate </b>
                            <br></br> Having thrived at the intersection of
                            technology, design, and storytelling, I specialize
                            in transforming ideas into visually stunning and
                            highly functional digital experiences. Whether you
                            need a captivating website, intuitive user
                            interfaces, or compelling multimedia content, I've
                            got you covered.
                        </p>
                        <br></br>
                        <p className={clsx(styles.textMuted, 'mt-2 text-xl')}>
                            <b>Data-Driven Strategies for Digital Success </b>
                            <br></br>
                            In the realm of digital marketing, I leverage
                            data-driven strategies encompassing SEO, SEM, social
                            media, and email marketing. My goal is to optimize
                            campaigns, drive targeted traffic, and elevate brand
                            visibility through the power of storytelling. Let's
                            make your brand stand out in the crowded digital
                            landscape.
                        </p>
                    </div>
                    <div className='grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-10'>
                        <ArticlesGrid articles={articles} />
                    </div>
                </Container>
            </div>
        </>
    );
}

export async function getStaticProps() {
    return {
        props: {
            articles: getArticles()
                .slice(0, 9)
                .map((post) => post.meta),
        },
    };
}

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
