export const uploadVideoToCloudinary =
  async (videoUri: string) => {

    const formData = new FormData();

    formData.append(
      'file',
      {
        uri: videoUri,
        name: 'video.mov',
        type: 'video/mp4',
      } as any
    );

    formData.append(
      'upload_preset',
      'steammlab'
    );
console.log('UPLOAD URL');
console.log(
  'https://api.cloudinary.com/v1_1/djm1wrfjv/auto/upload'
);
    const response = await fetch(
      'https://api.cloudinary.com/v1_1/djm1wrfjv/auto/upload',
      {
        method: 'POST',
        body: formData,
      }
    );

    const data =
      await response.json();

    console.log(
      'CLOUDINARY RESPONSE:',
      data
    );

    return data.secure_url;
};