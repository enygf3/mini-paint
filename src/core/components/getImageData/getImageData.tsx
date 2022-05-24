import { useDispatch } from "react-redux";

import { GET_IMAGE_DATA } from "../../actions/actions";

const getImageData = (canvas: any) => {
  const dispatch = useDispatch();
  const ctx = canvas.getContext("2d");
  const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
  dispatch({
    type: GET_IMAGE_DATA,
    payload: {
      imageData: img,
    },
  });
};

export default getImageData;
