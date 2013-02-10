$(document).ready(function(){

	Stocks = new window.Stocker();


	$('.stock-list li .close').live('click', function() {
		$(this).parent().animate({ height: 'toggle', opacity: 'toggle' }, 'fast');
		var list = JSON.parse(localStorage.getItem("stocks"));
		list.pop($(this).parent());
		localStorage.setItem("stocks", JSON.stringify(list));
	});

	$('.stock-list li').live('click', function() {

	});

	$('.add-item').live('click', function() {
		var item = $('#new-item').val();
		if(!item) {
			return;
		}
		var ticker = Stocks.currFolder.addTicker(item)
		$('.stock-list').append(ticker.render());
		//$('.close').first().parent().children('.quote').html()

	});


	$('.getlist').on('click', function() {
		var list = JSON.parse(localStorage.getItem("stocks"));

		$('.stock-list').html("").animate({ height: 'toggle', opacity: 'toggle' }, 'fast');
		for(el in list) {
			$('.stock-list').append('<li><span class="quote">' + list[el] + '</span><span class="close">&#10006;</span></li>');
		}
		$('.stock-list').animate({ height: 'toggle', opacity: 'toggle' }, 'fast');
	});

	if(!JSON.parse(localStorage.getItem("stocks"))) {
		var list = ["MSFT", "FB", "AAPL", "EXON"];
		localStorage.setItem("stocks", JSON.stringify(list));
	}
	$('.getlist').click();

});

//emmet