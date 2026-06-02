// avatarData.ts

import { ImageSourcePropType } from 'react-native';

export const placeholderAvatars: ImageSourcePropType[] = [
  require('../assets/images/avatars/miffy-avatar.png'),
  require('../assets/images/avatars/bear-avatar.png'),
  require('../assets/images/avatars/frog-avatar.png'),
  require('../assets/images/avatars/panda-avatar.png'),
  require('../assets/images/avatars/penguin-avatar.png'),
  require('../assets/images/avatars/dog-avatar.png'),
  require('../assets/images/avatars/elephant-avatar.png'),
  require('../assets/images/avatars/cow-avatar.png'),
    require('../assets/images/avatars/fox-avatar.png'),
];

export const getAvatarSource = (
  photoURL?: string | null,
  uid?: string | number | null
): ImageSourcePropType | { uri: string } => {
  // Use uploaded / Google profile photo if available
  if (
    photoURL &&
    typeof photoURL === 'string' &&
    photoURL.trim().length > 0
  ) {
    return { uri: photoURL };
  }

  // Generate a consistent avatar index from UID
  const hash =
    typeof uid === 'string'
      ? uid.split('').reduce(
          (sum, char) =>
            sum + char.charCodeAt(0),
          0
        )
      : Number(uid) || 0;

  return placeholderAvatars[
    hash % placeholderAvatars.length
  ];
};

export const getAvatarIndex = (
  uid?: string | number | null
) => {
  const hash =
    typeof uid === 'string'
      ? uid.split('').reduce(
          (sum, char) =>
            sum + char.charCodeAt(0),
          0
        )
      : Number(uid) || 0;

  return hash % placeholderAvatars.length;
};

export default getAvatarSource;