import React from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "../index.css";

const Id = () => {
  let { id } = useParams();
  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [searchId, setSearchId] = React.useState(id);

  async function fetchPosts(userId) {
    setLoading(true);
    const postsData = (
      await axios.get(
        `https://jsonplaceholder.typicode.com/posts?userId=${userId || id}`
      )
    ).data;
    setPosts(postsData);
    setLoading(false);
  }

  function onSearchKeyDown(event) {
    if (event.key === "Enter") {
      fetchPosts(searchId);
    }
  }

  React.useEffect(() => {
    let mounted = true;

    if (mounted) {
      fetchPosts(id);
    }

    return () => (mounted = false);
  }, [id]);

  return (
    <div>
      <div className="post_search">
        <Link to="/">
          <button>Back</button>
        </Link>
        <div className="post_search--container">
          <label className="post_search--label">
            <input
              type="number"
              placeholder={id}
              value={searchId}
              onChange={(event) => setSearchId(event.target.value)}
              onKeyPress={onSearchKeyDown}
            />
          </label>
          <button onClick={() => fetchPosts(searchId)}>Search</button>
        </div>
      </div>

      {!loading ? (
        posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="post_title">{post.title}</div>
            <div className="post_body">{post.body}</div>
          </div>
        ))
      ) : (
        new Array(10).fill().map((_, index) => (
          <div className="post" key={index}>
            <div className="post_title skeleton skeleton-title"></div>
            <div className="post_body skeleton skeleton-body"></div>
          </div>
        ))
      )}
    </div>
  );
};

export default Id;