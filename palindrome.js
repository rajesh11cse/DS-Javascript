const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Please Enter a number : ', (answer) => {
    //console.log(`Thank you for your valuable feedback: ${answer}`);
    if(isPalindrome(answer)){
        console.log("Yes")
    }else{
        console.log("No")
    }
    rl.close();
});


function isPalindrome(number) {
    console.log("___________________  Output  ____________________")
    var palindrome = number;
    var result = 0;
    var i = 0

    while (parseInt(palindrome) != 0) {
        var remender = parseInt(palindrome) % 10;
        result = remender * Math.pow(10, number.length-1- parseInt(i)) + result;
        palindrome = palindrome / 10;
        i++;
    } 
    if (number == result) {
        return true;
    }
    return false;
}