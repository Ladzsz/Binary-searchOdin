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
    constructor(array) {
        this.root = this.buildTree(array);
    }

    //build tree method
    buildTree(arr) {

        let n = arr.length;

        if (n === 0)
            return null;

        // Create the root node
        let mid = Math.floor((n - 1) / 2);
        let root = new Node(arr[mid]);

        let q = [ {node : root, range : [ 0, n - 1 ]} ];
        let frontIndex = 0;

        while (frontIndex < q.length) {
            let front = q[frontIndex];
            let curr = front.node;
            let [s, e] = front.range;
            let index = s + Math.floor((e - s) / 2);

            // If left subtree exists
            if (s < index) {
                let midLeft
                    = s + Math.floor((index - 1 - s) / 2);
                let left = new Node(arr[midLeft]);
                curr.left = left;
                q.push({node : left, range : [ s, index - 1 ]});
            }

            // If right subtree exists
            if (e > index) {
                let midRight
                    = index + 1
                    + Math.floor((e - index - 1) / 2);
                let right = new Node(arr[midRight]);
                curr.right = right;
                q.push(
                    {node : right, range : [ index + 1, e ]});
            }

            frontIndex++;
        }

        return root;
    }

    //insert method
    insertItem(root, key) {
        // Create and return a new node if root is null
        if (root === null)
        return new Node(key); 

        // Duplicates not allowed
        if (root.data === key)
            return root; 

        // Add to left subtree if less than and right if greater
        if (key < root.data)
            root.left = this.insertItem(root.left, key); 
        else if (key > root.data)
            root.right = this.insertItem(root.right, key); 

        return root;
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
    levelOrder() {

    }

    inOrder() {

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