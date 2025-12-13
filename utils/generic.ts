type DebounceFunction = <T, U>(
  fn: (...args: T[]) => U,
  delay?: number
) => (...args: T[]) => void;

// debounce function
const debounced: DebounceFunction = (fn, delay = 100) => {
  let timer: NodeJS.Timeout;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      return fn(...args);
    }, delay);
  };
};

export { debounced };
