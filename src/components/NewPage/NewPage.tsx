import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faShapes } from "@fortawesome/free-solid-svg-icons";
import { faEraser } from "@fortawesome/free-solid-svg-icons";
import { TextFormat } from "@mui/icons-material";
import { faHouseUser } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";

import Canvas from "../Canvas/Canvas";

const MainPage = () => {
  const size = {
    width: "300",
    height: "700",
  };
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
        <Link to="/home">
          <button className="nav-btn">
            <FontAwesomeIcon icon={faHouseUser} />
          </button>
        </Link>
        <button className="nav-btn">
          <FontAwesomeIcon icon={faFloppyDisk} />
        </button>
      </nav>
    </main>
  );
};

export default MainPage;