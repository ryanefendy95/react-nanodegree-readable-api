const clone = require('clone');

let db = {};

const defaultData = {
  '34222811-9079-4531-b666-64ffd5e22899': {
    id: '34222811-9079-4531-b666-64ffd5e22899',
    parentId: 'a757624a-a7e1-4739-8960-625c6fca609f',
    timestamp: 1468166872634,
    body: 'Hi there! I am a COMMENT.',
    author: 'thingtwo',
    voteScore: 6,
    deleted: false,
    parentDeleted: false
  },
  '3ac41533-a702-4bb0-941a-5818b966a7dd': {
    id: '3ac41533-a702-4bb0-941a-5818b966a7dd',
    parentId: 'f9bcadab-76bd-4346-92a2-0e78858cb3f9',
    timestamp: 1469479767190,
    body: 'Comments. Are. Cool.',
    author: 'thingone',
    voteScore: -5,
    deleted: false,
    parentDeleted: false
  },
  'b0312bfb-b649-49af-9d3b-9e042c17ba7e': {
    id: 'b0312bfb-b649-49af-9d3b-9e042c17ba7e',
    parentId: 'ee6a6c5c-1821-4280-80b7-90fa97137137',
    timestamp: 1502253745021,
    body: 'this is a comment body1',
    author: 'author1',
    voteScore: -5,
    deleted: false,
    parentDeleted: false
  },
  'be156ef9-40ae-4885-a298-0a9883d34d3a': {
    id: 'be156ef9-40ae-4885-a298-0a9883d34d3a',
    parentId: '4a53fe5f-b387-45ab-bbe9-0418bf65ef19',
    timestamp: 1502253747021,
    body: 'comment01',
    author: 'author01',
    voteScore: 2,
    deleted: false,
    parentDeleted: false
  },

  '09be9fe8-7504-4874-86a7-434b5f2d8499': {
    id: '09be9fe8-7504-4874-86a7-434b5f2d8499',
    parentId: 'ee6a6c5c-1821-4280-80b7-90fa97137137',
    timestamp: 1502153856021,
    body: 'comment02',
    author: 'author02',
    voteScore: 4,
    deleted: false,
    parentDeleted: false
  },
  '017f58f4-c854-4b42-956d-35c5b3e9f05a': {
    id: '017f58f4-c854-4b42-956d-35c5b3e9f05a',
    parentId: 'ee6a6c5c-1821-4280-80b7-90fa97137137',
    timestamp: 1502353856021,
    body: 'comment03',
    author: 'author03',
    voteScore: 6,
    deleted: false,
    parentDeleted: false
  },
  'e9aa30ca-f1dd-4bd9-b869-eb5ffa69fc5b': {
    id: 'e9aa30ca-f1dd-4bd9-b869-eb5ffa69fc5b',
    parentId: 'ee6a6c5c-1821-4280-80b7-90fa97137137',
    timestamp: 1502453967021,
    body: 'comment04',
    author: 'author04',
    voteScore: 8,
    deleted: false,
    parentDeleted: false
  }
};

function getData(token) {
  let data = db[token];
  if (data == null) {
    data = db[token] = clone(defaultData);
  }
  return data;
}

function getByParent(token, parentId) {
  return new Promise(res => {
    let comments = getData(token);
    let keys = Object.keys(comments);
    filtered_keys = keys.filter(
      key => comments[key].parentId === parentId && !comments[key].deleted
    );
    res(filtered_keys.map(key => comments[key]));
  });
}

function get(token, id) {
  return new Promise(res => {
    const comments = getData(token);
    res(comments[id].deleted || comments[id].parentDeleted ? {} : comments[id]);
  });
}

function add(token, comment) {
  return new Promise(res => {
    let comments = getData(token);

    comments[comment.id] = {
      id: comment.id,
      timestamp: comment.timestamp,
      body: comment.body,
      author: comment.author,
      parentId: comment.parentId,
      voteScore: 1,
      deleted: false,
      parentDeleted: false
    };

    res(comments[comment.id]);
  });
}

function vote(token, id, option) {
  return new Promise(res => {
    let comments = getData(token);
    comment = comments[id];
    switch (option) {
      case 'upVote':
        comment.voteScore = comment.voteScore + 1;
        break;
      case 'downVote':
        comment.voteScore = comment.voteScore - 1;
        break;
      default:
        console.log(`comments.vote received incorrect parameter: ${option}`);
    }
    res(comment);
  });
}

function disableByParent(token, post) {
  return new Promise(res => {
    let comments = getData(token);
    keys = Object.keys(comments);
    filtered_keys = keys.filter(key => comments[key].parentId === post.id);
    filtered_keys.forEach(key => (comments[key].parentDeleted = true));
    res(post);
  });
}

function disable(token, id) {
  return new Promise(res => {
    let comments = getData(token);
    comments[id].deleted = true;
    res(comments[id]);
  });
}

function edit(token, id, comment) {
  return new Promise(res => {
    let comments = getData(token);
    for (prop in comment) {
      comments[id][prop] = comment[prop];
    }
    res(comments[id]);
  });
}

module.exports = {
  get,
  getByParent,
  add,
  vote,
  disableByParent,
  disable,
  edit
};
