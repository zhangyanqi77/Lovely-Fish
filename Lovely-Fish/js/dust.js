var dustObj = function() {
	this.x = [];
	this.y = [];
	//振幅
	this.amp = [];
	this.NO = [];
	//三角函数角度
	this.alpha;
}

dustObj.prototype.num = 30;
dustObj.prototype.init = function(){
	for (var i = 0; i < this.num; i++) {
		this.x[i] = Math.random() * canWidth;
		this.y[i] = Math.random() * canHeight;
		this.amp[i]  = 20 + Math.random() * 23;
		this.NO[i] = Math.floor(Math.random() * 7);//[0,7)舍去小数点后位数，所以[0,6]

		}
		//和海葵保持一致
		this.alpha = 0;
}

dustObj.prototype.draw = function(){
	this.alpha +=deltaTime * 0.0008;
	var l = Math.sin(this.alpha);//l是sin的y，它是摆动的（倒过来可以看做左右摆）
	for (var i = 0; i < this.num; i++) {
		var no = this.NO[i];
		ctx1.drawImage(dustPic[no], this.x[i] + this.amp[i]*l, this.y[i]);
	}
}