const graphics = {};

graphics.drawPoint = (ctx,pxLoc,color="black",size=5) => {
    ctx.beginPath();
    ctx.fillStyle=color;
    ctx.arc(...pxLoc,size,0,Math.PI*2);
    ctx.fill();
}

graphics.drawText= (ctx,{text,loc,align='center',vAlign='middle',size=10,color='black'}) => {
    ctx.textAlign=align;
    ctx.textBaseline=vAlign;
    ctx.font="bold " + size+"px Courier";
    ctx.fillStyle=color;
    ctx.fillText(text,...loc);
}