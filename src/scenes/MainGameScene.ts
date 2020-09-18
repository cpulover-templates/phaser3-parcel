import { SCENE } from '../constants/KEY'
import Phaser from 'phaser'

export default class MainGameScene extends Phaser.Scene {
    constructor() {
        super(SCENE.LEVEL1)
    }

    preload() {
    }

    create() {
        this.add.text(0, 0, "Loading game...")
    }

    update() {
    }
}