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
  }

  componentDidMount() {
    this.fillTheTiles();
    this.setTimer();
  }

  componentWillUnmount() {
    clearInterval(this.uniqueId1);
  }

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

  setTimer = () => {
    this.uniqueId1 = setInterval(this.tick1, 1000);
  };

  tick1 = () => {
    const { matchedList, seconds, minutes, count } = this.state;
    if (matchedList.length === 32) {
      clearInterval(this.uniqueId1);
      const { history } = this.props;
      history.replace("/scorecard", { count, seconds, minutes });
      window.location.reload();
      this.setState({ matchedList: [] });
    } else {
      this.setState((prev) => {
        let updatedSec = prev.seconds + 1;
        let updatedMin = prev.minutes;
        if (updatedSec === 59) {
          updatedSec = 0;
          updatedMin++;
        }
        return { minutes: updatedMin, seconds: updatedSec };
      });
    }
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
        this.uniqueId = setTimeout(this.tick, 1000);
      }
    }
  };
  tick = () => {
    clearTimeout(this.uniqueId);
    this.setState((prev) => ({ appearedEmoji: [], count: prev.count - 1 }));
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
