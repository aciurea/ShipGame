import createStore from '../../providers/create-store';
import { Player, ScoreTable, ShipType } from '../../types/play';

export type Configuration = {
  isComputer: boolean;
  players: [Player, Player];
};
interface State {
  score: Record<ShipType, ScoreTable> | null;
  table: Array<Array<null | string>>;
  isOver: boolean;
  turn: 0 | 1;
  config: null | Configuration;
  isNew: boolean;
}

type Action =
  | {
      type: 'setScore';
      score: Record<ShipType, ScoreTable>;
      players: [Player, Player];
    }
  | { type: 'populateTable'; table: Pick<State, 'table' | 'score'> }
  | { type: 'setIsOver'; isOver: boolean }
  | { type: 'setTurn'; turn: 0 | 1 }
  | { type: 'setConfig'; config: Configuration | null; isNew: boolean };

const initialState: State = {
  score: null,
  isOver: false,
  table: [],
  turn: 0,
  config: null,
  isNew: false,
};

function reducer(state: any, action: Action): State {
  switch (action.type) {
    case 'setIsOver':
      return {
        ...state,
        isOver: action.isOver,
      };

    case 'setScore':
      return {
        ...state,
        score: action.score,
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
      return { ...initialState, config: action.config, isNew: action.isNew };

    default:
      throw new Error('Action no implemented');
  }
}

export const {
  StoreProvider: GameStore,
  useDispatch: useGameDispatch,
  useStore: useGame,
} = createStore(reducer, initialState);
