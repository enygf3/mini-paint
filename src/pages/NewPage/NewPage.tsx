import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TextFormat } from "@mui/icons-material";
import { Slider, Button } from "@mui/material";
import {
  faRightFromBracket,
  faFloppyDisk,
  faMinus,
  faPlus,
  faHouseUser,
  faShapes,
  faEraser,
  faPen,
  faPalette,
} from "@fortawesome/free-solid-svg-icons";

import { Link, useNavigate } from "react-router-dom";

import { getAuth } from "firebase/auth";

import Canvas from "../../core/components/Canvas/Canvas";
import { useDispatch } from "react-redux";
import {
  GET_IMAGE_DATA,
  SET_PEN_WIDTH,
  SET_PEN_COLOR,
} from "../../core/actions/actions";

import { useState, useRef, RefObject } from "react";

import { CirclePicker } from "react-color";

const NewPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [img, setImg] = useState<string>("");
  const [color, setColor] = useState<string>("#000");
  const [penWidth, setPenWidth] = useState<number>(1);

  const penSettings: RefObject<any> = useRef(null);
  const colorSettings: RefObject<any> = useRef(null);

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

  const openPenSettings = () => {
    penSettings.current.style.display = "flex";
  };

  const openColorSettings = () => {
    colorSettings.current.style.display = "flex";
  };

  const dispatchPenWidth = () => {
    dispatch({
      type: SET_PEN_WIDTH,
      payload: {
        width: penWidth,
      },
    });

    penSettings.current.style.display = "none";
  };

  const dispatchColor = () => {
    dispatch({
      type: SET_PEN_COLOR,
      payload: {
        color: color,
      },
    });

    colorSettings.current.style.display = "none";
  };

  const handle = (clr: any) => {
    setColor(clr.hex);
  };

  return (
    <main>
      <div className="settings" ref={penSettings}>
        <p>Set width</p>
        <Slider
          aria-label="Width"
          step={1}
          marks={true}
          min={1}
          max={20}
          defaultValue={1}
          valueLabelDisplay="auto"
          sx={{ width: 200, color: "white" }}
          onChange={(e, value) => {
            setPenWidth(value as number);
          }}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ width: 100, height: 40 }}
          onClick={dispatchPenWidth}
        >
          Submit
        </Button>
      </div>
      <div className="settings color-settings" ref={colorSettings}>
        <CirclePicker onChange={handle} />
        <Button
          variant="contained"
          color="primary"
          sx={{ width: 100, height: 40 }}
          onClick={dispatchColor}
        >
          Submit
        </Button>
      </div>
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
        <button className="nav-btn" onClick={openPenSettings}>
          <FontAwesomeIcon icon={faPen} />
        </button>
        <button className="nav-btn" onClick={openColorSettings}>
          <FontAwesomeIcon icon={faPalette} />
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
