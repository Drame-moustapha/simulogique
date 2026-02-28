class Display7SegmentsHybrid {

    constructor() {

        this.power = 0;
        this.mode = "simple";
        this.value = null;
        this.interval = null;
        this.speed = 1000; // vitesse par défaut

        this.decoder = {
            0:[1,1,1,1,1,1,0],
            1:[0,1,1,0,0,0,0],
            2:[1,1,0,1,1,0,1],
            3:[1,1,1,1,0,0,1],
            4:[0,1,1,0,0,1,1],
            5:[1,0,1,1,0,1,1],
            6:[1,0,1,1,1,1,1],
            7:[1,1,1,0,0,0,0],
            8:[1,1,1,1,1,1,1],
            9:[1,1,1,1,0,1,1]
        };
    }

    /* ---------- MODE ---------- */

    toggleMode() {

        if(this.mode === "simple") {
            this.mode = "serie";
            $("#mode").text("MODE: SERIE");
            $("#keyboard").hide();
        } else {
            this.mode = "simple";
            $("#mode").text("MODE: SIMPLE");
            $("#keyboard").show();
            this.stopCounter();
        }

        this.value = null;
        this.updateDisplay();
    }

    /* ---------- POWER ---------- */

    togglePower() {

        this.power = this.power ? 0 : 1;

        if(!this.power) {
            this.stopCounter();
            this.value = null;
        }
        else if(this.mode === "serie") {
            this.startCounter();
        }

        this.updateDisplay();
    }

    /* ---------- SPEED ---------- */

    setSpeed(newSpeed) {

        this.speed = newSpeed;
        $("#speed-value").text(newSpeed);

        // Si on est en mode série actif → redémarrer intervalle
        if(this.power && this.mode === "serie") {
            this.stopCounter();
            this.startCounter();
        }
    }

    /* ---------- SERIE ---------- */

    startCounter() {

        if(this.interval) return;

        this.value = 0;

        this.interval = setInterval(()=>{
            this.value = (this.value + 1) % 10;
            this.updateDisplay();
        }, this.speed);
    }

    stopCounter() {
        clearInterval(this.interval);
        this.interval = null;
    }

    /* ---------- SIMPLE ---------- */

    setValue(val) {
        if(this.power && this.mode === "simple") {
            this.value = val;
            this.updateDisplay();
        }
    }

    /* ---------- DISPLAY ---------- */

    getSegments() {

        if(!this.power || this.value === null) {
            return {fa:0,fb:0,fc:0,fd:0,fe:0,ff:0,fg:0,fh:this.power};
        }

        const seg = this.decoder[this.value];

        return {
            fa:seg[0], fb:seg[1], fc:seg[2], fd:seg[3],
            fe:seg[4], ff:seg[5], fg:seg[6], fh:1
        };
    }

    updateDisplay() {

        const segments = this.getSegments();

        Object.keys(segments).forEach(id=>{
            segments[id]
                ? $("#"+id).addClass("on")
                : $("#"+id).removeClass("on");
        });

        $("#power").text(this.power);
    }
}

/* ---------- INIT ---------- */

const display = new Display7SegmentsHybrid();

$(document).ready(()=>{

    display.updateDisplay();

    $("#power").click(()=> display.togglePower());
    $("#mode").click(()=> display.toggleMode());

    $(".key").click((e)=>{
        const val = parseInt($(e.target).data("val"));
        display.setValue(val);
    });

    $("#speed").on("input", function(){
        display.setSpeed(parseInt($(this).val()));
    });

});