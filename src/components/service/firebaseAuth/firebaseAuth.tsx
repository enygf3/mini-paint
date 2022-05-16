import firebase from '../../firebase/firebase';

export const signInUser = async () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    const auth = await firebase.auth().signInWithPopup(provider)
    return auth
};
export const signOutUser = () => firebase.auth().signOut();