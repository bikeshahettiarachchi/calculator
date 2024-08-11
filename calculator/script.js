const keys = document.querySelectorAll('.key');
const display_input = document.querySelector('.display .input');
const display_output = document.querySelector('.display .output');
const input1 = document.getElementById('input1');
const input2 = document.getElementById('input2');
const dropdownItems = document.querySelectorAll('.dropdown-item');

let selectedOperator = '';
let input = "";

for (let key of keys) {
    const value = key.dataset.key;

    key.addEventListener('click', () => {
        if (value == "clear") {
            input = "";
            display_input.innerHTML = "";
            display_output.innerHTML = "";
        } else if (value == "backspace") {
            input = input.slice(0, -1);
            display_input.innerHTML = CleanInput(input);
        } else if (value == "=") {
            let result = eval(input);

            display_output.innerHTML = cleanOutput(result);
        } else if (value == "brackets") {
            if (
                input.indexOf("(") == -1 ||
                input.indexOf("(") != -1 &&
                input.indexOf(")") != -1 &&
                input.lastIndexOf("(") < input.lastIndexOf(")")
            ) {
                input += "(";
            } else if (
                input.indexOf("(") != -1 &&
                input.indexOf(")") == -1 ||
                input.indexOf("(") != -1 &&
                input.indexOf(")") == -1 &&
                input.lastIndexOf("(") > input.lastIndexOf("(")
            ) {
                input += ")";
            }

            display_input.innerHTML = CleanInput(input);
        } else {
            input += value;
            display_input.innerHTML = CleanInput(input);

        }

    })
}

function CleanInput(input) {
    let input_array = input.split("");
    let input_array_length = input_array.length;

    for (let i = 0; i < input_array_length; i++) {
        if (input_array[i] == "*") {
            input_array[i] == `<span class="key operator">*</span>`;
        } else if (input_array[i] == "/") {
            input_array[i] == `<span class="key operator">/</span>`;
        } else if (input_array[i] == "+") {
            input_array[i] == `<span class="key operator">+</span>`;
        } else if (input_array[i] == "-") {
            input_array[i] == `<span class="key operator">-</span>`;
        } else if (input_array[i] == "(") {
            input_array[i] == `<span class="brackets">(</span>`;
        } else if (input_array[i] == ")") {
            input_array[i] == `<span class="brackets">)</span>`;
        } else if (input_array[i] == "%") {
            input_array[i] == `<span class="precent">%</span>`;
        }

    }

    return input_array.join("");

}

function cleanOutput(output) {
    let output_string = output.toString();
    let decimal = output_string.split(".")[1];
    output_string = output_string.split(".")[0];

    let output_array = output_string.split("");

    if (output_array.length > 3) {
        for (let i = output_array.length - 3; i > 0; i -= 3) {
            output_array.splice(i, 0, ",");
        }
    }

    if (decimal) {
        output_array.push(".");
        output_array.push(decimal);
    }

    return output_array.join("");
}



document.addEventListener('DOMContentLoaded', (event) => {
    const switchInput = document.getElementById('flexSwitchCheckChecked');
    const originalview = document.getElementById('originalview');
    const secondview = document.getElementById('secondview');


    switchInput.addEventListener('change', () => {
        if (switchInput.checked) {
            originalview.style.display = 'none';
            secondview.style.display = 'block';
        } else {
            originalview.style.display = 'block';
            secondview.style.display = 'none';
        }
    });

    if (switchInput.checked) {
        originalview.style.display = 'none';
        secondview.style.display = 'block';
    } else {
        originalview.style.display = 'block';
        secondview.style.display = 'none';
    }
});


input1.addEventListener('input', updateSecondViewDisplay);
input2.addEventListener('input', updateSecondViewDisplay);

dropdownItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        selectedOperator = item.dataset.key;
        updateSecondViewDisplay();
    });
});

document.querySelector('.secondkey').addEventListener('click', () => {
    const value1 = input1.value;
    const value2 = input2.value;
    if (value1 && value2 && selectedOperator) {
        const result = eval(`${value1} ${selectedOperator} ${value2}`);
        display_input.innerHTML = `${value1} ${selectedOperator} ${value2}`;
        display_output.innerHTML = cleanOutput(result);

    }
});

function updateSecondViewDisplay() {
    const value1 = input1.value;
    const value2 = input2.value;
    display_input.innerHTML = `${value1}  ${selectedOperator ? ` ${selectedOperator}` : ''}${value2}`;
}

const switchInput = document.getElementById('flexSwitchCheckChecked');
if (switchInput.checked) {
    originalview.style.display = 'none';
    secondview.style.display = 'block';
} else {
    originalview.style.display = 'block';
    secondview.style.display = 'none';
};

function showModel() {
    let backdrop = document.getElementById('backdrop');
    backdrop.classList.remove('hide');
    let model = document.getElementById('model');
    model.classList.remove('hide');
    model.classList.add('showing');
    
    setTimeout(() => {
        model.classList.remove('showing');

    }, 1000);
   
}

function hideModel() {
    let backdrop = document.getElementById('backdrop');
    backdrop.classList.add('hiding');
    let model = document.getElementById('model');
    model.classList.add('hiding');
    setTimeout(() => {
        backdrop.classList.add('hide');
        backdrop.classList.remove('hiding');
    }, 1000);

    setTimeout(() => {
        model.classList.add('hide');
        model.classList.remove('hiding');
    }, 1500);

}


let showModelbutton = document.getElementById('hellow');
showModelbutton.addEventListener("click", function () {
    
    showModel();

})

let hideModelbutton = document.getElementById('close-button');
hideModelbutton.addEventListener("click", function () {
    hideModel();

}) 

