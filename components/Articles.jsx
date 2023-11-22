import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import styles from '@/components/styles';
export default function Articles({ articles }) {
    return articles.map((article) => (
        <Link key={article.slug} href={`/articles/${article.slug}`}>
            <a className='-ml-6 rounded-xl p-6 transition duration-300 hover:bg-gray-50 dark:hover:bg-gray-800'>
                <div className='flex-1'>
                    <h4
                        className={clsx(
                            styles.textGradient,
                            'mb-3 block text-xl font-semibold'
                        )}
                    >
                        {article.title}
                    </h4>
                    <span className={clsx(styles.textMuted, 'leading-relaxed')}>
                        {article.excerpt}
                    </span>
                </div>

                <strong className='mt-4 block font-semibold'>Read more</strong>
            </a>
        </Link>
    ));
}
