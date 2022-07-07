import firebase from '../configs/firebase';

export const signInUser = async (): Promise<firebase.auth.UserCredential> => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return await firebase.auth().signInWithPopup(provider);
};
export const signOutUser = (): Promise<void> => firebase.auth().signOut();
