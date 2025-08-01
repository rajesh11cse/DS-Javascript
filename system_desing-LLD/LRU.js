class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value
    this.prev = null;
    this.next = null
  }
}

class DBList {
  constructor() {
    this.head = new Node(null, null);
    this.tail = new Node(null, null);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }


  addNode(node) {
    node.prev = this.head;
    node.next = this.head.next;
    this.head.next.prev = node;
    this.head.next = node;
  }


  removeNode(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  moveToFront(node) {
    this.removeNode(node);
    this.addNode(node);
  }

  removeNodeFromLRU() {
    const lruNode = this.tail.prev;
    this.removeNode(lruNode);
    return lruNode;
  }
}


class LRU {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();
    this.dll = new DBList();
  }


  get(key) {
    if (!this.map.has(key)) {
      return -1
    }

    const node = this.map.get(key);
    this.dll.moveToFront(node);
    return node.value;
  }

  put(key, value) {
    if (this.map.has(key)) {
      const node = this.map.get(key);
      node.value = value;
      this.dll.moveToFront(node);
    } else {
      if (this.map.size >= this.capacity) {
        const lru = this.dll.removeNodeFromLRU();
        this.map.delete(lru.key);
      }

      const newNode = new Node(key, value);
      this.dll.addNode(newNode);
      this.map.set(key, newNode);
    }
  }


  printCacheState() {
    let current = this.dll.head.next;

    let result = [];

    while (current !== this.dll.tail) {
      result.push(`(${current.key}: ${current.value})`)
      current = current.next;
    }

    console.log("Current Status Of Cache : ", result);
  }

}


const lru = new LRU(3);
lru.put(1, 10);
lru.put(2, 20);
lru.put(3, 30);
console.log("After putting 3 entries:");
lru.printCacheState();  // (3:30) -> (2:20) -> (1:10)

lru.get(2);  // Access key 2
console.log("After accessing key 2:");
lru.printCacheState();  // (2:20) -> (3:30) -> (1:10)

lru.put(4, 40);  // Should evict key 1
console.log("After inserting key 4:");
lru.printCacheState();  // (4:40) -> (2:20) -> (3:30)

console.log("Get key 1 (should be -1):", lru.get(1));
console.log("Get key 3:", lru.get(3));
console.log("After accessing key 3:");
lru.printCacheState();  // (3:30) -> (4:40) -> (2:20)

lru.put(2, 25); // Update key 2
console.log("After updating key 2:");
lru.printCacheState();  // (2:25) -> (3:30) -> (4:40