import "./index.css";

const TileCard = (props) => {
  const { eachItem, index, checkTheMatch, isFlipped } = props;
  const onTapEmoji = () => {
    if (!isFlipped) {
      checkTheMatch(index);
    }
  };
  return (
    <button type="button" onClick={onTapEmoji} className="tile-button">
      {isFlipped ? eachItem : ""}
    </button>
  );
};
export default TileCard;
