//creating board
var cboard = document.getElementById('chessboard');
for(var i=0; i<8;i++){
    cboard.innerHTML += "<tr id='"+i+"'>";
    for(var j=0; j<8;j++){
        document.getElementById(i).innerHTML += '<td class="cell" id="'+i+''+j+'" onclick="markPossible(this)" ondrop="markPossible(this)" ondragover="prevdef(event)"></td>';
        if((i%2==0 && j%2==1) || (i%2==1 && j%2==0)){
            document.getElementById(i+''+j).style.backgroundColor = "#7f5733";
        }else{
            document.getElementById(i+''+j).style.backgroundColor = "#fff1e5";
        }
    }
    cboard.innerHTML += "</tr>";
}
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
            document.getElementById(i+""+j).innerHTML = "<img class='"+color+"' name='"+elem+"' src='icons/"+elem+"_"+color+".png' draggable='true' ondragstart='markPossible(this.parentElement)'>";
        }
    }
}
var human="white",ai="black";
var user=human,checkbit=false;
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
                                x=i+1,y=j+1;
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
                swapuser();
                if(!ifCheck()){
                    lim_pos[arre][inc++]=possmov[arre][values];
                }
                swapuser();
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

var high;
var khatra;       

var cboard = document.getElementById('chessboard');
async function markPossible(source){
    
    //if(source.style.backgroundColor=="rgb(140, 246, 255)"){
    if(source.children.length>0 && source.lastChild.classList[0]=="dot"){
        if(document.getElementsByClassName("check").length>0){
            $('.check').remove();
            document.getElementById("results").innerHTML="";
            document.getElementById("results").style.display="none";
        }
        if(source.firstChild==source.lastChild){
            console.log("rikam");
            new Audio("move.wav").play();
        }
        else{
            console.log("rikam ny");
            new Audio("kill.wav").play();
        }
        console.log(source.firstChild+""+source.lastChild);
        source.innerHTML=currenttroop.innerHTML;
        document.getElementById(cur_pos).innerHTML='';
        
        while(document.getElementsByClassName("dot").length>0){
            $('.dot').remove();
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
                    var option_list=["queen", "horse", "camel", "elephant"];
                    var option_div=document.getElementById("choosee");
                    for(value in option_list){
                        option_div.innerHTML+="<input type='radio' id='"+option_list[value]+"' value='"+option_list[value]+"' name='choose_option' >";
                        option_div.innerHTML+= "<label for='"+option_list[value]+"'><img src='icons/"+option_list[value]+"_"+user+".png'></lable>";
                    }
                    for(var i=0;i<8;i++){
                        for(var j=0;j<8;j++){
                            document.getElementById(i+""+j).style.pointerEvents = "none";
                        }
                    }
                    let promise =new Promise((resolve, reject)=>{
                            document.getElementsByName("choose_option")[0].onclick=function(){
                                resolve(document.getElementsByName("choose_option")[0].value);
                            }
                            document.getElementsByName("choose_option")[1].onclick=function(){
                                resolve(document.getElementsByName("choose_option")[1].value);
                            }
                            document.getElementsByName("choose_option")[2].onclick=function(){
                                resolve(document.getElementsByName("choose_option")[2].value);
                            }
                            document.getElementsByName("choose_option")[3].onclick=function(){
                                resolve(document.getElementsByName("choose_option")[3].value);
                            }
                    });
                    let selection = await promise;
                    for(var i=0;i<8;i++){
                        for(var j=0;j<8;j++){
                            document.getElementById(i+""+j).style.pointerEvents = "auto";
                        }
                    }
                    source.innerHTML="<img class='"+user+"' name='"+selection+"' src='icons/"+selection+"_"+user+".png'>"
                    document.getElementById("choosee").innerHTML="";
                    
                }
            }
            
        cur_pos='';
        currenttroop='';
        cur_tr_po_mov=[];
        cur_tr_po_mov_bg=[];
        checkbit=ifCheck();
        update();
        swapuser();
        possmov=getfilter(autocalculate());
        var res=result();
        if(res=="checkmate"){
            audio=new Audio('mate.wav');
            audio.play();
            console.log("mate"+king_pos);
            khatra=document.createElement("div");
            khatra.classList.add("mate");
            document.getElementById(king_pos).appendChild(khatra);
            document.getElementById("results").innerHTML="CHECK-MATE";
        }
        else if(checkbit){
            document.getElementById("results").style.display="block";
            audio=new Audio('check.wav');
            audio.play();
            khatra=document.createElement("div");
            khatra.classList.add("check");
            document.getElementById(king_pos).appendChild(khatra);
            document.getElementById("results").innerHTML="CHECK";
        } else if(res=="stillmate"){
            audio=new Audio('mate.wav');
            audio.play();
            document.getElementById("results").innerHTML="STILL-Mate";
        }
    }
    else if(source.children.length>0 && source.children[0].getAttribute("class")==user ){
        if(document.getElementsByClassName("dot").length >0){
            $('.dot').remove();
        }
        cur_pos='';
        currenttroop='';
        cur_tr_po_mov=[];
        cur_tr_po_mov_bg=[];

        var idd=source.getAttribute("id");
        cur_pos=idd;
        currenttroop=source;
        for(var i=0;i<possmov[idd].length;i++){
            high=document.createElement("div");
            high.classList.add("dot");
            document.getElementById(possmov[idd][i]).appendChild(high);
            cur_tr_po_mov.push(possmov[idd][i]);
        }
        
    }
}
var king_pos;
function ifCheck(){
    for(var i=0;i<8;i++){
        for(var j=0;j<8;j++){
            if(board[i][j].length>0){
                if(board[i][j][0].getAttribute("name")=="king" && board[i][j][0].getAttribute("class")!=user){
                    king_pos=i+""+j;
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
function prevdef(event){
    event.preventDefault();
}
function abc(){
    console.log(document.getElementById("choose_troop").value);
}
function result(){
    var isZeropos=true;
    for(arr in possmov){
        if(possmov[arr].length>0){
            isZeropos=false;
            break;
        }
    }
    if(checkbit && isZeropos){
        return "checkmate";
    } else if(isZeropos){
        return "stillmate";
    } else{
        return null;
    }
}