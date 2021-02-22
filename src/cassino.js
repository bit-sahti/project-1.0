class Cassino {
    constructor() {
        this.startGame = document.querySelector('.start')
        this.playerHit = document.querySelector('.hit')
        this.playerStand = document.querySelector('.stand')
        this.playerCash = document.querySelector('.cash')
        this.playerBet = document.querySelector('.bet')
    }

    listen() {
        this.startGame.addEventListener('click', () => dealer.start(deck, [player, dealer]))
        this.playerHit.addEventListener('click', () => dealer.hit(deck, player))
        this.playerStand.addEventListener('click', () => dealer.resolve(deck, player))
    }

    generateChips(values) {
        const chipsContainer = document.querySelector('.chips')
        
        for (let i = 0; i < values.length; i++) {
            const newChip = document.createElement('button')
            newChip.setAttribute('id', `${values[i]}`)
            chipsContainer.appendChild(newChip).innerHTML = `${values[i]}`
        }

        this.waitBet()
    }

    waitBet() {
        const chips = document.querySelectorAll('.chips button')

        for (let i = 0; i < chips.length; i++) {
            chips[i].addEventListener('click', () => {
                const amount = Number(chips[i].innerHTML)
                player.makeBet(amount)
                this.playerBet.innerHTML = `Bet: ${player.bet}`
            })
        }
    }

    removeChips() {
        const chipsContainer = document.querySelector('.chips')

        while(chipsContainer.firstChild) {
            chipsContainer.removeChild(chipsContainer.lastChild)
        }
    }

    handCard(card, player) {
        const playerHand = document.querySelector(`.${player.type} .hand`)
        const cardDiv = document.createElement('div')

        cardDiv.setAttribute('class', 'card') 
        cardDiv.classList.add(`${card.suit}`)
        cardDiv.innerHTML = `
            <div class="top">
                <span>${card.name ? card.name : card.value}</span>
                <span>${card.suitSymbol}</span> 
            </div>
            <span>${card.suitSymbol}</span>
            <div class="bottom">
                <span>${card.suitSymbol}</span> 
                <span>${card.name ? card.name : card.value}</span>
            </div>
        `

        // console.log(cardDiv.innerHTML);
      

        playerHand.appendChild(cardDiv)
    }

    discartCards(players) {
        players.forEach(player => {
            const playerHand = document.querySelector(`.${player.type} .hand`)

            while (playerHand.firstChild) {
                playerHand.removeChild(playerHand.lastChild)
            }
        });
    }

    updateCash(amount) {
        this.playerCash.innerHTML = `Cash: ${amount}`
    }
}

const cassino = new Cassino();
cassino.listen()
// cassino.generateChips([25, 100, 250, 500, 1000])
// cassino.handCard(deck, player)