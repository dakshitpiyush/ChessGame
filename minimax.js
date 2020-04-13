function getValue(){
    var value=0;
    for (var i=0;i<8;i++){
        for(var j=0;j<8;j++){
            if(board[i][j].length>0){
                value += troop_vals[board[i][j][0].getAttribute("class")][board[i][j][0].getAttribute("name")];
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

/*function nextMove() {
    let bestscore = -Infinity;
    var mov = { sr: "", de: "" };
    for (sour in possmov) {
        let sr_i = sour[0];
        let sr_j = sour[1];
        if (possmov[sour].length > 0) {
            for (dests in possmov[sour]) {
                let de_i = possmov[sour][dests][0];
                let de_j = possmov[sour][dests][1];
                //let old_capcas = capable_castling;
                if (board[sr_i][sr_j][0].getAttribute("name") == "king") {
                    capable_castling[user]["right"] = false;
                    capable_castling[user]["left"] = false;
                }
                if (board[sr_i][sr_j][0].getAttribute("name") == "elephant") {
                    if (sr_i==capable_castling[user]["i"] && sr_j == 0) {
                        capable_castling[user]["left"] = false;
                    } else if (sr_i == capable_castling[user]["i"] && sr_j == 7) {
                        capable_castling[user]["rigth"] = false;
                    }
                }
                var temp = board[de_i][de_j];
                board[de_i][de_j] = board[sr_i][sr_j];
                board[sr_i][sr_j] = empty;
                let score = minmax(false, 0);
                if (score > bestscore) {
                    bestscore = score;
                    mov["sr"] = sr_i + "" + sr_j;
                    mov["de"] = de_i + "" + de_j;
                }
                board[sr_i][sr_j] = board[de_i][de_j];
                board[de_i][de_j] = temp;
                //capable_castling = old_capcas;
            }
        }
    }
    document.getElementById(mov["de"]).innerHTML = document.getElementById(mov["sr"]).innerHTML;
    document.getElementById(mov["sr"]).innerHTML = "";
    update();
    swapuser();
}

function minmax(ismax, depth){
    swapuser();
    if (depth >= 3) {
        return getValue();
    }
    //console.log(depth);
    if (ismax) {
        let posmv = getfilter(autocalculate());
        let bestscore = -Infinity;
        let sur;
        for (sur in posmv) {
            let sir_i = sur[0];
            let sir_j = sur[1];
            if (posmv[sur].length > 0) {
                let dests;
                for (dests in posmv[sur]) {
                    let de_i = posmv[sur][dests][0];
                    let de_j = posmv[sur][dests][1];
                    //let old_capcas = capable_castling;
                    if (board[sir_i][sir_j][0].getAttribute("name") == "king") {
                        capable_castling[user]["right"] = false;
                        capable_castling[user]["left"] = false;
                    }
                    if (board[sir_i][sir_j][0].getAttribute("name") == "elephant") {
                        if (sir_i == capable_castling[user]["i"] && sir_j == 0) {
                            capable_castling[user]["left"] = false;
                        } else if (sir_i == capable_castling[user]["i"] && sir_j == 7) {
                            capable_castling[user]["rigth"] = false;
                        }
                    }
                    var temp = board[de_i][de_j];
                    board[de_i][de_j] = board[sir_i][sir_j];
                    board[sir_i][sir_j] = empty;
                    let score = minmax(false, depth + 1);
                    bestscore = Math.max(bestscore, score);
                    board[sir_i][sir_j] = board[de_i][de_j];
                    board[de_i][de_j] = temp;
                    //capable_castling = old_capcas;
                }
            }
        }
        return bestscore;
    } else {
        let posmv = getfilter(autocalculate());
        let bestscore = Infinity;
        let sur;
        for (sur in posmv) {
            let sir_i = sur[0];
            let sir_j = sur[1];
            if (posmv[sur].length > 0) {
                let dests;
                for (dests in posmv[sur]) {
                    let de_i = posmv[sur][dests][0];
                    let de_j = posmv[sur][dests][1];
                    //let old_capcas = capable_castling;
                    if (board[sir_i][sir_j][0].getAttribute("name") == "king") {
                        capable_castling[user]["right"] = false;
                        capable_castling[user]["left"] = false;
                    }
                    if (board[sir_i][sir_j][0].getAttribute("name") == "elephant") {
                        if (sir_i == capable_castling[user]["i"] && sir_j == 0) {
                            capable_castling[user]["left"] = false;
                        } else if (sir_i == capable_castling[user]["i"] && sir_j == 7) {
                            capable_castling[user]["rigth"] = false;
                        }
                    }
                    var temp = board[de_i][de_j];
                    board[de_i][de_j] = board[sir_i][sir_j];
                    board[sir_i][sir_j] = empty;
                    let score = minmax(true, depth+1);
                    bestscore = Math.min(bestscore, score);
                    board[sir_i][sir_j] = board[de_i][de_j];
                    board[de_i][de_j] = temp;
                    //capable_castling = old_capcas;
                }
            }
        }
        return bestscore;
    }
}*/
/*
function nextMove(){
    var bestscore=-Infinity;
    var move={"source":"","dest":""};
    user=ai;
    
     
    for(var i=0;i<8;i++){
        for(var j=0;j<8;j++){
            console.log(board[i][j]);
            
            if(board[i][j].length>0 && board[i][j][0].getAttribute("class")==user){
                for(moves in possmov[i+""+j]){
                    console.log(i+""+j);
                    console.log(board[i][j]);
                    var moves_i=possmov[i+""+j][moves][0];
                    var moves_j=possmov[i+""+j][moves][1];
                    var temp=board[moves_i][moves_j];
                    board[moves_i][moves_j]=board[i][j];
                    board[i][j]=empty;
                    var score=minimax(false,5);
                    
                    if(score>bestscore){
                        bestscore=score;
                        move["source"]=i+""+j;
                        move["dest"]=possmov[i+""+j][moves];  
                    }
                    board[i][j]=board[moves_i][moves_j];
                    board[moves_i][moves_j]=temp;
                }
                
                
            }
            
        }
        
    }
    console.log(bestscore);
    console.log(move);
    document.getElementById(move["dest"]).innerHTML = document.getElementById(move["source"]).innerHTML;
    document.getElementById(move["source"]).innerHTML=null ;
    
    update();
    user=human
    possmov=getfilter(autocalculate());
}
function minimax(isMax,depth){
    if(depth ==0){
        //console.log(getValue());
        return getValue();
    }
    var possmove=getfilter(autocalculate());
    
    if(isMax){
        user=ai;
        var possmove=getfilter(autocalculate());
        var bestscore=-Infinity;
        
        for(var i=0;i<8;i++){
            for(var j=0;j<8;j++){
                if(board[i][j].length>0 && board[i][j][0].getAttribute("class")==user){
                    
                    var moves;
                    for(moves in possmove[i+""+j]){
                        
                        var moves_i=possmove[i+""+j][moves][0];
                        var moves_j=possmove[i+""+j][moves][1];
                        var temp=board[moves_i][moves_j];
                        board[moves_i][moves_j]=board[i][j];
                        board[i][j]=empty;
                        var score=minimax(false,depth-1);
                        
                        if(score>bestscore){
                            //console.log("maximized:"+score);
                            bestscore=score;
                        }
                        
                        //bestscore=Math.max(bestscore,score);
                        board[i][j]=board[moves_i][moves_j];
                        board[moves_i][moves_j]=temp;
                    }
                }
            }
        }
        return bestscore;
    }
    else{
        user=human;
        var possmove=getfilter(autocalculate());
        var bestscore=Infinity;
        
        for(var i=0;i<8;i++){
            for(var j=0;j<8;j++){
                if(board[i][j].length>0 && board[i][j][0].getAttribute("class")==user){
                    
                    
                    var moves;
                    for(moves in possmove[i+""+j]){
                        
                        
                        var moves_i=possmove[i+""+j][moves][0];
                        var moves_j=possmove[i+""+j][moves][1];
                        var temp=board[moves_i][moves_j];
                        board[moves_i][moves_j]=board[i][j];
                        board[i][j]=empty;
                        var score=minimax(true,depth-1);
                       
                        if(score<bestscore){
                            //console.log("minimized:"+score);
                           bestscore=score;
                        }
                        //bestscore=Math.min(bestscore,score);
                        board[i][j]=board[moves_i][moves_j];
                        board[moves_i][moves_j]=temp;
                    }
                }
            }
        }
        return bestscore;
    }
}*/
function nextMove() {
    var bestscore = -Infinity;
    var move = { "source": "", "dest": "" };
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {

            if (board[i][j].length > 0 && board[i][j][0].getAttribute("class") == user) {
                let moves;
                for (moves in possmov[i + "" + j]) {
                    
                    var moves_i = possmov[i + "" + j][moves][0];
                    var moves_j = possmov[i + "" + j][moves][1];
                    var temp = board[moves_i][moves_j];
                    board[moves_i][moves_j] = board[i][j];
                    board[i][j] = empty;
                    swapuser();
                    var score = minimax(false, 3);
                    swapuser();
                    if (score > bestscore) {
                        bestscore = score;
                        move["source"] = i + "" + j;
                        move["dest"] = possmov[i + "" + j][moves];
                    }
                    board[i][j] = board[moves_i][moves_j];
                    board[moves_i][moves_j] = temp;
                }
            }
        }
    }
    //console.log(move);
    document.getElementById(move["dest"]).innerHTML = document.getElementById(move["source"]).innerHTML;
    document.getElementById(move["source"]).innerHTML = null;

    update();
    swapuser();
    possmov = getfilter(autocalculate());
}

function minimax(isMax, depth) {
    if (depth == 0) {
        //console.log(getValue());
        return getValue();
    }
    if (isMax) {
        var possmove = getfilter(autocalculate());
        var bestscore = -Infinity;
        var moves;
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                if (board[i][j].length > 0 && board[i][j][0].getAttribute("class") == user) {
                    for (moves in possmove[i + "" + j]) {
                        
                        var moves_i = possmove[i + "" + j][moves][0];
                        var moves_j = possmove[i + "" + j][moves][1];
                        var temp = board[moves_i][moves_j];
                        board[moves_i][moves_j] = board[i][j];
                        board[i][j] = empty;
                        swapuser();
                        var score = minimax(false, depth - 1);
                        swapuser();
                        //if(score>bestscore){
                        //    bestscore=score;
                        //}
                        bestscore = Math.max(bestscore, score);
                        board[i][j] = board[moves_i][moves_j];
                        board[moves_i][moves_j] = temp;
                    }
                }
            }
        }
        return bestscore;
    }
    else {
        var possmove = getfilter(autocalculate());
        var bestscore = Infinity;
        var moves;
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                if (board[i][j].length > 0 && board[i][j][0].getAttribute("class") == user) {
                    for (moves in possmove[i + "" + j]) {
                        
                        var moves_i = possmove[i + "" + j][moves][0];
                        var moves_j = possmove[i + "" + j][moves][1];
                        var temp = board[moves_i][moves_j];
                        board[moves_i][moves_j] = board[i][j];
                        board[i][j] = empty;
                        swapuser();
                        var score = minimax(true, depth - 1);
                        swapuser();
                        //if(score<bestscore){
                        //   bestscore=score;
                        //}
                        bestscore = Math.min(bestscore, score);
                        board[i][j] = board[moves_i][moves_j];
                        board[moves_i][moves_j] = temp;
                    }
                }
            }
        }
        return bestscore;
    }
}