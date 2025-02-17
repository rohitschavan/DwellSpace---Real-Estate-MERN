import * as config from '../config.js'
import jwt from 'jsonwebtoken'
import { hashPassword, comparePassword } from '../helpers/auth.js'
import User from '../model/auth.js';
import { nanoid } from 'nanoid';
import validator from 'email-validator'


export const welcome = (req, res) => {
    res.send('Hello from controllers')
}


export const register = async (req, res) => {
    try {
        const { email, password } = jwt.verify(req.body.token, config.JWT_SECRET);

        if (!validator.validate(email)) {
            return res.json({ error: "A Valid Email is Required" })
        }

        if (!password) {
            return res.json({ error: "Password is Required" })
        }

        if (password && password?.length < 6) {
            return res.json({ error: "Password should be atleast 6 Character" })
        }


        const existinguser = await User.findOne({ email });
        if (existinguser) {
            return res.json({ error: "Email is already taken" })
        }


        const hashedPassword = await hashPassword(password);

        const user = await new User({
            username: nanoid(6),
            email,
            password: hashedPassword,
        }).save();

        const token = jwt.sign({ _id: user.id }, config.JWT_SECRET, {
            expiresIn: "1h",
        })

        const refreshToken = jwt.sign({ _id: user.id }, config.JWT_SECRET, {
            expiresIn: "7d",
        })

        user.password = undefined;
        user.resetCode = undefined;

        return res.json({
            token,
            refreshToken,
            user
        })
    } catch (err) {
        console.log(err);
        return res.json({ error: 'Something went Wrong' })
    }
}

export const preregister = async (req, res) => {
    try {
        // console.log(req.body)
        const { email, password } = req.body;
        const token = jwt.sign({ email, password }, config.JWT_SECRET, {
            expiresIn: '1h'
        })
        config.AWSSES.sendEmail({
            Source: config.AWS_EMAIL_FROM,
            Destination: {
                ToAddresses: [email],
            },
            Message: {
                Body: {
                    Html: {
                        Charset: "UTF-8",
                        Data: `<html>
                        <h1>Welcome to Realist App</h1>
                        <p>Click the link to activate your account</p>
                        <a href="${config.CLIENT_URL}/auth/account-activate/${token}">Activate your Account</a>
                        
                        </html>`,
                    },
                },
                Subject: {
                    Charset: "UTF-8",
                    Data: "Welcome to Realist"
                },
            },
        }, (err, data) => {
            if (err) {
                console.log(err);
                return res.json({ ok: false })
            } else {
                console.log(data);
                return res.json({ ok: true })
            }
        })
    } catch (err) {
        console.log(err)
        return res.json({ error: 'Something went wrong' })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.json({ error: "Wrong Password" });
        }

        const token = jwt.sign({ _id: user.id }, config.JWT_SECRET, {
            expiresIn: "1h",
        })

        const refreshToken = jwt.sign({ _id: user.id }, config.JWT_SECRET, {
            expiresIn: "7d",
        })



        user.password = undefined;
        user.resetCode = undefined;

        return res.json({
            token,
            refreshToken,
            user
        })



    } catch (err) {
        console.log(err);
        return res.json({ error: "Something went wrong" })
    }
}


export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ error: "User not Found" });
        } else {
            const resetCode = nanoid();
            user.resetCode = resetCode;
            user.save();

            const token = jwt.sign({ resetCode }, config.JWT_SECRET, { expiresIn: "1h" })

            config.AWSSES.sendEmail({
                Source: config.AWS_EMAIL_FROM,
                Destination: {
                    ToAddresses: [email],
                },
                Message: {
                    Body: {
                        Html: {
                            Charset: "UTF-8",
                            Data: `<html>
                            <h1>Welcome to Realist App</h1>
                            <p>Forgot Password..? Click the link below</p>
                            <a href="${config.CLIENT_URL}/auth/access-account/${token}">Re-Activate your Account</a>
                            
                            </html>`,
                        },
                    },
                    Subject: {
                        Charset: "UTF-8",
                        Data: "Access Your Account "
                    },
                },
            }, (err, data) => {
                if (err) {
                    console.log(err);
                    return res.json({ ok: false })
                } else {
                    console.log(data);
                    return res.json({ ok: true })
                }
            })
        }

    } catch (err) {
        console.log(err);
        return res.json({ error: "Something went wrong" })
    }
}



export const accessAccount = async (req, res) => {
    try {


        const { resetCode } = jwt.verify(req.body.resetCode, config.JWT_SECRET);
        const user = await User.findOneAndUpdate({ resetCode }, { resetCode: '' });



        const token = jwt.sign({ _id: user.id }, config.JWT_SECRET, {
            expiresIn: "1h",
        })

        const refreshToken = jwt.sign({ _id: user.id }, config.JWT_SECRET, {
            expiresIn: "7d",
        })



        user.password = undefined;
        user.resetCode = undefined;

        return res.json({
            token,
            refreshToken,
            user
        })





    } catch (err) {
        console.log(err);
        return res.json({ error: "Something went wrong" })
    }
}


export const refreshTokenFunc = async (req, res) => {
    try {
        const { _id } = jwt.verify(req.headers.refresh_token, config.JWT_SECRET);
        const user = await User.findById(_id);
        const token = jwt.sign({ _id: user.id }, config.JWT_SECRET, {
            expiresIn: "1h",
        })

        const refreshToken = jwt.sign({ _id: user.id }, config.JWT_SECRET, {
            expiresIn: "7d",
        })



        user.password = undefined;
        user.resetCode = undefined;

        return res.json({
            token,
            refreshToken,
            user
        })


    } catch (err) {
        console.log(err);
        res.status(403).json({
            error: "Refresh Token Failed"
        })
    }
}


export const currentUserFunc = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        user.password = undefined;
        user.resetCode = undefined;
        res.json(user)
        console.log(user);
    } catch (err) {
        console.log(err);
        res.status(403).json({ error: "Forbidden" });
    }
}

export const getProfileFunc = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        user.password = undefined;
        user.resetCode = undefined;
        res.json(user);
        console.log(user)

    } catch (err) {
        console.log(err);
        res.json({ error: "User not Found" })
    }
}

export const updatePassFunc = async (req, res) => {
    try {
        const { password } = req.body;

        if (!password) {
            res.json({ error: "No Password Provided" });
        }
        if (password && password?.length < 6) {
            res.json({ error: "Password should include at least 6 Characters" })
        }

        const user = await User.findOneAndUpdate(req.user._id, {
            password: hashPassword(password)
        });

        res.json({ ok: true });


    } catch (err) {
        res.json({ error: "Cannot change the password" })
    }
}

export const updateProfileFunc = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.user._id, req.body, { new: true });
        user.password = undefined;
        user.refreshToken = undefinedl
        res.json(user)
    } catch (err) {
        res.json({ error: "Cannot update the user" })
    }
}

