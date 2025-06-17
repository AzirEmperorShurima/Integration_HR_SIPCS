import { StatusCodes } from "http-status-codes";
import CryptoJS from 'crypto-js';
import jwt from "jsonwebtoken"
const secretKey = "CHOTIME_TOKEN"
const UserSecretKey = "a3f71694c3b24b5e9980869b6f767265"
const encrypt = async (message, key) => {
    const cipherText = CryptoJS.AES.encrypt(message, key).toString();
    console.log(cipherText)
    return cipherText;
}

const decrypt = async (cipherText, key) => {
    const bytes = CryptoJS.AES.decrypt(cipherText, key);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
}
export const checkEndableUser = async (id) => {

}
export const createNewUser = async (req, res) => {
    const { userName, passWord } = req.body;
    const username = await encrypt(userName, UserSecretKey)
    const password = await encrypt(passWord, UserSecretKey)
    getCookies(req, res)
}

export const getCookies = async (req, res) => {
    const { userName, passWord } = req.body;
    console.log(userName, passWord)
    if (userName && passWord) {
        try {
            const token = jwt.sign({ userName }, secretKey, { expiresIn: '1h' })
            await res.cookie('token', token, { maxAge: 60 * 60 * 1000, httpOnly: true, secure: true })
            return res.status(StatusCodes.OK).send({ message: 'Login successful', cookies: req.cookies });
        } catch (error) {
            console.log(error);
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid credentials' });
        }
    } else {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid Data post' });
    }

};
export const Authentication = (req, res, next) => {
    const token = req.cookies.token
    console.log('TOKEN : ' + token)
    if (token) {
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                return res.status(StatusCodes.FORBIDDEN).json({ message: 'Forbidden' });
            }
            req.user = user;
            next();
        })
    } else {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized' });
    }
}
export const endSession = (req, res) => {
    res.clearCookies('token');
    return res.status(StatusCodes.OK).json({ message: 'Logout Successfully' })
}

// export const Authorization = (req, res) => {

// }