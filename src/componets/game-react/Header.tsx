import { populateTable } from '../../providers/play';
import { useGameDispatch, useGame } from './game-context';

const Header = () => {
  const dispatch = useGameDispatch();
  const { isOver } = useGame();

  return (
    <section className="header">
      <button
        style={{ marginRight: 20 }}
        onClick={() => {
          const { board, scoreTable } = populateTable(10);

          dispatch({
            type: 'startNew',
            state: { table: board, score: scoreTable, isOver: false },
          });
        }}
      >
        Start new Game
      </button>
      {!isOver ? <span>Game is Over. Please start a new one</span> : null}
    </section>
  );
};

export default Header;
