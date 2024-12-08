const math={};

math.lerp = (a,b,t) => {
    return a+(b-a)*t;
}


math.inverseLerp=(a,b,v) => {
    return (v-a)/(b-a);
}
math.formatNumber=(n,dec=0) => {
    return n.toFixed(dec);
}

math.remap = (oldA,oldB,newA,newB,v) => {
    return math.lerp(newA,newB,math.inverseLerp(oldA,oldB,v));
}
math.remapPoint = (dataBounds,pixelBounds,p) => {
    return [
        math.remap(dataBounds.left,dataBounds.right,pixelBounds.left,pixelBounds.right,p[0]),
        math.remap(dataBounds.top,dataBounds.bottom,pixelBounds.top,pixelBounds.bottom,p[1])
    ]
}