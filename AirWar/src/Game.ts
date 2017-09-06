/**
 * Game 程序入口类
 */
class Game {
    private hero: Role;
    constructor(){
        // 初始化引擎，这是游戏的宽高
        Laya.init(400,852,Laya.WebGL);
        let bg:BackGround = new BackGround();
        Laya.stage.addChild(bg);
        Laya.loader.load("res/atlas/war.json",Laya.Handler.create(this,this.onLoaded),null,Laya.Loader.ATLAS);
    }
    onLoaded():void {
        this.hero = new Role();
        this.hero.init("hero",0,1,0,30);
        this.hero.pos(200, 500);
        Laya.stage.addChild(this.hero);
        Laya.stage.on(Laya.Event.MOUSE_MOVE,this,this.onMouseMove);


        // 创建敌人
        //this.createEnemy(10);
        // 创建一个主循环
        Laya.timer.frameLoop(1,this,this.onLoop);
    }
    onLoop():void {
        // 遍历舞台上所有的飞机，更改飞机的状态
        for(let i:number = Laya.stage.numChildren-1; i>0; i--){
            let role:Role = Laya.stage.getChildAt(i) as Role;
            if(role && role.speed){
                // 根据飞机速度改变位置
                role.y += role.speed;
                // 敌机移动到显示区域外的话则移除掉
                if(role.y > 1000){
                    role.removeSelf();
                    Laya.Pool.recover("role",role);
                } 
            }
        }
        // 每隔30帧创建新的敌机
        if(Laya.timer.currFrame%60 === 0) {
            this.createEnemy(2);
        }
    }
    onMouseMove(): void {
        // 让飞机根据鼠标的位置来改变
        this.hero.pos(Laya.stage.mouseX, Laya.stage.mouseY);
    }
    // 敌机血量 敌机速度 敌机被击半径
    private hps: Array<number> = [1,2,10];
    private speeds: Array<number> = [3,2,1];
    private radius: Array<number> = [15,30,70];
    createEnemy(num:number):void {
        for(let i:number = 0; i < num; i++){
            // 随机出现敌人的随机数
            let r:number = Math.random();
            //根据随机数，随机敌人
            let type: number = r < 0.7?0:r<0.95?1:2;
            // 创建敌人
            let enemy:Role = Laya.Pool.getItemByClass("role", Role);
            // 初始化敌人
            enemy.init('enemy'+(type+1),1,this.hps[type],this.speeds[type],this.radius[type]);
            // 随机位置
            enemy.pos(Math.random()*400 + 40, Math.random()*200);
            // 添加到舞台上
            Laya.stage.addChild(enemy);
        }
    }
}

// 启动游戏
new Game();