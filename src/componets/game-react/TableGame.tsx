import { add, isGameOver } from '../../providers/play';
import { ShipType } from '../../types/play';
import { useGame, useGameDispatch } from './game-context';

const getValue = (data: string): { col: string; dirty: boolean } => {
  if (!data) return { col: '', dirty: true };

  return JSON.parse(data);
};

const TableGame = () => {
  const dispatch = useGameDispatch();
  const { table, score, turn, config, isOver } = useGame();

  if (!score || !config) return null;

  return (
    <section
      className="board"
      onClick={({ target }: any) => {
        if (isOver) return;
        const { col, dirty } = getValue(target.dataset?.col);
        dispatch({ type: 'setTurn', turn: turn === 0 ? 1 : 0 });

        if (dirty || col === '') return;
        if (col !== null) {
          const ship = score[col as ShipType];
          const newShip = {
            ...ship,
            count: ship.count + 1,
          };

          const newScore = {
            ...score,
            [col]: newShip,
          };
          if (isGameOver(newScore)) dispatch({ type: 'setIsOver', isOver: true });
          const [player1, player2] = config.players;

          const newPlayer1 = turn === 0 ? add(player1, col as ShipType) : { ...player1 };
          const newPlayer2 = turn === 1 ? add(player2, col as ShipType) : { ...player2 };

          dispatch({
            type: 'setScore',
            score: newScore,
            players: [newPlayer1, newPlayer2],
          });
        }

        target.dataset.col = JSON.stringify({ col, dirty: true });
        target.children[0].style.visibility = 'visible';
      }}
    >
      {table?.map((row, index) => {
        const key = `${JSON.stringify(row)}_${index}`;

        return (
          <section className="row" key={key}>
            {row.map((col, index) => (
              <section
                key={key + index}
                className="col"
                data-col={JSON.stringify({ col, dirty: false })}
              >
                <img
                  src={col ? '/assets/HitSmall.png' : '/assets/MissSmall.png'}
                  alt={col ? 'hit' : 'miss'}
                  style={{ maxWidth: '70%', height: 'auto', visibility: 'hidden' }}
                />
              </section>
            ))}
          </section>
        );
      })}
    </section>
  );
};

export default TableGame;
