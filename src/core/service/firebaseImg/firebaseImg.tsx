import { firestore as db } from "../../components/firebase/firebase";
import { getAuth } from "firebase/auth";
import { Timestamp } from "firebase/firestore";

export const save = async (data: string) => {
  const auth: any = getAuth();
  const time = Timestamp.now();
  await db.collection("images").add({
    user: auth.currentUser.displayName,
    data: data,
    createdAt: time.seconds,
  });
};

export const getDB = (images: Array<string>) => {
  return images;
};
