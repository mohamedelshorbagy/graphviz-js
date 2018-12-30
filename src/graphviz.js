import Graph from './graph/graph';
import GraphVertex from './graph/graphVertex';
import GraphEdge from './graph/graphEdge';
export class GraphViz {

    constructor(context) {
        this.graph = new Graph();
        this.ctx = context;
        this.offsetInline = {
            x: 80,
            y: 80
        };
        this.offsetSpaced = {
            x: 100,
            y: 100
        }
        this.R = 40;
        this.L = this.R * 2;
        this.startPos = {
            x: 50,
            y: 50
        }
        this.prevNode = null;
        this.fNode = false;
    }

    addNode(nodeName, text = '', inline_with = null, type = 'square') {
        type = type || 'square';

        if (this.fNode) {
            // Not First Pos
            this.startPos = {
                x: this.startPos.x + this.offsetSpaced.x,
                y: this.startPos.y + this.offsetSpaced.y
            }
        }

        if (inline_with) { // Same Hotizontal Position
            let nodeInlined = this.graph.getVertexByKey(inline_with);
            /**
             * 1- Check Node Type -> (Circle , Square)
             * 2- Calculate position of new node respctive to nodeInlined
             */
            let newPos;
            if (type === 'square') {
                // Square Case
                newPos = {
                    x: nodeInlined.shape.center.x + this.offsetInline.x + this.L,
                    y: nodeInlined.shape.center.y - this.L / 2
                }
            } else {
                // Circle Case
                newPos = {
                    x: nodeInlined.shape.center.x + this.offsetInline.x + this.R,
                    y: nodeInlined.shape.center.y
                }
            }

            let node = new GraphVertex(nodeName, { type, context: this.ctx, text, type, ...newPos, l: this.L });
            this.graph.addVertex(node);
            node.shape.draw();
            this.prevNode = node;
            this.startPos = {
                ...node.shape.center
            }
            this.fNode = true;
            return nodeName;
        }


        let node = new GraphVertex(nodeName, { type, context: this.ctx, text, type, ...this.startPos, l: this.L });
        this.graph.addVertex(node);
        node.shape.draw();
        this.startPos = {
            ...node.shape.center
        }
        this.prevNode = node;
        return nodeName;
    }
    addEdge(fNode, sNode) {
        let fNodeVertex = this.graph.getVertexByKey(fNode);
        let sNodeVertex = this.graph.getVertexByKey(sNode);
        let edge = new GraphEdge(fNodeVertex, sNodeVertex);
        this.graph
            .addEdge(edge);

    }



}