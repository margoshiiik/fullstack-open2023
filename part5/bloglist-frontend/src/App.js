import React, { useState, useEffect } from 'react';
import loginService from './services/login';
import blogService from './services/blogs';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' });
  const [message, setMessage] = useState(null);
  const [visible, setVisible] = useState(false);

  const handleMessage = (text) => {
    setMessage(text);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  useEffect(() => {
    blogService.getAll().then((initialBlogs) => {
      setBlogs(initialBlogs);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log('logging in with', username, password);
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      handleMessage('wrong username or password');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const blogObject = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
    };

    try {
      const returnedObject = await blogService.create(blogObject, user.username);
      setBlogs((prevBlogs) => [...prevBlogs, returnedObject]);
      setNewBlog({ title: '', author: '', url: '' });
      handleMessage(`a new blog ${returnedObject.title} by ${returnedObject.author} added`);
    } catch (exception) {
      alert(exception);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    setUser(null);
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              id="username"
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              id="password"
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  }

  return (
    <>
      <div>
        <h2>blogs</h2>
        <p>
          <b>{message}</b>
        </p>
        {user.name} logged in <button type="button" onClick={handleLogout}>logout</button>
      </div>
      <div>
        <div style={{ display: visible ? 'none' : '' }}>
          <button type="button" onClick={() => setVisible(true)}>new note</button>
        </div>
        <div style={{ display: visible ? '' : 'none' }}>
          <h2>create new</h2>
          <BlogForm handleSubmit={handleSubmit} newBlog={newBlog} setVisible={setVisible} setNewBlog={setNewBlog} />
        </div>
        <div>
          {blogs.sort((a, b) => (a.likes > b.likes ? -1 : 1)).map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </>
  );
};

export default App;
