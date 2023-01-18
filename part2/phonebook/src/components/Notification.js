export const Notification = ({ message }) => {
  const error = message.isError && 'error'

  return <div className={`notification ${error}`}>{message.text}</div>
}
