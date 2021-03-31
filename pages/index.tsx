import Link from "next/link";

const Page = () => {
    return (
        <div>
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
                <Link href="/midi">
                    <a>MIDI</a>
                </Link>
            </div>
            <div>
                <Link href="/about">
                    <a>About</a>
                </Link>
            </div>
        </div>
    );
};

export default Page;

export async function getStaticProps(context) {
    return {
        props: {
            title: "SQPT",
        },
    };
}
