const fs = require('fs').promises;
const path='./data/inventors.json';

async function getInventors(){
    const inventors = await fs.readFile(path,'utf-8');
    return JSON.parse(inventors);
}

async function getInventor(id){
    const inventors = await getInventors();
    return inventors.find(inventor => inventor._id == id);
}

async function addInventor(inventor){
    const inventors = await getInventors();
    inventors.sort((a,b)=>a._id - b._id);
    inventor._id = inventors[inventors.length-1]._id +1;
    inventors.push(inventor);

    await fs.writeFile(path, JSON.stringify(inventors,null,' '));
    return inventor;
}

async function updateInventor(inventor){
    const inventors = await getInventors();
    let inventorIndex = inventors.findIndex(i => i._id == inventor._id);

    if(inventor.first){
        inventors[inventorIndex].first = inventor.first;
    }
    if(inventor.last){
        inventors[inventorIndex].last = inventor.last;
    }
    if(inventor.year){
        inventors[inventorIndex].year = inventor.year;
    }

    await fs.writeFile(path, JSON.stringify(inventors,null,' '));

    return inventors[inventorIndex];

}

async function deleteInventor(id){
    const inventors = await getInventors();
    inventors = inventors.filter(inventor => inventor._id !== id);
    await fs.writeFile(path, JSON.stringify(inventors,null,' '));
}

module.exports = {getInventor,getInventors,addInventor,updateInventor,deleteInventor};