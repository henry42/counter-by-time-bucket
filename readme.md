Counter By Time Bucket
==========

A simple counter base time, is used to get counts in recent time period.

##Install:

    npm install counter-by-time-bucket

##Usage:
Example:

    var TimeBucket = require('counter-by-time-bucket');

    var timeBucket = new TimeBucket(3000,1000);


    //add a to 4 in 100ms
    setTimeout(function(){
       timeBucket.put('a',2);
       timeBucket.put('a',2);
    },100);

    //add a to 6 in 1100ms
    setTimeout(function(){
       timeBucket.put('a',2);
    },1100);

    //add a to 7 in 2100ms
    setTimeout(function(){
       timeBucket.put('a',1);
    },2100);

    /*
    +-----+   +-----+   +-----+ 
    |     |   |     |   |     | 
    |  4  |   |  2  |   |  1  | 
    |     |   |     |   |     | 
    +-----+   +-----+   +-----+ 
    0       1s        2s      3s
    */

    //get last 3s a's count after 3100ms
    setTimeout(function(){
       console.info(timeBucket.get('a',3000),'should be 7');
    },3100);


    //get last 3s a's count after 5100ms
    setTimeout(function(){
       console.info(timeBucket.get('a',3000),'should be 1');
    },5100);

###new TimeBucket( totalSize , bucketSize )

returns `timeBucket` object, you must assign totalSize and bucketSize (millisecond).

###timeBucket.put( key , value )

add `value` right now, `value` must be a number.

###timeBucket.get( key , span )

returns the `key` count in last `span` millisecond. It will throw error if `span` is larger than totalSize.