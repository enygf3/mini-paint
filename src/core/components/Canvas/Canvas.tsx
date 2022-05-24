import * as React from "react";
import { useRef } from "react";

const Canvas = (props: any) => {
  let drawing = false;
  let canvas: any;
  let rect: any;
  const canvasRef: any = useRef(null);

  const HandleMouseDown = (e: any) => {
    console.log(canvasRef.current.getContext("2d"));
    drawing = true;
    canvas = e.target.getContext("2d");
    rect = e.target.getBoundingClientRect();
    canvas.beginPath();
  };

  const handleMouseUp = (e: any) => {
    drawing = false;
  };

  const handleMouseMove = (e: any) => {
    if (drawing) {
      canvas.lineTo(e.clientX - rect.x, e.clientY - rect.y);
      canvas.stroke();
    }
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={HandleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      width={props.props.width}
      height={props.props.height}
    ></canvas>
  );
};

export default Canvas;
