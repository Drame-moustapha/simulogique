$(function () {

    let isOn = false;
    let isUpper = true;
    let seqInterval = null;

    const numbers = "0123456789".split("");
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    let seqIndex = 0;
    let seqMode = "numbers";

    // Génération du clavier
    function generateKeyboard() {
        $("#keyboard").empty();
        addKey("OFF", "power");
        addKey("MAJ", "shift");
    }

    function addKey(label, type) {
        let btn = $("<button>").addClass("key").text(label);
        btn.click(() => {
            if(type === "power") togglePower(btn);
            if(type === "shift") toggleShift(btn);
        });
        $("#keyboard").append(btn);
    }

    // ON/OFF
    function togglePower(btn) {
        isOn = !isOn;
        btn.text(isOn ? "ON" : "OFF");
        if(isOn) startSequence();
        else stopSequence();
    }

    // MAJ/MIN
    function toggleShift(btn) {
        isUpper = !isUpper;
        btn.text(isUpper ? "MAJ" : "MIN");
    }

    // Séquence automatique
    function startSequence() {
        seqIndex = 0;
        seqMode = "numbers";
        seqInterval = setInterval(() => {
            let char;
            if(seqMode === "numbers") char = numbers[seqIndex];
            else char = isUpper ? letters[seqIndex] : letters[seqIndex].toLowerCase();

            updateDisplays(char);

            seqIndex++;
            if(seqMode === "numbers" && seqIndex >= numbers.length) {
                seqMode = "letters";
                seqIndex = 0;
            } else if(seqMode === "letters" && seqIndex >= letters.length) {
                seqMode = "numbers";
                seqIndex = 0;
            }
        }, 500);
    }

    function stopSequence() {
        clearInterval(seqInterval);
        $("#lcd-line1, #lcd-line2").text("");
        $(".segment").removeClass("on");
        $("#matrix").empty();
    }

    // LCD et 7 segments
    const MAX_LINE = 16;
    let buffer = "";

    function updateLCD(char) {
        buffer += char;
        if(buffer.length > MAX_LINE*2) buffer = buffer.slice(-MAX_LINE*2);
        $("#lcd-line1").text(buffer.slice(0, MAX_LINE));
        $("#lcd-line2").text(buffer.slice(MAX_LINE));
    }

    const segMap = {
        "0":["a","b","c","d","e","f"],
        "1":["b","c"],
        "2":["a","b","g","e","d"],
        "3":["a","b","g","c","d"],
        "4":["f","g","b","c"],
        "5":["a","f","g","c","d"],
        "6":["a","f","g","c","d","e"],
        "7":["a","b","c"],
        "8":["a","b","c","d","e","f","g"],
        "9":["a","b","c","d","f","g"]
    };

    function update7Seg(char) {
        $(".segment").removeClass("on");
        if(segMap[char]) segMap[char].forEach(s => $("#" + s).addClass("on"));
    }

    // Matrice 5x5
    const letterPatterns = {
        A:[0,1,1,1,0,1,0,0,0,1,1,1,1,1,1,1,0,0,0,1,1,0,0,0,1],
        B:[1,1,1,0,0,1,0,0,0,1,1,1,1,0,0,1,0,0,0,1,1,1,1,0,0],
        C:[0,1,1,1,1,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,1,1,1,1,1],
        D:[1,1,1,0,0,1,0,0,0,1,1,0,0,0,1,1,0,0,0,1,1,1,1,0,0],
        E:[1,1,1,1,1,1,0,0,0,0,1,1,1,1,0,1,0,0,0,0,1,1,1,1,1],
        F:[1,1,1,1,1,1,0,0,0,0,1,1,1,1,0,1,0,0,0,0,1,0,0,0,0],
        G:[0,1,1,1,1,1,0,0,0,0,1,0,1,1,1,1,0,0,0,1,0,1,1,1,1],
        H:[1,0,0,0,1,1,0,0,0,1,1,1,1,1,1,1,0,0,0,1,1,0,0,0,1],
        I:[1,1,1,1,1,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,1,1,1,1,1],
        J:[0,0,0,1,1,0,0,0,0,1,0,0,0,0,1,1,0,0,0,1,0,1,1,1,0],
        K:[1,0,0,0,1,1,0,0,1,0,1,1,0,0,0,1,0,1,0,0,1,0,0,0,1],
        L:[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,1,1,1,1],
        M:[1,0,0,0,1,1,1,0,1,1,1,0,1,0,1,0,0,0,1,0,0,0,1,0,0,1],
        N:[1,0,0,0,1,1,1,0,0,0,1,1,0,1,0,0,1,0,0,1,0,0,0,1,0,1],
        O:[0,1,1,1,0,1,0,0,0,1,1,0,0,0,1,1,0,0,0,1,0,1,1,1,0],
        P:[1,1,1,1,0,1,0,0,0,1,1,1,1,0,0,1,0,0,0,0,1,0,0,0,0],
        Q:[0,1,1,1,0,1,0,0,0,1,1,0,0,1,1,0,0,0,0,1,0,1,1,1,1],
        R:[1,1,1,1,0,1,0,0,0,1,1,1,1,0,0,1,0,1,0,0,1,0,0,0,1],
        S:[0,1,1,1,1,1,0,0,0,0,0,1,1,1,0,0,0,0,0,1,1,1,1,0],
        T:[1,1,1,1,1,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0],
        U:[1,0,0,0,1,1,0,0,0,1,1,0,0,0,1,1,0,0,0,1,0,1,1,1,0],
        V:[1,0,0,0,1,1,0,0,0,1,1,0,0,0,1,0,1,0,1,0,0,1,0,0,0],
        W:[1,0,0,0,1,1,0,0,0,1,1,0,1,0,1,1,0,0,0,1,0,0,0,1,0,0,1],
        X:[1,0,0,0,1,0,1,0,1,0,0,0,1,0,0,1,0,1,0,1,0,0,0,1,0],
        Y:[1,0,0,0,1,0,1,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0],
        Z:[1,1,1,1,1,0,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,1,1,1,1,1]
    };

    function updateMatrix(char) {
        $("#matrix").empty();
        let pattern = letterPatterns[char.toUpperCase()] || [];
        for(let i=0;i<25;i++){
            let px = $("<div>").addClass("pixel");
            if(pattern[i]) px.addClass("on");
            $("#matrix").append(px);
        }
    }

    function updateDisplays(char) {
        if(/[0-9]/.test(char)){
            updateLCD(char);
            update7Seg(char);
            $("#matrix").empty();
        } else {
            updateLCD(char);
            clear7Seg();
            updateMatrix(char);
        }
    }

    function clear7Seg() {
        $(".segment").removeClass("on");
    }

    generateKeyboard();
});