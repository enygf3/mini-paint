import { collection, query, where } from 'firebase/firestore';
import { firestore as db } from '../configs/firebase';

export function inputQuery(user: string) {
  return query(collection(db, 'images'), where('user', '==', user));
}
