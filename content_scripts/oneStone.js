//loading external files and settings.
(function() {

  //https://gist.github.com/cowboy/5373000
  //working on a way to override bind so that the bind does happen, but it
  //also adds the original function as text as a member 
  function bindOverride(){
    var injectedCode = '('+function(){
      Function.prototype.bind = function(){
        const fn = this;
        var args = Array.prototype.slice.apply(arguments);
        const ctx = args[0];
        args = args.slice(1);
        return function () {
            return fn.apply(ctx, args.concat(Array.prototype.slice.apply(arguments)));
        }
      }
    } + ')();';
/*
      Function.prototype.bind = (function(origBind) {
        return function() {
        console.log(origBind);
        var fn = origBind.apply(this, arguments);
        fn.__origFn__ = this.__origFn__ || this;
        return fn;
        };
      }(Function.prototype.bind));
    }+')();';

    injectedCode = '(' + function(){Function.prototype.unbind = function() {
      return this.__origFn__;
    };
    }+')();';
*/

  var s = document.createElement('script');
  s.textContent = injectedCode;
  (document.head || document.documentElement).appendChild(s);
  s.parentNode.removeChild(s);


  }

  chrome.storage.local.get(null,function(d){
    if(!d.hasOwnProperty('on') || !d.on){
    console.log("oneStone: is turned off. Doing nothing.");
    return null;
    }
    console.log("oneStone: is turned on.");

    var injectedCode = '('+ function(){
    window.setIntervalOneStone=window.setInterval;
      window.setInterval=function(func,tm,opts){
      console.log("oneStone: Page tried to register a setInterval() with interval: "+tm);
      console.log(func);
      console.log(opts);
        if(tm<=5000){
        console.log("allowed");
        return window.setIntervalOneStone(func,tm,opts);
        }
      return 1;
      } 
    }+')();';

  var s = document.createElement('script');
  s.textContent = injectedCode;
  (document.head || document.documentElement).appendChild(s);
  s.parentNode.removeChild(s);
  });

})();
