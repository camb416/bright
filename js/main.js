var headlines = [];
var dates = [];
var curItem = -1;
var queryStrings = {};
var apiKey = "";

var jqxhr;

var apiKey = $.getJSON("./js/apikey.json", function (json) {
    apiKey = json["api-key"];

    jqxhr = $.getJSON("http://api.nytimes.com/svc/topstories/v2/sports.json?api-key=" + apiKey, function (json) {
        console.log(json);

        $.each(json.results, function (index, value) {
            headlines.push(value.title);
            dates.push(new Date(value.published_date));
        });

    }).done(function () {
        console.log("second success");
    })
        .fail(function (err) {
            console.log("error");
            console.log(err);
        })
        .always(function () {
            console.log("complete");
            setup();
        });


});


function setup() {
    queryStrings = getUrlVars();
    if (queryStrings[0] == "human") {
        $('#frame').css('background', '#000');
    }
    console.log(queryStrings);
    curItem = 0;
    setItem(curItem);
    setInterval(update, 5000);
    fadeOut();
}

function update() {
    fadeOut();
}

function setItem(_i) {
    $("#title").html(headlines[_i]);

    var options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    $("#date").html(dates[_i].toLocaleDateString("en-US", options));
}

function fadeOut() {
    $("#title").fadeOut(500, outComplete);
    $("#date").fadeOut(500);
}

function fadeIn() {
    $("#title").fadeIn(500);
    $("#date").fadeIn(500);
}

function outComplete() {
    curItem++;
    if (curItem >= headlines.length) {
        curItem = 0;
    }
    setItem(curItem);
    fadeIn();
}

// Read a page's GET URL variables and return them as an associative array.
function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}



