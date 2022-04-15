import * as React from 'react';
import styled from 'styled-components';
import { populateTable } from '../../providers/play';
import { Player, ShipType } from '../../types/play';
import { playerRecords, useGameDispatch } from './game-context';

const Container = styled.section`
  display: flex;
  flex-direction: column;

  .item {
    display: flex;
    padding: 20px;

    label {
      padding-right: 10px;
    }
  }
`;

interface Elements {
  player1: HTMLInputElement;
  player2: HTMLInputElement;
}

export const GameConfiguration = () => {
  const [isComputer, setIsComputer] = React.useState(false);
  const dispatch = useGameDispatch();

  return (
    <Container>
      <section className="item">
        <label>Play again computer?</label>
        <input
          type="checkbox"
          defaultChecked={isComputer}
          onChange={(event) => setIsComputer(event.target.checked)}
        />
      </section>

      <form
        onSubmit={(event: any) => {
          const { elements } = event.target as any;
          const { player1, player2 } = elements as Elements;
          const p1: Player = {
            name: player1.value,
            records: { ...playerRecords },
          };

          const p2 = {
            name: isComputer ? 'Computer' : player2.value,
            records: {
              ...playerRecords,
            },
          };

          dispatch({
            type: 'setConfig',
            config: { isComputer, players: [p1, p2] },
          });

          const { board, scoreTable } = populateTable(10);

          dispatch({
            type: 'populateTable',
            table: { table: board, score: scoreTable },
          });
          event.preventDefault();
        }}
      >
        <section className="item">
          <label>Player 1 name: </label>
          <input type="text" required name="player1" />
        </section>

        {!isComputer ? (
          <section className="item">
            <label>Player 2 name: </label>
            <input type="text" required name="player2" />
          </section>
        ) : null}

        <button>Start new game</button>
      </form>
    </Container>
  );
};
