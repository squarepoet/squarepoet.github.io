import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = {
    title: string;
    children: React.ReactNode;
};

/*
<footer onMouseDown={openSquarePoet}></footer>
function openSquarePoet() {
    window.location.href = "https://www.squarepoet.com";
}
*/

const Layout = ({ title, children }: Props) => {
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
            <footer>&copy; 2021 SquarePoet</footer>
            <style jsx global>{`
                html,
                body {
                    background-color: #232323;
                }

                body {
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
                    color: #bbb;
                    margin: 20px;
                    font-size: 16pt;
                    line-height: 150%;
                }

                a {
                    color: #7cd;
                    text-decoration: none;
                }

                a:hover {
                    text-decoration: underline;
                }

                nav {
                    border-bottom: 1px solid #555;
                    margin-bottom: 10px;
                }

                footer {
                    text-align: left;
                    position: fixed;
                    font-size: 12pt;
                    bottom: 10px;
                    right: 10px;
                }
            `}</style>
        </>
    );
};

export default Layout;
