const { v4: uuidv4 } = require("uuid");

const isValidEmail = (email) => {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (regex.exec(email)) {
    return true;
  } else {
    return false;
  }
};

const isValidPostcode = (postcode) => {
  const regex = /^[a-z]{1,2}\d[a-z\d]?\s*\d[a-z]{2}$/i;

  if (regex.exec(postcode)) {
    return true;
  } else {
    return false;
  }
};

const getNewId = () => {
  return uuidv4();
};

module.exports = {
  getNewId,
  isValidEmail,
  isValidPostcode,
};
