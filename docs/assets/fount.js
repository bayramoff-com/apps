var fount = {

	getFont : function (e) {

		var e = (!e) ? window.event : e,
				t = e.target,
				tag = t.tagName,
				tag = (tag != 'IMG' && tag != 'INPUT') ? tag.toLowerCase() : 'p',
				x = '<'+tag+' id="founttester" class="'+t.className+'" style="position: absolute !important; left: -10000px !important; top: -1000px !important; width: auto !important; min-width: 0 !important; max-width: none !important; padding: 0 !important;line-height: auto !important;height: auto !important; min-height: 0 !important; max-height: none !important;">abcdefghijklmnopqrstuvwxyz</'+tag+'>',
				s = document.getElementById('fountscript'),
				z = null;

		if (document.getElementById('fountoutput')) fount.fountReset();

		var f = fount.getStyle(t, 'font-family', false);

		// add tester element
		t.parentNode.innerHTML += x;

		// get initial width
		var d = document.getElementById('founttester'),
				ow = fount.getStyle(d, 'width', true),
				oh = fount.getStyle(d, 'height', true);

		if (!f.match(',')) {

			d.style.fontFamily = 'serif';

			if (fount.getStyle(d, 'width', true) == ow) z = 'Default';
			else z = f;

		}
		else {
			// compare widths
			while (f.match(',')) {

				z = f.match(/^[^,]+,/)[0].replace(',', '');
				f = f.replace(/^[^,]+,/, '');

				d.style.setProperty("font-family", f, "important");

				if (fount.getStyle(d, 'width', true) != ow || fount.getStyle(d, 'height', true) != oh) break;
				else if (!f.match(',')) z = f;

			}

		}

		// Get font provider
		var sourceurl = false,
				fontname = z.trim().replace(/\"|\'/g, '').replace(/\-/g, ' ').replace(/\sW[0-9]+\s*/, ' ')
										.replace(/^ff\s/, 'FF ')
										.replace(/^itc\s/, 'ITC '),
				fontsource = 'unknown',
				fontsheets = document.styleSheets,
				fontlinks = document.querySelectorAll('link[href*=type],link[href*=font],link[href*=creative],link[href*=typography]');

		if (fontlinks.length > 0) sourceurl = fontlinks[fontlinks.length - 1].href.match('\:\/\/([^\/]+)\/')[1]

		// Get font source fonturls
		for(var x = 0; x < fontsheets.length; x++) {

			if (!fontsheets[x].href) {
				var rules = fontsheets[x].rules || fontsheets[x].cssRules;

				for (var j = 0; j < rules.length; j++) {

					var csstxt = rules[j].cssText || rules[j].style.cssText;

					if (csstxt.match(/@font-face/) && csstxt.match(z.trim())) {

						if (csstxt.match('url\([^\:]+\:\/\/([^\/]+)\/[^\)]+\)')) sourceurl = csstxt.match('url\([^\:]+\:\/\/([^\/]+)\/[^\)]+\)')[2];
						else sourceurl = 'local';

					}
				}
			}
			else if (fontsheets[x].href.match(/typekit|font|creative|type|typography/)) {

				var sourceurlfontname = z.trim().replace(/(\s|-|_)/g,"+").toLowerCase();

				if (fontsheets[x].href.match(sourceurlfontname)) sourceurl = fontsheets[x].href.match('\:\/\/([^\/]+)\/')[1];

			}
		}

		// Create font info output
		var output = document.createElement('div'),
				myfontslink = '<p id="fountoutput-p2" style="display:block; text-shadow: none; background: none; letter-spacing: 0; text-align:center; font-size: 11px; font-family: arial, sans-serif !important; color: #444 !important; width: 100%; margin: 0; padding: 10px 0 0 0; line-height: 1em;"><a id="fountoutput-a" style="color: #444 !important;text-decoration:none !important;font-family: arial, sans-serif !important;font-size: 11px !important;" target="_blank" href="https://www.myfonts.com/search/' + z.trim().replace(/(\s|_)/g, '+').replace(/([a-z])([A-Z])/g, "$1+$2").replace(/["']/g, '') + '/">View font on <span id="fountoutput-span" style="color: #026B96 !important;font-family: arial, sans-serif !important;font-size: 11px !important;">MyFonts</span> &rsaquo;</a></p>';

		output.id = "fountoutput";

		output.innerHTML = '<h1 id="fountoutput-h1" style="display:block; text-shadow: none; background: none; letter-spacing: 0; font-family:'+ z.replace(/\"/g, "'") +','+ f.replace(/\"/g, "'") +'; font-size: 24px; width: auto; height: auto; box-shadow: none; border: none; text-transform: capitalize; color: #444 !important; text-align:center; margin: 0 0 10px; line-height: 1em; padding: 0; width: 100%; position:relative; top:auto; left:auto;">'+fontname +'</h1><p id="fountoutput-p" style="display:block; text-shadow: none; background: none; letter-spacing: 0; text-align:center; font-size: 10px; font-family: arial, sans-serif !important; letter-spacing: 1px; color: #777; width: 100%; margin: 0; padding: 0; text-transform: uppercase; line-height: 1em;">Size: '+ fount.getStyle(d, 'font-size', false) +' / Weight: '+ fount.getStyle(d, 'font-weight', false) +' / Style: ' + fount.getStyle(d, 'font-style', false) + '</p>';

		if (sourceurl && sourceurl != 'local' && z != 'Default') {

			var fontservice = false;

			fontsource = fontsourceurl = sourceurl;

			z = z.trim().toLowerCase();

			if (fontsource == 'cloud.typography.com') {
				fontsource = "Hoefler & Co.";
				fontsourceurl = "https://www.typography.com/search?term=" + z.replace(/\s/g, '+').replace(/([a-z])([A-Z])/g, "$1+$2").replace(/["']/g, '') + "&";
				fontservice = true;
			}
			if (fontsource == 'cloud.webtype.com') {
				fontsource = "Webtype";
				fontsourceurl = "https://www.webtype.com/store/search/?q=" + z.replace(/\s/g, '+').replace(/([a-z])([A-Z])/g, "$1+$2").replace(/["']/g, '') + "&";
				fontservice = true;
			}
			if (fontsource == 'fast.fonts.net') {
				fontsource = "Fonts.com";
				fontsourceurl = "https://www.fonts.com/search/all-fonts?searchText=" + z.replace(/\sW[0-9]+\s*/, ' ').replace(/\s/g, '%20').replace(/"/g, '') + "&SearchType=WebFonts&";
				fontservice = true;
			}
			if (fontsource == 'use.edgefonts.net') {
				fontsource = "Adobe Edge Fonts";
				fontsourceurl = "https://edgewebfonts.adobe.com/fonts#/?collection=" + z.replace(/"/g, '') + "?";
				fontservice = true;
			}
			if (fontsource == 'fonts.googleapis.com' || fontsource == 'fonts.gstatic.com' || fontsource == 'use.typekit.net' || fontsource == 'use.typekit.com' || fontsource == 'webfonts.creativecloud.com') {
				fontsource = "Adobe Fonts";
				fontsourceurl = "https://fonts.adobe.com/fonts/" + z.replace(/"/g, '').replace(/(\s|_)/g, '-').replace(/\./g, '\.') + "?";
				fontservice = true;
			}

			fontsourceurl += "utm_source=fount.artequalswork.com&utm_medium=referral";

			if (fontservice) output.innerHTML += '<p id="fountoutput-p2" style="display:block; text-shadow: none; background: none; letter-spacing: 0; text-align:center; font-size: 11px; font-family: arial, sans-serif !important; color: #444 !important; width: 100%; margin: 0; padding: 10px 0 0 0; line-height: 1em;"><a id="fountoutput-a" style="color: #444 !important;text-decoration:none !important;font-family: arial, sans-serif !important;font-size: 11px !important;" target="_blank" href="' + fontsourceurl + '">View font on <span id="fountoutput-span" style="color: #026B96 !important;font-family: arial, sans-serif !important;font-size: 11px !important;">' + fontsource + '</span> &rsaquo;</a></p>';
			else output.innerHTML += myfontslink;

		}
		else if (z != 'Default') {

			output.innerHTML += myfontslink;

		}

		document.body.appendChild(output);

		output.style.width = "auto";
		output.style.zIndex = "1000061",
		output.style.backgroundColor = "rgba(245,245,245,0.85)",
		output.style.borderRadius = "12px",
		output.style.border = "1px solid #fff",
		output.style.boxShadow = "0 1px 4px rgba(0,0,0,0.5)",
		output.style.position = "fixed";
		output.style.top = "20px";
		output.style.right = "20px";
		output.style.padding = "15px";

		console.log(fontname); 

		fount.addEvent(output, 'click', function (e2) {

			fount.fountClose();

		});

		fount.prevent(e);

	},

	prevent : function (e) {

		if (e.preventDefault) e.preventDefault();
		else event.returnValue = false;

		// handle event bubbling
		if (e.stopPropagation) e.stopPropagation();
		else e.cancelBubble = true;

	},

	fountClose : function (clearEvents) {

		fount.del(document.getElementById('fountscript'));
		fount.del(document.getElementById('founttester'));
		fount.del(document.getElementById('fountoutput'));

		var eles = document.getElementsByTagName('*'),
				j = eles.length;

		while(j-->0) fount.removeEvent(eles[j], 'click', fount.getFont);

		document.body.style.cursor = 'default';

	},

	fountReset : function () {

		fount.del(document.getElementById('founttester'));
		fount.del(document.getElementById('fountoutput'));

	},

	addEvent : function (t, e, f, o) {

		o = o || false;

		if (window.attachEvent) t.attachEvent('on' + e, f);
		else t.addEventListener(e, f, o);

	},

	removeEvent : function (t, e, f, o) {

		o = o || false;

		if (window.detachEvent) t.detachEvent('on' + e, f);
		else t.removeEventListener(e, f, o);

	},

	del : function (t) {

		if (t != null) t.parentNode.removeChild(t);

	},

	getStyle : function (t, s, n) {

		var r;

		if (t.currentStyle) r = t.currentStyle[s.replace(/-([A-z])/gi, function(a,b) {return b.toUpperCase();})];
		else if (window.getComputedStyle) r = document.defaultView.getComputedStyle(t,null).getPropertyValue(s);

		if (n) return parseFloat(r);
		else return r;

	},

	rand : function (min, max) {

	    return min + Math.floor(Math.random() * (max - min));

	},

	 
	init : function (eles) {

		document.body.style.cursor = 'crosshair';

		var eles = document.getElementsByTagName('*'),
				i = eles.length;

		while(i-->0){

			if (!eles[i].id.match('fountoutput')) {

				fount.addEvent(eles[i], 'click', fount.getFont);

			}

		}

	}

}

fountReset = null;

fount.init();