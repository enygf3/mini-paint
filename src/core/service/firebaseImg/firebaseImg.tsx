import { firestore as db } from "../../components/firebase/firebase";
import { getAuth } from "firebase/auth";

export const save = async (data: string) => {
  const auth: any = getAuth();
  await db.collection("images").add({
    user: auth.currentUser.displayName,
    data: data,
  });
};

export const getDB = (images: Array<string>) => {
  return images;
};
