import axios from 'axios'

const baseUrl = 'http://localhost:3001/notes'

export async function getAllNotesRequest() {
  return await axios.get(baseUrl)
}

export async function createNoteRequest(newObject) {
  return await axios.post(baseUrl, newObject)
}

export async function updateNoteRequest (id, newObject) {
  return await axios.put(`${baseUrl}/${id}`, newObject)
}



