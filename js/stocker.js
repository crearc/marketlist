(function() {

	var Stocker = window.Stocker = function() {
		this.currFolder = null;
		this.currTicker = null;
		this.currKey = 0;
		this.folders = {};
		this.load();
		this.renderFolders();
	}

	//.animate({ height: 'toggle', opacity: 'toggle' }, 'fast');

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
		},

		renderStocks: function() {
			var list = "";
			for(fold in this.folders) {
				list = list + this.folders[fold].render();
			}
			return list;
			//return '<ul class="stock-list grid_8 alpha omega">' + list + '</ul>';
		},

		save: function() {
/*			for(f in this.folders) {
				this.folders[f].stocker = null;
			}*/
			localStorage.setItem("stocker", JSON.stringify(this));
		},

		load: function() {
			var cache = JSON.parse(localStorage.getItem("stocker"));
			console.log(cache);
			for(f in cache.folders) {
				var fold = cache.folders[f];
				this.folders[fold.fname] = new Folder(fold.key, fold.fname, fold.stocker, fold.tickers);
			}
			console.log(this.folders);
			this.currKey = cache.currKey;
			this.currFolder = cache.currFolder;
		}
	}

	var Folder = Stocker.Folder = function(key, fname, stocker, tickers) {
		this.key = key;
		this.fname = fname;
		this.tickers = {};
		if(tickers) {
			for(t in tickers) {
				var tick = tickers[t];
				this.tickers[tick.quote] = new Ticker(tick.quote, this);
			}
		}
		// this.stocker = stocker;
	}


	Folder.prototype = {
		getList: function() {
			return this.tickers;
		},

		addTicker: function(ticker) {
			var tick = this.tickers[ticker] = new Ticker(ticker, this);
			window.Stocks.save();
			return tick;
		},

		removeTicker: function(ticker) {
			delete this.tickers[ticker];
			window.Stocks.save();
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

	var Ticker = Stocker.Ticker = function(quote, folder) {
		this.quote = quote.toUpperCase();
		//this.folder = folder;
	}

	Ticker.prototype = {
		render: function() {
			return '<li><span class="quote">' + this.quote + '</span><span class="close">&#10006;</span></li>\n';
		},
	}

})();