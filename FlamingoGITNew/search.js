/*
TODO
1: In the html fix the layout of the result areas, the only thing you need to keep is the id tags
2: Change the formatting of the generated items
3: Query wego again for specific hotels (this will basically be the same as the current wego query with a different url)
4: Fill out the list elements with data from the query results
5: Clear each box after every search
*/

var songkick = "http://api.songkick.com/api/3.0/events.json?apikey=qusW5wWyyQQ73KqF&jsoncallback=?";
var wego = "http://api.wego.com/hotels/api/locations/search?api_key=6c3eca68b056fecb3e4e&ts_code=5336f";
var google = "https://www.google.ie"
function sk(){
    var searchQuery = $("#textinput").val();
    $.ajax({
        //don't change
        type: "GET",
        //this is the api url
        url: songkick,
        //don't change
        dataType: 'jsonp',
        //this is adding a parameter to the get request
        data: {artist_name : searchQuery},
        success: function(data){
            //needs to check to make sure there are some results
            if(data.resultsPage.totalEntries == 0){
                alert("no results");
            }else{
                $.each(data["resultsPage"]["results"]["event"], function(i, entry){
                    var raw = entry.location.city;
                    var arr = raw.split(", ");
                    $("#resultbox").append('<li><p>' + entry.displayName + '</p><button id="event'+i+'" onclick="accessWego(\''+arr[0]+'\')">Find Locations</button></li>');
                });
            }
        }     
    });
}

function accessWego(location){
    $.ajax({
        //don't change
        type: "GET",
        //this is the api url
        url: wego,
        //don't change
        dataType: 'jsonp',
        data: {q : location},
        success: function(data){ 
            $.each(data["locations"], function(i, entry){
                $("#locationresult").append('<li><p>' + entry.name + '</p></li>');
            });
        }     
    });
}
/*
This is the code to get just the location out of the songkick data
var raw = entry.locations; this will be eg. "london, UK"
var arr = raw.split(", "); arr now contains an array ["london", "UK"]
arr[0]; this is "london"

*/
