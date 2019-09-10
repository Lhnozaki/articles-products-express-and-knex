let theGoods = [
  { id: 1, name: "Gibson Les Paul", price: 2600, inventory: 10 },
  { id: 2, name: "Fender Telecaster", price: 1600, inventory: 10 },
  { id: 3, name: "Gibson SG", price: 2200, inventory: 15 },
  { id: 4, name: "Fender Jazzmaster", price: 1850, inventory: 20 },
  { id: 5, name: "Gibson ES-3355", price: 3200, inventory: 3 }
];

const getTheGoods = () => {
  return theGoods;
};

const addToGoods = (name, price, inventory) => {
  let id = theGoods.length + 1;
  let newItem = {
    id: parseInt(id),
    name: name,
    price: parseInt(price),
    inventory: parseInt(inventory)
  };
  theGoods.push(newItem);
  return newItem;
};

const filterTheGoods = myId => {
  return theGoods.filter(e => {
    return e.id === parseInt(myId);
  });
};

const deleteTheGoods = myId => {
  let item = filterTheGoods(myId);
  let itemIndex = theGoods.indexOf(item[0]);
  theGoods.splice(itemIndex, 1);
  return;
};

const editTheGoods = (myId, name, price, inventory) => {
  let item = filterTheGoods(myId);
  let itemIndex = theGoods.indexOf(item[0]);
  theGoods[itemIndex].name = name;
  theGoods[itemIndex].price = price;
  theGoods[itemIndex].inventory = inventory;
  return;
};

module.exports = {
  getTheGoods,
  addToGoods,
  filterTheGoods,
  deleteTheGoods,
  editTheGoods
};
