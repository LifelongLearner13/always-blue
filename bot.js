require('dotenv').config();
const rp = require('request-promise');
const TOKEN = process.env.WAT_API_KEY;
const APPID = process.env.WAT_APP_ID;
const URL = 'https://api.wit.ai';

const createDate = () => {
  const today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth();
  let day = today.getDate();
  if (day < 10) {
    day = `0${day}`;
  }
  if (month < 10) {
    month = `0${month}`;
  }
  return `${year}${month}${day}`;
};

const getMessage = message => {
  const apiendpoint = 'message';
  message = encodeURI(message);
  const endpoint = `${URL}/${apiendpoint}`;
  const v = createDate();
  const options = {
    method: 'GET',
    qs: {
      v,
      q: message,
    },
    uri: endpoint,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
    json: true,
  };
  //return options;
  rp(options)
    .then(data => {
      return extractEntity(data);
    })
    .catch(err => {
      return null;
    });
};

const getEntity = () => {
  const apiendpoint = 'entities';
  const endpoint = `${URL}/${apiendpoint}`;
  const v = createDate();
  const options = {
    method: 'GET',
    qs: {
      v,
    },
    uri: endpoint,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
    json: true,
  };
  rp(options)
    .then(data => {
      return data;
    })
    .catch(err => {
      return null;
    });
  //return options;
};

const extractEntity = object => {
  if ('entities' in object) {
    let entities = object['entities'];
    for (key in entities) {
      let match = entities[key][0];
      let value = match.value;
      return [key, value];
    }
  }
  return null;
};

module.exports = {
  TOKEN,
  extractEntity,
  getMessage,
  getEntity,
  createDate,
};
