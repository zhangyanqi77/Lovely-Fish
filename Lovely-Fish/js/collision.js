// 判断大鱼和果实的距离，若小于一定距离，则视为吃掉（碰撞）
function momFruitsCollision(){

	//检测是否游戏结束
	if (!data.gameOver) {
		for (var i = 0; i < fruit.num; i++) {

			//若果实活跃状态
			if(fruit.alive[i]){
				// 判断距离
				//坐标差平方（根据三角形三边关系，也为距离的平方）：calLength2(x1,y1,x2,y2)
				//大鱼小鱼距离皮肤
				var l = calLength2(fruit.x[i],fruit.y[i],mom.x,mom.y);
				if (l<900) {

					//果实被吃]
					fruit.dead(i);

					//大鱼吃到的果实数量++
					data.fruitNum++;

					mom.momBodyCount++;

					if (mom.momBodyCount > 7) {
						mom.momBodyCount = 7;
					}
						
					if (fruit.fruitType[i] == "blue") {
						data.double = 2;
					}
					wave.born(fruit.x[i], fruit.y[i]);

				}

			}
		}
	}

}

//大鱼、小鱼碰撞判断
function momBabyCollision(){

	if (data.fruitNum > 0 && !data.gameOver) {

		var l = calLength2(mom.x, mom.y, baby.x, baby.y);
		if (l<900) {
			//小鱼复原
			baby.babyBodyCount = 0;
			//data归零
			// data.reset();
			//大鱼身体序列帧变为0（白色）
			mom.momBodyCount = 0;
			//分数更新
			data.addScore();

			halo.born(baby.x, baby.y);
		}

	}
	
}