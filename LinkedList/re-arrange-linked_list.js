
var util = require('util');


function LikedList() {
    this.head = null;
}


LikedList.prototype.push = function (val) {
    let node = {
        data: val,
        next: null
    }

    if (!this.head) {
        this.head = node;
    } else {

        // Insert at end of the liked list
        current = this.head;
        while (current.next) {
            current = current.next;
        }
        current.next = node;
    }

}



let ll = new LikedList();

ll.push(1);
ll.push(2);
ll.push(3);
ll.push(4);
ll.push(5);
ll.push(6);
ll.push(7);
ll.push(8);





// https://www.geeksforgeeks.org/rearrange-a-given-linked-list-in-place/
// Rearrange a given linked list in-place.

// Input:  1 -> 2 -> 3 -> 4 -> 5
// Output: 1 -> 5 -> 2 -> 4 -> 3 

var result = re_arrange(ll.head);
console.log(result);

function re_arrange(head) {

    var deque = [];
    var temp = head;

    while(temp !== null){
        deque.push(temp.data);
        temp = temp.next;
    }
    temp = head;
    var i = 0;

    while(deque.length !== 0) { 
        if(i % 2 == 0) { 
            temp.data = deque[0]; 
            deque.shift();// delete first from queue
        } 
        else{ 
            temp.data = deque[deque.length-1];
            deque.pop();// delete last from queue
        } 
        i++;
        temp = temp.next; 
    } 
    console.log(deque)
    console.log(head)

}





