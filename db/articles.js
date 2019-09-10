let theTea = [
  {
    title: "The Ultimate Productivity Hack is Saying No",
    author: "James Clear",
    body:
      "The Power of 'No'. More effort is wasted doing things that don't matter than is wasted doing things inefficiently. And if that is the case, elimination is a more useful skill than optimization. I am reminded of the famous Peter Drucker quote, There is nothing so useless as doing efficiently that which should not be done at all.",
    url: ""
  },
  {
    title: "How Innovative Ideas Arise",
    author: "James Clear",
    body:
      "We are mostly blind to the remarkable interconnectedness of things. This is important to understand because in a complex world it is hard to see which forces are working for you as well as which forces are working against you. Similar to buying a toaster, we tend to focus on the final product and fail to recognize the many processes leading up to it. When you are dealing with a complex problem, it is usually better to build upon what already works. Any idea that is currently working has passed a lot of tests. Old ideas are a secret weapon because they have already managed to survive in a complex world. Iterate, don't originate.",
    url: ""
  },
  {
    title: "Absolute Success is Luck. Relative Success is Hard Work.",
    author: "James Clear",
    body:
      "You can increase your surface area for good luck by taking action.  The forager who explores widely will find lots of useless terrain, but is also more likely to stumble across a bountiful berry patch than the person who stays home. Similarly, the person who works hard, pursues opportunity, and tries more things is more likely to stumble across a lucky break than the person who waits. Gary Player, the famous golfer and winner of nine major championships, has said, “The harder I practice, the luckier I get.”",
    url: ""
  }
];

const getTheTea = () => {
  return theTea;
};

const getUriTitle = () => {
  getTheTea().forEach(e => {
    e.url = encodeURI(e.title);
  });
};

const addToTea = (title, auth, body) => {
  let newStory = {
    title: title,
    author: auth,
    body: body,
    url: ""
  };
  theTea.push(newStory);
  return newStory;
};

const filterTheTea = myId => {
  return theTea.filter(e => {
    return e.title === myId;
  });
};

const filterTheTeaByUrl = myId => {
  return theTea.filter(e => {
    return e.url === myId;
  });
};

const deleteTheTea = myId => {
  let item = filterTheTea(myId);
  let itemIndex = theTea.indexOf(item[0]);
  theTea.splice(itemIndex, 1);
  return;
};

const deleteTheTeaByUrl = myId => {
  let item = filterTheTea(myId);
  let itemIndex = theTea.indexOf(item[3]);
  theTea.splice(itemIndex, 1);
  return;
};

const editTheTea = (myId, title, author, body) => {
  let item = filterTheTea(myId);
  let itemIndex = theTea.indexOf(item[0]);
  theTea[itemIndex].title = title;
  theTea[itemIndex].author = author;
  theTea[itemIndex].body = body;
  return;
};

module.exports = {
  getTheTea,
  addToTea,
  filterTheTea,
  filterTheTeaByUrl,
  deleteTheTea,
  deleteTheTeaByUrl,
  editTheTea,
  getUriTitle
};
