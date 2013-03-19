(function(){
  var async, sync, asyncfn, future, Twine, slice$ = [].slice;
  async = require('async');
  sync = require('sync');
  asyncfn = function(it){
    return it.async();
  };
  sync = function(fn){
    return function(){
      var args;
      args = slice$.call(arguments);
      return fn.sync.apply(fn, [null].concat(slice$.call(args)));
    };
  };
  future = function(fn){
    return function(){
      var args;
      args = slice$.call(arguments);
      return fn.future.apply(fn, [null].concat(slice$.call(args)));
    };
  };
  module.exports = Twine = (function(){
    Twine.displayName = 'Twine';
    var prototype = Twine.prototype, constructor = Twine;
    Twine.asyncfn = asyncfn;
    Twine.sync = sync;
    Twine.future = future;
    Twine.depends = function(){
      var i$, fns, method, prototype, that, out, this$ = this;
      fns = 0 < (i$ = arguments.length - 1) ? slice$.call(arguments, 0, i$) : (i$ = 0, []), method = arguments[i$];
      prototype = this.prototype;
      if (that = find(compose$([
        not$, (function(it){
          return in$(it, keys(prototype));
        })
      ]), fns)) {
        throw new ReferenceError(that + " is not defined");
      }
      out = asyncfn(function(){
        if (out.speed !== 88) {
          sync(process.nextTick)();
        }
        return sync(async.auto)(
        this.collectDeps(out.marty));
      });
      out.inner = function(cb, results){
        return method.call(this, results, cb);
      };
      out.depends = fns;
      process.nextTick(function delorean(){
        out.marty = head(keys(filter((function(it){
          return it === out;
        }), prototype)));
        return out.speed = 88;
      });
      return out;
    };
    prototype.collectDeps = function(fn, obj){
      var that, dep, this$ = this;
      obj == null && (obj = {});
      return obj[fn] = (function(){
        var i$, ref$, len$;
        switch (false) {
        case (that = this[fn].depends) == null:
          for (i$ = 0, len$ = (ref$ = that).length; i$ < len$; ++i$) {
            dep = ref$[i$];
            this.collectDeps(dep, obj);
          }
          return that.concat(this[fn].inner);
        default:
          return function(cb, results){
            return this$[fn](results, cb);
          };
        }
      }.call(this)), obj;
    };
    function Twine(){}
    return Twine;
  }());
  function compose$(fs){
    return function(){
      var i, args = arguments;
      for (i = fs.length; i > 0; --i) { args = [fs[i-1].apply(this, args)]; }
      return args[0];
    };
  }
  function not$(x){ return !x; }
  function in$(x, arr){
    var i = -1, l = arr.length >>> 0;
    while (++i < l) if (x === arr[i] && i in arr) return true;
    return false;
  }
}).call(this);
