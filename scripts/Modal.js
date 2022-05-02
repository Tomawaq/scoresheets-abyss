import Calculator from "./Calculator.js"

export default class Modal {
    params = {
        id: false,
        selector: false,
        btnOpen: false,
        btnClose: false,
        onOpen: false,
        onClose: false,
    }
    default = {
        setWithId: ['selector', 'btnOpen', 'btnClose'],
        selector: (id) => `dialog#${id}`,
        btnOpen: (id) => `[data-open-modal=${id}]`,
        btnClose: (id) => `[data-close-modal=${id}]`,
    }
    constructor(params = {}) {
        if (typeof params == 'object') this.params = { ...this.params, ...params }
        if (typeof params == 'string') this.params.id = params

        if (!this.params.id) return console.warn('Modal need to have an id')
        this.default.setWithId.forEach(v => this.params[v] = this.params[v] === false ? this.default[v](this.params.id) : this.params[v])

        this.dialog = document.querySelector(this.params.selector)
        if (!this.dialog) return console.warn(`Unable to find dialog selected by "${this.params.selector}"`)

        document.addEventListener('click', ev => {

            if (ev.target.closest(this.params.btnOpen))
                return this.open(ev)

            if (ev.target.closest(this.params.btnClose)
                || (this.dialog.open && !ev.target.matches(this.params.selector + ` *`)))
                return this.dialog.close()
        })

        this.dialog.addEventListener('close', ev => {

            if(this.params.onClose) return this.params.onClose(this.dialog, ev) !== false

        })
    }

    open(ev) {
        if(!this.params.onOpen || this.params.onOpen(this.dialog, ev) !== false)
            this.dialog.showModal()
    }
}