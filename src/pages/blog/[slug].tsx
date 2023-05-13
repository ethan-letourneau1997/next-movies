import Link from "next/link";
import { useRouter } from "next/router";

export default function BlogPost() {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <p>
      Post: {slug}
      <div>
        <Link href="/">Home</Link>
      </div>
    </p>
  ); // ...you'll see "Post: 123"
}
