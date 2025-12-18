var Ar = Object.defineProperty;
var Mr = (t, e, n) => e in t ? Ar(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var C = (t, e, n) => Mr(t, typeof e != "symbol" ? e + "" : e, n);
const Sr = {
  graph: {
    palette: "Default",
    bgcolor: "#FFFFFF",
    orientation: "Horizontal",
    max: 0,
    min: 0,
    custompalette: [],
    opacity: 1,
    responsive: !0,
    align: "xMinYMin",
    meetOrSlice: "meet"
  },
  meta: {
    position: "#uv-div",
    caption: "",
    subcaption: "",
    hlabel: "",
    vlabel: "",
    hsublabel: "",
    vsublabel: "",
    isDownloadable: !1,
    downloadLabel: "Download"
  },
  dimension: {
    width: 400,
    height: 400
  },
  margin: {
    top: 50,
    bottom: 150,
    left: 100,
    right: 100
  },
  frame: {
    bgcolor: "#FFFFFF"
  },
  axis: {
    ticks: 8,
    subticks: 2,
    padding: 5,
    minor: -10,
    strokecolor: "#000000",
    fontfamily: "Arial",
    fontsize: "14",
    fontweight: "bold",
    showticks: !0,
    showsubticks: !0,
    showtext: !0,
    showhortext: !0,
    showvertext: !0,
    opacity: 0.1
  },
  label: {
    fontfamily: "Arial",
    fontsize: "11",
    fontweight: "normal",
    strokecolor: "#000000",
    showlabel: !0,
    precision: 2,
    prefix: "",
    suffix: "",
    formatter: void 0
  },
  tooltip: {
    show: !0,
    format: "%c [%l]: %v"
  },
  scale: {
    type: "linear",
    ordinality: 0.2
  },
  bar: {
    strokecolor: "none",
    fontfamily: "Arial",
    fontsize: "10",
    fontweight: "bold",
    textcolor: "#000"
  },
  line: {
    interpolation: "linear",
    showcircles: !0,
    circleradius: 3.5,
    circleopacity: 0.6,
    fontfamily: "Arial",
    fontsize: "10",
    fontweight: "bold",
    textcolor: "#000",
    strokewidth: 1.5,
    strokeopacity: 1
  },
  area: {
    interpolation: "cardinal",
    offset: "zero",
    opacity: 0.2
  },
  pie: {
    fontfamily: "Arial",
    fontsize: "14",
    fontweight: "normal",
    fontvariant: "small-caps",
    fontfill: "#FFFFFF",
    strokecolor: "#FFFFFF",
    strokewidth: 1
  },
  donut: {
    fontfamily: "Arial",
    fontsize: "14",
    fontweight: "normal",
    fontvariant: "small-caps",
    fontfill: "#000",
    factor: 0.4,
    strokecolor: "#FFFFFF",
    strokewidth: 1
  },
  caption: {
    fontfamily: "Arial",
    fontsize: "14",
    fontweight: "bold",
    fontvariant: "small-caps",
    textdecoration: "none",
    hovercolor: "#696969",
    strokecolor: "#0000FF",
    textanchor: "middle",
    cursor: "pointer"
  },
  subCaption: {
    fontfamily: "Arial",
    fontsize: "9",
    fontweight: "normal",
    fontvariant: "normal",
    textdecoration: "none",
    textanchor: "middle"
  },
  legend: {
    position: "bottom",
    fontfamily: "Arial",
    fontsize: "11",
    fontweight: "normal",
    color: "#000000",
    strokewidth: 0.15,
    textmargin: 15,
    symbolsize: 10,
    inactivecolor: "#DDD",
    legendstart: 0,
    legendtype: "categories",
    showlegends: !0
  },
  effects: {
    hovercolor: "#FF0000",
    strokecolor: "none",
    textcolor: "#000000",
    duration: 800,
    hover: 400,
    showhovertext: !1
  }
};
var pe = "http://www.w3.org/1999/xhtml";
const Ze = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: pe,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function jt(t) {
  var e = t += "", n = e.indexOf(":");
  return n >= 0 && (e = t.slice(0, n)) !== "xmlns" && (t = t.slice(n + 1)), Ze.hasOwnProperty(e) ? { space: Ze[e], local: t } : t;
}
function zr(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === pe && e.documentElement.namespaceURI === pe ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function Cr(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function Nn(t) {
  var e = jt(t);
  return (e.local ? Cr : zr)(e);
}
function Nr() {
}
function Ee(t) {
  return t == null ? Nr : function() {
    return this.querySelector(t);
  };
}
function Fr(t) {
  typeof t != "function" && (t = Ee(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var a = e[i], s = a.length, o = r[i] = new Array(s), c, l, u = 0; u < s; ++u)
      (c = a[u]) && (l = t.call(c, c.__data__, u, a)) && ("__data__" in c && (l.__data__ = c.__data__), o[u] = l);
  return new L(r, this._parents);
}
function Er(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function Dr() {
  return [];
}
function Fn(t) {
  return t == null ? Dr : function() {
    return this.querySelectorAll(t);
  };
}
function Rr(t) {
  return function() {
    return Er(t.apply(this, arguments));
  };
}
function Tr(t) {
  typeof t == "function" ? t = Rr(t) : t = Fn(t);
  for (var e = this._groups, n = e.length, r = [], i = [], a = 0; a < n; ++a)
    for (var s = e[a], o = s.length, c, l = 0; l < o; ++l)
      (c = s[l]) && (r.push(t.call(c, c.__data__, l, s)), i.push(c));
  return new L(r, i);
}
function En(t) {
  return function() {
    return this.matches(t);
  };
}
function Dn(t) {
  return function(e) {
    return e.matches(t);
  };
}
var Vr = Array.prototype.find;
function Hr(t) {
  return function() {
    return Vr.call(this.children, t);
  };
}
function Br() {
  return this.firstElementChild;
}
function Ir(t) {
  return this.select(t == null ? Br : Hr(typeof t == "function" ? t : Dn(t)));
}
var Pr = Array.prototype.filter;
function Lr() {
  return Array.from(this.children);
}
function Or(t) {
  return function() {
    return Pr.call(this.children, t);
  };
}
function qr(t) {
  return this.selectAll(t == null ? Lr : Or(typeof t == "function" ? t : Dn(t)));
}
function Xr(t) {
  typeof t != "function" && (t = En(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var a = e[i], s = a.length, o = r[i] = [], c, l = 0; l < s; ++l)
      (c = a[l]) && t.call(c, c.__data__, l, a) && o.push(c);
  return new L(r, this._parents);
}
function Rn(t) {
  return new Array(t.length);
}
function Yr() {
  return new L(this._enter || this._groups.map(Rn), this._parents);
}
function Ot(t, e) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
Ot.prototype = {
  constructor: Ot,
  appendChild: function(t) {
    return this._parent.insertBefore(t, this._next);
  },
  insertBefore: function(t, e) {
    return this._parent.insertBefore(t, e);
  },
  querySelector: function(t) {
    return this._parent.querySelector(t);
  },
  querySelectorAll: function(t) {
    return this._parent.querySelectorAll(t);
  }
};
function Gr(t) {
  return function() {
    return t;
  };
}
function Ur(t, e, n, r, i, a) {
  for (var s = 0, o, c = e.length, l = a.length; s < l; ++s)
    (o = e[s]) ? (o.__data__ = a[s], r[s] = o) : n[s] = new Ot(t, a[s]);
  for (; s < c; ++s)
    (o = e[s]) && (i[s] = o);
}
function Wr(t, e, n, r, i, a, s) {
  var o, c, l = /* @__PURE__ */ new Map(), u = e.length, h = a.length, f = new Array(u), g;
  for (o = 0; o < u; ++o)
    (c = e[o]) && (f[o] = g = s.call(c, c.__data__, o, e) + "", l.has(g) ? i[o] = c : l.set(g, c));
  for (o = 0; o < h; ++o)
    g = s.call(t, a[o], o, a) + "", (c = l.get(g)) ? (r[o] = c, c.__data__ = a[o], l.delete(g)) : n[o] = new Ot(t, a[o]);
  for (o = 0; o < u; ++o)
    (c = e[o]) && l.get(f[o]) === c && (i[o] = c);
}
function Zr(t) {
  return t.__data__;
}
function Kr(t, e) {
  if (!arguments.length) return Array.from(this, Zr);
  var n = e ? Wr : Ur, r = this._parents, i = this._groups;
  typeof t != "function" && (t = Gr(t));
  for (var a = i.length, s = new Array(a), o = new Array(a), c = new Array(a), l = 0; l < a; ++l) {
    var u = r[l], h = i[l], f = h.length, g = Jr(t.call(u, u && u.__data__, l, r)), d = g.length, p = o[l] = new Array(d), v = s[l] = new Array(d), m = c[l] = new Array(f);
    n(u, h, p, v, m, g, e);
    for (var $ = 0, _ = 0, A, k; $ < d; ++$)
      if (A = p[$]) {
        for ($ >= _ && (_ = $ + 1); !(k = v[_]) && ++_ < d; ) ;
        A._next = k || null;
      }
  }
  return s = new L(s, r), s._enter = o, s._exit = c, s;
}
function Jr(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function Qr() {
  return new L(this._exit || this._groups.map(Rn), this._parents);
}
function jr(t, e, n) {
  var r = this.enter(), i = this, a = this.exit();
  return typeof t == "function" ? (r = t(r), r && (r = r.selection())) : r = r.append(t + ""), e != null && (i = e(i), i && (i = i.selection())), n == null ? a.remove() : n(a), r && i ? r.merge(i).order() : i;
}
function ti(t) {
  for (var e = t.selection ? t.selection() : t, n = this._groups, r = e._groups, i = n.length, a = r.length, s = Math.min(i, a), o = new Array(i), c = 0; c < s; ++c)
    for (var l = n[c], u = r[c], h = l.length, f = o[c] = new Array(h), g, d = 0; d < h; ++d)
      (g = l[d] || u[d]) && (f[d] = g);
  for (; c < i; ++c)
    o[c] = n[c];
  return new L(o, this._parents);
}
function ei() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var r = t[e], i = r.length - 1, a = r[i], s; --i >= 0; )
      (s = r[i]) && (a && s.compareDocumentPosition(a) ^ 4 && a.parentNode.insertBefore(s, a), a = s);
  return this;
}
function ni(t) {
  t || (t = ri);
  function e(h, f) {
    return h && f ? t(h.__data__, f.__data__) : !h - !f;
  }
  for (var n = this._groups, r = n.length, i = new Array(r), a = 0; a < r; ++a) {
    for (var s = n[a], o = s.length, c = i[a] = new Array(o), l, u = 0; u < o; ++u)
      (l = s[u]) && (c[u] = l);
    c.sort(e);
  }
  return new L(i, this._parents).order();
}
function ri(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function ii() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function ai() {
  return Array.from(this);
}
function si() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, a = r.length; i < a; ++i) {
      var s = r[i];
      if (s) return s;
    }
  return null;
}
function oi() {
  let t = 0;
  for (const e of this) ++t;
  return t;
}
function li() {
  return !this.node();
}
function ci(t) {
  for (var e = this._groups, n = 0, r = e.length; n < r; ++n)
    for (var i = e[n], a = 0, s = i.length, o; a < s; ++a)
      (o = i[a]) && t.call(o, o.__data__, a, i);
  return this;
}
function ui(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function fi(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function hi(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function gi(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function di(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttribute(t) : this.setAttribute(t, n);
  };
}
function pi(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n);
  };
}
function yi(t, e) {
  var n = jt(t);
  if (arguments.length < 2) {
    var r = this.node();
    return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
  }
  return this.each((e == null ? n.local ? fi : ui : typeof e == "function" ? n.local ? pi : di : n.local ? gi : hi)(n, e));
}
function Tn(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function mi(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function xi(t, e, n) {
  return function() {
    this.style.setProperty(t, e, n);
  };
}
function wi(t, e, n) {
  return function() {
    var r = e.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, n);
  };
}
function vi(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? mi : typeof e == "function" ? wi : xi)(t, e, n ?? "")) : dt(this.node(), t);
}
function dt(t, e) {
  return t.style.getPropertyValue(e) || Tn(t).getComputedStyle(t, null).getPropertyValue(e);
}
function bi(t) {
  return function() {
    delete this[t];
  };
}
function _i(t, e) {
  return function() {
    this[t] = e;
  };
}
function ki(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : this[t] = n;
  };
}
function $i(t, e) {
  return arguments.length > 1 ? this.each((e == null ? bi : typeof e == "function" ? ki : _i)(t, e)) : this.node()[t];
}
function Vn(t) {
  return t.trim().split(/^|\s+/);
}
function De(t) {
  return t.classList || new Hn(t);
}
function Hn(t) {
  this._node = t, this._names = Vn(t.getAttribute("class") || "");
}
Hn.prototype = {
  add: function(t) {
    var e = this._names.indexOf(t);
    e < 0 && (this._names.push(t), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function(t) {
    var e = this._names.indexOf(t);
    e >= 0 && (this._names.splice(e, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function(t) {
    return this._names.indexOf(t) >= 0;
  }
};
function Bn(t, e) {
  for (var n = De(t), r = -1, i = e.length; ++r < i; ) n.add(e[r]);
}
function In(t, e) {
  for (var n = De(t), r = -1, i = e.length; ++r < i; ) n.remove(e[r]);
}
function Ai(t) {
  return function() {
    Bn(this, t);
  };
}
function Mi(t) {
  return function() {
    In(this, t);
  };
}
function Si(t, e) {
  return function() {
    (e.apply(this, arguments) ? Bn : In)(this, t);
  };
}
function zi(t, e) {
  var n = Vn(t + "");
  if (arguments.length < 2) {
    for (var r = De(this.node()), i = -1, a = n.length; ++i < a; ) if (!r.contains(n[i])) return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? Si : e ? Ai : Mi)(n, e));
}
function Ci() {
  this.textContent = "";
}
function Ni(t) {
  return function() {
    this.textContent = t;
  };
}
function Fi(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function Ei(t) {
  return arguments.length ? this.each(t == null ? Ci : (typeof t == "function" ? Fi : Ni)(t)) : this.node().textContent;
}
function Di() {
  this.innerHTML = "";
}
function Ri(t) {
  return function() {
    this.innerHTML = t;
  };
}
function Ti(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function Vi(t) {
  return arguments.length ? this.each(t == null ? Di : (typeof t == "function" ? Ti : Ri)(t)) : this.node().innerHTML;
}
function Hi() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Bi() {
  return this.each(Hi);
}
function Ii() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Pi() {
  return this.each(Ii);
}
function Li(t) {
  var e = typeof t == "function" ? t : Nn(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function Oi() {
  return null;
}
function qi(t, e) {
  var n = typeof t == "function" ? t : Nn(t), r = e == null ? Oi : typeof e == "function" ? e : Ee(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function Xi() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function Yi() {
  return this.each(Xi);
}
function Gi() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Ui() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Wi(t) {
  return this.select(t ? Ui : Gi);
}
function Zi(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function Ki(t) {
  return function(e) {
    t.call(this, e, this.__data__);
  };
}
function Ji(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var n = "", r = e.indexOf(".");
    return r >= 0 && (n = e.slice(r + 1), e = e.slice(0, r)), { type: e, name: n };
  });
}
function Qi(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var n = 0, r = -1, i = e.length, a; n < i; ++n)
        a = e[n], (!t.type || a.type === t.type) && a.name === t.name ? this.removeEventListener(a.type, a.listener, a.options) : e[++r] = a;
      ++r ? e.length = r : delete this.__on;
    }
  };
}
function ji(t, e, n) {
  return function() {
    var r = this.__on, i, a = Ki(e);
    if (r) {
      for (var s = 0, o = r.length; s < o; ++s)
        if ((i = r[s]).type === t.type && i.name === t.name) {
          this.removeEventListener(i.type, i.listener, i.options), this.addEventListener(i.type, i.listener = a, i.options = n), i.value = e;
          return;
        }
    }
    this.addEventListener(t.type, a, n), i = { type: t.type, name: t.name, value: e, listener: a, options: n }, r ? r.push(i) : this.__on = [i];
  };
}
function ta(t, e, n) {
  var r = Ji(t + ""), i, a = r.length, s;
  if (arguments.length < 2) {
    var o = this.node().__on;
    if (o) {
      for (var c = 0, l = o.length, u; c < l; ++c)
        for (i = 0, u = o[c]; i < a; ++i)
          if ((s = r[i]).type === u.type && s.name === u.name)
            return u.value;
    }
    return;
  }
  for (o = e ? ji : Qi, i = 0; i < a; ++i) this.each(o(r[i], e, n));
  return this;
}
function Pn(t, e, n) {
  var r = Tn(t), i = r.CustomEvent;
  typeof i == "function" ? i = new i(e, n) : (i = r.document.createEvent("Event"), n ? (i.initEvent(e, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(e, !1, !1)), t.dispatchEvent(i);
}
function ea(t, e) {
  return function() {
    return Pn(this, t, e);
  };
}
function na(t, e) {
  return function() {
    return Pn(this, t, e.apply(this, arguments));
  };
}
function ra(t, e) {
  return this.each((typeof e == "function" ? na : ea)(t, e));
}
function* ia() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, a = r.length, s; i < a; ++i)
      (s = r[i]) && (yield s);
}
var Ln = [null];
function L(t, e) {
  this._groups = t, this._parents = e;
}
function St() {
  return new L([[document.documentElement]], Ln);
}
function aa() {
  return this;
}
L.prototype = St.prototype = {
  constructor: L,
  select: Fr,
  selectAll: Tr,
  selectChild: Ir,
  selectChildren: qr,
  filter: Xr,
  data: Kr,
  enter: Yr,
  exit: Qr,
  join: jr,
  merge: ti,
  selection: aa,
  order: ei,
  sort: ni,
  call: ii,
  nodes: ai,
  node: si,
  size: oi,
  empty: li,
  each: ci,
  attr: yi,
  style: vi,
  property: $i,
  classed: zi,
  text: Ei,
  html: Vi,
  raise: Bi,
  lower: Pi,
  append: Li,
  insert: qi,
  remove: Yi,
  clone: Wi,
  datum: Zi,
  on: ta,
  dispatch: ra,
  [Symbol.iterator]: ia
};
function sa(t) {
  return typeof t == "string" ? new L([[document.querySelector(t)]], [document.documentElement]) : new L([[t]], Ln);
}
function Ht(t, e) {
  return t == null || e == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function oa(t, e) {
  return t == null || e == null ? NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function On(t) {
  let e, n, r;
  t.length !== 2 ? (e = Ht, n = (o, c) => Ht(t(o), c), r = (o, c) => t(o) - c) : (e = t === Ht || t === oa ? t : la, n = t, r = t);
  function i(o, c, l = 0, u = o.length) {
    if (l < u) {
      if (e(c, c) !== 0) return u;
      do {
        const h = l + u >>> 1;
        n(o[h], c) < 0 ? l = h + 1 : u = h;
      } while (l < u);
    }
    return l;
  }
  function a(o, c, l = 0, u = o.length) {
    if (l < u) {
      if (e(c, c) !== 0) return u;
      do {
        const h = l + u >>> 1;
        n(o[h], c) <= 0 ? l = h + 1 : u = h;
      } while (l < u);
    }
    return l;
  }
  function s(o, c, l = 0, u = o.length) {
    const h = i(o, c, l, u - 1);
    return h > l && r(o[h - 1], c) > -r(o[h], c) ? h - 1 : h;
  }
  return { left: i, center: s, right: a };
}
function la() {
  return 0;
}
function ca(t) {
  return t === null ? NaN : +t;
}
const ua = On(Ht), fa = ua.right;
On(ca).center;
class Ke extends Map {
  constructor(e, n = da) {
    if (super(), Object.defineProperties(this, { _intern: { value: /* @__PURE__ */ new Map() }, _key: { value: n } }), e != null) for (const [r, i] of e) this.set(r, i);
  }
  get(e) {
    return super.get(Je(this, e));
  }
  has(e) {
    return super.has(Je(this, e));
  }
  set(e, n) {
    return super.set(ha(this, e), n);
  }
  delete(e) {
    return super.delete(ga(this, e));
  }
}
function Je({ _intern: t, _key: e }, n) {
  const r = e(n);
  return t.has(r) ? t.get(r) : n;
}
function ha({ _intern: t, _key: e }, n) {
  const r = e(n);
  return t.has(r) ? t.get(r) : (t.set(r, n), n);
}
function ga({ _intern: t, _key: e }, n) {
  const r = e(n);
  return t.has(r) && (n = t.get(r), t.delete(r)), n;
}
function da(t) {
  return t !== null && typeof t == "object" ? t.valueOf() : t;
}
const pa = Math.sqrt(50), ya = Math.sqrt(10), ma = Math.sqrt(2);
function qt(t, e, n) {
  const r = (e - t) / Math.max(0, n), i = Math.floor(Math.log10(r)), a = r / Math.pow(10, i), s = a >= pa ? 10 : a >= ya ? 5 : a >= ma ? 2 : 1;
  let o, c, l;
  return i < 0 ? (l = Math.pow(10, -i) / s, o = Math.round(t * l), c = Math.round(e * l), o / l < t && ++o, c / l > e && --c, l = -l) : (l = Math.pow(10, i) * s, o = Math.round(t / l), c = Math.round(e / l), o * l < t && ++o, c * l > e && --c), c < o && 0.5 <= n && n < 2 ? qt(t, e, n * 2) : [o, c, l];
}
function ye(t, e, n) {
  if (e = +e, t = +t, n = +n, !(n > 0)) return [];
  if (t === e) return [t];
  const r = e < t, [i, a, s] = r ? qt(e, t, n) : qt(t, e, n);
  if (!(a >= i)) return [];
  const o = a - i + 1, c = new Array(o);
  if (r)
    if (s < 0) for (let l = 0; l < o; ++l) c[l] = (a - l) / -s;
    else for (let l = 0; l < o; ++l) c[l] = (a - l) * s;
  else if (s < 0) for (let l = 0; l < o; ++l) c[l] = (i + l) / -s;
  else for (let l = 0; l < o; ++l) c[l] = (i + l) * s;
  return c;
}
function me(t, e, n) {
  return e = +e, t = +t, n = +n, qt(t, e, n)[2];
}
function xa(t, e, n) {
  e = +e, t = +t, n = +n;
  const r = e < t, i = r ? me(e, t, n) : me(t, e, n);
  return (r ? -1 : 1) * (i < 0 ? 1 / -i : i);
}
function wa(t, e, n) {
  t = +t, e = +e, n = (i = arguments.length) < 2 ? (e = t, t = 0, 1) : i < 3 ? 1 : +n;
  for (var r = -1, i = Math.max(0, Math.ceil((e - t) / n)) | 0, a = new Array(i); ++r < i; )
    a[r] = t + r * n;
  return a;
}
function te(t, e) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(t);
      break;
    default:
      this.range(e).domain(t);
      break;
  }
  return this;
}
const Qe = Symbol("implicit");
function qn() {
  var t = new Ke(), e = [], n = [], r = Qe;
  function i(a) {
    let s = t.get(a);
    if (s === void 0) {
      if (r !== Qe) return r;
      t.set(a, s = e.push(a) - 1);
    }
    return n[s % n.length];
  }
  return i.domain = function(a) {
    if (!arguments.length) return e.slice();
    e = [], t = new Ke();
    for (const s of a)
      t.has(s) || t.set(s, e.push(s) - 1);
    return i;
  }, i.range = function(a) {
    return arguments.length ? (n = Array.from(a), i) : n.slice();
  }, i.unknown = function(a) {
    return arguments.length ? (r = a, i) : r;
  }, i.copy = function() {
    return qn(e, n).unknown(r);
  }, te.apply(i, arguments), i;
}
function xe() {
  var t = qn().unknown(void 0), e = t.domain, n = t.range, r = 0, i = 1, a, s, o = !1, c = 0, l = 0, u = 0.5;
  delete t.unknown;
  function h() {
    var f = e().length, g = i < r, d = g ? i : r, p = g ? r : i;
    a = (p - d) / Math.max(1, f - c + l * 2), o && (a = Math.floor(a)), d += (p - d - a * (f - c)) * u, s = a * (1 - c), o && (d = Math.round(d), s = Math.round(s));
    var v = wa(f).map(function(m) {
      return d + a * m;
    });
    return n(g ? v.reverse() : v);
  }
  return t.domain = function(f) {
    return arguments.length ? (e(f), h()) : e();
  }, t.range = function(f) {
    return arguments.length ? ([r, i] = f, r = +r, i = +i, h()) : [r, i];
  }, t.rangeRound = function(f) {
    return [r, i] = f, r = +r, i = +i, o = !0, h();
  }, t.bandwidth = function() {
    return s;
  }, t.step = function() {
    return a;
  }, t.round = function(f) {
    return arguments.length ? (o = !!f, h()) : o;
  }, t.padding = function(f) {
    return arguments.length ? (c = Math.min(1, l = +f), h()) : c;
  }, t.paddingInner = function(f) {
    return arguments.length ? (c = Math.min(1, f), h()) : c;
  }, t.paddingOuter = function(f) {
    return arguments.length ? (l = +f, h()) : l;
  }, t.align = function(f) {
    return arguments.length ? (u = Math.max(0, Math.min(1, f)), h()) : u;
  }, t.copy = function() {
    return xe(e(), [r, i]).round(o).paddingInner(c).paddingOuter(l).align(u);
  }, te.apply(h(), arguments);
}
function Re(t, e, n) {
  t.prototype = e.prototype = n, n.constructor = t;
}
function Xn(t, e) {
  var n = Object.create(t.prototype);
  for (var r in e) n[r] = e[r];
  return n;
}
function zt() {
}
var _t = 0.7, Xt = 1 / _t, gt = "\\s*([+-]?\\d+)\\s*", kt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", K = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", va = /^#([0-9a-f]{3,8})$/, ba = new RegExp(`^rgb\\(${gt},${gt},${gt}\\)$`), _a = new RegExp(`^rgb\\(${K},${K},${K}\\)$`), ka = new RegExp(`^rgba\\(${gt},${gt},${gt},${kt}\\)$`), $a = new RegExp(`^rgba\\(${K},${K},${K},${kt}\\)$`), Aa = new RegExp(`^hsl\\(${kt},${K},${K}\\)$`), Ma = new RegExp(`^hsla\\(${kt},${K},${K},${kt}\\)$`), je = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
Re(zt, lt, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: tn,
  // Deprecated! Use color.formatHex.
  formatHex: tn,
  formatHex8: Sa,
  formatHsl: za,
  formatRgb: en,
  toString: en
});
function tn() {
  return this.rgb().formatHex();
}
function Sa() {
  return this.rgb().formatHex8();
}
function za() {
  return Yn(this).formatHsl();
}
function en() {
  return this.rgb().formatRgb();
}
function lt(t) {
  var e, n;
  return t = (t + "").trim().toLowerCase(), (e = va.exec(t)) ? (n = e[1].length, e = parseInt(e[1], 16), n === 6 ? nn(e) : n === 3 ? new P(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : n === 8 ? Et(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : n === 4 ? Et(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = ba.exec(t)) ? new P(e[1], e[2], e[3], 1) : (e = _a.exec(t)) ? new P(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = ka.exec(t)) ? Et(e[1], e[2], e[3], e[4]) : (e = $a.exec(t)) ? Et(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = Aa.exec(t)) ? sn(e[1], e[2] / 100, e[3] / 100, 1) : (e = Ma.exec(t)) ? sn(e[1], e[2] / 100, e[3] / 100, e[4]) : je.hasOwnProperty(t) ? nn(je[t]) : t === "transparent" ? new P(NaN, NaN, NaN, 0) : null;
}
function nn(t) {
  return new P(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function Et(t, e, n, r) {
  return r <= 0 && (t = e = n = NaN), new P(t, e, n, r);
}
function Ca(t) {
  return t instanceof zt || (t = lt(t)), t ? (t = t.rgb(), new P(t.r, t.g, t.b, t.opacity)) : new P();
}
function we(t, e, n, r) {
  return arguments.length === 1 ? Ca(t) : new P(t, e, n, r ?? 1);
}
function P(t, e, n, r) {
  this.r = +t, this.g = +e, this.b = +n, this.opacity = +r;
}
Re(P, we, Xn(zt, {
  brighter(t) {
    return t = t == null ? Xt : Math.pow(Xt, t), new P(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? _t : Math.pow(_t, t), new P(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new P(ot(this.r), ot(this.g), ot(this.b), Yt(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: rn,
  // Deprecated! Use color.formatHex.
  formatHex: rn,
  formatHex8: Na,
  formatRgb: an,
  toString: an
}));
function rn() {
  return `#${st(this.r)}${st(this.g)}${st(this.b)}`;
}
function Na() {
  return `#${st(this.r)}${st(this.g)}${st(this.b)}${st((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function an() {
  const t = Yt(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${ot(this.r)}, ${ot(this.g)}, ${ot(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function Yt(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function ot(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function st(t) {
  return t = ot(t), (t < 16 ? "0" : "") + t.toString(16);
}
function sn(t, e, n, r) {
  return r <= 0 ? t = e = n = NaN : n <= 0 || n >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new G(t, e, n, r);
}
function Yn(t) {
  if (t instanceof G) return new G(t.h, t.s, t.l, t.opacity);
  if (t instanceof zt || (t = lt(t)), !t) return new G();
  if (t instanceof G) return t;
  t = t.rgb();
  var e = t.r / 255, n = t.g / 255, r = t.b / 255, i = Math.min(e, n, r), a = Math.max(e, n, r), s = NaN, o = a - i, c = (a + i) / 2;
  return o ? (e === a ? s = (n - r) / o + (n < r) * 6 : n === a ? s = (r - e) / o + 2 : s = (e - n) / o + 4, o /= c < 0.5 ? a + i : 2 - a - i, s *= 60) : o = c > 0 && c < 1 ? 0 : s, new G(s, o, c, t.opacity);
}
function Fa(t, e, n, r) {
  return arguments.length === 1 ? Yn(t) : new G(t, e, n, r ?? 1);
}
function G(t, e, n, r) {
  this.h = +t, this.s = +e, this.l = +n, this.opacity = +r;
}
Re(G, Fa, Xn(zt, {
  brighter(t) {
    return t = t == null ? Xt : Math.pow(Xt, t), new G(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? _t : Math.pow(_t, t), new G(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, n = this.l, r = n + (n < 0.5 ? n : 1 - n) * e, i = 2 * n - r;
    return new P(
      ue(t >= 240 ? t - 240 : t + 120, i, r),
      ue(t, i, r),
      ue(t < 120 ? t + 240 : t - 120, i, r),
      this.opacity
    );
  },
  clamp() {
    return new G(on(this.h), Dt(this.s), Dt(this.l), Yt(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = Yt(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${on(this.h)}, ${Dt(this.s) * 100}%, ${Dt(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function on(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function Dt(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function ue(t, e, n) {
  return (t < 60 ? e + (n - e) * t / 60 : t < 180 ? n : t < 240 ? e + (n - e) * (240 - t) / 60 : e) * 255;
}
const Te = (t) => () => t;
function Ea(t, e) {
  return function(n) {
    return t + n * e;
  };
}
function Da(t, e, n) {
  return t = Math.pow(t, n), e = Math.pow(e, n) - t, n = 1 / n, function(r) {
    return Math.pow(t + r * e, n);
  };
}
function Ra(t) {
  return (t = +t) == 1 ? Gn : function(e, n) {
    return n - e ? Da(e, n, t) : Te(isNaN(e) ? n : e);
  };
}
function Gn(t, e) {
  var n = e - t;
  return n ? Ea(t, n) : Te(isNaN(t) ? e : t);
}
const Gt = function t(e) {
  var n = Ra(e);
  function r(i, a) {
    var s = n((i = we(i)).r, (a = we(a)).r), o = n(i.g, a.g), c = n(i.b, a.b), l = Gn(i.opacity, a.opacity);
    return function(u) {
      return i.r = s(u), i.g = o(u), i.b = c(u), i.opacity = l(u), i + "";
    };
  }
  return r.gamma = t, r;
}(1);
function Ta(t, e) {
  e || (e = []);
  var n = t ? Math.min(e.length, t.length) : 0, r = e.slice(), i;
  return function(a) {
    for (i = 0; i < n; ++i) r[i] = t[i] * (1 - a) + e[i] * a;
    return r;
  };
}
function Va(t) {
  return ArrayBuffer.isView(t) && !(t instanceof DataView);
}
function Ha(t, e) {
  var n = e ? e.length : 0, r = t ? Math.min(n, t.length) : 0, i = new Array(r), a = new Array(n), s;
  for (s = 0; s < r; ++s) i[s] = Ve(t[s], e[s]);
  for (; s < n; ++s) a[s] = e[s];
  return function(o) {
    for (s = 0; s < r; ++s) a[s] = i[s](o);
    return a;
  };
}
function Ba(t, e) {
  var n = /* @__PURE__ */ new Date();
  return t = +t, e = +e, function(r) {
    return n.setTime(t * (1 - r) + e * r), n;
  };
}
function Y(t, e) {
  return t = +t, e = +e, function(n) {
    return t * (1 - n) + e * n;
  };
}
function Ia(t, e) {
  var n = {}, r = {}, i;
  (t === null || typeof t != "object") && (t = {}), (e === null || typeof e != "object") && (e = {});
  for (i in e)
    i in t ? n[i] = Ve(t[i], e[i]) : r[i] = e[i];
  return function(a) {
    for (i in n) r[i] = n[i](a);
    return r;
  };
}
var ve = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, fe = new RegExp(ve.source, "g");
function Pa(t) {
  return function() {
    return t;
  };
}
function La(t) {
  return function(e) {
    return t(e) + "";
  };
}
function Un(t, e) {
  var n = ve.lastIndex = fe.lastIndex = 0, r, i, a, s = -1, o = [], c = [];
  for (t = t + "", e = e + ""; (r = ve.exec(t)) && (i = fe.exec(e)); )
    (a = i.index) > n && (a = e.slice(n, a), o[s] ? o[s] += a : o[++s] = a), (r = r[0]) === (i = i[0]) ? o[s] ? o[s] += i : o[++s] = i : (o[++s] = null, c.push({ i: s, x: Y(r, i) })), n = fe.lastIndex;
  return n < e.length && (a = e.slice(n), o[s] ? o[s] += a : o[++s] = a), o.length < 2 ? c[0] ? La(c[0].x) : Pa(e) : (e = c.length, function(l) {
    for (var u = 0, h; u < e; ++u) o[(h = c[u]).i] = h.x(l);
    return o.join("");
  });
}
function Ve(t, e) {
  var n = typeof e, r;
  return e == null || n === "boolean" ? Te(e) : (n === "number" ? Y : n === "string" ? (r = lt(e)) ? (e = r, Gt) : Un : e instanceof lt ? Gt : e instanceof Date ? Ba : Va(e) ? Ta : Array.isArray(e) ? Ha : typeof e.valueOf != "function" && typeof e.toString != "function" || isNaN(e) ? Ia : Y)(t, e);
}
function Oa(t, e) {
  return t = +t, e = +e, function(n) {
    return Math.round(t * (1 - n) + e * n);
  };
}
var ln = 180 / Math.PI, be = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Wn(t, e, n, r, i, a) {
  var s, o, c;
  return (s = Math.sqrt(t * t + e * e)) && (t /= s, e /= s), (c = t * n + e * r) && (n -= t * c, r -= e * c), (o = Math.sqrt(n * n + r * r)) && (n /= o, r /= o, c /= o), t * r < e * n && (t = -t, e = -e, c = -c, s = -s), {
    translateX: i,
    translateY: a,
    rotate: Math.atan2(e, t) * ln,
    skewX: Math.atan(c) * ln,
    scaleX: s,
    scaleY: o
  };
}
var Rt;
function qa(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? be : Wn(e.a, e.b, e.c, e.d, e.e, e.f);
}
function Xa(t) {
  return t == null || (Rt || (Rt = document.createElementNS("http://www.w3.org/2000/svg", "g")), Rt.setAttribute("transform", t), !(t = Rt.transform.baseVal.consolidate())) ? be : (t = t.matrix, Wn(t.a, t.b, t.c, t.d, t.e, t.f));
}
function Zn(t, e, n, r) {
  function i(l) {
    return l.length ? l.pop() + " " : "";
  }
  function a(l, u, h, f, g, d) {
    if (l !== h || u !== f) {
      var p = g.push("translate(", null, e, null, n);
      d.push({ i: p - 4, x: Y(l, h) }, { i: p - 2, x: Y(u, f) });
    } else (h || f) && g.push("translate(" + h + e + f + n);
  }
  function s(l, u, h, f) {
    l !== u ? (l - u > 180 ? u += 360 : u - l > 180 && (l += 360), f.push({ i: h.push(i(h) + "rotate(", null, r) - 2, x: Y(l, u) })) : u && h.push(i(h) + "rotate(" + u + r);
  }
  function o(l, u, h, f) {
    l !== u ? f.push({ i: h.push(i(h) + "skewX(", null, r) - 2, x: Y(l, u) }) : u && h.push(i(h) + "skewX(" + u + r);
  }
  function c(l, u, h, f, g, d) {
    if (l !== h || u !== f) {
      var p = g.push(i(g) + "scale(", null, ",", null, ")");
      d.push({ i: p - 4, x: Y(l, h) }, { i: p - 2, x: Y(u, f) });
    } else (h !== 1 || f !== 1) && g.push(i(g) + "scale(" + h + "," + f + ")");
  }
  return function(l, u) {
    var h = [], f = [];
    return l = t(l), u = t(u), a(l.translateX, l.translateY, u.translateX, u.translateY, h, f), s(l.rotate, u.rotate, h, f), o(l.skewX, u.skewX, h, f), c(l.scaleX, l.scaleY, u.scaleX, u.scaleY, h, f), l = u = null, function(g) {
      for (var d = -1, p = f.length, v; ++d < p; ) h[(v = f[d]).i] = v.x(g);
      return h.join("");
    };
  };
}
var Ya = Zn(qa, "px, ", "px)", "deg)"), Ga = Zn(Xa, ", ", ")", ")");
function Ua(t) {
  return function() {
    return t;
  };
}
function Wa(t) {
  return +t;
}
var cn = [0, 1];
function ft(t) {
  return t;
}
function _e(t, e) {
  return (e -= t = +t) ? function(n) {
    return (n - t) / e;
  } : Ua(isNaN(e) ? NaN : 0.5);
}
function Za(t, e) {
  var n;
  return t > e && (n = t, t = e, e = n), function(r) {
    return Math.max(t, Math.min(e, r));
  };
}
function Ka(t, e, n) {
  var r = t[0], i = t[1], a = e[0], s = e[1];
  return i < r ? (r = _e(i, r), a = n(s, a)) : (r = _e(r, i), a = n(a, s)), function(o) {
    return a(r(o));
  };
}
function Ja(t, e, n) {
  var r = Math.min(t.length, e.length) - 1, i = new Array(r), a = new Array(r), s = -1;
  for (t[r] < t[0] && (t = t.slice().reverse(), e = e.slice().reverse()); ++s < r; )
    i[s] = _e(t[s], t[s + 1]), a[s] = n(e[s], e[s + 1]);
  return function(o) {
    var c = fa(t, o, 1, r) - 1;
    return a[c](i[c](o));
  };
}
function Kn(t, e) {
  return e.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp()).unknown(t.unknown());
}
function Jn() {
  var t = cn, e = cn, n = Ve, r, i, a, s = ft, o, c, l;
  function u() {
    var f = Math.min(t.length, e.length);
    return s !== ft && (s = Za(t[0], t[f - 1])), o = f > 2 ? Ja : Ka, c = l = null, h;
  }
  function h(f) {
    return f == null || isNaN(f = +f) ? a : (c || (c = o(t.map(r), e, n)))(r(s(f)));
  }
  return h.invert = function(f) {
    return s(i((l || (l = o(e, t.map(r), Y)))(f)));
  }, h.domain = function(f) {
    return arguments.length ? (t = Array.from(f, Wa), u()) : t.slice();
  }, h.range = function(f) {
    return arguments.length ? (e = Array.from(f), u()) : e.slice();
  }, h.rangeRound = function(f) {
    return e = Array.from(f), n = Oa, u();
  }, h.clamp = function(f) {
    return arguments.length ? (s = f ? !0 : ft, u()) : s !== ft;
  }, h.interpolate = function(f) {
    return arguments.length ? (n = f, u()) : n;
  }, h.unknown = function(f) {
    return arguments.length ? (a = f, h) : a;
  }, function(f, g) {
    return r = f, i = g, u();
  };
}
function Qa() {
  return Jn()(ft, ft);
}
function ja(t) {
  return Math.abs(t = Math.round(t)) >= 1e21 ? t.toLocaleString("en").replace(/,/g, "") : t.toString(10);
}
function Ut(t, e) {
  if ((n = (t = e ? t.toExponential(e - 1) : t.toExponential()).indexOf("e")) < 0) return null;
  var n, r = t.slice(0, n);
  return [
    r.length > 1 ? r[0] + r.slice(2) : r,
    +t.slice(n + 1)
  ];
}
function pt(t) {
  return t = Ut(Math.abs(t)), t ? t[1] : NaN;
}
function ts(t, e) {
  return function(n, r) {
    for (var i = n.length, a = [], s = 0, o = t[0], c = 0; i > 0 && o > 0 && (c + o + 1 > r && (o = Math.max(1, r - c)), a.push(n.substring(i -= o, i + o)), !((c += o + 1) > r)); )
      o = t[s = (s + 1) % t.length];
    return a.reverse().join(e);
  };
}
function es(t) {
  return function(e) {
    return e.replace(/[0-9]/g, function(n) {
      return t[+n];
    });
  };
}
var ns = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function $t(t) {
  if (!(e = ns.exec(t))) throw new Error("invalid format: " + t);
  var e;
  return new He({
    fill: e[1],
    align: e[2],
    sign: e[3],
    symbol: e[4],
    zero: e[5],
    width: e[6],
    comma: e[7],
    precision: e[8] && e[8].slice(1),
    trim: e[9],
    type: e[10]
  });
}
$t.prototype = He.prototype;
function He(t) {
  this.fill = t.fill === void 0 ? " " : t.fill + "", this.align = t.align === void 0 ? ">" : t.align + "", this.sign = t.sign === void 0 ? "-" : t.sign + "", this.symbol = t.symbol === void 0 ? "" : t.symbol + "", this.zero = !!t.zero, this.width = t.width === void 0 ? void 0 : +t.width, this.comma = !!t.comma, this.precision = t.precision === void 0 ? void 0 : +t.precision, this.trim = !!t.trim, this.type = t.type === void 0 ? "" : t.type + "";
}
He.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function rs(t) {
  t: for (var e = t.length, n = 1, r = -1, i; n < e; ++n)
    switch (t[n]) {
      case ".":
        r = i = n;
        break;
      case "0":
        r === 0 && (r = n), i = n;
        break;
      default:
        if (!+t[n]) break t;
        r > 0 && (r = 0);
        break;
    }
  return r > 0 ? t.slice(0, r) + t.slice(i + 1) : t;
}
var Qn;
function is(t, e) {
  var n = Ut(t, e);
  if (!n) return t + "";
  var r = n[0], i = n[1], a = i - (Qn = Math.max(-8, Math.min(8, Math.floor(i / 3))) * 3) + 1, s = r.length;
  return a === s ? r : a > s ? r + new Array(a - s + 1).join("0") : a > 0 ? r.slice(0, a) + "." + r.slice(a) : "0." + new Array(1 - a).join("0") + Ut(t, Math.max(0, e + a - 1))[0];
}
function un(t, e) {
  var n = Ut(t, e);
  if (!n) return t + "";
  var r = n[0], i = n[1];
  return i < 0 ? "0." + new Array(-i).join("0") + r : r.length > i + 1 ? r.slice(0, i + 1) + "." + r.slice(i + 1) : r + new Array(i - r.length + 2).join("0");
}
const fn = {
  "%": (t, e) => (t * 100).toFixed(e),
  b: (t) => Math.round(t).toString(2),
  c: (t) => t + "",
  d: ja,
  e: (t, e) => t.toExponential(e),
  f: (t, e) => t.toFixed(e),
  g: (t, e) => t.toPrecision(e),
  o: (t) => Math.round(t).toString(8),
  p: (t, e) => un(t * 100, e),
  r: un,
  s: is,
  X: (t) => Math.round(t).toString(16).toUpperCase(),
  x: (t) => Math.round(t).toString(16)
};
function hn(t) {
  return t;
}
var gn = Array.prototype.map, dn = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function as(t) {
  var e = t.grouping === void 0 || t.thousands === void 0 ? hn : ts(gn.call(t.grouping, Number), t.thousands + ""), n = t.currency === void 0 ? "" : t.currency[0] + "", r = t.currency === void 0 ? "" : t.currency[1] + "", i = t.decimal === void 0 ? "." : t.decimal + "", a = t.numerals === void 0 ? hn : es(gn.call(t.numerals, String)), s = t.percent === void 0 ? "%" : t.percent + "", o = t.minus === void 0 ? "−" : t.minus + "", c = t.nan === void 0 ? "NaN" : t.nan + "";
  function l(h) {
    h = $t(h);
    var f = h.fill, g = h.align, d = h.sign, p = h.symbol, v = h.zero, m = h.width, $ = h.comma, _ = h.precision, A = h.trim, k = h.type;
    k === "n" ? ($ = !0, k = "g") : fn[k] || (_ === void 0 && (_ = 12), A = !0, k = "g"), (v || f === "0" && g === "=") && (v = !0, f = "0", g = "=");
    var N = p === "$" ? n : p === "#" && /[boxX]/.test(k) ? "0" + k.toLowerCase() : "", F = p === "$" ? r : /[%p]/.test(k) ? s : "", V = fn[k], H = /[defgprs%]/.test(k);
    _ = _ === void 0 ? 6 : /[gprs]/.test(k) ? Math.max(1, Math.min(21, _)) : Math.max(0, Math.min(20, _));
    function D(x) {
      var z = N, y = F, S, W, j;
      if (k === "c")
        y = V(x) + y, x = "";
      else {
        x = +x;
        var q = x < 0 || 1 / x < 0;
        if (x = isNaN(x) ? c : V(Math.abs(x), _), A && (x = rs(x)), q && +x == 0 && d !== "+" && (q = !1), z = (q ? d === "(" ? d : o : d === "-" || d === "(" ? "" : d) + z, y = (k === "s" ? dn[8 + Qn / 3] : "") + y + (q && d === "(" ? ")" : ""), H) {
          for (S = -1, W = x.length; ++S < W; )
            if (j = x.charCodeAt(S), 48 > j || j > 57) {
              y = (j === 46 ? i + x.slice(S + 1) : x.slice(S)) + y, x = x.slice(0, S);
              break;
            }
        }
      }
      $ && !v && (x = e(x, 1 / 0));
      var X = z.length + x.length + y.length, B = X < m ? new Array(m - X + 1).join(f) : "";
      switch ($ && v && (x = e(B + x, B.length ? m - y.length : 1 / 0), B = ""), g) {
        case "<":
          x = z + x + y + B;
          break;
        case "=":
          x = z + B + x + y;
          break;
        case "^":
          x = B.slice(0, X = B.length >> 1) + z + x + y + B.slice(X);
          break;
        default:
          x = B + z + x + y;
          break;
      }
      return a(x);
    }
    return D.toString = function() {
      return h + "";
    }, D;
  }
  function u(h, f) {
    var g = l((h = $t(h), h.type = "f", h)), d = Math.max(-8, Math.min(8, Math.floor(pt(f) / 3))) * 3, p = Math.pow(10, -d), v = dn[8 + d / 3];
    return function(m) {
      return g(p * m) + v;
    };
  }
  return {
    format: l,
    formatPrefix: u
  };
}
var Tt, Be, jn;
ss({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function ss(t) {
  return Tt = as(t), Be = Tt.format, jn = Tt.formatPrefix, Tt;
}
function os(t) {
  return Math.max(0, -pt(Math.abs(t)));
}
function ls(t, e) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(pt(e) / 3))) * 3 - pt(Math.abs(t)));
}
function cs(t, e) {
  return t = Math.abs(t), e = Math.abs(e) - t, Math.max(0, pt(e) - pt(t)) + 1;
}
function us(t, e, n, r) {
  var i = xa(t, e, n), a;
  switch (r = $t(r ?? ",f"), r.type) {
    case "s": {
      var s = Math.max(Math.abs(t), Math.abs(e));
      return r.precision == null && !isNaN(a = ls(i, s)) && (r.precision = a), jn(r, s);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      r.precision == null && !isNaN(a = cs(i, Math.max(Math.abs(t), Math.abs(e)))) && (r.precision = a - (r.type === "e"));
      break;
    }
    case "f":
    case "%": {
      r.precision == null && !isNaN(a = os(i)) && (r.precision = a - (r.type === "%") * 2);
      break;
    }
  }
  return Be(r);
}
function fs(t) {
  var e = t.domain;
  return t.ticks = function(n) {
    var r = e();
    return ye(r[0], r[r.length - 1], n ?? 10);
  }, t.tickFormat = function(n, r) {
    var i = e();
    return us(i[0], i[i.length - 1], n ?? 10, r);
  }, t.nice = function(n) {
    n == null && (n = 10);
    var r = e(), i = 0, a = r.length - 1, s = r[i], o = r[a], c, l, u = 10;
    for (o < s && (l = s, s = o, o = l, l = i, i = a, a = l); u-- > 0; ) {
      if (l = me(s, o, n), l === c)
        return r[i] = s, r[a] = o, e(r);
      if (l > 0)
        s = Math.floor(s / l) * l, o = Math.ceil(o / l) * l;
      else if (l < 0)
        s = Math.ceil(s * l) / l, o = Math.floor(o * l) / l;
      else
        break;
      c = l;
    }
    return t;
  }, t;
}
function ke() {
  var t = Qa();
  return t.copy = function() {
    return Kn(t, ke());
  }, te.apply(t, arguments), fs(t);
}
function hs(t, e) {
  t = t.slice();
  var n = 0, r = t.length - 1, i = t[n], a = t[r], s;
  return a < i && (s = n, n = r, r = s, s = i, i = a, a = s), t[n] = e.floor(i), t[r] = e.ceil(a), t;
}
function pn(t) {
  return Math.log(t);
}
function yn(t) {
  return Math.exp(t);
}
function gs(t) {
  return -Math.log(-t);
}
function ds(t) {
  return -Math.exp(-t);
}
function ps(t) {
  return isFinite(t) ? +("1e" + t) : t < 0 ? 0 : t;
}
function ys(t) {
  return t === 10 ? ps : t === Math.E ? Math.exp : (e) => Math.pow(t, e);
}
function ms(t) {
  return t === Math.E ? Math.log : t === 10 && Math.log10 || t === 2 && Math.log2 || (t = Math.log(t), (e) => Math.log(e) / t);
}
function mn(t) {
  return (e, n) => -t(-e, n);
}
function xs(t) {
  const e = t(pn, yn), n = e.domain;
  let r = 10, i, a;
  function s() {
    return i = ms(r), a = ys(r), n()[0] < 0 ? (i = mn(i), a = mn(a), t(gs, ds)) : t(pn, yn), e;
  }
  return e.base = function(o) {
    return arguments.length ? (r = +o, s()) : r;
  }, e.domain = function(o) {
    return arguments.length ? (n(o), s()) : n();
  }, e.ticks = (o) => {
    const c = n();
    let l = c[0], u = c[c.length - 1];
    const h = u < l;
    h && ([l, u] = [u, l]);
    let f = i(l), g = i(u), d, p;
    const v = o == null ? 10 : +o;
    let m = [];
    if (!(r % 1) && g - f < v) {
      if (f = Math.floor(f), g = Math.ceil(g), l > 0) {
        for (; f <= g; ++f)
          for (d = 1; d < r; ++d)
            if (p = f < 0 ? d / a(-f) : d * a(f), !(p < l)) {
              if (p > u) break;
              m.push(p);
            }
      } else for (; f <= g; ++f)
        for (d = r - 1; d >= 1; --d)
          if (p = f > 0 ? d / a(-f) : d * a(f), !(p < l)) {
            if (p > u) break;
            m.push(p);
          }
      m.length * 2 < v && (m = ye(l, u, v));
    } else
      m = ye(f, g, Math.min(g - f, v)).map(a);
    return h ? m.reverse() : m;
  }, e.tickFormat = (o, c) => {
    if (o == null && (o = 10), c == null && (c = r === 10 ? "s" : ","), typeof c != "function" && (!(r % 1) && (c = $t(c)).precision == null && (c.trim = !0), c = Be(c)), o === 1 / 0) return c;
    const l = Math.max(1, r * o / e.ticks().length);
    return (u) => {
      let h = u / a(Math.round(i(u)));
      return h * r < r - 0.5 && (h *= r), h <= l ? c(u) : "";
    };
  }, e.nice = () => n(hs(n(), {
    floor: (o) => a(Math.floor(i(o))),
    ceil: (o) => a(Math.ceil(i(o)))
  })), e;
}
function $e() {
  const t = xs(Jn()).domain([1, 10]);
  return t.copy = () => Kn(t, $e()).base(t.base()), te.apply(t, arguments), t;
}
function ws(t) {
  return t;
}
var he = 1, ge = 2, Ae = 3, wt = 4, xn = 1e-6;
function vs(t) {
  return "translate(" + t + ",0)";
}
function bs(t) {
  return "translate(0," + t + ")";
}
function _s(t) {
  return (e) => +t(e);
}
function ks(t, e) {
  return e = Math.max(0, t.bandwidth() - e * 2) / 2, t.round() && (e = Math.round(e)), (n) => +t(n) + e;
}
function $s() {
  return !this.__axis;
}
function tr(t, e) {
  var n = [], r = null, i = null, a = 6, s = 6, o = 3, c = typeof window < "u" && window.devicePixelRatio > 1 ? 0 : 0.5, l = t === he || t === wt ? -1 : 1, u = t === wt || t === ge ? "x" : "y", h = t === he || t === Ae ? vs : bs;
  function f(g) {
    var d = r ?? (e.ticks ? e.ticks.apply(e, n) : e.domain()), p = i ?? (e.tickFormat ? e.tickFormat.apply(e, n) : ws), v = Math.max(a, 0) + o, m = e.range(), $ = +m[0] + c, _ = +m[m.length - 1] + c, A = (e.bandwidth ? ks : _s)(e.copy(), c), k = g.selection ? g.selection() : g, N = k.selectAll(".domain").data([null]), F = k.selectAll(".tick").data(d, e).order(), V = F.exit(), H = F.enter().append("g").attr("class", "tick"), D = F.select("line"), x = F.select("text");
    N = N.merge(N.enter().insert("path", ".tick").attr("class", "domain").attr("stroke", "currentColor")), F = F.merge(H), D = D.merge(H.append("line").attr("stroke", "currentColor").attr(u + "2", l * a)), x = x.merge(H.append("text").attr("fill", "currentColor").attr(u, l * v).attr("dy", t === he ? "0em" : t === Ae ? "0.71em" : "0.32em")), g !== k && (N = N.transition(g), F = F.transition(g), D = D.transition(g), x = x.transition(g), V = V.transition(g).attr("opacity", xn).attr("transform", function(z) {
      return isFinite(z = A(z)) ? h(z + c) : this.getAttribute("transform");
    }), H.attr("opacity", xn).attr("transform", function(z) {
      var y = this.parentNode.__axis;
      return h((y && isFinite(y = y(z)) ? y : A(z)) + c);
    })), V.remove(), N.attr("d", t === wt || t === ge ? s ? "M" + l * s + "," + $ + "H" + c + "V" + _ + "H" + l * s : "M" + c + "," + $ + "V" + _ : s ? "M" + $ + "," + l * s + "V" + c + "H" + _ + "V" + l * s : "M" + $ + "," + c + "H" + _), F.attr("opacity", 1).attr("transform", function(z) {
      return h(A(z) + c);
    }), D.attr(u + "2", l * a), x.attr(u, l * v).text(p), k.filter($s).attr("fill", "none").attr("font-size", 10).attr("font-family", "sans-serif").attr("text-anchor", t === ge ? "start" : t === wt ? "end" : "middle"), k.each(function() {
      this.__axis = A;
    });
  }
  return f.scale = function(g) {
    return arguments.length ? (e = g, f) : e;
  }, f.ticks = function() {
    return n = Array.from(arguments), f;
  }, f.tickArguments = function(g) {
    return arguments.length ? (n = g == null ? [] : Array.from(g), f) : n.slice();
  }, f.tickValues = function(g) {
    return arguments.length ? (r = g == null ? null : Array.from(g), f) : r && r.slice();
  }, f.tickFormat = function(g) {
    return arguments.length ? (i = g, f) : i;
  }, f.tickSize = function(g) {
    return arguments.length ? (a = s = +g, f) : a;
  }, f.tickSizeInner = function(g) {
    return arguments.length ? (a = +g, f) : a;
  }, f.tickSizeOuter = function(g) {
    return arguments.length ? (s = +g, f) : s;
  }, f.tickPadding = function(g) {
    return arguments.length ? (o = +g, f) : o;
  }, f.offset = function(g) {
    return arguments.length ? (c = +g, f) : c;
  }, f;
}
function wn(t) {
  return tr(Ae, t);
}
function vn(t) {
  return tr(wt, t);
}
function M(t) {
  return function() {
    return t;
  };
}
const bn = Math.abs, R = Math.atan2, it = Math.cos, As = Math.max, de = Math.min, Z = Math.sin, ht = Math.sqrt, I = 1e-12, At = Math.PI, Wt = At / 2, Bt = 2 * At;
function Ms(t) {
  return t > 1 ? 0 : t < -1 ? At : Math.acos(t);
}
function _n(t) {
  return t >= 1 ? Wt : t <= -1 ? -Wt : Math.asin(t);
}
const Me = Math.PI, Se = 2 * Me, at = 1e-6, Ss = Se - at;
function er(t) {
  this._ += t[0];
  for (let e = 1, n = t.length; e < n; ++e)
    this._ += arguments[e] + t[e];
}
function zs(t) {
  let e = Math.floor(t);
  if (!(e >= 0)) throw new Error(`invalid digits: ${t}`);
  if (e > 15) return er;
  const n = 10 ** e;
  return function(r) {
    this._ += r[0];
    for (let i = 1, a = r.length; i < a; ++i)
      this._ += Math.round(arguments[i] * n) / n + r[i];
  };
}
class Cs {
  constructor(e) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null, this._ = "", this._append = e == null ? er : zs(e);
  }
  moveTo(e, n) {
    this._append`M${this._x0 = this._x1 = +e},${this._y0 = this._y1 = +n}`;
  }
  closePath() {
    this._x1 !== null && (this._x1 = this._x0, this._y1 = this._y0, this._append`Z`);
  }
  lineTo(e, n) {
    this._append`L${this._x1 = +e},${this._y1 = +n}`;
  }
  quadraticCurveTo(e, n, r, i) {
    this._append`Q${+e},${+n},${this._x1 = +r},${this._y1 = +i}`;
  }
  bezierCurveTo(e, n, r, i, a, s) {
    this._append`C${+e},${+n},${+r},${+i},${this._x1 = +a},${this._y1 = +s}`;
  }
  arcTo(e, n, r, i, a) {
    if (e = +e, n = +n, r = +r, i = +i, a = +a, a < 0) throw new Error(`negative radius: ${a}`);
    let s = this._x1, o = this._y1, c = r - e, l = i - n, u = s - e, h = o - n, f = u * u + h * h;
    if (this._x1 === null)
      this._append`M${this._x1 = e},${this._y1 = n}`;
    else if (f > at) if (!(Math.abs(h * c - l * u) > at) || !a)
      this._append`L${this._x1 = e},${this._y1 = n}`;
    else {
      let g = r - s, d = i - o, p = c * c + l * l, v = g * g + d * d, m = Math.sqrt(p), $ = Math.sqrt(f), _ = a * Math.tan((Me - Math.acos((p + f - v) / (2 * m * $))) / 2), A = _ / $, k = _ / m;
      Math.abs(A - 1) > at && this._append`L${e + A * u},${n + A * h}`, this._append`A${a},${a},0,0,${+(h * g > u * d)},${this._x1 = e + k * c},${this._y1 = n + k * l}`;
    }
  }
  arc(e, n, r, i, a, s) {
    if (e = +e, n = +n, r = +r, s = !!s, r < 0) throw new Error(`negative radius: ${r}`);
    let o = r * Math.cos(i), c = r * Math.sin(i), l = e + o, u = n + c, h = 1 ^ s, f = s ? i - a : a - i;
    this._x1 === null ? this._append`M${l},${u}` : (Math.abs(this._x1 - l) > at || Math.abs(this._y1 - u) > at) && this._append`L${l},${u}`, r && (f < 0 && (f = f % Se + Se), f > Ss ? this._append`A${r},${r},0,1,${h},${e - o},${n - c}A${r},${r},0,1,${h},${this._x1 = l},${this._y1 = u}` : f > at && this._append`A${r},${r},0,${+(f >= Me)},${h},${this._x1 = e + r * Math.cos(a)},${this._y1 = n + r * Math.sin(a)}`);
  }
  rect(e, n, r, i) {
    this._append`M${this._x0 = this._x1 = +e},${this._y0 = this._y1 = +n}h${r = +r}v${+i}h${-r}Z`;
  }
  toString() {
    return this._;
  }
}
function Ie(t) {
  let e = 3;
  return t.digits = function(n) {
    if (!arguments.length) return e;
    if (n == null)
      e = null;
    else {
      const r = Math.floor(n);
      if (!(r >= 0)) throw new RangeError(`invalid digits: ${n}`);
      e = r;
    }
    return t;
  }, () => new Cs(e);
}
function Ns(t) {
  return t.innerRadius;
}
function Fs(t) {
  return t.outerRadius;
}
function Es(t) {
  return t.startAngle;
}
function Ds(t) {
  return t.endAngle;
}
function Rs(t) {
  return t && t.padAngle;
}
function Ts(t, e, n, r, i, a, s, o) {
  var c = n - t, l = r - e, u = s - i, h = o - a, f = h * c - u * l;
  if (!(f * f < I))
    return f = (u * (e - a) - h * (t - i)) / f, [t + f * c, e + f * l];
}
function Vt(t, e, n, r, i, a, s) {
  var o = t - n, c = e - r, l = (s ? a : -a) / ht(o * o + c * c), u = l * c, h = -l * o, f = t + u, g = e + h, d = n + u, p = r + h, v = (f + d) / 2, m = (g + p) / 2, $ = d - f, _ = p - g, A = $ * $ + _ * _, k = i - a, N = f * p - d * g, F = (_ < 0 ? -1 : 1) * ht(As(0, k * k * A - N * N)), V = (N * _ - $ * F) / A, H = (-N * $ - _ * F) / A, D = (N * _ + $ * F) / A, x = (-N * $ + _ * F) / A, z = V - v, y = H - m, S = D - v, W = x - m;
  return z * z + y * y > S * S + W * W && (V = D, H = x), {
    cx: V,
    cy: H,
    x01: -u,
    y01: -h,
    x11: V * (i / k - 1),
    y11: H * (i / k - 1)
  };
}
function Pe() {
  var t = Ns, e = Fs, n = M(0), r = null, i = Es, a = Ds, s = Rs, o = null, c = Ie(l);
  function l() {
    var u, h, f = +t.apply(this, arguments), g = +e.apply(this, arguments), d = i.apply(this, arguments) - Wt, p = a.apply(this, arguments) - Wt, v = bn(p - d), m = p > d;
    if (o || (o = u = c()), g < f && (h = g, g = f, f = h), !(g > I)) o.moveTo(0, 0);
    else if (v > Bt - I)
      o.moveTo(g * it(d), g * Z(d)), o.arc(0, 0, g, d, p, !m), f > I && (o.moveTo(f * it(p), f * Z(p)), o.arc(0, 0, f, p, d, m));
    else {
      var $ = d, _ = p, A = d, k = p, N = v, F = v, V = s.apply(this, arguments) / 2, H = V > I && (r ? +r.apply(this, arguments) : ht(f * f + g * g)), D = de(bn(g - f) / 2, +n.apply(this, arguments)), x = D, z = D, y, S;
      if (H > I) {
        var W = _n(H / f * Z(V)), j = _n(H / g * Z(V));
        (N -= W * 2) > I ? (W *= m ? 1 : -1, A += W, k -= W) : (N = 0, A = k = (d + p) / 2), (F -= j * 2) > I ? (j *= m ? 1 : -1, $ += j, _ -= j) : (F = 0, $ = _ = (d + p) / 2);
      }
      var q = g * it($), X = g * Z($), B = f * it(k), Ct = f * Z(k);
      if (D > I) {
        var Nt = g * it(_), Ft = g * Z(_), ie = f * it(A), ae = f * Z(A), tt;
        if (v < At)
          if (tt = Ts(q, X, ie, ae, Nt, Ft, B, Ct)) {
            var se = q - tt[0], oe = X - tt[1], le = Nt - tt[0], ce = Ft - tt[1], Ue = 1 / Z(Ms((se * le + oe * ce) / (ht(se * se + oe * oe) * ht(le * le + ce * ce))) / 2), We = ht(tt[0] * tt[0] + tt[1] * tt[1]);
            x = de(D, (f - We) / (Ue - 1)), z = de(D, (g - We) / (Ue + 1));
          } else
            x = z = 0;
      }
      F > I ? z > I ? (y = Vt(ie, ae, q, X, g, z, m), S = Vt(Nt, Ft, B, Ct, g, z, m), o.moveTo(y.cx + y.x01, y.cy + y.y01), z < D ? o.arc(y.cx, y.cy, z, R(y.y01, y.x01), R(S.y01, S.x01), !m) : (o.arc(y.cx, y.cy, z, R(y.y01, y.x01), R(y.y11, y.x11), !m), o.arc(0, 0, g, R(y.cy + y.y11, y.cx + y.x11), R(S.cy + S.y11, S.cx + S.x11), !m), o.arc(S.cx, S.cy, z, R(S.y11, S.x11), R(S.y01, S.x01), !m))) : (o.moveTo(q, X), o.arc(0, 0, g, $, _, !m)) : o.moveTo(q, X), !(f > I) || !(N > I) ? o.lineTo(B, Ct) : x > I ? (y = Vt(B, Ct, Nt, Ft, f, -x, m), S = Vt(q, X, ie, ae, f, -x, m), o.lineTo(y.cx + y.x01, y.cy + y.y01), x < D ? o.arc(y.cx, y.cy, x, R(y.y01, y.x01), R(S.y01, S.x01), !m) : (o.arc(y.cx, y.cy, x, R(y.y01, y.x01), R(y.y11, y.x11), !m), o.arc(0, 0, f, R(y.cy + y.y11, y.cx + y.x11), R(S.cy + S.y11, S.cx + S.x11), m), o.arc(S.cx, S.cy, x, R(S.y11, S.x11), R(S.y01, S.x01), !m))) : o.arc(0, 0, f, k, A, m);
    }
    if (o.closePath(), u) return o = null, u + "" || null;
  }
  return l.centroid = function() {
    var u = (+t.apply(this, arguments) + +e.apply(this, arguments)) / 2, h = (+i.apply(this, arguments) + +a.apply(this, arguments)) / 2 - At / 2;
    return [it(h) * u, Z(h) * u];
  }, l.innerRadius = function(u) {
    return arguments.length ? (t = typeof u == "function" ? u : M(+u), l) : t;
  }, l.outerRadius = function(u) {
    return arguments.length ? (e = typeof u == "function" ? u : M(+u), l) : e;
  }, l.cornerRadius = function(u) {
    return arguments.length ? (n = typeof u == "function" ? u : M(+u), l) : n;
  }, l.padRadius = function(u) {
    return arguments.length ? (r = u == null ? null : typeof u == "function" ? u : M(+u), l) : r;
  }, l.startAngle = function(u) {
    return arguments.length ? (i = typeof u == "function" ? u : M(+u), l) : i;
  }, l.endAngle = function(u) {
    return arguments.length ? (a = typeof u == "function" ? u : M(+u), l) : a;
  }, l.padAngle = function(u) {
    return arguments.length ? (s = typeof u == "function" ? u : M(+u), l) : s;
  }, l.context = function(u) {
    return arguments.length ? (o = u ?? null, l) : o;
  }, l;
}
function ee(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function nr(t) {
  this._context = t;
}
nr.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(t, e) {
    switch (t = +t, e = +e, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(t, e) : this._context.moveTo(t, e);
        break;
      case 1:
        this._point = 2;
      default:
        this._context.lineTo(t, e);
        break;
    }
  }
};
function T(t) {
  return new nr(t);
}
function rr(t) {
  return t[0];
}
function ir(t) {
  return t[1];
}
function nt(t, e) {
  var n = M(!0), r = null, i = T, a = null, s = Ie(o);
  t = typeof t == "function" ? t : t === void 0 ? rr : M(t), e = typeof e == "function" ? e : e === void 0 ? ir : M(e);
  function o(c) {
    var l, u = (c = ee(c)).length, h, f = !1, g;
    for (r == null && (a = i(g = s())), l = 0; l <= u; ++l)
      !(l < u && n(h = c[l], l, c)) === f && ((f = !f) ? a.lineStart() : a.lineEnd()), f && a.point(+t(h, l, c), +e(h, l, c));
    if (g) return a = null, g + "" || null;
  }
  return o.x = function(c) {
    return arguments.length ? (t = typeof c == "function" ? c : M(+c), o) : t;
  }, o.y = function(c) {
    return arguments.length ? (e = typeof c == "function" ? c : M(+c), o) : e;
  }, o.defined = function(c) {
    return arguments.length ? (n = typeof c == "function" ? c : M(!!c), o) : n;
  }, o.curve = function(c) {
    return arguments.length ? (i = c, r != null && (a = i(r)), o) : i;
  }, o.context = function(c) {
    return arguments.length ? (c == null ? r = a = null : a = i(r = c), o) : r;
  }, o;
}
function yt(t, e, n) {
  var r = null, i = M(!0), a = null, s = T, o = null, c = Ie(l);
  t = typeof t == "function" ? t : t === void 0 ? rr : M(+t), e = typeof e == "function" ? e : M(e === void 0 ? 0 : +e), n = typeof n == "function" ? n : n === void 0 ? ir : M(+n);
  function l(h) {
    var f, g, d, p = (h = ee(h)).length, v, m = !1, $, _ = new Array(p), A = new Array(p);
    for (a == null && (o = s($ = c())), f = 0; f <= p; ++f) {
      if (!(f < p && i(v = h[f], f, h)) === m)
        if (m = !m)
          g = f, o.areaStart(), o.lineStart();
        else {
          for (o.lineEnd(), o.lineStart(), d = f - 1; d >= g; --d)
            o.point(_[d], A[d]);
          o.lineEnd(), o.areaEnd();
        }
      m && (_[f] = +t(v, f, h), A[f] = +e(v, f, h), o.point(r ? +r(v, f, h) : _[f], n ? +n(v, f, h) : A[f]));
    }
    if ($) return o = null, $ + "" || null;
  }
  function u() {
    return nt().defined(i).curve(s).context(a);
  }
  return l.x = function(h) {
    return arguments.length ? (t = typeof h == "function" ? h : M(+h), r = null, l) : t;
  }, l.x0 = function(h) {
    return arguments.length ? (t = typeof h == "function" ? h : M(+h), l) : t;
  }, l.x1 = function(h) {
    return arguments.length ? (r = h == null ? null : typeof h == "function" ? h : M(+h), l) : r;
  }, l.y = function(h) {
    return arguments.length ? (e = typeof h == "function" ? h : M(+h), n = null, l) : e;
  }, l.y0 = function(h) {
    return arguments.length ? (e = typeof h == "function" ? h : M(+h), l) : e;
  }, l.y1 = function(h) {
    return arguments.length ? (n = h == null ? null : typeof h == "function" ? h : M(+h), l) : n;
  }, l.lineX0 = l.lineY0 = function() {
    return u().x(t).y(e);
  }, l.lineY1 = function() {
    return u().x(t).y(n);
  }, l.lineX1 = function() {
    return u().x(r).y(e);
  }, l.defined = function(h) {
    return arguments.length ? (i = typeof h == "function" ? h : M(!!h), l) : i;
  }, l.curve = function(h) {
    return arguments.length ? (s = h, a != null && (o = s(a)), l) : s;
  }, l.context = function(h) {
    return arguments.length ? (h == null ? a = o = null : o = s(a = h), l) : a;
  }, l;
}
function Vs(t, e) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function Hs(t) {
  return t;
}
function Le() {
  var t = Hs, e = Vs, n = null, r = M(0), i = M(Bt), a = M(0);
  function s(o) {
    var c, l = (o = ee(o)).length, u, h, f = 0, g = new Array(l), d = new Array(l), p = +r.apply(this, arguments), v = Math.min(Bt, Math.max(-Bt, i.apply(this, arguments) - p)), m, $ = Math.min(Math.abs(v) / l, a.apply(this, arguments)), _ = $ * (v < 0 ? -1 : 1), A;
    for (c = 0; c < l; ++c)
      (A = d[g[c] = c] = +t(o[c], c, o)) > 0 && (f += A);
    for (e != null ? g.sort(function(k, N) {
      return e(d[k], d[N]);
    }) : n != null && g.sort(function(k, N) {
      return n(o[k], o[N]);
    }), c = 0, h = f ? (v - l * _) / f : 0; c < l; ++c, p = m)
      u = g[c], A = d[u], m = p + (A > 0 ? A * h : 0) + _, d[u] = {
        data: o[u],
        index: c,
        value: A,
        startAngle: p,
        endAngle: m,
        padAngle: $
      };
    return d;
  }
  return s.value = function(o) {
    return arguments.length ? (t = typeof o == "function" ? o : M(+o), s) : t;
  }, s.sortValues = function(o) {
    return arguments.length ? (e = o, n = null, s) : e;
  }, s.sort = function(o) {
    return arguments.length ? (n = o, e = null, s) : n;
  }, s.startAngle = function(o) {
    return arguments.length ? (r = typeof o == "function" ? o : M(+o), s) : r;
  }, s.endAngle = function(o) {
    return arguments.length ? (i = typeof o == "function" ? o : M(+o), s) : i;
  }, s.padAngle = function(o) {
    return arguments.length ? (a = typeof o == "function" ? o : M(+o), s) : a;
  }, s;
}
function ze(t, e) {
  if ((s = t.length) > 1)
    for (var n = 1, r, i, a = t[e[0]], s, o = a.length; n < s; ++n)
      for (i = a, a = t[e[n]], r = 0; r < o; ++r)
        a[r][1] += a[r][0] = isNaN(i[r][1]) ? i[r][0] : i[r][1];
}
function kn(t) {
  for (var e = t.length, n = new Array(e); --e >= 0; ) n[e] = e;
  return n;
}
function Bs(t, e) {
  return t[e];
}
function Is(t) {
  const e = [];
  return e.key = t, e;
}
function ar() {
  var t = M([]), e = kn, n = ze, r = Bs;
  function i(a) {
    var s = Array.from(t.apply(this, arguments), Is), o, c = s.length, l = -1, u;
    for (const h of a)
      for (o = 0, ++l; o < c; ++o)
        (s[o][l] = [0, +r(h, s[o].key, l, a)]).data = h;
    for (o = 0, u = ee(e(s)); o < c; ++o)
      s[u[o]].index = o;
    return n(s, u), s;
  }
  return i.keys = function(a) {
    return arguments.length ? (t = typeof a == "function" ? a : M(Array.from(a)), i) : t;
  }, i.value = function(a) {
    return arguments.length ? (r = typeof a == "function" ? a : M(+a), i) : r;
  }, i.order = function(a) {
    return arguments.length ? (e = a == null ? kn : typeof a == "function" ? a : M(Array.from(a)), i) : e;
  }, i.offset = function(a) {
    return arguments.length ? (n = a ?? ze, i) : n;
  }, i;
}
function Ps(t, e) {
  if ((r = t.length) > 0) {
    for (var n, r, i = 0, a = t[0].length, s; i < a; ++i) {
      for (s = n = 0; n < r; ++n) s += t[n][i][1] || 0;
      if (s) for (n = 0; n < r; ++n) t[n][i][1] /= s;
    }
    ze(t, e);
  }
}
var Ls = { value: () => {
} };
function sr() {
  for (var t = 0, e = arguments.length, n = {}, r; t < e; ++t) {
    if (!(r = arguments[t] + "") || r in n || /[\s.]/.test(r)) throw new Error("illegal type: " + r);
    n[r] = [];
  }
  return new It(n);
}
function It(t) {
  this._ = t;
}
function Os(t, e) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var r = "", i = n.indexOf(".");
    if (i >= 0 && (r = n.slice(i + 1), n = n.slice(0, i)), n && !e.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: r };
  });
}
It.prototype = sr.prototype = {
  constructor: It,
  on: function(t, e) {
    var n = this._, r = Os(t + "", n), i, a = -1, s = r.length;
    if (arguments.length < 2) {
      for (; ++a < s; ) if ((i = (t = r[a]).type) && (i = qs(n[i], t.name))) return i;
      return;
    }
    if (e != null && typeof e != "function") throw new Error("invalid callback: " + e);
    for (; ++a < s; )
      if (i = (t = r[a]).type) n[i] = $n(n[i], t.name, e);
      else if (e == null) for (i in n) n[i] = $n(n[i], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, e = this._;
    for (var n in e) t[n] = e[n].slice();
    return new It(t);
  },
  call: function(t, e) {
    if ((i = arguments.length - 2) > 0) for (var n = new Array(i), r = 0, i, a; r < i; ++r) n[r] = arguments[r + 2];
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (a = this._[t], r = 0, i = a.length; r < i; ++r) a[r].value.apply(e, n);
  },
  apply: function(t, e, n) {
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (var r = this._[t], i = 0, a = r.length; i < a; ++i) r[i].value.apply(e, n);
  }
};
function qs(t, e) {
  for (var n = 0, r = t.length, i; n < r; ++n)
    if ((i = t[n]).name === e)
      return i.value;
}
function $n(t, e, n) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === e) {
      t[r] = Ls, t = t.slice(0, r).concat(t.slice(r + 1));
      break;
    }
  return n != null && t.push({ name: e, value: n }), t;
}
var mt = 0, vt = 0, xt = 0, or = 1e3, Zt, bt, Kt = 0, ct = 0, ne = 0, Mt = typeof performance == "object" && performance.now ? performance : Date, lr = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function Oe() {
  return ct || (lr(Xs), ct = Mt.now() + ne);
}
function Xs() {
  ct = 0;
}
function Jt() {
  this._call = this._time = this._next = null;
}
Jt.prototype = cr.prototype = {
  constructor: Jt,
  restart: function(t, e, n) {
    if (typeof t != "function") throw new TypeError("callback is not a function");
    n = (n == null ? Oe() : +n) + (e == null ? 0 : +e), !this._next && bt !== this && (bt ? bt._next = this : Zt = this, bt = this), this._call = t, this._time = n, Ce();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Ce());
  }
};
function cr(t, e, n) {
  var r = new Jt();
  return r.restart(t, e, n), r;
}
function Ys() {
  Oe(), ++mt;
  for (var t = Zt, e; t; )
    (e = ct - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --mt;
}
function An() {
  ct = (Kt = Mt.now()) + ne, mt = vt = 0;
  try {
    Ys();
  } finally {
    mt = 0, Us(), ct = 0;
  }
}
function Gs() {
  var t = Mt.now(), e = t - Kt;
  e > or && (ne -= e, Kt = t);
}
function Us() {
  for (var t, e = Zt, n, r = 1 / 0; e; )
    e._call ? (r > e._time && (r = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : Zt = n);
  bt = t, Ce(r);
}
function Ce(t) {
  if (!mt) {
    vt && (vt = clearTimeout(vt));
    var e = t - ct;
    e > 24 ? (t < 1 / 0 && (vt = setTimeout(An, t - Mt.now() - ne)), xt && (xt = clearInterval(xt))) : (xt || (Kt = Mt.now(), xt = setInterval(Gs, or)), mt = 1, lr(An));
  }
}
function Mn(t, e, n) {
  var r = new Jt();
  return e = e == null ? 0 : +e, r.restart((i) => {
    r.stop(), t(i + e);
  }, e, n), r;
}
var Ws = sr("start", "end", "cancel", "interrupt"), Zs = [], ur = 0, Sn = 1, Ne = 2, Pt = 3, zn = 4, Fe = 5, Lt = 6;
function re(t, e, n, r, i, a) {
  var s = t.__transition;
  if (!s) t.__transition = {};
  else if (n in s) return;
  Ks(t, n, {
    name: e,
    index: r,
    // For context during callback.
    group: i,
    // For context during callback.
    on: Ws,
    tween: Zs,
    time: a.time,
    delay: a.delay,
    duration: a.duration,
    ease: a.ease,
    timer: null,
    state: ur
  });
}
function qe(t, e) {
  var n = U(t, e);
  if (n.state > ur) throw new Error("too late; already scheduled");
  return n;
}
function J(t, e) {
  var n = U(t, e);
  if (n.state > Pt) throw new Error("too late; already running");
  return n;
}
function U(t, e) {
  var n = t.__transition;
  if (!n || !(n = n[e])) throw new Error("transition not found");
  return n;
}
function Ks(t, e, n) {
  var r = t.__transition, i;
  r[e] = n, n.timer = cr(a, 0, n.time);
  function a(l) {
    n.state = Sn, n.timer.restart(s, n.delay, n.time), n.delay <= l && s(l - n.delay);
  }
  function s(l) {
    var u, h, f, g;
    if (n.state !== Sn) return c();
    for (u in r)
      if (g = r[u], g.name === n.name) {
        if (g.state === Pt) return Mn(s);
        g.state === zn ? (g.state = Lt, g.timer.stop(), g.on.call("interrupt", t, t.__data__, g.index, g.group), delete r[u]) : +u < e && (g.state = Lt, g.timer.stop(), g.on.call("cancel", t, t.__data__, g.index, g.group), delete r[u]);
      }
    if (Mn(function() {
      n.state === Pt && (n.state = zn, n.timer.restart(o, n.delay, n.time), o(l));
    }), n.state = Ne, n.on.call("start", t, t.__data__, n.index, n.group), n.state === Ne) {
      for (n.state = Pt, i = new Array(f = n.tween.length), u = 0, h = -1; u < f; ++u)
        (g = n.tween[u].value.call(t, t.__data__, n.index, n.group)) && (i[++h] = g);
      i.length = h + 1;
    }
  }
  function o(l) {
    for (var u = l < n.duration ? n.ease.call(null, l / n.duration) : (n.timer.restart(c), n.state = Fe, 1), h = -1, f = i.length; ++h < f; )
      i[h].call(t, u);
    n.state === Fe && (n.on.call("end", t, t.__data__, n.index, n.group), c());
  }
  function c() {
    n.state = Lt, n.timer.stop(), delete r[e];
    for (var l in r) return;
    delete t.__transition;
  }
}
function Js(t, e) {
  var n = t.__transition, r, i, a = !0, s;
  if (n) {
    e = e == null ? null : e + "";
    for (s in n) {
      if ((r = n[s]).name !== e) {
        a = !1;
        continue;
      }
      i = r.state > Ne && r.state < Fe, r.state = Lt, r.timer.stop(), r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group), delete n[s];
    }
    a && delete t.__transition;
  }
}
function Qs(t) {
  return this.each(function() {
    Js(this, t);
  });
}
function js(t, e) {
  var n, r;
  return function() {
    var i = J(this, t), a = i.tween;
    if (a !== n) {
      r = n = a;
      for (var s = 0, o = r.length; s < o; ++s)
        if (r[s].name === e) {
          r = r.slice(), r.splice(s, 1);
          break;
        }
    }
    i.tween = r;
  };
}
function to(t, e, n) {
  var r, i;
  if (typeof n != "function") throw new Error();
  return function() {
    var a = J(this, t), s = a.tween;
    if (s !== r) {
      i = (r = s).slice();
      for (var o = { name: e, value: n }, c = 0, l = i.length; c < l; ++c)
        if (i[c].name === e) {
          i[c] = o;
          break;
        }
      c === l && i.push(o);
    }
    a.tween = i;
  };
}
function eo(t, e) {
  var n = this._id;
  if (t += "", arguments.length < 2) {
    for (var r = U(this.node(), n).tween, i = 0, a = r.length, s; i < a; ++i)
      if ((s = r[i]).name === t)
        return s.value;
    return null;
  }
  return this.each((e == null ? js : to)(n, t, e));
}
function Xe(t, e, n) {
  var r = t._id;
  return t.each(function() {
    var i = J(this, r);
    (i.value || (i.value = {}))[e] = n.apply(this, arguments);
  }), function(i) {
    return U(i, r).value[e];
  };
}
function fr(t, e) {
  var n;
  return (typeof e == "number" ? Y : e instanceof lt ? Gt : (n = lt(e)) ? (e = n, Gt) : Un)(t, e);
}
function no(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function ro(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function io(t, e, n) {
  var r, i = n + "", a;
  return function() {
    var s = this.getAttribute(t);
    return s === i ? null : s === r ? a : a = e(r = s, n);
  };
}
function ao(t, e, n) {
  var r, i = n + "", a;
  return function() {
    var s = this.getAttributeNS(t.space, t.local);
    return s === i ? null : s === r ? a : a = e(r = s, n);
  };
}
function so(t, e, n) {
  var r, i, a;
  return function() {
    var s, o = n(this), c;
    return o == null ? void this.removeAttribute(t) : (s = this.getAttribute(t), c = o + "", s === c ? null : s === r && c === i ? a : (i = c, a = e(r = s, o)));
  };
}
function oo(t, e, n) {
  var r, i, a;
  return function() {
    var s, o = n(this), c;
    return o == null ? void this.removeAttributeNS(t.space, t.local) : (s = this.getAttributeNS(t.space, t.local), c = o + "", s === c ? null : s === r && c === i ? a : (i = c, a = e(r = s, o)));
  };
}
function lo(t, e) {
  var n = jt(t), r = n === "transform" ? Ga : fr;
  return this.attrTween(t, typeof e == "function" ? (n.local ? oo : so)(n, r, Xe(this, "attr." + t, e)) : e == null ? (n.local ? ro : no)(n) : (n.local ? ao : io)(n, r, e));
}
function co(t, e) {
  return function(n) {
    this.setAttribute(t, e.call(this, n));
  };
}
function uo(t, e) {
  return function(n) {
    this.setAttributeNS(t.space, t.local, e.call(this, n));
  };
}
function fo(t, e) {
  var n, r;
  function i() {
    var a = e.apply(this, arguments);
    return a !== r && (n = (r = a) && uo(t, a)), n;
  }
  return i._value = e, i;
}
function ho(t, e) {
  var n, r;
  function i() {
    var a = e.apply(this, arguments);
    return a !== r && (n = (r = a) && co(t, a)), n;
  }
  return i._value = e, i;
}
function go(t, e) {
  var n = "attr." + t;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (e == null) return this.tween(n, null);
  if (typeof e != "function") throw new Error();
  var r = jt(t);
  return this.tween(n, (r.local ? fo : ho)(r, e));
}
function po(t, e) {
  return function() {
    qe(this, t).delay = +e.apply(this, arguments);
  };
}
function yo(t, e) {
  return e = +e, function() {
    qe(this, t).delay = e;
  };
}
function mo(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? po : yo)(e, t)) : U(this.node(), e).delay;
}
function xo(t, e) {
  return function() {
    J(this, t).duration = +e.apply(this, arguments);
  };
}
function wo(t, e) {
  return e = +e, function() {
    J(this, t).duration = e;
  };
}
function vo(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? xo : wo)(e, t)) : U(this.node(), e).duration;
}
function bo(t, e) {
  if (typeof e != "function") throw new Error();
  return function() {
    J(this, t).ease = e;
  };
}
function _o(t) {
  var e = this._id;
  return arguments.length ? this.each(bo(e, t)) : U(this.node(), e).ease;
}
function ko(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    J(this, t).ease = n;
  };
}
function $o(t) {
  if (typeof t != "function") throw new Error();
  return this.each(ko(this._id, t));
}
function Ao(t) {
  typeof t != "function" && (t = En(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var a = e[i], s = a.length, o = r[i] = [], c, l = 0; l < s; ++l)
      (c = a[l]) && t.call(c, c.__data__, l, a) && o.push(c);
  return new rt(r, this._parents, this._name, this._id);
}
function Mo(t) {
  if (t._id !== this._id) throw new Error();
  for (var e = this._groups, n = t._groups, r = e.length, i = n.length, a = Math.min(r, i), s = new Array(r), o = 0; o < a; ++o)
    for (var c = e[o], l = n[o], u = c.length, h = s[o] = new Array(u), f, g = 0; g < u; ++g)
      (f = c[g] || l[g]) && (h[g] = f);
  for (; o < r; ++o)
    s[o] = e[o];
  return new rt(s, this._parents, this._name, this._id);
}
function So(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var n = e.indexOf(".");
    return n >= 0 && (e = e.slice(0, n)), !e || e === "start";
  });
}
function zo(t, e, n) {
  var r, i, a = So(e) ? qe : J;
  return function() {
    var s = a(this, t), o = s.on;
    o !== r && (i = (r = o).copy()).on(e, n), s.on = i;
  };
}
function Co(t, e) {
  var n = this._id;
  return arguments.length < 2 ? U(this.node(), n).on.on(t) : this.each(zo(n, t, e));
}
function No(t) {
  return function() {
    var e = this.parentNode;
    for (var n in this.__transition) if (+n !== t) return;
    e && e.removeChild(this);
  };
}
function Fo() {
  return this.on("end.remove", No(this._id));
}
function Eo(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = Ee(t));
  for (var r = this._groups, i = r.length, a = new Array(i), s = 0; s < i; ++s)
    for (var o = r[s], c = o.length, l = a[s] = new Array(c), u, h, f = 0; f < c; ++f)
      (u = o[f]) && (h = t.call(u, u.__data__, f, o)) && ("__data__" in u && (h.__data__ = u.__data__), l[f] = h, re(l[f], e, n, f, l, U(u, n)));
  return new rt(a, this._parents, e, n);
}
function Do(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = Fn(t));
  for (var r = this._groups, i = r.length, a = [], s = [], o = 0; o < i; ++o)
    for (var c = r[o], l = c.length, u, h = 0; h < l; ++h)
      if (u = c[h]) {
        for (var f = t.call(u, u.__data__, h, c), g, d = U(u, n), p = 0, v = f.length; p < v; ++p)
          (g = f[p]) && re(g, e, n, p, f, d);
        a.push(f), s.push(u);
      }
  return new rt(a, s, e, n);
}
var Ro = St.prototype.constructor;
function To() {
  return new Ro(this._groups, this._parents);
}
function Vo(t, e) {
  var n, r, i;
  return function() {
    var a = dt(this, t), s = (this.style.removeProperty(t), dt(this, t));
    return a === s ? null : a === n && s === r ? i : i = e(n = a, r = s);
  };
}
function hr(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Ho(t, e, n) {
  var r, i = n + "", a;
  return function() {
    var s = dt(this, t);
    return s === i ? null : s === r ? a : a = e(r = s, n);
  };
}
function Bo(t, e, n) {
  var r, i, a;
  return function() {
    var s = dt(this, t), o = n(this), c = o + "";
    return o == null && (c = o = (this.style.removeProperty(t), dt(this, t))), s === c ? null : s === r && c === i ? a : (i = c, a = e(r = s, o));
  };
}
function Io(t, e) {
  var n, r, i, a = "style." + e, s = "end." + a, o;
  return function() {
    var c = J(this, t), l = c.on, u = c.value[a] == null ? o || (o = hr(e)) : void 0;
    (l !== n || i !== u) && (r = (n = l).copy()).on(s, i = u), c.on = r;
  };
}
function Po(t, e, n) {
  var r = (t += "") == "transform" ? Ya : fr;
  return e == null ? this.styleTween(t, Vo(t, r)).on("end.style." + t, hr(t)) : typeof e == "function" ? this.styleTween(t, Bo(t, r, Xe(this, "style." + t, e))).each(Io(this._id, t)) : this.styleTween(t, Ho(t, r, e), n).on("end.style." + t, null);
}
function Lo(t, e, n) {
  return function(r) {
    this.style.setProperty(t, e.call(this, r), n);
  };
}
function Oo(t, e, n) {
  var r, i;
  function a() {
    var s = e.apply(this, arguments);
    return s !== i && (r = (i = s) && Lo(t, s, n)), r;
  }
  return a._value = e, a;
}
function qo(t, e, n) {
  var r = "style." + (t += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (e == null) return this.tween(r, null);
  if (typeof e != "function") throw new Error();
  return this.tween(r, Oo(t, e, n ?? ""));
}
function Xo(t) {
  return function() {
    this.textContent = t;
  };
}
function Yo(t) {
  return function() {
    var e = t(this);
    this.textContent = e ?? "";
  };
}
function Go(t) {
  return this.tween("text", typeof t == "function" ? Yo(Xe(this, "text", t)) : Xo(t == null ? "" : t + ""));
}
function Uo(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function Wo(t) {
  var e, n;
  function r() {
    var i = t.apply(this, arguments);
    return i !== n && (e = (n = i) && Uo(i)), e;
  }
  return r._value = t, r;
}
function Zo(t) {
  var e = "text";
  if (arguments.length < 1) return (e = this.tween(e)) && e._value;
  if (t == null) return this.tween(e, null);
  if (typeof t != "function") throw new Error();
  return this.tween(e, Wo(t));
}
function Ko() {
  for (var t = this._name, e = this._id, n = gr(), r = this._groups, i = r.length, a = 0; a < i; ++a)
    for (var s = r[a], o = s.length, c, l = 0; l < o; ++l)
      if (c = s[l]) {
        var u = U(c, e);
        re(c, t, n, l, s, {
          time: u.time + u.delay + u.duration,
          delay: 0,
          duration: u.duration,
          ease: u.ease
        });
      }
  return new rt(r, this._parents, t, n);
}
function Jo() {
  var t, e, n = this, r = n._id, i = n.size();
  return new Promise(function(a, s) {
    var o = { value: s }, c = { value: function() {
      --i === 0 && a();
    } };
    n.each(function() {
      var l = J(this, r), u = l.on;
      u !== t && (e = (t = u).copy(), e._.cancel.push(o), e._.interrupt.push(o), e._.end.push(c)), l.on = e;
    }), i === 0 && a();
  });
}
var Qo = 0;
function rt(t, e, n, r) {
  this._groups = t, this._parents = e, this._name = n, this._id = r;
}
function gr() {
  return ++Qo;
}
var et = St.prototype;
rt.prototype = {
  constructor: rt,
  select: Eo,
  selectAll: Do,
  selectChild: et.selectChild,
  selectChildren: et.selectChildren,
  filter: Ao,
  merge: Mo,
  selection: To,
  transition: Ko,
  call: et.call,
  nodes: et.nodes,
  node: et.node,
  size: et.size,
  empty: et.empty,
  each: et.each,
  on: Co,
  attr: lo,
  attrTween: go,
  style: Po,
  styleTween: qo,
  text: Go,
  textTween: Zo,
  remove: Fo,
  tween: eo,
  delay: mo,
  duration: vo,
  ease: _o,
  easeVarying: $o,
  end: Jo,
  [Symbol.iterator]: et[Symbol.iterator]
};
function jo(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var tl = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: jo
};
function el(t, e) {
  for (var n; !(n = t.__transition) || !(n = n[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return n;
}
function nl(t) {
  var e, n;
  t instanceof rt ? (e = t._id, t = t._name) : (e = gr(), (n = tl).time = Oe(), t = t == null ? null : t + "");
  for (var r = this._groups, i = r.length, a = 0; a < i; ++a)
    for (var s = r[a], o = s.length, c, l = 0; l < o; ++l)
      (c = s[l]) && re(c, t, e, l, s, n || el(c, e));
  return new rt(r, this._parents, t, e);
}
St.prototype.interrupt = Qs;
St.prototype.transition = nl;
const b = {
  uv: "uv",
  pos: "uv-div",
  frame: "uv-frame",
  panel: "uv-panel",
  bg: "uv-chart-bg",
  chart: "uv-chart",
  axes: "uv-axes",
  legend: "uv-legend",
  framebg: "uv-frame-bg",
  horaxis: "uv-hor-axis",
  veraxis: "uv-ver-axis",
  caption: "uv-caption",
  captiontext: "uv-caption-text",
  subcaption: "uv-subcaption",
  subcaptiontext: "uv-subcaption-text",
  axeslabelgroup: "uv-axes-label-group",
  axeslabel: "uv-axes-label",
  axessublabel: "uv-axes-sub-label",
  legendsign: "uv-legend-sign",
  legendlabel: "uv-legend-label",
  hoverbg: "uv-hover-bg",
  arc: "uv-arc-",
  areapath: "uv-areapath-",
  linepath: "uv-linepath-",
  area: "uv-area-",
  line: "uv-line-",
  dot: "uv-dot",
  chartdiv: "uv-chart-div",
  circleticks: "circle-ticks",
  download: "uv-download-options"
}, Cn = {
  Default: [
    "#5DA5DA",
    "#FAA43A",
    "#60BD68",
    "#F17CB0",
    "#B2912F",
    "#B276B2",
    "#DECF3F",
    "#F15854",
    "#4D4D4D"
  ],
  Plain: [
    "#1f77b4",
    "#ff7f0e",
    "#2ca02c",
    "#d62728",
    "#9467bd",
    "#8c564b",
    "#e377c2",
    "#7f7f7f",
    "#bcbd22",
    "#17becf"
  ],
  Olive: ["#B2C248", "#9DAA36", "#7A841B", "#5B6314", "#3D420E"],
  Soil: ["#B8997F", "#7D655B", "#705244", "#553C31", "#362318"],
  Candid: ["#EBEBEB", "#CCCCCC", "#999999", "#666666", "#333333"],
  Sulphide: ["#FFE589", "#B8A60B", "#8D8B00", "#616001", "#3D3D00"],
  Lint: ["#C8F7C5", "#86E2D5", "#52B3D9", "#4183D7", "#446CB3"],
  Cyanide: ["#E4F1FE", "#89C4F4", "#3498DB", "#2C82C9", "#22313F"],
  VioletRed: [
    "#F17CB0",
    "#C2185B",
    "#880E4F",
    "#6D1B7B",
    "#4A148C",
    "#311B92",
    "#283593",
    "#1565C0",
    "#0277BD"
  ],
  GreenBlue: [
    "#4DB6AC",
    "#00897B",
    "#00695C",
    "#004D40",
    "#00838F",
    "#006064",
    "#01579B",
    "#0D47A1",
    "#1A237E"
  ]
};
function rl() {
  return crypto.randomUUID();
}
function il(t, e) {
  switch (e) {
    case "stepup":
      return sl(t);
    case "normal":
      return al(t);
    case "percent":
      return 100;
    case "waterfall":
      return ol(t);
    default:
      return console.error("Unknown classification for chart", e), 0;
  }
}
function al(t) {
  let e = -1 / 0;
  for (const n of t.categories) {
    const r = t.dataset[n];
    if (r)
      for (const i of r)
        i.value > e && (e = i.value);
  }
  return e === -1 / 0 ? 0 : e;
}
function sl(t) {
  const e = t.categories[0];
  if (!e) return 0;
  const n = t.dataset[e];
  if (!n) return 0;
  const r = n.map(() => 0), i = n.map(() => 0);
  for (const a of t.categories) {
    const s = t.dataset[a];
    s && s.forEach((o, c) => {
      r[c] === void 0 || i[c] === void 0 || (o.resetSum === !0 && (r[c] = 0), r[c] += o.value, i[c] = Math.max(r[c], i[c]));
    });
  }
  return Math.max(...i);
}
function ol(t) {
  const e = t.categories.map(() => 0);
  return t.categories.forEach((n, r) => {
    const i = t.dataset[n];
    if (i) {
      let a = 0;
      for (const s of i)
        a += s.value, e[r] !== void 0 && e[r] < a && (e[r] = a);
    }
  }), Math.max(...e);
}
function ll(t, e) {
  switch (e) {
    case "normal":
      return cl(t);
    case "stepup":
      return ul(t);
    default:
      return 0;
  }
}
function cl(t) {
  let e = 1 / 0;
  for (const n of t.categories) {
    const r = t.dataset[n];
    if (r)
      for (const i of r)
        i.value < e && (e = i.value);
  }
  return Math.min(0, e === 1 / 0 ? 0 : e);
}
function ul(t) {
  const e = t.categories[0];
  if (!e) return 0;
  const n = t.dataset[e];
  if (!n) return 0;
  const r = n.map(() => 0), i = n.map(() => 0);
  for (const a of t.categories) {
    const s = t.dataset[a];
    s && s.forEach((o, c) => {
      r[c] === void 0 || i[c] === void 0 || (r[c] += o.value, i[c] = Math.min(r[c], i[c]));
    });
  }
  return Math.min(...i);
}
function dr(t) {
  return t.categories.map((e) => t.dataset[e] ?? []);
}
function fl(t, e = 0) {
  const n = t.categories[e], r = n ? t.dataset[n] : void 0;
  return r ? r.map((i) => i.name) : [];
}
function hl(t) {
  return [...t.categories];
}
function Ye(t, e) {
  return e.map((n) => {
    const r = t.dataset[n];
    return r ? r.map((i) => i.value) : [];
  });
}
function w(t) {
  return t.trim().replace(/[^A-Za-z0-9_-]/g, "-").toLowerCase();
}
function E(t, e) {
  const { custompalette: n, palette: r } = t.graph;
  if (n && n.length > 0)
    return n[e % n.length] ?? "#000000";
  const a = Cn[r] ?? Cn.Default;
  return a[e % a.length] ?? "#000000";
}
function Qt(t) {
  if (t === null || typeof t != "object")
    return t;
  if (Array.isArray(t))
    return t.map((n) => Qt(n));
  const e = {};
  for (const n in t)
    Object.prototype.hasOwnProperty.call(t, n) && (e[n] = Qt(t[n]));
  return e;
}
function gl(t, ...e) {
  const n = Qt(t);
  for (const r of e)
    if (r) {
      for (const i in r)
        if (Object.prototype.hasOwnProperty.call(r, i)) {
          const a = r[i], s = n[i];
          a !== null && typeof a == "object" && !Array.isArray(a) && s !== null && typeof s == "object" && !Array.isArray(s) ? n[i] = gl(
            s,
            a
          ) : n[i] = Qt(a);
        }
    }
  return n;
}
function ut(t, e) {
  if (t.label.formatter !== void 0)
    return t.label.formatter(e.value);
  const n = e.value % 1 === 0 ? e.value : e.value.toFixed(t.label.precision);
  return `${t.label.prefix}${n}${t.label.suffix}`;
}
function O(t, e, n, r) {
  if (!t.tooltip.show)
    return "";
  const i = t.tooltip.format;
  return i === "" ? `${e} [${n}] : ${ut(t, r)}` : i.replace(/%c/gi, e).replace(/%l/gi, n).replace(/%v/gi, ut(t, r));
}
function dl(t, e) {
  const n = JSON.parse(JSON.stringify(t));
  for (const r of Object.keys(e)) {
    const i = e[r];
    if (i !== void 0 && typeof i == "object" && i !== null) {
      const a = n, s = r;
      a[s] = { ...a[s], ...i };
    }
  }
  return n;
}
class Q {
  /**
   * Create a new Graph instance
   * @param graphdef - Data definition for the chart
   * @param config - Partial configuration to override defaults
   */
  constructor(e, n = {}) {
    /** Unique identifier for this graph instance */
    C(this, "id");
    /** Graph data definition */
    C(this, "graphdef");
    /** Merged configuration */
    C(this, "config");
    /** SVG frame element */
    C(this, "frame", null);
    /** Main panel group element */
    C(this, "panel", null);
    /** Chart content group */
    C(this, "chart", null);
    /** Background rectangle */
    C(this, "bg", null);
    /** Caption group */
    C(this, "captionGroup", null);
    /** Sub-caption group */
    C(this, "subCaptionGroup", null);
    /** Effects object for interactions */
    C(this, "effects", {});
    /** Axes state */
    C(this, "axes", {
      hor: { group: null, scale: null, func: null, axis: null, line: null, label: null },
      ver: { group: null, scale: null, func: null, axis: null, line: null, label: null },
      meta: { min: null, max: null }
    });
    /** Labels extracted from data */
    C(this, "labels", []);
    /** Categories extracted from data */
    C(this, "categories", []);
    /** Legends selection */
    C(this, "legends", null);
    /** Position selector cache */
    C(this, "_position");
    this.id = rl(), this.graphdef = e, this.config = dl(Sr, n), this._position = this.config.meta.position;
  }
  // ===========================================================================
  // Initialization Chain
  // ===========================================================================
  /**
   * Initialize the graph with all common elements
   * @returns this for method chaining
   */
  init() {
    return this.calculateMaxMin().setFrame().setPanel().setBackground().setCaption().setSubCaption().setMetadata().setHorizontalAxis().setVerticalAxis().setEffectsObject(), this.config.legend.showlegends && this.setLegend(), this;
  }
  /**
   * Finalize the graph after chart content is drawn
   * @returns this for method chaining
   */
  finalize() {
    return this.drawHorizontalAxis().drawVerticalAxis(), this.frame && this.frame.selectAll("text").style("cursor", "default"), this;
  }
  // ===========================================================================
  // Dimension Getters
  // ===========================================================================
  /** Get chart width */
  width() {
    return this.config.dimension.width;
  }
  /** Get chart height */
  height() {
    return this.config.dimension.height;
  }
  /** Get top margin */
  top() {
    return this.config.margin.top;
  }
  /** Get bottom margin */
  bottom() {
    return this.config.margin.bottom;
  }
  /** Get left margin */
  left() {
    return this.config.margin.left;
  }
  /** Get right margin */
  right() {
    return this.config.margin.right;
  }
  /** Get the container position selector */
  get position() {
    return this._position;
  }
  // ===========================================================================
  // Max/Min Calculation
  // ===========================================================================
  /**
   * Calculate and cache max/min values
   */
  calculateMaxMin() {
    const e = this.graphdef.stepup ?? "normal";
    return this.axes.meta.max = il(this.graphdef, e), this.axes.meta.min = ll(this.graphdef, e), this;
  }
  /** Get maximum value */
  getMaxValue() {
    return this.axes.meta.max ?? 0;
  }
  /** Get minimum value */
  getMinValue() {
    return this.axes.meta.min ?? 0;
  }
  // ===========================================================================
  // Frame & Panel Setup
  // ===========================================================================
  /**
   * Create the main SVG frame element
   */
  setFrame() {
    const n = sa(this.position || "body").append("div").classed(b.chartdiv, !0).style("display", "inline-block").style("width", "100%").style("height", "100%");
    this.frame = n.append("svg"), this.frame.attr("id", `${b.uv}-${this.id}`).classed(b.frame, !0);
    const r = this.width() + this.left() + this.right(), i = this.height() + this.top() + this.bottom();
    return this.config.graph.responsive ? this.frame.attr("width", "100%").attr("height", "100%").attr("preserveAspectRatio", `${this.config.graph.align} ${this.config.graph.meetOrSlice}`).attr("viewBox", `0 0 ${r} ${i}`) : this.frame.attr("width", r).attr("height", i), this.frame.append("rect").classed(b.framebg, !0).attr("width", r).attr("height", i).style("fill", this.config.frame.bgcolor), this;
  }
  /**
   * Create the main panel group with margins applied
   */
  setPanel() {
    return this.frame ? (this.panel = this.frame.append("g"), this.panel.attr("id", `${b.panel}-${this.id}`).classed(b.panel, !0).attr("transform", `translate(${this.left()},${this.top()})`), this) : this;
  }
  /**
   * Create the chart background rectangle
   */
  setBackground() {
    return this.panel ? (this.bg = this.panel.append("rect").classed(b.bg, !0).attr("height", this.height()).attr("width", this.width()).style("fill", this.config.graph.bgcolor), this.chart = this.panel.append("g").classed(b.chart, !0).style("opacity", this.config.graph.opacity), this) : this;
  }
  // ===========================================================================
  // Caption & Metadata
  // ===========================================================================
  /**
   * Create the main caption
   */
  setCaption() {
    return this.panel ? (this.captionGroup = this.panel.append("g").classed(b.caption, !0), this.captionGroup.append("text").classed(b.captiontext, !0).text(this.config.meta.caption).attr("y", -this.config.margin.top / 2).attr("x", this.config.dimension.width / 2).attr("text-anchor", this.config.caption.textanchor).style("font-family", this.config.caption.fontfamily).style("font-size", this.config.caption.fontsize).style("font-weight", this.config.caption.fontweight).style("font-variant", this.config.caption.fontvariant).style("text-decoration", this.config.caption.textdecoration), this) : this;
  }
  /**
   * Create the sub-caption
   */
  setSubCaption() {
    if (!this.panel) return this;
    this.subCaptionGroup = this.panel.append("g").classed(b.subcaption, !0);
    const e = parseInt(this.config.caption.fontsize, 10) || 14;
    return this.subCaptionGroup.append("text").classed(b.subcaptiontext, !0).text(this.config.meta.subcaption).attr("y", -this.config.margin.top / 2 + e).attr("x", this.config.dimension.width / 2).attr("text-anchor", this.config.subCaption.textanchor).style("font-family", this.config.subCaption.fontfamily).style("font-size", this.config.subCaption.fontsize).style("font-weight", this.config.subCaption.fontweight).style("font-variant", this.config.subCaption.fontvariant).style("text-decoration", this.config.subCaption.textdecoration), this;
  }
  /**
   * Extract and store labels and categories from data
   */
  setMetadata() {
    return this.labels = fl(this.graphdef), this.categories = hl(this.graphdef), this;
  }
  // ===========================================================================
  // Axis Setup (D3 v7)
  // ===========================================================================
  /**
   * Set up horizontal axis scale and function
   */
  setHorizontalAxis() {
    if (!this.panel) return this;
    if (this.axes.hor.group || (this.axes.hor.group = this.panel.append("g").classed(b.horaxis, !0).attr("transform", `translate(0,${this.height()})`).style("shape-rendering", "crispEdges")), this.config.graph.orientation === "Horizontal") {
      const e = this.config.scale.type, n = e === "log" ? 1 : this.getMinValue();
      e === "log" ? this.axes.hor.scale = $e().domain([n, this.getMaxValue()]).range([0, this.width()]).nice() : this.axes.hor.scale = ke().domain([n, this.getMaxValue()]).range([0, this.width()]).nice(), this.axes.hor.func = wn(this.axes.hor.scale).ticks(this.config.axis.ticks).tickSize(-this.height()).tickPadding(this.config.axis.padding);
    } else
      this.axes.hor.scale = xe().domain(this.labels).range([0, this.width()]).padding(this.config.scale.ordinality), this.axes.hor.func = wn(this.axes.hor.scale).tickPadding(this.config.axis.padding), (!this.config.axis.showtext || !this.config.axis.showhortext) && this.axes.hor.func.tickSize(0);
    return (!this.config.axis.showtext || !this.config.axis.showhortext) && this.axes.hor.func.tickFormat(() => ""), this;
  }
  /**
   * Set up vertical axis scale and function
   */
  setVerticalAxis() {
    if (!this.panel) return this;
    if (this.axes.ver.group || (this.axes.ver.group = this.panel.append("g").classed(b.veraxis, !0).style("shape-rendering", "crispEdges")), this.config.graph.orientation === "Vertical") {
      const e = this.config.scale.type, n = e === "log" ? 1 : this.getMinValue();
      e === "log" ? this.axes.ver.scale = $e().domain([this.getMaxValue(), n]).range([0, this.height()]).nice() : this.axes.ver.scale = ke().domain([this.getMaxValue(), n]).range([0, this.height()]).nice(), this.axes.ver.func = vn(this.axes.ver.scale).ticks(this.config.axis.ticks).tickSize(-this.width()).tickPadding(this.config.axis.padding);
    } else
      this.axes.ver.scale = xe().domain(this.labels).range([0, this.height()]).padding(this.config.scale.ordinality), this.axes.ver.func = vn(this.axes.ver.scale).tickPadding(this.config.axis.padding), (!this.config.axis.showtext || !this.config.axis.showvertext) && this.axes.ver.func.tickSize(0);
    return (!this.config.axis.showtext || !this.config.axis.showvertext) && this.axes.ver.func.tickFormat(() => ""), this;
  }
  /**
   * Draw the horizontal axis
   */
  drawHorizontalAxis() {
    if (!this.axes.hor.group || !this.axes.hor.func) return this;
    if (this.axes.hor.axis = this.axes.hor.group.append("g").style("font-family", this.config.label.fontfamily).style("font-size", this.config.label.fontsize).style("font-weight", this.config.label.fontweight).call(this.axes.hor.func), this.config.axis.showticks && this.axes.hor.axis.selectAll("line").style("stroke", this.config.axis.strokecolor).style("opacity", this.config.axis.opacity), this.axes.hor.axis.selectAll("path").style("fill", "none"), this.panel) {
      const e = this.config.graph.orientation === "Horizontal" ? this.height() : this.axes.ver.scale(0) ?? this.height();
      this.axes.hor.line = this.panel.append("line").classed(b.horaxis, !0).attr("y1", e).attr("y2", e).attr("x1", 0).attr("x2", this.width()).style("stroke", this.config.axis.strokecolor);
      const n = parseInt(this.config.axis.fontsize, 10) || 14, r = parseInt(this.config.label.fontsize, 10) || 11;
      this.axes.hor.label = this.axes.hor.group.append("g").classed(b.axeslabelgroup, !0).attr(
        "transform",
        `translate(${this.width() / 2},${this.config.margin.bottom / 4 + r})`
      ), this.axes.hor.label.append("text").classed(b.axeslabel, !0).attr("text-anchor", "middle").style("font-size", this.config.axis.fontsize).style("font-family", this.config.axis.fontfamily).text(this.config.meta.hlabel), this.axes.hor.label.append("text").classed(b.axessublabel, !0).attr("y", n).attr("text-anchor", "middle").style("font-size", `${n - 2}px`).style("font-family", this.config.axis.fontfamily).text(this.config.meta.hsublabel);
    }
    return this;
  }
  /**
   * Draw the vertical axis
   */
  drawVerticalAxis() {
    if (!this.axes.ver.group || !this.axes.ver.func) return this;
    if (this.axes.ver.axis = this.axes.ver.group.append("g").classed(b.axes, !0).style("font-family", this.config.label.fontfamily).style("font-size", this.config.label.fontsize).style("font-weight", this.config.label.fontweight).call(this.axes.ver.func), this.config.axis.showticks && this.axes.ver.axis.selectAll("line").style("stroke", this.config.axis.strokecolor).style("opacity", this.config.axis.opacity), this.axes.ver.axis.selectAll("path").style("fill", "none"), this.panel) {
      const e = this.config.graph.orientation === "Horizontal" ? this.axes.hor.scale(0) ?? 0 : 0;
      this.axes.ver.line = this.panel.append("line").classed(b.veraxis, !0).attr("x1", e).attr("x2", e).attr("y1", 0).attr("y2", this.height()).style("stroke", this.config.axis.strokecolor);
      const n = parseInt(this.config.axis.fontsize, 10) || 14;
      this.axes.ver.label = this.axes.ver.group.append("g").attr(
        "transform",
        `translate(${-4 * this.config.margin.left / 5},${this.height() / 2})rotate(270)`
      ), this.axes.ver.label.append("text").classed(b.axeslabel, !0).attr("text-anchor", "middle").style("font-family", this.config.axis.fontfamily).style("font-size", this.config.axis.fontsize).text(this.config.meta.vlabel), this.axes.ver.label.append("text").classed(b.axessublabel, !0).attr("text-anchor", "middle").attr("y", n).style("font-family", this.config.axis.fontfamily).style("font-size", `${n - 2}px`).text(this.config.meta.vsublabel);
    }
    return this;
  }
  // ===========================================================================
  // Effects & Legend
  // ===========================================================================
  /**
   * Initialize effects object for interactions
   */
  setEffectsObject() {
    const e = this.config.legend.legendtype === "categories" ? this.categories : this.labels;
    for (const n of e)
      this.effects[n] = {};
    return this;
  }
  /**
   * Create the legend
   */
  setLegend() {
    if (!this.panel) return this;
    const e = this.config.legend.legendtype === "categories" ? this.categories : this.labels;
    let n;
    this.config.legend.position === "right" ? n = `translate(${this.width()}, 10)` : n = `translate(0, ${this.height() + this.config.margin.bottom / 2 + parseInt(this.config.axis.fontsize, 10)})`;
    const r = this.panel.append("g").classed(b.legend, !0).attr("transform", n);
    let i = 0;
    const a = this, s = r.selectAll("g").data(e).enter().append("g").attr("transform", (o, c) => {
      if (a.config.legend.position === "right")
        return `translate(10,${10 * (2 * c - 1)})`;
      {
        let l = 100 * c - a.config.dimension.width * i, u = 20 * i;
        return l >= a.config.dimension.width && (i++, l = 100 * c - a.config.dimension.width * i, u = 20 * i), `translate(${l},${u})`;
      }
    }).attr("class", (o) => `cl-${w(o)}`).attr("data-disabled", "false");
    return s.append("rect").classed(b.legendsign, !0).attr("height", this.config.legend.symbolsize).attr("width", this.config.legend.symbolsize).style("fill", (o, c) => E(this.config, c)).style("stroke", "none"), s.append("text").classed(b.legendlabel, !0).text((o) => o).attr("dx", this.config.legend.textmargin).attr("dy", ".71em").attr("text-anchor", "start").style("stroke", this.config.legend.color).style("fill", this.config.legend.color).style("stroke-width", this.config.legend.strokewidth).style("font-family", this.config.legend.fontfamily).style("font-size", this.config.legend.fontsize).style("font-weight", this.config.legend.fontweight), this.legends = r, this;
  }
  // ===========================================================================
  // Public API
  // ===========================================================================
  /**
   * Remove the chart from the DOM
   */
  destroy() {
    var e;
    if (this.frame) {
      const n = (e = this.frame.node()) == null ? void 0 : e.parentElement;
      n && n.remove();
    }
  }
  /**
   * Update the chart with new data
   * @param newData - New graph definition
   */
  update(e) {
    this.destroy(), this.graphdef = e, this.axes.meta.max = null, this.axes.meta.min = null, this.render();
  }
  /**
   * Toggle visibility of a category/series
   * @param index - Index of the category to toggle
   */
  toggleCategory(e) {
    const n = this.categories[e];
    if (!n || !this.frame) return this;
    const r = w(n), i = this.frame.selectAll(`g.cge-${r}`);
    if (i.empty()) return this;
    const a = i.style("display") ?? "";
    return i.style("display", a === "none" ? "" : "none"), this;
  }
}
class pr extends Q {
  /**
   * Create a new BarChart
   * @param graphdef - Data definition for the chart
   * @param config - Partial configuration to override defaults
   */
  constructor(n, r = {}) {
    n.stepup = "normal";
    super(n, r);
    /** Bar group elements by category */
    C(this, "bargroups", {});
  }
  /**
   * Render the bar chart
   */
  render() {
    this.init();
    const n = this.config.graph.orientation === "Horizontal" ? "ver" : "hor";
    this.axes[n].scale && this.axes[n].scale.domain(this.labels);
    for (let r = 0; r < this.categories.length; r++) {
      const i = this.categories[r];
      !i || !this.chart || (this.bargroups[i] = this.chart.append("g").classed(`cg-${w(i)}`, !0), this.config.graph.orientation === "Horizontal" ? this.drawHorizontalBars(r) : this.drawVerticalBars(r));
    }
    this.finalize();
  }
  /**
   * Draw horizontal bars for a category
   * @param idx - Category index
   */
  drawHorizontalBars(n) {
    const r = this.categories[n];
    if (!r) return;
    const i = this.graphdef.dataset[r];
    if (!i) return;
    const a = E(this.config, n), s = this.categories.length, o = this.bargroups[r];
    if (!o) return;
    const c = this.axes.ver.scale, l = this.axes.hor.scale, u = c.bandwidth() / s, h = o.selectAll("g").data(i).enter().append("g").classed(`cge-${w(r)}`, !0).attr("transform", (f) => f.value < 0 ? "scale(-1,1)" : "");
    h.append("rect").classed(w(r), !0).classed(`cr-${w(r)}`, !0).attr("height", u).attr("x", (f) => f.value < 0 ? -l(0) : l(0)).attr("y", (f) => c(f.name) ?? 0).attr("width", 0).style("stroke", this.config.bar.strokecolor).style("fill", a).transition().duration(this.config.effects.duration).delay((f, g) => g * this.config.effects.duration).attr("width", (f) => Math.abs(l(Math.abs(f.value)) - l(0))), this.config.label.showlabel && h.append("text").attr("x", l(0)).attr("y", (f) => (c(f.name) ?? 0) + u / 2).attr("dx", (f) => f.value < 0 ? "-20px" : "4px").attr("dy", ".35em").attr("text-anchor", "start").classed(`cr-${w(r)}`, !0).style("fill", a).style("font-family", this.config.bar.fontfamily).style("font-size", this.config.bar.fontsize).style("font-weight", this.config.bar.fontweight).style("opacity", 0).text((f) => ut(this.config, f)).transition().duration(this.config.effects.duration).delay((f, g) => g * this.config.effects.duration).style("opacity", 1).attr("x", (f) => l(f.value)), h.append("title").text((f, g) => O(this.config, r, this.labels[g] ?? "", f)), o.attr("transform", `translate(0,${n * c.bandwidth() / s})`);
  }
  /**
   * Draw vertical bars for a category
   * @param idx - Category index
   */
  drawVerticalBars(n) {
    const r = this.categories[n];
    if (!r) return;
    const i = this.graphdef.dataset[r];
    if (!i) return;
    const a = E(this.config, n), s = this.categories.length, o = this.bargroups[r];
    if (!o) return;
    const c = this.axes.hor.scale, l = this.axes.ver.scale, u = c.bandwidth() / s, h = o.selectAll("g").data(i).enter().append("g").classed(`cge-${w(r)}`, !0).attr("transform", (f) => f.value < 0 ? "scale(1,-1)" : "");
    h.append("rect").classed(w(r), !0).classed(`cr-${w(r)}`, !0).attr("height", 0).attr("width", u).attr("x", (f) => c(f.name) ?? 0).attr("y", (f) => (f.value < 0 ? -1 : 1) * (this.height() - l(0))).style("stroke", this.config.bar.strokecolor).style("fill", a).transition().duration(this.config.effects.duration).delay(n * this.config.effects.duration).attr("height", (f) => Math.abs(l(0) - l(f.value))), this.config.label.showlabel && h.append("text").attr("transform", (f) => f.value < 0 ? "scale(1,1)" : "scale(1,-1)").attr("x", (f) => (c(f.name) ?? 0) + u / 2).attr("y", this.height() - l(0)).attr("dx", 0).attr("dy", (f) => f.value < 0 ? "2em" : ".35em").attr("text-anchor", "middle").classed(`cr-${w(r)}`, !0).style("fill", a).style("font-family", this.config.bar.fontfamily).style("font-size", this.config.bar.fontsize).style("font-weight", this.config.bar.fontweight).style("opacity", 0).text((f) => ut(this.config, f)).transition().duration(this.config.effects.duration).delay(n * this.config.effects.duration).style("opacity", 1).attr("y", (f) => -(this.height() - l(f.value)) - 10), h.append("title").text((f, g) => O(this.config, r, this.labels[g] ?? "", f)), o.attr(
      "transform",
      `translate(${n * c.bandwidth() / s},${this.height()}) scale(1,-1)`
    );
  }
  /**
   * Create a bar chart
   * @param container - CSS selector for the container element
   * @param graphdef - Data definition
   * @param config - Optional configuration overrides
   */
  static create(n, r, i = {}) {
    const a = {
      ...i,
      meta: {
        ...i.meta,
        position: n
      }
    }, s = new pr(r, a);
    return s.render(), s;
  }
}
class yr extends Q {
  constructor(n, r = {}) {
    n.stepup = "normal";
    super(n, r);
    C(this, "dataset", []);
  }
  render() {
    this.init(), this.dataset = dr(this.graphdef);
    const n = this.config.graph.orientation === "Horizontal" ? "ver" : "hor";
    this.axes[n].scale && this.axes[n].scale.domain(this.labels);
    for (let r = 0; r < this.categories.length; r++) {
      const i = this.categories[r];
      if (!i || !this.chart) continue;
      const a = this.chart.append("g").classed(`cg-${w(i)}`, !0).append("g").classed(`cge-${w(i)}`, !0).datum(this.dataset[r] ?? []);
      this.config.graph.orientation === "Horizontal" ? this.drawHorizontalLines(a, r) : this.drawVerticalLines(a, r);
    }
    this.finalize();
  }
  drawVerticalLines(n, r) {
    const i = this.categories[r];
    if (!i) return;
    const a = E(this.config, r), s = this.axes.hor.scale, o = this.axes.ver.scale, c = nt().x((l) => (s(l.name) ?? 0) + s.bandwidth() / 2).y((l) => o(l.value)).curve(T);
    n.append("path").attr("d", c).classed(`cr-${w(i)}`, !0).style("fill", "none").style("stroke", a).style("stroke-width", this.config.line.strokewidth).style("stroke-opacity", 0).transition().duration(this.config.effects.duration).style("stroke-opacity", 1), this.config.line.showcircles && n.selectAll("circle").data(this.dataset[r] ?? []).enter().append("circle").classed(`cr-${w(i)}`, !0).attr("cx", (l) => (s(l.name) ?? 0) + s.bandwidth() / 2).attr("cy", (l) => o(l.value)).attr("r", this.config.line.circleradius).style("fill", a).style("stroke", "#fff").append("title").text((l, u) => O(this.config, i, this.labels[u] ?? "", l)), this.config.label.showlabel && n.selectAll("text").data(this.dataset[r] ?? []).enter().append("text").attr("x", (l) => (s(l.name) ?? 0) + s.bandwidth() / 2).attr("y", (l) => o(l.value) - 15).attr("text-anchor", "middle").style("fill", a).style("font-size", this.config.line.fontsize).style("opacity", 0).text((l) => ut(this.config, l)).transition().duration(this.config.effects.duration).style("opacity", 1);
  }
  drawHorizontalLines(n, r) {
    const i = this.categories[r];
    if (!i) return;
    const a = E(this.config, r), s = this.axes.hor.scale, o = this.axes.ver.scale, c = nt().x((l) => s(l.value)).y((l) => (o(l.name) ?? 0) + o.bandwidth() / 2).curve(T);
    n.append("path").attr("d", c).classed(`cr-${w(i)}`, !0).style("fill", "none").style("stroke", a).style("stroke-width", this.config.line.strokewidth).style("stroke-opacity", 0).transition().duration(this.config.effects.duration).style("stroke-opacity", 1), this.config.line.showcircles && n.selectAll("circle").data(this.dataset[r] ?? []).enter().append("circle").classed(`cr-${w(i)}`, !0).attr("cx", (l) => s(l.value)).attr("cy", (l) => (o(l.name) ?? 0) + o.bandwidth() / 2).attr("r", this.config.line.circleradius).style("fill", a).style("stroke", "#fff").append("title").text((l, u) => O(this.config, i, this.labels[u] ?? "", l));
  }
  static create(n, r, i = {}) {
    const a = {
      ...i,
      meta: { ...i.meta, position: n }
    }, s = new yr(r, a);
    return s.render(), s;
  }
}
class mr extends Q {
  constructor(n, r = {}) {
    n.stepup = "normal";
    super(n, r);
    C(this, "dataset", []);
  }
  render() {
    this.init(), this.dataset = dr(this.graphdef);
    const n = this.config.graph.orientation === "Horizontal" ? "ver" : "hor";
    this.axes[n].scale && this.axes[n].scale.domain(this.labels);
    for (let r = 0; r < this.dataset.length; r++) {
      const i = this.categories[r];
      if (!i || !this.chart) continue;
      const a = this.chart.append("g").classed(`cg-${w(i)}`, !0).append("g").classed(`cge-${w(i)}`, !0).datum(this.dataset[r] ?? []);
      this.config.graph.orientation === "Horizontal" ? this.drawHorizontalArea(a, r) : this.drawVerticalArea(a, r);
    }
    this.finalize();
  }
  drawVerticalArea(n, r) {
    if (!this.categories[r]) return;
    const a = E(this.config, r), s = this.axes.hor.scale, o = this.axes.ver.scale, c = nt().x((u) => (s(u.name) ?? 0) + s.bandwidth() / 2).y((u) => o(u.value)).curve(T), l = yt().x((u) => (s(u.name) ?? 0) + s.bandwidth() / 2).y0(o(0)).y1((u) => o(u.value)).curve(T);
    n.append("path").classed(`${b.areapath}${r}`, !0).attr("d", l).style("fill", a).style("opacity", this.config.area.opacity), n.append("path").classed(`${b.linepath}${r}`, !0).attr("d", c).style("stroke", a).style("fill", "none"), n.selectAll(`.${b.dot}`).data(this.dataset[r] ?? []).enter().append("circle").classed(b.dot, !0).attr("cx", (u) => (s(u.name) ?? 0) + s.bandwidth() / 2).attr("cy", (u) => o(u.value)).attr("r", 3.5).style("fill", a);
  }
  drawHorizontalArea(n, r) {
    if (!this.categories[r]) return;
    const a = E(this.config, r), s = this.axes.hor.scale, o = this.axes.ver.scale, c = nt().x((u) => s(u.value)).y((u) => (o(u.name) ?? 0) + o.bandwidth() / 2).curve(T), l = yt().x0(s(0)).x1((u) => s(u.value)).y((u) => (o(u.name) ?? 0) + o.bandwidth() / 2).curve(T);
    n.append("path").classed(`${b.areapath}${r}`, !0).attr("d", l).style("fill", a).style("opacity", this.config.area.opacity), n.append("path").classed(`${b.linepath}${r}`, !0).attr("d", c).style("stroke", a).style("fill", "none"), n.selectAll(`.${b.dot}`).data(this.dataset[r] ?? []).enter().append("circle").classed(b.dot, !0).attr("cx", (u) => s(u.value)).attr("cy", (u) => (o(u.name) ?? 0) + o.bandwidth() / 2).attr("r", 3.5).style("fill", a);
  }
  static create(n, r, i = {}) {
    const a = {
      ...i,
      meta: { ...i.meta, position: n }
    }, s = new mr(r, a);
    return s.render(), s;
  }
}
class Ge extends Q {
  constructor(n, r = {}) {
    n.stepup = "normal";
    super(n, {
      ...r,
      legend: { ...r.legend, legendtype: "labels" }
    });
    C(this, "radius", 0);
    C(this, "center", { x: 0, y: 0 });
    C(this, "category", "");
  }
  render() {
    this.init(), this.radius = Math.min(this.height(), this.width()) * 2 / 5, this.center = {
      x: this.width() / 2,
      y: this.height() / 2
    };
    const n = this.graphdef.categories[0];
    if (!n || !this.chart) return;
    this.category = n;
    const r = Ye(this.graphdef, [this.category])[0] ?? [], i = Pe().innerRadius(0).outerRadius(this.radius), s = Le().value((c) => c)(r), o = this.chart.selectAll("g.arc").data(s).enter().append("g").classed(`${b.arc}${w(this.category)}`, !0).attr("class", (c, l) => `cge-${w(this.labels[l] ?? "")}`).attr("transform", `translate(${this.center.x},${this.center.y})`);
    o.append("path").attr("d", i).style("fill", (c, l) => E(this.config, l)).style("stroke", this.config.pie.strokecolor).style("stroke-width", this.config.pie.strokewidth), this.config.label.showlabel && o.append("text").attr("transform", (c) => `translate(${i.centroid(c)})`).attr("dy", ".35em").attr("text-anchor", "middle").style("fill", this.config.pie.fontfill).style("font-family", this.config.pie.fontfamily).style("font-size", this.config.pie.fontsize).style("font-weight", this.config.pie.fontweight).text((c) => ut(this.config, { value: c.data })), o.append("title").text(
      (c, l) => O(this.config, this.category, this.labels[l] ?? "", {
        name: this.labels[l] ?? "",
        value: c.data
      })
    );
  }
  static create(n, r, i = {}) {
    const a = {
      ...i,
      meta: { ...i.meta, position: n }
    }, s = new Ge(r, a);
    return s.render(), s;
  }
}
class xr extends Ge {
  render() {
    this.init(), this.radius = Math.min(this.height(), this.width()) * 2 / 5, this.center = {
      x: this.width() / 2,
      y: this.height() / 2
    };
    const e = this.graphdef.categories[0];
    if (!e || !this.chart) return;
    this.category = e;
    const n = Ye(this.graphdef, [this.category])[0] ?? [], r = this.radius * (this.config.donut.factor ?? 0.4), i = Pe().innerRadius(r).outerRadius(this.radius), s = Le().value((c) => c)(n), o = this.chart.selectAll("g.arc").data(s).enter().append("g").classed(`${b.arc}${w(this.category)}`, !0).attr("class", (c, l) => `cge-${w(this.labels[l] ?? "")}`).attr("transform", `translate(${this.center.x},${this.center.y})`);
    o.append("path").attr("d", i).style("fill", (c, l) => E(this.config, l)).style("stroke", this.config.donut.strokecolor).style("stroke-width", this.config.donut.strokewidth), this.config.label.showlabel && o.append("text").attr("transform", (c) => `translate(${i.centroid(c)})`).attr("dy", ".35em").attr("text-anchor", "middle").style("fill", this.config.donut.fontfill).style("font-family", this.config.donut.fontfamily).style("font-size", this.config.donut.fontsize).style("font-weight", this.config.donut.fontweight).text((c) => ut(this.config, { value: c.data })), o.append("title").text(
      (c, l) => O(this.config, this.category, this.labels[l] ?? "", {
        name: this.labels[l] ?? "",
        value: c.data
      })
    );
  }
  static create(e, n, r = {}) {
    const i = {
      ...r,
      meta: { ...r.meta, position: e }
    }, a = new xr(n, i);
    return a.render(), a;
  }
}
class wr extends Q {
  constructor(n, r = {}) {
    n.stepup = "stepup";
    super(n, r);
    C(this, "bargroups", {});
  }
  render() {
    this.init();
    const n = this.config.graph.orientation === "Horizontal" ? "ver" : "hor";
    this.axes[n].scale && this.axes[n].scale.domain(this.labels);
    const r = this.labels.map(() => 0);
    for (let i = 0; i < this.categories.length; i++) {
      const a = this.categories[i];
      !a || !this.chart || (this.bargroups[a] = this.chart.append("g").classed(`cg-${w(a)}`, !0), this.config.graph.orientation === "Horizontal" ? this.drawHorizontalBars(i, r) : this.drawVerticalBars(i, r));
    }
    this.finalize();
  }
  drawVerticalBars(n, r) {
    const i = this.categories[n];
    if (!i) return;
    const a = this.graphdef.dataset[i];
    if (!a) return;
    const s = E(this.config, n), o = this.bargroups[i];
    if (!o) return;
    const c = this.axes.hor.scale, l = this.axes.ver.scale, u = o.selectAll("g").data(a).enter().append("g").classed(`cge-${w(i)}`, !0);
    u.append("rect").classed(`cr-${w(i)}`, !0).attr("width", c.bandwidth()).attr("x", (h) => c(h.name) ?? 0).attr("y", (h, f) => (r[f] = (r[f] ?? 0) + h.value, l(r[f] ?? 0))).attr("height", 0).style("fill", s).style("stroke", "none").transition().duration(this.config.effects.duration).delay(n * this.config.effects.duration).attr("height", (h) => Math.abs(l(0) - l(h.value))), u.append("title").text((h, f) => O(this.config, i, this.labels[f] ?? "", h)), o.attr("transform", `translate(0,${2 * this.height()}) scale(1,-1)`);
  }
  drawHorizontalBars(n, r) {
    const i = this.categories[n];
    if (!i) return;
    const a = this.graphdef.dataset[i];
    if (!a) return;
    const s = E(this.config, n), o = this.bargroups[i];
    if (!o) return;
    const c = this.axes.hor.scale, l = this.axes.ver.scale, u = o.selectAll("g").data(a).enter().append("g").classed(`cge-${w(i)}`, !0);
    u.append("rect").classed(`cr-${w(i)}`, !0).attr("height", l.bandwidth()).attr("x", (h, f) => {
      const g = c(r[f] ?? 0);
      return r[f] = (r[f] ?? 0) + h.value, g;
    }).attr("y", (h) => l(h.name) ?? 0).attr("width", 0).style("fill", s).style("stroke", "none").transition().duration(this.config.effects.duration).delay(n * this.config.effects.duration).attr("width", (h) => Math.abs(c(h.value) - c(0))), u.append("title").text((h, f) => O(this.config, i, this.labels[f] ?? "", h));
  }
  static create(n, r, i = {}) {
    const a = {
      ...i,
      meta: { ...i.meta, position: n }
    }, s = new wr(r, a);
    return s.render(), s;
  }
}
class vr extends Q {
  constructor(e, n = {}) {
    e.stepup = "stepup", super(e, n);
  }
  render() {
    this.init();
    const e = this.config.graph.orientation === "Horizontal" ? "ver" : "hor";
    this.axes[e].scale && this.axes[e].scale.domain(this.labels);
    const n = this.prepareStackData(), i = ar().keys(this.categories)(n);
    if (!this.chart) return;
    const a = this.chart.selectAll("g").data(i).enter().append("g").attr("class", (s) => `cge-${w(s.key)}`);
    this.config.graph.orientation === "Horizontal" ? this.drawHorizontalArea(a) : this.drawVerticalArea(a), this.finalize();
  }
  prepareStackData() {
    var n;
    const e = [];
    for (let r = 0; r < this.labels.length; r++) {
      const i = { name: this.labels[r] ?? "" };
      for (const a of this.categories) {
        const s = this.graphdef.dataset[a];
        i[a] = ((n = s == null ? void 0 : s[r]) == null ? void 0 : n.value) ?? 0;
      }
      e.push(i);
    }
    return e;
  }
  drawVerticalArea(e) {
    const n = this.axes.hor.scale, r = this.axes.ver.scale, i = yt().x((s) => (n(s.data.name) ?? 0) + n.bandwidth() / 2).y0((s) => r(s[0])).y1((s) => r(s[1])).curve(T), a = nt().x((s) => (n(s.data.name) ?? 0) + n.bandwidth() / 2).y((s) => r(s[1])).curve(T);
    e.append("path").attr("class", (s) => `${b.area}${w(s.key)}`).style("fill", (s, o) => E(this.config, o)).attr("d", i), e.append("path").attr("class", (s) => `${b.line}${w(s.key)}`).style("stroke", "white").style("fill", "none").style("stroke-width", 2).attr("d", a);
  }
  drawHorizontalArea(e) {
    const n = this.axes.hor.scale, r = this.axes.ver.scale, i = yt().y((s) => (r(s.data.name) ?? 0) + r.bandwidth() / 2).x0((s) => n(s[0])).x1((s) => n(s[1])).curve(T), a = nt().y((s) => (r(s.data.name) ?? 0) + r.bandwidth() / 2).x((s) => n(s[1])).curve(T);
    e.append("path").attr("class", (s) => `${b.area}${w(s.key)}`).style("fill", (s, o) => E(this.config, o)).attr("d", i), e.append("path").attr("class", (s) => `${b.line}${w(s.key)}`).style("stroke", "white").style("fill", "none").style("stroke-width", 2).attr("d", a);
  }
  static create(e, n, r = {}) {
    const i = {
      ...r,
      meta: { ...r.meta, position: e }
    }, a = new vr(n, i);
    return a.render(), a;
  }
}
class br extends Q {
  constructor(n, r = {}) {
    n.stepup = "percent";
    super(n, r);
    C(this, "bargroups", {});
  }
  render() {
    this.init();
    const n = this.config.graph.orientation === "Horizontal" ? "ver" : "hor";
    this.axes[n].scale && this.axes[n].scale.domain(this.labels);
    const r = this.calculateTotals(), i = this.labels.map(() => 0);
    for (let a = 0; a < this.categories.length; a++) {
      const s = this.categories[a];
      !s || !this.chart || (this.bargroups[s] = this.chart.append("g").classed(`cg-${w(s)}`, !0), this.config.graph.orientation === "Horizontal" ? this.drawHorizontalBars(a, i, r) : this.drawVerticalBars(a, i, r));
    }
    this.finalize();
  }
  calculateTotals() {
    const n = this.labels.map(() => 0);
    for (const r of this.categories) {
      const i = this.graphdef.dataset[r];
      i && i.forEach((a, s) => {
        n[s] = (n[s] ?? 0) + a.value;
      });
    }
    return n;
  }
  drawVerticalBars(n, r, i) {
    const a = this.categories[n];
    if (!a) return;
    const s = this.graphdef.dataset[a];
    if (!s) return;
    const o = E(this.config, n), c = this.bargroups[a];
    if (!c) return;
    const l = this.axes.hor.scale, u = this.axes.ver.scale, h = c.selectAll("g").data(s).enter().append("g").classed(`cge-${w(a)}`, !0);
    h.append("rect").classed(`cr-${w(a)}`, !0).attr("width", l.bandwidth()).attr("x", (f) => l(f.name) ?? 0).attr("y", (f, g) => {
      const d = f.value / (i[g] ?? 1) * 100;
      return r[g] = (r[g] ?? 0) + d, u(r[g] ?? 0);
    }).attr("height", 0).style("fill", o).transition().duration(this.config.effects.duration).attr("height", (f, g) => {
      const d = f.value / (i[g] ?? 1) * 100;
      return Math.abs(u(0) - u(d));
    }), h.append("title").text((f, g) => O(this.config, a, this.labels[g] ?? "", f)), c.attr("transform", `translate(0,${2 * this.height()}) scale(1,-1)`);
  }
  drawHorizontalBars(n, r, i) {
    const a = this.categories[n];
    if (!a) return;
    const s = this.graphdef.dataset[a];
    if (!s) return;
    const o = E(this.config, n), c = this.bargroups[a];
    if (!c) return;
    const l = this.axes.hor.scale, u = this.axes.ver.scale, h = c.selectAll("g").data(s).enter().append("g").classed(`cge-${w(a)}`, !0);
    h.append("rect").classed(`cr-${w(a)}`, !0).attr("height", u.bandwidth()).attr("x", (f, g) => {
      const d = l(r[g] ?? 0), p = f.value / (i[g] ?? 1) * 100;
      return r[g] = (r[g] ?? 0) + p, d;
    }).attr("y", (f) => u(f.name) ?? 0).attr("width", 0).style("fill", o).transition().duration(this.config.effects.duration).attr("width", (f, g) => {
      const d = f.value / (i[g] ?? 1) * 100;
      return Math.abs(l(d) - l(0));
    }), h.append("title").text((f, g) => O(this.config, a, this.labels[g] ?? "", f));
  }
  static create(n, r, i = {}) {
    const a = {
      ...i,
      meta: { ...i.meta, position: n }
    }, s = new br(r, a);
    return s.render(), s;
  }
}
class _r extends Q {
  constructor(e, n = {}) {
    e.stepup = "percent", super(e, n);
  }
  render() {
    this.init();
    const e = this.config.graph.orientation === "Horizontal" ? "ver" : "hor";
    this.axes[e].scale && this.axes[e].scale.domain(this.labels);
    const n = this.prepareStackData(), i = ar().keys(this.categories).offset(Ps)(n);
    if (!this.chart) return;
    const a = this.chart.selectAll("g").data(i).enter().append("g").attr("class", (s) => `cge-${w(s.key)}`);
    this.config.graph.orientation === "Horizontal" ? this.drawHorizontalArea(a) : this.drawVerticalArea(a), this.finalize();
  }
  prepareStackData() {
    var n;
    const e = [];
    for (let r = 0; r < this.labels.length; r++) {
      const i = { name: this.labels[r] ?? "" };
      for (const a of this.categories) {
        const s = this.graphdef.dataset[a];
        i[a] = ((n = s == null ? void 0 : s[r]) == null ? void 0 : n.value) ?? 0;
      }
      e.push(i);
    }
    return e;
  }
  drawVerticalArea(e) {
    const n = this.axes.hor.scale, r = this.axes.ver.scale, i = yt().x((s) => (n(s.data.name) ?? 0) + n.bandwidth() / 2).y0((s) => r(s[0] * 100)).y1((s) => r(s[1] * 100)).curve(T), a = nt().x((s) => (n(s.data.name) ?? 0) + n.bandwidth() / 2).y((s) => r(s[1] * 100)).curve(T);
    e.append("path").attr("class", (s) => `${b.area}${w(s.key)}`).style("fill", (s, o) => E(this.config, o)).attr("d", i), e.append("path").attr("class", (s) => `${b.line}${w(s.key)}`).style("stroke", "white").style("fill", "none").style("stroke-width", 2).attr("d", a);
  }
  drawHorizontalArea(e) {
    const n = this.axes.hor.scale, r = this.axes.ver.scale, i = yt().y((s) => (r(s.data.name) ?? 0) + r.bandwidth() / 2).x0((s) => n(s[0] * 100)).x1((s) => n(s[1] * 100)).curve(T), a = nt().y((s) => (r(s.data.name) ?? 0) + r.bandwidth() / 2).x((s) => n(s[1] * 100)).curve(T);
    e.append("path").attr("class", (s) => `${b.area}${w(s.key)}`).style("fill", (s, o) => E(this.config, o)).attr("d", i), e.append("path").attr("class", (s) => `${b.line}${w(s.key)}`).style("stroke", "white").style("fill", "none").style("stroke-width", 2).attr("d", a);
  }
  static create(e, n, r = {}) {
    const i = {
      ...r,
      meta: { ...r.meta, position: e }
    }, a = new _r(n, i);
    return a.render(), a;
  }
}
class kr extends Q {
  constructor(n, r = {}) {
    n.stepup = "normal";
    super(n, { ...r, legend: { ...r.legend, legendtype: "labels" } });
    C(this, "radius", 0);
    C(this, "center", { x: 0, y: 0 });
    C(this, "category", "");
  }
  render() {
    this.init(), this.radius = Math.min(this.height(), this.width()) * 2 / 5, this.center = { x: this.width() / 2, y: this.height() / 2 };
    const n = this.graphdef.categories[0];
    if (!n || !this.chart) return;
    this.category = n;
    const r = Ye(this.graphdef, [this.category])[0] ?? [], i = Math.max(...r), s = Le().value(() => 1)(r), o = this.chart.selectAll("g.arc").data(s).enter().append("g").classed(`${b.arc}${w(this.category)}`, !0).attr("class", (c, l) => `cge-${w(this.labels[l] ?? "")}`).attr("transform", `translate(${this.center.x},${this.center.y})`);
    o.append("path").attr("d", (c) => {
      const l = c.data / i * this.radius;
      return Pe().innerRadius(0).outerRadius(l)(c);
    }).style("fill", (c, l) => E(this.config, l)).style("stroke", this.config.pie.strokecolor).style("stroke-width", this.config.pie.strokewidth), o.append("title").text(
      (c, l) => O(this.config, this.category, this.labels[l] ?? "", {
        name: this.labels[l] ?? "",
        value: c.data
      })
    );
  }
  static create(n, r, i = {}) {
    const a = {
      ...i,
      meta: { ...i.meta, position: n }
    }, s = new kr(r, a);
    return s.render(), s;
  }
}
class $r extends Q {
  constructor(e, n = {}) {
    e.stepup = "waterfall", super(e, n);
  }
  render() {
    this.init();
    const e = this.graphdef.categories[0];
    if (!e || !this.chart) return;
    const n = this.graphdef.dataset[e];
    if (!n) return;
    this.axes.hor.scale && this.axes.hor.scale.domain(this.labels);
    const r = this.axes.hor.scale, i = this.axes.ver.scale;
    let a = 0;
    const s = this.chart.selectAll("g.waterfall-bar").data(n).enter().append("g").classed("waterfall-bar", !0).classed(`cge-${w(e)}`, !0);
    s.append("rect").attr("x", (c) => r(c.name) ?? 0).attr("width", r.bandwidth()).attr("y", (c) => {
      const l = i(a), u = i(a + c.value);
      return Math.min(l, u);
    }).attr("height", (c) => {
      const l = Math.abs(i(a) - i(a + c.value));
      return a += c.value, l;
    }).style(
      "fill",
      (c, l) => c.value >= 0 ? E(this.config, 0) : E(this.config, 1)
    ).style("stroke", this.config.bar.strokecolor), a = 0;
    const o = [];
    n.forEach((c, l) => {
      var u;
      l > 0 && o.push({
        from: a,
        to: a,
        xFrom: (r(((u = n[l - 1]) == null ? void 0 : u.name) ?? "") ?? 0) + r.bandwidth(),
        xTo: r(c.name) ?? 0
      }), a += c.value;
    }), this.chart.selectAll("line.connector").data(o).enter().append("line").classed("connector", !0).attr("x1", (c) => c.xFrom).attr("x2", (c) => c.xTo).attr("y1", (c) => i(c.from)).attr("y2", (c) => i(c.to)).style("stroke", "#999").style("stroke-dasharray", "3,3"), s.append("title").text((c, l) => O(this.config, e, this.labels[l] ?? "", c)), this.finalize();
  }
  static create(e, n, r = {}) {
    const i = {
      ...r,
      meta: { ...r.meta, position: e }
    }, a = new $r(n, i);
    return a.render(), a;
  }
}
export {
  mr as AreaChart,
  pr as BarChart,
  b as CssClasses,
  xr as DonutChart,
  Q as Graph,
  yr as LineChart,
  _r as PercentAreaChart,
  br as PercentBarChart,
  Ge as PieChart,
  kr as PolarAreaChart,
  vr as StackedAreaChart,
  wr as StackedBarChart,
  $r as WaterfallChart,
  gl as deepMerge,
  Sr as defaultConfig,
  w as formatClassName,
  E as getColorBand,
  ut as getLabelValue,
  O as getTooltipText,
  Cn as palettes
};
//# sourceMappingURL=uvcharts.js.map
