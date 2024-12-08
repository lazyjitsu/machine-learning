const math={};

math.lerp = (a,b,t) => {
    return a+(b-a)*t;
}


math.inverseLerp=(a,b,v) => {
    return (v-a)/(b-a);
}
math.format=(n,dec=0) => {
    return n.toFixed(dec);
}

math.remap = (oldA,oldB,newA,newB,v) => {
    return math.lerp(newA,newB,math.inverseLerp(oldA,oldB,v));
}