class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  Show() {
    return `(${this.x},${this.y})`
  }
  Equals(p) {
    return (p.x === this.x && p.y === this.y)
  }
}


//2
// for: points=[(1,2),(2,3)], x=1, y=2 PointExistsInArray return true
// for: points=[(4,2),(2,3)], x=1, y=2 PointExistsInArray return false

function PointExistsInArray1(points, x, y) {
  let point = new Point(x, y)
  for (let index = 0; index < points.length; index++) {
    if (points[index].Equals(point)) {
      return true;
    }
  }
  return false;
}


//3
// for: points=[(1,2),(2,3)], point=(1,2) PointExistsInArray return true
// for: points=[(4,2),(2,3)], point=(1,2) PointExistsInArray return false

function PointExistsInArray2(points, point) {
  for (let index = 0; index < points.length; index++) {
    if (points[index].Equals(point)) {
      return true;
    }
  }
  return false;
}

//4

function calculateLengthRoute(points) {
  let sum = 0;
  if (points.length <=1) {
    return sum;
  }
  for (let index = 0; index < points.length-1; index++) {
    let pointA = points[index];
    let pointB = points[index + 1];
    sum += calculateLengthPointToPoint(pointA, pointB)
  }

  return sum;
}

function calculateLengthPointToPoint(a, b) {
  return Math.sqrt(Math.pow((a.x - b.x), 2) + Math.pow((a.y - b.y), 2));
}

