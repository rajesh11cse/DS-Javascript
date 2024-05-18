const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Please Enter a sting : ', (answer) => {
    //console.log(`Thank you for your valuable feedback: ${answer}`);
    console.log(getfirstNonRepeatingChar(answer))
});


function getfirstNonRepeatingChar(number) {
    console.log("___________________  Output  ____________________")

    let flags = new Uint8Array(256); //all is initialized by 0 
    // OR
// let flags = new Array(256).fill(0);

console.log(flags)
    
    for (var i = 0; i < number.length; i++) { // O(n)
        flags[parseInt(number.charCodeAt(i))]++;
    }

    for (var i = 0; i < number.length; i++) { // O(n)
        if (flags[number.charCodeAt(i)] == 1)
            return number.charAt(i);
    }

    return null;
}

// example = raarjesjh
// r-2
// a-2
// j-2
// e-1
// s-1
// h-1

