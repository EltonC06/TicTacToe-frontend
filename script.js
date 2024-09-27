async function start(params) {

}

async function restart(params) {
    
}

async function makeMove(params) {
    
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

        console.log("ERROR Function isRunning")
        window.alert("ERROR function isRunning")
    }
}