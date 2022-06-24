import { firestore as db } from '../configs/firebase';
import { Timestamp, getDocs } from 'firebase/firestore';
import { auth } from '../configs/firebase';
import { Images } from '../../pages/NewPage/components/Canvas/types';
import { imgQuery, inputQuery, profileQuery, recentQuery } from './queries';

export const save = async (data: string) => {
  await db.collection('images').add({
    user: auth.currentUser ? auth.currentUser.displayName : null,
    data: data,
    createdAt: Timestamp.now().seconds,
  });
};

export const getImages = async (start: number) => {
  const images: Array<Images> = [];
  await getDocs(imgQuery(start)).then((docs) =>
    docs.forEach((doc) => {
      images.push({
        createdAt: doc.data().createdAt,
        user: doc.data().user,
        data: doc.data().data,
      });
    })
  );
  return images;
};

export const getUserImgs = async (user: string) => {
  const images: Array<Images> = [];
  await getDocs(inputQuery(user)).then((docs) =>
    docs.forEach((doc) => {
      images.push({
        createdAt: doc.data().createdAt,
        user: doc.data().user,
        data: doc.data().data,
      });
    })
  );
  return images;
};

export const getProfileImgs = async (user: string, start: number) => {
  const images: Array<Images> = [];
  await getDocs(profileQuery(user, start)).then((docs) =>
    docs.forEach((doc) => {
      images.push({
        createdAt: doc.data().createdAt,
        user: doc.data().user,
        data: doc.data().data,
      });
    })
  );
  return images;
};

export const getRecentImgs = async () => {
  const images: Array<Images> = [];
  await getDocs(recentQuery()).then((docs) =>
    docs.forEach((doc) => {
      images.push({
        createdAt: doc.data().createdAt,
        user: doc.data().user,
        data: doc.data().data,
      });
    })
  );
  return images;
};
