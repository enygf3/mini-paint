import { firestore as db } from "../../components/firebase/firebase";
import { getAuth } from "firebase/auth";
import { useSelector } from "react-redux";

export const save = async () => {
  const data = useSelector((state: any) => state.canvas.canvas);
  const auth: any = getAuth();
  await db.collection("images").add({
    user: auth.currentUser.displayName,
    data: data,
  });

  return data;
};
