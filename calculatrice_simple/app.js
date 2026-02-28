class Calculator {

    constructor() {

        this.state = "IDLE";
        this.first = "";
        this.second = "";
        this.operator = null;

        this.initDisplay(6); // 6 digits
        this.updateDisplay("0");
    }

    /* ---------------- INIT AFFICHAGE ---------------- */

    initDisplay(digits) {
        for(let i=0;i<digits;i++){
            $("#display").append(`<div class="digit" id="digit${i}"></div>`);
        }
    }

    updateDisplay(value) {
        value = value.toString().slice(-6).padStart(6," ");

        $(".digit").each(function(index){
            $(this).text(value[index]);
        });
    }

    updateOperationDisplay() {
        $("#operation").text(
            `${this.first} ${this.operator || ""} ${this.second}`
        );
    }

    /* ---------------- GESTION CLAVIER ---------------- */

    press(key) {

        if(!isNaN(key)) {
            this.enterNumber(key);
        }
        else if(["+","−","×","÷"].includes(key)) {
            this.selectOperator(key);
        }
        else if(key === "=") {
            this.compute();
        }
        else if(key === "C") {
            this.reset();
        }
    }

    /* ---------------- LOGIQUE FSM ---------------- */

    enterNumber(n) {

        if(this.state === "IDLE" || this.state === "ENTER_FIRST") {
            this.state = "ENTER_FIRST";
            this.first += n;
            this.updateDisplay(this.first);
        }
        else if(this.state === "OP_SELECTED" || this.state === "ENTER_SECOND") {
            this.state = "ENTER_SECOND";
            this.second += n;
            this.updateDisplay(this.second);
        }

        this.updateOperationDisplay();
    }

    selectOperator(op) {

        if(this.first !== "") {
            this.operator = op;
            this.state = "OP_SELECTED";
            this.updateOperationDisplay();
        }
    }

    compute() {

        if(this.first && this.second && this.operator) {

            let a = parseFloat(this.first);
            let b = parseFloat(this.second);
            let result;

            switch(this.operator){
                case "+": result = a + b; break;
                case "−": result = a - b; break;
                case "×": result = a * b; break;
                case "÷": result = b !== 0 ? a / b : "error"; break;
            }

            this.updateDisplay(result);
            this.state = "SHOW_RESULT";

            this.first = result.toString();
            this.second = "";
            this.operator = null;

            this.updateOperationDisplay();
        }
    }

    reset() {
        this.state = "IDLE";
        this.first = "";
        this.second = "";
        this.operator = null;
        this.updateDisplay("0");
        this.updateOperationDisplay();
    }
}

/* ---------------- INIT ---------------- */

const calc = new Calculator();

$(document).ready(()=>{
    $(".key").click(function(){
        calc.press($(this).text());
    });
});