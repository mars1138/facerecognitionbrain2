import React from 'react';
// import Tilt from 'react-tilt';
import face from './icons8-face-64.png';
import './Logo.css';

const Logo = () => {
  return (
    <div>
      {/* <Tilt
        className="Tilt br2 shadow-2"
        options={{ max: 55 }}
        style={{ height: 150, width: 150 }}
      > */}
      {/* <div className="Tilt-inner"> */}
      <img src={face} alt="logo by icons8.com" />
      {/* </div> */}
      {/* </Tilt> */}
    </div>
  );
};

export default Logo;
