import { useDispatch, useSelector } from 'react-redux';
import { State } from '../NewPage/components/Canvas/types';
import { AuthState } from './types';
import Loader from '../../core/components/Loader';
import './styles.sass';
import React, { useEffect, useState } from 'react';
import { ImagesTemplates } from '../../core/actions/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenRuler, faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const user = useSelector((state: AuthState) => state.auth.user);
  const imagesDB = useSelector((state: State) => state.images.userImages);
  const [fetch, setFetch] = useState(true);
  const [images, setImages] = useState(imagesDB);
  const dispatch = useDispatch();

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      dispatch({ type: ImagesTemplates.CLEAR_STATE });
    };
  }, []);

  useEffect(() => {
    if (imagesDB) {
      setImages([...images, ...imagesDB]);
    }
  }, [imagesDB]);

  useEffect(() => {
    if (fetch && user) {
      dispatch({
        type: ImagesTemplates.GET_PROFILE_IMGS,
        payload: {
          user: user.displayName,
          start: images[images.length - 1]?.createdAt
            ? images[images.length - 1]?.createdAt
            : 0,
        },
      });
    }
  }, [fetch, user]);

  function handleScroll(event: UIEvent | Event): void {
    const target = event.target as Document;
    if (
      window.innerHeight + target.documentElement.scrollTop >=
      target.documentElement.scrollHeight - 250
    ) {
      setFetch(true);
    } else {
      setFetch(false);
    }
  }

  return (
    <main className="profile-main">
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
      {/*<Link to="/new">*/}
      {/*  <button className="main-btn">*/}
      {/*    <FontAwesomeIcon icon={faPenRuler} />*/}
      {/*  </button>*/}
      {/*</Link>*/}
      <button className="main-btn">
        <FontAwesomeIcon icon={faBars} />
      </button>
    </main>
  );
};

export default ProfilePage;
