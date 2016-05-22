/**
 * Created by jiinwoo on 2016. 1. 13..
 */

var title;
var pictureArray=[];
var presentPicNum=0;
$(document).ready( function(){
    title=$( "#dataToChild", opener.document).val();
    $.getJSON(title+".json", function(data) {
        $.each(data.items, function(index,item) {
            pictureArray.push(item);
            $("#viewer").empty();
            $("#viewer").append("<img id = \"image-holder\"src="+pictureArray[0].url+"/><p>"+pictureArray[0].title+"</p>");

        });
    })

});

function slideTransition(direction){
    if(direction == 0){
        if(presentPicNum == 0)
            presentPicNum=pictureArray.length-1;
        else
            presentPicNum--;
        $("#viewer").empty();
        $("#viewer").append("<img id = \"image-holder\"src="+pictureArray[presentPicNum].url+" /><p>"+pictureArray[presentPicNum].title+"</p>");

    }
    else if(direction == 1) {
        if(presentPicNum == pictureArray.length-1)
            presentPicNum=0;
        else
            presentPicNum++;
        $("#viewer").empty();
        $("#viewer").append("<img id = \"image-holder\"src="+pictureArray[presentPicNum].url+"/><p>"+pictureArray[presentPicNum].title+"</p>");
    }
}
