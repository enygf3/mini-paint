import { collection, limit, query, where } from 'firebase/firestore';
import { firestore as db } from '../configs/firebase';

export function recentQuery() {
  const time = Math.floor(new Date().getTime() / 1000) - 600;
  return query(
    collection(db, 'images'),
    where('createdAt', '>', time),
    limit(5)
  );
}
