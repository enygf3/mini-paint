import { firestore as db } from "../configs/firebase";
import { getAuth } from "firebase/auth";
import {
  Timestamp,
  query,
  collection,
  where,
  getDocs,
  orderBy,
  startAfter,
  limit,
} from "firebase/firestore";

export const save = async (data: string) => {
  const auth: any = getAuth();
  const time = Timestamp.now();
  await db.collection("images").add({
    user: auth.currentUser.displayName,
    data: data,
    createdAt: time.seconds,
  });
};

export const getImages = async (start: number) => {
  const result: Array<object> = [];
  const imgQuery =
    start !== 0
      ? query(
          collection(db, "images"),
          orderBy("createdAt", "desc"),
          startAfter(start),
          limit(5)
        )
      : query(collection(db, "images"), orderBy("createdAt", "desc"), limit(5));
  const images: any = await getDocs(imgQuery);
  images.forEach((doc: any) => {
    result.push(doc.data());
  });
  return result;
};

export const getUserImgs = async (user: string) => {
  const result: Array<object> = [];
  const inputQuery = query(collection(db, "images"), where("user", "==", user));
  const images: any = await getDocs<any>(inputQuery);
  images.forEach((doc: any) => {
    result.push(doc.data());
  });
  return result;
};

export const getRecentImgs = async () => {
  const time = Math.floor(new Date().getTime() / 1000) - 600;
  const result: Array<object> = [];
  const recentQuery = query(
    collection(db, "images"),
    where("createdAt", ">", time),
    limit(5)
  );
  const images: any = await getDocs<any>(recentQuery);
  images.forEach((doc: any) => {
    result.push(doc.data());
  });
  return result;
};
