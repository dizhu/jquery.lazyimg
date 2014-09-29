// Generated by CoffeeScript 1.6.2
var $;

$ = jQuery;

$.fn.extend({
  lazyimg: function(options) {
    var $imgs, $w, attrib, defaults, ie, lazyimg, onWindowScrollEvent, retina, th;

    defaults = {
      threshold: 100
    };
    options = $.extend({}, defaults, options);
    $w = $(window);
    th = options.threshold;
    retina = window.devicePixelRatio > 1;
    attrib = retina ? "data-src-retina" : "data-src";
    ie = typeof window.scrollY === "number" ? false : true;
    onWindowScrollEvent = function() {
      clearTimeout(window._lazyimg_delay);
      return window._lazyimg_delay = setTimeout(lazyimg, 150);
    };
    $imgs = $("img.lazy");
    lazyimg = function() {
      var inview, wb, wt;

      if (typeof console !== "undefined" && console !== null) {
        if (typeof console.time === "function") {
          console.time("lazyimg");
        }
      }
      if (typeof console !== "undefined" && console !== null) {
        if (typeof console.profile === "function") {
          console.profile("lazyimg");
        }
      }
      if (ie) {
        wt = $w.scrollTop();
        wb = wt + $w.height();
      } else {
        wt = window.scrollY;
        wb = wt + window.innerHeight;
      }
      inview = $imgs.filter(function() {
        var $e, eb, eh, et;

        $e = $(this);
        if (ie) {
          if ($e.attr("src") === $e.attr(attrib)) {
            return;
          }
          et = $e.offset().top;
          eh = $e.data("lazyheight");
        } else {
          if (this.getAttribute("src") === this.getAttribute(attrib)) {
            return;
          }
          et = $e.offset().top;
          eh = this.lazyheight;
        }
        if (!eh) {
          if (ie) {
            eh = $e.height();
            $e.data("lazyheight", eh);
          } else {
            eh = this.clientHeight;
            this.lazyheight = eh;
          }
        }
        eb = et + eh;
        return eb >= wt - th && et <= wb + th;
      });
      inview.each(function() {
        var $this, source;

        $this = $(this);
        source = ie ? $this.attr(attrib) : this.getAttribute(attrib);
        if (source) {
          if (ie) {
            return $this.attr("src", source);
          } else {
            return this.setAttribute("src", source);
          }
        }
      });
      if (typeof console !== "undefined" && console !== null) {
        if (typeof console.timeEnd === "function") {
          console.timeEnd("lazyimg");
        }
      }
      return typeof console !== "undefined" && console !== null ? typeof console.profileEnd === "function" ? console.profileEnd("lazyimg") : void 0 : void 0;
    };
    $w.off('scroll.lazyimg');
    $w.on('scroll.lazyimg', onWindowScrollEvent);
    return onWindowScrollEvent();
  }
});