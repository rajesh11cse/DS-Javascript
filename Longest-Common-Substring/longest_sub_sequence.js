/////       AMAZON
// Dynamic Programming | Set 3 (Longest Increasing Subsequence
// https://www.geeksforgeeks.org/longest-increasing-subsequence/


'use strict';

var arr = [10, 22, 9, 33, 21, 50, 41, 60];

longest_sub_seq(arr);


function longest_sub_seq(arr){
    var len = arr.length;
    var arr_length = []; // array for length
    var arr_sub_seq = []; // array for sub sequence

    for(var i = 0; i<len; i++){
        arr_length[i] = 1;
        arr_sub_seq[i] = 0;
    }

    for(var i = 1; i<len; i++){
        for(var j = 0; j<i; j++){
            //arr_length[i] = 1;
            if(arr[j]<arr[i] && arr_length[j]+1>arr_length[i]){
                arr_length[i] = arr_length[j]+1;
                arr_sub_seq[i] = j;
            }
        }
    }
   var max = 0;
   var index = 0;
   for(var i = 0; i<len; i++){
        if(max<arr_length[i]){
            max = arr_length[i];
            index = i;
        }
    }
    
    //console.log(arr_length)
    //console.log(max)
    //console.log(index)
    //console.log(arr_sub_seq)
}