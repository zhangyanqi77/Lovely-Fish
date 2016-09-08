var waveObj = function() {
	this.x = [];
	this.y = [];
	// wave球的活性，是否在执行任务，不在的时候可以用
	this.alive = [];
	this.r = [];
}

waveObj.prototype.num = 10;
waveObj.prototype.init = function(){
	for (var i = 0; i < this.num; i++) {
		// 初始都可用
		this.alive[i] = false;
		this.r[i] = 0;
	}
}
waveObj.prototype.draw = function(){
	ctx1.save();
	ctx1.lineWidth = 2;
	ctx1.shadowBlur = 10;
	ctx1.shadowColor = "white"

	for (var i = 0; i < this.num; i++) {
		//活着才用画出来，死了不用
		if(this.alive[i]){
			// r随时间增大
			this.r[i] += deltaTime * 0.04; 
			// 当r>100,活性为false
			if (this.r[i] > 50) {
				this.alive[i] = false;
				// 跳出循环，防止alpha为负
				break;
			}

			//wave透明度，与r成反比。当r=100时，alpha=0；
			var alpha = 1 - this.r[i] / 50;		
			ctx1.beginPath();
			ctx1.arc(this.x[i], this.y[i], this.r[i], 0, Math.PI*2);
			ctx1.strokeStyle =  "rgba(255,255,255," + alpha + ")";
			ctx1.stroke();
			ctx1.closePath();
		
		}
	}
	ctx1.restore();
}

waveObj.prototype.born = function(x,y){
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