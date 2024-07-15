import { Component } from "react";
import TileCard from "../TileCard";
import "./index.css";
import { Redirect } from "react-router-dom";

const name = localStorage.getItem("username");

class GamePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tilesList: [],
      matchedList: [],
      appearedEmoji: [],
      count: 0,
      minutes: 0,
      seconds: 0,
    };
    this.uniqueId1 = setInterval(this.tick1, 1000);
  }

  componentDidMount() {
    this.fillTheTiles();
  }
  /* 

  
  */

  fillTheTiles = async () => {
    const emojis = [
      "🎇",
      "🎊",
      "🎈",
      "😍",
      "😎",
      "😉",
      "❤️",
      "😰",
      "😷",
      "🤧",
      "🤡",
      "☠️",
      "👻",
      "🙈",
      "🦜",
      "🧠",
    ];
    const listEmojis = [];
    for (let i = 0; i < emojis.length; i++) {
      listEmojis.push(emojis[i], emojis[i]);
    }
    listEmojis.sort(() => Math.random() - 0.5);
    this.setState({ tilesList: listEmojis });
  };

  tick1 = () => {
    const { matchedList, seconds, tilesList, minutes, count } = this.state;
    this.setState((prev) => {
      if (matchedList.length === tilesList.length) {
        clearInterval(this.uniqueId1);
        const { history } = this.props;
        history.replace("/scorecard", { count, seconds, minutes });
        window.location.reload();
        return { seconds: 0, minutes: 0, matchedList: [] };
      } else if (prev.seconds === 59) {
        return { seconds: 0, minutes: prev.minutes + 1 };
      }
      return { seconds: prev.seconds + 1 };
    });
  };

  checkTheMatch = (id) => {
    const { tilesList, matchedList, appearedEmoji } = this.state;
    appearedEmoji.push(id);
    console.log(appearedEmoji.length);
    this.setState({ appearedEmoji });
    if (appearedEmoji.length === 2) {
      if (tilesList[appearedEmoji[0]] === tilesList[appearedEmoji[1]]) {
        matchedList.push(appearedEmoji[0], appearedEmoji[1]);
        this.setState((prev) => ({
          matchedList,
          appearedEmoji: [],
          count: prev.count + 1,
        }));
      } else {
        this.uniqueId = setInterval(this.tick, 1000);
      }
    }
  };
  tick = () => {
    const c = 1;
    if (c === 1) {
      clearInterval(this.uniqueId);
      this.setState((prev) => ({ appearedEmoji: [], count: prev.count - 1 }));
    }
  };

  render() {
    const { tilesList, matchedList, appearedEmoji, count, seconds, minutes } =
      this.state;
    const extendedSeconds = seconds > 9 ? `${seconds}` : `0${seconds}`;
    const extendedMinutes = minutes > 9 ? `${minutes}` : `0${minutes}`;
    if (name === null) {
      return <Redirect to="/" />;
    }
    return (
      <div className="game-page-main-container">
        <div className="game-page-second-container">
          <h1 className="gamepage-name-heading">Mahajong Game</h1>
          <div className="score-time-container">
            <p className="score-card-time">Score: {count} </p>
            <p className="score-card-time">
              Time: {extendedMinutes}:{extendedSeconds}
            </p>
          </div>
          <div className="game-card-container">
            <h1 className="game-card-name-heading">Welcome {name} 👋👋</h1>
            <ul className="unordered-game-card">
              {tilesList.map((eachItem, index) => (
                <TileCard
                  eachItem={eachItem}
                  index={index}
                  key={index}
                  checkTheMatch={this.checkTheMatch}
                  isFlipped={
                    appearedEmoji.includes(index) || matchedList.includes(index)
                  }
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
export default GamePage;
