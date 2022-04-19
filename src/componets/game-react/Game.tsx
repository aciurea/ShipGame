import { useEffect, useState } from 'react';
import { GameStore, useGame } from './game-context';
import { GameConfiguration } from './GameConfiguration';
import { Popup } from './Popup';
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
  const { table, config, isOver, turn } = useGame();
  const [popup, setPopup] = useState<any>();

  useEffect(() => {
    setPopup(isOver ? <Popup /> : null);
  }, [isOver]);
  return (
    <Container style={{ width: '100%', height: '100%' }} size={table.length}>
      {popup}
      {config ? (
        <>
          <h2>Turn is: {config.players[turn].name}</h2>
          <section className="game">
            <TableScore player={config.players[0]} />
            <TableGame />
            <TableScore player={config.players[1]} />
          </section>
        </>
      ) : (
        <GameConfiguration />
      )}
    </Container>
  );
};

export default GameReact;
