const { isEmail, isLength, trim } = require('validator');
const bcrypt = require('bcrypt');

const validateUserProfile = (input) => {
    const errors = {};

    // Validate username
    if (input.username) {
        const trimmedUsername = trim(input.username);
        if (!isLength(trimmedUsername, { max: 255 })) {
            errors.username = 'Username must be at most 255 characters long';
        }
        input.username = trimmedUsername;
    }

    // Validate password
    if (input.password) {
        input.password = bcrypt.hashSync(input.password, 8);
        if (!isLength(input.password, { max: 255 })) {
            errors.password = 'Password must be at most 255 characters long';
        }
    }

    // Validate email
    if (input.email) {
        const trimmedEmail = trim(input.email);
        if (!isEmail(trimmedEmail) || !isLength(trimmedEmail, { max: 255 })) {
            errors.email = 'Invalid email format or exceeds maximum length (255 characters)';
        }
        input.email = trimmedEmail;
    }

    // Validate firstName
    if (input.firstName && !isLength(input.firstName, { max: 255 })) {
        errors.firstName = 'First name must be at most 255 characters long';
    }

    // Validate lastName
    if (input.lastName && !isLength(input.lastName, { max: 255 })) {
        errors.lastName = 'Last name must be at most 255 characters long';
    }

    if (Object.keys(errors).length > 0) {
        return { success: false, message: 'Validation failed', errors };
    } else {
        return { success: true, message: 'Validation successful', sanitizedInput: input };
    }
};

module.exports = { validateUserProfile };
