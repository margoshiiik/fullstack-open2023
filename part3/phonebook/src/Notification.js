import './Notification.css'

const Notification = ({ message }) => {
  console.log('im here')
    if (message === null) {
      return null
    }
    else {
      if (message.type === 'success'){
        return (
          <div className="success">
            {message.text}
          </div>
        )
      }
      if (message.type === 'validation'){
        return (
          <div className="error">
            {message.text}
          </div>
        )
      }
      else {
        return (
          <div className='error'>
            {message.text}
          </div>
        )
      }
    }
  
}

export default Notification;