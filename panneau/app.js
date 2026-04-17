class PlayerManager {

    constructor() {
        this.playersQueue = [];
        this.currentPlayer = null;
    }

    addPlayer(name) {
        name = name.trim();

        if (name === "") {
            alert("Veuillez entrer un nom valide !");
            return;
        }

        this.playersQueue.push(name);
        this.updateDisplay();
    }

    nextPlayer() {

        if (this.playersQueue.length === 0 && this.currentPlayer === null) {
            alert("Aucun joueur dans la file !");
            return;
        }

        // Remet le joueur actuel à la fin
        if (this.currentPlayer !== null) {
            this.playersQueue.push(this.currentPlayer);
        }

        // Passe au suivant
        this.currentPlayer = this.playersQueue.shift() || null;

        this.updateDisplay();
    }

    updateDisplay() {

        $("#current").text(this.currentPlayer || "Aucun");

        $("#queueList").empty();

        if (this.playersQueue.length === 0) {
            $("#queueList").append("<li>Aucun joueur en attente</li>");
        } else {
            this.playersQueue.forEach((player, index) => {
                $("#queueList").append(`
                    <li>
                        ${player}
                        <button class="remove" data-index="${index}">❌</button>
                    </li>
                `);
            });
        }

        // Désactiver bouton si aucun joueur
        $("#nextPlayer").prop(
            "disabled",
            this.playersQueue.length === 0 && this.currentPlayer === null
        );
    }

    removePlayer(index) {
        this.playersQueue.splice(index, 1);
        this.updateDisplay();
    }
}

const manager = new PlayerManager();

// Ajouter joueur
$("#addPlayer").click(() => {
    const name = $("#playerName").val();
    manager.addPlayer(name);
    $("#playerName").val("");
});

// Joueur suivant
$("#nextPlayer").click(() => {
    manager.nextPlayer();
});

// Entrée clavier
$("#playerName").keypress(function(e) {
    if (e.which === 13) {
        $("#addPlayer").click();
    }
});

// Supprimer joueur (event dynamique)
$(document).on("click", ".remove", function() {
    const index = $(this).data("index");
    manager.removePlayer(index);
});

// Initialisation
manager.updateDisplay();