import * as React from 'react';
import { populateTable } from '../../providers/play';
import { GameStore, useGame, useGameDispatch } from './game-context';
import Header from './Header';
import Container from './styled';
import TableGame from './TableGame';
import TableScore from './TableScore';

const GameReact = () => {
  return (
    <GameStore>
      <Game />
    </GameStore>
  );
};

const Game = () => {
  const dispatch = useGameDispatch();
  const { table } = useGame();

  React.useEffect(() => {
    const { board, scoreTable } = populateTable(10);

    dispatch({ type: 'startNew', state: { table: board, score: scoreTable, isOver: false } });
  }, [dispatch]);

  return (
    <Container style={{ width: '100%', height: '100%' }} size={table.length}>
      <Header />
      <section className="game">
        <TableScore />
        <TableGame />
      </section>
    </Container>
  );
};

export default GameReact;
