import * as React from "react";
import { faPenRuler } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { GET_DB_IMAGES } from "../../core/actions/actions";
import { firestore as db } from "../../core/components/firebase/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";

const HomePage = () => {
  const dispatch = useDispatch();

  const imagesCollection = collection(db, "images");
  const [imagesDB, loading] = useCollectionData(imagesCollection);

  useEffect(() => {
    !loading
      ? dispatch({ type: GET_DB_IMAGES, payload: { images: imagesDB } })
      : 0;
  }, [loading]);
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
      <div className="gallery-items items"></div>
      <Link to="/new">
        <button className="main-btn">
          <FontAwesomeIcon icon={faPenRuler} />
        </button>
      </Link>
    </main>
  );
};

export default HomePage;
