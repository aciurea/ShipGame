import * as React from 'react';
import { isGameOver, populateTable } from '../../providers/play';
import { ShipType } from '../../types/play';
import { Container } from './styled';
import { TableGame } from './TableGame';
import { TableScore } from './TableScore';

export const GameComponent = () => {
  const [{ board, scoreTable }, setTable] = React.useState(
    populateTable({ size: 10, Battleship: 5, Carrier: 5, Cruiser: 3, Destroyer: 9, Submarine: 20 })
  );
  const [isOver, setIsOver] = React.useState(false);

  const updateScore = (shipType: ShipType) => {
    setTable(({ board, scoreTable }) => {
      const currentShip = scoreTable[shipType];
      const newShip = {
        ...currentShip,
        count: currentShip.count + 1,
      };

      const newScoreTable = {
        ...scoreTable,
        [shipType]: newShip,
      };

      if (isGameOver(newScoreTable)) setIsOver(true);

      return {
        board,
        scoreTable: newScoreTable,
      };
    });
  };
  const tableGame = React.useRef<any | null>(<TableGame board={board} updateScore={updateScore} />);

  return (
    <>
      <section style={{ visibility: isOver ? 'visible' : 'hidden' }}>
        Game over <button onClick={() => window.location.reload()}>Start new Game</button>
      </section>
      <Container size={board.length}>
        <TableScore scoreTable={scoreTable} />
        {tableGame.current}
      </Container>
    </>
  );
};
