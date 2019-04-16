// ==UserScript==
// @name     rvkBacklink jQuery
// @version  1
// @grant    none
// @require https://code.jquery.com/jquery-1.10.2.min.js
// ==/UserScript==

function foundRVKO(){
	return document.title.startsWith("RVKO "); // leave other sites alone
}

var catalogs={
    "Opc":{"icon":"https://ub.hsu-hh.de/img_psi/2.0/favicons//default.ico",
	   "url":"https://ub.hsu-hh.de/DB=1/CLK?IKT=3000&TRM=",
	   "alt":"OPAC der HSU Hamburg"
	  },

    "Gvk":{"icon":"https://kxpwww.k10plus.de/images/favicons/default.ico",
	   "url":"https://kxp.k10plus.de/DB=2.1/CMD?ACT=SRCHA&IKT=3000&TRM=",
	   "alt":"K10+ Verbund / Fernleihe"
	  },

    "Beluga":{"icon":"https://beluga.sub.uni-hamburg.de/vufind/themes/root/images/vufind-favicon.ico",
	      "url":"https://beluga.sub.uni-hamburg.de/vufind/Search/Results?lookfor=sys+",
	      "alt":"Bibliotheken in Hamburg"
	     },
};

function isSingleRvk(rvk){
    var rvkPat=/^[A-Z]+ [0-9]+$/;
    return rvk.match(rvkPat);
}

function catLink(rvk,catId){
    var cat=catalogs[catId];
    var anchor = document.createElement("a");
    anchor.href=cat["url"] + rvk;
    anchor.target="_blank";
    anchor.innerHTML='<img src="'+cat["icon"]+'" alt="'+cat["alt"]+'" />';

    return anchor;
}


jQuery.fn.addLink=function(){
    //  alert(this.parent().next().html());
    //  alert($(this).attr("name"));

    var currentRvk=$(this).parent().next().html();
    var currHtml=$(this).html();
    if(currHtml.startsWith("&nbsp;")
       && isSingleRvk(currentRvk)
      ){
	$(this).html(" "+currHtml); // mark our visit
	// $(this).attr("href",urlOPC(currentRvk));
	$(this).parent().prepend(catLink(currentRvk,"Beluga"));
	$(this).parent().prepend(" ");
	$(this).parent().prepend(catLink(currentRvk,"Gvk"));
	$(this).parent().prepend(" ");
	$(this).parent().prepend(catLink(currentRvk,"Opc"));
    }
}


$(window).load(function(){
//if(foundRVKO){
    $("td > a[name]").each(function(){$(this).addLink()});
});
