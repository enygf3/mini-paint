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
import { ERASE } from '../../../../core/actions/actions';

import { Position, Props, Shapes, State } from '../../../types';

enum ShapesEnum {
  CIRCLE = 'fa-circle',
  RECTANGLE = 'fa-square',
  LINE = 'fa-grip-lines',
}

const Canvas: FC<Props> = ({ width, height, func }: Props) => {
  const dispatch = useDispatch();
  const canvasRef: RefObject<HTMLCanvasElement> = useRef(null);
  const statePenWidth = useSelector((state: State) => state.canvas.width);
  const statePenColor = useSelector((state: State) => state.canvas.color);
  const stateShape = useSelector((state: State) => state.canvas.shape);
  const stateErase: boolean = useSelector((state: State) => state.canvas.erase);

  const [drawing, setDrawing] = useState<boolean>(false);
  const [canvas, setCanvas] = useState<CanvasRenderingContext2D | null>(null);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const [penWidth, setPenWidth] = useState<number>(statePenWidth);
  const [penColor, setPenColor] = useState<string>(statePenColor);
  const [pos, setPos] = useState<Position>({ x1: 0, y1: 0, x2: 0, y2: 0 });
  const [shape, setShape] = useState<string>('');
  const [existingShapes, setExistingShapes] = useState<Array<Shapes>>([]);
  const [backUp, setBackUp] = useState<ImageData | null>(null);

  useEffect(() => {
    if (stateErase) {
      clearCanvas();
      setExistingShapes([]);
      dispatch({ type: ERASE, payload: { erase: false } });
    }
  }, [stateErase]);

  useEffect(() => {
    setPenWidth(statePenWidth);
    setPenColor(statePenColor);
    setShape(stateShape);
  }, [statePenWidth, statePenColor, stateShape]);

  function handleMouseUp(): void {
    setDrawing(false);
    canvas ? (canvas.strokeStyle = penColor) : 0;
    canvas ? (canvas.lineWidth = penWidth) : 0;
    const data = canvasRef.current ? canvasRef.current.toDataURL() : 0;
    if (typeof data === 'string') {
      func(data);
    }

    if (shape.length > 0) {
      console.log(existingShapes);
      setExistingShapes([...existingShapes, { shape, pos }]);
    }
  }

  function handleMouseMove(event: MouseEvent<HTMLCanvasElement>): void {
    const target = event.target as HTMLCanvasElement;
    if (drawing && shape.length === 0 && canvas) {
      canvas.lineWidth = penWidth;
      canvas.strokeStyle = penColor;
      canvas.lineTo(
        rect ? event.clientX - rect.x : 0,
        rect ? event.clientY - rect.y : 0
      );
      canvas.stroke();
    }

    if (shape.length > 0) {
      setPos({
        x1: pos.x1,
        y1: pos.y1,
        x2: event.clientX - target.getBoundingClientRect().x,
        y2: event.clientY - target.getBoundingClientRect().y,
      });
      shapesExecuter(shape);
    }
  }

  function handleTouchMove(event: TouchEvent<HTMLCanvasElement>): void {
    const target = event.target as HTMLCanvasElement;
    if (drawing && canvas) {
      canvas.lineWidth = penWidth;
      canvas.strokeStyle = penColor;
      canvas.lineTo(
        rect ? event.touches[0].clientX - rect.x : 0,
        rect ? event.touches[0].clientY - rect.y : 0
      );
      canvas.stroke();
    }
    if (shape.length > 0) {
      setPos({
        x1: pos.x1,
        y1: pos.y1,
        x2: event.touches[0].clientX - target.getBoundingClientRect().x,
        y2: event.touches[0].clientY - target.getBoundingClientRect().y,
      });
      shapesExecuter(shape);
    }
  }

  function handleMouseDown(event: MouseEvent<HTMLCanvasElement>): void {
    const target = event.target as HTMLCanvasElement;
    setDrawing(true);
    setCanvas(target.getContext('2d'));
    setRect(target.getBoundingClientRect());
    if (shape.length > 0) {
      setPos({
        x1: event.clientX - target.getBoundingClientRect().x,
        y1: event.clientY - target.getBoundingClientRect().y,
        x2: pos.x2,
        y2: pos.y2,
      });
    }
    if (canvas) {
      setBackUp(canvas.getImageData(0, 0, target.width, target.height));
      canvas.lineWidth = penWidth;
      canvas.strokeStyle = penColor;
      canvas.beginPath();
    }
  }

  function handleTouchStart(event: TouchEvent<HTMLCanvasElement>): void {
    const target = event.target as HTMLCanvasElement;
    setDrawing(true);
    setCanvas(target.getContext('2d'));
    setRect(target.getBoundingClientRect());
    if (shape.length > 0) {
      setPos({
        ...pos,
        x1: event.touches[0].clientX - target.getBoundingClientRect().x,
        y1: event.touches[0].clientY - target.getBoundingClientRect().y,
      });
    }
    if (canvas) {
      setBackUp(canvas.getImageData(0, 0, target.width, target.height));
      canvas.lineWidth = penWidth;
      canvas.strokeStyle = penColor;
      canvas.beginPath();
    }
  }

  function restoreDraw(item: Shapes, type: string): void {
    if (canvas) {
      canvas.beginPath();
      switch (type) {
        case ShapesEnum.RECTANGLE:
          canvas.strokeRect(
            item.pos.x1,
            item.pos.y1,
            item.pos.x2 - item.pos.x1,
            item.pos.y2 - item.pos.y1
          );
          break;
        case ShapesEnum.LINE:
          canvas.moveTo(item.pos.x1, item.pos.y1);
          canvas.lineTo(item.pos.x2, item.pos.y2);
          break;
        case ShapesEnum.CIRCLE:
          canvas.arc(
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

  function clearCanvas(): void {
    canvas
      ? canvas.clearRect(
          0,
          0,
          canvasRef.current ? canvasRef.current.width : 0,
          canvasRef.current ? canvasRef.current.height : 0
        )
      : 0;
  }

  function drawRect(): void {
    clearCanvas();
    existingShapes.forEach((el: Shapes) => {
      restoreDraw(el, el.shape);
    });
    if (canvas) {
      backUp ? canvas.putImageData(backUp, 0, 0) : null;
      canvas.lineWidth = penWidth;
      canvas.strokeStyle = penColor;
      canvas.beginPath();
      canvas.strokeRect(pos.x1, pos.y1, pos.x2 - pos.x1, pos.y2 - pos.y1);
    }
  }

  function drawLine(): void {
    clearCanvas();
    existingShapes.forEach((el: Shapes) => {
      restoreDraw(el, el.shape);
    });
    if (canvas) {
      backUp ? canvas.putImageData(backUp, 0, 0) : 0;
      canvas.lineWidth = penWidth;
      canvas.strokeStyle = penColor;
      canvas.beginPath();
      canvas.moveTo(pos.x1, pos.y1);
      canvas.lineTo(pos.x2, pos.y2);
      canvas.stroke();
    }
  }

  function drawCircle(): void {
    clearCanvas();
    existingShapes.forEach((el: Shapes) => {
      restoreDraw(el, el.shape);
    });
    if (canvas) {
      backUp ? canvas.putImageData(backUp, 0, 0) : 0;
      canvas.lineWidth = penWidth;
      canvas.strokeStyle = penColor;
      canvas.beginPath();
      canvas.arc(
        pos.x1,
        pos.y1,
        Math.sqrt(Math.pow(pos.x2 - pos.x1, 2) + Math.pow(pos.y2 - pos.y1, 2)),
        0,
        2 * Math.PI
      );
      canvas.stroke();
    }
  }

  function shapesExecuter(shape: string): void {
    if (!drawing) {
      return;
    }
    switch (shape) {
      case ShapesEnum.RECTANGLE:
        drawRect();
        break;
      case ShapesEnum.LINE:
        drawLine();
        break;
      case ShapesEnum.CIRCLE:
        drawCircle();
        break;
      default:
        break;
    }
  }

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleMouseUp}
      onTouchMove={handleTouchMove}
    ></canvas>
  );
};

export default memo(Canvas);
