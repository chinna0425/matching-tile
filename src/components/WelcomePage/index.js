import { Component } from "react";

import "./index.css";
import { Redirect } from "react-router-dom";

const username = localStorage.getItem("username");

class WelcomePage extends Component {
  state = { name: "", ErrorMsg: false };

  onChangeName = (event) => {
    this.setState({ name: event.target.value });
  };

  onSubmitData = () => {
    const { name } = this.state;
    if (name === "") {
      this.setState({ ErrorMsg: true });
    } else {
      localStorage.setItem("username", name);
      const { history } = this.props;
      history.replace("/Gamepage");
    }
  };

  render() {
    const { name, ErrorMsg } = this.state;
    if (username !== null) {
      return <Redirect to="/Gamepage" />;
    }
    return (
      <div className="welcome-main-container">
        <div className="welcome-second-container">
          <h1 className="welcome-heading">React Tiles</h1>
          <form className="welcome-form-container" onSubmit={this.onSubmitData}>
            <label htmlFor="name-field" className="form-name-label">
              Enter Your Name
            </label>
            <br />
            <input
              id="name-field"
              type="text"
              value={name}
              onChange={this.onChangeName}
              className="welcome-text-field"
            />
            {ErrorMsg && <p className="error-message">Please Enter The Name</p>}
            <button type="submit" className="play-button-style">
              Play
            </button>
          </form>
        </div>
      </div>
    );
  }
}
export default WelcomePage;
