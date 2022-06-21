import {
  collection,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from 'firebase/firestore';
import { firestore as db } from '../configs/firebase';

export function imgQuery(start: number) {
  return start !== 0
    ? query(
        collection(db, 'images'),
        orderBy('createdAt', 'desc'),
        startAfter(start),
        limit(5)
      )
    : query(collection(db, 'images'), orderBy('createdAt', 'desc'), limit(5));
}

export function inputQuery(user: string) {
  return query(collection(db, 'images'), where('user', '==', user));
}

export function recentQuery() {
  const time = Math.floor(new Date().getTime() / 1000) - 600;
  return query(
    collection(db, 'images'),
    where('createdAt', '>', time),
    limit(5)
  );
}
