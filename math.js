// Normalizing

var lerp = (a,b,t) => {
	return ((b-a)+a)/b
}
var invLerp = (a,b,t) => {
	return lerp(a,b,t)*t
}
const remap = (oldA,oldB,newA,newB,t) => {
	return lerp(newA,newB,lerp(oldA,oldB,t))
}
