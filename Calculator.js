export default class Calculator {
    constructor(primaryOperandDisplay, secondaryOperandDisplay, operationDisplay){
        this.#primaryOperandDisplay = primaryOperandDisplay,
        this.#secondaryOperandDisplay = secondaryOperandDisplay,
        this.#operationDisplay = operationDisplay
        this.clear()

    }
    #primaryOperandDisplay
    #secondaryOperandDisplay 
    #operationDisplay
    
    get primaryOperand (){
        return parseFloat(this.#primaryOperandDisplay.dataset.value)
    }
    set primaryOperand(value){
        this.#primaryOperandDisplay.dataset.value = value ?? ''
        this.#primaryOperandDisplay.textContent = displayNumber(value)
    }
    get secondaryOperand(){
        return this.#secondaryOperandDisplay.textContent
    }
    set secondaryOperand(value){
        this.#secondaryOperandDisplay.dataset.value = value ?? ''
        this.#secondaryOperandDisplay.textContent = displayNumber(value)
    }
    get operation(){
        return this.#operationDisplay.textContent
    }
    set operation(value){
        this.#operationDisplay.textContent = value ?? ''
    }

   
    addDigit(digit){
        if(digit === '' && this.#primaryOperandDisplay.dataset.value.include('.')) return 
        if(this.primaryOperand === 0){
            this.primaryOperand = digit
            return
        }
        this.primaryOperand = this.#primaryOperandDisplay.dataset.value + digit //adding numbers together
    }
    removeDigit(digit){
        const numberString = this.#primaryOperandDisplay.dataset.value
        if(numberString.length <= 1){
            this.primaryOperand  = 0
            return
        }
        this.primaryOperand = numberString.substring(0, numberString.length - 1)
    }
    evaluate(){
        let result
        switch(this.operation){
            case '*':
                result = this.secondaryOperand * this.primaryOperand
                break
            case '÷':
                result = this.secondaryOperand / this.primaryOperand
                break
            case '-':
                result = this.secondaryOperand - this.primaryOperand
                break

            case '+':
                result = this.secondaryOperand + this.primaryOperand
                break
            default: return               
                
        }
        this.clear()
        this.primaryOperand = result
        return result
    }
    chooseOperation(operation){
        if(this.operation !== '') return 
        this.operation = operation
        this.secondaryOperand = this.primaryOperand 
        this.primaryOperand = 0
     
    }
   
    clear(){
        this.primaryOperand = 0
        this.secondaryOperand = null
        this.operation = null
        
    }

}
const number_FORMATTER = new Intl.NumberFormat("en", {
    maximumFractionDigits: 20
})

function displayNumber(number){
    const stringNumber = number?.toString() || ''
    if(stringNumber === '') return ''
    const[integer, decimals] = stringNumber.split('.')
    const formmatedInteger = number_FORMATTER.format(integer)
    if(decimals == null) return  formmatedInteger
    return formmatedInteger + '.' + decimals

}