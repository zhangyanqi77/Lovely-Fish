var haloObj = function() {
	this.x = [];
	this.y = [];
	// wave球的活性，是否在执行任务，不在的时候可以用
	this.alive = [];
	this.r = [];
}
haloObj.prototype.num = 10;
haloObj.prototype.init = function(){
	for (var i = 0; i < this.num; i++) {
		// 初始都可用
		this.x[i] = 0;
		this.y[i] = 0;
		this.alive[i] = false;
		this.r[i] = 0;
	}
}
haloObj.prototype.draw = function(){
	ctx1.save();
	ctx1.lineWidth = 2;
	ctx1.shadowBlur = 10;
	ctx1.shadowColor ="rgba(203,91,0,1)";

	for (var i = 0; i < this.num; i++) {
		//活着才用画出来，死了不用
		if(this.alive[i]){
			this.r[i] += deltaTime * 0.04; 
			if (this.r[i] > 50) {
				this.alive[i] = false;
				break;
			}
			var alpha = 1 - this.r[i] / 50;		
			ctx1.beginPath();
			ctx1.arc(this.x[i], this.y[i], this.r[i], 0, Math.PI*2);
			ctx1.strokeStyle =  "rgba(203,91,0," + alpha + ")";
			ctx1.stroke();
			ctx1.closePath();
		
		}
	}
	ctx1.restore();
}

haloObj.prototype.born = function(x,y){
	//循环遍历所有wave活性
	for (var i = 0; i < this.num; i++) {
		//若活着，就出生
		if (!this.alive[i]) {
			this.alive[i] = true;
			this.r[i] = 10;
			this.x[i] = x;
			this.y[i] = y;

			//跳出循环，只出生一个（碰撞的时候出生）
			return;
		}
	}
}