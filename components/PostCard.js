import React from 'react';
import { Link } from 'react-router-dom';
import './PostCard.css';

function PostCard({ post }) {
  return (
    <article className="post-card" aria-labelledby={`post-title-${post.id}`}>
      <h3 id={`post-title-${post.id}`} className="post-title">
        <Link to={`/post/${post.id}`} aria-label={`Read ${post.title}`}>
          {post.title}
        </Link>
      </h3>
      <p className="post-excerpt">{post.excerpt}</p>
      <div className="post-meta">
        <span className="post-author">By {post.author}</span>
        <span className="post-date">{new Date(post.date).toLocaleDateString()}</span>
        <span className="post-category">{post.category.replace('-', ' ')}</span>
      </div>
    </article>
  );
}

export default PostCard;
