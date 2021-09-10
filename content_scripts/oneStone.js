//loading external files and settings.
(function() {

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
      return 1;
      } 
    }+')();';

  var s = document.createElement('script');
  s.textContent = injectedCode;
  (document.head || document.documentElement).appendChild(s);
  s.parentNode.removeChild(s);
  });

})();
