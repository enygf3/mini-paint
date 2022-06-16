import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Slider, Button } from "@mui/material";
import {
  faRightFromBracket,
  faFloppyDisk,
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

import Canvas from "./components/Canvas/Canvas";
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
  const [saved, setSaved] = useState<boolean>(false);

  const penSettings: RefObject<HTMLDivElement> = useRef(null);
  const colorSettings: RefObject<HTMLDivElement> = useRef(null);
  const shapesSettings: RefObject<HTMLDivElement> = useRef(null);

  const isDesktop: boolean = window.innerWidth > 768;

  const CanvasProps = {
    width: isDesktop ? 500 : 300,
    height: isDesktop ? 700 : 500,
    func: setImg,
  };

  const getImg = () => {
    setSaved(true);
    setTimeout(setSaved, 1500, false);
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
    penSettings.current ? penSettings.current.classList.toggle("active") : null;
    if (newShape.length > 0) {
      setShape("");
    }
  };

  const openColorSettings = (): void => {
    colorSettings.current
      ? colorSettings.current.classList.toggle("active")
      : 0;
  };

  const handleShape = (): void => {
    shapesSettings.current
      ? Array.from<HTMLDivElement>(
          shapesSettings.current.children as Iterable<HTMLDivElement>
        ).forEach(
          (el) =>
            (el.onclick = () => {
              setShape(el.classList[1]);
              shapesSettings.current
                ? shapesSettings.current.classList.toggle("active")
                : 0;
            })
        )
      : 0;
  };

  const openShapesSettings = (): void => {
    shapesSettings.current
      ? shapesSettings.current.classList.toggle("active")
      : 0;
    handleShape();
  };

  const dispatchPenWidth = (): void => {
    dispatch({
      type: SET_PEN_WIDTH,
      payload: {
        width: penWidth,
      },
    });

    penSettings.current ? penSettings.current.classList.toggle("active") : null;
  };

  const dispatchColor = (): void => {
    dispatch({
      type: SET_PEN_COLOR,
      payload: {
        color: color,
      },
    });

    colorSettings.current
      ? colorSettings.current.classList.toggle("active")
      : 0;
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

  useEffect(() => {
    return window.clearTimeout();
  }, []);

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
      <Canvas {...CanvasProps} />
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
      {saved ? (
        <div className="main-block notification">
          <p>You've successfully saved the image!</p>
        </div>
      ) : null}
    </main>
  );
};

export default NewPage;
