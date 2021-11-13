/* Landon Reekstin, 11/17/2020, Programming Languages, JavaScript
    Brewhaha v1.0
    Project to take the individual pixels from a chosen 2D image and represent that image in 
    a 3D space using the pixels brightness as the z coordinate. The ability to rotate the camera 
    around this 3D image is added. 
*/





let win
let fps = 60
let imgWidth = 0
let imgHeight = 0
let img

// Array of pixels in the img stored as an object for each pixel with the pixel's position x and y and color
let pixelArray = []

class Pixel {
    constructor(posX, posY, brightness, colorR, colorG, colorB) {
        this.pixelCoordinateX = posX
        this.pixelCoordinateY = posY
        this.pixelCoordinateZ = brightness
        this.pixelColorR = colorR
        this.pixelColorG = colorG
        this.pixelColorB = colorB 
    }
}

function preload() {
    img = loadImage('img/tunnel.jpg');
}

function setup() {
    rectMode(CENTER)
    win = { width: 600, height: 600 }

    let canvas = createCanvas(win.width, win.height, WEBGL)
    canvas.parent('sketch-holder')

    frameRate(fps)

    // Sets pixels of img to 2D array
    img.loadPixels()
    for (let x = 0; x < img.width; x++) {
        
        for (let y = 0; y < img.height; y++) {
            let offset = (y * img.width + x) * 4
            // Create an object here for each pixel with 4 parameters x, y, brightness, color
            // and add it to pixelarray
            let brightnessColor = (img.pixels[offset], img.pixels[offset + 1], img.pixels[offset + 2])
            let pixelObj = new Pixel(x, y, brightness(brightnessColor), img.pixels[offset], img.pixels[offset + 1], img.pixels[offset + 2])

            // Adds the new pixel object to the array
            pixelArray.push(pixelObj)
            
        }
        
    }


}

function draw() {
    background(0)

    for (let i = 0; i < pixelArray.length; i++) {
                 
        push()

            translate(pixelArray[i].pixelCoordinateX, pixelArray[i].pixelCoordinateY, pixelArray[i].pixelCoordinateZ)
            stroke(pixelArray[i].pixelColorR, pixelArray[i].pixelColorG, pixelArray[i].pixelColorB)
            fill(pixelArray[i].pixelColorR, pixelArray[i].pixelColorG, pixelArray[i].pixelColorB)
            box(1)
            

        pop()

    }

    orbitControl()

}

// translate() to set x, y , and z position, z being brightness
// fill() for color
// stroke() for creating box
// all of this done before box() in a loop through all our pixels

// pixels[4]