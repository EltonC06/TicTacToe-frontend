verifyGameStatus()

async function verifyGameStatus() {
    const url = 'http://localhost:8080/match/1'
    try {
        const response = await fetch(url, {
            method: "GET"
        })
        if (response.ok) {
            updateGame()
        } else if (response.status == 404) {
            console.log("Game not created yet")
        } else {
            console.log(`Unexpected error: ${response.status}`)
        }
    } catch (error)  {
        console.error(`Network error while verifying game status: ${error}`)
    }

}

async function startOrRestartMatch() {
    const url = 'http://localhost:8080/match/1'
    try {
        const response = await fetch(url, {
            method: "GET"
        })
        if (response.ok) {
            restartMatch()
        } else {
            startMatch()
        }
    } catch (error) {
        console.error(`Error while starting or restarting match: ${error}`)
    }

}

async function startMatch() {
    const url = 'http://localhost:8080/match/create'
    try {
        const response = await fetch(url, {
            method: "POST"
        })
        if (response.ok) {
            console.log("Game sucessfully created.")
            updateGame()
        } else {
            window.alert("[ERROR] Match creation error")
        }
    } catch (error) {
        console.error(`Error creating match: ${error}`)
        window.alert("[ERROR] Network error while creating match.")
    }
}

async function restartMatch() {
    const url = 'http://localhost:8080/match/reset'
    try {
        const response = await fetch(url, {
            method: "PUT"
        })
        if (response.ok) {
            console.log("Match sucessfully restarted")
            updateGame()
        } else {
            window.alert("[ERROR] Match failed to restart")
        }
    } catch (error) {
        console.error(`Error restarting match: ${error}`)
        window.alert("[ERROR] Network error while restarting match.")
    }
}

async function restartRound() {
    const url = 'http://localhost:8080/games/restart'
    try {
        const response = await fetch(url, {
            method: "PUT"
        })
        if (response.status == 200) {
            console.log("Round sucessfully restarted")
            updateGame()
        } else {
            window.alert("[ERROR] Round failed to restart")
        }
    } catch (error) {
        console.error(`Error restarting round: ${error}`)
        window.alert("[ERROR] Network error while restarting round.")
    }
}

async function makeMove(num) {
    const url = `http://localhost:8080/games/play/${num}`
    try {
        const response = await fetch(url, {
            method: 'PUT'
        })
        if (response.ok) {
            await updateGame() 
        } else {
            window.alert("[ERROR] Something went wrong while making a move")
            console.log(`Error making move: ${response.status} ${response.statusText}`)
        }
    } catch(error) {
        console.error(`Error making move: ${error}`)
        window.alert("[ERROR] Network error while making a move.")
    }

}

async function isRunning() {
    const url = 'http://localhost:8080/games/1'
    try {
        const response = await fetch(url, {
            method: 'GET'
        })
        if (response.ok) {
            const obj = await response.json();
            return obj?.isRunning || false 
        } else {
            window.alert("[ERROR] Failed to verify game running status")
            console.error(`Error verifying game running status: ${response.status} ${response.statusText}`)
            return false
        }
    } catch(error) {
        console.error(`Error verifying game running status: ${error}`)
        window.alert("[ERROR] Network error while verifying game running status.")
        return false
    }
}

async function updateGame() {
    const places = [
        window.document.getElementById('place1'),
        window.document.getElementById('place2'),
        window.document.getElementById('place3'),
        window.document.getElementById('place4'),
        window.document.getElementById('place5'),
        window.document.getElementById('place6'),
        window.document.getElementById('place7'),
        window.document.getElementById('place8'),
        window.document.getElementById('place9')
    ]
    
    const gameStatus = window.document.getElementById('gameStatus')
    const xcount = window.document.getElementById('xcount')
    const ocount = window.document.getElementById('ocount')
    const drawcount = window.document.getElementById('drawcount')
    const roundnumber = window.document.getElementById('roundnumber')
    
    const url = 'http://localhost:8080/match/1'
    
    try {
        const response = await fetch(url, {
            method: 'GET'
        })
        if (response.ok) {
            const match = await response.json();
            const { ticTacToe: game, roundsPlayed, xVictories, oVictories, draws } = match;
            
            // update game places
            places.forEach((place, index) => {
                place.innerHTML = String(game.firstLine + game.secondLine + game.thirdLine).charAt(index);
            });
            
            // update game status
            if (game.isRunning) {
                gameStatus.innerHTML="<p>The game started!</p>"
            } else if (game.roundWinner != null) {
                if (game.roundWinner == "D") {
                    gameStatus.innerHTML="<p>The game ended in a draw!</p>"
                } else {
                    gameStatus.innerHTML=`<p>Game finished, ${game.roundWinner} won the round!</p>`
                }
            }
            
            // update counters
            roundnumber.innerHTML="Rounds played: " + match.roundsPlayed
            xcount.innerHTML="[X]: " + match.xVictories
            ocount.innerHTML="[O]: " + match.oVictories
            drawcount.innerHTML="[Draw]: " + match.draws 
        } else {
            window.alert("Something went wrong while updating game data")
            console.error(`Error fetching game data: ${response.status} ${response.statusText}`)
        }
    } catch (error) {
        console.error(`Network error while updating game data: ${error}`) 
        window.alert("[ERROR] network error while updating game data.")
    }
}