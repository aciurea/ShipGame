import { ShipType } from '../../types/play';

type TableScoreProps = {
  scoreTable: Record<ShipType, { count: number; positions: [number, number][] }>;
};

const base = '/assets/';
const Images = {
  [ShipType.Battleship]: `${base}battleshipShape.png`,
  [ShipType.Carrier]: `${base}carrierShape.png`,
  [ShipType.Cruiser]: `${base}cruiserShape.png`,
  [ShipType.Destroyer]: `${base}aircraftShape.png`,
  [ShipType.Submarine]: `${base}submarineShape.png`,
};

export const TableScore = ({ scoreTable }: TableScoreProps) => {
  return (
    <section className="table">
      {Object.keys(scoreTable).map((shipType: any) => {
        const { count, positions } = scoreTable[shipType as ShipType];

        return (
          <section key={shipType} style={{ padding: '5px 0' }}>
            <img
              src={Images[shipType as ShipType]}
              alt="something"
              style={{
                maxWidth: '40%',
                height: 'auto',
                paddingRight: 10,
                opacity: count === 0 ? 0.5 : 1,
              }}
            />
            {getScore(count, positions.length)}
          </section>
        );
      })}
    </section>
  );
};

export const getScore = (count: number, size: number) => {
  return (
    <>
      {new Array(size - count).fill(null).map((_, index) => (
        <span key={index}>
          <img src="/assets/HitSmall.png" alt="hit" width="25px" height="25px" />
        </span>
      ))}
    </>
  );
};
