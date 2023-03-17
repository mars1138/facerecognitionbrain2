import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';

const initialState = {
  input: '',
  imageUrl: '',
  boxes: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
  },
  isLoading: false,
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  calculateFaceLocation = (data) => {
    const boxArray = [];

    data.outputs[0].data.regions.forEach((region) => {
      const cBox = region.region_info.bounding_box;
      const image = document.getElementById('inputImage');
      const width = Number(image.width);
      const height = Number(image.height);
      // console.log(`${width} W x ${height} H`);

      boxArray.push({
        left: cBox.left_col * width,
        top: cBox.top_row * height,
        right: width - cBox.right_col * width,
        bottom: height - cBox.bottom_row * height,
      });
    });

    return boxArray;
  };

  displayFaceBox = (boxArray) => {
    this.setState({ boxes: boxArray });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onToggleIsLoading = () => {
    const newState = this.state.isLoading ? false : true;
    this.setState({ isLoading: newState });
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });

    if (this.state.input === initialState.input) {
      return console.log('No URL entered!');
    } else {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/imageurl`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: this.state.input,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response) {
            fetch(`${process.env.REACT_APP_BACKEND_URL}/image`, {
              method: 'put',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                id: this.state.user.id,
              }),
            })
              .then((res) => res.json())
              .then((count) => {
                this.setState(
                  Object.assign(this.state.user, { entries: count })
                );
              })
              .catch(console.log);
          }
          this.displayFaceBox(this.calculateFaceLocation(response));
        })
        .catch((err) => console.log(err));
    }
  };

  onRouteChange = (route) => {
    if (route === 'signout') this.setState(initialState);
    else if (route === 'home') this.setState({ isSignedIn: true });

    this.setState({ route: route });
  };

  render() {
    const { isSignedIn, route, boxes, imageUrl, user } = this.state;
    return (
      <div className="App pb1">
        {this.state.isLoading && <LoadingSpinner />}
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {route === 'home' ? (
          <div>
            <Rank name={user.name} entries={user.entries} />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
          </div>
        ) : route === 'signin' ? (
          <Signin
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
            toggleSpinner={this.onToggleIsLoading}
          />
        ) : (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
            toggleSpinner={this.onToggleIsLoading}
          />
        )}
      </div>
    );
  }
}

export default App;
