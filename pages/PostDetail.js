import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './PostDetail.css';

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/posts.json')
      .then(response => response.json())
      .then(data => {
        const foundPost = data.find(p => p.id === parseInt(id));
        setPost(foundPost);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching post:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!post) {
    return (
      <div className="post-detail">
        <h2>Post not found</h2>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="post-detail">
      <article>
        <header>
          <h1>{post.title}</h1>
          <div className="post-meta">
            <span>By {post.author}</span>
            <span>{new Date(post.date).toLocaleDateString()}</span>
            <span>{post.category.replace('-', ' ')}</span>
          </div>
        </header>
        <div className="post-content">
          {post.category === 'poetries' ? (
            <pre>{post.content}</pre>
          ) : (
            <p>{post.content}</p>
          )}
        </div>
      </article>
      <Link to="/" className="back-link">Back to Home</Link>
    </div>
  );
}

export default PostDetail;
