function getValue(){
    var value=0;
    for (var i=0;i<8;i++){
        for(var j=0;j<8;j++){
            if(board[i][j].length>0){
                value += troop_vals[board[i][j][0].className][board[i][j][0].name];
            }
        }
    }
    return value;
}
var troop_vals={
    "black":{
        "king":90, "queen":9, "elephant":5, "camel":3, "horse":3, "slder":1
    },
    "white":{
        "king":-90, "queen":-9, "elephant":-5, "camel":-3, "horse":-3, "slder":-1
    }
};



var empty = document.getElementById("empty").children;
function donex(){
    let bestscore = -Infinity;
    var mov = { "scr": "", "dest": "" };
    
    for (scr in possmov) {
        if (possmov[scr].length > 0) {
            let scr_i = scr[0];
            let scr_j = scr[1];
            for (dest in possmov[scr]) {
                var oldboard = board;
                let dest_i = possmov[scr][dest][0];
                let dest_j = possmov[scr][dest][1];
                /*if (board[scr_i][scr_j][0].name == "king") {
                    capable_castling[user]["right"] = false;
                    capable_castling[user]["left"] = false;
                }
                if (board[scr_i][scr_j][0].name == "elephant") {
                    if (getA== capable_castling[user]["i"] + "0")
                }*/
                console.log(possmov[scr][dest]);
                board[dest_i][dest_j] = board[scr_i][scr_j];
                board[scr_i][scr_j] = empty;
                let score = minmax(board,false, 1);
                
                if (score > bestscore) {
                    
                    bestscore = score;
                    
                    mov["dest"] = possmov[scr][dest];
                    mov["scr"] = scr;
                    
                    console.log("done");
                }
                board = oldboard;
            }
        }
    }
    console.log(mov);
    document.getElementById(mov["dest"]).innerHTML = document.getElementById(mov["scr"]).innerHTML;
    document.getElementById(mov["scr"]).innerHTML = null;
    update();
    swapuser();
    possmov=getfilter(autocalculate());
}

function minimax(board,ismax, depth) {
    
    if (depth >= 5) {
        return getValue();
    }
    //var posmv=autocalculate();
    var possmov_temp = getfilter(autocalculate());
    if (ismax) {
        swapuser();
        let bestscore = -Infinity;
        for (sc in possmov_temp) {
            if (possmov_temp[sc].length > 0) {
                let scr_i = sc[0];
                let scr_j = sc[1];
                console.log(possmov_temp);
                for (dest in possmov_temp[sc]) {
                    var oldboard = board;
                    let dest_i = possmov_temp[sc][dest][0];
                    let dest_j = possmov_temp[sc][dest][1];
                    board[dest_i][dest_j] = board[scr_i][scr_j];
                    board[scr_i][scr_j] = empty;
                    let score = minmax(board,false, depth+1);
                    /*if (score > bestscore) {
                        bestscore = score;
                    }*/
                    bestscore=Math.max(bestscore,score);
                    board = oldboard;
                }
            }
        }
        return bestscore; 
    } else {
        swapuser();
        let bestscore = Infinity;
        for (scrr in possmov_temp) {
            if (possmov_temp[scrr].length > 0) {
                let scr_i = scrr[0];
                let scr_j = scrr[1];
                for (dest in possmov_temp[scrr]) {
                    var oldboard = board;
                    //console.log(posmv);
                    //console.log(scr + "" + posmv[scr][dest][0]);
                    let dest_i = possmov_temp[scrr][dest][0];
                    let dest_j = possmov_temp[scrr][dest][1];
                    board[dest_i][dest_j] = board[scr_i][scr_j];
                    board[scr_i][scr_j] = empty;
                    
                    let score = minmax(board,true, depth+1);
                    /*if (score < bestscore) {
                        bestscore = score;
                    }*/
                    bestscore=Math.min(bestscore,score);
                    board = oldboard;
                    console.log(depth);
                }
            }
        }
        return bestscore;
    }
    
}



function nextMove(){
    let bestscore = -Infinity;
    var mov = { "scr": "", "dest": "" };
    
    for (scr in possmov) {
        if (possmov[scr].length > 0) {
            let scr_i = scr[0];
            let scr_j = scr[1];
            for (dest in possmov[scr]) {
                var oldboard = board;
                let dest_i = possmov[scr][dest][0];
                let dest_j = possmov[scr][dest][1];
                /*if (board[scr_i][scr_j][0].name == "king") {
                    capable_castling[user]["right"] = false;
                    capable_castling[user]["left"] = false;
                }
                if (board[scr_i][scr_j][0].name == "elephant") {
                    if (getA== capable_castling[user]["i"] + "0")
                }*/
                console.log(possmov[scr][dest]);
                board[dest_i][dest_j] = board[scr_i][scr_j];
                board[scr_i][scr_j] = empty;
                let score = minmax(board,false, 1);
                
                if (score > bestscore) {
                    
                    bestscore = score;
                    
                    mov["dest"] = possmov[scr][dest];
                    mov["scr"] = scr;
                    
                    console.log("done");
                }
                board = oldboard;
            }
        }
    }
    console.log(mov);
    document.getElementById(mov["dest"]).innerHTML = document.getElementById(mov["scr"]).innerHTML;
    document.getElementById(mov["scr"]).innerHTML = null;
    update();
    swapuser();
    possmov=getfilter(autocalculate());
}

function minmax(board,ismax, depth) {
    
    if (depth >= 5) {
        return getValue();
    }
    var posmv=autocalculate();
    var posmv = getfilter(autocalculate());
    if (ismax) {
        swapuser();
        let bestscore = -Infinity;
        for (sc in posmv) {
            if (posmv[sc].length > 0) {
                console.log(sc);
                let scr_i =posmv[sc][0];
                let scr_j = posmv[sc][1];
                console.log(posmv);
                for (dest in posmv[sc]) {
                    var oldboard = board;
                    console.log(posmv[sc][dest][0]);
                    let dest_i = posmv[sc][dest][0];
                    let dest_j = posmv[sc][dest][1];
                    board[dest_i][dest_j] = board[scr_i][scr_j];
                    board[scr_i][scr_j] = empty;
                    let score = minmax(board,false, depth+1);
                    /*if (score > bestscore) {
                        bestscore = score;
                    }*/
                    bestscore=Math.max(bestscore,score);
                    board = oldboard;
                }
            }
        }
        return bestscore; 
    } else {
        swapuser();
        let bestscore = Infinity;
        for (scrr in posmv) {
            if (posmv[scrr].length > 0) {
                let scr_i = scrr[0];
                let scr_j = scrr[1];
                for (dest in posmv[scrr]) {
                    var oldboard = board;
                    //console.log(posmv);
                    //console.log(scr + "" + posmv[scr][dest][0]);
                    let dest_i = posmv[scrr][dest][0];
                    let dest_j = posmv[scrr][dest][1];
                    board[dest_i][dest_j] = board[scr_i][scr_j];
                    board[scr_i][scr_j] = empty;
                    
                    let score = minmax(board,true, depth+1);
                    /*if (score < bestscore) {
                        bestscore = score;
                    }*/
                    bestscore=Math.min(bestscore,score);
                    board = oldboard;
                    console.log(depth);
                }
            }
        }
        return bestscore;
    }
    
}
