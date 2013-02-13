(function() {

	var Stocker = window.Stocker = function() {
		this.currFolder = null;
		this.currTicker = null;
		this.currKey = 0;
		this.folders = {};
		this.load();
		this.renderFolders();
	}

	Stocker.prototype = {
		addFolder: function(fname) {
			var folder = new Folder(this.currKey, fname, this);
			this.currKey++;
			this.folders[fname] = folder;
			this.save();
			return folder;
		},

		removeFolder: function(key) {
			delete this.folders[key];
		},

		getFolder: function(key) {
			this.currFolder = this.folders[key];
			return this.folders[key];
		},

		renderFolders: function() {
			var list = "";
			for(fold in this.folders) {
				list = list + this.folders[fold].render();
			}
			$('.folder-list').html(list);
			$('.folder-list li').first().trigger('click');
		},

		renderStocks: function() {
			var list = "";
			for(fold in this.folders) {
				list = list + this.folders[fold].render();
			}
			return list;
		},

		save: function() {
			localStorage.setItem("stocker", JSON.stringify(this));
		},

		load: function() {
			var cache = JSON.parse(localStorage.getItem("stocker"));
			if( !cache ) {
				return
			}
			for(f in cache.folders) {
				var fold = cache.folders[f];
				this.folders[fold.fname] = new Folder(fold.key, fold.fname, fold.stocker, fold.tickers);
			}
			this.currKey = cache.currKey;
			this.currFolder = cache.currFolder;
		},

		importJSON: function(json) {
			localStorage.setItem("stocker", json);
			this.load();
			this.renderFolders();
		}
	}

	var Folder = Stocker.Folder = function(key, fname, stocker, tickers) {
		this.key = key;
		this.fname = fname;
		this.tickers = {};
		if(tickers) {
			for(t in tickers) {
				var tick = tickers[t];
				this.tickers[tick.quote] = new Ticker(tick.quote, tick.isSold);
			}
		}
		// this.stocker = stocker;
	}


	Folder.prototype = {
		getList: function() {
			return this.tickers;
		},

		getTicker: function(ticker) {
			return this.tickers[ticker];
		},

		addTicker: function(ticker, isSold) {
			var tick = this.tickers[ticker] = new Ticker(ticker, isSold);
			window.Stocks.save();
			return tick;
		},

		removeTicker: function(ticker) {
			delete this.tickers[ticker];
			window.Stocks.save();
		},

		removeSold: function() {
			for(t in this.tickers) {
				if(this.tickers[t].isSold) {
					this.removeTicker(this.tickers[t].quote);
				}
			}
		},

		render: function () {
			return "<li>" + this.fname + "</li>\n";
		},

		renderStocks: function() {
			var list = "";
			for(t in this.tickers) {
				list = list + this.tickers[t].render();
			}
			return list;
		},
	}

	var Ticker = Stocker.Ticker = function(quote, isSold) {
		this.quote = quote.toUpperCase();
		this.isSold = isSold || false;
	}

	Ticker.prototype = {
		toggleSold: function() {
			this.isSold = !this.isSold;
			window.Stocks.save();
			return this.isSold;
		},

		render: function() {
			return '<li class="'+ (this.isSold ? 'sold-li' : 'unsold-li') +'"><span class="quote">' + this.quote + 
			'</span><span class="close">&#10006;</span><span class="sold-js ' + (this.isSold ? 'sold' : 'unsold') + '">&#10004;</span></li>\n';
		},
	}

})();