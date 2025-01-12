!function (e) {
    e.AV = e.AV || {}, e.AV.VERSION = "js0.5.4"
}(this), function () {
    var e = this, t = e._, n = {}, i = Array.prototype, r = Object.prototype, s = Function.prototype, a = i.push, o = i.slice, u = i.concat, c = r.toString, l = r.hasOwnProperty, h = i.forEach, d = i.map, f = i.reduce, _ = i.reduceRight, p = i.filter, m = i.every, v = i.some, g = i.indexOf, b = i.lastIndexOf, y = Array.isArray, w = Object.keys, A = s.bind, O = function (e) {
        return e instanceof O ? e : this instanceof O ? void(this._wrapped = e) : new O(e)
    };
    "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = O), exports._ = O) : e._ = O, O.VERSION = "1.4.4";
    var S = O.each = O.forEach = function (e, t, i) {
        if (null != e)if (h && e.forEach === h)e.forEach(t, i); else if (e.length === +e.length) {
            for (var r = 0, s = e.length; s > r; r++)if (t.call(i, e[r], r, e) === n)return
        } else for (var a in e)if (O.has(e, a) && t.call(i, e[a], a, e) === n)return
    };
    O.map = O.collect = function (e, t, n) {
        var i = [];
        return null == e ? i : d && e.map === d ? e.map(t, n) : (S(e, function (e, r, s) {
            i[i.length] = t.call(n, e, r, s)
        }), i)
    };
    var x = "Reduce of empty array with no initial value";
    O.reduce = O.foldl = O.inject = function (e, t, n, i) {
        var r = arguments.length > 2;
        if (null == e && (e = []), f && e.reduce === f)return i && (t = O.bind(t, i)), r ? e.reduce(t, n) : e.reduce(t);
        if (S(e, function (e, s, a) {
                r ? n = t.call(i, n, e, s, a) : (n = e, r = !0)
            }), !r)throw new TypeError(x);
        return n
    }, O.reduceRight = O.foldr = function (e, t, n, i) {
        var r = arguments.length > 2;
        if (null == e && (e = []), _ && e.reduceRight === _)return i && (t = O.bind(t, i)), r ? e.reduceRight(t, n) : e.reduceRight(t);
        var s = e.length;
        if (s !== +s) {
            var a = O.keys(e);
            s = a.length
        }
        if (S(e, function (o, u, c) {
                u = a ? a[--s] : --s, r ? n = t.call(i, n, e[u], u, c) : (n = e[u], r = !0)
            }), !r)throw new TypeError(x);
        return n
    }, O.find = O.detect = function (e, t, n) {
        var i;
        return E(e, function (e, r, s) {
            return t.call(n, e, r, s) ? (i = e, !0) : void 0
        }), i
    }, O.filter = O.select = function (e, t, n) {
        var i = [];
        return null == e ? i : p && e.filter === p ? e.filter(t, n) : (S(e, function (e, r, s) {
            t.call(n, e, r, s) && (i[i.length] = e)
        }), i)
    }, O.reject = function (e, t, n) {
        return O.filter(e, function (e, i, r) {
            return !t.call(n, e, i, r)
        }, n)
    }, O.every = O.all = function (e, t, i) {
        t || (t = O.identity);
        var r = !0;
        return null == e ? r : m && e.every === m ? e.every(t, i) : (S(e, function (e, s, a) {
            return (r = r && t.call(i, e, s, a)) ? void 0 : n
        }), !!r)
    };
    var E = O.some = O.any = function (e, t, i) {
        t || (t = O.identity);
        var r = !1;
        return null == e ? r : v && e.some === v ? e.some(t, i) : (S(e, function (e, s, a) {
            return r || (r = t.call(i, e, s, a)) ? n : void 0
        }), !!r)
    };
    O.contains = O.include = function (e, t) {
        return null == e ? !1 : g && e.indexOf === g ? -1 != e.indexOf(t) : E(e, function (e) {
            return e === t
        })
    }, O.invoke = function (e, t) {
        var n = o.call(arguments, 2), i = O.isFunction(t);
        return O.map(e, function (e) {
            return (i ? t : e[t]).apply(e, n)
        })
    }, O.pluck = function (e, t) {
        return O.map(e, function (e) {
            return e[t]
        })
    }, O.where = function (e, t, n) {
        return O.isEmpty(t) ? n ? null : [] : O[n ? "find" : "filter"](e, function (e) {
            for (var n in t)if (t[n] !== e[n])return !1;
            return !0
        })
    }, O.findWhere = function (e, t) {
        return O.where(e, t, !0)
    }, O.max = function (e, t, n) {
        if (!t && O.isArray(e) && e[0] === +e[0] && e.length < 65535)return Math.max.apply(Math, e);
        if (!t && O.isEmpty(e))return -1 / 0;
        var i = {computed: -1 / 0, value: -1 / 0};
        return S(e, function (e, r, s) {
            var a = t ? t.call(n, e, r, s) : e;
            a >= i.computed && (i = {value: e, computed: a})
        }), i.value
    }, O.min = function (e, t, n) {
        if (!t && O.isArray(e) && e[0] === +e[0] && e.length < 65535)return Math.min.apply(Math, e);
        if (!t && O.isEmpty(e))return 1 / 0;
        var i = {computed: 1 / 0, value: 1 / 0};
        return S(e, function (e, r, s) {
            var a = t ? t.call(n, e, r, s) : e;
            a < i.computed && (i = {value: e, computed: a})
        }), i.value
    }, O.shuffle = function (e) {
        var t, n = 0, i = [];
        return S(e, function (e) {
            t = O.random(n++), i[n - 1] = i[t], i[t] = e
        }), i
    };
    var C = function (e) {
        return O.isFunction(e) ? e : function (t) {
            return t[e]
        }
    };
    O.sortBy = function (e, t, n) {
        var i = C(t);
        return O.pluck(O.map(e, function (e, t, r) {
            return {value: e, index: t, criteria: i.call(n, e, t, r)}
        }).sort(function (e, t) {
            var n = e.criteria, i = t.criteria;
            if (n !== i) {
                if (n > i || void 0 === n)return 1;
                if (i > n || void 0 === i)return -1
            }
            return e.index < t.index ? -1 : 1
        }), "value")
    };
    var N = function (e, t, n, i) {
        var r = {}, s = C(t || O.identity);
        return S(e, function (t, a) {
            var o = s.call(n, t, a, e);
            i(r, o, t)
        }), r
    };
    O.groupBy = function (e, t, n) {
        return N(e, t, n, function (e, t, n) {
            (O.has(e, t) ? e[t] : e[t] = []).push(n)
        })
    }, O.countBy = function (e, t, n) {
        return N(e, t, n, function (e, t) {
            O.has(e, t) || (e[t] = 0), e[t]++
        })
    }, O.sortedIndex = function (e, t, n, i) {
        n = null == n ? O.identity : C(n);
        for (var r = n.call(i, t), s = 0, a = e.length; a > s;) {
            var o = s + a >>> 1;
            n.call(i, e[o]) < r ? s = o + 1 : a = o
        }
        return s
    }, O.toArray = function (e) {
        return e ? O.isArray(e) ? o.call(e) : e.length === +e.length ? O.map(e, O.identity) : O.values(e) : []
    }, O.size = function (e) {
        return null == e ? 0 : e.length === +e.length ? e.length : O.keys(e).length
    }, O.first = O.head = O.take = function (e, t, n) {
        return null == e ? void 0 : null == t || n ? e[0] : o.call(e, 0, t)
    }, O.initial = function (e, t, n) {
        return o.call(e, 0, e.length - (null == t || n ? 1 : t))
    }, O.last = function (e, t, n) {
        return null == e ? void 0 : null == t || n ? e[e.length - 1] : o.call(e, Math.max(e.length - t, 0))
    }, O.rest = O.tail = O.drop = function (e, t, n) {
        return o.call(e, null == t || n ? 1 : t)
    }, O.compact = function (e) {
        return O.filter(e, O.identity)
    };
    var j = function (e, t, n) {
        return S(e, function (e) {
            O.isArray(e) ? t ? a.apply(n, e) : j(e, t, n) : n.push(e)
        }), n
    };
    O.flatten = function (e, t) {
        return j(e, t, [])
    }, O.without = function (e) {
        return O.difference(e, o.call(arguments, 1))
    }, O.uniq = O.unique = function (e, t, n, i) {
        O.isFunction(t) && (i = n, n = t, t = !1);
        var r = n ? O.map(e, n, i) : e, s = [], a = [];
        return S(r, function (n, i) {
            (t ? i && a[a.length - 1] === n : O.contains(a, n)) || (a.push(n), s.push(e[i]))
        }), s
    }, O.union = function () {
        return O.uniq(u.apply(i, arguments))
    }, O.intersection = function (e) {
        var t = o.call(arguments, 1);
        return O.filter(O.uniq(e), function (e) {
            return O.every(t, function (t) {
                return O.indexOf(t, e) >= 0
            })
        })
    }, O.difference = function (e) {
        var t = u.apply(i, o.call(arguments, 1));
        return O.filter(e, function (e) {
            return !O.contains(t, e)
        })
    }, O.zip = function () {
        for (var e = o.call(arguments), t = O.max(O.pluck(e, "length")), n = new Array(t), i = 0; t > i; i++)n[i] = O.pluck(e, "" + i);
        return n
    }, O.object = function (e, t) {
        if (null == e)return {};
        for (var n = {}, i = 0, r = e.length; r > i; i++)t ? n[e[i]] = t[i] : n[e[i][0]] = e[i][1];
        return n
    }, O.indexOf = function (e, t, n) {
        if (null == e)return -1;
        var i = 0, r = e.length;
        if (n) {
            if ("number" != typeof n)return i = O.sortedIndex(e, t), e[i] === t ? i : -1;
            i = 0 > n ? Math.max(0, r + n) : n
        }
        if (g && e.indexOf === g)return e.indexOf(t, n);
        for (; r > i; i++)if (e[i] === t)return i;
        return -1
    }, O.lastIndexOf = function (e, t, n) {
        if (null == e)return -1;
        var i = null != n;
        if (b && e.lastIndexOf === b)return i ? e.lastIndexOf(t, n) : e.lastIndexOf(t);
        for (var r = i ? n : e.length; r--;)if (e[r] === t)return r;
        return -1
    }, O.range = function (e, t, n) {
        arguments.length <= 1 && (t = e || 0, e = 0), n = arguments[2] || 1;
        for (var i = Math.max(Math.ceil((t - e) / n), 0), r = 0, s = new Array(i); i > r;)s[r++] = e, e += n;
        return s
    }, O.bind = function (e, t) {
        if (e.bind === A && A)return A.apply(e, o.call(arguments, 1));
        var n = o.call(arguments, 2);
        return function () {
            return e.apply(t, n.concat(o.call(arguments)))
        }
    }, O.partial = function (e) {
        var t = o.call(arguments, 1);
        return function () {
            return e.apply(this, t.concat(o.call(arguments)))
        }
    }, O.bindAll = function (e) {
        var t = o.call(arguments, 1);
        return 0 === t.length && (t = O.functions(e)), S(t, function (t) {
            e[t] = O.bind(e[t], e)
        }), e
    }, O.memoize = function (e, t) {
        var n = {};
        return t || (t = O.identity), function () {
            var i = t.apply(this, arguments);
            return O.has(n, i) ? n[i] : n[i] = e.apply(this, arguments)
        }
    }, O.delay = function (e, t) {
        var n = o.call(arguments, 2);
        return setTimeout(function () {
            return e.apply(null, n)
        }, t)
    }, O.defer = function (e) {
        return O.delay.apply(O, [e, 1].concat(o.call(arguments, 1)))
    }, O.throttle = function (e, t) {
        var n, i, r, s, a = 0, o = function () {
            a = new Date, r = null, s = e.apply(n, i)
        };
        return function () {
            var u = new Date, c = t - (u - a);
            return n = this, i = arguments, 0 >= c ? (clearTimeout(r), r = null, a = u, s = e.apply(n, i)) : r || (r = setTimeout(o, c)), s
        }
    }, O.debounce = function (e, t, n) {
        var i, r;
        return function () {
            var s = this, a = arguments, o = function () {
                i = null, n || (r = e.apply(s, a))
            }, u = n && !i;
            return clearTimeout(i), i = setTimeout(o, t), u && (r = e.apply(s, a)), r
        }
    }, O.once = function (e) {
        var t, n = !1;
        return function () {
            return n ? t : (n = !0, t = e.apply(this, arguments), e = null, t)
        }
    }, O.wrap = function (e, t) {
        return function () {
            var n = [e];
            return a.apply(n, arguments), t.apply(this, n)
        }
    }, O.compose = function () {
        var e = arguments;
        return function () {
            for (var t = arguments, n = e.length - 1; n >= 0; n--)t = [e[n].apply(this, t)];
            return t[0]
        }
    }, O.after = function (e, t) {
        return 0 >= e ? t() : function () {
            return --e < 1 ? t.apply(this, arguments) : void 0
        }
    }, O.keys = w || function (e) {
            if (e !== Object(e))throw new TypeError("Invalid object");
            var t = [];
            for (var n in e)O.has(e, n) && (t[t.length] = n);
            return t
        }, O.values = function (e) {
        var t = [];
        for (var n in e)O.has(e, n) && t.push(e[n]);
        return t
    }, O.pairs = function (e) {
        var t = [];
        for (var n in e)O.has(e, n) && t.push([n, e[n]]);
        return t
    }, O.invert = function (e) {
        var t = {};
        for (var n in e)O.has(e, n) && (t[e[n]] = n);
        return t
    }, O.functions = O.methods = function (e) {
        var t = [];
        for (var n in e)O.isFunction(e[n]) && t.push(n);
        return t.sort()
    }, O.extend = function (e) {
        return S(o.call(arguments, 1), function (t) {
            if (t)for (var n in t)e[n] = t[n]
        }), e
    }, O.pick = function (e) {
        var t = {}, n = u.apply(i, o.call(arguments, 1));
        return S(n, function (n) {
            n in e && (t[n] = e[n])
        }), t
    }, O.omit = function (e) {
        var t = {}, n = u.apply(i, o.call(arguments, 1));
        for (var r in e)O.contains(n, r) || (t[r] = e[r]);
        return t
    }, O.defaults = function (e) {
        return S(o.call(arguments, 1), function (t) {
            if (t)for (var n in t)null == e[n] && (e[n] = t[n])
        }), e
    }, O.clone = function (e) {
        return O.isObject(e) ? O.isArray(e) ? e.slice() : O.extend({}, e) : e
    }, O.tap = function (e, t) {
        return t(e), e
    };
    var R = function (e, t, n, i) {
        if (e === t)return 0 !== e || 1 / e == 1 / t;
        if (null == e || null == t)return e === t;
        e instanceof O && (e = e._wrapped), t instanceof O && (t = t._wrapped);
        var r = c.call(e);
        if (r != c.call(t))return !1;
        switch (r) {
            case"[object String]":
                return e == String(t);
            case"[object Number]":
                return e != +e ? t != +t : 0 == e ? 1 / e == 1 / t : e == +t;
            case"[object Date]":
            case"[object Boolean]":
                return +e == +t;
            case"[object RegExp]":
                return e.source == t.source && e.global == t.global && e.multiline == t.multiline && e.ignoreCase == t.ignoreCase
        }
        if ("object" != typeof e || "object" != typeof t)return !1;
        for (var s = n.length; s--;)if (n[s] == e)return i[s] == t;
        n.push(e), i.push(t);
        var a = 0, o = !0;
        if ("[object Array]" == r) {
            if (a = e.length, o = a == t.length)for (; a-- && (o = R(e[a], t[a], n, i)););
        } else {
            var u = e.constructor, l = t.constructor;
            if (u !== l && !(O.isFunction(u) && u instanceof u && O.isFunction(l) && l instanceof l))return !1;
            for (var h in e)if (O.has(e, h) && (a++, !(o = O.has(t, h) && R(e[h], t[h], n, i))))break;
            if (o) {
                for (h in t)if (O.has(t, h) && !a--)break;
                o = !a
            }
        }
        return n.pop(), i.pop(), o
    };
    O.isEqual = function (e, t) {
        return R(e, t, [], [])
    }, O.isEmpty = function (e) {
        if (null == e)return !0;
        if (O.isArray(e) || O.isString(e))return 0 === e.length;
        for (var t in e)if (O.has(e, t))return !1;
        return !0
    }, O.isElement = function (e) {
        return !(!e || 1 !== e.nodeType)
    }, O.isArray = y || function (e) {
            return "[object Array]" == c.call(e)
        }, O.isObject = function (e) {
        return e === Object(e)
    }, S(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function (e) {
        O["is" + e] = function (t) {
            return c.call(t) == "[object " + e + "]"
        }
    }), O.isArguments(arguments) || (O.isArguments = function (e) {
        return !(!e || !O.has(e, "callee"))
    }), "function" != typeof/./ && (O.isFunction = function (e) {
        return "function" == typeof e
    }), O.isFinite = function (e) {
        return isFinite(e) && !isNaN(parseFloat(e))
    }, O.isNaN = function (e) {
        return O.isNumber(e) && e != +e
    }, O.isBoolean = function (e) {
        return e === !0 || e === !1 || "[object Boolean]" == c.call(e)
    }, O.isNull = function (e) {
        return null === e
    }, O.isUndefined = function (e) {
        return void 0 === e
    }, O.has = function (e, t) {
        return l.call(e, t)
    }, O.noConflict = function () {
        return e._ = t, this
    }, O.identity = function (e) {
        return e
    }, O.times = function (e, t, n) {
        for (var i = Array(e), r = 0; e > r; r++)i[r] = t.call(n, r);
        return i
    }, O.random = function (e, t) {
        return null == t && (t = e, e = 0), e + Math.floor(Math.random() * (t - e + 1))
    };
    var P = {escape: {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;", "/": "&#x2F;"}};
    P.unescape = O.invert(P.escape);
    var I = {
        escape: new RegExp("[" + O.keys(P.escape).join("") + "]", "g"),
        unescape: new RegExp("(" + O.keys(P.unescape).join("|") + ")", "g")
    };
    O.each(["escape", "unescape"], function (e) {
        O[e] = function (t) {
            return null == t ? "" : ("" + t).replace(I[e], function (t) {
                return P[e][t]
            })
        }
    }), O.result = function (e, t) {
        if (null == e)return null;
        var n = e[t];
        return O.isFunction(n) ? n.call(e) : n
    }, O.mixin = function (e) {
        S(O.functions(e), function (t) {
            var n = O[t] = e[t];
            O.prototype[t] = function () {
                var e = [this._wrapped];
                return a.apply(e, arguments), q.call(this, n.apply(O, e))
            }
        })
    };
    var U = 0;
    O.uniqueId = function (e) {
        var t = ++U + "";
        return e ? e + t : t
    }, O.templateSettings = {evaluate: /<%([\s\S]+?)%>/g, interpolate: /<%=([\s\S]+?)%>/g, escape: /<%-([\s\S]+?)%>/g};
    var T = /(.)^/, k = {
        "'": "'",
        "\\": "\\",
        "\r": "r",
        "\n": "n",
        "	": "t",
        "\u2028": "u2028",
        "\u2029": "u2029"
    }, D = /\\|'|\r|\n|\t|\u2028|\u2029/g;
    O.template = function (e, t, n) {
        var i;
        n = O.defaults({}, n, O.templateSettings);
        var r = new RegExp([(n.escape || T).source, (n.interpolate || T).source, (n.evaluate || T).source].join("|") + "|$", "g"), s = 0, a = "__p+='";
        e.replace(r, function (t, n, i, r, o) {
            return a += e.slice(s, o).replace(D, function (e) {
                return "\\" + k[e]
            }), n && (a += "'+\n((__t=(" + n + "))==null?'':_.escape(__t))+\n'"), i && (a += "'+\n((__t=(" + i + "))==null?'':__t)+\n'"), r && (a += "';\n" + r + "\n__p+='"), s = o + t.length, t
        }), a += "';\n", n.variable || (a = "with(obj||{}){\n" + a + "}\n"), a = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + a + "return __p;\n";
        try {
            i = new Function(n.variable || "obj", "_", a)
        } catch (o) {
            throw o.source = a, o
        }
        if (t)return i(t, O);
        var u = function (e) {
            return i.call(this, e, O)
        };
        return u.source = "function(" + (n.variable || "obj") + "){\n" + a + "}", u
    }, O.chain = function (e) {
        return O(e).chain()
    };
    var q = function (e) {
        return this._chain ? O(e).chain() : e
    };
    O.mixin(O), S(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function (e) {
        var t = i[e];
        O.prototype[e] = function () {
            var n = this._wrapped;
            return t.apply(n, arguments), "shift" != e && "splice" != e || 0 !== n.length || delete n[0], q.call(this, n)
        }
    }), S(["concat", "join", "slice"], function (e) {
        var t = i[e];
        O.prototype[e] = function () {
            return q.call(this, t.apply(this._wrapped, arguments))
        }
    }), O.extend(O.prototype, {
        chain: function () {
            return this._chain = !0, this
        }, value: function () {
            return this._wrapped
        }
    })
}.call(this), function (e) {
    e.AV = e.AV || {};
    var t = e.AV;
    if ("undefined" != typeof XMLHttpRequest ? t.XMLHttpRequest = XMLHttpRequest : "function" == typeof require && "undefined" == typeof require.ensure && (t.XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest), "undefined" != typeof localStorage)t.localStorage = localStorage; else if ("function" == typeof require && "undefined" == typeof require.ensure)try {
        t.localStorage = require("localStorage")
    } catch (n) {
        t.localStorage = require("./localStorage.js").localStorage
    }
    "undefined" != typeof exports && exports._ ? (t._ = exports._.noConflict(), exports.AV = t) : t._ = _.noConflict(), "undefined" != typeof $ && (t.$ = $);
    var i = function () {
    }, r = function (e, n, r) {
        var s;
        return s = n && n.hasOwnProperty("constructor") ? n.constructor : function () {
            e.apply(this, arguments)
        }, t._.extend(s, e), i.prototype = e.prototype, s.prototype = new i, n && t._.extend(s.prototype, n), r && t._.extend(s, r), s.prototype.constructor = s, s.__super__ = e.prototype, s
    };
    t.serverURL = "https://cn.avoscloud.com", "undefined" != typeof process && process.versions && process.versions.node && (t._isNode = !0), t.initialize = function (e, n, i) {
        if (i)throw"AV.initialize() was passed a Master Key, which is only allowed from within Node.js.";
        t._initialize(e, n, i)
    }, t._initialize = function (e, n, i) {
        t.applicationId = e, t.applicationKey = n, t.masterKey = i, t._useMasterKey = !1
    }, t.setProduction = function (e) {
        t._isNullOrUndefined(e) || (e = e ? 1 : 0), t.applicationProduction = t._isNullOrUndefined(e) ? 1 : e
    }, t._isNode && (t.initialize = t._initialize, t.Cloud = t.Cloud || {}, t.Cloud.useMasterKey = function () {
        t._useMasterKey = !0
    }), t.useAVCloudCN = function () {
        t.serverURL = "https://leancloud.cn"
    }, t.useAVCloudUS = function () {
        t.serverURL = "https://avoscloud.us"
    }, t._getAVPath = function (e) {
        if (!t.applicationId)throw"You need to call AV.initialize before using AV.";
        if (e || (e = ""), !t._.isString(e))throw"Tried to get a localStorage path that wasn't a String.";
        return "/" === e[0] && (e = e.substring(1)), "AV/" + t.applicationId + "/" + e
    }, t._installationId = null, t._getInstallationId = function () {
        if (t._installationId)return t._installationId;
        var e = t._getAVPath("installationId");
        if (t._installationId = t.localStorage.getItem(e), !t._installationId || "" === t._installationId) {
            var n = function () {
                return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
            };
            t._installationId = n() + n() + "-" + n() + "-" + n() + "-" + n() + "-" + n() + n() + n(), t.localStorage.setItem(e, t._installationId)
        }
        return t._installationId
    }, t._parseDate = function (e) {
        var t = new RegExp("^([0-9]{1,4})-([0-9]{1,2})-([0-9]{1,2})T([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})(.([0-9]+))?Z$"), n = t.exec(e);
        if (!n)return null;
        var i = n[1] || 0, r = (n[2] || 1) - 1, s = n[3] || 0, a = n[4] || 0, o = n[5] || 0, u = n[6] || 0, c = n[8] || 0;
        return new Date(Date.UTC(i, r, s, a, o, u, c))
    }, t._ajaxIE8 = function (e, n, i) {
        var r = new t.Promise, s = new XDomainRequest;
        return s.onload = function () {
            var e;
            try {
                e = JSON.parse(s.responseText)
            } catch (t) {
                r.reject(t)
            }
            e && r.resolve(e)
        }, s.onerror = s.ontimeout = function () {
            ({
                responseText: JSON.stringify({
                    code: t.Error.X_DOMAIN_REQUEST,
                    error: "IE's XDomainRequest does not supply error info."
                })
            });
            r.reject(s)
        }, s.onprogress = function () {
        }, s.open(e, n), s.send(i), r
    }, t._useXDomainRequest = function () {
        return "undefined" != typeof XDomainRequest ? "withCredentials"in new XMLHttpRequest ? !1 : !0 : !1
    }, t._ajax = function (e, n, i, r, s) {
        var a = {success: r, error: s};
        if (t._useXDomainRequest())return t._ajaxIE8(e, n, i)._thenRunCallbacks(a);
        var o = new t.Promise, u = !1, c = new t.XMLHttpRequest;
        return c.onreadystatechange = function () {
            if (4 === c.readyState) {
                if (u)return;
                if (u = !0, c.status >= 200 && c.status < 300) {
                    var e;
                    try {
                        e = JSON.parse(c.responseText)
                    } catch (t) {
                        o.reject(t)
                    }
                    e && o.resolve(e, c.status, c)
                } else o.reject(c)
            }
        }, c.open(e, n, !0), c.setRequestHeader("Content-Type", "text/plain"), t._isNode && c.setRequestHeader("User-Agent", "AV/" + t.VERSION + " (NodeJS " + process.versions.node + ")"), c.send(i), o._thenRunCallbacks(a)
    }, t._extend = function (e, t) {
        var n = r(this, e, t);
        return n.extend = this.extend, n
    }, t._request = function (e, n, i, r, s) {
        if (!t.applicationId)throw"You must specify your applicationId using AV.initialize";
        if (!t.applicationKey && !t.masterKey)throw"You must specify a key using AV.initialize";
        if ("batch" !== e && "classes" !== e && "files" !== e && "functions" !== e && "login" !== e && "push" !== e && "search/select" !== e && "requestPasswordReset" !== e && "requestEmailVerify" !== e && "requestPasswordResetBySmsCode" !== e && "resetPasswordBySmsCode" !== e && "requestMobilePhoneVerify" !== e && "requestLoginSmsCode" !== e && "verifyMobilePhone" !== e && "requestSmsCode" !== e && "verifySmsCode" !== e && "users" !== e && "usersByMobilePhone" !== e && "cloudQuery" !== e && "qiniu" !== e && "statuses" !== e && "search/select" !== e && "subscribe/statuses/count" !== e && "subscribe/statuses" !== e && !/users\/[^\/]+\/updatePassword/.test(e) && !/users\/[^\/]+\/friendship\/[^\/]+/.test(e))throw"Bad route: '" + e + "'.";
        var a = t.serverURL;
        "/" !== a.charAt(a.length - 1) && (a += "/"), a += "1.1/" + e, n && (a += "/" + n), i && (a += "/" + i), "users" !== e && "classes" !== e || "PUT" !== r || !s._fetchWhenSave || (delete s._fetchWhenSave, a += "?new=true"), s = t._.clone(s || {}), "POST" !== r && (s._method = r, r = "POST"), s._ApplicationId = t.applicationId, s._ApplicationKey = t.applicationKey, t._isNullOrUndefined(t.applicationProduction) || (s._ApplicationProduction = t.applicationProduction), t._useMasterKey && (s._MasterKey = t.masterKey), s._ClientVersion = t.VERSION, s._InstallationId = t._getInstallationId();
        var o = t.User.current();
        o && o._sessionToken && (s._SessionToken = o._sessionToken);
        var u = JSON.stringify(s);
        return t._ajax(r, a, u).then(null, function (e) {
            var n;
            if (e && e.responseText)try {
                var i = JSON.parse(e.responseText);
                i && (n = new t.Error(i.code, i.error))
            } catch (r) {
            }
            return n = n || new t.Error(-1, e.responseText), t.Promise.error(n)
        })
    }, t._getValue = function (e, n) {
        return e && e[n] ? t._.isFunction(e[n]) ? e[n]() : e[n] : null
    }, t._encode = function (e, n, i) {
        var r = t._;
        if (e instanceof t.Object) {
            if (i)throw"AV.Objects not allowed here";
            if (!n || r.include(n, e) || !e._hasData)return e._toPointer();
            if (!e.dirty())return n = n.concat(e), t._encode(e._toFullJSON(n), n, i);
            throw"Tried to save an object with a pointer to a new, unsaved object."
        }
        if (e instanceof t.ACL)return e.toJSON();
        if (r.isDate(e))return {__type: "Date", iso: e.toJSON()};
        if (e instanceof t.GeoPoint)return e.toJSON();
        if (r.isArray(e))return r.map(e, function (e) {
            return t._encode(e, n, i)
        });
        if (r.isRegExp(e))return e.source;
        if (e instanceof t.Relation)return e.toJSON();
        if (e instanceof t.Op)return e.toJSON();
        if (e instanceof t.File) {
            if (!e.url() && !e.id)throw"Tried to save an object containing an unsaved file.";
            return {__type: "File", id: e.id, name: e.name(), url: e.url()}
        }
        if (r.isObject(e)) {
            var s = {};
            return t._objectEach(e, function (e, r) {
                s[r] = t._encode(e, n, i)
            }), s
        }
        return e
    }, t._decode = function (e, n) {
        var i = t._;
        if (!i.isObject(n))return n;
        if (i.isArray(n))return t._arrayEach(n, function (e, i) {
            n[i] = t._decode(i, e)
        }), n;
        if (n instanceof t.Object)return n;
        if (n instanceof t.File)return n;
        if (n instanceof t.Op)return n;
        if (n.__op)return t.Op._decode(n);
        if ("Pointer" === n.__type) {
            var r = n.className, s = t.Object._create(r);
            return n.createdAt ? (delete n.__type, delete n.className, s._finishFetch(n, !0)) : s._finishFetch({objectId: n.objectId}, !1), s
        }
        if ("Object" === n.__type) {
            var r = n.className;
            delete n.__type, delete n.className;
            var a = t.Object._create(r);
            return a._finishFetch(n, !0), a
        }
        if ("Date" === n.__type)return t._parseDate(n.iso);
        if ("GeoPoint" === n.__type)return new t.GeoPoint({latitude: n.latitude, longitude: n.longitude});
        if ("ACL" === e)return n instanceof t.ACL ? n : new t.ACL(n);
        if ("Relation" === n.__type) {
            var o = new t.Relation(null, e);
            return o.targetClassName = n.className, o
        }
        if ("File" === n.__type) {
            var u = new t.File(n.name);
            return u._metaData = n.metaData || {}, u._url = n.url, u.id = n.objectId, u
        }
        return t._objectEach(n, function (e, i) {
            n[i] = t._decode(i, e)
        }), n
    }, t._arrayEach = t._.each, t._traverse = function (e, n, i) {
        if (e instanceof t.Object) {
            if (i = i || [], t._.indexOf(i, e) >= 0)return;
            return i.push(e), t._traverse(e.attributes, n, i), n(e)
        }
        return e instanceof t.Relation || e instanceof t.File ? n(e) : t._.isArray(e) ? (t._.each(e, function (r, s) {
            var a = t._traverse(r, n, i);
            a && (e[s] = a)
        }), n(e)) : t._.isObject(e) ? (t._each(e, function (r, s) {
            var a = t._traverse(r, n, i);
            a && (e[s] = a)
        }), n(e)) : n(e)
    }, t._objectEach = t._each = function (e, n) {
        var i = t._;
        i.isObject(e) ? i.each(i.keys(e), function (t) {
            n(e[t], t)
        }) : i.each(e, n)
    }, t._isNullOrUndefined = function (e) {
        return t._.isNull(e) || t._.isUndefined(e)
    }
}(this), function (e) {
    e.AV = e.AV || {};
    var t = e.AV, n = t._;
    t.Error = function (e, t) {
        this.code = e, this.message = t
    }, n.extend(t.Error, {
        OTHER_CAUSE: -1,
        INTERNAL_SERVER_ERROR: 1,
        CONNECTION_FAILED: 100,
        OBJECT_NOT_FOUND: 101,
        INVALID_QUERY: 102,
        INVALID_CLASS_NAME: 103,
        MISSING_OBJECT_ID: 104,
        INVALID_KEY_NAME: 105,
        INVALID_POINTER: 106,
        INVALID_JSON: 107,
        COMMAND_UNAVAILABLE: 108,
        NOT_INITIALIZED: 109,
        INCORRECT_TYPE: 111,
        INVALID_CHANNEL_NAME: 112,
        PUSH_MISCONFIGURED: 115,
        OBJECT_TOO_LARGE: 116,
        OPERATION_FORBIDDEN: 119,
        CACHE_MISS: 120,
        INVALID_NESTED_KEY: 121,
        INVALID_FILE_NAME: 122,
        INVALID_ACL: 123,
        TIMEOUT: 124,
        INVALID_EMAIL_ADDRESS: 125,
        MISSING_CONTENT_TYPE: 126,
        MISSING_CONTENT_LENGTH: 127,
        INVALID_CONTENT_LENGTH: 128,
        FILE_TOO_LARGE: 129,
        FILE_SAVE_ERROR: 130,
        FILE_DELETE_ERROR: 153,
        DUPLICATE_VALUE: 137,
        INVALID_ROLE_NAME: 139,
        EXCEEDED_QUOTA: 140,
        SCRIPT_FAILED: 141,
        VALIDATION_ERROR: 142,
        INVALID_IMAGE_DATA: 150,
        UNSAVED_FILE_ERROR: 151,
        INVALID_PUSH_TIME_ERROR: 152,
        USERNAME_MISSING: 200,
        PASSWORD_MISSING: 201,
        USERNAME_TAKEN: 202,
        EMAIL_TAKEN: 203,
        EMAIL_MISSING: 204,
        EMAIL_NOT_FOUND: 205,
        SESSION_MISSING: 206,
        MUST_CREATE_USER_THROUGH_SIGNUP: 207,
        ACCOUNT_ALREADY_LINKED: 208,
        LINKED_ID_MISSING: 250,
        INVALID_LINKED_SESSION: 251,
        UNSUPPORTED_SERVICE: 252,
        X_DOMAIN_REQUEST: 602
    })
}(this), function () {
    var e = this, t = e.AV || (e.AV = {}), n = /\s+/, i = Array.prototype.slice;
    t.Events = {
        on: function (e, t, i) {
            var r, s, a, o, u;
            if (!t)return this;
            for (e = e.split(n), r = this._callbacks || (this._callbacks = {}), s = e.shift(); s;)u = r[s], a = u ? u.tail : {}, a.next = o = {}, a.context = i, a.callback = t, r[s] = {
                tail: o,
                next: u ? u.next : a
            }, s = e.shift();
            return this
        }, off: function (e, t, i) {
            var r, s, a, o, u, c;
            if (s = this._callbacks) {
                if (!(e || t || i))return delete this._callbacks, this;
                for (e = e ? e.split(n) : _.keys(s), r = e.shift(); r;)if (a = s[r], delete s[r], a && (t || i)) {
                    for (o = a.tail, a = a.next; a !== o;)u = a.callback, c = a.context, (t && u !== t || i && c !== i) && this.on(r, u, c), a = a.next;
                    r = e.shift()
                }
                return this
            }
        }, trigger: function (e) {
            var t, r, s, a, o, u, c;
            if (!(s = this._callbacks))return this;
            for (u = s.all, e = e.split(n), c = i.call(arguments, 1), t = e.shift(); t;) {
                if (r = s[t])for (a = r.tail; (r = r.next) !== a;)r.callback.apply(r.context || this, c);
                if (r = u)for (a = r.tail, o = [t].concat(c); (r = r.next) !== a;)r.callback.apply(r.context || this, o);
                t = e.shift()
            }
            return this
        }
    }, t.Events.bind = t.Events.on, t.Events.unbind = t.Events.off
}.call(this), function (e) {
    e.AV = e.AV || {};
    var t = e.AV, n = t._;
    t.GeoPoint = function (e, i) {
        n.isArray(e) ? (t.GeoPoint._validate(e[0], e[1]), this.latitude = e[0], this.longitude = e[1]) : n.isObject(e) ? (t.GeoPoint._validate(e.latitude, e.longitude), this.latitude = e.latitude, this.longitude = e.longitude) : n.isNumber(e) && n.isNumber(i) ? (t.GeoPoint._validate(e, i), this.latitude = e, this.longitude = i) : (this.latitude = 0, this.longitude = 0);
        var r = this;
        this.__defineGetter__ && this.__defineSetter__ && (this._latitude = this.latitude, this._longitude = this.longitude, this.__defineGetter__("latitude", function () {
            return r._latitude
        }), this.__defineGetter__("longitude", function () {
            return r._longitude
        }), this.__defineSetter__("latitude", function (e) {
            t.GeoPoint._validate(e, r.longitude), r._latitude = e
        }), this.__defineSetter__("longitude", function (e) {
            t.GeoPoint._validate(r.latitude, e), r._longitude = e
        }))
    }, t.GeoPoint._validate = function (e, t) {
        if (-90 > e)throw"AV.GeoPoint latitude " + e + " < -90.0.";
        if (e > 90)throw"AV.GeoPoint latitude " + e + " > 90.0.";
        if (-180 > t)throw"AV.GeoPoint longitude " + t + " < -180.0.";
        if (t > 180)throw"AV.GeoPoint longitude " + t + " > 180.0."
    }, t.GeoPoint.current = function (e) {
        var n = new t.Promise;
        return navigator.geolocation.getCurrentPosition(function (e) {
            n.resolve(new t.GeoPoint({latitude: e.coords.latitude, longitude: e.coords.longitude}))
        }, function (e) {
            n.reject(e)
        }), n._thenRunCallbacks(e)
    }, t.GeoPoint.prototype = {
        toJSON: function () {
            return t.GeoPoint._validate(this.latitude, this.longitude), {
                __type: "GeoPoint",
                latitude: this.latitude,
                longitude: this.longitude
            }
        }, radiansTo: function (e) {
            var t = Math.PI / 180, n = this.latitude * t, i = this.longitude * t, r = e.latitude * t, s = e.longitude * t, a = n - r, o = i - s, u = Math.sin(a / 2), c = Math.sin(o / 2), l = u * u + Math.cos(n) * Math.cos(r) * c * c;
            return l = Math.min(1, l), 2 * Math.asin(Math.sqrt(l))
        }, kilometersTo: function (e) {
            return 6371 * this.radiansTo(e)
        }, milesTo: function (e) {
            return 3958.8 * this.radiansTo(e)
        }
    }
}(this), function (e) {
    e.AV = e.AV || {};
    var t = e.AV, n = t._, i = "*";
    t.ACL = function (e) {
        var i = this;
        if (i.permissionsById = {}, n.isObject(e))if (e instanceof t.User)i.setReadAccess(e, !0), i.setWriteAccess(e, !0); else {
            if (n.isFunction(e))throw"AV.ACL() called with a function.  Did you forget ()?";
            t._objectEach(e, function (e, r) {
                if (!n.isString(r))throw"Tried to create an ACL with an invalid userId.";
                i.permissionsById[r] = {}, t._objectEach(e, function (e, t) {
                    if ("read" !== t && "write" !== t)throw"Tried to create an ACL with an invalid permission type.";
                    if (!n.isBoolean(e))throw"Tried to create an ACL with an invalid permission value.";
                    i.permissionsById[r][t] = e
                })
            })
        }
    }, t.ACL.prototype.toJSON = function () {
        return n.clone(this.permissionsById)
    }, t.ACL.prototype._setAccess = function (e, i, r) {
        if (i instanceof t.User ? i = i.id : i instanceof t.Role && (i = "role:" + i.getName()), !n.isString(i))throw"userId must be a string.";
        if (!n.isBoolean(r))throw"allowed must be either true or false.";
        var s = this.permissionsById[i];
        if (!s) {
            if (!r)return;
            s = {}, this.permissionsById[i] = s
        }
        r ? this.permissionsById[i][e] = !0 : (delete s[e], n.isEmpty(s) && delete s[i])
    }, t.ACL.prototype._getAccess = function (e, n) {
        n instanceof t.User ? n = n.id : n instanceof t.Role && (n = "role:" + n.getName());
        var i = this.permissionsById[n];
        return i && i[e] ? !0 : !1
    }, t.ACL.prototype.setReadAccess = function (e, t) {
        this._setAccess("read", e, t)
    }, t.ACL.prototype.getReadAccess = function (e) {
        return this._getAccess("read", e)
    }, t.ACL.prototype.setWriteAccess = function (e, t) {
        this._setAccess("write", e, t)
    }, t.ACL.prototype.getWriteAccess = function (e) {
        return this._getAccess("write", e)
    }, t.ACL.prototype.setPublicReadAccess = function (e) {
        this.setReadAccess(i, e)
    }, t.ACL.prototype.getPublicReadAccess = function () {
        return this.getReadAccess(i)
    }, t.ACL.prototype.setPublicWriteAccess = function (e) {
        this.setWriteAccess(i, e)
    }, t.ACL.prototype.getPublicWriteAccess = function () {
        return this.getWriteAccess(i)
    }, t.ACL.prototype.getRoleReadAccess = function (e) {
        if (e instanceof t.Role && (e = e.getName()), n.isString(e))return this.getReadAccess("role:" + e);
        throw"role must be a AV.Role or a String"
    }, t.ACL.prototype.getRoleWriteAccess = function (e) {
        if (e instanceof t.Role && (e = e.getName()), n.isString(e))return this.getWriteAccess("role:" + e);
        throw"role must be a AV.Role or a String"
    }, t.ACL.prototype.setRoleReadAccess = function (e, i) {
        if (e instanceof t.Role && (e = e.getName()), n.isString(e))return void this.setReadAccess("role:" + e, i);
        throw"role must be a AV.Role or a String"
    }, t.ACL.prototype.setRoleWriteAccess = function (e, i) {
        if (e instanceof t.Role && (e = e.getName()), n.isString(e))return void this.setWriteAccess("role:" + e, i);
        throw"role must be a AV.Role or a String"
    }
}(this), function (e) {
    e.AV = e.AV || {};
    var t = e.AV, n = t._;
    t.Op = function () {
        this._initialize.apply(this, arguments)
    }, t.Op.prototype = {
        _initialize: function () {
        }
    }, n.extend(t.Op, {
        _extend: t._extend, _opDecoderMap: {}, _registerDecoder: function (e, n) {
            t.Op._opDecoderMap[e] = n
        }, _decode: function (e) {
            var n = t.Op._opDecoderMap[e.__op];
            return n ? n(e) : void 0
        }
    }), t.Op._registerDecoder("Batch", function (e) {
        var n = null;
        return t._arrayEach(e.ops, function (e) {
            e = t.Op._decode(e), n = e._mergeWithPrevious(n)
        }), n
    }), t.Op.Set = t.Op._extend({
        _initialize: function (e) {
            this._value = e
        }, value: function () {
            return this._value
        }, toJSON: function () {
            return t._encode(this.value())
        }, _mergeWithPrevious: function () {
            return this
        }, _estimate: function () {
            return this.value()
        }
    }), t.Op._UNSET = {}, t.Op.Unset = t.Op._extend({
        toJSON: function () {
            return {__op: "Delete"}
        }, _mergeWithPrevious: function () {
            return this
        }, _estimate: function () {
            return t.Op._UNSET
        }
    }), t.Op._registerDecoder("Delete", function () {
        return new t.Op.Unset
    }), t.Op.Increment = t.Op._extend({
        _initialize: function (e) {
            this._amount = e
        }, amount: function () {
            return this._amount
        }, toJSON: function () {
            return {__op: "Increment", amount: this._amount}
        }, _mergeWithPrevious: function (e) {
            if (e) {
                if (e instanceof t.Op.Unset)return new t.Op.Set(this.amount());
                if (e instanceof t.Op.Set)return new t.Op.Set(e.value() + this.amount());
                if (e instanceof t.Op.Increment)return new t.Op.Increment(this.amount() + e.amount());
                throw"Op is invalid after previous op."
            }
            return this
        }, _estimate: function (e) {
            return e ? e + this.amount() : this.amount()
        }
    }), t.Op._registerDecoder("Increment", function (e) {
        return new t.Op.Increment(e.amount)
    }), t.Op.Add = t.Op._extend({
        _initialize: function (e) {
            this._objects = e
        }, objects: function () {
            return this._objects
        }, toJSON: function () {
            return {__op: "Add", objects: t._encode(this.objects())}
        }, _mergeWithPrevious: function (e) {
            if (e) {
                if (e instanceof t.Op.Unset)return new t.Op.Set(this.objects());
                if (e instanceof t.Op.Set)return new t.Op.Set(this._estimate(e.value()));
                if (e instanceof t.Op.Add)return new t.Op.Add(e.objects().concat(this.objects()));
                throw"Op is invalid after previous op."
            }
            return this
        }, _estimate: function (e) {
            return e ? e.concat(this.objects()) : n.clone(this.objects())
        }
    }), t.Op._registerDecoder("Add", function (e) {
        return new t.Op.Add(t._decode(void 0, e.objects))
    }), t.Op.AddUnique = t.Op._extend({
        _initialize: function (e) {
            this._objects = n.uniq(e)
        }, objects: function () {
            return this._objects
        }, toJSON: function () {
            return {__op: "AddUnique", objects: t._encode(this.objects())}
        }, _mergeWithPrevious: function (e) {
            if (e) {
                if (e instanceof t.Op.Unset)return new t.Op.Set(this.objects());
                if (e instanceof t.Op.Set)return new t.Op.Set(this._estimate(e.value()));
                if (e instanceof t.Op.AddUnique)return new t.Op.AddUnique(this._estimate(e.objects()));
                throw"Op is invalid after previous op."
            }
            return this
        }, _estimate: function (e) {
            if (e) {
                var i = n.clone(e);
                return t._arrayEach(this.objects(), function (e) {
                    if (e instanceof t.Object && e.id) {
                        var r = n.find(i, function (n) {
                            return n instanceof t.Object && n.id === e.id
                        });
                        if (r) {
                            var s = n.indexOf(i, r);
                            i[s] = e
                        } else i.push(e)
                    } else n.contains(i, e) || i.push(e)
                }), i
            }
            return n.clone(this.objects())
        }
    }), t.Op._registerDecoder("AddUnique", function (e) {
        return new t.Op.AddUnique(t._decode(void 0, e.objects))
    }), t.Op.Remove = t.Op._extend({
        _initialize: function (e) {
            this._objects = n.uniq(e)
        }, objects: function () {
            return this._objects
        }, toJSON: function () {
            return {__op: "Remove", objects: t._encode(this.objects())}
        }, _mergeWithPrevious: function (e) {
            if (e) {
                if (e instanceof t.Op.Unset)return e;
                if (e instanceof t.Op.Set)return new t.Op.Set(this._estimate(e.value()));
                if (e instanceof t.Op.Remove)return new t.Op.Remove(n.union(e.objects(), this.objects()));
                throw"Op is invalid after previous op."
            }
            return this
        }, _estimate: function (e) {
            if (e) {
                var i = n.difference(e, this.objects());
                return t._arrayEach(this.objects(), function (e) {
                    e instanceof t.Object && e.id && (i = n.reject(i, function (n) {
                        return n instanceof t.Object && n.id === e.id
                    }))
                }), i
            }
            return []
        }
    }), t.Op._registerDecoder("Remove", function (e) {
        return new t.Op.Remove(t._decode(void 0, e.objects))
    }), t.Op.Relation = t.Op._extend({
        _initialize: function (e, i) {
            this._targetClassName = null;
            var r = this, s = function (e) {
                if (e instanceof t.Object) {
                    if (!e.id)throw"You can't add an unsaved AV.Object to a relation.";
                    if (r._targetClassName || (r._targetClassName = e.className), r._targetClassName !== e.className)throw"Tried to create a AV.Relation with 2 different types: " + r._targetClassName + " and " + e.className + ".";
                    return e.id
                }
                return e
            };
            this.relationsToAdd = n.uniq(n.map(e, s)), this.relationsToRemove = n.uniq(n.map(i, s))
        }, added: function () {
            var e = this;
            return n.map(this.relationsToAdd, function (n) {
                var i = t.Object._create(e._targetClassName);
                return i.id = n, i
            })
        }, removed: function () {
            var e = this;
            return n.map(this.relationsToRemove, function (n) {
                var i = t.Object._create(e._targetClassName);
                return i.id = n, i
            })
        }, toJSON: function () {
            var e = null, t = null, i = this, r = function (e) {
                return {__type: "Pointer", className: i._targetClassName, objectId: e}
            }, s = null;
            return this.relationsToAdd.length > 0 && (s = n.map(this.relationsToAdd, r), e = {
                __op: "AddRelation",
                objects: s
            }), this.relationsToRemove.length > 0 && (s = n.map(this.relationsToRemove, r), t = {
                __op: "RemoveRelation",
                objects: s
            }), e && t ? {__op: "Batch", ops: [e, t]} : e || t || {}
        }, _mergeWithPrevious: function (e) {
            if (e) {
                if (e instanceof t.Op.Unset)throw"You can't modify a relation after deleting it.";
                if (e instanceof t.Op.Relation) {
                    if (e._targetClassName && e._targetClassName !== this._targetClassName)throw"Related object must be of class " + e._targetClassName + ", but " + this._targetClassName + " was passed in.";
                    var i = n.union(n.difference(e.relationsToAdd, this.relationsToRemove), this.relationsToAdd), r = n.union(n.difference(e.relationsToRemove, this.relationsToAdd), this.relationsToRemove), s = new t.Op.Relation(i, r);
                    return s._targetClassName = this._targetClassName, s
                }
                throw"Op is invalid after previous op."
            }
            return this
        }, _estimate: function (e, n, i) {
            if (e) {
                if (e instanceof t.Relation) {
                    if (this._targetClassName)if (e.targetClassName) {
                        if (e.targetClassName !== this._targetClassName)throw"Related object must be a " + e.targetClassName + ", but a " + this._targetClassName + " was passed in."
                    } else e.targetClassName = this._targetClassName;
                    return e
                }
                throw"Op is invalid after previous op."
            }
            var r = new t.Relation(n, i);
            r.targetClassName = this._targetClassName
        }
    }), t.Op._registerDecoder("AddRelation", function (e) {
        return new t.Op.Relation(t._decode(void 0, e.objects), [])
    }), t.Op._registerDecoder("RemoveRelation", function (e) {
        return new t.Op.Relation([], t._decode(void 0, e.objects))
    })
}(this), function (e) {
    e.AV = e.AV || {};
    var t = e.AV, n = t._;
    t.Relation = function (e, t) {
        this.parent = e, this.key = t, this.targetClassName = null
    }, t.Relation.reverseQuery = function (e, n, i) {
        var r = new t.Query(e);
        return r.equalTo(n, i._toPointer()), r
    }, t.Relation.prototype = {
        _ensureParentAndKey: function (e, t) {
            if (this.parent = this.parent || e, this.key = this.key || t, this.parent !== e)throw"Internal Error. Relation retrieved from two different Objects.";
            if (this.key !== t)throw"Internal Error. Relation retrieved from two different keys."
        }, add: function (e) {
            n.isArray(e) || (e = [e]);
            var i = new t.Op.Relation(e, []);
            this.parent.set(this.key, i), this.targetClassName = i._targetClassName
        }, remove: function (e) {
            n.isArray(e) || (e = [e]);
            var i = new t.Op.Relation([], e);
            this.parent.set(this.key, i), this.targetClassName = i._targetClassName
        }, toJSON: function () {
            return {__type: "Relation", className: this.targetClassName}
        }, query: function () {
            var e, n;
            return this.targetClassName ? (e = t.Object._getSubclass(this.targetClassName), n = new t.Query(e)) : (e = t.Object._getSubclass(this.parent.className), n = new t.Query(e), n._extraOptions.redirectClassNameForKey = this.key), n._addCondition("$relatedTo", "object", this.parent._toPointer()), n._addCondition("$relatedTo", "key", this.key), n
        }
    }
}(this), function (e) {
    e.AV = e.AV || {};
    var t = e.AV, n = t._;
    t.Promise = function (e) {
        this._resolved = !1, this._rejected = !1, this._resolvedCallbacks = [], this._rejectedCallbacks = [], this.doResolve(e)
    }, n.extend(t.Promise, {
        _isPromisesAPlusCompliant: !1, is: function (e) {
            return e && e.then && n.isFunction(e.then)
        }, as: function () {
            var e = new t.Promise;
            return e.resolve.apply(e, arguments), e
        }, error: function () {
            var e = new t.Promise;
            return e.reject.apply(e, arguments), e
        }, when: function (e) {
            var i;
            i = e && t._isNullOrUndefined(e.length) ? arguments : e;
            var r = n.last(arguments);
            r = t._.isBoolean(r) ? r : !1;
            var s = i.length, a = !1, o = [], u = [];
            if (o.length = i.length, u.length = i.length, 0 === s)return r ? t.Promise.as.call(this, o) : t.Promise.as.apply(this, o);
            var c = new t.Promise, l = function (e) {
                return s -= 1, a && !c._rejected && r ? void c.reject.call(c, u[e]) : void(0 === s && (a && !c._rejected ? c.reject.call(c, u) : r ? c._rejected || c.resolve.call(c, o) : c.resolve.apply(c, o)))
            };
            return t._arrayEach(i, function (e, n) {
                t.Promise.is(e) ? e.then(function (e) {
                    o[n] = e, l(n)
                }, function (e) {
                    u[n] = e, a = !0, l(n)
                }) : (o[n] = e, l(n))
            }), c
        }, race: function (e) {
            var n;
            n = e && t._isNullOrUndefined(e.length) ? arguments : e;
            var i = n.length, r = !1, s = [], a = [];
            if (s.length = a.length = n.length, 0 === i)return t.Promise.as.call(this);
            var o = new t.Promise, u = function (e) {
                o._resolved || o._rejected || (r ? o.reject.call(o, a[e]) : o.resolve.call(o, s[e]))
            };
            return t._arrayEach(n, function (e, n) {
                t.Promise.is(e) ? e.then(function (e) {
                    s[n] = e, u(n)
                }, function (e) {
                    a[n] = e, r = !0, u(n)
                }) : (s[n] = e, u(n))
            }), o
        }, _continueWhile: function (e, n) {
            return e() ? n().then(function () {
                return t.Promise._continueWhile(e, n)
            }) : t.Promise.as()
        }
    }), t.Promise.all = function (e) {
        return t.Promise.when(e, !0)
    }, n.extend(t.Promise.prototype, {
        resolve: function () {
            if (this._resolved || this._rejected)throw"A promise was resolved even though it had already been " + (this._resolved ? "resolved" : "rejected") + ".";
            this._resolved = !0, this._result = arguments;
            var e = arguments;
            t._arrayEach(this._resolvedCallbacks, function (t) {
                t.apply(this, e)
            }), this._resolvedCallbacks = [], this._rejectedCallbacks = []
        }, doResolve: function (e) {
            if (e) {
                var t = !1, n = this;
                try {
                    e(function (e) {
                        t || (t = !0, n.resolve.call(n, e))
                    }, function (e) {
                        t || (t = !0, n.reject.call(n, e))
                    })
                } catch (i) {
                    if (t)return;
                    t = !0, n.reject.call(n, i)
                }
            }
        }, reject: function (e) {
            if (this._resolved || this._rejected)throw"A promise was rejected even though it had already been " + (this._resolved ? "resolved" : "rejected") + ".";
            this._rejected = !0, this._error = e, t._arrayEach(this._rejectedCallbacks, function (t) {
                t(e)
            }), this._resolvedCallbacks = [], this._rejectedCallbacks = []
        }, then: function (e, i) {
            var r = new t.Promise, s = function () {
                var n = arguments;
                if (e)if (t.Promise._isPromisesAPlusCompliant)try {
                    n = [e.apply(this, n)]
                } catch (i) {
                    n = [t.Promise.error(i)]
                } else n = [e.apply(this, n)];
                1 === n.length && t.Promise.is(n[0]) ? n[0].then(function () {
                    r.resolve.apply(r, arguments)
                }, function (e) {
                    r.reject(e)
                }) : r.resolve.apply(r, n)
            }, a = function (e) {
                var n = [];
                if (i) {
                    if (t.Promise._isPromisesAPlusCompliant)try {
                        n = [i(e)]
                    } catch (s) {
                        n = [t.Promise.error(s)]
                    } else n = [i(e)];
                    1 === n.length && t.Promise.is(n[0]) ? n[0].then(function () {
                        r.resolve.apply(r, arguments)
                    }, function (e) {
                        r.reject(e)
                    }) : t.Promise._isPromisesAPlusCompliant ? r.resolve.apply(r, n) : r.reject(n[0])
                } else r.reject(e)
            }, o = function (e) {
                e.call()
            };
            t.Promise._isPromisesAPlusCompliant && ("undefined" != typeof setImmediate && n.isFunction(setImmediate) ? o = setImmediate : "undefined" != typeof setTimeout && n.isFunction(setTimeout) && (o = function (e) {
                setTimeout(e, 0)
            }));
            var u = this;
            return this._resolved ? o(function () {
                s.apply(u, u._result)
            }) : this._rejected ? o(function () {
                a(u._error)
            }) : (this._resolvedCallbacks.push(s), this._rejectedCallbacks.push(a)), r
        }, "catch": function (e) {
            return this.then(void 0, e)
        }, always: function (e) {
            return this.then(e, e)
        }, done: function (e) {
            return this.then(e)
        }, fail: function (e) {
            return this.then(null, e)
        }, _thenRunCallbacks: function (e, i) {
            var r;
            if (n.isFunction(e)) {
                var s = e;
                r = {
                    success: function (e) {
                        s(e, null)
                    }, error: function (e) {
                        s(null, e)
                    }
                }
            } else r = n.clone(e);
            return r = r || {}, this.then(function (e) {
                return r.success ? r.success.apply(this, arguments) : i && i.trigger("sync", i, e, r), t.Promise.as.apply(t.Promise, arguments)
            }, function (e) {
                return r.error ? n.isUndefined(i) ? r.error(e) : r.error(i, e) : i && i.trigger("error", i, e, r), t.Promise.error(e)
            })
        }, _continueWith: function (e) {
            return this.then(function () {
                return e(arguments, null)
            }, function (t) {
                return e(null, t)
            })
        }
    }), t.Promise.prototype["finally"] = t.Promise.prototype.always, t.Promise.prototype["try"] = t.Promise.prototype.done
}(this), function (e) {
    e.AV = e.AV || {};
    var t = e.AV, n = t._, i = function (e) {
        if (26 > e)return String.fromCharCode(65 + e);
        if (52 > e)return String.fromCharCode(97 + (e - 26));
        if (62 > e)return String.fromCharCode(48 + (e - 52));
        if (62 === e)return "+";
        if (63 === e)return "/";
        throw"Tried to encode large digit " + e + " in base64."
    }, r = function (e) {
        var t = [];
        return t.length = Math.ceil(e.length / 3), n.times(t.length, function (n) {
            var r = e[3 * n], s = e[3 * n + 1] || 0, a = e[3 * n + 2] || 0, o = 3 * n + 1 < e.length, u = 3 * n + 2 < e.length;
            t[n] = [i(r >> 2 & 63), i(r << 4 & 48 | s >> 4 & 15), o ? i(s << 2 & 60 | a >> 6 & 3) : "=", u ? i(63 & a) : "="].join("")
        }), t.join("")
    }, s = {
        ai: "application/postscript",
        aif: "audio/x-aiff",
        aifc: "audio/x-aiff",
        aiff: "audio/x-aiff",
        asc: "text/plain",
        atom: "application/atom+xml",
        au: "audio/basic",
        avi: "video/x-msvideo",
        bcpio: "application/x-bcpio",
        bin: "application/octet-stream",
        bmp: "image/bmp",
        cdf: "application/x-netcdf",
        cgm: "image/cgm",
        "class": "application/octet-stream",
        cpio: "application/x-cpio",
        cpt: "application/mac-compactpro",
        csh: "application/x-csh",
        css: "text/css",
        dcr: "application/x-director",
        dif: "video/x-dv",
        dir: "application/x-director",
        djv: "image/vnd.djvu",
        djvu: "image/vnd.djvu",
        dll: "application/octet-stream",
        dmg: "application/octet-stream",
        dms: "application/octet-stream",
        doc: "application/msword",
        docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        dotx: "application/vnd.openxmlformats-officedocument.wordprocessingml.template",
        docm: "application/vnd.ms-word.document.macroEnabled.12",
        dotm: "application/vnd.ms-word.template.macroEnabled.12",
        dtd: "application/xml-dtd",
        dv: "video/x-dv",
        dvi: "application/x-dvi",
        dxr: "application/x-director",
        eps: "application/postscript",
        etx: "text/x-setext",
        exe: "application/octet-stream",
        ez: "application/andrew-inset",
        gif: "image/gif",
        gram: "application/srgs",
        grxml: "application/srgs+xml",
        gtar: "application/x-gtar",
        hdf: "application/x-hdf",
        hqx: "application/mac-binhex40",
        htm: "text/html",
        html: "text/html",
        ice: "x-conference/x-cooltalk",
        ico: "image/x-icon",
        ics: "text/calendar",
        ief: "image/ief",
        ifb: "text/calendar",
        iges: "model/iges",
        igs: "model/iges",
        jnlp: "application/x-java-jnlp-file",
        jp2: "image/jp2",
        jpe: "image/jpeg",
        jpeg: "image/jpeg",
        jpg: "image/jpeg",
        js: "application/x-javascript",
        kar: "audio/midi",
        latex: "application/x-latex",
        lha: "application/octet-stream",
        lzh: "application/octet-stream",
        m3u: "audio/x-mpegurl",
        m4a: "audio/mp4a-latm",
        m4b: "audio/mp4a-latm",
        m4p: "audio/mp4a-latm",
        m4u: "video/vnd.mpegurl",
        m4v: "video/x-m4v",
        mac: "image/x-macpaint",
        man: "application/x-troff-man",
        mathml: "application/mathml+xml",
        me: "application/x-troff-me",
        mesh: "model/mesh",
        mid: "audio/midi",
        midi: "audio/midi",
        mif: "application/vnd.mif",
        mov: "video/quicktime",
        movie: "video/x-sgi-movie",
        mp2: "audio/mpeg",
        mp3: "audio/mpeg",
        mp4: "video/mp4",
        mpe: "video/mpeg",
        mpeg: "video/mpeg",
        mpg: "video/mpeg",
        mpga: "audio/mpeg",
        ms: "application/x-troff-ms",
        msh: "model/mesh",
        mxu: "video/vnd.mpegurl",
        nc: "application/x-netcdf",
        oda: "application/oda",
        ogg: "application/ogg",
        pbm: "image/x-portable-bitmap",
        pct: "image/pict",
        pdb: "chemical/x-pdb",
        pdf: "application/pdf",
        pgm: "image/x-portable-graymap",
        pgn: "application/x-chess-pgn",
        pic: "image/pict",
        pict: "image/pict",
        png: "image/png",
        pnm: "image/x-portable-anymap",
        pnt: "image/x-macpaint",
        pntg: "image/x-macpaint",
        ppm: "image/x-portable-pixmap",
        ppt: "application/vnd.ms-powerpoint",
        pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        potx: "application/vnd.openxmlformats-officedocument.presentationml.template",
        ppsx: "application/vnd.openxmlformats-officedocument.presentationml.slideshow",
        ppam: "application/vnd.ms-powerpoint.addin.macroEnabled.12",
        pptm: "application/vnd.ms-powerpoint.presentation.macroEnabled.12",
        potm: "application/vnd.ms-powerpoint.template.macroEnabled.12",
        ppsm: "application/vnd.ms-powerpoint.slideshow.macroEnabled.12",
        ps: "application/postscript",
        qt: "video/quicktime",
        qti: "image/x-quicktime",
        qtif: "image/x-quicktime",
        ra: "audio/x-pn-realaudio",
        ram: "audio/x-pn-realaudio",
        ras: "image/x-cmu-raster",
        rdf: "application/rdf+xml",
        rgb: "image/x-rgb",
        rm: "application/vnd.rn-realmedia",
        roff: "application/x-troff",
        rtf: "text/rtf",
        rtx: "text/richtext",
        sgm: "text/sgml",
        sgml: "text/sgml",
        sh: "application/x-sh",
        shar: "application/x-shar",
        silo: "model/mesh",
        sit: "application/x-stuffit",
        skd: "application/x-koan",
        skm: "application/x-koan",
        skp: "application/x-koan",
        skt: "application/x-koan",
        smi: "application/smil",
        smil: "application/smil",
        snd: "audio/basic",
        so: "application/octet-stream",
        spl: "application/x-futuresplash",
        src: "application/x-wais-source",
        sv4cpio: "application/x-sv4cpio",
        sv4crc: "application/x-sv4crc",
        svg: "image/svg+xml",
        swf: "application/x-shockwave-flash",
        t: "application/x-troff",
        tar: "application/x-tar",
        tcl: "application/x-tcl",
        tex: "application/x-tex",
        texi: "application/x-texinfo",
        texinfo: "application/x-texinfo",
        tif: "image/tiff",
        tiff: "image/tiff",
        tr: "application/x-troff",
        tsv: "text/tab-separated-values",
        txt: "text/plain",
        ustar: "application/x-ustar",
        vcd: "application/x-cdlink",
        vrml: "model/vrml",
        vxml: "application/voicexml+xml",
        wav: "audio/x-wav",
        wbmp: "image/vnd.wap.wbmp",
        wbmxl: "application/vnd.wap.wbxml",
        wml: "text/vnd.wap.wml",
        wmlc: "application/vnd.wap.wmlc",
        wmls: "text/vnd.wap.wmlscript",
        wmlsc: "application/vnd.wap.wmlscriptc",
        wrl: "model/vrml",
        xbm: "image/x-xbitmap",
        xht: "application/xhtml+xml",
        xhtml: "application/xhtml+xml",
        xls: "application/vnd.ms-excel",
        xml: "application/xml",
        xpm: "image/x-xpixmap",
        xsl: "application/xml",
        xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        xltx: "application/vnd.openxmlformats-officedocument.spreadsheetml.template",
        xlsm: "application/vnd.ms-excel.sheet.macroEnabled.12",
        xltm: "application/vnd.ms-excel.template.macroEnabled.12",
        xlam: "application/vnd.ms-excel.addin.macroEnabled.12",
        xlsb: "application/vnd.ms-excel.sheet.binary.macroEnabled.12",
        xslt: "application/xslt+xml",
        xul: "application/vnd.mozilla.xul+xml",
        xwd: "image/x-xwindowdump",
        xyz: "chemical/x-xyz",
        zip: "application/zip"
    }, a = function (e, n) {
        var i = new t.Promise;
        if ("undefined" == typeof FileReader)return t.Promise.error(new t.Error(-1, "Attempted to use a FileReader on an unsupported browser."));
        var r = new FileReader;
        return r.onloadend = function () {
            if (2 !== r.readyState)return void i.reject(new t.Error(-1, "Error reading file."));
            var e = r.result, s = /^data:([^;]*);base64,(.*)$/.exec(e);
            return s ? void i.resolve(s[2], n || s[1]) : void i.reject(new t.Error(-1, "Unable to interpret data URL: " + e))
        }, r.readAsDataURL(e), i
    };
    t.File = function (e, i, o) {
        this._name = e;
        var u = t.User.current();
        this._metaData = {owner: null != u ? u.id : "unknown"};
        var c = /\.([^.]*)$/.exec(e);
        c && (c = c[1].toLowerCase());
        var l = o || s[c] || "text/plain";
        if (this._guessedType = l, n.isArray(i))this._source = t.Promise.as(r(i), l), this._metaData.size = i.length; else if (i && i.base64)this._source = t.Promise.as(i.base64, l); else if ("undefined" != typeof File && i instanceof File)this._source = a(i, o); else if (t._isNode && Buffer.isBuffer(i))this._source = t.Promise.as(i.toString("base64"), l), this._metaData.size = i.length; else if (n.isString(i))throw"Creating a AV.File from a String is not yet supported."
    }, t.File.withURL = function (e, n, i, r) {
        if (!e || !n)throw"Please provide file name and url";
        var s = new t.File(e, null, r);
        if (i)for (var a in i)s._metaData[a] || (s._metaData[a] = i[a]);
        return s._url = n, s._metaData.__source = "external", s
    }, t.File.createWithoutData = function (e) {
        var n = new t.File;
        return n.id = e, n
    }, t.File.prototype = {
        getACL: function () {
            return this._acl
        }, setACL: function (e) {
            return e instanceof t.ACL ? void(this._acl = e) : new t.Error(t.Error.OTHER_CAUSE, "ACL must be a AV.ACL.")
        }, name: function () {
            return this._name
        }, url: function () {
            return this._url
        }, metaData: function (e, t) {
            return null != e && null != t ? (this._metaData[e] = t, this) : null != e ? this._metaData[e] : this._metaData
        }, thumbnailURL: function (e, t, n, i, r) {
            if (!this.url())throw"Invalid url.";
            if (!e || !t || 0 >= e || 0 >= t)throw"Invalid width or height value.";
            if (n = n || 100, i = null == i ? !0 : i, 0 >= n || n > 100)throw"Invalid quality value.";
            r = r || "png";
            var s = i ? 2 : 1;
            return this.url() + "?imageView/" + s + "/w/" + e + "/h/" + t + "/q/" + n + "/format/" + r
        }, size: function () {
            return this.metaData().size
        }, ownerId: function () {
            return this.metaData().owner
        }, destroy: function (e) {
            if (!this.id)return t.Promise.error("The file id is not eixsts.")._thenRunCallbacks(e);
            var n = t._request("files", null, this.id, "DELETE");
            return n._thenRunCallbacks(e)
        }, save: function (e) {
            var n = this;
            if (!n._previousSave)if (n._source)if (t._isNode) {
                var i = require("qiniu"), r = require("path");
                n._previousSave = n._source.then(function (e, i) {
                    var s = function () {
                        return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
                    }, a = s() + s() + s() + s() + r.extname(n._name), o = {
                        key: a,
                        ACL: n._acl,
                        name: n._name,
                        mime_type: i,
                        metaData: n._metaData
                    };
                    return i && null == n._metaData.mime_type && (n._metaData.mime_type = i), n._qiniu_key = a, n._base64 = e, t._request("qiniu", null, null, "POST", o)
                }).then(function (e) {
                    n._url = e.url, n._bucket = e.bucket, n.id = e.objectId;
                    var r = e.token, s = new t.Promise, a = new i.io.PutExtra;
                    n._metaData.mime_type && (a.mimeType = n._metaData.mime_type);
                    var o = new Buffer(n._base64, "base64");
                    return i.io.put(r, n._qiniu_key, o, a, function (e) {
                        delete n._qiniu_key, delete n._base64, e ? (s.reject(e), n.destroy()) : s.resolve(n)
                    }), s
                })
            } else n._previousSave = n._source.then(function (e, i) {
                var r = {base64: e, _ContentType: i, ACL: n._acl, mime_type: i, metaData: n._metaData};
                return t._request("files", n._name, null, "POST", r)
            }).then(function (e) {
                return n._name = e.name, n._url = e.url, n.id = e.objectId, e.size && (n._metaData.size = e.size), n
            }); else if (n._url && "external" == n._metaData.__source) {
                var s = {name: n._name, ACL: n._acl, metaData: n._metaData, mime_type: n._guessedType, url: n._url};
                n._previousSave = t._request("files", n._name, null, "POST", s).then(function (e) {
                    return n._name = e.name, n._url = e.url, n.id = e.objectId, e.size && (n._metaData.size = e.size), n
                })
            }
            return n._previousSave._thenRunCallbacks(e)
        }
    }
}(this), function (e) {
    e.AV = e.AV || {};
    var t = e.AV, n = t._;
    t.Object = function (e, i) {
        if (n.isString(e))return t.Object._create.apply(this, arguments);
        e = e || {}, i && i.parse && (e = this.parse(e));
        var r = t._getValue(this, "defaults");
        if (r && (e = n.extend({}, r, e)), i && i.collection && (this.collection = i.collection), this._serverData = {}, this._opSetQueue = [{}], this.attributes = {}, this._hashedJSON = {}, this._escapedAttributes = {}, this.cid = n.uniqueId("c"), this.changed = {}, this._silent = {}, this._pending = {}, !this.set(e, {silent: !0}))throw new Error("Can't create an invalid AV.Object");
        this.changed = {}, this._silent = {}, this._pending = {}, this._hasData = !0, this._previousAttributes = n.clone(this.attributes), this.initialize.apply(this, arguments)
    }, t.Object.saveAll = function (e, n) {
        return t.Object._deepSaveAsync(e)._thenRunCallbacks(n)
    }, n.extend(t.Object.prototype, t.Events, {
        _existed: !1, _fetchWhenSave: !1, initialize: function () {
        }, fetchWhenSave: function (e) {
            if (!n.isBoolean(e))throw"Expect boolean value for fetchWhenSave";
            this._fetchWhenSave = e
        }, getObjectId: function () {
            return this.id
        }, getCreatedAt: function () {
            return this.createdAt || this.get("createdAt")
        }, getUpdatedAt: function () {
            return this.updatedAt || this.get("updatedAt")
        }, toJSON: function () {
            var e = this._toFullJSON();
            return t._arrayEach(["__type", "className"], function (t) {
                delete e[t]
            }), e
        }, _toFullJSON: function (e) {
            var i = n.clone(this.attributes);
            return t._objectEach(i, function (n, r) {
                i[r] = t._encode(n, e)
            }), t._objectEach(this._operations, function (e, t) {
                i[t] = e
            }), n.has(this, "id") && (i.objectId = this.id), n.has(this, "createdAt") && (i.createdAt = n.isDate(this.createdAt) ? this.createdAt.toJSON() : this.createdAt), n.has(this, "updatedAt") && (i.updatedAt = n.isDate(this.updatedAt) ? this.updatedAt.toJSON() : this.updatedAt), i.__type = "Object", i.className = this.className, i
        }, _refreshCache: function () {
            var e = this;
            e._refreshingCache || (e._refreshingCache = !0, t._objectEach(this.attributes, function (i, r) {
                i instanceof t.Object ? i._refreshCache() : n.isObject(i) && e._resetCacheForKey(r) && e.set(r, new t.Op.Set(i), {silent: !0})
            }), delete e._refreshingCache)
        }, dirty: function (e) {
            this._refreshCache();
            var t = n.last(this._opSetQueue);
            return e ? t[e] ? !0 : !1 : this.id ? n.keys(t).length > 0 ? !0 : !1 : !0
        }, _toPointer: function () {
            return {__type: "Pointer", className: this.className, objectId: this.id}
        }, get: function (e) {
            return this.attributes[e]
        }, relation: function (e) {
            var n = this.get(e);
            if (n) {
                if (!(n instanceof t.Relation))throw"Called relation() on non-relation field " + e;
                return n._ensureParentAndKey(this, e), n
            }
            return new t.Relation(this, e)
        }, escape: function (e) {
            var i = this._escapedAttributes[e];
            if (i)return i;
            var r, s = this.attributes[e];
            return r = t._isNullOrUndefined(s) ? "" : n.escape(s.toString()), this._escapedAttributes[e] = r, r
        }, has: function (e) {
            return !t._isNullOrUndefined(this.attributes[e])
        }, _mergeMagicFields: function (e) {
            var i = this, r = ["id", "objectId", "createdAt", "updatedAt"];
            t._arrayEach(r, function (r) {
                e[r] && ("objectId" === r ? i.id = e[r] : i[r] = "createdAt" !== r && "updatedAt" !== r || n.isDate(e[r]) ? e[r] : t._parseDate(e[r]), delete e[r])
            })
        }, _startSave: function () {
            this._opSetQueue.push({})
        }, _cancelSave: function () {
            var e = n.first(this._opSetQueue);
            this._opSetQueue = n.rest(this._opSetQueue);
            var i = n.first(this._opSetQueue);
            t._objectEach(e, function (t, n) {
                var r = e[n], s = i[n];
                r && s ? i[n] = s._mergeWithPrevious(r) : r && (i[n] = r)
            }), this._saving = this._saving - 1
        }, _finishSave: function (e) {
            var i = {};
            t._traverse(this.attributes, function (e) {
                e instanceof t.Object && e.id && e._hasData && (i[e.id] = e)
            });
            var r = n.first(this._opSetQueue);
            this._opSetQueue = n.rest(this._opSetQueue), this._applyOpSet(r, this._serverData), this._mergeMagicFields(e);
            var s = this;
            t._objectEach(e, function (e, n) {
                s._serverData[n] = t._decode(n, e);
                var r = t._traverse(s._serverData[n], function (e) {
                    return e instanceof t.Object && i[e.id] ? i[e.id] : void 0
                });
                r && (s._serverData[n] = r)
            }), this._rebuildAllEstimatedData(), this._saving = this._saving - 1
        }, _finishFetch: function (e, n) {
            this._opSetQueue = [{}], this._mergeMagicFields(e);
            var i = this;
            t._objectEach(e, function (e, n) {
                i._serverData[n] = t._decode(n, e)
            }), this._rebuildAllEstimatedData(), this._refreshCache(), this._opSetQueue = [{}], this._hasData = n
        }, _applyOpSet: function (e, n) {
            var i = this;
            t._objectEach(e, function (e, r) {
                n[r] = e._estimate(n[r], i, r), n[r] === t.Op._UNSET && delete n[r]
            })
        }, _resetCacheForKey: function (e) {
            var i = this.attributes[e];
            if (!(!n.isObject(i) || i instanceof t.Object || i instanceof t.File)) {
                i = i.toJSON ? i.toJSON() : i;
                var r = JSON.stringify(i);
                if (this._hashedJSON[e] !== r) {
                    var s = !!this._hashedJSON[e];
                    return this._hashedJSON[e] = r, s
                }
            }
            return !1
        }, _rebuildEstimatedDataForKey: function (e) {
            var n = this;
            delete this.attributes[e], this._serverData[e] && (this.attributes[e] = this._serverData[e]), t._arrayEach(this._opSetQueue, function (i) {
                var r = i[e];
                r && (n.attributes[e] = r._estimate(n.attributes[e], n, e), n.attributes[e] === t.Op._UNSET ? delete n.attributes[e] : n._resetCacheForKey(e))
            })
        }, _rebuildAllEstimatedData: function () {
            var e = this, i = n.clone(this.attributes);
            this.attributes = n.clone(this._serverData), t._arrayEach(this._opSetQueue, function (n) {
                e._applyOpSet(n, e.attributes), t._objectEach(n, function (t, n) {
                    e._resetCacheForKey(n)
                })
            }), t._objectEach(i, function (t, n) {
                e.attributes[n] !== t && e.trigger("change:" + n, e, e.attributes[n], {})
            }), t._objectEach(this.attributes, function (t, r) {
                n.has(i, r) || e.trigger("change:" + r, e, t, {})
            })
        }, set: function (e, i, r) {
            var s;
            if (n.isObject(e) || t._isNullOrUndefined(e) ? (s = e, t._objectEach(s, function (e, n) {
                    s[n] = t._decode(n, e)
                }), r = i) : (s = {}, s[e] = t._decode(e, i)), r = r || {}, !s)return this;
            s instanceof t.Object && (s = s.attributes), r.unset && t._objectEach(s, function (e, n) {
                s[n] = new t.Op.Unset
            });
            var a = n.clone(s), o = this;
            if (t._objectEach(a, function (e, n) {
                    e instanceof t.Op && (a[n] = e._estimate(o.attributes[n], o, n), a[n] === t.Op._UNSET && delete a[n])
                }), !this._validate(s, r))return !1;
            this._mergeMagicFields(s), r.changes = {};
            {
                var u = this._escapedAttributes;
                this._previousAttributes || {}
            }
            return t._arrayEach(n.keys(s), function (e) {
                var i = s[e];
                i instanceof t.Relation && (i.parent = o), i instanceof t.Op || (i = new t.Op.Set(i));
                var a = !0;
                i instanceof t.Op.Set && n.isEqual(o.attributes[e], i.value) && (a = !1), a && (delete u[e], r.silent ? o._silent[e] = !0 : r.changes[e] = !0);
                var c = n.last(o._opSetQueue);
                c[e] = i._mergeWithPrevious(c[e]), o._rebuildEstimatedDataForKey(e), a ? (o.changed[e] = o.attributes[e], r.silent || (o._pending[e] = !0)) : (delete o.changed[e], delete o._pending[e])
            }), r.silent || this.change(r), this
        }, unset: function (e, t) {
            return t = t || {}, t.unset = !0, this.set(e, null, t)
        }, increment: function (e, i) {
            return (n.isUndefined(i) || n.isNull(i)) && (i = 1), this.set(e, new t.Op.Increment(i))
        }, add: function (e, n) {
            return this.set(e, new t.Op.Add([n]))
        }, addUnique: function (e, n) {
            return this.set(e, new t.Op.AddUnique([n]))
        }, remove: function (e, n) {
            return this.set(e, new t.Op.Remove([n]))
        }, op: function (e) {
            return n.last(this._opSetQueue)[e]
        }, clear: function (e) {
            e = e || {}, e.unset = !0;
            var t = n.extend(this.attributes, this._operations);
            return this.set(t, e)
        }, _getSaveJSON: function () {
            var e = n.clone(n.first(this._opSetQueue));
            return t._objectEach(e, function (t, n) {
                e[n] = t.toJSON()
            }), e
        }, _canBeSerialized: function () {
            return t.Object._canBeSerializedAsValue(this.attributes)
        }, fetch: function () {
            var e = null, n = {};
            1 === arguments.length ? e = arguments[0] : 2 === arguments.length && (n = arguments[0], e = arguments[1]);
            var i = this, r = t._request("classes", this.className, this.id, "GET", n);
            return r.then(function (e, t, n) {
                return i._finishFetch(i.parse(e, t, n), !0), i
            })._thenRunCallbacks(e, this)
        }, save: function (e, i, r) {
            var s, a, o;
            if (n.isObject(e) || t._isNullOrUndefined(e) ? (s = e, o = i) : (s = {}, s[e] = i, o = r), !o && s) {
                var u = n.reject(s, function (e, t) {
                    return n.include(["success", "error", "wait"], t)
                });
                if (0 === u.length) {
                    var c = !0;
                    if (n.has(s, "success") && !n.isFunction(s.success) && (c = !1), n.has(s, "error") && !n.isFunction(s.error) && (c = !1), c)return this.save(null, s)
                }
            }
            o = n.clone(o) || {}, o.wait && (a = n.clone(this.attributes));
            var l = n.clone(o) || {};
            l.wait && (l.silent = !0);
            var h;
            if (l.error = function (e, t) {
                    h = t
                }, s && !this.set(s, l))return t.Promise.error(h)._thenRunCallbacks(o, this);
            var d = this;
            d._refreshCache();
            var f = [], _ = [];
            return t.Object._findUnsavedChildren(d.attributes, f, _), f.length + _.length > 0 ? t.Object._deepSaveAsync(this.attributes, d).then(function () {
                return d.save(null, o)
            }, function (e) {
                return t.Promise.error(e)._thenRunCallbacks(o, d)
            }) : (this._startSave(), this._saving = (this._saving || 0) + 1, this._allPreviousSaves = this._allPreviousSaves || t.Promise.as(), this._allPreviousSaves = this._allPreviousSaves._continueWith(function () {
                var e = d.id ? "PUT" : "POST", i = d._getSaveJSON();
                "PUT" === e && d._fetchWhenSave && (i._fetchWhenSave = !0);
                var r = "classes", u = d.className;
                "_User" !== d.className || d.id || (r = "users", u = null);
                var c = o._makeRequest || t._request, h = c(r, u, d.id, e, i);
                return h = h.then(function (e, t, i) {
                    var r = d.parse(e, t, i);
                    return o.wait && (r = n.extend(s || {}, r)), d._finishSave(r), o.wait && d.set(a, l), d
                }, function (e) {
                    return d._cancelSave(), t.Promise.error(e)
                })._thenRunCallbacks(o, d)
            }), this._allPreviousSaves)
        }, destroy: function (e) {
            e = e || {};
            var n = this, i = function () {
                n.trigger("destroy", n, n.collection, e)
            };
            if (!this.id)return i();
            e.wait || i();
            var r = t._request("classes", this.className, this.id, "DELETE");
            return r.then(function () {
                return e.wait && i(), n
            })._thenRunCallbacks(e, this)
        }, parse: function (e, i) {
            var r = n.clone(e);
            return n(["createdAt", "updatedAt"]).each(function (e) {
                r[e] && (r[e] = t._parseDate(r[e]))
            }), r.updatedAt || (r.updatedAt = r.createdAt), i && (this._existed = 201 !== i), r
        }, clone: function () {
            return new this.constructor(this.attributes)
        }, isNew: function () {
            return !this.id
        }, change: function (e) {
            e = e || {};
            var i = this._changing;
            this._changing = !0;
            var r = this;
            t._objectEach(this._silent, function (e) {
                r._pending[e] = !0
            });
            var s = n.extend({}, e.changes, this._silent);
            if (this._silent = {}, t._objectEach(s, function (t, n) {
                    r.trigger("change:" + n, r, r.get(n), e)
                }), i)return this;
            for (var a = function (e, t) {
                r._pending[t] || r._silent[t] || delete r.changed[t]
            }; !n.isEmpty(this._pending);)this._pending = {}, this.trigger("change", this, e), t._objectEach(this.changed, a), r._previousAttributes = n.clone(this.attributes);
            return this._changing = !1, this
        }, existed: function () {
            return this._existed
        }, hasChanged: function (e) {
            return arguments.length ? this.changed && n.has(this.changed, e) : !n.isEmpty(this.changed)
        }, changedAttributes: function (e) {
            if (!e)return this.hasChanged() ? n.clone(this.changed) : !1;
            var i = {}, r = this._previousAttributes;
            return t._objectEach(e, function (e, t) {
                n.isEqual(r[t], e) || (i[t] = e)
            }), i
        }, previous: function (e) {
            return arguments.length && this._previousAttributes ? this._previousAttributes[e] : null
        }, previousAttributes: function () {
            return n.clone(this._previousAttributes)
        }, isValid: function () {
            return !this.validate(this.attributes)
        }, validate: function (e) {
            return !n.has(e, "ACL") || e.ACL instanceof t.ACL ? !1 : new t.Error(t.Error.OTHER_CAUSE, "ACL must be a AV.ACL.")
        }, _validate: function (e, t) {
            if (t.silent || !this.validate)return !0;
            e = n.extend({}, this.attributes, e);
            var i = this.validate(e, t);
            return i ? (t && t.error ? t.error(this, i, t) : this.trigger("error", this, i, t), !1) : !0
        }, getACL: function () {
            return this.get("ACL")
        }, setACL: function (e, t) {
            return this.set("ACL", e, t)
        }
    }), t.Object.createWithoutData = function (e, n, i) {
        var r = new t.Object(e);
        return r.id = n, r._hasData = i, r
    }, t.Object.destroyAll = function (e, n) {
        if (null == e || 0 == e.length)return t.Promise.as()._thenRunCallbacks(n);
        var i = e[0].className, r = "", s = !0;
        e.forEach(function (e) {
            if (e.className != i)throw"AV.Object.destroyAll requires the argument object array's classNames must be the same";
            if (!e.id)throw"Could not delete unsaved object";
            s ? (r = e.id, s = !1) : r = r + "," + e.id
        });
        var a = t._request("classes", i, r, "DELETE");
        return a._thenRunCallbacks(n)
    }, t.Object._getSubclass = function (e) {
        if (!n.isString(e))throw"AV.Object._getSubclass requires a string argument.";
        var i = t.Object._classMap[e];
        return i || (i = t.Object.extend(e), t.Object._classMap[e] = i), i
    }, t.Object._create = function (e, n, i) {
        var r = t.Object._getSubclass(e);
        return new r(n, i)
    }, t.Object._classMap = {}, t.Object._extend = t._extend, t.Object["new"] = function (e, n) {
        return new t.Object(e, n)
    }, t.Object.extend = function (e, i, r) {
        if (!n.isString(e)) {
            if (e && n.has(e, "className"))return t.Object.extend(e.className, e, i);
            throw new Error("AV.Object.extend's first argument should be the className.")
        }
        "User" === e && (e = "_User");
        var s = null;
        if (n.has(t.Object._classMap, e)) {
            var a = t.Object._classMap[e];
            s = a._extend(i, r)
        } else i = i || {}, i.className = e, s = this._extend(i, r);
        return s.extend = function (i) {
            if (n.isString(i) || i && n.has(i, "className"))return t.Object.extend.apply(s, arguments);
            var r = [e].concat(t._.toArray(arguments));
            return t.Object.extend.apply(s, r)
        }, s["new"] = function (e, t) {
            return new s(e, t)
        }, t.Object._classMap[e] = s, s
    }, t.Object._findUnsavedChildren = function (e, n, i) {
        t._traverse(e, function (e) {
            return e instanceof t.Object ? (e._refreshCache(), void(e.dirty() && n.push(e))) : e instanceof t.File ? void(e.url() || e.id || i.push(e)) : void 0
        })
    }, t.Object._canBeSerializedAsValue = function (e) {
        var i = !0;
        return e instanceof t.Object ? i = !!e.id : n.isArray(e) ? t._arrayEach(e, function (e) {
            t.Object._canBeSerializedAsValue(e) || (i = !1)
        }) : n.isObject(e) && t._objectEach(e, function (e) {
            t.Object._canBeSerializedAsValue(e) || (i = !1)
        }), i
    }, t.Object._deepSaveAsync = function (e, i) {
        var r = [], s = [];
        t.Object._findUnsavedChildren(e, r, s), i && (r = n.filter(r, function (e) {
            return e != i
        }));
        var a = t.Promise.as();
        n.each(s, function (e) {
            a = a.then(function () {
                return e.save()
            })
        });
        var o = n.uniq(r), u = n.uniq(o);
        return a.then(function () {
            return t.Promise._continueWhile(function () {
                return u.length > 0
            }, function () {
                var e = [], i = [];
                if (t._arrayEach(u, function (t) {
                        return e.length > 20 ? void i.push(t) : void(t._canBeSerialized() ? e.push(t) : i.push(t))
                    }), u = i, 0 === e.length)return t.Promise.error(new t.Error(t.Error.OTHER_CAUSE, "Tried to save a batch with a cycle."));
                var r = t.Promise.when(n.map(e, function (e) {
                    return e._allPreviousSaves || t.Promise.as()
                })), s = new t.Promise;
                return t._arrayEach(e, function (e) {
                    e._allPreviousSaves = s
                }), r._continueWith(function () {
                    return t._request("batch", null, null, "POST", {
                        requests: n.map(e, function (e) {
                            var t = e._getSaveJSON(), n = "POST", i = "/1.1/classes/" + e.className;
                            return e.id && (i = i + "/" + e.id, n = "PUT"), e._startSave(), {
                                method: n,
                                path: i,
                                body: t
                            }
                        })
                    }).then(function (n, i, r) {
                        var s;
                        return t._arrayEach(e, function (e, t) {
                            n[t].success ? e._finishSave(e.parse(n[t].success, i, r)) : (s = s || n[t].error, e._cancelSave())
                        }), s ? t.Promise.error(new t.Error(s.code, s.error)) : void 0
                    }).then(function (e) {
                        return s.resolve(e), e
                    }, function (e) {
                        return s.reject(e), t.Promise.error(e)
                    })
                })
            })
        }).then(function () {
            return e
        })
    }
}(this), function (e) {
    e.AV = e.AV || {};
    var t = e.AV, n = t._;
    t.Role = t.Object.extend("_Role", {
        constructor: function (e, i) {
            n.isString(e) && i instanceof t.ACL ? (t.Object.prototype.constructor.call(this, null, null), this.setName(e), this.setACL(i)) : t.Object.prototype.constructor.call(this, e, i)
        }, getName: function () {
            return this.get("name")
        }, setName: function (e, t) {
            return this.set("name", e, t)
        }, getUsers: function () {
            return this.relation("users")
        }, getRoles: function () {
            return this.relation("roles")
        }, validate: function (e, i) {
            if ("name"in e && e.name !== this.getName()) {
                var r = e.name;
                if (this.id && this.id !== e.objectId)return new t.Error(t.Error.OTHER_CAUSE, "A role's name can only be set before it has been saved.");
                if (!n.isString(r))return new t.Error(t.Error.OTHER_CAUSE, "A role's name must be a String.");
                if (!/^[0-9a-zA-Z\-_ ]+$/.test(r))return new t.Error(t.Error.OTHER_CAUSE, "A role's name can only contain alphanumeric characters, _, -, and spaces.")
            }
            return t.Object.prototype.validate ? t.Object.prototype.validate.call(this, e, i) : !1
        }
    })
}(this), function (e) {
    e.AV = e.AV || {};
    var t = e.AV, n = t._;
    t.User = t.Object.extend("_User", {
        _isCurrentUser: !1, _mergeMagicFields: function (e) {
            e.sessionToken && (this._sessionToken = e.sessionToken, delete e.sessionToken), t.User.__super__._mergeMagicFields.call(this, e)
        }, _cleanupAuthData: function () {
            if (this.isCurrent()) {
                var e = this.get("authData");
                e && t._objectEach(this.get("authData"), function (t, n) {
                    e[n] || delete e[n]
                })
            }
        }, _synchronizeAllAuthData: function () {
            var e = this.get("authData");
            if (e) {
                var n = this;
                t._objectEach(this.get("authData"), function (e, t) {
                    n._synchronizeAuthData(t)
                })
            }
        }, _synchronizeAuthData: function (e) {
            if (this.isCurrent()) {
                var i;
                n.isString(e) ? (i = e, e = t.User._authProviders[i]) : i = e.getAuthType();
                var r = this.get("authData");
                if (r && e) {
                    var s = e.restoreAuthentication(r[i]);
                    s || this._unlinkFrom(e)
                }
            }
        }, _handleSaveResult: function (e) {
            e && (this._isCurrentUser = !0), this._cleanupAuthData(), this._synchronizeAllAuthData(), delete this._serverData.password, this._rebuildEstimatedDataForKey("password"), this._refreshCache(), (e || this.isCurrent()) && t.User._saveCurrentUser(this)
        }, _linkWith: function (e, i) {
            var r;
            if (n.isString(e) ? (r = e, e = t.User._authProviders[e]) : r = e.getAuthType(), n.has(i, "authData")) {
                var s = this.get("authData") || {};
                s[r] = i.authData, this.set("authData", s);
                var a = n.clone(i) || {};
                return a.success = function (e) {
                    e._handleSaveResult(!0), i.success && i.success.apply(this, arguments)
                }, this.save({authData: s}, a)
            }
            var o = this, u = new t.Promise;
            return e.authenticate({
                success: function (e, t) {
                    o._linkWith(e, {authData: t, success: i.success, error: i.error}).then(function () {
                        u.resolve(o)
                    })
                }, error: function (e, t) {
                    i.error && i.error(o, t), u.reject(t)
                }
            }), u
        }, _unlinkFrom: function (e, i) {
            var r;
            n.isString(e) ? (r = e, e = t.User._authProviders[e]) : r = e.getAuthType();
            var s = n.clone(i), a = this;
            return s.authData = null, s.success = function () {
                a._synchronizeAuthData(e), i.success && i.success.apply(this, arguments)
            }, this._linkWith(e, s)
        }, _isLinked: function (e) {
            var t;
            t = n.isString(e) ? e : e.getAuthType();
            var i = this.get("authData") || {};
            return !!i[t]
        }, _logOutWithAll: function () {
            var e = this.get("authData");
            if (e) {
                var n = this;
                t._objectEach(this.get("authData"), function (e, t) {
                    n._logOutWith(t)
                })
            }
        }, _logOutWith: function (e) {
            this.isCurrent() && (n.isString(e) && (e = t.User._authProviders[e]), e && e.deauthenticate && e.deauthenticate())
        }, signUp: function (e, i) {
            var r;
            i = i || {};
            var s = e && e.username || this.get("username");
            if (!s || "" === s)return r = new t.Error(t.Error.OTHER_CAUSE, "Cannot sign up user with an empty name."), i && i.error && i.error(this, r), t.Promise.error(r);
            var a = e && e.password || this.get("password");
            if (!a || "" === a)return r = new t.Error(t.Error.OTHER_CAUSE, "Cannot sign up user with an empty password."), i && i.error && i.error(this, r), t.Promise.error(r);
            var o = n.clone(i);
            return o.success = function (e) {
                e._handleSaveResult(!0), i.success && i.success.apply(this, arguments)
            }, this.save(e, o)
        }, signUpOrlogInWithMobilePhone: function (e, i) {
            var r;
            i = i || {};
            var s = e && e.mobilePhoneNumber || this.get("mobilePhoneNumber");
            if (!s || "" === s)return r = new t.Error(t.Error.OTHER_CAUSE, "Cannot sign up or login user by mobilePhoneNumber with an empty mobilePhoneNumber."), i && i.error && i.error(this, r), t.Promise.error(r);
            var a = e && e.smsCode || this.get("smsCode");
            if (!a || "" === a)return r = new t.Error(t.Error.OTHER_CAUSE, "Cannot sign up or login user by mobilePhoneNumber  with an empty smsCode."), i && i.error && i.error(this, r), t.Promise.error(r);
            var o = n.clone(i);
            return o._makeRequest = function (e, n, i, r, s) {
                return t._request("usersByMobilePhone", null, null, "POST", s)
            }, o.success = function (e) {
                e._handleSaveResult(!0), delete e.attributes.smsCode, delete e._serverData.smsCode, i.success && i.success.apply(this, arguments)
            }, this.save(e, o)
        }, logIn: function (e) {
            var n = this, i = t._request("login", null, null, "GET", this.toJSON());
            return i.then(function (e, t, i) {
                var r = n.parse(e, t, i);
                return n._finishFetch(r), n._handleSaveResult(!0), r.smsCode || delete n.attributes.smsCode, n
            })._thenRunCallbacks(e, this)
        }, save: function (e, i, r) {
            var s, a;
            n.isObject(e) || n.isNull(e) || n.isUndefined(e) ? (s = e, a = i) : (s = {}, s[e] = i, a = r), a = a || {};
            var o = n.clone(a);
            return o.success = function (e) {
                e._handleSaveResult(!1), a.success && a.success.apply(this, arguments)
            }, t.Object.prototype.save.call(this, s, o)
        }, follow: function (e, i) {
            if (!this.id)throw"Please signin.";
            if (!e)throw"Invalid target user.";
            var r = n.isString(e) ? e : e.id;
            if (!r)throw"Invalid target user.";
            var s = "users/" + this.id + "/friendship/" + r, a = t._request(s, null, null, "POST", null);
            return a._thenRunCallbacks(i)
        }, unfollow: function (e, i) {
            if (!this.id)throw"Please signin.";
            if (!e)throw"Invalid target user.";
            var r = n.isString(e) ? e : e.id;
            if (!r)throw"Invalid target user.";
            var s = "users/" + this.id + "/friendship/" + r, a = t._request(s, null, null, "DELETE", null);
            return a._thenRunCallbacks(i)
        }, followerQuery: function () {
            return t.User.followerQuery(this.id)
        }, followeeQuery: function () {
            return t.User.followeeQuery(this.id)
        }, fetch: function (e) {
            var i = e ? n.clone(e) : {};
            return i.success = function (t) {
                t._handleSaveResult(!1), e && e.success && e.success.apply(this, arguments)
            }, t.Object.prototype.fetch.call(this, i)
        }, updatePassword: function (e, n, i) {
            var r = "users/" + this.id + "/updatePassword", s = {
                old_password: e,
                new_password: n
            }, a = t._request(r, null, null, "PUT", s);
            return a._thenRunCallbacks(i, this)
        }, isCurrent: function () {
            return this._isCurrentUser
        }, getUsername: function () {
            return this.get("username")
        }, getMobilePhoneNumber: function () {
            return this.get("mobilePhoneNumber")
        }, setMobilePhoneNumber: function (e, t) {
            return this.set("mobilePhoneNumber", e, t)
        }, setUsername: function (e, t) {
            return this.set("username", e, t)
        }, setPassword: function (e, t) {
            return this.set("password", e, t)
        }, getEmail: function () {
            return this.get("email")
        }, setEmail: function (e, t) {
            return this.set("email", e, t)
        }, authenticated: function () {
            return !!this._sessionToken && t.User.current() && t.User.current().id === this.id
        }
    }, {
        _currentUser: null,
        _currentUserMatchesDisk: !1,
        _CURRENT_USER_KEY: "currentUser",
        _authProviders: {},
        signUp: function (e, n, i, r) {
            i = i || {}, i.username = e, i.password = n;
            var s = t.Object._create("_User");
            return s.signUp(i, r)
        },
        logIn: function (e, n, i) {
            var r = t.Object._create("_User");
            return r._finishFetch({username: e, password: n}), r.logIn(i)
        },
        become: function (e, n) {
            n = n || {};
            var i = t.Object._create("_User");
            return t._request("users", "me", null, "GET", {
                useMasterKey: n.useMasterKey,
                session_token: e
            }).then(function (e, t, n) {
                var r = i.parse(e, t, n);
                return i._finishFetch(r), i._handleSaveResult(!0), i
            })._thenRunCallbacks(n, i)
        },
        logInWithMobilePhoneSmsCode: function (e, n, i) {
            var r = t.Object._create("_User");
            return r._finishFetch({mobilePhoneNumber: e, smsCode: n}), r.logIn(i)
        },
        signUpOrlogInWithMobilePhone: function (e, n, i, r) {
            i = i || {}, i.mobilePhoneNumber = e, i.smsCode = n;
            var s = t.Object._create("_User");
            return s.signUpOrlogInWithMobilePhone(i, r)
        },
        logInWithMobilePhone: function (e, n, i) {
            var r = t.Object._create("_User");
            return r._finishFetch({mobilePhoneNumber: e, password: n}), r.logIn(i)
        },
        logOut: function () {
            null !== t.User._currentUser && (t.User._currentUser._logOutWithAll(), t.User._currentUser._isCurrentUser = !1), t.User._currentUserMatchesDisk = !0, t.User._currentUser = null, t.localStorage.removeItem(t._getAVPath(t.User._CURRENT_USER_KEY))
        },
        followerQuery: function (e) {
            if (!e || !n.isString(e))throw"Invalid user object id.";
            var i = new t.FriendShipQuery("_Follower");
            return i._friendshipTag = "follower", i.equalTo("user", t.Object.createWithoutData("_User", e)), i
        },
        followeeQuery: function (e) {
            if (!e || !n.isString(e))throw"Invalid user object id.";
            var i = new t.FriendShipQuery("_Followee");
            return i._friendshipTag = "followee", i.equalTo("user", t.Object.createWithoutData("_User", e)), i
        },
        requestPasswordReset: function (e, n) {
            var i = {email: e}, r = t._request("requestPasswordReset", null, null, "POST", i);
            return r._thenRunCallbacks(n)
        },
        requestEmailVerify: function (e, n) {
            var i = {email: e}, r = t._request("requestEmailVerify", null, null, "POST", i);
            return r._thenRunCallbacks(n)
        },
        requestEmailVerfiy: function (e, n) {
            var i = {email: e}, r = t._request("requestEmailVerify", null, null, "POST", i);
            return r._thenRunCallbacks(n)
        },
        requestMobilePhoneVerify: function (e, n) {
            var i = {mobilePhoneNumber: e}, r = t._request("requestMobilePhoneVerify", null, null, "POST", i);
            return r._thenRunCallbacks(n)
        },
        requestPasswordResetBySmsCode: function (e, n) {
            var i = {mobilePhoneNumber: e}, r = t._request("requestPasswordResetBySmsCode", null, null, "POST", i);
            return r._thenRunCallbacks(n)
        },
        resetPasswordBySmsCode: function (e, n, i) {
            var r = {password: n}, s = t._request("resetPasswordBySmsCode", null, e, "PUT", r);
            return s._thenRunCallbacks(i)
        },
        verifyMobilePhone: function (e, n) {
            var i = t._request("verifyMobilePhone", null, e, "POST", null);
            return i._thenRunCallbacks(n)
        },
        requestLoginSmsCode: function (e, n) {
            var i = {mobilePhoneNumber: e}, r = t._request("requestLoginSmsCode", null, null, "POST", i);
            return r._thenRunCallbacks(n)
        },
        current: function () {
            if (t.User._currentUser)return t.User._currentUser;
            if (t.User._currentUserMatchesDisk)return t.User._currentUser;
            t.User._currentUserMatchesDisk = !0;
            var e = t.localStorage.getItem(t._getAVPath(t.User._CURRENT_USER_KEY));
            if (!e)return null;
            t.User._currentUser = t.Object._create("_User"), t.User._currentUser._isCurrentUser = !0;
            var n = JSON.parse(e);
            return t.User._currentUser.id = n._id, delete n._id, t.User._currentUser._sessionToken = n._sessionToken, delete n._sessionToken, t.User._currentUser._finishFetch(n), t.User._currentUser._synchronizeAllAuthData(), t.User._currentUser._refreshCache(), t.User._currentUser._opSetQueue = [{}], t.User._currentUser
        },
        _saveCurrentUser: function (e) {
            t.User._currentUser !== e && t.User.logOut(), e._isCurrentUser = !0, t.User._currentUser = e, t.User._currentUserMatchesDisk = !0;
            var n = e.toJSON();
            n._id = e.id, n._sessionToken = e._sessionToken, t.localStorage.setItem(t._getAVPath(t.User._CURRENT_USER_KEY), JSON.stringify(n))
        },
        _registerAuthenticationProvider: function (e) {
            t.User._authProviders[e.getAuthType()] = e, t.User.current() && t.User.current()._synchronizeAuthData(e.getAuthType())
        },
        _logInWith: function (e, n) {
            var i = t.Object._create("_User");
            return i._linkWith(e, n)
        }
    })
}(this), function (e) {
    e.AV = e.AV || {};
    var t = e.AV, n = t._;
    t.Query = function (e) {
        n.isString(e) && (e = t.Object._getSubclass(e)), this.objectClass = e, this.className = e.prototype.className, this._where = {}, this._include = [], this._limit = -1, this._skip = 0, this._extraOptions = {}
    }, t.Query.or = function () {
        var e = n.toArray(arguments), i = null;
        t._arrayEach(e, function (e) {
            if (n.isNull(i) && (i = e.className), i !== e.className)throw"All queries must be for the same class"
        });
        var r = new t.Query(i);
        return r._orQuery(e), r
    }, t.Query.and = function () {
        var e = n.toArray(arguments), i = null;
        t._arrayEach(e, function (e) {
            if (n.isNull(i) && (i = e.className), i !== e.className)throw"All queries must be for the same class"
        });
        var r = new t.Query(i);
        return r._andQuery(e), r
    }, t.Query.doCloudQuery = function (e, i, r) {
        var s = {cql: e};
        n.isArray(i) ? s.pvalues = i : r = i;
        var a = t._request("cloudQuery", null, null, "GET", s);
        return a.then(function (e) {
            var i = new t.Query(e.className), r = n.map(e.results, function (t) {
                var n = i._newObject(e);
                return n._finishFetch(i._processResult(t), !0), n
            });
            return {results: r, count: e.count, className: e.className}
        })._thenRunCallbacks(r)
    }, t.Query._extend = t._extend, t.Query.prototype = {
        _processResult: function (e) {
            return e
        }, get: function (e, n) {
            var i = this;
            return i.equalTo("objectId", e), i.first().then(function (e) {
                if (e)return e;
                var n = new t.Error(t.Error.OBJECT_NOT_FOUND, "Object not found.");
                return t.Promise.error(n)
            })._thenRunCallbacks(n, null)
        }, toJSON: function () {
            var e = {where: this._where};
            return this._include.length > 0 && (e.include = this._include.join(",")), this._select && (e.keys = this._select.join(",")), this._limit >= 0 && (e.limit = this._limit), this._skip > 0 && (e.skip = this._skip), void 0 !== this._order && (e.order = this._order), t._objectEach(this._extraOptions, function (t, n) {
                e[n] = t
            }), e
        }, _newObject: function (e) {
            var n;
            return n = e && e.className ? new t.Object(e.className) : new this.objectClass
        }, _createRequest: function (e) {
            return t._request("classes", this.className, null, "GET", e || this.toJSON())
        }, find: function (e) {
            var t = this, i = this._createRequest();
            return i.then(function (e) {
                return n.map(e.results, function (n) {
                    var i = t._newObject(e);
                    return i._finishFetch(t._processResult(n), !0), i
                })
            })._thenRunCallbacks(e)
        }, destroyAll: function (e) {
            var n = this;
            return n.find().then(function (e) {
                return t.Object.destroyAll(e)
            })._thenRunCallbacks(e)
        }, count: function (e) {
            var t = this.toJSON();
            t.limit = 0, t.count = 1;
            var n = this._createRequest(t);
            return n.then(function (e) {
                return e.count
            })._thenRunCallbacks(e)
        }, first: function (e) {
            var t = this, i = this.toJSON();
            i.limit = 1;
            var r = this._createRequest(i);
            return r.then(function (e) {
                return n.map(e.results, function (e) {
                    var n = t._newObject();
                    return n._finishFetch(t._processResult(e), !0), n
                })[0]
            })._thenRunCallbacks(e)
        }, collection: function (e, i) {
            return i = i || {}, new t.Collection(e, n.extend(i, {
                model: this._objectClass || this.objectClass,
                query: this
            }))
        }, skip: function (e) {
            return this._skip = e, this
        }, limit: function (e) {
            return this._limit = e, this
        }, equalTo: function (e, n) {
            return this._where[e] = t._encode(n), this
        }, _addCondition: function (e, n, i) {
            return this._where[e] || (this._where[e] = {}), this._where[e][n] = t._encode(i), this
        }, sizeEqualTo: function (e, t) {
            this._addCondition(e, "$size", t)
        }, notEqualTo: function (e, t) {
            return this._addCondition(e, "$ne", t), this
        }, lessThan: function (e, t) {
            return this._addCondition(e, "$lt", t), this
        }, greaterThan: function (e, t) {
            return this._addCondition(e, "$gt", t), this
        }, lessThanOrEqualTo: function (e, t) {
            return this._addCondition(e, "$lte", t), this
        }, greaterThanOrEqualTo: function (e, t) {
            return this._addCondition(e, "$gte", t), this
        }, containedIn: function (e, t) {
            return this._addCondition(e, "$in", t), this
        }, notContainedIn: function (e, t) {
            return this._addCondition(e, "$nin", t), this
        }, containsAll: function (e, t) {
            return this._addCondition(e, "$all", t), this
        }, exists: function (e) {
            return this._addCondition(e, "$exists", !0), this
        }, doesNotExist: function (e) {
            return this._addCondition(e, "$exists", !1), this
        }, matches: function (e, t, n) {
            return this._addCondition(e, "$regex", t), n || (n = ""), t.ignoreCase && (n += "i"), t.multiline && (n += "m"), n && n.length && this._addCondition(e, "$options", n), this
        }, matchesQuery: function (e, t) {
            var n = t.toJSON();
            return n.className = t.className, this._addCondition(e, "$inQuery", n), this
        }, doesNotMatchQuery: function (e, t) {
            var n = t.toJSON();
            return n.className = t.className, this._addCondition(e, "$notInQuery", n), this
        }, matchesKeyInQuery: function (e, t, n) {
            var i = n.toJSON();
            return i.className = n.className, this._addCondition(e, "$select", {key: t, query: i}), this
        }, doesNotMatchKeyInQuery: function (e, t, n) {
            var i = n.toJSON();
            return i.className = n.className, this._addCondition(e, "$dontSelect", {key: t, query: i}), this
        }, _orQuery: function (e) {
            var t = n.map(e, function (e) {
                return e.toJSON().where
            });
            return this._where.$or = t, this
        }, _andQuery: function (e) {
            var t = n.map(e, function (e) {
                return e.toJSON().where
            });
            return this._where.$and = t, this
        }, _quote: function (e) {
            return "\\Q" + e.replace("\\E", "\\E\\\\E\\Q") + "\\E"
        }, contains: function (e, t) {
            return this._addCondition(e, "$regex", this._quote(t)), this
        }, startsWith: function (e, t) {
            return this._addCondition(e, "$regex", "^" + this._quote(t)), this
        }, endsWith: function (e, t) {
            return this._addCondition(e, "$regex", this._quote(t) + "$"), this
        }, ascending: function (e) {
            return this._order = e, this
        }, addAscending: function (e) {
            return this._order ? this._order += "," + e : this._order = e, this
        }, descending: function (e) {
            return this._order = "-" + e, this
        }, addDescending: function (e) {
            return this._order ? this._order += ",-" + e : this._order = "-" + e, e
        }, near: function (e, n) {
            return n instanceof t.GeoPoint || (n = new t.GeoPoint(n)), this._addCondition(e, "$nearSphere", n), this
        }, withinRadians: function (e, t, n) {
            return this.near(e, t), this._addCondition(e, "$maxDistance", n), this
        }, withinMiles: function (e, t, n) {
            return this.withinRadians(e, t, n / 3958.8)
        }, withinKilometers: function (e, t, n) {
            return this.withinRadians(e, t, n / 6371)
        }, withinGeoBox: function (e, n, i) {
            return n instanceof t.GeoPoint || (n = new t.GeoPoint(n)), i instanceof t.GeoPoint || (i = new t.GeoPoint(i)), this._addCondition(e, "$within", {$box: [n, i]}), this
        }, include: function () {
            var e = this;
            return t._arrayEach(arguments, function (t) {
                n.isArray(t) ? e._include = e._include.concat(t) : e._include.push(t)
            }), this
        }, select: function () {
            var e = this;
            return this._select = this._select || [], t._arrayEach(arguments, function (t) {
                n.isArray(t) ? e._select = e._select.concat(t) : e._select.push(t)
            }), this
        }, each: function (e, i) {
            if (i = i || {}, this._order || this._skip || this._limit >= 0) {
                var r = "Cannot iterate on a query with sort, skip, or limit.";
                return t.Promise.error(r)._thenRunCallbacks(i)
            }
            var s = (new t.Promise, new t.Query(this.objectClass));
            s._limit = i.batchSize || 100, s._where = n.clone(this._where), s._include = n.clone(this._include), s.ascending("objectId");
            var a = !1;
            return t.Promise._continueWhile(function () {
                return !a
            }, function () {
                return s.find().then(function (n) {
                    var i = t.Promise.as();
                    return t._.each(n, function (t) {
                        i = i.then(function () {
                            return e(t)
                        })
                    }), i.then(function () {
                        n.length >= s._limit ? s.greaterThan("objectId", n[n.length - 1].id) : a = !0
                    })
                })
            })._thenRunCallbacks(i)
        }
    }, t.FriendShipQuery = t.Query._extend({
        _objectClass: t.User, _newObject: function () {
            return new t.User
        }, _processResult: function (e) {
            var t = e[this._friendshipTag];
            return "Pointer" === t.__type && "_User" === t.className && (delete t.__type, delete t.className), t
        }
    })
}(this), function (e) {
    e.AV = e.AV || {};
    var t = e.AV, n = t._;
    t.Cloud = t.Cloud || {}, n.extend(t.Cloud, {
        run: function (e, n, i) {
            var r = t._request("functions", e, null, "POST", t._encode(n, null, !0));
            return r.then(function (e) {
                return t._decode(null, e).result
            })._thenRunCallbacks(i)
        }, requestSmsCode: function (e, i) {
            if (n.isString(e) && (e = {mobilePhoneNumber: e}), !e.mobilePhoneNumber)throw"Missing mobilePhoneNumber.";
            var r = t._request("requestSmsCode", null, null, "POST", e);
            return r._thenRunCallbacks(i)
        }, verifySmsCode: function (e, n, i) {
            if (!e)throw"Missing sms code.";
            var r = {};
            t._.isString(n) ? r.mobilePhoneNumber = n : i = n;
            var s = t._request("verifySmsCode", e, null, "POST", r);
            return s._thenRunCallbacks(i)
        }
    })
}(this), function (e) {
    e.AV = e.AV || {};
    var t = e.AV;
    t.Installation = t.Object.extend("_Installation"), t.Push = t.Push || {}, t.Push.send = function (e, n) {
        if (e.where && (e.where = e.where.toJSON().where), e.where && e.cql)throw"Both where and cql can't be set";
        if (e.push_time && (e.push_time = e.push_time.toJSON()), e.expiration_time && (e.expiration_time = e.expiration_time.toJSON()), e.expiration_time && e.expiration_time_interval)throw"Both expiration_time and expiration_time_interval can't be set";
        var i = t._request("push", null, null, "POST", e);
        return i._thenRunCallbacks(n)
    }
}(this), function (e) {
    e.AV = e.AV || {};
    var t = e.AV, n = t._;
    t.Status = function (e, t) {
        return this.data = {}, this.inboxType = "default", this.query = null, e && "object" == typeof e ? this.data = e : (e && (this.data.image = e), t && (this.data.message = t)), this
    }, t.Status.prototype = {
        get: function (e) {
            return this.data[e]
        }, set: function (e, t) {
            return this.data[e] = t, this
        }, destroy: function (e) {
            if (!this.id)return t.Promise.error("The status id is not exists.")._thenRunCallbacks(e);
            var n = t._request("statuses", null, this.id, "DELETE");
            return n._thenRunCallbacks(e)
        }, toObject: function () {
            return this.id ? t.Object.createWithoutData("_Status", this.id) : null
        }, _getDataJSON: function () {
            var e = t._.clone(this.data);
            return t._encode(e)
        }, send: function (e) {
            if (!t.User.current())throw"Please signin an user.";
            if (!this.query)return t.Status.sendStatusToFollowers(this, e);
            var n = this.query.toJSON();
            n.className = this.query.className;
            var i = {};
            i.query = n, this.data = this.data || {};
            var r = t.Object.createWithoutData("_User", t.User.current().id)._toPointer();
            this.data.source = this.data.source || r, i.data = this._getDataJSON(), i.inboxType = this.inboxType || "default";
            var s = t._request("statuses", null, null, "POST", i), a = this;
            return s.then(function (e) {
                return a.id = e.objectId, a.createdAt = t._parseDate(e.createdAt), a
            })._thenRunCallbacks(e)
        }, _finishFetch: function (e) {
            this.id = e.objectId, this.createdAt = t._parseDate(e.createdAt), this.updatedAt = t._parseDate(e.updatedAt), this.messageId = e.messageId, delete e.messageId, delete e.objectId, delete e.createdAt, delete e.updatedAt, this.data = t._decode(void 0, e)
        }
    }, t.Status.sendStatusToFollowers = function (e, n) {
        if (!t.User.current())throw"Please signin an user.";
        var i = {};
        i.className = "_Follower", i.keys = "follower";
        var r = t.Object.createWithoutData("_User", t.User.current().id)._toPointer();
        i.where = {user: r};
        var s = {};
        s.query = i, e.data = e.data || {}, e.data.source = e.data.source || r, s.data = e._getDataJSON(), s.inboxType = e.inboxType || "default";
        var a = t._request("statuses", null, null, "POST", s);
        return a.then(function (n) {
            return e.id = n.objectId, e.createdAt = t._parseDate(n.createdAt), e
        })._thenRunCallbacks(n)
    }, t.Status.sendPrivateStatus = function (e, i, r) {
        if (!t.User.current())throw"Please signin an user.";
        if (!i)throw"Invalid target user.";
        var s = n.isString(i) ? i : i.id;
        if (!s)throw"Invalid target user.";
        var a = {};
        a.className = "_User";
        var o = t.Object.createWithoutData("_User", t.User.current().id)._toPointer();
        a.where = {objectId: s};
        var u = {};
        u.query = a, e.data = e.data || {}, e.data.source = e.data.source || o, u.data = e._getDataJSON(), u.inboxType = "private", e.inboxType = "private";
        var c = t._request("statuses", null, null, "POST", u);
        return c.then(function (n) {
            return e.id = n.objectId, e.createdAt = t._parseDate(n.createdAt), e
        })._thenRunCallbacks(r)
    }, t.Status.countUnreadStatuses = function (e) {
        if (!t.User.current() && null == e)throw"Please signin an user or pass the owner objectId.";
        e = e || t.User.current();
        var i = n.isString(arguments[1]) ? arguments[2] : arguments[1], r = n.isString(arguments[1]) ? arguments[1] : "default", s = {};
        s.inboxType = t._encode(r), s.owner = t._encode(e);
        var a = t._request("subscribe/statuses/count", null, null, "GET", s);
        return a._thenRunCallbacks(i)
    }, t.Status.statusQuery = function (e) {
        var n = new t.Query("_Status");
        return e && n.equalTo("source", e), n
    }, t.InboxQuery = t.Query._extend({
        _objectClass: t.Status,
        _sinceId: 0,
        _maxId: 0,
        _inboxType: "default",
        _owner: null,
        _newObject: function () {
            return new t.Status
        },
        _createRequest: function (e) {
            return t._request("subscribe/statuses", null, null, "GET", e || this.toJSON())
        },
        sinceId: function (e) {
            return this._sinceId = e, this
        },
        maxId: function (e) {
            return this._maxId = e, this
        },
        owner: function (e) {
            return this._owner = e, this
        },
        inboxType: function (e) {
            return this._inboxType = e, this
        },
        toJSON: function () {
            var e = t.InboxQuery.__super__.toJSON.call(this);
            return e.owner = t._encode(this._owner), e.inboxType = t._encode(this._inboxType), e.sinceId = t._encode(this._sinceId), e.maxId = t._encode(this._maxId), e
        }
    }), t.Status.inboxQuery = function (e, n) {
        var i = new t.InboxQuery(t.Status);
        return e && (i._owner = e), n && (i._inboxType = n), i
    }
}(this), function (e) {
    e.AV = e.AV || {};
    var t = e.AV, n = t._;
    t.SearchSortBuilder = function () {
        this._sortFields = []
    }, t.SearchSortBuilder.prototype = {
        _addField: function (e, t, n, i) {
            var r = {};
            return r[e] = {
                order: t || "asc",
                mode: n || "avg",
                missing: "_" + (i || "last")
            }, this._sortFields.push(r), this
        }, ascending: function (e, t, n) {
            return this._addField(e, "asc", t, n)
        }, descending: function (e, t, n) {
            return this._addField(e, "desc", t, n)
        }, whereNear: function (e, t, n) {
            n = n || {};
            var i = {}, r = {lat: t.latitude, lon: t.longitude}, s = {
                order: n.order || "asc",
                mode: n.mode || "avg",
                unit: n.unit || "km"
            };
            return s[e] = r, i._geo_distance = s, this._sortFields.push(i), this
        }, build: function () {
            return JSON.stringify(t._encode(this._sortFields))
        }
    }, t.SearchQuery = t.Query._extend({
        _sid: null,
        _hits: 0,
        _queryString: null,
        _highlights: null,
        _sortBuilder: null,
        _createRequest: function (e) {
            return t._request("search/select", null, null, "GET", e || this.toJSON())
        },
        sid: function (e) {
            return this._sid = e, this
        },
        queryString: function (e) {
            return this._queryString = e, this
        },
        highlights: function (e) {
            var t;
            return t = e && n.isString(e) ? arguments : e, this._highlights = t, this
        },
        sortBy: function (e) {
            return this._sortBuilder = e, this
        },
        hits: function () {
            return this._hits || (this._hits = 0), this._hits
        },
        _processResult: function (e) {
            return delete e.className, delete e._app_url, delete e._deeplink, e
        },
        find: function (e) {
            var t = this, i = this._createRequest();
            return i.then(function (e) {
                return e.sid && (t._oldSid = t._sid, t._sid = e.sid), t._hits = e.hits || 0, n.map(e.results, function (n) {
                    n.className && (e.className = n.className);
                    var i = t._newObject(e);
                    return i.appURL = n._app_url, i._finishFetch(t._processResult(n), !0), i
                })
            })._thenRunCallbacks(e)
        },
        toJSON: function () {
            var e = t.SearchQuery.__super__.toJSON.call(this);
            if (delete e.where, this.className && (e.clazz = this.className), this._sid && (e.sid = this._sid), !this._queryString)throw"Please set query string.";
            if (e.q = this._queryString, this._highlights && (e.highlights = this._highlights.join(",")), this._sortBuilder && e.order)throw"sort and order can not be set at same time.";
            return this._sortBuilder && (e.sort = this._sortBuilder.build()), e
        }
    })
}(this), function (e) {
    e.AV = e.AV || {};
    var t, n, i = e.AV, r = i._, s = !1, a = {
        authenticate: function (e) {
            var n = this;
            FB.login(function (t) {
                t.authResponse ? e.success && e.success(n, {
                    id: t.authResponse.userID,
                    access_token: t.authResponse.accessToken,
                    expiration_date: new Date(1e3 * t.authResponse.expiresIn + (new Date).getTime()).toJSON()
                }) : e.error && e.error(n, t)
            }, {scope: t})
        }, restoreAuthentication: function (e) {
            if (e) {
                var t = {
                    userID: e.id,
                    accessToken: e.access_token,
                    expiresIn: (i._parseDate(e.expiration_date).getTime() - (new Date).getTime()) / 1e3
                }, s = r.clone(n);
                s.authResponse = t, s.status = !1, FB.init(s)
            }
            return !0
        }, getAuthType: function () {
            return "facebook"
        }, deauthenticate: function () {
            this.restoreAuthentication(null), FB.logout()
        }
    };
    i.FacebookUtils = {
        init: function (e) {
            if ("undefined" == typeof FB)throw"The Facebook JavaScript SDK must be loaded before calling init.";
            if (n = r.clone(e) || {}, n.status && "undefined" != typeof console) {
                var t = console.warn || console.log || function () {
                    };
                t.call(console, "The 'status' flag passed into FB.init, when set to true, can interfere with AV Facebook integration, so it has been suppressed. Please call FB.getLoginStatus() explicitly if you require this behavior.")
            }
            n.status = !1, FB.init(n), i.User._registerAuthenticationProvider(a), s = !0
        }, isLinked: function (e) {
            return e._isLinked("facebook")
        }, logIn: function (e, n) {
            if (!e || r.isString(e)) {
                if (!s)throw"You must initialize FacebookUtils before calling logIn.";
                return t = e, i.User._logInWith("facebook", n)
            }
            var a = r.clone(n) || {};
            return a.authData = e, i.User._logInWith("facebook", a)
        }, link: function (e, n, i) {
            if (!n || r.isString(n)) {
                if (!s)throw"You must initialize FacebookUtils before calling link.";
                return t = n, e._linkWith("facebook", i)
            }
            var a = r.clone(i) || {};
            return a.authData = n, e._linkWith("facebook", a)
        }, unlink: function (e, t) {
            if (!s)throw"You must initialize FacebookUtils before calling unlink.";
            return e._unlinkFrom("facebook", t)
        }
    }
}(this), function (e) {
    e.AV = e.AV || {};
    var t = e.AV, n = t._;
    t.History = function () {
        this.handlers = [], n.bindAll(this, "checkUrl")
    };
    var i = /^[#\/]/, r = /msie [\w.]+/;
    t.History.started = !1, n.extend(t.History.prototype, t.Events, {
        interval: 50, getHash: function (e) {
            var t = e ? e.location : window.location, n = t.href.match(/#(.*)$/);
            return n ? n[1] : ""
        }, getFragment: function (e, n) {
            if (t._isNullOrUndefined(e))if (this._hasPushState || n) {
                e = window.location.pathname;
                var r = window.location.search;
                r && (e += r)
            } else e = this.getHash();
            return e.indexOf(this.options.root) || (e = e.substr(this.options.root.length)), e.replace(i, "")
        }, start: function (e) {
            if (t.History.started)throw new Error("AV.history has already been started");
            t.History.started = !0, this.options = n.extend({}, {root: "/"}, this.options, e), this._wantsHashChange = this.options.hashChange !== !1, this._wantsPushState = !!this.options.pushState, this._hasPushState = !!(this.options.pushState && window.history && window.history.pushState);
            var s = this.getFragment(), a = document.documentMode, o = r.exec(navigator.userAgent.toLowerCase()) && (!a || 7 >= a);
            o && (this.iframe = t.$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow, this.navigate(s)), this._hasPushState ? t.$(window).bind("popstate", this.checkUrl) : this._wantsHashChange && "onhashchange"in window && !o ? t.$(window).bind("hashchange", this.checkUrl) : this._wantsHashChange && (this._checkUrlInterval = window.setInterval(this.checkUrl, this.interval)), this.fragment = s;
            var u = window.location, c = u.pathname === this.options.root;
            return this._wantsHashChange && this._wantsPushState && !this._hasPushState && !c ? (this.fragment = this.getFragment(null, !0), window.location.replace(this.options.root + "#" + this.fragment), !0) : (this._wantsPushState && this._hasPushState && c && u.hash && (this.fragment = this.getHash().replace(i, ""), window.history.replaceState({}, document.title, u.protocol + "//" + u.host + this.options.root + this.fragment)), this.options.silent ? void 0 : this.loadUrl())
        }, stop: function () {
            t.$(window).unbind("popstate", this.checkUrl).unbind("hashchange", this.checkUrl), window.clearInterval(this._checkUrlInterval), t.History.started = !1
        }, route: function (e, t) {
            this.handlers.unshift({route: e, callback: t})
        }, checkUrl: function () {
            var e = this.getFragment();
            return e === this.fragment && this.iframe && (e = this.getFragment(this.getHash(this.iframe))), e === this.fragment ? !1 : (this.iframe && this.navigate(e), void(this.loadUrl() || this.loadUrl(this.getHash())))
        }, loadUrl: function (e) {
            var t = this.fragment = this.getFragment(e), i = n.any(this.handlers, function (e) {
                return e.route.test(t) ? (e.callback(t), !0) : void 0
            });
            return i
        }, navigate: function (e, n) {
            if (!t.History.started)return !1;
            n && n !== !0 || (n = {trigger: n});
            var r = (e || "").replace(i, "");
            if (this.fragment !== r) {
                if (this._hasPushState) {
                    0 !== r.indexOf(this.options.root) && (r = this.options.root + r), this.fragment = r;
                    var s = n.replace ? "replaceState" : "pushState";
                    window.history[s]({}, document.title, r)
                } else this._wantsHashChange ? (this.fragment = r, this._updateHash(window.location, r, n.replace), this.iframe && r !== this.getFragment(this.getHash(this.iframe)) && (n.replace || this.iframe.document.open().close(), this._updateHash(this.iframe.location, r, n.replace))) : window.location.assign(this.options.root + e);
                n.trigger && this.loadUrl(e)
            }
        }, _updateHash: function (e, t, n) {
            if (n) {
                var i = e.toString().replace(/(javascript:|#).*$/, "");
                e.replace(i + "#" + t)
            } else e.hash = t
        }
    })
}(this), function (e) {
    e.AV = e.AV || {};
    var t = e.AV, n = t._;
    t.Router = function (e) {
        e = e || {}, e.routes && (this.routes = e.routes), this._bindRoutes(), this.initialize.apply(this, arguments)
    };
    var i = /:\w+/g, r = /\*\w+/g, s = /[\-\[\]{}()+?.,\\\^\$\|#\s]/g;
    n.extend(t.Router.prototype, t.Events, {
        initialize: function () {
        }, route: function (e, i, r) {
            return t.history = t.history || new t.History, n.isRegExp(e) || (e = this._routeToRegExp(e)), r || (r = this[i]), t.history.route(e, n.bind(function (n) {
                var s = this._extractParameters(e, n);
                r && r.apply(this, s), this.trigger.apply(this, ["route:" + i].concat(s)), t.history.trigger("route", this, i, s)
            }, this)), this
        }, navigate: function (e, n) {
            t.history.navigate(e, n)
        }, _bindRoutes: function () {
            if (this.routes) {
                var e = [];
                for (var t in this.routes)this.routes.hasOwnProperty(t) && e.unshift([t, this.routes[t]]);
                for (var n = 0, i = e.length; i > n; n++)this.route(e[n][0], e[n][1], this[e[n][1]])
            }
        }, _routeToRegExp: function (e) {
            return e = e.replace(s, "\\$&").replace(i, "([^/]+)").replace(r, "(.*?)"), new RegExp("^" + e + "$")
        }, _extractParameters: function (e, t) {
            return e.exec(t).slice(1)
        }
    }), t.Router.extend = t._extend
}(this), function (e) {
    e.AV = e.AV || {};
    var t = e.AV, n = t._;
    t.Collection = function (e, t) {
        t = t || {}, t.comparator && (this.comparator = t.comparator), t.model && (this.model = t.model), t.query && (this.query = t.query), this._reset(), this.initialize.apply(this, arguments), e && this.reset(e, {
            silent: !0,
            parse: t.parse
        })
    }, n.extend(t.Collection.prototype, t.Events, {
        model: t.Object, initialize: function () {
        }, toJSON: function () {
            return this.map(function (e) {
                return e.toJSON()
            })
        }, add: function (e, i) {
            var r, s, a, o, u, c, l = {}, h = {};
            for (i = i || {}, e = n.isArray(e) ? e.slice() : [e], r = 0, a = e.length; a > r; r++) {
                if (e[r] = this._prepareModel(e[r], i), o = e[r], !o)throw new Error("Can't add an invalid model to a collection");
                if (u = o.cid, l[u] || this._byCid[u])throw new Error("Duplicate cid: can't add the same model to a collection twice");
                if (c = o.id, !t._isNullOrUndefined(c) && (h[c] || this._byId[c]))throw new Error("Duplicate id: can't add the same model to a collection twice");
                h[c] = o, l[u] = o
            }
            for (r = 0; a > r; r++)(o = e[r]).on("all", this._onModelEvent, this), this._byCid[o.cid] = o, o.id && (this._byId[o.id] = o);
            if (this.length += a, s = t._isNullOrUndefined(i.at) ? this.models.length : i.at, this.models.splice.apply(this.models, [s, 0].concat(e)), this.comparator && this.sort({silent: !0}), i.silent)return this;
            for (r = 0, a = this.models.length; a > r; r++)o = this.models[r], l[o.cid] && (i.index = r, o.trigger("add", o, this, i));
            return this
        }, remove: function (e, t) {
            var i, r, s, a;
            for (t = t || {}, e = n.isArray(e) ? e.slice() : [e], i = 0, r = e.length; r > i; i++)a = this.getByCid(e[i]) || this.get(e[i]), a && (delete this._byId[a.id], delete this._byCid[a.cid], s = this.indexOf(a), this.models.splice(s, 1), this.length--, t.silent || (t.index = s, a.trigger("remove", a, this, t)), this._removeReference(a));
            return this
        }, get: function (e) {
            return e && this._byId[e.id || e]
        }, getByCid: function (e) {
            return e && this._byCid[e.cid || e]
        }, at: function (e) {
            return this.models[e]
        }, sort: function (e) {
            if (e = e || {}, !this.comparator)throw new Error("Cannot sort a set without a comparator");
            var t = n.bind(this.comparator, this);
            return 1 === this.comparator.length ? this.models = this.sortBy(t) : this.models.sort(t), e.silent || this.trigger("reset", this, e), this
        }, pluck: function (e) {
            return n.map(this.models, function (t) {
                return t.get(e)
            })
        }, reset: function (e, n) {
            var i = this;
            return e = e || [], n = n || {}, t._arrayEach(this.models, function (e) {
                i._removeReference(e)
            }), this._reset(), this.add(e, {
                silent: !0,
                parse: n.parse
            }), n.silent || this.trigger("reset", this, n), this
        }, fetch: function (e) {
            e = n.clone(e) || {}, void 0 === e.parse && (e.parse = !0);
            var i = this, r = this.query || new t.Query(this.model);
            return r.find().then(function (t) {
                return e.add ? i.add(t, e) : i.reset(t, e), i
            })._thenRunCallbacks(e, this)
        }, create: function (e, t) {
            var i = this;
            if (t = t ? n.clone(t) : {}, e = this._prepareModel(e, t), !e)return !1;
            t.wait || i.add(e, t);
            var r = t.success;
            return t.success = function (n, s) {
                t.wait && i.add(n, t), r ? r(n, s) : n.trigger("sync", e, s, t)
            }, e.save(null, t), e
        }, parse: function (e) {
            return e
        }, chain: function () {
            return n(this.models).chain()
        }, _reset: function () {
            this.length = 0, this.models = [], this._byId = {}, this._byCid = {}
        }, _prepareModel: function (e, n) {
            if (e instanceof t.Object)e.collection || (e.collection = this); else {
                var i = e;
                n.collection = this, e = new this.model(i, n), e._validate(e.attributes, n) || (e = !1)
            }
            return e
        }, _removeReference: function (e) {
            this === e.collection && delete e.collection, e.off("all", this._onModelEvent, this)
        }, _onModelEvent: function (e, t, n, i) {
            ("add" !== e && "remove" !== e || n === this) && ("destroy" === e && this.remove(t, i), t && "change:objectId" === e && (delete this._byId[t.previous("objectId")], this._byId[t.id] = t), this.trigger.apply(this, arguments))
        }
    });
    var i = ["forEach", "each", "map", "reduce", "reduceRight", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "max", "min", "sortBy", "sortedIndex", "toArray", "size", "first", "initial", "rest", "last", "without", "indexOf", "shuffle", "lastIndexOf", "isEmpty", "groupBy"];
    t._arrayEach(i, function (e) {
        t.Collection.prototype[e] = function () {
            return n[e].apply(n, [this.models].concat(n.toArray(arguments)))
        }
    }), t.Collection.extend = t._extend
}(this), function (e) {
    e.AV = e.AV || {};
    var t = e.AV, n = t._;
    t.View = function (e) {
        this.cid = n.uniqueId("view"), this._configure(e || {}), this._ensureElement(), this.initialize.apply(this, arguments), this.delegateEvents()
    };
    var i = /^(\S+)\s*(.*)$/, r = ["model", "collection", "el", "id", "attributes", "className", "tagName"];
    n.extend(t.View.prototype, t.Events, {
        tagName: "div", $: function (e) {
            return this.$el.find(e)
        }, initialize: function () {
        }, render: function () {
            return this
        }, remove: function () {
            return this.$el.remove(), this
        }, make: function (e, n, i) {
            var r = document.createElement(e);
            return n && t.$(r).attr(n), i && t.$(r).html(i), r
        }, setElement: function (e, n) {
            return this.$el = t.$(e), this.el = this.$el[0], n !== !1 && this.delegateEvents(), this
        }, delegateEvents: function (e) {
            if (e = e || t._getValue(this, "events")) {
                this.undelegateEvents();
                var r = this;
                t._objectEach(e, function (t, s) {
                    if (n.isFunction(t) || (t = r[e[s]]), !t)throw new Error('Event "' + e[s] + '" does not exist');
                    var a = s.match(i), o = a[1], u = a[2];
                    t = n.bind(t, r), o += ".delegateEvents" + r.cid, "" === u ? r.$el.bind(o, t) : r.$el.delegate(u, o, t)
                })
            }
        }, undelegateEvents: function () {
            this.$el.unbind(".delegateEvents" + this.cid)
        }, _configure: function (e) {
            this.options && (e = n.extend({}, this.options, e));
            var t = this;
            n.each(r, function (n) {
                e[n] && (t[n] = e[n])
            }), this.options = e
        }, _ensureElement: function () {
            if (this.el)this.setElement(this.el, !1); else {
                var e = t._getValue(this, "attributes") || {};
                this.id && (e.id = this.id), this.className && (e["class"] = this.className), this.setElement(this.make(this.tagName, e), !1)
            }
        }
    }), t.View.extend = t._extend
}(this);