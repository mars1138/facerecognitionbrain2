import React from 'react';
import Logo from '../Logo/Logo';

const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingTop: '20px',
          alignItems: 'flex-start',
        }}
      >
        <div style={{ display: 'flex' }}>
          <Logo />
          <p className="f2 black">Face Detector App</p>
        </div>
        <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <p
            onClick={() => onRouteChange('signout')}
            className="f3 link dim black underline pa3 pointer"
          >
            Sign Out
          </p>
        </nav>
      </div>
    );
  } else {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingTop: '20px',
          alignItems: 'flex-start',
        }}
      >
        <div style={{ display: 'flex' }}>
          <Logo />
          <p className="f2 black">Face Detector App</p>
        </div>
        <nav
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <p
            onClick={() => onRouteChange('signin')}
            className="f3 link dim black underline pa3 pointer"
          >
            Sign In
          </p>
          <p
            onClick={() => onRouteChange('register')}
            className="f3 link dim black underline pa3 pointer"
          >
            Register
          </p>
        </nav>
      </div>
    );
  }
};

export default Navigation;
