// Simplified Expense Sharing App for Interview (30-min version)

class User {
    constructor(name, email) {
        this.id = 'user_' + Math.random().toString(36).substr(2, 9);
        this.name = name;
        this.email = email;
    }
}

class Expense {
    constructor(description, amount, paidBy, participants, type, splitData = null) {
        this.id = 'exp_' + Math.random().toString(36).substr(2, 9);
        this.description = description;
        this.amount = parseFloat(amount);
        this.paidBy = paidBy;
        this.participants = participants;
        this.type = type; // 'EQUAL', 'EXACT', 'PERCENTAGE'
        this.splits = this.calculateSplits(splitData);
    }
    
    calculateSplits(splitData) {
        const splits = [];
        
        switch(this.type) {
            case 'EQUAL':
                const amountPerPerson = this.amount / this.participants.length;
                this.participants.forEach(userId => {
                    splits.push({ userId, amount: amountPerPerson });
                });
                // Handle rounding
                const total = splits.reduce((sum, split) => sum + split.amount, 0);
                splits[0].amount += (this.amount - total);
                break;
                
            case 'EXACT':
                this.participants.forEach((userId, index) => {
                    splits.push({ userId, amount: splitData[index] });
                });
                break;
                
            case 'PERCENTAGE':
                this.participants.forEach((userId, index) => {
                    const amount = (this.amount * splitData[index] / 100);
                    splits.push({ userId, amount });
                });
                break;
        }
        
        return splits;
    }
}

class ExpenseSharingApp {
    constructor() {
        this.users = new Map();
        this.expenses = [];
        this.balances = new Map(); // key: "user1:user2", value: amount
    }
    
    addUser(name, email) {
        const user = new User(name, email);
        this.users.set(user.id, user);
        console.log(`Added user: ${name} (${user.id})`);
        return user;
    }
    
    addExpense(expenseData) {
        const expense = new Expense(
            expenseData.description,
            expenseData.amount,
            expenseData.paidBy,
            expenseData.participants,
            expenseData.type,
            expenseData.splitData
        );
        
        this.expenses.push(expense);
        this.updateBalances(expense);
        
        console.log(`Added expense: ${expense.description} - ₹${expense.amount}`);
        return expense;
    }
    
    updateBalances(expense) {
        const paidBy = expense.paidBy;
        
        expense.splits.forEach(split => {
            if (split.userId !== paidBy) {
                // Person owes money to the person who paid
                this.updateBalance(split.userId, paidBy, split.amount);
            }
        });
    }
    
    updateBalance(fromUserId, toUserId, amount) {
        const key = `${fromUserId}:${toUserId}`;
        const reverseKey = `${toUserId}:${fromUserId}`;
        
        // Check if reverse balance exists
        if (this.balances.has(reverseKey)) {
            const reverseAmount = this.balances.get(reverseKey);
            if (reverseAmount >= amount) {
                // Reduce reverse balance
                this.balances.set(reverseKey, reverseAmount - amount);
                if (this.balances.get(reverseKey) === 0) {
                    this.balances.delete(reverseKey);
                }
            } else {
                // Create new balance with remaining amount
                this.balances.delete(reverseKey);
                this.balances.set(key, amount - reverseAmount);
            }
        } else {
            // Add to existing balance or create new one
            const existing = this.balances.get(key) || 0;
            this.balances.set(key, existing + amount);
        }
    }
    
    getUserBalances(userId) {
        const balances = [];
        
        this.balances.forEach((amount, key) => {
            const [from, to] = key.split(':');
            if (from === userId) {
                balances.push({ userId: to, amount: -amount, type: 'owes' });
            } else if (to === userId) {
                balances.push({ userId: from, amount, type: 'gets_back' });
            }
        });
        
        return balances;
    }
    
    getNetBalance(userId) {
        const balances = this.getUserBalances(userId);
        return balances.reduce((net, balance) => net + balance.amount, 0);
    }
    
    calculateSettlements(userIds) {
        // Calculate net balances
        const netBalances = new Map();
        userIds.forEach(userId => {
            const net = this.getNetBalance(userId);
            if (net !== 0) netBalances.set(userId, net);
        });
        
        // Separate creditors and debtors
        const creditors = [];
        const debtors = [];
        
        netBalances.forEach((balance, userId) => {
            if (balance > 0) {
                creditors.push({ userId, amount: balance });
            } else if (balance < 0) {
                debtors.push({ userId, amount: Math.abs(balance) });
            }
        });
        
        // Sort by amount for optimal matching
        creditors.sort((a, b) => b.amount - a.amount);
        debtors.sort((a, b) => b.amount - a.amount);
        
        // Calculate minimal transactions
        const settlements = [];
        let i = 0, j = 0;
        
        while (i < creditors.length && j < debtors.length) {
            const creditor = creditors[i];
            const debtor = debtors[j];
            const settleAmount = Math.min(creditor.amount, debtor.amount);
            
            settlements.push({
                from: debtor.userId,
                to: creditor.userId,
                amount: settleAmount
            });
            
            creditor.amount -= settleAmount;
            debtor.amount -= settleAmount;
            
            if (creditor.amount === 0) i++;
            if (debtor.amount === 0) j++;
        }
        
        return settlements;
    }
    
    printUserBalances(userId) {
        const user = this.users.get(userId);
        console.log(`\n Balances for ${user.name} (${userId}):`);
        
        const balances = this.getUserBalances(userId);
        const netBalance = this.getNetBalance(userId);
        
        if (balances.length === 0) {
            console.log('   No outstanding balances');
        } else {
            balances.forEach(balance => {
                const otherUser = this.users.get(balance.userId);
                const action = balance.type === 'owes' ? 'owes' : 'gets back';
                console.log(`   ${action} ₹${Math.abs(balance.amount)} ${balance.type === 'owes' ? 'to' : 'from'} ${otherUser.name}`);
            });
        }
        
        console.log(` Net Balance: ₹${netBalance.toFixed(2)} ${netBalance >= 0 ? '(gets back)' : '(owes)'}`);
    }
    
    printSettlements(userIds) {
        console.log('\ Optimal Settlements:');
        const settlements = this.calculateSettlements(userIds);
        
        if (settlements.length === 0) {
            console.log('   No settlements needed - all balanced!');
        } else {
            settlements.forEach((settlement, index) => {
                const fromUser = this.users.get(settlement.from);
                const toUser = this.users.get(settlement.to);
                console.log(`   ${index + 1}. ${fromUser.name} pays ₹${settlement.amount} to ${toUser.name}`);
            });
            console.log(`   Total transactions needed: ${settlements.length}`);
        }
    }
}

// Demo
function runDemo() {
    console.log(' Expense Sharing App Demo (30-min version)\n');
    
    const app = new ExpenseSharingApp();
    
    // Add users
    const alice = app.addUser('Alice', 'alice@example.com');
    const bob = app.addUser('Bob', 'bob@example.com');
    const charlie = app.addUser('Charlie', 'charlie@example.com');
    
    console.log('\n Adding Expenses:\n');
    
    // Equal split dinner
    app.addExpense({
        description: 'Dinner at restaurant',
        amount: 300,
        paidBy: alice.id,
        participants: [alice.id, bob.id, charlie.id],
        type: 'EQUAL'
    });
    
    // Exact amounts for shopping
    app.addExpense({
        description: 'Grocery shopping',
        amount: 200,
        paidBy: bob.id,
        participants: [alice.id, bob.id, charlie.id],
        type: 'EXACT',
        splitData: [50, 100, 50]
    });
    
    // Percentage split for cab
    app.addExpense({
        description: 'Cab ride',
        amount: 150,
        paidBy: charlie.id,
        participants: [alice.id, bob.id, charlie.id],
        type: 'PERCENTAGE',
        splitData: [40, 30, 30]
    });
    
    // Print balances
    app.printUserBalances(alice.id);
    app.printUserBalances(bob.id);
    app.printUserBalances(charlie.id);
    
    // Show settlements
    app.printSettlements([alice.id, bob.id, charlie.id]);
    
    console.log('\n Demo completed!');
}

runDemo();

// Result:

// Expense Sharing App Demo (30-min version)

// Added user: Alice (user_46w0wigi6)
// Added user: Bob (user_xjigcmg3c)
// Added user: Charlie (user_4mtalnwor)

//  Adding Expenses:

// Added expense: Dinner at restaurant - ₹300
// Added expense: Grocery shopping - ₹200
// Added expense: Cab ride - ₹150

//  Balances for Alice (user_46w0wigi6):
//    gets back ₹50 from Bob
//    gets back ₹40 from Charlie
//  Net Balance: ₹90.00 (gets back)

//  Balances for Bob (user_xjigcmg3c):
//    owes ₹50 to Alice
//    gets back ₹5 from Charlie
//  Net Balance: ₹-45.00 (owes)

//  Balances for Charlie (user_4mtalnwor):
//    owes ₹40 to Alice
//    owes ₹5 to Bob
//  Net Balance: ₹-45.00 (owes)
//  Optimal Settlements:
//    1. Bob pays ₹45 to Alice
//    2. Charlie pays ₹45 to Alice
//    Total transactions needed: 2

//  Demo completed!