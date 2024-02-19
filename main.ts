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
    led.plot(dot.x, dot.y)
}
refresh(dData, dot)

loops.everyInterval(1000, function() {
    dot.y += 1;

    if(dot.y > 4) dot.y = 0
    else(dData[dot.y + 1][dot.x])

    refresh(dData, dot)
})
input.onGesture(Gesture.TiltLeft, function() {
    if (dot.x > 0)dot.x -= 1 
    refresh(dData, dot)
})
input.onGesture(Gesture.TiltRight, function () {
    if (dot.x > 0) dot.x += 1
    refresh(dData, dot)
})