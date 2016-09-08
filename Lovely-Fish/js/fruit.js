var fruitObj = function () {
	// 果实状态，Boolean值，是否活跃（活跃是生长到成熟？不活跃是未出现或漂出屏幕，无任务状态）
	//活跃为true，s死亡为false
	this.alive = [];

	//果实出生横纵坐标
	this.x = [];
	this.y = [];

	//果实的长度
	this.l = [];

	//果实速度
	this.spd = []

	//生长的海葵的ID
	this.aneNO = [];

	//果实类型
	this.fruitType = [];
	// 黄色果实和蓝色果实属性？都是Image类；
	this.orange = new Image();
	this.blue = new Image();
}
//海葵存放在某处的数量？

fruitObj.prototype.num = 30;//果实数量小于海葵数量

//果实初始化
fruitObj.prototype.init = function(){
	for (var i = 0; i < this.num; i++) {
		//将所有果实初始状态设为“死亡”，出生时再设为true
		this.alive[i] = false;

		//初始化果实横纵坐标,初始长度
		this.x[i] = 0;
		this.y[i] = 0;
		this.l[i] = 0;

		this.aneNO[i] = 0;
		//初始化果实速度，使每个果实速度都随机,在0.005-0.015之间
		this.spd[i] = Math.random() * 0.017 + 0.003;//[0.03,0.02)

		//初始化果实出生（在初始的时候就为每个果实找好出生的位置）传参是（）不是[]!;
		//要控制果实数量，所以一开始不能全出生，所以这里born隐藏
		// this.born(i);

		this.fruitType[i] = "" ;

	}
	//加载果实图像资源,初始化的时候图片资源就可以加载进来了
	this.orange.src = "./src/fruit.png";
	this.blue.src = "./src/blue.png";

}

//画果实
fruitObj.prototype.draw = function(){

	for (var i = 0; i < this.num; i++) {
		// var pic;

		//如果果实状态为真true，就执行生长或成熟动作
		if (this.alive[i]) {


				// 判断画哪类果实
				if (this.fruitType[i] == "blue") {
					var pic = this.blue;
				}
				else{
					var pic = this.orange;
				}
		
				//画的过程：找到海葵、生长、成熟漂起
				//if语句限制果实最大长度为14，没有if语句果实会一直变大
				if (this.l[i]<=14) {
				//deltaTime为两帧间时间差
				//（画面刷新重绘的时间差，每绘制一次，长度就增长0.01的时间差倍）
				//使变化过程平滑
					// this.l[i] += 0.01*deltaTime;

					//修改0.01为this.spd[i]，使成熟速度改变.else同
					var NO = this.aneNO[i];
					this.x[i] = ane.headx[NO];
					this.y[i] = ane.heady[NO];
					this.l[i] += this.spd[i]*deltaTime;

					ctx2.drawImage(pic,this.x[i]-this.l[i]/2,this.y[i]-this.l[i]/2,this.l[i],this.l[i]);

					// console.log(this.aneNO[i]);

				}
				//else语句使果实成熟后在canvas上的y值变小，平滑往上升
				else{
					//修改0.06，改变果实上升速度
					// this.y[i] -= 0.06*deltaTime;
					this.y[i] -= this.spd[i] * 6 * deltaTime;

					//可以解决转换页面deltarime太大导致回到页面果实太大问题
					//另外一个方法是gameloop（）内控制deltatime大小
					// this.l[i] = 14;

					ctx2.drawImage(pic,this.x[i]-this.l[i]/2,this.y[i]-this.l[i]/2,this.l[i],this.l[i]);

				}
					// ctx2.drawImage(pic,this.x[i]-this.l[i]/2,this.y[i]-this.l[i]/2,this.l[i],this.l[i]);

				//如果果实快飞出canvas，果实就不做上面的生长和上升动作
				if(this.y[i] < -10){
					this.alive[i] = false;
				}
		}
		
		//果实画在ctx2
		//最后两个参数指绘制l*l大小的图像,要根据果实种类绘制果实，所以隐去，修改
		// ctx2.drawImage(this.orange,this.x[i]-this.l[i]/2,this.y[i]-this.l[i]/2,this.l[i],this.l[i]);
		// pic的定义和draw在同一个方法，同一个作用域链，所以在if内部定义pic，if外的drawImage方法也可以使用pic
		
	}
}

// 随机找海葵
fruitObj.prototype.born = function(i){//i来自果实init方法，找出不成熟果实的sendFruit方法要调用born函数
	//Math.random()*ane.num为0~49；可以理解为海葵编号1~49;（50号海葵当它不育吧。。。）
	//floor是像下取整，毕竟编号肯定是整数的，
	// var aneID =Math.floor(Math.random()*ane.num);
	// console.log("aaa");
	// console.log(aneID);
	this.aneNO[i] = Math.floor(Math.random()*ane.num);

	console.log(this.aneNO[i])

	//把海葵的坐标赋值给果实
	// this.x[i] = ane.headx[aneID];
	// this.y[i] = ane.heady[aneID];


	//出生长度为0（果实漂出画布后长度不为0，重新出生时要重新设为0）
	this.l[i] = 0;
	//未出生果实状态都为false，出生后才为true
	this.alive[i] = true;
	// 产生随机数，根据随机数大小确定出生果实种类
	var ran = Math.random();
	if (ran < 0.25) {
		//出生时设置果实种类:orange,blue
		this.fruitType[i] = "blue";
	}
	else{
		this.fruitType[i] = "orange";
	}
	

}

fruitObj.prototype.dead = function(i){
	this.alive[i] = false;
}


//果实监视功能,计算成熟果实的数量，方便后面的果实生长规则
function fruitMonitor(){
	// 用于计算成熟果实数量
	var num = 0;
	//检测所有的果实状态
	for (var i = 0; i < fruit.num; i++) {
		// 若果实状态alive为true，num++
		if (fruit.alive[i]) num++;
	}
	if (num < 15) {

		//发出果实，让果实出生（执行born方法）
		sendFruit();
		return;
	}
}

//判断所有果实中哪些活跃，哪些“死亡”，将死亡的果实设为出生的方法
function sendFruit(){	
	for (var i = 0; i < fruit.num; i++) {
		// 如果果实alive状态不为true，就让这个果实初始
		if (!fruit.alive[i]) {
			fruit.born(i);
			//出生后循环结束，就只会出生一个果实
			return;
		}
	}
}