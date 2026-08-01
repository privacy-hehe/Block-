function replenishDock() {
    uiDock.innerHTML = '';
    dockItemsCount = 3;

    for(let i=0; i<3; i++) {
        let rando = rawShapes[Math.floor(Math.random() * rawShapes.length)];
        let wrap = document. creteElement('div');
        wrap.className = 'docked-shape';

        let visual = buildShapeDom(rando.m, rando.c);
        wrap.appendChild(visual);
        wrap.shapeMatrix = rando.m;
        wrap.shapeColor = rando.c;

        wrap.addEventListener('touchstart', onGrab, {passive: false});
        wrap.addEventListener('mousedown', onGrab);
        uiDock.appendChild(wrap);
    }
    checkPulse();
}

function onGrab(e) {
 e.preventDefault();
 if(document.getElementById('death-screen').classList.contains('active')) return;
 let target = e.currentTarget;
 target.style.opacity = '0';

 let touch = e.touches ? e.touches[0]: e;
 dragger.innerHTML = '';
 let clone = buildShqpeDOM(target.spaceMatrix, target.spaceColor);
 dragger.appendChild(clone);
 dragger.style.display = 'block';

 let rect = target.getBoundingClientRect();
 let isMobile = e.type === 'touchstart';
 let centerNudgeX = (target.shapeMatrix[0].length * 44) / 2;
 let centerNudgeY = (target.shapeMatrix.length * 44) / 2;

 if(isMobile) {
    offsetX = centerNudgeX;
    offsetY = centerNudge + 60;
 } else {
    offsetX = touch.clientX - rect.left + 10;
    offsetY = touch.clientY - rect.top + 10;
 }

 draggedShapeInfo = { el: target, matrix: target.shapeMatrix, color: target.shapeColor };

 document.addEventListener('touchmove', onDrag, {passive: false});
 document.addEventListener('mousemove', onDrag);
 document.addEventListener('touchend', onDrag);
 document.addEventListener('mouseup', onDrag);
}

function onDrag(e) {
    e.preventDefault();
    let touch = e.touches ? e.touches[0] : e;
    moveDragger(touch.clientX, touch.clientY);
}

function moveDragger(x, y) {
    dragger.style.left = (x - offsetX) + 'px';
    dragger.style.top = (y - offsetY) + 'px';
}

function onDrop(e) {
    document.removeEventListener('touchmove', onDrag);
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('touchend', onDrag);
    document.removeEventListener('mouseup', onDrag);

    dragger.style.display = 'none';
    let broadRect = uiGrid.getBoundingClientRect();
    let dropX = parseInt(dragger.style.left) - boardRect.left;
    let dropY = parseInt(dragger.style.top) - boardRect.top;

    let col = Math.round(dropX / (boardRect.width / COLS));
    let row = Math.round(dropY / (boardRect.height / ROWS));

    if(canItFit(draggedShapeInfo.matrix, row, col)) {
        stampIt(draggedShapeInfo.matrix, draggedShapeInfo.color, row, col);
        draggedShapeInfo.el.remove();
        score += calcShapeScore(draggedShapeInfo.color, row, col);
        boomTown();
        updateUI();
        if(dockItemCount === 0) replenishDock();
        else checkPulse();
    } else {
        draggedShapeInfo.el.style.opacity = '1';
    }
    draggedShapeInfo = null;
}