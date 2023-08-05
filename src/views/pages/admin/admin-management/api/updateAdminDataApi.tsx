import { formToJSON } from "axios";
import sanctumService from "../../../../../@core/auth/sanctum/sanctumService";
import { Buffer } from 'buffer';
const sanctum = new sanctumService();

export const updateAdminDetails = async (data) => {
  try {
    const formData = new FormData();
    formData.append('id', data.id);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('type', data.type);
    formData.append('name', data.name);
    formData.append('mobile', data.mobile);
    formData.append('status', data.status);

    if (data.image && data.image instanceof File) {
      formData.append('image', data.image);
    }

    const res = await sanctum.updateAdmin(formData);
    return res;
  } catch (error) {
    throw error;
  }
};

