/**
 * Created by jiinwoo on 2016. 2. 22..
 */

function myPage_askDisplay(askItem){


        $("#myPageAsk").append(
        "<article class=\"ask_card\">"+
        "<img src=\""+askItem.img_dir_1+"\">"+
        "<div class=\"txt_wrapper_ask\">"+
        "<h2>#"+askItem.tag_1+"</h2>"+
        "<p class=\"tag\">#"+askItem.tag_2+"</p>"+
        "<p class=\"tag\">#"+askItem.tag_3+"</p>"+
        "</div>"+
        "<div class=\"check_box_option\">"+
        "<p class=\"option\">"+ askItem.size +"</p>"+
        "<p class=\"ask_article_price_02\">"+askItem.reward+"</p>"+
        "</div>"+
        "</article>"
    )


}

function myPage_answerDisplay(answeringItem){


        $("#myPageAnswer").append(
            "<article class=\"answering_card\">"+
            "<img src=\""+answeringItem.img_dir_1+"\">"+
            "<p class=\"prograss\">In progress</p>"+
            "<div class=\"txt_wrapper_answering\">"+
            "<h2>#"+answeringItem.tag_1+"</h2>"+
            "<p class=\"tag\">#"+answeringItem.tag_2+" #"+answeringItem.tag_3+"</p>"+
            //"<p class=\"tag\">#"+answeringItem.tag_3+"</p>"+
            "</div>"+
            "<div class=\"answering_option\">"+
            "<p class=\"sex\">"+answeringItem.product_gender+"</p>"+
            "<p class=\"price\">"+answeringItem.reward+"</p>"+
            "<p class=\"location\">"+answeringItem.location+"</p>"+
            "<p class=\"size\">"+answeringItem.size+"</p>"+
            "<p class=\"color\">"+answeringItem.color+"</p>"+
            "</div>"+
            "<a class=\"post_button\" href=#>Answer</a>"+
            "</article>")



}
function myPage_likeDisplay(likedItem,askItem){


    $("#myPageLike").append(
        "<article class=\"liked_box\">"+
        "<img src=\""+askItem.img_dir_1+"\">"+
            "<a class=\"like_back\" href=\"#\"></a>"+
            "<div class=\"txt_wrapper_like\">"+
            "<h2>Brand / Model name</h2>"+
        "<p>"+likedItem.brand_model+"</p>"+
        "</div>"+
        "</article>"
    )

}



function myPageDisplay(index){
    if(index==1){
        $("#myPage").empty();
        $("#myPage").append(
            "<section class=\"like\" >"+

            "<h1>The posts you liked</h1>"+
            "<div class=\"article_wrapper\"id=\"myPageLike\"></div>"+
            "</section>")
        $.getJSON('answerPanels.json', function(data) {
            $.each(data.answers, function(index,answerItem) {
                if(index<4){
                    $.getJSON('askPanels.json', function(data) {
                        $.each(data.asks, function(index,askItem) {
                            if(answerItem.related_ask_id==askItem.id){
                                myPage_likeDisplay(answerItem,askItem);
                            }

                        })
                    })
                }
            });
        });
    }

    else if(index==2){

        $("#myPage").empty();
        $("#myPage").append(
            "<section class=\"ask\" >"+

            "<h1> Updated posts</h1>"+
            "<div class=\"article_wrapper\"id=\"myPageAsk\"></div>"+
            "</section>")
        $.getJSON('askPanels.json', function(data) {
            $.each(data.asks, function(index,item) {
                if(index>=4 && index<8){
                    myPage_askDisplay(item);
                }
            });
        });
    }
    else if(index ==3){
        $("#myPage").empty();
        $("#myPage").append(
            "<section class=\"answering\" >"+

            "<h1> Your answering list</h1>"+
            "<div class=\"article_wrapper\"id=\"myPageAnswer\"></div>"+
            "</section>")
        $.getJSON('askPanels.json', function(data) {
            $.each(data.asks, function(index,item) {
                if(index>=8 && index<12){
                    myPage_answerDisplay(item);


                }

            });

        });

    }
}

$(document).ready( function(){

    $("#myPage").append(
        "<section class=\"like\" >"+

        "<h1>The posts you liked</h1>"+
        "<div class=\"article_wrapper\"id=\"myPageLike\"></div>"+
        "</section>")
    $.getJSON('answerPanels.json', function(data) {
        $.each(data.answers, function(index,answerItem) {
            if(index<4){
                $.getJSON('askPanels.json', function(data) {
                    $.each(data.asks, function(index,askItem) {
                        if(answerItem.related_ask_id==askItem.id){
                            myPage_likeDisplay(answerItem,askItem);
                        }

                    })
                })
            }
        });
    });


})