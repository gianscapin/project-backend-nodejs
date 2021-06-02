const connection = require('./connection');
let objectId = require('mongodb').ObjectId;

const getInventors = async () => {
    const clientMongo = await connection.getConnection();
    const inventors = await clientMongo.db('sample_tp2').collection('inventors').find().toArray();

    return inventors;
}

const getInventor = async (id) => {
    const clientMongo = await connection.getConnection();
    const inventor = await clientMongo.db('sample_tp2').collection('inventors').findOne({_id:new objectId(id)});

    return inventor;
}

const addInventor = async (inventor) => {
    const clientMongo = await connection.getConnection();
    const result = await clientMongo.db('sample_tp2').collection('inventors').insertOne(inventor);

    return result;
}

const updateInventor = async (inventor) =>{
    const clientMongo = await connection.getConnection();
    const query = {_id: new objectId(inventor._id)};
    const newValues = {
        $set:{
            first:inventor.first,
            last:inventor.last,
            year:inventor.year
        }
    };

    const result = await clientMongo.db('sample_tp2').collection('inventors').updateOne(query,newValues);
    return result;
}

const deleteInventor = async (id) => {
    const clientMongo = await connection.getConnection();
    const result = await clientMongo.db('sample_tp2').collection('inventors').deleteOne({_id:new ObjectId(id)});

    return result;
}

module.exports = {getInventors,getInventor,addInventor, updateInventor, deleteInventor};