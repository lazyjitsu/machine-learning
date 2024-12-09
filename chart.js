class Chart {
    constructor(container,samples,options) {
        this.samples = samples;
        this.styles = options.styles;
        this.icon=options.icon;
        this.axesLabels = options.axesLabels;

        this.canvas = document.createElement('canvas');

        this.canvas.width = options.size;
        this.canvas.height = options.size;
        this.canvas.style="background-color:white;";
        container.appendChild(this.canvas);

        this.ctx = this.canvas.getContext('2d');
        this.margin = options.size*0.1; 
        // because we have a lot of overlapping data points, we will use transparency
        this.transparency=0.7;

        this.dataTrans = {
            offset:[0,0],
            scale:1 // this will control the zooming
        }
        this.dragInfo = {
            start:[0,0],
            end:[0,0],
            offset:[0,0],
            dragging:false
        }

        this.pixelBounds=this.#getPixelBounds();
        this.dataBounds=this.#getDataBounds();
        this.defaultDataBounds=this.#getDataBounds();
        this.#addEventListeners();
        this.#draw();
    }

    #addEventListeners() {
        const {canvas,dataTrans,dragInfo} = this;
        canvas.onmousedown=(e) => {
            const dataLoc=this.#getMouse(e,true); //true=working w/data space            
            // console.log('DL ',dataLoc);
            dragInfo.start=dataLoc;
            dragInfo.dragging=true;
            console.log('heoi')
        }
        canvas.onmousemove=(e) => {
            if(dragInfo.dragging) {
                const dataLoc = this.#getMouse(e,true);
                dragInfo.end=dataLoc;
                dragInfo.offset=math.scale(math.subtract(
                                    dragInfo.start,dragInfo.end
                                ),dataTrans.scale);
                const newOffset=math.add(
                    dataTrans.offset,dragInfo.offset
                )
                this.#updateDataBounds(newOffset,dataTrans.scale);
                // console.log('NO ',newOffset);
                this.#draw();
            }
        }
        canvas.onmouseup=(e) => {
            dataTrans.offset=math.add(
                dataTrans.offset,
                dragInfo.offset
            )
            dragInfo.dragging=false;
        }
        canvas.onwheel=(e) => {
            const dir=Math.sign(e.deltaY);
            const step=0.02;
            dataTrans.scale+=dir*step;
            // clamp how much we can zoom
            dataTrans.scale=Math.max(step,Math.min(2,dataTrans.scale));
            this.#updateDataBounds(
                dataTrans.offset,
                dataTrans.scale
            );
            this.#draw();

            e.preventDefault();
        }
    }
    #updateDataBounds(offset,scale) {
        const {dataBounds,defaultDataBounds:def} = this;
        dataBounds.left=def.left+offset[0]; // x
        dataBounds.right=def.right+offset[0]; // x
        dataBounds.top=def.top+offset[1]; // y
        dataBounds.bottom=def.bottom+offset[1]; // y

        // use the center as a focal point of sorts
        const center = [
            (dataBounds.left+dataBounds.right)/2,
            (dataBounds.top+dataBounds.bottom)/2
        ];
        // zoom in will be interpolation, zoomout, extrapolation
        dataBounds.left=math.lerp(
            center[0],
            dataBounds.left,scale**2
        );
        dataBounds.right=math.lerp(
            center[0],
            dataBounds.right,scale**2
        );
        dataBounds.top=math.lerp(
            center[1],
            dataBounds.top,scale**2
        );
        dataBounds.bottom=math.lerp(
            center[1],
            dataBounds.bottom,scale**2
        );
    }

    #getMouse(e,dataSpace=false) {
        const rect = this.canvas.getBoundingClientRect();
        const pixelLoc = [
            e.clientX - rect.left,
            e.clientY - rect.top
        ]
        if(dataSpace) {
            // need static data. the fact that its updating and moving is reason it shakes when moving
            const dataLoc = math.remapPoint(this.pixelBounds,this.defaultDataBounds,pixelLoc);
            return dataLoc;
        } //else
        return pixelLoc;

    }
    #getPixelBounds() {
        const {canvas,margin} = this;
        const bounds = {
            left:margin,
            right:canvas.width-margin,
            top:margin,
            bottom:canvas.height-margin
        }
        return bounds;
    }
    #getDataBounds() {
        const {samples} = this;
        const x = samples.map(s => s.point[0]);
        const y = samples.map(s => s.point[1]);
        // Math.min and max fcns don't work w/arrays, they work with individual values hence the spread operator ...

        const minX = Math.min(...x);
        const maxX = Math.max(...x);
        const minY = Math.min(...y);
        const maxY = Math.max(...y);
        const bounds = {
            left: minX,
            right:maxX,
            top:maxY,
            bottom:minY
        }
        return bounds;
    }
    #draw() {
        const {ctx,canvas} = this;
        ctx.clearRect(0,0,canvas.width,canvas.height);

        ctx.globalAlpha = this.transparency;
        this.#drawSamples();
        ctx.globalAlpha = 1; // reset so it doesnt impact subsequent drawings
        this.#drawAxes();
    }
    #drawAxes() {
        const {ctx,canvas,margin,axesLabels} = this;
        const {left,right,top,bottom} = this.pixelBounds;

        graphics.drawText(ctx,{
            text:axesLabels[0],
            loc:[canvas.width/2,bottom+margin/2],
            size:margin*0.6
        })
        ctx.save(); // save the canvas context
        ctx.translate(left-margin/2,canvas.height/2);
        ctx.rotate(-Math.PI/2);
        graphics.drawText(ctx, {
            text:axesLabels[1],
            loc:[0,0], // cause we already positioned it when we translated
            size:margin*0.6
        })
        ctx.restore();

        ctx.beginPath();
        ctx.moveTo(left,top);
        ctx.lineTo(left,bottom);
        ctx.lineTo(right,bottom);
        ctx.setLineDash([5,4]);
        ctx.strokeStyle='lightgray';
        ctx.lineWidth=1.5;
        ctx.stroke();
        ctx.setLineDash([]);

        const dataMin = math.remapPoint(this.pixelBounds,this.dataBounds,[left,bottom]);
        graphics.drawText(ctx,{
            text:math.formatNumber(dataMin[0]),
            loc:[left,bottom],
            size:margin*0.3,
            align:"left",
            vAlign:"top"
        });
        ctx.save();
        ctx.translate(left,bottom);
        ctx.rotate(-Math.PI/2);
        graphics.drawText(ctx,{
            text:math.formatNumber(dataMin[1],2),
            size:margin*0.3,
            loc:[0,0],
            align:"middle",
            vAlign:"bottom"
        });
        ctx.restore();
        const dataMax = math.remapPoint(this.pixelBounds,this.dataBounds,[right,top]);

        graphics.drawText(ctx,{
            text:math.formatNumber(dataMax[0]),
            loc:[right,bottom],
            size:margin*0.3,
            align:"right",
            vAlign:"top"
        });
        ctx.save();
        ctx.translate(left,top);
        ctx.rotate(-Math.PI/2);
        graphics.drawText(ctx,{
            text:math.formatNumber(dataMax[1],2),
            size:margin*0.3,
            loc:[0,0],
            align:"right",
            vAlign:"bottom"
        });
        ctx.restore();
        


    }
    #drawSamples() {
        const {ctx,samples,dataBounds,pixelBounds} = this;
        for (const sample of samples) {
            const {point,label} = sample;
            // console.log('pt ',point);
            const pixelLoc = math.remapPoint(dataBounds,pixelBounds,point);

            switch(this.icon) {
                case "image":
                    graphics.drawImage(ctx,
                        this.styles[label].image,
                        pixelLoc
                    );
                    break;
                case "text":
                    graphics.drawText(ctx,{
                        text:this.styles[label].text,
                        loc:pixelLoc,
                        size:20
                    });
                    break;
                default:
                    graphics.drawPoint(ctx,pixelLoc,this.styles[label].color);
                    break;
            }
        }
    }

}