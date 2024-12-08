const graphics = {};

graphics.drawPoint = (ctx,pxLoc,color="black",size=5) => {
    ctx.beginPath();
    ctx.fillStyle=color;
    ctx.arc(...pxLoc,size,0,Math.PI*2);
    ctx.fill();
}
