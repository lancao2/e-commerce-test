const crypto = require('crypto');

const generateKey = () => {
    const bits = crypto.randomBytes(4).readUInt32BE(0)
    const key = bits.toString().slice(0, 5)
    return Number(key)
}

module.exports = generateKey