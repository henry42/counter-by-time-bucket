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
    this.head = this.now();
};

TimeBucket.prototype.get = function( key , range ){

    if(range == null)
        range = this.range;

    if(range > this.range)
        throw new Error('range must less than ' + this.range);

    var now = this.now();
    var index = this._getParticleIndex(now);
    var fromIndex = this._getParticleIndex(now - range);
    var count=0;

    for(var i = index , particle; i >= fromIndex && i >= 0 ; i-- ){
        particle = this._getParticle(i);
        if(particle)
            count += particle.data[key] || 0;
    }

    return count;
};

TimeBucket.prototype.now = function(){
  return new Date().getTime();
};

TimeBucket.prototype.put = function( key , value ){

    var now = this.now();
    var index = this._getParticleIndex(now);
    var particle = this._getParticle(index);

    if( particle.data[key] )
        particle.data[key] += value;
    else
        particle.data[key] = value;

};

TimeBucket.prototype._getParticleIndex = function(current){
    return Math.floor(( current - this.head ) / this.particle );
};

TimeBucket.prototype._getParticle = function(index){
    var particle = this.bucket[ index % this.size ];
    if(particle.index !== index){
      particle.index = index;
      particle.data = {};
    }
    return particle;
};


module.exports = TimeBucket;
