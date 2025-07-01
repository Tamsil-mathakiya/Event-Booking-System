
const bcrypt = require('bcrypt');

const encrypt = async (password) => {
    try {
        const saltRounds = 10; 
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        throw new Error('Error hashing password');
    }
};

const decrypt = async (plainPassword, hashedPassword) => {
    try {
        if (typeof plainPassword !== 'string' || typeof hashedPassword !== 'string') {
            throw new Error('Passwords must be strings');
        }

        const isMatch = await bcrypt.compare(plainPassword.trim(), hashedPassword.trim());

        return isMatch;
    } catch (error) {
        console.error('Error comparing passwords:', error.message);
        throw new Error('Error comparing passwords in decrypt');
    }
};
module.exports = { encrypt, decrypt };
