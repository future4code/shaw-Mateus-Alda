export class NodeItem {
    constructor (
        public value: any,
        public next: NodeItem | null = null
    ) {}
}