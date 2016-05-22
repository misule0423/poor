/**
 * Created by jiinwoo on 2016. 2. 12..
 */



/* Serialize form data (return array) */

jQuery.fn.serializeObject = function() {
    var obj = null;
    try {
    // Only for form tag
        if(this[0].tagName && this[0].tagName.toUpperCase() == "FORM" ) {
            var arr = this.serializeArray();

            if(arr){
                obj= objToJson(arr);
                addAdditionalInfo(obj);
            }
        }
    }catch(e) {
        alert(e.message);
    }finally  {}
    return obj;
};

/* Format change: Array -> Json */

function objToJson(formData){
    var data = formData;
    var jsonObj = {};
    $.each(data, function(idx, ele){
        jsonObj[ele.name] = ele.value;
    });
    return jsonObj;
}

/* Add addtional data */

function addAdditionalInfo(jsonPrevObj){

    jsonPrevObj["id"] = generateAnswerId();
    jsonPrevObj["writer_user_id"] = getCurrentUserId();
    jsonPrevObj["related_ask_id"] = location.href.substr(location.href.lastIndexOf('=') + 1)*1;
    jsonPrevObj["time"]= new Date();
    jsonPrevObj["dir_json"] = "abc";                //Todo : 이게 어떤 내용을 담아야하는지 잘 모르는 상태

    return jsonPrevObj

}

//Todo : 서버에서 가장 큰 answerId받아오는 기능 구현
function generateAnswerId(){
    return 1;
}

//Todo : 현재 로그인된 user의 id 받아오는 기능 구현
function getCurrentUserId(){
    return 1;
}

/* return JSON object with given form data */

function createJson(index){
    //var jsonfile = require('jsonfile');
    //var file = 'askPanels.json';

    var jsonObj = JSON.stringify($("#answerForm").serializeObject());
    //jsonfile.writeFile(file, jsonObj, function (err) {
    //    alert(err);
    //    console.error(err)
    //});

    alert(jsonObj);
    if(index==1){
        window.location.href = "/answerUploaded";
    }
    else{
        window.location.href = "/askUploaded";
    }

    console.log(jsonObj);
}






function getIndexAndDisplay(){
    var val = location.href.substr(
        location.href.lastIndexOf('=') + 1
    );
    $.getJSON('askPanels.json', function(data) {
        $.each(data.asks, function(index,item) {
            if(item.id == val*1){
                document.getElementById("askImage").src=item.img_dir_1;

                document.getElementById("tag1").innerHTML=item.tag_1;
                document.getElementById("tag2").innerHTML=item.tag_2+" "+item.tag_3;

                document.getElementById("userId").innerHTML=item.writer_user_id;
                document.getElementById("deliveryLocation").innerHTML=item.delivery_location;
                document.getElementById("price").innerHTML=item.reward;

                document.getElementById("sex").innerHTML=item.product_gender;
                document.getElementById("color").innerHTML=item.color;
                document.getElementById("size").innerHTML=item.size;

                return
            }
        });
    })
}

getIndexAndDisplay();