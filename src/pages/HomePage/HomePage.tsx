import {
  faBars,
  faPenRuler,
  faUser,
  faFaceSadCry,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React, {
  ChangeEvent,
  FC,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ImagesTemplates } from '../../core/actions/images';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';
import { State, Images } from '../NewPage/components/Canvas/types';
import './styles.sass';
import 'swiper/css';
import 'swiper/css/free-mode';

const HomePage: FC = () => {
  const dispatch = useDispatch();
  const imagesDB = useSelector((state: State) => state.images.images);
  const recentImages = useSelector((state: State) => state.images.recentImages);
  const userImages = useSelector((state: State) => state.images.userImages);
  const galleryRef: RefObject<HTMLDivElement> = useRef(null);
  const userRef: RefObject<HTMLDivElement> = useRef(null);
  const buttonsRef: RefObject<HTMLDivElement> = useRef(null);

  const [fetch, setFetch] = useState(true);
  const [images, setImages] = useState(imagesDB);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    dispatch({ type: ImagesTemplates.GetRecentImages });

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
    if (fetch) {
      dispatch({
        type: ImagesTemplates.GetDBImages,
        payload: {
          start: images[images.length - 1]?.createdAt
            ? images[images.length - 1]?.createdAt
            : 0,
        },
      });
    }
  }, [fetch]);

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

  function getUserInput(event: ChangeEvent) {
    const input = event.target as HTMLInputElement;
    const gallery = galleryRef.current as HTMLDivElement;
    const userImages = userRef.current as HTMLDivElement;
    if (input.value.length >= 3) {
      gallery.classList.add('disabled');
      userImages.classList.remove('disabled');
      dispatch({
        type: ImagesTemplates.GetUserImages,
        payload: { user: input.value },
      });
    } else {
      gallery.classList.remove('disabled');
      userImages.classList.add('disabled');
    }
  }

  function openMenu() {
    const div = buttonsRef.current;
    setMenu(!menu);
    div
      ? Array.from(div.children).forEach((item) => {
          console.log(item);
          item?.children[0].classList.toggle('disabled');
        })
      : 0;
  }

  return (
    <main className="home">
      <div className="home-recent heading">
        <h3 className="recent-title title">Recent images</h3>
        <div className="recent-items">
          {recentImages.length > 0 ? (
            <Swiper
              freeMode={true}
              className="recent-slider"
              modules={[FreeMode]}
              slidesPerView={'auto'}
              spaceBetween={10}
              centeredSlides={true}
            >
              {recentImages?.map((item: Images) => {
                return (
                  <SwiperSlide key={recentImages.indexOf(item)}>
                    <img
                      className="item recent-item"
                      src={item.data}
                      key={recentImages.indexOf(item)}
                      alt=""
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          ) : (
            <div className="no-recent">
              <FontAwesomeIcon icon={faFaceSadCry} />
              <p>No recent images</p>
            </div>
          )}
        </div>
      </div>
      <div className="home-heading">
        <h3 className="gallery-title title">Paint Gallery</h3>
        <input
          type="text"
          placeholder="Type to search..."
          className="gallery-input"
          onChange={getUserInput}
        />
      </div>
      <div className="gallery-items items" ref={galleryRef}>
        {images
          ? images.map((image: Images) => {
              return (
                <img
                  className="item"
                  src={image.data}
                  key={images.indexOf(image)}
                  alt=""
                />
              );
            })
          : 0}
      </div>
      <div className="user-items items disabled" ref={userRef}>
        {userImages.length > 0 ? (
          <h3>{userImages[0].user}'s images</h3>
        ) : (
          <h3>Oops! There is no such user's images</h3>
        )}
        {userImages?.map((image: Images) => {
          return (
            <img
              className={'item'}
              src={image.data}
              key={userImages.indexOf(image)}
              alt=""
            />
          );
        })}
      </div>
      <div className="home-buttons" ref={buttonsRef}>
        <Link to="/new">
          <button className="main-btn disabled">
            <FontAwesomeIcon icon={faPenRuler} />
          </button>
        </Link>
        <Link to="/profile">
          <button className="main-btn disabled">
            <FontAwesomeIcon icon={faUser} />
          </button>
        </Link>
        <button className="main-btn menu-btn" onClick={openMenu}>
          <FontAwesomeIcon icon={menu ? faXmark : faBars} />
        </button>
      </div>
    </main>
  );
};

export default React.memo(HomePage);
