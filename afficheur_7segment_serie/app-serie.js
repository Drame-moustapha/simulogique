class Display7SegmentsSerie {

    constructor() {
        this.power = 0;
        this.value = 0;
        this.interval = null;

        this.decoder = {
            0: [1,1,1,1,1,1,0],
            1: [0,1,1,0,0,0,0],
            2: [1,1,0,1,1,0,1],
            3: [1,1,1,1,0,0,1],
            4: [0,1,1,0,0,1,1],
            5: [1,0,1,1,0,1,1],
            6: [1,0,1,1,1,1,1],
            7: [1,1,1,0,0,0,0],
            8: [1,1,1,1,1,1,1],
            9: [1,1,1,1,0,1,1]
        };
    }

    togglePower() {
        this.power = this.power ? 0 : 1;

        if (this.power) {
            this.start();
        } else {
            this.stop();
        }

        this.updateDisplay();
    }

    start() {
        this.interval = setInterval(() => {
            this.value = (this.value + 1) % 10;
            this.updateDisplay();
        }, 1000); // 1 seconde
    }

    stop() {
        clearInterval(this.interval);
        this.value = 0;
    }

    getSegments() {
        if (!this.power) {
            return {fa:0, fb:0, fc:0, fd:0, fe:0, ff:0, fg:0, fh:0};
        }

        const seg = this.decoder[this.value];

        return {
            fa:seg[0], fb:seg[1], fc:seg[2], fd:seg[3],
            fe:seg[4], ff:seg[5], fg:seg[6], fh:1
        };
    }

    updateDisplay() {
        const segments = this.getSegments();

        Object.keys(segments).forEach(id => {
            if (segments[id]) $("#"+id).addClass("on");
            else $("#"+id).removeClass("on");
        });

        $("#power").text(this.power);
    }
}

const displaySerie = new Display7SegmentsSerie();

$(document).ready(() => {

    displaySerie.updateDisplay();

    $("#power").click(() => displaySerie.togglePower());

});