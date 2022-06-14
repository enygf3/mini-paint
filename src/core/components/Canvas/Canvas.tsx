import {
  RefObject,
  useEffect,
  useRef,
  useState,
  memo,
  Dispatch,
  FC,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { ERASE } from "../../actions/actions";

import { existShapeTypes, props } from "./types/types";

const Canvas: FC<props> = ({ width, height, func }: props) => {
  const canvasRef: RefObject<any> = useRef(null);
  const dispatch = useDispatch();

  const statePenWidth = useSelector((state: any) => state.canvas.width);
  const statePenColor = useSelector((state: any) => state.canvas.color);
  const stateShape = useSelector((state: any) => state.canvas.shape);
  const stateErase: boolean = useSelector((state: any) => state.canvas.erase);

  const [drawing, setDrawing] = useState<boolean>(false);
  const [canvas, setCanvas] = useState<any>(null);
  const [rect, setRect] = useState<DOMRect | any>(null);
  const [penWidth, setPenWidth] = useState<number>(statePenWidth);
  const [penColor, setPenColor] = useState<string>(statePenColor);
  const [pos, setPos] = useState<any>({ x1: 0, y1: 0, x2: 0, y2: 0 });
  const [shape, setShape] = useState<string>("");
  const [existingShapes, setExistingShapes] = useState<any>([]);
  const [backUp, setBackUp] = useState<any>(null);

  const HandleMouseUp = (): void => {
    setDrawing(false);
    canvas.strokeStyle = penColor;
    canvas.lineWidth = penWidth;
    const data = canvasRef.current.toDataURL();
    func(data);

    if (shape.length > 0) {
      setExistingShapes([...existingShapes, { shape, pos }]);
    }
  };

  const HandleMouseMove = (e: Event | any): void => {
    if (drawing && shape.length === 0) {
      canvas.lineWidth = penWidth;
      canvas.strokeStyle = penColor;
      canvas.lineTo(e.clientX - rect.x, e.clientY - rect.y);
      canvas.stroke();
    }

    if (shape.length > 0 && !e.touches) {
      setPos({
        x1: pos.x1,
        y1: pos.y1,
        x2: e.clientX - e.target.getBoundingClientRect().x,
        y2: e.clientY - e.target.getBoundingClientRect().y,
      });
    }
  };

  const HandleTouchMove = (e: Event | any): void => {
    if (drawing) {
      canvas.lineWidth = penWidth;
      canvas.strokeStyle = penColor;
      canvas.lineTo(
        e.touches[0].clientX - rect.x,
        e.touches[0].clientY - rect.y
      );
      canvas.stroke();
    }
    if (shape.length > 0) {
      setPos({
        x1: pos.x1,
        y1: pos.y1,
        x2: e.touches[0].clientX - e.target.getBoundingClientRect().x,
        y2: e.touches[0].clientY - e.target.getBoundingClientRect().y,
      });
    }
  };

  const HandleMouseDown = (e: Event | any): void => {
    setDrawing(true);
    setCanvas(e.target.getContext("2d"));
    setRect(e.target.getBoundingClientRect());
    if (shape.length > 0) {
      setPos({
        x1: e.clientX - e.target.getBoundingClientRect().x,
        y1: e.clientY - e.target.getBoundingClientRect().y,
        x2: pos.x2,
        y2: pos.y2,
      });
    }
    if (canvas) {
      setBackUp(canvas.getImageData(0, 0, e.target.width, e.target.height));
      canvas.lineWidth = penWidth;
      canvas.strokeStyle = penColor;
      canvas.beginPath();
    }
  };

  const HandleTouchStart = (e: Event | any): void => {
    setDrawing(true);
    setCanvas(e.target.getContext("2d"));
    setRect(e.target.getBoundingClientRect());
    if (shape.length > 0) {
      setPos({
        x1: e.touches[0].clientX - e.target.getBoundingClientRect().x,
        y1: e.touches[0].clientY - e.target.getBoundingClientRect().y,
        x2: pos.x2,
        y2: pos.y2,
      });
    }
    if (canvas) {
      setBackUp(canvas.getImageData(0, 0, e.target.width, e.target.height));
      canvas.lineWidth = penWidth;
      canvas.strokeStyle = penColor;
      canvas.beginPath();
    }
  };

  const restoreDraw = (item: any, type: string): void => {
    canvas.beginPath();
    switch (type) {
      case "fa-square":
        canvas.strokeRect(
          item.pos.x1,
          item.pos.y1,
          item.pos.x2 - item.pos.x1,
          item.pos.y2 - item.pos.y1
        );
        break;
      case "fa-grip-lines":
        canvas.moveTo(item.pos.x1, item.pos.y1);
        canvas.lineTo(item.pos.x2, item.pos.y2);
        break;
      case "fa-circle":
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
  };

  const clearCanvas = (): void => {
    canvas.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const drawRect = (): void => {
    clearCanvas();
    existingShapes.forEach((el: existShapeTypes) => {
      restoreDraw(el, el.shape);
    });
    backUp ? canvas.putImageData(backUp, 0, 0) : 0;
    canvas.lineWidth = penWidth;
    canvas.strokeStyle = penColor;
    canvas.beginPath();
    canvas.strokeRect(pos.x1, pos.y1, pos.x2 - pos.x1, pos.y2 - pos.y1);
  };

  const drawLine = (): void => {
    clearCanvas();
    existingShapes.forEach((el: existShapeTypes) => {
      restoreDraw(el, el.shape);
    });
    backUp ? canvas.putImageData(backUp, 0, 0) : 0;
    canvas.lineWidth = penWidth;
    canvas.strokeStyle = penColor;
    canvas.beginPath();
    canvas.moveTo(pos.x1, pos.y1);
    canvas.lineTo(pos.x2, pos.y2);
    canvas.stroke();
  };

  const drawCircle = (): void => {
    clearCanvas();
    existingShapes.forEach((el: existShapeTypes) => {
      restoreDraw(el, el.shape);
    });
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
  };

  if (shape.length > 0 && drawing) {
    switch (shape) {
      case "fa-square":
        drawRect();
        break;
      case "fa-grip-lines":
        drawLine();
        break;
      case "fa-circle":
        drawCircle();
        break;
      default:
        break;
    }
  }

  if (stateErase) {
    clearCanvas();
    setExistingShapes([]);
    dispatch({ type: ERASE, payload: { erase: false } });
  }

  useEffect(() => {
    setPenWidth(statePenWidth);
    setPenColor(statePenColor);
    setShape(stateShape);
  }, [statePenWidth, statePenColor, stateShape]);
  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      onMouseDown={HandleMouseDown}
      onMouseUp={HandleMouseUp}
      onMouseMove={HandleMouseMove}
      onTouchStart={HandleTouchStart}
      onTouchEnd={HandleMouseUp}
      onTouchMove={HandleTouchMove}
    ></canvas>
  );
};

export default memo(Canvas);
