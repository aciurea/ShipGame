import * as React from 'react';
import { populateTable } from '../../providers/play';
import { GameStore, useGame, useGameDispatch } from './game-context';
import { GameConfiguration } from './GameConfiguration';
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
  const { table, config, isNew } = useGame();

  React.useEffect(() => {
    if (isNew) {
      const { board, scoreTable } = populateTable(10);

      dispatch({
        type: 'populateTable',
        table: { table: board, score: scoreTable },
      });
    }
  }, [dispatch, isNew]);

  return (
    <Container style={{ width: '100%', height: '100%' }} size={table.length}>
      {config ? (
        <section className="game">
          <TableScore player={config.players[0]} />
          <TableGame />
          <TableScore player={config.players[1]} />
        </section>
      ) : (
        <GameConfiguration />
      )}
    </Container>
  );
};

export default GameReact;
