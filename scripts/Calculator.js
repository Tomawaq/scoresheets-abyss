export default class Calculator {
    constructor(selector) {
        const element = document.querySelector(selector)
        this.result = element.querySelector('[data-result]')
        element.querySelectorAll('[data-number]').forEach(n => n.addEventListener('click', () => this.result.value += n.innerHTML))
        element.querySelectorAll('[data-operator]').forEach(o => o.addEventListener('click', () => this.result.value += o.innerHTML))
        element.querySelectorAll('[data-parenthesis]').forEach(e => e.addEventListener('click', () => this.parenthesis()))
        element.querySelectorAll('[data-equal]').forEach(e => e.addEventListener('click', () => this.compute()))
        element.querySelectorAll('[data-back]').forEach(e => e.addEventListener('click', () => this.result.value = this.result.value.substr(0,this.result.value.length - 1)))
        element.querySelectorAll('[data-clear]').forEach(e => e.addEventListener('click', () => this.result.value = ''))
    }

    parenthesis() {
        this.result.value += this.parenthesisOpened ? ')' : '('
        this.parenthesisOpened = !this.parenthesisOpened
    }

    compute() {
        let result
        try {
            result = eval(this.result.value.replace('x', '*'))
        } catch (error) {
        }
        this.result.value = result ?? ''
    }
}