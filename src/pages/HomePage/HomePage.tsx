import { faPenRuler } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faFaceSadCry } from "@fortawesome/free-solid-svg-icons";

import { useDispatch, useSelector } from "react-redux";
import React, {
  ChangeEvent,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  CLEAR_STATE,
  GET_DB_IMAGES,
  GET_RECENT_IMAGES,
  GET_USER_IMGS,
} from "../../core/actions/actions";

import "swiper/css";
import "swiper/css/free-mode";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";

const HomePage = () => {
  const dispatch = useDispatch();
  const imagesDB = useSelector((state: any) => state.images.images);
  const recentImages = useSelector((state: any) => state.images.recentImages);
  const userImages = useSelector((state: any) => state.images.userImages);
  const galleryRef: RefObject<HTMLDivElement> = useRef(null);
  const userRef: RefObject<HTMLDivElement> = useRef(null);

  const [fetch, setFetch] = useState(true);
  const [images, setImages] = useState<any>(imagesDB);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    dispatch({ type: GET_RECENT_IMAGES });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      dispatch({ type: CLEAR_STATE });
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
        type: GET_DB_IMAGES,
        payload: {
          start: images[images.length - 1]?.createdAt
            ? images[images.length - 1]?.createdAt
            : 0,
        },
      });
    }
  }, [fetch]);

  function handleScroll(e: any) {
    if (
      window.innerHeight + e.target.documentElement.scrollTop >=
      e.target.documentElement.scrollHeight - 150
    ) {
      setFetch(true);
    } else {
      setFetch(false);
    }
  }

  function getUserInput(e: ChangeEvent) {
    const input = e.target as HTMLInputElement;
    const gallery = galleryRef.current as HTMLDivElement;
    const userImages = userRef.current as HTMLDivElement;
    if (input.value.length >= 3) {
      gallery.classList.add("disabled");
      userImages.classList.remove("disabled");
      dispatch({ type: GET_USER_IMGS, payload: { user: input.value } });
    } else {
      gallery.classList.remove("disabled");
      userImages.classList.add("disabled");
    }
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
              slidesPerView={"auto"}
              spaceBetween={10}
              centeredSlides={true}
            >
              {recentImages?.map((item: any) => {
                return (
                  <SwiperSlide key={recentImages.indexOf(item)}>
                    <img
                      className="recent-item item"
                      src={item.data}
                      key={recentImages.indexOf(item)}
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
          onChange={getUserInput}
        />
      </div>
      <div className="gallery-items items" ref={galleryRef}>
        {images
          ? images.map((image: any) => {
              return (
                <img
                  className="item"
                  src={image.data}
                  key={images.indexOf(image)}
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
        {userImages?.map((image: any) => {
          return (
            <img
              className={"item"}
              src={image.data}
              key={userImages.indexOf(image)}
            />
          );
        })}
      </div>
      <Link to="/new">
        <button className="main-btn">
          <FontAwesomeIcon icon={faPenRuler} />
        </button>
      </Link>
    </main>
  );
};

export default React.memo(HomePage);
