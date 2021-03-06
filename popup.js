var googleBookmarks = {
  /**
   * URL that will gives up to 10000 bookmarks.
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
	var labels = [];
	var unlabeled = [];
	var label_elements;
    for (var i = 0; i < items.length; i++) {
	  /*
	  document.body.innerHTML += "<a href='" + items[i].childNodes[1].textContent + 
								 "' >" + items[i].childNodes[0].textContent + "</a><br>"; 
	  */
	  
	  /* sort bookmarks into array by label */
	  label_elements = items[i].getElementsByTagName("bkmk_label");
	  
	  /* bookmark has a label */
	  if ( label_elements.length > 0 ) {
	    /* just insert if array is empty */
		if ( labels.length == 0 ) {
		  labels[labels.length] = [label_elements[0].textContent, [items[i]]];
		}
		/* otherwise we search the labels to see if it has already been inserted */
		else {
		  var inserted = false;
		  for ( var j = 0; j < labels.length; j++ ) {
			if ( labels[j][0] == label_elements[0].textContent ) {
              labels[j][1][labels[j][1].length] = items[i];
		      inserted = true;
			}
		  }
		  if ( !inserted ) {
		    labels[labels.length] = [label_elements[0].textContent, [items[i]]];
		  }
		}
	  }  

	  /* bookmark is unlabeled */
	  else
		unlabeled[unlabeled.length] = items[i];
    }
	
	/* display labels with bookmarks hidden */
	for ( var k = 0; k < labels.length; k++ ) {
	  var para = '<div onmouseenter="showLinks(this)" onmouseleave="hideLinks(this.id)">' + 
	               labels[k][0] + '</div>';
	  var text = "<div id='" + k + "' style='display:none'>";
	  for ( var m = 0; m < labels[k][1].length; m++ ) {
	    text += labels[k][1][m].childNodes[0].textContent + "<br>";
	  }
	  text += "</div>";
	  document.body.innerHTML += para + text;
	}
	
  },
  
  /*
  myFunction_: function(string) {
	// chrome.tabs.create({url : string}, function(tab));
  },
  */
  
};

// Run script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
  googleBookmarks.requestBookmarks();
});

$(document).ready(function(){
  $("p").hover(function(){
    $("p").css("background-color","yellow");
    },function(){
    $("p").css("background-color","pink");
  });
});

function showLinks (x) {
  document.body.innerHTML += "AAAAA<br>";
  x.style.backgroundColor ="red";
  // $("div#"+k).show();
}

function hideLinks (x) {
  // $("div#"+k).hide();
}