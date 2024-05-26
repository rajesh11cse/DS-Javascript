
class Node {
  constructor(key, value, next = null, prev = null) {
    this.key = key;
    this.value = value;
    this.next = next;
    this.prev = prev;
  }
}

class LRU {
  //set default limit of 10 if limit is not passed.
  constructor(limit = 10) {
    this.size = 0;
    this.limit = limit;
    this.head = null;
    this.tail = null;
    this.cache = {};
  }

  // Write Node to head of LinkedList
  // update cache with Node key and Node reference
  write(key, value){


    // console.log(this.head, this.tail)
    this.ensureLimit();

    if(!this.head){
      this.head = this.tail = new Node(key, value);
    }else{
      const node = new Node(key, value, this.head);
      this.head.prev = node;
      this.head = node;
    }

    //Update the cache map
    this.cache[key] = this.head;
    this.size++;
  }

  // Read from cache map and make that node as new Head of LinkedList
  read(key){
    if(this.cache[key]){
      const value = this.cache[key].value;
      
      // node removed from it's position and cache
      this.remove(key)
      // write node again to the head of LinkedList to make it most recently used
      this.write(key, value);

      return value;
    }

    console.log(`Item not available in cache for key ${key}`);
  }

  ensureLimit(){
    if(this.size === this.limit){
      this.remove(this.tail.key)
    }
  }

  remove(key){
    const node = this.cache[key];

    if(node.prev !== null){
      node.prev.next = node.next;
    }else{
      this.head = node.next;
    }

    if(node.next !== null){
      node.next.prev = node.prev;
    }else{
      this.tail = node.prev
    }

    delete this.cache[key];
    this.size--;
  }

  clear() {
    this.head = null;
    this.tail = null;
    this.size = 0;
    this.cache = {};
  }

  // Invokes the callback function with every node of the chain and the index of the node.
  forEach(fn) {
    let node = this.head;
    let counter = 0;
    while (node) {
      fn(node, counter);
      node = node.next;
      counter++;
    }
  }

  // To iterate over LRU with a 'for...of' loop
  // *[Symbol.iterator]() {
  //   let node = this.head;
  //   while (node) {
  //     yield node;
  //     node = node.next;
  //   }
  // }
}




let lruCache = new LRU(3);
lruCache.write('a', 123);
lruCache.write('b', 456);
lruCache.write('c', 789);
lruCache.read('a'); // output 123

// Now max limit 3 is reached. Let's add a new element
lruCache.write('d', 0);







/* 

Design a low level design for a Cache system.

Cache system should have support for following operations:
1. Put: This will allow user to put a value against a key in the cache.
2. Get: This will allow user to get the previously saved value using key.
3. Eviction: Cache should also support removal of some key in case cache is full, based on Storage Full Exception Handling and LRU Eviction Policy
4. Eviction Based on Expiry(TTL) / Time Based Eviction
5. Support multiple concurrent read and single write in the cache or Multi Threading Issues
6. API detailing
7. DB Schema 

*/

/* Classes and Data Structures */
class CacheEntry {
  constructor(key, value, ttl = null) {
      this.key = key;
      this.value = value;
      this.lastAccessedTime = Date.now();
      this.ttl = ttl ? Date.now() + ttl : null;
  }

  isExpired() {
      return this.ttl && this.ttl < Date.now();
  }

  updateAccessTime() {
      this.lastAccessedTime = Date.now();
  }
}

/* Main cache class */
class Cache {
  constructor(capacity) {
      this.capacity = capacity;
      this.store = new Map();
      this.accessOrder = new Map(); // Key: CacheEntry, Value: Last Access Time
  }

  // case 1
  put(key, value, ttl = null) {
      if (this.store.size >= this.capacity) {
          this.evict();
      }
      const entry = new CacheEntry(key, value, ttl);
      this.store.set(key, entry);
      this.updateAccessOrder(entry);
  }

  // case 2
  get(key) {
      const entry = this.store.get(key);
      if (entry) {
          if (entry.isExpired()) {
              this.remove(key);
              return `Item not available in cache for key ${key}`;
          }
          entry.updateAccessTime();
          this.updateAccessOrder(entry);
          return entry.value;
      }
      return `Item not available in cache for key ${key}`;
  }

  // case 3
  remove(key) {
      const entry = this.store.get(key);
      if (entry) {
          this.accessOrder.delete(entry);
          this.store.delete(key);
      }
  }

  // case 4
  evict() {
      // Evict based on LRU or TTL
      this.cleanExpiredEntries();
      if (this.store.size >= this.capacity) {
          const oldestEntry = this.getOldestEntry();
          this.remove(oldestEntry.key);
      }
  }

  cleanExpiredEntries() {
      for (let [key, entry] of this.store) {
          if (entry.isExpired()) {
              this.remove(key);
          }
      }
  }

  getOldestEntry() {
      return Array.from(this.accessOrder.entries()).reduce((oldest, entry) => {
          return (oldest[1] < entry[1]) ? oldest : entry;
      })[0];
  }

  updateAccessOrder(entry) {
      this.accessOrder.delete(entry);
      this.accessOrder.set(entry, entry.lastAccessedTime);
  }
}

/* Case 5 */
/* 
In JavaScript (Node.js), you can use async and await to manage asynchronous operations.
To support multiple concurrent reads and a single write, you can use async functions with proper locking mechanisms
*/
// Let's say for PUT example, similary can be for GET also
/* 
// Keep this on top outside class
const { Mutex } = require('async-mutex');
async put(key, value, ttl = null) {
  const release = await this.mutex.acquire();
  try {
      if (this.store.size >= this.capacity) {
          this.evict();
      }
      const entry = new CacheEntry(key, value, ttl);
      this.store.set(key, entry);
      this.updateAccessOrder(entry);
  } finally {
      release();
  }
} */

/* Case 6 */
/*
  PUT /cache: Adds a key-value pair to the cache.
    Request Body: { "key": "someKey", "value": "someValue", "ttl": 60000 }
  GET /cache/:key: Retrieves the value for a given key.
    URL Parameter: key 
*/

/* Case 7 */
// Although a cache typically resides in-memory, if you need persistence, you can use a simple key-value store schema:
/* 
CREATE TABLE Cache (
  key VARCHAR PRIMARY KEY,
  value TEXT,
  ttl BIGINT,
  lastAccessedTime BIGINT
); */