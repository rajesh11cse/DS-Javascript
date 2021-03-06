
// Remove duplicates from sorted linkedlist

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

ll.push(6);
ll.push(7);
ll.push(14);
ll.push(21);
ll.push(9);
ll.push(23);

var util = require('util');


//console.log(util.inspect(ll, { showHidden: true, depth: null, colors: true }))

var result = swapNodes(7, 23, ll.head);
console.log(util.inspect(result, { showHidden: true, depth: null, colors: true }))

function swapNodes(x, y, head) {


    if(x == y || head == null){
        return head;
    }

    // Find pre and next elements of x
    var p = head;
    var prev = null;
    while (p != null && p.data != x) {
        prev = p;
        p = p.next
    }

    var pX = p;
    var prevX = prev;

    // Find pre and next elements of y
    var p = head;
    var prev = null;
    while (p != null && p.data != y) {
        prev = p;
        p = p.next
    }
    var pY = p;
    var prevY = prev;



    if (pX == prevY && prevX == null) {  // {6, 7}
        var temp = pY.next;
        pY.next = pX;
        pX.next = temp;
        head = pY;
    } else if (pX == prevY && pY.next == null) { // {9 ,23}
        prevX.next = pY;
        pY.next = pX;
        pX.next = null;

    } else if (prevX == null && pY.next == null) {// {6 ,23} // for end points only
        var temp = pX.next;
        pX.next = null;
        prevY.next = pX;
        pY.next = temp;
        head = pY;
    } else if (prevX != null && pY.next == null) {// {7 ,23} // for end points only
        var temp = pX.next;
        pX.next = null;
        prevY.next = pX;
        pY.next = temp;
        prevX.next = pY;
    }
    else if (pY.next != null && pY.next != null && pX == prevY) { // {7, 14}
        var temp = pY.next;
        pY.next = pX; // or prevY
        pX.next = temp;
        prevX.next = pY;
    }
    else if (pY.next != null && pY.next != null) { // {7, 21}

        var temp = pY.next;
        pY.next = pX.next;
        pX.next = temp;
        prevX.next = pY;
        prevY.next = pX;
    }
    return head
}