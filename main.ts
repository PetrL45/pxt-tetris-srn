type Piece = {
    x: number,
    y: number
}

type Row = Array<boolean>
type Display = Array<Row>

const dData: Display = [
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
]

const dot: Piece = {
    x: 2,
    y: 0
}

function refresh(display: Display, dot: Piece): void{
    for(let y = 0;y < 5;y+=1){
        for(let x = 0; x < 5; x+=1){
            if(display[y][x]) 
            led.plot(x, y)
            else led.unplot(x, y);
        }
    }
    for (let i = 0; i < dData.length; i++) {
        let row = dData[i];
        if (row.every(dot => dot)) {
            dData.splice(i, 1);
            dData.unshift([false, false, false, false, false]);
        }
    }
    led.plot(dot.x, dot.y)
}
refresh(dData, dot)

loops.everyInterval(1000, function() {
    if(dot.y < 4 && !dData[dot.y + 1][dot.x])dot.y += 1
    else{
        dData[dot.y][dot.x] = true,
        dot.y = 0,
        dot.x = 2
    }
    refresh(dData, dot)
})
refresh(dData, dot)
input.onGesture(Gesture.TiltLeft, function() {
    if (dot.x > 0)dot.x -= 1 
    refresh(dData, dot)
})
input.onGesture(Gesture.TiltRight, function () {
    if (dot.x < 4) dot.x += 1
    refresh(dData, dot)
})