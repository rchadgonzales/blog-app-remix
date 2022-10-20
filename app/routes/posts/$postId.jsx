// import { useParams } from "@remix-run/react";
import { useLoaderData, Link } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import { db } from "~/utils/db.server";

export const loader = async ({ params }) => {
  const post = await db.post.findUnique({
    where: { id: params.postId },
  });

  if (!post) throw new Error("Post not found");

  const data = { post };
  return data;
};

export const action = async ({ request, params }) => {
  const form = await request.formData();
  if (form.get("_method") === "delete") {
    const post = await db.post.findUnique({
      where: { id: params.postId },
    });

    if (!post) throw new Error("Post not found");

    await db.post.delete({ where: { id: params.postId } });
    return redirect("/posts");
  }
};

function Post() {
  // const params = useParams();
  const { post } = useLoaderData();

  return (
    <div>
      {/* <h1>Post</h1> */}
      {/* <h1>Post {params.postId}</h1> */}
      <div className="page-header">
        <h1>{post.title}</h1>
        <Link to="/posts" className="btn btn-reverse">
          Go Back
        </Link>
      </div>
      {new Date(post.createdAt).toLocaleString()}
      <div className="page-content">{post.body}</div>
      <div className="page-footer">
        <form method="POST">
          <input type="hidden" name="_method" value="delete" />
          <button className="btn btn-delete">Delete Post</button>
        </form>
      </div>
    </div>
  );
}

export default Post;
