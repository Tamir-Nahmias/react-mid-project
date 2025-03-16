import { useState } from "react";

const Posts = ({ id, posts, setPosts }) => {
  const [isNewDisplayed, setIsNewDisplayed] = useState(false);
  const [content, setContent] = useState({ title: "", body: "" });

  const handleAddPost = () => {
    const postsByUser = posts.filter((post) => post.userId === id);
    const tempObj = {
      userId: id,
      id: postsByUser.length + 1, //post id
      title: content.title,
      body: content.body,
    };
    setPosts([...posts, tempObj]);
    setContent({ ...content, title: "", body: "" });
  };
  return (
    <div id="posts-container">
      {isNewDisplayed && (
        <div className="add-post-container">
          <h4>New post - user {id}</h4>
          <div id="new-post-border">
            <div>
              <label>Title : </label>
              <input
                type="text"
                name="title"
                placeholder="Write a title..."
                onChange={(e) =>
                  setContent({ ...content, title: e.target.value })
                }
                value={content.title}
                // defaultValue="default value"
              ></input>
            </div>
            <div>
              <label>Body : </label>
              <input
                type="text"
                name="body"
                placeholder="Write a new post..."
                onChange={(e) =>
                  setContent({ ...content, body: e.target.value })
                }
                value={content.body}
                // defaultValue="default value"
              ></input>
            </div>
            <div id="todo-cancel-and-add-buttons">
              <button onClick={() => setIsNewDisplayed(false)}>Cancel</button>
              <button onClick={handleAddPost}>Add</button>
            </div>
          </div>
        </div>
      )}
      {!isNewDisplayed && (
        <>
          <div className="posts-per-user-container">
            <section id="post-header">
              <h4>posts - user {id}</h4>
              <button onClick={() => setIsNewDisplayed(true)}>Add</button>
            </section>
            {posts
              .filter((post) => post.userId === id)
              .map((userpost) => {
                return (
                  <div key={userpost.id}>
                    <div>
                      <label> Title : </label> {userpost.title}
                    </div>
                    <div>
                      <label>Body : </label> {userpost.body}
                    </div>
                  </div>
                );
              })}
          </div>
        </>
      )}
    </div>
  );
};

export default Posts;
