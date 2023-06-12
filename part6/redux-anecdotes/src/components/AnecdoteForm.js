import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createAction } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'


const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const create = (event) => {
        event.preventDefault()
        const content = event.target.anectode.value
        event.target.anectode.value = ''
    
        dispatch(createAction(content))

        dispatch(showNotification(content, "created"))
        setTimeout(() => {
            dispatch(hideNotification(content))
        }, 5000)
      }

    return (
        <div>
            <h2>create new</h2>
                <form onSubmit={(event) => create(event)}>
                    <div><input name="anectode" /></div>
                    <button>create</button>
                </form>
        </div>
    )
}

export default AnecdoteForm;