/* eslint no-undef: 0 */
/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "setup|draw|preload" }] */

function preload () {}

function setup () {
  createCanvas(windowWidth, windowHeight);
}
function draw () {
  background(Pallete.neutrals[1].hex);
  if (mouseIsPressed) {
    ellipse(mouseX, mouseY, 30, 30);
  }
}
