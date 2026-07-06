(function(){var s=document.createElement('style');s.textContent=".folia-fume-root[data-v-54b8528a],.folia-partita-root[data-v-bde952ec]{background:transparent}";document.head.appendChild(s)})();var __sh__plugin_vue_export_helper_Ds65E8pU_js={};
(function(){
/**
* @vue/shared v3.5.39
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function Rn(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const Oe = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {}, Cn = process.env.NODE_ENV !== "production" ? Object.freeze([]) : [], pe = () => {
}, In = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), An = (e) => e.startsWith("onUpdate:"), J = Object.assign, kn = Object.prototype.hasOwnProperty, ot = (e, t) => kn.call(e, t), y = Array.isArray, se = (e) => ze(e) === "[object Map]", $t = (e) => ze(e) === "[object Set]", N = (e) => typeof e == "function", k = (e) => typeof e == "string", ae = (e) => typeof e == "symbol", b = (e) => e !== null && typeof e == "object", Mn = (e) => (b(e) || N(e)) && N(e.then) && N(e.catch), Lt = Object.prototype.toString, ze = (e) => Lt.call(e), Ft = (e) => ze(e).slice(8, -1), Ht = (e) => ze(e) === "[object Object]", mt = (e) => k(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Pt = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, jt = Pt((e) => e.charAt(0).toUpperCase() + e.slice(1)), $n = Pt(
  (e) => e ? `on${jt(e)}` : ""
), H = (e, t) => !Object.is(e, t), os = (e) => {
  const t = k(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
};
let Vt;
const Je = () => Vt || (Vt = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function yt(e) {
  if (y(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], r = k(s) ? Pn(s) : yt(s);
      if (r)
        for (const i in r)
          t[i] = r[i];
    }
    return t;
  } else if (k(e) || b(e))
    return e;
}
const Ln = /;(?![^(]*\))/g, Fn = /:([^]+)/, Hn = /\/\*[^]*?\*\//g;
function Pn(e) {
  const t = {};
  return e.replace(Hn, "").split(Ln).forEach((n) => {
    if (n) {
      const s = n.split(Fn);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function vt(e) {
  let t = "";
  if (k(e))
    t = e;
  else if (y(e))
    for (let n = 0; n < e.length; n++) {
      const s = vt(e[n]);
      s && (t += s + " ");
    }
  else if (b(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const Wt = (e) => !!(e && e.__v_isRef === !0), jn = (e) => k(e) ? e : e == null ? "" : y(e) || b(e) && (e.toString === Lt || !N(e.toString)) ? Wt(e) ? jn(e.value) : JSON.stringify(e, Kt, 2) : String(e), Kt = (e, t) => Wt(t) ? Kt(e, t.value) : se(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [s, r], i) => (n[Xe(s, i) + " =>"] = r, n),
    {}
  )
} : $t(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => Xe(n))
} : ae(t) ? Xe(t) : b(t) && !y(t) && !Ht(t) ? String(t) : t, Xe = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    ae(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
/**
* @vue/reactivity v3.5.39
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function W(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
let m;
const Ze = /* @__PURE__ */ new WeakSet();
class Wn {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0;
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Ze.has(this) && (Ze.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Ut(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Rt(this), zt(this);
    const t = m, n = M;
    m = this, M = !0;
    try {
      return this.fn();
    } finally {
      process.env.NODE_ENV !== "production" && m !== this && W(
        "Active effect was not restored correctly - this is likely a Vue internal bug."
      ), Jt(this), m = t, M = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        bt(t);
      this.deps = this.depsTail = void 0, Rt(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Ze.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    ct(this) && this.run();
  }
  get dirty() {
    return ct(this);
  }
}
let Bt = 0, we, Se;
function Ut(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Se, Se = e;
    return;
  }
  e.next = we, we = e;
}
function Et() {
  Bt++;
}
function Nt() {
  if (--Bt > 0)
    return;
  if (Se) {
    let t = Se;
    for (Se = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; we; ) {
    let t = we;
    for (we = void 0; t; ) {
      const n = t.next;
      if (t.next = void 0, t.flags &= -9, t.flags & 1)
        try {
          t.trigger();
        } catch (s) {
          e || (e = s);
        }
      t = n;
    }
  }
  if (e) throw e;
}
function zt(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Jt(e) {
  let t, n = e.depsTail, s = n;
  for (; s; ) {
    const r = s.prevDep;
    s.version === -1 ? (s === n && (n = r), bt(s), Kn(s)) : t = s, s.dep.activeLink = s.prevActiveLink, s.prevActiveLink = void 0, s = r;
  }
  e.deps = t, e.depsTail = n;
}
function ct(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (Yt(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function Yt(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Te) || (e.globalVersion = Te, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !ct(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = m, s = M;
  m = e, M = !0;
  try {
    zt(e);
    const r = e.fn(e._value);
    (t.version === 0 || H(r, e._value)) && (e.flags |= 128, e._value = r, t.version++);
  } catch (r) {
    throw t.version++, r;
  } finally {
    m = n, M = s, Jt(e), e.flags &= -3;
  }
}
function bt(e, t = !1) {
  const { dep: n, prevSub: s, nextSub: r } = e;
  if (s && (s.nextSub = r, e.prevSub = void 0), r && (r.prevSub = s, e.nextSub = void 0), process.env.NODE_ENV !== "production" && n.subsHead === e && (n.subsHead = r), n.subs === e && (n.subs = s, !s && n.computed)) {
    n.computed.flags &= -5;
    for (let i = n.computed.deps; i; i = i.nextDep)
      bt(i, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function Kn(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let M = !0;
const qt = [];
function _e() {
  qt.push(M), M = !1;
}
function me() {
  const e = qt.pop();
  M = e === void 0 ? !0 : e;
}
function Rt(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = m;
    m = void 0;
    try {
      t();
    } finally {
      m = n;
    }
  }
}
let Te = 0;
class Bn {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class wt {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0, process.env.NODE_ENV !== "production" && (this.subsHead = void 0);
  }
  track(t) {
    if (!m || !M || m === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== m)
      n = this.activeLink = new Bn(m, this), m.deps ? (n.prevDep = m.depsTail, m.depsTail.nextDep = n, m.depsTail = n) : m.deps = m.depsTail = n, Gt(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const s = n.nextDep;
      s.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = s), n.prevDep = m.depsTail, n.nextDep = void 0, m.depsTail.nextDep = n, m.depsTail = n, m.deps === n && (m.deps = s);
    }
    return process.env.NODE_ENV !== "production" && m.onTrack && m.onTrack(
      J(
        {
          effect: m
        },
        t
      )
    ), n;
  }
  trigger(t) {
    this.version++, Te++, this.notify(t);
  }
  notify(t) {
    Et();
    try {
      if (process.env.NODE_ENV !== "production")
        for (let n = this.subsHead; n; n = n.nextSub)
          n.sub.onTrigger && !(n.sub.flags & 8) && n.sub.onTrigger(
            J(
              {
                effect: n.sub
              },
              t
            )
          );
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      Nt();
    }
  }
}
function Gt(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let s = t.deps; s; s = s.nextDep)
        Gt(s);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), process.env.NODE_ENV !== "production" && e.dep.subsHead === void 0 && (e.dep.subsHead = e), e.dep.subs = e;
  }
}
const at = /* @__PURE__ */ new WeakMap(), ie = /* @__PURE__ */ Symbol(
  process.env.NODE_ENV !== "production" ? "Object iterate" : ""
), lt = /* @__PURE__ */ Symbol(
  process.env.NODE_ENV !== "production" ? "Map keys iterate" : ""
), xe = /* @__PURE__ */ Symbol(
  process.env.NODE_ENV !== "production" ? "Array iterate" : ""
);
function D(e, t, n) {
  if (M && m) {
    let s = at.get(e);
    s || at.set(e, s = /* @__PURE__ */ new Map());
    let r = s.get(n);
    r || (s.set(n, r = new wt()), r.map = s, r.key = n), process.env.NODE_ENV !== "production" ? r.track({
      target: e,
      type: t,
      key: n
    }) : r.track();
  }
}
function G(e, t, n, s, r, i) {
  const a = at.get(e);
  if (!a) {
    Te++;
    return;
  }
  const c = (o) => {
    o && (process.env.NODE_ENV !== "production" ? o.trigger({
      target: e,
      type: t,
      key: n,
      newValue: s,
      oldValue: r,
      oldTarget: i
    }) : o.trigger());
  };
  if (Et(), t === "clear")
    a.forEach(c);
  else {
    const o = y(e), f = o && mt(n);
    if (o && n === "length") {
      const u = Number(s);
      a.forEach((l, p) => {
        (p === "length" || p === xe || !ae(p) && p >= u) && c(l);
      });
    } else
      switch ((n !== void 0 || a.has(void 0)) && c(a.get(n)), f && c(a.get(xe)), t) {
        case "add":
          o ? f && c(a.get("length")) : (c(a.get(ie)), se(e) && c(a.get(lt)));
          break;
        case "delete":
          o || (c(a.get(ie)), se(e) && c(a.get(lt)));
          break;
        case "set":
          se(e) && c(a.get(ie));
          break;
      }
  }
  Nt();
}
function fe(e) {
  const t = /* @__PURE__ */ g(e);
  return t === e ? t : (D(t, "iterate", xe), /* @__PURE__ */ T(e) ? t : t.map(L));
}
function Ye(e) {
  return D(e = /* @__PURE__ */ g(e), "iterate", xe), e;
}
function F(e, t) {
  return /* @__PURE__ */ $(e) ? he(/* @__PURE__ */ oe(e) ? L(t) : t) : L(t);
}
const Un = {
  __proto__: null,
  [Symbol.iterator]() {
    return et(this, Symbol.iterator, (e) => F(this, e));
  },
  concat(...e) {
    return fe(this).concat(
      ...e.map((t) => y(t) ? fe(t) : t)
    );
  },
  entries() {
    return et(this, "entries", (e) => (e[1] = F(this, e[1]), e));
  },
  every(e, t) {
    return B(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return B(
      this,
      "filter",
      e,
      t,
      (n) => n.map((s) => F(this, s)),
      arguments
    );
  },
  find(e, t) {
    return B(
      this,
      "find",
      e,
      t,
      (n) => F(this, n),
      arguments
    );
  },
  findIndex(e, t) {
    return B(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return B(
      this,
      "findLast",
      e,
      t,
      (n) => F(this, n),
      arguments
    );
  },
  findLastIndex(e, t) {
    return B(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return B(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return tt(this, "includes", e);
  },
  indexOf(...e) {
    return tt(this, "indexOf", e);
  },
  join(e) {
    return fe(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return tt(this, "lastIndexOf", e);
  },
  map(e, t) {
    return B(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return Ee(this, "pop");
  },
  push(...e) {
    return Ee(this, "push", e);
  },
  reduce(e, ...t) {
    return Ct(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return Ct(this, "reduceRight", e, t);
  },
  shift() {
    return Ee(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return B(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Ee(this, "splice", e);
  },
  toReversed() {
    return fe(this).toReversed();
  },
  toSorted(e) {
    return fe(this).toSorted(e);
  },
  toSpliced(...e) {
    return fe(this).toSpliced(...e);
  },
  unshift(...e) {
    return Ee(this, "unshift", e);
  },
  values() {
    return et(this, "values", (e) => F(this, e));
  }
};
function et(e, t, n) {
  const s = Ye(e), r = s[t]();
  return s !== e && !/* @__PURE__ */ T(e) && (r._next = r.next, r.next = () => {
    const i = r._next();
    return i.done || (i.value = n(i.value)), i;
  }), r;
}
const zn = Array.prototype;
function B(e, t, n, s, r, i) {
  const a = Ye(e), c = a !== e && !/* @__PURE__ */ T(e), o = a[t];
  if (o !== zn[t]) {
    const l = o.apply(e, i);
    return c ? L(l) : l;
  }
  let f = n;
  a !== e && (c ? f = function(l, p) {
    return n.call(this, F(e, l), p, e);
  } : n.length > 2 && (f = function(l, p) {
    return n.call(this, l, p, e);
  }));
  const u = o.call(a, f, s);
  return c && r ? r(u) : u;
}
function Ct(e, t, n, s) {
  const r = Ye(e), i = r !== e && !/* @__PURE__ */ T(e);
  let a = n, c = !1;
  r !== e && (i ? (c = s.length === 0, a = function(f, u, l) {
    return c && (c = !1, f = F(e, f)), n.call(this, f, F(e, u), l, e);
  }) : n.length > 3 && (a = function(f, u, l) {
    return n.call(this, f, u, l, e);
  }));
  const o = r[t](a, ...s);
  return c ? F(e, o) : o;
}
function tt(e, t, n) {
  const s = /* @__PURE__ */ g(e);
  D(s, "iterate", xe);
  const r = s[t](...n);
  return (r === -1 || r === !1) && /* @__PURE__ */ He(n[0]) ? (n[0] = /* @__PURE__ */ g(n[0]), s[t](...n)) : r;
}
function Ee(e, t, n = []) {
  _e(), Et();
  const s = (/* @__PURE__ */ g(e))[t].apply(e, n);
  return Nt(), me(), s;
}
const Jn = /* @__PURE__ */ Rn("__proto__,__v_isRef,__isVue"), Qt = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(ae)
);
function Yn(e) {
  ae(e) || (e = String(e));
  const t = /* @__PURE__ */ g(this);
  return D(t, "has", e), t.hasOwnProperty(e);
}
class Xt {
  constructor(t = !1, n = !1) {
    this._isReadonly = t, this._isShallow = n;
  }
  get(t, n, s) {
    if (n === "__v_skip") return t.__v_skip;
    const r = this._isReadonly, i = this._isShallow;
    if (n === "__v_isReactive")
      return !r;
    if (n === "__v_isReadonly")
      return r;
    if (n === "__v_isShallow")
      return i;
    if (n === "__v_raw")
      return s === (r ? i ? sr : tn : i ? rr : en).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(s) ? t : void 0;
    const a = y(t);
    if (!r) {
      let o;
      if (a && (o = Un[n]))
        return o;
      if (n === "hasOwnProperty")
        return Yn;
    }
    const c = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ A(t) ? t : s
    );
    if ((ae(n) ? Qt.has(n) : Jn(n)) || (r || D(t, "get", n), i))
      return c;
    if (/* @__PURE__ */ A(c)) {
      const o = a && mt(n) ? c : c.value;
      return r && b(o) ? /* @__PURE__ */ ut(o) : o;
    }
    return b(c) ? r ? /* @__PURE__ */ ut(c) : /* @__PURE__ */ nn(c) : c;
  }
}
class qn extends Xt {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, s, r) {
    let i = t[n];
    const a = y(t) && mt(n);
    if (!this._isShallow) {
      const f = /* @__PURE__ */ $(i);
      if (!/* @__PURE__ */ T(s) && !/* @__PURE__ */ $(s) && (i = /* @__PURE__ */ g(i), s = /* @__PURE__ */ g(s)), !a && /* @__PURE__ */ A(i) && !/* @__PURE__ */ A(s))
        return f ? (process.env.NODE_ENV !== "production" && W(
          `Set operation on key "${String(n)}" failed: target is readonly.`,
          t[n]
        ), !0) : (i.value = s, !0);
    }
    const c = a ? Number(n) < t.length : ot(t, n), o = Reflect.set(
      t,
      n,
      s,
      /* @__PURE__ */ A(t) ? t : r
    );
    return t === /* @__PURE__ */ g(r) && o && (c ? H(s, i) && G(t, "set", n, s, i) : G(t, "add", n, s)), o;
  }
  deleteProperty(t, n) {
    const s = ot(t, n), r = t[n], i = Reflect.deleteProperty(t, n);
    return i && s && G(t, "delete", n, void 0, r), i;
  }
  has(t, n) {
    const s = Reflect.has(t, n);
    return (!ae(n) || !Qt.has(n)) && D(t, "has", n), s;
  }
  ownKeys(t) {
    return D(
      t,
      "iterate",
      y(t) ? "length" : ie
    ), Reflect.ownKeys(t);
  }
}
class Gn extends Xt {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return process.env.NODE_ENV !== "production" && W(
      `Set operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
  deleteProperty(t, n) {
    return process.env.NODE_ENV !== "production" && W(
      `Delete operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
}
const Qn = /* @__PURE__ */ new qn(), Xn = /* @__PURE__ */ new Gn(), ft = (e) => e, Ae = (e) => Reflect.getPrototypeOf(e);
function Zn(e, t, n) {
  return function(...s) {
    const r = this.__v_raw, i = /* @__PURE__ */ g(r), a = se(i), c = e === "entries" || e === Symbol.iterator && a, o = e === "keys" && a, f = r[e](...s), u = n ? ft : t ? he : L;
    return !t && D(
      i,
      "iterate",
      o ? lt : ie
    ), J(
      // inheriting all iterator properties
      Object.create(f),
      {
        // iterator protocol
        next() {
          const { value: l, done: p } = f.next();
          return p ? { value: l, done: p } : {
            value: c ? [u(l[0]), u(l[1])] : u(l),
            done: p
          };
        }
      }
    );
  };
}
function ke(e) {
  return function(...t) {
    if (process.env.NODE_ENV !== "production") {
      const n = t[0] ? `on key "${t[0]}" ` : "";
      W(
        `${jt(e)} operation ${n}failed: target is readonly.`,
        /* @__PURE__ */ g(this)
      );
    }
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function er(e, t) {
  const n = {
    get(r) {
      const i = this.__v_raw, a = /* @__PURE__ */ g(i), c = /* @__PURE__ */ g(r);
      e || (H(r, c) && D(a, "get", r), D(a, "get", c));
      const { has: o } = Ae(a), f = t ? ft : e ? he : L;
      if (o.call(a, r))
        return f(i.get(r));
      if (o.call(a, c))
        return f(i.get(c));
      i !== a && i.get(r);
    },
    get size() {
      const r = this.__v_raw;
      return !e && D(/* @__PURE__ */ g(r), "iterate", ie), r.size;
    },
    has(r) {
      const i = this.__v_raw, a = /* @__PURE__ */ g(i), c = /* @__PURE__ */ g(r);
      return e || (H(r, c) && D(a, "has", r), D(a, "has", c)), r === c ? i.has(r) : i.has(r) || i.has(c);
    },
    forEach(r, i) {
      const a = this, c = a.__v_raw, o = /* @__PURE__ */ g(c), f = t ? ft : e ? he : L;
      return !e && D(o, "iterate", ie), c.forEach((u, l) => r.call(i, f(u), f(l), a));
    }
  };
  return J(
    n,
    e ? {
      add: ke("add"),
      set: ke("set"),
      delete: ke("delete"),
      clear: ke("clear")
    } : {
      add(r) {
        const i = /* @__PURE__ */ g(this), a = Ae(i), c = /* @__PURE__ */ g(r), o = !t && !/* @__PURE__ */ T(r) && !/* @__PURE__ */ $(r) ? c : r;
        return a.has.call(i, o) || H(r, o) && a.has.call(i, r) || H(c, o) && a.has.call(i, c) || (i.add(o), G(i, "add", o, o)), this;
      },
      set(r, i) {
        !t && !/* @__PURE__ */ T(i) && !/* @__PURE__ */ $(i) && (i = /* @__PURE__ */ g(i));
        const a = /* @__PURE__ */ g(this), { has: c, get: o } = Ae(a);
        let f = c.call(a, r);
        f ? process.env.NODE_ENV !== "production" && It(a, c, r) : (r = /* @__PURE__ */ g(r), f = c.call(a, r));
        const u = o.call(a, r);
        return a.set(r, i), f ? H(i, u) && G(a, "set", r, i, u) : G(a, "add", r, i), this;
      },
      delete(r) {
        const i = /* @__PURE__ */ g(this), { has: a, get: c } = Ae(i);
        let o = a.call(i, r);
        o ? process.env.NODE_ENV !== "production" && It(i, a, r) : (r = /* @__PURE__ */ g(r), o = a.call(i, r));
        const f = c ? c.call(i, r) : void 0, u = i.delete(r);
        return o && G(i, "delete", r, void 0, f), u;
      },
      clear() {
        const r = /* @__PURE__ */ g(this), i = r.size !== 0, a = process.env.NODE_ENV !== "production" ? se(r) ? new Map(r) : new Set(r) : void 0, c = r.clear();
        return i && G(
          r,
          "clear",
          void 0,
          void 0,
          a
        ), c;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((r) => {
    n[r] = Zn(r, e, t);
  }), n;
}
function Zt(e, t) {
  const n = er(e, t);
  return (s, r, i) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? s : Reflect.get(
    ot(n, r) && r in s ? n : s,
    r,
    i
  );
}
const tr = {
  get: /* @__PURE__ */ Zt(!1, !1)
}, nr = {
  get: /* @__PURE__ */ Zt(!0, !1)
};
function It(e, t, n) {
  const s = /* @__PURE__ */ g(n);
  if (s !== n && t.call(e, s)) {
    const r = Ft(e);
    W(
      `Reactive ${r} contains both the raw and reactive versions of the same object${r === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const en = /* @__PURE__ */ new WeakMap(), rr = /* @__PURE__ */ new WeakMap(), tn = /* @__PURE__ */ new WeakMap(), sr = /* @__PURE__ */ new WeakMap();
function ir(e) {
  switch (e) {
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
function nn(e) {
  return /* @__PURE__ */ $(e) ? e : rn(
    e,
    !1,
    Qn,
    tr,
    en
  );
}
// @__NO_SIDE_EFFECTS__
function ut(e) {
  return rn(
    e,
    !0,
    Xn,
    nr,
    tn
  );
}
function rn(e, t, n, s, r) {
  if (!b(e))
    return process.env.NODE_ENV !== "production" && W(
      `value cannot be made ${t ? "readonly" : "reactive"}: ${String(
        e
      )}`
    ), e;
  if (e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e))
    return e;
  const i = r.get(e);
  if (i)
    return i;
  const a = ir(Ft(e));
  if (a === 0)
    return e;
  const c = new Proxy(
    e,
    a === 2 ? s : n
  );
  return r.set(e, c), c;
}
// @__NO_SIDE_EFFECTS__
function oe(e) {
  return /* @__PURE__ */ $(e) ? /* @__PURE__ */ oe(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function $(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function T(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function He(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function g(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ g(t) : e;
}
const L = (e) => b(e) ? /* @__PURE__ */ nn(e) : e, he = (e) => b(e) ? /* @__PURE__ */ ut(e) : e;
// @__NO_SIDE_EFFECTS__
function A(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function cs(e) {
  return or(e, !1);
}
function or(e, t) {
  return /* @__PURE__ */ A(e) ? e : new cr(e, t);
}
class cr {
  constructor(t, n) {
    this.dep = new wt(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : /* @__PURE__ */ g(t), this._value = n ? t : L(t), this.__v_isShallow = n;
  }
  get value() {
    return process.env.NODE_ENV !== "production" ? this.dep.track({
      target: this,
      type: "get",
      key: "value"
    }) : this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, s = this.__v_isShallow || /* @__PURE__ */ T(t) || /* @__PURE__ */ $(t);
    t = s ? t : /* @__PURE__ */ g(t), H(t, n) && (this._rawValue = t, this._value = s ? t : L(t), process.env.NODE_ENV !== "production" ? this.dep.trigger({
      target: this,
      type: "set",
      key: "value",
      newValue: t,
      oldValue: n
    }) : this.dep.trigger());
  }
}
class ar {
  constructor(t, n, s) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new wt(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Te - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = s;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    m !== this)
      return Ut(this, !0), !0;
    process.env.NODE_ENV;
  }
  get value() {
    const t = process.env.NODE_ENV !== "production" ? this.dep.track({
      target: this,
      type: "get",
      key: "value"
    }) : this.dep.track();
    return Yt(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter ? this.setter(t) : process.env.NODE_ENV !== "production" && W("Write operation failed: computed value is readonly");
  }
}
// @__NO_SIDE_EFFECTS__
function lr(e, t, n = !1) {
  let s, r;
  N(e) ? s = e : (s = e.get, r = e.set);
  const i = new ar(s, r, n);
  return process.env.NODE_ENV, i;
}
const Me = {}, Pe = /* @__PURE__ */ new WeakMap();
let ne;
function fr(e, t = !1, n = ne) {
  if (n) {
    let s = Pe.get(n);
    s || Pe.set(n, s = []), s.push(e);
  } else process.env.NODE_ENV !== "production" && !t && W(
    "onWatcherCleanup() was called when there was no active watcher to associate with."
  );
}
function ur(e, t, n = Oe) {
  const { immediate: s, deep: r, once: i, scheduler: a, augmentJob: c, call: o } = n, f = (h) => {
    (n.onWarn || W)(
      "Invalid watch source: ",
      h,
      "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types."
    );
  }, u = (h) => r ? h : /* @__PURE__ */ T(h) || r === !1 || r === 0 ? Q(h, 1) : Q(h);
  let l, p, d, v, S = !1, le = !1;
  if (/* @__PURE__ */ A(e) ? (p = () => e.value, S = /* @__PURE__ */ T(e)) : /* @__PURE__ */ oe(e) ? (p = () => u(e), S = !0) : y(e) ? (le = !0, S = e.some((h) => /* @__PURE__ */ oe(h) || /* @__PURE__ */ T(h)), p = () => e.map((h) => {
    if (/* @__PURE__ */ A(h))
      return h.value;
    if (/* @__PURE__ */ oe(h))
      return u(h);
    if (N(h))
      return o ? o(h, 2) : h();
    process.env.NODE_ENV !== "production" && f(h);
  })) : N(e) ? t ? p = o ? () => o(e, 2) : e : p = () => {
    if (d) {
      _e();
      try {
        d();
      } finally {
        me();
      }
    }
    const h = ne;
    ne = l;
    try {
      return o ? o(e, 3, [v]) : e(v);
    } finally {
      ne = h;
    }
  } : (p = pe, process.env.NODE_ENV !== "production" && f(e)), t && r) {
    const h = p, O = r === !0 ? 1 / 0 : r;
    p = () => Q(h(), O);
  }
  const Y = () => {
    l.stop();
  };
  if (i && t) {
    const h = t;
    t = (...O) => {
      const V = h(...O);
      return Y(), V;
    };
  }
  let K = le ? new Array(e.length).fill(Me) : Me;
  const Z = (h) => {
    if (!(!(l.flags & 1) || !l.dirty && !h))
      if (t) {
        const O = l.run();
        if (h || r || S || (le ? O.some((V, ee) => H(V, K[ee])) : H(O, K))) {
          d && d();
          const V = ne;
          ne = l;
          try {
            const ee = [
              O,
              // pass undefined as the old value when it's changed for the first time
              K === Me ? void 0 : le && K[0] === Me ? [] : K,
              v
            ];
            K = O, o ? o(t, 3, ee) : (
              // @ts-expect-error
              t(...ee)
            );
          } finally {
            ne = V;
          }
        }
      } else
        l.run();
  };
  return c && c(Z), l = new Wn(p), l.scheduler = a ? () => a(Z, !1) : Z, v = (h) => fr(h, !1, l), d = l.onStop = () => {
    const h = Pe.get(l);
    if (h) {
      if (o)
        o(h, 4);
      else
        for (const O of h) O();
      Pe.delete(l);
    }
  }, process.env.NODE_ENV !== "production" && (l.onTrack = n.onTrack, l.onTrigger = n.onTrigger), t ? s ? Z(!0) : K = l.run() : a ? a(Z.bind(null, !0), !0) : l.run(), Y.pause = l.pause.bind(l), Y.resume = l.resume.bind(l), Y.stop = Y, Y;
}
function Q(e, t = 1 / 0, n) {
  if (t <= 0 || !b(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, /* @__PURE__ */ A(e))
    Q(e.value, t, n);
  else if (y(e))
    for (let s = 0; s < e.length; s++)
      Q(e[s], t, n);
  else if ($t(e) || se(e))
    e.forEach((s) => {
      Q(s, t, n);
    });
  else if (Ht(e)) {
    for (const s in e)
      Q(e[s], t, n);
    for (const s of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, s) && Q(e[s], t, n);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.39
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const ce = [];
function pr(e) {
  ce.push(e);
}
function dr() {
  ce.pop();
}
let nt = !1;
function E(e, ...t) {
  if (nt) return;
  nt = !0, _e();
  const n = ce.length ? ce[ce.length - 1].component : null, s = n && n.appContext.config.warnHandler, r = hr();
  if (s)
    qe(
      s,
      n,
      11,
      [
        // eslint-disable-next-line no-restricted-syntax
        e + t.map((i) => {
          var a, c;
          return (c = (a = i.toString) == null ? void 0 : a.call(i)) != null ? c : JSON.stringify(i);
        }).join(""),
        n && n.proxy,
        r.map(
          ({ vnode: i }) => `at <${xn(n, i.type)}>`
        ).join(`
`),
        r
      ]
    );
  else {
    const i = [`[Vue warn]: ${e}`, ...t];
    r.length && i.push(`
`, ...gr(r)), console.warn(...i);
  }
  me(), nt = !1;
}
function hr() {
  let e = ce[ce.length - 1];
  if (!e)
    return [];
  const t = [];
  for (; e; ) {
    const n = t[0];
    n && n.vnode === e ? n.recurseCount++ : t.push({
      vnode: e,
      recurseCount: 0
    });
    const s = e.component && e.component.parent;
    e = s && s.vnode;
  }
  return t;
}
function gr(e) {
  const t = [];
  return e.forEach((n, s) => {
    t.push(...s === 0 ? [] : [`
`], ..._r(n));
  }), t;
}
function _r({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "", s = e.component ? e.component.parent == null : !1, r = ` at <${xn(
    e.component,
    e.type,
    s
  )}`, i = ">" + n;
  return e.props ? [r, ...mr(e.props), i] : [r + i];
}
function mr(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((s) => {
    t.push(...sn(s, e[s]));
  }), n.length > 3 && t.push(" ..."), t;
}
function sn(e, t, n) {
  return k(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : /* @__PURE__ */ A(t) ? (t = sn(e, /* @__PURE__ */ g(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : N(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = /* @__PURE__ */ g(t), n ? t : [`${e}=`, t]);
}
function as(e, t) {
  process.env.NODE_ENV !== "production" && e !== void 0 && (typeof e != "number" ? E(`${t} is not a valid number - got ${JSON.stringify(e)}.`) : isNaN(e) && E(`${t} is NaN - the duration expression might be incorrect.`));
}
const St = {
  sp: "serverPrefetch hook",
  bc: "beforeCreate hook",
  c: "created hook",
  bm: "beforeMount hook",
  m: "mounted hook",
  bu: "beforeUpdate hook",
  u: "updated",
  bum: "beforeUnmount hook",
  um: "unmounted hook",
  a: "activated hook",
  da: "deactivated hook",
  ec: "errorCaptured hook",
  rtc: "renderTracked hook",
  rtg: "renderTriggered hook",
  0: "setup function",
  1: "render function",
  2: "watcher getter",
  3: "watcher callback",
  4: "watcher cleanup function",
  5: "native event handler",
  6: "component event handler",
  7: "vnode hook",
  8: "directive hook",
  9: "transition hook",
  10: "app errorHandler",
  11: "app warnHandler",
  12: "ref function",
  13: "async component loader",
  14: "scheduler flush",
  15: "component update",
  16: "app unmount cleanup function"
};
function qe(e, t, n, s) {
  try {
    return s ? e(...s) : e();
  } catch (r) {
    Ot(r, t, n);
  }
}
function Ge(e, t, n, s) {
  if (N(e)) {
    const r = qe(e, t, n, s);
    return r && Mn(r) && r.catch((i) => {
      Ot(i, t, n);
    }), r;
  }
  if (y(e)) {
    const r = [];
    for (let i = 0; i < e.length; i++)
      r.push(Ge(e[i], t, n, s));
    return r;
  } else process.env.NODE_ENV !== "production" && E(
    `Invalid value type passed to callWithAsyncErrorHandling(): ${typeof e}`
  );
}
function Ot(e, t, n, s = !0) {
  const r = t ? t.vnode : null, { errorHandler: i, throwUnhandledErrorInProduction: a } = t && t.appContext.config || Oe;
  if (t) {
    let c = t.parent;
    const o = t.proxy, f = process.env.NODE_ENV !== "production" ? St[n] : `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; c; ) {
      const u = c.ec;
      if (u) {
        for (let l = 0; l < u.length; l++)
          if (u[l](e, o, f) === !1)
            return;
      }
      c = c.parent;
    }
    if (i) {
      _e(), qe(i, null, 10, [
        e,
        o,
        f
      ]), me();
      return;
    }
  }
  yr(e, n, r, s, a);
}
function yr(e, t, n, s = !0, r = !1) {
  if (process.env.NODE_ENV !== "production") {
    const i = St[t];
    if (n && pr(n), E(`Unhandled error${i ? ` during execution of ${i}` : ""}`), n && dr(), s)
      throw e;
    console.error(e);
  } else {
    if (r)
      throw e;
    console.error(e);
  }
}
const I = [];
let U = -1;
const de = [];
let q = null, ue = 0;
const vr = /* @__PURE__ */ Promise.resolve();
let pt = null;
const Er = 100;
function Nr(e) {
  let t = U + 1, n = I.length;
  for (; t < n; ) {
    const s = t + n >>> 1, r = I[s], i = De(r);
    i < e || i === e && r.flags & 2 ? t = s + 1 : n = s;
  }
  return t;
}
function on(e) {
  if (!(e.flags & 1)) {
    const t = De(e), n = I[I.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= De(n) ? I.push(e) : I.splice(Nr(t), 0, e), e.flags |= 1, cn();
  }
}
function cn() {
  pt || (pt = vr.then(ln));
}
function an(e) {
  y(e) ? de.push(...e) : q && e.id === -1 ? q.splice(ue + 1, 0, e) : e.flags & 1 || (de.push(e), e.flags |= 1), cn();
}
function br(e) {
  if (de.length) {
    const t = [...new Set(de)].sort(
      (n, s) => De(n) - De(s)
    );
    if (de.length = 0, q) {
      q.push(...t);
      return;
    }
    for (q = t, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), ue = 0; ue < q.length; ue++) {
      const n = q[ue];
      process.env.NODE_ENV !== "production" && fn(e, n) || (n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2);
    }
    q = null, ue = 0;
  }
}
const De = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function ln(e) {
  process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map());
  const t = process.env.NODE_ENV !== "production" ? (n) => fn(e, n) : pe;
  try {
    for (U = 0; U < I.length; U++) {
      const n = I[U];
      if (n && !(n.flags & 8)) {
        if (process.env.NODE_ENV !== "production" && t(n))
          continue;
        n.flags & 4 && (n.flags &= -2), qe(
          n,
          n.i,
          n.i ? 15 : 14
        ), n.flags & 4 || (n.flags &= -2);
      }
    }
  } finally {
    for (; U < I.length; U++) {
      const n = I[U];
      n && (n.flags &= -2);
    }
    U = -1, I.length = 0, br(e), pt = null, (I.length || de.length) && ln(e);
  }
}
function fn(e, t) {
  const n = e.get(t) || 0;
  if (n > Er) {
    const s = t.i, r = s && Tn(s.type);
    return Ot(
      `Maximum recursive updates exceeded${r ? ` in component <${r}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`,
      null,
      10
    ), !0;
  }
  return e.set(t, n + 1), !1;
}
let Ve = !1;
const $e = /* @__PURE__ */ new Map();
process.env.NODE_ENV !== "production" && (Je().__VUE_HMR_RUNTIME__ = {
  createRecord: rt(wr),
  rerender: rt(Sr),
  reload: rt(Or)
});
const je = /* @__PURE__ */ new Map();
function wr(e, t) {
  return je.has(e) ? !1 : (je.set(e, {
    initialDef: We(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function We(e) {
  return Dn(e) ? e.__vccOpts : e;
}
function Sr(e, t) {
  const n = je.get(e);
  n && (n.initialDef.render = t, [...n.instances].forEach((s) => {
    t && (s.render = t, We(s.type).render = t), s.renderCache = [], Ve = !0, s.job.flags & 8 || s.update(), Ve = !1;
  }));
}
function Or(e, t) {
  const n = je.get(e);
  if (!n) return;
  t = We(t), At(n.initialDef, t);
  const s = [...n.instances];
  for (let r = 0; r < s.length; r++) {
    const i = s[r], a = We(i.type);
    let c = $e.get(a);
    c || (a !== n.initialDef && At(a, t), $e.set(a, c = /* @__PURE__ */ new Set())), c.add(i), i.appContext.propsCache.delete(i.type), i.appContext.emitsCache.delete(i.type), i.appContext.optionsCache.delete(i.type), i.ceReload ? (c.add(i), i.ceReload(t.styles), c.delete(i)) : i.parent ? on(() => {
      i.job.flags & 8 || (Ve = !0, i.parent.update(), Ve = !1, c.delete(i));
    }) : i.appContext.reload ? i.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn(
      "[HMR] Root or manually mounted instance modified. Full reload required."
    ), i.root.ce && i !== i.root && i.root.ce._removeChildStyle(a);
  }
  an(() => {
    $e.clear();
  });
}
function At(e, t) {
  J(e, t);
  for (const n in e)
    n !== "__file" && !(n in t) && delete e[n];
}
function rt(e) {
  return (t, n) => {
    try {
      return e(t, n);
    } catch (s) {
      console.error(s), console.warn(
        "[HMR] Something went wrong during Vue component hot-reload. Full reload required."
      );
    }
  };
}
let X, be = [], dt = !1;
function Tr(e, ...t) {
  X ? X.emit(e, ...t) : dt || be.push({ event: e, args: t });
}
function un(e, t) {
  var n, s;
  X = e, X ? (X.enabled = !0, be.forEach(({ event: r, args: i }) => X.emit(r, ...i)), be = []) : /* handle late devtools injection - only do this if we are in an actual */ /* browser environment to avoid the timer handle stalling test runner exit */ /* (#4815) */ typeof window < "u" && // some envs mock window but not fully
  window.HTMLElement && // also exclude jsdom
  // eslint-disable-next-line no-restricted-syntax
  !((s = (n = window.navigator) == null ? void 0 : n.userAgent) != null && s.includes("jsdom")) ? ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ = t.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((i) => {
    un(i, t);
  }), setTimeout(() => {
    X || (t.__VUE_DEVTOOLS_HOOK_REPLAY__ = null, dt = !0, be = []);
  }, 3e3)) : (dt = !0, be = []);
}
const xr = /* @__PURE__ */ Dr(
  "component:updated"
  /* COMPONENT_UPDATED */
);
// @__NO_SIDE_EFFECTS__
function Dr(e) {
  return (t) => {
    Tr(
      e,
      t.appContext.app,
      t.uid,
      t.parent ? t.parent.uid : void 0,
      t
    );
  };
}
let j = null, pn = null;
function kt(e) {
  const t = j;
  return j = e, pn = e && e.type.__scopeId || null, t;
}
function ls(e, t = j, n) {
  if (!t || e._n)
    return e;
  const s = (...r) => {
    s._d && Be(-1);
    const i = kt(t);
    let a;
    try {
      a = e(...r);
    } finally {
      kt(i), s._d && Be(1);
    }
    return process.env.NODE_ENV !== "production" && xr(t), a;
  };
  return s._n = !0, s._c = !0, s._d = !0, s;
}
function Vr(e, t, n = !1) {
  const s = Dt();
  if (s || jr) {
    let r = s ? s.parent == null || s.ce ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : void 0;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return n && N(t) ? t.call(s && s.proxy) : t;
    process.env.NODE_ENV !== "production" && E(`injection "${String(e)}" not found.`);
  } else process.env.NODE_ENV !== "production" && E("inject() can only be used inside setup() or functional components.");
}
const Rr = /* @__PURE__ */ Symbol.for("v-scx"), Cr = () => {
  {
    const e = Vr(Rr);
    return e || process.env.NODE_ENV !== "production" && E(
      "Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build."
    ), e;
  }
};
function fs(e, t, n) {
  return process.env.NODE_ENV !== "production" && !N(t) && E(
    "`watch(fn, options?)` signature has been moved to a separate API. Use `watchEffect(fn, options?)` instead. `watch` now only supports `watch(source, cb, options?) signature."
  ), Ir(e, t, n);
}
function Ir(e, t, n = Oe) {
  const { immediate: s, deep: r, flush: i, once: a } = n;
  process.env.NODE_ENV !== "production" && !t && (s !== void 0 && E(
    'watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'
  ), r !== void 0 && E(
    'watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'
  ), a !== void 0 && E(
    'watch() "once" option is only respected when using the watch(source, callback, options?) signature.'
  ));
  const c = J({}, n);
  process.env.NODE_ENV !== "production" && (c.onWarn = E);
  const o = t && s || !t && i !== "post";
  let f;
  if (Ce) {
    if (i === "sync") {
      const d = Cr();
      f = d.__watcherHandles || (d.__watcherHandles = []);
    } else if (!o) {
      const d = () => {
      };
      return d.stop = pe, d.resume = pe, d.pause = pe, d;
    }
  }
  const u = ye;
  c.call = (d, v, S) => Ge(d, u, v, S);
  let l = !1;
  i === "post" ? c.scheduler = (d) => {
    Kr(d, u && u.suspense);
  } : i !== "sync" && (l = !0, c.scheduler = (d, v) => {
    v ? d() : on(d);
  }), c.augmentJob = (d) => {
    t && (d.flags |= 4), l && (d.flags |= 2, u && (d.id = u.uid, d.i = u));
  };
  const p = ur(e, t, c);
  return Ce && (f ? f.push(p) : o && p()), p;
}
const dn = (e) => e.__isTeleport, z = /* @__PURE__ */ Symbol("_leaveCb"), Ne = /* @__PURE__ */ Symbol("_enterCb");
function Ar() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  return Lr(() => {
    e.isMounted = !0;
  }), Fr(() => {
    e.isUnmounting = !0;
  }), e;
}
const C = [Function, Array], kr = {
  mode: String,
  appear: Boolean,
  persisted: Boolean,
  // enter
  onBeforeEnter: C,
  onEnter: C,
  onAfterEnter: C,
  onEnterCancelled: C,
  // leave
  onBeforeLeave: C,
  onLeave: C,
  onAfterLeave: C,
  onLeaveCancelled: C,
  // appear
  onBeforeAppear: C,
  onAppear: C,
  onAfterAppear: C,
  onAppearCancelled: C
}, hn = (e) => {
  const t = e.subTree;
  return t.component ? hn(t.component) : t;
}, Mr = {
  name: "BaseTransition",
  props: kr,
  setup(e, { slots: t }) {
    const n = Dt(), s = Ar();
    return () => {
      const r = t.default && mn(t.default(), !0), i = r && r.length ? gn(r) : (
        // Keep explicit default-slot conditionals on the same transition path
        // as regular v-if branches, which render a comment placeholder.
        n.subTree ? Zr() : void 0
      );
      if (!i)
        return;
      const a = /* @__PURE__ */ g(e), { mode: c } = a;
      if (process.env.NODE_ENV !== "production" && c && c !== "in-out" && c !== "out-in" && c !== "default" && E(`invalid <transition> mode: ${c}`), s.isLeaving)
        return st(i);
      const o = Mt(i);
      if (!o)
        return st(i);
      let f = ht(
        o,
        a,
        s,
        n,
        // #11061, ensure enterHooks is fresh after clone
        (l) => f = l
      );
      o.type !== P && Ke(o, f);
      let u = n.subTree && Mt(n.subTree);
      if (u && u.type !== P && !Nn(u, o) && hn(n).type !== P) {
        let l = ht(
          u,
          a,
          s,
          n
        );
        if (Ke(u, l), c === "out-in" && o.type !== P)
          return s.isLeaving = !0, l.afterLeave = () => {
            s.isLeaving = !1, n.job.flags & 8 || n.update(), delete l.afterLeave, u = void 0;
          }, st(i);
        c === "in-out" && o.type !== P ? l.delayLeave = (p, d, v) => {
          const S = _n(
            s,
            u
          );
          S[String(u.key)] = u, p[z] = () => {
            d(), p[z] = void 0, delete f.delayedLeave, u = void 0;
          }, f.delayedLeave = () => {
            v(), delete f.delayedLeave, u = void 0;
          };
        } : u = void 0;
      } else u && (u = void 0);
      return i;
    };
  }
};
function gn(e) {
  let t = e[0];
  if (e.length > 1) {
    let n = !1;
    for (const s of e)
      if (s.type !== P) {
        if (process.env.NODE_ENV !== "production" && n) {
          E(
            "<transition> can only be used on a single element or component. Use <transition-group> for lists."
          );
          break;
        }
        if (t = s, n = !0, process.env.NODE_ENV === "production") break;
      }
  }
  return t;
}
const us = Mr;
function _n(e, t) {
  const { leavingVNodes: n } = e;
  let s = n.get(t.type);
  return s || (s = /* @__PURE__ */ Object.create(null), n.set(t.type, s)), s;
}
function ht(e, t, n, s, r) {
  const {
    appear: i,
    mode: a,
    persisted: c = !1,
    onBeforeEnter: o,
    onEnter: f,
    onAfterEnter: u,
    onEnterCancelled: l,
    onBeforeLeave: p,
    onLeave: d,
    onAfterLeave: v,
    onLeaveCancelled: S,
    onBeforeAppear: le,
    onAppear: Y,
    onAfterAppear: K,
    onAppearCancelled: Z
  } = t, h = String(e.key), O = _n(n, e), V = (_, w) => {
    _ && Ge(
      _,
      s,
      9,
      w
    );
  }, ee = (_, w) => {
    const x = w[1];
    V(_, w), y(_) ? _.every((te) => te.length <= 1) && x() : _.length <= 1 && x();
  }, Qe = {
    mode: a,
    persisted: c,
    beforeEnter(_) {
      let w = o;
      if (!n.isMounted)
        if (i)
          w = le || o;
        else
          return;
      _[z] && _[z](
        !0
        /* cancelled */
      );
      const x = O[h];
      x && Nn(e, x) && x.el[z] && x.el[z](), V(w, [_]);
    },
    enter(_) {
      if (!Ve && O[h] === e) return;
      let w = f, x = u, te = l;
      if (!n.isMounted)
        if (i)
          w = Y || f, x = K || u, te = Z || l;
        else
          return;
      let ve = !1;
      _[Ne] = (Vn) => {
        ve || (ve = !0, Vn ? V(te, [_]) : V(x, [_]), Qe.delayedLeave && Qe.delayedLeave(), _[Ne] = void 0);
      };
      const Ie = _[Ne].bind(null, !1);
      w ? ee(w, [_, Ie]) : Ie();
    },
    leave(_, w) {
      const x = String(e.key);
      if (_[Ne] && _[Ne](
        !0
        /* cancelled */
      ), n.isUnmounting)
        return w();
      V(p, [_]);
      let te = !1;
      _[z] = (Ie) => {
        te || (te = !0, w(), Ie ? V(S, [_]) : V(v, [_]), _[z] = void 0, O[x] === e && delete O[x]);
      };
      const ve = _[z].bind(null, !1);
      O[x] = e, d ? ee(d, [_, ve]) : ve();
    },
    clone(_) {
      const w = ht(
        _,
        t,
        n,
        s,
        r
      );
      return r && r(w), w;
    }
  };
  return Qe;
}
function st(e) {
  if (yn(e))
    return e = ge(e), e.children = null, e;
}
function Mt(e) {
  if (!yn(e))
    return dn(e.type) && e.children ? gn(e.children) : e;
  if (e.component)
    return e.component.subTree;
  const { shapeFlag: t, children: n } = e;
  if (n) {
    if (t & 16)
      return n[0];
    if (t & 32 && N(n.default))
      return n.default();
  }
}
function Ke(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, Ke(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function mn(e, t = !1, n) {
  let s = [], r = 0;
  for (let i = 0; i < e.length; i++) {
    let a = e[i];
    const c = n == null ? a.key : String(n) + String(a.key != null ? a.key : i);
    a.type === xt ? (a.patchFlag & 128 && r++, s = s.concat(
      mn(a.children, t, c)
    )) : (t || a.type !== P) && s.push(c != null ? ge(a, { key: c }) : a);
  }
  if (r > 1)
    for (let i = 0; i < s.length; i++)
      s[i].patchFlag = -2;
  return s;
}
Je().requestIdleCallback;
Je().cancelIdleCallback;
const yn = (e) => e.type.__isKeepAlive;
function $r(e, t, n = ye, s = !1) {
  if (n) {
    const r = n[e] || (n[e] = []), i = t.__weh || (t.__weh = (...a) => {
      _e();
      const c = ts(n), o = Ge(t, n, e, a);
      return c(), me(), o;
    });
    return s ? r.unshift(i) : r.push(i), i;
  } else if (process.env.NODE_ENV !== "production") {
    const r = $n(St[e].replace(/ hook$/, ""));
    E(
      `${r} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`
    );
  }
}
const Tt = (e) => (t, n = ye) => {
  (!Ce || e === "sp") && $r(e, (...s) => t(...s), n);
}, Lr = Tt("m"), Fr = Tt(
  "bum"
), ps = Tt("um"), Hr = /* @__PURE__ */ Symbol.for("v-ndc");
function ds(e, t, n, s) {
  let r;
  const i = n, a = y(e);
  if (a || k(e)) {
    const c = a && /* @__PURE__ */ oe(e);
    let o = !1, f = !1;
    c && (o = !/* @__PURE__ */ T(e), f = /* @__PURE__ */ $(e), e = Ye(e)), r = new Array(e.length);
    for (let u = 0, l = e.length; u < l; u++)
      r[u] = t(
        o ? f ? he(L(e[u])) : L(e[u]) : e[u],
        u,
        void 0,
        i
      );
  } else if (typeof e == "number")
    if (process.env.NODE_ENV !== "production" && (!Number.isInteger(e) || e < 0))
      E(
        `The v-for range expects a positive integer value but got ${e}.`
      ), r = [];
    else {
      r = new Array(e);
      for (let c = 0; c < e; c++)
        r[c] = t(c + 1, c, void 0, i);
    }
  else if (b(e))
    if (e[Symbol.iterator])
      r = Array.from(
        e,
        (c, o) => t(c, o, void 0, i)
      );
    else {
      const c = Object.keys(e);
      r = new Array(c.length);
      for (let o = 0, f = c.length; o < f; o++) {
        const u = c[o];
        r[o] = t(e[u], u, o, i);
      }
    }
  else
    r = [];
  return r;
}
const Pr = {};
process.env.NODE_ENV !== "production" && (Pr.ownKeys = (e) => (E(
  "Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."
), Reflect.ownKeys(e)));
let jr = null;
const Wr = {}, vn = (e) => Object.getPrototypeOf(e) === Wr, Kr = Ur, Br = (e) => e.__isSuspense;
function Ur(e, t) {
  t && t.pendingBranch ? y(e) ? t.effects.push(...e) : t.effects.push(e) : an(e);
}
const xt = /* @__PURE__ */ Symbol.for("v-fgt"), zr = /* @__PURE__ */ Symbol.for("v-txt"), P = /* @__PURE__ */ Symbol.for("v-cmt"), Le = [];
let R = null;
function Jr(e = !1) {
  Le.push(R = e ? null : []);
}
function Yr() {
  Le.pop(), R = Le[Le.length - 1] || null;
}
let Re = 1;
function Be(e, t = !1) {
  Re += e, e < 0 && R && t && (R.hasOnce = !0);
}
function En(e) {
  return e.dynamicChildren = Re > 0 ? R || Cn : null, Yr(), Re > 0 && R && R.push(e), e;
}
function hs(e, t, n, s, r, i) {
  return En(
    wn(
      e,
      t,
      n,
      s,
      r,
      i,
      !0
    )
  );
}
function qr(e, t, n, s, r) {
  return En(
    re(
      e,
      t,
      n,
      s,
      r,
      !0
    )
  );
}
function gt(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Nn(e, t) {
  if (process.env.NODE_ENV !== "production" && t.shapeFlag & 6 && e.component) {
    const n = $e.get(t.type);
    if (n && n.has(e.component))
      return e.shapeFlag &= -257, t.shapeFlag &= -513, !1;
  }
  return e.type === t.type && e.key === t.key;
}
const Gr = (...e) => Sn(
  ...e
), bn = ({ key: e }) => e ?? null, Fe = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? k(e) || /* @__PURE__ */ A(e) || N(e) ? { i: j, r: e, k: t, f: !!n } : e : null);
function wn(e, t = null, n = null, s = 0, r = null, i = e === xt ? 0 : 1, a = !1, c = !1) {
  const o = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && bn(t),
    ref: t && Fe(t),
    scopeId: pn,
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
    patchFlag: s,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
    ctx: j
  };
  return c ? (Ue(o, n), i & 128 && e.normalize(o)) : n && (o.shapeFlag |= k(n) ? 8 : 16), process.env.NODE_ENV !== "production" && o.key !== o.key && E("VNode created with invalid key (NaN). VNode type:", o.type), Re > 0 && // avoid a block node from tracking itself
  !a && // has current parent block
  R && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (o.patchFlag > 0 || i & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  o.patchFlag !== 32 && R.push(o), o;
}
const re = process.env.NODE_ENV !== "production" ? Gr : Sn;
function Sn(e, t = null, n = null, s = 0, r = null, i = !1) {
  if ((!e || e === Hr) && (process.env.NODE_ENV !== "production" && !e && E(`Invalid vnode type when creating vnode: ${e}.`), e = P), gt(e)) {
    const c = ge(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Ue(c, n), Re > 0 && !i && R && (c.shapeFlag & 6 ? R[R.indexOf(e)] = c : R.push(c)), c.patchFlag = -2, c;
  }
  if (Dn(e) && (e = e.__vccOpts), t) {
    t = Qr(t);
    let { class: c, style: o } = t;
    c && !k(c) && (t.class = vt(c)), b(o) && (/* @__PURE__ */ He(o) && !y(o) && (o = J({}, o)), t.style = yt(o));
  }
  const a = k(e) ? 1 : Br(e) ? 128 : dn(e) ? 64 : b(e) ? 4 : N(e) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && a & 4 && /* @__PURE__ */ He(e) && (e = /* @__PURE__ */ g(e), E(
    "Vue received a Component that was made a reactive object. This can lead to unnecessary performance overhead and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.",
    `
Component that was made reactive: `,
    e
  )), wn(
    e,
    t,
    n,
    s,
    r,
    a,
    i,
    !0
  );
}
function Qr(e) {
  return e ? /* @__PURE__ */ He(e) || vn(e) ? J({}, e) : e : null;
}
function ge(e, t, n = !1, s = !1) {
  const { props: r, ref: i, patchFlag: a, children: c, transition: o } = e, f = t ? es(r || {}, t) : r, u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: f,
    key: f && bn(f),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && i ? y(i) ? i.concat(Fe(t)) : [i, Fe(t)] : Fe(t)
    ) : i,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: process.env.NODE_ENV !== "production" && a === -1 && y(c) ? c.map(On) : c,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== xt ? a === -1 ? 16 : a | 16 : a,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: o,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && ge(e.ssContent),
    ssFallback: e.ssFallback && ge(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return o && s && Ke(
    u,
    o.clone(u)
  ), u;
}
function On(e) {
  const t = ge(e);
  return y(e.children) && (t.children = e.children.map(On)), t;
}
function Xr(e = " ", t = 0) {
  return re(zr, null, e, t);
}
function Zr(e = "", t = !1) {
  return t ? (Jr(), qr(P, null, e)) : re(P, null, e);
}
function Ue(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (y(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), Ue(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !vn(t) ? t._ctx = j : r === 3 && j && (j.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else if (N(t)) {
    if (s & 65) {
      Ue(e, { default: t });
      return;
    }
    t = { default: t, _ctx: j }, n = 32;
  } else
    t = String(t), s & 64 ? (n = 16, t = [Xr(t)]) : n = 8;
  e.children = t, e.shapeFlag |= n;
}
function es(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const r in s)
      if (r === "class")
        t.class !== s.class && (t.class = vt([t.class, s.class]));
      else if (r === "style")
        t.style = yt([t.style, s.style]);
      else if (In(r)) {
        const i = t[r], a = s[r];
        a && i !== a && !(y(i) && i.includes(a)) ? t[r] = i ? [].concat(i, a) : a : a == null && i == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !An(r) && (t[r] = a);
      } else r !== "" && (t[r] = s[r]);
  }
  return t;
}
let ye = null;
const Dt = () => ye || j;
let _t;
{
  const e = Je(), t = (n, s) => {
    let r;
    return (r = e[n]) || (r = e[n] = []), r.push(s), (i) => {
      r.length > 1 ? r.forEach((a) => a(i)) : r[0](i);
    };
  };
  _t = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => ye = n
  ), t(
    "__VUE_SSR_SETTERS__",
    (n) => Ce = n
  );
}
const ts = (e) => {
  const t = ye;
  return _t(e), e.scope.on(), () => {
    e.scope.off(), _t(t);
  };
};
let Ce = !1;
process.env.NODE_ENV;
const ns = /(?:^|[-_])\w/g, rs = (e) => e.replace(ns, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function Tn(e, t = !0) {
  return N(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function xn(e, t, n = !1) {
  let s = Tn(t);
  if (!s && t.__file) {
    const r = t.__file.match(/([^/\\]+)\.\w+$/);
    r && (s = r[1]);
  }
  if (!s && e) {
    const r = (i) => {
      for (const a in i)
        if (i[a] === t)
          return a;
    };
    s = r(e.components) || e.parent && r(
      e.parent.type.components
    ) || r(e.appContext.components);
  }
  return s ? rs(s) : n ? "App" : "Anonymous";
}
function Dn(e) {
  return N(e) && "__vccOpts" in e;
}
const it = (e, t) => {
  const n = /* @__PURE__ */ lr(e, t, Ce);
  if (process.env.NODE_ENV !== "production") {
    const s = Dt();
    s && s.appContext.config.warnRecursiveComputed && (n._warnRecursive = !0);
  }
  return n;
};
function gs(e, t, n) {
  try {
    Be(-1);
    const s = arguments.length;
    return s === 2 ? b(t) && !y(t) ? gt(t) ? re(e, null, [t]) : re(e, t) : re(e, null, t) : (s > 3 ? n = Array.prototype.slice.call(arguments, 2) : s === 3 && gt(n) && (n = [n]), re(e, t, n));
  } finally {
    Be(1);
  }
}
function ss() {
  if (process.env.NODE_ENV === "production" || typeof window > "u")
    return;
  const e = { style: "color:#3ba776" }, t = { style: "color:#1677ff" }, n = { style: "color:#f5222d" }, s = { style: "color:#eb2f96" }, r = {
    __vue_custom_formatter: !0,
    header(l) {
      if (!b(l))
        return null;
      if (l.__isVue)
        return ["div", e, "VueInstance"];
      if (/* @__PURE__ */ A(l)) {
        _e();
        const p = l.value;
        return me(), [
          "div",
          {},
          ["span", e, u(l)],
          "<",
          c(p),
          ">"
        ];
      } else {
        if (/* @__PURE__ */ oe(l))
          return [
            "div",
            {},
            ["span", e, /* @__PURE__ */ T(l) ? "ShallowReactive" : "Reactive"],
            "<",
            c(l),
            `>${/* @__PURE__ */ $(l) ? " (readonly)" : ""}`
          ];
        if (/* @__PURE__ */ $(l))
          return [
            "div",
            {},
            ["span", e, /* @__PURE__ */ T(l) ? "ShallowReadonly" : "Readonly"],
            "<",
            c(l),
            ">"
          ];
      }
      return null;
    },
    hasBody(l) {
      return l && l.__isVue;
    },
    body(l) {
      if (l && l.__isVue)
        return [
          "div",
          {},
          ...i(l.$)
        ];
    }
  };
  function i(l) {
    const p = [];
    l.type.props && l.props && p.push(a("props", /* @__PURE__ */ g(l.props))), l.setupState !== Oe && p.push(a("setup", l.setupState)), l.data !== Oe && p.push(a("data", /* @__PURE__ */ g(l.data)));
    const d = o(l, "computed");
    d && p.push(a("computed", d));
    const v = o(l, "inject");
    return v && p.push(a("injected", v)), p.push([
      "div",
      {},
      [
        "span",
        {
          style: s.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: l }]
    ]), p;
  }
  function a(l, p) {
    return p = J({}, p), Object.keys(p).length ? [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        l
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(p).map((d) => [
          "div",
          {},
          ["span", s, d + ": "],
          c(p[d], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function c(l, p = !0) {
    return typeof l == "number" ? ["span", t, l] : typeof l == "string" ? ["span", n, JSON.stringify(l)] : typeof l == "boolean" ? ["span", s, l] : b(l) ? ["object", { object: p ? /* @__PURE__ */ g(l) : l }] : ["span", n, String(l)];
  }
  function o(l, p) {
    const d = l.type;
    if (N(d))
      return;
    const v = {};
    for (const S in l.ctx)
      f(d, S, p) && (v[S] = l.ctx[S]);
    return v;
  }
  function f(l, p, d) {
    const v = l[d];
    if (y(v) && v.includes(p) || b(v) && p in v || l.extends && f(l.extends, p, d) || l.mixins && l.mixins.some((S) => f(S, p, d)))
      return !0;
  }
  function u(l) {
    return /* @__PURE__ */ T(l) ? "ShallowRef" : l.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(r) : window.devtoolsFormatters = [r];
}
const _s = process.env.NODE_ENV !== "production" ? E : pe;
process.env.NODE_ENV;
process.env.NODE_ENV;
/**
* vue v3.5.39
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function is() {
  ss();
}
process.env.NODE_ENV !== "production" && is();
function ms(e, t = {}) {
  const n = it(() => e.currentTime ?? 0), s = it(() => {
    const o = e.lyricLines || [];
    for (let f = 0; f < o.length; f++) {
      const u = o[f];
      if (e.currentTime >= (u.startTime ?? 0) && e.currentTime < (u.endTime ?? 1 / 0))
        return f;
    }
    return o.length > 0 && e.currentTime >= (o[o.length - 1].endTime ?? 0) ? o.length - 1 : -1;
  }), r = it(() => (e.lyricLines || []).map((o) => ({
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
  function i() {
    const o = e.coverColor;
    return typeof o == "string" ? { primary: o, average: o } : o && typeof o == "object" ? { primary: o.primary || "#ffffff", average: o.average || o.primary || "#ffffff" } : { primary: "#ffffff", average: "#ffffff" };
  }
  function a() {
    return {
      isInClimax: !!e.isClimax,
      segments: e.climaxSegments || [],
      energy: e.energy ?? 0,
      isBeat: !!e.isBeat,
      kickEnergy: e.kickEnergy ?? 0,
      bpm: e.bpm ?? 120
    };
  }
  function c(o, f) {
    if (t[o] !== void 0) return t[o];
    try {
      const u = localStorage.getItem("music-full-config");
      if (u) {
        const l = JSON.parse(u);
        if (l[o] !== void 0) return l[o];
      }
    } catch {
    }
    return f;
  }
  return { nowTime: n, nowIndex: s, lrcArray: r, getCoverColor: i, getClimaxState: a, getConfigValue: c };
}
function ys(e, t) {
  return e.map((n, s) => {
    const r = t[s] ?? n.startTime ?? 0, i = t[s + 1] ?? (n.duration != null ? r + n.duration : r + 5), a = n.text || "", c = [];
    if (n.words && n.words.length > 0) {
      let o = 0;
      for (const f of n.words) {
        const u = r + (f.startTime || 0), l = r + (f.startTime || 0) + (f.duration || 0.3), p = a.slice(o, o + (f.text || "").length) || f.text || "";
        o += (f.text || "").length, c.push({
          text: p,
          startTime: u,
          endTime: l
        });
      }
    } else {
      const o = Array.from(a), f = Math.max((i - r) / Math.max(o.length, 1), 0.05);
      o.forEach((u, l) => {
        c.push({
          text: u,
          startTime: r + l * f,
          endTime: r + (l + 1) * f
        });
      });
    }
    return {
      words: c,
      startTime: r,
      endTime: i || r + 5,
      fullText: a,
      translation: n.trText || void 0
    };
  });
}
const vs = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, r] of t)
    n[s] = r;
  return n;
};
__sh__plugin_vue_export_helper_Ds65E8pU_js.B=kr;__sh__plugin_vue_export_helper_Ds65E8pU_js.F=xt;__sh__plugin_vue_export_helper_Ds65E8pU_js._=vs;__sh__plugin_vue_export_helper_Ds65E8pU_js.a=it;__sh__plugin_vue_export_helper_Ds65E8pU_js.b=ps;__sh__plugin_vue_export_helper_Ds65E8pU_js.c=ms;__sh__plugin_vue_export_helper_Ds65E8pU_js.d=hs;__sh__plugin_vue_export_helper_Ds65E8pU_js.e=wn;__sh__plugin_vue_export_helper_Ds65E8pU_js.f=cs;__sh__plugin_vue_export_helper_Ds65E8pU_js.g=Jr;__sh__plugin_vue_export_helper_Ds65E8pU_js.h=re;__sh__plugin_vue_export_helper_Ds65E8pU_js.i=ls;__sh__plugin_vue_export_helper_Ds65E8pU_js.j=Zr;__sh__plugin_vue_export_helper_Ds65E8pU_js.k=vt;__sh__plugin_vue_export_helper_Ds65E8pU_js.l=J;__sh__plugin_vue_export_helper_Ds65E8pU_js.m=_s;__sh__plugin_vue_export_helper_Ds65E8pU_js.n=yt;__sh__plugin_vue_export_helper_Ds65E8pU_js.o=Lr;__sh__plugin_vue_export_helper_Ds65E8pU_js.p=gs;__sh__plugin_vue_export_helper_Ds65E8pU_js.q=us;__sh__plugin_vue_export_helper_Ds65E8pU_js.r=ds;__sh__plugin_vue_export_helper_Ds65E8pU_js.s=b;__sh__plugin_vue_export_helper_Ds65E8pU_js.t=jn;__sh__plugin_vue_export_helper_Ds65E8pU_js.u=as;__sh__plugin_vue_export_helper_Ds65E8pU_js.v=y;__sh__plugin_vue_export_helper_Ds65E8pU_js.w=fs;__sh__plugin_vue_export_helper_Ds65E8pU_js.x=os;__sh__plugin_vue_export_helper_Ds65E8pU_js.z=ys;
})();
const oe = { class: "folia-fume-root w-full h-full overflow-hidden pointer-events-none select-none" }, ae = {
  __name: "FumeTheme",
  props: {
    currentTime: { type: Number, default: 0 },
    lyricLines: { type: Array, default: () => [] },
    coverColor: { type: [String, Object], default: "#ffffff" },
    isClimax: { type: Boolean, default: !1 },
    energy: { type: Number, default: 0 },
    settings: { type: Object, default: () => ({}) }
  },
  setup(k) {
    const F = k, l = Y(F, F.settings), z = o(() => l.nowTime.value), S = o(() => l.lrcArray.value), E = o(() => S.value.map((t) => t.startTime ?? 0)), N = o(() => l.getCoverColor()), x = o(() => N.value.primary || "#ffffff"), C = o(() => l.getClimaxState().isInClimax ? "#ff6b6b" : x.value), f = o(() => te(S.value, E.value)), P = o(() => f.value.length === 0 ? 120 : Math.max(f.value[f.value.length - 1]?.endTime || 120, 120)), b = ee(null);
    let n = 0;
    const q = o(() => {
      const t = [];
      for (const e of f.value)
        for (const a of e.words)
          t.push({ text: a.text, time: a.startTime, endTime: a.endTime });
      return t;
    }), D = o(() => l.getConfigValue("foliaFumeScrollSpeed") ?? 1), R = o(() => l.getConfigValue("foliaFumeFontSize") ?? 0.025);
    function r() {
      const t = b.value;
      if (!t) {
        n = requestAnimationFrame(r);
        return;
      }
      const e = t.getContext("2d");
      if (!e) {
        n = requestAnimationFrame(r);
        return;
      }
      const a = window.devicePixelRatio || 1, i = t.clientWidth, c = t.clientHeight;
      t.width !== i * a && (t.width = i * a), t.height !== c * a && (t.height = c * a), e.setTransform(a, 0, 0, a, 0, 0), e.clearRect(0, 0, i, c);
      const A = z.value, m = Math.min(36, Math.max(14, i * R.value));
      e.font = `400 ${m}px "Noto Sans SC", PingFang SC, sans-serif`, e.textBaseline = "top";
      const d = m * 1.5, B = 24, T = 16, I = Math.max(m * 6, (i - B * 2 - T) / 3), h = q.value;
      if (h.length === 0) {
        n = requestAnimationFrame(r);
        return;
      }
      const V = P.value, L = D.value, W = Math.min(1, A / V), j = Math.max(0, h.length / 2 * d - c * 0.5), H = W * j * L, _ = h.length, M = Math.ceil(_ / 3);
      e.save();
      for (let p = 0; p < 3; p++) {
        const y = p * M, O = Math.min(y + M, _), G = B + p * (I + T);
        for (let v = y; v < O; v++) {
          const g = h[v], w = (v - y) * d - H + 40;
          if (w < -d || w > c + d) continue;
          const s = (A - g.time) / Math.max(g.endTime - g.time, 0.5), U = s > 1;
          if (s >= 0 && s <= 1) {
            const u = Math.min(1, 0.6 + s * 0.4);
            e.globalAlpha = u, e.shadowColor = C.value, e.shadowBlur = m * 0.6, e.fillStyle = C.value;
          } else if (U) {
            const u = Math.max(0.08, 0.4 - s * 0.3);
            e.globalAlpha = u, e.shadowBlur = 0, e.fillStyle = x.value;
          } else {
            const u = Math.max(0.1, 0.3 + s * 0.3);
            e.globalAlpha = u, e.shadowBlur = 0, e.fillStyle = x.value;
          }
          e.fillText(g.text, G, w), e.shadowBlur = 0;
        }
      }
      e.restore(), e.globalAlpha = 1, n = requestAnimationFrame(r);
    }
    return $(() => {
      n = requestAnimationFrame(r);
    }), J(() => {
      cancelAnimationFrame(n);
    }), (t, e) => (K(), Q("div", oe, [
      Z("canvas", {
        ref_key: "canvasRef",
        ref: b,
        class: "absolute inset-0 w-full h-full"
      }, null, 512)
    ]));
  }
}, le = /* @__PURE__ */ X(ae, [["__scopeId", "data-v-54b8528a"]]);
le.settings = [
  { key: "foliaShowTranslation", type: "boolean", label: "显示翻译", default: !0 },
  { key: "foliaFumeScrollSpeed", type: "slider", label: "滚动速度", min: 0.3, max: 3, step: 0.1, marks: ["慢", "快"], default: 1 },
  { key: "foliaFumeFontSize", type: "slider", label: "字号比例", min: 0.015, max: 0.04, step: 5e-3, marks: ["小", "大"], default: 0.025 }
];
export {
  le as default
};
