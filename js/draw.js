const draw = {};

draw.path = (ctx,path,color="black") => {
    ctx.strokeStyle=color;
    ctx.lineWidth=3;
    ctx.beginPath();
    ctx.moveTo(...path[0]); // expand x,y which the first element is an array of x,y point
    // ctx.lineTo(...path[path.length-1]);
    for (let i =1; i < path.length;i++) {
        ctx.lineTo(...path[i]);
        ctx.stroke();
    }
    ctx.lineCap="round";
    ctx.lineJoin="round";
    ctx.stroke();
}   