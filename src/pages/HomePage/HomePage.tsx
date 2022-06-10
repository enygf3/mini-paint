import { faPenRuler } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { GET_DB_IMAGES } from "../../core/actions/actions";
import { firestore as db } from "../../core/components/firebase/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  collection,
  query,
  limit,
  orderBy,
  startAfter,
} from "firebase/firestore";

const HomePage = () => {
  const dispatch = useDispatch();

  const [start, setStart] = useState(0);
  const imagesCollection =
    start !== 0
      ? query(
          collection(db, "images"),
          orderBy("createdAt", "desc"),
          startAfter(start),
          limit(5)
        )
      : query(collection(db, "images"), orderBy("createdAt", "desc"), limit(5));
  const [imagesDB, loading] = useCollectionData<any>(imagesCollection);
  const [fetch, setFetch] = useState(true);
  const [images, setImages] = useState<any>([]);

  useEffect(() => {
    if (imagesDB) {
      setImages([...images, ...imagesDB]);
    }
  }, [imagesDB]);

  useEffect(() => {
    if (!loading && fetch) {
      images[images.length - 1]?.createdAt
        ? setStart(images[images.length - 1]?.createdAt)
        : 0;
      dispatch({ type: GET_DB_IMAGES, payload: { images: images } });
    }
  }, [fetch, loading]);

  const HandleScroll = (e: Event | any) => {
    if (
      window.innerHeight + e.target.documentElement.scrollTop >=
      e.target.documentElement.scrollHeight - 150
    ) {
      setFetch(true);
    } else {
      setFetch(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", HandleScroll);

    return () => window.removeEventListener("scroll", HandleScroll);
  }, []);

  return (
    <main className="home">
      <div className="home-recent heading">
        <h3 className="recent-title title">Recent images</h3>
        <div className="recent-items items"></div>
      </div>
      <div className="home-heading">
        <h3 className="gallery-title title">Paint Gallery</h3>
        <input type="text" placeholder="Type to search..." />
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

export default HomePage;
