import { useDispatch, useSelector } from 'react-redux';
import { State } from '../NewPage/components/Canvas/types';
import { AuthState } from './types';
import Loader from '../../core/components/Loader';
import './styles.sass';
import { useEffect } from 'react';
import { ImagesTemplates } from '../../core/actions/images';

const ProfilePage = () => {
  const user = useSelector((state: AuthState) => state.auth.user);
  const images = useSelector((state: State) => state.images.userImages);
  const dispatch = useDispatch();
  useEffect(() => {
    user
      ? dispatch({
          type: ImagesTemplates.GET_USER_IMGS,
          payload: { user: user.displayName },
        })
      : 0;

    return () => {
      dispatch({ type: ImagesTemplates.CLEAR_STATE });
    };
  }, [user]);

  return (
    <main>
      <h3 className="profile-title title">Profile</h3>
      {user ? (
        <>
          <div className="profile-content">
            <img src={user.photoURL} alt="" />
            <h3 className="profile-name">{user.displayName}</h3>
            <h3 className="content-heading">Your images</h3>
          </div>
        </>
      ) : (
        <Loader />
      )}
      <div className="profile-images items">
        {images ? (
          images?.map((item, index) => {
            return <img className="item" src={item.data} key={index} alt="" />;
          })
        ) : (
          <Loader />
        )}
      </div>
    </main>
  );
};

export default ProfilePage;
