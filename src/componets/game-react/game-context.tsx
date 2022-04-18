import createStore from '../../providers/create-store';
import { isGameOver } from '../../providers/play';
import { Configuration, Player, ScoreTable, ShipType } from '../../types/play';

interface State {
  score: Record<ShipType, ScoreTable> | null;
  table: Array<Array<null | string>>;
  isOver: boolean;
  turn: 0 | 1;
  config: null | Configuration;
}

type Action =
  | {
      type: 'setScore';
      score: Record<ShipType, ScoreTable>;
      players: [Player, Player];
    }
  | { type: 'populateTable'; table: Pick<State, 'table' | 'score'> }
  | { type: 'setTurn'; turn: 0 | 1 }
  | { type: 'setConfig'; config: Configuration | null };

export const playerRecords = Object.freeze({
  [ShipType.Battleship]: 0,
  [ShipType.Carrier]: 0,
  [ShipType.Cruiser]: 0,
  [ShipType.Destroyer]: 0,
  [ShipType.Submarine]: 0,
});

const initialState: State = {
  score: null,
  isOver: false,
  table: [],
  turn: 0,
  config: null,
};

function reducer(state: any, action: Action): State {
  switch (action.type) {
    case 'setScore':
      return {
        ...state,
        score: action.score,
        isOver: isGameOver(action.score),
        config: {
          ...state.config,
          players: action.players,
        },
      };

    case 'setTurn':
      return { ...state, turn: action.turn };

    case 'populateTable':
      return { ...state, ...action.table };

    case 'setConfig':
      return { ...initialState, config: action.config };

    default:
      throw new Error('Action no implemented');
  }
}

export const {
  StoreProvider: GameStore,
  useDispatch: useGameDispatch,
  useStore: useGame,
} = createStore(reducer, initialState);
