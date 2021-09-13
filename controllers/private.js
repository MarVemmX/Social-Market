exports.getPrivateRoute = (req, res, next) => {
    res.status(200).json({
        success: true,
        data: 'Render ra home page',
    });
};
