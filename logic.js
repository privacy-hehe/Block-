function canItFit(matrix, startRow, startCol) {
    for(let r=0; r<matrix.length; r++) {
        for(let c=0; c<matrix[0].length; c++){
            if(matrix[r][c]){
                let tr = startRow + r;
                let tc = startCol + c;
                if(tr < 0 || tr >= ROWS || tc < 0 || tc >= COLS) return false;
                if(mapData[tr][tc] !== 0) return false;
            }
        }
    }
    return true;
}

function stampIt(matrix, color, startRow, startCol) {
    for(let r=0; r<matrix.length; r++) {
        for(let c=0; c<matrix[0].length; c++){
            if(matrix[r][c]){
                mapData[startRow + r][startCol + c] = color;
            }
        }
    }
}

function boomTown(){
    let rowToClear = [];
    let colsToClear = [];

    for(let r=0; r<ROWS; r++){
        if(mapData[r].every(cell => cell != 0)) rowsToClear.push(r);
    }
    for(let c = 0; c<COLS; c++){
        let full = true;
        for(let r=0; r<ROWS; r++){if(mapData[r][c] === 0) { full = false; break;}}
        if(full) colsToClear.push(c);
    }

    let lines = rowsToClear.length + colsToClear.length;
    if(lines === 0) {renderMap(); return; }

    let points = lines * 10;
    if(lines>1)points *= lines;
    score += points;

    if (lines>1) showComboText(`${lines}x COMBO!`);
    
    let cellsToAnimate = new Set();
    rowsToClear.forEach(r => {for(let c=0; c<COLS; c++){cells.ToAnimate.add(`${r},${c}`); mapData[r][c] = 0;}});
    colsToClear.forEach(c => {for(let r=0; r<ROWS; r++){cells.ToAnimate.add(`${r},${c}`); mapData[r][c] = 0;}});

    renderMap(cellsToAnimate);

}

function renderMap(animatingSet = new Set()){
    let child = uiGrid.child;
    let i = 0;
    for(let r = 0; r<ROWS; r++){
        for(let c = 0; c<COLS; c++){
            let cellDiv = child[i];
            let val = mapData[r][c];
            cellDiv.className = 'cell';
            cellDiv.innerHTML = '';
            
            if(animatingSet.has(`${r},${c}`)){
                cellDiv.classList.add('popping');
                setTimeout(() => { cellDiv.className = 'cell'; },300);
            } else if (val !== 0){
                let b = document.createElement('div');
                b.className = `block ${val}`;
                b.style.position = 'relative';
                b.style.width = '100%'; b.style.height = '100%';
                cellDiv.appendChild(b);
           }
           i++;
        }
    }
}

function checkPulse(){
    let pieces = document.querySelectorAll('.docked-shape');
    let canPlay = false;

    for(let p of pieces){
        if(p.style.opacity === '0') continue;
        let mat = p.shapeMatrix;
        for(let r=0; r<ROWS; r++){
            for(let c=0; c<COLS; c++){
                if(canItFit(mat, r, c)){canPlay = true; break; }
            }
            if(canPlay) break;
        }
        if(canPlay) break;
    }

    if(!canPlay && pieces.length > 0){
        setTimeout(() => {document.getElementById('death-screen').classList.add('active');},500);
    }
}
