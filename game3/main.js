window.focus();
enchant();
let game, scene;
	Bear = Class.create(Sprite,{
		initialize: function(x,y) {
		Sprite.call(this, 32, 32);
		this.image = game.assets["./assets/images/chara1.png"];
		this.x = x;
		this.y = y;

		this.tx = this.x;
		this.ty = this.y;
		this.speed = 3;
		this.frame = 0;
		game.rootScene.addChild(this);

		},
	});

	Monster = Class.create(Sprite,{
		initialize: function(){
			Sprite.call(this,16,16);
			this.frame = 4;
			this.image = game.assets["./assets/images/icon1.png"];
			this.vx = Math.floor( Math.random()*2 ) ? -1 : 1;
			this.vy = Math.floor( Math.random()*2 ) ? -1 : 1;
			this.speed = 2;
		},
		onenterframe: function(){
			this.update();
		},
		update: function(){
			this.x += this.vx * this.speed;
			this.y += this.vy * this.speed;
			this.control();
		},
		control: function() {
			var left = 0;
			var right = game.width-this.width;
			var top = 0;
			var bottom = game.height-this.height;
			if(this.x < left) {
				this.x = left; this.vx *=-1; this.scaleX *=-1;
			}
			if (this.x > right) {
				this.x = right; this.vx *=-1; this.scaleX *=-1;
			}
			if (this.y < top) {
				this.y = left; this.vy *=-1;
			}
			if (this.y > bottom) {
				this.y =right; this.vy *=-1;
			}
		}
});
	const main = () => {
	game = new Core(320,320);
	game.preload("./assets/images/chara1.png");
	game.preload("./assets/images/icon1.png");
	scene = game.rootScene;
	scene.backgroundColor = 'blue';

	game.on('load', () =>{
		bear = new Bear(100,100);
		game.rootScene.addEventListener('enterframe', function(){
			if(game.input.right){
				bear.x++ ;
			}
			if(game.input.left){
				bear.x--;
			}
			if(game.input.up){
				bear.y--;
			}
			if(game.input.down){
				bear.y++;
			}
			if(game.frame%game.fps ===0){
				monster = new Monster();
				x = Math.random()*(game.width-monster.width);
				y = Math.random()*(game.height-monster.height);
				monster.moveTo(x,y);
				scene.addChild(monster);
			}
			 Bear.intersect(Monster).forEach(function(pair){
			     game.end();
			 });

		})
		//ラベル生成
		var label = new Label();
		label.moveTo(20,20);
		scene.addChild(label);
		//sceneに登録
		scene.onenterframe = function() {
			label.text = "スコア : " + game.frame;
			}




	});

	game.start();
};
window.addEventListener('load',main);
