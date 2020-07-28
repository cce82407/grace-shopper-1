const { Router } = require("express");
const userRouter = Router();
const bcrypt = require("bcrypt");
const chalk = require("chalk");

const { User, Session } = require("../db/models/index");


//
// LOGIN FLOW
//
userRouter.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({
        where: {
            username,
        },
    });
    if (user) {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            console.log(chalk.black(chalk.bgGreen(`${user.username} LOGGED IN`)));

            let userSession;
            userSession = await Session.findByPk(req.session_id);

            if (!userSession) {
                res.clearCookie("session_id");
                const session = await Session.create();

                const oneWeek = 1000 * 60 * 60 * 24 * 7;

                res.cookie("session_id", session.id, {
                    path: "/",
                    expires: new Date(Date.now() + oneWeek),
                });

                req.session_id = session.id;
                userSession = await Session.findByPk(req.session_id);
            }
            await userSession.setUser(user);

            res.sendStatus(200);
        } else {
            res.status(401).send({
                message: "incorrect password",
            });
        }
    } else {
        res.status(401).send({
            message: "incorrect username",
        });
    }
});

userRouter.get("/whoami", (req, res) => {
    if (req.user) {
        res.send({
            username: req.user.username,
            loggedIn: true,
        });
    } else {
        res.send({
            username: null,
            loggedIn: false,
        });
    }
});

userRouter.get("/logout", async (req, res) => {
    try {
        res.clearCookie("session_id");
        res.clearCookie("cart_id");
        console.log(chalk.black(chalk.bgGreen(`${req.user.username} LOGGED OUT`)));
        res.sendStatus(200);
    } catch (e) {
        console.log(e)
        res.status(500).send(e);
    }
});

module.exports = {
    path: '/user',
    router: userRouter
};
