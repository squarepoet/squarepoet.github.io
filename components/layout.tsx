import React, { useState, useEffect } from "react";
import Head from "next/head";

import Link from "next/link";

type LayoutProps = {
    title: string;
    children: React.ReactNode;
};

export default ({ title, children }: LayoutProps) => {
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <header>
                <nav>
                    <Link href="/">
                        <a>sqpt.gthb.io</a>
                    </Link>
                </nav>
            </header>
            <main>{children}</main>
            <footer>&copy; 2020 SquarePoet, Inc.</footer>
            <style jsx>{`
                div {
                    border: 1px solid blue;
                }
            `}</style>
        </>
    );
};
