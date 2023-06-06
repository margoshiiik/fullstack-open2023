const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (username === undefined)  return response.status(400).json({ error: ' username is missing' })
  if (password === undefined) return response.status(400).json({ error: 'password is missing' })
  if (password.length < 3) return response.status(400).json({ error: 'password must be more then 3 characters' })
  if (username.length < 3) return response.status(400).json({ error: 'username must more then 3 characters' })
    
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response, next) => {
    try {
        const users = await User.find({}).populate('blogs')
        response.json(users.map(user => user.toJSON()))
    }
    catch (exception) {
        next(exception)
    }
})

module.exports = usersRouter