

let array = ['1','1','2','2','3','3','4','4','5','5','6','6','7','7','8','8','9','9','10','10','11',"11",'12','12'];
let memoryValues = [];
let memoryIDs = [];

Array.prototype.memory_tile_shuffle = function(){
    let i = this.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}
function newBoard(){
    tilesFlipped = 0;
    let output = "";
    array.memory_tile_shuffle();
    for(let i = 0; i < array.length; i++){
        output += '<div id="tile'+i+'" onclick="memoryFlipTile(this,\''+array[i]+'\')"></div>';
    }
    document.getElementById('memory_board').innerHTML = output;

}






function memoryFlipTile(tile,val){
    if(tile.innerHTML == "" && memoryValues.length < 2){
        tile.style.background = '#FFF';
        tile.innerHTML = val;
        if(memoryValues.length == 0){
            memoryValues.push(val);
            memoryIDs.push(tile.id);
        } else if(memoryValues.length == 1){
            memoryValues.push(val);
            memoryIDs.push(tile.id);
            if(memoryValues[0] == memoryValues[1]){
                tilesFlipped += 2;
                // Clear both arrays
                memoryValues = [];
                memoryIDs = [];
                // Check to see if the whole board is cleared
                if(tilesFlipped == array.length){

                    document.getElementById('memory_board').innerHTML = "";
                    newBoard();
                }
            } else {
                function flip2Back(){
                    // Flip the 2 tiles back over
                    let tile_1 = document.getElementById(memoryIDs[0]);
                    let tile_2 = document.getElementById(memoryIDs[1]);
                    tile_1.style.background = 'url(tile_bg.jpg) no-repeat';
                    tile_1.innerHTML = "";
                    tile_2.style.background = 'url(tile_bg.jpg) no-repeat';
                    tile_2.innerHTML = "";
                    // Clear both arrays
                    memoryValues = [];
                    memoryIDs = [];
                }
                setTimeout(flip2Back, 700);
            }
        }
    }
}
