/**
 * Game 程序入口类
 */
var Game = /** @class */ (function () {
    function Game() {
        // 敌机血量 敌机速度 敌机被击半径
        this.hps = [1, 2, 10];
        this.speeds = [3, 2, 1];
        this.radius = [15, 30, 70];
        // 初始化引擎，这是游戏的宽高
        Laya.init(400, 852, Laya.WebGL);
        var bg = new BackGround();
        Laya.stage.addChild(bg);
        Laya.loader.load("res/atlas/war.json", Laya.Handler.create(this, this.onLoaded), null, Laya.Loader.ATLAS);
    }
    Game.prototype.onLoaded = function () {
        this.hero = new Role();
        this.hero.init("hero", 0, 1, 0, 30);
        this.hero.pos(200, 500);
        Laya.stage.addChild(this.hero);
        Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
        // 创建敌人
        //this.createEnemy(10);
        // 创建一个主循环
        Laya.timer.frameLoop(1, this, this.onLoop);
    };
    Game.prototype.onLoop = function () {
        // 遍历舞台上所有的飞机，更改飞机的状态
        for (var i = Laya.stage.numChildren - 1; i > 0; i--) {
            var role = Laya.stage.getChildAt(i);
            if (role && role.speed) {
                // 根据飞机速度改变位置
                role.y += role.speed;
                // 敌机移动到显示区域外的话则移除掉
                if (role.y > 1000) {
                    role.removeSelf();
                    Laya.Pool.recover("role", role);
                }
            }
        }
        // 每隔30帧创建新的敌机
        if (Laya.timer.currFrame % 60 === 0) {
            this.createEnemy(2);
        }
    };
    Game.prototype.onMouseMove = function () {
        // 让飞机根据鼠标的位置来改变
        this.hero.pos(Laya.stage.mouseX, Laya.stage.mouseY);
    };
    Game.prototype.createEnemy = function (num) {
        for (var i = 0; i < num; i++) {
            // 随机出现敌人的随机数
            var r = Math.random();
            //根据随机数，随机敌人
            var type = r < 0.7 ? 0 : r < 0.95 ? 1 : 2;
            // 创建敌人
            var enemy = Laya.Pool.getItemByClass("role", Role);
            // 初始化敌人
            enemy.init('enemy' + (type + 1), 1, this.hps[type], this.speeds[type], this.radius[type]);
            // 随机位置
            enemy.pos(Math.random() * 400 + 40, Math.random() * 200);
            // 添加到舞台上
            Laya.stage.addChild(enemy);
        }
    };
    return Game;
}());
// 启动游戏
new Game();
//# sourceMappingURL=Game.js.map