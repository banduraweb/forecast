import crypto from 'crypto';
import { Google } from '../../../lib/api';

const cookieOptions = {
    httpOnly: true,
    sameSite: true,
    signed: true,
    secure: process.env.NODE_ENV === 'development' ? false : true,
};

const logInViaGoogle = async (code, token, db, res) => {
    const { user } = await Google.logIn(code);

    if (!user) {
        throw new Error('Google login error');
    }

    const userNamesList = user.names && user.names.length ? user.names : null;
    const userPhotosList =
        user.photos && user.photos.length ? user.photos : null;
    const userEmailsList =
        user.emailAddresses && user.emailAddresses.length
            ? user.emailAddresses
            : null;

    const userName = userNamesList ? userNamesList[0].displayName : null;

    const userId =
        userNamesList &&
        userNamesList[0].metadata &&
        userNamesList[0].metadata.source
            ? userNamesList[0].metadata.source.id
            : null;

    const userAvatar =
        userPhotosList && userPhotosList[0].url ? userPhotosList[0].url : null;

    const userEmail =
        userEmailsList && userEmailsList[0].value
            ? userEmailsList[0].value
            : null;

    if (!userName || !userId || !userAvatar || !userEmail) {
        throw new Error(`Google login error`);
    }

    const updateRes = await db.users.findOneAndUpdate(
        { _id: userId },
        {
            $set: {
                name: userName,
                avatar: userAvatar,
                contact: userEmail,
                token,
            },
        },
        { returnOriginal: false },
    );
    let test = updateRes.value;

    if (!test) {
        const insertResult = await db.users.insertOne({
            _id: userId,
            token,
            name: userName,
            avatar: userAvatar,
            contact: userEmail,
        });
        test = insertResult.ops[0];
    }

    res.cookie('test', userId, {
        ...cookieOptions,
        maxAge: 365 * 24 * 60 * 60 * 1000,
    });
    return test;
};

const logInViaCookies = async (token, db, req, res) => {
    const updateRes = await db.users.findOneAndUpdate(
        { _id: req.signedCookies.test },
        { $set: { token } },
        { returnOriginal: false },
    );

    let test = updateRes.value;

    if (!test) {
        res.clearCookie('test', cookieOptions);
    }

    return test;
};

export const viewerResolvers = {
    Query: {
        authUrl: () => {
            try {
                return Google.authUrl;
            } catch (e) {
                throw new Error(`Failed to query Google Auth Url: ${e}`);
            }
        },
    },
    Mutation: {
        logIn: async (_root, { input }, { db, req, res }) => {
            try {
                const code = input ? input.code : null;
                const token = crypto.randomBytes(16).toString('hex');

                const test = code
                    ? await logInViaGoogle(code, token, db, res)
                    : await logInViaCookies(token, db, req, res);

                if (!test) {
                    return { didRequest: true };
                }

                return {
                    _id: test._id,
                    token: test.token,
                    avatar: test.avatar,
                    didRequest: true,
                };
            } catch (e) {
                throw new Error(`Failed to logIn: ${e}`);
            }
        },
        logOut: (_root, _args, { res }) => {
            try {
                res.clearCookie('test', cookieOptions);
                return { didRequest: true };
            } catch (e) {
                throw new Error(`Failed to logOut: ${e}`);
            }
        },
    },

    Viewer: {
        id: (test) => {
            return test._id;
        },
    },
};
