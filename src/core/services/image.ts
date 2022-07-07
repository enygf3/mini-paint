import { Timestamp, getDocs } from 'firebase/firestore';
import { auth } from '../configs/firebase';
import { firestore as db } from '../configs/firebase';
import { imgQuery } from '../queries/images';
import { inputQuery } from '../queries/input';
import { profileQuery } from '../queries/profile';
import { recentQuery } from '../queries/recent';

export const save = async (data: string) => {
  await db.collection('images').add({
    user: auth.currentUser ? auth.currentUser.displayName : null,
    data: data,
    createdAt: Timestamp.now().seconds,
  });
};

export const getImages = async (start: number) => {
  return await getDocs(imgQuery(start)).then((docs) => {
    return docs.docs.map((doc) => doc.data());
  });
};

export const getUserImgs = async (user: string) => {
  return await getDocs(inputQuery(user)).then((docs) => {
    return docs.docs.map((doc) => doc.data());
  });
};

export const getProfileImgs = async (user: string, start: number) => {
  return await getDocs(profileQuery(user, start)).then((docs) => {
    return docs.docs.map((doc) => doc.data());
  });
};

export const getRecentImgs = async () => {
  return await getDocs(recentQuery()).then((docs) => {
    return docs.docs.map((doc) => doc.data());
  });
};
