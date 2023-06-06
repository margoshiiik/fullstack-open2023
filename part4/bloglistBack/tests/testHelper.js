const Blog = require('../models/blog')
const User = require('../models/user')


const initialBlogs = [
  {
    title: "EVERYTHING YOU'VE HOPED IS TRUE!",
    author: "NEIL GAIMAN",
    url: "https://journal.neilgaiman.com/2022/11/everything-youve-hoped-is-true.html",
    likes: 120
  },
  {
    title: "Good writing day. Not epic, but…",
    author: "HOLLY LISLE",
    url: "https://hollylisle.com/good-writing-day-not-epic-but/",
    likes: 56
  },
  {
    title: "The Popularity of Exorcism Films Reveals Continued Belief in a Supernatural Worldview",
    author: "MIKE DURAN",
    url: "https://www.mikeduran.com/2023/04/22/the-popularity-of-exorcism-films-reveals-continued-belief-in-a-supernatural-worldview",
    likes: 202
  },
  {
    title: "How Theme in Fiction Gets to the Heart of Your Characters",
    author: "C. S. Lakin",
    url: "https://www.livewritethrive.com/2023/05/08/how-theme-in-fiction/",
    likes: 46
  }
]

const idNotExist = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDatabase = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, idNotExist, blogsInDatabase, usersInDb
}