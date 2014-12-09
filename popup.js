// Run our kitten generation script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
  googleBookmarks.requestBookmarks();
});

var googleBookmarks = {
  /**
   * Flickr URL that will give us lots and lots of whatever we're looking for.
   *
   * See http://www.flickr.com/services/api/flickr.photos.search.html for
   * details about the construction of this URL.
   *
   * @type {string}
   * @private
   */
   
  getBookmarks_: 'https://www.google.com/bookmarks/find?q=&output=rss&num=10000',
  

  /**
   * Sends an XHR GET request to grab up to 10000 Google Bookmarks. The
   * XHR's 'onload' event is hooks up to the 'showInfo_' method.
   *
   * @public
   */
  requestBookmarks: function() {
    var req = new XMLHttpRequest();
    req.open("GET", this.getBookmarks_, true);
    req.onload = this.showInfo_.bind(this);
    req.send(null);
  },

  /**
   * Handle the 'onload' event of our XHR request, generated in
   * 'requestBookmarks'.
   *
   * @param {ProgressEvent} e The XHR ProgressEvent.
   * @private
   */
  showInfo_: function (e) {
    var items = e.target.responseXML.querySelectorAll('item');
    for (var i = 0; i < items.length; i++) {
      var para = document.createElement('P');
      // img.setAttribute('alt', kittens[i].getAttribute('title'));
	  /*
	  var t = document.createTextNode(items[i].textContent);
	  para.appendChild(t);
      document.body.appendChild(para);
	  */
	  document.body.innerHTML += "<a href='" + items[i].childNodes[1].textContent + 
								 "' >" + items[i].childNodes[0].textContent + "</a><br>";
    }
  },
  
  /*
  myFunction_: function(string) {
	chrome.tabs.create({url : string}, function(tab);
  },
  */
  
};
