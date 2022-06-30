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
import { useDispatch } from 'react-redux';
import { useState, useRef, RefObject, useEffect, memo } from 'react';
import { CirclePicker } from 'react-color';
import './styles.sass';
import { CanvasType, ColorType } from './types';
import { CanvasTemplates } from '../../core/actions/canvas';
import { AuthTemplates } from '../../core/actions/auth';
import Canvas from './components/Canvas/Canvas';

const NewPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [img, setImg] = useState<string>('');
  const [saved, setSaved] = useState<boolean>(false);
  const [canvasState, setCanvasState] = useState<CanvasType>({
    penWidth: 1,
    penColor: '#000000',
    shape: '',
    erase: false,
  });

  const penSettings: RefObject<HTMLDivElement> = useRef(null);
  const colorSettings: RefObject<HTMLDivElement> = useRef(null);
  const shapesSettings: RefObject<HTMLDivElement> = useRef(null);

  const isDesktop: boolean = window.innerWidth > 768;

  const CanvasProps = {
    width: isDesktop ? 500 : 300,
    height: isDesktop ? 700 : 500,
    saveDataToState: setImg,
    state: canvasState,
  };

  useEffect(() => {
    return window.clearTimeout();
  }, []);

  const getImg = (): void => {
    setSaved(true);
    setTimeout(setSaved, 1500, false);
    dispatch({
      type: CanvasTemplates.SaveImg,
      payload: {
        canvas: img,
      },
    });
  };

  const SignOut = (): void => {
    dispatch({ type: AuthTemplates.SignOut });
    navigate('/login');
  };

  const openPenSettings = (): void => {
    penSettings.current ? penSettings.current.classList.toggle('active') : null;
    if (canvasState.shape.length > 0) {
      canvasStateExecuter('shape', '');
    }
  };

  const openColorSettings = (): void => {
    colorSettings.current
      ? colorSettings.current.classList.toggle('active')
      : 0;
  };

  const handleShape = (): void => {
    shapesSettings.current
      ? Array.from<HTMLDivElement>(
          shapesSettings.current.children as Iterable<HTMLDivElement>
        ).forEach(
          (el) =>
            (el.onclick = () => {
              setCanvasState({ ...canvasState, shape: el.classList[1] });
              shapesSettings.current
                ? shapesSettings.current.classList.toggle('active')
                : 0;
            })
        )
      : 0;
  };

  const openShapesSettings = (): void => {
    shapesSettings.current
      ? shapesSettings.current.classList.toggle('active')
      : 0;
    handleShape();
  };

  const closeWidthMenu = (): void => {
    penSettings.current ? penSettings.current.classList.toggle('active') : null;
  };

  const closeColorMenu = (): void => {
    colorSettings.current
      ? colorSettings.current.classList.toggle('active')
      : 0;
  };

  const handleColor = (clr: ColorType): void => {
    canvasStateExecuter('color', clr.hex);
  };

  const handleErase = (): void => {
    canvasStateExecuter('erase');
  };

  const canvasStateExecuter = (type: string, payload = ''): void => {
    switch (type) {
      case 'erase':
        setCanvasState({ ...canvasState, erase: true });
        break;
      case 'color':
        setCanvasState({ ...canvasState, penColor: payload });
        break;
      case 'shape':
        setCanvasState({ ...canvasState, shape: payload });
        break;
      default:
        break;
    }
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
          sx={{ width: 200, color: 'white' }}
          onChange={(e, value) => {
            setCanvasState({ ...canvasState, penWidth: Number(value) });
          }}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ width: 100, height: 40 }}
          onClick={closeWidthMenu}
        >
          Submit
        </Button>
      </div>
      <div className="settings color-settings" ref={colorSettings}>
        <CirclePicker onChange={handleColor} />
        <Button
          variant="contained"
          color="primary"
          sx={{ width: 100, height: 40 }}
          onClick={closeColorMenu}
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
        <button className="nav-btn" onClick={handleErase}>
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
