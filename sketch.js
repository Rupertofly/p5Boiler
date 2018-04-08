// @ts-check
/* eslint no-undef: 0 */
/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "setup|draw|preload" }] */
function preload () {}
let sites;
let vor;
let pols;
let cols;
let num = 500;
var recorder;
let recCanvas;
function setup () {
  recorder = new CCapture({ format: 'webm', framerate: 30, verbose: true });
  createCanvas(1280, 720);
  colorMode(HSB, 100, 100, 100);
  recCanvas = document.getElementById('defaultCanvas0');
  recorder.start();
  sites = d3.range(num).map(function (d) {
    return [(width - width / 6) / num * d + width / 12, height / 2];
  });
  cols = d3.range(num).map(function (d) {
    let s = random(90, 100);
    let b = 10;
    return color(d / num * 100, s - random(20, 50), b + random(40, 80));
  });
  vor = d3.voronoi().size([width, height]);
}
function draw () {
  strokeWeight(3);
  stroke(Pallete.neutrals[1].hex);
  background(Pallete.neutrals[1].hex);
  pols = vor.polygons(sites);
  for (let [i, v] of pols.entries()) {
    fill(cols[i]);
    beginShape();
    for (const p of v) {
      vertex(p[0], p[1]);
    }
    endShape(CLOSE);
    let c = d3.polygonCentroid(v);
    let pv = createVector(c[0], c[1]);
    pv.sub(sites[i][0], sites[i][1]);
    pv.y += height / 4 * sineDisplacement(frameCount + i * 6);
    pv.x += width / 4 * cosineDisplacement(frameCount + i * 6);
    pv = pv.limit(1);
    pv.add(sites[i][0], sites[i][1]);
    sites[i] = [pv.x, pv.y];
  }

  if (mouseIsPressed) {
    // ellipse(mouseX, mouseY, 30, 30);
  }
  updateSites();
  if (frameCount <= 600) {
    recorder.capture(recCanvas);
  }
  if (frameCount === 601) {
    recorder.capture(recCanvas);
    recorder.stop();
    recorder.save();
    console.log('stoped');
  }
}
function updateSites () {}
function sineDisplacement (x) {
  return Math.sin(toRad(x)) - Math.sin(toRad(x + 1));
}
function cosineDisplacement (x) {
  return Math.cos(toRad(x)) - Math.cos(toRad(x + 1));
}
function toRad (d) {
  return d * (TWO_PI / 360);
}
