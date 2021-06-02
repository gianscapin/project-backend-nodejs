const connection = require('./connection');
const bcrypt = require('bcryptjs');
const mongodb = require('mongodb');
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function addUser(user){
    const connectiondb = await connection.getConnection();

    user.password = await bcrypt.hash(user.password,8);

    const result = await connectiondb.db('sample_tp2').collection('usuarios').insertOne(user);

    return result;
}

const getUser = async (id) =>{
    const connectiondb = await connection.getConnection();

    const user = await connectiondb.db('sample_tp2').collection('usuarios').findOne({_id:mongodb.ObjetId(id)});

    return user;
}

const findByCredentials = async (email,password) => {
    const connectiondb = await connection.getConnection();

    const user = await connectiondb.db('sample_tp2').collection('usuarios').findOne({email:email});

    if(!user){
        throw new Error('Credenciales no válidas.');
    }
    const userPassword = await bcrypt.compare(password, user.password);
    if(!userPassword){
        throw new Error('Credenciales no válidas.');
    }

    return user;
}

const generateAuthToken = user => {
    const token = jwt.sign({_id:user._id},process.env.SECRET,{expiresIn:'2h'});
    return token;
}

const getAllUsers = async () => {
    const connectiondb = await connection.getConnection();

    const users = await connectiondb.db('sample_tp2').collection('usuarios').find().toArray();

    return users;
}

module.exports = {addUser, getUser, findByCredentials, generateAuthToken, getAllUsers};