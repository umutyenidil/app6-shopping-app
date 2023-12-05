const bcryptjs = require('bcryptjs');

const passwordSalt = 8;

module.exports.cryptPassword = async ({ password }) => {
    const cryptedPassword = await bcryptjs.hash(password, passwordSalt);

    return cryptedPassword;
};

module.exports.compare = async ({ value, hashedValue }) => {
    const result = await bcryptjs.compare(value, hashedValue);

    return result;
}