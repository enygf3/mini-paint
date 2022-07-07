import {
  collection,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from 'firebase/firestore';
import { firestore as db } from '../configs/firebase';

export function profileQuery(user: string, start: number) {
  return start !== 0
    ? query(
        collection(db, 'images'),
        where('user', '==', user),
        orderBy('createdAt', 'desc'),
        startAfter(start),
        limit(5)
      )
    : query(collection(db, 'images'), where('user', '==', user), limit(5));
}
