let currRound = 0;

async function roundBumperAndUpdate(){
    currRound += 1;
    setScene(`<div>РАУНД ${currRound}</div>`, "roundBumper");
    currState = "roundSelector";
    html.addEventListener('keypress', keyListener, false);
};

let teamObjects = [
    {
        name: "Команда 1",
        score: 0
    },
    {
        name: "Команда 2",
        score: 0
    },
    {
        name: "Команда 3",
        score: 0
    }
];

function teamGet(param, id){
    return teamObjects[id][param];
};

let currTeam = 0;

async function beginGAME(){
    const teamNames = [id("nameTeam1"), id("nameTeam2"), id("nameTeam3")];
    let bigNi = 0;
    while (bigNi != teamNames.length){
        if(teamNames[bigNi].value != ""){
            console.log(`Black Team${bigNi + 1} ${teamNames[bigNi].value}`);
            teamObjects[bigNi].name = teamNames[bigNi].value;
        }
        bigNi = bigNi + 1;
    };
    await roundBumperAndUpdate();
    currTeam = 0;
};

let keyListener = function(event){
    console.log("Black pressing " + event.key);
    keyLog(event.key);
};

function keyLog(key){

    if(currState == "roundSelector"){
        switch(key){
            case("1"):
            setupRound(currRound);
            break;
        }
    }

    if(currState == "r1"){
    switch(key){
        case("1"):
        if(questProgress == 5 && currTeam !=3){
            clearInterval(intervalId);
            round1();
        }
        else if(currTeam == 3){
            currTeam = 0;
            clearInterval(intervalId);
            reset();
            roundBumperAndUpdate();
        }
        break;
        case("["):
        if(questProgress > 1){
        questProgress -= 1;
        questSetShowR1(questProgress);
        };
        break;
        case("]"):
        ScobePressed += 1;
        if(ScobePressed == 1){
            intervalId = startTimer(60);
        };
        if(questProgress < 5){
        questProgress += 1;
        questSetShowR1(questProgress);
        }
        else{
            questShowResultR1();
        };
        break;
        case("a"):
        questSetShowR1(questProgress, false)
        break;
        case("s"):
        questSetShowR1(questProgress, true)
        break;
    };
    };

    if(currState == "r2"){
        switch(key){
            case("1"):
            if(questProgress == 3 && currTeam !=3){
                round2();
            }
            else if(currTeam == 3){
                currTeam = 0;
                reset();
                roundBumperAndUpdate();
            }
            break;
            case("a"):
            showTruthR2(false);
            break;
            case("s"):
            showTruthR2(true);
            break;

            case("["):
            if(questProgress > 1){
            questProgress -= 1;
            questSetShowR2(questProgress);
            };
            break;
            case("]"):
            if(questProgress < 3){
            questProgress += 1;
            questSetShowR2(questProgress);
            }
            else{
                questSetShowR2();
            };
            break;
            };
        };



        if(currState == "r3"){
            switch(key){
                case("1"):
                if(teamr3done == true && currTeam !=3){
                    round3();
                }
                else if(currTeam == 3){
                    currTeam = 0;
                    reset();
                    roundBumperAndUpdate();
                }
                break;
                case("a"):
                showTruthR3("left");
                break;
                case("s"):
                showTruthR3("right");
                break;

                case("0"):
                round3CounterCategoryShowner += 1
                    setShowCategory3(currTeam);
                break;
    
                case("["):
                if(questProgress > 0){
                questProgress -= 1;
                questSetShowR3(questProgress);
                };
                break;
                case("]"):
                if(questProgress < 2){
                questProgress += 1;
                questSetShowR3(questProgress);
                }
                else{
                    questSetResultR3();
                };
                break;
                };
            };



            if(currState == "r4"){
                switch(key){
                    case("1"):
                    if(teamr4ready == true && currTeam !=3){
                        round4();
                    }
                    else if(currTeam == 3){
                        currTeam = 0;
                        reset();
                        roundBumperAndUpdate();
                    }
                    break;
                    case("]"):
                    truthCheckerR4R5()
                    break;
                    };
            };

            if(currState == "finale1"){
                switch(key){
                    case("]"):
                    nextFinale();
                    reset();
                    break;
                    };
            };


            if(currState == "r5"){
                switch(key){
                    case("1"):
                    if(teamr4ready == true && currTeam !=3){
                        round5();
                    }
                    else if(currTeam == 3){
                        currTeam = 0;
                        reset();
                        setToFinale();
                    }
                    break;
                    case("]"):
                    truthCheckerR4R5()
                    break;
                    };
            };
};

function setupRound(num){
    reset();
    switch(num){
        case(1):
        round1();
        break;
        case(2):
        round2();
        break;
        case(3):
        round3();
        break;
        case(4):
        round4();
        break;
        case(5):
        round5();
        break;
    }
}

let questProgress = 0;
let intervalId = 0;
let ScobePressed = 0;
let teamRound1RESULT = [
    {
        "1": false,
        "2": false,
        "3": false,
        "4": false,
        "5": false,
        "6": false,
        "7": false
    },
    {
        "1": false,
        "2": false,
        "3": false,
        "4": false,
        "5": false,
        "6": false,
        "7": false
    },
    {
        "1": false,
        "2": false,
        "3": false,
        "4": false,
        "5": false,
        "6": false,
        "7": false
    }
];
async function round1(){
    currState = "r1";
    ScobePressed = 0;
    currTeam += 1;
    questProgress = 0;
    html.addEventListener('keypress', keyListener, false);
    setScene(`<h2 class="teamName">${teamGet("name", currTeam - 1)}</h2> <p id="counterQuiz">${questProgress} из 5</p> <img id="timeClock" src='assets/punchtheclock.svg'><p id="time">01:00</p> <h1 id="question"></h1> <div id="results"></div>`, "round round1");
};

function startTimer(duration) {
    var timer = duration, minutes, seconds;
    var intervalId = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        id("time").innerHTML = minutes + ":" + seconds;

        if (--timer < 0) {
            clearInterval(intervalId);
            hideTimer();
            timeENDED();
        }
    }, 1000);
    return intervalId;
};

function hideTimer(){
    clearInterval(intervalId);
    tf("time", "");
    id("timeClock").remove()
};

function timeENDED(){
    questProgress = 7;
    questShowResultR1();
    insert("game", `<h1>Время вышло!</h1>`);
};

function questSetShowR1(int, correct){
    tf("counterQuiz", `${int} из 5`);
    if(correct != undefined){
        teamRound1RESULT[currTeam - 1][int] = correct;
        if(correct == false){
            var text = " Неверно! Правильный ответ: ";
        }
        else{
            doPoints()
            var text = " Верно! Правильный ответ: ";
        };
        tf("question", questionsTeam["team" + currTeam]["round1"][int - 1].q + text + questionsTeam["team" + currTeam]["round1"][int - 1].a);
    }
    else{
        id("question").setAttribute("class", "activeQuestion")
    tf("question", questionsTeam["team" + currTeam]["round1"][int - 1].q);
    };
};

function questShowResultR1(){
    let gigaNi = 0;
    tf("question", "");
    id("question").setAttribute("class", "")
    id("results").innerHTML = "";
    while(gigaNi != questionsTeam["team" + currTeam]["round1"].length){
        var text = "";
        console.log(teamRound1RESULT[currTeam - 1]);
        console.log(teamRound1RESULT[currTeam - 1][gigaNi + 1]);
        if(teamRound1RESULT[currTeam - 1][gigaNi + 1] == false){
            text = "<img src='assets/x.svg'>";
        }else{
            text = "<img src='assets/c.svg'>";
        };
        insert("results", `<div><h3>${questionsTeam["team" + currTeam]["round1"][gigaNi].q}</h3>${text}</div>`);
        gigaNi += 1;
    };

    hideTimer();
};

function round2(){
    currState = "r2";
    currTeam += 1;
    questProgress = 0;
    ScobePressed = 0;
    html.addEventListener('keypress', keyListener, false);
    setScene(`<h2 class="teamName">${teamGet("name", currTeam - 1)}</h2> <h3 id="question"></h3> <div id="media"></div>`, "round round2");
};

function questSetShowR2(int){
    var el = questionsTeam["team" + currTeam]["round2"][int - 1];
    switch(el.type){
        case("text"):
        id("media").innerHTML = "";
        break;
        case("image"):
        id("media").innerHTML = `<img src="${el.url}">`;
        break;
        case("video"):
        id("media").innerHTML = `<video autoplay><source src="${el.url}" type="video/mp4"></video>`;
        break;
    };
    tf("question", el.qu);
    id("question").setAttribute("class", "activeQuestion")
};

function showTruthR2(isCorrect){
    var el = questionsTeam["team" + currTeam]["round2"][questProgress - 1];
    if(isCorrect){
        doPoints()
        insert("media", `<h1 class="result">Верно! Правильный ответ: ${el.ans}</h1>`);
    }
    else{
        insert("media", `<h1 class="result">Неверно! Правильный ответ: ${el.ans}</h1>`);
    };
};

let round3CounterCategoryShowner = 0;

let teamr3done = false;

function round3(){
    correctAns3 = 0
    teamr3done = false;
    round3CounterCategoryShowner = 0;
    currState = "r3";
    currTeam += 1;
    questProgress = -1;
    ScobePressed = 0;
    html.addEventListener('keypress', keyListener, false);
    setScene(`<h2 class="teamName">${teamGet("name", currTeam - 1)}</h2> <h3 id="category"></h3> <div id="variants"></div> <h2 id="messageCorrect"></h2>`, "round round3");
};

function setShowCategory3(argument){
    var el = questionsTeam["team" + currTeam]["round3"].category;
    tf("category", el);
}

let rightAnsPos = "bababab";
let incorrectAnsPos = "bababab";
let correctAns3 = 0;

function questSetShowR3(arg){
    console.log(questProgress);
    id("messageCorrect").innerHTML = "";
    document.getElementById("messageCorrect").setAttribute("class", "")
    var el = questionsTeam["team" + currTeam]["round3"].abs[arg];
    var el2 = questionsTeam["team" + currTeam]["round3"].abs[arg].category;
    tf("category", el2);
    var randomNumber = Math.floor(Math.random() * 2);
    if(randomNumber == 1){
        rightAnsPos = "right";
        incorrectAnsPos = "left";
        id("variants").innerHTML = `<div class='var1' id='left'>${el.wrong}</div><div class='var2' id='right'>${el.correct}</div>`;
    }
    else{
        rightAnsPos = "left";
        incorrectAnsPos = "right";
        id("variants").innerHTML = `<div class='var1' id='left'>${el.correct}</div><div class='var2' id='right'>${el.wrong}</div>`;
    };
    
};

function showTruthR3(arg){
    document.getElementById("messageCorrect").setAttribute("class", "messageCorrect")
    if(arg == rightAnsPos){
        doPoints()
        tf("messageCorrect", "Верно!");
        var n = "var2";
        if(arg == "right"){
            n = "var1";
        };

        correctAns3 += 1;

        var n2 = "var2";
        if(incorrectAnsPos == "right"){
            n2 = "var1";
        }
        id(arg).setAttribute("class", n + " choosen correct");
        id(incorrectAnsPos).setAttribute("class", n2 + " incorrect");
    }
    else if(arg == incorrectAnsPos){
        tf("messageCorrect", "Неверно!");
        var n = "var2";
        if(arg == "right"){
            n = "var1";
        };

        var n2 = "var2";
        if(incorrectAnsPos == "right"){
            n2 = "var1";
        };
        id(arg).setAttribute("class", n + " choosen incorrect");
        id(incorrectAnsPos).setAttribute("class", n2 + " correct");
    };
};

function questSetResultR3(){
    id("category").innerHTML = ``;
    id("variants").innerHTML = ``;
    id("messageCorrect").innerHTML = ``;

    insert("game", `<h1 class="result">${correctAns3} из 3</h1>`);
    teamr3done = true;
};

let teamr4ready = false;

function round4(){
    teamr4ready = false;
    currState = "r4";
    currTeam += 1;
    ScobePressed = 0;
    html.addEventListener('keypress', keyListener, false);
    setScene(`<h2 class="teamName">${teamGet("name", currTeam - 1)}</h2> <div id="variants"></div>`, "round round4");
    createQuestsR4();
};


function createQuestsR4(){
    var el = questionsTeam["team" + currTeam]["round4"];
    let le = [el.b1, el.b2, el.b3];
    let le2 = [el.a1, el.a2, el.a3];
    let fni = 0;
    console.log("test2");
    const cases = [
        [0, 2, 1],
        [1, 2, 0],
        [2, 0, 1],
        [1, 0, 2]
    ]
    var rand = Math.floor(Math.random() * 4)
    while(fni < 3){
        var black = cases[rand]
        var blackblack = black[fni]
        console.log("test");
        insert("variants", `<div id="team${blackblack}">${le2[blackblack]} <select id="select${blackblack}" onclick="teamr4ready = true"><option>Выберите вариант</option><option value="0">${le[0]}</option><option value="1">${le[1]}</option><option value="2">${le[2]}</option></select></div>`)
        fni = fni + 1;
    };
};


function round5(){
    teamr4ready = false;
    currState = "r5";
    currTeam += 1;
    ScobePressed = 0;
    html.addEventListener('keypress', keyListener, false);
    setScene(`<h2 class="teamName">${teamGet("name", currTeam - 1)}</h2> <div id="variants"></div>`, "round round5");
    createQuestsR5();
};


function createQuestsR5(){
    var el = questionsTeam["team" + currTeam]["round5"];
    let le = [el.b1, el.b2, el.b3];
    let le2 = [el.a1, el.a2, el.a3];
    let fni = 0;
    console.log("test2");
    const cases = [
        [0, 2, 1],
        [1, 2, 0],
        [2, 0, 1],
        [1, 0, 2]
    ]
    var rand = Math.floor(Math.random() * 4)
    while(fni < 3){
        var black = cases[rand]
        var blackblack = black[fni]
        console.log("test");
        insert("variants", `<div id="team${blackblack}">${le2[blackblack]} <select id="select${blackblack}" onclick="teamr4ready = true"><option>Выберите вариант</option><option value="0">${le[0]}</option><option value="1">${le[1]}</option><option value="2">${le[2]}</option></select></div>`)
        fni = fni + 1;
    };
};

function doredgreen(id, bool){
    if(bool == true){
        document.getElementById(id).setAttribute("class", "green")
    }
    else{
        document.getElementById(id).setAttribute("class", "red")
    }
}

function truthCheckerR4R5(){
    let result = 0

    if(id("select0").value == "0"){
        doPoints()
        doredgreen("team0", true)
        result = result + 1
    }
    else{
        doredgreen("team0", false)
    }
    if(id("select1").value == "1"){
        doPoints()
        result = result + 1
        doredgreen("team1", true)
    }
    else{
        doredgreen("team1", false)
    }
    if(id("select2").value == "2"){
        doPoints()
        result = result + 1
        doredgreen("team2", true)
    }
    else{
        doredgreen("team2", false)
    }
    console.log(result)
    console.log(id("select0").value)
    console.log(id("select1").value)
    console.log(id("select2").value)
}

function reset(){
    html.removeEventListener('keypress', keyListener, false);
};

function doPoints(){
    teamObjects[currTeam - 1]["score"] += + 1
    console.log(teamObjects[currTeam - 1]["score"] + " scor!!!")
}

async function setToFinale(){
    setScene(`<h2 id='finaleText'>Итоги игры</h2>`, "finale");
    currState = "finale1";
    html.addEventListener('keypress', keyListener, false);
};

function wait(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

async function nextFinale(){
    id("finaleText").setAttribute('style', 'animation: hideFinale 1s ease-in-out forwards;')
    await wait(1);
    setScene(`
    <h1>Таблица лидеров</h1>
    <div class="resultTable">
    <div class="nomenTop"><p>Имя команды</p><p>Счёт</p></div>
    <div class="resultTableDiv"><p>${teamGet("name", 0)}</p><p>${wordScoreTransform(teamGet("score", 0))}</p></div>
    <div class="resultTableDiv"><p>${teamGet("name", 1)}</p><p>${wordScoreTransform(teamGet("score", 1))}</p></div>
    <div class="resultTableDiv"><p>${teamGet("name", 2)}</p><p>${wordScoreTransform(teamGet("score", 2))}</p></div>
    </div>
    `, "finale");
    currState = "score";
};


function wordScoreTransform(value){
    var number = value.toString();
    var lastDigit = number.charAt(number.length - 1);
    var last2Digit = number.charAt(number.length -2);
    console.log(last2Digit)
    if(value == 1){
        return value + " балл"
    }
    else if(last2Digit == 1 && lastDigit < 9 || lastDigit == 0){
        return value + " баллов"
    }
    else if(lastDigit == 1){
        return value + " балл"
    }
    else if(lastDigit == 2 || lastDigit == 3 || lastDigit == 4){
        return value + " балла"
    }
    else if(lastDigit == 5 || lastDigit == 6 || lastDigit == 7 || lastDigit == 8 || lastDigit == 9){
        return value + " баллов"
    }
}