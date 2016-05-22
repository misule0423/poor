function answerCardDisplay(answerItem) {
    var oneWeek=1000*60*60*24*7;
    var oneDay=1000*60*60*24;
    var oneHour=1000*60*60;
    var now= new Date();
    var askTime = new Date(answerItem.time);
    var differenceTime = now.getTime()-askTime.getTime();
    var comparedTime ="";
    if(differenceTime<oneHour){
        comparedTime="few minutes"
    }else if(differenceTime<oneDay){
        comparedTime=Math.round(differenceTime/oneHour)+" Hours"
    }else if(differenceTime<7*oneDay){
        comparedTime=Math.round(differenceTime/oneDay)+" Days"
    } else{
        comparedTime=Math.round(differenceTime/oneWeek)+" Weeks";
    }
    $("#answer-card-place").append(
        "<article class=\"Completed_02\">" +
        "<img src=\""+answerItem.img_dir_1+"\">"+  //Todo: 이미지 파일 크기와 상관없이 카드에 나타낼 수있게야함
        "<div class=\"txt_wrapper_Completed_02\">" +
        "<h2>#"+answerItem.tag_1+"</h2>"+
        "<p class=\"tag\">#"+answerItem.tag_2+" #"+answerItem.tag_3+"</p>"+
        "<div class=\"brand_wrapper_02\">"+
        "<h3>"+answerItem.brand_model+"</h3>"+
        "</div>"+
        "<p>"+answerItem.etc+"</p>"+
        "</div>"+
        "<div class=\"date_02\">"+
        "<p class=\"date\">"+comparedTime+"</p>"+
        "<div class=\"date_icon_wrapper_02\">"+
        "<a class=\"date_icon_01\" href=\"#\"></a>"+
        "<a class=\"date_icon_02\" href=\"#\"></a>"+
        "</div>"+
        "</div>"+
        "</article>"

    )

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
function sortJsonPrice(a,b){
    return a.price > b.price ? -1 : 1;
};

function sortJsonAskId(a,b){
    return a.related_ask_id > b.related_ask_id ? -1 : 1;
};


function sort(num){
    count1=0;
    lineNum=0;
    if(num ==0){
        items=shuffleArray(items);
        $("#answer-card-place").empty();
        $.each(items,function(index,item){
            if(count1==0){
                $("#answer-card-place").append("<div class=\"Completed_article_wrapper_02\">")
            }
            answerCardDisplay(item);

            if(count1==3){
                $("#answer-card-place").append("</div>");
                lineNum++;
                count1=0;
            }
            else{
                count1++;
            }
        })
    }
    else if(num==1){
        items.sort(sortJsonTime);
        $("#answer-card-place").empty();
        $.each(items,function(index,item){
            if(count1==0){
                $("#answer-card-place").append("<div class=\"Completed_article_wrapper_02\">")
            }
            answerCardDisplay(item);

            if(count1==3){
                $("#answer-card-place").append("</div>");
                lineNum++;
                count1=0;
            }
            else{
                count1++;
            }
        })
    }
    else if(num ==2){
        items.sort(sortJsonPrice);
        $("#answer-card-place").empty();
        $.each(items,function(index,item){
            if(count1==0){
                $("#answer-card-place").append("<div class=\"Completed_article_wrapper_02\">")
            }
            answerCardDisplay(item);

            if(count1==3){
                $("#answer-card-place").append("</div>");
                lineNum++;
                count1=0;
            }
            else{
                count1++;
            }
        })
    }
    else{
        items.sort(sortJsonAskId);
        $("#answer-card-place").empty();
        $.each(items,function(index,item){
            if(count1==0){
                $("#answer-card-place").append("<div class=\"Completed_article_wrapper_02\">")
            }
            answerCardDisplay(item);

            if(count1==3){
                $("#answer-card-place").append("</div>");
                lineNum++;
                count1=0;
            }
            else{
                count1++;
            }
        })
    }
}
/** Function for search */

function search(itemArray, keyword){
    var searchedItems=[];
    $.each(itemArray,function(index,item){
        if(item.tag_1.toUpperCase().indexOf(keyword)>-1 || item.tag_2.toUpperCase().indexOf(keyword)>-1 || item.tag_3.toUpperCase().indexOf(keyword)>-1
            || item.writer_user_id.toUpperCase().indexOf(keyword)>-1 || item.brand_model.toUpperCase().indexOf(keyword)>-1){
            searchedItems.push(item);
        }
    })
    return searchedItems
}

function searchByKeyword() {
    count1=0;
    lineNum=0;
    var searchedItems = items;
    var keyword=document.getElementById("keyword").value.toUpperCase();
    if(keyword.length!=0) {
        searchedItems = search(items,keyword);
    }
    $("#answer-card-place").empty();
    $.each(searchedItems,function(index,item){
        if(count1==0){
            $("#answer-card-place").append("<div class=\"Completed_article_wrapper_02\">")
        }
        answerCardDisplay(item);

        if(count1==3){
            $("#answer-card-place").append("</div>");
            lineNum++;
            count1=0;
        }
        else{
            count1++;
        }
    })
}


/** Initial display */

var items=[];
var lineNum=0;
var count1 =0;
$(document).ready(function(){

    $.getJSON('answerPanels.json', function(data) {
        $.each(data.answers, function(index,item) {


            //Todo: query해서 relatedAskitem 탐색결과를 가져오는걸로 변경
            $.getJSON('askPanels.json',function(data){
                if(count1==0){
                    $("#answer-card-place").append("<div class=\"Completed_article_wrapper_02\">")
                }

                //Todo: query해서 relatedAskitem 탐색결과를 가져오는걸로 변경
                $.each(data.asks, function(index,askItem) {
                    if(askItem.id==item.id){
                        items.push(item);
                        /* Add addtional data */
                        item["img_dir_1"] = askItem.img_dir_1;
                        item["tag_1"] = askItem.tag_1;
                        item["tag_2"] = askItem.tag_2;
                        item["tag_3"]= askItem.tag_3;
                        answerCardDisplay(item);
                    }
                })

                if(count1==3){
                    $("#answer-card-place").append("</div>");
                    lineNum++;
                    count1=0;
                }
                else{
                    count1++;
                }
            });



        });

    });

});








