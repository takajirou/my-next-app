import Link from "next/link";
import Button from "@/components/Button";

const Home = () => (
    <div className="text">
        <h1>Welcome to Next.js with TypeScript</h1>
        <Link href="/about">Go to About Page</Link>
        <br />
        <Link href="/posts/1">Go to Post 1</Link>
        <Button />
    </div>
);

export default Home;
