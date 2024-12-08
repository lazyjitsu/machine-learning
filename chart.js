class Chart {
    constructor(container,samples,options) {
        this.samples = samples;
        this.styles = options.styles;
        this.axesLabels = options.axesLabels;

        this.canvas = document.createElement('canvas');

        this.canvas.width = options.size;
        this.canvas.height = options.size;
        this.canvas.style="background-color:white;";
        container.appendChild(this.canvas);

        this.ctx = this.canvas.getContext('2d');
        this.margin = options.size*0.1; 
        // because we have a lot of overlapping data points, we will use transparency
        this.transparency=0.5;

        this.pixelBounds=this.#getPixelBounds();
        this.dataBounds=this.#getDataBounds();

        this.#draw();
    }

    #addEventListners() {

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
            const {point} = sample;
            // console.log('pt ',point);
            const pixelLoc = math.remapPoint(dataBounds,pixelBounds,point);
            graphics.drawPoint(ctx,pixelLoc);
        }
    }

}