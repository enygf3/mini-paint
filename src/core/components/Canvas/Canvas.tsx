import * as React from "react";
import { RefObject, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const Canvas = (props: any) => {
  const canvasRef: RefObject<any> = useRef(null);

  const statePenWidth = useSelector((state: any) => state.canvas.width);
  const statePenColor = useSelector((state: any) => state.canvas.color);

  const [drawing, setDrawing] = useState<boolean>(false);
  const [canvas, setCanvas] = useState<any>(null);
  const [rect, setRect] = useState<DOMRect | any>(null);
  const [penWidth, setPenWidth] = useState<number>(statePenWidth);
  const [penColor, setPenColor] = useState<string>(statePenColor);

  useEffect(() => {
    setPenWidth(statePenWidth);
    setPenColor(statePenColor);
    const HandleMouseDown = (e: Event | any) => {
      setDrawing(true);
      setCanvas(e.target.getContext("2d"));
      setRect(e.target.getBoundingClientRect());
      if (canvas) {
        canvas.lineWidth = penWidth;
        canvas.strokeStyle = penColor;
        canvas.beginPath();
      }
    };

    const HandleMouseUp = () => {
      setDrawing(false);
      canvas.strokeStyle = penColor;
      canvas.lineWidth = penWidth;
      props.props.func(
        canvasRef.current
          .getContext("2d")
          .getImageData(0, 0, canvasRef.current.width, canvasRef.current.height)
      );
    };

    const HandleMouseMove = (e: Event | any) => {
      if (drawing) {
        canvas.lineWidth = penWidth;
        canvas.strokeStyle = penColor;
        canvas.lineTo(e.clientX - rect.x, e.clientY - rect.y);
        canvas.stroke();
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

    canvasRef.current.onmousedown = HandleMouseDown;
    canvasRef.current.onmouseup = HandleMouseUp;
    canvasRef.current.onmousemove = HandleMouseMove;

    canvasRef.current.ontouchstart = (e: any) => {
      e.preventDefault();
      HandleMouseDown(e);
    };
    canvasRef.current.ontouchmove = (e: any) => {
      e.preventDefault();
      HandleTouchMove(e);
    };
    canvasRef.current.ontouchend = (e: any) => {
      e.preventDefault();
      HandleMouseUp();
    };
  }, [drawing, statePenWidth]);

  return (
    <canvas
      ref={canvasRef}
      width={props.props.width}
      height={props.props.height}
    ></canvas>
  );
};

export default Canvas;
