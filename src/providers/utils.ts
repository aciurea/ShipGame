export const debounce = (() => {
  let timer: any;

  return (callback: () => void, timeout: number = 300) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback();
      clearTimeout(timer);
    }, timeout);
  };
})();
