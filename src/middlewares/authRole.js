const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user.model'); // Assuming the User model is located in 'models/user.model.js'

exports.protect = catchAsync(async (req, res, next) => {
    // 1) Getting token and checking if it's there
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(
            new ApiError(401, 'You are not logged in! Please log in to get access.')
        );
    }

    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.sub); // Using 'sub' to fetch user ID

    if (!currentUser) {
        return next(
            new ApiError(401, 'The user belonging to this token does no longer exist.')
        );
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    res.locals.user = currentUser;
    next();
});

// Only for rendered pages, no errors!
exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        // roles ['admin', 'lead-guide']. role='user'
        if (!roles.includes(req.user.role)) {
            return next(
                new ApiError(httpStatus.FORBIDDEN, 'You do not have permission to perform this action')
            );
        }
        next();
    };
};
