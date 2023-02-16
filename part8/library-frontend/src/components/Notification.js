const notificationStyles = {
  color: 'green',
  fontSize: '1.5rem',
}

const Notification = ({ notification }) => {
  if (!notification) return null

  return (
    <div style={notificationStyles}>
      <h3>{notification}</h3>
    </div>
  )
}

export default Notification
