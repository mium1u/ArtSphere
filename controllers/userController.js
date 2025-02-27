import sequelize from "../JS/db.js";
import ApiError from "../JS/error/ApiError.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



const generateJwt = ({ id, username, role }) => {
    console.log(jwt.sign({ id, username, role }, process.env.SECRET_KEY, { expiresIn: "24h" }));
    return jwt.sign({ id, username, role }, process.env.SECRET_KEY, { expiresIn: "24h" });
};





class UserController {


    async registration(req, res, next) {
        const { username, password, country, role } = req.body;
        const userRole = role || "user";

        if (!username || !password) {
            return next(ApiError.badRequest("Не задан username або password"));
        }



        try {
            const existingUser = await sequelize.query(
                `SELECT * FROM users WHERE username = :username`,
                { replacements: { username }, type: sequelize.QueryTypes.SELECT }
            );

            if (existingUser.length) {
                return next(ApiError.badRequest("Користувач з таким username вже існує"));
            }

            const hashPassword = await bcrypt.hash(password, 5);

            const [result] = await sequelize.query(
                `INSERT INTO users (username, password, country, role) VALUES (:username, :password, :country, :role) RETURNING id_user`,
                {
                    replacements: { username, password: hashPassword, country, role: userRole },
                    type: sequelize.QueryTypes.INSERT,
                }
            );

            const userId = result[0] ? result[0].id : null;

            const token = generateJwt({ id: userId, username, role });
            res.status(201).json({ token, message: "Аккаунт успішно зареєстровано." });
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }







    async login(req, res, next) {
        const { username, password } = req.body;

        try {
            const [existingUser] = await sequelize.query(
                `SELECT * FROM users WHERE username = :username`,
                { replacements: { username }, type: sequelize.QueryTypes.SELECT }
            );

            if (!existingUser) {
                return next(ApiError.unauthorized("Такого користувача не існує."));
            }

            const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
            if (!isPasswordMatch) {
                return next(ApiError.unauthorized("Не вірний пароль."));
            }

            const token = generateJwt(existingUser); // Передаем весь объект existingUser

           

            res.status(200).json({ user: existingUser, token });
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }





 

    async check(req, res, next) {
        try {
            const { id, username, role } = req.user;
            console.log({
                user: { id, username, role },
                token: req.headers.authorization.split(" ")[1],
            });
            return res.json({ user: { id, username, role } });
        } catch (error) {
            next(ApiError.unauthorized("Помилка перевірки користувача"));
        }
    }






    async changeRole(req, res, next) {
        const { id, role } = req.body;

        if (!id || !role) {
            return next(ApiError.badRequest("Не задан id або роль"));
        }

        try {
            const [result] = await sequelize.query(
                `UPDATE users SET role = :role WHERE id_user = :id RETURNING *`,
                {
                    replacements: { id, role },
                    type: sequelize.QueryTypes.UPDATE,
                }
            );

            const updatedUser = result[0];
            if (!updatedUser) {
                return next(ApiError.badRequest("Користувача не знайдено."));
            }

            res.json(updatedUser);
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }
}

export const Controller = new UserController();