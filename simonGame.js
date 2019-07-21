let colors = ["block1", "block2", "block3", "block4"];
let order = [];
let userOrder = [];
let firstTime = true;
let score = 0;

order[0] = colors[random(0, 4)];

function listColors() {
    firstTime = false;
    let i = 0;
    let l = setInterval(function() {
        let e = document.getElementById(order[i]);
        e.style.animation = "clicked 0.5s linear";
        i++;
        setTimeout(function() {
            e.style.animation = "";
        }, 501);
        if (i === order.length) {
            clearInterval(l);
        }
    }, 800);

    document.getElementById("startButton").innerHTML = "Check answers";
}

function checkColors() {
    console.log("checkColors triggered");
    if (JSON.stringify(userOrder) === JSON.stringify(order)) {
        console.log("order matches");
        score++;
        return true;
    } else {
        console.log("order doesn't match");
        return false;
    }
}

document.getElementById("startButton").addEventListener("click", buttonClicked);

function buttonClicked() {
    if (firstTime) {
        listColors();
        document.getElementById("info").innerHTML = "Repeat the pattern!";
        document.getElementById("startButton").style.display = "none";
    } else if (checkColors()) {
        userOrder = [];
        order[order.length] = colors[random(0, 4)];
        document.getElementById("info").style.color = "green";
        document.getElementById("info").innerHTML = "Correct!";
        document.getElementById("score").innerHTML = "Score: " + score;
        setTimeout(listColors, 400);
    } else if (!checkColors()) {
        document.getElementById("info").style.color = "red";
        document.getElementById("info").innerHTML = "Wrong!";        
    }
}

for (let i = 0; i < 4; i++) {
    document.getElementsByClassName("block")[i].addEventListener("click", function() {
        userOrder[userOrder.length] = this.id;
        switch(this.id) {
            case "block1":
            document.getElementById("info").style.color = "#40b74a";
            document.getElementById("info").innerHTML = "Green";
            break;
            case "block2":
            document.getElementById("info").style.color = "#e20016";
            document.getElementById("info").innerHTML = "Red";
            break;
            case "block3":
            document.getElementById("info").style.color = "#e4e822";
            document.getElementById("info").innerHTML = "Yellow";
            break;
            case "block4":
            document.getElementById("info").style.color = "#157fd6";
            document.getElementById("info").innerHTML = "Blue";
            break;
        }
        console.log("recorded click on " + this.id);
        if (userOrder.length === order.length) {
            buttonClicked();
        }
    });
}

function random(min, max) {
    return Math.floor(Math.random() * max) + min;
}

function sleep(m) {
    let d = new Date().getTime();
    for (i = 0; i < 1e7; i++) {
        if (new Date().getTime() - d == m) {
            break;
        }
    }
}