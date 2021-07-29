import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Logo from './components/Logo/Logo';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const particlesOptions = {
  particles: {
    number: {
      value: 20,
      density: {
        enable: true,
        value_area: 300,
      },
    },
  },
};

const app = new Clarifai.App({
  apiKey: '3fed091650b6444a98384f167efe87aa',
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
    };
  }

  calculateFaceLocation = data => {
    console.log(data.outputs[0].data.regions[0].region_info.bounding_box);
    const cBox = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(`${width} W x ${height} H`);

    return {
      left: cBox.left_col * width,
      top: cBox.top_row * height,
      right: width - cBox.right_col * width,
      bottom: height - cBox.bottom_row * height,
    };
  };

  displayFaceBox = box => {
    console.log('face box', box);
    this.setState({ box });
  };

  onInputChange = event => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    console.log('click');
    this.setState({ imageUrl: this.state.input });

    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        // THE JPG; use this.state.input; if using imageUrl, will get error if setState has not updated imageUrl at this point
        this.state.input,
      )
      .then(response =>
        this.displayFaceBox(this.calculateFaceLocation(response)),
      )
      .catch(err => console.log(err));
  };

  onRouteChange = route => {
    if (route === 'signout') this.setState({ isSignedIn: false });
    else if (route === 'home') this.setState({ isSignedIn: true });

    this.setState({ route: route });
  };

  render() {
    const { isSignedIn, route, box, imageUrl } = this.state;

    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {route === 'home' ? (
          <div>
            <Logo />
            <Rank />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </div>
        ) : route === 'signin' ? (
          <Signin onRouteChange={this.onRouteChange} />
        ) : (
          <Register onRouteChange={this.onRouteChange} />
        )}
      </div>
    );
  }
}

export default App;
