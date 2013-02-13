    function fetch(ticker) {
        // Build the URL according to the Google Finance API specification
        var url = "http://www.google.com/finance/info?infotype=infoquoteall&q=";
        url += ticker;
        url += "&callback=processQuotes";

        $.ajax({
            url: url,
            dataType:'jsonp',
            success:function(data){
                processQuotes(data);
            },
            error:function(){
                console.log('No stock named by that ticker.');                    
            }
        });


        // Create and append the script element to load the data via JSONP
        /*var scriptElement = document.createElement("script");
        scriptElement.src = url;
        $('body').append(scriptElement);*/
    }

    // This function is called by the JavaScript code that is returned from the JSONP request
    // to the Google Finance API
    function processQuotes(data) {
        console.log(data);
        var quote = data[0];
        var $li = $('<div></div>').html(
            "<h2>" + quote.name + " (" + quote.t +")</h2>" +
            '<ul class="det-list">' +
            '<li>$' + quote.op + " (" + quote.c + ")</li>" + 
            '<li>' + quote.shares + '</li>' +
            '</ul>');
        $(".details").html("")
            .animate( { height: 'toggle', opacity: 'hide' }, 'fast', function() {
                $(this).append($li).animate( { height: 'toggle', opacity: 'show' }, 'fast' );
            });
    }