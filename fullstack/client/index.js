(() => {
  // output/Control.Monad.Trans.Class/index.js
  var lift = function(dict) {
    return dict.lift;
  };

  // output/Data.Show/foreign.js
  var showIntImpl = function(n) {
    return n.toString();
  };
  var showNumberImpl = function(n) {
    var str = n.toString();
    return isNaN(str + ".0") ? str : str + ".0";
  };
  var showStringImpl = function(s) {
    var l = s.length;
    return '"' + s.replace(
      /[\0-\x1F\x7F"\\]/g,
      // eslint-disable-line no-control-regex
      function(c, i2) {
        switch (c) {
          case '"':
          case "\\":
            return "\\" + c;
          case "\x07":
            return "\\a";
          case "\b":
            return "\\b";
          case "\f":
            return "\\f";
          case "\n":
            return "\\n";
          case "\r":
            return "\\r";
          case "	":
            return "\\t";
          case "\v":
            return "\\v";
        }
        var k = i2 + 1;
        var empty7 = k < l && s[k] >= "0" && s[k] <= "9" ? "\\&" : "";
        return "\\" + c.charCodeAt(0).toString(10) + empty7;
      }
    ) + '"';
  };

  // output/Type.Proxy/index.js
  var $$Proxy = /* @__PURE__ */ function() {
    function $$Proxy2() {
    }
    ;
    $$Proxy2.value = new $$Proxy2();
    return $$Proxy2;
  }();

  // output/Data.Symbol/index.js
  var reflectSymbol = function(dict) {
    return dict.reflectSymbol;
  };

  // output/Data.Void/index.js
  var absurd = function(a2) {
    var spin = function($copy_v) {
      var $tco_result;
      function $tco_loop(v) {
        $copy_v = v;
        return;
      }
      ;
      while (true) {
        $tco_result = $tco_loop($copy_v);
      }
      ;
      return $tco_result;
    };
    return spin(a2);
  };

  // output/Record.Unsafe/foreign.js
  var unsafeGet = function(label5) {
    return function(rec) {
      return rec[label5];
    };
  };
  var unsafeSet = function(label5) {
    return function(value19) {
      return function(rec) {
        var copy2 = {};
        for (var key7 in rec) {
          if ({}.hasOwnProperty.call(rec, key7)) {
            copy2[key7] = rec[key7];
          }
        }
        copy2[label5] = value19;
        return copy2;
      };
    };
  };

  // output/Data.Show/index.js
  var showString = {
    show: showStringImpl
  };
  var showRecordFields = function(dict) {
    return dict.showRecordFields;
  };
  var showRecord = function() {
    return function() {
      return function(dictShowRecordFields) {
        var showRecordFields1 = showRecordFields(dictShowRecordFields);
        return {
          show: function(record) {
            return "{" + (showRecordFields1($$Proxy.value)(record) + "}");
          }
        };
      };
    };
  };
  var showNumber = {
    show: showNumberImpl
  };
  var showInt = {
    show: showIntImpl
  };
  var show = function(dict) {
    return dict.show;
  };
  var showRecordFieldsCons = function(dictIsSymbol) {
    var reflectSymbol2 = reflectSymbol(dictIsSymbol);
    return function(dictShowRecordFields) {
      var showRecordFields1 = showRecordFields(dictShowRecordFields);
      return function(dictShow) {
        var show17 = show(dictShow);
        return {
          showRecordFields: function(v) {
            return function(record) {
              var tail3 = showRecordFields1($$Proxy.value)(record);
              var key7 = reflectSymbol2($$Proxy.value);
              var focus3 = unsafeGet(key7)(record);
              return " " + (key7 + (": " + (show17(focus3) + ("," + tail3))));
            };
          }
        };
      };
    };
  };
  var showRecordFieldsConsNil = function(dictIsSymbol) {
    var reflectSymbol2 = reflectSymbol(dictIsSymbol);
    return function(dictShow) {
      var show17 = show(dictShow);
      return {
        showRecordFields: function(v) {
          return function(record) {
            var key7 = reflectSymbol2($$Proxy.value);
            var focus3 = unsafeGet(key7)(record);
            return " " + (key7 + (": " + (show17(focus3) + " ")));
          };
        }
      };
    };
  };

  // output/Data.Generic.Rep/index.js
  var Inl = /* @__PURE__ */ function() {
    function Inl2(value0) {
      this.value0 = value0;
    }
    ;
    Inl2.create = function(value0) {
      return new Inl2(value0);
    };
    return Inl2;
  }();
  var Inr = /* @__PURE__ */ function() {
    function Inr2(value0) {
      this.value0 = value0;
    }
    ;
    Inr2.create = function(value0) {
      return new Inr2(value0);
    };
    return Inr2;
  }();
  var NoArguments = /* @__PURE__ */ function() {
    function NoArguments2() {
    }
    ;
    NoArguments2.value = new NoArguments2();
    return NoArguments2;
  }();
  var Constructor = function(x) {
    return x;
  };
  var Argument = function(x) {
    return x;
  };
  var to = function(dict) {
    return dict.to;
  };
  var from = function(dict) {
    return dict.from;
  };

  // output/Data.Show.Generic/foreign.js
  var intercalate = function(separator) {
    return function(xs) {
      return xs.join(separator);
    };
  };

  // output/Data.Semigroup/foreign.js
  var concatString = function(s1) {
    return function(s2) {
      return s1 + s2;
    };
  };
  var concatArray = function(xs) {
    return function(ys) {
      if (xs.length === 0)
        return ys;
      if (ys.length === 0)
        return xs;
      return xs.concat(ys);
    };
  };

  // output/Data.Unit/foreign.js
  var unit = void 0;

  // output/Data.Semigroup/index.js
  var semigroupString = {
    append: concatString
  };
  var semigroupArray = {
    append: concatArray
  };
  var append = function(dict) {
    return dict.append;
  };

  // output/Data.Show.Generic/index.js
  var append2 = /* @__PURE__ */ append(semigroupArray);
  var genericShowArgsNoArguments = {
    genericShowArgs: function(v) {
      return [];
    }
  };
  var genericShowArgs = function(dict) {
    return dict.genericShowArgs;
  };
  var genericShowConstructor = function(dictGenericShowArgs) {
    var genericShowArgs1 = genericShowArgs(dictGenericShowArgs);
    return function(dictIsSymbol) {
      var reflectSymbol2 = reflectSymbol(dictIsSymbol);
      return {
        "genericShow'": function(v) {
          var ctor = reflectSymbol2($$Proxy.value);
          var v1 = genericShowArgs1(v);
          if (v1.length === 0) {
            return ctor;
          }
          ;
          return "(" + (intercalate(" ")(append2([ctor])(v1)) + ")");
        }
      };
    };
  };
  var genericShow$prime = function(dict) {
    return dict["genericShow'"];
  };
  var genericShowSum = function(dictGenericShow) {
    var genericShow$prime1 = genericShow$prime(dictGenericShow);
    return function(dictGenericShow1) {
      var genericShow$prime2 = genericShow$prime(dictGenericShow1);
      return {
        "genericShow'": function(v) {
          if (v instanceof Inl) {
            return genericShow$prime1(v.value0);
          }
          ;
          if (v instanceof Inr) {
            return genericShow$prime2(v.value0);
          }
          ;
          throw new Error("Failed pattern match at Data.Show.Generic (line 26, column 1 - line 28, column 40): " + [v.constructor.name]);
        }
      };
    };
  };
  var genericShow = function(dictGeneric) {
    var from3 = from(dictGeneric);
    return function(dictGenericShow) {
      var genericShow$prime1 = genericShow$prime(dictGenericShow);
      return function(x) {
        return genericShow$prime1(from3(x));
      };
    };
  };

  // output/Control.Apply/foreign.js
  var arrayApply = function(fs) {
    return function(xs) {
      var l = fs.length;
      var k = xs.length;
      var result = new Array(l * k);
      var n = 0;
      for (var i2 = 0; i2 < l; i2++) {
        var f = fs[i2];
        for (var j = 0; j < k; j++) {
          result[n++] = f(xs[j]);
        }
      }
      return result;
    };
  };

  // output/Control.Semigroupoid/index.js
  var semigroupoidFn = {
    compose: function(f) {
      return function(g) {
        return function(x) {
          return f(g(x));
        };
      };
    }
  };
  var compose = function(dict) {
    return dict.compose;
  };

  // output/Control.Category/index.js
  var identity = function(dict) {
    return dict.identity;
  };
  var categoryFn = {
    identity: function(x) {
      return x;
    },
    Semigroupoid0: function() {
      return semigroupoidFn;
    }
  };

  // output/Data.Boolean/index.js
  var otherwise = true;

  // output/Data.Function/index.js
  var on = function(f) {
    return function(g) {
      return function(x) {
        return function(y) {
          return f(g(x))(g(y));
        };
      };
    };
  };
  var flip = function(f) {
    return function(b2) {
      return function(a2) {
        return f(a2)(b2);
      };
    };
  };
  var $$const = function(a2) {
    return function(v) {
      return a2;
    };
  };
  var applyFlipped = function(x) {
    return function(f) {
      return f(x);
    };
  };

  // output/Data.Functor/foreign.js
  var arrayMap = function(f) {
    return function(arr) {
      var l = arr.length;
      var result = new Array(l);
      for (var i2 = 0; i2 < l; i2++) {
        result[i2] = f(arr[i2]);
      }
      return result;
    };
  };

  // output/Data.Functor/index.js
  var map = function(dict) {
    return dict.map;
  };
  var mapFlipped = function(dictFunctor) {
    var map115 = map(dictFunctor);
    return function(fa) {
      return function(f) {
        return map115(f)(fa);
      };
    };
  };
  var $$void = function(dictFunctor) {
    return map(dictFunctor)($$const(unit));
  };
  var voidLeft = function(dictFunctor) {
    var map115 = map(dictFunctor);
    return function(f) {
      return function(x) {
        return map115($$const(x))(f);
      };
    };
  };
  var voidRight = function(dictFunctor) {
    var map115 = map(dictFunctor);
    return function(x) {
      return map115($$const(x));
    };
  };
  var functorFn = {
    map: /* @__PURE__ */ compose(semigroupoidFn)
  };
  var functorArray = {
    map: arrayMap
  };

  // output/Control.Apply/index.js
  var identity2 = /* @__PURE__ */ identity(categoryFn);
  var applyFn = {
    apply: function(f) {
      return function(g) {
        return function(x) {
          return f(x)(g(x));
        };
      };
    },
    Functor0: function() {
      return functorFn;
    }
  };
  var applyArray = {
    apply: arrayApply,
    Functor0: function() {
      return functorArray;
    }
  };
  var apply = function(dict) {
    return dict.apply;
  };
  var applyFirst = function(dictApply) {
    var apply12 = apply(dictApply);
    var map39 = map(dictApply.Functor0());
    return function(a2) {
      return function(b2) {
        return apply12(map39($$const)(a2))(b2);
      };
    };
  };
  var applySecond = function(dictApply) {
    var apply12 = apply(dictApply);
    var map39 = map(dictApply.Functor0());
    return function(a2) {
      return function(b2) {
        return apply12(map39($$const(identity2))(a2))(b2);
      };
    };
  };

  // output/Control.Applicative/index.js
  var pure = function(dict) {
    return dict.pure;
  };
  var unless = function(dictApplicative) {
    var pure18 = pure(dictApplicative);
    return function(v) {
      return function(v1) {
        if (!v) {
          return v1;
        }
        ;
        if (v) {
          return pure18(unit);
        }
        ;
        throw new Error("Failed pattern match at Control.Applicative (line 68, column 1 - line 68, column 65): " + [v.constructor.name, v1.constructor.name]);
      };
    };
  };
  var when = function(dictApplicative) {
    var pure18 = pure(dictApplicative);
    return function(v) {
      return function(v1) {
        if (v) {
          return v1;
        }
        ;
        if (!v) {
          return pure18(unit);
        }
        ;
        throw new Error("Failed pattern match at Control.Applicative (line 63, column 1 - line 63, column 63): " + [v.constructor.name, v1.constructor.name]);
      };
    };
  };
  var liftA1 = function(dictApplicative) {
    var apply6 = apply(dictApplicative.Apply0());
    var pure18 = pure(dictApplicative);
    return function(f) {
      return function(a2) {
        return apply6(pure18(f))(a2);
      };
    };
  };
  var applicativeArray = {
    pure: function(x) {
      return [x];
    },
    Apply0: function() {
      return applyArray;
    }
  };

  // output/Data.Eq/foreign.js
  var refEq = function(r1) {
    return function(r2) {
      return r1 === r2;
    };
  };
  var eqBooleanImpl = refEq;
  var eqIntImpl = refEq;
  var eqNumberImpl = refEq;
  var eqStringImpl = refEq;

  // output/Data.Eq/index.js
  var eqUnit = {
    eq: function(v) {
      return function(v1) {
        return true;
      };
    }
  };
  var eqString = {
    eq: eqStringImpl
  };
  var eqNumber = {
    eq: eqNumberImpl
  };
  var eqInt = {
    eq: eqIntImpl
  };
  var eqBoolean = {
    eq: eqBooleanImpl
  };
  var eq = function(dict) {
    return dict.eq;
  };
  var eq2 = /* @__PURE__ */ eq(eqBoolean);
  var notEq = function(dictEq) {
    var eq32 = eq(dictEq);
    return function(x) {
      return function(y) {
        return eq2(eq32(x)(y))(false);
      };
    };
  };

  // output/Data.Ordering/index.js
  var LT = /* @__PURE__ */ function() {
    function LT2() {
    }
    ;
    LT2.value = new LT2();
    return LT2;
  }();
  var GT = /* @__PURE__ */ function() {
    function GT2() {
    }
    ;
    GT2.value = new GT2();
    return GT2;
  }();
  var EQ = /* @__PURE__ */ function() {
    function EQ2() {
    }
    ;
    EQ2.value = new EQ2();
    return EQ2;
  }();

  // output/Data.Monoid/index.js
  var monoidString = {
    mempty: "",
    Semigroup0: function() {
      return semigroupString;
    }
  };
  var monoidArray = {
    mempty: [],
    Semigroup0: function() {
      return semigroupArray;
    }
  };
  var mempty = function(dict) {
    return dict.mempty;
  };

  // output/Data.Ord/foreign.js
  var unsafeCompareImpl = function(lt) {
    return function(eq5) {
      return function(gt) {
        return function(x) {
          return function(y) {
            return x < y ? lt : x === y ? eq5 : gt;
          };
        };
      };
    };
  };
  var ordIntImpl = unsafeCompareImpl;
  var ordNumberImpl = unsafeCompareImpl;
  var ordStringImpl = unsafeCompareImpl;

  // output/Data.Ord/index.js
  var ordUnit = {
    compare: function(v) {
      return function(v1) {
        return EQ.value;
      };
    },
    Eq0: function() {
      return eqUnit;
    }
  };
  var ordString = /* @__PURE__ */ function() {
    return {
      compare: ordStringImpl(LT.value)(EQ.value)(GT.value),
      Eq0: function() {
        return eqString;
      }
    };
  }();
  var ordNumber = /* @__PURE__ */ function() {
    return {
      compare: ordNumberImpl(LT.value)(EQ.value)(GT.value),
      Eq0: function() {
        return eqNumber;
      }
    };
  }();
  var ordInt = /* @__PURE__ */ function() {
    return {
      compare: ordIntImpl(LT.value)(EQ.value)(GT.value),
      Eq0: function() {
        return eqInt;
      }
    };
  }();
  var compare = function(dict) {
    return dict.compare;
  };
  var max = function(dictOrd) {
    var compare3 = compare(dictOrd);
    return function(x) {
      return function(y) {
        var v = compare3(x)(y);
        if (v instanceof LT) {
          return y;
        }
        ;
        if (v instanceof EQ) {
          return x;
        }
        ;
        if (v instanceof GT) {
          return x;
        }
        ;
        throw new Error("Failed pattern match at Data.Ord (line 181, column 3 - line 184, column 12): " + [v.constructor.name]);
      };
    };
  };
  var min = function(dictOrd) {
    var compare3 = compare(dictOrd);
    return function(x) {
      return function(y) {
        var v = compare3(x)(y);
        if (v instanceof LT) {
          return x;
        }
        ;
        if (v instanceof EQ) {
          return x;
        }
        ;
        if (v instanceof GT) {
          return y;
        }
        ;
        throw new Error("Failed pattern match at Data.Ord (line 172, column 3 - line 175, column 12): " + [v.constructor.name]);
      };
    };
  };
  var clamp = function(dictOrd) {
    var min1 = min(dictOrd);
    var max1 = max(dictOrd);
    return function(low2) {
      return function(hi) {
        return function(x) {
          return min1(hi)(max1(low2)(x));
        };
      };
    };
  };

  // output/Control.Alt/index.js
  var altArray = {
    alt: /* @__PURE__ */ append(semigroupArray),
    Functor0: function() {
      return functorArray;
    }
  };
  var alt = function(dict) {
    return dict.alt;
  };

  // output/Data.Bounded/foreign.js
  var topInt = 2147483647;
  var bottomInt = -2147483648;
  var topChar = String.fromCharCode(65535);
  var bottomChar = String.fromCharCode(0);
  var topNumber = Number.POSITIVE_INFINITY;
  var bottomNumber = Number.NEGATIVE_INFINITY;

  // output/Data.Bounded/index.js
  var top = function(dict) {
    return dict.top;
  };
  var boundedInt = {
    top: topInt,
    bottom: bottomInt,
    Ord0: function() {
      return ordInt;
    }
  };
  var bottom = function(dict) {
    return dict.bottom;
  };

  // output/Data.Maybe/index.js
  var identity3 = /* @__PURE__ */ identity(categoryFn);
  var Nothing = /* @__PURE__ */ function() {
    function Nothing2() {
    }
    ;
    Nothing2.value = new Nothing2();
    return Nothing2;
  }();
  var Just = /* @__PURE__ */ function() {
    function Just2(value0) {
      this.value0 = value0;
    }
    ;
    Just2.create = function(value0) {
      return new Just2(value0);
    };
    return Just2;
  }();
  var semigroupMaybe = function(dictSemigroup) {
    var append13 = append(dictSemigroup);
    return {
      append: function(v) {
        return function(v1) {
          if (v instanceof Nothing) {
            return v1;
          }
          ;
          if (v1 instanceof Nothing) {
            return v;
          }
          ;
          if (v instanceof Just && v1 instanceof Just) {
            return new Just(append13(v.value0)(v1.value0));
          }
          ;
          throw new Error("Failed pattern match at Data.Maybe (line 182, column 1 - line 185, column 43): " + [v.constructor.name, v1.constructor.name]);
        };
      }
    };
  };
  var maybe = function(v) {
    return function(v1) {
      return function(v2) {
        if (v2 instanceof Nothing) {
          return v;
        }
        ;
        if (v2 instanceof Just) {
          return v1(v2.value0);
        }
        ;
        throw new Error("Failed pattern match at Data.Maybe (line 237, column 1 - line 237, column 51): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
      };
    };
  };
  var isNothing = /* @__PURE__ */ maybe(true)(/* @__PURE__ */ $$const(false));
  var isJust = /* @__PURE__ */ maybe(false)(/* @__PURE__ */ $$const(true));
  var functorMaybe = {
    map: function(v) {
      return function(v1) {
        if (v1 instanceof Just) {
          return new Just(v(v1.value0));
        }
        ;
        return Nothing.value;
      };
    }
  };
  var map2 = /* @__PURE__ */ map(functorMaybe);
  var fromMaybe = function(a2) {
    return maybe(a2)(identity3);
  };
  var fromJust = function() {
    return function(v) {
      if (v instanceof Just) {
        return v.value0;
      }
      ;
      throw new Error("Failed pattern match at Data.Maybe (line 288, column 1 - line 288, column 46): " + [v.constructor.name]);
    };
  };
  var eqMaybe = function(dictEq) {
    var eq5 = eq(dictEq);
    return {
      eq: function(x) {
        return function(y) {
          if (x instanceof Nothing && y instanceof Nothing) {
            return true;
          }
          ;
          if (x instanceof Just && y instanceof Just) {
            return eq5(x.value0)(y.value0);
          }
          ;
          return false;
        };
      }
    };
  };
  var applyMaybe = {
    apply: function(v) {
      return function(v1) {
        if (v instanceof Just) {
          return map2(v.value0)(v1);
        }
        ;
        if (v instanceof Nothing) {
          return Nothing.value;
        }
        ;
        throw new Error("Failed pattern match at Data.Maybe (line 67, column 1 - line 69, column 30): " + [v.constructor.name, v1.constructor.name]);
      };
    },
    Functor0: function() {
      return functorMaybe;
    }
  };
  var bindMaybe = {
    bind: function(v) {
      return function(v1) {
        if (v instanceof Just) {
          return v1(v.value0);
        }
        ;
        if (v instanceof Nothing) {
          return Nothing.value;
        }
        ;
        throw new Error("Failed pattern match at Data.Maybe (line 125, column 1 - line 127, column 28): " + [v.constructor.name, v1.constructor.name]);
      };
    },
    Apply0: function() {
      return applyMaybe;
    }
  };
  var applicativeMaybe = /* @__PURE__ */ function() {
    return {
      pure: Just.create,
      Apply0: function() {
        return applyMaybe;
      }
    };
  }();

  // output/Data.Either/index.js
  var Left = /* @__PURE__ */ function() {
    function Left2(value0) {
      this.value0 = value0;
    }
    ;
    Left2.create = function(value0) {
      return new Left2(value0);
    };
    return Left2;
  }();
  var Right = /* @__PURE__ */ function() {
    function Right2(value0) {
      this.value0 = value0;
    }
    ;
    Right2.create = function(value0) {
      return new Right2(value0);
    };
    return Right2;
  }();
  var note = function(a2) {
    return maybe(new Left(a2))(Right.create);
  };
  var functorEither = {
    map: function(f) {
      return function(m) {
        if (m instanceof Left) {
          return new Left(m.value0);
        }
        ;
        if (m instanceof Right) {
          return new Right(f(m.value0));
        }
        ;
        throw new Error("Failed pattern match at Data.Either (line 0, column 0 - line 0, column 0): " + [m.constructor.name]);
      };
    }
  };
  var map3 = /* @__PURE__ */ map(functorEither);
  var either = function(v) {
    return function(v1) {
      return function(v2) {
        if (v2 instanceof Left) {
          return v(v2.value0);
        }
        ;
        if (v2 instanceof Right) {
          return v1(v2.value0);
        }
        ;
        throw new Error("Failed pattern match at Data.Either (line 208, column 1 - line 208, column 64): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
      };
    };
  };
  var applyEither = {
    apply: function(v) {
      return function(v1) {
        if (v instanceof Left) {
          return new Left(v.value0);
        }
        ;
        if (v instanceof Right) {
          return map3(v.value0)(v1);
        }
        ;
        throw new Error("Failed pattern match at Data.Either (line 70, column 1 - line 72, column 30): " + [v.constructor.name, v1.constructor.name]);
      };
    },
    Functor0: function() {
      return functorEither;
    }
  };
  var bindEither = {
    bind: /* @__PURE__ */ either(function(e) {
      return function(v) {
        return new Left(e);
      };
    })(function(a2) {
      return function(f) {
        return f(a2);
      };
    }),
    Apply0: function() {
      return applyEither;
    }
  };
  var applicativeEither = /* @__PURE__ */ function() {
    return {
      pure: Right.create,
      Apply0: function() {
        return applyEither;
      }
    };
  }();

  // output/Control.Bind/foreign.js
  var arrayBind = function(arr) {
    return function(f) {
      var result = [];
      for (var i2 = 0, l = arr.length; i2 < l; i2++) {
        Array.prototype.push.apply(result, f(arr[i2]));
      }
      return result;
    };
  };

  // output/Control.Bind/index.js
  var identity4 = /* @__PURE__ */ identity(categoryFn);
  var discard = function(dict) {
    return dict.discard;
  };
  var bindArray = {
    bind: arrayBind,
    Apply0: function() {
      return applyArray;
    }
  };
  var bind = function(dict) {
    return dict.bind;
  };
  var bindFlipped = function(dictBind) {
    return flip(bind(dictBind));
  };
  var composeKleisliFlipped = function(dictBind) {
    var bindFlipped12 = bindFlipped(dictBind);
    return function(f) {
      return function(g) {
        return function(a2) {
          return bindFlipped12(f)(g(a2));
        };
      };
    };
  };
  var composeKleisli = function(dictBind) {
    var bind18 = bind(dictBind);
    return function(f) {
      return function(g) {
        return function(a2) {
          return bind18(f(a2))(g);
        };
      };
    };
  };
  var discardUnit = {
    discard: function(dictBind) {
      return bind(dictBind);
    }
  };
  var join = function(dictBind) {
    var bind18 = bind(dictBind);
    return function(m) {
      return bind18(m)(identity4);
    };
  };

  // output/Data.Foldable/foreign.js
  var foldrArray = function(f) {
    return function(init4) {
      return function(xs) {
        var acc = init4;
        var len = xs.length;
        for (var i2 = len - 1; i2 >= 0; i2--) {
          acc = f(xs[i2])(acc);
        }
        return acc;
      };
    };
  };
  var foldlArray = function(f) {
    return function(init4) {
      return function(xs) {
        var acc = init4;
        var len = xs.length;
        for (var i2 = 0; i2 < len; i2++) {
          acc = f(acc)(xs[i2]);
        }
        return acc;
      };
    };
  };

  // output/Control.Plus/index.js
  var plusArray = {
    empty: [],
    Alt0: function() {
      return altArray;
    }
  };
  var empty = function(dict) {
    return dict.empty;
  };

  // output/Data.HeytingAlgebra/foreign.js
  var boolConj = function(b1) {
    return function(b2) {
      return b1 && b2;
    };
  };
  var boolDisj = function(b1) {
    return function(b2) {
      return b1 || b2;
    };
  };
  var boolNot = function(b2) {
    return !b2;
  };

  // output/Data.HeytingAlgebra/index.js
  var tt = function(dict) {
    return dict.tt;
  };
  var not = function(dict) {
    return dict.not;
  };
  var implies = function(dict) {
    return dict.implies;
  };
  var ff = function(dict) {
    return dict.ff;
  };
  var disj = function(dict) {
    return dict.disj;
  };
  var heytingAlgebraBoolean = {
    ff: false,
    tt: true,
    implies: function(a2) {
      return function(b2) {
        return disj(heytingAlgebraBoolean)(not(heytingAlgebraBoolean)(a2))(b2);
      };
    },
    conj: boolConj,
    disj: boolDisj,
    not: boolNot
  };
  var conj = function(dict) {
    return dict.conj;
  };
  var heytingAlgebraFunction = function(dictHeytingAlgebra) {
    var ff1 = ff(dictHeytingAlgebra);
    var tt1 = tt(dictHeytingAlgebra);
    var implies1 = implies(dictHeytingAlgebra);
    var conj1 = conj(dictHeytingAlgebra);
    var disj1 = disj(dictHeytingAlgebra);
    var not1 = not(dictHeytingAlgebra);
    return {
      ff: function(v) {
        return ff1;
      },
      tt: function(v) {
        return tt1;
      },
      implies: function(f) {
        return function(g) {
          return function(a2) {
            return implies1(f(a2))(g(a2));
          };
        };
      },
      conj: function(f) {
        return function(g) {
          return function(a2) {
            return conj1(f(a2))(g(a2));
          };
        };
      },
      disj: function(f) {
        return function(g) {
          return function(a2) {
            return disj1(f(a2))(g(a2));
          };
        };
      },
      not: function(f) {
        return function(a2) {
          return not1(f(a2));
        };
      }
    };
  };

  // output/Data.Tuple/index.js
  var Tuple = /* @__PURE__ */ function() {
    function Tuple2(value0, value19) {
      this.value0 = value0;
      this.value1 = value19;
    }
    ;
    Tuple2.create = function(value0) {
      return function(value19) {
        return new Tuple2(value0, value19);
      };
    };
    return Tuple2;
  }();
  var uncurry = function(f) {
    return function(v) {
      return f(v.value0)(v.value1);
    };
  };
  var snd = function(v) {
    return v.value1;
  };
  var functorTuple = {
    map: function(f) {
      return function(m) {
        return new Tuple(m.value0, f(m.value1));
      };
    }
  };
  var fst = function(v) {
    return v.value0;
  };
  var eqTuple = function(dictEq) {
    var eq5 = eq(dictEq);
    return function(dictEq1) {
      var eq12 = eq(dictEq1);
      return {
        eq: function(x) {
          return function(y) {
            return eq5(x.value0)(y.value0) && eq12(x.value1)(y.value1);
          };
        }
      };
    };
  };
  var ordTuple = function(dictOrd) {
    var compare2 = compare(dictOrd);
    var eqTuple1 = eqTuple(dictOrd.Eq0());
    return function(dictOrd1) {
      var compare12 = compare(dictOrd1);
      var eqTuple2 = eqTuple1(dictOrd1.Eq0());
      return {
        compare: function(x) {
          return function(y) {
            var v = compare2(x.value0)(y.value0);
            if (v instanceof LT) {
              return LT.value;
            }
            ;
            if (v instanceof GT) {
              return GT.value;
            }
            ;
            return compare12(x.value1)(y.value1);
          };
        },
        Eq0: function() {
          return eqTuple2;
        }
      };
    };
  };

  // output/Data.Bifunctor/index.js
  var identity5 = /* @__PURE__ */ identity(categoryFn);
  var bimap = function(dict) {
    return dict.bimap;
  };
  var lmap = function(dictBifunctor) {
    var bimap1 = bimap(dictBifunctor);
    return function(f) {
      return bimap1(f)(identity5);
    };
  };
  var bifunctorTuple = {
    bimap: function(f) {
      return function(g) {
        return function(v) {
          return new Tuple(f(v.value0), g(v.value1));
        };
      };
    }
  };
  var bifunctorEither = {
    bimap: function(v) {
      return function(v1) {
        return function(v2) {
          if (v2 instanceof Left) {
            return new Left(v(v2.value0));
          }
          ;
          if (v2 instanceof Right) {
            return new Right(v1(v2.value0));
          }
          ;
          throw new Error("Failed pattern match at Data.Bifunctor (line 32, column 1 - line 34, column 36): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
        };
      };
    }
  };

  // output/Data.Maybe.First/index.js
  var semigroupFirst = {
    append: function(v) {
      return function(v1) {
        if (v instanceof Just) {
          return v;
        }
        ;
        return v1;
      };
    }
  };
  var monoidFirst = /* @__PURE__ */ function() {
    return {
      mempty: Nothing.value,
      Semigroup0: function() {
        return semigroupFirst;
      }
    };
  }();

  // output/Data.Monoid.Disj/index.js
  var Disj = function(x) {
    return x;
  };
  var semigroupDisj = function(dictHeytingAlgebra) {
    var disj2 = disj(dictHeytingAlgebra);
    return {
      append: function(v) {
        return function(v1) {
          return disj2(v)(v1);
        };
      }
    };
  };
  var monoidDisj = function(dictHeytingAlgebra) {
    var semigroupDisj1 = semigroupDisj(dictHeytingAlgebra);
    return {
      mempty: ff(dictHeytingAlgebra),
      Semigroup0: function() {
        return semigroupDisj1;
      }
    };
  };

  // output/Unsafe.Coerce/foreign.js
  var unsafeCoerce2 = function(x) {
    return x;
  };

  // output/Safe.Coerce/index.js
  var coerce = function() {
    return unsafeCoerce2;
  };

  // output/Data.Newtype/index.js
  var coerce2 = /* @__PURE__ */ coerce();
  var unwrap = function() {
    return coerce2;
  };
  var over = function() {
    return function() {
      return function(v) {
        return coerce2;
      };
    };
  };
  var alaF = function() {
    return function() {
      return function() {
        return function() {
          return function(v) {
            return coerce2;
          };
        };
      };
    };
  };

  // output/Data.Foldable/index.js
  var unwrap2 = /* @__PURE__ */ unwrap();
  var alaF2 = /* @__PURE__ */ alaF()()()();
  var foldr = function(dict) {
    return dict.foldr;
  };
  var traverse_ = function(dictApplicative) {
    var applySecond2 = applySecond(dictApplicative.Apply0());
    var pure18 = pure(dictApplicative);
    return function(dictFoldable) {
      var foldr22 = foldr(dictFoldable);
      return function(f) {
        return foldr22(function($454) {
          return applySecond2(f($454));
        })(pure18(unit));
      };
    };
  };
  var for_ = function(dictApplicative) {
    var traverse_14 = traverse_(dictApplicative);
    return function(dictFoldable) {
      return flip(traverse_14(dictFoldable));
    };
  };
  var foldl = function(dict) {
    return dict.foldl;
  };
  var indexl = function(dictFoldable) {
    var foldl22 = foldl(dictFoldable);
    return function(idx) {
      var go2 = function(cursor2) {
        return function(a2) {
          if (cursor2.elem instanceof Just) {
            return cursor2;
          }
          ;
          var $296 = cursor2.pos === idx;
          if ($296) {
            return {
              elem: new Just(a2),
              pos: cursor2.pos
            };
          }
          ;
          return {
            pos: cursor2.pos + 1 | 0,
            elem: cursor2.elem
          };
        };
      };
      var $455 = foldl22(go2)({
        elem: Nothing.value,
        pos: 0
      });
      return function($456) {
        return function(v) {
          return v.elem;
        }($455($456));
      };
    };
  };
  var intercalate2 = function(dictFoldable) {
    var foldl22 = foldl(dictFoldable);
    return function(dictMonoid) {
      var append13 = append(dictMonoid.Semigroup0());
      var mempty3 = mempty(dictMonoid);
      return function(sep) {
        return function(xs) {
          var go2 = function(v) {
            return function(v1) {
              if (v.init) {
                return {
                  init: false,
                  acc: v1
                };
              }
              ;
              return {
                init: false,
                acc: append13(v.acc)(append13(sep)(v1))
              };
            };
          };
          return foldl22(go2)({
            init: true,
            acc: mempty3
          })(xs).acc;
        };
      };
    };
  };
  var foldableMaybe = {
    foldr: function(v) {
      return function(v1) {
        return function(v2) {
          if (v2 instanceof Nothing) {
            return v1;
          }
          ;
          if (v2 instanceof Just) {
            return v(v2.value0)(v1);
          }
          ;
          throw new Error("Failed pattern match at Data.Foldable (line 138, column 1 - line 144, column 27): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
        };
      };
    },
    foldl: function(v) {
      return function(v1) {
        return function(v2) {
          if (v2 instanceof Nothing) {
            return v1;
          }
          ;
          if (v2 instanceof Just) {
            return v(v1)(v2.value0);
          }
          ;
          throw new Error("Failed pattern match at Data.Foldable (line 138, column 1 - line 144, column 27): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
        };
      };
    },
    foldMap: function(dictMonoid) {
      var mempty3 = mempty(dictMonoid);
      return function(v) {
        return function(v1) {
          if (v1 instanceof Nothing) {
            return mempty3;
          }
          ;
          if (v1 instanceof Just) {
            return v(v1.value0);
          }
          ;
          throw new Error("Failed pattern match at Data.Foldable (line 138, column 1 - line 144, column 27): " + [v.constructor.name, v1.constructor.name]);
        };
      };
    }
  };
  var foldableEither = {
    foldr: function(v) {
      return function(v1) {
        return function(v2) {
          if (v2 instanceof Left) {
            return v1;
          }
          ;
          if (v2 instanceof Right) {
            return v(v2.value0)(v1);
          }
          ;
          throw new Error("Failed pattern match at Data.Foldable (line 181, column 1 - line 187, column 28): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
        };
      };
    },
    foldl: function(v) {
      return function(v1) {
        return function(v2) {
          if (v2 instanceof Left) {
            return v1;
          }
          ;
          if (v2 instanceof Right) {
            return v(v1)(v2.value0);
          }
          ;
          throw new Error("Failed pattern match at Data.Foldable (line 181, column 1 - line 187, column 28): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
        };
      };
    },
    foldMap: function(dictMonoid) {
      var mempty3 = mempty(dictMonoid);
      return function(v) {
        return function(v1) {
          if (v1 instanceof Left) {
            return mempty3;
          }
          ;
          if (v1 instanceof Right) {
            return v(v1.value0);
          }
          ;
          throw new Error("Failed pattern match at Data.Foldable (line 181, column 1 - line 187, column 28): " + [v.constructor.name, v1.constructor.name]);
        };
      };
    }
  };
  var foldMapDefaultR = function(dictFoldable) {
    var foldr22 = foldr(dictFoldable);
    return function(dictMonoid) {
      var append13 = append(dictMonoid.Semigroup0());
      var mempty3 = mempty(dictMonoid);
      return function(f) {
        return foldr22(function(x) {
          return function(acc) {
            return append13(f(x))(acc);
          };
        })(mempty3);
      };
    };
  };
  var foldableArray = {
    foldr: foldrArray,
    foldl: foldlArray,
    foldMap: function(dictMonoid) {
      return foldMapDefaultR(foldableArray)(dictMonoid);
    }
  };
  var foldMap = function(dict) {
    return dict.foldMap;
  };
  var lookup = function(dictFoldable) {
    var foldMap22 = foldMap(dictFoldable)(monoidFirst);
    return function(dictEq) {
      var eq22 = eq(dictEq);
      return function(a2) {
        var $460 = foldMap22(function(v) {
          var $444 = eq22(a2)(v.value0);
          if ($444) {
            return new Just(v.value1);
          }
          ;
          return Nothing.value;
        });
        return function($461) {
          return unwrap2($460($461));
        };
      };
    };
  };
  var any = function(dictFoldable) {
    var foldMap22 = foldMap(dictFoldable);
    return function(dictHeytingAlgebra) {
      return alaF2(Disj)(foldMap22(monoidDisj(dictHeytingAlgebra)));
    };
  };

  // output/Control.Monad/index.js
  var unlessM = function(dictMonad) {
    var bind18 = bind(dictMonad.Bind1());
    var unless2 = unless(dictMonad.Applicative0());
    return function(mb) {
      return function(m) {
        return bind18(mb)(function(b2) {
          return unless2(b2)(m);
        });
      };
    };
  };
  var ap = function(dictMonad) {
    var bind18 = bind(dictMonad.Bind1());
    var pure18 = pure(dictMonad.Applicative0());
    return function(f) {
      return function(a2) {
        return bind18(f)(function(f$prime) {
          return bind18(a2)(function(a$prime) {
            return pure18(f$prime(a$prime));
          });
        });
      };
    };
  };

  // output/Data.Identity/index.js
  var Identity = function(x) {
    return x;
  };
  var functorIdentity = {
    map: function(f) {
      return function(m) {
        return f(m);
      };
    }
  };
  var applyIdentity = {
    apply: function(v) {
      return function(v1) {
        return v(v1);
      };
    },
    Functor0: function() {
      return functorIdentity;
    }
  };
  var bindIdentity = {
    bind: function(v) {
      return function(f) {
        return f(v);
      };
    },
    Apply0: function() {
      return applyIdentity;
    }
  };
  var applicativeIdentity = {
    pure: Identity,
    Apply0: function() {
      return applyIdentity;
    }
  };
  var monadIdentity = {
    Applicative0: function() {
      return applicativeIdentity;
    },
    Bind1: function() {
      return bindIdentity;
    }
  };

  // output/Effect/foreign.js
  var pureE = function(a2) {
    return function() {
      return a2;
    };
  };
  var bindE = function(a2) {
    return function(f) {
      return function() {
        return f(a2())();
      };
    };
  };

  // output/Effect/index.js
  var $runtime_lazy = function(name16, moduleName, init4) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name16 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init4();
      state3 = 2;
      return val;
    };
  };
  var monadEffect = {
    Applicative0: function() {
      return applicativeEffect;
    },
    Bind1: function() {
      return bindEffect;
    }
  };
  var bindEffect = {
    bind: bindE,
    Apply0: function() {
      return $lazy_applyEffect(0);
    }
  };
  var applicativeEffect = {
    pure: pureE,
    Apply0: function() {
      return $lazy_applyEffect(0);
    }
  };
  var $lazy_functorEffect = /* @__PURE__ */ $runtime_lazy("functorEffect", "Effect", function() {
    return {
      map: liftA1(applicativeEffect)
    };
  });
  var $lazy_applyEffect = /* @__PURE__ */ $runtime_lazy("applyEffect", "Effect", function() {
    return {
      apply: ap(monadEffect),
      Functor0: function() {
        return $lazy_functorEffect(0);
      }
    };
  });
  var functorEffect = /* @__PURE__ */ $lazy_functorEffect(20);
  var applyEffect = /* @__PURE__ */ $lazy_applyEffect(23);

  // output/Effect.Ref/foreign.js
  var _new = function(val) {
    return function() {
      return { value: val };
    };
  };
  var read = function(ref2) {
    return function() {
      return ref2.value;
    };
  };
  var modifyImpl = function(f) {
    return function(ref2) {
      return function() {
        var t = f(ref2.value);
        ref2.value = t.state;
        return t.value;
      };
    };
  };
  var write = function(val) {
    return function(ref2) {
      return function() {
        ref2.value = val;
      };
    };
  };

  // output/Effect.Ref/index.js
  var $$void2 = /* @__PURE__ */ $$void(functorEffect);
  var $$new = _new;
  var modify$prime = modifyImpl;
  var modify = function(f) {
    return modify$prime(function(s) {
      var s$prime = f(s);
      return {
        state: s$prime,
        value: s$prime
      };
    });
  };
  var modify_ = function(f) {
    return function(s) {
      return $$void2(modify(f)(s));
    };
  };

  // output/Control.Monad.Rec.Class/index.js
  var bindFlipped2 = /* @__PURE__ */ bindFlipped(bindEffect);
  var map4 = /* @__PURE__ */ map(functorEffect);
  var Loop = /* @__PURE__ */ function() {
    function Loop2(value0) {
      this.value0 = value0;
    }
    ;
    Loop2.create = function(value0) {
      return new Loop2(value0);
    };
    return Loop2;
  }();
  var Done = /* @__PURE__ */ function() {
    function Done2(value0) {
      this.value0 = value0;
    }
    ;
    Done2.create = function(value0) {
      return new Done2(value0);
    };
    return Done2;
  }();
  var tailRecM = function(dict) {
    return dict.tailRecM;
  };
  var monadRecEffect = {
    tailRecM: function(f) {
      return function(a2) {
        var fromDone = function(v) {
          if (v instanceof Done) {
            return v.value0;
          }
          ;
          throw new Error("Failed pattern match at Control.Monad.Rec.Class (line 137, column 30 - line 137, column 44): " + [v.constructor.name]);
        };
        return function __do3() {
          var r = bindFlipped2($$new)(f(a2))();
          (function() {
            while (!function __do4() {
              var v = read(r)();
              if (v instanceof Loop) {
                var e = f(v.value0)();
                write(e)(r)();
                return false;
              }
              ;
              if (v instanceof Done) {
                return true;
              }
              ;
              throw new Error("Failed pattern match at Control.Monad.Rec.Class (line 128, column 22 - line 133, column 28): " + [v.constructor.name]);
            }()) {
            }
            ;
            return {};
          })();
          return map4(fromDone)(read(r))();
        };
      };
    },
    Monad0: function() {
      return monadEffect;
    }
  };

  // output/Data.Traversable/foreign.js
  var traverseArrayImpl = function() {
    function array1(a2) {
      return [a2];
    }
    function array2(a2) {
      return function(b2) {
        return [a2, b2];
      };
    }
    function array3(a2) {
      return function(b2) {
        return function(c) {
          return [a2, b2, c];
        };
      };
    }
    function concat2(xs) {
      return function(ys) {
        return xs.concat(ys);
      };
    }
    return function(apply6) {
      return function(map39) {
        return function(pure18) {
          return function(f) {
            return function(array) {
              function go2(bot, top4) {
                switch (top4 - bot) {
                  case 0:
                    return pure18([]);
                  case 1:
                    return map39(array1)(f(array[bot]));
                  case 2:
                    return apply6(map39(array2)(f(array[bot])))(f(array[bot + 1]));
                  case 3:
                    return apply6(apply6(map39(array3)(f(array[bot])))(f(array[bot + 1])))(f(array[bot + 2]));
                  default:
                    var pivot = bot + Math.floor((top4 - bot) / 4) * 2;
                    return apply6(map39(concat2)(go2(bot, pivot)))(go2(pivot, top4));
                }
              }
              return go2(0, array.length);
            };
          };
        };
      };
    };
  }();

  // output/Data.Traversable/index.js
  var identity6 = /* @__PURE__ */ identity(categoryFn);
  var traverse = function(dict) {
    return dict.traverse;
  };
  var sequenceDefault = function(dictTraversable) {
    var traverse22 = traverse(dictTraversable);
    return function(dictApplicative) {
      return traverse22(dictApplicative)(identity6);
    };
  };
  var traversableArray = {
    traverse: function(dictApplicative) {
      var Apply0 = dictApplicative.Apply0();
      return traverseArrayImpl(apply(Apply0))(map(Apply0.Functor0()))(pure(dictApplicative));
    },
    sequence: function(dictApplicative) {
      return sequenceDefault(traversableArray)(dictApplicative);
    },
    Functor0: function() {
      return functorArray;
    },
    Foldable1: function() {
      return foldableArray;
    }
  };

  // output/Data.NonEmpty/index.js
  var NonEmpty = /* @__PURE__ */ function() {
    function NonEmpty2(value0, value19) {
      this.value0 = value0;
      this.value1 = value19;
    }
    ;
    NonEmpty2.create = function(value0) {
      return function(value19) {
        return new NonEmpty2(value0, value19);
      };
    };
    return NonEmpty2;
  }();
  var singleton2 = function(dictPlus) {
    var empty7 = empty(dictPlus);
    return function(a2) {
      return new NonEmpty(a2, empty7);
    };
  };
  var oneOf2 = function(dictAlternative) {
    var alt8 = alt(dictAlternative.Plus1().Alt0());
    var pure18 = pure(dictAlternative.Applicative0());
    return function(v) {
      return alt8(pure18(v.value0))(v.value1);
    };
  };
  var functorNonEmpty = function(dictFunctor) {
    var map211 = map(dictFunctor);
    return {
      map: function(f) {
        return function(m) {
          return new NonEmpty(f(m.value0), map211(f)(m.value1));
        };
      }
    };
  };

  // output/Data.List.Types/index.js
  var Nil = /* @__PURE__ */ function() {
    function Nil3() {
    }
    ;
    Nil3.value = new Nil3();
    return Nil3;
  }();
  var Cons = /* @__PURE__ */ function() {
    function Cons3(value0, value19) {
      this.value0 = value0;
      this.value1 = value19;
    }
    ;
    Cons3.create = function(value0) {
      return function(value19) {
        return new Cons3(value0, value19);
      };
    };
    return Cons3;
  }();
  var NonEmptyList = function(x) {
    return x;
  };
  var toList = function(v) {
    return new Cons(v.value0, v.value1);
  };
  var listMap = function(f) {
    var chunkedRevMap = function($copy_v) {
      return function($copy_v1) {
        var $tco_var_v = $copy_v;
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(v, v1) {
          if (v1 instanceof Cons && (v1.value1 instanceof Cons && v1.value1.value1 instanceof Cons)) {
            $tco_var_v = new Cons(v1, v);
            $copy_v1 = v1.value1.value1.value1;
            return;
          }
          ;
          var unrolledMap = function(v2) {
            if (v2 instanceof Cons && (v2.value1 instanceof Cons && v2.value1.value1 instanceof Nil)) {
              return new Cons(f(v2.value0), new Cons(f(v2.value1.value0), Nil.value));
            }
            ;
            if (v2 instanceof Cons && v2.value1 instanceof Nil) {
              return new Cons(f(v2.value0), Nil.value);
            }
            ;
            return Nil.value;
          };
          var reverseUnrolledMap = function($copy_v2) {
            return function($copy_v3) {
              var $tco_var_v2 = $copy_v2;
              var $tco_done1 = false;
              var $tco_result2;
              function $tco_loop2(v2, v3) {
                if (v2 instanceof Cons && (v2.value0 instanceof Cons && (v2.value0.value1 instanceof Cons && v2.value0.value1.value1 instanceof Cons))) {
                  $tco_var_v2 = v2.value1;
                  $copy_v3 = new Cons(f(v2.value0.value0), new Cons(f(v2.value0.value1.value0), new Cons(f(v2.value0.value1.value1.value0), v3)));
                  return;
                }
                ;
                $tco_done1 = true;
                return v3;
              }
              ;
              while (!$tco_done1) {
                $tco_result2 = $tco_loop2($tco_var_v2, $copy_v3);
              }
              ;
              return $tco_result2;
            };
          };
          $tco_done = true;
          return reverseUnrolledMap(v)(unrolledMap(v1));
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($tco_var_v, $copy_v1);
        }
        ;
        return $tco_result;
      };
    };
    return chunkedRevMap(Nil.value);
  };
  var functorList = {
    map: listMap
  };
  var foldableList = {
    foldr: function(f) {
      return function(b2) {
        var rev3 = function() {
          var go2 = function($copy_v) {
            return function($copy_v1) {
              var $tco_var_v = $copy_v;
              var $tco_done = false;
              var $tco_result;
              function $tco_loop(v, v1) {
                if (v1 instanceof Nil) {
                  $tco_done = true;
                  return v;
                }
                ;
                if (v1 instanceof Cons) {
                  $tco_var_v = new Cons(v1.value0, v);
                  $copy_v1 = v1.value1;
                  return;
                }
                ;
                throw new Error("Failed pattern match at Data.List.Types (line 107, column 7 - line 107, column 23): " + [v.constructor.name, v1.constructor.name]);
              }
              ;
              while (!$tco_done) {
                $tco_result = $tco_loop($tco_var_v, $copy_v1);
              }
              ;
              return $tco_result;
            };
          };
          return go2(Nil.value);
        }();
        var $284 = foldl(foldableList)(flip(f))(b2);
        return function($285) {
          return $284(rev3($285));
        };
      };
    },
    foldl: function(f) {
      var go2 = function($copy_b) {
        return function($copy_v) {
          var $tco_var_b = $copy_b;
          var $tco_done1 = false;
          var $tco_result;
          function $tco_loop(b2, v) {
            if (v instanceof Nil) {
              $tco_done1 = true;
              return b2;
            }
            ;
            if (v instanceof Cons) {
              $tco_var_b = f(b2)(v.value0);
              $copy_v = v.value1;
              return;
            }
            ;
            throw new Error("Failed pattern match at Data.List.Types (line 111, column 12 - line 113, column 30): " + [v.constructor.name]);
          }
          ;
          while (!$tco_done1) {
            $tco_result = $tco_loop($tco_var_b, $copy_v);
          }
          ;
          return $tco_result;
        };
      };
      return go2;
    },
    foldMap: function(dictMonoid) {
      var append24 = append(dictMonoid.Semigroup0());
      var mempty3 = mempty(dictMonoid);
      return function(f) {
        return foldl(foldableList)(function(acc) {
          var $286 = append24(acc);
          return function($287) {
            return $286(f($287));
          };
        })(mempty3);
      };
    }
  };
  var foldr2 = /* @__PURE__ */ foldr(foldableList);
  var semigroupList = {
    append: function(xs) {
      return function(ys) {
        return foldr2(Cons.create)(ys)(xs);
      };
    }
  };
  var append1 = /* @__PURE__ */ append(semigroupList);
  var semigroupNonEmptyList = {
    append: function(v) {
      return function(as$prime) {
        return new NonEmpty(v.value0, append1(v.value1)(toList(as$prime)));
      };
    }
  };
  var altList = {
    alt: append1,
    Functor0: function() {
      return functorList;
    }
  };
  var plusList = /* @__PURE__ */ function() {
    return {
      empty: Nil.value,
      Alt0: function() {
        return altList;
      }
    };
  }();

  // output/Data.List/index.js
  var reverse = /* @__PURE__ */ function() {
    var go2 = function($copy_v) {
      return function($copy_v1) {
        var $tco_var_v = $copy_v;
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(v, v1) {
          if (v1 instanceof Nil) {
            $tco_done = true;
            return v;
          }
          ;
          if (v1 instanceof Cons) {
            $tco_var_v = new Cons(v1.value0, v);
            $copy_v1 = v1.value1;
            return;
          }
          ;
          throw new Error("Failed pattern match at Data.List (line 368, column 3 - line 368, column 19): " + [v.constructor.name, v1.constructor.name]);
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($tco_var_v, $copy_v1);
        }
        ;
        return $tco_result;
      };
    };
    return go2(Nil.value);
  }();
  var $$null = function(v) {
    if (v instanceof Nil) {
      return true;
    }
    ;
    return false;
  };

  // output/Partial.Unsafe/foreign.js
  var _unsafePartial = function(f) {
    return f();
  };

  // output/Partial/foreign.js
  var _crashWith = function(msg) {
    throw new Error(msg);
  };

  // output/Partial/index.js
  var crashWith = function() {
    return _crashWith;
  };

  // output/Partial.Unsafe/index.js
  var crashWith2 = /* @__PURE__ */ crashWith();
  var unsafePartial = _unsafePartial;
  var unsafeCrashWith = function(msg) {
    return unsafePartial(function() {
      return crashWith2(msg);
    });
  };

  // output/Data.List.NonEmpty/index.js
  var singleton3 = /* @__PURE__ */ function() {
    var $200 = singleton2(plusList);
    return function($201) {
      return NonEmptyList($200($201));
    };
  }();
  var head = function(v) {
    return v.value0;
  };
  var cons = function(y) {
    return function(v) {
      return new NonEmpty(y, new Cons(v.value0, v.value1));
    };
  };

  // output/Control.Applicative.Free/index.js
  var identity7 = /* @__PURE__ */ identity(categoryFn);
  var Pure = /* @__PURE__ */ function() {
    function Pure2(value0) {
      this.value0 = value0;
    }
    ;
    Pure2.create = function(value0) {
      return new Pure2(value0);
    };
    return Pure2;
  }();
  var Lift = /* @__PURE__ */ function() {
    function Lift3(value0) {
      this.value0 = value0;
    }
    ;
    Lift3.create = function(value0) {
      return new Lift3(value0);
    };
    return Lift3;
  }();
  var Ap = /* @__PURE__ */ function() {
    function Ap2(value0, value19) {
      this.value0 = value0;
      this.value1 = value19;
    }
    ;
    Ap2.create = function(value0) {
      return function(value19) {
        return new Ap2(value0, value19);
      };
    };
    return Ap2;
  }();
  var mkAp = function(fba) {
    return function(fb) {
      return new Ap(fba, fb);
    };
  };
  var liftFreeAp = /* @__PURE__ */ function() {
    return Lift.create;
  }();
  var goLeft = function(dictApplicative) {
    var pure18 = pure(dictApplicative);
    return function(fStack) {
      return function(valStack) {
        return function(nat) {
          return function(func) {
            return function(count) {
              if (func instanceof Pure) {
                return new Tuple(new Cons({
                  func: pure18(func.value0),
                  count
                }, fStack), valStack);
              }
              ;
              if (func instanceof Lift) {
                return new Tuple(new Cons({
                  func: nat(func.value0),
                  count
                }, fStack), valStack);
              }
              ;
              if (func instanceof Ap) {
                return goLeft(dictApplicative)(fStack)(cons(func.value1)(valStack))(nat)(func.value0)(count + 1 | 0);
              }
              ;
              throw new Error("Failed pattern match at Control.Applicative.Free (line 102, column 41 - line 105, column 81): " + [func.constructor.name]);
            };
          };
        };
      };
    };
  };
  var goApply = function(dictApplicative) {
    var apply6 = apply(dictApplicative.Apply0());
    return function(fStack) {
      return function(vals) {
        return function(gVal) {
          if (fStack instanceof Nil) {
            return new Left(gVal);
          }
          ;
          if (fStack instanceof Cons) {
            var gRes = apply6(fStack.value0.func)(gVal);
            var $31 = fStack.value0.count === 1;
            if ($31) {
              if (fStack.value1 instanceof Nil) {
                return new Left(gRes);
              }
              ;
              return goApply(dictApplicative)(fStack.value1)(vals)(gRes);
            }
            ;
            if (vals instanceof Nil) {
              return new Left(gRes);
            }
            ;
            if (vals instanceof Cons) {
              return new Right(new Tuple(new Cons({
                func: gRes,
                count: fStack.value0.count - 1 | 0
              }, fStack.value1), new NonEmpty(vals.value0, vals.value1)));
            }
            ;
            throw new Error("Failed pattern match at Control.Applicative.Free (line 83, column 11 - line 88, column 50): " + [vals.constructor.name]);
          }
          ;
          throw new Error("Failed pattern match at Control.Applicative.Free (line 72, column 3 - line 88, column 50): " + [fStack.constructor.name]);
        };
      };
    };
  };
  var functorFreeAp = {
    map: function(f) {
      return function(x) {
        return mkAp(new Pure(f))(x);
      };
    }
  };
  var foldFreeAp = function(dictApplicative) {
    var goApply1 = goApply(dictApplicative);
    var pure18 = pure(dictApplicative);
    var goLeft1 = goLeft(dictApplicative);
    return function(nat) {
      return function(z) {
        var go2 = function($copy_v) {
          var $tco_done = false;
          var $tco_result;
          function $tco_loop(v) {
            if (v.value1.value0 instanceof Pure) {
              var v1 = goApply1(v.value0)(v.value1.value1)(pure18(v.value1.value0.value0));
              if (v1 instanceof Left) {
                $tco_done = true;
                return v1.value0;
              }
              ;
              if (v1 instanceof Right) {
                $copy_v = v1.value0;
                return;
              }
              ;
              throw new Error("Failed pattern match at Control.Applicative.Free (line 54, column 17 - line 56, column 24): " + [v1.constructor.name]);
            }
            ;
            if (v.value1.value0 instanceof Lift) {
              var v1 = goApply1(v.value0)(v.value1.value1)(nat(v.value1.value0.value0));
              if (v1 instanceof Left) {
                $tco_done = true;
                return v1.value0;
              }
              ;
              if (v1 instanceof Right) {
                $copy_v = v1.value0;
                return;
              }
              ;
              throw new Error("Failed pattern match at Control.Applicative.Free (line 57, column 17 - line 59, column 24): " + [v1.constructor.name]);
            }
            ;
            if (v.value1.value0 instanceof Ap) {
              var nextVals = new NonEmpty(v.value1.value0.value1, v.value1.value1);
              $copy_v = goLeft1(v.value0)(nextVals)(nat)(v.value1.value0.value0)(1);
              return;
            }
            ;
            throw new Error("Failed pattern match at Control.Applicative.Free (line 53, column 5 - line 62, column 47): " + [v.value1.value0.constructor.name]);
          }
          ;
          while (!$tco_done) {
            $tco_result = $tco_loop($copy_v);
          }
          ;
          return $tco_result;
        };
        return go2(new Tuple(Nil.value, singleton3(z)));
      };
    };
  };
  var retractFreeAp = function(dictApplicative) {
    return foldFreeAp(dictApplicative)(identity7);
  };
  var applyFreeAp = {
    apply: function(fba) {
      return function(fb) {
        return mkAp(fba)(fb);
      };
    },
    Functor0: function() {
      return functorFreeAp;
    }
  };
  var applicativeFreeAp = /* @__PURE__ */ function() {
    return {
      pure: Pure.create,
      Apply0: function() {
        return applyFreeAp;
      }
    };
  }();
  var foldFreeAp1 = /* @__PURE__ */ foldFreeAp(applicativeFreeAp);
  var hoistFreeAp = function(f) {
    return foldFreeAp1(function($54) {
      return liftFreeAp(f($54));
    });
  };

  // output/Effect.Exception/foreign.js
  function error(msg) {
    return new Error(msg);
  }
  function message(e) {
    return e.message;
  }
  function throwException(e) {
    return function() {
      throw e;
    };
  }

  // output/Effect.Exception/index.js
  var $$throw = function($4) {
    return throwException(error($4));
  };

  // output/Control.Monad.Error.Class/index.js
  var throwError = function(dict) {
    return dict.throwError;
  };
  var catchError = function(dict) {
    return dict.catchError;
  };
  var $$try = function(dictMonadError) {
    var catchError1 = catchError(dictMonadError);
    var Monad0 = dictMonadError.MonadThrow0().Monad0();
    var map39 = map(Monad0.Bind1().Apply0().Functor0());
    var pure18 = pure(Monad0.Applicative0());
    return function(a2) {
      return catchError1(map39(Right.create)(a2))(function($52) {
        return pure18(Left.create($52));
      });
    };
  };

  // output/Data.CatQueue/index.js
  var CatQueue = /* @__PURE__ */ function() {
    function CatQueue2(value0, value19) {
      this.value0 = value0;
      this.value1 = value19;
    }
    ;
    CatQueue2.create = function(value0) {
      return function(value19) {
        return new CatQueue2(value0, value19);
      };
    };
    return CatQueue2;
  }();
  var uncons2 = function($copy_v) {
    var $tco_done = false;
    var $tco_result;
    function $tco_loop(v) {
      if (v.value0 instanceof Nil && v.value1 instanceof Nil) {
        $tco_done = true;
        return Nothing.value;
      }
      ;
      if (v.value0 instanceof Nil) {
        $copy_v = new CatQueue(reverse(v.value1), Nil.value);
        return;
      }
      ;
      if (v.value0 instanceof Cons) {
        $tco_done = true;
        return new Just(new Tuple(v.value0.value0, new CatQueue(v.value0.value1, v.value1)));
      }
      ;
      throw new Error("Failed pattern match at Data.CatQueue (line 82, column 1 - line 82, column 63): " + [v.constructor.name]);
    }
    ;
    while (!$tco_done) {
      $tco_result = $tco_loop($copy_v);
    }
    ;
    return $tco_result;
  };
  var snoc2 = function(v) {
    return function(a2) {
      return new CatQueue(v.value0, new Cons(a2, v.value1));
    };
  };
  var $$null2 = function(v) {
    if (v.value0 instanceof Nil && v.value1 instanceof Nil) {
      return true;
    }
    ;
    return false;
  };
  var empty2 = /* @__PURE__ */ function() {
    return new CatQueue(Nil.value, Nil.value);
  }();

  // output/Data.CatList/index.js
  var CatNil = /* @__PURE__ */ function() {
    function CatNil2() {
    }
    ;
    CatNil2.value = new CatNil2();
    return CatNil2;
  }();
  var CatCons = /* @__PURE__ */ function() {
    function CatCons2(value0, value19) {
      this.value0 = value0;
      this.value1 = value19;
    }
    ;
    CatCons2.create = function(value0) {
      return function(value19) {
        return new CatCons2(value0, value19);
      };
    };
    return CatCons2;
  }();
  var link = function(v) {
    return function(v1) {
      if (v instanceof CatNil) {
        return v1;
      }
      ;
      if (v1 instanceof CatNil) {
        return v;
      }
      ;
      if (v instanceof CatCons) {
        return new CatCons(v.value0, snoc2(v.value1)(v1));
      }
      ;
      throw new Error("Failed pattern match at Data.CatList (line 108, column 1 - line 108, column 54): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var foldr3 = function(k) {
    return function(b2) {
      return function(q2) {
        var foldl3 = function($copy_v) {
          return function($copy_v1) {
            return function($copy_v2) {
              var $tco_var_v = $copy_v;
              var $tco_var_v1 = $copy_v1;
              var $tco_done = false;
              var $tco_result;
              function $tco_loop(v, v1, v2) {
                if (v2 instanceof Nil) {
                  $tco_done = true;
                  return v1;
                }
                ;
                if (v2 instanceof Cons) {
                  $tco_var_v = v;
                  $tco_var_v1 = v(v1)(v2.value0);
                  $copy_v2 = v2.value1;
                  return;
                }
                ;
                throw new Error("Failed pattern match at Data.CatList (line 124, column 3 - line 124, column 59): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
              }
              ;
              while (!$tco_done) {
                $tco_result = $tco_loop($tco_var_v, $tco_var_v1, $copy_v2);
              }
              ;
              return $tco_result;
            };
          };
        };
        var go2 = function($copy_xs) {
          return function($copy_ys) {
            var $tco_var_xs = $copy_xs;
            var $tco_done1 = false;
            var $tco_result;
            function $tco_loop(xs, ys) {
              var v = uncons2(xs);
              if (v instanceof Nothing) {
                $tco_done1 = true;
                return foldl3(function(x) {
                  return function(i2) {
                    return i2(x);
                  };
                })(b2)(ys);
              }
              ;
              if (v instanceof Just) {
                $tco_var_xs = v.value0.value1;
                $copy_ys = new Cons(k(v.value0.value0), ys);
                return;
              }
              ;
              throw new Error("Failed pattern match at Data.CatList (line 120, column 14 - line 122, column 67): " + [v.constructor.name]);
            }
            ;
            while (!$tco_done1) {
              $tco_result = $tco_loop($tco_var_xs, $copy_ys);
            }
            ;
            return $tco_result;
          };
        };
        return go2(q2)(Nil.value);
      };
    };
  };
  var uncons3 = function(v) {
    if (v instanceof CatNil) {
      return Nothing.value;
    }
    ;
    if (v instanceof CatCons) {
      return new Just(new Tuple(v.value0, function() {
        var $66 = $$null2(v.value1);
        if ($66) {
          return CatNil.value;
        }
        ;
        return foldr3(link)(CatNil.value)(v.value1);
      }()));
    }
    ;
    throw new Error("Failed pattern match at Data.CatList (line 99, column 1 - line 99, column 61): " + [v.constructor.name]);
  };
  var empty3 = /* @__PURE__ */ function() {
    return CatNil.value;
  }();
  var append3 = link;
  var semigroupCatList = {
    append: append3
  };
  var snoc3 = function(cat) {
    return function(a2) {
      return append3(cat)(new CatCons(a2, empty2));
    };
  };

  // output/Control.Monad.Free/index.js
  var $runtime_lazy2 = function(name16, moduleName, init4) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name16 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init4();
      state3 = 2;
      return val;
    };
  };
  var append4 = /* @__PURE__ */ append(semigroupCatList);
  var map5 = /* @__PURE__ */ map(functorFn);
  var Free = /* @__PURE__ */ function() {
    function Free2(value0, value19) {
      this.value0 = value0;
      this.value1 = value19;
    }
    ;
    Free2.create = function(value0) {
      return function(value19) {
        return new Free2(value0, value19);
      };
    };
    return Free2;
  }();
  var Return = /* @__PURE__ */ function() {
    function Return2(value0) {
      this.value0 = value0;
    }
    ;
    Return2.create = function(value0) {
      return new Return2(value0);
    };
    return Return2;
  }();
  var Bind = /* @__PURE__ */ function() {
    function Bind2(value0, value19) {
      this.value0 = value0;
      this.value1 = value19;
    }
    ;
    Bind2.create = function(value0) {
      return function(value19) {
        return new Bind2(value0, value19);
      };
    };
    return Bind2;
  }();
  var toView = function($copy_v) {
    var $tco_done = false;
    var $tco_result;
    function $tco_loop(v) {
      var runExpF = function(v22) {
        return v22;
      };
      var concatF = function(v22) {
        return function(r) {
          return new Free(v22.value0, append4(v22.value1)(r));
        };
      };
      if (v.value0 instanceof Return) {
        var v2 = uncons3(v.value1);
        if (v2 instanceof Nothing) {
          $tco_done = true;
          return new Return(v.value0.value0);
        }
        ;
        if (v2 instanceof Just) {
          $copy_v = concatF(runExpF(v2.value0.value0)(v.value0.value0))(v2.value0.value1);
          return;
        }
        ;
        throw new Error("Failed pattern match at Control.Monad.Free (line 227, column 7 - line 231, column 64): " + [v2.constructor.name]);
      }
      ;
      if (v.value0 instanceof Bind) {
        $tco_done = true;
        return new Bind(v.value0.value0, function(a2) {
          return concatF(v.value0.value1(a2))(v.value1);
        });
      }
      ;
      throw new Error("Failed pattern match at Control.Monad.Free (line 225, column 3 - line 233, column 56): " + [v.value0.constructor.name]);
    }
    ;
    while (!$tco_done) {
      $tco_result = $tco_loop($copy_v);
    }
    ;
    return $tco_result;
  };
  var fromView = function(f) {
    return new Free(f, empty3);
  };
  var freeMonad = {
    Applicative0: function() {
      return freeApplicative;
    },
    Bind1: function() {
      return freeBind;
    }
  };
  var freeFunctor = {
    map: function(k) {
      return function(f) {
        return bindFlipped(freeBind)(function() {
          var $189 = pure(freeApplicative);
          return function($190) {
            return $189(k($190));
          };
        }())(f);
      };
    }
  };
  var freeBind = {
    bind: function(v) {
      return function(k) {
        return new Free(v.value0, snoc3(v.value1)(k));
      };
    },
    Apply0: function() {
      return $lazy_freeApply(0);
    }
  };
  var freeApplicative = {
    pure: function($191) {
      return fromView(Return.create($191));
    },
    Apply0: function() {
      return $lazy_freeApply(0);
    }
  };
  var $lazy_freeApply = /* @__PURE__ */ $runtime_lazy2("freeApply", "Control.Monad.Free", function() {
    return {
      apply: ap(freeMonad),
      Functor0: function() {
        return freeFunctor;
      }
    };
  });
  var bind2 = /* @__PURE__ */ bind(freeBind);
  var pure2 = /* @__PURE__ */ pure(freeApplicative);
  var liftF = function(f) {
    return fromView(new Bind(f, function($192) {
      return pure2($192);
    }));
  };
  var substFree = function(k) {
    var go2 = function(f) {
      var v = toView(f);
      if (v instanceof Return) {
        return pure2(v.value0);
      }
      ;
      if (v instanceof Bind) {
        return bind2(k(v.value0))(map5(go2)(v.value1));
      }
      ;
      throw new Error("Failed pattern match at Control.Monad.Free (line 168, column 10 - line 170, column 33): " + [v.constructor.name]);
    };
    return go2;
  };
  var hoistFree = function(k) {
    return substFree(function($193) {
      return liftF(k($193));
    });
  };
  var foldFree = function(dictMonadRec) {
    var Monad0 = dictMonadRec.Monad0();
    var map115 = map(Monad0.Bind1().Apply0().Functor0());
    var pure18 = pure(Monad0.Applicative0());
    var tailRecM4 = tailRecM(dictMonadRec);
    return function(k) {
      var go2 = function(f) {
        var v = toView(f);
        if (v instanceof Return) {
          return map115(Done.create)(pure18(v.value0));
        }
        ;
        if (v instanceof Bind) {
          return map115(function($199) {
            return Loop.create(v.value1($199));
          })(k(v.value0));
        }
        ;
        throw new Error("Failed pattern match at Control.Monad.Free (line 158, column 10 - line 160, column 37): " + [v.constructor.name]);
      };
      return tailRecM4(go2);
    };
  };

  // output/Control.Monad.Reader.Class/index.js
  var ask = function(dict) {
    return dict.ask;
  };

  // output/Control.Monad.Writer.Class/index.js
  var tell = function(dict) {
    return dict.tell;
  };

  // output/Data.Map.Internal/index.js
  var Leaf = /* @__PURE__ */ function() {
    function Leaf2() {
    }
    ;
    Leaf2.value = new Leaf2();
    return Leaf2;
  }();
  var Two = /* @__PURE__ */ function() {
    function Two2(value0, value19, value24, value33) {
      this.value0 = value0;
      this.value1 = value19;
      this.value2 = value24;
      this.value3 = value33;
    }
    ;
    Two2.create = function(value0) {
      return function(value19) {
        return function(value24) {
          return function(value33) {
            return new Two2(value0, value19, value24, value33);
          };
        };
      };
    };
    return Two2;
  }();
  var Three = /* @__PURE__ */ function() {
    function Three2(value0, value19, value24, value33, value43, value52, value62) {
      this.value0 = value0;
      this.value1 = value19;
      this.value2 = value24;
      this.value3 = value33;
      this.value4 = value43;
      this.value5 = value52;
      this.value6 = value62;
    }
    ;
    Three2.create = function(value0) {
      return function(value19) {
        return function(value24) {
          return function(value33) {
            return function(value43) {
              return function(value52) {
                return function(value62) {
                  return new Three2(value0, value19, value24, value33, value43, value52, value62);
                };
              };
            };
          };
        };
      };
    };
    return Three2;
  }();
  var TwoLeft = /* @__PURE__ */ function() {
    function TwoLeft2(value0, value19, value24) {
      this.value0 = value0;
      this.value1 = value19;
      this.value2 = value24;
    }
    ;
    TwoLeft2.create = function(value0) {
      return function(value19) {
        return function(value24) {
          return new TwoLeft2(value0, value19, value24);
        };
      };
    };
    return TwoLeft2;
  }();
  var TwoRight = /* @__PURE__ */ function() {
    function TwoRight2(value0, value19, value24) {
      this.value0 = value0;
      this.value1 = value19;
      this.value2 = value24;
    }
    ;
    TwoRight2.create = function(value0) {
      return function(value19) {
        return function(value24) {
          return new TwoRight2(value0, value19, value24);
        };
      };
    };
    return TwoRight2;
  }();
  var ThreeLeft = /* @__PURE__ */ function() {
    function ThreeLeft2(value0, value19, value24, value33, value43, value52) {
      this.value0 = value0;
      this.value1 = value19;
      this.value2 = value24;
      this.value3 = value33;
      this.value4 = value43;
      this.value5 = value52;
    }
    ;
    ThreeLeft2.create = function(value0) {
      return function(value19) {
        return function(value24) {
          return function(value33) {
            return function(value43) {
              return function(value52) {
                return new ThreeLeft2(value0, value19, value24, value33, value43, value52);
              };
            };
          };
        };
      };
    };
    return ThreeLeft2;
  }();
  var ThreeMiddle = /* @__PURE__ */ function() {
    function ThreeMiddle2(value0, value19, value24, value33, value43, value52) {
      this.value0 = value0;
      this.value1 = value19;
      this.value2 = value24;
      this.value3 = value33;
      this.value4 = value43;
      this.value5 = value52;
    }
    ;
    ThreeMiddle2.create = function(value0) {
      return function(value19) {
        return function(value24) {
          return function(value33) {
            return function(value43) {
              return function(value52) {
                return new ThreeMiddle2(value0, value19, value24, value33, value43, value52);
              };
            };
          };
        };
      };
    };
    return ThreeMiddle2;
  }();
  var ThreeRight = /* @__PURE__ */ function() {
    function ThreeRight2(value0, value19, value24, value33, value43, value52) {
      this.value0 = value0;
      this.value1 = value19;
      this.value2 = value24;
      this.value3 = value33;
      this.value4 = value43;
      this.value5 = value52;
    }
    ;
    ThreeRight2.create = function(value0) {
      return function(value19) {
        return function(value24) {
          return function(value33) {
            return function(value43) {
              return function(value52) {
                return new ThreeRight2(value0, value19, value24, value33, value43, value52);
              };
            };
          };
        };
      };
    };
    return ThreeRight2;
  }();
  var KickUp = /* @__PURE__ */ function() {
    function KickUp2(value0, value19, value24, value33) {
      this.value0 = value0;
      this.value1 = value19;
      this.value2 = value24;
      this.value3 = value33;
    }
    ;
    KickUp2.create = function(value0) {
      return function(value19) {
        return function(value24) {
          return function(value33) {
            return new KickUp2(value0, value19, value24, value33);
          };
        };
      };
    };
    return KickUp2;
  }();
  var lookup2 = function(dictOrd) {
    var compare2 = compare(dictOrd);
    return function(k) {
      var go2 = function($copy_v) {
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(v) {
          if (v instanceof Leaf) {
            $tco_done = true;
            return Nothing.value;
          }
          ;
          if (v instanceof Two) {
            var v2 = compare2(k)(v.value1);
            if (v2 instanceof EQ) {
              $tco_done = true;
              return new Just(v.value2);
            }
            ;
            if (v2 instanceof LT) {
              $copy_v = v.value0;
              return;
            }
            ;
            $copy_v = v.value3;
            return;
          }
          ;
          if (v instanceof Three) {
            var v3 = compare2(k)(v.value1);
            if (v3 instanceof EQ) {
              $tco_done = true;
              return new Just(v.value2);
            }
            ;
            var v4 = compare2(k)(v.value4);
            if (v4 instanceof EQ) {
              $tco_done = true;
              return new Just(v.value5);
            }
            ;
            if (v3 instanceof LT) {
              $copy_v = v.value0;
              return;
            }
            ;
            if (v4 instanceof GT) {
              $copy_v = v.value6;
              return;
            }
            ;
            $copy_v = v.value3;
            return;
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 241, column 5 - line 241, column 22): " + [v.constructor.name]);
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($copy_v);
        }
        ;
        return $tco_result;
      };
      return go2;
    };
  };
  var fromZipper = function($copy_dictOrd) {
    return function($copy_v) {
      return function($copy_v1) {
        var $tco_var_dictOrd = $copy_dictOrd;
        var $tco_var_v = $copy_v;
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(dictOrd, v, v1) {
          if (v instanceof Nil) {
            $tco_done = true;
            return v1;
          }
          ;
          if (v instanceof Cons) {
            if (v.value0 instanceof TwoLeft) {
              $tco_var_dictOrd = dictOrd;
              $tco_var_v = v.value1;
              $copy_v1 = new Two(v1, v.value0.value0, v.value0.value1, v.value0.value2);
              return;
            }
            ;
            if (v.value0 instanceof TwoRight) {
              $tco_var_dictOrd = dictOrd;
              $tco_var_v = v.value1;
              $copy_v1 = new Two(v.value0.value0, v.value0.value1, v.value0.value2, v1);
              return;
            }
            ;
            if (v.value0 instanceof ThreeLeft) {
              $tco_var_dictOrd = dictOrd;
              $tco_var_v = v.value1;
              $copy_v1 = new Three(v1, v.value0.value0, v.value0.value1, v.value0.value2, v.value0.value3, v.value0.value4, v.value0.value5);
              return;
            }
            ;
            if (v.value0 instanceof ThreeMiddle) {
              $tco_var_dictOrd = dictOrd;
              $tco_var_v = v.value1;
              $copy_v1 = new Three(v.value0.value0, v.value0.value1, v.value0.value2, v1, v.value0.value3, v.value0.value4, v.value0.value5);
              return;
            }
            ;
            if (v.value0 instanceof ThreeRight) {
              $tco_var_dictOrd = dictOrd;
              $tco_var_v = v.value1;
              $copy_v1 = new Three(v.value0.value0, v.value0.value1, v.value0.value2, v.value0.value3, v.value0.value4, v.value0.value5, v1);
              return;
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 462, column 3 - line 467, column 88): " + [v.value0.constructor.name]);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 459, column 1 - line 459, column 80): " + [v.constructor.name, v1.constructor.name]);
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($tco_var_dictOrd, $tco_var_v, $copy_v1);
        }
        ;
        return $tco_result;
      };
    };
  };
  var insert = function(dictOrd) {
    var fromZipper1 = fromZipper(dictOrd);
    var compare2 = compare(dictOrd);
    return function(k) {
      return function(v) {
        var up = function($copy_v1) {
          return function($copy_v2) {
            var $tco_var_v1 = $copy_v1;
            var $tco_done = false;
            var $tco_result;
            function $tco_loop(v1, v2) {
              if (v1 instanceof Nil) {
                $tco_done = true;
                return new Two(v2.value0, v2.value1, v2.value2, v2.value3);
              }
              ;
              if (v1 instanceof Cons) {
                if (v1.value0 instanceof TwoLeft) {
                  $tco_done = true;
                  return fromZipper1(v1.value1)(new Three(v2.value0, v2.value1, v2.value2, v2.value3, v1.value0.value0, v1.value0.value1, v1.value0.value2));
                }
                ;
                if (v1.value0 instanceof TwoRight) {
                  $tco_done = true;
                  return fromZipper1(v1.value1)(new Three(v1.value0.value0, v1.value0.value1, v1.value0.value2, v2.value0, v2.value1, v2.value2, v2.value3));
                }
                ;
                if (v1.value0 instanceof ThreeLeft) {
                  $tco_var_v1 = v1.value1;
                  $copy_v2 = new KickUp(new Two(v2.value0, v2.value1, v2.value2, v2.value3), v1.value0.value0, v1.value0.value1, new Two(v1.value0.value2, v1.value0.value3, v1.value0.value4, v1.value0.value5));
                  return;
                }
                ;
                if (v1.value0 instanceof ThreeMiddle) {
                  $tco_var_v1 = v1.value1;
                  $copy_v2 = new KickUp(new Two(v1.value0.value0, v1.value0.value1, v1.value0.value2, v2.value0), v2.value1, v2.value2, new Two(v2.value3, v1.value0.value3, v1.value0.value4, v1.value0.value5));
                  return;
                }
                ;
                if (v1.value0 instanceof ThreeRight) {
                  $tco_var_v1 = v1.value1;
                  $copy_v2 = new KickUp(new Two(v1.value0.value0, v1.value0.value1, v1.value0.value2, v1.value0.value3), v1.value0.value4, v1.value0.value5, new Two(v2.value0, v2.value1, v2.value2, v2.value3));
                  return;
                }
                ;
                throw new Error("Failed pattern match at Data.Map.Internal (line 498, column 5 - line 503, column 108): " + [v1.value0.constructor.name, v2.constructor.name]);
              }
              ;
              throw new Error("Failed pattern match at Data.Map.Internal (line 495, column 3 - line 495, column 56): " + [v1.constructor.name, v2.constructor.name]);
            }
            ;
            while (!$tco_done) {
              $tco_result = $tco_loop($tco_var_v1, $copy_v2);
            }
            ;
            return $tco_result;
          };
        };
        var down = function($copy_v1) {
          return function($copy_v2) {
            var $tco_var_v1 = $copy_v1;
            var $tco_done1 = false;
            var $tco_result;
            function $tco_loop(v1, v2) {
              if (v2 instanceof Leaf) {
                $tco_done1 = true;
                return up(v1)(new KickUp(Leaf.value, k, v, Leaf.value));
              }
              ;
              if (v2 instanceof Two) {
                var v3 = compare2(k)(v2.value1);
                if (v3 instanceof EQ) {
                  $tco_done1 = true;
                  return fromZipper1(v1)(new Two(v2.value0, k, v, v2.value3));
                }
                ;
                if (v3 instanceof LT) {
                  $tco_var_v1 = new Cons(new TwoLeft(v2.value1, v2.value2, v2.value3), v1);
                  $copy_v2 = v2.value0;
                  return;
                }
                ;
                $tco_var_v1 = new Cons(new TwoRight(v2.value0, v2.value1, v2.value2), v1);
                $copy_v2 = v2.value3;
                return;
              }
              ;
              if (v2 instanceof Three) {
                var v3 = compare2(k)(v2.value1);
                if (v3 instanceof EQ) {
                  $tco_done1 = true;
                  return fromZipper1(v1)(new Three(v2.value0, k, v, v2.value3, v2.value4, v2.value5, v2.value6));
                }
                ;
                var v4 = compare2(k)(v2.value4);
                if (v4 instanceof EQ) {
                  $tco_done1 = true;
                  return fromZipper1(v1)(new Three(v2.value0, v2.value1, v2.value2, v2.value3, k, v, v2.value6));
                }
                ;
                if (v3 instanceof LT) {
                  $tco_var_v1 = new Cons(new ThreeLeft(v2.value1, v2.value2, v2.value3, v2.value4, v2.value5, v2.value6), v1);
                  $copy_v2 = v2.value0;
                  return;
                }
                ;
                if (v3 instanceof GT && v4 instanceof LT) {
                  $tco_var_v1 = new Cons(new ThreeMiddle(v2.value0, v2.value1, v2.value2, v2.value4, v2.value5, v2.value6), v1);
                  $copy_v2 = v2.value3;
                  return;
                }
                ;
                $tco_var_v1 = new Cons(new ThreeRight(v2.value0, v2.value1, v2.value2, v2.value3, v2.value4, v2.value5), v1);
                $copy_v2 = v2.value6;
                return;
              }
              ;
              throw new Error("Failed pattern match at Data.Map.Internal (line 478, column 3 - line 478, column 55): " + [v1.constructor.name, v2.constructor.name]);
            }
            ;
            while (!$tco_done1) {
              $tco_result = $tco_loop($tco_var_v1, $copy_v2);
            }
            ;
            return $tco_result;
          };
        };
        return down(Nil.value);
      };
    };
  };
  var pop = function(dictOrd) {
    var fromZipper1 = fromZipper(dictOrd);
    var compare2 = compare(dictOrd);
    return function(k) {
      var up = function($copy_ctxs) {
        return function($copy_tree) {
          var $tco_var_ctxs = $copy_ctxs;
          var $tco_done = false;
          var $tco_result;
          function $tco_loop(ctxs, tree) {
            if (ctxs instanceof Nil) {
              $tco_done = true;
              return tree;
            }
            ;
            if (ctxs instanceof Cons) {
              if (ctxs.value0 instanceof TwoLeft && (ctxs.value0.value2 instanceof Leaf && tree instanceof Leaf)) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Two(Leaf.value, ctxs.value0.value0, ctxs.value0.value1, Leaf.value));
              }
              ;
              if (ctxs.value0 instanceof TwoRight && (ctxs.value0.value0 instanceof Leaf && tree instanceof Leaf)) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Two(Leaf.value, ctxs.value0.value1, ctxs.value0.value2, Leaf.value));
              }
              ;
              if (ctxs.value0 instanceof TwoLeft && ctxs.value0.value2 instanceof Two) {
                $tco_var_ctxs = ctxs.value1;
                $copy_tree = new Three(tree, ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2.value0, ctxs.value0.value2.value1, ctxs.value0.value2.value2, ctxs.value0.value2.value3);
                return;
              }
              ;
              if (ctxs.value0 instanceof TwoRight && ctxs.value0.value0 instanceof Two) {
                $tco_var_ctxs = ctxs.value1;
                $copy_tree = new Three(ctxs.value0.value0.value0, ctxs.value0.value0.value1, ctxs.value0.value0.value2, ctxs.value0.value0.value3, ctxs.value0.value1, ctxs.value0.value2, tree);
                return;
              }
              ;
              if (ctxs.value0 instanceof TwoLeft && ctxs.value0.value2 instanceof Three) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Two(new Two(tree, ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2.value0), ctxs.value0.value2.value1, ctxs.value0.value2.value2, new Two(ctxs.value0.value2.value3, ctxs.value0.value2.value4, ctxs.value0.value2.value5, ctxs.value0.value2.value6)));
              }
              ;
              if (ctxs.value0 instanceof TwoRight && ctxs.value0.value0 instanceof Three) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Two(new Two(ctxs.value0.value0.value0, ctxs.value0.value0.value1, ctxs.value0.value0.value2, ctxs.value0.value0.value3), ctxs.value0.value0.value4, ctxs.value0.value0.value5, new Two(ctxs.value0.value0.value6, ctxs.value0.value1, ctxs.value0.value2, tree)));
              }
              ;
              if (ctxs.value0 instanceof ThreeLeft && (ctxs.value0.value2 instanceof Leaf && (ctxs.value0.value5 instanceof Leaf && tree instanceof Leaf))) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Three(Leaf.value, ctxs.value0.value0, ctxs.value0.value1, Leaf.value, ctxs.value0.value3, ctxs.value0.value4, Leaf.value));
              }
              ;
              if (ctxs.value0 instanceof ThreeMiddle && (ctxs.value0.value0 instanceof Leaf && (ctxs.value0.value5 instanceof Leaf && tree instanceof Leaf))) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Three(Leaf.value, ctxs.value0.value1, ctxs.value0.value2, Leaf.value, ctxs.value0.value3, ctxs.value0.value4, Leaf.value));
              }
              ;
              if (ctxs.value0 instanceof ThreeRight && (ctxs.value0.value0 instanceof Leaf && (ctxs.value0.value3 instanceof Leaf && tree instanceof Leaf))) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Three(Leaf.value, ctxs.value0.value1, ctxs.value0.value2, Leaf.value, ctxs.value0.value4, ctxs.value0.value5, Leaf.value));
              }
              ;
              if (ctxs.value0 instanceof ThreeLeft && ctxs.value0.value2 instanceof Two) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Two(new Three(tree, ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2.value0, ctxs.value0.value2.value1, ctxs.value0.value2.value2, ctxs.value0.value2.value3), ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5));
              }
              ;
              if (ctxs.value0 instanceof ThreeMiddle && ctxs.value0.value0 instanceof Two) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Two(new Three(ctxs.value0.value0.value0, ctxs.value0.value0.value1, ctxs.value0.value0.value2, ctxs.value0.value0.value3, ctxs.value0.value1, ctxs.value0.value2, tree), ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5));
              }
              ;
              if (ctxs.value0 instanceof ThreeMiddle && ctxs.value0.value5 instanceof Two) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Two(ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2, new Three(tree, ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5.value0, ctxs.value0.value5.value1, ctxs.value0.value5.value2, ctxs.value0.value5.value3)));
              }
              ;
              if (ctxs.value0 instanceof ThreeRight && ctxs.value0.value3 instanceof Two) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Two(ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2, new Three(ctxs.value0.value3.value0, ctxs.value0.value3.value1, ctxs.value0.value3.value2, ctxs.value0.value3.value3, ctxs.value0.value4, ctxs.value0.value5, tree)));
              }
              ;
              if (ctxs.value0 instanceof ThreeLeft && ctxs.value0.value2 instanceof Three) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Three(new Two(tree, ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2.value0), ctxs.value0.value2.value1, ctxs.value0.value2.value2, new Two(ctxs.value0.value2.value3, ctxs.value0.value2.value4, ctxs.value0.value2.value5, ctxs.value0.value2.value6), ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5));
              }
              ;
              if (ctxs.value0 instanceof ThreeMiddle && ctxs.value0.value0 instanceof Three) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Three(new Two(ctxs.value0.value0.value0, ctxs.value0.value0.value1, ctxs.value0.value0.value2, ctxs.value0.value0.value3), ctxs.value0.value0.value4, ctxs.value0.value0.value5, new Two(ctxs.value0.value0.value6, ctxs.value0.value1, ctxs.value0.value2, tree), ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5));
              }
              ;
              if (ctxs.value0 instanceof ThreeMiddle && ctxs.value0.value5 instanceof Three) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Three(ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2, new Two(tree, ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5.value0), ctxs.value0.value5.value1, ctxs.value0.value5.value2, new Two(ctxs.value0.value5.value3, ctxs.value0.value5.value4, ctxs.value0.value5.value5, ctxs.value0.value5.value6)));
              }
              ;
              if (ctxs.value0 instanceof ThreeRight && ctxs.value0.value3 instanceof Three) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Three(ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2, new Two(ctxs.value0.value3.value0, ctxs.value0.value3.value1, ctxs.value0.value3.value2, ctxs.value0.value3.value3), ctxs.value0.value3.value4, ctxs.value0.value3.value5, new Two(ctxs.value0.value3.value6, ctxs.value0.value4, ctxs.value0.value5, tree)));
              }
              ;
              $tco_done = true;
              return unsafeCrashWith("The impossible happened in partial function `up`.");
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 552, column 5 - line 573, column 86): " + [ctxs.constructor.name]);
          }
          ;
          while (!$tco_done) {
            $tco_result = $tco_loop($tco_var_ctxs, $copy_tree);
          }
          ;
          return $tco_result;
        };
      };
      var removeMaxNode = function($copy_ctx) {
        return function($copy_m) {
          var $tco_var_ctx = $copy_ctx;
          var $tco_done1 = false;
          var $tco_result;
          function $tco_loop(ctx, m) {
            if (m instanceof Two && (m.value0 instanceof Leaf && m.value3 instanceof Leaf)) {
              $tco_done1 = true;
              return up(ctx)(Leaf.value);
            }
            ;
            if (m instanceof Two) {
              $tco_var_ctx = new Cons(new TwoRight(m.value0, m.value1, m.value2), ctx);
              $copy_m = m.value3;
              return;
            }
            ;
            if (m instanceof Three && (m.value0 instanceof Leaf && (m.value3 instanceof Leaf && m.value6 instanceof Leaf))) {
              $tco_done1 = true;
              return up(new Cons(new TwoRight(Leaf.value, m.value1, m.value2), ctx))(Leaf.value);
            }
            ;
            if (m instanceof Three) {
              $tco_var_ctx = new Cons(new ThreeRight(m.value0, m.value1, m.value2, m.value3, m.value4, m.value5), ctx);
              $copy_m = m.value6;
              return;
            }
            ;
            $tco_done1 = true;
            return unsafeCrashWith("The impossible happened in partial function `removeMaxNode`.");
          }
          ;
          while (!$tco_done1) {
            $tco_result = $tco_loop($tco_var_ctx, $copy_m);
          }
          ;
          return $tco_result;
        };
      };
      var maxNode = function($copy_m) {
        var $tco_done2 = false;
        var $tco_result;
        function $tco_loop(m) {
          if (m instanceof Two && m.value3 instanceof Leaf) {
            $tco_done2 = true;
            return {
              key: m.value1,
              value: m.value2
            };
          }
          ;
          if (m instanceof Two) {
            $copy_m = m.value3;
            return;
          }
          ;
          if (m instanceof Three && m.value6 instanceof Leaf) {
            $tco_done2 = true;
            return {
              key: m.value4,
              value: m.value5
            };
          }
          ;
          if (m instanceof Three) {
            $copy_m = m.value6;
            return;
          }
          ;
          $tco_done2 = true;
          return unsafeCrashWith("The impossible happened in partial function `maxNode`.");
        }
        ;
        while (!$tco_done2) {
          $tco_result = $tco_loop($copy_m);
        }
        ;
        return $tco_result;
      };
      var down = function($copy_ctx) {
        return function($copy_m) {
          var $tco_var_ctx = $copy_ctx;
          var $tco_done3 = false;
          var $tco_result;
          function $tco_loop(ctx, m) {
            if (m instanceof Leaf) {
              $tco_done3 = true;
              return Nothing.value;
            }
            ;
            if (m instanceof Two) {
              var v = compare2(k)(m.value1);
              if (m.value3 instanceof Leaf && v instanceof EQ) {
                $tco_done3 = true;
                return new Just(new Tuple(m.value2, up(ctx)(Leaf.value)));
              }
              ;
              if (v instanceof EQ) {
                var max7 = maxNode(m.value0);
                $tco_done3 = true;
                return new Just(new Tuple(m.value2, removeMaxNode(new Cons(new TwoLeft(max7.key, max7.value, m.value3), ctx))(m.value0)));
              }
              ;
              if (v instanceof LT) {
                $tco_var_ctx = new Cons(new TwoLeft(m.value1, m.value2, m.value3), ctx);
                $copy_m = m.value0;
                return;
              }
              ;
              $tco_var_ctx = new Cons(new TwoRight(m.value0, m.value1, m.value2), ctx);
              $copy_m = m.value3;
              return;
            }
            ;
            if (m instanceof Three) {
              var leaves = function() {
                if (m.value0 instanceof Leaf && (m.value3 instanceof Leaf && m.value6 instanceof Leaf)) {
                  return true;
                }
                ;
                return false;
              }();
              var v = compare2(k)(m.value4);
              var v3 = compare2(k)(m.value1);
              if (leaves && v3 instanceof EQ) {
                $tco_done3 = true;
                return new Just(new Tuple(m.value2, fromZipper1(ctx)(new Two(Leaf.value, m.value4, m.value5, Leaf.value))));
              }
              ;
              if (leaves && v instanceof EQ) {
                $tco_done3 = true;
                return new Just(new Tuple(m.value5, fromZipper1(ctx)(new Two(Leaf.value, m.value1, m.value2, Leaf.value))));
              }
              ;
              if (v3 instanceof EQ) {
                var max7 = maxNode(m.value0);
                $tco_done3 = true;
                return new Just(new Tuple(m.value2, removeMaxNode(new Cons(new ThreeLeft(max7.key, max7.value, m.value3, m.value4, m.value5, m.value6), ctx))(m.value0)));
              }
              ;
              if (v instanceof EQ) {
                var max7 = maxNode(m.value3);
                $tco_done3 = true;
                return new Just(new Tuple(m.value5, removeMaxNode(new Cons(new ThreeMiddle(m.value0, m.value1, m.value2, max7.key, max7.value, m.value6), ctx))(m.value3)));
              }
              ;
              if (v3 instanceof LT) {
                $tco_var_ctx = new Cons(new ThreeLeft(m.value1, m.value2, m.value3, m.value4, m.value5, m.value6), ctx);
                $copy_m = m.value0;
                return;
              }
              ;
              if (v3 instanceof GT && v instanceof LT) {
                $tco_var_ctx = new Cons(new ThreeMiddle(m.value0, m.value1, m.value2, m.value4, m.value5, m.value6), ctx);
                $copy_m = m.value3;
                return;
              }
              ;
              $tco_var_ctx = new Cons(new ThreeRight(m.value0, m.value1, m.value2, m.value3, m.value4, m.value5), ctx);
              $copy_m = m.value6;
              return;
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 525, column 16 - line 548, column 80): " + [m.constructor.name]);
          }
          ;
          while (!$tco_done3) {
            $tco_result = $tco_loop($tco_var_ctx, $copy_m);
          }
          ;
          return $tco_result;
        };
      };
      return down(Nil.value);
    };
  };
  var foldableMap = {
    foldr: function(f) {
      return function(z) {
        return function(m) {
          if (m instanceof Leaf) {
            return z;
          }
          ;
          if (m instanceof Two) {
            return foldr(foldableMap)(f)(f(m.value2)(foldr(foldableMap)(f)(z)(m.value3)))(m.value0);
          }
          ;
          if (m instanceof Three) {
            return foldr(foldableMap)(f)(f(m.value2)(foldr(foldableMap)(f)(f(m.value5)(foldr(foldableMap)(f)(z)(m.value6)))(m.value3)))(m.value0);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 133, column 17 - line 136, column 85): " + [m.constructor.name]);
        };
      };
    },
    foldl: function(f) {
      return function(z) {
        return function(m) {
          if (m instanceof Leaf) {
            return z;
          }
          ;
          if (m instanceof Two) {
            return foldl(foldableMap)(f)(f(foldl(foldableMap)(f)(z)(m.value0))(m.value2))(m.value3);
          }
          ;
          if (m instanceof Three) {
            return foldl(foldableMap)(f)(f(foldl(foldableMap)(f)(f(foldl(foldableMap)(f)(z)(m.value0))(m.value2))(m.value3))(m.value5))(m.value6);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 137, column 17 - line 140, column 85): " + [m.constructor.name]);
        };
      };
    },
    foldMap: function(dictMonoid) {
      var mempty3 = mempty(dictMonoid);
      var append24 = append(dictMonoid.Semigroup0());
      return function(f) {
        return function(m) {
          if (m instanceof Leaf) {
            return mempty3;
          }
          ;
          if (m instanceof Two) {
            return append24(foldMap(foldableMap)(dictMonoid)(f)(m.value0))(append24(f(m.value2))(foldMap(foldableMap)(dictMonoid)(f)(m.value3)));
          }
          ;
          if (m instanceof Three) {
            return append24(foldMap(foldableMap)(dictMonoid)(f)(m.value0))(append24(f(m.value2))(append24(foldMap(foldableMap)(dictMonoid)(f)(m.value3))(append24(f(m.value5))(foldMap(foldableMap)(dictMonoid)(f)(m.value6)))));
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 141, column 17 - line 144, column 93): " + [m.constructor.name]);
        };
      };
    }
  };
  var empty4 = /* @__PURE__ */ function() {
    return Leaf.value;
  }();
  var $$delete = function(dictOrd) {
    var pop12 = pop(dictOrd);
    return function(k) {
      return function(m) {
        return maybe(m)(snd)(pop12(k)(m));
      };
    };
  };
  var alter = function(dictOrd) {
    var lookup13 = lookup2(dictOrd);
    var delete1 = $$delete(dictOrd);
    var insert13 = insert(dictOrd);
    return function(f) {
      return function(k) {
        return function(m) {
          var v = f(lookup13(k)(m));
          if (v instanceof Nothing) {
            return delete1(k)(m);
          }
          ;
          if (v instanceof Just) {
            return insert13(k)(v.value0)(m);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 596, column 15 - line 598, column 25): " + [v.constructor.name]);
        };
      };
    };
  };

  // output/Control.Monad.State.Class/index.js
  var state = function(dict) {
    return dict.state;
  };
  var modify_2 = function(dictMonadState) {
    var state1 = state(dictMonadState);
    return function(f) {
      return state1(function(s) {
        return new Tuple(unit, f(s));
      });
    };
  };
  var get = function(dictMonadState) {
    return state(dictMonadState)(function(s) {
      return new Tuple(s, s);
    });
  };

  // output/Effect.Class/index.js
  var monadEffectEffect = {
    liftEffect: /* @__PURE__ */ identity(categoryFn),
    Monad0: function() {
      return monadEffect;
    }
  };
  var liftEffect = function(dict) {
    return dict.liftEffect;
  };

  // output/Control.Monad.Except.Trans/index.js
  var map6 = /* @__PURE__ */ map(functorEither);
  var ExceptT = function(x) {
    return x;
  };
  var runExceptT = function(v) {
    return v;
  };
  var mapExceptT = function(f) {
    return function(v) {
      return f(v);
    };
  };
  var functorExceptT = function(dictFunctor) {
    var map115 = map(dictFunctor);
    return {
      map: function(f) {
        return mapExceptT(map115(map6(f)));
      }
    };
  };
  var monadExceptT = function(dictMonad) {
    return {
      Applicative0: function() {
        return applicativeExceptT(dictMonad);
      },
      Bind1: function() {
        return bindExceptT(dictMonad);
      }
    };
  };
  var bindExceptT = function(dictMonad) {
    var bind18 = bind(dictMonad.Bind1());
    var pure18 = pure(dictMonad.Applicative0());
    return {
      bind: function(v) {
        return function(k) {
          return bind18(v)(either(function($187) {
            return pure18(Left.create($187));
          })(function(a2) {
            var v1 = k(a2);
            return v1;
          }));
        };
      },
      Apply0: function() {
        return applyExceptT(dictMonad);
      }
    };
  };
  var applyExceptT = function(dictMonad) {
    var functorExceptT1 = functorExceptT(dictMonad.Bind1().Apply0().Functor0());
    return {
      apply: ap(monadExceptT(dictMonad)),
      Functor0: function() {
        return functorExceptT1;
      }
    };
  };
  var applicativeExceptT = function(dictMonad) {
    return {
      pure: function() {
        var $188 = pure(dictMonad.Applicative0());
        return function($189) {
          return ExceptT($188(Right.create($189)));
        };
      }(),
      Apply0: function() {
        return applyExceptT(dictMonad);
      }
    };
  };
  var monadThrowExceptT = function(dictMonad) {
    var monadExceptT1 = monadExceptT(dictMonad);
    return {
      throwError: function() {
        var $198 = pure(dictMonad.Applicative0());
        return function($199) {
          return ExceptT($198(Left.create($199)));
        };
      }(),
      Monad0: function() {
        return monadExceptT1;
      }
    };
  };
  var altExceptT = function(dictSemigroup) {
    var append13 = append(dictSemigroup);
    return function(dictMonad) {
      var Bind1 = dictMonad.Bind1();
      var bind18 = bind(Bind1);
      var pure18 = pure(dictMonad.Applicative0());
      var functorExceptT1 = functorExceptT(Bind1.Apply0().Functor0());
      return {
        alt: function(v) {
          return function(v1) {
            return bind18(v)(function(rm) {
              if (rm instanceof Right) {
                return pure18(new Right(rm.value0));
              }
              ;
              if (rm instanceof Left) {
                return bind18(v1)(function(rn) {
                  if (rn instanceof Right) {
                    return pure18(new Right(rn.value0));
                  }
                  ;
                  if (rn instanceof Left) {
                    return pure18(new Left(append13(rm.value0)(rn.value0)));
                  }
                  ;
                  throw new Error("Failed pattern match at Control.Monad.Except.Trans (line 86, column 9 - line 88, column 49): " + [rn.constructor.name]);
                });
              }
              ;
              throw new Error("Failed pattern match at Control.Monad.Except.Trans (line 82, column 5 - line 88, column 49): " + [rm.constructor.name]);
            });
          };
        },
        Functor0: function() {
          return functorExceptT1;
        }
      };
    };
  };

  // output/Control.Monad.Reader.Trans/index.js
  var ReaderT = function(x) {
    return x;
  };
  var runReaderT = function(v) {
    return v;
  };
  var monadTransReaderT = {
    lift: function(dictMonad) {
      return function($147) {
        return ReaderT($$const($147));
      };
    }
  };
  var lift3 = /* @__PURE__ */ lift(monadTransReaderT);
  var mapReaderT = function(f) {
    return function(v) {
      return function($148) {
        return f(v($148));
      };
    };
  };
  var functorReaderT = function(dictFunctor) {
    return {
      map: function() {
        var $149 = map(dictFunctor);
        return function($150) {
          return mapReaderT($149($150));
        };
      }()
    };
  };
  var applyReaderT = function(dictApply) {
    var apply6 = apply(dictApply);
    var functorReaderT1 = functorReaderT(dictApply.Functor0());
    return {
      apply: function(v) {
        return function(v1) {
          return function(r) {
            return apply6(v(r))(v1(r));
          };
        };
      },
      Functor0: function() {
        return functorReaderT1;
      }
    };
  };
  var bindReaderT = function(dictBind) {
    var bind18 = bind(dictBind);
    var applyReaderT1 = applyReaderT(dictBind.Apply0());
    return {
      bind: function(v) {
        return function(k) {
          return function(r) {
            return bind18(v(r))(function(a2) {
              var v1 = k(a2);
              return v1(r);
            });
          };
        };
      },
      Apply0: function() {
        return applyReaderT1;
      }
    };
  };
  var applicativeReaderT = function(dictApplicative) {
    var applyReaderT1 = applyReaderT(dictApplicative.Apply0());
    return {
      pure: function() {
        var $154 = pure(dictApplicative);
        return function($155) {
          return ReaderT($$const($154($155)));
        };
      }(),
      Apply0: function() {
        return applyReaderT1;
      }
    };
  };
  var monadReaderT = function(dictMonad) {
    var applicativeReaderT1 = applicativeReaderT(dictMonad.Applicative0());
    var bindReaderT1 = bindReaderT(dictMonad.Bind1());
    return {
      Applicative0: function() {
        return applicativeReaderT1;
      },
      Bind1: function() {
        return bindReaderT1;
      }
    };
  };
  var monadAskReaderT = function(dictMonad) {
    var monadReaderT1 = monadReaderT(dictMonad);
    return {
      ask: pure(dictMonad.Applicative0()),
      Monad0: function() {
        return monadReaderT1;
      }
    };
  };
  var monadEffectReader = function(dictMonadEffect) {
    var Monad0 = dictMonadEffect.Monad0();
    var monadReaderT1 = monadReaderT(Monad0);
    return {
      liftEffect: function() {
        var $157 = lift3(Monad0);
        var $158 = liftEffect(dictMonadEffect);
        return function($159) {
          return $157($158($159));
        };
      }(),
      Monad0: function() {
        return monadReaderT1;
      }
    };
  };

  // output/Control.Monad.Writer.Trans/index.js
  var WriterT = function(x) {
    return x;
  };
  var runWriterT = function(v) {
    return v;
  };
  var mapWriterT = function(f) {
    return function(v) {
      return f(v);
    };
  };
  var functorWriterT = function(dictFunctor) {
    var map39 = map(dictFunctor);
    return {
      map: function(f) {
        return mapWriterT(map39(function(v) {
          return new Tuple(f(v.value0), v.value1);
        }));
      }
    };
  };
  var applyWriterT = function(dictSemigroup) {
    var append13 = append(dictSemigroup);
    return function(dictApply) {
      var apply6 = apply(dictApply);
      var Functor0 = dictApply.Functor0();
      var map39 = map(Functor0);
      var functorWriterT1 = functorWriterT(Functor0);
      return {
        apply: function(v) {
          return function(v1) {
            var k = function(v3) {
              return function(v4) {
                return new Tuple(v3.value0(v4.value0), append13(v3.value1)(v4.value1));
              };
            };
            return apply6(map39(k)(v))(v1);
          };
        },
        Functor0: function() {
          return functorWriterT1;
        }
      };
    };
  };
  var bindWriterT = function(dictSemigroup) {
    var append13 = append(dictSemigroup);
    var applyWriterT1 = applyWriterT(dictSemigroup);
    return function(dictBind) {
      var bind18 = bind(dictBind);
      var Apply0 = dictBind.Apply0();
      var map39 = map(Apply0.Functor0());
      var applyWriterT2 = applyWriterT1(Apply0);
      return {
        bind: function(v) {
          return function(k) {
            return bind18(v)(function(v1) {
              var v2 = k(v1.value0);
              return map39(function(v3) {
                return new Tuple(v3.value0, append13(v1.value1)(v3.value1));
              })(v2);
            });
          };
        },
        Apply0: function() {
          return applyWriterT2;
        }
      };
    };
  };
  var applicativeWriterT = function(dictMonoid) {
    var mempty3 = mempty(dictMonoid);
    var applyWriterT1 = applyWriterT(dictMonoid.Semigroup0());
    return function(dictApplicative) {
      var pure18 = pure(dictApplicative);
      var applyWriterT2 = applyWriterT1(dictApplicative.Apply0());
      return {
        pure: function(a2) {
          return pure18(new Tuple(a2, mempty3));
        },
        Apply0: function() {
          return applyWriterT2;
        }
      };
    };
  };
  var monadWriterT = function(dictMonoid) {
    var applicativeWriterT1 = applicativeWriterT(dictMonoid);
    var bindWriterT1 = bindWriterT(dictMonoid.Semigroup0());
    return function(dictMonad) {
      var applicativeWriterT2 = applicativeWriterT1(dictMonad.Applicative0());
      var bindWriterT2 = bindWriterT1(dictMonad.Bind1());
      return {
        Applicative0: function() {
          return applicativeWriterT2;
        },
        Bind1: function() {
          return bindWriterT2;
        }
      };
    };
  };
  var monadTellWriterT = function(dictMonoid) {
    var Semigroup0 = dictMonoid.Semigroup0();
    var monadWriterT1 = monadWriterT(dictMonoid);
    return function(dictMonad) {
      var monadWriterT2 = monadWriterT1(dictMonad);
      return {
        tell: function() {
          var $252 = pure(dictMonad.Applicative0());
          var $253 = Tuple.create(unit);
          return function($254) {
            return WriterT($252($253($254)));
          };
        }(),
        Semigroup0: function() {
          return Semigroup0;
        },
        Monad1: function() {
          return monadWriterT2;
        }
      };
    };
  };

  // output/Effect.Aff/foreign.js
  var Aff = function() {
    var EMPTY = {};
    var PURE = "Pure";
    var THROW = "Throw";
    var CATCH = "Catch";
    var SYNC = "Sync";
    var ASYNC = "Async";
    var BIND = "Bind";
    var BRACKET = "Bracket";
    var FORK = "Fork";
    var SEQ = "Sequential";
    var MAP = "Map";
    var APPLY = "Apply";
    var ALT = "Alt";
    var CONS = "Cons";
    var RESUME = "Resume";
    var RELEASE = "Release";
    var FINALIZER = "Finalizer";
    var FINALIZED = "Finalized";
    var FORKED = "Forked";
    var FIBER = "Fiber";
    var THUNK = "Thunk";
    function Aff2(tag, _1, _2, _3) {
      this.tag = tag;
      this._1 = _1;
      this._2 = _2;
      this._3 = _3;
    }
    function AffCtr(tag) {
      var fn = function(_1, _2, _3) {
        return new Aff2(tag, _1, _2, _3);
      };
      fn.tag = tag;
      return fn;
    }
    function nonCanceler2(error4) {
      return new Aff2(PURE, void 0);
    }
    function runEff(eff) {
      try {
        eff();
      } catch (error4) {
        setTimeout(function() {
          throw error4;
        }, 0);
      }
    }
    function runSync(left, right, eff) {
      try {
        return right(eff());
      } catch (error4) {
        return left(error4);
      }
    }
    function runAsync(left, eff, k) {
      try {
        return eff(k)();
      } catch (error4) {
        k(left(error4))();
        return nonCanceler2;
      }
    }
    var Scheduler = function() {
      var limit = 1024;
      var size5 = 0;
      var ix = 0;
      var queue = new Array(limit);
      var draining = false;
      function drain() {
        var thunk;
        draining = true;
        while (size5 !== 0) {
          size5--;
          thunk = queue[ix];
          queue[ix] = void 0;
          ix = (ix + 1) % limit;
          thunk();
        }
        draining = false;
      }
      return {
        isDraining: function() {
          return draining;
        },
        enqueue: function(cb) {
          var i2, tmp;
          if (size5 === limit) {
            tmp = draining;
            drain();
            draining = tmp;
          }
          queue[(ix + size5) % limit] = cb;
          size5++;
          if (!draining) {
            drain();
          }
        }
      };
    }();
    function Supervisor(util) {
      var fibers = {};
      var fiberId = 0;
      var count = 0;
      return {
        register: function(fiber) {
          var fid = fiberId++;
          fiber.onComplete({
            rethrow: true,
            handler: function(result) {
              return function() {
                count--;
                delete fibers[fid];
              };
            }
          })();
          fibers[fid] = fiber;
          count++;
        },
        isEmpty: function() {
          return count === 0;
        },
        killAll: function(killError, cb) {
          return function() {
            if (count === 0) {
              return cb();
            }
            var killCount = 0;
            var kills = {};
            function kill2(fid) {
              kills[fid] = fibers[fid].kill(killError, function(result) {
                return function() {
                  delete kills[fid];
                  killCount--;
                  if (util.isLeft(result) && util.fromLeft(result)) {
                    setTimeout(function() {
                      throw util.fromLeft(result);
                    }, 0);
                  }
                  if (killCount === 0) {
                    cb();
                  }
                };
              })();
            }
            for (var k in fibers) {
              if (fibers.hasOwnProperty(k)) {
                killCount++;
                kill2(k);
              }
            }
            fibers = {};
            fiberId = 0;
            count = 0;
            return function(error4) {
              return new Aff2(SYNC, function() {
                for (var k2 in kills) {
                  if (kills.hasOwnProperty(k2)) {
                    kills[k2]();
                  }
                }
              });
            };
          };
        }
      };
    }
    var SUSPENDED = 0;
    var CONTINUE = 1;
    var STEP_BIND = 2;
    var STEP_RESULT = 3;
    var PENDING = 4;
    var RETURN = 5;
    var COMPLETED = 6;
    function Fiber(util, supervisor, aff) {
      var runTick = 0;
      var status = SUSPENDED;
      var step4 = aff;
      var fail3 = null;
      var interrupt = null;
      var bhead = null;
      var btail = null;
      var attempts = null;
      var bracketCount = 0;
      var joinId = 0;
      var joins = null;
      var rethrow = true;
      function run5(localRunTick) {
        var tmp, result, attempt;
        while (true) {
          tmp = null;
          result = null;
          attempt = null;
          switch (status) {
            case STEP_BIND:
              status = CONTINUE;
              try {
                step4 = bhead(step4);
                if (btail === null) {
                  bhead = null;
                } else {
                  bhead = btail._1;
                  btail = btail._2;
                }
              } catch (e) {
                status = RETURN;
                fail3 = util.left(e);
                step4 = null;
              }
              break;
            case STEP_RESULT:
              if (util.isLeft(step4)) {
                status = RETURN;
                fail3 = step4;
                step4 = null;
              } else if (bhead === null) {
                status = RETURN;
              } else {
                status = STEP_BIND;
                step4 = util.fromRight(step4);
              }
              break;
            case CONTINUE:
              switch (step4.tag) {
                case BIND:
                  if (bhead) {
                    btail = new Aff2(CONS, bhead, btail);
                  }
                  bhead = step4._2;
                  status = CONTINUE;
                  step4 = step4._1;
                  break;
                case PURE:
                  if (bhead === null) {
                    status = RETURN;
                    step4 = util.right(step4._1);
                  } else {
                    status = STEP_BIND;
                    step4 = step4._1;
                  }
                  break;
                case SYNC:
                  status = STEP_RESULT;
                  step4 = runSync(util.left, util.right, step4._1);
                  break;
                case ASYNC:
                  status = PENDING;
                  step4 = runAsync(util.left, step4._1, function(result2) {
                    return function() {
                      if (runTick !== localRunTick) {
                        return;
                      }
                      runTick++;
                      Scheduler.enqueue(function() {
                        if (runTick !== localRunTick + 1) {
                          return;
                        }
                        status = STEP_RESULT;
                        step4 = result2;
                        run5(runTick);
                      });
                    };
                  });
                  return;
                case THROW:
                  status = RETURN;
                  fail3 = util.left(step4._1);
                  step4 = null;
                  break;
                case CATCH:
                  if (bhead === null) {
                    attempts = new Aff2(CONS, step4, attempts, interrupt);
                  } else {
                    attempts = new Aff2(CONS, step4, new Aff2(CONS, new Aff2(RESUME, bhead, btail), attempts, interrupt), interrupt);
                  }
                  bhead = null;
                  btail = null;
                  status = CONTINUE;
                  step4 = step4._1;
                  break;
                case BRACKET:
                  bracketCount++;
                  if (bhead === null) {
                    attempts = new Aff2(CONS, step4, attempts, interrupt);
                  } else {
                    attempts = new Aff2(CONS, step4, new Aff2(CONS, new Aff2(RESUME, bhead, btail), attempts, interrupt), interrupt);
                  }
                  bhead = null;
                  btail = null;
                  status = CONTINUE;
                  step4 = step4._1;
                  break;
                case FORK:
                  status = STEP_RESULT;
                  tmp = Fiber(util, supervisor, step4._2);
                  if (supervisor) {
                    supervisor.register(tmp);
                  }
                  if (step4._1) {
                    tmp.run();
                  }
                  step4 = util.right(tmp);
                  break;
                case SEQ:
                  status = CONTINUE;
                  step4 = sequential3(util, supervisor, step4._1);
                  break;
              }
              break;
            case RETURN:
              bhead = null;
              btail = null;
              if (attempts === null) {
                status = COMPLETED;
                step4 = interrupt || fail3 || step4;
              } else {
                tmp = attempts._3;
                attempt = attempts._1;
                attempts = attempts._2;
                switch (attempt.tag) {
                  case CATCH:
                    if (interrupt && interrupt !== tmp && bracketCount === 0) {
                      status = RETURN;
                    } else if (fail3) {
                      status = CONTINUE;
                      step4 = attempt._2(util.fromLeft(fail3));
                      fail3 = null;
                    }
                    break;
                  case RESUME:
                    if (interrupt && interrupt !== tmp && bracketCount === 0 || fail3) {
                      status = RETURN;
                    } else {
                      bhead = attempt._1;
                      btail = attempt._2;
                      status = STEP_BIND;
                      step4 = util.fromRight(step4);
                    }
                    break;
                  case BRACKET:
                    bracketCount--;
                    if (fail3 === null) {
                      result = util.fromRight(step4);
                      attempts = new Aff2(CONS, new Aff2(RELEASE, attempt._2, result), attempts, tmp);
                      if (interrupt === tmp || bracketCount > 0) {
                        status = CONTINUE;
                        step4 = attempt._3(result);
                      }
                    }
                    break;
                  case RELEASE:
                    attempts = new Aff2(CONS, new Aff2(FINALIZED, step4, fail3), attempts, interrupt);
                    status = CONTINUE;
                    if (interrupt && interrupt !== tmp && bracketCount === 0) {
                      step4 = attempt._1.killed(util.fromLeft(interrupt))(attempt._2);
                    } else if (fail3) {
                      step4 = attempt._1.failed(util.fromLeft(fail3))(attempt._2);
                    } else {
                      step4 = attempt._1.completed(util.fromRight(step4))(attempt._2);
                    }
                    fail3 = null;
                    bracketCount++;
                    break;
                  case FINALIZER:
                    bracketCount++;
                    attempts = new Aff2(CONS, new Aff2(FINALIZED, step4, fail3), attempts, interrupt);
                    status = CONTINUE;
                    step4 = attempt._1;
                    break;
                  case FINALIZED:
                    bracketCount--;
                    status = RETURN;
                    step4 = attempt._1;
                    fail3 = attempt._2;
                    break;
                }
              }
              break;
            case COMPLETED:
              for (var k in joins) {
                if (joins.hasOwnProperty(k)) {
                  rethrow = rethrow && joins[k].rethrow;
                  runEff(joins[k].handler(step4));
                }
              }
              joins = null;
              if (interrupt && fail3) {
                setTimeout(function() {
                  throw util.fromLeft(fail3);
                }, 0);
              } else if (util.isLeft(step4) && rethrow) {
                setTimeout(function() {
                  if (rethrow) {
                    throw util.fromLeft(step4);
                  }
                }, 0);
              }
              return;
            case SUSPENDED:
              status = CONTINUE;
              break;
            case PENDING:
              return;
          }
        }
      }
      function onComplete(join5) {
        return function() {
          if (status === COMPLETED) {
            rethrow = rethrow && join5.rethrow;
            join5.handler(step4)();
            return function() {
            };
          }
          var jid = joinId++;
          joins = joins || {};
          joins[jid] = join5;
          return function() {
            if (joins !== null) {
              delete joins[jid];
            }
          };
        };
      }
      function kill2(error4, cb) {
        return function() {
          if (status === COMPLETED) {
            cb(util.right(void 0))();
            return function() {
            };
          }
          var canceler = onComplete({
            rethrow: false,
            handler: function() {
              return cb(util.right(void 0));
            }
          })();
          switch (status) {
            case SUSPENDED:
              interrupt = util.left(error4);
              status = COMPLETED;
              step4 = interrupt;
              run5(runTick);
              break;
            case PENDING:
              if (interrupt === null) {
                interrupt = util.left(error4);
              }
              if (bracketCount === 0) {
                if (status === PENDING) {
                  attempts = new Aff2(CONS, new Aff2(FINALIZER, step4(error4)), attempts, interrupt);
                }
                status = RETURN;
                step4 = null;
                fail3 = null;
                run5(++runTick);
              }
              break;
            default:
              if (interrupt === null) {
                interrupt = util.left(error4);
              }
              if (bracketCount === 0) {
                status = RETURN;
                step4 = null;
                fail3 = null;
              }
          }
          return canceler;
        };
      }
      function join4(cb) {
        return function() {
          var canceler = onComplete({
            rethrow: false,
            handler: cb
          })();
          if (status === SUSPENDED) {
            run5(runTick);
          }
          return canceler;
        };
      }
      return {
        kill: kill2,
        join: join4,
        onComplete,
        isSuspended: function() {
          return status === SUSPENDED;
        },
        run: function() {
          if (status === SUSPENDED) {
            if (!Scheduler.isDraining()) {
              Scheduler.enqueue(function() {
                run5(runTick);
              });
            } else {
              run5(runTick);
            }
          }
        }
      };
    }
    function runPar(util, supervisor, par, cb) {
      var fiberId = 0;
      var fibers = {};
      var killId = 0;
      var kills = {};
      var early = new Error("[ParAff] Early exit");
      var interrupt = null;
      var root2 = EMPTY;
      function kill2(error4, par2, cb2) {
        var step4 = par2;
        var head6 = null;
        var tail3 = null;
        var count = 0;
        var kills2 = {};
        var tmp, kid;
        loop:
          while (true) {
            tmp = null;
            switch (step4.tag) {
              case FORKED:
                if (step4._3 === EMPTY) {
                  tmp = fibers[step4._1];
                  kills2[count++] = tmp.kill(error4, function(result) {
                    return function() {
                      count--;
                      if (count === 0) {
                        cb2(result)();
                      }
                    };
                  });
                }
                if (head6 === null) {
                  break loop;
                }
                step4 = head6._2;
                if (tail3 === null) {
                  head6 = null;
                } else {
                  head6 = tail3._1;
                  tail3 = tail3._2;
                }
                break;
              case MAP:
                step4 = step4._2;
                break;
              case APPLY:
              case ALT:
                if (head6) {
                  tail3 = new Aff2(CONS, head6, tail3);
                }
                head6 = step4;
                step4 = step4._1;
                break;
            }
          }
        if (count === 0) {
          cb2(util.right(void 0))();
        } else {
          kid = 0;
          tmp = count;
          for (; kid < tmp; kid++) {
            kills2[kid] = kills2[kid]();
          }
        }
        return kills2;
      }
      function join4(result, head6, tail3) {
        var fail3, step4, lhs, rhs, tmp, kid;
        if (util.isLeft(result)) {
          fail3 = result;
          step4 = null;
        } else {
          step4 = result;
          fail3 = null;
        }
        loop:
          while (true) {
            lhs = null;
            rhs = null;
            tmp = null;
            kid = null;
            if (interrupt !== null) {
              return;
            }
            if (head6 === null) {
              cb(fail3 || step4)();
              return;
            }
            if (head6._3 !== EMPTY) {
              return;
            }
            switch (head6.tag) {
              case MAP:
                if (fail3 === null) {
                  head6._3 = util.right(head6._1(util.fromRight(step4)));
                  step4 = head6._3;
                } else {
                  head6._3 = fail3;
                }
                break;
              case APPLY:
                lhs = head6._1._3;
                rhs = head6._2._3;
                if (fail3) {
                  head6._3 = fail3;
                  tmp = true;
                  kid = killId++;
                  kills[kid] = kill2(early, fail3 === lhs ? head6._2 : head6._1, function() {
                    return function() {
                      delete kills[kid];
                      if (tmp) {
                        tmp = false;
                      } else if (tail3 === null) {
                        join4(fail3, null, null);
                      } else {
                        join4(fail3, tail3._1, tail3._2);
                      }
                    };
                  });
                  if (tmp) {
                    tmp = false;
                    return;
                  }
                } else if (lhs === EMPTY || rhs === EMPTY) {
                  return;
                } else {
                  step4 = util.right(util.fromRight(lhs)(util.fromRight(rhs)));
                  head6._3 = step4;
                }
                break;
              case ALT:
                lhs = head6._1._3;
                rhs = head6._2._3;
                if (lhs === EMPTY && util.isLeft(rhs) || rhs === EMPTY && util.isLeft(lhs)) {
                  return;
                }
                if (lhs !== EMPTY && util.isLeft(lhs) && rhs !== EMPTY && util.isLeft(rhs)) {
                  fail3 = step4 === lhs ? rhs : lhs;
                  step4 = null;
                  head6._3 = fail3;
                } else {
                  head6._3 = step4;
                  tmp = true;
                  kid = killId++;
                  kills[kid] = kill2(early, step4 === lhs ? head6._2 : head6._1, function() {
                    return function() {
                      delete kills[kid];
                      if (tmp) {
                        tmp = false;
                      } else if (tail3 === null) {
                        join4(step4, null, null);
                      } else {
                        join4(step4, tail3._1, tail3._2);
                      }
                    };
                  });
                  if (tmp) {
                    tmp = false;
                    return;
                  }
                }
                break;
            }
            if (tail3 === null) {
              head6 = null;
            } else {
              head6 = tail3._1;
              tail3 = tail3._2;
            }
          }
      }
      function resolve(fiber) {
        return function(result) {
          return function() {
            delete fibers[fiber._1];
            fiber._3 = result;
            join4(result, fiber._2._1, fiber._2._2);
          };
        };
      }
      function run5() {
        var status = CONTINUE;
        var step4 = par;
        var head6 = null;
        var tail3 = null;
        var tmp, fid;
        loop:
          while (true) {
            tmp = null;
            fid = null;
            switch (status) {
              case CONTINUE:
                switch (step4.tag) {
                  case MAP:
                    if (head6) {
                      tail3 = new Aff2(CONS, head6, tail3);
                    }
                    head6 = new Aff2(MAP, step4._1, EMPTY, EMPTY);
                    step4 = step4._2;
                    break;
                  case APPLY:
                    if (head6) {
                      tail3 = new Aff2(CONS, head6, tail3);
                    }
                    head6 = new Aff2(APPLY, EMPTY, step4._2, EMPTY);
                    step4 = step4._1;
                    break;
                  case ALT:
                    if (head6) {
                      tail3 = new Aff2(CONS, head6, tail3);
                    }
                    head6 = new Aff2(ALT, EMPTY, step4._2, EMPTY);
                    step4 = step4._1;
                    break;
                  default:
                    fid = fiberId++;
                    status = RETURN;
                    tmp = step4;
                    step4 = new Aff2(FORKED, fid, new Aff2(CONS, head6, tail3), EMPTY);
                    tmp = Fiber(util, supervisor, tmp);
                    tmp.onComplete({
                      rethrow: false,
                      handler: resolve(step4)
                    })();
                    fibers[fid] = tmp;
                    if (supervisor) {
                      supervisor.register(tmp);
                    }
                }
                break;
              case RETURN:
                if (head6 === null) {
                  break loop;
                }
                if (head6._1 === EMPTY) {
                  head6._1 = step4;
                  status = CONTINUE;
                  step4 = head6._2;
                  head6._2 = EMPTY;
                } else {
                  head6._2 = step4;
                  step4 = head6;
                  if (tail3 === null) {
                    head6 = null;
                  } else {
                    head6 = tail3._1;
                    tail3 = tail3._2;
                  }
                }
            }
          }
        root2 = step4;
        for (fid = 0; fid < fiberId; fid++) {
          fibers[fid].run();
        }
      }
      function cancel(error4, cb2) {
        interrupt = util.left(error4);
        var innerKills;
        for (var kid in kills) {
          if (kills.hasOwnProperty(kid)) {
            innerKills = kills[kid];
            for (kid in innerKills) {
              if (innerKills.hasOwnProperty(kid)) {
                innerKills[kid]();
              }
            }
          }
        }
        kills = null;
        var newKills = kill2(error4, root2, cb2);
        return function(killError) {
          return new Aff2(ASYNC, function(killCb) {
            return function() {
              for (var kid2 in newKills) {
                if (newKills.hasOwnProperty(kid2)) {
                  newKills[kid2]();
                }
              }
              return nonCanceler2;
            };
          });
        };
      }
      run5();
      return function(killError) {
        return new Aff2(ASYNC, function(killCb) {
          return function() {
            return cancel(killError, killCb);
          };
        });
      };
    }
    function sequential3(util, supervisor, par) {
      return new Aff2(ASYNC, function(cb) {
        return function() {
          return runPar(util, supervisor, par, cb);
        };
      });
    }
    Aff2.EMPTY = EMPTY;
    Aff2.Pure = AffCtr(PURE);
    Aff2.Throw = AffCtr(THROW);
    Aff2.Catch = AffCtr(CATCH);
    Aff2.Sync = AffCtr(SYNC);
    Aff2.Async = AffCtr(ASYNC);
    Aff2.Bind = AffCtr(BIND);
    Aff2.Bracket = AffCtr(BRACKET);
    Aff2.Fork = AffCtr(FORK);
    Aff2.Seq = AffCtr(SEQ);
    Aff2.ParMap = AffCtr(MAP);
    Aff2.ParApply = AffCtr(APPLY);
    Aff2.ParAlt = AffCtr(ALT);
    Aff2.Fiber = Fiber;
    Aff2.Supervisor = Supervisor;
    Aff2.Scheduler = Scheduler;
    Aff2.nonCanceler = nonCanceler2;
    return Aff2;
  }();
  var _pure = Aff.Pure;
  var _throwError = Aff.Throw;
  function _catchError(aff) {
    return function(k) {
      return Aff.Catch(aff, k);
    };
  }
  function _map(f) {
    return function(aff) {
      if (aff.tag === Aff.Pure.tag) {
        return Aff.Pure(f(aff._1));
      } else {
        return Aff.Bind(aff, function(value19) {
          return Aff.Pure(f(value19));
        });
      }
    };
  }
  function _bind(aff) {
    return function(k) {
      return Aff.Bind(aff, k);
    };
  }
  function _fork(immediate) {
    return function(aff) {
      return Aff.Fork(immediate, aff);
    };
  }
  var _liftEffect = Aff.Sync;
  function _parAffMap(f) {
    return function(aff) {
      return Aff.ParMap(f, aff);
    };
  }
  function _parAffApply(aff1) {
    return function(aff2) {
      return Aff.ParApply(aff1, aff2);
    };
  }
  var makeAff = Aff.Async;
  function generalBracket(acquire) {
    return function(options2) {
      return function(k) {
        return Aff.Bracket(acquire, options2, k);
      };
    };
  }
  function _makeFiber(util, aff) {
    return function() {
      return Aff.Fiber(util, null, aff);
    };
  }
  var _delay = function() {
    function setDelay(n, k) {
      if (n === 0 && typeof setImmediate !== "undefined") {
        return setImmediate(k);
      } else {
        return setTimeout(k, n);
      }
    }
    function clearDelay(n, t) {
      if (n === 0 && typeof clearImmediate !== "undefined") {
        return clearImmediate(t);
      } else {
        return clearTimeout(t);
      }
    }
    return function(right, ms) {
      return Aff.Async(function(cb) {
        return function() {
          var timer = setDelay(ms, cb(right()));
          return function() {
            return Aff.Sync(function() {
              return right(clearDelay(ms, timer));
            });
          };
        };
      });
    };
  }();
  var _sequential = Aff.Seq;

  // output/Control.Monad.ST.Internal/foreign.js
  var map_ = function(f) {
    return function(a2) {
      return function() {
        return f(a2());
      };
    };
  };
  var foreach = function(as2) {
    return function(f) {
      return function() {
        for (var i2 = 0, l = as2.length; i2 < l; i2++) {
          f(as2[i2])();
        }
      };
    };
  };

  // output/Control.Monad.ST.Internal/index.js
  var functorST = {
    map: map_
  };

  // output/Data.Profunctor/index.js
  var profunctorFn = {
    dimap: function(a2b) {
      return function(c2d) {
        return function(b2c) {
          return function($18) {
            return c2d(b2c(a2b($18)));
          };
        };
      };
    }
  };
  var dimap = function(dict) {
    return dict.dimap;
  };

  // output/Control.Parallel.Class/index.js
  var sequential = function(dict) {
    return dict.sequential;
  };
  var parallel = function(dict) {
    return dict.parallel;
  };

  // output/Control.Parallel/index.js
  var identity8 = /* @__PURE__ */ identity(categoryFn);
  var parTraverse_ = function(dictParallel) {
    var sequential3 = sequential(dictParallel);
    var traverse_7 = traverse_(dictParallel.Applicative1());
    var parallel3 = parallel(dictParallel);
    return function(dictFoldable) {
      var traverse_14 = traverse_7(dictFoldable);
      return function(f) {
        var $48 = traverse_14(function($50) {
          return parallel3(f($50));
        });
        return function($49) {
          return sequential3($48($49));
        };
      };
    };
  };
  var parSequence_ = function(dictParallel) {
    var parTraverse_1 = parTraverse_(dictParallel);
    return function(dictFoldable) {
      return parTraverse_1(dictFoldable)(identity8);
    };
  };

  // output/Effect.Unsafe/foreign.js
  var unsafePerformEffect = function(f) {
    return f();
  };

  // output/Effect.Aff/index.js
  var $runtime_lazy3 = function(name16, moduleName, init4) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name16 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init4();
      state3 = 2;
      return val;
    };
  };
  var pure3 = /* @__PURE__ */ pure(applicativeEffect);
  var $$void3 = /* @__PURE__ */ $$void(functorEffect);
  var map7 = /* @__PURE__ */ map(functorEffect);
  var Canceler = function(x) {
    return x;
  };
  var suspendAff = /* @__PURE__ */ _fork(false);
  var functorParAff = {
    map: _parAffMap
  };
  var functorAff = {
    map: _map
  };
  var map1 = /* @__PURE__ */ map(functorAff);
  var forkAff = /* @__PURE__ */ _fork(true);
  var ffiUtil = /* @__PURE__ */ function() {
    var unsafeFromRight = function(v) {
      if (v instanceof Right) {
        return v.value0;
      }
      ;
      if (v instanceof Left) {
        return unsafeCrashWith("unsafeFromRight: Left");
      }
      ;
      throw new Error("Failed pattern match at Effect.Aff (line 412, column 21 - line 414, column 54): " + [v.constructor.name]);
    };
    var unsafeFromLeft = function(v) {
      if (v instanceof Left) {
        return v.value0;
      }
      ;
      if (v instanceof Right) {
        return unsafeCrashWith("unsafeFromLeft: Right");
      }
      ;
      throw new Error("Failed pattern match at Effect.Aff (line 407, column 20 - line 409, column 55): " + [v.constructor.name]);
    };
    var isLeft = function(v) {
      if (v instanceof Left) {
        return true;
      }
      ;
      if (v instanceof Right) {
        return false;
      }
      ;
      throw new Error("Failed pattern match at Effect.Aff (line 402, column 12 - line 404, column 21): " + [v.constructor.name]);
    };
    return {
      isLeft,
      fromLeft: unsafeFromLeft,
      fromRight: unsafeFromRight,
      left: Left.create,
      right: Right.create
    };
  }();
  var makeFiber = function(aff) {
    return _makeFiber(ffiUtil, aff);
  };
  var launchAff = function(aff) {
    return function __do3() {
      var fiber = makeFiber(aff)();
      fiber.run();
      return fiber;
    };
  };
  var launchAff_ = function($74) {
    return $$void3(launchAff($74));
  };
  var bracket = function(acquire) {
    return function(completed) {
      return generalBracket(acquire)({
        killed: $$const(completed),
        failed: $$const(completed),
        completed: $$const(completed)
      });
    };
  };
  var applyParAff = {
    apply: _parAffApply,
    Functor0: function() {
      return functorParAff;
    }
  };
  var monadAff = {
    Applicative0: function() {
      return applicativeAff;
    },
    Bind1: function() {
      return bindAff;
    }
  };
  var bindAff = {
    bind: _bind,
    Apply0: function() {
      return $lazy_applyAff(0);
    }
  };
  var applicativeAff = {
    pure: _pure,
    Apply0: function() {
      return $lazy_applyAff(0);
    }
  };
  var $lazy_applyAff = /* @__PURE__ */ $runtime_lazy3("applyAff", "Effect.Aff", function() {
    return {
      apply: ap(monadAff),
      Functor0: function() {
        return functorAff;
      }
    };
  });
  var pure22 = /* @__PURE__ */ pure(applicativeAff);
  var bind1 = /* @__PURE__ */ bind(bindAff);
  var bindFlipped3 = /* @__PURE__ */ bindFlipped(bindAff);
  var $$finally = function(fin) {
    return function(a2) {
      return bracket(pure22(unit))($$const(fin))($$const(a2));
    };
  };
  var monadEffectAff = {
    liftEffect: _liftEffect,
    Monad0: function() {
      return monadAff;
    }
  };
  var liftEffect2 = /* @__PURE__ */ liftEffect(monadEffectAff);
  var effectCanceler = function($75) {
    return Canceler($$const(liftEffect2($75)));
  };
  var joinFiber = function(v) {
    return makeAff(function(k) {
      return map7(effectCanceler)(v.join(k));
    });
  };
  var functorFiber = {
    map: function(f) {
      return function(t) {
        return unsafePerformEffect(makeFiber(map1(f)(joinFiber(t))));
      };
    }
  };
  var killFiber = function(e) {
    return function(v) {
      return bind1(liftEffect2(v.isSuspended))(function(suspended) {
        if (suspended) {
          return liftEffect2($$void3(v.kill(e, $$const(pure3(unit)))));
        }
        ;
        return makeAff(function(k) {
          return map7(effectCanceler)(v.kill(e, k));
        });
      });
    };
  };
  var monadThrowAff = {
    throwError: _throwError,
    Monad0: function() {
      return monadAff;
    }
  };
  var monadErrorAff = {
    catchError: _catchError,
    MonadThrow0: function() {
      return monadThrowAff;
    }
  };
  var $$try2 = /* @__PURE__ */ $$try(monadErrorAff);
  var runAff = function(k) {
    return function(aff) {
      return launchAff(bindFlipped3(function($80) {
        return liftEffect2(k($80));
      })($$try2(aff)));
    };
  };
  var runAff_ = function(k) {
    return function(aff) {
      return $$void3(runAff(k)(aff));
    };
  };
  var parallelAff = {
    parallel: unsafeCoerce2,
    sequential: _sequential,
    Monad0: function() {
      return monadAff;
    },
    Applicative1: function() {
      return $lazy_applicativeParAff(0);
    }
  };
  var $lazy_applicativeParAff = /* @__PURE__ */ $runtime_lazy3("applicativeParAff", "Effect.Aff", function() {
    return {
      pure: function() {
        var $82 = parallel(parallelAff);
        return function($83) {
          return $82(pure22($83));
        };
      }(),
      Apply0: function() {
        return applyParAff;
      }
    };
  });
  var applicativeParAff = /* @__PURE__ */ $lazy_applicativeParAff(136);
  var monadRecAff = {
    tailRecM: function(k) {
      var go2 = function(a2) {
        return bind1(k(a2))(function(res) {
          if (res instanceof Done) {
            return pure22(res.value0);
          }
          ;
          if (res instanceof Loop) {
            return go2(res.value0);
          }
          ;
          throw new Error("Failed pattern match at Effect.Aff (line 104, column 7 - line 106, column 23): " + [res.constructor.name]);
        });
      };
      return go2;
    },
    Monad0: function() {
      return monadAff;
    }
  };
  var nonCanceler = /* @__PURE__ */ $$const(/* @__PURE__ */ pure22(unit));

  // output/Effect.Aff.Class/index.js
  var lift4 = /* @__PURE__ */ lift(monadTransReaderT);
  var monadAffAff = {
    liftAff: /* @__PURE__ */ identity(categoryFn),
    MonadEffect0: function() {
      return monadEffectAff;
    }
  };
  var liftAff = function(dict) {
    return dict.liftAff;
  };
  var monadAffReader = function(dictMonadAff) {
    var MonadEffect0 = dictMonadAff.MonadEffect0();
    var monadEffectReader2 = monadEffectReader(MonadEffect0);
    return {
      liftAff: function() {
        var $79 = lift4(MonadEffect0.Monad0());
        var $80 = liftAff(dictMonadAff);
        return function($81) {
          return $79($80($81));
        };
      }(),
      MonadEffect0: function() {
        return monadEffectReader2;
      }
    };
  };

  // output/Halogen.Data.OrdBox/index.js
  var OrdBox = /* @__PURE__ */ function() {
    function OrdBox2(value0, value19, value24) {
      this.value0 = value0;
      this.value1 = value19;
      this.value2 = value24;
    }
    ;
    OrdBox2.create = function(value0) {
      return function(value19) {
        return function(value24) {
          return new OrdBox2(value0, value19, value24);
        };
      };
    };
    return OrdBox2;
  }();
  var mkOrdBox = function(dictOrd) {
    return OrdBox.create(eq(dictOrd.Eq0()))(compare(dictOrd));
  };
  var eqOrdBox = {
    eq: function(v) {
      return function(v1) {
        return v.value0(v.value2)(v1.value2);
      };
    }
  };
  var ordOrdBox = {
    compare: function(v) {
      return function(v1) {
        return v.value1(v.value2)(v1.value2);
      };
    },
    Eq0: function() {
      return eqOrdBox;
    }
  };

  // output/Halogen.Data.Slot/index.js
  var ordTuple2 = /* @__PURE__ */ ordTuple(ordString)(ordOrdBox);
  var pop1 = /* @__PURE__ */ pop(ordTuple2);
  var lookup1 = /* @__PURE__ */ lookup2(ordTuple2);
  var insert1 = /* @__PURE__ */ insert(ordTuple2);
  var pop2 = function() {
    return function(dictIsSymbol) {
      var reflectSymbol2 = reflectSymbol(dictIsSymbol);
      return function(dictOrd) {
        var mkOrdBox2 = mkOrdBox(dictOrd);
        return function(sym) {
          return function(key7) {
            return function(v) {
              return pop1(new Tuple(reflectSymbol2(sym), mkOrdBox2(key7)))(v);
            };
          };
        };
      };
    };
  };
  var lookup3 = function() {
    return function(dictIsSymbol) {
      var reflectSymbol2 = reflectSymbol(dictIsSymbol);
      return function(dictOrd) {
        var mkOrdBox2 = mkOrdBox(dictOrd);
        return function(sym) {
          return function(key7) {
            return function(v) {
              return lookup1(new Tuple(reflectSymbol2(sym), mkOrdBox2(key7)))(v);
            };
          };
        };
      };
    };
  };
  var insert2 = function() {
    return function(dictIsSymbol) {
      var reflectSymbol2 = reflectSymbol(dictIsSymbol);
      return function(dictOrd) {
        var mkOrdBox2 = mkOrdBox(dictOrd);
        return function(sym) {
          return function(key7) {
            return function(val) {
              return function(v) {
                return insert1(new Tuple(reflectSymbol2(sym), mkOrdBox2(key7)))(val)(v);
              };
            };
          };
        };
      };
    };
  };
  var foreachSlot = function(dictApplicative) {
    var traverse_7 = traverse_(dictApplicative)(foldableMap);
    return function(v) {
      return function(k) {
        return traverse_7(function($54) {
          return k($54);
        })(v);
      };
    };
  };
  var empty5 = empty4;

  // output/Halogen.Query.ChildQuery/index.js
  var ChildQuery = /* @__PURE__ */ function() {
    function ChildQuery3(value0, value19, value24) {
      this.value0 = value0;
      this.value1 = value19;
      this.value2 = value24;
    }
    ;
    ChildQuery3.create = function(value0) {
      return function(value19) {
        return function(value24) {
          return new ChildQuery3(value0, value19, value24);
        };
      };
    };
    return ChildQuery3;
  }();
  var unChildQueryBox = unsafeCoerce2;
  var mkChildQueryBox = unsafeCoerce2;

  // output/Data.Array/foreign.js
  var replicateFill = function(count) {
    return function(value19) {
      if (count < 1) {
        return [];
      }
      var result = new Array(count);
      return result.fill(value19);
    };
  };
  var replicatePolyfill = function(count) {
    return function(value19) {
      var result = [];
      var n = 0;
      for (var i2 = 0; i2 < count; i2++) {
        result[n++] = value19;
      }
      return result;
    };
  };
  var replicate = typeof Array.prototype.fill === "function" ? replicateFill : replicatePolyfill;
  var fromFoldableImpl = function() {
    function Cons3(head6, tail3) {
      this.head = head6;
      this.tail = tail3;
    }
    var emptyList = {};
    function curryCons(head6) {
      return function(tail3) {
        return new Cons3(head6, tail3);
      };
    }
    function listToArray(list) {
      var result = [];
      var count = 0;
      var xs = list;
      while (xs !== emptyList) {
        result[count++] = xs.head;
        xs = xs.tail;
      }
      return result;
    }
    return function(foldr4) {
      return function(xs) {
        return listToArray(foldr4(curryCons)(emptyList)(xs));
      };
    };
  }();
  var length3 = function(xs) {
    return xs.length;
  };
  var unconsImpl = function(empty7) {
    return function(next) {
      return function(xs) {
        return xs.length === 0 ? empty7({}) : next(xs[0])(xs.slice(1));
      };
    };
  };
  var indexImpl = function(just) {
    return function(nothing) {
      return function(xs) {
        return function(i2) {
          return i2 < 0 || i2 >= xs.length ? nothing : just(xs[i2]);
        };
      };
    };
  };
  var findIndexImpl = function(just) {
    return function(nothing) {
      return function(f) {
        return function(xs) {
          for (var i2 = 0, l = xs.length; i2 < l; i2++) {
            if (f(xs[i2]))
              return just(i2);
          }
          return nothing;
        };
      };
    };
  };
  var _deleteAt = function(just) {
    return function(nothing) {
      return function(i2) {
        return function(l) {
          if (i2 < 0 || i2 >= l.length)
            return nothing;
          var l1 = l.slice();
          l1.splice(i2, 1);
          return just(l1);
        };
      };
    };
  };
  var sortByImpl = function() {
    function mergeFromTo(compare2, fromOrdering, xs1, xs2, from3, to2) {
      var mid;
      var i2;
      var j;
      var k;
      var x;
      var y;
      var c;
      mid = from3 + (to2 - from3 >> 1);
      if (mid - from3 > 1)
        mergeFromTo(compare2, fromOrdering, xs2, xs1, from3, mid);
      if (to2 - mid > 1)
        mergeFromTo(compare2, fromOrdering, xs2, xs1, mid, to2);
      i2 = from3;
      j = mid;
      k = from3;
      while (i2 < mid && j < to2) {
        x = xs2[i2];
        y = xs2[j];
        c = fromOrdering(compare2(x)(y));
        if (c > 0) {
          xs1[k++] = y;
          ++j;
        } else {
          xs1[k++] = x;
          ++i2;
        }
      }
      while (i2 < mid) {
        xs1[k++] = xs2[i2++];
      }
      while (j < to2) {
        xs1[k++] = xs2[j++];
      }
    }
    return function(compare2) {
      return function(fromOrdering) {
        return function(xs) {
          var out;
          if (xs.length < 2)
            return xs;
          out = xs.slice(0);
          mergeFromTo(compare2, fromOrdering, out, xs.slice(0), 0, xs.length);
          return out;
        };
      };
    };
  }();
  var slice = function(s) {
    return function(e) {
      return function(l) {
        return l.slice(s, e);
      };
    };
  };

  // output/Data.Array.ST/foreign.js
  var pushAll = function(as2) {
    return function(xs) {
      return function() {
        return xs.push.apply(xs, as2);
      };
    };
  };
  var unsafeFreeze = function(xs) {
    return function() {
      return xs;
    };
  };
  function copyImpl(xs) {
    return function() {
      return xs.slice();
    };
  }
  var thaw = copyImpl;
  var sortByImpl2 = function() {
    function mergeFromTo(compare2, fromOrdering, xs1, xs2, from3, to2) {
      var mid;
      var i2;
      var j;
      var k;
      var x;
      var y;
      var c;
      mid = from3 + (to2 - from3 >> 1);
      if (mid - from3 > 1)
        mergeFromTo(compare2, fromOrdering, xs2, xs1, from3, mid);
      if (to2 - mid > 1)
        mergeFromTo(compare2, fromOrdering, xs2, xs1, mid, to2);
      i2 = from3;
      j = mid;
      k = from3;
      while (i2 < mid && j < to2) {
        x = xs2[i2];
        y = xs2[j];
        c = fromOrdering(compare2(x)(y));
        if (c > 0) {
          xs1[k++] = y;
          ++j;
        } else {
          xs1[k++] = x;
          ++i2;
        }
      }
      while (i2 < mid) {
        xs1[k++] = xs2[i2++];
      }
      while (j < to2) {
        xs1[k++] = xs2[j++];
      }
    }
    return function(compare2) {
      return function(fromOrdering) {
        return function(xs) {
          return function() {
            if (xs.length < 2)
              return xs;
            mergeFromTo(compare2, fromOrdering, xs, xs.slice(0), 0, xs.length);
            return xs;
          };
        };
      };
    };
  }();

  // output/Data.Array.ST/index.js
  var withArray = function(f) {
    return function(xs) {
      return function __do3() {
        var result = thaw(xs)();
        f(result)();
        return unsafeFreeze(result)();
      };
    };
  };
  var push = function(a2) {
    return pushAll([a2]);
  };

  // output/Data.Array/index.js
  var fromJust2 = /* @__PURE__ */ fromJust();
  var append5 = /* @__PURE__ */ append(semigroupArray);
  var uncons4 = /* @__PURE__ */ function() {
    return unconsImpl($$const(Nothing.value))(function(x) {
      return function(xs) {
        return new Just({
          head: x,
          tail: xs
        });
      };
    });
  }();
  var tail = /* @__PURE__ */ function() {
    return unconsImpl($$const(Nothing.value))(function(v) {
      return function(xs) {
        return new Just(xs);
      };
    });
  }();
  var snoc4 = function(xs) {
    return function(x) {
      return withArray(push(x))(xs)();
    };
  };
  var singleton5 = function(a2) {
    return [a2];
  };
  var $$null3 = function(xs) {
    return length3(xs) === 0;
  };
  var init2 = function(xs) {
    if ($$null3(xs)) {
      return Nothing.value;
    }
    ;
    if (otherwise) {
      return new Just(slice(0)(length3(xs) - 1 | 0)(xs));
    }
    ;
    throw new Error("Failed pattern match at Data.Array (line 339, column 1 - line 339, column 45): " + [xs.constructor.name]);
  };
  var index2 = /* @__PURE__ */ function() {
    return indexImpl(Just.create)(Nothing.value);
  }();
  var last2 = function(xs) {
    return index2(xs)(length3(xs) - 1 | 0);
  };
  var head3 = function(xs) {
    return index2(xs)(0);
  };
  var fromFoldable2 = function(dictFoldable) {
    return fromFoldableImpl(foldr(dictFoldable));
  };
  var findIndex2 = /* @__PURE__ */ function() {
    return findIndexImpl(Just.create)(Nothing.value);
  }();
  var drop2 = function(n) {
    return function(xs) {
      var $172 = n < 1;
      if ($172) {
        return xs;
      }
      ;
      return slice(n)(length3(xs))(xs);
    };
  };
  var deleteAt = /* @__PURE__ */ function() {
    return _deleteAt(Just.create)(Nothing.value);
  }();
  var deleteBy = function(v) {
    return function(v1) {
      return function(v2) {
        if (v2.length === 0) {
          return [];
        }
        ;
        return maybe(v2)(function(i2) {
          return fromJust2(deleteAt(i2)(v2));
        })(findIndex2(v(v1))(v2));
      };
    };
  };
  var cons3 = function(x) {
    return function(xs) {
      return append5([x])(xs);
    };
  };
  var concatMap = /* @__PURE__ */ flip(/* @__PURE__ */ bind(bindArray));
  var mapMaybe2 = function(f) {
    return concatMap(function() {
      var $190 = maybe([])(singleton5);
      return function($191) {
        return $190(f($191));
      };
    }());
  };

  // output/Unsafe.Reference/foreign.js
  function reallyUnsafeRefEq(a2) {
    return function(b2) {
      return a2 === b2;
    };
  }

  // output/Unsafe.Reference/index.js
  var unsafeRefEq = reallyUnsafeRefEq;

  // output/Halogen.Subscription/index.js
  var $$void4 = /* @__PURE__ */ $$void(functorEffect);
  var bind3 = /* @__PURE__ */ bind(bindEffect);
  var append6 = /* @__PURE__ */ append(semigroupArray);
  var traverse_2 = /* @__PURE__ */ traverse_(applicativeEffect);
  var traverse_1 = /* @__PURE__ */ traverse_2(foldableArray);
  var unsubscribe = function(v) {
    return v;
  };
  var subscribe = function(v) {
    return function(k) {
      return v(function($76) {
        return $$void4(k($76));
      });
    };
  };
  var notify = function(v) {
    return function(a2) {
      return v(a2);
    };
  };
  var create = function __do() {
    var subscribers = $$new([])();
    return {
      emitter: function(k) {
        return function __do3() {
          modify_(function(v) {
            return append6(v)([k]);
          })(subscribers)();
          return modify_(deleteBy(unsafeRefEq)(k))(subscribers);
        };
      },
      listener: function(a2) {
        return bind3(read(subscribers))(traverse_1(function(k) {
          return k(a2);
        }));
      }
    };
  };

  // output/Halogen.Query.HalogenM/index.js
  var identity9 = /* @__PURE__ */ identity(categoryFn);
  var lookup4 = /* @__PURE__ */ lookup3();
  var over2 = /* @__PURE__ */ over()();
  var SubscriptionId = function(x) {
    return x;
  };
  var ForkId = function(x) {
    return x;
  };
  var State = /* @__PURE__ */ function() {
    function State2(value0) {
      this.value0 = value0;
    }
    ;
    State2.create = function(value0) {
      return new State2(value0);
    };
    return State2;
  }();
  var Subscribe = /* @__PURE__ */ function() {
    function Subscribe2(value0, value19) {
      this.value0 = value0;
      this.value1 = value19;
    }
    ;
    Subscribe2.create = function(value0) {
      return function(value19) {
        return new Subscribe2(value0, value19);
      };
    };
    return Subscribe2;
  }();
  var Unsubscribe = /* @__PURE__ */ function() {
    function Unsubscribe2(value0, value19) {
      this.value0 = value0;
      this.value1 = value19;
    }
    ;
    Unsubscribe2.create = function(value0) {
      return function(value19) {
        return new Unsubscribe2(value0, value19);
      };
    };
    return Unsubscribe2;
  }();
  var Lift2 = /* @__PURE__ */ function() {
    function Lift3(value0) {
      this.value0 = value0;
    }
    ;
    Lift3.create = function(value0) {
      return new Lift3(value0);
    };
    return Lift3;
  }();
  var ChildQuery2 = /* @__PURE__ */ function() {
    function ChildQuery3(value0) {
      this.value0 = value0;
    }
    ;
    ChildQuery3.create = function(value0) {
      return new ChildQuery3(value0);
    };
    return ChildQuery3;
  }();
  var Raise = /* @__PURE__ */ function() {
    function Raise2(value0, value19) {
      this.value0 = value0;
      this.value1 = value19;
    }
    ;
    Raise2.create = function(value0) {
      return function(value19) {
        return new Raise2(value0, value19);
      };
    };
    return Raise2;
  }();
  var Par = /* @__PURE__ */ function() {
    function Par2(value0) {
      this.value0 = value0;
    }
    ;
    Par2.create = function(value0) {
      return new Par2(value0);
    };
    return Par2;
  }();
  var Fork = /* @__PURE__ */ function() {
    function Fork2(value0, value19) {
      this.value0 = value0;
      this.value1 = value19;
    }
    ;
    Fork2.create = function(value0) {
      return function(value19) {
        return new Fork2(value0, value19);
      };
    };
    return Fork2;
  }();
  var Join = /* @__PURE__ */ function() {
    function Join2(value0, value19) {
      this.value0 = value0;
      this.value1 = value19;
    }
    ;
    Join2.create = function(value0) {
      return function(value19) {
        return new Join2(value0, value19);
      };
    };
    return Join2;
  }();
  var Kill = /* @__PURE__ */ function() {
    function Kill2(value0, value19) {
      this.value0 = value0;
      this.value1 = value19;
    }
    ;
    Kill2.create = function(value0) {
      return function(value19) {
        return new Kill2(value0, value19);
      };
    };
    return Kill2;
  }();
  var GetRef = /* @__PURE__ */ function() {
    function GetRef2(value0, value19) {
      this.value0 = value0;
      this.value1 = value19;
    }
    ;
    GetRef2.create = function(value0) {
      return function(value19) {
        return new GetRef2(value0, value19);
      };
    };
    return GetRef2;
  }();
  var HalogenAp = function(x) {
    return x;
  };
  var HalogenM = function(x) {
    return x;
  };
  var raise = function(o) {
    return liftF(new Raise(o, unit));
  };
  var query = function() {
    return function(dictIsSymbol) {
      var lookup13 = lookup4(dictIsSymbol);
      return function(dictOrd) {
        var lookup23 = lookup13(dictOrd);
        return function(label5) {
          return function(p2) {
            return function(q2) {
              return liftF(new ChildQuery2(mkChildQueryBox(new ChildQuery(function(dictApplicative) {
                var pure18 = pure(dictApplicative);
                return function(k) {
                  var $177 = maybe(pure18(Nothing.value))(k);
                  var $178 = lookup23(label5)(p2);
                  return function($179) {
                    return $177($178($179));
                  };
                };
              }, q2, identity9))));
            };
          };
        };
      };
    };
  };
  var ordSubscriptionId = ordInt;
  var ordForkId = ordInt;
  var monadTransHalogenM = {
    lift: function(dictMonad) {
      return function($180) {
        return HalogenM(liftF(Lift2.create($180)));
      };
    }
  };
  var monadHalogenM = freeMonad;
  var monadStateHalogenM = {
    state: function($181) {
      return HalogenM(liftF(State.create($181)));
    },
    Monad0: function() {
      return monadHalogenM;
    }
  };
  var monadEffectHalogenM = function(dictMonadEffect) {
    return {
      liftEffect: function() {
        var $186 = liftEffect(dictMonadEffect);
        return function($187) {
          return HalogenM(liftF(Lift2.create($186($187))));
        };
      }(),
      Monad0: function() {
        return monadHalogenM;
      }
    };
  };
  var monadAskHalogenM = function(dictMonadAsk) {
    return {
      ask: liftF(new Lift2(ask(dictMonadAsk))),
      Monad0: function() {
        return monadHalogenM;
      }
    };
  };
  var monadAffHalogenM = function(dictMonadAff) {
    var monadEffectHalogenM1 = monadEffectHalogenM(dictMonadAff.MonadEffect0());
    return {
      liftAff: function() {
        var $188 = liftAff(dictMonadAff);
        return function($189) {
          return HalogenM(liftF(Lift2.create($188($189))));
        };
      }(),
      MonadEffect0: function() {
        return monadEffectHalogenM1;
      }
    };
  };
  var hoist = function(dictFunctor) {
    return function(nat) {
      return function(v) {
        var go2 = function(v1) {
          if (v1 instanceof State) {
            return new State(v1.value0);
          }
          ;
          if (v1 instanceof Subscribe) {
            return new Subscribe(v1.value0, v1.value1);
          }
          ;
          if (v1 instanceof Unsubscribe) {
            return new Unsubscribe(v1.value0, v1.value1);
          }
          ;
          if (v1 instanceof Lift2) {
            return new Lift2(nat(v1.value0));
          }
          ;
          if (v1 instanceof ChildQuery2) {
            return new ChildQuery2(v1.value0);
          }
          ;
          if (v1 instanceof Raise) {
            return new Raise(v1.value0, v1.value1);
          }
          ;
          if (v1 instanceof Par) {
            return new Par(over2(HalogenAp)(hoistFreeAp(hoist(dictFunctor)(nat)))(v1.value0));
          }
          ;
          if (v1 instanceof Fork) {
            return new Fork(hoist(dictFunctor)(nat)(v1.value0), v1.value1);
          }
          ;
          if (v1 instanceof Join) {
            return new Join(v1.value0, v1.value1);
          }
          ;
          if (v1 instanceof Kill) {
            return new Kill(v1.value0, v1.value1);
          }
          ;
          if (v1 instanceof GetRef) {
            return new GetRef(v1.value0, v1.value1);
          }
          ;
          throw new Error("Failed pattern match at Halogen.Query.HalogenM (line 312, column 8 - line 323, column 29): " + [v1.constructor.name]);
        };
        return hoistFree(go2)(v);
      };
    };
  };
  var functorHalogenM = freeFunctor;
  var bindHalogenM = freeBind;
  var applicativeHalogenM = freeApplicative;

  // output/Capability.Log/index.js
  var genericShowConstructor2 = /* @__PURE__ */ genericShowConstructor(genericShowArgsNoArguments);
  var lift5 = /* @__PURE__ */ lift(monadTransHalogenM);
  var Debug = /* @__PURE__ */ function() {
    function Debug2() {
    }
    ;
    Debug2.value = new Debug2();
    return Debug2;
  }();
  var Info = /* @__PURE__ */ function() {
    function Info2() {
    }
    ;
    Info2.value = new Info2();
    return Info2;
  }();
  var Warning = /* @__PURE__ */ function() {
    function Warning2() {
    }
    ;
    Warning2.value = new Warning2();
    return Warning2;
  }();
  var $$Error = /* @__PURE__ */ function() {
    function $$Error2() {
    }
    ;
    $$Error2.value = new $$Error2();
    return $$Error2;
  }();
  var genericLogLevel_ = {
    to: function(x) {
      if (x instanceof Inl) {
        return Debug.value;
      }
      ;
      if (x instanceof Inr && x.value0 instanceof Inl) {
        return Info.value;
      }
      ;
      if (x instanceof Inr && (x.value0 instanceof Inr && x.value0.value0 instanceof Inl)) {
        return Warning.value;
      }
      ;
      if (x instanceof Inr && (x.value0 instanceof Inr && x.value0.value0 instanceof Inr)) {
        return $$Error.value;
      }
      ;
      throw new Error("Failed pattern match at Capability.Log (line 12, column 1 - line 12, column 35): " + [x.constructor.name]);
    },
    from: function(x) {
      if (x instanceof Debug) {
        return new Inl(NoArguments.value);
      }
      ;
      if (x instanceof Info) {
        return new Inr(new Inl(NoArguments.value));
      }
      ;
      if (x instanceof Warning) {
        return new Inr(new Inr(new Inl(NoArguments.value)));
      }
      ;
      if (x instanceof $$Error) {
        return new Inr(new Inr(new Inr(NoArguments.value)));
      }
      ;
      throw new Error("Failed pattern match at Capability.Log (line 12, column 1 - line 12, column 35): " + [x.constructor.name]);
    }
  };
  var showLogLevel = {
    show: /* @__PURE__ */ genericShow(genericLogLevel_)(/* @__PURE__ */ genericShowSum(/* @__PURE__ */ genericShowConstructor2({
      reflectSymbol: function() {
        return "Debug";
      }
    }))(/* @__PURE__ */ genericShowSum(/* @__PURE__ */ genericShowConstructor2({
      reflectSymbol: function() {
        return "Info";
      }
    }))(/* @__PURE__ */ genericShowSum(/* @__PURE__ */ genericShowConstructor2({
      reflectSymbol: function() {
        return "Warning";
      }
    }))(/* @__PURE__ */ genericShowConstructor2({
      reflectSymbol: function() {
        return "Error";
      }
    })))))
  };
  var logEntry = function(dict) {
    return dict.logEntry;
  };
  var log = function(dict) {
    return dict.log;
  };
  var logHalogenM = function(dictLog) {
    var lift1 = lift5(dictLog.Monad0());
    var logEntry1 = logEntry(dictLog);
    return {
      logEntry: function(level) {
        var $41 = logEntry1(level);
        return function($42) {
          return lift1($41($42));
        };
      },
      log: function() {
        var $43 = log(dictLog);
        return function($44) {
          return lift1($43($44));
        };
      }(),
      Monad0: function() {
        return monadHalogenM;
      }
    };
  };

  // output/Capability.LogonRoute/index.js
  var lift6 = /* @__PURE__ */ lift(monadTransHalogenM);
  var PasswordPermanent = /* @__PURE__ */ function() {
    function PasswordPermanent2() {
    }
    ;
    PasswordPermanent2.value = new PasswordPermanent2();
    return PasswordPermanent2;
  }();
  var PasswordTemporary = /* @__PURE__ */ function() {
    function PasswordTemporary2() {
    }
    ;
    PasswordTemporary2.value = new PasswordTemporary2();
    return PasswordTemporary2;
  }();
  var logonRoute = function(dict) {
    return dict.logonRoute;
  };
  var logonRouteHalogenM = function(dictLogonRoute) {
    return {
      logonRoute: function() {
        var $8 = lift6(dictLogonRoute.Monad0());
        var $9 = logonRoute(dictLogonRoute);
        return function($10) {
          return $8($9($10));
        };
      }(),
      Monad0: function() {
        return monadHalogenM;
      }
    };
  };

  // output/Data.Date/foreign.js
  var createDate = function(y, m, d) {
    var date2 = new Date(Date.UTC(y, m, d));
    if (y >= 0 && y < 100) {
      date2.setUTCFullYear(y);
    }
    return date2;
  };
  function canonicalDateImpl(ctor, y, m, d) {
    var date2 = createDate(y, m - 1, d);
    return ctor(date2.getUTCFullYear())(date2.getUTCMonth() + 1)(date2.getUTCDate());
  }

  // output/Control.Alternative/index.js
  var alternativeArray = {
    Applicative0: function() {
      return applicativeArray;
    },
    Plus1: function() {
      return plusArray;
    }
  };

  // output/Data.Enum/index.js
  var toEnum = function(dict) {
    return dict.toEnum;
  };
  var fromEnum = function(dict) {
    return dict.fromEnum;
  };

  // output/Data.Date.Component/index.js
  var $runtime_lazy4 = function(name16, moduleName, init4) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name16 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init4();
      state3 = 2;
      return val;
    };
  };
  var show2 = /* @__PURE__ */ show(showInt);
  var January = /* @__PURE__ */ function() {
    function January2() {
    }
    ;
    January2.value = new January2();
    return January2;
  }();
  var February = /* @__PURE__ */ function() {
    function February2() {
    }
    ;
    February2.value = new February2();
    return February2;
  }();
  var March = /* @__PURE__ */ function() {
    function March2() {
    }
    ;
    March2.value = new March2();
    return March2;
  }();
  var April = /* @__PURE__ */ function() {
    function April2() {
    }
    ;
    April2.value = new April2();
    return April2;
  }();
  var May = /* @__PURE__ */ function() {
    function May2() {
    }
    ;
    May2.value = new May2();
    return May2;
  }();
  var June = /* @__PURE__ */ function() {
    function June2() {
    }
    ;
    June2.value = new June2();
    return June2;
  }();
  var July = /* @__PURE__ */ function() {
    function July2() {
    }
    ;
    July2.value = new July2();
    return July2;
  }();
  var August = /* @__PURE__ */ function() {
    function August2() {
    }
    ;
    August2.value = new August2();
    return August2;
  }();
  var September = /* @__PURE__ */ function() {
    function September2() {
    }
    ;
    September2.value = new September2();
    return September2;
  }();
  var October = /* @__PURE__ */ function() {
    function October2() {
    }
    ;
    October2.value = new October2();
    return October2;
  }();
  var November = /* @__PURE__ */ function() {
    function November2() {
    }
    ;
    November2.value = new November2();
    return November2;
  }();
  var December = /* @__PURE__ */ function() {
    function December2() {
    }
    ;
    December2.value = new December2();
    return December2;
  }();
  var showYear = {
    show: function(v) {
      return "(Year " + (show2(v) + ")");
    }
  };
  var showMonth = {
    show: function(v) {
      if (v instanceof January) {
        return "January";
      }
      ;
      if (v instanceof February) {
        return "February";
      }
      ;
      if (v instanceof March) {
        return "March";
      }
      ;
      if (v instanceof April) {
        return "April";
      }
      ;
      if (v instanceof May) {
        return "May";
      }
      ;
      if (v instanceof June) {
        return "June";
      }
      ;
      if (v instanceof July) {
        return "July";
      }
      ;
      if (v instanceof August) {
        return "August";
      }
      ;
      if (v instanceof September) {
        return "September";
      }
      ;
      if (v instanceof October) {
        return "October";
      }
      ;
      if (v instanceof November) {
        return "November";
      }
      ;
      if (v instanceof December) {
        return "December";
      }
      ;
      throw new Error("Failed pattern match at Data.Date.Component (line 101, column 1 - line 113, column 29): " + [v.constructor.name]);
    }
  };
  var showDay = {
    show: function(v) {
      return "(Day " + (show2(v) + ")");
    }
  };
  var eqMonth = {
    eq: function(x) {
      return function(y) {
        if (x instanceof January && y instanceof January) {
          return true;
        }
        ;
        if (x instanceof February && y instanceof February) {
          return true;
        }
        ;
        if (x instanceof March && y instanceof March) {
          return true;
        }
        ;
        if (x instanceof April && y instanceof April) {
          return true;
        }
        ;
        if (x instanceof May && y instanceof May) {
          return true;
        }
        ;
        if (x instanceof June && y instanceof June) {
          return true;
        }
        ;
        if (x instanceof July && y instanceof July) {
          return true;
        }
        ;
        if (x instanceof August && y instanceof August) {
          return true;
        }
        ;
        if (x instanceof September && y instanceof September) {
          return true;
        }
        ;
        if (x instanceof October && y instanceof October) {
          return true;
        }
        ;
        if (x instanceof November && y instanceof November) {
          return true;
        }
        ;
        if (x instanceof December && y instanceof December) {
          return true;
        }
        ;
        return false;
      };
    }
  };
  var ordMonth = {
    compare: function(x) {
      return function(y) {
        if (x instanceof January && y instanceof January) {
          return EQ.value;
        }
        ;
        if (x instanceof January) {
          return LT.value;
        }
        ;
        if (y instanceof January) {
          return GT.value;
        }
        ;
        if (x instanceof February && y instanceof February) {
          return EQ.value;
        }
        ;
        if (x instanceof February) {
          return LT.value;
        }
        ;
        if (y instanceof February) {
          return GT.value;
        }
        ;
        if (x instanceof March && y instanceof March) {
          return EQ.value;
        }
        ;
        if (x instanceof March) {
          return LT.value;
        }
        ;
        if (y instanceof March) {
          return GT.value;
        }
        ;
        if (x instanceof April && y instanceof April) {
          return EQ.value;
        }
        ;
        if (x instanceof April) {
          return LT.value;
        }
        ;
        if (y instanceof April) {
          return GT.value;
        }
        ;
        if (x instanceof May && y instanceof May) {
          return EQ.value;
        }
        ;
        if (x instanceof May) {
          return LT.value;
        }
        ;
        if (y instanceof May) {
          return GT.value;
        }
        ;
        if (x instanceof June && y instanceof June) {
          return EQ.value;
        }
        ;
        if (x instanceof June) {
          return LT.value;
        }
        ;
        if (y instanceof June) {
          return GT.value;
        }
        ;
        if (x instanceof July && y instanceof July) {
          return EQ.value;
        }
        ;
        if (x instanceof July) {
          return LT.value;
        }
        ;
        if (y instanceof July) {
          return GT.value;
        }
        ;
        if (x instanceof August && y instanceof August) {
          return EQ.value;
        }
        ;
        if (x instanceof August) {
          return LT.value;
        }
        ;
        if (y instanceof August) {
          return GT.value;
        }
        ;
        if (x instanceof September && y instanceof September) {
          return EQ.value;
        }
        ;
        if (x instanceof September) {
          return LT.value;
        }
        ;
        if (y instanceof September) {
          return GT.value;
        }
        ;
        if (x instanceof October && y instanceof October) {
          return EQ.value;
        }
        ;
        if (x instanceof October) {
          return LT.value;
        }
        ;
        if (y instanceof October) {
          return GT.value;
        }
        ;
        if (x instanceof November && y instanceof November) {
          return EQ.value;
        }
        ;
        if (x instanceof November) {
          return LT.value;
        }
        ;
        if (y instanceof November) {
          return GT.value;
        }
        ;
        if (x instanceof December && y instanceof December) {
          return EQ.value;
        }
        ;
        throw new Error("Failed pattern match at Data.Date.Component (line 0, column 0 - line 0, column 0): " + [x.constructor.name, y.constructor.name]);
      };
    },
    Eq0: function() {
      return eqMonth;
    }
  };
  var boundedMonth = /* @__PURE__ */ function() {
    return {
      bottom: January.value,
      top: December.value,
      Ord0: function() {
        return ordMonth;
      }
    };
  }();
  var boundedEnumMonth = {
    cardinality: 12,
    toEnum: function(v) {
      if (v === 1) {
        return new Just(January.value);
      }
      ;
      if (v === 2) {
        return new Just(February.value);
      }
      ;
      if (v === 3) {
        return new Just(March.value);
      }
      ;
      if (v === 4) {
        return new Just(April.value);
      }
      ;
      if (v === 5) {
        return new Just(May.value);
      }
      ;
      if (v === 6) {
        return new Just(June.value);
      }
      ;
      if (v === 7) {
        return new Just(July.value);
      }
      ;
      if (v === 8) {
        return new Just(August.value);
      }
      ;
      if (v === 9) {
        return new Just(September.value);
      }
      ;
      if (v === 10) {
        return new Just(October.value);
      }
      ;
      if (v === 11) {
        return new Just(November.value);
      }
      ;
      if (v === 12) {
        return new Just(December.value);
      }
      ;
      return Nothing.value;
    },
    fromEnum: function(v) {
      if (v instanceof January) {
        return 1;
      }
      ;
      if (v instanceof February) {
        return 2;
      }
      ;
      if (v instanceof March) {
        return 3;
      }
      ;
      if (v instanceof April) {
        return 4;
      }
      ;
      if (v instanceof May) {
        return 5;
      }
      ;
      if (v instanceof June) {
        return 6;
      }
      ;
      if (v instanceof July) {
        return 7;
      }
      ;
      if (v instanceof August) {
        return 8;
      }
      ;
      if (v instanceof September) {
        return 9;
      }
      ;
      if (v instanceof October) {
        return 10;
      }
      ;
      if (v instanceof November) {
        return 11;
      }
      ;
      if (v instanceof December) {
        return 12;
      }
      ;
      throw new Error("Failed pattern match at Data.Date.Component (line 87, column 14 - line 99, column 19): " + [v.constructor.name]);
    },
    Bounded0: function() {
      return boundedMonth;
    },
    Enum1: function() {
      return $lazy_enumMonth(0);
    }
  };
  var $lazy_enumMonth = /* @__PURE__ */ $runtime_lazy4("enumMonth", "Data.Date.Component", function() {
    return {
      succ: function() {
        var $67 = toEnum(boundedEnumMonth);
        var $68 = fromEnum(boundedEnumMonth);
        return function($69) {
          return $67(function(v) {
            return v + 1 | 0;
          }($68($69)));
        };
      }(),
      pred: function() {
        var $70 = toEnum(boundedEnumMonth);
        var $71 = fromEnum(boundedEnumMonth);
        return function($72) {
          return $70(function(v) {
            return v - 1 | 0;
          }($71($72)));
        };
      }(),
      Ord0: function() {
        return ordMonth;
      }
    };
  });

  // output/Data.Int/foreign.js
  var fromNumberImpl = function(just) {
    return function(nothing) {
      return function(n) {
        return (n | 0) === n ? just(n) : nothing;
      };
    };
  };
  var toNumber = function(n) {
    return n;
  };

  // output/Data.Number/foreign.js
  var isFiniteImpl = isFinite;
  var abs = Math.abs;
  var remainder = function(n) {
    return function(m) {
      return n % m;
    };
  };
  var round = Math.round;

  // output/Data.Int/index.js
  var top2 = /* @__PURE__ */ top(boundedInt);
  var bottom2 = /* @__PURE__ */ bottom(boundedInt);
  var fromNumber = /* @__PURE__ */ function() {
    return fromNumberImpl(Just.create)(Nothing.value);
  }();
  var unsafeClamp = function(x) {
    if (!isFiniteImpl(x)) {
      return 0;
    }
    ;
    if (x >= toNumber(top2)) {
      return top2;
    }
    ;
    if (x <= toNumber(bottom2)) {
      return bottom2;
    }
    ;
    if (otherwise) {
      return fromMaybe(0)(fromNumber(x));
    }
    ;
    throw new Error("Failed pattern match at Data.Int (line 72, column 1 - line 72, column 29): " + [x.constructor.name]);
  };
  var round2 = function($37) {
    return unsafeClamp(round($37));
  };

  // output/Data.Date/index.js
  var fromEnum2 = /* @__PURE__ */ fromEnum(boundedEnumMonth);
  var fromJust3 = /* @__PURE__ */ fromJust();
  var show3 = /* @__PURE__ */ show(showYear);
  var show1 = /* @__PURE__ */ show(showMonth);
  var show22 = /* @__PURE__ */ show(showDay);
  var toEnum2 = /* @__PURE__ */ toEnum(boundedEnumMonth);
  var $$Date = /* @__PURE__ */ function() {
    function $$Date2(value0, value19, value24) {
      this.value0 = value0;
      this.value1 = value19;
      this.value2 = value24;
    }
    ;
    $$Date2.create = function(value0) {
      return function(value19) {
        return function(value24) {
          return new $$Date2(value0, value19, value24);
        };
      };
    };
    return $$Date2;
  }();
  var showDate = {
    show: function(v) {
      return "(Date " + (show3(v.value0) + (" " + (show1(v.value1) + (" " + (show22(v.value2) + ")")))));
    }
  };
  var canonicalDate = function(y) {
    return function(m) {
      return function(d) {
        var mkDate = function(y$prime) {
          return function(m$prime) {
            return function(d$prime) {
              return new $$Date(y$prime, fromJust3(toEnum2(m$prime)), d$prime);
            };
          };
        };
        return canonicalDateImpl(mkDate, y, fromEnum2(m), d);
      };
    };
  };

  // output/Data.Time.Component/index.js
  var show4 = /* @__PURE__ */ show(showInt);
  var showSecond = {
    show: function(v) {
      return "(Second " + (show4(v) + ")");
    }
  };
  var showMinute = {
    show: function(v) {
      return "(Minute " + (show4(v) + ")");
    }
  };
  var showMillisecond = {
    show: function(v) {
      return "(Millisecond " + (show4(v) + ")");
    }
  };
  var showHour = {
    show: function(v) {
      return "(Hour " + (show4(v) + ")");
    }
  };

  // output/Data.Time/index.js
  var show5 = /* @__PURE__ */ show(showHour);
  var show12 = /* @__PURE__ */ show(showMinute);
  var show23 = /* @__PURE__ */ show(showSecond);
  var show32 = /* @__PURE__ */ show(showMillisecond);
  var Time = /* @__PURE__ */ function() {
    function Time2(value0, value19, value24, value33) {
      this.value0 = value0;
      this.value1 = value19;
      this.value2 = value24;
      this.value3 = value33;
    }
    ;
    Time2.create = function(value0) {
      return function(value19) {
        return function(value24) {
          return function(value33) {
            return new Time2(value0, value19, value24, value33);
          };
        };
      };
    };
    return Time2;
  }();
  var showTime = {
    show: function(v) {
      return "(Time " + (show5(v.value0) + (" " + (show12(v.value1) + (" " + (show23(v.value2) + (" " + (show32(v.value3) + ")")))))));
    }
  };

  // output/Data.DateTime/index.js
  var show6 = /* @__PURE__ */ show(showDate);
  var show13 = /* @__PURE__ */ show(showTime);
  var DateTime = /* @__PURE__ */ function() {
    function DateTime2(value0, value19) {
      this.value0 = value0;
      this.value1 = value19;
    }
    ;
    DateTime2.create = function(value0) {
      return function(value19) {
        return new DateTime2(value0, value19);
      };
    };
    return DateTime2;
  }();
  var showDateTime = {
    show: function(v) {
      return "(DateTime " + (show6(v.value0) + (" " + (show13(v.value1) + ")")));
    }
  };

  // output/Data.String.Common/foreign.js
  var split = function(sep) {
    return function(s) {
      return s.split(sep);
    };
  };
  var trim = function(s) {
    return s.trim();
  };
  var joinWith = function(s) {
    return function(xs) {
      return xs.join(s);
    };
  };

  // output/Data.Function.Uncurried/foreign.js
  var runFn3 = function(fn) {
    return function(a2) {
      return function(b2) {
        return function(c) {
          return fn(a2, b2, c);
        };
      };
    };
  };
  var runFn4 = function(fn) {
    return function(a2) {
      return function(b2) {
        return function(c) {
          return function(d) {
            return fn(a2, b2, c, d);
          };
        };
      };
    };
  };

  // output/Record/index.js
  var insert3 = function(dictIsSymbol) {
    var reflectSymbol2 = reflectSymbol(dictIsSymbol);
    return function() {
      return function() {
        return function(l) {
          return function(a2) {
            return function(r) {
              return unsafeSet(reflectSymbol2(l))(a2)(r);
            };
          };
        };
      };
    };
  };
  var get2 = function(dictIsSymbol) {
    var reflectSymbol2 = reflectSymbol(dictIsSymbol);
    return function() {
      return function(l) {
        return function(r) {
          return unsafeGet(reflectSymbol2(l))(r);
        };
      };
    };
  };

  // output/Data.Array.NonEmpty.Internal/foreign.js
  var traverse1Impl = function() {
    function Cont(fn) {
      this.fn = fn;
    }
    var emptyList = {};
    var ConsCell = function(head6, tail3) {
      this.head = head6;
      this.tail = tail3;
    };
    function finalCell(head6) {
      return new ConsCell(head6, emptyList);
    }
    function consList(x) {
      return function(xs) {
        return new ConsCell(x, xs);
      };
    }
    function listToArray(list) {
      var arr = [];
      var xs = list;
      while (xs !== emptyList) {
        arr.push(xs.head);
        xs = xs.tail;
      }
      return arr;
    }
    return function(apply6) {
      return function(map39) {
        return function(f) {
          var buildFrom = function(x, ys) {
            return apply6(map39(consList)(f(x)))(ys);
          };
          var go2 = function(acc, currentLen, xs) {
            if (currentLen === 0) {
              return acc;
            } else {
              var last4 = xs[currentLen - 1];
              return new Cont(function() {
                var built = go2(buildFrom(last4, acc), currentLen - 1, xs);
                return built;
              });
            }
          };
          return function(array) {
            var acc = map39(finalCell)(f(array[array.length - 1]));
            var result = go2(acc, array.length - 1, array);
            while (result instanceof Cont) {
              result = result.fn();
            }
            return map39(listToArray)(result);
          };
        };
      };
    };
  }();

  // output/Data.Array.NonEmpty.Internal/index.js
  var NonEmptyArray = function(x) {
    return x;
  };
  var semigroupNonEmptyArray = semigroupArray;
  var functorNonEmptyArray = functorArray;
  var foldableNonEmptyArray = foldableArray;

  // output/Data.Array.NonEmpty/index.js
  var fromJust4 = /* @__PURE__ */ fromJust();
  var unsafeFromArray = NonEmptyArray;
  var toArray = function(v) {
    return v;
  };
  var snoc$prime = function(xs) {
    return function(x) {
      return unsafeFromArray(snoc4(xs)(x));
    };
  };
  var snoc5 = function(xs) {
    return function(x) {
      return unsafeFromArray(snoc4(toArray(xs))(x));
    };
  };
  var singleton6 = function($110) {
    return unsafeFromArray(singleton5($110));
  };
  var fromArray = function(xs) {
    if (length3(xs) > 0) {
      return new Just(unsafeFromArray(xs));
    }
    ;
    if (otherwise) {
      return Nothing.value;
    }
    ;
    throw new Error("Failed pattern match at Data.Array.NonEmpty (line 160, column 1 - line 160, column 58): " + [xs.constructor.name]);
  };
  var cons$prime = function(x) {
    return function(xs) {
      return unsafeFromArray(cons3(x)(xs));
    };
  };
  var adaptMaybe = function(f) {
    return function($126) {
      return fromJust4(f(toArray($126)));
    };
  };
  var head4 = /* @__PURE__ */ adaptMaybe(head3);
  var init3 = /* @__PURE__ */ adaptMaybe(init2);
  var last3 = /* @__PURE__ */ adaptMaybe(last2);
  var tail2 = /* @__PURE__ */ adaptMaybe(tail);
  var adaptAny = function(f) {
    return function($128) {
      return f(toArray($128));
    };
  };
  var unsafeAdapt = function(f) {
    var $129 = adaptAny(f);
    return function($130) {
      return unsafeFromArray($129($130));
    };
  };
  var cons4 = function(x) {
    return unsafeAdapt(cons3(x));
  };

  // output/Data.Bifoldable/index.js
  var bifoldableTuple = {
    bifoldMap: function(dictMonoid) {
      var append13 = append(dictMonoid.Semigroup0());
      return function(f) {
        return function(g) {
          return function(v) {
            return append13(f(v.value0))(g(v.value1));
          };
        };
      };
    },
    bifoldr: function(f) {
      return function(g) {
        return function(z) {
          return function(v) {
            return f(v.value0)(g(v.value1)(z));
          };
        };
      };
    },
    bifoldl: function(f) {
      return function(g) {
        return function(z) {
          return function(v) {
            return g(f(z)(v.value0))(v.value1);
          };
        };
      };
    }
  };

  // output/Data.Bitraversable/index.js
  var bitraverse = function(dict) {
    return dict.bitraverse;
  };
  var ltraverse = function(dictBitraversable) {
    var bitraverse1 = bitraverse(dictBitraversable);
    return function(dictApplicative) {
      var bitraverse22 = bitraverse1(dictApplicative);
      var pure18 = pure(dictApplicative);
      return function(f) {
        return bitraverse22(f)(pure18);
      };
    };
  };
  var bitraversableTuple = {
    bitraverse: function(dictApplicative) {
      var Apply0 = dictApplicative.Apply0();
      var apply6 = apply(Apply0);
      var map39 = map(Apply0.Functor0());
      return function(f) {
        return function(g) {
          return function(v) {
            return apply6(map39(Tuple.create)(f(v.value0)))(g(v.value1));
          };
        };
      };
    },
    bisequence: function(dictApplicative) {
      var Apply0 = dictApplicative.Apply0();
      var apply6 = apply(Apply0);
      var map39 = map(Apply0.Functor0());
      return function(v) {
        return apply6(map39(Tuple.create)(v.value0))(v.value1);
      };
    },
    Bifunctor0: function() {
      return bifunctorTuple;
    },
    Bifoldable1: function() {
      return bifoldableTuple;
    }
  };

  // output/Data.String.CodeUnits/foreign.js
  var length4 = function(s) {
    return s.length;
  };
  var _indexOf = function(just) {
    return function(nothing) {
      return function(x) {
        return function(s) {
          var i2 = s.indexOf(x);
          return i2 === -1 ? nothing : just(i2);
        };
      };
    };
  };
  var take3 = function(n) {
    return function(s) {
      return s.substr(0, n);
    };
  };
  var drop3 = function(n) {
    return function(s) {
      return s.substring(n);
    };
  };
  var splitAt2 = function(i2) {
    return function(s) {
      return { before: s.substring(0, i2), after: s.substring(i2) };
    };
  };

  // output/Data.String.CodeUnits/index.js
  var stripPrefix = function(v) {
    return function(str) {
      var v1 = splitAt2(length4(v))(str);
      var $20 = v1.before === v;
      if ($20) {
        return new Just(v1.after);
      }
      ;
      return Nothing.value;
    };
  };
  var indexOf = /* @__PURE__ */ function() {
    return _indexOf(Just.create)(Nothing.value);
  }();

  // output/JSURI/foreign.js
  function encodeURIComponent_to_RFC3986(input3) {
    return input3.replace(/[!'()*]/g, function(c) {
      return "%" + c.charCodeAt(0).toString(16);
    });
  }
  function _encodeURIComponent(fail3, succeed, input3) {
    try {
      return succeed(encodeURIComponent_to_RFC3986(encodeURIComponent(input3)));
    } catch (err) {
      return fail3(err);
    }
  }
  function _encodeFormURLComponent(fail3, succeed, input3) {
    try {
      return succeed(encodeURIComponent_to_RFC3986(encodeURIComponent(input3)).replace(/%20/g, "+"));
    } catch (err) {
      return fail3(err);
    }
  }
  function _decodeURIComponent(fail3, succeed, input3) {
    try {
      return succeed(decodeURIComponent(input3));
    } catch (err) {
      return fail3(err);
    }
  }

  // output/JSURI/index.js
  var $$encodeURIComponent = /* @__PURE__ */ function() {
    return runFn3(_encodeURIComponent)($$const(Nothing.value))(Just.create);
  }();
  var encodeFormURLComponent = /* @__PURE__ */ function() {
    return runFn3(_encodeFormURLComponent)($$const(Nothing.value))(Just.create);
  }();
  var $$decodeURIComponent = /* @__PURE__ */ function() {
    return runFn3(_decodeURIComponent)($$const(Nothing.value))(Just.create);
  }();

  // output/Routing.Duplex.Types/index.js
  var emptyRouteState = {
    segments: [],
    params: [],
    hash: ""
  };

  // output/Routing.Duplex.Parser/index.js
  var $runtime_lazy5 = function(name16, moduleName, init4) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name16 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init4();
      state3 = 2;
      return val;
    };
  };
  var bitraverse2 = /* @__PURE__ */ bitraverse(bitraversableTuple)(applicativeEither);
  var traverse2 = /* @__PURE__ */ traverse(traversableArray)(applicativeEither);
  var map8 = /* @__PURE__ */ map(functorNonEmptyArray);
  var map12 = /* @__PURE__ */ map(functorFn);
  var foldl2 = /* @__PURE__ */ foldl(foldableNonEmptyArray);
  var composeKleisli2 = /* @__PURE__ */ composeKleisli(bindEither);
  var append7 = /* @__PURE__ */ append(semigroupNonEmptyArray);
  var Expected = /* @__PURE__ */ function() {
    function Expected2(value0, value19) {
      this.value0 = value0;
      this.value1 = value19;
    }
    ;
    Expected2.create = function(value0) {
      return function(value19) {
        return new Expected2(value0, value19);
      };
    };
    return Expected2;
  }();
  var ExpectedEndOfPath = /* @__PURE__ */ function() {
    function ExpectedEndOfPath2(value0) {
      this.value0 = value0;
    }
    ;
    ExpectedEndOfPath2.create = function(value0) {
      return new ExpectedEndOfPath2(value0);
    };
    return ExpectedEndOfPath2;
  }();
  var MalformedURIComponent = /* @__PURE__ */ function() {
    function MalformedURIComponent2(value0) {
      this.value0 = value0;
    }
    ;
    MalformedURIComponent2.create = function(value0) {
      return new MalformedURIComponent2(value0);
    };
    return MalformedURIComponent2;
  }();
  var EndOfPath = /* @__PURE__ */ function() {
    function EndOfPath2() {
    }
    ;
    EndOfPath2.value = new EndOfPath2();
    return EndOfPath2;
  }();
  var Fail = /* @__PURE__ */ function() {
    function Fail3(value0) {
      this.value0 = value0;
    }
    ;
    Fail3.create = function(value0) {
      return new Fail3(value0);
    };
    return Fail3;
  }();
  var Success = /* @__PURE__ */ function() {
    function Success2(value0, value19) {
      this.value0 = value0;
      this.value1 = value19;
    }
    ;
    Success2.create = function(value0) {
      return function(value19) {
        return new Success2(value0, value19);
      };
    };
    return Success2;
  }();
  var Alt = /* @__PURE__ */ function() {
    function Alt2(value0) {
      this.value0 = value0;
    }
    ;
    Alt2.create = function(value0) {
      return new Alt2(value0);
    };
    return Alt2;
  }();
  var Chomp = /* @__PURE__ */ function() {
    function Chomp2(value0) {
      this.value0 = value0;
    }
    ;
    Chomp2.create = function(value0) {
      return new Chomp2(value0);
    };
    return Chomp2;
  }();
  var Prefix = /* @__PURE__ */ function() {
    function Prefix2(value0, value19) {
      this.value0 = value0;
      this.value1 = value19;
    }
    ;
    Prefix2.create = function(value0) {
      return function(value19) {
        return new Prefix2(value0, value19);
      };
    };
    return Prefix2;
  }();
  var take4 = /* @__PURE__ */ function() {
    return new Chomp(function(state3) {
      var v = uncons4(state3.segments);
      if (v instanceof Just) {
        return new Success({
          segments: v.value0.tail,
          params: state3.params,
          hash: state3.hash
        }, v.value0.head);
      }
      ;
      return new Fail(EndOfPath.value);
    });
  }();
  var prefix = /* @__PURE__ */ function() {
    return Prefix.create;
  }();
  var parsePath = /* @__PURE__ */ function() {
    var toRouteState = function(v) {
      return {
        segments: v.value0.value0,
        params: v.value0.value1,
        hash: v.value1
      };
    };
    var splitNonEmpty = function(v) {
      return function(v1) {
        if (v1 === "") {
          return [];
        }
        ;
        return split(v)(v1);
      };
    };
    var splitAt4 = function(k) {
      return function(p2) {
        return function(str) {
          var v = indexOf(p2)(str);
          if (v instanceof Just) {
            return new Tuple(take3(v.value0)(str), drop3(v.value0 + length4(p2) | 0)(str));
          }
          ;
          if (v instanceof Nothing) {
            return k(str);
          }
          ;
          throw new Error("Failed pattern match at Routing.Duplex.Parser (line 191, column 5 - line 193, column 23): " + [v.constructor.name]);
        };
      };
    };
    var decodeURIComponent$prime = function(str) {
      var v = $$decodeURIComponent(str);
      if (v instanceof Nothing) {
        return new Left(new MalformedURIComponent(str));
      }
      ;
      if (v instanceof Just) {
        return new Right(v.value0);
      }
      ;
      throw new Error("Failed pattern match at Routing.Duplex.Parser (line 195, column 29 - line 197, column 22): " + [v.constructor.name]);
    };
    var splitKeyValue = function() {
      var $349 = bitraverse2(decodeURIComponent$prime)(decodeURIComponent$prime);
      var $350 = splitAt4(flip(Tuple.create)(""))("=");
      return function($351) {
        return $349($350($351));
      };
    }();
    var splitParams = function() {
      var $352 = traverse2(splitKeyValue);
      var $353 = splitNonEmpty("&");
      return function($354) {
        return $352($353($354));
      };
    }();
    var splitSegments = function() {
      var $355 = splitNonEmpty("/");
      return function($356) {
        return function(v) {
          if (v.length === 2 && (v[0] === "" && v[1] === "")) {
            return new Right([""]);
          }
          ;
          return traverse2(decodeURIComponent$prime)(v);
        }($355($356));
      };
    }();
    var splitPath = function() {
      var $357 = bitraverse2(splitSegments)(splitParams);
      var $358 = splitAt4(flip(Tuple.create)(""))("?");
      return function($359) {
        return $357($358($359));
      };
    }();
    var $360 = map(functorEither)(toRouteState);
    var $361 = ltraverse(bitraversableTuple)(applicativeEither)(splitPath);
    var $362 = splitAt4(flip(Tuple.create)(""))("#");
    return function($363) {
      return $360($361($362($363)));
    };
  }();
  var functorRouteResult = {
    map: function(f) {
      return function(m) {
        if (m instanceof Fail) {
          return new Fail(m.value0);
        }
        ;
        if (m instanceof Success) {
          return new Success(m.value0, f(m.value1));
        }
        ;
        throw new Error("Failed pattern match at Routing.Duplex.Parser (line 0, column 0 - line 0, column 0): " + [m.constructor.name]);
      };
    }
  };
  var map22 = /* @__PURE__ */ map(functorRouteResult);
  var functorRouteParser = {
    map: function(f) {
      return function(m) {
        if (m instanceof Alt) {
          return new Alt(map8(map(functorRouteParser)(f))(m.value0));
        }
        ;
        if (m instanceof Chomp) {
          return new Chomp(map12(map22(f))(m.value0));
        }
        ;
        if (m instanceof Prefix) {
          return new Prefix(m.value0, map(functorRouteParser)(f)(m.value1));
        }
        ;
        throw new Error("Failed pattern match at Routing.Duplex.Parser (line 0, column 0 - line 0, column 0): " + [m.constructor.name]);
      };
    }
  };
  var map32 = /* @__PURE__ */ map(functorRouteParser);
  var end = /* @__PURE__ */ function() {
    return new Chomp(function(state3) {
      var v = head3(state3.segments);
      if (v instanceof Nothing) {
        return new Success(state3, unit);
      }
      ;
      if (v instanceof Just) {
        return new Fail(new ExpectedEndOfPath(v.value0));
      }
      ;
      throw new Error("Failed pattern match at Routing.Duplex.Parser (line 266, column 3 - line 268, column 45): " + [v.constructor.name]);
    });
  }();
  var chompPrefix = function(pre2) {
    return function(state3) {
      var v = head3(state3.segments);
      if (v instanceof Just && pre2 === v.value0) {
        return new Success({
          segments: drop2(1)(state3.segments),
          params: state3.params,
          hash: state3.hash
        }, unit);
      }
      ;
      if (v instanceof Just) {
        return new Fail(new Expected(pre2, v.value0));
      }
      ;
      return new Fail(EndOfPath.value);
    };
  };
  var $lazy_runRouteParser = /* @__PURE__ */ $runtime_lazy5("runRouteParser", "Routing.Duplex.Parser", function() {
    var goAlt = function(v) {
      return function(v1) {
        return function(v2) {
          if (v1 instanceof Fail) {
            return $lazy_runRouteParser(161)(v)(v2);
          }
          ;
          return v1;
        };
      };
    };
    var go2 = function($copy_state) {
      return function($copy_v) {
        var $tco_var_state = $copy_state;
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(state3, v) {
          if (v instanceof Alt) {
            $tco_done = true;
            return foldl2(goAlt(state3))(new Fail(EndOfPath.value))(v.value0);
          }
          ;
          if (v instanceof Chomp) {
            $tco_done = true;
            return v.value0(state3);
          }
          ;
          if (v instanceof Prefix) {
            var v1 = chompPrefix(v.value0)(state3);
            if (v1 instanceof Fail) {
              $tco_done = true;
              return new Fail(v1.value0);
            }
            ;
            if (v1 instanceof Success) {
              $tco_var_state = v1.value0;
              $copy_v = v.value1;
              return;
            }
            ;
            throw new Error("Failed pattern match at Routing.Duplex.Parser (line 157, column 7 - line 159, column 40): " + [v1.constructor.name]);
          }
          ;
          throw new Error("Failed pattern match at Routing.Duplex.Parser (line 153, column 14 - line 159, column 40): " + [v.constructor.name]);
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($tco_var_state, $copy_v);
        }
        ;
        return $tco_result;
      };
    };
    return go2;
  });
  var runRouteParser = /* @__PURE__ */ $lazy_runRouteParser(150);
  var run3 = function(p2) {
    return composeKleisli2(parsePath)(function() {
      var $366 = flip(runRouteParser)(p2);
      return function($367) {
        return function(v) {
          if (v instanceof Fail) {
            return new Left(v.value0);
          }
          ;
          if (v instanceof Success) {
            return new Right(v.value1);
          }
          ;
          throw new Error("Failed pattern match at Routing.Duplex.Parser (line 200, column 49 - line 202, column 29): " + [v.constructor.name]);
        }($366($367));
      };
    }());
  };
  var applyRouteParser = {
    apply: function(fx) {
      return function(x) {
        return new Chomp(function(state3) {
          var v = runRouteParser(state3)(fx);
          if (v instanceof Fail) {
            return new Fail(v.value0);
          }
          ;
          if (v instanceof Success) {
            return map22(v.value1)(runRouteParser(v.value0)(x));
          }
          ;
          throw new Error("Failed pattern match at Routing.Duplex.Parser (line 81, column 5 - line 83, column 56): " + [v.constructor.name]);
        });
      };
    },
    Functor0: function() {
      return functorRouteParser;
    }
  };
  var applicativeRouteParser = {
    pure: /* @__PURE__ */ function() {
      var $368 = flip(Success.create);
      return function($369) {
        return Chomp.create($368($369));
      };
    }(),
    Apply0: function() {
      return applyRouteParser;
    }
  };
  var pure4 = /* @__PURE__ */ pure(applicativeRouteParser);
  var altSnoc = function(v) {
    return function(v1) {
      var v2 = function(v3) {
        return snoc5(v)(v1);
      };
      if (v1 instanceof Prefix) {
        var $310 = last3(v);
        if ($310 instanceof Prefix) {
          var $311 = v1.value0 === $310.value0;
          if ($311) {
            return snoc$prime(init3(v))(new Prefix(v1.value0, alt(altRouteParser)($310.value1)(v1.value1)));
          }
          ;
          return v2(true);
        }
        ;
        return v2(true);
      }
      ;
      return v2(true);
    };
  };
  var altRouteParser = {
    alt: function(v) {
      return function(v1) {
        if (v instanceof Alt && v1 instanceof Alt) {
          return new Alt(altAppend(v.value0)(v1.value0));
        }
        ;
        if (v instanceof Alt) {
          return new Alt(altSnoc(v.value0)(v1));
        }
        ;
        if (v1 instanceof Alt) {
          return new Alt(altCons(v)(v1.value0));
        }
        ;
        if (v instanceof Prefix && (v1 instanceof Prefix && v.value0 === v1.value0)) {
          return new Prefix(v.value0, alt(altRouteParser)(v.value1)(v1.value1));
        }
        ;
        return new Alt(cons4(v)(singleton6(v1)));
      };
    },
    Functor0: function() {
      return functorRouteParser;
    }
  };
  var altCons = function(v) {
    return function(v1) {
      var v2 = function(v3) {
        return cons4(v)(v1);
      };
      if (v instanceof Prefix) {
        var $330 = head4(v1);
        if ($330 instanceof Prefix) {
          var $331 = v.value0 === $330.value0;
          if ($331) {
            return cons$prime(new Prefix(v.value0, alt(altRouteParser)(v.value1)($330.value1)))(tail2(v1));
          }
          ;
          return v2(true);
        }
        ;
        return v2(true);
      }
      ;
      return v2(true);
    };
  };
  var altAppend = function($copy_ls) {
    return function($copy_rs) {
      var $tco_var_ls = $copy_ls;
      var $tco_done = false;
      var $tco_result;
      function $tco_loop(ls, rs) {
        var v = function(v12) {
          if (otherwise) {
            return append7(ls)(rs);
          }
          ;
          throw new Error("Failed pattern match at Routing.Duplex.Parser (line 103, column 1 - line 107, column 35): " + [ls.constructor.name, rs.constructor.name]);
        };
        var $340 = last3(ls);
        if ($340 instanceof Prefix) {
          var $341 = head4(rs);
          if ($341 instanceof Prefix) {
            var $342 = $340.value0 === $341.value0;
            if ($342) {
              var rs$prime = cons$prime(new Prefix($340.value0, alt(altRouteParser)($340.value1)($341.value1)))(tail2(rs));
              var v1 = fromArray(init3(ls));
              if (v1 instanceof Just) {
                $tco_var_ls = v1.value0;
                $copy_rs = rs$prime;
                return;
              }
              ;
              if (v1 instanceof Nothing) {
                $tco_done = true;
                return rs$prime;
              }
              ;
              throw new Error("Failed pattern match at Routing.Duplex.Parser (line 116, column 9 - line 118, column 25): " + [v1.constructor.name]);
            }
            ;
            $tco_done = true;
            return v(true);
          }
          ;
          $tco_done = true;
          return v(true);
        }
        ;
        $tco_done = true;
        return v(true);
      }
      ;
      while (!$tco_done) {
        $tco_result = $tco_loop($tco_var_ls, $copy_rs);
      }
      ;
      return $tco_result;
    };
  };
  var alt2 = /* @__PURE__ */ alt(altRouteParser);
  var $$default = /* @__PURE__ */ function() {
    var $370 = flip(alt2);
    return function($371) {
      return $370(pure4($371));
    };
  }();
  var optional = /* @__PURE__ */ function() {
    var $375 = $$default(Nothing.value);
    var $376 = map32(Just.create);
    return function($377) {
      return $375($376($377));
    };
  }();

  // output/Routing.Duplex.Printer/index.js
  var append8 = /* @__PURE__ */ append(/* @__PURE__ */ semigroupMaybe(semigroupString));
  var semigroupRoutePrinter = {
    append: function(v) {
      return function(v1) {
        return function($33) {
          return v1(v($33));
        };
      };
    }
  };
  var put2 = function(str) {
    return function(state3) {
      return {
        segments: snoc4(state3.segments)(str),
        params: state3.params,
        hash: state3.hash
      };
    };
  };
  var printPath = function(v) {
    var printSegments = function(v1) {
      if (v1.length === 1 && v1[0] === "") {
        return "/";
      }
      ;
      return joinWith("/")(mapMaybe2($$encodeURIComponent)(v1));
    };
    var printParam = function(v1) {
      return function(v2) {
        if (v2 === "") {
          return $$encodeURIComponent(v1);
        }
        ;
        return append8($$encodeURIComponent(v1))(append8(new Just("="))($$encodeURIComponent(v2)));
      };
    };
    var printParams = function(v1) {
      if (v1.length === 0) {
        return "";
      }
      ;
      return "?" + joinWith("&")(mapMaybe2(uncurry(printParam))(v1));
    };
    var printHash = function(v1) {
      if (v1 === "") {
        return "";
      }
      ;
      return "#" + v1;
    };
    return printSegments(v.segments) + (printParams(v.params) + printHash(v.hash));
  };
  var run4 = /* @__PURE__ */ function() {
    var $34 = applyFlipped(emptyRouteState);
    var $35 = unwrap();
    return function($36) {
      return printPath($34($35($36)));
    };
  }();
  var monoidRoutePRinter = {
    mempty: /* @__PURE__ */ identity(categoryFn),
    Semigroup0: function() {
      return semigroupRoutePrinter;
    }
  };

  // output/Routing.Duplex/index.js
  var append9 = /* @__PURE__ */ append(semigroupRoutePrinter);
  var applyFirst2 = /* @__PURE__ */ applyFirst(applyRouteParser);
  var pure5 = /* @__PURE__ */ pure(applicativeRouteParser);
  var apply2 = /* @__PURE__ */ apply(applyRouteParser);
  var map9 = /* @__PURE__ */ map(functorRouteParser);
  var foldMap2 = /* @__PURE__ */ foldMap(foldableMaybe)(monoidRoutePRinter);
  var mempty2 = /* @__PURE__ */ mempty(monoidRoutePRinter);
  var apply1 = /* @__PURE__ */ apply(applyFn);
  var map13 = /* @__PURE__ */ map(functorFn);
  var RouteDuplex = /* @__PURE__ */ function() {
    function RouteDuplex2(value0, value19) {
      this.value0 = value0;
      this.value1 = value19;
    }
    ;
    RouteDuplex2.create = function(value0) {
      return function(value19) {
        return new RouteDuplex2(value0, value19);
      };
    };
    return RouteDuplex2;
  }();
  var segment = /* @__PURE__ */ function() {
    return new RouteDuplex(put2, take4);
  }();
  var profunctorRouteDuplex = {
    dimap: function(f) {
      return function(g) {
        return function(v) {
          return new RouteDuplex(function($137) {
            return v.value0(f($137));
          }, map9(g)(v.value1));
        };
      };
    }
  };
  var print = function(v) {
    return function($138) {
      return run4(v.value0($138));
    };
  };
  var prefix2 = function(s) {
    return function(v) {
      return new RouteDuplex(function(a2) {
        return append9(put2(s))(v.value0(a2));
      }, prefix(s)(v.value1));
    };
  };
  var path = /* @__PURE__ */ function() {
    var $139 = flip(foldr(foldableArray)(prefix2));
    var $140 = split("/");
    return function($141) {
      return $139($140($141));
    };
  }();
  var root = /* @__PURE__ */ path("");
  var parse = function(v) {
    return run3(v.value1);
  };
  var optional2 = function(v) {
    return new RouteDuplex(foldMap2(v.value0), optional(v.value1));
  };
  var functorRouteDuplex = {
    map: function(f) {
      return function(m) {
        return new RouteDuplex(m.value0, map9(f)(m.value1));
      };
    }
  };
  var end2 = function(v) {
    return new RouteDuplex(v.value0, applyFirst2(v.value1)(end));
  };
  var applyRouteDuplex = {
    apply: function(v) {
      return function(v1) {
        return new RouteDuplex(apply1(map13(append9)(v.value0))(v1.value0), apply2(v.value1)(v1.value1));
      };
    },
    Functor0: function() {
      return functorRouteDuplex;
    }
  };
  var applicativeRouteDuplex = {
    pure: /* @__PURE__ */ function() {
      var $143 = RouteDuplex.create($$const(mempty2));
      return function($144) {
        return $143(pure5($144));
      };
    }(),
    Apply0: function() {
      return applyRouteDuplex;
    }
  };

  // output/Routing.Duplex.Generic/index.js
  var identity10 = /* @__PURE__ */ identity(categoryFn);
  var map10 = /* @__PURE__ */ map(functorRouteParser);
  var alt3 = /* @__PURE__ */ alt(altRouteParser);
  var dimap2 = /* @__PURE__ */ dimap(profunctorRouteDuplex);
  var noArgs = /* @__PURE__ */ function() {
    return pure(applicativeRouteDuplex)(NoArguments.value);
  }();
  var gRouteNoArguments = {
    gRouteDuplexCtr: identity10
  };
  var gRouteDuplexCtr = function(dict) {
    return dict.gRouteDuplexCtr;
  };
  var gRouteDuplex = function(dict) {
    return dict.gRouteDuplex;
  };
  var gRouteSum = function(dictGRouteDuplex) {
    var gRouteDuplex1 = gRouteDuplex(dictGRouteDuplex);
    return function(dictGRouteDuplex1) {
      var gRouteDuplex2 = gRouteDuplex(dictGRouteDuplex1);
      return {
        gRouteDuplex: function(end$prime) {
          return function(r) {
            var v = gRouteDuplex1(end$prime)(r);
            var v1 = gRouteDuplex2(end$prime)(r);
            var enc = function(v2) {
              if (v2 instanceof Inl) {
                return v.value0(v2.value0);
              }
              ;
              if (v2 instanceof Inr) {
                return v1.value0(v2.value0);
              }
              ;
              throw new Error("Failed pattern match at Routing.Duplex.Generic (line 51, column 11 - line 53, column 22): " + [v2.constructor.name]);
            };
            var dec = alt3(map10(Inl.create)(v.value1))(map10(Inr.create)(v1.value1));
            return new RouteDuplex(enc, dec);
          };
        }
      };
    };
  };
  var sum2 = function(dictGeneric) {
    var from3 = from(dictGeneric);
    var to2 = to(dictGeneric);
    return function(dictGRouteDuplex) {
      var $71 = dimap2(from3)(to2);
      var $72 = gRouteDuplex(dictGRouteDuplex)(end2);
      return function($73) {
        return $71($72($73));
      };
    };
  };
  var gRouteConstructor = function(dictIsSymbol) {
    var get5 = get2(dictIsSymbol)();
    return function() {
      return function(dictGRouteDuplexCtr) {
        var gRouteDuplexCtr1 = gRouteDuplexCtr(dictGRouteDuplexCtr);
        return {
          gRouteDuplex: function(end$prime) {
            return function(r) {
              var v = end$prime(gRouteDuplexCtr1(get5($$Proxy.value)(r)));
              var enc = function(v1) {
                return v.value0(v1);
              };
              var dec = map10(Constructor)(v.value1);
              return new RouteDuplex(enc, dec);
            };
          }
        };
      };
    };
  };
  var gRouteArgument = {
    gRouteDuplexCtr: identity10
  };
  var gRouteAll = {
    gRouteDuplexCtr: function(v) {
      return new RouteDuplex(function(v1) {
        return v.value0(v1);
      }, map10(Argument)(v.value1));
    }
  };

  // output/Routing.Duplex.Generic.Syntax/index.js
  var gsepStringRoute = function(dictGRouteDuplexCtr) {
    var gRouteDuplexCtr2 = gRouteDuplexCtr(dictGRouteDuplexCtr);
    return {
      gsep: function(a2) {
        var $15 = prefix2(a2);
        return function($16) {
          return $15(gRouteDuplexCtr2($16));
        };
      }
    };
  };
  var gsep = function(dict) {
    return dict.gsep;
  };

  // output/Data.Route/index.js
  var eq3 = /* @__PURE__ */ eq(/* @__PURE__ */ eqMaybe(eqString));
  var Logon = /* @__PURE__ */ function() {
    function Logon3() {
    }
    ;
    Logon3.value = new Logon3();
    return Logon3;
  }();
  var Logoff = /* @__PURE__ */ function() {
    function Logoff3() {
    }
    ;
    Logoff3.value = new Logoff3();
    return Logoff3;
  }();
  var Users = /* @__PURE__ */ function() {
    function Users2(value0) {
      this.value0 = value0;
    }
    ;
    Users2.create = function(value0) {
      return new Users2(value0);
    };
    return Users2;
  }();
  var ChangePassword = /* @__PURE__ */ function() {
    function ChangePassword2() {
    }
    ;
    ChangePassword2.value = new ChangePassword2();
    return ChangePassword2;
  }();
  var genericRoute_ = {
    to: function(x) {
      if (x instanceof Inl) {
        return Logon.value;
      }
      ;
      if (x instanceof Inr && x.value0 instanceof Inl) {
        return Logoff.value;
      }
      ;
      if (x instanceof Inr && (x.value0 instanceof Inr && x.value0.value0 instanceof Inl)) {
        return new Users(x.value0.value0.value0);
      }
      ;
      if (x instanceof Inr && (x.value0 instanceof Inr && x.value0.value0 instanceof Inr)) {
        return ChangePassword.value;
      }
      ;
      throw new Error("Failed pattern match at Data.Route (line 17, column 1 - line 17, column 32): " + [x.constructor.name]);
    },
    from: function(x) {
      if (x instanceof Logon) {
        return new Inl(NoArguments.value);
      }
      ;
      if (x instanceof Logoff) {
        return new Inr(new Inl(NoArguments.value));
      }
      ;
      if (x instanceof Users) {
        return new Inr(new Inr(new Inl(x.value0)));
      }
      ;
      if (x instanceof ChangePassword) {
        return new Inr(new Inr(new Inr(NoArguments.value)));
      }
      ;
      throw new Error("Failed pattern match at Data.Route (line 17, column 1 - line 17, column 32): " + [x.constructor.name]);
    }
  };
  var eqRoute = {
    eq: function(x) {
      return function(y) {
        if (x instanceof Logon && y instanceof Logon) {
          return true;
        }
        ;
        if (x instanceof Logoff && y instanceof Logoff) {
          return true;
        }
        ;
        if (x instanceof Users && y instanceof Users) {
          return eq3(x.value0)(y.value0);
        }
        ;
        if (x instanceof ChangePassword && y instanceof ChangePassword) {
          return true;
        }
        ;
        return false;
      };
    }
  };
  var routeCodec = /* @__PURE__ */ root(/* @__PURE__ */ sum2(genericRoute_)(/* @__PURE__ */ gRouteSum(/* @__PURE__ */ gRouteConstructor({
    reflectSymbol: function() {
      return "Logon";
    }
  })()(gRouteNoArguments))(/* @__PURE__ */ gRouteSum(/* @__PURE__ */ gRouteConstructor({
    reflectSymbol: function() {
      return "Logoff";
    }
  })()(gRouteNoArguments))(/* @__PURE__ */ gRouteSum(/* @__PURE__ */ gRouteConstructor({
    reflectSymbol: function() {
      return "Users";
    }
  })()(gRouteArgument))(/* @__PURE__ */ gRouteConstructor({
    reflectSymbol: function() {
      return "ChangePassword";
    }
  })()(gRouteNoArguments)))))({
    Logon: /* @__PURE__ */ path("logon")(noArgs),
    Logoff: /* @__PURE__ */ path("logoff")(noArgs),
    Users: /* @__PURE__ */ gsep(/* @__PURE__ */ gsepStringRoute(gRouteAll))("users")(/* @__PURE__ */ optional2(segment)),
    ChangePassword: /* @__PURE__ */ path("change-passowrd")(noArgs)
  }));

  // output/Effect.Console/foreign.js
  var log3 = function(s) {
    return function() {
      console.log(s);
    };
  };
  var warn = function(s) {
    return function() {
      console.warn(s);
    };
  };

  // output/Effect.Class.Console/index.js
  var log4 = function(dictMonadEffect) {
    var $51 = liftEffect(dictMonadEffect);
    return function($52) {
      return $51(log3($52));
    };
  };

  // output/Effect.Now/foreign.js
  function now() {
    return Date.now();
  }

  // output/Data.DateTime.Instant/foreign.js
  function toDateTimeImpl(ctor) {
    return function(instant) {
      var dt2 = new Date(instant);
      return ctor(dt2.getUTCFullYear())(dt2.getUTCMonth() + 1)(dt2.getUTCDate())(dt2.getUTCHours())(dt2.getUTCMinutes())(dt2.getUTCSeconds())(dt2.getUTCMilliseconds());
    };
  }

  // output/Data.DateTime.Instant/index.js
  var fromJust5 = /* @__PURE__ */ fromJust();
  var toEnum3 = /* @__PURE__ */ toEnum(boundedEnumMonth);
  var toDateTime = /* @__PURE__ */ function() {
    var mkDateTime = function(y) {
      return function(mo) {
        return function(d) {
          return function(h) {
            return function(mi) {
              return function(s) {
                return function(ms) {
                  return new DateTime(canonicalDate(y)(fromJust5(toEnum3(mo)))(d), new Time(h, mi, s, ms));
                };
              };
            };
          };
        };
      };
    };
    return toDateTimeImpl(mkDateTime);
  }();

  // output/Effect.Now/index.js
  var map11 = /* @__PURE__ */ map(functorEffect);
  var nowDateTime = /* @__PURE__ */ map11(toDateTime)(now);

  // output/Data.String.CodePoints/foreign.js
  var hasArrayFrom = typeof Array.from === "function";
  var hasStringIterator = typeof Symbol !== "undefined" && Symbol != null && typeof Symbol.iterator !== "undefined" && typeof String.prototype[Symbol.iterator] === "function";
  var hasFromCodePoint = typeof String.prototype.fromCodePoint === "function";
  var hasCodePointAt = typeof String.prototype.codePointAt === "function";

  // output/Web.Event.EventTarget/foreign.js
  function eventListener(fn) {
    return function() {
      return function(event) {
        return fn(event)();
      };
    };
  }
  function addEventListener(type) {
    return function(listener) {
      return function(useCapture) {
        return function(target6) {
          return function() {
            return target6.addEventListener(type, listener, useCapture);
          };
        };
      };
    };
  }
  function removeEventListener(type) {
    return function(listener) {
      return function(useCapture) {
        return function(target6) {
          return function() {
            return target6.removeEventListener(type, listener, useCapture);
          };
        };
      };
    };
  }

  // output/Web.HTML/foreign.js
  var windowImpl = function() {
    return window;
  };

  // output/Data.Nullable/foreign.js
  var nullImpl = null;
  function nullable(a2, r, f) {
    return a2 == null ? r : f(a2);
  }
  function notNull(x) {
    return x;
  }

  // output/Data.Nullable/index.js
  var toNullable = /* @__PURE__ */ maybe(nullImpl)(notNull);
  var toMaybe = function(n) {
    return nullable(n, Nothing.value, Just.create);
  };

  // output/Web.HTML.HTMLDocument/foreign.js
  function _readyState(doc) {
    return doc.readyState;
  }

  // output/Web.HTML.HTMLDocument.ReadyState/index.js
  var Loading = /* @__PURE__ */ function() {
    function Loading2() {
    }
    ;
    Loading2.value = new Loading2();
    return Loading2;
  }();
  var Interactive = /* @__PURE__ */ function() {
    function Interactive2() {
    }
    ;
    Interactive2.value = new Interactive2();
    return Interactive2;
  }();
  var Complete = /* @__PURE__ */ function() {
    function Complete2() {
    }
    ;
    Complete2.value = new Complete2();
    return Complete2;
  }();
  var parse3 = function(v) {
    if (v === "loading") {
      return new Just(Loading.value);
    }
    ;
    if (v === "interactive") {
      return new Just(Interactive.value);
    }
    ;
    if (v === "complete") {
      return new Just(Complete.value);
    }
    ;
    return Nothing.value;
  };

  // output/Web.HTML.HTMLDocument/index.js
  var map14 = /* @__PURE__ */ map(functorEffect);
  var toParentNode = unsafeCoerce2;
  var toDocument = unsafeCoerce2;
  var readyState = function(doc) {
    return map14(function() {
      var $4 = fromMaybe(Loading.value);
      return function($5) {
        return $4(parse3($5));
      };
    }())(function() {
      return _readyState(doc);
    });
  };

  // output/Web.HTML.HTMLElement/foreign.js
  function _read(nothing, just, value19) {
    var tag = Object.prototype.toString.call(value19);
    if (tag.indexOf("[object HTML") === 0 && tag.indexOf("Element]") === tag.length - 8) {
      return just(value19);
    } else {
      return nothing;
    }
  }

  // output/Web.HTML.HTMLElement/index.js
  var toNode = unsafeCoerce2;
  var fromElement = function(x) {
    return _read(Nothing.value, Just.create, x);
  };

  // output/Web.HTML.Location/foreign.js
  function hash3(location2) {
    return function() {
      return location2.hash;
    };
  }
  function setHash(hash4) {
    return function(location2) {
      return function() {
        location2.hash = hash4;
      };
    };
  }

  // output/Web.HTML.Window/foreign.js
  function document(window2) {
    return function() {
      return window2.document;
    };
  }
  function location(window2) {
    return function() {
      return window2.location;
    };
  }
  function alert(str) {
    return function(window2) {
      return function() {
        window2.alert(str);
      };
    };
  }

  // output/Web.HTML.Window/index.js
  var toEventTarget = unsafeCoerce2;

  // output/Web.HTML.Event.HashChangeEvent.EventTypes/index.js
  var hashchange = "hashchange";

  // output/Routing.Hash/index.js
  var bind4 = /* @__PURE__ */ bind(bindEffect);
  var map15 = /* @__PURE__ */ map(functorEffect);
  var bindFlipped4 = /* @__PURE__ */ bindFlipped(bindEffect);
  var join2 = /* @__PURE__ */ join(bindEffect);
  var apply3 = /* @__PURE__ */ apply(applyEffect);
  var pure6 = /* @__PURE__ */ pure(applicativeEffect);
  var voidRight2 = /* @__PURE__ */ voidRight(functorEffect);
  var setHash2 = function(h) {
    return bind4(bind4(windowImpl)(location))(setHash(h));
  };
  var getHash = /* @__PURE__ */ bind4(/* @__PURE__ */ bind4(windowImpl)(location))(/* @__PURE__ */ function() {
    var $16 = map15(function() {
      var $18 = fromMaybe("");
      var $19 = stripPrefix("#");
      return function($20) {
        return $18($19($20));
      };
    }());
    return function($17) {
      return $16(hash3($17));
    };
  }());
  var foldHashes = function(cb) {
    return function(init4) {
      return function __do3() {
        var ref2 = bindFlipped4($$new)(bindFlipped4(init4)(getHash))();
        var win = map15(toEventTarget)(windowImpl)();
        var listener = eventListener(function(v) {
          return bindFlipped4(flip(write)(ref2))(join2(apply3(map15(cb)(read(ref2)))(getHash)));
        })();
        addEventListener(hashchange)(listener)(false)(win)();
        return removeEventListener(hashchange)(listener)(false)(win);
      };
    };
  };
  var matchesWith = function(dictFoldable) {
    var indexl2 = indexl(dictFoldable);
    return function(parser) {
      return function(cb) {
        var go2 = function(a2) {
          var $21 = maybe(pure6(a2))(function(b2) {
            return voidRight2(new Just(b2))(cb(a2)(b2));
          });
          var $22 = indexl2(0);
          return function($23) {
            return $21($22(parser($23)));
          };
        };
        return foldHashes(go2)(go2(Nothing.value));
      };
    };
  };

  // output/AppM/index.js
  var monadEffectAppM = /* @__PURE__ */ monadEffectReader(monadEffectAff);
  var liftEffect3 = /* @__PURE__ */ liftEffect(monadEffectAppM);
  var monadAskEnvAppM = /* @__PURE__ */ monadAskReaderT(monadAff);
  var monadAppM = /* @__PURE__ */ monadReaderT(monadAff);
  var navigateAppMRoute = {
    navigate: /* @__PURE__ */ function() {
      var $45 = print(routeCodec);
      return function($46) {
        return liftEffect3(setHash2($45($46)));
      };
    }(),
    Monad0: function() {
      return monadAppM;
    }
  };
  var monadAffAppM = /* @__PURE__ */ monadAffReader(monadAffAff);
  var bindAppM = /* @__PURE__ */ bindReaderT(bindAff);
  var bindFlipped5 = /* @__PURE__ */ bindFlipped(bindAppM);
  var applicativeAppM = /* @__PURE__ */ applicativeReaderT(applicativeAff);
  var pure7 = /* @__PURE__ */ pure(applicativeAppM);
  var logAppM = {
    logEntry: function(level) {
      return function(message2) {
        return bindFlipped5(function($47) {
          return pure7(function(v) {
            return {
              level,
              message: message2,
              timestamp: v
            };
          }($47));
        })(liftEffect3(nowDateTime));
      };
    },
    log: /* @__PURE__ */ function() {
      var $48 = log4(monadEffectAppM);
      var $49 = show(showRecord()()(showRecordFieldsCons({
        reflectSymbol: function() {
          return "level";
        }
      })(showRecordFieldsCons({
        reflectSymbol: function() {
          return "message";
        }
      })(showRecordFieldsConsNil({
        reflectSymbol: function() {
          return "timestamp";
        }
      })(showDateTime))(showString))(showLogLevel)));
      return function($50) {
        return $48($49($50));
      };
    }(),
    Monad0: function() {
      return monadAppM;
    }
  };
  var logonRouteAppMRoute = {
    logonRoute: function($51) {
      return pure7(function(v) {
        if (v instanceof PasswordPermanent) {
          return new Users(Nothing.value);
        }
        ;
        if (v instanceof PasswordTemporary) {
          return ChangePassword.value;
        }
        ;
        throw new Error("Failed pattern match at AppM (line 33, column 25 - line 35, column 46): " + [v.constructor.name]);
      }($51));
    },
    Monad0: function() {
      return monadAppM;
    }
  };
  var runAppM = function(env) {
    return function(v) {
      return runReaderT(v)(env);
    };
  };

  // output/CSS.String/index.js
  var fromString4 = function(dict) {
    return dict.fromString;
  };

  // output/Color/index.js
  var clamp2 = /* @__PURE__ */ clamp(ordInt);
  var max6 = /* @__PURE__ */ max(ordInt);
  var min5 = /* @__PURE__ */ min(ordInt);
  var clamp1 = /* @__PURE__ */ clamp(ordNumber);
  var show7 = /* @__PURE__ */ show(showNumber);
  var HSLA = /* @__PURE__ */ function() {
    function HSLA2(value0, value19, value24, value33) {
      this.value0 = value0;
      this.value1 = value19;
      this.value2 = value24;
      this.value3 = value33;
    }
    ;
    HSLA2.create = function(value0) {
      return function(value19) {
        return function(value24) {
          return function(value33) {
            return new HSLA2(value0, value19, value24, value33);
          };
        };
      };
    };
    return HSLA2;
  }();
  var modPos = function(x) {
    return function(y) {
      return remainder(remainder(x)(y) + y)(y);
    };
  };
  var rgba = function(red$prime) {
    return function(green$prime) {
      return function(blue$prime) {
        return function(alpha) {
          var red = clamp2(0)(255)(red$prime);
          var r = toNumber(red) / 255;
          var green = clamp2(0)(255)(green$prime);
          var g = toNumber(green) / 255;
          var blue = clamp2(0)(255)(blue$prime);
          var maxChroma = max6(max6(red)(green))(blue);
          var minChroma = min5(min5(red)(green))(blue);
          var chroma = maxChroma - minChroma | 0;
          var chroma$prime = toNumber(chroma) / 255;
          var lightness = toNumber(maxChroma + minChroma | 0) / (255 * 2);
          var saturation = function() {
            if (chroma === 0) {
              return 0;
            }
            ;
            if (otherwise) {
              return chroma$prime / (1 - abs(2 * lightness - 1));
            }
            ;
            throw new Error("Failed pattern match at Color (line 160, column 3 - line 162, column 64): " + []);
          }();
          var b2 = toNumber(blue) / 255;
          var hue$prime = function(v) {
            if (v === 0) {
              return 0;
            }
            ;
            if (maxChroma === red) {
              return modPos((g - b2) / chroma$prime)(6);
            }
            ;
            if (maxChroma === green) {
              return (b2 - r) / chroma$prime + 2;
            }
            ;
            if (otherwise) {
              return (r - g) / chroma$prime + 4;
            }
            ;
            throw new Error("Failed pattern match at Color (line 150, column 3 - line 150, column 15): " + [v.constructor.name]);
          };
          var hue = 60 * hue$prime(chroma);
          return new HSLA(hue, saturation, lightness, alpha);
        };
      };
    };
  };
  var rgb = function(r) {
    return function(g) {
      return function(b2) {
        return rgba(r)(g)(b2)(1);
      };
    };
  };
  var hsla = function(h) {
    return function(s) {
      return function(l) {
        return function(a2) {
          var s$prime = clamp1(0)(1)(s);
          var l$prime = clamp1(0)(1)(l);
          var a$prime = clamp1(0)(1)(a2);
          return new HSLA(h, s$prime, l$prime, a$prime);
        };
      };
    };
  };
  var hsl = function(h) {
    return function(s) {
      return function(l) {
        return hsla(h)(s)(l)(1);
      };
    };
  };
  var white = /* @__PURE__ */ hsl(0)(0)(1);
  var graytone = function(l) {
    return hsl(0)(0)(l);
  };
  var cssStringHSLA = function(v) {
    var toString4 = function(n) {
      return show7(toNumber(round2(100 * n)) / 100);
    };
    var saturation = toString4(v.value1 * 100) + "%";
    var lightness = toString4(v.value2 * 100) + "%";
    var hue = toString4(v.value0);
    var alpha = show7(v.value3);
    var $118 = v.value3 === 1;
    if ($118) {
      return "hsl(" + (hue + (", " + (saturation + (", " + (lightness + ")")))));
    }
    ;
    return "hsla(" + (hue + (", " + (saturation + (", " + (lightness + (", " + (alpha + ")")))))));
  };

  // output/Data.Profunctor.Strong/index.js
  var strongFn = {
    first: function(a2b) {
      return function(v) {
        return new Tuple(a2b(v.value0), v.value1);
      };
    },
    second: /* @__PURE__ */ map(functorTuple),
    Profunctor0: function() {
      return profunctorFn;
    }
  };
  var second2 = function(dict) {
    return dict.second;
  };

  // output/CSS.Property/index.js
  var map16 = /* @__PURE__ */ map(functorArray);
  var second3 = /* @__PURE__ */ second2(strongFn);
  var append12 = /* @__PURE__ */ append(semigroupArray);
  var lookup5 = /* @__PURE__ */ lookup(foldableArray)(eqString);
  var oneOf3 = /* @__PURE__ */ oneOf2(alternativeArray);
  var Prefixed = /* @__PURE__ */ function() {
    function Prefixed2(value0) {
      this.value0 = value0;
    }
    ;
    Prefixed2.create = function(value0) {
      return new Prefixed2(value0);
    };
    return Prefixed2;
  }();
  var Plain = /* @__PURE__ */ function() {
    function Plain2(value0) {
      this.value0 = value0;
    }
    ;
    Plain2.create = function(value0) {
      return new Plain2(value0);
    };
    return Plain2;
  }();
  var Value = function(x) {
    return x;
  };
  var Key = function(x) {
    return x;
  };
  var value12 = function(dict) {
    return dict.value;
  };
  var valValue = {
    value: /* @__PURE__ */ identity(categoryFn)
  };
  var semigroupPrefixed = {
    append: function(v) {
      return function(v1) {
        if (v instanceof Plain && v1 instanceof Plain) {
          return new Plain(v.value0 + v1.value0);
        }
        ;
        if (v instanceof Plain && v1 instanceof Prefixed) {
          return new Prefixed(map16(second3(function(v2) {
            return v.value0 + v2;
          }))(v1.value0));
        }
        ;
        if (v instanceof Prefixed && v1 instanceof Plain) {
          return new Prefixed(map16(second3(function(v2) {
            return v1.value0 + v2;
          }))(v.value0));
        }
        ;
        if (v instanceof Prefixed && v1 instanceof Prefixed) {
          return new Prefixed(append12(v.value0)(v1.value0));
        }
        ;
        throw new Error("Failed pattern match at CSS.Property (line 23, column 1 - line 27, column 59): " + [v.constructor.name, v1.constructor.name]);
      };
    }
  };
  var append22 = /* @__PURE__ */ append(semigroupPrefixed);
  var semigroupValue = {
    append: function(v) {
      return function(v1) {
        return append22(v)(v1);
      };
    }
  };
  var append32 = /* @__PURE__ */ append(semigroupValue);
  var quote = function(s) {
    return '"' + (s + '"');
  };
  var plain = function(v) {
    if (v instanceof Prefixed) {
      return fromMaybe("")(lookup5("")(v.value0));
    }
    ;
    if (v instanceof Plain) {
      return v.value0;
    }
    ;
    throw new Error("Failed pattern match at CSS.Property (line 32, column 1 - line 32, column 28): " + [v.constructor.name]);
  };
  var monoidPrefixed = /* @__PURE__ */ function() {
    return {
      mempty: new Plain(mempty(monoidString)),
      Semigroup0: function() {
        return semigroupPrefixed;
      }
    };
  }();
  var monoidValue = {
    mempty: /* @__PURE__ */ mempty(monoidPrefixed),
    Semigroup0: function() {
      return semigroupValue;
    }
  };
  var intercalate4 = /* @__PURE__ */ intercalate2(foldableArray)(monoidValue);
  var isStringPrefixed = /* @__PURE__ */ function() {
    return {
      fromString: Plain.create
    };
  }();
  var fromString5 = /* @__PURE__ */ fromString4(isStringPrefixed);
  var isStringValue = {
    fromString: function($141) {
      return Value(fromString5($141));
    }
  };
  var fromString1 = /* @__PURE__ */ fromString4(isStringValue);
  var valColor = {
    value: function($144) {
      return fromString1(cssStringHSLA($144));
    }
  };
  var valList = function(dictVal) {
    var value19 = value12(dictVal);
    return {
      value: function() {
        var $145 = intercalate4(fromString1(", "));
        return function($146) {
          return $145(function(v) {
            return map16(value19)(v);
          }($146));
        };
      }()
    };
  };
  var valNonEmpty = function(dictVal) {
    return {
      value: function() {
        var $147 = value12(valList(dictVal));
        return function($148) {
          return $147(oneOf3($148));
        };
      }()
    };
  };
  var valNumber = {
    value: /* @__PURE__ */ function() {
      var $149 = show(showNumber);
      return function($150) {
        return fromString1($149($150));
      };
    }()
  };
  var valString = {
    value: fromString1
  };
  var valTuple = function(dictVal) {
    var value19 = value12(dictVal);
    return function(dictVal1) {
      var value24 = value12(dictVal1);
      return {
        value: function(v) {
          return append32(value19(v.value0))(append32(fromString1(" "))(value24(v.value1)));
        }
      };
    };
  };
  var isStringKey = {
    fromString: function($151) {
      return Key(fromString5($151));
    }
  };
  var cast = function(v) {
    return v;
  };

  // output/CSS.Common/index.js
  var center = function(dict) {
    return dict.center;
  };
  var browsers = /* @__PURE__ */ function() {
    return new Prefixed([new Tuple("-webkit-", ""), new Tuple("-moz-", ""), new Tuple("-ms-", ""), new Tuple("-o-", ""), new Tuple("", "")]);
  }();

  // output/Data.Exists/index.js
  var runExists = unsafeCoerce2;
  var mkExists = unsafeCoerce2;

  // output/CSS.Size/index.js
  var append10 = /* @__PURE__ */ append(semigroupValue);
  var value13 = /* @__PURE__ */ value12(valNumber);
  var fromString6 = /* @__PURE__ */ fromString4(isStringValue);
  var show8 = /* @__PURE__ */ show(showNumber);
  var append23 = /* @__PURE__ */ append(semigroupPrefixed);
  var BasicSize = /* @__PURE__ */ function() {
    function BasicSize2(value0) {
      this.value0 = value0;
    }
    ;
    BasicSize2.create = function(value0) {
      return new BasicSize2(value0);
    };
    return BasicSize2;
  }();
  var SumSize = /* @__PURE__ */ function() {
    function SumSize2(value0, value19) {
      this.value0 = value0;
      this.value1 = value19;
    }
    ;
    SumSize2.create = function(value0) {
      return function(value19) {
        return new SumSize2(value0, value19);
      };
    };
    return SumSize2;
  }();
  var DiffSize = /* @__PURE__ */ function() {
    function DiffSize2(value0, value19) {
      this.value0 = value0;
      this.value1 = value19;
    }
    ;
    DiffSize2.create = function(value0) {
      return function(value19) {
        return new DiffSize2(value0, value19);
      };
    };
    return DiffSize2;
  }();
  var MultSize = /* @__PURE__ */ function() {
    function MultSize2(value0, value19) {
      this.value0 = value0;
      this.value1 = value19;
    }
    ;
    MultSize2.create = function(value0) {
      return function(value19) {
        return new MultSize2(value0, value19);
      };
    };
    return MultSize2;
  }();
  var DivSize = /* @__PURE__ */ function() {
    function DivSize2(value0, value19) {
      this.value0 = value0;
      this.value1 = value19;
    }
    ;
    DivSize2.create = function(value0) {
      return function(value19) {
        return new DivSize2(value0, value19);
      };
    };
    return DivSize2;
  }();
  var vw = function(i2) {
    return new BasicSize(append10(value13(i2))(fromString6("vw")));
  };
  var vh = function(i2) {
    return new BasicSize(append10(value13(i2))(fromString6("vh")));
  };
  var sizeToString = function(v) {
    if (v instanceof BasicSize) {
      return plain(v.value0);
    }
    ;
    if (v instanceof SumSize) {
      return runExists(function(a$prime) {
        return runExists(function(b$prime) {
          return "(" + (sizeToString(a$prime) + (" + " + (sizeToString(b$prime) + ")")));
        })(v.value1);
      })(v.value0);
    }
    ;
    if (v instanceof DiffSize) {
      return runExists(function(a$prime) {
        return runExists(function(b$prime) {
          return "(" + (sizeToString(a$prime) + (" - " + (sizeToString(b$prime) + ")")));
        })(v.value1);
      })(v.value0);
    }
    ;
    if (v instanceof MultSize) {
      return runExists(function(b$prime) {
        return "(" + (show8(v.value0) + (" * " + (sizeToString(b$prime) + ")")));
      })(v.value1);
    }
    ;
    if (v instanceof DivSize) {
      return runExists(function(b$prime) {
        return "(" + (sizeToString(b$prime) + (" / " + (show8(v.value0) + ")")));
      })(v.value1);
    }
    ;
    throw new Error("Failed pattern match at CSS.Size (line 29, column 1 - line 29, column 43): " + [v.constructor.name]);
  };
  var valSize = {
    value: function(v) {
      if (v instanceof BasicSize) {
        return v.value0;
      }
      ;
      return append23(browsers)(new Plain("calc" + sizeToString(v)));
    }
  };
  var rem2 = function(i2) {
    return new BasicSize(append10(value13(i2))(fromString6("rem")));
  };
  var px = function(i2) {
    return new BasicSize(append10(value13(i2))(fromString6("px")));
  };
  var pct = function(i2) {
    return new BasicSize(append10(value13(i2))(fromString6("%")));
  };

  // output/Control.Monad.Writer/index.js
  var unwrap3 = /* @__PURE__ */ unwrap();
  var runWriter = function($5) {
    return unwrap3(runWriterT($5));
  };
  var execWriter = function(m) {
    return snd(runWriter(m));
  };

  // output/CSS.Stylesheet/index.js
  var map17 = /* @__PURE__ */ map(/* @__PURE__ */ functorWriterT(functorIdentity));
  var apply4 = /* @__PURE__ */ apply(/* @__PURE__ */ applyWriterT(semigroupArray)(applyIdentity));
  var bind5 = /* @__PURE__ */ bind(/* @__PURE__ */ bindWriterT(semigroupArray)(bindIdentity));
  var Property = /* @__PURE__ */ function() {
    function Property3(value0, value19) {
      this.value0 = value0;
      this.value1 = value19;
    }
    ;
    Property3.create = function(value0) {
      return function(value19) {
        return new Property3(value0, value19);
      };
    };
    return Property3;
  }();
  var S = function(x) {
    return x;
  };
  var runS = function(v) {
    return execWriter(v);
  };
  var rule = /* @__PURE__ */ function() {
    var $340 = tell(monadTellWriterT(monoidArray)(monadIdentity));
    return function($341) {
      return S($340(singleton5($341)));
    };
  }();
  var key = function(dictVal) {
    var value19 = value12(dictVal);
    return function(k) {
      return function(v) {
        return rule(new Property(cast(k), value19(v)));
      };
    };
  };
  var prefixed = function(dictVal) {
    var key12 = key(dictVal);
    return function(xs) {
      return key12(xs);
    };
  };
  var functorStyleM = {
    map: function(f) {
      return function(v) {
        return map17(f)(v);
      };
    }
  };
  var applyStyleM = {
    apply: function(v) {
      return function(v1) {
        return apply4(v)(v1);
      };
    },
    Functor0: function() {
      return functorStyleM;
    }
  };
  var bindStyleM = {
    bind: function(v) {
      return function(f) {
        return bind5(v)(function($346) {
          return function(v1) {
            return v1;
          }(f($346));
        });
      };
    },
    Apply0: function() {
      return applyStyleM;
    }
  };

  // output/CSS.Font/index.js
  var fromString7 = /* @__PURE__ */ fromString4(isStringValue);
  var fromString12 = /* @__PURE__ */ fromString4(isStringKey);
  var key2 = /* @__PURE__ */ key(valValue);
  var value1 = /* @__PURE__ */ value12(/* @__PURE__ */ valList(valValue));
  var append11 = /* @__PURE__ */ append(semigroupArray);
  var map18 = /* @__PURE__ */ map(functorArray);
  var value22 = /* @__PURE__ */ value12(valString);
  var oneOf4 = /* @__PURE__ */ oneOf2(alternativeArray);
  var map19 = /* @__PURE__ */ map(/* @__PURE__ */ functorNonEmpty(functorArray));
  var valGenericFontFamily = {
    value: function(v) {
      return v;
    }
  };
  var value32 = /* @__PURE__ */ value12(valGenericFontFamily);
  var valFontWeight = {
    value: function(v) {
      return v;
    }
  };
  var sansSerif = /* @__PURE__ */ fromString7("sans-serif");
  var fontWeight = /* @__PURE__ */ key(valFontWeight)(/* @__PURE__ */ fromString12("font-weight"));
  var fontSize = /* @__PURE__ */ key(valSize)(/* @__PURE__ */ fromString12("font-size"));
  var fontFamily = function(a2) {
    return function(b2) {
      return key2(fromString12("font-family"))(value1(append11(map18(function($47) {
        return value22(quote($47));
      })(a2))(oneOf4(map19(value32)(b2)))));
    };
  };
  var color = /* @__PURE__ */ key(valColor)(/* @__PURE__ */ fromString12("color"));

  // output/Capability.Navigate/index.js
  var lift7 = /* @__PURE__ */ lift(monadTransHalogenM);
  var navigate = function(dict) {
    return dict.navigate;
  };
  var navigateHalogenM = function(dictNavigate) {
    return {
      navigate: function() {
        var $8 = lift7(dictNavigate.Monad0());
        var $9 = navigate(dictNavigate);
        return function($10) {
          return $8($9($10));
        };
      }(),
      Monad0: function() {
        return monadHalogenM;
      }
    };
  };

  // output/AppTheme/index.js
  var themeFont = /* @__PURE__ */ function() {
    return fontFamily(["Verdana"])(new NonEmpty(sansSerif, []));
  }();
  var themeColor = /* @__PURE__ */ rgb(0)(102)(117);
  var paperColor = /* @__PURE__ */ rgb(217)(102)(117);

  // output/CSS.Box/index.js
  var valTuple2 = /* @__PURE__ */ valTuple(valSize);
  var valTuple1 = /* @__PURE__ */ valTuple2(valSize);
  var value23 = /* @__PURE__ */ value12(valTuple1);
  var value42 = /* @__PURE__ */ value12(/* @__PURE__ */ valTuple(valValue)(valColor));
  var BoxShadow = function(x) {
    return x;
  };
  var valBoxShadow = {
    value: function(v) {
      return v;
    }
  };
  var shadow = function(x) {
    return function(y) {
      return BoxShadow(value23(new Tuple(x, y)));
    };
  };
  var bsColor = function(c) {
    return function(v) {
      return BoxShadow(value42(new Tuple(v, c)));
    };
  };
  var boxShadow = /* @__PURE__ */ function() {
    var $61 = prefixed(valValue)(append(semigroupPrefixed)(browsers)(fromString4(isStringPrefixed)("box-shadow")));
    var $62 = value12(valNonEmpty(valBoxShadow));
    return function($63) {
      return $61($62($63));
    };
  }();

  // output/CSS.Background/index.js
  var fromString13 = /* @__PURE__ */ fromString4(isStringKey);
  var key3 = /* @__PURE__ */ key(valColor);
  var backgroundColor = /* @__PURE__ */ key3(/* @__PURE__ */ fromString13("background-color"));

  // output/CSS.Cursor/index.js
  var fromString8 = /* @__PURE__ */ fromString4(isStringValue);
  var Default = /* @__PURE__ */ function() {
    function Default2() {
    }
    ;
    Default2.value = new Default2();
    return Default2;
  }();
  var Help = /* @__PURE__ */ function() {
    function Help2() {
    }
    ;
    Help2.value = new Help2();
    return Help2;
  }();
  var Pointer = /* @__PURE__ */ function() {
    function Pointer2() {
    }
    ;
    Pointer2.value = new Pointer2();
    return Pointer2;
  }();
  var Progress = /* @__PURE__ */ function() {
    function Progress2() {
    }
    ;
    Progress2.value = new Progress2();
    return Progress2;
  }();
  var Wait = /* @__PURE__ */ function() {
    function Wait2() {
    }
    ;
    Wait2.value = new Wait2();
    return Wait2;
  }();
  var Cell = /* @__PURE__ */ function() {
    function Cell2() {
    }
    ;
    Cell2.value = new Cell2();
    return Cell2;
  }();
  var Crosshair = /* @__PURE__ */ function() {
    function Crosshair2() {
    }
    ;
    Crosshair2.value = new Crosshair2();
    return Crosshair2;
  }();
  var Text = /* @__PURE__ */ function() {
    function Text3() {
    }
    ;
    Text3.value = new Text3();
    return Text3;
  }();
  var VerticalText = /* @__PURE__ */ function() {
    function VerticalText2() {
    }
    ;
    VerticalText2.value = new VerticalText2();
    return VerticalText2;
  }();
  var Alias = /* @__PURE__ */ function() {
    function Alias2() {
    }
    ;
    Alias2.value = new Alias2();
    return Alias2;
  }();
  var Copy = /* @__PURE__ */ function() {
    function Copy2() {
    }
    ;
    Copy2.value = new Copy2();
    return Copy2;
  }();
  var Move = /* @__PURE__ */ function() {
    function Move2() {
    }
    ;
    Move2.value = new Move2();
    return Move2;
  }();
  var NoDrop = /* @__PURE__ */ function() {
    function NoDrop2() {
    }
    ;
    NoDrop2.value = new NoDrop2();
    return NoDrop2;
  }();
  var NotAllowed = /* @__PURE__ */ function() {
    function NotAllowed2() {
    }
    ;
    NotAllowed2.value = new NotAllowed2();
    return NotAllowed2;
  }();
  var Grab = /* @__PURE__ */ function() {
    function Grab2() {
    }
    ;
    Grab2.value = new Grab2();
    return Grab2;
  }();
  var Grabbing = /* @__PURE__ */ function() {
    function Grabbing2() {
    }
    ;
    Grabbing2.value = new Grabbing2();
    return Grabbing2;
  }();
  var AllScroll = /* @__PURE__ */ function() {
    function AllScroll2() {
    }
    ;
    AllScroll2.value = new AllScroll2();
    return AllScroll2;
  }();
  var ColResize = /* @__PURE__ */ function() {
    function ColResize2() {
    }
    ;
    ColResize2.value = new ColResize2();
    return ColResize2;
  }();
  var RowResize = /* @__PURE__ */ function() {
    function RowResize2() {
    }
    ;
    RowResize2.value = new RowResize2();
    return RowResize2;
  }();
  var NResize = /* @__PURE__ */ function() {
    function NResize2() {
    }
    ;
    NResize2.value = new NResize2();
    return NResize2;
  }();
  var EResize = /* @__PURE__ */ function() {
    function EResize2() {
    }
    ;
    EResize2.value = new EResize2();
    return EResize2;
  }();
  var SResize = /* @__PURE__ */ function() {
    function SResize2() {
    }
    ;
    SResize2.value = new SResize2();
    return SResize2;
  }();
  var WResize = /* @__PURE__ */ function() {
    function WResize2() {
    }
    ;
    WResize2.value = new WResize2();
    return WResize2;
  }();
  var NEResize = /* @__PURE__ */ function() {
    function NEResize2() {
    }
    ;
    NEResize2.value = new NEResize2();
    return NEResize2;
  }();
  var NWResize = /* @__PURE__ */ function() {
    function NWResize2() {
    }
    ;
    NWResize2.value = new NWResize2();
    return NWResize2;
  }();
  var SEResize = /* @__PURE__ */ function() {
    function SEResize2() {
    }
    ;
    SEResize2.value = new SEResize2();
    return SEResize2;
  }();
  var SWResize = /* @__PURE__ */ function() {
    function SWResize2() {
    }
    ;
    SWResize2.value = new SWResize2();
    return SWResize2;
  }();
  var EWResize = /* @__PURE__ */ function() {
    function EWResize2() {
    }
    ;
    EWResize2.value = new EWResize2();
    return EWResize2;
  }();
  var NSResize = /* @__PURE__ */ function() {
    function NSResize2() {
    }
    ;
    NSResize2.value = new NSResize2();
    return NSResize2;
  }();
  var NESWResize = /* @__PURE__ */ function() {
    function NESWResize2() {
    }
    ;
    NESWResize2.value = new NESWResize2();
    return NESWResize2;
  }();
  var NWSEResize = /* @__PURE__ */ function() {
    function NWSEResize2() {
    }
    ;
    NWSEResize2.value = new NWSEResize2();
    return NWSEResize2;
  }();
  var ZoomIn = /* @__PURE__ */ function() {
    function ZoomIn2() {
    }
    ;
    ZoomIn2.value = new ZoomIn2();
    return ZoomIn2;
  }();
  var ZoomOut = /* @__PURE__ */ function() {
    function ZoomOut2() {
    }
    ;
    ZoomOut2.value = new ZoomOut2();
    return ZoomOut2;
  }();
  var valCursor = {
    value: function(v) {
      if (v instanceof Default) {
        return fromString8("default");
      }
      ;
      if (v instanceof Help) {
        return fromString8("help");
      }
      ;
      if (v instanceof Pointer) {
        return fromString8("pointer");
      }
      ;
      if (v instanceof Progress) {
        return fromString8("progress");
      }
      ;
      if (v instanceof Wait) {
        return fromString8("wait");
      }
      ;
      if (v instanceof Cell) {
        return fromString8("cell");
      }
      ;
      if (v instanceof Crosshair) {
        return fromString8("crosshair");
      }
      ;
      if (v instanceof Text) {
        return fromString8("text");
      }
      ;
      if (v instanceof VerticalText) {
        return fromString8("vertical-text");
      }
      ;
      if (v instanceof Alias) {
        return fromString8("alias");
      }
      ;
      if (v instanceof Copy) {
        return fromString8("copy");
      }
      ;
      if (v instanceof Move) {
        return fromString8("move");
      }
      ;
      if (v instanceof NoDrop) {
        return fromString8("no-drop");
      }
      ;
      if (v instanceof NotAllowed) {
        return fromString8("not-allowed");
      }
      ;
      if (v instanceof Grab) {
        return fromString8("grab");
      }
      ;
      if (v instanceof Grabbing) {
        return fromString8("grabbing");
      }
      ;
      if (v instanceof AllScroll) {
        return fromString8("all-scroll");
      }
      ;
      if (v instanceof ColResize) {
        return fromString8("col-resize");
      }
      ;
      if (v instanceof RowResize) {
        return fromString8("row-resize");
      }
      ;
      if (v instanceof NResize) {
        return fromString8("n-resize");
      }
      ;
      if (v instanceof EResize) {
        return fromString8("e-resize");
      }
      ;
      if (v instanceof SResize) {
        return fromString8("s-resize");
      }
      ;
      if (v instanceof WResize) {
        return fromString8("w-resize");
      }
      ;
      if (v instanceof NEResize) {
        return fromString8("ne-resize");
      }
      ;
      if (v instanceof NWResize) {
        return fromString8("nw-resize");
      }
      ;
      if (v instanceof SEResize) {
        return fromString8("se-resize");
      }
      ;
      if (v instanceof SWResize) {
        return fromString8("sw-resize");
      }
      ;
      if (v instanceof EWResize) {
        return fromString8("ew-resize");
      }
      ;
      if (v instanceof NSResize) {
        return fromString8("ns-resize");
      }
      ;
      if (v instanceof NESWResize) {
        return fromString8("nesw-resize");
      }
      ;
      if (v instanceof NWSEResize) {
        return fromString8("nwse-resize");
      }
      ;
      if (v instanceof ZoomIn) {
        return fromString8("zoom-in");
      }
      ;
      if (v instanceof ZoomOut) {
        return fromString8("zoom-out");
      }
      ;
      throw new Error("Failed pattern match at CSS.Cursor (line 47, column 1 - line 80, column 40): " + [v.constructor.name]);
    }
  };
  var pointer = /* @__PURE__ */ function() {
    return Pointer.value;
  }();
  var notAllowed = /* @__PURE__ */ function() {
    return NotAllowed.value;
  }();
  var cursor = /* @__PURE__ */ key(valCursor)(/* @__PURE__ */ fromString4(isStringKey)("cursor"));

  // output/CSS.Display/index.js
  var fromString9 = /* @__PURE__ */ fromString4(isStringKey);
  var fromString14 = /* @__PURE__ */ fromString4(isStringValue);
  var zIndex = /* @__PURE__ */ function() {
    var $64 = key(valString)(fromString9("z-index"));
    var $65 = show(showInt);
    return function($66) {
      return $64($65($66));
    };
  }();
  var valPosition = {
    value: function(v) {
      return v;
    }
  };
  var valDisplay = {
    value: function(v) {
      return v;
    }
  };
  var position2 = /* @__PURE__ */ key(valPosition)(/* @__PURE__ */ fromString9("position"));
  var flex = /* @__PURE__ */ fromString14("flex");
  var fixed = /* @__PURE__ */ fromString14("fixed");
  var display = /* @__PURE__ */ key(valDisplay)(/* @__PURE__ */ fromString9("display"));

  // output/CSS.Flexbox/index.js
  var fromString10 = /* @__PURE__ */ fromString4(isStringValue);
  var key4 = /* @__PURE__ */ key(valValue);
  var fromString15 = /* @__PURE__ */ fromString4(isStringKey);
  var show14 = /* @__PURE__ */ show(showNumber);
  var JustifyContentValue = function(x) {
    return x;
  };
  var AlignItemsValue = function(x) {
    return x;
  };
  var valJustifyContentValue = {
    value: function(v) {
      return v;
    }
  };
  var valFlexDirection = {
    value: function(v) {
      return v;
    }
  };
  var valAlignItemsValue = {
    value: function(v) {
      return v;
    }
  };
  var row = /* @__PURE__ */ fromString10("row");
  var justifyContent = /* @__PURE__ */ key(valJustifyContentValue)(/* @__PURE__ */ fromString15("justify-content"));
  var isStringJustifyContentValue = {
    fromString: function($116) {
      return JustifyContentValue(fromString10($116));
    }
  };
  var fromString22 = /* @__PURE__ */ fromString4(isStringJustifyContentValue);
  var isStringAlignItemsValue = {
    fromString: function($118) {
      return AlignItemsValue(fromString10($118));
    }
  };
  var fromString42 = /* @__PURE__ */ fromString4(isStringAlignItemsValue);
  var flexStartJustifyContentValue = {
    flexStart: /* @__PURE__ */ fromString22("flex-start")
  };
  var flexStart = function(dict) {
    return dict.flexStart;
  };
  var flexShrink = function(i2) {
    return key4(fromString15("flex-shrink"))(fromString10(show14(i2)));
  };
  var flexGrow = function(i2) {
    return key4(fromString15("flex-grow"))(fromString10(show14(i2)));
  };
  var flexEndJustifyContentValue = {
    flexEnd: /* @__PURE__ */ fromString22("flex-end")
  };
  var flexEnd = function(dict) {
    return dict.flexEnd;
  };
  var flexDirection = /* @__PURE__ */ key(valFlexDirection)(/* @__PURE__ */ fromString15("flex-direction"));
  var flexBasis = /* @__PURE__ */ key(valSize)(/* @__PURE__ */ fromString15("flex-basis"));
  var column = /* @__PURE__ */ fromString10("column");
  var centerJustifyContentValue = {
    center: /* @__PURE__ */ fromString22("center")
  };
  var centerAlignItemsValue = {
    center: /* @__PURE__ */ fromString42("center")
  };
  var alignItems = /* @__PURE__ */ key(valAlignItemsValue)(/* @__PURE__ */ fromString15("align-items"));

  // output/CSS.Geometry/index.js
  var key5 = /* @__PURE__ */ key(valSize);
  var fromString11 = /* @__PURE__ */ fromString4(isStringKey);
  var valTuple3 = /* @__PURE__ */ valTuple(valSize)(valSize);
  var key1 = /* @__PURE__ */ key(/* @__PURE__ */ valTuple(valTuple3)(valTuple3));
  var width8 = /* @__PURE__ */ key5(/* @__PURE__ */ fromString11("width"));
  var top3 = /* @__PURE__ */ key5(/* @__PURE__ */ fromString11("top"));
  var paddingTop = /* @__PURE__ */ key5(/* @__PURE__ */ fromString11("padding-top"));
  var paddingRight = /* @__PURE__ */ key5(/* @__PURE__ */ fromString11("padding-right"));
  var paddingLeft = /* @__PURE__ */ key5(/* @__PURE__ */ fromString11("padding-left"));
  var paddingBottom = /* @__PURE__ */ key5(/* @__PURE__ */ fromString11("padding-bottom"));
  var padding = function(a2) {
    return function(b2) {
      return function(c) {
        return function(d) {
          return key1(fromString11("padding"))(new Tuple(new Tuple(a2, b2), new Tuple(c, d)));
        };
      };
    };
  };
  var minHeight = /* @__PURE__ */ key5(/* @__PURE__ */ fromString11("min-height"));
  var height8 = /* @__PURE__ */ key5(/* @__PURE__ */ fromString11("height"));

  // output/Data.Coyoneda/index.js
  var CoyonedaF = /* @__PURE__ */ function() {
    function CoyonedaF2(value0, value19) {
      this.value0 = value0;
      this.value1 = value19;
    }
    ;
    CoyonedaF2.create = function(value0) {
      return function(value19) {
        return new CoyonedaF2(value0, value19);
      };
    };
    return CoyonedaF2;
  }();
  var unCoyoneda = function(f) {
    return function(v) {
      return runExists(function(v1) {
        return f(v1.value0)(v1.value1);
      })(v);
    };
  };
  var coyoneda = function(k) {
    return function(fi) {
      return mkExists(new CoyonedaF(k, fi));
    };
  };
  var functorCoyoneda = {
    map: function(f) {
      return function(v) {
        return runExists(function(v1) {
          return coyoneda(function($180) {
            return f(v1.value0($180));
          })(v1.value1);
        })(v);
      };
    }
  };
  var liftCoyoneda = /* @__PURE__ */ coyoneda(/* @__PURE__ */ identity(categoryFn));

  // output/DOM.HTML.Indexed.InputType/index.js
  var InputButton = /* @__PURE__ */ function() {
    function InputButton2() {
    }
    ;
    InputButton2.value = new InputButton2();
    return InputButton2;
  }();
  var InputCheckbox = /* @__PURE__ */ function() {
    function InputCheckbox2() {
    }
    ;
    InputCheckbox2.value = new InputCheckbox2();
    return InputCheckbox2;
  }();
  var InputColor = /* @__PURE__ */ function() {
    function InputColor2() {
    }
    ;
    InputColor2.value = new InputColor2();
    return InputColor2;
  }();
  var InputDate = /* @__PURE__ */ function() {
    function InputDate2() {
    }
    ;
    InputDate2.value = new InputDate2();
    return InputDate2;
  }();
  var InputDatetimeLocal = /* @__PURE__ */ function() {
    function InputDatetimeLocal2() {
    }
    ;
    InputDatetimeLocal2.value = new InputDatetimeLocal2();
    return InputDatetimeLocal2;
  }();
  var InputEmail = /* @__PURE__ */ function() {
    function InputEmail2() {
    }
    ;
    InputEmail2.value = new InputEmail2();
    return InputEmail2;
  }();
  var InputFile = /* @__PURE__ */ function() {
    function InputFile2() {
    }
    ;
    InputFile2.value = new InputFile2();
    return InputFile2;
  }();
  var InputHidden = /* @__PURE__ */ function() {
    function InputHidden2() {
    }
    ;
    InputHidden2.value = new InputHidden2();
    return InputHidden2;
  }();
  var InputImage = /* @__PURE__ */ function() {
    function InputImage2() {
    }
    ;
    InputImage2.value = new InputImage2();
    return InputImage2;
  }();
  var InputMonth = /* @__PURE__ */ function() {
    function InputMonth2() {
    }
    ;
    InputMonth2.value = new InputMonth2();
    return InputMonth2;
  }();
  var InputNumber = /* @__PURE__ */ function() {
    function InputNumber2() {
    }
    ;
    InputNumber2.value = new InputNumber2();
    return InputNumber2;
  }();
  var InputPassword = /* @__PURE__ */ function() {
    function InputPassword2() {
    }
    ;
    InputPassword2.value = new InputPassword2();
    return InputPassword2;
  }();
  var InputRadio = /* @__PURE__ */ function() {
    function InputRadio2() {
    }
    ;
    InputRadio2.value = new InputRadio2();
    return InputRadio2;
  }();
  var InputRange = /* @__PURE__ */ function() {
    function InputRange2() {
    }
    ;
    InputRange2.value = new InputRange2();
    return InputRange2;
  }();
  var InputReset = /* @__PURE__ */ function() {
    function InputReset2() {
    }
    ;
    InputReset2.value = new InputReset2();
    return InputReset2;
  }();
  var InputSearch = /* @__PURE__ */ function() {
    function InputSearch2() {
    }
    ;
    InputSearch2.value = new InputSearch2();
    return InputSearch2;
  }();
  var InputSubmit = /* @__PURE__ */ function() {
    function InputSubmit2() {
    }
    ;
    InputSubmit2.value = new InputSubmit2();
    return InputSubmit2;
  }();
  var InputTel = /* @__PURE__ */ function() {
    function InputTel2() {
    }
    ;
    InputTel2.value = new InputTel2();
    return InputTel2;
  }();
  var InputText = /* @__PURE__ */ function() {
    function InputText2() {
    }
    ;
    InputText2.value = new InputText2();
    return InputText2;
  }();
  var InputTime = /* @__PURE__ */ function() {
    function InputTime2() {
    }
    ;
    InputTime2.value = new InputTime2();
    return InputTime2;
  }();
  var InputUrl = /* @__PURE__ */ function() {
    function InputUrl2() {
    }
    ;
    InputUrl2.value = new InputUrl2();
    return InputUrl2;
  }();
  var InputWeek = /* @__PURE__ */ function() {
    function InputWeek2() {
    }
    ;
    InputWeek2.value = new InputWeek2();
    return InputWeek2;
  }();
  var renderInputType = function(v) {
    if (v instanceof InputButton) {
      return "button";
    }
    ;
    if (v instanceof InputCheckbox) {
      return "checkbox";
    }
    ;
    if (v instanceof InputColor) {
      return "color";
    }
    ;
    if (v instanceof InputDate) {
      return "date";
    }
    ;
    if (v instanceof InputDatetimeLocal) {
      return "datetime-local";
    }
    ;
    if (v instanceof InputEmail) {
      return "email";
    }
    ;
    if (v instanceof InputFile) {
      return "file";
    }
    ;
    if (v instanceof InputHidden) {
      return "hidden";
    }
    ;
    if (v instanceof InputImage) {
      return "image";
    }
    ;
    if (v instanceof InputMonth) {
      return "month";
    }
    ;
    if (v instanceof InputNumber) {
      return "number";
    }
    ;
    if (v instanceof InputPassword) {
      return "password";
    }
    ;
    if (v instanceof InputRadio) {
      return "radio";
    }
    ;
    if (v instanceof InputRange) {
      return "range";
    }
    ;
    if (v instanceof InputReset) {
      return "reset";
    }
    ;
    if (v instanceof InputSearch) {
      return "search";
    }
    ;
    if (v instanceof InputSubmit) {
      return "submit";
    }
    ;
    if (v instanceof InputTel) {
      return "tel";
    }
    ;
    if (v instanceof InputText) {
      return "text";
    }
    ;
    if (v instanceof InputTime) {
      return "time";
    }
    ;
    if (v instanceof InputUrl) {
      return "url";
    }
    ;
    if (v instanceof InputWeek) {
      return "week";
    }
    ;
    throw new Error("Failed pattern match at DOM.HTML.Indexed.InputType (line 33, column 19 - line 55, column 22): " + [v.constructor.name]);
  };

  // output/Halogen.Query.Input/index.js
  var RefUpdate = /* @__PURE__ */ function() {
    function RefUpdate2(value0, value19) {
      this.value0 = value0;
      this.value1 = value19;
    }
    ;
    RefUpdate2.create = function(value0) {
      return function(value19) {
        return new RefUpdate2(value0, value19);
      };
    };
    return RefUpdate2;
  }();
  var Action = /* @__PURE__ */ function() {
    function Action3(value0) {
      this.value0 = value0;
    }
    ;
    Action3.create = function(value0) {
      return new Action3(value0);
    };
    return Action3;
  }();
  var functorInput = {
    map: function(f) {
      return function(m) {
        if (m instanceof RefUpdate) {
          return new RefUpdate(m.value0, m.value1);
        }
        ;
        if (m instanceof Action) {
          return new Action(f(m.value0));
        }
        ;
        throw new Error("Failed pattern match at Halogen.Query.Input (line 0, column 0 - line 0, column 0): " + [m.constructor.name]);
      };
    }
  };

  // output/Halogen.VDom.Machine/index.js
  var Step = /* @__PURE__ */ function() {
    function Step3(value0, value19, value24, value33) {
      this.value0 = value0;
      this.value1 = value19;
      this.value2 = value24;
      this.value3 = value33;
    }
    ;
    Step3.create = function(value0) {
      return function(value19) {
        return function(value24) {
          return function(value33) {
            return new Step3(value0, value19, value24, value33);
          };
        };
      };
    };
    return Step3;
  }();
  var unStep = unsafeCoerce2;
  var step3 = function(v, a2) {
    return v.value2(v.value1, a2);
  };
  var mkStep = unsafeCoerce2;
  var halt = function(v) {
    return v.value3(v.value1);
  };
  var extract2 = /* @__PURE__ */ unStep(function(v) {
    return v.value0;
  });

  // output/Halogen.VDom.Types/index.js
  var map20 = /* @__PURE__ */ map(functorArray);
  var map110 = /* @__PURE__ */ map(functorTuple);
  var Text2 = /* @__PURE__ */ function() {
    function Text3(value0) {
      this.value0 = value0;
    }
    ;
    Text3.create = function(value0) {
      return new Text3(value0);
    };
    return Text3;
  }();
  var Elem = /* @__PURE__ */ function() {
    function Elem3(value0, value19, value24, value33) {
      this.value0 = value0;
      this.value1 = value19;
      this.value2 = value24;
      this.value3 = value33;
    }
    ;
    Elem3.create = function(value0) {
      return function(value19) {
        return function(value24) {
          return function(value33) {
            return new Elem3(value0, value19, value24, value33);
          };
        };
      };
    };
    return Elem3;
  }();
  var Keyed = /* @__PURE__ */ function() {
    function Keyed2(value0, value19, value24, value33) {
      this.value0 = value0;
      this.value1 = value19;
      this.value2 = value24;
      this.value3 = value33;
    }
    ;
    Keyed2.create = function(value0) {
      return function(value19) {
        return function(value24) {
          return function(value33) {
            return new Keyed2(value0, value19, value24, value33);
          };
        };
      };
    };
    return Keyed2;
  }();
  var Widget = /* @__PURE__ */ function() {
    function Widget2(value0) {
      this.value0 = value0;
    }
    ;
    Widget2.create = function(value0) {
      return new Widget2(value0);
    };
    return Widget2;
  }();
  var Grafted = /* @__PURE__ */ function() {
    function Grafted2(value0) {
      this.value0 = value0;
    }
    ;
    Grafted2.create = function(value0) {
      return new Grafted2(value0);
    };
    return Grafted2;
  }();
  var Graft = /* @__PURE__ */ function() {
    function Graft2(value0, value19, value24) {
      this.value0 = value0;
      this.value1 = value19;
      this.value2 = value24;
    }
    ;
    Graft2.create = function(value0) {
      return function(value19) {
        return function(value24) {
          return new Graft2(value0, value19, value24);
        };
      };
    };
    return Graft2;
  }();
  var unGraft = function(f) {
    return function($61) {
      return f($61);
    };
  };
  var graft = unsafeCoerce2;
  var bifunctorGraft = {
    bimap: function(f) {
      return function(g) {
        return unGraft(function(v) {
          return graft(new Graft(function($63) {
            return f(v.value0($63));
          }, function($64) {
            return g(v.value1($64));
          }, v.value2));
        });
      };
    }
  };
  var bimap2 = /* @__PURE__ */ bimap(bifunctorGraft);
  var bifunctorVDom = {
    bimap: function(v) {
      return function(v1) {
        return function(v2) {
          if (v2 instanceof Text2) {
            return new Text2(v2.value0);
          }
          ;
          if (v2 instanceof Grafted) {
            return new Grafted(bimap2(v)(v1)(v2.value0));
          }
          ;
          return new Grafted(graft(new Graft(v, v1, v2)));
        };
      };
    }
  };
  var runGraft = /* @__PURE__ */ unGraft(function(v) {
    var go2 = function(v2) {
      if (v2 instanceof Text2) {
        return new Text2(v2.value0);
      }
      ;
      if (v2 instanceof Elem) {
        return new Elem(v2.value0, v2.value1, v.value0(v2.value2), map20(go2)(v2.value3));
      }
      ;
      if (v2 instanceof Keyed) {
        return new Keyed(v2.value0, v2.value1, v.value0(v2.value2), map20(map110(go2))(v2.value3));
      }
      ;
      if (v2 instanceof Widget) {
        return new Widget(v.value1(v2.value0));
      }
      ;
      if (v2 instanceof Grafted) {
        return new Grafted(bimap2(v.value0)(v.value1)(v2.value0));
      }
      ;
      throw new Error("Failed pattern match at Halogen.VDom.Types (line 86, column 7 - line 86, column 27): " + [v2.constructor.name]);
    };
    return go2(v.value2);
  });

  // output/Halogen.VDom.Util/foreign.js
  function unsafeGetAny(key7, obj) {
    return obj[key7];
  }
  function unsafeHasAny(key7, obj) {
    return obj.hasOwnProperty(key7);
  }
  function unsafeSetAny(key7, val, obj) {
    obj[key7] = val;
  }
  function forE2(a2, f) {
    var b2 = [];
    for (var i2 = 0; i2 < a2.length; i2++) {
      b2.push(f(i2, a2[i2]));
    }
    return b2;
  }
  function forEachE(a2, f) {
    for (var i2 = 0; i2 < a2.length; i2++) {
      f(a2[i2]);
    }
  }
  function forInE(o, f) {
    var ks = Object.keys(o);
    for (var i2 = 0; i2 < ks.length; i2++) {
      var k = ks[i2];
      f(k, o[k]);
    }
  }
  function diffWithIxE(a1, a2, f1, f2, f3) {
    var a3 = [];
    var l1 = a1.length;
    var l2 = a2.length;
    var i2 = 0;
    while (1) {
      if (i2 < l1) {
        if (i2 < l2) {
          a3.push(f1(i2, a1[i2], a2[i2]));
        } else {
          f2(i2, a1[i2]);
        }
      } else if (i2 < l2) {
        a3.push(f3(i2, a2[i2]));
      } else {
        break;
      }
      i2++;
    }
    return a3;
  }
  function strMapWithIxE(as2, fk, f) {
    var o = {};
    for (var i2 = 0; i2 < as2.length; i2++) {
      var a2 = as2[i2];
      var k = fk(a2);
      o[k] = f(k, i2, a2);
    }
    return o;
  }
  function diffWithKeyAndIxE(o1, as2, fk, f1, f2, f3) {
    var o2 = {};
    for (var i2 = 0; i2 < as2.length; i2++) {
      var a2 = as2[i2];
      var k = fk(a2);
      if (o1.hasOwnProperty(k)) {
        o2[k] = f1(k, i2, o1[k], a2);
      } else {
        o2[k] = f3(k, i2, a2);
      }
    }
    for (var k in o1) {
      if (k in o2) {
        continue;
      }
      f2(k, o1[k]);
    }
    return o2;
  }
  function refEq2(a2, b2) {
    return a2 === b2;
  }
  function createTextNode(s, doc) {
    return doc.createTextNode(s);
  }
  function setTextContent(s, n) {
    n.textContent = s;
  }
  function createElement(ns, name16, doc) {
    if (ns != null) {
      return doc.createElementNS(ns, name16);
    } else {
      return doc.createElement(name16);
    }
  }
  function insertChildIx(i2, a2, b2) {
    var n = b2.childNodes.item(i2) || null;
    if (n !== a2) {
      b2.insertBefore(a2, n);
    }
  }
  function removeChild(a2, b2) {
    if (b2 && a2.parentNode === b2) {
      b2.removeChild(a2);
    }
  }
  function parentNode(a2) {
    return a2.parentNode;
  }
  function setAttribute(ns, attr3, val, el) {
    if (ns != null) {
      el.setAttributeNS(ns, attr3, val);
    } else {
      el.setAttribute(attr3, val);
    }
  }
  function removeAttribute(ns, attr3, el) {
    if (ns != null) {
      el.removeAttributeNS(ns, attr3);
    } else {
      el.removeAttribute(attr3);
    }
  }
  function hasAttribute(ns, attr3, el) {
    if (ns != null) {
      return el.hasAttributeNS(ns, attr3);
    } else {
      return el.hasAttribute(attr3);
    }
  }
  function addEventListener2(ev, listener, el) {
    el.addEventListener(ev, listener, false);
  }
  function removeEventListener2(ev, listener, el) {
    el.removeEventListener(ev, listener, false);
  }
  var jsUndefined = void 0;

  // output/Foreign.Object.ST/foreign.js
  var newImpl = function() {
    return {};
  };
  function poke2(k) {
    return function(v) {
      return function(m) {
        return function() {
          m[k] = v;
          return m;
        };
      };
    };
  }

  // output/Halogen.VDom.Util/index.js
  var unsafeLookup = unsafeGetAny;
  var unsafeFreeze2 = unsafeCoerce2;
  var pokeMutMap = unsafeSetAny;
  var newMutMap = newImpl;

  // output/Web.DOM.Element/foreign.js
  var getProp = function(name16) {
    return function(doctype) {
      return doctype[name16];
    };
  };
  var _namespaceURI = getProp("namespaceURI");
  var _prefix = getProp("prefix");
  var localName = getProp("localName");
  var tagName = getProp("tagName");

  // output/Web.DOM.ParentNode/foreign.js
  var getEffProp = function(name16) {
    return function(node) {
      return function() {
        return node[name16];
      };
    };
  };
  var children = getEffProp("children");
  var _firstElementChild = getEffProp("firstElementChild");
  var _lastElementChild = getEffProp("lastElementChild");
  var childElementCount = getEffProp("childElementCount");
  function _querySelector(selector) {
    return function(node) {
      return function() {
        return node.querySelector(selector);
      };
    };
  }

  // output/Web.DOM.ParentNode/index.js
  var map21 = /* @__PURE__ */ map(functorEffect);
  var querySelector = function(qs) {
    var $2 = map21(toMaybe);
    var $3 = _querySelector(qs);
    return function($4) {
      return $2($3($4));
    };
  };

  // output/Web.DOM.Element/index.js
  var toNode2 = unsafeCoerce2;

  // output/Halogen.VDom.DOM/index.js
  var $runtime_lazy6 = function(name16, moduleName, init4) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name16 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init4();
      state3 = 2;
      return val;
    };
  };
  var haltWidget = function(v) {
    return halt(v.widget);
  };
  var $lazy_patchWidget = /* @__PURE__ */ $runtime_lazy6("patchWidget", "Halogen.VDom.DOM", function() {
    return function(state3, vdom) {
      if (vdom instanceof Grafted) {
        return $lazy_patchWidget(291)(state3, runGraft(vdom.value0));
      }
      ;
      if (vdom instanceof Widget) {
        var res = step3(state3.widget, vdom.value0);
        var res$prime = unStep(function(v) {
          return mkStep(new Step(v.value0, {
            build: state3.build,
            widget: res
          }, $lazy_patchWidget(296), haltWidget));
        })(res);
        return res$prime;
      }
      ;
      haltWidget(state3);
      return state3.build(vdom);
    };
  });
  var patchWidget = /* @__PURE__ */ $lazy_patchWidget(286);
  var haltText = function(v) {
    var parent2 = parentNode(v.node);
    return removeChild(v.node, parent2);
  };
  var $lazy_patchText = /* @__PURE__ */ $runtime_lazy6("patchText", "Halogen.VDom.DOM", function() {
    return function(state3, vdom) {
      if (vdom instanceof Grafted) {
        return $lazy_patchText(82)(state3, runGraft(vdom.value0));
      }
      ;
      if (vdom instanceof Text2) {
        if (state3.value === vdom.value0) {
          return mkStep(new Step(state3.node, state3, $lazy_patchText(85), haltText));
        }
        ;
        if (otherwise) {
          var nextState = {
            build: state3.build,
            node: state3.node,
            value: vdom.value0
          };
          setTextContent(vdom.value0, state3.node);
          return mkStep(new Step(state3.node, nextState, $lazy_patchText(89), haltText));
        }
        ;
      }
      ;
      haltText(state3);
      return state3.build(vdom);
    };
  });
  var patchText = /* @__PURE__ */ $lazy_patchText(77);
  var haltKeyed = function(v) {
    var parent2 = parentNode(v.node);
    removeChild(v.node, parent2);
    forInE(v.children, function(v1, s) {
      return halt(s);
    });
    return halt(v.attrs);
  };
  var haltElem = function(v) {
    var parent2 = parentNode(v.node);
    removeChild(v.node, parent2);
    forEachE(v.children, halt);
    return halt(v.attrs);
  };
  var eqElemSpec = function(ns1, v, ns2, v1) {
    var $63 = v === v1;
    if ($63) {
      if (ns1 instanceof Just && (ns2 instanceof Just && ns1.value0 === ns2.value0)) {
        return true;
      }
      ;
      if (ns1 instanceof Nothing && ns2 instanceof Nothing) {
        return true;
      }
      ;
      return false;
    }
    ;
    return false;
  };
  var $lazy_patchElem = /* @__PURE__ */ $runtime_lazy6("patchElem", "Halogen.VDom.DOM", function() {
    return function(state3, vdom) {
      if (vdom instanceof Grafted) {
        return $lazy_patchElem(135)(state3, runGraft(vdom.value0));
      }
      ;
      if (vdom instanceof Elem && eqElemSpec(state3.ns, state3.name, vdom.value0, vdom.value1)) {
        var v = length3(vdom.value3);
        var v1 = length3(state3.children);
        if (v1 === 0 && v === 0) {
          var attrs2 = step3(state3.attrs, vdom.value2);
          var nextState = {
            build: state3.build,
            node: state3.node,
            attrs: attrs2,
            ns: vdom.value0,
            name: vdom.value1,
            children: state3.children
          };
          return mkStep(new Step(state3.node, nextState, $lazy_patchElem(149), haltElem));
        }
        ;
        var onThis = function(v2, s) {
          return halt(s);
        };
        var onThese = function(ix, s, v2) {
          var res = step3(s, v2);
          insertChildIx(ix, extract2(res), state3.node);
          return res;
        };
        var onThat = function(ix, v2) {
          var res = state3.build(v2);
          insertChildIx(ix, extract2(res), state3.node);
          return res;
        };
        var children2 = diffWithIxE(state3.children, vdom.value3, onThese, onThis, onThat);
        var attrs2 = step3(state3.attrs, vdom.value2);
        var nextState = {
          build: state3.build,
          node: state3.node,
          attrs: attrs2,
          ns: vdom.value0,
          name: vdom.value1,
          children: children2
        };
        return mkStep(new Step(state3.node, nextState, $lazy_patchElem(172), haltElem));
      }
      ;
      haltElem(state3);
      return state3.build(vdom);
    };
  });
  var patchElem = /* @__PURE__ */ $lazy_patchElem(130);
  var $lazy_patchKeyed = /* @__PURE__ */ $runtime_lazy6("patchKeyed", "Halogen.VDom.DOM", function() {
    return function(state3, vdom) {
      if (vdom instanceof Grafted) {
        return $lazy_patchKeyed(222)(state3, runGraft(vdom.value0));
      }
      ;
      if (vdom instanceof Keyed && eqElemSpec(state3.ns, state3.name, vdom.value0, vdom.value1)) {
        var v = length3(vdom.value3);
        if (state3.length === 0 && v === 0) {
          var attrs2 = step3(state3.attrs, vdom.value2);
          var nextState = {
            build: state3.build,
            node: state3.node,
            attrs: attrs2,
            ns: vdom.value0,
            name: vdom.value1,
            children: state3.children,
            length: 0
          };
          return mkStep(new Step(state3.node, nextState, $lazy_patchKeyed(237), haltKeyed));
        }
        ;
        var onThis = function(v2, s) {
          return halt(s);
        };
        var onThese = function(v2, ix$prime, s, v3) {
          var res = step3(s, v3.value1);
          insertChildIx(ix$prime, extract2(res), state3.node);
          return res;
        };
        var onThat = function(v2, ix, v3) {
          var res = state3.build(v3.value1);
          insertChildIx(ix, extract2(res), state3.node);
          return res;
        };
        var children2 = diffWithKeyAndIxE(state3.children, vdom.value3, fst, onThese, onThis, onThat);
        var attrs2 = step3(state3.attrs, vdom.value2);
        var nextState = {
          build: state3.build,
          node: state3.node,
          attrs: attrs2,
          ns: vdom.value0,
          name: vdom.value1,
          children: children2,
          length: v
        };
        return mkStep(new Step(state3.node, nextState, $lazy_patchKeyed(261), haltKeyed));
      }
      ;
      haltKeyed(state3);
      return state3.build(vdom);
    };
  });
  var patchKeyed = /* @__PURE__ */ $lazy_patchKeyed(217);
  var buildWidget = function(v, build, w) {
    var res = v.buildWidget(v)(w);
    var res$prime = unStep(function(v1) {
      return mkStep(new Step(v1.value0, {
        build,
        widget: res
      }, patchWidget, haltWidget));
    })(res);
    return res$prime;
  };
  var buildText = function(v, build, s) {
    var node = createTextNode(s, v.document);
    var state3 = {
      build,
      node,
      value: s
    };
    return mkStep(new Step(node, state3, patchText, haltText));
  };
  var buildKeyed = function(v, build, ns1, name1, as1, ch1) {
    var el = createElement(toNullable(ns1), name1, v.document);
    var node = toNode2(el);
    var onChild = function(v1, ix, v2) {
      var res = build(v2.value1);
      insertChildIx(ix, extract2(res), node);
      return res;
    };
    var children2 = strMapWithIxE(ch1, fst, onChild);
    var attrs = v.buildAttributes(el)(as1);
    var state3 = {
      build,
      node,
      attrs,
      ns: ns1,
      name: name1,
      children: children2,
      length: length3(ch1)
    };
    return mkStep(new Step(node, state3, patchKeyed, haltKeyed));
  };
  var buildElem = function(v, build, ns1, name1, as1, ch1) {
    var el = createElement(toNullable(ns1), name1, v.document);
    var node = toNode2(el);
    var onChild = function(ix, child2) {
      var res = build(child2);
      insertChildIx(ix, extract2(res), node);
      return res;
    };
    var children2 = forE2(ch1, onChild);
    var attrs = v.buildAttributes(el)(as1);
    var state3 = {
      build,
      node,
      attrs,
      ns: ns1,
      name: name1,
      children: children2
    };
    return mkStep(new Step(node, state3, patchElem, haltElem));
  };
  var buildVDom = function(spec) {
    var $lazy_build = $runtime_lazy6("build", "Halogen.VDom.DOM", function() {
      return function(v) {
        if (v instanceof Text2) {
          return buildText(spec, $lazy_build(59), v.value0);
        }
        ;
        if (v instanceof Elem) {
          return buildElem(spec, $lazy_build(60), v.value0, v.value1, v.value2, v.value3);
        }
        ;
        if (v instanceof Keyed) {
          return buildKeyed(spec, $lazy_build(61), v.value0, v.value1, v.value2, v.value3);
        }
        ;
        if (v instanceof Widget) {
          return buildWidget(spec, $lazy_build(62), v.value0);
        }
        ;
        if (v instanceof Grafted) {
          return $lazy_build(63)(runGraft(v.value0));
        }
        ;
        throw new Error("Failed pattern match at Halogen.VDom.DOM (line 58, column 27 - line 63, column 52): " + [v.constructor.name]);
      };
    });
    var build = $lazy_build(58);
    return build;
  };

  // output/Foreign/foreign.js
  function typeOf(value19) {
    return typeof value19;
  }
  function tagOf(value19) {
    return Object.prototype.toString.call(value19).slice(8, -1);
  }
  var isArray = Array.isArray || function(value19) {
    return Object.prototype.toString.call(value19) === "[object Array]";
  };

  // output/Foreign/index.js
  var show9 = /* @__PURE__ */ show(showString);
  var show15 = /* @__PURE__ */ show(showInt);
  var ForeignError = /* @__PURE__ */ function() {
    function ForeignError2(value0) {
      this.value0 = value0;
    }
    ;
    ForeignError2.create = function(value0) {
      return new ForeignError2(value0);
    };
    return ForeignError2;
  }();
  var TypeMismatch = /* @__PURE__ */ function() {
    function TypeMismatch3(value0, value19) {
      this.value0 = value0;
      this.value1 = value19;
    }
    ;
    TypeMismatch3.create = function(value0) {
      return function(value19) {
        return new TypeMismatch3(value0, value19);
      };
    };
    return TypeMismatch3;
  }();
  var ErrorAtIndex = /* @__PURE__ */ function() {
    function ErrorAtIndex2(value0, value19) {
      this.value0 = value0;
      this.value1 = value19;
    }
    ;
    ErrorAtIndex2.create = function(value0) {
      return function(value19) {
        return new ErrorAtIndex2(value0, value19);
      };
    };
    return ErrorAtIndex2;
  }();
  var ErrorAtProperty = /* @__PURE__ */ function() {
    function ErrorAtProperty2(value0, value19) {
      this.value0 = value0;
      this.value1 = value19;
    }
    ;
    ErrorAtProperty2.create = function(value0) {
      return function(value19) {
        return new ErrorAtProperty2(value0, value19);
      };
    };
    return ErrorAtProperty2;
  }();
  var unsafeToForeign = unsafeCoerce2;
  var unsafeFromForeign = unsafeCoerce2;
  var renderForeignError = function(v) {
    if (v instanceof ForeignError) {
      return v.value0;
    }
    ;
    if (v instanceof ErrorAtIndex) {
      return "Error at array index " + (show15(v.value0) + (": " + renderForeignError(v.value1)));
    }
    ;
    if (v instanceof ErrorAtProperty) {
      return "Error at property " + (show9(v.value0) + (": " + renderForeignError(v.value1)));
    }
    ;
    if (v instanceof TypeMismatch) {
      return "Type mismatch: expected " + (v.value0 + (", found " + v.value1));
    }
    ;
    throw new Error("Failed pattern match at Foreign (line 78, column 1 - line 78, column 45): " + [v.constructor.name]);
  };
  var fail = function(dictMonad) {
    var $153 = throwError(monadThrowExceptT(dictMonad));
    return function($154) {
      return $153(singleton3($154));
    };
  };
  var unsafeReadTagged = function(dictMonad) {
    var pure18 = pure(applicativeExceptT(dictMonad));
    var fail1 = fail(dictMonad);
    return function(tag) {
      return function(value19) {
        if (tagOf(value19) === tag) {
          return pure18(unsafeFromForeign(value19));
        }
        ;
        if (otherwise) {
          return fail1(new TypeMismatch(tag, tagOf(value19)));
        }
        ;
        throw new Error("Failed pattern match at Foreign (line 123, column 1 - line 123, column 104): " + [tag.constructor.name, value19.constructor.name]);
      };
    };
  };
  var readString = function(dictMonad) {
    return unsafeReadTagged(dictMonad)("String");
  };

  // output/Foreign.Object/foreign.js
  function _copyST(m) {
    return function() {
      var r = {};
      for (var k in m) {
        if (hasOwnProperty.call(m, k)) {
          r[k] = m[k];
        }
      }
      return r;
    };
  }
  var empty6 = {};
  function runST(f) {
    return f();
  }
  function _foldM(bind18) {
    return function(f) {
      return function(mz) {
        return function(m) {
          var acc = mz;
          function g(k2) {
            return function(z) {
              return f(z)(k2)(m[k2]);
            };
          }
          for (var k in m) {
            if (hasOwnProperty.call(m, k)) {
              acc = bind18(acc)(g(k));
            }
          }
          return acc;
        };
      };
    };
  }
  function _lookup(no, yes, k, m) {
    return k in m ? yes(m[k]) : no;
  }
  function toArrayWithKey(f) {
    return function(m) {
      var r = [];
      for (var k in m) {
        if (hasOwnProperty.call(m, k)) {
          r.push(f(k)(m[k]));
        }
      }
      return r;
    };
  }
  var keys = Object.keys || toArrayWithKey(function(k) {
    return function() {
      return k;
    };
  });

  // output/Foreign.Object/index.js
  var $$void5 = /* @__PURE__ */ $$void(functorST);
  var thawST = _copyST;
  var mutate = function(f) {
    return function(m) {
      return runST(function __do3() {
        var s = thawST(m)();
        f(s)();
        return s;
      });
    };
  };
  var lookup6 = /* @__PURE__ */ function() {
    return runFn4(_lookup)(Nothing.value)(Just.create);
  }();
  var insert5 = function(k) {
    return function(v) {
      return mutate(poke2(k)(v));
    };
  };
  var fromFoldable4 = function(dictFoldable) {
    var fromFoldable1 = fromFoldable2(dictFoldable);
    return function(l) {
      return runST(function __do3() {
        var s = newImpl();
        foreach(fromFoldable1(l))(function(v) {
          return $$void5(poke2(v.value0)(v.value1)(s));
        })();
        return s;
      });
    };
  };
  var fold2 = /* @__PURE__ */ _foldM(applyFlipped);
  var foldMap3 = function(dictMonoid) {
    var append13 = append(dictMonoid.Semigroup0());
    var mempty3 = mempty(dictMonoid);
    return function(f) {
      return fold2(function(acc) {
        return function(k) {
          return function(v) {
            return append13(acc)(f(k)(v));
          };
        };
      })(mempty3);
    };
  };

  // output/Halogen.VDom.DOM.Prop/index.js
  var $runtime_lazy7 = function(name16, moduleName, init4) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name16 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init4();
      state3 = 2;
      return val;
    };
  };
  var map23 = /* @__PURE__ */ map(functorFn);
  var map111 = /* @__PURE__ */ map(functorMaybe);
  var Created = /* @__PURE__ */ function() {
    function Created2(value0) {
      this.value0 = value0;
    }
    ;
    Created2.create = function(value0) {
      return new Created2(value0);
    };
    return Created2;
  }();
  var Removed = /* @__PURE__ */ function() {
    function Removed2(value0) {
      this.value0 = value0;
    }
    ;
    Removed2.create = function(value0) {
      return new Removed2(value0);
    };
    return Removed2;
  }();
  var Attribute = /* @__PURE__ */ function() {
    function Attribute2(value0, value19, value24) {
      this.value0 = value0;
      this.value1 = value19;
      this.value2 = value24;
    }
    ;
    Attribute2.create = function(value0) {
      return function(value19) {
        return function(value24) {
          return new Attribute2(value0, value19, value24);
        };
      };
    };
    return Attribute2;
  }();
  var Property2 = /* @__PURE__ */ function() {
    function Property3(value0, value19) {
      this.value0 = value0;
      this.value1 = value19;
    }
    ;
    Property3.create = function(value0) {
      return function(value19) {
        return new Property3(value0, value19);
      };
    };
    return Property3;
  }();
  var Handler = /* @__PURE__ */ function() {
    function Handler2(value0, value19) {
      this.value0 = value0;
      this.value1 = value19;
    }
    ;
    Handler2.create = function(value0) {
      return function(value19) {
        return new Handler2(value0, value19);
      };
    };
    return Handler2;
  }();
  var Ref = /* @__PURE__ */ function() {
    function Ref2(value0) {
      this.value0 = value0;
    }
    ;
    Ref2.create = function(value0) {
      return new Ref2(value0);
    };
    return Ref2;
  }();
  var unsafeGetProperty = unsafeGetAny;
  var setProperty = unsafeSetAny;
  var removeProperty = function(key7, el) {
    var v = hasAttribute(nullImpl, key7, el);
    if (v) {
      return removeAttribute(nullImpl, key7, el);
    }
    ;
    var v1 = typeOf(unsafeGetAny(key7, el));
    if (v1 === "string") {
      return unsafeSetAny(key7, "", el);
    }
    ;
    if (key7 === "rowSpan") {
      return unsafeSetAny(key7, 1, el);
    }
    ;
    if (key7 === "colSpan") {
      return unsafeSetAny(key7, 1, el);
    }
    ;
    return unsafeSetAny(key7, jsUndefined, el);
  };
  var propToStrKey = function(v) {
    if (v instanceof Attribute && v.value0 instanceof Just) {
      return "attr/" + (v.value0.value0 + (":" + v.value1));
    }
    ;
    if (v instanceof Attribute) {
      return "attr/:" + v.value1;
    }
    ;
    if (v instanceof Property2) {
      return "prop/" + v.value0;
    }
    ;
    if (v instanceof Handler) {
      return "handler/" + v.value0;
    }
    ;
    if (v instanceof Ref) {
      return "ref";
    }
    ;
    throw new Error("Failed pattern match at Halogen.VDom.DOM.Prop (line 182, column 16 - line 187, column 16): " + [v.constructor.name]);
  };
  var propFromString = unsafeCoerce2;
  var propFromBoolean = unsafeCoerce2;
  var functorProp = {
    map: function(v) {
      return function(v1) {
        if (v1 instanceof Handler) {
          return new Handler(v1.value0, map23(map111(v))(v1.value1));
        }
        ;
        if (v1 instanceof Ref) {
          return new Ref(map23(map111(v))(v1.value0));
        }
        ;
        return v1;
      };
    }
  };
  var buildProp = function(emit) {
    return function(el) {
      var removeProp = function(prevEvents) {
        return function(v, v1) {
          if (v1 instanceof Attribute) {
            return removeAttribute(toNullable(v1.value0), v1.value1, el);
          }
          ;
          if (v1 instanceof Property2) {
            return removeProperty(v1.value0, el);
          }
          ;
          if (v1 instanceof Handler) {
            var handler3 = unsafeLookup(v1.value0, prevEvents);
            return removeEventListener2(v1.value0, fst(handler3), el);
          }
          ;
          if (v1 instanceof Ref) {
            return unit;
          }
          ;
          throw new Error("Failed pattern match at Halogen.VDom.DOM.Prop (line 169, column 5 - line 179, column 18): " + [v1.constructor.name]);
        };
      };
      var mbEmit = function(v) {
        if (v instanceof Just) {
          return emit(v.value0)();
        }
        ;
        return unit;
      };
      var haltProp = function(state3) {
        var v = lookup6("ref")(state3.props);
        if (v instanceof Just && v.value0 instanceof Ref) {
          return mbEmit(v.value0.value0(new Removed(el)));
        }
        ;
        return unit;
      };
      var diffProp = function(prevEvents, events) {
        return function(v, v1, v11, v2) {
          if (v11 instanceof Attribute && v2 instanceof Attribute) {
            var $66 = v11.value2 === v2.value2;
            if ($66) {
              return v2;
            }
            ;
            setAttribute(toNullable(v2.value0), v2.value1, v2.value2, el);
            return v2;
          }
          ;
          if (v11 instanceof Property2 && v2 instanceof Property2) {
            var v4 = refEq2(v11.value1, v2.value1);
            if (v4) {
              return v2;
            }
            ;
            if (v2.value0 === "value") {
              var elVal = unsafeGetProperty("value", el);
              var $75 = refEq2(elVal, v2.value1);
              if ($75) {
                return v2;
              }
              ;
              setProperty(v2.value0, v2.value1, el);
              return v2;
            }
            ;
            setProperty(v2.value0, v2.value1, el);
            return v2;
          }
          ;
          if (v11 instanceof Handler && v2 instanceof Handler) {
            var handler3 = unsafeLookup(v2.value0, prevEvents);
            write(v2.value1)(snd(handler3))();
            pokeMutMap(v2.value0, handler3, events);
            return v2;
          }
          ;
          return v2;
        };
      };
      var applyProp = function(events) {
        return function(v, v1, v2) {
          if (v2 instanceof Attribute) {
            setAttribute(toNullable(v2.value0), v2.value1, v2.value2, el);
            return v2;
          }
          ;
          if (v2 instanceof Property2) {
            setProperty(v2.value0, v2.value1, el);
            return v2;
          }
          ;
          if (v2 instanceof Handler) {
            var v3 = unsafeGetAny(v2.value0, events);
            if (unsafeHasAny(v2.value0, events)) {
              write(v2.value1)(snd(v3))();
              return v2;
            }
            ;
            var ref2 = $$new(v2.value1)();
            var listener = eventListener(function(ev) {
              return function __do3() {
                var f$prime = read(ref2)();
                return mbEmit(f$prime(ev));
              };
            })();
            pokeMutMap(v2.value0, new Tuple(listener, ref2), events);
            addEventListener2(v2.value0, listener, el);
            return v2;
          }
          ;
          if (v2 instanceof Ref) {
            mbEmit(v2.value0(new Created(el)));
            return v2;
          }
          ;
          throw new Error("Failed pattern match at Halogen.VDom.DOM.Prop (line 113, column 5 - line 135, column 15): " + [v2.constructor.name]);
        };
      };
      var $lazy_patchProp = $runtime_lazy7("patchProp", "Halogen.VDom.DOM.Prop", function() {
        return function(state3, ps2) {
          var events = newMutMap();
          var onThis = removeProp(state3.events);
          var onThese = diffProp(state3.events, events);
          var onThat = applyProp(events);
          var props = diffWithKeyAndIxE(state3.props, ps2, propToStrKey, onThese, onThis, onThat);
          var nextState = {
            events: unsafeFreeze2(events),
            props
          };
          return mkStep(new Step(unit, nextState, $lazy_patchProp(100), haltProp));
        };
      });
      var patchProp = $lazy_patchProp(87);
      var renderProp = function(ps1) {
        var events = newMutMap();
        var ps1$prime = strMapWithIxE(ps1, propToStrKey, applyProp(events));
        var state3 = {
          events: unsafeFreeze2(events),
          props: ps1$prime
        };
        return mkStep(new Step(unit, state3, patchProp, haltProp));
      };
      return renderProp;
    };
  };

  // output/Halogen.HTML.Core/index.js
  var map24 = /* @__PURE__ */ map(functorArray);
  var map112 = /* @__PURE__ */ map(functorProp);
  var map25 = /* @__PURE__ */ map(functorInput);
  var bimap3 = /* @__PURE__ */ bimap(bifunctorVDom);
  var HTML = function(x) {
    return x;
  };
  var widget = function($28) {
    return HTML(Widget.create($28));
  };
  var toPropValue = function(dict) {
    return dict.toPropValue;
  };
  var text5 = function($29) {
    return HTML(Text2.create($29));
  };
  var prop = function(dictIsProp) {
    var toPropValue1 = toPropValue(dictIsProp);
    return function(v) {
      var $31 = Property2.create(v);
      return function($32) {
        return $31(toPropValue1($32));
      };
    };
  };
  var isPropString = {
    toPropValue: propFromString
  };
  var isPropInputType = {
    toPropValue: function($45) {
      return propFromString(renderInputType($45));
    }
  };
  var isPropBoolean = {
    toPropValue: propFromBoolean
  };
  var handler = /* @__PURE__ */ function() {
    return Handler.create;
  }();
  var element = function(ns) {
    return function(name16) {
      return function(props) {
        return function(children2) {
          return new Elem(ns, name16, props, children2);
        };
      };
    };
  };
  var bifunctorHTML = {
    bimap: function(f) {
      return function(g) {
        return function(v) {
          return bimap3(map24(map112(map25(g))))(f)(v);
        };
      };
    }
  };
  var attr = function(ns) {
    return function(v) {
      return Attribute.create(ns)(v);
    };
  };

  // output/Halogen.Query.HalogenQ/index.js
  var Initialize = /* @__PURE__ */ function() {
    function Initialize2(value0) {
      this.value0 = value0;
    }
    ;
    Initialize2.create = function(value0) {
      return new Initialize2(value0);
    };
    return Initialize2;
  }();
  var Finalize = /* @__PURE__ */ function() {
    function Finalize2(value0) {
      this.value0 = value0;
    }
    ;
    Finalize2.create = function(value0) {
      return new Finalize2(value0);
    };
    return Finalize2;
  }();
  var Receive = /* @__PURE__ */ function() {
    function Receive2(value0, value19) {
      this.value0 = value0;
      this.value1 = value19;
    }
    ;
    Receive2.create = function(value0) {
      return function(value19) {
        return new Receive2(value0, value19);
      };
    };
    return Receive2;
  }();
  var Action2 = /* @__PURE__ */ function() {
    function Action3(value0, value19) {
      this.value0 = value0;
      this.value1 = value19;
    }
    ;
    Action3.create = function(value0) {
      return function(value19) {
        return new Action3(value0, value19);
      };
    };
    return Action3;
  }();
  var Query2 = /* @__PURE__ */ function() {
    function Query4(value0, value19) {
      this.value0 = value0;
      this.value1 = value19;
    }
    ;
    Query4.create = function(value0) {
      return function(value19) {
        return new Query4(value0, value19);
      };
    };
    return Query4;
  }();

  // output/Halogen.VDom.Thunk/index.js
  var $runtime_lazy8 = function(name16, moduleName, init4) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name16 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init4();
      state3 = 2;
      return val;
    };
  };
  var Thunk = /* @__PURE__ */ function() {
    function Thunk2(value0, value19, value24, value33) {
      this.value0 = value0;
      this.value1 = value19;
      this.value2 = value24;
      this.value3 = value33;
    }
    ;
    Thunk2.create = function(value0) {
      return function(value19) {
        return function(value24) {
          return function(value33) {
            return new Thunk2(value0, value19, value24, value33);
          };
        };
      };
    };
    return Thunk2;
  }();
  var unsafeEqThunk = function(v, v1) {
    return refEq2(v.value0, v1.value0) && (refEq2(v.value1, v1.value1) && v.value1(v.value3, v1.value3));
  };
  var runThunk = function(v) {
    return v.value2(v.value3);
  };
  var mapThunk = function(k) {
    return function(v) {
      return new Thunk(v.value0, v.value1, function($51) {
        return k(v.value2($51));
      }, v.value3);
    };
  };
  var hoist2 = mapThunk;
  var buildThunk = function(toVDom) {
    var haltThunk = function(state3) {
      return halt(state3.vdom);
    };
    var $lazy_patchThunk = $runtime_lazy8("patchThunk", "Halogen.VDom.Thunk", function() {
      return function(state3, t2) {
        var $48 = unsafeEqThunk(state3.thunk, t2);
        if ($48) {
          return mkStep(new Step(extract2(state3.vdom), state3, $lazy_patchThunk(112), haltThunk));
        }
        ;
        var vdom = step3(state3.vdom, toVDom(runThunk(t2)));
        return mkStep(new Step(extract2(vdom), {
          vdom,
          thunk: t2
        }, $lazy_patchThunk(115), haltThunk));
      };
    });
    var patchThunk = $lazy_patchThunk(108);
    var renderThunk = function(spec) {
      return function(t) {
        var vdom = buildVDom(spec)(toVDom(runThunk(t)));
        return mkStep(new Step(extract2(vdom), {
          thunk: t,
          vdom
        }, patchThunk, haltThunk));
      };
    };
    return renderThunk;
  };

  // output/Halogen.Component/index.js
  var voidLeft2 = /* @__PURE__ */ voidLeft(functorHalogenM);
  var traverse_3 = /* @__PURE__ */ traverse_(applicativeHalogenM)(foldableMaybe);
  var map26 = /* @__PURE__ */ map(functorHalogenM);
  var lmap2 = /* @__PURE__ */ lmap(bifunctorHTML);
  var pure8 = /* @__PURE__ */ pure(applicativeHalogenM);
  var lookup7 = /* @__PURE__ */ lookup3();
  var pop3 = /* @__PURE__ */ pop2();
  var insert6 = /* @__PURE__ */ insert2();
  var ComponentSlot = /* @__PURE__ */ function() {
    function ComponentSlot2(value0) {
      this.value0 = value0;
    }
    ;
    ComponentSlot2.create = function(value0) {
      return new ComponentSlot2(value0);
    };
    return ComponentSlot2;
  }();
  var ThunkSlot = /* @__PURE__ */ function() {
    function ThunkSlot2(value0) {
      this.value0 = value0;
    }
    ;
    ThunkSlot2.create = function(value0) {
      return new ThunkSlot2(value0);
    };
    return ThunkSlot2;
  }();
  var unComponentSlot = unsafeCoerce2;
  var unComponent = unsafeCoerce2;
  var mkEval = function(args) {
    return function(v) {
      if (v instanceof Initialize) {
        return voidLeft2(traverse_3(args.handleAction)(args.initialize))(v.value0);
      }
      ;
      if (v instanceof Finalize) {
        return voidLeft2(traverse_3(args.handleAction)(args.finalize))(v.value0);
      }
      ;
      if (v instanceof Receive) {
        return voidLeft2(traverse_3(args.handleAction)(args.receive(v.value0)))(v.value1);
      }
      ;
      if (v instanceof Action2) {
        return voidLeft2(args.handleAction(v.value0))(v.value1);
      }
      ;
      if (v instanceof Query2) {
        return unCoyoneda(function(g) {
          var $45 = map26(maybe(v.value1(unit))(g));
          return function($46) {
            return $45(args.handleQuery($46));
          };
        })(v.value0);
      }
      ;
      throw new Error("Failed pattern match at Halogen.Component (line 182, column 15 - line 192, column 71): " + [v.constructor.name]);
    };
  };
  var mkComponentSlot = unsafeCoerce2;
  var mkComponent = unsafeCoerce2;
  var hoistSlot = function(dictFunctor) {
    return function(nat) {
      return function(v) {
        if (v instanceof ComponentSlot) {
          return unComponentSlot(function(slot4) {
            return new ComponentSlot(mkComponentSlot({
              get: slot4.get,
              pop: slot4.pop,
              set: slot4.set,
              component: hoist3(dictFunctor)(nat)(slot4.component),
              input: slot4.input,
              output: slot4.output
            }));
          })(v.value0);
        }
        ;
        if (v instanceof ThunkSlot) {
          return new ThunkSlot(hoist2(lmap2(hoistSlot(dictFunctor)(nat)))(v.value0));
        }
        ;
        throw new Error("Failed pattern match at Halogen.Component (line 279, column 17 - line 284, column 53): " + [v.constructor.name]);
      };
    };
  };
  var hoist3 = function(dictFunctor) {
    var hoist1 = hoist(dictFunctor);
    return function(nat) {
      return unComponent(function(c) {
        return mkComponent({
          initialState: c.initialState,
          render: function() {
            var $47 = lmap2(hoistSlot(dictFunctor)(nat));
            return function($48) {
              return $47(c.render($48));
            };
          }(),
          "eval": function() {
            var $49 = hoist1(nat);
            return function($50) {
              return $49(c["eval"]($50));
            };
          }()
        });
      });
    };
  };
  var defaultEval = /* @__PURE__ */ function() {
    return {
      handleAction: $$const(pure8(unit)),
      handleQuery: $$const(pure8(Nothing.value)),
      receive: $$const(Nothing.value),
      initialize: Nothing.value,
      finalize: Nothing.value
    };
  }();
  var componentSlot = function() {
    return function(dictIsSymbol) {
      var lookup13 = lookup7(dictIsSymbol);
      var pop12 = pop3(dictIsSymbol);
      var insert13 = insert6(dictIsSymbol);
      return function(dictOrd) {
        var lookup23 = lookup13(dictOrd);
        var pop22 = pop12(dictOrd);
        var insert22 = insert13(dictOrd);
        return function(label5) {
          return function(p2) {
            return function(comp) {
              return function(input3) {
                return function(output2) {
                  return mkComponentSlot({
                    get: lookup23(label5)(p2),
                    pop: pop22(label5)(p2),
                    set: insert22(label5)(p2),
                    component: comp,
                    input: input3,
                    output: output2
                  });
                };
              };
            };
          };
        };
      };
    };
  };

  // output/CSS.Render/index.js
  var map27 = /* @__PURE__ */ map(functorArray);
  var lookup8 = /* @__PURE__ */ lookup(foldableArray)(eqString);
  var collect$prime = function(v) {
    return function(v1) {
      if (v instanceof Plain && v1 instanceof Plain) {
        return [new Right(new Tuple(v.value0, v1.value0))];
      }
      ;
      if (v instanceof Prefixed && v1 instanceof Plain) {
        return map27(function(v3) {
          return new Right(new Tuple(v3.value0 + v3.value1, v1.value0));
        })(v.value0);
      }
      ;
      if (v instanceof Plain && v1 instanceof Prefixed) {
        return map27(function(v2) {
          return new Right(new Tuple(v.value0, v2.value0 + v2.value1));
        })(v1.value0);
      }
      ;
      if (v instanceof Prefixed && v1 instanceof Prefixed) {
        return map27(function(v2) {
          return maybe(new Left(v2.value0 + v2.value1))(function() {
            var $213 = Tuple.create(v2.value0 + v2.value1);
            return function($214) {
              return Right.create($213(function(v3) {
                return v2.value0 + v3;
              }($214)));
            };
          }())(lookup8(v2.value0)(v1.value0));
        })(v.value0);
      }
      ;
      throw new Error("Failed pattern match at CSS.Render (line 158, column 1 - line 158, column 80): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var collect2 = function(v) {
    return collect$prime(v.value0)(v.value1);
  };

  // output/Halogen.HTML.Elements/index.js
  var element3 = /* @__PURE__ */ function() {
    return element(Nothing.value);
  }();
  var header = /* @__PURE__ */ element3("header");
  var img = function(props) {
    return element3("img")(props)([]);
  };
  var input = function(props) {
    return element3("input")(props)([]);
  };
  var label4 = /* @__PURE__ */ element3("label");
  var span4 = /* @__PURE__ */ element3("span");
  var div2 = /* @__PURE__ */ element3("div");
  var button = /* @__PURE__ */ element3("button");

  // output/Halogen.HTML.Properties/index.js
  var prop2 = function(dictIsProp) {
    return prop(dictIsProp);
  };
  var prop1 = /* @__PURE__ */ prop2(isPropBoolean);
  var prop22 = /* @__PURE__ */ prop2(isPropString);
  var src9 = /* @__PURE__ */ prop22("src");
  var type_17 = function(dictIsProp) {
    return prop2(dictIsProp)("type");
  };
  var disabled10 = /* @__PURE__ */ prop1("disabled");
  var attr2 = /* @__PURE__ */ function() {
    return attr(Nothing.value);
  }();

  // output/Halogen.HTML.CSS/index.js
  var bind6 = /* @__PURE__ */ bind(bindArray);
  var fromFoldable5 = /* @__PURE__ */ fromFoldable4(foldableArray);
  var style2 = /* @__PURE__ */ function() {
    var toString4 = function() {
      var $13 = joinWith("; ");
      var $14 = foldMap3(monoidArray)(function(key7) {
        return function(val) {
          return [key7 + (": " + val)];
        };
      });
      return function($15) {
        return $13($14($15));
      };
    }();
    var rights = concatMap(foldMap(foldableEither)(monoidArray)(singleton5));
    var property = function(v) {
      if (v instanceof Property) {
        return new Just(new Tuple(v.value0, v.value1));
      }
      ;
      return Nothing.value;
    };
    var rules = function(rs) {
      var properties = bind6(mapMaybe2(property)(rs))(function($16) {
        return rights(collect2($16));
      });
      return fromFoldable5(properties);
    };
    var $17 = attr2("style");
    return function($18) {
      return $17(toString4(rules(runS($18))));
    };
  }();

  // output/Control.Monad.Except/index.js
  var unwrap4 = /* @__PURE__ */ unwrap();
  var runExcept = function($3) {
    return unwrap4(runExceptT($3));
  };

  // output/Foreign.Index/foreign.js
  function unsafeReadPropImpl(f, s, key7, value19) {
    return value19 == null ? f : s(value19[key7]);
  }

  // output/Foreign.Index/index.js
  var unsafeReadProp = function(dictMonad) {
    var fail3 = fail(dictMonad);
    var pure18 = pure(applicativeExceptT(dictMonad));
    return function(k) {
      return function(value19) {
        return unsafeReadPropImpl(fail3(new TypeMismatch("object", typeOf(value19))), pure18, k, value19);
      };
    };
  };
  var readProp = function(dictMonad) {
    return unsafeReadProp(dictMonad);
  };

  // output/Web.Event.Event/foreign.js
  function _currentTarget(e) {
    return e.currentTarget;
  }

  // output/Web.Event.Event/index.js
  var currentTarget = function($5) {
    return toMaybe(_currentTarget($5));
  };

  // output/Web.HTML.Event.EventTypes/index.js
  var input2 = "input";
  var domcontentloaded = "DOMContentLoaded";

  // output/Web.UIEvent.MouseEvent.EventTypes/index.js
  var click2 = "click";

  // output/Halogen.HTML.Events/index.js
  var map28 = /* @__PURE__ */ map(functorMaybe);
  var composeKleisli3 = /* @__PURE__ */ composeKleisli(bindMaybe);
  var composeKleisliFlipped2 = /* @__PURE__ */ composeKleisliFlipped(/* @__PURE__ */ bindExceptT(monadIdentity));
  var readProp2 = /* @__PURE__ */ readProp(monadIdentity);
  var readString2 = /* @__PURE__ */ readString(monadIdentity);
  var mouseHandler = unsafeCoerce2;
  var handler$prime = function(et) {
    return function(f) {
      return handler(et)(function(ev) {
        return map28(Action.create)(f(ev));
      });
    };
  };
  var handler2 = function(et) {
    return function(f) {
      return handler(et)(function(ev) {
        return new Just(new Action(f(ev)));
      });
    };
  };
  var onClick = /* @__PURE__ */ function() {
    var $15 = handler2(click2);
    return function($16) {
      return $15(mouseHandler($16));
    };
  }();
  var addForeignPropHandler = function(key7) {
    return function(prop3) {
      return function(reader) {
        return function(f) {
          var go2 = function(a2) {
            return composeKleisliFlipped2(reader)(readProp2(prop3))(unsafeToForeign(a2));
          };
          return handler$prime(key7)(composeKleisli3(currentTarget)(function(e) {
            return either($$const(Nothing.value))(function($85) {
              return Just.create(f($85));
            })(runExcept(go2(e)));
          }));
        };
      };
    };
  };
  var onValueInput = /* @__PURE__ */ addForeignPropHandler(input2)("value")(readString2);

  // output/Component.ChangePassword/index.js
  var discard2 = /* @__PURE__ */ discard(discardUnit)(bindStyleM);
  var center2 = /* @__PURE__ */ center(centerAlignItemsValue);
  var center1 = /* @__PURE__ */ center(centerJustifyContentValue);
  var value14 = /* @__PURE__ */ value12(valString);
  var Click = /* @__PURE__ */ function() {
    function Click2() {
    }
    ;
    Click2.value = new Click2();
    return Click2;
  }();
  var component = function(dictMonadAff) {
    return function(dictNavigate) {
      var navigate2 = navigate(navigateHalogenM(dictNavigate));
      var render2 = function(v) {
        return div2([style2(discard2(display(flex))(function() {
          return discard2(flexDirection(row))(function() {
            return discard2(alignItems(center2))(function() {
              return discard2(justifyContent(center1))(function() {
                return paddingTop(vw(0.65));
              });
            });
          });
        }))])([button([style2(discard2(backgroundColor(themeColor))(function() {
          return discard2(themeFont)(function() {
            return discard2(fontWeight(value14("500")))(function() {
              return discard2(fontSize(vw(1)))(function() {
                return discard2(width8(rem2(20)))(function() {
                  return discard2(height8(vw(3)))(function() {
                    return discard2(color(white))(function() {
                      return cursor(pointer);
                    });
                  });
                });
              });
            });
          });
        })), onClick($$const(Click.value))])([text5("Users")])]);
      };
      var handleAction = function(v) {
        return navigate2(new Users(Nothing.value));
      };
      return mkComponent({
        initialState: $$const({}),
        render: render2,
        "eval": mkEval({
          handleAction,
          handleQuery: defaultEval.handleQuery,
          receive: defaultEval.receive,
          initialize: defaultEval.initialize,
          finalize: defaultEval.finalize
        })
      });
    };
  };

  // output/Affjax/foreign.js
  function _ajax(platformSpecificDriver, timeoutErrorMessageIdent, requestFailedMessageIdent, mkHeader, options2) {
    return function(errback, callback) {
      var xhr = platformSpecificDriver.newXHR();
      var fixedUrl = platformSpecificDriver.fixupUrl(options2.url, xhr);
      xhr.open(options2.method || "GET", fixedUrl, true, options2.username, options2.password);
      if (options2.headers) {
        try {
          for (var i2 = 0, header2; (header2 = options2.headers[i2]) != null; i2++) {
            xhr.setRequestHeader(header2.field, header2.value);
          }
        } catch (e) {
          errback(e);
        }
      }
      var onerror = function(msgIdent) {
        return function() {
          errback(new Error(msgIdent));
        };
      };
      xhr.onerror = onerror(requestFailedMessageIdent);
      xhr.ontimeout = onerror(timeoutErrorMessageIdent);
      xhr.onload = function() {
        callback({
          status: xhr.status,
          statusText: xhr.statusText,
          headers: xhr.getAllResponseHeaders().split("\r\n").filter(function(header3) {
            return header3.length > 0;
          }).map(function(header3) {
            var i3 = header3.indexOf(":");
            return mkHeader(header3.substring(0, i3))(header3.substring(i3 + 2));
          }),
          body: xhr.response
        });
      };
      xhr.responseType = options2.responseType;
      xhr.withCredentials = options2.withCredentials;
      xhr.timeout = options2.timeout;
      xhr.send(options2.content);
      return function(error4, cancelErrback, cancelCallback) {
        try {
          xhr.abort();
        } catch (e) {
          return cancelErrback(e);
        }
        return cancelCallback();
      };
    };
  }

  // output/Data.MediaType.Common/index.js
  var applicationJSON = "application/json";
  var applicationFormURLEncoded = "application/x-www-form-urlencoded";

  // output/Affjax.RequestBody/index.js
  var ArrayView = /* @__PURE__ */ function() {
    function ArrayView2(value0) {
      this.value0 = value0;
    }
    ;
    ArrayView2.create = function(value0) {
      return new ArrayView2(value0);
    };
    return ArrayView2;
  }();
  var Blob = /* @__PURE__ */ function() {
    function Blob3(value0) {
      this.value0 = value0;
    }
    ;
    Blob3.create = function(value0) {
      return new Blob3(value0);
    };
    return Blob3;
  }();
  var Document = /* @__PURE__ */ function() {
    function Document3(value0) {
      this.value0 = value0;
    }
    ;
    Document3.create = function(value0) {
      return new Document3(value0);
    };
    return Document3;
  }();
  var $$String = /* @__PURE__ */ function() {
    function $$String3(value0) {
      this.value0 = value0;
    }
    ;
    $$String3.create = function(value0) {
      return new $$String3(value0);
    };
    return $$String3;
  }();
  var FormData = /* @__PURE__ */ function() {
    function FormData2(value0) {
      this.value0 = value0;
    }
    ;
    FormData2.create = function(value0) {
      return new FormData2(value0);
    };
    return FormData2;
  }();
  var FormURLEncoded = /* @__PURE__ */ function() {
    function FormURLEncoded2(value0) {
      this.value0 = value0;
    }
    ;
    FormURLEncoded2.create = function(value0) {
      return new FormURLEncoded2(value0);
    };
    return FormURLEncoded2;
  }();
  var Json = /* @__PURE__ */ function() {
    function Json3(value0) {
      this.value0 = value0;
    }
    ;
    Json3.create = function(value0) {
      return new Json3(value0);
    };
    return Json3;
  }();
  var toMediaType = function(v) {
    if (v instanceof FormURLEncoded) {
      return new Just(applicationFormURLEncoded);
    }
    ;
    if (v instanceof Json) {
      return new Just(applicationJSON);
    }
    ;
    return Nothing.value;
  };
  var json = /* @__PURE__ */ function() {
    return Json.create;
  }();

  // output/Affjax.RequestHeader/index.js
  var unwrap5 = /* @__PURE__ */ unwrap();
  var Accept = /* @__PURE__ */ function() {
    function Accept2(value0) {
      this.value0 = value0;
    }
    ;
    Accept2.create = function(value0) {
      return new Accept2(value0);
    };
    return Accept2;
  }();
  var ContentType = /* @__PURE__ */ function() {
    function ContentType2(value0) {
      this.value0 = value0;
    }
    ;
    ContentType2.create = function(value0) {
      return new ContentType2(value0);
    };
    return ContentType2;
  }();
  var RequestHeader = /* @__PURE__ */ function() {
    function RequestHeader2(value0, value19) {
      this.value0 = value0;
      this.value1 = value19;
    }
    ;
    RequestHeader2.create = function(value0) {
      return function(value19) {
        return new RequestHeader2(value0, value19);
      };
    };
    return RequestHeader2;
  }();
  var value15 = function(v) {
    if (v instanceof Accept) {
      return unwrap5(v.value0);
    }
    ;
    if (v instanceof ContentType) {
      return unwrap5(v.value0);
    }
    ;
    if (v instanceof RequestHeader) {
      return v.value1;
    }
    ;
    throw new Error("Failed pattern match at Affjax.RequestHeader (line 26, column 1 - line 26, column 33): " + [v.constructor.name]);
  };
  var name15 = function(v) {
    if (v instanceof Accept) {
      return "Accept";
    }
    ;
    if (v instanceof ContentType) {
      return "Content-Type";
    }
    ;
    if (v instanceof RequestHeader) {
      return v.value0;
    }
    ;
    throw new Error("Failed pattern match at Affjax.RequestHeader (line 21, column 1 - line 21, column 32): " + [v.constructor.name]);
  };

  // output/Affjax.ResponseFormat/index.js
  var identity11 = /* @__PURE__ */ identity(categoryFn);
  var $$ArrayBuffer = /* @__PURE__ */ function() {
    function $$ArrayBuffer2(value0) {
      this.value0 = value0;
    }
    ;
    $$ArrayBuffer2.create = function(value0) {
      return new $$ArrayBuffer2(value0);
    };
    return $$ArrayBuffer2;
  }();
  var Blob2 = /* @__PURE__ */ function() {
    function Blob3(value0) {
      this.value0 = value0;
    }
    ;
    Blob3.create = function(value0) {
      return new Blob3(value0);
    };
    return Blob3;
  }();
  var Document2 = /* @__PURE__ */ function() {
    function Document3(value0) {
      this.value0 = value0;
    }
    ;
    Document3.create = function(value0) {
      return new Document3(value0);
    };
    return Document3;
  }();
  var Json2 = /* @__PURE__ */ function() {
    function Json3(value0) {
      this.value0 = value0;
    }
    ;
    Json3.create = function(value0) {
      return new Json3(value0);
    };
    return Json3;
  }();
  var $$String2 = /* @__PURE__ */ function() {
    function $$String3(value0) {
      this.value0 = value0;
    }
    ;
    $$String3.create = function(value0) {
      return new $$String3(value0);
    };
    return $$String3;
  }();
  var Ignore = /* @__PURE__ */ function() {
    function Ignore2(value0) {
      this.value0 = value0;
    }
    ;
    Ignore2.create = function(value0) {
      return new Ignore2(value0);
    };
    return Ignore2;
  }();
  var toResponseType = function(v) {
    if (v instanceof $$ArrayBuffer) {
      return "arraybuffer";
    }
    ;
    if (v instanceof Blob2) {
      return "blob";
    }
    ;
    if (v instanceof Document2) {
      return "document";
    }
    ;
    if (v instanceof Json2) {
      return "text";
    }
    ;
    if (v instanceof $$String2) {
      return "text";
    }
    ;
    if (v instanceof Ignore) {
      return "";
    }
    ;
    throw new Error("Failed pattern match at Affjax.ResponseFormat (line 44, column 3 - line 50, column 19): " + [v.constructor.name]);
  };
  var toMediaType2 = function(v) {
    if (v instanceof Json2) {
      return new Just(applicationJSON);
    }
    ;
    return Nothing.value;
  };
  var json2 = /* @__PURE__ */ function() {
    return new Json2(identity11);
  }();
  var ignore = /* @__PURE__ */ function() {
    return new Ignore(identity11);
  }();

  // output/Affjax.ResponseHeader/index.js
  var ResponseHeader = /* @__PURE__ */ function() {
    function ResponseHeader2(value0, value19) {
      this.value0 = value0;
      this.value1 = value19;
    }
    ;
    ResponseHeader2.create = function(value0) {
      return function(value19) {
        return new ResponseHeader2(value0, value19);
      };
    };
    return ResponseHeader2;
  }();

  // output/Data.Argonaut.Core/foreign.js
  function id2(x) {
    return x;
  }
  function stringify(j) {
    return JSON.stringify(j);
  }
  function _caseJson(isNull3, isBool, isNum, isStr, isArr, isObj, j) {
    if (j == null)
      return isNull3();
    else if (typeof j === "boolean")
      return isBool(j);
    else if (typeof j === "number")
      return isNum(j);
    else if (typeof j === "string")
      return isStr(j);
    else if (Object.prototype.toString.call(j) === "[object Array]")
      return isArr(j);
    else
      return isObj(j);
  }

  // output/Data.Argonaut.Core/index.js
  var verbJsonType = function(def) {
    return function(f) {
      return function(g) {
        return g(def)(f);
      };
    };
  };
  var toJsonType = /* @__PURE__ */ function() {
    return verbJsonType(Nothing.value)(Just.create);
  }();
  var jsonEmptyObject = /* @__PURE__ */ id2(empty6);
  var caseJsonString = function(d) {
    return function(f) {
      return function(j) {
        return _caseJson($$const(d), $$const(d), $$const(d), f, $$const(d), $$const(d), j);
      };
    };
  };
  var caseJsonObject = function(d) {
    return function(f) {
      return function(j) {
        return _caseJson($$const(d), $$const(d), $$const(d), $$const(d), $$const(d), f, j);
      };
    };
  };
  var toObject = /* @__PURE__ */ toJsonType(caseJsonObject);
  var caseJsonBoolean = function(d) {
    return function(f) {
      return function(j) {
        return _caseJson($$const(d), f, $$const(d), $$const(d), $$const(d), $$const(d), j);
      };
    };
  };

  // output/Data.Argonaut.Parser/foreign.js
  function _jsonParser(fail3, succ2, s) {
    try {
      return succ2(JSON.parse(s));
    } catch (e) {
      return fail3(e.message);
    }
  }

  // output/Data.Argonaut.Parser/index.js
  var jsonParser = function(j) {
    return _jsonParser(Left.create, Right.create, j);
  };

  // output/Data.FormURLEncoded/index.js
  var apply5 = /* @__PURE__ */ apply(applyMaybe);
  var map29 = /* @__PURE__ */ map(functorMaybe);
  var traverse3 = /* @__PURE__ */ traverse(traversableArray)(applicativeMaybe);
  var toArray2 = function(v) {
    return v;
  };
  var encode = /* @__PURE__ */ function() {
    var encodePart = function(v) {
      if (v.value1 instanceof Nothing) {
        return encodeFormURLComponent(v.value0);
      }
      ;
      if (v.value1 instanceof Just) {
        return apply5(map29(function(key7) {
          return function(val) {
            return key7 + ("=" + val);
          };
        })(encodeFormURLComponent(v.value0)))(encodeFormURLComponent(v.value1.value0));
      }
      ;
      throw new Error("Failed pattern match at Data.FormURLEncoded (line 37, column 16 - line 39, column 114): " + [v.constructor.name]);
    };
    var $37 = map29(joinWith("&"));
    var $38 = traverse3(encodePart);
    return function($39) {
      return $37($38(toArray2($39)));
    };
  }();

  // output/Data.HTTP.Method/index.js
  var OPTIONS = /* @__PURE__ */ function() {
    function OPTIONS2() {
    }
    ;
    OPTIONS2.value = new OPTIONS2();
    return OPTIONS2;
  }();
  var GET2 = /* @__PURE__ */ function() {
    function GET3() {
    }
    ;
    GET3.value = new GET3();
    return GET3;
  }();
  var HEAD = /* @__PURE__ */ function() {
    function HEAD2() {
    }
    ;
    HEAD2.value = new HEAD2();
    return HEAD2;
  }();
  var POST2 = /* @__PURE__ */ function() {
    function POST3() {
    }
    ;
    POST3.value = new POST3();
    return POST3;
  }();
  var PUT = /* @__PURE__ */ function() {
    function PUT2() {
    }
    ;
    PUT2.value = new PUT2();
    return PUT2;
  }();
  var DELETE = /* @__PURE__ */ function() {
    function DELETE2() {
    }
    ;
    DELETE2.value = new DELETE2();
    return DELETE2;
  }();
  var TRACE = /* @__PURE__ */ function() {
    function TRACE2() {
    }
    ;
    TRACE2.value = new TRACE2();
    return TRACE2;
  }();
  var CONNECT = /* @__PURE__ */ function() {
    function CONNECT2() {
    }
    ;
    CONNECT2.value = new CONNECT2();
    return CONNECT2;
  }();
  var PROPFIND = /* @__PURE__ */ function() {
    function PROPFIND2() {
    }
    ;
    PROPFIND2.value = new PROPFIND2();
    return PROPFIND2;
  }();
  var PROPPATCH = /* @__PURE__ */ function() {
    function PROPPATCH2() {
    }
    ;
    PROPPATCH2.value = new PROPPATCH2();
    return PROPPATCH2;
  }();
  var MKCOL = /* @__PURE__ */ function() {
    function MKCOL2() {
    }
    ;
    MKCOL2.value = new MKCOL2();
    return MKCOL2;
  }();
  var COPY = /* @__PURE__ */ function() {
    function COPY2() {
    }
    ;
    COPY2.value = new COPY2();
    return COPY2;
  }();
  var MOVE = /* @__PURE__ */ function() {
    function MOVE2() {
    }
    ;
    MOVE2.value = new MOVE2();
    return MOVE2;
  }();
  var LOCK = /* @__PURE__ */ function() {
    function LOCK2() {
    }
    ;
    LOCK2.value = new LOCK2();
    return LOCK2;
  }();
  var UNLOCK = /* @__PURE__ */ function() {
    function UNLOCK2() {
    }
    ;
    UNLOCK2.value = new UNLOCK2();
    return UNLOCK2;
  }();
  var PATCH = /* @__PURE__ */ function() {
    function PATCH2() {
    }
    ;
    PATCH2.value = new PATCH2();
    return PATCH2;
  }();
  var unCustomMethod = function(v) {
    return v;
  };
  var showMethod = {
    show: function(v) {
      if (v instanceof OPTIONS) {
        return "OPTIONS";
      }
      ;
      if (v instanceof GET2) {
        return "GET";
      }
      ;
      if (v instanceof HEAD) {
        return "HEAD";
      }
      ;
      if (v instanceof POST2) {
        return "POST";
      }
      ;
      if (v instanceof PUT) {
        return "PUT";
      }
      ;
      if (v instanceof DELETE) {
        return "DELETE";
      }
      ;
      if (v instanceof TRACE) {
        return "TRACE";
      }
      ;
      if (v instanceof CONNECT) {
        return "CONNECT";
      }
      ;
      if (v instanceof PROPFIND) {
        return "PROPFIND";
      }
      ;
      if (v instanceof PROPPATCH) {
        return "PROPPATCH";
      }
      ;
      if (v instanceof MKCOL) {
        return "MKCOL";
      }
      ;
      if (v instanceof COPY) {
        return "COPY";
      }
      ;
      if (v instanceof MOVE) {
        return "MOVE";
      }
      ;
      if (v instanceof LOCK) {
        return "LOCK";
      }
      ;
      if (v instanceof UNLOCK) {
        return "UNLOCK";
      }
      ;
      if (v instanceof PATCH) {
        return "PATCH";
      }
      ;
      throw new Error("Failed pattern match at Data.HTTP.Method (line 43, column 1 - line 59, column 23): " + [v.constructor.name]);
    }
  };
  var print7 = /* @__PURE__ */ either(/* @__PURE__ */ show(showMethod))(unCustomMethod);

  // output/Effect.Aff.Compat/index.js
  var fromEffectFnAff = function(v) {
    return makeAff(function(k) {
      return function __do3() {
        var v1 = v(function($9) {
          return k(Left.create($9))();
        }, function($10) {
          return k(Right.create($10))();
        });
        return function(e) {
          return makeAff(function(k2) {
            return function __do4() {
              v1(e, function($11) {
                return k2(Left.create($11))();
              }, function($12) {
                return k2(Right.create($12))();
              });
              return nonCanceler;
            };
          });
        };
      };
    });
  };

  // output/Affjax/index.js
  var pure9 = /* @__PURE__ */ pure(/* @__PURE__ */ applicativeExceptT(monadIdentity));
  var fail2 = /* @__PURE__ */ fail(monadIdentity);
  var unsafeReadTagged2 = /* @__PURE__ */ unsafeReadTagged(monadIdentity);
  var alt7 = /* @__PURE__ */ alt(/* @__PURE__ */ altExceptT(semigroupNonEmptyList)(monadIdentity));
  var composeKleisliFlipped3 = /* @__PURE__ */ composeKleisliFlipped(/* @__PURE__ */ bindExceptT(monadIdentity));
  var map30 = /* @__PURE__ */ map(functorMaybe);
  var any3 = /* @__PURE__ */ any(foldableArray)(heytingAlgebraBoolean);
  var eq4 = /* @__PURE__ */ eq(eqString);
  var bindFlipped6 = /* @__PURE__ */ bindFlipped(bindMaybe);
  var map113 = /* @__PURE__ */ map(functorArray);
  var mapFlipped2 = /* @__PURE__ */ mapFlipped(functorAff);
  var $$try3 = /* @__PURE__ */ $$try(monadErrorAff);
  var pure1 = /* @__PURE__ */ pure(applicativeAff);
  var RequestContentError = /* @__PURE__ */ function() {
    function RequestContentError2(value0) {
      this.value0 = value0;
    }
    ;
    RequestContentError2.create = function(value0) {
      return new RequestContentError2(value0);
    };
    return RequestContentError2;
  }();
  var ResponseBodyError = /* @__PURE__ */ function() {
    function ResponseBodyError2(value0, value19) {
      this.value0 = value0;
      this.value1 = value19;
    }
    ;
    ResponseBodyError2.create = function(value0) {
      return function(value19) {
        return new ResponseBodyError2(value0, value19);
      };
    };
    return ResponseBodyError2;
  }();
  var TimeoutError = /* @__PURE__ */ function() {
    function TimeoutError2() {
    }
    ;
    TimeoutError2.value = new TimeoutError2();
    return TimeoutError2;
  }();
  var RequestFailedError = /* @__PURE__ */ function() {
    function RequestFailedError2() {
    }
    ;
    RequestFailedError2.value = new RequestFailedError2();
    return RequestFailedError2;
  }();
  var XHROtherError = /* @__PURE__ */ function() {
    function XHROtherError2(value0) {
      this.value0 = value0;
    }
    ;
    XHROtherError2.create = function(value0) {
      return new XHROtherError2(value0);
    };
    return XHROtherError2;
  }();
  var request = function(driver2) {
    return function(req) {
      var parseJSON = function(v2) {
        if (v2 === "") {
          return pure9(jsonEmptyObject);
        }
        ;
        return either(function($74) {
          return fail2(ForeignError.create($74));
        })(pure9)(jsonParser(v2));
      };
      var fromResponse = function() {
        if (req.responseFormat instanceof $$ArrayBuffer) {
          return unsafeReadTagged2("ArrayBuffer");
        }
        ;
        if (req.responseFormat instanceof Blob2) {
          return unsafeReadTagged2("Blob");
        }
        ;
        if (req.responseFormat instanceof Document2) {
          return function(x) {
            return alt7(unsafeReadTagged2("Document")(x))(alt7(unsafeReadTagged2("XMLDocument")(x))(unsafeReadTagged2("HTMLDocument")(x)));
          };
        }
        ;
        if (req.responseFormat instanceof Json2) {
          return composeKleisliFlipped3(function($75) {
            return req.responseFormat.value0(parseJSON($75));
          })(unsafeReadTagged2("String"));
        }
        ;
        if (req.responseFormat instanceof $$String2) {
          return unsafeReadTagged2("String");
        }
        ;
        if (req.responseFormat instanceof Ignore) {
          return $$const(req.responseFormat.value0(pure9(unit)));
        }
        ;
        throw new Error("Failed pattern match at Affjax (line 274, column 18 - line 283, column 57): " + [req.responseFormat.constructor.name]);
      }();
      var extractContent = function(v2) {
        if (v2 instanceof ArrayView) {
          return new Right(v2.value0(unsafeToForeign));
        }
        ;
        if (v2 instanceof Blob) {
          return new Right(unsafeToForeign(v2.value0));
        }
        ;
        if (v2 instanceof Document) {
          return new Right(unsafeToForeign(v2.value0));
        }
        ;
        if (v2 instanceof $$String) {
          return new Right(unsafeToForeign(v2.value0));
        }
        ;
        if (v2 instanceof FormData) {
          return new Right(unsafeToForeign(v2.value0));
        }
        ;
        if (v2 instanceof FormURLEncoded) {
          return note("Body contains values that cannot be encoded as application/x-www-form-urlencoded")(map30(unsafeToForeign)(encode(v2.value0)));
        }
        ;
        if (v2 instanceof Json) {
          return new Right(unsafeToForeign(stringify(v2.value0)));
        }
        ;
        throw new Error("Failed pattern match at Affjax (line 235, column 20 - line 250, column 69): " + [v2.constructor.name]);
      };
      var addHeader = function(mh) {
        return function(hs) {
          if (mh instanceof Just && !any3(on(eq4)(name15)(mh.value0))(hs)) {
            return snoc4(hs)(mh.value0);
          }
          ;
          return hs;
        };
      };
      var headers = function(reqContent) {
        return addHeader(map30(ContentType.create)(bindFlipped6(toMediaType)(reqContent)))(addHeader(map30(Accept.create)(toMediaType2(req.responseFormat)))(req.headers));
      };
      var ajaxRequest = function(v2) {
        return {
          method: print7(req.method),
          url: req.url,
          headers: map113(function(h) {
            return {
              field: name15(h),
              value: value15(h)
            };
          })(headers(req.content)),
          content: v2,
          responseType: toResponseType(req.responseFormat),
          username: toNullable(req.username),
          password: toNullable(req.password),
          withCredentials: req.withCredentials,
          timeout: fromMaybe(0)(map30(function(v1) {
            return v1;
          })(req.timeout))
        };
      };
      var send = function(content3) {
        return mapFlipped2($$try3(fromEffectFnAff(_ajax(driver2, "AffjaxTimeoutErrorMessageIdent", "AffjaxRequestFailedMessageIdent", ResponseHeader.create, ajaxRequest(content3)))))(function(v2) {
          if (v2 instanceof Right) {
            var v1 = runExcept(fromResponse(v2.value0.body));
            if (v1 instanceof Left) {
              return new Left(new ResponseBodyError(head(v1.value0), v2.value0));
            }
            ;
            if (v1 instanceof Right) {
              return new Right({
                body: v1.value0,
                headers: v2.value0.headers,
                status: v2.value0.status,
                statusText: v2.value0.statusText
              });
            }
            ;
            throw new Error("Failed pattern match at Affjax (line 209, column 9 - line 211, column 52): " + [v1.constructor.name]);
          }
          ;
          if (v2 instanceof Left) {
            return new Left(function() {
              var message2 = message(v2.value0);
              var $61 = message2 === "AffjaxTimeoutErrorMessageIdent";
              if ($61) {
                return TimeoutError.value;
              }
              ;
              var $62 = message2 === "AffjaxRequestFailedMessageIdent";
              if ($62) {
                return RequestFailedError.value;
              }
              ;
              return new XHROtherError(v2.value0);
            }());
          }
          ;
          throw new Error("Failed pattern match at Affjax (line 207, column 144 - line 219, column 28): " + [v2.constructor.name]);
        });
      };
      if (req.content instanceof Nothing) {
        return send(toNullable(Nothing.value));
      }
      ;
      if (req.content instanceof Just) {
        var v = extractContent(req.content.value0);
        if (v instanceof Right) {
          return send(toNullable(new Just(v.value0)));
        }
        ;
        if (v instanceof Left) {
          return pure1(new Left(new RequestContentError(v.value0)));
        }
        ;
        throw new Error("Failed pattern match at Affjax (line 199, column 7 - line 203, column 48): " + [v.constructor.name]);
      }
      ;
      throw new Error("Failed pattern match at Affjax (line 195, column 3 - line 203, column 48): " + [req.content.constructor.name]);
    };
  };
  var printError = function(v) {
    if (v instanceof RequestContentError) {
      return "There was a problem with the request content: " + v.value0;
    }
    ;
    if (v instanceof ResponseBodyError) {
      return "There was a problem with the response body: " + renderForeignError(v.value0);
    }
    ;
    if (v instanceof TimeoutError) {
      return "There was a problem making the request: timeout";
    }
    ;
    if (v instanceof RequestFailedError) {
      return "There was a problem making the request: request failed";
    }
    ;
    if (v instanceof XHROtherError) {
      return "There was a problem making the request: " + message(v.value0);
    }
    ;
    throw new Error("Failed pattern match at Affjax (line 113, column 14 - line 123, column 66): " + [v.constructor.name]);
  };
  var defaultRequest = /* @__PURE__ */ function() {
    return {
      method: new Left(GET2.value),
      url: "/",
      headers: [],
      content: Nothing.value,
      username: Nothing.value,
      password: Nothing.value,
      withCredentials: false,
      responseFormat: ignore,
      timeout: Nothing.value
    };
  }();
  var post = function(driver2) {
    return function(rf) {
      return function(u2) {
        return function(c) {
          return request(driver2)({
            method: new Left(POST2.value),
            url: u2,
            headers: defaultRequest.headers,
            content: c,
            username: defaultRequest.username,
            password: defaultRequest.password,
            withCredentials: defaultRequest.withCredentials,
            responseFormat: rf,
            timeout: defaultRequest.timeout
          });
        };
      };
    };
  };

  // output/Affjax.Web/foreign.js
  var driver = {
    newXHR: function() {
      return new XMLHttpRequest();
    },
    fixupUrl: function(url) {
      return url || "/";
    }
  };

  // output/Affjax.Web/index.js
  var post2 = /* @__PURE__ */ post(driver);

  // output/CSS.Border/index.js
  var fromString16 = /* @__PURE__ */ fromString4(isStringKey);
  var valTuple4 = /* @__PURE__ */ valTuple(valSize);
  var valTuple12 = /* @__PURE__ */ valTuple4(valSize);
  var key22 = /* @__PURE__ */ key(/* @__PURE__ */ valTuple(valTuple12)(valTuple12));
  var borderRadius = function(a2) {
    return function(b2) {
      return function(c) {
        return function(d) {
          return key22(fromString16("border-radius"))(new Tuple(new Tuple(a2, b2), new Tuple(c, d)));
        };
      };
    };
  };

  // output/CSS.Missing/index.js
  var spaceEvenlyJustifyContentValue = {
    spaceEvenly: /* @__PURE__ */ fromString4(isStringJustifyContentValue)("space-evenly")
  };
  var spaceEvenly = function(dict) {
    return dict.spaceEvenly;
  };

  // output/Data.Argonaut.Decode.Error/index.js
  var show16 = /* @__PURE__ */ show(showInt);
  var TypeMismatch2 = /* @__PURE__ */ function() {
    function TypeMismatch3(value0) {
      this.value0 = value0;
    }
    ;
    TypeMismatch3.create = function(value0) {
      return new TypeMismatch3(value0);
    };
    return TypeMismatch3;
  }();
  var UnexpectedValue = /* @__PURE__ */ function() {
    function UnexpectedValue2(value0) {
      this.value0 = value0;
    }
    ;
    UnexpectedValue2.create = function(value0) {
      return new UnexpectedValue2(value0);
    };
    return UnexpectedValue2;
  }();
  var AtIndex = /* @__PURE__ */ function() {
    function AtIndex2(value0, value19) {
      this.value0 = value0;
      this.value1 = value19;
    }
    ;
    AtIndex2.create = function(value0) {
      return function(value19) {
        return new AtIndex2(value0, value19);
      };
    };
    return AtIndex2;
  }();
  var AtKey = /* @__PURE__ */ function() {
    function AtKey2(value0, value19) {
      this.value0 = value0;
      this.value1 = value19;
    }
    ;
    AtKey2.create = function(value0) {
      return function(value19) {
        return new AtKey2(value0, value19);
      };
    };
    return AtKey2;
  }();
  var Named = /* @__PURE__ */ function() {
    function Named2(value0, value19) {
      this.value0 = value0;
      this.value1 = value19;
    }
    ;
    Named2.create = function(value0) {
      return function(value19) {
        return new Named2(value0, value19);
      };
    };
    return Named2;
  }();
  var MissingValue = /* @__PURE__ */ function() {
    function MissingValue2() {
    }
    ;
    MissingValue2.value = new MissingValue2();
    return MissingValue2;
  }();
  var printJsonDecodeError = function(err) {
    var go2 = function(v) {
      if (v instanceof TypeMismatch2) {
        return "  Expected value of type '" + (v.value0 + "'.");
      }
      ;
      if (v instanceof UnexpectedValue) {
        return "  Unexpected value " + (stringify(v.value0) + ".");
      }
      ;
      if (v instanceof AtIndex) {
        return "  At array index " + (show16(v.value0) + (":\n" + go2(v.value1)));
      }
      ;
      if (v instanceof AtKey) {
        return "  At object key '" + (v.value0 + ("':\n" + go2(v.value1)));
      }
      ;
      if (v instanceof Named) {
        return "  Under '" + (v.value0 + ("':\n" + go2(v.value1)));
      }
      ;
      if (v instanceof MissingValue) {
        return "  No value was found.";
      }
      ;
      throw new Error("Failed pattern match at Data.Argonaut.Decode.Error (line 37, column 8 - line 43, column 44): " + [v.constructor.name]);
    };
    return "An error occurred while decoding a JSON value:\n" + go2(err);
  };

  // output/Data.Argonaut.Decode.Decoders/index.js
  var lmap3 = /* @__PURE__ */ lmap(bifunctorEither);
  var getField = function(decoder) {
    return function(obj) {
      return function(str) {
        return maybe(new Left(new AtKey(str, MissingValue.value)))(function() {
          var $48 = lmap3(AtKey.create(str));
          return function($49) {
            return $48(decoder($49));
          };
        }())(lookup6(str)(obj));
      };
    };
  };
  var decodeString = /* @__PURE__ */ function() {
    return caseJsonString(new Left(new TypeMismatch2("String")))(Right.create);
  }();
  var decodeJObject = /* @__PURE__ */ function() {
    var $50 = note(new TypeMismatch2("Object"));
    return function($51) {
      return $50(toObject($51));
    };
  }();
  var decodeBoolean = /* @__PURE__ */ function() {
    return caseJsonBoolean(new Left(new TypeMismatch2("Boolean")))(Right.create);
  }();

  // output/Data.Argonaut.Decode.Class/index.js
  var bind7 = /* @__PURE__ */ bind(bindEither);
  var lmap4 = /* @__PURE__ */ lmap(bifunctorEither);
  var map31 = /* @__PURE__ */ map(functorMaybe);
  var gDecodeJsonNil = {
    gDecodeJson: function(v) {
      return function(v1) {
        return new Right({});
      };
    }
  };
  var gDecodeJson = function(dict) {
    return dict.gDecodeJson;
  };
  var decodeRecord = function(dictGDecodeJson) {
    var gDecodeJson1 = gDecodeJson(dictGDecodeJson);
    return function() {
      return {
        decodeJson: function(json3) {
          var v = toObject(json3);
          if (v instanceof Just) {
            return gDecodeJson1(v.value0)($$Proxy.value);
          }
          ;
          if (v instanceof Nothing) {
            return new Left(new TypeMismatch2("Object"));
          }
          ;
          throw new Error("Failed pattern match at Data.Argonaut.Decode.Class (line 103, column 5 - line 105, column 46): " + [v.constructor.name]);
        }
      };
    };
  };
  var decodeJsonString = {
    decodeJson: decodeString
  };
  var decodeJsonField = function(dict) {
    return dict.decodeJsonField;
  };
  var gDecodeJsonCons = function(dictDecodeJsonField) {
    var decodeJsonField1 = decodeJsonField(dictDecodeJsonField);
    return function(dictGDecodeJson) {
      var gDecodeJson1 = gDecodeJson(dictGDecodeJson);
      return function(dictIsSymbol) {
        var reflectSymbol2 = reflectSymbol(dictIsSymbol);
        var insert8 = insert3(dictIsSymbol)()();
        return function() {
          return function() {
            return {
              gDecodeJson: function(object2) {
                return function(v) {
                  var fieldName = reflectSymbol2($$Proxy.value);
                  var fieldValue = lookup6(fieldName)(object2);
                  var v1 = decodeJsonField1(fieldValue);
                  if (v1 instanceof Just) {
                    return bind7(lmap4(AtKey.create(fieldName))(v1.value0))(function(val) {
                      return bind7(gDecodeJson1(object2)($$Proxy.value))(function(rest2) {
                        return new Right(insert8($$Proxy.value)(val)(rest2));
                      });
                    });
                  }
                  ;
                  if (v1 instanceof Nothing) {
                    return new Left(new AtKey(fieldName, MissingValue.value));
                  }
                  ;
                  throw new Error("Failed pattern match at Data.Argonaut.Decode.Class (line 127, column 5 - line 134, column 44): " + [v1.constructor.name]);
                };
              }
            };
          };
        };
      };
    };
  };
  var decodeJsonBoolean = {
    decodeJson: decodeBoolean
  };
  var decodeJson = function(dict) {
    return dict.decodeJson;
  };
  var decodeFieldId = function(dictDecodeJson) {
    var decodeJson1 = decodeJson(dictDecodeJson);
    return {
      decodeJsonField: function(j) {
        return map31(decodeJson1)(j);
      }
    };
  };

  // output/Data.Argonaut.Decode.Combinators/index.js
  var getField2 = function(dictDecodeJson) {
    return getField(decodeJson(dictDecodeJson));
  };

  // output/Data.Argonaut.Encode.Encoders/index.js
  var encodeString = id2;

  // output/Data.Argonaut.Encode.Class/index.js
  var gEncodeJsonNil = {
    gEncodeJson: function(v) {
      return function(v1) {
        return empty6;
      };
    }
  };
  var gEncodeJson = function(dict) {
    return dict.gEncodeJson;
  };
  var encodeRecord = function(dictGEncodeJson) {
    var gEncodeJson1 = gEncodeJson(dictGEncodeJson);
    return function() {
      return {
        encodeJson: function(rec) {
          return id2(gEncodeJson1(rec)($$Proxy.value));
        }
      };
    };
  };
  var encodeJsonJString = {
    encodeJson: encodeString
  };
  var encodeJson = function(dict) {
    return dict.encodeJson;
  };
  var gEncodeJsonCons = function(dictEncodeJson) {
    var encodeJson1 = encodeJson(dictEncodeJson);
    return function(dictGEncodeJson) {
      var gEncodeJson1 = gEncodeJson(dictGEncodeJson);
      return function(dictIsSymbol) {
        var reflectSymbol2 = reflectSymbol(dictIsSymbol);
        var get5 = get2(dictIsSymbol)();
        return function() {
          return {
            gEncodeJson: function(row2) {
              return function(v) {
                return insert5(reflectSymbol2($$Proxy.value))(encodeJson1(get5($$Proxy.value)(row2)))(gEncodeJson1(row2)($$Proxy.value));
              };
            }
          };
        };
      };
    };
  };

  // node_modules/uuid/dist/esm-browser/regex.js
  var regex_default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

  // node_modules/uuid/dist/esm-browser/validate.js
  function validate(uuid) {
    return typeof uuid === "string" && regex_default.test(uuid);
  }
  var validate_default = validate;

  // output/Data.UUID/foreign.js
  var validateV4UUID = validate_default;

  // output/Data.UUID/index.js
  var parseUUID = function(str) {
    var v = validateV4UUID(str);
    if (v) {
      return new Just(str);
    }
    ;
    return Nothing.value;
  };

  // output/Data.Api.Logon/index.js
  var gEncodeJsonCons2 = /* @__PURE__ */ gEncodeJsonCons(encodeJsonJString);
  var gEncodeJsonCons1 = /* @__PURE__ */ gEncodeJsonCons2(gEncodeJsonNil);
  var gEncodeJsonCons22 = /* @__PURE__ */ gEncodeJsonCons1({
    reflectSymbol: function() {
      return "tag";
    }
  })();
  var mustChangePasswordIsSymbol = {
    reflectSymbol: function() {
      return "mustChangePassword";
    }
  };
  var authTokenIsSymbol = {
    reflectSymbol: function() {
      return "authToken";
    }
  };
  var contentsIsSymbol = {
    reflectSymbol: function() {
      return "contents";
    }
  };
  var userNameIsSymbol = {
    reflectSymbol: function() {
      return "userName";
    }
  };
  var passwordIsSymbol = {
    reflectSymbol: function() {
      return "password";
    }
  };
  var encodeJson2 = /* @__PURE__ */ encodeJson(/* @__PURE__ */ encodeRecord(/* @__PURE__ */ gEncodeJsonCons(/* @__PURE__ */ encodeRecord(/* @__PURE__ */ gEncodeJsonCons2(/* @__PURE__ */ gEncodeJsonCons1(userNameIsSymbol)())(passwordIsSymbol)())())(gEncodeJsonCons22)(contentsIsSymbol)())());
  var bind8 = /* @__PURE__ */ bind(bindEither);
  var getField3 = /* @__PURE__ */ getField2(decodeJsonString);
  var gDecodeJsonCons2 = /* @__PURE__ */ gDecodeJsonCons(/* @__PURE__ */ decodeFieldId(decodeJsonString));
  var getField1 = /* @__PURE__ */ getField2(/* @__PURE__ */ decodeRecord(/* @__PURE__ */ gDecodeJsonCons2(/* @__PURE__ */ gDecodeJsonCons(/* @__PURE__ */ decodeFieldId(decodeJsonBoolean))(gDecodeJsonNil)(mustChangePasswordIsSymbol)()())(authTokenIsSymbol)()())());
  var LogonResultsFailure = /* @__PURE__ */ function() {
    function LogonResultsFailure2() {
    }
    ;
    LogonResultsFailure2.value = new LogonResultsFailure2();
    return LogonResultsFailure2;
  }();
  var LogonResultsSuccess = /* @__PURE__ */ function() {
    function LogonResultsSuccess2(value0) {
      this.value0 = value0;
    }
    ;
    LogonResultsSuccess2.create = function(value0) {
      return new LogonResultsSuccess2(value0);
    };
    return LogonResultsSuccess2;
  }();
  var encodeJsonLogonRequest = {
    encodeJson: function(v) {
      return encodeJson2({
        tag: "LogonRequest",
        contents: {
          userName: v.userName,
          password: v.password
        }
      });
    }
  };
  var tagError = /* @__PURE__ */ function() {
    var $109 = AtKey.create("tag");
    return function($110) {
      return $109(UnexpectedValue.create($110));
    };
  }();
  var decodeJsonLogonResults = {
    decodeJson: function(json3) {
      return bind8(decodeJObject(json3))(function(obj) {
        return bind8(getField3(obj)("tag"))(function(tag) {
          if (tag === "LogonResultsFailure") {
            return new Right(LogonResultsFailure.value);
          }
          ;
          if (tag === "LogonResultsSuccess") {
            return bind8(getField1(obj)("contents"))(function(v) {
              var v1 = parseUUID(v.authToken);
              if (v1 instanceof Nothing) {
                return new Left(new AtKey("authToken", new UnexpectedValue(json3)));
              }
              ;
              if (v1 instanceof Just) {
                return new Right(new LogonResultsSuccess({
                  authToken: v1.value0,
                  mustChangePassword: v.mustChangePassword
                }));
              }
              ;
              throw new Error("Failed pattern match at Data.Api.Logon (line 66, column 9 - line 68, column 93): " + [v1.constructor.name]);
            });
          }
          ;
          return new Left(tagError(json3));
        });
      });
    }
  };
  var getField32 = /* @__PURE__ */ getField2(decodeJsonLogonResults);
  var logonResponseTag = "LogonResponse";
  var decodeJsonLogonResponse = {
    decodeJson: function(json3) {
      return bind8(decodeJObject(json3))(function(obj) {
        return bind8(getField3(obj)("tag"))(function(tag) {
          var $106 = tag === logonResponseTag;
          if ($106) {
            return bind8(getField32(obj)("contents"))(function(contents) {
              return new Right(contents);
            });
          }
          ;
          return new Left(tagError(json3));
        });
      });
    }
  };

  // output/Image.BookCover/index.js
  var bookCover = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAFLCAIAAAC2j8WeAAAGOmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iCiAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgZXhpZjpDb2xvclNwYWNlPSIxIgogICBleGlmOlBpeGVsWERpbWVuc2lvbj0iMjU2IgogICBleGlmOlBpeGVsWURpbWVuc2lvbj0iMzMxIgogICBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIgogICBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiCiAgIHRpZmY6SW1hZ2VMZW5ndGg9IjMzMSIKICAgdGlmZjpJbWFnZVdpZHRoPSIyNTYiCiAgIHRpZmY6UmVzb2x1dGlvblVuaXQ9IjIiCiAgIHRpZmY6WFJlc29sdXRpb249IjMwMC4wIgogICB0aWZmOllSZXNvbHV0aW9uPSIzMDAuMCIKICAgeG1wOk1ldGFkYXRhRGF0ZT0i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R/7qLzSzjQJhGB57wslf/vLXdlVZvWpV5+SZtE+C0kc/9ilV3bJla7F1QiPx25133qmq3/nOdz595e616O/vnz9//i7SuvbaaxvP16xZs379urvvvrvxcd68eftHyft9AjSlhSlTpkycODEIAhGpVmuDg0NgrVUgSWKl0MiOZL02oF6vaW4q+ZCpudR3gSOOOHzylM99+K8+O9A/+K2vfnFyz6T3/+mHH1yxjWmFJbPm/Md3/90Pght+8tNPf/8bZRtNrQS50WHgc5/7XKFQuPzyy5999tlzz10a25zWXOob0+ooEIU1tq+CrGfipB/+f/8wfcb0b3/725/85CeTJLnqqquuueaa71371VXvvPiZ2jZcJ8ky4ISjjp01ZeZlH/k/YXn03775L51dne899rQnv/HPdLXsDIfffeUVj2xeMTZYC1rcH1/1f99x5jmfOv+iB7/wWYp5jOwpRWqdrJKQA1XKljghbkpo9XUVpHbk4vlXvPeDwGNPPbV19TYKXjyWACccfcz82XOuuvoLW7btWL1yI0PRt//9syccfcxjTzx54cc/sbM2dt6hx9z8g+987qOXr125+ft33EnBfO7yPz35+BOHhobP/eRHn1i/6sBJ0374f68Bojiyo7YRoB8nMfD+d79n07ZtH/3iX4+MjNRyieScq//t609tXdsfl7WaXHX+pddcefXln/yTb133j5XKMJCmCXD8ccdNnjTpoosuyuVy1113XalUuvXmG5cvX37GGUtPfNvb/vbzVx904EGL2mY8uWk1QiYWWHLI4V3tHe/7m7/QzF539d+3tbX9109+sHLD2rM+8SdHLlj4pT//zLz58xeffeLDm1fQn2aFIhAlEfNmU00Iw9gqcP555x1y+GHv+rOPtQT56776pQkTJrzjHe/82te+Crz3vRd/4hOfAD70Jx/63ve/19XV/c1r/xWo1+t7SsL7CmnmhmgGiQc4RUwrXg/uJDpm0DqFoIvWSbRMp+MAOqeDf9iSE9M0VdU0SZIoSuJIVW/8wY+ZPI/pi4877d2qNo7CBceeTfshHHjYKRe/X1Ur5fLcY8/m0KM48pB/+va3VbVcHj3mPRcxeRHt82/80U9V9Y6772Xqocxc9K3v36CqGzdubJ13OBMPoHvOnq57X/ziF1X10UcfHR+Eu+vhY4891lDKP/nJT6pqpVKZM2dOo1Qu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L7j1m9/7xkf/gbAUdVu7Kz/ykurr6x999NHPfOYzuVxu8eLFZdJjETnllFNGKE8OGzU1NXPmzCmzrL0hXHTRRX/+859nz55trV22bFljYyMwZsyYM8444yDCojeK8847b926dZ/61KdKpZLneRdddNFJJ530Kuf7vn9Ieup58+dNqG+lvygVRnxhMLTPFjRmZfF4vNibqeEhYCxjZ1FZyeBOXbem0GaLj5bCIcvTQ/RaOXMKFTOPcIlvRiXyFeG5uFOineqeEou6IzTmzhkbPZyhs2941D/irR+oTNZMqT556XH33PvH95522uSf/2Dr7l7coZHjJ5xwwrx580455ZRHHnlk5MslS5Y89NBD3/rWt2644Ybdu3cDqVRq8eLFQRCMMDg0NTWl0+m2trb58+fHYrHnn3/+IJEloMzpUCqVxo0bN2nSpJUrVw4ODlZXV7e2tm7durVMvJxKpRobG7dtO8A2vfTSSzs7Oz/4wQ+OfGOMufrqqz/+8Y+/5z3vefbZZwcHB4HJkydPnz69ra2tzGblOM6UKVO6u7uDIFiwYMHu3bvb2g7YmZo6deqvfvWrhx9++Kyzzhqh9CorgNTU1DQ2Nm7dujUIgoaGhtra2vL/v/71r13XHRn+58yZU11dvXbt2kK+EKFEavtDitGimVPqpleuzGzpsnlpadAdb1iQ4tVg0iRcuosMZGmaFdzZJQtSutKoINOEOBz1d/xl25ELMoe3ZAZoWijzW7W7FD1V1I2WBuPUxPT554eH/2EcaXO5Jvm+vzu+c7DnMz+8LhGLXbD0VAjIZUd8Uzt27AC++c1vHnXUUSMXlRmhzz777I985CPAzJkzn3zyySuvvPJ//a//dccdd/i+D1x11VUPPPDAV77ylX//939/6qmnbrnllkOOzdbac8899/bbb3/ooYcef/zx2trasWPHrly58rLLLiufcM0111xxxRUHXbV69eqJEyd+/etfH9GwmTx58rve9S7Hca6++uoyN9Y//uM/3n///R/60Icefvjhcj0rKysffPDB66+//sc//vEdd9yxdu3a8847b/Rtzz33XN/3v/GNb4ymNyz32wsvvPCZZ54phwB/9KMf/ctf/lJXVwf84Ac/uPvuu8tiOddcc82zzz571VVXffOb32waMyaKWWo8f5BfXf2ln1z5pX/48LInv/ezuVUtWl+Dc0QH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";

  // output/Component.Logon/index.js
  var discard3 = /* @__PURE__ */ discard(discardUnit);
  var discard1 = /* @__PURE__ */ discard3(bindStyleM);
  var center3 = /* @__PURE__ */ center(centerAlignItemsValue);
  var center12 = /* @__PURE__ */ center(centerJustifyContentValue);
  var spaceEvenly2 = /* @__PURE__ */ spaceEvenly(spaceEvenlyJustifyContentValue);
  var type_19 = /* @__PURE__ */ type_17(isPropInputType);
  var value16 = /* @__PURE__ */ value12(valString);
  var bind9 = /* @__PURE__ */ bind(bindEffect);
  var modify_3 = /* @__PURE__ */ modify_2(monadStateHalogenM);
  var bind12 = /* @__PURE__ */ bind(bindHalogenM);
  var get4 = /* @__PURE__ */ get(monadStateHalogenM);
  var encodeJson3 = /* @__PURE__ */ encodeJson(encodeJsonLogonRequest);
  var bind22 = /* @__PURE__ */ bind(bindEither);
  var lmap5 = /* @__PURE__ */ lmap(bifunctorEither);
  var decodeJson2 = /* @__PURE__ */ decodeJson(decodeJsonLogonResponse);
  var pure10 = /* @__PURE__ */ pure(applicativeEither);
  var discard22 = /* @__PURE__ */ discard3(bindHalogenM);
  var bindFlipped7 = /* @__PURE__ */ bindFlipped(bindHalogenM);
  var composeKleisliFlipped4 = /* @__PURE__ */ composeKleisliFlipped(bindHalogenM);
  var Logon2 = /* @__PURE__ */ function() {
    function Logon3() {
    }
    ;
    Logon3.value = new Logon3();
    return Logon3;
  }();
  var Input = /* @__PURE__ */ function() {
    function Input3(value0) {
      this.value0 = value0;
    }
    ;
    Input3.create = function(value0) {
      return new Input3(value0);
    };
    return Input3;
  }();
  var component2 = function(dictMonadAff) {
    var liftEffect9 = liftEffect(monadEffectHalogenM(dictMonadAff.MonadEffect0()));
    var liftAff2 = liftAff(monadAffHalogenM(dictMonadAff));
    return function(dictMonadAsk) {
      var ask2 = ask(monadAskHalogenM(dictMonadAsk));
      return function(dictNavigate) {
        var navigate2 = navigate(navigateHalogenM(dictNavigate));
        return function(dictLogonRoute) {
          var logonRoute2 = logonRoute(logonRouteHalogenM(dictLogonRoute));
          return function(dictLog) {
            var logHalogenM2 = logHalogenM(dictLog);
            var log5 = log(logHalogenM2);
            var logEntry2 = logEntry(logHalogenM2);
            var render2 = function(v) {
              var logonDisabled = trim(v.userName) === "" || trim(v.password) === "";
              return div2([style2(discard1(display(flex))(function() {
                return discard1(flexDirection(column))(function() {
                  return discard1(width8(vw(22)))(function() {
                    return discard1(height8(vw(25)))(function() {
                      return discard1(paddingTop(vw(1.25)))(function() {
                        return discard1(paddingBottom(vw(1.25)))(function() {
                          return discard1(paddingLeft(vw(1.5)))(function() {
                            return discard1(paddingRight(vw(1.5)))(function() {
                              return discard1(backgroundColor(paperColor))(function() {
                                return discard1(borderRadius(px(7))(px(7))(px(7))(px(7)))(function() {
                                  return boxShadow(new NonEmpty(bsColor(rgba(0)(0)(24)(0.75))(shadow(px(10))(px(10))), [bsColor(rgba(0)(0)(24)(0.75))(shadow(px(10))(px(20)))]));
                                });
                              });
                            });
                          });
                        });
                      });
                    });
                  });
                });
              }))])([div2([style2(discard1(paddingRight(vw(1)))(function() {
                return discard1(display(flex))(function() {
                  return discard1(flexDirection(column))(function() {
                    return discard1(alignItems(center3))(function() {
                      return discard1(justifyContent(center12))(function() {
                        return flexGrow(10);
                      });
                    });
                  });
                });
              }))])([img([style2(width8(pct(40))), src9(bookCover)])]), div2([style2(discard1(display(flex))(function() {
                return discard1(flexDirection(column))(function() {
                  return discard1(justifyContent(spaceEvenly2))(function() {
                    return discard1(alignItems(center3))(function() {
                      return flexGrow(3);
                    });
                  });
                });
              }))])([div2([style2(discard1(display(flex))(function() {
                return discard1(flexDirection(row))(function() {
                  return discard1(alignItems(center3))(function() {
                    return discard1(justifyContent(center12))(function() {
                      return themeFont;
                    });
                  });
                });
              }))])([label4([style2(width8(rem2(6)))])([text5("Username: ")]), input([onValueInput(function($73) {
                return Input.create(function(s) {
                  return function(v1) {
                    return {
                      userName: s,
                      password: v1.password
                    };
                  };
                }($73));
              }), style2(discard1(backgroundColor(paperColor))(function() {
                return discard1(width8(vw(8.3)))(function() {
                  return discard1(paddingLeft(rem2(0.5)))(function() {
                    return discard1(paddingRight(rem2(0.5)))(function() {
                      return fontSize(vw(1));
                    });
                  });
                });
              }))])]), div2([style2(discard1(display(flex))(function() {
                return discard1(flexDirection(row))(function() {
                  return discard1(alignItems(center3))(function() {
                    return discard1(justifyContent(center12))(function() {
                      return themeFont;
                    });
                  });
                });
              }))])([label4([style2(width8(rem2(6)))])([text5("Password: ")]), input([type_19(InputPassword.value), onValueInput(function($74) {
                return Input.create(function(s) {
                  return function(v1) {
                    return {
                      userName: v1.userName,
                      password: s
                    };
                  };
                }($74));
              }), style2(discard1(backgroundColor(paperColor))(function() {
                return discard1(width8(vw(8.3)))(function() {
                  return discard1(paddingLeft(rem2(0.5)))(function() {
                    return discard1(paddingRight(rem2(0.5)))(function() {
                      return fontSize(vw(1));
                    });
                  });
                });
              }))])])]), div2([style2(discard1(display(flex))(function() {
                return discard1(flexDirection(row))(function() {
                  return discard1(alignItems(center3))(function() {
                    return discard1(justifyContent(center12))(function() {
                      return paddingTop(vw(0.65));
                    });
                  });
                });
              }))])([button([style2(discard1(backgroundColor(themeColor))(function() {
                return discard1(themeFont)(function() {
                  return discard1(fontWeight(value16("500")))(function() {
                    return discard1(fontSize(vw(1)))(function() {
                      return discard1(width8(rem2(20)))(function() {
                        return discard1(height8(vw(3)))(function() {
                          return discard1(color(function() {
                            if (logonDisabled) {
                              return graytone(0.5);
                            }
                            ;
                            return white;
                          }()))(function() {
                            return cursor(function() {
                              var $53 = !logonDisabled;
                              if ($53) {
                                return pointer;
                              }
                              ;
                              return notAllowed;
                            }());
                          });
                        });
                      });
                    });
                  });
                });
              })), onClick($$const(Logon2.value)), disabled10(logonDisabled)])([text5("LOGON")])])]);
            };
            var handleAction = function() {
              var alertError = function(msg) {
                return liftEffect9(bind9(windowImpl)(alert(msg)));
              };
              return function(v) {
                if (v instanceof Input) {
                  return modify_3(v.value0);
                }
                ;
                if (v instanceof Logon2) {
                  return bind12(get4)(function(v1) {
                    return bind12(liftAff2(post2(json2)("http://localhost:3000/")(new Just(json(encodeJson3({
                      userName: v1.userName,
                      password: v1.password
                    }))))))(function(ajaxResult) {
                      var logonResponse = bind22(lmap5(printError)(ajaxResult))(function(v2) {
                        return bind22(lmap5(printJsonDecodeError)(decodeJson2(v2.body)))(function(decodedResp) {
                          return pure10(decodedResp);
                        });
                      });
                      if (logonResponse instanceof Left) {
                        return alertError(logonResponse.value0);
                      }
                      ;
                      if (logonResponse instanceof Right && logonResponse.value0 instanceof LogonResultsFailure) {
                        return alertError("Invalid logon crediantials");
                      }
                      ;
                      if (logonResponse instanceof Right && logonResponse.value0 instanceof LogonResultsSuccess) {
                        return discard22(bindFlipped7(log5)(logEntry2(Info.value)("User logged on")))(function() {
                          return bind12(ask2)(function(v2) {
                            return discard22(liftEffect9(write(new Just({
                              authToken: logonResponse.value0.value0.authToken
                            }))(v2.userRef)))(function() {
                              return composeKleisliFlipped4(navigate2)(logonRoute2)(function() {
                                if (logonResponse.value0.value0.mustChangePassword) {
                                  return PasswordTemporary.value;
                                }
                                ;
                                return PasswordPermanent.value;
                              }());
                            });
                          });
                        });
                      }
                      ;
                      throw new Error("Failed pattern match at Component.Logon (line 94, column 7 - line 101, column 104): " + [logonResponse.constructor.name]);
                    });
                  });
                }
                ;
                throw new Error("Failed pattern match at Component.Logon (line 80, column 18 - line 101, column 104): " + [v.constructor.name]);
              };
            }();
            return mkComponent({
              initialState: function(v) {
                return {
                  userName: "",
                  password: ""
                };
              },
              render: render2,
              "eval": mkEval({
                handleAction,
                handleQuery: defaultEval.handleQuery,
                receive: defaultEval.receive,
                initialize: defaultEval.initialize,
                finalize: defaultEval.finalize
              })
            });
          };
        };
      };
    };
  };

  // output/CSS.Text/index.js
  var fromString17 = /* @__PURE__ */ fromString4(isStringKey);
  var letterSpacing = /* @__PURE__ */ key(valSize)(/* @__PURE__ */ fromString17("letter-spacing"));

  // output/CSS.Text.Shadow/index.js
  var valTuple5 = /* @__PURE__ */ valTuple(valSize);
  var value17 = /* @__PURE__ */ value12(/* @__PURE__ */ valTuple(/* @__PURE__ */ valTuple5(valSize))(/* @__PURE__ */ valTuple5(valColor)));
  var fromString18 = /* @__PURE__ */ fromString4(isStringValue);
  var fromString19 = /* @__PURE__ */ fromString4(isStringKey);
  var TextShadow = /* @__PURE__ */ function() {
    function TextShadow2(value0, value19, value24, value33) {
      this.value0 = value0;
      this.value1 = value19;
      this.value2 = value24;
      this.value3 = value33;
    }
    ;
    TextShadow2.create = function(value0) {
      return function(value19) {
        return function(value24) {
          return function(value33) {
            return new TextShadow2(value0, value19, value24, value33);
          };
        };
      };
    };
    return TextShadow2;
  }();
  var None2 = /* @__PURE__ */ function() {
    function None3() {
    }
    ;
    None3.value = new None3();
    return None3;
  }();
  var Initial = /* @__PURE__ */ function() {
    function Initial2() {
    }
    ;
    Initial2.value = new Initial2();
    return Initial2;
  }();
  var Inherit = /* @__PURE__ */ function() {
    function Inherit2() {
    }
    ;
    Inherit2.value = new Inherit2();
    return Inherit2;
  }();
  var valTextShadow = {
    value: function(v) {
      if (v instanceof TextShadow) {
        return value17(new Tuple(new Tuple(v.value0, v.value1), new Tuple(v.value2, v.value3)));
      }
      ;
      if (v instanceof None2) {
        return fromString18("none");
      }
      ;
      if (v instanceof Initial) {
        return fromString18("initial");
      }
      ;
      if (v instanceof Inherit) {
        return fromString18("inherit");
      }
      ;
      throw new Error("Failed pattern match at CSS.Text.Shadow (line 17, column 1 - line 21, column 41): " + [v.constructor.name]);
    }
  };
  var key6 = /* @__PURE__ */ key(valTextShadow);
  var textShadow = function(h) {
    return function(v) {
      return function(b2) {
        return function(c) {
          return key6(fromString19("text-shadow"))(new TextShadow(h, v, b2, c));
        };
      };
    };
  };

  // output/Halogen.HTML/index.js
  var componentSlot2 = /* @__PURE__ */ componentSlot();
  var slot_ = function() {
    return function(dictIsSymbol) {
      var componentSlot1 = componentSlot2(dictIsSymbol);
      return function(dictOrd) {
        var componentSlot22 = componentSlot1(dictOrd);
        return function(label5) {
          return function(p2) {
            return function(component6) {
              return function(input3) {
                return widget(new ComponentSlot(componentSlot22(label5)(p2)(component6)(input3)($$const(Nothing.value))));
              };
            };
          };
        };
      };
    };
  };
  var slot = function() {
    return function(dictIsSymbol) {
      var componentSlot1 = componentSlot2(dictIsSymbol);
      return function(dictOrd) {
        var componentSlot22 = componentSlot1(dictOrd);
        return function(label5) {
          return function(p2) {
            return function(component6) {
              return function(input3) {
                return function(outputQuery) {
                  return widget(new ComponentSlot(componentSlot22(label5)(p2)(component6)(input3)(function($11) {
                    return Just.create(outputQuery($11));
                  })));
                };
              };
            };
          };
        };
      };
    };
  };

  // output/Component.Page/index.js
  var discard4 = /* @__PURE__ */ discard(discardUnit)(bindStyleM);
  var center4 = /* @__PURE__ */ center(centerAlignItemsValue);
  var flexStart2 = /* @__PURE__ */ flexStart(flexStartJustifyContentValue);
  var value18 = /* @__PURE__ */ value12(valString);
  var flexEnd2 = /* @__PURE__ */ flexEnd(flexEndJustifyContentValue);
  var center13 = /* @__PURE__ */ center(centerJustifyContentValue);
  var innerIsSymbol = {
    reflectSymbol: function() {
      return "inner";
    }
  };
  var slot2 = /* @__PURE__ */ slot()(innerIsSymbol)(ordUnit);
  var query2 = /* @__PURE__ */ query()(innerIsSymbol)(ordUnit);
  var modify_4 = /* @__PURE__ */ modify_2(monadStateHalogenM);
  var Input2 = /* @__PURE__ */ function() {
    function Input3(value0) {
      this.value0 = value0;
    }
    ;
    Input3.create = function(value0) {
      return new Input3(value0);
    };
    return Input3;
  }();
  var Output = /* @__PURE__ */ function() {
    function Output2(value0) {
      this.value0 = value0;
    }
    ;
    Output2.create = function(value0) {
      return new Output2(value0);
    };
    return Output2;
  }();
  var Logoff2 = /* @__PURE__ */ function() {
    function Logoff3() {
    }
    ;
    Logoff3.value = new Logoff3();
    return Logoff3;
  }();
  var _inner = /* @__PURE__ */ function() {
    return $$Proxy.value;
  }();
  var component3 = function(dictMonadAff) {
    return function(dictNavigate) {
      var navigate2 = navigate(navigateHalogenM(dictNavigate));
      return function(innerComponent) {
        var render2 = function(v) {
          return div2([style2(paddingTop(rem2(5)))])([header([style2(discard4(position2(fixed))(function() {
            return discard4(top3(px(0)))(function() {
              return discard4(width8(pct(100)))(function() {
                return discard4(height8(rem2(4)))(function() {
                  return discard4(boxShadow(new NonEmpty(bsColor(rgba(0)(0)(24)(0.75))(shadow(px(10))(px(10))), [bsColor(rgba(0)(0)(24)(0.75))(shadow(px(10))(px(20)))])))(function() {
                    return discard4(display(flex))(function() {
                      return discard4(alignItems(center4))(function() {
                        return discard4(justifyContent(flexStart2))(function() {
                          return discard4(backgroundColor(themeColor))(function() {
                            return zIndex(1);
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          }))])([div2([style2(discard4(paddingLeft(rem2(1)))(function() {
            return discard4(color(paperColor))(function() {
              return discard4(display(flex))(function() {
                return discard4(flexDirection(row))(function() {
                  return discard4(alignItems(center4))(function() {
                    return discard4(flexBasis(px(0)))(function() {
                      return discard4(flexGrow(1))(function() {
                        return flexShrink(1);
                      });
                    });
                  });
                });
              });
            });
          }))])([img([style2(width8(px(40))), src9(bookCover)]), span4([style2(discard4(paddingLeft(rem2(1)))(function() {
            return discard4(fontSize(rem2(1.3)))(function() {
              return discard4(themeFont)(function() {
                return discard4(textShadow(px(0))(px(0))(px(5))(rgba(0)(0)(0)(1)))(function() {
                  return discard4(fontWeight(value18("500")))(function() {
                    return letterSpacing(rem2(0.05));
                  });
                });
              });
            });
          }))])([text5("Functional Programming Made Easier")]), div2([style2(discard4(display(flex))(function() {
            return discard4(flexGrow(1))(function() {
              return discard4(justifyContent(flexEnd2))(function() {
                return paddingRight(rem2(1));
              });
            });
          }))])([span4([style2(discard4(themeFont)(function() {
            return discard4(fontWeight(value18("500")))(function() {
              return discard4(color(white))(function() {
                return discard4(padding(rem2(1))(rem2(1))(rem2(1))(rem2(1)))(function() {
                  return cursor(pointer);
                });
              });
            });
          })), onClick($$const(Logoff2.value))])([text5("Logoff")])])])]), div2([style2(discard4(display(flex))(function() {
            return discard4(alignItems(center4))(function() {
              return discard4(justifyContent(center13))(function() {
                return minHeight(vh(90));
              });
            });
          }))])([slot2(_inner)(unit)(innerComponent)(v.iInput)(Output.create)])]);
        };
        var handleQuery = query2(_inner)(unit);
        var handleAction = function(v) {
          if (v instanceof Input2) {
            return modify_4(function(v1) {
              var $28 = {};
              for (var $29 in v1) {
                if ({}.hasOwnProperty.call(v1, $29)) {
                  $28[$29] = v1[$29];
                }
                ;
              }
              ;
              $28.iInput = v.value0;
              return $28;
            });
          }
          ;
          if (v instanceof Output) {
            return raise(v.value0);
          }
          ;
          if (v instanceof Logoff2) {
            return navigate2(Logoff.value);
          }
          ;
          throw new Error("Failed pattern match at Component.Page (line 63, column 18 - line 66, column 36): " + [v.constructor.name]);
        };
        return mkComponent({
          initialState: function(v) {
            return {
              iInput: v
            };
          },
          render: render2,
          "eval": mkEval({
            handleAction,
            handleQuery,
            receive: function($33) {
              return Just.create(Input2.create($33));
            },
            initialize: defaultEval.initialize,
            finalize: defaultEval.finalize
          })
        });
      };
    };
  };

  // output/Component.Router/index.js
  var slot3 = /* @__PURE__ */ slot()({
    reflectSymbol: function() {
      return "logon";
    }
  })(ordUnit);
  var slot_2 = /* @__PURE__ */ slot_()({
    reflectSymbol: function() {
      return "changePassword";
    }
  })(ordUnit);
  var bind10 = /* @__PURE__ */ bind(bindHalogenM);
  var discard5 = /* @__PURE__ */ discard(discardUnit)(bindHalogenM);
  var modify_5 = /* @__PURE__ */ modify_2(monadStateHalogenM);
  var pure11 = /* @__PURE__ */ pure(applicativeHalogenM);
  var Navigate = /* @__PURE__ */ function() {
    function Navigate2(value0, value19) {
      this.value0 = value0;
      this.value1 = value19;
    }
    ;
    Navigate2.create = function(value0) {
      return function(value19) {
        return new Navigate2(value0, value19);
      };
    };
    return Navigate2;
  }();
  var _logon = /* @__PURE__ */ function() {
    return $$Proxy.value;
  }();
  var _changePassword = /* @__PURE__ */ function() {
    return $$Proxy.value;
  }();
  var component4 = function(dictMonadAff) {
    var component1 = component3(dictMonadAff);
    var component22 = component2(dictMonadAff);
    var component32 = component(dictMonadAff);
    var liftEffect9 = liftEffect(monadEffectHalogenM(dictMonadAff.MonadEffect0()));
    return function(dictNavigate) {
      var component42 = component1(dictNavigate);
      var component52 = component32(dictNavigate);
      var navigate2 = navigate(navigateHalogenM(dictNavigate));
      return function(dictMonadAsk) {
        var component6 = component22(dictMonadAsk)(dictNavigate);
        var ask2 = ask(monadAskHalogenM(dictMonadAsk));
        return function(dictLogonRoute) {
          var component7 = component6(dictLogonRoute);
          return function(dictLog) {
            var component8 = component7(dictLog);
            var render2 = function(v) {
              if (v.route instanceof Logon) {
                return slot3(_logon)(unit)(component42(component8))(unit)(absurd);
              }
              ;
              if (v.route instanceof Logoff) {
                return span4([style2(color(white))])([text5("Logoff")]);
              }
              ;
              if (v.route instanceof Users) {
                return span4([style2(color(white))])([text5("Users")]);
              }
              ;
              if (v.route instanceof ChangePassword) {
                return slot_2(_changePassword)(unit)(component42(component52))(unit);
              }
              ;
              throw new Error("Failed pattern match at Component.Router (line 59, column 22 - line 63, column 99): " + [v.route.constructor.name]);
            };
            var handleQuery = function(v) {
              return bind10(ask2)(function(v1) {
                return bind10(liftEffect9(read(v1.userRef)))(function(ref2) {
                  return discard5(function() {
                    var $45 = isNothing(ref2);
                    if ($45) {
                      return navigate2(Logon.value);
                    }
                    ;
                    return modify_5(function(v2) {
                      var $46 = {};
                      for (var $47 in v2) {
                        if ({}.hasOwnProperty.call(v2, $47)) {
                          $46[$47] = v2[$47];
                        }
                        ;
                      }
                      ;
                      $46.route = v.value0;
                      return $46;
                    });
                  }())(function() {
                    return pure11(new Just(v.value1));
                  });
                });
              });
            };
            return mkComponent({
              initialState: $$const({
                route: Logon.value
              }),
              render: render2,
              "eval": mkEval({
                handleAction: defaultEval.handleAction,
                handleQuery,
                receive: defaultEval.receive,
                initialize: defaultEval.initialize,
                finalize: defaultEval.finalize
              })
            });
          };
        };
      };
    };
  };

  // output/Halogen.Aff.Util/index.js
  var bind11 = /* @__PURE__ */ bind(bindAff);
  var liftEffect4 = /* @__PURE__ */ liftEffect(monadEffectAff);
  var bindFlipped8 = /* @__PURE__ */ bindFlipped(bindEffect);
  var composeKleisliFlipped5 = /* @__PURE__ */ composeKleisliFlipped(bindEffect);
  var pure12 = /* @__PURE__ */ pure(applicativeAff);
  var bindFlipped1 = /* @__PURE__ */ bindFlipped(bindMaybe);
  var pure13 = /* @__PURE__ */ pure(applicativeEffect);
  var map34 = /* @__PURE__ */ map(functorEffect);
  var discard6 = /* @__PURE__ */ discard(discardUnit);
  var throwError2 = /* @__PURE__ */ throwError(monadThrowAff);
  var selectElement = function(query3) {
    return bind11(liftEffect4(bindFlipped8(composeKleisliFlipped5(function() {
      var $16 = querySelector(query3);
      return function($17) {
        return $16(toParentNode($17));
      };
    }())(document))(windowImpl)))(function(mel) {
      return pure12(bindFlipped1(fromElement)(mel));
    });
  };
  var runHalogenAff = /* @__PURE__ */ runAff_(/* @__PURE__ */ either(throwException)(/* @__PURE__ */ $$const(/* @__PURE__ */ pure13(unit))));
  var awaitLoad = /* @__PURE__ */ makeAff(function(callback) {
    return function __do3() {
      var rs = bindFlipped8(readyState)(bindFlipped8(document)(windowImpl))();
      if (rs instanceof Loading) {
        var et = map34(toEventTarget)(windowImpl)();
        var listener = eventListener(function(v) {
          return callback(new Right(unit));
        })();
        addEventListener(domcontentloaded)(listener)(false)(et)();
        return effectCanceler(removeEventListener(domcontentloaded)(listener)(false)(et));
      }
      ;
      callback(new Right(unit))();
      return nonCanceler;
    };
  });
  var awaitBody = /* @__PURE__ */ discard6(bindAff)(awaitLoad)(function() {
    return bind11(selectElement("body"))(function(body2) {
      return maybe(throwError2(error("Could not find body")))(pure12)(body2);
    });
  });

  // output/Halogen.Query/index.js
  var mkTell = function(act) {
    return act(unit);
  };

  // output/Control.Monad.Fork.Class/index.js
  var monadForkAff = {
    suspend: suspendAff,
    fork: forkAff,
    join: joinFiber,
    Monad0: function() {
      return monadAff;
    },
    Functor1: function() {
      return functorFiber;
    }
  };
  var fork2 = function(dict) {
    return dict.fork;
  };

  // output/Halogen.Aff.Driver.State/index.js
  var unRenderStateX = unsafeCoerce2;
  var unDriverStateX = unsafeCoerce2;
  var renderStateX_ = function(dictApplicative) {
    var traverse_7 = traverse_(dictApplicative)(foldableMaybe);
    return function(f) {
      return unDriverStateX(function(st) {
        return traverse_7(f)(st.rendering);
      });
    };
  };
  var mkRenderStateX = unsafeCoerce2;
  var renderStateX = function(dictFunctor) {
    return function(f) {
      return unDriverStateX(function(st) {
        return mkRenderStateX(f(st.rendering));
      });
    };
  };
  var mkDriverStateXRef = unsafeCoerce2;
  var mapDriverState = function(f) {
    return function(v) {
      return f(v);
    };
  };
  var initDriverState = function(component6) {
    return function(input3) {
      return function(handler3) {
        return function(lchs) {
          return function __do3() {
            var selfRef = $$new({})();
            var childrenIn = $$new(empty5)();
            var childrenOut = $$new(empty5)();
            var handlerRef = $$new(handler3)();
            var pendingQueries = $$new(new Just(Nil.value))();
            var pendingOuts = $$new(new Just(Nil.value))();
            var pendingHandlers = $$new(Nothing.value)();
            var fresh2 = $$new(1)();
            var subscriptions = $$new(new Just(empty4))();
            var forks = $$new(empty4)();
            var ds = {
              component: component6,
              state: component6.initialState(input3),
              refs: empty4,
              children: empty5,
              childrenIn,
              childrenOut,
              selfRef,
              handlerRef,
              pendingQueries,
              pendingOuts,
              pendingHandlers,
              rendering: Nothing.value,
              fresh: fresh2,
              subscriptions,
              forks,
              lifecycleHandlers: lchs
            };
            write(ds)(selfRef)();
            return mkDriverStateXRef(selfRef);
          };
        };
      };
    };
  };

  // output/Halogen.Aff.Driver.Eval/index.js
  var traverse_4 = /* @__PURE__ */ traverse_(applicativeEffect)(foldableMaybe);
  var bindFlipped9 = /* @__PURE__ */ bindFlipped(bindMaybe);
  var lookup9 = /* @__PURE__ */ lookup2(ordSubscriptionId);
  var bind13 = /* @__PURE__ */ bind(bindAff);
  var liftEffect5 = /* @__PURE__ */ liftEffect(monadEffectAff);
  var discard7 = /* @__PURE__ */ discard(discardUnit);
  var discard12 = /* @__PURE__ */ discard7(bindAff);
  var traverse_12 = /* @__PURE__ */ traverse_(applicativeAff);
  var traverse_22 = /* @__PURE__ */ traverse_12(foldableList);
  var fork3 = /* @__PURE__ */ fork2(monadForkAff);
  var parSequence_2 = /* @__PURE__ */ parSequence_(parallelAff)(foldableList);
  var pure14 = /* @__PURE__ */ pure(applicativeAff);
  var map35 = /* @__PURE__ */ map(functorCoyoneda);
  var parallel2 = /* @__PURE__ */ parallel(parallelAff);
  var map114 = /* @__PURE__ */ map(functorAff);
  var sequential2 = /* @__PURE__ */ sequential(parallelAff);
  var map210 = /* @__PURE__ */ map(functorMaybe);
  var insert7 = /* @__PURE__ */ insert(ordSubscriptionId);
  var retractFreeAp2 = /* @__PURE__ */ retractFreeAp(applicativeParAff);
  var $$delete4 = /* @__PURE__ */ $$delete(ordForkId);
  var unlessM2 = /* @__PURE__ */ unlessM(monadEffect);
  var insert12 = /* @__PURE__ */ insert(ordForkId);
  var traverse_32 = /* @__PURE__ */ traverse_12(foldableMaybe);
  var lookup12 = /* @__PURE__ */ lookup2(ordForkId);
  var lookup22 = /* @__PURE__ */ lookup2(ordString);
  var foldFree2 = /* @__PURE__ */ foldFree(monadRecAff);
  var alter2 = /* @__PURE__ */ alter(ordString);
  var unsubscribe3 = function(sid) {
    return function(ref2) {
      return function __do3() {
        var v = read(ref2)();
        var subs = read(v.subscriptions)();
        return traverse_4(unsubscribe)(bindFlipped9(lookup9(sid))(subs))();
      };
    };
  };
  var queueOrRun = function(ref2) {
    return function(au) {
      return bind13(liftEffect5(read(ref2)))(function(v) {
        if (v instanceof Nothing) {
          return au;
        }
        ;
        if (v instanceof Just) {
          return liftEffect5(write(new Just(new Cons(au, v.value0)))(ref2));
        }
        ;
        throw new Error("Failed pattern match at Halogen.Aff.Driver.Eval (line 188, column 33 - line 190, column 57): " + [v.constructor.name]);
      });
    };
  };
  var handleLifecycle = function(lchs) {
    return function(f) {
      return discard12(liftEffect5(write({
        initializers: Nil.value,
        finalizers: Nil.value
      })(lchs)))(function() {
        return bind13(liftEffect5(f))(function(result) {
          return bind13(liftEffect5(read(lchs)))(function(v) {
            return discard12(traverse_22(fork3)(v.finalizers))(function() {
              return discard12(parSequence_2(v.initializers))(function() {
                return pure14(result);
              });
            });
          });
        });
      });
    };
  };
  var handleAff = /* @__PURE__ */ runAff_(/* @__PURE__ */ either(throwException)(/* @__PURE__ */ $$const(/* @__PURE__ */ pure(applicativeEffect)(unit))));
  var fresh = function(f) {
    return function(ref2) {
      return bind13(liftEffect5(read(ref2)))(function(v) {
        return liftEffect5(modify$prime(function(i2) {
          return {
            state: i2 + 1 | 0,
            value: f(i2)
          };
        })(v.fresh));
      });
    };
  };
  var evalQ = function(render2) {
    return function(ref2) {
      return function(q2) {
        return bind13(liftEffect5(read(ref2)))(function(v) {
          return evalM(render2)(ref2)(v["component"]["eval"](new Query2(map35(Just.create)(liftCoyoneda(q2)), $$const(Nothing.value))));
        });
      };
    };
  };
  var evalM = function(render2) {
    return function(initRef) {
      return function(v) {
        var evalChildQuery = function(ref2) {
          return function(cqb) {
            return bind13(liftEffect5(read(ref2)))(function(v1) {
              return unChildQueryBox(function(v2) {
                var evalChild = function(v3) {
                  return parallel2(bind13(liftEffect5(read(v3)))(function(dsx) {
                    return unDriverStateX(function(ds) {
                      return evalQ(render2)(ds.selfRef)(v2.value1);
                    })(dsx);
                  }));
                };
                return map114(v2.value2)(sequential2(v2.value0(applicativeParAff)(evalChild)(v1.children)));
              })(cqb);
            });
          };
        };
        var go2 = function(ref2) {
          return function(v1) {
            if (v1 instanceof State) {
              return bind13(liftEffect5(read(ref2)))(function(v2) {
                var v3 = v1.value0(v2.state);
                if (unsafeRefEq(v2.state)(v3.value1)) {
                  return pure14(v3.value0);
                }
                ;
                if (otherwise) {
                  return discard12(liftEffect5(write({
                    component: v2.component,
                    state: v3.value1,
                    refs: v2.refs,
                    children: v2.children,
                    childrenIn: v2.childrenIn,
                    childrenOut: v2.childrenOut,
                    selfRef: v2.selfRef,
                    handlerRef: v2.handlerRef,
                    pendingQueries: v2.pendingQueries,
                    pendingOuts: v2.pendingOuts,
                    pendingHandlers: v2.pendingHandlers,
                    rendering: v2.rendering,
                    fresh: v2.fresh,
                    subscriptions: v2.subscriptions,
                    forks: v2.forks,
                    lifecycleHandlers: v2.lifecycleHandlers
                  })(ref2)))(function() {
                    return discard12(handleLifecycle(v2.lifecycleHandlers)(render2(v2.lifecycleHandlers)(ref2)))(function() {
                      return pure14(v3.value0);
                    });
                  });
                }
                ;
                throw new Error("Failed pattern match at Halogen.Aff.Driver.Eval (line 86, column 7 - line 92, column 21): " + [v3.constructor.name]);
              });
            }
            ;
            if (v1 instanceof Subscribe) {
              return bind13(fresh(SubscriptionId)(ref2))(function(sid) {
                return bind13(liftEffect5(subscribe(v1.value0(sid))(function(act) {
                  return handleAff(evalF(render2)(ref2)(new Action(act)));
                })))(function(finalize) {
                  return bind13(liftEffect5(read(ref2)))(function(v2) {
                    return discard12(liftEffect5(modify_(map210(insert7(sid)(finalize)))(v2.subscriptions)))(function() {
                      return pure14(v1.value1(sid));
                    });
                  });
                });
              });
            }
            ;
            if (v1 instanceof Unsubscribe) {
              return discard12(liftEffect5(unsubscribe3(v1.value0)(ref2)))(function() {
                return pure14(v1.value1);
              });
            }
            ;
            if (v1 instanceof Lift2) {
              return v1.value0;
            }
            ;
            if (v1 instanceof ChildQuery2) {
              return evalChildQuery(ref2)(v1.value0);
            }
            ;
            if (v1 instanceof Raise) {
              return bind13(liftEffect5(read(ref2)))(function(v2) {
                return bind13(liftEffect5(read(v2.handlerRef)))(function(handler3) {
                  return discard12(queueOrRun(v2.pendingOuts)(handler3(v1.value0)))(function() {
                    return pure14(v1.value1);
                  });
                });
              });
            }
            ;
            if (v1 instanceof Par) {
              return sequential2(retractFreeAp2(hoistFreeAp(function() {
                var $118 = evalM(render2)(ref2);
                return function($119) {
                  return parallel2($118($119));
                };
              }())(v1.value0)));
            }
            ;
            if (v1 instanceof Fork) {
              return bind13(fresh(ForkId)(ref2))(function(fid) {
                return bind13(liftEffect5(read(ref2)))(function(v2) {
                  return bind13(liftEffect5($$new(false)))(function(doneRef) {
                    return bind13(fork3($$finally(liftEffect5(function __do3() {
                      modify_($$delete4(fid))(v2.forks)();
                      return write(true)(doneRef)();
                    }))(evalM(render2)(ref2)(v1.value0))))(function(fiber) {
                      return discard12(liftEffect5(unlessM2(read(doneRef))(modify_(insert12(fid)(fiber))(v2.forks))))(function() {
                        return pure14(v1.value1(fid));
                      });
                    });
                  });
                });
              });
            }
            ;
            if (v1 instanceof Join) {
              return bind13(liftEffect5(read(ref2)))(function(v2) {
                return bind13(liftEffect5(read(v2.forks)))(function(forkMap) {
                  return discard12(traverse_32(joinFiber)(lookup12(v1.value0)(forkMap)))(function() {
                    return pure14(v1.value1);
                  });
                });
              });
            }
            ;
            if (v1 instanceof Kill) {
              return bind13(liftEffect5(read(ref2)))(function(v2) {
                return bind13(liftEffect5(read(v2.forks)))(function(forkMap) {
                  return discard12(traverse_32(killFiber(error("Cancelled")))(lookup12(v1.value0)(forkMap)))(function() {
                    return pure14(v1.value1);
                  });
                });
              });
            }
            ;
            if (v1 instanceof GetRef) {
              return bind13(liftEffect5(read(ref2)))(function(v2) {
                return pure14(v1.value1(lookup22(v1.value0)(v2.refs)));
              });
            }
            ;
            throw new Error("Failed pattern match at Halogen.Aff.Driver.Eval (line 83, column 12 - line 139, column 33): " + [v1.constructor.name]);
          };
        };
        return foldFree2(go2(initRef))(v);
      };
    };
  };
  var evalF = function(render2) {
    return function(ref2) {
      return function(v) {
        if (v instanceof RefUpdate) {
          return liftEffect5(flip(modify_)(ref2)(mapDriverState(function(st) {
            return {
              component: st.component,
              state: st.state,
              refs: alter2($$const(v.value1))(v.value0)(st.refs),
              children: st.children,
              childrenIn: st.childrenIn,
              childrenOut: st.childrenOut,
              selfRef: st.selfRef,
              handlerRef: st.handlerRef,
              pendingQueries: st.pendingQueries,
              pendingOuts: st.pendingOuts,
              pendingHandlers: st.pendingHandlers,
              rendering: st.rendering,
              fresh: st.fresh,
              subscriptions: st.subscriptions,
              forks: st.forks,
              lifecycleHandlers: st.lifecycleHandlers
            };
          })));
        }
        ;
        if (v instanceof Action) {
          return bind13(liftEffect5(read(ref2)))(function(v1) {
            return evalM(render2)(ref2)(v1["component"]["eval"](new Action2(v.value0, unit)));
          });
        }
        ;
        throw new Error("Failed pattern match at Halogen.Aff.Driver.Eval (line 52, column 20 - line 58, column 62): " + [v.constructor.name]);
      };
    };
  };

  // output/Halogen.Aff.Driver/index.js
  var bind14 = /* @__PURE__ */ bind(bindEffect);
  var discard8 = /* @__PURE__ */ discard(discardUnit);
  var for_2 = /* @__PURE__ */ for_(applicativeEffect)(foldableMaybe);
  var traverse_5 = /* @__PURE__ */ traverse_(applicativeAff)(foldableList);
  var fork4 = /* @__PURE__ */ fork2(monadForkAff);
  var bindFlipped10 = /* @__PURE__ */ bindFlipped(bindEffect);
  var traverse_13 = /* @__PURE__ */ traverse_(applicativeEffect);
  var traverse_23 = /* @__PURE__ */ traverse_13(foldableMaybe);
  var traverse_33 = /* @__PURE__ */ traverse_13(foldableMap);
  var discard23 = /* @__PURE__ */ discard8(bindAff);
  var parSequence_3 = /* @__PURE__ */ parSequence_(parallelAff)(foldableList);
  var liftEffect6 = /* @__PURE__ */ liftEffect(monadEffectAff);
  var pure15 = /* @__PURE__ */ pure(applicativeEffect);
  var map36 = /* @__PURE__ */ map(functorEffect);
  var pure16 = /* @__PURE__ */ pure(applicativeAff);
  var when2 = /* @__PURE__ */ when(applicativeEffect);
  var renderStateX2 = /* @__PURE__ */ renderStateX(functorEffect);
  var $$void6 = /* @__PURE__ */ $$void(functorAff);
  var foreachSlot2 = /* @__PURE__ */ foreachSlot(applicativeEffect);
  var renderStateX_2 = /* @__PURE__ */ renderStateX_(applicativeEffect);
  var tailRecM3 = /* @__PURE__ */ tailRecM(monadRecEffect);
  var voidLeft3 = /* @__PURE__ */ voidLeft(functorEffect);
  var bind15 = /* @__PURE__ */ bind(bindAff);
  var liftEffect1 = /* @__PURE__ */ liftEffect(monadEffectEffect);
  var newLifecycleHandlers = /* @__PURE__ */ function() {
    return $$new({
      initializers: Nil.value,
      finalizers: Nil.value
    });
  }();
  var handlePending = function(ref2) {
    return function __do3() {
      var queue = read(ref2)();
      write(Nothing.value)(ref2)();
      return for_2(queue)(function() {
        var $58 = traverse_5(fork4);
        return function($59) {
          return handleAff($58(reverse($59)));
        };
      }())();
    };
  };
  var cleanupSubscriptionsAndForks = function(v) {
    return function __do3() {
      bindFlipped10(traverse_23(traverse_33(unsubscribe)))(read(v.subscriptions))();
      write(Nothing.value)(v.subscriptions)();
      bindFlipped10(traverse_33(function() {
        var $60 = killFiber(error("finalized"));
        return function($61) {
          return handleAff($60($61));
        };
      }()))(read(v.forks))();
      return write(empty4)(v.forks)();
    };
  };
  var runUI = function(renderSpec2) {
    return function(component6) {
      return function(i2) {
        var squashChildInitializers = function(lchs) {
          return function(preInits) {
            return unDriverStateX(function(st) {
              var parentInitializer = evalM(render2)(st.selfRef)(st["component"]["eval"](new Initialize(unit)));
              return modify_(function(handlers) {
                return {
                  initializers: new Cons(discard23(parSequence_3(reverse(handlers.initializers)))(function() {
                    return discard23(parentInitializer)(function() {
                      return liftEffect6(function __do3() {
                        handlePending(st.pendingQueries)();
                        return handlePending(st.pendingOuts)();
                      });
                    });
                  }), preInits),
                  finalizers: handlers.finalizers
                };
              })(lchs);
            });
          };
        };
        var runComponent = function(lchs) {
          return function(handler3) {
            return function(j) {
              return unComponent(function(c) {
                return function __do3() {
                  var lchs$prime = newLifecycleHandlers();
                  var $$var2 = initDriverState(c)(j)(handler3)(lchs$prime)();
                  var pre2 = read(lchs)();
                  write({
                    initializers: Nil.value,
                    finalizers: pre2.finalizers
                  })(lchs)();
                  bindFlipped10(unDriverStateX(function() {
                    var $62 = render2(lchs);
                    return function($63) {
                      return $62(function(v) {
                        return v.selfRef;
                      }($63));
                    };
                  }()))(read($$var2))();
                  bindFlipped10(squashChildInitializers(lchs)(pre2.initializers))(read($$var2))();
                  return $$var2;
                };
              });
            };
          };
        };
        var renderChild = function(lchs) {
          return function(handler3) {
            return function(childrenInRef) {
              return function(childrenOutRef) {
                return unComponentSlot(function(slot4) {
                  return function __do3() {
                    var childrenIn = map36(slot4.pop)(read(childrenInRef))();
                    var $$var2 = function() {
                      if (childrenIn instanceof Just) {
                        write(childrenIn.value0.value1)(childrenInRef)();
                        var dsx = read(childrenIn.value0.value0)();
                        unDriverStateX(function(st) {
                          return function __do4() {
                            flip(write)(st.handlerRef)(function() {
                              var $64 = maybe(pure16(unit))(handler3);
                              return function($65) {
                                return $64(slot4.output($65));
                              };
                            }())();
                            return handleAff(evalM(render2)(st.selfRef)(st["component"]["eval"](new Receive(slot4.input, unit))))();
                          };
                        })(dsx)();
                        return childrenIn.value0.value0;
                      }
                      ;
                      if (childrenIn instanceof Nothing) {
                        return runComponent(lchs)(function() {
                          var $66 = maybe(pure16(unit))(handler3);
                          return function($67) {
                            return $66(slot4.output($67));
                          };
                        }())(slot4.input)(slot4.component)();
                      }
                      ;
                      throw new Error("Failed pattern match at Halogen.Aff.Driver (line 213, column 14 - line 222, column 98): " + [childrenIn.constructor.name]);
                    }();
                    var isDuplicate = map36(function($68) {
                      return isJust(slot4.get($68));
                    })(read(childrenOutRef))();
                    when2(isDuplicate)(warn("Halogen: Duplicate slot address was detected during rendering, unexpected results may occur"))();
                    modify_(slot4.set($$var2))(childrenOutRef)();
                    return bind14(read($$var2))(renderStateX2(function(v) {
                      if (v instanceof Nothing) {
                        return $$throw("Halogen internal error: child was not initialized in renderChild");
                      }
                      ;
                      if (v instanceof Just) {
                        return pure15(renderSpec2.renderChild(v.value0));
                      }
                      ;
                      throw new Error("Failed pattern match at Halogen.Aff.Driver (line 227, column 37 - line 229, column 50): " + [v.constructor.name]);
                    }))();
                  };
                });
              };
            };
          };
        };
        var render2 = function(lchs) {
          return function($$var2) {
            return function __do3() {
              var v = read($$var2)();
              var shouldProcessHandlers = map36(isNothing)(read(v.pendingHandlers))();
              when2(shouldProcessHandlers)(write(new Just(Nil.value))(v.pendingHandlers))();
              write(empty5)(v.childrenOut)();
              write(v.children)(v.childrenIn)();
              var handler3 = function() {
                var $69 = queueOrRun(v.pendingHandlers);
                var $70 = evalF(render2)(v.selfRef);
                return function($71) {
                  return $69($$void6($70($71)));
                };
              }();
              var childHandler = function() {
                var $72 = queueOrRun(v.pendingQueries);
                return function($73) {
                  return $72(handler3(Action.create($73)));
                };
              }();
              var rendering = renderSpec2.render(function($74) {
                return handleAff(handler3($74));
              })(renderChild(lchs)(childHandler)(v.childrenIn)(v.childrenOut))(v.component.render(v.state))(v.rendering)();
              var children2 = read(v.childrenOut)();
              var childrenIn = read(v.childrenIn)();
              foreachSlot2(childrenIn)(function(v1) {
                return function __do4() {
                  var childDS = read(v1)();
                  renderStateX_2(renderSpec2.removeChild)(childDS)();
                  return finalize(lchs)(childDS)();
                };
              })();
              flip(modify_)(v.selfRef)(mapDriverState(function(ds$prime) {
                return {
                  component: ds$prime.component,
                  state: ds$prime.state,
                  refs: ds$prime.refs,
                  children: children2,
                  childrenIn: ds$prime.childrenIn,
                  childrenOut: ds$prime.childrenOut,
                  selfRef: ds$prime.selfRef,
                  handlerRef: ds$prime.handlerRef,
                  pendingQueries: ds$prime.pendingQueries,
                  pendingOuts: ds$prime.pendingOuts,
                  pendingHandlers: ds$prime.pendingHandlers,
                  rendering: new Just(rendering),
                  fresh: ds$prime.fresh,
                  subscriptions: ds$prime.subscriptions,
                  forks: ds$prime.forks,
                  lifecycleHandlers: ds$prime.lifecycleHandlers
                };
              }))();
              return when2(shouldProcessHandlers)(flip(tailRecM3)(unit)(function(v1) {
                return function __do4() {
                  var handlers = read(v.pendingHandlers)();
                  write(new Just(Nil.value))(v.pendingHandlers)();
                  traverse_23(function() {
                    var $75 = traverse_5(fork4);
                    return function($76) {
                      return handleAff($75(reverse($76)));
                    };
                  }())(handlers)();
                  var mmore = read(v.pendingHandlers)();
                  var $51 = maybe(false)($$null)(mmore);
                  if ($51) {
                    return voidLeft3(write(Nothing.value)(v.pendingHandlers))(new Done(unit))();
                  }
                  ;
                  return new Loop(unit);
                };
              }))();
            };
          };
        };
        var finalize = function(lchs) {
          return unDriverStateX(function(st) {
            return function __do3() {
              cleanupSubscriptionsAndForks(st)();
              var f = evalM(render2)(st.selfRef)(st["component"]["eval"](new Finalize(unit)));
              modify_(function(handlers) {
                return {
                  initializers: handlers.initializers,
                  finalizers: new Cons(f, handlers.finalizers)
                };
              })(lchs)();
              return foreachSlot2(st.children)(function(v) {
                return function __do4() {
                  var dsx = read(v)();
                  return finalize(lchs)(dsx)();
                };
              })();
            };
          });
        };
        var evalDriver = function(disposed) {
          return function(ref2) {
            return function(q2) {
              return bind15(liftEffect6(read(disposed)))(function(v) {
                if (v) {
                  return pure16(Nothing.value);
                }
                ;
                return evalQ(render2)(ref2)(q2);
              });
            };
          };
        };
        var dispose = function(disposed) {
          return function(lchs) {
            return function(dsx) {
              return handleLifecycle(lchs)(function __do3() {
                var v = read(disposed)();
                if (v) {
                  return unit;
                }
                ;
                write(true)(disposed)();
                finalize(lchs)(dsx)();
                return unDriverStateX(function(v1) {
                  return function __do4() {
                    var v2 = liftEffect1(read(v1.selfRef))();
                    return for_2(v2.rendering)(renderSpec2.dispose)();
                  };
                })(dsx)();
              });
            };
          };
        };
        return bind15(liftEffect6(newLifecycleHandlers))(function(lchs) {
          return bind15(liftEffect6($$new(false)))(function(disposed) {
            return handleLifecycle(lchs)(function __do3() {
              var sio = create();
              var dsx = bindFlipped10(read)(runComponent(lchs)(function() {
                var $77 = notify(sio.listener);
                return function($78) {
                  return liftEffect6($77($78));
                };
              }())(i2)(component6))();
              return unDriverStateX(function(st) {
                return pure15({
                  query: evalDriver(disposed)(st.selfRef),
                  messages: sio.emitter,
                  dispose: dispose(disposed)(lchs)(dsx)
                });
              })(dsx)();
            });
          });
        });
      };
    };
  };

  // output/Web.DOM.Node/foreign.js
  var getEffProp2 = function(name16) {
    return function(node) {
      return function() {
        return node[name16];
      };
    };
  };
  var baseURI = getEffProp2("baseURI");
  var _ownerDocument = getEffProp2("ownerDocument");
  var _parentNode = getEffProp2("parentNode");
  var _parentElement = getEffProp2("parentElement");
  var childNodes = getEffProp2("childNodes");
  var _firstChild = getEffProp2("firstChild");
  var _lastChild = getEffProp2("lastChild");
  var _previousSibling = getEffProp2("previousSibling");
  var _nextSibling = getEffProp2("nextSibling");
  var _nodeValue = getEffProp2("nodeValue");
  var textContent = getEffProp2("textContent");
  function insertBefore(node1) {
    return function(node2) {
      return function(parent2) {
        return function() {
          parent2.insertBefore(node1, node2);
        };
      };
    };
  }
  function appendChild(node) {
    return function(parent2) {
      return function() {
        parent2.appendChild(node);
      };
    };
  }
  function removeChild2(node) {
    return function(parent2) {
      return function() {
        parent2.removeChild(node);
      };
    };
  }

  // output/Web.DOM.Node/index.js
  var map37 = /* @__PURE__ */ map(functorEffect);
  var parentNode2 = /* @__PURE__ */ function() {
    var $6 = map37(toMaybe);
    return function($7) {
      return $6(_parentNode($7));
    };
  }();
  var nextSibling = /* @__PURE__ */ function() {
    var $15 = map37(toMaybe);
    return function($16) {
      return $15(_nextSibling($16));
    };
  }();

  // output/Halogen.VDom.Driver/index.js
  var $runtime_lazy9 = function(name16, moduleName, init4) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name16 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init4();
      state3 = 2;
      return val;
    };
  };
  var $$void7 = /* @__PURE__ */ $$void(functorEffect);
  var pure17 = /* @__PURE__ */ pure(applicativeEffect);
  var traverse_6 = /* @__PURE__ */ traverse_(applicativeEffect)(foldableMaybe);
  var unwrap6 = /* @__PURE__ */ unwrap();
  var when3 = /* @__PURE__ */ when(applicativeEffect);
  var not2 = /* @__PURE__ */ not(/* @__PURE__ */ heytingAlgebraFunction(/* @__PURE__ */ heytingAlgebraFunction(heytingAlgebraBoolean)));
  var identity12 = /* @__PURE__ */ identity(categoryFn);
  var bind16 = /* @__PURE__ */ bind(bindAff);
  var liftEffect7 = /* @__PURE__ */ liftEffect(monadEffectAff);
  var map38 = /* @__PURE__ */ map(functorEffect);
  var bindFlipped11 = /* @__PURE__ */ bindFlipped(bindEffect);
  var substInParent = function(v) {
    return function(v1) {
      return function(v2) {
        if (v1 instanceof Just && v2 instanceof Just) {
          return $$void7(insertBefore(v)(v1.value0)(v2.value0));
        }
        ;
        if (v1 instanceof Nothing && v2 instanceof Just) {
          return $$void7(appendChild(v)(v2.value0));
        }
        ;
        return pure17(unit);
      };
    };
  };
  var removeChild3 = function(v) {
    return function __do3() {
      var npn = parentNode2(v.node)();
      return traverse_6(function(pn) {
        return removeChild2(v.node)(pn);
      })(npn)();
    };
  };
  var mkSpec = function(handler3) {
    return function(renderChildRef) {
      return function(document2) {
        var getNode = unRenderStateX(function(v) {
          return v.node;
        });
        var done = function(st) {
          if (st instanceof Just) {
            return halt(st.value0);
          }
          ;
          return unit;
        };
        var buildWidget2 = function(spec) {
          var buildThunk2 = buildThunk(unwrap6)(spec);
          var $lazy_patch = $runtime_lazy9("patch", "Halogen.VDom.Driver", function() {
            return function(st, slot4) {
              if (st instanceof Just) {
                if (slot4 instanceof ComponentSlot) {
                  halt(st.value0);
                  return $lazy_renderComponentSlot(100)(slot4.value0);
                }
                ;
                if (slot4 instanceof ThunkSlot) {
                  var step$prime = step3(st.value0, slot4.value0);
                  return mkStep(new Step(extract2(step$prime), new Just(step$prime), $lazy_patch(103), done));
                }
                ;
                throw new Error("Failed pattern match at Halogen.VDom.Driver (line 97, column 22 - line 103, column 79): " + [slot4.constructor.name]);
              }
              ;
              return $lazy_render(104)(slot4);
            };
          });
          var $lazy_render = $runtime_lazy9("render", "Halogen.VDom.Driver", function() {
            return function(slot4) {
              if (slot4 instanceof ComponentSlot) {
                return $lazy_renderComponentSlot(86)(slot4.value0);
              }
              ;
              if (slot4 instanceof ThunkSlot) {
                var step4 = buildThunk2(slot4.value0);
                return mkStep(new Step(extract2(step4), new Just(step4), $lazy_patch(89), done));
              }
              ;
              throw new Error("Failed pattern match at Halogen.VDom.Driver (line 84, column 7 - line 89, column 75): " + [slot4.constructor.name]);
            };
          });
          var $lazy_renderComponentSlot = $runtime_lazy9("renderComponentSlot", "Halogen.VDom.Driver", function() {
            return function(cs) {
              var renderChild = read(renderChildRef)();
              var rsx = renderChild(cs)();
              var node = getNode(rsx);
              return mkStep(new Step(node, Nothing.value, $lazy_patch(117), done));
            };
          });
          var patch2 = $lazy_patch(91);
          var render2 = $lazy_render(82);
          var renderComponentSlot = $lazy_renderComponentSlot(109);
          return render2;
        };
        var buildAttributes = buildProp(handler3);
        return {
          buildWidget: buildWidget2,
          buildAttributes,
          document: document2
        };
      };
    };
  };
  var renderSpec = function(document2) {
    return function(container) {
      var render2 = function(handler3) {
        return function(child2) {
          return function(v) {
            return function(v1) {
              if (v1 instanceof Nothing) {
                return function __do3() {
                  var renderChildRef = $$new(child2)();
                  var spec = mkSpec(handler3)(renderChildRef)(document2);
                  var machine = buildVDom(spec)(v);
                  var node = extract2(machine);
                  $$void7(appendChild(node)(toNode(container)))();
                  return {
                    machine,
                    node,
                    renderChildRef
                  };
                };
              }
              ;
              if (v1 instanceof Just) {
                return function __do3() {
                  write(child2)(v1.value0.renderChildRef)();
                  var parent2 = parentNode2(v1.value0.node)();
                  var nextSib = nextSibling(v1.value0.node)();
                  var machine$prime = step3(v1.value0.machine, v);
                  var newNode = extract2(machine$prime);
                  when3(not2(unsafeRefEq)(v1.value0.node)(newNode))(substInParent(newNode)(nextSib)(parent2))();
                  return {
                    machine: machine$prime,
                    node: newNode,
                    renderChildRef: v1.value0.renderChildRef
                  };
                };
              }
              ;
              throw new Error("Failed pattern match at Halogen.VDom.Driver (line 157, column 5 - line 173, column 80): " + [v1.constructor.name]);
            };
          };
        };
      };
      return {
        render: render2,
        renderChild: identity12,
        removeChild: removeChild3,
        dispose: removeChild3
      };
    };
  };
  var runUI2 = function(component6) {
    return function(i2) {
      return function(element4) {
        return bind16(liftEffect7(map38(toDocument)(bindFlipped11(document)(windowImpl))))(function(document2) {
          return runUI(renderSpec(document2)(element4))(component6)(i2);
        });
      };
    };
  };

  // output/Main/index.js
  var bind17 = /* @__PURE__ */ bind(bindAff);
  var hoist4 = /* @__PURE__ */ hoist3(functorAff);
  var component5 = /* @__PURE__ */ component4(monadAffAppM)(navigateAppMRoute)(monadAskEnvAppM)(logonRouteAppMRoute)(logAppM);
  var liftEffect8 = /* @__PURE__ */ liftEffect(monadEffectAff);
  var matchesWith2 = /* @__PURE__ */ matchesWith(foldableEither);
  var when4 = /* @__PURE__ */ when(applicativeEffect);
  var notEq2 = /* @__PURE__ */ notEq(/* @__PURE__ */ eqMaybe(eqRoute));
  var $$void8 = /* @__PURE__ */ $$void(functorAff);
  var main2 = function __do2() {
    var userRef = $$new(Nothing.value)();
    return runHalogenAff(bind17(awaitBody)(function(body2) {
      var router = hoist4(runAppM({
        userRef
      }))(component5);
      return bind17(runUI2(router)(unit)(body2))(function(io) {
        return liftEffect8(matchesWith2(parse(routeCodec))(function(old$prime) {
          return function($$new2) {
            return when4(notEq2(old$prime)(new Just($$new2)))(launchAff_($$void8(io.query(mkTell(Navigate.create($$new2))))));
          };
        }));
      });
    }))();
  };

  // <stdin>
  main2();
})();
