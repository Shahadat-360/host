function regularExpChecker(variable) {
    let inp = prompt(`Enter Your ${variable} : `)
    let re;
    if (variable === 'Email') {
        re = /^([a-zA-Z0-9].?)+[^.]@([a-zA-Z0-9].?)+[^.]$/;
    }
    if (variable === 'Phone') {
        re = /^(\+)?(88)?01\d{9}$/;
    }
    if (variable === 'PostCode') {
        re = /^\d{4}$/;
    }
    if (re.test(inp)) {
        alert('Valid')
    }
    else alert('Invalid');
}

document.getElementById('email').addEventListener('click', call);
document.getElementById('phone').addEventListener('click', call1);
document.getElementById('postCode').addEventListener('click', call2);

function call() {
    regularExpChecker('Email');
}
function call1() {
    regularExpChecker('Phone');
}
function call2() {
    regularExpChecker('PostCode');
}