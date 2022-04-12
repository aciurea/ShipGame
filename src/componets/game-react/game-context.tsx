import createStore from '../../providers/create-store';
import { ScoreTable, ShipType } from '../../types/play';

type State = {
  score: Record<ShipType, ScoreTable> | null;
  table: Array<Array<null | string>>;
  isOver: boolean;
};

type Action =
  | { type: 'setScore'; score: Record<ShipType, ScoreTable> }
  | { type: 'startNew'; state: State }
  | { type: 'setIsOver'; isOver: boolean };

const initialState: State = {
  score: null,
  isOver: false,
  table: [],
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
      };

    case 'startNew':
      return { ...action.state };

    default:
      throw new Error('Action no implemented');
  }
}

export const {
  StoreProvider: GameStore,
  useDispatch: useGameDispatch,
  useStore: useGame,
} = createStore(reducer, initialState);
