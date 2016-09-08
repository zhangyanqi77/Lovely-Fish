// 画布
var can1;
var can2;

var ctx1;
var ctx2;

var canWidth;
var canHeight;

//上一帧执行时间
var lastTime;
//间隔时间差
var deltaTime;
//蓝色背景图对象
var bgPic = new Image();
// 海葵、果实、大鱼、小鱼、漂浮物对象
var ane;
var fruit;
var mom;
var baby;
var dust;
var dustPic = [];

//鼠标坐标
var mx;
var my;


var babyTail = [];
var babyEye = [];
var babyBody = [];

var momTail = [];
var momEye = [];
var momBodyOra = [];
var momBodyBlue = [];


var data;

//白色球（特效圈）
var wave;
//黄色球（特效圈）
var halo;

document.body.onload = game;

function game() {
	
	init();
	lastTime = Date.now();
	deltaTime = 0;
	gameloop();
	// drawBackground();
}

//初始化所有，并调用所有对象的init方法）
function init(){
	// 获得canvas
	can1 = document.getElementById("canvas1");//fishes，dust,ui，circle
	ctx1 = can1.getContext("2d");
	can2 = document.getElementById("canvas2");//bacground,ane,fruits
	ctx2 = can2.getContext("2d");

	//can1鼠标事件
	can1.addEventListener('mousemove',onMouseMove,false);

	bgPic.src = "./src/background.jpg";

	canWidth = can1.width;
	canHeight = can1.height;

	// ane继承果实类
	ane = new aneObj();
	ane.init();

	fruit = new fruitObj();
	fruit.init();

	mom = new momObj();
	mom.init();

	baby = new babyObj();
	baby.init();

	mx = canWidth / 2;
	my = canHeight /2;

	

	//小鱼初试化
	for (var i = 0; i < 8; i++) {
		babyTail[i] = new Image();
		babyTail[i].src = "./src/babyTail" + i + ".png";
	}

	for (var i = 0; i < 2; i++) {
		babyEye[i] = new Image();
		babyEye[i].src = "./src/babyEye" + i + ".png";
	}

	for (var i = 0; i < 20; i++) {
		babyBody[i] = new Image();
		babyBody[i].src = "./src/babyFade" + i + ".png";
	}


	//大鱼初试化
	for (var i = 0; i < 8; i++) {
		momTail[i] = new Image();
		momTail[i].src = "./src/bigTail" + i + ".png";
	}
	for (var i = 0; i < 2; i++) {
		momEye[i] = new Image();
		momEye[i].src = "./src/bigEye" + i + ".png";
	}
	for (var i = 0; i < 8; i++) {
		momBodyOra[i] = new Image();
		momBodyBlue[i] = new Image();
		momBodyOra[i].src = "./src/bigSwim" + i + ".png";
		momBodyBlue[i].src = "./src/bigSwimBlue" + i + ".png";

	}

	data = new dataObj();

	//score字体样式
	ctx1.font = "30px Verdana";
	ctx1.textAlign = "center";

	wave = new waveObj();
	wave.init();

	halo = new haloObj();
	halo.init();

	dust = new dustObj();
	dust.init();

	
	for (var i = 0; i < 7; i++) {
		dustPic[i] = new Image();
		dustPic[i].src = "./src/dust" + i + ".png";
	}

}
function gameloop(){
    //该函数要对浏览器适配
    //比setTimeout setInterval 科学 这个是根机器性能有关
	requestAnimFrame(gameloop);
	//刷新获取当前时间
	var now = Date.now();
	// 得到时间差
	deltaTime = now-lastTime;
	// 更新lastTime
	lastTime = now;
	// console.log(deltaTime);
	if (deltaTime  > 40) deltaTime = 40;


	// 绘制蓝色背景、海葵、果实、大鱼的方法
	drawBackground();
	ane.draw();
	fruitMonitor();//出生果实数量、类型的控制方法
	fruit.draw();

	// 清空前一帧的can1内容，在干净画布上绘制
	// ctx1是覆盖在ctx2上面的，除了ctx1上画了东西的部分，其余都是透明的
	ctx1.clearRect(0,0,canWidth,canHeight);
	mom.draw();
	baby.draw();
	momFruitsCollision();
	momBabyCollision();

	data.draw();
	wave.draw();
	halo.draw();
	dust.draw();
	
}

function onMouseMove(e){
	if (!data.gameOver) {
		if(e.offSetX || e.layerX){
			// 把e.offSetX赋值给mx，如果offSetX不存在，就把e.layerX 赋值给mx
			mx = e.offSetX == undefined ? e.layerX : e.offSetX;
			my = e.offSetY == undefined ? e.layerY : e.offSetY;
			// console.log(mx);
		}
	}
}

