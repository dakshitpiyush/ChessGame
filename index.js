
//creating board

var possmov = {};
var board = [];
function update() {
    for (var i = 0; i < document.getElementsByTagName("td").length; i++) {
        board[parseInt(document.getElementsByTagName("td")[i].id)] = document.getElementsByTagName("td")[i].children.length > 0 ? { type: document.getElementsByTagName("td")[i].children[0].name, color: document.getElementsByTagName("td")[i].children[0].className } : null;

    }
}
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
function autocalculate() {
    var possmov = {};
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
    return possmov;
}
function ifCheck(king_pos, user){
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
                return !blocked;
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
update();
//var Date = new Date();
var intial, end;
//var Date = new Date();
intial = new Date().getTime();
possmov = autocalculate();
end = new Date().getTime();
console.log(end - intial);
var prev = possmov;
var cur_pos = '';
var currenttroop = '';
var cur_tr_po_mov = [];
var cur_tr_po_mov_bg = [];
var high;
var khatra;
var cboard = document.getElementById('chessboard');
async function markPossible(source) {
    //if(source.style.backgroundColor=="rgb(140, 246, 255)"){
    if (source.children.length > 0 && source.lastChild.classList[0] == "dot") {
        if (document.getElementsByClassName("check").length > 0) {
            $('.check').remove();
            document.getElementById("results").innerHTML = "";
            document.getElementById("results").style.display = "none";
        }
        if (source.firstChild == source.lastChild) {
            new Audio("move.wav").play();
        }
        else {
            new Audio("kill.wav").play();
        }
        source.innerHTML = currenttroop.innerHTML;
        document.getElementById(cur_pos).innerHTML = '';
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
        cur_pos = '';
        currenttroop = '';
        cur_tr_po_mov = [];
        cur_tr_po_mov_bg = [];
        checkbit = ifCheck();
        update();
        swapuser();
        possmov = getfilter(autocalculate());
        var res = result();
        if (res == "checkmate") {
            document.getElementById("results").style.display = "block";
            audio = new Audio('mate.wav');
            audio.play();
            khatra = document.createElement("div");
            khatra.classList.add("mate");
            document.getElementById(king_pos).appendChild(khatra);
            document.getElementById("results").innerHTML = "CHECK-MATE";
        }
        else if (checkbit) {
            document.getElementById("results").style.display = "block";
            audio = new Audio('check.wav');
            audio.play();
            khatra = document.createElement("div");
            khatra.classList.add("check");
            document.getElementById(king_pos).appendChild(khatra);
            document.getElementById("results").innerHTML = "CHECK";
        } else if (res == "stillmate") {
            document.getElementById("results").style.display = "block";
            audio = new Audio('mate.wav');
            audio.play();
            document.getElementById("results").innerHTML = "STILL-MATE";
        }
        // (res == null) {
            //donext();
        //}
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
        //document.getElementsByClassName("white").style.transform="rotate(180deg)";
    }
    else if (source.children.length > 0 && source.children[0].className == user) {
        if (document.getElementsByClassName("dot").length > 0) {
            $('.dot').remove();
        }
        cur_pos = '';
        currenttroop = '';
        cur_tr_po_mov = [];
        cur_tr_po_mov_bg = [];
        var idd = source.getAttribute("id");
        cur_pos = idd;
        currenttroop = source;
        for (var i = 0; i < possmov[idd].length; i++) {
            high = document.createElement("div");
            high.classList.add("dot");
            document.getElementById(possmov[idd][i]).appendChild(high);
            cur_tr_po_mov.push(possmov[idd][i]);
        }
    }
}
var king_pos;
function ifCheck() {
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            if (board[i][j].length > 0) {
                if (board[i][j][0].name == "king" && board[i][j][0].className != user) {
                    king_pos = i + "" + j;
                }
            }
        }
    }
    var posmov = autocalculate();          //if we use getfilter here program will colapse
    for (arr in posmov) {
        if (posmov[arr].includes(king_pos)) {
            return true;
        }
    }
    return false;
}
function swapuser() {
    if (user == human) {
        user = ai;
    } else {
        user = human;
    }
}
function prevdef(event) {
    event.preventDefault();
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
}*/