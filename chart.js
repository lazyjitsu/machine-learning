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


    }
}