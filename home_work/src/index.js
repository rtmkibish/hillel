function map(array, callback) {
  const resultArray = [];

  for(let item of array) {
    const result = callback(item);
    resultArray.push(result);
  }

  return resultArray;
}

function filter(array, callback) {
  const resultArray = [];

  for(let prop of array) {
    const condition = callback(prop);

    if(condition) resultArray.push(prop);
  }

  return resultArray;
}

function getMessagesByDate(notifacations) {
  const messagesByDate = {}

  for(let prop of notifacations) {
    if(messagesByDate.hasOwnProperty(prop.date)) {
      messagesByDate[prop.date].push(prop.msg);
    } else {
      messagesByDate[prop.date] = [];
      messagesByDate[prop.date].push(prop.msg);
    }
  }

  return messagesByDate;
}

module.exports = { map, filter, getMessagesByDate };