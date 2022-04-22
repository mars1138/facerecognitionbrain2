import React from 'react';
import Logo from '../Logo/Logo';

const Navigation = ({ onRouteChange, isSignedIn }) => {
  return (
    <div className="flex flex-column flex-column-m flex-row-l justify-start-l justify-center-m bg-black-80">
      <div className="flex flex-row justify-center items-center pl4-l ">
        <Logo />
        <p className="f2 white ml2">Face Detector App</p>
      </div>
      <nav className="flex justify-center ml-auto-l pr4-l items-center-l ">
        {isSignedIn && (
          <p
            onClick={() => onRouteChange('signout')}
            className="f5 f4-l link dim white underline pa1 pt0 pt1-l pointer"
          >
            Sign Out
          </p>
        )}
        {!isSignedIn && (
          <React.Fragment>
            <p
              onClick={() => onRouteChange('signin')}
              className="f3 link dim white underline mr2 pointer"
            >
              Sign In
            </p>
            <p
              onClick={() => onRouteChange('register')}
              className="f3 link dim white underline ml2 pointer"
            >
              Register
            </p>
          </React.Fragment>
        )}
      </nav>
    </div>
  );
};

export default Navigation;
