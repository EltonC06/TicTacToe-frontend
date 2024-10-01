updateGame()
var roundcount = []

async function start() {
    let URL = 'http://localhost:8080/games/play'
    const resp = await fetch(URL, {
        method: "POST"
    })
    if (resp.status == 200) {
        console.log("Game sucessfully created")
        updateGame()
    } else {
        window.alert("[ERROR] Game creation error")
    }
}

async function restart() {
    let URL = 'http://localhost:8080/games/restart'
    const resp = await fetch(URL, {
        method: "PUT"
    })
    if (resp.status == 200) {
        console.log("Game sucessfully restarted")
        updateGame()
    } else {
        window.alert("[ERROR] Game failed to restart")
    }
}

async function makeMove(num) {
    let URL = `http://localhost:8080/games/play/${num}`
    const resp = await fetch(URL, {
        method: 'PUT'
    })
    if (resp.status == 200) {
        await updateGame()
        
    } else {
        window.alert("[ERROR] Something went wrong while making a move")
    }
}

async function isRunning() {
    let URL = 'http://localhost:8080/games'
    
    const resp = await fetch(URL, {
        method: 'GET'
    })
    
    if (resp.status == 200) {
        const obj = await resp.json();
        console.log(obj)
        console.log(obj[0].isRunning)
        return obj[0].isRunning
    } else {
        window.alert("[ERROR] function isRunning")
    }
}

async function updateGame() {
    let place1 = window.document.getElementById('place1')
    let place2 = window.document.getElementById('place2')
    let place3 = window.document.getElementById('place3')
    let place4 = window.document.getElementById('place4')
    let place5 = window.document.getElementById('place5')
    let place6 = window.document.getElementById('place6')
    let place7 = window.document.getElementById('place7')
    let place8 = window.document.getElementById('place8')
    let place9 = window.document.getElementById('place9')
    let gameStatus = window.document.getElementById('gameStatus')
    let xcount = window.document.getElementById('xcount')
    let ocount = window.document.getElementById('ocount')
    let drawcount = window.document.getElementById('drawcount')
    let roundnumber = window.document.getElementById('roundnumber')
    
    let URL = 'http://localhost:8080/games'
    const resp = await fetch(URL, {
        method: 'GET'
    })
    if (resp.status == 200) {
        const obj = await resp.json();
        const game = obj[0]
        place1.innerHTML=String(game.firstLine).charAt(0)
        place2.innerHTML=String(game.firstLine).charAt(1)
        place3.innerHTML=String(game.firstLine).charAt(2)
        place4.innerHTML=String(game.secondLine).charAt(0)
        place5.innerHTML=String(game.secondLine).charAt(1)
        place6.innerHTML=String(game.secondLine).charAt(2)
        place7.innerHTML=String(game.thirdLine).charAt(0)
        place8.innerHTML=String(game.thirdLine).charAt(1)
        place9.innerHTML=String(game.thirdLine).charAt(2)
        
        if (game.isRunning) {
            gameStatus.innerHTML="<p>The game started!</p>"
        } else if (game.roundWinner == "X") {
            gameStatus.innerHTML="<p>[X] won the round</p>"
            roundcount.push("X")
        } else if (game.roundWinner == "O") {
            gameStatus.innerHTML="<p>[O] won the round</p>"
            roundcount.push("O")
        } else if (game.roundWinner == "D") {
            gameStatus.innerHTML="<p>Draw</p>"
            roundcount.push("D")
        }
        roundnumber.innerHTML="Rounds played: " + roundcount.length
        xcount.innerHTML="[X]: " + roundcount.filter(item => item === 'X').length
        ocount.innerHTML="[O]: " + roundcount.filter(item => item === 'O').length
        drawcount.innerHTML="[Draw]: " + roundcount.filter(item => item === 'D').length
    
    } else {
        window.alert("Something went wrong while updating game data")
    }
}