import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './WriterPanel.css';

function WriterPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    category: 'short-stories',
    content: '',
    excerpt: ''
  });
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('sonnetry_auth');
    if (!token) {
      navigate('/writer-login-page');
    } else {
      setIsAuthenticated(true);
      loadPosts();
    }
  }, [navigate]);

  const loadPosts = () => {
    const storedPosts = JSON.parse(localStorage.getItem('writer_posts') || '[]');
    setPosts(storedPosts);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim() || !formData.excerpt.trim()) {
      alert('Please fill in all fields.');
      return;
    }

    const newPost = {
      id: editingId || Date.now(),
      title: formData.title,
      category: formData.category,
      content: formData.content,
      excerpt: formData.excerpt,
      author: 'Writer', // Hardcoded for now
      date: new Date().toISOString().split('T')[0],
      featured: false
    };

    let updatedPosts;
    if (editingId) {
      updatedPosts = posts.map(post => post.id === editingId ? newPost : post);
      setEditingId(null);
    } else {
      updatedPosts = [...posts, newPost];
    }

    setPosts(updatedPosts);
    localStorage.setItem('writer_posts', JSON.stringify(updatedPosts));
    setFormData({ title: '', category: 'short-stories', content: '', excerpt: '' });
  };

  const handleEdit = (post) => {
    setFormData({
      title: post.title,
      category: post.category,
      content: post.content,
      excerpt: post.excerpt
    });
    setEditingId(post.id);
  };

  const handleCancelEdit = () => {
    setFormData({ title: '', category: 'short-stories', content: '', excerpt: '' });
    setEditingId(null);
  };

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <div className="writer-panel">
      <h1>Writer Panel</h1>
      <div className="writer-panel-content">
        <form onSubmit={handleSubmit} className="publish-form">
          <h2>{editingId ? 'Edit Article' : 'Publish New Article'}</h2>
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Category:</label>
            <select name="category" value={formData.category} onChange={handleInputChange}>
              <option value="short-stories">Short Stories</option>
              <option value="poetries">Poetries</option>
            </select>
          </div>
          <div className="form-group">
            <label>Excerpt:</label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleInputChange}
              rows="3"
              required
            />
          </div>
          <div className="form-group">
            <label>Content:</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              rows="10"
              required
            />
          </div>
          <button type="submit">{editingId ? 'Update Article' : 'Publish Article'}</button>
          {editingId && <button type="button" onClick={handleCancelEdit}>Cancel</button>}
        </form>

        <div className="published-articles">
          <h2>Your Published Articles</h2>
          {posts.length === 0 ? (
            <p>No articles published yet.</p>
          ) : (
            <ul>
              {posts.map(post => (
                <li key={post.id}>
                  <h3>{post.title}</h3>
                  <p>Category: {post.category}</p>
                  <p>{post.excerpt}</p>
                  <button onClick={() => handleEdit(post)}>Edit</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default WriterPanel;
