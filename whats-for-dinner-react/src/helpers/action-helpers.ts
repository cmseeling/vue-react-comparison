import { Middleware, Dispatch } from 'redux';

export class Action {
  constructor(public type: string) { }
}

type TActionCallback<TState, TAction> = (store: TState, action: TAction) => TState;

interface ActionCallback<TState, TAction> {
  type: string;
  callback: TActionCallback<TState, TAction>;
}

export function createSwitch<TState>(initialState: TState, reducers: ActionCallback<TState, Action>[]) {
  return (state: TState = initialState, action: Action): TState => {
    return switchReducer(state, action, reducers);
  };
}

export function createCase<TState, TAction extends Action>(
  actionType: TAction, 
  callback: TActionCallback<TState, TAction>): ActionCallback<TState, TAction> {
  
  return {
    type: actionType.type,
    callback
  };
}

function switchReducer<TState>(state: TState, action: Action, reducers: ActionCallback<TState, Action>[]): TState {
  const func = reducers.find((r) => r.type === action.type);
  if (func) {
    return func.callback(state, action);
  }
  return state;
}

export function actionToPlainObject(): Middleware {
  // tslint:disable-next-line:no-any
  const customDispatch: Middleware = store => next => (action: any) => {
    if (action instanceof Action) {
      action = Object.assign({}, action);
    }
    return next(action);
  };
  return customDispatch;
}

export function asyncAction<TAction extends Action>
(func: ((dispatch: Dispatch<TAction>, ...args: {}[]) => Promise<TAction>)) {
  // tslint:disable-next-line:no-any
  const result: any = (...args: {}[]) => {
    return (dispatch: Dispatch<TAction>): Promise<TAction> => {
      return func.apply(null, [dispatch, ...args]);
    };
  };
  return result;
}