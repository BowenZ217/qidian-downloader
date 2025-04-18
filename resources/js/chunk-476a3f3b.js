import {_ as __vitePreload} from "./chunk-c24561d7.js";
import {A as isFunction$1, B as isString$1, C as looseToNumber, D as createRenderer, h, E as BaseTransition, G as extend$1, H as isObject$1, I as isArray$1, J as invokeArrayFns, K as BaseTransitionPropsValidators, L as toNumber, M as createHydrationRenderer, N as isOn, O as isModelListener, P as camelize, Q as hyphenate, R as capitalize, S as includeBooleanAttr, T as isSymbol, U as isSpecialBooleanAttr, V as callWithAsyncErrorHandling, d as defineComponent, a as openBlock, m as createBlock, w as withCtx, b as createBaseVNode, n as normalizeClass, c as createElementBlock, j as createCommentVNode, k as createTextVNode, t as toDisplayString, r as renderSlot, e as createVNode, l as reactive, f as ref, W as provide, p as watch, X as inject, Y as useSlots, g as onMounted, Z as onUnmounted, u as unref, _ as resolveDynamicComponent, F as Fragment, q as withDirectives, $ as createSlots, a0 as normalizeStyle, a1 as Teleport, i as renderList, a2 as toRefs, x as computed, s as nextTick, a3 as effectScope, a4 as readonly, z as toRef, a5 as getCurrentInstance, a6 as resolveComponent, a7 as isRef, a8 as pushScopeId, a9 as popScopeId, aa as getCurrentScope, ab as onScopeDispose, ac as createStaticVNode} from "./chunk-6691c4c6.js";
var commonjsGlobal = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};
function getDefaultExportFromCjs(e) {
    return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e
}
/**
* @vue/runtime-dom v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let policy;
const tt = "undefined" != typeof window && window.trustedTypes;
if (tt)
    try {
        policy = tt.createPolicy("vue", {
            createHTML: e => e
        })
    } catch (e) {}
const unsafeToTrustedHTML = policy ? e => policy.createHTML(e) : e => e
  , svgNS = "http://www.w3.org/2000/svg"
  , mathmlNS = "http://www.w3.org/1998/Math/MathML"
  , doc = "undefined" != typeof document ? document : null
  , templateContainer = doc && doc.createElement("template")
  , nodeOps = {
    insert: (e, t, n) => {
        t.insertBefore(e, n || null)
    }
    ,
    remove: e => {
        const t = e.parentNode;
        t && t.removeChild(e)
    }
    ,
    createElement: (e, t, n, o) => {
        const r = "svg" === t ? doc.createElementNS(svgNS, e) : "mathml" === t ? doc.createElementNS(mathmlNS, e) : n ? doc.createElement(e, {
            is: n
        }) : doc.createElement(e);
        return "select" === e && o && null != o.multiple && r.setAttribute("multiple", o.multiple),
        r
    }
    ,
    createText: e => doc.createTextNode(e),
    createComment: e => doc.createComment(e),
    setText: (e, t) => {
        e.nodeValue = t
    }
    ,
    setElementText: (e, t) => {
        e.textContent = t
    }
    ,
    parentNode: e => e.parentNode,
    nextSibling: e => e.nextSibling,
    querySelector: e => doc.querySelector(e),
    setScopeId(e, t) {
        e.setAttribute(t, "")
    },
    insertStaticContent(e, t, n, o, r, i) {
        const a = n ? n.previousSibling : t.lastChild;
        if (r && (r === i || r.nextSibling))
            for (; t.insertBefore(r.cloneNode(!0), n),
            r !== i && (r = r.nextSibling); )
                ;
        else {
            templateContainer.innerHTML = unsafeToTrustedHTML("svg" === o ? "<svg>".concat(e, "</svg>") : "mathml" === o ? "<math>".concat(e, "</math>") : e);
            const r = templateContainer.content;
            if ("svg" === o || "mathml" === o) {
                const e = r.firstChild;
                for (; e.firstChild; )
                    r.appendChild(e.firstChild);
                r.removeChild(e)
            }
            t.insertBefore(r, n)
        }
        return [a ? a.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild]
    }
}
  , TRANSITION = "transition"
  , ANIMATION = "animation"
  , vtcKey = Symbol("_vtc")
  , DOMTransitionPropsValidators = {
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
}
  , TransitionPropsValidators = extend$1({}, BaseTransitionPropsValidators, DOMTransitionPropsValidators)
  , decorate$1 = e => (e.displayName = "Transition",
e.props = TransitionPropsValidators,
e)
  , Transition = decorate$1(( (e, {slots: t}) => h(BaseTransition, resolveTransitionProps(e), t)))
  , callHook = (e, t=[]) => {
    isArray$1(e) ? e.forEach((e => e(...t))) : e && e(...t)
}
  , hasExplicitCallback = e => !!e && (isArray$1(e) ? e.some((e => e.length > 1)) : e.length > 1);
function resolveTransitionProps(e) {
    const t = {};
    for (const T in e)
        T in DOMTransitionPropsValidators || (t[T] = e[T]);
    if (!1 === e.css)
        return t;
    const {name: n="v", type: o, duration: r, enterFromClass: i="".concat(n, "-enter-from"), enterActiveClass: a="".concat(n, "-enter-active"), enterToClass: s="".concat(n, "-enter-to"), appearFromClass: l=i, appearActiveClass: c=a, appearToClass: u=s, leaveFromClass: d="".concat(n, "-leave-from"), leaveActiveClass: f="".concat(n, "-leave-active"), leaveToClass: p="".concat(n, "-leave-to")} = e
      , h = normalizeDuration(r)
      , m = h && h[0]
      , _ = h && h[1]
      , {onBeforeEnter: v, onEnter: g, onEnterCancelled: x, onLeave: y, onLeaveCancelled: b, onBeforeAppear: k=v, onAppear: w=g, onAppearCancelled: E=x} = t
      , S = (e, t, n, o) => {
        e._enterCancelled = o,
        removeTransitionClass(e, t ? u : s),
        removeTransitionClass(e, t ? c : a),
        n && n()
    }
      , C = (e, t) => {
        e._isLeaving = !1,
        removeTransitionClass(e, d),
        removeTransitionClass(e, p),
        removeTransitionClass(e, f),
        t && t()
    }
      , B = e => (t, n) => {
        const r = e ? w : g
          , a = () => S(t, e, n);
        callHook(r, [t, a]),
        nextFrame(( () => {
            removeTransitionClass(t, e ? l : i),
            addTransitionClass(t, e ? u : s),
            hasExplicitCallback(r) || whenTransitionEnds(t, o, m, a)
        }
        ))
    }
    ;
    return extend$1(t, {
        onBeforeEnter(e) {
            callHook(v, [e]),
            addTransitionClass(e, i),
            addTransitionClass(e, a)
        },
        onBeforeAppear(e) {
            callHook(k, [e]),
            addTransitionClass(e, l),
            addTransitionClass(e, c)
        },
        onEnter: B(!1),
        onAppear: B(!0),
        onLeave(e, t) {
            e._isLeaving = !0;
            const n = () => C(e, t);
            addTransitionClass(e, d),
            e._enterCancelled ? (addTransitionClass(e, f),
            forceReflow()) : (forceReflow(),
            addTransitionClass(e, f)),
            nextFrame(( () => {
                e._isLeaving && (removeTransitionClass(e, d),
                addTransitionClass(e, p),
                hasExplicitCallback(y) || whenTransitionEnds(e, o, _, n))
            }
            )),
            callHook(y, [e, n])
        },
        onEnterCancelled(e) {
            S(e, !1, void 0, !0),
            callHook(x, [e])
        },
        onAppearCancelled(e) {
            S(e, !0, void 0, !0),
            callHook(E, [e])
        },
        onLeaveCancelled(e) {
            C(e),
            callHook(b, [e])
        }
    })
}
function normalizeDuration(e) {
    if (null == e)
        return null;
    if (isObject$1(e))
        return [NumberOf(e.enter), NumberOf(e.leave)];
    {
        const t = NumberOf(e);
        return [t, t]
    }
}
function NumberOf(e) {
    return toNumber(e)
}
function addTransitionClass(e, t) {
    t.split(/\s+/).forEach((t => t && e.classList.add(t))),
    (e[vtcKey] || (e[vtcKey] = new Set)).add(t)
}
function removeTransitionClass(e, t) {
    t.split(/\s+/).forEach((t => t && e.classList.remove(t)));
    const n = e[vtcKey];
    n && (n.delete(t),
    n.size || (e[vtcKey] = void 0))
}
function nextFrame(e) {
    requestAnimationFrame(( () => {
        requestAnimationFrame(e)
    }
    ))
}
let endId = 0;
function whenTransitionEnds(e, t, n, o) {
    const r = e._endId = ++endId
      , i = () => {
        r === e._endId && o()
    }
    ;
    if (null != n)
        return setTimeout(i, n);
    const {type: a, timeout: s, propCount: l} = getTransitionInfo(e, t);
    if (!a)
        return o();
    const c = a + "end";
    let u = 0;
    const d = () => {
        e.removeEventListener(c, f),
        i()
    }
      , f = t => {
        t.target === e && ++u >= l && d()
    }
    ;
    setTimeout(( () => {
        u < l && d()
    }
    ), s + 1),
    e.addEventListener(c, f)
}
function getTransitionInfo(e, t) {
    const n = window.getComputedStyle(e)
      , o = e => (n[e] || "").split(", ")
      , r = o("".concat(TRANSITION, "Delay"))
      , i = o("".concat(TRANSITION, "Duration"))
      , a = getTimeout(r, i)
      , s = o("".concat(ANIMATION, "Delay"))
      , l = o("".concat(ANIMATION, "Duration"))
      , c = getTimeout(s, l);
    let u = null
      , d = 0
      , f = 0;
    t === TRANSITION ? a > 0 && (u = TRANSITION,
    d = a,
    f = i.length) : t === ANIMATION ? c > 0 && (u = ANIMATION,
    d = c,
    f = l.length) : (d = Math.max(a, c),
    u = d > 0 ? a > c ? TRANSITION : ANIMATION : null,
    f = u ? u === TRANSITION ? i.length : l.length : 0);
    return {
        type: u,
        timeout: d,
        propCount: f,
        hasTransform: u === TRANSITION && /\b(transform|all)(,|$)/.test(o("".concat(TRANSITION, "Property")).toString())
    }
}
function getTimeout(e, t) {
    for (; e.length < t.length; )
        e = e.concat(e);
    return Math.max(...t.map(( (t, n) => toMs(t) + toMs(e[n]))))
}
function toMs(e) {
    return "auto" === e ? 0 : 1e3 * Number(e.slice(0, -1).replace(",", "."))
}
function forceReflow() {
    return document.body.offsetHeight
}
function patchClass(e, t, n) {
    const o = e[vtcKey];
    o && (t = (t ? [t, ...o] : [...o]).join(" ")),
    null == t ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t
}
const vShowOriginalDisplay = Symbol("_vod")
  , vShowHidden = Symbol("_vsh")
  , vShow = {
    beforeMount(e, {value: t}, {transition: n}) {
        e[vShowOriginalDisplay] = "none" === e.style.display ? "" : e.style.display,
        n && t ? n.beforeEnter(e) : setDisplay(e, t)
    },
    mounted(e, {value: t}, {transition: n}) {
        n && t && n.enter(e)
    },
    updated(e, {value: t, oldValue: n}, {transition: o}) {
        !t != !n && (o ? t ? (o.beforeEnter(e),
        setDisplay(e, !0),
        o.enter(e)) : o.leave(e, ( () => {
            setDisplay(e, !1)
        }
        )) : setDisplay(e, t))
    },
    beforeUnmount(e, {value: t}) {
        setDisplay(e, t)
    }
};
function setDisplay(e, t) {
    e.style.display = t ? e[vShowOriginalDisplay] : "none",
    e[vShowHidden] = !t
}
const CSS_VAR_TEXT = Symbol("")
  , displayRE = /(^|;)\s*display\s*:/;
function patchStyle(e, t, n) {
    const o = e.style
      , r = isString$1(n);
    let i = !1;
    if (n && !r) {
        if (t)
            if (isString$1(t))
                for (const e of t.split(";")) {
                    const t = e.slice(0, e.indexOf(":")).trim();
                    null == n[t] && setStyle(o, t, "")
                }
            else
                for (const e in t)
                    null == n[e] && setStyle(o, e, "");
        for (const e in n)
            "display" === e && (i = !0),
            setStyle(o, e, n[e])
    } else if (r) {
        if (t !== n) {
            const e = o[CSS_VAR_TEXT];
            e && (n += ";" + e),
            o.cssText = n,
            i = displayRE.test(n)
        }
    } else
        t && e.removeAttribute("style");
    vShowOriginalDisplay in e && (e[vShowOriginalDisplay] = i ? o.display : "",
    e[vShowHidden] && (o.display = "none"))
}
const importantRE = /\s*!important$/;
function setStyle(e, t, n) {
    if (isArray$1(n))
        n.forEach((n => setStyle(e, t, n)));
    else if (null == n && (n = ""),
    t.startsWith("--"))
        e.setProperty(t, n);
    else {
        const o = autoPrefix(e, t);
        importantRE.test(n) ? e.setProperty(hyphenate(o), n.replace(importantRE, ""), "important") : e[o] = n
    }
}
const prefixes = ["Webkit", "Moz", "ms"]
  , prefixCache = {};
function autoPrefix(e, t) {
    const n = prefixCache[t];
    if (n)
        return n;
    let o = camelize(t);
    if ("filter" !== o && o in e)
        return prefixCache[t] = o;
    o = capitalize(o);
    for (let r = 0; r < prefixes.length; r++) {
        const n = prefixes[r] + o;
        if (n in e)
            return prefixCache[t] = n
    }
    return t
}
const xlinkNS = "http://www.w3.org/1999/xlink";
function patchAttr(e, t, n, o, r, i=isSpecialBooleanAttr(t)) {
    o && t.startsWith("xlink:") ? null == n ? e.removeAttributeNS(xlinkNS, t.slice(6, t.length)) : e.setAttributeNS(xlinkNS, t, n) : null == n || i && !includeBooleanAttr(n) ? e.removeAttribute(t) : e.setAttribute(t, i ? "" : isSymbol(n) ? String(n) : n)
}
function patchDOMProp(t, n, o, r, i) {
    if ("innerHTML" === n || "textContent" === n)
        return void (null != o && (t[n] = "innerHTML" === n ? unsafeToTrustedHTML(o) : o));
    const a = t.tagName;
    if ("value" === n && "PROGRESS" !== a && !a.includes("-")) {
        const e = "OPTION" === a ? t.getAttribute("value") || "" : t.value
          , r = null == o ? "checkbox" === t.type ? "on" : "" : String(o);
        return e === r && "_value"in t || (t.value = r),
        null == o && t.removeAttribute(n),
        void (t._value = o)
    }
    let s = !1;
    if ("" === o || null == o) {
        const e = typeof t[n];
        "boolean" === e ? o = includeBooleanAttr(o) : null == o && "string" === e ? (o = "",
        s = !0) : "number" === e && (o = 0,
        s = !0)
    }
    try {
        t[n] = o
    } catch (e) {}
    s && t.removeAttribute(i || n)
}
function addEventListener(e, t, n, o) {
    e.addEventListener(t, n, o)
}
function removeEventListener(e, t, n, o) {
    e.removeEventListener(t, n, o)
}
const veiKey = Symbol("_vei");
function patchEvent(e, t, n, o, r=null) {
    const i = e[veiKey] || (e[veiKey] = {})
      , a = i[t];
    if (o && a)
        a.value = o;
    else {
        const [n,s] = parseName(t);
        if (o) {
            addEventListener(e, n, i[t] = createInvoker(o, r), s)
        } else
            a && (removeEventListener(e, n, a, s),
            i[t] = void 0)
    }
}
const optionsModifierRE = /(?:Once|Passive|Capture)$/;
function parseName(e) {
    let t;
    if (optionsModifierRE.test(e)) {
        let n;
        for (t = {}; n = e.match(optionsModifierRE); )
            e = e.slice(0, e.length - n[0].length),
            t[n[0].toLowerCase()] = !0
    }
    return [":" === e[2] ? e.slice(3) : hyphenate(e.slice(2)), t]
}
let cachedNow = 0;
const p = Promise.resolve()
  , getNow = () => cachedNow || (p.then(( () => cachedNow = 0)),
cachedNow = Date.now());
function createInvoker(e, t) {
    const n = e => {
        if (e._vts) {
            if (e._vts <= n.attached)
                return
        } else
            e._vts = Date.now();
        callWithAsyncErrorHandling(patchStopImmediatePropagation(e, n.value), t, 5, [e])
    }
    ;
    return n.value = e,
    n.attached = getNow(),
    n
}
function patchStopImmediatePropagation(e, t) {
    if (isArray$1(t)) {
        const n = e.stopImmediatePropagation;
        return e.stopImmediatePropagation = () => {
            n.call(e),
            e._stopped = !0
        }
        ,
        t.map((e => t => !t._stopped && e && e(t)))
    }
    return t
}
const isNativeOn = e => 111 === e.charCodeAt(0) && 110 === e.charCodeAt(1) && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123
  , patchProp = (e, t, n, o, r, i) => {
    const a = "svg" === r;
    "class" === t ? patchClass(e, o, a) : "style" === t ? patchStyle(e, n, o) : isOn(t) ? isModelListener(t) || patchEvent(e, t, n, o, i) : ("." === t[0] ? (t = t.slice(1),
    1) : "^" === t[0] ? (t = t.slice(1),
    0) : shouldSetAsProp(e, t, o, a)) ? (patchDOMProp(e, t, o),
    e.tagName.includes("-") || "value" !== t && "checked" !== t && "selected" !== t || patchAttr(e, t, o, a, i, "value" !== t)) : !e._isVueCE || !/[A-Z]/.test(t) && isString$1(o) ? ("true-value" === t ? e._trueValue = o : "false-value" === t && (e._falseValue = o),
    patchAttr(e, t, o, a)) : patchDOMProp(e, camelize(t), o, i, t)
}
;
function shouldSetAsProp(e, t, n, o) {
    if (o)
        return "innerHTML" === t || "textContent" === t || !!(t in e && isNativeOn(t) && isFunction$1(n));
    if ("spellcheck" === t || "draggable" === t || "translate" === t)
        return !1;
    if ("form" === t)
        return !1;
    if ("list" === t && "INPUT" === e.tagName)
        return !1;
    if ("type" === t && "TEXTAREA" === e.tagName)
        return !1;
    if ("width" === t || "height" === t) {
        const t = e.tagName;
        if ("IMG" === t || "VIDEO" === t || "CANVAS" === t || "SOURCE" === t)
            return !1
    }
    return (!isNativeOn(t) || !isString$1(n)) && t in e
}
const getModelAssigner = e => {
    const t = e.props["onUpdate:modelValue"] || !1;
    return isArray$1(t) ? e => invokeArrayFns(t, e) : t
}
;
function onCompositionStart(e) {
    e.target.composing = !0
}
function onCompositionEnd(e) {
    const t = e.target;
    t.composing && (t.composing = !1,
    t.dispatchEvent(new Event("input")))
}
const assignKey = Symbol("_assign")
  , vModelText = {
    created(e, {modifiers: {lazy: t, trim: n, number: o}}, r) {
        e[assignKey] = getModelAssigner(r);
        const i = o || r.props && "number" === r.props.type;
        addEventListener(e, t ? "change" : "input", (t => {
            if (t.target.composing)
                return;
            let o = e.value;
            n && (o = o.trim()),
            i && (o = looseToNumber(o)),
            e[assignKey](o)
        }
        )),
        n && addEventListener(e, "change", ( () => {
            e.value = e.value.trim()
        }
        )),
        t || (addEventListener(e, "compositionstart", onCompositionStart),
        addEventListener(e, "compositionend", onCompositionEnd),
        addEventListener(e, "change", onCompositionEnd))
    },
    mounted(e, {value: t}) {
        e.value = null == t ? "" : t
    },
    beforeUpdate(e, {value: t, oldValue: n, modifiers: {lazy: o, trim: r, number: i}}, a) {
        if (e[assignKey] = getModelAssigner(a),
        e.composing)
            return;
        const s = null == t ? "" : t;
        if ((!i && "number" !== e.type || /^0\d/.test(e.value) ? e.value : looseToNumber(e.value)) !== s) {
            if (document.activeElement === e && "range" !== e.type) {
                if (o && t === n)
                    return;
                if (r && e.value.trim() === s)
                    return
            }
            e.value = s
        }
    }
}
  , systemModifiers = ["ctrl", "shift", "alt", "meta"]
  , modifierGuards = {
    stop: e => e.stopPropagation(),
    prevent: e => e.preventDefault(),
    self: e => e.target !== e.currentTarget,
    ctrl: e => !e.ctrlKey,
    shift: e => !e.shiftKey,
    alt: e => !e.altKey,
    meta: e => !e.metaKey,
    left: e => "button"in e && 0 !== e.button,
    middle: e => "button"in e && 1 !== e.button,
    right: e => "button"in e && 2 !== e.button,
    exact: (e, t) => systemModifiers.some((n => e["".concat(n, "Key")] && !t.includes(n)))
}
  , withModifiers = (e, t) => {
    const n = e._withMods || (e._withMods = {})
      , o = t.join(".");
    return n[o] || (n[o] = (n, ...o) => {
        for (let e = 0; e < t.length; e++) {
            const o = modifierGuards[t[e]];
            if (o && o(n, t))
                return
        }
        return e(n, ...o)
    }
    )
}
  , rendererOptions = extend$1({
    patchProp: patchProp
}, nodeOps);
let renderer, enabledHydration = !1;
function ensureRenderer() {
    return renderer || (renderer = createRenderer(rendererOptions))
}
function ensureHydrationRenderer() {
    return renderer = enabledHydration ? renderer : createHydrationRenderer(rendererOptions),
    enabledHydration = !0,
    renderer
}
const render = (...e) => {
    ensureRenderer().render(...e)
}
  , createApp = (...e) => {
    const t = ensureRenderer().createApp(...e)
      , {mount: n} = t;
    return t.mount = e => {
        const o = normalizeContainer(e);
        if (!o)
            return;
        const r = t._component;
        isFunction$1(r) || r.render || r.template || (r.template = o.innerHTML),
        1 === o.nodeType && (o.textContent = "");
        const i = n(o, !1, resolveRootNamespace(o));
        return o instanceof Element && (o.removeAttribute("v-cloak"),
        o.setAttribute("data-v-app", "")),
        i
    }
    ,
    t
}
  , createSSRApp = (...e) => {
    const t = ensureHydrationRenderer().createApp(...e)
      , {mount: n} = t;
    return t.mount = e => {
        const t = normalizeContainer(e);
        if (t)
            return n(t, !0, resolveRootNamespace(t))
    }
    ,
    t
}
;
function resolveRootNamespace(e) {
    return e instanceof SVGElement ? "svg" : "function" == typeof MathMLElement && e instanceof MathMLElement ? "mathml" : void 0
}
function normalizeContainer(e) {
    if (isString$1(e)) {
        return document.querySelector(e)
    }
    return e
}
var axios$3 = {
    exports: {}
}, bind$2 = function(e, t) {
    return function() {
        for (var n = new Array(arguments.length), o = 0; o < n.length; o++)
            n[o] = arguments[o];
        return e.apply(t, n)
    }
}, bind$1 = bind$2, toString = Object.prototype.toString, kindOf = (cache = Object.create(null),
function(e) {
    var t = toString.call(e);
    return cache[t] || (cache[t] = t.slice(8, -1).toLowerCase())
}
), cache;
function kindOfTest(e) {
    return e = e.toLowerCase(),
    function(t) {
        return kindOf(t) === e
    }
}
function isArray(e) {
    return Array.isArray(e)
}
function isUndefined(e) {
    return void 0 === e
}
function isBuffer(e) {
    return null !== e && !isUndefined(e) && null !== e.constructor && !isUndefined(e.constructor) && "function" == typeof e.constructor.isBuffer && e.constructor.isBuffer(e)
}
var isArrayBuffer = kindOfTest("ArrayBuffer");
function isArrayBufferView(e) {
    return "undefined" != typeof ArrayBuffer && ArrayBuffer.isView ? ArrayBuffer.isView(e) : e && e.buffer && isArrayBuffer(e.buffer)
}
function isString(e) {
    return "string" == typeof e
}
function isNumber(e) {
    return "number" == typeof e
}
function isObject(e) {
    return null !== e && "object" == typeof e
}
function isPlainObject(e) {
    if ("object" !== kindOf(e))
        return !1;
    var t = Object.getPrototypeOf(e);
    return null === t || t === Object.prototype
}
var isDate = kindOfTest("Date")
  , isFile = kindOfTest("File")
  , isBlob$1 = kindOfTest("Blob")
  , isFileList = kindOfTest("FileList");
function isFunction(e) {
    return "[object Function]" === toString.call(e)
}
function isStream(e) {
    return isObject(e) && isFunction(e.pipe)
}
function isFormData(e) {
    var t = "[object FormData]";
    return e && ("function" == typeof FormData && e instanceof FormData || toString.call(e) === t || isFunction(e.toString) && e.toString() === t)
}
var isURLSearchParams = kindOfTest("URLSearchParams");
function trim(e) {
    return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "")
}
function isStandardBrowserEnv() {
    return ("undefined" == typeof navigator || "ReactNative" !== navigator.product && "NativeScript" !== navigator.product && "NS" !== navigator.product) && ("undefined" != typeof window && "undefined" != typeof document)
}
function forEach(e, t) {
    if (null != e)
        if ("object" != typeof e && (e = [e]),
        isArray(e))
            for (var n = 0, o = e.length; n < o; n++)
                t.call(null, e[n], n, e);
        else
            for (var r in e)
                Object.prototype.hasOwnProperty.call(e, r) && t.call(null, e[r], r, e)
}
function merge() {
    var e = {};
    function t(t, n) {
        isPlainObject(e[n]) && isPlainObject(t) ? e[n] = merge(e[n], t) : isPlainObject(t) ? e[n] = merge({}, t) : isArray(t) ? e[n] = t.slice() : e[n] = t
    }
    for (var n = 0, o = arguments.length; n < o; n++)
        forEach(arguments[n], t);
    return e
}
function extend(e, t, n) {
    return forEach(t, (function(t, o) {
        e[o] = n && "function" == typeof t ? bind$1(t, n) : t
    }
    )),
    e
}
function stripBOM(e) {
    return 65279 === e.charCodeAt(0) && (e = e.slice(1)),
    e
}
function inherits(e, t, n, o) {
    e.prototype = Object.create(t.prototype, o),
    e.prototype.constructor = e,
    n && Object.assign(e.prototype, n)
}
function toFlatObject(e, t, n) {
    var o, r, i, a = {};
    t = t || {};
    do {
        for (r = (o = Object.getOwnPropertyNames(e)).length; r-- > 0; )
            a[i = o[r]] || (t[i] = e[i],
            a[i] = !0);
        e = Object.getPrototypeOf(e)
    } while (e && (!n || n(e, t)) && e !== Object.prototype);
    return t
}
function endsWith(e, t, n) {
    e = String(e),
    (void 0 === n || n > e.length) && (n = e.length),
    n -= t.length;
    var o = e.indexOf(t, n);
    return -1 !== o && o === n
}
function toArray(e) {
    if (!e)
        return null;
    var t = e.length;
    if (isUndefined(t))
        return null;
    for (var n = new Array(t); t-- > 0; )
        n[t] = e[t];
    return n
}
var isTypedArray = (TypedArray = "undefined" != typeof Uint8Array && Object.getPrototypeOf(Uint8Array),
function(e) {
    return TypedArray && e instanceof TypedArray
}
), TypedArray, utils$b = {
    isArray: isArray,
    isArrayBuffer: isArrayBuffer,
    isBuffer: isBuffer,
    isFormData: isFormData,
    isArrayBufferView: isArrayBufferView,
    isString: isString,
    isNumber: isNumber,
    isObject: isObject,
    isPlainObject: isPlainObject,
    isUndefined: isUndefined,
    isDate: isDate,
    isFile: isFile,
    isBlob: isBlob$1,
    isFunction: isFunction,
    isStream: isStream,
    isURLSearchParams: isURLSearchParams,
    isStandardBrowserEnv: isStandardBrowserEnv,
    forEach: forEach,
    merge: merge,
    extend: extend,
    trim: trim,
    stripBOM: stripBOM,
    inherits: inherits,
    toFlatObject: toFlatObject,
    kindOf: kindOf,
    kindOfTest: kindOfTest,
    endsWith: endsWith,
    toArray: toArray,
    isTypedArray: isTypedArray,
    isFileList: isFileList
}, utils$a = utils$b;
function encode(e) {
    return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]")
}
var buildURL$1 = function(e, t, n) {
    if (!t)
        return e;
    var o;
    if (n)
        o = n(t);
    else if (utils$a.isURLSearchParams(t))
        o = t.toString();
    else {
        var r = [];
        utils$a.forEach(t, (function(e, t) {
            null != e && (utils$a.isArray(e) ? t += "[]" : e = [e],
            utils$a.forEach(e, (function(e) {
                utils$a.isDate(e) ? e = e.toISOString() : utils$a.isObject(e) && (e = JSON.stringify(e)),
                r.push(encode(t) + "=" + encode(e))
            }
            )))
        }
        )),
        o = r.join("&")
    }
    if (o) {
        var i = e.indexOf("#");
        -1 !== i && (e = e.slice(0, i)),
        e += (-1 === e.indexOf("?") ? "?" : "&") + o
    }
    return e
}
  , utils$9 = utils$b;
function InterceptorManager$1() {
    this.handlers = []
}
InterceptorManager$1.prototype.use = function(e, t, n) {
    return this.handlers.push({
        fulfilled: e,
        rejected: t,
        synchronous: !!n && n.synchronous,
        runWhen: n ? n.runWhen : null
    }),
    this.handlers.length - 1
}
,
InterceptorManager$1.prototype.eject = function(e) {
    this.handlers[e] && (this.handlers[e] = null)
}
,
InterceptorManager$1.prototype.forEach = function(e) {
    utils$9.forEach(this.handlers, (function(t) {
        null !== t && e(t)
    }
    ))
}
;
var InterceptorManager_1 = InterceptorManager$1
  , utils$8 = utils$b
  , normalizeHeaderName$1 = function(e, t) {
    utils$8.forEach(e, (function(n, o) {
        o !== t && o.toUpperCase() === t.toUpperCase() && (e[t] = n,
        delete e[o])
    }
    ))
}
  , utils$7 = utils$b;
function AxiosError$2(e, t, n, o, r) {
    Error.call(this),
    this.message = e,
    this.name = "AxiosError",
    t && (this.code = t),
    n && (this.config = n),
    o && (this.request = o),
    r && (this.response = r)
}
utils$7.inherits(AxiosError$2, Error, {
    toJSON: function() {
        return {
            message: this.message,
            name: this.name,
            description: this.description,
            number: this.number,
            fileName: this.fileName,
            lineNumber: this.lineNumber,
            columnNumber: this.columnNumber,
            stack: this.stack,
            config: this.config,
            code: this.code,
            status: this.response && this.response.status ? this.response.status : null
        }
    }
});
var prototype = AxiosError$2.prototype
  , descriptors = {};
["ERR_BAD_OPTION_VALUE", "ERR_BAD_OPTION", "ECONNABORTED", "ETIMEDOUT", "ERR_NETWORK", "ERR_FR_TOO_MANY_REDIRECTS", "ERR_DEPRECATED", "ERR_BAD_RESPONSE", "ERR_BAD_REQUEST", "ERR_CANCELED"].forEach((function(e) {
    descriptors[e] = {
        value: e
    }
}
)),
Object.defineProperties(AxiosError$2, descriptors),
Object.defineProperty(prototype, "isAxiosError", {
    value: !0
}),
AxiosError$2.from = function(e, t, n, o, r, i) {
    var a = Object.create(prototype);
    return utils$7.toFlatObject(e, a, (function(e) {
        return e !== Error.prototype
    }
    )),
    AxiosError$2.call(a, e.message, t, n, o, r),
    a.name = e.name,
    i && Object.assign(a, i),
    a
}
;
var AxiosError_1 = AxiosError$2
  , transitional = {
    silentJSONParsing: !0,
    forcedJSONParsing: !0,
    clarifyTimeoutError: !1
}
  , utils$6 = utils$b;
function toFormData$1(e, t) {
    t = t || new FormData;
    var n = [];
    function o(e) {
        return null === e ? "" : utils$6.isDate(e) ? e.toISOString() : utils$6.isArrayBuffer(e) || utils$6.isTypedArray(e) ? "function" == typeof Blob ? new Blob([e]) : Buffer.from(e) : e
    }
    return function e(r, i) {
        if (utils$6.isPlainObject(r) || utils$6.isArray(r)) {
            if (-1 !== n.indexOf(r))
                throw Error("Circular reference detected in " + i);
            n.push(r),
            utils$6.forEach(r, (function(n, r) {
                if (!utils$6.isUndefined(n)) {
                    var a, s = i ? i + "." + r : r;
                    if (n && !i && "object" == typeof n)
                        if (utils$6.endsWith(r, "{}"))
                            n = JSON.stringify(n);
                        else if (utils$6.endsWith(r, "[]") && (a = utils$6.toArray(n)))
                            return void a.forEach((function(e) {
                                !utils$6.isUndefined(e) && t.append(s, o(e))
                            }
                            ));
                    e(n, s)
                }
            }
            )),
            n.pop()
        } else
            t.append(i, o(r))
    }(e),
    t
}
var toFormData_1 = toFormData$1, settle, hasRequiredSettle, cookies, hasRequiredCookies;
function requireSettle() {
    if (hasRequiredSettle)
        return settle;
    hasRequiredSettle = 1;
    var e = AxiosError_1;
    return settle = function(t, n, o) {
        var r = o.config.validateStatus;
        o.status && r && !r(o.status) ? n(new e("Request failed with status code " + o.status,[e.ERR_BAD_REQUEST, e.ERR_BAD_RESPONSE][Math.floor(o.status / 100) - 4],o.config,o.request,o)) : t(o)
    }
}
function requireCookies() {
    if (hasRequiredCookies)
        return cookies;
    hasRequiredCookies = 1;
    var e = utils$b;
    return cookies = e.isStandardBrowserEnv() ? {
        write: function(t, n, o, r, i, a) {
            var s = [];
            s.push(t + "=" + encodeURIComponent(n)),
            e.isNumber(o) && s.push("expires=" + new Date(o).toGMTString()),
            e.isString(r) && s.push("path=" + r),
            e.isString(i) && s.push("domain=" + i),
            !0 === a && s.push("secure"),
            document.cookie = s.join("; ")
        },
        read: function(e) {
            var t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
            return t ? decodeURIComponent(t[3]) : null
        },
        remove: function(e) {
            this.write(e, "", Date.now() - 864e5)
        }
    } : {
        write: function() {},
        read: function() {
            return null
        },
        remove: function() {}
    }
}
var isAbsoluteURL$1 = function(e) {
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)
}, combineURLs$1 = function(e, t) {
    return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e
}, isAbsoluteURL = isAbsoluteURL$1, combineURLs = combineURLs$1, buildFullPath$1 = function(e, t) {
    return e && !isAbsoluteURL(t) ? combineURLs(e, t) : t
}, parseHeaders, hasRequiredParseHeaders, isURLSameOrigin, hasRequiredIsURLSameOrigin, CanceledError_1, hasRequiredCanceledError, parseProtocol, hasRequiredParseProtocol, xhr, hasRequiredXhr, _null, hasRequired_null;
function requireParseHeaders() {
    if (hasRequiredParseHeaders)
        return parseHeaders;
    hasRequiredParseHeaders = 1;
    var e = utils$b
      , t = ["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"];
    return parseHeaders = function(n) {
        var o, r, i, a = {};
        return n ? (e.forEach(n.split("\n"), (function(n) {
            if (i = n.indexOf(":"),
            o = e.trim(n.substr(0, i)).toLowerCase(),
            r = e.trim(n.substr(i + 1)),
            o) {
                if (a[o] && t.indexOf(o) >= 0)
                    return;
                a[o] = "set-cookie" === o ? (a[o] ? a[o] : []).concat([r]) : a[o] ? a[o] + ", " + r : r
            }
        }
        )),
        a) : a
    }
}
function requireIsURLSameOrigin() {
    if (hasRequiredIsURLSameOrigin)
        return isURLSameOrigin;
    hasRequiredIsURLSameOrigin = 1;
    var e = utils$b;
    return isURLSameOrigin = e.isStandardBrowserEnv() ? function() {
        var t, n = /(msie|trident)/i.test(navigator.userAgent), o = document.createElement("a");
        function r(e) {
            var t = e;
            return n && (o.setAttribute("href", t),
            t = o.href),
            o.setAttribute("href", t),
            {
                href: o.href,
                protocol: o.protocol ? o.protocol.replace(/:$/, "") : "",
                host: o.host,
                search: o.search ? o.search.replace(/^\?/, "") : "",
                hash: o.hash ? o.hash.replace(/^#/, "") : "",
                hostname: o.hostname,
                port: o.port,
                pathname: "/" === o.pathname.charAt(0) ? o.pathname : "/" + o.pathname
            }
        }
        return t = r(window.location.href),
        function(n) {
            var o = e.isString(n) ? r(n) : n;
            return o.protocol === t.protocol && o.host === t.host
        }
    }() : function() {
        return !0
    }
}
function requireCanceledError() {
    if (hasRequiredCanceledError)
        return CanceledError_1;
    hasRequiredCanceledError = 1;
    var e = AxiosError_1;
    function t(t) {
        e.call(this, null == t ? "canceled" : t, e.ERR_CANCELED),
        this.name = "CanceledError"
    }
    return utils$b.inherits(t, e, {
        __CANCEL__: !0
    }),
    CanceledError_1 = t
}
function requireParseProtocol() {
    return hasRequiredParseProtocol ? parseProtocol : (hasRequiredParseProtocol = 1,
    parseProtocol = function(e) {
        var t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
        return t && t[1] || ""
    }
    )
}
function requireXhr() {
    if (hasRequiredXhr)
        return xhr;
    hasRequiredXhr = 1;
    var e = utils$b
      , t = requireSettle()
      , n = requireCookies()
      , o = buildURL$1
      , r = buildFullPath$1
      , i = requireParseHeaders()
      , a = requireIsURLSameOrigin()
      , s = transitional
      , l = AxiosError_1
      , c = requireCanceledError()
      , u = requireParseProtocol();
    return xhr = function(d) {
        return new Promise((function(f, p) {
            var h, m = d.data, _ = d.headers, v = d.responseType;
            function g() {
                d.cancelToken && d.cancelToken.unsubscribe(h),
                d.signal && d.signal.removeEventListener("abort", h)
            }
            e.isFormData(m) && e.isStandardBrowserEnv() && delete _["Content-Type"];
            var x = new XMLHttpRequest;
            if (d.auth) {
                var y = d.auth.username || ""
                  , b = d.auth.password ? unescape(encodeURIComponent(d.auth.password)) : "";
                _.Authorization = "Basic " + btoa(y + ":" + b)
            }
            var k = r(d.baseURL, d.url);
            function w() {
                if (x) {
                    var e = "getAllResponseHeaders"in x ? i(x.getAllResponseHeaders()) : null
                      , n = {
                        data: v && "text" !== v && "json" !== v ? x.response : x.responseText,
                        status: x.status,
                        statusText: x.statusText,
                        headers: e,
                        config: d,
                        request: x
                    };
                    t((function(e) {
                        f(e),
                        g()
                    }
                    ), (function(e) {
                        p(e),
                        g()
                    }
                    ), n),
                    x = null
                }
            }
            if (x.open(d.method.toUpperCase(), o(k, d.params, d.paramsSerializer), !0),
            x.timeout = d.timeout,
            "onloadend"in x ? x.onloadend = w : x.onreadystatechange = function() {
                x && 4 === x.readyState && (0 !== x.status || x.responseURL && 0 === x.responseURL.indexOf("file:")) && setTimeout(w)
            }
            ,
            x.onabort = function() {
                x && (p(new l("Request aborted",l.ECONNABORTED,d,x)),
                x = null)
            }
            ,
            x.onerror = function() {
                p(new l("Network Error",l.ERR_NETWORK,d,x,x)),
                x = null
            }
            ,
            x.ontimeout = function() {
                var e = d.timeout ? "timeout of " + d.timeout + "ms exceeded" : "timeout exceeded"
                  , t = d.transitional || s;
                d.timeoutErrorMessage && (e = d.timeoutErrorMessage),
                p(new l(e,t.clarifyTimeoutError ? l.ETIMEDOUT : l.ECONNABORTED,d,x)),
                x = null
            }
            ,
            e.isStandardBrowserEnv()) {
                var E = (d.withCredentials || a(k)) && d.xsrfCookieName ? n.read(d.xsrfCookieName) : void 0;
                E && (_[d.xsrfHeaderName] = E)
            }
            "setRequestHeader"in x && e.forEach(_, (function(e, t) {
                void 0 === m && "content-type" === t.toLowerCase() ? delete _[t] : x.setRequestHeader(t, e)
            }
            )),
            e.isUndefined(d.withCredentials) || (x.withCredentials = !!d.withCredentials),
            v && "json" !== v && (x.responseType = d.responseType),
            "function" == typeof d.onDownloadProgress && x.addEventListener("progress", d.onDownloadProgress),
            "function" == typeof d.onUploadProgress && x.upload && x.upload.addEventListener("progress", d.onUploadProgress),
            (d.cancelToken || d.signal) && (h = function(e) {
                x && (p(!e || e && e.type ? new c : e),
                x.abort(),
                x = null)
            }
            ,
            d.cancelToken && d.cancelToken.subscribe(h),
            d.signal && (d.signal.aborted ? h() : d.signal.addEventListener("abort", h))),
            m || (m = null);
            var S = u(k);
            S && -1 === ["http", "https", "file"].indexOf(S) ? p(new l("Unsupported protocol " + S + ":",l.ERR_BAD_REQUEST,d)) : x.send(m)
        }
        ))
    }
}
function require_null() {
    return hasRequired_null ? _null : (hasRequired_null = 1,
    _null = null)
}
var utils$5 = utils$b
  , normalizeHeaderName = normalizeHeaderName$1
  , AxiosError$1 = AxiosError_1
  , transitionalDefaults = transitional
  , toFormData = toFormData_1
  , DEFAULT_CONTENT_TYPE = {
    "Content-Type": "application/x-www-form-urlencoded"
};
function setContentTypeIfUnset(e, t) {
    !utils$5.isUndefined(e) && utils$5.isUndefined(e["Content-Type"]) && (e["Content-Type"] = t)
}
function getDefaultAdapter() {
    var e;
    return ("undefined" != typeof XMLHttpRequest || "undefined" != typeof process && "[object process]" === Object.prototype.toString.call(process)) && (e = requireXhr()),
    e
}
function stringifySafely(t, n, o) {
    if (utils$5.isString(t))
        try {
            return (n || JSON.parse)(t),
            utils$5.trim(t)
        } catch (e) {
            if ("SyntaxError" !== e.name)
                throw e
        }
    return (o || JSON.stringify)(t)
}
var defaults$3 = {
    transitional: transitionalDefaults,
    adapter: getDefaultAdapter(),
    transformRequest: [function(e, t) {
        if (normalizeHeaderName(t, "Accept"),
        normalizeHeaderName(t, "Content-Type"),
        utils$5.isFormData(e) || utils$5.isArrayBuffer(e) || utils$5.isBuffer(e) || utils$5.isStream(e) || utils$5.isFile(e) || utils$5.isBlob(e))
            return e;
        if (utils$5.isArrayBufferView(e))
            return e.buffer;
        if (utils$5.isURLSearchParams(e))
            return setContentTypeIfUnset(t, "application/x-www-form-urlencoded;charset=utf-8"),
            e.toString();
        var n, o = utils$5.isObject(e), r = t && t["Content-Type"];
        if ((n = utils$5.isFileList(e)) || o && "multipart/form-data" === r) {
            var i = this.env && this.env.FormData;
            return toFormData(n ? {
                "files[]": e
            } : e, i && new i)
        }
        return o || "application/json" === r ? (setContentTypeIfUnset(t, "application/json"),
        stringifySafely(e)) : e
    }
    ],
    transformResponse: [function(t) {
        var n = this.transitional || defaults$3.transitional
          , o = n && n.silentJSONParsing
          , r = n && n.forcedJSONParsing
          , i = !o && "json" === this.responseType;
        if (i || r && utils$5.isString(t) && t.length)
            try {
                return JSON.parse(t)
            } catch (e) {
                if (i) {
                    if ("SyntaxError" === e.name)
                        throw AxiosError$1.from(e, AxiosError$1.ERR_BAD_RESPONSE, this, null, this.response);
                    throw e
                }
            }
        return t
    }
    ],
    timeout: 0,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    maxContentLength: -1,
    maxBodyLength: -1,
    env: {
        FormData: require_null()
    },
    validateStatus: function(e) {
        return e >= 200 && e < 300
    },
    headers: {
        common: {
            Accept: "application/json, text/plain, */*"
        }
    }
};
utils$5.forEach(["delete", "get", "head"], (function(e) {
    defaults$3.headers[e] = {}
}
)),
utils$5.forEach(["post", "put", "patch"], (function(e) {
    defaults$3.headers[e] = utils$5.merge(DEFAULT_CONTENT_TYPE)
}
));
var defaults_1 = defaults$3, utils$4 = utils$b, defaults$2 = defaults_1, transformData$1 = function(e, t, n) {
    var o = this || defaults$2;
    return utils$4.forEach(n, (function(n) {
        e = n.call(o, e, t)
    }
    )),
    e
}, isCancel$1, hasRequiredIsCancel;
function requireIsCancel() {
    return hasRequiredIsCancel ? isCancel$1 : (hasRequiredIsCancel = 1,
    isCancel$1 = function(e) {
        return !(!e || !e.__CANCEL__)
    }
    )
}
var utils$3 = utils$b
  , transformData = transformData$1
  , isCancel = requireIsCancel()
  , defaults$1 = defaults_1
  , CanceledError = requireCanceledError();
function throwIfCancellationRequested(e) {
    if (e.cancelToken && e.cancelToken.throwIfRequested(),
    e.signal && e.signal.aborted)
        throw new CanceledError
}
var dispatchRequest$1 = function(e) {
    return throwIfCancellationRequested(e),
    e.headers = e.headers || {},
    e.data = transformData.call(e, e.data, e.headers, e.transformRequest),
    e.headers = utils$3.merge(e.headers.common || {}, e.headers[e.method] || {}, e.headers),
    utils$3.forEach(["delete", "get", "head", "post", "put", "patch", "common"], (function(t) {
        delete e.headers[t]
    }
    )),
    (e.adapter || defaults$1.adapter)(e).then((function(t) {
        return throwIfCancellationRequested(e),
        t.data = transformData.call(e, t.data, t.headers, e.transformResponse),
        t
    }
    ), (function(t) {
        return isCancel(t) || (throwIfCancellationRequested(e),
        t && t.response && (t.response.data = transformData.call(e, t.response.data, t.response.headers, e.transformResponse))),
        Promise.reject(t)
    }
    ))
}, utils$2 = utils$b, mergeConfig$2 = function(e, t) {
    t = t || {};
    var n = {};
    function o(e, t) {
        return utils$2.isPlainObject(e) && utils$2.isPlainObject(t) ? utils$2.merge(e, t) : utils$2.isPlainObject(t) ? utils$2.merge({}, t) : utils$2.isArray(t) ? t.slice() : t
    }
    function r(n) {
        return utils$2.isUndefined(t[n]) ? utils$2.isUndefined(e[n]) ? void 0 : o(void 0, e[n]) : o(e[n], t[n])
    }
    function i(e) {
        if (!utils$2.isUndefined(t[e]))
            return o(void 0, t[e])
    }
    function a(n) {
        return utils$2.isUndefined(t[n]) ? utils$2.isUndefined(e[n]) ? void 0 : o(void 0, e[n]) : o(void 0, t[n])
    }
    function s(n) {
        return n in t ? o(e[n], t[n]) : n in e ? o(void 0, e[n]) : void 0
    }
    var l = {
        url: i,
        method: i,
        data: i,
        baseURL: a,
        transformRequest: a,
        transformResponse: a,
        paramsSerializer: a,
        timeout: a,
        timeoutMessage: a,
        withCredentials: a,
        adapter: a,
        responseType: a,
        xsrfCookieName: a,
        xsrfHeaderName: a,
        onUploadProgress: a,
        onDownloadProgress: a,
        decompress: a,
        maxContentLength: a,
        maxBodyLength: a,
        beforeRedirect: a,
        transport: a,
        httpAgent: a,
        httpsAgent: a,
        cancelToken: a,
        socketPath: a,
        responseEncoding: a,
        validateStatus: s
    };
    return utils$2.forEach(Object.keys(e).concat(Object.keys(t)), (function(e) {
        var t = l[e] || r
          , o = t(e);
        utils$2.isUndefined(o) && t !== s || (n[e] = o)
    }
    )),
    n
}, data, hasRequiredData;
function requireData() {
    return hasRequiredData ? data : (hasRequiredData = 1,
    data = {
        version: "0.27.2"
    })
}
var VERSION = requireData().version
  , AxiosError = AxiosError_1
  , validators$1 = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((function(e, t) {
    validators$1[e] = function(n) {
        return typeof n === e || "a" + (t < 1 ? "n " : " ") + e
    }
}
));
var deprecatedWarnings = {};
function assertOptions(e, t, n) {
    if ("object" != typeof e)
        throw new AxiosError("options must be an object",AxiosError.ERR_BAD_OPTION_VALUE);
    for (var o = Object.keys(e), r = o.length; r-- > 0; ) {
        var i = o[r]
          , a = t[i];
        if (a) {
            var s = e[i]
              , l = void 0 === s || a(s, i, e);
            if (!0 !== l)
                throw new AxiosError("option " + i + " must be " + l,AxiosError.ERR_BAD_OPTION_VALUE)
        } else if (!0 !== n)
            throw new AxiosError("Unknown option " + i,AxiosError.ERR_BAD_OPTION)
    }
}
validators$1.transitional = function(e, t, n) {
    return function(o, r, i) {
        if (!1 === e)
            throw new AxiosError(function(e, t) {
                return "[Axios v" + VERSION + "] Transitional option '" + e + "'" + t + (n ? ". " + n : "")
            }(r, " has been removed" + (t ? " in " + t : "")),AxiosError.ERR_DEPRECATED);
        return t && !deprecatedWarnings[r] && (deprecatedWarnings[r] = !0),
        !e || e(o, r, i)
    }
}
;
var validator$1 = {
    assertOptions: assertOptions,
    validators: validators$1
}
  , utils$1 = utils$b
  , buildURL = buildURL$1
  , InterceptorManager = InterceptorManager_1
  , dispatchRequest = dispatchRequest$1
  , mergeConfig$1 = mergeConfig$2
  , buildFullPath = buildFullPath$1
  , validator = validator$1
  , validators = validator.validators;
function Axios$1(e) {
    this.defaults = e,
    this.interceptors = {
        request: new InterceptorManager,
        response: new InterceptorManager
    }
}
Axios$1.prototype.request = function(e, t) {
    "string" == typeof e ? (t = t || {}).url = e : t = e || {},
    (t = mergeConfig$1(this.defaults, t)).method ? t.method = t.method.toLowerCase() : this.defaults.method ? t.method = this.defaults.method.toLowerCase() : t.method = "get";
    var n = t.transitional;
    void 0 !== n && validator.assertOptions(n, {
        silentJSONParsing: validators.transitional(validators.boolean),
        forcedJSONParsing: validators.transitional(validators.boolean),
        clarifyTimeoutError: validators.transitional(validators.boolean)
    }, !1);
    var o = []
      , r = !0;
    this.interceptors.request.forEach((function(e) {
        "function" == typeof e.runWhen && !1 === e.runWhen(t) || (r = r && e.synchronous,
        o.unshift(e.fulfilled, e.rejected))
    }
    ));
    var i, a = [];
    if (this.interceptors.response.forEach((function(e) {
        a.push(e.fulfilled, e.rejected)
    }
    )),
    !r) {
        var s = [dispatchRequest, void 0];
        for (Array.prototype.unshift.apply(s, o),
        s = s.concat(a),
        i = Promise.resolve(t); s.length; )
            i = i.then(s.shift(), s.shift());
        return i
    }
    for (var l = t; o.length; ) {
        var c = o.shift()
          , u = o.shift();
        try {
            l = c(l)
        } catch (d) {
            u(d);
            break
        }
    }
    try {
        i = dispatchRequest(l)
    } catch (d) {
        return Promise.reject(d)
    }
    for (; a.length; )
        i = i.then(a.shift(), a.shift());
    return i
}
,
Axios$1.prototype.getUri = function(e) {
    e = mergeConfig$1(this.defaults, e);
    var t = buildFullPath(e.baseURL, e.url);
    return buildURL(t, e.params, e.paramsSerializer)
}
,
utils$1.forEach(["delete", "get", "head", "options"], (function(e) {
    Axios$1.prototype[e] = function(t, n) {
        return this.request(mergeConfig$1(n || {}, {
            method: e,
            url: t,
            data: (n || {}).data
        }))
    }
}
)),
utils$1.forEach(["post", "put", "patch"], (function(e) {
    function t(t) {
        return function(n, o, r) {
            return this.request(mergeConfig$1(r || {}, {
                method: e,
                headers: t ? {
                    "Content-Type": "multipart/form-data"
                } : {},
                url: n,
                data: o
            }))
        }
    }
    Axios$1.prototype[e] = t(),
    Axios$1.prototype[e + "Form"] = t(!0)
}
));
var Axios_1 = Axios$1, CancelToken_1, hasRequiredCancelToken, spread, hasRequiredSpread, isAxiosError, hasRequiredIsAxiosError;
function requireCancelToken() {
    if (hasRequiredCancelToken)
        return CancelToken_1;
    hasRequiredCancelToken = 1;
    var e = requireCanceledError();
    function t(t) {
        if ("function" != typeof t)
            throw new TypeError("executor must be a function.");
        var n;
        this.promise = new Promise((function(e) {
            n = e
        }
        ));
        var o = this;
        this.promise.then((function(e) {
            if (o._listeners) {
                var t, n = o._listeners.length;
                for (t = 0; t < n; t++)
                    o._listeners[t](e);
                o._listeners = null
            }
        }
        )),
        this.promise.then = function(e) {
            var t, n = new Promise((function(e) {
                o.subscribe(e),
                t = e
            }
            )).then(e);
            return n.cancel = function() {
                o.unsubscribe(t)
            }
            ,
            n
        }
        ,
        t((function(t) {
            o.reason || (o.reason = new e(t),
            n(o.reason))
        }
        ))
    }
    return t.prototype.throwIfRequested = function() {
        if (this.reason)
            throw this.reason
    }
    ,
    t.prototype.subscribe = function(e) {
        this.reason ? e(this.reason) : this._listeners ? this._listeners.push(e) : this._listeners = [e]
    }
    ,
    t.prototype.unsubscribe = function(e) {
        if (this._listeners) {
            var t = this._listeners.indexOf(e);
            -1 !== t && this._listeners.splice(t, 1)
        }
    }
    ,
    t.source = function() {
        var e;
        return {
            token: new t((function(t) {
                e = t
            }
            )),
            cancel: e
        }
    }
    ,
    CancelToken_1 = t
}
function requireSpread() {
    return hasRequiredSpread ? spread : (hasRequiredSpread = 1,
    spread = function(e) {
        return function(t) {
            return e.apply(null, t)
        }
    }
    )
}
function requireIsAxiosError() {
    if (hasRequiredIsAxiosError)
        return isAxiosError;
    hasRequiredIsAxiosError = 1;
    var e = utils$b;
    return isAxiosError = function(t) {
        return e.isObject(t) && !0 === t.isAxiosError
    }
}
var utils = utils$b
  , bind = bind$2
  , Axios = Axios_1
  , mergeConfig = mergeConfig$2
  , defaults = defaults_1;
function createInstance(e) {
    var t = new Axios(e)
      , n = bind(Axios.prototype.request, t);
    return utils.extend(n, Axios.prototype, t),
    utils.extend(n, t),
    n.create = function(t) {
        return createInstance(mergeConfig(e, t))
    }
    ,
    n
}
var axios$2 = createInstance(defaults);
axios$2.Axios = Axios,
axios$2.CanceledError = requireCanceledError(),
axios$2.CancelToken = requireCancelToken(),
axios$2.isCancel = requireIsCancel(),
axios$2.VERSION = requireData().version,
axios$2.toFormData = toFormData_1,
axios$2.AxiosError = AxiosError_1,
axios$2.Cancel = axios$2.CanceledError,
axios$2.all = function(e) {
    return Promise.all(e)
}
,
axios$2.spread = requireSpread(),
axios$2.isAxiosError = requireIsAxiosError(),
axios$3.exports = axios$2,
axios$3.exports.default = axios$2;
var axiosExports = axios$3.exports
  , axios = axiosExports;
const axios$1 = getDefaultExportFromCjs(axios);
function _defineProperty$1(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n,
    e
}
function _objectSpread$1(e) {
    for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {}
          , o = Object.keys(n);
        "function" == typeof Object.getOwnPropertySymbols && (o = o.concat(Object.getOwnPropertySymbols(n).filter((function(e) {
            return Object.getOwnPropertyDescriptor(n, e).enumerable
        }
        )))),
        o.forEach((function(t) {
            _defineProperty$1(e, t, n[t])
        }
        ))
    }
    return e
}
var commonMessage = {
    unit: "幣",
    l_unit: "幣",
    total_words: "{0}字",
    recommend: "推薦",
    login: "登錄",
    writer: "作家專區",
    recharge: "充值",
    logout: "退出",
    download_for_free: "下載免費讀",
    menu: "菜單",
    home: "首頁",
    chapter_list: "目錄",
    book_detail: "書詳情",
    in_shelf: "在書架",
    add_to_shelf: "加書架",
    vote: "投票",
    light: "日間",
    dark: "夜間",
    settings: "設置",
    mobile: "手機",
    report: "舉報",
    bookstore: "書城",
    m_menu_vote_or_reward: "投票打賞",
    write_comment: "寫章評",
    audio_book: "聽書",
    more: "更多",
    actu_pay: "實付",
    balance: "餘額",
    comma_still_needed: "，還需",
    subscribe: "訂閱",
    total_chaps: "共{0}章",
    chaps_serialized: "連載中",
    chaps_finished: "已完結",
    ascending: "正序",
    descending: "倒序",
    main_volume: "正文卷",
    main_vip_volume: "正文卷·VIP",
    free: "免費",
    close: "關閉",
    guide: "指南",
    app_guide_title_pre: "使用",
    app_guide_title_suff: "客戶端",
    auto_subs: "自動訂閱下一章",
    auto_subs_enable_desc: "當前已開啓，開啓後，您在閱讀當前作品過程中，系統將爲您自動訂閱下一章",
    auto_subs_disable_desc: "開啓後，您在閱讀當前作品過程中，系統將爲您自動訂閱下一章",
    download_app: "下載{0}App",
    prev_chap: "上一章",
    next_chap: "下一章",
    m_menu_in_shelf: "已在書架",
    m_menu_add_to_shelf: "加入書架",
    end_page: "書末頁",
    loading: "加載中...",
    author_say: "{0} · 作家說",
    support_author: "上{0}支持我，看最新更新",
    author_say_download: "下載App",
    already_finished: "已完結",
    to_be_continue: "未完待續...",
    people_also_read: "看過此書的人還看過",
    update_recommends: "換一批",
    back_to_shelf: "返回書架",
    font_size: "字體大小",
    read_theme: "閱讀主題",
    recharge_title: "餘額不足，請充值",
    recharge_cancel: "取消",
    recharge_confirm: "充值",
    recharge_desc_pre: "本次訂閱將消耗",
    recharge_desc_suff: "，當前餘額{0}，請去充值",
    load_chap_failed: "章節加載失敗",
    load_font_failed: "字體加載失敗，請檢查網絡",
    empty_chap: "解析內容爲空",
    loading_chap: "正在加載章節",
    add_to_shelf_succeed: "成功加入書架",
    add_to_shelf_failed: "加入書架失敗",
    auto_subs_enable_succeed: "已開啓自動訂閱",
    auto_subs_disable_succeed: "已關閉自動訂閱",
    auto_subs_switch_failed: "自動訂閱切換失敗",
    check_level_8_title: "作品已下架/章節未解鎖",
    check_level_8_desc: "通過目錄頁查看可閱讀章節",
    removed: "已下架",
    content_font: "正文字體",
    page_mode: "翻頁模式",
    chapter_pages: "章節翻頁",
    scroll_pages: "滾動翻頁",
    page_width: "頁面寬度",
    auto: "自動",
    load_failed: "加載失敗",
    network_error: "網絡錯誤，請稍候重試",
    retry_load_next: "加載失敗，點擊重試",
    to_vip_chapter: "前往VIP章節",
    free_for_new: "新人免費讀",
    first_download_gift_discount: "首次下載贈訂閱優惠",
    _trans: {
        originData: "万与丑专业丛东丝丢两严丧个丬丰临为丽举么义乌乐乔习乡书买乱争于亏云亘亚产亩亲亵亸亿仅从仑仓仪们价众优伙会伛伞伟传伤伥伦伧伪伫体余佣佥侠侣侥侦侧侨侩侪侬俣俦俨俩俪俭债倾偬偻偾偿傥傧储傩儿兑兖党兰关兴兹养兽冁内冈册写军农冢冯冲决况冻净凄凉凌减凑凛几凤凫凭凯击凼凿刍划刘则刚创删别刬刭刽刿剀剂剐剑剥剧劝办务劢动励劲劳势勋勐勚匀匦匮区医华协单卖卢卤卧卫却卺厂厅历厉压厌厍厕厢厣厦厨厩厮县参叆叇双发变叙叠叶号叹叽吁后吓吕吗吣吨听启吴呒呓呕呖呗员呙呛呜咏咔咙咛咝咤咴咸哌响哑哒哓哔哕哗哙哜哝哟唛唝唠唡唢唣唤唿啧啬啭啮啰啴啸喷喽喾嗫呵嗳嘘嘤嘱噜噼嚣嚯团园囱围囵国图圆圣圹场坂坏块坚坛坜坝坞坟坠垄垅垆垒垦垧垩垫垭垯垱垲垴埘埙埚埝埯堑堕塆墙壮声壳壶壸处备复够头夸夹夺奁奂奋奖奥妆妇妈妩妪妫姗姜娄娅娆娇娈娱娲娴婳婴婵婶媪嫒嫔嫱嬷孙学孪宁宝实宠审宪宫宽宾寝对寻导寿将尔尘尧尴尸尽层屃屉届属屡屦屿岁岂岖岗岘岙岚岛岭岳岽岿峃峄峡峣峤峥峦崂崃崄崭嵘嵚嵛嵝嵴巅巩巯币帅师帏帐帘帜带帧帮帱帻帼幂幞干并广庄庆庐庑库应庙庞废庼廪开异弃张弥弪弯弹强归当录彟彦彻径徕御忆忏忧忾怀态怂怃怄怅怆怜总怼怿恋恳恶恸恹恺恻恼恽悦悫悬悭悯惊惧惨惩惫惬惭惮惯愍愠愤愦愿慑慭憷懑懒懔戆戋戏戗战戬户扎扑扦执扩扪扫扬扰抚抛抟抠抡抢护报担拟拢拣拥拦拧拨择挂挚挛挜挝挞挟挠挡挢挣挤挥挦捞损捡换捣据捻掳掴掷掸掺掼揸揽揿搀搁搂搅携摄摅摆摇摈摊撄撑撵撷撸撺擞攒敌敛数斋斓斗斩断无旧时旷旸昙昼昽显晋晒晓晔晕晖暂暧札术朴机杀杂权条来杨杩杰极构枞枢枣枥枧枨枪枫枭柜柠柽栀栅标栈栉栊栋栌栎栏树栖样栾桊桠桡桢档桤桥桦桧桨桩梦梼梾检棂椁椟椠椤椭楼榄榇榈榉槚槛槟槠横樯樱橥橱橹橼檐檩欢欤欧歼殁殇残殒殓殚殡殴毁毂毕毙毡毵氇气氢氩氲汇汉污汤汹沓沟没沣沤沥沦沧沨沩沪沵泞泪泶泷泸泺泻泼泽泾洁洒洼浃浅浆浇浈浉浊测浍济浏浐浑浒浓浔浕涂涌涛涝涞涟涠涡涢涣涤润涧涨涩淀渊渌渍渎渐渑渔渖渗温游湾湿溃溅溆溇滗滚滞滟滠满滢滤滥滦滨滩滪漤潆潇潋潍潜潴澜濑濒灏灭灯灵灾灿炀炉炖炜炝点炼炽烁烂烃烛烟烦烧烨烩烫烬热焕焖焘煅煳熘爱爷牍牦牵牺犊犟状犷犸犹狈狍狝狞独狭狮狯狰狱狲猃猎猕猡猪猫猬献獭玑玙玚玛玮环现玱玺珉珏珐珑珰珲琎琏琐琼瑶瑷璇璎瓒瓮瓯电画畅畲畴疖疗疟疠疡疬疮疯疱疴痈痉痒痖痨痪痫痴瘅瘆瘗瘘瘪瘫瘾瘿癞癣癫癯皑皱皲盏盐监盖盗盘眍眦眬着睁睐睑瞒瞩矫矶矾矿砀码砖砗砚砜砺砻砾础硁硅硕硖硗硙硚确硷碍碛碜碱碹磙礼祎祢祯祷祸禀禄禅离秃秆种积称秽秾稆税稣稳穑穷窃窍窑窜窝窥窦窭竖竞笃笋笔笕笺笼笾筑筚筛筜筝筹签简箓箦箧箨箩箪箫篑篓篮篱簖籁籴类籼粜粝粤粪粮糁糇紧絷纟纠纡红纣纤纥约级纨纩纪纫纬纭纮纯纰纱纲纳纴纵纶纷纸纹纺纻纼纽纾线绀绁绂练组绅细织终绉绊绋绌绍绎经绐绑绒结绔绕绖绗绘给绚绛络绝绞统绠绡绢绣绤绥绦继绨绩绪绫绬续绮绯绰绱绲绳维绵绶绷绸绹绺绻综绽绾绿缀缁缂缃缄缅缆缇缈缉缊缋缌缍缎缏缐缑缒缓缔缕编缗缘缙缚缛缜缝缞缟缠缡缢缣缤缥缦缧缨缩缪缫缬缭缮缯缰缱缲缳缴缵罂网罗罚罢罴羁羟羡翘翙翚耢耧耸耻聂聋职聍联聩聪肃肠肤肷肾肿胀胁胆胜胧胨胪胫胶脉脍脏脐脑脓脔脚脱脶脸腊腌腘腭腻腼腽腾膑臜舆舣舰舱舻艰艳艹艺节芈芗芜芦苁苇苈苋苌苍苎苏苘苹茎茏茑茔茕茧荆荐荙荚荛荜荞荟荠荡荣荤荥荦荧荨荩荪荫荬荭荮药莅莜莱莲莳莴莶获莸莹莺莼萚萝萤营萦萧萨葱蒇蒉蒋蒌蓝蓟蓠蓣蓥蓦蔷蔹蔺蔼蕲蕴薮藁藓虏虑虚虫虬虮虽虾虿蚀蚁蚂蚕蚝蚬蛊蛎蛏蛮蛰蛱蛲蛳蛴蜕蜗蜡蝇蝈蝉蝎蝼蝾螀螨蟏衅衔补衬衮袄袅袆袜袭袯装裆裈裢裣裤裥褛褴襁襕见观觃规觅视觇览觉觊觋觌觍觎觏觐觑觞触觯詟誉誊讠计订讣认讥讦讧讨让讪讫训议讯记讱讲讳讴讵讶讷许讹论讻讼讽设访诀证诂诃评诅识诇诈诉诊诋诌词诎诏诐译诒诓诔试诖诗诘诙诚诛诜话诞诟诠诡询诣诤该详诧诨诩诪诫诬语诮误诰诱诲诳说诵诶请诸诹诺读诼诽课诿谀谁谂调谄谅谆谇谈谊谋谌谍谎谏谐谑谒谓谔谕谖谗谘谙谚谛谜谝谞谟谠谡谢谣谤谥谦谧谨谩谪谫谬谭谮谯谰谱谲谳谴谵谶谷豮贝贞负贠贡财责贤败账货质贩贪贫贬购贮贯贰贱贲贳贴贵贶贷贸费贺贻贼贽贾贿赀赁赂赃资赅赆赇赈赉赊赋赌赍赎赏赐赑赒赓赔赕赖赗赘赙赚赛赜赝赞赟赠赡赢赣赪赵赶趋趱趸跃跄跖跞践跶跷跸跹跻踊踌踪踬踯蹑蹒蹰蹿躏躜躯车轧轨轩轪轫转轭轮软轰轱轲轳轴轵轶轷轸轹轺轻轼载轾轿辀辁辂较辄辅辆辇辈辉辊辋辌辍辎辏辐辑辒输辔辕辖辗辘辙辚辞辩辫边辽达迁过迈运还这进远违连迟迩迳迹适选逊递逦逻遗遥邓邝邬邮邹邺邻郁郄郏郐郑郓郦郧郸酝酦酱酽酾酿释里鉅鉴銮錾钆钇针钉钊钋钌钍钎钏钐钑钒钓钔钕钖钗钘钙钚钛钝钞钟钠钡钢钣钤钥钦钧钨钩钪钫钬钭钮钯钰钱钲钳钴钵钶钷钸钹钺钻钼钽钾钿铀铁铂铃铄铅铆铈铉铊铋铍铎铏铐铑铒铕铗铘铙铚铛铜铝铞铟铠铡铢铣铤铥铦铧铨铪铫铬铭铮铯铰铱铲铳铴铵银铷铸铹铺铻铼铽链铿销锁锂锃锄锅锆锇锈锉锊锋锌锍锎锏锐锑锒锓锔锕锖锗错锚锜锞锟锠锡锢锣锤锥锦锨锩锫锬锭键锯锰锱锲锳锴锵锶锷锸锹锺锻锼锽锾锿镀镁镂镃镆镇镈镉镊镌镍镎镏镐镑镒镕镖镗镙镚镛镜镝镞镟镠镡镢镣镤镥镦镧镨镩镪镫镬镭镮镯镰镱镲镳镴镶长门闩闪闫闬闭问闯闰闱闲闳间闵闶闷闸闹闺闻闼闽闾闿阀阁阂阃阄阅阆阇阈阉阊阋阌阍阎阏阐阑阒阓阔阕阖阗阘阙阚阛队阳阴阵阶际陆陇陈陉陕陧陨险随隐隶隽难雏雠雳雾霁霉霭靓静靥鞑鞒鞯鞴韦韧韨韩韪韫韬韵页顶顷顸项顺须顼顽顾顿颀颁颂颃预颅领颇颈颉颊颋颌颍颎颏颐频颒颓颔颕颖颗题颙颚颛颜额颞颟颠颡颢颣颤颥颦颧风飏飐飑飒飓飔飕飖飗飘飙飚飞飨餍饤饥饦饧饨饩饪饫饬饭饮饯饰饱饲饳饴饵饶饷饸饹饺饻饼饽饾饿馀馁馂馃馄馅馆馇馈馉馊馋馌馍馎馏馐馑馒馓馔馕马驭驮驯驰驱驲驳驴驵驶驷驸驹驺驻驼驽驾驿骀骁骂骃骄骅骆骇骈骉骊骋验骍骎骏骐骑骒骓骔骕骖骗骘骙骚骛骜骝骞骟骠骡骢骣骤骥骦骧髅髋髌鬓魇魉鱼鱽鱾鱿鲀鲁鲂鲄鲅鲆鲇鲈鲉鲊鲋鲌鲍鲎鲏鲐鲑鲒鲓鲔鲕鲖鲗鲘鲙鲚鲛鲜鲝鲞鲟鲠鲡鲢鲣鲤鲥鲦鲧鲨鲩鲪鲫鲬鲭鲮鲯鲰鲱鲲鲳鲴鲵鲶鲷鲸鲹鲺鲻鲼鲽鲾鲿鳀鳁鳂鳃鳄鳅鳆鳇鳈鳉鳊鳋鳌鳍鳎鳏鳐鳑鳒鳓鳔鳕鳖鳗鳘鳙鳛鳜鳝鳞鳟鳠鳡鳢鳣鸟鸠鸡鸢鸣鸤鸥鸦鸧鸨鸩鸪鸫鸬鸭鸮鸯鸰鸱鸲鸳鸴鸵鸶鸷鸸鸹鸺鸻鸼鸽鸾鸿鹀鹁鹂鹃鹄鹅鹆鹇鹈鹉鹊鹋鹌鹍鹎鹏鹐鹑鹒鹓鹔鹕鹖鹗鹘鹚鹛鹜鹝鹞鹟鹠鹡鹢鹣鹤鹥鹦鹧鹨鹩鹪鹫鹬鹭鹯鹰鹱鹲鹳鹴鹾麦麸黄黉黡黩黪黾鼋鼌鼍鼗鼹齄齐齑齿龀龁龂龃龄龅龆龇龈龉龊龋龌龙龚龛龟志制咨只里系范松没尝尝闹面准钟别闲乾尽脏拼",
        targetData: "萬與醜專業叢東絲丟兩嚴喪個丬豐臨爲麗舉麼義烏樂喬習鄉書買亂爭於虧雲亙亞產畝親褻嚲億僅從侖倉儀們價衆優夥會傴傘偉傳傷倀倫傖僞佇體餘傭僉俠侶僥偵側僑儈儕儂俁儔儼倆儷儉債傾傯僂僨償儻儐儲儺兒兌兗黨蘭關興茲養獸囅內岡冊寫軍農冢馮沖決況凍淨淒涼凌減湊凜幾鳳鳧憑凱擊凼鑿芻劃劉則剛創刪別剗剄劊劌剴劑剮劍剝劇勸辦務勱動勵勁勞勢勳勐勩勻匭匱區醫華協單賣盧滷臥衛卻巹廠廳歷厲壓厭厙廁廂厴廈廚廄廝縣參靉靆雙發變敘疊葉號嘆嘰籲後嚇呂嗎唚噸聽啓吳嘸囈嘔嚦唄員咼嗆嗚詠咔嚨嚀噝吒咴鹹哌響啞噠嘵嗶噦譁噲嚌噥喲嘜嗊嘮啢嗩唣喚唿嘖嗇囀齧囉嘽嘯噴嘍嚳囁呵噯噓嚶囑嚕噼囂嚯團園囪圍圇國圖圓聖壙場阪壞塊堅壇壢壩塢墳墜壟壠壚壘墾垧堊墊埡墶壋塏堖塒壎堝埝垵塹墮壪牆壯聲殼壺壼處備復夠頭誇夾奪奩奐奮獎奧妝婦媽嫵嫗嬀姍姜婁婭嬈嬌孌娛媧嫺嫿嬰嬋嬸媼嬡嬪嬙嬤孫學孿寧寶實寵審憲宮寬賓寢對尋導壽將爾塵堯尷屍盡層屓屜屆屬屢屨嶼歲豈嶇崗峴嶴嵐島嶺嶽崬巋嶨嶧峽嶢嶠崢巒嶗崍嶮嶄嶸嶔嵛嶁嵴巔鞏巰幣帥師幃帳簾幟帶幀幫幬幘幗冪襆幹並廣莊慶廬廡庫應廟龐廢廎廩開異棄張彌弳彎彈強歸當錄彠彥徹徑徠御憶懺憂愾懷態慫憮慪悵愴憐總懟懌戀懇惡慟懨愷惻惱惲悅愨懸慳憫驚懼慘懲憊愜慚憚慣愍慍憤憒願懾憖憷懣懶懍戇戔戲戧戰戩戶扎撲扦執擴捫掃揚擾撫拋摶摳掄搶護報擔擬攏揀擁攔擰撥擇掛摯攣掗撾撻挾撓擋撟掙擠揮撏撈損撿換搗據捻擄摑擲撣摻摜揸攬撳攙擱摟攪攜攝攄擺搖擯攤攖撐攆擷擼攛擻攢敵斂數齋斕鬥斬斷無舊時曠暘曇晝曨顯晉曬曉曄暈暉暫曖札術樸機殺雜權條來楊榪傑極構樅樞棗櫪梘棖槍楓梟櫃檸檉梔柵標棧櫛櫳棟櫨櫟欄樹棲樣欒桊椏橈楨檔榿橋樺檜槳樁夢檮棶檢櫺槨櫝槧欏橢樓欖櫬櫚櫸檟檻檳櫧橫檣櫻櫫櫥櫓櫞檐檁歡歟歐殲歿殤殘殞殮殫殯毆毀轂畢斃氈毿氌氣氫氬氳匯漢污湯洶沓溝沒灃漚瀝淪滄渢潙滬沵濘淚澩瀧瀘濼瀉潑澤涇潔灑窪浹淺漿澆湞溮濁測澮濟瀏滻渾滸濃潯濜塗涌濤澇淶漣潿渦溳渙滌潤澗漲澀澱淵淥漬瀆漸澠漁瀋滲溫遊灣溼潰濺漵漊潷滾滯灩灄滿瀅濾濫灤濱灘澦漤瀠瀟瀲濰潛瀦瀾瀨瀕灝滅燈靈災燦煬爐燉煒熗點煉熾爍爛烴燭煙煩燒燁燴燙燼熱煥燜燾煅煳熘愛爺牘犛牽犧犢犟狀獷獁猶狽狍獮獰獨狹獅獪猙獄猻獫獵獼玀豬貓蝟獻獺璣璵瑒瑪瑋環現瑲璽珉珏琺瓏璫琿璡璉瑣瓊瑤璦璇瓔瓚甕甌電畫暢畲疇癤療瘧癘瘍癧瘡瘋皰痾癰痙癢瘂癆瘓癇癡癉瘮瘞瘻癟癱癮癭癩癬癲癯皚皺皸盞鹽監蓋盜盤瞘眥矓着睜睞瞼瞞矚矯磯礬礦碭碼磚硨硯碸礪礱礫礎硜硅碩硤磽磑礄確礆礙磧磣鹼碹磙禮禕禰禎禱禍稟祿禪離禿稈種積稱穢穠穭稅穌穩穡窮竊竅窯竄窩窺竇窶豎競篤筍筆筧箋籠籩築篳篩簹箏籌籤簡籙簀篋籜籮簞簫簣簍籃籬籪籟糴類秈糶糲粵糞糧糝餱緊縶糹糾紆紅紂纖紇約級紈纊紀紉緯紜紘純紕紗綱納紝縱綸紛紙紋紡紵紖紐紓線紺紲紱練組紳細織終縐絆紼絀紹繹經紿綁絨結絝繞絰絎繪給絢絳絡絕絞統綆綃絹繡綌綏絛繼綈績緒綾緓續綺緋綽鞝緄繩維綿綬繃綢綯綹綣綜綻綰綠綴緇緙緗緘緬纜緹緲緝縕繢緦綞緞緶線緱縋緩締縷編緡緣縉縛縟縝縫縗縞纏縭縊縑繽縹縵縲纓縮繆繅纈繚繕繒繮繾繰繯繳纘罌網羅罰罷羆羈羥羨翹翽翬耮耬聳恥聶聾職聹聯聵聰肅腸膚肷腎腫脹脅膽勝朧腖臚脛膠脈膾髒臍腦膿臠腳脫腡臉臘醃膕齶膩靦膃騰臏臢輿艤艦艙艫艱豔艹藝節羋薌蕪蘆蓯葦藶莧萇蒼苧蘇檾蘋莖蘢蔦塋煢繭荊薦薘莢蕘蓽蕎薈薺蕩榮葷滎犖熒蕁藎蓀蔭蕒葒葤藥蒞莜萊蓮蒔萵薟獲蕕瑩鶯蓴蘀蘿螢營縈蕭薩蔥蕆蕢蔣蔞藍薊蘺蕷鎣驀薔蘞藺藹蘄蘊藪藁蘚虜慮虛蟲虯蟣雖蝦蠆蝕蟻螞蠶蠔蜆蠱蠣蟶蠻蟄蛺蟯螄蠐蛻蝸蠟蠅蟈蟬蠍螻蠑螿蟎蠨釁銜補襯袞襖嫋褘襪襲襏裝襠褌褳襝褲襉褸襤襁襴見觀覎規覓視覘覽覺覬覡覿覥覦覯覲覷觴觸觶讋譽謄訁計訂訃認譏訐訌討讓訕訖訓議訊記訒講諱謳詎訝訥許訛論訩訟諷設訪訣證詁訶評詛識詗詐訴診詆謅詞詘詔詖譯詒誆誄試詿詩詰詼誠誅詵話誕詬詮詭詢詣諍該詳詫諢詡譸誡誣語誚誤誥誘誨誑說誦誒請諸諏諾讀諑誹課諉諛誰諗調諂諒諄誶談誼謀諶諜謊諫諧謔謁謂諤諭諼讒諮諳諺諦謎諞諝謨讜謖謝謠謗諡謙謐謹謾謫譾謬譚譖譙讕譜譎讞譴譫讖谷豶貝貞負貟貢財責賢敗賬貨質販貪貧貶購貯貫貳賤賁貰貼貴貺貸貿費賀貽賊贄賈賄貲賃賂贓資賅贐賕賑賚賒賦賭齎贖賞賜贔賙賡賠賧賴賵贅賻賺賽賾贗贊贇贈贍贏贛赬趙趕趨趲躉躍蹌跖躒踐躂蹺蹕躚躋踊躊蹤躓躑躡蹣躕躥躪躦軀車軋軌軒軑軔轉軛輪軟轟軲軻轤軸軹軼軤軫轢軺輕軾載輊轎輈輇輅較輒輔輛輦輩輝輥輞輬輟輜輳輻輯轀輸轡轅轄輾轆轍轔辭辯辮邊遼達遷過邁運還這進遠違連遲邇逕跡適選遜遞邐邏遺遙鄧鄺鄔郵鄒鄴鄰鬱郄郟鄶鄭鄆酈鄖鄲醞醱醬釅釃釀釋裏鉅鑑鑾鏨釓釔針釘釗釙釕釷釺釧釤鈒釩釣鍆釹鍚釵鈃鈣鈈鈦鈍鈔鍾鈉鋇鋼鈑鈐鑰欽鈞鎢鉤鈧鈁鈥鈄鈕鈀鈺錢鉦鉗鈷鉢鈳鉕鈽鈸鉞鑽鉬鉭鉀鈿鈾鐵鉑鈴鑠鉛鉚鈰鉉鉈鉍鈹鐸鉶銬銠鉺銪鋏鋣鐃銍鐺銅鋁銱銦鎧鍘銖銑鋌銩銛鏵銓鉿銚鉻銘錚銫鉸銥鏟銃鐋銨銀銣鑄鐒鋪鋙錸鋱鏈鏗銷鎖鋰鋥鋤鍋鋯鋨鏽銼鋝鋒鋅鋶鐦鐗銳銻鋃鋟鋦錒錆鍺錯錨錡錁錕錩錫錮鑼錘錐錦杴錈錇錟錠鍵鋸錳錙鍥鍈鍇鏘鍶鍔鍤鍬鍾鍛鎪鍠鍰鎄鍍鎂鏤鎡鏌鎮鎛鎘鑷鐫鎳鎿鎦鎬鎊鎰鎔鏢鏜鏍鏰鏞鏡鏑鏃鏇鏐鐔钁鐐鏷鑥鐓鑭鐠鑹鏹鐙鑊鐳鐶鐲鐮鐿鑔鑣鑞鑲長門閂閃閆閈閉問闖閏闈閒閎間閔閌悶閘鬧閨聞闥閩閭闓閥閣閡閫鬮閱閬闍閾閹閶鬩閿閽閻閼闡闌闃闠闊闋闔闐闒闕闞闤隊陽陰陣階際陸隴陳陘陝隉隕險隨隱隸雋難雛讎靂霧霽黴靄靚靜靨韃鞽韉鞴韋韌韍韓韙韞韜韻頁頂頃頇項順須頊頑顧頓頎頒頌頏預顱領頗頸頡頰頲頜潁熲頦頤頻頮頹頷頴穎顆題顒顎顓顏額顳顢顛顙顥纇顫顬顰顴風颺颭颮颯颶颸颼颻飀飄飆飈飛饗饜飣飢飥餳飩餼飪飫飭飯飲餞飾飽飼飿飴餌饒餉餄餎餃餏餅餑餖餓餘餒餕餜餛餡館餷饋餶餿饞饁饃餺餾饈饉饅饊饌饢馬馭馱馴馳驅馹駁驢駔駛駟駙駒騶駐駝駑駕驛駘驍罵駰驕驊駱駭駢驫驪騁驗騂駸駿騏騎騍騅騌驌驂騙騭騤騷騖驁騮騫騸驃騾驄驏驟驥驦驤髏髖髕鬢魘魎魚魛魢魷魨魯魴魺鮁鮃鮎鱸鮋鮓鮒鮊鮑鱟鮍鮐鮭鮚鮳鮪鮞鮦鰂鮜鱠鱭鮫鮮鮺鯗鱘鯁鱺鰱鰹鯉鰣鰷鯀鯊鯇鮶鯽鯒鯖鯪鯕鯫鯡鯤鯧鯝鯢鮎鯛鯨鰺鯴鯔鱝鰈鰏鱨鯷鰮鰃鰓鱷鰍鰒鰉鰁鱂鯿鰠鰲鰭鰨鰥鰩鰟鰜鰳鰾鱈鱉鰻鰵鱅鰼鱖鱔鱗鱒鱯鱤鱧鱣鳥鳩雞鳶鳴鳲鷗鴉鶬鴇鴆鴣鶇鸕鴨鴞鴦鴒鴟鴝鴛鷽鴕鷥鷙鴯鴰鵂鴴鵃鴿鸞鴻鵐鵓鸝鵑鵠鵝鵒鷳鵜鵡鵲鶓鵪鵾鵯鵬鵮鶉鶊鵷鷫鶘鶡鶚鶻鶿鶥鶩鷊鷂鶲鶹鶺鷁鶼鶴鷖鸚鷓鷚鷯鷦鷲鷸鷺鸇鷹鸌鸏鸛鸘鹺麥麩黃黌黶黷黲黽黿鼂鼉鞀鼴齇齊齏齒齔齕齗齟齡齙齠齜齦齬齪齲齷龍龔龕龜志制諮只裏系範鬆沒嚐嚐鬧面準鍾別閒乾盡髒拼",
        trans: function(e) {
            var t = ""
              , n = this.originData
              , o = this.targetData;
            if ("string" != typeof e)
                return e;
            for (var r = 0; r < e.length; r++) {
                var i = e.charAt(r)
                  , a = e.charCodeAt(r);
                if (a > 13312 && a < 40899 || a > 63744 && a < 64106) {
                    var s = n.indexOf(i);
                    t += -1 === s ? i : o.charAt(s)
                } else
                    t += i
            }
            return t
        }
    }
}, bookmarkMessage = {
    bookmark: "書籤",
    add_bookmark: "添加書籤",
    remove_bookmark: "移除書籤",
    bookmark_load_failed: "加載書籤失敗",
    bookmark_has_been_removed: "已移除書籤",
    bookmark_remove_failed: "移除書籤失敗",
    bookmark_added: "添加書籤成功",
    bookmark_add_failed: "添加書籤失敗",
    check_bookmark_after_login: "請登錄後查看書籤",
    empty_bookmarks: "暫無書籤，請先添加書籤"
}, reviewMessage = {
    chapter_review: "本章說",
    chapter_review_enable_desc: "當前會正常顯示所有本章說",
    chapter_review_disable_desc: "當前不會顯示本章說",
    empty_reviews: "還沒有人發表評論",
    author: "作家",
    reply: "回復",
    check_image: "查看圖片",
    author_like_review: "{0}覺得很贊",
    floor: "{0}樓 · ",
    dislike: "踩",
    disliked: "已踩",
    like: "贊",
    reply_to: "回復{0}：",
    check_all_replies: "查看全部{0}條回復",
    load_more_reviews: "展示更多回復",
    load_more_reviews_with_count: "展示{0}條回復",
    review_cancel: "取消",
    review_publish: "發布",
    review: "評論",
    review_count: "{0}條",
    publish_review: "發表一條神評論...",
    review_dub: "配音",
    review_input_placeholder: "寫下你的想法...",
    review_user: "評論用戶",
    review_delete: "刪除",
    review_delete_title: "刪除評論",
    review_delete_desc: "刪除後評論下所有回復都會被刪除",
    review_delete_cancel: "取消",
    review_delete_confirm: "刪除",
    review_images_upload_failed: "上傳失敗\n僅支持上傳{0}M以內的圖片",
    review_images_over_limit: "最多支持上傳{0}張圖片"
}, mobileMessage = {
    release_to_load_prev: "鬆開加載上一章",
    pull_to_load_prev: "下拉加載上一章",
    release_to_load_next: "鬆開加載下一章",
    push_to_load_next: "上拉加載下一章",
    already_the_last_chap: "已經是最後章了",
    already_the_first_chap: "已經是第一章了",
    login_guide_title: "下載App可使用更多功能",
    login_guide_desc: "該功能需登錄後使用，也可以下載App體驗更多功能",
    login_guide_download: "下載App",
    login_guide_login: "登錄使用"
}, subscriptionMessage = {
    default_subs_tips: "這是VIP章節 需要訂閱後才能閱讀",
    limit_free_48h_subs_tips: "此章節非限免章節，需訂閱後才能閱讀",
    limit_free_login_subs_tips: "限免作品VIP章節需登錄閱讀",
    subs_current_chap: "訂閱本章",
    subs_book: "訂閱整本",
    open_auto_subs_desc: "不再顯示訂閱提醒，自動訂閱下一章",
    subs_chap_loading: "訂閱中",
    subs_chap_succeed: "訂閱成功",
    subs_chap_failed: "訂閱失敗",
    batch_subs: "批量訂閱",
    check_all: "全選",
    checked_chaps: "已選{0}章",
    subs_following_chaps: "購買後續付費章節",
    custom_subs: "自定義",
    subs_start_from_chap: "起始章節：{0}",
    subs_current_volume: "訂閱本卷"
}, titlePageMessage = {
    write: "著",
    category: "類型",
    publish_time: "上架",
    serial: "連載",
    finished: "完結",
    status_word_count: "(字)",
    fans_count_desc: "與 {0} 位書友共同開啓《{1}》的{2}之旅",
    publication_desc: "本作品由{0}進行電子制作與發行",
    copyright_desc: "©版權所有 侵權必究"
}, quickRechargeMessage = {
    alipay: "支付寶",
    qq_wallet: "QQ錢包",
    qq_mobile: "手機QQ",
    wechat_pay: "微信支付",
    wechat: "微信",
    wechat_mobile: "微信客戶端",
    other_payment: "其他方式",
    quick_recharge: "快捷支付",
    payment_confirm: "確定打開“{0}”進行支付？",
    payment_finish_confirm: "若你完成支付，點擊“已支付”按鈕，若沒安裝“{0}”，請安裝後再支付",
    payment_checking: "正在查詢結果，請耐心等待",
    payment_failed: "支付失敗，請重試",
    hint: "提示",
    confirm: "確定",
    paid: "已支付",
    go_recharge: "去充值",
    yuan: "元",
    scan_to_pay_pre: "使用",
    scan_to_pay_suff: "掃一掃支付",
    agree: "同意",
    terms: "服務條款",
    pay_and_subs: "支付並訂閱",
    consume_desc_pre: "本次訂閱消耗：",
    consume_desc_suff: "{0}（賬戶餘額 {1} {0}）",
    payment_needed: "還需支付：",
    have_problems: "遇到問題",
    payment_problems_desc: "請在新開頁中完成支付，如遇到問題可點擊下方按鈕進行反饋"
}, desktopGuideMessage = {
    chapter_list_guide: "目錄/書籤",
    detail_guide: "去書詳情頁",
    shelf_guide: "加入書架",
    vote_guide: "投票/打賞",
    dark_mode_guide: "日夜間切換",
    settings_guide: "更多設置",
    app_guide: "App閱讀",
    to_top_guide: "置頂",
    bookmark_guide: "點擊加入書籤後，「閱讀進度」可以\n在閱讀頁「目錄」及「書架」中查看"
}, zh_HK_default = _objectSpread$1({}, commonMessage, mobileMessage, titlePageMessage, subscriptionMessage, bookmarkMessage, reviewMessage, quickRechargeMessage, desktopGuideMessage), jsonBigint = {
    exports: {}
}, stringify = {
    exports: {}
}, bignumber = {
    exports: {}
}, module;
module = bignumber,
function(e) {
    var t, n = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i, o = Math.ceil, r = Math.floor, i = "[BigNumber Error] ", a = i + "Number primitive has more than 15 significant digits: ", s = 1e14, l = 14, c = 9007199254740991, u = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13], d = 1e7, f = 1e9;
    function p(e) {
        var t = 0 | e;
        return e > 0 || e === t ? t : t - 1
    }
    function h(e) {
        for (var t, n, o = 1, r = e.length, i = e[0] + ""; o < r; ) {
            for (t = e[o++] + "",
            n = l - t.length; n--; t = "0" + t)
                ;
            i += t
        }
        for (r = i.length; 48 === i.charCodeAt(--r); )
            ;
        return i.slice(0, r + 1 || 1)
    }
    function m(e, t) {
        var n, o, r = e.c, i = t.c, a = e.s, s = t.s, l = e.e, c = t.e;
        if (!a || !s)
            return null;
        if (n = r && !r[0],
        o = i && !i[0],
        n || o)
            return n ? o ? 0 : -s : a;
        if (a != s)
            return a;
        if (n = a < 0,
        o = l == c,
        !r || !i)
            return o ? 0 : !r ^ n ? 1 : -1;
        if (!o)
            return l > c ^ n ? 1 : -1;
        for (s = (l = r.length) < (c = i.length) ? l : c,
        a = 0; a < s; a++)
            if (r[a] != i[a])
                return r[a] > i[a] ^ n ? 1 : -1;
        return l == c ? 0 : l > c ^ n ? 1 : -1
    }
    function _(e, t, n, o) {
        if (e < t || e > n || e !== r(e))
            throw Error(i + (o || "Argument") + ("number" == typeof e ? e < t || e > n ? " out of range: " : " not an integer: " : " not a primitive number: ") + String(e))
    }
    function v(e) {
        var t = e.c.length - 1;
        return p(e.e / l) == t && e.c[t] % 2 != 0
    }
    function g(e, t) {
        return (e.length > 1 ? e.charAt(0) + "." + e.slice(1) : e) + (t < 0 ? "e" : "e+") + t
    }
    function x(e, t, n) {
        var o, r;
        if (t < 0) {
            for (r = n + "."; ++t; r += n)
                ;
            e = r + e
        } else if (++t > (o = e.length)) {
            for (r = n,
            t -= o; --t; r += n)
                ;
            e += r
        } else
            t < o && (e = e.slice(0, t) + "." + e.slice(t));
        return e
    }
    t = function e(t) {
        var y, b, k, w, E, S, C, B, T, $, N = Y.prototype = {
            constructor: Y,
            toString: null,
            valueOf: null
        }, A = new Y(1), O = 20, V = 4, D = -7, R = 21, I = -1e7, j = 1e7, L = !1, P = 1, F = 0, U = {
            prefix: "",
            groupSize: 3,
            secondaryGroupSize: 0,
            groupSeparator: ",",
            decimalSeparator: ".",
            fractionGroupSize: 0,
            fractionGroupSeparator: " ",
            suffix: ""
        }, M = "0123456789abcdefghijklmnopqrstuvwxyz", K = !0;
        function Y(e, t) {
            var o, i, s, u, d, f, p, h, m = this;
            if (!(m instanceof Y))
                return new Y(e,t);
            if (null == t) {
                if (e && !0 === e._isBigNumber)
                    return m.s = e.s,
                    void (!e.c || e.e > j ? m.c = m.e = null : e.e < I ? m.c = [m.e = 0] : (m.e = e.e,
                    m.c = e.c.slice()));
                if ((f = "number" == typeof e) && 0 * e == 0) {
                    if (m.s = 1 / e < 0 ? (e = -e,
                    -1) : 1,
                    e === ~~e) {
                        for (u = 0,
                        d = e; d >= 10; d /= 10,
                        u++)
                            ;
                        return void (u > j ? m.c = m.e = null : (m.e = u,
                        m.c = [e]))
                    }
                    h = String(e)
                } else {
                    if (!n.test(h = String(e)))
                        return k(m, h, f);
                    m.s = 45 == h.charCodeAt(0) ? (h = h.slice(1),
                    -1) : 1
                }
                (u = h.indexOf(".")) > -1 && (h = h.replace(".", "")),
                (d = h.search(/e/i)) > 0 ? (u < 0 && (u = d),
                u += +h.slice(d + 1),
                h = h.substring(0, d)) : u < 0 && (u = h.length)
            } else {
                if (_(t, 2, M.length, "Base"),
                10 == t && K)
                    return G(m = new Y(e), O + m.e + 1, V);
                if (h = String(e),
                f = "number" == typeof e) {
                    if (0 * e != 0)
                        return k(m, h, f, t);
                    if (m.s = 1 / e < 0 ? (h = h.slice(1),
                    -1) : 1,
                    Y.DEBUG && h.replace(/^0\.0*|\./, "").length > 15)
                        throw Error(a + e)
                } else
                    m.s = 45 === h.charCodeAt(0) ? (h = h.slice(1),
                    -1) : 1;
                for (o = M.slice(0, t),
                u = d = 0,
                p = h.length; d < p; d++)
                    if (o.indexOf(i = h.charAt(d)) < 0) {
                        if ("." == i) {
                            if (d > u) {
                                u = p;
                                continue
                            }
                        } else if (!s && (h == h.toUpperCase() && (h = h.toLowerCase()) || h == h.toLowerCase() && (h = h.toUpperCase()))) {
                            s = !0,
                            d = -1,
                            u = 0;
                            continue
                        }
                        return k(m, String(e), f, t)
                    }
                f = !1,
                (u = (h = b(h, t, 10, m.s)).indexOf(".")) > -1 ? h = h.replace(".", "") : u = h.length
            }
            for (d = 0; 48 === h.charCodeAt(d); d++)
                ;
            for (p = h.length; 48 === h.charCodeAt(--p); )
                ;
            if (h = h.slice(d, ++p)) {
                if (p -= d,
                f && Y.DEBUG && p > 15 && (e > c || e !== r(e)))
                    throw Error(a + m.s * e);
                if ((u = u - d - 1) > j)
                    m.c = m.e = null;
                else if (u < I)
                    m.c = [m.e = 0];
                else {
                    if (m.e = u,
                    m.c = [],
                    d = (u + 1) % l,
                    u < 0 && (d += l),
                    d < p) {
                        for (d && m.c.push(+h.slice(0, d)),
                        p -= l; d < p; )
                            m.c.push(+h.slice(d, d += l));
                        d = l - (h = h.slice(d)).length
                    } else
                        d -= p;
                    for (; d--; h += "0")
                        ;
                    m.c.push(+h)
                }
            } else
                m.c = [m.e = 0]
        }
        function z(e, t, n, o) {
            var r, i, a, s, l;
            if (null == n ? n = V : _(n, 0, 8),
            !e.c)
                return e.toString();
            if (r = e.c[0],
            a = e.e,
            null == t)
                l = h(e.c),
                l = 1 == o || 2 == o && (a <= D || a >= R) ? g(l, a) : x(l, a, "0");
            else if (i = (e = G(new Y(e), t, n)).e,
            s = (l = h(e.c)).length,
            1 == o || 2 == o && (t <= i || i <= D)) {
                for (; s < t; l += "0",
                s++)
                    ;
                l = g(l, i)
            } else if (t -= a,
            l = x(l, i, "0"),
            i + 1 > s) {
                if (--t > 0)
                    for (l += "."; t--; l += "0")
                        ;
            } else if ((t += i - s) > 0)
                for (i + 1 == s && (l += "."); t--; l += "0")
                    ;
            return e.s < 0 && r ? "-" + l : l
        }
        function H(e, t) {
            for (var n, o, r = 1, i = new Y(e[0]); r < e.length; r++)
                (!(o = new Y(e[r])).s || (n = m(i, o)) === t || 0 === n && i.s === t) && (i = o);
            return i
        }
        function q(e, t, n) {
            for (var o = 1, r = t.length; !t[--r]; t.pop())
                ;
            for (r = t[0]; r >= 10; r /= 10,
            o++)
                ;
            return (n = o + n * l - 1) > j ? e.c = e.e = null : n < I ? e.c = [e.e = 0] : (e.e = n,
            e.c = t),
            e
        }
        function G(e, t, n, i) {
            var a, c, d, f, p, h, m, _ = e.c, v = u;
            if (_) {
                e: {
                    for (a = 1,
                    f = _[0]; f >= 10; f /= 10,
                    a++)
                        ;
                    if ((c = t - a) < 0)
                        c += l,
                        d = t,
                        p = _[h = 0],
                        m = r(p / v[a - d - 1] % 10);
                    else if ((h = o((c + 1) / l)) >= _.length) {
                        if (!i)
                            break e;
                        for (; _.length <= h; _.push(0))
                            ;
                        p = m = 0,
                        a = 1,
                        d = (c %= l) - l + 1
                    } else {
                        for (p = f = _[h],
                        a = 1; f >= 10; f /= 10,
                        a++)
                            ;
                        m = (d = (c %= l) - l + a) < 0 ? 0 : r(p / v[a - d - 1] % 10)
                    }
                    if (i = i || t < 0 || null != _[h + 1] || (d < 0 ? p : p % v[a - d - 1]),
                    i = n < 4 ? (m || i) && (0 == n || n == (e.s < 0 ? 3 : 2)) : m > 5 || 5 == m && (4 == n || i || 6 == n && (c > 0 ? d > 0 ? p / v[a - d] : 0 : _[h - 1]) % 10 & 1 || n == (e.s < 0 ? 8 : 7)),
                    t < 1 || !_[0])
                        return _.length = 0,
                        i ? (t -= e.e + 1,
                        _[0] = v[(l - t % l) % l],
                        e.e = -t || 0) : _[0] = e.e = 0,
                        e;
                    if (0 == c ? (_.length = h,
                    f = 1,
                    h--) : (_.length = h + 1,
                    f = v[l - c],
                    _[h] = d > 0 ? r(p / v[a - d] % v[d]) * f : 0),
                    i)
                        for (; ; ) {
                            if (0 == h) {
                                for (c = 1,
                                d = _[0]; d >= 10; d /= 10,
                                c++)
                                    ;
                                for (d = _[0] += f,
                                f = 1; d >= 10; d /= 10,
                                f++)
                                    ;
                                c != f && (e.e++,
                                _[0] == s && (_[0] = 1));
                                break
                            }
                            if (_[h] += f,
                            _[h] != s)
                                break;
                            _[h--] = 0,
                            f = 1
                        }
                    for (c = _.length; 0 === _[--c]; _.pop())
                        ;
                }
                e.e > j ? e.c = e.e = null : e.e < I && (e.c = [e.e = 0])
            }
            return e
        }
        function W(e) {
            var t, n = e.e;
            return null === n ? e.toString() : (t = h(e.c),
            t = n <= D || n >= R ? g(t, n) : x(t, n, "0"),
            e.s < 0 ? "-" + t : t)
        }
        return Y.clone = e,
        Y.ROUND_UP = 0,
        Y.ROUND_DOWN = 1,
        Y.ROUND_CEIL = 2,
        Y.ROUND_FLOOR = 3,
        Y.ROUND_HALF_UP = 4,
        Y.ROUND_HALF_DOWN = 5,
        Y.ROUND_HALF_EVEN = 6,
        Y.ROUND_HALF_CEIL = 7,
        Y.ROUND_HALF_FLOOR = 8,
        Y.EUCLID = 9,
        Y.config = Y.set = function(e) {
            var t, n;
            if (null != e) {
                if ("object" != typeof e)
                    throw Error(i + "Object expected: " + e);
                if (e.hasOwnProperty(t = "DECIMAL_PLACES") && (_(n = e[t], 0, f, t),
                O = n),
                e.hasOwnProperty(t = "ROUNDING_MODE") && (_(n = e[t], 0, 8, t),
                V = n),
                e.hasOwnProperty(t = "EXPONENTIAL_AT") && ((n = e[t]) && n.pop ? (_(n[0], -f, 0, t),
                _(n[1], 0, f, t),
                D = n[0],
                R = n[1]) : (_(n, -f, f, t),
                D = -(R = n < 0 ? -n : n))),
                e.hasOwnProperty(t = "RANGE"))
                    if ((n = e[t]) && n.pop)
                        _(n[0], -f, -1, t),
                        _(n[1], 1, f, t),
                        I = n[0],
                        j = n[1];
                    else {
                        if (_(n, -f, f, t),
                        !n)
                            throw Error(i + t + " cannot be zero: " + n);
                        I = -(j = n < 0 ? -n : n)
                    }
                if (e.hasOwnProperty(t = "CRYPTO")) {
                    if ((n = e[t]) !== !!n)
                        throw Error(i + t + " not true or false: " + n);
                    if (n) {
                        if ("undefined" == typeof crypto || !crypto || !crypto.getRandomValues && !crypto.randomBytes)
                            throw L = !n,
                            Error(i + "crypto unavailable");
                        L = n
                    } else
                        L = n
                }
                if (e.hasOwnProperty(t = "MODULO_MODE") && (_(n = e[t], 0, 9, t),
                P = n),
                e.hasOwnProperty(t = "POW_PRECISION") && (_(n = e[t], 0, f, t),
                F = n),
                e.hasOwnProperty(t = "FORMAT")) {
                    if ("object" != typeof (n = e[t]))
                        throw Error(i + t + " not an object: " + n);
                    U = n
                }
                if (e.hasOwnProperty(t = "ALPHABET")) {
                    if ("string" != typeof (n = e[t]) || /^.?$|[+\-.\s]|(.).*\1/.test(n))
                        throw Error(i + t + " invalid: " + n);
                    K = "0123456789" == n.slice(0, 10),
                    M = n
                }
            }
            return {
                DECIMAL_PLACES: O,
                ROUNDING_MODE: V,
                EXPONENTIAL_AT: [D, R],
                RANGE: [I, j],
                CRYPTO: L,
                MODULO_MODE: P,
                POW_PRECISION: F,
                FORMAT: U,
                ALPHABET: M
            }
        }
        ,
        Y.isBigNumber = function(e) {
            if (!e || !0 !== e._isBigNumber)
                return !1;
            if (!Y.DEBUG)
                return !0;
            var t, n, o = e.c, a = e.e, c = e.s;
            e: if ("[object Array]" == {}.toString.call(o)) {
                if ((1 === c || -1 === c) && a >= -f && a <= f && a === r(a)) {
                    if (0 === o[0]) {
                        if (0 === a && 1 === o.length)
                            return !0;
                        break e
                    }
                    if ((t = (a + 1) % l) < 1 && (t += l),
                    String(o[0]).length == t) {
                        for (t = 0; t < o.length; t++)
                            if ((n = o[t]) < 0 || n >= s || n !== r(n))
                                break e;
                        if (0 !== n)
                            return !0
                    }
                }
            } else if (null === o && null === a && (null === c || 1 === c || -1 === c))
                return !0;
            throw Error(i + "Invalid BigNumber: " + e)
        }
        ,
        Y.maximum = Y.max = function() {
            return H(arguments, -1)
        }
        ,
        Y.minimum = Y.min = function() {
            return H(arguments, 1)
        }
        ,
        Y.random = (w = 9007199254740992,
        E = Math.random() * w & 2097151 ? function() {
            return r(Math.random() * w)
        }
        : function() {
            return 8388608 * (1073741824 * Math.random() | 0) + (8388608 * Math.random() | 0)
        }
        ,
        function(e) {
            var t, n, a, s, c, d = 0, p = [], h = new Y(A);
            if (null == e ? e = O : _(e, 0, f),
            s = o(e / l),
            L)
                if (crypto.getRandomValues) {
                    for (t = crypto.getRandomValues(new Uint32Array(s *= 2)); d < s; )
                        (c = 131072 * t[d] + (t[d + 1] >>> 11)) >= 9e15 ? (n = crypto.getRandomValues(new Uint32Array(2)),
                        t[d] = n[0],
                        t[d + 1] = n[1]) : (p.push(c % 1e14),
                        d += 2);
                    d = s / 2
                } else {
                    if (!crypto.randomBytes)
                        throw L = !1,
                        Error(i + "crypto unavailable");
                    for (t = crypto.randomBytes(s *= 7); d < s; )
                        (c = 281474976710656 * (31 & t[d]) + 1099511627776 * t[d + 1] + 4294967296 * t[d + 2] + 16777216 * t[d + 3] + (t[d + 4] << 16) + (t[d + 5] << 8) + t[d + 6]) >= 9e15 ? crypto.randomBytes(7).copy(t, d) : (p.push(c % 1e14),
                        d += 7);
                    d = s / 7
                }
            if (!L)
                for (; d < s; )
                    (c = E()) < 9e15 && (p[d++] = c % 1e14);
            for (s = p[--d],
            e %= l,
            s && e && (c = u[l - e],
            p[d] = r(s / c) * c); 0 === p[d]; p.pop(),
            d--)
                ;
            if (d < 0)
                p = [a = 0];
            else {
                for (a = -1; 0 === p[0]; p.splice(0, 1),
                a -= l)
                    ;
                for (d = 1,
                c = p[0]; c >= 10; c /= 10,
                d++)
                    ;
                d < l && (a -= l - d)
            }
            return h.e = a,
            h.c = p,
            h
        }
        ),
        Y.sum = function() {
            for (var e = 1, t = arguments, n = new Y(t[0]); e < t.length; )
                n = n.plus(t[e++]);
            return n
        }
        ,
        b = function() {
            var e = "0123456789";
            function t(e, t, n, o) {
                for (var r, i, a = [0], s = 0, l = e.length; s < l; ) {
                    for (i = a.length; i--; a[i] *= t)
                        ;
                    for (a[0] += o.indexOf(e.charAt(s++)),
                    r = 0; r < a.length; r++)
                        a[r] > n - 1 && (null == a[r + 1] && (a[r + 1] = 0),
                        a[r + 1] += a[r] / n | 0,
                        a[r] %= n)
                }
                return a.reverse()
            }
            return function(n, o, r, i, a) {
                var s, l, c, u, d, f, p, m, _ = n.indexOf("."), v = O, g = V;
                for (_ >= 0 && (u = F,
                F = 0,
                n = n.replace(".", ""),
                f = (m = new Y(o)).pow(n.length - _),
                F = u,
                m.c = t(x(h(f.c), f.e, "0"), 10, r, e),
                m.e = m.c.length),
                c = u = (p = t(n, o, r, a ? (s = M,
                e) : (s = e,
                M))).length; 0 == p[--u]; p.pop())
                    ;
                if (!p[0])
                    return s.charAt(0);
                if (_ < 0 ? --c : (f.c = p,
                f.e = c,
                f.s = i,
                p = (f = y(f, m, v, g, r)).c,
                d = f.r,
                c = f.e),
                _ = p[l = c + v + 1],
                u = r / 2,
                d = d || l < 0 || null != p[l + 1],
                d = g < 4 ? (null != _ || d) && (0 == g || g == (f.s < 0 ? 3 : 2)) : _ > u || _ == u && (4 == g || d || 6 == g && 1 & p[l - 1] || g == (f.s < 0 ? 8 : 7)),
                l < 1 || !p[0])
                    n = d ? x(s.charAt(1), -v, s.charAt(0)) : s.charAt(0);
                else {
                    if (p.length = l,
                    d)
                        for (--r; ++p[--l] > r; )
                            p[l] = 0,
                            l || (++c,
                            p = [1].concat(p));
                    for (u = p.length; !p[--u]; )
                        ;
                    for (_ = 0,
                    n = ""; _ <= u; n += s.charAt(p[_++]))
                        ;
                    n = x(n, c, s.charAt(0))
                }
                return n
            }
        }(),
        y = function() {
            function e(e, t, n) {
                var o, r, i, a, s = 0, l = e.length, c = t % d, u = t / d | 0;
                for (e = e.slice(); l--; )
                    s = ((r = c * (i = e[l] % d) + (o = u * i + (a = e[l] / d | 0) * c) % d * d + s) / n | 0) + (o / d | 0) + u * a,
                    e[l] = r % n;
                return s && (e = [s].concat(e)),
                e
            }
            function t(e, t, n, o) {
                var r, i;
                if (n != o)
                    i = n > o ? 1 : -1;
                else
                    for (r = i = 0; r < n; r++)
                        if (e[r] != t[r]) {
                            i = e[r] > t[r] ? 1 : -1;
                            break
                        }
                return i
            }
            function n(e, t, n, o) {
                for (var r = 0; n--; )
                    e[n] -= r,
                    r = e[n] < t[n] ? 1 : 0,
                    e[n] = r * o + e[n] - t[n];
                for (; !e[0] && e.length > 1; e.splice(0, 1))
                    ;
            }
            return function(o, i, a, c, u) {
                var d, f, h, m, _, v, g, x, y, b, k, w, E, S, C, B, T, $ = o.s == i.s ? 1 : -1, N = o.c, A = i.c;
                if (!(N && N[0] && A && A[0]))
                    return new Y(o.s && i.s && (N ? !A || N[0] != A[0] : A) ? N && 0 == N[0] || !A ? 0 * $ : $ / 0 : NaN);
                for (y = (x = new Y($)).c = [],
                $ = a + (f = o.e - i.e) + 1,
                u || (u = s,
                f = p(o.e / l) - p(i.e / l),
                $ = $ / l | 0),
                h = 0; A[h] == (N[h] || 0); h++)
                    ;
                if (A[h] > (N[h] || 0) && f--,
                $ < 0)
                    y.push(1),
                    m = !0;
                else {
                    for (S = N.length,
                    B = A.length,
                    h = 0,
                    $ += 2,
                    (_ = r(u / (A[0] + 1))) > 1 && (A = e(A, _, u),
                    N = e(N, _, u),
                    B = A.length,
                    S = N.length),
                    E = B,
                    k = (b = N.slice(0, B)).length; k < B; b[k++] = 0)
                        ;
                    T = A.slice(),
                    T = [0].concat(T),
                    C = A[0],
                    A[1] >= u / 2 && C++;
                    do {
                        if (_ = 0,
                        (d = t(A, b, B, k)) < 0) {
                            if (w = b[0],
                            B != k && (w = w * u + (b[1] || 0)),
                            (_ = r(w / C)) > 1)
                                for (_ >= u && (_ = u - 1),
                                g = (v = e(A, _, u)).length,
                                k = b.length; 1 == t(v, b, g, k); )
                                    _--,
                                    n(v, B < g ? T : A, g, u),
                                    g = v.length,
                                    d = 1;
                            else
                                0 == _ && (d = _ = 1),
                                g = (v = A.slice()).length;
                            if (g < k && (v = [0].concat(v)),
                            n(b, v, k, u),
                            k = b.length,
                            -1 == d)
                                for (; t(A, b, B, k) < 1; )
                                    _++,
                                    n(b, B < k ? T : A, k, u),
                                    k = b.length
                        } else
                            0 === d && (_++,
                            b = [0]);
                        y[h++] = _,
                        b[0] ? b[k++] = N[E] || 0 : (b = [N[E]],
                        k = 1)
                    } while ((E++ < S || null != b[0]) && $--);
                    m = null != b[0],
                    y[0] || y.splice(0, 1)
                }
                if (u == s) {
                    for (h = 1,
                    $ = y[0]; $ >= 10; $ /= 10,
                    h++)
                        ;
                    G(x, a + (x.e = h + f * l - 1) + 1, c, m)
                } else
                    x.e = f,
                    x.r = +m;
                return x
            }
        }(),
        S = /^(-?)0([xbo])(?=\w[\w.]*$)/i,
        C = /^([^.]+)\.$/,
        B = /^\.([^.]+)$/,
        T = /^-?(Infinity|NaN)$/,
        $ = /^\s*\+(?=[\w.])|^\s+|\s+$/g,
        k = function(e, t, n, o) {
            var r, a = n ? t : t.replace($, "");
            if (T.test(a))
                e.s = isNaN(a) ? null : a < 0 ? -1 : 1;
            else {
                if (!n && (a = a.replace(S, (function(e, t, n) {
                    return r = "x" == (n = n.toLowerCase()) ? 16 : "b" == n ? 2 : 8,
                    o && o != r ? e : t
                }
                )),
                o && (r = o,
                a = a.replace(C, "$1").replace(B, "0.$1")),
                t != a))
                    return new Y(a,r);
                if (Y.DEBUG)
                    throw Error(i + "Not a" + (o ? " base " + o : "") + " number: " + t);
                e.s = null
            }
            e.c = e.e = null
        }
        ,
        N.absoluteValue = N.abs = function() {
            var e = new Y(this);
            return e.s < 0 && (e.s = 1),
            e
        }
        ,
        N.comparedTo = function(e, t) {
            return m(this, new Y(e,t))
        }
        ,
        N.decimalPlaces = N.dp = function(e, t) {
            var n, o, r, i = this;
            if (null != e)
                return _(e, 0, f),
                null == t ? t = V : _(t, 0, 8),
                G(new Y(i), e + i.e + 1, t);
            if (!(n = i.c))
                return null;
            if (o = ((r = n.length - 1) - p(this.e / l)) * l,
            r = n[r])
                for (; r % 10 == 0; r /= 10,
                o--)
                    ;
            return o < 0 && (o = 0),
            o
        }
        ,
        N.dividedBy = N.div = function(e, t) {
            return y(this, new Y(e,t), O, V)
        }
        ,
        N.dividedToIntegerBy = N.idiv = function(e, t) {
            return y(this, new Y(e,t), 0, 1)
        }
        ,
        N.exponentiatedBy = N.pow = function(e, t) {
            var n, a, s, c, u, d, f, p, h = this;
            if ((e = new Y(e)).c && !e.isInteger())
                throw Error(i + "Exponent not an integer: " + W(e));
            if (null != t && (t = new Y(t)),
            u = e.e > 14,
            !h.c || !h.c[0] || 1 == h.c[0] && !h.e && 1 == h.c.length || !e.c || !e.c[0])
                return p = new Y(Math.pow(+W(h), u ? e.s * (2 - v(e)) : +W(e))),
                t ? p.mod(t) : p;
            if (d = e.s < 0,
            t) {
                if (t.c ? !t.c[0] : !t.s)
                    return new Y(NaN);
                (a = !d && h.isInteger() && t.isInteger()) && (h = h.mod(t))
            } else {
                if (e.e > 9 && (h.e > 0 || h.e < -1 || (0 == h.e ? h.c[0] > 1 || u && h.c[1] >= 24e7 : h.c[0] < 8e13 || u && h.c[0] <= 9999975e7)))
                    return c = h.s < 0 && v(e) ? -0 : 0,
                    h.e > -1 && (c = 1 / c),
                    new Y(d ? 1 / c : c);
                F && (c = o(F / l + 2))
            }
            for (u ? (n = new Y(.5),
            d && (e.s = 1),
            f = v(e)) : f = (s = Math.abs(+W(e))) % 2,
            p = new Y(A); ; ) {
                if (f) {
                    if (!(p = p.times(h)).c)
                        break;
                    c ? p.c.length > c && (p.c.length = c) : a && (p = p.mod(t))
                }
                if (s) {
                    if (0 === (s = r(s / 2)))
                        break;
                    f = s % 2
                } else if (G(e = e.times(n), e.e + 1, 1),
                e.e > 14)
                    f = v(e);
                else {
                    if (0 == (s = +W(e)))
                        break;
                    f = s % 2
                }
                h = h.times(h),
                c ? h.c && h.c.length > c && (h.c.length = c) : a && (h = h.mod(t))
            }
            return a ? p : (d && (p = A.div(p)),
            t ? p.mod(t) : c ? G(p, F, V, void 0) : p)
        }
        ,
        N.integerValue = function(e) {
            var t = new Y(this);
            return null == e ? e = V : _(e, 0, 8),
            G(t, t.e + 1, e)
        }
        ,
        N.isEqualTo = N.eq = function(e, t) {
            return 0 === m(this, new Y(e,t))
        }
        ,
        N.isFinite = function() {
            return !!this.c
        }
        ,
        N.isGreaterThan = N.gt = function(e, t) {
            return m(this, new Y(e,t)) > 0
        }
        ,
        N.isGreaterThanOrEqualTo = N.gte = function(e, t) {
            return 1 === (t = m(this, new Y(e,t))) || 0 === t
        }
        ,
        N.isInteger = function() {
            return !!this.c && p(this.e / l) > this.c.length - 2
        }
        ,
        N.isLessThan = N.lt = function(e, t) {
            return m(this, new Y(e,t)) < 0
        }
        ,
        N.isLessThanOrEqualTo = N.lte = function(e, t) {
            return -1 === (t = m(this, new Y(e,t))) || 0 === t
        }
        ,
        N.isNaN = function() {
            return !this.s
        }
        ,
        N.isNegative = function() {
            return this.s < 0
        }
        ,
        N.isPositive = function() {
            return this.s > 0
        }
        ,
        N.isZero = function() {
            return !!this.c && 0 == this.c[0]
        }
        ,
        N.minus = function(e, t) {
            var n, o, r, i, a = this, c = a.s;
            if (t = (e = new Y(e,t)).s,
            !c || !t)
                return new Y(NaN);
            if (c != t)
                return e.s = -t,
                a.plus(e);
            var u = a.e / l
              , d = e.e / l
              , f = a.c
              , h = e.c;
            if (!u || !d) {
                if (!f || !h)
                    return f ? (e.s = -t,
                    e) : new Y(h ? a : NaN);
                if (!f[0] || !h[0])
                    return h[0] ? (e.s = -t,
                    e) : new Y(f[0] ? a : 3 == V ? -0 : 0)
            }
            if (u = p(u),
            d = p(d),
            f = f.slice(),
            c = u - d) {
                for ((i = c < 0) ? (c = -c,
                r = f) : (d = u,
                r = h),
                r.reverse(),
                t = c; t--; r.push(0))
                    ;
                r.reverse()
            } else
                for (o = (i = (c = f.length) < (t = h.length)) ? c : t,
                c = t = 0; t < o; t++)
                    if (f[t] != h[t]) {
                        i = f[t] < h[t];
                        break
                    }
            if (i && (r = f,
            f = h,
            h = r,
            e.s = -e.s),
            (t = (o = h.length) - (n = f.length)) > 0)
                for (; t--; f[n++] = 0)
                    ;
            for (t = s - 1; o > c; ) {
                if (f[--o] < h[o]) {
                    for (n = o; n && !f[--n]; f[n] = t)
                        ;
                    --f[n],
                    f[o] += s
                }
                f[o] -= h[o]
            }
            for (; 0 == f[0]; f.splice(0, 1),
            --d)
                ;
            return f[0] ? q(e, f, d) : (e.s = 3 == V ? -1 : 1,
            e.c = [e.e = 0],
            e)
        }
        ,
        N.modulo = N.mod = function(e, t) {
            var n, o, r = this;
            return e = new Y(e,t),
            !r.c || !e.s || e.c && !e.c[0] ? new Y(NaN) : !e.c || r.c && !r.c[0] ? new Y(r) : (9 == P ? (o = e.s,
            e.s = 1,
            n = y(r, e, 0, 3),
            e.s = o,
            n.s *= o) : n = y(r, e, 0, P),
            (e = r.minus(n.times(e))).c[0] || 1 != P || (e.s = r.s),
            e)
        }
        ,
        N.multipliedBy = N.times = function(e, t) {
            var n, o, r, i, a, c, u, f, h, m, _, v, g, x, y, b = this, k = b.c, w = (e = new Y(e,t)).c;
            if (!(k && w && k[0] && w[0]))
                return !b.s || !e.s || k && !k[0] && !w || w && !w[0] && !k ? e.c = e.e = e.s = null : (e.s *= b.s,
                k && w ? (e.c = [0],
                e.e = 0) : e.c = e.e = null),
                e;
            for (o = p(b.e / l) + p(e.e / l),
            e.s *= b.s,
            (u = k.length) < (m = w.length) && (g = k,
            k = w,
            w = g,
            r = u,
            u = m,
            m = r),
            r = u + m,
            g = []; r--; g.push(0))
                ;
            for (x = s,
            y = d,
            r = m; --r >= 0; ) {
                for (n = 0,
                _ = w[r] % y,
                v = w[r] / y | 0,
                i = r + (a = u); i > r; )
                    n = ((f = _ * (f = k[--a] % y) + (c = v * f + (h = k[a] / y | 0) * _) % y * y + g[i] + n) / x | 0) + (c / y | 0) + v * h,
                    g[i--] = f % x;
                g[i] = n
            }
            return n ? ++o : g.splice(0, 1),
            q(e, g, o)
        }
        ,
        N.negated = function() {
            var e = new Y(this);
            return e.s = -e.s || null,
            e
        }
        ,
        N.plus = function(e, t) {
            var n, o = this, r = o.s;
            if (t = (e = new Y(e,t)).s,
            !r || !t)
                return new Y(NaN);
            if (r != t)
                return e.s = -t,
                o.minus(e);
            var i = o.e / l
              , a = e.e / l
              , c = o.c
              , u = e.c;
            if (!i || !a) {
                if (!c || !u)
                    return new Y(r / 0);
                if (!c[0] || !u[0])
                    return u[0] ? e : new Y(c[0] ? o : 0 * r)
            }
            if (i = p(i),
            a = p(a),
            c = c.slice(),
            r = i - a) {
                for (r > 0 ? (a = i,
                n = u) : (r = -r,
                n = c),
                n.reverse(); r--; n.push(0))
                    ;
                n.reverse()
            }
            for ((r = c.length) - (t = u.length) < 0 && (n = u,
            u = c,
            c = n,
            t = r),
            r = 0; t; )
                r = (c[--t] = c[t] + u[t] + r) / s | 0,
                c[t] = s === c[t] ? 0 : c[t] % s;
            return r && (c = [r].concat(c),
            ++a),
            q(e, c, a)
        }
        ,
        N.precision = N.sd = function(e, t) {
            var n, o, r, i = this;
            if (null != e && e !== !!e)
                return _(e, 1, f),
                null == t ? t = V : _(t, 0, 8),
                G(new Y(i), e, t);
            if (!(n = i.c))
                return null;
            if (o = (r = n.length - 1) * l + 1,
            r = n[r]) {
                for (; r % 10 == 0; r /= 10,
                o--)
                    ;
                for (r = n[0]; r >= 10; r /= 10,
                o++)
                    ;
            }
            return e && i.e + 1 > o && (o = i.e + 1),
            o
        }
        ,
        N.shiftedBy = function(e) {
            return _(e, -9007199254740991, c),
            this.times("1e" + e)
        }
        ,
        N.squareRoot = N.sqrt = function() {
            var e, t, n, o, r, i = this, a = i.c, s = i.s, l = i.e, c = O + 4, u = new Y("0.5");
            if (1 !== s || !a || !a[0])
                return new Y(!s || s < 0 && (!a || a[0]) ? NaN : a ? i : 1 / 0);
            if (0 == (s = Math.sqrt(+W(i))) || s == 1 / 0 ? (((t = h(a)).length + l) % 2 == 0 && (t += "0"),
            s = Math.sqrt(+t),
            l = p((l + 1) / 2) - (l < 0 || l % 2),
            n = new Y(t = s == 1 / 0 ? "5e" + l : (t = s.toExponential()).slice(0, t.indexOf("e") + 1) + l)) : n = new Y(s + ""),
            n.c[0])
                for ((s = (l = n.e) + c) < 3 && (s = 0); ; )
                    if (r = n,
                    n = u.times(r.plus(y(i, r, c, 1))),
                    h(r.c).slice(0, s) === (t = h(n.c)).slice(0, s)) {
                        if (n.e < l && --s,
                        "9999" != (t = t.slice(s - 3, s + 1)) && (o || "4999" != t)) {
                            +t && (+t.slice(1) || "5" != t.charAt(0)) || (G(n, n.e + O + 2, 1),
                            e = !n.times(n).eq(i));
                            break
                        }
                        if (!o && (G(r, r.e + O + 2, 0),
                        r.times(r).eq(i))) {
                            n = r;
                            break
                        }
                        c += 4,
                        s += 4,
                        o = 1
                    }
            return G(n, n.e + O + 1, V, e)
        }
        ,
        N.toExponential = function(e, t) {
            return null != e && (_(e, 0, f),
            e++),
            z(this, e, t, 1)
        }
        ,
        N.toFixed = function(e, t) {
            return null != e && (_(e, 0, f),
            e = e + this.e + 1),
            z(this, e, t)
        }
        ,
        N.toFormat = function(e, t, n) {
            var o, r = this;
            if (null == n)
                null != e && t && "object" == typeof t ? (n = t,
                t = null) : e && "object" == typeof e ? (n = e,
                e = t = null) : n = U;
            else if ("object" != typeof n)
                throw Error(i + "Argument not an object: " + n);
            if (o = r.toFixed(e, t),
            r.c) {
                var a, s = o.split("."), l = +n.groupSize, c = +n.secondaryGroupSize, u = n.groupSeparator || "", d = s[0], f = s[1], p = r.s < 0, h = p ? d.slice(1) : d, m = h.length;
                if (c && (a = l,
                l = c,
                c = a,
                m -= a),
                l > 0 && m > 0) {
                    for (a = m % l || l,
                    d = h.substr(0, a); a < m; a += l)
                        d += u + h.substr(a, l);
                    c > 0 && (d += u + h.slice(a)),
                    p && (d = "-" + d)
                }
                o = f ? d + (n.decimalSeparator || "") + ((c = +n.fractionGroupSize) ? f.replace(new RegExp("\\d{" + c + "}\\B","g"), "$&" + (n.fractionGroupSeparator || "")) : f) : d
            }
            return (n.prefix || "") + o + (n.suffix || "")
        }
        ,
        N.toFraction = function(e) {
            var t, n, o, r, a, s, c, d, f, p, m, _, v = this, g = v.c;
            if (null != e && (!(c = new Y(e)).isInteger() && (c.c || 1 !== c.s) || c.lt(A)))
                throw Error(i + "Argument " + (c.isInteger() ? "out of range: " : "not an integer: ") + W(c));
            if (!g)
                return new Y(v);
            for (t = new Y(A),
            f = n = new Y(A),
            o = d = new Y(A),
            _ = h(g),
            a = t.e = _.length - v.e - 1,
            t.c[0] = u[(s = a % l) < 0 ? l + s : s],
            e = !e || c.comparedTo(t) > 0 ? a > 0 ? t : f : c,
            s = j,
            j = 1 / 0,
            c = new Y(_),
            d.c[0] = 0; p = y(c, t, 0, 1),
            1 != (r = n.plus(p.times(o))).comparedTo(e); )
                n = o,
                o = r,
                f = d.plus(p.times(r = f)),
                d = r,
                t = c.minus(p.times(r = t)),
                c = r;
            return r = y(e.minus(n), o, 0, 1),
            d = d.plus(r.times(f)),
            n = n.plus(r.times(o)),
            d.s = f.s = v.s,
            m = y(f, o, a *= 2, V).minus(v).abs().comparedTo(y(d, n, a, V).minus(v).abs()) < 1 ? [f, o] : [d, n],
            j = s,
            m
        }
        ,
        N.toNumber = function() {
            return +W(this)
        }
        ,
        N.toPrecision = function(e, t) {
            return null != e && _(e, 1, f),
            z(this, e, t, 2)
        }
        ,
        N.toString = function(e) {
            var t, n = this, o = n.s, r = n.e;
            return null === r ? o ? (t = "Infinity",
            o < 0 && (t = "-" + t)) : t = "NaN" : (null == e ? t = r <= D || r >= R ? g(h(n.c), r) : x(h(n.c), r, "0") : 10 === e && K ? t = x(h((n = G(new Y(n), O + r + 1, V)).c), n.e, "0") : (_(e, 2, M.length, "Base"),
            t = b(x(h(n.c), r, "0"), 10, e, o, !0)),
            o < 0 && n.c[0] && (t = "-" + t)),
            t
        }
        ,
        N.valueOf = N.toJSON = function() {
            return W(this)
        }
        ,
        N._isBigNumber = !0,
        null != t && Y.set(t),
        Y
    }(),
    t.default = t.BigNumber = t,
    module.exports ? module.exports = t : (e || (e = "undefined" != typeof self && self ? self : window),
    e.BigNumber = t)
}(commonjsGlobal);
var bignumberExports = bignumber.exports, BigNumber2, JSON2;
BigNumber2 = bignumberExports,
JSON2 = stringify.exports,
function() {
    var e, t, n, o = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, r = {
        "\b": "\\b",
        "\t": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\"
    };
    function i(e) {
        return o.lastIndex = 0,
        o.test(e) ? '"' + e.replace(o, (function(e) {
            var t = r[e];
            return "string" == typeof t ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
        }
        )) + '"' : '"' + e + '"'
    }
    function a(o, r) {
        var s, l, c, u, d, f = e, p = r[o], h = null != p && (p instanceof BigNumber2 || BigNumber2.isBigNumber(p));
        switch (p && "object" == typeof p && "function" == typeof p.toJSON && (p = p.toJSON(o)),
        "function" == typeof n && (p = n.call(r, o, p)),
        typeof p) {
        case "string":
            return h ? p : i(p);
        case "number":
            return isFinite(p) ? String(p) : "null";
        case "boolean":
        case "null":
        case "bigint":
            return String(p);
        case "object":
            if (!p)
                return "null";
            if (e += t,
            d = [],
            "[object Array]" === Object.prototype.toString.apply(p)) {
                for (u = p.length,
                s = 0; s < u; s += 1)
                    d[s] = a(s, p) || "null";
                return c = 0 === d.length ? "[]" : e ? "[\n" + e + d.join(",\n" + e) + "\n" + f + "]" : "[" + d.join(",") + "]",
                e = f,
                c
            }
            if (n && "object" == typeof n)
                for (u = n.length,
                s = 0; s < u; s += 1)
                    "string" == typeof n[s] && (c = a(l = n[s], p)) && d.push(i(l) + (e ? ": " : ":") + c);
            else
                Object.keys(p).forEach((function(t) {
                    var n = a(t, p);
                    n && d.push(i(t) + (e ? ": " : ":") + n)
                }
                ));
            return c = 0 === d.length ? "{}" : e ? "{\n" + e + d.join(",\n" + e) + "\n" + f + "}" : "{" + d.join(",") + "}",
            e = f,
            c
        }
    }
    "function" != typeof JSON2.stringify && (JSON2.stringify = function(o, r, i) {
        var s;
        if (e = "",
        t = "",
        "number" == typeof i)
            for (s = 0; s < i; s += 1)
                t += " ";
        else
            "string" == typeof i && (t = i);
        if (n = r,
        r && "function" != typeof r && ("object" != typeof r || "number" != typeof r.length))
            throw new Error("JSON.stringify");
        return a("", {
            "": o
        })
    }
    )
}();
var stringifyExports = stringify.exports
  , BigNumber = null;
const suspectProtoRx = /(?:_|\\u005[Ff])(?:_|\\u005[Ff])(?:p|\\u0070)(?:r|\\u0072)(?:o|\\u006[Ff])(?:t|\\u0074)(?:o|\\u006[Ff])(?:_|\\u005[Ff])(?:_|\\u005[Ff])/
  , suspectConstructorRx = /(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)/;
var json_parse$1 = function(e) {
    var t = {
        strict: !1,
        storeAsString: !1,
        alwaysParseAsBig: !1,
        useNativeBigInt: !1,
        protoAction: "error",
        constructorAction: "error"
    };
    if (null != e) {
        if (!0 === e.strict && (t.strict = !0),
        !0 === e.storeAsString && (t.storeAsString = !0),
        t.alwaysParseAsBig = !0 === e.alwaysParseAsBig && e.alwaysParseAsBig,
        t.useNativeBigInt = !0 === e.useNativeBigInt && e.useNativeBigInt,
        void 0 !== e.constructorAction) {
            if ("error" !== e.constructorAction && "ignore" !== e.constructorAction && "preserve" !== e.constructorAction)
                throw new Error('Incorrect value for constructorAction option, must be "error", "ignore" or undefined but passed '.concat(e.constructorAction));
            t.constructorAction = e.constructorAction
        }
        if (void 0 !== e.protoAction) {
            if ("error" !== e.protoAction && "ignore" !== e.protoAction && "preserve" !== e.protoAction)
                throw new Error('Incorrect value for protoAction option, must be "error", "ignore" or undefined but passed '.concat(e.protoAction));
            t.protoAction = e.protoAction
        }
    }
    var n, o, r, i, a = {
        '"': '"',
        "\\": "\\",
        "/": "/",
        b: "\b",
        f: "\f",
        n: "\n",
        r: "\r",
        t: "\t"
    }, s = function(e) {
        throw {
            name: "SyntaxError",
            message: e,
            at: n,
            text: r
        }
    }, l = function(e) {
        return e && e !== o && s("Expected '" + e + "' instead of '" + o + "'"),
        o = r.charAt(n),
        n += 1,
        o
    }, c = function() {
        var e, n = "";
        for ("-" === o && (n = "-",
        l("-")); o >= "0" && o <= "9"; )
            n += o,
            l();
        if ("." === o)
            for (n += "."; l() && o >= "0" && o <= "9"; )
                n += o;
        if ("e" === o || "E" === o)
            for (n += o,
            l(),
            "-" !== o && "+" !== o || (n += o,
            l()); o >= "0" && o <= "9"; )
                n += o,
                l();
        if (e = +n,
        isFinite(e))
            return null == BigNumber && (BigNumber = bignumberExports),
            n.length > 15 ? t.storeAsString ? n : t.useNativeBigInt ? BigInt(n) : new BigNumber(n) : t.alwaysParseAsBig ? t.useNativeBigInt ? BigInt(e) : new BigNumber(e) : e;
        s("Bad number")
    }, u = function() {
        var e, t, i, c = "";
        if ('"' === o)
            for (var u = n; l(); ) {
                if ('"' === o)
                    return n - 1 > u && (c += r.substring(u, n - 1)),
                    l(),
                    c;
                if ("\\" === o) {
                    if (n - 1 > u && (c += r.substring(u, n - 1)),
                    l(),
                    "u" === o) {
                        for (i = 0,
                        t = 0; t < 4 && (e = parseInt(l(), 16),
                        isFinite(e)); t += 1)
                            i = 16 * i + e;
                        c += String.fromCharCode(i)
                    } else {
                        if ("string" != typeof a[o])
                            break;
                        c += a[o]
                    }
                    u = n
                }
            }
        s("Bad string")
    }, d = function() {
        for (; o && o <= " "; )
            l()
    };
    return i = function() {
        switch (d(),
        o) {
        case "{":
            return function() {
                var e, n = Object.create(null);
                if ("{" === o) {
                    if (l("{"),
                    d(),
                    "}" === o)
                        return l("}"),
                        n;
                    for (; o; ) {
                        if (e = u(),
                        d(),
                        l(":"),
                        !0 === t.strict && Object.hasOwnProperty.call(n, e) && s('Duplicate key "' + e + '"'),
                        !0 === suspectProtoRx.test(e) ? "error" === t.protoAction ? s("Object contains forbidden prototype property") : "ignore" === t.protoAction ? i() : n[e] = i() : !0 === suspectConstructorRx.test(e) ? "error" === t.constructorAction ? s("Object contains forbidden constructor property") : "ignore" === t.constructorAction ? i() : n[e] = i() : n[e] = i(),
                        d(),
                        "}" === o)
                            return l("}"),
                            n;
                        l(","),
                        d()
                    }
                }
                s("Bad object")
            }();
        case "[":
            return function() {
                var e = [];
                if ("[" === o) {
                    if (l("["),
                    d(),
                    "]" === o)
                        return l("]"),
                        e;
                    for (; o; ) {
                        if (e.push(i()),
                        d(),
                        "]" === o)
                            return l("]"),
                            e;
                        l(","),
                        d()
                    }
                }
                s("Bad array")
            }();
        case '"':
            return u();
        case "-":
            return c();
        default:
            return o >= "0" && o <= "9" ? c() : function() {
                switch (o) {
                case "t":
                    return l("t"),
                    l("r"),
                    l("u"),
                    l("e"),
                    !0;
                case "f":
                    return l("f"),
                    l("a"),
                    l("l"),
                    l("s"),
                    l("e"),
                    !1;
                case "n":
                    return l("n"),
                    l("u"),
                    l("l"),
                    l("l"),
                    null
                }
                s("Unexpected '" + o + "'")
            }()
        }
    }
    ,
    function(e, t) {
        var a;
        return r = e + "",
        n = 0,
        o = " ",
        a = i(),
        d(),
        o && s("Syntax error"),
        "function" == typeof t ? function e(n, o) {
            var r, i = n[o];
            return i && "object" == typeof i && Object.keys(i).forEach((function(t) {
                void 0 !== (r = e(i, t)) ? i[t] = r : delete i[t]
            }
            )),
            t.call(n, o, i)
        }({
            "": a
        }, "") : a
    }
}
  , parse = json_parse$1
  , json_stringify = stringifyExports.stringify
  , json_parse = parse;
jsonBigint.exports = function(e) {
    return {
        parse: json_parse(e),
        stringify: json_stringify
    }
}
,
jsonBigint.exports.parse = json_parse(),
jsonBigint.exports.stringify = json_stringify;
var jsonBigintExports = jsonBigint.exports;
const JSONBig = getDefaultExportFromCjs(jsonBigintExports);
function _toConsumableArray(e) {
    return _arrayWithoutHoles(e) || _iterableToArray(e) || _unsupportedIterableToArray(e) || _nonIterableSpread()
}
function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
}
function _iterableToArray(e) {
    if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"])
        return Array.from(e)
}
function _arrayWithoutHoles(e) {
    if (Array.isArray(e))
        return _arrayLikeToArray(e)
}
function _regeneratorRuntime() {
    /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
    _regeneratorRuntime = function() {
        return e
    }
    ;
    var e = {}
      , t = Object.prototype
      , n = t.hasOwnProperty
      , o = Object.defineProperty || function(e, t, n) {
        e[t] = n.value
    }
      , r = "function" == typeof Symbol ? Symbol : {}
      , i = r.iterator || "@@iterator"
      , a = r.asyncIterator || "@@asyncIterator"
      , s = r.toStringTag || "@@toStringTag";
    function l(e, t, n) {
        return Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }),
        e[t]
    }
    try {
        l({}, "")
    } catch (T) {
        l = function(e, t, n) {
            return e[t] = n
        }
    }
    function c(e, t, n, r) {
        var i = t && t.prototype instanceof f ? t : f
          , a = Object.create(i.prototype)
          , s = new S(r || []);
        return o(a, "_invoke", {
            value: b(e, n, s)
        }),
        a
    }
    function u(e, t, n) {
        try {
            return {
                type: "normal",
                arg: e.call(t, n)
            }
        } catch (o) {
            return {
                type: "throw",
                arg: o
            }
        }
    }
    e.wrap = c;
    var d = {};
    function f() {}
    function p() {}
    function h() {}
    var m = {};
    l(m, i, (function() {
        return this
    }
    ));
    var _ = Object.getPrototypeOf
      , v = _ && _(_(C([])));
    v && v !== t && n.call(v, i) && (m = v);
    var g = h.prototype = f.prototype = Object.create(m);
    function x(e) {
        ["next", "throw", "return"].forEach((function(t) {
            l(e, t, (function(e) {
                return this._invoke(t, e)
            }
            ))
        }
        ))
    }
    function y(e, t) {
        function r(o, i, a, s) {
            var l = u(e[o], e, i);
            if ("throw" !== l.type) {
                var c = l.arg
                  , d = c.value;
                return d && "object" == _typeof(d) && n.call(d, "__await") ? t.resolve(d.__await).then((function(e) {
                    r("next", e, a, s)
                }
                ), (function(e) {
                    r("throw", e, a, s)
                }
                )) : t.resolve(d).then((function(e) {
                    c.value = e,
                    a(c)
                }
                ), (function(e) {
                    return r("throw", e, a, s)
                }
                ))
            }
            s(l.arg)
        }
        var i;
        o(this, "_invoke", {
            value: function(e, n) {
                function o() {
                    return new t((function(t, o) {
                        r(e, n, t, o)
                    }
                    ))
                }
                return i = i ? i.then(o, o) : o()
            }
        })
    }
    function b(e, t, n) {
        var o = "suspendedStart";
        return function(r, i) {
            if ("executing" === o)
                throw new Error("Generator is already running");
            if ("completed" === o) {
                if ("throw" === r)
                    throw i;
                return {
                    value: void 0,
                    done: !0
                }
            }
            for (n.method = r,
            n.arg = i; ; ) {
                var a = n.delegate;
                if (a) {
                    var s = k(a, n);
                    if (s) {
                        if (s === d)
                            continue;
                        return s
                    }
                }
                if ("next" === n.method)
                    n.sent = n._sent = n.arg;
                else if ("throw" === n.method) {
                    if ("suspendedStart" === o)
                        throw o = "completed",
                        n.arg;
                    n.dispatchException(n.arg)
                } else
                    "return" === n.method && n.abrupt("return", n.arg);
                o = "executing";
                var l = u(e, t, n);
                if ("normal" === l.type) {
                    if (o = n.done ? "completed" : "suspendedYield",
                    l.arg === d)
                        continue;
                    return {
                        value: l.arg,
                        done: n.done
                    }
                }
                "throw" === l.type && (o = "completed",
                n.method = "throw",
                n.arg = l.arg)
            }
        }
    }
    function k(e, t) {
        var n = t.method
          , o = e.iterator[n];
        if (void 0 === o)
            return t.delegate = null,
            "throw" === n && e.iterator.return && (t.method = "return",
            t.arg = void 0,
            k(e, t),
            "throw" === t.method) || "return" !== n && (t.method = "throw",
            t.arg = new TypeError("The iterator does not provide a '" + n + "' method")),
            d;
        var r = u(o, e.iterator, t.arg);
        if ("throw" === r.type)
            return t.method = "throw",
            t.arg = r.arg,
            t.delegate = null,
            d;
        var i = r.arg;
        return i ? i.done ? (t[e.resultName] = i.value,
        t.next = e.nextLoc,
        "return" !== t.method && (t.method = "next",
        t.arg = void 0),
        t.delegate = null,
        d) : i : (t.method = "throw",
        t.arg = new TypeError("iterator result is not an object"),
        t.delegate = null,
        d)
    }
    function w(e) {
        var t = {
            tryLoc: e[0]
        };
        1 in e && (t.catchLoc = e[1]),
        2 in e && (t.finallyLoc = e[2],
        t.afterLoc = e[3]),
        this.tryEntries.push(t)
    }
    function E(e) {
        var t = e.completion || {};
        t.type = "normal",
        delete t.arg,
        e.completion = t
    }
    function S(e) {
        this.tryEntries = [{
            tryLoc: "root"
        }],
        e.forEach(w, this),
        this.reset(!0)
    }
    function C(e) {
        if (e) {
            var t = e[i];
            if (t)
                return t.call(e);
            if ("function" == typeof e.next)
                return e;
            if (!isNaN(e.length)) {
                var o = -1
                  , r = function t() {
                    for (; ++o < e.length; )
                        if (n.call(e, o))
                            return t.value = e[o],
                            t.done = !1,
                            t;
                    return t.value = void 0,
                    t.done = !0,
                    t
                };
                return r.next = r
            }
        }
        return {
            next: B
        }
    }
    function B() {
        return {
            value: void 0,
            done: !0
        }
    }
    return p.prototype = h,
    o(g, "constructor", {
        value: h,
        configurable: !0
    }),
    o(h, "constructor", {
        value: p,
        configurable: !0
    }),
    p.displayName = l(h, s, "GeneratorFunction"),
    e.isGeneratorFunction = function(e) {
        var t = "function" == typeof e && e.constructor;
        return !!t && (t === p || "GeneratorFunction" === (t.displayName || t.name))
    }
    ,
    e.mark = function(e) {
        return Object.setPrototypeOf ? Object.setPrototypeOf(e, h) : (e.__proto__ = h,
        l(e, s, "GeneratorFunction")),
        e.prototype = Object.create(g),
        e
    }
    ,
    e.awrap = function(e) {
        return {
            __await: e
        }
    }
    ,
    x(y.prototype),
    l(y.prototype, a, (function() {
        return this
    }
    )),
    e.AsyncIterator = y,
    e.async = function(t, n, o, r, i) {
        void 0 === i && (i = Promise);
        var a = new y(c(t, n, o, r),i);
        return e.isGeneratorFunction(n) ? a : a.next().then((function(e) {
            return e.done ? e.value : a.next()
        }
        ))
    }
    ,
    x(g),
    l(g, s, "Generator"),
    l(g, i, (function() {
        return this
    }
    )),
    l(g, "toString", (function() {
        return "[object Generator]"
    }
    )),
    e.keys = function(e) {
        var t = Object(e)
          , n = [];
        for (var o in t)
            n.push(o);
        return n.reverse(),
        function e() {
            for (; n.length; ) {
                var o = n.pop();
                if (o in t)
                    return e.value = o,
                    e.done = !1,
                    e
            }
            return e.done = !0,
            e
        }
    }
    ,
    e.values = C,
    S.prototype = {
        constructor: S,
        reset: function(e) {
            if (this.prev = 0,
            this.next = 0,
            this.sent = this._sent = void 0,
            this.done = !1,
            this.delegate = null,
            this.method = "next",
            this.arg = void 0,
            this.tryEntries.forEach(E),
            !e)
                for (var t in this)
                    "t" === t.charAt(0) && n.call(this, t) && !isNaN(+t.slice(1)) && (this[t] = void 0)
        },
        stop: function() {
            this.done = !0;
            var e = this.tryEntries[0].completion;
            if ("throw" === e.type)
                throw e.arg;
            return this.rval
        },
        dispatchException: function(e) {
            if (this.done)
                throw e;
            var t = this;
            function o(n, o) {
                return a.type = "throw",
                a.arg = e,
                t.next = n,
                o && (t.method = "next",
                t.arg = void 0),
                !!o
            }
            for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                var i = this.tryEntries[r]
                  , a = i.completion;
                if ("root" === i.tryLoc)
                    return o("end");
                if (i.tryLoc <= this.prev) {
                    var s = n.call(i, "catchLoc")
                      , l = n.call(i, "finallyLoc");
                    if (s && l) {
                        if (this.prev < i.catchLoc)
                            return o(i.catchLoc, !0);
                        if (this.prev < i.finallyLoc)
                            return o(i.finallyLoc)
                    } else if (s) {
                        if (this.prev < i.catchLoc)
                            return o(i.catchLoc, !0)
                    } else {
                        if (!l)
                            throw new Error("try statement without catch or finally");
                        if (this.prev < i.finallyLoc)
                            return o(i.finallyLoc)
                    }
                }
            }
        },
        abrupt: function(e, t) {
            for (var o = this.tryEntries.length - 1; o >= 0; --o) {
                var r = this.tryEntries[o];
                if (r.tryLoc <= this.prev && n.call(r, "finallyLoc") && this.prev < r.finallyLoc) {
                    var i = r;
                    break
                }
            }
            i && ("break" === e || "continue" === e) && i.tryLoc <= t && t <= i.finallyLoc && (i = null);
            var a = i ? i.completion : {};
            return a.type = e,
            a.arg = t,
            i ? (this.method = "next",
            this.next = i.finallyLoc,
            d) : this.complete(a)
        },
        complete: function(e, t) {
            if ("throw" === e.type)
                throw e.arg;
            return "break" === e.type || "continue" === e.type ? this.next = e.arg : "return" === e.type ? (this.rval = this.arg = e.arg,
            this.method = "return",
            this.next = "end") : "normal" === e.type && t && (this.next = t),
            d
        },
        finish: function(e) {
            for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                var n = this.tryEntries[t];
                if (n.finallyLoc === e)
                    return this.complete(n.completion, n.afterLoc),
                    E(n),
                    d
            }
        },
        catch: function(e) {
            for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                var n = this.tryEntries[t];
                if (n.tryLoc === e) {
                    var o = n.completion;
                    if ("throw" === o.type) {
                        var r = o.arg;
                        E(n)
                    }
                    return r
                }
            }
            throw new Error("illegal catch attempt")
        },
        delegateYield: function(e, t, n) {
            return this.delegate = {
                iterator: C(e),
                resultName: t,
                nextLoc: n
            },
            "next" === this.method && (this.arg = void 0),
            d
        }
    },
    e
}
function asyncGeneratorStep(e, t, n, o, r, i, a) {
    try {
        var s = e[i](a)
          , l = s.value
    } catch (c) {
        return void n(c)
    }
    s.done ? t(l) : Promise.resolve(l).then(o, r)
}
function _asyncToGenerator(e) {
    return function() {
        var t = this
          , n = arguments;
        return new Promise((function(o, r) {
            var i = e.apply(t, n);
            function a(e) {
                asyncGeneratorStep(i, o, r, a, s, "next", e)
            }
            function s(e) {
                asyncGeneratorStep(i, o, r, a, s, "throw", e)
            }
            a(void 0)
        }
        ))
    }
}
function ownKeys(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        t && (o = o.filter((function(t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable
        }
        ))),
        n.push.apply(n, o)
    }
    return n
}
function _objectSpread(e) {
    for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2 ? ownKeys(Object(n), !0).forEach((function(t) {
            _defineProperty(e, t, n[t])
        }
        )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ownKeys(Object(n)).forEach((function(t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
        }
        ))
    }
    return e
}
function _defineProperty(e, t, n) {
    return (t = _toPropertyKey(t))in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n,
    e
}
function _defineProperties(e, t) {
    for (var n = 0; n < t.length; n++) {
        var o = t[n];
        o.enumerable = o.enumerable || !1,
        o.configurable = !0,
        "value"in o && (o.writable = !0),
        Object.defineProperty(e, _toPropertyKey(o.key), o)
    }
}
function _createClass(e, t, n) {
    return t && _defineProperties(e.prototype, t),
    n && _defineProperties(e, n),
    Object.defineProperty(e, "prototype", {
        writable: !1
    }),
    e
}
function _toPropertyKey(e) {
    var t = _toPrimitive(e, "string");
    return "symbol" === _typeof(t) ? t : String(t)
}
function _toPrimitive(e, t) {
    if ("object" !== _typeof(e) || null === e)
        return e;
    var n = e[Symbol.toPrimitive];
    if (void 0 !== n) {
        var o = n.call(e, t || "default");
        if ("object" !== _typeof(o))
            return o;
        throw new TypeError("@@toPrimitive must return a primitive value.")
    }
    return ("string" === t ? String : Number)(e)
}
function _classCallCheck(e, t) {
    if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function")
}
function _inherits(e, t) {
    if ("function" != typeof t && null !== t)
        throw new TypeError("Super expression must either be null or a function");
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            writable: !0,
            configurable: !0
        }
    }),
    Object.defineProperty(e, "prototype", {
        writable: !1
    }),
    t && _setPrototypeOf(e, t)
}
function _createSuper(e) {
    var t = _isNativeReflectConstruct();
    return function() {
        var n, o = _getPrototypeOf(e);
        if (t) {
            var r = _getPrototypeOf(this).constructor;
            n = Reflect.construct(o, arguments, r)
        } else
            n = o.apply(this, arguments);
        return _possibleConstructorReturn(this, n)
    }
}
function _possibleConstructorReturn(e, t) {
    if (t && ("object" === _typeof(t) || "function" == typeof t))
        return t;
    if (void 0 !== t)
        throw new TypeError("Derived constructors may only return object or undefined");
    return _assertThisInitialized(e)
}
function _assertThisInitialized(e) {
    if (void 0 === e)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e
}
function _wrapNativeSuper(e) {
    var t = "function" == typeof Map ? new Map : void 0;
    return _wrapNativeSuper = function(e) {
        if (null === e || !_isNativeFunction(e))
            return e;
        if ("function" != typeof e)
            throw new TypeError("Super expression must either be null or a function");
        if (void 0 !== t) {
            if (t.has(e))
                return t.get(e);
            t.set(e, n)
        }
        function n() {
            return _construct(e, arguments, _getPrototypeOf(this).constructor)
        }
        return n.prototype = Object.create(e.prototype, {
            constructor: {
                value: n,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        _setPrototypeOf(n, e)
    }
    ,
    _wrapNativeSuper(e)
}
function _construct(e, t, n) {
    return (_construct = _isNativeReflectConstruct() ? Reflect.construct.bind() : function(e, t, n) {
        var o = [null];
        o.push.apply(o, t);
        var r = new (Function.bind.apply(e, o));
        return n && _setPrototypeOf(r, n.prototype),
        r
    }
    ).apply(null, arguments)
}
function _isNativeReflectConstruct() {
    if ("undefined" == typeof Reflect || !Reflect.construct || Reflect.construct.sham)
        return !1;
    if ("function" == typeof Proxy)
        return !0;
    try {
        return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}
        ))),
        !0
    } catch (a33) {
        return !1
    }
}
function _isNativeFunction(e) {
    return -1 !== Function.toString.call(e).indexOf("[native code]")
}
function _setPrototypeOf(e, t) {
    return (_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) {
        return e.__proto__ = t,
        e
    }
    )(e, t)
}
function _getPrototypeOf(e) {
    return (_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
        return e.__proto__ || Object.getPrototypeOf(e)
    }
    )(e)
}
function _typeof(e) {
    return (_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
    }
    : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    }
    )(e)
}
function _slicedToArray(e, t) {
    return _arrayWithHoles(e) || _iterableToArrayLimit(e, t) || _unsupportedIterableToArray(e, t) || _nonIterableRest()
}
function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
}
function _iterableToArrayLimit(e, t) {
    var n = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
    if (null != n) {
        var o, r, i, a, s = [], l = !0, c = !1;
        try {
            if (i = (n = n.call(e)).next,
            0 === t) {
                if (Object(n) !== n)
                    return;
                l = !1
            } else
                for (; !(l = (o = i.call(n)).done) && (s.push(o.value),
                s.length !== t); l = !0)
                    ;
        } catch (u) {
            c = !0,
            r = u
        } finally {
            try {
                if (!l && null != n.return && (a = n.return(),
                Object(a) !== a))
                    return
            } finally {
                if (c)
                    throw r
            }
        }
        return s
    }
}
function _arrayWithHoles(e) {
    if (Array.isArray(e))
        return e
}
function _createForOfIteratorHelper(e, t) {
    var n = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
    if (!n) {
        if (Array.isArray(e) || (n = _unsupportedIterableToArray(e)) || t && e && "number" == typeof e.length) {
            n && (e = n);
            var o = 0
              , r = function() {};
            return {
                s: r,
                n: function() {
                    return o >= e.length ? {
                        done: !0
                    } : {
                        done: !1,
                        value: e[o++]
                    }
                },
                e: function(e) {
                    throw e
                },
                f: r
            }
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
    }
    var i, a = !0, s = !1;
    return {
        s: function() {
            n = n.call(e)
        },
        n: function() {
            var e = n.next();
            return a = e.done,
            e
        },
        e: function(e) {
            s = !0,
            i = e
        },
        f: function() {
            try {
                !a && null != n.return && n.return()
            } finally {
                if (s)
                    throw i
            }
        }
    }
}
function _unsupportedIterableToArray(e, t) {
    if (e) {
        if ("string" == typeof e)
            return _arrayLikeToArray(e, t);
        var n = Object.prototype.toString.call(e).slice(8, -1);
        if ("Object" === n && e.constructor && (n = e.constructor.name),
        "Map" === n || "Set" === n)
            return Array.from(e);
        if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
            return _arrayLikeToArray(e, t)
    }
}
function _arrayLikeToArray(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var n = 0, o = new Array(t); n < t; n++)
        o[n] = e[n];
    return o
}
var _sfc_main$1p = defineComponent({
    __name: "BottomButton",
    props: {
        tag: {
            default: "button"
        },
        type: {
            default: "primary"
        },
        disabled: {
            type: Boolean
        }
    },
    setup: function(e) {
        return function(t, n) {
            return openBlock(),
            createBlock(resolveDynamicComponent(e.tag), {
                class: normalizeClass([[e.type], "font-medium px-32px rounded-36px h-48px inline-flex items-center justify-center text-s1 sm:h-64px sm:text-rh5"]),
                disabled: e.disabled
            }, {
                default: withCtx((function() {
                    return [renderSlot(t.$slots, "default", {}, void 0, !0)]
                }
                )),
                _: 3
            }, 8, ["class", "disabled"])
        }
    }
})
  , _export_sfc = function(e, t) {
    var n, o = e.__vccOpts || e, r = _createForOfIteratorHelper(t);
    try {
        for (r.s(); !(n = r.n()).done; ) {
            var i = _slicedToArray(n.value, 2)
              , a = i[0]
              , s = i[1];
            o[a] = s
        }
    } catch (l) {
        r.e(l)
    } finally {
        r.f()
    }
    return o
}
  , BottomButton = _export_sfc(_sfc_main$1p, [["__scopeId", "data-v-f679a65e"]])
  , _hoisted_1$19 = {
    key: 0,
    class: "icon-loading animate-spin text-16px mx-auto"
}
  , _sfc_main$1o = defineComponent({
    __name: "Button",
    props: {
        tag: {
            default: "button"
        },
        size: {
            default: "regular"
        },
        shape: {
            default: "round"
        },
        type: {
            default: "primary"
        },
        disabled: {
            type: Boolean
        },
        loading: {
            type: Boolean,
            default: !1
        }
    },
    setup: function(e) {
        return function(t, n) {
            return openBlock(),
            createBlock(resolveDynamicComponent(e.tag), {
                class: normalizeClass(["font-medium flex-shrink-0 flex items-center justify-center", [e.size, e.shape, e.type, e.loading && "loading"]]),
                disabled: e.disabled || e.loading || void 0
            }, {
                default: withCtx((function() {
                    return [e.loading ? (openBlock(),
                    createElementBlock("div", _hoisted_1$19)) : renderSlot(t.$slots, "default", {
                        key: 1
                    }, void 0, !0)]
                }
                )),
                _: 3
            }, 8, ["class", "disabled"])
        }
    }
})
  , Button = _export_sfc(_sfc_main$1o, [["__scopeId", "data-v-5656d8e4"]])
  , _hoisted_1$18 = ["onClick"]
  , _hoisted_2$W = {
    class: "content"
}
  , _sfc_main$1n = defineComponent({
    __name: "DialogMask",
    props: {
        modelValue: {
            type: Boolean,
            default: !1
        }
    },
    emits: ["update:modelValue"],
    setup: function(e, t) {
        var n = t.emit
          , o = e
          , r = Date.now();
        function i() {
            Date.now() - r > 500 && n("update:modelValue", !1)
        }
        return watch((function() {
            return o.modelValue
        }
        ), (function(e) {
            e && (r = Date.now())
        }
        )),
        function(t, n) {
            return openBlock(),
            createBlock(Transition, {
                name: "dialog-fade",
                appear: ""
            }, {
                default: withCtx((function() {
                    return [e.modelValue ? (openBlock(),
                    createElementBlock("div", {
                        key: 0,
                        class: "fixed inset-0 bg-black-36 z-5 flex items-center justify-center",
                        onClick: withModifiers(i, ["stop", "self"]),
                        onTouchmove: n[0] || (n[0] = withModifiers((function() {}
                        ), ["stop", "prevent"]))
                    }, [createBaseVNode("div", _hoisted_2$W, [renderSlot(t.$slots, "default", {}, void 0, !0)])], 40, _hoisted_1$18)) : createCommentVNode("", !0)]
                }
                )),
                _: 3
            })
        }
    }
})
  , DialogMask = _export_sfc(_sfc_main$1n, [["__scopeId", "data-v-57d683c0"]])
  , _sfc_main$1m = {}
  , _hoisted_1$17 = {
    class: "bg-s-gray-100 w-28px h-28px rounded-1 flex items-center justify-center hover-24 active-10 p-0"
}
  , _hoisted_2$V = createBaseVNode("span", {
    class: "icon-close text-20px text-s-gray-400"
}, null, -1)
  , _hoisted_3$J = [_hoisted_2$V];
function _sfc_render$4(e, t) {
    return openBlock(),
    createElementBlock("button", _hoisted_1$17, _hoisted_3$J)
}
var CloseButton = _export_sfc(_sfc_main$1m, [["render", _sfc_render$4]])
  , _hoisted_1$16 = {
    class: "text-s-gray-900 text-rh6 sm:text-rh4 sm:justify-start font-medium flex items-center justify-center"
}
  , _hoisted_2$U = {
    key: 0,
    class: "icon-warning text-32px text-orange-red-500 mr-8px"
}
  , _hoisted_3$I = {
    class: "text-s-gray-500 text-bo4 mt-16px text-center sm:text-left sm:text-bo2"
}
  , _hoisted_4$B = {
    key: 0,
    class: "flex mt-24px sm:mt-40px sm:justify-end justify-between"
}
  , _sfc_main$1l = defineComponent({
    __name: "Dialog",
    props: {
        modelValue: {
            type: Boolean,
            default: !1
        },
        title: {
            default: ""
        },
        cancelText: {
            default: "取消"
        },
        confirmText: {
            default: "确认"
        },
        showActions: {
            type: Boolean,
            default: !0
        },
        classes: {
            default: ""
        },
        warning: {
            type: Boolean
        }
    },
    emits: ["update:modelValue", "confirm", "cancel"],
    setup: function(e, t) {
        var n = t.emit;
        function o(e) {
            n("update:modelValue", !1),
            n("confirm", e)
        }
        function r(e) {
            n("update:modelValue", !1),
            n("cancel", e)
        }
        return function(t, n) {
            return openBlock(),
            createBlock(DialogMask, {
                "model-value": e.modelValue,
                "onUpdate:modelValue": n[1] || (n[1] = function(e) {
                    return t.$emit("update:modelValue", e)
                }
                )
            }, {
                default: withCtx((function() {
                    return [createBaseVNode("div", {
                        class: normalizeClass([e.classes, "rounded-20px bg-sheet-b-bw-white p-24px pt-28px w-300px relative sm:p-32px sm:pb-24px sm:w-520px"])
                    }, [createBaseVNode("h2", _hoisted_1$16, [e.warning ? (openBlock(),
                    createElementBlock("span", _hoisted_2$U)) : createCommentVNode("", !0), createTextVNode(toDisplayString(e.title), 1), renderSlot(t.$slots, "title")]), createBaseVNode("p", _hoisted_3$I, [renderSlot(t.$slots, "default")]), e.showActions ? (openBlock(),
                    createElementBlock("div", _hoisted_4$B, [createVNode(Button, {
                        size: "large",
                        type: "secondary-r",
                        shape: "semicircle",
                        class: "!sm:px-29px <sm:flex-1 whitespace-nowrap",
                        onClick: withModifiers(r, ["stop"])
                    }, {
                        default: withCtx((function() {
                            return [createTextVNode(toDisplayString(e.cancelText), 1)]
                        }
                        )),
                        _: 1
                    }, 8, ["onClick"]), createVNode(Button, {
                        size: "large",
                        type: "primary",
                        shape: "semicircle",
                        class: "!sm:px-29px ml-16px <sm:flex-1 whitespace-nowrap",
                        onClick: withModifiers(o, ["stop"])
                    }, {
                        default: withCtx((function() {
                            return [createTextVNode(toDisplayString(e.confirmText), 1)]
                        }
                        )),
                        _: 1
                    }, 8, ["onClick"])])) : createCommentVNode("", !0), createVNode(CloseButton, {
                        class: "<sm:hidden absolute top-10px right-10px",
                        onClick: n[0] || (n[0] = function(e) {
                            return t.$emit("update:modelValue", !1)
                        }
                        )
                    })], 2)]
                }
                )),
                _: 3
            }, 8, ["model-value"])
        }
    }
})
  , ADAPTERS_KEY = Symbol("ADAPTERS_KEY")
  , USER_STATE_KEY = Symbol("USER_STATE_KEY")
  , FRONT_CONFIG_STATE_KEY = Symbol("FRONT_CONFIG_STATE_KEY")
  , BOOK_STATE_KEY = Symbol("BOOK_STATE_KEY")
  , RECOMMEND_BOOKS_STATE_KEY = Symbol("BOOK_STATE_KEY")
  , CHAPTER_LIST_STATE_KEY = Symbol("CHAPTER_LIST_STATE_KEY")
  , READER_STATE_KEY = Symbol("READER_STATE_KEY")
  , CONFIG_STATE_KEY = Symbol("CONFIG_STATE_KEY")
  , BUS_STATE_KEY = Symbol("BUS_STATE_KEY")
  , BOOKMARK_LIST_STATE_KEY = Symbol("BOOKMARK_LIST_STATE_KEY")
  , CHAPTERS_STATE_KEY = Symbol("CHAPTERS_STATE_KEY")
  , I18N_IO_FUNC_KEY = Symbol("I18N_IO_FUNC_KEY")
  , REVIEW_LIST_KEY = Symbol("REVIEW_LIST_KEY")
  , ROOT_SLOTS_KEY = Symbol("ROOT_SLOTS_KEY");
!function() {
    if ("object" === ("undefined" == typeof window ? "undefined" : _typeof(window)))
        if ("IntersectionObserver"in window && "IntersectionObserverEntry"in window && "intersectionRatio"in window.IntersectionObserverEntry.prototype)
            "isIntersecting"in window.IntersectionObserverEntry.prototype || Object.defineProperty(window.IntersectionObserverEntry.prototype, "isIntersecting", {
                get: function() {
                    return this.intersectionRatio > 0
                }
            });
        else {
            var e = function() {
                for (var e = window.document, t = r(e); t; )
                    t = r(e = t.ownerDocument);
                return e
            }()
              , t = []
              , n = null
              , o = null;
            a.prototype.THROTTLE_TIMEOUT = 100,
            a.prototype.POLL_INTERVAL = null,
            a.prototype.USE_MUTATION_OBSERVER = !0,
            a._setupCrossOriginUpdater = function() {
                return n || (n = function(e, n) {
                    o = e && n ? f(e, n) : {
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        width: 0,
                        height: 0
                    },
                    t.forEach((function(e) {
                        e._checkForIntersections()
                    }
                    ))
                }
                ),
                n
            }
            ,
            a._resetCrossOriginUpdater = function() {
                n = null,
                o = null
            }
            ,
            a.prototype.observe = function(e) {
                if (!this._observationTargets.some((function(t) {
                    return t.element == e
                }
                ))) {
                    if (!e || 1 != e.nodeType)
                        throw new Error("target must be an Element");
                    this._registerInstance(),
                    this._observationTargets.push({
                        element: e,
                        entry: null
                    }),
                    this._monitorIntersections(e.ownerDocument),
                    this._checkForIntersections()
                }
            }
            ,
            a.prototype.unobserve = function(e) {
                this._observationTargets = this._observationTargets.filter((function(t) {
                    return t.element != e
                }
                )),
                this._unmonitorIntersections(e.ownerDocument),
                0 == this._observationTargets.length && this._unregisterInstance()
            }
            ,
            a.prototype.disconnect = function() {
                this._observationTargets = [],
                this._unmonitorAllIntersections(),
                this._unregisterInstance()
            }
            ,
            a.prototype.takeRecords = function() {
                var e = this._queuedEntries.slice();
                return this._queuedEntries = [],
                e
            }
            ,
            a.prototype._initThresholds = function(e) {
                var t = e || [0];
                return Array.isArray(t) || (t = [t]),
                t.sort().filter((function(e, t, n) {
                    if ("number" != typeof e || isNaN(e) || e < 0 || e > 1)
                        throw new Error("threshold must be a number between 0 and 1 inclusively");
                    return e !== n[t - 1]
                }
                ))
            }
            ,
            a.prototype._parseRootMargin = function(e) {
                var t = (e || "0px").split(/\s+/).map((function(e) {
                    var t = /^(-?\d*\.?\d+)(px|%)$/.exec(e);
                    if (!t)
                        throw new Error("rootMargin must be specified in pixels or percent");
                    return {
                        value: parseFloat(t[1]),
                        unit: t[2]
                    }
                }
                ));
                return t[1] = t[1] || t[0],
                t[2] = t[2] || t[0],
                t[3] = t[3] || t[1],
                t
            }
            ,
            a.prototype._monitorIntersections = function(t) {
                var n = t.defaultView;
                if (n && -1 == this._monitoringDocuments.indexOf(t)) {
                    var o = this._checkForIntersections
                      , i = null
                      , a = null;
                    this.POLL_INTERVAL ? i = n.setInterval(o, this.POLL_INTERVAL) : (s(n, "resize", o, !0),
                    s(t, "scroll", o, !0),
                    this.USE_MUTATION_OBSERVER && "MutationObserver"in n && (a = new n.MutationObserver(o)).observe(t, {
                        attributes: !0,
                        childList: !0,
                        characterData: !0,
                        subtree: !0
                    })),
                    this._monitoringDocuments.push(t),
                    this._monitoringUnsubscribes.push((function() {
                        var e = t.defaultView;
                        e && (i && e.clearInterval(i),
                        l(e, "resize", o, !0)),
                        l(t, "scroll", o, !0),
                        a && a.disconnect()
                    }
                    ));
                    var c = this.root && (this.root.ownerDocument || this.root) || e;
                    if (t != c) {
                        var u = r(t);
                        u && this._monitorIntersections(u.ownerDocument)
                    }
                }
            }
            ,
            a.prototype._unmonitorIntersections = function(t) {
                var n = this._monitoringDocuments.indexOf(t);
                if (-1 != n) {
                    var o = this.root && (this.root.ownerDocument || this.root) || e;
                    if (!this._observationTargets.some((function(e) {
                        var n = e.element.ownerDocument;
                        if (n == t)
                            return !0;
                        for (; n && n != o; ) {
                            var i = r(n);
                            if ((n = i && i.ownerDocument) == t)
                                return !0
                        }
                        return !1
                    }
                    ))) {
                        var i = this._monitoringUnsubscribes[n];
                        if (this._monitoringDocuments.splice(n, 1),
                        this._monitoringUnsubscribes.splice(n, 1),
                        i(),
                        t != o) {
                            var a = r(t);
                            a && this._unmonitorIntersections(a.ownerDocument)
                        }
                    }
                }
            }
            ,
            a.prototype._unmonitorAllIntersections = function() {
                var e = this._monitoringUnsubscribes.slice(0);
                this._monitoringDocuments.length = 0,
                this._monitoringUnsubscribes.length = 0;
                for (var t = 0; t < e.length; t++)
                    e[t]()
            }
            ,
            a.prototype._checkForIntersections = function() {
                if (this.root || !n || o) {
                    var e = this._rootIsInDom()
                      , t = e ? this._getRootRect() : {
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        width: 0,
                        height: 0
                    };
                    this._observationTargets.forEach((function(o) {
                        var r = o.element
                          , a = u(r)
                          , s = this._rootContainsTarget(r)
                          , l = o.entry
                          , c = e && s && this._computeTargetAndRootIntersection(r, a, t)
                          , d = null;
                        this._rootContainsTarget(r) ? (!n || this.root) && (d = t) : d = {
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0,
                            width: 0,
                            height: 0
                        };
                        var f = o.entry = new i({
                            time: window.performance && performance.now && performance.now(),
                            target: r,
                            boundingClientRect: a,
                            rootBounds: d,
                            intersectionRect: c
                        });
                        l ? e && s ? this._hasCrossedThreshold(l, f) && this._queuedEntries.push(f) : l && l.isIntersecting && this._queuedEntries.push(f) : this._queuedEntries.push(f)
                    }
                    ), this),
                    this._queuedEntries.length && this._callback(this.takeRecords(), this)
                }
            }
            ,
            a.prototype._computeTargetAndRootIntersection = function(t, r, i) {
                if ("none" != window.getComputedStyle(t).display) {
                    for (var a = r, s = h(t), l = !1; !l && s; ) {
                        var d = null
                          , p = 1 == s.nodeType ? window.getComputedStyle(s) : {};
                        if ("none" == p.display)
                            return null;
                        if (s == this.root || 9 == s.nodeType)
                            if (l = !0,
                            s == this.root || s == e)
                                n && !this.root ? !o || 0 == o.width && 0 == o.height ? (s = null,
                                d = null,
                                a = null) : d = o : d = i;
                            else {
                                var m = h(s)
                                  , _ = m && u(m)
                                  , v = m && this._computeTargetAndRootIntersection(m, _, i);
                                _ && v ? (s = m,
                                d = f(_, v)) : (s = null,
                                a = null)
                            }
                        else {
                            var g = s.ownerDocument;
                            s != g.body && s != g.documentElement && "visible" != p.overflow && (d = u(s))
                        }
                        if (d && (a = c(d, a)),
                        !a)
                            break;
                        s = s && h(s)
                    }
                    return a
                }
            }
            ,
            a.prototype._getRootRect = function() {
                var t;
                if (this.root && !m(this.root))
                    t = u(this.root);
                else {
                    var n = m(this.root) ? this.root : e
                      , o = n.documentElement
                      , r = n.body;
                    t = {
                        top: 0,
                        left: 0,
                        right: o.clientWidth || r.clientWidth,
                        width: o.clientWidth || r.clientWidth,
                        bottom: o.clientHeight || r.clientHeight,
                        height: o.clientHeight || r.clientHeight
                    }
                }
                return this._expandRectByRootMargin(t)
            }
            ,
            a.prototype._expandRectByRootMargin = function(e) {
                var t = this._rootMarginValues.map((function(t, n) {
                    return "px" == t.unit ? t.value : t.value * (n % 2 ? e.width : e.height) / 100
                }
                ))
                  , n = {
                    top: e.top - t[0],
                    right: e.right + t[1],
                    bottom: e.bottom + t[2],
                    left: e.left - t[3]
                };
                return n.width = n.right - n.left,
                n.height = n.bottom - n.top,
                n
            }
            ,
            a.prototype._hasCrossedThreshold = function(e, t) {
                var n = e && e.isIntersecting ? e.intersectionRatio || 0 : -1
                  , o = t.isIntersecting ? t.intersectionRatio || 0 : -1;
                if (n !== o)
                    for (var r = 0; r < this.thresholds.length; r++) {
                        var i = this.thresholds[r];
                        if (i == n || i == o || i < n != i < o)
                            return !0
                    }
            }
            ,
            a.prototype._rootIsInDom = function() {
                return !this.root || p(e, this.root)
            }
            ,
            a.prototype._rootContainsTarget = function(t) {
                var n = this.root && (this.root.ownerDocument || this.root) || e;
                return p(n, t) && (!this.root || n == t.ownerDocument)
            }
            ,
            a.prototype._registerInstance = function() {
                t.indexOf(this) < 0 && t.push(this)
            }
            ,
            a.prototype._unregisterInstance = function() {
                var e = t.indexOf(this);
                -1 != e && t.splice(e, 1)
            }
            ,
            window.IntersectionObserver = a,
            window.IntersectionObserverEntry = i
        }
    function r(e) {
        try {
            return e.defaultView && e.defaultView.frameElement || null
        } catch (t) {
            return null
        }
    }
    function i(e) {
        this.time = e.time,
        this.target = e.target,
        this.rootBounds = d(e.rootBounds),
        this.boundingClientRect = d(e.boundingClientRect),
        this.intersectionRect = d(e.intersectionRect || {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            width: 0,
            height: 0
        }),
        this.isIntersecting = !!e.intersectionRect;
        var t = this.boundingClientRect
          , n = t.width * t.height
          , o = this.intersectionRect
          , r = o.width * o.height;
        this.intersectionRatio = n ? Number((r / n).toFixed(4)) : this.isIntersecting ? 1 : 0
    }
    function a(e, t) {
        var n = t || {};
        if ("function" != typeof e)
            throw new Error("callback must be a function");
        if (n.root && 1 != n.root.nodeType && 9 != n.root.nodeType)
            throw new Error("root must be a Document or Element");
        this._checkForIntersections = function(e, t) {
            var n = null;
            return function() {
                n || (n = setTimeout((function() {
                    e(),
                    n = null
                }
                ), t))
            }
        }(this._checkForIntersections.bind(this), this.THROTTLE_TIMEOUT),
        this._callback = e,
        this._observationTargets = [],
        this._queuedEntries = [],
        this._rootMarginValues = this._parseRootMargin(n.rootMargin),
        this.thresholds = this._initThresholds(n.threshold),
        this.root = n.root || null,
        this.rootMargin = this._rootMarginValues.map((function(e) {
            return e.value + e.unit
        }
        )).join(" "),
        this._monitoringDocuments = [],
        this._monitoringUnsubscribes = []
    }
    function s(e, t, n, o) {
        "function" == typeof e.addEventListener ? e.addEventListener(t, n, o || !1) : "function" == typeof e.attachEvent && e.attachEvent("on" + t, n)
    }
    function l(e, t, n, o) {
        "function" == typeof e.removeEventListener ? e.removeEventListener(t, n, o || !1) : "function" == typeof e.detachEvent && e.detachEvent("on" + t, n)
    }
    function c(e, t) {
        var n = Math.max(e.top, t.top)
          , o = Math.min(e.bottom, t.bottom)
          , r = Math.max(e.left, t.left)
          , i = Math.min(e.right, t.right)
          , a = i - r
          , s = o - n;
        return a >= 0 && s >= 0 && {
            top: n,
            bottom: o,
            left: r,
            right: i,
            width: a,
            height: s
        } || null
    }
    function u(e) {
        var t;
        try {
            t = e.getBoundingClientRect()
        } catch (n) {}
        return t ? (t.width && t.height || (t = {
            top: t.top,
            right: t.right,
            bottom: t.bottom,
            left: t.left,
            width: t.right - t.left,
            height: t.bottom - t.top
        }),
        t) : {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            width: 0,
            height: 0
        }
    }
    function d(e) {
        return !e || "x"in e ? e : {
            top: e.top,
            y: e.top,
            bottom: e.bottom,
            left: e.left,
            x: e.left,
            right: e.right,
            width: e.width,
            height: e.height
        }
    }
    function f(e, t) {
        var n = t.top - e.top
          , o = t.left - e.left;
        return {
            top: n,
            left: o,
            height: t.height,
            width: t.width,
            bottom: n + t.height,
            right: o + t.width
        }
    }
    function p(e, t) {
        for (var n = t; n; ) {
            if (n == e)
                return !0;
            n = h(n)
        }
        return !1
    }
    function h(t) {
        var n = t.parentNode;
        return 9 == t.nodeType && t != e ? r(t) : (n && n.assignedSlot && (n = n.assignedSlot.parentNode),
        n && 11 == n.nodeType && n.host ? n.host : n)
    }
    function m(e) {
        return e && 9 === e.nodeType
    }
}();
var ChapterStatus = function(e) {
    return e[e.Free = -1] = "Free",
    e[e.Unsubscribe = 1] = "Unsubscribe",
    e[e.Subscribed = 2] = "Subscribed",
    e
}(ChapterStatus || {}), PlatformType = function(e) {
    return e.PC = "desktop",
    e.Mobile = "mobile",
    e
}(PlatformType || {}), ErrorType = function(e) {
    return e.Risk = "Risk",
    e.Balance = "Balance",
    e.PriceChange = "PriceChange",
    e.Other = "Other",
    e
}(ErrorType || {}), _a, isClient = "undefined" != typeof window, noop = function() {};
function resolveUnref(e) {
    return "function" == typeof e ? e() : unref(e)
}
function createFilterWrapper(e, t) {
    return function() {
        for (var n = this, o = arguments.length, r = new Array(o), i = 0; i < o; i++)
            r[i] = arguments[i];
        return new Promise((function(o, i) {
            Promise.resolve(e((function() {
                return t.apply(n, r)
            }
            ), {
                fn: t,
                thisArg: n,
                args: r
            })).then(o).catch(i)
        }
        ))
    }
}
isClient && null != (_a = null == window ? void 0 : window.navigator) && _a.userAgent && /iP(ad|hone|od)/.test(window.navigator.userAgent);
var bypassFilter = function(e) {
    return e()
};
function debounceFilter(e) {
    var t, n, o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r = noop, i = function(e) {
        clearTimeout(e),
        r(),
        r = noop
    };
    return function(a) {
        var s = resolveUnref(e)
          , l = resolveUnref(o.maxWait);
        return t && i(t),
        s <= 0 || void 0 !== l && l <= 0 ? (n && (i(n),
        n = null),
        Promise.resolve(a())) : new Promise((function(e, c) {
            r = o.rejectOnCancel ? c : e,
            l && !n && (n = setTimeout((function() {
                t && i(t),
                n = null,
                e(a())
            }
            ), l)),
            t = setTimeout((function() {
                n && i(n),
                n = null,
                e(a())
            }
            ), s)
        }
        ))
    }
}
function identity(e) {
    return e
}
function tryOnScopeDispose(e) {
    return !!getCurrentScope() && (onScopeDispose(e),
    !0)
}
function createSharedComposable(e) {
    var t, n, o = 0, r = function() {
        o -= 1,
        n && o <= 0 && (n.stop(),
        t = void 0,
        n = void 0)
    };
    return function() {
        for (var i = arguments.length, a = new Array(i), s = 0; s < i; s++)
            a[s] = arguments[s];
        return o += 1,
        t || (n = effectScope(!0),
        t = n.run((function() {
            return e.apply(void 0, a)
        }
        ))),
        tryOnScopeDispose(r),
        t
    }
}
function tryOnMounted(e) {
    var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
    getCurrentInstance() ? onMounted(e) : t ? e() : nextTick(e)
}
function tryOnUnmounted(e) {
    getCurrentInstance() && onUnmounted(e)
}
var __getOwnPropSymbols$6 = Object.getOwnPropertySymbols
  , __hasOwnProp$6 = Object.prototype.hasOwnProperty
  , __propIsEnum$6 = Object.prototype.propertyIsEnumerable
  , __objRest$5 = function(e, t) {
    var n = {};
    for (var o in e)
        __hasOwnProp$6.call(e, o) && t.indexOf(o) < 0 && (n[o] = e[o]);
    if (null != e && __getOwnPropSymbols$6) {
        var r, i = _createForOfIteratorHelper(__getOwnPropSymbols$6(e));
        try {
            for (i.s(); !(r = i.n()).done; ) {
                o = r.value;
                t.indexOf(o) < 0 && __propIsEnum$6.call(e, o) && (n[o] = e[o])
            }
        } catch (a) {
            i.e(a)
        } finally {
            i.f()
        }
    }
    return n
};
function watchWithFilter(e, t) {
    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}
      , o = n.eventFilter
      , r = void 0 === o ? bypassFilter : o
      , i = __objRest$5(n, ["eventFilter"]);
    return watch(e, createFilterWrapper(r, t), i)
}
var __defProp$4 = Object.defineProperty
  , __defProps$4 = Object.defineProperties
  , __getOwnPropDescs$4 = Object.getOwnPropertyDescriptors
  , __getOwnPropSymbols$4 = Object.getOwnPropertySymbols
  , __hasOwnProp$4 = Object.prototype.hasOwnProperty
  , __propIsEnum$4 = Object.prototype.propertyIsEnumerable
  , __defNormalProp$4 = function(e, t, n) {
    return t in e ? __defProp$4(e, t, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: n
    }) : e[t] = n
}
  , __spreadValues$4 = function(e, t) {
    for (var n in t || (t = {}))
        __hasOwnProp$4.call(t, n) && __defNormalProp$4(e, n, t[n]);
    if (__getOwnPropSymbols$4) {
        var o, r = _createForOfIteratorHelper(__getOwnPropSymbols$4(t));
        try {
            for (r.s(); !(o = r.n()).done; ) {
                n = o.value;
                __propIsEnum$4.call(t, n) && __defNormalProp$4(e, n, t[n])
            }
        } catch (i) {
            r.e(i)
        } finally {
            r.f()
        }
    }
    return e
}
  , __spreadProps$4 = function(e, t) {
    return __defProps$4(e, __getOwnPropDescs$4(t))
}
  , __objRest$3 = function(e, t) {
    var n = {};
    for (var o in e)
        __hasOwnProp$4.call(e, o) && t.indexOf(o) < 0 && (n[o] = e[o]);
    if (null != e && __getOwnPropSymbols$4) {
        var r, i = _createForOfIteratorHelper(__getOwnPropSymbols$4(e));
        try {
            for (i.s(); !(r = i.n()).done; ) {
                o = r.value;
                t.indexOf(o) < 0 && __propIsEnum$4.call(e, o) && (n[o] = e[o])
            }
        } catch (a) {
            i.e(a)
        } finally {
            i.f()
        }
    }
    return n
};
function watchDebounced(e, t) {
    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}
      , o = n.debounce
      , r = void 0 === o ? 0 : o
      , i = n.maxWait
      , a = void 0 === i ? void 0 : i
      , s = __objRest$3(n, ["debounce", "maxWait"]);
    return watchWithFilter(e, t, __spreadProps$4(__spreadValues$4({}, s), {
        eventFilter: debounceFilter(r, {
            maxWait: a
        })
    }))
}
var defaultDocument = isClient ? window.document : void 0
  , _global = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {}
  , globalKey = "__vueuse_ssr_handlers__";
_global[globalKey] = _global[globalKey] || {};
var events = new Map, SwipeDirection, a33;
function useEventBus(e) {
    var t = getCurrentScope();
    function n(n) {
        var r, i = events.get(e) || [];
        i.push(n),
        events.set(e, i);
        var a = function() {
            return o(n)
        };
        return null == (r = null == t ? void 0 : t.cleanups) || r.push(a),
        a
    }
    function o(t) {
        var n = events.get(e);
        if (n) {
            var o = n.indexOf(t);
            o > -1 && n.splice(o, 1),
            n.length || events.delete(e)
        }
    }
    return {
        on: n,
        once: function(e) {
            return n((function t() {
                o(t),
                e.apply(void 0, arguments)
            }
            ))
        },
        off: o,
        emit: function(t, n) {
            var o;
            null == (o = events.get(e)) || o.forEach((function(e) {
                return e(t, n)
            }
            ))
        },
        reset: function() {
            events.delete(e)
        }
    }
}
function useScriptTag(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : noop
      , n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}
      , o = n.immediate
      , r = void 0 === o || o
      , i = n.manual
      , a = void 0 !== i && i
      , s = n.type
      , l = void 0 === s ? "text/javascript" : s
      , c = n.async
      , u = void 0 === c || c
      , d = n.crossOrigin
      , f = n.referrerPolicy
      , p = n.noModule
      , h = n.defer
      , m = n.document
      , _ = void 0 === m ? defaultDocument : m
      , v = n.attrs
      , g = void 0 === v ? {} : v
      , x = ref(null)
      , y = null
      , b = function() {
        return y || (y = function(n) {
            return new Promise((function(o, r) {
                var i = function(e) {
                    return x.value = e,
                    o(e),
                    e
                };
                if (_) {
                    var a = !1
                      , s = _.querySelector('script[src="'.concat(resolveUnref(e), '"]'));
                    s ? s.hasAttribute("data-loaded") && i(s) : ((s = _.createElement("script")).type = l,
                    s.async = u,
                    s.src = resolveUnref(e),
                    h && (s.defer = h),
                    d && (s.crossOrigin = d),
                    p && (s.noModule = p),
                    f && (s.referrerPolicy = f),
                    Object.entries(g).forEach((function(e) {
                        var t = _slicedToArray(e, 2)
                          , n = t[0]
                          , o = t[1];
                        return null == s ? void 0 : s.setAttribute(n, o)
                    }
                    )),
                    a = !0),
                    s.addEventListener("error", (function(e) {
                        return r(e)
                    }
                    )),
                    s.addEventListener("abort", (function(e) {
                        return r(e)
                    }
                    )),
                    s.addEventListener("load", (function() {
                        s.setAttribute("data-loaded", "true"),
                        t(s),
                        i(s)
                    }
                    )),
                    a && (s = _.head.appendChild(s)),
                    n || i(s)
                } else
                    o(!1)
            }
            ))
        }(!(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0])),
        y
    }
      , k = function() {
        if (_) {
            y = null,
            x.value && (x.value = null);
            var t = _.querySelector('script[src="'.concat(resolveUnref(e), '"]'));
            t && _.head.removeChild(t)
        }
    };
    return r && !a && tryOnMounted(b),
    a || tryOnUnmounted(k),
    {
        scriptTag: x,
        load: b,
        unload: k
    }
}
a33 = SwipeDirection || (SwipeDirection = {}),
a33.UP = "UP",
a33.RIGHT = "RIGHT",
a33.DOWN = "DOWN",
a33.LEFT = "LEFT",
a33.NONE = "NONE";
var _id = 0;
function useStyleTag(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
      , n = ref(!1)
      , o = t.document
      , r = void 0 === o ? defaultDocument : o
      , i = t.immediate
      , a = void 0 === i || i
      , s = t.manual
      , l = void 0 !== s && s
      , c = t.id
      , u = void 0 === c ? "vueuse_styletag_".concat(++_id) : c
      , d = ref(e)
      , f = function() {}
      , p = function() {
        if (r) {
            var e = r.getElementById(u) || r.createElement("style");
            e.isConnected || (e.type = "text/css",
            e.id = u,
            t.media && (e.media = t.media),
            r.head.appendChild(e)),
            !n.value && (f = watch(d, (function(t) {
                e.textContent = t
            }
            ), {
                immediate: !0
            }),
            n.value = !0)
        }
    }
      , h = function() {
        !r || !n.value || (f(),
        r.head.removeChild(r.getElementById(u)),
        n.value = !1)
    };
    return a && !l && tryOnMounted(p),
    l || tryOnScopeDispose(h),
    {
        id: u,
        css: d,
        unload: h,
        load: p,
        isLoaded: readonly(n)
    }
}
var __defProp = Object.defineProperty
  , __getOwnPropSymbols = Object.getOwnPropertySymbols
  , __hasOwnProp = Object.prototype.hasOwnProperty
  , __propIsEnum = Object.prototype.propertyIsEnumerable
  , __defNormalProp = function(e, t, n) {
    return t in e ? __defProp(e, t, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: n
    }) : e[t] = n
}
  , __spreadValues = function(e, t) {
    for (var n in t || (t = {}))
        __hasOwnProp.call(t, n) && __defNormalProp(e, n, t[n]);
    if (__getOwnPropSymbols) {
        var o, r = _createForOfIteratorHelper(__getOwnPropSymbols(t));
        try {
            for (r.s(); !(o = r.n()).done; ) {
                n = o.value;
                __propIsEnum.call(t, n) && __defNormalProp(e, n, t[n])
            }
        } catch (i) {
            r.e(i)
        } finally {
            r.f()
        }
    }
    return e
}
  , _TransitionPresets = {
    easeInSine: [.12, 0, .39, 0],
    easeOutSine: [.61, 1, .88, 1],
    easeInOutSine: [.37, 0, .63, 1],
    easeInQuad: [.11, 0, .5, 0],
    easeOutQuad: [.5, 1, .89, 1],
    easeInOutQuad: [.45, 0, .55, 1],
    easeInCubic: [.32, 0, .67, 0],
    easeOutCubic: [.33, 1, .68, 1],
    easeInOutCubic: [.65, 0, .35, 1],
    easeInQuart: [.5, 0, .75, 0],
    easeOutQuart: [.25, 1, .5, 1],
    easeInOutQuart: [.76, 0, .24, 1],
    easeInQuint: [.64, 0, .78, 0],
    easeOutQuint: [.22, 1, .36, 1],
    easeInOutQuint: [.83, 0, .17, 1],
    easeInExpo: [.7, 0, .84, 0],
    easeOutExpo: [.16, 1, .3, 1],
    easeInOutExpo: [.87, 0, .13, 1],
    easeInCirc: [.55, 0, 1, .45],
    easeOutCirc: [0, .55, .45, 1],
    easeInOutCirc: [.85, 0, .15, 1],
    easeInBack: [.36, 0, .66, -.56],
    easeOutBack: [.34, 1.56, .64, 1],
    easeInOutBack: [.68, -.6, .32, 1.6]
};
__spreadValues({
    linear: identity
}, _TransitionPresets);
var defaultReaderState = {
    isChapterListOpen: !1,
    isSettingsOpen: !1,
    balance: 0,
    realBalance: 0,
    unlockedHash: {},
    chapterContext: {
        cid: "",
        index: null,
        interactChapter: null,
        visibleChapter: null
    },
    reviewContext: {
        chapterId: "",
        index: -1
    },
    isChapterLoading: !0,
    lastChapterLoadMethod: "single",
    batchSubsChapterHash: {},
    i18n: {
        value: null
    },
    isSideSheetOpen: !1,
    isInShelf: !1,
    isWestern: !1,
    isDisableAction: !1,
    deviceType: PlatformType.PC,
    chapterHash: {},
    errorHash: {},
    isFockReady: !1,
    settings: {
        theme: "default",
        lastLightTheme: "default",
        fontSize: 18,
        font: "black",
        disableReview: !1,
        pageMode: "single",
        pageWidth: "auto",
        autoSubs: !1
    },
    isPanelOpen: !1,
    isLoginGuideOpen: !1,
    isPacketActive: !1,
    isGuideOpen: !1
};
function invokeInject(e) {
    var t = reactive({})
      , n = ref(null)
      , o = ref(null)
      , r = ref(null)
      , i = ref(null)
      , a = ref(null)
      , s = reactive(JSON.parse(JSON.stringify(defaultReaderState)))
      , l = ref({})
      , c = useEventBus("reader")
      , u = {
        value: null
    }
      , d = ref(null)
      , f = ref([]);
    function p(e, t) {
        if (!u.value || !u.value.message[u.value.locale] || !u.value.message[u.value.locale][e])
            return "";
        var n = u.value.message[u.value.locale][e];
        if ("function" == typeof n)
            return n(t);
        if ("string" == typeof t)
            return n.replace(/\{0\}/g, t);
        if (Array.isArray(t) && t.length > 0) {
            for (var o = 0; o < t.length; o++)
                n = n.replace(new RegExp("\\{".concat(o, "\\}"),"g"), t[o]);
            return n
        }
        return n
    }
    return e ? (e.provide(ADAPTERS_KEY, t),
    e.provide(FRONT_CONFIG_STATE_KEY, o),
    e.provide(BOOK_STATE_KEY, r),
    e.provide(RECOMMEND_BOOKS_STATE_KEY, i),
    e.provide(CHAPTER_LIST_STATE_KEY, a),
    e.provide(READER_STATE_KEY, s),
    e.provide(CHAPTERS_STATE_KEY, f),
    e.provide(CONFIG_STATE_KEY, l),
    e.provide(BUS_STATE_KEY, c),
    e.provide(BOOKMARK_LIST_STATE_KEY, d),
    e.provide(I18N_IO_FUNC_KEY, p)) : (provide(ADAPTERS_KEY, t),
    provide(USER_STATE_KEY, n),
    provide(FRONT_CONFIG_STATE_KEY, o),
    provide(BOOK_STATE_KEY, r),
    provide(RECOMMEND_BOOKS_STATE_KEY, i),
    provide(CHAPTER_LIST_STATE_KEY, a),
    provide(READER_STATE_KEY, s),
    provide(CHAPTERS_STATE_KEY, f),
    provide(CONFIG_STATE_KEY, l),
    provide(BUS_STATE_KEY, c),
    provide(BOOKMARK_LIST_STATE_KEY, d),
    provide(I18N_IO_FUNC_KEY, p)),
    {
        adapters: t,
        user: n,
        frontConfig: o,
        bookInfo: r,
        recommendBooks: i,
        chapterList: a,
        readerState: s,
        config: l,
        bus: c,
        i18n: u,
        chapters: f,
        bookmarkList: d,
        t: p
    }
}
function getChapterPosition(e, t) {
    if (t) {
        var n = [];
        t.forEach((function(e) {
            return n = n.concat(e.list)
        }
        ));
        for (var o = 0; o < n.length; o++) {
            var r = n[o];
            if (String(r.id) === String(e))
                return {
                    index: o,
                    next: n[o + 1],
                    prev: n[o - 1]
                }
        }
    }
}
function getChapterSiblings(e, t) {
    var n = {
        next: null,
        prev: null
    };
    if (!e)
        return n;
    if (Object.assign(n, {
        next: e.next,
        prev: e.prev
    }),
    !e.next || !e.prev) {
        var o = getChapterPosition(e.id, t);
        if (o) {
            var r = o.next
              , i = o.prev;
            Object.assign(n, {
                next: r ? {
                    id: r.id,
                    vip: r.status !== ChapterStatus.Free
                } : null,
                prev: i ? {
                    id: i.id,
                    vip: i.status !== ChapterStatus.Free
                } : null
            })
        }
    }
    return n
}
var ServiceError = function(e) {
    _inherits(n, _wrapNativeSuper(Error));
    var t = _createSuper(n);
    function n(e) {
        var o;
        return _classCallCheck(this, n),
        (o = t.call(this, e.msg)).name = "ServiceError",
        o.serviceError = e,
        o
    }
    return _createClass(n)
}();
function handleRisk(e, t) {
    return new Promise((function(n, o) {
        (0,
        useScriptTag("https://sta.gtimg.com/aq/=/safe_h5/js/yw_risk_verify_v3.js").load)().then((function() {
            var r;
            null === (r = window.ywRiskVerify) || void 0 === r || r.verify(_objectSpread(_objectSpread(_objectSpread({}, e), t.risk), {}, {
                appId: null == t ? void 0 : t.appId,
                areaId: null == t ? void 0 : t.areaId
            }), n, o)
        }
        )).catch(o)
    }
    ))
}
function checkRiskError(e) {
    return e instanceof ServiceError && e.serviceError.type === ErrorType.Risk && e.serviceError.risk && [2, 3].includes(e.serviceError.risk.banId)
}
function requestMayRisk(e, t) {
    return new Promise((function(n, o) {
        !function r(i) {
            var a;
            null === (a = e(i)) || void 0 === a || a.then((function(e) {
                n(e)
            }
            )).catch((function(e) {
                if (checkRiskError(e)) {
                    var n = e.serviceError.risk;
                    handleRisk(n, t).then((function(e) {
                        return r({
                            serverRes: n,
                            sdkRes: e
                        })
                    }
                    )).catch((function(t) {
                        var n;
                        o(new ServiceError({
                            type: ErrorType.Other,
                            msg: (null === (n = e.serviceError.risk) || void 0 === n ? void 0 : n.riskMsg) || e.serviceError.msg
                        }))
                    }
                    ))
                } else {
                    var i = "网络错误，请稍候重试";
                    if (e instanceof ServiceError)
                        return void o(e);
                    e.message && (i = e.message),
                    o(new ServiceError({
                        type: ErrorType.Other,
                        msg: i
                    }))
                }
            }
            ))
        }()
    }
    ))
}
var _hoisted_1$15 = {
    key: 0,
    class: "mb-4px"
}
  , _hoisted_2$T = {
    key: 0,
    class: "text-48px icon-check-round"
}
  , _hoisted_3$H = {
    key: 1,
    class: "icon-error text-48px text-red-400"
}
  , _hoisted_4$A = {
    key: 2,
    class: "icon-loading animate-spin text-32px"
}
  , _hoisted_5$u = {
    class: "text-s1 font-medium whitespace-pre-wrap text-center"
}
  , _hoisted_6$p = {
    key: 1,
    class: "text-bo4 text-on-image-white-70 whitespace-nowrap"
}
  , _sfc_main$1k = defineComponent({
    __name: "Toast",
    setup: function(e, t) {
        var n = t.expose
          , o = ref()
          , r = reactive([]);
        return watch(o, (function(e) {
            var t;
            e && "loading" !== e.type && setTimeout((function() {
                o.value = r.pop() || null
            }
            ), (null === (t = o.value) || void 0 === t ? void 0 : t.duration) || 2e3)
        }
        )),
        n({
            add: function(e) {
                if ("loading" === e.type)
                    return r.splice(0, r.length),
                    void (o.value = e);
                o.value ? r.push(e) : o.value = e
            },
            stop: function() {
                o.value = null
            }
        }),
        function(e, t) {
            return openBlock(),
            createBlock(Transition, {
                name: "fade",
                appear: ""
            }, {
                default: withCtx((function() {
                    return [o.value ? (openBlock(),
                    createElementBlock("div", {
                        key: 0,
                        class: normalizeClass(["fixed z-10 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-12px bg-on-image-black-90 py-16px px-20px text-on-image-bw-white flex flex-col items-center", ["loading" === o.value.type && "!px-36px"]])
                    }, [o.value.type ? (openBlock(),
                    createElementBlock("div", _hoisted_1$15, ["success" === o.value.type ? (openBlock(),
                    createElementBlock("span", _hoisted_2$T)) : "error" === o.value.type ? (openBlock(),
                    createElementBlock("span", _hoisted_3$H)) : "loading" === o.value.type ? (openBlock(),
                    createElementBlock("div", _hoisted_4$A)) : createCommentVNode("", !0)])) : createCommentVNode("", !0), createBaseVNode("span", _hoisted_5$u, toDisplayString(o.value.title), 1), o.value.desc ? (openBlock(),
                    createElementBlock("p", _hoisted_6$p, toDisplayString(o.value.desc), 1)) : createCommentVNode("", !0)], 2)) : createCommentVNode("", !0)]
                }
                )),
                _: 1
            })
        }
    }
})
  , instance = null;
function init() {
    if (document) {
        var e = "reader-toast-container"
          , t = document.getElementById(e);
        if (!t) {
            (t = document.createElement("div")).id = e;
            var n = document.getElementById("reader");
            null == n || n.appendChild(t);
            var o = createApp(_sfc_main$1k);
            instance = o.mount(t)
        }
    }
}
function useToast(e) {
    return init(),
    instance.add(e),
    {
        stop: instance.stop
    }
}
function handleError(e) {
    var t, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "", r = e instanceof ServiceError, i = r ? e.message : n || e.message;
    r && e.serviceError.mute || useToast({
        title: i,
        desc: (null == e || null === (t = e.serviceError) || void 0 === t ? void 0 : t.desc) || o,
        type: "error"
    })
}
function useSubscribe(e) {
    var t = (null == e ? void 0 : e.readerState) || inject(READER_STATE_KEY, defaultReaderState)
      , n = (null == e ? void 0 : e.user) || inject(USER_STATE_KEY)
      , o = (null == e ? void 0 : e.t) || inject(I18N_IO_FUNC_KEY)
      , r = (null == e ? void 0 : e.adapters) || inject(ADAPTERS_KEY)
      , i = (null == e ? void 0 : e.bus) || inject(BUS_STATE_KEY)
      , a = (null == e ? void 0 : e.chapters) || inject(CHAPTERS_STATE_KEY)
      , s = (null == e ? void 0 : e.frontConfig) || inject(FRONT_CONFIG_STATE_KEY);
    function l() {
        return (l = _asyncToGenerator(_regeneratorRuntime().mark((function e(l, c) {
            var u, d, f, p, h, m, _, v, g;
            return _regeneratorRuntime().wrap((function(e) {
                for (; ; )
                    switch (e.prev = e.next) {
                    case 0:
                        if (d = "single" === c || "book" === c,
                        f = function() {
                            i.emit("_:recharge:update", {
                                payload: d ? l[0] : l,
                                consume: _,
                                source: "single" === c ? "chapter" : c
                            })
                        }
                        ,
                        null != n && null !== (u = n.value) && void 0 !== u && u.id) {
                            e.next = 5;
                            break
                        }
                        return null === (p = r.processLogin) || void 0 === p || p.call(r),
                        e.abrupt("return");
                    case 5:
                        return h = useToast({
                            title: o("subs_chap_loading"),
                            type: "loading"
                        }),
                        m = h.stop,
                        _ = l.reduce((function(e, t) {
                            return e + (t.bookPrice || t.price || 0)
                        }
                        ), 0),
                        e.prev = 7,
                        e.next = 10,
                        null === (v = r.processBalance) || void 0 === v ? void 0 : v.call(r);
                    case 10:
                        if ("number" != typeof (g = e.sent)) {
                            e.next = 17;
                            break
                        }
                        if (t.balance = g,
                        !(t.balance < _)) {
                            e.next = 17;
                            break
                        }
                        return m(),
                        f(),
                        e.abrupt("return", Promise.resolve());
                    case 17:
                        e.next = 22;
                        break;
                    case 19:
                        e.prev = 19,
                        e.t0 = e.catch(7);
                    case 22:
                        return e.abrupt("return", requestMayRisk((function(e) {
                            var t, n;
                            return d ? null === (t = r.processSubs) || void 0 === t ? void 0 : t.call(r, l[0], c, e) : null === (n = r.processBatchSubs) || void 0 === n ? void 0 : n.call(r, l, e)
                        }
                        ), s.value).then((function() {
                            m(),
                            useToast({
                                title: o("subs_chap_succeed")
                            });
                            var e, n, c, u = a.value.map((function(e) {
                                return e.id
                            }
                            )), f = l.filter((function(e) {
                                var t = e.id;
                                return u.includes(t)
                            }
                            ));
                            f && f.length ? (t.lastChapterLoadMethod = "single",
                            i.emit("_:update-chapters", {
                                ids: f.map((function(e) {
                                    return e.id
                                }
                                )),
                                href: null === (e = s.value) || void 0 === e || null === (n = e.hrefMap) || void 0 === n ? void 0 : n.read(f[0].id, "manual"),
                                reload: !0
                            })) : null === (c = r.processBalance) || void 0 === c || c.call(r).then((function(e) {
                                return t.balance = e
                            }
                            ));
                            l.forEach((function(e) {
                                t.unlockedHash[e.id] = !0,
                                d ? e.auth = !0 : e.status = ChapterStatus.Subscribed
                            }
                            ))
                        }
                        )).catch((function(e) {
                            if (m(),
                            e instanceof ServiceError)
                                if (e.serviceError.type === ErrorType.Balance)
                                    f();
                                else {
                                    if (e.serviceError.type === ErrorType.PriceChange)
                                        throw handleError(e),
                                        e;
                                    handleError(e)
                                }
                            else
                                useToast({
                                    title: o("subs_chap_failed")
                                })
                        }
                        )));
                    case 23:
                    case "end":
                        return e.stop()
                    }
            }
            ), e, null, [[7, 19]])
        }
        )))).apply(this, arguments)
    }
    return {
        subscribe: function(e, t) {
            return l.apply(this, arguments)
        }
    }
}
function useChapter(e) {
    var t = (null == e ? void 0 : e.chapterList) || inject(CHAPTER_LIST_STATE_KEY)
      , n = (null == e ? void 0 : e.readerState) || inject(READER_STATE_KEY, defaultReaderState)
      , o = (null == e ? void 0 : e.adapters) || inject(ADAPTERS_KEY)
      , r = (null == e ? void 0 : e.bookInfo) || inject(BOOK_STATE_KEY)
      , i = (null == e ? void 0 : e.frontConfig) || inject(FRONT_CONFIG_STATE_KEY)
      , a = (null == e ? void 0 : e.chapters) || inject(CHAPTERS_STATE_KEY)
      , s = useSubscribe(e).subscribe;
    function l(e) {
        var o = getChapterSiblings(e, t.value)
          , r = o.next
          , i = o.prev;
        e.next = r,
        e.prev = i;
        var a = e.id
          , s = e.auth
          , l = e.font
          , c = e.encrypt
          , u = e.serviceError;
        n.unlockedHash[a] = s,
        s && !c && !l && !u && (n.chapterHash[a] = e)
    }
    function c(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1]
          , r = arguments.length > 2 ? arguments[2] : void 0;
        if (n.chapterHash[e]) {
            var a = n.chapterHash[e];
            return t || (n.chapterContext.cid = a.id),
            Promise.resolve(a)
        }
        return new Promise((function(a, c) {
            (r ? o.processChapter(e, r) : requestMayRisk((function(t) {
                return o.processChapter(e, t)
            }
            ), i.value)).then((function(e) {
                var o;
                if (!e)
                    throw new Error("Empty Response");
                l(e),
                t || (n.chapterContext.cid = e.id),
                !e.serviceError && !(null != e && e.auth) && n.settings.autoSubs && !(null !== (o = i.value) && void 0 !== o && o.disableAutoSubsAjax) && s([e], e.bookPrice ? "book" : "single"),
                a(e)
            }
            )).catch((function(t) {
                n.chapterContext.cid = e,
                c(t)
            }
            ))
        }
        ))
    }
    return {
        prepareChapter: l,
        loadChapter: c,
        checkAndLoadNextChapter: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0]
              , n = (null == a ? void 0 : a.value.length) || 0
              , o = null == a ? void 0 : a.value[n - 1]
              , r = getChapterSiblings(o, t.value).next;
            return null != r && r.id && (e || null != o && o.auth) ? c(r.id, !0) : null
        },
        isRemoved: function(e) {
            var t, n;
            return (null == r || null === (t = r.value) || void 0 === t ? void 0 : t.checkLevel) && 8 === (null == r || null === (n = r.value) || void 0 === n ? void 0 : n.checkLevel) && e && (!e.auth || e.auth && !e.vip)
        }
    }
}
var STORAGE_PREFIX = "yuewen-reader";
function useGuide() {
    var e = inject(READER_STATE_KEY, defaultReaderState)
      , t = inject(CHAPTERS_STATE_KEY)
      , n = inject(CONFIG_STATE_KEY);
    onMounted((function() {
        var o, r;
        if (null != n && null !== (o = n.value) && void 0 !== o && null !== (r = o.guide) && void 0 !== r && r.visible.data) {
            var i = "".concat(STORAGE_PREFIX, ":guide-showed-flag")
              , a = window.localStorage.getItem(i) || "";
            a ? "1" === a && (window.localStorage.setItem(i, "0"),
            a = "0",
            e.isGuideOpen = !0) : window.localStorage.setItem(i, "1"),
            watch(t, (function() {
                "1" === a && (window.localStorage.setItem(i, "0"),
                a = "0",
                e.isGuideOpen = !0)
            }
            ))
        }
    }
    ))
}
function useKeyNavigation(e) {
    function t(t, n) {
        e(n) && t.preventDefault()
    }
    function n(e) {
        var n;
        if (!["TEXTAREA", "INPUT"].includes(null === (n = e.target) || void 0 === n ? void 0 : n.tagName))
            switch (e.keyCode) {
            case 13:
                t(e, "enter");
                break;
            case 37:
                t(e, "left");
                break;
            case 39:
                t(e, "right");
                break;
            case 9:
                e.shiftKey ? t(e, "review:up") : t(e, "review:down")
            }
    }
    onMounted((function() {
        window.addEventListener("keydown", n)
    }
    )),
    onUnmounted((function() {
        window.removeEventListener("keydown", n)
    }
    ))
}
function support() {
    var e = !1;
    try {
        var t = Object.defineProperty({}, "passive", {
            get: function() {
                e = !0
            }
        });
        window.addEventListener("test", null, t)
    } catch (n) {}
    return e
}
function useScroll() {
    var e = ref(0);
    function t() {
        e.value = window.scrollY || window.pageYOffset
    }
    return onMounted((function() {
        window.addEventListener("scroll", t, !!support() && {
            passive: !0
        })
    }
    )),
    {
        top: e,
        destroy: function() {
            window.removeEventListener("scroll", t)
        }
    }
}
var useSharedScroll = createSharedComposable(useScroll)
  , ClientOnly = defineComponent({
    name: "ClientOnly",
    setup: function(e, t) {
        var n = t.slots
          , o = ref(!1);
        return onMounted((function() {
            o.value = !0
        }
        )),
        function() {
            return o.value && n.default ? n.default() : null
        }
    }
})
  , _hoisted_1$14 = {
    class: "flex flex-col items-center justify-center min-h-86vh"
}
  , _hoisted_2$S = {
    key: 0,
    class: "icon-empty text-54px text-s-gray-300"
}
  , _hoisted_3$G = ["src"]
  , _hoisted_4$z = {
    class: "mt-8px text-bo2 text-s-gray-500"
}
  , _hoisted_5$t = {
    key: 2,
    class: "text-s-gray-400 text-bo4 mt-4px"
}
  , _sfc_main$1j = defineComponent({
    __name: "Empty",
    props: {
        title: null,
        desc: null
    },
    setup: function(e) {
        var t = inject(FRONT_CONFIG_STATE_KEY);
        return function(n, o) {
            var r, i;
            return openBlock(),
            createElementBlock("div", _hoisted_1$14, [null !== (r = unref(t)) && void 0 !== r && r.errorImgUrl ? (openBlock(),
            createElementBlock("img", {
                key: 1,
                src: null === (i = unref(t)) || void 0 === i ? void 0 : i.errorImgUrl,
                class: "w-120px"
            }, null, 8, _hoisted_3$G)) : (openBlock(),
            createElementBlock("span", _hoisted_2$S)), createBaseVNode("h2", _hoisted_4$z, toDisplayString(e.title), 1), e.desc ? (openBlock(),
            createElementBlock("p", _hoisted_5$t, toDisplayString(e.desc), 1)) : createCommentVNode("", !0), renderSlot(n.$slots, "default")])
        }
    }
})
  , _hoisted_1$13 = {
    id: "r-breadcrumbs",
    class: "py-21px px-32px border-b border-outline-black-8 text-bo4 text-s-gray-500 flex items-center"
}
  , _hoisted_2$R = ["href"]
  , _hoisted_3$F = createBaseVNode("span", {
    class: "icon-arrow-right text-12px mx-4px"
}, null, -1)
  , _hoisted_4$y = ["href"]
  , _hoisted_5$s = createBaseVNode("span", {
    class: "icon-arrow-right text-12px mx-4px"
}, null, -1)
  , _sfc_main$1i = defineComponent({
    __name: "Breadcrumbs",
    setup: function(e) {
        var t = inject(FRONT_CONFIG_STATE_KEY)
          , n = inject(BOOK_STATE_KEY)
          , o = inject(I18N_IO_FUNC_KEY);
        return function(e, r) {
            var i, a, s, l, c, u, d, f, p;
            return openBlock(),
            createElementBlock("section", _hoisted_1$13, [createBaseVNode("a", {
                href: null === (i = unref(t)) || void 0 === i ? void 0 : i.hrefMap.index(),
                rel: "nofollow",
                class: "hover:text-s-gray-900"
            }, toDisplayString(unref(o)("home")), 9, _hoisted_2$R), null !== (a = unref(n)) && void 0 !== a && a.categoryList && null !== (s = unref(t)) && void 0 !== s && s.hrefMap.category ? (openBlock(!0),
            createElementBlock(Fragment, {
                key: 0
            }, renderList(null === (l = unref(n)) || void 0 === l ? void 0 : l.categoryList, (function(e) {
                var n, o, r;
                return openBlock(),
                createElementBlock(Fragment, {
                    key: e.tagId
                }, [_hoisted_3$F, createBaseVNode("a", {
                    href: null === (n = unref(t)) || void 0 === n || null === (o = (r = n.hrefMap).category) || void 0 === o ? void 0 : o.call(r, e.tagId),
                    class: "hover:text-s-gray-900"
                }, toDisplayString(e.tagName), 9, _hoisted_4$y)], 64)
            }
            )), 128)) : createCommentVNode("", !0), unref(n) ? (openBlock(),
            createElementBlock(Fragment, {
                key: 1
            }, [_hoisted_5$s, (openBlock(),
            createBlock(resolveDynamicComponent(null !== (c = unref(t)) && void 0 !== c && c.hrefMap.detail ? "a" : "span"), {
                href: null === (u = unref(t)) || void 0 === u || null === (d = (f = u.hrefMap).detail) || void 0 === d ? void 0 : d.call(f, null === (p = unref(t)) || void 0 === p ? void 0 : p.bid),
                class: "text-s-gray-900"
            }, {
                default: withCtx((function() {
                    return [createTextVNode(toDisplayString(unref(n).title), 1)]
                }
                )),
                _: 1
            }, 8, ["href"]))], 64)) : createCommentVNode("", !0)])
        }
    }
})
  , _hoisted_1$12 = ["id", "disabled", "checked"]
  , _sfc_main$1h = defineComponent({
    __name: "Checkbox",
    props: {
        modelValue: {
            type: Boolean,
            default: !1
        },
        rounded: {
            type: Boolean,
            default: !1
        },
        disabled: {
            type: Boolean,
            default: void 0
        },
        id: {
            default: void 0
        }
    },
    emits: ["update:modelValue", "change"],
    setup: function(e, t) {
        var n = t.emit
          , o = e;
        function r() {
            var e = !o.modelValue;
            n("update:modelValue", e),
            n("change", e)
        }
        return function(t, n) {
            return openBlock(),
            createElementBlock("label", {
                class: normalizeClass(["checkbox relative inline-block w-24px h-24px !after:border-s-gray-300 !after:hover:border-s-gray-400 after:content-DEFAULT after:border-1.5px after:inset-4px after:absolute after:inline-block after:transition-all", [e.disabled ? "text-s-gray-300" : "text-primary-red-500", e.modelValue ? "after:bg-current after:border-none" : "!after:bg-none", e.rounded ? "after:rounded-1" : "after:rounded-4px"]])
            }, [createBaseVNode("input", {
                id: e.id,
                disabled: e.disabled,
                type: "checkbox",
                class: "absolute inset-0 opacity-0 z-1 cursor-pointer",
                checked: e.modelValue,
                onChange: r
            }, null, 40, _hoisted_1$12)], 2)
        }
    }
})
  , Checkbox = _export_sfc(_sfc_main$1h, [["__scopeId", "data-v-6dd879a6"]]);
function useBalanceUpdater(e) {
    var t = inject(ADAPTERS_KEY)
      , n = inject(READER_STATE_KEY, defaultReaderState)
      , o = null;
    function r(o) {
        var r;
        "active" !== o.newState || null != e && e.value || (null === (r = t.processBalance) || void 0 === r || r.call(t).then((function(e) {
            return n.balance = e
        }
        )))
    }
    onMounted((function() {
        var e;
        null === (e = t.processBalance) || void 0 === e || e.call(t).then((function(e) {
            return n.balance = e
        }
        )),
        __vitePreload(( () => import("./chunk-e8bfb4a2.js")), []).then((function(e) {
            var t;
            null === (t = o = e) || void 0 === t || t.default.addEventListener("statechange", r)
        }
        ))
    }
    )),
    onUnmounted((function() {
        var e;
        null === (e = o) || void 0 === e || e.default.removeEventListener("statechange", r)
    }
    ))
}
function useTrack() {
    var e = inject(BUS_STATE_KEY)
      , t = null;
    function n(t) {
        var n = t.currentTarget;
        if ("object" === _typeof(n) && ("object" === _typeof(n._clickedTrack) && n._clickedTrack.e || "function" == typeof n._clickedTrack)) {
            var o = "function" == typeof n._clickedTrack ? n._clickedTrack() : n._clickedTrack;
            e.emit("".concat(o.e, ":click"), Object.assign(o, {
                event: t
            }))
        }
    }
    function o(n, o) {
        var r;
        t || (t = new IntersectionObserver((function(t) {
            t.forEach((function(t) {
                var n = t.intersectionRatio
                  , o = t.target;
                if (n >= 1 && ("object" === _typeof(o._exposedTrack) && o._exposedTrack.e || "function" == typeof o._exposedTrack)) {
                    var r = "function" == typeof o._exposedTrack ? o._exposedTrack() : o._exposedTrack;
                    e.emit("".concat(r.e, ":shown"), r)
                }
            }
            ))
        }
        ),{
            threshold: 1
        })),
        n._exposedTrack = o,
        null === (r = t) || void 0 === r || r.observe(n)
    }
    function r(e) {
        var n;
        null === (n = t) || void 0 === n || n.unobserve(e)
    }
    return {
        directive: {
            mounted: function(e, t) {
                "e" === t.arg ? o(e, t.value) : "c" === t.arg ? (e._clickedTrack = t.value,
                e.addEventListener("click", n)) : (o(e, t.value),
                e._clickedTrack = t.value,
                e.addEventListener("click", n))
            },
            beforeUnmount: function(e) {
                e._exposedTrack && r(e),
                e._clickedTrack,
                e = null
            }
        },
        observe: o,
        unobserve: r
    }
}
var useSharedTrack = createSharedComposable(useTrack)
  , _hoisted_1$11 = {
    class: "flex items-center"
}
  , _hoisted_2$Q = {
    class: "text-s-gray-900 text-s1 font-medium"
}
  , _hoisted_3$E = {
    class: "mx-4px text-primary-red-500"
}
  , _hoisted_4$x = createBaseVNode("span", {
    class: "w-1px bg-outline-black-8 h-16px mx-12px"
}, null, -1)
  , _hoisted_5$r = {
    class: "text-s-gray-500 text-bo4"
}
  , _hoisted_6$o = {
    class: "mx-4px text-primary-red-500"
}
  , _hoisted_7$m = {
    class: "mx-4px text-primary-red-500"
}
  , _sfc_main$1g = defineComponent({
    __name: "BatchSubsFooter",
    props: {
        consume: null
    },
    emits: ["subs", "recharge"],
    setup: function(e) {
        var t = e
          , n = inject(READER_STATE_KEY, defaultReaderState)
          , o = inject(I18N_IO_FUNC_KEY)
          , r = inject(ROOT_SLOTS_KEY);
        useBalanceUpdater();
        var i = useSharedTrack().directive
          , a = computed((function() {
            return n.balance - t.consume
        }
        ));
        return function(t, s) {
            return openBlock(),
            createElementBlock("div", _hoisted_1$11, [createBaseVNode("div", _hoisted_2$Q, [createTextVNode(toDisplayString(unref(o)("actu_pay")), 1), createBaseVNode("span", _hoisted_3$E, toDisplayString(e.consume), 1), createTextVNode(toDisplayString(unref(o)("unit")), 1)]), _hoisted_4$x, createBaseVNode("div", _hoisted_5$r, [createTextVNode(toDisplayString(unref(o)("balance")), 1), createBaseVNode("span", _hoisted_6$o, toDisplayString(unref(n).balance), 1), createTextVNode(toDisplayString(unref(o)("unit")), 1), unref(a) < 0 ? (openBlock(),
            createElementBlock(Fragment, {
                key: 0
            }, [createTextVNode(toDisplayString(unref(o)("comma_still_needed")), 1), createBaseVNode("span", _hoisted_7$m, toDisplayString(-unref(a)), 1), createTextVNode(toDisplayString(unref(o)("unit")), 1)], 64)) : createCommentVNode("", !0)]), unref(a) >= 0 ? withDirectives((openBlock(),
            createBlock(Button, {
                key: 0,
                class: "w-94px ml-auto",
                size: "large",
                onClick: s[0] || (s[0] = function(e) {
                    return t.$emit("subs")
                }
                )
            }, {
                default: withCtx((function() {
                    return [createTextVNode(toDisplayString(unref(o)("subscribe")), 1)]
                }
                )),
                _: 1
            })), [[unref(i), {
                e: "batch-subs:subs"
            }, "c"]]) : (openBlock(),
            createBlock(Button, {
                key: 1,
                disabled: !e.consume,
                size: "large",
                class: "w-94px ml-auto",
                onClick: s[1] || (s[1] = function(e) {
                    return t.$emit("recharge")
                }
                )
            }, {
                default: withCtx((function() {
                    return [createTextVNode(toDisplayString(unref(r)["quick-recharge-dialog"] ? unref(o)("quick_recharge") : unref(o)("recharge")), 1)]
                }
                )),
                _: 1
            }, 8, ["disabled"]))])
        }
    }
})
  , VolumeStatus = function(e) {
    return e[e.Unchecked = 0] = "Unchecked",
    e[e.Free = 1] = "Free",
    e[e.Disabled = 2] = "Disabled",
    e[e.Checked = 3] = "Checked",
    e
}(VolumeStatus || {});
function useCustomSubs(e, t) {
    var n = inject(READER_STATE_KEY, defaultReaderState)
      , o = inject(I18N_IO_FUNC_KEY);
    n.batchSubsChapterHash = {},
    t && u(t, !0);
    var r = computed((function() {
        return Object.keys(n.batchSubsChapterHash).length
    }
    ))
      , i = computed((function() {
        var e = 0;
        for (var t in n.batchSubsChapterHash)
            n.batchSubsChapterHash[t].price && (e += n.batchSubsChapterHash[t].price);
        return e
    }
    ))
      , a = computed((function() {
        for (var t = {}, o = 0; o < e.length; o++) {
            var r = e[o];
            if (t[r.id] = 0,
            r.list.every((function(e) {
                return e.status === ChapterStatus.Free
            }
            )))
                t[r.id] = 1;
            else if (r.list.every((function(e) {
                return d(e) || e.status === ChapterStatus.Free
            }
            )))
                t[r.id] = 2;
            else
                r.list.every((function(e) {
                    return !d(e) && n.batchSubsChapterHash[e.id] || e.status !== ChapterStatus.Unsubscribe
                }
                )) && (t[r.id] = 3)
        }
        return t
    }
    ))
      , s = computed((function() {
        return Object.keys(a.value).every((function(e) {
            return a.value[e]
        }
        ))
    }
    ))
      , l = computed((function() {
        return Object.keys(n.batchSubsChapterHash).map((function(e) {
            return n.batchSubsChapterHash[e]
        }
        ))
    }
    ));
    function c(e, t) {
        e.status === ChapterStatus.Unsubscribe && !n.unlockedHash[e.id] && t ? n.batchSubsChapterHash[e.id] = e : e.id in n.batchSubsChapterHash && !t && delete n.batchSubsChapterHash[e.id]
    }
    function u(t, n) {
        for (var o = 0; o < e.length; o++) {
            var r = e[o];
            if (r.id === t) {
                for (var i = 0; i < r.list.length; i++) {
                    c(r.list[i], n)
                }
                break
            }
        }
    }
    function d(e) {
        return n.unlockedHash[e.id] && e.status === ChapterStatus.Unsubscribe || e.status === ChapterStatus.Subscribed
    }
    return {
        pickedCount: r,
        pickedConsume: i,
        volumeStatus: a,
        allPicked: s,
        pickedSeq: l,
        toggleCheck: c,
        onChapterCheck: function(e, t) {
            t ? n.batchSubsChapterHash[e.id] = e : delete n.batchSubsChapterHash[e.id]
        },
        onVolumeCheck: u,
        onAllCheck: function(t) {
            for (var n = 0; n < e.length; n++)
                for (var o = e[n], r = 0; r < o.list.length; r++) {
                    c(o.list[r], t)
                }
        },
        getChapterStatus: function(e) {
            if (d(e))
                return "已购";
            switch (e.status) {
            case ChapterStatus.Free:
                return "免费";
            case ChapterStatus.Unsubscribe:
                return "".concat(e.price).concat(o("unit"));
            default:
                return "已购"
            }
        }
    }
}
var ONE_SECOND = 1e3
  , ONE_MINUTE = 60 * ONE_SECOND
  , ONE_HOUR = 60 * ONE_MINUTE
  , ONE_DAY = 24 * ONE_HOUR
  , ONE_YEAR = 365 * ONE_DAY
  , TWO_DAYS = 2 * ONE_DAY
  , THREE_DAYS = 3 * ONE_DAY
  , getDate = function(e) {
    var t = Math.abs(Date.now() - e)
      , n = new Date(e)
      , o = n.getFullYear()
      , r = n.getMonth() + 1
      , i = n.getDate()
      , a = n.getHours()
      , s = n.getMinutes();
    return {
        duration: t,
        year: o,
        month: r = r < 10 ? "0".concat(r) : r,
        day: i = i < 10 ? "0".concat(i) : i,
        hours: a = a < 10 ? "0".concat(a) : a,
        minutes: s = s < 10 ? "0".concat(s) : s
    }
}
  , formatDateText3 = function(e, t) {
    var n = new Date(e)
      , o = Date.now()
      , r = Math.abs(Date.now() - e)
      , i = n.getMonth() + 1
      , a = n.getDate()
      , s = n.getHours()
      , l = n.getMinutes();
    return i = i < 10 ? "0".concat(i) : i,
    a = a < 10 ? "0".concat(a) : a,
    s = s < 10 ? "0".concat(s) : s,
    l = l < 10 ? "0".concat(l) : l,
    Number.isNaN(e) || e > o ? e.toString() : r > ONE_YEAR || t ? "".concat(n.getFullYear(), "年").concat(i, "月").concat(a, "日 ").concat(s, ":").concat(l) : r <= ONE_YEAR ? "".concat(i, "月").concat(a, "日 ").concat(s, ":").concat(l) : ""
}
  , formatDateNumber2 = function(e) {
    if (Number.isNaN(e))
        return e.toString();
    var t = new Date(e)
      , n = new Date
      , o = new Date(Number(n) - ONE_DAY)
      , r = new Date(Number(n) - TWO_DAYS)
      , i = n.toDateString() === new Date(e).toDateString()
      , a = o.toDateString() === t.toDateString()
      , s = r.toDateString() === t.toDateString()
      , l = t.getMonth() + 1
      , c = t.getDate()
      , u = t.getHours()
      , d = t.getMinutes();
    l = l < 10 ? "0".concat(l) : l,
    c = c < 10 ? "0".concat(c) : c,
    u = u < 10 ? "0".concat(u) : u,
    d = d < 10 ? "0".concat(d) : d;
    var f = Math.abs(Date.now() - e);
    return f > ONE_YEAR ? "".concat(t.getFullYear(), "-").concat(l, "-").concat(c) : f > THREE_DAYS ? "".concat(l, "-").concat(c, " ").concat(u, ":").concat(d) : s ? "前天 ".concat(u, ":").concat(d) : a ? "昨天 ".concat(u, ":").concat(d) : i && f > ONE_HOUR ? "今天 ".concat(u, ":").concat(d) : f > ONE_MINUTE ? "".concat(Math.floor(f / ONE_MINUTE), "分钟前") : f > 0 ? "刚刚" : ""
};
function formatDateText3Wrapped(e) {
    if (!e)
        return null;
    if ("string" == typeof e)
        return e;
    var t = Number(new Date(e));
    return formatDateText3(t, !0)
}
var formatNumber2 = function(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1]
      , n = 1e4;
    if (e < n)
        return t ? {
            num: e,
            unit: ""
        } : e;
    var o = Math.floor(Math.log(e) / Math.log(n))
      , r = ["", "万", "亿", "万亿"][o]
      , i = "";
    if (e < 1e6) {
        var a = (i = (e / Math.pow(n, o)).toFixed(1)).split(".");
        return "0" === a[1] ? t ? {
            num: a[0],
            unit: r
        } : a[0] + r : t ? {
            num: i,
            unit: r
        } : i + r
    }
    if (e < 1e8)
        return i = (e / Math.pow(n, o)).toFixed(0),
        t ? {
            num: i,
            unit: r
        } : i + r;
    var s = (i = (e / Math.pow(n, o)).toFixed(1)).split(".");
    return "0" === s[1] ? t ? {
        num: s[0],
        unit: r
    } : s[0] + r : t ? {
        num: i,
        unit: r
    } : i + r
}
  , _hoisted_1$10 = {
    class: "bg-sheet-b-bw-white shadow-sd16 flex flex-col h-100vh w-$width relative"
}
  , _hoisted_2$P = {
    class: "text-s-gray-900 font-medium mt-42px px-32px text-rh4"
}
  , _hoisted_3$D = {
    class: "reader-scrollbar px-16px mt-30px overflow-auto flex-grow pb-32px flex flex-col overscroll-contain"
}
  , _hoisted_4$w = ["onClick"]
  , _hoisted_5$q = {
    class: "w-30px text-left"
}
  , _hoisted_6$n = {
    class: "text-bo2 text-s-gray-900 mb-20px"
}
  , _hoisted_7$l = ["title"]
  , _hoisted_8$l = {
    class: "w-30px flex-shrink-0"
}
  , _hoisted_9$l = {
    class: "py-12px relative flex-grow border-b border-outline-black-8 flex items-center min-w-0"
}
  , _hoisted_10$h = {
    class: "text-bo4 text-s-gray-400 flex-shrink-0 ml-16px"
}
  , _hoisted_11$f = {
    class: "text-bo4 text-s-gray-400 min-w-48px text-right ml-16px"
}
  , _hoisted_12$c = {
    class: "flex items-center px-32px py-16px bottom"
}
  , _hoisted_13$b = {
    class: "font-medium text-s-gray-900 text-s1 pr-16px cursor-pointer flex items-center"
}
  , _hoisted_14$8 = {
    class: "ml-4px text-bo4 text-s-gray-500"
}
  , _sfc_main$1f = defineComponent({
    __name: "CustomSubs",
    props: {
        subsVolumes: null,
        checkedVolume: null
    },
    emits: ["close", "refresh"],
    setup: function(e, t) {
        var n = t.emit
          , o = e
          , r = inject(READER_STATE_KEY, defaultReaderState)
          , i = inject(I18N_IO_FUNC_KEY)
          , a = inject(ROOT_SLOTS_KEY)
          , s = inject(FRONT_CONFIG_STATE_KEY)
          , l = inject(BUS_STATE_KEY)
          , c = reactive({});
        o.checkedVolume && o.subsVolumes.forEach((function(e) {
            e.id && e.id !== o.checkedVolume && (c[e.id] = !0)
        }
        ));
        var u = useSubscribe().subscribe
          , d = useCustomSubs(o.subsVolumes, o.checkedVolume)
          , f = d.pickedCount
          , p = d.pickedConsume
          , h = d.volumeStatus
          , m = d.allPicked
          , _ = d.pickedSeq
          , v = d.onChapterCheck
          , g = d.onVolumeCheck
          , x = d.onAllCheck
          , y = d.getChapterStatus
          , b = useSharedTrack().directive;
        function k() {
            l.emit("_:recharge:update", {
                source: "batch",
                consume: _.value.reduce((function(e, t) {
                    return e + t.price
                }
                ), 0),
                payload: _.value
            })
        }
        function w() {
            var e;
            null === (e = u(_.value, "batch")) || void 0 === e || e.then((function() {
                return n("close")
            }
            )).catch((function(e) {
                e instanceof ServiceError && e.serviceError.type === ErrorType.PriceChange && n("refresh")
            }
            ))
        }
        function E() {
            if (a["quick-recharge-dialog"])
                n("close"),
                k();
            else {
                var e, t, o, r, i = (null === (e = s.value) || void 0 === e || null === (t = (o = e.hrefMap).recharge) || void 0 === t ? void 0 : t.call(o)) || (null === (r = s.value) || void 0 === r ? void 0 : r.rechargeUrl);
                i && window.open(i, "top")
            }
        }
        return watch((function() {
            return o.subsVolumes
        }
        ), k),
        function(t, n) {
            return openBlock(),
            createElementBlock("div", {
                class: "fixed inset-0 flex justify-center z-5",
                onClick: n[2] || (n[2] = withModifiers((function(e) {
                    return t.$emit("close")
                }
                ), ["self"]))
            }, [withDirectives((openBlock(),
            createElementBlock("section", _hoisted_1$10, [createVNode(CloseButton, {
                class: "absolute right-10px top-10px",
                onClick: n[0] || (n[0] = function(e) {
                    return t.$emit("close")
                }
                )
            }), createBaseVNode("div", _hoisted_2$P, toDisplayString(unref(i)("batch_subs")), 1), createBaseVNode("div", _hoisted_3$D, [(openBlock(!0),
            createElementBlock(Fragment, null, renderList(e.subsVolumes, (function(e) {
                return openBlock(),
                createElementBlock(Fragment, {
                    key: e.id
                }, [createBaseVNode("button", {
                    class: "text-rh6 text-s-gray-900 flex justify-between items-center px-16px py-11px w-full bg-s-gray-50 rounded-8px font-medium mb-8px truncate hover-4 active-10 flex-shrink-0",
                    onClick: function(t) {
                        return c[e.id] = !c[e.id]
                    }
                }, [createBaseVNode("div", _hoisted_5$q, [unref(h)[e.id] !== unref(VolumeStatus).Free ? (openBlock(),
                createBlock(Checkbox, {
                    key: 0,
                    rounded: "",
                    class: "align-bottom",
                    "model-value": unref(h)[e.id] === unref(VolumeStatus).Checked || unref(h)[e.id] === unref(VolumeStatus).Disabled,
                    disabled: unref(h)[e.id] === unref(VolumeStatus).Disabled,
                    onClick: n[1] || (n[1] = withModifiers((function() {}
                    ), ["stop"])),
                    "onUpdate:modelValue": function(t) {
                        return unref(g)(e.id, t)
                    }
                }, null, 8, ["model-value", "disabled", "onUpdate:modelValue"])) : createCommentVNode("", !0)]), createTextVNode(toDisplayString(e.title || (e.vip ? unref(i)("main_vip_volume") : unref(i)("main_volume"))), 1), createBaseVNode("span", {
                    class: normalizeClass(["icon-arrow-up-bold text-s-gray-500 text-12px ml-auto", [c[e.id] && "transform rotate-180"]])
                }, null, 2)], 8, _hoisted_4$w), withDirectives(createBaseVNode("ul", _hoisted_6$n, [(openBlock(!0),
                createElementBlock(Fragment, null, renderList(e.list, (function(e) {
                    var t;
                    return openBlock(),
                    createElementBlock("li", {
                        key: e.id
                    }, [createBaseVNode("label", {
                        class: normalizeClass(["align-bottom relative flex items-center px-16px rounded-8px", [!unref(r).unlockedHash[e.id] && e.status === unref(ChapterStatus).Unsubscribe && "cursor-pointer hover-4 active-10"]]),
                        title: e.title
                    }, [createBaseVNode("div", _hoisted_8$l, [e.status !== unref(ChapterStatus).Free ? (openBlock(),
                    createBlock(Checkbox, {
                        key: 0,
                        rounded: "",
                        class: "align-bottom",
                        disabled: unref(r).unlockedHash[e.id] || e.status === unref(ChapterStatus).Subscribed,
                        "model-value": unref(r).unlockedHash[e.id] || e.status === unref(ChapterStatus).Subscribed || !!unref(r).batchSubsChapterHash[e.id],
                        "onUpdate:modelValue": function(t) {
                            return unref(v)(e, t)
                        }
                    }, null, 8, ["disabled", "model-value", "onUpdate:modelValue"])) : createCommentVNode("", !0)]), createBaseVNode("div", _hoisted_9$l, [createBaseVNode("span", {
                        class: normalizeClass(["truncate mr-auto", [(null === (t = unref(r)) || void 0 === t ? void 0 : t.chapterContext.cid) === e.id && "!text-primary-red-500"]])
                    }, toDisplayString(e.title), 3), createBaseVNode("span", _hoisted_10$h, toDisplayString((null == e ? void 0 : e.desc) || unref(formatDateText3Wrapped)(e.publishTime)), 1), createBaseVNode("span", _hoisted_11$f, toDisplayString(unref(y)(e)), 1)])], 10, _hoisted_7$l)])
                }
                )), 128))], 512), [[vShow, !c[e.id]]])], 64)
            }
            )), 128))]), createBaseVNode("div", _hoisted_12$c, [createBaseVNode("label", _hoisted_13$b, [createVNode(Checkbox, {
                rounded: "",
                class: "align-bottom mr-6px",
                "model-value": unref(m),
                "onUpdate:modelValue": unref(x)
            }, null, 8, ["model-value", "onUpdate:modelValue"]), createTextVNode(toDisplayString(unref(i)("check_all")), 1)]), createBaseVNode("div", _hoisted_14$8, toDisplayString(unref(i)("checked_chaps", String(unref(f)))), 1), createVNode(_sfc_main$1g, {
                class: "flex-grow ml-12px",
                consume: unref(p),
                onSubs: w,
                onRecharge: E
            }, null, 8, ["consume"])])])), [[unref(b), {
                e: "batch-subs:custom-page"
            }, "e"]])])
        }
    }
})
  , CustomSubs = _export_sfc(_sfc_main$1f, [["__scopeId", "data-v-a7099336"]])
  , _withScopeId$b = function(e) {
    return pushScopeId("data-v-9d7fd7b7"),
    e = e(),
    popScopeId(),
    e
}
  , _hoisted_1$$ = {
    class: "text-rh4 font-medium text-s-gray-900 <sm:text-rh6"
}
  , _hoisted_2$O = {
    class: "mt-8px text-bo4 text-s-gray-500 <sm:text-c12 <sm:mt-4px"
}
  , _hoisted_3$C = {
    class: "mt-34px flex flex-wrap -mx-6px <sm:mt-16px <sm:-mx-4px"
}
  , _hoisted_4$v = ["disabled", "onClick"]
  , _hoisted_5$p = _withScopeId$b((function() {
    return createBaseVNode("span", {
        class: "icon-arrow-up-bold transform rotate-90 text-s-gray-500 text-10px"
    }, null, -1)
}
))
  , _sfc_main$1e = defineComponent({
    __name: "BatchSubs",
    props: {
        active: null,
        options: null
    },
    emits: ["update:active", "custom"],
    setup: function(e) {
        var t = inject(READER_STATE_KEY, defaultReaderState)
          , n = inject(I18N_IO_FUNC_KEY)
          , o = useSharedTrack().directive
          , r = computed((function() {
            return t.chapterContext.interactChapter || t.chapterContext.visibleChapter
        }
        ));
        return function(t, i) {
            var a;
            return withDirectives((openBlock(),
            createElementBlock("div", null, [createBaseVNode("div", _hoisted_1$$, toDisplayString(unref(n)("subs_following_chaps")), 1), createBaseVNode("div", _hoisted_2$O, toDisplayString(unref(n)("subs_start_from_chap", null === (a = unref(r)) || void 0 === a ? void 0 : a.title)), 1), createBaseVNode("div", _hoisted_3$C, [(openBlock(!0),
            createElementBlock(Fragment, null, renderList(e.options, (function(r, i) {
                return withDirectives((openBlock(),
                createElementBlock("button", {
                    key: r.title,
                    class: normalizeClass(["option", [e.active === i && "!bg-primary-red-50 !text-primary-red-500 !border-current"]]),
                    disabled: r.disabled,
                    onClick: function(e) {
                        return t.$emit("update:active", i)
                    }
                }, [createTextVNode(toDisplayString(r.title), 1), r.disabled ? createCommentVNode("", !0) : (openBlock(),
                createElementBlock("span", {
                    key: 0,
                    class: normalizeClass([[e.active === i && "!text-inherit"], "text-s-gray-500 text-c12"])
                }, toDisplayString(r.consume + unref(n)("unit")), 3))], 10, _hoisted_4$v)), [[unref(o), {
                    e: "batch-subs:".concat(0 === r.count ? "all" : r.count)
                }, "c"]])
            }
            )), 128)), withDirectives((openBlock(),
            createElementBlock("button", {
                class: "option",
                onClick: i[0] || (i[0] = function(e) {
                    return t.$emit("custom")
                }
                )
            }, [createTextVNode(toDisplayString(unref(n)("custom_subs")), 1), _hoisted_5$p])), [[unref(o), {
                e: "batch-subs:custom"
            }, "c"]])])])), [[unref(o), {
                e: "batch-subs"
            }, "e"]])
        }
    }
})
  , BatchSubs = _export_sfc(_sfc_main$1e, [["__scopeId", "data-v-9d7fd7b7"]]);
function useBatchSubs(e) {
    var t = inject(READER_STATE_KEY, defaultReaderState)
      , n = toRef(t.chapterContext, "cid")
      , o = computed((function() {
        var t = [];
        return e.forEach((function(e) {
            return t = t.concat(e.list)
        }
        )),
        t
    }
    ))
      , r = o.value.findIndex((function(e) {
        return e.id === n.value
    }
    ))
      , i = ref(0)
      , a = computed((function() {
        var e = [{
            count: 10,
            title: "后10章",
            consume: 0,
            disabled: !1,
            chapters: []
        }, {
            count: 20,
            title: "后20章",
            consume: 0,
            disabled: !1,
            chapters: []
        }, {
            count: 50,
            title: "后50章",
            consume: 0,
            disabled: !1,
            chapters: []
        }, {
            count: 100,
            title: "后100章",
            consume: 0,
            disabled: !1,
            chapters: []
        }]
          , n = o.value.slice(Math.max(0, r), o.value.length).filter((function(e) {
            return e.status === ChapterStatus.Unsubscribe && !t.unlockedHash[e.id]
        }
        ));
        return e.forEach((function(e) {
            var t = n.slice(0, e.count);
            t.length === e.count ? (e.consume = t.reduce((function(e, t) {
                return e + t.price
            }
            ), 0),
            e.chapters = t) : (e.disabled = !0,
            10 === e.count && (i.value = 4))
        }
        )),
        e.push({
            count: 0,
            title: "全部".concat(n.length, "章"),
            consume: n.reduce((function(e, t) {
                return e + t.price
            }
            ), 0),
            disabled: !1,
            chapters: n
        }),
        e
    }
    ));
    return watch([i, a], (function() {
        for (var e = {}, n = 0; n < a.value[i.value].chapters.length; n++) {
            var o = a.value[i.value].chapters[n];
            e[o.id] = o
        }
        t.batchSubsChapterHash = e
    }
    ), {
        immediate: !0
    }),
    {
        active: i,
        options: a
    }
}
var _hoisted_1$_ = {
    class: "bg-sheet-b-gray-50 rounded-16px overflow-hidden w-520px relative"
}
  , _hoisted_2$N = {
    class: "bg-sheet-b-bw-white py-16px px-32px"
}
  , _sfc_main$1d = defineComponent({
    __name: "BatchSubsDialog",
    props: {
        subsVolumes: null
    },
    emits: ["close", "custom", "refresh"],
    setup: function(e, t) {
        var n = t.emit
          , o = e
          , r = inject(FRONT_CONFIG_STATE_KEY)
          , i = inject(ROOT_SLOTS_KEY)
          , a = inject(BUS_STATE_KEY)
          , s = useBatchSubs(o.subsVolumes)
          , l = s.active
          , c = s.options
          , u = useSubscribe().subscribe;
        function d() {
            a.emit("_:recharge:update", {
                source: "batch",
                consume: c.value[l.value].chapters.reduce((function(e, t) {
                    return e + t.price
                }
                ), 0),
                payload: c.value[l.value].chapters
            })
        }
        function f() {
            var e;
            null === (e = u(c.value[l.value].chapters, "batch")) || void 0 === e || e.then((function() {
                return n("close")
            }
            )).catch((function(e) {
                e instanceof ServiceError && e.serviceError.type === ErrorType.PriceChange && n("refresh")
            }
            ))
        }
        function p() {
            if (i["quick-recharge-dialog"])
                n("close"),
                d();
            else {
                var e, t, o, a, s = (null === (e = r.value) || void 0 === e || null === (t = (o = e.hrefMap).recharge) || void 0 === t ? void 0 : t.call(o)) || (null === (a = r.value) || void 0 === a ? void 0 : a.rechargeUrl);
                s && window.open(s, "top")
            }
        }
        return watch((function() {
            return o.subsVolumes
        }
        ), d),
        function(e, t) {
            return openBlock(),
            createElementBlock("section", {
                class: "fixed z-5 inset-0 flex items-center justify-center",
                onClick: t[3] || (t[3] = withModifiers((function(t) {
                    return e.$emit("close")
                }
                ), ["self"]))
            }, [createBaseVNode("div", _hoisted_1$_, [createVNode(BatchSubs, {
                active: unref(l),
                "onUpdate:active": t[0] || (t[0] = function(e) {
                    return isRef(l) ? l.value = e : null
                }
                ),
                options: unref(c),
                class: "p-32px pb-36px",
                onCustom: t[1] || (t[1] = function(t) {
                    return e.$emit("custom")
                }
                )
            }, null, 8, ["active", "options"]), createBaseVNode("div", _hoisted_2$N, [createVNode(_sfc_main$1g, {
                class: "h-full",
                consume: unref(c)[unref(l)].consume,
                onSubs: f,
                onRecharge: p
            }, null, 8, ["consume"])]), createVNode(CloseButton, {
                class: "top-10px right-10px absolute",
                onClick: t[2] || (t[2] = function(t) {
                    return e.$emit("close", !1)
                }
                )
            })])])
        }
    }
})
  , _sfc_main$1c = defineComponent({
    __name: "index",
    props: {
        modelValue: {
            type: Boolean,
            default: !1
        },
        openCustom: {
            type: Boolean,
            default: !1
        }
    },
    setup: function(e) {
        var t = e
          , n = inject(BUS_STATE_KEY)
          , o = inject(ADAPTERS_KEY)
          , r = inject(I18N_IO_FUNC_KEY)
          , i = inject(USER_STATE_KEY)
          , a = inject(READER_STATE_KEY, defaultReaderState)
          , s = ref(!1)
          , l = ref(!1)
          , c = ref(null)
          , u = ref("");
        function d() {
            var e, t, n, a = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
            if (null != i && null !== (e = i.value) && void 0 !== e && e.id) {
                var s = null;
                return a || (s = useToast({
                    title: r("loading"),
                    type: "loading"
                })),
                null === (t = o.processBatchSubsList) || void 0 === t ? void 0 : t.call(o).then((function(e) {
                    var t;
                    c.value = e,
                    null === (t = s) || void 0 === t || t.stop()
                }
                )).catch((function(e) {
                    var t;
                    null === (t = s) || void 0 === t || t.stop(),
                    handleError(e, r("load_failed"))
                }
                ))
            }
            null === (n = o.processLogin) || void 0 === n || n.call(o)
        }
        function f(e, t) {
            var n;
            "_:batch-subs:open" === e ? null === (n = d()) || void 0 === n || n.then((function() {
                "custom" === (null == t ? void 0 : t.type) ? (l.value = !0,
                u.value = t.volumeId) : (s.value = !0,
                u.value = "")
            }
            )) : "_:refetch-batch-subs" === e && d(!0)
        }
        function p() {
            s.value = !1,
            l.value = !0,
            a.isChapterListOpen = !1
        }
        return onMounted((function() {
            return n.on(f)
        }
        )),
        onUnmounted((function() {
            return n.off(f)
        }
        )),
        watch((function() {
            return t.modelValue
        }
        ), (function(e) {
            var n;
            e && (null === (n = d()) || void 0 === n || n.then((function() {
                t.openCustom ? l.value = !0 : s.value = !0
            }
            )))
        }
        )),
        function(e, t) {
            return openBlock(),
            createElementBlock(Fragment, null, [createVNode(DialogMask, {
                modelValue: s.value,
                "onUpdate:modelValue": t[0] || (t[0] = function(e) {
                    return s.value = e
                }
                )
            }, null, 8, ["modelValue"]), createVNode(Transition, {
                name: "slide-vertical"
            }, {
                default: withCtx((function() {
                    return [s.value && c.value ? (openBlock(),
                    createBlock(_sfc_main$1d, {
                        key: 0,
                        "subs-volumes": c.value,
                        onClose: t[1] || (t[1] = function(e) {
                            return s.value = !1
                        }
                        ),
                        onCustom: p
                    }, null, 8, ["subs-volumes"])) : createCommentVNode("", !0)]
                }
                )),
                _: 1
            }), createVNode(DialogMask, {
                modelValue: l.value,
                "onUpdate:modelValue": t[2] || (t[2] = function(e) {
                    return l.value = e
                }
                )
            }, null, 8, ["modelValue"]), createVNode(Transition, {
                name: "slide-vertical"
            }, {
                default: withCtx((function() {
                    return [l.value && c.value ? (openBlock(),
                    createBlock(CustomSubs, {
                        key: 0,
                        "subs-volumes": c.value,
                        "checked-volume": u.value,
                        onClose: t[3] || (t[3] = function(e) {
                            return l.value = !1
                        }
                        )
                    }, null, 8, ["subs-volumes", "checked-volume"])) : createCommentVNode("", !0)]
                }
                )),
                _: 1
            })], 64)
        }
    }
});
function sameDomain(e) {
    var t = /(?:https?:\/\/)?([\w-]+\.[\w-]+\.[\w-]+(?:\.[\w-]+)?)/.exec(e);
    return !t || !t[1] || t[1] === window.location.hostname
}
var _hoisted_1$Z = ["href", "target", "onClick"]
  , _sfc_main$1b = defineComponent({
    __name: "Link",
    props: {
        href: null,
        history: null
    },
    setup: function(e) {
        var t = e
          , n = inject(FRONT_CONFIG_STATE_KEY)
          , o = inject(READER_STATE_KEY, defaultReaderState)
          , r = inject(BUS_STATE_KEY);
        function i(e) {
            if (o.isChapterLoading)
                return e.preventDefault();
            t.href && (o.lastChapterLoadMethod = "single",
            t.history && null != n && n.value && sameDomain(t.href) && !n.value.disableChapterAjax && (e.preventDefault(),
            r.emit("_:update-chapters", {
                ids: [t.history.cid],
                href: t.href
            })))
        }
        return function(t, n) {
            return openBlock(),
            createElementBlock("a", {
                href: e.href,
                target: e.history ? void 0 : "_blank",
                onClick: withModifiers(i, ["stop"])
            }, [renderSlot(t.$slots, "default")], 8, _hoisted_1$Z)
        }
    }
});
function useChapterList(e, t) {
    var n = ref(!1)
      , o = computed((function() {
        var t = JSON.parse(JSON.stringify(e.value));
        return t.reverse(),
        null == t || t.forEach((function(e) {
            return e.list.reverse()
        }
        )),
        t
    }
    ))
      , r = computed((function() {
        var t, n = [];
        return null === (t = e.value) || void 0 === t || t.forEach((function(e) {
            return n = n.concat(e.list)
        }
        )),
        n
    }
    ))
      , i = computed((function() {
        return r.value.length
    }
    ))
      , a = computed((function() {
        if (null == t || !t.value)
            return null;
        for (var e = 0; e < r.value.length; e++) {
            var n = r.value[e];
            if (String(n.id) === String(t.value))
                return e
        }
        return null
    }
    ));
    return {
        chapterSize: i,
        isReverse: n,
        reverseChapterList: o,
        flatChapterList: r,
        curIndex: a
    }
}
var _withScopeId$a = function(e) {
    return pushScopeId("data-v-5e4ffb7a"),
    e = e(),
    popScopeId(),
    e
}
  , _hoisted_1$Y = {
    class: "top-0 fixed left-1/2 top-0 bottom-0 z-4"
}
  , _hoisted_2$M = {
    class: "text-s-gray-700 mt-36px pl-22px pr-32px flex items-end"
}
  , _hoisted_3$B = {
    class: "text-rh4"
}
  , _hoisted_4$u = {
    key: 0,
    class: "ml-8px text-s-gray-500 text-s3 font-medium"
}
  , _hoisted_5$o = {
    key: 0,
    class: "ml-auto flex items-center"
}
  , _hoisted_6$m = _withScopeId$a((function() {
    return createBaseVNode("span", {
        class: "icon-cart text-20px mr-4px"
    }, null, -1)
}
))
  , _hoisted_7$k = {
    class: "reader-scrollbar px-16px mt-24px overflow-auto pb-32px overscroll-contain"
}
  , _hoisted_8$k = ["onClick"]
  , _hoisted_9$k = {
    class: "ml-6px py-3px px-5px rounded-6px bg-primary-red-50 text-primary-red-500 text-t1 mr-auto"
}
  , _hoisted_10$g = {
    key: 0,
    class: "inline-flex items-center"
}
  , _hoisted_11$e = ["onClick"]
  , _hoisted_12$b = _withScopeId$a((function() {
    return createBaseVNode("span", {
        class: "w-1px inline-block h-20px bg-outline-black-8 mx-16px"
    }, null, -1)
}
))
  , _hoisted_13$a = ["data-volume"]
  , _hoisted_14$7 = ["id"]
  , _hoisted_15$5 = {
    key: 0,
    class: "flex-shrink-0 text-s-gray-500"
}
  , _hoisted_16$5 = {
    key: 1,
    class: "icon-lock text-20px flex-shrink-0 ml-6px"
}
  , _sfc_main$1a = defineComponent({
    __name: "ChapterList",
    setup: function(e) {
        var t = inject(I18N_IO_FUNC_KEY)
          , n = inject(FRONT_CONFIG_STATE_KEY)
          , o = inject(BOOK_STATE_KEY)
          , r = inject(CHAPTER_LIST_STATE_KEY)
          , i = inject(READER_STATE_KEY, defaultReaderState)
          , a = inject(ADAPTERS_KEY)
          , s = inject(BUS_STATE_KEY)
          , l = inject(ROOT_SLOTS_KEY)
          , c = inject(CHAPTERS_STATE_KEY)
          , u = ref("chapter-list")
          , d = ref([])
          , f = reactive({})
          , p = reactive({})
          , h = computed((function() {
            var e;
            return (null == i || null === (e = i.chapterContext.visibleChapter) || void 0 === e ? void 0 : e.id) || (null == i ? void 0 : i.chapterContext.cid)
        }
        ))
          , m = computed((function() {
            return a.processBatchSubsList && c.value[0] && !("bookPrice"in c.value[0])
        }
        ))
          , _ = useSharedTrack().directive
          , v = useChapterList(r, h)
          , g = v.isReverse
          , x = v.chapterSize
          , y = v.reverseChapterList;
        function b(e) {
            return [e.title, e.wordCount ? "字数：".concat(formatNumber2(e.wordCount)) : "", e.publishTime ? "时间：".concat(formatDateText3Wrapped(e.publishTime)) : ""].join(" ")
        }
        function k(e) {
            i.chapterContext.interactChapter = i.chapterContext.visibleChapter,
            e ? s.emit("_:batch-subs:open", {
                type: "custom",
                volumeId: e
            }) : s.emit("_:batch-subs:open")
        }
        return watch((function() {
            return i.isChapterListOpen
        }
        ), (function(e) {
            if (e) {
                var n, o = !!r.value;
                a.processChapterList && "chapter-list" === u.value && (null === (n = function() {
                    var e, n = null;
                    return r.value || (n = useToast({
                        title: t("loading"),
                        type: "loading"
                    })),
                    null === (e = a.processChapterList) || void 0 === e ? void 0 : e.call(a).then((function(e) {
                        var t;
                        r.value = e,
                        null === (t = n) || void 0 === t || t.stop()
                    }
                    )).catch((function(e) {
                        var o;
                        null === (o = n) || void 0 === o || o.stop(),
                        handleError(e, t("load_failed"))
                    }
                    ))
                }()) || void 0 === n || n.then((function() {
                    o || nextTick((function() {
                        var e;
                        null === (e = document.getElementById("chapter-item-".concat(h.value))) || void 0 === e || e.scrollIntoView()
                    }
                    ))
                }
                ))),
                o && nextTick((function() {
                    var e;
                    null === (e = document.getElementById("chapter-item-".concat(h.value))) || void 0 === e || e.scrollIntoView()
                }
                ))
            }
        }
        )),
        function(e, s) {
            return openBlock(),
            createBlock(Transition, {
                name: "slide-vertical"
            }, {
                default: withCtx((function() {
                    return [withDirectives(createBaseVNode("div", _hoisted_1$Y, [createBaseVNode("div", {
                        id: "chapter-list",
                        class: normalizeClass([[unref(i).isSideSheetOpen && "clg:-left-200px"], "flex flex-col h-full transform -translate-x-1/2 bg-sheet-b-bw-white shadow-sd16 w-$width top-0 bottom-0 absolute"])
                    }, [createBaseVNode("div", _hoisted_2$M, [createBaseVNode("div", _hoisted_3$B, [(openBlock(),
                    createBlock(resolveDynamicComponent(unref(a).processBookmarkList ? "button" : "span"), {
                        class: normalizeClass(["py-6px px-10px rounded-8px", [unref(a).processBookmarkList && "hover-4 active-8", "chapter-list" === u.value && unref(a).processBookmarkList && "font-medium text-s-gray-900 relative after:content-DEFAULT after:-bottom-4px after:left-1/2 after:w-12px after:h-3px after:bg-primary-red-500 after:rounded-2px after:block after:transform after:-translate-x-1/2 after:absolute"]]),
                        onClick: s[0] || (s[0] = function(e) {
                            return unref(a).processBookmarkList && (u.value = "chapter-list")
                        }
                        )
                    }, {
                        default: withCtx((function() {
                            return [createTextVNode(toDisplayString(unref(t)("chapter_list")), 1)]
                        }
                        )),
                        _: 1
                    }, 8, ["class"])), unref(o) ? (openBlock(),
                    createElementBlock("span", _hoisted_4$u, toDisplayString(("string" == typeof unref(o).status ? unref(o).status : unref(t)(unref(o).status ? "chaps_finished" : "chaps_serialized")) + " · " + unref(t)("total_chaps", String(unref(x)))), 1)) : createCommentVNode("", !0), unref(a).processBookmarkList ? withDirectives((openBlock(),
                    createElementBlock("button", {
                        key: 1,
                        class: normalizeClass(["ml-18px hover-4 active-8 py-6px px-10px rounded-8px", ["bookmark-list" === u.value && "font-medium text-s-gray-900 relative after:content-DEFAULT after:-bottom-4px after:left-1/2 after:w-12px after:h-3px after:bg-primary-red-500 after:rounded-2px after:block after:transform after:-translate-x-1/2 after:absolute"]]),
                        onClick: s[1] || (s[1] = function(e) {
                            return u.value = "bookmark-list"
                        }
                        )
                    }, [createTextVNode(toDisplayString(unref(t)("bookmark")), 1)], 2)), [[unref(_), {
                        e: "bookmark-list:tab"
                    }, "c"]]) : createCommentVNode("", !0)]), "chapter-list" === u.value ? (openBlock(),
                    createElementBlock("div", _hoisted_5$o, [unref(m) ? (openBlock(),
                    createElementBlock("button", {
                        key: 0,
                        class: "text-s3 flex items-center px-6px py-3px rounded-8px hover-4 mr-8px -mb-3px active-10 font-medium",
                        onClick: s[2] || (s[2] = function(e) {
                            return k()
                        }
                        )
                    }, [_hoisted_6$m, createTextVNode(" " + toDisplayString(unref(t)("batch_subs")), 1)])) : createCommentVNode("", !0), withDirectives((openBlock(),
                    createElementBlock("button", {
                        class: "text-s3 flex items-center px-6px py-3px rounded-8px hover-4 -mr-6px -mb-3px active-10 font-medium",
                        onClick: s[3] || (s[3] = function(e) {
                            return g.value = !unref(g)
                        }
                        )
                    }, [createBaseVNode("span", {
                        class: normalizeClass(["icon-sort text-20px mr-4px", [unref(g) && "transform rotate-180"]])
                    }, null, 2), createTextVNode(" " + toDisplayString(unref(g) ? unref(t)("ascending") : unref(t)("descending")), 1)])), [[unref(_), function() {
                        return {
                            e: "chapter-list:sort",
                            ctx: !unref(g)
                        }
                    }
                    ]])])) : createCommentVNode("", !0)]), withDirectives((openBlock(),
                    createElementBlock("div", _hoisted_7$k, [(openBlock(!0),
                    createElementBlock(Fragment, null, renderList(unref(g) ? unref(y) : unref(r), (function(r) {
                        return openBlock(),
                        createElementBlock(Fragment, {
                            key: "id"in r ? r.id : e.index
                        }, ["id"in r ? withDirectives((openBlock(),
                        createElementBlock("button", {
                            key: 0,
                            class: "text-rh6 text-s-gray-900 flex justify-between items-center px-16px py-11px w-full bg-s-gray-50 rounded-8px font-medium truncate hover-4 active-10 flex-shrink-0",
                            onClick: function(e) {
                                return function(t) {
                                    if (!p[t] && d.value) {
                                        var n, o = _createForOfIteratorHelper(d.value);
                                        try {
                                            for (o.s(); !(n = o.n()).done; ) {
                                                var r = n.value;
                                                if (r.dataset.volume === t) {
                                                    r.style.height = "".concat(r.offsetHeight, "px"),
                                                    p[t] = r.offsetHeight;
                                                    break
                                                }
                                            }
                                        } catch (e) {
                                            o.e(e)
                                        } finally {
                                            o.f()
                                        }
                                    }
                                    nextTick((function() {
                                        return f[t] = !f[t]
                                    }
                                    ))
                                }(r.id)
                            }
                        }, [createBaseVNode("span", null, toDisplayString(r.title || (r.vip ? unref(t)("main_vip_volume") : unref(t)("main_volume"))), 1), createBaseVNode("span", _hoisted_9$k, toDisplayString(r.vip ? "VIP" : unref(t)("free")), 1), r.vip && unref(m) ? (openBlock(),
                        createElementBlock("span", _hoisted_10$g, [createBaseVNode("button", {
                            class: "text-s-gray-900 text-s3 font-medium",
                            onClick: withModifiers((function(e) {
                                return k(r.id)
                            }
                            ), ["stop"])
                        }, toDisplayString(unref(t)("subs_current_volume")), 9, _hoisted_11$e), _hoisted_12$b])) : createCommentVNode("", !0), createBaseVNode("span", {
                            class: normalizeClass(["icon-arrow-up-bold text-s-gray-500 text-12px transition duration-400", [f[r.id] && "transform rotate-180"]])
                        }, null, 2)], 8, _hoisted_8$k)), [[unref(_), function() {
                            return {
                                e: "chapter-list:volume",
                                ctx: _objectSpread(_objectSpread({}, r), {}, {
                                    collapse: f[r.id]
                                })
                            }
                        }
                        , "c"]]) : createCommentVNode("", !0), createBaseVNode("ul", {
                            ref_for: !0,
                            ref_key: "$volumes",
                            ref: d,
                            "data-volume": r.id,
                            class: normalizeClass(["text-bo2 text-s-gray-900 overflow-hidden volume my-8px", [f[r.id] ? "!h-0" : "!mb-20px"]])
                        }, [(openBlock(!0),
                        createElementBlock(Fragment, null, renderList(r.list, (function(e) {
                            var r, a;
                            return openBlock(),
                            createElementBlock("li", {
                                id: "chapter-item-".concat(e.id),
                                key: e.id,
                                class: normalizeClass([[(unref(i).unlockedHash && e.id in unref(i).unlockedHash ? !unref(i).unlockedHash[e.id] : e.status === unref(ChapterStatus).Unsubscribe) && "text-s-gray-500", (null === (r = unref(i)) || void 0 === r ? void 0 : r.isWestern) && "!w-full"], "w-1/2 inline-block align-bottom relative after:content-DEFAULT after:absolute after:left-16px after:right-16px after:bottom-0 after:h-1px after:bg-outline-black-8"])
                            }, [withDirectives((openBlock(),
                            createBlock(_sfc_main$1b, {
                                class: "py-12px px-16px flex items-center justify-between rounded-8px hover-4 active-8",
                                href: null === (a = unref(n)) || void 0 === a ? void 0 : a.hrefMap.read(e.id, "chapter-list", e),
                                title: b(e),
                                history: {
                                    cid: e.id
                                },
                                onClick: s[4] || (s[4] = function(e) {
                                    return unref(i).isChapterListOpen = !1
                                }
                                )
                            }, {
                                default: withCtx((function() {
                                    var n;
                                    return [(openBlock(),
                                    createBlock(resolveDynamicComponent(unref(l)["chapter-list-item"]), {
                                        chapter: e
                                    }, null, 8, ["chapter"])), unref(l)["chapter-list-item"] ? createCommentVNode("", !0) : (openBlock(),
                                    createElementBlock(Fragment, {
                                        key: 0
                                    }, [createBaseVNode("span", {
                                        class: normalizeClass(["truncate", [String(unref(h)) === String(e.id) && "!text-primary-red-500"]])
                                    }, toDisplayString(e.title), 3), 8 === (null === (n = unref(o)) || void 0 === n ? void 0 : n.checkLevel) ? (openBlock(),
                                    createElementBlock("span", _hoisted_15$5, toDisplayString(unref(t)("removed")), 1)) : (unref(i).unlockedHash && e.id in unref(i).unlockedHash ? unref(i).unlockedHash[e.id] : e.status !== unref(ChapterStatus).Unsubscribe) ? createCommentVNode("", !0) : (openBlock(),
                                    createElementBlock("span", _hoisted_16$5))], 64))]
                                }
                                )),
                                _: 2
                            }, 1032, ["href", "title", "history"])), [[unref(_), {
                                e: "chapter-list:chapter",
                                ctx: e
                            }]])], 10, _hoisted_14$7)
                        }
                        )), 128))], 10, _hoisted_13$a)], 64)
                    }
                    )), 128))])), [[vShow, unref(r) && "chapter-list" === u.value], [unref(_), {
                        e: "chapter-list"
                    }, "e"]]), "bookmark-list" === u.value ? (openBlock(),
                    createBlock(resolveDynamicComponent(unref(l)["bookmark-list"]), {
                        key: 0
                    })) : createCommentVNode("", !0), createVNode(CloseButton, {
                        class: "absolute right-10px top-10px z-1",
                        onClick: s[5] || (s[5] = function(e) {
                            return unref(i).isChapterListOpen = !1
                        }
                        )
                    })], 2)], 512), [[vShow, unref(i).isChapterListOpen]])]
                }
                )),
                _: 1
            })
        }
    }
})
  , DesktopChapterList = _export_sfc(_sfc_main$1a, [["__scopeId", "data-v-5e4ffb7a"]])
  , _hoisted_1$X = {
    class: "text-bo4 text-s-gray-500 mt-2px group-hover:text-primary-red-500"
}
  , _sfc_main$19 = defineComponent({
    __name: "MenuButton",
    props: {
        tag: {
            default: "button"
        },
        icon: null,
        active: {
            type: Boolean,
            default: !1
        }
    },
    setup: function(e) {
        return function(t, n) {
            return openBlock(),
            createBlock(resolveDynamicComponent(e.tag), {
                class: normalizeClass(["w-64px h-64px flex flex-col items-center justify-center rounded-8px bg-sheet-b-gray-50 text-s-gray-900 noise-bg group hover:bg-sheet-b-bw-white hover:text-primary-red-500 hover:bg-none", [e.active && "!bg-sheet-b-bw-white shadow-sd16"]])
            }, {
                default: withCtx((function() {
                    return [createBaseVNode("span", {
                        class: normalizeClass("icon-".concat(e.icon, " text-24px"))
                    }, null, 2), createBaseVNode("span", _hoisted_1$X, [renderSlot(t.$slots, "default")]), renderSlot(t.$slots, "body")]
                }
                )),
                _: 3
            }, 8, ["class"])
        }
    }
})
  , _sfc_main$18 = {}
  , _hoisted_1$W = {
    width: "8",
    height: "18",
    viewBox: "0 0 8 18",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
}
  , _hoisted_2$L = createBaseVNode("path", {
    d: "M1.191 10.457a1.778 1.778 0 0 1 0-2.914L5.725 4.37A5.334 5.334 0 0 0 8 0v18c0-1.74-.85-3.372-2.275-4.37L1.19 10.457z",
    fill: "currentColor"
}, null, -1)
  , _hoisted_3$A = [_hoisted_2$L];
function _sfc_render$3(e, t) {
    return openBlock(),
    createElementBlock("svg", _hoisted_1$W, _hoisted_3$A)
}
var Triangle$1 = _export_sfc(_sfc_main$18, [["render", _sfc_render$3]])
  , _sfc_main$17 = defineComponent({
    __name: "Tooltip",
    props: {
        show: {
            type: Boolean,
            default: !0
        },
        hover: {
            type: Boolean
        },
        content: null,
        position: {
            default: "right"
        }
    },
    setup: function(e) {
        return function(t, n) {
            return openBlock(),
            createElementBlock("div", {
                class: normalizeClass(["tooltip-wrapper relative flex", e.hover && "hover-mode"])
            }, [renderSlot(t.$slots, "default", {}, void 0, !0), e.show || e.hover ? (openBlock(),
            createElementBlock("div", {
                key: 0,
                class: normalizeClass(["tooltip absolute rounded-8px bg-gray-800 text-on-image-bw-white text-bo4 px-12px py-7px whitespace-nowrap transform filter shadow-sd8 whitespace-pre", [e.position, "left" === e.position && "right-full top-1/2 mr-16px -translate-y-1/2 after:left-full after:-ml-1px after:top-1/2 after:-translate-y-1/2 after:rotate-180", "right" === e.position && "left-full top-1/2 ml-16px -translate-y-1/2 after:right-full after:top-1/2 after:-translate-y-1/2", "top" === e.position && "bottom-full left-1/2 mb-16px -translate-x-1/2 after:top-full after:left-1/2 after:-translate-x-1/2 after:rotate-270"]])
            }, [createTextVNode(toDisplayString(e.content), 1), createVNode(Triangle$1, {
                class: normalizeClass(["text-gray-800 absolute transform", ["left" === e.position && "left-full -ml-1px top-1/2 -translate-y-1/2 rotate-180", "right" === e.position && "right-full top-1/2 -translate-y-1/2", "top" === e.position && "top-full left-1/2 -translate-x-1/2 rotate-270 -mt-6px"]])
            }, null, 8, ["class"])], 2)) : createCommentVNode("", !0)], 2)
        }
    }
})
  , Tooltip = _export_sfc(_sfc_main$17, [["__scopeId", "data-v-6cdbc58a"]]);
function setMetaTheme(e) {
    var t = document.querySelector('meta[name="theme-color"]');
    t ? t.content = e : ((t = document.createElement("meta")).name = "theme-color",
    t.content = e,
    document.head.appendChild(t))
}
function getTokenValue(e) {
    try {
        var t = document.getElementById("reader");
        if (t)
            return window.getComputedStyle(t).getPropertyValue(e).trim()
    } catch (n) {
        return ""
    }
    return ""
}
function useTheme() {
    var e = inject(READER_STATE_KEY, defaultReaderState)
      , t = toRefs(e.settings)
      , n = t.theme
      , o = t.lastLightTheme
      , r = useStyleTag("")
      , i = r.css
      , a = r.unload;
    function s() {
        nextTick((function() {
            var e = getTokenValue("--background-gray-50");
            e && (i.value = "html{color-scheme:".concat("dark" === n.value ? "dark" : "unset", ";}"),
            setMetaTheme(e))
        }
        ))
    }
    return onMounted((function() {
        s(),
        document.body.dataset.theme = n.value
    }
    )),
    onUnmounted((function() {
        a();
        var e = document.getElementById("meta-theme");
        e && document.head.removeChild(e)
    }
    )),
    watch(n, (function(e) {
        document.body.dataset.theme = e,
        s(),
        "dark" !== e && (o.value = e)
    }
    )),
    {
        toggleDark: function() {
            "dark" === n.value ? n.value = o.value : (o.value = n.value,
            n.value = "dark")
        }
    }
}
function useShelf() {
    var e = inject(READER_STATE_KEY, defaultReaderState)
      , t = inject(I18N_IO_FUNC_KEY)
      , n = inject(ADAPTERS_KEY)
      , o = !1;
    return {
        add: function() {
            var r;
            o || (o = !0,
            null === (r = n.processAddShelf) || void 0 === r || r.call(n).then((function() {
                e.isInShelf = !0,
                o = !1,
                useToast({
                    title: t("add_to_shelf_succeed"),
                    type: "success"
                })
            }
            )).catch((function(e) {
                o = !1,
                handleError(e, t("add_to_shelf_failed"))
            }
            )))
        }
    }
}
var useSharedShelf = createSharedComposable(useShelf);
function useDeviceSize() {
    var e = ref(0)
      , t = ref(0);
    function n() {
        e.value = window.innerWidth,
        t.value = window.innerHeight
    }
    return onMounted((function() {
        n(),
        window.addEventListener("resize", n, !!support() && {
            passive: !0
        })
    }
    )),
    onUnmounted((function() {
        window.removeEventListener("resize", n)
    }
    )),
    {
        width: e,
        height: t
    }
}
var _hoisted_1$V = {
    class: "bg-sheet-b-bw-white shadow-sd16"
}
  , _hoisted_2$K = {
    class: "relative"
}
  , _sfc_main$16 = defineComponent({
    __name: "AppGuide",
    props: {
        showClose: {
            type: Boolean,
            default: !0
        }
    },
    emits: ["close"],
    setup: function(e) {
        var t = inject(ROOT_SLOTS_KEY)
          , n = inject(READER_STATE_KEY, defaultReaderState);
        return function(o, r) {
            var i;
            return openBlock(),
            createElementBlock("section", _hoisted_1$V, [createBaseVNode("div", _hoisted_2$K, [unref(t)["desktop-app-guide-content"] ? (openBlock(),
            createBlock(resolveDynamicComponent(unref(t)["desktop-app-guide-content"]), {
                key: 0,
                chapter: null === (i = unref(n)) || void 0 === i ? void 0 : i.chapterContext.visibleChapter
            }, null, 8, ["chapter"])) : createCommentVNode("", !0), e.showClose ? (openBlock(),
            createBlock(CloseButton, {
                key: 1,
                class: "absolute right-10px top-10px",
                onClick: r[0] || (r[0] = function(e) {
                    return o.$emit("close")
                }
                )
            })) : createCommentVNode("", !0)])])
        }
    }
})
  , _hoisted_1$U = ["href"]
  , _hoisted_2$J = ["href"]
  , _hoisted_3$z = ["href"]
  , _hoisted_4$t = {
    class: "app-guide-wrapper"
}
  , _sfc_main$15 = defineComponent({
    __name: "Menu",
    setup: function(e) {
        var t = inject(FRONT_CONFIG_STATE_KEY)
          , n = inject(CONFIG_STATE_KEY)
          , o = inject(READER_STATE_KEY, defaultReaderState)
          , r = inject(USER_STATE_KEY)
          , i = inject(I18N_IO_FUNC_KEY)
          , a = inject(ADAPTERS_KEY)
          , s = inject(BUS_STATE_KEY)
          , l = toRef(o.settings, "theme")
          , c = "".concat(STORAGE_PREFIX, ":last-access-ticket")
          , u = useTheme().toggleDark
          , d = useSharedShelf().add
          , f = useSharedScroll().top
          , p = useDeviceSize().height
          , h = useSharedTrack().directive
          , m = computed((function() {
            return f.value > p.value
        }
        ))
          , _ = ref(!1);
        function v() {
            var e, t;
            null != r && null !== (e = r.value) && void 0 !== e && e.id ? o.isInShelf || d() : null === (t = a.processLogin) || void 0 === t || t.call(a)
        }
        function g() {
            window.scrollTo(0, 0)
        }
        function x() {
            var e, n, i, s, l;
            null != r && null !== (e = r.value) && void 0 !== e && e.id ? (_.value = !1,
            null == t || null === (n = t.value) || void 0 === n || null === (i = n.onVote) || void 0 === i || i.call(n, (null === (s = o.chapterContext.visibleChapter) || void 0 === s ? void 0 : s.id) || o.chapterContext.cid),
            window.localStorage.setItem(c, String(Date.now()))) : null === (l = a.processLogin) || void 0 === l || l.call(a)
        }
        function y() {
            var e = "toolbar:app:hover"
              , t = "app-qrcode:shown";
            s.emit(e, {
                e: e
            }),
            s.emit(t, {
                e: t
            })
        }
        function b() {
            var e = "app-qrcode:hide";
            s.emit(e, {
                e: e
            })
        }
        function k() {
            o.isChapterListOpen = !o.isChapterListOpen,
            o.isSettingsOpen = !1
        }
        function w() {
            o.isSettingsOpen = !o.isSettingsOpen,
            o.isChapterListOpen = !1
        }
        return onMounted((function() {
            watch((function() {
                return o.ticket
            }
            ), (function(e) {
                var t = window.localStorage.getItem(c) || 0;
                _.value = !!(e && e > 0 && Date.now() - Number(t) > 864e5)
            }
            ), {
                immediate: !0
            })
        }
        )),
        function(e, r) {
            var a, s, c, d, f, p, E;
            return withDirectives((openBlock(),
            createElementBlock("div", {
                class: normalizeClass(["pl-12px", [unref(m) ? "pb-64px" : "pb-136px", unref(o).isGuideOpen ? "z-6" : "z-4"]])
            }, [createVNode(Tooltip, {
                content: unref(i)("chapter_list_guide"),
                show: unref(o).isGuideOpen,
                position: "right"
            }, {
                default: withCtx((function() {
                    var e, n, r;
                    return [withDirectives((openBlock(),
                    createElementBlock("a", {
                        target: "_blank",
                        href: null === (e = unref(t)) || void 0 === e || null === (n = (r = e.hrefMap).chapterList) || void 0 === n ? void 0 : n.call(r)
                    }, [createVNode(_sfc_main$19, {
                        active: unref(o).isChapterListOpen,
                        icon: "list",
                        onClick: withModifiers(k, ["prevent"])
                    }, {
                        default: withCtx((function() {
                            return [createTextVNode(toDisplayString(unref(i)("chapter_list")), 1)]
                        }
                        )),
                        _: 1
                    }, 8, ["active", "onClick"])], 8, _hoisted_1$U)), [[unref(h), {
                        e: "toolbar:chapter-list"
                    }, "c"]])]
                }
                )),
                _: 1
            }, 8, ["content", "show"]), null !== (a = unref(t)) && void 0 !== a && a.hrefMap.detail ? (openBlock(),
            createBlock(Tooltip, {
                key: 0,
                class: "mt-8px",
                content: unref(i)("detail_guide"),
                show: unref(o).isGuideOpen,
                position: "right"
            }, {
                default: withCtx((function() {
                    var e, n, o, r;
                    return [withDirectives((openBlock(),
                    createElementBlock("a", {
                        class: "block",
                        rel: "nofollow",
                        target: "_blank",
                        href: null === (e = unref(t)) || void 0 === e || null === (n = (o = e.hrefMap).detail) || void 0 === n ? void 0 : n.call(o, null === (r = unref(t)) || void 0 === r ? void 0 : r.bid)
                    }, [createVNode(_sfc_main$19, {
                        icon: "open-book"
                    }, {
                        default: withCtx((function() {
                            return [createTextVNode(toDisplayString(unref(i)("book_detail")), 1)]
                        }
                        )),
                        _: 1
                    })], 8, _hoisted_2$J)), [[unref(h), {
                        e: "toolbar:detail"
                    }, "c"]])]
                }
                )),
                _: 1
            }, 8, ["content", "show"])) : createCommentVNode("", !0), null !== (s = unref(t)) && void 0 !== s && s.hrefMap.shelf && !unref(o).isDisableAction ? (openBlock(),
            createBlock(Tooltip, {
                key: 1,
                class: "mt-8px",
                content: unref(i)("shelf_guide"),
                show: unref(o).isGuideOpen,
                position: "right"
            }, {
                default: withCtx((function() {
                    var e, n, r;
                    return [unref(o).isInShelf ? (openBlock(),
                    createElementBlock("a", {
                        key: 0,
                        target: "_blank",
                        class: "block",
                        href: null === (e = unref(t)) || void 0 === e || null === (n = (r = e.hrefMap).shelf) || void 0 === n ? void 0 : n.call(r)
                    }, [createVNode(_sfc_main$19, {
                        icon: "check-round"
                    }, {
                        default: withCtx((function() {
                            return [createTextVNode(toDisplayString(unref(i)("in_shelf")), 1)]
                        }
                        )),
                        _: 1
                    })], 8, _hoisted_3$z)) : withDirectives((openBlock(),
                    createBlock(_sfc_main$19, {
                        key: 1,
                        icon: "add-shelf",
                        onClick: v
                    }, {
                        default: withCtx((function() {
                            return [createTextVNode(toDisplayString(unref(i)("add_to_shelf")), 1)]
                        }
                        )),
                        _: 1
                    })), [[unref(h), {
                        e: "toolbar:add-shelf"
                    }, "c"]])]
                }
                )),
                _: 1
            }, 8, ["content", "show"])) : createCommentVNode("", !0), null !== (c = unref(t)) && void 0 !== c && c.onVote && !unref(o).isDisableAction ? (openBlock(),
            createBlock(Tooltip, {
                key: 2,
                content: unref(i)("vote_guide"),
                show: unref(o).isGuideOpen,
                position: "right",
                class: "mt-8px"
            }, {
                default: withCtx((function() {
                    return [withDirectives((openBlock(),
                    createBlock(_sfc_main$19, {
                        icon: "vote",
                        onClick: x
                    }, {
                        body: withCtx((function() {
                            return [createBaseVNode("div", {
                                class: normalizeClass(["absolute top-5px right-16px content-DEFAULT absolute w-8px h-8px rounded-1 bg-primary-red-500 border border-b-bw-white", [_.value ? "block" : "hidden"]])
                            }, null, 2)]
                        }
                        )),
                        default: withCtx((function() {
                            return [createTextVNode(toDisplayString(unref(i)("vote")), 1)]
                        }
                        )),
                        _: 1
                    })), [[unref(h), {
                        e: "toolbar:vote"
                    }, "c"]])]
                }
                )),
                _: 1
            }, 8, ["content", "show"])) : createCommentVNode("", !0), createVNode(Tooltip, {
                content: unref(i)("dark_mode_guide"),
                show: unref(o).isGuideOpen,
                position: "right",
                class: "mt-8px"
            }, {
                default: withCtx((function() {
                    return [withDirectives((openBlock(),
                    createBlock(_sfc_main$19, {
                        icon: "dark" === unref(l) ? "light" : "dark",
                        onClick: r[0] || (r[0] = function(e) {
                            return unref(u)()
                        }
                        )
                    }, {
                        default: withCtx((function() {
                            return [createTextVNode(toDisplayString("dark" === unref(l) ? unref(i)("light") : unref(i)("dark")), 1)]
                        }
                        )),
                        _: 1
                    }, 8, ["icon"])), [[unref(h), function() {
                        return {
                            e: "toolbar:dark",
                            ctx: unref(l)
                        }
                    }
                    , "c"]])]
                }
                )),
                _: 1
            }, 8, ["content", "show"]), null !== (d = unref(t)) && void 0 !== d && d.hideSettings ? createCommentVNode("", !0) : (openBlock(),
            createBlock(Tooltip, {
                key: 3,
                content: unref(i)("settings_guide"),
                show: unref(o).isGuideOpen,
                position: "right",
                class: "mt-8px"
            }, {
                default: withCtx((function() {
                    return [withDirectives((openBlock(),
                    createBlock(_sfc_main$19, {
                        icon: "setting",
                        active: unref(o).isSettingsOpen,
                        onClick: w
                    }, {
                        default: withCtx((function() {
                            return [createTextVNode(toDisplayString(unref(i)("settings")), 1)]
                        }
                        )),
                        _: 1
                    }, 8, ["active"])), [[unref(h), {
                        e: "toolbar:setting"
                    }, "c"]])]
                }
                )),
                _: 1
            }, 8, ["content", "show"])), null !== (f = unref(n)) && void 0 !== f && null !== (p = f.app) && void 0 !== p && null !== (E = p.visible) && void 0 !== E && E.data ? (openBlock(),
            createBlock(Tooltip, {
                key: 4,
                content: unref(i)("app_guide"),
                show: unref(o).isGuideOpen,
                position: "right",
                class: "mt-8px"
            }, {
                default: withCtx((function() {
                    return [createBaseVNode("div", _hoisted_4$t, [withDirectives((openBlock(),
                    createBlock(_sfc_main$19, {
                        id: "r-app",
                        icon: "phone",
                        onMouseenter: y,
                        onMouseleave: b
                    }, {
                        default: withCtx((function() {
                            return [createTextVNode(toDisplayString(unref(i)("mobile")), 1)]
                        }
                        )),
                        _: 1
                    })), [[unref(h), {
                        e: "toolbar:app"
                    }, "e"]]), createVNode(_sfc_main$16, {
                        "show-close": !1,
                        class: "app-guide absolute right-full mr-12px -bottom-92px"
                    })])]
                }
                )),
                _: 1
            }, 8, ["content", "show"])) : createCommentVNode("", !0), unref(m) ? (openBlock(),
            createBlock(Tooltip, {
                key: 5,
                content: unref(i)("to_top_guide"),
                show: unref(o).isGuideOpen,
                position: "right",
                class: "mt-8px"
            }, {
                default: withCtx((function() {
                    return [withDirectives(createVNode(_sfc_main$19, {
                        icon: "top",
                        onClick: g
                    }, null, 512), [[unref(h), {
                        e: "toolbar:to-top"
                    }, "c"]])]
                }
                )),
                _: 1
            }, 8, ["content", "show"])) : createCommentVNode("", !0), renderSlot(e.$slots, "default", {}, void 0, !0)], 2)), [[unref(h), {
                e: "toolbar"
            }, "e"]])
        }
    }
})
  , Menu = _export_sfc(_sfc_main$15, [["__scopeId", "data-v-47ffe1ec"]])
  , _hoisted_1$T = {
    key: 0,
    class: "bg-sheet-b-bw-white shadow-sd16"
}
  , _sfc_main$14 = defineComponent({
    __name: "Sheet",
    props: {
        open: {
            type: Boolean,
            default: !1
        },
        detach: {
            type: Boolean,
            default: !0
        }
    },
    emits: ["update:open"],
    setup: function(e) {
        return function(t, n) {
            return openBlock(),
            createBlock(Transition, {
                name: "slide-vertical",
                appear: ""
            }, {
                default: withCtx((function() {
                    return [e.open || !e.detach ? withDirectives((openBlock(),
                    createElementBlock("section", _hoisted_1$T, [createVNode(CloseButton, {
                        class: "absolute right-10px top-10px",
                        onClick: n[0] || (n[0] = function(e) {
                            return t.$emit("update:open", !1)
                        }
                        )
                    }), renderSlot(t.$slots, "default")], 512)), [[vShow, e.open]]) : createCommentVNode("", !0)]
                }
                )),
                _: 3
            })
        }
    }
})
  , _hoisted_1$S = {
    class: "flex items-center"
}
  , _hoisted_2$I = {
    class: "text-s4 font-medium text-s-gray-500 sm:pr-12px mr-16px flex-shrink-0"
}
  , _hoisted_3$y = ["onClick"]
  , _hoisted_4$s = {
    key: 0,
    class: "icon-check text-primary-red-500"
}
  , _hoisted_5$n = {
    key: 1,
    class: "icon-moon text-white-24"
}
  , _sfc_main$13 = defineComponent({
    __name: "Themes",
    setup: function(e) {
        var t = inject(I18N_IO_FUNC_KEY)
          , n = inject(READER_STATE_KEY, defaultReaderState)
          , o = toRef(n.settings, "theme")
          , r = useSharedTrack().directive
          , i = [{
            name: "default",
            color: "#E0E0E0"
        }, {
            name: "beige",
            color: "#F5F1E8"
        }, {
            name: "yellow",
            color: "#F4ECD1"
        }, {
            name: "green",
            color: "#DAF2DA"
        }, {
            name: "blue",
            color: "#DCEAEE"
        }, {
            name: "dark",
            color: "#191919"
        }];
        return function(e, n) {
            return openBlock(),
            createElementBlock("div", _hoisted_1$S, [createBaseVNode("span", _hoisted_2$I, toDisplayString(unref(t)("read_theme")), 1), createBaseVNode("div", {
                class: "whitespace-nowrap overflow-x-auto hidden-scrollbar flex",
                onTouchmove: n[0] || (n[0] = withModifiers((function() {}
                ), ["stop"]))
            }, [(openBlock(),
            createElementBlock(Fragment, null, renderList(i, (function(e) {
                var t = e.name
                  , n = e.color;
                return withDirectives(createBaseVNode("button", {
                    key: t,
                    class: normalizeClass(["noise-bg w-36px h-36px border border-outline-black-8 rounded-1 ml-13px bg-bg-gray-100 first-of-type:ml-0 items-center justify-center text-24px inline-flex hover:border-primary-red-500 active-a60 p-0 flex-shrink-0", [unref(o) === t && "border-primary-red-500"]]),
                    style: normalizeStyle({
                        backgroundColor: n
                    }),
                    onClick: function(e) {
                        return o.value = t
                    }
                }, [unref(o) === t ? (openBlock(),
                createElementBlock("span", _hoisted_4$s)) : "dark" === t ? (openBlock(),
                createElementBlock("span", _hoisted_5$n)) : createCommentVNode("", !0)], 14, _hoisted_3$y), [[unref(r), {
                    e: "toolbar:theme",
                    ctx: t
                }, "c"]])
            }
            )), 64))], 32)])
        }
    }
})
  , _hoisted_1$R = {
    key: 0,
    class: "flex items-center"
}
  , _hoisted_2$H = {
    class: "text-s4 font-medium text-s-gray-500 sm:pr-12px mr-16px"
}
  , _hoisted_3$x = {
    class: "flex flex-grow"
}
  , _hoisted_4$r = ["onClick"]
  , _sfc_main$12 = defineComponent({
    __name: "Fonts",
    setup: function(e) {
        var t = inject(CHAPTERS_STATE_KEY)
          , n = inject(READER_STATE_KEY, defaultReaderState)
          , o = inject(I18N_IO_FUNC_KEY)
          , r = useSharedTrack().directive
          , i = computed((function() {
            return null == t ? void 0 : t.value.every((function(e) {
                return !e.font
            }
            ))
        }
        ))
          , a = [{
            name: "black",
            title: "黑体"
        }, {
            name: "song",
            title: "宋体"
        }, {
            name: "kai",
            title: "楷体"
        }];
        return function(e, t) {
            return unref(i) ? (openBlock(),
            createElementBlock("div", _hoisted_1$R, [createBaseVNode("span", _hoisted_2$H, toDisplayString(unref(o)("content_font")), 1), createBaseVNode("div", _hoisted_3$x, [(openBlock(),
            createElementBlock(Fragment, null, renderList(a, (function(e) {
                var t = e.name
                  , o = e.title;
                return withDirectives(createBaseVNode("button", {
                    key: t,
                    class: normalizeClass([["r-font-".concat(t), unref(n).settings.font === t && "!text-primary-red-500 border-current !bg-primary-red-50 font-medium"], "ml-8px first-of-type:ml-0 rounded-8px border border-outline-black-8 text-bo4 text-s-gray-900 flex-1 py-7px active-a60 sm:bg-s-gray-50 hover:text-primary-red-500 hover:bg-primary-red-50"]),
                    onClick: function(e) {
                        return unref(n).settings.font = t
                    }
                }, [createTextVNode(toDisplayString(o), 1)], 10, _hoisted_4$r), [[unref(r), {
                    e: "toolbar:font",
                    ctx: t
                }, "c"]])
            }
            )), 64))])])) : createCommentVNode("", !0)
        }
    }
})
  , _hoisted_1$Q = {
    class: "flex items-center"
}
  , _hoisted_2$G = {
    class: "text-s4 font-medium text-s-gray-500 sm:pr-12px mr-16px"
}
  , _hoisted_3$w = {
    class: "flex flex-grow sm:bg-s-gray-50 rounded-8px border border-outline-black-8 overflow-hidden"
}
  , _hoisted_4$q = ["disabled"]
  , _hoisted_5$m = createBaseVNode("span", {
    class: "icon-font-minus"
}, null, -1)
  , _hoisted_6$l = [_hoisted_5$m]
  , _hoisted_7$j = {
    class: "font-yuewen text-bo1 flex-1 flex items-center justify-center text-s-gray-500 relative after:content-DEFAULT after:absolute after:right-0 after:h-24px after:w-1px after:bg-outline-black-8 after:top-6px before:content-DEFAULT before:absolute before:left-0 before:h-24px before:w-1px before:bg-outline-black-8 before:top-6px"
}
  , _hoisted_8$j = ["disabled"]
  , _hoisted_9$j = createBaseVNode("span", {
    class: "icon-font-plus"
}, null, -1)
  , _hoisted_10$f = [_hoisted_9$j]
  , _sfc_main$11 = defineComponent({
    __name: "FontSize",
    setup: function(e) {
        var t = inject(READER_STATE_KEY, defaultReaderState)
          , n = inject(I18N_IO_FUNC_KEY)
          , o = toRefs(t.settings).fontSize
          , r = useSharedTrack().directive;
        return function(e, t) {
            return openBlock(),
            createElementBlock("div", _hoisted_1$Q, [createBaseVNode("span", _hoisted_2$G, toDisplayString(unref(n)("font_size")), 1), createBaseVNode("div", _hoisted_3$w, [withDirectives((openBlock(),
            createElementBlock("button", {
                class: "flex-1 flex items-center justify-center py-6px text-24px text-s-gray-900 disabled:text-gray-300 sm:hover-4 active-8 sm:hover:text-primary-red-500 active-a60 p-0",
                disabled: unref(o) <= 12,
                onClick: t[0] || (t[0] = function(e) {
                    return o.value -= 2
                }
                )
            }, _hoisted_6$l, 8, _hoisted_4$q)), [[unref(r), {
                e: "toolbar:font:smaller",
                ctx: unref(o) - 2
            }, "c"]]), createBaseVNode("span", _hoisted_7$j, toDisplayString(unref(o)), 1), withDirectives((openBlock(),
            createElementBlock("button", {
                class: "flex-1 flex items-center justify-center py-6px text-24px text-s-gray-900 disabled:text-gray-300 sm:hover-4 active-8 sm:hover:text-primary-red-500 active-a60 p-0",
                disabled: unref(o) >= 48,
                onClick: t[1] || (t[1] = function(e) {
                    return o.value += 2
                }
                )
            }, _hoisted_10$f, 8, _hoisted_8$j)), [[unref(r), {
                e: "toolbar:font:bigger",
                ctx: unref(o) + 2
            }, "c"]])])])
        }
    }
})
  , _hoisted_1$P = ["id", "checked"]
  , _sfc_main$10 = defineComponent({
    __name: "Switch",
    props: {
        modelValue: {
            type: Boolean,
            default: !1
        },
        id: {
            default: void 0
        }
    },
    emits: ["update:modelValue", "change"],
    setup: function(e, t) {
        var n = t.emit
          , o = e;
        function r() {
            var e = !o.modelValue;
            n("update:modelValue", e),
            n("change", e)
        }
        return function(t, n) {
            return openBlock(),
            createElementBlock("label", {
                class: normalizeClass(["switch relative inline-block rounded-16px w-39px h-24px sm:w-52px sm:h-32px sm:after:w-24px sm:after:h-24px sm:after:top-4px sm:after:left-4px transition-colors after:content-DEFAULT after:rounded-1 after:top-3px after:left-3px after:absolute after:block after:transition-transform after:transform after:w-18px after:h-18px after:bg-on-image-bw-white", [e.modelValue ? "bg-primary-red-500 after:translate-x-15px sm:after:translate-x-20px" : "bg-s-gray-300"]])
            }, [createBaseVNode("input", {
                id: e.id,
                type: "checkbox",
                class: "absolute inset-0 opacity-0 z-1 cursor-pointer",
                checked: e.modelValue,
                onChange: r
            }, null, 40, _hoisted_1$P)], 2)
        }
    }
})
  , Switch = _export_sfc(_sfc_main$10, [["__scopeId", "data-v-cca33bfc"]]);
function useAutoSubs() {
    var e = inject(READER_STATE_KEY, defaultReaderState)
      , t = inject(I18N_IO_FUNC_KEY)
      , n = inject(ADAPTERS_KEY)
      , o = !1
      , r = !1;
    return {
        set: function(i) {
            var a;
            o || (r = e.settings.autoSubs,
            e.settings.autoSubs = i,
            o = !0,
            null === (a = n.processAutoSubs) || void 0 === a || a.call(n, i).then((function() {
                r = i,
                o = !1,
                useToast({
                    title: t(i ? "auto_subs_enable_succeed" : "auto_subs_disable_succeed")
                })
            }
            )).catch((function() {
                o = !1,
                e.settings.autoSubs = r,
                useToast({
                    title: t("auto_subs_switch_failed")
                })
            }
            )))
        }
    }
}
var _hoisted_1$O = {
    class: "text-rh4 font-medium text-s-gray-900"
}
  , _hoisted_2$F = {
    class: "w-359px"
}
  , _hoisted_3$v = {
    key: 0,
    class: "flex items-center mt-22px"
}
  , _hoisted_4$p = {
    class: "text-s4 font-medium text-s-gray-500 sm:pr-12px mr-16px"
}
  , _hoisted_5$l = {
    class: "flex flex-grow"
}
  , _hoisted_6$k = ["onClick"]
  , _hoisted_7$i = {
    key: 1,
    class: "flex items-center mt-22px"
}
  , _hoisted_8$i = {
    class: "text-s4 font-medium text-s-gray-500 sm:pr-12px mr-16px"
}
  , _hoisted_9$i = {
    class: "flex flex-grow"
}
  , _hoisted_10$e = ["onClick"]
  , _hoisted_11$d = {
    key: 2,
    class: "flex items-center mt-22px text-s-gray-500 text-s4"
}
  , _hoisted_12$a = {
    class: "font-medium sm:pr-12px mr-16px w-60px flex-shrink-0"
}
  , _hoisted_13$9 = {
    key: 3,
    class: "flex items-center mt-22px text-s-gray-500 text-s4"
}
  , _hoisted_14$6 = {
    class: "font-medium sm:pr-12px mr-16px w-60px"
}
  , _sfc_main$$ = defineComponent({
    __name: "Settings",
    setup: function(e) {
        var t = inject(USER_STATE_KEY)
          , n = inject(READER_STATE_KEY, defaultReaderState)
          , o = inject(I18N_IO_FUNC_KEY)
          , r = inject(CONFIG_STATE_KEY)
          , i = inject(ADAPTERS_KEY)
          , a = inject(FRONT_CONFIG_STATE_KEY)
          , s = toRefs(n.settings)
          , l = s.pageMode
          , c = s.pageWidth
          , u = s.disableReview
          , d = s.autoSubs
          , f = [{
            name: "single",
            title: o("chapter_pages")
        }, {
            name: "scrolled",
            title: o("scroll_pages")
        }]
          , p = [{
            name: "auto",
            title: o("auto")
        }, {
            name: "640",
            title: "640"
        }, {
            name: "800",
            title: "800"
        }, {
            name: "900",
            title: "900"
        }, {
            name: "1000",
            title: "1000"
        }, {
            name: "1280",
            title: "1280"
        }]
          , h = useAutoSubs().set
          , m = useSharedTrack().directive;
        function _(e) {
            var n, o;
            null != t && null !== (n = t.value) && void 0 !== n && n.id ? h(e) : null === (o = i.processLogin) || void 0 === o || o.call(i)
        }
        function v() {
            n.settings.disableReview = !n.settings.disableReview
        }
        return function(e, t) {
            return openBlock(),
            createBlock(_sfc_main$14, {
                open: unref(n).isSettingsOpen,
                "onUpdate:open": t[0] || (t[0] = function(e) {
                    return unref(n).isSettingsOpen = e
                }
                ),
                class: "w-480px pl-32px pt-42px pb-44px absolute right-full bottom-64px"
            }, {
                default: withCtx((function() {
                    var e, t, s, h, g, x, y;
                    return [createBaseVNode("div", _hoisted_1$O, toDisplayString(unref(o)("settings")), 1), createBaseVNode("div", _hoisted_2$F, [createVNode(_sfc_main$13, {
                        class: "mt-32px"
                    }), createVNode(_sfc_main$12, {
                        class: "mt-20px"
                    }), createVNode(_sfc_main$11, {
                        class: "mt-20px"
                    }), null !== (e = unref(r)) && void 0 !== e && null !== (t = e.settings) && void 0 !== t && t.pageWidth.data ? (openBlock(),
                    createElementBlock("div", _hoisted_3$v, [createBaseVNode("span", _hoisted_4$p, toDisplayString(unref(o)("page_width")), 1), createBaseVNode("div", _hoisted_5$l, [(openBlock(),
                    createElementBlock(Fragment, null, renderList(p, (function(e) {
                        var t = e.name
                          , n = e.title;
                        return withDirectives(createBaseVNode("button", {
                            key: t,
                            class: normalizeClass([[unref(c) === t && "!text-primary-red-500 border-current !bg-primary-red-50 font-medium"], "ml-8px first-of-type:ml-0 rounded-8px border border-outline-black-8 text-bo4 text-s-gray-900 flex-1 py-7px active-a60 sm:bg-s-gray-50 hover:text-primary-red-500 hover:bg-primary-red-50"]),
                            onClick: function(e) {
                                return c.value = t
                            }
                        }, [createTextVNode(toDisplayString(n), 1)], 10, _hoisted_6$k), [[unref(m), {
                            e: "toolbar:width",
                            ctx: t
                        }, "c"]])
                    }
                    )), 64))])])) : createCommentVNode("", !0), null !== (s = unref(r)) && void 0 !== s && null !== (h = s.settings) && void 0 !== h && h.pageMode.data ? (openBlock(),
                    createElementBlock("div", _hoisted_7$i, [createBaseVNode("span", _hoisted_8$i, toDisplayString(unref(o)("page_mode")), 1), createBaseVNode("div", _hoisted_9$i, [(openBlock(),
                    createElementBlock(Fragment, null, renderList(f, (function(e) {
                        var t = e.name
                          , n = e.title;
                        return withDirectives(createBaseVNode("button", {
                            key: t,
                            class: normalizeClass([[unref(l) === t && "!text-primary-red-500 border-current !bg-primary-red-50 font-medium"], "ml-8px first-of-type:ml-0 rounded-8px border border-outline-black-8 text-bo4 text-s-gray-900 flex-1 py-7px active-a60 sm:bg-s-gray-50 hover:text-primary-red-500 hover:bg-primary-red-50"]),
                            onClick: function(e) {
                                return l.value = t
                            }
                        }, [createTextVNode(toDisplayString(n), 1)], 10, _hoisted_10$e), [[unref(m), {
                            e: "toolbar:page-mode",
                            ctx: t
                        }, "c"]])
                    }
                    )), 64))])])) : createCommentVNode("", !0), unref(i).processAutoSubs && !unref(n).isDisableAction ? (openBlock(),
                    createElementBlock("div", _hoisted_11$d, [createBaseVNode("span", _hoisted_12$a, toDisplayString(unref(o)("auto_subs")), 1), withDirectives(createVNode(Switch, {
                        "model-value": unref(d),
                        class: "mr-12px flex-shrink-0",
                        onChange: _
                    }, null, 8, ["model-value"]), [[unref(m), function() {
                        return {
                            e: "toolbar:auto-subs",
                            ctx: unref(d)
                        }
                    }
                    , "c"]]), createTextVNode(toDisplayString(unref(d) ? unref(o)("auto_subs_enable_desc") : unref(o)("auto_subs_disable_desc")), 1)])) : createCommentVNode("", !0), (unref(i).processReviewCount || null !== (g = unref(a)) && void 0 !== g && g.enableReviewSetting) && null !== (x = unref(r)) && void 0 !== x && null !== (y = x.settings) && void 0 !== y && y.reviews.data ? (openBlock(),
                    createElementBlock("div", _hoisted_13$9, [createBaseVNode("span", _hoisted_14$6, toDisplayString(unref(o)("chapter_review")), 1), withDirectives(createVNode(Switch, {
                        "model-value": !unref(u),
                        class: "mr-12px",
                        onChange: v
                    }, null, 8, ["model-value"]), [[unref(m), function() {
                        return {
                            e: "toolbar:review",
                            ctx: unref(u)
                        }
                    }
                    , "c"]]), createTextVNode(toDisplayString(unref(u) ? unref(o)("chapter_review_disable_desc") : unref(o)("chapter_review_enable_desc")), 1)])) : createCommentVNode("", !0)])]
                }
                )),
                _: 1
            }, 8, ["open"])
        }
    }
})
  , _hoisted_1$N = ["onClickCapture"]
  , _sfc_main$_ = defineComponent({
    __name: "FloatLayer",
    setup: function(e) {
        var t = inject(READER_STATE_KEY, defaultReaderState)
          , n = toRefs(t)
          , o = n.isSettingsOpen
          , r = n.isChapterListOpen
          , i = n.isPanelOpen
          , a = ref()
          , s = ref(!1)
          , l = [o, r];
        function c() {
            var e, t = _createForOfIteratorHelper(l);
            try {
                for (t.s(); !(e = t.n()).done; ) {
                    var n = e.value;
                    if (n.value) {
                        n.value = !1;
                        break
                    }
                }
            } catch (o) {
                t.e(o)
            } finally {
                t.f()
            }
        }
        function u() {
            var e;
            null !== (e = a.value) && void 0 !== e && e.$el && (s.value = a.value.$el.offsetHeight >= document.documentElement.clientHeight)
        }
        return watch(l, (function(e) {
            i.value = e.includes(!0)
        }
        )),
        onMounted((function() {
            u(),
            window.addEventListener("resize", u, !!support() && {
                passive: !0
            })
        }
        )),
        onUnmounted((function() {
            return window.removeEventListener("resize", u)
        }
        )),
        function(e, t) {
            return openBlock(),
            createElementBlock(Fragment, null, [unref(i) ? (openBlock(),
            createElementBlock("div", {
                key: 0,
                class: "fixed inset-0 z-3",
                onClickCapture: withModifiers(c, ["self"])
            }, null, 40, _hoisted_1$N)) : createCommentVNode("", !0), renderSlot(e.$slots, "default"), createVNode(Menu, {
                id: "r-menu",
                ref_key: "$menu",
                ref: a,
                class: normalizeClass(["absolute left-full pt-12px", [s.value && "top-0"]])
            }, {
                default: withCtx((function() {
                    return [createVNode(unref(ClientOnly), null, {
                        default: withCtx((function() {
                            return [createVNode(_sfc_main$$)]
                        }
                        )),
                        _: 1
                    })]
                }
                )),
                _: 1
            }, 8, ["class"])], 64)
        }
    }
})
  , _hoisted_1$M = createBaseVNode("img", {
    class: "h-144px mt-24px",
    src: "//imgservices-1252317822.image.myqcloud.com/coco/s05292023/5bd15441.2fgfj5.png"
}, null, -1)
  , _hoisted_2$E = {
    key: 0,
    class: "h-167px mt-24px",
    src: "//bossaudioandcomic-1252317822.file.myqcloud.com/yux-reader/03b5f703cce640b8a7267b6e38df5376.png"
}
  , _hoisted_3$u = {
    key: 1,
    class: "h-202px mt-24px",
    src: "//imgservices-1252317822.image.myqcloud.com/coco/s06202023/0d24af72.wmlpfr.png"
}
  , _sfc_main$Z = defineComponent({
    __name: "GuideDialog",
    setup: function(e) {
        var t = inject(ADAPTERS_KEY)
          , n = inject(READER_STATE_KEY, defaultReaderState)
          , o = inject(I18N_IO_FUNC_KEY)
          , r = useSharedTrack().directive;
        return function(e, i) {
            return withDirectives((openBlock(),
            createBlock(_sfc_main$1l, {
                modelValue: unref(n).isGuideOpen,
                "onUpdate:modelValue": i[0] || (i[0] = function(e) {
                    return unref(n).isGuideOpen = e
                }
                ),
                title: unref(o)("guide"),
                "show-actions": !1,
                classes: "!pb-46px bg-sheet-b-gray-50"
            }, {
                default: withCtx((function() {
                    return [_hoisted_1$M, unref(t).processBookmarkList ? (openBlock(),
                    createElementBlock("img", _hoisted_2$E)) : createCommentVNode("", !0), unref(t).processReviewCount ? (openBlock(),
                    createElementBlock("img", _hoisted_3$u)) : createCommentVNode("", !0)]
                }
                )),
                _: 1
            }, 8, ["modelValue", "title"])), [[unref(r), {
                e: "guide"
            }, "e"]])
        }
    }
})
  , _hoisted_1$L = {
    key: 0,
    class: "absolute right-0 bg-sheet-b-bw-white rounded-8px shadow-sd16 text-s-gray-900 min-w-124px py-8px px-4px"
}
  , _sfc_main$Y = defineComponent({
    __name: "Dropdown",
    props: {
        list: null
    },
    emits: ["trigger"],
    setup: function(e) {
        var t = ref(!1);
        return function(n, o) {
            return openBlock(),
            createElementBlock("div", {
                class: "relative",
                onMouseenter: o[0] || (o[0] = function(e) {
                    return t.value = !0
                }
                ),
                onMouseleave: o[1] || (o[1] = function(e) {
                    return t.value = !1
                }
                )
            }, [renderSlot(n.$slots, "default", {}, void 0, !0), createVNode(Transition, {
                name: "drop"
            }, {
                default: withCtx((function() {
                    return [t.value ? (openBlock(),
                    createElementBlock("div", _hoisted_1$L, [(openBlock(!0),
                    createElementBlock(Fragment, null, renderList(e.list, (function(e, t) {
                        return openBlock(),
                        createBlock(resolveDynamicComponent(e.tag || "a"), {
                            key: e.title,
                            href: e.url,
                            target: "a" === e.tag && "_blank",
                            class: "block w-full px-20px py-10px text-left hover-4 active-8 rounded-8px text-bo2 truncate max-w-168px whitespace-nowrap",
                            onClick: function(e) {
                                return n.$emit("trigger", {
                                    index: t,
                                    event: e
                                })
                            }
                        }, {
                            default: withCtx((function() {
                                return [createTextVNode(toDisplayString(e.title), 1)]
                            }
                            )),
                            _: 2
                        }, 1032, ["href", "target", "onClick"])
                    }
                    )), 128))])) : createCommentVNode("", !0)]
                }
                )),
                _: 1
            })], 32)
        }
    }
})
  , Dropdown = _export_sfc(_sfc_main$Y, [["__scopeId", "data-v-9e227849"]])
  , _withScopeId$9 = function(e) {
    return pushScopeId("data-v-1d2ae851"),
    e = e(),
    popScopeId(),
    e
}
  , _hoisted_1$K = {
    class: "flex pl-32px justify-between text-s-gray-700 items-center h-64px bg-b-gray-50 border-b border-outline-black-8 noise-bg"
}
  , _hoisted_2$D = ["href"]
  , _hoisted_3$t = ["src"]
  , _hoisted_4$o = _withScopeId$9((function() {
    return createBaseVNode("span", {
        class: "icon-triangle-down transform text-10px transition-transform group-hover:-rotate-180 duration-300 text-s-gray-500"
    }, null, -1)
}
))
  , _hoisted_5$k = ["href"]
  , _hoisted_6$j = ["src"]
  , _hoisted_7$h = {
    key: 2,
    class: "ml-auto text-s-gray-900 text-bo2 relative group"
}
  , _hoisted_8$h = ["href"]
  , _hoisted_9$h = _withScopeId$9((function() {
    return createBaseVNode("span", {
        class: "icon-arrow-up-bold transform rotate-180 transition-transform group-hover:rotate-0 text-12px ml-4px"
    }, null, -1)
}
))
  , _sfc_main$X = defineComponent({
    __name: "NavBar",
    props: {
        user: null,
        siteList: null,
        logo: null,
        userUrl: null,
        indexUrl: null,
        dropList: null,
        loginText: null,
        disableLogin: {
            type: Boolean
        }
    },
    emits: ["select", "select:site", "login"],
    setup: function(e) {
        return function(t, n) {
            var o, r;
            return openBlock(),
            createElementBlock("div", _hoisted_1$K, [null !== (o = e.siteList) && void 0 !== o && o.length ? (openBlock(),
            createBlock(Dropdown, {
                key: 0,
                id: "r-logo",
                list: e.siteList,
                onTrigger: n[0] || (n[0] = function(e) {
                    return t.$emit("select:site", e)
                }
                )
            }, {
                default: withCtx((function() {
                    return [e.logo ? (openBlock(),
                    createElementBlock("a", {
                        key: 0,
                        class: "block flex items-center group pr-16px",
                        href: e.indexUrl
                    }, [createBaseVNode("div", {
                        class: "logo bg-s-gray-700 mr-8px hover:bg-s-gray-900",
                        style: normalizeStyle({
                            "-webkit-mask-image": "url(".concat(e.logo, ")")
                        })
                    }, [createBaseVNode("img", {
                        class: "h-44px opacity-0",
                        src: e.logo
                    }, null, 8, _hoisted_3$t)], 4), _hoisted_4$o], 8, _hoisted_2$D)) : createCommentVNode("", !0)]
                }
                )),
                _: 1
            }, 8, ["list"])) : e.logo ? (openBlock(),
            createElementBlock("a", {
                key: 1,
                id: "r-logo",
                class: "logo block bg-s-gray-700 hover:bg-s-gray-900",
                href: e.indexUrl,
                style: normalizeStyle({
                    "-webkit-mask-image": "url(".concat(e.logo, ")")
                })
            }, [createBaseVNode("img", {
                class: "h-44px opacity-0",
                src: e.logo
            }, null, 8, _hoisted_6$j)], 12, _hoisted_5$k)) : createCommentVNode("", !0), renderSlot(t.$slots, "default", {}, void 0, !0), e.disableLogin ? createCommentVNode("", !0) : (openBlock(),
            createElementBlock("div", _hoisted_7$h, [null !== (r = e.user) && void 0 !== r && r.id ? (openBlock(),
            createBlock(Dropdown, {
                key: 0,
                id: "r-nav",
                list: e.dropList,
                onTrigger: n[1] || (n[1] = function(e) {
                    return t.$emit("select", e)
                }
                )
            }, {
                default: withCtx((function() {
                    var t;
                    return [createBaseVNode("a", {
                        class: "block flex items-center hover:text-primary-red-500 py-10px px-32px",
                        href: e.userUrl
                    }, [createTextVNode(toDisplayString(null === (t = e.user) || void 0 === t ? void 0 : t.username), 1), _hoisted_9$h], 8, _hoisted_8$h)]
                }
                )),
                _: 1
            }, 8, ["list"])) : (openBlock(),
            createElementBlock("button", {
                key: 1,
                class: "hover:text-primary-red-500 text-bo2 py-8px px-32px",
                onClick: n[2] || (n[2] = function(e) {
                    return t.$emit("login", e)
                }
                )
            }, toDisplayString(e.loginText), 1))]))])
        }
    }
})
  , NavBar = _export_sfc(_sfc_main$X, [["__scopeId", "data-v-1d2ae851"]])
  , _sfc_main$W = defineComponent({
    __name: "HOCNavBar",
    setup: function(e) {
        var t = inject(USER_STATE_KEY)
          , n = inject(FRONT_CONFIG_STATE_KEY)
          , o = inject(CONFIG_STATE_KEY)
          , r = inject(I18N_IO_FUNC_KEY)
          , i = inject(ADAPTERS_KEY)
          , a = inject(BUS_STATE_KEY)
          , s = computed((function() {
            var e, t, i, a, s, l = [{
                title: r("writer"),
                url: "https://write.qq.com/"
            }, {
                title: r("recharge"),
                url: (null === (e = n.value) || void 0 === e || null === (t = (i = e.hrefMap).recharge) || void 0 === t ? void 0 : t.call(i)) || (null == n ? void 0 : n.value.rechargeUrl)
            }, {
                title: r("logout")
            }];
            return null !== (a = o.value) && void 0 !== a && null !== (s = a.nav) && void 0 !== s && s.dropdown ? [].concat(_toConsumableArray(o.value.nav.dropdown.data), l) : l
        }
        ));
        function l(e) {
            var t = s.value.length
              , n = e.index
              , o = e.event;
            if (n === t - 1) {
                var r;
                null === (r = i.processLogout) || void 0 === r || r.call(i);
                var l = "navbar:logout:click";
                a.emit(l, {
                    e: l,
                    event: o
                })
            } else if (n === t - 2) {
                var c = "navbar:recharge:click";
                a.emit(c, {
                    e: c,
                    event: o
                })
            } else if (n === t - 3) {
                var u = "navbar:writer:click";
                a.emit(u, {
                    e: u,
                    event: o
                })
            } else {
                var d = "navbar:drop-item:click";
                a.emit(d, {
                    e: d,
                    event: o,
                    ctx: n
                })
            }
        }
        function c(e) {
            var t = e.index
              , n = e.event
              , o = "navbar:site:click";
            a.emit(o, {
                e: o,
                event: n,
                ctx: t
            })
        }
        function u(e) {
            var t;
            null === (t = i.processLogin) || void 0 === t || t.call(i);
            var n = "navbar:login:click";
            a.emit(n, {
                e: n,
                event: e
            })
        }
        return function(e, a) {
            var d, f, p, h;
            return openBlock(),
            createBlock(NavBar, {
                user: unref(t),
                "drop-list": unref(s),
                logo: null === (d = unref(o).logo) || void 0 === d ? void 0 : d.imgUrl.data,
                "login-text": unref(r)("login"),
                "site-list": null === (f = unref(o).logo) || void 0 === f ? void 0 : f.dropdown.data,
                "index-url": unref(n).hrefMap.index(),
                "user-url": null === (p = (h = unref(n).hrefMap).user) || void 0 === p ? void 0 : p.call(h),
                "disable-login": !unref(i).processLogin,
                onSelect: l,
                "onSelect:site": c,
                onLogin: u
            }, null, 8, ["user", "drop-list", "logo", "login-text", "site-list", "index-url", "user-url", "disable-login"])
        }
    }
})
  , _sfc_main$V = defineComponent({
    __name: "NavBarWrapper",
    setup: function(e) {
        var t = useSharedScroll().top
          , n = ref(!1);
        return watch(t, (function(e, t) {
            e < 64 ? n.value = !1 : e - t > 0 && e > 64 ? n.value = !0 : t - e >= 80 && (n.value = !1)
        }
        )),
        function(e, t) {
            return openBlock(),
            createElementBlock("nav", {
                id: "navbar",
                class: normalizeClass(["sticky top-0 z-2 transition duration-350 transform", [n.value && "-translate-y-full"]])
            }, [renderSlot(e.$slots, "default")], 2)
        }
    }
})
  , _hoisted_1$J = {
    class: "flex justify-center items-center text-s-gray-400"
}
  , _hoisted_2$C = createBaseVNode("div", {
    class: "icon-loading animate-spin text-20px"
}, null, -1)
  , _hoisted_3$s = {
    class: "text-bo2 ml-4px"
}
  , _sfc_main$U = defineComponent({
    __name: "ScrollLoading",
    props: {
        failed: {
            type: Boolean
        }
    },
    emits: ["retry"],
    setup: function(e) {
        var t = inject(I18N_IO_FUNC_KEY);
        return function(n, o) {
            return openBlock(),
            createElementBlock("div", _hoisted_1$J, [e.failed ? (openBlock(),
            createElementBlock("button", {
                key: 0,
                class: "text-bo2",
                onClick: o[0] || (o[0] = function(e) {
                    return n.$emit("retry")
                }
                )
            }, toDisplayString(unref(t)("retry_load_next")), 1)) : (openBlock(),
            createElementBlock(Fragment, {
                key: 1
            }, [_hoisted_2$C, createBaseVNode("span", _hoisted_3$s, toDisplayString(unref(t)("loading")), 1)], 64))])
        }
    }
})
  , _hoisted_1$I = {
    id: "side-sheet",
    class: "h-full"
}
  , _hoisted_2$B = {
    key: 0,
    class: "h-full w-400px relative"
}
  , _hoisted_3$r = {
    class: "bg-b-gray-50 noise-bg border-l border-outline-black-8 h-full w-400px absolute right-0"
}
  , _sfc_main$T = defineComponent({
    __name: "SideSheet",
    setup: function(e) {
        var t = inject(READER_STATE_KEY, defaultReaderState);
        return function(e, n) {
            return openBlock(),
            createElementBlock("section", _hoisted_1$I, [createVNode(Transition, {
                name: "reader-slide"
            }, {
                default: withCtx((function() {
                    return [unref(t).isSideSheetOpen ? (openBlock(),
                    createElementBlock("div", _hoisted_2$B, [createBaseVNode("div", _hoisted_3$r, [createVNode(CloseButton, {
                        class: "absolute right-10px top-10px",
                        onClick: n[0] || (n[0] = function(e) {
                            return unref(t).isSideSheetOpen = !1
                        }
                        )
                    }), renderSlot(e.$slots, "default", {}, void 0, !0)])])) : createCommentVNode("", !0)]
                }
                )),
                _: 3
            })])
        }
    }
})
  , DesktopSideSheet = _export_sfc(_sfc_main$T, [["__scopeId", "data-v-63a3e543"]])
  , _hoisted_1$H = {
    class: "mx-64px pb-64px mt-auto"
}
  , _hoisted_2$A = {
    class: "nav-btn-group"
}
  , _hoisted_3$q = ["href"]
  , _hoisted_4$n = ["href"]
  , _sfc_main$S = defineComponent({
    __name: "Navigator",
    props: {
        chapter: null
    },
    setup: function(e) {
        var t = inject(FRONT_CONFIG_STATE_KEY)
          , n = inject(CONFIG_STATE_KEY)
          , o = inject(READER_STATE_KEY, defaultReaderState)
          , r = inject(I18N_IO_FUNC_KEY)
          , i = useSharedTrack().directive;
        return function(a, s) {
            var l, c, u, d, f, p, h, m, _, v, g, x, y, b, k, w, E;
            return openBlock(),
            createElementBlock("div", _hoisted_1$H, [createBaseVNode("div", _hoisted_2$A, [null !== (l = e.chapter.prev) && void 0 !== l && l.id && null !== (c = unref(n)) && void 0 !== c && null !== (u = c.navigator) && void 0 !== u && u.prevChapterVisible.data && "scrolled" !== unref(o).settings.pageMode ? withDirectives((openBlock(),
            createBlock(_sfc_main$1b, {
                key: 0,
                href: null === (d = unref(t)) || void 0 === d ? void 0 : d.hrefMap.read(e.chapter.prev.id, "prev-chap", e.chapter),
                history: {
                    cid: null === (f = e.chapter.prev) || void 0 === f ? void 0 : f.id
                },
                class: "nav-btn relative after:content-DEFAULT after:absolute after:right-0 after:w-1px after:bg-outline-black-8 after:top-12px after:bottom-12px"
            }, {
                default: withCtx((function() {
                    return [createTextVNode(toDisplayString(unref(r)("prev_chap")), 1)]
                }
                )),
                _: 1
            }, 8, ["href", "history"])), [[unref(i), {
                e: "prev-chap"
            }]]) : createCommentVNode("", !0), null !== (p = unref(t)) && void 0 !== p && p.hrefMap.chapterList && null !== (h = unref(n)) && void 0 !== h && null !== (m = h.navigator) && void 0 !== m && m.chapterListVisible.data ? (openBlock(),
            createElementBlock("a", {
                key: 1,
                target: "_blank",
                href: null === (_ = unref(t)) || void 0 === _ || null === (v = (g = _.hrefMap).chapterList) || void 0 === v ? void 0 : v.call(g),
                class: "nav-btn relative after:content-DEFAULT after:absolute after:right-0 after:w-1px after:bg-outline-black-8 after:top-12px after:bottom-12px",
                onClick: s[0] || (s[0] = withModifiers((function(e) {
                    return unref(o).isChapterListOpen = !unref(o).isChapterListOpen
                }
                ), ["prevent"]))
            }, toDisplayString(unref(r)("chapter_list")), 9, _hoisted_3$q)) : createCommentVNode("", !0), null !== (x = e.chapter.next) && void 0 !== x && x.id ? withDirectives((openBlock(),
            createBlock(_sfc_main$1b, {
                key: 2,
                href: null === (y = unref(t)) || void 0 === y ? void 0 : y.hrefMap.read(e.chapter.next.id, "next-chap", e.chapter),
                history: {
                    cid: e.chapter.next.id
                },
                class: "nav-btn"
            }, {
                default: withCtx((function() {
                    return [createTextVNode(toDisplayString(unref(r)("next_chap")), 1)]
                }
                )),
                _: 1
            }, 8, ["href", "history"])), [[unref(i), {
                e: "next-chap"
            }]]) : null !== (b = unref(t)) && void 0 !== b && b.hrefMap.end ? withDirectives((openBlock(),
            createElementBlock("a", {
                key: 3,
                href: null === (k = unref(t)) || void 0 === k || null === (w = (E = k.hrefMap).end) || void 0 === w ? void 0 : w.call(E),
                class: "nav-btn"
            }, [createTextVNode(toDisplayString(unref(r)("end_page")), 1)], 8, _hoisted_4$n)), [[unref(i), {
                e: "to-end"
            }, "c"]]) : createCommentVNode("", !0)])])
        }
    }
})
  , _hoisted_1$G = {
    class: "mt-6px text-s3 font-medium sm:text-s1 flex-shrink-0 inline-block"
}
  , _hoisted_2$z = {
    class: "ml-12px -mr-8px sm:ml-24px sm:flex sm:flex-wrap sm:-mt-8px"
}
  , _hoisted_3$p = ["href"]
  , _sfc_main$R = defineComponent({
    __name: "Recommend",
    setup: function(e) {
        var t = inject(RECOMMEND_BOOKS_STATE_KEY)
          , n = inject(FRONT_CONFIG_STATE_KEY)
          , o = inject(I18N_IO_FUNC_KEY);
        return function(e, r) {
            var i;
            return unref(t) && unref(t).length > 0 && null !== (i = unref(n)) && void 0 !== i && i.hrefMap.detail ? (openBlock(),
            createElementBlock("section", {
                key: 0,
                id: "r-recommends",
                class: "container border-t border-outline-black-8 py-32px text-s-gray-900 flex items-start <sm:whitespace-nowrap <sm:min-w-0 <sm:overflow-x-auto <sm:px-20px sm:px-64px",
                onTouchmove: r[0] || (r[0] = withModifiers((function() {}
                ), ["stop"]))
            }, [createBaseVNode("span", _hoisted_1$G, toDisplayString(unref(o)("recommend")), 1), createBaseVNode("div", _hoisted_2$z, [(openBlock(!0),
            createElementBlock(Fragment, null, renderList(unref(t), (function(e) {
                var t, o, r;
                return openBlock(),
                createElementBlock("a", {
                    key: e.id,
                    href: null === (t = unref(n)) || void 0 === t || null === (o = (r = t.hrefMap).detail) || void 0 === o ? void 0 : o.call(r, e.id),
                    class: "text-bo4 inline-block border border-outline-black-8 rounded-18px py-6px px-16px mr-8px hover-4 active-10 sm:mt-8px"
                }, toDisplayString(e.title), 9, _hoisted_3$p)
            }
            )), 128))])], 32)) : createCommentVNode("", !0)
        }
    }
})
  , Recommend = _export_sfc(_sfc_main$R, [["__scopeId", "data-v-a1f732c8"]])
  , _sfc_main$Q = defineComponent({
    __name: "Observer",
    props: {
        rootSelector: {
            default: null
        },
        rootMargin: {
            default: 0
        }
    },
    emits: ["change"],
    setup: function(e, t) {
        var n = t.emit
          , o = e
          , r = ref()
          , i = null;
        return onMounted((function() {
            var e = {
                root: o.rootSelector ? document.querySelector(o.rootSelector) : null,
                rootMargin: "".concat(o.rootMargin, "px")
            };
            i = new IntersectionObserver((function(e) {
                var t = _slicedToArray(e, 1)[0];
                n("change", t)
            }
            ),e),
            r.value && i.observe(r.value)
        }
        )),
        onUnmounted((function() {
            var e;
            null === (e = i) || void 0 === e || e.disconnect()
        }
        )),
        function(e, t) {
            return openBlock(),
            createElementBlock("div", {
                ref_key: "target",
                ref: r
            }, [renderSlot(e.$slots, "default")], 512)
        }
    }
})
  , _hoisted_1$F = {
    class: "chapter-wrapper relative"
}
  , _sfc_main$P = defineComponent({
    __name: "ChapterWrapper",
    props: {
        chapter: null
    },
    setup: function(e) {
        var t = e
          , n = inject(READER_STATE_KEY, defaultReaderState);
        function o(e) {
            e.intersectionRatio > 0 && (n.chapterContext.visibleChapter = t.chapter)
        }
        return function(e, t) {
            return openBlock(),
            createElementBlock("div", _hoisted_1$F, [createVNode(_sfc_main$Q, {
                class: "absolute top-70vh",
                onChange: o
            }), renderSlot(e.$slots, "default"), createVNode(_sfc_main$Q, {
                class: "absolute bottom-70vh",
                onChange: o
            })])
        }
    }
});
function useCurrentChapter() {
    var e = inject(READER_STATE_KEY, defaultReaderState)
      , t = inject(CHAPTERS_STATE_KEY);
    return computed((function() {
        return e.chapterContext.visibleChapter || t.value[0]
    }
    ))
}
function handlePopState(e) {
    window.onpopstate = function(t) {
        t.state && "reader" === t.state.target && t.state.payload && e(t.state.payload.cid)
    }
}
function updateHistory(e, t) {
    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "pushState";
    window.history[n]({
        target: "reader",
        payload: {
            cid: e
        }
    }, "", t)
}
function useHistoryReplace() {
    var e = useCurrentChapter()
      , t = inject(FRONT_CONFIG_STATE_KEY);
    onMounted((function() {
        watch(e, (function(e) {
            if (t.value && e.id)
                try {
                    updateHistory(e.id, t.value.hrefMap.read(e.id, "manual"), "replaceState")
                } catch (n) {}
        }
        ))
    }
    ))
}
function useSidePositionUpdater(e, t, n) {
    var o = inject(READER_STATE_KEY, defaultReaderState);
    function r() {
        if (t.value) {
            var o = t.value
              , r = o.offsetLeft
              , i = o.offsetWidth
              , a = window.scrollX;
            e.value && (e.value.style.left = "".concat(r - a, "px")),
            n.value && (n.value.style.left = "".concat(r + i - a, "px"))
        }
    }
    return onMounted((function() {
        r(),
        window.addEventListener("scroll", r, !!support() && {
            passive: !0
        }),
        window.addEventListener("resize", r, !!support() && {
            passive: !0
        }),
        watch((function() {
            return o.settings.pageWidth
        }
        ), (function() {
            return nextTick(r)
        }
        ))
    }
    )),
    onUnmounted((function() {
        window.removeEventListener("scroll", r),
        window.removeEventListener("resize", r)
    }
    )),
    {
        updateSidePosition: r
    }
}
var _hoisted_1$E = ["href"]
  , _hoisted_2$y = {
    class: "min-h-100vh relative z-1 bg-inherit"
}
  , _hoisted_3$o = {
    class: "relative"
}
  , _sfc_main$O = defineComponent({
    __name: "desktop",
    setup: function(e) {
        var t = inject(FRONT_CONFIG_STATE_KEY)
          , n = inject(BOOK_STATE_KEY)
          , o = inject(READER_STATE_KEY, defaultReaderState)
          , r = inject(CHAPTERS_STATE_KEY)
          , i = inject(CONFIG_STATE_KEY)
          , a = inject(BUS_STATE_KEY)
          , s = inject(I18N_IO_FUNC_KEY)
          , l = inject(ROOT_SLOTS_KEY)
          , c = ref(!1)
          , u = ref(!1)
          , d = toRef(o.chapterContext, "cid")
          , f = toRef(o, "errorHash")
          , p = ref()
          , h = ref()
          , m = ref()
          , _ = useSharedScroll().top
          , v = toRef(o.settings, "pageMode")
          , g = useChapter().checkAndLoadNextChapter
          , x = useSharedTrack().directive
          , y = useCurrentChapter();
        useGuide(),
        useHistoryReplace(),
        useTheme();
        var b = useSidePositionUpdater(p, h, m).updateSidePosition;
        function k() {
            u.value = !1,
            w()
        }
        function w() {
            if (!c.value && !u.value) {
                var e = g();
                e && (c.value = !0,
                e.then((function(e) {
                    c.value = !1,
                    e && (null == r || r.value.push(e))
                }
                )).catch((function(e) {
                    throw c.value = !1,
                    u.value = !0,
                    useToast({
                        title: s("load_chap_failed"),
                        type: "error"
                    }),
                    e
                }
                )))
            }
        }
        return useKeyNavigation((function(e) {
            var n;
            "enter" === e && (null !== (n = document.activeElement) && void 0 !== n && n.tagName && "BODY" === document.activeElement.tagName && (o.isChapterListOpen = !o.isChapterListOpen));
            if (r.value[0] && "single" === v.value) {
                var i, s = r.value[0], l = s.next, c = s.prev;
                if ("right" === e && null != l && l.id)
                    a.emit("_:update-chapters", {
                        ids: [l.id],
                        href: null === (i = t.value) || void 0 === i ? void 0 : i.hrefMap.read(l.id, "next-chap", r.value[0])
                    });
                else if ("left" === e && null != c && c.id) {
                    var u;
                    a.emit("_:update-chapters", {
                        ids: [c.id],
                        href: null === (u = t.value) || void 0 === u ? void 0 : u.hrefMap.read(c.id, "prev-chap", r.value[0])
                    })
                }
            }
        }
        )),
        onMounted((function() {
            handlePopState((function(e) {
                return a.emit("_:update-chapters", {
                    ids: [e],
                    fetch: !0
                })
            }
            )),
            watch(_, (function(e) {
                "scrolled" === v.value && (e + window.innerHeight + 1e3 >= document.documentElement.scrollHeight && (w(),
                o.lastChapterLoadMethod = "scroll"))
            }
            ), {
                immediate: !0
            }),
            watch(v, (function(e, t) {
                "scrolled" === t && "single" === e && o.chapterContext.visibleChapter && (r.value = [o.chapterContext.visibleChapter],
                window.scrollTo(0, 0))
            }
            )),
            watch((function() {
                return o.isChapterLoading
            }
            ), (function(e) {
                !e && "scrolled" !== v.value && window.scrollTo(0, 0)
            }
            ))
        }
        )),
        function(e, a) {
            var c, _, g, w, E, S, C, B, T;
            return openBlock(),
            createElementBlock("div", {
                id: "reader",
                class: normalizeClass(["reader relative min-h-full noise-bg", {
                    "side-open": unref(o).isSideSheetOpen
                }]),
                "data-width": "resp",
                style: normalizeStyle(("auto" !== unref(o).settings.pageWidth ? "--width:".concat(unref(o).settings.pageWidth, "px;") : "") + "--side-width:".concat(unref(o).isSideSheetOpen ? 400 : 0, "px;"))
            }, [createVNode(unref(ClientOnly), null, {
                default: withCtx((function() {
                    var e, n, r;
                    return [createBaseVNode("div", {
                        id: "left-container",
                        ref_key: "$left",
                        ref: p,
                        class: "h-100vh fixed top-0 z-2 transition-transform flex flex-col-reverse pb-146px duration-300"
                    }, [null !== (e = unref(t)) && void 0 !== e && e.hrefMap.report && unref(y) ? withDirectives((openBlock(),
                    createElementBlock("a", {
                        key: 0,
                        rel: "nofollow",
                        href: unref(t).hrefMap.report("chapter", unref(y)),
                        target: "_blank",
                        class: "side-button mt-8px order-2"
                    }, [createTextVNode(toDisplayString(unref(s)("report")), 1)], 8, _hoisted_1$E)), [[unref(x), {
                        e: "report"
                    }, "c"]]) : createCommentVNode("", !0), null !== (n = unref(i)) && void 0 !== n && null !== (r = n.guide) && void 0 !== r && r.visible.data ? withDirectives((openBlock(),
                    createElementBlock("button", {
                        key: 1,
                        class: "side-button mt-8px order-4",
                        onClick: a[0] || (a[0] = function(e) {
                            return unref(o).isGuideOpen = !0
                        }
                        )
                    }, [createTextVNode(toDisplayString(unref(s)("guide")), 1)])), [[unref(x), {
                        e: "guide"
                    }, "c"]]) : createCommentVNode("", !0), (openBlock(),
                    createBlock(resolveDynamicComponent(unref(l)["content-left"]), {
                        chapter: unref(o).chapterContext.visibleChapter
                    }, null, 8, ["chapter"]))], 512)]
                }
                )),
                _: 1
            }), createBaseVNode("div", {
                id: "reader-content",
                ref_key: "$center",
                ref: h,
                class: "bg-b-gray-50 relative pb-$sai-bottom w-$width noise-bg z-1 mx-auto left-0 transition-transform duration-300",
                onTransitionend: a[1] || (a[1] = function() {
                    return unref(b) && unref(b).apply(void 0, arguments)
                }
                )
            }, [createVNode(_sfc_main$V, {
                class: "noise-bg"
            }, {
                default: withCtx((function() {
                    return [(openBlock(),
                    createBlock(resolveDynamicComponent(unref(l)["nav-bar-top"]))), (openBlock(),
                    createBlock(resolveDynamicComponent(unref(l)["nav-bar"]))), unref(l)["nav-bar"] ? createCommentVNode("", !0) : (openBlock(),
                    createBlock(_sfc_main$W, {
                        key: 0
                    }))]
                }
                )),
                _: 1
            }), createBaseVNode("div", _hoisted_2$y, [unref(l).breadcrumbs ? createCommentVNode("", !0) : withDirectives((openBlock(),
            createBlock(_sfc_main$1i, {
                key: 0
            }, null, 512)), [[vShow, null === (c = unref(i)) || void 0 === c || null === (_ = c.breadcrumbs) || void 0 === _ ? void 0 : _.visible.data]]), (openBlock(),
            createBlock(resolveDynamicComponent(unref(l).breadcrumbs))), null !== (g = unref(r)[0]) && void 0 !== g && g.showTitlePage && unref(n) && null !== (w = unref(i)) && void 0 !== w && null !== (E = w.titlePage) && void 0 !== E && null !== (S = E.visible) && void 0 !== S && S.data ? (openBlock(),
            createBlock(resolveDynamicComponent(unref(l)["title-page"]), {
                key: 1
            })) : createCommentVNode("", !0), !unref(r).length && unref(f)[unref(d)] ? (openBlock(),
            createBlock(_sfc_main$1j, {
                key: 2,
                title: unref(f)[unref(d)].title,
                desc: unref(f)[unref(d)].desc
            }, null, 8, ["title", "desc"])) : createCommentVNode("", !0), (openBlock(!0),
            createElementBlock(Fragment, null, renderList(unref(r), (function(e) {
                return openBlock(),
                createBlock(_sfc_main$P, {
                    key: e.id,
                    chapter: e,
                    class: "border-outline-black-8 border-t first-of-type:border-none pb-1px"
                }, {
                    default: withCtx((function() {
                        var t, n, o, r, a;
                        return [unref(f)[e.id] ? (openBlock(),
                        createBlock(_sfc_main$1j, {
                            key: 0,
                            title: unref(f)[e.id].title,
                            desc: unref(f)[e.id].desc
                        }, null, 8, ["title", "desc"])) : (openBlock(),
                        createElementBlock(Fragment, {
                            key: 1
                        }, [createBaseVNode("div", _hoisted_3$o, [(openBlock(),
                        createBlock(resolveDynamicComponent(unref(l)["content-above"]), {
                            chapter: e
                        }, null, 8, ["chapter"])), (openBlock(),
                        createBlock(resolveDynamicComponent(unref(l).print), {
                            chapter: e
                        }, null, 8, ["chapter"]))]), (openBlock(),
                        createBlock(resolveDynamicComponent(unref(l).subscription), {
                            chapter: e
                        }, null, 8, ["chapter"])), null !== (t = unref(i)) && void 0 !== t && null !== (n = t.authorSay) && void 0 !== n && n.visible.data ? (openBlock(),
                        createBlock(resolveDynamicComponent(unref(l)["author-say"]), {
                            key: 0,
                            chapter: e
                        }, null, 8, ["chapter"])) : createCommentVNode("", !0), (openBlock(),
                        createBlock(resolveDynamicComponent(unref(l)["navigation-above"]), {
                            chapter: e
                        }, null, 8, ["chapter"])), "scrolled" === unref(v) && null !== (o = e.next) && void 0 !== o && o.id ? createCommentVNode("", !0) : (openBlock(),
                        createBlock(_sfc_main$S, {
                            key: 1,
                            chapter: e
                        }, null, 8, ["chapter"])), (openBlock(),
                        createBlock(resolveDynamicComponent(unref(l)["content-bottom"]))), withDirectives(createVNode(Recommend, {
                            class: normalizeClass(["scrolled" === unref(v) && "mt-64px"])
                        }, null, 8, ["class"]), [[vShow, null === (r = unref(i)) || void 0 === r || null === (a = r.recommends) || void 0 === a ? void 0 : a.visible.data]])], 64))]
                    }
                    )),
                    _: 2
                }, 1032, ["chapter"])
            }
            )), 128)), "scrolled" === unref(v) && null !== (C = unref(r)[unref(r).length - 1]) && void 0 !== C && null !== (B = C.next) && void 0 !== B && B.id && null !== (T = unref(r)[unref(r).length - 1]) && void 0 !== T && T.auth ? (openBlock(),
            createBlock(_sfc_main$U, {
                key: 3,
                failed: u.value,
                class: "border-t border-outline-black-8 h-152px",
                onRetry: k
            }, null, 8, ["failed"])) : createCommentVNode("", !0)])], 544), createVNode(unref(ClientOnly), null, {
                default: withCtx((function() {
                    return [createBaseVNode("div", {
                        id: "right-container",
                        ref_key: "$right",
                        ref: m,
                        class: "h-100vh fixed top-0 flex items-end z-2 transition-transform duration-300"
                    }, [createVNode(_sfc_main$_, null, {
                        default: withCtx((function() {
                            return [createVNode(DesktopSideSheet, null, {
                                default: withCtx((function() {
                                    return [(openBlock(),
                                    createBlock(resolveDynamicComponent(unref(l)["side-sheet"])))]
                                }
                                )),
                                _: 1
                            })]
                        }
                        )),
                        _: 1
                    })], 512)]
                }
                )),
                _: 1
            }), createVNode(unref(ClientOnly), null, {
                default: withCtx((function() {
                    return [createVNode(DesktopChapterList), createVNode(_sfc_main$Z), createVNode(_sfc_main$1c), (openBlock(),
                    createBlock(resolveDynamicComponent(unref(l)["simple-recharge"]))), (openBlock(),
                    createBlock(resolveDynamicComponent(unref(l)["quick-recharge-dialog"])))]
                }
                )),
                _: 1
            }), (openBlock(),
            createBlock(resolveDynamicComponent(unref(l).default)))], 6)
        }
    }
})
  , storageKeyHash = {
    theme: "theme",
    lastLightTheme: "last-light-theme",
    fontSize: "font-size",
    font: "font",
    disableReview: "review-disable",
    pageMode: "page-mode",
    pageWidth: "page-width",
    autoSubs: "auto-subs"
};
function useSettingsInit() {
    var e, t, n = inject(FRONT_CONFIG_STATE_KEY), o = inject(READER_STATE_KEY, defaultReaderState), r = inject(BUS_STATE_KEY), i = (null === (e = n.value) || void 0 === e ? void 0 : e.initialSettings) || {}, a = {};
    null !== (t = n.value) && void 0 !== t && t.initialSettings && (Object.assign(o.settings, n.value.initialSettings),
    Object.assign(a, n.value.initialSettings)),
    onMounted((function() {
        Object.keys(o.settings).forEach((function(e) {
            if (!(e in i)) {
                var t = e
                  , n = storageKeyHash[t]
                  , r = window.localStorage.getItem("".concat(STORAGE_PREFIX, ":").concat(n));
                r && ("boolean" == typeof o.settings[t] ? o.settings[t] = "1" === r : "number" == typeof o.settings[t] ? o.settings[t] = Number(r) : o.settings[t] = r)
            }
        }
        )),
        Object.assign(a, o.settings),
        watchDebounced((function() {
            return o.settings
        }
        ), (function(e) {
            var t = [];
            Object.keys(e).forEach((function(n) {
                var o = n;
                a[o] !== e[o] && t.push(o)
            }
            )),
            r.emit("settings:update", {
                data: e,
                changes: t
            }),
            a = _objectSpread({}, e),
            Object.keys(e).forEach((function(t) {
                if (!(t in i)) {
                    var n = t
                      , o = storageKeyHash[n]
                      , r = e[n];
                    "boolean" == typeof r && (r = r ? "1" : "0"),
                    window.localStorage.setItem("".concat(STORAGE_PREFIX, ":").concat(o), r)
                }
            }
            ))
        }
        ), {
            deep: !0,
            debounce: 600,
            flush: "pre"
        })
    }
    ))
}
function supportWoff2() {
    if (!("FontFace"in window))
        return !1;
    var e = new FontFace("t",'url( "data:font/woff2;base64,d09GMgABAAAAAADwAAoAAAAAAiQAAACoAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAABmAALAogOAE2AiQDBgsGAAQgBSAHIBuDAciO1EZ3I/mL5/+5/rfPnTt9/9Qa8H4cUUZxaRbh36LiKJoVh61XGzw6ufkpoeZBW4KphwFYIJGHB4LAY4hby++gW+6N1EN94I49v86yCpUdYgqeZrOWN34CMQg2tAmthdli0eePIwAKNIIRS4AGZFzdX9lbBUAQlm//f262/61o8PlYO/D1/X4FrWFFgdCQD9DpGJSxmFyjOAGUU4P0qigcNb82GAAA" ) format( "woff2" )',{});
    return e.load().catch((function() {}
    )),
    "loading" === e.status || "loaded" === e.status
}
function checkFontLoaded(e) {
    return _checkFontLoaded.apply(this, arguments)
}
function _checkFontLoaded() {
    return _checkFontLoaded = _asyncToGenerator(_regeneratorRuntime().mark((function e(t) {
        var n, o, r, i, a, s;
        return _regeneratorRuntime().wrap((function(e) {
            for (; ; )
                switch (e.prev = e.next) {
                case 0:
                    n = [],
                    o = _createForOfIteratorHelper(window.document.fonts);
                    try {
                        for (o.s(); !(r = o.n()).done; )
                            (i = r.value).family === t && n.push(i)
                    } catch (l) {
                        o.e(l)
                    } finally {
                        o.f()
                    }
                    if (0 !== n.length) {
                        e.next = 5;
                        break
                    }
                    return e.abrupt("return", "miss");
                case 5:
                    return a = n.map(function() {
                        var e = _asyncToGenerator(_regeneratorRuntime().mark((function e(t) {
                            var n;
                            return _regeneratorRuntime().wrap((function(e) {
                                for (; ; )
                                    switch (e.prev = e.next) {
                                    case 0:
                                        if ("loading" === t.status) {
                                            e.next = 2;
                                            break
                                        }
                                        return e.abrupt("return", t.status);
                                    case 2:
                                        return e.next = 4,
                                        t.loaded;
                                    case 4:
                                        return n = e.sent,
                                        e.abrupt("return", n.status);
                                    case 6:
                                    case "end":
                                        return e.stop()
                                    }
                            }
                            ), e)
                        }
                        )));
                        return function(t) {
                            return e.apply(this, arguments)
                        }
                    }()),
                    e.next = 8,
                    Promise.all(a);
                case 8:
                    return s = e.sent,
                    e.abrupt("return", s.find((function(e) {
                        return "loading" !== e
                    }
                    )) || "miss");
                case 10:
                case "end":
                    return e.stop()
                }
        }
        ), e)
    }
    ))),
    _checkFontLoaded.apply(this, arguments)
}
function checkElementFontFamily(e) {
    return window.getComputedStyle(e).getPropertyValue("font-family")
}
function initYWQD(e, t) {
    var n, o, r, i = {
        selectorReview: ".review",
        autoMix: 1
    };
    t && Object.assign(i, {
        guid: "function" == typeof (null === (o = window.Fock) || void 0 === o ? void 0 : o.encodeGuid) ? null === (r = window.Fock) || void 0 === r ? void 0 : r.encodeGuid(t) : t
    });
    e && Object.assign(i, e),
    null === (n = window.YWQD) || void 0 === n || n.config(i)
}
function initFock(userKey, fkp) {
    if (!window.Fock)
        throw new Error("missing Fock");
    window.Fock.initialize(),
    window.Fock.setupUserKey(userKey),
    fkp && eval(atob(fkp))
}
function unlockFock(e, t) {
    return new Promise((function(n, o) {
        try {
            var r;
            null === (r = window.Fock) || void 0 === r || r.unlock(e, t, (function(e, t) {
                0 === e ? n(t) : o(new Error("F:e:u: ".concat(e)))
            }
            ))
        } catch (i) {
            o(i)
        }
    }
    ))
}
function handle(e, t, n, o, r, i, a, s) {
    if (!window.YWQD)
        throw new Error("missing YWQD");
    for (var l = new ArrayBuffer(o.length), c = new Uint8Array(l), u = 0; u < o.length; ++u)
        c[u] = o[u];
    var d = new Blob([c],{
        type: "font/ttf"
    })
      , f = URL.createObjectURL(d)
      , p = n.replace(/TS-1/g, "transform:scaleX(-1)").replace(/::B/g, "::before").replace(/::A/g, "::after").replace(/\{O:/g, "{order:").replace(/\{C:/g, "{content:")
      , h = setTimeout(0);
    p = p.replace(/y\w+(\{|:|\))/g, (function(e, t) {
        return e.replace(t, h + t)
    }
    ));
    var m = t.map((function(e) {
        return e.replace(/<\/?y\w+([\w\W]*?)>/g, (function(e, t) {
            return e.replace(/(<\/?y\w+)/g, "$1".concat(h)).replace(t, t.replace(/(y\w+)/g, "$1".concat(h)))
        }
        ))
    }
    ))
      , _ = document.body.children
      , v = _[Math.floor(Math.random() * _.length)];
    p = a + (p = "@font-face{font-family:".concat(r, ";src:url(").concat(f, ') format("truetype");unicode-range: U+3400-4DB5;font-display:swap;}').concat(p));
    var g = new Blob([p],{
        type: "text/css"
    })
      , x = URL.createObjectURL(g)
      , y = document.createElement("link");
    y.rel = "stylesheet",
    y.href = x,
    y.onload = function() {
        window.YWQD.add(e, m, i),
        s()
    }
    ,
    v.insertAdjacentElement("beforebegin", y)
}
function loadFontFace(e, t, n) {
    var o = "@font-face {font-family:".concat(e, ";src:url(").concat(n, ") format('woff2'),url(").concat(t, ") format('truetype');unicode-range: U+4E00-9FA5;font-display:swap;}");
    return "FontFace"in window ? new Promise((function(r) {
        var i = new XMLHttpRequest
          , a = supportWoff2() ? n : t;
        i.open("GET", a, !0),
        i.responseType = "arraybuffer",
        i.onload = function() {
            var t = this.response
              , n = new FontFace(e,t);
            document.fonts.add(n),
            r({
                css: o,
                status: "ok"
            })
        }
        ,
        i.onerror = function(e) {
            r({
                css: o,
                status: "fail"
            })
        }
        ,
        i.send()
    }
    )) : Promise.resolve({
        css: o,
        status: "unsupported"
    })
}
function useBase() {
    var e = inject(FRONT_CONFIG_STATE_KEY)
      , t = inject(BOOK_STATE_KEY)
      , n = inject(CHAPTER_LIST_STATE_KEY)
      , o = inject(READER_STATE_KEY, defaultReaderState)
      , r = inject(CHAPTERS_STATE_KEY)
      , i = inject(BUS_STATE_KEY)
      , a = inject(USER_STATE_KEY)
      , s = inject(I18N_IO_FUNC_KEY)
      , l = inject(ADAPTERS_KEY)
      , c = toRefs(o.chapterContext).cid
      , u = toRefs(o).errorHash
      , d = useSharedScroll().destroy
      , f = useChapter()
      , p = f.loadChapter
      , h = f.isRemoved;
    useSettingsInit();
    var m = useStyleTag("").css;
    function _(e) {
        o.isChapterLoading = !0,
        p(e).then((function(t) {
            if (delete u.value[e],
            !t)
                throw new Error("Empty Response");
            var n = null == r ? void 0 : r.value.findIndex((function(t) {
                return t.id === e
            }
            ));
            "number" == typeof n && n >= 0 && "refresh" === o.lastChapterLoadMethod ? r.value[n] = _objectSpread({}, t) : r.value = [_objectSpread({}, t)],
            h(t) && (o.isChapterLoading = !1)
        }
        )).catch((function(t) {
            throw u.value[e] = t instanceof ServiceError ? {
                title: t.serviceError.msg
            } : {
                title: s("load_chap_failed"),
                desc: t.message
            },
            o.isChapterLoading = !1,
            t
        }
        ))
    }
    onMounted((function() {
        var n, u, d;
        (window.__ywr_version__ = "0.5.109",
        window.addEventListener("contextmenu", (function(e) {
            return e.preventDefault()
        }
        )),
        initYWQD(null === (n = e.value) || void 0 === n ? void 0 : n.ywqdOptions, null === (u = a.value) || void 0 === u ? void 0 : u.id),
        function() {
            for (var e = "", t = 0; t < 64; t++)
                e += ".icon-emoji-".concat(t + 1, "{background-image:url('https://qidian.gtimg.com/app_emoji_new/newface_").concat(t + 1, ".png') !important;}");
            m.value = e
        }(),
        null != t && t.value) || (null === (d = l.processBookInfo) || void 0 === d || d.call(l).then((function(e) {
            return t.value = e
        }
        )));
        r.value[0] || _(c.value),
        i.on((function(t, n) {
            if ("_:update-chapters" === t)
                n.fetch ? _(n.ids[0]) : function(n, r) {
                    var i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                    if (n) {
                        var a = o.chapterContext.cid;
                        if (e.value.disableChapterAjax || i)
                            r && (window.location.href = r);
                        else if (n !== a && r)
                            try {
                                updateHistory(n, r, o.deviceType === PlatformType.PC ? "pushState" : "replaceState"),
                                _(n)
                            } catch (t) {
                                window.location.href = r
                            }
                    }
                }(n.ids[0], n.href, n.reload)
        }
        ));
        var f = null;
        watch((function() {
            return o.isChapterLoading
        }
        ), (function(e) {
            var t;
            if (null === (t = f) || void 0 === t || t(),
            e && ["single"].includes(o.lastChapterLoadMethod) && !o.errorHash[c.value]) {
                var n;
                null === (n = f) || void 0 === n || n();
                var r = useToast({
                    title: s("loading_chap"),
                    type: "loading"
                }).stop;
                f = r
            }
        }
        ), {
            immediate: !0
        })
    }
    )),
    watch([c, n], (function() {
        var e;
        if (c.value && n.value && null !== (e = n.value) && void 0 !== e && e.length) {
            var t = getChapterPosition(c.value, n.value);
            t && (o.chapterContext.index = t.index)
        }
    }
    ), {
        immediate: !0
    }),
    watch(t, (function(e) {
        e && 8 === e.checkLevel && (o.isDisableAction = !0)
    }
    ), {
        immediate: !0
    }),
    onUnmounted((function() {
        d()
    }
    ))
}
var desktop = defineComponent({
    setup: function() {
        var e = useSlots();
        return provide(ROOT_SLOTS_KEY, e),
        inject(READER_STATE_KEY, defaultReaderState).deviceType = PlatformType.PC,
        useBase(),
        function() {
            return h(_sfc_main$O)
        }
    }
});
function bookCoverUrl(e, t) {
    return "//bookcover.yuewen.com/qdbimg/349573/c_".concat(e, "/").concat(String(t))
}
var _hoisted_1$C = {
    class: "sm:pt-64px sm:px-64px px-12px pt-32px min-h-100vh"
}
  , _hoisted_2$w = {
    key: 0,
    class: "font-medium text-s-gray-500 text-rh3 mb-40px <sm:mb-28px <sm:text-rh4"
}
  , _hoisted_3$n = {
    key: 1,
    id: "r-endRecommends",
    class: "mt-20px rounded-10px bg-s-bw-white <sm:mt-12px p-20px pt-16px <sm:pt-13px <sm:px-16px <sm:pb-14px"
}
  , _hoisted_4$m = {
    class: "flex items-center justify-between font-semibold text-s-gray-900 text-rh6"
}
  , _hoisted_5$j = {
    class: "mt-16px -mr-20px <sm:-mr-8px flex"
}
  , _hoisted_6$i = ["href"]
  , _hoisted_7$g = {
    class: "relative mx-auto rounded-5px after:content-DEFAULT after:inset-0 after:rounded-inherit after:h-inherit after:border-0.5px after:border-outline-black-8 after:absolute"
}
  , _hoisted_8$g = ["alt", "src"]
  , _hoisted_9$g = {
    class: "text-s-gray-900 line-clamp-2 font-medium text-s1 <sm:text-s13 mt-4px"
}
  , _hoisted_10$d = {
    class: "text-s-gray-500 text-c12"
}
  , _hoisted_11$c = {
    key: 0,
    class: "<sm:hidden"
}
  , _hoisted_12$9 = ["href"]
  , _sfc_main$M = defineComponent({
    __name: "End",
    setup: function(e) {
        var t = inject(BOOK_STATE_KEY)
          , n = inject(FRONT_CONFIG_STATE_KEY)
          , o = inject(CONFIG_STATE_KEY)
          , r = inject(RECOMMEND_BOOKS_STATE_KEY)
          , i = inject(READER_STATE_KEY, defaultReaderState)
          , a = inject(I18N_IO_FUNC_KEY)
          , s = inject(ADAPTERS_KEY)
          , l = useSharedTrack().directive
          , c = ref(!1);
        function u() {
            var e;
            c.value = !0,
            null === (e = s.processRecommendsChange) || void 0 === e || e.call(s).then((function(e) {
                r.value = e,
                c.value = !1
            }
            )).catch((function() {
                return c.value = !1
            }
            ))
        }
        return function(e, s) {
            var d, f, p, h;
            return openBlock(),
            createElementBlock(Fragment, null, [renderSlot(e.$slots, "end-nav", {}, void 0, !0), createBaseVNode("div", _hoisted_1$C, [unref(t) ? (openBlock(),
            createElementBlock("div", _hoisted_2$w, toDisplayString("string" == typeof unref(t).status ? unref(t).status : unref(t).status ? unref(a)("already_finished") : unref(a)("to_be_continue")), 1)) : createCommentVNode("", !0), renderSlot(e.$slots, "default", {}, void 0, !0), unref(r) && unref(r).length > 0 ? withDirectives((openBlock(),
            createElementBlock("div", _hoisted_3$n, [createBaseVNode("div", _hoisted_4$m, [createTextVNode(toDisplayString(unref(a)("people_also_read")), 1), createBaseVNode("button", {
                class: "text-secondary-blue-500 text-s13 font-medium flex items-center",
                onClick: u
            }, [createBaseVNode("div", {
                class: normalizeClass(["icon-refresh mr-4px", [c.value && "animate-spin"]])
            }, null, 2), createTextVNode(toDisplayString(unref(a)("update_recommends")), 1)])]), createBaseVNode("div", _hoisted_5$j, [(openBlock(!0),
            createElementBlock(Fragment, null, renderList(unref(r).slice(0, "desktop" === unref(i).deviceType ? 6 : 4), (function(e) {
                var t, o, r, i, s;
                return openBlock(),
                createElementBlock("a", {
                    key: e.id,
                    href: null === (t = unref(n)) || void 0 === t || null === (o = (r = t.hrefMap).detail) || void 0 === o ? void 0 : o.call(r, e.id),
                    class: "book mr-20px inline-block <sm:mr-8px"
                }, [createBaseVNode("div", _hoisted_7$g, [createBaseVNode("img", {
                    alt: e.title,
                    src: (null === (i = (s = unref(n)).coverUrl) || void 0 === i ? void 0 : i.call(s, e.id)) || unref(bookCoverUrl)(e.id, 180),
                    class: "w-full rounded-inherit mx-auto"
                }, null, 8, _hoisted_8$g)]), createBaseVNode("div", _hoisted_9$g, toDisplayString(e.title), 1), createBaseVNode("div", _hoisted_10$d, [e.category ? (openBlock(),
                createElementBlock("span", _hoisted_11$c, toDisplayString(e.category) + " · ", 1)) : createCommentVNode("", !0), createTextVNode(toDisplayString(unref(a)("total_words", String(unref(formatNumber2)(e.wordCount)))), 1)])], 8, _hoisted_6$i)
            }
            )), 128))])], 512)), [[vShow, null === (d = unref(o)) || void 0 === d || null === (f = d.endRecommends) || void 0 === f ? void 0 : f.visible.data]]) : createCommentVNode("", !0), null !== (p = unref(n)) && void 0 !== p && p.hrefMap.shelf ? withDirectives((openBlock(),
            createElementBlock("a", {
                key: 2,
                href: null === (h = unref(n)) || void 0 === h ? void 0 : h.hrefMap.shelf(),
                class: "bottom-btn sm:nav-btn-group justify-center text-center py-12px hover-10 active-10 mt-40px hover:text-s-gray-700 font-medium <sm:py-14px <sm:bg-sheet-b-bw-white <sm:w-full <sm:fixed <sm:bottom-0 <sm:left-0 <sm:text-bt1"
            }, [createTextVNode(toDisplayString(unref(a)("back_to_shelf")), 1)], 8, _hoisted_12$9)), [[unref(l), {
                e: "end:to-shelf"
            }, "c"]]) : createCommentVNode("", !0)])], 64)
        }
    }
})
  , End = _export_sfc(_sfc_main$M, [["__scopeId", "data-v-781d53bc"]])
  , _withScopeId$8 = function(e) {
    return pushScopeId("data-v-fcab4c88"),
    e = e(),
    popScopeId(),
    e
}
  , _hoisted_1$B = {
    key: 0,
    class: "fixed z-5 top-0 left-0 right-0 bottom-64px pb-$sai-bottom"
}
  , _hoisted_2$v = {
    id: "chapter-list",
    class: "fixed top-0 left-0 right-44px bottom-64px pb-$sai-bottom z-6"
}
  , _hoisted_3$m = {
    class: "bg-sheet-b-bw-white h-full w-full relative flex flex-col"
}
  , _hoisted_4$l = {
    key: 0,
    class: "flex items-center justify-center h-44px relative border-b border-b-outline-black-8 flex-shrink-0"
}
  , _hoisted_5$i = {
    class: "rounded-8px p-2px bg-black-8 text-s13 text-s-gray-500"
}
  , _hoisted_6$h = _withScopeId$8((function() {
    return createBaseVNode("span", {
        class: "icon-arrow-circle text-20px text-s-gray-300"
    }, null, -1)
}
))
  , _hoisted_7$f = [_hoisted_6$h]
  , _hoisted_8$f = {
    key: 1,
    class: "px-16px text-s-gray-900 text-s1 flex items-center h-48px font-medium"
}
  , _hoisted_9$f = {
    key: 0
}
  , _hoisted_10$c = {
    class: "flex-1 overflow-auto relative overscroll-contain"
}
  , _hoisted_11$b = {
    class: "py-8px px-16px text-c12 text-s-gray-500 bg-segmentation-black-4 truncate"
}
  , _hoisted_12$8 = {
    class: "text-bo3 text-s-gray-900"
}
  , _hoisted_13$8 = ["id"]
  , _hoisted_14$5 = {
    class: "truncate"
}
  , _hoisted_15$4 = {
    key: 0,
    class: "flex-shrink-0 text-s-gray-500"
}
  , _hoisted_16$4 = {
    key: 1,
    class: "icon-lock text-20px flex-shrink-0 ml-6px"
}
  , _hoisted_17$4 = ["src"]
  , _sfc_main$L = defineComponent({
    __name: "ChapterList",
    setup: function(e) {
        var t = inject(BOOK_STATE_KEY)
          , n = inject(FRONT_CONFIG_STATE_KEY)
          , o = inject(CONFIG_STATE_KEY)
          , r = inject(CHAPTER_LIST_STATE_KEY)
          , i = inject(READER_STATE_KEY, defaultReaderState)
          , a = inject(I18N_IO_FUNC_KEY)
          , s = inject(ADAPTERS_KEY)
          , l = inject(ROOT_SLOTS_KEY)
          , c = computed((function() {
            var e;
            return (null == i || null === (e = i.chapterContext.visibleChapter) || void 0 === e ? void 0 : e.id) || (null == i ? void 0 : i.chapterContext.cid)
        }
        ))
          , u = ref("chapter-list")
          , d = useSharedTrack().directive
          , f = useChapterList(r, c)
          , p = f.chapterSize
          , h = f.isReverse
          , m = f.reverseChapterList;
        function _() {
            i.isChapterListOpen = !1,
            i.isPanelOpen = !1
        }
        return watch((function() {
            return i.isChapterListOpen
        }
        ), (function(e) {
            if (e) {
                var t, n = !!r.value;
                s.processChapterList && "chapter-list" === u.value && (null === (t = function() {
                    var e, t = null;
                    return r.value || (t = useToast({
                        title: a("loading"),
                        type: "loading"
                    })),
                    null === (e = s.processChapterList) || void 0 === e ? void 0 : e.call(s).then((function(e) {
                        var n;
                        r.value = e,
                        null === (n = t) || void 0 === n || n.stop()
                    }
                    )).catch((function(e) {
                        var n;
                        null === (n = t) || void 0 === n || n.stop(),
                        handleError(e, a("load_failed"))
                    }
                    ))
                }()) || void 0 === t || t.then((function() {
                    n || nextTick((function() {
                        var e;
                        null === (e = document.getElementById("chapter-item-".concat(c.value))) || void 0 === e || e.scrollIntoView()
                    }
                    ))
                }
                ))),
                n && nextTick((function() {
                    var e;
                    null === (e = document.getElementById("chapter-item-".concat(c.value))) || void 0 === e || e.scrollIntoView()
                }
                ))
            }
        }
        )),
        function(e, f) {
            return openBlock(),
            createElementBlock(Fragment, null, [createVNode(Transition, {
                name: "fade"
            }, {
                default: withCtx((function() {
                    return [unref(i).isChapterListOpen ? (openBlock(),
                    createElementBlock("div", _hoisted_1$B, [createBaseVNode("div", {
                        class: "bg-on-image-black-60 h-full",
                        onClick: f[0] || (f[0] = function(e) {
                            return unref(i).isChapterListOpen = !unref(i).isChapterListOpen
                        }
                        ),
                        onTouchmove: f[1] || (f[1] = withModifiers((function() {}
                        ), ["prevent", "stop"]))
                    }, null, 32)])) : createCommentVNode("", !0)]
                }
                )),
                _: 1
            }), createVNode(Transition, {
                name: "slide"
            }, {
                default: withCtx((function() {
                    var v, g, x, y, b, k, w, E;
                    return [withDirectives(createBaseVNode("div", _hoisted_2$v, [createBaseVNode("section", _hoisted_3$m, [unref(s).processBookmarkList ? (openBlock(),
                    createElementBlock("div", _hoisted_4$l, [createBaseVNode("div", _hoisted_5$i, [createBaseVNode("button", {
                        class: normalizeClass(["rounded-6px py-2px px-8px", ["chapter-list" === u.value && "font-medium text-s-gray-900 bg-s-bw-white"]]),
                        onClick: f[2] || (f[2] = function(e) {
                            return u.value = "chapter-list"
                        }
                        )
                    }, toDisplayString(unref(a)("chapter_list")), 3), withDirectives((openBlock(),
                    createElementBlock("button", {
                        class: normalizeClass(["ml-2px rounded-6px py-2px px-8px", ["bookmark-list" === u.value && "font-medium text-s-gray-900 bg-s-bw-white"]]),
                        onClick: f[3] || (f[3] = function(e) {
                            return u.value = "bookmark-list"
                        }
                        )
                    }, [createTextVNode(toDisplayString(unref(a)("bookmark")), 1)], 2)), [[unref(d), {
                        e: "bookmark-list:tab"
                    }, "c"]])]), createBaseVNode("button", {
                        class: "w-36px h-36px flex items-center justify-center absolute right-6px",
                        onClick: f[4] || (f[4] = function(e) {
                            return unref(i).isChapterListOpen = !1
                        }
                        )
                    }, _hoisted_7$f)])) : createCommentVNode("", !0), unref(r) && "chapter-list" === u.value ? (openBlock(),
                    createElementBlock("div", _hoisted_8$f, [unref(t) ? (openBlock(),
                    createElementBlock("span", _hoisted_9$f, toDisplayString(("string" == typeof unref(t).status ? unref(t).status : unref(a)(unref(t).status ? "chaps_finished" : "chaps_serialized")) + " · " + unref(a)("total_chaps", String(unref(p)))), 1)) : createCommentVNode("", !0), withDirectives((openBlock(),
                    createElementBlock("button", {
                        class: "text-s3 flex items-center px-12px py-8px rounded-8px ml-auto -mr-12px active-10 font-medium active-a60 text-s-gray-900",
                        onClick: f[5] || (f[5] = function(e) {
                            return h.value = !unref(h)
                        }
                        )
                    }, [createBaseVNode("span", {
                        class: normalizeClass(["icon-sort text-20px mr-4px", [unref(h) && "transform rotate-180"]])
                    }, null, 2), createTextVNode(" " + toDisplayString(unref(h) ? unref(a)("ascending") : unref(a)("descending")), 1)])), [[unref(d), function() {
                        return {
                            e: "chapter-list:sort",
                            ctx: !unref(h)
                        }
                    }
                    ]])])) : createCommentVNode("", !0), withDirectives((openBlock(),
                    createElementBlock("div", _hoisted_10$c, [createBaseVNode("div", {
                        class: normalizeClass([(null === (v = unref(o)) || void 0 === v || null === (g = v.chapterList) || void 0 === g ? void 0 : g.active.data) && "pb-56px"])
                    }, [(openBlock(!0),
                    createElementBlock(Fragment, null, renderList(unref(h) ? unref(m) : unref(r), (function(e) {
                        return openBlock(),
                        createElementBlock(Fragment, {
                            key: e.id
                        }, [createBaseVNode("div", _hoisted_11$b, toDisplayString(e.title || (e.vip ? unref(a)("main_vip_volume") : unref(a)("main_volume"))), 1), createBaseVNode("ul", _hoisted_12$8, [(openBlock(!0),
                        createElementBlock(Fragment, null, renderList(e.list, (function(e) {
                            var o;
                            return openBlock(),
                            createElementBlock("li", {
                                id: "chapter-item-".concat(e.id),
                                key: e.id,
                                class: normalizeClass([[(e.id in unref(i).unlockedHash ? !unref(i).unlockedHash[e.id] : e.status === unref(ChapterStatus).Unsubscribe) && "text-s-gray-500"], "align-bottom relative after:content-DEFAULT after:absolute after:left-16px after:right-16px after:top-full after:h-1px after:bg-outline-black-8"])
                            }, [withDirectives((openBlock(),
                            createBlock(_sfc_main$1b, {
                                href: null === (o = unref(n)) || void 0 === o ? void 0 : o.hrefMap.read(e.id, "chapter-list", e),
                                history: {
                                    cid: e.id
                                },
                                class: normalizeClass(["py-12px px-16px flex items-center justify-between active-10", [String(unref(c)) === String(e.id) && "!text-primary-red-500"]]),
                                onClick: _
                            }, {
                                default: withCtx((function() {
                                    var n;
                                    return [(openBlock(),
                                    createBlock(resolveDynamicComponent(unref(l)["chapter-list-item"]), {
                                        chapter: e
                                    }, null, 8, ["chapter"])), unref(l)["chapter-list-item"] ? createCommentVNode("", !0) : (openBlock(),
                                    createElementBlock(Fragment, {
                                        key: 0
                                    }, [createBaseVNode("span", _hoisted_14$5, toDisplayString(e.title), 1), 8 === (null === (n = unref(t)) || void 0 === n ? void 0 : n.checkLevel) ? (openBlock(),
                                    createElementBlock("span", _hoisted_15$4, toDisplayString(unref(a)("removed")), 1)) : (e.id in unref(i).unlockedHash ? unref(i).unlockedHash[e.id] : e.status !== unref(ChapterStatus).Unsubscribe) ? createCommentVNode("", !0) : (openBlock(),
                                    createElementBlock("span", _hoisted_16$4))], 64))]
                                }
                                )),
                                _: 2
                            }, 1032, ["href", "history", "class"])), [[unref(d), {
                                e: "chapter-list:chapter",
                                ctx: e
                            }]])], 10, _hoisted_13$8)
                        }
                        )), 128))])], 64)
                    }
                    )), 128))], 2)])), [[vShow, unref(r) && "chapter-list" === u.value], [unref(d), {
                        e: "chapter-list"
                    }, "e"]]), "bookmark-list" === u.value ? (openBlock(),
                    createBlock(resolveDynamicComponent(unref(l)["bookmark-list"]), {
                        key: 2
                    })) : createCommentVNode("", !0), (openBlock(),
                    createBlock(resolveDynamicComponent(unref(l)["chapter-list-bottom"]))), null !== (x = unref(o)) && void 0 !== x && null !== (y = x.chapterList) && void 0 !== y && y.active.data ? withDirectives((openBlock(),
                    createBlock(Button, {
                        key: 3,
                        href: (null === (b = unref(n)) || void 0 === b || null === (k = (w = b.hrefMap).download) || void 0 === k ? void 0 : k.call(w)) || (null === (E = unref(n)) || void 0 === E ? void 0 : E.downloadUrl),
                        tag: "a",
                        size: "large",
                        shape: "semicircle",
                        class: "left-16px right-16px bottom-12px absolute shadow-sd8",
                        onClick: f[6] || (f[6] = withModifiers((function(e) {
                            var t, o;
                            return null === (t = unref(n)) || void 0 === t || null === (o = t.onDownload) || void 0 === o ? void 0 : o.call(t, "chapter-list")
                        }
                        ), ["prevent"]))
                    }, {
                        default: withCtx((function() {
                            var e, t, n, r, i;
                            return [null !== (e = unref(o).chapterList) && void 0 !== e && null !== (t = e.icon) && void 0 !== t && t.data ? (openBlock(),
                            createElementBlock("img", {
                                key: 0,
                                class: "w-24px mr-8px",
                                src: unref(o).chapterList.icon.data
                            }, null, 8, _hoisted_17$4)) : createCommentVNode("", !0), createTextVNode(toDisplayString(null === (n = unref(o)) || void 0 === n || null === (r = n.chapterList) || void 0 === r || null === (i = r.title) || void 0 === i ? void 0 : i.data), 1)]
                        }
                        )),
                        _: 1
                    }, 8, ["href"])), [[unref(d), {
                        e: "chapter-list:app"
                    }]]) : createCommentVNode("", !0), renderSlot(e.$slots, "default", {}, void 0, !0)])], 512), [[vShow, unref(i).isChapterListOpen]])]
                }
                )),
                _: 3
            })], 64)
        }
    }
})
  , MobileChapterList = _export_sfc(_sfc_main$L, [["__scopeId", "data-v-fcab4c88"]])
  , _sfc_main$K = defineComponent({
    __name: "LoginGuideDialog",
    setup: function(e) {
        var t = inject(FRONT_CONFIG_STATE_KEY)
          , n = inject(READER_STATE_KEY, defaultReaderState)
          , o = inject(I18N_IO_FUNC_KEY)
          , r = inject(ADAPTERS_KEY)
          , i = inject(BUS_STATE_KEY)
          , a = useSharedTrack().directive;
        function s() {
            var e;
            i.emit("login-guide:login"),
            null === (e = r.processLogin) || void 0 === e || e.call(r)
        }
        function l() {
            var e, n;
            i.emit("login-guide:download"),
            null == t || null === (e = t.value) || void 0 === e || null === (n = e.onDownload) || void 0 === n || n.call(e, "guide-dialog")
        }
        return function(e, t) {
            return withDirectives((openBlock(),
            createBlock(_sfc_main$1l, {
                modelValue: unref(n).isLoginGuideOpen,
                "onUpdate:modelValue": t[0] || (t[0] = function(e) {
                    return unref(n).isLoginGuideOpen = e
                }
                ),
                title: unref(o)("login_guide_title"),
                "cancel-text": unref(o)("login_guide_login"),
                "confirm-text": unref(o)("login_guide_download"),
                onCancel: s,
                onConfirm: l
            }, {
                default: withCtx((function() {
                    return [createTextVNode(toDisplayString(unref(o)("login_guide_desc")), 1)]
                }
                )),
                _: 1
            }, 8, ["modelValue", "title", "cancel-text", "confirm-text"])), [[unref(a), {
                e: "login-guide"
            }, "e"]])
        }
    }
})
  , _sfc_main$J = defineComponent({
    __name: "NavButton",
    props: {
        active: {
            type: Boolean,
            default: !1
        },
        icon: null
    },
    setup: function(e) {
        return function(t, n) {
            return openBlock(),
            createElementBlock("button", {
                class: normalizeClass(["flex flex-col items-center justify-center w-90px h-64px text-24px active-a60", [e.active ? "text-primary-red-500" : "text-s-gray-900"]])
            }, [createBaseVNode("span", {
                class: normalizeClass("icon-".concat(e.icon))
            }, null, 2), renderSlot(t.$slots, "icon"), createBaseVNode("span", {
                class: normalizeClass(["mt-2px text-l", [e.active ? "text-primary-red-500" : "text-s-gray-500"]])
            }, [renderSlot(t.$slots, "default")], 2)], 2)
        }
    }
})
  , _hoisted_1$A = {
    class: "px-16px overflow-hidden"
}
  , _sfc_main$I = defineComponent({
    __name: "Settings",
    setup: function(e) {
        var t = inject(FRONT_CONFIG_STATE_KEY);
        return function(e, n) {
            return openBlock(),
            createElementBlock("div", _hoisted_1$A, [unref(t).hideFontsSetting ? createCommentVNode("", !0) : (openBlock(),
            createBlock(_sfc_main$12, {
                key: 0,
                class: "pt-18px"
            })), createVNode(_sfc_main$11, {
                class: "mt-20px"
            }), createVNode(_sfc_main$13, {
                class: "mt-20px pb-10px"
            })])
        }
    }
})
  , Settings = _export_sfc(_sfc_main$I, [["__scopeId", "data-v-0efe9778"]])
  , _hoisted_1$z = {
    class: "overflow-hidden"
}
  , _hoisted_2$u = {
    class: "p-16px pb-8px flex"
}
  , _hoisted_3$l = ["href"]
  , _hoisted_4$k = createBaseVNode("span", {
    class: "icon-check text-20px mr-4px"
}, null, -1)
  , _hoisted_5$h = createBaseVNode("span", {
    class: "icon-plus text-20px mr-4px"
}, null, -1)
  , _hoisted_6$g = ["href"]
  , _sfc_main$H = defineComponent({
    __name: "Progress",
    setup: function(e) {
        var t = inject(FRONT_CONFIG_STATE_KEY)
          , n = inject(READER_STATE_KEY, defaultReaderState)
          , o = inject(USER_STATE_KEY)
          , r = inject(I18N_IO_FUNC_KEY)
          , i = inject(ADAPTERS_KEY)
          , a = useSharedShelf().add
          , s = useSharedTrack().directive
          , l = useCurrentChapter();
        function c() {
            var e, t;
            null != o && null !== (e = o.value) && void 0 !== e && e.id ? a() : null === (t = i.processLogin) || void 0 === t || t.call(i)
        }
        return function(e, o) {
            var i, a, u, d, f, p, h, m, _, v, g, x, y, b, k, w;
            return openBlock(),
            createElementBlock("div", _hoisted_1$z, [createBaseVNode("div", _hoisted_2$u, [null !== (i = unref(l)) && void 0 !== i && null !== (a = i.prev) && void 0 !== a && a.id ? withDirectives((openBlock(),
            createBlock(_sfc_main$1b, {
                key: 0,
                class: "flex-1 mr-8px",
                href: null === (u = unref(t)) || void 0 === u ? void 0 : u.hrefMap.read(null === (d = unref(l).prev) || void 0 === d ? void 0 : d.id, "prev-chap", unref(l)),
                history: {
                    cid: null === (f = unref(l).prev) || void 0 === f ? void 0 : f.id
                }
            }, {
                default: withCtx((function() {
                    var e;
                    return [createVNode(Button, {
                        type: "secondary-g",
                        size: "large",
                        class: "w-full !px-0",
                        disabled: !(null !== (e = unref(l).prev) && void 0 !== e && e.id),
                        onClick: o[0] || (o[0] = function(e) {
                            return unref(n).isPanelOpen = !1
                        }
                        )
                    }, {
                        default: withCtx((function() {
                            return [createTextVNode(toDisplayString(unref(r)("prev_chap")), 1)]
                        }
                        )),
                        _: 1
                    }, 8, ["disabled"])]
                }
                )),
                _: 1
            }, 8, ["href", "history"])), [[unref(s), {
                e: "toolbar:prev-chap"
            }, "c"]]) : createCommentVNode("", !0), null !== (p = unref(t)) && void 0 !== p && p.hrefMap.shelf ? (openBlock(),
            createElementBlock(Fragment, {
                key: 1
            }, [unref(n).isInShelf ? withDirectives((openBlock(),
            createElementBlock("a", {
                key: 0,
                href: null === (h = unref(t)) || void 0 === h || null === (m = (_ = h.hrefMap).shelf) || void 0 === m ? void 0 : m.call(_),
                class: "flex-1"
            }, [createVNode(Button, {
                type: "secondary-g",
                size: "large",
                disabled: !0,
                class: "w-full !p-0 pointer-events-none"
            }, {
                default: withCtx((function() {
                    return [_hoisted_4$k, createTextVNode(toDisplayString(unref(r)("m_menu_in_shelf")), 1)]
                }
                )),
                _: 1
            })], 8, _hoisted_3$l)), [[unref(s), {
                e: "toolbar:to-shelf"
            }, "c"]]) : (openBlock(),
            createBlock(Button, {
                key: 1,
                type: "secondary-g",
                size: "large",
                class: "flex-1 !p-0",
                onClick: c
            }, {
                default: withCtx((function() {
                    return [_hoisted_5$h, createTextVNode(toDisplayString(unref(r)("m_menu_add_to_shelf")), 1)]
                }
                )),
                _: 1
            }))], 64)) : createCommentVNode("", !0), null !== (v = unref(l)) && void 0 !== v && null !== (g = v.next) && void 0 !== g && g.id ? withDirectives((openBlock(),
            createBlock(_sfc_main$1b, {
                key: 2,
                class: "flex-1 ml-8px",
                href: null === (x = unref(t)) || void 0 === x ? void 0 : x.hrefMap.read(unref(l).next.id, "next-chap", unref(l)),
                history: {
                    cid: unref(l).next.id
                }
            }, {
                default: withCtx((function() {
                    return [createVNode(Button, {
                        type: "secondary-g",
                        size: "large",
                        class: "w-full",
                        onClick: o[1] || (o[1] = function(e) {
                            return unref(n).isPanelOpen = !1
                        }
                        )
                    }, {
                        default: withCtx((function() {
                            return [createTextVNode(toDisplayString(unref(r)("next_chap")), 1)]
                        }
                        )),
                        _: 1
                    })]
                }
                )),
                _: 1
            }, 8, ["href", "history"])), [[unref(s), {
                e: "toolbar:next-chap"
            }, "c"]]) : null !== (y = unref(t)) && void 0 !== y && y.hrefMap.end ? (openBlock(),
            createElementBlock("a", {
                key: 3,
                href: null === (b = unref(t)) || void 0 === b || null === (k = (w = b.hrefMap).end) || void 0 === k ? void 0 : k.call(w),
                class: "flex-1 ml-8px"
            }, [createVNode(Button, {
                type: "secondary-g",
                size: "large",
                class: "w-full"
            }, {
                default: withCtx((function() {
                    return [createTextVNode(toDisplayString(unref(r)("end_page")), 1)]
                }
                )),
                _: 1
            })], 8, _hoisted_6$g)) : createCommentVNode("", !0)])])
        }
    }
})
  , _hoisted_1$y = {
    class: "flex justify-between"
}
  , _sfc_main$G = defineComponent({
    __name: "BottomBar",
    props: {
        fixed: {
            type: Boolean,
            default: !0
        }
    },
    setup: function(e) {
        var t = inject(READER_STATE_KEY, defaultReaderState)
          , n = inject(FRONT_CONFIG_STATE_KEY)
          , o = inject(CONFIG_STATE_KEY)
          , r = inject(I18N_IO_FUNC_KEY)
          , i = useTheme().toggleDark
          , a = useSharedTrack().directive
          , s = toRef(t.settings, "theme");
        function l() {
            t.isSettingsOpen = !1,
            t.isChapterListOpen = !t.isChapterListOpen
        }
        function c() {
            t.isChapterListOpen = !1,
            t.isSettingsOpen = !t.isSettingsOpen
        }
        return function(u, d) {
            var f, p, h;
            return openBlock(),
            createElementBlock("section", {
                class: normalizeClass(["pb-$sai-bottom bg-sheet-b-gray-50 w-full z-4 after:absolute after:h-[0.5px] after:bg-outline-black-8 after:content-DEFAULT after:top-0 after:left-0 after:right-0", {
                    relative: !e.fixed
                }]),
                onTouchmove: d[2] || (d[2] = withModifiers((function() {}
                ), ["prevent", "stop"]))
            }, [createBaseVNode("div", {
                class: normalizeClass(["bg-inherit", [!e.fixed && "absolute bottom-full left-0 right-0"]])
            }, [createVNode(Transition, {
                name: "stretch-settings"
            }, {
                default: withCtx((function() {
                    return [unref(t).isSettingsOpen ? (openBlock(),
                    createBlock(Settings, {
                        key: 0
                    })) : createCommentVNode("", !0)]
                }
                )),
                _: 1
            }), createVNode(Transition, {
                name: "stretch-progress"
            }, {
                default: withCtx((function() {
                    return [!(!e.fixed && unref(t).isPanelOpen || e.fixed) || unref(t).isSettingsOpen || unref(t).isChapterListOpen ? createCommentVNode("", !0) : (openBlock(),
                    createBlock(_sfc_main$H, {
                        key: 0
                    }))]
                }
                )),
                _: 1
            })], 2), withDirectives((openBlock(),
            createElementBlock("div", _hoisted_1$y, [withDirectives((openBlock(),
            createBlock(_sfc_main$J, {
                active: unref(t).isChapterListOpen,
                icon: unref(t).isChapterListOpen ? "list-bold" : "list",
                onClick: l
            }, {
                default: withCtx((function() {
                    return [createTextVNode(toDisplayString(unref(r)("chapter_list")), 1)]
                }
                )),
                _: 1
            }, 8, ["active", "icon"])), [[unref(a), {
                e: "toolbar:chapter-list"
            }, "c"]]), withDirectives((openBlock(),
            createBlock(_sfc_main$J, {
                icon: "dark" === unref(s) ? "light" : "dark",
                onClick: d[0] || (d[0] = function(e) {
                    return unref(i)()
                }
                )
            }, {
                default: withCtx((function() {
                    return [createTextVNode(toDisplayString("dark" === unref(s) ? unref(r)("light") : unref(r)("dark")), 1)]
                }
                )),
                _: 1
            }, 8, ["icon"])), [[unref(a), function() {
                return {
                    e: "toolbar:dark",
                    ctx: unref(s)
                }
            }
            , "c"]]), null !== (f = unref(n)) && void 0 !== f && f.hideSettings ? createCommentVNode("", !0) : withDirectives((openBlock(),
            createBlock(_sfc_main$J, {
                key: 0,
                active: unref(t).isSettingsOpen,
                icon: unref(t).isSettingsOpen ? "setting-bold" : "setting",
                onClick: c
            }, {
                default: withCtx((function() {
                    return [createTextVNode(toDisplayString(unref(r)("settings")), 1)]
                }
                )),
                _: 1
            }, 8, ["active", "icon"])), [[unref(a), {
                e: "toolbar:setting"
            }, "c"]]), null !== (p = unref(o)) && void 0 !== p && null !== (h = p.audioBook) && void 0 !== h && h.visible.data ? (openBlock(),
            createBlock(_sfc_main$J, {
                key: 1,
                icon: "audio",
                onClick: d[1] || (d[1] = function(e) {
                    var t, o;
                    return null === (t = unref(n)) || void 0 === t || null === (o = t.onDownload) || void 0 === o ? void 0 : o.call(t, "audio-book")
                }
                )
            }, {
                default: withCtx((function() {
                    return [createTextVNode(toDisplayString(unref(r)("audio_book")), 1)]
                }
                )),
                _: 1
            })) : createCommentVNode("", !0)])), [[unref(a), {
                e: "toolbar"
            }, "e"]])], 34)
        }
    }
})
  , BottomBar = _export_sfc(_sfc_main$G, [["__scopeId", "data-v-b60f8c66"]])
  , _sfc_main$F = defineComponent({
    __name: "FloatBottomBar",
    setup: function(e) {
        var t = inject(READER_STATE_KEY);
        return function(e, n) {
            return openBlock(),
            createBlock(Transition, {
                name: "reader-bottom-slide"
            }, {
                default: withCtx((function() {
                    return [unref(t).isPanelOpen ? (openBlock(),
                    createBlock(BottomBar, {
                        key: 0,
                        class: "fixed bottom-0"
                    })) : createCommentVNode("", !0)]
                }
                )),
                _: 1
            })
        }
    }
})
  , FloatBottomBar = _export_sfc(_sfc_main$F, [["__scopeId", "data-v-9eab85f5"]])
  , _hoisted_1$x = ["onClickCapture"]
  , _sfc_main$E = defineComponent({
    __name: "FloatLayer",
    setup: function(e) {
        var t = inject(READER_STATE_KEY, defaultReaderState)
          , n = toRefs(t)
          , o = n.isChapterListOpen
          , r = n.isPanelOpen
          , i = n.isSettingsOpen
          , a = 0;
        function s() {
            Date.now() - a < 400 || (o.value = !1,
            r.value = !1)
        }
        return watch(r, (function(e) {
            e && (a = Date.now())
        }
        )),
        watch(r, (function() {
            i.value = !1
        }
        )),
        function(e, t) {
            return openBlock(),
            createElementBlock(Fragment, null, [unref(r) ? (openBlock(),
            createElementBlock("div", {
                key: 0,
                class: "fixed inset-0 z-1",
                onClickCapture: withModifiers(s, ["self"]),
                onTouchmove: t[0] || (t[0] = withModifiers((function() {}
                ), ["prevent"]))
            }, null, 40, _hoisted_1$x)) : createCommentVNode("", !0), renderSlot(e.$slots, "default")], 64)
        }
    }
})
  , _hoisted_1$w = ["data-width"]
  , _sfc_main$D = defineComponent({
    __name: "end",
    setup: function(e) {
        var t = inject(BOOK_STATE_KEY)
          , n = inject(READER_STATE_KEY, defaultReaderState)
          , o = inject(CONFIG_STATE_KEY)
          , r = inject(ADAPTERS_KEY);
        n.isChapterLoading = !1;
        var i = ref()
          , a = ref()
          , s = ref()
          , l = useSlots();
        provide(ROOT_SLOTS_KEY, l);
        var c = useSharedScroll().destroy;
        return useDeviceSize(),
        useSettingsInit(),
        useSidePositionUpdater(i, a, s),
        "desktop" === n.deviceType && useGuide(),
        onMounted((function() {
            var e;
            (null == t || !t.value) && (null === (e = r.processBookInfo) || void 0 === e || e.call(r).then((function(e) {
                t.value = e
            }
            )))
        }
        )),
        watch(t, (function(e) {
            e && 8 === e.checkLevel && (n.isDisableAction = !0)
        }
        ), {
            immediate: !0
        }),
        onUnmounted((function() {
            c()
        }
        )),
        function(e, t) {
            var r, c;
            return openBlock(),
            createElementBlock("div", {
                id: "reader",
                class: "reader bg-b-gray-100 <sm:bg-b-gray-50 noise-bg min-h-full !<sm:bg-none",
                "data-width": "desktop" === unref(n).deviceType ? "resp" : "",
                style: normalizeStyle("auto" !== unref(n).settings.pageWidth ? "--width:".concat(unref(n).settings.pageWidth, "px;") : "")
            }, ["desktop" === unref(n).deviceType ? (openBlock(),
            createBlock(unref(ClientOnly), {
                key: 0
            }, {
                default: withCtx((function() {
                    return [createBaseVNode("div", {
                        id: "left-container",
                        ref_key: "$left",
                        ref: i,
                        class: "h-100vh fixed top-0 z-2 transition-transform flex flex-col-reverse pb-146px duration-300"
                    }, [(openBlock(),
                    createBlock(resolveDynamicComponent(unref(l)["content-left"])))], 512)]
                }
                )),
                _: 1
            })) : createCommentVNode("", !0), createBaseVNode("div", {
                id: "reader-content",
                ref_key: "$center",
                ref: a,
                class: "bg-b-gray-50 relative mx-auto pb-$sai-bottom w-$width noise-bg !<sm:bg-none"
            }, ["desktop" === unref(n).deviceType ? (openBlock(),
            createElementBlock(Fragment, {
                key: 0
            }, [createVNode(_sfc_main$V, {
                class: "noise-bg"
            }, {
                default: withCtx((function() {
                    return [(openBlock(),
                    createBlock(resolveDynamicComponent(unref(l)["nav-bar"]))), unref(l)["nav-bar"] ? createCommentVNode("", !0) : (openBlock(),
                    createBlock(_sfc_main$W, {
                        key: 0
                    }))]
                }
                )),
                _: 1
            }), withDirectives(createVNode(_sfc_main$1i, null, null, 512), [[vShow, null === (r = unref(o)) || void 0 === r || null === (c = r.breadcrumbs) || void 0 === c ? void 0 : c.visible.data]])], 64)) : createCommentVNode("", !0), createVNode(End, null, createSlots({
                default: withCtx((function() {
                    return [renderSlot(e.$slots, "end-content")]
                }
                )),
                _: 2
            }, ["mobile" === unref(n).deviceType ? {
                name: "end-nav",
                fn: withCtx((function() {
                    return [renderSlot(e.$slots, "mobile-end-nav")]
                }
                )),
                key: "0"
            } : void 0]), 1024), "mobile" === unref(n).deviceType ? (openBlock(),
            createBlock(_sfc_main$E, {
                key: 1
            }, {
                default: withCtx((function() {
                    return [createVNode(FloatBottomBar, null, createSlots({
                        _: 2
                    }, [unref(l)["mobile-bottom-bar-more"] ? {
                        name: "more",
                        fn: withCtx((function() {
                            return [renderSlot(e.$slots, "mobile-bottom-bar-more")]
                        }
                        )),
                        key: "0"
                    } : void 0]), 1024), createVNode(unref(ClientOnly), null, {
                        default: withCtx((function() {
                            return [createVNode(MobileChapterList, null, createSlots({
                                "bookmark-list": withCtx((function() {
                                    return [renderSlot(e.$slots, "bookmark-list")]
                                }
                                )),
                                default: withCtx((function() {
                                    return [renderSlot(e.$slots, "chapter-list")]
                                }
                                )),
                                _: 2
                            }, [unref(l)["chapter-list-item"] ? {
                                name: "item",
                                fn: withCtx((function(t) {
                                    var n = t.chapter;
                                    return [renderSlot(e.$slots, "chapter-list-item", {
                                        chapter: n
                                    })]
                                }
                                )),
                                key: "0"
                            } : void 0]), 1024)]
                        }
                        )),
                        _: 3
                    })]
                }
                )),
                _: 3
            })) : (openBlock(),
            createBlock(unref(ClientOnly), {
                key: 2
            }, {
                default: withCtx((function() {
                    return [createBaseVNode("div", {
                        id: "right-container",
                        ref_key: "$right",
                        ref: s,
                        class: "h-100vh fixed top-0 flex items-end z-2 transition-transform duration-300"
                    }, [createVNode(_sfc_main$_)], 512)]
                }
                )),
                _: 1
            }))], 512), "desktop" === unref(n).deviceType ? (openBlock(),
            createBlock(unref(ClientOnly), {
                key: 1
            }, {
                default: withCtx((function() {
                    return [createVNode(DesktopChapterList, null, createSlots({
                        "bookmark-list": withCtx((function() {
                            return [renderSlot(e.$slots, "bookmark-list")]
                        }
                        )),
                        _: 2
                    }, [unref(l)["chapter-list-item"] ? {
                        name: "item",
                        fn: withCtx((function(t) {
                            var n = t.chapter;
                            return [renderSlot(e.$slots, "chapter-list-item", {
                                chapter: n
                            })]
                        }
                        )),
                        key: "0"
                    } : void 0]), 1024)]
                }
                )),
                _: 3
            })) : createCommentVNode("", !0), createVNode(_sfc_main$K), createVNode(_sfc_main$Z), renderSlot(e.$slots, "default")], 12, _hoisted_1$w)
        }
    }
});
function useBookmark() {
    var e = inject(I18N_IO_FUNC_KEY)
      , t = inject(ADAPTERS_KEY)
      , n = inject(USER_STATE_KEY)
      , o = !1;
    return {
        toggleMark: function(r) {
            var i, a;
            if (null === (i = n.value) || void 0 === i || !i.id)
                return null === (a = t.processLogin) || void 0 === a ? void 0 : a.call(t);
            if (!o)
                if (o = !0,
                r.mark) {
                    var s;
                    null === (s = t.processRemoveBookmark) || void 0 === s || s.call(t, r.id).then((function() {
                        o = !1,
                        r.mark = !1,
                        useToast({
                            title: e("bookmark_has_been_removed")
                        })
                    }
                    )).catch((function(t) {
                        o = !1,
                        handleError(t, e("bookmark_remove_failed"))
                    }
                    ))
                } else {
                    var l;
                    null === (l = t.processAddBookmark) || void 0 === l || l.call(t, r).then((function() {
                        o = !1,
                        r.mark = !0,
                        useToast({
                            title: e("bookmark_added")
                        })
                    }
                    )).catch((function(t) {
                        o = !1,
                        handleError(t, e("bookmark_add_failed"))
                    }
                    ))
                }
        }
    }
}
function transToHtml(e) {
    return /^<p>/.test(e) ? e : e.trim().replace(/\r\n/g, "\n").replace(/(\n[\r|\s|\t|　]*)+/g, "\n").split("\n").map((function(e) {
        return '<p class="trans">'.concat(e, "</p>")
    }
    )).join("")
}
var _hoisted_1$l = {
    key: 0,
    id: "r-authorSay",
    class: "bg-on-image-s-black-4 rounded-8px py-12px px-32px py-24px mx-64px mb-64px <sm:mx-20px <sm:mb-48px <sm:px-12px"
}
  , _hoisted_2$k = {
    class: "inline-flex text-secondary-blue-500 text-c12 items-center h-24px mr-auto",
    target: "_blank"
}
  , _hoisted_3$f = ["src", "alt"]
  , _hoisted_4$e = ["innerHTML"]
  , _hoisted_5$d = {
    class: "mt-12px pt-12px flex items-center justify-between font-medium text-s3 text-s-gray-900 border-t border-outline-black-8 sm:mt-16px sm:pt-16px"
}
  , _sfc_main$o = defineComponent({
    __name: "AuthorSay",
    props: {
        chapter: null
    },
    setup: function(e) {
        var t = e
          , n = inject(FRONT_CONFIG_STATE_KEY)
          , o = inject(CONFIG_STATE_KEY)
          , r = inject(BOOK_STATE_KEY)
          , i = inject(READER_STATE_KEY, defaultReaderState)
          , a = inject(BUS_STATE_KEY)
          , s = inject(I18N_IO_FUNC_KEY)
          , l = ref(!1)
          , c = useSharedTrack().directive;
        function u(e) {
            var t;
            i.deviceType === PlatformType.PC ? (e.preventDefault(),
            l.value = !0) : null !== (t = n.value) && void 0 !== t && t.onDownload && (e.preventDefault(),
            n.value.onDownload("author-say"))
        }
        return watch(l, (function(e) {
            var n = "author-say:guide:toggle";
            a.emit(n, {
                e: n,
                ctx: {
                    visible: e,
                    chapter: t.chapter
                }
            })
        }
        )),
        function(t, a) {
            var d, f, p, h, m, _, v, g, x;
            return openBlock(),
            createElementBlock(Fragment, null, [unref(r) && e.chapter.auth ? withDirectives((openBlock(),
            createElementBlock("section", _hoisted_1$l, [createBaseVNode("span", _hoisted_2$k, [unref(r).authorAvatar ? (openBlock(),
            createElementBlock("img", {
                key: 0,
                class: "rounded-1 border border-outline-black-8 w-24px h-24px mr-8px",
                src: unref(r).authorAvatar,
                alt: unref(r).authorName,
                load: "lazy"
            }, null, 8, _hoisted_3$f)) : createCommentVNode("", !0), createTextVNode(toDisplayString(unref(s)("author_say", unref(r).authorName)), 1)]), e.chapter.authorSay ? (openBlock(),
            createElementBlock("div", {
                key: 0,
                class: "text-bo4 text-s-gray-900 mt-4px",
                innerHTML: unref(transToHtml)(e.chapter.authorSay)
            }, null, 8, _hoisted_4$e)) : createCommentVNode("", !0), withDirectives(createBaseVNode("div", _hoisted_5$d, [createTextVNode(toDisplayString(unref(s)("support_author", null === (d = unref(o)) || void 0 === d || null === (f = d.brand) || void 0 === f || null === (p = f.name) || void 0 === p ? void 0 : p.data)) + " ", 1), createVNode(Button, {
                tag: "a",
                href: (null === (h = unref(n)) || void 0 === h || null === (m = (_ = h.hrefMap).download) || void 0 === m ? void 0 : m.call(_)) || (null === (v = unref(n)) || void 0 === v ? void 0 : v.downloadUrl),
                type: "tertiary-r",
                onClick: withModifiers(u, ["stop"])
            }, {
                default: withCtx((function() {
                    return [createTextVNode(toDisplayString(unref(s)("author_say_download")), 1)]
                }
                )),
                _: 1
            }, 8, ["href", "onClick"])], 512), [[vShow, null === (g = unref(o)) || void 0 === g || null === (x = g.authorSay) || void 0 === x ? void 0 : x.downloadVisible.data]])])), [[unref(c), {
                e: "author-say"
            }, "e"]]) : createCommentVNode("", !0), unref(i).deviceType === unref(PlatformType).PC ? (openBlock(),
            createBlock(unref(ClientOnly), {
                key: 1
            }, {
                default: withCtx((function() {
                    return [(openBlock(),
                    createBlock(Teleport, {
                        to: "body"
                    }, [createVNode(Transition, {
                        name: "slide-vertical"
                    }, {
                        default: withCtx((function() {
                            return [l.value ? (openBlock(),
                            createElementBlock("div", {
                                key: 0,
                                class: "fixed inset-0 z-2 flex justify-center items-center",
                                onClick: a[1] || (a[1] = withModifiers((function(e) {
                                    return l.value = !1
                                }
                                ), ["self"]))
                            }, [createVNode(_sfc_main$16, {
                                onClose: a[0] || (a[0] = function(e) {
                                    return l.value = !1
                                }
                                )
                            })])) : createCommentVNode("", !0)]
                        }
                        )),
                        _: 1
                    })]))]
                }
                )),
                _: 1
            })) : createCommentVNode("", !0)], 64)
        }
    }
})
  , _hoisted_1$k = {
    class: "px-16px mt-22px reader-scrollbar overflow-auto pb-32px overscroll-contain"
}
  , _hoisted_2$j = {
    key: 0
}
  , _hoisted_3$e = {
    key: 2
}
  , _hoisted_4$d = {
    class: "border-b border-outline-black-8 py-16px"
}
  , _hoisted_5$c = {
    class: "flex items-center pr-36px"
}
  , _hoisted_6$c = {
    class: "text-rh6 font-medium flex-1 text-s-gray-900 truncate"
}
  , _hoisted_7$b = {
    key: 0,
    class: "text-bo4 text-s-gray-500"
}
  , _hoisted_8$b = {
    key: 0,
    class: "mt-8px text-16px leading-28px"
}
  , _hoisted_9$c = ["onClick"]
  , _hoisted_10$a = createBaseVNode("span", {
    class: "icon-trash text-s-gray-500 text-20px"
}, null, -1)
  , _hoisted_11$9 = [_hoisted_10$a]
  , _sfc_main$n = defineComponent({
    __name: "BookmarkList",
    setup: function(e) {
        var t = inject(USER_STATE_KEY)
          , n = inject(I18N_IO_FUNC_KEY)
          , o = inject(FRONT_CONFIG_STATE_KEY)
          , r = inject(BOOKMARK_LIST_STATE_KEY)
          , i = inject(CHAPTERS_STATE_KEY)
          , a = inject(READER_STATE_KEY, defaultReaderState)
          , s = inject(ADAPTERS_KEY)
          , l = useSharedTrack().directive
          , c = !1;
        function u() {
            var e;
            if (null != t && null !== (e = t.value) && void 0 !== e && e.id) {
                var o, i = useToast({
                    title: n("loading"),
                    type: "loading"
                });
                null === (o = s.processBookmarkList) || void 0 === o || o.call(s).then((function(e) {
                    r.value = e,
                    i.stop()
                }
                )).catch((function(e) {
                    i.stop(),
                    handleError(e, n("bookmark_load_failed"))
                }
                ))
            }
        }
        function d() {
            var e, t;
            null === (e = s.processLogin) || void 0 === e || null === (t = e.call(s)) || void 0 === t || t.then(u)
        }
        return u(),
        function(e, u) {
            var f;
            return withDirectives((openBlock(),
            createElementBlock("section", _hoisted_1$k, [null !== (f = unref(t)) && void 0 !== f && f.id ? unref(r) && 0 === unref(r).length ? (openBlock(),
            createBlock(_sfc_main$1j, {
                key: 1,
                title: unref(n)("empty_bookmarks")
            }, null, 8, ["title"])) : (openBlock(),
            createElementBlock("ul", _hoisted_3$e, [(openBlock(!0),
            createElementBlock(Fragment, null, renderList(unref(r), (function(e, t) {
                var d;
                return openBlock(),
                createElementBlock("li", {
                    key: e.id,
                    class: "relative"
                }, [createVNode(_sfc_main$1b, {
                    class: "hover-4 active-8 px-16px rounded-8px block relative",
                    href: null === (d = unref(o)) || void 0 === d ? void 0 : d.hrefMap.read(e.chapterId, "bookmark", e),
                    history: {
                        cid: e.chapterId
                    },
                    onClick: u[0] || (u[0] = function(e) {
                        return unref(a).isChapterListOpen = !1
                    }
                    )
                }, {
                    default: withCtx((function() {
                        return [createBaseVNode("div", _hoisted_4$d, [createBaseVNode("div", _hoisted_5$c, [createBaseVNode("span", _hoisted_6$c, toDisplayString(e.title), 1), e.time ? (openBlock(),
                        createElementBlock("span", _hoisted_7$b, toDisplayString("string" == typeof e.time ? e.time : unref(formatDateNumber2)(e.time)) + toDisplayString(e.extraInfo), 1)) : createCommentVNode("", !0)]), e.content ? (openBlock(),
                        createElementBlock("p", _hoisted_8$b, toDisplayString(e.content), 1)) : createCommentVNode("", !0)])]
                    }
                    )),
                    _: 2
                }, 1032, ["href", "history"]), withDirectives((openBlock(),
                createElementBlock("button", {
                    class: "ml-16px flex absolute right-16px top-19px",
                    onClick: withModifiers((function(o) {
                        return function(e, t) {
                            var o;
                            c || (c = !0,
                            null === (o = s.processRemoveBookmark) || void 0 === o || o.call(s, e).then((function() {
                                var o;
                                c = !1,
                                useToast({
                                    title: n("bookmark_has_been_removed")
                                }),
                                null == r || r.value.splice(t, 1);
                                for (var s = 0; s < i.value.length; s++)
                                    if (i.value[s].id === e) {
                                        i.value[s].mark = !1;
                                        break
                                    }
                                null !== (o = a.chapterHash[e]) && void 0 !== o && o.mark && (a.chapterHash[e].mark = !1)
                            }
                            )).catch((function(e) {
                                c = !1,
                                handleError(e, n("load_failed"))
                            }
                            )))
                        }(e.chapterId, t)
                    }
                    ), ["stop"])
                }, _hoisted_11$9, 8, _hoisted_9$c)), [[unref(l), {
                    e: "bookmark-list:remove"
                }, "c"]])])
            }
            )), 128))])) : (openBlock(),
            createElementBlock("div", _hoisted_2$j, [createVNode(_sfc_main$1j, {
                title: unref(n)("check_bookmark_after_login")
            }, {
                default: withCtx((function() {
                    return [withDirectives((openBlock(),
                    createBlock(Button, {
                        class: "mt-20px w-100px",
                        onClick: d
                    }, {
                        default: withCtx((function() {
                            return [createTextVNode(toDisplayString(unref(n)("login")), 1)]
                        }
                        )),
                        _: 1
                    })), [[unref(l), {
                        e: "bookmark-list:login"
                    }, "c"]])]
                }
                )),
                _: 1
            }, 8, ["title"])]))])), [[unref(l), {
                e: "bookmark-list"
            }, "e"]])
        }
    }
})
  , _hoisted_1$j = {
    class: "overflow-auto pb-32px overscroll-contain"
}
  , _hoisted_2$i = {
    key: 0
}
  , _hoisted_3$d = {
    key: 2
}
  , _hoisted_4$c = {
    class: "flex items-center"
}
  , _hoisted_5$b = {
    class: "text-s1 font-medium flex-1 text-s-gray-900 truncate mr-36px"
}
  , _hoisted_6$b = {
    key: 0,
    class: "mt-8px text-bo4 truncate"
}
  , _hoisted_7$a = {
    key: 1,
    class: "text-bo4 text-s-gray-500 mt-8px"
}
  , _hoisted_8$a = ["onClick"]
  , _hoisted_9$b = createBaseVNode("span", {
    class: "icon-trash text-s-gray-500 text-20px"
}, null, -1)
  , _hoisted_10$9 = [_hoisted_9$b]
  , _sfc_main$m = defineComponent({
    __name: "BookmarkList",
    setup: function(e) {
        var t = inject(USER_STATE_KEY)
          , n = inject(I18N_IO_FUNC_KEY)
          , o = inject(FRONT_CONFIG_STATE_KEY)
          , r = inject(BOOKMARK_LIST_STATE_KEY)
          , i = inject(READER_STATE_KEY, defaultReaderState)
          , a = inject(ADAPTERS_KEY)
          , s = !1
          , l = useSharedTrack().directive;
        function c() {
            var e;
            if (null != t && null !== (e = t.value) && void 0 !== e && e.id) {
                var o, i = useToast({
                    title: n("loading"),
                    type: "loading"
                });
                null === (o = a.processBookmarkList) || void 0 === o || o.call(a).then((function(e) {
                    r.value = e,
                    i.stop()
                }
                )).catch((function(e) {
                    i.stop(),
                    handleError(e, n("bookmark_load_failed"))
                }
                ))
            }
        }
        function u() {
            var e, t;
            null === (e = a.processLogin) || void 0 === e || null === (t = e.call(a)) || void 0 === t || t.then(c)
        }
        function d() {
            i.isChapterListOpen = !1,
            i.isPanelOpen = !1
        }
        return c(),
        function(e, i) {
            var c;
            return withDirectives((openBlock(),
            createElementBlock("section", _hoisted_1$j, [null !== (c = unref(t)) && void 0 !== c && c.id ? unref(r) && 0 === unref(r).length ? (openBlock(),
            createBlock(_sfc_main$1j, {
                key: 1,
                title: unref(n)("empty_bookmarks")
            }, null, 8, ["title"])) : (openBlock(),
            createElementBlock("ul", _hoisted_3$d, [(openBlock(!0),
            createElementBlock(Fragment, null, renderList(unref(r), (function(e, t) {
                var i;
                return openBlock(),
                createElementBlock("li", {
                    key: e.id,
                    class: "relative"
                }, [createVNode(_sfc_main$1b, {
                    class: "py-16px mx-16px border-b border-outline-black-8 block",
                    href: null === (i = unref(o)) || void 0 === i ? void 0 : i.hrefMap.read(e.chapterId, "bookmark", e),
                    history: {
                        cid: e.chapterId
                    },
                    onClick: d
                }, {
                    default: withCtx((function() {
                        return [createBaseVNode("div", _hoisted_4$c, [createBaseVNode("span", _hoisted_5$b, toDisplayString(e.title), 1)]), e.content ? (openBlock(),
                        createElementBlock("p", _hoisted_6$b, toDisplayString(e.content), 1)) : createCommentVNode("", !0), e.time ? (openBlock(),
                        createElementBlock("div", _hoisted_7$a, toDisplayString("string" == typeof e.time ? e.time : unref(formatDateNumber2)(e.time)) + toDisplayString(e.extraInfo), 1)) : createCommentVNode("", !0)]
                    }
                    )),
                    _: 2
                }, 1032, ["href", "history"]), withDirectives((openBlock(),
                createElementBlock("button", {
                    class: "ml-16px flex absolute right-16px top-17px",
                    onClick: function(o) {
                        return function(e, t) {
                            var o;
                            s || (s = !0,
                            null === (o = a.processRemoveBookmark) || void 0 === o || o.call(a, e).then((function() {
                                s = !1,
                                useToast({
                                    title: n("bookmark_has_been_removed")
                                }),
                                null == r || r.value.splice(t, 1)
                            }
                            )).catch((function(e) {
                                s = !1,
                                handleError(e, n("load_failed"))
                            }
                            )))
                        }(e.chapterId, t)
                    }
                }, _hoisted_10$9, 8, _hoisted_8$a)), [[unref(l), {
                    e: "bookmark-list:remove"
                }, "c"]])])
            }
            )), 128))])) : (openBlock(),
            createElementBlock("div", _hoisted_2$i, [createVNode(_sfc_main$1j, {
                title: unref(n)("check_bookmark_after_login")
            }, {
                default: withCtx((function() {
                    return [withDirectives((openBlock(),
                    createBlock(Button, {
                        class: "mt-20px w-100px",
                        onClick: u
                    }, {
                        default: withCtx((function() {
                            return [createTextVNode(toDisplayString(unref(n)("login")), 1)]
                        }
                        )),
                        _: 1
                    })), [[unref(l), {
                        e: "bookmark-list:login"
                    }, "c"]])]
                }
                )),
                _: 1
            }, 8, ["title"])]))])), [[unref(l), {
                e: "bookmark-list"
            }, "e"]])
        }
    }
})
  , BookmarkList = defineComponent({
    setup: function() {
        var e = inject(READER_STATE_KEY, defaultReaderState);
        return function() {
            return h((null == e ? void 0 : e.deviceType) === PlatformType.Mobile ? _sfc_main$m : _sfc_main$n)
        }
    }
})
  , _sfc_main$k = {}
  , _hoisted_1$i = {
    width: "12",
    height: "8",
    viewBox: "0 0 12 8",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
}
  , _hoisted_2$h = createBaseVNode("path", {
    d: "M5.2 1.067L0 8h12L6.8 1.067a1 1 0 0 0-1.6 0z",
    fill: "currentColor"
}, null, -1)
  , _hoisted_3$c = [_hoisted_2$h];
function _sfc_render$2(e, t) {
    return openBlock(),
    createElementBlock("svg", _hoisted_1$i, _hoisted_3$c)
}
var Triangle = _export_sfc(_sfc_main$k, [["render", _sfc_render$2]]);
function createReviewCount(e, t, n, o) {
    return h("span", {
        class: "review",
        "data-type": t ? "hot" : null,
        "data-index": n
    }, [h("span", {
        class: "review-icon"
    }), h("span", {
        class: "review-count"
    }, [String(Math.min(e, 999))]), o && h(Triangle, {
        class: "review-hot-tri"
    })])
}
function createContentSpan(e, t, n) {
    return h("span", {
        class: "content-text",
        "data-count": t,
        "data-index": n
    }, e)
}
function createHotReview(e, t, n, o) {
    var r = []
      , i = /\[fn=(\d+)\]/;
    return e.split(/(\[fn=\d+\])/g).forEach((function(e) {
        var t = e.match(i);
        if (null != t && t[1]) {
            var n = t[1];
            r.push(h("i", {
                class: "icon-emoji w-22px h-22px icon-emoji-".concat(n)
            }))
        } else
            r.push(e)
    }
    )),
    h("div", {
        class: "review-content",
        "data-type": "content",
        "data-index": t
    }, [n && h("img", {
        src: n,
        alt: o
    }), h("span", {
        class: "hot-content"
    }, r)])
}
function useReview(e, t, n) {
    var o = ref(0)
      , r = inject(READER_STATE_KEY, defaultReaderState)
      , i = inject(BUS_STATE_KEY)
      , a = inject(ADAPTERS_KEY)
      , s = inject(I18N_IO_FUNC_KEY)
      , l = []
      , c = []
      , u = []
      , d = null
      , f = useStyleTag("").css
      , p = useSharedTrack()
      , m = p.observe
      , _ = p.unobserve;
    function v(t) {
        (function(t) {
            f.value = '.print[data-id="'.concat(e.value.id, '"].highlight .content-text[data-index="').concat(t, '"]{background:var(--on-image-surface-black-8);text-decoration:underline dashed;text-decoration-color:var(--surface-gray-300);}')
        }
        )(t),
        r.reviewContext = {
            chapterId: e.value.id,
            index: t
        },
        o.value = t,
        r.isSideSheetOpen = !0,
        i.emit("review:open", r.reviewContext)
    }
    function g(t) {
        t.stopPropagation();
        var n = t.currentTarget
          , o = Number(n.getAttribute("data-index"));
        if (r.isSideSheetOpen && r.reviewContext.chapterId === e.value.id && r.reviewContext.index === o)
            r.isSideSheetOpen = !1;
        else if (n && !r.settings.disableReview) {
            if ("content" === n.getAttribute("data-type")) {
                var a = "review:hot:click";
                i.emit(a, {
                    e: a,
                    event: t
                })
            }
            v(o)
        }
    }
    function x() {
        a.processReviewCount && e.value.id && e.value.auth && (d = e.value.id,
        a.processReviewCount(e.value.id).then(b))
    }
    function y() {
        [].concat(_toConsumableArray(u), _toConsumableArray(c), _toConsumableArray(l)).forEach((function(e) {
            return e.removeEventListener("click", g)
        }
        )),
        u.forEach((function(e) {
            var t;
            null === (t = e.parentNode) || void 0 === t || t.removeChild(e),
            _(e)
        }
        )),
        l = [],
        u = [],
        c = []
    }
    function b(o) {
        var i, a;
        if (o && (null === (i = n.value) || void 0 === i || !i.querySelector(".review"))) {
            y();
            var d = null === (a = t.value) || void 0 === a ? void 0 : a.querySelectorAll("p");
            if (d && d.length) {
                var f = {};
                o.forEach((function(e) {
                    return f[e.index] = e
                }
                ));
                var p = Array.from(d);
                p.unshift(n.value || null),
                p.forEach((function(t, n) {
                    t && (function(t, n, o) {
                        var i, a = null;
                        if (o) {
                            var d = o.hot
                              , f = o.hotContent
                              , p = o.avatarUrl
                              , m = o.count
                              , _ = o.userName;
                            if (m && (a = createReviewCount(m, !!d, n, !!f)),
                            f) {
                                var v, g = document.createDocumentFragment(), x = createHotReview(f, n, p, _ || s("review_user"));
                                render(x, g),
                                x.el && u.push(x.el),
                                null === (v = t.parentElement) || void 0 === v || v.insertBefore(g, t.nextElementSibling)
                            }
                        }
                        if (t.classList.contains("title")) {
                            if (t.classList.add("content-text"),
                            t.dataset.index = String(n),
                            a) {
                                var y = document.createDocumentFragment();
                                t.dataset.count = String(o.count),
                                render(a, y),
                                t.appendChild(y)
                            }
                            r.deviceType === PlatformType.PC && l.push(t)
                        } else if (e.value.font)
                            t.classList.add("content-text"),
                            t.dataset.index = String(n),
                            a && (t.dataset.count = String(o.count),
                            render(a, t)),
                            r.deviceType === PlatformType.PC && l.push(t);
                        else {
                            var b = createContentSpan(t.textContent || "", (null == o ? void 0 : o.count) || 0, n);
                            t.textContent = "",
                            render(h(Fragment, [b, a]), t),
                            b.el && r.deviceType === PlatformType.PC && l.push(b.el)
                        }
                        null !== (i = a) && void 0 !== i && i.el && (r.deviceType === PlatformType.Mobile || !e.value.font && r.deviceType === PlatformType.PC) && c.push(a.el)
                    }(t, n, f[n]),
                    [].concat(_toConsumableArray(u), _toConsumableArray(c), _toConsumableArray(l)).forEach((function(e) {
                        return e.addEventListener("click", g)
                    }
                    )),
                    u.forEach((function(e) {
                        m(e, {
                            e: "review:hot"
                        })
                    }
                    )))
                }
                ))
            }
        }
    }
    return useKeyNavigation((function(t) {
        if (r.isSideSheetOpen && !r.settings.disableReview && r.reviewContext.chapterId === e.value.id) {
            var n = 0;
            if ("review:up" === t ? n = Math.max(0, o.value - 1) : "review:down" === t && (n = Math.min(l.length - 1, o.value + 1)),
            ("review:up" === t || "review:down" === t) && n !== o.value) {
                var i = l[o.value]
                  , a = document.documentElement.clientHeight;
                return i && i.getBoundingClientRect().top + i.offsetHeight > .4 * a && i.getBoundingClientRect().top < .6 * a && i.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                }),
                v(n),
                !0
            }
            if (n === l.length - 1)
                return !0
        }
    }
    )),
    watch((function() {
        return r.settings.disableReview
    }
    ), (function(t) {
        !t && (!d || d !== e.value.id) && x()
    }
    )),
    onUnmounted(y),
    {
        loadReviewCounts: x,
        isReviewEnable: a.processReviewCount
    }
}
function randomLetters() {
    for (var e = [], t = 0; t < 8; t++) {
        var n = Math.ceil(25 * Math.random());
        e.push(String.fromCharCode(65 + n))
    }
    return e.join("")
}
var _withScopeId$5 = function(e) {
    return pushScopeId("data-v-3cbf52b3"),
    e = e(),
    popScopeId(),
    e
}
  , _hoisted_1$h = {
    class: "text-s-gray-500 mt-4px text-bo4 flex items-center flex-wrap"
}
  , _hoisted_2$g = ["href"]
  , _hoisted_3$b = _withScopeId$5((function() {
    return createBaseVNode("span", {
        class: "icon-book text-16px mr-4px"
    }, null, -1)
}
))
  , _hoisted_4$b = {
    class: "group-hover:text-s-gray-700"
}
  , _hoisted_5$a = _withScopeId$5((function() {
    return createBaseVNode("span", {
        class: "icon-pen text-16px mr-4px"
    }, null, -1)
}
))
  , _hoisted_6$a = {
    key: 2,
    class: "group inline-flex items-center mr-16px"
}
  , _hoisted_7$9 = {
    class: "relative mr-4px h-16px"
}
  , _hoisted_8$9 = _withScopeId$5((function() {
    return createBaseVNode("span", {
        class: "icon-number text-16px"
    }, null, -1)
}
))
  , _hoisted_9$a = {
    class: "num-word-cut"
}
  , _hoisted_10$8 = _withScopeId$5((function() {
    return createBaseVNode("span", {
        class: "num num1"
    }, "1", -1)
}
))
  , _hoisted_11$8 = {
    key: 3,
    class: "group inline-flex items-center"
}
  , _hoisted_12$7 = _withScopeId$5((function() {
    return createBaseVNode("span", {
        class: "icon-clock text-16px mr-4px"
    }, null, -1)
}
))
  , _hoisted_13$7 = {
    class: "chapter-date"
}
  , _sfc_main$j = defineComponent({
    __name: "Subtitle",
    props: {
        chapter: null
    },
    setup: function(e) {
        var t = e
          , n = inject(BOOK_STATE_KEY)
          , o = inject(FRONT_CONFIG_STATE_KEY)
          , r = inject(I18N_IO_FUNC_KEY)
          , i = inject(USER_STATE_KEY)
          , a = computed((function() {
            var e, t;
            return (null === (e = i.value) || void 0 === e ? void 0 : e.id) && (null === (t = i.value) || void 0 === t ? void 0 : t.id.slice(-2, -1)) || "2"
        }
        ))
          , s = computed((function() {
            var e, t;
            return (null === (e = i.value) || void 0 === e ? void 0 : e.id) && (null === (t = i.value) || void 0 === t ? void 0 : t.id.slice(-1)) || "3"
        }
        ))
          , l = computed((function() {
            return t.chapter.wordCount ? formatNumber2(t.chapter.wordCount) : null
        }
        ))
          , c = computed((function() {
            var e = t.chapter.publishTime;
            return "number" == typeof e ? formatDateText3(e, !0) : "string" == typeof e ? e : null
        }
        ));
        return onMounted((function() {
            var e;
            null === (e = window.YWQD) || void 0 === e || e.barcode(".chapter-date", {
                height: 2
            })
        }
        )),
        function(e, t) {
            var i, u, d, f, p, h, m, _, v, g, x, y;
            return openBlock(),
            createElementBlock("div", _hoisted_1$h, [null !== (i = unref(n)) && void 0 !== i && i.title && null !== (u = unref(o)) && void 0 !== u && u.hrefMap.detail ? (openBlock(),
            createElementBlock("a", {
                key: 0,
                class: "group inline-flex items-center mr-16px",
                rel: "nofollow",
                href: null === (d = unref(o)) || void 0 === d || null === (f = (p = d.hrefMap).detail) || void 0 === f ? void 0 : f.call(p, null === (h = unref(o)) || void 0 === h ? void 0 : h.bid)
            }, [_hoisted_3$b, createBaseVNode("span", _hoisted_4$b, toDisplayString(null === (m = unref(n)) || void 0 === m ? void 0 : m.title), 1)], 8, _hoisted_2$g)) : createCommentVNode("", !0), null !== (_ = unref(n)) && void 0 !== _ && _.authorName ? (openBlock(),
            createBlock(resolveDynamicComponent(null !== (v = unref(o)) && void 0 !== v && v.hrefMap.author ? "a" : "span"), {
                key: 1,
                rel: "nofollow",
                href: null === (g = unref(o)) || void 0 === g || null === (x = (y = g.hrefMap).author) || void 0 === x ? void 0 : x.call(y),
                class: "group inline-flex items-center mr-16px"
            }, {
                default: withCtx((function() {
                    var e, t;
                    return [_hoisted_5$a, createBaseVNode("span", {
                        class: normalizeClass((null === (e = unref(o)) || void 0 === e ? void 0 : e.hrefMap.author) && "group-hover:text-s-gray-700")
                    }, toDisplayString(null === (t = unref(n)) || void 0 === t ? void 0 : t.authorName), 3)]
                }
                )),
                _: 1
            }, 8, ["href"])) : createCommentVNode("", !0), unref(l) ? (openBlock(),
            createElementBlock("span", _hoisted_6$a, [createBaseVNode("span", _hoisted_7$9, [_hoisted_8$9, createBaseVNode("span", _hoisted_9$a, [_hoisted_10$8, createBaseVNode("span", {
                class: normalizeClass(["num", "num".concat(unref(a))])
            }, toDisplayString(unref(a)), 3), createBaseVNode("span", {
                class: normalizeClass(["num", "num".concat(unref(s))])
            }, toDisplayString(unref(s)), 3)])]), createTextVNode(" " + toDisplayString(unref(r)("total_words", String(unref(l)))), 1)])) : createCommentVNode("", !0), unref(c) ? (openBlock(),
            createElementBlock("span", _hoisted_11$8, [_hoisted_12$7, createBaseVNode("span", _hoisted_13$7, toDisplayString(unref(c)), 1)])) : createCommentVNode("", !0)])
        }
    }
})
  , Subtitle = _export_sfc(_sfc_main$j, [["__scopeId", "data-v-3cbf52b3"]])
  , _hoisted_1$g = ["data-id"]
  , _hoisted_2$f = ["id", "innerHTML"]
  , _sfc_main$i = defineComponent({
    __name: "Print",
    props: {
        titleTagName: {
            default: "h1"
        },
        chapter: null
    },
    setup: function(e) {
        var t = e
          , n = inject(READER_STATE_KEY, defaultReaderState)
          , o = inject(CONFIG_STATE_KEY)
          , r = inject(I18N_IO_FUNC_KEY)
          , i = inject(USER_STATE_KEY)
          , a = inject(ADAPTERS_KEY)
          , s = inject(BUS_STATE_KEY)
          , l = ref()
          , c = ref()
          , u = ref(t.chapter.font || t.chapter.encrypt ? "" : transToHtml(y(t.chapter.content) || ""))
          , d = toRef(t, "chapter")
          , f = toRefs(n.settings)
          , p = f.font
          , h = f.fontSize
          , m = f.disableReview
          , _ = useBookmark().toggleMark
          , v = useReview(d, l, c).loadReviewCounts
          , g = useSharedTrack().directive
          , x = useStyleTag("").css;
        function y(e) {
            var t = n.i18n.value.message[n.i18n.value.locale];
            return "_trans"in t ? t._trans.trans(e) : e
        }
        function b(e, t, n) {
            return k.apply(this, arguments)
        }
        function k() {
            return (k = _asyncToGenerator(_regeneratorRuntime().mark((function e(t, o, r) {
                var a;
                return _regeneratorRuntime().wrap((function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            if (!r || n.isFockReady) {
                                e.next = 11;
                                break
                            }
                            n.isFockReady = !0,
                            e.prev = 2,
                            initFock(i.value.id, r),
                            s.emit("fock:init", {
                                status: "ok",
                                cid: o,
                                fkp: r
                            }),
                            e.next = 11;
                            break;
                        case 7:
                            throw e.prev = 7,
                            e.t0 = e.catch(2),
                            s.emit("fock:init", {
                                status: "fail",
                                cid: o,
                                fkp: r,
                                err: e.t0
                            }),
                            e.t0;
                        case 11:
                            return e.prev = 11,
                            e.next = 14,
                            unlockFock(t, o);
                        case 14:
                            return a = e.sent,
                            s.emit("fock:unlock", {
                                status: "ok",
                                cid: o,
                                olen: t.length,
                                ulen: a.length
                            }),
                            e.abrupt("return", a);
                        case 19:
                            throw e.prev = 19,
                            e.t1 = e.catch(11),
                            s.emit("fock:unlock", {
                                status: "fail",
                                cid: o,
                                olen: t.length,
                                err: e.t1
                            }),
                            e.t1;
                        case 23:
                        case "end":
                            return e.stop()
                        }
                }
                ), e, null, [[2, 7], [11, 19]])
            }
            )))).apply(this, arguments)
        }
        function w() {
            nextTick((function() {
                return n.isChapterLoading = !1
            }
            )),
            !m.value && d.value.content && !d.value.serviceError && v(),
            d.value.serviceError && setTimeout((function() {
                useToast({
                    title: d.value.serviceError.serviceError.msg,
                    type: "error"
                })
            }
            ), 1e3)
        }
        function E(e, t) {
            document.fonts && "FontFace"in window ? e.forEach((function(e) {
                checkFontLoaded(e).then((function(n) {
                    s.emit("font:check", {
                        status: n,
                        cid: t,
                        font: e
                    })
                }
                )).catch((function(n) {
                    s.emit("font:check", {
                        status: "error",
                        cid: t,
                        font: e,
                        err: n
                    })
                }
                ))
            }
            )) : s.emit("font:check", {
                status: "unsupported",
                cid: t
            });
            var n = document.querySelector("#c-".concat(t, " p.p0"));
            if (n) {
                var o = checkElementFontFamily(n);
                s.emit("font:style", {
                    status: "ok",
                    cid: t,
                    style: o
                })
            } else
                s.emit("font:style", {
                    status: "miss",
                    cid: t
                })
        }
        var S = !1;
        return onMounted((function() {
            u.value && w(),
            watch(d, function() {
                var e = _asyncToGenerator(_regeneratorRuntime().mark((function e(t) {
                    var o, c, u, f, p, h, m, _, v, g, k, C, B, T, $, N, A, O;
                    return _regeneratorRuntime().wrap((function(e) {
                        for (; ; )
                            switch (e.prev = e.next) {
                            case 0:
                                if (t) {
                                    e.next = 2;
                                    break
                                }
                                return e.abrupt("return");
                            case 2:
                                if (l.value && ((o = l.value.querySelector("style")) && (o.discard = !0)),
                                S ? n.chapterContext.visibleChapter = t : S = !0,
                                c = t.content,
                                x.value = "",
                                e.prev = 6,
                                !t.encrypt || !c) {
                                    e.next = 18;
                                    break
                                }
                                if (null != i && null !== (u = i.value) && void 0 !== u && u.id) {
                                    e.next = 11;
                                    break
                                }
                                return null === (f = a.processLogin) || void 0 === f || f.call(a),
                                e.abrupt("return");
                            case 11:
                                if (t.fkp) {
                                    e.next = 13;
                                    break
                                }
                                throw new Error(r("load_failed"));
                            case 13:
                                return e.next = 15,
                                b(t.content, t.id, t.fkp);
                            case 15:
                                if (c = e.sent) {
                                    e.next = 18;
                                    break
                                }
                                throw new Error(r("empty_chap"));
                            case 18:
                                if (!(t.font && t.fontResponse && c)) {
                                    e.next = 52;
                                    break
                                }
                                return h = randomLetters(),
                                m = randomLetters(),
                                _ = "",
                                e.prev = 22,
                                e.next = 25,
                                loadFontFace(h, t.fontResponse.fixedFontTtf, t.fontResponse.fixedFontWoff2);
                            case 25:
                                v = e.sent,
                                g = v.css,
                                k = v.status,
                                _ = g,
                                s.emit("font:ajax", {
                                    status: k,
                                    cid: t.id,
                                    css: _
                                }),
                                e.next = 36;
                                break;
                            case 32:
                                throw e.prev = 32,
                                e.t0 = e.catch(22),
                                s.emit("font:ajax", {
                                    status: "fail",
                                    cid: t.id,
                                    err: e.t0
                                }),
                                e.t0;
                            case 36:
                                if (x.value = "#c-".concat(t.id, ", #c-").concat(t.id, " :not(pre):not(code):not(textarea):not(tt):not(kbd):not(samp):not(var):not(.hot-content):not(.review-count) {font-family: ").concat(h, ", ").concat(m, ", 'SourceHanSansSC-Regular', 'SourceHanSansCN-Regular', 'PingFangSC-Regular', 'Microsoft YaHei', SimHei, STHeiTi !important;}"),
                                C = {
                                    callback: w
                                },
                                (t.guidMark || t.eFW) && (N = t.guidMark || (null === (B = i.value) || void 0 === B ? void 0 : B.id) || "",
                                !t.guidMark && void 0 !== (null === (T = window.Fock) || void 0 === T ? void 0 : T.encodeGuid) && (N = null === (A = window.Fock) || void 0 === A ? void 0 : A.encodeGuid(N),
                                C.autoMix = !t.eFW && 1),
                                null !== ($ = t.ywqdOptions) && void 0 !== $ && $.water || (C.water = N)),
                                null !== (p = i.value) && void 0 !== p && p.id && Object.assign(C, {
                                    guid: null === (O = i.value) || void 0 === O ? void 0 : O.id
                                }),
                                t.ywqdOptions && Object.assign(C, t.ywqdOptions),
                                !l.value) {
                                    e.next = 50;
                                    break
                                }
                                e.prev = 42,
                                handle(l.value, [c], t.fontResponse.css, t.fontResponse.randomFont.data, m, C, _, (function() {
                                    s.emit("font:render", {
                                        status: "ok",
                                        cid: t.id,
                                        css: x.value
                                    }),
                                    E([h, m], t.id)
                                }
                                )),
                                e.next = 50;
                                break;
                            case 46:
                                throw e.prev = 46,
                                e.t1 = e.catch(42),
                                s.emit("font:render", {
                                    status: "fail",
                                    cid: t.id,
                                    css: x.value,
                                    err: e.t1
                                }),
                                e.t1;
                            case 50:
                                e.next = 53;
                                break;
                            case 52:
                                nextTick((function() {
                                    l.value && (l.value.innerHTML = transToHtml(y(c) || "")),
                                    w()
                                }
                                ));
                            case 53:
                                e.next = 61;
                                break;
                            case 55:
                                throw e.prev = 55,
                                e.t2 = e.catch(6),
                                useToast({
                                    title: (null === e.t2 || void 0 === e.t2 ? void 0 : e.t2.message) || r("load_chap_failed")
                                }),
                                n.errorHash[d.value.id] = {
                                    title: r("load_chap_failed")
                                },
                                n.isChapterLoading = !1,
                                e.t2;
                            case 61:
                            case "end":
                                return e.stop()
                            }
                    }
                    ), e, null, [[6, 55], [22, 32], [42, 46]])
                }
                )));
                return function(t) {
                    return e.apply(this, arguments)
                }
            }(), {
                immediate: !u.value
            })
        }
        )),
        function(t, i) {
            var s, f, v;
            return openBlock(),
            createElementBlock("div", {
                class: normalizeClass(["print <sm:pt-56px <sm:mb-48px <sm:px-20px pt-64px px-64px mb-64px", [unref(n).isSideSheetOpen && "highlight", !unref(m) && "enable-review"]]),
                "data-id": unref(d).id,
                style: normalizeStyle("font-size:".concat(unref(h), "px"))
            }, [(openBlock(),
            createBlock(resolveDynamicComponent(e.titleTagName), {
                ref_key: "$title",
                ref: c,
                class: normalizeClass(["title text-1.3em text-s-gray-900 leading-[1.35] font-medium break-all wrap-word inline-block", "r-font-".concat(unref(d).font ? "black" : unref(p), "-medium")])
            }, {
                default: withCtx((function() {
                    var e;
                    return [createTextVNode(toDisplayString(null === (e = unref(d)) || void 0 === e ? void 0 : e.title), 1)]
                }
                )),
                _: 1
            }, 8, ["class"])), "desktop" === unref(n).deviceType && null !== (s = unref(o)) && void 0 !== s && null !== (f = s.subtitle) && void 0 !== f && f.visible.data ? (openBlock(),
            createBlock(Subtitle, {
                key: 0,
                chapter: unref(d)
            }, null, 8, ["chapter"])) : createCommentVNode("", !0), createBaseVNode("main", {
                id: "c-".concat(unref(d).id),
                ref_key: "$content",
                ref: l,
                "data-type": "cjk",
                class: normalizeClass(["content mt-1.5em text-s-gray-900 leading-[1.8] relative z-0", ["r-font-".concat(unref(d).font ? "encrypt" : unref(p)), null !== (v = unref(d)) && void 0 !== v && v.auth ? "" : "lock-mask"]]),
                innerHTML: u.value
            }, null, 10, _hoisted_2$f), "desktop" === unref(n).deviceType && unref(a).processBookmarkList ? (openBlock(),
            createBlock(Tooltip, {
                key: 1,
                content: unref(n).isGuideOpen ? unref(r)("bookmark_guide") : unref(d).mark ? unref(r)("remove_bookmark") : unref(r)("add_bookmark"),
                hover: !unref(n).isGuideOpen,
                class: "!absolute top-0 right-64px z-1",
                position: "top"
            }, {
                default: withCtx((function() {
                    return [unref(d).mark ? withDirectives((openBlock(),
                    createElementBlock("button", {
                        key: 0,
                        class: "bookmark w-26px h-36px hover-10 active-10 bg-primary-red-500",
                        onClick: i[0] || (i[0] = function(e) {
                            return unref(_)(unref(d))
                        }
                        )
                    }, null, 512)), [[unref(g), {
                        e: "bookmark:remove"
                    }, "c"]]) : withDirectives((openBlock(),
                    createElementBlock("button", {
                        key: 1,
                        class: "bookmark w-26px h-36px hover-10 active-10 bg-s-gray-100",
                        onClick: i[1] || (i[1] = function(e) {
                            return unref(_)(unref(d))
                        }
                        )
                    }, null, 512)), [[unref(g), {
                        e: "bookmark:add"
                    }, "c"]])]
                }
                )),
                _: 1
            }, 8, ["content", "hover"])) : createCommentVNode("", !0), renderSlot(t.$slots, "default", {}, void 0, !0)], 14, _hoisted_1$g)
        }
    }
})
  , Print = _export_sfc(_sfc_main$i, [["__scopeId", "data-v-f233f990"]])
  , _withScopeId$4 = function(e) {
    return pushScopeId("data-v-f063ea55"),
    e = e(),
    popScopeId(),
    e
}
  , _hoisted_1$e = {
    key: 0,
    class: "sm:border-t sm:border-outline-black-8 sm:pt-48px sm:my-64px sm:mx-64px mb-24px text-center mx-20px"
}
  , _hoisted_2$d = {
    key: 0,
    class: "text-s-gray-300 font-medium text-rh5 mb-48px whitespace-pre"
}
  , _hoisted_3$a = {
    key: 1,
    class: "text-s-gray-300 text-bo4 mb-24px flex items-center whitespace-pre after:content-DEFAULT after:border-t after:border-current after:block after:flex-grow before:content-DEFAULT before:border-t before:border-current before:block before:flex-grow"
}
  , _hoisted_4$a = {
    class: "mx-8px"
}
  , _hoisted_5$9 = {
    class: "mt-16px"
}
  , _hoisted_6$9 = {
    key: 0,
    class: "bg-on-image-white-36 text-bt3 text-on-image-bw-white py-1px px-3px rounded-3px relative ml-6px flex items-center after:absolute after:inline-block after:content-DEFAULT after:border-3px after:border-transparent after:border-r-on-image-white-36 after:right-full after:top-6px"
}
  , _hoisted_7$8 = _withScopeId$4((function() {
    return createBaseVNode("span", {
        class: "mx-4px w-1px rounded bg-white-24 h-10px inline-block"
    }, null, -1)
}
))
  , _hoisted_8$8 = {
    class: "text-gray-700 text-c12"
}
  , _hoisted_9$9 = {
    key: 0,
    class: "absolute bg-primary-red-500 text-t3 px-5px py-2px rounded-8px rounded-bl-none text-on-image-bw-white font-medium border-bw-white border right-0 -top-5px"
}
  , _hoisted_10$7 = {
    key: 1,
    class: "download-popup flex absolute bottom-full left-1/2 flex-col items-center"
}
  , _hoisted_11$7 = {
    class: "bg-b-bw-white p-24px rounded-8px shadow-sd24"
}
  , _sfc_main$g = defineComponent({
    __name: "Subscription",
    props: {
        chapter: null,
        enableBatchSubsInMobile: {
            type: Boolean
        },
        showBalance: {
            type: Boolean
        },
        hideDownloadTips: {
            type: Boolean
        }
    },
    setup: function(e) {
        var t = e
          , n = inject(USER_STATE_KEY)
          , o = inject(READER_STATE_KEY, defaultReaderState)
          , r = inject(FRONT_CONFIG_STATE_KEY)
          , i = inject(CONFIG_STATE_KEY)
          , a = inject(I18N_IO_FUNC_KEY)
          , s = inject(ADAPTERS_KEY)
          , l = inject(BUS_STATE_KEY)
          , c = useAutoSubs().set
          , u = useSubscribe().subscribe
          , d = useSlots()
          , f = useSharedTrack().directive
          , p = computed((function() {
            return Date.now() - t.chapter.updateTime > 1728e5
        }
        ));
        function h(e) {
            var t, o;
            null != n && null !== (t = n.value) && void 0 !== t && t.id ? c(e) : null === (o = s.processLogin) || void 0 === o || o.call(s)
        }
        function m() {
            var e;
            o.chapterContext.interactChapter = t.chapter,
            null === (e = u([t.chapter], t.chapter.bookPrice ? "book" : "single")) || void 0 === e || e.catch((function(e) {
                e instanceof ServiceError && e.serviceError.type === ErrorType.PriceChange && (o.lastChapterLoadMethod = "refresh",
                l.emit("_:update-chapters", {
                    ids: [t.chapter.id],
                    fetch: !0
                }))
            }
            ))
        }
        function _() {
            o.chapterContext.interactChapter = t.chapter,
            l.emit("_:batch-subs:open")
        }
        function v() {
            l.emit("subscription:popup:shown", t.chapter.id)
        }
        function g() {
            l.emit("subscription:popup:hide", t.chapter.id)
        }
        return function(t, l) {
            var c, u, x, y, b, k, w;
            return e.chapter && !e.chapter.auth ? (openBlock(),
            createElementBlock("section", _hoisted_1$e, ["desktop" === unref(o).deviceType ? (openBlock(),
            createElementBlock("div", _hoisted_2$d, toDisplayString(e.chapter.limitFree ? unref(p) && null !== (c = unref(n)) && void 0 !== c && c.id ? unref(a)("limit_free_48h_subs_tips") : unref(a)("limit_free_login_subs_tips") : unref(a)("default_subs_tips")), 1)) : e.chapter.limitFree && unref(p) ? (openBlock(),
            createElementBlock("div", _hoisted_3$a, [createBaseVNode("span", _hoisted_4$a, toDisplayString(unref(p) && null !== (u = unref(n)) && void 0 !== u && u.id ? unref(a)("limit_free_48h_subs_tips") : unref(a)("limit_free_login_subs_tips")), 1)])) : createCommentVNode("", !0), unref(s).processAutoSubs ? (openBlock(),
            createElementBlock("label", {
                key: 2,
                class: "text-c12 sm:text-bo4 text-s-gray-500 inline-flex items-center justify-center mx-auto cursor-pointer align-bottom",
                onClick: l[0] || (l[0] = withModifiers((function() {}
                ), ["stop"]))
            }, [createVNode(Checkbox, {
                "model-value": unref(o).settings.autoSubs,
                class: "mr-4px",
                onChange: h
            }, null, 8, ["model-value"]), createTextVNode(" " + toDisplayString(unref(a)("open_auto_subs_desc")), 1)])) : createCommentVNode("", !0), createBaseVNode("div", _hoisted_5$9, [renderSlot(t.$slots, "above-subs", {}, void 0, !0), withDirectives((openBlock(),
            createBlock(BottomButton, {
                class: "w-320px <sm:w-full",
                onClick: withModifiers(m, ["stop"])
            }, {
                default: withCtx((function() {
                    var t;
                    return [createTextVNode(toDisplayString("bookPrice"in e.chapter ? unref(a)("subs_book") : unref(a)("subs_current_chap")) + " ", 1), null !== (t = unref(n)) && void 0 !== t && t.id ? (openBlock(),
                    createElementBlock("span", _hoisted_6$9, [createTextVNode(toDisplayString((e.chapter.bookPrice || e.chapter.price) + unref(a)("unit")), 1), e.showBalance && unref(o).balance ? (openBlock(),
                    createElementBlock(Fragment, {
                        key: 0
                    }, [_hoisted_7$8, createTextVNode("余额" + toDisplayString(unref(o).balance + unref(a)("unit")), 1)], 64)) : createCommentVNode("", !0)])) : createCommentVNode("", !0)]
                }
                )),
                _: 1
            }, 8, ["onClick"])), [[unref(f), {
                e: "subscription:chapter"
            }, "c"]])]), unref(s).processBatchSubsList && !("bookPrice"in e.chapter) && ("desktop" === unref(o).deviceType || e.enableBatchSubsInMobile) && null !== (x = unref(n)) && void 0 !== x && x.id ? withDirectives((openBlock(),
            createBlock(BottomButton, {
                key: 3,
                class: "w-320px mt-16px mx-auto !flex",
                type: "secondary",
                onClick: withModifiers(_, ["stop"])
            }, {
                default: withCtx((function() {
                    return [createTextVNode(toDisplayString(unref(a)("batch_subs")), 1)]
                }
                )),
                _: 1
            }, 8, ["onClick"])), [[unref(f), {
                e: "subscription:batch"
            }, "c"]]) : "desktop" === unref(o).deviceType ? (openBlock(),
            createElementBlock("div", {
                key: 4,
                class: "download relative mx-auto mt-16px inline-block",
                onMouseenter: v,
                onMouseleave: g
            }, [withDirectives((openBlock(),
            createBlock(BottomButton, {
                tag: "a",
                href: (null === (y = unref(r)) || void 0 === y || null === (b = (k = y.hrefMap).download) || void 0 === b ? void 0 : b.call(k)) || (null === (w = unref(r)) || void 0 === w ? void 0 : w.downloadUrl),
                class: "w-320px flex-col",
                type: "download"
            }, {
                default: withCtx((function() {
                    var e, t;
                    return [createTextVNode(toDisplayString(unref(a)("download_app", null === (e = unref(i)) || void 0 === e || null === (t = e.brand) || void 0 === t ? void 0 : t.name.data)) + " ", 1), createBaseVNode("span", _hoisted_8$8, toDisplayString(unref(a)("free_for_new")), 1)]
                }
                )),
                _: 1
            }, 8, ["href"])), [[unref(f), {
                e: "subscription:download"
            }, "e"]]), e.hideDownloadTips ? createCommentVNode("", !0) : (openBlock(),
            createElementBlock("span", _hoisted_9$9, toDisplayString(unref(a)("first_download_gift_discount")), 1)), unref(d)["download-popup"] ? (openBlock(),
            createElementBlock("div", _hoisted_10$7, [createBaseVNode("div", _hoisted_11$7, [renderSlot(t.$slots, "download-popup", {}, void 0, !0)]), createVNode(Triangle$1, {
                class: "-mt-6px transform -rotate-90 text-b-bw-white"
            })])) : createCommentVNode("", !0)], 32)) : createCommentVNode("", !0)])) : createCommentVNode("", !0)
        }
    }
})
  , Subscription = _export_sfc(_sfc_main$g, [["__scopeId", "data-v-f063ea55"]])
  , _sfc_main$e = {}
  , _hoisted_1$c = {
    width: "60px",
    height: "52px",
    viewBox: "0 0 60 52",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
}
  , _hoisted_2$b = createStaticVNode('<path fill-rule="evenodd" clip-rule="evenodd" d="M46.7 5.2h2.8V5h-39v24.2h39V29h-2.8v-2.8h2.8V26h-2.8v-2.8h2.8V23h-2.8v-2.8h2.8V20h-2.8v-2.8h2.8V17h-2.8v-2.8h2.8V14h-2.8v-2.8h2.8V11h-2.8V8.2h2.8V8h-2.8V5.2zm-.2 0h-2.8V8h2.8V5.2zm0 3h-2.8V11h2.8V8.2zm0 3h-2.8V14h2.8v-2.8zm0 3h-2.8V17h2.8v-2.8zm0 3h-2.8V20h2.8v-2.8zm0 3h-2.8V23h2.8v-2.8zm0 3h-2.8V26h2.8v-2.8zm0 3h-2.8V29h2.8v-2.8zm-3 2.8v-2.8h-2.8V29h2.8zm-3 0v-2.8h-2.8V29h2.8zm-3 0v-2.8h-2.8V29h2.8zm-3 0v-2.8h-2.8V29h2.8zm-3 0v-2.8h-2.8V29h2.8zm-3 0v-2.8h-2.8V29h2.8zm-3 0v-2.8h-2.8V29h2.8zm-3 0v-2.8h-2.8V29h2.8zm-3 0v-2.8h-2.8V29h2.8zm-3 0v-2.8h-2.8V29h2.8zm-3 0v-2.8h-2.8V29h2.8zm-2.8-3h2.8v-2.8h-2.8V26zm0-3h2.8v-2.8h-2.8V23zm0-3h2.8v-2.8h-2.8V20zm0-3h2.8v-2.8h-2.8V17zm0-3h2.8v-2.8h-2.8V14zm0-3h2.8V8.2h-2.8V11zm0-3h2.8V5.2h-2.8V8zm3-2.8V8h2.8V5.2h-2.8zm3 0V8h2.8V5.2h-2.8zm3 0V8h2.8V5.2h-2.8zm3 0V8h2.8V5.2h-2.8zm3 0V8h2.8V5.2h-2.8zm3 0V8h2.8V5.2h-2.8zm3 0V8h2.8V5.2h-2.8zm3 0V8h2.8V5.2h-2.8zm3 0V8h2.8V5.2h-2.8zm3 0V8h2.8V5.2h-2.8zm2.8 3h-2.8V11h2.8V8.2zm0 3h-2.8V14h2.8v-2.8zm0 3h-2.8V17h2.8v-2.8zm0 3h-2.8V20h2.8v-2.8zm0 3h-2.8V23h2.8v-2.8zm0 3h-2.8V26h2.8v-2.8zm-3 2.8v-2.8h-2.8V26h2.8zm-3 0v-2.8h-2.8V26h2.8zm-3 0v-2.8h-2.8V26h2.8zm-3 0v-2.8h-2.8V26h2.8zm-3 0v-2.8h-2.8V26h2.8zm-3 0v-2.8h-2.8V26h2.8zm-3 0v-2.8h-2.8V26h2.8zm-3 0v-2.8h-2.8V26h2.8zm-3 0v-2.8h-2.8V26h2.8zm-2.8-3h2.8v-2.8h-2.8V23zm0-3h2.8v-2.8h-2.8V20zm0-3h2.8v-2.8h-2.8V17zm0-3h2.8v-2.8h-2.8V14zm0-3h2.8V8.2h-2.8V11zm3-2.8V11h2.8V8.2h-2.8zm3 0V11h2.8V8.2h-2.8zm3 0V11h2.8V8.2h-2.8zm3 0V11h2.8V8.2h-2.8zm3 0V11h2.8V8.2h-2.8zm3 0V11h2.8V8.2h-2.8zm3 0V11h2.8V8.2h-2.8zm3 0V11h2.8V8.2h-2.8zm2.8 3h-2.8V14h2.8v-2.8zm0 3h-2.8V17h2.8v-2.8zm0 3h-2.8V20h2.8v-2.8zm0 3h-2.8V23h2.8v-2.8zm-3 2.8v-2.8h-2.8V23h2.8zm-3 0v-2.8h-2.8V23h2.8zm-3 0v-2.8h-2.8V23h2.8zm-3 0v-2.8h-2.8V23h2.8zm-3 0v-2.8h-2.8V23h2.8zm-3 0v-2.8h-2.8V23h2.8zm-3 0v-2.8h-2.8V23h2.8zm-2.8-3h2.8v-2.8h-2.8V20zm0-3h2.8v-2.8h-2.8V17zm0-3h2.8v-2.8h-2.8V14zm3-2.8V14h2.8v-2.8h-2.8zm3 0V14h2.8v-2.8h-2.8zm3 0V14h2.8v-2.8h-2.8zm3 0V14h2.8v-2.8h-2.8zm3 0V14h2.8v-2.8h-2.8zm3 0V14h2.8v-2.8h-2.8zm2.8 3h-2.8V17h2.8v-2.8zm0 3h-2.8V20h2.8v-2.8zm-3 2.8v-2.8h-2.8V20h2.8zm-3 0v-2.8h-2.8V20h2.8zm-3 0v-2.8h-2.8V20h2.8zm-3 0v-2.8h-2.8V20h2.8zm-3 0v-2.8h-2.8V20h2.8zm-2.8-3h2.8v-2.8h-2.8V17zm3-2.8V17h2.8v-2.8h-2.8zm3 0V17h2.8v-2.8h-2.8zm3 0V17h2.8v-2.8h-2.8zm3 0V17h2.8v-2.8h-2.8zm18 14.8h-.2V5h.2v24z" fill="url(#paint0_linear_11500_89552)"></path><path d="M18 5h-6a2 2 0 0 0-2 2v6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" filter="url(#filter0_d_11500_89552)"></path><path d="M18 45h-6a2 2 0 0 1-2-2v-6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" filter="url(#filter1_d_11500_89552)"></path><path d="M42 5h6a2 2 0 0 1 2 2v6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" filter="url(#filter2_d_11500_89552)"></path><path d="M42 45h6a2 2 0 0 0 2-2v-6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" filter="url(#filter3_d_11500_89552)"></path><path d="M6 30h48" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" filter="url(#filter4_d_11500_89552)"></path><defs><filter id="filter0_d_11500_89552" x="4.75" y=".75" width="18.5" height="18.5" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix><feOffset dy="1"></feOffset><feGaussianBlur stdDeviation="2"></feGaussianBlur><feColorMatrix values="0 0 0 0 0.898039 0 0 0 0 0.207843 0 0 0 0 0.242353 0 0 0 0.24 0"></feColorMatrix><feBlend in2="BackgroundImageFix" result="effect1_dropShadow_11500_89552"></feBlend><feBlend in="SourceGraphic" in2="effect1_dropShadow_11500_89552" result="shape"></feBlend></filter><filter id="filter1_d_11500_89552" x="4.75" y="32.75" width="18.5" height="18.5" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix><feOffset dy="1"></feOffset><feGaussianBlur stdDeviation="2"></feGaussianBlur><feColorMatrix values="0 0 0 0 0.898039 0 0 0 0 0.207843 0 0 0 0 0.242353 0 0 0 0.24 0"></feColorMatrix><feBlend in2="BackgroundImageFix" result="effect1_dropShadow_11500_89552"></feBlend><feBlend in="SourceGraphic" in2="effect1_dropShadow_11500_89552" result="shape"></feBlend></filter><filter id="filter2_d_11500_89552" x="36.75" y=".75" width="18.5" height="18.5" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix><feOffset dy="1"></feOffset><feGaussianBlur stdDeviation="2"></feGaussianBlur><feColorMatrix values="0 0 0 0 0.898039 0 0 0 0 0.207843 0 0 0 0 0.242353 0 0 0 0.24 0"></feColorMatrix><feBlend in2="BackgroundImageFix" result="effect1_dropShadow_11500_89552"></feBlend><feBlend in="SourceGraphic" in2="effect1_dropShadow_11500_89552" result="shape"></feBlend></filter><filter id="filter3_d_11500_89552" x="36.75" y="32.75" width="18.5" height="18.5" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix><feOffset dy="1"></feOffset><feGaussianBlur stdDeviation="2"></feGaussianBlur><feColorMatrix values="0 0 0 0 0.898039 0 0 0 0 0.207843 0 0 0 0 0.242353 0 0 0 0.24 0"></feColorMatrix><feBlend in2="BackgroundImageFix" result="effect1_dropShadow_11500_89552"></feBlend><feBlend in="SourceGraphic" in2="effect1_dropShadow_11500_89552" result="shape"></feBlend></filter><filter id="filter4_d_11500_89552" x=".75" y="25.75" width="58.5" height="10.5" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix><feOffset dy="1"></feOffset><feGaussianBlur stdDeviation="2"></feGaussianBlur><feColorMatrix values="0 0 0 0 0.898039 0 0 0 0 0.207843 0 0 0 0 0.242353 0 0 0 0.24 0"></feColorMatrix><feBlend in2="BackgroundImageFix" result="effect1_dropShadow_11500_89552"></feBlend><feBlend in="SourceGraphic" in2="effect1_dropShadow_11500_89552" result="shape"></feBlend></filter><linearGradient id="paint0_linear_11500_89552" x1="30.1" y1="5" x2="30.1" y2="29.2" gradientUnits="userSpaceOnUse"><stop stop-color="currentColor" stop-opacity="0"></stop><stop offset="1" stop-color="currentColor" stop-opacity=".37"></stop></linearGradient></defs>', 7)
  , _hoisted_9$8 = [_hoisted_2$b];
function _sfc_render$1(e, t) {
    return openBlock(),
    createElementBlock("svg", _hoisted_1$c, _hoisted_9$8)
}
var Scan = _export_sfc(_sfc_main$e, [["render", _sfc_render$1]])
  , _withScopeId$3 = function(e) {
    return pushScopeId("data-v-5d5432a0"),
    e = e(),
    popScopeId(),
    e
}
  , _hoisted_1$a = {
    class: "flex items-center -mt-16px text-rh4 font-medium text-s-gray-900"
}
  , _hoisted_2$9 = _withScopeId$3((function() {
    return createBaseVNode("span", {
        class: "icon-arrow-right text-24px transform rotate-180"
    }, null, -1)
}
))
  , _hoisted_3$8 = [_hoisted_2$9]
  , _hoisted_4$8 = {
    class: "pl-32px mt-38px text-s-gray-500"
}
  , _hoisted_5$7 = {
    class: "font-yuewen"
}
  , _hoisted_6$7 = {
    class: "text-primary-red-500 text-40px"
}
  , _hoisted_7$7 = {
    class: "text-24px ml-4px"
}
  , _hoisted_8$7 = {
    class: "flex items-center pb-31px"
}
  , _hoisted_9$7 = ["src"]
  , _hoisted_10$6 = {
    class: "ml-10px text-bo2"
}
  , _hoisted_11$6 = {
    class: "text-primary-red-500"
}
  , _hoisted_12$6 = _withScopeId$3((function() {
    return createBaseVNode("br", null, null, -1)
}
))
  , _hoisted_13$6 = {
    class: "text-rh4 font-medium text-s-gray-900 -mt-16px"
}
  , _hoisted_14$4 = {
    class: "flex justify-between mt-20px"
}
  , _hoisted_15$3 = ["disabled"]
  , _hoisted_16$3 = _withScopeId$3((function() {
    return createBaseVNode("span", {
        class: "icon-wechat text-[#40D76F] text-24px mr-4px"
    }, null, -1)
}
))
  , _hoisted_17$3 = {
    key: 0,
    class: "gear-checkbox w-18px h-18px rounded-tl-8px rounded-br-6px absolute bottom-0 right-0"
}
  , _hoisted_18$3 = ["disabled"]
  , _hoisted_19$3 = _withScopeId$3((function() {
    return createBaseVNode("span", {
        class: "icon-alipay text-[#1677FF] text-24px mr-4px"
    }, null, -1)
}
))
  , _hoisted_20$3 = {
    key: 0,
    class: "gear-checkbox w-18px h-18px rounded-tl-8px rounded-br-6px absolute bottom-0 right-0"
}
  , _hoisted_21$3 = ["disabled"]
  , _hoisted_22$2 = _withScopeId$3((function() {
    return createBaseVNode("span", {
        class: "icon-qq text-[#56BBF9] text-24px mr-4px"
    }, null, -1)
}
))
  , _hoisted_23$2 = {
    key: 0,
    class: "gear-checkbox w-18px h-18px rounded-tl-8px rounded-br-6px absolute bottom-0 right-0"
}
  , _hoisted_24$2 = ["href"]
  , _hoisted_25$2 = _withScopeId$3((function() {
    return createBaseVNode("span", {
        class: "icon-yuan text-[#FFC61B] text-24px mr-4px"
    }, null, -1)
}
))
  , _hoisted_26$2 = _withScopeId$3((function() {
    return createBaseVNode("span", {
        class: "icon-arrow-up-bold text-12px text-s-gray-300 ml-auto transform rotate-90"
    }, null, -1)
}
))
  , _hoisted_27$2 = {
    class: "text-bo4 text-s-gray-500 mt-20px"
}
  , _hoisted_28$2 = {
    class: "font-yuewen text-24px text-s-gray-900 leading-30px"
}
  , _hoisted_29 = {
    class: "text-bo4 text-s-gray-500 mt-12px"
}
  , _hoisted_30 = {
    class: "font-yuewen text-24px text-primary-red-500 leading-30px"
}
  , _hoisted_31 = {
    class: "flex justify-end items-center mt-46px"
}
  , _hoisted_32 = {
    class: "flex text-s-gray-700 text-c12 mr-16px items-center"
}
  , _hoisted_33 = {
    class: "text-secondary-blue-500",
    target: "_blank",
    href: "https://www.qidian.com/help/index/2"
}
  , _sfc_main$c = defineComponent({
    __name: "QuickRecharge",
    props: {
        source: null,
        payload: null,
        consume: null,
        realBalance: {
            type: Boolean
        }
    },
    emits: ["alipay:active", "active", "close"],
    setup: function(e, t) {
        var n = t.emit
          , o = e
          , r = inject(FRONT_CONFIG_STATE_KEY)
          , i = inject(I18N_IO_FUNC_KEY)
          , a = inject(READER_STATE_KEY, defaultReaderState)
          , s = inject(ADAPTERS_KEY)
          , l = inject(BUS_STATE_KEY)
          , c = ref("wechat")
          , u = ref(!1)
          , d = ref(!1)
          , f = ref("")
          , p = null
          , h = null
          , m = useTrack().directive
          , _ = computed((function() {
            return o.realBalance ? a.realBalance : a.balance
        }
        ));
        function v(e) {
            if (e instanceof ServiceError)
                if (e.serviceError.type === ErrorType.Balance) {
                    var t, n;
                    o.realBalance ? null === (t = s.processRealBalance) || void 0 === t || t.call(s).then((function(e) {
                        return a.realBalance = e
                    }
                    )) : null === (n = s.processBalance) || void 0 === n || n.call(s).then((function(e) {
                        return a.balance = e
                    }
                    )),
                    handleError(e)
                } else
                    e.serviceError.type === ErrorType.PriceChange && "batch" === o.source && l.emit("_:refetch-batch-subs"),
                    handleError(e);
            else
                useToast({
                    title: i("payment_failed")
                })
        }
        function g() {
            var e = useToast({
                type: "loading",
                title: i("loading")
            }).stop;
            h = e,
            "wechat" === c.value || "qq" === c.value ? requestMayRisk((function(e) {
                var t;
                return null === (t = s["wechat" === c.value ? "processWechatPay" : "processQQPay"]) || void 0 === t ? void 0 : t.call(s, o.consume, o.source, o.payload, e)
            }
            ), r.value).then((function(t) {
                var r;
                e(),
                n("active", {
                    type: c.value,
                    onCancel: t.onCancel
                }),
                d.value = !0,
                f.value = t.qrcode,
                p = t.onCancel,
                null === (r = s["wechat" === c.value ? "processWechatPayCheck" : "processQQPayCheck"]) || void 0 === r || r.call(s, o.consume, o.source, o.payload, t).then((function() {
                    n("close"),
                    ["batch", "chapter", "book"].includes(o.source) && window.location.reload()
                }
                )).catch(v)
            }
            )).catch((function(t) {
                e(),
                handleError(t, i("load_failed"))
            }
            )) : "alipay" === c.value && requestMayRisk((function(e) {
                var t;
                return null === (t = s.processAlipay) || void 0 === t ? void 0 : t.call(s, o.consume, o.source, o.payload, e)
            }
            ), r.value).then((function(t) {
                var r;
                e(),
                n("active", {
                    type: c.value,
                    onCancel: t.onCancel
                }),
                window.open(t.jumpUrl, "_blank"),
                null === (r = s.processAlipayCheck) || void 0 === r || r.call(s, o.consume, o.source, o.payload, t).then((function() {
                    n("close"),
                    window.location.reload()
                }
                )).catch(v)
            }
            )).catch((function(t) {
                e(),
                handleError(t, i("load_failed"))
            }
            ))
        }
        function x() {
            var e;
            d.value = !1,
            null === (e = p) || void 0 === e || e()
        }
        return watch(d, (function(e) {
            var t;
            e || (null === (t = p) || void 0 === t || t())
        }
        )),
        onUnmounted((function() {
            var e;
            return null === (e = h) || void 0 === e ? void 0 : e()
        }
        )),
        function(t, n) {
            var o, a, s, l;
            return d.value ? (openBlock(),
            createElementBlock(Fragment, {
                key: 0
            }, [createBaseVNode("div", _hoisted_1$a, [createBaseVNode("button", {
                class: "flex items-center justify-center rounded-1 bg-on-image-s-black-4 w-32px h-32px mr-8px",
                onClick: x
            }, _hoisted_3$8), createTextVNode(toDisplayString("wechat" === c.value ? unref(i)("wechat_pay") : unref(i)("qq_wallet")), 1)]), createBaseVNode("div", _hoisted_4$8, [createBaseVNode("div", _hoisted_5$7, [createBaseVNode("span", _hoisted_6$7, toDisplayString(((e.consume - unref(_)) / 100).toFixed(2)), 1), createBaseVNode("span", _hoisted_7$7, toDisplayString(unref(i)("yuan")), 1)]), createBaseVNode("div", _hoisted_8$7, [createBaseVNode("img", {
                class: "w-120px h-120px object-contain mt-16px mr-24px",
                src: f.value
            }, null, 8, _hoisted_9$7), createVNode(Scan, {
                class: "text-primary-red-500"
            }), createBaseVNode("div", _hoisted_10$6, [createTextVNode(toDisplayString(unref(i)("scan_to_pay_pre")), 1), createBaseVNode("span", _hoisted_11$6, toDisplayString("wechat" === c.value ? unref(i)("wechat_mobile") : unref(i)("qq_mobile")), 1), _hoisted_12$6, createTextVNode(toDisplayString(unref(i)("scan_to_pay_suff")), 1)])])])], 64)) : (openBlock(),
            createElementBlock(Fragment, {
                key: 1
            }, [createBaseVNode("h2", _hoisted_13$6, toDisplayString(unref(i)("quick_recharge")), 1), withDirectives((openBlock(),
            createElementBlock("div", _hoisted_14$4, [withDirectives((openBlock(),
            createElementBlock("button", {
                disabled: e.consume - unref(_) > 15e4,
                class: normalizeClass(["bg-s-bw-white rounded-8px h-48px text-s-gray-900 font-medium flex items-center px-16px text-s1 flex-1 relative border border-transparent disabled:opacity-30", ["wechat" === c.value && "border-primary-red-500"]]),
                onClick: n[0] || (n[0] = function(e) {
                    return c.value = "wechat"
                }
                )
            }, [_hoisted_16$3, createTextVNode(toDisplayString(unref(i)("wechat")) + " ", 1), "wechat" === c.value ? (openBlock(),
            createElementBlock("span", _hoisted_17$3)) : createCommentVNode("", !0)], 10, _hoisted_15$3)), [[unref(m), {
                e: "quick-recharge:gear",
                ctx: {
                    source: e.source,
                    type: "wechat"
                }
            }, "c"]]), withDirectives((openBlock(),
            createElementBlock("button", {
                disabled: e.consume - unref(_) > 1e7,
                class: normalizeClass([["alipay" === c.value && "border-primary-red-500"], "bg-s-bw-white rounded-8px h-48px text-s-gray-900 font-medium flex items-center px-16px text-s1 ml-12px flex-1 relative border border-transparent disabled:opacity-30"]),
                onClick: n[1] || (n[1] = function(e) {
                    return c.value = "alipay"
                }
                )
            }, [_hoisted_19$3, createTextVNode(toDisplayString(unref(i)("alipay")), 1), "alipay" === c.value ? (openBlock(),
            createElementBlock("span", _hoisted_20$3)) : createCommentVNode("", !0)], 10, _hoisted_18$3)), [[unref(m), {
                e: "quick-recharge:gear",
                ctx: {
                    source: e.source,
                    type: "alipay"
                }
            }, "c"]]), withDirectives((openBlock(),
            createElementBlock("button", {
                disabled: e.consume - unref(_) > 15e4,
                class: normalizeClass([["qq" === c.value && "border-primary-red-500"], "bg-s-bw-white rounded-8px h-48px text-s-gray-900 font-medium flex items-center px-16px text-s1 ml-12px flex-1 relative border border-transparent disabled:opacity-30"]),
                onClick: n[2] || (n[2] = function(e) {
                    return c.value = "qq"
                }
                )
            }, [_hoisted_22$2, createTextVNode(toDisplayString(unref(i)("qq_wallet")), 1), "qq" === c.value ? (openBlock(),
            createElementBlock("span", _hoisted_23$2)) : createCommentVNode("", !0)], 10, _hoisted_21$3)), [[unref(m), {
                e: "quick-recharge:gear",
                ctx: {
                    source: e.source,
                    type: "qq"
                }
            }, "c"]]), withDirectives((openBlock(),
            createElementBlock("a", {
                href: (null === (o = unref(r)) || void 0 === o || null === (a = (s = o.hrefMap).recharge) || void 0 === a ? void 0 : a.call(s)) || (null === (l = unref(r)) || void 0 === l ? void 0 : l.rechargeUrl),
                target: "_blank",
                class: "bg-s-bw-white rounded-8px h-48px text-s-gray-900 font-medium flex items-center px-16px text-s1 ml-12px flex-1"
            }, [_hoisted_25$2, createTextVNode(toDisplayString(unref(i)("go_recharge")), 1), _hoisted_26$2], 8, _hoisted_24$2)), [[unref(m), {
                e: "quick-recharge:gear",
                ctx: {
                    source: e.source,
                    type: "recharge"
                }
            }, "c"]])])), [[unref(m), {
                e: "quick-recharge",
                ctx: e.source
            }, "e"]]), createBaseVNode("div", _hoisted_27$2, [createTextVNode(toDisplayString(unref(i)("consume_desc_pre")), 1), createBaseVNode("span", _hoisted_28$2, toDisplayString(e.consume), 1), createTextVNode(toDisplayString(unref(i)("consume_desc_suff", [unref(i)("l_unit"), String(unref(_))])), 1)]), createBaseVNode("div", _hoisted_29, [createTextVNode(toDisplayString(unref(i)("payment_needed")), 1), createBaseVNode("span", _hoisted_30, toDisplayString(e.consume - unref(_)), 1), createTextVNode(toDisplayString(unref(i)("l_unit")), 1)]), createBaseVNode("div", _hoisted_31, [createBaseVNode("label", _hoisted_32, [createVNode(Checkbox, {
                modelValue: u.value,
                "onUpdate:modelValue": n[3] || (n[3] = function(e) {
                    return u.value = e
                }
                ),
                rounded: ""
            }, null, 8, ["modelValue"]), createTextVNode(toDisplayString(unref(i)("agree")), 1), createBaseVNode("a", _hoisted_33, toDisplayString(unref(i)("terms")), 1)]), withDirectives((openBlock(),
            createBlock(Button, {
                size: "large",
                disabled: !u.value,
                type: "primary",
                onClick: g
            }, {
                default: withCtx((function() {
                    return [createTextVNode(toDisplayString(unref(i)("pay_and_subs")), 1)]
                }
                )),
                _: 1
            }, 8, ["disabled"])), [[unref(m), {
                e: "quick-recharge:pay"
            }, "c"]])])], 64))
        }
    }
})
  , QuickCharge = _export_sfc(_sfc_main$c, [["__scopeId", "data-v-5d5432a0"]])
  , _sfc_main$b = defineComponent({
    __name: "index",
    props: {
        modelValue: {
            type: Boolean
        },
        source: null,
        payload: null,
        consume: null,
        realBalance: {
            type: Boolean
        }
    },
    emits: ["update:model-value"],
    setup: function(e, t) {
        var n = t.emit
          , o = e
          , r = inject(I18N_IO_FUNC_KEY)
          , i = inject(BUS_STATE_KEY)
          , a = ref(!1)
          , s = ref(!1)
          , l = ref(o.source)
          , c = ref(o.payload)
          , u = ref(o.consume)
          , d = useSharedTrack().directive
          , f = null;
        function p(e, t) {
            "_:recharge:update" === e && (s.value = !!t,
            l.value = t.source,
            c.value = t.payload,
            u.value = t.consume)
        }
        function h() {
            a.value = !1
        }
        function m(e) {
            f = e.onCancel,
            "alipay" === e.type && (a.value = !0,
            s.value = !1)
        }
        function _(e) {
            var t = "quick-recharge:problems:click";
            i.emit(t, {
                e: t,
                event: e
            }),
            window.open("https://www.qidian.com/help", "_blank")
        }
        return watch(o, (function(e) {
            s.value = !!e.modelValue,
            l.value = e.source,
            c.value = e.payload,
            u.value = e.consume
        }
        )),
        watch(s, (function(e) {
            var t;
            (n("update:model-value", e),
            e || a.value) || (null === (t = f) || void 0 === t || t())
        }
        )),
        watch(a, (function(e) {
            var t;
            e || (null === (t = f) || void 0 === t || t())
        }
        )),
        onMounted((function() {
            return i.on(p)
        }
        )),
        onUnmounted((function() {
            return i.off(p)
        }
        )),
        function(t, n) {
            return openBlock(),
            createElementBlock(Fragment, null, [createVNode(_sfc_main$1l, {
                "model-value": s.value,
                classes: "bg-sheet-b-gray-50 h-333px !w-600px",
                "show-actions": !1,
                "onUpdate:modelValue": n[1] || (n[1] = function(e) {
                    return s.value = !1
                }
                )
            }, {
                default: withCtx((function() {
                    return [createVNode(QuickCharge, {
                        consume: u.value,
                        source: l.value,
                        payload: c.value,
                        "real-balance": !!e.realBalance,
                        onActive: m,
                        onClose: n[0] || (n[0] = function(e) {
                            return s.value = !1
                        }
                        )
                    }, null, 8, ["consume", "source", "payload", "real-balance"])]
                }
                )),
                _: 1
            }, 8, ["model-value"]), withDirectives((openBlock(),
            createBlock(_sfc_main$1l, {
                warning: "",
                "model-value": a.value,
                "confirm-text": unref(r)("have_problems"),
                title: unref(r)("hint"),
                "onUpdate:modelValue": n[2] || (n[2] = function(e) {
                    return a.value = !1
                }
                ),
                onCancel: h,
                onConfirm: _
            }, {
                default: withCtx((function() {
                    return [createTextVNode(toDisplayString(unref(r)("payment_problems_desc")), 1)]
                }
                )),
                _: 1
            }, 8, ["model-value", "confirm-text", "title"])), [[unref(d), {
                e: "quick-recharge:processing-dialog"
            }, "e"]])], 64)
        }
    }
})
  , _sfc_main$a = {}
  , _hoisted_1$9 = {
    width: "76",
    height: "23",
    viewBox: "0 0 76 23",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
}
  , _hoisted_2$8 = createStaticVNode('<g clip-path="url(#clip0_5841_2333)" fill="currentColor"><path d="M50.75 8.953v3.415c.069.374.317.532.698.565h.583v-.002h8.528c.12 0 .344.042.47-.255.05-.114.271-.766.271-.766h-4.573v-.815h3.606c.105 0 .302.036.414-.225.044-.1.237-.672.237-.672h-4.257v-.805h3.606c.105 0 .302.035.414-.225.044-.1.237-.672.237-.672h-4.257V8.29l.01.001V7.69l3.8-.001c.12-.001.345.04.473-.256.05-.114.271-.766.271-.766h-4.544V5.529h-1.28v1.138H52.86c.263-.368.512-.747.752-1.138h-.002v-.001h-1.443l-.094.145a20.223 20.223 0 0 1-.49.716l-.014.019c-.048.067-.098.132-.146.197a.665.665 0 0 0-.023.031c-.046.06-.092.12-.139.178a6.079 6.079 0 0 1-.205.25l-.127.15-.05.055-.123.136-.06.064c-.039.042-.078.084-.118.124l-.072.073a9.25 9.25 0 0 1-.113.113l-.09.085-.105.1c-.036.032-.072.065-.11.097l-.095.086c-.045.04-.09.08-.136.118l-.079.068-.172.143-.056.046-.213.171-.029.023c-.084.065-.17.133-.26.2v1.076a7.429 7.429 0 0 0 1.703-1.039zm4.697 2.956H52.2c-.112-.003-.154-.036-.169-.082v-.732h3.416v.813zm0-1.71h-3.416v-.804h3.416v.804zm0-2.51v.809h-3.416v-.782l.024-.027h3.392zM61.4 14.77c.12-.002.344.041.47-.256.05-.114.273-.766.273-.766h-5.8v-.446h-1.23c-.002.035-.002.225-.002.446h-5.725s.222.652.272.766c.127.296.351.254.472.255h4.291c-.84.628-2.8 1.71-5.102 2.242.231.614.387 1.034.387 1.034 2.396-.57 4.09-1.455 5.404-2.493v2.56h1.232v-2.587c1.32 1.05 3.026 1.945 5.438 2.52l.386-1.035c-2.3-.53-4.26-1.612-5.1-2.24H61.4zM22.306 8.311h-1.28v9.797h1.28V8.31zM22.295 5.16l-1.014.632 1.554 2.078 1.031-.683-1.57-2.026zM65.565 13.692l.563 1.065c1.981-.827 3.592-2.208 4.473-3.453v3.147c0 .765-.13.662-.542.662h-1.423v1.099h1.753c1.443 0 1.443-.92 1.443-1.864v-3.963h.783c.13-.001.372.043.509-.275.053-.123.291-.824.291-.824h-1.582V7.537h-1.232v1.749h-4.648s.24.701.292.824c.136.318.379.274.508.275h3.26c-1.296 1.582-2.72 2.562-4.448 3.307z"></path><path d="M63.709 5.87v11.332c0 .592.322.789.863.789l-.005.002h.41v-.01h9.162v.01h.417c-.004 0-.006-.002-.006-.002.517 0 .834-.188.859-.729V5.87h-11.7zm10.43 11.044h-9.162V6.94h9.162v9.974zM46.49 8.466c.15 0 .432.05.591-.321.062-.144.341-.962.341-.962h-5.8v-1.99h-1.28v1.991h-5.801s.279.818.341.962c.159.371.44.32.59.32h1.55c.639 2.159 1.543 4.097 2.98 5.71-1.274 1.137-3.009 2.142-5.37 2.68.25.557.48 1.272.48 1.272 2.52-.68 4.416-1.697 5.87-2.976 1.453 1.28 3.35 2.296 5.868 2.976 0 0 .231-.715.484-1.273-2.363-.535-4.098-1.542-5.372-2.678 1.435-1.614 2.34-3.553 2.978-5.709l1.55-.002zm-5.51 4.714c-1.77-2.046-2.304-4.195-2.46-4.713h4.92c-.155.517-.69 2.667-2.46 4.713zM32.038 5.714h-7.27s.25.738.306.866c.145.336.398.289.533.289l5.977.002v9.375c0 .773-.128.67-.546.67h-.952v1.192h1.37c1.456 0 1.456-.928 1.456-1.88V6.804l-.004-.002c.02-.244.024-1.088-.87-1.088z"></path><path d="M30.434 16.331c.06-.145.288-.827.288-.827h-2.034c-.112-.016-.162-.1-.162-.447V13.08H29.767c.193-.004.31-.079.318-.284V9.412h-1.778l.763-1.478h-1.184L27.1 9.412h-.428l-.785-1.478h-1.183l.763 1.478H23.75V12.802c.012.202.129.276.32.28h1.163c-.055.881-.388 2.304-2.375 2.93.444.443.756.994.756.994 1.741-.733 2.686-1.963 2.873-3.925h.8v2.316c0 .552.089 1.256 1.093 1.256h1.463c.15-.002.449.014.592-.322zm-1.626-5.814v1.447h-3.779v-1.447h3.779z"></path></g><path d="M12.69 11.792V3.928l3.501-.24a.132.132 0 0 1 .141.13v8.053a.132.132 0 0 1-.14.131l-3.503-.21zM7.146 16.42V3.11l4.636-1.006a.217.217 0 0 1 .264.212v14.886a.217.217 0 0 1-.264.213l-4.636-.995zM6.507.658c0-.243-.27-.389-.473-.256L.876 3.769a.583.583 0 0 0-.265.488V19c0 .198.1.382.267.49l5.158 3.324a.306.306 0 0 0 .471-.257V.658z" fill="currentColor"></path>', 2)
  , _hoisted_4$7 = [_hoisted_2$8];
function _sfc_render(e, t) {
    return openBlock(),
    createElementBlock("svg", _hoisted_1$9, _hoisted_4$7)
}
var YuewenSymbol = _export_sfc(_sfc_main$a, [["render", _sfc_render]])
  , _hoisted_1$8 = {
    key: 0,
    id: "r-titlePage",
    class: "p-32px border-outline-black-8 border-b"
}
  , _hoisted_2$7 = {
    class: "rounded-28px border border-outline-black-8 text-center py-60px px-32px"
}
  , _hoisted_3$7 = {
    class: "cover relative mx-auto w-120px h-160px rounded-8px after:content-DEFAULT after:inset-0 after:rounded-inherit after:h-inherit after:border after:border-outline-black-8 after:absolute"
}
  , _hoisted_4$6 = ["alt", "src"]
  , _hoisted_5$6 = {
    class: "text-rh3 text-s-gray-900 font-medium mt-20px"
}
  , _hoisted_6$6 = {
    class: "text-bo4 text-s-gray-500 mt-8px"
}
  , _hoisted_7$6 = {
    class: "mt-48px flex justify-center"
}
  , _hoisted_8$6 = {
    class: "flex justify-around min-w-488px"
}
  , _hoisted_9$6 = {
    key: 0,
    class: "flex flex-col items-center px-10px"
}
  , _hoisted_10$5 = {
    class: "text-rh5 font-medium text-s-gray-900"
}
  , _hoisted_11$5 = {
    class: "text-c12 text-s-gray-500 mt-4px"
}
  , _hoisted_12$5 = {
    key: 1,
    class: "flex flex-col items-center px-10px"
}
  , _hoisted_13$5 = {
    class: "text-rh5 font-medium text-s-gray-900"
}
  , _hoisted_14$3 = {
    class: "text-c12 text-s-gray-500 mt-4px"
}
  , _hoisted_15$2 = {
    class: "flex flex-col items-center px-10px"
}
  , _hoisted_16$2 = {
    class: "text-rh5 font-medium text-s-gray-900"
}
  , _hoisted_17$2 = {
    class: "text-c12 text-s-gray-500 mt-4px"
}
  , _hoisted_18$2 = {
    key: 0,
    class: "text-s1 font-medium text-s-gray-900 mt-48px"
}
  , _hoisted_19$2 = {
    key: 1,
    class: "mt-12px text-12px leading-16px text-s-gray-500"
}
  , _hoisted_20$2 = {
    class: "text-bo4 text-s-gray-900 mt-6px"
}
  , _hoisted_21$2 = {
    key: 2,
    class: "mt-6px text-s-gray-500 text-c12"
}
  , _sfc_main$9 = defineComponent({
    __name: "TitlePage",
    props: {
        hideCopyright: {
            type: Boolean
        }
    },
    setup: function(e) {
        var t = inject(FRONT_CONFIG_STATE_KEY)
          , n = inject(CONFIG_STATE_KEY)
          , o = inject(BOOK_STATE_KEY)
          , r = inject(I18N_IO_FUNC_KEY)
          , i = useSlots()
          , a = computed((function() {
            if (null == o || !o.value)
                return null;
            var e = o.value.publishTime;
            if ("number" == typeof e) {
                var t = getDate(e)
                  , n = t.year
                  , r = t.month
                  , i = t.day;
                return "".concat(n, "年").concat(r, "月").concat(i, "日")
            }
            return "string" == typeof e ? e : null
        }
        ));
        return function(s, l) {
            var c, u, d, f, p, h, m, _, v, g, x, y, b, k;
            return unref(t) && unref(o) ? (openBlock(),
            createElementBlock("section", _hoisted_1$8, [createBaseVNode("div", _hoisted_2$7, [createBaseVNode("div", _hoisted_3$7, [createBaseVNode("img", {
                alt: unref(o).title,
                src: (null === (c = (u = unref(t)).coverUrl) || void 0 === c ? void 0 : c.call(u, unref(t).bid)) || unref(bookCoverUrl)(unref(t).bid, 180),
                class: "w-full rounded-inherit mx-auto"
            }, null, 8, _hoisted_4$6)]), createBaseVNode("h1", _hoisted_5$6, toDisplayString(unref(o).title), 1), createBaseVNode("div", _hoisted_6$6, [unref(o).authorName ? (openBlock(),
            createBlock(resolveDynamicComponent(unref(t).hrefMap.author ? _sfc_main$1b : "span"), {
                key: 0,
                href: null === (d = unref(t)) || void 0 === d || null === (f = (p = d.hrefMap).author) || void 0 === f ? void 0 : f.call(p),
                class: normalizeClass((null === (h = unref(t)) || void 0 === h ? void 0 : h.hrefMap.author) && "hover:text-s-gray-700")
            }, {
                default: withCtx((function() {
                    return [createTextVNode(toDisplayString(unref(o).authorName), 1)]
                }
                )),
                _: 1
            }, 8, ["href", "class"])) : createCommentVNode("", !0), createTextVNode(" " + toDisplayString(unref(r)("write")), 1)]), createBaseVNode("div", _hoisted_7$6, [createBaseVNode("div", _hoisted_8$6, [null !== (m = unref(o).categoryList) && void 0 !== m && m[0] ? (openBlock(),
            createElementBlock("div", _hoisted_9$6, [createBaseVNode("div", _hoisted_10$5, toDisplayString(null === (_ = unref(o).categoryList) || void 0 === _ || null === (v = _[0]) || void 0 === v ? void 0 : v.tagName), 1), createBaseVNode("div", _hoisted_11$5, toDisplayString(unref(r)("category")), 1)])) : createCommentVNode("", !0), unref(a) ? (openBlock(),
            createElementBlock("div", _hoisted_12$5, [createBaseVNode("div", _hoisted_13$5, toDisplayString(unref(a)), 1), createBaseVNode("div", _hoisted_14$3, toDisplayString(unref(r)("publish_time")), 1)])) : createCommentVNode("", !0), createBaseVNode("div", _hoisted_15$2, [createBaseVNode("div", _hoisted_16$2, toDisplayString(unref(formatNumber2)(unref(o).wordCount)), 1), createBaseVNode("div", _hoisted_17$2, toDisplayString("string" == typeof unref(o).status ? unref(o).status : unref(o).status ? unref(r)("finished") : unref(r)("serial")) + " " + toDisplayString(unref(r)("status_word_count")), 1)])])]), unref(o).fansCount ? (openBlock(),
            createElementBlock("div", _hoisted_18$2, toDisplayString(unref(r)("fans_count_desc", [String(unref(o).fansCount), unref(o).title, (null === (g = unref(o).categoryList) || void 0 === g || null === (x = g[0]) || void 0 === x ? void 0 : x.tagName) || ""])), 1)) : createCommentVNode("", !0), unref(i)["fans-below"] ? (openBlock(),
            createElementBlock("div", _hoisted_19$2, [renderSlot(s.$slots, "fans-below", {}, void 0, !0)])) : createCommentVNode("", !0), createVNode(YuewenSymbol, {
                class: "text-s-gray-500 mt-80px mx-auto"
            }), createBaseVNode("div", _hoisted_20$2, toDisplayString(unref(r)("publication_desc", null === (y = unref(n)) || void 0 === y || null === (b = y.brand) || void 0 === b || null === (k = b.name) || void 0 === k ? void 0 : k.data)), 1), e.hideCopyright ? createCommentVNode("", !0) : (openBlock(),
            createElementBlock("div", _hoisted_21$2, toDisplayString(unref(r)("copyright_desc")), 1))])])) : createCommentVNode("", !0)
        }
    }
})
  , TitlePage = _export_sfc(_sfc_main$9, [["__scopeId", "data-v-b2769519"]]);
function reportUrl(e, t, n, o) {
    var r = inject(FRONT_CONFIG_STATE_KEY)
      , i = inject(READER_STATE_KEY, defaultReaderState).deviceType === PlatformType.Mobile ? "h5" : "report";
    return null != r && r.value ? "https://jubao.yuewen.com/".concat(i, "/report?type=").concat(e, "&id=").concat(t, "&appId=").concat(r.value.appId, "&areaId=").concat(r.value.areaId, "&site=").concat(r.value.appId, "&extra=").concat(n || "").concat(o ? "&".concat(o) : "") : "https://jubao.yuewen.com"
}
var _hoisted_1$4 = {
    class: "text-s-gray-500 text-s3 line-clamp-2"
}
  , _hoisted_2$4 = {
    class: "font-medium text-s-gray-700"
}
  , _hoisted_3$4 = {
    key: 0,
    class: "ml-2px inline-flex items-center pl-17px pr-4px font-medium text-t2 text-on-image-bw-white rounded-4px h-16px review-writer flex-shrink-0 align-text-bottom"
}
  , _hoisted_4$3 = {
    class: "mx-4px"
}
  , _hoisted_5$3 = {
    class: "font-medium text-s-gray-700"
}
  , _hoisted_6$3 = createBaseVNode("span", {
    class: "font-medium text-s-gray-700"
}, "：", -1)
  , _hoisted_7$3 = ["innerHTML"]
  , _hoisted_8$3 = ["href"]
  , _hoisted_9$3 = createBaseVNode("span", {
    class: "icon-photo text-20px mr-4px"
}, null, -1)
  , _sfc_main$4 = defineComponent({
    __name: "MobileReply",
    props: {
        fromAuthor: {
            type: Boolean
        },
        nickname: null,
        content: null,
        replyTo: null,
        img: null
    },
    setup: function(e) {
        var t = e
          , n = inject(FRONT_CONFIG_STATE_KEY)
          , o = inject(I18N_IO_FUNC_KEY)
          , r = computed((function() {
            return t.content.replace(/\[fn=([0-9]+)\]/g, '<i class="icon-emoji w-20px h-20px icon-emoji-$1"></i>')
        }
        ));
        return function(t, i) {
            var a, s, l, c;
            return openBlock(),
            createElementBlock(Fragment, null, [createBaseVNode("p", _hoisted_1$4, [createBaseVNode("span", _hoisted_2$4, toDisplayString(e.nickname), 1), e.fromAuthor ? (openBlock(),
            createElementBlock("span", _hoisted_3$4, toDisplayString(unref(o)("author")), 1)) : createCommentVNode("", !0), e.replyTo ? (openBlock(),
            createElementBlock(Fragment, {
                key: 1
            }, [createBaseVNode("span", _hoisted_4$3, toDisplayString(unref(o)("reply")), 1), createBaseVNode("span", _hoisted_5$3, toDisplayString(e.replyTo), 1)], 64)) : createCommentVNode("", !0), _hoisted_6$3, createBaseVNode("span", {
                innerHTML: unref(r)
            }, null, 8, _hoisted_7$3)]), e.img ? (openBlock(),
            createElementBlock("a", {
                key: 0,
                href: (null === (a = unref(n)) || void 0 === a || null === (s = (l = a.hrefMap).download) || void 0 === s ? void 0 : s.call(l)) || (null === (c = unref(n)) || void 0 === c ? void 0 : c.downloadUrl),
                class: "text-secondary-blue-500 flex items-center text-bo4",
                onClick: i[0] || (i[0] = withModifiers((function(e) {
                    var t, o;
                    return null === (t = unref(n)) || void 0 === t || null === (o = t.onDownload) || void 0 === o ? void 0 : o.call(t, "review:image")
                }
                ), ["prevent"]))
            }, [_hoisted_9$3, createTextVNode(toDisplayString(unref(o)("check_image")), 1)], 8, _hoisted_8$3)) : createCommentVNode("", !0)], 64)
        }
    }
})
  , _hoisted_1$3 = {
    class: "emoji-panel flex flex-col items-center"
}
  , _hoisted_2$3 = {
    class: "w-332px pb-8px pr-8px pt-4px pl-4px rounded-8px bg-sheet-b-bw-white"
}
  , _hoisted_3$3 = ["title", "onClick"]
  , _sfc_main$3 = defineComponent({
    __name: "EmojiPanel",
    emits: ["select"],
    setup: function(e) {
        var t = ["鼓掌", "玫瑰", "握手", "龇牙", "憨笑", "可怜", "可爱", "坏笑", "亲亲", "挖鼻孔", "流鼻涕", "大哭", "晕", "滴汗", "鄙视", "惊恐", "尴尬", "嘘", "哭", "雷", "色", "敲", "糗", "折磨", "抱抱", "吐舌", "感谢", "抓狂", "奋斗", "骷髅", "微笑", "得意", "偷笑", "擦汗", "强", "酷", "尴尬", "快哭了", "疑问", "难过", "哈欠", "吻", "害羞", "咒骂", "睡着了", "大兵", "发怒", "猪头", "困", "闭嘴", "吐", "晚安", "心", "刀", "礼物", "心碎", "加油", "阴险", "胜利", "懵"];
        return function(e, n) {
            return openBlock(),
            createElementBlock("div", _hoisted_1$3, [createBaseVNode("ul", _hoisted_2$3, [(openBlock(),
            createElementBlock(Fragment, null, renderList(64, (function(n) {
                return createBaseVNode("li", {
                    key: n,
                    class: "inline-block mt-4px ml-4px"
                }, [createBaseVNode("button", {
                    title: t[n - 1],
                    class: normalizeClass(["icon-emoji rounded-8px w-36px h-36px align-bottom", "icon-emoji-".concat(n)]),
                    onClick: function(t) {
                        return e.$emit("select", n)
                    }
                }, null, 10, _hoisted_3$3)])
            }
            )), 64))]), createVNode(Triangle, {
                class: "text-sheet-b-bw-white transform rotate-180"
            })])
        }
    }
})
  , EmojiPanel = _export_sfc(_sfc_main$3, [["__scopeId", "data-v-29dfa5ee"]])
  , _withScopeId$1 = function(e) {
    return pushScopeId("data-v-7ae63af5"),
    e = e(),
    popScopeId(),
    e
}
  , _hoisted_1$2 = ["maxlength", "placeholder"]
  , _hoisted_2$2 = {
    key: 0,
    class: "flex items-center px-16px pt-8px flex-wrap"
}
  , _hoisted_3$2 = ["src"]
  , _hoisted_4$2 = {
    class: "image-del-container absolute top-0 right-0 w-28px h-28px flex items-start justify-end"
}
  , _hoisted_5$2 = ["onClick"]
  , _hoisted_6$2 = _withScopeId$1((function() {
    return createBaseVNode("span", {
        class: "icon-close-bold text-on-image-bw-white text-12px"
    }, null, -1)
}
))
  , _hoisted_7$2 = [_hoisted_6$2]
  , _hoisted_8$2 = {
    class: "p-12px pt-8px flex items-center flex-shrink-0"
}
  , _hoisted_9$2 = _withScopeId$1((function() {
    return createBaseVNode("button", {
        class: "emoji-trigger w-32px h-32px flex items-center justify-center rounded-8px hover-4 active-8"
    }, [createBaseVNode("span", {
        class: "icon-smile text-24px text-s-gray-900 pointer-events-none"
    })], -1)
}
))
  , _hoisted_10$2 = _withScopeId$1((function() {
    return createBaseVNode("span", {
        class: "icon-photo text-24px text-s-gray-900"
    }, null, -1)
}
))
  , _hoisted_11$2 = ["disabled", "multiple", "accept"]
  , _hoisted_12$2 = {
    class: "text-s-gray-500 text-c12 ml-auto"
}
  , _hoisted_13$2 = {
    class: "text-s-gray-900"
}
  , _sfc_main$2 = defineComponent({
    __name: "ReviewInput",
    props: {
        reply: {
            type: Boolean,
            default: !1
        },
        parentReviewId: {
            default: ""
        },
        placeholder: {
            default: "写下你的想法..."
        },
        maxLength: null
    },
    emits: ["cancel", "reply", "emoji:over", "emoji:leave"],
    setup: function(e, t) {
        var n = t.emit
          , o = e
          , r = inject(USER_STATE_KEY)
          , i = inject(REVIEW_LIST_KEY)
          , a = inject(I18N_IO_FUNC_KEY)
          , s = inject(ADAPTERS_KEY)
          , l = ref()
          , c = ref("")
          , u = ref([])
          , d = ref(o.reply)
          , f = ref(!1)
          , p = ref(!1)
          , h = !1
          , m = useSharedTrack().directive;
        function _() {
            o.reply && (i.emojiActive = !0),
            p.value = !0
        }
        function v() {
            o.reply && (i.emojiActive = !1),
            p.value = !1
        }
        function g(e) {
            var t = e.target;
            t && (t.style.height = "0",
            t.style.height = "".concat(Math.max(56, t.scrollHeight), "px"),
            t.offsetHeight > 170 ? t.style.overflow = "auto" : t.style.overflow = "hidden")
        }
        function x(e) {
            if (!d.value) {
                if (!i.adapters.processInputAccess)
                    return d.value = !0;
                var t = useToast({
                    title: a("loading"),
                    type: "loading"
                }).stop;
                i.adapters.processInputAccess().then((function() {
                    t(),
                    d.value = !0
                }
                )).catch((function() {
                    e.target.blur(),
                    t()
                }
                ))
            }
        }
        function y(e) {
            var t = e.relatedTarget;
            !o.reply && (!t || !t.classList.contains("icon-emoji") && !t.classList.contains("reply-publish") && t.classList.contains("emoji-trigger"))
        }
        function b() {
            n("cancel"),
            o.reply || (d.value = !1)
        }
        function k(e) {
            i.adapters.processUploadAccess && !h && (e.preventDefault(),
            i.adapters.processUploadAccess().then((function() {
                h = !0,
                e.target.dispatchEvent(new MouseEvent("click",{
                    view: window,
                    bubbles: !1,
                    cancelable: !0
                }))
            }
            )))
        }
        function w(e) {
            var t, n, o, r, s, l = e.target;
            if (null !== (t = l.files) && void 0 !== t && t.length) {
                var c = Array.from(l.files);
                if (null !== (n = i.uploadImagesParams) && void 0 !== n && n.count) {
                    var d = i.uploadImagesParams.count;
                    if (c.length > d)
                        return void useToast({
                            title: a("review_images_over_limit", d.toString())
                        })
                }
                if (null !== (o = i.uploadImagesParams) && void 0 !== o && o.maxSize) {
                    var f = c.some((function(e) {
                        return e.size > i.uploadImagesParams.maxSize
                    }
                    ))
                      , p = (i.uploadImagesParams.maxSize / 1024 / 1024).toFixed(1);
                    if (f)
                        return void useToast({
                            title: a("review_images_upload_failed", p)
                        })
                }
                null === (r = (s = i.adapters).processImagesUpload) || void 0 === r || r.call(s, c).then((function(e) {
                    Array.isArray(e) && (u.value = e)
                }
                ))
            }
        }
        function E() {
            var e, t, a, l;
            if (null === (e = r.value) || void 0 === e || !e.id)
                return null === (l = s.processLogin) || void 0 === l ? void 0 : l.call(s);
            f.value || (f.value = !0,
            null === (t = (a = i.adapters).processSubmit) || void 0 === t || t.call(a, i.chapterId, i.index, c.value, o.parentReviewId, u.value).then((function(e) {
                f.value = !1,
                c.value = "",
                u.value = [],
                n("reply", e)
            }
            )).catch((function() {
                f.value = !1
            }
            )))
        }
        return watch(d, (function(e) {
            !e && l.value && (l.value.scrollTop = 0)
        }
        )),
        function(t, n) {
            var r, s;
            return openBlock(),
            createElementBlock("div", {
                class: normalizeClass(["bg-s-gray-100 rounded-8px flex-1 flex flex-col transition-all duration-300", [d.value ? "pt-6px" : "max-h-36px overflow-hidden"]])
            }, [withDirectives(createBaseVNode("textarea", {
                ref_key: "$input",
                ref: l,
                "onUpdate:modelValue": n[0] || (n[0] = function(e) {
                    return c.value = e
                }
                ),
                maxlength: e.maxLength,
                placeholder: e.placeholder,
                class: normalizeClass(["text-bo4 resize-none outline-none block bg-transparent text-s-gray-900 placeholder-s-gray-400 caret-primary-red-500 min-h-3em px-16px leading-24px py-6px", [d.value ? "max-h-12em reader-scrollbar" : "overflow-hidden"]]),
                onFocus: x,
                onInput: g,
                onBlur: y
            }, null, 42, _hoisted_1$2), [[vModelText, c.value]]), u.value.length ? (openBlock(),
            createElementBlock("div", _hoisted_2$2, [(openBlock(!0),
            createElementBlock(Fragment, null, renderList(u.value, (function(e, t) {
                return openBlock(),
                createElementBlock("div", {
                    key: e,
                    class: "w-64px h-64px rounded-6px overflow-hidden relative mb-8px"
                }, [createBaseVNode("img", {
                    src: e,
                    class: "w-full h-full object-cover rounded-6px"
                }, null, 8, _hoisted_3$2), createBaseVNode("div", _hoisted_4$2, [createBaseVNode("button", {
                    class: "w-20px h-20px flex items-center justify-center",
                    onClick: function(e) {
                        return function(e) {
                            u.value.splice(e, 1)
                        }(t)
                    }
                }, _hoisted_7$2, 8, _hoisted_5$2)])])
            }
            )), 128))])) : createCommentVNode("", !0), createBaseVNode("div", _hoisted_8$2, [createBaseVNode("div", {
                class: "relative",
                onMouseenter: _,
                onMouseleave: v
            }, [_hoisted_9$2, withDirectives(createVNode(EmojiPanel, {
                class: "absolute bottom-full left-1/2 transform -translate-x-1/2 z-100",
                onSelect: n[1] || (n[1] = function(e) {
                    return function(e) {
                        p.value = !1,
                        o.reply && (i.emojiActive = !1),
                        "[fn=".concat(e, "]").length + c.value.length > o.maxLength || (c.value += "[fn=".concat(e, "]"))
                    }(e)
                }
                )
            }, null, 512), [[vShow, p.value]])], 32), unref(i).adapters.processImagesUpload ? (openBlock(),
            createElementBlock("label", {
                key: 0,
                class: normalizeClass([[u.value.length ? "opacity-30" : "hover-4 active-8 cursor-pointer"], "upload-images w-32px h-32px flex items-center justify-center rounded-8px ml-4px relative"])
            }, [_hoisted_10$2, createBaseVNode("input", {
                disabled: !!u.value.length,
                class: "w-0 h-0 opacity-0 invisible absolute top-0 left-0 pointer-events-none",
                type: "file",
                multiple: !!(null !== (r = unref(i).uploadImagesParams) && void 0 !== r && r.count && unref(i).uploadImagesParams.count > 1),
                accept: (null === (s = unref(i).uploadImagesParams) || void 0 === s ? void 0 : s.accept) || "image/*",
                onChange: w,
                onClick: k
            }, null, 40, _hoisted_11$2)], 2)) : createCommentVNode("", !0), createBaseVNode("span", _hoisted_12$2, [createBaseVNode("span", _hoisted_13$2, toDisplayString(c.value.trim().length), 1), createTextVNode("/" + toDisplayString(e.maxLength), 1)]), createVNode(Button, {
                type: "secondary-g",
                class: "ml-12px w-56px",
                onClick: b
            }, {
                default: withCtx((function() {
                    return [createTextVNode(toDisplayString(unref(a)("review_cancel")), 1)]
                }
                )),
                _: 1
            }), withDirectives((openBlock(),
            createBlock(Button, {
                class: "reply-publish ml-12px w-56px",
                disabled: !c.value.trim().length,
                loading: f.value,
                onClick: E
            }, {
                default: withCtx((function() {
                    return [createTextVNode(toDisplayString(unref(a)(e.reply ? "reply" : "review_publish")), 1)]
                }
                )),
                _: 1
            }, 8, ["disabled", "loading"])), [[unref(m), {
                e: "review:submit"
            }, "c"]])])], 2)
        }
    }
})
  , ReviewInput = _export_sfc(_sfc_main$2, [["__scopeId", "data-v-7ae63af5"]])
  , _hoisted_1$1 = {
    class: "group"
}
  , _hoisted_2$1 = {
    class: "flex items-center py-1px"
}
  , _hoisted_3$1 = ["href"]
  , _hoisted_4$1 = ["alt", "src"]
  , _hoisted_5$1 = {
    class: "font-medium text-s-gray-500 text-s3 truncate mr-4px"
}
  , _hoisted_6$1 = {
    key: 0,
    class: "mr-4px inline-flex items-center pl-17px pr-4px font-medium text-t2 text-on-image-bw-white rounded-4px h-16px review-writer flex-shrink-0"
}
  , _hoisted_7$1 = createBaseVNode("span", {
    class: "icon-trash text-16px mr-2px"
}, null, -1)
  , _hoisted_8$1 = ["href"]
  , _hoisted_9$1 = createBaseVNode("span", {
    class: "icon-warning text-16px mr-2px"
}, null, -1)
  , _hoisted_10$1 = {
    key: 0,
    class: "inline-flex w-30px h-18px items-center justify-center overflow-hidden mr-4px align-text-bottom"
}
  , _hoisted_11$1 = {
    class: "whitespace-nowrap text-primary-red-500 text-20px font-medium h-32px flex items-center px-8px rounded-8px border border-primary-red-300 transform scale-50"
}
  , _hoisted_12$1 = {
    key: 1
}
  , _hoisted_13$1 = ["href"]
  , _hoisted_14 = ["innerHTML"]
  , _hoisted_15 = ["src"]
  , _hoisted_16 = ["href"]
  , _hoisted_17 = createBaseVNode("span", {
    class: "icon-photo text-20px mr-4px"
}, null, -1)
  , _hoisted_18 = {
    key: 1,
    class: "text-primary-red-500 inline-flex items-center rounded-4px bg-s-gray-100 py-2px px-4px text-c12 mt-4px"
}
  , _hoisted_19 = createBaseVNode("span", {
    class: "icon-thump-up-fill text-16px mr-4px"
}, null, -1)
  , _hoisted_20 = {
    class: "flex items-center mt-4px text-c12 text-s-gray-400"
}
  , _hoisted_21 = {
    class: "truncate"
}
  , _hoisted_22 = {
    key: 0
}
  , _hoisted_23 = {
    key: 0
}
  , _hoisted_24 = {
    key: 1,
    class: "mt-8px bg-s-gray-100 rounded-8px px-12px py-10px"
}
  , _hoisted_25 = ["href"]
  , _hoisted_26 = createBaseVNode("span", {
    class: "icon-arrow-up-bold transform rotate-90 text-10px ml-4px"
}, null, -1)
  , _hoisted_27 = createBaseVNode("span", {
    class: "icon-arrow-up-bold transform rotate-180 text-s-gray-400 text-10px ml-4px"
}, null, -1)
  , _hoisted_28 = ["src"]
  , _sfc_main$1 = defineComponent({
    __name: "Review",
    props: {
        data: null,
        isReply: {
            type: Boolean,
            default: !1
        },
        maxLength: null
    },
    emits: ["update", "delete"],
    setup: function(e, t) {
        var n = t.emit
          , o = e
          , r = inject(USER_STATE_KEY)
          , i = inject(BOOK_STATE_KEY)
          , a = inject(FRONT_CONFIG_STATE_KEY)
          , s = inject(REVIEW_LIST_KEY)
          , l = inject(READER_STATE_KEY, defaultReaderState)
          , c = inject(I18N_IO_FUNC_KEY)
          , u = inject(ADAPTERS_KEY)
          , d = ref(!1)
          , f = ref(!1)
          , p = ref(!1)
          , h = ref(!1)
          , m = ref(!1)
          , _ = ref(!1)
          , v = ref(null)
          , g = 0
          , x = 0
          , y = 0
          , b = !1
          , k = computed((function() {
            return o.data.content.replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;").replace(/\[fn=([1-9]|[1-5][0-9]|6[0-4])\]/gm, '<i class="icon-emoji w-22px h-22px icon-emoji-$1"></i>')
        }
        ));
        function w() {
            var e, t;
            if (l.deviceType === PlatformType.Mobile)
                return null === (e = a.value) || void 0 === e || null === (t = e.onDownload) || void 0 === t ? void 0 : t.call(e, "review:reply");
            if (s.activeReplyId && s.activeReplyId === o.data.id)
                s.activeReplyId = "";
            else {
                if (!s.adapters.processInputAccess)
                    return s.activeReplyId = o.data.id;
                var n = useToast({
                    title: c("loading"),
                    type: "loading"
                }).stop;
                s.adapters.processInputAccess().then((function() {
                    n(),
                    s.activeReplyId = o.data.id
                }
                )).catch(n)
            }
        }
        function E() {
            var e, t, i, c, d, f;
            return l.deviceType === PlatformType.Mobile ? null === (c = a.value) || void 0 === c || null === (d = c.onDownload) || void 0 === d ? void 0 : d.call(c, "review:like") : null !== (e = r.value) && void 0 !== e && e.id ? void (null === (t = (i = s.adapters).processLikeReview) || void 0 === t || t.call(i, s.chapterId, o.data.id, "like" === o.data.status).then((function() {
                return n("update", {
                    likeCount: o.data.likeCount + ("like" === o.data.status ? -1 : 1),
                    status: "like" === o.data.status ? "none" : "like"
                })
            }
            ))) : null === (f = u.processLogin) || void 0 === f ? void 0 : f.call(u)
        }
        function S() {
            var e, t, i, a;
            if (null === (e = r.value) || void 0 === e || !e.id)
                return null === (a = u.processLogin) || void 0 === a ? void 0 : a.call(u);
            null === (t = (i = s.adapters).processDislikeReview) || void 0 === t || t.call(i, s.chapterId, o.data.id, "dislike" === o.data.status).then((function() {
                return n("update", {
                    likeCount: o.data.likeCount + ("like" === o.data.status ? -1 : 0),
                    status: "dislike" === o.data.status ? "none" : "dislike"
                })
            }
            ))
        }
        function C(e) {
            var t;
            s.activeReplyId = "";
            var r = [];
            if (null !== (t = o.data.replies) && void 0 !== t && t.length) {
                r = _toConsumableArray(o.data.replies);
                for (var i = 0; i < r.length; i++)
                    if (!r[i].tag) {
                        r.splice(i, 0, e);
                        break
                    }
            } else
                r.push(e);
            n("update", {
                replies: r
            })
        }
        function B() {
            var e, t;
            p.value || f.value || (g += 1,
            f.value = !0,
            null === (e = (t = s.adapters).processReplyList) || void 0 === e || e.call(t, s.chapterId, o.data.id, g).then((function(e) {
                f.value = !1,
                d.value = !0,
                p.value = e.end,
                n("update", {
                    replies: o.data.replies ? [].concat(_toConsumableArray(o.data.replies), _toConsumableArray(e.list)) : e.list
                })
            }
            )).catch((function() {
                f.value = !1
            }
            )))
        }
        function T() {
            var e, t;
            null === (e = (t = s.adapters).processDelete) || void 0 === e || e.call(t, s.chapterId, o.data.id).then((function() {
                return n("delete")
            }
            )).catch(handleError)
        }
        function $() {
            m.value = !0
        }
        function N(e) {
            if (!_.value) {
                var t = e.currentTarget.getBoundingClientRect()
                  , n = t.top
                  , o = t.left;
                x = o,
                y = n,
                h.value = !0,
                nextTick((function() {
                    v.value && (v.value.style.visibility = "invisible",
                    v.value.onload = function() {
                        v.value.style.visibility = "visible";
                        var e = document.documentElement
                          , t = e.clientWidth
                          , r = e.clientHeight
                          , i = v.value
                          , a = i.naturalWidth
                          , s = i.naturalHeight;
                        v.value.style.left = "".concat(o, "px"),
                        v.value.style.top = "".concat(n, "px");
                        var l = a
                          , c = s;
                        if (l > .8 * t) {
                            var u = .8 * t / l;
                            l = .8 * t,
                            c = s * u
                        }
                        if (c > .8 * r) {
                            var d = .8 * r / c;
                            c = .8 * r,
                            l *= d
                        }
                        setTimeout((function() {
                            v.value && (v.value.style.maxWidth = "".concat(l, "px"),
                            v.value.style.maxHeight = "".concat(c, "px"),
                            v.value.style.left = "calc(50vw - ".concat(l / 2, "px)"),
                            v.value.style.top = "calc(50vh - ".concat(c / 2, "px)"),
                            b = !0)
                        }
                        ), 0)
                    }
                    )
                }
                ))
            }
        }
        function A() {
            b = !1,
            v.value && (v.value.style.maxWidth = "200px",
            v.value.style.maxHeight = "200px",
            v.value.style.left = "".concat(x, "px"),
            v.value.style.top = "".concat(y, "px"))
        }
        function O() {
            b || (h.value = !1)
        }
        return function(t, r) {
            var u, f, g, x, y, b, V, D, R, I, j, L, P, F, U, M, K, Y = resolveComponent("Review", !0);
            return openBlock(),
            createElementBlock(Fragment, null, [createBaseVNode("div", null, [createBaseVNode("div", _hoisted_1$1, [createBaseVNode("div", _hoisted_2$1, [createBaseVNode("a", {
                target: "_blank",
                href: null === (u = unref(a)) || void 0 === u || null === (f = (g = u.hrefMap).people) || void 0 === f ? void 0 : f.call(g, e.data.userId),
                class: "flex items-center min-w-0"
            }, [createBaseVNode("img", {
                class: normalizeClass([[e.isReply ? "w-24px h-24px mr-4px" : "w-28px h-28px mr-10px"], "rounded-1 border border-outline-black-8"]),
                alt: e.data.nickname,
                src: e.data.avatar
            }, null, 10, _hoisted_4$1), createBaseVNode("div", {
                class: normalizeClass([[!e.isReply && "self-start pt-1px"], "flex items-center"])
            }, [createBaseVNode("span", _hoisted_5$1, toDisplayString(e.data.nickname), 1), e.data.fromAuthor ? (openBlock(),
            createElementBlock("span", _hoisted_6$1, toDisplayString(unref(c)("author")), 1)) : createCommentVNode("", !0)], 2)], 8, _hoisted_3$1), e.data.self && unref(s).adapters.processDelete ? (openBlock(),
            createElementBlock("button", {
                key: 0,
                class: "group-hover:flex hidden ml-auto text-s-gray-500 text-s4 items-center font-medium flex-shrink-0 p-0",
                onClick: $
            }, [_hoisted_7$1, createTextVNode(toDisplayString(unref(c)("review_delete")), 1)])) : unref(l).deviceType === unref(PlatformType).PC && null !== (x = unref(i)) && void 0 !== x && x.cbid ? (openBlock(),
            createElementBlock("a", {
                key: 1,
                target: "_blank",
                href: unref(reportUrl)("0", e.data.id, unref(i).cbid, "subType=7&desc=1"),
                class: "group-hover:flex hidden ml-auto text-s-gray-500 text-s4 items-center font-medium flex-shrink-0"
            }, [_hoisted_9$1, createTextVNode(toDisplayString(unref(c)("report")), 1)], 8, _hoisted_8$1)) : createCommentVNode("", !0)]), createBaseVNode("div", {
                class: normalizeClass([!e.isReply && "pl-38px"])
            }, [createBaseVNode("p", {
                class: normalizeClass([[e.isReply && "mt-4px"], "text-s-gray-900 text-16px leading-24px"])
            }, [e.data.tag ? (openBlock(),
            createElementBlock("span", _hoisted_10$1, [createBaseVNode("span", _hoisted_11$1, toDisplayString(e.data.tag), 1)])) : createCommentVNode("", !0), e.data.replyTo ? (openBlock(),
            createElementBlock("span", _hoisted_12$1, [createTextVNode(toDisplayString(unref(c)("reply")), 1), createBaseVNode("a", {
                target: "_blank",
                href: null === (y = unref(a)) || void 0 === y || null === (b = (V = y.hrefMap).people) || void 0 === b ? void 0 : b.call(V, e.data.replyTo.id),
                class: "font-medium text-s-gray-500 ml-4px inline-block"
            }, toDisplayString(e.data.replyTo.nickname), 9, _hoisted_13$1), createTextVNode("：")])) : createCommentVNode("", !0), createBaseVNode("span", {
                class: "leading-24px whitespace-pre-wrap",
                innerHTML: unref(k)
            }, null, 8, _hoisted_14)], 2), e.data.img ? (openBlock(),
            createElementBlock(Fragment, {
                key: 0
            }, [unref(l).deviceType === unref(PlatformType).PC ? (openBlock(),
            createElementBlock("img", {
                key: 0,
                class: normalizeClass(["max-w-200px max-h-200px mt-8px cursor-zoom-in", [h.value && "invisible", !_.value && "cursor-zoom-in"]]),
                src: _.value ? "data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_10815_11266)'%3E%3Cpath opacity='.16' fill='%23CCC' d='M0 0h120v120H0z'/%3E%3Cpath d='M46.666 53.335a4 4 0 0 1 4-4h18.667a4 4 0 0 1 4 4V58a1.333 1.333 0 0 1-2.666 0v-4.666c0-.737-.597-1.334-1.334-1.334H50.667c-.737 0-1.334.597-1.334 1.334v6.78l1.562-1.561a5.333 5.333 0 0 1 7.543 0l3.171 3.171a1.333 1.333 0 0 1-1.885 1.886l-3.172-3.172a2.667 2.667 0 0 0-3.771 0l-3.448 3.448v2.781c0 .736.597 1.333 1.334 1.333h10a1.333 1.333 0 1 1 0 2.667h-10a4 4 0 0 1-4-4V53.335z' fill='%23ADADAD'/%3E%3Cpath d='M67.333 56.335a1.667 1.667 0 1 1-3.333 0 1.667 1.667 0 0 1 3.333 0zM68.666 72.001a6 6 0 1 0 0-12 6 6 0 0 0 0 12zm1-9.066V65.6a1 1 0 1 1-2 0v-2.666a1 1 0 1 1 2 0zm.067 6a1.067 1.067 0 1 1-2.133 0 1.067 1.067 0 0 1 2.133 0z' fill='%23ADADAD'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_10815_11266'%3E%3Crect width='120' height='120' rx='6' fill='%23fff'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E" : e.data.img,
                onError: r[0] || (r[0] = function(e) {
                    return _.value = !0
                }
                ),
                onClick: N
            }, null, 42, _hoisted_15)) : (openBlock(),
            createElementBlock("a", {
                key: 1,
                href: (null === (D = unref(a)) || void 0 === D || null === (R = (I = D.hrefMap).download) || void 0 === R ? void 0 : R.call(I)) || (null === (j = unref(a)) || void 0 === j ? void 0 : j.downloadUrl),
                class: "text-secondary-blue-500 flex items-center text-bo4 mt-4px",
                onClick: r[1] || (r[1] = withModifiers((function(e) {
                    var t, n;
                    return null === (t = unref(a)) || void 0 === t || null === (n = t.onDownload) || void 0 === n ? void 0 : n.call(t, "review:image")
                }
                ), ["prevent"]))
            }, [_hoisted_17, createTextVNode(toDisplayString(unref(c)("check_image")), 1)], 8, _hoisted_16))], 64)) : createCommentVNode("", !0), e.data.authorLike ? (openBlock(),
            createElementBlock("div", _hoisted_18, [_hoisted_19, createTextVNode(toDisplayString(unref(c)("author_like_review", null === (L = unref(i)) || void 0 === L ? void 0 : L.authorName)), 1)])) : createCommentVNode("", !0), createBaseVNode("div", _hoisted_20, [createBaseVNode("span", _hoisted_21, [e.data.floor ? (openBlock(),
            createElementBlock("span", _hoisted_22, toDisplayString(unref(c)("floor", String(e.data.floor))), 1)) : createCommentVNode("", !0), createTextVNode(toDisplayString(e.data.time) + " " + toDisplayString(e.data.location), 1)]), createBaseVNode("button", {
                class: "flex-shrink-0 ml-4px mr-auto text-secondary-blue-500 font-medium h-28px",
                onClick: w
            }, toDisplayString(unref(c)("reply")), 1), unref(l).deviceType === unref(PlatformType).PC ? (openBlock(),
            createElementBlock("button", {
                key: 0,
                class: "hidden flex-shrink-0 ml-8px items-center text-c12 text-s-gray-500 group-hover:flex h-28px",
                onClick: S
            }, [createBaseVNode("span", {
                class: normalizeClass(["dislike" === e.data.status ? "icon-thumb-up-fill" : "icon-thumb-up", "text-20px mr-2px down"])
            }, null, 2), createTextVNode(toDisplayString("dislike" === e.data.status ? unref(c)("disliked") : unref(c)("dislike")), 1)])) : createCommentVNode("", !0), createBaseVNode("button", {
                class: normalizeClass(["flex items-center flex-shrink-0 text-c12 h-28px ml-12px", ["like" === e.data.status ? "text-primary-red-500" : "text-s-gray-500"]]),
                onClick: E
            }, [createBaseVNode("span", {
                class: normalizeClass(["like" === e.data.status ? "icon-thumb-up-fill" : "icon-thumb-up", "text-20px mr-2px"])
            }, null, 2), createTextVNode(toDisplayString(e.data.likeCount || unref(c)("like")), 1)], 2)])], 2)]), createBaseVNode("div", {
                class: normalizeClass([!e.isReply && "pl-38px"])
            }, [unref(s).activeReplyId === e.data.id ? (openBlock(),
            createBlock(ReviewInput, {
                key: 0,
                reply: "",
                class: "mt-12px",
                "parent-review-id": e.data.id,
                placeholder: unref(c)("reply_to", e.data.nickname),
                "max-length": e.maxLength,
                onCancel: r[2] || (r[2] = function(e) {
                    return unref(s).activeReplyId = ""
                }
                ),
                onReply: C
            }, null, 8, ["parent-review-id", "placeholder", "max-length"])) : createCommentVNode("", !0), e.data.replies && (null === (P = e.data.replies) || void 0 === P ? void 0 : P.length) > 0 ? (openBlock(),
            createElementBlock(Fragment, {
                key: 1
            }, [unref(l).deviceType === unref(PlatformType).PC ? (openBlock(),
            createElementBlock("ul", _hoisted_23, [(openBlock(!0),
            createElementBlock(Fragment, null, renderList(e.data.replies, (function(t, r) {
                return openBlock(),
                createElementBlock("li", {
                    key: t.id,
                    class: "mt-14px"
                }, [createVNode(Y, {
                    "max-length": e.maxLength,
                    "is-reply": "",
                    data: t,
                    onUpdate: function(e) {
                        return function(e, t) {
                            if (o.data.replies) {
                                var r = _toConsumableArray(o.data.replies)
                                  , i = _objectSpread(_objectSpread({}, o.data.replies[e]), t);
                                r[e] = i,
                                n("update", {
                                    replies: r
                                })
                            }
                        }(r, e)
                    },
                    onDelete: function(e) {
                        return function(e) {
                            var t = _toConsumableArray(o.data.replies);
                            n("update", {
                                replies: t.splice(e, 1)
                            })
                        }(r)
                    }
                }, null, 8, ["max-length", "data", "onUpdate", "onDelete"])])
            }
            )), 128))])) : (openBlock(),
            createElementBlock("div", _hoisted_24, [createBaseVNode("ul", null, [(openBlock(!0),
            createElementBlock(Fragment, null, renderList(e.data.replies, (function(e) {
                var t;
                return openBlock(),
                createElementBlock("li", {
                    key: e.id,
                    class: "mt-8px first:mt-0"
                }, [createVNode(_sfc_main$4, {
                    "from-author": !!e.fromAuthor,
                    content: e.content,
                    nickname: e.nickname,
                    "reply-to": (null === (t = e.replyTo) || void 0 === t ? void 0 : t.nickname) || "",
                    img: e.img
                }, null, 8, ["from-author", "content", "nickname", "reply-to", "img"])])
            }
            )), 128))]), e.data.replyCount && e.data.replies.length < e.data.replyCount ? (openBlock(),
            createElementBlock("a", {
                key: 0,
                href: (null === (F = unref(a)) || void 0 === F || null === (U = (M = F.hrefMap).download) || void 0 === U ? void 0 : U.call(M)) || (null === (K = unref(a)) || void 0 === K ? void 0 : K.downloadUrl),
                class: "text-s3 text-s-gray-900 font-medium mt-8px flex items-center",
                onClick: r[3] || (r[3] = withModifiers((function(e) {
                    var t, n;
                    return null === (t = unref(a)) || void 0 === t || null === (n = t.onDownload) || void 0 === n ? void 0 : n.call(t, "review:reply-list")
                }
                ), ["prevent"]))
            }, [createTextVNode(toDisplayString(unref(c)("check_all_replies", String(e.data.replyCount))), 1), _hoisted_26], 8, _hoisted_25)) : createCommentVNode("", !0)]))], 64)) : createCommentVNode("", !0), e.isReply || p.value || !e.data.replyCount || unref(l).deviceType !== unref(PlatformType).PC ? createCommentVNode("", !0) : (openBlock(),
            createElementBlock("button", {
                key: 2,
                class: "flex items-center text-s-gray-500 font-medium text-s3 mt-8px h-28px",
                onClick: B
            }, [createTextVNode(toDisplayString(d.value ? unref(c)("load_more_reviews") : unref(c)("load_more_reviews_with_count", String(e.data.replyCount))), 1), _hoisted_27]))], 2)]), unref(l).deviceType === unref(PlatformType).PC && e.data.img ? (openBlock(),
            createBlock(unref(ClientOnly), {
                key: 0
            }, {
                default: withCtx((function() {
                    return [(openBlock(),
                    createBlock(Teleport, {
                        to: "body"
                    }, [createVNode(Transition, {
                        name: "fade"
                    }, {
                        default: withCtx((function() {
                            return [h.value ? (openBlock(),
                            createElementBlock("div", {
                                key: 0,
                                class: "fixed inset-0 z-4 bg-on-image-black-60 cursor-zoom-out",
                                onClick: A
                            }, [createBaseVNode("img", {
                                ref_key: "$previewImage",
                                ref: v,
                                class: "absolute max-w-200px max-h-200px transition-all duration-500",
                                src: e.data.img,
                                onClick: r[4] || (r[4] = function(e) {
                                    return h.value ? A : N
                                }
                                ),
                                onTransitionend: O
                            }, null, 40, _hoisted_28)])) : createCommentVNode("", !0)]
                        }
                        )),
                        _: 1
                    })]))]
                }
                )),
                _: 1
            })) : createCommentVNode("", !0), e.data.self && unref(s).adapters.processDelete ? (openBlock(),
            createBlock(unref(ClientOnly), {
                key: 1
            }, {
                default: withCtx((function() {
                    return [(openBlock(),
                    createBlock(Teleport, {
                        to: "body"
                    }, [createVNode(_sfc_main$1l, {
                        "model-value": m.value,
                        "confirm-text": unref(c)("review_delete_confirm"),
                        "cancel-text": unref(c)("review_delete_cancel"),
                        title: unref(c)("review_delete_title"),
                        "onUpdate:modelValue": r[5] || (r[5] = function(e) {
                            return m.value = !1
                        }
                        ),
                        onCancel: r[6] || (r[6] = function(e) {
                            return m.value = !1
                        }
                        ),
                        onConfirm: T
                    }, {
                        default: withCtx((function() {
                            return [createTextVNode(toDisplayString(unref(c)("review_delete_desc")), 1)]
                        }
                        )),
                        _: 1
                    }, 8, ["model-value", "confirm-text", "cancel-text", "title"])]))]
                }
                )),
                _: 1
            })) : createCommentVNode("", !0)], 64)
        }
    }
})
  , _withScopeId = function(e) {
    return pushScopeId("data-v-e0469723"),
    e = e(),
    popScopeId(),
    e
}
  , _hoisted_1 = {
    class: "h-full flex flex-col"
}
  , _hoisted_2 = {
    class: "font-medium text-rh4 text-s-gray-900 <sm:text-rh6"
}
  , _hoisted_3 = {
    key: 0,
    class: "text-s3 text-s-gray-500 ml-8px font-medium <sm:text-s4"
}
  , _hoisted_4 = {
    key: 1
}
  , _hoisted_5 = {
    key: 0,
    class: "relative"
}
  , _hoisted_6 = _withScopeId((function() {
    return createBaseVNode("div", {
        class: "flex items-end h-16px overflow-hidden opacity-32 absolute bottom-full w-full pointer-events-none"
    }, [createBaseVNode("div", {
        class: "review-input w-full h-16px relative top-16px"
    })], -1)
}
))
  , _hoisted_7 = {
    class: "bg-b-gray-50 pt-14px px-32px pb-48px flex"
}
  , _hoisted_8 = ["alt", "src"]
  , _hoisted_9 = _withScopeId((function() {
    return createBaseVNode("span", {
        class: "icon-close text-24px text-s-gray-900"
    }, null, -1)
}
))
  , _hoisted_10 = [_hoisted_9]
  , _hoisted_11 = ["href"]
  , _hoisted_12 = ["href"]
  , _hoisted_13 = _withScopeId((function() {
    return createBaseVNode("span", {
        class: "icon-voice text-24px mb-2px"
    }, null, -1)
}
))
  , _sfc_main = defineComponent({
    __name: "ReviewList",
    props: {
        adapters: null,
        maxLength: {
            default: 150
        },
        uploadParams: null
    },
    setup: function(e) {
        var t = e
          , n = reactive({
            adapters: t.adapters,
            chapterId: "",
            index: -1,
            emojiActive: !1,
            activeReplyId: "",
            uploadImagesParams: t.uploadParams
        })
          , o = "".concat(STORAGE_PREFIX, ":review-opened");
        provide(REVIEW_LIST_KEY, n);
        var r = inject(USER_STATE_KEY)
          , i = inject(READER_STATE_KEY, defaultReaderState)
          , a = inject(FRONT_CONFIG_STATE_KEY)
          , s = inject(I18N_IO_FUNC_KEY)
          , l = inject(ADAPTERS_KEY)
          , c = ref(null)
          , u = ref(0)
          , d = ref(!1)
          , f = ref()
          , p = 0
          , h = !1;
        function m() {
            c.value = null,
            u.value = 0,
            p = 0;
            var e = i.reviewContext
              , t = e.chapterId
              , o = e.index;
            n.chapterId = t,
            n.index = o,
            h = !1,
            _()
        }
        function _() {
            h || d.value || (p += 1,
            d.value = !0,
            t.adapters.processReviewList(n.chapterId, n.index, p).then((function(e) {
                d.value = !1,
                h = e.end,
                u.value = e.count,
                c.value = c.value ? [].concat(_toConsumableArray(c.value), _toConsumableArray(e.list)) : e.list,
                1 === p && f.value && (f.value.scrollTop = 0)
            }
            )).catch((function() {
                d.value = !1
            }
            )))
        }
        function v() {
            var e, t;
            null !== (e = r.value) && void 0 !== e && e.id || null === (t = l.processLogin) || void 0 === t || t.call(l)
        }
        function g(e) {
            var t;
            if (null !== (t = c.value) && void 0 !== t && t.length) {
                for (var n = 0; n < c.value.length; n++)
                    if (!c.value[n].tag) {
                        c.value.splice(n, 0, e);
                        break
                    }
            } else
                c.value = [e]
        }
        function x(e) {
            e.intersectionRatio > 0 && _()
        }
        return watch((function() {
            return i.reviewContext
        }
        ), m),
        onMounted((function() {
            m()
        }
        )),
        onUnmounted((function() {
            var e;
            null !== (e = window.localStorage) && void 0 !== e && e.getItem(o) || (i.isGuideOpen = !0,
            window.localStorage.setItem(o, "1"))
        }
        )),
        function(t, o) {
            var l, p, h, m, _, y, b, k, w, E;
            return openBlock(),
            createElementBlock("div", _hoisted_1, [createBaseVNode("div", {
                class: "flex items-end pt-42px pb-10px px-32px <sm:px-16px <sm:py-15px <sm:border-b <sm:border-outline-black-8",
                onTouchmove: o[0] || (o[0] = withModifiers((function() {}
                ), ["prevent"]))
            }, [createBaseVNode("h2", _hoisted_2, toDisplayString(unref(s)("review")), 1), u.value ? (openBlock(),
            createElementBlock("span", _hoisted_3, toDisplayString(unref(s)("review_count", String(u.value))), 1)) : createCommentVNode("", !0)], 32), createBaseVNode("div", {
                ref_key: "$list",
                ref: f,
                class: normalizeClass(["flex-1 overflow-auto overscroll-contain", [n.emojiActive && "w-500px -ml-100px"]])
            }, [createBaseVNode("div", {
                class: normalizeClass([[n.emojiActive && "ml-100px"], "min-h-[calc(100%+20px)]"])
            }, [c.value && 0 === c.value.length ? (openBlock(),
            createBlock(_sfc_main$1j, {
                key: 0,
                title: unref(s)("empty_reviews")
            }, null, 8, ["title"])) : createCommentVNode("", !0), null !== (l = c.value) && void 0 !== l && l.length ? (openBlock(),
            createElementBlock("ul", _hoisted_4, [(openBlock(!0),
            createElementBlock(Fragment, null, renderList(c.value, (function(t, n) {
                return openBlock(),
                createElementBlock("li", {
                    key: t.id,
                    class: "px-32px py-16px <sm:px-16px"
                }, [createVNode(_sfc_main$1, {
                    "max-length": e.maxLength,
                    data: t,
                    onUpdate: function(e) {
                        return function(e, t) {
                            Object.assign(c.value[e], t)
                        }(n, e)
                    },
                    onDelete: function(e) {
                        return function(e) {
                            c.value.splice(e, 1)
                        }(n)
                    }
                }, null, 8, ["max-length", "data", "onUpdate", "onDelete"])])
            }
            )), 128))])) : createCommentVNode("", !0), d.value ? (openBlock(),
            createBlock(_sfc_main$U, {
                key: 2,
                class: "h-44px"
            })) : createCommentVNode("", !0), createVNode(_sfc_main$Q, {
                class: "h-80px",
                onChange: x
            })], 2)], 2), unref(i).deviceType === unref(PlatformType).PC ? (openBlock(),
            createElementBlock("div", _hoisted_5, [_hoisted_6, createBaseVNode("section", _hoisted_7, [(openBlock(),
            createBlock(resolveDynamicComponent(null !== (p = unref(r)) && void 0 !== p && p.id ? "span" : "button"), {
                onClick: v
            }, {
                default: withCtx((function() {
                    var e, t;
                    return [createBaseVNode("img", {
                        alt: null === (e = unref(r)) || void 0 === e ? void 0 : e.username,
                        class: "w-36px h-36px rounded-1 border border-outline-black-8 mr-10px flex-shrink-0",
                        src: (null === (t = unref(r)) || void 0 === t ? void 0 : t.avatar) || "https://qidian.gtimg.com/qd/images/ico/default_user.0.2.png"
                    }, null, 8, _hoisted_8)]
                }
                )),
                _: 1
            })), createVNode(ReviewInput, {
                "max-length": e.maxLength,
                onReply: g
            }, null, 8, ["max-length"])])])) : (openBlock(),
            createElementBlock("div", {
                key: 1,
                class: "flex items-center px-16px py-12px review-input",
                onTouchmove: o[4] || (o[4] = withModifiers((function() {}
                ), ["prevent"]))
            }, [createBaseVNode("button", {
                onClick: o[1] || (o[1] = function(e) {
                    return unref(i).isSideSheetOpen = !1
                }
                )
            }, _hoisted_10), createBaseVNode("a", {
                href: (null === (h = unref(a)) || void 0 === h || null === (m = (_ = h.hrefMap).download) || void 0 === m ? void 0 : m.call(_)) || (null === (y = unref(a)) || void 0 === y ? void 0 : y.downloadUrl),
                class: "text-s-gray-400 h-32px text-bo4 flex items-center rounded-8px bg-s-gray-100 ml-10px mr-12px flex-1 px-12px",
                onClick: o[2] || (o[2] = withModifiers((function(e) {
                    var t, n;
                    return null === (t = unref(a)) || void 0 === t || null === (n = t.onDownload) || void 0 === n ? void 0 : n.call(t, "review:input")
                }
                ), ["prevent"]))
            }, toDisplayString(unref(s)("publish_review")), 9, _hoisted_11), createBaseVNode("a", {
                href: (null === (b = unref(a)) || void 0 === b || null === (k = (w = b.hrefMap).download) || void 0 === k ? void 0 : k.call(w)) || (null === (E = unref(a)) || void 0 === E ? void 0 : E.downloadUrl),
                class: "text-s-gray-900 flex flex-col text-l items-center",
                onClick: o[3] || (o[3] = withModifiers((function(e) {
                    var t, n;
                    return null === (t = unref(a)) || void 0 === t || null === (n = t.onDownload) || void 0 === n ? void 0 : n.call(t, "review:dub")
                }
                ), ["prevent"]))
            }, [_hoisted_13, createTextVNode(toDisplayString(unref(s)("review_dub")), 1)], 8, _hoisted_12)], 32))])
        }
    }
})
  , ReviewList = _export_sfc(_sfc_main, [["__scopeId", "data-v-e0469723"]]);
function initReader(e, t, n, o, r) {
    var i = invokeInject(r)
      , a = i.user
      , s = i.frontConfig
      , l = i.readerState
      , c = i.bus
      , u = i.adapters
      , d = i.chapters
      , f = i.t;
    Object.assign(u, n),
    e.platform && (l.deviceType = e.platform),
    t && (l.chapterContext.cid = t),
    s.value = e,
    l.isWestern = !(null == o || !o.western),
    i.i18n.value = o,
    l.i18n.value = o;
    var p = {
        patchUserInfo: function(e) {
            return a.value || (a.value = {
                id: "",
                username: ""
            }),
            Object.assign(a.value, e),
            p
        },
        patchChapter: function(t, n) {
            var o = function(e) {
                m(e),
                onMounted((function() {
                    var t;
                    !e.auth && l.settings.autoSubs && (null === (t = s.value) || void 0 === t || !t.disableAutoSubsAjax) && v([e], e.bookPrice ? "book" : "single")
                }
                )),
                d.value.push(e)
            };
            try {
                var r = n(i);
                if (!r)
                    return;
                o(r)
            } catch (a) {
                onMounted((function() {
                    if (checkRiskError(a)) {
                        var n = a.serviceError.risk;
                        handleRisk(n, e).then((function(e) {
                            return _(t, !1, {
                                serverRes: n,
                                sdkRes: e
                            }).then((function(e) {
                                e && o(e)
                            }
                            ))
                        }
                        ))
                    } else
                        l.errorHash[t] = a instanceof ServiceError ? {
                            title: a.serviceError.msg
                        } : {
                            title: f("load_chap_failed")
                        }
                }
                ))
            }
        },
        state: i,
        bus: c
    }
      , h = useChapter(i)
      , m = h.prepareChapter
      , _ = h.loadChapter
      , v = useSubscribe(i).subscribe;
    return p
}
const typeTester = e => t => Object.prototype.toString.call(t) === "[object ".concat(e, "]")
  , isBlob = typeTester("Blob")
  , getPCLoginUrl = e => {
    let t = "".concat(location.protocol, "//").concat("", "passport.qidian.com/?");
    for (const n in e)
        ({}).hasOwnProperty.call(e, n) && (t += "".concat(n, "=").concat(encodeURIComponent(e[n]), "&"));
    return t
}
  , showPCLogin = e => {
    const t = getPCLoginUrl(e);
    let n = document.getElementById("div_qdmask");
    n ? n.style.display = "block" : (n = document.createElement("div"),
    n.id = "div_qdmask",
    document.body.appendChild(n));
    let o = document.getElementById("qdlogin_wrap");
    return o ? o.style.display = "block" : (o = document.createElement("div"),
    o.id = "qdlogin_wrap",
    o.innerHTML = '<iframe id="loginIfr" src="'.concat(t, '" name="frameLG" id="frameLG" allowtransparentcy="true" width="100%" height="100%" scrolling="no" frameborder="no"></iframe>'),
    document.body.appendChild(o)),
    {
        _maskDiv: n,
        _popUpDiv: o
    }
}
  , checkSupport3rdpCookie = t => {
    const n = "https://".concat("", "acts.book.qq.com")
      , o = Date.now()
      , r = document.createElement("iframe");
    function i() {
        document.body.removeChild(r)
    }
    r.style.display = "none",
    r.src = "".concat(n, "/qd_stc/3rdp_check/?ts=").concat(o),
    r.onerror = i,
    document.body.appendChild(r),
    window.addEventListener("message", (function r(a) {
        if (a.origin !== n)
            return;
        let s = !1;
        if (a.data)
            try {
                const e = JSON.parse(a.data);
                s = Boolean(e.accept && e.ts && e.ts === o.toString())
            } catch (e) {}
        t(s),
        i(),
        window.removeEventListener("message", r)
    }
    ))
}
  , loginViaFrame = () => {
    const e = /www\.qdmm\.com$/.test(location.hostname)
      , t = e ? "https://".concat("", "www.qdmm.com/loginSuccess?surl=").concat(encodeURIComponent(location.href)) : location.href
      , n = showPCLogin({
        returnurl: t,
        popup: 1,
        ticket: 1,
        target: e ? "iframe" : "popup",
        areaid: 1,
        appid: 10,
        auto: 1,
        autotime: 30,
        unionshow: 111111,
        version: "1.0"
    });
    window.addEventListener("message", (function e(t) {
        const o = JSON.parse(t.data || "{}");
        "close" === (null == o ? void 0 : o.action) && (n._maskDiv.style.display = "none",
        n._popUpDiv.style.display = "none"),
        window.removeEventListener("message", e)
    }
    ), !1)
}
  , login = (e=!1) => {
    if (e)
        loginViaFrame();
    else {
        const e = /www\.qdmm\.com$/.test(location.hostname)
          , t = ""
          , n = ""
          , o = window.location.href;
        if (e) {
            const e = "https://".concat(n, "www.qdmm.com/loginSuccess?surl=").concat(encodeURIComponent(o));
            window.location.href = "https://".concat(t, "passport.yuewen.com/yuewen.html?appid=10&areaid=1&auto=1&autotime=30&version=1.0&ticket=1&source=pc&returnurl=").concat(encodeURIComponent(e))
        } else
            window.location.href = "https://".concat(t, "passport.qidian.com/?appid=10&areaid=1&auto=1&autotime=30&version=1.0&ticket=0&target=top&popup=0&source=pc&returnurl=").concat(encodeURIComponent(o))
    }
}
  , loginOut = () => {
    let e = "//ptlogin.qidian.com/login/logout?";
    const t = {
        appid: 10,
        areaid: 6,
        source: "pc",
        version: "1.0",
        format: "redirect"
    };
    for (const o in t)
        ({}).hasOwnProperty.call(t, o) && (e += "".concat(o, "=").concat(encodeURIComponent(t[o]), "&"));
    const n = location.href;
    location.href = "".concat(e, "&returnurl=").concat(n)
}
  , axiosInstance = axios$1.create({
    timeout: 8e3,
    xsrfCookieName: "",
    xsrfHeaderName: "",
    validateStatus: null,
    maxRedirects: 0,
    withCredentials: !0
});
axiosInstance.interceptors.request.use((e => {
    setCustomHeadersAndParams(e);
    const t = e.params;
    return e.transformResponse = [n => {
        var o;
        let r = n;
        return "zht" !== getCookie("lang", "") || (null == t ? void 0 : t.disableZhHK) || (null == (o = null == e ? void 0 : e.data) ? void 0 : o.disableZhHK) || (r = zh_HK_default._trans.trans(n)),
        isBlob(r) ? n : JSONBig.parse(r)
    }
    ],
    e
}
)),
axiosInstance.interceptors.response.use((e => {
    if (401 === e.status)
        throw login(),
        new Error("无权限");
    return e
}
), (e => (useToast({
    title: "网络异常，刷新重试",
    type: "error"
}),
dealWaf(e),
Promise.resolve(e))));
const setCustomHeadersAndParams = e => {
    var t, n;
    const o = getCookie("_csrfToken") || "";
    (new Date).getTime();
    let r = Math.floor((new Date).getTime() / 1e3);
    r += 0;
    const i = null == (t = window.Fock) ? void 0 : t.sign("".concat(r).concat(o));
    if (e.headers = {
        ...e.headers,
        "X-Yuew-time": r,
        "X-Yuew-sign": i,
        "X-D": 0
    },
    "post" === e.method) {
        const t = e.data || {};
        if ("string" == typeof t)
            return;
        if ("application/x-www-form-urlencoded" === e.headers["Content-type"]) {
            const n = new FormData;
            for (const e in t)
                Object.prototype.hasOwnProperty.call(t, e) && n.append(e, t[e]);
            n.append("_csrfToken", o),
            e.data = n
        } else
            e.data = {
                ...t,
                _csrfToken: o
            }
    }
    const a = e.params || {};
    a._csrfToken || -1 !== (null == (n = e.url) ? void 0 : n.indexOf("csrfToken")) || (e.params = {
        ...a,
        _csrfToken: o
    })
}
  , dealWaf = e => {
    const t = e.text
      , n = /TencentCaptcha\(\'(\d+)\'/g
      , o = /seqid\s=\s"(\w+)"/g.exec(t);
    if (o) {
        const e = o[1]
          , r = n.exec(t)
          , i = r ? r[1] : 0;
        new TencentCaptcha(i,(t => {
            const n = [];
            n.push(t.ret),
            0 === t.ret && (n.push(t.ticket),
            n.push(t.randstr),
            n.push(e));
            const o = n.join("\n");
            axios$1.post("/WafCaptcha", o).then(( () => {
                window.location.reload()
            }
            )).catch(( () => {
                window.location.reload()
            }
            ))
        }
        )).show()
    } else
        useToast({
            title: "网络异常，刷新重试",
            type: "error"
        })
}
  , setCookie = (e, t, n, o, r) => {
    let i = (new Date).getTime() + 864e5;
    r && (i = (new Date).getTime() + r);
    const a = "".concat(e, "=").concat(encodeURIComponent(t)).concat(r ? "; expires=".concat(new Date(i).toUTCString()) : "").concat(o ? "; path=".concat(o) : "").concat(n ? "; domain=".concat(n) : "");
    a.length < 4096 && (document.cookie = a)
}
  , getCookie = (e, t) => {
    const n = t || document.cookie
      , o = RegExp("".concat(e, "=([^;]+)")).exec(n);
    return o ? decodeURIComponent(o[1]) : ""
}
  , getUserMsg = async e => {
    if (!e)
        return null;
    try {
        return await axiosInstance.get(e)
    } catch (t) {
        return null
    }
}
  , getFlippedMap = e => {
    const t = Object.entries(e).map(( ([e,t]) => [t, e]));
    return Object.fromEntries(t)
}
  , getBookCurChapterType = (e, t, n, o, r) => 1 === t ? "3" : 1 === n ? e && 0 === o || !e && 1 === r ? "2" : "0" : "1"
  , getQueryVariable = e => {
    const t = window.location.search.substring(1).split("&");
    for (let n = 0; n < t.length; n++) {
        const o = t[n].split("=");
        if (o[0] === e)
            return o[1]
    }
    return ""
}
  , getStr = e => {
    const t = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return Array(e).fill("").map((e => t[Math.floor(62 * Math.random())])).join("")
}
  , getCsrfToken = e => {
    let t = getCookie("_csrfToken") || "";
    return t || (t = getStr(40),
    setCookie("_csrfToken", t, "".concat(e ? ".qdmm.com" : ".qidian.com"), "/")),
    t
}
  , getDDLUrl = e => {
    var t;
    const n = (null == (t = null == window ? void 0 : window.location) ? void 0 : t.hostname) || ""
      , o = n && /qdmm\.com/.test(n) ? "qdmmPC" : "qidianPC"
      , r = "https://".concat("", "qidian.gtimg.com")
      , i = "QDReader/app/".concat(e.method)
      , a = {
        query: e.query || JSON.stringify({}),
        page: e.page || "qidian-pc",
        source: e.source || o,
        reuId: e.uuid || ""
    }
      , s = [];
    return Object.keys(a).forEach((e => {
        s.push("".concat(e, "=").concat(encodeURIComponent(a[e])))
    }
    )),
    "".concat(r, "/").concat(i, "?").concat(s.join("&"), "&__self_redirect__=1")
}
  , transformChineseBase = e => t => {
    var n, o;
    if ("zht" === getCookie("lang", e && (null == (n = e.headers) ? void 0 : n.cookie) ? null == (o = e.headers) ? void 0 : o.cookie : "")) {
        const e = JSONBig.stringify(t);
        return JSONBig.parse(zh_HK_default._trans.trans(e))
    }
    return t
}
  , getBookDetailUrl = (e, t) => "//".concat("", "www").concat(t ? ".qdmm.com" : ".qidian.com", "/book/").concat(e, "/")
  , DEFAULT_CONFIG = {
    debug: !1,
    reportUrl: "http://localhost:4545/",
    onLoad: function() {},
    bufferConfig: {
        type: "localStorage",
        name: "",
        disable: !1,
        cookie_secure: !1,
        cookie_cross_subdomain: !1,
        cookie_expiration: 1e3
    },
    disabledEvent: [],
    trackType: "beacon",
    encrypt: !1,
    SPA: {
        open: !1,
        mode: "hash"
    },
    pageAuto: !1,
    truncateLength: -1,
    sessionIntervalMins: 30,
    retention: !1,
    builtinSession: !1,
    useBuiltinData: !1,
    autoTR: !1,
    autoClass: "auto-tr",
    autoClickClass: "auto-click-tr",
    autoType: "every",
    autoOnceClass: "auto-once",
    autoParamHook: () => {}
    ,
    bubbleStopFlag: "l1",
    bubbleStopFlagPrefixForShow: "show",
    onBeforeSend: (e, t) => !1,
    useRetainPreviousEvent: !1,
    saveLocalRetainPEKeys: [],
    employRetainPEDataKeys: []
}
  , LIB_CONFIG = {
    VERSION: "0.1.3",
    DEBUG: !1
}
  , SYSTEM_EVENT_TYPE = "se"
  , BUSINESS_EVENT_TYPE = "be"
  , SYSTEM_EVENT_OBJECT = {
    tr_session_start: {
        data_type: SYSTEM_EVENT_TYPE
    },
    tr_session_close: {
        data_type: SYSTEM_EVENT_TYPE
    },
    tr_pv: {
        data_type: SYSTEM_EVENT_TYPE
    },
    tr_activate: {
        data_type: SYSTEM_EVENT_TYPE
    }
}
  , utf8Encode = function(e) {
    var t, n, o, r, i = "";
    for (t = n = 0,
    o = (e = (e + "").replace(/\r\n/g, "\n").replace(/\r/g, "\n")).length,
    r = 0; r < o; r++) {
        var a = e.charCodeAt(r)
          , s = null;
        a < 128 ? n++ : s = a > 127 && a < 2048 ? String.fromCharCode(a >> 6 | 192, 63 & a | 128) : String.fromCharCode(a >> 12 | 224, a >> 6 & 63 | 128, 63 & a | 128),
        null !== s && (n > t && (i += e.substring(t, n)),
        i += s,
        t = n = r + 1)
    }
    return n > t && (i += e.substring(t, e.length)),
    i
}
  , base64Encode = function(e) {
    var t, n, o, r, i, a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", s = 0, l = 0, c = "", u = [];
    if (!e)
        return e;
    e = utf8Encode(e);
    do {
        t = (i = e.charCodeAt(s++) << 16 | e.charCodeAt(s++) << 8 | e.charCodeAt(s++)) >> 18 & 63,
        n = i >> 12 & 63,
        o = i >> 6 & 63,
        r = 63 & i,
        u[l++] = a.charAt(t) + a.charAt(n) + a.charAt(o) + a.charAt(r)
    } while (s < e.length);
    switch (c = u.join(""),
    e.length % 3) {
    case 1:
        c = c.slice(0, -2) + "==";
        break;
    case 2:
        c = c.slice(0, -1) + "="
    }
    return c
};
let win;
win = "undefined" == typeof window ? {
    navigator: {
        userAgent: ""
    },
    location: {
        pathname: "",
        href: ""
    },
    document: {
        URL: "",
        referrer: ""
    },
    screen: {
        width: "",
        height: ""
    },
    console: ""
} : window;
const windowConsole = win.console
  , console$1 = {
    log: function() {
        if (LIB_CONFIG.DEBUG && !common.isUndefined(windowConsole) && windowConsole)
            try {
                windowConsole.log.apply(windowConsole, arguments)
            } catch (e) {
                common.each(arguments, (function(e) {
                    windowConsole.log(e)
                }
                ))
            }
    },
    error: function() {
        if (LIB_CONFIG.DEBUG && !common.isUndefined(windowConsole) && windowConsole) {
            var e = ["TR error:"].concat(common.toArray(arguments));
            try {
                windowConsole.error.apply(windowConsole, e)
            } catch (t) {
                common.each(e, (function(e) {
                    windowConsole.error(e)
                }
                ))
            }
        }
    }
}
  , breaker$1 = {}
  , common = {
    each(e, t, n) {
        if (null != e)
            if (Array.prototype.forEach && e.forEach === Array.prototype.forEach)
                e.forEach(t, n);
            else
                for (let o in e)
                    if (e.hasOwnProperty.call(e, o) && t.call(n, e[o], o, e) === breaker$1)
                        return
    },
    extend(e) {
        return common.each(Array.prototype.slice.call(arguments, 1), (function(t) {
            for (let n in t)
                void 0 !== t[n] && (e[n] = t[n])
        }
        )),
        e
    },
    isNumber: e => "[object Number]" == Object.prototype.toString.call(e),
    isString: e => "[object String]" == Object.prototype.toString.call(e),
    isRegExp: e => "[object RegExp]" === Object.prototype.toString.call(e),
    isObject: e => e === Object(e) && !common.isArray(e),
    isArray: e => "[object Array]" === Object.prototype.toString.apply(e),
    isUndefined: e => void 0 === e,
    isArguments: e => !(!e || !hasOwnProperty.call(e, "callee")),
    isFunction(e) {
        let t = !1;
        return "function" == typeof e && (t = !0),
        t
    },
    toArray: e => e ? e.toArray ? e.toArray() : common.isArray(e) || common.isArguments(e) ? Array.prototype.slice.call(e) : common.values(e) : [],
    values(e) {
        var t = [];
        return null === e || common.each(e, (function(e) {
            t[t.length] = e
        }
        )),
        t
    },
    JSONDecode(e) {
        try {
            return JSON.parse(e)
        } catch (t) {
            return {}
        }
    },
    JSONEncode(e) {
        try {
            return JSON.stringify(e)
        } catch (t) {
            return ""
        }
    },
    encodeData: e => base64Encode(e),
    truncate(e, t) {
        let n;
        return "string" == typeof e ? n = e.slice(0, t) : common.isArray(e) ? (n = [],
        common.each(e, (function(e) {
            n.push(common.truncate(e, t))
        }
        ))) : common.isObject(e) ? (n = {},
        common.each(e, (function(e, o) {
            n[o] = common.truncate(e, t)
        }
        ))) : n = e,
        n
    },
    generateQuery(e, t) {
        let n, o, r = [];
        return common.isUndefined(t) && (t = "&"),
        common.each(e, (function(e, t) {
            n = encodeURIComponent(e.toString()),
            o = encodeURIComponent(t),
            r[r.length] = o + "=" + n
        }
        )),
        r.join(t)
    },
    trim(e) {
        if (e)
            return e.replace(/(^\s*)|(\s*$)/g, "")
    },
    checkTime: e => !!e && !!/^(\d{4})-(\d{2})-(\d{2})$/.test(e),
    getHost(e) {
        let t = "";
        e || (e = document.URL);
        const n = e.match(/.*\:\/\/([^\/]*).*/);
        return n && (t = n[1]),
        t
    },
    getQueryParam(e, t) {
        const n = t.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]")
          , o = new RegExp("[\\?&]" + n + "=([^&#]*)").exec(e);
        return null === o || o && "string" != typeof o[1] && o[1].length ? "" : decodeURIComponent(o[1]).replace(/\+/g, " ")
    },
    deleteEmptyProperty(e) {
        if (this.isObject(e)) {
            for (let t in e)
                e.hasOwnProperty(t) && (null === e[t] || this.isUndefined(e[t]) || "" === e[t]) && delete e[t];
            return e
        }
    }
};
var T;
common.register_event = function() {
    function e(t) {
        return t && (t.preventDefault = e.preventDefault,
        t.stopPropagation = e.stopPropagation),
        t
    }
    return e.preventDefault = function() {
        this.returnValue = !1
    }
    ,
    e.stopPropagation = function() {
        this.cancelBubble = !0
    }
    ,
    function(t, n, o, r, i) {
        if (t)
            if (t.addEventListener && !r)
                t.addEventListener(n, o, !!i);
            else {
                var a = "on" + n
                  , s = t[a];
                t[a] = function(t, n, o) {
                    var r = function(r) {
                        if (r = r || e(window.event)) {
                            var i, a, s = !0;
                            return common.isFunction(o) && (i = o(r)),
                            a = n.call(t, r),
                            !1 !== i && !1 !== a || (s = !1),
                            s
                        }
                    };
                    return r
                }(t, o, s)
            }
        else
            console$1.error("No valid element provided to register_event")
    }
}(),
common.register_hash_event = function(e) {
    common.register_event(window, "hashchange", e)
}
,
common.info = {
    domain(e) {
        if (!e)
            return "";
        const t = e.split("/");
        return t.length >= 3 ? t[2] : ""
    },
    properties() {
        return {
            browserUA: win.navigator.userAgent,
            currentUrl: document.URL,
            currentDomain: this.domain(document.URL),
            referrer: win.document.referrer || "",
            referringDomain: this.domain(win.document.referrer),
            screenWidth: win.screen.width,
            screenHeight: win.screen.height
        }
    }
},
common.sendRequest = function(e, t, n, o) {
    if (common.isFunction(window.navigator.sendBeacon) && "beacon" === t)
        e += "?" + common.generateQuery(n),
        window.navigator.sendBeacon(e);
    else if ("img" === t) {
        e += "?" + common.generateQuery(n);
        let t = document.createElement("img");
        t.src = e,
        t.width = 1,
        t.height = 1,
        t.onload = function() {
            this.onload = null,
            common.isFunction(o) && o({
                status: 1
            })
        }
        ,
        t.onerror = function() {
            this.onerror = null,
            common.isFunction(o) && o({
                status: 0,
                error: !0,
                message: "error"
            })
        }
        ,
        t.onabort = function() {
            this.onabort = null,
            common.isFunction(o) && o({
                status: 0,
                error: !0,
                message: "onabort"
            })
        }
    } else
        "get" === t ? (e += "?" + common.generateQuery(n),
        common.ajax.get(e, o)) : "post" === t && common.ajax.post(e, n, o)
}
,
common.ajax = {
    post: function(t, n, o, r) {
        var i = this;
        i.callback = o || function(e) {}
        ;
        try {
            var a = new XMLHttpRequest;
            a.open("POST", t, !0),
            a.setRequestHeader("Content-type", "application/json"),
            a.withCredentials = !0,
            a.ontimeout = function() {
                i.callback({
                    status: 0,
                    error: !0,
                    message: "request " + t + " time out"
                })
            }
            ,
            a.onreadystatechange = function() {
                if (4 === a.readyState)
                    if (200 === a.status)
                        i.callback(common.JSONDecode(a.responseText));
                    else {
                        var e = "Bad HTTP status: " + a.status + " " + a.statusText;
                        i.callback({
                            status: 0,
                            error: !0,
                            message: e
                        })
                    }
            }
            ,
            a.timeout = r || 5e3,
            a.send(common.JSONEncode(n))
        } catch (e) {}
    },
    get: function(t, n) {
        try {
            var o = new XMLHttpRequest;
            o.open("GET", t, !0),
            o.withCredentials = !0,
            o.onreadystatechange = function() {
                if (4 === o.readyState)
                    if (200 === o.status)
                        n && n(o.responseText);
                    else if (n) {
                        var e = "Bad HTTP status: " + o.status + " " + o.statusText;
                        n({
                            status: 0,
                            error: !0,
                            message: e
                        })
                    }
            }
            ,
            o.send(null)
        } catch (e) {}
    }
},
common.UUID = (T = function() {
    for (var e = 1 * new Date, t = 0; e == 1 * new Date; )
        t++;
    return e.toString(16) + t.toString(16)
}
,
function() {
    var e = String(screen.height * screen.width);
    e = e && /\d{5,}/.test(e) ? e.toString(16) : String(31242 * Math.random()).replace(".", "").slice(0, 8);
    var t = T() + "-" + Math.random().toString(16).replace(".", "") + "-" + function() {
        var e, t, n = navigator.userAgent, o = [], r = 0;
        function i(e, t) {
            var n, r = 0;
            for (n = 0; n < t.length; n++)
                r |= o[n] << 8 * n;
            return e ^ r
        }
        for (e = 0; e < n.length; e++)
            t = n.charCodeAt(e),
            o.unshift(255 & t),
            o.length >= 4 && (r = i(r, o),
            o = []);
        return o.length > 0 && (r = i(r, o)),
        r.toString(16)
    }() + "-" + e + "-" + T();
    return t || (String(Math.random()) + String(Math.random()) + String(Math.random())).slice(2, 15)
}
),
common.innerEvent = {
    on: function(e, t) {
        this._list || (this._list = {}),
        this._list[e] || (this._list[e] = []),
        this._list[e].push(t)
    },
    trigger: function() {
        var e = Array.prototype.slice.call(arguments)
          , t = e[0]
          , n = this._list && this._list[t];
        if (n && 0 !== n.length)
            for (var o = 0; o < n.length; o++)
                "function" == typeof n[o] && n[o].apply(this, e)
    }
},
common.localStorage = {
    set: function(e, t) {
        try {
            window.localStorage.setItem(e, t)
        } catch (n) {
            common.localStorage.error(n)
        }
    },
    get: function(e) {
        try {
            return window.localStorage.getItem(e)
        } catch (t) {
            common.localStorage.error(t)
        }
        return null
    },
    parse: function(e) {
        try {
            return common.JSONDecode(common.localStorage.get(e)) || {}
        } catch (t) {
            console$1.error(t)
        }
        return null
    },
    remove: function(e) {
        try {
            window.localStorage.removeItem(e)
        } catch (t) {
            common.localStorage.error(t)
        }
    },
    error: function(e) {
        console$1.error("localStorage error: " + e)
    }
},
common.cookie = {
    set: function(e, t, n, o, r) {
        var i = ""
          , a = ""
          , s = "";
        if (n && (s = "; secure"),
        o) {
            var l = document.location.hostname.match(/[a-z0-9][a-z0-9\-]+\.[a-z\.]{2,6}$/i)
              , c = l ? l[0] : "";
            i = c ? "; domain=." + c : ""
        }
        if (r) {
            var u = new Date;
            u.setTime(u.getTime() + 24 * r * 60 * 60 * 1e3),
            a = "; expires=" + u.toGMTString()
        }
        var d = e + "=" + encodeURIComponent(t) + a + "; path=/" + i + s;
        return document.cookie = d,
        d
    },
    get: function(e) {
        for (var t = e + "=", n = document.cookie.split(";"), o = 0; o < n.length; o++) {
            for (var r = n[o]; " " == r.charAt(0); )
                r = r.substring(1, r.length);
            if (0 === r.indexOf(t))
                return decodeURIComponent(r.substring(t.length, r.length))
        }
        return null
    },
    parse: function(e) {
        var t;
        try {
            t = common.JSONDecode(common.cookie.get(e)) || {}
        } catch (n) {}
        return t
    },
    remove: function(e, t) {
        common.cookie.set(e, "", -1, !1, t)
    }
},
common.localStorage_supported = () => {
    let e = !0;
    try {
        let t = "__support__"
          , n = "sdk";
        common.localStorage.set(t, n),
        common.localStorage.get(t) !== n && (e = !1),
        common.localStorage.remove(t)
    } catch (t) {
        e = !1
    }
    return e || console$1.error("localStorage 不支持，自动退回到cookie存储方式"),
    e
}
,
common.createClassReg = e => new RegExp("(^|\\s)" + e + "(\\s|$)"),
common.autoTraverseDomUp = (e, t, n, o, r, i) => {
    let a = ""
      , s = null;
    const l = {};
    let c = []
      , u = {};
    for (; e && "BODY" !== e.tagName; ) {
        if (t.test(e.getAttribute("class"))) {
            u = o(e, r),
            c = Object.keys(u || {}),
            s = e;
            break
        }
        e = e.parentNode
    }
    if (!s)
        return;
    for (; s && "BODY" !== s.tagName; ) {
        if (common.each(c, (e => {
            !s.hasAttribute("data-".concat(e)) || u[e] || l[e] || (l[e] = s.getAttribute("data-".concat(e)))
        }
        )),
        n && s.hasAttribute("data-".concat(n)) && "" === a) {
            a = s.getAttribute("data-".concat(n));
            break
        }
        s = s.parentNode
    }
    let d = n;
    return "exposure" === r && i && (d = d.replace(i, "")),
    common.extend({}, u, l, {
        ["".concat(d)]: a
    })
}
;
class EventTrack {
    constructor(e) {
        this.context = e,
        this.buffer = this.context.buffer,
        this.buffer.caching({
            sessionStartTime: 0,
            updatedTime: 0
        }),
        this.buffer.caching({
            sessionReferrer: document.referrer
        }),
        common.innerEvent.on("singlePage:change", ( (e, t) => {
            this.buffer.caching({
                sessionReferrer: document.URL
            })
        }
        ))
    }
    checkChannel() {
        const e = this.context.getProperty("sessionReferrer");
        let t = !1;
        return common.getHost(e) !== window.location.host && (t = !0),
        t
    }
    checkEventIsDisabled(e) {
        return e in this.context.config.disabledEvent
    }
    startNewSession() {
        this.buffer.caching({
            sessionUUID: common.UUID(),
            sessionStartTime: (new Date).getTime()
        }),
        this.track("tr_session_start")
    }
    checkRetentionList() {
        if (!this.context.getConfig("retention"))
            return;
        const e = this.buffer.getTargetData("Retention");
        this.buffer.removeLocalData("Retention"),
        common.isArray(e) && e.length > 0 && common.each(e, (e => {
            const t = e.builtinData.eventId;
            this.track(t, e)
        }
        ))
    }
    closeCurSession() {
        let e = (new Date).getTime() - 1e3;
        const t = this.context.getProperty("sessionStartTime")
          , n = this.context.getProperty("LASTEVENT");
        n && n.triggerTime && (e = n.triggerTime);
        const o = e - t;
        o < 0 || this.track("tr_session_close", {
            sessionCloseTime: e,
            sessionTotalLength: o
        })
    }
    checkSession(e) {
        const t = (new Date).getTime();
        if (this.context.getConfig("builtinSession")) {
            const e = 1 * this.context.getProperty("sessionStartTime") / 1e3
              , n = 1 * this.context.getProperty("updatedTime") / 1e3
              , o = 1 * t / 1e3
              , r = this.checkChannel();
            (0 === e || o > n + 60 * this.context.getConfig("sessionIntervalMins") || r) && (0 === e || this.closeCurSession(),
            this.startNewSession())
        }
        this.checkRetentionList(),
        this.buffer.caching({
            updatedTime: t
        }),
        common.isFunction(e) && e()
    }
    setConsumingTimeListener(e) {
        common.isUndefined(e) ? console$1.error("事件耗时监听器需要一个事件名称") : this.checkEventIsDisabled(e) || this.buffer.setConsumingTime(e, (new Date).getTime())
    }
    trackPV(e, t) {
        this.checkSession(( () => {
            this.track("tr_pv", common.extend({}, e), t)
        }
        ))
    }
    track(e, t, n, o) {
        if (common.isUndefined(e))
            return void console$1.error("上报数据需要一个事件名称");
        if (common.isFunction(n) || (n = function() {}
        ),
        this.checkEventIsDisabled(e))
            return void n({
                status: 0
            });
        this.buffer.getLocalData(),
        t = t || {};
        let r, i = common.JSONDecode(common.JSONEncode(t)) || {};
        const a = this.buffer.removeEventTimer(e);
        common.isUndefined(a) || (r = (new Date).getTime() - a,
        console$1.log("指定事件" + e + "共用时:" + r + "ms"));
        let s = BUSINESS_EVENT_TYPE;
        o ? s = o : SYSTEM_EVENT_OBJECT[e] && (s = SYSTEM_EVENT_OBJECT[e].data_type);
        let l = (new Date).getTime();
        "tr_session_close" === e && (l = t.sessionCloseTime,
        console$1.log("上次会话已超出设定范围，会话共用时" + t.sessionTotalLength + "ms"),
        delete i.sessionCloseTime,
        delete i.sessionTotalLength),
        i = common.extend({}, this.context.getProperty("customProperties"), i);
        let c = common.extend({}, {
            dataType: s,
            libVersion: LIB_CONFIG.VERSION,
            eventId: e,
            triggerTime: l,
            persistedTime: this.context.getProperty("persistedTime"),
            deviceId: this.context.getDeviceId(),
            appId: this.context.getConfig("appId"),
            costTime: r,
            sessionTotalLength: t.sessionTotalLength,
            sessionUUID: this.context.getProperty("sessionUUID"),
            ...common.info.properties()
        })
          , u = common.extend({}, {
            builtinData: c
        }, i);
        if (s === BUSINESS_EVENT_TYPE && this.checkChannel() && this.buffer.caching({
            sessionReferrer: document.URL
        }),
        this.context.getConfig("SPA").open || ["tr_activate", "tr_session_close"].indexOf(e) > 0 && this.buffer.caching({
            sessionReferrer: document.URL
        }),
        this.context.getConfig("SPA").open) {
            const e = this.context.getProperty("sessionReferrer");
            e !== u.referrer && (u.builtinData.referrer = e,
            u.builtinData.referringDomain = common.info.domain(e))
        }
        u.builtinData = common.JSONEncode(u.builtinData);
        const d = this.context.getConfig("truncateLength");
        let f = u;
        common.isNumber(d) && d > 0 && (f = common.truncate(u, d));
        const p = e => {
            if (n(e, u),
            0 === e.status && this.context.getConfig("retention")) {
                const e = common.extend({}, u);
                if (e.builtinData = common.JSONDecode(e.builtinData),
                0 === e.builtinData.eventId.indexOf("r_"))
                    return;
                let t = this.buffer.getTargetData("Retention");
                common.isArray(t) || (t = []),
                e.builtinData.eventId = "r_" + e.builtinData.eventId,
                t.push(e),
                this.buffer.saveRetentionData("Retention", t, 1)
            }
        }
          , h = this.context.getConfig("reportUrl")
          , m = this.context.getConfig("trackType")
          , _ = this.context.getConfig("encrypt");
        !this.context.getConfig("useBuiltinData") && f && f.hasOwnProperty("builtinData") && delete f.builtinData;
        const v = _ ? {
            data: common.encodeData(common.JSONEncode(f)),
            appId: this.context.getConfig("appId")
        } : {
            ...f,
            appId: this.context.getConfig("appId")
        }
          , g = this.context.getConfig("saveLocalRetainPEKeys");
        if (this.context.getConfig("useRetainPreviousEvent") && common.isArray(g) && g.length > 0) {
            const e = this.buffer.getTargetData("PreviousEventData");
            if (common.isObject(e)) {
                const t = this.context.getConfig("employRetainPEDataKeys");
                if (common.isArray(t) ? Object.keys(e).forEach((n => {
                    const o = {}
                      , r = e[n];
                    t.forEach((e => {
                        if (common.isRegExp(e)) {
                            const t = new RegExp(e);
                            Object.keys(r).forEach((e => {
                                t.test(e) && !common.isUndefined(r[e]) && (o[e] = r[e])
                            }
                            ))
                        } else
                            common.isString(e) && !common.isUndefined(r[e]) && (o[e] = r[e])
                    }
                    )),
                    v[n] = common.JSONEncode(common.extend({}, o))
                }
                )) : console$1.error("employRetainPEDataKeys should be an array"),
                Object.keys(e).length !== g.length)
                    for (let n = 0; n < g.length; n++) {
                        const t = g[n];
                        if (!e[t]) {
                            e[t] = common.extend({}, v);
                            break
                        }
                    }
                else {
                    const t = g.length;
                    for (let n = 0; n < t - 1; n++)
                        e[g[n]] = common.extend({}, e[g[n + 1]]);
                    e[g[t - 1]] = common.extend({}, v)
                }
                this.buffer.saveRetentionData("PreviousEventData", e, 1)
            }
        } else
            console$1.error("saveLocalRetainPEKeys should be an array");
        if (console$1.log("事件 " + e + " 上报的数据:", v),
        "function" == typeof this.context.config.onBeforeSend) {
            if (this.context.config.onBeforeSend(v, common, p))
                return
        }
        common.sendRequest(h, m, v, p),
        -1 === ["tr_session_start", "tr_session_close", "tr_activate"].indexOf(e) && this.checkSession(),
        -1 === ["tr_session_start", "tr_session_close"].indexOf(e) && this.buffer.caching({
            LASTEVENT: {
                eventId: e,
                triggerTime: l
            }
        })
    }
}
let Buffer$1 = class {
    constructor(e) {
        const t = e.bufferConfig;
        if (common.isObject(t)) {
            this.name = t.name || "track_report_" + e.appId + "_sdk";
            let n = t.type;
            this.setDisabled(t.disable),
            "localStorage" === n && common.localStorage_supported() ? this.buffer = common.localStorage : (this.buffer = common.cookie,
            this.setCookieOptions(t)),
            this.getLocalData(),
            this.save()
        } else
            console$1.error("buffer配置设置错误")
    }
    setDisabled(e) {
        this.disabled = e,
        this.disabled && this.removeLocalData()
    }
    getLocalData() {
        const e = this.buffer.parse(this.name);
        e && (this.props = common.extend({}, e))
    }
    getTargetData(e) {
        return this.buffer.parse(e)
    }
    setCookieOptions(e) {
        this.setCookieSecure(e.cookie_secure),
        this.setCrossSubdomain(e.cookie_cross_subdomain),
        this.defaultExpirationTime = this.expirationTime = e.cookie_expiration
    }
    setCookieSecure(e) {
        e !== this.isSecure && (this.isSecure = !!e,
        this.removeLocalData(),
        this.save())
    }
    setCrossSubdomain(e) {
        e !== this.isCrossSubdomain && (this.isCrossSubdomain = e,
        this.removeLocalData(),
        this.save())
    }
    save(e) {
        this.disabled || this.buffer.set(e || this.name, common.JSONEncode(this.props), this.isSecure, this.isCrossSubdomain, this.expirationTime)
    }
    saveRetentionData(e, t, n) {
        this.disabled || this.buffer.set(e || this.name, common.JSONEncode(t), this.isSecure, this.isCrossSubdomain, void 0 === n ? this.defaultExpirationTime : n)
    }
    removeLocalData(e) {
        this.buffer.remove(e || this.name, !1),
        this.buffer.remove(e || this.name, !0)
    }
    caching(e, t, n) {
        return !!common.isObject(e) && (this.expirationTime = void 0 === n ? this.defaultExpirationTime : n,
        common.extend(this.props, e),
        this.save(void 0 === t ? this.name : t),
        !0)
    }
    removeCachedData(e) {
        e in this.props && (delete this.props[e],
        this.save())
    }
    setConsumingTime(e, t) {
        const n = this.props.costTime || {};
        n[e] = t,
        this.props.costTime = n,
        this.save()
    }
    removeEventTimer(e) {
        const t = (this.props.costTime || {})[e];
        return common.isUndefined(t) || (delete this.props.costTime[e],
        this.save()),
        t
    }
}
;
const getPath = () => location.pathname + location.search
  , override = (e, t, n) => {
    if (e[t]) {
        const o = e[t];
        e[t] = function() {
            n.apply(this, arguments),
            o.apply(this, arguments)
        }
    } else
        e[t] = function() {
            n.apply(this, arguments)
        }
}
  , defaultConfig = {
    mode: "hash",
    callback: () => {}
};
class SPA {
    constructor(e) {
        this.init(e)
    }
    init(e) {
        this.url = document.URL,
        this.path = getPath(),
        this.config = common.extend(defaultConfig, e || {}),
        this.bindEvent()
    }
    bindEvent() {
        if ("history" === this.config.mode) {
            if (!history.pushState || !window.addEventListener)
                return;
            override(history, "pushState", this.overridePushState.bind(this)),
            override(history, "replaceState", this.overrideReplaceState.bind(this)),
            window.addEventListener("popstate", this.handlePopState.bind(this))
        } else {
            if ("hash" !== this.config.mode)
                return void console$1.error("mode error");
            common.register_hash_event(this.handleHashState.bind(this))
        }
    }
    overridePushState() {
        this.urlChangeHandler(!0)
    }
    overrideReplaceState() {
        this.urlChangeHandler(!1)
    }
    handlePopState() {
        this.urlChangeHandler(!0)
    }
    handleHashState() {
        this.urlChangeHandler(!0)
    }
    urlChangeHandler(e) {
        setTimeout(( () => {
            if ("history" === this.config.mode) {
                const t = this.path
                  , n = getPath();
                t != n && this.checkUrl(n, t) && (this.path = n,
                e && common.isFunction(this.config.callback) && (this.config.callback.call(),
                common.innerEvent.trigger("singlePage:change", {
                    oldUrl: this.url,
                    nowUrl: document.URL
                }),
                this.url = document.URL))
            } else
                "hash" === this.config.mode && common.isFunction(this.config.callback) && (this.config.callback.call(),
                common.innerEvent.trigger("singlePage:change", {
                    oldUrl: this.url,
                    nowUrl: document.URL
                }),
                this.url = document.URL)
        }
        ), 0)
    }
    checkUrl(e, t) {
        return !(!e || !t)
    }
}
class PBD {
    constructor(e) {
        this.storage_name = "qd_page_browsing",
        this.min_limit = 2e3,
        this.options = {},
        this.page_id = null,
        this.url = location.href,
        this.start_time = +new Date,
        this.page_show_status = !0,
        this.page_hidden_status = !1,
        this.beat_time = 1e3,
        this.beat_timer = null,
        this.beat_count = 0,
        this.min_duration = 18e4,
        this.max_noBehavior = 6e4,
        this.isNoBehavior = !1,
        this.behavior_timer = null,
        this.isWatchBeat = !1,
        this.watchBeatTimer = null,
        this.watchBeatDuration = 0,
        this.watchBeatUpdate = null,
        this.watchBeatCount = 0,
        this.watchBeatDurationDone = null,
        this.isWatchBeatDurationDone = !1,
        this.debug = !1,
        this.init(e)
    }
    init(e) {
        if (e) {
            this.options = e;
            const t = e.min_limit;
            t && (this.isNumber(t) || this.isNumber(1 * t)) && 1 * t > 0 && (this.min_limit = t);
            const n = e.min_duration;
            n && (this.isNumber(n) || this.isNumber(1 * n)) && 1 * n > 0 && (this.min_duration = n);
            const o = e.max_noBehavior;
            o && (this.isNumber(o) || this.isNumber(1 * o)) && 1 * o > 0 && (this.max_noBehavior = o),
            this.isWatchBeat = e.isWatchBeat;
            const r = e.watchBeatDuration;
            r && (this.isNumber(r) || this.isNumber(1 * r)) && 1 * r > 0 && (this.watchBeatDuration = r),
            this.watchBeatUpdate = e.watchBeatUpdate,
            this.watchBeatDurationDone = e.watchBeatDurationDone,
            this.isLoopWatchBeat = e.isLoopWatchBeat,
            this.debug = e.debug,
            this.page_id = e.page_id,
            this.max_noBehavior >= this.watchBeatDuration && this.max_noBehavior % this.watchBeatDuration == 0 && (this.max_noBehavior += 1e3)
        }
        this.isUrlListening(this.url) && (this.addEventListener(),
        !0 === document.hidden ? this.page_show_status = !1 : (this.startBeat(),
        this.startWatchBeatTimer()))
    }
    pageStartHandler() {
        this.start_time = +new Date,
        !0 == !document.hidden ? this.page_show_status = !0 : this.page_show_status = !1,
        this.url = location.href
    }
    pageHiddenHandler() {
        this.page_hidden_status = !1
    }
    pageEndHandler() {
        if (!0 !== this.page_hidden_status) {
            this.url = location.href;
            var e = this.getProps();
            !1 === this.page_show_status && delete e.$event_duration,
            this.page_show_status = !1,
            this.page_hidden_status = !0,
            this.sendData(e),
            this.pageHiddenHandler(),
            this.removeBeatData()
        }
    }
    addEventListener() {
        this.addPageStartListener(),
        this.addPageSwitchListener(),
        this.addPageEndListener(),
        this.addBehaviorListener()
    }
    addBehaviorListener() {
        var e = this;
        "onscroll"in window && window.addEventListener("scroll", e.throttle((function() {
            e.isNoBehavior ? (e.console("====滚动重启状态了", e.isNoBehavior),
            e.pageStartHandler(),
            e.pageHiddenHandler(),
            e.startBeat(),
            e.startWatchBeatTimer(),
            e.startBehaviorTimer()) : (e.console("====滚动"),
            e.startBehaviorTimer())
        }
        ), 1e3)),
        e.startBehaviorTimer()
    }
    startBehaviorTimer() {
        var e = this;
        e.isNoBehavior = !1,
        e.behavior_timer && e.stopBehaviorTimer(),
        e.console("====开始行为监听倒计时了"),
        e.behavior_timer = setTimeout((function() {
            e.isNoBehavior = !0,
            e.pageEndHandler(),
            e.stopBeat(),
            e.stopWatchBeatTimer(),
            e.stopBehaviorTimer(),
            e.console("====超出行为监听时长，强制发送并停止了")
        }
        ), e.max_noBehavior)
    }
    stopBehaviorTimer() {
        clearTimeout(this.behavior_timer),
        this.behavior_timer = null
    }
    addPageStartListener() {
        var e = this;
        "onpageshow"in window && window.addEventListener("pageshow", (function() {
            e.pageStartHandler(),
            e.pageHiddenHandler()
        }
        ))
    }
    addPageEndListener() {
        var e = this;
        this.each(["pagehide", "beforeunload", "unload"], (function(t) {
            "on" + t in window && window.addEventListener(t, (function() {
                e.pageEndHandler(),
                e.stopBeat(),
                e.stopWatchBeatTimer()
            }
            ))
        }
        ))
    }
    addPageSwitchListener() {
        var e = this;
        e.listenPageState({
            visible: function() {
                e.console("====可见了"),
                e.pageStartHandler(),
                e.pageHiddenHandler(),
                e.startBeat(),
                e.startWatchBeatTimer(),
                e.startBehaviorTimer()
            },
            hidden: function() {
                e.console("====不可见了"),
                e.pageEndHandler(),
                e.stopBeat(),
                e.stopWatchBeatTimer(),
                e.stopBehaviorTimer()
            }
        })
    }
    automaticHandler() {
        this.pageEndHandler(),
        this.stopBeat(),
        this.pageStartHandler(),
        this.pageHiddenHandler(),
        this.startBeat()
    }
    isUrlListening(e) {
        return "function" == typeof this.options.isUrlListening ? "string" != typeof e || "" === e || this.options.isUrlListening(e) : "boolean" != typeof this.options.isUrlListening || this.options.isUrlListening
    }
    listenPageState(e) {
        ({
            visibleHandler: this.isFunction(e.visible) ? e.visible : function() {}
            ,
            hiddenHandler: this.isFunction(e.hidden) ? e.hidden : function() {}
            ,
            visibilityChange: null,
            hidden: null,
            isSupport: function() {
                return void 0 !== document[this.hidden]
            },
            init: function() {
                void 0 !== document.hidden ? (this.hidden = "hidden",
                this.visibilityChange = "visibilitychange") : void 0 !== document.mozHidden ? (this.hidden = "mozHidden",
                this.visibilityChange = "mozvisibilitychange") : void 0 !== document.msHidden ? (this.hidden = "msHidden",
                this.visibilityChange = "msvisibilitychange") : void 0 !== document.webkitHidden && (this.hidden = "webkitHidden",
                this.visibilityChange = "webkitvisibilitychange"),
                this.listen()
            },
            listen: function() {
                if (this.isSupport()) {
                    var e = this;
                    document.addEventListener(this.visibilityChange, (function() {
                        document[e.hidden] ? e.hiddenHandler() : e.visibleHandler()
                    }
                    ), 1)
                } else
                    window.addEventListener("focus", this.visibleHandler),
                    window.addEventListener("blur", this.hiddenHandler)
            }
        }).init()
    }
    startWatchBeatTimer() {
        var e = this;
        if (!this.isWatchBeat || e.isWatchBeatDurationDone || e.watchBeatTimer)
            return;
        let t = e.watchBeatDuration;
        e.isWatchBeatDurationDone || (t -= 1e3 * e.watchBeatCount),
        e.watchBeatTimer = setTimeout((function() {
            e.isFunction(e.watchBeatDurationDone) && (e.watchBeatDurationDone(),
            e.isWatchBeatDurationDone = !0,
            e.watchBeatCount = 0),
            e.stopWatchBeatTimer()
        }
        ), t)
    }
    stopWatchBeatTimer() {
        clearTimeout(this.watchBeatTimer),
        this.watchBeatTimer = null
    }
    startBeat() {
        var e = this;
        e.isSupportedLocalStorage() && (this.beat_timer && this.stopBeat(),
        this.beat_timer = setInterval((function() {
            e.console("====心跳"),
            e.beat_count += 1,
            e.isWatchBeat && e.isFunction(e.watchBeatUpdate) && !e.isWatchBeatDurationDone && (e.watchBeatCount += 1,
            e.watchBeatUpdate(e.watchBeatCount)),
            e.saveBeatData()
        }
        ), this.beat_time),
        this.saveBeatData("first_beat"))
    }
    stopBeat() {
        clearInterval(this.beat_timer),
        this.beat_timer = null,
        this.beat_count = 0
    }
    saveBeatData(e) {
        var t = this.getProps()
          , n = new Date;
        t.$time = n,
        "first_beat" === e && (t.$event_duration = -1);
        var o = this.extend({}, t)
          , r = "";
        try {
            r = JSON.stringify(o)
        } catch (i) {}
        window.localStorage.setItem(this.storage_name + "-" + this.page_id, encodeURIComponent(r)),
        o.$event_duration > this.min_duration && (this.automaticHandler(),
        this.console("====发送后重启心跳了"))
    }
    removeBeatData(e) {
        window.localStorage.removeItem(e || this.storage_name + "-" + this.page_id)
    }
    reSendBeatData() {
        for (var e = window.localStorage.length - 1; e >= 0; e--) {
            var t = window.localStorage.key(e);
            if (t && t !== this.storage_name + "-" + this.page_id && 0 === t.indexOf(this.storage_name + "-")) {
                var n = decodeURIComponent(window.localStorage.getItem(t) || "");
                try {
                    n = JSON.parse(n)
                } catch (o) {}
                this.isObject(n) && 1 * new Date - 1 * new Date(n.$time) > 2 * this.beat_time && (this.sendData(n),
                this.removeBeatData(t))
            }
        }
    }
    getProps() {
        var e = +new Date
          , t = e - this.start_time
          , n = {
            $url: this.url,
            $current_time: e,
            $start_time: this.start_time
        };
        return 0 !== t && (n.$event_duration = t),
        n = this.extend({}, n)
    }
    sendData(e) {
        e.$event_duration && e.$event_duration < this.min_limit || !e.$event_duration || (this.console(this.isFunction(this.options.sendData)),
        this.isFunction(this.options.sendData) && this.options.sendData(e))
    }
    isString(e) {
        return "[object String]" == Object.prototype.toString.call(e)
    }
    isNumber(e) {
        return "[object Number]" == Object.prototype.toString.call(e) && /[\d\.]+/.test(String(e))
    }
    isObject(e) {
        return null != e && "[object Object]" == Object.prototype.toString.call(e)
    }
    isFunction(e) {
        if (!e)
            return !1;
        var t = Object.prototype.toString.call(e);
        return "[object Function]" == t || "[object AsyncFunction]" == t
    }
    isSupportedLocalStorage() {
        var e = !0;
        try {
            var t = "__support_localStorage__"
              , n = "isSupportedLocalStorage";
            window.localStorage.setItem(t, n),
            window.localStorage.getItem(t) !== n && (e = !1),
            window.localStorage.removeItem(t)
        } catch (o) {
            e = !1
        }
        return e
    }
    each(e, t, n) {
        if (null != e)
            if (Array.prototype.forEach && e.forEach === Array.prototype.forEach)
                e.forEach(t, n);
            else
                for (var o in e)
                    if (e.hasOwnProperty.call(e, o) && t.call(n, e[o], o, e) === breaker)
                        return
    }
    extend(e) {
        return this.each(Array.prototype.slice.call(arguments, 1), (function(t) {
            for (var n in t)
                void 0 !== t[n] && (e[n] = t[n])
        }
        )),
        e
    }
    console() {
        this.debug
    }
    throttle(e, t) {
        let n;
        return function() {
            let o = arguments
              , r = this;
            n || (n = setTimeout((function() {
                e.apply(r, o),
                n = null
            }
            ), t))
        }
    }
}
class TRIndex {
    constructor(e, t) {
        if ("string" != typeof e && "number" != typeof e)
            throw new Error("appId is required and can be either a string or a number");
        if (!t.reportUrl)
            throw new Error("The reportUrl of config is required");
        this.__loaded = !0,
        this.common = common,
        this.plugins = ["PBD"],
        this.config = {},
        this.setConfig(common.extend({}, DEFAULT_CONFIG, t, {
            appId: e
        })),
        this.buffer = new Buffer$1(this.config),
        this.onLoad(),
        this.event = new EventTrack(this),
        this.setDeviceId(),
        this.buffer.caching({
            persistedTime: (new Date).getTime()
        }),
        this.SPAInit(),
        this.trackPVInit(),
        this.initAutoTR(),
        this.initAutoClickTR()
    }
    onLoad() {
        try {
            this.getConfig("onLoad")(this)
        } catch (e) {
            console$1.error(e)
        }
    }
    use(e, t) {
        -1 !== this.plugins.indexOf(e) ? (this[e] = new PBD(t),
        console$1.log(this)) : console$1.log("plugin name error")
    }
    initAutoTR() {
        const e = this;
        if (!this.getConfig("autoTR"))
            return;
        if ("undefined" == typeof IntersectionObserver && console$1.error("The current browser does not support auto-tr."),
        this.observer && (this.disconnectObserver(),
        this.observer = null),
        this.observer_autoClass = this.getConfig("autoClass"),
        "string" != typeof this.observer_autoClass)
            throw new Error("autoClass is required and can be  a string");
        const t = this.getConfig("autoType");
        if ("string" != typeof t)
            throw new Error("autoType is required and can be  a string");
        const n = this.getConfig("autoOnceClass");
        if ("string" != typeof n)
            throw new Error("autoOnceClass is required and can be  a string");
        this.observer = new IntersectionObserver((function(o) {
            o.forEach((function(o, r) {
                if (!o.isIntersecting)
                    return;
                const i = o.target
                  , a = e.getConfig("bubbleStopFlagPrefixForShow")
                  , s = a + e.getConfig("bubbleStopFlag")
                  , l = common.createClassReg(e.observer_autoClass)
                  , c = common.autoTraverseDomUp(i, l, s, e.getConfig("autoParamHook"), "exposure", a);
                if (c) {
                    e.trackEvent("tr_auto_dom", common.extend({}, c));
                    (common.createClassReg(n).test(i.getAttribute("class")) || "once" === t) && (e.observer.unobserve(i),
                    i.classList.remove(e.observer_autoClass))
                }
            }
            ))
        }
        ),{
            root: null,
            rootMargin: "0px",
            threshold: .25
        }),
        this.updateObserver()
    }
    updateObserver() {
        const e = this;
        document.querySelectorAll || (document.querySelectorAll = function(e) {
            var t, n = document.createElement("style"), o = [];
            for (document.documentElement.firstChild.appendChild(n),
            document._qsa = [],
            n.styleSheet.cssText = e + "{x-qsa:expression(document._qsa && document._qsa.push(this))}",
            window.scrollBy(0, 0),
            n.parentNode.removeChild(n); document._qsa.length; )
                (t = document._qsa.shift()).style.removeAttribute("x-qsa"),
                o.push(t);
            return document._qsa = null,
            o
        }
        );
        document.querySelectorAll(".".concat(this.observer_autoClass)).forEach((t => {
            t && e.observer.observe(t)
        }
        ))
    }
    disconnectObserver() {
        this.observer.disconnect()
    }
    addListener(e) {
        e && this.observer.observe(e)
    }
    removeListener(e) {
        e && this.observer.unobserve(e)
    }
    initAutoClickTR() {
        const e = this;
        document.onclick = null,
        this.observer_autoClickClass = this.getConfig("autoClickClass");
        const t = common.createClassReg(this.observer_autoClickClass);
        document.onclick = n => {
            if (n && (!1 === n.isTrusted || 0 === n.pageY && 0 === n.screenY))
                return;
            const o = n.target
              , r = Math.round(o.getBoundingClientRect().left + window.scrollX) || ""
              , i = Math.round(o.getBoundingClientRect().top + window.scrollY) || ""
              , a = e.getConfig("bubbleStopFlag")
              , s = common.autoTraverseDomUp(o, t, a, e.getConfig("autoParamHook"), "click");
            s && e.trackEvent("tr_auto_dom_click", common.extend({}, s, {
                x: r,
                y: i
            }))
        }
    }
    trackPVInit() {
        this.getConfig("pageAuto") ? this.event.trackPV() : this.event.checkSession()
    }
    SPAInit() {
        this.getConfig("SPA").open && new SPA({
            mode: this.getConfig("SPA").mode,
            callback: () => {
                this.trackPVInit()
            }
        })
    }
    setConfig(e) {
        common.isObject(e) && (this.config = common.extend(this.config, e),
        LIB_CONFIG.DEBUG = LIB_CONFIG.DEBUG || this.getConfig("debug"))
    }
    getConfig(e) {
        return this.config[e]
    }
    setDeviceId() {
        this.getDeviceId() || (this.buffer.caching({
            deviceId: common.UUID()
        }),
        this.trackEvent("tr_activate"))
    }
    getDeviceId() {
        return this.getProperty("deviceId")
    }
    getProperty(e) {
        return this.buffer.props[e]
    }
    addConsumingTimeListener(e) {
        this.event.setConsumingTimeListener(e)
    }
    trackPV(e, t) {
        this.event.trackPV(e, t)
    }
    trackEvent(e, t, n, o) {
        this.event.track(e, t, n, o)
    }
    setEventCustomProperties(e, t) {
        let n = {}
          , o = this.getProperty("customProperties");
        common.isObject(e) && common.each(e, ( (e, t) => {
            n[t] = e
        }
        )),
        o = t ? common.extend({}, o, n) : common.extend({}, n, o),
        this.buffer.caching({
            customProperties: o
        })
    }
    deleteEventCustomProperties(e) {
        if (common.isString(e)) {
            let t = this.getProperty("customProperties");
            common.isObject(t) && (delete t[e],
            this.buffer.caching({
                customProperties: t
            }))
        }
    }
    removeAllCustomProperties() {
        this.buffer.caching({
            customProperties: {}
        })
    }
    getEventCustomProperties() {
        return this.getProperty("customProperties")
    }
}
const getSEOReferer = () => {
    let e = getCookie("traffic_utm_referer") || "";
    const t = new RegExp(/^(?:http(?:s)?:\/\/)?(?:[^\.]+\.)?(qidian|qdmm|yuewen)\.com/);
    document.referrer && !t.test(document.referrer) && (e = new URL(document.referrer).origin + new URL(document.referrer).pathname);
    const n = new Date((new Date).toLocaleDateString()).getTime() + 864e5 - 1 - (new Date).getTime();
    setCookie("traffic_utm_referer", e ? new URL(e).origin + new URL(e).pathname : "", ".qidian.com", "/", n)
}
  , getSEOEngine = () => {
    if (!getCookie("traffic_search_engine") && document.referrer) {
        const e = new URL(document.referrer).hostname;
        let t = "";
        /(\.baidu|cache\.baiducontent|mbaiducom\.bceapp)\.com$/.test(e) ? t = "baidu" : /(\.google\.|webcache\.googleusercontent\.com)/.test(e) ? t = "google" : /(sogou|soso|sogoucdn)\.com$/.test(e) ? t = "sougou" : /quark\.sm\.cn$/.test(e) ? t = "quark" : /sm\.cn$/.test(e) ? t = "sm" : /\.yahoo\.com$/.test(e) ? t = "yahoo" : /(nativeapp|m|so)\.toutiao\.com$/.test(e) ? t = "toutiao" : /(360webcache|so|haosou)\.com$/.test(e) ? t = "360" : /bing\.com$/.test(e) && (t = "bing"),
        setCookie("traffic_search_engine", t, ".qidian.com", "/", 6048e5)
    }
    setCookie("se_ref", getCookie("traffic_search_engine"), ".qidian.com", "/")
}
  , track = (e, t) => {
    var n;
    const o = (null == (n = document.getElementById("app")) ? void 0 : n.getAttribute("data-pid")) || ""
      , r = "mqd_P_book" === o || "mqd_P_bookread" === o || "qd_P_read" === o || "qd_P_vipread" === o
      , i = "//".concat("", "qdp.qidian.com/qreport")
      , {cname: a, path: s} = t;
    return new TRIndex(e,{
        reportUrl: i,
        debug: !1,
        useRetainPreviousEvent: !0,
        saveLocalRetainPEKeys: ["e1", "e2"],
        employRetainPEDataKeys: ["eid", "pid", /l[1-9]/],
        onLoad: e => {
            getSEOReferer(),
            getSEOEngine();
            const t = {
                app: "QD",
                cname: a,
                path: s,
                isQD: !0,
                sw: screen.width,
                sh: screen.height,
                url: location.href,
                ref: document.referrer,
                title: document.title,
                traffic_utm_referer: getCookie("traffic_utm_referer"),
                l6: ""
            };
            r && (t.l6 = "1"),
            e.setEventCustomProperties(t, !0)
        }
        ,
        autoTR: !0,
        autoParamHook: (e, t) => {
            let n = ""
              , i = "";
            "exposure" === t ? (n = (null == e ? void 0 : e.getAttribute("data-showeid")) || "",
            i = (null == e ? void 0 : e.getAttribute("data-showl1")) || "") : (n = (null == e ? void 0 : e.getAttribute("data-eid")) || "",
            i = (null == e ? void 0 : e.getAttribute("data-l1")) || "");
            const a = {
                pid: o,
                ltype: (null == e ? void 0 : e.getAttribute("data-ltype")) || "click" === t ? "A" : "H",
                eid: n,
                type: (null == e ? void 0 : e.getAttribute("data-type")) || "",
                l1: i,
                l2: (null == e ? void 0 : e.getAttribute("data-l2")) || "",
                l3: (null == e ? void 0 : e.getAttribute("data-l3")) || "",
                l4: (null == e ? void 0 : e.getAttribute("data-l4")) || "",
                l5: (null == e ? void 0 : e.getAttribute("data-l5")) || "",
                l6: (null == e ? void 0 : e.getAttribute("data-l6")) || "",
                l7: (null == e ? void 0 : e.getAttribute("data-l7")) || "",
                bid: (null == e ? void 0 : e.getAttribute("data-bid")) || "",
                cid: (null == e ? void 0 : e.getAttribute("data-cid")) || "",
                auid: (null == e ? void 0 : e.getAttribute("data-auid")) || "",
                tid: (null == e ? void 0 : e.getAttribute("data-tid")) || "",
                rid: (null == e ? void 0 : e.getAttribute("data-rid")) || "",
                kw: (null == e ? void 0 : e.getAttribute("data-kw")) || "",
                is_daoliu: (null == e ? void 0 : e.getAttribute("data-is_daoliu")) || "",
                testid: (null == e ? void 0 : e.getAttribute("data-testid")) || "",
                bookstatus: (null == e ? void 0 : e.getAttribute("data-bookstatus")) || "",
                param: (null == e ? void 0 : e.getAttribute("data-param")) || "",
                qd_dd_p1: "1" === (null == e ? void 0 : e.getAttribute("data-qd_dd_p1")) ? null == e ? void 0 : e.href : ""
            };
            return r && (a.l6 = "1"),
            a
        }
        ,
        onBeforeSend: e => {
            if ("P" !== e.ltype && "t" !== e.ltype && !e.eid)
                return !0;
            const t = Object.keys(e).map((t => "".concat(t, "=").concat(encodeURIComponent("".concat(e[t], "&")))));
            return ["qduid", "stat_gid", "stat_sessid", "muniqUUID", "ywguid", "newstatisticUUID", "se_ref", "se_ref_bid"].forEach((e => {
                const n = getCookie(e);
                n && t.push("".concat(e, "=").concat(encodeURIComponent("".concat(n, "&"))))
            }
            )),
            t.push("User-Agent=".concat(encodeURIComponent("".concat(navigator.userAgent, "&")))),
            !1
        }
    })
}
;
let trackInstance = null;
const getTrackInstance = e => trackInstance || (trackInstance = track("qdpc", {
    path: "pclog",
    cname: e ? "QDmmlog" : "QDpclog",
    server: "QDPC",
    logName: "pc_log"
}),
trackInstance)
  , trackEvent = (e, t, n, o) => {
    let r = 0
      , i = 0;
    n && (r = (null == n ? void 0 : n.pageX) || 0,
    i = (null == n ? void 0 : n.pageY) || 0),
    trackInstance || (trackInstance = getTrackInstance(o));
    const a = (null == t ? void 0 : t.pid) ? t.pid : window.pid;
    null == trackInstance || trackInstance.trackEvent(e, {
        pid: a,
        x: r,
        y: i,
        ...t
    })
}
;
export {_sfc_main$D as A, BottomButton as B, useToast as C, vModelText as D, ErrorType as E, PlatformType as F, zh_HK_default as G, getFlippedMap as H, loginOut as I, checkSupport3rdpCookie as J, getDDLUrl as K, NavBar as N, Print as P, ReviewList as R, ServiceError as S, Tooltip as T, _sfc_main$V as _, getTrackInstance as a, createSSRApp as b, createApp as c, axiosInstance as d, getUserMsg as e, commonjsGlobal as f, getCookie as g, getDefaultExportFromCjs as h, _sfc_main$1l as i, trackEvent as j, initReader as k, login as l, getCsrfToken as m, getQueryVariable as n, getBookCurChapterType as o, TitlePage as p, Subscription as q, BookmarkList as r, setCookie as s, transformChineseBase as t, Transition as u, vShow as v, _sfc_main$o as w, _sfc_main$b as x, desktop as y, getBookDetailUrl as z};
