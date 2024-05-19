
// A Program to check if strings are rotations of each other or not

(function () {
    var str = 'jrajshrajarampura';

    var strr = "I am Rajesh";

    console.log(
        strr.split('a').join(' ').split('e').join(' ')
    )

    var hash = [];
    var longest_substring = '';
    var longest_substring_till_now = '';

    for (var i = 0; i < str.length; i++) {
        if (hash.indexOf(str.charAt(i)) == -1) {
            hash.push(str.charAt(i));
            longest_substring = hash.join('');
        } else {
            hash = [];
        }
        if (longest_substring.length > longest_substring_till_now.length) {
            longest_substring_till_now = longest_substring;

        }
    }
    console.log("The longest substring is : "+longest_substring_till_now)
})();