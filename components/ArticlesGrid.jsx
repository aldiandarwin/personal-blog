import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import styles from '@/components/styles';
export default function Articles({ articles }) {
    return articles.map((article) => (
        <Link key={article.slug} href={`/articles/${article.slug}`}>
            <a className='flex flex-col rounded-xl bg-gray-100 p-4 transition duration-300 hover:bg-gray-50 dark:bg-gray-800/50 dark:hover:bg-gray-800 lg:h-56 lg:p-6'>
                <div className='flex-1'>
                    <h4
                        className={clsx(
                            styles.textGradient,
                            'mb-1 block text-lg font-semibold lg:mb-3 lg:text-xl'
                        )}
                    >
                        {article.title}
                    </h4>
                    <span
                        className={clsx(
                            styles.textMuted,
                            'text-sm leading-relaxed lg:text-base'
                        )}
                    >
                        {article.excerpt}
                    </span>
                </div>

                <strong
                    className={clsx(
                        styles.textInvert,
                        'mt-4 block font-semibold'
                    )}
                >
                    Read more
                </strong>
            </a>
        </Link>
    ));
}
