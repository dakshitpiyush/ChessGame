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

console.log(troop_vals[board[7][0][0].getAttribute("class")][board[7][0][0].getAttribute("name")]);
console.log(getValue());