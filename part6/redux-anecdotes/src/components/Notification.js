import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notifications)
  const style = {
    border: 'solid',
    padding: 15,
    borderWidth: 1
  }
  return notification.length === 0 ? null : (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification;