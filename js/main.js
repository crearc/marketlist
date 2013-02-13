$(document).ready(function(){

	window.Stocks = new window.Stocker();

	$('.folder-list li').live('click', function() {
		$that = $(this);

		$('.folder-list li').removeClass('active');
		$(this).addClass('active');

		$('.stock-list').animate({ height: 'toggle', opacity: 'hide' }, 'fast', function() {
			$(this).html( Stocks.getFolder($that.text()).renderStocks() );
			$(this).animate( { height: 'toggle', opacity: 'show' }, 'fast' );
		});
	});

	$('.stock-list li .close').live('click', function() {
		$(this).parent().animate({ height: 'toggle', opacity: 'toggle' }, 'fast');
		Stocks.currFolder.removeTicker( $(this).parent().children('.quote').text() );
	});

	$('.stock-list li').live('click', function() {
		fetch($($(this).children(".quote")[0]).text());
	});

	$('.stock-list li .sold-js').live('click', function(e) {
		e.preventDefault();
		var tick = Stocks.currFolder.getTicker($(this).parent().children('.quote').text());
		tick.toggleSold();
		$(this).parent().after(tick.render()).remove();
	});

	$('.clear-sold').live('click', function() {
		Stocks.currFolder.removeSold();
		$('.stock-list').animate({ height: 'toggle', opacity: 'hide' }, 'fast', function() {
			$(this).html( Stocks.getFolder($that.text()).renderStocks() );
			$(this).animate( { height: 'toggle', opacity: 'show' }, 'fast' );
		});
	});

	$('.add-item').live('click', function() {
		var item = $('#new-item').val();
		if(!item) {
			return;
		}
		var ticker = Stocks.currFolder.addTicker(item);
		$('.stock-list').append(ticker.render());
		$('.stock-list li').last().hide().animate( { height: 'toggle', opacity: 'toggle' }, 'fast' );
	});

	$('.add-folder').live('click', function() {
		var folder = Stocks.addFolder($('#new-folder').val());
		$('#new-folder').val("");
		$('.folder-list').append(folder.render());
	});

});

//emmet