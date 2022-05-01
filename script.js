
document.addEventListener('click', ev => {
    const openSelector = '[data-open-modal]'
    const closeSelector = '[data-close-modal]'
    if (ev.target.matches(`${openSelector}, ${openSelector} *`)) {
        const modal = document.querySelector('dialog#' + ev.target.closest(openSelector).dataset.openModal)
        if (modal) modal.showModal()
        return
    }
    if (ev.target.matches(`${closeSelector}, ${closeSelector} *`)) {
        const modal = document.querySelector('dialog[open]')
        if (modal) modal.close()
        return
    }
    if(ev.target.closest('form[method="dialog"]') === null) {
        document.querySelectorAll('dialog[open]').forEach( dialog => dialog.close() )
    }
})

document.querySelector('input#use_calculator').addEventListener('change', (ev) => {
    if(ev.target.checked) {
        document.querySelectorAll('[data-open-modal="score"]').forEach(el => el.dataset.openModal = 'calculator')
    }else {
        document.querySelectorAll('[data-open-modal="calculator"]').forEach(el => el.dataset.openModal = 'score')
    }
})