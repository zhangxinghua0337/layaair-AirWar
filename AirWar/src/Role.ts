/**
 * 角色类
 */
class Role extends Laya.Sprite {
    private body: Laya.Animation;
    // 判断是否缓存了动画，只让动画缓存一次
    private static cached: boolean = false;
    // 飞机的类型
    public type: string;
    // 阵营
    public camp: number;
    // 飞机的血量
    public hp: number;
    // 敌机的速度 飞机越小速度越快
    public speed: number;
    // 被敌机击中的半径
    public hitRadius: number;

    constructor() {
        super();
        // 初始化
        //this.init();
    }
    public init(_type: string,_camp:number,_hp:number,_speed:number,_hitRadius:number): void {
        this.type = _type;
        this.camp = _camp;
        this.hp = _hp;
        this.speed = _speed;
        this.hitRadius = _hitRadius;
        if(!Role.cached){
            // 缓存飞行动画
            Laya.Animation.createFrames(["war/hero_fly1.png","war/hero_fly2.png"],"hero_fly");
            // 缓存击中爆炸动画
            Laya.Animation.createFrames(["war/hero_down1.png","war/hero_down2.png","war/hero_down3.png","war/hero_down4.png"],"hero_down");
            // 缓存敌机1飞行动画
            Laya.Animation.createFrames(["war/enemy1_fly1.png"],"enemy1_fly");
            // 缓存敌机1爆炸动画
            Laya.Animation.createFrames(["war/enemy1_down1.png","war/enemy1_down2.png","war/enemy1_down3.png","war/enemy1_down4.png"],"enemy1_down");
            // 缓存敌机2飞行动画
            Laya.Animation.createFrames(["war/enemy2_fly1.png"],"enemy2_fly");
            // 缓存敌机2爆炸动画
            Laya.Animation.createFrames(["war/enemy2_down1.png","war/enemy2_down2.png","war/enemy2_down3.png","war/enemy2_down4.png"],"enemy2_down");
            // 缓存敌机2碰撞动画
            Laya.Animation.createFrames(["war/enemy2_hit.png"],"enemy2_hit");
            // 缓存敌机3飞行动画
            Laya.Animation.createFrames(["war/enemy3_fly1.png","war/enemy3_fly2.png"],"enemy3_fly");
            // 缓存敌机3爆炸动画
            Laya.Animation.createFrames(["war/enemy3_down1.png","war/enemy3_down2.png","war/enemy3_down3.png","war/enemy3_down4.png","war/enemy3_down5.png","war/enemy3_down6.png"],"enemy3_down");
            // 缓存敌机3碰撞动画
            Laya.Animation.createFrames(["war/enemy3_hit.png"],"enemy3_hit");
        }
        if(!this.body){
            // 创建飞机机身动画
            this.body = new Laya.Animation();
            this.addChild(this.body);
        }
        // 播放飞机动画
        this.palyAction("fly");
    }
    palyAction(action:string): void {
        // 根据不同的动画类型类播放
        this.body.play(0, true, this.type + "_" + action);
        let bounds: Laya.Rectangle = this.body.getBounds();
        // 设置机身居中
        this.body.pos(-bounds.width / 2 , -bounds.height / 2);
    }
}