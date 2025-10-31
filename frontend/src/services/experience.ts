import axios from 'axios'

const baseUrl = '/api/experiences'

export const getExperiences = async (text: string = '') => {
  const { data } = await axios.get(`${baseUrl}?search=${text}`)

  return data
}

export const getExperienceById = async (id: string) => {
  const { data } = await axios.get(`${baseUrl}/${id}`)

  return data
}
