/* eslint-disable react-hooks/exhaustive-deps */
import { apiInstance } from 'api/api-instance';
import { useEffect, useReducer } from 'react';

const apiReducer = <Action extends string = string>(
  previous: Record<Action, boolean>,
  { action, state }: { action: Action; state: boolean },
) =>
  previous[action] === state
    ? previous
    : {
        ...previous,
        [action]: state,
      };

export const useAreActionsRunning = <Action extends string = string>(
  actions: Action[],
) => {
  const [isLoading, dispatcher] = useReducer(apiReducer, {}, () =>
    actions.reduce(
      (reduction, action) => ({ ...reduction, [action]: false }),
      {},
    ),
  );

  useEffect(
    () =>
      apiInstance.addEventListener<Action>('request', ({ action }) => {
        if (actions.includes(action)) {
          dispatcher({ action, state: true });
        }
      }),
    [],
  );

  useEffect(
    () =>
      apiInstance.addEventListener<Action>('resolved', ({ action }) => {
        if (actions.includes(action)) {
          dispatcher({ action, state: false });
        }
      }),
    [],
  );

  return isLoading as Record<Action, boolean>;
};
