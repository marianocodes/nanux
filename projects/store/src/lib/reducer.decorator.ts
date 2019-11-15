export function Reducer(action) {
  return (target, name, descriptor?) => {
    const reducerAction = target.reducerAction;
    if (!reducerAction) target.reducerAction = { };
    // is decorartor used in a method?
    if (descriptor) {
      target.reducerAction[action] = { func: target[name] };
      return descriptor;
    }

    let value;

    const getter = function() {
      return value;
    };

    const setter = function(newVal) {
      target.reducerAction[action] = { func: newVal};
      value = newVal;
    };

    return {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true
    }
  }
}
