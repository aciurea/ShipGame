import * as React from 'react';
import styled from 'styled-components';
import { getAllMax, getMaxShips, populateTable } from '../../providers/play';
import { Player, ShipType } from '../../types/play';
import { playerRecords, useGameDispatch } from './game-context';

const Container = styled.section`
  display: flex;
  flex-direction: column;

  .item {
    width: 400px;
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    padding: 5px 0;
  }
`;

interface Elements {
  player1: HTMLInputElement;
  player2: HTMLInputElement;
  tableSize: HTMLInputElement;
}

export const GameConfiguration = () => {
  const [isComputer, setIsComputer] = React.useState(false);
  const dispatch = useGameDispatch();
  const [max, setMax] = React.useState({
    max: 0,
    remaining: 0,
  });
  const formRef = React.useRef<HTMLFormElement>(null);

  return (
    <Container>
      <section
        style={{ paddingBottom: 20, fontWeight: 700, color: max.remaining >= 0 ? 'green' : 'red' }}
      >
        Remaining ships: {max.remaining}
      </section>

      <section className="item">
        <label>Play against computer?</label>
        <input
          type="checkbox"
          defaultChecked={isComputer}
          onChange={(event) => setIsComputer(event.target.checked)}
        />
      </section>

      <form
        ref={formRef}
        onSubmit={(event: any) => {
          const { elements } = event.target as any;
          const {
            player1,
            player2,
            tableSize,
            Battleship: { value: Battleship },
            Carrier: { value: Carrier },
            Cruiser: { value: Cruiser },
            Submarine: { value: Submarine },
            Destroyer: { value: Destroyer },
          } = elements as Elements & Record<ShipType, HTMLInputElement>;
          const ships = { Battleship, Carrier, Cruiser, Submarine, Destroyer };
          const players: [Player, Player] = [
            {
              name: player1.value,
              records: { ...playerRecords },
            },
            {
              name: isComputer ? 'Computer' : player2.value,
              records: { ...playerRecords },
            },
          ];

          dispatch({
            type: 'setConfig',
            config: {
              isComputer,
              players,
              tableSize: +tableSize.value,
              ships,
            },
          });

          const { board, scoreTable } = populateTable({ size: +tableSize.value, ...ships });

          dispatch({
            type: 'populateTable',
            table: { table: board, score: scoreTable },
          });
          event.preventDefault();
        }}
      >
        <Item type="text" label="Player1 name" name="player1" placeholder="Insert player name" />

        {!isComputer ? (
          <Item type="text" label="Player2 name" name="player2" placeholder="Insert player name" />
        ) : null}

        <Item
          type="number"
          label="Table size"
          name="tableSize"
          placeholder="Insert the table size > 4"
          min={5}
          onChange={(value) => {
            const maxShips = getMaxShips(+value);

            setMax({
              max: maxShips,
              remaining: maxShips - (max.max - max.remaining),
            });
          }}
        />

        <Item
          type="number"
          min={0}
          label={ShipType.Battleship}
          name={ShipType.Battleship}
          defaultValue="0"
          onChange={() => {
            setMax(({ max }) => ({
              max,
              remaining: getAllMax(max, formRef.current?.elements as any),
            }));
          }}
        />

        <Item
          type="number"
          min={0}
          label={ShipType.Carrier}
          name={ShipType.Carrier}
          defaultValue="0"
          onChange={() => {
            setMax(({ max }) => ({
              max,
              remaining: getAllMax(max, formRef.current?.elements as any),
            }));
          }}
        />

        <Item
          type="number"
          min={0}
          label={ShipType.Cruiser}
          name={ShipType.Cruiser}
          defaultValue="0"
          onChange={() => {
            setMax(({ max }) => ({
              max,
              remaining: getAllMax(max, formRef.current?.elements as any),
            }));
          }}
        />

        <Item
          type="number"
          min={0}
          defaultValue="0"
          label={ShipType.Destroyer}
          name={ShipType.Destroyer}
          onChange={() => {
            setMax(({ max }) => ({
              max,
              remaining: getAllMax(max, formRef.current?.elements as any),
            }));
          }}
        />

        <Item
          type="number"
          min={0}
          label={ShipType.Submarine}
          name={ShipType.Submarine}
          defaultValue="0"
          onChange={() => {
            setMax(({ max }) => ({
              max,
              remaining: getAllMax(max, formRef.current?.elements as any),
            }));
          }}
        />

        <button
          onClick={(event) => {
            if (max.remaining < 0) event.preventDefault();
          }}
        >
          Start new game
        </button>
      </form>
    </Container>
  );
};

type ItemProps = {
  type: 'text' | 'number';
  label: string;
  name: string;
  defaultValue?: string;
  max?: number;
  min?: number;
  placeholder?: string;
  onChange?: (value: string) => void;
};

const Item = ({ label, onChange, defaultValue, ...props }: ItemProps) => {
  const [value, setValue] = React.useState(defaultValue ?? '');

  return (
    <section className="item">
      <label>{label}: </label>
      <input
        required
        value={value}
        {...props}
        onChange={(event: any) => {
          setValue(event.target.value);
          onChange?.(event.target.value);
        }}
      />
    </section>
  );
};
