import LinkedList from '../linked-list/linkedlist';
import { utils } from '../utils';
import { Square, Circle } from '../vizualization/shapes';
// import Circle from '../vizualization/circle';

export default class GraphVertex {
    /**
     * @param {*} value
     */
    constructor(value, { context, text = '', type = 'square', x, y, l }) {
        if (value === undefined) {
            throw new Error('Graph vertex must have a value');
        }

        /**
         * @param {GraphEdge} edgeA
         * @param {GraphEdge} edgeB
         */
        const edgeComparator = (edgeA, edgeB) => {
            if (edgeA.getKey() === edgeB.getKey()) {
                return 0;
            }

            return edgeA.getKey() < edgeB.getKey() ? -1 : 1;
        };

        // Normally you would store string value like vertex name.
        // But generally it may be any object as well
        this.value = value;
        this.edges = new LinkedList(edgeComparator);
        this.text = text || 'node';
        this.id = utils.guid();
        this.type = type // square , circle
        if (this.type === 'square') {
            this.shape = new Square(context, x, y, l, this.text)

        } else {
            this.shape = new Circle(context, x, y, l / 2, this.text);
        }
    }

    /**
     * @param {GraphEdge} edge
     * @returns {GraphVertex}
     */
    addEdge(edge) {
        this.edges.append(edge);

        return this;
    }
    /**
     * 
     * @param {string} text
     * @return {string} 
     */
    addText(text) {
        this.text = text;
    }

    /**
     * @param {GraphEdge} edge
     */
    deleteEdge(edge) {
        this.edges.delete(edge);
    }

    /**
     * @returns {GraphVertex[]}
     */
    getNeighbors() {
        const edges = this.edges.toArray();

        /** @param {LinkedListNode} node */
        const neighborsConverter = (node) => {
            return node.value.startVertex === this ? node.value.endVertex : node.value.startVertex;
        };

        // Return either start or end vertex.
        // For undirected graphs it is possible that current vertex will be the end one.
        return edges.map(neighborsConverter);
    }

    /**
     * @return {GraphEdge[]}
     */
    getEdges() {
        return this.edges.toArray().map(linkedListNode => linkedListNode.value);
    }

    /**
     * @return {number}
     */
    getDegree() {
        return this.edges.toArray().length;
    }

    /**
     * @param {GraphEdge} requiredEdge
     * @returns {boolean}
     */
    hasEdge(requiredEdge) {
        const edgeNode = this.edges.find({
            callback: edge => edge === requiredEdge,
        });

        return !!edgeNode;
    }

    /**
     * @param {GraphVertex} vertex
     * @returns {boolean}
     */
    hasNeighbor(vertex) {
        const vertexNode = this.edges.find({
            callback: edge => edge.startVertex === vertex || edge.endVertex === vertex,
        });

        return !!vertexNode;
    }

    /**
     * @param {GraphVertex} vertex
     * @returns {(GraphEdge|null)}
     */
    findEdge(vertex) {
        const edgeFinder = (edge) => {
            return edge.startVertex === vertex || edge.endVertex === vertex;
        };

        const edge = this.edges.find({ callback: edgeFinder });

        return edge ? edge.value : null;
    }

    /**
     * @returns {string}
     */
    getKey() {
        return this.value;
    }

    /**
     * @return {string}
     */
    getId() {
        return this.id;
    }

    /**
     * @return {string}
     */
    getType() {
        return this.type;
    }


    /**
     * @return {Square | Circle}
     */
    getShape() {
        return this.shape;
    }

    /**
     * @return {GraphVertex}
     */
    deleteAllEdges() {
        this.getEdges().forEach(edge => this.deleteEdge(edge));

        return this;
    }

    /**
     * @param {function} [callback]
     * @returns {string}
     */
    toString(callback) {
        return callback ? callback(this.value) : `${this.value}`;
    }
}