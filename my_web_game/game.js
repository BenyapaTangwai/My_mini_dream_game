const config = {
    type: Phaser.AUTO,
    // ปรับให้ขนาดกว้างยาวเท่ากับหน้าจอเบราว์เซอร์เป๊ะๆ
    width: window.innerWidth, 
    height: window.innerHeight,
    backgroundColor: '#87CEEB', 
    physics: {
        default: 'arcade',
        arcade: { gravity: { y: 0 } }
    },
    render: {
        pixelArt: true // บรรทัดนี้จะสั่งให้เบราว์เซอร์ขยายภาพแบบคมชัด (Nearest Neighbor)
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);
let player;
let cursors;

function preload() {
    this.load.spritesheet('idle_sheet', 'assets/Stray.png', { frameWidth: 160, frameHeight: 160 });
    this.load.spritesheet('walk_l_sheet', 'assets/walk_left.png', { frameWidth: 160, frameHeight: 160 });
    this.load.spritesheet('walk_r_sheet', 'assets/walk_right.png', { frameWidth: 160, frameHeight: 160 });
    this.load.spritesheet('eat_sheet', 'assets/Eat_Coffee.png', { frameWidth: 160, frameHeight: 160 });
}

function create() {
    // 1. วางตำแหน่ง x กลางจอ, y ล่างสุดจอพอดี
    player = this.physics.add.sprite(window.innerWidth / 2, window.innerHeight, 'idle_sheet');
    
    // 2. ปรับจุดยึดมาไว้ที่ "เท้า" (จุดล่างสุดของรูป 160px)
    player.setOrigin(0.5, 1); 

    // 3. ขยายขนาด (ตามความชอบ)
    player.setScale(2); 

    // 4. (ถ้ามีที่ว่างเหลือในรูปเยอะ) ปรับกล่องฟิสิกส์ให้เล็กลง
    // สมมติรูป 160 แต่ตัวละครจริงๆ อยู่แค่ครึ่งบน (80px)
    // เราจะบีบกล่องให้เหลือแค่ส่วนที่มีตัวละคร
    player.body.setSize(160, 80); 
    player.body.setOffset(0, 0); // ปรับเลขตัวหลังจนกว่ากล่องจะครอบตัวพอดี

    // --- Animation เหมือนเดิม ---
    this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('idle_sheet', { start: 0, end: 5 }),
        frameRate: 5,
        repeat: -1
    });

    this.anims.create({
        key: 'walk_l',
        frames: this.anims.generateFrameNumbers('walk_l_sheet', { start: 0, end: 4 }),
        frameRate: 5,
        repeat: -1
    });

    this.anims.create({
        key: 'walk_r',
        frames: this.anims.generateFrameNumbers('walk_r_sheet', { start: 0, end: 4 }),
        frameRate: 5,
        repeat: -1
    });

    this.anims.create({
        key: 'eat',
        frames: this.anims.generateFrameNumbers('eat_sheet', { start: 0, end: 7 }),
        frameRate: 5,
        repeat: 0
    });

    cursors = this.input.keyboard.createCursorKeys();
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
}

function update() {
    player.setVelocity(0);

    if (cursors.left.isDown) {
        player.setVelocityX(-250); // เพิ่มความเร็วหน่อยเพราะตัวใหญ่ขึ้น
        player.anims.play('walk_l', true);
    } 
    else if (cursors.right.isDown) {
        player.setVelocityX(250);
        player.anims.play('walk_r', true);
    } 
    else if (this.spaceKey.isDown) {
        player.anims.play('eat', true);
    } 
    else {
        player.anims.play('idle', true);
    }
}

// เพิ่มฟังก์ชันทำให้เกมปรับขนาดตามหน้าจอเวลาเรายืดหดเบราว์เซอร์
window.addEventListener('resize', () => {
    game.scale.resize(window.innerWidth, window.innerHeight);
    // วาง y ไว้ที่ขอบล่างจอพอดี เพราะจุดยึดเราอยู่ที่เท้าแล้ว
    player.setPosition(window.innerWidth / 2, window.innerHeight); 
});