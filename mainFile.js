const mongodb = require('mongodb');
const { ClientEncryption } = require('mongodb-client-encryption');
const { MongoClient } = require('mongodb');

async function main(method,name, value){
    const url = "mongodb+srv://hen:1234@cluster0.736dm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

    const client = new MongoClient(url);
    try{

        await client.connect();
        if (method == "update"){
       await updateListingByName(client,name,value);
        }
        if (method == "find"){
            const o =  await findOneListingByName(client, name);
            return o;
        }
        if (method == "create"){
          const o = await createListing(client,{name:name , mhs:"0", fall: "false"});
          console.log(o);

        }
    }catch(e){
        console.log(e);
    }finally{
    await client.close();
    }
    
    
}
module.exports = {
     main,
};



async function findOneListingByName(client, nameOfListing){
    const res = await client.db("sample_airbnb").collection("listingsAndReviews").findOne({name:nameOfListing});

    if(res){
        return res;

    } else {
        console.log(`No listing found with the name ${nameOfListing}`);
        return false;
    }

}


async function updateListingByName(client, nameOfListing,updatedListing){
    const res = await client.db("sample_airbnb").collection("listingsAndReviews").updateOne({name:nameOfListing},{$set:updatedListing});
    
    
}

async function createListing(client ,newListng ){const result =  await client.db("sample_airbnb").collection("listingsAndReviews").insertOne(newListng);console.log(`bew listinh creates with the following id: ${result.insertedId}`);}
async function listDatabases(client){
    const databaseslist = await client.db().admin().listDatabases();

    console.log("Databases:");
    databaseslist.databases.forEach(db => {
        console.log(`- ${db.name}`);
    });

}