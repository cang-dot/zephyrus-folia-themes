(function(){var s=document.createElement('style');s.textContent=".folia-fume-root[data-v-54b8528a],.folia-partita-root[data-v-bde952ec]{background:transparent} .folia-fade-enter-active[data-v-bde952ec],.folia-fade-leave-active[data-v-bde952ec]{transition:all .35s ease} .folia-fade-enter-from[data-v-bde952ec]{opacity:0;transform:scale(.95)} .folia-fade-leave-to[data-v-bde952ec]{opacity:0;transform:scale(1.05)}";document.head.appendChild(s)})();var __sh_runtime_dom_esm_bundler_CwR6cVdo_js={};
(function(){
var __sh__plugin_vue_export_helper_Cmn1wCFW_js={};
(function(){
/**
* @vue/shared v3.5.39
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
var en=var en=function en(t) {
  const e = /* @__PURE__ */ Object.create(null);
  for (const n of t.split(",")) e[n] = 1;
  return (n) => n in e;
}
const te = {}, nn = [], Ct = () => {
}, sn = (t) => t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && // uppercase letter
(t.charCodeAt(2) > 122 || t.charCodeAt(2) < 97), rn = (t) => t.startsWith("onUpdate:"), St = Object.assign, on = Object.prototype.hasOwnProperty, zt = (t, e) => on.call(t, e), y = Array.isArray, rt = (t) => Nt(t) === "[object Map]", be = (t) => Nt(t) === "[object Set]", w = (t) => typeof t == "function", O = (t) => typeof t == "string", et = (t) => typeof t == "symbol", S = (t) => t !== null && typeof t == "object", ln = (t) => (S(t) || w(t)) && w(t.then) && w(t.catch), Se = Object.prototype.toString, Nt = (t) => Se.call(t), cn = (t) => Nt(t).slice(8, -1), ve = (t) => Nt(t) === "[object Object]", ee = (t) => O(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t, j = (t, e) => !Object.is(t, e), ms = (t) => {
  const e = O(t) ? Number(t) : NaN;
  return isNaN(e) ? t : e;
};
let pe;
const ne = () => pe || (pe = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
var se=var se=function se(t) {
  if (y(t)) {
    const e = {};
    for (let n = 0; n < t.length; n++) {
      const r = t[n], s = O(r) ? hn(r) : se(r);
      if (s)
        for (const i in s)
          e[i] = s[i];
    }
    return e;
  } else if (O(t) || S(t))
    return t;
}
const an = /;(?![^(]*\))/g, fn = /:([^]+)/, un = /\/\*[^]*?\*\//g;
var hn=var hn=function hn(t) {
  const e = {};
  return t.replace(un, "").split(an).forEach((n) => {
    if (n) {
      const r = n.split(fn);
      r.length > 1 && (e[r[0].trim()] = r[1].trim());
    }
  }), e;
}
var re=var re=function re(t) {
  let e = "";
  if (O(t))
    e = t;
  else if (y(t))
    for (let n = 0; n < t.length; n++) {
      const r = re(t[n]);
      r && (e += r + " ");
    }
  else if (S(t))
    for (const n in t)
      t[n] && (e += n + " ");
  return e.trim();
}
const Te = (t) => !!(t && t.__v_isRef === !0), dn = (t) => O(t) ? t : t == null ? "" : y(t) || S(t) && (t.toString === Se || !w(t.toString)) ? Te(t) ? dn(t.value) : JSON.stringify(t, we, 2) : String(t), we = (t, e) => Te(e) ? we(t, e.value) : rt(e) ? {
  [`Map(${e.size})`]: [...e.entries()].reduce(
    (n, [r, s], i) => (n[Vt(r, i) + " =>"] = s, n),
    {}
  )
} : be(e) ? {
  [`Set(${e.size})`]: [...e.values()].map((n) => Vt(n))
} : et(e) ? Vt(e) : S(e) && !y(e) && !ve(e) ? String(e) : e, Vt = (t, e = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    et(t) ? `Symbol(${(n = t.description) != null ? n : e})` : t
  );
};
/**
* @vue/reactivity v3.5.39
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let m;
const Bt = /* @__PURE__ */ new WeakSet();
class pn {
  constructor(e) {
    this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0;
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Bt.has(this) && (Bt.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Ce(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, ge(this), Ie(this);
    const e = m, n = N;
    m = this, N = !0;
    try {
      return this.fn();
    } finally {
      Re(this), m = e, N = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let e = this.deps; e; e = e.nextDep)
        le(e);
      this.deps = this.depsTail = void 0, ge(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Bt.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    Ut(this) && this.run();
  }
  get dirty() {
    return Ut(this);
  }
}
let xe = 0, ht, dt;
var Ce=var Ce=function Ce(t, e = !1) {
  if (t.flags |= 8, e) {
    t.next = dt, dt = t;
    return;
  }
  t.next = ht, ht = t;
}
var ie=var ie=function ie() {
  xe++;
}
var oe=var oe=function oe() {
  if (--xe > 0)
    return;
  if (dt) {
    let e = dt;
    for (dt = void 0; e; ) {
      const n = e.next;
      e.next = void 0, e.flags &= -9, e = n;
    }
  }
  let t;
  for (; ht; ) {
    let e = ht;
    for (ht = void 0; e; ) {
      const n = e.next;
      if (e.next = void 0, e.flags &= -9, e.flags & 1)
        try {
          e.trigger();
        } catch (r) {
          t || (t = r);
        }
      e = n;
    }
  }
  if (t) throw t;
}
var Ie=var Ie=function Ie(t) {
  for (let e = t.deps; e; e = e.nextDep)
    e.version = -1, e.prevActiveLink = e.dep.activeLink, e.dep.activeLink = e;
}
var Re=var Re=function Re(t) {
  let e, n = t.depsTail, r = n;
  for (; r; ) {
    const s = r.prevDep;
    r.version === -1 ? (r === n && (n = s), le(r), gn(r)) : e = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = s;
  }
  t.deps = e, t.depsTail = n;
}
var Ut=var Ut=function Ut(t) {
  for (let e = t.deps; e; e = e.nextDep)
    if (e.dep.version !== e.version || e.dep.computed && (Ae(e.dep.computed) || e.dep.version !== e.version))
      return !0;
  return !!t._dirty;
}
var Ae=var Ae=function Ae(t) {
  if (t.flags & 4 && !(t.flags & 16) || (t.flags &= -17, t.globalVersion === pt) || (t.globalVersion = pt, !t.isSSR && t.flags & 128 && (!t.deps && !t._dirty || !Ut(t))))
    return;
  t.flags |= 2;
  const e = t.dep, n = m, r = N;
  m = t, N = !0;
  try {
    Ie(t);
    const s = t.fn(t._value);
    (e.version === 0 || j(s, t._value)) && (t.flags |= 128, t._value = s, e.version++);
  } catch (s) {
    throw e.version++, s;
  } finally {
    m = n, N = r, Re(t), t.flags &= -3;
  }
}
var le=var le=function le(t, e = !1) {
  const { dep: n, prevSub: r, nextSub: s } = t;
  if (r && (r.nextSub = s, t.prevSub = void 0), s && (s.prevSub = r, t.nextSub = void 0), n.subs === t && (n.subs = r, !r && n.computed)) {
    n.computed.flags &= -5;
    for (let i = n.computed.deps; i; i = i.nextDep)
      le(i, !0);
  }
  !e && !--n.sc && n.map && n.map.delete(n.key);
}
var gn=var gn=function gn(t) {
  const { prevDep: e, nextDep: n } = t;
  e && (e.nextDep = n, t.prevDep = void 0), n && (n.prevDep = e, t.nextDep = void 0);
}
let N = !0;
const Ee = [];
var Ot=var Ot=function Ot() {
  Ee.push(N), N = !1;
}
var Dt=var Dt=function Dt() {
  const t = Ee.pop();
  N = t === void 0 ? !0 : t;
}
var ge=var ge=function ge(t) {
  const { cleanup: e } = t;
  if (t.cleanup = void 0, e) {
    const n = m;
    m = void 0;
    try {
      e();
    } finally {
      m = n;
    }
  }
}
let pt = 0;
class _n {
  constructor(e, n) {
    this.sub = e, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class ce {
  // TODO isolatedDeclarations "__v_skip"
  constructor(e) {
    this.computed = e, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(e) {
    if (!m || !N || m === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== m)
      n = this.activeLink = new _n(m, this), m.deps ? (n.prevDep = m.depsTail, m.depsTail.nextDep = n, m.depsTail = n) : m.deps = m.depsTail = n, Le(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const r = n.nextDep;
      r.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = r), n.prevDep = m.depsTail, n.nextDep = void 0, m.depsTail.nextDep = n, m.depsTail = n, m.deps === n && (m.deps = r);
    }
    return n;
  }
  trigger(e) {
    this.version++, pt++, this.notify(e);
  }
  notify(e) {
    ie();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      oe();
    }
  }
}
var Le=var Le=function Le(t) {
  if (t.dep.sc++, t.sub.flags & 4) {
    const e = t.dep.computed;
    if (e && !t.dep.subs) {
      e.flags |= 20;
      for (let r = e.deps; r; r = r.nextDep)
        Le(r);
    }
    const n = t.dep.subs;
    n !== t && (t.prevSub = n, n && (n.nextSub = t)), t.dep.subs = t;
  }
}
const Jt = /* @__PURE__ */ new WeakMap(), tt = /* @__PURE__ */ Symbol(
  ""
), $t = /* @__PURE__ */ Symbol(
  ""
), gt = /* @__PURE__ */ Symbol(
  ""
);
var T=var T=function T(t, e, n) {
  if (N && m) {
    let r = Jt.get(t);
    r || Jt.set(t, r = /* @__PURE__ */ new Map());
    let s = r.get(n);
    s || (r.set(n, s = new ce()), s.map = r, s.key = n), s.track();
  }
}
var q=var q=function q(t, e, n, r, s, i) {
  const l = Jt.get(t);
  if (!l) {
    pt++;
    return;
  }
  const c = (o) => {
    o && o.trigger();
  };
  if (ie(), e === "clear")
    l.forEach(c);
  else {
    const o = y(t), f = o && ee(n);
    if (o && n === "length") {
      const a = Number(r);
      l.forEach((u, p) => {
        (p === "length" || p === gt || !et(p) && p >= a) && c(u);
      });
    } else
      switch ((n !== void 0 || l.has(void 0)) && c(l.get(n)), f && c(l.get(gt)), e) {
        case "add":
          o ? f && c(l.get("length")) : (c(l.get(tt)), rt(t) && c(l.get($t)));
          break;
        case "delete":
          o || (c(l.get(tt)), rt(t) && c(l.get($t)));
          break;
        case "set":
          rt(t) && c(l.get(tt));
          break;
      }
  }
  oe();
}
var nt=var nt=function nt(t) {
  const e = /* @__PURE__ */ _(t);
  return e === t ? e : (T(e, "iterate", gt), /* @__PURE__ */ L(t) ? e : e.map(D));
}
var Pt=var Pt=function Pt(t) {
  return T(t = /* @__PURE__ */ _(t), "iterate", gt), t;
}
var F=var F=function F(t, e) {
  return /* @__PURE__ */ U(t) ? lt(/* @__PURE__ */ it(t) ? D(e) : e) : D(e);
}
const mn = {
  __proto__: null,
  [Symbol.iterator]() {
    return Ht(this, Symbol.iterator, (t) => F(this, t));
  },
  concat(...t) {
    return nt(this).concat(
      ...t.map((e) => y(e) ? nt(e) : e)
    );
  },
  entries() {
    return Ht(this, "entries", (t) => (t[1] = F(this, t[1]), t));
  },
  every(t, e) {
    return k(this, "every", t, e, void 0, arguments);
  },
  filter(t, e) {
    return k(
      this,
      "filter",
      t,
      e,
      (n) => n.map((r) => F(this, r)),
      arguments
    );
  },
  find(t, e) {
    return k(
      this,
      "find",
      t,
      e,
      (n) => F(this, n),
      arguments
    );
  },
  findIndex(t, e) {
    return k(this, "findIndex", t, e, void 0, arguments);
  },
  findLast(t, e) {
    return k(
      this,
      "findLast",
      t,
      e,
      (n) => F(this, n),
      arguments
    );
  },
  findLastIndex(t, e) {
    return k(this, "findLastIndex", t, e, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(t, e) {
    return k(this, "forEach", t, e, void 0, arguments);
  },
  includes(...t) {
    return Wt(this, "includes", t);
  },
  indexOf(...t) {
    return Wt(this, "indexOf", t);
  },
  join(t) {
    return nt(this).join(t);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...t) {
    return Wt(this, "lastIndexOf", t);
  },
  map(t, e) {
    return k(this, "map", t, e, void 0, arguments);
  },
  pop() {
    return ft(this, "pop");
  },
  push(...t) {
    return ft(this, "push", t);
  },
  reduce(t, ...e) {
    return _e(this, "reduce", t, e);
  },
  reduceRight(t, ...e) {
    return _e(this, "reduceRight", t, e);
  },
  shift() {
    return ft(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(t, e) {
    return k(this, "some", t, e, void 0, arguments);
  },
  splice(...t) {
    return ft(this, "splice", t);
  },
  toReversed() {
    return nt(this).toReversed();
  },
  toSorted(t) {
    return nt(this).toSorted(t);
  },
  toSpliced(...t) {
    return nt(this).toSpliced(...t);
  },
  unshift(...t) {
    return ft(this, "unshift", t);
  },
  values() {
    return Ht(this, "values", (t) => F(this, t));
  }
};
var Ht=var Ht=function Ht(t, e, n) {
  const r = Pt(t), s = r[e]();
  return r !== t && !/* @__PURE__ */ L(t) && (s._next = s.next, s.next = () => {
    const i = s._next();
    return i.done || (i.value = n(i.value)), i;
  }), s;
}
const yn = Array.prototype;
var k=var k=function k(t, e, n, r, s, i) {
  const l = Pt(t), c = l !== t && !/* @__PURE__ */ L(t), o = l[e];
  if (o !== yn[e]) {
    const u = o.apply(t, i);
    return c ? D(u) : u;
  }
  let f = n;
  l !== t && (c ? f = function(u, p) {
    return n.call(this, F(t, u), p, t);
  } : n.length > 2 && (f = function(u, p) {
    return n.call(this, u, p, t);
  }));
  const a = o.call(l, f, r);
  return c && s ? s(a) : a;
}
var _e=var _e=function _e(t, e, n, r) {
  const s = Pt(t), i = s !== t && !/* @__PURE__ */ L(t);
  let l = n, c = !1;
  s !== t && (i ? (c = r.length === 0, l = function(f, a, u) {
    return c && (c = !1, f = F(t, f)), n.call(this, f, F(t, a), u, t);
  }) : n.length > 3 && (l = function(f, a, u) {
    return n.call(this, f, a, u, t);
  }));
  const o = s[e](l, ...r);
  return c ? F(t, o) : o;
}
var Wt=var Wt=function Wt(t, e, n) {
  const r = /* @__PURE__ */ _(t);
  T(r, "iterate", gt);
  const s = r[e](...n);
  return (s === -1 || s === !1) && /* @__PURE__ */ ae(n[0]) ? (n[0] = /* @__PURE__ */ _(n[0]), r[e](...n)) : s;
}
var ft=var ft=function ft(t, e, n = []) {
  Ot(), ie();
  const r = (/* @__PURE__ */ _(t))[e].apply(t, n);
  return oe(), Dt(), r;
}
const bn = /* @__PURE__ */ en("__proto__,__v_isRef,__isVue"), Me = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((t) => t !== "arguments" && t !== "caller").map((t) => Symbol[t]).filter(et)
);
var Sn=var Sn=function Sn(t) {
  et(t) || (t = String(t));
  const e = /* @__PURE__ */ _(this);
  return T(e, "has", t), e.hasOwnProperty(t);
}
class Ne {
  constructor(e = !1, n = !1) {
    this._isReadonly = e, this._isShallow = n;
  }
  get(e, n, r) {
    if (n === "__v_skip") return e.__v_skip;
    const s = this._isReadonly, i = this._isShallow;
    if (n === "__v_isReactive")
      return !s;
    if (n === "__v_isReadonly")
      return s;
    if (n === "__v_isShallow")
      return i;
    if (n === "__v_raw")
      return r === (s ? i ? Ln : Pe : i ? En : De).get(e) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(e) === Object.getPrototypeOf(r) ? e : void 0;
    const l = y(e);
    if (!s) {
      let o;
      if (l && (o = mn[n]))
        return o;
      if (n === "hasOwnProperty")
        return Sn;
    }
    const c = Reflect.get(
      e,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ H(e) ? e : r
    );
    if ((et(n) ? Me.has(n) : bn(n)) || (s || T(e, "get", n), i))
      return c;
    if (/* @__PURE__ */ H(c)) {
      const o = l && ee(n) ? c : c.value;
      return s && S(o) ? /* @__PURE__ */ Yt(o) : o;
    }
    return S(c) ? s ? /* @__PURE__ */ Yt(c) : /* @__PURE__ */ Fe(c) : c;
  }
}
class vn extends Ne {
  constructor(e = !1) {
    super(!1, e);
  }
  set(e, n, r, s) {
    let i = e[n];
    const l = y(e) && ee(n);
    if (!this._isShallow) {
      const f = /* @__PURE__ */ U(i);
      if (!/* @__PURE__ */ L(r) && !/* @__PURE__ */ U(r) && (i = /* @__PURE__ */ _(i), r = /* @__PURE__ */ _(r)), !l && /* @__PURE__ */ H(i) && !/* @__PURE__ */ H(r))
        return f || (i.value = r), !0;
    }
    const c = l ? Number(n) < e.length : zt(e, n), o = Reflect.set(
      e,
      n,
      r,
      /* @__PURE__ */ H(e) ? e : s
    );
    return e === /* @__PURE__ */ _(s) && o && (c ? j(r, i) && q(e, "set", n, r) : q(e, "add", n, r)), o;
  }
  deleteProperty(e, n) {
    const r = zt(e, n);
    e[n];
    const s = Reflect.deleteProperty(e, n);
    return s && r && q(e, "delete", n, void 0), s;
  }
  has(e, n) {
    const r = Reflect.has(e, n);
    return (!et(n) || !Me.has(n)) && T(e, "has", n), r;
  }
  ownKeys(e) {
    return T(
      e,
      "iterate",
      y(e) ? "length" : tt
    ), Reflect.ownKeys(e);
  }
}
class Tn extends Ne {
  constructor(e = !1) {
    super(!0, e);
  }
  set(e, n) {
    return !0;
  }
  deleteProperty(e, n) {
    return !0;
  }
}
const wn = /* @__PURE__ */ new vn(), xn = /* @__PURE__ */ new Tn(), qt = (t) => t, Tt = (t) => Reflect.getPrototypeOf(t);
var Cn=var Cn=function Cn(t, e, n) {
  return function(...r) {
    const s = this.__v_raw, i = /* @__PURE__ */ _(s), l = rt(i), c = t === "entries" || t === Symbol.iterator && l, o = t === "keys" && l, f = s[t](...r), a = n ? qt : e ? lt : D;
    return !e && T(
      i,
      "iterate",
      o ? $t : tt
    ), St(
      // inheriting all iterator properties
      Object.create(f),
      {
        // iterator protocol
        next() {
          const { value: u, done: p } = f.next();
          return p ? { value: u, done: p } : {
            value: c ? [a(u[0]), a(u[1])] : a(u),
            done: p
          };
        }
      }
    );
  };
}
var wt=var wt=function wt(t) {
  return function(...e) {
    return t === "delete" ? !1 : t === "clear" ? void 0 : this;
  };
}
var In=var In=function In(t, e) {
  const n = {
    get(s) {
      const i = this.__v_raw, l = /* @__PURE__ */ _(i), c = /* @__PURE__ */ _(s);
      t || (j(s, c) && T(l, "get", s), T(l, "get", c));
      const { has: o } = Tt(l), f = e ? qt : t ? lt : D;
      if (o.call(l, s))
        return f(i.get(s));
      if (o.call(l, c))
        return f(i.get(c));
      i !== l && i.get(s);
    },
    get size() {
      const s = this.__v_raw;
      return !t && T(/* @__PURE__ */ _(s), "iterate", tt), s.size;
    },
    has(s) {
      const i = this.__v_raw, l = /* @__PURE__ */ _(i), c = /* @__PURE__ */ _(s);
      return t || (j(s, c) && T(l, "has", s), T(l, "has", c)), s === c ? i.has(s) : i.has(s) || i.has(c);
    },
    forEach(s, i) {
      const l = this, c = l.__v_raw, o = /* @__PURE__ */ _(c), f = e ? qt : t ? lt : D;
      return !t && T(o, "iterate", tt), c.forEach((a, u) => s.call(i, f(a), f(u), l));
    }
  };
  return St(
    n,
    t ? {
      add: wt("add"),
      set: wt("set"),
      delete: wt("delete"),
      clear: wt("clear")
    } : {
      add(s) {
        const i = /* @__PURE__ */ _(this), l = Tt(i), c = /* @__PURE__ */ _(s), o = !e && !/* @__PURE__ */ L(s) && !/* @__PURE__ */ U(s) ? c : s;
        return l.has.call(i, o) || j(s, o) && l.has.call(i, s) || j(c, o) && l.has.call(i, c) || (i.add(o), q(i, "add", o, o)), this;
      },
      set(s, i) {
        !e && !/* @__PURE__ */ L(i) && !/* @__PURE__ */ U(i) && (i = /* @__PURE__ */ _(i));
        const l = /* @__PURE__ */ _(this), { has: c, get: o } = Tt(l);
        let f = c.call(l, s);
        f || (s = /* @__PURE__ */ _(s), f = c.call(l, s));
        const a = o.call(l, s);
        return l.set(s, i), f ? j(i, a) && q(l, "set", s, i) : q(l, "add", s, i), this;
      },
      delete(s) {
        const i = /* @__PURE__ */ _(this), { has: l, get: c } = Tt(i);
        let o = l.call(i, s);
        o || (s = /* @__PURE__ */ _(s), o = l.call(i, s)), c && c.call(i, s);
        const f = i.delete(s);
        return o && q(i, "delete", s, void 0), f;
      },
      clear() {
        const s = /* @__PURE__ */ _(this), i = s.size !== 0, l = s.clear();
        return i && q(
          s,
          "clear",
          void 0,
          void 0
        ), l;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((s) => {
    n[s] = Cn(s, t, e);
  }), n;
}
var Oe=var Oe=function Oe(t, e) {
  const n = In(t, e);
  return (r, s, i) => s === "__v_isReactive" ? !t : s === "__v_isReadonly" ? t : s === "__v_raw" ? r : Reflect.get(
    zt(n, s) && s in r ? n : r,
    s,
    i
  );
}
const Rn = {
  get: /* @__PURE__ */ Oe(!1, !1)
}, An = {
  get: /* @__PURE__ */ Oe(!0, !1)
}, De = /* @__PURE__ */ new WeakMap(), En = /* @__PURE__ */ new WeakMap(), Pe = /* @__PURE__ */ new WeakMap(), Ln = /* @__PURE__ */ new WeakMap();
var Mn=var Mn=function Mn(t) {
  switch (t) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
// @__NO_SIDE_EFFECTS__
var Fe=var Fe=function Fe(t) {
  return /* @__PURE__ */ U(t) ? t : je(
    t,
    !1,
    wn,
    Rn,
    De
  );
}
// @__NO_SIDE_EFFECTS__
var Yt=var Yt=function Yt(t) {
  return je(
    t,
    !0,
    xn,
    An,
    Pe
  );
}
var je=var je=function je(t, e, n, r, s) {
  if (!S(t) || t.__v_raw && !(e && t.__v_isReactive) || t.__v_skip || !Object.isExtensible(t))
    return t;
  const i = s.get(t);
  if (i)
    return i;
  const l = Mn(cn(t));
  if (l === 0)
    return t;
  const c = new Proxy(
    t,
    l === 2 ? r : n
  );
  return s.set(t, c), c;
}
// @__NO_SIDE_EFFECTS__
var it=var it=function it(t) {
  return /* @__PURE__ */ U(t) ? /* @__PURE__ */ it(t.__v_raw) : !!(t && t.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
var U=var U=function U(t) {
  return !!(t && t.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
var L=var L=function L(t) {
  return !!(t && t.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
var ae=var ae=function ae(t) {
  return t ? !!t.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
var _=var _=function _(t) {
  const e = t && t.__v_raw;
  return e ? /* @__PURE__ */ _(e) : t;
}
const D = (t) => S(t) ? /* @__PURE__ */ Fe(t) : t, lt = (t) => S(t) ? /* @__PURE__ */ Yt(t) : t;
// @__NO_SIDE_EFFECTS__
var H=var H=function H(t) {
  return t ? t.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
var ys=var ys=function ys(t) {
  return Nn(t, !1);
}
var Nn=var Nn=function Nn(t, e) {
  return /* @__PURE__ */ H(t) ? t : new On(t, e);
}
class On {
  constructor(e, n) {
    this.dep = new ce(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? e : /* @__PURE__ */ _(e), this._value = n ? e : D(e), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(e) {
    const n = this._rawValue, r = this.__v_isShallow || /* @__PURE__ */ L(e) || /* @__PURE__ */ U(e);
    e = r ? e : /* @__PURE__ */ _(e), j(e, n) && (this._rawValue = e, this._value = r ? e : D(e), this.dep.trigger());
  }
}
class Dn {
  constructor(e, n, r) {
    this.fn = e, this.setter = n, this._value = void 0, this.dep = new ce(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = pt - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = r;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    m !== this)
      return Ce(this, !0), !0;
  }
  get value() {
    const e = this.dep.track();
    return Ae(this), e && (e.version = this.dep.version), this._value;
  }
  set value(e) {
    this.setter && this.setter(e);
  }
}
// @__NO_SIDE_EFFECTS__
var Pn=var Pn=function Pn(t, e, n = !1) {
  let r, s;
  return w(t) ? r = t : (r = t.get, s = t.set), new Dn(r, s, n);
}
const xt = {}, At = /* @__PURE__ */ new WeakMap();
let X;
var Fn=var Fn=function Fn(t, e = !1, n = X) {
  if (n) {
    let r = At.get(n);
    r || At.set(n, r = []), r.push(t);
  }
}
var jn=var jn=function jn(t, e, n = te) {
  const { immediate: r, deep: s, once: i, scheduler: l, augmentJob: c, call: o } = n, f = (h) => s ? h : /* @__PURE__ */ L(h) || s === !1 || s === 0 ? Y(h, 1) : Y(h);
  let a, u, p, g, I = !1, P = !1;
  if (/* @__PURE__ */ H(t) ? (u = () => t.value, I = /* @__PURE__ */ L(t)) : /* @__PURE__ */ it(t) ? (u = () => f(t), I = !0) : y(t) ? (P = !0, I = t.some((h) => /* @__PURE__ */ it(h) || /* @__PURE__ */ L(h)), u = () => t.map((h) => {
    if (/* @__PURE__ */ H(h))
      return h.value;
    if (/* @__PURE__ */ it(h))
      return f(h);
    if (w(h))
      return o ? o(h, 2) : h();
  })) : w(t) ? e ? u = o ? () => o(t, 2) : t : u = () => {
    if (p) {
      Ot();
      try {
        p();
      } finally {
        Dt();
      }
    }
    const h = X;
    X = a;
    try {
      return o ? o(t, 3, [g]) : t(g);
    } finally {
      X = h;
    }
  } : u = Ct, e && s) {
    const h = u, x = s === !0 ? 1 / 0 : s;
    u = () => Y(h(), x);
  }
  const J = () => {
    a.stop();
  };
  if (i && e) {
    const h = e;
    e = (...x) => {
      const M = h(...x);
      return J(), M;
    };
  }
  let W = P ? new Array(t.length).fill(xt) : xt;
  const G = (h) => {
    if (!(!(a.flags & 1) || !a.dirty && !h))
      if (e) {
        const x = a.run();
        if (h || s || I || (P ? x.some((M, R) => j(M, W[R])) : j(x, W))) {
          p && p();
          const M = X;
          X = a;
          try {
            const R = [
              x,
              // pass undefined as the old value when it's changed for the first time
              W === xt ? void 0 : P && W[0] === xt ? [] : W,
              g
            ];
            W = x, o ? o(e, 3, R) : (
              // @ts-expect-error
              e(...R)
            );
          } finally {
            X = M;
          }
        }
      } else
        a.run();
  };
  return c && c(G), a = new pn(u), a.scheduler = l ? () => l(G, !1) : G, g = (h) => Fn(h, !1, a), p = a.onStop = () => {
    const h = At.get(a);
    if (h) {
      if (o)
        o(h, 4);
      else
        for (const x of h) x();
      At.delete(a);
    }
  }, e ? r ? G(!0) : W = a.run() : l ? l(G.bind(null, !0), !0) : a.run(), J.pause = a.pause.bind(a), J.resume = a.resume.bind(a), J.stop = J, J;
}
var Y=var Y=function Y(t, e = 1 / 0, n) {
  if (e <= 0 || !S(t) || t.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(t) || 0) >= e))
    return t;
  if (n.set(t, e), e--, /* @__PURE__ */ H(t))
    Y(t.value, e, n);
  else if (y(t))
    for (let r = 0; r < t.length; r++)
      Y(t[r], e, n);
  else if (be(t) || rt(t))
    t.forEach((r) => {
      Y(r, e, n);
    });
  else if (ve(t)) {
    for (const r in t)
      Y(t[r], e, n);
    for (const r of Object.getOwnPropertySymbols(t))
      Object.prototype.propertyIsEnumerable.call(t, r) && Y(t[r], e, n);
  }
  return t;
}
/**
* @vue/runtime-core v3.5.39
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
var fe=var fe=function fe(t, e, n, r) {
  try {
    return r ? t(...r) : t();
  } catch (s) {
    Ve(s, e, n);
  }
}
var Ft=var Ft=function Ft(t, e, n, r) {
  if (w(t)) {
    const s = fe(t, e, n, r);
    return s && ln(s) && s.catch((i) => {
      Ve(i, e, n);
    }), s;
  }
  if (y(t)) {
    const s = [];
    for (let i = 0; i < t.length; i++)
      s.push(Ft(t[i], e, n, r));
    return s;
  }
}
var Ve=var Ve=function Ve(t, e, n, r = !0) {
  const s = e ? e.vnode : null, { errorHandler: i, throwUnhandledErrorInProduction: l } = e && e.appContext.config || te;
  if (e) {
    let c = e.parent;
    const o = e.proxy, f = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; c; ) {
      const a = c.ec;
      if (a) {
        for (let u = 0; u < a.length; u++)
          if (a[u](t, o, f) === !1)
            return;
      }
      c = c.parent;
    }
    if (i) {
      Ot(), fe(i, null, 10, [
        t,
        o,
        f
      ]), Dt();
      return;
    }
  }
  Vn(t, n, s, r, l);
}
var Vn=var Vn=function Vn(t, e, n, r = !0, s = !1) {
  if (s)
    throw t;
  console.error(t);
}
const E = [];
let K = -1;
const ot = [];
let $ = null, st = 0;
const Bn = /* @__PURE__ */ Promise.resolve();
let Gt = null;
var Hn=var Hn=function Hn(t) {
  let e = K + 1, n = E.length;
  for (; e < n; ) {
    const r = e + n >>> 1, s = E[r], i = _t(s);
    i < t || i === t && s.flags & 2 ? e = r + 1 : n = r;
  }
  return e;
}
var Wn=var Wn=function Wn(t) {
  if (!(t.flags & 1)) {
    const e = _t(t), n = E[E.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(t.flags & 2) && e >= _t(n) ? E.push(t) : E.splice(Hn(e), 0, t), t.flags |= 1, Be();
  }
}
var Be=var Be=function Be() {
  Gt || (Gt = Bn.then(He));
}
var kn=var kn=function kn(t) {
  y(t) ? ot.push(...t) : $ && t.id === -1 ? $.splice(st + 1, 0, t) : t.flags & 1 || (ot.push(t), t.flags |= 1), Be();
}
var Kn=var Kn=function Kn(t) {
  if (ot.length) {
    const e = [...new Set(ot)].sort(
      (n, r) => _t(n) - _t(r)
    );
    if (ot.length = 0, $) {
      $.push(...e);
      return;
    }
    for ($ = e, st = 0; st < $.length; st++) {
      const n = $[st];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    $ = null, st = 0;
  }
}
const _t = (t) => t.id == null ? t.flags & 2 ? -1 : 1 / 0 : t.id;
var He=var He=function He(t) {
  try {
    for (K = 0; K < E.length; K++) {
      const e = E[K];
      e && !(e.flags & 8) && (e.flags & 4 && (e.flags &= -2), fe(
        e,
        e.i,
        e.i ? 15 : 14
      ), e.flags & 4 || (e.flags &= -2));
    }
  } finally {
    for (; K < E.length; K++) {
      const e = E[K];
      e && (e.flags &= -2);
    }
    K = -1, E.length = 0, Kn(), Gt = null, (E.length || ot.length) && He();
  }
}
let B = null, We = null;
var me=var me=function me(t) {
  const e = B;
  return B = t, We = t && t.type.__scopeId || null, e;
}
var bs=var bs=function bs(t, e = B, n) {
  if (!e || t._n)
    return t;
  const r = (...s) => {
    r._d && Lt(-1);
    const i = me(e);
    let l;
    try {
      l = t(...s);
    } finally {
      me(i), r._d && Lt(1);
    }
    return l;
  };
  return r._n = !0, r._c = !0, r._d = !0, r;
}
var zn=var zn=function zn(t, e, n = !1) {
  const r = Ze();
  if (r || es) {
    let s = r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
    if (s && t in s)
      return s[t];
    if (arguments.length > 1)
      return n && w(e) ? e.call(r && r.proxy) : e;
  }
}
const Un = /* @__PURE__ */ Symbol.for("v-scx"), Jn = () => zn(Un);
var Ss=var Ss=function Ss(t, e, n) {
  return $n(t, e, n);
}
var $n=var $n=function $n(t, e, n = te) {
  const { immediate: r, deep: s, flush: i, once: l } = n, c = St({}, n), o = e && r || !e && i !== "post";
  let f;
  if (bt) {
    if (i === "sync") {
      const g = Jn();
      f = g.__watcherHandles || (g.__watcherHandles = []);
    } else if (!o) {
      const g = () => {
      };
      return g.stop = Ct, g.resume = Ct, g.pause = Ct, g;
    }
  }
  const a = ct;
  c.call = (g, I, P) => Ft(g, a, I, P);
  let u = !1;
  i === "post" ? c.scheduler = (g) => {
    ss(g, a && a.suspense);
  } : i !== "sync" && (u = !0, c.scheduler = (g, I) => {
    I ? g() : Wn(g);
  }), c.augmentJob = (g) => {
    e && (g.flags |= 4), u && (g.flags |= 2, a && (g.id = a.uid, g.i = a));
  };
  const p = jn(t, e, c);
  return bt && (f ? f.push(p) : o && p()), p;
}
const ke = (t) => t.__isTeleport, z = /* @__PURE__ */ Symbol("_leaveCb"), ut = /* @__PURE__ */ Symbol("_enterCb");
var qn=var qn=function qn() {
  const t = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  return Xn(() => {
    t.isMounted = !0;
  }), Zn(() => {
    t.isUnmounting = !0;
  }), t;
}
const A = [Function, Array], Yn = {
  mode: String,
  appear: Boolean,
  persisted: Boolean,
  // enter
  onBeforeEnter: A,
  onEnter: A,
  onAfterEnter: A,
  onEnterCancelled: A,
  // leave
  onBeforeLeave: A,
  onLeave: A,
  onAfterLeave: A,
  onLeaveCancelled: A,
  // appear
  onBeforeAppear: A,
  onAppear: A,
  onAfterAppear: A,
  onAppearCancelled: A
}, Ke = (t) => {
  const e = t.subTree;
  return e.component ? Ke(e.component) : e;
}, Gn = {
  name: "BaseTransition",
  props: Yn,
  setup(t, { slots: e }) {
    const n = Ze(), r = qn();
    return () => {
      const s = e.default && Je(e.default(), !0), i = s && s.length ? ze(s) : (
        // Keep explicit default-slot conditionals on the same transition path
        // as regular v-if branches, which render a comment placeholder.
        n.subTree ? ds() : void 0
      );
      if (!i)
        return;
      const l = /* @__PURE__ */ _(t), { mode: c } = l;
      if (r.isLeaving)
        return kt(i);
      const o = ye(i);
      if (!o)
        return kt(i);
      let f = Qt(
        o,
        l,
        r,
        n,
        // #11061, ensure enterHooks is fresh after clone
        (u) => f = u
      );
      o.type !== V && Et(o, f);
      let a = n.subTree && ye(n.subTree);
      if (a && a.type !== V && !Ge(a, o) && Ke(n).type !== V) {
        let u = Qt(
          a,
          l,
          r,
          n
        );
        if (Et(a, u), c === "out-in" && o.type !== V)
          return r.isLeaving = !0, u.afterLeave = () => {
            r.isLeaving = !1, n.job.flags & 8 || n.update(), delete u.afterLeave, a = void 0;
          }, kt(i);
        c === "in-out" && o.type !== V ? u.delayLeave = (p, g, I) => {
          const P = Ue(
            r,
            a
          );
          P[String(a.key)] = a, p[z] = () => {
            g(), p[z] = void 0, delete f.delayedLeave, a = void 0;
          }, f.delayedLeave = () => {
            I(), delete f.delayedLeave, a = void 0;
          };
        } : a = void 0;
      } else a && (a = void 0);
      return i;
    };
  }
};
var ze=var ze=function ze(t) {
  let e = t[0];
  if (t.length > 1) {
    for (const n of t)
      if (n.type !== V) {
        e = n;
        break;
      }
  }
  return e;
}
const vs = Gn;
var Ue=var Ue=function Ue(t, e) {
  const { leavingVNodes: n } = t;
  let r = n.get(e.type);
  return r || (r = /* @__PURE__ */ Object.create(null), n.set(e.type, r)), r;
}
var Qt=var Qt=function Qt(t, e, n, r, s) {
  const {
    appear: i,
    mode: l,
    persisted: c = !1,
    onBeforeEnter: o,
    onEnter: f,
    onAfterEnter: a,
    onEnterCancelled: u,
    onBeforeLeave: p,
    onLeave: g,
    onAfterLeave: I,
    onLeaveCancelled: P,
    onBeforeAppear: J,
    onAppear: W,
    onAfterAppear: G,
    onAppearCancelled: h
  } = e, x = String(t.key), M = Ue(n, t), R = (d, b) => {
    d && Ft(
      d,
      r,
      9,
      b
    );
  }, de = (d, b) => {
    const v = b[1];
    R(d, b), y(d) ? d.every((Q) => Q.length <= 1) && v() : d.length <= 1 && v();
  }, jt = {
    mode: l,
    persisted: c,
    beforeEnter(d) {
      let b = o;
      if (!n.isMounted)
        if (i)
          b = J || o;
        else
          return;
      d[z] && d[z](
        !0
        /* cancelled */
      );
      const v = M[x];
      v && Ge(t, v) && v.el[z] && v.el[z](), R(b, [d]);
    },
    enter(d) {
      if (M[x] === t) return;
      let b = f, v = a, Q = u;
      if (!n.isMounted)
        if (i)
          b = W || f, v = G || a, Q = h || u;
        else
          return;
      let at = !1;
      d[ut] = (tn) => {
        at || (at = !0, tn ? R(Q, [d]) : R(v, [d]), jt.delayedLeave && jt.delayedLeave(), d[ut] = void 0);
      };
      const vt = d[ut].bind(null, !1);
      b ? de(b, [d, vt]) : vt();
    },
    leave(d, b) {
      const v = String(t.key);
      if (d[ut] && d[ut](
        !0
        /* cancelled */
      ), n.isUnmounting)
        return b();
      R(p, [d]);
      let Q = !1;
      d[z] = (vt) => {
        Q || (Q = !0, b(), vt ? R(P, [d]) : R(I, [d]), d[z] = void 0, M[v] === t && delete M[v]);
      };
      const at = d[z].bind(null, !1);
      M[v] = t, g ? de(g, [d, at]) : at();
    },
    clone(d) {
      const b = Qt(
        d,
        e,
        n,
        r,
        s
      );
      return s && s(b), b;
    }
  };
  return jt;
}
var kt=var kt=function kt(t) {
  if ($e(t))
    return t = yt(t), t.children = null, t;
}
var ye=var ye=function ye(t) {
  if (!$e(t))
    return ke(t.type) && t.children ? ze(t.children) : t;
  if (t.component)
    return t.component.subTree;
  const { shapeFlag: e, children: n } = t;
  if (n) {
    if (e & 16)
      return n[0];
    if (e & 32 && w(n.default))
      return n.default();
  }
}
var Et=var Et=function Et(t, e) {
  t.shapeFlag & 6 && t.component ? (t.transition = e, Et(t.component.subTree, e)) : t.shapeFlag & 128 ? (t.ssContent.transition = e.clone(t.ssContent), t.ssFallback.transition = e.clone(t.ssFallback)) : t.transition = e;
}
var Je=var Je=function Je(t, e = !1, n) {
  let r = [], s = 0;
  for (let i = 0; i < t.length; i++) {
    let l = t[i];
    const c = n == null ? l.key : String(n) + String(l.key != null ? l.key : i);
    l.type === he ? (l.patchFlag & 128 && s++, r = r.concat(
      Je(l.children, e, c)
    )) : (e || l.type !== V) && r.push(c != null ? yt(l, { key: c }) : l);
  }
  if (s > 1)
    for (let i = 0; i < r.length; i++)
      r[i].patchFlag = -2;
  return r;
}
ne().requestIdleCallback;
ne().cancelIdleCallback;
const $e = (t) => t.type.__isKeepAlive;
var Qn=var Qn=function Qn(t, e, n = ct, r = !1) {
  if (n) {
    const s = n[t] || (n[t] = []), i = e.__weh || (e.__weh = (...l) => {
      Ot();
      const c = gs(n), o = Ft(e, n, t, l);
      return c(), Dt(), o;
    });
    return r ? s.unshift(i) : s.push(i), i;
  }
}
const ue = (t) => (e, n = ct) => {
  (!bt || t === "sp") && Qn(t, (...r) => e(...r), n);
}, Xn = ue("m"), Zn = ue(
  "bum"
), Ts = ue("um"), ts = /* @__PURE__ */ Symbol.for("v-ndc");
var ws=var ws=function ws(t, e, n, r) {
  let s;
  const i = n, l = y(t);
  if (l || O(t)) {
    const c = l && /* @__PURE__ */ it(t);
    let o = !1, f = !1;
    c && (o = !/* @__PURE__ */ L(t), f = /* @__PURE__ */ U(t), t = Pt(t)), s = new Array(t.length);
    for (let a = 0, u = t.length; a < u; a++)
      s[a] = e(
        o ? f ? lt(D(t[a])) : D(t[a]) : t[a],
        a,
        void 0,
        i
      );
  } else if (typeof t == "number") {
    s = new Array(t);
    for (let c = 0; c < t; c++)
      s[c] = e(c + 1, c, void 0, i);
  } else if (S(t))
    if (t[Symbol.iterator])
      s = Array.from(
        t,
        (c, o) => e(c, o, void 0, i)
      );
    else {
      const c = Object.keys(t);
      s = new Array(c.length);
      for (let o = 0, f = c.length; o < f; o++) {
        const a = c[o];
        s[o] = e(t[a], a, o, i);
      }
    }
  else
    s = [];
  return s;
}
let es = null;
const ns = {}, qe = (t) => Object.getPrototypeOf(t) === ns, ss = is, rs = (t) => t.__isSuspense;
var is=var is=function is(t, e) {
  e && e.pendingBranch ? y(t) ? e.effects.push(...t) : e.effects.push(t) : kn(t);
}
const he = /* @__PURE__ */ Symbol.for("v-fgt"), os = /* @__PURE__ */ Symbol.for("v-txt"), V = /* @__PURE__ */ Symbol.for("v-cmt"), It = [];
let C = null;
var ls=var ls=function ls(t = !1) {
  It.push(C = t ? null : []);
}
var cs=var cs=function cs() {
  It.pop(), C = It[It.length - 1] || null;
}
let mt = 1;
var Lt=var Lt=function Lt(t, e = !1) {
  mt += t, t < 0 && C && e && (C.hasOnce = !0);
}
var Ye=var Ye=function Ye(t) {
  return t.dynamicChildren = mt > 0 ? C || nn : null, cs(), mt > 0 && C && C.push(t), t;
}
var xs=var xs=function xs(t, e, n, r, s, i) {
  return Ye(
    Xe(
      t,
      e,
      n,
      r,
      s,
      i,
      !0
    )
  );
}
var as=var as=function as(t, e, n, r, s) {
  return Ye(
    Z(
      t,
      e,
      n,
      r,
      s,
      !0
    )
  );
}
var Xt=var Xt=function Xt(t) {
  return t ? t.__v_isVNode === !0 : !1;
}
var Ge=var Ge=function Ge(t, e) {
  return t.type === e.type && t.key === e.key;
}
const Qe = ({ key: t }) => t ?? null, Rt = ({
  ref: t,
  ref_key: e,
  ref_for: n
}) => (typeof t == "number" && (t = "" + t), t != null ? O(t) || /* @__PURE__ */ H(t) || w(t) ? { i: B, r: t, k: e, f: !!n } : t : null);
var Xe=var Xe=function Xe(t, e = null, n = null, r = 0, s = null, i = t === he ? 0 : 1, l = !1, c = !1) {
  const o = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t,
    props: e,
    key: e && Qe(e),
    ref: e && Rt(e),
    scopeId: We,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: i,
    patchFlag: r,
    dynamicProps: s,
    dynamicChildren: null,
    appContext: null,
    ctx: B
  };
  return c ? (Mt(o, n), i & 128 && t.normalize(o)) : n && (o.shapeFlag |= O(n) ? 8 : 16), mt > 0 && // avoid a block node from tracking itself
  !l && // has current parent block
  C && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (o.patchFlag > 0 || i & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  o.patchFlag !== 32 && C.push(o), o;
}
const Z = fs;
var fs=var fs=function fs(t, e = null, n = null, r = 0, s = null, i = !1) {
  if ((!t || t === ts) && (t = V), Xt(t)) {
    const c = yt(
      t,
      e,
      !0
      /* mergeRef: true */
    );
    return n && Mt(c, n), mt > 0 && !i && C && (c.shapeFlag & 6 ? C[C.indexOf(t)] = c : C.push(c)), c.patchFlag = -2, c;
  }
  if (_s(t) && (t = t.__vccOpts), e) {
    e = us(e);
    let { class: c, style: o } = e;
    c && !O(c) && (e.class = re(c)), S(o) && (/* @__PURE__ */ ae(o) && !y(o) && (o = St({}, o)), e.style = se(o));
  }
  const l = O(t) ? 1 : rs(t) ? 128 : ke(t) ? 64 : S(t) ? 4 : w(t) ? 2 : 0;
  return Xe(
    t,
    e,
    n,
    r,
    s,
    l,
    i,
    !0
  );
}
var us=var us=function us(t) {
  return t ? /* @__PURE__ */ ae(t) || qe(t) ? St({}, t) : t : null;
}
var yt=var yt=function yt(t, e, n = !1, r = !1) {
  const { props: s, ref: i, patchFlag: l, children: c, transition: o } = t, f = e ? ps(s || {}, e) : s, a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t.type,
    props: f,
    key: f && Qe(f),
    ref: e && e.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && i ? y(i) ? i.concat(Rt(e)) : [i, Rt(e)] : Rt(e)
    ) : i,
    scopeId: t.scopeId,
    slotScopeIds: t.slotScopeIds,
    children: c,
    target: t.target,
    targetStart: t.targetStart,
    targetAnchor: t.targetAnchor,
    staticCount: t.staticCount,
    shapeFlag: t.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: e && t.type !== he ? l === -1 ? 16 : l | 16 : l,
    dynamicProps: t.dynamicProps,
    dynamicChildren: t.dynamicChildren,
    appContext: t.appContext,
    dirs: t.dirs,
    transition: o,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: t.component,
    suspense: t.suspense,
    ssContent: t.ssContent && yt(t.ssContent),
    ssFallback: t.ssFallback && yt(t.ssFallback),
    placeholder: t.placeholder,
    el: t.el,
    anchor: t.anchor,
    ctx: t.ctx,
    ce: t.ce
  };
  return o && r && Et(
    a,
    o.clone(a)
  ), a;
}
var hs=var hs=function hs(t = " ", e = 0) {
  return Z(os, null, t, e);
}
var ds=var ds=function ds(t = "", e = !1) {
  return e ? (ls(), as(V, null, t)) : Z(V, null, t);
}
var Mt=var Mt=function Mt(t, e) {
  let n = 0;
  const { shapeFlag: r } = t;
  if (e == null)
    e = null;
  else if (y(e))
    n = 16;
  else if (typeof e == "object")
    if (r & 65) {
      const s = e.default;
      s && (s._c && (s._d = !1), Mt(t, s()), s._c && (s._d = !0));
      return;
    } else {
      n = 32;
      const s = e._;
      !s && !qe(e) ? e._ctx = B : s === 3 && B && (B.slots._ === 1 ? e._ = 1 : (e._ = 2, t.patchFlag |= 1024));
    }
  else if (w(e)) {
    if (r & 65) {
      Mt(t, { default: e });
      return;
    }
    e = { default: e, _ctx: B }, n = 32;
  } else
    e = String(e), r & 64 ? (n = 16, e = [hs(e)]) : n = 8;
  t.children = e, t.shapeFlag |= n;
}
var ps=var ps=function ps(...t) {
  const e = {};
  for (let n = 0; n < t.length; n++) {
    const r = t[n];
    for (const s in r)
      if (s === "class")
        e.class !== r.class && (e.class = re([e.class, r.class]));
      else if (s === "style")
        e.style = se([e.style, r.style]);
      else if (sn(s)) {
        const i = e[s], l = r[s];
        l && i !== l && !(y(i) && i.includes(l)) ? e[s] = i ? [].concat(i, l) : l : l == null && i == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !rn(s) && (e[s] = l);
      } else s !== "" && (e[s] = r[s]);
  }
  return e;
}
let ct = null;
const Ze = () => ct || B;
let Zt;
{
  const t = ne(), e = (n, r) => {
    let s;
    return (s = t[n]) || (s = t[n] = []), s.push(r), (i) => {
      s.length > 1 ? s.forEach((l) => l(i)) : s[0](i);
    };
  };
  Zt = e(
    "__VUE_INSTANCE_SETTERS__",
    (n) => ct = n
  ), e(
    "__VUE_SSR_SETTERS__",
    (n) => bt = n
  );
}
const gs = (t) => {
  const e = ct;
  return Zt(t), t.scope.on(), () => {
    t.scope.off(), Zt(e);
  };
};
let bt = !1;
var _s=var _s=function _s(t) {
  return w(t) && "__vccOpts" in t;
}
const Kt = (t, e) => /* @__PURE__ */ Pn(t, e, bt);
var Cs=var Cs=function Cs(t, e, n) {
  try {
    Lt(-1);
    const r = arguments.length;
    return r === 2 ? S(e) && !y(e) ? Xt(e) ? Z(t, null, [e]) : Z(t, e) : Z(t, null, e) : (r > 3 ? n = Array.prototype.slice.call(arguments, 2) : r === 3 && Xt(n) && (n = [n]), Z(t, e, n));
  } finally {
    Lt(1);
  }
}
var Is=var Is=function Is(t, e = {}) {
  const n = Kt(() => t.currentTime ?? 0), r = Kt(() => {
    const o = t.lyricLines || [];
    for (let f = 0; f < o.length; f++) {
      const a = o[f];
      if (t.currentTime >= (a.startTime ?? 0) && t.currentTime < (a.endTime ?? 1 / 0))
        return f;
    }
    return o.length > 0 && t.currentTime >= (o[o.length - 1].endTime ?? 0) ? o.length - 1 : -1;
  }), s = Kt(() => (t.lyricLines || []).map((o) => ({
    text: o.text || "",
    trText: o.translatedText || "",
    startTime: o.startTime || 0,
    duration: (o.endTime ?? 0) - (o.startTime ?? 0),
    words: o.words ? o.words.map((f) => ({
      text: f.text || "",
      startTime: (f.startTime ?? 0) - (o.startTime ?? 0),
      duration: (f.endTime ?? 0) - (f.startTime ?? 0)
    })) : void 0
  })));
  var i=var i=function i() {
    const o = t.coverColor;
    return typeof o == "string" ? { primary: o, average: o } : o && typeof o == "object" ? { primary: o.primary || "#ffffff", average: o.average || o.primary || "#ffffff" } : { primary: "#ffffff", average: "#ffffff" };
  }
  var l=var l=function l() {
    return {
      isInClimax: !!t.isClimax,
      segments: t.climaxSegments || [],
      energy: t.energy ?? 0,
      isBeat: !!t.isBeat,
      kickEnergy: t.kickEnergy ?? 0,
      bpm: t.bpm ?? 120
    };
  }
  var c=var c=function c(o, f) {
    if (e[o] !== void 0) return e[o];
    try {
      const a = localStorage.getItem("music-full-config");
      if (a) {
        const u = JSON.parse(a);
        if (u[o] !== void 0) return u[o];
      }
    } catch {
    }
    return f;
  }
  return { nowTime: n, nowIndex: r, lrcArray: s, getCoverColor: i, getClimaxState: l, getConfigValue: c };
}
var Rs=var Rs=function Rs(t, e) {
  return t.map((n, r) => {
    const s = e[r] ?? n.startTime ?? 0, i = e[r + 1] ?? (n.duration != null ? s + n.duration : s + 5), l = n.text || "", c = [];
    if (n.words && n.words.length > 0) {
      let o = 0;
      for (const f of n.words) {
        const a = s + (f.startTime || 0), u = s + (f.startTime || 0) + (f.duration || 0.3), p = l.slice(o, o + (f.text || "").length) || f.text || "";
        o += (f.text || "").length, c.push({
          text: p,
          startTime: a,
          endTime: u
        });
      }
    } else {
      const o = Array.from(l), f = Math.max((i - s) / Math.max(o.length, 1), 0.05);
      o.forEach((a, u) => {
        c.push({
          text: a,
          startTime: s + u * f,
          endTime: s + (u + 1) * f
        });
      });
    }
    return {
      words: c,
      startTime: s,
      endTime: i || s + 5,
      fullText: l,
      translation: n.trText || void 0
    };
  });
}
const As = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [r, s] of e)
    n[r] = s;
  return n;
};
__sh__plugin_vue_export_helper_Cmn1wCFW_js.B=Yn;__sh__plugin_vue_export_helper_Cmn1wCFW_js.F=he;__sh__plugin_vue_export_helper_Cmn1wCFW_js._=As;__sh__plugin_vue_export_helper_Cmn1wCFW_js.a=Ts;__sh__plugin_vue_export_helper_Cmn1wCFW_js.b=xs;__sh__plugin_vue_export_helper_Cmn1wCFW_js.c=Is;__sh__plugin_vue_export_helper_Cmn1wCFW_js.d=Xe;__sh__plugin_vue_export_helper_Cmn1wCFW_js.e=ys;__sh__plugin_vue_export_helper_Cmn1wCFW_js.f=Kt;__sh__plugin_vue_export_helper_Cmn1wCFW_js.g=ls;__sh__plugin_vue_export_helper_Cmn1wCFW_js.h=Z;__sh__plugin_vue_export_helper_Cmn1wCFW_js.i=bs;__sh__plugin_vue_export_helper_Cmn1wCFW_js.j=ds;__sh__plugin_vue_export_helper_Cmn1wCFW_js.k=re;__sh__plugin_vue_export_helper_Cmn1wCFW_js.l=St;__sh__plugin_vue_export_helper_Cmn1wCFW_js.m=Cs;__sh__plugin_vue_export_helper_Cmn1wCFW_js.n=se;__sh__plugin_vue_export_helper_Cmn1wCFW_js.o=Xn;__sh__plugin_vue_export_helper_Cmn1wCFW_js.p=vs;__sh__plugin_vue_export_helper_Cmn1wCFW_js.q=S;__sh__plugin_vue_export_helper_Cmn1wCFW_js.r=ws;__sh__plugin_vue_export_helper_Cmn1wCFW_js.s=y;__sh__plugin_vue_export_helper_Cmn1wCFW_js.t=dn;__sh__plugin_vue_export_helper_Cmn1wCFW_js.u=ms;__sh__plugin_vue_export_helper_Cmn1wCFW_js.w=Ss;__sh__plugin_vue_export_helper_Cmn1wCFW_js.z=Rs;
})();
/**
* @vue/runtime-dom v3.5.39
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let nt;
const M = typeof window < "u" && window.trustedTypes;
if (M)
  try {
    nt = /* @__PURE__ */ M.createPolicy("vue", {
      createHTML: (t) => t
    });
  } catch {
  }
const d = "transition", E = "animation", A = /* @__PURE__ */ Symbol("_vtc"), R = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: !0
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
}, et = /* @__PURE__ */ j(
  {},
  W,
  R
), ot = (t) => (t.displayName = "Transition", t.props = et, t), lt = /* @__PURE__ */ ot(
  (t, { slots: e }) => X(Y, st(t), e)
), g = (t, e = []) => {
  z(t) ? t.forEach((o) => o(...e)) : t && t(...e);
}, O = (t) => t ? z(t) ? t.some((e) => e.length > 1) : t.length > 1 : !1;
var st=function st(t) {
  const e = {};
  for (const n in t)
    n in R || (e[n] = t[n]);
  if (t.css === !1)
    return e;
  const {
    name: o = "v",
    type: s,
    duration: h,
    enterFromClass: u = `${o}-enter-from`,
    enterActiveClass: c = `${o}-enter-active`,
    enterToClass: p = `${o}-enter-to`,
    appearFromClass: m = u,
    appearActiveClass: f = c,
    appearToClass: r = p,
    leaveFromClass: i = `${o}-leave-from`,
    leaveActiveClass: l = `${o}-leave-active`,
    leaveToClass: y = `${o}-leave-to`
  } = t, S = rt(h), K = S && S[0], k = S && S[1], {
    onBeforeEnter: b,
    onEnter: N,
    onEnterCancelled: F,
    onLeave: I,
    onLeaveCancelled: G,
    onBeforeAppear: J = b,
    onAppear: Q = N,
    onAppearCancelled: U = F
  } = e, L = (n, a, C, D) => {
    n._enterCancelled = D, T(n, a ? r : p), T(n, a ? f : c), C && C();
  }, _ = (n, a) => {
    n._isLeaving = !1, T(n, i), T(n, y), T(n, l), a && a();
  }, w = (n) => (a, C) => {
    const D = n ? Q : N, B = () => L(a, n, C);
    g(D, [a, B]), P(() => {
      T(a, n ? m : u), v(a, n ? r : p), O(D) || x(a, s, K, B);
    });
  };
  return j(e, {
    onBeforeEnter(n) {
      g(b, [n]), v(n, u), v(n, c);
    },
    onBeforeAppear(n) {
      g(J, [n]), v(n, m), v(n, f);
    },
    onEnter: w(!1),
    onAppear: w(!0),
    onLeave(n, a) {
      n._isLeaving = !0;
      const C = () => _(n, a);
      v(n, i), n._enterCancelled ? (v(n, l), V(n)) : (V(n), v(n, l)), P(() => {
        n._isLeaving && (T(n, i), v(n, y), O(I) || x(n, s, k, C));
      }), g(I, [n, C]);
    },
    onEnterCancelled(n) {
      L(n, !1, void 0, !0), g(F, [n]);
    },
    onAppearCancelled(n) {
      L(n, !0, void 0, !0), g(U, [n]);
    },
    onLeaveCancelled(n) {
      _(n), g(G, [n]);
    }
  });
}
var rt=function rt(t) {
  if (t == null)
    return null;
  if (Z(t))
    return [$(t.enter), $(t.leave)];
  {
    const e = $(t);
    return [e, e];
  }
}
var $=function $(t) {
  return tt(t);
}
var v=function v(t, e) {
  e.split(/\s+/).forEach((o) => o && t.classList.add(o)), (t[A] || (t[A] = /* @__PURE__ */ new Set())).add(e);
}
var T=function T(t, e) {
  e.split(/\s+/).forEach((s) => s && t.classList.remove(s));
  const o = t[A];
  o && (o.delete(e), o.size || (t[A] = void 0));
}
var P=function P(t) {
  requestAnimationFrame(() => {
    requestAnimationFrame(t);
  });
}
let at = 0;
var x=function x(t, e, o, s) {
  const h = t._endId = ++at, u = () => {
    h === t._endId && s();
  };
  if (o != null)
    return setTimeout(u, o);
  const { type: c, timeout: p, propCount: m } = it(t, e);
  if (!c)
    return s();
  const f = c + "end";
  let r = 0;
  const i = () => {
    t.removeEventListener(f, l), u();
  }, l = (y) => {
    y.target === t && ++r >= m && i();
  };
  setTimeout(() => {
    r < m && i();
  }, p + 1), t.addEventListener(f, l);
}
var it=function it(t, e) {
  const o = window.getComputedStyle(t), s = (S) => (o[S] || "").split(", "), h = s(`${d}Delay`), u = s(`${d}Duration`), c = H(h, u), p = s(`${E}Delay`), m = s(`${E}Duration`), f = H(p, m);
  let r = null, i = 0, l = 0;
  e === d ? c > 0 && (r = d, i = c, l = u.length) : e === E ? f > 0 && (r = E, i = f, l = m.length) : (i = Math.max(c, f), r = i > 0 ? c > f ? d : E : null, l = r ? r === d ? u.length : m.length : 0);
  const y = r === d && /\b(?:transform|all)(?:,|$)/.test(
    s(`${d}Property`).toString()
  );
  return {
    type: r,
    timeout: i,
    propCount: l,
    hasTransform: y
  };
}
var H=function H(t, e) {
  for (; t.length < e.length; )
    t = t.concat(t);
  return Math.max(...e.map((o, s) => q(o) + q(t[s])));
}
var q=function q(t) {
  return t === "auto" ? 0 : Number(t.slice(0, -1).replace(",", ".")) * 1e3;
}
var V=function V(t) {
  return (t ? t.ownerDocument : document).body.offsetHeight;
}
__sh_runtime_dom_esm_bundler_CwR6cVdo_js.T=lt;
})();
var __sh__plugin_vue_export_helper_Cmn1wCFW_js={};
(function(){
/**
* @vue/shared v3.5.39
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
var en=function en(t) {
  const e = /* @__PURE__ */ Object.create(null);
  for (const n of t.split(",")) e[n] = 1;
  return (n) => n in e;
}
const te = {}, nn = [], Ct = () => {
}, sn = (t) => t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && // uppercase letter
(t.charCodeAt(2) > 122 || t.charCodeAt(2) < 97), rn = (t) => t.startsWith("onUpdate:"), St = Object.assign, on = Object.prototype.hasOwnProperty, zt = (t, e) => on.call(t, e), y = Array.isArray, rt = (t) => Nt(t) === "[object Map]", be = (t) => Nt(t) === "[object Set]", w = (t) => typeof t == "function", O = (t) => typeof t == "string", et = (t) => typeof t == "symbol", S = (t) => t !== null && typeof t == "object", ln = (t) => (S(t) || w(t)) && w(t.then) && w(t.catch), Se = Object.prototype.toString, Nt = (t) => Se.call(t), cn = (t) => Nt(t).slice(8, -1), ve = (t) => Nt(t) === "[object Object]", ee = (t) => O(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t, j = (t, e) => !Object.is(t, e), ms = (t) => {
  const e = O(t) ? Number(t) : NaN;
  return isNaN(e) ? t : e;
};
let pe;
const ne = () => pe || (pe = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
var se=function se(t) {
  if (y(t)) {
    const e = {};
    for (let n = 0; n < t.length; n++) {
      const r = t[n], s = O(r) ? hn(r) : se(r);
      if (s)
        for (const i in s)
          e[i] = s[i];
    }
    return e;
  } else if (O(t) || S(t))
    return t;
}
const an = /;(?![^(]*\))/g, fn = /:([^]+)/, un = /\/\*[^]*?\*\//g;
var hn=function hn(t) {
  const e = {};
  return t.replace(un, "").split(an).forEach((n) => {
    if (n) {
      const r = n.split(fn);
      r.length > 1 && (e[r[0].trim()] = r[1].trim());
    }
  }), e;
}
var re=function re(t) {
  let e = "";
  if (O(t))
    e = t;
  else if (y(t))
    for (let n = 0; n < t.length; n++) {
      const r = re(t[n]);
      r && (e += r + " ");
    }
  else if (S(t))
    for (const n in t)
      t[n] && (e += n + " ");
  return e.trim();
}
const Te = (t) => !!(t && t.__v_isRef === !0), dn = (t) => O(t) ? t : t == null ? "" : y(t) || S(t) && (t.toString === Se || !w(t.toString)) ? Te(t) ? dn(t.value) : JSON.stringify(t, we, 2) : String(t), we = (t, e) => Te(e) ? we(t, e.value) : rt(e) ? {
  [`Map(${e.size})`]: [...e.entries()].reduce(
    (n, [r, s], i) => (n[Vt(r, i) + " =>"] = s, n),
    {}
  )
} : be(e) ? {
  [`Set(${e.size})`]: [...e.values()].map((n) => Vt(n))
} : et(e) ? Vt(e) : S(e) && !y(e) && !ve(e) ? String(e) : e, Vt = (t, e = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    et(t) ? `Symbol(${(n = t.description) != null ? n : e})` : t
  );
};
/**
* @vue/reactivity v3.5.39
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let m;
const Bt = /* @__PURE__ */ new WeakSet();
class pn {
  constructor(e) {
    this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0;
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Bt.has(this) && (Bt.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Ce(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, ge(this), Ie(this);
    const e = m, n = N;
    m = this, N = !0;
    try {
      return this.fn();
    } finally {
      Re(this), m = e, N = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let e = this.deps; e; e = e.nextDep)
        le(e);
      this.deps = this.depsTail = void 0, ge(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Bt.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    Ut(this) && this.run();
  }
  get dirty() {
    return Ut(this);
  }
}
let xe = 0, ht, dt;
var Ce=function Ce(t, e = !1) {
  if (t.flags |= 8, e) {
    t.next = dt, dt = t;
    return;
  }
  t.next = ht, ht = t;
}
var ie=function ie() {
  xe++;
}
var oe=function oe() {
  if (--xe > 0)
    return;
  if (dt) {
    let e = dt;
    for (dt = void 0; e; ) {
      const n = e.next;
      e.next = void 0, e.flags &= -9, e = n;
    }
  }
  let t;
  for (; ht; ) {
    let e = ht;
    for (ht = void 0; e; ) {
      const n = e.next;
      if (e.next = void 0, e.flags &= -9, e.flags & 1)
        try {
          e.trigger();
        } catch (r) {
          t || (t = r);
        }
      e = n;
    }
  }
  if (t) throw t;
}
var Ie=function Ie(t) {
  for (let e = t.deps; e; e = e.nextDep)
    e.version = -1, e.prevActiveLink = e.dep.activeLink, e.dep.activeLink = e;
}
var Re=function Re(t) {
  let e, n = t.depsTail, r = n;
  for (; r; ) {
    const s = r.prevDep;
    r.version === -1 ? (r === n && (n = s), le(r), gn(r)) : e = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = s;
  }
  t.deps = e, t.depsTail = n;
}
var Ut=function Ut(t) {
  for (let e = t.deps; e; e = e.nextDep)
    if (e.dep.version !== e.version || e.dep.computed && (Ae(e.dep.computed) || e.dep.version !== e.version))
      return !0;
  return !!t._dirty;
}
var Ae=function Ae(t) {
  if (t.flags & 4 && !(t.flags & 16) || (t.flags &= -17, t.globalVersion === pt) || (t.globalVersion = pt, !t.isSSR && t.flags & 128 && (!t.deps && !t._dirty || !Ut(t))))
    return;
  t.flags |= 2;
  const e = t.dep, n = m, r = N;
  m = t, N = !0;
  try {
    Ie(t);
    const s = t.fn(t._value);
    (e.version === 0 || j(s, t._value)) && (t.flags |= 128, t._value = s, e.version++);
  } catch (s) {
    throw e.version++, s;
  } finally {
    m = n, N = r, Re(t), t.flags &= -3;
  }
}
var le=function le(t, e = !1) {
  const { dep: n, prevSub: r, nextSub: s } = t;
  if (r && (r.nextSub = s, t.prevSub = void 0), s && (s.prevSub = r, t.nextSub = void 0), n.subs === t && (n.subs = r, !r && n.computed)) {
    n.computed.flags &= -5;
    for (let i = n.computed.deps; i; i = i.nextDep)
      le(i, !0);
  }
  !e && !--n.sc && n.map && n.map.delete(n.key);
}
var gn=function gn(t) {
  const { prevDep: e, nextDep: n } = t;
  e && (e.nextDep = n, t.prevDep = void 0), n && (n.prevDep = e, t.nextDep = void 0);
}
let N = !0;
const Ee = [];
var Ot=function Ot() {
  Ee.push(N), N = !1;
}
var Dt=function Dt() {
  const t = Ee.pop();
  N = t === void 0 ? !0 : t;
}
var ge=function ge(t) {
  const { cleanup: e } = t;
  if (t.cleanup = void 0, e) {
    const n = m;
    m = void 0;
    try {
      e();
    } finally {
      m = n;
    }
  }
}
let pt = 0;
class _n {
  constructor(e, n) {
    this.sub = e, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class ce {
  // TODO isolatedDeclarations "__v_skip"
  constructor(e) {
    this.computed = e, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(e) {
    if (!m || !N || m === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== m)
      n = this.activeLink = new _n(m, this), m.deps ? (n.prevDep = m.depsTail, m.depsTail.nextDep = n, m.depsTail = n) : m.deps = m.depsTail = n, Le(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const r = n.nextDep;
      r.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = r), n.prevDep = m.depsTail, n.nextDep = void 0, m.depsTail.nextDep = n, m.depsTail = n, m.deps === n && (m.deps = r);
    }
    return n;
  }
  trigger(e) {
    this.version++, pt++, this.notify(e);
  }
  notify(e) {
    ie();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      oe();
    }
  }
}
var Le=function Le(t) {
  if (t.dep.sc++, t.sub.flags & 4) {
    const e = t.dep.computed;
    if (e && !t.dep.subs) {
      e.flags |= 20;
      for (let r = e.deps; r; r = r.nextDep)
        Le(r);
    }
    const n = t.dep.subs;
    n !== t && (t.prevSub = n, n && (n.nextSub = t)), t.dep.subs = t;
  }
}
const Jt = /* @__PURE__ */ new WeakMap(), tt = /* @__PURE__ */ Symbol(
  ""
), $t = /* @__PURE__ */ Symbol(
  ""
), gt = /* @__PURE__ */ Symbol(
  ""
);
var T=function T(t, e, n) {
  if (N && m) {
    let r = Jt.get(t);
    r || Jt.set(t, r = /* @__PURE__ */ new Map());
    let s = r.get(n);
    s || (r.set(n, s = new ce()), s.map = r, s.key = n), s.track();
  }
}
var q=function q(t, e, n, r, s, i) {
  const l = Jt.get(t);
  if (!l) {
    pt++;
    return;
  }
  const c = (o) => {
    o && o.trigger();
  };
  if (ie(), e === "clear")
    l.forEach(c);
  else {
    const o = y(t), f = o && ee(n);
    if (o && n === "length") {
      const a = Number(r);
      l.forEach((u, p) => {
        (p === "length" || p === gt || !et(p) && p >= a) && c(u);
      });
    } else
      switch ((n !== void 0 || l.has(void 0)) && c(l.get(n)), f && c(l.get(gt)), e) {
        case "add":
          o ? f && c(l.get("length")) : (c(l.get(tt)), rt(t) && c(l.get($t)));
          break;
        case "delete":
          o || (c(l.get(tt)), rt(t) && c(l.get($t)));
          break;
        case "set":
          rt(t) && c(l.get(tt));
          break;
      }
  }
  oe();
}
var nt=function nt(t) {
  const e = /* @__PURE__ */ _(t);
  return e === t ? e : (T(e, "iterate", gt), /* @__PURE__ */ L(t) ? e : e.map(D));
}
var Pt=function Pt(t) {
  return T(t = /* @__PURE__ */ _(t), "iterate", gt), t;
}
var F=function F(t, e) {
  return /* @__PURE__ */ U(t) ? lt(/* @__PURE__ */ it(t) ? D(e) : e) : D(e);
}
const mn = {
  __proto__: null,
  [Symbol.iterator]() {
    return Ht(this, Symbol.iterator, (t) => F(this, t));
  },
  concat(...t) {
    return nt(this).concat(
      ...t.map((e) => y(e) ? nt(e) : e)
    );
  },
  entries() {
    return Ht(this, "entries", (t) => (t[1] = F(this, t[1]), t));
  },
  every(t, e) {
    return k(this, "every", t, e, void 0, arguments);
  },
  filter(t, e) {
    return k(
      this,
      "filter",
      t,
      e,
      (n) => n.map((r) => F(this, r)),
      arguments
    );
  },
  find(t, e) {
    return k(
      this,
      "find",
      t,
      e,
      (n) => F(this, n),
      arguments
    );
  },
  findIndex(t, e) {
    return k(this, "findIndex", t, e, void 0, arguments);
  },
  findLast(t, e) {
    return k(
      this,
      "findLast",
      t,
      e,
      (n) => F(this, n),
      arguments
    );
  },
  findLastIndex(t, e) {
    return k(this, "findLastIndex", t, e, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(t, e) {
    return k(this, "forEach", t, e, void 0, arguments);
  },
  includes(...t) {
    return Wt(this, "includes", t);
  },
  indexOf(...t) {
    return Wt(this, "indexOf", t);
  },
  join(t) {
    return nt(this).join(t);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...t) {
    return Wt(this, "lastIndexOf", t);
  },
  map(t, e) {
    return k(this, "map", t, e, void 0, arguments);
  },
  pop() {
    return ft(this, "pop");
  },
  push(...t) {
    return ft(this, "push", t);
  },
  reduce(t, ...e) {
    return _e(this, "reduce", t, e);
  },
  reduceRight(t, ...e) {
    return _e(this, "reduceRight", t, e);
  },
  shift() {
    return ft(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(t, e) {
    return k(this, "some", t, e, void 0, arguments);
  },
  splice(...t) {
    return ft(this, "splice", t);
  },
  toReversed() {
    return nt(this).toReversed();
  },
  toSorted(t) {
    return nt(this).toSorted(t);
  },
  toSpliced(...t) {
    return nt(this).toSpliced(...t);
  },
  unshift(...t) {
    return ft(this, "unshift", t);
  },
  values() {
    return Ht(this, "values", (t) => F(this, t));
  }
};
var Ht=function Ht(t, e, n) {
  const r = Pt(t), s = r[e]();
  return r !== t && !/* @__PURE__ */ L(t) && (s._next = s.next, s.next = () => {
    const i = s._next();
    return i.done || (i.value = n(i.value)), i;
  }), s;
}
const yn = Array.prototype;
var k=function k(t, e, n, r, s, i) {
  const l = Pt(t), c = l !== t && !/* @__PURE__ */ L(t), o = l[e];
  if (o !== yn[e]) {
    const u = o.apply(t, i);
    return c ? D(u) : u;
  }
  let f = n;
  l !== t && (c ? f = function(u, p) {
    return n.call(this, F(t, u), p, t);
  } : n.length > 2 && (f = function(u, p) {
    return n.call(this, u, p, t);
  }));
  const a = o.call(l, f, r);
  return c && s ? s(a) : a;
}
var _e=function _e(t, e, n, r) {
  const s = Pt(t), i = s !== t && !/* @__PURE__ */ L(t);
  let l = n, c = !1;
  s !== t && (i ? (c = r.length === 0, l = function(f, a, u) {
    return c && (c = !1, f = F(t, f)), n.call(this, f, F(t, a), u, t);
  }) : n.length > 3 && (l = function(f, a, u) {
    return n.call(this, f, a, u, t);
  }));
  const o = s[e](l, ...r);
  return c ? F(t, o) : o;
}
var Wt=function Wt(t, e, n) {
  const r = /* @__PURE__ */ _(t);
  T(r, "iterate", gt);
  const s = r[e](...n);
  return (s === -1 || s === !1) && /* @__PURE__ */ ae(n[0]) ? (n[0] = /* @__PURE__ */ _(n[0]), r[e](...n)) : s;
}
var ft=function ft(t, e, n = []) {
  Ot(), ie();
  const r = (/* @__PURE__ */ _(t))[e].apply(t, n);
  return oe(), Dt(), r;
}
const bn = /* @__PURE__ */ en("__proto__,__v_isRef,__isVue"), Me = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((t) => t !== "arguments" && t !== "caller").map((t) => Symbol[t]).filter(et)
);
var Sn=function Sn(t) {
  et(t) || (t = String(t));
  const e = /* @__PURE__ */ _(this);
  return T(e, "has", t), e.hasOwnProperty(t);
}
class Ne {
  constructor(e = !1, n = !1) {
    this._isReadonly = e, this._isShallow = n;
  }
  get(e, n, r) {
    if (n === "__v_skip") return e.__v_skip;
    const s = this._isReadonly, i = this._isShallow;
    if (n === "__v_isReactive")
      return !s;
    if (n === "__v_isReadonly")
      return s;
    if (n === "__v_isShallow")
      return i;
    if (n === "__v_raw")
      return r === (s ? i ? Ln : Pe : i ? En : De).get(e) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(e) === Object.getPrototypeOf(r) ? e : void 0;
    const l = y(e);
    if (!s) {
      let o;
      if (l && (o = mn[n]))
        return o;
      if (n === "hasOwnProperty")
        return Sn;
    }
    const c = Reflect.get(
      e,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ H(e) ? e : r
    );
    if ((et(n) ? Me.has(n) : bn(n)) || (s || T(e, "get", n), i))
      return c;
    if (/* @__PURE__ */ H(c)) {
      const o = l && ee(n) ? c : c.value;
      return s && S(o) ? /* @__PURE__ */ Yt(o) : o;
    }
    return S(c) ? s ? /* @__PURE__ */ Yt(c) : /* @__PURE__ */ Fe(c) : c;
  }
}
class vn extends Ne {
  constructor(e = !1) {
    super(!1, e);
  }
  set(e, n, r, s) {
    let i = e[n];
    const l = y(e) && ee(n);
    if (!this._isShallow) {
      const f = /* @__PURE__ */ U(i);
      if (!/* @__PURE__ */ L(r) && !/* @__PURE__ */ U(r) && (i = /* @__PURE__ */ _(i), r = /* @__PURE__ */ _(r)), !l && /* @__PURE__ */ H(i) && !/* @__PURE__ */ H(r))
        return f || (i.value = r), !0;
    }
    const c = l ? Number(n) < e.length : zt(e, n), o = Reflect.set(
      e,
      n,
      r,
      /* @__PURE__ */ H(e) ? e : s
    );
    return e === /* @__PURE__ */ _(s) && o && (c ? j(r, i) && q(e, "set", n, r) : q(e, "add", n, r)), o;
  }
  deleteProperty(e, n) {
    const r = zt(e, n);
    e[n];
    const s = Reflect.deleteProperty(e, n);
    return s && r && q(e, "delete", n, void 0), s;
  }
  has(e, n) {
    const r = Reflect.has(e, n);
    return (!et(n) || !Me.has(n)) && T(e, "has", n), r;
  }
  ownKeys(e) {
    return T(
      e,
      "iterate",
      y(e) ? "length" : tt
    ), Reflect.ownKeys(e);
  }
}
class Tn extends Ne {
  constructor(e = !1) {
    super(!0, e);
  }
  set(e, n) {
    return !0;
  }
  deleteProperty(e, n) {
    return !0;
  }
}
const wn = /* @__PURE__ */ new vn(), xn = /* @__PURE__ */ new Tn(), qt = (t) => t, Tt = (t) => Reflect.getPrototypeOf(t);
var Cn=function Cn(t, e, n) {
  return function(...r) {
    const s = this.__v_raw, i = /* @__PURE__ */ _(s), l = rt(i), c = t === "entries" || t === Symbol.iterator && l, o = t === "keys" && l, f = s[t](...r), a = n ? qt : e ? lt : D;
    return !e && T(
      i,
      "iterate",
      o ? $t : tt
    ), St(
      // inheriting all iterator properties
      Object.create(f),
      {
        // iterator protocol
        next() {
          const { value: u, done: p } = f.next();
          return p ? { value: u, done: p } : {
            value: c ? [a(u[0]), a(u[1])] : a(u),
            done: p
          };
        }
      }
    );
  };
}
var wt=function wt(t) {
  return function(...e) {
    return t === "delete" ? !1 : t === "clear" ? void 0 : this;
  };
}
var In=function In(t, e) {
  const n = {
    get(s) {
      const i = this.__v_raw, l = /* @__PURE__ */ _(i), c = /* @__PURE__ */ _(s);
      t || (j(s, c) && T(l, "get", s), T(l, "get", c));
      const { has: o } = Tt(l), f = e ? qt : t ? lt : D;
      if (o.call(l, s))
        return f(i.get(s));
      if (o.call(l, c))
        return f(i.get(c));
      i !== l && i.get(s);
    },
    get size() {
      const s = this.__v_raw;
      return !t && T(/* @__PURE__ */ _(s), "iterate", tt), s.size;
    },
    has(s) {
      const i = this.__v_raw, l = /* @__PURE__ */ _(i), c = /* @__PURE__ */ _(s);
      return t || (j(s, c) && T(l, "has", s), T(l, "has", c)), s === c ? i.has(s) : i.has(s) || i.has(c);
    },
    forEach(s, i) {
      const l = this, c = l.__v_raw, o = /* @__PURE__ */ _(c), f = e ? qt : t ? lt : D;
      return !t && T(o, "iterate", tt), c.forEach((a, u) => s.call(i, f(a), f(u), l));
    }
  };
  return St(
    n,
    t ? {
      add: wt("add"),
      set: wt("set"),
      delete: wt("delete"),
      clear: wt("clear")
    } : {
      add(s) {
        const i = /* @__PURE__ */ _(this), l = Tt(i), c = /* @__PURE__ */ _(s), o = !e && !/* @__PURE__ */ L(s) && !/* @__PURE__ */ U(s) ? c : s;
        return l.has.call(i, o) || j(s, o) && l.has.call(i, s) || j(c, o) && l.has.call(i, c) || (i.add(o), q(i, "add", o, o)), this;
      },
      set(s, i) {
        !e && !/* @__PURE__ */ L(i) && !/* @__PURE__ */ U(i) && (i = /* @__PURE__ */ _(i));
        const l = /* @__PURE__ */ _(this), { has: c, get: o } = Tt(l);
        let f = c.call(l, s);
        f || (s = /* @__PURE__ */ _(s), f = c.call(l, s));
        const a = o.call(l, s);
        return l.set(s, i), f ? j(i, a) && q(l, "set", s, i) : q(l, "add", s, i), this;
      },
      delete(s) {
        const i = /* @__PURE__ */ _(this), { has: l, get: c } = Tt(i);
        let o = l.call(i, s);
        o || (s = /* @__PURE__ */ _(s), o = l.call(i, s)), c && c.call(i, s);
        const f = i.delete(s);
        return o && q(i, "delete", s, void 0), f;
      },
      clear() {
        const s = /* @__PURE__ */ _(this), i = s.size !== 0, l = s.clear();
        return i && q(
          s,
          "clear",
          void 0,
          void 0
        ), l;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((s) => {
    n[s] = Cn(s, t, e);
  }), n;
}
var Oe=function Oe(t, e) {
  const n = In(t, e);
  return (r, s, i) => s === "__v_isReactive" ? !t : s === "__v_isReadonly" ? t : s === "__v_raw" ? r : Reflect.get(
    zt(n, s) && s in r ? n : r,
    s,
    i
  );
}
const Rn = {
  get: /* @__PURE__ */ Oe(!1, !1)
}, An = {
  get: /* @__PURE__ */ Oe(!0, !1)
}, De = /* @__PURE__ */ new WeakMap(), En = /* @__PURE__ */ new WeakMap(), Pe = /* @__PURE__ */ new WeakMap(), Ln = /* @__PURE__ */ new WeakMap();
var Mn=function Mn(t) {
  switch (t) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
// @__NO_SIDE_EFFECTS__
var Fe=function Fe(t) {
  return /* @__PURE__ */ U(t) ? t : je(
    t,
    !1,
    wn,
    Rn,
    De
  );
}
// @__NO_SIDE_EFFECTS__
var Yt=function Yt(t) {
  return je(
    t,
    !0,
    xn,
    An,
    Pe
  );
}
var je=function je(t, e, n, r, s) {
  if (!S(t) || t.__v_raw && !(e && t.__v_isReactive) || t.__v_skip || !Object.isExtensible(t))
    return t;
  const i = s.get(t);
  if (i)
    return i;
  const l = Mn(cn(t));
  if (l === 0)
    return t;
  const c = new Proxy(
    t,
    l === 2 ? r : n
  );
  return s.set(t, c), c;
}
// @__NO_SIDE_EFFECTS__
var it=function it(t) {
  return /* @__PURE__ */ U(t) ? /* @__PURE__ */ it(t.__v_raw) : !!(t && t.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
var U=function U(t) {
  return !!(t && t.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
var L=function L(t) {
  return !!(t && t.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
var ae=function ae(t) {
  return t ? !!t.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
var _=function _(t) {
  const e = t && t.__v_raw;
  return e ? /* @__PURE__ */ _(e) : t;
}
const D = (t) => S(t) ? /* @__PURE__ */ Fe(t) : t, lt = (t) => S(t) ? /* @__PURE__ */ Yt(t) : t;
// @__NO_SIDE_EFFECTS__
var H=function H(t) {
  return t ? t.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
var ys=function ys(t) {
  return Nn(t, !1);
}
var Nn=function Nn(t, e) {
  return /* @__PURE__ */ H(t) ? t : new On(t, e);
}
class On {
  constructor(e, n) {
    this.dep = new ce(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? e : /* @__PURE__ */ _(e), this._value = n ? e : D(e), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(e) {
    const n = this._rawValue, r = this.__v_isShallow || /* @__PURE__ */ L(e) || /* @__PURE__ */ U(e);
    e = r ? e : /* @__PURE__ */ _(e), j(e, n) && (this._rawValue = e, this._value = r ? e : D(e), this.dep.trigger());
  }
}
class Dn {
  constructor(e, n, r) {
    this.fn = e, this.setter = n, this._value = void 0, this.dep = new ce(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = pt - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = r;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    m !== this)
      return Ce(this, !0), !0;
  }
  get value() {
    const e = this.dep.track();
    return Ae(this), e && (e.version = this.dep.version), this._value;
  }
  set value(e) {
    this.setter && this.setter(e);
  }
}
// @__NO_SIDE_EFFECTS__
var Pn=function Pn(t, e, n = !1) {
  let r, s;
  return w(t) ? r = t : (r = t.get, s = t.set), new Dn(r, s, n);
}
const xt = {}, At = /* @__PURE__ */ new WeakMap();
let X;
var Fn=function Fn(t, e = !1, n = X) {
  if (n) {
    let r = At.get(n);
    r || At.set(n, r = []), r.push(t);
  }
}
var jn=function jn(t, e, n = te) {
  const { immediate: r, deep: s, once: i, scheduler: l, augmentJob: c, call: o } = n, f = (h) => s ? h : /* @__PURE__ */ L(h) || s === !1 || s === 0 ? Y(h, 1) : Y(h);
  let a, u, p, g, I = !1, P = !1;
  if (/* @__PURE__ */ H(t) ? (u = () => t.value, I = /* @__PURE__ */ L(t)) : /* @__PURE__ */ it(t) ? (u = () => f(t), I = !0) : y(t) ? (P = !0, I = t.some((h) => /* @__PURE__ */ it(h) || /* @__PURE__ */ L(h)), u = () => t.map((h) => {
    if (/* @__PURE__ */ H(h))
      return h.value;
    if (/* @__PURE__ */ it(h))
      return f(h);
    if (w(h))
      return o ? o(h, 2) : h();
  })) : w(t) ? e ? u = o ? () => o(t, 2) : t : u = () => {
    if (p) {
      Ot();
      try {
        p();
      } finally {
        Dt();
      }
    }
    const h = X;
    X = a;
    try {
      return o ? o(t, 3, [g]) : t(g);
    } finally {
      X = h;
    }
  } : u = Ct, e && s) {
    const h = u, x = s === !0 ? 1 / 0 : s;
    u = () => Y(h(), x);
  }
  const J = () => {
    a.stop();
  };
  if (i && e) {
    const h = e;
    e = (...x) => {
      const M = h(...x);
      return J(), M;
    };
  }
  let W = P ? new Array(t.length).fill(xt) : xt;
  const G = (h) => {
    if (!(!(a.flags & 1) || !a.dirty && !h))
      if (e) {
        const x = a.run();
        if (h || s || I || (P ? x.some((M, R) => j(M, W[R])) : j(x, W))) {
          p && p();
          const M = X;
          X = a;
          try {
            const R = [
              x,
              // pass undefined as the old value when it's changed for the first time
              W === xt ? void 0 : P && W[0] === xt ? [] : W,
              g
            ];
            W = x, o ? o(e, 3, R) : (
              // @ts-expect-error
              e(...R)
            );
          } finally {
            X = M;
          }
        }
      } else
        a.run();
  };
  return c && c(G), a = new pn(u), a.scheduler = l ? () => l(G, !1) : G, g = (h) => Fn(h, !1, a), p = a.onStop = () => {
    const h = At.get(a);
    if (h) {
      if (o)
        o(h, 4);
      else
        for (const x of h) x();
      At.delete(a);
    }
  }, e ? r ? G(!0) : W = a.run() : l ? l(G.bind(null, !0), !0) : a.run(), J.pause = a.pause.bind(a), J.resume = a.resume.bind(a), J.stop = J, J;
}
var Y=function Y(t, e = 1 / 0, n) {
  if (e <= 0 || !S(t) || t.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(t) || 0) >= e))
    return t;
  if (n.set(t, e), e--, /* @__PURE__ */ H(t))
    Y(t.value, e, n);
  else if (y(t))
    for (let r = 0; r < t.length; r++)
      Y(t[r], e, n);
  else if (be(t) || rt(t))
    t.forEach((r) => {
      Y(r, e, n);
    });
  else if (ve(t)) {
    for (const r in t)
      Y(t[r], e, n);
    for (const r of Object.getOwnPropertySymbols(t))
      Object.prototype.propertyIsEnumerable.call(t, r) && Y(t[r], e, n);
  }
  return t;
}
/**
* @vue/runtime-core v3.5.39
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
var fe=function fe(t, e, n, r) {
  try {
    return r ? t(...r) : t();
  } catch (s) {
    Ve(s, e, n);
  }
}
var Ft=function Ft(t, e, n, r) {
  if (w(t)) {
    const s = fe(t, e, n, r);
    return s && ln(s) && s.catch((i) => {
      Ve(i, e, n);
    }), s;
  }
  if (y(t)) {
    const s = [];
    for (let i = 0; i < t.length; i++)
      s.push(Ft(t[i], e, n, r));
    return s;
  }
}
var Ve=function Ve(t, e, n, r = !0) {
  const s = e ? e.vnode : null, { errorHandler: i, throwUnhandledErrorInProduction: l } = e && e.appContext.config || te;
  if (e) {
    let c = e.parent;
    const o = e.proxy, f = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; c; ) {
      const a = c.ec;
      if (a) {
        for (let u = 0; u < a.length; u++)
          if (a[u](t, o, f) === !1)
            return;
      }
      c = c.parent;
    }
    if (i) {
      Ot(), fe(i, null, 10, [
        t,
        o,
        f
      ]), Dt();
      return;
    }
  }
  Vn(t, n, s, r, l);
}
var Vn=function Vn(t, e, n, r = !0, s = !1) {
  if (s)
    throw t;
  console.error(t);
}
const E = [];
let K = -1;
const ot = [];
let $ = null, st = 0;
const Bn = /* @__PURE__ */ Promise.resolve();
let Gt = null;
var Hn=function Hn(t) {
  let e = K + 1, n = E.length;
  for (; e < n; ) {
    const r = e + n >>> 1, s = E[r], i = _t(s);
    i < t || i === t && s.flags & 2 ? e = r + 1 : n = r;
  }
  return e;
}
var Wn=function Wn(t) {
  if (!(t.flags & 1)) {
    const e = _t(t), n = E[E.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(t.flags & 2) && e >= _t(n) ? E.push(t) : E.splice(Hn(e), 0, t), t.flags |= 1, Be();
  }
}
var Be=function Be() {
  Gt || (Gt = Bn.then(He));
}
var kn=function kn(t) {
  y(t) ? ot.push(...t) : $ && t.id === -1 ? $.splice(st + 1, 0, t) : t.flags & 1 || (ot.push(t), t.flags |= 1), Be();
}
var Kn=function Kn(t) {
  if (ot.length) {
    const e = [...new Set(ot)].sort(
      (n, r) => _t(n) - _t(r)
    );
    if (ot.length = 0, $) {
      $.push(...e);
      return;
    }
    for ($ = e, st = 0; st < $.length; st++) {
      const n = $[st];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    $ = null, st = 0;
  }
}
const _t = (t) => t.id == null ? t.flags & 2 ? -1 : 1 / 0 : t.id;
var He=function He(t) {
  try {
    for (K = 0; K < E.length; K++) {
      const e = E[K];
      e && !(e.flags & 8) && (e.flags & 4 && (e.flags &= -2), fe(
        e,
        e.i,
        e.i ? 15 : 14
      ), e.flags & 4 || (e.flags &= -2));
    }
  } finally {
    for (; K < E.length; K++) {
      const e = E[K];
      e && (e.flags &= -2);
    }
    K = -1, E.length = 0, Kn(), Gt = null, (E.length || ot.length) && He();
  }
}
let B = null, We = null;
var me=function me(t) {
  const e = B;
  return B = t, We = t && t.type.__scopeId || null, e;
}
var bs=function bs(t, e = B, n) {
  if (!e || t._n)
    return t;
  const r = (...s) => {
    r._d && Lt(-1);
    const i = me(e);
    let l;
    try {
      l = t(...s);
    } finally {
      me(i), r._d && Lt(1);
    }
    return l;
  };
  return r._n = !0, r._c = !0, r._d = !0, r;
}
var zn=function zn(t, e, n = !1) {
  const r = Ze();
  if (r || es) {
    let s = r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
    if (s && t in s)
      return s[t];
    if (arguments.length > 1)
      return n && w(e) ? e.call(r && r.proxy) : e;
  }
}
const Un = /* @__PURE__ */ Symbol.for("v-scx"), Jn = () => zn(Un);
var Ss=function Ss(t, e, n) {
  return $n(t, e, n);
}
var $n=function $n(t, e, n = te) {
  const { immediate: r, deep: s, flush: i, once: l } = n, c = St({}, n), o = e && r || !e && i !== "post";
  let f;
  if (bt) {
    if (i === "sync") {
      const g = Jn();
      f = g.__watcherHandles || (g.__watcherHandles = []);
    } else if (!o) {
      const g = () => {
      };
      return g.stop = Ct, g.resume = Ct, g.pause = Ct, g;
    }
  }
  const a = ct;
  c.call = (g, I, P) => Ft(g, a, I, P);
  let u = !1;
  i === "post" ? c.scheduler = (g) => {
    ss(g, a && a.suspense);
  } : i !== "sync" && (u = !0, c.scheduler = (g, I) => {
    I ? g() : Wn(g);
  }), c.augmentJob = (g) => {
    e && (g.flags |= 4), u && (g.flags |= 2, a && (g.id = a.uid, g.i = a));
  };
  const p = jn(t, e, c);
  return bt && (f ? f.push(p) : o && p()), p;
}
const ke = (t) => t.__isTeleport, z = /* @__PURE__ */ Symbol("_leaveCb"), ut = /* @__PURE__ */ Symbol("_enterCb");
var qn=function qn() {
  const t = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  return Xn(() => {
    t.isMounted = !0;
  }), Zn(() => {
    t.isUnmounting = !0;
  }), t;
}
const A = [Function, Array], Yn = {
  mode: String,
  appear: Boolean,
  persisted: Boolean,
  // enter
  onBeforeEnter: A,
  onEnter: A,
  onAfterEnter: A,
  onEnterCancelled: A,
  // leave
  onBeforeLeave: A,
  onLeave: A,
  onAfterLeave: A,
  onLeaveCancelled: A,
  // appear
  onBeforeAppear: A,
  onAppear: A,
  onAfterAppear: A,
  onAppearCancelled: A
}, Ke = (t) => {
  const e = t.subTree;
  return e.component ? Ke(e.component) : e;
}, Gn = {
  name: "BaseTransition",
  props: Yn,
  setup(t, { slots: e }) {
    const n = Ze(), r = qn();
    return () => {
      const s = e.default && Je(e.default(), !0), i = s && s.length ? ze(s) : (
        // Keep explicit default-slot conditionals on the same transition path
        // as regular v-if branches, which render a comment placeholder.
        n.subTree ? ds() : void 0
      );
      if (!i)
        return;
      const l = /* @__PURE__ */ _(t), { mode: c } = l;
      if (r.isLeaving)
        return kt(i);
      const o = ye(i);
      if (!o)
        return kt(i);
      let f = Qt(
        o,
        l,
        r,
        n,
        // #11061, ensure enterHooks is fresh after clone
        (u) => f = u
      );
      o.type !== V && Et(o, f);
      let a = n.subTree && ye(n.subTree);
      if (a && a.type !== V && !Ge(a, o) && Ke(n).type !== V) {
        let u = Qt(
          a,
          l,
          r,
          n
        );
        if (Et(a, u), c === "out-in" && o.type !== V)
          return r.isLeaving = !0, u.afterLeave = () => {
            r.isLeaving = !1, n.job.flags & 8 || n.update(), delete u.afterLeave, a = void 0;
          }, kt(i);
        c === "in-out" && o.type !== V ? u.delayLeave = (p, g, I) => {
          const P = Ue(
            r,
            a
          );
          P[String(a.key)] = a, p[z] = () => {
            g(), p[z] = void 0, delete f.delayedLeave, a = void 0;
          }, f.delayedLeave = () => {
            I(), delete f.delayedLeave, a = void 0;
          };
        } : a = void 0;
      } else a && (a = void 0);
      return i;
    };
  }
};
var ze=function ze(t) {
  let e = t[0];
  if (t.length > 1) {
    for (const n of t)
      if (n.type !== V) {
        e = n;
        break;
      }
  }
  return e;
}
const vs = Gn;
var Ue=function Ue(t, e) {
  const { leavingVNodes: n } = t;
  let r = n.get(e.type);
  return r || (r = /* @__PURE__ */ Object.create(null), n.set(e.type, r)), r;
}
var Qt=function Qt(t, e, n, r, s) {
  const {
    appear: i,
    mode: l,
    persisted: c = !1,
    onBeforeEnter: o,
    onEnter: f,
    onAfterEnter: a,
    onEnterCancelled: u,
    onBeforeLeave: p,
    onLeave: g,
    onAfterLeave: I,
    onLeaveCancelled: P,
    onBeforeAppear: J,
    onAppear: W,
    onAfterAppear: G,
    onAppearCancelled: h
  } = e, x = String(t.key), M = Ue(n, t), R = (d, b) => {
    d && Ft(
      d,
      r,
      9,
      b
    );
  }, de = (d, b) => {
    const v = b[1];
    R(d, b), y(d) ? d.every((Q) => Q.length <= 1) && v() : d.length <= 1 && v();
  }, jt = {
    mode: l,
    persisted: c,
    beforeEnter(d) {
      let b = o;
      if (!n.isMounted)
        if (i)
          b = J || o;
        else
          return;
      d[z] && d[z](
        !0
        /* cancelled */
      );
      const v = M[x];
      v && Ge(t, v) && v.el[z] && v.el[z](), R(b, [d]);
    },
    enter(d) {
      if (M[x] === t) return;
      let b = f, v = a, Q = u;
      if (!n.isMounted)
        if (i)
          b = W || f, v = G || a, Q = h || u;
        else
          return;
      let at = !1;
      d[ut] = (tn) => {
        at || (at = !0, tn ? R(Q, [d]) : R(v, [d]), jt.delayedLeave && jt.delayedLeave(), d[ut] = void 0);
      };
      const vt = d[ut].bind(null, !1);
      b ? de(b, [d, vt]) : vt();
    },
    leave(d, b) {
      const v = String(t.key);
      if (d[ut] && d[ut](
        !0
        /* cancelled */
      ), n.isUnmounting)
        return b();
      R(p, [d]);
      let Q = !1;
      d[z] = (vt) => {
        Q || (Q = !0, b(), vt ? R(P, [d]) : R(I, [d]), d[z] = void 0, M[v] === t && delete M[v]);
      };
      const at = d[z].bind(null, !1);
      M[v] = t, g ? de(g, [d, at]) : at();
    },
    clone(d) {
      const b = Qt(
        d,
        e,
        n,
        r,
        s
      );
      return s && s(b), b;
    }
  };
  return jt;
}
var kt=function kt(t) {
  if ($e(t))
    return t = yt(t), t.children = null, t;
}
var ye=function ye(t) {
  if (!$e(t))
    return ke(t.type) && t.children ? ze(t.children) : t;
  if (t.component)
    return t.component.subTree;
  const { shapeFlag: e, children: n } = t;
  if (n) {
    if (e & 16)
      return n[0];
    if (e & 32 && w(n.default))
      return n.default();
  }
}
var Et=function Et(t, e) {
  t.shapeFlag & 6 && t.component ? (t.transition = e, Et(t.component.subTree, e)) : t.shapeFlag & 128 ? (t.ssContent.transition = e.clone(t.ssContent), t.ssFallback.transition = e.clone(t.ssFallback)) : t.transition = e;
}
var Je=function Je(t, e = !1, n) {
  let r = [], s = 0;
  for (let i = 0; i < t.length; i++) {
    let l = t[i];
    const c = n == null ? l.key : String(n) + String(l.key != null ? l.key : i);
    l.type === he ? (l.patchFlag & 128 && s++, r = r.concat(
      Je(l.children, e, c)
    )) : (e || l.type !== V) && r.push(c != null ? yt(l, { key: c }) : l);
  }
  if (s > 1)
    for (let i = 0; i < r.length; i++)
      r[i].patchFlag = -2;
  return r;
}
ne().requestIdleCallback;
ne().cancelIdleCallback;
const $e = (t) => t.type.__isKeepAlive;
var Qn=function Qn(t, e, n = ct, r = !1) {
  if (n) {
    const s = n[t] || (n[t] = []), i = e.__weh || (e.__weh = (...l) => {
      Ot();
      const c = gs(n), o = Ft(e, n, t, l);
      return c(), Dt(), o;
    });
    return r ? s.unshift(i) : s.push(i), i;
  }
}
const ue = (t) => (e, n = ct) => {
  (!bt || t === "sp") && Qn(t, (...r) => e(...r), n);
}, Xn = ue("m"), Zn = ue(
  "bum"
), Ts = ue("um"), ts = /* @__PURE__ */ Symbol.for("v-ndc");
var ws=function ws(t, e, n, r) {
  let s;
  const i = n, l = y(t);
  if (l || O(t)) {
    const c = l && /* @__PURE__ */ it(t);
    let o = !1, f = !1;
    c && (o = !/* @__PURE__ */ L(t), f = /* @__PURE__ */ U(t), t = Pt(t)), s = new Array(t.length);
    for (let a = 0, u = t.length; a < u; a++)
      s[a] = e(
        o ? f ? lt(D(t[a])) : D(t[a]) : t[a],
        a,
        void 0,
        i
      );
  } else if (typeof t == "number") {
    s = new Array(t);
    for (let c = 0; c < t; c++)
      s[c] = e(c + 1, c, void 0, i);
  } else if (S(t))
    if (t[Symbol.iterator])
      s = Array.from(
        t,
        (c, o) => e(c, o, void 0, i)
      );
    else {
      const c = Object.keys(t);
      s = new Array(c.length);
      for (let o = 0, f = c.length; o < f; o++) {
        const a = c[o];
        s[o] = e(t[a], a, o, i);
      }
    }
  else
    s = [];
  return s;
}
let es = null;
const ns = {}, qe = (t) => Object.getPrototypeOf(t) === ns, ss = is, rs = (t) => t.__isSuspense;
var is=function is(t, e) {
  e && e.pendingBranch ? y(t) ? e.effects.push(...t) : e.effects.push(t) : kn(t);
}
const he = /* @__PURE__ */ Symbol.for("v-fgt"), os = /* @__PURE__ */ Symbol.for("v-txt"), V = /* @__PURE__ */ Symbol.for("v-cmt"), It = [];
let C = null;
var ls=function ls(t = !1) {
  It.push(C = t ? null : []);
}
var cs=function cs() {
  It.pop(), C = It[It.length - 1] || null;
}
let mt = 1;
var Lt=function Lt(t, e = !1) {
  mt += t, t < 0 && C && e && (C.hasOnce = !0);
}
var Ye=function Ye(t) {
  return t.dynamicChildren = mt > 0 ? C || nn : null, cs(), mt > 0 && C && C.push(t), t;
}
var xs=function xs(t, e, n, r, s, i) {
  return Ye(
    Xe(
      t,
      e,
      n,
      r,
      s,
      i,
      !0
    )
  );
}
var as=function as(t, e, n, r, s) {
  return Ye(
    Z(
      t,
      e,
      n,
      r,
      s,
      !0
    )
  );
}
var Xt=function Xt(t) {
  return t ? t.__v_isVNode === !0 : !1;
}
var Ge=function Ge(t, e) {
  return t.type === e.type && t.key === e.key;
}
const Qe = ({ key: t }) => t ?? null, Rt = ({
  ref: t,
  ref_key: e,
  ref_for: n
}) => (typeof t == "number" && (t = "" + t), t != null ? O(t) || /* @__PURE__ */ H(t) || w(t) ? { i: B, r: t, k: e, f: !!n } : t : null);
var Xe=function Xe(t, e = null, n = null, r = 0, s = null, i = t === he ? 0 : 1, l = !1, c = !1) {
  const o = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t,
    props: e,
    key: e && Qe(e),
    ref: e && Rt(e),
    scopeId: We,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: i,
    patchFlag: r,
    dynamicProps: s,
    dynamicChildren: null,
    appContext: null,
    ctx: B
  };
  return c ? (Mt(o, n), i & 128 && t.normalize(o)) : n && (o.shapeFlag |= O(n) ? 8 : 16), mt > 0 && // avoid a block node from tracking itself
  !l && // has current parent block
  C && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (o.patchFlag > 0 || i & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  o.patchFlag !== 32 && C.push(o), o;
}
const Z = fs;
var fs=function fs(t, e = null, n = null, r = 0, s = null, i = !1) {
  if ((!t || t === ts) && (t = V), Xt(t)) {
    const c = yt(
      t,
      e,
      !0
      /* mergeRef: true */
    );
    return n && Mt(c, n), mt > 0 && !i && C && (c.shapeFlag & 6 ? C[C.indexOf(t)] = c : C.push(c)), c.patchFlag = -2, c;
  }
  if (_s(t) && (t = t.__vccOpts), e) {
    e = us(e);
    let { class: c, style: o } = e;
    c && !O(c) && (e.class = re(c)), S(o) && (/* @__PURE__ */ ae(o) && !y(o) && (o = St({}, o)), e.style = se(o));
  }
  const l = O(t) ? 1 : rs(t) ? 128 : ke(t) ? 64 : S(t) ? 4 : w(t) ? 2 : 0;
  return Xe(
    t,
    e,
    n,
    r,
    s,
    l,
    i,
    !0
  );
}
var us=function us(t) {
  return t ? /* @__PURE__ */ ae(t) || qe(t) ? St({}, t) : t : null;
}
var yt=function yt(t, e, n = !1, r = !1) {
  const { props: s, ref: i, patchFlag: l, children: c, transition: o } = t, f = e ? ps(s || {}, e) : s, a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t.type,
    props: f,
    key: f && Qe(f),
    ref: e && e.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && i ? y(i) ? i.concat(Rt(e)) : [i, Rt(e)] : Rt(e)
    ) : i,
    scopeId: t.scopeId,
    slotScopeIds: t.slotScopeIds,
    children: c,
    target: t.target,
    targetStart: t.targetStart,
    targetAnchor: t.targetAnchor,
    staticCount: t.staticCount,
    shapeFlag: t.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: e && t.type !== he ? l === -1 ? 16 : l | 16 : l,
    dynamicProps: t.dynamicProps,
    dynamicChildren: t.dynamicChildren,
    appContext: t.appContext,
    dirs: t.dirs,
    transition: o,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: t.component,
    suspense: t.suspense,
    ssContent: t.ssContent && yt(t.ssContent),
    ssFallback: t.ssFallback && yt(t.ssFallback),
    placeholder: t.placeholder,
    el: t.el,
    anchor: t.anchor,
    ctx: t.ctx,
    ce: t.ce
  };
  return o && r && Et(
    a,
    o.clone(a)
  ), a;
}
var hs=function hs(t = " ", e = 0) {
  return Z(os, null, t, e);
}
var ds=function ds(t = "", e = !1) {
  return e ? (ls(), as(V, null, t)) : Z(V, null, t);
}
var Mt=function Mt(t, e) {
  let n = 0;
  const { shapeFlag: r } = t;
  if (e == null)
    e = null;
  else if (y(e))
    n = 16;
  else if (typeof e == "object")
    if (r & 65) {
      const s = e.default;
      s && (s._c && (s._d = !1), Mt(t, s()), s._c && (s._d = !0));
      return;
    } else {
      n = 32;
      const s = e._;
      !s && !qe(e) ? e._ctx = B : s === 3 && B && (B.slots._ === 1 ? e._ = 1 : (e._ = 2, t.patchFlag |= 1024));
    }
  else if (w(e)) {
    if (r & 65) {
      Mt(t, { default: e });
      return;
    }
    e = { default: e, _ctx: B }, n = 32;
  } else
    e = String(e), r & 64 ? (n = 16, e = [hs(e)]) : n = 8;
  t.children = e, t.shapeFlag |= n;
}
var ps=function ps(...t) {
  const e = {};
  for (let n = 0; n < t.length; n++) {
    const r = t[n];
    for (const s in r)
      if (s === "class")
        e.class !== r.class && (e.class = re([e.class, r.class]));
      else if (s === "style")
        e.style = se([e.style, r.style]);
      else if (sn(s)) {
        const i = e[s], l = r[s];
        l && i !== l && !(y(i) && i.includes(l)) ? e[s] = i ? [].concat(i, l) : l : l == null && i == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !rn(s) && (e[s] = l);
      } else s !== "" && (e[s] = r[s]);
  }
  return e;
}
let ct = null;
const Ze = () => ct || B;
let Zt;
{
  const t = ne(), e = (n, r) => {
    let s;
    return (s = t[n]) || (s = t[n] = []), s.push(r), (i) => {
      s.length > 1 ? s.forEach((l) => l(i)) : s[0](i);
    };
  };
  Zt = e(
    "__VUE_INSTANCE_SETTERS__",
    (n) => ct = n
  ), e(
    "__VUE_SSR_SETTERS__",
    (n) => bt = n
  );
}
const gs = (t) => {
  const e = ct;
  return Zt(t), t.scope.on(), () => {
    t.scope.off(), Zt(e);
  };
};
let bt = !1;
var _s=function _s(t) {
  return w(t) && "__vccOpts" in t;
}
const Kt = (t, e) => /* @__PURE__ */ Pn(t, e, bt);
var Cs=function Cs(t, e, n) {
  try {
    Lt(-1);
    const r = arguments.length;
    return r === 2 ? S(e) && !y(e) ? Xt(e) ? Z(t, null, [e]) : Z(t, e) : Z(t, null, e) : (r > 3 ? n = Array.prototype.slice.call(arguments, 2) : r === 3 && Xt(n) && (n = [n]), Z(t, e, n));
  } finally {
    Lt(1);
  }
}
var Is=function Is(t, e = {}) {
  const n = Kt(() => t.currentTime ?? 0), r = Kt(() => {
    const o = t.lyricLines || [];
    for (let f = 0; f < o.length; f++) {
      const a = o[f];
      if (t.currentTime >= (a.startTime ?? 0) && t.currentTime < (a.endTime ?? 1 / 0))
        return f;
    }
    return o.length > 0 && t.currentTime >= (o[o.length - 1].endTime ?? 0) ? o.length - 1 : -1;
  }), s = Kt(() => (t.lyricLines || []).map((o) => ({
    text: o.text || "",
    trText: o.translatedText || "",
    startTime: o.startTime || 0,
    duration: (o.endTime ?? 0) - (o.startTime ?? 0),
    words: o.words ? o.words.map((f) => ({
      text: f.text || "",
      startTime: (f.startTime ?? 0) - (o.startTime ?? 0),
      duration: (f.endTime ?? 0) - (f.startTime ?? 0)
    })) : void 0
  })));
  var i=function i() {
    const o = t.coverColor;
    return typeof o == "string" ? { primary: o, average: o } : o && typeof o == "object" ? { primary: o.primary || "#ffffff", average: o.average || o.primary || "#ffffff" } : { primary: "#ffffff", average: "#ffffff" };
  }
  var l=function l() {
    return {
      isInClimax: !!t.isClimax,
      segments: t.climaxSegments || [],
      energy: t.energy ?? 0,
      isBeat: !!t.isBeat,
      kickEnergy: t.kickEnergy ?? 0,
      bpm: t.bpm ?? 120
    };
  }
  var c=function c(o, f) {
    if (e[o] !== void 0) return e[o];
    try {
      const a = localStorage.getItem("music-full-config");
      if (a) {
        const u = JSON.parse(a);
        if (u[o] !== void 0) return u[o];
      }
    } catch {
    }
    return f;
  }
  return { nowTime: n, nowIndex: r, lrcArray: s, getCoverColor: i, getClimaxState: l, getConfigValue: c };
}
var Rs=function Rs(t, e) {
  return t.map((n, r) => {
    const s = e[r] ?? n.startTime ?? 0, i = e[r + 1] ?? (n.duration != null ? s + n.duration : s + 5), l = n.text || "", c = [];
    if (n.words && n.words.length > 0) {
      let o = 0;
      for (const f of n.words) {
        const a = s + (f.startTime || 0), u = s + (f.startTime || 0) + (f.duration || 0.3), p = l.slice(o, o + (f.text || "").length) || f.text || "";
        o += (f.text || "").length, c.push({
          text: p,
          startTime: a,
          endTime: u
        });
      }
    } else {
      const o = Array.from(l), f = Math.max((i - s) / Math.max(o.length, 1), 0.05);
      o.forEach((a, u) => {
        c.push({
          text: a,
          startTime: s + u * f,
          endTime: s + (u + 1) * f
        });
      });
    }
    return {
      words: c,
      startTime: s,
      endTime: i || s + 5,
      fullText: l,
      translation: n.trText || void 0
    };
  });
}
const As = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [r, s] of e)
    n[r] = s;
  return n;
};
__sh__plugin_vue_export_helper_Cmn1wCFW_js.B=Yn;__sh__plugin_vue_export_helper_Cmn1wCFW_js.F=he;__sh__plugin_vue_export_helper_Cmn1wCFW_js._=As;__sh__plugin_vue_export_helper_Cmn1wCFW_js.a=Ts;__sh__plugin_vue_export_helper_Cmn1wCFW_js.b=xs;__sh__plugin_vue_export_helper_Cmn1wCFW_js.c=Is;__sh__plugin_vue_export_helper_Cmn1wCFW_js.d=Xe;__sh__plugin_vue_export_helper_Cmn1wCFW_js.e=ys;__sh__plugin_vue_export_helper_Cmn1wCFW_js.f=Kt;__sh__plugin_vue_export_helper_Cmn1wCFW_js.g=ls;__sh__plugin_vue_export_helper_Cmn1wCFW_js.h=Z;__sh__plugin_vue_export_helper_Cmn1wCFW_js.i=bs;__sh__plugin_vue_export_helper_Cmn1wCFW_js.j=ds;__sh__plugin_vue_export_helper_Cmn1wCFW_js.k=re;__sh__plugin_vue_export_helper_Cmn1wCFW_js.l=St;__sh__plugin_vue_export_helper_Cmn1wCFW_js.m=Cs;__sh__plugin_vue_export_helper_Cmn1wCFW_js.n=se;__sh__plugin_vue_export_helper_Cmn1wCFW_js.o=Xn;__sh__plugin_vue_export_helper_Cmn1wCFW_js.p=vs;__sh__plugin_vue_export_helper_Cmn1wCFW_js.q=S;__sh__plugin_vue_export_helper_Cmn1wCFW_js.r=ws;__sh__plugin_vue_export_helper_Cmn1wCFW_js.s=y;__sh__plugin_vue_export_helper_Cmn1wCFW_js.t=dn;__sh__plugin_vue_export_helper_Cmn1wCFW_js.u=ms;__sh__plugin_vue_export_helper_Cmn1wCFW_js.w=Ss;__sh__plugin_vue_export_helper_Cmn1wCFW_js.z=Rs;
})();
var __sh_colorMix_CCs_cg1y_js={};
(function(){
var a=function a(t, e) {
  if (t.startsWith("#")) {
    const r = parseInt(t.slice(1, 3), 16), s = parseInt(t.slice(3, 5), 16), n = parseInt(t.slice(5, 7), 16);
    return `rgba(${r},${s},${n},${e})`;
  }
  return t.startsWith("rgb(") ? t.replace("rgb(", "rgba(").replace(")", `,${e})`) : t;
}
__sh_colorMix_CCs_cg1y_js.c=a;
})();
var __sh_cjkSemanticLayout_BxjUn6_U_js={};
(function(){
var T=function T(e) {
  return e < 0.1 ? "micro" : e < 0.18 ? "short" : "normal";
}
var x=function x(e) {
  return e === "micro" ? "none" : e === "short" ? "fast" : "normal";
}
var R=function R(e) {
  return e === "micro" ? "instant" : e === "short" ? "fast" : "normal";
}
var M=function M(e, t) {
  const n = Math.max(t - e, 0), s = T(n), c = x(s), o = R(s), i = t;
  let u;
  if (c === "none")
    u = Math.max(t, e + 0.067);
  else {
    const r = Math.min(0.32, Math.max(0.18, Math.max(n, 0.12) * 0.18)), m = o === "instant" ? 0 : 0.06, a = Math.max(i, e) + m, d = Math.max(a, t - r);
    u = Math.max(t, d + r);
  }
  return { rawDuration: n, timingClass: s, renderEndTime: u, lineTransitionMode: c, wordRevealMode: o };
}
var L=function L(e) {
  return e.map((t) => ({
    text: t.text,
    words: [t],
    startTime: t.startTime,
    endTime: t.endTime,
    isSemantic: !1
  }));
}
const S = /[\u4e00-\u9fa5\u3040-\u30ff\uac00-\ud7af]/, E = /^[,.;:!?\uFF0C\u3002\uFF01\uFF1F\u3001\uFF1A\uFF1B\uFF09\u3011\u300F\u300D\u2014\u2026\u00BB\]\}'\u2018\u2019\u201C\u201D]+$/u;
var g=function g(e) {
  return S.test(e);
}
var _=function _(e) {
  return E.test(e.trim());
}
var I=function I(e) {
  return /[\p{L}\p{N}]$/u.test(e.trimEnd());
}
var O=function O(e, t) {
  const n = Intl?.Segmenter;
  if (!n) return t;
  try {
    const c = Array.from(
      new n(void 0, { granularity: "word" }).segment(e.fullText)
    ).filter((r) => !/^\s+$/.test(r.segment));
    if (c.length <= 1) return t;
    const o = [];
    let i = 0, u = "";
    for (const r of c) {
      u = "";
      const m = i;
      for (; i < e.words.length && u.length < r.segment.length; )
        u += e.words[i].text, i++;
      if (u !== r.segment) return t;
      const a = e.words.slice(m, i), d = a[0], f = a[a.length - 1];
      if (!d || !f) return t;
      const h = !!(r.isWordLike && g(r.segment) && a.length > 1);
      if (!r.isWordLike && o.length > 0) {
        const l = o[o.length - 1];
        l.text += r.segment, l.words.push(...a), l.endTime = f.endTime;
      } else
        o.push({
          text: r.segment,
          words: a,
          startTime: d.startTime,
          endTime: f.endTime,
          isSemantic: h
        });
    }
    return i !== e.words.length || o.length === 0 ? t : o;
  } catch {
    return t;
  }
}
var F=function F(e) {
  const t = [];
  for (const n of e)
    if (t.length > 0 && _(n.text) && I(t[t.length - 1].text)) {
      const s = t[t.length - 1];
      s.text += n.text, s.words.push(...n.words), s.endTime = n.endTime, s.isSticky = !0;
    } else
      t.push({ ...n, words: [...n.words] });
  return t;
}
var w=function w(e, t = {}) {
  let n = L(e.words);
  return t.semantic && g(e.fullText) && (n = O(e, n)), t.sticky && (n = F(n)), n;
}
var y=function y(e) {
  return e.flatMap((t) => !t.isSticky || t.isSemantic ? t.words : [
    {
      text: t.text,
      startTime: t.startTime,
      endTime: t.endTime
    }
  ]);
}
__sh_cjkSemanticLayout_BxjUn6_U_js.a=w;__sh_cjkSemanticLayout_BxjUn6_U_js.b=M;__sh_cjkSemanticLayout_BxjUn6_U_js.c=y;
})();
const G = { class: "folia-partita-root w-full h-full flex items-center justify-center overflow-hidden pointer-events-none select-none" }, J = { class: "relative z-10 w-full max-w-6xl h-[70vh] flex gap-4 items-center justify-center p-8" }, Q = {
  __name: "PartitaTheme",
  props: {
    currentTime: { type: Number, default: 0 },
    lyricLines: { type: Array, default: () => [] },
    coverColor: { type: [String, Object], default: "#ffffff" },
    isClimax: { type: Boolean, default: !1 },
    energy: { type: Number, default: 0 },
    settings: { type: Object, default: () => ({}) }
  },
  setup(_) {
    const m = _, u = V(m, m.settings), S = t(() => u.nowTime.value), L = t(() => u.nowIndex.value), v = t(() => u.lrcArray.value), j = t(() => v.value.map((e) => e.startTime ?? 0)), z = t(() => u.getCoverColor()), f = t(() => z.value.primary || "#ffffff"), p = t(() => q(f.value, 0.5)), y = t(() => u.getClimaxState().isInClimax ? "#ff6b6b" : f.value), h = t(() => O(v.value, j.value)), n = t(() => {
      const e = L.value;
      return e < 0 || e >= h.value.length ? null : h.value[e];
    }), F = t(() => n.value?.startTime ?? 0), x = t(() => {
      const e = n.value;
      if (!e) return [];
      const r = $(e, { semantic: !0, sticky: !0 });
      return K(r);
    }), g = t(() => {
      const e = x.value;
      if (e.length === 0) return [];
      const r = Math.max(1, Math.ceil(e.length / E.value)), a = [];
      for (let s = 0; s < e.length; s += r) {
        const o = e.slice(s, s + r);
        a.push({
          words: o,
          offset: (a.length % 2 === 0 ? -1 : 1) * 10 * (a.length + 1),
          wordIndex: s
        });
      }
      return a;
    }), w = k({});
    M(S, (e) => {
      if (!n.value) return;
      const r = n.value.renderHints ?? U(n.value.startTime, n.value.endTime), a = r.wordRevealMode === "instant" ? 0.03 : r.wordRevealMode === "fast" ? 0.08 : 0.15, s = {};
      x.value.forEach((o, c) => {
        e >= o.startTime - a && e <= o.endTime ? s[c] = "active" : e > o.endTime ? s[c] = "passed" : s[c] = "waiting";
      }), w.value = s;
    }, { flush: "post" });
    function W(e) {
      return w.value[e] || "waiting";
    }
    function B(e, r) {
      const a = W(r);
      return a === "waiting" ? {
        opacity: "0.3",
        color: f.value,
        transform: "translateY(-10px) scale(0.8)",
        filter: "blur(4px)"
      } : a === "active" ? {
        opacity: "1",
        color: y.value,
        transform: "translateY(0) scale(1)",
        filter: "none",
        textShadow: `0 0 12px ${y.value}`
      } : {
        opacity: "0.6",
        color: f.value,
        transform: "translateY(5px) scale(0.95)",
        filter: "none"
      };
    }
    const E = t(() => u.getConfigValue("foliaPartitaChunks") ?? 3), I = t(() => u.getConfigValue("foliaShowTranslation") ?? !0), A = k(!0);
    return (e, r) => (l(), i("div", G, [
      Y("div", J, [
        D(N, {
          name: "folia-fade",
          mode: "out-in"
        }, {
          default: R(() => [
            A.value && g.value.length > 0 ? (l(), i("div", {
              key: F.value,
              class: "flex gap-6 h-full items-center justify-center flex-wrap"
            }, [
              (l(!0), i(C, null, b(g.value, (a, s) => (l(), i("div", {
                key: s,
                class: "flex flex-wrap justify-center gap-x-2 gap-y-1",
                style: d({
                  transform: `translateY(${a.offset}px)`,
                  transition: "transform 0.5s ease"
                })
              }, [
                (l(!0), i(C, null, b(a.words, (o, c) => (l(), i("span", {
                  key: c,
                  class: "font-bold inline-block transition-all duration-500",
                  style: d(B(o, a.wordIndex + c))
                }, T(o.text), 5))), 128))
              ], 4))), 128))
            ])) : (l(), i("div", {
              key: "empty",
              class: "absolute opacity-50",
              style: d({ color: p.value })
            }, " 聆听音乐... ", 4))
          ]),
          _: 1
        })
      ]),
      n.value?.translation && I.value ? (l(), i("div", {
        key: 0,
        class: "absolute bottom-16 left-1/2 -translate-x-1/2 text-center z-20",
        style: d({ color: p.value, fontSize: "clamp(1rem, 2.2vw, 1.25rem)", maxWidth: "80vw" })
      }, T(n.value.translation), 5)) : H("", !0)
    ]));
  }
}, X = /* @__PURE__ */ P(Q, [["__scopeId", "data-v-bde952ec"]]);
X.settings = [
  { key: "foliaShowTranslation", type: "boolean", label: "显示翻译", default: !0 },
  { key: "foliaPartitaChunks", type: "slider", label: "分组数量", min: 2, max: 6, step: 1, marks: ["2组", "6组"], default: 3 }
];
export {
  X as default
};
