namespace SpriteKind {
    export const Coin = SpriteKind.create()
    export const Flower = SpriteKind.create()
    export const Bee = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Coin, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    sprites.destroy(otherSprite)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Kitty.vy == 0) {
        Kitty.vy = -190
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile4`, function (sprite, location) {
    Current_level += 1
    if (Current_level == 2) {
        game.gameOver(true)
    } else {
        Startlevel()
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile2`, function (sprite, location) {
    game.gameOver(false)
    game.setGameOverEffect(false, effects.melt)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Flower, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    Bee = sprites.create(img`
        . . . . . f f f f f . . . . . . 
        . . . . f 9 1 f 9 1 f . . . . . 
        . . . . f 1 1 9 1 1 f . . . . . 
        . . . . f 1 1 f 1 1 f . . . . . 
        . . . . f 1 9 f 9 1 f . . . . . 
        . . . f f f f f f f f f . . . . 
        . . f 5 5 5 5 f 5 5 5 5 f . . . 
        . . f 5 f 5 5 f 5 5 5 5 f . . . 
        . . f 5 5 5 5 5 5 5 5 5 f . . . 
        . . f 5 5 5 5 f 5 5 5 5 f . . . 
        . . . f f f f f f f f f . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Enemy)
    animation.runImageAnimation(
    Bee,
    [img`
        . . . . . f f f f f . . . . . . 
        . . . . f 9 1 f 9 1 f . . . . . 
        . . . . f 1 1 9 1 1 f . . . . . 
        . . . . f 1 1 f 1 1 f . . . . . 
        . . . . f 1 9 f 9 1 f . . . . . 
        . . . f f f f f f f f f . . . . 
        . . f 5 5 5 5 f 5 5 5 5 f . . . 
        . . f 5 f 5 5 f 5 5 5 5 f . . . 
        . . f 5 5 5 5 5 5 5 5 5 f . . . 
        . . f 5 5 5 5 f 5 5 5 5 f . . . 
        . . . f f f f f f f f f . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . f f f f f f f f f . . . . 
        . . f 5 5 5 f 9 1 9 f 5 f . . . 
        . . f 5 f 5 f 1 1 1 f 5 f . . . 
        . . f 5 5 5 f 1 1 1 f 5 f . . . 
        . . f 5 5 5 f 1 1 1 f 5 f . . . 
        . . . f f f f 9 1 1 f f . . . . 
        . . . . f 9 1 f f f . . . . . . 
        . . . . . f f . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `],
    250,
    true
    )
    Bee.setPosition(Kitty.x + 80, Kitty.y - 80)
    Bee.follow(Kitty, 50)
})
function Startlevel () {
    if (Current_level == 0) {
        Kitty.sayText("This is Level 1.")
        tiles.setCurrentTilemap(tilemap`level1`)
    } else if (Current_level == 1) {
        Kitty.sayText("This is Level 2.")
        tiles.setCurrentTilemap(tilemap`level3`)
    } else if (Current_level == 2) {
        Kitty.sayText("This is Level 3.")
        tiles.setCurrentTilemap(tilemap`level7`)
    } else if (Current_level == 3) {
        Kitty.sayText("This is Level 4.")
        tiles.setCurrentTilemap(tilemap`level8`)
    } else if (Current_level == 4) {
        Kitty.sayText("This is the last level, Level 5.")
        tiles.setCurrentTilemap(tilemap`level9`)
    }
    info.setLife(5)
    tiles.placeOnRandomTile(Kitty, assets.tile`myTile7`)
    for (let value of tiles.getTilesByType(assets.tile`myTile7`)) {
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
    Kitty.ay = 200
    scene.cameraFollowSprite(Kitty)
    for (let value of tiles.getTilesByType(assets.tile`myTile5`)) {
        Coin = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . f f f f f f f . . . . 
            . . . f f 5 5 5 5 5 5 5 f f . . 
            . . f 5 5 5 4 4 4 4 4 5 5 5 f . 
            . . f 5 5 5 5 5 5 5 5 5 5 5 f . 
            . f 5 5 5 5 5 5 5 5 5 5 5 5 5 f 
            . f 5 4 5 5 5 5 5 5 5 5 5 5 5 f 
            . f 5 4 5 5 5 5 5 5 5 5 5 5 5 f 
            . f 5 4 5 5 5 5 5 5 5 5 5 5 5 f 
            . f 5 4 5 5 5 5 5 5 5 5 5 4 5 f 
            . f 5 4 5 5 5 5 5 5 5 5 5 4 5 f 
            . f 5 5 5 5 5 5 5 5 5 5 5 4 5 f 
            . . f 5 5 5 5 5 5 5 5 5 5 5 f . 
            . . f 5 5 5 4 4 4 5 5 5 5 5 f . 
            . . . f f 5 5 5 5 5 5 5 f f . . 
            . . . . . f f f f f f f . . . . 
            `, SpriteKind.Coin)
        animation.runImageAnimation(
        Coin,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . f f f f f f f . . . . . 
            . . . f 5 5 5 5 5 5 5 f . . . . 
            . . f 5 4 4 4 4 4 4 4 5 f . . . 
            . f 5 4 5 5 5 5 5 5 5 5 5 f . . 
            . f 5 4 5 5 5 5 5 5 5 4 5 f . . 
            . f 5 4 5 5 5 5 5 5 5 4 5 f . . 
            . f 5 4 5 5 5 5 5 5 5 4 5 f . . 
            . f 5 4 5 5 5 5 5 5 5 5 5 f . . 
            . f 5 4 5 5 5 5 5 5 5 5 5 f . . 
            . f 5 4 5 5 5 5 5 5 5 5 5 f . . 
            . . f 5 4 4 4 5 5 5 5 5 f . . . 
            . . . f 5 5 5 5 5 5 5 f . . . . 
            . . . . f f f f f f f . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . f f f f f f f . . . . . 
            . . . . f 5 5 5 5 5 f . . . . . 
            . . . f 5 4 4 4 4 4 5 f . . . . 
            . . f 5 4 5 5 5 5 5 5 5 f . . . 
            . . f 5 4 5 5 5 5 5 4 5 f . . . 
            . . f 5 4 5 5 5 5 5 4 5 f . . . 
            . . f 5 4 5 5 5 5 5 4 5 f . . . 
            . . f 5 4 5 5 5 5 5 5 5 f . . . 
            . . f 5 4 5 5 5 5 5 5 5 f . . . 
            . . f 5 4 5 5 5 5 5 5 5 f . . . 
            . . . f 5 4 4 5 5 5 5 f . . . . 
            . . . . f 5 5 5 5 5 f . . . . . 
            . . . . f f f f f f f . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . f f f f f . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . f 5 4 4 4 5 f . . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 4 5 5 5 4 5 f . . . . 
            . . . f 5 4 5 5 5 4 5 f . . . . 
            . . . f 5 4 5 5 5 4 5 f . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . f f f f f . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . f f f . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . f 5 4 5 f . . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 4 5 4 5 f . . . . . 
            . . . . f 5 4 5 4 5 f . . . . . 
            . . . . f 5 4 5 4 5 f . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f f f . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . f 5 4 5 f . . . . . . 
            . . . . . f 5 4 5 f . . . . . . 
            . . . . . f 5 4 5 f . . . . . . 
            . . . . . f 5 4 5 f . . . . . . 
            . . . . . f 5 4 5 f . . . . . . 
            . . . . . f 5 4 5 f . . . . . . 
            . . . . . f 5 4 5 f . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . f 5 4 5 f . . . . . . 
            . . . . . f 5 4 5 f . . . . . . 
            . . . . . f 5 4 5 f . . . . . . 
            . . . . . f 5 4 5 f . . . . . . 
            . . . . . f 5 4 5 f . . . . . . 
            . . . . . f 5 4 5 f . . . . . . 
            . . . . . f 5 4 5 f . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . f f f . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . f 5 4 5 f . . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 4 5 4 5 f . . . . . 
            . . . . f 5 4 5 4 5 f . . . . . 
            . . . . f 5 4 5 4 5 f . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f f f . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . f f f f f . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . f 5 4 4 4 5 f . . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 4 5 5 5 4 5 f . . . . 
            . . . f 5 4 5 5 5 4 5 f . . . . 
            . . . f 5 4 5 5 5 4 5 f . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . f f f f f . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . f f f f f f f . . . . . 
            . . . . f 5 5 5 5 5 f . . . . . 
            . . . f 5 4 4 4 4 4 5 f . . . . 
            . . f 5 4 5 5 5 5 5 5 5 f . . . 
            . . f 5 4 5 5 5 5 5 4 5 f . . . 
            . . f 5 4 5 5 5 5 5 4 5 f . . . 
            . . f 5 4 5 5 5 5 5 4 5 f . . . 
            . . f 5 4 5 5 5 5 5 5 5 f . . . 
            . . f 5 4 5 5 5 5 5 5 5 f . . . 
            . . f 5 4 5 5 5 5 5 5 5 f . . . 
            . . . f 5 4 4 5 5 5 5 f . . . . 
            . . . . f 5 5 5 5 5 f . . . . . 
            . . . . f f f f f f f . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `],
        100,
        true
        )
        tiles.placeOnTile(Coin, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile6`)) {
        Flower = sprites.create(img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            . b b d d b b . 
            b 1 1 3 3 1 1 b 
            b 1 3 5 5 3 1 b 
            b 1 3 5 5 3 1 b 
            c 1 1 3 3 1 1 c 
            c 1 1 1 1 1 1 c 
            . c c 7 6 c c . 
            . . . 7 6 . . . 
            . . . 7 8 8 8 6 
            . . . 7 6 7 7 6 
            . . . 7 6 7 6 . 
            . . . 7 8 6 . . 
            `, SpriteKind.Flower)
        tiles.placeOnTile(Flower, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(Bee)
    if (Kitty.y < otherSprite.y) {
        info.changeScoreBy(3)
    } else {
        info.changeLifeBy(-1)
    }
})
let Flower: Sprite = null
let Coin: Sprite = null
let Bee: Sprite = null
let Kitty: Sprite = null
let Current_level = 0
scene.setBackgroundColor(9)
Current_level = 0
Kitty = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . 1 . . . 
    . . . . . . . . . . . . 1 1 1 . 
    . . . . . . . . . . . . 1 1 f 1 
    . . . . . . . . . . . . 1 1 1 1 
    . . . . . . . . . . . . 1 1 1 1 
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 . . 
    . 1 1 1 1 1 1 1 1 1 1 1 1 . . . 
    . 1 1 1 1 1 1 1 1 1 1 1 1 . . . 
    . 1 1 1 1 1 1 1 1 1 1 1 1 . . . 
    . 1 . 1 . . . . . . 1 . 1 . . . 
    . 1 . 1 . . . . . . 1 . 1 . . . 
    . 1 . 1 . . . . . . 1 . 1 . . . 
    . 1 . 1 . . . . . . 1 . 1 . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(Kitty, 100, 0)
Kitty.sayText("Welcome to Platformer!")
pause(2000)
Kitty.sayText("A = jump")
pause(2000)
Kitty.sayText("Use buttons to move")
pause(2000)
Kitty.sayText("Jump on bees that spawn from flowers")
pause(2000)
Kitty.sayText("Collect coins")
pause(2000)
Kitty.sayText("Good luck!")
pause(2000)
Startlevel()
game.onUpdate(function () {
    Kitty.setImage(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . 1 . . . 
        . . . . . . . . . . . . 1 1 1 . 
        . . . . . . . . . . . . 1 1 f 1 
        . . . . . . . . . . . . 1 1 1 1 
        . . . . . . . . . . . . 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 . . 
        . 1 1 1 1 1 1 1 1 1 1 1 1 . . . 
        . 1 1 1 1 1 1 1 1 1 1 1 1 . . . 
        . 1 1 1 1 1 1 1 1 1 1 1 1 . . . 
        . 1 . 1 . . . . . . 1 . 1 . . . 
        . 1 . 1 . . . . . . 1 . 1 . . . 
        . 1 . 1 . . . . . . 1 . 1 . . . 
        . 1 . 1 . . . . . . 1 . 1 . . . 
        . . . . . . . . . . . . . . . . 
        `)
    if (Kitty.vy < 0) {
        Kitty.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . 1 . . . . . 
            . . . . . . . . . . 1 1 1 . . . 
            . . . . . . . . . . 1 1 f 1 . . 
            . . . . . . . . . 1 1 1 1 1 1 . 
            . 1 . . . . . . 1 1 1 1 1 1 1 . 
            1 1 . . . . . 1 1 1 1 . . . . . 
            1 . . . . . 1 1 1 1 1 1 1 1 . . 
            1 . . . . 1 1 1 1 1 . . . . . . 
            1 . . . 1 1 1 1 1 1 1 1 . . . . 
            1 . . 1 1 1 1 1 . . . . . . . . 
            1 1 1 1 1 1 1 . . . . . . . . . 
            . . 1 1 1 1 1 . . . . . . . . . 
            . . . . 1 . 1 . . . . . . . . . 
            . . . 1 1 . 1 . . . . . . . . . 
            . . . 1 . . . . . . . . . . . . 
            `)
    } else if (Kitty.vy > 0) {
        Kitty.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . 1 1 1 . . . . . . . . . . . 
            . . 1 . 1 . . . . . . . . . . . 
            . . 1 . . . . . . . . . . . . . 
            . . 1 1 1 . . . . . . . . . . . 
            . . 1 1 1 1 . . . . . . . . . . 
            . . 1 1 1 1 1 1 . . . . . . . . 
            . . 1 1 1 1 1 1 1 . . . . . . . 
            . . 1 . 1 1 1 1 1 1 1 . . . . . 
            . . 1 . 1 . 1 1 1 1 1 1 1 1 . . 
            . . 1 . 1 . . 1 1 1 1 1 1 f 1 . 
            . . 1 1 1 . . . 1 . 1 1 1 1 1 . 
            . . . 1 1 1 . . 1 . 1 . . . . . 
            . . . . . 1 . . 1 1 1 1 . . . . 
            . . . . . . . . . 1 . 1 . . . . 
            . . . . . . . . . . . . . . . . 
            `)
    }
    if (Kitty.vx < 0) {
        Kitty.image.flipX()
    }
})
