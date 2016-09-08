var babyObj = function(){
	this.x;
	this.y;
	this.angle;
	
	
	//尾巴计时器，每隔一段时间换一张尾巴图片
	this.babyTailTimer = 0;
	// 尾巴图片序号变量（执行到那一帧）
	this.babyTailCount = 0;

	this.babyEyeTimer = 0;
	this.babyEyeCount = 0;
	// 当前眼睛图片需要持续的时间
	this.babyEyeInterval = 1000;

	this.babyBodyTimer = 0;
	this.babyBodyCount = 0;
}
babyObj.prototype.init = function(){
	this.x = canWidth / 2 - 50;
	this.y = canHeight / 2 - 50;

	this.angle = 0;
}
babyObj.prototype.draw = function(){

	//小鱼趋向大鱼坐标
	this.x = lerpDistance(mom.x, this.x, 0.98);
	this.y = lerpDistance(mom.y, this.y, 0.98);

	//小鱼趋向大鱼角度
	var deltaY = mom.y - this.y;
	var deltaX = mom.x - this.x;
	var beta = Math.atan2(deltaY,deltaX)+Math.PI;

	// 大鱼角度趋向鼠标角度
	// lerpAngle(a,b,t),自带角度调整，自己看
	this.angle = lerpAngle(beta, this.angle, 0.6);

	//尾巴突破计数工作
	this.babyTailTimer += deltaTime;
	if (this.babyTailTimer > 50) {
		//不希望超过7，所以对8取模
		this.babyTailCount = (this.babyTailCount + 1) % 8;//范围0~7
		// 重新设置计时器，对其取模
		this.babyTailTimer %= 50; 
	}

	//baby eye
	this.babyEyeTimer += deltaTime;
	if (this.babyEyeTimer > this.babyEyeInterval) {
		this.babyEyeCount = (this.babyEyeCount+1)%2;//(范围0~1)
		// 重新设置计时器，对时间间隔取模
		this.babyEyeTimer %= this.babyEyeInterval;

		if (this.babyEyeCount == 0) {
			this.babyEyeInterval = Math.random() * 1500 +2000;//2000~3500睁眼时间
		}else{
			this.babyEyeInterval = 200;
		}
	}

	//baby body
	this.babyBodyTimer += deltaTime;
	if (this.babyBodyTimer > 300) {
		this.babyBodyCount = this.babyBodyCount + 1;
		this.babyBodyTimer %= 300;
		if (this.babyBodyCount > 19) {
			this.babyBodyCount = 19;
			//game over
			data.gameOver = true;
		}
	}

	ctx1.save();
	ctx1.translate(this.x, this.y);
	ctx1.rotate(this.angle);
	//临时变量
	var babyTailCount = this.babyTailCount;
	ctx1.drawImage(babyTail[babyTailCount], -babyTail[babyTailCount].width / 2 + 23, -babyTail[babyTailCount].height /2);	
	var babyBodyCount = this.babyBodyCount;
	ctx1.drawImage(babyBody[babyBodyCount], -babyBody[babyBodyCount].width / 2, -babyBody[babyBodyCount].height /2);
	var babyEyeCount = this.babyEyeCount;
	ctx1.drawImage(babyEye[babyEyeCount], -babyEye[babyEyeCount].width / 2, -babyEye[babyEyeCount].height /2);
	
	ctx1.restore();

}

