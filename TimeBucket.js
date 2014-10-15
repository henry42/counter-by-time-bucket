function TimeBucket(range , particle){

    var l = range % particle;

    if(l){
        range += (particle - l);
    }

    var bucket = this.bucket = [];
    this.range = range;
    this.particle = particle;
    this.size= range / particle + 1;

    for(var i = 0 ; i < this.size ; i++ ){
        bucket.push({});
    }

    this._start();

}

TimeBucket.prototype._start = function(){
    this.head = new Date().getTime();
    this.tick = this.head;
};

TimeBucket.prototype.get = function( key , range ){

    if(range == null)
        range = this.range;

    if(range > this.range)
        throw new Error('range must less than ' + this.range);


    var now = new Date().getTime();
    var index = this._getParticleIndex(now);
    var fromIndex = this._getParticleIndex(now - range);
    var count=0;

    for(var i = index , particle; i >= fromIndex && i >= 0 ; i-- ){
        particle = this._getParticle(i);
        if(particle)
            count += particle[key] || 0;
    }

    return count;
};

TimeBucket.prototype.put = function( key , value ){
    var now = new Date().getTime();
    var index = this._getParticleIndex(now);
    var tickIndex = this._getParticleIndex(this.tick);
    for(var i = 0 ; i < index - tickIndex && i < this.size ; i++ ){
        clearObject(this._getParticle(index-i));
    }

    this.tick = now;


    var particle = this._getParticle(index);

    if( particle[key] )
        particle[key] += value;
    else
        particle[key] = value;

};

TimeBucket.prototype._getParticleIndex = function(current){
    return Math.floor(( current - this.head ) / this.particle );
};

TimeBucket.prototype._getParticle = function(index){
    var tickIndex = this._getParticleIndex(this.tick);

    if(index <= tickIndex && index > tickIndex - this.size ){
        return this.bucket[ index % this.size ];
    }
    return null;
};

function clearObject(obj){

    if(!obj)
        return;

    for(var x in obj){
        delete obj[x];
    }
}

module.exports = TimeBucket;