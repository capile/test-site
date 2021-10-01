/*! Tecnodesign */
(function(){
    if(!('_tdz' in window)) window._tdz = {};

    function toggleBox()
    {
        var el=Z.get('.box', this), i=el.length;
        if(i==0) return false;
        while(i-- > 0) {
            if(el[i].className.search(/\binactive\b/)>-1) el[i].className = el[i].className.replace(/\s*\binactive\b/, '');
            else el[i].className += (el[i].className)?(' inactive'):('inactive');
        }
        delete(el);
        if(_toT) clearTimeout(_toT);
        _toT = setTimeout(topmostColor, 700);
        return true;
    }

    function dica(e)
    {
        var t=document.getElementById(this.getAttribute('href').substr(1));
        if(!t) return false;

        if(this.className.search(/\bativa\b/)>-1) { // apaga a dica
            this.className = t.className = 'dica';
            t.removeAttribute('style');
        } else {
            this.className = t.className = 'dica ativa';
            var ba=this.getBoundingClientRect(),bb=document.getElementById('body').getBoundingClientRect();
            t.setAttribute('style', 'top:'+(ba.top+ba.height-bb.top)+'px;left:'+(ba.left-bb.left)+'px;opacity:1');
        }
        e.stopPropagation();
        e.preventDefault()
        return false;
    }

    function init()
    {
        var h=Z.get('.heading'), hi=h.length;
        while(hi-- > 0) {
            if(toggleBox.call(h[hi])) Z.addEvent(h[hi], 'click', toggleBox);
        }
     
        h=Z.get('a.dica'), hi=h.length;
        while(hi-- > 0) {
            if(h[hi].getAttribute('href')) Z.addEvent(h[hi], 'click', dica);
        }

        Z.langw('#header');

        delete(h);
        delete(hi);
    }

    var _toColor = Z.get('*[data-color]'), _toT=0, _toL=0;

    function topmostColor()
    {
        var t=new Date().getTime();
        if(_toT) clearTimeout(_toT);
        if(_toL+200 < t) {
            _toL = t;
        } else {
            _toT = setTimeout(topmostColor, 100);
            return;
        }
        var i=0,r,o;
        while(i<_toColor.length) {
            o=_toColor[i];
            r=o.getBoundingClientRect();
            if(r && r.top>=0 && r.height>20) break;
            else o=null;
            i++;
        }
        var h=document.getElementsByTagName('html')[0];
        if(o) {
            var c=o.getAttribute('data-color');
            if(h.className!=c) h.className=c;
            c=null;
            o=null;
        } else {
            if(h.className) h.className='';
        }
        h=null;
        r=null;
    }

    if(_toColor.length>0) {
        window.onscroll=topmostColor;
        _toT = setTimeout(topmostColor, 1000);
    }

    Z.ready(init);
})();
