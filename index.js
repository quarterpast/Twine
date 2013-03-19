(function(){
  var async, Sync, asyncfn, sync, future, Twine, slice$ = [].slice;
  async = require('async');
  Sync = require('sync');
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
      var i$, fns, method, proto, that, x$, out, this$ = this;
      fns = 0 < (i$ = arguments.length - 1) ? slice$.call(arguments, 0, i$) : (i$ = 0, []), method = arguments[i$];
      proto = this.prototype;
      if (that = find(compose$([
        not$, (function(it){
          return in$(it, keys(proto));
        })
      ]), fns)) {
        throw new ReferenceError(that + " is not defined");
      }
      x$ = out = asyncfn(function(){
        if (out.speed !== 88) {
          sync(process.nextTick)();
        }
        return sync(bind$(this, 'go'))(out.marty);
      });
      x$.inner = function(cb, results){
        return method.call(this, results, cb);
      };
      x$.orig = method;
      x$.depends = fns;
      process.nextTick(function delorean(){
        out.marty = head(keys(filter((function(it){
          return it === out;
        }), proto)));
        return out.speed = 88;
      });
      return out;
    };
    prototype.collectDeps = function(fn, obj){
      var that, this$ = this;
      obj == null && (obj = {});
      obj[fn] = (function(){
        switch (false) {
        case (that = this[fn].depends) == null:
          map(partialize$.apply(this, [bind$(this, 'collectDeps'), [void 8, obj], [0]]), that);
          return slice$.call(that).concat([this[fn].inner]);
        default:
          return function(cb, results){
            return this$[fn](results, cb);
          };
        }
      }.call(this));
      return obj;
    };
    prototype.go = asyncfn(function(it){
      return sync(async.auto)(this.collectDeps(it));
    });
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
  function bind$(obj, key, target){
    return function(){ return (target || obj)[key].apply(obj, arguments) };
  }
  function partialize$(f, args, where){
    var context = this;
    return function(){
      var params = slice$.call(arguments), i,
          len = params.length, wlen = where.length,
          ta = args ? args.concat() : [], tw = where ? where.concat() : [];
      for(i = 0; i < len; ++i) { ta[tw[0]] = params[i]; tw.shift(); }
      return len < wlen && len ?
        partialize$.apply(context, [f, ta, tw]) : f.apply(context, ta);
    };
  }
}).call(this);
