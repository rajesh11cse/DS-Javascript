
// Input: str = “baaabbabbb”
// Output: 7 'aabbabb'



var str = 'baaabbabbb';


    // Initialize temporary and final ans 
    // to 2 as this is the minimum length 
    // of substring when length of the given 
    // string is greater than 2 
var temp = 2;
var result = 2;


for (var i = 2; i < str.length; i++) {
	
      // If no three consecutive characters 
        // are same then increment temporary count 
	if(str[i] !== str[i-1] || str[i] !== str[i-2]){
		temp++;
	}else{
		result = Math.max(result, temp);
		temp = 2;
	}
}


result = Math.max(result, temp);

console.log(result)
	


// Ref : https://www.geeksforgeeks.org/longest-substring-such-that-no-three-consecutive-characters-are-same/