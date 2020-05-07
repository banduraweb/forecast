export const authorize = async (db, req) => {
    const token = req.get('X-CSRF-TOKEN');
    const viewer = await db.users.findOne({
        _id: req.signedCookies.viewer,
        token,
    });

    return viewer;
};
