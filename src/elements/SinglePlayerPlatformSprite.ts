import Phaser from 'phaser'
import { ANIM, TEXTURE } from '../constants/KEY'
import { PLAYER } from '../constants/ELEMENT'

export default class Player extends Phaser.Physics.Arcade.Sprite {
    private _scene?: Phaser.Scene
    private _cursor?: Phaser.Types.Input.Keyboard.CursorKeys

    constructor(scene: Phaser.Scene) {
        super(scene, PLAYER.START_X, PLAYER.START_Y, TEXTURE.PLAYER)
        this._scene = scene

        scene.add.existing(this)

        // physic
        scene.physics.world.enable(this)
        this.setBounce(PLAYER.BOUNCE)
        this.setCollideWorldBounds(true)
        // control 
        this._cursor = scene.input.keyboard.createCursorKeys()
        // animations
        this.createAnimations(TEXTURE.PLAYER)
    }

    control() {
        if (this._cursor?.left?.isDown) {  // left
            this.setVelocityX(-PLAYER.SPEED_X)
            this.anims.play(ANIM.PLAYER_TO_LEFT, true)   
        } else if (this._cursor?.right?.isDown) { // right
            this.setVelocityX(PLAYER.SPEED_X)
            this.anims.play(ANIM.PLAYER_TO_RIGHT, true)
        } else { // idle
            this.setVelocityX(0)
            this.anims.play(ANIM.PLAYER_IDLE)
        } 
        if (this._cursor?.up?.isDown && this.body.touching.down) { // jump
            this.setVelocityY(-PLAYER.SPEED_Y)
            this.anims.play(ANIM.PLAYER_JUMP, true)
        }
    }

    createAnimations(playerTexture: string) {
        this._scene?.anims.create({
            key: ANIM.PLAYER_TO_LEFT,
            frames: this._scene?.anims.generateFrameNames(playerTexture, {
                prefix: '',
                start: 0,
                end: 3
            }),
            frameRate: 10,
            repeat: -1 // loop infinitely
        })
   
        this._scene?.anims.create({
            key: ANIM.PLAYER_TO_RIGHT,
            frames: this._scene?.anims.generateFrameNames(playerTexture, {
                prefix: '',
                start: 5,
                end: 8
            }),
            frameRate: 10,
            repeat: -1
        })

        this._scene?.anims.create({
            key: ANIM.PLAYER_JUMP,
            frames: [{
                key: playerTexture,
                frame: 4
            }],
            frameRate: 10
        })

        this._scene?.anims.create({
            key: ANIM.PLAYER_IDLE,
            frames: [{
                key: playerTexture,
                frame: 4
            }],
            frameRate: 10
        })
    }
}