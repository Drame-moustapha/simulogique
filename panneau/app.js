class PlayerManager {

    constructor() {
        this.playersQueue = [];
        this.currentPlayer = null;
    }

    addPlayer(name) {
        if(name.trim() === "") return;
        this.playersQueue.push(name);
        this.updateDisplay();
    }

    nextPlayer() {

        // Si un joueur joue, il retourne à la fin
        if(this.currentPlayer !== null) {
            this.playersQueue.push(this.currentPlayer);
        }

        // Nouveau joueur
        this.currentPlayer = this.playersQueue.shift() || null;

        this.updateDisplay();
    }

    updateDisplay() {

        $("#current").text(this.currentPlayer || "Aucun");

        $("#queueList").empty();
        this.playersQueue.forEach(player => {
            $("#queueList").append(`<li>${player}</li>`);
        });
    }
}

const manager = new PlayerManager();

$("#addPlayer").click(()=>{
    const name = $("#playerName").val();
    manager.addPlayer(name);
    $("#playerName").val("");
});

$("#nextPlayer").click(()=>{
    manager.nextPlayer();
});