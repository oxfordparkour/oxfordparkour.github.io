try {
var _xnext_included;
if (!_xnext_included && !window.location.href.match(/fb_xd_fragment/g)) {
_xnext_included = true;

if(!document.body) {
    throw "The tag <body> is missing";
}

function xInjectJs(src) {
	if (window.ecwid_script_defer) {
		var script = document.createElement("script");
		script.setAttribute("src", src);
		script.charset = "utf-8";
		script.setAttribute("type", "text/javascript");
		document.body.appendChild(script);
	} else document.write("<script src='"+src+"' type='text/javascript' charset='utf-8'></script>");
}

if (window.Ecwid && window.Ecwid.restoreCartData) {
    var cartData = window.Ecwid.restoreCartData;
    for (var item in cartData) {
        localStorage.setItem(item, cartData[item]);
    }
}

// Hi! Do you love reading JavaScript code? We too! 
// Ecwid has a plenty of different APIs and we welcome all developers to 
// create addons and services (free or paid ones) for Ecwid merchants. Such 
// addons and apps will be promoted on our site. 
// More about our APIs: http://api.ecwid.com

var ecwidContextPath = "";
var addExtension = function(cons,ext) {
	if (cons.addExtension) cons.addExtension(ext);
	else cons(ext);
};
var ep = function() {
	  this.extensions = [];
	  this.consumers = [];
	  var that = this;
	  this.registerConsumer = function(cons) {
	    that.consumers.push(cons);
	    for (var i=0; i<that.extensions.length; i++) addExtension(cons, that.extensions[i]);
	  };
	  this.addExtension = this.add = function(ext) {
	    that.extensions.push(ext);
	    for (var i=0; i<that.consumers.length; i++) addExtension(that.consumers[i],ext);
	  };
      this.clear = function() {
        that.extensions = [];
      };
	};
var proxyChain = function() {return {Chain:new ep};};
window.Ecwid = {
	MessageBundles:(window.Ecwid && window.Ecwid.MessageBundles) ? window.Ecwid.MessageBundles : {},
	ExtensionPoint:ep,
	ProductBrowser : {Links:new ep,
			CategoryView:proxyChain()
			},
	Controller : proxyChain(),
	ShoppingCartController : proxyChain(),
	ProductModel : proxyChain(),
	CategoriesModel : proxyChain(),
	CategoryModel : proxyChain(),
	AppContainer : proxyChain(),
	Profile : proxyChain(),
	CustomerCredentialsModel : proxyChain(),
	LocationHashModel : proxyChain(),
	OnAPILoaded: new ep,
	OnPageLoad: new ep,
	OnSetProfile: new ep,
	OnPageLoaded: new ep,
	OnConfigLoaded: new ep,
    OnCartChanged: new ep,
    OnProductOptionsChanged: new ep
	};
	
window.Ecwid.postFBWithParam = function(fb, endpoint, params, callback) {
	if (!(params instanceof Object) && typeof params === 'object') {
		params = (function(source) {
			if (null == source || "object" != typeof source) return source;
			var target = {}; 
			for (var attr in source) {
				if (source.hasOwnProperty(attr)) target[attr] = source[attr];
			}
			return target;
		})(params);
	}
	fb.api(endpoint, 'POST', params, callback);
}

xInjectJs("https://d3fi9i0jj23cau.cloudfront.net/gz/22.2-1093-gae65c0b/functions.js");
window.Ecwid.MessageBundles['ru.cdev.xnext.client']={};
window.Ecwid.MessageBundles['ru.cdev.gwt.client']={};

if (window.top != window && document.referrer) {
	var hash_position = document.referrer.lastIndexOf('#!/');
	if (hash_position == -1) {
		// compatibility with old hashes
		// TODO: remove it 
		hash_position = document.referrer.lastIndexOf('#ecwid:');
	}
	if (hash_position != -1) {
		var hash = document.referrer.substr(hash_position);
		var loc = window.location.href;
		if (loc.indexOf('#') == -1) window.location.replace(loc + hash);
		else {
			if (loc.substr(loc.indexOf('#')) != hash) window.location.replace(loc.substr(0, loc.indexOf('#')) + hash);
		}
	}
	if (typeof ecwid_history_token != 'undefined') {
		var loc = window.location.href;		
		if(hash_position != -1)
			window.location.replace(loc.substr(0, loc.indexOf('#')) + ecwid_history_token);
		else
			window.location.replace(loc + '#' + ecwid_history_token);
	}		
}

if(!window.ecwid_nocssrewrite) {
    var html_id = null;
    var html_tag = document.getElementsByTagName("html");
    if(html_tag && html_tag.length) {
        html_tag = html_tag[0];
        if(!html_tag.id) html_tag.id = "ecwid_html";
        html_id = html_tag.id;
    }

    var body_id = null;
    var body_tag = document.getElementsByTagName("body");
    if(body_tag && body_tag.length) {
        body_tag = body_tag[0];
        if(!body_tag.id) body_tag.id = "ecwid_body";
        body_id = body_tag.id;
    }

    if(html_id || body_id) {
        css_selectors_prefix = "";
        if(html_id) {
            css_selectors_prefix += "html%23"+html_id;
        }
        if(html_id && body_id) css_selectors_prefix += "%20";
        if(body_id) {
            css_selectors_prefix += "body%23"+body_id;
        }
    }
}

window.ecwid_script_base="https://d3fi9i0jj23cau.cloudfront.net/gz/22.2-1093-gae65c0b/";
window.ecwid_url="https://app.ecwid.com/";


if (!window.amazon_image_domain) {
	window.amazon_image_domain = "https://dpbfm6h358sh7.cloudfront.net";
}

var ecwid_onBodyDoneTimerId,ecwid_bodyDone;
function ecwid_no_fb_iframe() {
	return !window.location.href.match(/fb_xd_fragment/g);
}
function ecwid_onBodyDone() {
    if (!ecwid_bodyDone && ecwid_no_fb_iframe() && !window.ecwid_dynamic_widgets || window.ecwid_dynamic_widgets) {
    	ecwid_bodyDone = true;
    	window.ecwid_script_defer = true;

		var cssUrlAddition = (document.documentMode==7?'&IE8-like-IE7':'')+(window.css_selectors_prefix? '&id-selector='+window.css_selectors_prefix:'')+((function() {return 'ontouchstart' in window || !!(window.DocumentTouch && document instanceof DocumentTouch);})()?'&hover=disable':'');

function getAdditionalCssUrlParams(configStorage) {
	var useCustomChameleonColors = configStorage
		&& configStorage.config
		&& configStorage.config.chameleon;
	var internalChameleonColors = (typeof ChameleonIntegration == "undefined")
		? {}
		: ChameleonIntegration.getChameleonColors();
	var colors = useCustomChameleonColors
		? configStorage.config.chameleon
		: internalChameleonColors;
	var cssColorParams = "";
	for (var key in colors) {
		if (colors.hasOwnProperty(key)) {
			var value = colors[key];
			cssColorParams += "&" + encodeURIComponent(key) + "=" + encodeURIComponent(value.substring(0,25));
		}
	}
	return cssColorParams;
}

window.ec = window.ec || {};
window.ec.config = window.ec.config || {};
var colorParams = getAdditionalCssUrlParams(window.ec);
if (!!colorParams) {
	window.ec.config.enableChameleon = true;
}
cssUrlAddition += colorParams;

		// ========================= NOCACHE BEGIN =========================
		ru_cdev_xnext_frontend_Main=function(){var P='bootstrap',Q='begin',R='gwt.codesvr.ru.cdev.xnext.frontend.Main=',S='gwt.codesvr=',T='ru.cdev.xnext.frontend.Main',U='startup',V='DUMMY',W=0,X=1,Y='iframe',Z='javascript:""',$='position:absolute; width:0; height:0; border:none; left: -1000px;',_=' top: -1000px;',ab='CSS1Compat',bb='<!doctype html>',cb='',db='<html><head><\/head><body><\/body><\/html>',eb='undefined',fb='DOMContentLoaded',gb=50,hb='Chrome',ib='eval("',jb='");',kb='script',lb='javascript',mb='moduleStartup',nb='moduleRequested',ob='ru_cdev_xnext_frontend_Main',pb='Failed to load ',qb='head',rb='meta',sb='name',tb='ru.cdev.xnext.frontend.Main::',ub='::',vb='gwt:property',wb='content',xb='=',yb='gwt:onPropertyErrorFn',zb='Bad handler "',Ab='" for "gwt:onPropertyErrorFn"',Bb='gwt:onLoadErrorFn',Cb='" for "gwt:onLoadErrorFn"',Db='#',Eb='?',Fb='/',Gb='img',Hb='clear.cache.gif',Ib='baseUrl',Jb='ru.cdev.xnext.frontend.Main.nocache.js',Kb='base',Lb='//',Mb='mgwt.os',Nb='safari',Ob='android',Pb='desktop',Qb='iphone',Rb='ipad',Sb='ipod',Tb='user.agent',Ub='webkit',Vb='msie',Wb=10,Xb=11,Yb='iemobile/10',Zb='ie10',$b=9,_b='ie9',ac='msie 6.',bc='msie 7.',cc=8,dc='ie8',ec='gecko',fc='opera',gc='gecko1_8',hc=2,ic=3,jc=4,kc='selectingPermutation',lc='ru.cdev.xnext.frontend.Main.devmode.js',mc='12303E8B27D2E81B48D3ED5E2DFCFC8F',nc='4B884CAE4BDB35B3B178A2FF3A2F0758',oc='69567127A2D55C16D8AFFCE8AFF56AD3',pc='BE43685607889B75F344EEFB6B07AE6D',qc='F4E60557CFF7B2D818138EF35293E738',rc=':',sc='.cache.js',tc='link',uc='rel',vc='stylesheet',wc='href',xc='loadExternalRefs',yc='https://d3j0zfs7paavns.cloudfront.net/css/new?hc=-1687054147&ownerid=9201175'+cssUrlAddition,zc='end',Ac='http:',Bc='file:',Cc='_gwt_dummy_',Dc='__gwtDevModeHook:ru.cdev.xnext.frontend.Main',Ec='Ignoring non-whitelisted Dev Mode URL: ',Fc=':moduleBase';var o;var p=window;var q=document;s(P,Q);function r(){var a=p.location.search;return a.indexOf(R)!=-1||a.indexOf(S)!=-1}
function s(a,b){if(p.__gwtStatsEvent){p.__gwtStatsEvent({moduleName:T,sessionId:p.__gwtStatsSessionId,subSystem:U,evtGroup:a,millis:(new Date).getTime(),type:b})}}
ru_cdev_xnext_frontend_Main.__sendStats=s;ru_cdev_xnext_frontend_Main.__moduleName=T;ru_cdev_xnext_frontend_Main.__errFn=null;ru_cdev_xnext_frontend_Main.__moduleBase=V;ru_cdev_xnext_frontend_Main.__softPermutationId=W;ru_cdev_xnext_frontend_Main.__computePropValue=null;ru_cdev_xnext_frontend_Main.__getPropMap=null;ru_cdev_xnext_frontend_Main.__installRunAsyncCode=function(){};ru_cdev_xnext_frontend_Main.__gwtStartLoadingFragment=function(){return null};ru_cdev_xnext_frontend_Main.__gwt_isKnownPropertyValue=function(){return false};ru_cdev_xnext_frontend_Main.__gwt_getMetaProperty=function(){return null};var t=null;var u=p.__gwt_activeModules=p.__gwt_activeModules||{};u[T]={moduleName:T};ru_cdev_xnext_frontend_Main.__moduleStartupDone=function(e){var f=u[T].bindings;u[T].bindings=function(){var a=f?f():{};var b=e[ru_cdev_xnext_frontend_Main.__softPermutationId];for(var c=W;c<b.length;c++){var d=b[c];a[d[W]]=d[X]}return a}};var v;function w(){A();return v}
function A(){if(v){return}var a=q.createElement(Y);a.src=Z;a.id=T;a.style.cssText=$+_;a.tabIndex=-1;q.body.appendChild(a);v=a.contentDocument;if(!v){v=a.contentWindow.document}v.open();var b=document.compatMode==ab?bb:cb;v.write(b+db);v.close()}
function B(k){function l(a){function b(){if(typeof q.readyState==eb){return typeof q.body!=eb&&q.body!=null}return /loaded|complete/.test(q.readyState)}
var c=b();if(c){a();return}function d(){if(!c){c=true;a();if(q.removeEventListener){q.removeEventListener(fb,d,false)}if(e){clearInterval(e)}}}
if(q.addEventListener){q.addEventListener(fb,d,false)}var e=setInterval(function(){if(b()){d()}},gb)}
function m(c){function d(a,b){a.removeChild(b)}
var e=w();var f=e.body;var g;if(navigator.userAgent.indexOf(hb)>-1&&(window.JSON&&window.JSON.stringify)){var h=e.createDocumentFragment();h.appendChild(e.createTextNode(ib));for(var i=W;i<c.length;i++){var j=window.JSON.stringify(c[i]);h.appendChild(e.createTextNode(j.substring(X,j.length-X)))}h.appendChild(e.createTextNode(jb));g=e.createElement(kb);g.language=lb;g.appendChild(h);f.appendChild(g);d(f,g)}else{for(var i=W;i<c.length;i++){g=e.createElement(kb);g.language=lb;g.text=c[i];f.appendChild(g);d(f,g)}}}
ru_cdev_xnext_frontend_Main.onScriptDownloaded=function(a){l(function(){m(a)})};s(mb,nb);var n=q.createElement(kb);n.src=k;if(ru_cdev_xnext_frontend_Main.__errFn){n.onerror=function(){ru_cdev_xnext_frontend_Main.__errFn(ob,new Error(pb+code))}}q.getElementsByTagName(qb)[W].appendChild(n)}
ru_cdev_xnext_frontend_Main.__startLoadingFragment=function(a){return F(a)};ru_cdev_xnext_frontend_Main.__installRunAsyncCode=function(a){var b=w();var c=b.body;var d=b.createElement(kb);d.language=lb;d.text=a;c.appendChild(d);c.removeChild(d)};function C(){var c={};var d;var e;var f=q.getElementsByTagName(rb);for(var g=W,h=f.length;g<h;++g){var i=f[g],j=i.getAttribute(sb),k;if(j){j=j.replace(tb,cb);if(j.indexOf(ub)>=W){continue}if(j==vb){k=i.getAttribute(wb);if(k){var l,m=k.indexOf(xb);if(m>=W){j=k.substring(W,m);l=k.substring(m+X)}else{j=k;l=cb}c[j]=l}}else if(j==yb){k=i.getAttribute(wb);if(k){try{d=eval(k)}catch(a){alert(zb+k+Ab)}}}else if(j==Bb){k=i.getAttribute(wb);if(k){try{e=eval(k)}catch(a){alert(zb+k+Cb)}}}}}__gwt_getMetaProperty=function(a){var b=c[a];return b==null?null:b};t=d;ru_cdev_xnext_frontend_Main.__errFn=e}
function D(){if(window.ecwid_script_base){o=window.ecwid_script_base;return o}function e(a){var b=a.lastIndexOf(Db);if(b==-1){b=a.length}var c=a.indexOf(Eb);if(c==-1){c=a.length}var d=a.lastIndexOf(Fb,Math.min(c,b));return d>=W?a.substring(W,d+X):cb}
function f(a){if(a.match(/^\w+:\/\//)){}else{var b=q.createElement(Gb);b.src=a+Hb;a=e(b.src)}return a}
function g(){var a=__gwt_getMetaProperty(Ib);if(a!=null){return a}return cb}
function h(){var a=q.getElementsByTagName(kb);for(var b=W;b<a.length;++b){if(a[b].src.indexOf(Jb)!=-1){return e(a[b].src)}}return cb}
function i(){var a=q.getElementsByTagName(Kb);if(a.length>W){return a[a.length-X].href}return cb}
function j(){var a=q.location;return a.href==a.protocol+Lb+a.host+a.pathname+a.search+a.hash}
var k=g();if(k==cb){k=h()}if(k==cb){k=i()}if(k==cb&&j()){k=e(q.location.href)}k=f(k);return k}
function F(a){if(a.match(/^\//)){return a}if(a.match(/^[a-zA-Z]+:\/\//)){return a}return ru_cdev_xnext_frontend_Main.__moduleBase+a}
function G(){var f=[];var g=W;function h(a,b){var c=f;for(var d=W,e=a.length-X;d<e;++d){c=c[a[d]]||(c[a[d]]=[])}c[a[e]]=b}
var i=[];var j=[];function k(a){var b=j[a](),c=i[a];if(b in c){return b}var d=[];for(var e in c){d[c[e]]=e}if(t){t(a,d,b)}throw null}
j[Mb]=function(){{var b=function(){var a=window.navigator.userAgent.toLowerCase();if(a.indexOf(Nb)==-1&&a.indexOf(Ob)!=-1){return Pb}if(a.indexOf(Ob)!=-1||(a.indexOf(Qb)!=-1||(a.indexOf(Rb)!=-1||a.indexOf(Sb)!=-1))){return Qb}return Pb}();return b}};i[Mb]={desktop:W,iphone:X};j[Tb]=function(){var a=navigator.userAgent.toLowerCase();var b=q.documentMode;if(function(){return a.indexOf(Ub)!=-1}())return Nb;if(function(){return a.indexOf(Vb)!=-1&&(b>=Wb&&b<Xb)||a.indexOf(Yb)!=-1}())return Zb;if(function(){return a.indexOf(Vb)!=-1&&(b>=$b&&b<Xb)}())return _b;if(function(){return a.indexOf(ac)!=-1||(a.indexOf(bc)!=-1||a.indexOf(Vb)!=-1&&(b>=cc&&b<Xb))}())return dc;if(function(){return a.indexOf(ec)!=-1||(b>=Xb||a.indexOf(fc)!=-1)}())return gc;return Nb};i[Tb]={gecko1_8:W,ie10:X,ie8:hc,ie9:ic,safari:jc};__gwt_isKnownPropertyValue=function(a,b){return b in i[a]};ru_cdev_xnext_frontend_Main.__getPropMap=function(){var a={};for(var b in i){if(i.hasOwnProperty(b)){a[b]=k(b)}}return a};ru_cdev_xnext_frontend_Main.__computePropValue=k;p.__gwt_activeModules[T].bindings=ru_cdev_xnext_frontend_Main.__getPropMap;s(P,kc);if(r()){return F(lc)}var l;try{h([Pb,gc],mc);h([Pb,Zb],nc);h([Pb,_b],oc);h([Pb,Nb],pc);h([Qb,Nb],pc);h([Pb,dc],qc);l=f[k(Mb)][k(Tb)];var m=l.indexOf(rc);if(m!=-1){g=parseInt(l.substring(m+X),Wb);l=l.substring(W,m)}}catch(a){}ru_cdev_xnext_frontend_Main.__softPermutationId=g;return F(l+sc)}
function H(){if(!p.__gwt_stylesLoaded){p.__gwt_stylesLoaded={}}function c(a){if(!__gwt_stylesLoaded[a]){var b=q.createElement(tc);b.setAttribute(uc,vc);b.setAttribute(wc,F(a));q.getElementsByTagName(qb)[W].appendChild(b);__gwt_stylesLoaded[a]=true}}
s(xc,Q);c(yc);s(xc,zc)}
C();ru_cdev_xnext_frontend_Main.__moduleBase=D();u[T].moduleBase=ru_cdev_xnext_frontend_Main.__moduleBase;var I=G();if(p){var J=!!(p.location.protocol==Ac||p.location.protocol==Bc);p.__gwt_activeModules[T].canRedirect=J;function K(){var b=Cc;try{p.sessionStorage.setItem(b,b);p.sessionStorage.removeItem(b);return true}catch(a){return false}}
if(J&&K()){var L=Dc;var M=p.sessionStorage[L];if(!/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?\/.*$/.test(M)){if(M&&(window.console&&console.log)){console.log(Ec+M)}M=cb}if(M&&!p[L]){p[L]=true;p[L+Fc]=D();var N=q.createElement(kb);N.src=M;var O=q.getElementsByTagName(qb)[W];O.insertBefore(N,O.firstElementChild||O.children[W]);return false}}}H();s(P,zc);B(I);return true}
ru_cdev_xnext_frontend_Main.succeeded=ru_cdev_xnext_frontend_Main();
		// ========================= NOCACHE END ===========================

		if (document.removeEventListener) {
			document.removeEventListener("DOMContentLoaded", ecwid_onBodyDone, false);
		}
		if (ecwid_onBodyDoneTimerId) {
			clearInterval(ecwid_onBodyDoneTimerId);
		}
    }
}

if (document.addEventListener) {
	document.addEventListener("DOMContentLoaded", function() {
		ecwid_onBodyDone();
	}, false);
}

// Fallback. If onBodyDone() gets fired twice, it's not a big deal.
var ecwid_onBodyDoneTimerId = setInterval(function() {
	if (/loaded|complete/.test(document.readyState)) {
		ecwid_onBodyDone();
	}
}, 50);

window.xnext_ownerId=9201175;
window.Ecwid.demo=false;
window.Ecwid.cssUrl="https://d3j0zfs7paavns.cloudfront.net/css/new?hc=-1687054147&ownerid=9201175";
window.Ecwid.acceptLanguage=["en","nl"];
window.Ecwid.appDomain="https://app.ecwid.com/";

window.Ecwid.getAppPublicConfig = function(namespace) {
    var publicData = {"ecwid-edit-orders":"{}"};
    var result = publicData[namespace];
    return typeof result === 'string' ? result : null;
}


function parseId(args) {
	var idPrefix = "id=";
	var id;
	for (var i=0; i<args.length; i++) {
		if (args[i].substr(0, idPrefix.length) == idPrefix) {
			id = args[i].substr(idPrefix.length);
		}
	}
	return id;
}

function parseStyle(args) {
	var stylePrefix = "style=";
	var style = "";
	for (var i=0; i<args.length; i++) {
		if (args[i].substr(0,stylePrefix.length) == stylePrefix) {
			var str = args[i].substr(stylePrefix.length);
			str = str.replace(/^ +\'?/,"").replace(/\'? +$/,"");
			if (str.substring(0,1)=="'") str = str.substring(1);
			if (str.substring(str.length-1)=="'") str = str.substring(0, str.length-1);
			style += str;
		}
	}
	return style;
}

function xAddWidget(widgetType, args) {

	args = Array.prototype.slice.call(args); // Cast Argument object into array

	var id = parseId(args);
	var style = parseStyle(args);

	var hashParams = window.location.hash.match(/.*\/(.*)$/);
	if (hashParams && hashParams.length > 1) {
		hashParams = hashParams[1].split('&');
		for (i = 0; i < hashParams.length; i++) {
			var hashParam = hashParams[i];
			var paramPrefix = '_x' + widgetType + '_';
			if (hashParam.indexOf(paramPrefix) != 0) {
				continue;
			}
			hashParam = hashParam.split('=');
			if (hashParam.length != 2) {
				continue;
			}
			var paramName = hashParam[0].replace(paramPrefix, '');
			var paramValue = decodeURIComponent(hashParam[1]);
			var replaceIndex = args.length;
			for (var j = 0; j < args.length; j++) {
				if (args[j].indexOf(paramName + '=') == 0) {
					replaceIndex = j;
					break;
				}
			}
			args[replaceIndex] = paramName + '=' + paramValue;
		}
	}

	if(id && document.getElementById(id)) {
		var e = document.getElementById(id);
		while(e.hasChildNodes()) e.removeChild(e.firstChild);
		e.setAttribute("style", style);
		try { e.style.cssText = style; } catch(ex) { } // IE
	} else {
		i=1;
		do {
			id = widgetType+"-"+i++;
		} while (document.getElementById(id));
		var html = "<div id='"+id+"'";
		if(style) {
			html += " style='"+style+"'";
		}
		html += "></div>";
		document.write(html);
	}
	var l = 0;
	if (!window._xnext_initialization_scripts) {
		window._xnext_initialization_scripts = [];
	} else {
		l = window._xnext_initialization_scripts.length;
	}
	window._xnext_initialization_scripts[l] = {widgetType:widgetType, id:id, arg:args};
    window.ecwid_dynamic_widgets && ecwid_onBodyDone();
}

function xProductBrowser() {
	ecwid_loader();
    window.ecwid_dynamic_widgets && Ecwid.destroy();
	xAddWidget("ProductBrowser", arguments);
}
function ecwid_loader() {
	if (!window.ecwid_loader_shown && ecwid_no_fb_iframe()) {
		if (!window.ecwid_use_custom_loading_indicator && !window.ecwid_script_defer) {
			document.write(
				'<style>' +
					'#ecwid_loading_indicator { width: 100%; height: 100%; min-height: 250px; position: relative; }' +
					'#ecwid_loading_indicator, #ecwid_loading_indicator * { box-sizing: content-box; -webkit-transform-origin: center center; -ms-transform-origin: center center; -o-transform-origin: center center; transform-origin: center center; }' +
					'#ecwid_loading_indicator .loader { width: 88px; height: 88px; margin-left: -57px; margin-top: -57px; position: absolute; left: 50%; top: 50%; padding: 13px; border-radius: 50%; }' +
					'#ecwid_loading_indicator.ecwid-preloading .loader { box-shadow: none; background-color: transparent; }' +
					'#ecwid_loading_indicator .loader .spinner-ball-outer {' +
						'width: 88px; height: 88px; position: static; top: 0; left: 0; -webkit-animation: ecwid-spinleft 1s infinite linear; animation: ecwid-spinleft 1s infinite linear; ' +
						"background: transparent url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cpath fill-rule='evenodd' fill='%231e7ec8' clip-rule='evenodd' d='M95 63.4v.2c0 .1-.1.2-.1.3-.3.6-1 1.1-1.7 1.1-1.1 0-1.9-.9-1.9-1.9 0-.4.1-.5.2-.8.1-.1.1-.2.1-.3 1.1-3.8 1.7-7.8 1.7-11.9 0-20.3-14-37.3-32.8-41.9h-.3c-.8-.2-1.7-.9-1.7-1.9 0-1.1.9-1.9 1.9-1.9h.2c.2 0 .3.1.5.1 20.6 5 36 23.5 36 45.7-.1 4.5-.8 9-2.1 13.2zM81.1 80l.3-.3c.4-.4.8-.8 1.6-.8 1.1 0 1.9.9 1.9 1.9 0 .4-.2.8-.4 1.2l-.3.3C75.6 91.3 63.5 97 50 97c-13.4 0-25.6-5.7-34.1-14.7-.5-.3-.8-.9-.8-1.5 0-1.1.9-1.9 1.9-1.9.8 0 1.4.5 1.6.8l.3.3c7.9 8.1 18.9 13.2 31.1 13.2 12.2 0 23.2-5.1 31.1-13.2zM39.8 8h-.2C20.8 12.7 6.8 29.7 6.8 50c0 4.1.6 8.2 1.7 11.9 0 0 .2.7.2 1.1 0 1.1-.9 1.9-1.9 1.9-.7 0-1.4-.4-1.7-1 0 0-.1-.3-.2-.5C3.7 59.1 3 54.7 3 50 3 27.9 18.3 9.4 38.8 4.4c.2-.1.4-.2.7-.2h.1c1.1 0 1.9.9 1.9 1.9 0 1.1-1 1.8-1.7 1.9z'/%3E%3C/svg%3E\") center center no-repeat; background-size: 88px auto; " +
					'}' +
					'#ecwid_loading_indicator .loader .spinner-ball-inner {' +
						'width: 40px; height: 40px; position: static; top: 0; left: 0; -webkit-animation: ecwid-spinright .5s infinite linear; animation: ecwid-spinright .5s infinite linear; margin: -64px auto 64px; ' +
						"background: transparent url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='44' height='44' viewBox='0 0 44 44'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' fill='%231e7ec8' d='M36.3 35.9c-.4.5-.9.8-1.5.8-1.1 0-2-.9-2-2 0-.6.3-1.1.6-1.4 2.9-3 4.6-6.9 4.6-11.3s-1.8-8.4-4.7-11.3c-.4-.4-.6-.8-.6-1.4 0-1.1.9-2 2-2 .7 0 1.3.4 1.6.9 3.4 3.6 5.5 8.4 5.5 13.8.1 5.4-2 10.3-5.5 13.9zM10.7 10.7C7.8 13.6 6 17.6 6 22s1.8 8.4 4.7 11.3c.3.3.5.8.5 1.3 0 1.1-.9 2-2 2-.7 0-1.3-.4-1.6-.9-3.4-3.5-5.5-8.4-5.5-13.7 0-5.5 2.2-10.5 5.8-14.1.3-.3.8-.6 1.4-.6 1.1 0 1.9.9 1.9 1.9 0 .7-.2 1.1-.5 1.5z'/%3E%3C/svg%3E\") center center no-repeat; background-size: 40px auto; " +
					'}' +
					'#ecwid_loading_indicator .loader img.loader-object { width: 100%; max-width: 1000px; min-width: 0; height: 100%; max-height: 1000px; min-height: 0; position: static; padding: 0; margin: 0; border: 0; box-shadow: none; background: transparent none; display: block; float: none; visibility: visible; opacity: 1; -webkit-transform: none; transform: none; -webkit-animation: none; animation: none; border-radius: 50%}' +
					'@keyframes ecwid-spinleft { 0% { transform: rotate(360deg); } 100% { transform: rotate(0deg); }}' +
					'@-webkit-keyframes ecwid-spinleft { 0% { -webkit-transform: rotate(360deg); } 100% { -webkit-transform: rotate(0deg); }}' +
					'@keyframes ecwid-spinright { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); }}' +
					'@-webkit-keyframes ecwid-spinright { 0% { -webkit-transform: rotate(0deg); } 100% { -webkit-transform: rotate(360deg); }}' +
				'</style>'
			);
			document.write(
				'<div id="ecwid_loading_indicator" class="ecwid-loadingIndicator ecwid-preloading">' +
					'<div class="loader loader-mixed">' +
						'<div class="spinner-ball-outer"></div>' +
						'<div class="spinner-ball-inner"></div>' +
					'</div>' +
				'</div>'
			);
		}
		window.ecwid_loader_shown = true;
	}
}
function xAddToBag() {
    xAddWidget("AddToBag", arguments);
}
function xProductThumbnail() {
    xAddWidget("ProductThumbnail", arguments);
}
function xLoginForm() {
	xAddWidget("LoginForm", arguments);
}
function xMinicart() {
	xAddWidget("Minicart", arguments);
}
function xCategories() {
	ecwid_loader();
	xAddWidget("Categories", arguments);
}
function xVCategories() {
	xAddWidget("VCategories", arguments);
}
function xCategoriesV2() {
	var args = Array.prototype.slice.call(arguments); // Cast Argument object into array
	var id = parseId(args);
	var script = '';
	if (id) {
		script += '<script type="text/javascript">var categoryContainerIDs = categoryContainerIDs || [];categoryContainerIDs.push("' + id + '");</script>';
	}
	script += '<script type="text/javascript" src="https://djqizrxa6f10j.cloudfront.net/horizontal-category-widget/v1.3/horizontal-widget.js"></script>';
	document.write(script);
}
function xSearchPanel() {
	xAddWidget("SearchPanel", arguments);
}
function xSearch() {
	xAddWidget("SearchWidget", arguments);
}
function xGadget() {
	xAddWidget("Gadget", arguments);
}
	
function xSingleProduct() {
	xAddWidget("SingleProduct", arguments)
}	
function xAffiliate(id) { Ecwid.affiliateId = id; }

if (typeof xInitialized == 'function') xInitialized();

if (!(window.ecwid_no_body_height && window.ecwid_no_body_height == true)) {
if (/MSIE .+Win/.test(navigator.userAgent)) {
  var clientHeight = document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight;
} else {
  var clientHeight = window.innerHeight-20;
}
document.body.style.minHeight = clientHeight+"px";
}
}


} catch (e) {
    function xReportError(msg) {
		var html = '<div style="font-family:sans-serif;"><div style="padding:30px 20px;max-width:500px;word-wrap: break-word;margin:0 auto;border-radius:5px;box-shadow:0 10px 35px rgba(0, 0, 0, 0.15);box-sizing:border-box;background-color:#fff;"><div style="font-size:15px;line-height:1.8em;margin:16px;">' + msg + '</div></div></div><br/>';

    	if (window.ecwid_script_defer) {
    	    var element = document.createElement("div");
    	    element.innerHTML = html;
    	    document.body.appendChild(element);
    	} else document.write(html);
    }

	var commonError = "The store cannot be loaded in your browser because of some JavaScript errors, sorry. Below here's the exact error occurred.";

	var bodyTagError = "This document doesn't contain the required " +
			"<a href='http://www.htmldog.com/reference/htmltags/body/'>&lt;body&gt; and &lt;/body&gt;</a> "+
            "tags. Thus your Ecwid store cannot be loaded. " +
            "Please add these tags and refresh the page. This message will disappear and you will see your store.";

	var isWindowsMobile2005 = /(msie 4).*(windows ce)/i.test(navigator.userAgent);

    if (!document.body && !isWindowsMobile2005)  {
        xReportError(bodyTagError);
	} else {
		xReportError(commonError + '<br/><br/>Error: <i>' + e.message + '</i>');
	}

	throw e;
}