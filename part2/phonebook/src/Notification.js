import './Notification.css'

const Notification = ({ message }) => {
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