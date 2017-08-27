const clone = require('clone');

let db = {};

const defaultData = {
  'a757624a-a7e1-4739-8960-625c6fca609f': {
    id: 'a757624a-a7e1-4739-8960-625c6fca609f',
    timestamp: 1467166872634,
    title: 'Udacity is the best place to learn React',
    body: 'Everyone says so after all.',
    author: 'thingtwo',
    category: 'react',
    voteScore: 6,
    deleted: false
  },
  'f9bcadab-76bd-4346-92a2-0e78858cb3f9': {
    id: 'f9bcadab-76bd-4346-92a2-0e78858cb3f9',
    timestamp: 1468479767190,
    title: 'Learn Redux in 10 minutes!',
    body: 'Just kidding. It takes more than 10 minutes to learn technology.',
    author: 'thingone',
    category: 'redux',
    voteScore: -5,
    deleted: false
  },
  '4a53fe5f-b387-45ab-bbe9-0418bf65ef19': {
    id: '4a53fe5f-b387-45ab-bbe9-0418bf65ef19',
    timestamp: 1502253745021,
    title: 'Learn React Native in 10 minutes!',
    body: 'This is a body',
    author: 'author1',
    category: 'reactNative',
    voteScore: 10,
    deleted: false
  },
  'ee6a6c5c-1821-4280-80b7-90fa97137137': {
    id: 'ee6a6c5c-1821-4280-80b7-90fa97137137',
    timestamp: 1502253747021,
    title: 'this is a title',
    body: 'this is another body',
    author: 'author2',
    category: 'udacity',
    voteScore: 2,
    deleted: false
  }
};

function getData(token) {
  let data = db[token];
  if (data == null) {
    data = db[token] = clone(defaultData);
  }
  return data;
}

function getByCategory(token, category) {
  return new Promise(res => {
    let posts = getData(token);
    let keys = Object.keys(posts);
    let filtered_keys = keys.filter(
      key => posts[key].category === category && !posts[key].deleted
    );
    res(filtered_keys.map(key => posts[key]));
  });
}

function get(token, id) {
  return new Promise(res => {
    const posts = getData(token);
    res(posts[id].deleted ? {} : posts[id]);
  });
}

function getAll(token) {
  return new Promise(res => {
    const posts = getData(token);
    let keys = Object.keys(posts);
    let filtered_keys = keys.filter(key => !posts.deleted);
    res(filtered_keys.map(key => posts[key]));
  });
}

function add(token, post) {
  return new Promise(res => {
    let posts = getData(token);

    posts[post.id] = {
      id: post.id,
      timestamp: post.timestamp,
      title: post.title,
      body: post.body,
      author: post.author,
      category: post.category,
      voteScore: 1,
      deleted: false
    };

    res(posts[post.id]);
  });
}

function vote(token, id, option) {
  return new Promise(res => {
    let posts = getData(token);
    post = posts[id];
    switch (option) {
      case 'upVote':
        post.voteScore = post.voteScore + 1;
        break;
      case 'downVote':
        post.voteScore = post.voteScore - 1;
        break;
      default:
        console.log(`posts.vote received incorrect parameter: ${option}`);
    }
    res(post);
  });
}

function disable(token, id) {
  return new Promise(res => {
    let posts = getData(token);
    posts[id].deleted = true;
    res(posts[id]);
  });
}

function edit(token, id, post) {
  return new Promise(res => {
    let posts = getData(token);
    for (prop in post) {
      posts[id][prop] = post[prop];
    }
    res(posts[id]);
  });
}

module.exports = {
  get,
  getAll,
  getByCategory,
  add,
  vote,
  disable,
  edit,
  getAll
};
