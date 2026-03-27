
class Display14SegmentsSerie {

    constructor() {
        this.power = 0;
        this.index = 0;
        this.interval = null;
        this.isUpperCase = false;

        // Décodeur 14 segments
        // Segments: a b c d e f g h i j k l m n
        this.decoder = {
            // Chiffres 0-9
            '0': [1,1,1,1,1,1,0,0,0,0,0,0,0,0],
            '1': [0,1,1,0,0,0,0,0,0,0,0,0,0,0],
            '2': [1,1,0,1,1,0,1,0,0,0,0,0,0,0],
            '3': [1,1,1,1,0,0,1,0,0,0,0,0,0,0],
            '4': [0,1,1,0,0,1,1,0,0,0,0,0,0,0],
            '5': [1,0,1,1,0,1,1,0,0,0,0,0,0,0],
            '6': [1,0,1,1,1,1,1,0,0,0,0,0,0,0],
            '7': [1,1,1,0,0,0,0,0,0,0,0,0,0,0],
            '8': [1,1,1,1,1,1,1,0,0,0,0,0,0,0],
            '9': [1,1,1,1,0,1,1,0,0,0,0,0,0,0],

            // Lettres MAJUSCULES
            'A': [1,1,1,0,1,1,1,0,0,0,0,0,0,0],
            'B': [1,1,1,1,1,0,1,0,0,0,1,0,0,0],
            'C': [1,0,0,1,1,1,0,0,0,0,0,0,0,0],
            'D': [1,1,1,1,1,0,0,0,0,0,1,0,0,0],
            'E': [1,0,0,1,1,1,1,0,0,0,0,0,0,0],
            'F': [1,0,0,0,1,1,1,0,0,0,0,0,0,0],
            'G': [1,0,1,1,1,1,1,0,0,0,0,0,0,0],
            'H': [0,1,1,0,1,1,1,0,0,0,0,0,0,0],
            'I': [1,0,0,1,0,0,0,0,0,0,0,1,1,0],
            'J': [0,1,1,1,1,0,0,0,0,0,0,0,0,0],
            'K': [0,0,0,0,1,1,0,0,0,1,1,0,0,1],
            'L': [0,0,0,1,1,1,0,0,0,0,0,0,0,0],
            'M': [0,1,1,0,1,1,0,0,1,0,0,0,0,1],
            'N': [0,1,1,0,1,1,0,0,0,0,0,0,1,1],
            'O': [1,1,1,1,1,1,0,0,0,0,0,0,0,0],
            'P': [1,1,0,0,1,1,1,0,0,0,0,0,0,0],
            'Q': [1,1,1,1,1,1,0,0,0,0,0,0,0,1],
            'R': [1,1,0,0,1,1,1,0,0,0,0,0,0,1],
            'S': [1,0,1,1,0,1,1,0,0,0,0,0,0,0],
            'T': [1,0,0,0,0,0,0,0,0,0,0,1,1,0],
            'U': [0,1,1,1,1,1,0,0,0,0,0,0,0,0],
            'V': [0,1,1,0,1,1,0,0,0,0,0,0,0,0],
            'W': [0,1,1,0,1,1,0,0,0,0,0,0,1,1],
            'X': [0,0,0,0,0,0,0,0,1,0,0,0,1,1],
            'Y': [0,1,1,0,0,0,0,0,1,0,0,0,1,0],
            'Z': [1,0,0,1,0,0,0,0,0,0,0,0,1,0],

            // Lettres minuscules
            'a': [1,1,1,1,1,0,1,0,0,0,0,0,0,0],
            'b': [0,0,1,1,1,1,1,0,0,0,0,0,0,0],
            'c': [0,0,0,1,1,0,1,0,0,0,0,0,0,0],
            'd': [0,1,1,1,1,0,1,0,0,0,0,0,0,0],
            'e': [1,0,0,1,1,0,1,0,0,0,0,0,0,0],
            'f': [1,0,0,0,0,0,1,0,0,0,0,1,0,0],
            'g': [1,1,1,1,0,0,1,0,0,0,0,0,0,0],
            'h': [0,0,1,0,1,1,1,0,0,0,0,0,0,0],
            'i': [0,0,0,0,0,0,0,0,0,0,0,1,0,0],
            'j': [0,1,1,1,0,0,0,0,0,0,0,0,0,0],
            'k': [0,0,0,0,1,1,0,0,0,1,1,0,0,0],
            'l': [0,0,0,0,0,0,0,0,0,0,0,1,1,0],
            'm': [0,0,1,0,1,0,1,0,0,0,0,0,0,0],
            'n': [0,0,1,0,1,0,1,0,0,0,0,0,0,0],
            'o': [0,0,1,1,1,0,1,0,0,0,0,0,0,0],
            'p': [1,0,0,0,1,1,1,0,0,0,0,0,0,0],
            'q': [1,1,1,0,1,0,1,0,0,0,0,0,0,0],
            'r': [0,0,0,0,1,0,1,0,0,0,0,0,0,0],
            's': [1,0,1,1,0,1,0,0,0,0,0,0,0,0],
            't': [0,0,0,1,1,1,0,0,0,0,0,1,0,0],
            'u': [0,1,1,1,1,0,0,0,0,0,0,0,0,0],
            'v': [0,1,1,0,1,0,0,0,0,0,0,0,0,0],
            'w': [0,1,1,0,1,0,0,0,0,0,0,0,1,1],
            'x': [0,0,0,0,0,0,0,0,1,0,0,0,1,1],
            'y': [0,1,1,1,0,0,0,0,0,0,1,0,0,0],
            'z': [1,0,0,1,0,0,0,0,0,0,0,0,1,0]
        };

        this.characters = '0123456789abcdefghijklmnopqrstuvwxyz';
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

    toggleCase() {
        this.isUpperCase = !this.isUpperCase;
        this.updateDisplay();
    }

    start() {
        this.index = 0;
        this.interval = setInterval(() => {
            this.index = (this.index + 1) % this.characters.length;
            this.updateDisplay();
        }, 800);
    }

    stop() {
        clearInterval(this.interval);
        this.index = 0;
    }

    getCurrentCharacter() {
        let char = this.characters[this.index];
        if (this.isUpperCase && isNaN(char)) {
            char = char.toUpperCase();
        }
        return char;
    }

    getSegments() {
        if (!this.power) {
            return {fa:0, fb:0, fc:0, fd:0, fe:0, ff:0, fg:0, fh:0, fi:0, fj:0, fk:0, fl:0, fm:0, fn:0};
        }

        const char = this.characters[this.index];
        const displayChar = (this.isUpperCase && isNaN(char)) ? char.toUpperCase() : char;
        const seg = this.decoder[displayChar] || [0,0,0,0,0,0,0,0,0,0,0,0,0,0];

        return {
            fa:seg[0], fb:seg[1], fc:seg[2], fd:seg[3],
            fe:seg[4], ff:seg[5], fg:seg[6], fh:seg[7],
            fi:seg[8], fj:seg[9], fk:seg[10], fl:seg[11],
            fm:seg[12], fn:seg[13]
        };
    }

    updateDisplay() {
        const segments = this.getSegments();

        Object.keys(segments).forEach(id => {
            if (segments[id]) $("#"+id).addClass("on");
            else $("#"+id).removeClass("on");
        });

        const char = this.getCurrentCharacter();
        $("#power").text(this.power);
        $("#current-char").text(char);

        if (!isNaN(this.characters[this.index])) {
            $("#case-toggle").text("CHIFFRE");
        } else {
            $("#case-toggle").text(this.isUpperCase ? "MAJ" : "min");
        }
    }
}

const displaySerie = new Display14SegmentsSerie();

$(document).ready(() => {
    displaySerie.updateDisplay();
    $("#power").click(() => displaySerie.togglePower());
    $("#case-toggle").click(() => displaySerie.toggleCase());
});

// Updated decoder logic for letters i, I, K
function decoder(input) {
    switch (input) {
        case 'i':
        case 'I':
            // Logic for displaying 'i'
            break;
        case 'K':
            // Logic for displaying 'K'
            break;
        // other cases...
        default:
            // Default logic
    }
}

