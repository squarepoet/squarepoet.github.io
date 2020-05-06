import Link from 'next/link'

function Page() {
    return (
        <div>
            <div>Authoring Tools: Piano 1 | Piano 2 | Guitar 1 | Guitar 2</div>
            <div>
                <Link href="/about">
                    <a>About Us</a>
                </Link>
            </div>
        </div>
    );
}

export default Page;
