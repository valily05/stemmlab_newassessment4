const CLOUD_NAME = 'stemmlab_videos';
const UPLOAD_PRESET = 'stemmlab_videos';

export const uploadVideoToCloudinary = async (
  videoUri: string
) => {
  const formData = new FormData();

  formData.append('file', {
    uri: videoUri,
    type: 'video/mp4',
    name: 'activity.mp4',
  } as any);

  formData.append(
    'upload_preset',
    UPLOAD_PRESET
  );

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`,
    {
      method: 'POST',
      body: formData,
    }
  );

  const data = await response.json();

  if (!data.secure_url) {
    throw new Error('Upload failed');
  }

  return data.secure_url;
};