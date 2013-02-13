    function fetch(ticker) {
        // Build the URL according to the Google Finance API specification
        // Based on https://github.com/mikeplate/mobileapplab-web finance api caller
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
    }

    // Callback function after google finance has returned the data
    function processQuotes(data) {
        var quote = data[0];
        var $li = $('<div></div>').html(
            "<h2>" + quote.name + " (" + quote.t +")</h2>" +
            '<ul class="det-list">' +
            '<li>price: $' + quote.op + " (" + quote.c + ")</li>" + 
            '<li>shares: ' + quote.shares + '</li>' +
            '</ul>');
        $(".details").html("")
            .animate( { height: 'toggle', opacity: 'hide' }, 'fast', function() {
                $(this).append($li).animate( { height: 'toggle', opacity: 'show' }, 'fast' );
            });
    }