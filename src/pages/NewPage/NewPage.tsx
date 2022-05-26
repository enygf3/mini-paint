import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faShapes } from "@fortawesome/free-solid-svg-icons";
import { faEraser } from "@fortawesome/free-solid-svg-icons";
import { TextFormat } from "@mui/icons-material";
import { faHouseUser } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import { Link, useNavigate } from "react-router-dom";

import { getAuth } from "firebase/auth";

import Canvas from "../../core/components/Canvas/Canvas";
import { useDispatch } from "react-redux";
import { GET_IMAGE_DATA } from "../../core/actions/actions";

import { useState } from "react";

const NewPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [img, setImg] = useState<string>("");

  const canvas = {
    width: window.innerWidth - 60,
    height: window.innerHeight - 10,
    func: setImg,
  };

  const getImg = () => {
    dispatch({
      type: GET_IMAGE_DATA,
      payload: {
        canvas: img,
      },
    });
  };

  const SignOut = () => {
    localStorage.removeItem("isLoggedIn");
    getAuth()
      .signOut()
      .then((res) => {
        console.log(res);
      });

    navigate("/login");
  };

  return (
    <main>
      <Canvas props={canvas} />
      <div className="main-zoom zoom">
        <button>
          <FontAwesomeIcon icon={faPlus} />
        </button>
        <p>100%</p>
        <button>
          <FontAwesomeIcon icon={faMinus} />
        </button>
      </div>
      <nav>
        <button className="nav-btn">
          <FontAwesomeIcon icon={faPen} />
        </button>
        <button className="nav-btn">
          <FontAwesomeIcon icon={faShapes} />
        </button>
        <button className="nav-btn">
          <FontAwesomeIcon icon={faEraser} />
        </button>
        <button className="nav-btn">
          <TextFormat />
        </button>
        <Link to="/">
          <button className="nav-btn">
            <FontAwesomeIcon icon={faHouseUser} />
          </button>
        </Link>
        <button className="nav-btn" onClick={getImg}>
          <FontAwesomeIcon icon={faFloppyDisk} />
        </button>
        <button className="nav-btn" onClick={SignOut}>
          <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
      </nav>
    </main>
  );
};

export default NewPage;
