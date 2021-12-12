(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
  var uniq = require('uniq');
  var uniq = require('uniq');
class MongoClass{
async  main(){
    const url = "mongodb+srv://hen:1234@cluster0.736dm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


     

    const client = new MongoClient(url);
    try{

        await client.connect();
       await updateListingByName(client,"rig 4",{mhs:"21"});
         await findOneListingByName(client, "rig 4");
      //  await createListing(client,{   name: "rig 4",mhs: "22" })

    }catch(e){
        console.log(e);
    }finally{
    await client.close();
    }
}
}
const mon = new MongoClass;
mon.main().catch(console.error);

async function findOneListingByName(client, nameOfListing){
    const res = await client.db("sample_airbnb").collection("listingsAndReviews").findOne({name:nameOfListing});

    if(res){
        console.log(`Found a listing in the collection with the name ${nameOfListing}`);
        console.log(res);

    } else {
        console.log(`No listing found with the name ${nameOfListing}`);
    }

}
async function updateListingByName(client, nameOfListing,updatedListing){
    const res = await client.db("sample_airbnb").collection("listingsAndReviews").updateOne({name:nameOfListing},{$set:updatedListing});
    console.log(`${res.matchedCount} document(s) matched the query criteria`);
    console.log(`${res.modifiedCount} document`)
}

//async function createListing(client ,newListng ){const result =  await client.db("sample_airbnb").collection("listingsAndReviews").insertOne(newListng);console.log(`bew listinh creates with the following id: ${result.insertedId}`);//}
async function listDatabases(client){
    const databaseslist = await client.db().admin().listDatabases();

    console.log("Databases:");
    databaseslist.databases.forEach(db => {
        console.log(`- ${db.name}`);
        
    });

}
},{"uniq":2}],2:[function(require,module,exports){
"use strict"

function unique_pred(list, compare) {
  var ptr = 1
    , len = list.length
    , a=list[0], b=list[0]
  for(var i=1; i<len; ++i) {
    b = a
    a = list[i]
    if(compare(a, b)) {
      if(i === ptr) {
        ptr++
        continue
      }
      list[ptr++] = a
    }
  }
  list.length = ptr
  return list
}

function unique_eq(list) {
  var ptr = 1
    , len = list.length
    , a=list[0], b = list[0]
  for(var i=1; i<len; ++i, b=a) {
    b = a
    a = list[i]
    if(a !== b) {
      if(i === ptr) {
        ptr++
        continue
      }
      list[ptr++] = a
    }
  }
  list.length = ptr
  return list
}

function unique(list, compare, sorted) {
  if(list.length === 0) {
    return list
  }
  if(compare) {
    if(!sorted) {
      list.sort(compare)
    }
    return unique_pred(list, compare)
  }
  if(!sorted) {
    list.sort()
  }
  return unique_eq(list)
}

module.exports = unique

},{}]},{},[1]);
