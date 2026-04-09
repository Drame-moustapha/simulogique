$(function () {

    let isOn = false;
    let isUpper = true;

    const letters = "abcdefghijklmnopqrstuvwxyz".split("");
    const numbers = "0123456789".split("");

    /* =====================
       CREATION CLAVIER
    ====================== */
    function generateKeyboard() {
        $("#keyboard").empty();

        addKey("ON/OFF", "power");
        addKey("MAJ", "shift");

        numbers.forEach(n => addKey(n));

        letters.forEach(l => {
            addKey(isUpper ? l.toUpperCase() : l);
        });
    }

    function addKey(label, type = "normal") {

        let btn = $("<button>")
            .addClass("key")
            .text(label);

        if (type !== "normal") {
            btn.addClass("special " + type);
        }

        btn.click(function () {

            // ON/OFF
            if (type === "power") {
                isOn = !isOn;

                if (!isOn) {
                    $("#lcd").text("");
                    $(".segment").removeClass("on");
                    $("#matrix").empty();
                } else {
                    $("#lcd").text("ON");
                }

                return;
            }

            // MAJ/MIN
            if (type === "shift") {
                if (!isOn) return;

                isUpper = !isUpper;
                generateKeyboard();
                return;
            }

            // touches normales
            if (!isOn) return;

            updateDisplays(label);
        });

        $("#keyboard").append(btn);
    }

    /* =====================
       LCD
    ====================== */
    function updateLCD(char) {
        let txt = $("#lcd").text();
        $("#lcd").text(char);
    }

    /* =====================
       7 SEGMENTS
    ====================== */
    const segMap = {
        "0": ["a","b","c","d","e","f"],
        "1": ["b","c"],
        "2": ["a","b","g","e","d"],
        "3": ["a","b","g","c","d"],
        "4": ["f","g","b","c"],
        "5": ["a","f","g","c","d"],
        "6": ["a","f","g","c","d","e"],
        "7": ["a","b","c"],
        "8": ["a","b","c","d","e","f","g"],
        "9": ["a","b","c","d","f","g"]
    };

    function update7Seg(char) {
        $(".segment").removeClass("on");

        if (segMap[char]) {
            segMap[char].forEach(s => $("#" + s).addClass("on"));
        }
    }

    /* =====================
       MATRICE
    ====================== */
    function drawMatrix(char) {
        $("#matrix").empty();

        const patterns = {
            "A": [
                1,0,1,0,1,
                1,1,1,1,1,
                1,0,0,0,1,
                1,0,0,0,1,
                1,0,0,0,1
            ]
        };

        let pattern = patterns[char.toUpperCase()] || [];

        for (let i = 0; i < 25; i++) {
            let pixel = $("<div>").addClass("pixel");
            if (pattern[i]) pixel.addClass("on");
            $("#matrix").append(pixel);
        }
    }

    function updateDisplays(char) {
        updateLCD(char);
        update7Seg(char);
        drawMatrix(char);
    }
    function drawMatrix(char) {
        $("#matrix").empty();

        const patterns = {

            A: [
                0,1,1,1,0,
                1,0,0,0,1,
                1,1,1,1,1,
                1,0,0,0,1,
                1,0,0,0,1
            ],

            B: [
                1,1,1,1,0,
                1,0,0,0,1,
                1,1,1,1,0,
                1,0,0,0,1,
                1,1,1,1,0
            ],

            C: [
                0,1,1,1,1,
                1,0,0,0,0,
                1,0,0,0,0,
                1,0,0,0,0,
                0,1,1,1,1
            ],

            D: [
                1,1,1,0,0,
                1,0,0,1,0,
                1,0,0,0,1,
                1,0,0,1,0,
                1,1,1,0,0
            ],

            E: [
                1,1,1,1,1,
                1,0,0,0,0,
                1,1,1,1,0,
                1,0,0,0,0,
                1,1,1,1,1
            ],

            F: [
                1,1,1,1,1,
                1,0,0,0,0,
                1,1,1,1,0,
                1,0,0,0,0,
                1,0,0,0,0
            ],

            G: [
                0,1,1,1,1,
                1,0,0,0,0,
                1,0,1,1,1,
                1,0,0,0,1,
                0,1,1,1,1
            ],

            H: [
                1,0,0,0,1,
                1,0,0,0,1,
                1,1,1,1,1,
                1,0,0,0,1,
                1,0,0,0,1
            ],

            I: [
                1,1,1,1,1,
                0,0,1,0,0,
                0,0,1,0,0,
                0,0,1,0,0,
                1,1,1,1,1
            ],

            J: [
                0,0,0,1,1,
                0,0,0,0,1,
                0,0,0,0,1,
                1,0,0,0,1,
                0,1,1,1,0
            ],

            K: [
                1,0,0,1,0,
                1,0,1,0,0,
                1,1,0,0,0,
                1,0,1,0,0,
                1,0,0,1,0
            ],

            L: [
                1,0,0,0,0,
                1,0,0,0,0,
                1,0,0,0,0,
                1,0,0,0,0,
                1,1,1,1,1
            ],

            M: [
                1,0,0,0,1,
                1,1,0,1,1,
                1,0,1,0,1,
                1,0,0,0,1,
                1,0,0,0,1
            ],

            N: [
                1,0,0,0,1,
                1,1,0,0,1,
                1,0,1,0,1,
                1,0,0,1,1,
                1,0,0,0,1
            ],

            O: [
                0,1,1,1,0,
                1,0,0,0,1,
                1,0,0,0,1,
                1,0,0,0,1,
                0,1,1,1,0
            ],

            P: [
                1,1,1,1,0,
                1,0,0,0,1,
                1,1,1,1,0,
                1,0,0,0,0,
                1,0,0,0,0
            ],

            Q: [
                0,1,1,1,0,
                1,0,0,0,1,
                1,0,0,0,1,
                1,0,1,0,1,
                0,1,1,1,1
            ],

            R: [
                1,1,1,1,0,
                1,0,0,0,1,
                1,1,1,1,0,
                1,0,1,0,0,
                1,0,0,1,0
            ],

            S: [
                0,1,1,1,1,
                1,0,0,0,0,
                0,1,1,1,0,
                0,0,0,0,1,
                1,1,1,1,0
            ],

            T: [
                1,1,1,1,1,
                0,0,1,0,0,
                0,0,1,0,0,
                0,0,1,0,0,
                0,0,1,0,0
            ],

            U: [
                1,0,0,0,1,
                1,0,0,0,1,
                1,0,0,0,1,
                1,0,0,0,1,
                0,1,1,1,0
            ],

            V: [
                1,0,0,0,1,
                1,0,0,0,1,
                1,0,0,0,1,
                0,1,0,1,0,
                0,0,1,0,0
            ],

            W: [
                1,0,0,0,1,
                1,0,0,0,1,
                1,0,1,0,1,
                1,1,0,1,1,
                1,0,0,0,1
            ],

            X: [
                1,0,0,0,1,
                0,1,0,1,0,
                0,0,1,0,0,
                0,1,0,1,0,
                1,0,0,0,1
            ],

            Y: [
                1,0,0,0,1,
                0,1,0,1,0,
                0,0,1,0,0,
                0,0,1,0,0,
                0,0,1,0,0
            ],

            Z: [
                1,1,1,1,1,
                0,0,0,1,0,
                0,0,1,0,0,
                0,1,0,0,0,
                1,1,1,1,1
            ]
        };

        let pattern = patterns[char.toUpperCase()] || [];

        for (let i = 0; i < 25; i++) {
            let pixel = $("<div>").addClass("pixel");

            if (pattern[i]) pixel.addClass("on");

            $("#matrix").append(pixel);
        }
    }

    generateKeyboard();
});
