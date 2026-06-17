export const placeholderAvatars = [
  require('../assets/images/avatars/avatar1.png'),
  require('../assets/images/avatars/avatar2.png'),
  require('../assets/images/avatars/avatar3.png'),
  require('../assets/images/avatars/avatar4.png'),
  require('../assets/images/avatars/avatar5.png'),
  require('../assets/images/avatars/avatar6.png'),
  require('../assets/images/avatars/avatar7.png'),
  require('../assets/images/avatars/avatar8.png'),
  require('../assets/images/avatars/avatar9.png'),
];

export const getAvatarSource = (
  photoUrl?: string | null,
  id?: string | number
) => {
  if (photoUrl) {
    return { uri: photoUrl };
  }

  const value =
    typeof id === 'string'
      ? id.split('').reduce(
          (sum, char) =>
            sum + char.charCodeAt(0),
          0
        )
      : Number(id) || 0;

  return placeholderAvatars[
    value % placeholderAvatars.length
  ];
};