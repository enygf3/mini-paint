import * as React from "react";
import { RefObject, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const Canvas = (props: any) => {
  const canvasRef: RefObject<any> = useRef(null);

  const statePenWidth = useSelector((state: any) => state.canvas.width);
  const statePenColor = useSelector((state: any) => state.canvas.color);
  const stateShape = useSelector((state: any) => state.canvas.shape);

  const [drawing, setDrawing] = useState<boolean>(false);
  const [canvas, setCanvas] = useState<any>(null);
  const [rect, setRect] = useState<DOMRect | any>(null);
  const [penWidth, setPenWidth] = useState<number>(statePenWidth);
  const [penColor, setPenColor] = useState<string>(statePenColor);
  const [pos, setPos] = useState<any>({ x1: 0, y1: 0, x2: 0, y2: 0 });
  const [shape, setShape] = useState<string>("");
  const [existingShapes, setExistingShapes] = useState<any>([]);
  const [backUp, setBackUp] = useState<any>(null);

  const HandleMouseUp = () => {
    setDrawing(false);
    canvas.strokeStyle = penColor;
    canvas.lineWidth = penWidth;
    props.props.func(
      canvasRef.current
        .getContext("2d")
        .getImageData(0, 0, canvasRef.current.width, canvasRef.current.height)
    );
    if (shape.length > 0) {
      setExistingShapes([...existingShapes, { shape, pos }]);
      canvas.save();
    }
  };

  const HandleMouseMove = (e: Event | any) => {
    if (drawing && shape.length === 0) {
      canvas.lineWidth = penWidth;
      canvas.strokeStyle = penColor;
      canvas.lineTo(e.clientX - rect.x, e.clientY - rect.y);
      canvas.stroke();
    }

    if (shape.length > 0) {
      setPos({
        x1: pos.x1,
        y1: pos.y1,
        x2: e.clientX - e.target.getBoundingClientRect().x,
        y2: e.clientY - e.target.getBoundingClientRect().y,
      });
    }
  };

  const HandleTouchMove = (e: Event | any) => {
    if (drawing) {
      canvas.lineWidth = penWidth;
      canvas.strokeStyle = penColor;
      canvas.lineTo(
        e.touches[0].clientX - rect.x,
        e.touches[0].clientY - rect.y
      );
      canvas.stroke();
    }
  };

  console.log(existingShapes);

  const HandleMouseDown = (e: Event | any) => {
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
      canvas.lineWidth = penWidth;
      canvas.strokeStyle = penColor;
      canvas.beginPath();
    }
    setBackUp(
      canvas.getImageData(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      )
    );
  };

  const drawRect = () => {
    canvas.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    existingShapes.forEach((el: any) => {
      canvas.beginPath();
      canvas.strokeRect(
        el.pos.x1,
        el.pos.y1,
        el.pos.x2 - el.pos.x1,
        el.pos.y2 - el.pos.y1
      );
    });
    canvas.putImageData(backUp, 0, 0);
    canvas.lineWidth = penWidth;
    canvas.strokeStyle = penColor;
    canvas.beginPath();
    canvas.strokeRect(pos.x1, pos.y1, pos.x2 - pos.x1, pos.y2 - pos.y1);
    canvas.restore();
  };

  if (shape.length > 0 && drawing) {
    drawRect();
  }

  useEffect(() => {
    setPenWidth(statePenWidth);
    setPenColor(statePenColor);
    setShape(stateShape);
  }, [
    drawing,
    statePenWidth,
    statePenColor,
    shape,
    stateShape,
    existingShapes,
  ]);

  return (
    <canvas
      ref={canvasRef}
      width={props.props.width}
      height={props.props.height}
      onMouseDown={HandleMouseDown}
      onMouseUp={HandleMouseUp}
      onMouseMove={HandleMouseMove}
      onTouchStart={HandleMouseDown}
      onTouchEnd={HandleMouseUp}
      onTouchMove={HandleTouchMove}
    ></canvas>
  );
};

export default Canvas;
