class ScoreSheet {

    constructor() {
        this.players = [
            document.querySelectorAll('[data-score-sheet]>div>div:nth-child(2) span'),
            document.querySelectorAll('[data-score-sheet]>div>div:nth-child(3) span'),
            document.querySelectorAll('[data-score-sheet]>div>div:nth-child(4) span'),
            document.querySelectorAll('[data-score-sheet]>div>div:nth-child(5) span'),
            document.querySelectorAll('[data-score-sheet]>div>div:nth-child(6) span'),
        ]
    }

    clear() {
        this.players.forEach(pl => {
            pl.forEach((el, i) => {
                if (i !== 0 || settingsClearNames.checked === true)
                    el.innerHTML = ""
            })
        })
    }

    getPlayerName(id) {
        return this.players[id - 1][0].innerHTML
    }
}

class Modal {
    constructor(id) {
        this.id = id
        this.element = document.querySelector(`dialog#${id}`)
        this.element.addEventListener('close', () => {
            if (id == 'settings') return
            this.target.querySelector('span').innerHTML = this.element.querySelector('[data-result]').value
        })
    }
    open(target) {
        this.target = target
        const playerNumber = target.dataset.playerNumber
        const playerName = playerNumber ? scoreSheet.getPlayerName(playerNumber) : null
        if (!playerName && (this.id == 'calculator' || this.id == 'score')) return
        const parentRow = target.closest('[data-score]')
        const scoreName = parentRow ? parentRow.dataset.score : ''
        switch (this.id) {
            case 'player':
                this.element.querySelector('[data-variable=player_number]').innerHTML = playerNumber
                this.element.querySelector('#player_name').value = target.querySelector('span').innerHTML
                this.element.querySelector('#player_name').select()
                break
            case 'calculator':
            case 'score':
                this.element.querySelector('[data-result]').value = target.querySelector('span').innerHTML
                if (this.id == 'score') this.element.querySelector('[data-result]').select()
                this.element.querySelector('[data-variable=player_name]').innerHTML = playerName
                this.element.querySelector('[data-variable=score_name]').innerHTML = scoreName
                break

        }
        this.element.showModal()
    }
}

const scoreSheet = new ScoreSheet()
const settingsUseCalculator = document.querySelector('input#use_calculator')
const settingsClearNames = document.querySelector('input#clear_names')
const modals = {
    'settings': new Modal('settings'),
    'player': new Modal('player'),
    'calculator': new Modal('calculator'),
    'score': new Modal('score'),
}


document.addEventListener('click', ev => {
    const openSelector = '[data-open-modal]'
    if (ev.target.matches(`${openSelector}, ${openSelector} *`)) {
        const modalId = ev.target.closest(openSelector).dataset.openModal
        if (modals[modalId]) modals[modalId].open(ev.target.closest(openSelector))
        return
    }
    if (ev.target.closest('form[method="dialog"]') === null) {
        document.querySelectorAll('dialog[open]').forEach(dialog => dialog.close())
    }
    if (ev.target.closest('button#trash') !== null) {
        scoreSheet.clear()
    }
})

settingsUseCalculator.addEventListener('change', (ev) => {
    if (ev.target.checked) {
        document.querySelectorAll('[data-open-modal="score"]').forEach(el => el.dataset.openModal = 'calculator')
    } else {
        document.querySelectorAll('[data-open-modal="calculator"]').forEach(el => el.dataset.openModal = 'score')
    }
})



