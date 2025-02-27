import sequelize from "../JS/db.js";

import ApiError from "../JS/error/ApiError.js";

class contentController {




    

    async getOne(req, res, next) {
        const { id } = req.params;
        const query = `SELECT * FROM content WHERE id_content = :id`;

        try {
            const [result] = await sequelize.query(query, {
                replacements: { id },
                type: sequelize.QueryTypes.SELECT,
            });

            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({ message: "Такого контенту не існує." });
            }
        } catch (e) {
            next(ApiError.badRequest(e));
        }
    }

    async getAll(req, res, next) {
        const query = `SELECT * FROM content`;

        try {
            const results = await sequelize.query(query, {
                type: sequelize.QueryTypes.SELECT,
            });

            if (results.length > 0) {
                res.status(200).json(results);
            } else {
                res.status(404).json({ message: "Контент не знайдено." });
            }
        } catch (e) {
            next(ApiError.badRequest(e));
        }
    }






    async getByUsername(req, res, next) {
        const { username } = req.params;
        const query = `SELECT * FROM content WHERE username = :username`;

        try {
            const results = await sequelize.query(query, {
                replacements: { username },
                type: sequelize.QueryTypes.SELECT,
            });

            if (results.length > 0) {
                res.status(200).json(results);
            } else {
                res.status(404).json({ message: "Контент не знайдено." });
            }
        } catch (e) {
            next(ApiError.badRequest(e));
        }
    }













}
export const Controller = new contentController();