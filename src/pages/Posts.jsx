import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Posts = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?userId=${id}`
      );
      setPosts(data);
      setLoading(false);
    }

    fetchPosts();
  }, [id]);

  return (
    <>
      <div className="post_search">
        <button>Back</button>
        <div className="post_search--container">
          <label className="post_search--label">Search by Id</label>
          <input type="number" />
          <button>Enter</button>
        </div>
      </div>

      {loading
        ? new Array(10).fill(0).map((_, index) => (
            <div className="post" key={index}>
              <div className="post_title post_title--skeleton"></div>
              <div className="post_body">
                <p className="post_body--skeleton"></p>
              </div>
            </div>
          ))
        : posts.map((post) => (
            <div className="post" key={post.id}>
              <div className="post_title">{post.title}</div>
              <div className="post_body">
                <p>{post.body}</p>
              </div>
            </div>
          ))}
    </>
  );
};

export default Posts;
