import { main } from "./mainFile.js";
const i = 21;


import fetch from "node-fetch";
import { ConnectionClosedEvent } from "mongodb";
let id = "";
let ave = 0;
let f = false; 
let fall = false;
const hashRates = [0, 0, 0];
let hashConut = 0;
const hashRateCheck = function () {
  const stam = fetch( // fetch to the pool api
    "https://api.ethermine.org/miner/0xbda1841a530ff346d948fd240bb99ea0692d80e0/workers"
  )
    .then((response) => response.json())
    .then((data) => {
      bdika(data);
  });

  const bdika = async function (data1) {
    const res = await fetch("http://127.0.0.1:4067/config"); //fetch to the t-rex miner
    const data = await res.json();
    const result = data.worker;
    const flagIfRininTheMongoDoc = await main("find",result);
    if (flagIfRininTheMongoDoc == false){
      const flagIfRininTheMongoDoc = await main("create",result);
    }else{
      
      Stam2(result, data1);
    }

  };

   function Stam2(dataTrex, dataPool) {
 

    let i = 0;
    for (const x of dataPool.data) {// loop thet ran on pool data 
      if (x.worker == dataTrex) { //find the name of local rig.
        break;
      }
      i++;
    }
    
    if (hashRates.length == hashConut) hashConut = 0;
    hashRates[hashConut] = dataPool.data[i].reportedHashrate / 1000000; //puts in array The latest monitoring
    if( ave != 0 ){//If there is an average
        if(hashRates[hashConut] < (ave - 1)){//if mhs fall
          fall = true;
          id = hashRates[hashConut]//the number of mh/s now
          main("update",dataTrex,{mhs:id,fall:true});//update the mongo collection

          
        
        }  
    }    
    hashConut++;
    console.log(...hashRates);
    if ( hashConut == 3 ) f = true;
    if (f == true){
      const arrAvg = arr => arr.reduce((a,b) => a + b, 0) / arr.length //calculate the average
      ave = arrAvg(hashRates);
      main("update",dataTrex,{mhs:ave,fall:false});
    }  
  }  
};  

hashRateCheck();
 setInterval(hashRateCheck, 10000);

 function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
} 