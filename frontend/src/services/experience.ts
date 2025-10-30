import axios from 'axios'

const baseUrl = '/api/experiences'

export const getExperiences = async () => {
  const { data } = await axios.get(baseUrl)

  return data
}

export const getExperienceById = async (id: string) => {
  const { data } = await axios.get(`${baseUrl}/${id}`)

  return data
}
