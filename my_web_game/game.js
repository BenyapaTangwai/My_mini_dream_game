const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#87CEEB', // สีฟ้าอ่อนเหมือนท้องฟ้า
    physics: {
        default: 'arcade',
        arcade: { gravity: { y: 0 } }
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
    // โหลดไฟล์จากโฟลเดอร์ assets ตามชื่อที่คุณตั้งไว้
    // กำหนด frameWidth/Height เป็น 160 ตามที่คุณบอก
    this.load.spritesheet('idle_sheet', 'assets/Stray.png', { frameWidth: 160, frameHeight: 160 });
    this.load.spritesheet('walk_l_sheet', 'assets/walk_left.png', { frameWidth: 160, frameHeight: 160 });
    this.load.spritesheet('walk_r_sheet', 'assets/walk_right.png', { frameWidth: 160, frameHeight: 160 });
    this.load.spritesheet('eat_sheet', 'assets/Eat_Coffee.png', { frameWidth: 160, frameHeight: 160 });
}

function create() {
    // สร้างตัวละครที่กลางจอ
    player = this.physics.add.sprite(400, 300, 'idle_sheet');

    // --- สร้าง Animation ---
    
    // 1. ท่ายืนเฉยๆ
    this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('idle_sheet', { start: 0, end: 5 }), // เล่นเฟรมแรกเฟรมเดียว
        frameRate: 5,
        repeat: -1
    });

    // 2. ท่าเดินซ้าย
    this.anims.create({
        key: 'walk_l',
        frames: this.anims.generateFrameNumbers('walk_l_sheet', { start: 0, end: 4 }), // ปรับ end ตามจำนวนเฟรมจริงที่คุณมี
        frameRate: 5,
        repeat: -1
    });

    // 3. ท่าเดินขวา
    this.anims.create({
        key: 'walk_r',
        frames: this.anims.generateFrameNumbers('walk_r_sheet', { start: 0, end: 4 }),
        frameRate: 5,
        repeat: -1
    });

    // 4. ท่ากินกาแฟ (แบบเอาเข้าปากทั้งถ้วย!)
    this.anims.create({
        key: 'eat',
        frames: this.anims.generateFrameNumbers('eat_sheet', { start: 0, end: 7 }),
        frameRate: 5,
        repeat: 0 // เล่นแค่ครั้งเดียวพอ
    });

    cursors = this.input.keyboard.createCursorKeys();
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
}

function update() {
    player.setVelocity(0);

    if (cursors.left.isDown) {
        player.setVelocityX(-160);
        player.anims.play('walk_l', true);
    } 
    else if (cursors.right.isDown) {
        player.setVelocityX(160);
        player.anims.play('walk_r', true);
    } 
    else if (this.spaceKey.isDown) {
        player.anims.play('eat', true);
    } 
    else {
        player.anims.play('idle', true);
    }
}