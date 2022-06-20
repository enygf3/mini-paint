import { firestore as db } from '../configs/firebase';
import {
  Timestamp,
  query,
  collection,
  where,
  getDocs,
  orderBy,
  startAfter,
  limit,
} from 'firebase/firestore';
import { auth } from '../configs/firebase';
import { Images } from '../../pages/types';

export const save = async (data: string) => {
  await db.collection('images').add({
    user: auth.currentUser ? auth.currentUser.displayName : null,
    data: data,
    createdAt: Timestamp.now().seconds,
  });
};

export const getImages = async (start: number) => {
  const images: Array<Images> = [];
  const imgQuery =
    start !== 0
      ? query(
          collection(db, 'images'),
          orderBy('createdAt', 'desc'),
          startAfter(start),
          limit(5)
        )
      : query(collection(db, 'images'), orderBy('createdAt', 'desc'), limit(5));
  await getDocs(imgQuery).then((docs) =>
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
  const inputQuery = query(collection(db, 'images'), where('user', '==', user));
  await getDocs(inputQuery).then((docs) =>
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
  const time = Math.floor(new Date().getTime() / 1000) - 600;
  const images: Array<Images> = [];
  const recentQuery = query(
    collection(db, 'images'),
    where('createdAt', '>', time),
    limit(5)
  );
  await getDocs(recentQuery).then((docs) =>
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
