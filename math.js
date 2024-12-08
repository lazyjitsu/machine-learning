const math={};

math.lerp = (a,b,t) => {
    return a+(b-a)*t;
}

math.format=(n,dec=0) => {
    return n.toFixed(dec);
}