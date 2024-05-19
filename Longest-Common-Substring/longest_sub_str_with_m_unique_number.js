// https://www.youtube.com/watch?v=8AQra0p_HmI


// https://www.geeksforgeeks.org/find-the-longest-substring-with-k-unique-characters-in-a-given-string/

var str = 'aabbcc';
var m = 1;
var map = new Map();
var longest_sub = '';
for(var i = 0; i<str.length; i++){

    map.set(str.charAt(i),  map.get(str.charAt(i)) ? map.get(str.charAt(i))+1:1)

    if(map.size>m){
        // update count of character in map
        map.set(longest_sub.charAt(0),  map.get(longest_sub.charAt(0))-1);
        // if value of character is 0 then remove it from map
        if(!map.get(longest_sub.charAt(0))){
            map.delete(longest_sub.charAt(0));
        }
        // remove first charcter 
        longest_sub = longest_sub.substring(1, longest_sub.length);
         // add current char to string
        longest_sub = longest_sub+str.charAt(i);
    }else{
        // add char to string
        longest_sub = longest_sub+str.charAt(i);
    }
    
    
}
console.log(map);
console.log(longest_sub);

