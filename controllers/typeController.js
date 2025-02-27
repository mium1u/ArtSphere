import sequelize from "../JS/db.js";
import ApiError from "../JS/error/ApiError.js";




class typeController {
    async create(req, res, next) {
       const { n_category } =
       req.body;
   
       const query = `
       INSERT INTO category ( n_category )
       VALUES (:n_category )
       RETURNING *;
       `;
   
       try {
           const[result] = await sequelize.query(query, {
           replacements: {
              n_category,
           },
           type: sequelize.QueryTypes.INSERT,
       });
   
           res.status(201).json(result[0]);
       } catch (e) {
           next(ApiError.badRequest(e));
       }
   }





   async getOne(req, res, next) {
    const { id } = req.params;
    const query = `SELECT * FROM category WHERE id_category = :id`;

    try {
        const [result] = await sequelize.query(query, {
            replacements: { id },
            type: sequelize.QueryTypes.SELECT,
        });

        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: "Такої категорії не існує." });
        }
    } catch (e) {
        next(ApiError.badRequest(e));
    }
}

async getAll(req, res, next) {
    const query = `SELECT * FROM category`;

    try {
        const results = await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT,
        });

        if (results.length > 0) {
            res.status(200).json(results);
        } else {
            res.status(404).json({ message: "Категорія не знайдена." });
        }
    } catch (e) {
        next(ApiError.badRequest(e));
    }
}





   }
   


   export const Controller = new typeController();