import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAction } from '../reducers/anecdoteReducer'
import { setFilter } from '../reducers/filterReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'


const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const filteredAnecdotes = anecdotes.filter(anecdote => anecdote.content.includes(filter))

  const vote = (anecdote) => {
    dispatch(voteAction(anecdote.id))
    dispatch(showNotification(anecdote.content, "voted"))
    setTimeout(() => {
        dispatch(hideNotification(anecdote.content))
    }, 5000)
}

return (
    <>
        {
            filteredAnecdotes
                .sort((a, b) => (a.votes > b.votes) ? -1 : 1)
                .map(anecdote =>
                    <div key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={() => vote(anecdote)}>vote</button>
                        </div>
                    </div>
                )
        }
    </>
)
}

export default AnecdoteList;

