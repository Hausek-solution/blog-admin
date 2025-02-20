import { AxiosResponse } from "axios";
import { UploadResponse } from "../types/media-type";
import { axiosInstance } from "../context/axios-context";

export const uploadImage = async (data : FormData): Promise<AxiosResponse<UploadResponse, any> | string> => {
    try {
        const response = await axiosInstance.post(`media/upload`, data,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        )
        return response
    }catch (e) {
        return 'Something went wrong uploading featired image' as string
    }
}