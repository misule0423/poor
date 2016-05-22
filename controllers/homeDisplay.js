/**
 * Created by jiinwoo on 2016. 2. 10..
 */
function answerCardDisplay(displayType,answerItem) {
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
    /* BigCardDisplay */
    if(displayType<2){
        $("#answer-card-place").append(
            "<article class=\"Completed_card_01\">" +
            "<img src=\""+answerItem.img_dir_1+"\">"+
            "<div class=\"txt_wrapper_Completed_01\">" +
            "<h2>#"+answerItem.tag_1+"</h2>"+
            "<p class=\"tag\">#"+answerItem.tag_2+" #"+answerItem.tag_3+"</p>"+
            "<div class=\"brand_wrapper_01\">"+
            "<h3>"+answerItem.brand_model+"</h3>"+
            "</div>"+
            "<p>"+answerItem.etc+"</p>"+
            "</div>"+
            "<div class=\"date_01\">"+
            "<p class=\"date\">"+answerItem.time+"</p>"+
            "<div class=\"date_icon_wrapper_01\">"+
            "<a class=\"date_icon_01\" href=\"#\"></a>"+
            "<a class=\"date_icon_02\" href=\"#\"></a>"+
            "</div>"+
            "</div>"+
            "</article>"

        )
    }


    /* SmallCardDisplay */
    else{

        $("#answer-card-place").append(
            "<article class=\"Completed_02\">" +
            "<img src=\""+answerItem.img_dir_1+"\">"+
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


}

function askCardDisplay(displayType,askItem) {
    /* BigCardDisplay */
    if(displayType<2){
        $("#ask-card-place").append(
            "<article class=\"answer_card_home\">" +
            "<img src=" + askItem.img_dir_1 + ">" +
            "<div class=\"answer_article_user_price_wrapper_02\">" +
            "<div class=\"answer_user\">" +
                //"<img src=\"icon_user.png\">" +
            "<p class=\"answer_article_user_02\">" + askItem.writer_user_id + "</p>" +
            "</div>" +
            "<div class=\"answer_price\">" +
            "<p class=\"answer_article_price_02\">" + askItem.reward + "</p>" +
            "</div>" +
            "</div>" +
            "<div class=\"txt_wrapper_answer_home\">" +
            "<h2>#" + askItem.tag_1 + "</h2>" +
            "<p class=\"tag_home\">" + "#" + askItem.tag_2 + " #" + askItem.tag_3 + "</p>" +
            "<p>" + askItem.comment + "</p>" +
            "</div>" +
            "<div class=\"check_box_sizecolor_home\">" +
            "<p class=\"sizecolor_home\">" + askItem.size + ", " + askItem.color + "</p>" +
            "</div>" +
            "<a class=\"post_button_home\" onclick=\"transmitItemInfo("+askItem.id+")\">Answer</a>" +
            "</article>"
        )



    }
    /* SmallCardDisplay */
    else {
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
            "<p>" + omitString(69,askItem.comment) + "</p>" +
            "</div>"+
            "<div class=\"check_box_sizecolor\">"+
            "<p class=\"sizecolor\">" + askItem.size + ", " + askItem.color + "</p>"+
            "</div>"+
            "<a class=\"post_button\" onclick=\"transmitItemInfo("+askItem.id+")\">Answer</a>"+
            "</article>"
        )

    }
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
    window.location.href = "answerForm?index=" + askItemCardIndex;
}

function showMore(cardType){
    var initial_point;
    /* completed answer card */
    if(cardType == 0){
        initial_point=count1;
        $.getJSON('answerPanels.json', function(data) {
            $.each(data.answers, function(index,item) {
                $.getJSON('askPanels.json', function (data) {
                    if(count1 < initial_point+4) {                            //Todo: Query할 때 다음 4개만 json 형태로 가져온다
                        if (count1 == initial_point) {
                            $("#answer-card-place").append("<div class=\"Completed_article_wrapper_01\">")
                        }
                        $.each(data.asks, function (index, askItem) {
                            if (askItem.id == item.id) {
                                /* Add addtional data */
                                item["img_dir_1"] = askItem.img_dir_1;
                                item["tag_1"] = askItem.tag_1;
                                item["tag_2"] = askItem.tag_2;
                                item["tag_3"] = askItem.tag_3;
                                answerCardDisplay(3, item);
                            }
                        })

                        if (count1 == initial_point) {
                            $("#answer-card-place").append("</div>");
                        }
                        count1++;
                    }
                })
            });

        });
    }

    /* ask card */
    else{
        initial_point=count2;
        $.getJSON('askPanels.json', function(data) {
            $.each(data.asks, function(index,item) {
                if(count2 < initial_point+4) {                            //Todo: Query할 때 다음 4개만 json 형태로 가져온다
                    if (count2 == initial_point) {
                        $("#ask-card-place").append("<div class=\"article_wrapper\">")
                    }
                    askCardDisplay(3, item);
                    if (count2 == initial_point) {
                        $("#ask-card-place").append("</div>");
                    }
                    count2++;
                }
            });

        });
    }

}


var count1 =0;
var count2 =0;

$(document).ready( function(){
    $.getJSON('askPanels.json', function(data) {        //Todo: Query할 때 최근 6개만 json 형태로 가져온다
        $.each(data.asks, function(index,item) {
            if(count2 < 6) {
                if (count2 == 0) {
                    $("#ask-card-place").append("<div class=\"article_wrapper_home\">")
                }
                askCardDisplay(count2, item);
                if (count2 == 1) {
                    $("#ask-card-place").append("</div>");
                    $("#ask-card-place").append("<div class=\"article_wrapper\">")
                }
                if (count2 == 5) {
                    $("#ask-card-place").append("</div>");
                }
                count2++;
            }
        });
    })

    $.getJSON('answerPanels.json', function(data) {
        $.each(data.answers, function(index,item) {

                $.getJSON('askPanels.json', function (data) {
                    if(count1 < 6) {
                        if (count1 == 0) {
                            $("#answer-card-place").append("<div class=\"Completed_article_wrapper_01\">")
                        }
                        //Todo: query해서 relatedAskitem 탐색결과를 가져오는걸로 변경
                        $.each(data.asks, function (index, askItem) {
                            if (askItem.id == item.id) {
                                /* Add addtional data */
                                item["img_dir_1"] = askItem.img_dir_1;
                                item["tag_1"] = askItem.tag_1;
                                item["tag_2"] = askItem.tag_2;
                                item["tag_3"] = askItem.tag_3;
                                answerCardDisplay(count1, item);
                            }
                        })
                        if (count1 == 1) {
                            $("#answer-card-place").append("</div>");
                            $("#answer-card-place").append("<div class=\"Completed_article_wrapper_02\">")
                        }
                        if (count1 == 5) {
                            $("#answer-card-place").append("</div>");
                        }
                        count1++;
                    }
                });


        });

    });





})