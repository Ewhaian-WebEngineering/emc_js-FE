import axios from 'axios';
import instance from '../instance';

export const getPresignedUrl = async ({ imageType, ownerId, contentType }) => {
  return instance.post('/api/upload/presigned-url', {
    imageType,
    ownerId,
    contentType,
  });
};

export const uploadToS3 = async (uploadUrl, file) => {
  try {
    await axios.put(uploadUrl, file, {
      headers: { 'Content-Type': file.type },
    });
  } catch (error) {
    error.isS3Error = true;
    throw error;
  }
};
