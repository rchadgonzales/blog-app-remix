import { useLoaderData, Link } from "@remix-run/react";
import { db } from "~/utils/db.server";

// export const loader = () => {
// console.log("This is loader");
/*
  const data = {
    posts: [
      { id: 1, title: "Post 1", body: "This is a test post" },
      { id: 2, title: "Post 2", body: "This is a test post" },
      { id: 3, title: "Post 3", body: "This is a test post" },
    ],
  };
  */
export const loader = async () => {
  const data = {
    posts: await db.post.findMany({
      take: 20,
      select: { id: true, title: true, createdAt: true },
      orderBy: { createdAt: "desc" },
    }),
  };
  return data;
};

function PostItems() {
  const { posts } = useLoaderData();
  return (
    <>
      <div className="page-header">
        <h1>Post Items</h1>
        <Link to="/posts/new" className="btn">
          New Post
        </Link>
      </div>
      <ul className="posts-list">
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={post.id}>
              <h3>{post.title}</h3>
              {new Date(post.createdAt).toLocaleString()}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default PostItems;
