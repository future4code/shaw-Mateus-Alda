import { NodeItem } from "./NodeItem";

class LinkedList {
    constructor (
        public head: NodeItem | null = null
    ) {}

    add(value: any) {
        let nodeToAdd = new NodeItem(value)

        if (!this.head) {
            this.head = nodeToAdd
        } else {
            let currentNode = this.head
            while (currentNode.next) {
                currentNode = currentNode.next
            }
            currentNode.next = nodeToAdd
        }
    }

    print() {
        let node: NodeItem | undefined = this.head
        while (node !== undefined) {
            console.log(node.value);
            node = node.next            
        }
    }
}