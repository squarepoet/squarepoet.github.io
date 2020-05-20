import Link from "next/link";

export default function () {
    return (
        <div>
            <div>Authoring Tools</div>
            <div>
                <a href="//github.com/squarepoet/squarepoet.github.io">Repository</a>
            </div>
            <div>
                <Link href="/piano/v1">
                    <a>Piano 1</a>
                </Link>
            </div>
            <div>
                <Link href="/piano/v2">
                    <a>Piano 2</a>
                </Link>
            </div>
            <div>
                <Link href="/guitar/v1">
                    <a>Guitar 1</a>
                </Link>
            </div>
            <div>
                <Link href="/guitar/v2">
                    <a>Guitar 2</a>
                </Link>
            </div>
            <div>
                <Link href="/about">
                    <a>About</a>
                </Link>
            </div>
        </div>
    );
}
