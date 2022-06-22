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
import { useSelector, useDispatch } from 'react-redux';
import { Position, Props, Shapes, State, ShapesEnum } from './types';
import { CanvasTemplates } from '../../../../core/actions/canvas';

const Canvas: FC<Props> = ({ width, height, saveDataToState }: Props) => {
  const dispatch = useDispatch();
  const canvasRef: RefObject<HTMLCanvasElement> = useRef(null);

  const isMobile: boolean = window.innerWidth < 768;

  const [drawing, setDrawing] = useState<boolean>(false);
  const [position, setPosition] = useState<Position>({
    x: 0,
    y: 0,
  });
  const [backUp, setBackUp] = useState<ImageData>();
  const [existingShapes, setExistingShapes] = useState<Shapes[]>([]);

  const shape = useSelector((state: State) => state.canvas.shape);
  const penColor = useSelector((state: State) => state.canvas.color);
  const penWidth = useSelector((state: State) => state.canvas.width);
  const eraseState = useSelector((state: State) => state.canvas.erase);

  useEffect(() => {
    if (eraseState) {
      eraseCanvas();
      setExistingShapes([]);
      dispatch({ type: CanvasTemplates.ERASE, payload: { erase: false } });
    }
  }, [eraseState]);

  function handleMouseDown(event: MouseEvent<HTMLCanvasElement>): void {
    const target = event.target as HTMLCanvasElement;
    const context = canvasRef.current?.getContext('2d');
    const rect = target.getBoundingClientRect();
    setPosition({
      x: event.clientX - rect.x,
      y: event.clientY - rect.y,
    });
    setDrawing(true);
    if (canvasRef.current) {
      setBackUp(context?.getImageData(0, 0, target.width, target.height));
    }
    context?.beginPath();
  }

  function handleMouseUp(event: MouseEvent<HTMLCanvasElement>): void {
    setDrawing(false);
    const data = canvasRef.current ? canvasRef.current.toDataURL() : 0;
    if (typeof data === 'string') {
      saveDataToState(data);
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
  }

  function handleMouseMove(event: MouseEvent<HTMLCanvasElement>): void {
    const context = canvasRef.current?.getContext('2d');
    const rect = canvasRef.current?.getBoundingClientRect();
    if (shape.length > 0) {
      shapesExecuter(
        shape,
        rect ? event.clientX - rect.x : 0,
        rect ? event.clientY - rect.y : 0
      );
    }
    if (
      canvasRef.current &&
      drawing &&
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
  }

  function handleTouchStart(event: TouchEvent<HTMLCanvasElement>): void {
    const target = event.target as HTMLCanvasElement;
    const context = canvasRef.current?.getContext('2d');
    const rect = target.getBoundingClientRect();
    setPosition({
      x: event.touches[0].clientX - rect.x,
      y: event.touches[0].clientY - rect.y,
    });
    setDrawing(true);
    if (canvasRef.current) {
      setBackUp(context?.getImageData(0, 0, target.width, target.height));
    }
    context?.beginPath();
  }

  function handleTouchEnd(event: TouchEvent<HTMLCanvasElement>): void {
    setDrawing(false);
    const data = canvasRef.current ? canvasRef.current.toDataURL() : 0;
    if (typeof data === 'string') {
      saveDataToState(data);
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
  }

  function handleTouchMove(event: TouchEvent<HTMLCanvasElement>): void {
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
      drawing &&
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
  }

  function eraseCanvas(): void {
    if (canvasRef.current) {
      const canvas = canvasRef.current.getContext('2d');
      canvas?.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
    }
  }

  function restoreDraw(item: Shapes, type: string): void {
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
  }

  function drawRect(x: number, y: number): void {
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
  }

  function drawLine(): void {
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
  }

  function drawCircle(x: number, y: number): void {
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
  }

  function shapesExecuter(shape: string, x: number, y: number): void {
    if (!drawing) {
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
  }

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
