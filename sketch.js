/* eslint no-undef: 0 */
/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "setup|draw|preload" }] */

function preload () {}
let vora;
let sites = [];
let polys;
let cols;
function setup () {
  createCanvas(windowWidth, windowHeight);
  sites = d3.range(500).map(function (d) {
    return [d * ((width - 50) / 500) + 1, 200 + random(-30, 30)];
  });
  cols = d3.range(500).map(function (d) {
    return Pallete[
      pickRandomProperty(Pallete)
    ][Math.floor(3 + random(-1, 1))].hex;
  });
  for (i of Pallete) print(i);
  vora = d3.voronoi().extent([[0, 0], [width, height]]);
  polys = vora(sites).polygons();
}
function draw () {
  background(Pallete.neutrals[1].hex);

  if (mouseIsPressed) {
    polys = vora(sites).polygons();
    ellipse(mouseX, mouseY, 30, 30);
    noFill();
    print(pickRandomProperty(Pallete));

    stroke(255);
    for (const [i, v] of polys.entries()) {
      fill(cols[i]);
      let c = d3.polygonCentroid(v);
      ellipse(sites[i][0], sites[i][1], 10, 10);
      sites[i] = c;
      beginShape();

      for (let index = 0; index < v.length; index++) {
        const p = v[index];
        vertex(p[0], p[1]);
      }
      endShape();
    }
  }
  if (frameCount < 3) {
    print(polys);
  }
}
function pickRandomProperty (obj) {
  var result;
  var count = 0;
  for (var prop in obj) if (Math.random() < 1 / ++count) result = prop;
  return result;
}
