const Posts = ({ id, posts }) => {
  return (
    <div id="posts-container">
      <div>
        <h4>
          posts - user {id} <button>Add</button>
        </h4>
      </div>
      <div className="posts-per-user-container">
        {posts
          .filter((post) => post.userId === id)
          .map((userpost) => {
            return (
              <div key={userpost.id}>
                <div>Title : {userpost.title}</div>
                <div>Body : {userpost.body}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Posts;
