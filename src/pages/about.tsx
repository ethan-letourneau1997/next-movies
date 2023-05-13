import Link from "next/link";

export default function About() {
  return (
    <div>
      <h1>About Me</h1>

      <div>
        <Link href="/">Home</Link>
        <Link href="/blog/123">My Blog Post</Link>
      </div>
    </div>
  );
}
