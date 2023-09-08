import { formToJSON } from "axios"
import sanctumService from "@sanctum/sanctumService"
import { Buffer } from 'buffer'
const sanctum = new sanctumService()

export const updateUserDetails = async (data) => {
  try {
    const formData = new FormData()
    formData.append('id', data.id)
    formData.append('email', data.email)
    formData.append('password', data.password)
    formData.append('name', data.name)
    formData.append('mobile', data.mobile)
    formData.append('status', data.status)

    if (data.image && data.image instanceof File) {
      formData.append('image', data.image)
    }

    const res = await sanctum.updateUserDetails(formData)
    return res
  } catch (error) {
    throw error
  }
}
