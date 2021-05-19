import axios from 'axios'

const baseUrl = 'http://localhost:3001/notes'

export async function getAllNotesRequest() {
  const response = await axios.get(baseUrl)
  return response.data
}

export async function createNoteRequest(newObject) {
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

export async function updateNoteRequest (id, newObject) {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}



