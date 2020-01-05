export default class {
    getImages = async () => {
    const res = await fetch('https://boiling-refuge-66454.herokuapp.com/images');
    return await res.json()
  }
  getComments = async (id) => {
    const res = await fetch(`https://boiling-refuge-66454.herokuapp.com/images/${id}`);
    return await res.json();
  }
}