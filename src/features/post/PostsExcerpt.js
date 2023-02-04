import React from "react";

import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionsButtons from "./ReactionsButtons";

const PostsExcerpt = ({ post }) => {
  console.log("post", post);
  return (
    <article className='post-excerpt'>
      <h3>{post.title}</h3>
      <p>{post.body.substring(0, 100)}</p>
      <p>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
        <ReactionsButtons post={post} />
      </p>
    </article>
  );
};

export default PostsExcerpt;
