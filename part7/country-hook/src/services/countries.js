const baseUrl = 'https://restcountries.com/v3.1/name'

const getByFullName = async (name) => {
  const response = await fetch(`${baseUrl}/${name}?fullText=true`)
  return response
}

export const countryService = {
  getByFullName,
}
