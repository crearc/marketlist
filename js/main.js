$(document).ready(function(){

	window.Stocks = new window.Stocker();

	$('.folder-list li').live('click', function() {
		console.log(Stocks.getFolder($(this).text()));
		$('.stock-list').html(Stocks.getFolder($(this).text()).renderStocks());
	});

	$('.stock-list li .close').live('click', function() {
		$(this).parent().animate({ height: 'toggle', opacity: 'toggle' }, 'fast');
		Stocks.currFolder.removeTicker($(this).parent().children('.quote').text());
	});

	$('.stock-list li').live('click', function() {

	});

	$('.add-item').live('click', function() {
		var item = $('#new-item').val();
		if(!item) {
			return;
		}
		var ticker = Stocks.currFolder.addTicker(item);
		$('.stock-list').append(ticker.render());
		//$('.close').first().parent().children('.quote').html()

	});

});

//emmet