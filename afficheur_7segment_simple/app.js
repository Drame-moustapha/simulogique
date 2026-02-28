class Display7Segments {
    constructor() {
        this.power = 0; // alimentation
        this.value = null;

        // Table des segments pour 0–7
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
        if (!this.power) this.value = null;
        this.updateDisplay();
    }

    setValue(val) {
        if(this.power) {
            this.value = val;
            this.updateDisplay();
        }
    }

    getSegments() {
        if (!this.power || this.value === null) {
            return {fa:0, fb:0, fc:0, fd:0, fe:0, ff:0, fg:0, fh:this.power};
        }
        const seg = this.decoder[this.value];
        return {
            fa:seg[0], fb:seg[1], fc:seg[2], fd:seg[3],
            fe:seg[4], ff:seg[5], fg:seg[6], fh:this.power
        };
    }

    updateDisplay() {
        const segments = this.getSegments();
        Object.keys(segments).forEach(id=>{
            if(segments[id]) $("#"+id).addClass("on");
            else $("#"+id).removeClass("on");
        });
        $("#power").text(this.power);
    }
}

const display = new Display7Segments();

$(document).ready(()=>{
    display.updateDisplay();

    // Bouton ON/OFF
    $("#power").click(()=> display.togglePower());

    // Boutons 0–7
    $(".key").click((e)=>{
        const val = parseInt($(e.target).data("val"));
        display.setValue(val);
    });
});