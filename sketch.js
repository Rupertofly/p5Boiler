/* eslint no-undef: 0 */
/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "setup|draw|preload" }] */
console.log(palleteKey);
const pad = function (n, size) {
  var s = String(n);
  while (s.length < (size || 2)) {
    s = '0' + s;
  }
  return s;
};
function preload () {}
let vora;
let sites = [];
let polys;
let cols;
let count = 500;
var aGif;
var canv;
var capturer = new CCapture({ format: 'gif', framerate: 30, verbose: true });
let rendered = false;
function setup () {
  capturer.start();
  canv = createCanvas(1080 / 2, 1350 / 2);
  sites = d3.range(count).map(function (d) {
    return [
      d * ((width - 50) / count) + 1,
      700 + 10.1 * Math.sin(TWO_PI / 360 * (d * 2))
    ];
  });
  let offset = count / 12;
  cols = d3.range(count).map(function (d) {
    let hue = palleteKey[Math.floor(d / offset)];
    let p = Pallete[hue];
    return p[Math.floor(3 + random(-3, 3))].hex;
  });
  vora = d3.voronoi().extent([[0, 0], [width, height]]);
  polys = vora(sites).polygons();
  canvEl = document.getElementById('defaultCanvas0');
  canvEl.ctx = canvEl.getContext('2d');
  print(canvEl.ctx);
}
function draw () {
  background(Pallete.neutrals[1].hex);

  polys = vora(sites).polygons();
  ellipse(mouseX, mouseY, 30, 30);
  noFill();

  stroke(55);
  strokeWeight(2);
  for (const [i, v] of polys.entries()) {
    fill(cols[i]);
    if (v === undefined) continue;
    let c = d3.polygonCentroid(v);

    ellipse(sites[i][0], sites[i][1], 10, 10);
    sites[i] = getMidpoint(sites[i], c, 50);
    beginShape();

    for (let index = 0; index < v.length; index++) {
      const p = v[index];
      vertex(p[0], p[1]);
    }
    endShape(CLOSE);
  }
  if (frameCount < 240) {
    capturer.capture(canvEl);
  } else if (frameCount === 240) {
    capturer.stop();
    capturer.save();
  }
}
function pickRandomProperty (obj) {
  var result;
  var count = 0;
  for (var prop in obj) if (Math.random() < 1 / ++count) result = prop;
  return result;
}
function getMidpoint (p1, p2, distance) {
  let start = createVector(p1[0], p1[1]);
  let finish = createVector(p2[0], p2[1]);
  let norm = createVector(finish.x - start.x, finish.y - start.y);
  // print(norm);
  norm.limit(distance);

  // print(start);
  start = start.add(norm);
  return [start.x, start.y];
}
function padToFour (number) {
  if (number <= 9999) {
    number = ('000' + number).slice(-4);
  }
  return number;
}
