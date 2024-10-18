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
    "hsuC":{"icon":"https://ub.hsu-hh.de/favicon.ico",
	   "url":"https://hamburghsu.gbv.de/search?q=topic(RVK+",
	   "alt":"HSU Central - beta",
	   "urlfin":")"
      },

    "Opc":{"icon":"https://ub.hsu-hh.de/img_psi/2.0/favicons//default.ico",
	   "url":"https://ub.hsu-hh.de/DB=1/CLK?IKT=3000&TRM=",
	   "alt":"OPAC der HSU Hamburg",
	   "urlfin":""
      },

    "Gvk":{"icon":"https://kxpwww.k10plus.de/images/favicons/default.ico",
	   "url":"https://kxp.k10plus.de/DB=2.1/CMD?ACT=SRCHA&IKT=3000&TRM=",
	   "alt":"GVK Verbundkatalog / Fernleihe",
       "urlfin":""
	  },

    "Beluga":{"icon":"https://beluga.sub.uni-hamburg.de/vufind/themes/root/images/vufind-favicon.ico",
        "url":"https://beluga.sub.uni-hamburg.de/vufind/Search/Results?lookfor=sys+",
        "alt":"Bibliotheken in Hamburg",
        "urlfin":""
      },

    "KatHH":{"icon":"https://katalog.hamburg/vufind/themes/root/images/vufind-favicon.ico",
        "url":"https://katalog.hamburg/vufind/Search/Results?lookfor=",
        "alt":"Katalog Hamburg - Bestände wissenschaftlicher Bibliotheken in Hamburg",
        "urlfin":" rvk&type=Class"
      }
};

function isSingleRvk(rvk){
    var rvkPat=/^[A-Z]+ [0-9]+$/;
    return rvk.match(rvkPat);
}

function catLink(rvk,catId){
    var cat=catalogs[catId];
    var anchor = document.createElement("a");
    anchor.href=cat["url"] + encodeURIComponent(rvk) + cat["urlfin"];
    anchor.target="_blank";
    anchor.innerHTML='<img class="catLink" src="'+cat["icon"]+'" title="'+cat["alt"]+'" />';

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
	$(this).parent().prepend(catLink(currentRvk,"KatHH"));
	$(this).parent().prepend(" ");
	$(this).parent().prepend(catLink(currentRvk,"Gvk"));
	$(this).parent().prepend(" ");
	$(this).parent().prepend(catLink(currentRvk,"hsuC"));
	$(this).parent().prepend(" ");
	$(this).parent().prepend(catLink(currentRvk,"Opc"));
    }
}

function legende(){
    var legend=document.createElement("div");
    legend.id="legende";
    legend.innerHTML='Verlinken der RVK-Systemstellen ergänzt von Ulrich Hahn, HSU Hamburg\
<p>Die Icons führen zu Treffern in folgenden Katalogen\
<ul>\
<li><img src="'+catalogs["Opc"]["icon"]+'" alt="'+catalogs["Opc"]["alt"]+'"/> '+catalogs["Opc"]["alt"]+'</li>\
<li><img src="'+catalogs["hsuC"]["icon"]+'" alt="'+catalogs["hsuC"]["alt"]+'"/> '+catalogs["hsuC"]["alt"]+'</li>\
<li><img src="'+catalogs["Gvk"]["icon"]+'" alt="'+catalogs["Gvk"]["alt"]+'"/> '+catalogs["Gvk"]["alt"]+'</li>\
<li><img src="'+catalogs["KatHH"]["icon"]+'" alt="'+catalogs["KatHH"]["alt"]+'"/> '+catalogs["KatHH"]["alt"]+'</li>\
</ul>\
';
    return legend;
}

$(window).load(function(){
//if(foundRVKO){
    $("td > a[name]").each(function(){$(this).addLink()});
    $("body").append(legende());

});
