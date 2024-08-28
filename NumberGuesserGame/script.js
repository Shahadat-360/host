let label = document.getElementById('guessLabel');
let input = document.getElementById('guessInput');
let button = document.getElementById('btn');
let resetBtn = document.getElementById('resetBtn');
let low = 1, high = 10;
let num = Math.floor(Math.random() * high) + low;
label.innerHTML = `Guess a Number in between ${low} and ${high}`;

// event listener 
let tried = 0;
button.addEventListener('click', checker);
resetBtn.addEventListener('click', restart);


// function declaration 
function checker() {
    let inp = parseInt(input.value);
    if (document.querySelector('.alert') !== null) document.querySelector('.alert').remove();
    if (isNaN(inp)||inp<1||inp>10) {
        showAlert('Please insert correct value', 'error',tried);
    }
    else {
        if (tried == 3) {
            showAlert('You lose!', 'lose',tried)
            disableGame();
        }
        else if (inp === num) {
            showAlert('You Win','win',tried);
            disableGame();
        }
        else if (inp > num) {
            showAlert('Correct answer is smaller!','notice',tried);
        }
        else {
            showAlert('Correct answer is greater!','notice',tried);
        }
        tried++;
    }
}

function disableGame() {
    input.disabled = true;
    button.disabled = true;
    setTimeout(() => {
        document.querySelector('.alert').remove();
        showAlert('Restart the game if you want to play again', 'notice')
        resetBtn.style.display = "block";
        button.style.display = "none";
    },3000)
}

function restart(e) {
    num = Math.floor(Math.random() * high) + low;
    setTimeout(() => {
        document.querySelector('.alert').remove();
        input.disabled = false;
        button.disabled = false;
        button.style.display = 'block';
        resetBtn.style.display = 'none';
        tried = 0;
        inp = 0;
        input.value = '';
    }, 1000);
}


function showAlert(message,className,tried=undefined) {
    let div = document.createElement('div');
    let container = document.querySelector('.container');
    let label = document.getElementById('guessLabel');
    div.className = `alert ${className}`;
    if (tried === undefined) {
        div.appendChild(document.createTextNode(message));
    }
    else div.appendChild(document.createTextNode(message+`  (Attempted:${tried} Left:${3-tried})`));
    container.insertBefore(div, label);
}