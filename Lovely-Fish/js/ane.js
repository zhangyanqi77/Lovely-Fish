// 海葵对象类
var aneObj = function(){
	// 海葵x坐标（底坐标，起始点）
	this.rootx = [];
	//海葵长度（y值）
	// this.len = [];
	//起始点（就是画布的高，已知，不用定义）
	// 控制点（在起始点正上方的一段距离，也不用定义）
	// 结束点(海葵头部x,y坐标)当它移动到中间，headx和rootx相同
	//海葵高不同，y也要不同
	this.headx = [];
	this.heady = [];
	//正弦函数的角度
	this.alpha = 0;
	//振幅，每个海葵摆动幅度不一样
	this.amp = [];
	//
	

}
// 海葵数量
// 使用 prototype 属性来向对象添加属性(给海葵添加num属性)
aneObj.prototype.num = 50;

// 海葵初始化
aneObj.prototype.init = function(){
	// 设置海葵随机位置
	for (var i = 0; i < this.num; i++) {
		//海葵起始点，i*16调间距
		this.rootx[i] = i * 16 + Math.random() * 20;//[0,1) 
		this.headx[i] = this.rootx[i];
		this.heady[i] = canHeight - 240 + Math.random() * 50;
		// this.len[i] = 200 + Math.random() * 50;
		this.amp[i] = Math.random() * 50 + 50;
	}
	// console.log("a");

}

// 画海葵，从下到上
aneObj.prototype.draw = function(){
	//角度随时间变化
	this.alpha += deltaTime * 0.0008;
	//l是正弦的y；正弦的x是this.alpha(画正弦函数图)//l : -1 ~ 1
	var l = Math.sin(this.alpha);
	//所有海葵共同特性放在循环外面，这些代码就不用一直循环了
	//globalAlpha给物体一个透明度
	ctx2.globalAlpha = 0.6;
	ctx2.lineWidth = 20;
	ctx2.lineCap = "round"
	// ctx2.strokeStyle = "#3b154e";
	ctx2.strokeStyle = "green";
	// 绘制所有海葵，需要循环
	for (var i = 0; i < this.num; i++) {		
		ctx2.beginPath();
		//画笔到达起始点，从下往上画，所以y坐标是画布高度，到达画布最下面
		ctx2.moveTo(this.rootx[i],canHeight);
		this.headx[i] = this.rootx[i] + l * this.amp[i];
		// ctx2.lineTo(this.rootx[i],canHeight - this.len[i]);
		ctx2.quadraticCurveTo(this.rootx[i], canHeight - 100, this.headx[i], this.heady[i]);
		ctx2.stroke();
		// ctx2.closePath();
	}

	ctx2.restore();

}
