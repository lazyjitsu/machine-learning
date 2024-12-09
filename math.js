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

math.equals=(p1,p2) => {
    return p1[0] === p2[0] && p1[1] == p2[1]
}
math.add=(p1,p2) => {
    return [
        p1[0] + p2[0],
        p1[1] + p2[1]
    ]
}

math.subtract=(p1,p2) => {
    return [
        p1[0] - p2[0],
        p1[1] - p2[1]
    ]
}
math.scale=(p,scaler) => {
    return [
        p[0]*scaler,
        p[1]*scaler
    ]
}
math.distance=(p1,p2) => {
    return Math.sqrt(
        (p1[0]-p2[0])**2 +
        (p1[1]-p2[1])**2
    );
}
math.getNearest=(mouseHoverPx,dataInPx) => {
    let minDist=Number.MAX_SAFE_INTEGER;
    let nearestIndex=0;

    for (let i =0; i < dataInPx.length; i++) {
        const point=dataInPx[i];
        const d = math.distance(mouseHoverPx,point);
        
        if (d < minDist) {
            minDist=d;
            nearestIndex=i
        }
    }
    return nearestIndex;
}