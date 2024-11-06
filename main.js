// CLASSE CALCOLATRICE

class Calculator {
  constructor() {
    this.numbers = []; // il calcolatore ha un array di numeri
    this.operation = ""; // e una tipologia di operazione
  }
  addNumber(number) {
    this.numbers.push(number); // aggiunge un numero all'array di numeri
    // console.log(this.numbers);
  }
  selectOperation(operation) {
    // seleziona l'operazione
    this.operation = operation;
  }

  result() {
    console.log(this.numbers);
    let operationResult;

    if (this.numbers.length < 2 || !this.operation) {
      // se l'array ha meno di due numeri manda a schermo l'errore
      throw new Error("Please provide at least two numbers and an operation.");
    }

    switch (
      this.operation //switch con vario tipo di operazioni
    ) {
      case "+":
        operationResult = 0; // per l'addizione metti l'accumulatore a 0
        for (let i = 0; i < this.numbers.length; i++) {
          operationResult += this.numbers[i];
        }
        break;

      case "-":
        operationResult = this.numbers[0]; // per la sottrazione parti con il primo numero da sottrare e
        // fai partire il ciclo dal secondo numero
        for (let i = 1; i < this.numbers.length; i++) {
          operationResult -= this.numbers[i];
        }
        break;

      case "*":
        operationResult = 1; // Start con 1 piuttosto che 0 per la moltiplicazione per non ottener come risultato 0
        for (let i = 0; i < this.numbers.length; i++) {
          operationResult *= this.numbers[i];
        }
        break;

      case "/":
        operationResult = this.numbers[0]; // comincia col primo numero e fai partire il ciclo dal secondo
        for (let i = 1; i < this.numbers.length; i++) {
          if (this.numbers[i] === 0) {
            throw new Error("Division by zero is not allowed.");
          }
          operationResult /= this.numbers[i];
        }
        break;

      default:
        throw new Error("Unsupported operation.");
    }

    return operationResult;
  }
}

// ELEMENTI

const btnNumbers = document.querySelectorAll(".numbers");
const resultDisplay = document.getElementById("result");
const btnOperation = document.querySelectorAll(".operation");
const btnResult = document.getElementById("=");
const btnErase = document.getElementById("erase");

let calculation = "";
let currentValue = 0;
const calculator = new Calculator();

function getNumber() {
  btnNumbers.forEach((number) => {
    number.addEventListener("click", () => {
      currentValue = parseInt(resultDisplay.innerText); // il valore corrente è il testo contenuto nel display
      let newValue = number.textContent; // Il nuovo valore che verrà inserito è il contenuto del bottone numerico
      if (currentValue != 0) {
        // se il corrente valore è diverso da 0 somma le stringhe di testo del valore corrente
        // e del bottone inserito
        resultDisplay.innerText = currentValue + newValue;
      } else {
        resultDisplay.innerText = newValue;
        // sennò cambia il valore corrente col nuovo valore
      }
      currentValue = parseInt(resultDisplay.innerText); // converti il valore stringa del display in un numero e inseriscilo
      // in currentValue
      console.log(currentValue);

      // reset
      btnErase.addEventListener("click", () => {
        resultDisplay.innerText = 0;
        currentValue = 0;
        console.log(`dopo il reset ${currentValue}`);
        calculator.numbers = [];
        console.log(calculator.numbers);
      });
    });
  });
}

// Gestione delle operazioni
function getOperation() {
  btnOperation.forEach((operation) => {
    operation.addEventListener("click", () => {
      const selectedOperation = operation.textContent;

      if (resultDisplay.innerText !== "0") {
        calculator.addNumber(parseFloat(resultDisplay.innerText));
      }

      calculator.selectOperation(selectedOperation);
      resultDisplay.innerText = "0";

      console.log(`Operazione selezionata: ${selectedOperation}`);
    });
  });
}

getNumber();
getOperation();

btnResult.addEventListener("click", () => {
  calculator.addNumber(parseFloat(resultDisplay.innerText));
  resultDisplay.innerText = calculator.result();
  console.log(`il risultato è: ${resultDisplay.innerText}`);
  calculator.numbers = [];
  console.log("array svuotato: ", calculator.numbers);
});
