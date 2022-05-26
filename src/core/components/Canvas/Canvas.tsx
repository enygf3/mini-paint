import * as React from "react";
import { useEffect, useRef, useState } from "react";

const Canvas = (props: any) => {
  const canvasRef: any = useRef(null);

  const [drawing, setDrawing] = useState<boolean>(false);
  const [canvas, setCanvas] = useState<any>(null);
  const [rect, setRect] = useState<any>(null);

  useEffect(() => {
    const HandleMouseDown = (e: any) => {
      setDrawing(true);
      setCanvas(e.target.getContext("2d"));
      setRect(e.target.getBoundingClientRect());
      if (canvas) {
        canvas.beginPath();
      }
    };

    const HandleMouseUp = () => {
      setDrawing(false);
      props.props.func(
        canvasRef.current
          .getContext("2d")
          .getImageData(0, 0, canvasRef.current.width, canvasRef.current.height)
      );
    };

    const HandleMouseMove = (e: any) => {
      if (drawing) {
        canvas.lineTo(e.clientX - rect.x, e.clientY - rect.y);
        canvas.stroke();
      }
    };

    canvasRef.current.onmousedown = HandleMouseDown;
    canvasRef.current.onmouseup = HandleMouseUp;
    canvasRef.current.onmousemove = HandleMouseMove;
  }, [drawing]);

  return (
    <canvas
      ref={canvasRef}
      width={props.props.width}
      height={props.props.height}
    ></canvas>
  );
};

export default Canvas;
