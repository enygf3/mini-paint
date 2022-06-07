import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  faGripLines,
  faSquare,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";

import { Link, useNavigate } from "react-router-dom";

import Canvas from "../../core/components/Canvas/Canvas";
import { useDispatch } from "react-redux";
import {
  GET_IMAGE_DATA,
  SET_PEN_WIDTH,
  SET_PEN_COLOR,
  SET_SHAPE,
  ERASE,
  SIGN_OUT,
} from "../../core/actions/actions";

import { useState, useRef, RefObject, useEffect } from "react";

import { CirclePicker } from "react-color";

const NewPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [img, setImg] = useState<string>("");
  const [color, setColor] = useState<string>("#000");
  const [penWidth, setPenWidth] = useState<number>(1);
  const [newShape, setShape] = useState<string>("");

  const penSettings: RefObject<any> = useRef(null);
  const colorSettings: RefObject<any> = useRef(null);
  const shapesSettings: RefObject<any> = useRef(null);

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

  const SignOut = (): void => {
    dispatch({ type: SIGN_OUT });
    navigate("/login");
  };

  const openPenSettings = (): void => {
    penSettings.current.classList.toggle("active");
    if (newShape.length > 0) {
      setShape("");
    }
  };

  const openColorSettings = (): void => {
    colorSettings.current.classList.toggle("active");
  };

  const handleShape = (): void => {
    Array.from<HTMLDivElement>(shapesSettings.current.children).forEach(
      (el) =>
        (el.onclick = () => {
          setShape(el.classList[1]);
          shapesSettings.current.classList.toggle("active");
        })
    );
  };

  const openShapesSettings = (): void => {
    shapesSettings.current.classList.toggle("active");
    handleShape();
  };

  const dispatchPenWidth = (): void => {
    dispatch({
      type: SET_PEN_WIDTH,
      payload: {
        width: penWidth,
      },
    });

    penSettings.current.classList.toggle("active");
  };

  const dispatchColor = (): void => {
    dispatch({
      type: SET_PEN_COLOR,
      payload: {
        color: color,
      },
    });

    colorSettings.current.classList.toggle("active");
  };

  interface colorType {
    hex: string;
  }

  const handle = (clr: colorType): void => {
    setColor(clr.hex);
  };

  const dispatchErase = (): void => {
    dispatch({
      type: ERASE,
      payload: {
        erase: true,
      },
    });
  };

  useEffect(() => {
    dispatch({
      type: SET_SHAPE,
      payload: {
        shape: newShape,
      },
    });
  }, [newShape]);

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
      <div className="settings shapes" ref={shapesSettings}>
        <FontAwesomeIcon icon={faSquare} />
        <FontAwesomeIcon icon={faGripLines} />
        <FontAwesomeIcon icon={faCircle} />
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
        <button className="nav-btn" onClick={openShapesSettings}>
          <FontAwesomeIcon icon={faShapes} />
        </button>
        <button className="nav-btn" onClick={dispatchErase}>
          <FontAwesomeIcon icon={faEraser} />
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
