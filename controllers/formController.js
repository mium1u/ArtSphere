import sequelize from "../JS/db.js";
import imageUpload from "../utils/imageUpload.js";
import ApiError from "../JS/error/ApiError.js";

import jwt from "jsonwebtoken";

class formController {


	async create(req, res, next) {
		const { c_name, c_description, n_category, language, price, link } = req.body;
		const url = link || "none";
		const lang = language || "none";

		const token = req.headers.authorization.split(" ")[1]; // Получение токена из заголовка запроса
		const decoded = jwt.verify(token, process.env.SECRET_KEY); // Декодирование токена
		
		// Получаем username из decoded токена, который был добавлен в req.user в authMiddleware
		const username = req.user.username; // Добавили эту строку для получения имени пользователя
		
		const { img } = req.files;
		
		const query = `
		INSERT INTO form ( username, c_name, c_description, n_category, language, price, date, status, img, link )
		VALUES (:username, :c_name, :c_description, :n_category, :lang, :price, NOW(), 'pending', :fileName, :url)
		RETURNING *;
		`;
		
		try {
			if (!req.files || !req.files.img) {
				return next(ApiError.badRequest("Обов'язкове зображення!"));
			}
			
			const fileName = await imageUpload(req, "img", "form", next);
			if (!fileName) {
				return next(ApiError.badRequest("Помилка при завантаженні зображення!"));
			}
			
			const[result] = await sequelize.query(query, {
				replacements: {
					username,
					c_name,
					c_description,
					n_category,
					lang,
					price,
					fileName,
					url,
				},
				type: sequelize.QueryTypes.INSERT,
			});
			
			res.status(201).json(result[0]);
		} catch (e) {
			next(ApiError.badRequest(e));
		}
	}





	async accept(req, res, next) {
		const { id } = req.params;
		const query = `UPDATE form SET status = 'accepted' WHERE id_form = :id`;
	
		try {
			const [result] = await sequelize.query(query, {
				replacements: { id },
				type: sequelize.QueryTypes.UPDATE,
			});
	
			if (result.affectedRows > 0) {
				res.status(200).json({ message: 'Status updated successfully' });
			} else {
				res.status(404).json({ message: 'Form not found' });
			}
		} catch (e) {
			next(ApiError.badRequest(e));
		}
	}



		async decline(req, res, next) {
		const { id } = req.params;
		const query = `UPDATE form SET status = 'declined' WHERE id_form = :id`;
	
		try {
			const [result] = await sequelize.query(query, {
				replacements: { id },
				type: sequelize.QueryTypes.UPDATE,
			});
	
			if (result.affectedRows > 0) {
				res.status(200).json({ message: 'Status updated to declined' });
			} else {
				res.status(404).json({ message: 'Form not found' });
			}
		} catch (e) {
			next(ApiError.badRequest(e));
		}
	}










async getOne(req, res, next) {
    const { id } = req.params;
    const query = `SELECT * FROM form WHERE id_form = :id`;

    try {
        const [result] = await sequelize.query(query, {
            replacements: { id },
            type: sequelize.QueryTypes.SELECT,
        });

        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: "Такої форми не існує." });
        }
    } catch (e) {
        next(ApiError.badRequest(e));
    }
}




async getAll(req, res, next) {
    const query = `SELECT * FROM form`;

    try {
        const results = await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT,
        });

        if (results.length > 0) {
            res.status(200).json(results);
        } else {
            res.status(404).json({ message: "Форма не знайдена." });
        }
    } catch (e) {
        next(ApiError.badRequest(e));
    }





   }


}

export const Controller = new formController();
