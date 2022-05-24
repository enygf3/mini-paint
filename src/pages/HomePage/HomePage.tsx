import * as React from "react";
import { faPenRuler } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const HomePage = () => {
  const store = useSelector((state) => state);
  console.log(store);
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
