//node class
class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

//tree class
class Tree {
    constructor() {
        this.root = null; // Initialize tree root
    }

    buildTree(arr) {
        if (!Array.isArray(arr)) {
            throw new TypeError("Input must be a valid array");
        }

        let n = arr.length;

        if (n === 0) return null;

        console.log("Building tree with:", arr);

        // Example placeholder logic: Create a simple binary tree
        this.root = this._buildTreeHelper(arr, 0, n - 1);
    }

    // Helper function to recursively create a binary tree
    _buildTreeHelper(arr, start, end) {
        if (start > end) return null;

        let mid = Math.floor((start + end) / 2);

        const node = {
            value: arr[mid],
            left: this._buildTreeHelper(arr, start, mid - 1),
            right: this._buildTreeHelper(arr, mid + 1, end),
        };

        return node;
    }

    //insert method
    insertItem(root, key) {
        if (typeof key !== 'number') {
            throw new Error("Only numerical keys are supported.");
        }
    
        // Helper function for insertion in BST
        const insertHelper = (root, key) => {
            if (!root) return new Node(key); // Create and return a new node if root is null
    
            if (key === root.data) return root; // Avoid duplicates
    
            if (key < root.data) {
                root.left = insertHelper(root.left, key); // Insert into the left subtree
            } else {
                root.right = insertHelper(root.right, key); // Insert into the right subtree
            }
    
            return root; // Return the updated root
        };
    
        this.root = insertHelper(this.root, key); // Update the tree's root after insertion
    }

    //remove method
    removeItem(root, x) {
        // Base case
        if (root === null) {
            return root;
        }

        // If the key to be removed is smaller than the root's key
        if (x < root.data) {
            root.left = this.removeItem(root.left, x);
        }
        // If the key to be removed is greater than the root's key
        else if (x > root.data) {
            root.right = this.removeItem(root.right, x);
        }
        // If the key matches the root's key
        else {
            // Node with only one child or no child
            if (root.left === null) 
                return root.right;

            if (root.right === null) 
                return root.left;

            // Node with two children: get the in-order successor
            let succ = this.getSuccessor(root);

            // Copy the successor's value to this node
            root.data = succ.data;

            // Delete the successor
            root.right = this.removeItem(root.right, succ.data);
        }
        return root;
    }

    // Helper method to find the in-order successor (smallest node in the right subtree)
    getSuccessor(curr) {
        curr = curr.right;
        while (curr !== null && curr.left !== null) {
            curr = curr.left;
        }
        return curr;
    }

    //find value method
    find(root, key) {

        // Base case: root is null or key is found
        if (root === null || root.data === key) {
            return root;
        }

        // Key is smaller than root's data: search in the left subtree
        if (key < root.data) {
            return this.find(root.left, key);
        }

        // Key is greater than root's data: search in the right subtree
        return this.find(root.right, key);
    }

    //functions to work on next time
    levelOrder(callback) {
        if (!callback || typeof callback !== "function") {
            throw new Error("A callback function is required.");
        }
    
        const queue = [this.root]; // Initialize queue with the root node
        while (queue.length > 0) {
            const current = queue.shift(); // Get the front node
            if (current) {
                callback(current); // Process the current node
                if (current.left) queue.push(current.left); // Add left child to queue
                if (current.right) queue.push(current.right); // Add right child to queue
            }
        }
    }

    //the order functions
    inOrder(callback) {
        if (!callback || typeof callback !== "function") {
            throw new Error("A callback function is required.");
        }
    
        const traverse = (node) => {
            if (!node) return;
    
            traverse(node.left); // Visit left subtree
            callback(node);      // Process current node
            traverse(node.right); // Visit right subtree
        };
    
        traverse(this.root); // Start traversal from the root
    }
    
    preOrder(callback) {
        if (!callback || typeof callback !== "function") {
            throw new Error("A callback function is required.");
        }
    
        const traverse = (node) => {
            if (!node) return;
    
            callback(node);      // Process current node
            traverse(node.left); // Visit left subtree
            traverse(node.right); // Visit right subtree
        };
    
        traverse(this.root); // Start traversal from the root
    }
    
    postOrder(callback) {
        if (!callback || typeof callback !== "function") {
            throw new Error("A callback function is required.");
        }
    
        const traverse = (node) => {
            if (!node) return;
    
            traverse(node.left); // Visit left subtree
            traverse(node.right); // Visit right subtree
            callback(node);       // Process current node
        };
    
        traverse(this.root); // Start traversal from the root
    }

    //height function
    height(node) {
        if (!node) return -1; // Base case: null node has height -1
        const leftHeight = this.height(node.left); // Height of left subtree
        const rightHeight = this.height(node.right); // Height of right subtree
        return 1 + Math.max(leftHeight, rightHeight); // Add 1 for the current edge
    }

    //depth function
    depth(node, current = this.root, level = 0) {
        if (!node || !current) return -1; // Base case: node not found
        if (node === current) return level; // Found node, return depth

        // Search in the left and right subtrees
        const leftDepth = this.depth(node, current.left, level + 1);
        if (leftDepth !== -1) return leftDepth; // Node found in left subtree

        return this.depth(node, current.right, level + 1); // Continue in right subtree
    }

    //isbalance function
    isBalanced(node = this.root) {
        if (!node) return true; // Base case: null node is balanced
    
        // Helper function to calculate height and check balance simultaneously
        const checkHeight = (node) => {
            if (!node) return -1; // Null nodes have height -1
    
            const leftHeight = checkHeight(node.left); // Height of left subtree
            const rightHeight = checkHeight(node.right); // Height of right subtree
    
            if (leftHeight === false || rightHeight === false || Math.abs(leftHeight - rightHeight) > 1) {
                return false; // If any subtree is unbalanced or height difference > 1
            }
    
            return 1 + Math.max(leftHeight, rightHeight); // Return height of current node
        };
    
        return checkHeight(node) !== false; // Return true if balanced, false otherwise
    }
    

    //rebalance function
    rebalance() {
        // Helper function: Perform in-order traversal to collect node values
        const inOrderTraversal = (node, result = []) => {
            if (!node) return result;
            inOrderTraversal(node.left, result);
            result.push(node.data);
            inOrderTraversal(node.right, result);
            return result;
        };

        const sortedArray = inOrderTraversal(this.root); // Get sorted values
        this.root = this.buildTree(sortedArray); // Rebuild the tree
    }
}




//pretty print method for testing
const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };





//doing testing here because i got tired of dealing with import errors from not using webpack
randomNum = [81, 2, 79, 65, 45, 50, 5, 25, 57, 42];

const tree = new Tree();

tree.buildTree(randomNum);

//checking if balanced
console.log(tree.isBalanced());

// Log each node's value using levelOrder
tree.levelOrder((node) => {
    console.log(node.value); 
});

// Log each node's value using levelOrder
tree.preOrder((node) => {
    console.log(node.value); // Log the value of each node
});

// Log each node's value using levelOrder
tree.postOrder((node) => {
    console.log(node.value); // Log the value of each node
});

// Log each node's value using levelOrder
tree.inOrder((node) => {
    console.log(node.value); // Log the value of each node
});

// Insertingn numbers
tree.insertItem(tree.root, 104);  
tree.insertItem(tree.root, 110);
tree.insertItem(tree.root, 120);
tree.insertItem(tree.root, 150);

//Confirm the tree is unbalanced
console.log("Is tree balanced after adding numbers > 100?", tree.isBalanced());

// Rebalance the tree
tree.rebalance();

//Confirm that the tree is balanced
console.log("Is tree balanced after rebalancing?", tree.isBalanced());

//Print out all elements in level, pre, post, and in order


tree.levelOrder((node) => {
    console.log(node.value);
});


tree.preOrder((node) => {
    console.log(node.value);
});


tree.postOrder((node) => {
    console.log(node.value);
});


tree.inOrder((node) => {
    console.log(node.value);
});