//creating board
var cboard = document.getElementById('chessboard');
for(var i=0; i<8;i++){
    cboard.innerHTML += "<tr id='"+i+"'>";
    for(var j=0; j<8;j++){
        document.getElementById(i).innerHTML += '<td class="cell" id="'+i+''+j+'" onclick="markPossible(this)"></td>';
        if((i%2==0 && j%2==1) || (i%2==1 && j%2==0)){
            document.getElementById(i+''+j).style.backgroundColor = "#7f5733";
        }else{
            document.getElementById(i+''+j).style.backgroundColor = "white";
        }
    }
    cboard.innerHTML += "</tr>";
}
var castling={"white":{"left":[71,72,73],"right":[75,76]},"black":{"left":[01,02,03],"right":[05,06]}};
var capable_castling={"white":{"i":7,"right":true,"left":true},"black":{"i":0,"right":true,"left":true}};
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
            document.getElementById(i+""+j).innerHTML = "<img class='"+color+"' name='"+elem+"' src='icons/"+elem+"_"+color+".png'>";
        }
    }
}
var human="white",ai="black";
var user=human,checkbit=false;
console.log(user);
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
console.log(user);
function autocalculate(){
    var possmov={}; //this variable is diffrant than global one
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
                                    if(x>=0 && board[x][j].length==0){
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
                                    if(x<8 && board[x][j].length==0){
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
                            if(y>=0 && x>=0 && x<8){
                                if(board[x][y].length>0){
                                    if(board[x][y][0].getAttribute("class") != user){
                                        possmov[i+""+j][len++]=x+""+y;
                                    }
                                }
                            }
                            y=j+1;
                            if(y<8 && x>=0 && x<8){
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
                                x=i-1;
                                var y=j-1;
                                if(x>=0 && y>=0 && (board[x][y].length==0 || board[x][y][0].getAttribute("class")!=user)){
                                    possmov[i+""+j][inc++]=x+""+y;
                                }
                                
                                x=i-1,y=j+1;
                                if(x>=0 && y<8 && (board[x][y].length==0 || board[x][y][0].getAttribute("class")!=user)){
                                    possmov[i+""+j][inc++]=x+""+y;
                                }
                                x=j+1,y=j+1;
                                if(x<8 && y<8 &&(board[x][y].length==0 || board[x][y][0].getAttribute("class")!=user)){
                                    possmov[i+""+j][inc++]=x+""+y;
                                }
                                y=j-1,x=i+1;
                                if(x<8 && y>=0 &&(board[x][y].length==0 || board[x][y][0].getAttribute("class")!=user)){
                                    possmov[i+""+j][inc++]=x+""+y;
                                }
                                break;

                    }
                }
            }
        }
    }
    return possmov;
}
//additional function for prevent self cause check to self mhanje swatala check n honya sathi
function getfilter(possmov){                                         
    var lim_pos={};
    var empt=document.getElementById("empty").children;
        for(arre in possmov){
            var source_j=arre%10,source_i=(arre-source_j)/10,inc=0;
            lim_pos[arre]=[];
            for(values in possmov[arre]){
                var dest_j=possmov[arre][values]%10,dest_i=(possmov[arre][values]-dest_j)/10;
                var temp=board[dest_i][dest_j]; 
                board[dest_i][dest_j]=board[source_i][source_j];
                board[source_i][source_j]=empt;
                if(user==human){
                    user=ai;
                } else{
                    user=human;
                }
                if(!ifCheck()){
                    lim_pos[arre][inc++]=possmov[arre][values];
                }
                if(user==human){
                    user=ai;
                } else{
                    user=human;
                }
                board[source_i][source_j]=board[dest_i][dest_j];
                board[dest_i][dest_j]=temp;
            }
        }
        if(!checkbit){
            if(capable_castling[user]["left"]){
                var color=capable_castling[user]["i"];
                if( board[color][2].length==0 && board[color][1].length==0 && lim_pos[color+"4"].includes(color+"3")){
                    swapuser();
                    var cas_pos=autocalculate();
                    var bit=true;
                    for(arre in cas_pos){
                        if(cas_pos[arre].includes(color+"2")){
                            bit= false;
                            break;
                        }
                    }
                    swapuser();
                    if(bit){
                        lim_pos[color+"4"].push(color+"2");
                    }
                }  
            }
            if(capable_castling[user]["right"]){
                var color=capable_castling[user]["i"];
                if( board[color][6].length==0 && lim_pos[color+"4"].includes(color+"5")){
                    swapuser();
                    var cas_pos=autocalculate();
                    var bit=true;
                    for(arre in cas_pos){
                        if(cas_pos[arre].includes(color+"6")){
                            bit= false;
                            break;
                        }
                    }
                    swapuser();
                    if(bit){
                        lim_pos[color+"4"].push(color+"6");
                    }
                }  
            }
        }

        return lim_pos;
}
update();
possmov=getfilter(autocalculate());
var prev=possmov;
var cur_pos='';
var currenttroop='';
var cur_tr_po_mov=[];
var cur_tr_po_mov_bg=[];


var cboard = document.getElementById('chessboard');
async function markPossible(source){
    
    if(source.style.backgroundColor=="rgb(140, 246, 255)"){
        source.innerHTML=currenttroop.innerHTML;
        document.getElementById(cur_pos).innerHTML='';
        for(var i=0;i<cur_tr_po_mov.length;i++){
            document.getElementById(cur_tr_po_mov[i]).style.background=cur_tr_po_mov_bg[i];
        }
            if(source.children[0].getAttribute("name")=="king"){
                if(currenttroop.getAttribute("id")==capable_castling[user]["i"]+"4"){
                    if(source.getAttribute("id")==capable_castling[user]["i"]+"2"){
                        document.getElementById(capable_castling[user]["i"]+"3").innerHTML=document.getElementById(capable_castling[user]["i"]+"0").innerHTML;
                        document.getElementById(capable_castling[user]["i"]+"0").innerHTML="";
                    }
                    else if(source.getAttribute("id")==capable_castling[user]["i"]+"6"){
                        document.getElementById(capable_castling[user]["i"]+"5").innerHTML=document.getElementById(capable_castling[user]["i"]+"7").innerHTML;
                        document.getElementById(capable_castling[user]["i"]+"7").innerHTML="";
                    }
                }
            }
            if(source.children[0].getAttribute("name")=="king"){
                   capable_castling[user]["left"] =false;
                capable_castling[user]["right"] =false;
            }
            if(source.children[0].getAttribute("name")=="elephant"){
                
                if(currenttroop.getAttribute("id")==capable_castling[user]["i"]+"0"){
                    capable_castling[user]["left"] =false; 
                }
            }
            if(source.children[0].getAttribute("name")=="slder"){
                if(Math.floor(source.getAttribute("id")/10)==0 || Math.floor(source.getAttribute("id")/10)==7){
                    document.getElementById("choose").style.display="block";
                    for(var i=0;i<8;i++){
                        for(var j=0;j<8;j++){
                            document.getElementById(i+""+j).style.pointerEvents = "none";
                        }
                    }
                    let promise =new Promise((resolve, reject)=>{
                        document.getElementById("choose").onchange=function(){
                            resolve(document.getElementById("choose").value);
                        }
                    });
                    let selection = await promise;
                    for(var i=0;i<8;i++){
                        for(var j=0;j<8;j++){
                            document.getElementById(i+""+j).style.pointerEvents = "auto";
                        }
                    }
                    source.innerHTML="<img class='"+user+"' name='"+selection+"' src='icons/"+selection+"_"+user+".png'>"
                    document.getElementById("choose").style.display="none";
                    
                }
            }
        cur_pos='';
        currenttroop='';
        cur_tr_po_mov=[];
        cur_tr_po_mov_bg=[];

        

        update();
        var res;
        if(ifCheck()){
            res=true;
            checkbit=true;
        }
        
        if(user==human){
            user=ai;
        } else{
            user=human;
        }
        
        
        possmov=getfilter(autocalculate());
        
        if(res){
            
            var mate=true;
            for(arr in possmov){
                if(possmov[arr].length>0){
                    alert("check");
                    mate=false;
                    break;
                }
            }
            if(mate){
                alert("checkmate");
            }
        }
        
    }
    else if(source.children.length>0 && source.children[0].getAttribute("class")==user ){
    
        for(var i=0;i<cur_tr_po_mov.length;i++){
            document.getElementById(cur_tr_po_mov[i]).style.background=cur_tr_po_mov_bg[i];
        }
        var idd=source.getAttribute("id");
        cur_pos=idd;
        currenttroop=source;
        for(var i=0;i<possmov[idd].length;i++){
            cur_tr_po_mov_bg.push(document.getElementById(possmov[idd][i]).style.backgroundColor);
            document.getElementById(possmov[idd][i]).style.background="rgb(140, 246, 255)";
            cur_tr_po_mov.push(possmov[idd][i]);
        }
    }
}

function ifCheck(){
    for(var i=0;i<8;i++){
        for(var j=0;j<8;j++){
            if(board[i][j].length>0){
                if(board[i][j][0].getAttribute("name")=="king" && board[i][j][0].getAttribute("class")!=user){
                    var king_pos=i+""+j;
                }
            }
        }
    }
    var posmov=autocalculate();          //if we use getfilter here program will colapse
    for(arr in posmov){
        if(posmov[arr].includes(king_pos)){
            return true;
        }
    }

   
    return false;
}
function swapuser(){
    if(user==human){
        user=ai;
    } else{
        user=human;
    }
}
function swap_cal(){
    //swapuser();
    return prev;
}
/*function checkBlocks(user){
    var right=true,left=true;
        var arr=[];
        var posmov=swap_cal();          //if we use getfilter here program will colapse
        //right side of user
        for(var j=1;j<4;j++){
            if(board[row][j].length>0){
                right=false;
                break;
            }
            if(j==1){
                continue;
            }
            
            for(arr in posmov){
                if(posmov[arr].includes(row+""+j)){
                    right=false;
                    break;
                }
            }
            
        }
        if(right){
            arr[0]=row+""+2;
        }
        //left
        for(var j=5;j<7;j++){
            if(board[row][j].length>0){
                left=false;
                break;
            }
            for(arr in posmov){
                if(posmov[arr].includes(row+""+j)){
                    left=false;
                    break;
                }
            }
            
        }
        if(left){
            arr[1]=row+""+j;
        }
        swapuser();
        return arr;
        
}
/*function blocks(){
    var possmov=autocalculate();
    for(direction in castling[user]){
        for(emppty_blocks in castling[user][direction]){
            console.log("length of :"+document.getElementById(castling[user][direction][emppty_blocks]).children.length>0);
            if(document.getElementById(castling[user][direction][emppty_blocks]).children.length>0){
                break;
            }
            if(castling[user][direction][emppty_blocks]=="71" || castling[user][direction][emppty_blocks]=="01"){
                continue;
            }
                
            else{
                for(arr in possmov){
                    if(possmov[arr].includes(castling[user][direction][emppty_blocks])){
                        break;
                    }
                }
            }
        }
        if(emppty_blocks>=castling[user][direction].length){
            capable_castling[user][direction]=true;
        }
    }
    console.log(capable_castling);
}
console.log(document.getElementById(castling[user]["left"][0]).children.length);
console.log(castling[user]["left"][0]);
console.log(user);
*/