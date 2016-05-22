/*
 * Created by jiinwoo on 2016. 1. 10..
 */


var items = [];

function sortJsonTitle(a,b){
    return a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1;
};

//recent first
function sortJsonTime(a,b){
    return a.time > b.time ? -1 : 1;
};

//greater first
function sortJsonReward(a,b){
    return a.reward > b.reward ? -1 : 1;
};

function sortJsonHits(a,b){
    return a.view_hit > b.view_hit ? -1 : 1;
};

function sort(num){
    if(num==1){
        items.sort(sortJsonClicks);
        $("#item").empty();
        for(i=0;i<items.length;i++){
            $("#item").append("<li>URL: "+items[i].url+"</li>" +
                "<li>title: "+items[i].title+"</li>" +
                "<li>clicks: "+items[i].clicks+"</li>" +
                "<li>likes: "+items[i].likes+"</li>" +
                "<li>date: "+items[i].date+"</li>" +
                "<li><img src="+items[i].url+" id=\"image\"/></li>" +
                "<br />");
        }
    }
    else if(num ==2){
        items.sort(sortJsonLikes);
        $("#item").empty();
        for(i=0;i<items.length;i++){
            $("#item").append("<li>URL: "+items[i].url+"</li>" +
                "<li>title: "+items[i].title+"</li>" +
                "<li>clicks: "+items[i].clicks+"</li>" +
                "<li>likes: "+items[i].likes+"</li>" +
                "<li>date: "+items[i].date+"</li>" +
                "<li><img src="+items[i].url+" id=\"image\"/></li>" +
                "<br />");
        }
    }
    else{
        items.sort(sortJsonDate);
        $("#item").empty();
        for(i=0;i<items.length;i++){
            $("#item").append("<li>URL: "+items[i].url+"</li>" +
                "<li>title: "+items[i].title+"</li>" +
                "<li>clicks: "+items[i].clicks+"</li>" +
                "<li>likes: "+items[i].likes+"</li>" +
                "<li>date: "+items[i].date+"</li>" +
                "<li><img src="+items[i].url+" id=\"image\"/></li>" +
                "<br />");
        }
    }
}



$(document).ready( function(){
    $.getJSON('items.json', function(data) {
        $.each(data.items, function(index,item) {
            items.push(item);
            $("#item").append("<li>URL: "+item.url+"</li>" +
                "<li>title: "+item.title+"</li>" +
                "<li>clicks: "+item.clicks+"</li>" +
                "<li>likes: "+item.likes+"</li>" +
                "<li>date: "+item.date+"</li>" +
                "<li><img src="+item.url+" id=\"image\"/></li>" +
                "<br />");

        });
    })

    $( '.dropdown').children('.sub-menu').hide();

    $( '.dropdown' ).hover(
        function(){
            $(this).children('.sub-menu').slideDown(200);
        },
        function(){
            $(this).children('.sub-menu').slideUp(200);
        }
    );


});

function wopen(url, name, w, h)
{
// Fudge factors for window decoration space.
    // In my tests these work well on all platforms & browsers.
    w += 32;
    h += 96;
    var win = window.open(url,
        name,
        'width=' + w + ', height=' + h + ', ' +
        'location=no, menubar=no, ' +
        'status=no, toolbar=no, scrollbars=no, resizable=no');
    win.resizeTo(w, h);
    win.focus();
}