(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = global.document ? factory(global, true) : function(w) {
            if (!w.document) {
                throw new Error("jQuery requires a window with a document");
            }
            return factory(w);
        };
    } else {
        factory(global);
    }
})(typeof window !== "undefined" ? window : this, function(window, noGlobal) {
    var deletedIds = [];
    var slice = deletedIds.slice;
    var concat = deletedIds.concat;
    var push = deletedIds.push;
    var indexOf = deletedIds.indexOf;
    var class2type = {};
    var toString = class2type.toString;
    var hasOwn = class2type.hasOwnProperty;
    var support = {};
    var version = "1.11.1", jQuery = function(selector, context) {
        return new jQuery.fn.init(selector, context);
    }, rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, rmsPrefix = /^-ms-/, rdashAlpha = /-([\da-z])/gi, fcamelCase = function(all, letter) {
        return letter.toUpperCase();
    };
    jQuery.fn = jQuery.prototype = {
        jquery: version,
        constructor: jQuery,
        selector: "",
        length: 0,
        toArray: function() {
            return slice.call(this);
        },
        get: function(num) {
            return num != null ? num < 0 ? this[num + this.length] : this[num] : slice.call(this);
        },
        pushStack: function(elems) {
            var ret = jQuery.merge(this.constructor(), elems);
            ret.prevObject = this;
            ret.context = this.context;
            return ret;
        },
        each: function(callback, args) {
            return jQuery.each(this, callback, args);
        },
        map: function(callback) {
            return this.pushStack(jQuery.map(this, function(elem, i) {
                return callback.call(elem, i, elem);
            }));
        },
        slice: function() {
            return this.pushStack(slice.apply(this, arguments));
        },
        first: function() {
            return this.eq(0);
        },
        last: function() {
            return this.eq(-1);
        },
        eq: function(i) {
            var len = this.length, j = +i + (i < 0 ? len : 0);
            return this.pushStack(j >= 0 && j < len ? [ this[j] ] : []);
        },
        end: function() {
            return this.prevObject || this.constructor(null);
        },
        push: push,
        sort: deletedIds.sort,
        splice: deletedIds.splice
    };
    jQuery.extend = jQuery.fn.extend = function() {
        var src, copyIsArray, copy, name, options, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;
        if (typeof target === "boolean") {
            deep = target;
            target = arguments[i] || {};
            i++;
        }
        if (typeof target !== "object" && !jQuery.isFunction(target)) {
            target = {};
        }
        if (i === length) {
            target = this;
            i--;
        }
        for (;i < length; i++) {
            if ((options = arguments[i]) != null) {
                for (name in options) {
                    src = target[name];
                    copy = options[name];
                    if (target === copy) {
                        continue;
                    }
                    if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && jQuery.isArray(src) ? src : [];
                        } else {
                            clone = src && jQuery.isPlainObject(src) ? src : {};
                        }
                        target[name] = jQuery.extend(deep, clone, copy);
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }
        return target;
    };
    jQuery.extend({
        expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
        isReady: true,
        error: function(msg) {
            throw new Error(msg);
        },
        noop: function() {},
        isFunction: function(obj) {
            return jQuery.type(obj) === "function";
        },
        isArray: Array.isArray || function(obj) {
            return jQuery.type(obj) === "array";
        },
        isWindow: function(obj) {
            return obj != null && obj == obj.window;
        },
        isNumeric: function(obj) {
            return !jQuery.isArray(obj) && obj - parseFloat(obj) >= 0;
        },
        isEmptyObject: function(obj) {
            var name;
            for (name in obj) {
                return false;
            }
            return true;
        },
        isPlainObject: function(obj) {
            var key;
            if (!obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj)) {
                return false;
            }
            try {
                if (obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
                    return false;
                }
            } catch (e) {
                return false;
            }
            if (support.ownLast) {
                for (key in obj) {
                    return hasOwn.call(obj, key);
                }
            }
            for (key in obj) {}
            return key === undefined || hasOwn.call(obj, key);
        },
        type: function(obj) {
            if (obj == null) {
                return obj + "";
            }
            return typeof obj === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj;
        },
        globalEval: function(data) {
            if (data && jQuery.trim(data)) {
                (window.execScript || function(data) {
                    window["eval"].call(window, data);
                })(data);
            }
        },
        camelCase: function(string) {
            return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
        },
        nodeName: function(elem, name) {
            return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
        },
        each: function(obj, callback, args) {
            var value, i = 0, length = obj.length, isArray = isArraylike(obj);
            if (args) {
                if (isArray) {
                    for (;i < length; i++) {
                        value = callback.apply(obj[i], args);
                        if (value === false) {
                            break;
                        }
                    }
                } else {
                    for (i in obj) {
                        value = callback.apply(obj[i], args);
                        if (value === false) {
                            break;
                        }
                    }
                }
            } else {
                if (isArray) {
                    for (;i < length; i++) {
                        value = callback.call(obj[i], i, obj[i]);
                        if (value === false) {
                            break;
                        }
                    }
                } else {
                    for (i in obj) {
                        value = callback.call(obj[i], i, obj[i]);
                        if (value === false) {
                            break;
                        }
                    }
                }
            }
            return obj;
        },
        trim: function(text) {
            return text == null ? "" : (text + "").replace(rtrim, "");
        },
        makeArray: function(arr, results) {
            var ret = results || [];
            if (arr != null) {
                if (isArraylike(Object(arr))) {
                    jQuery.merge(ret, typeof arr === "string" ? [ arr ] : arr);
                } else {
                    push.call(ret, arr);
                }
            }
            return ret;
        },
        inArray: function(elem, arr, i) {
            var len;
            if (arr) {
                if (indexOf) {
                    return indexOf.call(arr, elem, i);
                }
                len = arr.length;
                i = i ? i < 0 ? Math.max(0, len + i) : i : 0;
                for (;i < len; i++) {
                    if (i in arr && arr[i] === elem) {
                        return i;
                    }
                }
            }
            return -1;
        },
        merge: function(first, second) {
            var len = +second.length, j = 0, i = first.length;
            while (j < len) {
                first[i++] = second[j++];
            }
            if (len !== len) {
                while (second[j] !== undefined) {
                    first[i++] = second[j++];
                }
            }
            first.length = i;
            return first;
        },
        grep: function(elems, callback, invert) {
            var callbackInverse, matches = [], i = 0, length = elems.length, callbackExpect = !invert;
            for (;i < length; i++) {
                callbackInverse = !callback(elems[i], i);
                if (callbackInverse !== callbackExpect) {
                    matches.push(elems[i]);
                }
            }
            return matches;
        },
        map: function(elems, callback, arg) {
            var value, i = 0, length = elems.length, isArray = isArraylike(elems), ret = [];
            if (isArray) {
                for (;i < length; i++) {
                    value = callback(elems[i], i, arg);
                    if (value != null) {
                        ret.push(value);
                    }
                }
            } else {
                for (i in elems) {
                    value = callback(elems[i], i, arg);
                    if (value != null) {
                        ret.push(value);
                    }
                }
            }
            return concat.apply([], ret);
        },
        guid: 1,
        proxy: function(fn, context) {
            var args, proxy, tmp;
            if (typeof context === "string") {
                tmp = fn[context];
                context = fn;
                fn = tmp;
            }
            if (!jQuery.isFunction(fn)) {
                return undefined;
            }
            args = slice.call(arguments, 2);
            proxy = function() {
                return fn.apply(context || this, args.concat(slice.call(arguments)));
            };
            proxy.guid = fn.guid = fn.guid || jQuery.guid++;
            return proxy;
        },
        now: function() {
            return +new Date();
        },
        support: support
    });
    jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
        class2type["[object " + name + "]"] = name.toLowerCase();
    });
    function isArraylike(obj) {
        var length = obj.length, type = jQuery.type(obj);
        if (type === "function" || jQuery.isWindow(obj)) {
            return false;
        }
        if (obj.nodeType === 1 && length) {
            return true;
        }
        return type === "array" || length === 0 || typeof length === "number" && length > 0 && length - 1 in obj;
    }
    var Sizzle = function(window) {
        var i, support, Expr, getText, isXML, tokenize, compile, select, outermostContext, sortInput, hasDuplicate, setDocument, document, docElem, documentIsHTML, rbuggyQSA, rbuggyMatches, matches, contains, expando = "sizzle" + -new Date(), preferredDoc = window.document, dirruns = 0, done = 0, classCache = createCache(), tokenCache = createCache(), compilerCache = createCache(), sortOrder = function(a, b) {
            if (a === b) {
                hasDuplicate = true;
            }
            return 0;
        }, strundefined = typeof undefined, MAX_NEGATIVE = 1 << 31, hasOwn = {}.hasOwnProperty, arr = [], pop = arr.pop, push_native = arr.push, push = arr.push, slice = arr.slice, indexOf = arr.indexOf || function(elem) {
            var i = 0, len = this.length;
            for (;i < len; i++) {
                if (this[i] === elem) {
                    return i;
                }
            }
            return -1;
        }, booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", whitespace = "[\\x20\\t\\r\\n\\f]", characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", identifier = characterEncoding.replace("w", "w#"), attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace + "*([*^$|!~]?=)" + whitespace + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + "*\\]", pseudos = ":(" + characterEncoding + ")(?:\\((" + "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" + "((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" + ".*" + ")\\)|)", rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"), rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"), rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"), rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"), rpseudo = new RegExp(pseudos), ridentifier = new RegExp("^" + identifier + "$"), matchExpr = {
            ID: new RegExp("^#(" + characterEncoding + ")"),
            CLASS: new RegExp("^\\.(" + characterEncoding + ")"),
            TAG: new RegExp("^(" + characterEncoding.replace("w", "w*") + ")"),
            ATTR: new RegExp("^" + attributes),
            PSEUDO: new RegExp("^" + pseudos),
            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
            bool: new RegExp("^(?:" + booleans + ")$", "i"),
            needsContext: new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
        }, rinputs = /^(?:input|select|textarea|button)$/i, rheader = /^h\d$/i, rnative = /^[^{]+\{\s*\[native \w/, rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, rsibling = /[+~]/, rescape = /'|\\/g, runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"), funescape = function(_, escaped, escapedWhitespace) {
            var high = "0x" + escaped - 65536;
            return high !== high || escapedWhitespace ? escaped : high < 0 ? String.fromCharCode(high + 65536) : String.fromCharCode(high >> 10 | 55296, high & 1023 | 56320);
        };
        try {
            push.apply(arr = slice.call(preferredDoc.childNodes), preferredDoc.childNodes);
            arr[preferredDoc.childNodes.length].nodeType;
        } catch (e) {
            push = {
                apply: arr.length ? function(target, els) {
                    push_native.apply(target, slice.call(els));
                } : function(target, els) {
                    var j = target.length, i = 0;
                    while (target[j++] = els[i++]) {}
                    target.length = j - 1;
                }
            };
        }
        function Sizzle(selector, context, results, seed) {
            var match, elem, m, nodeType, i, groups, old, nid, newContext, newSelector;
            if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
                setDocument(context);
            }
            context = context || document;
            results = results || [];
            if (!selector || typeof selector !== "string") {
                return results;
            }
            if ((nodeType = context.nodeType) !== 1 && nodeType !== 9) {
                return [];
            }
            if (documentIsHTML && !seed) {
                if (match = rquickExpr.exec(selector)) {
                    if (m = match[1]) {
                        if (nodeType === 9) {
                            elem = context.getElementById(m);
                            if (elem && elem.parentNode) {
                                if (elem.id === m) {
                                    results.push(elem);
                                    return results;
                                }
                            } else {
                                return results;
                            }
                        } else {
                            if (context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) && contains(context, elem) && elem.id === m) {
                                results.push(elem);
                                return results;
                            }
                        }
                    } else if (match[2]) {
                        push.apply(results, context.getElementsByTagName(selector));
                        return results;
                    } else if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) {
                        push.apply(results, context.getElementsByClassName(m));
                        return results;
                    }
                }
                if (support.qsa && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
                    nid = old = expando;
                    newContext = context;
                    newSelector = nodeType === 9 && selector;
                    if (nodeType === 1 && context.nodeName.toLowerCase() !== "object") {
                        groups = tokenize(selector);
                        if (old = context.getAttribute("id")) {
                            nid = old.replace(rescape, "\\$&");
                        } else {
                            context.setAttribute("id", nid);
                        }
                        nid = "[id='" + nid + "'] ";
                        i = groups.length;
                        while (i--) {
                            groups[i] = nid + toSelector(groups[i]);
                        }
                        newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
                        newSelector = groups.join(",");
                    }
                    if (newSelector) {
                        try {
                            push.apply(results, newContext.querySelectorAll(newSelector));
                            return results;
                        } catch (qsaError) {} finally {
                            if (!old) {
                                context.removeAttribute("id");
                            }
                        }
                    }
                }
            }
            return select(selector.replace(rtrim, "$1"), context, results, seed);
        }
        function createCache() {
            var keys = [];
            function cache(key, value) {
                if (keys.push(key + " ") > Expr.cacheLength) {
                    delete cache[keys.shift()];
                }
                return cache[key + " "] = value;
            }
            return cache;
        }
        function markFunction(fn) {
            fn[expando] = true;
            return fn;
        }
        function assert(fn) {
            var div = document.createElement("div");
            try {
                return !!fn(div);
            } catch (e) {
                return false;
            } finally {
                if (div.parentNode) {
                    div.parentNode.removeChild(div);
                }
                div = null;
            }
        }
        function addHandle(attrs, handler) {
            var arr = attrs.split("|"), i = attrs.length;
            while (i--) {
                Expr.attrHandle[arr[i]] = handler;
            }
        }
        function siblingCheck(a, b) {
            var cur = b && a, diff = cur && a.nodeType === 1 && b.nodeType === 1 && (~b.sourceIndex || MAX_NEGATIVE) - (~a.sourceIndex || MAX_NEGATIVE);
            if (diff) {
                return diff;
            }
            if (cur) {
                while (cur = cur.nextSibling) {
                    if (cur === b) {
                        return -1;
                    }
                }
            }
            return a ? 1 : -1;
        }
        function createInputPseudo(type) {
            return function(elem) {
                var name = elem.nodeName.toLowerCase();
                return name === "input" && elem.type === type;
            };
        }
        function createButtonPseudo(type) {
            return function(elem) {
                var name = elem.nodeName.toLowerCase();
                return (name === "input" || name === "button") && elem.type === type;
            };
        }
        function createPositionalPseudo(fn) {
            return markFunction(function(argument) {
                argument = +argument;
                return markFunction(function(seed, matches) {
                    var j, matchIndexes = fn([], seed.length, argument), i = matchIndexes.length;
                    while (i--) {
                        if (seed[j = matchIndexes[i]]) {
                            seed[j] = !(matches[j] = seed[j]);
                        }
                    }
                });
            });
        }
        function testContext(context) {
            return context && typeof context.getElementsByTagName !== strundefined && context;
        }
        support = Sizzle.support = {};
        isXML = Sizzle.isXML = function(elem) {
            var documentElement = elem && (elem.ownerDocument || elem).documentElement;
            return documentElement ? documentElement.nodeName !== "HTML" : false;
        };
        setDocument = Sizzle.setDocument = function(node) {
            var hasCompare, doc = node ? node.ownerDocument || node : preferredDoc, parent = doc.defaultView;
            if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
                return document;
            }
            document = doc;
            docElem = doc.documentElement;
            documentIsHTML = !isXML(doc);
            if (parent && parent !== parent.top) {
                if (parent.addEventListener) {
                    parent.addEventListener("unload", function() {
                        setDocument();
                    }, false);
                } else if (parent.attachEvent) {
                    parent.attachEvent("onunload", function() {
                        setDocument();
                    });
                }
            }
            support.attributes = assert(function(div) {
                div.className = "i";
                return !div.getAttribute("className");
            });
            support.getElementsByTagName = assert(function(div) {
                div.appendChild(doc.createComment(""));
                return !div.getElementsByTagName("*").length;
            });
            support.getElementsByClassName = rnative.test(doc.getElementsByClassName) && assert(function(div) {
                div.innerHTML = "<div class='a'></div><div class='a i'></div>";
                div.firstChild.className = "i";
                return div.getElementsByClassName("i").length === 2;
            });
            support.getById = assert(function(div) {
                docElem.appendChild(div).id = expando;
                return !doc.getElementsByName || !doc.getElementsByName(expando).length;
            });
            if (support.getById) {
                Expr.find["ID"] = function(id, context) {
                    if (typeof context.getElementById !== strundefined && documentIsHTML) {
                        var m = context.getElementById(id);
                        return m && m.parentNode ? [ m ] : [];
                    }
                };
                Expr.filter["ID"] = function(id) {
                    var attrId = id.replace(runescape, funescape);
                    return function(elem) {
                        return elem.getAttribute("id") === attrId;
                    };
                };
            } else {
                delete Expr.find["ID"];
                Expr.filter["ID"] = function(id) {
                    var attrId = id.replace(runescape, funescape);
                    return function(elem) {
                        var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
                        return node && node.value === attrId;
                    };
                };
            }
            Expr.find["TAG"] = support.getElementsByTagName ? function(tag, context) {
                if (typeof context.getElementsByTagName !== strundefined) {
                    return context.getElementsByTagName(tag);
                }
            } : function(tag, context) {
                var elem, tmp = [], i = 0, results = context.getElementsByTagName(tag);
                if (tag === "*") {
                    while (elem = results[i++]) {
                        if (elem.nodeType === 1) {
                            tmp.push(elem);
                        }
                    }
                    return tmp;
                }
                return results;
            };
            Expr.find["CLASS"] = support.getElementsByClassName && function(className, context) {
                if (typeof context.getElementsByClassName !== strundefined && documentIsHTML) {
                    return context.getElementsByClassName(className);
                }
            };
            rbuggyMatches = [];
            rbuggyQSA = [];
            if (support.qsa = rnative.test(doc.querySelectorAll)) {
                assert(function(div) {
                    div.innerHTML = "<select msallowclip=''><option selected=''></option></select>";
                    if (div.querySelectorAll("[msallowclip^='']").length) {
                        rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");
                    }
                    if (!div.querySelectorAll("[selected]").length) {
                        rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
                    }
                    if (!div.querySelectorAll(":checked").length) {
                        rbuggyQSA.push(":checked");
                    }
                });
                assert(function(div) {
                    var input = doc.createElement("input");
                    input.setAttribute("type", "hidden");
                    div.appendChild(input).setAttribute("name", "D");
                    if (div.querySelectorAll("[name=d]").length) {
                        rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=");
                    }
                    if (!div.querySelectorAll(":enabled").length) {
                        rbuggyQSA.push(":enabled", ":disabled");
                    }
                    div.querySelectorAll("*,:x");
                    rbuggyQSA.push(",.*:");
                });
            }
            if (support.matchesSelector = rnative.test(matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) {
                assert(function(div) {
                    support.disconnectedMatch = matches.call(div, "div");
                    matches.call(div, "[s!='']:x");
                    rbuggyMatches.push("!=", pseudos);
                });
            }
            rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
            rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));
            hasCompare = rnative.test(docElem.compareDocumentPosition);
            contains = hasCompare || rnative.test(docElem.contains) ? function(a, b) {
                var adown = a.nodeType === 9 ? a.documentElement : a, bup = b && b.parentNode;
                return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
            } : function(a, b) {
                if (b) {
                    while (b = b.parentNode) {
                        if (b === a) {
                            return true;
                        }
                    }
                }
                return false;
            };
            sortOrder = hasCompare ? function(a, b) {
                if (a === b) {
                    hasDuplicate = true;
                    return 0;
                }
                var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
                if (compare) {
                    return compare;
                }
                compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1;
                if (compare & 1 || !support.sortDetached && b.compareDocumentPosition(a) === compare) {
                    if (a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a)) {
                        return -1;
                    }
                    if (b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b)) {
                        return 1;
                    }
                    return sortInput ? indexOf.call(sortInput, a) - indexOf.call(sortInput, b) : 0;
                }
                return compare & 4 ? -1 : 1;
            } : function(a, b) {
                if (a === b) {
                    hasDuplicate = true;
                    return 0;
                }
                var cur, i = 0, aup = a.parentNode, bup = b.parentNode, ap = [ a ], bp = [ b ];
                if (!aup || !bup) {
                    return a === doc ? -1 : b === doc ? 1 : aup ? -1 : bup ? 1 : sortInput ? indexOf.call(sortInput, a) - indexOf.call(sortInput, b) : 0;
                } else if (aup === bup) {
                    return siblingCheck(a, b);
                }
                cur = a;
                while (cur = cur.parentNode) {
                    ap.unshift(cur);
                }
                cur = b;
                while (cur = cur.parentNode) {
                    bp.unshift(cur);
                }
                while (ap[i] === bp[i]) {
                    i++;
                }
                return i ? siblingCheck(ap[i], bp[i]) : ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0;
            };
            return doc;
        };
        Sizzle.matches = function(expr, elements) {
            return Sizzle(expr, null, null, elements);
        };
        Sizzle.matchesSelector = function(elem, expr) {
            if ((elem.ownerDocument || elem) !== document) {
                setDocument(elem);
            }
            expr = expr.replace(rattributeQuotes, "='$1']");
            if (support.matchesSelector && documentIsHTML && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) {
                try {
                    var ret = matches.call(elem, expr);
                    if (ret || support.disconnectedMatch || elem.document && elem.document.nodeType !== 11) {
                        return ret;
                    }
                } catch (e) {}
            }
            return Sizzle(expr, document, null, [ elem ]).length > 0;
        };
        Sizzle.contains = function(context, elem) {
            if ((context.ownerDocument || context) !== document) {
                setDocument(context);
            }
            return contains(context, elem);
        };
        Sizzle.attr = function(elem, name) {
            if ((elem.ownerDocument || elem) !== document) {
                setDocument(elem);
            }
            var fn = Expr.attrHandle[name.toLowerCase()], val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : undefined;
            return val !== undefined ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
        };
        Sizzle.error = function(msg) {
            throw new Error("Syntax error, unrecognized expression: " + msg);
        };
        Sizzle.uniqueSort = function(results) {
            var elem, duplicates = [], j = 0, i = 0;
            hasDuplicate = !support.detectDuplicates;
            sortInput = !support.sortStable && results.slice(0);
            results.sort(sortOrder);
            if (hasDuplicate) {
                while (elem = results[i++]) {
                    if (elem === results[i]) {
                        j = duplicates.push(i);
                    }
                }
                while (j--) {
                    results.splice(duplicates[j], 1);
                }
            }
            sortInput = null;
            return results;
        };
        getText = Sizzle.getText = function(elem) {
            var node, ret = "", i = 0, nodeType = elem.nodeType;
            if (!nodeType) {
                while (node = elem[i++]) {
                    ret += getText(node);
                }
            } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
                if (typeof elem.textContent === "string") {
                    return elem.textContent;
                } else {
                    for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                        ret += getText(elem);
                    }
                }
            } else if (nodeType === 3 || nodeType === 4) {
                return elem.nodeValue;
            }
            return ret;
        };
        Expr = Sizzle.selectors = {
            cacheLength: 50,
            createPseudo: markFunction,
            match: matchExpr,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: true
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: true
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(match) {
                    match[1] = match[1].replace(runescape, funescape);
                    match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);
                    if (match[2] === "~=") {
                        match[3] = " " + match[3] + " ";
                    }
                    return match.slice(0, 4);
                },
                CHILD: function(match) {
                    match[1] = match[1].toLowerCase();
                    if (match[1].slice(0, 3) === "nth") {
                        if (!match[3]) {
                            Sizzle.error(match[0]);
                        }
                        match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
                        match[5] = +(match[7] + match[8] || match[3] === "odd");
                    } else if (match[3]) {
                        Sizzle.error(match[0]);
                    }
                    return match;
                },
                PSEUDO: function(match) {
                    var excess, unquoted = !match[6] && match[2];
                    if (matchExpr["CHILD"].test(match[0])) {
                        return null;
                    }
                    if (match[3]) {
                        match[2] = match[4] || match[5] || "";
                    } else if (unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, true)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {
                        match[0] = match[0].slice(0, excess);
                        match[2] = unquoted.slice(0, excess);
                    }
                    return match.slice(0, 3);
                }
            },
            filter: {
                TAG: function(nodeNameSelector) {
                    var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
                    return nodeNameSelector === "*" ? function() {
                        return true;
                    } : function(elem) {
                        return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
                    };
                },
                CLASS: function(className) {
                    var pattern = classCache[className + " "];
                    return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function(elem) {
                        return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "");
                    });
                },
                ATTR: function(name, operator, check) {
                    return function(elem) {
                        var result = Sizzle.attr(elem, name);
                        if (result == null) {
                            return operator === "!=";
                        }
                        if (!operator) {
                            return true;
                        }
                        result += "";
                        return operator === "=" ? result === check : operator === "!=" ? result !== check : operator === "^=" ? check && result.indexOf(check) === 0 : operator === "*=" ? check && result.indexOf(check) > -1 : operator === "$=" ? check && result.slice(-check.length) === check : operator === "~=" ? (" " + result + " ").indexOf(check) > -1 : operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" : false;
                    };
                },
                CHILD: function(type, what, argument, first, last) {
                    var simple = type.slice(0, 3) !== "nth", forward = type.slice(-4) !== "last", ofType = what === "of-type";
                    return first === 1 && last === 0 ? function(elem) {
                        return !!elem.parentNode;
                    } : function(elem, context, xml) {
                        var cache, outerCache, node, diff, nodeIndex, start, dir = simple !== forward ? "nextSibling" : "previousSibling", parent = elem.parentNode, name = ofType && elem.nodeName.toLowerCase(), useCache = !xml && !ofType;
                        if (parent) {
                            if (simple) {
                                while (dir) {
                                    node = elem;
                                    while (node = node[dir]) {
                                        if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {
                                            return false;
                                        }
                                    }
                                    start = dir = type === "only" && !start && "nextSibling";
                                }
                                return true;
                            }
                            start = [ forward ? parent.firstChild : parent.lastChild ];
                            if (forward && useCache) {
                                outerCache = parent[expando] || (parent[expando] = {});
                                cache = outerCache[type] || [];
                                nodeIndex = cache[0] === dirruns && cache[1];
                                diff = cache[0] === dirruns && cache[2];
                                node = nodeIndex && parent.childNodes[nodeIndex];
                                while (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) {
                                    if (node.nodeType === 1 && ++diff && node === elem) {
                                        outerCache[type] = [ dirruns, nodeIndex, diff ];
                                        break;
                                    }
                                }
                            } else if (useCache && (cache = (elem[expando] || (elem[expando] = {}))[type]) && cache[0] === dirruns) {
                                diff = cache[1];
                            } else {
                                while (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) {
                                    if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {
                                        if (useCache) {
                                            (node[expando] || (node[expando] = {}))[type] = [ dirruns, diff ];
                                        }
                                        if (node === elem) {
                                            break;
                                        }
                                    }
                                }
                            }
                            diff -= last;
                            return diff === first || diff % first === 0 && diff / first >= 0;
                        }
                    };
                },
                PSEUDO: function(pseudo, argument) {
                    var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);
                    if (fn[expando]) {
                        return fn(argument);
                    }
                    if (fn.length > 1) {
                        args = [ pseudo, pseudo, "", argument ];
                        return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches) {
                            var idx, matched = fn(seed, argument), i = matched.length;
                            while (i--) {
                                idx = indexOf.call(seed, matched[i]);
                                seed[idx] = !(matches[idx] = matched[i]);
                            }
                        }) : function(elem) {
                            return fn(elem, 0, args);
                        };
                    }
                    return fn;
                }
            },
            pseudos: {
                not: markFunction(function(selector) {
                    var input = [], results = [], matcher = compile(selector.replace(rtrim, "$1"));
                    return matcher[expando] ? markFunction(function(seed, matches, context, xml) {
                        var elem, unmatched = matcher(seed, null, xml, []), i = seed.length;
                        while (i--) {
                            if (elem = unmatched[i]) {
                                seed[i] = !(matches[i] = elem);
                            }
                        }
                    }) : function(elem, context, xml) {
                        input[0] = elem;
                        matcher(input, null, xml, results);
                        return !results.pop();
                    };
                }),
                has: markFunction(function(selector) {
                    return function(elem) {
                        return Sizzle(selector, elem).length > 0;
                    };
                }),
                contains: markFunction(function(text) {
                    return function(elem) {
                        return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
                    };
                }),
                lang: markFunction(function(lang) {
                    if (!ridentifier.test(lang || "")) {
                        Sizzle.error("unsupported lang: " + lang);
                    }
                    lang = lang.replace(runescape, funescape).toLowerCase();
                    return function(elem) {
                        var elemLang;
                        do {
                            if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) {
                                elemLang = elemLang.toLowerCase();
                                return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
                            }
                        } while ((elem = elem.parentNode) && elem.nodeType === 1);
                        return false;
                    };
                }),
                target: function(elem) {
                    var hash = window.location && window.location.hash;
                    return hash && hash.slice(1) === elem.id;
                },
                root: function(elem) {
                    return elem === docElem;
                },
                focus: function(elem) {
                    return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
                },
                enabled: function(elem) {
                    return elem.disabled === false;
                },
                disabled: function(elem) {
                    return elem.disabled === true;
                },
                checked: function(elem) {
                    var nodeName = elem.nodeName.toLowerCase();
                    return nodeName === "input" && !!elem.checked || nodeName === "option" && !!elem.selected;
                },
                selected: function(elem) {
                    if (elem.parentNode) {
                        elem.parentNode.selectedIndex;
                    }
                    return elem.selected === true;
                },
                empty: function(elem) {
                    for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                        if (elem.nodeType < 6) {
                            return false;
                        }
                    }
                    return true;
                },
                parent: function(elem) {
                    return !Expr.pseudos["empty"](elem);
                },
                header: function(elem) {
                    return rheader.test(elem.nodeName);
                },
                input: function(elem) {
                    return rinputs.test(elem.nodeName);
                },
                button: function(elem) {
                    var name = elem.nodeName.toLowerCase();
                    return name === "input" && elem.type === "button" || name === "button";
                },
                text: function(elem) {
                    var attr;
                    return elem.nodeName.toLowerCase() === "input" && elem.type === "text" && ((attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text");
                },
                first: createPositionalPseudo(function() {
                    return [ 0 ];
                }),
                last: createPositionalPseudo(function(matchIndexes, length) {
                    return [ length - 1 ];
                }),
                eq: createPositionalPseudo(function(matchIndexes, length, argument) {
                    return [ argument < 0 ? argument + length : argument ];
                }),
                even: createPositionalPseudo(function(matchIndexes, length) {
                    var i = 0;
                    for (;i < length; i += 2) {
                        matchIndexes.push(i);
                    }
                    return matchIndexes;
                }),
                odd: createPositionalPseudo(function(matchIndexes, length) {
                    var i = 1;
                    for (;i < length; i += 2) {
                        matchIndexes.push(i);
                    }
                    return matchIndexes;
                }),
                lt: createPositionalPseudo(function(matchIndexes, length, argument) {
                    var i = argument < 0 ? argument + length : argument;
                    for (;--i >= 0; ) {
                        matchIndexes.push(i);
                    }
                    return matchIndexes;
                }),
                gt: createPositionalPseudo(function(matchIndexes, length, argument) {
                    var i = argument < 0 ? argument + length : argument;
                    for (;++i < length; ) {
                        matchIndexes.push(i);
                    }
                    return matchIndexes;
                })
            }
        };
        Expr.pseudos["nth"] = Expr.pseudos["eq"];
        for (i in {
            radio: true,
            checkbox: true,
            file: true,
            password: true,
            image: true
        }) {
            Expr.pseudos[i] = createInputPseudo(i);
        }
        for (i in {
            submit: true,
            reset: true
        }) {
            Expr.pseudos[i] = createButtonPseudo(i);
        }
        function setFilters() {}
        setFilters.prototype = Expr.filters = Expr.pseudos;
        Expr.setFilters = new setFilters();
        tokenize = Sizzle.tokenize = function(selector, parseOnly) {
            var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[selector + " "];
            if (cached) {
                return parseOnly ? 0 : cached.slice(0);
            }
            soFar = selector;
            groups = [];
            preFilters = Expr.preFilter;
            while (soFar) {
                if (!matched || (match = rcomma.exec(soFar))) {
                    if (match) {
                        soFar = soFar.slice(match[0].length) || soFar;
                    }
                    groups.push(tokens = []);
                }
                matched = false;
                if (match = rcombinators.exec(soFar)) {
                    matched = match.shift();
                    tokens.push({
                        value: matched,
                        type: match[0].replace(rtrim, " ")
                    });
                    soFar = soFar.slice(matched.length);
                }
                for (type in Expr.filter) {
                    if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
                        matched = match.shift();
                        tokens.push({
                            value: matched,
                            type: type,
                            matches: match
                        });
                        soFar = soFar.slice(matched.length);
                    }
                }
                if (!matched) {
                    break;
                }
            }
            return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0);
        };
        function toSelector(tokens) {
            var i = 0, len = tokens.length, selector = "";
            for (;i < len; i++) {
                selector += tokens[i].value;
            }
            return selector;
        }
        function addCombinator(matcher, combinator, base) {
            var dir = combinator.dir, checkNonElements = base && dir === "parentNode", doneName = done++;
            return combinator.first ? function(elem, context, xml) {
                while (elem = elem[dir]) {
                    if (elem.nodeType === 1 || checkNonElements) {
                        return matcher(elem, context, xml);
                    }
                }
            } : function(elem, context, xml) {
                var oldCache, outerCache, newCache = [ dirruns, doneName ];
                if (xml) {
                    while (elem = elem[dir]) {
                        if (elem.nodeType === 1 || checkNonElements) {
                            if (matcher(elem, context, xml)) {
                                return true;
                            }
                        }
                    }
                } else {
                    while (elem = elem[dir]) {
                        if (elem.nodeType === 1 || checkNonElements) {
                            outerCache = elem[expando] || (elem[expando] = {});
                            if ((oldCache = outerCache[dir]) && oldCache[0] === dirruns && oldCache[1] === doneName) {
                                return newCache[2] = oldCache[2];
                            } else {
                                outerCache[dir] = newCache;
                                if (newCache[2] = matcher(elem, context, xml)) {
                                    return true;
                                }
                            }
                        }
                    }
                }
            };
        }
        function elementMatcher(matchers) {
            return matchers.length > 1 ? function(elem, context, xml) {
                var i = matchers.length;
                while (i--) {
                    if (!matchers[i](elem, context, xml)) {
                        return false;
                    }
                }
                return true;
            } : matchers[0];
        }
        function multipleContexts(selector, contexts, results) {
            var i = 0, len = contexts.length;
            for (;i < len; i++) {
                Sizzle(selector, contexts[i], results);
            }
            return results;
        }
        function condense(unmatched, map, filter, context, xml) {
            var elem, newUnmatched = [], i = 0, len = unmatched.length, mapped = map != null;
            for (;i < len; i++) {
                if (elem = unmatched[i]) {
                    if (!filter || filter(elem, context, xml)) {
                        newUnmatched.push(elem);
                        if (mapped) {
                            map.push(i);
                        }
                    }
                }
            }
            return newUnmatched;
        }
        function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
            if (postFilter && !postFilter[expando]) {
                postFilter = setMatcher(postFilter);
            }
            if (postFinder && !postFinder[expando]) {
                postFinder = setMatcher(postFinder, postSelector);
            }
            return markFunction(function(seed, results, context, xml) {
                var temp, i, elem, preMap = [], postMap = [], preexisting = results.length, elems = seed || multipleContexts(selector || "*", context.nodeType ? [ context ] : context, []), matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems, matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;
                if (matcher) {
                    matcher(matcherIn, matcherOut, context, xml);
                }
                if (postFilter) {
                    temp = condense(matcherOut, postMap);
                    postFilter(temp, [], context, xml);
                    i = temp.length;
                    while (i--) {
                        if (elem = temp[i]) {
                            matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
                        }
                    }
                }
                if (seed) {
                    if (postFinder || preFilter) {
                        if (postFinder) {
                            temp = [];
                            i = matcherOut.length;
                            while (i--) {
                                if (elem = matcherOut[i]) {
                                    temp.push(matcherIn[i] = elem);
                                }
                            }
                            postFinder(null, matcherOut = [], temp, xml);
                        }
                        i = matcherOut.length;
                        while (i--) {
                            if ((elem = matcherOut[i]) && (temp = postFinder ? indexOf.call(seed, elem) : preMap[i]) > -1) {
                                seed[temp] = !(results[temp] = elem);
                            }
                        }
                    }
                } else {
                    matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
                    if (postFinder) {
                        postFinder(null, results, matcherOut, xml);
                    } else {
                        push.apply(results, matcherOut);
                    }
                }
            });
        }
        function matcherFromTokens(tokens) {
            var checkContext, matcher, j, len = tokens.length, leadingRelative = Expr.relative[tokens[0].type], implicitRelative = leadingRelative || Expr.relative[" "], i = leadingRelative ? 1 : 0, matchContext = addCombinator(function(elem) {
                return elem === checkContext;
            }, implicitRelative, true), matchAnyContext = addCombinator(function(elem) {
                return indexOf.call(checkContext, elem) > -1;
            }, implicitRelative, true), matchers = [ function(elem, context, xml) {
                return !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
            } ];
            for (;i < len; i++) {
                if (matcher = Expr.relative[tokens[i].type]) {
                    matchers = [ addCombinator(elementMatcher(matchers), matcher) ];
                } else {
                    matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);
                    if (matcher[expando]) {
                        j = ++i;
                        for (;j < len; j++) {
                            if (Expr.relative[tokens[j].type]) {
                                break;
                            }
                        }
                        return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(tokens.slice(0, i - 1).concat({
                            value: tokens[i - 2].type === " " ? "*" : ""
                        })).replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens(tokens = tokens.slice(j)), j < len && toSelector(tokens));
                    }
                    matchers.push(matcher);
                }
            }
            return elementMatcher(matchers);
        }
        function matcherFromGroupMatchers(elementMatchers, setMatchers) {
            var bySet = setMatchers.length > 0, byElement = elementMatchers.length > 0, superMatcher = function(seed, context, xml, results, outermost) {
                var elem, j, matcher, matchedCount = 0, i = "0", unmatched = seed && [], setMatched = [], contextBackup = outermostContext, elems = seed || byElement && Expr.find["TAG"]("*", outermost), dirrunsUnique = dirruns += contextBackup == null ? 1 : Math.random() || .1, len = elems.length;
                if (outermost) {
                    outermostContext = context !== document && context;
                }
                for (;i !== len && (elem = elems[i]) != null; i++) {
                    if (byElement && elem) {
                        j = 0;
                        while (matcher = elementMatchers[j++]) {
                            if (matcher(elem, context, xml)) {
                                results.push(elem);
                                break;
                            }
                        }
                        if (outermost) {
                            dirruns = dirrunsUnique;
                        }
                    }
                    if (bySet) {
                        if (elem = !matcher && elem) {
                            matchedCount--;
                        }
                        if (seed) {
                            unmatched.push(elem);
                        }
                    }
                }
                matchedCount += i;
                if (bySet && i !== matchedCount) {
                    j = 0;
                    while (matcher = setMatchers[j++]) {
                        matcher(unmatched, setMatched, context, xml);
                    }
                    if (seed) {
                        if (matchedCount > 0) {
                            while (i--) {
                                if (!(unmatched[i] || setMatched[i])) {
                                    setMatched[i] = pop.call(results);
                                }
                            }
                        }
                        setMatched = condense(setMatched);
                    }
                    push.apply(results, setMatched);
                    if (outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1) {
                        Sizzle.uniqueSort(results);
                    }
                }
                if (outermost) {
                    dirruns = dirrunsUnique;
                    outermostContext = contextBackup;
                }
                return unmatched;
            };
            return bySet ? markFunction(superMatcher) : superMatcher;
        }
        compile = Sizzle.compile = function(selector, match) {
            var i, setMatchers = [], elementMatchers = [], cached = compilerCache[selector + " "];
            if (!cached) {
                if (!match) {
                    match = tokenize(selector);
                }
                i = match.length;
                while (i--) {
                    cached = matcherFromTokens(match[i]);
                    if (cached[expando]) {
                        setMatchers.push(cached);
                    } else {
                        elementMatchers.push(cached);
                    }
                }
                cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));
                cached.selector = selector;
            }
            return cached;
        };
        select = Sizzle.select = function(selector, context, results, seed) {
            var i, tokens, token, type, find, compiled = typeof selector === "function" && selector, match = !seed && tokenize(selector = compiled.selector || selector);
            results = results || [];
            if (match.length === 1) {
                tokens = match[0] = match[0].slice(0);
                if (tokens.length > 2 && (token = tokens[0]).type === "ID" && support.getById && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {
                    context = (Expr.find["ID"](token.matches[0].replace(runescape, funescape), context) || [])[0];
                    if (!context) {
                        return results;
                    } else if (compiled) {
                        context = context.parentNode;
                    }
                    selector = selector.slice(tokens.shift().value.length);
                }
                i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
                while (i--) {
                    token = tokens[i];
                    if (Expr.relative[type = token.type]) {
                        break;
                    }
                    if (find = Expr.find[type]) {
                        if (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context)) {
                            tokens.splice(i, 1);
                            selector = seed.length && toSelector(tokens);
                            if (!selector) {
                                push.apply(results, seed);
                                return results;
                            }
                            break;
                        }
                    }
                }
            }
            (compiled || compile(selector, match))(seed, context, !documentIsHTML, results, rsibling.test(selector) && testContext(context.parentNode) || context);
            return results;
        };
        support.sortStable = expando.split("").sort(sortOrder).join("") === expando;
        support.detectDuplicates = !!hasDuplicate;
        setDocument();
        support.sortDetached = assert(function(div1) {
            return div1.compareDocumentPosition(document.createElement("div")) & 1;
        });
        if (!assert(function(div) {
            div.innerHTML = "<a href='#'></a>";
            return div.firstChild.getAttribute("href") === "#";
        })) {
            addHandle("type|href|height|width", function(elem, name, isXML) {
                if (!isXML) {
                    return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2);
                }
            });
        }
        if (!support.attributes || !assert(function(div) {
            div.innerHTML = "<input/>";
            div.firstChild.setAttribute("value", "");
            return div.firstChild.getAttribute("value") === "";
        })) {
            addHandle("value", function(elem, name, isXML) {
                if (!isXML && elem.nodeName.toLowerCase() === "input") {
                    return elem.defaultValue;
                }
            });
        }
        if (!assert(function(div) {
            return div.getAttribute("disabled") == null;
        })) {
            addHandle(booleans, function(elem, name, isXML) {
                var val;
                if (!isXML) {
                    return elem[name] === true ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
                }
            });
        }
        return Sizzle;
    }(window);
    jQuery.find = Sizzle;
    jQuery.expr = Sizzle.selectors;
    jQuery.expr[":"] = jQuery.expr.pseudos;
    jQuery.unique = Sizzle.uniqueSort;
    jQuery.text = Sizzle.getText;
    jQuery.isXMLDoc = Sizzle.isXML;
    jQuery.contains = Sizzle.contains;
    var rneedsContext = jQuery.expr.match.needsContext;
    var rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/;
    var risSimple = /^.[^:#\[\.,]*$/;
    function winnow(elements, qualifier, not) {
        if (jQuery.isFunction(qualifier)) {
            return jQuery.grep(elements, function(elem, i) {
                return !!qualifier.call(elem, i, elem) !== not;
            });
        }
        if (qualifier.nodeType) {
            return jQuery.grep(elements, function(elem) {
                return elem === qualifier !== not;
            });
        }
        if (typeof qualifier === "string") {
            if (risSimple.test(qualifier)) {
                return jQuery.filter(qualifier, elements, not);
            }
            qualifier = jQuery.filter(qualifier, elements);
        }
        return jQuery.grep(elements, function(elem) {
            return jQuery.inArray(elem, qualifier) >= 0 !== not;
        });
    }
    jQuery.filter = function(expr, elems, not) {
        var elem = elems[0];
        if (not) {
            expr = ":not(" + expr + ")";
        }
        return elems.length === 1 && elem.nodeType === 1 ? jQuery.find.matchesSelector(elem, expr) ? [ elem ] : [] : jQuery.find.matches(expr, jQuery.grep(elems, function(elem) {
            return elem.nodeType === 1;
        }));
    };
    jQuery.fn.extend({
        find: function(selector) {
            var i, ret = [], self = this, len = self.length;
            if (typeof selector !== "string") {
                return this.pushStack(jQuery(selector).filter(function() {
                    for (i = 0; i < len; i++) {
                        if (jQuery.contains(self[i], this)) {
                            return true;
                        }
                    }
                }));
            }
            for (i = 0; i < len; i++) {
                jQuery.find(selector, self[i], ret);
            }
            ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret);
            ret.selector = this.selector ? this.selector + " " + selector : selector;
            return ret;
        },
        filter: function(selector) {
            return this.pushStack(winnow(this, selector || [], false));
        },
        not: function(selector) {
            return this.pushStack(winnow(this, selector || [], true));
        },
        is: function(selector) {
            return !!winnow(this, typeof selector === "string" && rneedsContext.test(selector) ? jQuery(selector) : selector || [], false).length;
        }
    });
    var rootjQuery, document = window.document, rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, init = jQuery.fn.init = function(selector, context) {
        var match, elem;
        if (!selector) {
            return this;
        }
        if (typeof selector === "string") {
            if (selector.charAt(0) === "<" && selector.charAt(selector.length - 1) === ">" && selector.length >= 3) {
                match = [ null, selector, null ];
            } else {
                match = rquickExpr.exec(selector);
            }
            if (match && (match[1] || !context)) {
                if (match[1]) {
                    context = context instanceof jQuery ? context[0] : context;
                    jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true));
                    if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
                        for (match in context) {
                            if (jQuery.isFunction(this[match])) {
                                this[match](context[match]);
                            } else {
                                this.attr(match, context[match]);
                            }
                        }
                    }
                    return this;
                } else {
                    elem = document.getElementById(match[2]);
                    if (elem && elem.parentNode) {
                        if (elem.id !== match[2]) {
                            return rootjQuery.find(selector);
                        }
                        this.length = 1;
                        this[0] = elem;
                    }
                    this.context = document;
                    this.selector = selector;
                    return this;
                }
            } else if (!context || context.jquery) {
                return (context || rootjQuery).find(selector);
            } else {
                return this.constructor(context).find(selector);
            }
        } else if (selector.nodeType) {
            this.context = this[0] = selector;
            this.length = 1;
            return this;
        } else if (jQuery.isFunction(selector)) {
            return typeof rootjQuery.ready !== "undefined" ? rootjQuery.ready(selector) : selector(jQuery);
        }
        if (selector.selector !== undefined) {
            this.selector = selector.selector;
            this.context = selector.context;
        }
        return jQuery.makeArray(selector, this);
    };
    init.prototype = jQuery.fn;
    rootjQuery = jQuery(document);
    var rparentsprev = /^(?:parents|prev(?:Until|All))/, guaranteedUnique = {
        children: true,
        contents: true,
        next: true,
        prev: true
    };
    jQuery.extend({
        dir: function(elem, dir, until) {
            var matched = [], cur = elem[dir];
            while (cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery(cur).is(until))) {
                if (cur.nodeType === 1) {
                    matched.push(cur);
                }
                cur = cur[dir];
            }
            return matched;
        },
        sibling: function(n, elem) {
            var r = [];
            for (;n; n = n.nextSibling) {
                if (n.nodeType === 1 && n !== elem) {
                    r.push(n);
                }
            }
            return r;
        }
    });
    jQuery.fn.extend({
        has: function(target) {
            var i, targets = jQuery(target, this), len = targets.length;
            return this.filter(function() {
                for (i = 0; i < len; i++) {
                    if (jQuery.contains(this, targets[i])) {
                        return true;
                    }
                }
            });
        },
        closest: function(selectors, context) {
            var cur, i = 0, l = this.length, matched = [], pos = rneedsContext.test(selectors) || typeof selectors !== "string" ? jQuery(selectors, context || this.context) : 0;
            for (;i < l; i++) {
                for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
                    if (cur.nodeType < 11 && (pos ? pos.index(cur) > -1 : cur.nodeType === 1 && jQuery.find.matchesSelector(cur, selectors))) {
                        matched.push(cur);
                        break;
                    }
                }
            }
            return this.pushStack(matched.length > 1 ? jQuery.unique(matched) : matched);
        },
        index: function(elem) {
            if (!elem) {
                return this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
            }
            if (typeof elem === "string") {
                return jQuery.inArray(this[0], jQuery(elem));
            }
            return jQuery.inArray(elem.jquery ? elem[0] : elem, this);
        },
        add: function(selector, context) {
            return this.pushStack(jQuery.unique(jQuery.merge(this.get(), jQuery(selector, context))));
        },
        addBack: function(selector) {
            return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector));
        }
    });
    function sibling(cur, dir) {
        do {
            cur = cur[dir];
        } while (cur && cur.nodeType !== 1);
        return cur;
    }
    jQuery.each({
        parent: function(elem) {
            var parent = elem.parentNode;
            return parent && parent.nodeType !== 11 ? parent : null;
        },
        parents: function(elem) {
            return jQuery.dir(elem, "parentNode");
        },
        parentsUntil: function(elem, i, until) {
            return jQuery.dir(elem, "parentNode", until);
        },
        next: function(elem) {
            return sibling(elem, "nextSibling");
        },
        prev: function(elem) {
            return sibling(elem, "previousSibling");
        },
        nextAll: function(elem) {
            return jQuery.dir(elem, "nextSibling");
        },
        prevAll: function(elem) {
            return jQuery.dir(elem, "previousSibling");
        },
        nextUntil: function(elem, i, until) {
            return jQuery.dir(elem, "nextSibling", until);
        },
        prevUntil: function(elem, i, until) {
            return jQuery.dir(elem, "previousSibling", until);
        },
        siblings: function(elem) {
            return jQuery.sibling((elem.parentNode || {}).firstChild, elem);
        },
        children: function(elem) {
            return jQuery.sibling(elem.firstChild);
        },
        contents: function(elem) {
            return jQuery.nodeName(elem, "iframe") ? elem.contentDocument || elem.contentWindow.document : jQuery.merge([], elem.childNodes);
        }
    }, function(name, fn) {
        jQuery.fn[name] = function(until, selector) {
            var ret = jQuery.map(this, fn, until);
            if (name.slice(-5) !== "Until") {
                selector = until;
            }
            if (selector && typeof selector === "string") {
                ret = jQuery.filter(selector, ret);
            }
            if (this.length > 1) {
                if (!guaranteedUnique[name]) {
                    ret = jQuery.unique(ret);
                }
                if (rparentsprev.test(name)) {
                    ret = ret.reverse();
                }
            }
            return this.pushStack(ret);
        };
    });
    var rnotwhite = /\S+/g;
    var optionsCache = {};
    function createOptions(options) {
        var object = optionsCache[options] = {};
        jQuery.each(options.match(rnotwhite) || [], function(_, flag) {
            object[flag] = true;
        });
        return object;
    }
    jQuery.Callbacks = function(options) {
        options = typeof options === "string" ? optionsCache[options] || createOptions(options) : jQuery.extend({}, options);
        var firing, memory, fired, firingLength, firingIndex, firingStart, list = [], stack = !options.once && [], fire = function(data) {
            memory = options.memory && data;
            fired = true;
            firingIndex = firingStart || 0;
            firingStart = 0;
            firingLength = list.length;
            firing = true;
            for (;list && firingIndex < firingLength; firingIndex++) {
                if (list[firingIndex].apply(data[0], data[1]) === false && options.stopOnFalse) {
                    memory = false;
                    break;
                }
            }
            firing = false;
            if (list) {
                if (stack) {
                    if (stack.length) {
                        fire(stack.shift());
                    }
                } else if (memory) {
                    list = [];
                } else {
                    self.disable();
                }
            }
        }, self = {
            add: function() {
                if (list) {
                    var start = list.length;
                    (function add(args) {
                        jQuery.each(args, function(_, arg) {
                            var type = jQuery.type(arg);
                            if (type === "function") {
                                if (!options.unique || !self.has(arg)) {
                                    list.push(arg);
                                }
                            } else if (arg && arg.length && type !== "string") {
                                add(arg);
                            }
                        });
                    })(arguments);
                    if (firing) {
                        firingLength = list.length;
                    } else if (memory) {
                        firingStart = start;
                        fire(memory);
                    }
                }
                return this;
            },
            remove: function() {
                if (list) {
                    jQuery.each(arguments, function(_, arg) {
                        var index;
                        while ((index = jQuery.inArray(arg, list, index)) > -1) {
                            list.splice(index, 1);
                            if (firing) {
                                if (index <= firingLength) {
                                    firingLength--;
                                }
                                if (index <= firingIndex) {
                                    firingIndex--;
                                }
                            }
                        }
                    });
                }
                return this;
            },
            has: function(fn) {
                return fn ? jQuery.inArray(fn, list) > -1 : !!(list && list.length);
            },
            empty: function() {
                list = [];
                firingLength = 0;
                return this;
            },
            disable: function() {
                list = stack = memory = undefined;
                return this;
            },
            disabled: function() {
                return !list;
            },
            lock: function() {
                stack = undefined;
                if (!memory) {
                    self.disable();
                }
                return this;
            },
            locked: function() {
                return !stack;
            },
            fireWith: function(context, args) {
                if (list && (!fired || stack)) {
                    args = args || [];
                    args = [ context, args.slice ? args.slice() : args ];
                    if (firing) {
                        stack.push(args);
                    } else {
                        fire(args);
                    }
                }
                return this;
            },
            fire: function() {
                self.fireWith(this, arguments);
                return this;
            },
            fired: function() {
                return !!fired;
            }
        };
        return self;
    };
    jQuery.extend({
        Deferred: function(func) {
            var tuples = [ [ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ], [ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ], [ "notify", "progress", jQuery.Callbacks("memory") ] ], state = "pending", promise = {
                state: function() {
                    return state;
                },
                always: function() {
                    deferred.done(arguments).fail(arguments);
                    return this;
                },
                then: function() {
                    var fns = arguments;
                    return jQuery.Deferred(function(newDefer) {
                        jQuery.each(tuples, function(i, tuple) {
                            var fn = jQuery.isFunction(fns[i]) && fns[i];
                            deferred[tuple[1]](function() {
                                var returned = fn && fn.apply(this, arguments);
                                if (returned && jQuery.isFunction(returned.promise)) {
                                    returned.promise().done(newDefer.resolve).fail(newDefer.reject).progress(newDefer.notify);
                                } else {
                                    newDefer[tuple[0] + "With"](this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments);
                                }
                            });
                        });
                        fns = null;
                    }).promise();
                },
                promise: function(obj) {
                    return obj != null ? jQuery.extend(obj, promise) : promise;
                }
            }, deferred = {};
            promise.pipe = promise.then;
            jQuery.each(tuples, function(i, tuple) {
                var list = tuple[2], stateString = tuple[3];
                promise[tuple[1]] = list.add;
                if (stateString) {
                    list.add(function() {
                        state = stateString;
                    }, tuples[i ^ 1][2].disable, tuples[2][2].lock);
                }
                deferred[tuple[0]] = function() {
                    deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments);
                    return this;
                };
                deferred[tuple[0] + "With"] = list.fireWith;
            });
            promise.promise(deferred);
            if (func) {
                func.call(deferred, deferred);
            }
            return deferred;
        },
        when: function(subordinate) {
            var i = 0, resolveValues = slice.call(arguments), length = resolveValues.length, remaining = length !== 1 || subordinate && jQuery.isFunction(subordinate.promise) ? length : 0, deferred = remaining === 1 ? subordinate : jQuery.Deferred(), updateFunc = function(i, contexts, values) {
                return function(value) {
                    contexts[i] = this;
                    values[i] = arguments.length > 1 ? slice.call(arguments) : value;
                    if (values === progressValues) {
                        deferred.notifyWith(contexts, values);
                    } else if (!--remaining) {
                        deferred.resolveWith(contexts, values);
                    }
                };
            }, progressValues, progressContexts, resolveContexts;
            if (length > 1) {
                progressValues = new Array(length);
                progressContexts = new Array(length);
                resolveContexts = new Array(length);
                for (;i < length; i++) {
                    if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)) {
                        resolveValues[i].promise().done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject).progress(updateFunc(i, progressContexts, progressValues));
                    } else {
                        --remaining;
                    }
                }
            }
            if (!remaining) {
                deferred.resolveWith(resolveContexts, resolveValues);
            }
            return deferred.promise();
        }
    });
    var readyList;
    jQuery.fn.ready = function(fn) {
        jQuery.ready.promise().done(fn);
        return this;
    };
    jQuery.extend({
        isReady: false,
        readyWait: 1,
        holdReady: function(hold) {
            if (hold) {
                jQuery.readyWait++;
            } else {
                jQuery.ready(true);
            }
        },
        ready: function(wait) {
            if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
                return;
            }
            if (!document.body) {
                return setTimeout(jQuery.ready);
            }
            jQuery.isReady = true;
            if (wait !== true && --jQuery.readyWait > 0) {
                return;
            }
            readyList.resolveWith(document, [ jQuery ]);
            if (jQuery.fn.triggerHandler) {
                jQuery(document).triggerHandler("ready");
                jQuery(document).off("ready");
            }
        }
    });
    function detach() {
        if (document.addEventListener) {
            document.removeEventListener("DOMContentLoaded", completed, false);
            window.removeEventListener("load", completed, false);
        } else {
            document.detachEvent("onreadystatechange", completed);
            window.detachEvent("onload", completed);
        }
    }
    function completed() {
        if (document.addEventListener || event.type === "load" || document.readyState === "complete") {
            detach();
            jQuery.ready();
        }
    }
    jQuery.ready.promise = function(obj) {
        if (!readyList) {
            readyList = jQuery.Deferred();
            if (document.readyState === "complete") {
                setTimeout(jQuery.ready);
            } else if (document.addEventListener) {
                document.addEventListener("DOMContentLoaded", completed, false);
                window.addEventListener("load", completed, false);
            } else {
                document.attachEvent("onreadystatechange", completed);
                window.attachEvent("onload", completed);
                var top = false;
                try {
                    top = window.frameElement == null && document.documentElement;
                } catch (e) {}
                if (top && top.doScroll) {
                    (function doScrollCheck() {
                        if (!jQuery.isReady) {
                            try {
                                top.doScroll("left");
                            } catch (e) {
                                return setTimeout(doScrollCheck, 50);
                            }
                            detach();
                            jQuery.ready();
                        }
                    })();
                }
            }
        }
        return readyList.promise(obj);
    };
    var strundefined = typeof undefined;
    var i;
    for (i in jQuery(support)) {
        break;
    }
    support.ownLast = i !== "0";
    support.inlineBlockNeedsLayout = false;
    jQuery(function() {
        var val, div, body, container;
        body = document.getElementsByTagName("body")[0];
        if (!body || !body.style) {
            return;
        }
        div = document.createElement("div");
        container = document.createElement("div");
        container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
        body.appendChild(container).appendChild(div);
        if (typeof div.style.zoom !== strundefined) {
            div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";
            support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
            if (val) {
                body.style.zoom = 1;
            }
        }
        body.removeChild(container);
    });
    (function() {
        var div = document.createElement("div");
        if (support.deleteExpando == null) {
            support.deleteExpando = true;
            try {
                delete div.test;
            } catch (e) {
                support.deleteExpando = false;
            }
        }
        div = null;
    })();
    jQuery.acceptData = function(elem) {
        var noData = jQuery.noData[(elem.nodeName + " ").toLowerCase()], nodeType = +elem.nodeType || 1;
        return nodeType !== 1 && nodeType !== 9 ? false : !noData || noData !== true && elem.getAttribute("classid") === noData;
    };
    var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, rmultiDash = /([A-Z])/g;
    function dataAttr(elem, key, data) {
        if (data === undefined && elem.nodeType === 1) {
            var name = "data-" + key.replace(rmultiDash, "-$1").toLowerCase();
            data = elem.getAttribute(name);
            if (typeof data === "string") {
                try {
                    data = data === "true" ? true : data === "false" ? false : data === "null" ? null : +data + "" === data ? +data : rbrace.test(data) ? jQuery.parseJSON(data) : data;
                } catch (e) {}
                jQuery.data(elem, key, data);
            } else {
                data = undefined;
            }
        }
        return data;
    }
    function isEmptyDataObject(obj) {
        var name;
        for (name in obj) {
            if (name === "data" && jQuery.isEmptyObject(obj[name])) {
                continue;
            }
            if (name !== "toJSON") {
                return false;
            }
        }
        return true;
    }
    function internalData(elem, name, data, pvt) {
        if (!jQuery.acceptData(elem)) {
            return;
        }
        var ret, thisCache, internalKey = jQuery.expando, isNode = elem.nodeType, cache = isNode ? jQuery.cache : elem, id = isNode ? elem[internalKey] : elem[internalKey] && internalKey;
        if ((!id || !cache[id] || !pvt && !cache[id].data) && data === undefined && typeof name === "string") {
            return;
        }
        if (!id) {
            if (isNode) {
                id = elem[internalKey] = deletedIds.pop() || jQuery.guid++;
            } else {
                id = internalKey;
            }
        }
        if (!cache[id]) {
            cache[id] = isNode ? {} : {
                toJSON: jQuery.noop
            };
        }
        if (typeof name === "object" || typeof name === "function") {
            if (pvt) {
                cache[id] = jQuery.extend(cache[id], name);
            } else {
                cache[id].data = jQuery.extend(cache[id].data, name);
            }
        }
        thisCache = cache[id];
        if (!pvt) {
            if (!thisCache.data) {
                thisCache.data = {};
            }
            thisCache = thisCache.data;
        }
        if (data !== undefined) {
            thisCache[jQuery.camelCase(name)] = data;
        }
        if (typeof name === "string") {
            ret = thisCache[name];
            if (ret == null) {
                ret = thisCache[jQuery.camelCase(name)];
            }
        } else {
            ret = thisCache;
        }
        return ret;
    }
    function internalRemoveData(elem, name, pvt) {
        if (!jQuery.acceptData(elem)) {
            return;
        }
        var thisCache, i, isNode = elem.nodeType, cache = isNode ? jQuery.cache : elem, id = isNode ? elem[jQuery.expando] : jQuery.expando;
        if (!cache[id]) {
            return;
        }
        if (name) {
            thisCache = pvt ? cache[id] : cache[id].data;
            if (thisCache) {
                if (!jQuery.isArray(name)) {
                    if (name in thisCache) {
                        name = [ name ];
                    } else {
                        name = jQuery.camelCase(name);
                        if (name in thisCache) {
                            name = [ name ];
                        } else {
                            name = name.split(" ");
                        }
                    }
                } else {
                    name = name.concat(jQuery.map(name, jQuery.camelCase));
                }
                i = name.length;
                while (i--) {
                    delete thisCache[name[i]];
                }
                if (pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache)) {
                    return;
                }
            }
        }
        if (!pvt) {
            delete cache[id].data;
            if (!isEmptyDataObject(cache[id])) {
                return;
            }
        }
        if (isNode) {
            jQuery.cleanData([ elem ], true);
        } else if (support.deleteExpando || cache != cache.window) {
            delete cache[id];
        } else {
            cache[id] = null;
        }
    }
    jQuery.extend({
        cache: {},
        noData: {
            "applet ": true,
            "embed ": true,
            "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
        },
        hasData: function(elem) {
            elem = elem.nodeType ? jQuery.cache[elem[jQuery.expando]] : elem[jQuery.expando];
            return !!elem && !isEmptyDataObject(elem);
        },
        data: function(elem, name, data) {
            return internalData(elem, name, data);
        },
        removeData: function(elem, name) {
            return internalRemoveData(elem, name);
        },
        _data: function(elem, name, data) {
            return internalData(elem, name, data, true);
        },
        _removeData: function(elem, name) {
            return internalRemoveData(elem, name, true);
        }
    });
    jQuery.fn.extend({
        data: function(key, value) {
            var i, name, data, elem = this[0], attrs = elem && elem.attributes;
            if (key === undefined) {
                if (this.length) {
                    data = jQuery.data(elem);
                    if (elem.nodeType === 1 && !jQuery._data(elem, "parsedAttrs")) {
                        i = attrs.length;
                        while (i--) {
                            if (attrs[i]) {
                                name = attrs[i].name;
                                if (name.indexOf("data-") === 0) {
                                    name = jQuery.camelCase(name.slice(5));
                                    dataAttr(elem, name, data[name]);
                                }
                            }
                        }
                        jQuery._data(elem, "parsedAttrs", true);
                    }
                }
                return data;
            }
            if (typeof key === "object") {
                return this.each(function() {
                    jQuery.data(this, key);
                });
            }
            return arguments.length > 1 ? this.each(function() {
                jQuery.data(this, key, value);
            }) : elem ? dataAttr(elem, key, jQuery.data(elem, key)) : undefined;
        },
        removeData: function(key) {
            return this.each(function() {
                jQuery.removeData(this, key);
            });
        }
    });
    jQuery.extend({
        queue: function(elem, type, data) {
            var queue;
            if (elem) {
                type = (type || "fx") + "queue";
                queue = jQuery._data(elem, type);
                if (data) {
                    if (!queue || jQuery.isArray(data)) {
                        queue = jQuery._data(elem, type, jQuery.makeArray(data));
                    } else {
                        queue.push(data);
                    }
                }
                return queue || [];
            }
        },
        dequeue: function(elem, type) {
            type = type || "fx";
            var queue = jQuery.queue(elem, type), startLength = queue.length, fn = queue.shift(), hooks = jQuery._queueHooks(elem, type), next = function() {
                jQuery.dequeue(elem, type);
            };
            if (fn === "inprogress") {
                fn = queue.shift();
                startLength--;
            }
            if (fn) {
                if (type === "fx") {
                    queue.unshift("inprogress");
                }
                delete hooks.stop;
                fn.call(elem, next, hooks);
            }
            if (!startLength && hooks) {
                hooks.empty.fire();
            }
        },
        _queueHooks: function(elem, type) {
            var key = type + "queueHooks";
            return jQuery._data(elem, key) || jQuery._data(elem, key, {
                empty: jQuery.Callbacks("once memory").add(function() {
                    jQuery._removeData(elem, type + "queue");
                    jQuery._removeData(elem, key);
                })
            });
        }
    });
    jQuery.fn.extend({
        queue: function(type, data) {
            var setter = 2;
            if (typeof type !== "string") {
                data = type;
                type = "fx";
                setter--;
            }
            if (arguments.length < setter) {
                return jQuery.queue(this[0], type);
            }
            return data === undefined ? this : this.each(function() {
                var queue = jQuery.queue(this, type, data);
                jQuery._queueHooks(this, type);
                if (type === "fx" && queue[0] !== "inprogress") {
                    jQuery.dequeue(this, type);
                }
            });
        },
        dequeue: function(type) {
            return this.each(function() {
                jQuery.dequeue(this, type);
            });
        },
        clearQueue: function(type) {
            return this.queue(type || "fx", []);
        },
        promise: function(type, obj) {
            var tmp, count = 1, defer = jQuery.Deferred(), elements = this, i = this.length, resolve = function() {
                if (!--count) {
                    defer.resolveWith(elements, [ elements ]);
                }
            };
            if (typeof type !== "string") {
                obj = type;
                type = undefined;
            }
            type = type || "fx";
            while (i--) {
                tmp = jQuery._data(elements[i], type + "queueHooks");
                if (tmp && tmp.empty) {
                    count++;
                    tmp.empty.add(resolve);
                }
            }
            resolve();
            return defer.promise(obj);
        }
    });
    var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;
    var cssExpand = [ "Top", "Right", "Bottom", "Left" ];
    var isHidden = function(elem, el) {
        elem = el || elem;
        return jQuery.css(elem, "display") === "none" || !jQuery.contains(elem.ownerDocument, elem);
    };
    var access = jQuery.access = function(elems, fn, key, value, chainable, emptyGet, raw) {
        var i = 0, length = elems.length, bulk = key == null;
        if (jQuery.type(key) === "object") {
            chainable = true;
            for (i in key) {
                jQuery.access(elems, fn, i, key[i], true, emptyGet, raw);
            }
        } else if (value !== undefined) {
            chainable = true;
            if (!jQuery.isFunction(value)) {
                raw = true;
            }
            if (bulk) {
                if (raw) {
                    fn.call(elems, value);
                    fn = null;
                } else {
                    bulk = fn;
                    fn = function(elem, key, value) {
                        return bulk.call(jQuery(elem), value);
                    };
                }
            }
            if (fn) {
                for (;i < length; i++) {
                    fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
                }
            }
        }
        return chainable ? elems : bulk ? fn.call(elems) : length ? fn(elems[0], key) : emptyGet;
    };
    var rcheckableType = /^(?:checkbox|radio)$/i;
    (function() {
        var input = document.createElement("input"), div = document.createElement("div"), fragment = document.createDocumentFragment();
        div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
        support.leadingWhitespace = div.firstChild.nodeType === 3;
        support.tbody = !div.getElementsByTagName("tbody").length;
        support.htmlSerialize = !!div.getElementsByTagName("link").length;
        support.html5Clone = document.createElement("nav").cloneNode(true).outerHTML !== "<:nav></:nav>";
        input.type = "checkbox";
        input.checked = true;
        fragment.appendChild(input);
        support.appendChecked = input.checked;
        div.innerHTML = "<textarea>x</textarea>";
        support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;
        fragment.appendChild(div);
        div.innerHTML = "<input type='radio' checked='checked' name='t'/>";
        support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;
        support.noCloneEvent = true;
        if (div.attachEvent) {
            div.attachEvent("onclick", function() {
                support.noCloneEvent = false;
            });
            div.cloneNode(true).click();
        }
        if (support.deleteExpando == null) {
            support.deleteExpando = true;
            try {
                delete div.test;
            } catch (e) {
                support.deleteExpando = false;
            }
        }
    })();
    (function() {
        var i, eventName, div = document.createElement("div");
        for (i in {
            submit: true,
            change: true,
            focusin: true
        }) {
            eventName = "on" + i;
            if (!(support[i + "Bubbles"] = eventName in window)) {
                div.setAttribute(eventName, "t");
                support[i + "Bubbles"] = div.attributes[eventName].expando === false;
            }
        }
        div = null;
    })();
    var rformElems = /^(?:input|select|textarea)$/i, rkeyEvent = /^key/, rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/, rfocusMorph = /^(?:focusinfocus|focusoutblur)$/, rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;
    function returnTrue() {
        return true;
    }
    function returnFalse() {
        return false;
    }
    function safeActiveElement() {
        try {
            return document.activeElement;
        } catch (err) {}
    }
    jQuery.event = {
        global: {},
        add: function(elem, types, handler, data, selector) {
            var tmp, events, t, handleObjIn, special, eventHandle, handleObj, handlers, type, namespaces, origType, elemData = jQuery._data(elem);
            if (!elemData) {
                return;
            }
            if (handler.handler) {
                handleObjIn = handler;
                handler = handleObjIn.handler;
                selector = handleObjIn.selector;
            }
            if (!handler.guid) {
                handler.guid = jQuery.guid++;
            }
            if (!(events = elemData.events)) {
                events = elemData.events = {};
            }
            if (!(eventHandle = elemData.handle)) {
                eventHandle = elemData.handle = function(e) {
                    return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ? jQuery.event.dispatch.apply(eventHandle.elem, arguments) : undefined;
                };
                eventHandle.elem = elem;
            }
            types = (types || "").match(rnotwhite) || [ "" ];
            t = types.length;
            while (t--) {
                tmp = rtypenamespace.exec(types[t]) || [];
                type = origType = tmp[1];
                namespaces = (tmp[2] || "").split(".").sort();
                if (!type) {
                    continue;
                }
                special = jQuery.event.special[type] || {};
                type = (selector ? special.delegateType : special.bindType) || type;
                special = jQuery.event.special[type] || {};
                handleObj = jQuery.extend({
                    type: type,
                    origType: origType,
                    data: data,
                    handler: handler,
                    guid: handler.guid,
                    selector: selector,
                    needsContext: selector && jQuery.expr.match.needsContext.test(selector),
                    namespace: namespaces.join(".")
                }, handleObjIn);
                if (!(handlers = events[type])) {
                    handlers = events[type] = [];
                    handlers.delegateCount = 0;
                    if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
                        if (elem.addEventListener) {
                            elem.addEventListener(type, eventHandle, false);
                        } else if (elem.attachEvent) {
                            elem.attachEvent("on" + type, eventHandle);
                        }
                    }
                }
                if (special.add) {
                    special.add.call(elem, handleObj);
                    if (!handleObj.handler.guid) {
                        handleObj.handler.guid = handler.guid;
                    }
                }
                if (selector) {
                    handlers.splice(handlers.delegateCount++, 0, handleObj);
                } else {
                    handlers.push(handleObj);
                }
                jQuery.event.global[type] = true;
            }
            elem = null;
        },
        remove: function(elem, types, handler, selector, mappedTypes) {
            var j, handleObj, tmp, origCount, t, events, special, handlers, type, namespaces, origType, elemData = jQuery.hasData(elem) && jQuery._data(elem);
            if (!elemData || !(events = elemData.events)) {
                return;
            }
            types = (types || "").match(rnotwhite) || [ "" ];
            t = types.length;
            while (t--) {
                tmp = rtypenamespace.exec(types[t]) || [];
                type = origType = tmp[1];
                namespaces = (tmp[2] || "").split(".").sort();
                if (!type) {
                    for (type in events) {
                        jQuery.event.remove(elem, type + types[t], handler, selector, true);
                    }
                    continue;
                }
                special = jQuery.event.special[type] || {};
                type = (selector ? special.delegateType : special.bindType) || type;
                handlers = events[type] || [];
                tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");
                origCount = j = handlers.length;
                while (j--) {
                    handleObj = handlers[j];
                    if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
                        handlers.splice(j, 1);
                        if (handleObj.selector) {
                            handlers.delegateCount--;
                        }
                        if (special.remove) {
                            special.remove.call(elem, handleObj);
                        }
                    }
                }
                if (origCount && !handlers.length) {
                    if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
                        jQuery.removeEvent(elem, type, elemData.handle);
                    }
                    delete events[type];
                }
            }
            if (jQuery.isEmptyObject(events)) {
                delete elemData.handle;
                jQuery._removeData(elem, "events");
            }
        },
        trigger: function(event, data, elem, onlyHandlers) {
            var handle, ontype, cur, bubbleType, special, tmp, i, eventPath = [ elem || document ], type = hasOwn.call(event, "type") ? event.type : event, namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
            cur = tmp = elem = elem || document;
            if (elem.nodeType === 3 || elem.nodeType === 8) {
                return;
            }
            if (rfocusMorph.test(type + jQuery.event.triggered)) {
                return;
            }
            if (type.indexOf(".") >= 0) {
                namespaces = type.split(".");
                type = namespaces.shift();
                namespaces.sort();
            }
            ontype = type.indexOf(":") < 0 && "on" + type;
            event = event[jQuery.expando] ? event : new jQuery.Event(type, typeof event === "object" && event);
            event.isTrigger = onlyHandlers ? 2 : 3;
            event.namespace = namespaces.join(".");
            event.namespace_re = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
            event.result = undefined;
            if (!event.target) {
                event.target = elem;
            }
            data = data == null ? [ event ] : jQuery.makeArray(data, [ event ]);
            special = jQuery.event.special[type] || {};
            if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
                return;
            }
            if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
                bubbleType = special.delegateType || type;
                if (!rfocusMorph.test(bubbleType + type)) {
                    cur = cur.parentNode;
                }
                for (;cur; cur = cur.parentNode) {
                    eventPath.push(cur);
                    tmp = cur;
                }
                if (tmp === (elem.ownerDocument || document)) {
                    eventPath.push(tmp.defaultView || tmp.parentWindow || window);
                }
            }
            i = 0;
            while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
                event.type = i > 1 ? bubbleType : special.bindType || type;
                handle = (jQuery._data(cur, "events") || {})[event.type] && jQuery._data(cur, "handle");
                if (handle) {
                    handle.apply(cur, data);
                }
                handle = ontype && cur[ontype];
                if (handle && handle.apply && jQuery.acceptData(cur)) {
                    event.result = handle.apply(cur, data);
                    if (event.result === false) {
                        event.preventDefault();
                    }
                }
            }
            event.type = type;
            if (!onlyHandlers && !event.isDefaultPrevented()) {
                if ((!special._default || special._default.apply(eventPath.pop(), data) === false) && jQuery.acceptData(elem)) {
                    if (ontype && elem[type] && !jQuery.isWindow(elem)) {
                        tmp = elem[ontype];
                        if (tmp) {
                            elem[ontype] = null;
                        }
                        jQuery.event.triggered = type;
                        try {
                            elem[type]();
                        } catch (e) {}
                        jQuery.event.triggered = undefined;
                        if (tmp) {
                            elem[ontype] = tmp;
                        }
                    }
                }
            }
            return event.result;
        },
        dispatch: function(event) {
            event = jQuery.event.fix(event);
            var i, ret, handleObj, matched, j, handlerQueue = [], args = slice.call(arguments), handlers = (jQuery._data(this, "events") || {})[event.type] || [], special = jQuery.event.special[event.type] || {};
            args[0] = event;
            event.delegateTarget = this;
            if (special.preDispatch && special.preDispatch.call(this, event) === false) {
                return;
            }
            handlerQueue = jQuery.event.handlers.call(this, event, handlers);
            i = 0;
            while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
                event.currentTarget = matched.elem;
                j = 0;
                while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {
                    if (!event.namespace_re || event.namespace_re.test(handleObj.namespace)) {
                        event.handleObj = handleObj;
                        event.data = handleObj.data;
                        ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);
                        if (ret !== undefined) {
                            if ((event.result = ret) === false) {
                                event.preventDefault();
                                event.stopPropagation();
                            }
                        }
                    }
                }
            }
            if (special.postDispatch) {
                special.postDispatch.call(this, event);
            }
            return event.result;
        },
        handlers: function(event, handlers) {
            var sel, handleObj, matches, i, handlerQueue = [], delegateCount = handlers.delegateCount, cur = event.target;
            if (delegateCount && cur.nodeType && (!event.button || event.type !== "click")) {
                for (;cur != this; cur = cur.parentNode || this) {
                    if (cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click")) {
                        matches = [];
                        for (i = 0; i < delegateCount; i++) {
                            handleObj = handlers[i];
                            sel = handleObj.selector + " ";
                            if (matches[sel] === undefined) {
                                matches[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) >= 0 : jQuery.find(sel, this, null, [ cur ]).length;
                            }
                            if (matches[sel]) {
                                matches.push(handleObj);
                            }
                        }
                        if (matches.length) {
                            handlerQueue.push({
                                elem: cur,
                                handlers: matches
                            });
                        }
                    }
                }
            }
            if (delegateCount < handlers.length) {
                handlerQueue.push({
                    elem: this,
                    handlers: handlers.slice(delegateCount)
                });
            }
            return handlerQueue;
        },
        fix: function(event) {
            if (event[jQuery.expando]) {
                return event;
            }
            var i, prop, copy, type = event.type, originalEvent = event, fixHook = this.fixHooks[type];
            if (!fixHook) {
                this.fixHooks[type] = fixHook = rmouseEvent.test(type) ? this.mouseHooks : rkeyEvent.test(type) ? this.keyHooks : {};
            }
            copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;
            event = new jQuery.Event(originalEvent);
            i = copy.length;
            while (i--) {
                prop = copy[i];
                event[prop] = originalEvent[prop];
            }
            if (!event.target) {
                event.target = originalEvent.srcElement || document;
            }
            if (event.target.nodeType === 3) {
                event.target = event.target.parentNode;
            }
            event.metaKey = !!event.metaKey;
            return fixHook.filter ? fixHook.filter(event, originalEvent) : event;
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(event, original) {
                if (event.which == null) {
                    event.which = original.charCode != null ? original.charCode : original.keyCode;
                }
                return event;
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(event, original) {
                var body, eventDoc, doc, button = original.button, fromElement = original.fromElement;
                if (event.pageX == null && original.clientX != null) {
                    eventDoc = event.target.ownerDocument || document;
                    doc = eventDoc.documentElement;
                    body = eventDoc.body;
                    event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
                    event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
                }
                if (!event.relatedTarget && fromElement) {
                    event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
                }
                if (!event.which && button !== undefined) {
                    event.which = button & 1 ? 1 : button & 2 ? 3 : button & 4 ? 2 : 0;
                }
                return event;
            }
        },
        special: {
            load: {
                noBubble: true
            },
            focus: {
                trigger: function() {
                    if (this !== safeActiveElement() && this.focus) {
                        try {
                            this.focus();
                            return false;
                        } catch (e) {}
                    }
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    if (this === safeActiveElement() && this.blur) {
                        this.blur();
                        return false;
                    }
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    if (jQuery.nodeName(this, "input") && this.type === "checkbox" && this.click) {
                        this.click();
                        return false;
                    }
                },
                _default: function(event) {
                    return jQuery.nodeName(event.target, "a");
                }
            },
            beforeunload: {
                postDispatch: function(event) {
                    if (event.result !== undefined && event.originalEvent) {
                        event.originalEvent.returnValue = event.result;
                    }
                }
            }
        },
        simulate: function(type, elem, event, bubble) {
            var e = jQuery.extend(new jQuery.Event(), event, {
                type: type,
                isSimulated: true,
                originalEvent: {}
            });
            if (bubble) {
                jQuery.event.trigger(e, null, elem);
            } else {
                jQuery.event.dispatch.call(elem, e);
            }
            if (e.isDefaultPrevented()) {
                event.preventDefault();
            }
        }
    };
    jQuery.removeEvent = document.removeEventListener ? function(elem, type, handle) {
        if (elem.removeEventListener) {
            elem.removeEventListener(type, handle, false);
        }
    } : function(elem, type, handle) {
        var name = "on" + type;
        if (elem.detachEvent) {
            if (typeof elem[name] === strundefined) {
                elem[name] = null;
            }
            elem.detachEvent(name, handle);
        }
    };
    jQuery.Event = function(src, props) {
        if (!(this instanceof jQuery.Event)) {
            return new jQuery.Event(src, props);
        }
        if (src && src.type) {
            this.originalEvent = src;
            this.type = src.type;
            this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === undefined && src.returnValue === false ? returnTrue : returnFalse;
        } else {
            this.type = src;
        }
        if (props) {
            jQuery.extend(this, props);
        }
        this.timeStamp = src && src.timeStamp || jQuery.now();
        this[jQuery.expando] = true;
    };
    jQuery.Event.prototype = {
        isDefaultPrevented: returnFalse,
        isPropagationStopped: returnFalse,
        isImmediatePropagationStopped: returnFalse,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = returnTrue;
            if (!e) {
                return;
            }
            if (e.preventDefault) {
                e.preventDefault();
            } else {
                e.returnValue = false;
            }
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = returnTrue;
            if (!e) {
                return;
            }
            if (e.stopPropagation) {
                e.stopPropagation();
            }
            e.cancelBubble = true;
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = returnTrue;
            if (e && e.stopImmediatePropagation) {
                e.stopImmediatePropagation();
            }
            this.stopPropagation();
        }
    };
    jQuery.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(orig, fix) {
        jQuery.event.special[orig] = {
            delegateType: fix,
            bindType: fix,
            handle: function(event) {
                var ret, target = this, related = event.relatedTarget, handleObj = event.handleObj;
                if (!related || related !== target && !jQuery.contains(target, related)) {
                    event.type = handleObj.origType;
                    ret = handleObj.handler.apply(this, arguments);
                    event.type = fix;
                }
                return ret;
            }
        };
    });
    if (!support.submitBubbles) {
        jQuery.event.special.submit = {
            setup: function() {
                if (jQuery.nodeName(this, "form")) {
                    return false;
                }
                jQuery.event.add(this, "click._submit keypress._submit", function(e) {
                    var elem = e.target, form = jQuery.nodeName(elem, "input") || jQuery.nodeName(elem, "button") ? elem.form : undefined;
                    if (form && !jQuery._data(form, "submitBubbles")) {
                        jQuery.event.add(form, "submit._submit", function(event) {
                            event._submit_bubble = true;
                        });
                        jQuery._data(form, "submitBubbles", true);
                    }
                });
            },
            postDispatch: function(event) {
                if (event._submit_bubble) {
                    delete event._submit_bubble;
                    if (this.parentNode && !event.isTrigger) {
                        jQuery.event.simulate("submit", this.parentNode, event, true);
                    }
                }
            },
            teardown: function() {
                if (jQuery.nodeName(this, "form")) {
                    return false;
                }
                jQuery.event.remove(this, "._submit");
            }
        };
    }
    if (!support.changeBubbles) {
        jQuery.event.special.change = {
            setup: function() {
                if (rformElems.test(this.nodeName)) {
                    if (this.type === "checkbox" || this.type === "radio") {
                        jQuery.event.add(this, "propertychange._change", function(event) {
                            if (event.originalEvent.propertyName === "checked") {
                                this._just_changed = true;
                            }
                        });
                        jQuery.event.add(this, "click._change", function(event) {
                            if (this._just_changed && !event.isTrigger) {
                                this._just_changed = false;
                            }
                            jQuery.event.simulate("change", this, event, true);
                        });
                    }
                    return false;
                }
                jQuery.event.add(this, "beforeactivate._change", function(e) {
                    var elem = e.target;
                    if (rformElems.test(elem.nodeName) && !jQuery._data(elem, "changeBubbles")) {
                        jQuery.event.add(elem, "change._change", function(event) {
                            if (this.parentNode && !event.isSimulated && !event.isTrigger) {
                                jQuery.event.simulate("change", this.parentNode, event, true);
                            }
                        });
                        jQuery._data(elem, "changeBubbles", true);
                    }
                });
            },
            handle: function(event) {
                var elem = event.target;
                if (this !== elem || event.isSimulated || event.isTrigger || elem.type !== "radio" && elem.type !== "checkbox") {
                    return event.handleObj.handler.apply(this, arguments);
                }
            },
            teardown: function() {
                jQuery.event.remove(this, "._change");
                return !rformElems.test(this.nodeName);
            }
        };
    }
    if (!support.focusinBubbles) {
        jQuery.each({
            focus: "focusin",
            blur: "focusout"
        }, function(orig, fix) {
            var handler = function(event) {
                jQuery.event.simulate(fix, event.target, jQuery.event.fix(event), true);
            };
            jQuery.event.special[fix] = {
                setup: function() {
                    var doc = this.ownerDocument || this, attaches = jQuery._data(doc, fix);
                    if (!attaches) {
                        doc.addEventListener(orig, handler, true);
                    }
                    jQuery._data(doc, fix, (attaches || 0) + 1);
                },
                teardown: function() {
                    var doc = this.ownerDocument || this, attaches = jQuery._data(doc, fix) - 1;
                    if (!attaches) {
                        doc.removeEventListener(orig, handler, true);
                        jQuery._removeData(doc, fix);
                    } else {
                        jQuery._data(doc, fix, attaches);
                    }
                }
            };
        });
    }
    jQuery.fn.extend({
        on: function(types, selector, data, fn, one) {
            var type, origFn;
            if (typeof types === "object") {
                if (typeof selector !== "string") {
                    data = data || selector;
                    selector = undefined;
                }
                for (type in types) {
                    this.on(type, selector, data, types[type], one);
                }
                return this;
            }
            if (data == null && fn == null) {
                fn = selector;
                data = selector = undefined;
            } else if (fn == null) {
                if (typeof selector === "string") {
                    fn = data;
                    data = undefined;
                } else {
                    fn = data;
                    data = selector;
                    selector = undefined;
                }
            }
            if (fn === false) {
                fn = returnFalse;
            } else if (!fn) {
                return this;
            }
            if (one === 1) {
                origFn = fn;
                fn = function(event) {
                    jQuery().off(event);
                    return origFn.apply(this, arguments);
                };
                fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
            }
            return this.each(function() {
                jQuery.event.add(this, types, fn, data, selector);
            });
        },
        one: function(types, selector, data, fn) {
            return this.on(types, selector, data, fn, 1);
        },
        off: function(types, selector, fn) {
            var handleObj, type;
            if (types && types.preventDefault && types.handleObj) {
                handleObj = types.handleObj;
                jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
                return this;
            }
            if (typeof types === "object") {
                for (type in types) {
                    this.off(type, selector, types[type]);
                }
                return this;
            }
            if (selector === false || typeof selector === "function") {
                fn = selector;
                selector = undefined;
            }
            if (fn === false) {
                fn = returnFalse;
            }
            return this.each(function() {
                jQuery.event.remove(this, types, fn, selector);
            });
        },
        trigger: function(type, data) {
            return this.each(function() {
                jQuery.event.trigger(type, data, this);
            });
        },
        triggerHandler: function(type, data) {
            var elem = this[0];
            if (elem) {
                return jQuery.event.trigger(type, data, elem, true);
            }
        }
    });
    function createSafeFragment(document) {
        var list = nodeNames.split("|"), safeFrag = document.createDocumentFragment();
        if (safeFrag.createElement) {
            while (list.length) {
                safeFrag.createElement(list.pop());
            }
        }
        return safeFrag;
    }
    var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" + "header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g, rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"), rleadingWhitespace = /^\s+/, rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, rtagName = /<([\w:]+)/, rtbody = /<tbody/i, rhtml = /<|&#?\w+;/, rnoInnerhtml = /<(?:script|style|link)/i, rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i, rscriptType = /^$|\/(?:java|ecma)script/i, rscriptTypeMasked = /^true\/(.*)/, rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, wrapMap = {
        option: [ 1, "<select multiple='multiple'>", "</select>" ],
        legend: [ 1, "<fieldset>", "</fieldset>" ],
        area: [ 1, "<map>", "</map>" ],
        param: [ 1, "<object>", "</object>" ],
        thead: [ 1, "<table>", "</table>" ],
        tr: [ 2, "<table><tbody>", "</tbody></table>" ],
        col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
        td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
        _default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
    }, safeFragment = createSafeFragment(document), fragmentDiv = safeFragment.appendChild(document.createElement("div"));
    wrapMap.optgroup = wrapMap.option;
    wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
    wrapMap.th = wrapMap.td;
    function getAll(context, tag) {
        var elems, elem, i = 0, found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName(tag || "*") : typeof context.querySelectorAll !== strundefined ? context.querySelectorAll(tag || "*") : undefined;
        if (!found) {
            for (found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++) {
                if (!tag || jQuery.nodeName(elem, tag)) {
                    found.push(elem);
                } else {
                    jQuery.merge(found, getAll(elem, tag));
                }
            }
        }
        return tag === undefined || tag && jQuery.nodeName(context, tag) ? jQuery.merge([ context ], found) : found;
    }
    function fixDefaultChecked(elem) {
        if (rcheckableType.test(elem.type)) {
            elem.defaultChecked = elem.checked;
        }
    }
    function manipulationTarget(elem, content) {
        return jQuery.nodeName(elem, "table") && jQuery.nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr") ? elem.getElementsByTagName("tbody")[0] || elem.appendChild(elem.ownerDocument.createElement("tbody")) : elem;
    }
    function disableScript(elem) {
        elem.type = (jQuery.find.attr(elem, "type") !== null) + "/" + elem.type;
        return elem;
    }
    function restoreScript(elem) {
        var match = rscriptTypeMasked.exec(elem.type);
        if (match) {
            elem.type = match[1];
        } else {
            elem.removeAttribute("type");
        }
        return elem;
    }
    function setGlobalEval(elems, refElements) {
        var elem, i = 0;
        for (;(elem = elems[i]) != null; i++) {
            jQuery._data(elem, "globalEval", !refElements || jQuery._data(refElements[i], "globalEval"));
        }
    }
    function cloneCopyEvent(src, dest) {
        if (dest.nodeType !== 1 || !jQuery.hasData(src)) {
            return;
        }
        var type, i, l, oldData = jQuery._data(src), curData = jQuery._data(dest, oldData), events = oldData.events;
        if (events) {
            delete curData.handle;
            curData.events = {};
            for (type in events) {
                for (i = 0, l = events[type].length; i < l; i++) {
                    jQuery.event.add(dest, type, events[type][i]);
                }
            }
        }
        if (curData.data) {
            curData.data = jQuery.extend({}, curData.data);
        }
    }
    function fixCloneNodeIssues(src, dest) {
        var nodeName, e, data;
        if (dest.nodeType !== 1) {
            return;
        }
        nodeName = dest.nodeName.toLowerCase();
        if (!support.noCloneEvent && dest[jQuery.expando]) {
            data = jQuery._data(dest);
            for (e in data.events) {
                jQuery.removeEvent(dest, e, data.handle);
            }
            dest.removeAttribute(jQuery.expando);
        }
        if (nodeName === "script" && dest.text !== src.text) {
            disableScript(dest).text = src.text;
            restoreScript(dest);
        } else if (nodeName === "object") {
            if (dest.parentNode) {
                dest.outerHTML = src.outerHTML;
            }
            if (support.html5Clone && (src.innerHTML && !jQuery.trim(dest.innerHTML))) {
                dest.innerHTML = src.innerHTML;
            }
        } else if (nodeName === "input" && rcheckableType.test(src.type)) {
            dest.defaultChecked = dest.checked = src.checked;
            if (dest.value !== src.value) {
                dest.value = src.value;
            }
        } else if (nodeName === "option") {
            dest.defaultSelected = dest.selected = src.defaultSelected;
        } else if (nodeName === "input" || nodeName === "textarea") {
            dest.defaultValue = src.defaultValue;
        }
    }
    jQuery.extend({
        clone: function(elem, dataAndEvents, deepDataAndEvents) {
            var destElements, node, clone, i, srcElements, inPage = jQuery.contains(elem.ownerDocument, elem);
            if (support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test("<" + elem.nodeName + ">")) {
                clone = elem.cloneNode(true);
            } else {
                fragmentDiv.innerHTML = elem.outerHTML;
                fragmentDiv.removeChild(clone = fragmentDiv.firstChild);
            }
            if ((!support.noCloneEvent || !support.noCloneChecked) && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {
                destElements = getAll(clone);
                srcElements = getAll(elem);
                for (i = 0; (node = srcElements[i]) != null; ++i) {
                    if (destElements[i]) {
                        fixCloneNodeIssues(node, destElements[i]);
                    }
                }
            }
            if (dataAndEvents) {
                if (deepDataAndEvents) {
                    srcElements = srcElements || getAll(elem);
                    destElements = destElements || getAll(clone);
                    for (i = 0; (node = srcElements[i]) != null; i++) {
                        cloneCopyEvent(node, destElements[i]);
                    }
                } else {
                    cloneCopyEvent(elem, clone);
                }
            }
            destElements = getAll(clone, "script");
            if (destElements.length > 0) {
                setGlobalEval(destElements, !inPage && getAll(elem, "script"));
            }
            destElements = srcElements = node = null;
            return clone;
        },
        buildFragment: function(elems, context, scripts, selection) {
            var j, elem, contains, tmp, tag, tbody, wrap, l = elems.length, safe = createSafeFragment(context), nodes = [], i = 0;
            for (;i < l; i++) {
                elem = elems[i];
                if (elem || elem === 0) {
                    if (jQuery.type(elem) === "object") {
                        jQuery.merge(nodes, elem.nodeType ? [ elem ] : elem);
                    } else if (!rhtml.test(elem)) {
                        nodes.push(context.createTextNode(elem));
                    } else {
                        tmp = tmp || safe.appendChild(context.createElement("div"));
                        tag = (rtagName.exec(elem) || [ "", "" ])[1].toLowerCase();
                        wrap = wrapMap[tag] || wrapMap._default;
                        tmp.innerHTML = wrap[1] + elem.replace(rxhtmlTag, "<$1></$2>") + wrap[2];
                        j = wrap[0];
                        while (j--) {
                            tmp = tmp.lastChild;
                        }
                        if (!support.leadingWhitespace && rleadingWhitespace.test(elem)) {
                            nodes.push(context.createTextNode(rleadingWhitespace.exec(elem)[0]));
                        }
                        if (!support.tbody) {
                            elem = tag === "table" && !rtbody.test(elem) ? tmp.firstChild : wrap[1] === "<table>" && !rtbody.test(elem) ? tmp : 0;
                            j = elem && elem.childNodes.length;
                            while (j--) {
                                if (jQuery.nodeName(tbody = elem.childNodes[j], "tbody") && !tbody.childNodes.length) {
                                    elem.removeChild(tbody);
                                }
                            }
                        }
                        jQuery.merge(nodes, tmp.childNodes);
                        tmp.textContent = "";
                        while (tmp.firstChild) {
                            tmp.removeChild(tmp.firstChild);
                        }
                        tmp = safe.lastChild;
                    }
                }
            }
            if (tmp) {
                safe.removeChild(tmp);
            }
            if (!support.appendChecked) {
                jQuery.grep(getAll(nodes, "input"), fixDefaultChecked);
            }
            i = 0;
            while (elem = nodes[i++]) {
                if (selection && jQuery.inArray(elem, selection) !== -1) {
                    continue;
                }
                contains = jQuery.contains(elem.ownerDocument, elem);
                tmp = getAll(safe.appendChild(elem), "script");
                if (contains) {
                    setGlobalEval(tmp);
                }
                if (scripts) {
                    j = 0;
                    while (elem = tmp[j++]) {
                        if (rscriptType.test(elem.type || "")) {
                            scripts.push(elem);
                        }
                    }
                }
            }
            tmp = null;
            return safe;
        },
        cleanData: function(elems, acceptData) {
            var elem, type, id, data, i = 0, internalKey = jQuery.expando, cache = jQuery.cache, deleteExpando = support.deleteExpando, special = jQuery.event.special;
            for (;(elem = elems[i]) != null; i++) {
                if (acceptData || jQuery.acceptData(elem)) {
                    id = elem[internalKey];
                    data = id && cache[id];
                    if (data) {
                        if (data.events) {
                            for (type in data.events) {
                                if (special[type]) {
                                    jQuery.event.remove(elem, type);
                                } else {
                                    jQuery.removeEvent(elem, type, data.handle);
                                }
                            }
                        }
                        if (cache[id]) {
                            delete cache[id];
                            if (deleteExpando) {
                                delete elem[internalKey];
                            } else if (typeof elem.removeAttribute !== strundefined) {
                                elem.removeAttribute(internalKey);
                            } else {
                                elem[internalKey] = null;
                            }
                            deletedIds.push(id);
                        }
                    }
                }
            }
        }
    });
    jQuery.fn.extend({
        text: function(value) {
            return access(this, function(value) {
                return value === undefined ? jQuery.text(this) : this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(value));
            }, null, value, arguments.length);
        },
        append: function() {
            return this.domManip(arguments, function(elem) {
                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                    var target = manipulationTarget(this, elem);
                    target.appendChild(elem);
                }
            });
        },
        prepend: function() {
            return this.domManip(arguments, function(elem) {
                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                    var target = manipulationTarget(this, elem);
                    target.insertBefore(elem, target.firstChild);
                }
            });
        },
        before: function() {
            return this.domManip(arguments, function(elem) {
                if (this.parentNode) {
                    this.parentNode.insertBefore(elem, this);
                }
            });
        },
        after: function() {
            return this.domManip(arguments, function(elem) {
                if (this.parentNode) {
                    this.parentNode.insertBefore(elem, this.nextSibling);
                }
            });
        },
        remove: function(selector, keepData) {
            var elem, elems = selector ? jQuery.filter(selector, this) : this, i = 0;
            for (;(elem = elems[i]) != null; i++) {
                if (!keepData && elem.nodeType === 1) {
                    jQuery.cleanData(getAll(elem));
                }
                if (elem.parentNode) {
                    if (keepData && jQuery.contains(elem.ownerDocument, elem)) {
                        setGlobalEval(getAll(elem, "script"));
                    }
                    elem.parentNode.removeChild(elem);
                }
            }
            return this;
        },
        empty: function() {
            var elem, i = 0;
            for (;(elem = this[i]) != null; i++) {
                if (elem.nodeType === 1) {
                    jQuery.cleanData(getAll(elem, false));
                }
                while (elem.firstChild) {
                    elem.removeChild(elem.firstChild);
                }
                if (elem.options && jQuery.nodeName(elem, "select")) {
                    elem.options.length = 0;
                }
            }
            return this;
        },
        clone: function(dataAndEvents, deepDataAndEvents) {
            dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
            deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
            return this.map(function() {
                return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
            });
        },
        html: function(value) {
            return access(this, function(value) {
                var elem = this[0] || {}, i = 0, l = this.length;
                if (value === undefined) {
                    return elem.nodeType === 1 ? elem.innerHTML.replace(rinlinejQuery, "") : undefined;
                }
                if (typeof value === "string" && !rnoInnerhtml.test(value) && (support.htmlSerialize || !rnoshimcache.test(value)) && (support.leadingWhitespace || !rleadingWhitespace.test(value)) && !wrapMap[(rtagName.exec(value) || [ "", "" ])[1].toLowerCase()]) {
                    value = value.replace(rxhtmlTag, "<$1></$2>");
                    try {
                        for (;i < l; i++) {
                            elem = this[i] || {};
                            if (elem.nodeType === 1) {
                                jQuery.cleanData(getAll(elem, false));
                                elem.innerHTML = value;
                            }
                        }
                        elem = 0;
                    } catch (e) {}
                }
                if (elem) {
                    this.empty().append(value);
                }
            }, null, value, arguments.length);
        },
        replaceWith: function() {
            var arg = arguments[0];
            this.domManip(arguments, function(elem) {
                arg = this.parentNode;
                jQuery.cleanData(getAll(this));
                if (arg) {
                    arg.replaceChild(elem, this);
                }
            });
            return arg && (arg.length || arg.nodeType) ? this : this.remove();
        },
        detach: function(selector) {
            return this.remove(selector, true);
        },
        domManip: function(args, callback) {
            args = concat.apply([], args);
            var first, node, hasScripts, scripts, doc, fragment, i = 0, l = this.length, set = this, iNoClone = l - 1, value = args[0], isFunction = jQuery.isFunction(value);
            if (isFunction || l > 1 && typeof value === "string" && !support.checkClone && rchecked.test(value)) {
                return this.each(function(index) {
                    var self = set.eq(index);
                    if (isFunction) {
                        args[0] = value.call(this, index, self.html());
                    }
                    self.domManip(args, callback);
                });
            }
            if (l) {
                fragment = jQuery.buildFragment(args, this[0].ownerDocument, false, this);
                first = fragment.firstChild;
                if (fragment.childNodes.length === 1) {
                    fragment = first;
                }
                if (first) {
                    scripts = jQuery.map(getAll(fragment, "script"), disableScript);
                    hasScripts = scripts.length;
                    for (;i < l; i++) {
                        node = fragment;
                        if (i !== iNoClone) {
                            node = jQuery.clone(node, true, true);
                            if (hasScripts) {
                                jQuery.merge(scripts, getAll(node, "script"));
                            }
                        }
                        callback.call(this[i], node, i);
                    }
                    if (hasScripts) {
                        doc = scripts[scripts.length - 1].ownerDocument;
                        jQuery.map(scripts, restoreScript);
                        for (i = 0; i < hasScripts; i++) {
                            node = scripts[i];
                            if (rscriptType.test(node.type || "") && !jQuery._data(node, "globalEval") && jQuery.contains(doc, node)) {
                                if (node.src) {
                                    if (jQuery._evalUrl) {
                                        jQuery._evalUrl(node.src);
                                    }
                                } else {
                                    jQuery.globalEval((node.text || node.textContent || node.innerHTML || "").replace(rcleanScript, ""));
                                }
                            }
                        }
                    }
                    fragment = first = null;
                }
            }
            return this;
        }
    });
    jQuery.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(name, original) {
        jQuery.fn[name] = function(selector) {
            var elems, i = 0, ret = [], insert = jQuery(selector), last = insert.length - 1;
            for (;i <= last; i++) {
                elems = i === last ? this : this.clone(true);
                jQuery(insert[i])[original](elems);
                push.apply(ret, elems.get());
            }
            return this.pushStack(ret);
        };
    });
    var iframe, elemdisplay = {};
    function actualDisplay(name, doc) {
        var style, elem = jQuery(doc.createElement(name)).appendTo(doc.body), display = window.getDefaultComputedStyle && (style = window.getDefaultComputedStyle(elem[0])) ? style.display : jQuery.css(elem[0], "display");
        elem.detach();
        return display;
    }
    function defaultDisplay(nodeName) {
        var doc = document, display = elemdisplay[nodeName];
        if (!display) {
            display = actualDisplay(nodeName, doc);
            if (display === "none" || !display) {
                iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>")).appendTo(doc.documentElement);
                doc = (iframe[0].contentWindow || iframe[0].contentDocument).document;
                doc.write();
                doc.close();
                display = actualDisplay(nodeName, doc);
                iframe.detach();
            }
            elemdisplay[nodeName] = display;
        }
        return display;
    }
    (function() {
        var shrinkWrapBlocksVal;
        support.shrinkWrapBlocks = function() {
            if (shrinkWrapBlocksVal != null) {
                return shrinkWrapBlocksVal;
            }
            shrinkWrapBlocksVal = false;
            var div, body, container;
            body = document.getElementsByTagName("body")[0];
            if (!body || !body.style) {
                return;
            }
            div = document.createElement("div");
            container = document.createElement("div");
            container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
            body.appendChild(container).appendChild(div);
            if (typeof div.style.zoom !== strundefined) {
                div.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" + "box-sizing:content-box;display:block;margin:0;border:0;" + "padding:1px;width:1px;zoom:1";
                div.appendChild(document.createElement("div")).style.width = "5px";
                shrinkWrapBlocksVal = div.offsetWidth !== 3;
            }
            body.removeChild(container);
            return shrinkWrapBlocksVal;
        };
    })();
    var rmargin = /^margin/;
    var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");
    var getStyles, curCSS, rposition = /^(top|right|bottom|left)$/;
    if (window.getComputedStyle) {
        getStyles = function(elem) {
            return elem.ownerDocument.defaultView.getComputedStyle(elem, null);
        };
        curCSS = function(elem, name, computed) {
            var width, minWidth, maxWidth, ret, style = elem.style;
            computed = computed || getStyles(elem);
            ret = computed ? computed.getPropertyValue(name) || computed[name] : undefined;
            if (computed) {
                if (ret === "" && !jQuery.contains(elem.ownerDocument, elem)) {
                    ret = jQuery.style(elem, name);
                }
                if (rnumnonpx.test(ret) && rmargin.test(name)) {
                    width = style.width;
                    minWidth = style.minWidth;
                    maxWidth = style.maxWidth;
                    style.minWidth = style.maxWidth = style.width = ret;
                    ret = computed.width;
                    style.width = width;
                    style.minWidth = minWidth;
                    style.maxWidth = maxWidth;
                }
            }
            return ret === undefined ? ret : ret + "";
        };
    } else if (document.documentElement.currentStyle) {
        getStyles = function(elem) {
            return elem.currentStyle;
        };
        curCSS = function(elem, name, computed) {
            var left, rs, rsLeft, ret, style = elem.style;
            computed = computed || getStyles(elem);
            ret = computed ? computed[name] : undefined;
            if (ret == null && style && style[name]) {
                ret = style[name];
            }
            if (rnumnonpx.test(ret) && !rposition.test(name)) {
                left = style.left;
                rs = elem.runtimeStyle;
                rsLeft = rs && rs.left;
                if (rsLeft) {
                    rs.left = elem.currentStyle.left;
                }
                style.left = name === "fontSize" ? "1em" : ret;
                ret = style.pixelLeft + "px";
                style.left = left;
                if (rsLeft) {
                    rs.left = rsLeft;
                }
            }
            return ret === undefined ? ret : ret + "" || "auto";
        };
    }
    function addGetHookIf(conditionFn, hookFn) {
        return {
            get: function() {
                var condition = conditionFn();
                if (condition == null) {
                    return;
                }
                if (condition) {
                    delete this.get;
                    return;
                }
                return (this.get = hookFn).apply(this, arguments);
            }
        };
    }
    (function() {
        var div, style, a, pixelPositionVal, boxSizingReliableVal, reliableHiddenOffsetsVal, reliableMarginRightVal;
        div = document.createElement("div");
        div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
        a = div.getElementsByTagName("a")[0];
        style = a && a.style;
        if (!style) {
            return;
        }
        style.cssText = "float:left;opacity:.5";
        support.opacity = style.opacity === "0.5";
        support.cssFloat = !!style.cssFloat;
        div.style.backgroundClip = "content-box";
        div.cloneNode(true).style.backgroundClip = "";
        support.clearCloneStyle = div.style.backgroundClip === "content-box";
        support.boxSizing = style.boxSizing === "" || style.MozBoxSizing === "" || style.WebkitBoxSizing === "";
        jQuery.extend(support, {
            reliableHiddenOffsets: function() {
                if (reliableHiddenOffsetsVal == null) {
                    computeStyleTests();
                }
                return reliableHiddenOffsetsVal;
            },
            boxSizingReliable: function() {
                if (boxSizingReliableVal == null) {
                    computeStyleTests();
                }
                return boxSizingReliableVal;
            },
            pixelPosition: function() {
                if (pixelPositionVal == null) {
                    computeStyleTests();
                }
                return pixelPositionVal;
            },
            reliableMarginRight: function() {
                if (reliableMarginRightVal == null) {
                    computeStyleTests();
                }
                return reliableMarginRightVal;
            }
        });
        function computeStyleTests() {
            var div, body, container, contents;
            body = document.getElementsByTagName("body")[0];
            if (!body || !body.style) {
                return;
            }
            div = document.createElement("div");
            container = document.createElement("div");
            container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
            body.appendChild(container).appendChild(div);
            div.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" + "box-sizing:border-box;display:block;margin-top:1%;top:1%;" + "border:1px;padding:1px;width:4px;position:absolute";
            pixelPositionVal = boxSizingReliableVal = false;
            reliableMarginRightVal = true;
            if (window.getComputedStyle) {
                pixelPositionVal = (window.getComputedStyle(div, null) || {}).top !== "1%";
                boxSizingReliableVal = (window.getComputedStyle(div, null) || {
                    width: "4px"
                }).width === "4px";
                contents = div.appendChild(document.createElement("div"));
                contents.style.cssText = div.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" + "box-sizing:content-box;display:block;margin:0;border:0;padding:0";
                contents.style.marginRight = contents.style.width = "0";
                div.style.width = "1px";
                reliableMarginRightVal = !parseFloat((window.getComputedStyle(contents, null) || {}).marginRight);
            }
            div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
            contents = div.getElementsByTagName("td");
            contents[0].style.cssText = "margin:0;border:0;padding:0;display:none";
            reliableHiddenOffsetsVal = contents[0].offsetHeight === 0;
            if (reliableHiddenOffsetsVal) {
                contents[0].style.display = "";
                contents[1].style.display = "none";
                reliableHiddenOffsetsVal = contents[0].offsetHeight === 0;
            }
            body.removeChild(container);
        }
    })();
    jQuery.swap = function(elem, options, callback, args) {
        var ret, name, old = {};
        for (name in options) {
            old[name] = elem.style[name];
            elem.style[name] = options[name];
        }
        ret = callback.apply(elem, args || []);
        for (name in options) {
            elem.style[name] = old[name];
        }
        return ret;
    };
    var ralpha = /alpha\([^)]*\)/i, ropacity = /opacity\s*=\s*([^)]*)/, rdisplayswap = /^(none|table(?!-c[ea]).+)/, rnumsplit = new RegExp("^(" + pnum + ")(.*)$", "i"), rrelNum = new RegExp("^([+-])=(" + pnum + ")", "i"), cssShow = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }, cssNormalTransform = {
        letterSpacing: "0",
        fontWeight: "400"
    }, cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];
    function vendorPropName(style, name) {
        if (name in style) {
            return name;
        }
        var capName = name.charAt(0).toUpperCase() + name.slice(1), origName = name, i = cssPrefixes.length;
        while (i--) {
            name = cssPrefixes[i] + capName;
            if (name in style) {
                return name;
            }
        }
        return origName;
    }
    function showHide(elements, show) {
        var display, elem, hidden, values = [], index = 0, length = elements.length;
        for (;index < length; index++) {
            elem = elements[index];
            if (!elem.style) {
                continue;
            }
            values[index] = jQuery._data(elem, "olddisplay");
            display = elem.style.display;
            if (show) {
                if (!values[index] && display === "none") {
                    elem.style.display = "";
                }
                if (elem.style.display === "" && isHidden(elem)) {
                    values[index] = jQuery._data(elem, "olddisplay", defaultDisplay(elem.nodeName));
                }
            } else {
                hidden = isHidden(elem);
                if (display && display !== "none" || !hidden) {
                    jQuery._data(elem, "olddisplay", hidden ? display : jQuery.css(elem, "display"));
                }
            }
        }
        for (index = 0; index < length; index++) {
            elem = elements[index];
            if (!elem.style) {
                continue;
            }
            if (!show || elem.style.display === "none" || elem.style.display === "") {
                elem.style.display = show ? values[index] || "" : "none";
            }
        }
        return elements;
    }
    function setPositiveNumber(elem, value, subtract) {
        var matches = rnumsplit.exec(value);
        return matches ? Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || "px") : value;
    }
    function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
        var i = extra === (isBorderBox ? "border" : "content") ? 4 : name === "width" ? 1 : 0, val = 0;
        for (;i < 4; i += 2) {
            if (extra === "margin") {
                val += jQuery.css(elem, extra + cssExpand[i], true, styles);
            }
            if (isBorderBox) {
                if (extra === "content") {
                    val -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
                }
                if (extra !== "margin") {
                    val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
                }
            } else {
                val += jQuery.css(elem, "padding" + cssExpand[i], true, styles);
                if (extra !== "padding") {
                    val += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
                }
            }
        }
        return val;
    }
    function getWidthOrHeight(elem, name, extra) {
        var valueIsBorderBox = true, val = name === "width" ? elem.offsetWidth : elem.offsetHeight, styles = getStyles(elem), isBorderBox = support.boxSizing && jQuery.css(elem, "boxSizing", false, styles) === "border-box";
        if (val <= 0 || val == null) {
            val = curCSS(elem, name, styles);
            if (val < 0 || val == null) {
                val = elem.style[name];
            }
            if (rnumnonpx.test(val)) {
                return val;
            }
            valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]);
            val = parseFloat(val) || 0;
        }
        return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles) + "px";
    }
    jQuery.extend({
        cssHooks: {
            opacity: {
                get: function(elem, computed) {
                    if (computed) {
                        var ret = curCSS(elem, "opacity");
                        return ret === "" ? "1" : ret;
                    }
                }
            }
        },
        cssNumber: {
            columnCount: true,
            fillOpacity: true,
            flexGrow: true,
            flexShrink: true,
            fontWeight: true,
            lineHeight: true,
            opacity: true,
            order: true,
            orphans: true,
            widows: true,
            zIndex: true,
            zoom: true
        },
        cssProps: {
            "float": support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(elem, name, value, extra) {
            if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
                return;
            }
            var ret, type, hooks, origName = jQuery.camelCase(name), style = elem.style;
            name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(style, origName));
            hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
            if (value !== undefined) {
                type = typeof value;
                if (type === "string" && (ret = rrelNum.exec(value))) {
                    value = (ret[1] + 1) * ret[2] + parseFloat(jQuery.css(elem, name));
                    type = "number";
                }
                if (value == null || value !== value) {
                    return;
                }
                if (type === "number" && !jQuery.cssNumber[origName]) {
                    value += "px";
                }
                if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
                    style[name] = "inherit";
                }
                if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {
                    try {
                        style[name] = value;
                    } catch (e) {}
                }
            } else {
                if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {
                    return ret;
                }
                return style[name];
            }
        },
        css: function(elem, name, extra, styles) {
            var num, val, hooks, origName = jQuery.camelCase(name);
            name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(elem.style, origName));
            hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
            if (hooks && "get" in hooks) {
                val = hooks.get(elem, true, extra);
            }
            if (val === undefined) {
                val = curCSS(elem, name, styles);
            }
            if (val === "normal" && name in cssNormalTransform) {
                val = cssNormalTransform[name];
            }
            if (extra === "" || extra) {
                num = parseFloat(val);
                return extra === true || jQuery.isNumeric(num) ? num || 0 : val;
            }
            return val;
        }
    });
    jQuery.each([ "height", "width" ], function(i, name) {
        jQuery.cssHooks[name] = {
            get: function(elem, computed, extra) {
                if (computed) {
                    return rdisplayswap.test(jQuery.css(elem, "display")) && elem.offsetWidth === 0 ? jQuery.swap(elem, cssShow, function() {
                        return getWidthOrHeight(elem, name, extra);
                    }) : getWidthOrHeight(elem, name, extra);
                }
            },
            set: function(elem, value, extra) {
                var styles = extra && getStyles(elem);
                return setPositiveNumber(elem, value, extra ? augmentWidthOrHeight(elem, name, extra, support.boxSizing && jQuery.css(elem, "boxSizing", false, styles) === "border-box", styles) : 0);
            }
        };
    });
    if (!support.opacity) {
        jQuery.cssHooks.opacity = {
            get: function(elem, computed) {
                return ropacity.test((computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : computed ? "1" : "";
            },
            set: function(elem, value) {
                var style = elem.style, currentStyle = elem.currentStyle, opacity = jQuery.isNumeric(value) ? "alpha(opacity=" + value * 100 + ")" : "", filter = currentStyle && currentStyle.filter || style.filter || "";
                style.zoom = 1;
                if ((value >= 1 || value === "") && jQuery.trim(filter.replace(ralpha, "")) === "" && style.removeAttribute) {
                    style.removeAttribute("filter");
                    if (value === "" || currentStyle && !currentStyle.filter) {
                        return;
                    }
                }
                style.filter = ralpha.test(filter) ? filter.replace(ralpha, opacity) : filter + " " + opacity;
            }
        };
    }
    jQuery.cssHooks.marginRight = addGetHookIf(support.reliableMarginRight, function(elem, computed) {
        if (computed) {
            return jQuery.swap(elem, {
                display: "inline-block"
            }, curCSS, [ elem, "marginRight" ]);
        }
    });
    jQuery.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(prefix, suffix) {
        jQuery.cssHooks[prefix + suffix] = {
            expand: function(value) {
                var i = 0, expanded = {}, parts = typeof value === "string" ? value.split(" ") : [ value ];
                for (;i < 4; i++) {
                    expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
                }
                return expanded;
            }
        };
        if (!rmargin.test(prefix)) {
            jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
        }
    });
    jQuery.fn.extend({
        css: function(name, value) {
            return access(this, function(elem, name, value) {
                var styles, len, map = {}, i = 0;
                if (jQuery.isArray(name)) {
                    styles = getStyles(elem);
                    len = name.length;
                    for (;i < len; i++) {
                        map[name[i]] = jQuery.css(elem, name[i], false, styles);
                    }
                    return map;
                }
                return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
            }, name, value, arguments.length > 1);
        },
        show: function() {
            return showHide(this, true);
        },
        hide: function() {
            return showHide(this);
        },
        toggle: function(state) {
            if (typeof state === "boolean") {
                return state ? this.show() : this.hide();
            }
            return this.each(function() {
                if (isHidden(this)) {
                    jQuery(this).show();
                } else {
                    jQuery(this).hide();
                }
            });
        }
    });
    function Tween(elem, options, prop, end, easing) {
        return new Tween.prototype.init(elem, options, prop, end, easing);
    }
    jQuery.Tween = Tween;
    Tween.prototype = {
        constructor: Tween,
        init: function(elem, options, prop, end, easing, unit) {
            this.elem = elem;
            this.prop = prop;
            this.easing = easing || "swing";
            this.options = options;
            this.start = this.now = this.cur();
            this.end = end;
            this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
        },
        cur: function() {
            var hooks = Tween.propHooks[this.prop];
            return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
        },
        run: function(percent) {
            var eased, hooks = Tween.propHooks[this.prop];
            if (this.options.duration) {
                this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration);
            } else {
                this.pos = eased = percent;
            }
            this.now = (this.end - this.start) * eased + this.start;
            if (this.options.step) {
                this.options.step.call(this.elem, this.now, this);
            }
            if (hooks && hooks.set) {
                hooks.set(this);
            } else {
                Tween.propHooks._default.set(this);
            }
            return this;
        }
    };
    Tween.prototype.init.prototype = Tween.prototype;
    Tween.propHooks = {
        _default: {
            get: function(tween) {
                var result;
                if (tween.elem[tween.prop] != null && (!tween.elem.style || tween.elem.style[tween.prop] == null)) {
                    return tween.elem[tween.prop];
                }
                result = jQuery.css(tween.elem, tween.prop, "");
                return !result || result === "auto" ? 0 : result;
            },
            set: function(tween) {
                if (jQuery.fx.step[tween.prop]) {
                    jQuery.fx.step[tween.prop](tween);
                } else if (tween.elem.style && (tween.elem.style[jQuery.cssProps[tween.prop]] != null || jQuery.cssHooks[tween.prop])) {
                    jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
                } else {
                    tween.elem[tween.prop] = tween.now;
                }
            }
        }
    };
    Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
        set: function(tween) {
            if (tween.elem.nodeType && tween.elem.parentNode) {
                tween.elem[tween.prop] = tween.now;
            }
        }
    };
    jQuery.easing = {
        linear: function(p) {
            return p;
        },
        swing: function(p) {
            return .5 - Math.cos(p * Math.PI) / 2;
        }
    };
    jQuery.fx = Tween.prototype.init;
    jQuery.fx.step = {};
    var fxNow, timerId, rfxtypes = /^(?:toggle|show|hide)$/, rfxnum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i"), rrun = /queueHooks$/, animationPrefilters = [ defaultPrefilter ], tweeners = {
        "*": [ function(prop, value) {
            var tween = this.createTween(prop, value), target = tween.cur(), parts = rfxnum.exec(value), unit = parts && parts[3] || (jQuery.cssNumber[prop] ? "" : "px"), start = (jQuery.cssNumber[prop] || unit !== "px" && +target) && rfxnum.exec(jQuery.css(tween.elem, prop)), scale = 1, maxIterations = 20;
            if (start && start[3] !== unit) {
                unit = unit || start[3];
                parts = parts || [];
                start = +target || 1;
                do {
                    scale = scale || ".5";
                    start = start / scale;
                    jQuery.style(tween.elem, prop, start + unit);
                } while (scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations);
            }
            if (parts) {
                start = tween.start = +start || +target || 0;
                tween.unit = unit;
                tween.end = parts[1] ? start + (parts[1] + 1) * parts[2] : +parts[2];
            }
            return tween;
        } ]
    };
    function createFxNow() {
        setTimeout(function() {
            fxNow = undefined;
        });
        return fxNow = jQuery.now();
    }
    function genFx(type, includeWidth) {
        var which, attrs = {
            height: type
        }, i = 0;
        includeWidth = includeWidth ? 1 : 0;
        for (;i < 4; i += 2 - includeWidth) {
            which = cssExpand[i];
            attrs["margin" + which] = attrs["padding" + which] = type;
        }
        if (includeWidth) {
            attrs.opacity = attrs.width = type;
        }
        return attrs;
    }
    function createTween(value, prop, animation) {
        var tween, collection = (tweeners[prop] || []).concat(tweeners["*"]), index = 0, length = collection.length;
        for (;index < length; index++) {
            if (tween = collection[index].call(animation, prop, value)) {
                return tween;
            }
        }
    }
    function defaultPrefilter(elem, props, opts) {
        var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay, anim = this, orig = {}, style = elem.style, hidden = elem.nodeType && isHidden(elem), dataShow = jQuery._data(elem, "fxshow");
        if (!opts.queue) {
            hooks = jQuery._queueHooks(elem, "fx");
            if (hooks.unqueued == null) {
                hooks.unqueued = 0;
                oldfire = hooks.empty.fire;
                hooks.empty.fire = function() {
                    if (!hooks.unqueued) {
                        oldfire();
                    }
                };
            }
            hooks.unqueued++;
            anim.always(function() {
                anim.always(function() {
                    hooks.unqueued--;
                    if (!jQuery.queue(elem, "fx").length) {
                        hooks.empty.fire();
                    }
                });
            });
        }
        if (elem.nodeType === 1 && ("height" in props || "width" in props)) {
            opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];
            display = jQuery.css(elem, "display");
            checkDisplay = display === "none" ? jQuery._data(elem, "olddisplay") || defaultDisplay(elem.nodeName) : display;
            if (checkDisplay === "inline" && jQuery.css(elem, "float") === "none") {
                if (!support.inlineBlockNeedsLayout || defaultDisplay(elem.nodeName) === "inline") {
                    style.display = "inline-block";
                } else {
                    style.zoom = 1;
                }
            }
        }
        if (opts.overflow) {
            style.overflow = "hidden";
            if (!support.shrinkWrapBlocks()) {
                anim.always(function() {
                    style.overflow = opts.overflow[0];
                    style.overflowX = opts.overflow[1];
                    style.overflowY = opts.overflow[2];
                });
            }
        }
        for (prop in props) {
            value = props[prop];
            if (rfxtypes.exec(value)) {
                delete props[prop];
                toggle = toggle || value === "toggle";
                if (value === (hidden ? "hide" : "show")) {
                    if (value === "show" && dataShow && dataShow[prop] !== undefined) {
                        hidden = true;
                    } else {
                        continue;
                    }
                }
                orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
            } else {
                display = undefined;
            }
        }
        if (!jQuery.isEmptyObject(orig)) {
            if (dataShow) {
                if ("hidden" in dataShow) {
                    hidden = dataShow.hidden;
                }
            } else {
                dataShow = jQuery._data(elem, "fxshow", {});
            }
            if (toggle) {
                dataShow.hidden = !hidden;
            }
            if (hidden) {
                jQuery(elem).show();
            } else {
                anim.done(function() {
                    jQuery(elem).hide();
                });
            }
            anim.done(function() {
                var prop;
                jQuery._removeData(elem, "fxshow");
                for (prop in orig) {
                    jQuery.style(elem, prop, orig[prop]);
                }
            });
            for (prop in orig) {
                tween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
                if (!(prop in dataShow)) {
                    dataShow[prop] = tween.start;
                    if (hidden) {
                        tween.end = tween.start;
                        tween.start = prop === "width" || prop === "height" ? 1 : 0;
                    }
                }
            }
        } else if ((display === "none" ? defaultDisplay(elem.nodeName) : display) === "inline") {
            style.display = display;
        }
    }
    function propFilter(props, specialEasing) {
        var index, name, easing, value, hooks;
        for (index in props) {
            name = jQuery.camelCase(index);
            easing = specialEasing[name];
            value = props[index];
            if (jQuery.isArray(value)) {
                easing = value[1];
                value = props[index] = value[0];
            }
            if (index !== name) {
                props[name] = value;
                delete props[index];
            }
            hooks = jQuery.cssHooks[name];
            if (hooks && "expand" in hooks) {
                value = hooks.expand(value);
                delete props[name];
                for (index in value) {
                    if (!(index in props)) {
                        props[index] = value[index];
                        specialEasing[index] = easing;
                    }
                }
            } else {
                specialEasing[name] = easing;
            }
        }
    }
    function Animation(elem, properties, options) {
        var result, stopped, index = 0, length = animationPrefilters.length, deferred = jQuery.Deferred().always(function() {
            delete tick.elem;
        }), tick = function() {
            if (stopped) {
                return false;
            }
            var currentTime = fxNow || createFxNow(), remaining = Math.max(0, animation.startTime + animation.duration - currentTime), temp = remaining / animation.duration || 0, percent = 1 - temp, index = 0, length = animation.tweens.length;
            for (;index < length; index++) {
                animation.tweens[index].run(percent);
            }
            deferred.notifyWith(elem, [ animation, percent, remaining ]);
            if (percent < 1 && length) {
                return remaining;
            } else {
                deferred.resolveWith(elem, [ animation ]);
                return false;
            }
        }, animation = deferred.promise({
            elem: elem,
            props: jQuery.extend({}, properties),
            opts: jQuery.extend(true, {
                specialEasing: {}
            }, options),
            originalProperties: properties,
            originalOptions: options,
            startTime: fxNow || createFxNow(),
            duration: options.duration,
            tweens: [],
            createTween: function(prop, end) {
                var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
                animation.tweens.push(tween);
                return tween;
            },
            stop: function(gotoEnd) {
                var index = 0, length = gotoEnd ? animation.tweens.length : 0;
                if (stopped) {
                    return this;
                }
                stopped = true;
                for (;index < length; index++) {
                    animation.tweens[index].run(1);
                }
                if (gotoEnd) {
                    deferred.resolveWith(elem, [ animation, gotoEnd ]);
                } else {
                    deferred.rejectWith(elem, [ animation, gotoEnd ]);
                }
                return this;
            }
        }), props = animation.props;
        propFilter(props, animation.opts.specialEasing);
        for (;index < length; index++) {
            result = animationPrefilters[index].call(animation, elem, props, animation.opts);
            if (result) {
                return result;
            }
        }
        jQuery.map(props, createTween, animation);
        if (jQuery.isFunction(animation.opts.start)) {
            animation.opts.start.call(elem, animation);
        }
        jQuery.fx.timer(jQuery.extend(tick, {
            elem: elem,
            anim: animation,
            queue: animation.opts.queue
        }));
        return animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
    }
    jQuery.Animation = jQuery.extend(Animation, {
        tweener: function(props, callback) {
            if (jQuery.isFunction(props)) {
                callback = props;
                props = [ "*" ];
            } else {
                props = props.split(" ");
            }
            var prop, index = 0, length = props.length;
            for (;index < length; index++) {
                prop = props[index];
                tweeners[prop] = tweeners[prop] || [];
                tweeners[prop].unshift(callback);
            }
        },
        prefilter: function(callback, prepend) {
            if (prepend) {
                animationPrefilters.unshift(callback);
            } else {
                animationPrefilters.push(callback);
            }
        }
    });
    jQuery.speed = function(speed, easing, fn) {
        var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
            complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
            duration: speed,
            easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
        };
        opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;
        if (opt.queue == null || opt.queue === true) {
            opt.queue = "fx";
        }
        opt.old = opt.complete;
        opt.complete = function() {
            if (jQuery.isFunction(opt.old)) {
                opt.old.call(this);
            }
            if (opt.queue) {
                jQuery.dequeue(this, opt.queue);
            }
        };
        return opt;
    };
    jQuery.fn.extend({
        fadeTo: function(speed, to, easing, callback) {
            return this.filter(isHidden).css("opacity", 0).show().end().animate({
                opacity: to
            }, speed, easing, callback);
        },
        animate: function(prop, speed, easing, callback) {
            var empty = jQuery.isEmptyObject(prop), optall = jQuery.speed(speed, easing, callback), doAnimation = function() {
                var anim = Animation(this, jQuery.extend({}, prop), optall);
                if (empty || jQuery._data(this, "finish")) {
                    anim.stop(true);
                }
            };
            doAnimation.finish = doAnimation;
            return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
        },
        stop: function(type, clearQueue, gotoEnd) {
            var stopQueue = function(hooks) {
                var stop = hooks.stop;
                delete hooks.stop;
                stop(gotoEnd);
            };
            if (typeof type !== "string") {
                gotoEnd = clearQueue;
                clearQueue = type;
                type = undefined;
            }
            if (clearQueue && type !== false) {
                this.queue(type || "fx", []);
            }
            return this.each(function() {
                var dequeue = true, index = type != null && type + "queueHooks", timers = jQuery.timers, data = jQuery._data(this);
                if (index) {
                    if (data[index] && data[index].stop) {
                        stopQueue(data[index]);
                    }
                } else {
                    for (index in data) {
                        if (data[index] && data[index].stop && rrun.test(index)) {
                            stopQueue(data[index]);
                        }
                    }
                }
                for (index = timers.length; index--; ) {
                    if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
                        timers[index].anim.stop(gotoEnd);
                        dequeue = false;
                        timers.splice(index, 1);
                    }
                }
                if (dequeue || !gotoEnd) {
                    jQuery.dequeue(this, type);
                }
            });
        },
        finish: function(type) {
            if (type !== false) {
                type = type || "fx";
            }
            return this.each(function() {
                var index, data = jQuery._data(this), queue = data[type + "queue"], hooks = data[type + "queueHooks"], timers = jQuery.timers, length = queue ? queue.length : 0;
                data.finish = true;
                jQuery.queue(this, type, []);
                if (hooks && hooks.stop) {
                    hooks.stop.call(this, true);
                }
                for (index = timers.length; index--; ) {
                    if (timers[index].elem === this && timers[index].queue === type) {
                        timers[index].anim.stop(true);
                        timers.splice(index, 1);
                    }
                }
                for (index = 0; index < length; index++) {
                    if (queue[index] && queue[index].finish) {
                        queue[index].finish.call(this);
                    }
                }
                delete data.finish;
            });
        }
    });
    jQuery.each([ "toggle", "show", "hide" ], function(i, name) {
        var cssFn = jQuery.fn[name];
        jQuery.fn[name] = function(speed, easing, callback) {
            return speed == null || typeof speed === "boolean" ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback);
        };
    });
    jQuery.each({
        slideDown: genFx("show"),
        slideUp: genFx("hide"),
        slideToggle: genFx("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(name, props) {
        jQuery.fn[name] = function(speed, easing, callback) {
            return this.animate(props, speed, easing, callback);
        };
    });
    jQuery.timers = [];
    jQuery.fx.tick = function() {
        var timer, timers = jQuery.timers, i = 0;
        fxNow = jQuery.now();
        for (;i < timers.length; i++) {
            timer = timers[i];
            if (!timer() && timers[i] === timer) {
                timers.splice(i--, 1);
            }
        }
        if (!timers.length) {
            jQuery.fx.stop();
        }
        fxNow = undefined;
    };
    jQuery.fx.timer = function(timer) {
        jQuery.timers.push(timer);
        if (timer()) {
            jQuery.fx.start();
        } else {
            jQuery.timers.pop();
        }
    };
    jQuery.fx.interval = 13;
    jQuery.fx.start = function() {
        if (!timerId) {
            timerId = setInterval(jQuery.fx.tick, jQuery.fx.interval);
        }
    };
    jQuery.fx.stop = function() {
        clearInterval(timerId);
        timerId = null;
    };
    jQuery.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    };
    jQuery.fn.delay = function(time, type) {
        time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
        type = type || "fx";
        return this.queue(type, function(next, hooks) {
            var timeout = setTimeout(next, time);
            hooks.stop = function() {
                clearTimeout(timeout);
            };
        });
    };
    (function() {
        var input, div, select, a, opt;
        div = document.createElement("div");
        div.setAttribute("className", "t");
        div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
        a = div.getElementsByTagName("a")[0];
        select = document.createElement("select");
        opt = select.appendChild(document.createElement("option"));
        input = div.getElementsByTagName("input")[0];
        a.style.cssText = "top:1px";
        support.getSetAttribute = div.className !== "t";
        support.style = /top/.test(a.getAttribute("style"));
        support.hrefNormalized = a.getAttribute("href") === "/a";
        support.checkOn = !!input.value;
        support.optSelected = opt.selected;
        support.enctype = !!document.createElement("form").enctype;
        select.disabled = true;
        support.optDisabled = !opt.disabled;
        input = document.createElement("input");
        input.setAttribute("value", "");
        support.input = input.getAttribute("value") === "";
        input.value = "t";
        input.setAttribute("type", "radio");
        support.radioValue = input.value === "t";
    })();
    var rreturn = /\r/g;
    jQuery.fn.extend({
        val: function(value) {
            var hooks, ret, isFunction, elem = this[0];
            if (!arguments.length) {
                if (elem) {
                    hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];
                    if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
                        return ret;
                    }
                    ret = elem.value;
                    return typeof ret === "string" ? ret.replace(rreturn, "") : ret == null ? "" : ret;
                }
                return;
            }
            isFunction = jQuery.isFunction(value);
            return this.each(function(i) {
                var val;
                if (this.nodeType !== 1) {
                    return;
                }
                if (isFunction) {
                    val = value.call(this, i, jQuery(this).val());
                } else {
                    val = value;
                }
                if (val == null) {
                    val = "";
                } else if (typeof val === "number") {
                    val += "";
                } else if (jQuery.isArray(val)) {
                    val = jQuery.map(val, function(value) {
                        return value == null ? "" : value + "";
                    });
                }
                hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];
                if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
                    this.value = val;
                }
            });
        }
    });
    jQuery.extend({
        valHooks: {
            option: {
                get: function(elem) {
                    var val = jQuery.find.attr(elem, "value");
                    return val != null ? val : jQuery.trim(jQuery.text(elem));
                }
            },
            select: {
                get: function(elem) {
                    var value, option, options = elem.options, index = elem.selectedIndex, one = elem.type === "select-one" || index < 0, values = one ? null : [], max = one ? index + 1 : options.length, i = index < 0 ? max : one ? index : 0;
                    for (;i < max; i++) {
                        option = options[i];
                        if ((option.selected || i === index) && (support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {
                            value = jQuery(option).val();
                            if (one) {
                                return value;
                            }
                            values.push(value);
                        }
                    }
                    return values;
                },
                set: function(elem, value) {
                    var optionSet, option, options = elem.options, values = jQuery.makeArray(value), i = options.length;
                    while (i--) {
                        option = options[i];
                        if (jQuery.inArray(jQuery.valHooks.option.get(option), values) >= 0) {
                            try {
                                option.selected = optionSet = true;
                            } catch (_) {
                                option.scrollHeight;
                            }
                        } else {
                            option.selected = false;
                        }
                    }
                    if (!optionSet) {
                        elem.selectedIndex = -1;
                    }
                    return options;
                }
            }
        }
    });
    jQuery.each([ "radio", "checkbox" ], function() {
        jQuery.valHooks[this] = {
            set: function(elem, value) {
                if (jQuery.isArray(value)) {
                    return elem.checked = jQuery.inArray(jQuery(elem).val(), value) >= 0;
                }
            }
        };
        if (!support.checkOn) {
            jQuery.valHooks[this].get = function(elem) {
                return elem.getAttribute("value") === null ? "on" : elem.value;
            };
        }
    });
    var nodeHook, boolHook, attrHandle = jQuery.expr.attrHandle, ruseDefault = /^(?:checked|selected)$/i, getSetAttribute = support.getSetAttribute, getSetInput = support.input;
    jQuery.fn.extend({
        attr: function(name, value) {
            return access(this, jQuery.attr, name, value, arguments.length > 1);
        },
        removeAttr: function(name) {
            return this.each(function() {
                jQuery.removeAttr(this, name);
            });
        }
    });
    jQuery.extend({
        attr: function(elem, name, value) {
            var hooks, ret, nType = elem.nodeType;
            if (!elem || nType === 3 || nType === 8 || nType === 2) {
                return;
            }
            if (typeof elem.getAttribute === strundefined) {
                return jQuery.prop(elem, name, value);
            }
            if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
                name = name.toLowerCase();
                hooks = jQuery.attrHooks[name] || (jQuery.expr.match.bool.test(name) ? boolHook : nodeHook);
            }
            if (value !== undefined) {
                if (value === null) {
                    jQuery.removeAttr(elem, name);
                } else if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
                    return ret;
                } else {
                    elem.setAttribute(name, value + "");
                    return value;
                }
            } else if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
                return ret;
            } else {
                ret = jQuery.find.attr(elem, name);
                return ret == null ? undefined : ret;
            }
        },
        removeAttr: function(elem, value) {
            var name, propName, i = 0, attrNames = value && value.match(rnotwhite);
            if (attrNames && elem.nodeType === 1) {
                while (name = attrNames[i++]) {
                    propName = jQuery.propFix[name] || name;
                    if (jQuery.expr.match.bool.test(name)) {
                        if (getSetInput && getSetAttribute || !ruseDefault.test(name)) {
                            elem[propName] = false;
                        } else {
                            elem[jQuery.camelCase("default-" + name)] = elem[propName] = false;
                        }
                    } else {
                        jQuery.attr(elem, name, "");
                    }
                    elem.removeAttribute(getSetAttribute ? name : propName);
                }
            }
        },
        attrHooks: {
            type: {
                set: function(elem, value) {
                    if (!support.radioValue && value === "radio" && jQuery.nodeName(elem, "input")) {
                        var val = elem.value;
                        elem.setAttribute("type", value);
                        if (val) {
                            elem.value = val;
                        }
                        return value;
                    }
                }
            }
        }
    });
    boolHook = {
        set: function(elem, value, name) {
            if (value === false) {
                jQuery.removeAttr(elem, name);
            } else if (getSetInput && getSetAttribute || !ruseDefault.test(name)) {
                elem.setAttribute(!getSetAttribute && jQuery.propFix[name] || name, name);
            } else {
                elem[jQuery.camelCase("default-" + name)] = elem[name] = true;
            }
            return name;
        }
    };
    jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(i, name) {
        var getter = attrHandle[name] || jQuery.find.attr;
        attrHandle[name] = getSetInput && getSetAttribute || !ruseDefault.test(name) ? function(elem, name, isXML) {
            var ret, handle;
            if (!isXML) {
                handle = attrHandle[name];
                attrHandle[name] = ret;
                ret = getter(elem, name, isXML) != null ? name.toLowerCase() : null;
                attrHandle[name] = handle;
            }
            return ret;
        } : function(elem, name, isXML) {
            if (!isXML) {
                return elem[jQuery.camelCase("default-" + name)] ? name.toLowerCase() : null;
            }
        };
    });
    if (!getSetInput || !getSetAttribute) {
        jQuery.attrHooks.value = {
            set: function(elem, value, name) {
                if (jQuery.nodeName(elem, "input")) {
                    elem.defaultValue = value;
                } else {
                    return nodeHook && nodeHook.set(elem, value, name);
                }
            }
        };
    }
    if (!getSetAttribute) {
        nodeHook = {
            set: function(elem, value, name) {
                var ret = elem.getAttributeNode(name);
                if (!ret) {
                    elem.setAttributeNode(ret = elem.ownerDocument.createAttribute(name));
                }
                ret.value = value += "";
                if (name === "value" || value === elem.getAttribute(name)) {
                    return value;
                }
            }
        };
        attrHandle.id = attrHandle.name = attrHandle.coords = function(elem, name, isXML) {
            var ret;
            if (!isXML) {
                return (ret = elem.getAttributeNode(name)) && ret.value !== "" ? ret.value : null;
            }
        };
        jQuery.valHooks.button = {
            get: function(elem, name) {
                var ret = elem.getAttributeNode(name);
                if (ret && ret.specified) {
                    return ret.value;
                }
            },
            set: nodeHook.set
        };
        jQuery.attrHooks.contenteditable = {
            set: function(elem, value, name) {
                nodeHook.set(elem, value === "" ? false : value, name);
            }
        };
        jQuery.each([ "width", "height" ], function(i, name) {
            jQuery.attrHooks[name] = {
                set: function(elem, value) {
                    if (value === "") {
                        elem.setAttribute(name, "auto");
                        return value;
                    }
                }
            };
        });
    }
    if (!support.style) {
        jQuery.attrHooks.style = {
            get: function(elem) {
                return elem.style.cssText || undefined;
            },
            set: function(elem, value) {
                return elem.style.cssText = value + "";
            }
        };
    }
    var rfocusable = /^(?:input|select|textarea|button|object)$/i, rclickable = /^(?:a|area)$/i;
    jQuery.fn.extend({
        prop: function(name, value) {
            return access(this, jQuery.prop, name, value, arguments.length > 1);
        },
        removeProp: function(name) {
            name = jQuery.propFix[name] || name;
            return this.each(function() {
                try {
                    this[name] = undefined;
                    delete this[name];
                } catch (e) {}
            });
        }
    });
    jQuery.extend({
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(elem, name, value) {
            var ret, hooks, notxml, nType = elem.nodeType;
            if (!elem || nType === 3 || nType === 8 || nType === 2) {
                return;
            }
            notxml = nType !== 1 || !jQuery.isXMLDoc(elem);
            if (notxml) {
                name = jQuery.propFix[name] || name;
                hooks = jQuery.propHooks[name];
            }
            if (value !== undefined) {
                return hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined ? ret : elem[name] = value;
            } else {
                return hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null ? ret : elem[name];
            }
        },
        propHooks: {
            tabIndex: {
                get: function(elem) {
                    var tabindex = jQuery.find.attr(elem, "tabindex");
                    return tabindex ? parseInt(tabindex, 10) : rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ? 0 : -1;
                }
            }
        }
    });
    if (!support.hrefNormalized) {
        jQuery.each([ "href", "src" ], function(i, name) {
            jQuery.propHooks[name] = {
                get: function(elem) {
                    return elem.getAttribute(name, 4);
                }
            };
        });
    }
    if (!support.optSelected) {
        jQuery.propHooks.selected = {
            get: function(elem) {
                var parent = elem.parentNode;
                if (parent) {
                    parent.selectedIndex;
                    if (parent.parentNode) {
                        parent.parentNode.selectedIndex;
                    }
                }
                return null;
            }
        };
    }
    jQuery.each([ "tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable" ], function() {
        jQuery.propFix[this.toLowerCase()] = this;
    });
    if (!support.enctype) {
        jQuery.propFix.enctype = "encoding";
    }
    var rclass = /[\t\r\n\f]/g;
    jQuery.fn.extend({
        addClass: function(value) {
            var classes, elem, cur, clazz, j, finalValue, i = 0, len = this.length, proceed = typeof value === "string" && value;
            if (jQuery.isFunction(value)) {
                return this.each(function(j) {
                    jQuery(this).addClass(value.call(this, j, this.className));
                });
            }
            if (proceed) {
                classes = (value || "").match(rnotwhite) || [];
                for (;i < len; i++) {
                    elem = this[i];
                    cur = elem.nodeType === 1 && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : " ");
                    if (cur) {
                        j = 0;
                        while (clazz = classes[j++]) {
                            if (cur.indexOf(" " + clazz + " ") < 0) {
                                cur += clazz + " ";
                            }
                        }
                        finalValue = jQuery.trim(cur);
                        if (elem.className !== finalValue) {
                            elem.className = finalValue;
                        }
                    }
                }
            }
            return this;
        },
        removeClass: function(value) {
            var classes, elem, cur, clazz, j, finalValue, i = 0, len = this.length, proceed = arguments.length === 0 || typeof value === "string" && value;
            if (jQuery.isFunction(value)) {
                return this.each(function(j) {
                    jQuery(this).removeClass(value.call(this, j, this.className));
                });
            }
            if (proceed) {
                classes = (value || "").match(rnotwhite) || [];
                for (;i < len; i++) {
                    elem = this[i];
                    cur = elem.nodeType === 1 && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : "");
                    if (cur) {
                        j = 0;
                        while (clazz = classes[j++]) {
                            while (cur.indexOf(" " + clazz + " ") >= 0) {
                                cur = cur.replace(" " + clazz + " ", " ");
                            }
                        }
                        finalValue = value ? jQuery.trim(cur) : "";
                        if (elem.className !== finalValue) {
                            elem.className = finalValue;
                        }
                    }
                }
            }
            return this;
        },
        toggleClass: function(value, stateVal) {
            var type = typeof value;
            if (typeof stateVal === "boolean" && type === "string") {
                return stateVal ? this.addClass(value) : this.removeClass(value);
            }
            if (jQuery.isFunction(value)) {
                return this.each(function(i) {
                    jQuery(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal);
                });
            }
            return this.each(function() {
                if (type === "string") {
                    var className, i = 0, self = jQuery(this), classNames = value.match(rnotwhite) || [];
                    while (className = classNames[i++]) {
                        if (self.hasClass(className)) {
                            self.removeClass(className);
                        } else {
                            self.addClass(className);
                        }
                    }
                } else if (type === strundefined || type === "boolean") {
                    if (this.className) {
                        jQuery._data(this, "__className__", this.className);
                    }
                    this.className = this.className || value === false ? "" : jQuery._data(this, "__className__") || "";
                }
            });
        },
        hasClass: function(selector) {
            var className = " " + selector + " ", i = 0, l = this.length;
            for (;i < l; i++) {
                if (this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf(className) >= 0) {
                    return true;
                }
            }
            return false;
        }
    });
    jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup error contextmenu").split(" "), function(i, name) {
        jQuery.fn[name] = function(data, fn) {
            return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
        };
    });
    jQuery.fn.extend({
        hover: function(fnOver, fnOut) {
            return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
        },
        bind: function(types, data, fn) {
            return this.on(types, null, data, fn);
        },
        unbind: function(types, fn) {
            return this.off(types, null, fn);
        },
        delegate: function(selector, types, data, fn) {
            return this.on(types, selector, data, fn);
        },
        undelegate: function(selector, types, fn) {
            return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
        }
    });
    var nonce = jQuery.now();
    var rquery = /\?/;
    var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    jQuery.parseJSON = function(data) {
        if (window.JSON && window.JSON.parse) {
            return window.JSON.parse(data + "");
        }
        var requireNonComma, depth = null, str = jQuery.trim(data + "");
        return str && !jQuery.trim(str.replace(rvalidtokens, function(token, comma, open, close) {
            if (requireNonComma && comma) {
                depth = 0;
            }
            if (depth === 0) {
                return token;
            }
            requireNonComma = open || comma;
            depth += !close - !open;
            return "";
        })) ? Function("return " + str)() : jQuery.error("Invalid JSON: " + data);
    };
    jQuery.parseXML = function(data) {
        var xml, tmp;
        if (!data || typeof data !== "string") {
            return null;
        }
        try {
            if (window.DOMParser) {
                tmp = new DOMParser();
                xml = tmp.parseFromString(data, "text/xml");
            } else {
                xml = new ActiveXObject("Microsoft.XMLDOM");
                xml.async = "false";
                xml.loadXML(data);
            }
        } catch (e) {
            xml = undefined;
        }
        if (!xml || !xml.documentElement || xml.getElementsByTagName("parsererror").length) {
            jQuery.error("Invalid XML: " + data);
        }
        return xml;
    };
    var ajaxLocParts, ajaxLocation, rhash = /#.*$/, rts = /([?&])_=[^&]*/, rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm, rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, rnoContent = /^(?:GET|HEAD)$/, rprotocol = /^\/\//, rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, prefilters = {}, transports = {}, allTypes = "*/".concat("*");
    try {
        ajaxLocation = location.href;
    } catch (e) {
        ajaxLocation = document.createElement("a");
        ajaxLocation.href = "";
        ajaxLocation = ajaxLocation.href;
    }
    ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [];
    function addToPrefiltersOrTransports(structure) {
        return function(dataTypeExpression, func) {
            if (typeof dataTypeExpression !== "string") {
                func = dataTypeExpression;
                dataTypeExpression = "*";
            }
            var dataType, i = 0, dataTypes = dataTypeExpression.toLowerCase().match(rnotwhite) || [];
            if (jQuery.isFunction(func)) {
                while (dataType = dataTypes[i++]) {
                    if (dataType.charAt(0) === "+") {
                        dataType = dataType.slice(1) || "*";
                        (structure[dataType] = structure[dataType] || []).unshift(func);
                    } else {
                        (structure[dataType] = structure[dataType] || []).push(func);
                    }
                }
            }
        };
    }
    function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
        var inspected = {}, seekingTransport = structure === transports;
        function inspect(dataType) {
            var selected;
            inspected[dataType] = true;
            jQuery.each(structure[dataType] || [], function(_, prefilterOrFactory) {
                var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
                if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {
                    options.dataTypes.unshift(dataTypeOrTransport);
                    inspect(dataTypeOrTransport);
                    return false;
                } else if (seekingTransport) {
                    return !(selected = dataTypeOrTransport);
                }
            });
            return selected;
        }
        return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
    }
    function ajaxExtend(target, src) {
        var deep, key, flatOptions = jQuery.ajaxSettings.flatOptions || {};
        for (key in src) {
            if (src[key] !== undefined) {
                (flatOptions[key] ? target : deep || (deep = {}))[key] = src[key];
            }
        }
        if (deep) {
            jQuery.extend(true, target, deep);
        }
        return target;
    }
    function ajaxHandleResponses(s, jqXHR, responses) {
        var firstDataType, ct, finalDataType, type, contents = s.contents, dataTypes = s.dataTypes;
        while (dataTypes[0] === "*") {
            dataTypes.shift();
            if (ct === undefined) {
                ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
            }
        }
        if (ct) {
            for (type in contents) {
                if (contents[type] && contents[type].test(ct)) {
                    dataTypes.unshift(type);
                    break;
                }
            }
        }
        if (dataTypes[0] in responses) {
            finalDataType = dataTypes[0];
        } else {
            for (type in responses) {
                if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
                    finalDataType = type;
                    break;
                }
                if (!firstDataType) {
                    firstDataType = type;
                }
            }
            finalDataType = finalDataType || firstDataType;
        }
        if (finalDataType) {
            if (finalDataType !== dataTypes[0]) {
                dataTypes.unshift(finalDataType);
            }
            return responses[finalDataType];
        }
    }
    function ajaxConvert(s, response, jqXHR, isSuccess) {
        var conv2, current, conv, tmp, prev, converters = {}, dataTypes = s.dataTypes.slice();
        if (dataTypes[1]) {
            for (conv in s.converters) {
                converters[conv.toLowerCase()] = s.converters[conv];
            }
        }
        current = dataTypes.shift();
        while (current) {
            if (s.responseFields[current]) {
                jqXHR[s.responseFields[current]] = response;
            }
            if (!prev && isSuccess && s.dataFilter) {
                response = s.dataFilter(response, s.dataType);
            }
            prev = current;
            current = dataTypes.shift();
            if (current) {
                if (current === "*") {
                    current = prev;
                } else if (prev !== "*" && prev !== current) {
                    conv = converters[prev + " " + current] || converters["* " + current];
                    if (!conv) {
                        for (conv2 in converters) {
                            tmp = conv2.split(" ");
                            if (tmp[1] === current) {
                                conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];
                                if (conv) {
                                    if (conv === true) {
                                        conv = converters[conv2];
                                    } else if (converters[conv2] !== true) {
                                        current = tmp[0];
                                        dataTypes.unshift(tmp[1]);
                                    }
                                    break;
                                }
                            }
                        }
                    }
                    if (conv !== true) {
                        if (conv && s["throws"]) {
                            response = conv(response);
                        } else {
                            try {
                                response = conv(response);
                            } catch (e) {
                                return {
                                    state: "parsererror",
                                    error: conv ? e : "No conversion from " + prev + " to " + current
                                };
                            }
                        }
                    }
                }
            }
        }
        return {
            state: "success",
            data: response
        };
    }
    jQuery.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: ajaxLocation,
            type: "GET",
            isLocal: rlocalProtocol.test(ajaxLocParts[1]),
            global: true,
            processData: true,
            async: true,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": allTypes,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": true,
                "text json": jQuery.parseJSON,
                "text xml": jQuery.parseXML
            },
            flatOptions: {
                url: true,
                context: true
            }
        },
        ajaxSetup: function(target, settings) {
            return settings ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : ajaxExtend(jQuery.ajaxSettings, target);
        },
        ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
        ajaxTransport: addToPrefiltersOrTransports(transports),
        ajax: function(url, options) {
            if (typeof url === "object") {
                options = url;
                url = undefined;
            }
            options = options || {};
            var parts, i, cacheURL, responseHeadersString, timeoutTimer, fireGlobals, transport, responseHeaders, s = jQuery.ajaxSetup({}, options), callbackContext = s.context || s, globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event, deferred = jQuery.Deferred(), completeDeferred = jQuery.Callbacks("once memory"), statusCode = s.statusCode || {}, requestHeaders = {}, requestHeadersNames = {}, state = 0, strAbort = "canceled", jqXHR = {
                readyState: 0,
                getResponseHeader: function(key) {
                    var match;
                    if (state === 2) {
                        if (!responseHeaders) {
                            responseHeaders = {};
                            while (match = rheaders.exec(responseHeadersString)) {
                                responseHeaders[match[1].toLowerCase()] = match[2];
                            }
                        }
                        match = responseHeaders[key.toLowerCase()];
                    }
                    return match == null ? null : match;
                },
                getAllResponseHeaders: function() {
                    return state === 2 ? responseHeadersString : null;
                },
                setRequestHeader: function(name, value) {
                    var lname = name.toLowerCase();
                    if (!state) {
                        name = requestHeadersNames[lname] = requestHeadersNames[lname] || name;
                        requestHeaders[name] = value;
                    }
                    return this;
                },
                overrideMimeType: function(type) {
                    if (!state) {
                        s.mimeType = type;
                    }
                    return this;
                },
                statusCode: function(map) {
                    var code;
                    if (map) {
                        if (state < 2) {
                            for (code in map) {
                                statusCode[code] = [ statusCode[code], map[code] ];
                            }
                        } else {
                            jqXHR.always(map[jqXHR.status]);
                        }
                    }
                    return this;
                },
                abort: function(statusText) {
                    var finalText = statusText || strAbort;
                    if (transport) {
                        transport.abort(finalText);
                    }
                    done(0, finalText);
                    return this;
                }
            };
            deferred.promise(jqXHR).complete = completeDeferred.add;
            jqXHR.success = jqXHR.done;
            jqXHR.error = jqXHR.fail;
            s.url = ((url || s.url || ajaxLocation) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//");
            s.type = options.method || options.type || s.method || s.type;
            s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(rnotwhite) || [ "" ];
            if (s.crossDomain == null) {
                parts = rurl.exec(s.url.toLowerCase());
                s.crossDomain = !!(parts && (parts[1] !== ajaxLocParts[1] || parts[2] !== ajaxLocParts[2] || (parts[3] || (parts[1] === "http:" ? "80" : "443")) !== (ajaxLocParts[3] || (ajaxLocParts[1] === "http:" ? "80" : "443"))));
            }
            if (s.data && s.processData && typeof s.data !== "string") {
                s.data = jQuery.param(s.data, s.traditional);
            }
            inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
            if (state === 2) {
                return jqXHR;
            }
            fireGlobals = s.global;
            if (fireGlobals && jQuery.active++ === 0) {
                jQuery.event.trigger("ajaxStart");
            }
            s.type = s.type.toUpperCase();
            s.hasContent = !rnoContent.test(s.type);
            cacheURL = s.url;
            if (!s.hasContent) {
                if (s.data) {
                    cacheURL = s.url += (rquery.test(cacheURL) ? "&" : "?") + s.data;
                    delete s.data;
                }
                if (s.cache === false) {
                    s.url = rts.test(cacheURL) ? cacheURL.replace(rts, "$1_=" + nonce++) : cacheURL + (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++;
                }
            }
            if (s.ifModified) {
                if (jQuery.lastModified[cacheURL]) {
                    jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
                }
                if (jQuery.etag[cacheURL]) {
                    jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
                }
            }
            if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
                jqXHR.setRequestHeader("Content-Type", s.contentType);
            }
            jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);
            for (i in s.headers) {
                jqXHR.setRequestHeader(i, s.headers[i]);
            }
            if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2)) {
                return jqXHR.abort();
            }
            strAbort = "abort";
            for (i in {
                success: 1,
                error: 1,
                complete: 1
            }) {
                jqXHR[i](s[i]);
            }
            transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
            if (!transport) {
                done(-1, "No Transport");
            } else {
                jqXHR.readyState = 1;
                if (fireGlobals) {
                    globalEventContext.trigger("ajaxSend", [ jqXHR, s ]);
                }
                if (s.async && s.timeout > 0) {
                    timeoutTimer = setTimeout(function() {
                        jqXHR.abort("timeout");
                    }, s.timeout);
                }
                try {
                    state = 1;
                    transport.send(requestHeaders, done);
                } catch (e) {
                    if (state < 2) {
                        done(-1, e);
                    } else {
                        throw e;
                    }
                }
            }
            function done(status, nativeStatusText, responses, headers) {
                var isSuccess, success, error, response, modified, statusText = nativeStatusText;
                if (state === 2) {
                    return;
                }
                state = 2;
                if (timeoutTimer) {
                    clearTimeout(timeoutTimer);
                }
                transport = undefined;
                responseHeadersString = headers || "";
                jqXHR.readyState = status > 0 ? 4 : 0;
                isSuccess = status >= 200 && status < 300 || status === 304;
                if (responses) {
                    response = ajaxHandleResponses(s, jqXHR, responses);
                }
                response = ajaxConvert(s, response, jqXHR, isSuccess);
                if (isSuccess) {
                    if (s.ifModified) {
                        modified = jqXHR.getResponseHeader("Last-Modified");
                        if (modified) {
                            jQuery.lastModified[cacheURL] = modified;
                        }
                        modified = jqXHR.getResponseHeader("etag");
                        if (modified) {
                            jQuery.etag[cacheURL] = modified;
                        }
                    }
                    if (status === 204 || s.type === "HEAD") {
                        statusText = "nocontent";
                    } else if (status === 304) {
                        statusText = "notmodified";
                    } else {
                        statusText = response.state;
                        success = response.data;
                        error = response.error;
                        isSuccess = !error;
                    }
                } else {
                    error = statusText;
                    if (status || !statusText) {
                        statusText = "error";
                        if (status < 0) {
                            status = 0;
                        }
                    }
                }
                jqXHR.status = status;
                jqXHR.statusText = (nativeStatusText || statusText) + "";
                if (isSuccess) {
                    deferred.resolveWith(callbackContext, [ success, statusText, jqXHR ]);
                } else {
                    deferred.rejectWith(callbackContext, [ jqXHR, statusText, error ]);
                }
                jqXHR.statusCode(statusCode);
                statusCode = undefined;
                if (fireGlobals) {
                    globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [ jqXHR, s, isSuccess ? success : error ]);
                }
                completeDeferred.fireWith(callbackContext, [ jqXHR, statusText ]);
                if (fireGlobals) {
                    globalEventContext.trigger("ajaxComplete", [ jqXHR, s ]);
                    if (!--jQuery.active) {
                        jQuery.event.trigger("ajaxStop");
                    }
                }
            }
            return jqXHR;
        },
        getJSON: function(url, data, callback) {
            return jQuery.get(url, data, callback, "json");
        },
        getScript: function(url, callback) {
            return jQuery.get(url, undefined, callback, "script");
        }
    });
    jQuery.each([ "get", "post" ], function(i, method) {
        jQuery[method] = function(url, data, callback, type) {
            if (jQuery.isFunction(data)) {
                type = type || callback;
                callback = data;
                data = undefined;
            }
            return jQuery.ajax({
                url: url,
                type: method,
                dataType: type,
                data: data,
                success: callback
            });
        };
    });
    jQuery.each([ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function(i, type) {
        jQuery.fn[type] = function(fn) {
            return this.on(type, fn);
        };
    });
    jQuery._evalUrl = function(url) {
        return jQuery.ajax({
            url: url,
            type: "GET",
            dataType: "script",
            async: false,
            global: false,
            "throws": true
        });
    };
    jQuery.fn.extend({
        wrapAll: function(html) {
            if (jQuery.isFunction(html)) {
                return this.each(function(i) {
                    jQuery(this).wrapAll(html.call(this, i));
                });
            }
            if (this[0]) {
                var wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);
                if (this[0].parentNode) {
                    wrap.insertBefore(this[0]);
                }
                wrap.map(function() {
                    var elem = this;
                    while (elem.firstChild && elem.firstChild.nodeType === 1) {
                        elem = elem.firstChild;
                    }
                    return elem;
                }).append(this);
            }
            return this;
        },
        wrapInner: function(html) {
            if (jQuery.isFunction(html)) {
                return this.each(function(i) {
                    jQuery(this).wrapInner(html.call(this, i));
                });
            }
            return this.each(function() {
                var self = jQuery(this), contents = self.contents();
                if (contents.length) {
                    contents.wrapAll(html);
                } else {
                    self.append(html);
                }
            });
        },
        wrap: function(html) {
            var isFunction = jQuery.isFunction(html);
            return this.each(function(i) {
                jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
            });
        },
        unwrap: function() {
            return this.parent().each(function() {
                if (!jQuery.nodeName(this, "body")) {
                    jQuery(this).replaceWith(this.childNodes);
                }
            }).end();
        }
    });
    jQuery.expr.filters.hidden = function(elem) {
        return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 || !support.reliableHiddenOffsets() && (elem.style && elem.style.display || jQuery.css(elem, "display")) === "none";
    };
    jQuery.expr.filters.visible = function(elem) {
        return !jQuery.expr.filters.hidden(elem);
    };
    var r20 = /%20/g, rbracket = /\[\]$/, rCRLF = /\r?\n/g, rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i, rsubmittable = /^(?:input|select|textarea|keygen)/i;
    function buildParams(prefix, obj, traditional, add) {
        var name;
        if (jQuery.isArray(obj)) {
            jQuery.each(obj, function(i, v) {
                if (traditional || rbracket.test(prefix)) {
                    add(prefix, v);
                } else {
                    buildParams(prefix + "[" + (typeof v === "object" ? i : "") + "]", v, traditional, add);
                }
            });
        } else if (!traditional && jQuery.type(obj) === "object") {
            for (name in obj) {
                buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
            }
        } else {
            add(prefix, obj);
        }
    }
    jQuery.param = function(a, traditional) {
        var prefix, s = [], add = function(key, value) {
            value = jQuery.isFunction(value) ? value() : value == null ? "" : value;
            s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
        };
        if (traditional === undefined) {
            traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
        }
        if (jQuery.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) {
            jQuery.each(a, function() {
                add(this.name, this.value);
            });
        } else {
            for (prefix in a) {
                buildParams(prefix, a[prefix], traditional, add);
            }
        }
        return s.join("&").replace(r20, "+");
    };
    jQuery.fn.extend({
        serialize: function() {
            return jQuery.param(this.serializeArray());
        },
        serializeArray: function() {
            return this.map(function() {
                var elements = jQuery.prop(this, "elements");
                return elements ? jQuery.makeArray(elements) : this;
            }).filter(function() {
                var type = this.type;
                return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));
            }).map(function(i, elem) {
                var val = jQuery(this).val();
                return val == null ? null : jQuery.isArray(val) ? jQuery.map(val, function(val) {
                    return {
                        name: elem.name,
                        value: val.replace(rCRLF, "\r\n")
                    };
                }) : {
                    name: elem.name,
                    value: val.replace(rCRLF, "\r\n")
                };
            }).get();
        }
    });
    jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ? function() {
        return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && createStandardXHR() || createActiveXHR();
    } : createStandardXHR;
    var xhrId = 0, xhrCallbacks = {}, xhrSupported = jQuery.ajaxSettings.xhr();
    if (window.ActiveXObject) {
        jQuery(window).on("unload", function() {
            for (var key in xhrCallbacks) {
                xhrCallbacks[key](undefined, true);
            }
        });
    }
    support.cors = !!xhrSupported && "withCredentials" in xhrSupported;
    xhrSupported = support.ajax = !!xhrSupported;
    if (xhrSupported) {
        jQuery.ajaxTransport(function(options) {
            if (!options.crossDomain || support.cors) {
                var callback;
                return {
                    send: function(headers, complete) {
                        var i, xhr = options.xhr(), id = ++xhrId;
                        xhr.open(options.type, options.url, options.async, options.username, options.password);
                        if (options.xhrFields) {
                            for (i in options.xhrFields) {
                                xhr[i] = options.xhrFields[i];
                            }
                        }
                        if (options.mimeType && xhr.overrideMimeType) {
                            xhr.overrideMimeType(options.mimeType);
                        }
                        if (!options.crossDomain && !headers["X-Requested-With"]) {
                            headers["X-Requested-With"] = "XMLHttpRequest";
                        }
                        for (i in headers) {
                            if (headers[i] !== undefined) {
                                xhr.setRequestHeader(i, headers[i] + "");
                            }
                        }
                        xhr.send(options.hasContent && options.data || null);
                        callback = function(_, isAbort) {
                            var status, statusText, responses;
                            if (callback && (isAbort || xhr.readyState === 4)) {
                                delete xhrCallbacks[id];
                                callback = undefined;
                                xhr.onreadystatechange = jQuery.noop;
                                if (isAbort) {
                                    if (xhr.readyState !== 4) {
                                        xhr.abort();
                                    }
                                } else {
                                    responses = {};
                                    status = xhr.status;
                                    if (typeof xhr.responseText === "string") {
                                        responses.text = xhr.responseText;
                                    }
                                    try {
                                        statusText = xhr.statusText;
                                    } catch (e) {
                                        statusText = "";
                                    }
                                    if (!status && options.isLocal && !options.crossDomain) {
                                        status = responses.text ? 200 : 404;
                                    } else if (status === 1223) {
                                        status = 204;
                                    }
                                }
                            }
                            if (responses) {
                                complete(status, statusText, responses, xhr.getAllResponseHeaders());
                            }
                        };
                        if (!options.async) {
                            callback();
                        } else if (xhr.readyState === 4) {
                            setTimeout(callback);
                        } else {
                            xhr.onreadystatechange = xhrCallbacks[id] = callback;
                        }
                    },
                    abort: function() {
                        if (callback) {
                            callback(undefined, true);
                        }
                    }
                };
            }
        });
    }
    function createStandardXHR() {
        try {
            return new window.XMLHttpRequest();
        } catch (e) {}
    }
    function createActiveXHR() {
        try {
            return new window.ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {}
    }
    jQuery.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(text) {
                jQuery.globalEval(text);
                return text;
            }
        }
    });
    jQuery.ajaxPrefilter("script", function(s) {
        if (s.cache === undefined) {
            s.cache = false;
        }
        if (s.crossDomain) {
            s.type = "GET";
            s.global = false;
        }
    });
    jQuery.ajaxTransport("script", function(s) {
        if (s.crossDomain) {
            var script, head = document.head || jQuery("head")[0] || document.documentElement;
            return {
                send: function(_, callback) {
                    script = document.createElement("script");
                    script.async = true;
                    if (s.scriptCharset) {
                        script.charset = s.scriptCharset;
                    }
                    script.src = s.url;
                    script.onload = script.onreadystatechange = function(_, isAbort) {
                        if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
                            script.onload = script.onreadystatechange = null;
                            if (script.parentNode) {
                                script.parentNode.removeChild(script);
                            }
                            script = null;
                            if (!isAbort) {
                                callback(200, "success");
                            }
                        }
                    };
                    head.insertBefore(script, head.firstChild);
                },
                abort: function() {
                    if (script) {
                        script.onload(undefined, true);
                    }
                }
            };
        }
    });
    var oldCallbacks = [], rjsonp = /(=)\?(?=&|$)|\?\?/;
    jQuery.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var callback = oldCallbacks.pop() || jQuery.expando + "_" + nonce++;
            this[callback] = true;
            return callback;
        }
    });
    jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
        var callbackName, overwritten, responseContainer, jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? "url" : typeof s.data === "string" && !(s.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(s.data) && "data");
        if (jsonProp || s.dataTypes[0] === "jsonp") {
            callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;
            if (jsonProp) {
                s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
            } else if (s.jsonp !== false) {
                s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
            }
            s.converters["script json"] = function() {
                if (!responseContainer) {
                    jQuery.error(callbackName + " was not called");
                }
                return responseContainer[0];
            };
            s.dataTypes[0] = "json";
            overwritten = window[callbackName];
            window[callbackName] = function() {
                responseContainer = arguments;
            };
            jqXHR.always(function() {
                window[callbackName] = overwritten;
                if (s[callbackName]) {
                    s.jsonpCallback = originalSettings.jsonpCallback;
                    oldCallbacks.push(callbackName);
                }
                if (responseContainer && jQuery.isFunction(overwritten)) {
                    overwritten(responseContainer[0]);
                }
                responseContainer = overwritten = undefined;
            });
            return "script";
        }
    });
    jQuery.parseHTML = function(data, context, keepScripts) {
        if (!data || typeof data !== "string") {
            return null;
        }
        if (typeof context === "boolean") {
            keepScripts = context;
            context = false;
        }
        context = context || document;
        var parsed = rsingleTag.exec(data), scripts = !keepScripts && [];
        if (parsed) {
            return [ context.createElement(parsed[1]) ];
        }
        parsed = jQuery.buildFragment([ data ], context, scripts);
        if (scripts && scripts.length) {
            jQuery(scripts).remove();
        }
        return jQuery.merge([], parsed.childNodes);
    };
    var _load = jQuery.fn.load;
    jQuery.fn.load = function(url, params, callback) {
        if (typeof url !== "string" && _load) {
            return _load.apply(this, arguments);
        }
        var selector, response, type, self = this, off = url.indexOf(" ");
        if (off >= 0) {
            selector = jQuery.trim(url.slice(off, url.length));
            url = url.slice(0, off);
        }
        if (jQuery.isFunction(params)) {
            callback = params;
            params = undefined;
        } else if (params && typeof params === "object") {
            type = "POST";
        }
        if (self.length > 0) {
            jQuery.ajax({
                url: url,
                type: type,
                dataType: "html",
                data: params
            }).done(function(responseText) {
                response = arguments;
                self.html(selector ? jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) : responseText);
            }).complete(callback && function(jqXHR, status) {
                self.each(callback, response || [ jqXHR.responseText, status, jqXHR ]);
            });
        }
        return this;
    };
    jQuery.expr.filters.animated = function(elem) {
        return jQuery.grep(jQuery.timers, function(fn) {
            return elem === fn.elem;
        }).length;
    };
    var docElem = window.document.documentElement;
    function getWindow(elem) {
        return jQuery.isWindow(elem) ? elem : elem.nodeType === 9 ? elem.defaultView || elem.parentWindow : false;
    }
    jQuery.offset = {
        setOffset: function(elem, options, i) {
            var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition, position = jQuery.css(elem, "position"), curElem = jQuery(elem), props = {};
            if (position === "static") {
                elem.style.position = "relative";
            }
            curOffset = curElem.offset();
            curCSSTop = jQuery.css(elem, "top");
            curCSSLeft = jQuery.css(elem, "left");
            calculatePosition = (position === "absolute" || position === "fixed") && jQuery.inArray("auto", [ curCSSTop, curCSSLeft ]) > -1;
            if (calculatePosition) {
                curPosition = curElem.position();
                curTop = curPosition.top;
                curLeft = curPosition.left;
            } else {
                curTop = parseFloat(curCSSTop) || 0;
                curLeft = parseFloat(curCSSLeft) || 0;
            }
            if (jQuery.isFunction(options)) {
                options = options.call(elem, i, curOffset);
            }
            if (options.top != null) {
                props.top = options.top - curOffset.top + curTop;
            }
            if (options.left != null) {
                props.left = options.left - curOffset.left + curLeft;
            }
            if ("using" in options) {
                options.using.call(elem, props);
            } else {
                curElem.css(props);
            }
        }
    };
    jQuery.fn.extend({
        offset: function(options) {
            if (arguments.length) {
                return options === undefined ? this : this.each(function(i) {
                    jQuery.offset.setOffset(this, options, i);
                });
            }
            var docElem, win, box = {
                top: 0,
                left: 0
            }, elem = this[0], doc = elem && elem.ownerDocument;
            if (!doc) {
                return;
            }
            docElem = doc.documentElement;
            if (!jQuery.contains(docElem, elem)) {
                return box;
            }
            if (typeof elem.getBoundingClientRect !== strundefined) {
                box = elem.getBoundingClientRect();
            }
            win = getWindow(doc);
            return {
                top: box.top + (win.pageYOffset || docElem.scrollTop) - (docElem.clientTop || 0),
                left: box.left + (win.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || 0)
            };
        },
        position: function() {
            if (!this[0]) {
                return;
            }
            var offsetParent, offset, parentOffset = {
                top: 0,
                left: 0
            }, elem = this[0];
            if (jQuery.css(elem, "position") === "fixed") {
                offset = elem.getBoundingClientRect();
            } else {
                offsetParent = this.offsetParent();
                offset = this.offset();
                if (!jQuery.nodeName(offsetParent[0], "html")) {
                    parentOffset = offsetParent.offset();
                }
                parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", true);
                parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", true);
            }
            return {
                top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
                left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
            };
        },
        offsetParent: function() {
            return this.map(function() {
                var offsetParent = this.offsetParent || docElem;
                while (offsetParent && (!jQuery.nodeName(offsetParent, "html") && jQuery.css(offsetParent, "position") === "static")) {
                    offsetParent = offsetParent.offsetParent;
                }
                return offsetParent || docElem;
            });
        }
    });
    jQuery.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(method, prop) {
        var top = /Y/.test(prop);
        jQuery.fn[method] = function(val) {
            return access(this, function(elem, method, val) {
                var win = getWindow(elem);
                if (val === undefined) {
                    return win ? prop in win ? win[prop] : win.document.documentElement[method] : elem[method];
                }
                if (win) {
                    win.scrollTo(!top ? val : jQuery(win).scrollLeft(), top ? val : jQuery(win).scrollTop());
                } else {
                    elem[method] = val;
                }
            }, method, val, arguments.length, null);
        };
    });
    jQuery.each([ "top", "left" ], function(i, prop) {
        jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function(elem, computed) {
            if (computed) {
                computed = curCSS(elem, prop);
                return rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed;
            }
        });
    });
    jQuery.each({
        Height: "height",
        Width: "width"
    }, function(name, type) {
        jQuery.each({
            padding: "inner" + name,
            content: type,
            "": "outer" + name
        }, function(defaultExtra, funcName) {
            jQuery.fn[funcName] = function(margin, value) {
                var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"), extra = defaultExtra || (margin === true || value === true ? "margin" : "border");
                return access(this, function(elem, type, value) {
                    var doc;
                    if (jQuery.isWindow(elem)) {
                        return elem.document.documentElement["client" + name];
                    }
                    if (elem.nodeType === 9) {
                        doc = elem.documentElement;
                        return Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name]);
                    }
                    return value === undefined ? jQuery.css(elem, type, extra) : jQuery.style(elem, type, value, extra);
                }, type, chainable ? margin : undefined, chainable, null);
            };
        });
    });
    jQuery.fn.size = function() {
        return this.length;
    };
    jQuery.fn.andSelf = jQuery.fn.addBack;
    if (typeof define === "function" && define.amd) {
        define("jquery", [], function() {
            return jQuery;
        });
    }
    var _jQuery = window.jQuery, _$ = window.$;
    jQuery.noConflict = function(deep) {
        if (window.$ === jQuery) {
            window.$ = _$;
        }
        if (deep && window.jQuery === jQuery) {
            window.jQuery = _jQuery;
        }
        return jQuery;
    };
    if (typeof noGlobal === strundefined) {
        window.jQuery = window.$ = jQuery;
    }
    return jQuery;
});

(function(window, document, undefined) {
    "use strict";
    function minErr(module, ErrorConstructor) {
        ErrorConstructor = ErrorConstructor || Error;
        return function() {
            var code = arguments[0], prefix = "[" + (module ? module + ":" : "") + code + "] ", template = arguments[1], templateArgs = arguments, stringify = function(obj) {
                if (typeof obj === "function") {
                    return obj.toString().replace(/ \{[\s\S]*$/, "");
                } else if (typeof obj === "undefined") {
                    return "undefined";
                } else if (typeof obj !== "string") {
                    return JSON.stringify(obj);
                }
                return obj;
            }, message, i;
            message = prefix + template.replace(/\{\d+\}/g, function(match) {
                var index = +match.slice(1, -1), arg;
                if (index + 2 < templateArgs.length) {
                    arg = templateArgs[index + 2];
                    if (typeof arg === "function") {
                        return arg.toString().replace(/ ?\{[\s\S]*$/, "");
                    } else if (typeof arg === "undefined") {
                        return "undefined";
                    } else if (typeof arg !== "string") {
                        return toJson(arg);
                    }
                    return arg;
                }
                return match;
            });
            message = message + "\nhttp://errors.angularjs.org/1.3.1/" + (module ? module + "/" : "") + code;
            for (i = 2; i < arguments.length; i++) {
                message = message + (i == 2 ? "?" : "&") + "p" + (i - 2) + "=" + encodeURIComponent(stringify(arguments[i]));
            }
            return new ErrorConstructor(message);
        };
    }
    var REGEX_STRING_REGEXP = /^\/(.+)\/([a-z]*)$/;
    var VALIDITY_STATE_PROPERTY = "validity";
    var lowercase = function(string) {
        return isString(string) ? string.toLowerCase() : string;
    };
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var uppercase = function(string) {
        return isString(string) ? string.toUpperCase() : string;
    };
    var manualLowercase = function(s) {
        return isString(s) ? s.replace(/[A-Z]/g, function(ch) {
            return String.fromCharCode(ch.charCodeAt(0) | 32);
        }) : s;
    };
    var manualUppercase = function(s) {
        return isString(s) ? s.replace(/[a-z]/g, function(ch) {
            return String.fromCharCode(ch.charCodeAt(0) & ~32);
        }) : s;
    };
    if ("i" !== "I".toLowerCase()) {
        lowercase = manualLowercase;
        uppercase = manualUppercase;
    }
    var msie, jqLite, jQuery, slice = [].slice, splice = [].splice, push = [].push, toString = Object.prototype.toString, ngMinErr = minErr("ng"), angular = window.angular || (window.angular = {}), angularModule, uid = 0;
    msie = document.documentMode;
    function isArrayLike(obj) {
        if (obj == null || isWindow(obj)) {
            return false;
        }
        var length = obj.length;
        if (obj.nodeType === NODE_TYPE_ELEMENT && length) {
            return true;
        }
        return isString(obj) || isArray(obj) || length === 0 || typeof length === "number" && length > 0 && length - 1 in obj;
    }
    function forEach(obj, iterator, context) {
        var key, length;
        if (obj) {
            if (isFunction(obj)) {
                for (key in obj) {
                    if (key != "prototype" && key != "length" && key != "name" && (!obj.hasOwnProperty || obj.hasOwnProperty(key))) {
                        iterator.call(context, obj[key], key, obj);
                    }
                }
            } else if (isArray(obj) || isArrayLike(obj)) {
                var isPrimitive = typeof obj !== "object";
                for (key = 0, length = obj.length; key < length; key++) {
                    if (isPrimitive || key in obj) {
                        iterator.call(context, obj[key], key, obj);
                    }
                }
            } else if (obj.forEach && obj.forEach !== forEach) {
                obj.forEach(iterator, context, obj);
            } else {
                for (key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        iterator.call(context, obj[key], key, obj);
                    }
                }
            }
        }
        return obj;
    }
    function sortedKeys(obj) {
        return Object.keys(obj).sort();
    }
    function forEachSorted(obj, iterator, context) {
        var keys = sortedKeys(obj);
        for (var i = 0; i < keys.length; i++) {
            iterator.call(context, obj[keys[i]], keys[i]);
        }
        return keys;
    }
    function reverseParams(iteratorFn) {
        return function(value, key) {
            iteratorFn(key, value);
        };
    }
    function nextUid() {
        return ++uid;
    }
    function setHashKey(obj, h) {
        if (h) {
            obj.$$hashKey = h;
        } else {
            delete obj.$$hashKey;
        }
    }
    function extend(dst) {
        var h = dst.$$hashKey;
        for (var i = 1, ii = arguments.length; i < ii; i++) {
            var obj = arguments[i];
            if (obj) {
                var keys = Object.keys(obj);
                for (var j = 0, jj = keys.length; j < jj; j++) {
                    var key = keys[j];
                    dst[key] = obj[key];
                }
            }
        }
        setHashKey(dst, h);
        return dst;
    }
    function int(str) {
        return parseInt(str, 10);
    }
    function inherit(parent, extra) {
        return extend(new (extend(function() {}, {
            prototype: parent
        }))(), extra);
    }
    function noop() {}
    noop.$inject = [];
    function identity($) {
        return $;
    }
    identity.$inject = [];
    function valueFn(value) {
        return function() {
            return value;
        };
    }
    function isUndefined(value) {
        return typeof value === "undefined";
    }
    function isDefined(value) {
        return typeof value !== "undefined";
    }
    function isObject(value) {
        return value !== null && typeof value === "object";
    }
    function isString(value) {
        return typeof value === "string";
    }
    function isNumber(value) {
        return typeof value === "number";
    }
    function isDate(value) {
        return toString.call(value) === "[object Date]";
    }
    var isArray = Array.isArray;
    function isFunction(value) {
        return typeof value === "function";
    }
    function isRegExp(value) {
        return toString.call(value) === "[object RegExp]";
    }
    function isWindow(obj) {
        return obj && obj.window === obj;
    }
    function isScope(obj) {
        return obj && obj.$evalAsync && obj.$watch;
    }
    function isFile(obj) {
        return toString.call(obj) === "[object File]";
    }
    function isBlob(obj) {
        return toString.call(obj) === "[object Blob]";
    }
    function isBoolean(value) {
        return typeof value === "boolean";
    }
    function isPromiseLike(obj) {
        return obj && isFunction(obj.then);
    }
    var trim = function(value) {
        return isString(value) ? value.trim() : value;
    };
    var escapeForRegexp = function(s) {
        return s.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08");
    };
    function isElement(node) {
        return !!(node && (node.nodeName || node.prop && node.attr && node.find));
    }
    function makeMap(str) {
        var obj = {}, items = str.split(","), i;
        for (i = 0; i < items.length; i++) obj[items[i]] = true;
        return obj;
    }
    function nodeName_(element) {
        return lowercase(element.nodeName || element[0].nodeName);
    }
    function includes(array, obj) {
        return Array.prototype.indexOf.call(array, obj) != -1;
    }
    function arrayRemove(array, value) {
        var index = array.indexOf(value);
        if (index >= 0) array.splice(index, 1);
        return value;
    }
    function copy(source, destination, stackSource, stackDest) {
        if (isWindow(source) || isScope(source)) {
            throw ngMinErr("cpws", "Can't copy! Making copies of Window or Scope instances is not supported.");
        }
        if (!destination) {
            destination = source;
            if (source) {
                if (isArray(source)) {
                    destination = copy(source, [], stackSource, stackDest);
                } else if (isDate(source)) {
                    destination = new Date(source.getTime());
                } else if (isRegExp(source)) {
                    destination = new RegExp(source.source, source.toString().match(/[^\/]*$/)[0]);
                    destination.lastIndex = source.lastIndex;
                } else if (isObject(source)) {
                    var emptyObject = Object.create(Object.getPrototypeOf(source));
                    destination = copy(source, emptyObject, stackSource, stackDest);
                }
            }
        } else {
            if (source === destination) throw ngMinErr("cpi", "Can't copy! Source and destination are identical.");
            stackSource = stackSource || [];
            stackDest = stackDest || [];
            if (isObject(source)) {
                var index = stackSource.indexOf(source);
                if (index !== -1) return stackDest[index];
                stackSource.push(source);
                stackDest.push(destination);
            }
            var result;
            if (isArray(source)) {
                destination.length = 0;
                for (var i = 0; i < source.length; i++) {
                    result = copy(source[i], null, stackSource, stackDest);
                    if (isObject(source[i])) {
                        stackSource.push(source[i]);
                        stackDest.push(result);
                    }
                    destination.push(result);
                }
            } else {
                var h = destination.$$hashKey;
                if (isArray(destination)) {
                    destination.length = 0;
                } else {
                    forEach(destination, function(value, key) {
                        delete destination[key];
                    });
                }
                for (var key in source) {
                    if (source.hasOwnProperty(key)) {
                        result = copy(source[key], null, stackSource, stackDest);
                        if (isObject(source[key])) {
                            stackSource.push(source[key]);
                            stackDest.push(result);
                        }
                        destination[key] = result;
                    }
                }
                setHashKey(destination, h);
            }
        }
        return destination;
    }
    function shallowCopy(src, dst) {
        if (isArray(src)) {
            dst = dst || [];
            for (var i = 0, ii = src.length; i < ii; i++) {
                dst[i] = src[i];
            }
        } else if (isObject(src)) {
            dst = dst || {};
            for (var key in src) {
                if (!(key.charAt(0) === "$" && key.charAt(1) === "$")) {
                    dst[key] = src[key];
                }
            }
        }
        return dst || src;
    }
    function equals(o1, o2) {
        if (o1 === o2) return true;
        if (o1 === null || o2 === null) return false;
        if (o1 !== o1 && o2 !== o2) return true;
        var t1 = typeof o1, t2 = typeof o2, length, key, keySet;
        if (t1 == t2) {
            if (t1 == "object") {
                if (isArray(o1)) {
                    if (!isArray(o2)) return false;
                    if ((length = o1.length) == o2.length) {
                        for (key = 0; key < length; key++) {
                            if (!equals(o1[key], o2[key])) return false;
                        }
                        return true;
                    }
                } else if (isDate(o1)) {
                    if (!isDate(o2)) return false;
                    return equals(o1.getTime(), o2.getTime());
                } else if (isRegExp(o1) && isRegExp(o2)) {
                    return o1.toString() == o2.toString();
                } else {
                    if (isScope(o1) || isScope(o2) || isWindow(o1) || isWindow(o2) || isArray(o2)) return false;
                    keySet = {};
                    for (key in o1) {
                        if (key.charAt(0) === "$" || isFunction(o1[key])) continue;
                        if (!equals(o1[key], o2[key])) return false;
                        keySet[key] = true;
                    }
                    for (key in o2) {
                        if (!keySet.hasOwnProperty(key) && key.charAt(0) !== "$" && o2[key] !== undefined && !isFunction(o2[key])) return false;
                    }
                    return true;
                }
            }
        }
        return false;
    }
    var csp = function() {
        if (isDefined(csp.isActive_)) return csp.isActive_;
        var active = !!(document.querySelector("[ng-csp]") || document.querySelector("[data-ng-csp]"));
        if (!active) {
            try {
                new Function("");
            } catch (e) {
                active = true;
            }
        }
        return csp.isActive_ = active;
    };
    function concat(array1, array2, index) {
        return array1.concat(slice.call(array2, index));
    }
    function sliceArgs(args, startIndex) {
        return slice.call(args, startIndex || 0);
    }
    function bind(self, fn) {
        var curryArgs = arguments.length > 2 ? sliceArgs(arguments, 2) : [];
        if (isFunction(fn) && !(fn instanceof RegExp)) {
            return curryArgs.length ? function() {
                return arguments.length ? fn.apply(self, curryArgs.concat(slice.call(arguments, 0))) : fn.apply(self, curryArgs);
            } : function() {
                return arguments.length ? fn.apply(self, arguments) : fn.call(self);
            };
        } else {
            return fn;
        }
    }
    function toJsonReplacer(key, value) {
        var val = value;
        if (typeof key === "string" && key.charAt(0) === "$" && key.charAt(1) === "$") {
            val = undefined;
        } else if (isWindow(value)) {
            val = "$WINDOW";
        } else if (value && document === value) {
            val = "$DOCUMENT";
        } else if (isScope(value)) {
            val = "$SCOPE";
        }
        return val;
    }
    function toJson(obj, pretty) {
        if (typeof obj === "undefined") return undefined;
        return JSON.stringify(obj, toJsonReplacer, pretty ? "  " : null);
    }
    function fromJson(json) {
        return isString(json) ? JSON.parse(json) : json;
    }
    function startingTag(element) {
        element = jqLite(element).clone();
        try {
            element.empty();
        } catch (e) {}
        var elemHtml = jqLite("<div>").append(element).html();
        try {
            return element[0].nodeType === NODE_TYPE_TEXT ? lowercase(elemHtml) : elemHtml.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/, function(match, nodeName) {
                return "<" + lowercase(nodeName);
            });
        } catch (e) {
            return lowercase(elemHtml);
        }
    }
    function tryDecodeURIComponent(value) {
        try {
            return decodeURIComponent(value);
        } catch (e) {}
    }
    function parseKeyValue(keyValue) {
        var obj = {}, key_value, key;
        forEach((keyValue || "").split("&"), function(keyValue) {
            if (keyValue) {
                key_value = keyValue.replace(/\+/g, "%20").split("=");
                key = tryDecodeURIComponent(key_value[0]);
                if (isDefined(key)) {
                    var val = isDefined(key_value[1]) ? tryDecodeURIComponent(key_value[1]) : true;
                    if (!hasOwnProperty.call(obj, key)) {
                        obj[key] = val;
                    } else if (isArray(obj[key])) {
                        obj[key].push(val);
                    } else {
                        obj[key] = [ obj[key], val ];
                    }
                }
            }
        });
        return obj;
    }
    function toKeyValue(obj) {
        var parts = [];
        forEach(obj, function(value, key) {
            if (isArray(value)) {
                forEach(value, function(arrayValue) {
                    parts.push(encodeUriQuery(key, true) + (arrayValue === true ? "" : "=" + encodeUriQuery(arrayValue, true)));
                });
            } else {
                parts.push(encodeUriQuery(key, true) + (value === true ? "" : "=" + encodeUriQuery(value, true)));
            }
        });
        return parts.length ? parts.join("&") : "";
    }
    function encodeUriSegment(val) {
        return encodeUriQuery(val, true).replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+");
    }
    function encodeUriQuery(val, pctEncodeSpaces) {
        return encodeURIComponent(val).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%3B/gi, ";").replace(/%20/g, pctEncodeSpaces ? "%20" : "+");
    }
    var ngAttrPrefixes = [ "ng-", "data-ng-", "ng:", "x-ng-" ];
    function getNgAttribute(element, ngAttr) {
        var attr, i, ii = ngAttrPrefixes.length;
        element = jqLite(element);
        for (i = 0; i < ii; ++i) {
            attr = ngAttrPrefixes[i] + ngAttr;
            if (isString(attr = element.attr(attr))) {
                return attr;
            }
        }
        return null;
    }
    function angularInit(element, bootstrap) {
        var appElement, module, config = {};
        forEach(ngAttrPrefixes, function(prefix) {
            var name = prefix + "app";
            if (!appElement && element.hasAttribute && element.hasAttribute(name)) {
                appElement = element;
                module = element.getAttribute(name);
            }
        });
        forEach(ngAttrPrefixes, function(prefix) {
            var name = prefix + "app";
            var candidate;
            if (!appElement && (candidate = element.querySelector("[" + name.replace(":", "\\:") + "]"))) {
                appElement = candidate;
                module = candidate.getAttribute(name);
            }
        });
        if (appElement) {
            config.strictDi = getNgAttribute(appElement, "strict-di") !== null;
            bootstrap(appElement, module ? [ module ] : [], config);
        }
    }
    function bootstrap(element, modules, config) {
        if (!isObject(config)) config = {};
        var defaultConfig = {
            strictDi: false
        };
        config = extend(defaultConfig, config);
        var doBootstrap = function() {
            element = jqLite(element);
            if (element.injector()) {
                var tag = element[0] === document ? "document" : startingTag(element);
                throw ngMinErr("btstrpd", "App Already Bootstrapped with this Element '{0}'", tag.replace(/</, "&lt;").replace(/>/, "&gt;"));
            }
            modules = modules || [];
            modules.unshift([ "$provide", function($provide) {
                $provide.value("$rootElement", element);
            } ]);
            if (config.debugInfoEnabled) {
                modules.push([ "$compileProvider", function($compileProvider) {
                    $compileProvider.debugInfoEnabled(true);
                } ]);
            }
            modules.unshift("ng");
            var injector = createInjector(modules, config.strictDi);
            injector.invoke([ "$rootScope", "$rootElement", "$compile", "$injector", function bootstrapApply(scope, element, compile, injector) {
                scope.$apply(function() {
                    element.data("$injector", injector);
                    compile(element)(scope);
                });
            } ]);
            return injector;
        };
        var NG_ENABLE_DEBUG_INFO = /^NG_ENABLE_DEBUG_INFO!/;
        var NG_DEFER_BOOTSTRAP = /^NG_DEFER_BOOTSTRAP!/;
        if (window && NG_ENABLE_DEBUG_INFO.test(window.name)) {
            config.debugInfoEnabled = true;
            window.name = window.name.replace(NG_ENABLE_DEBUG_INFO, "");
        }
        if (window && !NG_DEFER_BOOTSTRAP.test(window.name)) {
            return doBootstrap();
        }
        window.name = window.name.replace(NG_DEFER_BOOTSTRAP, "");
        angular.resumeBootstrap = function(extraModules) {
            forEach(extraModules, function(module) {
                modules.push(module);
            });
            doBootstrap();
        };
    }
    function reloadWithDebugInfo() {
        window.name = "NG_ENABLE_DEBUG_INFO!" + window.name;
        window.location.reload();
    }
    function getTestability(rootElement) {
        return angular.element(rootElement).injector().get("$$testability");
    }
    var SNAKE_CASE_REGEXP = /[A-Z]/g;
    function snake_case(name, separator) {
        separator = separator || "_";
        return name.replace(SNAKE_CASE_REGEXP, function(letter, pos) {
            return (pos ? separator : "") + letter.toLowerCase();
        });
    }
    var bindJQueryFired = false;
    var skipDestroyOnNextJQueryCleanData;
    function bindJQuery() {
        var originalCleanData;
        if (bindJQueryFired) {
            return;
        }
        jQuery = window.jQuery;
        if (jQuery && jQuery.fn.on) {
            jqLite = jQuery;
            extend(jQuery.fn, {
                scope: JQLitePrototype.scope,
                isolateScope: JQLitePrototype.isolateScope,
                controller: JQLitePrototype.controller,
                injector: JQLitePrototype.injector,
                inheritedData: JQLitePrototype.inheritedData
            });
            originalCleanData = jQuery.cleanData;
            jQuery.cleanData = function(elems) {
                var events;
                if (!skipDestroyOnNextJQueryCleanData) {
                    for (var i = 0, elem; (elem = elems[i]) != null; i++) {
                        events = jQuery._data(elem, "events");
                        if (events && events.$destroy) {
                            jQuery(elem).triggerHandler("$destroy");
                        }
                    }
                } else {
                    skipDestroyOnNextJQueryCleanData = false;
                }
                originalCleanData(elems);
            };
        } else {
            jqLite = JQLite;
        }
        angular.element = jqLite;
        bindJQueryFired = true;
    }
    function assertArg(arg, name, reason) {
        if (!arg) {
            throw ngMinErr("areq", "Argument '{0}' is {1}", name || "?", reason || "required");
        }
        return arg;
    }
    function assertArgFn(arg, name, acceptArrayAnnotation) {
        if (acceptArrayAnnotation && isArray(arg)) {
            arg = arg[arg.length - 1];
        }
        assertArg(isFunction(arg), name, "not a function, got " + (arg && typeof arg === "object" ? arg.constructor.name || "Object" : typeof arg));
        return arg;
    }
    function assertNotHasOwnProperty(name, context) {
        if (name === "hasOwnProperty") {
            throw ngMinErr("badname", "hasOwnProperty is not a valid {0} name", context);
        }
    }
    function getter(obj, path, bindFnToScope) {
        if (!path) return obj;
        var keys = path.split(".");
        var key;
        var lastInstance = obj;
        var len = keys.length;
        for (var i = 0; i < len; i++) {
            key = keys[i];
            if (obj) {
                obj = (lastInstance = obj)[key];
            }
        }
        if (!bindFnToScope && isFunction(obj)) {
            return bind(lastInstance, obj);
        }
        return obj;
    }
    function getBlockNodes(nodes) {
        var node = nodes[0];
        var endNode = nodes[nodes.length - 1];
        var blockNodes = [ node ];
        do {
            node = node.nextSibling;
            if (!node) break;
            blockNodes.push(node);
        } while (node !== endNode);
        return jqLite(blockNodes);
    }
    function createMap() {
        return Object.create(null);
    }
    var NODE_TYPE_ELEMENT = 1;
    var NODE_TYPE_TEXT = 3;
    var NODE_TYPE_COMMENT = 8;
    var NODE_TYPE_DOCUMENT = 9;
    var NODE_TYPE_DOCUMENT_FRAGMENT = 11;
    function setupModuleLoader(window) {
        var $injectorMinErr = minErr("$injector");
        var ngMinErr = minErr("ng");
        function ensure(obj, name, factory) {
            return obj[name] || (obj[name] = factory());
        }
        var angular = ensure(window, "angular", Object);
        angular.$$minErr = angular.$$minErr || minErr;
        return ensure(angular, "module", function() {
            var modules = {};
            return function module(name, requires, configFn) {
                var assertNotHasOwnProperty = function(name, context) {
                    if (name === "hasOwnProperty") {
                        throw ngMinErr("badname", "hasOwnProperty is not a valid {0} name", context);
                    }
                };
                assertNotHasOwnProperty(name, "module");
                if (requires && modules.hasOwnProperty(name)) {
                    modules[name] = null;
                }
                return ensure(modules, name, function() {
                    if (!requires) {
                        throw $injectorMinErr("nomod", "Module '{0}' is not available! You either misspelled " + "the module name or forgot to load it. If registering a module ensure that you " + "specify the dependencies as the second argument.", name);
                    }
                    var invokeQueue = [];
                    var configBlocks = [];
                    var runBlocks = [];
                    var config = invokeLater("$injector", "invoke", "push", configBlocks);
                    var moduleInstance = {
                        _invokeQueue: invokeQueue,
                        _configBlocks: configBlocks,
                        _runBlocks: runBlocks,
                        requires: requires,
                        name: name,
                        provider: invokeLater("$provide", "provider"),
                        factory: invokeLater("$provide", "factory"),
                        service: invokeLater("$provide", "service"),
                        value: invokeLater("$provide", "value"),
                        constant: invokeLater("$provide", "constant", "unshift"),
                        animation: invokeLater("$animateProvider", "register"),
                        filter: invokeLater("$filterProvider", "register"),
                        controller: invokeLater("$controllerProvider", "register"),
                        directive: invokeLater("$compileProvider", "directive"),
                        config: config,
                        run: function(block) {
                            runBlocks.push(block);
                            return this;
                        }
                    };
                    if (configFn) {
                        config(configFn);
                    }
                    return moduleInstance;
                    function invokeLater(provider, method, insertMethod, queue) {
                        if (!queue) queue = invokeQueue;
                        return function() {
                            queue[insertMethod || "push"]([ provider, method, arguments ]);
                            return moduleInstance;
                        };
                    }
                });
            };
        });
    }
    var version = {
        full: "1.3.1",
        major: 1,
        minor: 3,
        dot: 1,
        codeName: "spectral-lobster"
    };
    function publishExternalAPI(angular) {
        extend(angular, {
            bootstrap: bootstrap,
            copy: copy,
            extend: extend,
            equals: equals,
            element: jqLite,
            forEach: forEach,
            injector: createInjector,
            noop: noop,
            bind: bind,
            toJson: toJson,
            fromJson: fromJson,
            identity: identity,
            isUndefined: isUndefined,
            isDefined: isDefined,
            isString: isString,
            isFunction: isFunction,
            isObject: isObject,
            isNumber: isNumber,
            isElement: isElement,
            isArray: isArray,
            version: version,
            isDate: isDate,
            lowercase: lowercase,
            uppercase: uppercase,
            callbacks: {
                counter: 0
            },
            getTestability: getTestability,
            $$minErr: minErr,
            $$csp: csp,
            reloadWithDebugInfo: reloadWithDebugInfo
        });
        angularModule = setupModuleLoader(window);
        try {
            angularModule("ngLocale");
        } catch (e) {
            angularModule("ngLocale", []).provider("$locale", $LocaleProvider);
        }
        angularModule("ng", [ "ngLocale" ], [ "$provide", function ngModule($provide) {
            $provide.provider({
                $$sanitizeUri: $$SanitizeUriProvider
            });
            $provide.provider("$compile", $CompileProvider).directive({
                a: htmlAnchorDirective,
                input: inputDirective,
                textarea: inputDirective,
                form: formDirective,
                script: scriptDirective,
                select: selectDirective,
                style: styleDirective,
                option: optionDirective,
                ngBind: ngBindDirective,
                ngBindHtml: ngBindHtmlDirective,
                ngBindTemplate: ngBindTemplateDirective,
                ngClass: ngClassDirective,
                ngClassEven: ngClassEvenDirective,
                ngClassOdd: ngClassOddDirective,
                ngCloak: ngCloakDirective,
                ngController: ngControllerDirective,
                ngForm: ngFormDirective,
                ngHide: ngHideDirective,
                ngIf: ngIfDirective,
                ngInclude: ngIncludeDirective,
                ngInit: ngInitDirective,
                ngNonBindable: ngNonBindableDirective,
                ngPluralize: ngPluralizeDirective,
                ngRepeat: ngRepeatDirective,
                ngShow: ngShowDirective,
                ngStyle: ngStyleDirective,
                ngSwitch: ngSwitchDirective,
                ngSwitchWhen: ngSwitchWhenDirective,
                ngSwitchDefault: ngSwitchDefaultDirective,
                ngOptions: ngOptionsDirective,
                ngTransclude: ngTranscludeDirective,
                ngModel: ngModelDirective,
                ngList: ngListDirective,
                ngChange: ngChangeDirective,
                pattern: patternDirective,
                ngPattern: patternDirective,
                required: requiredDirective,
                ngRequired: requiredDirective,
                minlength: minlengthDirective,
                ngMinlength: minlengthDirective,
                maxlength: maxlengthDirective,
                ngMaxlength: maxlengthDirective,
                ngValue: ngValueDirective,
                ngModelOptions: ngModelOptionsDirective
            }).directive({
                ngInclude: ngIncludeFillContentDirective
            }).directive(ngAttributeAliasDirectives).directive(ngEventDirectives);
            $provide.provider({
                $anchorScroll: $AnchorScrollProvider,
                $animate: $AnimateProvider,
                $browser: $BrowserProvider,
                $cacheFactory: $CacheFactoryProvider,
                $controller: $ControllerProvider,
                $document: $DocumentProvider,
                $exceptionHandler: $ExceptionHandlerProvider,
                $filter: $FilterProvider,
                $interpolate: $InterpolateProvider,
                $interval: $IntervalProvider,
                $http: $HttpProvider,
                $httpBackend: $HttpBackendProvider,
                $location: $LocationProvider,
                $log: $LogProvider,
                $parse: $ParseProvider,
                $rootScope: $RootScopeProvider,
                $q: $QProvider,
                $$q: $$QProvider,
                $sce: $SceProvider,
                $sceDelegate: $SceDelegateProvider,
                $sniffer: $SnifferProvider,
                $templateCache: $TemplateCacheProvider,
                $templateRequest: $TemplateRequestProvider,
                $$testability: $$TestabilityProvider,
                $timeout: $TimeoutProvider,
                $window: $WindowProvider,
                $$rAF: $$RAFProvider,
                $$asyncCallback: $$AsyncCallbackProvider
            });
        } ]);
    }
    JQLite.expando = "ng339";
    var jqCache = JQLite.cache = {}, jqId = 1, addEventListenerFn = function(element, type, fn) {
        element.addEventListener(type, fn, false);
    }, removeEventListenerFn = function(element, type, fn) {
        element.removeEventListener(type, fn, false);
    };
    JQLite._data = function(node) {
        return this.cache[node[this.expando]] || {};
    };
    function jqNextId() {
        return ++jqId;
    }
    var SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
    var MOZ_HACK_REGEXP = /^moz([A-Z])/;
    var MOUSE_EVENT_MAP = {
        mouseleave: "mouseout",
        mouseenter: "mouseover"
    };
    var jqLiteMinErr = minErr("jqLite");
    function camelCase(name) {
        return name.replace(SPECIAL_CHARS_REGEXP, function(_, separator, letter, offset) {
            return offset ? letter.toUpperCase() : letter;
        }).replace(MOZ_HACK_REGEXP, "Moz$1");
    }
    var SINGLE_TAG_REGEXP = /^<(\w+)\s*\/?>(?:<\/\1>|)$/;
    var HTML_REGEXP = /<|&#?\w+;/;
    var TAG_NAME_REGEXP = /<([\w:]+)/;
    var XHTML_TAG_REGEXP = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi;
    var wrapMap = {
        option: [ 1, '<select multiple="multiple">', "</select>" ],
        thead: [ 1, "<table>", "</table>" ],
        col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
        tr: [ 2, "<table><tbody>", "</tbody></table>" ],
        td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
        _default: [ 0, "", "" ]
    };
    wrapMap.optgroup = wrapMap.option;
    wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
    wrapMap.th = wrapMap.td;
    function jqLiteIsTextNode(html) {
        return !HTML_REGEXP.test(html);
    }
    function jqLiteAcceptsData(node) {
        var nodeType = node.nodeType;
        return nodeType === NODE_TYPE_ELEMENT || !nodeType || nodeType === NODE_TYPE_DOCUMENT;
    }
    function jqLiteBuildFragment(html, context) {
        var tmp, tag, wrap, fragment = context.createDocumentFragment(), nodes = [], i;
        if (jqLiteIsTextNode(html)) {
            nodes.push(context.createTextNode(html));
        } else {
            tmp = tmp || fragment.appendChild(context.createElement("div"));
            tag = (TAG_NAME_REGEXP.exec(html) || [ "", "" ])[1].toLowerCase();
            wrap = wrapMap[tag] || wrapMap._default;
            tmp.innerHTML = wrap[1] + html.replace(XHTML_TAG_REGEXP, "<$1></$2>") + wrap[2];
            i = wrap[0];
            while (i--) {
                tmp = tmp.lastChild;
            }
            nodes = concat(nodes, tmp.childNodes);
            tmp = fragment.firstChild;
            tmp.textContent = "";
        }
        fragment.textContent = "";
        fragment.innerHTML = "";
        forEach(nodes, function(node) {
            fragment.appendChild(node);
        });
        return fragment;
    }
    function jqLiteParseHTML(html, context) {
        context = context || document;
        var parsed;
        if (parsed = SINGLE_TAG_REGEXP.exec(html)) {
            return [ context.createElement(parsed[1]) ];
        }
        if (parsed = jqLiteBuildFragment(html, context)) {
            return parsed.childNodes;
        }
        return [];
    }
    function JQLite(element) {
        if (element instanceof JQLite) {
            return element;
        }
        var argIsString;
        if (isString(element)) {
            element = trim(element);
            argIsString = true;
        }
        if (!(this instanceof JQLite)) {
            if (argIsString && element.charAt(0) != "<") {
                throw jqLiteMinErr("nosel", "Looking up elements via selectors is not supported by jqLite! See: http://docs.angularjs.org/api/angular.element");
            }
            return new JQLite(element);
        }
        if (argIsString) {
            jqLiteAddNodes(this, jqLiteParseHTML(element));
        } else {
            jqLiteAddNodes(this, element);
        }
    }
    function jqLiteClone(element) {
        return element.cloneNode(true);
    }
    function jqLiteDealoc(element, onlyDescendants) {
        if (!onlyDescendants) jqLiteRemoveData(element);
        if (element.querySelectorAll) {
            var descendants = element.querySelectorAll("*");
            for (var i = 0, l = descendants.length; i < l; i++) {
                jqLiteRemoveData(descendants[i]);
            }
        }
    }
    function jqLiteOff(element, type, fn, unsupported) {
        if (isDefined(unsupported)) throw jqLiteMinErr("offargs", "jqLite#off() does not support the `selector` argument");
        var expandoStore = jqLiteExpandoStore(element);
        var events = expandoStore && expandoStore.events;
        var handle = expandoStore && expandoStore.handle;
        if (!handle) return;
        if (!type) {
            for (type in events) {
                if (type !== "$destroy") {
                    removeEventListenerFn(element, type, handle);
                }
                delete events[type];
            }
        } else {
            forEach(type.split(" "), function(type) {
                if (isDefined(fn)) {
                    var listenerFns = events[type];
                    arrayRemove(listenerFns || [], fn);
                    if (listenerFns && listenerFns.length > 0) {
                        return;
                    }
                }
                removeEventListenerFn(element, type, handle);
                delete events[type];
            });
        }
    }
    function jqLiteRemoveData(element, name) {
        var expandoId = element.ng339;
        var expandoStore = expandoId && jqCache[expandoId];
        if (expandoStore) {
            if (name) {
                delete expandoStore.data[name];
                return;
            }
            if (expandoStore.handle) {
                if (expandoStore.events.$destroy) {
                    expandoStore.handle({}, "$destroy");
                }
                jqLiteOff(element);
            }
            delete jqCache[expandoId];
            element.ng339 = undefined;
        }
    }
    function jqLiteExpandoStore(element, createIfNecessary) {
        var expandoId = element.ng339, expandoStore = expandoId && jqCache[expandoId];
        if (createIfNecessary && !expandoStore) {
            element.ng339 = expandoId = jqNextId();
            expandoStore = jqCache[expandoId] = {
                events: {},
                data: {},
                handle: undefined
            };
        }
        return expandoStore;
    }
    function jqLiteData(element, key, value) {
        if (jqLiteAcceptsData(element)) {
            var isSimpleSetter = isDefined(value);
            var isSimpleGetter = !isSimpleSetter && key && !isObject(key);
            var massGetter = !key;
            var expandoStore = jqLiteExpandoStore(element, !isSimpleGetter);
            var data = expandoStore && expandoStore.data;
            if (isSimpleSetter) {
                data[key] = value;
            } else {
                if (massGetter) {
                    return data;
                } else {
                    if (isSimpleGetter) {
                        return data && data[key];
                    } else {
                        extend(data, key);
                    }
                }
            }
        }
    }
    function jqLiteHasClass(element, selector) {
        if (!element.getAttribute) return false;
        return (" " + (element.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").indexOf(" " + selector + " ") > -1;
    }
    function jqLiteRemoveClass(element, cssClasses) {
        if (cssClasses && element.setAttribute) {
            forEach(cssClasses.split(" "), function(cssClass) {
                element.setAttribute("class", trim((" " + (element.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").replace(" " + trim(cssClass) + " ", " ")));
            });
        }
    }
    function jqLiteAddClass(element, cssClasses) {
        if (cssClasses && element.setAttribute) {
            var existingClasses = (" " + (element.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ");
            forEach(cssClasses.split(" "), function(cssClass) {
                cssClass = trim(cssClass);
                if (existingClasses.indexOf(" " + cssClass + " ") === -1) {
                    existingClasses += cssClass + " ";
                }
            });
            element.setAttribute("class", trim(existingClasses));
        }
    }
    function jqLiteAddNodes(root, elements) {
        if (elements) {
            if (elements.nodeType) {
                root[root.length++] = elements;
            } else {
                var length = elements.length;
                if (typeof length === "number" && elements.window !== elements) {
                    if (length) {
                        for (var i = 0; i < length; i++) {
                            root[root.length++] = elements[i];
                        }
                    }
                } else {
                    root[root.length++] = elements;
                }
            }
        }
    }
    function jqLiteController(element, name) {
        return jqLiteInheritedData(element, "$" + (name || "ngController") + "Controller");
    }
    function jqLiteInheritedData(element, name, value) {
        if (element.nodeType == NODE_TYPE_DOCUMENT) {
            element = element.documentElement;
        }
        var names = isArray(name) ? name : [ name ];
        while (element) {
            for (var i = 0, ii = names.length; i < ii; i++) {
                if ((value = jqLite.data(element, names[i])) !== undefined) return value;
            }
            element = element.parentNode || element.nodeType === NODE_TYPE_DOCUMENT_FRAGMENT && element.host;
        }
    }
    function jqLiteEmpty(element) {
        jqLiteDealoc(element, true);
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }
    function jqLiteRemove(element, keepData) {
        if (!keepData) jqLiteDealoc(element);
        var parent = element.parentNode;
        if (parent) parent.removeChild(element);
    }
    function jqLiteDocumentLoaded(action, win) {
        win = win || window;
        if (win.document.readyState === "complete") {
            win.setTimeout(action);
        } else {
            jqLite(win).on("load", action);
        }
    }
    var JQLitePrototype = JQLite.prototype = {
        ready: function(fn) {
            var fired = false;
            function trigger() {
                if (fired) return;
                fired = true;
                fn();
            }
            if (document.readyState === "complete") {
                setTimeout(trigger);
            } else {
                this.on("DOMContentLoaded", trigger);
                JQLite(window).on("load", trigger);
            }
        },
        toString: function() {
            var value = [];
            forEach(this, function(e) {
                value.push("" + e);
            });
            return "[" + value.join(", ") + "]";
        },
        eq: function(index) {
            return index >= 0 ? jqLite(this[index]) : jqLite(this[this.length + index]);
        },
        length: 0,
        push: push,
        sort: [].sort,
        splice: [].splice
    };
    var BOOLEAN_ATTR = {};
    forEach("multiple,selected,checked,disabled,readOnly,required,open".split(","), function(value) {
        BOOLEAN_ATTR[lowercase(value)] = value;
    });
    var BOOLEAN_ELEMENTS = {};
    forEach("input,select,option,textarea,button,form,details".split(","), function(value) {
        BOOLEAN_ELEMENTS[value] = true;
    });
    var ALIASED_ATTR = {
        ngMinlength: "minlength",
        ngMaxlength: "maxlength",
        ngMin: "min",
        ngMax: "max",
        ngPattern: "pattern"
    };
    function getBooleanAttrName(element, name) {
        var booleanAttr = BOOLEAN_ATTR[name.toLowerCase()];
        return booleanAttr && BOOLEAN_ELEMENTS[nodeName_(element)] && booleanAttr;
    }
    function getAliasedAttrName(element, name) {
        var nodeName = element.nodeName;
        return (nodeName === "INPUT" || nodeName === "TEXTAREA") && ALIASED_ATTR[name];
    }
    forEach({
        data: jqLiteData,
        removeData: jqLiteRemoveData
    }, function(fn, name) {
        JQLite[name] = fn;
    });
    forEach({
        data: jqLiteData,
        inheritedData: jqLiteInheritedData,
        scope: function(element) {
            return jqLite.data(element, "$scope") || jqLiteInheritedData(element.parentNode || element, [ "$isolateScope", "$scope" ]);
        },
        isolateScope: function(element) {
            return jqLite.data(element, "$isolateScope") || jqLite.data(element, "$isolateScopeNoTemplate");
        },
        controller: jqLiteController,
        injector: function(element) {
            return jqLiteInheritedData(element, "$injector");
        },
        removeAttr: function(element, name) {
            element.removeAttribute(name);
        },
        hasClass: jqLiteHasClass,
        css: function(element, name, value) {
            name = camelCase(name);
            if (isDefined(value)) {
                element.style[name] = value;
            } else {
                return element.style[name];
            }
        },
        attr: function(element, name, value) {
            var lowercasedName = lowercase(name);
            if (BOOLEAN_ATTR[lowercasedName]) {
                if (isDefined(value)) {
                    if (!!value) {
                        element[name] = true;
                        element.setAttribute(name, lowercasedName);
                    } else {
                        element[name] = false;
                        element.removeAttribute(lowercasedName);
                    }
                } else {
                    return element[name] || (element.attributes.getNamedItem(name) || noop).specified ? lowercasedName : undefined;
                }
            } else if (isDefined(value)) {
                element.setAttribute(name, value);
            } else if (element.getAttribute) {
                var ret = element.getAttribute(name, 2);
                return ret === null ? undefined : ret;
            }
        },
        prop: function(element, name, value) {
            if (isDefined(value)) {
                element[name] = value;
            } else {
                return element[name];
            }
        },
        text: function() {
            getText.$dv = "";
            return getText;
            function getText(element, value) {
                if (isUndefined(value)) {
                    var nodeType = element.nodeType;
                    return nodeType === NODE_TYPE_ELEMENT || nodeType === NODE_TYPE_TEXT ? element.textContent : "";
                }
                element.textContent = value;
            }
        }(),
        val: function(element, value) {
            if (isUndefined(value)) {
                if (element.multiple && nodeName_(element) === "select") {
                    var result = [];
                    forEach(element.options, function(option) {
                        if (option.selected) {
                            result.push(option.value || option.text);
                        }
                    });
                    return result.length === 0 ? null : result;
                }
                return element.value;
            }
            element.value = value;
        },
        html: function(element, value) {
            if (isUndefined(value)) {
                return element.innerHTML;
            }
            jqLiteDealoc(element, true);
            element.innerHTML = value;
        },
        empty: jqLiteEmpty
    }, function(fn, name) {
        JQLite.prototype[name] = function(arg1, arg2) {
            var i, key;
            var nodeCount = this.length;
            if (fn !== jqLiteEmpty && (fn.length == 2 && (fn !== jqLiteHasClass && fn !== jqLiteController) ? arg1 : arg2) === undefined) {
                if (isObject(arg1)) {
                    for (i = 0; i < nodeCount; i++) {
                        if (fn === jqLiteData) {
                            fn(this[i], arg1);
                        } else {
                            for (key in arg1) {
                                fn(this[i], key, arg1[key]);
                            }
                        }
                    }
                    return this;
                } else {
                    var value = fn.$dv;
                    var jj = value === undefined ? Math.min(nodeCount, 1) : nodeCount;
                    for (var j = 0; j < jj; j++) {
                        var nodeValue = fn(this[j], arg1, arg2);
                        value = value ? value + nodeValue : nodeValue;
                    }
                    return value;
                }
            } else {
                for (i = 0; i < nodeCount; i++) {
                    fn(this[i], arg1, arg2);
                }
                return this;
            }
        };
    });
    function createEventHandler(element, events) {
        var eventHandler = function(event, type) {
            event.isDefaultPrevented = function() {
                return event.defaultPrevented;
            };
            var eventFns = events[type || event.type];
            var eventFnsLength = eventFns ? eventFns.length : 0;
            if (!eventFnsLength) return;
            if (isUndefined(event.immediatePropagationStopped)) {
                var originalStopImmediatePropagation = event.stopImmediatePropagation;
                event.stopImmediatePropagation = function() {
                    event.immediatePropagationStopped = true;
                    if (event.stopPropagation) {
                        event.stopPropagation();
                    }
                    if (originalStopImmediatePropagation) {
                        originalStopImmediatePropagation.call(event);
                    }
                };
            }
            event.isImmediatePropagationStopped = function() {
                return event.immediatePropagationStopped === true;
            };
            if (eventFnsLength > 1) {
                eventFns = shallowCopy(eventFns);
            }
            for (var i = 0; i < eventFnsLength; i++) {
                if (!event.isImmediatePropagationStopped()) {
                    eventFns[i].call(element, event);
                }
            }
        };
        eventHandler.elem = element;
        return eventHandler;
    }
    forEach({
        removeData: jqLiteRemoveData,
        on: function jqLiteOn(element, type, fn, unsupported) {
            if (isDefined(unsupported)) throw jqLiteMinErr("onargs", "jqLite#on() does not support the `selector` or `eventData` parameters");
            if (!jqLiteAcceptsData(element)) {
                return;
            }
            var expandoStore = jqLiteExpandoStore(element, true);
            var events = expandoStore.events;
            var handle = expandoStore.handle;
            if (!handle) {
                handle = expandoStore.handle = createEventHandler(element, events);
            }
            var types = type.indexOf(" ") >= 0 ? type.split(" ") : [ type ];
            var i = types.length;
            while (i--) {
                type = types[i];
                var eventFns = events[type];
                if (!eventFns) {
                    events[type] = [];
                    if (type === "mouseenter" || type === "mouseleave") {
                        jqLiteOn(element, MOUSE_EVENT_MAP[type], function(event) {
                            var target = this, related = event.relatedTarget;
                            if (!related || related !== target && !target.contains(related)) {
                                handle(event, type);
                            }
                        });
                    } else {
                        if (type !== "$destroy") {
                            addEventListenerFn(element, type, handle);
                        }
                    }
                    eventFns = events[type];
                }
                eventFns.push(fn);
            }
        },
        off: jqLiteOff,
        one: function(element, type, fn) {
            element = jqLite(element);
            element.on(type, function onFn() {
                element.off(type, fn);
                element.off(type, onFn);
            });
            element.on(type, fn);
        },
        replaceWith: function(element, replaceNode) {
            var index, parent = element.parentNode;
            jqLiteDealoc(element);
            forEach(new JQLite(replaceNode), function(node) {
                if (index) {
                    parent.insertBefore(node, index.nextSibling);
                } else {
                    parent.replaceChild(node, element);
                }
                index = node;
            });
        },
        children: function(element) {
            var children = [];
            forEach(element.childNodes, function(element) {
                if (element.nodeType === NODE_TYPE_ELEMENT) children.push(element);
            });
            return children;
        },
        contents: function(element) {
            return element.contentDocument || element.childNodes || [];
        },
        append: function(element, node) {
            var nodeType = element.nodeType;
            if (nodeType !== NODE_TYPE_ELEMENT && nodeType !== NODE_TYPE_DOCUMENT_FRAGMENT) return;
            node = new JQLite(node);
            for (var i = 0, ii = node.length; i < ii; i++) {
                var child = node[i];
                element.appendChild(child);
            }
        },
        prepend: function(element, node) {
            if (element.nodeType === NODE_TYPE_ELEMENT) {
                var index = element.firstChild;
                forEach(new JQLite(node), function(child) {
                    element.insertBefore(child, index);
                });
            }
        },
        wrap: function(element, wrapNode) {
            wrapNode = jqLite(wrapNode).eq(0).clone()[0];
            var parent = element.parentNode;
            if (parent) {
                parent.replaceChild(wrapNode, element);
            }
            wrapNode.appendChild(element);
        },
        remove: jqLiteRemove,
        detach: function(element) {
            jqLiteRemove(element, true);
        },
        after: function(element, newElement) {
            var index = element, parent = element.parentNode;
            newElement = new JQLite(newElement);
            for (var i = 0, ii = newElement.length; i < ii; i++) {
                var node = newElement[i];
                parent.insertBefore(node, index.nextSibling);
                index = node;
            }
        },
        addClass: jqLiteAddClass,
        removeClass: jqLiteRemoveClass,
        toggleClass: function(element, selector, condition) {
            if (selector) {
                forEach(selector.split(" "), function(className) {
                    var classCondition = condition;
                    if (isUndefined(classCondition)) {
                        classCondition = !jqLiteHasClass(element, className);
                    }
                    (classCondition ? jqLiteAddClass : jqLiteRemoveClass)(element, className);
                });
            }
        },
        parent: function(element) {
            var parent = element.parentNode;
            return parent && parent.nodeType !== NODE_TYPE_DOCUMENT_FRAGMENT ? parent : null;
        },
        next: function(element) {
            return element.nextElementSibling;
        },
        find: function(element, selector) {
            if (element.getElementsByTagName) {
                return element.getElementsByTagName(selector);
            } else {
                return [];
            }
        },
        clone: jqLiteClone,
        triggerHandler: function(element, event, extraParameters) {
            var dummyEvent, eventFnsCopy, handlerArgs;
            var eventName = event.type || event;
            var expandoStore = jqLiteExpandoStore(element);
            var events = expandoStore && expandoStore.events;
            var eventFns = events && events[eventName];
            if (eventFns) {
                dummyEvent = {
                    preventDefault: function() {
                        this.defaultPrevented = true;
                    },
                    isDefaultPrevented: function() {
                        return this.defaultPrevented === true;
                    },
                    stopImmediatePropagation: function() {
                        this.immediatePropagationStopped = true;
                    },
                    isImmediatePropagationStopped: function() {
                        return this.immediatePropagationStopped === true;
                    },
                    stopPropagation: noop,
                    type: eventName,
                    target: element
                };
                if (event.type) {
                    dummyEvent = extend(dummyEvent, event);
                }
                eventFnsCopy = shallowCopy(eventFns);
                handlerArgs = extraParameters ? [ dummyEvent ].concat(extraParameters) : [ dummyEvent ];
                forEach(eventFnsCopy, function(fn) {
                    if (!dummyEvent.isImmediatePropagationStopped()) {
                        fn.apply(element, handlerArgs);
                    }
                });
            }
        }
    }, function(fn, name) {
        JQLite.prototype[name] = function(arg1, arg2, arg3) {
            var value;
            for (var i = 0, ii = this.length; i < ii; i++) {
                if (isUndefined(value)) {
                    value = fn(this[i], arg1, arg2, arg3);
                    if (isDefined(value)) {
                        value = jqLite(value);
                    }
                } else {
                    jqLiteAddNodes(value, fn(this[i], arg1, arg2, arg3));
                }
            }
            return isDefined(value) ? value : this;
        };
        JQLite.prototype.bind = JQLite.prototype.on;
        JQLite.prototype.unbind = JQLite.prototype.off;
    });
    function hashKey(obj, nextUidFn) {
        var key = obj && obj.$$hashKey;
        if (key) {
            if (typeof key === "function") {
                key = obj.$$hashKey();
            }
            return key;
        }
        var objType = typeof obj;
        if (objType == "function" || objType == "object" && obj !== null) {
            key = obj.$$hashKey = objType + ":" + (nextUidFn || nextUid)();
        } else {
            key = objType + ":" + obj;
        }
        return key;
    }
    function HashMap(array, isolatedUid) {
        if (isolatedUid) {
            var uid = 0;
            this.nextUid = function() {
                return ++uid;
            };
        }
        forEach(array, this.put, this);
    }
    HashMap.prototype = {
        put: function(key, value) {
            this[hashKey(key, this.nextUid)] = value;
        },
        get: function(key) {
            return this[hashKey(key, this.nextUid)];
        },
        remove: function(key) {
            var value = this[key = hashKey(key, this.nextUid)];
            delete this[key];
            return value;
        }
    };
    var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
    var FN_ARG_SPLIT = /,/;
    var FN_ARG = /^\s*(_?)(\S+?)\1\s*$/;
    var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;
    var $injectorMinErr = minErr("$injector");
    function anonFn(fn) {
        var fnText = fn.toString().replace(STRIP_COMMENTS, ""), args = fnText.match(FN_ARGS);
        if (args) {
            return "function(" + (args[1] || "").replace(/[\s\r\n]+/, " ") + ")";
        }
        return "fn";
    }
    function annotate(fn, strictDi, name) {
        var $inject, fnText, argDecl, last;
        if (typeof fn === "function") {
            if (!($inject = fn.$inject)) {
                $inject = [];
                if (fn.length) {
                    if (strictDi) {
                        if (!isString(name) || !name) {
                            name = fn.name || anonFn(fn);
                        }
                        throw $injectorMinErr("strictdi", "{0} is not using explicit annotation and cannot be invoked in strict mode", name);
                    }
                    fnText = fn.toString().replace(STRIP_COMMENTS, "");
                    argDecl = fnText.match(FN_ARGS);
                    forEach(argDecl[1].split(FN_ARG_SPLIT), function(arg) {
                        arg.replace(FN_ARG, function(all, underscore, name) {
                            $inject.push(name);
                        });
                    });
                }
                fn.$inject = $inject;
            }
        } else if (isArray(fn)) {
            last = fn.length - 1;
            assertArgFn(fn[last], "fn");
            $inject = fn.slice(0, last);
        } else {
            assertArgFn(fn, "fn", true);
        }
        return $inject;
    }
    function createInjector(modulesToLoad, strictDi) {
        strictDi = strictDi === true;
        var INSTANTIATING = {}, providerSuffix = "Provider", path = [], loadedModules = new HashMap([], true), providerCache = {
            $provide: {
                provider: supportObject(provider),
                factory: supportObject(factory),
                service: supportObject(service),
                value: supportObject(value),
                constant: supportObject(constant),
                decorator: decorator
            }
        }, providerInjector = providerCache.$injector = createInternalInjector(providerCache, function() {
            throw $injectorMinErr("unpr", "Unknown provider: {0}", path.join(" <- "));
        }), instanceCache = {}, instanceInjector = instanceCache.$injector = createInternalInjector(instanceCache, function(servicename) {
            var provider = providerInjector.get(servicename + providerSuffix);
            return instanceInjector.invoke(provider.$get, provider, undefined, servicename);
        });
        forEach(loadModules(modulesToLoad), function(fn) {
            instanceInjector.invoke(fn || noop);
        });
        return instanceInjector;
        function supportObject(delegate) {
            return function(key, value) {
                if (isObject(key)) {
                    forEach(key, reverseParams(delegate));
                } else {
                    return delegate(key, value);
                }
            };
        }
        function provider(name, provider_) {
            assertNotHasOwnProperty(name, "service");
            if (isFunction(provider_) || isArray(provider_)) {
                provider_ = providerInjector.instantiate(provider_);
            }
            if (!provider_.$get) {
                throw $injectorMinErr("pget", "Provider '{0}' must define $get factory method.", name);
            }
            return providerCache[name + providerSuffix] = provider_;
        }
        function enforceReturnValue(name, factory) {
            return function enforcedReturnValue() {
                var result = instanceInjector.invoke(factory, this, undefined, name);
                if (isUndefined(result)) {
                    throw $injectorMinErr("undef", "Provider '{0}' must return a value from $get factory method.", name);
                }
                return result;
            };
        }
        function factory(name, factoryFn, enforce) {
            return provider(name, {
                $get: enforce !== false ? enforceReturnValue(name, factoryFn) : factoryFn
            });
        }
        function service(name, constructor) {
            return factory(name, [ "$injector", function($injector) {
                return $injector.instantiate(constructor);
            } ]);
        }
        function value(name, val) {
            return factory(name, valueFn(val), false);
        }
        function constant(name, value) {
            assertNotHasOwnProperty(name, "constant");
            providerCache[name] = value;
            instanceCache[name] = value;
        }
        function decorator(serviceName, decorFn) {
            var origProvider = providerInjector.get(serviceName + providerSuffix), orig$get = origProvider.$get;
            origProvider.$get = function() {
                var origInstance = instanceInjector.invoke(orig$get, origProvider);
                return instanceInjector.invoke(decorFn, null, {
                    $delegate: origInstance
                });
            };
        }
        function loadModules(modulesToLoad) {
            var runBlocks = [], moduleFn;
            forEach(modulesToLoad, function(module) {
                if (loadedModules.get(module)) return;
                loadedModules.put(module, true);
                function runInvokeQueue(queue) {
                    var i, ii;
                    for (i = 0, ii = queue.length; i < ii; i++) {
                        var invokeArgs = queue[i], provider = providerInjector.get(invokeArgs[0]);
                        provider[invokeArgs[1]].apply(provider, invokeArgs[2]);
                    }
                }
                try {
                    if (isString(module)) {
                        moduleFn = angularModule(module);
                        runBlocks = runBlocks.concat(loadModules(moduleFn.requires)).concat(moduleFn._runBlocks);
                        runInvokeQueue(moduleFn._invokeQueue);
                        runInvokeQueue(moduleFn._configBlocks);
                    } else if (isFunction(module)) {
                        runBlocks.push(providerInjector.invoke(module));
                    } else if (isArray(module)) {
                        runBlocks.push(providerInjector.invoke(module));
                    } else {
                        assertArgFn(module, "module");
                    }
                } catch (e) {
                    if (isArray(module)) {
                        module = module[module.length - 1];
                    }
                    if (e.message && e.stack && e.stack.indexOf(e.message) == -1) {
                        e = e.message + "\n" + e.stack;
                    }
                    throw $injectorMinErr("modulerr", "Failed to instantiate module {0} due to:\n{1}", module, e.stack || e.message || e);
                }
            });
            return runBlocks;
        }
        function createInternalInjector(cache, factory) {
            function getService(serviceName) {
                if (cache.hasOwnProperty(serviceName)) {
                    if (cache[serviceName] === INSTANTIATING) {
                        throw $injectorMinErr("cdep", "Circular dependency found: {0}", serviceName + " <- " + path.join(" <- "));
                    }
                    return cache[serviceName];
                } else {
                    try {
                        path.unshift(serviceName);
                        cache[serviceName] = INSTANTIATING;
                        return cache[serviceName] = factory(serviceName);
                    } catch (err) {
                        if (cache[serviceName] === INSTANTIATING) {
                            delete cache[serviceName];
                        }
                        throw err;
                    } finally {
                        path.shift();
                    }
                }
            }
            function invoke(fn, self, locals, serviceName) {
                if (typeof locals === "string") {
                    serviceName = locals;
                    locals = null;
                }
                var args = [], $inject = annotate(fn, strictDi, serviceName), length, i, key;
                for (i = 0, length = $inject.length; i < length; i++) {
                    key = $inject[i];
                    if (typeof key !== "string") {
                        throw $injectorMinErr("itkn", "Incorrect injection token! Expected service name as string, got {0}", key);
                    }
                    args.push(locals && locals.hasOwnProperty(key) ? locals[key] : getService(key));
                }
                if (isArray(fn)) {
                    fn = fn[length];
                }
                return fn.apply(self, args);
            }
            function instantiate(Type, locals, serviceName) {
                var Constructor = function() {}, instance, returnedValue;
                Constructor.prototype = (isArray(Type) ? Type[Type.length - 1] : Type).prototype;
                instance = new Constructor();
                returnedValue = invoke(Type, instance, locals, serviceName);
                return isObject(returnedValue) || isFunction(returnedValue) ? returnedValue : instance;
            }
            return {
                invoke: invoke,
                instantiate: instantiate,
                get: getService,
                annotate: annotate,
                has: function(name) {
                    return providerCache.hasOwnProperty(name + providerSuffix) || cache.hasOwnProperty(name);
                }
            };
        }
    }
    createInjector.$$annotate = annotate;
    function $AnchorScrollProvider() {
        var autoScrollingEnabled = true;
        this.disableAutoScrolling = function() {
            autoScrollingEnabled = false;
        };
        this.$get = [ "$window", "$location", "$rootScope", function($window, $location, $rootScope) {
            var document = $window.document;
            function getFirstAnchor(list) {
                var result = null;
                Array.prototype.some.call(list, function(element) {
                    if (nodeName_(element) === "a") {
                        result = element;
                        return true;
                    }
                });
                return result;
            }
            function getYOffset() {
                var offset = scroll.yOffset;
                if (isFunction(offset)) {
                    offset = offset();
                } else if (isElement(offset)) {
                    var elem = offset[0];
                    var style = $window.getComputedStyle(elem);
                    if (style.position !== "fixed") {
                        offset = 0;
                    } else {
                        offset = elem.getBoundingClientRect().bottom;
                    }
                } else if (!isNumber(offset)) {
                    offset = 0;
                }
                return offset;
            }
            function scrollTo(elem) {
                if (elem) {
                    elem.scrollIntoView();
                    var offset = getYOffset();
                    if (offset) {
                        var elemTop = elem.getBoundingClientRect().top;
                        $window.scrollBy(0, elemTop - offset);
                    }
                } else {
                    $window.scrollTo(0, 0);
                }
            }
            function scroll() {
                var hash = $location.hash(), elm;
                if (!hash) scrollTo(null); else if (elm = document.getElementById(hash)) scrollTo(elm); else if (elm = getFirstAnchor(document.getElementsByName(hash))) scrollTo(elm); else if (hash === "top") scrollTo(null);
            }
            if (autoScrollingEnabled) {
                $rootScope.$watch(function autoScrollWatch() {
                    return $location.hash();
                }, function autoScrollWatchAction(newVal, oldVal) {
                    if (newVal === oldVal && newVal === "") return;
                    jqLiteDocumentLoaded(function() {
                        $rootScope.$evalAsync(scroll);
                    });
                });
            }
            return scroll;
        } ];
    }
    var $animateMinErr = minErr("$animate");
    var $AnimateProvider = [ "$provide", function($provide) {
        this.$$selectors = {};
        this.register = function(name, factory) {
            var key = name + "-animation";
            if (name && name.charAt(0) != ".") throw $animateMinErr("notcsel", "Expecting class selector starting with '.' got '{0}'.", name);
            this.$$selectors[name.substr(1)] = key;
            $provide.factory(key, factory);
        };
        this.classNameFilter = function(expression) {
            if (arguments.length === 1) {
                this.$$classNameFilter = expression instanceof RegExp ? expression : null;
            }
            return this.$$classNameFilter;
        };
        this.$get = [ "$$q", "$$asyncCallback", "$rootScope", function($$q, $$asyncCallback, $rootScope) {
            var currentDefer;
            function runAnimationPostDigest(fn) {
                var cancelFn, defer = $$q.defer();
                defer.promise.$$cancelFn = function ngAnimateMaybeCancel() {
                    cancelFn && cancelFn();
                };
                $rootScope.$$postDigest(function ngAnimatePostDigest() {
                    cancelFn = fn(function ngAnimateNotifyComplete() {
                        defer.resolve();
                    });
                });
                return defer.promise;
            }
            function resolveElementClasses(element, classes) {
                var toAdd = [], toRemove = [];
                var hasClasses = createMap();
                forEach((element.attr("class") || "").split(/\s+/), function(className) {
                    hasClasses[className] = true;
                });
                forEach(classes, function(status, className) {
                    var hasClass = hasClasses[className];
                    if (status === false && hasClass) {
                        toRemove.push(className);
                    } else if (status === true && !hasClass) {
                        toAdd.push(className);
                    }
                });
                return toAdd.length + toRemove.length > 0 && [ toAdd.length ? toAdd : null, toRemove.length ? toRemove : null ];
            }
            function cachedClassManipulation(cache, classes, op) {
                for (var i = 0, ii = classes.length; i < ii; ++i) {
                    var className = classes[i];
                    cache[className] = op;
                }
            }
            function asyncPromise() {
                if (!currentDefer) {
                    currentDefer = $$q.defer();
                    $$asyncCallback(function() {
                        currentDefer.resolve();
                        currentDefer = null;
                    });
                }
                return currentDefer.promise;
            }
            function applyStyles(element, options) {
                if (angular.isObject(options)) {
                    var styles = extend(options.from || {}, options.to || {});
                    element.css(styles);
                }
            }
            return {
                animate: function(element, from, to) {
                    applyStyles(element, {
                        from: from,
                        to: to
                    });
                    return asyncPromise();
                },
                enter: function(element, parent, after, options) {
                    applyStyles(element, options);
                    after ? after.after(element) : parent.prepend(element);
                    return asyncPromise();
                },
                leave: function(element, options) {
                    element.remove();
                    return asyncPromise();
                },
                move: function(element, parent, after, options) {
                    return this.enter(element, parent, after, options);
                },
                addClass: function(element, className, options) {
                    return this.setClass(element, className, [], options);
                },
                $$addClassImmediately: function(element, className, options) {
                    element = jqLite(element);
                    className = !isString(className) ? isArray(className) ? className.join(" ") : "" : className;
                    forEach(element, function(element) {
                        jqLiteAddClass(element, className);
                    });
                    applyStyles(element, options);
                    return asyncPromise();
                },
                removeClass: function(element, className, options) {
                    return this.setClass(element, [], className, options);
                },
                $$removeClassImmediately: function(element, className, options) {
                    element = jqLite(element);
                    className = !isString(className) ? isArray(className) ? className.join(" ") : "" : className;
                    forEach(element, function(element) {
                        jqLiteRemoveClass(element, className);
                    });
                    applyStyles(element, options);
                    return asyncPromise();
                },
                setClass: function(element, add, remove, options) {
                    var self = this;
                    var STORAGE_KEY = "$$animateClasses";
                    var createdCache = false;
                    element = jqLite(element);
                    var cache = element.data(STORAGE_KEY);
                    if (!cache) {
                        cache = {
                            classes: {},
                            options: options
                        };
                        createdCache = true;
                    } else if (options && cache.options) {
                        cache.options = angular.extend(cache.options || {}, options);
                    }
                    var classes = cache.classes;
                    add = isArray(add) ? add : add.split(" ");
                    remove = isArray(remove) ? remove : remove.split(" ");
                    cachedClassManipulation(classes, add, true);
                    cachedClassManipulation(classes, remove, false);
                    if (createdCache) {
                        cache.promise = runAnimationPostDigest(function(done) {
                            var cache = element.data(STORAGE_KEY);
                            element.removeData(STORAGE_KEY);
                            if (cache) {
                                var classes = resolveElementClasses(element, cache.classes);
                                if (classes) {
                                    self.$$setClassImmediately(element, classes[0], classes[1], cache.options);
                                }
                            }
                            done();
                        });
                        element.data(STORAGE_KEY, cache);
                    }
                    return cache.promise;
                },
                $$setClassImmediately: function(element, add, remove, options) {
                    add && this.$$addClassImmediately(element, add);
                    remove && this.$$removeClassImmediately(element, remove);
                    applyStyles(element, options);
                    return asyncPromise();
                },
                enabled: noop,
                cancel: noop
            };
        } ];
    } ];
    function $$AsyncCallbackProvider() {
        this.$get = [ "$$rAF", "$timeout", function($$rAF, $timeout) {
            return $$rAF.supported ? function(fn) {
                return $$rAF(fn);
            } : function(fn) {
                return $timeout(fn, 0, false);
            };
        } ];
    }
    function Browser(window, document, $log, $sniffer) {
        var self = this, rawDocument = document[0], location = window.location, history = window.history, setTimeout = window.setTimeout, clearTimeout = window.clearTimeout, pendingDeferIds = {};
        self.isMock = false;
        var outstandingRequestCount = 0;
        var outstandingRequestCallbacks = [];
        self.$$completeOutstandingRequest = completeOutstandingRequest;
        self.$$incOutstandingRequestCount = function() {
            outstandingRequestCount++;
        };
        function completeOutstandingRequest(fn) {
            try {
                fn.apply(null, sliceArgs(arguments, 1));
            } finally {
                outstandingRequestCount--;
                if (outstandingRequestCount === 0) {
                    while (outstandingRequestCallbacks.length) {
                        try {
                            outstandingRequestCallbacks.pop()();
                        } catch (e) {
                            $log.error(e);
                        }
                    }
                }
            }
        }
        self.notifyWhenNoOutstandingRequests = function(callback) {
            forEach(pollFns, function(pollFn) {
                pollFn();
            });
            if (outstandingRequestCount === 0) {
                callback();
            } else {
                outstandingRequestCallbacks.push(callback);
            }
        };
        var pollFns = [], pollTimeout;
        self.addPollFn = function(fn) {
            if (isUndefined(pollTimeout)) startPoller(100, setTimeout);
            pollFns.push(fn);
            return fn;
        };
        function startPoller(interval, setTimeout) {
            (function check() {
                forEach(pollFns, function(pollFn) {
                    pollFn();
                });
                pollTimeout = setTimeout(check, interval);
            })();
        }
        var cachedState, lastHistoryState, lastBrowserUrl = location.href, baseElement = document.find("base"), reloadLocation = null;
        cacheState();
        lastHistoryState = cachedState;
        self.url = function(url, replace, state) {
            if (isUndefined(state)) {
                state = null;
            }
            if (location !== window.location) location = window.location;
            if (history !== window.history) history = window.history;
            if (url) {
                var sameState = lastHistoryState === state;
                if (lastBrowserUrl === url && (!$sniffer.history || sameState)) {
                    return;
                }
                var sameBase = lastBrowserUrl && stripHash(lastBrowserUrl) === stripHash(url);
                lastBrowserUrl = url;
                lastHistoryState = state;
                if ($sniffer.history && (!sameBase || !sameState)) {
                    history[replace ? "replaceState" : "pushState"](state, "", url);
                    cacheState();
                    lastHistoryState = cachedState;
                } else {
                    if (!sameBase) {
                        reloadLocation = url;
                    }
                    if (replace) {
                        location.replace(url);
                    } else {
                        location.href = url;
                    }
                }
                return self;
            } else {
                return reloadLocation || location.href.replace(/%27/g, "'");
            }
        };
        self.state = function() {
            return cachedState;
        };
        var urlChangeListeners = [], urlChangeInit = false;
        function cacheStateAndFireUrlChange() {
            cacheState();
            fireUrlChange();
        }
        var lastCachedState = null;
        function cacheState() {
            cachedState = window.history.state;
            cachedState = isUndefined(cachedState) ? null : cachedState;
            if (equals(cachedState, lastCachedState)) {
                cachedState = lastCachedState;
            }
            lastCachedState = cachedState;
        }
        function fireUrlChange() {
            if (lastBrowserUrl === self.url() && lastHistoryState === cachedState) {
                return;
            }
            lastBrowserUrl = self.url();
            lastHistoryState = cachedState;
            forEach(urlChangeListeners, function(listener) {
                listener(self.url(), cachedState);
            });
        }
        self.onUrlChange = function(callback) {
            if (!urlChangeInit) {
                if ($sniffer.history) jqLite(window).on("popstate", cacheStateAndFireUrlChange);
                jqLite(window).on("hashchange", cacheStateAndFireUrlChange);
                urlChangeInit = true;
            }
            urlChangeListeners.push(callback);
            return callback;
        };
        self.$$checkUrlChange = fireUrlChange;
        self.baseHref = function() {
            var href = baseElement.attr("href");
            return href ? href.replace(/^(https?\:)?\/\/[^\/]*/, "") : "";
        };
        var lastCookies = {};
        var lastCookieString = "";
        var cookiePath = self.baseHref();
        function safeDecodeURIComponent(str) {
            try {
                return decodeURIComponent(str);
            } catch (e) {
                return str;
            }
        }
        self.cookies = function(name, value) {
            var cookieLength, cookieArray, cookie, i, index;
            if (name) {
                if (value === undefined) {
                    rawDocument.cookie = encodeURIComponent(name) + "=;path=" + cookiePath + ";expires=Thu, 01 Jan 1970 00:00:00 GMT";
                } else {
                    if (isString(value)) {
                        cookieLength = (rawDocument.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + ";path=" + cookiePath).length + 1;
                        if (cookieLength > 4096) {
                            $log.warn("Cookie '" + name + "' possibly not set or overflowed because it was too large (" + cookieLength + " > 4096 bytes)!");
                        }
                    }
                }
            } else {
                if (rawDocument.cookie !== lastCookieString) {
                    lastCookieString = rawDocument.cookie;
                    cookieArray = lastCookieString.split("; ");
                    lastCookies = {};
                    for (i = 0; i < cookieArray.length; i++) {
                        cookie = cookieArray[i];
                        index = cookie.indexOf("=");
                        if (index > 0) {
                            name = safeDecodeURIComponent(cookie.substring(0, index));
                            if (lastCookies[name] === undefined) {
                                lastCookies[name] = safeDecodeURIComponent(cookie.substring(index + 1));
                            }
                        }
                    }
                }
                return lastCookies;
            }
        };
        self.defer = function(fn, delay) {
            var timeoutId;
            outstandingRequestCount++;
            timeoutId = setTimeout(function() {
                delete pendingDeferIds[timeoutId];
                completeOutstandingRequest(fn);
            }, delay || 0);
            pendingDeferIds[timeoutId] = true;
            return timeoutId;
        };
        self.defer.cancel = function(deferId) {
            if (pendingDeferIds[deferId]) {
                delete pendingDeferIds[deferId];
                clearTimeout(deferId);
                completeOutstandingRequest(noop);
                return true;
            }
            return false;
        };
    }
    function $BrowserProvider() {
        this.$get = [ "$window", "$log", "$sniffer", "$document", function($window, $log, $sniffer, $document) {
            return new Browser($window, $document, $log, $sniffer);
        } ];
    }
    function $CacheFactoryProvider() {
        this.$get = function() {
            var caches = {};
            function cacheFactory(cacheId, options) {
                if (cacheId in caches) {
                    throw minErr("$cacheFactory")("iid", "CacheId '{0}' is already taken!", cacheId);
                }
                var size = 0, stats = extend({}, options, {
                    id: cacheId
                }), data = {}, capacity = options && options.capacity || Number.MAX_VALUE, lruHash = {}, freshEnd = null, staleEnd = null;
                return caches[cacheId] = {
                    put: function(key, value) {
                        if (capacity < Number.MAX_VALUE) {
                            var lruEntry = lruHash[key] || (lruHash[key] = {
                                key: key
                            });
                            refresh(lruEntry);
                        }
                        if (isUndefined(value)) return;
                        if (!(key in data)) size++;
                        data[key] = value;
                        if (size > capacity) {
                            this.remove(staleEnd.key);
                        }
                        return value;
                    },
                    get: function(key) {
                        if (capacity < Number.MAX_VALUE) {
                            var lruEntry = lruHash[key];
                            if (!lruEntry) return;
                            refresh(lruEntry);
                        }
                        return data[key];
                    },
                    remove: function(key) {
                        if (capacity < Number.MAX_VALUE) {
                            var lruEntry = lruHash[key];
                            if (!lruEntry) return;
                            if (lruEntry == freshEnd) freshEnd = lruEntry.p;
                            if (lruEntry == staleEnd) staleEnd = lruEntry.n;
                            link(lruEntry.n, lruEntry.p);
                            delete lruHash[key];
                        }
                        delete data[key];
                        size--;
                    },
                    removeAll: function() {
                        data = {};
                        size = 0;
                        lruHash = {};
                        freshEnd = staleEnd = null;
                    },
                    destroy: function() {
                        data = null;
                        stats = null;
                        lruHash = null;
                        delete caches[cacheId];
                    },
                    info: function() {
                        return extend({}, stats, {
                            size: size
                        });
                    }
                };
                function refresh(entry) {
                    if (entry != freshEnd) {
                        if (!staleEnd) {
                            staleEnd = entry;
                        } else if (staleEnd == entry) {
                            staleEnd = entry.n;
                        }
                        link(entry.n, entry.p);
                        link(entry, freshEnd);
                        freshEnd = entry;
                        freshEnd.n = null;
                    }
                }
                function link(nextEntry, prevEntry) {
                    if (nextEntry != prevEntry) {
                        if (nextEntry) nextEntry.p = prevEntry;
                        if (prevEntry) prevEntry.n = nextEntry;
                    }
                }
            }
            cacheFactory.info = function() {
                var info = {};
                forEach(caches, function(cache, cacheId) {
                    info[cacheId] = cache.info();
                });
                return info;
            };
            cacheFactory.get = function(cacheId) {
                return caches[cacheId];
            };
            return cacheFactory;
        };
    }
    function $TemplateCacheProvider() {
        this.$get = [ "$cacheFactory", function($cacheFactory) {
            return $cacheFactory("templates");
        } ];
    }
    var $compileMinErr = minErr("$compile");
    $CompileProvider.$inject = [ "$provide", "$$sanitizeUriProvider" ];
    function $CompileProvider($provide, $$sanitizeUriProvider) {
        var hasDirectives = {}, Suffix = "Directive", COMMENT_DIRECTIVE_REGEXP = /^\s*directive\:\s*([\w\-]+)\s+(.*)$/, CLASS_DIRECTIVE_REGEXP = /(([\w\-]+)(?:\:([^;]+))?;?)/, ALL_OR_NOTHING_ATTRS = makeMap("ngSrc,ngSrcset,src,srcset"), REQUIRE_PREFIX_REGEXP = /^(?:(\^\^?)?(\?)?(\^\^?)?)?/;
        var EVENT_HANDLER_ATTR_REGEXP = /^(on[a-z]+|formaction)$/;
        function parseIsolateBindings(scope, directiveName) {
            var LOCAL_REGEXP = /^\s*([@&]|=(\*?))(\??)\s*(\w*)\s*$/;
            var bindings = {};
            forEach(scope, function(definition, scopeName) {
                var match = definition.match(LOCAL_REGEXP);
                if (!match) {
                    throw $compileMinErr("iscp", "Invalid isolate scope definition for directive '{0}'." + " Definition: {... {1}: '{2}' ...}", directiveName, scopeName, definition);
                }
                bindings[scopeName] = {
                    mode: match[1][0],
                    collection: match[2] === "*",
                    optional: match[3] === "?",
                    attrName: match[4] || scopeName
                };
            });
            return bindings;
        }
        this.directive = function registerDirective(name, directiveFactory) {
            assertNotHasOwnProperty(name, "directive");
            if (isString(name)) {
                assertArg(directiveFactory, "directiveFactory");
                if (!hasDirectives.hasOwnProperty(name)) {
                    hasDirectives[name] = [];
                    $provide.factory(name + Suffix, [ "$injector", "$exceptionHandler", function($injector, $exceptionHandler) {
                        var directives = [];
                        forEach(hasDirectives[name], function(directiveFactory, index) {
                            try {
                                var directive = $injector.invoke(directiveFactory);
                                if (isFunction(directive)) {
                                    directive = {
                                        compile: valueFn(directive)
                                    };
                                } else if (!directive.compile && directive.link) {
                                    directive.compile = valueFn(directive.link);
                                }
                                directive.priority = directive.priority || 0;
                                directive.index = index;
                                directive.name = directive.name || name;
                                directive.require = directive.require || directive.controller && directive.name;
                                directive.restrict = directive.restrict || "EA";
                                if (isObject(directive.scope)) {
                                    directive.$$isolateBindings = parseIsolateBindings(directive.scope, directive.name);
                                }
                                directives.push(directive);
                            } catch (e) {
                                $exceptionHandler(e);
                            }
                        });
                        return directives;
                    } ]);
                }
                hasDirectives[name].push(directiveFactory);
            } else {
                forEach(name, reverseParams(registerDirective));
            }
            return this;
        };
        this.aHrefSanitizationWhitelist = function(regexp) {
            if (isDefined(regexp)) {
                $$sanitizeUriProvider.aHrefSanitizationWhitelist(regexp);
                return this;
            } else {
                return $$sanitizeUriProvider.aHrefSanitizationWhitelist();
            }
        };
        this.imgSrcSanitizationWhitelist = function(regexp) {
            if (isDefined(regexp)) {
                $$sanitizeUriProvider.imgSrcSanitizationWhitelist(regexp);
                return this;
            } else {
                return $$sanitizeUriProvider.imgSrcSanitizationWhitelist();
            }
        };
        var debugInfoEnabled = true;
        this.debugInfoEnabled = function(enabled) {
            if (isDefined(enabled)) {
                debugInfoEnabled = enabled;
                return this;
            }
            return debugInfoEnabled;
        };
        this.$get = [ "$injector", "$interpolate", "$exceptionHandler", "$templateRequest", "$parse", "$controller", "$rootScope", "$document", "$sce", "$animate", "$$sanitizeUri", function($injector, $interpolate, $exceptionHandler, $templateRequest, $parse, $controller, $rootScope, $document, $sce, $animate, $$sanitizeUri) {
            var Attributes = function(element, attributesToCopy) {
                if (attributesToCopy) {
                    var keys = Object.keys(attributesToCopy);
                    var i, l, key;
                    for (i = 0, l = keys.length; i < l; i++) {
                        key = keys[i];
                        this[key] = attributesToCopy[key];
                    }
                } else {
                    this.$attr = {};
                }
                this.$$element = element;
            };
            Attributes.prototype = {
                $normalize: directiveNormalize,
                $addClass: function(classVal) {
                    if (classVal && classVal.length > 0) {
                        $animate.addClass(this.$$element, classVal);
                    }
                },
                $removeClass: function(classVal) {
                    if (classVal && classVal.length > 0) {
                        $animate.removeClass(this.$$element, classVal);
                    }
                },
                $updateClass: function(newClasses, oldClasses) {
                    var toAdd = tokenDifference(newClasses, oldClasses);
                    if (toAdd && toAdd.length) {
                        $animate.addClass(this.$$element, toAdd);
                    }
                    var toRemove = tokenDifference(oldClasses, newClasses);
                    if (toRemove && toRemove.length) {
                        $animate.removeClass(this.$$element, toRemove);
                    }
                },
                $set: function(key, value, writeAttr, attrName) {
                    var node = this.$$element[0], booleanKey = getBooleanAttrName(node, key), aliasedKey = getAliasedAttrName(node, key), observer = key, nodeName;
                    if (booleanKey) {
                        this.$$element.prop(key, value);
                        attrName = booleanKey;
                    } else if (aliasedKey) {
                        this[aliasedKey] = value;
                        observer = aliasedKey;
                    }
                    this[key] = value;
                    if (attrName) {
                        this.$attr[key] = attrName;
                    } else {
                        attrName = this.$attr[key];
                        if (!attrName) {
                            this.$attr[key] = attrName = snake_case(key, "-");
                        }
                    }
                    nodeName = nodeName_(this.$$element);
                    if (nodeName === "a" && key === "href" || nodeName === "img" && key === "src") {
                        this[key] = value = $$sanitizeUri(value, key === "src");
                    } else if (nodeName === "img" && key === "srcset") {
                        var result = "";
                        var trimmedSrcset = trim(value);
                        var srcPattern = /(\s+\d+x\s*,|\s+\d+w\s*,|\s+,|,\s+)/;
                        var pattern = /\s/.test(trimmedSrcset) ? srcPattern : /(,)/;
                        var rawUris = trimmedSrcset.split(pattern);
                        var nbrUrisWith2parts = Math.floor(rawUris.length / 2);
                        for (var i = 0; i < nbrUrisWith2parts; i++) {
                            var innerIdx = i * 2;
                            result += $$sanitizeUri(trim(rawUris[innerIdx]), true);
                            result += " " + trim(rawUris[innerIdx + 1]);
                        }
                        var lastTuple = trim(rawUris[i * 2]).split(/\s/);
                        result += $$sanitizeUri(trim(lastTuple[0]), true);
                        if (lastTuple.length === 2) {
                            result += " " + trim(lastTuple[1]);
                        }
                        this[key] = value = result;
                    }
                    if (writeAttr !== false) {
                        if (value === null || value === undefined) {
                            this.$$element.removeAttr(attrName);
                        } else {
                            this.$$element.attr(attrName, value);
                        }
                    }
                    var $$observers = this.$$observers;
                    $$observers && forEach($$observers[observer], function(fn) {
                        try {
                            fn(value);
                        } catch (e) {
                            $exceptionHandler(e);
                        }
                    });
                },
                $observe: function(key, fn) {
                    var attrs = this, $$observers = attrs.$$observers || (attrs.$$observers = createMap()), listeners = $$observers[key] || ($$observers[key] = []);
                    listeners.push(fn);
                    $rootScope.$evalAsync(function() {
                        if (!listeners.$$inter && attrs.hasOwnProperty(key)) {
                            fn(attrs[key]);
                        }
                    });
                    return function() {
                        arrayRemove(listeners, fn);
                    };
                }
            };
            function safeAddClass($element, className) {
                try {
                    $element.addClass(className);
                } catch (e) {}
            }
            var startSymbol = $interpolate.startSymbol(), endSymbol = $interpolate.endSymbol(), denormalizeTemplate = startSymbol == "{{" || endSymbol == "}}" ? identity : function denormalizeTemplate(template) {
                return template.replace(/\{\{/g, startSymbol).replace(/}}/g, endSymbol);
            }, NG_ATTR_BINDING = /^ngAttr[A-Z]/;
            compile.$$addBindingInfo = debugInfoEnabled ? function $$addBindingInfo($element, binding) {
                var bindings = $element.data("$binding") || [];
                if (isArray(binding)) {
                    bindings = bindings.concat(binding);
                } else {
                    bindings.push(binding);
                }
                $element.data("$binding", bindings);
            } : noop;
            compile.$$addBindingClass = debugInfoEnabled ? function $$addBindingClass($element) {
                safeAddClass($element, "ng-binding");
            } : noop;
            compile.$$addScopeInfo = debugInfoEnabled ? function $$addScopeInfo($element, scope, isolated, noTemplate) {
                var dataName = isolated ? noTemplate ? "$isolateScopeNoTemplate" : "$isolateScope" : "$scope";
                $element.data(dataName, scope);
            } : noop;
            compile.$$addScopeClass = debugInfoEnabled ? function $$addScopeClass($element, isolated) {
                safeAddClass($element, isolated ? "ng-isolate-scope" : "ng-scope");
            } : noop;
            return compile;
            function compile($compileNodes, transcludeFn, maxPriority, ignoreDirective, previousCompileContext) {
                if (!($compileNodes instanceof jqLite)) {
                    $compileNodes = jqLite($compileNodes);
                }
                forEach($compileNodes, function(node, index) {
                    if (node.nodeType == NODE_TYPE_TEXT && node.nodeValue.match(/\S+/)) {
                        $compileNodes[index] = jqLite(node).wrap("<span></span>").parent()[0];
                    }
                });
                var compositeLinkFn = compileNodes($compileNodes, transcludeFn, $compileNodes, maxPriority, ignoreDirective, previousCompileContext);
                compile.$$addScopeClass($compileNodes);
                var namespace = null;
                return function publicLinkFn(scope, cloneConnectFn, transcludeControllers, parentBoundTranscludeFn, futureParentElement) {
                    assertArg(scope, "scope");
                    if (!namespace) {
                        namespace = detectNamespaceForChildElements(futureParentElement);
                    }
                    var $linkNode;
                    if (namespace !== "html") {
                        $linkNode = jqLite(wrapTemplate(namespace, jqLite("<div>").append($compileNodes).html()));
                    } else if (cloneConnectFn) {
                        $linkNode = JQLitePrototype.clone.call($compileNodes);
                    } else {
                        $linkNode = $compileNodes;
                    }
                    if (transcludeControllers) {
                        for (var controllerName in transcludeControllers) {
                            $linkNode.data("$" + controllerName + "Controller", transcludeControllers[controllerName].instance);
                        }
                    }
                    compile.$$addScopeInfo($linkNode, scope);
                    if (cloneConnectFn) cloneConnectFn($linkNode, scope);
                    if (compositeLinkFn) compositeLinkFn(scope, $linkNode, $linkNode, parentBoundTranscludeFn);
                    return $linkNode;
                };
            }
            function detectNamespaceForChildElements(parentElement) {
                var node = parentElement && parentElement[0];
                if (!node) {
                    return "html";
                } else {
                    return nodeName_(node) !== "foreignobject" && node.toString().match(/SVG/) ? "svg" : "html";
                }
            }
            function compileNodes(nodeList, transcludeFn, $rootElement, maxPriority, ignoreDirective, previousCompileContext) {
                var linkFns = [], attrs, directives, nodeLinkFn, childNodes, childLinkFn, linkFnFound, nodeLinkFnFound;
                for (var i = 0; i < nodeList.length; i++) {
                    attrs = new Attributes();
                    directives = collectDirectives(nodeList[i], [], attrs, i === 0 ? maxPriority : undefined, ignoreDirective);
                    nodeLinkFn = directives.length ? applyDirectivesToNode(directives, nodeList[i], attrs, transcludeFn, $rootElement, null, [], [], previousCompileContext) : null;
                    if (nodeLinkFn && nodeLinkFn.scope) {
                        compile.$$addScopeClass(attrs.$$element);
                    }
                    childLinkFn = nodeLinkFn && nodeLinkFn.terminal || !(childNodes = nodeList[i].childNodes) || !childNodes.length ? null : compileNodes(childNodes, nodeLinkFn ? (nodeLinkFn.transcludeOnThisElement || !nodeLinkFn.templateOnThisElement) && nodeLinkFn.transclude : transcludeFn);
                    if (nodeLinkFn || childLinkFn) {
                        linkFns.push(i, nodeLinkFn, childLinkFn);
                        linkFnFound = true;
                        nodeLinkFnFound = nodeLinkFnFound || nodeLinkFn;
                    }
                    previousCompileContext = null;
                }
                return linkFnFound ? compositeLinkFn : null;
                function compositeLinkFn(scope, nodeList, $rootElement, parentBoundTranscludeFn) {
                    var nodeLinkFn, childLinkFn, node, childScope, i, ii, idx, childBoundTranscludeFn;
                    var stableNodeList;
                    if (nodeLinkFnFound) {
                        var nodeListLength = nodeList.length;
                        stableNodeList = new Array(nodeListLength);
                        for (i = 0; i < linkFns.length; i += 3) {
                            idx = linkFns[i];
                            stableNodeList[idx] = nodeList[idx];
                        }
                    } else {
                        stableNodeList = nodeList;
                    }
                    for (i = 0, ii = linkFns.length; i < ii; ) {
                        node = stableNodeList[linkFns[i++]];
                        nodeLinkFn = linkFns[i++];
                        childLinkFn = linkFns[i++];
                        if (nodeLinkFn) {
                            if (nodeLinkFn.scope) {
                                childScope = scope.$new();
                                compile.$$addScopeInfo(jqLite(node), childScope);
                            } else {
                                childScope = scope;
                            }
                            if (nodeLinkFn.transcludeOnThisElement) {
                                childBoundTranscludeFn = createBoundTranscludeFn(scope, nodeLinkFn.transclude, parentBoundTranscludeFn, nodeLinkFn.elementTranscludeOnThisElement);
                            } else if (!nodeLinkFn.templateOnThisElement && parentBoundTranscludeFn) {
                                childBoundTranscludeFn = parentBoundTranscludeFn;
                            } else if (!parentBoundTranscludeFn && transcludeFn) {
                                childBoundTranscludeFn = createBoundTranscludeFn(scope, transcludeFn);
                            } else {
                                childBoundTranscludeFn = null;
                            }
                            nodeLinkFn(childLinkFn, childScope, node, $rootElement, childBoundTranscludeFn);
                        } else if (childLinkFn) {
                            childLinkFn(scope, node.childNodes, undefined, parentBoundTranscludeFn);
                        }
                    }
                }
            }
            function createBoundTranscludeFn(scope, transcludeFn, previousBoundTranscludeFn, elementTransclusion) {
                var boundTranscludeFn = function(transcludedScope, cloneFn, controllers, futureParentElement, containingScope) {
                    if (!transcludedScope) {
                        transcludedScope = scope.$new(false, containingScope);
                        transcludedScope.$$transcluded = true;
                    }
                    return transcludeFn(transcludedScope, cloneFn, controllers, previousBoundTranscludeFn, futureParentElement);
                };
                return boundTranscludeFn;
            }
            function collectDirectives(node, directives, attrs, maxPriority, ignoreDirective) {
                var nodeType = node.nodeType, attrsMap = attrs.$attr, match, className;
                switch (nodeType) {
                  case NODE_TYPE_ELEMENT:
                    addDirective(directives, directiveNormalize(nodeName_(node)), "E", maxPriority, ignoreDirective);
                    for (var attr, name, nName, ngAttrName, value, isNgAttr, nAttrs = node.attributes, j = 0, jj = nAttrs && nAttrs.length; j < jj; j++) {
                        var attrStartName = false;
                        var attrEndName = false;
                        attr = nAttrs[j];
                        name = attr.name;
                        value = trim(attr.value);
                        ngAttrName = directiveNormalize(name);
                        if (isNgAttr = NG_ATTR_BINDING.test(ngAttrName)) {
                            name = snake_case(ngAttrName.substr(6), "-");
                        }
                        var directiveNName = ngAttrName.replace(/(Start|End)$/, "");
                        if (directiveIsMultiElement(directiveNName)) {
                            if (ngAttrName === directiveNName + "Start") {
                                attrStartName = name;
                                attrEndName = name.substr(0, name.length - 5) + "end";
                                name = name.substr(0, name.length - 6);
                            }
                        }
                        nName = directiveNormalize(name.toLowerCase());
                        attrsMap[nName] = name;
                        if (isNgAttr || !attrs.hasOwnProperty(nName)) {
                            attrs[nName] = value;
                            if (getBooleanAttrName(node, nName)) {
                                attrs[nName] = true;
                            }
                        }
                        addAttrInterpolateDirective(node, directives, value, nName, isNgAttr);
                        addDirective(directives, nName, "A", maxPriority, ignoreDirective, attrStartName, attrEndName);
                    }
                    className = node.className;
                    if (isString(className) && className !== "") {
                        while (match = CLASS_DIRECTIVE_REGEXP.exec(className)) {
                            nName = directiveNormalize(match[2]);
                            if (addDirective(directives, nName, "C", maxPriority, ignoreDirective)) {
                                attrs[nName] = trim(match[3]);
                            }
                            className = className.substr(match.index + match[0].length);
                        }
                    }
                    break;

                  case NODE_TYPE_TEXT:
                    addTextInterpolateDirective(directives, node.nodeValue);
                    break;

                  case NODE_TYPE_COMMENT:
                    try {
                        match = COMMENT_DIRECTIVE_REGEXP.exec(node.nodeValue);
                        if (match) {
                            nName = directiveNormalize(match[1]);
                            if (addDirective(directives, nName, "M", maxPriority, ignoreDirective)) {
                                attrs[nName] = trim(match[2]);
                            }
                        }
                    } catch (e) {}
                    break;
                }
                directives.sort(byPriority);
                return directives;
            }
            function groupScan(node, attrStart, attrEnd) {
                var nodes = [];
                var depth = 0;
                if (attrStart && node.hasAttribute && node.hasAttribute(attrStart)) {
                    do {
                        if (!node) {
                            throw $compileMinErr("uterdir", "Unterminated attribute, found '{0}' but no matching '{1}' found.", attrStart, attrEnd);
                        }
                        if (node.nodeType == NODE_TYPE_ELEMENT) {
                            if (node.hasAttribute(attrStart)) depth++;
                            if (node.hasAttribute(attrEnd)) depth--;
                        }
                        nodes.push(node);
                        node = node.nextSibling;
                    } while (depth > 0);
                } else {
                    nodes.push(node);
                }
                return jqLite(nodes);
            }
            function groupElementsLinkFnWrapper(linkFn, attrStart, attrEnd) {
                return function(scope, element, attrs, controllers, transcludeFn) {
                    element = groupScan(element[0], attrStart, attrEnd);
                    return linkFn(scope, element, attrs, controllers, transcludeFn);
                };
            }
            function applyDirectivesToNode(directives, compileNode, templateAttrs, transcludeFn, jqCollection, originalReplaceDirective, preLinkFns, postLinkFns, previousCompileContext) {
                previousCompileContext = previousCompileContext || {};
                var terminalPriority = -Number.MAX_VALUE, newScopeDirective, controllerDirectives = previousCompileContext.controllerDirectives, controllers, newIsolateScopeDirective = previousCompileContext.newIsolateScopeDirective, templateDirective = previousCompileContext.templateDirective, nonTlbTranscludeDirective = previousCompileContext.nonTlbTranscludeDirective, hasTranscludeDirective = false, hasTemplate = false, hasElementTranscludeDirective = previousCompileContext.hasElementTranscludeDirective, $compileNode = templateAttrs.$$element = jqLite(compileNode), directive, directiveName, $template, replaceDirective = originalReplaceDirective, childTranscludeFn = transcludeFn, linkFn, directiveValue;
                for (var i = 0, ii = directives.length; i < ii; i++) {
                    directive = directives[i];
                    var attrStart = directive.$$start;
                    var attrEnd = directive.$$end;
                    if (attrStart) {
                        $compileNode = groupScan(compileNode, attrStart, attrEnd);
                    }
                    $template = undefined;
                    if (terminalPriority > directive.priority) {
                        break;
                    }
                    if (directiveValue = directive.scope) {
                        if (!directive.templateUrl) {
                            if (isObject(directiveValue)) {
                                assertNoDuplicate("new/isolated scope", newIsolateScopeDirective || newScopeDirective, directive, $compileNode);
                                newIsolateScopeDirective = directive;
                            } else {
                                assertNoDuplicate("new/isolated scope", newIsolateScopeDirective, directive, $compileNode);
                            }
                        }
                        newScopeDirective = newScopeDirective || directive;
                    }
                    directiveName = directive.name;
                    if (!directive.templateUrl && directive.controller) {
                        directiveValue = directive.controller;
                        controllerDirectives = controllerDirectives || {};
                        assertNoDuplicate("'" + directiveName + "' controller", controllerDirectives[directiveName], directive, $compileNode);
                        controllerDirectives[directiveName] = directive;
                    }
                    if (directiveValue = directive.transclude) {
                        hasTranscludeDirective = true;
                        if (!directive.$$tlb) {
                            assertNoDuplicate("transclusion", nonTlbTranscludeDirective, directive, $compileNode);
                            nonTlbTranscludeDirective = directive;
                        }
                        if (directiveValue == "element") {
                            hasElementTranscludeDirective = true;
                            terminalPriority = directive.priority;
                            $template = $compileNode;
                            $compileNode = templateAttrs.$$element = jqLite(document.createComment(" " + directiveName + ": " + templateAttrs[directiveName] + " "));
                            compileNode = $compileNode[0];
                            replaceWith(jqCollection, sliceArgs($template), compileNode);
                            childTranscludeFn = compile($template, transcludeFn, terminalPriority, replaceDirective && replaceDirective.name, {
                                nonTlbTranscludeDirective: nonTlbTranscludeDirective
                            });
                        } else {
                            $template = jqLite(jqLiteClone(compileNode)).contents();
                            $compileNode.empty();
                            childTranscludeFn = compile($template, transcludeFn);
                        }
                    }
                    if (directive.template) {
                        hasTemplate = true;
                        assertNoDuplicate("template", templateDirective, directive, $compileNode);
                        templateDirective = directive;
                        directiveValue = isFunction(directive.template) ? directive.template($compileNode, templateAttrs) : directive.template;
                        directiveValue = denormalizeTemplate(directiveValue);
                        if (directive.replace) {
                            replaceDirective = directive;
                            if (jqLiteIsTextNode(directiveValue)) {
                                $template = [];
                            } else {
                                $template = removeComments(wrapTemplate(directive.templateNamespace, trim(directiveValue)));
                            }
                            compileNode = $template[0];
                            if ($template.length != 1 || compileNode.nodeType !== NODE_TYPE_ELEMENT) {
                                throw $compileMinErr("tplrt", "Template for directive '{0}' must have exactly one root element. {1}", directiveName, "");
                            }
                            replaceWith(jqCollection, $compileNode, compileNode);
                            var newTemplateAttrs = {
                                $attr: {}
                            };
                            var templateDirectives = collectDirectives(compileNode, [], newTemplateAttrs);
                            var unprocessedDirectives = directives.splice(i + 1, directives.length - (i + 1));
                            if (newIsolateScopeDirective) {
                                markDirectivesAsIsolate(templateDirectives);
                            }
                            directives = directives.concat(templateDirectives).concat(unprocessedDirectives);
                            mergeTemplateAttributes(templateAttrs, newTemplateAttrs);
                            ii = directives.length;
                        } else {
                            $compileNode.html(directiveValue);
                        }
                    }
                    if (directive.templateUrl) {
                        hasTemplate = true;
                        assertNoDuplicate("template", templateDirective, directive, $compileNode);
                        templateDirective = directive;
                        if (directive.replace) {
                            replaceDirective = directive;
                        }
                        nodeLinkFn = compileTemplateUrl(directives.splice(i, directives.length - i), $compileNode, templateAttrs, jqCollection, hasTranscludeDirective && childTranscludeFn, preLinkFns, postLinkFns, {
                            controllerDirectives: controllerDirectives,
                            newIsolateScopeDirective: newIsolateScopeDirective,
                            templateDirective: templateDirective,
                            nonTlbTranscludeDirective: nonTlbTranscludeDirective
                        });
                        ii = directives.length;
                    } else if (directive.compile) {
                        try {
                            linkFn = directive.compile($compileNode, templateAttrs, childTranscludeFn);
                            if (isFunction(linkFn)) {
                                addLinkFns(null, linkFn, attrStart, attrEnd);
                            } else if (linkFn) {
                                addLinkFns(linkFn.pre, linkFn.post, attrStart, attrEnd);
                            }
                        } catch (e) {
                            $exceptionHandler(e, startingTag($compileNode));
                        }
                    }
                    if (directive.terminal) {
                        nodeLinkFn.terminal = true;
                        terminalPriority = Math.max(terminalPriority, directive.priority);
                    }
                }
                nodeLinkFn.scope = newScopeDirective && newScopeDirective.scope === true;
                nodeLinkFn.transcludeOnThisElement = hasTranscludeDirective;
                nodeLinkFn.elementTranscludeOnThisElement = hasElementTranscludeDirective;
                nodeLinkFn.templateOnThisElement = hasTemplate;
                nodeLinkFn.transclude = childTranscludeFn;
                previousCompileContext.hasElementTranscludeDirective = hasElementTranscludeDirective;
                return nodeLinkFn;
                function addLinkFns(pre, post, attrStart, attrEnd) {
                    if (pre) {
                        if (attrStart) pre = groupElementsLinkFnWrapper(pre, attrStart, attrEnd);
                        pre.require = directive.require;
                        pre.directiveName = directiveName;
                        if (newIsolateScopeDirective === directive || directive.$$isolateScope) {
                            pre = cloneAndAnnotateFn(pre, {
                                isolateScope: true
                            });
                        }
                        preLinkFns.push(pre);
                    }
                    if (post) {
                        if (attrStart) post = groupElementsLinkFnWrapper(post, attrStart, attrEnd);
                        post.require = directive.require;
                        post.directiveName = directiveName;
                        if (newIsolateScopeDirective === directive || directive.$$isolateScope) {
                            post = cloneAndAnnotateFn(post, {
                                isolateScope: true
                            });
                        }
                        postLinkFns.push(post);
                    }
                }
                function getControllers(directiveName, require, $element, elementControllers) {
                    var value, retrievalMethod = "data", optional = false;
                    var $searchElement = $element;
                    var match;
                    if (isString(require)) {
                        match = require.match(REQUIRE_PREFIX_REGEXP);
                        require = require.substring(match[0].length);
                        if (match[3]) {
                            if (match[1]) match[3] = null; else match[1] = match[3];
                        }
                        if (match[1] === "^") {
                            retrievalMethod = "inheritedData";
                        } else if (match[1] === "^^") {
                            retrievalMethod = "inheritedData";
                            $searchElement = $element.parent();
                        }
                        if (match[2] === "?") {
                            optional = true;
                        }
                        value = null;
                        if (elementControllers && retrievalMethod === "data") {
                            if (value = elementControllers[require]) {
                                value = value.instance;
                            }
                        }
                        value = value || $searchElement[retrievalMethod]("$" + require + "Controller");
                        if (!value && !optional) {
                            throw $compileMinErr("ctreq", "Controller '{0}', required by directive '{1}', can't be found!", require, directiveName);
                        }
                        return value || null;
                    } else if (isArray(require)) {
                        value = [];
                        forEach(require, function(require) {
                            value.push(getControllers(directiveName, require, $element, elementControllers));
                        });
                    }
                    return value;
                }
                function nodeLinkFn(childLinkFn, scope, linkNode, $rootElement, boundTranscludeFn) {
                    var i, ii, linkFn, controller, isolateScope, elementControllers, transcludeFn, $element, attrs;
                    if (compileNode === linkNode) {
                        attrs = templateAttrs;
                        $element = templateAttrs.$$element;
                    } else {
                        $element = jqLite(linkNode);
                        attrs = new Attributes($element, templateAttrs);
                    }
                    if (newIsolateScopeDirective) {
                        isolateScope = scope.$new(true);
                    }
                    transcludeFn = boundTranscludeFn && controllersBoundTransclude;
                    if (controllerDirectives) {
                        controllers = {};
                        elementControllers = {};
                        forEach(controllerDirectives, function(directive) {
                            var locals = {
                                $scope: directive === newIsolateScopeDirective || directive.$$isolateScope ? isolateScope : scope,
                                $element: $element,
                                $attrs: attrs,
                                $transclude: transcludeFn
                            }, controllerInstance;
                            controller = directive.controller;
                            if (controller == "@") {
                                controller = attrs[directive.name];
                            }
                            controllerInstance = $controller(controller, locals, true, directive.controllerAs);
                            elementControllers[directive.name] = controllerInstance;
                            if (!hasElementTranscludeDirective) {
                                $element.data("$" + directive.name + "Controller", controllerInstance.instance);
                            }
                            controllers[directive.name] = controllerInstance;
                        });
                    }
                    if (newIsolateScopeDirective) {
                        compile.$$addScopeInfo($element, isolateScope, true, !(templateDirective && (templateDirective === newIsolateScopeDirective || templateDirective === newIsolateScopeDirective.$$originalDirective)));
                        compile.$$addScopeClass($element, true);
                        var isolateScopeController = controllers && controllers[newIsolateScopeDirective.name];
                        var isolateBindingContext = isolateScope;
                        if (isolateScopeController && isolateScopeController.identifier && newIsolateScopeDirective.bindToController === true) {
                            isolateBindingContext = isolateScopeController.instance;
                        }
                        forEach(isolateScope.$$isolateBindings = newIsolateScopeDirective.$$isolateBindings, function(definition, scopeName) {
                            var attrName = definition.attrName, optional = definition.optional, mode = definition.mode, lastValue, parentGet, parentSet, compare;
                            switch (mode) {
                              case "@":
                                attrs.$observe(attrName, function(value) {
                                    isolateBindingContext[scopeName] = value;
                                });
                                attrs.$$observers[attrName].$$scope = scope;
                                if (attrs[attrName]) {
                                    isolateBindingContext[scopeName] = $interpolate(attrs[attrName])(scope);
                                }
                                break;

                              case "=":
                                if (optional && !attrs[attrName]) {
                                    return;
                                }
                                parentGet = $parse(attrs[attrName]);
                                if (parentGet.literal) {
                                    compare = equals;
                                } else {
                                    compare = function(a, b) {
                                        return a === b || a !== a && b !== b;
                                    };
                                }
                                parentSet = parentGet.assign || function() {
                                    lastValue = isolateBindingContext[scopeName] = parentGet(scope);
                                    throw $compileMinErr("nonassign", "Expression '{0}' used with directive '{1}' is non-assignable!", attrs[attrName], newIsolateScopeDirective.name);
                                };
                                lastValue = isolateBindingContext[scopeName] = parentGet(scope);
                                var parentValueWatch = function parentValueWatch(parentValue) {
                                    if (!compare(parentValue, isolateBindingContext[scopeName])) {
                                        if (!compare(parentValue, lastValue)) {
                                            isolateBindingContext[scopeName] = parentValue;
                                        } else {
                                            parentSet(scope, parentValue = isolateBindingContext[scopeName]);
                                        }
                                    }
                                    return lastValue = parentValue;
                                };
                                parentValueWatch.$stateful = true;
                                var unwatch;
                                if (definition.collection) {
                                    unwatch = scope.$watchCollection(attrs[attrName], parentValueWatch);
                                } else {
                                    unwatch = scope.$watch($parse(attrs[attrName], parentValueWatch), null, parentGet.literal);
                                }
                                isolateScope.$on("$destroy", unwatch);
                                break;

                              case "&":
                                parentGet = $parse(attrs[attrName]);
                                isolateBindingContext[scopeName] = function(locals) {
                                    return parentGet(scope, locals);
                                };
                                break;
                            }
                        });
                    }
                    if (controllers) {
                        forEach(controllers, function(controller) {
                            controller();
                        });
                        controllers = null;
                    }
                    for (i = 0, ii = preLinkFns.length; i < ii; i++) {
                        linkFn = preLinkFns[i];
                        invokeLinkFn(linkFn, linkFn.isolateScope ? isolateScope : scope, $element, attrs, linkFn.require && getControllers(linkFn.directiveName, linkFn.require, $element, elementControllers), transcludeFn);
                    }
                    var scopeToChild = scope;
                    if (newIsolateScopeDirective && (newIsolateScopeDirective.template || newIsolateScopeDirective.templateUrl === null)) {
                        scopeToChild = isolateScope;
                    }
                    childLinkFn && childLinkFn(scopeToChild, linkNode.childNodes, undefined, boundTranscludeFn);
                    for (i = postLinkFns.length - 1; i >= 0; i--) {
                        linkFn = postLinkFns[i];
                        invokeLinkFn(linkFn, linkFn.isolateScope ? isolateScope : scope, $element, attrs, linkFn.require && getControllers(linkFn.directiveName, linkFn.require, $element, elementControllers), transcludeFn);
                    }
                    function controllersBoundTransclude(scope, cloneAttachFn, futureParentElement) {
                        var transcludeControllers;
                        if (!isScope(scope)) {
                            futureParentElement = cloneAttachFn;
                            cloneAttachFn = scope;
                            scope = undefined;
                        }
                        if (hasElementTranscludeDirective) {
                            transcludeControllers = elementControllers;
                        }
                        if (!futureParentElement) {
                            futureParentElement = hasElementTranscludeDirective ? $element.parent() : $element;
                        }
                        return boundTranscludeFn(scope, cloneAttachFn, transcludeControllers, futureParentElement, scopeToChild);
                    }
                }
            }
            function markDirectivesAsIsolate(directives) {
                for (var j = 0, jj = directives.length; j < jj; j++) {
                    directives[j] = inherit(directives[j], {
                        $$isolateScope: true
                    });
                }
            }
            function addDirective(tDirectives, name, location, maxPriority, ignoreDirective, startAttrName, endAttrName) {
                if (name === ignoreDirective) return null;
                var match = null;
                if (hasDirectives.hasOwnProperty(name)) {
                    for (var directive, directives = $injector.get(name + Suffix), i = 0, ii = directives.length; i < ii; i++) {
                        try {
                            directive = directives[i];
                            if ((maxPriority === undefined || maxPriority > directive.priority) && directive.restrict.indexOf(location) != -1) {
                                if (startAttrName) {
                                    directive = inherit(directive, {
                                        $$start: startAttrName,
                                        $$end: endAttrName
                                    });
                                }
                                tDirectives.push(directive);
                                match = directive;
                            }
                        } catch (e) {
                            $exceptionHandler(e);
                        }
                    }
                }
                return match;
            }
            function directiveIsMultiElement(name) {
                if (hasDirectives.hasOwnProperty(name)) {
                    for (var directive, directives = $injector.get(name + Suffix), i = 0, ii = directives.length; i < ii; i++) {
                        directive = directives[i];
                        if (directive.multiElement) {
                            return true;
                        }
                    }
                }
                return false;
            }
            function mergeTemplateAttributes(dst, src) {
                var srcAttr = src.$attr, dstAttr = dst.$attr, $element = dst.$$element;
                forEach(dst, function(value, key) {
                    if (key.charAt(0) != "$") {
                        if (src[key] && src[key] !== value) {
                            value += (key === "style" ? ";" : " ") + src[key];
                        }
                        dst.$set(key, value, true, srcAttr[key]);
                    }
                });
                forEach(src, function(value, key) {
                    if (key == "class") {
                        safeAddClass($element, value);
                        dst["class"] = (dst["class"] ? dst["class"] + " " : "") + value;
                    } else if (key == "style") {
                        $element.attr("style", $element.attr("style") + ";" + value);
                        dst["style"] = (dst["style"] ? dst["style"] + ";" : "") + value;
                    } else if (key.charAt(0) != "$" && !dst.hasOwnProperty(key)) {
                        dst[key] = value;
                        dstAttr[key] = srcAttr[key];
                    }
                });
            }
            function compileTemplateUrl(directives, $compileNode, tAttrs, $rootElement, childTranscludeFn, preLinkFns, postLinkFns, previousCompileContext) {
                var linkQueue = [], afterTemplateNodeLinkFn, afterTemplateChildLinkFn, beforeTemplateCompileNode = $compileNode[0], origAsyncDirective = directives.shift(), derivedSyncDirective = extend({}, origAsyncDirective, {
                    templateUrl: null,
                    transclude: null,
                    replace: null,
                    $$originalDirective: origAsyncDirective
                }), templateUrl = isFunction(origAsyncDirective.templateUrl) ? origAsyncDirective.templateUrl($compileNode, tAttrs) : origAsyncDirective.templateUrl, templateNamespace = origAsyncDirective.templateNamespace;
                $compileNode.empty();
                $templateRequest($sce.getTrustedResourceUrl(templateUrl)).then(function(content) {
                    var compileNode, tempTemplateAttrs, $template, childBoundTranscludeFn;
                    content = denormalizeTemplate(content);
                    if (origAsyncDirective.replace) {
                        if (jqLiteIsTextNode(content)) {
                            $template = [];
                        } else {
                            $template = removeComments(wrapTemplate(templateNamespace, trim(content)));
                        }
                        compileNode = $template[0];
                        if ($template.length != 1 || compileNode.nodeType !== NODE_TYPE_ELEMENT) {
                            throw $compileMinErr("tplrt", "Template for directive '{0}' must have exactly one root element. {1}", origAsyncDirective.name, templateUrl);
                        }
                        tempTemplateAttrs = {
                            $attr: {}
                        };
                        replaceWith($rootElement, $compileNode, compileNode);
                        var templateDirectives = collectDirectives(compileNode, [], tempTemplateAttrs);
                        if (isObject(origAsyncDirective.scope)) {
                            markDirectivesAsIsolate(templateDirectives);
                        }
                        directives = templateDirectives.concat(directives);
                        mergeTemplateAttributes(tAttrs, tempTemplateAttrs);
                    } else {
                        compileNode = beforeTemplateCompileNode;
                        $compileNode.html(content);
                    }
                    directives.unshift(derivedSyncDirective);
                    afterTemplateNodeLinkFn = applyDirectivesToNode(directives, compileNode, tAttrs, childTranscludeFn, $compileNode, origAsyncDirective, preLinkFns, postLinkFns, previousCompileContext);
                    forEach($rootElement, function(node, i) {
                        if (node == compileNode) {
                            $rootElement[i] = $compileNode[0];
                        }
                    });
                    afterTemplateChildLinkFn = compileNodes($compileNode[0].childNodes, childTranscludeFn);
                    while (linkQueue.length) {
                        var scope = linkQueue.shift(), beforeTemplateLinkNode = linkQueue.shift(), linkRootElement = linkQueue.shift(), boundTranscludeFn = linkQueue.shift(), linkNode = $compileNode[0];
                        if (scope.$$destroyed) continue;
                        if (beforeTemplateLinkNode !== beforeTemplateCompileNode) {
                            var oldClasses = beforeTemplateLinkNode.className;
                            if (!(previousCompileContext.hasElementTranscludeDirective && origAsyncDirective.replace)) {
                                linkNode = jqLiteClone(compileNode);
                            }
                            replaceWith(linkRootElement, jqLite(beforeTemplateLinkNode), linkNode);
                            safeAddClass(jqLite(linkNode), oldClasses);
                        }
                        if (afterTemplateNodeLinkFn.transcludeOnThisElement) {
                            childBoundTranscludeFn = createBoundTranscludeFn(scope, afterTemplateNodeLinkFn.transclude, boundTranscludeFn);
                        } else {
                            childBoundTranscludeFn = boundTranscludeFn;
                        }
                        afterTemplateNodeLinkFn(afterTemplateChildLinkFn, scope, linkNode, $rootElement, childBoundTranscludeFn);
                    }
                    linkQueue = null;
                });
                return function delayedNodeLinkFn(ignoreChildLinkFn, scope, node, rootElement, boundTranscludeFn) {
                    var childBoundTranscludeFn = boundTranscludeFn;
                    if (scope.$$destroyed) return;
                    if (linkQueue) {
                        linkQueue.push(scope);
                        linkQueue.push(node);
                        linkQueue.push(rootElement);
                        linkQueue.push(childBoundTranscludeFn);
                    } else {
                        if (afterTemplateNodeLinkFn.transcludeOnThisElement) {
                            childBoundTranscludeFn = createBoundTranscludeFn(scope, afterTemplateNodeLinkFn.transclude, boundTranscludeFn);
                        }
                        afterTemplateNodeLinkFn(afterTemplateChildLinkFn, scope, node, rootElement, childBoundTranscludeFn);
                    }
                };
            }
            function byPriority(a, b) {
                var diff = b.priority - a.priority;
                if (diff !== 0) return diff;
                if (a.name !== b.name) return a.name < b.name ? -1 : 1;
                return a.index - b.index;
            }
            function assertNoDuplicate(what, previousDirective, directive, element) {
                if (previousDirective) {
                    throw $compileMinErr("multidir", "Multiple directives [{0}, {1}] asking for {2} on: {3}", previousDirective.name, directive.name, what, startingTag(element));
                }
            }
            function addTextInterpolateDirective(directives, text) {
                var interpolateFn = $interpolate(text, true);
                if (interpolateFn) {
                    directives.push({
                        priority: 0,
                        compile: function textInterpolateCompileFn(templateNode) {
                            var templateNodeParent = templateNode.parent(), hasCompileParent = !!templateNodeParent.length;
                            if (hasCompileParent) compile.$$addBindingClass(templateNodeParent);
                            return function textInterpolateLinkFn(scope, node) {
                                var parent = node.parent();
                                if (!hasCompileParent) compile.$$addBindingClass(parent);
                                compile.$$addBindingInfo(parent, interpolateFn.expressions);
                                scope.$watch(interpolateFn, function interpolateFnWatchAction(value) {
                                    node[0].nodeValue = value;
                                });
                            };
                        }
                    });
                }
            }
            function wrapTemplate(type, template) {
                type = lowercase(type || "html");
                switch (type) {
                  case "svg":
                  case "math":
                    var wrapper = document.createElement("div");
                    wrapper.innerHTML = "<" + type + ">" + template + "</" + type + ">";
                    return wrapper.childNodes[0].childNodes;

                  default:
                    return template;
                }
            }
            function getTrustedContext(node, attrNormalizedName) {
                if (attrNormalizedName == "srcdoc") {
                    return $sce.HTML;
                }
                var tag = nodeName_(node);
                if (attrNormalizedName == "xlinkHref" || tag == "form" && attrNormalizedName == "action" || tag != "img" && (attrNormalizedName == "src" || attrNormalizedName == "ngSrc")) {
                    return $sce.RESOURCE_URL;
                }
            }
            function addAttrInterpolateDirective(node, directives, value, name, allOrNothing) {
                var interpolateFn = $interpolate(value, true);
                if (!interpolateFn) return;
                if (name === "multiple" && nodeName_(node) === "select") {
                    throw $compileMinErr("selmulti", "Binding to the 'multiple' attribute is not supported. Element: {0}", startingTag(node));
                }
                directives.push({
                    priority: 100,
                    compile: function() {
                        return {
                            pre: function attrInterpolatePreLinkFn(scope, element, attr) {
                                var $$observers = attr.$$observers || (attr.$$observers = {});
                                if (EVENT_HANDLER_ATTR_REGEXP.test(name)) {
                                    throw $compileMinErr("nodomevents", "Interpolations for HTML DOM event attributes are disallowed.  Please use the " + "ng- versions (such as ng-click instead of onclick) instead.");
                                }
                                if (!attr[name]) {
                                    return;
                                }
                                interpolateFn = $interpolate(attr[name], true, getTrustedContext(node, name), ALL_OR_NOTHING_ATTRS[name] || allOrNothing);
                                if (!interpolateFn) return;
                                attr[name] = interpolateFn(scope);
                                ($$observers[name] || ($$observers[name] = [])).$$inter = true;
                                (attr.$$observers && attr.$$observers[name].$$scope || scope).$watch(interpolateFn, function interpolateFnWatchAction(newValue, oldValue) {
                                    if (name === "class" && newValue != oldValue) {
                                        attr.$updateClass(newValue, oldValue);
                                    } else {
                                        attr.$set(name, newValue);
                                    }
                                });
                            }
                        };
                    }
                });
            }
            function replaceWith($rootElement, elementsToRemove, newNode) {
                var firstElementToRemove = elementsToRemove[0], removeCount = elementsToRemove.length, parent = firstElementToRemove.parentNode, i, ii;
                if ($rootElement) {
                    for (i = 0, ii = $rootElement.length; i < ii; i++) {
                        if ($rootElement[i] == firstElementToRemove) {
                            $rootElement[i++] = newNode;
                            for (var j = i, j2 = j + removeCount - 1, jj = $rootElement.length; j < jj; j++, 
                            j2++) {
                                if (j2 < jj) {
                                    $rootElement[j] = $rootElement[j2];
                                } else {
                                    delete $rootElement[j];
                                }
                            }
                            $rootElement.length -= removeCount - 1;
                            if ($rootElement.context === firstElementToRemove) {
                                $rootElement.context = newNode;
                            }
                            break;
                        }
                    }
                }
                if (parent) {
                    parent.replaceChild(newNode, firstElementToRemove);
                }
                var fragment = document.createDocumentFragment();
                fragment.appendChild(firstElementToRemove);
                jqLite(newNode).data(jqLite(firstElementToRemove).data());
                if (!jQuery) {
                    delete jqLite.cache[firstElementToRemove[jqLite.expando]];
                } else {
                    skipDestroyOnNextJQueryCleanData = true;
                    jQuery.cleanData([ firstElementToRemove ]);
                }
                for (var k = 1, kk = elementsToRemove.length; k < kk; k++) {
                    var element = elementsToRemove[k];
                    jqLite(element).remove();
                    fragment.appendChild(element);
                    delete elementsToRemove[k];
                }
                elementsToRemove[0] = newNode;
                elementsToRemove.length = 1;
            }
            function cloneAndAnnotateFn(fn, annotation) {
                return extend(function() {
                    return fn.apply(null, arguments);
                }, fn, annotation);
            }
            function invokeLinkFn(linkFn, scope, $element, attrs, controllers, transcludeFn) {
                try {
                    linkFn(scope, $element, attrs, controllers, transcludeFn);
                } catch (e) {
                    $exceptionHandler(e, startingTag($element));
                }
            }
        } ];
    }
    var PREFIX_REGEXP = /^((?:x|data)[\:\-_])/i;
    function directiveNormalize(name) {
        return camelCase(name.replace(PREFIX_REGEXP, ""));
    }
    function nodesetLinkingFn(scope, nodeList, rootElement, boundTranscludeFn) {}
    function directiveLinkingFn(nodesetLinkingFn, scope, node, rootElement, boundTranscludeFn) {}
    function tokenDifference(str1, str2) {
        var values = "", tokens1 = str1.split(/\s+/), tokens2 = str2.split(/\s+/);
        outer: for (var i = 0; i < tokens1.length; i++) {
            var token = tokens1[i];
            for (var j = 0; j < tokens2.length; j++) {
                if (token == tokens2[j]) continue outer;
            }
            values += (values.length > 0 ? " " : "") + token;
        }
        return values;
    }
    function removeComments(jqNodes) {
        jqNodes = jqLite(jqNodes);
        var i = jqNodes.length;
        if (i <= 1) {
            return jqNodes;
        }
        while (i--) {
            var node = jqNodes[i];
            if (node.nodeType === NODE_TYPE_COMMENT) {
                splice.call(jqNodes, i, 1);
            }
        }
        return jqNodes;
    }
    function $ControllerProvider() {
        var controllers = {}, globals = false, CNTRL_REG = /^(\S+)(\s+as\s+(\w+))?$/;
        this.register = function(name, constructor) {
            assertNotHasOwnProperty(name, "controller");
            if (isObject(name)) {
                extend(controllers, name);
            } else {
                controllers[name] = constructor;
            }
        };
        this.allowGlobals = function() {
            globals = true;
        };
        this.$get = [ "$injector", "$window", function($injector, $window) {
            return function(expression, locals, later, ident) {
                var instance, match, constructor, identifier;
                later = later === true;
                if (ident && isString(ident)) {
                    identifier = ident;
                }
                if (isString(expression)) {
                    match = expression.match(CNTRL_REG), constructor = match[1], identifier = identifier || match[3];
                    expression = controllers.hasOwnProperty(constructor) ? controllers[constructor] : getter(locals.$scope, constructor, true) || (globals ? getter($window, constructor, true) : undefined);
                    assertArgFn(expression, constructor, true);
                }
                if (later) {
                    var Constructor = function() {};
                    Constructor.prototype = (isArray(expression) ? expression[expression.length - 1] : expression).prototype;
                    instance = new Constructor();
                    if (identifier) {
                        addIdentifier(locals, identifier, instance, constructor || expression.name);
                    }
                    return extend(function() {
                        $injector.invoke(expression, instance, locals, constructor);
                        return instance;
                    }, {
                        instance: instance,
                        identifier: identifier
                    });
                }
                instance = $injector.instantiate(expression, locals, constructor);
                if (identifier) {
                    addIdentifier(locals, identifier, instance, constructor || expression.name);
                }
                return instance;
            };
            function addIdentifier(locals, identifier, instance, name) {
                if (!(locals && isObject(locals.$scope))) {
                    throw minErr("$controller")("noscp", "Cannot export controller '{0}' as '{1}'! No $scope object provided via `locals`.", name, identifier);
                }
                locals.$scope[identifier] = instance;
            }
        } ];
    }
    function $DocumentProvider() {
        this.$get = [ "$window", function(window) {
            return jqLite(window.document);
        } ];
    }
    function $ExceptionHandlerProvider() {
        this.$get = [ "$log", function($log) {
            return function(exception, cause) {
                $log.error.apply($log, arguments);
            };
        } ];
    }
    var APPLICATION_JSON = "application/json";
    var CONTENT_TYPE_APPLICATION_JSON = {
        "Content-Type": APPLICATION_JSON + ";charset=utf-8"
    };
    var JSON_START = /^\s*(\[|\{[^\{])/;
    var JSON_END = /[\}\]]\s*$/;
    var JSON_PROTECTION_PREFIX = /^\)\]\}',?\n/;
    function defaultHttpResponseTransform(data, headers) {
        if (isString(data)) {
            data = data.replace(JSON_PROTECTION_PREFIX, "");
            var contentType = headers("Content-Type");
            if (contentType && contentType.indexOf(APPLICATION_JSON) === 0 || JSON_START.test(data) && JSON_END.test(data)) {
                data = fromJson(data);
            }
        }
        return data;
    }
    function parseHeaders(headers) {
        var parsed = {}, key, val, i;
        if (!headers) return parsed;
        forEach(headers.split("\n"), function(line) {
            i = line.indexOf(":");
            key = lowercase(trim(line.substr(0, i)));
            val = trim(line.substr(i + 1));
            if (key) {
                parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
            }
        });
        return parsed;
    }
    function headersGetter(headers) {
        var headersObj = isObject(headers) ? headers : undefined;
        return function(name) {
            if (!headersObj) headersObj = parseHeaders(headers);
            if (name) {
                return headersObj[lowercase(name)] || null;
            }
            return headersObj;
        };
    }
    function transformData(data, headers, fns) {
        if (isFunction(fns)) return fns(data, headers);
        forEach(fns, function(fn) {
            data = fn(data, headers);
        });
        return data;
    }
    function isSuccess(status) {
        return 200 <= status && status < 300;
    }
    function $HttpProvider() {
        var defaults = this.defaults = {
            transformResponse: [ defaultHttpResponseTransform ],
            transformRequest: [ function(d) {
                return isObject(d) && !isFile(d) && !isBlob(d) ? toJson(d) : d;
            } ],
            headers: {
                common: {
                    Accept: "application/json, text/plain, */*"
                },
                post: shallowCopy(CONTENT_TYPE_APPLICATION_JSON),
                put: shallowCopy(CONTENT_TYPE_APPLICATION_JSON),
                patch: shallowCopy(CONTENT_TYPE_APPLICATION_JSON)
            },
            xsrfCookieName: "XSRF-TOKEN",
            xsrfHeaderName: "X-XSRF-TOKEN"
        };
        var useApplyAsync = false;
        this.useApplyAsync = function(value) {
            if (isDefined(value)) {
                useApplyAsync = !!value;
                return this;
            }
            return useApplyAsync;
        };
        var interceptorFactories = this.interceptors = [];
        this.$get = [ "$httpBackend", "$browser", "$cacheFactory", "$rootScope", "$q", "$injector", function($httpBackend, $browser, $cacheFactory, $rootScope, $q, $injector) {
            var defaultCache = $cacheFactory("$http");
            var reversedInterceptors = [];
            forEach(interceptorFactories, function(interceptorFactory) {
                reversedInterceptors.unshift(isString(interceptorFactory) ? $injector.get(interceptorFactory) : $injector.invoke(interceptorFactory));
            });
            function $http(requestConfig) {
                var config = {
                    method: "get",
                    transformRequest: defaults.transformRequest,
                    transformResponse: defaults.transformResponse
                };
                var headers = mergeHeaders(requestConfig);
                extend(config, requestConfig);
                config.headers = headers;
                config.method = uppercase(config.method);
                var serverRequest = function(config) {
                    headers = config.headers;
                    var reqData = transformData(config.data, headersGetter(headers), config.transformRequest);
                    if (isUndefined(reqData)) {
                        forEach(headers, function(value, header) {
                            if (lowercase(header) === "content-type") {
                                delete headers[header];
                            }
                        });
                    }
                    if (isUndefined(config.withCredentials) && !isUndefined(defaults.withCredentials)) {
                        config.withCredentials = defaults.withCredentials;
                    }
                    return sendReq(config, reqData, headers).then(transformResponse, transformResponse);
                };
                var chain = [ serverRequest, undefined ];
                var promise = $q.when(config);
                forEach(reversedInterceptors, function(interceptor) {
                    if (interceptor.request || interceptor.requestError) {
                        chain.unshift(interceptor.request, interceptor.requestError);
                    }
                    if (interceptor.response || interceptor.responseError) {
                        chain.push(interceptor.response, interceptor.responseError);
                    }
                });
                while (chain.length) {
                    var thenFn = chain.shift();
                    var rejectFn = chain.shift();
                    promise = promise.then(thenFn, rejectFn);
                }
                promise.success = function(fn) {
                    promise.then(function(response) {
                        fn(response.data, response.status, response.headers, config);
                    });
                    return promise;
                };
                promise.error = function(fn) {
                    promise.then(null, function(response) {
                        fn(response.data, response.status, response.headers, config);
                    });
                    return promise;
                };
                return promise;
                function transformResponse(response) {
                    var resp = extend({}, response);
                    if (!response.data) {
                        resp.data = response.data;
                    } else {
                        resp.data = transformData(response.data, response.headers, config.transformResponse);
                    }
                    return isSuccess(response.status) ? resp : $q.reject(resp);
                }
                function mergeHeaders(config) {
                    var defHeaders = defaults.headers, reqHeaders = extend({}, config.headers), defHeaderName, lowercaseDefHeaderName, reqHeaderName;
                    defHeaders = extend({}, defHeaders.common, defHeaders[lowercase(config.method)]);
                    defaultHeadersIteration: for (defHeaderName in defHeaders) {
                        lowercaseDefHeaderName = lowercase(defHeaderName);
                        for (reqHeaderName in reqHeaders) {
                            if (lowercase(reqHeaderName) === lowercaseDefHeaderName) {
                                continue defaultHeadersIteration;
                            }
                        }
                        reqHeaders[defHeaderName] = defHeaders[defHeaderName];
                    }
                    execHeaders(reqHeaders);
                    return reqHeaders;
                    function execHeaders(headers) {
                        var headerContent;
                        forEach(headers, function(headerFn, header) {
                            if (isFunction(headerFn)) {
                                headerContent = headerFn();
                                if (headerContent != null) {
                                    headers[header] = headerContent;
                                } else {
                                    delete headers[header];
                                }
                            }
                        });
                    }
                }
            }
            $http.pendingRequests = [];
            createShortMethods("get", "delete", "head", "jsonp");
            createShortMethodsWithData("post", "put", "patch");
            $http.defaults = defaults;
            return $http;
            function createShortMethods(names) {
                forEach(arguments, function(name) {
                    $http[name] = function(url, config) {
                        return $http(extend(config || {}, {
                            method: name,
                            url: url
                        }));
                    };
                });
            }
            function createShortMethodsWithData(name) {
                forEach(arguments, function(name) {
                    $http[name] = function(url, data, config) {
                        return $http(extend(config || {}, {
                            method: name,
                            url: url,
                            data: data
                        }));
                    };
                });
            }
            function sendReq(config, reqData, reqHeaders) {
                var deferred = $q.defer(), promise = deferred.promise, cache, cachedResp, url = buildUrl(config.url, config.params);
                $http.pendingRequests.push(config);
                promise.then(removePendingReq, removePendingReq);
                if ((config.cache || defaults.cache) && config.cache !== false && (config.method === "GET" || config.method === "JSONP")) {
                    cache = isObject(config.cache) ? config.cache : isObject(defaults.cache) ? defaults.cache : defaultCache;
                }
                if (cache) {
                    cachedResp = cache.get(url);
                    if (isDefined(cachedResp)) {
                        if (isPromiseLike(cachedResp)) {
                            cachedResp.then(removePendingReq, removePendingReq);
                            return cachedResp;
                        } else {
                            if (isArray(cachedResp)) {
                                resolvePromise(cachedResp[1], cachedResp[0], shallowCopy(cachedResp[2]), cachedResp[3]);
                            } else {
                                resolvePromise(cachedResp, 200, {}, "OK");
                            }
                        }
                    } else {
                        cache.put(url, promise);
                    }
                }
                if (isUndefined(cachedResp)) {
                    var xsrfValue = urlIsSameOrigin(config.url) ? $browser.cookies()[config.xsrfCookieName || defaults.xsrfCookieName] : undefined;
                    if (xsrfValue) {
                        reqHeaders[config.xsrfHeaderName || defaults.xsrfHeaderName] = xsrfValue;
                    }
                    $httpBackend(config.method, url, reqData, done, reqHeaders, config.timeout, config.withCredentials, config.responseType);
                }
                return promise;
                function done(status, response, headersString, statusText) {
                    if (cache) {
                        if (isSuccess(status)) {
                            cache.put(url, [ status, response, parseHeaders(headersString), statusText ]);
                        } else {
                            cache.remove(url);
                        }
                    }
                    function resolveHttpPromise() {
                        resolvePromise(response, status, headersString, statusText);
                    }
                    if (useApplyAsync) {
                        $rootScope.$applyAsync(resolveHttpPromise);
                    } else {
                        resolveHttpPromise();
                        if (!$rootScope.$$phase) $rootScope.$apply();
                    }
                }
                function resolvePromise(response, status, headers, statusText) {
                    status = Math.max(status, 0);
                    (isSuccess(status) ? deferred.resolve : deferred.reject)({
                        data: response,
                        status: status,
                        headers: headersGetter(headers),
                        config: config,
                        statusText: statusText
                    });
                }
                function removePendingReq() {
                    var idx = $http.pendingRequests.indexOf(config);
                    if (idx !== -1) $http.pendingRequests.splice(idx, 1);
                }
            }
            function buildUrl(url, params) {
                if (!params) return url;
                var parts = [];
                forEachSorted(params, function(value, key) {
                    if (value === null || isUndefined(value)) return;
                    if (!isArray(value)) value = [ value ];
                    forEach(value, function(v) {
                        if (isObject(v)) {
                            if (isDate(v)) {
                                v = v.toISOString();
                            } else {
                                v = toJson(v);
                            }
                        }
                        parts.push(encodeUriQuery(key) + "=" + encodeUriQuery(v));
                    });
                });
                if (parts.length > 0) {
                    url += (url.indexOf("?") == -1 ? "?" : "&") + parts.join("&");
                }
                return url;
            }
        } ];
    }
    function createXhr() {
        return new window.XMLHttpRequest();
    }
    function $HttpBackendProvider() {
        this.$get = [ "$browser", "$window", "$document", function($browser, $window, $document) {
            return createHttpBackend($browser, createXhr, $browser.defer, $window.angular.callbacks, $document[0]);
        } ];
    }
    function createHttpBackend($browser, createXhr, $browserDefer, callbacks, rawDocument) {
        return function(method, url, post, callback, headers, timeout, withCredentials, responseType) {
            $browser.$$incOutstandingRequestCount();
            url = url || $browser.url();
            if (lowercase(method) == "jsonp") {
                var callbackId = "_" + (callbacks.counter++).toString(36);
                callbacks[callbackId] = function(data) {
                    callbacks[callbackId].data = data;
                    callbacks[callbackId].called = true;
                };
                var jsonpDone = jsonpReq(url.replace("JSON_CALLBACK", "angular.callbacks." + callbackId), callbackId, function(status, text) {
                    completeRequest(callback, status, callbacks[callbackId].data, "", text);
                    callbacks[callbackId] = noop;
                });
            } else {
                var xhr = createXhr();
                xhr.open(method, url, true);
                forEach(headers, function(value, key) {
                    if (isDefined(value)) {
                        xhr.setRequestHeader(key, value);
                    }
                });
                xhr.onload = function requestLoaded() {
                    var statusText = xhr.statusText || "";
                    var response = "response" in xhr ? xhr.response : xhr.responseText;
                    var status = xhr.status === 1223 ? 204 : xhr.status;
                    if (status === 0) {
                        status = response ? 200 : urlResolve(url).protocol == "file" ? 404 : 0;
                    }
                    completeRequest(callback, status, response, xhr.getAllResponseHeaders(), statusText);
                };
                var requestError = function() {
                    completeRequest(callback, -1, null, null, "");
                };
                xhr.onerror = requestError;
                xhr.onabort = requestError;
                if (withCredentials) {
                    xhr.withCredentials = true;
                }
                if (responseType) {
                    try {
                        xhr.responseType = responseType;
                    } catch (e) {
                        if (responseType !== "json") {
                            throw e;
                        }
                    }
                }
                xhr.send(post || null);
            }
            if (timeout > 0) {
                var timeoutId = $browserDefer(timeoutRequest, timeout);
            } else if (isPromiseLike(timeout)) {
                timeout.then(timeoutRequest);
            }
            function timeoutRequest() {
                jsonpDone && jsonpDone();
                xhr && xhr.abort();
            }
            function completeRequest(callback, status, response, headersString, statusText) {
                timeoutId && $browserDefer.cancel(timeoutId);
                jsonpDone = xhr = null;
                callback(status, response, headersString, statusText);
                $browser.$$completeOutstandingRequest(noop);
            }
        };
        function jsonpReq(url, callbackId, done) {
            var script = rawDocument.createElement("script"), callback = null;
            script.type = "text/javascript";
            script.src = url;
            script.async = true;
            callback = function(event) {
                removeEventListenerFn(script, "load", callback);
                removeEventListenerFn(script, "error", callback);
                rawDocument.body.removeChild(script);
                script = null;
                var status = -1;
                var text = "unknown";
                if (event) {
                    if (event.type === "load" && !callbacks[callbackId].called) {
                        event = {
                            type: "error"
                        };
                    }
                    text = event.type;
                    status = event.type === "error" ? 404 : 200;
                }
                if (done) {
                    done(status, text);
                }
            };
            addEventListenerFn(script, "load", callback);
            addEventListenerFn(script, "error", callback);
            rawDocument.body.appendChild(script);
            return callback;
        }
    }
    var $interpolateMinErr = minErr("$interpolate");
    function $InterpolateProvider() {
        var startSymbol = "{{";
        var endSymbol = "}}";
        this.startSymbol = function(value) {
            if (value) {
                startSymbol = value;
                return this;
            } else {
                return startSymbol;
            }
        };
        this.endSymbol = function(value) {
            if (value) {
                endSymbol = value;
                return this;
            } else {
                return endSymbol;
            }
        };
        this.$get = [ "$parse", "$exceptionHandler", "$sce", function($parse, $exceptionHandler, $sce) {
            var startSymbolLength = startSymbol.length, endSymbolLength = endSymbol.length, escapedStartRegexp = new RegExp(startSymbol.replace(/./g, escape), "g"), escapedEndRegexp = new RegExp(endSymbol.replace(/./g, escape), "g");
            function escape(ch) {
                return "\\\\\\" + ch;
            }
            function $interpolate(text, mustHaveExpression, trustedContext, allOrNothing) {
                allOrNothing = !!allOrNothing;
                var startIndex, endIndex, index = 0, expressions = [], parseFns = [], textLength = text.length, exp, concat = [], expressionPositions = [];
                while (index < textLength) {
                    if ((startIndex = text.indexOf(startSymbol, index)) != -1 && (endIndex = text.indexOf(endSymbol, startIndex + startSymbolLength)) != -1) {
                        if (index !== startIndex) {
                            concat.push(unescapeText(text.substring(index, startIndex)));
                        }
                        exp = text.substring(startIndex + startSymbolLength, endIndex);
                        expressions.push(exp);
                        parseFns.push($parse(exp, parseStringifyInterceptor));
                        index = endIndex + endSymbolLength;
                        expressionPositions.push(concat.length);
                        concat.push("");
                    } else {
                        if (index !== textLength) {
                            concat.push(unescapeText(text.substring(index)));
                        }
                        break;
                    }
                }
                if (trustedContext && concat.length > 1) {
                    throw $interpolateMinErr("noconcat", "Error while interpolating: {0}\nStrict Contextual Escaping disallows " + "interpolations that concatenate multiple expressions when a trusted value is " + "required.  See http://docs.angularjs.org/api/ng.$sce", text);
                }
                if (!mustHaveExpression || expressions.length) {
                    var compute = function(values) {
                        for (var i = 0, ii = expressions.length; i < ii; i++) {
                            if (allOrNothing && isUndefined(values[i])) return;
                            concat[expressionPositions[i]] = values[i];
                        }
                        return concat.join("");
                    };
                    var getValue = function(value) {
                        return trustedContext ? $sce.getTrusted(trustedContext, value) : $sce.valueOf(value);
                    };
                    var stringify = function(value) {
                        if (value == null) {
                            return "";
                        }
                        switch (typeof value) {
                          case "string":
                            break;

                          case "number":
                            value = "" + value;
                            break;

                          default:
                            value = toJson(value);
                        }
                        return value;
                    };
                    return extend(function interpolationFn(context) {
                        var i = 0;
                        var ii = expressions.length;
                        var values = new Array(ii);
                        try {
                            for (;i < ii; i++) {
                                values[i] = parseFns[i](context);
                            }
                            return compute(values);
                        } catch (err) {
                            var newErr = $interpolateMinErr("interr", "Can't interpolate: {0}\n{1}", text, err.toString());
                            $exceptionHandler(newErr);
                        }
                    }, {
                        exp: text,
                        expressions: expressions,
                        $$watchDelegate: function(scope, listener, objectEquality) {
                            var lastValue;
                            return scope.$watchGroup(parseFns, function interpolateFnWatcher(values, oldValues) {
                                var currValue = compute(values);
                                if (isFunction(listener)) {
                                    listener.call(this, currValue, values !== oldValues ? lastValue : currValue, scope);
                                }
                                lastValue = currValue;
                            }, objectEquality);
                        }
                    });
                }
                function unescapeText(text) {
                    return text.replace(escapedStartRegexp, startSymbol).replace(escapedEndRegexp, endSymbol);
                }
                function parseStringifyInterceptor(value) {
                    try {
                        return stringify(getValue(value));
                    } catch (err) {
                        var newErr = $interpolateMinErr("interr", "Can't interpolate: {0}\n{1}", text, err.toString());
                        $exceptionHandler(newErr);
                    }
                }
            }
            $interpolate.startSymbol = function() {
                return startSymbol;
            };
            $interpolate.endSymbol = function() {
                return endSymbol;
            };
            return $interpolate;
        } ];
    }
    function $IntervalProvider() {
        this.$get = [ "$rootScope", "$window", "$q", "$$q", function($rootScope, $window, $q, $$q) {
            var intervals = {};
            function interval(fn, delay, count, invokeApply) {
                var setInterval = $window.setInterval, clearInterval = $window.clearInterval, iteration = 0, skipApply = isDefined(invokeApply) && !invokeApply, deferred = (skipApply ? $$q : $q).defer(), promise = deferred.promise;
                count = isDefined(count) ? count : 0;
                promise.then(null, null, fn);
                promise.$$intervalId = setInterval(function tick() {
                    deferred.notify(iteration++);
                    if (count > 0 && iteration >= count) {
                        deferred.resolve(iteration);
                        clearInterval(promise.$$intervalId);
                        delete intervals[promise.$$intervalId];
                    }
                    if (!skipApply) $rootScope.$apply();
                }, delay);
                intervals[promise.$$intervalId] = deferred;
                return promise;
            }
            interval.cancel = function(promise) {
                if (promise && promise.$$intervalId in intervals) {
                    intervals[promise.$$intervalId].reject("canceled");
                    $window.clearInterval(promise.$$intervalId);
                    delete intervals[promise.$$intervalId];
                    return true;
                }
                return false;
            };
            return interval;
        } ];
    }
    function $LocaleProvider() {
        this.$get = function() {
            return {
                id: "en-us",
                NUMBER_FORMATS: {
                    DECIMAL_SEP: ".",
                    GROUP_SEP: ",",
                    PATTERNS: [ {
                        minInt: 1,
                        minFrac: 0,
                        maxFrac: 3,
                        posPre: "",
                        posSuf: "",
                        negPre: "-",
                        negSuf: "",
                        gSize: 3,
                        lgSize: 3
                    }, {
                        minInt: 1,
                        minFrac: 2,
                        maxFrac: 2,
                        posPre: "¤",
                        posSuf: "",
                        negPre: "(¤",
                        negSuf: ")",
                        gSize: 3,
                        lgSize: 3
                    } ],
                    CURRENCY_SYM: "$"
                },
                DATETIME_FORMATS: {
                    MONTH: "January,February,March,April,May,June,July,August,September,October,November,December".split(","),
                    SHORTMONTH: "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),
                    DAY: "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),
                    SHORTDAY: "Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(","),
                    AMPMS: [ "AM", "PM" ],
                    medium: "MMM d, y h:mm:ss a",
                    "short": "M/d/yy h:mm a",
                    fullDate: "EEEE, MMMM d, y",
                    longDate: "MMMM d, y",
                    mediumDate: "MMM d, y",
                    shortDate: "M/d/yy",
                    mediumTime: "h:mm:ss a",
                    shortTime: "h:mm a"
                },
                pluralCat: function(num) {
                    if (num === 1) {
                        return "one";
                    }
                    return "other";
                }
            };
        };
    }
    var PATH_MATCH = /^([^\?#]*)(\?([^#]*))?(#(.*))?$/, DEFAULT_PORTS = {
        http: 80,
        https: 443,
        ftp: 21
    };
    var $locationMinErr = minErr("$location");
    function encodePath(path) {
        var segments = path.split("/"), i = segments.length;
        while (i--) {
            segments[i] = encodeUriSegment(segments[i]);
        }
        return segments.join("/");
    }
    function parseAbsoluteUrl(absoluteUrl, locationObj, appBase) {
        var parsedUrl = urlResolve(absoluteUrl, appBase);
        locationObj.$$protocol = parsedUrl.protocol;
        locationObj.$$host = parsedUrl.hostname;
        locationObj.$$port = int(parsedUrl.port) || DEFAULT_PORTS[parsedUrl.protocol] || null;
    }
    function parseAppUrl(relativeUrl, locationObj, appBase) {
        var prefixed = relativeUrl.charAt(0) !== "/";
        if (prefixed) {
            relativeUrl = "/" + relativeUrl;
        }
        var match = urlResolve(relativeUrl, appBase);
        locationObj.$$path = decodeURIComponent(prefixed && match.pathname.charAt(0) === "/" ? match.pathname.substring(1) : match.pathname);
        locationObj.$$search = parseKeyValue(match.search);
        locationObj.$$hash = decodeURIComponent(match.hash);
        if (locationObj.$$path && locationObj.$$path.charAt(0) != "/") {
            locationObj.$$path = "/" + locationObj.$$path;
        }
    }
    function beginsWith(begin, whole) {
        if (whole.indexOf(begin) === 0) {
            return whole.substr(begin.length);
        }
    }
    function stripHash(url) {
        var index = url.indexOf("#");
        return index == -1 ? url : url.substr(0, index);
    }
    function stripFile(url) {
        return url.substr(0, stripHash(url).lastIndexOf("/") + 1);
    }
    function serverBase(url) {
        return url.substring(0, url.indexOf("/", url.indexOf("//") + 2));
    }
    function LocationHtml5Url(appBase, basePrefix) {
        this.$$html5 = true;
        basePrefix = basePrefix || "";
        var appBaseNoFile = stripFile(appBase);
        parseAbsoluteUrl(appBase, this, appBase);
        this.$$parse = function(url) {
            var pathUrl = beginsWith(appBaseNoFile, url);
            if (!isString(pathUrl)) {
                throw $locationMinErr("ipthprfx", 'Invalid url "{0}", missing path prefix "{1}".', url, appBaseNoFile);
            }
            parseAppUrl(pathUrl, this, appBase);
            if (!this.$$path) {
                this.$$path = "/";
            }
            this.$$compose();
        };
        this.$$compose = function() {
            var search = toKeyValue(this.$$search), hash = this.$$hash ? "#" + encodeUriSegment(this.$$hash) : "";
            this.$$url = encodePath(this.$$path) + (search ? "?" + search : "") + hash;
            this.$$absUrl = appBaseNoFile + this.$$url.substr(1);
        };
        this.$$parseLinkUrl = function(url, relHref) {
            if (relHref && relHref[0] === "#") {
                this.hash(relHref.slice(1));
                return true;
            }
            var appUrl, prevAppUrl;
            var rewrittenUrl;
            if ((appUrl = beginsWith(appBase, url)) !== undefined) {
                prevAppUrl = appUrl;
                if ((appUrl = beginsWith(basePrefix, appUrl)) !== undefined) {
                    rewrittenUrl = appBaseNoFile + (beginsWith("/", appUrl) || appUrl);
                } else {
                    rewrittenUrl = appBase + prevAppUrl;
                }
            } else if ((appUrl = beginsWith(appBaseNoFile, url)) !== undefined) {
                rewrittenUrl = appBaseNoFile + appUrl;
            } else if (appBaseNoFile == url + "/") {
                rewrittenUrl = appBaseNoFile;
            }
            if (rewrittenUrl) {
                this.$$parse(rewrittenUrl);
            }
            return !!rewrittenUrl;
        };
    }
    function LocationHashbangUrl(appBase, hashPrefix) {
        var appBaseNoFile = stripFile(appBase);
        parseAbsoluteUrl(appBase, this, appBase);
        this.$$parse = function(url) {
            var withoutBaseUrl = beginsWith(appBase, url) || beginsWith(appBaseNoFile, url);
            var withoutHashUrl = withoutBaseUrl.charAt(0) == "#" ? beginsWith(hashPrefix, withoutBaseUrl) : this.$$html5 ? withoutBaseUrl : "";
            if (!isString(withoutHashUrl)) {
                throw $locationMinErr("ihshprfx", 'Invalid url "{0}", missing hash prefix "{1}".', url, hashPrefix);
            }
            parseAppUrl(withoutHashUrl, this, appBase);
            this.$$path = removeWindowsDriveName(this.$$path, withoutHashUrl, appBase);
            this.$$compose();
            function removeWindowsDriveName(path, url, base) {
                var windowsFilePathExp = /^\/[A-Z]:(\/.*)/;
                var firstPathSegmentMatch;
                if (url.indexOf(base) === 0) {
                    url = url.replace(base, "");
                }
                if (windowsFilePathExp.exec(url)) {
                    return path;
                }
                firstPathSegmentMatch = windowsFilePathExp.exec(path);
                return firstPathSegmentMatch ? firstPathSegmentMatch[1] : path;
            }
        };
        this.$$compose = function() {
            var search = toKeyValue(this.$$search), hash = this.$$hash ? "#" + encodeUriSegment(this.$$hash) : "";
            this.$$url = encodePath(this.$$path) + (search ? "?" + search : "") + hash;
            this.$$absUrl = appBase + (this.$$url ? hashPrefix + this.$$url : "");
        };
        this.$$parseLinkUrl = function(url, relHref) {
            if (stripHash(appBase) == stripHash(url)) {
                this.$$parse(url);
                return true;
            }
            return false;
        };
    }
    function LocationHashbangInHtml5Url(appBase, hashPrefix) {
        this.$$html5 = true;
        LocationHashbangUrl.apply(this, arguments);
        var appBaseNoFile = stripFile(appBase);
        this.$$parseLinkUrl = function(url, relHref) {
            if (relHref && relHref[0] === "#") {
                this.hash(relHref.slice(1));
                return true;
            }
            var rewrittenUrl;
            var appUrl;
            if (appBase == stripHash(url)) {
                rewrittenUrl = url;
            } else if (appUrl = beginsWith(appBaseNoFile, url)) {
                rewrittenUrl = appBase + hashPrefix + appUrl;
            } else if (appBaseNoFile === url + "/") {
                rewrittenUrl = appBaseNoFile;
            }
            if (rewrittenUrl) {
                this.$$parse(rewrittenUrl);
            }
            return !!rewrittenUrl;
        };
        this.$$compose = function() {
            var search = toKeyValue(this.$$search), hash = this.$$hash ? "#" + encodeUriSegment(this.$$hash) : "";
            this.$$url = encodePath(this.$$path) + (search ? "?" + search : "") + hash;
            this.$$absUrl = appBase + hashPrefix + this.$$url;
        };
    }
    var locationPrototype = {
        $$html5: false,
        $$replace: false,
        absUrl: locationGetter("$$absUrl"),
        url: function(url) {
            if (isUndefined(url)) return this.$$url;
            var match = PATH_MATCH.exec(url);
            if (match[1]) this.path(decodeURIComponent(match[1]));
            if (match[2] || match[1]) this.search(match[3] || "");
            this.hash(match[5] || "");
            return this;
        },
        protocol: locationGetter("$$protocol"),
        host: locationGetter("$$host"),
        port: locationGetter("$$port"),
        path: locationGetterSetter("$$path", function(path) {
            path = path !== null ? path.toString() : "";
            return path.charAt(0) == "/" ? path : "/" + path;
        }),
        search: function(search, paramValue) {
            switch (arguments.length) {
              case 0:
                return this.$$search;

              case 1:
                if (isString(search) || isNumber(search)) {
                    search = search.toString();
                    this.$$search = parseKeyValue(search);
                } else if (isObject(search)) {
                    search = copy(search, {});
                    forEach(search, function(value, key) {
                        if (value == null) delete search[key];
                    });
                    this.$$search = search;
                } else {
                    throw $locationMinErr("isrcharg", "The first argument of the `$location#search()` call must be a string or an object.");
                }
                break;

              default:
                if (isUndefined(paramValue) || paramValue === null) {
                    delete this.$$search[search];
                } else {
                    this.$$search[search] = paramValue;
                }
            }
            this.$$compose();
            return this;
        },
        hash: locationGetterSetter("$$hash", function(hash) {
            return hash !== null ? hash.toString() : "";
        }),
        replace: function() {
            this.$$replace = true;
            return this;
        }
    };
    forEach([ LocationHashbangInHtml5Url, LocationHashbangUrl, LocationHtml5Url ], function(Location) {
        Location.prototype = Object.create(locationPrototype);
        Location.prototype.state = function(state) {
            if (!arguments.length) return this.$$state;
            if (Location !== LocationHtml5Url || !this.$$html5) {
                throw $locationMinErr("nostate", "History API state support is available only " + "in HTML5 mode and only in browsers supporting HTML5 History API");
            }
            this.$$state = isUndefined(state) ? null : state;
            return this;
        };
    });
    function locationGetter(property) {
        return function() {
            return this[property];
        };
    }
    function locationGetterSetter(property, preprocess) {
        return function(value) {
            if (isUndefined(value)) return this[property];
            this[property] = preprocess(value);
            this.$$compose();
            return this;
        };
    }
    function $LocationProvider() {
        var hashPrefix = "", html5Mode = {
            enabled: false,
            requireBase: true,
            rewriteLinks: true
        };
        this.hashPrefix = function(prefix) {
            if (isDefined(prefix)) {
                hashPrefix = prefix;
                return this;
            } else {
                return hashPrefix;
            }
        };
        this.html5Mode = function(mode) {
            if (isBoolean(mode)) {
                html5Mode.enabled = mode;
                return this;
            } else if (isObject(mode)) {
                if (isBoolean(mode.enabled)) {
                    html5Mode.enabled = mode.enabled;
                }
                if (isBoolean(mode.requireBase)) {
                    html5Mode.requireBase = mode.requireBase;
                }
                if (isBoolean(mode.rewriteLinks)) {
                    html5Mode.rewriteLinks = mode.rewriteLinks;
                }
                return this;
            } else {
                return html5Mode;
            }
        };
        this.$get = [ "$rootScope", "$browser", "$sniffer", "$rootElement", function($rootScope, $browser, $sniffer, $rootElement) {
            var $location, LocationMode, baseHref = $browser.baseHref(), initialUrl = $browser.url(), appBase;
            if (html5Mode.enabled) {
                if (!baseHref && html5Mode.requireBase) {
                    throw $locationMinErr("nobase", "$location in HTML5 mode requires a <base> tag to be present!");
                }
                appBase = serverBase(initialUrl) + (baseHref || "/");
                LocationMode = $sniffer.history ? LocationHtml5Url : LocationHashbangInHtml5Url;
            } else {
                appBase = stripHash(initialUrl);
                LocationMode = LocationHashbangUrl;
            }
            $location = new LocationMode(appBase, "#" + hashPrefix);
            $location.$$parseLinkUrl(initialUrl, initialUrl);
            $location.$$state = $browser.state();
            var IGNORE_URI_REGEXP = /^\s*(javascript|mailto):/i;
            function setBrowserUrlWithFallback(url, replace, state) {
                var oldUrl = $location.url();
                var oldState = $location.$$state;
                try {
                    $browser.url(url, replace, state);
                    $location.$$state = $browser.state();
                } catch (e) {
                    $location.url(oldUrl);
                    $location.$$state = oldState;
                    throw e;
                }
            }
            $rootElement.on("click", function(event) {
                if (!html5Mode.rewriteLinks || event.ctrlKey || event.metaKey || event.which == 2) return;
                var elm = jqLite(event.target);
                while (nodeName_(elm[0]) !== "a") {
                    if (elm[0] === $rootElement[0] || !(elm = elm.parent())[0]) return;
                }
                var absHref = elm.prop("href");
                var relHref = elm.attr("href") || elm.attr("xlink:href");
                if (isObject(absHref) && absHref.toString() === "[object SVGAnimatedString]") {
                    absHref = urlResolve(absHref.animVal).href;
                }
                if (IGNORE_URI_REGEXP.test(absHref)) return;
                if (absHref && !elm.attr("target") && !event.isDefaultPrevented()) {
                    if ($location.$$parseLinkUrl(absHref, relHref)) {
                        event.preventDefault();
                        if ($location.absUrl() != $browser.url()) {
                            $rootScope.$apply();
                            window.angular["ff-684208-preventDefault"] = true;
                        }
                    }
                }
            });
            if ($location.absUrl() != initialUrl) {
                $browser.url($location.absUrl(), true);
            }
            var initializing = true;
            $browser.onUrlChange(function(newUrl, newState) {
                $rootScope.$evalAsync(function() {
                    var oldUrl = $location.absUrl();
                    var oldState = $location.$$state;
                    $location.$$parse(newUrl);
                    $location.$$state = newState;
                    if ($rootScope.$broadcast("$locationChangeStart", newUrl, oldUrl, newState, oldState).defaultPrevented) {
                        $location.$$parse(oldUrl);
                        $location.$$state = oldState;
                        setBrowserUrlWithFallback(oldUrl, false, oldState);
                    } else {
                        initializing = false;
                        afterLocationChange(oldUrl, oldState);
                    }
                });
                if (!$rootScope.$$phase) $rootScope.$digest();
            });
            $rootScope.$watch(function $locationWatch() {
                var oldUrl = $browser.url();
                var oldState = $browser.state();
                var currentReplace = $location.$$replace;
                var urlOrStateChanged = oldUrl !== $location.absUrl() || $location.$$html5 && $sniffer.history && oldState !== $location.$$state;
                if (initializing || urlOrStateChanged) {
                    initializing = false;
                    $rootScope.$evalAsync(function() {
                        if ($rootScope.$broadcast("$locationChangeStart", $location.absUrl(), oldUrl, $location.$$state, oldState).defaultPrevented) {
                            $location.$$parse(oldUrl);
                            $location.$$state = oldState;
                        } else {
                            if (urlOrStateChanged) {
                                setBrowserUrlWithFallback($location.absUrl(), currentReplace, oldState === $location.$$state ? null : $location.$$state);
                            }
                            afterLocationChange(oldUrl, oldState);
                        }
                    });
                }
                $location.$$replace = false;
            });
            return $location;
            function afterLocationChange(oldUrl, oldState) {
                $rootScope.$broadcast("$locationChangeSuccess", $location.absUrl(), oldUrl, $location.$$state, oldState);
            }
        } ];
    }
    function $LogProvider() {
        var debug = true, self = this;
        this.debugEnabled = function(flag) {
            if (isDefined(flag)) {
                debug = flag;
                return this;
            } else {
                return debug;
            }
        };
        this.$get = [ "$window", function($window) {
            return {
                log: consoleLog("log"),
                info: consoleLog("info"),
                warn: consoleLog("warn"),
                error: consoleLog("error"),
                debug: function() {
                    var fn = consoleLog("debug");
                    return function() {
                        if (debug) {
                            fn.apply(self, arguments);
                        }
                    };
                }()
            };
            function formatError(arg) {
                if (arg instanceof Error) {
                    if (arg.stack) {
                        arg = arg.message && arg.stack.indexOf(arg.message) === -1 ? "Error: " + arg.message + "\n" + arg.stack : arg.stack;
                    } else if (arg.sourceURL) {
                        arg = arg.message + "\n" + arg.sourceURL + ":" + arg.line;
                    }
                }
                return arg;
            }
            function consoleLog(type) {
                var console = $window.console || {}, logFn = console[type] || console.log || noop, hasApply = false;
                try {
                    hasApply = !!logFn.apply;
                } catch (e) {}
                if (hasApply) {
                    return function() {
                        var args = [];
                        forEach(arguments, function(arg) {
                            args.push(formatError(arg));
                        });
                        return logFn.apply(console, args);
                    };
                }
                return function(arg1, arg2) {
                    logFn(arg1, arg2 == null ? "" : arg2);
                };
            }
        } ];
    }
    var $parseMinErr = minErr("$parse");
    function ensureSafeMemberName(name, fullExpression) {
        if (name === "__defineGetter__" || name === "__defineSetter__" || name === "__lookupGetter__" || name === "__lookupSetter__" || name === "__proto__") {
            throw $parseMinErr("isecfld", "Attempting to access a disallowed field in Angular expressions! " + "Expression: {0}", fullExpression);
        }
        return name;
    }
    function ensureSafeObject(obj, fullExpression) {
        if (obj) {
            if (obj.constructor === obj) {
                throw $parseMinErr("isecfn", "Referencing Function in Angular expressions is disallowed! Expression: {0}", fullExpression);
            } else if (obj.window === obj) {
                throw $parseMinErr("isecwindow", "Referencing the Window in Angular expressions is disallowed! Expression: {0}", fullExpression);
            } else if (obj.children && (obj.nodeName || obj.prop && obj.attr && obj.find)) {
                throw $parseMinErr("isecdom", "Referencing DOM nodes in Angular expressions is disallowed! Expression: {0}", fullExpression);
            } else if (obj === Object) {
                throw $parseMinErr("isecobj", "Referencing Object in Angular expressions is disallowed! Expression: {0}", fullExpression);
            }
        }
        return obj;
    }
    var CALL = Function.prototype.call;
    var APPLY = Function.prototype.apply;
    var BIND = Function.prototype.bind;
    function ensureSafeFunction(obj, fullExpression) {
        if (obj) {
            if (obj.constructor === obj) {
                throw $parseMinErr("isecfn", "Referencing Function in Angular expressions is disallowed! Expression: {0}", fullExpression);
            } else if (obj === CALL || obj === APPLY || obj === BIND) {
                throw $parseMinErr("isecff", "Referencing call, apply or bind in Angular expressions is disallowed! Expression: {0}", fullExpression);
            }
        }
    }
    var CONSTANTS = createMap();
    forEach({
        "null": function() {
            return null;
        },
        "true": function() {
            return true;
        },
        "false": function() {
            return false;
        },
        undefined: function() {}
    }, function(constantGetter, name) {
        constantGetter.constant = constantGetter.literal = constantGetter.sharedGetter = true;
        CONSTANTS[name] = constantGetter;
    });
    CONSTANTS["this"] = function(self) {
        return self;
    };
    CONSTANTS["this"].sharedGetter = true;
    var OPERATORS = extend(createMap(), {
        "+": function(self, locals, a, b) {
            a = a(self, locals);
            b = b(self, locals);
            if (isDefined(a)) {
                if (isDefined(b)) {
                    return a + b;
                }
                return a;
            }
            return isDefined(b) ? b : undefined;
        },
        "-": function(self, locals, a, b) {
            a = a(self, locals);
            b = b(self, locals);
            return (isDefined(a) ? a : 0) - (isDefined(b) ? b : 0);
        },
        "*": function(self, locals, a, b) {
            return a(self, locals) * b(self, locals);
        },
        "/": function(self, locals, a, b) {
            return a(self, locals) / b(self, locals);
        },
        "%": function(self, locals, a, b) {
            return a(self, locals) % b(self, locals);
        },
        "===": function(self, locals, a, b) {
            return a(self, locals) === b(self, locals);
        },
        "!==": function(self, locals, a, b) {
            return a(self, locals) !== b(self, locals);
        },
        "==": function(self, locals, a, b) {
            return a(self, locals) == b(self, locals);
        },
        "!=": function(self, locals, a, b) {
            return a(self, locals) != b(self, locals);
        },
        "<": function(self, locals, a, b) {
            return a(self, locals) < b(self, locals);
        },
        ">": function(self, locals, a, b) {
            return a(self, locals) > b(self, locals);
        },
        "<=": function(self, locals, a, b) {
            return a(self, locals) <= b(self, locals);
        },
        ">=": function(self, locals, a, b) {
            return a(self, locals) >= b(self, locals);
        },
        "&&": function(self, locals, a, b) {
            return a(self, locals) && b(self, locals);
        },
        "||": function(self, locals, a, b) {
            return a(self, locals) || b(self, locals);
        },
        "!": function(self, locals, a) {
            return !a(self, locals);
        },
        "=": true,
        "|": true
    });
    var ESCAPE = {
        n: "\n",
        f: "\f",
        r: "\r",
        t: "	",
        v: "",
        "'": "'",
        '"': '"'
    };
    var Lexer = function(options) {
        this.options = options;
    };
    Lexer.prototype = {
        constructor: Lexer,
        lex: function(text) {
            this.text = text;
            this.index = 0;
            this.ch = undefined;
            this.tokens = [];
            while (this.index < this.text.length) {
                this.ch = this.text.charAt(this.index);
                if (this.is("\"'")) {
                    this.readString(this.ch);
                } else if (this.isNumber(this.ch) || this.is(".") && this.isNumber(this.peek())) {
                    this.readNumber();
                } else if (this.isIdent(this.ch)) {
                    this.readIdent();
                } else if (this.is("(){}[].,;:?")) {
                    this.tokens.push({
                        index: this.index,
                        text: this.ch
                    });
                    this.index++;
                } else if (this.isWhitespace(this.ch)) {
                    this.index++;
                } else {
                    var ch2 = this.ch + this.peek();
                    var ch3 = ch2 + this.peek(2);
                    var fn = OPERATORS[this.ch];
                    var fn2 = OPERATORS[ch2];
                    var fn3 = OPERATORS[ch3];
                    if (fn3) {
                        this.tokens.push({
                            index: this.index,
                            text: ch3,
                            fn: fn3
                        });
                        this.index += 3;
                    } else if (fn2) {
                        this.tokens.push({
                            index: this.index,
                            text: ch2,
                            fn: fn2
                        });
                        this.index += 2;
                    } else if (fn) {
                        this.tokens.push({
                            index: this.index,
                            text: this.ch,
                            fn: fn
                        });
                        this.index += 1;
                    } else {
                        this.throwError("Unexpected next character ", this.index, this.index + 1);
                    }
                }
            }
            return this.tokens;
        },
        is: function(chars) {
            return chars.indexOf(this.ch) !== -1;
        },
        peek: function(i) {
            var num = i || 1;
            return this.index + num < this.text.length ? this.text.charAt(this.index + num) : false;
        },
        isNumber: function(ch) {
            return "0" <= ch && ch <= "9";
        },
        isWhitespace: function(ch) {
            return ch === " " || ch === "\r" || ch === "	" || ch === "\n" || ch === "" || ch === " ";
        },
        isIdent: function(ch) {
            return "a" <= ch && ch <= "z" || "A" <= ch && ch <= "Z" || "_" === ch || ch === "$";
        },
        isExpOperator: function(ch) {
            return ch === "-" || ch === "+" || this.isNumber(ch);
        },
        throwError: function(error, start, end) {
            end = end || this.index;
            var colStr = isDefined(start) ? "s " + start + "-" + this.index + " [" + this.text.substring(start, end) + "]" : " " + end;
            throw $parseMinErr("lexerr", "Lexer Error: {0} at column{1} in expression [{2}].", error, colStr, this.text);
        },
        readNumber: function() {
            var number = "";
            var start = this.index;
            while (this.index < this.text.length) {
                var ch = lowercase(this.text.charAt(this.index));
                if (ch == "." || this.isNumber(ch)) {
                    number += ch;
                } else {
                    var peekCh = this.peek();
                    if (ch == "e" && this.isExpOperator(peekCh)) {
                        number += ch;
                    } else if (this.isExpOperator(ch) && peekCh && this.isNumber(peekCh) && number.charAt(number.length - 1) == "e") {
                        number += ch;
                    } else if (this.isExpOperator(ch) && (!peekCh || !this.isNumber(peekCh)) && number.charAt(number.length - 1) == "e") {
                        this.throwError("Invalid exponent");
                    } else {
                        break;
                    }
                }
                this.index++;
            }
            number = 1 * number;
            this.tokens.push({
                index: start,
                text: number,
                constant: true,
                fn: function() {
                    return number;
                }
            });
        },
        readIdent: function() {
            var expression = this.text;
            var ident = "";
            var start = this.index;
            var lastDot, peekIndex, methodName, ch;
            while (this.index < this.text.length) {
                ch = this.text.charAt(this.index);
                if (ch === "." || this.isIdent(ch) || this.isNumber(ch)) {
                    if (ch === ".") lastDot = this.index;
                    ident += ch;
                } else {
                    break;
                }
                this.index++;
            }
            if (lastDot && ident[ident.length - 1] === ".") {
                this.index--;
                ident = ident.slice(0, -1);
                lastDot = ident.lastIndexOf(".");
                if (lastDot === -1) {
                    lastDot = undefined;
                }
            }
            if (lastDot) {
                peekIndex = this.index;
                while (peekIndex < this.text.length) {
                    ch = this.text.charAt(peekIndex);
                    if (ch === "(") {
                        methodName = ident.substr(lastDot - start + 1);
                        ident = ident.substr(0, lastDot - start);
                        this.index = peekIndex;
                        break;
                    }
                    if (this.isWhitespace(ch)) {
                        peekIndex++;
                    } else {
                        break;
                    }
                }
            }
            this.tokens.push({
                index: start,
                text: ident,
                fn: CONSTANTS[ident] || getterFn(ident, this.options, expression)
            });
            if (methodName) {
                this.tokens.push({
                    index: lastDot,
                    text: "."
                });
                this.tokens.push({
                    index: lastDot + 1,
                    text: methodName
                });
            }
        },
        readString: function(quote) {
            var start = this.index;
            this.index++;
            var string = "";
            var rawString = quote;
            var escape = false;
            while (this.index < this.text.length) {
                var ch = this.text.charAt(this.index);
                rawString += ch;
                if (escape) {
                    if (ch === "u") {
                        var hex = this.text.substring(this.index + 1, this.index + 5);
                        if (!hex.match(/[\da-f]{4}/i)) this.throwError("Invalid unicode escape [\\u" + hex + "]");
                        this.index += 4;
                        string += String.fromCharCode(parseInt(hex, 16));
                    } else {
                        var rep = ESCAPE[ch];
                        string = string + (rep || ch);
                    }
                    escape = false;
                } else if (ch === "\\") {
                    escape = true;
                } else if (ch === quote) {
                    this.index++;
                    this.tokens.push({
                        index: start,
                        text: rawString,
                        string: string,
                        constant: true,
                        fn: function() {
                            return string;
                        }
                    });
                    return;
                } else {
                    string += ch;
                }
                this.index++;
            }
            this.throwError("Unterminated quote", start);
        }
    };
    function isConstant(exp) {
        return exp.constant;
    }
    var Parser = function(lexer, $filter, options) {
        this.lexer = lexer;
        this.$filter = $filter;
        this.options = options;
    };
    Parser.ZERO = extend(function() {
        return 0;
    }, {
        sharedGetter: true,
        constant: true
    });
    Parser.prototype = {
        constructor: Parser,
        parse: function(text) {
            this.text = text;
            this.tokens = this.lexer.lex(text);
            var value = this.statements();
            if (this.tokens.length !== 0) {
                this.throwError("is an unexpected token", this.tokens[0]);
            }
            value.literal = !!value.literal;
            value.constant = !!value.constant;
            return value;
        },
        primary: function() {
            var primary;
            if (this.expect("(")) {
                primary = this.filterChain();
                this.consume(")");
            } else if (this.expect("[")) {
                primary = this.arrayDeclaration();
            } else if (this.expect("{")) {
                primary = this.object();
            } else {
                var token = this.expect();
                primary = token.fn;
                if (!primary) {
                    this.throwError("not a primary expression", token);
                }
                if (token.constant) {
                    primary.constant = true;
                    primary.literal = true;
                }
            }
            var next, context;
            while (next = this.expect("(", "[", ".")) {
                if (next.text === "(") {
                    primary = this.functionCall(primary, context);
                    context = null;
                } else if (next.text === "[") {
                    context = primary;
                    primary = this.objectIndex(primary);
                } else if (next.text === ".") {
                    context = primary;
                    primary = this.fieldAccess(primary);
                } else {
                    this.throwError("IMPOSSIBLE");
                }
            }
            return primary;
        },
        throwError: function(msg, token) {
            throw $parseMinErr("syntax", "Syntax Error: Token '{0}' {1} at column {2} of the expression [{3}] starting at [{4}].", token.text, msg, token.index + 1, this.text, this.text.substring(token.index));
        },
        peekToken: function() {
            if (this.tokens.length === 0) throw $parseMinErr("ueoe", "Unexpected end of expression: {0}", this.text);
            return this.tokens[0];
        },
        peek: function(e1, e2, e3, e4) {
            if (this.tokens.length > 0) {
                var token = this.tokens[0];
                var t = token.text;
                if (t === e1 || t === e2 || t === e3 || t === e4 || !e1 && !e2 && !e3 && !e4) {
                    return token;
                }
            }
            return false;
        },
        expect: function(e1, e2, e3, e4) {
            var token = this.peek(e1, e2, e3, e4);
            if (token) {
                this.tokens.shift();
                return token;
            }
            return false;
        },
        consume: function(e1) {
            if (!this.expect(e1)) {
                this.throwError("is unexpected, expecting [" + e1 + "]", this.peek());
            }
        },
        unaryFn: function(fn, right) {
            return extend(function $parseUnaryFn(self, locals) {
                return fn(self, locals, right);
            }, {
                constant: right.constant,
                inputs: [ right ]
            });
        },
        binaryFn: function(left, fn, right, isBranching) {
            return extend(function $parseBinaryFn(self, locals) {
                return fn(self, locals, left, right);
            }, {
                constant: left.constant && right.constant,
                inputs: !isBranching && [ left, right ]
            });
        },
        statements: function() {
            var statements = [];
            while (true) {
                if (this.tokens.length > 0 && !this.peek("}", ")", ";", "]")) statements.push(this.filterChain());
                if (!this.expect(";")) {
                    return statements.length === 1 ? statements[0] : function $parseStatements(self, locals) {
                        var value;
                        for (var i = 0, ii = statements.length; i < ii; i++) {
                            value = statements[i](self, locals);
                        }
                        return value;
                    };
                }
            }
        },
        filterChain: function() {
            var left = this.expression();
            var token;
            while (token = this.expect("|")) {
                left = this.filter(left);
            }
            return left;
        },
        filter: function(inputFn) {
            var token = this.expect();
            var fn = this.$filter(token.text);
            var argsFn;
            var args;
            if (this.peek(":")) {
                argsFn = [];
                args = [];
                while (this.expect(":")) {
                    argsFn.push(this.expression());
                }
            }
            var inputs = [ inputFn ].concat(argsFn || []);
            return extend(function $parseFilter(self, locals) {
                var input = inputFn(self, locals);
                if (args) {
                    args[0] = input;
                    var i = argsFn.length;
                    while (i--) {
                        args[i + 1] = argsFn[i](self, locals);
                    }
                    return fn.apply(undefined, args);
                }
                return fn(input);
            }, {
                constant: !fn.$stateful && inputs.every(isConstant),
                inputs: !fn.$stateful && inputs
            });
        },
        expression: function() {
            return this.assignment();
        },
        assignment: function() {
            var left = this.ternary();
            var right;
            var token;
            if (token = this.expect("=")) {
                if (!left.assign) {
                    this.throwError("implies assignment but [" + this.text.substring(0, token.index) + "] can not be assigned to", token);
                }
                right = this.ternary();
                return extend(function $parseAssignment(scope, locals) {
                    return left.assign(scope, right(scope, locals), locals);
                }, {
                    inputs: [ left, right ]
                });
            }
            return left;
        },
        ternary: function() {
            var left = this.logicalOR();
            var middle;
            var token;
            if (token = this.expect("?")) {
                middle = this.assignment();
                if (token = this.expect(":")) {
                    var right = this.assignment();
                    return extend(function $parseTernary(self, locals) {
                        return left(self, locals) ? middle(self, locals) : right(self, locals);
                    }, {
                        constant: left.constant && middle.constant && right.constant
                    });
                } else {
                    this.throwError("expected :", token);
                }
            }
            return left;
        },
        logicalOR: function() {
            var left = this.logicalAND();
            var token;
            while (token = this.expect("||")) {
                left = this.binaryFn(left, token.fn, this.logicalAND(), true);
            }
            return left;
        },
        logicalAND: function() {
            var left = this.equality();
            var token;
            if (token = this.expect("&&")) {
                left = this.binaryFn(left, token.fn, this.logicalAND(), true);
            }
            return left;
        },
        equality: function() {
            var left = this.relational();
            var token;
            if (token = this.expect("==", "!=", "===", "!==")) {
                left = this.binaryFn(left, token.fn, this.equality());
            }
            return left;
        },
        relational: function() {
            var left = this.additive();
            var token;
            if (token = this.expect("<", ">", "<=", ">=")) {
                left = this.binaryFn(left, token.fn, this.relational());
            }
            return left;
        },
        additive: function() {
            var left = this.multiplicative();
            var token;
            while (token = this.expect("+", "-")) {
                left = this.binaryFn(left, token.fn, this.multiplicative());
            }
            return left;
        },
        multiplicative: function() {
            var left = this.unary();
            var token;
            while (token = this.expect("*", "/", "%")) {
                left = this.binaryFn(left, token.fn, this.unary());
            }
            return left;
        },
        unary: function() {
            var token;
            if (this.expect("+")) {
                return this.primary();
            } else if (token = this.expect("-")) {
                return this.binaryFn(Parser.ZERO, token.fn, this.unary());
            } else if (token = this.expect("!")) {
                return this.unaryFn(token.fn, this.unary());
            } else {
                return this.primary();
            }
        },
        fieldAccess: function(object) {
            var expression = this.text;
            var field = this.expect().text;
            var getter = getterFn(field, this.options, expression);
            return extend(function $parseFieldAccess(scope, locals, self) {
                return getter(self || object(scope, locals));
            }, {
                assign: function(scope, value, locals) {
                    var o = object(scope, locals);
                    if (!o) object.assign(scope, o = {});
                    return setter(o, field, value, expression);
                }
            });
        },
        objectIndex: function(obj) {
            var expression = this.text;
            var indexFn = this.expression();
            this.consume("]");
            return extend(function $parseObjectIndex(self, locals) {
                var o = obj(self, locals), i = indexFn(self, locals), v;
                ensureSafeMemberName(i, expression);
                if (!o) return undefined;
                v = ensureSafeObject(o[i], expression);
                return v;
            }, {
                assign: function(self, value, locals) {
                    var key = ensureSafeMemberName(indexFn(self, locals), expression);
                    var o = ensureSafeObject(obj(self, locals), expression);
                    if (!o) obj.assign(self, o = {});
                    return o[key] = value;
                }
            });
        },
        functionCall: function(fnGetter, contextGetter) {
            var argsFn = [];
            if (this.peekToken().text !== ")") {
                do {
                    argsFn.push(this.expression());
                } while (this.expect(","));
            }
            this.consume(")");
            var expressionText = this.text;
            var args = argsFn.length ? [] : null;
            return function $parseFunctionCall(scope, locals) {
                var context = contextGetter ? contextGetter(scope, locals) : scope;
                var fn = fnGetter(scope, locals, context) || noop;
                if (args) {
                    var i = argsFn.length;
                    while (i--) {
                        args[i] = ensureSafeObject(argsFn[i](scope, locals), expressionText);
                    }
                }
                ensureSafeObject(context, expressionText);
                ensureSafeFunction(fn, expressionText);
                var v = fn.apply ? fn.apply(context, args) : fn(args[0], args[1], args[2], args[3], args[4]);
                return ensureSafeObject(v, expressionText);
            };
        },
        arrayDeclaration: function() {
            var elementFns = [];
            if (this.peekToken().text !== "]") {
                do {
                    if (this.peek("]")) {
                        break;
                    }
                    var elementFn = this.expression();
                    elementFns.push(elementFn);
                } while (this.expect(","));
            }
            this.consume("]");
            return extend(function $parseArrayLiteral(self, locals) {
                var array = [];
                for (var i = 0, ii = elementFns.length; i < ii; i++) {
                    array.push(elementFns[i](self, locals));
                }
                return array;
            }, {
                literal: true,
                constant: elementFns.every(isConstant),
                inputs: elementFns
            });
        },
        object: function() {
            var keys = [], valueFns = [];
            if (this.peekToken().text !== "}") {
                do {
                    if (this.peek("}")) {
                        break;
                    }
                    var token = this.expect();
                    keys.push(token.string || token.text);
                    this.consume(":");
                    var value = this.expression();
                    valueFns.push(value);
                } while (this.expect(","));
            }
            this.consume("}");
            return extend(function $parseObjectLiteral(self, locals) {
                var object = {};
                for (var i = 0, ii = valueFns.length; i < ii; i++) {
                    object[keys[i]] = valueFns[i](self, locals);
                }
                return object;
            }, {
                literal: true,
                constant: valueFns.every(isConstant),
                inputs: valueFns
            });
        }
    };
    function setter(obj, path, setValue, fullExp) {
        ensureSafeObject(obj, fullExp);
        var element = path.split("."), key;
        for (var i = 0; element.length > 1; i++) {
            key = ensureSafeMemberName(element.shift(), fullExp);
            var propertyObj = ensureSafeObject(obj[key], fullExp);
            if (!propertyObj) {
                propertyObj = {};
                obj[key] = propertyObj;
            }
            obj = propertyObj;
        }
        key = ensureSafeMemberName(element.shift(), fullExp);
        ensureSafeObject(obj[key], fullExp);
        obj[key] = setValue;
        return setValue;
    }
    var getterFnCache = createMap();
    function cspSafeGetterFn(key0, key1, key2, key3, key4, fullExp) {
        ensureSafeMemberName(key0, fullExp);
        ensureSafeMemberName(key1, fullExp);
        ensureSafeMemberName(key2, fullExp);
        ensureSafeMemberName(key3, fullExp);
        ensureSafeMemberName(key4, fullExp);
        return function cspSafeGetter(scope, locals) {
            var pathVal = locals && locals.hasOwnProperty(key0) ? locals : scope;
            if (pathVal == null) return pathVal;
            pathVal = pathVal[key0];
            if (!key1) return pathVal;
            if (pathVal == null) return undefined;
            pathVal = pathVal[key1];
            if (!key2) return pathVal;
            if (pathVal == null) return undefined;
            pathVal = pathVal[key2];
            if (!key3) return pathVal;
            if (pathVal == null) return undefined;
            pathVal = pathVal[key3];
            if (!key4) return pathVal;
            if (pathVal == null) return undefined;
            pathVal = pathVal[key4];
            return pathVal;
        };
    }
    function getterFn(path, options, fullExp) {
        var fn = getterFnCache[path];
        if (fn) return fn;
        var pathKeys = path.split("."), pathKeysLength = pathKeys.length;
        if (options.csp) {
            if (pathKeysLength < 6) {
                fn = cspSafeGetterFn(pathKeys[0], pathKeys[1], pathKeys[2], pathKeys[3], pathKeys[4], fullExp);
            } else {
                fn = function cspSafeGetter(scope, locals) {
                    var i = 0, val;
                    do {
                        val = cspSafeGetterFn(pathKeys[i++], pathKeys[i++], pathKeys[i++], pathKeys[i++], pathKeys[i++], fullExp)(scope, locals);
                        locals = undefined;
                        scope = val;
                    } while (i < pathKeysLength);
                    return val;
                };
            }
        } else {
            var code = "";
            forEach(pathKeys, function(key, index) {
                ensureSafeMemberName(key, fullExp);
                code += "if(s == null) return undefined;\n" + "s=" + (index ? "s" : '((l&&l.hasOwnProperty("' + key + '"))?l:s)') + "." + key + ";\n";
            });
            code += "return s;";
            var evaledFnGetter = new Function("s", "l", code);
            evaledFnGetter.toString = valueFn(code);
            fn = evaledFnGetter;
        }
        fn.sharedGetter = true;
        fn.assign = function(self, value) {
            return setter(self, path, value, path);
        };
        getterFnCache[path] = fn;
        return fn;
    }
    var objectValueOf = Object.prototype.valueOf;
    function getValueOf(value) {
        return isFunction(value.valueOf) ? value.valueOf() : objectValueOf.call(value);
    }
    function $ParseProvider() {
        var cache = createMap();
        var $parseOptions = {
            csp: false
        };
        this.$get = [ "$filter", "$sniffer", function($filter, $sniffer) {
            $parseOptions.csp = $sniffer.csp;
            function wrapSharedExpression(exp) {
                var wrapped = exp;
                if (exp.sharedGetter) {
                    wrapped = function $parseWrapper(self, locals) {
                        return exp(self, locals);
                    };
                    wrapped.literal = exp.literal;
                    wrapped.constant = exp.constant;
                    wrapped.assign = exp.assign;
                }
                return wrapped;
            }
            return function $parse(exp, interceptorFn) {
                var parsedExpression, oneTime, cacheKey;
                switch (typeof exp) {
                  case "string":
                    cacheKey = exp = exp.trim();
                    parsedExpression = cache[cacheKey];
                    if (!parsedExpression) {
                        if (exp.charAt(0) === ":" && exp.charAt(1) === ":") {
                            oneTime = true;
                            exp = exp.substring(2);
                        }
                        var lexer = new Lexer($parseOptions);
                        var parser = new Parser(lexer, $filter, $parseOptions);
                        parsedExpression = parser.parse(exp);
                        if (parsedExpression.constant) {
                            parsedExpression.$$watchDelegate = constantWatchDelegate;
                        } else if (oneTime) {
                            parsedExpression = wrapSharedExpression(parsedExpression);
                            parsedExpression.$$watchDelegate = parsedExpression.literal ? oneTimeLiteralWatchDelegate : oneTimeWatchDelegate;
                        } else if (parsedExpression.inputs) {
                            parsedExpression.$$watchDelegate = inputsWatchDelegate;
                        }
                        cache[cacheKey] = parsedExpression;
                    }
                    return addInterceptor(parsedExpression, interceptorFn);

                  case "function":
                    return addInterceptor(exp, interceptorFn);

                  default:
                    return addInterceptor(noop, interceptorFn);
                }
            };
            function collectExpressionInputs(inputs, list) {
                for (var i = 0, ii = inputs.length; i < ii; i++) {
                    var input = inputs[i];
                    if (!input.constant) {
                        if (input.inputs) {
                            collectExpressionInputs(input.inputs, list);
                        } else if (list.indexOf(input) === -1) {
                            list.push(input);
                        }
                    }
                }
                return list;
            }
            function expressionInputDirtyCheck(newValue, oldValueOfValue) {
                if (newValue == null || oldValueOfValue == null) {
                    return newValue === oldValueOfValue;
                }
                if (typeof newValue === "object") {
                    newValue = getValueOf(newValue);
                    if (typeof newValue === "object") {
                        return false;
                    }
                }
                return newValue === oldValueOfValue || newValue !== newValue && oldValueOfValue !== oldValueOfValue;
            }
            function inputsWatchDelegate(scope, listener, objectEquality, parsedExpression) {
                var inputExpressions = parsedExpression.$$inputs || (parsedExpression.$$inputs = collectExpressionInputs(parsedExpression.inputs, []));
                var lastResult;
                if (inputExpressions.length === 1) {
                    var oldInputValue = expressionInputDirtyCheck;
                    inputExpressions = inputExpressions[0];
                    return scope.$watch(function expressionInputWatch(scope) {
                        var newInputValue = inputExpressions(scope);
                        if (!expressionInputDirtyCheck(newInputValue, oldInputValue)) {
                            lastResult = parsedExpression(scope);
                            oldInputValue = newInputValue && getValueOf(newInputValue);
                        }
                        return lastResult;
                    }, listener, objectEquality);
                }
                var oldInputValueOfValues = [];
                for (var i = 0, ii = inputExpressions.length; i < ii; i++) {
                    oldInputValueOfValues[i] = expressionInputDirtyCheck;
                }
                return scope.$watch(function expressionInputsWatch(scope) {
                    var changed = false;
                    for (var i = 0, ii = inputExpressions.length; i < ii; i++) {
                        var newInputValue = inputExpressions[i](scope);
                        if (changed || (changed = !expressionInputDirtyCheck(newInputValue, oldInputValueOfValues[i]))) {
                            oldInputValueOfValues[i] = newInputValue && getValueOf(newInputValue);
                        }
                    }
                    if (changed) {
                        lastResult = parsedExpression(scope);
                    }
                    return lastResult;
                }, listener, objectEquality);
            }
            function oneTimeWatchDelegate(scope, listener, objectEquality, parsedExpression) {
                var unwatch, lastValue;
                return unwatch = scope.$watch(function oneTimeWatch(scope) {
                    return parsedExpression(scope);
                }, function oneTimeListener(value, old, scope) {
                    lastValue = value;
                    if (isFunction(listener)) {
                        listener.apply(this, arguments);
                    }
                    if (isDefined(value)) {
                        scope.$$postDigest(function() {
                            if (isDefined(lastValue)) {
                                unwatch();
                            }
                        });
                    }
                }, objectEquality);
            }
            function oneTimeLiteralWatchDelegate(scope, listener, objectEquality, parsedExpression) {
                var unwatch, lastValue;
                return unwatch = scope.$watch(function oneTimeWatch(scope) {
                    return parsedExpression(scope);
                }, function oneTimeListener(value, old, scope) {
                    lastValue = value;
                    if (isFunction(listener)) {
                        listener.call(this, value, old, scope);
                    }
                    if (isAllDefined(value)) {
                        scope.$$postDigest(function() {
                            if (isAllDefined(lastValue)) unwatch();
                        });
                    }
                }, objectEquality);
                function isAllDefined(value) {
                    var allDefined = true;
                    forEach(value, function(val) {
                        if (!isDefined(val)) allDefined = false;
                    });
                    return allDefined;
                }
            }
            function constantWatchDelegate(scope, listener, objectEquality, parsedExpression) {
                var unwatch;
                return unwatch = scope.$watch(function constantWatch(scope) {
                    return parsedExpression(scope);
                }, function constantListener(value, old, scope) {
                    if (isFunction(listener)) {
                        listener.apply(this, arguments);
                    }
                    unwatch();
                }, objectEquality);
            }
            function addInterceptor(parsedExpression, interceptorFn) {
                if (!interceptorFn) return parsedExpression;
                var fn = function interceptedExpression(scope, locals) {
                    var value = parsedExpression(scope, locals);
                    var result = interceptorFn(value, scope, locals);
                    return isDefined(value) ? result : value;
                };
                if (parsedExpression.$$watchDelegate && parsedExpression.$$watchDelegate !== inputsWatchDelegate) {
                    fn.$$watchDelegate = parsedExpression.$$watchDelegate;
                } else if (!interceptorFn.$stateful) {
                    fn.$$watchDelegate = inputsWatchDelegate;
                    fn.inputs = [ parsedExpression ];
                }
                return fn;
            }
        } ];
    }
    function $QProvider() {
        this.$get = [ "$rootScope", "$exceptionHandler", function($rootScope, $exceptionHandler) {
            return qFactory(function(callback) {
                $rootScope.$evalAsync(callback);
            }, $exceptionHandler);
        } ];
    }
    function $$QProvider() {
        this.$get = [ "$browser", "$exceptionHandler", function($browser, $exceptionHandler) {
            return qFactory(function(callback) {
                $browser.defer(callback);
            }, $exceptionHandler);
        } ];
    }
    function qFactory(nextTick, exceptionHandler) {
        var $qMinErr = minErr("$q", TypeError);
        function callOnce(self, resolveFn, rejectFn) {
            var called = false;
            function wrap(fn) {
                return function(value) {
                    if (called) return;
                    called = true;
                    fn.call(self, value);
                };
            }
            return [ wrap(resolveFn), wrap(rejectFn) ];
        }
        var defer = function() {
            return new Deferred();
        };
        function Promise() {
            this.$$state = {
                status: 0
            };
        }
        Promise.prototype = {
            then: function(onFulfilled, onRejected, progressBack) {
                var result = new Deferred();
                this.$$state.pending = this.$$state.pending || [];
                this.$$state.pending.push([ result, onFulfilled, onRejected, progressBack ]);
                if (this.$$state.status > 0) scheduleProcessQueue(this.$$state);
                return result.promise;
            },
            "catch": function(callback) {
                return this.then(null, callback);
            },
            "finally": function(callback, progressBack) {
                return this.then(function(value) {
                    return handleCallback(value, true, callback);
                }, function(error) {
                    return handleCallback(error, false, callback);
                }, progressBack);
            }
        };
        function simpleBind(context, fn) {
            return function(value) {
                fn.call(context, value);
            };
        }
        function processQueue(state) {
            var fn, promise, pending;
            pending = state.pending;
            state.processScheduled = false;
            state.pending = undefined;
            for (var i = 0, ii = pending.length; i < ii; ++i) {
                promise = pending[i][0];
                fn = pending[i][state.status];
                try {
                    if (isFunction(fn)) {
                        promise.resolve(fn(state.value));
                    } else if (state.status === 1) {
                        promise.resolve(state.value);
                    } else {
                        promise.reject(state.value);
                    }
                } catch (e) {
                    promise.reject(e);
                    exceptionHandler(e);
                }
            }
        }
        function scheduleProcessQueue(state) {
            if (state.processScheduled || !state.pending) return;
            state.processScheduled = true;
            nextTick(function() {
                processQueue(state);
            });
        }
        function Deferred() {
            this.promise = new Promise();
            this.resolve = simpleBind(this, this.resolve);
            this.reject = simpleBind(this, this.reject);
            this.notify = simpleBind(this, this.notify);
        }
        Deferred.prototype = {
            resolve: function(val) {
                if (this.promise.$$state.status) return;
                if (val === this.promise) {
                    this.$$reject($qMinErr("qcycle", "Expected promise to be resolved with value other than itself '{0}'", val));
                } else {
                    this.$$resolve(val);
                }
            },
            $$resolve: function(val) {
                var then, fns;
                fns = callOnce(this, this.$$resolve, this.$$reject);
                try {
                    if (isObject(val) || isFunction(val)) then = val && val.then;
                    if (isFunction(then)) {
                        this.promise.$$state.status = -1;
                        then.call(val, fns[0], fns[1], this.notify);
                    } else {
                        this.promise.$$state.value = val;
                        this.promise.$$state.status = 1;
                        scheduleProcessQueue(this.promise.$$state);
                    }
                } catch (e) {
                    fns[1](e);
                    exceptionHandler(e);
                }
            },
            reject: function(reason) {
                if (this.promise.$$state.status) return;
                this.$$reject(reason);
            },
            $$reject: function(reason) {
                this.promise.$$state.value = reason;
                this.promise.$$state.status = 2;
                scheduleProcessQueue(this.promise.$$state);
            },
            notify: function(progress) {
                var callbacks = this.promise.$$state.pending;
                if (this.promise.$$state.status <= 0 && callbacks && callbacks.length) {
                    nextTick(function() {
                        var callback, result;
                        for (var i = 0, ii = callbacks.length; i < ii; i++) {
                            result = callbacks[i][0];
                            callback = callbacks[i][3];
                            try {
                                result.notify(isFunction(callback) ? callback(progress) : progress);
                            } catch (e) {
                                exceptionHandler(e);
                            }
                        }
                    });
                }
            }
        };
        var reject = function(reason) {
            var result = new Deferred();
            result.reject(reason);
            return result.promise;
        };
        var makePromise = function makePromise(value, resolved) {
            var result = new Deferred();
            if (resolved) {
                result.resolve(value);
            } else {
                result.reject(value);
            }
            return result.promise;
        };
        var handleCallback = function handleCallback(value, isResolved, callback) {
            var callbackOutput = null;
            try {
                if (isFunction(callback)) callbackOutput = callback();
            } catch (e) {
                return makePromise(e, false);
            }
            if (isPromiseLike(callbackOutput)) {
                return callbackOutput.then(function() {
                    return makePromise(value, isResolved);
                }, function(error) {
                    return makePromise(error, false);
                });
            } else {
                return makePromise(value, isResolved);
            }
        };
        var when = function(value, callback, errback, progressBack) {
            var result = new Deferred();
            result.resolve(value);
            return result.promise.then(callback, errback, progressBack);
        };
        function all(promises) {
            var deferred = new Deferred(), counter = 0, results = isArray(promises) ? [] : {};
            forEach(promises, function(promise, key) {
                counter++;
                when(promise).then(function(value) {
                    if (results.hasOwnProperty(key)) return;
                    results[key] = value;
                    if (!--counter) deferred.resolve(results);
                }, function(reason) {
                    if (results.hasOwnProperty(key)) return;
                    deferred.reject(reason);
                });
            });
            if (counter === 0) {
                deferred.resolve(results);
            }
            return deferred.promise;
        }
        var $Q = function Q(resolver) {
            if (!isFunction(resolver)) {
                throw $qMinErr("norslvr", "Expected resolverFn, got '{0}'", resolver);
            }
            if (!(this instanceof Q)) {
                return new Q(resolver);
            }
            var deferred = new Deferred();
            function resolveFn(value) {
                deferred.resolve(value);
            }
            function rejectFn(reason) {
                deferred.reject(reason);
            }
            resolver(resolveFn, rejectFn);
            return deferred.promise;
        };
        $Q.defer = defer;
        $Q.reject = reject;
        $Q.when = when;
        $Q.all = all;
        return $Q;
    }
    function $$RAFProvider() {
        this.$get = [ "$window", "$timeout", function($window, $timeout) {
            var requestAnimationFrame = $window.requestAnimationFrame || $window.webkitRequestAnimationFrame || $window.mozRequestAnimationFrame;
            var cancelAnimationFrame = $window.cancelAnimationFrame || $window.webkitCancelAnimationFrame || $window.mozCancelAnimationFrame || $window.webkitCancelRequestAnimationFrame;
            var rafSupported = !!requestAnimationFrame;
            var raf = rafSupported ? function(fn) {
                var id = requestAnimationFrame(fn);
                return function() {
                    cancelAnimationFrame(id);
                };
            } : function(fn) {
                var timer = $timeout(fn, 16.66, false);
                return function() {
                    $timeout.cancel(timer);
                };
            };
            raf.supported = rafSupported;
            return raf;
        } ];
    }
    function $RootScopeProvider() {
        var TTL = 10;
        var $rootScopeMinErr = minErr("$rootScope");
        var lastDirtyWatch = null;
        var applyAsyncId = null;
        this.digestTtl = function(value) {
            if (arguments.length) {
                TTL = value;
            }
            return TTL;
        };
        this.$get = [ "$injector", "$exceptionHandler", "$parse", "$browser", function($injector, $exceptionHandler, $parse, $browser) {
            function Scope() {
                this.$id = nextUid();
                this.$$phase = this.$parent = this.$$watchers = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null;
                this.$root = this;
                this.$$destroyed = false;
                this.$$listeners = {};
                this.$$listenerCount = {};
                this.$$isolateBindings = null;
            }
            Scope.prototype = {
                constructor: Scope,
                $new: function(isolate, parent) {
                    var child;
                    parent = parent || this;
                    if (isolate) {
                        child = new Scope();
                        child.$root = this.$root;
                    } else {
                        if (!this.$$ChildScope) {
                            this.$$ChildScope = function ChildScope() {
                                this.$$watchers = this.$$nextSibling = this.$$childHead = this.$$childTail = null;
                                this.$$listeners = {};
                                this.$$listenerCount = {};
                                this.$id = nextUid();
                                this.$$ChildScope = null;
                            };
                            this.$$ChildScope.prototype = this;
                        }
                        child = new this.$$ChildScope();
                    }
                    child.$parent = parent;
                    child.$$prevSibling = parent.$$childTail;
                    if (parent.$$childHead) {
                        parent.$$childTail.$$nextSibling = child;
                        parent.$$childTail = child;
                    } else {
                        parent.$$childHead = parent.$$childTail = child;
                    }
                    if (isolate || parent != this) child.$on("$destroy", destroyChild);
                    return child;
                    function destroyChild() {
                        child.$$destroyed = true;
                    }
                },
                $watch: function(watchExp, listener, objectEquality) {
                    var get = $parse(watchExp);
                    if (get.$$watchDelegate) {
                        return get.$$watchDelegate(this, listener, objectEquality, get);
                    }
                    var scope = this, array = scope.$$watchers, watcher = {
                        fn: listener,
                        last: initWatchVal,
                        get: get,
                        exp: watchExp,
                        eq: !!objectEquality
                    };
                    lastDirtyWatch = null;
                    if (!isFunction(listener)) {
                        watcher.fn = noop;
                    }
                    if (!array) {
                        array = scope.$$watchers = [];
                    }
                    array.unshift(watcher);
                    return function deregisterWatch() {
                        arrayRemove(array, watcher);
                        lastDirtyWatch = null;
                    };
                },
                $watchGroup: function(watchExpressions, listener) {
                    var oldValues = new Array(watchExpressions.length);
                    var newValues = new Array(watchExpressions.length);
                    var deregisterFns = [];
                    var self = this;
                    var changeReactionScheduled = false;
                    var firstRun = true;
                    if (!watchExpressions.length) {
                        var shouldCall = true;
                        self.$evalAsync(function() {
                            if (shouldCall) listener(newValues, newValues, self);
                        });
                        return function deregisterWatchGroup() {
                            shouldCall = false;
                        };
                    }
                    if (watchExpressions.length === 1) {
                        return this.$watch(watchExpressions[0], function watchGroupAction(value, oldValue, scope) {
                            newValues[0] = value;
                            oldValues[0] = oldValue;
                            listener(newValues, value === oldValue ? newValues : oldValues, scope);
                        });
                    }
                    forEach(watchExpressions, function(expr, i) {
                        var unwatchFn = self.$watch(expr, function watchGroupSubAction(value, oldValue) {
                            newValues[i] = value;
                            oldValues[i] = oldValue;
                            if (!changeReactionScheduled) {
                                changeReactionScheduled = true;
                                self.$evalAsync(watchGroupAction);
                            }
                        });
                        deregisterFns.push(unwatchFn);
                    });
                    function watchGroupAction() {
                        changeReactionScheduled = false;
                        if (firstRun) {
                            firstRun = false;
                            listener(newValues, newValues, self);
                        } else {
                            listener(newValues, oldValues, self);
                        }
                    }
                    return function deregisterWatchGroup() {
                        while (deregisterFns.length) {
                            deregisterFns.shift()();
                        }
                    };
                },
                $watchCollection: function(obj, listener) {
                    $watchCollectionInterceptor.$stateful = true;
                    var self = this;
                    var newValue;
                    var oldValue;
                    var veryOldValue;
                    var trackVeryOldValue = listener.length > 1;
                    var changeDetected = 0;
                    var changeDetector = $parse(obj, $watchCollectionInterceptor);
                    var internalArray = [];
                    var internalObject = {};
                    var initRun = true;
                    var oldLength = 0;
                    function $watchCollectionInterceptor(_value) {
                        newValue = _value;
                        var newLength, key, bothNaN, newItem, oldItem;
                        if (!isObject(newValue)) {
                            if (oldValue !== newValue) {
                                oldValue = newValue;
                                changeDetected++;
                            }
                        } else if (isArrayLike(newValue)) {
                            if (oldValue !== internalArray) {
                                oldValue = internalArray;
                                oldLength = oldValue.length = 0;
                                changeDetected++;
                            }
                            newLength = newValue.length;
                            if (oldLength !== newLength) {
                                changeDetected++;
                                oldValue.length = oldLength = newLength;
                            }
                            for (var i = 0; i < newLength; i++) {
                                oldItem = oldValue[i];
                                newItem = newValue[i];
                                bothNaN = oldItem !== oldItem && newItem !== newItem;
                                if (!bothNaN && oldItem !== newItem) {
                                    changeDetected++;
                                    oldValue[i] = newItem;
                                }
                            }
                        } else {
                            if (oldValue !== internalObject) {
                                oldValue = internalObject = {};
                                oldLength = 0;
                                changeDetected++;
                            }
                            newLength = 0;
                            for (key in newValue) {
                                if (newValue.hasOwnProperty(key)) {
                                    newLength++;
                                    newItem = newValue[key];
                                    oldItem = oldValue[key];
                                    if (key in oldValue) {
                                        bothNaN = oldItem !== oldItem && newItem !== newItem;
                                        if (!bothNaN && oldItem !== newItem) {
                                            changeDetected++;
                                            oldValue[key] = newItem;
                                        }
                                    } else {
                                        oldLength++;
                                        oldValue[key] = newItem;
                                        changeDetected++;
                                    }
                                }
                            }
                            if (oldLength > newLength) {
                                changeDetected++;
                                for (key in oldValue) {
                                    if (!newValue.hasOwnProperty(key)) {
                                        oldLength--;
                                        delete oldValue[key];
                                    }
                                }
                            }
                        }
                        return changeDetected;
                    }
                    function $watchCollectionAction() {
                        if (initRun) {
                            initRun = false;
                            listener(newValue, newValue, self);
                        } else {
                            listener(newValue, veryOldValue, self);
                        }
                        if (trackVeryOldValue) {
                            if (!isObject(newValue)) {
                                veryOldValue = newValue;
                            } else if (isArrayLike(newValue)) {
                                veryOldValue = new Array(newValue.length);
                                for (var i = 0; i < newValue.length; i++) {
                                    veryOldValue[i] = newValue[i];
                                }
                            } else {
                                veryOldValue = {};
                                for (var key in newValue) {
                                    if (hasOwnProperty.call(newValue, key)) {
                                        veryOldValue[key] = newValue[key];
                                    }
                                }
                            }
                        }
                    }
                    return this.$watch(changeDetector, $watchCollectionAction);
                },
                $digest: function() {
                    var watch, value, last, watchers, length, dirty, ttl = TTL, next, current, target = this, watchLog = [], logIdx, logMsg, asyncTask;
                    beginPhase("$digest");
                    $browser.$$checkUrlChange();
                    if (this === $rootScope && applyAsyncId !== null) {
                        $browser.defer.cancel(applyAsyncId);
                        flushApplyAsync();
                    }
                    lastDirtyWatch = null;
                    do {
                        dirty = false;
                        current = target;
                        while (asyncQueue.length) {
                            try {
                                asyncTask = asyncQueue.shift();
                                asyncTask.scope.$eval(asyncTask.expression);
                            } catch (e) {
                                $exceptionHandler(e);
                            }
                            lastDirtyWatch = null;
                        }
                        traverseScopesLoop: do {
                            if (watchers = current.$$watchers) {
                                length = watchers.length;
                                while (length--) {
                                    try {
                                        watch = watchers[length];
                                        if (watch) {
                                            if ((value = watch.get(current)) !== (last = watch.last) && !(watch.eq ? equals(value, last) : typeof value === "number" && typeof last === "number" && isNaN(value) && isNaN(last))) {
                                                dirty = true;
                                                lastDirtyWatch = watch;
                                                watch.last = watch.eq ? copy(value, null) : value;
                                                watch.fn(value, last === initWatchVal ? value : last, current);
                                                if (ttl < 5) {
                                                    logIdx = 4 - ttl;
                                                    if (!watchLog[logIdx]) watchLog[logIdx] = [];
                                                    logMsg = isFunction(watch.exp) ? "fn: " + (watch.exp.name || watch.exp.toString()) : watch.exp;
                                                    logMsg += "; newVal: " + toJson(value) + "; oldVal: " + toJson(last);
                                                    watchLog[logIdx].push(logMsg);
                                                }
                                            } else if (watch === lastDirtyWatch) {
                                                dirty = false;
                                                break traverseScopesLoop;
                                            }
                                        }
                                    } catch (e) {
                                        $exceptionHandler(e);
                                    }
                                }
                            }
                            if (!(next = current.$$childHead || current !== target && current.$$nextSibling)) {
                                while (current !== target && !(next = current.$$nextSibling)) {
                                    current = current.$parent;
                                }
                            }
                        } while (current = next);
                        if ((dirty || asyncQueue.length) && !ttl--) {
                            clearPhase();
                            throw $rootScopeMinErr("infdig", "{0} $digest() iterations reached. Aborting!\n" + "Watchers fired in the last 5 iterations: {1}", TTL, toJson(watchLog));
                        }
                    } while (dirty || asyncQueue.length);
                    clearPhase();
                    while (postDigestQueue.length) {
                        try {
                            postDigestQueue.shift()();
                        } catch (e) {
                            $exceptionHandler(e);
                        }
                    }
                },
                $destroy: function() {
                    if (this.$$destroyed) return;
                    var parent = this.$parent;
                    this.$broadcast("$destroy");
                    this.$$destroyed = true;
                    if (this === $rootScope) return;
                    for (var eventName in this.$$listenerCount) {
                        decrementListenerCount(this, this.$$listenerCount[eventName], eventName);
                    }
                    if (parent.$$childHead == this) parent.$$childHead = this.$$nextSibling;
                    if (parent.$$childTail == this) parent.$$childTail = this.$$prevSibling;
                    if (this.$$prevSibling) this.$$prevSibling.$$nextSibling = this.$$nextSibling;
                    if (this.$$nextSibling) this.$$nextSibling.$$prevSibling = this.$$prevSibling;
                    this.$destroy = this.$digest = this.$apply = this.$evalAsync = this.$applyAsync = noop;
                    this.$on = this.$watch = this.$watchGroup = function() {
                        return noop;
                    };
                    this.$$listeners = {};
                    this.$parent = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = this.$root = this.$$watchers = null;
                },
                $eval: function(expr, locals) {
                    return $parse(expr)(this, locals);
                },
                $evalAsync: function(expr) {
                    if (!$rootScope.$$phase && !asyncQueue.length) {
                        $browser.defer(function() {
                            if (asyncQueue.length) {
                                $rootScope.$digest();
                            }
                        });
                    }
                    asyncQueue.push({
                        scope: this,
                        expression: expr
                    });
                },
                $$postDigest: function(fn) {
                    postDigestQueue.push(fn);
                },
                $apply: function(expr) {
                    try {
                        beginPhase("$apply");
                        return this.$eval(expr);
                    } catch (e) {
                        $exceptionHandler(e);
                    } finally {
                        clearPhase();
                        try {
                            $rootScope.$digest();
                        } catch (e) {
                            $exceptionHandler(e);
                            throw e;
                        }
                    }
                },
                $applyAsync: function(expr) {
                    var scope = this;
                    expr && applyAsyncQueue.push($applyAsyncExpression);
                    scheduleApplyAsync();
                    function $applyAsyncExpression() {
                        scope.$eval(expr);
                    }
                },
                $on: function(name, listener) {
                    var namedListeners = this.$$listeners[name];
                    if (!namedListeners) {
                        this.$$listeners[name] = namedListeners = [];
                    }
                    namedListeners.push(listener);
                    var current = this;
                    do {
                        if (!current.$$listenerCount[name]) {
                            current.$$listenerCount[name] = 0;
                        }
                        current.$$listenerCount[name]++;
                    } while (current = current.$parent);
                    var self = this;
                    return function() {
                        var indexOfListener = namedListeners.indexOf(listener);
                        if (indexOfListener !== -1) {
                            namedListeners[indexOfListener] = null;
                            decrementListenerCount(self, 1, name);
                        }
                    };
                },
                $emit: function(name, args) {
                    var empty = [], namedListeners, scope = this, stopPropagation = false, event = {
                        name: name,
                        targetScope: scope,
                        stopPropagation: function() {
                            stopPropagation = true;
                        },
                        preventDefault: function() {
                            event.defaultPrevented = true;
                        },
                        defaultPrevented: false
                    }, listenerArgs = concat([ event ], arguments, 1), i, length;
                    do {
                        namedListeners = scope.$$listeners[name] || empty;
                        event.currentScope = scope;
                        for (i = 0, length = namedListeners.length; i < length; i++) {
                            if (!namedListeners[i]) {
                                namedListeners.splice(i, 1);
                                i--;
                                length--;
                                continue;
                            }
                            try {
                                namedListeners[i].apply(null, listenerArgs);
                            } catch (e) {
                                $exceptionHandler(e);
                            }
                        }
                        if (stopPropagation) {
                            event.currentScope = null;
                            return event;
                        }
                        scope = scope.$parent;
                    } while (scope);
                    event.currentScope = null;
                    return event;
                },
                $broadcast: function(name, args) {
                    var target = this, current = target, next = target, event = {
                        name: name,
                        targetScope: target,
                        preventDefault: function() {
                            event.defaultPrevented = true;
                        },
                        defaultPrevented: false
                    };
                    if (!target.$$listenerCount[name]) return event;
                    var listenerArgs = concat([ event ], arguments, 1), listeners, i, length;
                    while (current = next) {
                        event.currentScope = current;
                        listeners = current.$$listeners[name] || [];
                        for (i = 0, length = listeners.length; i < length; i++) {
                            if (!listeners[i]) {
                                listeners.splice(i, 1);
                                i--;
                                length--;
                                continue;
                            }
                            try {
                                listeners[i].apply(null, listenerArgs);
                            } catch (e) {
                                $exceptionHandler(e);
                            }
                        }
                        if (!(next = current.$$listenerCount[name] && current.$$childHead || current !== target && current.$$nextSibling)) {
                            while (current !== target && !(next = current.$$nextSibling)) {
                                current = current.$parent;
                            }
                        }
                    }
                    event.currentScope = null;
                    return event;
                }
            };
            var $rootScope = new Scope();
            var asyncQueue = $rootScope.$$asyncQueue = [];
            var postDigestQueue = $rootScope.$$postDigestQueue = [];
            var applyAsyncQueue = $rootScope.$$applyAsyncQueue = [];
            return $rootScope;
            function beginPhase(phase) {
                if ($rootScope.$$phase) {
                    throw $rootScopeMinErr("inprog", "{0} already in progress", $rootScope.$$phase);
                }
                $rootScope.$$phase = phase;
            }
            function clearPhase() {
                $rootScope.$$phase = null;
            }
            function decrementListenerCount(current, count, name) {
                do {
                    current.$$listenerCount[name] -= count;
                    if (current.$$listenerCount[name] === 0) {
                        delete current.$$listenerCount[name];
                    }
                } while (current = current.$parent);
            }
            function initWatchVal() {}
            function flushApplyAsync() {
                while (applyAsyncQueue.length) {
                    try {
                        applyAsyncQueue.shift()();
                    } catch (e) {
                        $exceptionHandler(e);
                    }
                }
                applyAsyncId = null;
            }
            function scheduleApplyAsync() {
                if (applyAsyncId === null) {
                    applyAsyncId = $browser.defer(function() {
                        $rootScope.$apply(flushApplyAsync);
                    });
                }
            }
        } ];
    }
    function $$SanitizeUriProvider() {
        var aHrefSanitizationWhitelist = /^\s*(https?|ftp|mailto|tel|file):/, imgSrcSanitizationWhitelist = /^\s*((https?|ftp|file|blob):|data:image\/)/;
        this.aHrefSanitizationWhitelist = function(regexp) {
            if (isDefined(regexp)) {
                aHrefSanitizationWhitelist = regexp;
                return this;
            }
            return aHrefSanitizationWhitelist;
        };
        this.imgSrcSanitizationWhitelist = function(regexp) {
            if (isDefined(regexp)) {
                imgSrcSanitizationWhitelist = regexp;
                return this;
            }
            return imgSrcSanitizationWhitelist;
        };
        this.$get = function() {
            return function sanitizeUri(uri, isImage) {
                var regex = isImage ? imgSrcSanitizationWhitelist : aHrefSanitizationWhitelist;
                var normalizedVal;
                normalizedVal = urlResolve(uri).href;
                if (normalizedVal !== "" && !normalizedVal.match(regex)) {
                    return "unsafe:" + normalizedVal;
                }
                return uri;
            };
        };
    }
    var $sceMinErr = minErr("$sce");
    var SCE_CONTEXTS = {
        HTML: "html",
        CSS: "css",
        URL: "url",
        RESOURCE_URL: "resourceUrl",
        JS: "js"
    };
    function adjustMatcher(matcher) {
        if (matcher === "self") {
            return matcher;
        } else if (isString(matcher)) {
            if (matcher.indexOf("***") > -1) {
                throw $sceMinErr("iwcard", "Illegal sequence *** in string matcher.  String: {0}", matcher);
            }
            matcher = escapeForRegexp(matcher).replace("\\*\\*", ".*").replace("\\*", "[^:/.?&;]*");
            return new RegExp("^" + matcher + "$");
        } else if (isRegExp(matcher)) {
            return new RegExp("^" + matcher.source + "$");
        } else {
            throw $sceMinErr("imatcher", 'Matchers may only be "self", string patterns or RegExp objects');
        }
    }
    function adjustMatchers(matchers) {
        var adjustedMatchers = [];
        if (isDefined(matchers)) {
            forEach(matchers, function(matcher) {
                adjustedMatchers.push(adjustMatcher(matcher));
            });
        }
        return adjustedMatchers;
    }
    function $SceDelegateProvider() {
        this.SCE_CONTEXTS = SCE_CONTEXTS;
        var resourceUrlWhitelist = [ "self" ], resourceUrlBlacklist = [];
        this.resourceUrlWhitelist = function(value) {
            if (arguments.length) {
                resourceUrlWhitelist = adjustMatchers(value);
            }
            return resourceUrlWhitelist;
        };
        this.resourceUrlBlacklist = function(value) {
            if (arguments.length) {
                resourceUrlBlacklist = adjustMatchers(value);
            }
            return resourceUrlBlacklist;
        };
        this.$get = [ "$injector", function($injector) {
            var htmlSanitizer = function htmlSanitizer(html) {
                throw $sceMinErr("unsafe", "Attempting to use an unsafe value in a safe context.");
            };
            if ($injector.has("$sanitize")) {
                htmlSanitizer = $injector.get("$sanitize");
            }
            function matchUrl(matcher, parsedUrl) {
                if (matcher === "self") {
                    return urlIsSameOrigin(parsedUrl);
                } else {
                    return !!matcher.exec(parsedUrl.href);
                }
            }
            function isResourceUrlAllowedByPolicy(url) {
                var parsedUrl = urlResolve(url.toString());
                var i, n, allowed = false;
                for (i = 0, n = resourceUrlWhitelist.length; i < n; i++) {
                    if (matchUrl(resourceUrlWhitelist[i], parsedUrl)) {
                        allowed = true;
                        break;
                    }
                }
                if (allowed) {
                    for (i = 0, n = resourceUrlBlacklist.length; i < n; i++) {
                        if (matchUrl(resourceUrlBlacklist[i], parsedUrl)) {
                            allowed = false;
                            break;
                        }
                    }
                }
                return allowed;
            }
            function generateHolderType(Base) {
                var holderType = function TrustedValueHolderType(trustedValue) {
                    this.$$unwrapTrustedValue = function() {
                        return trustedValue;
                    };
                };
                if (Base) {
                    holderType.prototype = new Base();
                }
                holderType.prototype.valueOf = function sceValueOf() {
                    return this.$$unwrapTrustedValue();
                };
                holderType.prototype.toString = function sceToString() {
                    return this.$$unwrapTrustedValue().toString();
                };
                return holderType;
            }
            var trustedValueHolderBase = generateHolderType(), byType = {};
            byType[SCE_CONTEXTS.HTML] = generateHolderType(trustedValueHolderBase);
            byType[SCE_CONTEXTS.CSS] = generateHolderType(trustedValueHolderBase);
            byType[SCE_CONTEXTS.URL] = generateHolderType(trustedValueHolderBase);
            byType[SCE_CONTEXTS.JS] = generateHolderType(trustedValueHolderBase);
            byType[SCE_CONTEXTS.RESOURCE_URL] = generateHolderType(byType[SCE_CONTEXTS.URL]);
            function trustAs(type, trustedValue) {
                var Constructor = byType.hasOwnProperty(type) ? byType[type] : null;
                if (!Constructor) {
                    throw $sceMinErr("icontext", "Attempted to trust a value in invalid context. Context: {0}; Value: {1}", type, trustedValue);
                }
                if (trustedValue === null || trustedValue === undefined || trustedValue === "") {
                    return trustedValue;
                }
                if (typeof trustedValue !== "string") {
                    throw $sceMinErr("itype", "Attempted to trust a non-string value in a content requiring a string: Context: {0}", type);
                }
                return new Constructor(trustedValue);
            }
            function valueOf(maybeTrusted) {
                if (maybeTrusted instanceof trustedValueHolderBase) {
                    return maybeTrusted.$$unwrapTrustedValue();
                } else {
                    return maybeTrusted;
                }
            }
            function getTrusted(type, maybeTrusted) {
                if (maybeTrusted === null || maybeTrusted === undefined || maybeTrusted === "") {
                    return maybeTrusted;
                }
                var constructor = byType.hasOwnProperty(type) ? byType[type] : null;
                if (constructor && maybeTrusted instanceof constructor) {
                    return maybeTrusted.$$unwrapTrustedValue();
                }
                if (type === SCE_CONTEXTS.RESOURCE_URL) {
                    if (isResourceUrlAllowedByPolicy(maybeTrusted)) {
                        return maybeTrusted;
                    } else {
                        throw $sceMinErr("insecurl", "Blocked loading resource from url not allowed by $sceDelegate policy.  URL: {0}", maybeTrusted.toString());
                    }
                } else if (type === SCE_CONTEXTS.HTML) {
                    return htmlSanitizer(maybeTrusted);
                }
                throw $sceMinErr("unsafe", "Attempting to use an unsafe value in a safe context.");
            }
            return {
                trustAs: trustAs,
                getTrusted: getTrusted,
                valueOf: valueOf
            };
        } ];
    }
    function $SceProvider() {
        var enabled = true;
        this.enabled = function(value) {
            if (arguments.length) {
                enabled = !!value;
            }
            return enabled;
        };
        this.$get = [ "$parse", "$sceDelegate", function($parse, $sceDelegate) {
            if (enabled && msie < 8) {
                throw $sceMinErr("iequirks", "Strict Contextual Escaping does not support Internet Explorer version < 11 in quirks " + "mode.  You can fix this by adding the text <!doctype html> to the top of your HTML " + "document.  See http://docs.angularjs.org/api/ng.$sce for more information.");
            }
            var sce = shallowCopy(SCE_CONTEXTS);
            sce.isEnabled = function() {
                return enabled;
            };
            sce.trustAs = $sceDelegate.trustAs;
            sce.getTrusted = $sceDelegate.getTrusted;
            sce.valueOf = $sceDelegate.valueOf;
            if (!enabled) {
                sce.trustAs = sce.getTrusted = function(type, value) {
                    return value;
                };
                sce.valueOf = identity;
            }
            sce.parseAs = function sceParseAs(type, expr) {
                var parsed = $parse(expr);
                if (parsed.literal && parsed.constant) {
                    return parsed;
                } else {
                    return $parse(expr, function(value) {
                        return sce.getTrusted(type, value);
                    });
                }
            };
            var parse = sce.parseAs, getTrusted = sce.getTrusted, trustAs = sce.trustAs;
            forEach(SCE_CONTEXTS, function(enumValue, name) {
                var lName = lowercase(name);
                sce[camelCase("parse_as_" + lName)] = function(expr) {
                    return parse(enumValue, expr);
                };
                sce[camelCase("get_trusted_" + lName)] = function(value) {
                    return getTrusted(enumValue, value);
                };
                sce[camelCase("trust_as_" + lName)] = function(value) {
                    return trustAs(enumValue, value);
                };
            });
            return sce;
        } ];
    }
    function $SnifferProvider() {
        this.$get = [ "$window", "$document", function($window, $document) {
            var eventSupport = {}, android = int((/android (\d+)/.exec(lowercase(($window.navigator || {}).userAgent)) || [])[1]), boxee = /Boxee/i.test(($window.navigator || {}).userAgent), document = $document[0] || {}, vendorPrefix, vendorRegex = /^(Moz|webkit|ms)(?=[A-Z])/, bodyStyle = document.body && document.body.style, transitions = false, animations = false, match;
            if (bodyStyle) {
                for (var prop in bodyStyle) {
                    if (match = vendorRegex.exec(prop)) {
                        vendorPrefix = match[0];
                        vendorPrefix = vendorPrefix.substr(0, 1).toUpperCase() + vendorPrefix.substr(1);
                        break;
                    }
                }
                if (!vendorPrefix) {
                    vendorPrefix = "WebkitOpacity" in bodyStyle && "webkit";
                }
                transitions = !!("transition" in bodyStyle || vendorPrefix + "Transition" in bodyStyle);
                animations = !!("animation" in bodyStyle || vendorPrefix + "Animation" in bodyStyle);
                if (android && (!transitions || !animations)) {
                    transitions = isString(document.body.style.webkitTransition);
                    animations = isString(document.body.style.webkitAnimation);
                }
            }
            return {
                history: !!($window.history && $window.history.pushState && !(android < 4) && !boxee),
                hasEvent: function(event) {
                    if (event == "input" && msie == 9) return false;
                    if (isUndefined(eventSupport[event])) {
                        var divElm = document.createElement("div");
                        eventSupport[event] = "on" + event in divElm;
                    }
                    return eventSupport[event];
                },
                csp: csp(),
                vendorPrefix: vendorPrefix,
                transitions: transitions,
                animations: animations,
                android: android
            };
        } ];
    }
    var $compileMinErr = minErr("$compile");
    function $TemplateRequestProvider() {
        this.$get = [ "$templateCache", "$http", "$q", function($templateCache, $http, $q) {
            function handleRequestFn(tpl, ignoreRequestError) {
                var self = handleRequestFn;
                self.totalPendingRequests++;
                var transformResponse = $http.defaults && $http.defaults.transformResponse;
                if (isArray(transformResponse)) {
                    var original = transformResponse;
                    transformResponse = [];
                    for (var i = 0; i < original.length; ++i) {
                        var transformer = original[i];
                        if (transformer !== defaultHttpResponseTransform) {
                            transformResponse.push(transformer);
                        }
                    }
                } else if (transformResponse === defaultHttpResponseTransform) {
                    transformResponse = null;
                }
                var httpOptions = {
                    cache: $templateCache,
                    transformResponse: transformResponse
                };
                return $http.get(tpl, httpOptions).then(function(response) {
                    var html = response.data;
                    self.totalPendingRequests--;
                    $templateCache.put(tpl, html);
                    return html;
                }, handleError);
                function handleError() {
                    self.totalPendingRequests--;
                    if (!ignoreRequestError) {
                        throw $compileMinErr("tpload", "Failed to load template: {0}", tpl);
                    }
                    return $q.reject();
                }
            }
            handleRequestFn.totalPendingRequests = 0;
            return handleRequestFn;
        } ];
    }
    function $$TestabilityProvider() {
        this.$get = [ "$rootScope", "$browser", "$location", function($rootScope, $browser, $location) {
            var testability = {};
            testability.findBindings = function(element, expression, opt_exactMatch) {
                var bindings = element.getElementsByClassName("ng-binding");
                var matches = [];
                forEach(bindings, function(binding) {
                    var dataBinding = angular.element(binding).data("$binding");
                    if (dataBinding) {
                        forEach(dataBinding, function(bindingName) {
                            if (opt_exactMatch) {
                                var matcher = new RegExp("(^|\\s)" + escapeForRegexp(expression) + "(\\s|\\||$)");
                                if (matcher.test(bindingName)) {
                                    matches.push(binding);
                                }
                            } else {
                                if (bindingName.indexOf(expression) != -1) {
                                    matches.push(binding);
                                }
                            }
                        });
                    }
                });
                return matches;
            };
            testability.findModels = function(element, expression, opt_exactMatch) {
                var prefixes = [ "ng-", "data-ng-", "ng\\:" ];
                for (var p = 0; p < prefixes.length; ++p) {
                    var attributeEquals = opt_exactMatch ? "=" : "*=";
                    var selector = "[" + prefixes[p] + "model" + attributeEquals + '"' + expression + '"]';
                    var elements = element.querySelectorAll(selector);
                    if (elements.length) {
                        return elements;
                    }
                }
            };
            testability.getLocation = function() {
                return $location.url();
            };
            testability.setLocation = function(url) {
                if (url !== $location.url()) {
                    $location.url(url);
                    $rootScope.$digest();
                }
            };
            testability.whenStable = function(callback) {
                $browser.notifyWhenNoOutstandingRequests(callback);
            };
            return testability;
        } ];
    }
    function $TimeoutProvider() {
        this.$get = [ "$rootScope", "$browser", "$q", "$$q", "$exceptionHandler", function($rootScope, $browser, $q, $$q, $exceptionHandler) {
            var deferreds = {};
            function timeout(fn, delay, invokeApply) {
                var skipApply = isDefined(invokeApply) && !invokeApply, deferred = (skipApply ? $$q : $q).defer(), promise = deferred.promise, timeoutId;
                timeoutId = $browser.defer(function() {
                    try {
                        deferred.resolve(fn());
                    } catch (e) {
                        deferred.reject(e);
                        $exceptionHandler(e);
                    } finally {
                        delete deferreds[promise.$$timeoutId];
                    }
                    if (!skipApply) $rootScope.$apply();
                }, delay);
                promise.$$timeoutId = timeoutId;
                deferreds[timeoutId] = deferred;
                return promise;
            }
            timeout.cancel = function(promise) {
                if (promise && promise.$$timeoutId in deferreds) {
                    deferreds[promise.$$timeoutId].reject("canceled");
                    delete deferreds[promise.$$timeoutId];
                    return $browser.defer.cancel(promise.$$timeoutId);
                }
                return false;
            };
            return timeout;
        } ];
    }
    var urlParsingNode = document.createElement("a");
    var originUrl = urlResolve(window.location.href, true);
    function urlResolve(url, base) {
        var href = url;
        if (msie) {
            urlParsingNode.setAttribute("href", href);
            href = urlParsingNode.href;
        }
        urlParsingNode.setAttribute("href", href);
        return {
            href: urlParsingNode.href,
            protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
            host: urlParsingNode.host,
            search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
            hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
            hostname: urlParsingNode.hostname,
            port: urlParsingNode.port,
            pathname: urlParsingNode.pathname.charAt(0) === "/" ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
        };
    }
    function urlIsSameOrigin(requestUrl) {
        var parsed = isString(requestUrl) ? urlResolve(requestUrl) : requestUrl;
        return parsed.protocol === originUrl.protocol && parsed.host === originUrl.host;
    }
    function $WindowProvider() {
        this.$get = valueFn(window);
    }
    $FilterProvider.$inject = [ "$provide" ];
    function $FilterProvider($provide) {
        var suffix = "Filter";
        function register(name, factory) {
            if (isObject(name)) {
                var filters = {};
                forEach(name, function(filter, key) {
                    filters[key] = register(key, filter);
                });
                return filters;
            } else {
                return $provide.factory(name + suffix, factory);
            }
        }
        this.register = register;
        this.$get = [ "$injector", function($injector) {
            return function(name) {
                return $injector.get(name + suffix);
            };
        } ];
        register("currency", currencyFilter);
        register("date", dateFilter);
        register("filter", filterFilter);
        register("json", jsonFilter);
        register("limitTo", limitToFilter);
        register("lowercase", lowercaseFilter);
        register("number", numberFilter);
        register("orderBy", orderByFilter);
        register("uppercase", uppercaseFilter);
    }
    function filterFilter() {
        return function(array, expression, comparator) {
            if (!isArray(array)) return array;
            var comparatorType = typeof comparator, predicates = [];
            predicates.check = function(value, index) {
                for (var j = 0; j < predicates.length; j++) {
                    if (!predicates[j](value, index)) {
                        return false;
                    }
                }
                return true;
            };
            if (comparatorType !== "function") {
                if (comparatorType === "boolean" && comparator) {
                    comparator = function(obj, text) {
                        return angular.equals(obj, text);
                    };
                } else {
                    comparator = function(obj, text) {
                        if (obj && text && typeof obj === "object" && typeof text === "object") {
                            for (var objKey in obj) {
                                if (objKey.charAt(0) !== "$" && hasOwnProperty.call(obj, objKey) && comparator(obj[objKey], text[objKey])) {
                                    return true;
                                }
                            }
                            return false;
                        }
                        text = ("" + text).toLowerCase();
                        return ("" + obj).toLowerCase().indexOf(text) > -1;
                    };
                }
            }
            var search = function(obj, text) {
                if (typeof text === "string" && text.charAt(0) === "!") {
                    return !search(obj, text.substr(1));
                }
                switch (typeof obj) {
                  case "boolean":
                  case "number":
                  case "string":
                    return comparator(obj, text);

                  case "object":
                    switch (typeof text) {
                      case "object":
                        return comparator(obj, text);

                      default:
                        for (var objKey in obj) {
                            if (objKey.charAt(0) !== "$" && search(obj[objKey], text)) {
                                return true;
                            }
                        }
                        break;
                    }
                    return false;

                  case "array":
                    for (var i = 0; i < obj.length; i++) {
                        if (search(obj[i], text)) {
                            return true;
                        }
                    }
                    return false;

                  default:
                    return false;
                }
            };
            switch (typeof expression) {
              case "boolean":
              case "number":
              case "string":
                expression = {
                    $: expression
                };

              case "object":
                for (var key in expression) {
                    (function(path) {
                        if (typeof expression[path] === "undefined") return;
                        predicates.push(function(value) {
                            return search(path == "$" ? value : value && value[path], expression[path]);
                        });
                    })(key);
                }
                break;

              case "function":
                predicates.push(expression);
                break;

              default:
                return array;
            }
            var filtered = [];
            for (var j = 0; j < array.length; j++) {
                var value = array[j];
                if (predicates.check(value, j)) {
                    filtered.push(value);
                }
            }
            return filtered;
        };
    }
    currencyFilter.$inject = [ "$locale" ];
    function currencyFilter($locale) {
        var formats = $locale.NUMBER_FORMATS;
        return function(amount, currencySymbol, fractionSize) {
            if (isUndefined(currencySymbol)) {
                currencySymbol = formats.CURRENCY_SYM;
            }
            if (isUndefined(fractionSize)) {
                fractionSize = 2;
            }
            return amount == null ? amount : formatNumber(amount, formats.PATTERNS[1], formats.GROUP_SEP, formats.DECIMAL_SEP, fractionSize).replace(/\u00A4/g, currencySymbol);
        };
    }
    numberFilter.$inject = [ "$locale" ];
    function numberFilter($locale) {
        var formats = $locale.NUMBER_FORMATS;
        return function(number, fractionSize) {
            return number == null ? number : formatNumber(number, formats.PATTERNS[0], formats.GROUP_SEP, formats.DECIMAL_SEP, fractionSize);
        };
    }
    var DECIMAL_SEP = ".";
    function formatNumber(number, pattern, groupSep, decimalSep, fractionSize) {
        if (!isFinite(number) || isObject(number)) return "";
        var isNegative = number < 0;
        number = Math.abs(number);
        var numStr = number + "", formatedText = "", parts = [];
        var hasExponent = false;
        if (numStr.indexOf("e") !== -1) {
            var match = numStr.match(/([\d\.]+)e(-?)(\d+)/);
            if (match && match[2] == "-" && match[3] > fractionSize + 1) {
                numStr = "0";
                number = 0;
            } else {
                formatedText = numStr;
                hasExponent = true;
            }
        }
        if (!hasExponent) {
            var fractionLen = (numStr.split(DECIMAL_SEP)[1] || "").length;
            if (isUndefined(fractionSize)) {
                fractionSize = Math.min(Math.max(pattern.minFrac, fractionLen), pattern.maxFrac);
            }
            number = +(Math.round(+(number.toString() + "e" + fractionSize)).toString() + "e" + -fractionSize);
            if (number === 0) {
                isNegative = false;
            }
            var fraction = ("" + number).split(DECIMAL_SEP);
            var whole = fraction[0];
            fraction = fraction[1] || "";
            var i, pos = 0, lgroup = pattern.lgSize, group = pattern.gSize;
            if (whole.length >= lgroup + group) {
                pos = whole.length - lgroup;
                for (i = 0; i < pos; i++) {
                    if ((pos - i) % group === 0 && i !== 0) {
                        formatedText += groupSep;
                    }
                    formatedText += whole.charAt(i);
                }
            }
            for (i = pos; i < whole.length; i++) {
                if ((whole.length - i) % lgroup === 0 && i !== 0) {
                    formatedText += groupSep;
                }
                formatedText += whole.charAt(i);
            }
            while (fraction.length < fractionSize) {
                fraction += "0";
            }
            if (fractionSize && fractionSize !== "0") formatedText += decimalSep + fraction.substr(0, fractionSize);
        } else {
            if (fractionSize > 0 && number > -1 && number < 1) {
                formatedText = number.toFixed(fractionSize);
            }
        }
        parts.push(isNegative ? pattern.negPre : pattern.posPre);
        parts.push(formatedText);
        parts.push(isNegative ? pattern.negSuf : pattern.posSuf);
        return parts.join("");
    }
    function padNumber(num, digits, trim) {
        var neg = "";
        if (num < 0) {
            neg = "-";
            num = -num;
        }
        num = "" + num;
        while (num.length < digits) num = "0" + num;
        if (trim) num = num.substr(num.length - digits);
        return neg + num;
    }
    function dateGetter(name, size, offset, trim) {
        offset = offset || 0;
        return function(date) {
            var value = date["get" + name]();
            if (offset > 0 || value > -offset) value += offset;
            if (value === 0 && offset == -12) value = 12;
            return padNumber(value, size, trim);
        };
    }
    function dateStrGetter(name, shortForm) {
        return function(date, formats) {
            var value = date["get" + name]();
            var get = uppercase(shortForm ? "SHORT" + name : name);
            return formats[get][value];
        };
    }
    function timeZoneGetter(date) {
        var zone = -1 * date.getTimezoneOffset();
        var paddedZone = zone >= 0 ? "+" : "";
        paddedZone += padNumber(Math[zone > 0 ? "floor" : "ceil"](zone / 60), 2) + padNumber(Math.abs(zone % 60), 2);
        return paddedZone;
    }
    function getFirstThursdayOfYear(year) {
        var dayOfWeekOnFirst = new Date(year, 0, 1).getDay();
        return new Date(year, 0, (dayOfWeekOnFirst <= 4 ? 5 : 12) - dayOfWeekOnFirst);
    }
    function getThursdayThisWeek(datetime) {
        return new Date(datetime.getFullYear(), datetime.getMonth(), datetime.getDate() + (4 - datetime.getDay()));
    }
    function weekGetter(size) {
        return function(date) {
            var firstThurs = getFirstThursdayOfYear(date.getFullYear()), thisThurs = getThursdayThisWeek(date);
            var diff = +thisThurs - +firstThurs, result = 1 + Math.round(diff / 6048e5);
            return padNumber(result, size);
        };
    }
    function ampmGetter(date, formats) {
        return date.getHours() < 12 ? formats.AMPMS[0] : formats.AMPMS[1];
    }
    var DATE_FORMATS = {
        yyyy: dateGetter("FullYear", 4),
        yy: dateGetter("FullYear", 2, 0, true),
        y: dateGetter("FullYear", 1),
        MMMM: dateStrGetter("Month"),
        MMM: dateStrGetter("Month", true),
        MM: dateGetter("Month", 2, 1),
        M: dateGetter("Month", 1, 1),
        dd: dateGetter("Date", 2),
        d: dateGetter("Date", 1),
        HH: dateGetter("Hours", 2),
        H: dateGetter("Hours", 1),
        hh: dateGetter("Hours", 2, -12),
        h: dateGetter("Hours", 1, -12),
        mm: dateGetter("Minutes", 2),
        m: dateGetter("Minutes", 1),
        ss: dateGetter("Seconds", 2),
        s: dateGetter("Seconds", 1),
        sss: dateGetter("Milliseconds", 3),
        EEEE: dateStrGetter("Day"),
        EEE: dateStrGetter("Day", true),
        a: ampmGetter,
        Z: timeZoneGetter,
        ww: weekGetter(2),
        w: weekGetter(1)
    };
    var DATE_FORMATS_SPLIT = /((?:[^yMdHhmsaZEw']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z|w+))(.*)/, NUMBER_STRING = /^\-?\d+$/;
    dateFilter.$inject = [ "$locale" ];
    function dateFilter($locale) {
        var R_ISO8601_STR = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
        function jsonStringToDate(string) {
            var match;
            if (match = string.match(R_ISO8601_STR)) {
                var date = new Date(0), tzHour = 0, tzMin = 0, dateSetter = match[8] ? date.setUTCFullYear : date.setFullYear, timeSetter = match[8] ? date.setUTCHours : date.setHours;
                if (match[9]) {
                    tzHour = int(match[9] + match[10]);
                    tzMin = int(match[9] + match[11]);
                }
                dateSetter.call(date, int(match[1]), int(match[2]) - 1, int(match[3]));
                var h = int(match[4] || 0) - tzHour;
                var m = int(match[5] || 0) - tzMin;
                var s = int(match[6] || 0);
                var ms = Math.round(parseFloat("0." + (match[7] || 0)) * 1e3);
                timeSetter.call(date, h, m, s, ms);
                return date;
            }
            return string;
        }
        return function(date, format, timezone) {
            var text = "", parts = [], fn, match;
            format = format || "mediumDate";
            format = $locale.DATETIME_FORMATS[format] || format;
            if (isString(date)) {
                date = NUMBER_STRING.test(date) ? int(date) : jsonStringToDate(date);
            }
            if (isNumber(date)) {
                date = new Date(date);
            }
            if (!isDate(date)) {
                return date;
            }
            while (format) {
                match = DATE_FORMATS_SPLIT.exec(format);
                if (match) {
                    parts = concat(parts, match, 1);
                    format = parts.pop();
                } else {
                    parts.push(format);
                    format = null;
                }
            }
            if (timezone && timezone === "UTC") {
                date = new Date(date.getTime());
                date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
            }
            forEach(parts, function(value) {
                fn = DATE_FORMATS[value];
                text += fn ? fn(date, $locale.DATETIME_FORMATS) : value.replace(/(^'|'$)/g, "").replace(/''/g, "'");
            });
            return text;
        };
    }
    function jsonFilter() {
        return function(object) {
            return toJson(object, true);
        };
    }
    var lowercaseFilter = valueFn(lowercase);
    var uppercaseFilter = valueFn(uppercase);
    function limitToFilter() {
        return function(input, limit) {
            if (isNumber(input)) input = input.toString();
            if (!isArray(input) && !isString(input)) return input;
            if (Math.abs(Number(limit)) === Infinity) {
                limit = Number(limit);
            } else {
                limit = int(limit);
            }
            if (isString(input)) {
                if (limit) {
                    return limit >= 0 ? input.slice(0, limit) : input.slice(limit, input.length);
                } else {
                    return "";
                }
            }
            var out = [], i, n;
            if (limit > input.length) limit = input.length; else if (limit < -input.length) limit = -input.length;
            if (limit > 0) {
                i = 0;
                n = limit;
            } else {
                i = input.length + limit;
                n = input.length;
            }
            for (;i < n; i++) {
                out.push(input[i]);
            }
            return out;
        };
    }
    orderByFilter.$inject = [ "$parse" ];
    function orderByFilter($parse) {
        return function(array, sortPredicate, reverseOrder) {
            if (!isArrayLike(array)) return array;
            sortPredicate = isArray(sortPredicate) ? sortPredicate : [ sortPredicate ];
            if (sortPredicate.length === 0) {
                sortPredicate = [ "+" ];
            }
            sortPredicate = sortPredicate.map(function(predicate) {
                var descending = false, get = predicate || identity;
                if (isString(predicate)) {
                    if (predicate.charAt(0) == "+" || predicate.charAt(0) == "-") {
                        descending = predicate.charAt(0) == "-";
                        predicate = predicate.substring(1);
                    }
                    if (predicate === "") {
                        return reverseComparator(function(a, b) {
                            return compare(a, b);
                        }, descending);
                    }
                    get = $parse(predicate);
                    if (get.constant) {
                        var key = get();
                        return reverseComparator(function(a, b) {
                            return compare(a[key], b[key]);
                        }, descending);
                    }
                }
                return reverseComparator(function(a, b) {
                    return compare(get(a), get(b));
                }, descending);
            });
            var arrayCopy = [];
            for (var i = 0; i < array.length; i++) {
                arrayCopy.push(array[i]);
            }
            return arrayCopy.sort(reverseComparator(comparator, reverseOrder));
            function comparator(o1, o2) {
                for (var i = 0; i < sortPredicate.length; i++) {
                    var comp = sortPredicate[i](o1, o2);
                    if (comp !== 0) return comp;
                }
                return 0;
            }
            function reverseComparator(comp, descending) {
                return descending ? function(a, b) {
                    return comp(b, a);
                } : comp;
            }
            function compare(v1, v2) {
                var t1 = typeof v1;
                var t2 = typeof v2;
                if (t1 == t2) {
                    if (isDate(v1) && isDate(v2)) {
                        v1 = v1.valueOf();
                        v2 = v2.valueOf();
                    }
                    if (t1 == "string") {
                        v1 = v1.toLowerCase();
                        v2 = v2.toLowerCase();
                    }
                    if (v1 === v2) return 0;
                    return v1 < v2 ? -1 : 1;
                } else {
                    return t1 < t2 ? -1 : 1;
                }
            }
        };
    }
    function ngDirective(directive) {
        if (isFunction(directive)) {
            directive = {
                link: directive
            };
        }
        directive.restrict = directive.restrict || "AC";
        return valueFn(directive);
    }
    var htmlAnchorDirective = valueFn({
        restrict: "E",
        compile: function(element, attr) {
            if (!attr.href && !attr.xlinkHref && !attr.name) {
                return function(scope, element) {
                    var href = toString.call(element.prop("href")) === "[object SVGAnimatedString]" ? "xlink:href" : "href";
                    element.on("click", function(event) {
                        if (!element.attr(href)) {
                            event.preventDefault();
                        }
                    });
                };
            }
        }
    });
    var ngAttributeAliasDirectives = {};
    forEach(BOOLEAN_ATTR, function(propName, attrName) {
        if (propName == "multiple") return;
        var normalized = directiveNormalize("ng-" + attrName);
        ngAttributeAliasDirectives[normalized] = function() {
            return {
                restrict: "A",
                priority: 100,
                link: function(scope, element, attr) {
                    scope.$watch(attr[normalized], function ngBooleanAttrWatchAction(value) {
                        attr.$set(attrName, !!value);
                    });
                }
            };
        };
    });
    forEach(ALIASED_ATTR, function(htmlAttr, ngAttr) {
        ngAttributeAliasDirectives[ngAttr] = function() {
            return {
                priority: 100,
                link: function(scope, element, attr) {
                    if (ngAttr === "ngPattern" && attr.ngPattern.charAt(0) == "/") {
                        var match = attr.ngPattern.match(REGEX_STRING_REGEXP);
                        if (match) {
                            attr.$set("ngPattern", new RegExp(match[1], match[2]));
                            return;
                        }
                    }
                    scope.$watch(attr[ngAttr], function ngAttrAliasWatchAction(value) {
                        attr.$set(ngAttr, value);
                    });
                }
            };
        };
    });
    forEach([ "src", "srcset", "href" ], function(attrName) {
        var normalized = directiveNormalize("ng-" + attrName);
        ngAttributeAliasDirectives[normalized] = function() {
            return {
                priority: 99,
                link: function(scope, element, attr) {
                    var propName = attrName, name = attrName;
                    if (attrName === "href" && toString.call(element.prop("href")) === "[object SVGAnimatedString]") {
                        name = "xlinkHref";
                        attr.$attr[name] = "xlink:href";
                        propName = null;
                    }
                    attr.$observe(normalized, function(value) {
                        if (!value) {
                            if (attrName === "href") {
                                attr.$set(name, null);
                            }
                            return;
                        }
                        attr.$set(name, value);
                        if (msie && propName) element.prop(propName, attr[name]);
                    });
                }
            };
        };
    });
    var nullFormCtrl = {
        $addControl: noop,
        $$renameControl: nullFormRenameControl,
        $removeControl: noop,
        $setValidity: noop,
        $setDirty: noop,
        $setPristine: noop,
        $setSubmitted: noop
    }, SUBMITTED_CLASS = "ng-submitted";
    function nullFormRenameControl(control, name) {
        control.$name = name;
    }
    FormController.$inject = [ "$element", "$attrs", "$scope", "$animate", "$interpolate" ];
    function FormController(element, attrs, $scope, $animate, $interpolate) {
        var form = this, controls = [];
        var parentForm = form.$$parentForm = element.parent().controller("form") || nullFormCtrl;
        form.$error = {};
        form.$$success = {};
        form.$pending = undefined;
        form.$name = $interpolate(attrs.name || attrs.ngForm || "")($scope);
        form.$dirty = false;
        form.$pristine = true;
        form.$valid = true;
        form.$invalid = false;
        form.$submitted = false;
        parentForm.$addControl(form);
        form.$rollbackViewValue = function() {
            forEach(controls, function(control) {
                control.$rollbackViewValue();
            });
        };
        form.$commitViewValue = function() {
            forEach(controls, function(control) {
                control.$commitViewValue();
            });
        };
        form.$addControl = function(control) {
            assertNotHasOwnProperty(control.$name, "input");
            controls.push(control);
            if (control.$name) {
                form[control.$name] = control;
            }
        };
        form.$$renameControl = function(control, newName) {
            var oldName = control.$name;
            if (form[oldName] === control) {
                delete form[oldName];
            }
            form[newName] = control;
            control.$name = newName;
        };
        form.$removeControl = function(control) {
            if (control.$name && form[control.$name] === control) {
                delete form[control.$name];
            }
            forEach(form.$pending, function(value, name) {
                form.$setValidity(name, null, control);
            });
            forEach(form.$error, function(value, name) {
                form.$setValidity(name, null, control);
            });
            arrayRemove(controls, control);
        };
        addSetValidityMethod({
            ctrl: this,
            $element: element,
            set: function(object, property, control) {
                var list = object[property];
                if (!list) {
                    object[property] = [ control ];
                } else {
                    var index = list.indexOf(control);
                    if (index === -1) {
                        list.push(control);
                    }
                }
            },
            unset: function(object, property, control) {
                var list = object[property];
                if (!list) {
                    return;
                }
                arrayRemove(list, control);
                if (list.length === 0) {
                    delete object[property];
                }
            },
            parentForm: parentForm,
            $animate: $animate
        });
        form.$setDirty = function() {
            $animate.removeClass(element, PRISTINE_CLASS);
            $animate.addClass(element, DIRTY_CLASS);
            form.$dirty = true;
            form.$pristine = false;
            parentForm.$setDirty();
        };
        form.$setPristine = function() {
            $animate.setClass(element, PRISTINE_CLASS, DIRTY_CLASS + " " + SUBMITTED_CLASS);
            form.$dirty = false;
            form.$pristine = true;
            form.$submitted = false;
            forEach(controls, function(control) {
                control.$setPristine();
            });
        };
        form.$setUntouched = function() {
            forEach(controls, function(control) {
                control.$setUntouched();
            });
        };
        form.$setSubmitted = function() {
            $animate.addClass(element, SUBMITTED_CLASS);
            form.$submitted = true;
            parentForm.$setSubmitted();
        };
    }
    var formDirectiveFactory = function(isNgForm) {
        return [ "$timeout", function($timeout) {
            var formDirective = {
                name: "form",
                restrict: isNgForm ? "EAC" : "E",
                controller: FormController,
                compile: function ngFormCompile(formElement) {
                    formElement.addClass(PRISTINE_CLASS).addClass(VALID_CLASS);
                    return {
                        pre: function ngFormPreLink(scope, formElement, attr, controller) {
                            if (!("action" in attr)) {
                                var handleFormSubmission = function(event) {
                                    scope.$apply(function() {
                                        controller.$commitViewValue();
                                        controller.$setSubmitted();
                                    });
                                    event.preventDefault ? event.preventDefault() : event.returnValue = false;
                                };
                                addEventListenerFn(formElement[0], "submit", handleFormSubmission);
                                formElement.on("$destroy", function() {
                                    $timeout(function() {
                                        removeEventListenerFn(formElement[0], "submit", handleFormSubmission);
                                    }, 0, false);
                                });
                            }
                            var parentFormCtrl = controller.$$parentForm, alias = controller.$name;
                            if (alias) {
                                setter(scope, alias, controller, alias);
                                attr.$observe(attr.name ? "name" : "ngForm", function(newValue) {
                                    if (alias === newValue) return;
                                    setter(scope, alias, undefined, alias);
                                    alias = newValue;
                                    setter(scope, alias, controller, alias);
                                    parentFormCtrl.$$renameControl(controller, alias);
                                });
                            }
                            formElement.on("$destroy", function() {
                                parentFormCtrl.$removeControl(controller);
                                if (alias) {
                                    setter(scope, alias, undefined, alias);
                                }
                                extend(controller, nullFormCtrl);
                            });
                        }
                    };
                }
            };
            return formDirective;
        } ];
    };
    var formDirective = formDirectiveFactory();
    var ngFormDirective = formDirectiveFactory(true);
    var ISO_DATE_REGEXP = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/;
    var URL_REGEXP = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/;
    var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    var NUMBER_REGEXP = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/;
    var DATE_REGEXP = /^(\d{4})-(\d{2})-(\d{2})$/;
    var DATETIMELOCAL_REGEXP = /^(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/;
    var WEEK_REGEXP = /^(\d{4})-W(\d\d)$/;
    var MONTH_REGEXP = /^(\d{4})-(\d\d)$/;
    var TIME_REGEXP = /^(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/;
    var DEFAULT_REGEXP = /(\s+|^)default(\s+|$)/;
    var $ngModelMinErr = new minErr("ngModel");
    var inputType = {
        text: textInputType,
        date: createDateInputType("date", DATE_REGEXP, createDateParser(DATE_REGEXP, [ "yyyy", "MM", "dd" ]), "yyyy-MM-dd"),
        "datetime-local": createDateInputType("datetimelocal", DATETIMELOCAL_REGEXP, createDateParser(DATETIMELOCAL_REGEXP, [ "yyyy", "MM", "dd", "HH", "mm", "ss", "sss" ]), "yyyy-MM-ddTHH:mm:ss.sss"),
        time: createDateInputType("time", TIME_REGEXP, createDateParser(TIME_REGEXP, [ "HH", "mm", "ss", "sss" ]), "HH:mm:ss.sss"),
        week: createDateInputType("week", WEEK_REGEXP, weekParser, "yyyy-Www"),
        month: createDateInputType("month", MONTH_REGEXP, createDateParser(MONTH_REGEXP, [ "yyyy", "MM" ]), "yyyy-MM"),
        number: numberInputType,
        url: urlInputType,
        email: emailInputType,
        radio: radioInputType,
        checkbox: checkboxInputType,
        hidden: noop,
        button: noop,
        submit: noop,
        reset: noop,
        file: noop
    };
    function stringBasedInputType(ctrl) {
        ctrl.$formatters.push(function(value) {
            return ctrl.$isEmpty(value) ? value : value.toString();
        });
    }
    function textInputType(scope, element, attr, ctrl, $sniffer, $browser) {
        baseInputType(scope, element, attr, ctrl, $sniffer, $browser);
        stringBasedInputType(ctrl);
    }
    function baseInputType(scope, element, attr, ctrl, $sniffer, $browser) {
        var placeholder = element[0].placeholder, noevent = {};
        var type = lowercase(element[0].type);
        if (!$sniffer.android) {
            var composing = false;
            element.on("compositionstart", function(data) {
                composing = true;
            });
            element.on("compositionend", function() {
                composing = false;
                listener();
            });
        }
        var listener = function(ev) {
            if (composing) return;
            var value = element.val(), event = ev && ev.type;
            if (msie && (ev || noevent).type === "input" && element[0].placeholder !== placeholder) {
                placeholder = element[0].placeholder;
                return;
            }
            if (type !== "password" && (!attr.ngTrim || attr.ngTrim !== "false")) {
                value = trim(value);
            }
            if (ctrl.$viewValue !== value || value === "" && ctrl.$$hasNativeValidators) {
                ctrl.$setViewValue(value, event);
            }
        };
        if ($sniffer.hasEvent("input")) {
            element.on("input", listener);
        } else {
            var timeout;
            var deferListener = function(ev) {
                if (!timeout) {
                    timeout = $browser.defer(function() {
                        listener(ev);
                        timeout = null;
                    });
                }
            };
            element.on("keydown", function(event) {
                var key = event.keyCode;
                if (key === 91 || 15 < key && key < 19 || 37 <= key && key <= 40) return;
                deferListener(event);
            });
            if ($sniffer.hasEvent("paste")) {
                element.on("paste cut", deferListener);
            }
        }
        element.on("change", listener);
        ctrl.$render = function() {
            element.val(ctrl.$isEmpty(ctrl.$modelValue) ? "" : ctrl.$viewValue);
        };
    }
    function weekParser(isoWeek, existingDate) {
        if (isDate(isoWeek)) {
            return isoWeek;
        }
        if (isString(isoWeek)) {
            WEEK_REGEXP.lastIndex = 0;
            var parts = WEEK_REGEXP.exec(isoWeek);
            if (parts) {
                var year = +parts[1], week = +parts[2], hours = 0, minutes = 0, seconds = 0, milliseconds = 0, firstThurs = getFirstThursdayOfYear(year), addDays = (week - 1) * 7;
                if (existingDate) {
                    hours = existingDate.getHours();
                    minutes = existingDate.getMinutes();
                    seconds = existingDate.getSeconds();
                    milliseconds = existingDate.getMilliseconds();
                }
                return new Date(year, 0, firstThurs.getDate() + addDays, hours, minutes, seconds, milliseconds);
            }
        }
        return NaN;
    }
    function createDateParser(regexp, mapping) {
        return function(iso, date) {
            var parts, map;
            if (isDate(iso)) {
                return iso;
            }
            if (isString(iso)) {
                if (iso.charAt(0) == '"' && iso.charAt(iso.length - 1) == '"') {
                    iso = iso.substring(1, iso.length - 1);
                }
                if (ISO_DATE_REGEXP.test(iso)) {
                    return new Date(iso);
                }
                regexp.lastIndex = 0;
                parts = regexp.exec(iso);
                if (parts) {
                    parts.shift();
                    if (date) {
                        map = {
                            yyyy: date.getFullYear(),
                            MM: date.getMonth() + 1,
                            dd: date.getDate(),
                            HH: date.getHours(),
                            mm: date.getMinutes(),
                            ss: date.getSeconds(),
                            sss: date.getMilliseconds() / 1e3
                        };
                    } else {
                        map = {
                            yyyy: 1970,
                            MM: 1,
                            dd: 1,
                            HH: 0,
                            mm: 0,
                            ss: 0,
                            sss: 0
                        };
                    }
                    forEach(parts, function(part, index) {
                        if (index < mapping.length) {
                            map[mapping[index]] = +part;
                        }
                    });
                    return new Date(map.yyyy, map.MM - 1, map.dd, map.HH, map.mm, map.ss || 0, map.sss * 1e3 || 0);
                }
            }
            return NaN;
        };
    }
    function createDateInputType(type, regexp, parseDate, format) {
        return function dynamicDateInputType(scope, element, attr, ctrl, $sniffer, $browser, $filter) {
            badInputChecker(scope, element, attr, ctrl);
            baseInputType(scope, element, attr, ctrl, $sniffer, $browser);
            var timezone = ctrl && ctrl.$options && ctrl.$options.timezone;
            var previousDate;
            ctrl.$$parserName = type;
            ctrl.$parsers.push(function(value) {
                if (ctrl.$isEmpty(value)) return null;
                if (regexp.test(value)) {
                    var parsedDate = parseDate(value, previousDate);
                    if (timezone === "UTC") {
                        parsedDate.setMinutes(parsedDate.getMinutes() - parsedDate.getTimezoneOffset());
                    }
                    return parsedDate;
                }
                return undefined;
            });
            ctrl.$formatters.push(function(value) {
                if (!ctrl.$isEmpty(value)) {
                    if (!isDate(value)) {
                        throw $ngModelMinErr("datefmt", "Expected `{0}` to be a date", value);
                    }
                    previousDate = value;
                    if (previousDate && timezone === "UTC") {
                        var timezoneOffset = 6e4 * previousDate.getTimezoneOffset();
                        previousDate = new Date(previousDate.getTime() + timezoneOffset);
                    }
                    return $filter("date")(value, format, timezone);
                } else {
                    previousDate = null;
                }
                return "";
            });
            if (isDefined(attr.min) || attr.ngMin) {
                var minVal;
                ctrl.$validators.min = function(value) {
                    return ctrl.$isEmpty(value) || isUndefined(minVal) || parseDate(value) >= minVal;
                };
                attr.$observe("min", function(val) {
                    minVal = parseObservedDateValue(val);
                    ctrl.$validate();
                });
            }
            if (isDefined(attr.max) || attr.ngMax) {
                var maxVal;
                ctrl.$validators.max = function(value) {
                    return ctrl.$isEmpty(value) || isUndefined(maxVal) || parseDate(value) <= maxVal;
                };
                attr.$observe("max", function(val) {
                    maxVal = parseObservedDateValue(val);
                    ctrl.$validate();
                });
            }
            ctrl.$isEmpty = function(value) {
                return !value || value.getTime && value.getTime() !== value.getTime();
            };
            function parseObservedDateValue(val) {
                return isDefined(val) ? isDate(val) ? val : parseDate(val) : undefined;
            }
        };
    }
    function badInputChecker(scope, element, attr, ctrl) {
        var node = element[0];
        var nativeValidation = ctrl.$$hasNativeValidators = isObject(node.validity);
        if (nativeValidation) {
            ctrl.$parsers.push(function(value) {
                var validity = element.prop(VALIDITY_STATE_PROPERTY) || {};
                return validity.badInput && !validity.typeMismatch ? undefined : value;
            });
        }
    }
    function numberInputType(scope, element, attr, ctrl, $sniffer, $browser) {
        badInputChecker(scope, element, attr, ctrl);
        baseInputType(scope, element, attr, ctrl, $sniffer, $browser);
        ctrl.$$parserName = "number";
        ctrl.$parsers.push(function(value) {
            if (ctrl.$isEmpty(value)) return null;
            if (NUMBER_REGEXP.test(value)) return parseFloat(value);
            return undefined;
        });
        ctrl.$formatters.push(function(value) {
            if (!ctrl.$isEmpty(value)) {
                if (!isNumber(value)) {
                    throw $ngModelMinErr("numfmt", "Expected `{0}` to be a number", value);
                }
                value = value.toString();
            }
            return value;
        });
        if (attr.min || attr.ngMin) {
            var minVal;
            ctrl.$validators.min = function(value) {
                return ctrl.$isEmpty(value) || isUndefined(minVal) || value >= minVal;
            };
            attr.$observe("min", function(val) {
                if (isDefined(val) && !isNumber(val)) {
                    val = parseFloat(val, 10);
                }
                minVal = isNumber(val) && !isNaN(val) ? val : undefined;
                ctrl.$validate();
            });
        }
        if (attr.max || attr.ngMax) {
            var maxVal;
            ctrl.$validators.max = function(value) {
                return ctrl.$isEmpty(value) || isUndefined(maxVal) || value <= maxVal;
            };
            attr.$observe("max", function(val) {
                if (isDefined(val) && !isNumber(val)) {
                    val = parseFloat(val, 10);
                }
                maxVal = isNumber(val) && !isNaN(val) ? val : undefined;
                ctrl.$validate();
            });
        }
    }
    function urlInputType(scope, element, attr, ctrl, $sniffer, $browser) {
        baseInputType(scope, element, attr, ctrl, $sniffer, $browser);
        stringBasedInputType(ctrl);
        ctrl.$$parserName = "url";
        ctrl.$validators.url = function(value) {
            return ctrl.$isEmpty(value) || URL_REGEXP.test(value);
        };
    }
    function emailInputType(scope, element, attr, ctrl, $sniffer, $browser) {
        baseInputType(scope, element, attr, ctrl, $sniffer, $browser);
        stringBasedInputType(ctrl);
        ctrl.$$parserName = "email";
        ctrl.$validators.email = function(value) {
            return ctrl.$isEmpty(value) || EMAIL_REGEXP.test(value);
        };
    }
    function radioInputType(scope, element, attr, ctrl) {
        if (isUndefined(attr.name)) {
            element.attr("name", nextUid());
        }
        var listener = function(ev) {
            if (element[0].checked) {
                ctrl.$setViewValue(attr.value, ev && ev.type);
            }
        };
        element.on("click", listener);
        ctrl.$render = function() {
            var value = attr.value;
            element[0].checked = value == ctrl.$viewValue;
        };
        attr.$observe("value", ctrl.$render);
    }
    function parseConstantExpr($parse, context, name, expression, fallback) {
        var parseFn;
        if (isDefined(expression)) {
            parseFn = $parse(expression);
            if (!parseFn.constant) {
                throw minErr("ngModel")("constexpr", "Expected constant expression for `{0}`, but saw " + "`{1}`.", name, expression);
            }
            return parseFn(context);
        }
        return fallback;
    }
    function checkboxInputType(scope, element, attr, ctrl, $sniffer, $browser, $filter, $parse) {
        var trueValue = parseConstantExpr($parse, scope, "ngTrueValue", attr.ngTrueValue, true);
        var falseValue = parseConstantExpr($parse, scope, "ngFalseValue", attr.ngFalseValue, false);
        var listener = function(ev) {
            ctrl.$setViewValue(element[0].checked, ev && ev.type);
        };
        element.on("click", listener);
        ctrl.$render = function() {
            element[0].checked = ctrl.$viewValue;
        };
        ctrl.$isEmpty = function(value) {
            return value !== trueValue;
        };
        ctrl.$formatters.push(function(value) {
            return equals(value, trueValue);
        });
        ctrl.$parsers.push(function(value) {
            return value ? trueValue : falseValue;
        });
    }
    var inputDirective = [ "$browser", "$sniffer", "$filter", "$parse", function($browser, $sniffer, $filter, $parse) {
        return {
            restrict: "E",
            require: [ "?ngModel" ],
            link: {
                pre: function(scope, element, attr, ctrls) {
                    if (ctrls[0]) {
                        (inputType[lowercase(attr.type)] || inputType.text)(scope, element, attr, ctrls[0], $sniffer, $browser, $filter, $parse);
                    }
                }
            }
        };
    } ];
    var VALID_CLASS = "ng-valid", INVALID_CLASS = "ng-invalid", PRISTINE_CLASS = "ng-pristine", DIRTY_CLASS = "ng-dirty", UNTOUCHED_CLASS = "ng-untouched", TOUCHED_CLASS = "ng-touched", PENDING_CLASS = "ng-pending";
    var NgModelController = [ "$scope", "$exceptionHandler", "$attrs", "$element", "$parse", "$animate", "$timeout", "$rootScope", "$q", "$interpolate", function($scope, $exceptionHandler, $attr, $element, $parse, $animate, $timeout, $rootScope, $q, $interpolate) {
        this.$viewValue = Number.NaN;
        this.$modelValue = Number.NaN;
        this.$validators = {};
        this.$asyncValidators = {};
        this.$parsers = [];
        this.$formatters = [];
        this.$viewChangeListeners = [];
        this.$untouched = true;
        this.$touched = false;
        this.$pristine = true;
        this.$dirty = false;
        this.$valid = true;
        this.$invalid = false;
        this.$error = {};
        this.$$success = {};
        this.$pending = undefined;
        this.$name = $interpolate($attr.name || "", false)($scope);
        var parsedNgModel = $parse($attr.ngModel), pendingDebounce = null, ctrl = this;
        var ngModelGet = function ngModelGet() {
            var modelValue = parsedNgModel($scope);
            if (ctrl.$options && ctrl.$options.getterSetter && isFunction(modelValue)) {
                modelValue = modelValue();
            }
            return modelValue;
        };
        var ngModelSet = function ngModelSet(newValue) {
            var getterSetter;
            if (ctrl.$options && ctrl.$options.getterSetter && isFunction(getterSetter = parsedNgModel($scope))) {
                getterSetter(ctrl.$modelValue);
            } else {
                parsedNgModel.assign($scope, ctrl.$modelValue);
            }
        };
        this.$$setOptions = function(options) {
            ctrl.$options = options;
            if (!parsedNgModel.assign && (!options || !options.getterSetter)) {
                throw $ngModelMinErr("nonassign", "Expression '{0}' is non-assignable. Element: {1}", $attr.ngModel, startingTag($element));
            }
        };
        this.$render = noop;
        this.$isEmpty = function(value) {
            return isUndefined(value) || value === "" || value === null || value !== value;
        };
        var parentForm = $element.inheritedData("$formController") || nullFormCtrl, currentValidationRunId = 0;
        addSetValidityMethod({
            ctrl: this,
            $element: $element,
            set: function(object, property) {
                object[property] = true;
            },
            unset: function(object, property) {
                delete object[property];
            },
            parentForm: parentForm,
            $animate: $animate
        });
        this.$setPristine = function() {
            ctrl.$dirty = false;
            ctrl.$pristine = true;
            $animate.removeClass($element, DIRTY_CLASS);
            $animate.addClass($element, PRISTINE_CLASS);
        };
        this.$setUntouched = function() {
            ctrl.$touched = false;
            ctrl.$untouched = true;
            $animate.setClass($element, UNTOUCHED_CLASS, TOUCHED_CLASS);
        };
        this.$setTouched = function() {
            ctrl.$touched = true;
            ctrl.$untouched = false;
            $animate.setClass($element, TOUCHED_CLASS, UNTOUCHED_CLASS);
        };
        this.$rollbackViewValue = function() {
            $timeout.cancel(pendingDebounce);
            ctrl.$viewValue = ctrl.$$lastCommittedViewValue;
            ctrl.$render();
        };
        this.$validate = function() {
            if (isNumber(ctrl.$modelValue) && isNaN(ctrl.$modelValue)) {
                return;
            }
            this.$$parseAndValidate();
        };
        this.$$runValidators = function(parseValid, modelValue, viewValue, doneCallback) {
            currentValidationRunId++;
            var localValidationRunId = currentValidationRunId;
            if (!processParseErrors(parseValid)) {
                validationDone(false);
                return;
            }
            if (!processSyncValidators()) {
                validationDone(false);
                return;
            }
            processAsyncValidators();
            function processParseErrors(parseValid) {
                var errorKey = ctrl.$$parserName || "parse";
                if (parseValid === undefined) {
                    setValidity(errorKey, null);
                } else {
                    setValidity(errorKey, parseValid);
                    if (!parseValid) {
                        forEach(ctrl.$validators, function(v, name) {
                            setValidity(name, null);
                        });
                        forEach(ctrl.$asyncValidators, function(v, name) {
                            setValidity(name, null);
                        });
                        return false;
                    }
                }
                return true;
            }
            function processSyncValidators() {
                var syncValidatorsValid = true;
                forEach(ctrl.$validators, function(validator, name) {
                    var result = validator(modelValue, viewValue);
                    syncValidatorsValid = syncValidatorsValid && result;
                    setValidity(name, result);
                });
                if (!syncValidatorsValid) {
                    forEach(ctrl.$asyncValidators, function(v, name) {
                        setValidity(name, null);
                    });
                    return false;
                }
                return true;
            }
            function processAsyncValidators() {
                var validatorPromises = [];
                var allValid = true;
                forEach(ctrl.$asyncValidators, function(validator, name) {
                    var promise = validator(modelValue, viewValue);
                    if (!isPromiseLike(promise)) {
                        throw $ngModelMinErr("$asyncValidators", "Expected asynchronous validator to return a promise but got '{0}' instead.", promise);
                    }
                    setValidity(name, undefined);
                    validatorPromises.push(promise.then(function() {
                        setValidity(name, true);
                    }, function(error) {
                        allValid = false;
                        setValidity(name, false);
                    }));
                });
                if (!validatorPromises.length) {
                    validationDone(true);
                } else {
                    $q.all(validatorPromises).then(function() {
                        validationDone(allValid);
                    }, noop);
                }
            }
            function setValidity(name, isValid) {
                if (localValidationRunId === currentValidationRunId) {
                    ctrl.$setValidity(name, isValid);
                }
            }
            function validationDone(allValid) {
                if (localValidationRunId === currentValidationRunId) {
                    doneCallback(allValid);
                }
            }
        };
        this.$commitViewValue = function() {
            var viewValue = ctrl.$viewValue;
            $timeout.cancel(pendingDebounce);
            if (ctrl.$$lastCommittedViewValue === viewValue && (viewValue !== "" || !ctrl.$$hasNativeValidators)) {
                return;
            }
            ctrl.$$lastCommittedViewValue = viewValue;
            if (ctrl.$pristine) {
                ctrl.$dirty = true;
                ctrl.$pristine = false;
                $animate.removeClass($element, PRISTINE_CLASS);
                $animate.addClass($element, DIRTY_CLASS);
                parentForm.$setDirty();
            }
            this.$$parseAndValidate();
        };
        this.$$parseAndValidate = function() {
            var viewValue = ctrl.$$lastCommittedViewValue;
            var modelValue = viewValue;
            var parserValid = isUndefined(modelValue) ? undefined : true;
            if (parserValid) {
                for (var i = 0; i < ctrl.$parsers.length; i++) {
                    modelValue = ctrl.$parsers[i](modelValue);
                    if (isUndefined(modelValue)) {
                        parserValid = false;
                        break;
                    }
                }
            }
            if (isNumber(ctrl.$modelValue) && isNaN(ctrl.$modelValue)) {
                ctrl.$modelValue = ngModelGet();
            }
            var prevModelValue = ctrl.$modelValue;
            var allowInvalid = ctrl.$options && ctrl.$options.allowInvalid;
            if (allowInvalid) {
                ctrl.$modelValue = modelValue;
                writeToModelIfNeeded();
            }
            ctrl.$$runValidators(parserValid, modelValue, viewValue, function(allValid) {
                if (!allowInvalid) {
                    ctrl.$modelValue = allValid ? modelValue : undefined;
                    writeToModelIfNeeded();
                }
            });
            function writeToModelIfNeeded() {
                if (ctrl.$modelValue !== prevModelValue) {
                    ctrl.$$writeModelToScope();
                }
            }
        };
        this.$$writeModelToScope = function() {
            ngModelSet(ctrl.$modelValue);
            forEach(ctrl.$viewChangeListeners, function(listener) {
                try {
                    listener();
                } catch (e) {
                    $exceptionHandler(e);
                }
            });
        };
        this.$setViewValue = function(value, trigger) {
            ctrl.$viewValue = value;
            if (!ctrl.$options || ctrl.$options.updateOnDefault) {
                ctrl.$$debounceViewValueCommit(trigger);
            }
        };
        this.$$debounceViewValueCommit = function(trigger) {
            var debounceDelay = 0, options = ctrl.$options, debounce;
            if (options && isDefined(options.debounce)) {
                debounce = options.debounce;
                if (isNumber(debounce)) {
                    debounceDelay = debounce;
                } else if (isNumber(debounce[trigger])) {
                    debounceDelay = debounce[trigger];
                } else if (isNumber(debounce["default"])) {
                    debounceDelay = debounce["default"];
                }
            }
            $timeout.cancel(pendingDebounce);
            if (debounceDelay) {
                pendingDebounce = $timeout(function() {
                    ctrl.$commitViewValue();
                }, debounceDelay);
            } else if ($rootScope.$$phase) {
                ctrl.$commitViewValue();
            } else {
                $scope.$apply(function() {
                    ctrl.$commitViewValue();
                });
            }
        };
        $scope.$watch(function ngModelWatch() {
            var modelValue = ngModelGet();
            if (modelValue !== ctrl.$modelValue) {
                ctrl.$modelValue = modelValue;
                var formatters = ctrl.$formatters, idx = formatters.length;
                var viewValue = modelValue;
                while (idx--) {
                    viewValue = formatters[idx](viewValue);
                }
                if (ctrl.$viewValue !== viewValue) {
                    ctrl.$viewValue = ctrl.$$lastCommittedViewValue = viewValue;
                    ctrl.$render();
                    ctrl.$$runValidators(undefined, modelValue, viewValue, noop);
                }
            }
            return modelValue;
        });
    } ];
    var ngModelDirective = function() {
        return {
            restrict: "A",
            require: [ "ngModel", "^?form", "^?ngModelOptions" ],
            controller: NgModelController,
            priority: 1,
            compile: function ngModelCompile(element) {
                element.addClass(PRISTINE_CLASS).addClass(UNTOUCHED_CLASS).addClass(VALID_CLASS);
                return {
                    pre: function ngModelPreLink(scope, element, attr, ctrls) {
                        var modelCtrl = ctrls[0], formCtrl = ctrls[1] || nullFormCtrl;
                        modelCtrl.$$setOptions(ctrls[2] && ctrls[2].$options);
                        formCtrl.$addControl(modelCtrl);
                        attr.$observe("name", function(newValue) {
                            if (modelCtrl.$name !== newValue) {
                                formCtrl.$$renameControl(modelCtrl, newValue);
                            }
                        });
                        scope.$on("$destroy", function() {
                            formCtrl.$removeControl(modelCtrl);
                        });
                    },
                    post: function ngModelPostLink(scope, element, attr, ctrls) {
                        var modelCtrl = ctrls[0];
                        if (modelCtrl.$options && modelCtrl.$options.updateOn) {
                            element.on(modelCtrl.$options.updateOn, function(ev) {
                                modelCtrl.$$debounceViewValueCommit(ev && ev.type);
                            });
                        }
                        element.on("blur", function(ev) {
                            if (modelCtrl.$touched) return;
                            scope.$apply(function() {
                                modelCtrl.$setTouched();
                            });
                        });
                    }
                };
            }
        };
    };
    var ngChangeDirective = valueFn({
        restrict: "A",
        require: "ngModel",
        link: function(scope, element, attr, ctrl) {
            ctrl.$viewChangeListeners.push(function() {
                scope.$eval(attr.ngChange);
            });
        }
    });
    var requiredDirective = function() {
        return {
            restrict: "A",
            require: "?ngModel",
            link: function(scope, elm, attr, ctrl) {
                if (!ctrl) return;
                attr.required = true;
                ctrl.$validators.required = function(value) {
                    return !attr.required || !ctrl.$isEmpty(value);
                };
                attr.$observe("required", function() {
                    ctrl.$validate();
                });
            }
        };
    };
    var patternDirective = function() {
        return {
            restrict: "A",
            require: "?ngModel",
            link: function(scope, elm, attr, ctrl) {
                if (!ctrl) return;
                var regexp, patternExp = attr.ngPattern || attr.pattern;
                attr.$observe("pattern", function(regex) {
                    if (isString(regex) && regex.length > 0) {
                        regex = new RegExp(regex);
                    }
                    if (regex && !regex.test) {
                        throw minErr("ngPattern")("noregexp", "Expected {0} to be a RegExp but was {1}. Element: {2}", patternExp, regex, startingTag(elm));
                    }
                    regexp = regex || undefined;
                    ctrl.$validate();
                });
                ctrl.$validators.pattern = function(value) {
                    return ctrl.$isEmpty(value) || isUndefined(regexp) || regexp.test(value);
                };
            }
        };
    };
    var maxlengthDirective = function() {
        return {
            restrict: "A",
            require: "?ngModel",
            link: function(scope, elm, attr, ctrl) {
                if (!ctrl) return;
                var maxlength = 0;
                attr.$observe("maxlength", function(value) {
                    maxlength = int(value) || 0;
                    ctrl.$validate();
                });
                ctrl.$validators.maxlength = function(modelValue, viewValue) {
                    return ctrl.$isEmpty(modelValue) || viewValue.length <= maxlength;
                };
            }
        };
    };
    var minlengthDirective = function() {
        return {
            restrict: "A",
            require: "?ngModel",
            link: function(scope, elm, attr, ctrl) {
                if (!ctrl) return;
                var minlength = 0;
                attr.$observe("minlength", function(value) {
                    minlength = int(value) || 0;
                    ctrl.$validate();
                });
                ctrl.$validators.minlength = function(modelValue, viewValue) {
                    return ctrl.$isEmpty(modelValue) || viewValue.length >= minlength;
                };
            }
        };
    };
    var ngListDirective = function() {
        return {
            restrict: "A",
            priority: 100,
            require: "ngModel",
            link: function(scope, element, attr, ctrl) {
                var ngList = element.attr(attr.$attr.ngList) || ", ";
                var trimValues = attr.ngTrim !== "false";
                var separator = trimValues ? trim(ngList) : ngList;
                var parse = function(viewValue) {
                    if (isUndefined(viewValue)) return;
                    var list = [];
                    if (viewValue) {
                        forEach(viewValue.split(separator), function(value) {
                            if (value) list.push(trimValues ? trim(value) : value);
                        });
                    }
                    return list;
                };
                ctrl.$parsers.push(parse);
                ctrl.$formatters.push(function(value) {
                    if (isArray(value)) {
                        return value.join(ngList);
                    }
                    return undefined;
                });
                ctrl.$isEmpty = function(value) {
                    return !value || !value.length;
                };
            }
        };
    };
    var CONSTANT_VALUE_REGEXP = /^(true|false|\d+)$/;
    var ngValueDirective = function() {
        return {
            restrict: "A",
            priority: 100,
            compile: function(tpl, tplAttr) {
                if (CONSTANT_VALUE_REGEXP.test(tplAttr.ngValue)) {
                    return function ngValueConstantLink(scope, elm, attr) {
                        attr.$set("value", scope.$eval(attr.ngValue));
                    };
                } else {
                    return function ngValueLink(scope, elm, attr) {
                        scope.$watch(attr.ngValue, function valueWatchAction(value) {
                            attr.$set("value", value);
                        });
                    };
                }
            }
        };
    };
    var ngModelOptionsDirective = function() {
        return {
            restrict: "A",
            controller: [ "$scope", "$attrs", function($scope, $attrs) {
                var that = this;
                this.$options = $scope.$eval($attrs.ngModelOptions);
                if (this.$options.updateOn !== undefined) {
                    this.$options.updateOnDefault = false;
                    this.$options.updateOn = trim(this.$options.updateOn.replace(DEFAULT_REGEXP, function() {
                        that.$options.updateOnDefault = true;
                        return " ";
                    }));
                } else {
                    this.$options.updateOnDefault = true;
                }
            } ]
        };
    };
    function addSetValidityMethod(context) {
        var ctrl = context.ctrl, $element = context.$element, classCache = {}, set = context.set, unset = context.unset, parentForm = context.parentForm, $animate = context.$animate;
        classCache[INVALID_CLASS] = !(classCache[VALID_CLASS] = $element.hasClass(VALID_CLASS));
        ctrl.$setValidity = setValidity;
        function setValidity(validationErrorKey, state, options) {
            if (state === undefined) {
                createAndSet("$pending", validationErrorKey, options);
            } else {
                unsetAndCleanup("$pending", validationErrorKey, options);
            }
            if (!isBoolean(state)) {
                unset(ctrl.$error, validationErrorKey, options);
                unset(ctrl.$$success, validationErrorKey, options);
            } else {
                if (state) {
                    unset(ctrl.$error, validationErrorKey, options);
                    set(ctrl.$$success, validationErrorKey, options);
                } else {
                    set(ctrl.$error, validationErrorKey, options);
                    unset(ctrl.$$success, validationErrorKey, options);
                }
            }
            if (ctrl.$pending) {
                cachedToggleClass(PENDING_CLASS, true);
                ctrl.$valid = ctrl.$invalid = undefined;
                toggleValidationCss("", null);
            } else {
                cachedToggleClass(PENDING_CLASS, false);
                ctrl.$valid = isObjectEmpty(ctrl.$error);
                ctrl.$invalid = !ctrl.$valid;
                toggleValidationCss("", ctrl.$valid);
            }
            var combinedState;
            if (ctrl.$pending && ctrl.$pending[validationErrorKey]) {
                combinedState = undefined;
            } else if (ctrl.$error[validationErrorKey]) {
                combinedState = false;
            } else if (ctrl.$$success[validationErrorKey]) {
                combinedState = true;
            } else {
                combinedState = null;
            }
            toggleValidationCss(validationErrorKey, combinedState);
            parentForm.$setValidity(validationErrorKey, combinedState, ctrl);
        }
        function createAndSet(name, value, options) {
            if (!ctrl[name]) {
                ctrl[name] = {};
            }
            set(ctrl[name], value, options);
        }
        function unsetAndCleanup(name, value, options) {
            if (ctrl[name]) {
                unset(ctrl[name], value, options);
            }
            if (isObjectEmpty(ctrl[name])) {
                ctrl[name] = undefined;
            }
        }
        function cachedToggleClass(className, switchValue) {
            if (switchValue && !classCache[className]) {
                $animate.addClass($element, className);
                classCache[className] = true;
            } else if (!switchValue && classCache[className]) {
                $animate.removeClass($element, className);
                classCache[className] = false;
            }
        }
        function toggleValidationCss(validationErrorKey, isValid) {
            validationErrorKey = validationErrorKey ? "-" + snake_case(validationErrorKey, "-") : "";
            cachedToggleClass(VALID_CLASS + validationErrorKey, isValid === true);
            cachedToggleClass(INVALID_CLASS + validationErrorKey, isValid === false);
        }
    }
    function isObjectEmpty(obj) {
        if (obj) {
            for (var prop in obj) {
                return false;
            }
        }
        return true;
    }
    var ngBindDirective = [ "$compile", function($compile) {
        return {
            restrict: "AC",
            compile: function ngBindCompile(templateElement) {
                $compile.$$addBindingClass(templateElement);
                return function ngBindLink(scope, element, attr) {
                    $compile.$$addBindingInfo(element, attr.ngBind);
                    element = element[0];
                    scope.$watch(attr.ngBind, function ngBindWatchAction(value) {
                        element.textContent = value === undefined ? "" : value;
                    });
                };
            }
        };
    } ];
    var ngBindTemplateDirective = [ "$interpolate", "$compile", function($interpolate, $compile) {
        return {
            compile: function ngBindTemplateCompile(templateElement) {
                $compile.$$addBindingClass(templateElement);
                return function ngBindTemplateLink(scope, element, attr) {
                    var interpolateFn = $interpolate(element.attr(attr.$attr.ngBindTemplate));
                    $compile.$$addBindingInfo(element, interpolateFn.expressions);
                    element = element[0];
                    attr.$observe("ngBindTemplate", function(value) {
                        element.textContent = value === undefined ? "" : value;
                    });
                };
            }
        };
    } ];
    var ngBindHtmlDirective = [ "$sce", "$parse", "$compile", function($sce, $parse, $compile) {
        return {
            restrict: "A",
            compile: function ngBindHtmlCompile(tElement, tAttrs) {
                var ngBindHtmlGetter = $parse(tAttrs.ngBindHtml);
                var ngBindHtmlWatch = $parse(tAttrs.ngBindHtml, function getStringValue(value) {
                    return (value || "").toString();
                });
                $compile.$$addBindingClass(tElement);
                return function ngBindHtmlLink(scope, element, attr) {
                    $compile.$$addBindingInfo(element, attr.ngBindHtml);
                    scope.$watch(ngBindHtmlWatch, function ngBindHtmlWatchAction() {
                        element.html($sce.getTrustedHtml(ngBindHtmlGetter(scope)) || "");
                    });
                };
            }
        };
    } ];
    function classDirective(name, selector) {
        name = "ngClass" + name;
        return [ "$animate", function($animate) {
            return {
                restrict: "AC",
                link: function(scope, element, attr) {
                    var oldVal;
                    scope.$watch(attr[name], ngClassWatchAction, true);
                    attr.$observe("class", function(value) {
                        ngClassWatchAction(scope.$eval(attr[name]));
                    });
                    if (name !== "ngClass") {
                        scope.$watch("$index", function($index, old$index) {
                            var mod = $index & 1;
                            if (mod !== (old$index & 1)) {
                                var classes = arrayClasses(scope.$eval(attr[name]));
                                mod === selector ? addClasses(classes) : removeClasses(classes);
                            }
                        });
                    }
                    function addClasses(classes) {
                        var newClasses = digestClassCounts(classes, 1);
                        attr.$addClass(newClasses);
                    }
                    function removeClasses(classes) {
                        var newClasses = digestClassCounts(classes, -1);
                        attr.$removeClass(newClasses);
                    }
                    function digestClassCounts(classes, count) {
                        var classCounts = element.data("$classCounts") || {};
                        var classesToUpdate = [];
                        forEach(classes, function(className) {
                            if (count > 0 || classCounts[className]) {
                                classCounts[className] = (classCounts[className] || 0) + count;
                                if (classCounts[className] === +(count > 0)) {
                                    classesToUpdate.push(className);
                                }
                            }
                        });
                        element.data("$classCounts", classCounts);
                        return classesToUpdate.join(" ");
                    }
                    function updateClasses(oldClasses, newClasses) {
                        var toAdd = arrayDifference(newClasses, oldClasses);
                        var toRemove = arrayDifference(oldClasses, newClasses);
                        toAdd = digestClassCounts(toAdd, 1);
                        toRemove = digestClassCounts(toRemove, -1);
                        if (toAdd && toAdd.length) {
                            $animate.addClass(element, toAdd);
                        }
                        if (toRemove && toRemove.length) {
                            $animate.removeClass(element, toRemove);
                        }
                    }
                    function ngClassWatchAction(newVal) {
                        if (selector === true || scope.$index % 2 === selector) {
                            var newClasses = arrayClasses(newVal || []);
                            if (!oldVal) {
                                addClasses(newClasses);
                            } else if (!equals(newVal, oldVal)) {
                                var oldClasses = arrayClasses(oldVal);
                                updateClasses(oldClasses, newClasses);
                            }
                        }
                        oldVal = shallowCopy(newVal);
                    }
                }
            };
            function arrayDifference(tokens1, tokens2) {
                var values = [];
                outer: for (var i = 0; i < tokens1.length; i++) {
                    var token = tokens1[i];
                    for (var j = 0; j < tokens2.length; j++) {
                        if (token == tokens2[j]) continue outer;
                    }
                    values.push(token);
                }
                return values;
            }
            function arrayClasses(classVal) {
                if (isArray(classVal)) {
                    return classVal;
                } else if (isString(classVal)) {
                    return classVal.split(" ");
                } else if (isObject(classVal)) {
                    var classes = [];
                    forEach(classVal, function(v, k) {
                        if (v) {
                            classes = classes.concat(k.split(" "));
                        }
                    });
                    return classes;
                }
                return classVal;
            }
        } ];
    }
    var ngClassDirective = classDirective("", true);
    var ngClassOddDirective = classDirective("Odd", 0);
    var ngClassEvenDirective = classDirective("Even", 1);
    var ngCloakDirective = ngDirective({
        compile: function(element, attr) {
            attr.$set("ngCloak", undefined);
            element.removeClass("ng-cloak");
        }
    });
    var ngControllerDirective = [ function() {
        return {
            restrict: "A",
            scope: true,
            controller: "@",
            priority: 500
        };
    } ];
    var ngEventDirectives = {};
    var forceAsyncEvents = {
        blur: true,
        focus: true
    };
    forEach("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "), function(eventName) {
        var directiveName = directiveNormalize("ng-" + eventName);
        ngEventDirectives[directiveName] = [ "$parse", "$rootScope", function($parse, $rootScope) {
            return {
                restrict: "A",
                compile: function($element, attr) {
                    var fn = $parse(attr[directiveName]);
                    return function ngEventHandler(scope, element) {
                        element.on(eventName, function(event) {
                            var callback = function() {
                                fn(scope, {
                                    $event: event
                                });
                            };
                            if (forceAsyncEvents[eventName] && $rootScope.$$phase) {
                                scope.$evalAsync(callback);
                            } else {
                                scope.$apply(callback);
                            }
                        });
                    };
                }
            };
        } ];
    });
    var ngIfDirective = [ "$animate", function($animate) {
        return {
            multiElement: true,
            transclude: "element",
            priority: 600,
            terminal: true,
            restrict: "A",
            $$tlb: true,
            link: function($scope, $element, $attr, ctrl, $transclude) {
                var block, childScope, previousElements;
                $scope.$watch($attr.ngIf, function ngIfWatchAction(value) {
                    if (value) {
                        if (!childScope) {
                            $transclude(function(clone, newScope) {
                                childScope = newScope;
                                clone[clone.length++] = document.createComment(" end ngIf: " + $attr.ngIf + " ");
                                block = {
                                    clone: clone
                                };
                                $animate.enter(clone, $element.parent(), $element);
                            });
                        }
                    } else {
                        if (previousElements) {
                            previousElements.remove();
                            previousElements = null;
                        }
                        if (childScope) {
                            childScope.$destroy();
                            childScope = null;
                        }
                        if (block) {
                            previousElements = getBlockNodes(block.clone);
                            $animate.leave(previousElements).then(function() {
                                previousElements = null;
                            });
                            block = null;
                        }
                    }
                });
            }
        };
    } ];
    var ngIncludeDirective = [ "$templateRequest", "$anchorScroll", "$animate", "$sce", function($templateRequest, $anchorScroll, $animate, $sce) {
        return {
            restrict: "ECA",
            priority: 400,
            terminal: true,
            transclude: "element",
            controller: angular.noop,
            compile: function(element, attr) {
                var srcExp = attr.ngInclude || attr.src, onloadExp = attr.onload || "", autoScrollExp = attr.autoscroll;
                return function(scope, $element, $attr, ctrl, $transclude) {
                    var changeCounter = 0, currentScope, previousElement, currentElement;
                    var cleanupLastIncludeContent = function() {
                        if (previousElement) {
                            previousElement.remove();
                            previousElement = null;
                        }
                        if (currentScope) {
                            currentScope.$destroy();
                            currentScope = null;
                        }
                        if (currentElement) {
                            $animate.leave(currentElement).then(function() {
                                previousElement = null;
                            });
                            previousElement = currentElement;
                            currentElement = null;
                        }
                    };
                    scope.$watch($sce.parseAsResourceUrl(srcExp), function ngIncludeWatchAction(src) {
                        var afterAnimation = function() {
                            if (isDefined(autoScrollExp) && (!autoScrollExp || scope.$eval(autoScrollExp))) {
                                $anchorScroll();
                            }
                        };
                        var thisChangeId = ++changeCounter;
                        if (src) {
                            $templateRequest(src, true).then(function(response) {
                                if (thisChangeId !== changeCounter) return;
                                var newScope = scope.$new();
                                ctrl.template = response;
                                var clone = $transclude(newScope, function(clone) {
                                    cleanupLastIncludeContent();
                                    $animate.enter(clone, null, $element).then(afterAnimation);
                                });
                                currentScope = newScope;
                                currentElement = clone;
                                currentScope.$emit("$includeContentLoaded", src);
                                scope.$eval(onloadExp);
                            }, function() {
                                if (thisChangeId === changeCounter) {
                                    cleanupLastIncludeContent();
                                    scope.$emit("$includeContentError", src);
                                }
                            });
                            scope.$emit("$includeContentRequested", src);
                        } else {
                            cleanupLastIncludeContent();
                            ctrl.template = null;
                        }
                    });
                };
            }
        };
    } ];
    var ngIncludeFillContentDirective = [ "$compile", function($compile) {
        return {
            restrict: "ECA",
            priority: -400,
            require: "ngInclude",
            link: function(scope, $element, $attr, ctrl) {
                if (/SVG/.test($element[0].toString())) {
                    $element.empty();
                    $compile(jqLiteBuildFragment(ctrl.template, document).childNodes)(scope, function namespaceAdaptedClone(clone) {
                        $element.append(clone);
                    }, undefined, undefined, $element);
                    return;
                }
                $element.html(ctrl.template);
                $compile($element.contents())(scope);
            }
        };
    } ];
    var ngInitDirective = ngDirective({
        priority: 450,
        compile: function() {
            return {
                pre: function(scope, element, attrs) {
                    scope.$eval(attrs.ngInit);
                }
            };
        }
    });
    var ngNonBindableDirective = ngDirective({
        terminal: true,
        priority: 1e3
    });
    var ngPluralizeDirective = [ "$locale", "$interpolate", function($locale, $interpolate) {
        var BRACE = /{}/g;
        return {
            restrict: "EA",
            link: function(scope, element, attr) {
                var numberExp = attr.count, whenExp = attr.$attr.when && element.attr(attr.$attr.when), offset = attr.offset || 0, whens = scope.$eval(whenExp) || {}, whensExpFns = {}, startSymbol = $interpolate.startSymbol(), endSymbol = $interpolate.endSymbol(), isWhen = /^when(Minus)?(.+)$/;
                forEach(attr, function(expression, attributeName) {
                    if (isWhen.test(attributeName)) {
                        whens[lowercase(attributeName.replace("when", "").replace("Minus", "-"))] = element.attr(attr.$attr[attributeName]);
                    }
                });
                forEach(whens, function(expression, key) {
                    whensExpFns[key] = $interpolate(expression.replace(BRACE, startSymbol + numberExp + "-" + offset + endSymbol));
                });
                scope.$watch(function ngPluralizeWatch() {
                    var value = parseFloat(scope.$eval(numberExp));
                    if (!isNaN(value)) {
                        if (!(value in whens)) value = $locale.pluralCat(value - offset);
                        return whensExpFns[value](scope);
                    } else {
                        return "";
                    }
                }, function ngPluralizeWatchAction(newVal) {
                    element.text(newVal);
                });
            }
        };
    } ];
    var ngRepeatDirective = [ "$parse", "$animate", function($parse, $animate) {
        var NG_REMOVED = "$$NG_REMOVED";
        var ngRepeatMinErr = minErr("ngRepeat");
        var updateScope = function(scope, index, valueIdentifier, value, keyIdentifier, key, arrayLength) {
            scope[valueIdentifier] = value;
            if (keyIdentifier) scope[keyIdentifier] = key;
            scope.$index = index;
            scope.$first = index === 0;
            scope.$last = index === arrayLength - 1;
            scope.$middle = !(scope.$first || scope.$last);
            scope.$odd = !(scope.$even = (index & 1) === 0);
        };
        var getBlockStart = function(block) {
            return block.clone[0];
        };
        var getBlockEnd = function(block) {
            return block.clone[block.clone.length - 1];
        };
        return {
            restrict: "A",
            multiElement: true,
            transclude: "element",
            priority: 1e3,
            terminal: true,
            $$tlb: true,
            compile: function ngRepeatCompile($element, $attr) {
                var expression = $attr.ngRepeat;
                var ngRepeatEndComment = document.createComment(" end ngRepeat: " + expression + " ");
                var match = expression.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);
                if (!match) {
                    throw ngRepeatMinErr("iexp", "Expected expression in form of '_item_ in _collection_[ track by _id_]' but got '{0}'.", expression);
                }
                var lhs = match[1];
                var rhs = match[2];
                var aliasAs = match[3];
                var trackByExp = match[4];
                match = lhs.match(/^(?:([\$\w]+)|\(([\$\w]+)\s*,\s*([\$\w]+)\))$/);
                if (!match) {
                    throw ngRepeatMinErr("iidexp", "'_item_' in '_item_ in _collection_' should be an identifier or '(_key_, _value_)' expression, but got '{0}'.", lhs);
                }
                var valueIdentifier = match[3] || match[1];
                var keyIdentifier = match[2];
                if (aliasAs && (!/^[$a-zA-Z_][$a-zA-Z0-9_]*$/.test(aliasAs) || /^(null|undefined|this|\$index|\$first|\$middle|\$last|\$even|\$odd|\$parent)$/.test(aliasAs))) {
                    throw ngRepeatMinErr("badident", "alias '{0}' is invalid --- must be a valid JS identifier which is not a reserved name.", aliasAs);
                }
                var trackByExpGetter, trackByIdExpFn, trackByIdArrayFn, trackByIdObjFn;
                var hashFnLocals = {
                    $id: hashKey
                };
                if (trackByExp) {
                    trackByExpGetter = $parse(trackByExp);
                } else {
                    trackByIdArrayFn = function(key, value) {
                        return hashKey(value);
                    };
                    trackByIdObjFn = function(key) {
                        return key;
                    };
                }
                return function ngRepeatLink($scope, $element, $attr, ctrl, $transclude) {
                    if (trackByExpGetter) {
                        trackByIdExpFn = function(key, value, index) {
                            if (keyIdentifier) hashFnLocals[keyIdentifier] = key;
                            hashFnLocals[valueIdentifier] = value;
                            hashFnLocals.$index = index;
                            return trackByExpGetter($scope, hashFnLocals);
                        };
                    }
                    var lastBlockMap = createMap();
                    $scope.$watchCollection(rhs, function ngRepeatAction(collection) {
                        var index, length, previousNode = $element[0], nextNode, nextBlockMap = createMap(), collectionLength, key, value, trackById, trackByIdFn, collectionKeys, block, nextBlockOrder, elementsToRemove;
                        if (aliasAs) {
                            $scope[aliasAs] = collection;
                        }
                        if (isArrayLike(collection)) {
                            collectionKeys = collection;
                            trackByIdFn = trackByIdExpFn || trackByIdArrayFn;
                        } else {
                            trackByIdFn = trackByIdExpFn || trackByIdObjFn;
                            collectionKeys = [];
                            for (var itemKey in collection) {
                                if (collection.hasOwnProperty(itemKey) && itemKey.charAt(0) != "$") {
                                    collectionKeys.push(itemKey);
                                }
                            }
                            collectionKeys.sort();
                        }
                        collectionLength = collectionKeys.length;
                        nextBlockOrder = new Array(collectionLength);
                        for (index = 0; index < collectionLength; index++) {
                            key = collection === collectionKeys ? index : collectionKeys[index];
                            value = collection[key];
                            trackById = trackByIdFn(key, value, index);
                            if (lastBlockMap[trackById]) {
                                block = lastBlockMap[trackById];
                                delete lastBlockMap[trackById];
                                nextBlockMap[trackById] = block;
                                nextBlockOrder[index] = block;
                            } else if (nextBlockMap[trackById]) {
                                forEach(nextBlockOrder, function(block) {
                                    if (block && block.scope) lastBlockMap[block.id] = block;
                                });
                                throw ngRepeatMinErr("dupes", "Duplicates in a repeater are not allowed. Use 'track by' expression to specify unique keys. Repeater: {0}, Duplicate key: {1}, Duplicate value: {2}", expression, trackById, toJson(value));
                            } else {
                                nextBlockOrder[index] = {
                                    id: trackById,
                                    scope: undefined,
                                    clone: undefined
                                };
                                nextBlockMap[trackById] = true;
                            }
                        }
                        for (var blockKey in lastBlockMap) {
                            block = lastBlockMap[blockKey];
                            elementsToRemove = getBlockNodes(block.clone);
                            $animate.leave(elementsToRemove);
                            if (elementsToRemove[0].parentNode) {
                                for (index = 0, length = elementsToRemove.length; index < length; index++) {
                                    elementsToRemove[index][NG_REMOVED] = true;
                                }
                            }
                            block.scope.$destroy();
                        }
                        for (index = 0; index < collectionLength; index++) {
                            key = collection === collectionKeys ? index : collectionKeys[index];
                            value = collection[key];
                            block = nextBlockOrder[index];
                            if (block.scope) {
                                nextNode = previousNode;
                                do {
                                    nextNode = nextNode.nextSibling;
                                } while (nextNode && nextNode[NG_REMOVED]);
                                if (getBlockStart(block) != nextNode) {
                                    $animate.move(getBlockNodes(block.clone), null, jqLite(previousNode));
                                }
                                previousNode = getBlockEnd(block);
                                updateScope(block.scope, index, valueIdentifier, value, keyIdentifier, key, collectionLength);
                            } else {
                                $transclude(function ngRepeatTransclude(clone, scope) {
                                    block.scope = scope;
                                    var endNode = ngRepeatEndComment.cloneNode(false);
                                    clone[clone.length++] = endNode;
                                    $animate.enter(clone, null, jqLite(previousNode));
                                    previousNode = endNode;
                                    block.clone = clone;
                                    nextBlockMap[block.id] = block;
                                    updateScope(block.scope, index, valueIdentifier, value, keyIdentifier, key, collectionLength);
                                });
                            }
                        }
                        lastBlockMap = nextBlockMap;
                    });
                };
            }
        };
    } ];
    var NG_HIDE_CLASS = "ng-hide";
    var NG_HIDE_IN_PROGRESS_CLASS = "ng-hide-animate";
    var ngShowDirective = [ "$animate", function($animate) {
        return {
            restrict: "A",
            multiElement: true,
            link: function(scope, element, attr) {
                scope.$watch(attr.ngShow, function ngShowWatchAction(value) {
                    $animate[value ? "removeClass" : "addClass"](element, NG_HIDE_CLASS, {
                        tempClasses: NG_HIDE_IN_PROGRESS_CLASS
                    });
                });
            }
        };
    } ];
    var ngHideDirective = [ "$animate", function($animate) {
        return {
            restrict: "A",
            multiElement: true,
            link: function(scope, element, attr) {
                scope.$watch(attr.ngHide, function ngHideWatchAction(value) {
                    $animate[value ? "addClass" : "removeClass"](element, NG_HIDE_CLASS, {
                        tempClasses: NG_HIDE_IN_PROGRESS_CLASS
                    });
                });
            }
        };
    } ];
    var ngStyleDirective = ngDirective(function(scope, element, attr) {
        scope.$watch(attr.ngStyle, function ngStyleWatchAction(newStyles, oldStyles) {
            if (oldStyles && newStyles !== oldStyles) {
                forEach(oldStyles, function(val, style) {
                    element.css(style, "");
                });
            }
            if (newStyles) element.css(newStyles);
        }, true);
    });
    var ngSwitchDirective = [ "$animate", function($animate) {
        return {
            restrict: "EA",
            require: "ngSwitch",
            controller: [ "$scope", function ngSwitchController() {
                this.cases = {};
            } ],
            link: function(scope, element, attr, ngSwitchController) {
                var watchExpr = attr.ngSwitch || attr.on, selectedTranscludes = [], selectedElements = [], previousLeaveAnimations = [], selectedScopes = [];
                var spliceFactory = function(array, index) {
                    return function() {
                        array.splice(index, 1);
                    };
                };
                scope.$watch(watchExpr, function ngSwitchWatchAction(value) {
                    var i, ii;
                    for (i = 0, ii = previousLeaveAnimations.length; i < ii; ++i) {
                        $animate.cancel(previousLeaveAnimations[i]);
                    }
                    previousLeaveAnimations.length = 0;
                    for (i = 0, ii = selectedScopes.length; i < ii; ++i) {
                        var selected = getBlockNodes(selectedElements[i].clone);
                        selectedScopes[i].$destroy();
                        var promise = previousLeaveAnimations[i] = $animate.leave(selected);
                        promise.then(spliceFactory(previousLeaveAnimations, i));
                    }
                    selectedElements.length = 0;
                    selectedScopes.length = 0;
                    if (selectedTranscludes = ngSwitchController.cases["!" + value] || ngSwitchController.cases["?"]) {
                        forEach(selectedTranscludes, function(selectedTransclude) {
                            selectedTransclude.transclude(function(caseElement, selectedScope) {
                                selectedScopes.push(selectedScope);
                                var anchor = selectedTransclude.element;
                                caseElement[caseElement.length++] = document.createComment(" end ngSwitchWhen: ");
                                var block = {
                                    clone: caseElement
                                };
                                selectedElements.push(block);
                                $animate.enter(caseElement, anchor.parent(), anchor);
                            });
                        });
                    }
                });
            }
        };
    } ];
    var ngSwitchWhenDirective = ngDirective({
        transclude: "element",
        priority: 1200,
        require: "^ngSwitch",
        multiElement: true,
        link: function(scope, element, attrs, ctrl, $transclude) {
            ctrl.cases["!" + attrs.ngSwitchWhen] = ctrl.cases["!" + attrs.ngSwitchWhen] || [];
            ctrl.cases["!" + attrs.ngSwitchWhen].push({
                transclude: $transclude,
                element: element
            });
        }
    });
    var ngSwitchDefaultDirective = ngDirective({
        transclude: "element",
        priority: 1200,
        require: "^ngSwitch",
        multiElement: true,
        link: function(scope, element, attr, ctrl, $transclude) {
            ctrl.cases["?"] = ctrl.cases["?"] || [];
            ctrl.cases["?"].push({
                transclude: $transclude,
                element: element
            });
        }
    });
    var ngTranscludeDirective = ngDirective({
        restrict: "EAC",
        link: function($scope, $element, $attrs, controller, $transclude) {
            if (!$transclude) {
                throw minErr("ngTransclude")("orphan", "Illegal use of ngTransclude directive in the template! " + "No parent directive that requires a transclusion found. " + "Element: {0}", startingTag($element));
            }
            $transclude(function(clone) {
                $element.empty();
                $element.append(clone);
            });
        }
    });
    var scriptDirective = [ "$templateCache", function($templateCache) {
        return {
            restrict: "E",
            terminal: true,
            compile: function(element, attr) {
                if (attr.type == "text/ng-template") {
                    var templateUrl = attr.id, text = element[0].text;
                    $templateCache.put(templateUrl, text);
                }
            }
        };
    } ];
    var ngOptionsMinErr = minErr("ngOptions");
    var ngOptionsDirective = valueFn({
        restrict: "A",
        terminal: true
    });
    var selectDirective = [ "$compile", "$parse", function($compile, $parse) {
        var NG_OPTIONS_REGEXP = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/, nullModelCtrl = {
            $setViewValue: noop
        };
        return {
            restrict: "E",
            require: [ "select", "?ngModel" ],
            controller: [ "$element", "$scope", "$attrs", function($element, $scope, $attrs) {
                var self = this, optionsMap = {}, ngModelCtrl = nullModelCtrl, nullOption, unknownOption;
                self.databound = $attrs.ngModel;
                self.init = function(ngModelCtrl_, nullOption_, unknownOption_) {
                    ngModelCtrl = ngModelCtrl_;
                    nullOption = nullOption_;
                    unknownOption = unknownOption_;
                };
                self.addOption = function(value, element) {
                    assertNotHasOwnProperty(value, '"option value"');
                    optionsMap[value] = true;
                    if (ngModelCtrl.$viewValue == value) {
                        $element.val(value);
                        if (unknownOption.parent()) unknownOption.remove();
                    }
                    if (element && element[0].hasAttribute("selected")) {
                        element[0].selected = true;
                    }
                };
                self.removeOption = function(value) {
                    if (this.hasOption(value)) {
                        delete optionsMap[value];
                        if (ngModelCtrl.$viewValue == value) {
                            this.renderUnknownOption(value);
                        }
                    }
                };
                self.renderUnknownOption = function(val) {
                    var unknownVal = "? " + hashKey(val) + " ?";
                    unknownOption.val(unknownVal);
                    $element.prepend(unknownOption);
                    $element.val(unknownVal);
                    unknownOption.prop("selected", true);
                };
                self.hasOption = function(value) {
                    return optionsMap.hasOwnProperty(value);
                };
                $scope.$on("$destroy", function() {
                    self.renderUnknownOption = noop;
                });
            } ],
            link: function(scope, element, attr, ctrls) {
                if (!ctrls[1]) return;
                var selectCtrl = ctrls[0], ngModelCtrl = ctrls[1], multiple = attr.multiple, optionsExp = attr.ngOptions, nullOption = false, emptyOption, renderScheduled = false, optionTemplate = jqLite(document.createElement("option")), optGroupTemplate = jqLite(document.createElement("optgroup")), unknownOption = optionTemplate.clone();
                for (var i = 0, children = element.children(), ii = children.length; i < ii; i++) {
                    if (children[i].value === "") {
                        emptyOption = nullOption = children.eq(i);
                        break;
                    }
                }
                selectCtrl.init(ngModelCtrl, nullOption, unknownOption);
                if (multiple) {
                    ngModelCtrl.$isEmpty = function(value) {
                        return !value || value.length === 0;
                    };
                }
                if (optionsExp) setupAsOptions(scope, element, ngModelCtrl); else if (multiple) setupAsMultiple(scope, element, ngModelCtrl); else setupAsSingle(scope, element, ngModelCtrl, selectCtrl);
                function setupAsSingle(scope, selectElement, ngModelCtrl, selectCtrl) {
                    ngModelCtrl.$render = function() {
                        var viewValue = ngModelCtrl.$viewValue;
                        if (selectCtrl.hasOption(viewValue)) {
                            if (unknownOption.parent()) unknownOption.remove();
                            selectElement.val(viewValue);
                            if (viewValue === "") emptyOption.prop("selected", true);
                        } else {
                            if (isUndefined(viewValue) && emptyOption) {
                                selectElement.val("");
                            } else {
                                selectCtrl.renderUnknownOption(viewValue);
                            }
                        }
                    };
                    selectElement.on("change", function() {
                        scope.$apply(function() {
                            if (unknownOption.parent()) unknownOption.remove();
                            ngModelCtrl.$setViewValue(selectElement.val());
                        });
                    });
                }
                function setupAsMultiple(scope, selectElement, ctrl) {
                    var lastView;
                    ctrl.$render = function() {
                        var items = new HashMap(ctrl.$viewValue);
                        forEach(selectElement.find("option"), function(option) {
                            option.selected = isDefined(items.get(option.value));
                        });
                    };
                    scope.$watch(function selectMultipleWatch() {
                        if (!equals(lastView, ctrl.$viewValue)) {
                            lastView = shallowCopy(ctrl.$viewValue);
                            ctrl.$render();
                        }
                    });
                    selectElement.on("change", function() {
                        scope.$apply(function() {
                            var array = [];
                            forEach(selectElement.find("option"), function(option) {
                                if (option.selected) {
                                    array.push(option.value);
                                }
                            });
                            ctrl.$setViewValue(array);
                        });
                    });
                }
                function setupAsOptions(scope, selectElement, ctrl) {
                    var match;
                    if (!(match = optionsExp.match(NG_OPTIONS_REGEXP))) {
                        throw ngOptionsMinErr("iexp", "Expected expression in form of " + "'_select_ (as _label_)? for (_key_,)?_value_ in _collection_'" + " but got '{0}'. Element: {1}", optionsExp, startingTag(selectElement));
                    }
                    var displayFn = $parse(match[2] || match[1]), valueName = match[4] || match[6], selectAs = / as /.test(match[0]) && match[1], selectAsFn = selectAs ? $parse(selectAs) : null, keyName = match[5], groupByFn = $parse(match[3] || ""), valueFn = $parse(match[2] ? match[1] : valueName), valuesFn = $parse(match[7]), track = match[8], trackFn = track ? $parse(match[8]) : null, trackKeysCache = {}, optionGroupsCache = [ [ {
                        element: selectElement,
                        label: ""
                    } ] ], locals = {};
                    if (nullOption) {
                        $compile(nullOption)(scope);
                        nullOption.removeClass("ng-scope");
                        nullOption.remove();
                    }
                    selectElement.empty();
                    selectElement.on("change", selectionChanged);
                    ctrl.$render = render;
                    scope.$watchCollection(valuesFn, scheduleRendering);
                    scope.$watchCollection(getLabels, scheduleRendering);
                    if (multiple) {
                        scope.$watchCollection(function() {
                            return ctrl.$modelValue;
                        }, scheduleRendering);
                    }
                    function callExpression(exprFn, key, value) {
                        locals[valueName] = value;
                        if (keyName) locals[keyName] = key;
                        return exprFn(scope, locals);
                    }
                    function selectionChanged() {
                        scope.$apply(function() {
                            var collection = valuesFn(scope) || [];
                            var viewValue;
                            if (multiple) {
                                viewValue = [];
                                forEach(selectElement.val(), function(selectedKey) {
                                    selectedKey = trackFn ? trackKeysCache[selectedKey] : selectedKey;
                                    viewValue.push(getViewValue(selectedKey, collection[selectedKey]));
                                });
                            } else {
                                var selectedKey = trackFn ? trackKeysCache[selectElement.val()] : selectElement.val();
                                viewValue = getViewValue(selectedKey, collection[selectedKey]);
                            }
                            ctrl.$setViewValue(viewValue);
                            render();
                        });
                    }
                    function getViewValue(key, value) {
                        if (key === "?") {
                            return undefined;
                        } else if (key === "") {
                            return null;
                        } else {
                            var viewValueFn = selectAsFn ? selectAsFn : valueFn;
                            return callExpression(viewValueFn, key, value);
                        }
                    }
                    function getLabels() {
                        var values = valuesFn(scope);
                        var toDisplay;
                        if (values && isArray(values)) {
                            toDisplay = new Array(values.length);
                            for (var i = 0, ii = values.length; i < ii; i++) {
                                toDisplay[i] = callExpression(displayFn, i, values[i]);
                            }
                            return toDisplay;
                        } else if (values) {
                            toDisplay = {};
                            for (var prop in values) {
                                if (values.hasOwnProperty(prop)) {
                                    toDisplay[prop] = callExpression(displayFn, prop, values[prop]);
                                }
                            }
                        }
                        return toDisplay;
                    }
                    function createIsSelectedFn(viewValue) {
                        var selectedSet;
                        if (multiple) {
                            if (trackFn && isArray(viewValue)) {
                                selectedSet = new HashMap([]);
                                for (var trackIndex = 0; trackIndex < viewValue.length; trackIndex++) {
                                    selectedSet.put(callExpression(trackFn, null, viewValue[trackIndex]), true);
                                }
                            } else {
                                selectedSet = new HashMap(viewValue);
                            }
                        } else if (trackFn) {
                            viewValue = callExpression(trackFn, null, viewValue);
                        }
                        return function isSelected(key, value) {
                            var compareValueFn;
                            if (trackFn) {
                                compareValueFn = trackFn;
                            } else if (selectAsFn) {
                                compareValueFn = selectAsFn;
                            } else {
                                compareValueFn = valueFn;
                            }
                            if (multiple) {
                                return isDefined(selectedSet.remove(callExpression(compareValueFn, key, value)));
                            } else {
                                return viewValue == callExpression(compareValueFn, key, value);
                            }
                        };
                    }
                    function scheduleRendering() {
                        if (!renderScheduled) {
                            scope.$$postDigest(render);
                            renderScheduled = true;
                        }
                    }
                    function updateLabelMap(labelMap, label, added) {
                        labelMap[label] = labelMap[label] || 0;
                        labelMap[label] += added ? 1 : -1;
                    }
                    function render() {
                        renderScheduled = false;
                        var optionGroups = {
                            "": []
                        }, optionGroupNames = [ "" ], optionGroupName, optionGroup, option, existingParent, existingOptions, existingOption, viewValue = ctrl.$viewValue, values = valuesFn(scope) || [], keys = keyName ? sortedKeys(values) : values, key, value, groupLength, length, groupIndex, index, labelMap = {}, selected, isSelected = createIsSelectedFn(viewValue), anySelected = false, lastElement, element, label, optionId;
                        trackKeysCache = {};
                        for (index = 0; length = keys.length, index < length; index++) {
                            key = index;
                            if (keyName) {
                                key = keys[index];
                                if (key.charAt(0) === "$") continue;
                            }
                            value = values[key];
                            optionGroupName = callExpression(groupByFn, key, value) || "";
                            if (!(optionGroup = optionGroups[optionGroupName])) {
                                optionGroup = optionGroups[optionGroupName] = [];
                                optionGroupNames.push(optionGroupName);
                            }
                            selected = isSelected(key, value);
                            anySelected = anySelected || selected;
                            label = callExpression(displayFn, key, value);
                            label = isDefined(label) ? label : "";
                            optionId = trackFn ? trackFn(scope, locals) : keyName ? keys[index] : index;
                            if (trackFn) {
                                trackKeysCache[optionId] = key;
                            }
                            optionGroup.push({
                                id: optionId,
                                label: label,
                                selected: selected
                            });
                        }
                        if (!multiple) {
                            if (nullOption || viewValue === null) {
                                optionGroups[""].unshift({
                                    id: "",
                                    label: "",
                                    selected: !anySelected
                                });
                            } else if (!anySelected) {
                                optionGroups[""].unshift({
                                    id: "?",
                                    label: "",
                                    selected: true
                                });
                            }
                        }
                        for (groupIndex = 0, groupLength = optionGroupNames.length; groupIndex < groupLength; groupIndex++) {
                            optionGroupName = optionGroupNames[groupIndex];
                            optionGroup = optionGroups[optionGroupName];
                            if (optionGroupsCache.length <= groupIndex) {
                                existingParent = {
                                    element: optGroupTemplate.clone().attr("label", optionGroupName),
                                    label: optionGroup.label
                                };
                                existingOptions = [ existingParent ];
                                optionGroupsCache.push(existingOptions);
                                selectElement.append(existingParent.element);
                            } else {
                                existingOptions = optionGroupsCache[groupIndex];
                                existingParent = existingOptions[0];
                                if (existingParent.label != optionGroupName) {
                                    existingParent.element.attr("label", existingParent.label = optionGroupName);
                                }
                            }
                            lastElement = null;
                            for (index = 0, length = optionGroup.length; index < length; index++) {
                                option = optionGroup[index];
                                if (existingOption = existingOptions[index + 1]) {
                                    lastElement = existingOption.element;
                                    if (existingOption.label !== option.label) {
                                        updateLabelMap(labelMap, existingOption.label, false);
                                        updateLabelMap(labelMap, option.label, true);
                                        lastElement.text(existingOption.label = option.label);
                                    }
                                    if (existingOption.id !== option.id) {
                                        lastElement.val(existingOption.id = option.id);
                                    }
                                    if (lastElement[0].selected !== option.selected) {
                                        lastElement.prop("selected", existingOption.selected = option.selected);
                                        if (msie) {
                                            lastElement.prop("selected", existingOption.selected);
                                        }
                                    }
                                } else {
                                    if (option.id === "" && nullOption) {
                                        element = nullOption;
                                    } else {
                                        (element = optionTemplate.clone()).val(option.id).prop("selected", option.selected).attr("selected", option.selected).text(option.label);
                                    }
                                    existingOptions.push(existingOption = {
                                        element: element,
                                        label: option.label,
                                        id: option.id,
                                        selected: option.selected
                                    });
                                    updateLabelMap(labelMap, option.label, true);
                                    if (lastElement) {
                                        lastElement.after(element);
                                    } else {
                                        existingParent.element.append(element);
                                    }
                                    lastElement = element;
                                }
                            }
                            index++;
                            while (existingOptions.length > index) {
                                option = existingOptions.pop();
                                updateLabelMap(labelMap, option.label, false);
                                option.element.remove();
                            }
                            forEach(labelMap, function(count, label) {
                                if (count > 0) {
                                    selectCtrl.addOption(label);
                                } else if (count < 0) {
                                    selectCtrl.removeOption(label);
                                }
                            });
                        }
                        while (optionGroupsCache.length > groupIndex) {
                            optionGroupsCache.pop()[0].element.remove();
                        }
                    }
                }
            }
        };
    } ];
    var optionDirective = [ "$interpolate", function($interpolate) {
        var nullSelectCtrl = {
            addOption: noop,
            removeOption: noop
        };
        return {
            restrict: "E",
            priority: 100,
            compile: function(element, attr) {
                if (isUndefined(attr.value)) {
                    var interpolateFn = $interpolate(element.text(), true);
                    if (!interpolateFn) {
                        attr.$set("value", element.text());
                    }
                }
                return function(scope, element, attr) {
                    var selectCtrlName = "$selectController", parent = element.parent(), selectCtrl = parent.data(selectCtrlName) || parent.parent().data(selectCtrlName);
                    if (!selectCtrl || !selectCtrl.databound) {
                        selectCtrl = nullSelectCtrl;
                    }
                    if (interpolateFn) {
                        scope.$watch(interpolateFn, function interpolateWatchAction(newVal, oldVal) {
                            attr.$set("value", newVal);
                            if (oldVal !== newVal) {
                                selectCtrl.removeOption(oldVal);
                            }
                            selectCtrl.addOption(newVal, element);
                        });
                    } else {
                        selectCtrl.addOption(attr.value, element);
                    }
                    element.on("$destroy", function() {
                        selectCtrl.removeOption(attr.value);
                    });
                };
            }
        };
    } ];
    var styleDirective = valueFn({
        restrict: "E",
        terminal: false
    });
    if (window.angular.bootstrap) {
        console.log("WARNING: Tried to load angular more than once.");
        return;
    }
    bindJQuery();
    publishExternalAPI(angular);
    jqLite(document).ready(function() {
        angularInit(document, bootstrap);
    });
})(window, document);

!window.angular.$$csp() && window.angular.element(document).find("head").prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide:not(.ng-hide-animate){display:none !important;}ng\\:form{display:block;}</style>');

+function($) {
    "use strict";
    var Affix = function(element, options) {
        this.options = $.extend({}, Affix.DEFAULTS, options);
        this.$window = $(window).on("scroll.bs.affix.data-api", $.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", $.proxy(this.checkPositionWithEventLoop, this));
        this.$element = $(element);
        this.affixed = this.unpin = this.pinnedOffset = null;
        this.checkPosition();
    };
    Affix.RESET = "affix affix-top affix-bottom";
    Affix.DEFAULTS = {
        offset: 0
    };
    Affix.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(Affix.RESET).addClass("affix");
        var scrollTop = this.$window.scrollTop();
        var position = this.$element.offset();
        return this.pinnedOffset = position.top - scrollTop;
    };
    Affix.prototype.checkPositionWithEventLoop = function() {
        setTimeout($.proxy(this.checkPosition, this), 1);
    };
    Affix.prototype.checkPosition = function() {
        if (!this.$element.is(":visible")) return;
        var scrollHeight = $(document).height();
        var scrollTop = this.$window.scrollTop();
        var position = this.$element.offset();
        var offset = this.options.offset;
        var offsetTop = offset.top;
        var offsetBottom = offset.bottom;
        if (typeof offset != "object") offsetBottom = offsetTop = offset;
        if (typeof offsetTop == "function") offsetTop = offset.top(this.$element);
        if (typeof offsetBottom == "function") offsetBottom = offset.bottom(this.$element);
        var affix = this.unpin != null && scrollTop + this.unpin <= position.top ? false : offsetBottom != null && position.top + this.$element.height() >= scrollHeight - offsetBottom ? "bottom" : offsetTop != null && scrollTop <= offsetTop ? "top" : false;
        if (this.affixed === affix) return;
        if (this.unpin != null) this.$element.css("top", "");
        var affixType = "affix" + (affix ? "-" + affix : "");
        var e = $.Event(affixType + ".bs.affix");
        this.$element.trigger(e);
        if (e.isDefaultPrevented()) return;
        this.affixed = affix;
        this.unpin = affix == "bottom" ? this.getPinnedOffset() : null;
        this.$element.removeClass(Affix.RESET).addClass(affixType).trigger($.Event(affixType.replace("affix", "affixed")));
        if (affix == "bottom") {
            this.$element.offset({
                top: position.top
            });
        }
    };
    var old = $.fn.affix;
    $.fn.affix = function(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data("bs.affix");
            var options = typeof option == "object" && option;
            if (!data) $this.data("bs.affix", data = new Affix(this, options));
            if (typeof option == "string") data[option]();
        });
    };
    $.fn.affix.Constructor = Affix;
    $.fn.affix.noConflict = function() {
        $.fn.affix = old;
        return this;
    };
    $(window).on("load", function() {
        $('[data-spy="affix"]').each(function() {
            var $spy = $(this);
            var data = $spy.data();
            data.offset = data.offset || {};
            if (data.offsetBottom) data.offset.bottom = data.offsetBottom;
            if (data.offsetTop) data.offset.top = data.offsetTop;
            $spy.affix(data);
        });
    });
}(jQuery);

+function($) {
    "use strict";
    var dismiss = '[data-dismiss="alert"]';
    var Alert = function(el) {
        $(el).on("click", dismiss, this.close);
    };
    Alert.prototype.close = function(e) {
        var $this = $(this);
        var selector = $this.attr("data-target");
        if (!selector) {
            selector = $this.attr("href");
            selector = selector && selector.replace(/.*(?=#[^\s]*$)/, "");
        }
        var $parent = $(selector);
        if (e) e.preventDefault();
        if (!$parent.length) {
            $parent = $this.hasClass("alert") ? $this : $this.parent();
        }
        $parent.trigger(e = $.Event("close.bs.alert"));
        if (e.isDefaultPrevented()) return;
        $parent.removeClass("in");
        function removeElement() {
            $parent.trigger("closed.bs.alert").remove();
        }
        $.support.transition && $parent.hasClass("fade") ? $parent.one($.support.transition.end, removeElement).emulateTransitionEnd(150) : removeElement();
    };
    var old = $.fn.alert;
    $.fn.alert = function(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data("bs.alert");
            if (!data) $this.data("bs.alert", data = new Alert(this));
            if (typeof option == "string") data[option].call($this);
        });
    };
    $.fn.alert.Constructor = Alert;
    $.fn.alert.noConflict = function() {
        $.fn.alert = old;
        return this;
    };
    $(document).on("click.bs.alert.data-api", dismiss, Alert.prototype.close);
}(jQuery);

+function($) {
    "use strict";
    var Button = function(element, options) {
        this.$element = $(element);
        this.options = $.extend({}, Button.DEFAULTS, options);
        this.isLoading = false;
    };
    Button.DEFAULTS = {
        loadingText: "loading..."
    };
    Button.prototype.setState = function(state) {
        var d = "disabled";
        var $el = this.$element;
        var val = $el.is("input") ? "val" : "html";
        var data = $el.data();
        state = state + "Text";
        if (!data.resetText) $el.data("resetText", $el[val]());
        $el[val](data[state] || this.options[state]);
        setTimeout($.proxy(function() {
            if (state == "loadingText") {
                this.isLoading = true;
                $el.addClass(d).attr(d, d);
            } else if (this.isLoading) {
                this.isLoading = false;
                $el.removeClass(d).removeAttr(d);
            }
        }, this), 0);
    };
    Button.prototype.toggle = function() {
        var changed = true;
        var $parent = this.$element.closest('[data-toggle="buttons"]');
        if ($parent.length) {
            var $input = this.$element.find("input");
            if ($input.prop("type") == "radio") {
                if ($input.prop("checked") && this.$element.hasClass("active")) changed = false; else $parent.find(".active").removeClass("active");
            }
            if (changed) $input.prop("checked", !this.$element.hasClass("active")).trigger("change");
        }
        if (changed) this.$element.toggleClass("active");
    };
    var old = $.fn.button;
    $.fn.button = function(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data("bs.button");
            var options = typeof option == "object" && option;
            if (!data) $this.data("bs.button", data = new Button(this, options));
            if (option == "toggle") data.toggle(); else if (option) data.setState(option);
        });
    };
    $.fn.button.Constructor = Button;
    $.fn.button.noConflict = function() {
        $.fn.button = old;
        return this;
    };
    $(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(e) {
        var $btn = $(e.target);
        if (!$btn.hasClass("btn")) $btn = $btn.closest(".btn");
        $btn.button("toggle");
        e.preventDefault();
    });
}(jQuery);

+function($) {
    "use strict";
    var Carousel = function(element, options) {
        this.$element = $(element);
        this.$indicators = this.$element.find(".carousel-indicators");
        this.options = options;
        this.paused = this.sliding = this.interval = this.$active = this.$items = null;
        this.options.pause == "hover" && this.$element.on("mouseenter", $.proxy(this.pause, this)).on("mouseleave", $.proxy(this.cycle, this));
    };
    Carousel.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: true
    };
    Carousel.prototype.cycle = function(e) {
        e || (this.paused = false);
        this.interval && clearInterval(this.interval);
        this.options.interval && !this.paused && (this.interval = setInterval($.proxy(this.next, this), this.options.interval));
        return this;
    };
    Carousel.prototype.getActiveIndex = function() {
        this.$active = this.$element.find(".item.active");
        this.$items = this.$active.parent().children(".item");
        return this.$items.index(this.$active);
    };
    Carousel.prototype.to = function(pos) {
        var that = this;
        var activeIndex = this.getActiveIndex();
        if (pos > this.$items.length - 1 || pos < 0) return;
        if (this.sliding) return this.$element.one("slid.bs.carousel", function() {
            that.to(pos);
        });
        if (activeIndex == pos) return this.pause().cycle();
        return this.slide(pos > activeIndex ? "next" : "prev", $(this.$items[pos]));
    };
    Carousel.prototype.pause = function(e) {
        e || (this.paused = true);
        if (this.$element.find(".next, .prev").length && $.support.transition) {
            this.$element.trigger($.support.transition.end);
            this.cycle(true);
        }
        this.interval = clearInterval(this.interval);
        return this;
    };
    Carousel.prototype.next = function() {
        if (this.sliding) return;
        return this.slide("next");
    };
    Carousel.prototype.prev = function() {
        if (this.sliding) return;
        return this.slide("prev");
    };
    Carousel.prototype.slide = function(type, next) {
        var $active = this.$element.find(".item.active");
        var $next = next || $active[type]();
        var isCycling = this.interval;
        var direction = type == "next" ? "left" : "right";
        var fallback = type == "next" ? "first" : "last";
        var that = this;
        if (!$next.length) {
            if (!this.options.wrap) return;
            $next = this.$element.find(".item")[fallback]();
        }
        if ($next.hasClass("active")) return this.sliding = false;
        var e = $.Event("slide.bs.carousel", {
            relatedTarget: $next[0],
            direction: direction
        });
        this.$element.trigger(e);
        if (e.isDefaultPrevented()) return;
        this.sliding = true;
        isCycling && this.pause();
        if (this.$indicators.length) {
            this.$indicators.find(".active").removeClass("active");
            this.$element.one("slid.bs.carousel", function() {
                var $nextIndicator = $(that.$indicators.children()[that.getActiveIndex()]);
                $nextIndicator && $nextIndicator.addClass("active");
            });
        }
        if ($.support.transition && this.$element.hasClass("slide")) {
            $next.addClass(type);
            $next[0].offsetWidth;
            $active.addClass(direction);
            $next.addClass(direction);
            $active.one($.support.transition.end, function() {
                $next.removeClass([ type, direction ].join(" ")).addClass("active");
                $active.removeClass([ "active", direction ].join(" "));
                that.sliding = false;
                setTimeout(function() {
                    that.$element.trigger("slid.bs.carousel");
                }, 0);
            }).emulateTransitionEnd($active.css("transition-duration").slice(0, -1) * 1e3);
        } else {
            $active.removeClass("active");
            $next.addClass("active");
            this.sliding = false;
            this.$element.trigger("slid.bs.carousel");
        }
        isCycling && this.cycle();
        return this;
    };
    var old = $.fn.carousel;
    $.fn.carousel = function(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data("bs.carousel");
            var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == "object" && option);
            var action = typeof option == "string" ? option : options.slide;
            if (!data) $this.data("bs.carousel", data = new Carousel(this, options));
            if (typeof option == "number") data.to(option); else if (action) data[action](); else if (options.interval) data.pause().cycle();
        });
    };
    $.fn.carousel.Constructor = Carousel;
    $.fn.carousel.noConflict = function() {
        $.fn.carousel = old;
        return this;
    };
    $(document).on("click.bs.carousel.data-api", "[data-slide], [data-slide-to]", function(e) {
        var $this = $(this), href;
        var $target = $($this.attr("data-target") || (href = $this.attr("href")) && href.replace(/.*(?=#[^\s]+$)/, ""));
        var options = $.extend({}, $target.data(), $this.data());
        var slideIndex = $this.attr("data-slide-to");
        if (slideIndex) options.interval = false;
        $target.carousel(options);
        if (slideIndex = $this.attr("data-slide-to")) {
            $target.data("bs.carousel").to(slideIndex);
        }
        e.preventDefault();
    });
    $(window).on("load", function() {
        $('[data-ride="carousel"]').each(function() {
            var $carousel = $(this);
            $carousel.carousel($carousel.data());
        });
    });
}(jQuery);

+function($) {
    "use strict";
    var Collapse = function(element, options) {
        this.$element = $(element);
        this.options = $.extend({}, Collapse.DEFAULTS, options);
        this.transitioning = null;
        if (this.options.parent) this.$parent = $(this.options.parent);
        if (this.options.toggle) this.toggle();
    };
    Collapse.DEFAULTS = {
        toggle: true
    };
    Collapse.prototype.dimension = function() {
        var hasWidth = this.$element.hasClass("width");
        return hasWidth ? "width" : "height";
    };
    Collapse.prototype.show = function() {
        if (this.transitioning || this.$element.hasClass("in")) return;
        var startEvent = $.Event("show.bs.collapse");
        this.$element.trigger(startEvent);
        if (startEvent.isDefaultPrevented()) return;
        var actives = this.$parent && this.$parent.find("> .panel > .in");
        if (actives && actives.length) {
            var hasData = actives.data("bs.collapse");
            if (hasData && hasData.transitioning) return;
            actives.collapse("hide");
            hasData || actives.data("bs.collapse", null);
        }
        var dimension = this.dimension();
        this.$element.removeClass("collapse").addClass("collapsing")[dimension](0);
        this.transitioning = 1;
        var complete = function(e) {
            if (e && e.target != this.$element[0]) {
                this.$element.one($.support.transition.end, $.proxy(complete, this));
                return;
            }
            this.$element.removeClass("collapsing").addClass("collapse in")[dimension]("");
            this.transitioning = 0;
            this.$element.trigger("shown.bs.collapse");
        };
        if (!$.support.transition) return complete.call(this);
        var scrollSize = $.camelCase([ "scroll", dimension ].join("-"));
        this.$element.one($.support.transition.end, $.proxy(complete, this)).emulateTransitionEnd(350)[dimension](this.$element[0][scrollSize]);
    };
    Collapse.prototype.hide = function() {
        if (this.transitioning || !this.$element.hasClass("in")) return;
        var startEvent = $.Event("hide.bs.collapse");
        this.$element.trigger(startEvent);
        if (startEvent.isDefaultPrevented()) return;
        var dimension = this.dimension();
        this.$element[dimension](this.$element[dimension]())[0].offsetHeight;
        this.$element.addClass("collapsing").removeClass("collapse").removeClass("in");
        this.transitioning = 1;
        var complete = function(e) {
            if (e && e.target != this.$element[0]) {
                this.$element.one($.support.transition.end, $.proxy(complete, this));
                return;
            }
            this.transitioning = 0;
            this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse");
        };
        if (!$.support.transition) return complete.call(this);
        this.$element[dimension](0).one($.support.transition.end, $.proxy(complete, this)).emulateTransitionEnd(350);
    };
    Collapse.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]();
    };
    var old = $.fn.collapse;
    $.fn.collapse = function(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data("bs.collapse");
            var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == "object" && option);
            if (!data && options.toggle && option == "show") option = !option;
            if (!data) $this.data("bs.collapse", data = new Collapse(this, options));
            if (typeof option == "string") data[option]();
        });
    };
    $.fn.collapse.Constructor = Collapse;
    $.fn.collapse.noConflict = function() {
        $.fn.collapse = old;
        return this;
    };
    $(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(e) {
        var $this = $(this), href;
        var target = $this.attr("data-target") || e.preventDefault() || (href = $this.attr("href")) && href.replace(/.*(?=#[^\s]+$)/, "");
        var $target = $(target);
        var data = $target.data("bs.collapse");
        var option = data ? "toggle" : $this.data();
        var parent = $this.attr("data-parent");
        var $parent = parent && $(parent);
        if (!data || !data.transitioning) {
            if ($parent) $parent.find('[data-toggle="collapse"][data-parent="' + parent + '"]').not($this).addClass("collapsed");
            $this[$target.hasClass("in") ? "addClass" : "removeClass"]("collapsed");
        }
        $target.collapse(option);
    });
}(jQuery);

+function($) {
    "use strict";
    var backdrop = ".dropdown-backdrop";
    var toggle = '[data-toggle="dropdown"]';
    var Dropdown = function(element) {
        $(element).on("click.bs.dropdown", this.toggle);
    };
    Dropdown.prototype.toggle = function(e) {
        var $this = $(this);
        if ($this.is(".disabled, :disabled")) return;
        var $parent = getParent($this);
        var isActive = $parent.hasClass("open");
        clearMenus();
        if (!isActive) {
            if ("ontouchstart" in document.documentElement && !$parent.closest(".navbar-nav").length) {
                $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on("click", clearMenus);
            }
            var relatedTarget = {
                relatedTarget: this
            };
            $parent.trigger(e = $.Event("show.bs.dropdown", relatedTarget));
            if (e.isDefaultPrevented()) return;
            $this.trigger("focus");
            $parent.toggleClass("open").trigger("shown.bs.dropdown", relatedTarget);
        }
        return false;
    };
    Dropdown.prototype.keydown = function(e) {
        if (!/(38|40|27)/.test(e.keyCode)) return;
        var $this = $(this);
        e.preventDefault();
        e.stopPropagation();
        if ($this.is(".disabled, :disabled")) return;
        var $parent = getParent($this);
        var isActive = $parent.hasClass("open");
        if (!isActive || isActive && e.keyCode == 27) {
            if (e.which == 27) $parent.find(toggle).trigger("focus");
            return $this.trigger("click");
        }
        var desc = " li:not(.divider):visible a";
        var $items = $parent.find('[role="menu"]' + desc + ', [role="listbox"]' + desc);
        if (!$items.length) return;
        var index = $items.index($items.filter(":focus"));
        if (e.keyCode == 38 && index > 0) index--;
        if (e.keyCode == 40 && index < $items.length - 1) index++;
        if (!~index) index = 0;
        $items.eq(index).trigger("focus");
    };
    function clearMenus(e) {
        if (e && e.which === 3) return;
        $(backdrop).remove();
        $(toggle).each(function() {
            var $parent = getParent($(this));
            var relatedTarget = {
                relatedTarget: this
            };
            if (!$parent.hasClass("open")) return;
            $parent.trigger(e = $.Event("hide.bs.dropdown", relatedTarget));
            if (e.isDefaultPrevented()) return;
            $parent.removeClass("open").trigger("hidden.bs.dropdown", relatedTarget);
        });
    }
    function getParent($this) {
        var selector = $this.attr("data-target");
        if (!selector) {
            selector = $this.attr("href");
            selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, "");
        }
        var $parent = selector && $(selector);
        return $parent && $parent.length ? $parent : $this.parent();
    }
    var old = $.fn.dropdown;
    $.fn.dropdown = function(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data("bs.dropdown");
            if (!data) $this.data("bs.dropdown", data = new Dropdown(this));
            if (typeof option == "string") data[option].call($this);
        });
    };
    $.fn.dropdown.Constructor = Dropdown;
    $.fn.dropdown.noConflict = function() {
        $.fn.dropdown = old;
        return this;
    };
    $(document).on("click.bs.dropdown.data-api", clearMenus).on("click.bs.dropdown.data-api", ".dropdown form", function(e) {
        e.stopPropagation();
    }).on("click.bs.dropdown.data-api", toggle, Dropdown.prototype.toggle).on("keydown.bs.dropdown.data-api", toggle + ', [role="menu"], [role="listbox"]', Dropdown.prototype.keydown);
}(jQuery);

+function($) {
    "use strict";
    var Tab = function(element) {
        this.element = $(element);
    };
    Tab.prototype.show = function() {
        var $this = this.element;
        var $ul = $this.closest("ul:not(.dropdown-menu)");
        var selector = $this.data("target");
        if (!selector) {
            selector = $this.attr("href");
            selector = selector && selector.replace(/.*(?=#[^\s]*$)/, "");
        }
        if ($this.parent("li").hasClass("active")) return;
        var previous = $ul.find(".active:last a")[0];
        var e = $.Event("show.bs.tab", {
            relatedTarget: previous
        });
        $this.trigger(e);
        if (e.isDefaultPrevented()) return;
        var $target = $(selector);
        this.activate($this.parent("li"), $ul);
        this.activate($target, $target.parent(), function() {
            $this.trigger({
                type: "shown.bs.tab",
                relatedTarget: previous
            });
        });
    };
    Tab.prototype.activate = function(element, container, callback) {
        var $active = container.find("> .active");
        var transition = callback && $.support.transition && $active.hasClass("fade");
        function next() {
            $active.removeClass("active").find("> .dropdown-menu > .active").removeClass("active");
            element.addClass("active");
            if (transition) {
                element[0].offsetWidth;
                element.addClass("in");
            } else {
                element.removeClass("fade");
            }
            if (element.parent(".dropdown-menu")) {
                element.closest("li.dropdown").addClass("active");
            }
            callback && callback();
        }
        transition ? $active.one($.support.transition.end, next).emulateTransitionEnd(150) : next();
        $active.removeClass("in");
    };
    var old = $.fn.tab;
    $.fn.tab = function(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data("bs.tab");
            if (!data) $this.data("bs.tab", data = new Tab(this));
            if (typeof option == "string") data[option]();
        });
    };
    $.fn.tab.Constructor = Tab;
    $.fn.tab.noConflict = function() {
        $.fn.tab = old;
        return this;
    };
    $(document).on("click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
}(jQuery);

+function($) {
    "use strict";
    function transitionEnd() {
        var el = document.createElement("bootstrap");
        var transEndEventNames = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            transition: "transitionend"
        };
        for (var name in transEndEventNames) {
            if (el.style[name] !== undefined) {
                return {
                    end: transEndEventNames[name]
                };
            }
        }
        return false;
    }
    $.fn.emulateTransitionEnd = function(duration) {
        var called = false, $el = this;
        $(this).one($.support.transition.end, function() {
            called = true;
        });
        var callback = function() {
            if (!called) $($el).trigger($.support.transition.end);
        };
        setTimeout(callback, duration);
        return this;
    };
    $(function() {
        $.support.transition = transitionEnd();
    });
}(jQuery);

+function($) {
    "use strict";
    function ScrollSpy(element, options) {
        var href;
        var process = $.proxy(this.process, this);
        this.$element = $(element).is("body") ? $(window) : $(element);
        this.$body = $("body");
        this.$scrollElement = this.$element.on("scroll.bs.scrollspy", process);
        this.options = $.extend({}, ScrollSpy.DEFAULTS, options);
        this.selector = (this.options.target || (href = $(element).attr("href")) && href.replace(/.*(?=#[^\s]+$)/, "") || "") + " .nav li > a";
        this.offsets = $([]);
        this.targets = $([]);
        this.activeTarget = null;
        this.refresh();
        this.process();
    }
    ScrollSpy.DEFAULTS = {
        offset: 10
    };
    ScrollSpy.prototype.refresh = function() {
        var offsetMethod = this.$element[0] == window ? "offset" : "position";
        this.offsets = $([]);
        this.targets = $([]);
        var self = this;
        this.$body.find(this.selector).map(function() {
            var $el = $(this);
            var href = $el.data("target") || $el.attr("href");
            var $href = /^#./.test(href) && $(href);
            return $href && $href.length && $href.is(":visible") && [ [ $href[offsetMethod]().top + (!$.isWindow(self.$scrollElement.get(0)) && self.$scrollElement.scrollTop()), href ] ] || null;
        }).sort(function(a, b) {
            return a[0] - b[0];
        }).each(function() {
            self.offsets.push(this[0]);
            self.targets.push(this[1]);
        });
    };
    ScrollSpy.prototype.process = function() {
        var scrollTop = this.$scrollElement.scrollTop() + this.options.offset;
        var scrollHeight = this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight);
        var maxScroll = scrollHeight - this.$scrollElement.height();
        var offsets = this.offsets;
        var targets = this.targets;
        var activeTarget = this.activeTarget;
        var i;
        if (scrollTop >= maxScroll) {
            return activeTarget != (i = targets.last()[0]) && this.activate(i);
        }
        if (activeTarget && scrollTop <= offsets[0]) {
            return activeTarget != (i = targets[0]) && this.activate(i);
        }
        for (i = offsets.length; i--; ) {
            activeTarget != targets[i] && scrollTop >= offsets[i] && (!offsets[i + 1] || scrollTop <= offsets[i + 1]) && this.activate(targets[i]);
        }
    };
    ScrollSpy.prototype.activate = function(target) {
        this.activeTarget = target;
        $(this.selector).parentsUntil(this.options.target, ".active").removeClass("active");
        var selector = this.selector + '[data-target="' + target + '"],' + this.selector + '[href="' + target + '"]';
        var active = $(selector).parents("li").addClass("active");
        if (active.parent(".dropdown-menu").length) {
            active = active.closest("li.dropdown").addClass("active");
        }
        active.trigger("activate.bs.scrollspy");
    };
    var old = $.fn.scrollspy;
    $.fn.scrollspy = function(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data("bs.scrollspy");
            var options = typeof option == "object" && option;
            if (!data) $this.data("bs.scrollspy", data = new ScrollSpy(this, options));
            if (typeof option == "string") data[option]();
        });
    };
    $.fn.scrollspy.Constructor = ScrollSpy;
    $.fn.scrollspy.noConflict = function() {
        $.fn.scrollspy = old;
        return this;
    };
    $(window).on("load.bs.scrollspy.data-api", function() {
        $('[data-spy="scroll"]').each(function() {
            var $spy = $(this);
            $spy.scrollspy($spy.data());
        });
    });
}(jQuery);

+function($) {
    "use strict";
    var Modal = function(element, options) {
        this.options = options;
        this.$body = $(document.body);
        this.$element = $(element);
        this.$backdrop = this.isShown = null;
        this.scrollbarWidth = 0;
        if (this.options.remote) {
            this.$element.find(".modal-content").load(this.options.remote, $.proxy(function() {
                this.$element.trigger("loaded.bs.modal");
            }, this));
        }
    };
    Modal.DEFAULTS = {
        backdrop: true,
        keyboard: true,
        show: true
    };
    Modal.prototype.toggle = function(_relatedTarget) {
        return this.isShown ? this.hide() : this.show(_relatedTarget);
    };
    Modal.prototype.show = function(_relatedTarget) {
        var that = this;
        var e = $.Event("show.bs.modal", {
            relatedTarget: _relatedTarget
        });
        this.$element.trigger(e);
        if (this.isShown || e.isDefaultPrevented()) return;
        this.isShown = true;
        this.checkScrollbar();
        this.$body.addClass("modal-open");
        this.setScrollbar();
        this.escape();
        this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', $.proxy(this.hide, this));
        this.backdrop(function() {
            var transition = $.support.transition && that.$element.hasClass("fade");
            if (!that.$element.parent().length) {
                that.$element.appendTo(that.$body);
            }
            that.$element.show().scrollTop(0);
            if (transition) {
                that.$element[0].offsetWidth;
            }
            that.$element.addClass("in").attr("aria-hidden", false);
            that.enforceFocus();
            var e = $.Event("shown.bs.modal", {
                relatedTarget: _relatedTarget
            });
            transition ? that.$element.find(".modal-dialog").one($.support.transition.end, function() {
                that.$element.trigger("focus").trigger(e);
            }).emulateTransitionEnd(300) : that.$element.trigger("focus").trigger(e);
        });
    };
    Modal.prototype.hide = function(e) {
        if (e) e.preventDefault();
        e = $.Event("hide.bs.modal");
        this.$element.trigger(e);
        if (!this.isShown || e.isDefaultPrevented()) return;
        this.isShown = false;
        this.$body.removeClass("modal-open");
        this.resetScrollbar();
        this.escape();
        $(document).off("focusin.bs.modal");
        this.$element.removeClass("in").attr("aria-hidden", true).off("click.dismiss.bs.modal");
        $.support.transition && this.$element.hasClass("fade") ? this.$element.one($.support.transition.end, $.proxy(this.hideModal, this)).emulateTransitionEnd(300) : this.hideModal();
    };
    Modal.prototype.enforceFocus = function() {
        $(document).off("focusin.bs.modal").on("focusin.bs.modal", $.proxy(function(e) {
            if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
                this.$element.trigger("focus");
            }
        }, this));
    };
    Modal.prototype.escape = function() {
        if (this.isShown && this.options.keyboard) {
            this.$element.on("keyup.dismiss.bs.modal", $.proxy(function(e) {
                e.which == 27 && this.hide();
            }, this));
        } else if (!this.isShown) {
            this.$element.off("keyup.dismiss.bs.modal");
        }
    };
    Modal.prototype.hideModal = function() {
        var that = this;
        this.$element.hide();
        this.backdrop(function() {
            that.$element.trigger("hidden.bs.modal");
        });
    };
    Modal.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove();
        this.$backdrop = null;
    };
    Modal.prototype.backdrop = function(callback) {
        var that = this;
        var animate = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var doAnimate = $.support.transition && animate;
            this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />').appendTo(this.$body);
            this.$element.on("click.dismiss.bs.modal", $.proxy(function(e) {
                if (e.target !== e.currentTarget) return;
                this.options.backdrop == "static" ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this);
            }, this));
            if (doAnimate) this.$backdrop[0].offsetWidth;
            this.$backdrop.addClass("in");
            if (!callback) return;
            doAnimate ? this.$backdrop.one($.support.transition.end, callback).emulateTransitionEnd(150) : callback();
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var callbackRemove = function() {
                that.removeBackdrop();
                callback && callback();
            };
            $.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one($.support.transition.end, callbackRemove).emulateTransitionEnd(150) : callbackRemove();
        } else if (callback) {
            callback();
        }
    };
    Modal.prototype.checkScrollbar = function() {
        if (document.body.clientWidth >= window.innerWidth) return;
        this.scrollbarWidth = this.scrollbarWidth || this.measureScrollbar();
    };
    Modal.prototype.setScrollbar = function() {
        var bodyPad = parseInt(this.$body.css("padding-right") || 0);
        if (this.scrollbarWidth) this.$body.css("padding-right", bodyPad + this.scrollbarWidth);
    };
    Modal.prototype.resetScrollbar = function() {
        this.$body.css("padding-right", "");
    };
    Modal.prototype.measureScrollbar = function() {
        var scrollDiv = document.createElement("div");
        scrollDiv.className = "modal-scrollbar-measure";
        this.$body.append(scrollDiv);
        var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        this.$body[0].removeChild(scrollDiv);
        return scrollbarWidth;
    };
    var old = $.fn.modal;
    $.fn.modal = function(option, _relatedTarget) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data("bs.modal");
            var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == "object" && option);
            if (!data) $this.data("bs.modal", data = new Modal(this, options));
            if (typeof option == "string") data[option](_relatedTarget); else if (options.show) data.show(_relatedTarget);
        });
    };
    $.fn.modal.Constructor = Modal;
    $.fn.modal.noConflict = function() {
        $.fn.modal = old;
        return this;
    };
    $(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(e) {
        var $this = $(this);
        var href = $this.attr("href");
        var $target = $($this.attr("data-target") || href && href.replace(/.*(?=#[^\s]+$)/, ""));
        var option = $target.data("bs.modal") ? "toggle" : $.extend({
            remote: !/#/.test(href) && href
        }, $target.data(), $this.data());
        if ($this.is("a")) e.preventDefault();
        $target.modal(option, this).one("hide", function() {
            $this.is(":visible") && $this.trigger("focus");
        });
    });
}(jQuery);

+function($) {
    "use strict";
    var Tooltip = function(element, options) {
        this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null;
        this.init("tooltip", element, options);
    };
    Tooltip.DEFAULTS = {
        animation: true,
        placement: "top",
        selector: false,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: false,
        container: false,
        viewport: {
            selector: "body",
            padding: 0
        }
    };
    Tooltip.prototype.init = function(type, element, options) {
        this.enabled = true;
        this.type = type;
        this.$element = $(element);
        this.options = this.getOptions(options);
        this.$viewport = this.options.viewport && $(this.options.viewport.selector || this.options.viewport);
        var triggers = this.options.trigger.split(" ");
        for (var i = triggers.length; i--; ) {
            var trigger = triggers[i];
            if (trigger == "click") {
                this.$element.on("click." + this.type, this.options.selector, $.proxy(this.toggle, this));
            } else if (trigger != "manual") {
                var eventIn = trigger == "hover" ? "mouseenter" : "focusin";
                var eventOut = trigger == "hover" ? "mouseleave" : "focusout";
                this.$element.on(eventIn + "." + this.type, this.options.selector, $.proxy(this.enter, this));
                this.$element.on(eventOut + "." + this.type, this.options.selector, $.proxy(this.leave, this));
            }
        }
        this.options.selector ? this._options = $.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle();
    };
    Tooltip.prototype.getDefaults = function() {
        return Tooltip.DEFAULTS;
    };
    Tooltip.prototype.getOptions = function(options) {
        options = $.extend({}, this.getDefaults(), this.$element.data(), options);
        if (options.delay && typeof options.delay == "number") {
            options.delay = {
                show: options.delay,
                hide: options.delay
            };
        }
        return options;
    };
    Tooltip.prototype.getDelegateOptions = function() {
        var options = {};
        var defaults = this.getDefaults();
        this._options && $.each(this._options, function(key, value) {
            if (defaults[key] != value) options[key] = value;
        });
        return options;
    };
    Tooltip.prototype.enter = function(obj) {
        var self = obj instanceof this.constructor ? obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
        clearTimeout(self.timeout);
        self.hoverState = "in";
        if (!self.options.delay || !self.options.delay.show) return self.show();
        self.timeout = setTimeout(function() {
            if (self.hoverState == "in") self.show();
        }, self.options.delay.show);
    };
    Tooltip.prototype.leave = function(obj) {
        var self = obj instanceof this.constructor ? obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
        clearTimeout(self.timeout);
        self.hoverState = "out";
        if (!self.options.delay || !self.options.delay.hide) return self.hide();
        self.timeout = setTimeout(function() {
            if (self.hoverState == "out") self.hide();
        }, self.options.delay.hide);
    };
    Tooltip.prototype.show = function() {
        var e = $.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(e);
            if (e.isDefaultPrevented()) return;
            var that = this;
            var $tip = this.tip();
            this.setContent();
            if (this.options.animation) $tip.addClass("fade");
            var placement = typeof this.options.placement == "function" ? this.options.placement.call(this, $tip[0], this.$element[0]) : this.options.placement;
            var autoToken = /\s?auto?\s?/i;
            var autoPlace = autoToken.test(placement);
            if (autoPlace) placement = placement.replace(autoToken, "") || "top";
            $tip.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(placement);
            this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element);
            var pos = this.getPosition();
            var actualWidth = $tip[0].offsetWidth;
            var actualHeight = $tip[0].offsetHeight;
            if (autoPlace) {
                var orgPlacement = placement;
                var $parent = this.$element.parent();
                var parentDim = this.getPosition($parent);
                placement = placement == "bottom" && pos.top + pos.height + actualHeight - parentDim.scroll > parentDim.height ? "top" : placement == "top" && pos.top - parentDim.scroll - actualHeight < 0 ? "bottom" : placement == "right" && pos.right + actualWidth > parentDim.width ? "left" : placement == "left" && pos.left - actualWidth < parentDim.left ? "right" : placement;
                $tip.removeClass(orgPlacement).addClass(placement);
            }
            var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight);
            this.applyPlacement(calculatedOffset, placement);
            this.hoverState = null;
            var complete = function() {
                that.$element.trigger("shown.bs." + that.type);
            };
            $.support.transition && this.$tip.hasClass("fade") ? $tip.one($.support.transition.end, complete).emulateTransitionEnd(150) : complete();
        }
    };
    Tooltip.prototype.applyPlacement = function(offset, placement) {
        var $tip = this.tip();
        var width = $tip[0].offsetWidth;
        var height = $tip[0].offsetHeight;
        var marginTop = parseInt($tip.css("margin-top"), 10);
        var marginLeft = parseInt($tip.css("margin-left"), 10);
        if (isNaN(marginTop)) marginTop = 0;
        if (isNaN(marginLeft)) marginLeft = 0;
        offset.top = offset.top + marginTop;
        offset.left = offset.left + marginLeft;
        $.offset.setOffset($tip[0], $.extend({
            using: function(props) {
                $tip.css({
                    top: Math.round(props.top),
                    left: Math.round(props.left)
                });
            }
        }, offset), 0);
        $tip.addClass("in");
        var actualWidth = $tip[0].offsetWidth;
        var actualHeight = $tip[0].offsetHeight;
        if (placement == "top" && actualHeight != height) {
            offset.top = offset.top + height - actualHeight;
        }
        var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight);
        if (delta.left) offset.left += delta.left; else offset.top += delta.top;
        var arrowDelta = delta.left ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight;
        var arrowPosition = delta.left ? "left" : "top";
        var arrowOffsetPosition = delta.left ? "offsetWidth" : "offsetHeight";
        $tip.offset(offset);
        this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], arrowPosition);
    };
    Tooltip.prototype.replaceArrow = function(delta, dimension, position) {
        this.arrow().css(position, delta ? 50 * (1 - delta / dimension) + "%" : "");
    };
    Tooltip.prototype.setContent = function() {
        var $tip = this.tip();
        var title = this.getTitle();
        $tip.find(".tooltip-inner")[this.options.html ? "html" : "text"](title);
        $tip.removeClass("fade in top bottom left right");
    };
    Tooltip.prototype.hide = function() {
        var that = this;
        var $tip = this.tip();
        var e = $.Event("hide.bs." + this.type);
        function complete() {
            if (that.hoverState != "in") $tip.detach();
            that.$element.trigger("hidden.bs." + that.type);
        }
        this.$element.trigger(e);
        if (e.isDefaultPrevented()) return;
        $tip.removeClass("in");
        $.support.transition && this.$tip.hasClass("fade") ? $tip.one($.support.transition.end, complete).emulateTransitionEnd(150) : complete();
        this.hoverState = null;
        return this;
    };
    Tooltip.prototype.fixTitle = function() {
        var $e = this.$element;
        if ($e.attr("title") || typeof $e.attr("data-original-title") != "string") {
            $e.attr("data-original-title", $e.attr("title") || "").attr("title", "");
        }
    };
    Tooltip.prototype.hasContent = function() {
        return this.getTitle();
    };
    Tooltip.prototype.getPosition = function($element) {
        $element = $element || this.$element;
        var el = $element[0];
        var isBody = el.tagName == "BODY";
        return $.extend({}, typeof el.getBoundingClientRect == "function" ? el.getBoundingClientRect() : null, {
            scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop(),
            width: isBody ? $(window).width() : $element.outerWidth(),
            height: isBody ? $(window).height() : $element.outerHeight()
        }, isBody ? {
            top: 0,
            left: 0
        } : $element.offset());
    };
    Tooltip.prototype.getCalculatedOffset = function(placement, pos, actualWidth, actualHeight) {
        return placement == "bottom" ? {
            top: pos.top + pos.height,
            left: pos.left + pos.width / 2 - actualWidth / 2
        } : placement == "top" ? {
            top: pos.top - actualHeight,
            left: pos.left + pos.width / 2 - actualWidth / 2
        } : placement == "left" ? {
            top: pos.top + pos.height / 2 - actualHeight / 2,
            left: pos.left - actualWidth
        } : {
            top: pos.top + pos.height / 2 - actualHeight / 2,
            left: pos.left + pos.width
        };
    };
    Tooltip.prototype.getViewportAdjustedDelta = function(placement, pos, actualWidth, actualHeight) {
        var delta = {
            top: 0,
            left: 0
        };
        if (!this.$viewport) return delta;
        var viewportPadding = this.options.viewport && this.options.viewport.padding || 0;
        var viewportDimensions = this.getPosition(this.$viewport);
        if (/right|left/.test(placement)) {
            var topEdgeOffset = pos.top - viewportPadding - viewportDimensions.scroll;
            var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight;
            if (topEdgeOffset < viewportDimensions.top) {
                delta.top = viewportDimensions.top - topEdgeOffset;
            } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) {
                delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset;
            }
        } else {
            var leftEdgeOffset = pos.left - viewportPadding;
            var rightEdgeOffset = pos.left + viewportPadding + actualWidth;
            if (leftEdgeOffset < viewportDimensions.left) {
                delta.left = viewportDimensions.left - leftEdgeOffset;
            } else if (rightEdgeOffset > viewportDimensions.width) {
                delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset;
            }
        }
        return delta;
    };
    Tooltip.prototype.getTitle = function() {
        var title;
        var $e = this.$element;
        var o = this.options;
        title = $e.attr("data-original-title") || (typeof o.title == "function" ? o.title.call($e[0]) : o.title);
        return title;
    };
    Tooltip.prototype.tip = function() {
        return this.$tip = this.$tip || $(this.options.template);
    };
    Tooltip.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow");
    };
    Tooltip.prototype.validate = function() {
        if (!this.$element[0].parentNode) {
            this.hide();
            this.$element = null;
            this.options = null;
        }
    };
    Tooltip.prototype.enable = function() {
        this.enabled = true;
    };
    Tooltip.prototype.disable = function() {
        this.enabled = false;
    };
    Tooltip.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled;
    };
    Tooltip.prototype.toggle = function(e) {
        var self = e ? $(e.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type) : this;
        self.tip().hasClass("in") ? self.leave(self) : self.enter(self);
    };
    Tooltip.prototype.destroy = function() {
        clearTimeout(this.timeout);
        this.hide().$element.off("." + this.type).removeData("bs." + this.type);
    };
    var old = $.fn.tooltip;
    $.fn.tooltip = function(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data("bs.tooltip");
            var options = typeof option == "object" && option;
            if (!data && option == "destroy") return;
            if (!data) $this.data("bs.tooltip", data = new Tooltip(this, options));
            if (typeof option == "string") data[option]();
        });
    };
    $.fn.tooltip.Constructor = Tooltip;
    $.fn.tooltip.noConflict = function() {
        $.fn.tooltip = old;
        return this;
    };
}(jQuery);

+function($) {
    "use strict";
    var Popover = function(element, options) {
        this.init("popover", element, options);
    };
    if (!$.fn.tooltip) throw new Error("Popover requires tooltip.js");
    Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    });
    Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype);
    Popover.prototype.constructor = Popover;
    Popover.prototype.getDefaults = function() {
        return Popover.DEFAULTS;
    };
    Popover.prototype.setContent = function() {
        var $tip = this.tip();
        var title = this.getTitle();
        var content = this.getContent();
        $tip.find(".popover-title")[this.options.html ? "html" : "text"](title);
        $tip.find(".popover-content").empty()[this.options.html ? typeof content == "string" ? "html" : "append" : "text"](content);
        $tip.removeClass("fade top bottom left right in");
        if (!$tip.find(".popover-title").html()) $tip.find(".popover-title").hide();
    };
    Popover.prototype.hasContent = function() {
        return this.getTitle() || this.getContent();
    };
    Popover.prototype.getContent = function() {
        var $e = this.$element;
        var o = this.options;
        return $e.attr("data-content") || (typeof o.content == "function" ? o.content.call($e[0]) : o.content);
    };
    Popover.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow");
    };
    Popover.prototype.tip = function() {
        if (!this.$tip) this.$tip = $(this.options.template);
        return this.$tip;
    };
    var old = $.fn.popover;
    $.fn.popover = function(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data("bs.popover");
            var options = typeof option == "object" && option;
            if (!data && option == "destroy") return;
            if (!data) $this.data("bs.popover", data = new Popover(this, options));
            if (typeof option == "string") data[option]();
        });
    };
    $.fn.popover.Constructor = Popover;
    $.fn.popover.noConflict = function() {
        $.fn.popover = old;
        return this;
    };
}(jQuery);

angular.module("ui.bootstrap", [ "ui.bootstrap.tpls", "ui.bootstrap.transition", "ui.bootstrap.collapse", "ui.bootstrap.accordion", "ui.bootstrap.alert", "ui.bootstrap.bindHtml", "ui.bootstrap.buttons", "ui.bootstrap.carousel", "ui.bootstrap.dateparser", "ui.bootstrap.position", "ui.bootstrap.datepicker", "ui.bootstrap.dropdown", "ui.bootstrap.modal", "ui.bootstrap.pagination", "ui.bootstrap.tooltip", "ui.bootstrap.popover", "ui.bootstrap.progressbar", "ui.bootstrap.rating", "ui.bootstrap.tabs", "ui.bootstrap.timepicker", "ui.bootstrap.typeahead" ]);

angular.module("ui.bootstrap.tpls", [ "template/accordion/accordion-group.html", "template/accordion/accordion.html", "template/alert/alert.html", "template/carousel/carousel.html", "template/carousel/slide.html", "template/datepicker/datepicker.html", "template/datepicker/day.html", "template/datepicker/month.html", "template/datepicker/popup.html", "template/datepicker/year.html", "template/modal/backdrop.html", "template/modal/window.html", "template/pagination/pager.html", "template/pagination/pagination.html", "template/tooltip/tooltip-html-unsafe-popup.html", "template/tooltip/tooltip-popup.html", "template/popover/popover.html", "template/progressbar/bar.html", "template/progressbar/progress.html", "template/progressbar/progressbar.html", "template/rating/rating.html", "template/tabs/tab.html", "template/tabs/tabset.html", "template/timepicker/timepicker.html", "template/typeahead/typeahead-match.html", "template/typeahead/typeahead-popup.html" ]);

angular.module("ui.bootstrap.transition", []).factory("$transition", [ "$q", "$timeout", "$rootScope", function($q, $timeout, $rootScope) {
    var $transition = function(element, trigger, options) {
        options = options || {};
        var deferred = $q.defer();
        var endEventName = $transition[options.animation ? "animationEndEventName" : "transitionEndEventName"];
        var transitionEndHandler = function(event) {
            $rootScope.$apply(function() {
                element.unbind(endEventName, transitionEndHandler);
                deferred.resolve(element);
            });
        };
        if (endEventName) {
            element.bind(endEventName, transitionEndHandler);
        }
        $timeout(function() {
            if (angular.isString(trigger)) {
                element.addClass(trigger);
            } else if (angular.isFunction(trigger)) {
                trigger(element);
            } else if (angular.isObject(trigger)) {
                element.css(trigger);
            }
            if (!endEventName) {
                deferred.resolve(element);
            }
        });
        deferred.promise.cancel = function() {
            if (endEventName) {
                element.unbind(endEventName, transitionEndHandler);
            }
            deferred.reject("Transition cancelled");
        };
        return deferred.promise;
    };
    var transElement = document.createElement("trans");
    var transitionEndEventNames = {
        WebkitTransition: "webkitTransitionEnd",
        MozTransition: "transitionend",
        OTransition: "oTransitionEnd",
        transition: "transitionend"
    };
    var animationEndEventNames = {
        WebkitTransition: "webkitAnimationEnd",
        MozTransition: "animationend",
        OTransition: "oAnimationEnd",
        transition: "animationend"
    };
    function findEndEventName(endEventNames) {
        for (var name in endEventNames) {
            if (transElement.style[name] !== undefined) {
                return endEventNames[name];
            }
        }
    }
    $transition.transitionEndEventName = findEndEventName(transitionEndEventNames);
    $transition.animationEndEventName = findEndEventName(animationEndEventNames);
    return $transition;
} ]);

angular.module("ui.bootstrap.collapse", [ "ui.bootstrap.transition" ]).directive("collapse", [ "$transition", function($transition) {
    return {
        link: function(scope, element, attrs) {
            var initialAnimSkip = true;
            var currentTransition;
            function doTransition(change) {
                var newTransition = $transition(element, change);
                if (currentTransition) {
                    currentTransition.cancel();
                }
                currentTransition = newTransition;
                newTransition.then(newTransitionDone, newTransitionDone);
                return newTransition;
                function newTransitionDone() {
                    if (currentTransition === newTransition) {
                        currentTransition = undefined;
                    }
                }
            }
            function expand() {
                if (initialAnimSkip) {
                    initialAnimSkip = false;
                    expandDone();
                } else {
                    element.removeClass("collapse").addClass("collapsing");
                    doTransition({
                        height: element[0].scrollHeight + "px"
                    }).then(expandDone);
                }
            }
            function expandDone() {
                element.removeClass("collapsing");
                element.addClass("collapse in");
                element.css({
                    height: "auto"
                });
            }
            function collapse() {
                if (initialAnimSkip) {
                    initialAnimSkip = false;
                    collapseDone();
                    element.css({
                        height: 0
                    });
                } else {
                    element.css({
                        height: element[0].scrollHeight + "px"
                    });
                    var x = element[0].offsetWidth;
                    element.removeClass("collapse in").addClass("collapsing");
                    doTransition({
                        height: 0
                    }).then(collapseDone);
                }
            }
            function collapseDone() {
                element.removeClass("collapsing");
                element.addClass("collapse");
            }
            scope.$watch(attrs.collapse, function(shouldCollapse) {
                if (shouldCollapse) {
                    collapse();
                } else {
                    expand();
                }
            });
        }
    };
} ]);

angular.module("ui.bootstrap.accordion", [ "ui.bootstrap.collapse" ]).constant("accordionConfig", {
    closeOthers: true
}).controller("AccordionController", [ "$scope", "$attrs", "accordionConfig", function($scope, $attrs, accordionConfig) {
    this.groups = [];
    this.closeOthers = function(openGroup) {
        var closeOthers = angular.isDefined($attrs.closeOthers) ? $scope.$eval($attrs.closeOthers) : accordionConfig.closeOthers;
        if (closeOthers) {
            angular.forEach(this.groups, function(group) {
                if (group !== openGroup) {
                    group.isOpen = false;
                }
            });
        }
    };
    this.addGroup = function(groupScope) {
        var that = this;
        this.groups.push(groupScope);
        groupScope.$on("$destroy", function(event) {
            that.removeGroup(groupScope);
        });
    };
    this.removeGroup = function(group) {
        var index = this.groups.indexOf(group);
        if (index !== -1) {
            this.groups.splice(index, 1);
        }
    };
} ]).directive("accordion", function() {
    return {
        restrict: "EA",
        controller: "AccordionController",
        transclude: true,
        replace: false,
        templateUrl: "template/accordion/accordion.html"
    };
}).directive("accordionGroup", function() {
    return {
        require: "^accordion",
        restrict: "EA",
        transclude: true,
        replace: true,
        templateUrl: "template/accordion/accordion-group.html",
        scope: {
            heading: "@",
            isOpen: "=?",
            isDisabled: "=?"
        },
        controller: function() {
            this.setHeading = function(element) {
                this.heading = element;
            };
        },
        link: function(scope, element, attrs, accordionCtrl) {
            accordionCtrl.addGroup(scope);
            scope.$watch("isOpen", function(value) {
                if (value) {
                    accordionCtrl.closeOthers(scope);
                }
            });
            scope.toggleOpen = function() {
                if (!scope.isDisabled) {
                    scope.isOpen = !scope.isOpen;
                }
            };
        }
    };
}).directive("accordionHeading", function() {
    return {
        restrict: "EA",
        transclude: true,
        template: "",
        replace: true,
        require: "^accordionGroup",
        link: function(scope, element, attr, accordionGroupCtrl, transclude) {
            accordionGroupCtrl.setHeading(transclude(scope, function() {}));
        }
    };
}).directive("accordionTransclude", function() {
    return {
        require: "^accordionGroup",
        link: function(scope, element, attr, controller) {
            scope.$watch(function() {
                return controller[attr.accordionTransclude];
            }, function(heading) {
                if (heading) {
                    element.html("");
                    element.append(heading);
                }
            });
        }
    };
});

angular.module("ui.bootstrap.alert", []).controller("AlertController", [ "$scope", "$attrs", function($scope, $attrs) {
    $scope.closeable = "close" in $attrs;
} ]).directive("alert", function() {
    return {
        restrict: "EA",
        controller: "AlertController",
        templateUrl: "template/alert/alert.html",
        transclude: true,
        replace: true,
        scope: {
            type: "@",
            close: "&"
        }
    };
});

angular.module("ui.bootstrap.bindHtml", []).directive("bindHtmlUnsafe", function() {
    return function(scope, element, attr) {
        element.addClass("ng-binding").data("$binding", attr.bindHtmlUnsafe);
        scope.$watch(attr.bindHtmlUnsafe, function bindHtmlUnsafeWatchAction(value) {
            element.html(value || "");
        });
    };
});

angular.module("ui.bootstrap.buttons", []).constant("buttonConfig", {
    activeClass: "active",
    toggleEvent: "click"
}).controller("ButtonsController", [ "buttonConfig", function(buttonConfig) {
    this.activeClass = buttonConfig.activeClass || "active";
    this.toggleEvent = buttonConfig.toggleEvent || "click";
} ]).directive("btnRadio", function() {
    return {
        require: [ "btnRadio", "ngModel" ],
        controller: "ButtonsController",
        link: function(scope, element, attrs, ctrls) {
            var buttonsCtrl = ctrls[0], ngModelCtrl = ctrls[1];
            ngModelCtrl.$render = function() {
                element.toggleClass(buttonsCtrl.activeClass, angular.equals(ngModelCtrl.$modelValue, scope.$eval(attrs.btnRadio)));
            };
            element.bind(buttonsCtrl.toggleEvent, function() {
                var isActive = element.hasClass(buttonsCtrl.activeClass);
                if (!isActive || angular.isDefined(attrs.uncheckable)) {
                    scope.$apply(function() {
                        ngModelCtrl.$setViewValue(isActive ? null : scope.$eval(attrs.btnRadio));
                        ngModelCtrl.$render();
                    });
                }
            });
        }
    };
}).directive("btnCheckbox", function() {
    return {
        require: [ "btnCheckbox", "ngModel" ],
        controller: "ButtonsController",
        link: function(scope, element, attrs, ctrls) {
            var buttonsCtrl = ctrls[0], ngModelCtrl = ctrls[1];
            function getTrueValue() {
                return getCheckboxValue(attrs.btnCheckboxTrue, true);
            }
            function getFalseValue() {
                return getCheckboxValue(attrs.btnCheckboxFalse, false);
            }
            function getCheckboxValue(attributeValue, defaultValue) {
                var val = scope.$eval(attributeValue);
                return angular.isDefined(val) ? val : defaultValue;
            }
            ngModelCtrl.$render = function() {
                element.toggleClass(buttonsCtrl.activeClass, angular.equals(ngModelCtrl.$modelValue, getTrueValue()));
            };
            element.bind(buttonsCtrl.toggleEvent, function() {
                scope.$apply(function() {
                    ngModelCtrl.$setViewValue(element.hasClass(buttonsCtrl.activeClass) ? getFalseValue() : getTrueValue());
                    ngModelCtrl.$render();
                });
            });
        }
    };
});

angular.module("ui.bootstrap.carousel", [ "ui.bootstrap.transition" ]).controller("CarouselController", [ "$scope", "$timeout", "$transition", function($scope, $timeout, $transition) {
    var self = this, slides = self.slides = $scope.slides = [], currentIndex = -1, currentTimeout, isPlaying;
    self.currentSlide = null;
    var destroyed = false;
    self.select = $scope.select = function(nextSlide, direction) {
        var nextIndex = slides.indexOf(nextSlide);
        if (direction === undefined) {
            direction = nextIndex > currentIndex ? "next" : "prev";
        }
        if (nextSlide && nextSlide !== self.currentSlide) {
            if ($scope.$currentTransition) {
                $scope.$currentTransition.cancel();
                $timeout(goNext);
            } else {
                goNext();
            }
        }
        function goNext() {
            if (destroyed) {
                return;
            }
            if (self.currentSlide && angular.isString(direction) && !$scope.noTransition && nextSlide.$element) {
                nextSlide.$element.addClass(direction);
                var reflow = nextSlide.$element[0].offsetWidth;
                angular.forEach(slides, function(slide) {
                    angular.extend(slide, {
                        direction: "",
                        entering: false,
                        leaving: false,
                        active: false
                    });
                });
                angular.extend(nextSlide, {
                    direction: direction,
                    active: true,
                    entering: true
                });
                angular.extend(self.currentSlide || {}, {
                    direction: direction,
                    leaving: true
                });
                $scope.$currentTransition = $transition(nextSlide.$element, {});
                (function(next, current) {
                    $scope.$currentTransition.then(function() {
                        transitionDone(next, current);
                    }, function() {
                        transitionDone(next, current);
                    });
                })(nextSlide, self.currentSlide);
            } else {
                transitionDone(nextSlide, self.currentSlide);
            }
            self.currentSlide = nextSlide;
            currentIndex = nextIndex;
            restartTimer();
        }
        function transitionDone(next, current) {
            angular.extend(next, {
                direction: "",
                active: true,
                leaving: false,
                entering: false
            });
            angular.extend(current || {}, {
                direction: "",
                active: false,
                leaving: false,
                entering: false
            });
            $scope.$currentTransition = null;
        }
    };
    $scope.$on("$destroy", function() {
        destroyed = true;
    });
    self.indexOfSlide = function(slide) {
        return slides.indexOf(slide);
    };
    $scope.next = function() {
        var newIndex = (currentIndex + 1) % slides.length;
        if (!$scope.$currentTransition) {
            return self.select(slides[newIndex], "next");
        }
    };
    $scope.prev = function() {
        var newIndex = currentIndex - 1 < 0 ? slides.length - 1 : currentIndex - 1;
        if (!$scope.$currentTransition) {
            return self.select(slides[newIndex], "prev");
        }
    };
    $scope.isActive = function(slide) {
        return self.currentSlide === slide;
    };
    $scope.$watch("interval", restartTimer);
    $scope.$on("$destroy", resetTimer);
    function restartTimer() {
        resetTimer();
        var interval = +$scope.interval;
        if (!isNaN(interval) && interval >= 0) {
            currentTimeout = $timeout(timerFn, interval);
        }
    }
    function resetTimer() {
        if (currentTimeout) {
            $timeout.cancel(currentTimeout);
            currentTimeout = null;
        }
    }
    function timerFn() {
        if (isPlaying) {
            $scope.next();
            restartTimer();
        } else {
            $scope.pause();
        }
    }
    $scope.play = function() {
        if (!isPlaying) {
            isPlaying = true;
            restartTimer();
        }
    };
    $scope.pause = function() {
        if (!$scope.noPause) {
            isPlaying = false;
            resetTimer();
        }
    };
    self.addSlide = function(slide, element) {
        slide.$element = element;
        slides.push(slide);
        if (slides.length === 1 || slide.active) {
            self.select(slides[slides.length - 1]);
            if (slides.length == 1) {
                $scope.play();
            }
        } else {
            slide.active = false;
        }
    };
    self.removeSlide = function(slide) {
        var index = slides.indexOf(slide);
        slides.splice(index, 1);
        if (slides.length > 0 && slide.active) {
            if (index >= slides.length) {
                self.select(slides[index - 1]);
            } else {
                self.select(slides[index]);
            }
        } else if (currentIndex > index) {
            currentIndex--;
        }
    };
} ]).directive("carousel", [ function() {
    return {
        restrict: "EA",
        transclude: true,
        replace: true,
        controller: "CarouselController",
        require: "carousel",
        templateUrl: "template/carousel/carousel.html",
        scope: {
            interval: "=",
            noTransition: "=",
            noPause: "="
        }
    };
} ]).directive("slide", function() {
    return {
        require: "^carousel",
        restrict: "EA",
        transclude: true,
        replace: true,
        templateUrl: "template/carousel/slide.html",
        scope: {
            active: "=?"
        },
        link: function(scope, element, attrs, carouselCtrl) {
            carouselCtrl.addSlide(scope, element);
            scope.$on("$destroy", function() {
                carouselCtrl.removeSlide(scope);
            });
            scope.$watch("active", function(active) {
                if (active) {
                    carouselCtrl.select(scope);
                }
            });
        }
    };
});

angular.module("ui.bootstrap.dateparser", []).service("dateParser", [ "$locale", "orderByFilter", function($locale, orderByFilter) {
    this.parsers = {};
    var formatCodeToRegex = {
        yyyy: {
            regex: "\\d{4}",
            apply: function(value) {
                this.year = +value;
            }
        },
        yy: {
            regex: "\\d{2}",
            apply: function(value) {
                this.year = +value + 2e3;
            }
        },
        y: {
            regex: "\\d{1,4}",
            apply: function(value) {
                this.year = +value;
            }
        },
        MMMM: {
            regex: $locale.DATETIME_FORMATS.MONTH.join("|"),
            apply: function(value) {
                this.month = $locale.DATETIME_FORMATS.MONTH.indexOf(value);
            }
        },
        MMM: {
            regex: $locale.DATETIME_FORMATS.SHORTMONTH.join("|"),
            apply: function(value) {
                this.month = $locale.DATETIME_FORMATS.SHORTMONTH.indexOf(value);
            }
        },
        MM: {
            regex: "0[1-9]|1[0-2]",
            apply: function(value) {
                this.month = value - 1;
            }
        },
        M: {
            regex: "[1-9]|1[0-2]",
            apply: function(value) {
                this.month = value - 1;
            }
        },
        dd: {
            regex: "[0-2][0-9]{1}|3[0-1]{1}",
            apply: function(value) {
                this.date = +value;
            }
        },
        d: {
            regex: "[1-2]?[0-9]{1}|3[0-1]{1}",
            apply: function(value) {
                this.date = +value;
            }
        },
        EEEE: {
            regex: $locale.DATETIME_FORMATS.DAY.join("|")
        },
        EEE: {
            regex: $locale.DATETIME_FORMATS.SHORTDAY.join("|")
        }
    };
    function createParser(format) {
        var map = [], regex = format.split("");
        angular.forEach(formatCodeToRegex, function(data, code) {
            var index = format.indexOf(code);
            if (index > -1) {
                format = format.split("");
                regex[index] = "(" + data.regex + ")";
                format[index] = "$";
                for (var i = index + 1, n = index + code.length; i < n; i++) {
                    regex[i] = "";
                    format[i] = "$";
                }
                format = format.join("");
                map.push({
                    index: index,
                    apply: data.apply
                });
            }
        });
        return {
            regex: new RegExp("^" + regex.join("") + "$"),
            map: orderByFilter(map, "index")
        };
    }
    this.parse = function(input, format) {
        if (!angular.isString(input) || !format) {
            return input;
        }
        format = $locale.DATETIME_FORMATS[format] || format;
        if (!this.parsers[format]) {
            this.parsers[format] = createParser(format);
        }
        var parser = this.parsers[format], regex = parser.regex, map = parser.map, results = input.match(regex);
        if (results && results.length) {
            var fields = {
                year: 1900,
                month: 0,
                date: 1,
                hours: 0
            }, dt;
            for (var i = 1, n = results.length; i < n; i++) {
                var mapper = map[i - 1];
                if (mapper.apply) {
                    mapper.apply.call(fields, results[i]);
                }
            }
            if (isValid(fields.year, fields.month, fields.date)) {
                dt = new Date(fields.year, fields.month, fields.date, fields.hours);
            }
            return dt;
        }
    };
    function isValid(year, month, date) {
        if (month === 1 && date > 28) {
            return date === 29 && (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0);
        }
        if (month === 3 || month === 5 || month === 8 || month === 10) {
            return date < 31;
        }
        return true;
    }
} ]);

angular.module("ui.bootstrap.position", []).factory("$position", [ "$document", "$window", function($document, $window) {
    function getStyle(el, cssprop) {
        if (el.currentStyle) {
            return el.currentStyle[cssprop];
        } else if ($window.getComputedStyle) {
            return $window.getComputedStyle(el)[cssprop];
        }
        return el.style[cssprop];
    }
    function isStaticPositioned(element) {
        return (getStyle(element, "position") || "static") === "static";
    }
    var parentOffsetEl = function(element) {
        var docDomEl = $document[0];
        var offsetParent = element.offsetParent || docDomEl;
        while (offsetParent && offsetParent !== docDomEl && isStaticPositioned(offsetParent)) {
            offsetParent = offsetParent.offsetParent;
        }
        return offsetParent || docDomEl;
    };
    return {
        position: function(element) {
            var elBCR = this.offset(element);
            var offsetParentBCR = {
                top: 0,
                left: 0
            };
            var offsetParentEl = parentOffsetEl(element[0]);
            if (offsetParentEl != $document[0]) {
                offsetParentBCR = this.offset(angular.element(offsetParentEl));
                offsetParentBCR.top += offsetParentEl.clientTop - offsetParentEl.scrollTop;
                offsetParentBCR.left += offsetParentEl.clientLeft - offsetParentEl.scrollLeft;
            }
            var boundingClientRect = element[0].getBoundingClientRect();
            return {
                width: boundingClientRect.width || element.prop("offsetWidth"),
                height: boundingClientRect.height || element.prop("offsetHeight"),
                top: elBCR.top - offsetParentBCR.top,
                left: elBCR.left - offsetParentBCR.left
            };
        },
        offset: function(element) {
            var boundingClientRect = element[0].getBoundingClientRect();
            return {
                width: boundingClientRect.width || element.prop("offsetWidth"),
                height: boundingClientRect.height || element.prop("offsetHeight"),
                top: boundingClientRect.top + ($window.pageYOffset || $document[0].documentElement.scrollTop),
                left: boundingClientRect.left + ($window.pageXOffset || $document[0].documentElement.scrollLeft)
            };
        },
        positionElements: function(hostEl, targetEl, positionStr, appendToBody) {
            var positionStrParts = positionStr.split("-");
            var pos0 = positionStrParts[0], pos1 = positionStrParts[1] || "center";
            var hostElPos, targetElWidth, targetElHeight, targetElPos;
            hostElPos = appendToBody ? this.offset(hostEl) : this.position(hostEl);
            targetElWidth = targetEl.prop("offsetWidth");
            targetElHeight = targetEl.prop("offsetHeight");
            var shiftWidth = {
                center: function() {
                    return hostElPos.left + hostElPos.width / 2 - targetElWidth / 2;
                },
                left: function() {
                    return hostElPos.left;
                },
                right: function() {
                    return hostElPos.left + hostElPos.width;
                }
            };
            var shiftHeight = {
                center: function() {
                    return hostElPos.top + hostElPos.height / 2 - targetElHeight / 2;
                },
                top: function() {
                    return hostElPos.top;
                },
                bottom: function() {
                    return hostElPos.top + hostElPos.height;
                }
            };
            switch (pos0) {
              case "right":
                targetElPos = {
                    top: shiftHeight[pos1](),
                    left: shiftWidth[pos0]()
                };
                break;

              case "left":
                targetElPos = {
                    top: shiftHeight[pos1](),
                    left: hostElPos.left - targetElWidth
                };
                break;

              case "bottom":
                targetElPos = {
                    top: shiftHeight[pos0](),
                    left: shiftWidth[pos1]()
                };
                break;

              default:
                targetElPos = {
                    top: hostElPos.top - targetElHeight,
                    left: shiftWidth[pos1]()
                };
                break;
            }
            return targetElPos;
        }
    };
} ]);

angular.module("ui.bootstrap.datepicker", [ "ui.bootstrap.dateparser", "ui.bootstrap.position" ]).constant("datepickerConfig", {
    formatDay: "dd",
    formatMonth: "MMMM",
    formatYear: "yyyy",
    formatDayHeader: "EEE",
    formatDayTitle: "MMMM yyyy",
    formatMonthTitle: "yyyy",
    datepickerMode: "day",
    minMode: "day",
    maxMode: "year",
    showWeeks: true,
    startingDay: 0,
    yearRange: 20,
    minDate: null,
    maxDate: null
}).controller("DatepickerController", [ "$scope", "$attrs", "$parse", "$interpolate", "$timeout", "$log", "dateFilter", "datepickerConfig", function($scope, $attrs, $parse, $interpolate, $timeout, $log, dateFilter, datepickerConfig) {
    var self = this, ngModelCtrl = {
        $setViewValue: angular.noop
    };
    this.modes = [ "day", "month", "year" ];
    angular.forEach([ "formatDay", "formatMonth", "formatYear", "formatDayHeader", "formatDayTitle", "formatMonthTitle", "minMode", "maxMode", "showWeeks", "startingDay", "yearRange" ], function(key, index) {
        self[key] = angular.isDefined($attrs[key]) ? index < 8 ? $interpolate($attrs[key])($scope.$parent) : $scope.$parent.$eval($attrs[key]) : datepickerConfig[key];
    });
    angular.forEach([ "minDate", "maxDate" ], function(key) {
        if ($attrs[key]) {
            $scope.$parent.$watch($parse($attrs[key]), function(value) {
                self[key] = value ? new Date(value) : null;
                self.refreshView();
            });
        } else {
            self[key] = datepickerConfig[key] ? new Date(datepickerConfig[key]) : null;
        }
    });
    $scope.datepickerMode = $scope.datepickerMode || datepickerConfig.datepickerMode;
    $scope.uniqueId = "datepicker-" + $scope.$id + "-" + Math.floor(Math.random() * 1e4);
    this.activeDate = angular.isDefined($attrs.initDate) ? $scope.$parent.$eval($attrs.initDate) : new Date();
    $scope.isActive = function(dateObject) {
        if (self.compare(dateObject.date, self.activeDate) === 0) {
            $scope.activeDateId = dateObject.uid;
            return true;
        }
        return false;
    };
    this.init = function(ngModelCtrl_) {
        ngModelCtrl = ngModelCtrl_;
        ngModelCtrl.$render = function() {
            self.render();
        };
    };
    this.render = function() {
        if (ngModelCtrl.$modelValue) {
            var date = new Date(ngModelCtrl.$modelValue), isValid = !isNaN(date);
            if (isValid) {
                this.activeDate = date;
            } else {
                $log.error('Datepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.');
            }
            ngModelCtrl.$setValidity("date", isValid);
        }
        this.refreshView();
    };
    this.refreshView = function() {
        if (this.element) {
            this._refreshView();
            var date = ngModelCtrl.$modelValue ? new Date(ngModelCtrl.$modelValue) : null;
            ngModelCtrl.$setValidity("date-disabled", !date || this.element && !this.isDisabled(date));
        }
    };
    this.createDateObject = function(date, format) {
        var model = ngModelCtrl.$modelValue ? new Date(ngModelCtrl.$modelValue) : null;
        return {
            date: date,
            label: dateFilter(date, format),
            selected: model && this.compare(date, model) === 0,
            disabled: this.isDisabled(date),
            current: this.compare(date, new Date()) === 0
        };
    };
    this.isDisabled = function(date) {
        return this.minDate && this.compare(date, this.minDate) < 0 || this.maxDate && this.compare(date, this.maxDate) > 0 || $attrs.dateDisabled && $scope.dateDisabled({
            date: date,
            mode: $scope.datepickerMode
        });
    };
    this.split = function(arr, size) {
        var arrays = [];
        while (arr.length > 0) {
            arrays.push(arr.splice(0, size));
        }
        return arrays;
    };
    $scope.select = function(date) {
        if ($scope.datepickerMode === self.minMode) {
            var dt = ngModelCtrl.$modelValue ? new Date(ngModelCtrl.$modelValue) : new Date(0, 0, 0, 0, 0, 0, 0);
            dt.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
            ngModelCtrl.$setViewValue(dt);
            ngModelCtrl.$render();
        } else {
            self.activeDate = date;
            $scope.datepickerMode = self.modes[self.modes.indexOf($scope.datepickerMode) - 1];
        }
    };
    $scope.move = function(direction) {
        var year = self.activeDate.getFullYear() + direction * (self.step.years || 0), month = self.activeDate.getMonth() + direction * (self.step.months || 0);
        self.activeDate.setFullYear(year, month, 1);
        self.refreshView();
    };
    $scope.toggleMode = function(direction) {
        direction = direction || 1;
        if ($scope.datepickerMode === self.maxMode && direction === 1 || $scope.datepickerMode === self.minMode && direction === -1) {
            return;
        }
        $scope.datepickerMode = self.modes[self.modes.indexOf($scope.datepickerMode) + direction];
    };
    $scope.keys = {
        13: "enter",
        32: "space",
        33: "pageup",
        34: "pagedown",
        35: "end",
        36: "home",
        37: "left",
        38: "up",
        39: "right",
        40: "down"
    };
    var focusElement = function() {
        $timeout(function() {
            self.element[0].focus();
        }, 0, false);
    };
    $scope.$on("datepicker.focus", focusElement);
    $scope.keydown = function(evt) {
        var key = $scope.keys[evt.which];
        if (!key || evt.shiftKey || evt.altKey) {
            return;
        }
        evt.preventDefault();
        evt.stopPropagation();
        if (key === "enter" || key === "space") {
            if (self.isDisabled(self.activeDate)) {
                return;
            }
            $scope.select(self.activeDate);
            focusElement();
        } else if (evt.ctrlKey && (key === "up" || key === "down")) {
            $scope.toggleMode(key === "up" ? 1 : -1);
            focusElement();
        } else {
            self.handleKeyDown(key, evt);
            self.refreshView();
        }
    };
} ]).directive("datepicker", function() {
    return {
        restrict: "EA",
        replace: true,
        templateUrl: "template/datepicker/datepicker.html",
        scope: {
            datepickerMode: "=?",
            dateDisabled: "&"
        },
        require: [ "datepicker", "?^ngModel" ],
        controller: "DatepickerController",
        link: function(scope, element, attrs, ctrls) {
            var datepickerCtrl = ctrls[0], ngModelCtrl = ctrls[1];
            if (ngModelCtrl) {
                datepickerCtrl.init(ngModelCtrl);
            }
        }
    };
}).directive("daypicker", [ "dateFilter", function(dateFilter) {
    return {
        restrict: "EA",
        replace: true,
        templateUrl: "template/datepicker/day.html",
        require: "^datepicker",
        link: function(scope, element, attrs, ctrl) {
            scope.showWeeks = ctrl.showWeeks;
            ctrl.step = {
                months: 1
            };
            ctrl.element = element;
            var DAYS_IN_MONTH = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
            function getDaysInMonth(year, month) {
                return month === 1 && year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 29 : DAYS_IN_MONTH[month];
            }
            function getDates(startDate, n) {
                var dates = new Array(n), current = new Date(startDate), i = 0;
                current.setHours(12);
                while (i < n) {
                    dates[i++] = new Date(current);
                    current.setDate(current.getDate() + 1);
                }
                return dates;
            }
            ctrl._refreshView = function() {
                var year = ctrl.activeDate.getFullYear(), month = ctrl.activeDate.getMonth(), firstDayOfMonth = new Date(year, month, 1), difference = ctrl.startingDay - firstDayOfMonth.getDay(), numDisplayedFromPreviousMonth = difference > 0 ? 7 - difference : -difference, firstDate = new Date(firstDayOfMonth);
                if (numDisplayedFromPreviousMonth > 0) {
                    firstDate.setDate(-numDisplayedFromPreviousMonth + 1);
                }
                var days = getDates(firstDate, 42);
                for (var i = 0; i < 42; i++) {
                    days[i] = angular.extend(ctrl.createDateObject(days[i], ctrl.formatDay), {
                        secondary: days[i].getMonth() !== month,
                        uid: scope.uniqueId + "-" + i
                    });
                }
                scope.labels = new Array(7);
                for (var j = 0; j < 7; j++) {
                    scope.labels[j] = {
                        abbr: dateFilter(days[j].date, ctrl.formatDayHeader),
                        full: dateFilter(days[j].date, "EEEE")
                    };
                }
                scope.title = dateFilter(ctrl.activeDate, ctrl.formatDayTitle);
                scope.rows = ctrl.split(days, 7);
                if (scope.showWeeks) {
                    scope.weekNumbers = [];
                    var weekNumber = getISO8601WeekNumber(scope.rows[0][0].date), numWeeks = scope.rows.length;
                    while (scope.weekNumbers.push(weekNumber++) < numWeeks) {}
                }
            };
            ctrl.compare = function(date1, date2) {
                return new Date(date1.getFullYear(), date1.getMonth(), date1.getDate()) - new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
            };
            function getISO8601WeekNumber(date) {
                var checkDate = new Date(date);
                checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
                var time = checkDate.getTime();
                checkDate.setMonth(0);
                checkDate.setDate(1);
                return Math.floor(Math.round((time - checkDate) / 864e5) / 7) + 1;
            }
            ctrl.handleKeyDown = function(key, evt) {
                var date = ctrl.activeDate.getDate();
                if (key === "left") {
                    date = date - 1;
                } else if (key === "up") {
                    date = date - 7;
                } else if (key === "right") {
                    date = date + 1;
                } else if (key === "down") {
                    date = date + 7;
                } else if (key === "pageup" || key === "pagedown") {
                    var month = ctrl.activeDate.getMonth() + (key === "pageup" ? -1 : 1);
                    ctrl.activeDate.setMonth(month, 1);
                    date = Math.min(getDaysInMonth(ctrl.activeDate.getFullYear(), ctrl.activeDate.getMonth()), date);
                } else if (key === "home") {
                    date = 1;
                } else if (key === "end") {
                    date = getDaysInMonth(ctrl.activeDate.getFullYear(), ctrl.activeDate.getMonth());
                }
                ctrl.activeDate.setDate(date);
            };
            ctrl.refreshView();
        }
    };
} ]).directive("monthpicker", [ "dateFilter", function(dateFilter) {
    return {
        restrict: "EA",
        replace: true,
        templateUrl: "template/datepicker/month.html",
        require: "^datepicker",
        link: function(scope, element, attrs, ctrl) {
            ctrl.step = {
                years: 1
            };
            ctrl.element = element;
            ctrl._refreshView = function() {
                var months = new Array(12), year = ctrl.activeDate.getFullYear();
                for (var i = 0; i < 12; i++) {
                    months[i] = angular.extend(ctrl.createDateObject(new Date(year, i, 1), ctrl.formatMonth), {
                        uid: scope.uniqueId + "-" + i
                    });
                }
                scope.title = dateFilter(ctrl.activeDate, ctrl.formatMonthTitle);
                scope.rows = ctrl.split(months, 3);
            };
            ctrl.compare = function(date1, date2) {
                return new Date(date1.getFullYear(), date1.getMonth()) - new Date(date2.getFullYear(), date2.getMonth());
            };
            ctrl.handleKeyDown = function(key, evt) {
                var date = ctrl.activeDate.getMonth();
                if (key === "left") {
                    date = date - 1;
                } else if (key === "up") {
                    date = date - 3;
                } else if (key === "right") {
                    date = date + 1;
                } else if (key === "down") {
                    date = date + 3;
                } else if (key === "pageup" || key === "pagedown") {
                    var year = ctrl.activeDate.getFullYear() + (key === "pageup" ? -1 : 1);
                    ctrl.activeDate.setFullYear(year);
                } else if (key === "home") {
                    date = 0;
                } else if (key === "end") {
                    date = 11;
                }
                ctrl.activeDate.setMonth(date);
            };
            ctrl.refreshView();
        }
    };
} ]).directive("yearpicker", [ "dateFilter", function(dateFilter) {
    return {
        restrict: "EA",
        replace: true,
        templateUrl: "template/datepicker/year.html",
        require: "^datepicker",
        link: function(scope, element, attrs, ctrl) {
            var range = ctrl.yearRange;
            ctrl.step = {
                years: range
            };
            ctrl.element = element;
            function getStartingYear(year) {
                return parseInt((year - 1) / range, 10) * range + 1;
            }
            ctrl._refreshView = function() {
                var years = new Array(range);
                for (var i = 0, start = getStartingYear(ctrl.activeDate.getFullYear()); i < range; i++) {
                    years[i] = angular.extend(ctrl.createDateObject(new Date(start + i, 0, 1), ctrl.formatYear), {
                        uid: scope.uniqueId + "-" + i
                    });
                }
                scope.title = [ years[0].label, years[range - 1].label ].join(" - ");
                scope.rows = ctrl.split(years, 5);
            };
            ctrl.compare = function(date1, date2) {
                return date1.getFullYear() - date2.getFullYear();
            };
            ctrl.handleKeyDown = function(key, evt) {
                var date = ctrl.activeDate.getFullYear();
                if (key === "left") {
                    date = date - 1;
                } else if (key === "up") {
                    date = date - 5;
                } else if (key === "right") {
                    date = date + 1;
                } else if (key === "down") {
                    date = date + 5;
                } else if (key === "pageup" || key === "pagedown") {
                    date += (key === "pageup" ? -1 : 1) * ctrl.step.years;
                } else if (key === "home") {
                    date = getStartingYear(ctrl.activeDate.getFullYear());
                } else if (key === "end") {
                    date = getStartingYear(ctrl.activeDate.getFullYear()) + range - 1;
                }
                ctrl.activeDate.setFullYear(date);
            };
            ctrl.refreshView();
        }
    };
} ]).constant("datepickerPopupConfig", {
    datepickerPopup: "yyyy-MM-dd",
    currentText: "Today",
    clearText: "Clear",
    closeText: "Done",
    closeOnDateSelection: true,
    appendToBody: false,
    showButtonBar: true
}).directive("datepickerPopup", [ "$compile", "$parse", "$document", "$position", "dateFilter", "dateParser", "datepickerPopupConfig", function($compile, $parse, $document, $position, dateFilter, dateParser, datepickerPopupConfig) {
    return {
        restrict: "EA",
        require: "ngModel",
        scope: {
            isOpen: "=?",
            currentText: "@",
            clearText: "@",
            closeText: "@",
            dateDisabled: "&"
        },
        link: function(scope, element, attrs, ngModel) {
            var dateFormat, closeOnDateSelection = angular.isDefined(attrs.closeOnDateSelection) ? scope.$parent.$eval(attrs.closeOnDateSelection) : datepickerPopupConfig.closeOnDateSelection, appendToBody = angular.isDefined(attrs.datepickerAppendToBody) ? scope.$parent.$eval(attrs.datepickerAppendToBody) : datepickerPopupConfig.appendToBody;
            scope.showButtonBar = angular.isDefined(attrs.showButtonBar) ? scope.$parent.$eval(attrs.showButtonBar) : datepickerPopupConfig.showButtonBar;
            scope.getText = function(key) {
                return scope[key + "Text"] || datepickerPopupConfig[key + "Text"];
            };
            attrs.$observe("datepickerPopup", function(value) {
                dateFormat = value || datepickerPopupConfig.datepickerPopup;
                ngModel.$render();
            });
            var popupEl = angular.element("<div datepicker-popup-wrap><div datepicker></div></div>");
            popupEl.attr({
                "ng-model": "date",
                "ng-change": "dateSelection()"
            });
            function cameltoDash(string) {
                return string.replace(/([A-Z])/g, function($1) {
                    return "-" + $1.toLowerCase();
                });
            }
            var datepickerEl = angular.element(popupEl.children()[0]);
            if (attrs.datepickerOptions) {
                angular.forEach(scope.$parent.$eval(attrs.datepickerOptions), function(value, option) {
                    datepickerEl.attr(cameltoDash(option), value);
                });
            }
            scope.watchData = {};
            angular.forEach([ "minDate", "maxDate", "datepickerMode" ], function(key) {
                if (attrs[key]) {
                    var getAttribute = $parse(attrs[key]);
                    scope.$parent.$watch(getAttribute, function(value) {
                        scope.watchData[key] = value;
                    });
                    datepickerEl.attr(cameltoDash(key), "watchData." + key);
                    if (key === "datepickerMode") {
                        var setAttribute = getAttribute.assign;
                        scope.$watch("watchData." + key, function(value, oldvalue) {
                            if (value !== oldvalue) {
                                setAttribute(scope.$parent, value);
                            }
                        });
                    }
                }
            });
            if (attrs.dateDisabled) {
                datepickerEl.attr("date-disabled", "dateDisabled({ date: date, mode: mode })");
            }
            function parseDate(viewValue) {
                if (!viewValue) {
                    ngModel.$setValidity("date", true);
                    return null;
                } else if (angular.isDate(viewValue) && !isNaN(viewValue)) {
                    ngModel.$setValidity("date", true);
                    return viewValue;
                } else if (angular.isString(viewValue)) {
                    var date = dateParser.parse(viewValue, dateFormat) || new Date(viewValue);
                    if (isNaN(date)) {
                        ngModel.$setValidity("date", false);
                        return undefined;
                    } else {
                        ngModel.$setValidity("date", true);
                        return date;
                    }
                } else {
                    ngModel.$setValidity("date", false);
                    return undefined;
                }
            }
            ngModel.$parsers.unshift(parseDate);
            scope.dateSelection = function(dt) {
                if (angular.isDefined(dt)) {
                    scope.date = dt;
                }
                ngModel.$setViewValue(scope.date);
                ngModel.$render();
                if (closeOnDateSelection) {
                    scope.isOpen = false;
                    element[0].focus();
                }
            };
            element.bind("input change keyup", function() {
                scope.$apply(function() {
                    scope.date = ngModel.$modelValue;
                });
            });
            ngModel.$render = function() {
                var date = ngModel.$viewValue ? dateFilter(ngModel.$viewValue, dateFormat) : "";
                element.val(date);
                scope.date = parseDate(ngModel.$modelValue);
            };
            var documentClickBind = function(event) {
                if (scope.isOpen && event.target !== element[0]) {
                    scope.$apply(function() {
                        scope.isOpen = false;
                    });
                }
            };
            var keydown = function(evt, noApply) {
                scope.keydown(evt);
            };
            element.bind("keydown", keydown);
            scope.keydown = function(evt) {
                if (evt.which === 27) {
                    evt.preventDefault();
                    evt.stopPropagation();
                    scope.close();
                } else if (evt.which === 40 && !scope.isOpen) {
                    scope.isOpen = true;
                }
            };
            scope.$watch("isOpen", function(value) {
                if (value) {
                    scope.$broadcast("datepicker.focus");
                    scope.position = appendToBody ? $position.offset(element) : $position.position(element);
                    scope.position.top = scope.position.top + element.prop("offsetHeight");
                    $document.bind("click", documentClickBind);
                } else {
                    $document.unbind("click", documentClickBind);
                }
            });
            scope.select = function(date) {
                if (date === "today") {
                    var today = new Date();
                    if (angular.isDate(ngModel.$modelValue)) {
                        date = new Date(ngModel.$modelValue);
                        date.setFullYear(today.getFullYear(), today.getMonth(), today.getDate());
                    } else {
                        date = new Date(today.setHours(0, 0, 0, 0));
                    }
                }
                scope.dateSelection(date);
            };
            scope.close = function() {
                scope.isOpen = false;
                element[0].focus();
            };
            var $popup = $compile(popupEl)(scope);
            popupEl.remove();
            if (appendToBody) {
                $document.find("body").append($popup);
            } else {
                element.after($popup);
            }
            scope.$on("$destroy", function() {
                $popup.remove();
                element.unbind("keydown", keydown);
                $document.unbind("click", documentClickBind);
            });
        }
    };
} ]).directive("datepickerPopupWrap", function() {
    return {
        restrict: "EA",
        replace: true,
        transclude: true,
        templateUrl: "template/datepicker/popup.html",
        link: function(scope, element, attrs) {
            element.bind("click", function(event) {
                event.preventDefault();
                event.stopPropagation();
            });
        }
    };
});

angular.module("ui.bootstrap.dropdown", []).constant("dropdownConfig", {
    openClass: "open"
}).service("dropdownService", [ "$document", function($document) {
    var openScope = null;
    this.open = function(dropdownScope) {
        if (!openScope) {
            $document.bind("click", closeDropdown);
            $document.bind("keydown", escapeKeyBind);
        }
        if (openScope && openScope !== dropdownScope) {
            openScope.isOpen = false;
        }
        openScope = dropdownScope;
    };
    this.close = function(dropdownScope) {
        if (openScope === dropdownScope) {
            openScope = null;
            $document.unbind("click", closeDropdown);
            $document.unbind("keydown", escapeKeyBind);
        }
    };
    var closeDropdown = function(evt) {
        var toggleElement = openScope.getToggleElement();
        if (evt && toggleElement && toggleElement[0].contains(evt.target)) {
            return;
        }
        openScope.$apply(function() {
            openScope.isOpen = false;
        });
    };
    var escapeKeyBind = function(evt) {
        if (evt.which === 27) {
            openScope.focusToggleElement();
            closeDropdown();
        }
    };
} ]).controller("DropdownController", [ "$scope", "$attrs", "$parse", "dropdownConfig", "dropdownService", "$animate", function($scope, $attrs, $parse, dropdownConfig, dropdownService, $animate) {
    var self = this, scope = $scope.$new(), openClass = dropdownConfig.openClass, getIsOpen, setIsOpen = angular.noop, toggleInvoker = $attrs.onToggle ? $parse($attrs.onToggle) : angular.noop;
    this.init = function(element) {
        self.$element = element;
        if ($attrs.isOpen) {
            getIsOpen = $parse($attrs.isOpen);
            setIsOpen = getIsOpen.assign;
            $scope.$watch(getIsOpen, function(value) {
                scope.isOpen = !!value;
            });
        }
    };
    this.toggle = function(open) {
        return scope.isOpen = arguments.length ? !!open : !scope.isOpen;
    };
    this.isOpen = function() {
        return scope.isOpen;
    };
    scope.getToggleElement = function() {
        return self.toggleElement;
    };
    scope.focusToggleElement = function() {
        if (self.toggleElement) {
            self.toggleElement[0].focus();
        }
    };
    scope.$watch("isOpen", function(isOpen, wasOpen) {
        $animate[isOpen ? "addClass" : "removeClass"](self.$element, openClass);
        if (isOpen) {
            scope.focusToggleElement();
            dropdownService.open(scope);
        } else {
            dropdownService.close(scope);
        }
        setIsOpen($scope, isOpen);
        if (angular.isDefined(isOpen) && isOpen !== wasOpen) {
            toggleInvoker($scope, {
                open: !!isOpen
            });
        }
    });
    $scope.$on("$locationChangeSuccess", function() {
        scope.isOpen = false;
    });
    $scope.$on("$destroy", function() {
        scope.$destroy();
    });
} ]).directive("dropdown", function() {
    return {
        restrict: "CA",
        controller: "DropdownController",
        link: function(scope, element, attrs, dropdownCtrl) {
            dropdownCtrl.init(element);
        }
    };
}).directive("dropdownToggle", function() {
    return {
        restrict: "CA",
        require: "?^dropdown",
        link: function(scope, element, attrs, dropdownCtrl) {
            if (!dropdownCtrl) {
                return;
            }
            dropdownCtrl.toggleElement = element;
            var toggleDropdown = function(event) {
                event.preventDefault();
                if (!element.hasClass("disabled") && !attrs.disabled) {
                    scope.$apply(function() {
                        dropdownCtrl.toggle();
                    });
                }
            };
            element.bind("click", toggleDropdown);
            element.attr({
                "aria-haspopup": true,
                "aria-expanded": false
            });
            scope.$watch(dropdownCtrl.isOpen, function(isOpen) {
                element.attr("aria-expanded", !!isOpen);
            });
            scope.$on("$destroy", function() {
                element.unbind("click", toggleDropdown);
            });
        }
    };
});

angular.module("ui.bootstrap.modal", [ "ui.bootstrap.transition" ]).factory("$$stackedMap", function() {
    return {
        createNew: function() {
            var stack = [];
            return {
                add: function(key, value) {
                    stack.push({
                        key: key,
                        value: value
                    });
                },
                get: function(key) {
                    for (var i = 0; i < stack.length; i++) {
                        if (key == stack[i].key) {
                            return stack[i];
                        }
                    }
                },
                keys: function() {
                    var keys = [];
                    for (var i = 0; i < stack.length; i++) {
                        keys.push(stack[i].key);
                    }
                    return keys;
                },
                top: function() {
                    return stack[stack.length - 1];
                },
                remove: function(key) {
                    var idx = -1;
                    for (var i = 0; i < stack.length; i++) {
                        if (key == stack[i].key) {
                            idx = i;
                            break;
                        }
                    }
                    return stack.splice(idx, 1)[0];
                },
                removeTop: function() {
                    return stack.splice(stack.length - 1, 1)[0];
                },
                length: function() {
                    return stack.length;
                }
            };
        }
    };
}).directive("modalBackdrop", [ "$timeout", function($timeout) {
    return {
        restrict: "EA",
        replace: true,
        templateUrl: "template/modal/backdrop.html",
        link: function(scope, element, attrs) {
            scope.backdropClass = attrs.backdropClass || "";
            scope.animate = false;
            $timeout(function() {
                scope.animate = true;
            });
        }
    };
} ]).directive("modalWindow", [ "$modalStack", "$timeout", function($modalStack, $timeout) {
    return {
        restrict: "EA",
        scope: {
            index: "@",
            animate: "="
        },
        replace: true,
        transclude: true,
        templateUrl: function(tElement, tAttrs) {
            return tAttrs.templateUrl || "template/modal/window.html";
        },
        link: function(scope, element, attrs) {
            element.addClass(attrs.windowClass || "");
            scope.size = attrs.size;
            $timeout(function() {
                scope.animate = true;
                if (!element[0].querySelectorAll("[autofocus]").length) {
                    element[0].focus();
                }
            });
            scope.close = function(evt) {
                var modal = $modalStack.getTop();
                if (modal && modal.value.backdrop && modal.value.backdrop != "static" && evt.target === evt.currentTarget) {
                    evt.preventDefault();
                    evt.stopPropagation();
                    $modalStack.dismiss(modal.key, "backdrop click");
                }
            };
        }
    };
} ]).directive("modalTransclude", function() {
    return {
        link: function($scope, $element, $attrs, controller, $transclude) {
            $transclude($scope.$parent, function(clone) {
                $element.empty();
                $element.append(clone);
            });
        }
    };
}).factory("$modalStack", [ "$transition", "$timeout", "$document", "$compile", "$rootScope", "$$stackedMap", function($transition, $timeout, $document, $compile, $rootScope, $$stackedMap) {
    var OPENED_MODAL_CLASS = "modal-open";
    var backdropDomEl, backdropScope;
    var openedWindows = $$stackedMap.createNew();
    var $modalStack = {};
    function backdropIndex() {
        var topBackdropIndex = -1;
        var opened = openedWindows.keys();
        for (var i = 0; i < opened.length; i++) {
            if (openedWindows.get(opened[i]).value.backdrop) {
                topBackdropIndex = i;
            }
        }
        return topBackdropIndex;
    }
    $rootScope.$watch(backdropIndex, function(newBackdropIndex) {
        if (backdropScope) {
            backdropScope.index = newBackdropIndex;
        }
    });
    function removeModalWindow(modalInstance) {
        var body = $document.find("body").eq(0);
        var modalWindow = openedWindows.get(modalInstance).value;
        openedWindows.remove(modalInstance);
        removeAfterAnimate(modalWindow.modalDomEl, modalWindow.modalScope, 300, function() {
            modalWindow.modalScope.$destroy();
            body.toggleClass(OPENED_MODAL_CLASS, openedWindows.length() > 0);
            checkRemoveBackdrop();
        });
    }
    function checkRemoveBackdrop() {
        if (backdropDomEl && backdropIndex() == -1) {
            var backdropScopeRef = backdropScope;
            removeAfterAnimate(backdropDomEl, backdropScope, 150, function() {
                backdropScopeRef.$destroy();
                backdropScopeRef = null;
            });
            backdropDomEl = undefined;
            backdropScope = undefined;
        }
    }
    function removeAfterAnimate(domEl, scope, emulateTime, done) {
        scope.animate = false;
        var transitionEndEventName = $transition.transitionEndEventName;
        if (transitionEndEventName) {
            var timeout = $timeout(afterAnimating, emulateTime);
            domEl.bind(transitionEndEventName, function() {
                $timeout.cancel(timeout);
                afterAnimating();
                scope.$apply();
            });
        } else {
            $timeout(afterAnimating);
        }
        function afterAnimating() {
            if (afterAnimating.done) {
                return;
            }
            afterAnimating.done = true;
            domEl.remove();
            if (done) {
                done();
            }
        }
    }
    $document.bind("keydown", function(evt) {
        var modal;
        if (evt.which === 27) {
            modal = openedWindows.top();
            if (modal && modal.value.keyboard) {
                evt.preventDefault();
                $rootScope.$apply(function() {
                    $modalStack.dismiss(modal.key, "escape key press");
                });
            }
        }
    });
    $modalStack.open = function(modalInstance, modal) {
        openedWindows.add(modalInstance, {
            deferred: modal.deferred,
            modalScope: modal.scope,
            backdrop: modal.backdrop,
            keyboard: modal.keyboard
        });
        var body = $document.find("body").eq(0), currBackdropIndex = backdropIndex();
        if (currBackdropIndex >= 0 && !backdropDomEl) {
            backdropScope = $rootScope.$new(true);
            backdropScope.index = currBackdropIndex;
            var angularBackgroundDomEl = angular.element("<div modal-backdrop></div>");
            angularBackgroundDomEl.attr("backdrop-class", modal.backdropClass);
            backdropDomEl = $compile(angularBackgroundDomEl)(backdropScope);
            body.append(backdropDomEl);
        }
        var angularDomEl = angular.element("<div modal-window></div>");
        angularDomEl.attr({
            "template-url": modal.windowTemplateUrl,
            "window-class": modal.windowClass,
            size: modal.size,
            index: openedWindows.length() - 1,
            animate: "animate"
        }).html(modal.content);
        var modalDomEl = $compile(angularDomEl)(modal.scope);
        openedWindows.top().value.modalDomEl = modalDomEl;
        body.append(modalDomEl);
        body.addClass(OPENED_MODAL_CLASS);
    };
    $modalStack.close = function(modalInstance, result) {
        var modalWindow = openedWindows.get(modalInstance);
        if (modalWindow) {
            modalWindow.value.deferred.resolve(result);
            removeModalWindow(modalInstance);
        }
    };
    $modalStack.dismiss = function(modalInstance, reason) {
        var modalWindow = openedWindows.get(modalInstance);
        if (modalWindow) {
            modalWindow.value.deferred.reject(reason);
            removeModalWindow(modalInstance);
        }
    };
    $modalStack.dismissAll = function(reason) {
        var topModal = this.getTop();
        while (topModal) {
            this.dismiss(topModal.key, reason);
            topModal = this.getTop();
        }
    };
    $modalStack.getTop = function() {
        return openedWindows.top();
    };
    return $modalStack;
} ]).provider("$modal", function() {
    var $modalProvider = {
        options: {
            backdrop: true,
            keyboard: true
        },
        $get: [ "$injector", "$rootScope", "$q", "$http", "$templateCache", "$controller", "$modalStack", function($injector, $rootScope, $q, $http, $templateCache, $controller, $modalStack) {
            var $modal = {};
            function getTemplatePromise(options) {
                return options.template ? $q.when(options.template) : $http.get(angular.isFunction(options.templateUrl) ? options.templateUrl() : options.templateUrl, {
                    cache: $templateCache
                }).then(function(result) {
                    return result.data;
                });
            }
            function getResolvePromises(resolves) {
                var promisesArr = [];
                angular.forEach(resolves, function(value) {
                    if (angular.isFunction(value) || angular.isArray(value)) {
                        promisesArr.push($q.when($injector.invoke(value)));
                    }
                });
                return promisesArr;
            }
            $modal.open = function(modalOptions) {
                var modalResultDeferred = $q.defer();
                var modalOpenedDeferred = $q.defer();
                var modalInstance = {
                    result: modalResultDeferred.promise,
                    opened: modalOpenedDeferred.promise,
                    close: function(result) {
                        $modalStack.close(modalInstance, result);
                    },
                    dismiss: function(reason) {
                        $modalStack.dismiss(modalInstance, reason);
                    }
                };
                modalOptions = angular.extend({}, $modalProvider.options, modalOptions);
                modalOptions.resolve = modalOptions.resolve || {};
                if (!modalOptions.template && !modalOptions.templateUrl) {
                    throw new Error("One of template or templateUrl options is required.");
                }
                var templateAndResolvePromise = $q.all([ getTemplatePromise(modalOptions) ].concat(getResolvePromises(modalOptions.resolve)));
                templateAndResolvePromise.then(function resolveSuccess(tplAndVars) {
                    var modalScope = (modalOptions.scope || $rootScope).$new();
                    modalScope.$close = modalInstance.close;
                    modalScope.$dismiss = modalInstance.dismiss;
                    var ctrlInstance, ctrlLocals = {};
                    var resolveIter = 1;
                    if (modalOptions.controller) {
                        ctrlLocals.$scope = modalScope;
                        ctrlLocals.$modalInstance = modalInstance;
                        angular.forEach(modalOptions.resolve, function(value, key) {
                            ctrlLocals[key] = tplAndVars[resolveIter++];
                        });
                        ctrlInstance = $controller(modalOptions.controller, ctrlLocals);
                        if (modalOptions.controllerAs) {
                            modalScope[modalOptions.controllerAs] = ctrlInstance;
                        }
                    }
                    $modalStack.open(modalInstance, {
                        scope: modalScope,
                        deferred: modalResultDeferred,
                        content: tplAndVars[0],
                        backdrop: modalOptions.backdrop,
                        keyboard: modalOptions.keyboard,
                        backdropClass: modalOptions.backdropClass,
                        windowClass: modalOptions.windowClass,
                        windowTemplateUrl: modalOptions.windowTemplateUrl,
                        size: modalOptions.size
                    });
                }, function resolveError(reason) {
                    modalResultDeferred.reject(reason);
                });
                templateAndResolvePromise.then(function() {
                    modalOpenedDeferred.resolve(true);
                }, function() {
                    modalOpenedDeferred.reject(false);
                });
                return modalInstance;
            };
            return $modal;
        } ]
    };
    return $modalProvider;
});

angular.module("ui.bootstrap.pagination", []).controller("PaginationController", [ "$scope", "$attrs", "$parse", function($scope, $attrs, $parse) {
    var self = this, ngModelCtrl = {
        $setViewValue: angular.noop
    }, setNumPages = $attrs.numPages ? $parse($attrs.numPages).assign : angular.noop;
    this.init = function(ngModelCtrl_, config) {
        ngModelCtrl = ngModelCtrl_;
        this.config = config;
        ngModelCtrl.$render = function() {
            self.render();
        };
        if ($attrs.itemsPerPage) {
            $scope.$parent.$watch($parse($attrs.itemsPerPage), function(value) {
                self.itemsPerPage = parseInt(value, 10);
                $scope.totalPages = self.calculateTotalPages();
            });
        } else {
            this.itemsPerPage = config.itemsPerPage;
        }
    };
    this.calculateTotalPages = function() {
        var totalPages = this.itemsPerPage < 1 ? 1 : Math.ceil($scope.totalItems / this.itemsPerPage);
        return Math.max(totalPages || 0, 1);
    };
    this.render = function() {
        $scope.page = parseInt(ngModelCtrl.$viewValue, 10) || 1;
    };
    $scope.selectPage = function(page) {
        if ($scope.page !== page && page > 0 && page <= $scope.totalPages) {
            ngModelCtrl.$setViewValue(page);
            ngModelCtrl.$render();
        }
    };
    $scope.getText = function(key) {
        return $scope[key + "Text"] || self.config[key + "Text"];
    };
    $scope.noPrevious = function() {
        return $scope.page === 1;
    };
    $scope.noNext = function() {
        return $scope.page === $scope.totalPages;
    };
    $scope.$watch("totalItems", function() {
        $scope.totalPages = self.calculateTotalPages();
    });
    $scope.$watch("totalPages", function(value) {
        setNumPages($scope.$parent, value);
        if ($scope.page > value) {
            $scope.selectPage(value);
        } else {
            ngModelCtrl.$render();
        }
    });
} ]).constant("paginationConfig", {
    itemsPerPage: 10,
    boundaryLinks: false,
    directionLinks: true,
    firstText: "First",
    previousText: "Previous",
    nextText: "Next",
    lastText: "Last",
    rotate: true
}).directive("pagination", [ "$parse", "paginationConfig", function($parse, paginationConfig) {
    return {
        restrict: "EA",
        scope: {
            totalItems: "=",
            firstText: "@",
            previousText: "@",
            nextText: "@",
            lastText: "@"
        },
        require: [ "pagination", "?ngModel" ],
        controller: "PaginationController",
        templateUrl: "template/pagination/pagination.html",
        replace: true,
        link: function(scope, element, attrs, ctrls) {
            var paginationCtrl = ctrls[0], ngModelCtrl = ctrls[1];
            if (!ngModelCtrl) {
                return;
            }
            var maxSize = angular.isDefined(attrs.maxSize) ? scope.$parent.$eval(attrs.maxSize) : paginationConfig.maxSize, rotate = angular.isDefined(attrs.rotate) ? scope.$parent.$eval(attrs.rotate) : paginationConfig.rotate;
            scope.boundaryLinks = angular.isDefined(attrs.boundaryLinks) ? scope.$parent.$eval(attrs.boundaryLinks) : paginationConfig.boundaryLinks;
            scope.directionLinks = angular.isDefined(attrs.directionLinks) ? scope.$parent.$eval(attrs.directionLinks) : paginationConfig.directionLinks;
            paginationCtrl.init(ngModelCtrl, paginationConfig);
            if (attrs.maxSize) {
                scope.$parent.$watch($parse(attrs.maxSize), function(value) {
                    maxSize = parseInt(value, 10);
                    paginationCtrl.render();
                });
            }
            function makePage(number, text, isActive) {
                return {
                    number: number,
                    text: text,
                    active: isActive
                };
            }
            function getPages(currentPage, totalPages) {
                var pages = [];
                var startPage = 1, endPage = totalPages;
                var isMaxSized = angular.isDefined(maxSize) && maxSize < totalPages;
                if (isMaxSized) {
                    if (rotate) {
                        startPage = Math.max(currentPage - Math.floor(maxSize / 2), 1);
                        endPage = startPage + maxSize - 1;
                        if (endPage > totalPages) {
                            endPage = totalPages;
                            startPage = endPage - maxSize + 1;
                        }
                    } else {
                        startPage = (Math.ceil(currentPage / maxSize) - 1) * maxSize + 1;
                        endPage = Math.min(startPage + maxSize - 1, totalPages);
                    }
                }
                for (var number = startPage; number <= endPage; number++) {
                    var page = makePage(number, number, number === currentPage);
                    pages.push(page);
                }
                if (isMaxSized && !rotate) {
                    if (startPage > 1) {
                        var previousPageSet = makePage(startPage - 1, "...", false);
                        pages.unshift(previousPageSet);
                    }
                    if (endPage < totalPages) {
                        var nextPageSet = makePage(endPage + 1, "...", false);
                        pages.push(nextPageSet);
                    }
                }
                return pages;
            }
            var originalRender = paginationCtrl.render;
            paginationCtrl.render = function() {
                originalRender();
                if (scope.page > 0 && scope.page <= scope.totalPages) {
                    scope.pages = getPages(scope.page, scope.totalPages);
                }
            };
        }
    };
} ]).constant("pagerConfig", {
    itemsPerPage: 10,
    previousText: "« Previous",
    nextText: "Next »",
    align: true
}).directive("pager", [ "pagerConfig", function(pagerConfig) {
    return {
        restrict: "EA",
        scope: {
            totalItems: "=",
            previousText: "@",
            nextText: "@"
        },
        require: [ "pager", "?ngModel" ],
        controller: "PaginationController",
        templateUrl: "template/pagination/pager.html",
        replace: true,
        link: function(scope, element, attrs, ctrls) {
            var paginationCtrl = ctrls[0], ngModelCtrl = ctrls[1];
            if (!ngModelCtrl) {
                return;
            }
            scope.align = angular.isDefined(attrs.align) ? scope.$parent.$eval(attrs.align) : pagerConfig.align;
            paginationCtrl.init(ngModelCtrl, pagerConfig);
        }
    };
} ]);

angular.module("ui.bootstrap.tooltip", [ "ui.bootstrap.position", "ui.bootstrap.bindHtml" ]).provider("$tooltip", function() {
    var defaultOptions = {
        placement: "top",
        animation: true,
        popupDelay: 0
    };
    var triggerMap = {
        mouseenter: "mouseleave",
        click: "click",
        focus: "blur"
    };
    var globalOptions = {};
    this.options = function(value) {
        angular.extend(globalOptions, value);
    };
    this.setTriggers = function setTriggers(triggers) {
        angular.extend(triggerMap, triggers);
    };
    function snake_case(name) {
        var regexp = /[A-Z]/g;
        var separator = "-";
        return name.replace(regexp, function(letter, pos) {
            return (pos ? separator : "") + letter.toLowerCase();
        });
    }
    this.$get = [ "$window", "$compile", "$timeout", "$parse", "$document", "$position", "$interpolate", function($window, $compile, $timeout, $parse, $document, $position, $interpolate) {
        return function $tooltip(type, prefix, defaultTriggerShow) {
            var options = angular.extend({}, defaultOptions, globalOptions);
            function getTriggers(trigger) {
                var show = trigger || options.trigger || defaultTriggerShow;
                var hide = triggerMap[show] || show;
                return {
                    show: show,
                    hide: hide
                };
            }
            var directiveName = snake_case(type);
            var startSym = $interpolate.startSymbol();
            var endSym = $interpolate.endSymbol();
            var template = "<div " + directiveName + "-popup " + 'title="' + startSym + "tt_title" + endSym + '" ' + 'content="' + startSym + "tt_content" + endSym + '" ' + 'placement="' + startSym + "tt_placement" + endSym + '" ' + 'animation="tt_animation" ' + 'is-open="tt_isOpen"' + ">" + "</div>";
            return {
                restrict: "EA",
                scope: true,
                compile: function(tElem, tAttrs) {
                    var tooltipLinker = $compile(template);
                    return function link(scope, element, attrs) {
                        var tooltip;
                        var transitionTimeout;
                        var popupTimeout;
                        var appendToBody = angular.isDefined(options.appendToBody) ? options.appendToBody : false;
                        var triggers = getTriggers(undefined);
                        var hasEnableExp = angular.isDefined(attrs[prefix + "Enable"]);
                        var positionTooltip = function() {
                            var ttPosition = $position.positionElements(element, tooltip, scope.tt_placement, appendToBody);
                            ttPosition.top += "px";
                            ttPosition.left += "px";
                            tooltip.css(ttPosition);
                        };
                        scope.tt_isOpen = false;
                        function toggleTooltipBind() {
                            if (!scope.tt_isOpen) {
                                showTooltipBind();
                            } else {
                                hideTooltipBind();
                            }
                        }
                        function showTooltipBind() {
                            if (hasEnableExp && !scope.$eval(attrs[prefix + "Enable"])) {
                                return;
                            }
                            if (scope.tt_popupDelay) {
                                if (!popupTimeout) {
                                    popupTimeout = $timeout(show, scope.tt_popupDelay, false);
                                    popupTimeout.then(function(reposition) {
                                        reposition();
                                    });
                                }
                            } else {
                                show()();
                            }
                        }
                        function hideTooltipBind() {
                            scope.$apply(function() {
                                hide();
                            });
                        }
                        function show() {
                            popupTimeout = null;
                            if (transitionTimeout) {
                                $timeout.cancel(transitionTimeout);
                                transitionTimeout = null;
                            }
                            if (!scope.tt_content) {
                                return angular.noop;
                            }
                            createTooltip();
                            tooltip.css({
                                top: 0,
                                left: 0,
                                display: "block"
                            });
                            if (appendToBody) {
                                $document.find("body").append(tooltip);
                            } else {
                                element.after(tooltip);
                            }
                            positionTooltip();
                            scope.tt_isOpen = true;
                            scope.$digest();
                            return positionTooltip;
                        }
                        function hide() {
                            scope.tt_isOpen = false;
                            $timeout.cancel(popupTimeout);
                            popupTimeout = null;
                            if (scope.tt_animation) {
                                if (!transitionTimeout) {
                                    transitionTimeout = $timeout(removeTooltip, 500);
                                }
                            } else {
                                removeTooltip();
                            }
                        }
                        function createTooltip() {
                            if (tooltip) {
                                removeTooltip();
                            }
                            tooltip = tooltipLinker(scope, function() {});
                            scope.$digest();
                        }
                        function removeTooltip() {
                            transitionTimeout = null;
                            if (tooltip) {
                                tooltip.remove();
                                tooltip = null;
                            }
                        }
                        attrs.$observe(type, function(val) {
                            scope.tt_content = val;
                            if (!val && scope.tt_isOpen) {
                                hide();
                            }
                        });
                        attrs.$observe(prefix + "Title", function(val) {
                            scope.tt_title = val;
                        });
                        attrs.$observe(prefix + "Placement", function(val) {
                            scope.tt_placement = angular.isDefined(val) ? val : options.placement;
                        });
                        attrs.$observe(prefix + "PopupDelay", function(val) {
                            var delay = parseInt(val, 10);
                            scope.tt_popupDelay = !isNaN(delay) ? delay : options.popupDelay;
                        });
                        var unregisterTriggers = function() {
                            element.unbind(triggers.show, showTooltipBind);
                            element.unbind(triggers.hide, hideTooltipBind);
                        };
                        attrs.$observe(prefix + "Trigger", function(val) {
                            unregisterTriggers();
                            triggers = getTriggers(val);
                            if (triggers.show === triggers.hide) {
                                element.bind(triggers.show, toggleTooltipBind);
                            } else {
                                element.bind(triggers.show, showTooltipBind);
                                element.bind(triggers.hide, hideTooltipBind);
                            }
                        });
                        var animation = scope.$eval(attrs[prefix + "Animation"]);
                        scope.tt_animation = angular.isDefined(animation) ? !!animation : options.animation;
                        attrs.$observe(prefix + "AppendToBody", function(val) {
                            appendToBody = angular.isDefined(val) ? $parse(val)(scope) : appendToBody;
                        });
                        if (appendToBody) {
                            scope.$on("$locationChangeSuccess", function closeTooltipOnLocationChangeSuccess() {
                                if (scope.tt_isOpen) {
                                    hide();
                                }
                            });
                        }
                        scope.$on("$destroy", function onDestroyTooltip() {
                            $timeout.cancel(transitionTimeout);
                            $timeout.cancel(popupTimeout);
                            unregisterTriggers();
                            removeTooltip();
                        });
                    };
                }
            };
        };
    } ];
}).directive("tooltipPopup", function() {
    return {
        restrict: "EA",
        replace: true,
        scope: {
            content: "@",
            placement: "@",
            animation: "&",
            isOpen: "&"
        },
        templateUrl: "template/tooltip/tooltip-popup.html"
    };
}).directive("tooltip", [ "$tooltip", function($tooltip) {
    return $tooltip("tooltip", "tooltip", "mouseenter");
} ]).directive("tooltipHtmlUnsafePopup", function() {
    return {
        restrict: "EA",
        replace: true,
        scope: {
            content: "@",
            placement: "@",
            animation: "&",
            isOpen: "&"
        },
        templateUrl: "template/tooltip/tooltip-html-unsafe-popup.html"
    };
}).directive("tooltipHtmlUnsafe", [ "$tooltip", function($tooltip) {
    return $tooltip("tooltipHtmlUnsafe", "tooltip", "mouseenter");
} ]);

angular.module("ui.bootstrap.popover", [ "ui.bootstrap.tooltip" ]).directive("popoverPopup", function() {
    return {
        restrict: "EA",
        replace: true,
        scope: {
            title: "@",
            content: "@",
            placement: "@",
            animation: "&",
            isOpen: "&"
        },
        templateUrl: "template/popover/popover.html"
    };
}).directive("popover", [ "$tooltip", function($tooltip) {
    return $tooltip("popover", "popover", "click");
} ]);

angular.module("ui.bootstrap.progressbar", []).constant("progressConfig", {
    animate: true,
    max: 100
}).controller("ProgressController", [ "$scope", "$attrs", "progressConfig", function($scope, $attrs, progressConfig) {
    var self = this, animate = angular.isDefined($attrs.animate) ? $scope.$parent.$eval($attrs.animate) : progressConfig.animate;
    this.bars = [];
    $scope.max = angular.isDefined($attrs.max) ? $scope.$parent.$eval($attrs.max) : progressConfig.max;
    this.addBar = function(bar, element) {
        if (!animate) {
            element.css({
                transition: "none"
            });
        }
        this.bars.push(bar);
        bar.$watch("value", function(value) {
            bar.percent = +(100 * value / $scope.max).toFixed(2);
        });
        bar.$on("$destroy", function() {
            element = null;
            self.removeBar(bar);
        });
    };
    this.removeBar = function(bar) {
        this.bars.splice(this.bars.indexOf(bar), 1);
    };
} ]).directive("progress", function() {
    return {
        restrict: "EA",
        replace: true,
        transclude: true,
        controller: "ProgressController",
        require: "progress",
        scope: {},
        templateUrl: "template/progressbar/progress.html"
    };
}).directive("bar", function() {
    return {
        restrict: "EA",
        replace: true,
        transclude: true,
        require: "^progress",
        scope: {
            value: "=",
            type: "@"
        },
        templateUrl: "template/progressbar/bar.html",
        link: function(scope, element, attrs, progressCtrl) {
            progressCtrl.addBar(scope, element);
        }
    };
}).directive("progressbar", function() {
    return {
        restrict: "EA",
        replace: true,
        transclude: true,
        controller: "ProgressController",
        scope: {
            value: "=",
            type: "@"
        },
        templateUrl: "template/progressbar/progressbar.html",
        link: function(scope, element, attrs, progressCtrl) {
            progressCtrl.addBar(scope, angular.element(element.children()[0]));
        }
    };
});

angular.module("ui.bootstrap.rating", []).constant("ratingConfig", {
    max: 5,
    stateOn: null,
    stateOff: null
}).controller("RatingController", [ "$scope", "$attrs", "ratingConfig", function($scope, $attrs, ratingConfig) {
    var ngModelCtrl = {
        $setViewValue: angular.noop
    };
    this.init = function(ngModelCtrl_) {
        ngModelCtrl = ngModelCtrl_;
        ngModelCtrl.$render = this.render;
        this.stateOn = angular.isDefined($attrs.stateOn) ? $scope.$parent.$eval($attrs.stateOn) : ratingConfig.stateOn;
        this.stateOff = angular.isDefined($attrs.stateOff) ? $scope.$parent.$eval($attrs.stateOff) : ratingConfig.stateOff;
        var ratingStates = angular.isDefined($attrs.ratingStates) ? $scope.$parent.$eval($attrs.ratingStates) : new Array(angular.isDefined($attrs.max) ? $scope.$parent.$eval($attrs.max) : ratingConfig.max);
        $scope.range = this.buildTemplateObjects(ratingStates);
    };
    this.buildTemplateObjects = function(states) {
        for (var i = 0, n = states.length; i < n; i++) {
            states[i] = angular.extend({
                index: i
            }, {
                stateOn: this.stateOn,
                stateOff: this.stateOff
            }, states[i]);
        }
        return states;
    };
    $scope.rate = function(value) {
        if (!$scope.readonly && value >= 0 && value <= $scope.range.length) {
            ngModelCtrl.$setViewValue(value);
            ngModelCtrl.$render();
        }
    };
    $scope.enter = function(value) {
        if (!$scope.readonly) {
            $scope.value = value;
        }
        $scope.onHover({
            value: value
        });
    };
    $scope.reset = function() {
        $scope.value = ngModelCtrl.$viewValue;
        $scope.onLeave();
    };
    $scope.onKeydown = function(evt) {
        if (/(37|38|39|40)/.test(evt.which)) {
            evt.preventDefault();
            evt.stopPropagation();
            $scope.rate($scope.value + (evt.which === 38 || evt.which === 39 ? 1 : -1));
        }
    };
    this.render = function() {
        $scope.value = ngModelCtrl.$viewValue;
    };
} ]).directive("rating", function() {
    return {
        restrict: "EA",
        require: [ "rating", "ngModel" ],
        scope: {
            readonly: "=?",
            onHover: "&",
            onLeave: "&"
        },
        controller: "RatingController",
        templateUrl: "template/rating/rating.html",
        replace: true,
        link: function(scope, element, attrs, ctrls) {
            var ratingCtrl = ctrls[0], ngModelCtrl = ctrls[1];
            if (ngModelCtrl) {
                ratingCtrl.init(ngModelCtrl);
            }
        }
    };
});

angular.module("ui.bootstrap.tabs", []).controller("TabsetController", [ "$scope", function TabsetCtrl($scope) {
    var ctrl = this, tabs = ctrl.tabs = $scope.tabs = [];
    ctrl.select = function(selectedTab) {
        angular.forEach(tabs, function(tab) {
            if (tab.active && tab !== selectedTab) {
                tab.active = false;
                tab.onDeselect();
            }
        });
        selectedTab.active = true;
        selectedTab.onSelect();
    };
    ctrl.addTab = function addTab(tab) {
        tabs.push(tab);
        if (tabs.length === 1) {
            tab.active = true;
        } else if (tab.active) {
            ctrl.select(tab);
        }
    };
    ctrl.removeTab = function removeTab(tab) {
        var index = tabs.indexOf(tab);
        if (tab.active && tabs.length > 1) {
            var newActiveIndex = index == tabs.length - 1 ? index - 1 : index + 1;
            ctrl.select(tabs[newActiveIndex]);
        }
        tabs.splice(index, 1);
    };
} ]).directive("tabset", function() {
    return {
        restrict: "EA",
        transclude: true,
        replace: true,
        scope: {
            type: "@"
        },
        controller: "TabsetController",
        templateUrl: "template/tabs/tabset.html",
        link: function(scope, element, attrs) {
            scope.vertical = angular.isDefined(attrs.vertical) ? scope.$parent.$eval(attrs.vertical) : false;
            scope.justified = angular.isDefined(attrs.justified) ? scope.$parent.$eval(attrs.justified) : false;
        }
    };
}).directive("tab", [ "$parse", function($parse) {
    return {
        require: "^tabset",
        restrict: "EA",
        replace: true,
        templateUrl: "template/tabs/tab.html",
        transclude: true,
        scope: {
            active: "=?",
            heading: "@",
            onSelect: "&select",
            onDeselect: "&deselect"
        },
        controller: function() {},
        compile: function(elm, attrs, transclude) {
            return function postLink(scope, elm, attrs, tabsetCtrl) {
                scope.$watch("active", function(active) {
                    if (active) {
                        tabsetCtrl.select(scope);
                    }
                });
                scope.disabled = false;
                if (attrs.disabled) {
                    scope.$parent.$watch($parse(attrs.disabled), function(value) {
                        scope.disabled = !!value;
                    });
                }
                scope.select = function() {
                    if (!scope.disabled) {
                        scope.active = true;
                    }
                };
                tabsetCtrl.addTab(scope);
                scope.$on("$destroy", function() {
                    tabsetCtrl.removeTab(scope);
                });
                scope.$transcludeFn = transclude;
            };
        }
    };
} ]).directive("tabHeadingTransclude", [ function() {
    return {
        restrict: "A",
        require: "^tab",
        link: function(scope, elm, attrs, tabCtrl) {
            scope.$watch("headingElement", function updateHeadingElement(heading) {
                if (heading) {
                    elm.html("");
                    elm.append(heading);
                }
            });
        }
    };
} ]).directive("tabContentTransclude", function() {
    return {
        restrict: "A",
        require: "^tabset",
        link: function(scope, elm, attrs) {
            var tab = scope.$eval(attrs.tabContentTransclude);
            tab.$transcludeFn(tab.$parent, function(contents) {
                angular.forEach(contents, function(node) {
                    if (isTabHeading(node)) {
                        tab.headingElement = node;
                    } else {
                        elm.append(node);
                    }
                });
            });
        }
    };
    function isTabHeading(node) {
        return node.tagName && (node.hasAttribute("tab-heading") || node.hasAttribute("data-tab-heading") || node.tagName.toLowerCase() === "tab-heading" || node.tagName.toLowerCase() === "data-tab-heading");
    }
});

angular.module("ui.bootstrap.timepicker", []).constant("timepickerConfig", {
    hourStep: 1,
    minuteStep: 1,
    showMeridian: true,
    meridians: null,
    readonlyInput: false,
    mousewheel: true
}).controller("TimepickerController", [ "$scope", "$attrs", "$parse", "$log", "$locale", "timepickerConfig", function($scope, $attrs, $parse, $log, $locale, timepickerConfig) {
    var selected = new Date(), ngModelCtrl = {
        $setViewValue: angular.noop
    }, meridians = angular.isDefined($attrs.meridians) ? $scope.$parent.$eval($attrs.meridians) : timepickerConfig.meridians || $locale.DATETIME_FORMATS.AMPMS;
    this.init = function(ngModelCtrl_, inputs) {
        ngModelCtrl = ngModelCtrl_;
        ngModelCtrl.$render = this.render;
        var hoursInputEl = inputs.eq(0), minutesInputEl = inputs.eq(1);
        var mousewheel = angular.isDefined($attrs.mousewheel) ? $scope.$parent.$eval($attrs.mousewheel) : timepickerConfig.mousewheel;
        if (mousewheel) {
            this.setupMousewheelEvents(hoursInputEl, minutesInputEl);
        }
        $scope.readonlyInput = angular.isDefined($attrs.readonlyInput) ? $scope.$parent.$eval($attrs.readonlyInput) : timepickerConfig.readonlyInput;
        this.setupInputEvents(hoursInputEl, minutesInputEl);
    };
    var hourStep = timepickerConfig.hourStep;
    if ($attrs.hourStep) {
        $scope.$parent.$watch($parse($attrs.hourStep), function(value) {
            hourStep = parseInt(value, 10);
        });
    }
    var minuteStep = timepickerConfig.minuteStep;
    if ($attrs.minuteStep) {
        $scope.$parent.$watch($parse($attrs.minuteStep), function(value) {
            minuteStep = parseInt(value, 10);
        });
    }
    $scope.showMeridian = timepickerConfig.showMeridian;
    if ($attrs.showMeridian) {
        $scope.$parent.$watch($parse($attrs.showMeridian), function(value) {
            $scope.showMeridian = !!value;
            if (ngModelCtrl.$error.time) {
                var hours = getHoursFromTemplate(), minutes = getMinutesFromTemplate();
                if (angular.isDefined(hours) && angular.isDefined(minutes)) {
                    selected.setHours(hours);
                    refresh();
                }
            } else {
                updateTemplate();
            }
        });
    }
    function getHoursFromTemplate() {
        var hours = parseInt($scope.hours, 10);
        var valid = $scope.showMeridian ? hours > 0 && hours < 13 : hours >= 0 && hours < 24;
        if (!valid) {
            return undefined;
        }
        if ($scope.showMeridian) {
            if (hours === 12) {
                hours = 0;
            }
            if ($scope.meridian === meridians[1]) {
                hours = hours + 12;
            }
        }
        return hours;
    }
    function getMinutesFromTemplate() {
        var minutes = parseInt($scope.minutes, 10);
        return minutes >= 0 && minutes < 60 ? minutes : undefined;
    }
    function pad(value) {
        return angular.isDefined(value) && value.toString().length < 2 ? "0" + value : value;
    }
    this.setupMousewheelEvents = function(hoursInputEl, minutesInputEl) {
        var isScrollingUp = function(e) {
            if (e.originalEvent) {
                e = e.originalEvent;
            }
            var delta = e.wheelDelta ? e.wheelDelta : -e.deltaY;
            return e.detail || delta > 0;
        };
        hoursInputEl.bind("mousewheel wheel", function(e) {
            $scope.$apply(isScrollingUp(e) ? $scope.incrementHours() : $scope.decrementHours());
            e.preventDefault();
        });
        minutesInputEl.bind("mousewheel wheel", function(e) {
            $scope.$apply(isScrollingUp(e) ? $scope.incrementMinutes() : $scope.decrementMinutes());
            e.preventDefault();
        });
    };
    this.setupInputEvents = function(hoursInputEl, minutesInputEl) {
        if ($scope.readonlyInput) {
            $scope.updateHours = angular.noop;
            $scope.updateMinutes = angular.noop;
            return;
        }
        var invalidate = function(invalidHours, invalidMinutes) {
            ngModelCtrl.$setViewValue(null);
            ngModelCtrl.$setValidity("time", false);
            if (angular.isDefined(invalidHours)) {
                $scope.invalidHours = invalidHours;
            }
            if (angular.isDefined(invalidMinutes)) {
                $scope.invalidMinutes = invalidMinutes;
            }
        };
        $scope.updateHours = function() {
            var hours = getHoursFromTemplate();
            if (angular.isDefined(hours)) {
                selected.setHours(hours);
                refresh("h");
            } else {
                invalidate(true);
            }
        };
        hoursInputEl.bind("blur", function(e) {
            if (!$scope.invalidHours && $scope.hours < 10) {
                $scope.$apply(function() {
                    $scope.hours = pad($scope.hours);
                });
            }
        });
        $scope.updateMinutes = function() {
            var minutes = getMinutesFromTemplate();
            if (angular.isDefined(minutes)) {
                selected.setMinutes(minutes);
                refresh("m");
            } else {
                invalidate(undefined, true);
            }
        };
        minutesInputEl.bind("blur", function(e) {
            if (!$scope.invalidMinutes && $scope.minutes < 10) {
                $scope.$apply(function() {
                    $scope.minutes = pad($scope.minutes);
                });
            }
        });
    };
    this.render = function() {
        var date = ngModelCtrl.$modelValue ? new Date(ngModelCtrl.$modelValue) : null;
        if (isNaN(date)) {
            ngModelCtrl.$setValidity("time", false);
            $log.error('Timepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.');
        } else {
            if (date) {
                selected = date;
            }
            makeValid();
            updateTemplate();
        }
    };
    function refresh(keyboardChange) {
        makeValid();
        ngModelCtrl.$setViewValue(new Date(selected));
        updateTemplate(keyboardChange);
    }
    function makeValid() {
        ngModelCtrl.$setValidity("time", true);
        $scope.invalidHours = false;
        $scope.invalidMinutes = false;
    }
    function updateTemplate(keyboardChange) {
        var hours = selected.getHours(), minutes = selected.getMinutes();
        if ($scope.showMeridian) {
            hours = hours === 0 || hours === 12 ? 12 : hours % 12;
        }
        $scope.hours = keyboardChange === "h" ? hours : pad(hours);
        $scope.minutes = keyboardChange === "m" ? minutes : pad(minutes);
        $scope.meridian = selected.getHours() < 12 ? meridians[0] : meridians[1];
    }
    function addMinutes(minutes) {
        var dt = new Date(selected.getTime() + minutes * 6e4);
        selected.setHours(dt.getHours(), dt.getMinutes());
        refresh();
    }
    $scope.incrementHours = function() {
        addMinutes(hourStep * 60);
    };
    $scope.decrementHours = function() {
        addMinutes(-hourStep * 60);
    };
    $scope.incrementMinutes = function() {
        addMinutes(minuteStep);
    };
    $scope.decrementMinutes = function() {
        addMinutes(-minuteStep);
    };
    $scope.toggleMeridian = function() {
        addMinutes(12 * 60 * (selected.getHours() < 12 ? 1 : -1));
    };
} ]).directive("timepicker", function() {
    return {
        restrict: "EA",
        require: [ "timepicker", "?^ngModel" ],
        controller: "TimepickerController",
        replace: true,
        scope: {},
        templateUrl: "template/timepicker/timepicker.html",
        link: function(scope, element, attrs, ctrls) {
            var timepickerCtrl = ctrls[0], ngModelCtrl = ctrls[1];
            if (ngModelCtrl) {
                timepickerCtrl.init(ngModelCtrl, element.find("input"));
            }
        }
    };
});

angular.module("ui.bootstrap.typeahead", [ "ui.bootstrap.position", "ui.bootstrap.bindHtml" ]).factory("typeaheadParser", [ "$parse", function($parse) {
    var TYPEAHEAD_REGEXP = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+([\s\S]+?)$/;
    return {
        parse: function(input) {
            var match = input.match(TYPEAHEAD_REGEXP);
            if (!match) {
                throw new Error('Expected typeahead specification in form of "_modelValue_ (as _label_)? for _item_ in _collection_"' + ' but got "' + input + '".');
            }
            return {
                itemName: match[3],
                source: $parse(match[4]),
                viewMapper: $parse(match[2] || match[1]),
                modelMapper: $parse(match[1])
            };
        }
    };
} ]).directive("typeahead", [ "$compile", "$parse", "$q", "$timeout", "$document", "$position", "typeaheadParser", function($compile, $parse, $q, $timeout, $document, $position, typeaheadParser) {
    var HOT_KEYS = [ 9, 13, 27, 38, 40 ];
    return {
        require: "ngModel",
        link: function(originalScope, element, attrs, modelCtrl) {
            var minSearch = originalScope.$eval(attrs.typeaheadMinLength) || 1;
            var waitTime = originalScope.$eval(attrs.typeaheadWaitMs) || 0;
            var isEditable = originalScope.$eval(attrs.typeaheadEditable) !== false;
            var isLoadingSetter = $parse(attrs.typeaheadLoading).assign || angular.noop;
            var onSelectCallback = $parse(attrs.typeaheadOnSelect);
            var inputFormatter = attrs.typeaheadInputFormatter ? $parse(attrs.typeaheadInputFormatter) : undefined;
            var appendToBody = attrs.typeaheadAppendToBody ? originalScope.$eval(attrs.typeaheadAppendToBody) : false;
            var $setModelValue = $parse(attrs.ngModel).assign;
            var parserResult = typeaheadParser.parse(attrs.typeahead);
            var hasFocus;
            var scope = originalScope.$new();
            originalScope.$on("$destroy", function() {
                scope.$destroy();
            });
            var popupId = "typeahead-" + scope.$id + "-" + Math.floor(Math.random() * 1e4);
            element.attr({
                "aria-autocomplete": "list",
                "aria-expanded": false,
                "aria-owns": popupId
            });
            var popUpEl = angular.element("<div typeahead-popup></div>");
            popUpEl.attr({
                id: popupId,
                matches: "matches",
                active: "activeIdx",
                select: "select(activeIdx)",
                query: "query",
                position: "position"
            });
            if (angular.isDefined(attrs.typeaheadTemplateUrl)) {
                popUpEl.attr("template-url", attrs.typeaheadTemplateUrl);
            }
            var resetMatches = function() {
                scope.matches = [];
                scope.activeIdx = -1;
                element.attr("aria-expanded", false);
            };
            var getMatchId = function(index) {
                return popupId + "-option-" + index;
            };
            scope.$watch("activeIdx", function(index) {
                if (index < 0) {
                    element.removeAttr("aria-activedescendant");
                } else {
                    element.attr("aria-activedescendant", getMatchId(index));
                }
            });
            var getMatchesAsync = function(inputValue) {
                var locals = {
                    $viewValue: inputValue
                };
                isLoadingSetter(originalScope, true);
                $q.when(parserResult.source(originalScope, locals)).then(function(matches) {
                    var onCurrentRequest = inputValue === modelCtrl.$viewValue;
                    if (onCurrentRequest && hasFocus) {
                        if (matches.length > 0) {
                            scope.activeIdx = 0;
                            scope.matches.length = 0;
                            for (var i = 0; i < matches.length; i++) {
                                locals[parserResult.itemName] = matches[i];
                                scope.matches.push({
                                    id: getMatchId(i),
                                    label: parserResult.viewMapper(scope, locals),
                                    model: matches[i]
                                });
                            }
                            scope.query = inputValue;
                            scope.position = appendToBody ? $position.offset(element) : $position.position(element);
                            scope.position.top = scope.position.top + element.prop("offsetHeight");
                            element.attr("aria-expanded", true);
                        } else {
                            resetMatches();
                        }
                    }
                    if (onCurrentRequest) {
                        isLoadingSetter(originalScope, false);
                    }
                }, function() {
                    resetMatches();
                    isLoadingSetter(originalScope, false);
                });
            };
            resetMatches();
            scope.query = undefined;
            var timeoutPromise;
            var scheduleSearchWithTimeout = function(inputValue) {
                timeoutPromise = $timeout(function() {
                    getMatchesAsync(inputValue);
                }, waitTime);
            };
            var cancelPreviousTimeout = function() {
                if (timeoutPromise) {
                    $timeout.cancel(timeoutPromise);
                }
            };
            modelCtrl.$parsers.unshift(function(inputValue) {
                hasFocus = true;
                if (inputValue && inputValue.length >= minSearch) {
                    if (waitTime > 0) {
                        cancelPreviousTimeout();
                        scheduleSearchWithTimeout(inputValue);
                    } else {
                        getMatchesAsync(inputValue);
                    }
                } else {
                    isLoadingSetter(originalScope, false);
                    cancelPreviousTimeout();
                    resetMatches();
                }
                if (isEditable) {
                    return inputValue;
                } else {
                    if (!inputValue) {
                        modelCtrl.$setValidity("editable", true);
                        return inputValue;
                    } else {
                        modelCtrl.$setValidity("editable", false);
                        return undefined;
                    }
                }
            });
            modelCtrl.$formatters.push(function(modelValue) {
                var candidateViewValue, emptyViewValue;
                var locals = {};
                if (inputFormatter) {
                    locals["$model"] = modelValue;
                    return inputFormatter(originalScope, locals);
                } else {
                    locals[parserResult.itemName] = modelValue;
                    candidateViewValue = parserResult.viewMapper(originalScope, locals);
                    locals[parserResult.itemName] = undefined;
                    emptyViewValue = parserResult.viewMapper(originalScope, locals);
                    return candidateViewValue !== emptyViewValue ? candidateViewValue : modelValue;
                }
            });
            scope.select = function(activeIdx) {
                var locals = {};
                var model, item;
                locals[parserResult.itemName] = item = scope.matches[activeIdx].model;
                model = parserResult.modelMapper(originalScope, locals);
                $setModelValue(originalScope, model);
                modelCtrl.$setValidity("editable", true);
                onSelectCallback(originalScope, {
                    $item: item,
                    $model: model,
                    $label: parserResult.viewMapper(originalScope, locals)
                });
                resetMatches();
                $timeout(function() {
                    element[0].focus();
                }, 0, false);
            };
            element.bind("keydown", function(evt) {
                if (scope.matches.length === 0 || HOT_KEYS.indexOf(evt.which) === -1) {
                    return;
                }
                evt.preventDefault();
                if (evt.which === 40) {
                    scope.activeIdx = (scope.activeIdx + 1) % scope.matches.length;
                    scope.$digest();
                } else if (evt.which === 38) {
                    scope.activeIdx = (scope.activeIdx ? scope.activeIdx : scope.matches.length) - 1;
                    scope.$digest();
                } else if (evt.which === 13 || evt.which === 9) {
                    scope.$apply(function() {
                        scope.select(scope.activeIdx);
                    });
                } else if (evt.which === 27) {
                    evt.stopPropagation();
                    resetMatches();
                    scope.$digest();
                }
            });
            element.bind("blur", function(evt) {
                hasFocus = false;
            });
            var dismissClickHandler = function(evt) {
                if (element[0] !== evt.target) {
                    resetMatches();
                    scope.$digest();
                }
            };
            $document.bind("click", dismissClickHandler);
            originalScope.$on("$destroy", function() {
                $document.unbind("click", dismissClickHandler);
            });
            var $popup = $compile(popUpEl)(scope);
            if (appendToBody) {
                $document.find("body").append($popup);
            } else {
                element.after($popup);
            }
        }
    };
} ]).directive("typeaheadPopup", function() {
    return {
        restrict: "EA",
        scope: {
            matches: "=",
            query: "=",
            active: "=",
            position: "=",
            select: "&"
        },
        replace: true,
        templateUrl: "template/typeahead/typeahead-popup.html",
        link: function(scope, element, attrs) {
            scope.templateUrl = attrs.templateUrl;
            scope.isOpen = function() {
                return scope.matches.length > 0;
            };
            scope.isActive = function(matchIdx) {
                return scope.active == matchIdx;
            };
            scope.selectActive = function(matchIdx) {
                scope.active = matchIdx;
            };
            scope.selectMatch = function(activeIdx) {
                scope.select({
                    activeIdx: activeIdx
                });
            };
        }
    };
}).directive("typeaheadMatch", [ "$http", "$templateCache", "$compile", "$parse", function($http, $templateCache, $compile, $parse) {
    return {
        restrict: "EA",
        scope: {
            index: "=",
            match: "=",
            query: "="
        },
        link: function(scope, element, attrs) {
            var tplUrl = $parse(attrs.templateUrl)(scope.$parent) || "template/typeahead/typeahead-match.html";
            $http.get(tplUrl, {
                cache: $templateCache
            }).success(function(tplContent) {
                element.replaceWith($compile(tplContent.trim())(scope));
            });
        }
    };
} ]).filter("typeaheadHighlight", function() {
    function escapeRegexp(queryToEscape) {
        return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
    }
    return function(matchItem, query) {
        return query ? ("" + matchItem).replace(new RegExp(escapeRegexp(query), "gi"), "<strong>$&</strong>") : matchItem;
    };
});

angular.module("template/accordion/accordion-group.html", []).run([ "$templateCache", function($templateCache) {
    $templateCache.put("template/accordion/accordion-group.html", '<div class="panel panel-default">\n' + '  <div class="panel-heading">\n' + '    <h4 class="panel-title">\n' + '      <a class="accordion-toggle" ng-click="toggleOpen()" accordion-transclude="heading"><span ng-class="{\'text-muted\': isDisabled}">{{heading}}</span></a>\n' + "    </h4>\n" + "  </div>\n" + '  <div class="panel-collapse" collapse="!isOpen">\n' + '	  <div class="panel-body" ng-transclude></div>\n' + "  </div>\n" + "</div>");
} ]);

angular.module("template/accordion/accordion.html", []).run([ "$templateCache", function($templateCache) {
    $templateCache.put("template/accordion/accordion.html", '<div class="panel-group" ng-transclude></div>');
} ]);

angular.module("template/alert/alert.html", []).run([ "$templateCache", function($templateCache) {
    $templateCache.put("template/alert/alert.html", "<div class=\"alert\" ng-class=\"['alert-' + (type || 'warning'), closeable ? 'alert-dismissable' : null]\" role=\"alert\">\n" + '    <button ng-show="closeable" type="button" class="close" ng-click="close()">\n' + '        <span aria-hidden="true">&times;</span>\n' + '        <span class="sr-only">Close</span>\n' + "    </button>\n" + "    <div ng-transclude></div>\n" + "</div>\n" + "");
} ]);

angular.module("template/carousel/carousel.html", []).run([ "$templateCache", function($templateCache) {
    $templateCache.put("template/carousel/carousel.html", '<div ng-mouseenter="pause()" ng-mouseleave="play()" class="carousel" ng-swipe-right="prev()" ng-swipe-left="next()">\n' + '    <ol class="carousel-indicators" ng-show="slides.length > 1">\n' + '        <li ng-repeat="slide in slides track by $index" ng-class="{active: isActive(slide)}" ng-click="select(slide)"></li>\n' + "    </ol>\n" + '    <div class="carousel-inner" ng-transclude></div>\n' + '    <a class="left carousel-control" ng-click="prev()" ng-show="slides.length > 1"><span class="glyphicon glyphicon-chevron-left"></span></a>\n' + '    <a class="right carousel-control" ng-click="next()" ng-show="slides.length > 1"><span class="glyphicon glyphicon-chevron-right"></span></a>\n' + "</div>\n" + "");
} ]);

angular.module("template/carousel/slide.html", []).run([ "$templateCache", function($templateCache) {
    $templateCache.put("template/carousel/slide.html", '<div ng-class="{\n' + "    'active': leaving || (active && !entering),\n" + "    'prev': (next || active) && direction=='prev',\n" + "    'next': (next || active) && direction=='next',\n" + "    'right': direction=='prev',\n" + "    'left': direction=='next'\n" + '  }" class="item text-center" ng-transclude></div>\n' + "");
} ]);

angular.module("template/datepicker/datepicker.html", []).run([ "$templateCache", function($templateCache) {
    $templateCache.put("template/datepicker/datepicker.html", '<div ng-switch="datepickerMode" role="application" ng-keydown="keydown($event)">\n' + '  <daypicker ng-switch-when="day" tabindex="0"></daypicker>\n' + '  <monthpicker ng-switch-when="month" tabindex="0"></monthpicker>\n' + '  <yearpicker ng-switch-when="year" tabindex="0"></yearpicker>\n' + "</div>");
} ]);

angular.module("template/datepicker/day.html", []).run([ "$templateCache", function($templateCache) {
    $templateCache.put("template/datepicker/day.html", '<table role="grid" aria-labelledby="{{uniqueId}}-title" aria-activedescendant="{{activeDateId}}">\n' + "  <thead>\n" + "    <tr>\n" + '      <th><button type="button" class="btn btn-default btn-sm pull-left" ng-click="move(-1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-left"></i></button></th>\n' + '      <th colspan="{{5 + showWeeks}}"><button id="{{uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" class="btn btn-default btn-sm" ng-click="toggleMode()" tabindex="-1" style="width:100%;"><strong>{{title}}</strong></button></th>\n' + '      <th><button type="button" class="btn btn-default btn-sm pull-right" ng-click="move(1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-right"></i></button></th>\n' + "    </tr>\n" + "    <tr>\n" + '      <th ng-show="showWeeks" class="text-center"></th>\n' + '      <th ng-repeat="label in labels track by $index" class="text-center"><small aria-label="{{label.full}}">{{label.abbr}}</small></th>\n' + "    </tr>\n" + "  </thead>\n" + "  <tbody>\n" + '    <tr ng-repeat="row in rows track by $index">\n' + '      <td ng-show="showWeeks" class="text-center h6"><em>{{ weekNumbers[$index] }}</em></td>\n' + '      <td ng-repeat="dt in row track by dt.date" class="text-center" role="gridcell" id="{{dt.uid}}" aria-disabled="{{!!dt.disabled}}">\n' + '        <button type="button" style="width:100%;" class="btn btn-default btn-sm" ng-class="{\'btn-info\': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabindex="-1"><span ng-class="{\'text-muted\': dt.secondary, \'text-info\': dt.current}">{{dt.label}}</span></button>\n' + "      </td>\n" + "    </tr>\n" + "  </tbody>\n" + "</table>\n" + "");
} ]);

angular.module("template/datepicker/month.html", []).run([ "$templateCache", function($templateCache) {
    $templateCache.put("template/datepicker/month.html", '<table role="grid" aria-labelledby="{{uniqueId}}-title" aria-activedescendant="{{activeDateId}}">\n' + "  <thead>\n" + "    <tr>\n" + '      <th><button type="button" class="btn btn-default btn-sm pull-left" ng-click="move(-1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-left"></i></button></th>\n' + '      <th><button id="{{uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" class="btn btn-default btn-sm" ng-click="toggleMode()" tabindex="-1" style="width:100%;"><strong>{{title}}</strong></button></th>\n' + '      <th><button type="button" class="btn btn-default btn-sm pull-right" ng-click="move(1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-right"></i></button></th>\n' + "    </tr>\n" + "  </thead>\n" + "  <tbody>\n" + '    <tr ng-repeat="row in rows track by $index">\n' + '      <td ng-repeat="dt in row track by dt.date" class="text-center" role="gridcell" id="{{dt.uid}}" aria-disabled="{{!!dt.disabled}}">\n' + '        <button type="button" style="width:100%;" class="btn btn-default" ng-class="{\'btn-info\': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabindex="-1"><span ng-class="{\'text-info\': dt.current}">{{dt.label}}</span></button>\n' + "      </td>\n" + "    </tr>\n" + "  </tbody>\n" + "</table>\n" + "");
} ]);

angular.module("template/datepicker/popup.html", []).run([ "$templateCache", function($templateCache) {
    $templateCache.put("template/datepicker/popup.html", "<ul class=\"dropdown-menu\" ng-style=\"{display: (isOpen && 'block') || 'none', top: position.top+'px', left: position.left+'px'}\" ng-keydown=\"keydown($event)\">\n" + "	<li ng-transclude></li>\n" + '	<li ng-if="showButtonBar" style="padding:10px 9px 2px">\n' + '		<span class="btn-group">\n' + '			<button type="button" class="btn btn-sm btn-info" ng-click="select(\'today\')">{{ getText(\'current\') }}</button>\n' + '			<button type="button" class="btn btn-sm btn-danger" ng-click="select(null)">{{ getText(\'clear\') }}</button>\n' + "		</span>\n" + '		<button type="button" class="btn btn-sm btn-success pull-right" ng-click="close()">{{ getText(\'close\') }}</button>\n' + "	</li>\n" + "</ul>\n" + "");
} ]);

angular.module("template/datepicker/year.html", []).run([ "$templateCache", function($templateCache) {
    $templateCache.put("template/datepicker/year.html", '<table role="grid" aria-labelledby="{{uniqueId}}-title" aria-activedescendant="{{activeDateId}}">\n' + "  <thead>\n" + "    <tr>\n" + '      <th><button type="button" class="btn btn-default btn-sm pull-left" ng-click="move(-1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-left"></i></button></th>\n' + '      <th colspan="3"><button id="{{uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" class="btn btn-default btn-sm" ng-click="toggleMode()" tabindex="-1" style="width:100%;"><strong>{{title}}</strong></button></th>\n' + '      <th><button type="button" class="btn btn-default btn-sm pull-right" ng-click="move(1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-right"></i></button></th>\n' + "    </tr>\n" + "  </thead>\n" + "  <tbody>\n" + '    <tr ng-repeat="row in rows track by $index">\n' + '      <td ng-repeat="dt in row track by dt.date" class="text-center" role="gridcell" id="{{dt.uid}}" aria-disabled="{{!!dt.disabled}}">\n' + '        <button type="button" style="width:100%;" class="btn btn-default" ng-class="{\'btn-info\': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabindex="-1"><span ng-class="{\'text-info\': dt.current}">{{dt.label}}</span></button>\n' + "      </td>\n" + "    </tr>\n" + "  </tbody>\n" + "</table>\n" + "");
} ]);

angular.module("template/modal/backdrop.html", []).run([ "$templateCache", function($templateCache) {
    $templateCache.put("template/modal/backdrop.html", '<div class="modal-backdrop fade {{ backdropClass }}"\n' + '     ng-class="{in: animate}"\n' + "     ng-style=\"{'z-index': 1040 + (index && 1 || 0) + index*10}\"\n" + "></div>\n" + "");
} ]);

angular.module("template/modal/window.html", []).run([ "$templateCache", function($templateCache) {
    $templateCache.put("template/modal/window.html", '<div tabindex="-1" role="dialog" class="modal fade" ng-class="{in: animate}" ng-style="{\'z-index\': 1050 + index*10, display: \'block\'}" ng-click="close($event)">\n' + "    <div class=\"modal-dialog\" ng-class=\"{'modal-sm': size == 'sm', 'modal-lg': size == 'lg'}\"><div class=\"modal-content\" modal-transclude></div></div>\n" + "</div>");
} ]);

angular.module("template/pagination/pager.html", []).run([ "$templateCache", function($templateCache) {
    $templateCache.put("template/pagination/pager.html", '<ul class="pager">\n' + '  <li ng-class="{disabled: noPrevious(), previous: align}"><a href ng-click="selectPage(page - 1)">{{getText(\'previous\')}}</a></li>\n' + '  <li ng-class="{disabled: noNext(), next: align}"><a href ng-click="selectPage(page + 1)">{{getText(\'next\')}}</a></li>\n' + "</ul>");
} ]);

angular.module("template/pagination/pagination.html", []).run([ "$templateCache", function($templateCache) {
    $templateCache.put("template/pagination/pagination.html", '<ul class="pagination">\n' + '  <li ng-if="boundaryLinks" ng-class="{disabled: noPrevious()}"><a href ng-click="selectPage(1)">{{getText(\'first\')}}</a></li>\n' + '  <li ng-if="directionLinks" ng-class="{disabled: noPrevious()}"><a href ng-click="selectPage(page - 1)">{{getText(\'previous\')}}</a></li>\n' + '  <li ng-repeat="page in pages track by $index" ng-class="{active: page.active}"><a href ng-click="selectPage(page.number)">{{page.text}}</a></li>\n' + '  <li ng-if="directionLinks" ng-class="{disabled: noNext()}"><a href ng-click="selectPage(page + 1)">{{getText(\'next\')}}</a></li>\n' + '  <li ng-if="boundaryLinks" ng-class="{disabled: noNext()}"><a href ng-click="selectPage(totalPages)">{{getText(\'last\')}}</a></li>\n' + "</ul>");
} ]);

angular.module("template/tooltip/tooltip-html-unsafe-popup.html", []).run([ "$templateCache", function($templateCache) {
    $templateCache.put("template/tooltip/tooltip-html-unsafe-popup.html", '<div class="tooltip {{placement}}" ng-class="{ in: isOpen(), fade: animation() }">\n' + '  <div class="tooltip-arrow"></div>\n' + '  <div class="tooltip-inner" bind-html-unsafe="content"></div>\n' + "</div>\n" + "");
} ]);

angular.module("template/tooltip/tooltip-popup.html", []).run([ "$templateCache", function($templateCache) {
    $templateCache.put("template/tooltip/tooltip-popup.html", '<div class="tooltip {{placement}}" ng-class="{ in: isOpen(), fade: animation() }">\n' + '  <div class="tooltip-arrow"></div>\n' + '  <div class="tooltip-inner" ng-bind="content"></div>\n' + "</div>\n" + "");
} ]);

angular.module("template/popover/popover.html", []).run([ "$templateCache", function($templateCache) {
    $templateCache.put("template/popover/popover.html", '<div class="popover {{placement}}" ng-class="{ in: isOpen(), fade: animation() }">\n' + '  <div class="arrow"></div>\n' + "\n" + '  <div class="popover-inner">\n' + '      <h3 class="popover-title" ng-bind="title" ng-show="title"></h3>\n' + '      <div class="popover-content" ng-bind="content"></div>\n' + "  </div>\n" + "</div>\n" + "");
} ]);

angular.module("template/progressbar/bar.html", []).run([ "$templateCache", function($templateCache) {
    $templateCache.put("template/progressbar/bar.html", '<div class="progress-bar" ng-class="type && \'progress-bar-\' + type" role="progressbar" aria-valuenow="{{value}}" aria-valuemin="0" aria-valuemax="{{max}}" ng-style="{width: percent + \'%\'}" aria-valuetext="{{percent | number:0}}%" ng-transclude></div>');
} ]);

angular.module("template/progressbar/progress.html", []).run([ "$templateCache", function($templateCache) {
    $templateCache.put("template/progressbar/progress.html", '<div class="progress" ng-transclude></div>');
} ]);

angular.module("template/progressbar/progressbar.html", []).run([ "$templateCache", function($templateCache) {
    $templateCache.put("template/progressbar/progressbar.html", '<div class="progress">\n' + '  <div class="progress-bar" ng-class="type && \'progress-bar-\' + type" role="progressbar" aria-valuenow="{{value}}" aria-valuemin="0" aria-valuemax="{{max}}" ng-style="{width: percent + \'%\'}" aria-valuetext="{{percent | number:0}}%" ng-transclude></div>\n' + "</div>");
} ]);

angular.module("template/rating/rating.html", []).run([ "$templateCache", function($templateCache) {
    $templateCache.put("template/rating/rating.html", '<span ng-mouseleave="reset()" ng-keydown="onKeydown($event)" tabindex="0" role="slider" aria-valuemin="0" aria-valuemax="{{range.length}}" aria-valuenow="{{value}}">\n' + '    <i ng-repeat="r in range track by $index" ng-mouseenter="enter($index + 1)" ng-click="rate($index + 1)" class="glyphicon" ng-class="$index < value && (r.stateOn || \'glyphicon-star\') || (r.stateOff || \'glyphicon-star-empty\')">\n' + "        <span class=\"sr-only\">({{ $index < value ? '*' : ' ' }})</span>\n" + "    </i>\n" + "</span>");
} ]);

angular.module("template/tabs/tab.html", []).run([ "$templateCache", function($templateCache) {
    $templateCache.put("template/tabs/tab.html", '<li ng-class="{active: active, disabled: disabled}">\n' + '  <a ng-click="select()" tab-heading-transclude>{{heading}}</a>\n' + "</li>\n" + "");
} ]);

angular.module("template/tabs/tabset.html", []).run([ "$templateCache", function($templateCache) {
    $templateCache.put("template/tabs/tabset.html", "<div>\n" + "  <ul class=\"nav nav-{{type || 'tabs'}}\" ng-class=\"{'nav-stacked': vertical, 'nav-justified': justified}\" ng-transclude></ul>\n" + '  <div class="tab-content">\n' + '    <div class="tab-pane" \n' + '         ng-repeat="tab in tabs" \n' + '         ng-class="{active: tab.active}"\n' + '         tab-content-transclude="tab">\n' + "    </div>\n" + "  </div>\n" + "</div>\n" + "");
} ]);

angular.module("template/timepicker/timepicker.html", []).run([ "$templateCache", function($templateCache) {
    $templateCache.put("template/timepicker/timepicker.html", "<table>\n" + "	<tbody>\n" + '		<tr class="text-center">\n' + '			<td><a ng-click="incrementHours()" class="btn btn-link"><span class="glyphicon glyphicon-chevron-up"></span></a></td>\n' + "			<td>&nbsp;</td>\n" + '			<td><a ng-click="incrementMinutes()" class="btn btn-link"><span class="glyphicon glyphicon-chevron-up"></span></a></td>\n' + '			<td ng-show="showMeridian"></td>\n' + "		</tr>\n" + "		<tr>\n" + '			<td style="width:50px;" class="form-group" ng-class="{\'has-error\': invalidHours}">\n' + '				<input type="text" ng-model="hours" ng-change="updateHours()" class="form-control text-center" ng-mousewheel="incrementHours()" ng-readonly="readonlyInput" maxlength="2">\n' + "			</td>\n" + "			<td>:</td>\n" + '			<td style="width:50px;" class="form-group" ng-class="{\'has-error\': invalidMinutes}">\n' + '				<input type="text" ng-model="minutes" ng-change="updateMinutes()" class="form-control text-center" ng-readonly="readonlyInput" maxlength="2">\n' + "			</td>\n" + '			<td ng-show="showMeridian"><button type="button" class="btn btn-default text-center" ng-click="toggleMeridian()">{{meridian}}</button></td>\n' + "		</tr>\n" + '		<tr class="text-center">\n' + '			<td><a ng-click="decrementHours()" class="btn btn-link"><span class="glyphicon glyphicon-chevron-down"></span></a></td>\n' + "			<td>&nbsp;</td>\n" + '			<td><a ng-click="decrementMinutes()" class="btn btn-link"><span class="glyphicon glyphicon-chevron-down"></span></a></td>\n' + '			<td ng-show="showMeridian"></td>\n' + "		</tr>\n" + "	</tbody>\n" + "</table>\n" + "");
} ]);

angular.module("template/typeahead/typeahead-match.html", []).run([ "$templateCache", function($templateCache) {
    $templateCache.put("template/typeahead/typeahead-match.html", '<a tabindex="-1" bind-html-unsafe="match.label | typeaheadHighlight:query"></a>');
} ]);

angular.module("template/typeahead/typeahead-popup.html", []).run([ "$templateCache", function($templateCache) {
    $templateCache.put("template/typeahead/typeahead-popup.html", '<ul class="dropdown-menu" ng-show="isOpen()" ng-style="{top: position.top+\'px\', left: position.left+\'px\'}" style="display: block;" role="listbox" aria-hidden="{{!isOpen()}}">\n' + '    <li ng-repeat="match in matches track by $index" ng-class="{active: isActive($index) }" ng-mouseenter="selectActive($index)" ng-click="selectMatch($index)" role="option" id="{{match.id}}">\n' + '        <div typeahead-match index="$index" match="match" query="query" template-url="templateUrl"></div>\n' + "    </li>\n" + "</ul>\n" + "");
} ]);

(function(window, angular, undefined) {
    "use strict";
    var ngRouteModule = angular.module("ngRoute", [ "ng" ]).provider("$route", $RouteProvider), $routeMinErr = angular.$$minErr("ngRoute");
    function $RouteProvider() {
        function inherit(parent, extra) {
            return angular.extend(new (angular.extend(function() {}, {
                prototype: parent
            }))(), extra);
        }
        var routes = {};
        this.when = function(path, route) {
            routes[path] = angular.extend({
                reloadOnSearch: true
            }, route, path && pathRegExp(path, route));
            if (path) {
                var redirectPath = path[path.length - 1] == "/" ? path.substr(0, path.length - 1) : path + "/";
                routes[redirectPath] = angular.extend({
                    redirectTo: path
                }, pathRegExp(redirectPath, route));
            }
            return this;
        };
        function pathRegExp(path, opts) {
            var insensitive = opts.caseInsensitiveMatch, ret = {
                originalPath: path,
                regexp: path
            }, keys = ret.keys = [];
            path = path.replace(/([().])/g, "\\$1").replace(/(\/)?:(\w+)([\?\*])?/g, function(_, slash, key, option) {
                var optional = option === "?" ? option : null;
                var star = option === "*" ? option : null;
                keys.push({
                    name: key,
                    optional: !!optional
                });
                slash = slash || "";
                return "" + (optional ? "" : slash) + "(?:" + (optional ? slash : "") + (star && "(.+?)" || "([^/]+)") + (optional || "") + ")" + (optional || "");
            }).replace(/([\/$\*])/g, "\\$1");
            ret.regexp = new RegExp("^" + path + "$", insensitive ? "i" : "");
            return ret;
        }
        this.otherwise = function(params) {
            if (typeof params === "string") {
                params = {
                    redirectTo: params
                };
            }
            this.when(null, params);
            return this;
        };
        this.$get = [ "$rootScope", "$location", "$routeParams", "$q", "$injector", "$templateRequest", "$sce", function($rootScope, $location, $routeParams, $q, $injector, $templateRequest, $sce) {
            var forceReload = false, preparedRoute, preparedRouteIsUpdateOnly, $route = {
                routes: routes,
                reload: function() {
                    forceReload = true;
                    $rootScope.$evalAsync(function() {
                        prepareRoute();
                        commitRoute();
                    });
                },
                updateParams: function(newParams) {
                    if (this.current && this.current.$$route) {
                        var searchParams = {}, self = this;
                        angular.forEach(Object.keys(newParams), function(key) {
                            if (!self.current.pathParams[key]) searchParams[key] = newParams[key];
                        });
                        newParams = angular.extend({}, this.current.params, newParams);
                        $location.path(interpolate(this.current.$$route.originalPath, newParams));
                        $location.search(angular.extend({}, $location.search(), searchParams));
                    } else {
                        throw $routeMinErr("norout", "Tried updating route when with no current route");
                    }
                }
            };
            $rootScope.$on("$locationChangeStart", prepareRoute);
            $rootScope.$on("$locationChangeSuccess", commitRoute);
            return $route;
            function switchRouteMatcher(on, route) {
                var keys = route.keys, params = {};
                if (!route.regexp) return null;
                var m = route.regexp.exec(on);
                if (!m) return null;
                for (var i = 1, len = m.length; i < len; ++i) {
                    var key = keys[i - 1];
                    var val = m[i];
                    if (key && val) {
                        params[key.name] = val;
                    }
                }
                return params;
            }
            function prepareRoute($locationEvent) {
                var lastRoute = $route.current;
                preparedRoute = parseRoute();
                preparedRouteIsUpdateOnly = preparedRoute && lastRoute && preparedRoute.$$route === lastRoute.$$route && angular.equals(preparedRoute.pathParams, lastRoute.pathParams) && !preparedRoute.reloadOnSearch && !forceReload;
                if (!preparedRouteIsUpdateOnly && (lastRoute || preparedRoute)) {
                    if ($rootScope.$broadcast("$routeChangeStart", preparedRoute, lastRoute).defaultPrevented) {
                        if ($locationEvent) {
                            $locationEvent.preventDefault();
                        }
                    }
                }
            }
            function commitRoute() {
                var lastRoute = $route.current;
                var nextRoute = preparedRoute;
                if (preparedRouteIsUpdateOnly) {
                    lastRoute.params = nextRoute.params;
                    angular.copy(lastRoute.params, $routeParams);
                    $rootScope.$broadcast("$routeUpdate", lastRoute);
                } else if (nextRoute || lastRoute) {
                    forceReload = false;
                    $route.current = nextRoute;
                    if (nextRoute) {
                        if (nextRoute.redirectTo) {
                            if (angular.isString(nextRoute.redirectTo)) {
                                $location.path(interpolate(nextRoute.redirectTo, nextRoute.params)).search(nextRoute.params).replace();
                            } else {
                                $location.url(nextRoute.redirectTo(nextRoute.pathParams, $location.path(), $location.search())).replace();
                            }
                        }
                    }
                    $q.when(nextRoute).then(function() {
                        if (nextRoute) {
                            var locals = angular.extend({}, nextRoute.resolve), template, templateUrl;
                            angular.forEach(locals, function(value, key) {
                                locals[key] = angular.isString(value) ? $injector.get(value) : $injector.invoke(value, null, null, key);
                            });
                            if (angular.isDefined(template = nextRoute.template)) {
                                if (angular.isFunction(template)) {
                                    template = template(nextRoute.params);
                                }
                            } else if (angular.isDefined(templateUrl = nextRoute.templateUrl)) {
                                if (angular.isFunction(templateUrl)) {
                                    templateUrl = templateUrl(nextRoute.params);
                                }
                                templateUrl = $sce.getTrustedResourceUrl(templateUrl);
                                if (angular.isDefined(templateUrl)) {
                                    nextRoute.loadedTemplateUrl = templateUrl;
                                    template = $templateRequest(templateUrl);
                                }
                            }
                            if (angular.isDefined(template)) {
                                locals["$template"] = template;
                            }
                            return $q.all(locals);
                        }
                    }).then(function(locals) {
                        if (nextRoute == $route.current) {
                            if (nextRoute) {
                                nextRoute.locals = locals;
                                angular.copy(nextRoute.params, $routeParams);
                            }
                            $rootScope.$broadcast("$routeChangeSuccess", nextRoute, lastRoute);
                        }
                    }, function(error) {
                        if (nextRoute == $route.current) {
                            $rootScope.$broadcast("$routeChangeError", nextRoute, lastRoute, error);
                        }
                    });
                }
            }
            function parseRoute() {
                var params, match;
                angular.forEach(routes, function(route, path) {
                    if (!match && (params = switchRouteMatcher($location.path(), route))) {
                        match = inherit(route, {
                            params: angular.extend({}, $location.search(), params),
                            pathParams: params
                        });
                        match.$$route = route;
                    }
                });
                return match || routes[null] && inherit(routes[null], {
                    params: {},
                    pathParams: {}
                });
            }
            function interpolate(string, params) {
                var result = [];
                angular.forEach((string || "").split(":"), function(segment, i) {
                    if (i === 0) {
                        result.push(segment);
                    } else {
                        var segmentMatch = segment.match(/(\w+)(.*)/);
                        var key = segmentMatch[1];
                        result.push(params[key]);
                        result.push(segmentMatch[2] || "");
                        delete params[key];
                    }
                });
                return result.join("");
            }
        } ];
    }
    ngRouteModule.provider("$routeParams", $RouteParamsProvider);
    function $RouteParamsProvider() {
        this.$get = function() {
            return {};
        };
    }
    ngRouteModule.directive("ngView", ngViewFactory);
    ngRouteModule.directive("ngView", ngViewFillContentFactory);
    ngViewFactory.$inject = [ "$route", "$anchorScroll", "$animate" ];
    function ngViewFactory($route, $anchorScroll, $animate) {
        return {
            restrict: "ECA",
            terminal: true,
            priority: 400,
            transclude: "element",
            link: function(scope, $element, attr, ctrl, $transclude) {
                var currentScope, currentElement, previousLeaveAnimation, autoScrollExp = attr.autoscroll, onloadExp = attr.onload || "";
                scope.$on("$routeChangeSuccess", update);
                update();
                function cleanupLastView() {
                    if (previousLeaveAnimation) {
                        $animate.cancel(previousLeaveAnimation);
                        previousLeaveAnimation = null;
                    }
                    if (currentScope) {
                        currentScope.$destroy();
                        currentScope = null;
                    }
                    if (currentElement) {
                        previousLeaveAnimation = $animate.leave(currentElement);
                        previousLeaveAnimation.then(function() {
                            previousLeaveAnimation = null;
                        });
                        currentElement = null;
                    }
                }
                function update() {
                    var locals = $route.current && $route.current.locals, template = locals && locals.$template;
                    if (angular.isDefined(template)) {
                        var newScope = scope.$new();
                        var current = $route.current;
                        var clone = $transclude(newScope, function(clone) {
                            $animate.enter(clone, null, currentElement || $element).then(function onNgViewEnter() {
                                if (angular.isDefined(autoScrollExp) && (!autoScrollExp || scope.$eval(autoScrollExp))) {
                                    $anchorScroll();
                                }
                            });
                            cleanupLastView();
                        });
                        currentElement = clone;
                        currentScope = current.scope = newScope;
                        currentScope.$emit("$viewContentLoaded");
                        currentScope.$eval(onloadExp);
                    } else {
                        cleanupLastView();
                    }
                }
            }
        };
    }
    ngViewFillContentFactory.$inject = [ "$compile", "$controller", "$route" ];
    function ngViewFillContentFactory($compile, $controller, $route) {
        return {
            restrict: "ECA",
            priority: -400,
            link: function(scope, $element) {
                var current = $route.current, locals = current.locals;
                $element.html(locals.$template);
                var link = $compile($element.contents());
                if (current.controller) {
                    locals.$scope = scope;
                    var controller = $controller(current.controller, locals);
                    if (current.controllerAs) {
                        scope[current.controllerAs] = controller;
                    }
                    $element.data("$ngControllerController", controller);
                    $element.children().data("$ngControllerController", controller);
                }
                link(scope);
            }
        };
    }
})(window, window.angular);