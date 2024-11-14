ML with JS and No libraries!
Lerping aka 'Linear Interpolation'

The position between two points:

```js
A = {x:100,y:100}
B = {x:200,y:100}
//  To get C half between A & B you might think;
const C = {
          x:(A.x+B.x/2),
          y:100
        }

// this is not quite right and you're are a little off
const C = {
    x: (A.x+B.x)/3,
    y:100
}
// lets try
const C = {
  x:(2*A.x+B.x)/3,
  y:100
}

// But now you're adding 'a' 3 times (2*A.x which is two A.x's and finally the third time with 2A.x + B.x is a third operation on A.x and thus if you to divide it 3 times). It's also not so intuitive

const C = {
  x:A.x+(B.x-A.x)*1/3,
}
// Now that's more efficient and accurate and is the linear interpolation expression
const C = {
  x:A.x+(B.x-A.x)*Math.random(),
}

function lerp-v1(a,b,t) {
return a + (b-a)*t;
}
ML with JS and No libraries!
Lerping

The position between two points:
A = {x:100,y:100}
B = {x:200,y:100}
To get C 1/2 between A & B you might think;
C = {x:(A.x+B.x/2)}

This is not exactly correct but would crudely work.

function lerp-v1(a,b,t) {
  // the (b-a) is the problem here due to how js handles floating points
return a + (b-a)*t;
}

function lerp-v2(a,b,t) {
return a*(1-t) + b*t;
}

lerp-v1(5.8,1.1,1)
Out: 1.100000000000005
// v2 is better
function lerp-v2(a,b,t) {
return a*(1-t) + b*t;
}

lerp-v1(5.8,1.1,1)
Out: 1.1
```

![SimilarTriangles](/similarTriangles.JPG)
