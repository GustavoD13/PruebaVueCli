const { Pool } = require('pg');

const pool = new Pool({
    user: 'loazmzqfnbmvzs',//'postgres', //
    host: 'ec2-54-225-205-79.compute-1.amazonaws.com',//'localhost',//
    password: '79e1cf9dbce8df520515846a132ee233f318d517882b32fdc77bbf0c01ecf3ad',//'postgres123',//
    database: 'd72nad3ptkep8j',//'medicion',//
    port: '5432'
});

const getUsers = async (req, res) => {
    const response = await pool.query('SELECT * from medicion');
     res.status(200).json(response.rows);
};

const getUserById = async (req, res) => {
    const anio = req.params.fecha.substring(3);  
    const mes = req.params.fecha.substring(0,2); 
    const response = await pool.query('SELECT unidad,medidor,anio,mes, consumo, porcentaje, costo FROM medidor, medicion  where medidor.idedificio =1  and medidor.nromedidor = medicion.medidor and anio =$1 and mes = $2', [anio, mes]);
    res.json(response.rows);
};
/*
const createUser = async (req, res) => {
    const { name, email } = req.body;
    const response = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email]);
    res.json({
        message: 'User Added successfully',
        body: {
            user: {name, email}
        }
    })
};

const updateUser = async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;

    const response =await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [
        name,
        email,
        id
    ]);
    res.json('User Updated Successfully');
};

const deleteUser = async (req, res) => {
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM users where id = $1', [
        id
    ]);
    res.json(`User ${id} deleted Successfully`);
};
*/

module.exports = {
    getUsers,
    getUserById/*,
    createUser,
    updateUser,
    deleteUser*/
};