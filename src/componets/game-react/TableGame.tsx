import * as React from 'react';
import { chooseValueByComputer, getAllIndexes, getNewScore, getValue } from '../../providers/play';
import { useGame, useGameDispatch } from './game-context';
import { Overlay } from './Overlay';

const TableGame = () => {
  const dispatch = useGameDispatch();
  const { table, score, turn, config, isOver } = useGame();
  const { current: computerOptions } = React.useRef(getAllIndexes(table));
  const tableRef = React.useRef<HTMLElement | null>(null);
  const [showOverflay, setShowOverlay] = React.useState(false);

  if (!score || !config) return null;

  return (
    <section
      ref={tableRef}
      className="board"
      style={{ position: 'relative' }}
      onClick={({ target }: any) => {
        if (isOver) return;
        const { col, dirty, index } = getValue(target.dataset?.col);

        if (!dirty) dispatch({ type: 'setTurn', turn: turn === 0 ? 1 : 0 });
        if (dirty || col === '') return;

        if (config.isComputer && turn === 0) {
          setShowOverlay(true);
          const timeoutId = setTimeout(() => {
            if (tableRef.current) chooseValueByComputer(tableRef.current, computerOptions);
            setShowOverlay(false);
            clearTimeout(timeoutId);
          }, 1000);
        }

        if (col !== null) {
          dispatch({
            type: 'setScore',
            ...getNewScore({ score, col, config, turn }),
          });
        }

        computerOptions.delete(index);
        target.dataset.col = JSON.stringify({ col, dirty: true });
        target.children[0].style.visibility = 'visible';
        target.children[0].style.cursor = 'not-allowed';
      }}
    >
      {table?.map((row, rowIndex) => {
        const key = `${JSON.stringify(row)}_${rowIndex}`;

        return (
          <section className="row" key={key}>
            {row.map((col, colIndex) => (
              <section
                key={key + colIndex}
                className="col"
                data-col={JSON.stringify({ col, dirty: false, index: `${rowIndex};${colIndex}` })}
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
      {showOverflay ? <Overlay /> : null}
    </section>
  );
};

export default TableGame;
