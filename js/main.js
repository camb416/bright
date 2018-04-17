
$(document).ready(function(){


    var str = $('span.bubble').text();
    $('span.bubble').remove();
    var spanElem;
    for(var i=0;i<str.length;i++){
        // console.log(str[i]);
        var tempStr = str[i];
        if(str[i]==" ") {
            tempStr = "&nbsp;";
        }
        spanElem = $('<div class="bubbler offset'+i+'"></div>').css("float","left").append(tempStr);

        $('body').append(spanElem);
    }

    $('.bubbler').each(function(i){
        var j = Math.random()*360;
        console.log(j);
        $(this).velocity({opacity:0.5,rotateZ:j},{duration:0,easing:"none"});

         $(this)
             .velocity({opacity:1,rotateZ:0},{duration:1000, delay:i*15,easing: "easeOutElastic",loop:true});

    });


});