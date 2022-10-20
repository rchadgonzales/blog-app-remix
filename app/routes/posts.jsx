import { Outlet } from "@remix-run/react";

function Posts() {
  return (
    /*
    <div>
      <h1>This is Posts Route</h1>
      <Outlet />
    </div>
    */
    <>
      <Outlet />
    </>
  );
}

export default Posts;
