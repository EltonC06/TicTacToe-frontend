verifyGameStatus()

async function verifyGameStatus() {
    let URL = 'http://localhost:8080/match/1'
    const resp = await fetch(URL, {
        method: "GET"
    })
    if (resp.status == 200) {
        updateGame()
    } else if (resp.status == 404) {
        console.log("Game not created yet")
    }
}

async function startOrRestartMatch() {
    let URL = 'http://localhost:8080/match/1'
    const resp = await fetch(URL, {
        method: "GET"
    })
    if (resp.status == 200) {
        restartMatch()
    } else {
        startMatch()
    }
}

async function startMatch() {
    let URL = 'http://localhost:8080/match/create'
    const resp = await fetch(URL, {
        method: "POST"
    })
    if (resp.status == 200) {
        console.log("Game sucessfully created")
        updateGame()
    } else {
        window.alert("[ERROR] Match creation error")
    }
}

async function restartMatch() {
    let URL = 'http://localhost:8080/match/reset'
    const resp = await fetch(URL, {
        method: "PUT"
    })
    if (resp.status == 200) {
        console.log("Match sucessfully restarted")
        updateGame()
    } else {
        window.alert("[ERROR] Match failed to restart")
    }
}

async function restartRound() {
    let URL = 'http://localhost:8080/games/restart'
    const resp = await fetch(URL, {
        method: "PUT"
    })
    if (resp.status == 200) {
        console.log("Round sucessfully restarted")
        updateGame()
    } else {
        window.alert("[ERROR] Round failed to restart")
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
    let URL = 'http://localhost:8080/games/1'
    
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
    
    let URL = 'http://localhost:8080/match/1'
    const resp = await fetch(URL, {
        method: 'GET'
    })
    if (resp.status == 200) {
        const match = await resp.json();
        const game = match.ticTacToe
        
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
        }
        
        roundnumber.innerHTML="Rounds played: " + match.roundsPlayed
        xcount.innerHTML="[X]: " + match.xVictories
        ocount.innerHTML="[O]: " + match.oVictories
        drawcount.innerHTML="[Draw]: " + match.draws
    
    } else {
        window.alert("Something went wrong while updating game data")
    }
}