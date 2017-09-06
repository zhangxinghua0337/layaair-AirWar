var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 角色类
 */
var Role = /** @class */ (function (_super) {
    __extends(Role, _super);
    function Role() {
        return _super.call(this) || this;
        // 初始化
        //this.init();
    }
    Role.prototype.init = function (_type, _camp, _hp, _speed, _hitRadius) {
        this.type = _type;
        this.camp = _camp;
        this.hp = _hp;
        this.speed = _speed;
        this.hitRadius = _hitRadius;
        if (!Role.cached) {
            // 缓存飞行动画
            Laya.Animation.createFrames(["war/hero_fly1.png", "war/hero_fly2.png"], "hero_fly");
            // 缓存击中爆炸动画
            Laya.Animation.createFrames(["war/hero_down1.png", "war/hero_down2.png", "war/hero_down3.png", "war/hero_down4.png"], "hero_down");
            // 缓存敌机1飞行动画
            Laya.Animation.createFrames(["war/enemy1_fly1.png"], "enemy1_fly");
            // 缓存敌机1爆炸动画
            Laya.Animation.createFrames(["war/enemy1_down1.png", "war/enemy1_down2.png", "war/enemy1_down3.png", "war/enemy1_down4.png"], "enemy1_down");
            // 缓存敌机2飞行动画
            Laya.Animation.createFrames(["war/enemy2_fly1.png"], "enemy2_fly");
            // 缓存敌机2爆炸动画
            Laya.Animation.createFrames(["war/enemy2_down1.png", "war/enemy2_down2.png", "war/enemy2_down3.png", "war/enemy2_down4.png"], "enemy2_down");
            // 缓存敌机2碰撞动画
            Laya.Animation.createFrames(["war/enemy2_hit.png"], "enemy2_hit");
            // 缓存敌机3飞行动画
            Laya.Animation.createFrames(["war/enemy3_fly1.png", "war/enemy3_fly2.png"], "enemy3_fly");
            // 缓存敌机3爆炸动画
            Laya.Animation.createFrames(["war/enemy3_down1.png", "war/enemy3_down2.png", "war/enemy3_down3.png", "war/enemy3_down4.png", "war/enemy3_down5.png", "war/enemy3_down6.png"], "enemy3_down");
            // 缓存敌机3碰撞动画
            Laya.Animation.createFrames(["war/enemy3_hit.png"], "enemy3_hit");
        }
        if (!this.body) {
            // 创建飞机机身动画
            this.body = new Laya.Animation();
            this.addChild(this.body);
        }
        // 播放飞机动画
        this.palyAction("fly");
    };
    Role.prototype.palyAction = function (action) {
        // 根据不同的动画类型类播放
        this.body.play(0, true, this.type + "_" + action);
        var bounds = this.body.getBounds();
        // 设置机身居中
        this.body.pos(-bounds.width / 2, -bounds.height / 2);
    };
    // 判断是否缓存了动画，只让动画缓存一次
    Role.cached = false;
    return Role;
}(Laya.Sprite));
//# sourceMappingURL=Role.js.map