var dataObj = function(){
	//fruitNum * double = 分值
	this.fruitNum = 0; 
	// 是否吃到蓝色果实，吃到后果实翻倍(=2)
	this.double = 1;
	//得分
	this.score = 0;
	//游戏状态
	this.gameOver = false;
	//游戏结束字体透明度
	this.alpha = 0;
}
// dataObj.prototype.reset = function(){
// 	this.fruitNum = 0;
// 	this.double = 1;
// }
dataObj.prototype.draw = function(){
	var w = can1.width;
	var h = can1.height;

	ctx1.save();
	ctx1.fillStyle = "white";
	ctx1.shadowBlur = 10;
	ctx1.shadowColor = "white";

	// ctx1.fillText("num " + this.fruitNum, w / 2, h - 50);
	// ctx1.fillText("double " + this.double, w / 2, h - 80);
	ctx1.fillText("SCORE: " + this.score, w / 2, h - 20);

	
	if (this.gameOver) {
		this.alpha += deltaTime * 0.001;//deltaTime一般在12~13
		if (this.alpha > 1) {
			this.alpha = 1;
		}

		ctx1.fillStyle = "rgba(255,255,255," + this.alpha + ")"
		ctx1.fillText("GAMEOVER ", w / 2, h/2 );

	}
	ctx1.restore();


}
dataObj.prototype.addScore = function(){
	this.score += this.fruitNum *10 *this.double;
	this.fruitNum = 0;
	this.double = 1;
}