export const Notification = ({ message }) => {
  const error = message.isError && 'error'

  if (!message.text) return null

  return <div className={`notification ${error}`}>{message.text}</div>
}
