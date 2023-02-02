import React from "react";
import { useDispatch } from "react-redux";
import Counter from "./features/counter/Counter";
import PostsLists from "./features/post/PostsList";
import AddPostForm from "./features/post/AddPostForm";

function App() {
  const dispatch = useDispatch();

  return (
    <div className='App'>
      <header className='App-header'>Redux max</header>
      {/* <Counter /> */}
      <AddPostForm />
      <PostsLists />
    </div>
  );
}

export default App;
