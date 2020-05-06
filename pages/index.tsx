import Link from 'next/link'

function Page() {
    return (
        <div>
            <div>Authoring Tools</div>
            <div>
                <Link href="https://github.com/squarepoet/squarepoet.github.io">
                    <a>Repository</a>
                </Link>
            </div>
            <div><Link href="/">Piano 1</Link> | <Link href="/">Piano 2</Link> | <Link href="/">Guitar 1</Link> | <Link href="/">Guitar 2</Link></div>
            <div>
                <Link href="/about/">
                    <a>About</a>
                </Link>
            </div>
        </div>
    );
}

export default Page;
