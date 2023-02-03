import axios from 'axios'
import { useEffect, useState } from 'react'

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  const create = async (resource) => {
    const response = await axios.post(baseUrl, resource)
    return response.data
  }

  useEffect(() => {
    const getAll = async () => {
      const response = await axios.get(baseUrl)
      return response.data
    }

    getAll().then((data) => setResources(data))
  }, [baseUrl])

  const service = {
    create,
    setResources,
  }

  return [resources, service]
}

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}
