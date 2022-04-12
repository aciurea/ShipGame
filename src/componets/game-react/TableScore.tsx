import { ShipType } from '../../types/play';
import { useGame } from './game-context';

const base = '/assets/';
const Images = {
  [ShipType.Battleship]: `${base}battleshipShape.png`,
  [ShipType.Carrier]: `${base}carrierShape.png`,
  [ShipType.Cruiser]: `${base}cruiserShape.png`,
  [ShipType.Destroyer]: `${base}aircraftShape.png`,
  [ShipType.Submarine]: `${base}submarineShape.png`,
};

const TableScore = () => {
  const { score } = useGame();
  if (!score) return null;

  return (
    <section className="table">
      {Object.keys(score).map((shipType: any) => {
        const { count, size } = score[shipType as ShipType];

        return (
          <section key={shipType} style={{ padding: '5px 0' }}>
            <img
              src={Images[shipType as ShipType]}
              alt="a ship"
              style={{
                maxWidth: '40%',
                height: 'auto',
                paddingRight: 10,
                opacity: count === size ? 0.5 : 1,
              }}
            />
            {getScore(count, size)}
          </section>
        );
      })}
    </section>
  );
};

const getScore = (count: number, size: number) => {
  const score = [];
  while (count > 0) {
    score.push(
      <span key={count}>
        <img src="/assets/HitSmall.png" alt="hit" width="25px" height="25px" />
      </span>
    );
    count--;
  }

  return score;
};

export default TableScore;
