import * as React from 'react';

const createStore = <S, A>(reducer: (state: S, action: A) => S, initialState: S) => {
  const DispatchContext = React.createContext<React.Dispatch<A>>({} as React.Dispatch<A>);
  const StoreContext = React.createContext({} as S);

  const StoreProvider = ({ children }: { children: React.ReactNode }): any => {
    const [store, dispatch] = React.useReducer<(state: S, action: A) => S>(reducer, initialState);
    const dispatchRef = React.useRef(dispatch);

    return (
      <DispatchContext.Provider value={dispatchRef.current}>
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
      </DispatchContext.Provider>
    );
  };

  const useDispatch = () => React.useContext(DispatchContext);
  const useStore = () => React.useContext(StoreContext);

  return { StoreProvider, useDispatch, useStore };
};

export default createStore;
