import { faPenRuler } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { GET_DB_IMAGES } from "../../core/actions/actions";

import "swiper/css";
import "swiper/css/free-mode";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";

const HomePage = () => {
  const dispatch = useDispatch();

  const loading = useSelector((state: any) => state.images.loading);
  const imagesDB = useSelector((state: any) => state.images.images);
  const recentImages = useSelector((state: any) => state.images.recentImages);
  const [start, setStart] = useState(0);

  const [fetch, setFetch] = useState(true);
  const [images, setImages] = useState<any>(imagesDB);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (imagesDB) {
      setImages([...images, ...imagesDB]);
    }
  }, [imagesDB]);

  useEffect(() => {
    if (fetch) {
      // images[images.length - 1]?.createdAt
      //   ? setStart(images[images.length - 1]?.createdAt)
      //   : 0;
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

  return (
    <main className="home">
      <div className="home-recent heading">
        <h3 className="recent-title title">Recent images</h3>
        <div className="recent-items">
          <Swiper
            freeMode={true}
            className="recent-slider"
            modules={[FreeMode]}
            slidesPerView={"auto"}
            spaceBetween={10}
            centeredSlides={true}
          >
            {/*{recentImages?.map((item: any) => {*/}
            {/*  return (*/}
            {/*    <SwiperSlide key={recentImages.indexOf(item)}>*/}
            {/*      <img*/}
            {/*        className="recent-item item"*/}
            {/*        src={item.data}*/}
            {/*        key={recentImages.indexOf(item)}*/}
            {/*      />*/}
            {/*    </SwiperSlide>*/}
            {/*  );*/}
            {/*})}*/}
          </Swiper>
        </div>
      </div>
      <div className="home-heading">
        <h3 className="gallery-title title">Paint Gallery</h3>
        <input
          type="text"
          placeholder="Type to search..."
          // onChange={getUserInput}
        />
      </div>
      <div className="gallery-items items">
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
      <Link to="/new">
        <button className="main-btn">
          <FontAwesomeIcon icon={faPenRuler} />
        </button>
      </Link>
    </main>
  );
};

export default React.memo(HomePage);
