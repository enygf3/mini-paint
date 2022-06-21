import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Slider, Button } from '@mui/material';
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
} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import Canvas from './components/Canvas/Canvas';
import { useDispatch } from 'react-redux';
import { useState, useRef, RefObject, useEffect, memo } from 'react';
import { CirclePicker } from 'react-color';
import './styles.sass';
import { colorType } from './types';
import { CanvasTemplates } from '../../core/actions/canvas';
import { AuthTemplates } from '../../core/actions/auth';

const NewPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [img, setImg] = useState<string>('');
  const [color, setColor] = useState<string>('#000');
  const [penWidth, setPenWidth] = useState<number>(1);
  const [newShape, setShape] = useState<string>('');
  const [saved, setSaved] = useState<boolean>(false);

  const penSettings: RefObject<HTMLDivElement> = useRef(null);
  const colorSettings: RefObject<HTMLDivElement> = useRef(null);
  const shapesSettings: RefObject<HTMLDivElement> = useRef(null);

  const isDesktop: boolean = window.innerWidth > 768;

  const CanvasProps = {
    width: isDesktop ? 500 : 300,
    height: isDesktop ? 700 : 500,
    saveDataToState: setImg,
  };

  useEffect(() => {
    dispatch({
      type: CanvasTemplates.SET_SHAPE,
      payload: {
        shape: newShape,
      },
    });
  }, [newShape]);

  useEffect(() => {
    return window.clearTimeout();
  }, []);

  function getImg(): void {
    setSaved(true);
    setTimeout(setSaved, 1500, false);
    dispatch({
      type: CanvasTemplates.GET_IMAGE_DATA,
      payload: {
        canvas: img,
      },
    });
  }

  function SignOut(): void {
    dispatch({ type: AuthTemplates.SIGN_OUT });
    navigate('/login');
  }

  function openPenSettings(): void {
    penSettings.current ? penSettings.current.classList.toggle('active') : null;
    if (newShape.length > 0) {
      setShape('');
    }
  }

  function openColorSettings(): void {
    colorSettings.current
      ? colorSettings.current.classList.toggle('active')
      : 0;
  }

  function handleShape(): void {
    shapesSettings.current
      ? Array.from<HTMLDivElement>(
          shapesSettings.current.children as Iterable<HTMLDivElement>
        ).forEach(
          (el) =>
            (el.onclick = () => {
              setShape(el.classList[1]);
              shapesSettings.current
                ? shapesSettings.current.classList.toggle('active')
                : 0;
            })
        )
      : 0;
  }

  function openShapesSettings(): void {
    shapesSettings.current
      ? shapesSettings.current.classList.toggle('active')
      : 0;
    handleShape();
  }

  function dispatchPenWidth(): void {
    dispatch({
      type: CanvasTemplates.SET_PEN_WIDTH,
      payload: {
        width: penWidth,
      },
    });

    penSettings.current ? penSettings.current.classList.toggle('active') : null;
  }

  function dispatchColor(): void {
    dispatch({
      type: CanvasTemplates.SET_PEN_COLOR,
      payload: {
        color: color,
      },
    });

    colorSettings.current
      ? colorSettings.current.classList.toggle('active')
      : 0;
  }

  function handle(clr: colorType): void {
    setColor(clr.hex);
  }

  function dispatchErase(): void {
    dispatch({
      type: CanvasTemplates.ERASE,
      payload: {
        erase: true,
      },
    });
  }

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
          sx={{ width: 200, color: 'white' }}
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

export default memo(NewPage);
