import { ShipType } from '../../types/play';

type TableGameProps = {
  board: null[][];
  updateScore: (shipType: ShipType) => void;
};

const getValue = (data: string): { col: string; dirty: boolean } => {
  if (!data) return { col: '', dirty: true };

  return JSON.parse(data);
};

export const TableGame = ({ board, updateScore }: TableGameProps) => {
  return (
    <section
      className="board"
      onClick={({ target }: any) => {
        const { col, dirty } = getValue(target.dataset?.col);

        if (dirty || col === '') return;
        if (col !== null) updateScore(col as ShipType);

        target.dataset.col = JSON.stringify({ col, dirty: true });
        target.children[0].style.visibility = 'visible';
      }}
    >
      {board?.map((row, index) => (
        <section className="row" key={index}>
          {row.map((col, index) => (
            <section key={index} className="col" data-col={JSON.stringify({ col, dirty: false })}>
              <img
                src={col ? '/assets/HitSmall.png' : '/assets/MissSmall.png'}
                alt={col ? 'hit' : 'miss'}
                style={{ maxWidth: '70%', height: 'auto', visibility: 'hidden' }}
              />
            </section>
          ))}
        </section>
      ))}
    </section>
  );
};
