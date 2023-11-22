import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeSlug from 'rehype-slug';
import rehypeToc from '@jsdevtools/rehype-toc';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import { POSTS_PATH } from '@/libs/helpers';
import Youtube from '@/components/Youtube';
import React from 'react';
import path from 'path';
import fs from 'fs';
import { sync } from 'glob';
import matter from 'gray-matter';
import PageTitle from '@/components/PageTitle';
import Container from '@/components/Container';
import styles from '@/components/styles';
import Meta from '@/components/Meta';
export default function PostPage({ post }) {
    return (
        <>
            <Meta
                title={`${post.meta.title} / Darwin Notes`}
                url={`https://aldian-darwin-site.webflow.io/`}
            />
            <div className={styles.whiteLayoutWithPaddingY}>
                <Container>
                    <div className='relative flex gap-10'>
                        <div className='w-full lg:w-2/3'>
                            <PageTitle className='mb-6 max-w-xl pb-2'>
                                {post.meta.title}
                            </PageTitle>
                            <div className='prose prose-pink max-w-none prose-headings:!mb-2 prose-a:no-underline prose-pre:!rounded-2xl prose-pre:!p-6 dark:prose-invert lg:prose-lg'>
                                <MDXRemote
                                    {...post.source}
                                    components={{ Youtube, Image }}
                                />
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
}

export const getStaticProps = async ({ params }) => {
    const { slug } = params;
    const { content, meta } = getPostFromSlug(slug);
    const mdxSource = await serialize(content, {
        mdxOptions: {
            rehypePlugins: [
                rehypeSlug,
                rehypeToc,
                [rehypeAutolinkHeadings, { behavior: 'wrap' }],
                rehypeHighlight,
            ],
        },
    });

    return { props: { post: { source: mdxSource, meta } } };
};

export const getStaticPaths = async () => {
    const paths = getSlugs().map((slug) => ({ params: { slug } }));

    return {
        paths,
        fallback: false,
    };
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

const getSlugs = () => {
    const paths = sync(`${POSTS_PATH}/*.mdx`);

    return paths.map((path) => {
        const parts = path.split('/');
        const fileName = parts[parts.length - 1];
        const [slug, _ext] = fileName.split('.');
        return slug;
    });
};
