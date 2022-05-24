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

import { Link } from "react-router-dom";

import Canvas from "../../core/components/Canvas/Canvas";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { GET_IMAGE_DATA } from "../../core/actions/actions";

const NewPage = () => {
  const size = {
    width: window.innerWidth - 60,
    height: window.innerHeight - 10,
  };

  // const GetImageData = () => {
  //   const dispatch = useDispatch();
  //   const canvas = useSelector((state: any) => state.canvas);
  //   const ctx = canvas.getContext("2d");
  //   const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
  //   useEffect(() => {
  //     dispatch({
  //       type: GET_IMAGE_DATA,
  //       payload: img,
  //     });
  //   }, [dispatch]);
  // };

  return (
    <main>
      <Canvas props={size} />
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
        <button className="nav-btn">
          <FontAwesomeIcon icon={faFloppyDisk} />
        </button>
        <button className="nav-btn">
          <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
      </nav>
    </main>
  );
};

export default NewPage;
