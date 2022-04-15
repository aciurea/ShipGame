import { getWinner, populateTable } from '../../providers/play';
import { GameStore, playerRecords, useGame, useGameDispatch } from './game-context';
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
  const { table, config, isOver } = useGame();

  return (
    <Container style={{ width: '100%', height: '100%' }} size={table.length}>
      {isOver ? <Popup /> : null}
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

const Popup = () => {
  const dispatch = useGameDispatch();
  const { config } = useGame();

  if (!config) return null;

  return (
    <section className="popup">
      <p style={{ fontSize: 30, fontWeight: 800 }}>
        Congratulations!!! {getWinner(config.players[0], config.players[1])} won!
      </p>

      <button
        onClick={() => {
          const { board, scoreTable } = populateTable(10);
          dispatch({
            type: 'setConfig',
            config: {
              isComputer: config.isComputer,
              players: [
                {
                  ...config.players[0],
                  records: { ...playerRecords },
                },
                {
                  ...config.players[1],
                  records: { ...playerRecords },
                },
              ],
            },
          });
          dispatch({
            type: 'populateTable',
            table: { table: board, score: scoreTable },
          });
        }}
      >
        Start Again
      </button>

      <button onClick={() => dispatch({ type: 'setConfig', config: null })}>
        Modify configuration
      </button>
    </section>
  );
};
