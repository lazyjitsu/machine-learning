class SketchPad {
    constructor(container,size=400) {
        this.canvas = document.createElement('canvas');
        this.canvas.width=size;
        this.canvas.height=size;
        this.canvas.style=`
            background-color:white;
            box-shadow: 0px 0px 10px 2px black;
        `
        container.append(this.canvas);

        this.ctx=this.canvas.getContext("2d");
        this.path=[];
        this.isDrawing=false;
        this.#addEventListeners()

    }
    #addEventListeners() {
        document.onmousedown = (e) => {
            const rect = this.canvas.getBoundingClientRect();
            // console.log("E: ",e.x-rect.left,e.y-rect.top);
            const mouse = [
                Math.round(e.clientX-rect.left),
                Math.round(e.clientY-rect.top)
            ]
            console.log(mouse);
            // re-initalized after every mouse down event
            this.path=[mouse];
            this.isDrawing=true;
        }
        document.onmousemove = (e) => {
            if(this.isDrawing) {
                const rect = this.canvas.getBoundingClientRect();
                const mouse = [
                    Math.round(e.clientX-rect.left),
                    Math.round(e.clientY-rect.top)
                ]
                this.path.push(mouse);
                console.log(this.path.length);
            }

        }
        document.onmouseup = () => {
            this.isDrawing=false;
        }
    }
}