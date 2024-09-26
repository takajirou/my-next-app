import Link from "next/link";

const Home = () => (
    <div>
        <h1>Welcome to Next.js with TypeScript</h1>
        <Link href="/about">
            <a>Go to About Page</a>
        </Link>
    </div>
);

export default Home;
