import Link from "next/link";

function Page() {
    return (
        <div>
            <div>Authoring Tools</div>
            <div>
                <Link href="https://github.com/squarepoet/squarepoet.github.io">
                    <a>Repository</a>
                </Link>
            </div>
            <div>
                <Link href="/piano/v1/">Piano 1</Link>
            </div>
            <div>
                <Link href="/piano/v2/">Piano 2</Link>
            </div>
            <div>
                <Link href="/guitar/v1/">Guitar 1</Link>
            </div>
            <div>
                <Link href="/guitar/v2/">Guitar 2</Link>
            </div>
            <div>
                <Link href="/about/">
                    <a>About</a>
                </Link>
            </div>
        </div>
    );
}

export default Page;
