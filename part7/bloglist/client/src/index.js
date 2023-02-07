import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import App from './App'
import { NotificationContextProvider } from './context/NotificationContext'
import { UserContextProvider } from './context/UserContext'
import { BrowserRouter } from 'react-router-dom'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <UserContextProvider>
      <NotificationContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </NotificationContextProvider>
    </UserContextProvider>
  </QueryClientProvider>
)
