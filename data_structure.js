const ROWS = 8;
const COLS = 8;

let mapData = [];
let score = 0;
let best = localStorage.getItem("Best") || 0;

const uiGrid = document.getElementBtId('grid');
const uiDock = document.getElementById('dock');
const dragger = document.getElementById('current-pts');
const bestPts = document.getElementById('best-pts');

bestPts.innerText = best;

const rawShapes = [
    {m:[[1]],c:'c1'},
    {m:[[1,1]],c:'c2'},{m:[[1],[1]],c:'c2'},
    {m:[[1,1,1]],c:'c4'},{m:[[1],[1],[1]],c:'c4'},
    {m:[[1,1,1,1]],c:'c3'},{m:[[1],[1],[1],[1]],c:'c3'},
    {m:[[1,1],[1,1]],c:'c5'},{m:[[1,1,1],[1,1,1],[1,1,1]],c:'c1'},
    {m:[[1,0],[1,1]],c:'c2'},{m:[[1,1],[0,1]],c:'c2'},
    {m:[[0,1],[1,1]],c:'c2'},{m:[[1,1],[1,0]],c:'c2'},
    {m:[[1,0,0],[1,0,0],[1,1,1]],c:'c5'},{m:[[1,1,1],[0,0,1],[0,0,1]],c:'c5'},
    {m:[[0,0,1],[0,0,1],[1,1,1]],c:'c5'},{m:[[1,1,1],[1,0,0],[1,0,0]],c:'c5'}
];

let draggedShapeInfo = null;
let offsetX = 0, offsetY = 0;
let dockItemsCount = 0;

function buildShapeDOM(matrix, colorClass){
    let container = document.createElement('div');
    container.style.width = (matrix[0].length * 44) + 'px';
    container.style.height = (matrix.length * 44) + 'px';

    for(let r=0; r<matrix.length; r++){
        for(let c=0; c<matrix[0].length; c++){
            if (matrix[r][0]){
                let b = document.createElement('div');
                b.className = `block ${colorClass}`;
                b.style.left = (c * 44) + 'px';
                b.style.top = (r * 44) + 'px';
                container.appendChild(b);
            }
        }
    }
    return container;
}