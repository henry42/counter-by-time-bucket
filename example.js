var TimeBucket = require('./TimeBucket');

var timeBucket = new TimeBucket(3000,1000);

setTimeout(function(){
   timeBucket.put('a',2);
   timeBucket.put('a',2);
},100);

setTimeout(function(){
   timeBucket.put('a',2);
},1100);


setTimeout(function(){
   timeBucket.put('a',1);
   console.info(timeBucket.bucket);
},2100);


setTimeout(function(){
   console.info(timeBucket.get('a',3000),'should be 7');
},3100);

setTimeout(function(){
   console.info(timeBucket.get('a',3000),'should be 1');
},5100);