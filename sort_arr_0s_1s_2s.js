// Dutch National Flag


// https://www.geeksforgeeks.org/sort-an-array-of-0s-1s-and-2s/

// input: {0, 1, 1, 0, 1, 2, 1, 2, 0, 0, 0, 1}
// Output: {0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2}

var arr = [0, 1, 2, 0, 1, 2];



var low = 0, mid = 0, high = arr.length - 1, temp = 0;


var sortarr = sort012(arr);
console.log(sortarr)

function sort012(arr) {
    while (mid <= high) {
        switch (arr[mid]) {
            case 0:
                temp = arr[low];
                arr[low] = arr[mid];
                arr[mid] = temp;
                low++;
                mid++;
                break;
            case 1:
                mid++;
                break;
            case 2:
                temp = arr[mid];
                arr[mid] = arr[high];
                arr[high] = temp;
                high--;
                break;
            default:
                console.log('error');

        }
    }
    return arr;
}
