function calcShapeScore(matrix){
    let p = 0;
    for(let r of matrix) for(let v of r) if(v) p++;
    return p;
}

function updateUI(){
    currentPts.style.transform = 'scale(1.1)';
    setTimeout(() => currentPts.style.transform = 'scale(1)', 100);

    currentPts.innerText = score;
    if(score > best){
        best = score;
        bestPts.innerText = best;
        localStorage.setItem("matteBest", best);
    }
}

function showComboText(msg) {
    let txt = document.createElement('div');
    txt.className = 'floating-text';
    txt.innerText = msg;
    txt.style.left = (Math.random()* 40+30) + '%';
    txt.style.top = '30%';
    document.body.appendChild(txt);
    setTimeout(() => txt.remove(), 1000);
}

function blastOff(){
    mapData = Array.from({length:ROWS}, () => Array(COLS).fill(0));
    uiGrid.innerHTML = '';

    for(let r = 0; r<ROWS; r++){
        for(let c = 0; c<COLS; c++){
            let div = document.createElement('div');
            div.className = 'cell';
            div.dataset.r = r;
            div.dataset.c = c;
            uiGrid.appendChild(div);
        }
    }
    score = 0;
    updateUI();
    document.getElementById('death-screen').classList.remove('active');
    replenishDock();
}

document.getElementById('restart-btn').addEventListener('click', blastOff);

blastOff();

/* ingnore indentation of this part it's for html        
</script>
</body>
</html>
*/