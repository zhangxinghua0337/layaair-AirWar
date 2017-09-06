    /**
     * 循环滚动游戏背景
     */
class BackGround extends Laya.Sprite {
    // 定义背景1
    private bg1:Laya.Sprite;
    private bg2:Laya.Sprite;
    constructor(){
        super();
        this.init();
    }
    init():void{
        // 创建背景1
        this.bg1 = new Laya.Sprite();
        // 加载资源路径
        this.bg1.loadImage("war/background.png");
        // 背景图显示在容器内
        this.addChild(this.bg1);
        // 创建背景2
        this.bg2 = new Laya.Sprite();
        this.bg2.loadImage("war/background.png");
        // 更改背景2的位置 让它放在背景1的上面
        this.bg2.pos(0,-852)
        this.addChild(this.bg2);
        // 创建一个帧循环，更新容器的位置
        Laya.timer.frameLoop(1,this,this.animate);
    }
    animate():void{
        // 背景容器每帧往下移动一像素
        this.y += 1;
        if(this.bg1.y + this.y >= 852){
            this.bg1.y -= 852*2;
        }
        if(this.bg2.y + this.y >= 852){
            this.bg2.y -= 852*2;
        }
    }

}