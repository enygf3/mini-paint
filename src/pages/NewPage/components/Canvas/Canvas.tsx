import {
  RefObject,
  useEffect,
  useRef,
  useState,
  memo,
  FC,
  MouseEvent,
  TouchEvent,
} from 'react';
import { useDispatch } from 'react-redux';
import { Position, Props, Shapes, ShapesEnum } from './types';
import { CanvasTemplates } from '../../../../core/actions/canvas';

const Canvas: FC<Props> = ({
  width,
  height,
  saveDataToState,
  state,
}: Props) => {
  const dispatch = useDispatch();
  const canvasRef: RefObject<HTMLCanvasElement> = useRef(null);

  const isMobile: boolean = window.innerWidth < 768;

  const drawing = useRef<boolean>(false);
  const [position, setPosition] = useState<Position>({
    x: 0,
    y: 0,
  });
  const [backUp, setBackUp] = useState<ImageData>();
  const [existingShapes, setExistingShapes] = useState<Shapes[]>([]);

  const { erase, penWidth, penColor, shape } = state;

  useEffect(() => {
    if (erase) {
      eraseCanvas();
      setExistingShapes([]);
      dispatch({ type: CanvasTemplates.Erase, payload: { erase: false } });
    }
  }, [erase]);

  const handleMouseDown = (event: MouseEvent<HTMLCanvasElement>): void => {
    const target = event.target as HTMLCanvasElement;
    const context = canvasRef.current?.getContext('2d');
    const rect = target.getBoundingClientRect();
    setPosition({
      x: event.clientX - rect.x,
      y: event.clientY - rect.y,
    });
    drawing.current = true;
    if (canvasRef.current) {
      setBackUp(context?.getImageData(0, 0, target.width, target.height));
    }
    context?.beginPath();
  };

  const handleMouseUp = (event: MouseEvent<HTMLCanvasElement>): void => {
    drawing.current = false;
    if (canvasRef.current) {
      saveDataToState(canvasRef.current.toDataURL());
    }

    if (shape.length > 0) {
      const rect = canvasRef.current?.getBoundingClientRect();
      setExistingShapes([
        ...existingShapes,
        {
          shape,
          pos: {
            x1: position.x,
            y1: position.y,
            x2: rect ? event.clientX + rect.x : 0,
            y2: rect ? event.clientY + rect.y : 0,
          },
        },
      ]);
    }
  };

  const handleMouseMove = (event: MouseEvent<HTMLCanvasElement>): void => {
    const context = canvasRef.current?.getContext('2d');
    const rect = canvasRef.current?.getBoundingClientRect();
    if (shape.length > 0) {
      shapesExecuter(
        shape,
        rect ? event.clientX - rect.x : 0,
        rect ? event.clientY - rect.y : 0
      );
    }
    // console.log(canvasRef.current, drawing.current);
    if (
      canvasRef.current &&
      drawing.current &&
      (shape === ShapesEnum.LINE || shape.length === 0)
    ) {
      context ? (context.lineWidth = penWidth) : 0;
      context ? (context.strokeStyle = penColor) : 0;
      context?.lineTo(
        rect ? event.clientX - rect.x : 0,
        rect ? event.clientY - rect.y : 0
      );
      context?.stroke();
    }
  };

  const handleTouchStart = (event: TouchEvent<HTMLCanvasElement>): void => {
    const target = event.target as HTMLCanvasElement;
    const context = canvasRef.current?.getContext('2d');
    const rect = target.getBoundingClientRect();
    setPosition({
      x: event.touches[0].clientX - rect.x,
      y: event.touches[0].clientY - rect.y,
    });
    drawing.current = true;
    if (canvasRef.current) {
      setBackUp(context?.getImageData(0, 0, target.width, target.height));
    }
    context?.beginPath();
  };

  const handleTouchEnd = (event: TouchEvent<HTMLCanvasElement>): void => {
    drawing.current = false;
    if (canvasRef.current) {
      saveDataToState(canvasRef.current.toDataURL());
    }

    if (shape.length > 0) {
      const rect = canvasRef.current?.getBoundingClientRect();
      setExistingShapes([
        ...existingShapes,
        {
          shape,
          pos: {
            x1: position.x,
            y1: position.y,
            x2: rect ? event.changedTouches[0].clientX + rect.x : 0,
            y2: rect ? event.changedTouches[0].clientY + rect.y : 0,
          },
        },
      ]);
    }
  };

  const handleTouchMove = (event: TouchEvent<HTMLCanvasElement>): void => {
    const context = canvasRef.current?.getContext('2d');
    const rect = canvasRef.current?.getBoundingClientRect();
    if (shape.length > 0) {
      shapesExecuter(
        shape,
        rect ? event.touches[0].clientX - rect.x : 0,
        rect ? event.touches[0].clientY - rect.y : 0
      );
    }
    if (
      canvasRef.current &&
      drawing.current &&
      (shape === ShapesEnum.LINE || shape.length === 0)
    ) {
      context ? (context.lineWidth = penWidth) : 0;
      context ? (context.strokeStyle = penColor) : 0;
      context?.lineTo(
        rect ? event.touches[0].clientX - rect.x : 0,
        rect ? event.touches[0].clientY - rect.y : 0
      );
      context?.stroke();
    }
  };

  const eraseCanvas = (): void => {
    if (canvasRef.current) {
      const canvas = canvasRef.current.getContext('2d');
      canvas?.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
    }
  };

  const restoreDraw = (item: Shapes, type: string): void => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      context?.beginPath();
      switch (type) {
        case ShapesEnum.RECTANGLE:
          context?.strokeRect(
            item.pos.x1,
            item.pos.y1,
            item.pos.x2 - item.pos.x1,
            item.pos.y2 - item.pos.y1
          );
          break;
        case ShapesEnum.LINE:
          context?.moveTo(item.pos.x1, item.pos.y1);
          context?.lineTo(item.pos.x2, item.pos.y2);
          break;
        case ShapesEnum.CIRCLE:
          context?.arc(
            item.pos.x1,
            item.pos.y1,
            Math.sqrt(
              Math.pow(item.pos.x2 - item.pos.x1, 2) +
                Math.pow(item.pos.y2 - item.pos.y1, 2)
            ),
            0,
            2 * Math.PI
          );
          break;
        default:
          break;
      }
    }
  };

  const drawRect = (x: number, y: number): void => {
    eraseCanvas();
    existingShapes.forEach((el: Shapes) => {
      restoreDraw(el, el.shape);
    });
    if (canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      backUp ? context?.putImageData(backUp, 0, 0) : null;
      context ? (context.lineWidth = penWidth) : 0;
      context ? (context.strokeStyle = penColor) : 0;
      context?.beginPath();
      context?.strokeRect(
        position.x,
        position.y,
        x - position.x,
        y - position.y
      );
    }
  };

  const drawLine = (): void => {
    eraseCanvas();
    existingShapes.forEach((el: Shapes) => {
      restoreDraw(el, el.shape);
    });
    if (canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      backUp ? context?.putImageData(backUp, 0, 0) : 0;
      context ? (context.lineWidth = penWidth) : 0;
      context ? (context.strokeStyle = penColor) : 0;
      context?.beginPath();
      context?.moveTo(position.x, position.y);
      context?.lineTo(position.x, position.y);
      context?.stroke();
    }
  };

  const drawCircle = (x: number, y: number): void => {
    eraseCanvas();
    existingShapes.forEach((el: Shapes) => {
      restoreDraw(el, el.shape);
    });
    if (canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      backUp ? context?.putImageData(backUp, 0, 0) : 0;
      context ? (context.lineWidth = penWidth) : 0;
      context ? (context.strokeStyle = penColor) : 0;
      context?.beginPath();
      context?.arc(
        position.x,
        position.y,
        Math.sqrt(Math.pow(x - position.x, 2) + Math.pow(y - position.y, 2)),
        0,
        2 * Math.PI
      );
      context?.stroke();
    }
  };

  const shapesExecuter = (shape: string, x: number, y: number): void => {
    if (!drawing.current) {
      return;
    }
    switch (shape) {
      case ShapesEnum.RECTANGLE:
        drawRect(x, y);
        break;
      case ShapesEnum.LINE:
        drawLine();
        break;
      case ShapesEnum.CIRCLE:
        drawCircle(x, y);
        break;
      default:
        break;
    }
  };

  return (
    <>
      {isMobile ? (
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchMove={handleTouchMove}
        ></canvas>
      ) : (
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        ></canvas>
      )}
    </>
  );
};

export default memo(Canvas);
