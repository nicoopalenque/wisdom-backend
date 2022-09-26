const bcryptjs = require('bcryptjs');

const encrypt = (password) => {
  const salt = bcryptjs.genSaltSync();
  const passEncrypted = bcryptjs.hashSync( password, salt );
  return passEncrypted;
}

const decrypt = async (password, hash) => {
  return await bcryptjs.compare(password, hash)
}
module.exports = { 
  encrypt,
  decrypt
}