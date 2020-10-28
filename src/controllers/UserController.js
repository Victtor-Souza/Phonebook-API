const connection = require('../database/connection')

module.exports = {
    async create(request, response) {
        const { name, family_name, email, password } = request.body;

        const [id] = await connection('USER').insert({
            name,
            family_name,
            email,
            password,
            status_id: 1
        });

        if (!id) {
            return response.status(400).json({ error: "Error when registering user, please try again!" });
        }

        return response.json({ id });

    },

    async list(request, response) {
        const users = await connection('USER').select('*')

        if (!users) {
            return response.json({ message: "No registered users" })
        }

        return response.json(users);
    },

    async update(request, response) {
        const { id } = request.params;
        const { name, family_name, email, password } = request.body;


        const user = await connection('USER')
            .where('id', id)
            .update({
                name,
                family_name,
                email,
                password
            });

        if (user === 0) {
            return response.status(404).json({ error: "User not found!" });
        }

        return response.json({message: "User updated successfully"});
    },

    async delete(request, response) {
        const { id } = request.params;

        const user = await connection('USER')
            .where('id', id)
            .delete();

        if (user === 0) {
            return response.status(404).json({ error: "User not found!" });
        }

        return response.json({message: "User deleted successfully"});

    }
}