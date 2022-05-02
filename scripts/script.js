import ScoreSheet from './ScoreSheet.js'
import Modal from './Modal.js'
import Calculator from './Calculator.js'

const scoreSheet = new ScoreSheet()
const calculator = new Calculator('dialog#calculator')

const onOpenScoreModal = (dialog, ev) => {
    const playerNumber = scoreSheet.getPlayerId(ev.target)
    const playerName = scoreSheet.getPlayerName(playerNumber)
    if(!playerName) return false
    const playerScore = scoreSheet.getScoreId(ev.target)
    dialog.dataset.playerNumber = playerNumber
    dialog.dataset.playerScore = playerScore
    dialog.querySelector('[data-variable=player_name]').innerHTML = playerName
    dialog.querySelector('[data-variable=score_name]').innerHTML = scoreSheet.getScoreName(playerScore)
    dialog.querySelector('input[data-result]').value = scoreSheet.getPlayerScore(playerNumber, playerScore)
}
const onCloseScoreModal = (dialog, ev) => {
    const result = dialog.querySelector('input[data-result]').value
    scoreSheet.setPlayerScore(dialog.dataset.playerNumber, dialog.dataset.playerScore, result)
    if(document.querySelector('input#auto_total').checked)
        scoreSheet.calcTotal()
}
new Modal('settings')
new Modal({
    id: 'player',
    onOpen: (dialog, ev) => {
        const playerNumber = scoreSheet.getPlayerId(ev.target)
        dialog.dataset.playerNumber = playerNumber
        dialog.querySelector('[data-variable=player_number]').innerHTML = playerNumber
        dialog.querySelector('#player_name').value = scoreSheet.getPlayerName(playerNumber)
        dialog.querySelector('#player_name').select()
    },
    onClose: dialog => {
        const newName = dialog.querySelector('input#player_name').value
        scoreSheet.setPlayerName(dialog.dataset.playerNumber, newName)
    },
})
new Modal({
    id: 'calculator',
    onOpen: onOpenScoreModal,
    onClose: (dialog, ev) => {
        if(calculator.compute() === false) return false
        if(onCloseScoreModal(dialog, ev) === false) return false
    }
})
new Modal({
    id: 'score',
    onOpen: onOpenScoreModal,
    onClose: onCloseScoreModal
})

document.addEventListener('click', ev => {
    if (ev.target.closest('button#trash') !== null) {
        scoreSheet.clear(document.querySelector('input#clear_names').checked)
    }
})

document.querySelector('input#use_calculator').addEventListener('change', (ev) => {
    if (ev.target.checked) {
        document.querySelectorAll('[data-open-modal="score"]').forEach(el => el.dataset.openModal = 'calculator')
    } else {
        document.querySelectorAll('[data-open-modal="calculator"]').forEach(el => el.dataset.openModal = 'score')
    }
})

document.querySelector('.row.total>div:first-child').addEventListener('click', () => scoreSheet.calcTotal())


