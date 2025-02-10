import axios from "axios"


const url = `https://api.cloudinary.com/v1_1/dssnjojxu/image/upload`

const uploadImage = async (image) => {
    const formData = new FormData()
    formData.append("file", image)
    formData.append("upload_preset","blogs")
    const response = await axios.post(url, formData)
    return response.data
}

export default uploadImage