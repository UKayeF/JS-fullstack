export default class Fetch {
  constructor(path, init = {}) {
    const baseURL = 'http://localhost:5000';
    this.URL = `${baseURL}/${path}`;
    this.init = init;
    this.path = path;
  }

  fetch = async () => {
    try {
      const response = await fetch(this.URL, this.init);
      if (!response.ok) throw Error(`Fetch to ${this.path} unsuccessful!`);
      return await response.json();
    }
    catch (e) {
      console.warn(e);
      return null;
    }
  }
}
