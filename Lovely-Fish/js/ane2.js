var aneObj = function()
{
    this.x = [];
    this.len = [];
}
aneObj.prototype.num =50;
aneObj.prototype.init = function()
{
    for (var i = 0; i < this.num; i++) {
        this.x[i] = i * 16 + Math.random() * 20;//[0,1) 
        this.len[i] = 200 + Math.random() * 50;
    }
}  
aneObj.prototype.draw = function()
{   
    ctx2.save(); 
    ctx2.globalAlbha = 0.6;
    for (var i = 0; i < this.num; i++) {
        //beginPath,moveTo,linTo,stroke,starokeStyle,linewidth,lineCap,globalAlbha
        ctx2.beginPath();
        ctx2.moveTo(this.x[i],canHeight);
        ctx2.lineTo(this.x[i],canHeight - this.len[i]);
        ctx2.lineWidth = 20;
        ctx2.lineCap = "round";
        ctx2.starokeStyle = "#3b154e";
        ctx2.stroke();
    }
    ctx2.restore();
}

//画果实
fruitObj.prototype.draw = function(){

    for (var i = 0; i < this.num; i++) {

        if (this.alive[i]) {

                if (this.fruitType[i] == "blue") {
                    var pic = this.blue;
                }
                else{
                    var pic = this.orange;
                }

                if (this.l[i]<=14) {
                    this.l[i] += this.spd[i]*deltaTime;
                }
                else{
                    this.y[i] -= this.spd[i] * 6 * deltaTime;
                    this.l[i] = 14;
                }
               
                if(this.y[i] < -10){
                    this.alive[i] = false;
                }
        }
        
        // pic的定义和draw在同一个方法，同一个作用域链，所以在if内部定义pic，if外的drawImage方法也可以使用pic
        ctx2.drawImage(pic,this.x[i]-this.l[i]/2,this.y[i]-this.l[i]/2,this.l[i],this.l[i]);
        
    }
}