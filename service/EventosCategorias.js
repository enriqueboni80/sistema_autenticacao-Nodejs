require('dotenv').config()
const knex = require('knex')
const knexConfigs = require('../knexfile')
const Util = require('../helpers/Util');
const db = knex(knexConfigs[process.env.NODE_ENV])

const TABLE_NAME = 'eventos_categorias'

module.exports = {

    getAll() {
        return db(TABLE_NAME).select('*')
    },
    
}
