import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            username: user.username,
        },
        process.env.SECRET_KEY,
        { expiresIn: '24h' },
    );
};

export const authorize = async (db, req) => {
    const token = req.get('X-CSRF-TOKEN');
    const viewer = await db.users.findOne({
        _id: req.signedCookies.viewer,
        token,
    });

    return viewer;
};
