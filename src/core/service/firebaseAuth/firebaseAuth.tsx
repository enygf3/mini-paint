import firebase from "../../components/firebase/firebase";

export const signInUser = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return await firebase.auth().signInWithPopup(provider);
};
export const signOutUser = () => firebase.auth().signOut();
