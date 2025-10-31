import React, { useState, useEffect } from 'react';
import PostCard from '../components/PostCard';
import './Home.css';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/posts.json')
      .then(response => response.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  const featuredPosts = posts.filter(post => post.featured);
  const recentPosts = posts.slice().sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 4);

  return (
    <div className="home">
      <section className="hero">
        <h2>Welcome to Sonnetry</h2>
        <p>Discover captivating short stories and beautiful poetries</p>
      </section>

      <section className="featured-posts">
        <h2>Featured Posts</h2>
        <div className="posts-grid">
          {featuredPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      <section className="recent-posts">
        <h2>Recent Posts</h2>
        <div className="posts-grid">
          {recentPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
