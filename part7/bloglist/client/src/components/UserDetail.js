import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { userServices } from '../services/users'

const UserDetail = () => {
  const { id } = useParams()

  const { data, isLoading } = useQuery('user', () => userServices.getById(id), {
    refetchOnWindowFocus: false,
    retry: false,
    onError: (res) => {
      console.log(res.response.data.error)
    },
  })
  const navigate = useNavigate()

  if (isLoading) return 'Loading, please wait...'

  if (!data) {
    return <h2>That user doesn&apos;t exist</h2>
  }

  return (
    <div>
      <h2>{data.name}</h2>

      {data.blogs.length === 0 && <h3>No blogs for this user</h3>}

      {data.blogs.length > 0 && (
        <>
          <h3>added blogs</h3>
          <ul>
            {data.blogs.map((blog) => (
              <li key={blog.id}>{blog.title}</li>
            ))}{' '}
          </ul>
        </>
      )}

      <button onClick={() => navigate('/users')}>Go back</button>
    </div>
  )
}

export default UserDetail
