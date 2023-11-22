import Link from 'next/link';
import React from 'react';

export default function NavLink({ href, value, children }) {
    return (
        <li>
            <Link href={href}>
                <a className='inline-flex px-3 py-2 text-sm font-medium text-gray-900 dark:text-gray-300 lg:px-4'>
                    {value || children}
                </a>
            </Link>
        </li>
    );
}
