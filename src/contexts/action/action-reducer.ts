interface IActionReducerState<Action extends string = string> {
  state: Record<Action, boolean>;
  watch: Action[];
}

interface IStateAction<Action extends string = string> {
  action: Action;
  type: ReducerActionType.SET_FALSE | ReducerActionType.SET_TRUE;
}

interface IWatchAction<Action extends string = string> {
  action: Action | Action[];
  type: ReducerActionType.WATCH | ReducerActionType.STOP_WATCH;
}

export enum ReducerActionType {
  SET_TRUE,
  SET_FALSE,
  STOP_WATCH,
  WATCH,
}

export type ReducerAction<Action extends string = string> =
  | IStateAction<Action>
  | IWatchAction<Action>;

export const reducer = <Action extends string = string>(
  prev: IActionReducerState<Action>,
  { action, type }: ReducerAction<Action>,
): IActionReducerState<Action> => {
  const { state, watch } = prev;

  if (Array.isArray(action)) {
    return action.reduce(
      (merged, next) => reducer(merged, { action: next, type }),
      prev,
    );
  }

  if (
    watch.includes(action)
      ? type === ReducerActionType.WATCH
      : [
          ReducerActionType.SET_TRUE,
          ReducerActionType.SET_FALSE,
          ReducerActionType.STOP_WATCH,
        ].includes(type)
  ) {
    return { state, watch };
  }

  switch (type) {
    case ReducerActionType.WATCH:
      return { state, watch: [...watch, action] };

    case ReducerActionType.SET_TRUE:
      return { state: { ...state, [action]: true }, watch };

    case ReducerActionType.SET_FALSE:
      return { state: { ...state, [action]: true }, watch };

    case ReducerActionType.STOP_WATCH:
      return { state, watch: watch.filter((next) => next !== action) };

    default:
      return { state, watch };
  }
};
