import { useNotificationValue } from '../context/NotificationContext'

export const Notification = () => {
  const notification = useNotificationValue()

  const error = notification.isError && 'error'

  if (!notification.text) return null

  return (
    <div id="notification" className={`notification ${error}`}>
      {notification.text}
    </div>
  )
}
