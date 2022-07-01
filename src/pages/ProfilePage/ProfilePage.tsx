import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../core/components/Loader';
import './styles.sass';
import React, { RefObject, useEffect, useRef, useState } from 'react';
import { ImagesTemplates } from '../../core/actions/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPenRuler,
  faBars,
  faHouse,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { userProfileStateSelector } from '../../core/selectors/user';
import { imagesUserStateSelector } from '../../core/selectors/images';

const ProfilePage = () => {
  const user = useSelector(userProfileStateSelector);
  const imagesDB = useSelector(imagesUserStateSelector);

  const buttonsRef: RefObject<HTMLDivElement> = useRef(null);

  const [fetch, setFetch] = useState(true);
  const [images, setImages] = useState(imagesDB);
  const [menu, setMenu] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      dispatch({ type: ImagesTemplates.ClearState });
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
        type: ImagesTemplates.GetProfileImages,
        payload: {
          user: user.displayName,
          start: images[images.length - 1]?.createdAt
            ? images[images.length - 1]?.createdAt
            : 0,
        },
      });
    }
  }, [fetch, user]);

  const handleScroll = (event: UIEvent | Event): void => {
    const target = event.target as Document;
    if (
      window.innerHeight + target.documentElement.scrollTop >=
      target.documentElement.scrollHeight - 250
    ) {
      setFetch(true);
    } else {
      setFetch(false);
    }
  };

  const openMenu = (): void => {
    const div = buttonsRef.current;
    setMenu(!menu);
    div
      ? Array.from(div.children).forEach((item) => {
          console.log(item);
          item?.children[0].classList.toggle('disabled');
        })
      : 0;
  };

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
      <div className="profile-buttons" ref={buttonsRef}>
        <Link to="/new">
          <button className="main-btn disabled">
            <FontAwesomeIcon icon={faPenRuler} />
          </button>
        </Link>
        <Link to="/">
          <button className="main-btn disabled">
            <FontAwesomeIcon icon={faHouse} />
          </button>
        </Link>
        <button className="main-btn menu-btn" onClick={openMenu}>
          <FontAwesomeIcon icon={menu ? faXmark : faBars} />
        </button>
      </div>
    </main>
  );
};

export default ProfilePage;
