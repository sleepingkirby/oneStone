//loading external files and settings.
(function() {

  chrome.storage.local.get(null,function(d){
    if(!d.hasOwnProperty('on') || !d.on){
    return null;
    }

    var injectedCode = '('+ function(){
    window.setIntervalOneStone=window.setInterval;
    window.setInterval=function(func,tm,opts){
        console.log(func);
        console.log(tm);
        console.log(opts);
        if(oneStoneBool){
        window.setIntervalOneStone(func,tm,opts);
        }
      } 
    }+')();';

  var s = document.createElement('script');
  s.textContent = injectedCode;
  (document.head || document.documentElement).appendChild(s);
  s.parentNode.removeChild(s);
  });

})();
