import React, { useState, useEffect } from 'react';
import PostCard from '../components/PostCard';
import './ShortStories.css';

function ShortStories() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/posts.json')
      .then(response => response.json())
      .then(data => {
        const shortStories = data.filter(post => post.category === 'short-stories');
        setPosts(shortStories);
        setFilteredPosts(shortStories);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtered = posts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [searchTerm, posts]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="short-stories">
      <h1>Short Stories</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search stories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search short stories"
        />
      </div>
      <div className="posts-grid">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))
        ) : (
          <p>No stories found matching your search.</p>
        )}
      </div>
    </div>
  );
}

export default ShortStories;
