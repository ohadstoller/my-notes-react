import axios from 'axios'

const baseUrl = 'http://localhost:3001/notes'

export async function getAllNotesRequest() {
  try {
    const response = await axios.get(baseUrl)
    return response.data
  } catch (e) {
    return e.error
  }

}

export async function createNoteRequest(newObject) {
  try {
    const response = await axios.post(baseUrl, newObject)
    return response.data
  } catch (e) {
    return e.error
  }

}

export async function updateNoteRequest(id, newObject) {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, newObject)
    return response.data
  } catch (e) {
    console.log(e)
    return e.error

  }

}



