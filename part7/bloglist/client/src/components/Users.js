import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { userServices } from '../services/users'

const Users = () => {
  const { data, isLoading } = useQuery('users', userServices.getAll, {
    refetchOnWindowFocus: false,
  })

  if (isLoading) {
    return 'Loading, please wait...'
  }

  return (
    <div>
      <h2>Users</h2>

      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>

        <tbody>
          {data.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={user.id}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
