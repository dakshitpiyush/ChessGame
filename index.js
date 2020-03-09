//creating board
var cboard = document.getElementById('chessboard');
for(var i=0; i<8;i++){
    cboard.innerHTML += "<tr id='"+i+"'>";
    for(var j=0; j<8;j++){
        document.getElementById(i).innerHTML += '<td class="cell" id="'+i+''+j+'" onclick="markPossible(this)"></td>';
        if((i%2==0 && j%2==1) || (i%2==1 && j%2==0)){
            document.getElementById(i+''+j).style.backgroundColor = "black";
        }
    }
    cboard.innerHTML += "</tr>";
}

//setting position of troop
var ind=0,jnd=0;
var pos={
    black:{
        elephant:[{i:ind,j:jnd},{i:ind,j:(7-jnd++)}],
        horse:[{i:ind,j:jnd},{i:ind,j:(7-jnd++)}],
        camel:[{i:ind,j:jnd},{i:ind,j:(7-jnd++)}],
        queen:[{i:ind,j:jnd}],
        king:[{i:ind,j:(7-jnd)}],
        slder:[
            {i:++ind,j:(jnd=0)},
            {i:ind,j:++jnd},
            {i:ind,j:++jnd},
            {i:ind,j:++jnd},
            {i:ind,j:++jnd},
            {i:ind,j:++jnd},
            {i:ind,j:++jnd},
            {i:ind,j:++jnd}
        ]
    },
    white:{
        elephant:[{i:(ind=7),j:(jnd=0)},{i:ind,j:(7-jnd++)}],
        horse:[{i:ind,j:jnd},{i:ind,j:(7-jnd++)}],
        camel:[{i:ind,j:jnd},{i:ind,j:(7-jnd++)}],
        queen:[{i:ind,j:jnd}],
        king:[{i:ind,j:(7-jnd)}],
        slder:[
            {i:--ind,j:(jnd=0)},
            {i:ind,j:++jnd},
            {i:ind,j:++jnd},
            {i:ind,j:++jnd},
            {i:ind,j:++jnd},
            {i:ind,j:++jnd},
            {i:ind,j:++jnd},
            {i:ind,j:++jnd}
        ]
    }

};
//place troops in it's place
for(color in pos){
    for(elem in pos[color]){
        for(value in pos[color][elem]){
            var i = pos[color][elem][value]['i'], j = pos[color][elem][value]['j'];
            document.getElementById(i+""+j).innerHTML = "<h3 class='"+color+"' name='"+elem+"'>"+elem+"</h3>";
        }
    }
}
var human="white",ai="black";
var user=human;
var possmov={};
var board=[];
function update(){
    for(var i=0;i<8;i++){
        board[i]=[];
        for(var j=0;j<8;j++){
            board[i][j]=document.getElementById(i+""+j).children;
        }
    }
}

function autocalculate(){
    for(var i=0;i<8;i++){
        for(var j=0;j<8;j++){
            if(board[i][j].length>0){
                if(board[i][j][0].getAttribute("class") == user){
                    possmov[i+""+j]=[];
                    switch(board[i][j][0].getAttribute("name")){
                        case "slder":
                            if(user=="white"){
                                if(i==6){
                                    var inc=1;
                                    while(inc<=2){
                                        var x=i-inc;
                                        if(board[x][j].length>0){
                                            break;
                                        }
                                        possmov[i+""+j][inc-1]=x+""+j;
                                        inc++;
                                    }

                                }else{
                                    var x=i-1;
                                    if(board[x][j].length==0){
                                        possmov[i+""+j][0]=x+""+j;
                                    }
                                }
                            } else{
                                if(i==1){
                                    var inc=1;
                                    while(inc<=2){
                                        var x=i+inc;
                                        if(board[x][j].length>0){
                                            break;
                                        }
                                        possmov[i+""+j][inc-1]=x+""+j;
                                        inc++;
                                    }
                                } else{
                                    var x=i+1;
                                    if(board[x][j].length==0){
                                        possmov[i+""+j][0]=x+""+j;
                                    }
                                }
                            }
                            var len=possmov[i+""+j].length;
                            if(user == "white"){
                                var x=i-1;
                            } else{
                                var x=i+1;
                            }
                            var y=j-1;
                            if(y>=0){
                                if(board[x][y].length>0){
                                    if(board[x][y][0].getAttribute("class") != user){
                                        possmov[i+""+j][len++]=x+""+y;
                                    }
                                }
                            }
                            y=j+1;
                            if(y<8){
                                if(board[x][y].length>0){
                                    if(board[x][y][0].getAttribute("class") != user){
                                        possmov[i+""+j][len++]=x+""+y;
                                    }
                                }
                            }
                            break;
                        case "elephant":
                            var inc=0,x=i+1,y=j;
                            while(x<8){
                                if(board[x][y].length>0){
                                    if(board[x][y][0].getAttribute("class")==user){
                                        break;
                                    }
                                }
                                possmov[i+""+j][inc]=x+""+y;
                                inc++;
                                if(board[x][y].length>0){
                                    if(board[x][y][0].getAttribute("class")!=user){
                                        break;
                                    }
                                }
                                x++;
                            }
                            x=i-1;
                            while(x>=0){
                                if(board[x][y].length>0){
                                    if(board[x][y][0].getAttribute("class")==user){
                                        break;
                                    }
                                }
                                possmov[i+""+j][inc]=x+""+y;
                                inc++;
                                if(board[x][y].length>0){
                                    if(board[x][y][0].getAttribute("class")!=user){
                                        break;
                                    }
                                }
                                x--;
                            }
                            x=i;
                            y=j+1;
                            while(y<8){
                                if(board[x][y].length>0){
                                    if(board[x][y][0].getAttribute("class")==user){
                                        break;
                                    }
                                }
                                possmov[i+""+j][inc]=x+""+y;
                                inc++;
                                if(board[x][y].length>0){
                                    if(board[x][y][0].getAttribute("class")!=user){
                                        break;
                                    }
                                }
                                y++;
                            }
                            y=j-1;
                            while(y>=0){
                                if(board[x][y].length>0){
                                    if(board[x][y][0].getAttribute("class")==user){
                                        break;
                                    }
                                }
                                possmov[i+""+j][inc]=x+""+y;
                                inc++;
                                if(board[x][y].length>0){
                                    if(board[x][y][0].getAttribute("class")!=user){
                                        break;
                                    }
                                }
                                y--;
                            }
                            break;
                        case "camel":
                            var x=i-1,y=j-1,inc=0;
                            while(x>=0 && y>=0){
                                if(board[x][y].length>0){
                                    if(board[x][y][0].getAttribute("class")==user){
                                        break;
                                    }
                                }
                                possmov[i+""+j][inc]=x+""+y;
                                inc++;
                                if(board[x][y].length>0){
                                    if(board[x][y][0].getAttribute("class")!=user){
                                        break;
                                    }
                                }
                                x--;
                                y--;
                            }
                            x=i-1;
                            y=j+1;
                            while(x>=0 && y<8){
                                if(board[x][y].length>0){
                                    if(board[x][y][0].getAttribute("class")==user){
                                        break;
                                    }
                                }
                                possmov[i+""+j][inc]=x+""+y;
                                inc++;
                                if(board[x][y].length>0){
                                    if(board[x][y][0].getAttribute("class")!=user){
                                        break;
                                    }
                                }
                                x--;
                                y++;
                            }
                            x=i+1;
                            y=j-1;
                            while(x<8 && y>=0){
                                if(board[x][y].length>0){
                                    if(board[x][y][0].getAttribute("class")==user){
                                        break;
                                    }
                                }
                                possmov[i+""+j][inc]=x+""+y;
                                inc++;
                                if(board[x][y].length>0){
                                    if(board[x][y][0].getAttribute("class")!=user){
                                        break;
                                    }
                                }
                                x++;
                                y--;
                            }
                            x=i+1;
                            y=j+1;
                            while(x<8 && y<8){
                                if(board[x][y].length>0){
                                    if(board[x][y][0].getAttribute("class")==user){
                                        break;
                                    }
                                }
                                possmov[i+""+j][inc]=x+""+y;
                                inc++;
                                if(board[x][y].length>0){
                                    if(board[x][y][0].getAttribute("class")!=user){
                                        break;
                                    }
                                }
                                x++;
                                y++;
                            }
                            break;
                        case "queen":
                            var inc=0,x=i+1,y=j;
                            while(x<8){
                                if(board[x][y].length>0){
                                    if(board[x][y][0].getAttribute("class")==user){
                                        break;
                                    }
                                }
                                possmov[i+""+j][inc]=x+""+y;
                                inc++;
                                if(board[x][y].length>0){
                                    if(board[x][y][0].getAttribute("class")!=user){
                                        break;
                                    }
                                }
                                x++;
                            }
                            x=i-1;
                            while(x>=0){
                                if(board[x][y].length>0){
                                    if(board[x][y][0].getAttribute("class")==user){
                                        break;
                                    }
                                }
                                possmov[i+""+j][inc]=x+""+y;
                                inc++;
                                if(board[x][y].length>0){
                                    if(board[x][y][0].getAttribute("class")!=user){
                                        break;
                                    }
                                }
                                x--;
                            }
                            x=i;
                            y=j+1;
                            while(y<8){
                                if(board[x][y].length>0){
                                    if(board[x][y][0].getAttribute("class")==user){
                                        break;
                                    }
                                }
                                possmov[i+""+j][inc]=x+""+y;
                                inc++;
                                if(board[x][y].length>0){
                                    if(board[x][y][0].getAttribute("class")!=user){
                                        break;
                                    }
                                }
                                y++;
                            }
                            y=j-1;
                            while(y>=0){
                                if(board[x][y].length>0){
                                    if(board[x][y][0].getAttribute("class")==user){
                                        break;
                                    }
                                }
                                possmov[i+""+j][inc]=x+""+y;
                                inc++;
                                if(board[x][y].length>0){
                                    if(board[x][y][0].getAttribute("class")!=user){
                                        break;
                                    }
                                }
                                y--;
                            }

                            x=i-1;
                            y=j-1;
                            while(x>=0 && y>=0){
                                if(board[x][y].length>0){
                                    if(board[x][y][0].getAttribute("class")==user){
                                        break;
                                    }
                                }
                                possmov[i+""+j][inc]=x+""+y;
                                inc++;
                                if(board[x][y].length>0){
                                    if(board[x][y][0].getAttribute("class")!=user){
                                        break;
                                    }
                                }
                                x--;
                                y--;
                            }
                            x=i-1;
                            y=j+1;
                            while(x>=0 && y<8){
                                if(board[x][y].length>0){
                                    if(board[x][y][0].getAttribute("class")==user){
                                        break;
                                    }
                                }
                                possmov[i+""+j][inc]=x+""+y;
                                inc++;
                                if(board[x][y].length>0){
                                    if(board[x][y][0].getAttribute("class")!=user){
                                        break;
                                    }
                                }
                                x--;
                                y++;
                            }
                            x=i+1;
                            y=j-1;
                            while(x<8 && y>=0){
                                if(board[x][y].length>0){
                                    if(board[x][y][0].getAttribute("class")==user){
                                        break;
                                    }
                                }
                                possmov[i+""+j][inc]=x+""+y;
                                inc++;
                                if(board[x][y].length>0){
                                    if(board[x][y][0].getAttribute("class")!=user){
                                        break;
                                    }
                                }
                                x++;
                                y--;
                            }
                            x=i+1;
                            y=j+1;
                            while(x<8 && y<8){
                                if(board[x][y].length>0){
                                    if(board[x][y][0].getAttribute("class")==user){
                                        break;
                                    }
                                }
                                possmov[i+""+j][inc]=x+""+y;
                                inc++;
                                if(board[x][y].length>0){
                                    if(board[x][y][0].getAttribute("class")!=user){
                                        break;
                                    }
                                }
                                x++;
                                y++;
                            }
                            break;
                            case "horse":
                                var x=i+2,y=j+1,inc=0;
                                if(x<8 && y<8 && (board[x][y].length==0 || board[x][y][0].getAttribute("class")!=user)){
                                    possmov[i+""+j][inc++]=x+""+y;
                                }
                                y=j-1;
                                if(x<8 && y>=0 && (board[x][y].length==0 || board[x][y][0].getAttribute("class")!=user)){
                                    possmov[i+""+j][inc++]=x+""+y;
                                }
                                x=i-2;
                                if(x>=0 && y>=0 && (board[x][y].length==0 || board[x][y][0].getAttribute("class")!=user)){
                                    possmov[i+""+j][inc++]=x+""+y;
                                }
                                y=j+1
                                if(x>=0 && y<8 && (board[x][y].length==0 || board[x][y][0].getAttribute("class")!=user)){
                                    possmov[i+""+j][inc++]=x+""+y;
                                }
                                x=i+1; y=j+2;
                                if(x<8 && y<8 && (board[x][y].length==0 || board[x][y][0].getAttribute("class")!=user)){
                                    possmov[i+""+j][inc++]=x+""+y;
                                }
                                x=i-1;
                                if(x>=0 && y<8 && (board[x][y].length==0 || board[x][y][0].getAttribute("class")!=user)){
                                    possmov[i+""+j][inc++]=x+""+y;
                                }
                                y=j-2;
                                if(x>=0 && y>=0 && (board[x][y].length==0 || board[x][y][0].getAttribute("class")!=user)){
                                    possmov[i+""+j][inc++]=x+""+y;
                                }
                                x=i+1;
                                if(x<8 && y>=0 && (board[x][y].length==0 || board[x][y][0].getAttribute("class")!=user)){
                                        possmov[i+""+j][inc++]=x+""+y;
                                }
                                break;
                                case "king":
                                    var x=i+1,inc=0;
                                    if(x<8 && (board[x][j].length==0 || board[x][j][0].getAttribute("class")!=user)){
                                        possmov[i+""+j][inc++]=x+""+j;
                                    }
                                    x=i-1;
                                    if(x>=0 && (board[x][j].length==0 || board[x][j][0].getAttribute("class")!=user)){
                                        possmov[i+""+j][inc++]=x+""+j;
                                    }
                                    x=j+1;
                                    if(x<8 && (board[i][x].length==0 || board[i][x][0].getAttribute("class")!=user)){
                                        possmov[i+""+j][inc++]=i+""+x;
                                    }
                                    x=j-1;
                                    if(x>=0 && (board[i][x].length==0 || board[i][x][0].getAttribute("class")!=user)){
                                        possmov[i+""+j][inc++]=i+""+x;
                                    }
                                    break;
                    }
                }
            }
        }
    }
}
update();
autocalculate();
console.log(board);
var cur_pos='';
var currenttroop='';
var cur_tr_po_mov=[];
var cur_tr_po_mov_bg=[];
var cboard = document.getElementById('chessboard');
function markPossible(source){
    if(source.style.backgroundColor=="rgb(140, 246, 255)"){
        source.innerHTML=currenttroop;
        document.getElementById(cur_pos).innerHTML='';
        for(var i=0;i<cur_tr_po_mov.length;i++){
            document.getElementById(cur_tr_po_mov[i]).style.background=cur_tr_po_mov_bg[i];
        }
        cur_pos='';
        currenttroop='';
        cur_tr_po_mov=[];
        cur_tr_po_mov_bg=[];
        possmov={};
        update();
        autocalculate();

    }
    else if(source.children.length>0 && source.getAttribute("id")!=cur_pos && source.children[0].getAttribute("class")==human){
        possmov={};
        update();
        autocalculate();
        for(var i=0;i<cur_tr_po_mov.length;i++){
            document.getElementById(cur_tr_po_mov[i]).style.background=cur_tr_po_mov_bg[i];
        }
        var idd=source.getAttribute("id");
        cur_pos=idd;
        currenttroop=source.innerHTML;
        for(var i=0;i<possmov[idd].length;i++){
            cur_tr_po_mov_bg.push(document.getElementById(possmov[idd][i]).style.backgroundColor);
            document.getElementById(possmov[idd][i]).style.background="rgb(140, 246, 255)";
            cur_tr_po_mov.push(possmov[idd][i]);
        }
    }
}
