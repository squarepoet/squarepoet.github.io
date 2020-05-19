import Link from "next/link";

export default function () {
    return (
        <div>
            <div>Authoring Tools</div>
            <div>
                <a href="//github.com/squarepoet/squarepoet.github.io">Repository</a>
            </div>
            <div>
                <Link href="/piano/v1">Piano 1</Link>
            </div>
            <div>
                <Link href="/piano/v2">Piano 2</Link>
            </div>
            <div>
                <Link href="/guitar/v1">Guitar 1</Link>
            </div>
            <div>
                <Link href="/guitar/v2">Guitar 2</Link>
            </div>
            <div>
                <Link href="/about">
                    <a>About</a>
                </Link>
            </div>
        </div>
    );
}
