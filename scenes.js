function setScene(scene, styleclass){
    game.setAttribute("class", styleclass)
    if(styleclass.includes("round ")){
        game.innerHTML = scene + "<img class='deco' src='assets/deco.png'>"
    }
    else{
       game.innerHTML = scene 
    }
    
};

setScene(`<h2>КВИЗ, "Объекты культурного наследия территории РФ"</h2>
<button onclick="begin()">Далее</button>`, "begin");

function begin(){
    setScene(`<h2>КВИЗ, "Объекты культурного наследия территории РФ"</h2>
    <div class="teamDiv">
        <div>
            <h3>Команда 1</h3>
            <input type="text" placeholder="Придумайте название своей команде" id="nameTeam1" autocomplete="off">
        </div>
        <div>
            <h3>Команда 2</h3>
            <input type="text" placeholder="Придумайте название своей команде" id="nameTeam2" autocomplete="off">
        </div>
        <div>
            <h3>Команда 3</h3>
            <input type="text" placeholder="Придумайте название своей команде" id="nameTeam3" autocomplete="off">
        </div>
    </div>
    <button onclick="beginGAME()">Начать</button>`, "teamChoose")
};