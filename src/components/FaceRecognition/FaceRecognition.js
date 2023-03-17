import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, boxes }) => {
  const faceBoxes = [];

  boxes.forEach((box, i) => {
    faceBoxes.push(
      <div
        key={i}
        className="bounding-box"
        style={{
          top: box.top,
          bottom: box.bottom,
          left: box.left,
          right: box.right,
        }}
      ></div>
    );
  });

  return (
    <div className="center ma">
      <div className="absolute mt2">
        {imageUrl && (
          <img
            id="inputImage"
            alt="face recog"
            src={imageUrl}
            width="500px"
            height="auto"
          />
        )}
        {faceBoxes}
      </div>
    </div>
  );
};

export default FaceRecognition;
