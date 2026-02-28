class RemoteControl {

    constructor() {
        this.power = 0;
        this.volume = 20;
        this.channel = 1;
        this.mute = 0;
        this.battery = 100;

        this.channelInput = ""; // pour clavier numérique
        this.updateDisplay();
    }

    togglePower() {
        this.power = this.power ? 0 : 1;
        this.updateDisplay();
    }

    channelUp() {
        if(!this.power) return;
        this.channel = this.channel < 99 ? this.channel + 1 : 1;
        this.updateDisplay();
    }

    channelDown() {
        if(!this.power) return;
        this.channel = this.channel > 1 ? this.channel - 1 : 99;
        this.updateDisplay();
    }

    volumeUp() {
        if(!this.power) return;
        if(this.volume < 100) this.volume++;
        this.mute = 0;
        this.updateDisplay();
    }

    volumeDown() {
        if(!this.power) return;
        if(this.volume > 0) this.volume--;
        this.updateDisplay();
    }

    toggleMute() {
        if(!this.power) return;
        this.mute = this.mute ? 0 : 1;
        this.updateDisplay();
    }

    enterDigit(d) {
        if(!this.power) return;
        if(this.channelInput.length<2) this.channelInput += d;
        this.updateDisplay();
    }

    confirmChannel() {
        if(!this.power) return;
        const ch = parseInt(this.channelInput);
        if(ch>=1 && ch<=99) this.channel = ch;
        this.channelInput = "";
        this.updateDisplay();
    }

    selectFavorite(fav) {
        if(!this.power) return;
        this.channel = fav;
        this.updateDisplay();
    }

    updateDisplay() {
        $("#power-state").text(this.power ? "ON" : "OFF");
        $("#channel").text(this.channelInput || this.channel);
        $("#volume").text(this.mute ? 0 : this.volume);
        $("#mute-indicator").text(this.mute ? "MUTE" : "");
        $("#battery").text(`🔋${this.battery}%`);
    }
}

const remote = new RemoteControl();

$(document).ready(()=>{

    // Contrôles principaux
    $("#power").click(()=> remote.togglePower());
    $("#ch-up").click(()=> remote.channelUp());
    $("#ch-down").click(()=> remote.channelDown());
    $("#vol-up").click(()=> remote.volumeUp());
    $("#vol-down").click(()=> remote.volumeDown());
    $("#mute").click(()=> remote.toggleMute());

    // Clavier numérique
    $(".num").click(e=> remote.enterDigit($(e.target).data("val")));
    $("#ok").click(()=> remote.confirmChannel());

    // Chaînes favorites
    $(".fav").click(e=> remote.selectFavorite($(e.target).data("val")));
});