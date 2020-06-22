export interface ReducerMap2 {
  func: (...args) => any;
  state;
}

export interface ReducerMap {
  [key: string]: ReducerMap2;
}

export function Reducer(action) {
  return (target, name, descriptor?) => {
    const reducerAction = target.reducerAction;

    if (!reducerAction) {
      // TOOD: Rename reducerAction to something more meaningful
      target.reducerAction = { };
    }
    // is decorator used in a method?
    if (descriptor) {
      target.reducerAction[action] = { func: target[name] };
      return descriptor;
    }

    let value;

    // TODO: I think this is not needed
    // There is no need to return the reducer function
    const getter = () => {
      return value;
    };

    const setter = (newVal) => {
      // capture reducer function and store in a property in
      // @GetStore class
      target.reducerAction[action] = { func: newVal };
      value = newVal;
    };

    return {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true
    };
  };
}
