// import { v2 as cloudinary } from 'cloudinary';
// import fs from 'fs';

const url = `https://api.cloudinary.com/v1_1/${
    "daywkdpog"
  }/upload`;

export const  uploadImage = async (file : File) => {
    console.log(file)
    const formData = new FormData();
    const fields = {
        file,
        upload_preset: "znqwmigm",
        tags: ['myphotoalbum-react'],
        multiple: true,
        resource_type: 'image',
    };
    Object.entries(fields).forEach(([key, value]) => {
        if (typeof value === 'string' || typeof value === 'boolean') {
          formData.append(key, value.toString());
        } else if (value instanceof File) {
          formData.append(key, value);
        } else if (Array.isArray(value)) {
          value.forEach((item, index) => {
            formData.append(`${key}[${index}]`, item);
          });
        } else {
          console.error('Unexpected value type:', typeof value);
        }
    });

    const options = {
        method: 'POST',
        body: formData,
    };
    const response = await fetch(url, options);
    if (!response.ok) {
    throw new Error('Failed to execute file upload via the Fetch API');
    }
    const json = await response.json();
    const secureUrl = json.secure_url;
    return secureUrl;
}
// export const uploadImage = async (filePath: string) => {
//   try {
//     const result = await cloudinary.uploader.upload(filePath, {
//       folder: 'cars' 
//     });
//     return result.secure_url;
//   } catch (error) {
//     console.error('Error uploading image:', error);
//     throw error;
//   }
// };


// export const uploadFileToCloudinary = async (file: File) => {
//     try {
//         const tempPath = `/tmp/${file.name}`;
//         const buffer = await file.arrayBuffer();
//         await fs.promises.writeFile(tempPath, Buffer.from(buffer));
    
//         const result = await cloudinary.uploader.upload(tempPath, {
//           resource_type: 'auto',
//           folder: 'my_uploads'
//         });
    
//         fs.unlinkSync(tempPath);
    
//         return result.secure_url;
//       } catch (error) {
//         console.error('Error uploading file:', error);
//         throw error;
//       }
//   };