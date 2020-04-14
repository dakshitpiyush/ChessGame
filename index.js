//creating board

var possmov = {};
var board = [];
function update() {
    for (var i = 0; i < document.getElementsByTagName("td").length; i++) {
        board[parseInt(document.getElementsByTagName("td")[i].id)] = document.getElementsByTagName("td")[i].children.length > 0 ? { type: document.getElementsByTagName("td")[i].children[0].name, color: document.getElementsByTagName("td")[i].children[0].className } : null;

    }
}
kingpos={ white:74, black:4 }; 
var slder_offsets = {
    black: [10, 20, 9, 11, 1],
    white: [-10, -20, -9, -11, 6]
};
var other_offsets = {
    elephant: [10, -10, 1, -1],
    camel: [11, -11, 9, -9],
    queen: [10, 11, -10, -11, 1, -1, 9, -9],
    horse: [21, 19, -21, -19, 12, 8, -12, -8],
    king: [10, 11, -10, -11, 1, -1, 9, -9]
};
attacks=[
    5,	0,	0,	0,	0,	0,	0,	3,	0,	0,	0,	0,	0,	0,	5,
    0,	5,	0,	0,	0,	0,	0,	3,	0,	0,	0,	0,	0,	5,	0,
    0,	0,	5,	0,	0,	0,	0,	3,	0,	0,	0,	0,	5,	0,	0,
    0,	0,	0,	5,	0,	0,	0,	3,	0,	0,	0,	5,	0,	0,	0,
    0,	0,	0,	0,	5,	0,	0,	3,	0,	0,	5,	0,	0,	0,	0,
    0,	0,	0,	0,	0,	5,	16,	3,	16,	5,	0,	0,	0,	0,	0,
    0,	0,	0,	0,	0,	16,	13,	3,	13,	16,	0,	0,	0,	0,	0,
    3,	3,	3,	3,	3,	3,	3,	0,	3,	3,	3,	3,	3,	3,	3,
    0,	0,	0,	0,	0,	16,	13,	3,	13,	16,	0,	0,	0,	0,	0,
    0,	0,	0,	0,	0,	5,	16,	3,	16,	5,	0,	0,	0,	0,	0,
    0,	0,	0,	0,	5,	0,	0,	3,	0,	0,	5,	0,	0,	0,	0,
    0,	0,	0,	5,	0,	0,	0,	3,	0,	0,	0,	5,	0,	0,	0,
    0,	0,	5,	0,	0,	0,	0,	3,	0,	0,	0,	0,	5,	0,	0,
    0,	5,	0,	0,	0,	0,	0,	3,	0,	0,	0,	0,	0,	5,	0,
    5,	0,	0,	0,	0,	0,	0,	3,	0,	0,	0,	0,	0,	0,	5
														
]
attack_offsets=[
    11,	0,	0,	0,	0,	0,	0,	10,	0,	0,	0,	0,	0,	0,	9,
    0,	11,	0,	0,	0,	0,	0,	10,	0,	0,	0,	0,	0,	9,	0,
    0,	0,	11,	0,	0,	0,	0,	10,	0,	0,	0,	0,	9,	0,	0,
    0,	0,	0,	11,	0,	0,	0,	10,	0,	0,	0,	9,	0,	0,	0,
    0,	0,	0,	0,	11,	0,	0,	10,	0,	0,	9,	0,	0,	0,	0,
    0,	0,	0,	0,	0,	11,	21,	10,	19,	9,	0,	0,	0,	0,	0,
    0,	0,	0,	0,	0,	12,	11,	10,	9,	8,	0,	0,	0,	0,	0,
    1,	1,	1,	1,	1,	1,	1,	0,	-1,	-1,	-1,	-1,	-1,	-1,	-1,
    0,	0,	0,	0,	0,	-8,	-9,	-10,	-11,	-12,	0,	0,	0,	0,	0,
    0,	0,	0,	0,	0,	-9,	-19,	-10,	-21,	-11,	0,	0,	0,	0,	0,
    0,	0,	0,	0,	-9,	0,	0,	-10,	0,	0,	-11,	0,	0,	0,	0,
    0,	0,	0,	-9,	0,	0,	0,	-10,	0,	0,	0,	-11,	0,	0,	0,
    0,	0,	-9,	0,	0,	0,	0,	-10,	0,	0,	0,	0,	-11,	0,	0,
    0,	-9,	0,	0,	0,	0,	0,	-10,	0,	0,	0,	0,	0,	-11,	0,
    -9,	0,	0,	0,	0,	0,	0,	-10,	0,	0,	0,	0,	0,	0,	-11
];
posattack={
    queen:1, elephant:2, camel:4, slder:8, horse:16, king:0   
}
movhistory=[];
function autocalculate() {
    var possmov = {};
    var sqare;
    for (sqare of sqares) {
        if (board[sqare] != null && board[sqare].color == user) {
            possmov[sqare] = [];
            if (board[sqare].type == "slder") {
                var des_sqare = sqare + slder_offsets[user][0];
                // one sqare w/o capture
                if (board[des_sqare] !== undefined && board[des_sqare] == null) {
                    possmov[sqare].push(des_sqare);
                    //second sqare w/o capture
                    des_sqare = sqare + slder_offsets[user][1];
                    if (Math.floor(sqare / 10) == slder_offsets[user][4] && board[des_sqare] == null) {
                        possmov[sqare].push(des_sqare);
                    }
                }
                //slder w capture
                for (var k = 2; k < 4; k++) {
                    des_sqare = sqare + slder_offsets[user][k];
                    if (board[des_sqare] !== undefined && board[des_sqare] != null) {
                        possmov[sqare].push(des_sqare);
                    }
                }
            } else {
                for (var k = 0; k < other_offsets[board[sqare].type].length; k++) {
                    var offset = other_offsets[board[sqare].type][k];
                    var des_sqare = sqare;
                    while (true) {
                        des_sqare += offset;
                        if (board[des_sqare] === undefined)
                            break;
                        if (board[des_sqare] == null) {
                            possmov[sqare].push(des_sqare);
                        } else {
                            if (board[des_sqare].color == user)
                                break;
                            possmov[sqare].push(des_sqare);
                            break;
                        }
                        if (board[sqare].type == "king" || board[sqare].type == "horse")
                            break;
                    }
                }
            }
        }
    }
    lim_pos={};
    var opponent=swapuser();
    for(var sqare of sqares){
        if(possmov[sqare]===undefined) 
            continue;
        lim_pos[sqare] = [];
        for(var dests of possmov[sqare]){
            doVirtual(sqare, dests);
            if(!isCheck(kingpos[user], opponent))
                lim_pos[sqare].push(dests);
            undo();
        }
    }
    if(!isCheck(kingpos[user],opponent))
        if(capable_castling[user].left)
            if(lim_pos[kingpos[user]].includes(kingpos[user]-1) 
                &&board[kingpos[user]-2]==null && board[kingpos[user]-3]==null
                && isCheck(kingpos[user]-2, opponent)
            )
                lim_pos[kingpos[user]].push(kingpos[user]-2);
    
        if(capable_castling[user].right)
            if(lim_pos[kingpos[user]].includes(kingpos[user]+1)
                && board[kingpos[user]+2]==null
                && isCheck(kingpos[user]+2, opponent)
            )
                lim_pos[kingpos[user]].push(kingpos[user]+2);
    
    return lim_pos;
}
function isCheck(king_pos, user){
    var sqare;
    for(sqare of sqares){
        if(board[sqare]!=null && board[sqare].color==user){
            var troop=board[sqare];
            var index=getIndex(sqare, king_pos)
            if(attacks[index] & posattack[troop.type]){
                if(troop.type=="slder"){
                    if(index<100) {
                        if(user=="black")
                            return true;
                    }
                    else{
                        if(user=="white")
                            return true;
                    }
                    continue;
                }
                if(troop.type=="horse")
                    return true;
                
                var offset=attack_offsets[index];
                var mid_sqare=sqare+offset;
                var blocked=false;
                while(mid_sqare !== king_pos){
                    if(board[mid_sqare]!=null){
                        blocked=true;
                        break;
                    }
                    mid_sqare += sqare+offset;
                }
                if(!blocked)
                    return true;
            }
        }
    }
    return false;    
}
function swapuser(){
    return user==human?ai:human;
}
function getIndex(first, second){
    var dec_diff=first-second;
    var oct_diff=parseInt(first,8)-parseInt(second,8);
    var factor=dec_diff-oct_diff;
    return dec_diff+(factor*2.5)+112;
}
//do virtual move
function doVirtual(from, to){
    var movment={
        from:from,
        to:to,
        troop:board[to]
    };
    if(board[from].type=="king"){
        kingpos[user]=to;
        movment.castle=capable_castling[user];
        capable_castling[user].right=capable_castling[user].left=false;
        //castling
        if(from-to == 2){
            board[to-2]=board[to+1]
            board[to-2]=null;
        }else if(from-to == -2){
            board[to+1]=board[to-1]
            board[to+1]=null;
        }
    }
    else if(board[from].type=="elephant"){
        if(from == pos[user].elephant[0]){
            movment.castle=capable_castling[user].left;
            capable_castling[user].left=false;
        }else if(from == pos[user].elephant[1]){
            movment.castle=capable_castling[user].right;
            capable_castling[user].right=false;
        }

    }
    if(movment.troop!=null && movment.troop.type=="elephant"){
        var opponent=swapuser();
        if(to == pos[opponent].elephant[0]){
            movment.op_castle=capable_castling[opponent].left;
            capable_castling[opponent].left=false;
        }else if(to == pos[opponent].elephant[1]){
            movment.op_castle=capable_castling[opponent].right;
            capable_castling[opponent].right=false;
        }
    }
    board[to]=board[from];
    board[from]=null;
    movhistory.push(movment);
}
function undo(){
    var movment=movhistory.pop();
    var from=movment.from;
    var to=movment.to;
    board[from]=board[to];
    board[to]=movment.troop;

    if(board[from].type=="king"){
        kingpos[user]=from;
        capable_castling[user]=movment.castle;
        if(from-to == 2){
            board[to+1]=board[to-2]
            board[to+1]=null;
        }else if(from-to == -2){
            board[to-1]=board[to+1]
            board[to-1]=null;
        }
    }
    else if(board[from].type=="elephant"){
        if(from == pos[user].elephant[0]){
            capable_castling[user].left=movment.castle;
        }else if(from == pos[user].elephant[1]){
            capable_castling[user].right=movment.castle;
        }
    }
    if(movment.troop!=null && movment.troop.type=="elephant"){
        var opponent=swapuser();
        if(to == pos[opponent].elephant[0]){
            capable_castling[opponent].left=movment.op_castle;
        }else if(to == pos[opponent].elephant[1]){
            capable_castling[opponent].right=movment.op_castle;
        }
    }
}
update();
possmov = autocalculate();

var prev = possmov;

var currenttroop = '';

var cboard = document.getElementById('chessboard');
async function markPossible(source) {
    if (source.children.length > 0 && source.lastChild.classList[0] == "dot") {
        if (document.getElementsByClassName("check").length > 0) {
            $('.check').remove();
            document.getElementById("results").innerHTML = "";
            document.getElementById("results").style.display = "none";
        }
        if (source.firstChild == source.lastChild) {
            new Audio("move.wav").play();
        } else {
            new Audio("kill.wav").play();
        }

        source.innerHTML = currenttroop.innerHTML;
        currenttroop.innerHTML = '';

        while (document.getElementsByClassName("dot").length > 0) {
            $('.dot').remove();
        }
        if (source.children[0].name == "king") {
            if (currenttroop.getAttribute("id") == capable_castling[user]["i"] + "4") {
                if (source.getAttribute("id") == capable_castling[user]["i"] + "2") {
                    document.getElementById(capable_castling[user]["i"] + "3").innerHTML = document.getElementById(capable_castling[user]["i"] + "0").innerHTML;
                    document.getElementById(capable_castling[user]["i"] + "0").innerHTML = "";
                }
                else if (source.getAttribute("id") == capable_castling[user]["i"] + "6") {
                    document.getElementById(capable_castling[user]["i"] + "5").innerHTML = document.getElementById(capable_castling[user]["i"] + "7").innerHTML;
                    document.getElementById(capable_castling[user]["i"] + "7").innerHTML = "";
                }
            }
        }
        if (source.children[0].name == "king") {
            capable_castling[user]["left"] = false;
            capable_castling[user]["right"] = false;
        }
        if (source.children[0].name == "elephant") {
            if (currenttroop.getAttribute("id") == capable_castling[user]["i"] + "0") {
                capable_castling[user]["left"] = false;
            }
        }
        if (source.children[0].name == "slder") {
            if (Math.floor(source.getAttribute("id") / 10) == 0 || Math.floor(source.getAttribute("id") / 10) == 7) {
                var option_list = ["queen", "horse", "camel", "elephant"];
                var option_div = document.getElementById("choosee");
                for (value in option_list) {
                    option_div.innerHTML += "<input type='radio' id='" + option_list[value] + "' value='" + option_list[value] + "' name='choose_option' >";
                    option_div.innerHTML += "<label for='" + option_list[value] + "'><img src='icons/" + option_list[value] + "_" + user + ".png'></lable>";
                }
                for (var i = 0; i < 8; i++) {
                    for (var j = 0; j < 8; j++) {
                        document.getElementById(i + "" + j).style.pointerEvents = "none";
                    }
                }
                let promise = new Promise((resolve, reject) => {
                    document.getElementsByName("choose_option")[0].onclick = function () {
                        resolve(document.getElementsByName("choose_option")[0].value);
                    }
                    document.getElementsByName("choose_option")[1].onclick = function () {
                        resolve(document.getElementsByName("choose_option")[1].value);
                    }
                    document.getElementsByName("choose_option")[2].onclick = function () {
                        resolve(document.getElementsByName("choose_option")[2].value);
                    }
                    document.getElementsByName("choose_option")[3].onclick = function () {
                        resolve(document.getElementsByName("choose_option")[3].value);
                    }
                });
                let selection = await promise;
                for (var i = 0; i < 8; i++) {
                    for (var j = 0; j < 8; j++) {
                        document.getElementById(i + "" + j).style.pointerEvents = "auto";
                    }
                }
                source.innerHTML = "<img class='" + user + "' name='" + selection + "' src='icons/" + selection + "_" + user + ".png'>"
                document.getElementById("choosee").innerHTML = "";

            }
        }

        
        currenttroop = '';
        var opponent=swapuser();
        checkbit = isCheck(kingpos[user], opponent);
        update();
        user=opponent;
        possmov = autocalculate();
        var res = result();
        if (res == "checkmate") {
            document.getElementById("results").style.display = "block";
            audio = new Audio('mate.wav');
            audio.play();

            var khatra = document.createElement("div");
            khatra.classList.add("mate");
            document.getElementById(kingpos[user]).appendChild(khatra);
            document.getElementById("results").innerHTML = "CHECK-MATE";
        }
        else if (checkbit) {
            document.getElementById("results").style.display = "block";
            audio = new Audio('check.wav');
            audio.play();
            var khatra = document.createElement("div");
            khatra.classList.add("check");
            document.getElementById(king_pos[kingpos[user]]).appendChild(khatra);
            document.getElementById("results").innerHTML = "CHECK";
        } else if (res == "stillmate") {
            document.getElementById("results").style.display = "block";
            audio = new Audio('mate.wav');
            audio.play();
            document.getElementById("results").innerHTML = "STILL-MATE";
        }
    
        if (user == ai) {
            document.getElementById("chessboard").style.transform = "rotate(180deg)";
            for (els in document.getElementsByClassName("cell")) {
                if (els < 64) {
                    document.getElementsByClassName("cell")[els].style.transform = "rotate(180deg)";
                }
            }
        }
        else {
            document.getElementById("chessboard").style.transform = "rotate(360deg)";
            for (els in document.getElementsByClassName("cell")) {
                if (els < 64) {
                    document.getElementsByClassName("cell")[els].style.transform = "rotate(0deg)";
                }
            }
        }
    }
    else if (source.children.length > 0 && source.children[0].className == user) {
        if (document.getElementsByClassName("dot").length > 0) {
            $('.dot').remove();
        }

        var idd = source.getAttribute("id");
        currenttroop = source;

        for (var i = 0; i < possmov[idd].length; i++) {
            var high = document.createElement("div");
            high.classList.add("dot");
            document.getElementById(possmov[idd][i]).appendChild(high);
        }

    }
}

function result() {
    var isZeropos = true;
    for (arr in possmov) {
        if (possmov[arr].length > 0) {
            isZeropos = false;
            break;
        }
    }
    if (checkbit && isZeropos) {
        return "checkmate";
    } else if (isZeropos) {
        return "stillmate";
    } else {
        return null;
    }
}

function doActual(from, to){
    
}
/*
//additional function for prevent self cause check to self mhanje swatala check n honya sathi
function getfilter(possmov) {
    var lim_pos = {};
    var empt = document.getElementById("empty").children;
    for (arre in possmov) {
        var source_j = arre % 10, source_i = (arre - source_j) / 10, inc = 0;
        lim_pos[arre] = [];
        for (values in possmov[arre]) {
            var dest_j = possmov[arre][values] % 10, dest_i = (possmov[arre][values] - dest_j) / 10;
            var temp = board[dest_i][dest_j];
            board[dest_i][dest_j] = board[source_i][source_j];
            board[source_i][source_j] = empt;
            swapuser();
            if (!ifCheck()) {
                lim_pos[arre].push(possmov[arre][values]);
            }
            swapuser();
            board[source_i][source_j] = board[dest_i][dest_j];
            board[dest_i][dest_j] = temp;
        }
    }
    if (!checkbit) {
        if (capable_castling[user]["left"]) {
            var color = capable_castling[user]["i"];
            if (board[color][2].length == 0 && board[color][1].length == 0 && lim_pos[color + "4"].includes(color + "3")) {
                swapuser();
                var cas_pos = autocalculate();
                var bit = true;
                for (arre in cas_pos) {
                    if (cas_pos[arre].includes(color + "2")) {
                        bit = false;
                        break;
                    }
                }
                swapuser();
                if (bit) {
                    lim_pos[color + "4"].push(color + "2");
                }
            }
        }
        if (capable_castling[user]["right"]) {
            var color = capable_castling[user]["i"];

            if (board[color][6].length == 0 && lim_pos[color + "4"].includes(color + "5")) {
                swapuser();
                var cas_pos = autocalculate();
                var bit = true;
                for (arre in cas_pos) {
                    if (cas_pos[arre].includes(color + "6")) {
                        bit = false;
                        break;
                    }
                }
                swapuser();
                if (bit) {
                    lim_pos[color + "4"].push(color + "6");
                }
            }
        }
    }

    return lim_pos;
}

*/