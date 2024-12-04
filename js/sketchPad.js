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
            const mouse = this.#getMouse(e);
            // re-initalized after every mouse down event
            this.path=[mouse];
            this.isDrawing=true;
        }
        document.onmousemove = (e) => {
            if(this.isDrawing) {
                const mouse = this.#getMouse(e);
                this.path.push(mouse);
                console.log(this.path.length,mouse);
            }

        }
        document.onmouseup = () => {
            this.isDrawing=false;
        }
    }
    #getMouse = (e) => {
        const rect = this.canvas.getBoundingClientRect();
        return [
            Math.round(e.clientX-rect.left),
            Math.round(e.clientY-rect.top)
        ]
    }
}