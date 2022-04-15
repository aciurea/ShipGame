import { Player, ShipType } from '../../types/play';
import { useGame } from './game-context';

const base = '/assets/';
const Images = {
  [ShipType.Battleship]: `${base}battleshipShape.png`,
  [ShipType.Carrier]: `${base}carrierShape.png`,
  [ShipType.Cruiser]: `${base}cruiserShape.png`,
  [ShipType.Destroyer]: `${base}aircraftShape.png`,
  [ShipType.Submarine]: `${base}submarineShape.png`,
};

const TableScore = ({ player }: { player: Player }) => {
  const { score } = useGame();
  if (!score) return null;

  return (
    <section className="table">
      <section style={{ padding: 20 }}>{player.name}</section>

      {Object.keys(player.records).map((shipType: any) => {
        const { count, size } = score[shipType as ShipType];
        const shipCount = player.records[shipType as ShipType];

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
            {getScore(shipCount)}
          </section>
        );
      })}
    </section>
  );
};

const getScore = (count: number) => {
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
