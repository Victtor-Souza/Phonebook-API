const connection = require('../database/connection')


module.exports = {
    async create(request, response) {

        const { email, password } = request.body;

        const user = await connection('USER')
                    .where({ email: email, password: password })
                    .select('*')
                    .first();

        if (!user) {
            return response.status(400).json({error: "User not found, please verify your credentials!"});
        }

        return response.json(user)
    }





}