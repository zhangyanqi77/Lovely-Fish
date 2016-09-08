var momObj = function() {
	this.x;
	this.y;
	this.angle;

	//尾巴计时器，每隔一段时间换一张尾巴图片
	this.momTailTimer = 0;
	// 尾巴图片序号变量（执行到那一帧）
	this.momTailCount = 0;

	this.momEyeTimer = 0;
	this.momEyeCount = 0;
	this.momEyeInterval = 1000;

	// this.momBodyTimer = 0;
	this.momBodyCount = 0;

}
momObj.prototype.init= function() {
	this.x = canWidth / 2;
	this.y = canHeight /2;
	this.angle = 0;
	
	// this.bigBody.src = "./src/bigSwim0.png";
	
}
momObj.prototype.draw = function(){
	// lerpDistance(aim,cur,radio)
	// aim：目标值
	// cur：当前值
	// radio：百分比(越大趋向越慢)
	//return aim + (cur - aim)*radio;返回趋向目标值？

	//实现大鱼跟随鼠标
	this.x = lerpDistance(mx,this.x,0.97);//使this.x趋向mx
	this.y = lerpDistance(my,this.y,0.97);

	//计算delta angle角度差，要在每一帧去计算
	// Math.atan(y,x) y为大鱼和鼠标的y坐标差
	var deltaY = my - this.y;
	var deltaX = mx - this.x;
	//bata为鼠标和坐标的角度差,大鱼自身角度angle要不断趋向角度差deta
	var beta = Math.atan2(deltaY,deltaX)+Math.PI;

	// 大鱼角度趋向鼠标角度
	// lerpAngle(a,b,t),自带角度调整，自己看
	this.angle = lerpAngle(beta, this.angle, 0.6);
	
	// this.angle角度差，要在每一帧去计算


	//尾巴突破计数工作
	this.momTailTimer += deltaTime;
	if (this.momTailTimer > 50) {
		this.momTailCount = (this.momTailCount + 1) % 8;//范围0~7
		this.momTailTimer %= 50; 
	}

	// mom eye
	this.momEyeTimer += deltaTime;
	if (this.momEyeTimer > this.momEyeInterval) {
		this.momEyeCount = (this.momEyeCount+1)%2;//(范围0~1)
		// 重新设置计时器，对时间间隔取模
		this.momEyeTimer %= this.momEyeInterval;

		if (this.momEyeCount == 0) {
			this.momEyeInterval = Math.random() * 1500 +2000;//2000~3500睁眼时间
		}else{
			this.momEyeInterval = 200;
		}
	}


	//大鱼跟随鼠标，所以以下只符合大鱼，加上save，restore
	ctx1.save();
	//translate到大鱼坐标
	ctx1.translate(this.x,this.y);
	//旋转在translate后面做
	ctx1.rotate(this.angle);

	var momTailCount = this.momTailCount;
	ctx1.drawImage(momTail[momTailCount], -momTail[momTailCount].width / 2+30, -momTail[momTailCount].height/2);

	var momBodyCount = this.momBodyCount;

	if (data.double == 1) {

		ctx1.drawImage(momBodyOra[momBodyCount], -momBodyOra[momBodyCount].width / 2, -momBodyOra[momBodyCount].height/2);
	}
	else{
		ctx1.drawImage(momBodyBlue[momBodyCount], -momBodyBlue[momBodyCount].width / 2, -momBodyBlue[momBodyCount].height/2);
	}
	
	var momEyeCount = this.momEyeCount;
	ctx1.drawImage(momEye[momEyeCount], -momEye[momEyeCount].width / 2, -momEye[momEyeCount].height/2);
	
	ctx1.restore();

}