import { GraphViz } from './graphviz'


let canvas = document.getElementById('graph');
var context = canvas.getContext('2d');
let gviz = new GraphViz(context);


let pr_node = gviz.addNode('A', 'Const (X)');
let sc_node = gviz.addNode('B', 'Const (Z)', pr_node);
let th_node = gviz.addNode('C', 'Cont (U)');
gviz.addEdge(pr_node, sc_node);
gviz.addEdge(sc_node, th_node);
// gviz.addEdge(pr_node, th_node);




