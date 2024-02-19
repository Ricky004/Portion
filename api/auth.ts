import axios from "axios"

const API_BASE_URL = "http://localhost:8000/api/v1/users"

export const registerUser = async (value: any) => {
   try {
         await axios.post(`${API_BASE_URL}/register`, value,
         { headers: { "Content-Type": "multipart/form-data"},
    })
   } catch (err) {
      throw err
   }
}

