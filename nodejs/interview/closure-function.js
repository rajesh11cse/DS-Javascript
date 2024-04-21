const sum = (x) => {
    let currentSum = x || 0;

    const innerSum = (y) => {
        if (typeof y === 'undefined') {
            return currentSum;
        }
        currentSum += y;
        return innerSum;
    };

    innerSum.valueOf = () => currentSum;

    return innerSum;
};

// Example usage:
const result = sum(5)(6)(7)(8)(9)();
console.log(result); // Output: 35
