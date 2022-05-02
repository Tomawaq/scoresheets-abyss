export default class ScoreSheet {

    constructor() {
        this.players = [
            document.querySelectorAll('[data-score-sheet]>div>div:nth-child(2) span'),
            document.querySelectorAll('[data-score-sheet]>div>div:nth-child(3) span'),
            document.querySelectorAll('[data-score-sheet]>div>div:nth-child(4) span'),
            document.querySelectorAll('[data-score-sheet]>div>div:nth-child(5) span'),
            document.querySelectorAll('[data-score-sheet]>div>div:nth-child(6) span'),
        ]
    }

    clear(includeNames) {
        this.players.forEach(pl => {
            pl.forEach((el, i) => {
                if (i !== 0 || includeNames === true)
                    el.innerHTML = ""
            })
        })
    }

    calcTotal(id = -1) {
        if (id == -1)
            return this.players.forEach((p, i) => this.calcTotal(i))

        if (this.players[id][0].innerHTML == '') return
        this.players[id][5].innerHTML = ''
        this.players[id][5].innerHTML = Array.from(this.players[id]).reduce((total, element) => {
            const score = parseInt(element.innerHTML)
            if (!isNaN(score)) total += score
            return total
        }, 0)
    }

    getPlayerId(element) {
        if (element.dataset.playerNumber !== undefined) return element.dataset.playerNumber
        const closest = element.closest('[data-player-number]')
        if (closest) return closest.dataset.playerNumber
        return null
    }
    getScoreId(element) {
        const target = element.closest('[data-player-number]')
        const playerId = target.dataset.playerNumber
        let result = -1
        document.querySelectorAll(`[data-player-number="${playerId}"]`).forEach((el, i) => {
            if (el == target) result = i
        })
        return result
    }
    getPlayerName(id) {
        if (isNaN(id)) id = this.getPlayerId(id)
        return this.players[id - 1][0].innerHTML
    }
    setPlayerName(id, name) {
        this.players[id - 1][0].innerHTML = name
    }
    getScoreName(scoreId) {
        switch (scoreId) {
            case 1: return 'Locations'
            case 2: return 'Lords'
            case 3: return 'Allies'
            case 4: return 'Monsters'
        }
    }
    getPlayerScore(id, scoreId) {
        return this.players[id - 1][scoreId].innerHTML
    }
    setPlayerScore(id, scoreId, score) {
        this.players[id - 1][scoreId].innerHTML = score
    }
}