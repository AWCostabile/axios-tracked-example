import { TrackedInstance } from 'axios-tracked';
import { createContext, useContext, useEffect, useReducer } from 'react';
import { reducer, ReducerAction, ReducerActionType } from './action-reducer';

export const createActions = <Action extends string = string>(
  apiInstance: TrackedInstance,
) => {
  const actionContext = createContext({
    actions: {} as Record<Action, boolean>,
    getRunningActions: <A extends Action = Action>(watchActions: A[]) =>
      ({} as Record<A, boolean>),
    updateActions: (next: ReducerAction<Action>) => {},
  });

  const ActionProvider: React.FC = ({ children }) => {
    const [{ state }, updateActions] = useReducer(reducer, {
      state: {},
      watch: [],
    });

    useEffect(
      () =>
        apiInstance.subscribe('request', ({ action }) => {
          updateActions({ action, type: ReducerActionType.SET_TRUE });
        }),
      [],
    );

    useEffect(
      () =>
        apiInstance.subscribe('resolved', ({ action }) => {
          updateActions({ action, type: ReducerActionType.SET_FALSE });
        }),
      [],
    );

    return (
      <actionContext.Provider
        value={{
          actions: state,
          getRunningActions: <R extends Action = Action>(watchActions: R[]) =>
            watchActions.reduce(
              (runningActions, action) => ({
                ...runningActions,
                [action]: state[action],
              }),
              {} as Record<R, boolean>,
            ),
          updateActions,
        }}
      >
        {children}
      </actionContext.Provider>
    );
  };

  const useRunningActions = <InnerAction extends Action = Action>(
    action: InnerAction[],
  ) => {
    const { getRunningActions, updateActions } = useContext(actionContext);

    useEffect(() => {
      updateActions({ action, type: ReducerActionType.WATCH });

      return () => {
        updateActions({ action, type: ReducerActionType.STOP_WATCH });
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return getRunningActions(action);
  };

  return { ActionProvider, useRunningActions };
};
