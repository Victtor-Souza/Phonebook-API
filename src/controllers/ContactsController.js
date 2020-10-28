const connection = require('../database/connection');
const fs = require('fs');
const path = require('path');
const { response } = require('express');

module.exports = {
    async create(request, response) {

        const { user_id } = request.headers;
        const { name, family_name, telephone, celphone, email, detail, contact_type } = request.body;

        const { filename } = request.file;

        const [id] = await connection('CONTACT').insert({
            user_id,
            name,
            family_name,
            telephone,
            celphone,
            email,
            detail,
            avatar: filename,
            contact_type,
            status_id: 1
        })

        if (!id) {
            return response.status(400).json({ error: "Error when registering contact, please try again!" })
        }

        return response.json({ id })
    },

    async list(request, response) {
        const contacts = await connection('CONTACT').select('*');

        return response.json(contacts);
    },

    async update(request, response) {

        const { id } = request.params;

        const { name, family_name, telephone, celphone, email, detail, contact_type } = request.body;

        const { filename } = request.file;

        const contact = await connection('CONTACT')
            .where('id', id)
            .update({
                name,
                family_name,
                telephone,
                celphone,
                email,
                detail,
                avatar: filename,
                contact_type,
            })

        if (contact === 0) {
            return response.status(400).json({ error: "Contact not found, please try again!" })
        }

        return response.json({ contact })
    },

    async delete(request, response) {
        const { id } = request.params;

        const contact = await connection('CONTACT').where('id', id).select('avatar').first();

        if (!contact) {
            return response.status(404).json({ error: "Contact not found!" });
        }

        const deletedContact = await connection('CONTACT')
        .where('id', id)
        .delete();

        fs.unlink(path.resolve(__dirname, '..', '..', 'uploads', contact.avatar), () => {
            console.log(`imagem ${contact.avatar} excluído de uploads`)
        })

    if (contact == 0) {
        return response.status(400).json({ error: "Error while trying to delete this contact, please try again!" });
    }

    return response.json({message: "Contact deleted successfully"});

    },

    async getById(request, response) {
        const { id } = request.params;
        
        const contact = await connection('CONTACT').where('id', id).select().first();

        if (!contact) {
            return response.status(404).json({error: "Contact not found!"});
        }

        return response.json(contact);
    }


}