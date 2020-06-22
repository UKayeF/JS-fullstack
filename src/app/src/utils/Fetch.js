export default class Fetch {
  constructor(path, init = {}) {
    const baseURL = 'http://localhost:5000';
    this.URL = `${baseURL}/${path}`;
    this.init = init;
  }

  fetch = async () => {
    try {
      const response = await fetch(this.URL, this.init);
      return await response.json();
    }
    catch (e) {
      console.warn(e);
    }
  }
}
