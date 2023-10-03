module.exports = {
    secret: process.env.JWT_SECRET_KEY,
    expired:process.env.JWT_EXPIRED,
    algorithm:process.env.JWT_ALGORITHM
};
