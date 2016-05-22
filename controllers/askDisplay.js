/**
 * Created by jiinwoo on 2016. 1. 15..
 */

/** Functions drawing an askcard components */

function askCardDisplay(attachId,askItem) {
    $("#ask-card-place").append(
        "<article class=\"answer_card\">" +
            "<img src=" + askItem.img_dir_1 + ">" +
            "<div class=\"answer_article_user_price_wrapper_02\">" +
                "<div class=\"answer_user\">" +
                "<p class=\"answer_article_user_02\">" + askItem.writer_user_id + "</p>" +
                "</div>" +

                "<div class=\"answer_price\">" +
                "<p class=\"answer_article_price_02\">" + askItem.reward + "</p>" +
                "</div>"+
            "</div>"+
            "<div class=\"txt_wrapper_answer\">"+
                "<h2>#" + askItem.tag_1 + "</h2>" +
                "<p class=\"tag\">" + "#" + askItem.tag_2 + " #" + askItem.tag_3 + "</p>" +
                "<p>" + omitString(69,askItem.comment)+ "</p>" +
            "</div>"+
            "<div class=\"check_box_sizecolor\">"+
                "<p class=\"sizecolor\">" + askItem.size + ", " + askItem.color +"</p>"+
            "</div>"+
            "<a class=\"post_button\" onclick=\"transmitItemInfo("+askItem.id+")\" >Answer</a>"+
        "</article>"
    )
}


function omitString(restrictNum, str){
    if(str.length>restrictNum){
        return str.substring(0,restrictNum-7)+" [...]"
    }
    else {
        return str;
    }
}

function transmitItemInfo(askItemCardIndex){
    window.location.href = "/answerForm?index=" + askItemCardIndex;
}

/** Function for random shuffling of array */


function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}


/** Function for sort */

function sortJsonTitle(a,b){
    return a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1;
};

//recent first
function sortJsonTime(a,b){
    var newA =new Date(a.time);
    var newB =new Date(b.time);
    return newA.getTime() > newB.getTime() ? -1 : 1;
};

//greater first
function sortJsonReward(a,b){
    return a.reward > b.reward ? -1 : 1;
};

function sortJsonHits(a,b){
    return a.view_hit > b.view_hit ? -1 : 1;
};


function sort(num){
    count2=0;
    lineNum=0;
    if(num ==0){
        items=shuffleArray(items);
        $("#ask-card-place").empty();
        $.each(items,function(index,item){
            if(count2==0){
                $("#ask-card-place").append("<div class=\"article_wrapper\">")
            }
            askCardDisplay("#ask-card-place",item);

            if(count2==3){
                $("#ask-card-place").append("</div>");
                lineNum++;
                count2=0;
            }
            else{
                count2++;
            }
        })
    }
    else if(num==1){
        items.sort(sortJsonTime);
        $("#ask-card-place").empty();
        $.each(items,function(index,item){
            if(count2==0){
                $("#ask-card-place").append("<div class=\"article_wrapper\">")
            }
            askCardDisplay("#ask-card-place",item);

            if(count2==3){
                $("#ask-card-place").append("</div>");
                lineNum++;
                count2=0;
            }
            else{
                count2++;
            }
        })
    }
    else if(num ==2){
        items.sort(sortJsonReward);
        $("#ask-card-place").empty();
        $.each(items,function(index,item){
            if(count2==0){
                $("#ask-card-place").append("<div class=\"article_wrapper\">")
            }
            askCardDisplay("#ask-card-place",item);

            if(count2==3){
                $("#ask-card-place").append("</div>");
                lineNum++;
                count2=0;
            }
            else{
                count2++;
            }
        })
    }
    else{
        items.sort(sortJsonHits);
        $("#ask-card-place").empty();
        $.each(items,function(index,item){
            if(count2==0){
                $("#ask-card-place").append("<div class=\"article_wrapper\">")
            }
            askCardDisplay("#ask-card-place",item);

            if(count2==3){
                $("#ask-card-place").append("</div>");
                lineNum++;
                count2=0;
            }
            else{
                count2++;
            }
        })
    }
}
/** Function for search */

function search(itemArray, keyword){
    var searchedItems=[];
    $.each(itemArray,function(index,item){
        if(item.tag_1.toUpperCase().indexOf(keyword)>-1 || item.tag_2.toUpperCase().indexOf(keyword)>-1 || item.tag_3.toUpperCase().indexOf(keyword)>-1
        || item.writer_user_id.toUpperCase().indexOf(keyword)>-1 || item.size.toUpperCase().indexOf(keyword)>-1 || item.color.toUpperCase().indexOf(keyword)>-1
        || item.product_gender.toUpperCase().indexOf(keyword)>-1){
            searchedItems.push(item);
        }
    })
    return searchedItems
}

function searchByKeyword() {
    count2=0;
    lineNum=0;
    var searchedItems = items;
    var keyword=document.getElementById("keyword").value.toUpperCase();
    if(keyword.length!=0) {
        searchedItems = search(items,keyword);
    }
    $("#ask-card-place").empty();
    $.each(searchedItems,function(index,item){
        if(count2==0){
            $("#ask-card-place").append("<div class=\"article_wrapper\">")
        }
        askCardDisplay("#ask-card-place",item);

        if(count2==3){
            $("#ask-card-place").append("</div>");
            lineNum++;
            count2=0;
        }
        else{
            count2++;
        }
    })
}
/** Initial display */


var lineNum=0;
var count2 =0;

var items = [];

$(document).ready( function(){
    $.getJSON('askPanels.json', function(data) {
        $.each(data.asks, function(index,item) {

            /* Todo: need to be replaced by sorted objects from server */
            items.push(item);

            if(count2==0){
                $("#ask-card-place").append("<div class=\"article_wrapper\">")
            }
            askCardDisplay("#ask-card-place",item);

            if(count2==3){
                $("#ask-card-place").append("</div>");
                lineNum++;
                count2=0;
            }
            else{
                count2++;
            }

        });
    });

})
