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

        this.#addEventListeners()

    }
    #addEventListeners() {
        document.onclick = (e) => {
            const rect = this.canvas.getBoundingClientRect();
            // console.log("E: ",e.x-rect.left,e.y-rect.top);
            const mouse = [
                Math.round(e.clientX-rect.left),
                Math.round(e.clientY-rect.top)
            ]
            console.log(mouse);
            this.path=[mouse];
            this.isDrawing=true;
        }
    }
}