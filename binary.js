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
    insertItem(value) {

    }

    //remove method
    removeItem(value) {

    }

    //find value method
    find(value) {

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