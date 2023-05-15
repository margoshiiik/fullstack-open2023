const blog = require("../models/blog");


const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {

    let total = 0; 

    blogs.length === 0 ? 0 : 
    blogs.map(blog => {
        total +=  blog.likes;
    })

    return total;
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null; 
      }

      const maxLikes = Math.max(...blogs.map(blog => blog.likes));
      const favorite = blogs.find(blog => blog.likes === maxLikes);
    
      return {title: favorite.title, author: favorite.author, likes: favorite.likes};
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
      return null; 
    }
  

    const blogCounts = {};
    blogs.forEach(blog => {
      if (blog.author in blogCounts) {
        blogCounts[blog.author]++;
      } else {
        blogCounts[blog.author] = 1;
      }
    });
  
    const maxBlogs = Math.max(...Object.values(blogCounts));
    const topAuthor = Object.keys(blogCounts).find(author => blogCounts[author] === maxBlogs);
  
    return { author: topAuthor, blogs: maxBlogs };
  };

  const mostLikes = (blogs) => {
    if (blogs.length === 0) {
      return null; 
    }
  
    const likesByAuthor = {};
    blogs.forEach(blog => {
      if (blog.author in likesByAuthor) {
        likesByAuthor[blog.author] += blog.likes;
      } else {
        likesByAuthor[blog.author] = blog.likes;
      }
    });
  
    const maxLikes = Math.max(...Object.values(likesByAuthor));
    const topAuthor = Object.keys(likesByAuthor).find(author => likesByAuthor[author] === maxLikes);
  
    return { author: topAuthor, likes: maxLikes };
  };
  
  
  module.exports = {
    dummy,
    totalLikes, 
    favoriteBlog,
    mostBlogs, 
    mostLikes
  }
