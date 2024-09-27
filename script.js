async function start() {
    let URL = 'http://localhost:8080/games/play'
    const resp = await fetch(URL, {
        method: "POST"
    })
    if (resp.status == 200) {
        window.alert("Game sucessfully created")
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
        window.alert("Game sucessfully restarted")
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
        window.alert("You made a move")
    } else {
        window.alert("[ERROR] Something went wrong while making a move")
    }
}

async function isRunning() {
    let URL = 'http://localhost:8080/games'
    
    const resp = await fetch(URL)
    
    if (resp.status == 200) {
        const obj = await resp.json();
        console.log(obj)
        console.log(obj[0].isRunning)
        return obj[0].isRunning
    } else {
        window.alert("[ERROR] function isRunning")
    }
}