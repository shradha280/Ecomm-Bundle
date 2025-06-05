module.exports = (req, res, next) => {
    // Mock seller auth
    const user = { id: 'mockSellerId123', role: 'seller' };
    if (user.role !== 'seller') return res.status(403).send('Unauthorized');
    req.user = user;
    next();
};