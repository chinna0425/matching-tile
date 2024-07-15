import { withRouter, Redirect } from "react-router-dom";

import "./index.css";
const ScoreCard = (props) => {
  const name = localStorage.getItem("username");
  const { history } = props;
  const { state } = history.location;

  const changeToPlayAgain = () => {
    localStorage.removeItem("username");
    history.replace("/");
    window.location.reload();
  };

  if (name === null) {
    return <Redirect to="/" />;
  }
  if (state === undefined) {
    return <Redirect to="/Gamepage" />;
  }
  const { count, seconds, minutes } = state;
  console.log(history.location.state);
  return (
    <div className="score-card-main-container">
      <div className="score-card-second-container">
        <h1 className="score-card-heading">React Tiles</h1>
        <div className="score-card-time-container">
          <p className="score-card-time">Score: {count}</p>
          <p className="score-card-time">
            Time: {minutes > 9 ? `${minutes}` : `0${minutes}`}:
            {seconds > 9 ? `${seconds}` : `0${seconds}`}
          </p>
        </div>
        <div className="score-card-container">
          <h1 className="score-card-name-heading">Welcome {name} 👋👋</h1>
          <div className="score-card-over-all-data">
            <h1 className="game-finished-heading">Game Finished!</h1>
            <h1 className="game-finished-heading score-style">Score {count}</h1>
            <h1 className="game-finished-heading score-style">
              Time Taken {minutes > 9 ? `${minutes}` : `0${minutes}`}:
              {seconds > 9 ? `${seconds}` : `0${seconds}`}
            </h1>
            <button
              type="button"
              className="play-again-button"
              onClick={changeToPlayAgain}
            >
              PlayAgain
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default withRouter(ScoreCard);
