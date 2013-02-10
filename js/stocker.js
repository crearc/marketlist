(function() {

	var Stocker = window.Stocker = function() {
		this.currFolder = null;
		this.currTicker = null;
		this.currKey = 0;
		this.folders = {};
	}

	Stocker.prototype = {
		addFolder: function(name) {
			var folder = new Folder(this.currKey, name);
			this.currKey++;
			this.folders[folder.key] = folder;
		},

		removeFolder: function(key) {
			delete this.folders[key];
		},

		getFolders: function() {
			return this.folders;
		},

		renderFolders: function() {
			var list = "";
			for(fold in this.folders) {
				list = list + this.folders[fold].render();
			}
			return '<ul>\n' + list + '</ul>';
		},

		renderStocks: function() {
			var list = "";
			for(fold in this.folders) {
				list = list + this.folders[fold].render();
			}
			return '<ul class="stock-list grid_8 alpha omega">' + list + '</ul>';
		}
	}

	var Folder = Stocker.Folder = function(key, name) {
		this.key = key;
		this.name = name;
		this.tickers = {};
	}


	Folder.prototype = {
		getList: function() {
			return this.tickers;
		},

		addTicker: function(ticker) {
			var list = JSON.parse(localStorage.getItem(this.key));
			list.push(ticker);
			localStorage.setItem(this.key, JSON.stringify(list));
		},

		removeTicker: function(ticker) {
			var list = JSON.parse(localStorage.getItem(this.key));
			list.pop(ticker);
			localStorage.setItem(this.key, JSON.stringify(list));
		},

		render: function () {
			return "<li>" + this.name + "</li>\n";
		}
	}

	var Ticker = Stocker.Ticker = function(quote, folder) {
		this.quote = quote.toUpperCase();
		this.folder = folder;
	}

	Ticker.prototype = {
		render: function() {
			return '<li><span class="quote">' + this.quote + '</span><span class="close">&#10006;</span></li>';
		},
	}

})();