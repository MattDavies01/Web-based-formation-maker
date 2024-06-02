document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('field').addEventListener('click', placePlayer);
});

let playerCount = 0;

function placePlayer(event) {
    if (event.target.className === 'player') return; // Don't place on top of another player
    const field = document.getElementById('field');
    const rect = field.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const player = document.createElement('div');
    player.className = 'player';
    player.style.left = `${x - 25}px`;
    player.style.top = `${y - 25}px`;
    player.textContent = ++playerCount;

    player.draggable = true;
    player.ondragstart = (e) => {
        e.dataTransfer.setData('text/plain', e.target.id);
    };

    field.appendChild(player);
}

function loadFormation(formation) {
    const formations = {
        '442': [{x: 200, y: 100}, {x: 400, y: 100}, {x: 100, y: 300}, {x: 300, y: 300}, {x: 500, y: 300}, {x: 200, y: 500}, {x: 400, y: 500}, {x: 100, y: 700}, {x: 300, y: 700}, {x: 500, y: 700}],
        '352': [{x: 300, y: 100}, {x: 100, y: 300}, {x: 500, y: 300}, {x: 200, y: 400}, {x: 400, y: 400}, {x: 300, y: 500}, {x: 100, y: 600}, {x: 500, y: 600}, {x: 300, y: 700}]
    };

    clearField();
    playerCount = 0;
    formations[formation].forEach(pos => {
        const event = new MouseEvent('click', {
            clientX: pos.x,
            clientY: pos.y
        });
        document.getElementById('field').dispatchEvent(event);
    });
}

function clearField() {
    const field = document.getElementById('field');
    while (field.firstChild) {
        field.removeChild(field.firstChild);
    }
}

function saveFormation() {
    const players = document.getElementsByClassName('player');
    const formation = [];
    for (const player of players) {
        formation.push({
            x: parseInt(player.style.left) + 25,
            y: parseInt(player.style.top) + 25
        });
    }
    localStorage.setItem('savedFormation', JSON.stringify(formation));
}

function loadSavedFormation() {
    const savedFormation = JSON.parse(localStorage.getItem('savedFormation'));
    if (!savedFormation) return;
    
    clearField();
    playerCount = 0;
    savedFormation.forEach(pos => {
        const event = new MouseEvent('click', {
            clientX: pos.x,
            clientY: pos.y
        });
        document.getElementById('field').dispatchEvent(event);
    });
}
