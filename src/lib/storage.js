import config from 'src/config';


class Storage {
  get() {
    return JSON.parse(localStorage.getItem(config.localStorage)) || undefined;
  }

  set(items) {
    if (items) localStorage.setItem(config.localStorage, JSON.stringify(items));
  }
}

export default new Storage();
