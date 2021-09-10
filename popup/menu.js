
//gets hostname from url
function hostFromURL(str){
var rtrn=str;
var proto=rtrn.match(/[a-z]+:\/\/+/g);
rtrn=rtrn.substr(proto[0].length,rtrn.length);

var end=rtrn.search('/');
  if(end>=0){
  rtrn=rtrn.substr(0,end);
  }

return rtrn;
}


function tgglBtn( sid, lid, on, off){
var el=document.getElementById(sid);
  if(!el || el==null || el==""){
  return false;
  }

  if(el.checked){
  document.getElementById(lid).innerText=on;
  return true;
  }

document.getElementById(lid).innerText=off;
return false;
}


function startListen(){
  document.addEventListener("click", (e) => {
   switch(e.target.id){
      case 'donate':
        chrome.tabs.create({url: 'https://b3spage.sourceforge.io/index.html?oneStone'});
      break;
      default:
      break;
    }
  });

  document.addEventListener("change", (e) => {
  var obj={};
  var act=e.target.getAttribute('act');
    switch(act){
      case 'on':
      obj['on']=e.target.checked;
        chrome.storage.local.set(obj,
          function (){
            //tgglBtn(e.target.id, e.target.id+'Lbl', tgglHsh[e.target.id][1], tgglHsh[e.taret.id][0]);
            getCurHost(function(d){
              if(d.host=='twitter.com'){
                chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
                  chrome.tabs.reload(tabs[0].id, {bypassCache:true});
                });
              }
            }, {});

          let nsfw=document.getElementById('nsfw').checked;
          let on=nsfw?'./oneStoneOnNSFW.png':'./oneStoneOnSFW.png';
            if(e.target.checked){
            e.target.nextElementSibling.firstElementChild.src=on;
            }
            else{
            e.target.nextElementSibling.firstElementChild.src='./oneStoneOff.png';
            }
          }
        );
      break;
      case 'nsfw':
      obj['nsfw']=e.target.checked;
        chrome.storage.local.set(obj,function(){
        let on=e.target.checked?'./oneStoneOnNSFW.png':'./oneStoneOnSFW.png';
        let el=document.getElementById('on');
          if(el.checked){
          el.nextElementSibling.firstElementChild.src=on;
          }
        });
      break;
      default:
      break;
    }
  });
}

/*--------------------------------------
pre: hostFromUrl()
post: whatever cbFunc does
gets the host from the url of the current active tab
params:
lst=ignore list
cbFunc() Call back function
cbFuncPrms=should be an object
---------------------------------------*/
function getCurHost( cbFunc, cbFuncPrms ){
  chrome.tabs.query({active: true, currentWindow: true},(tabs) => {
  var url=tabs[0].url;
  var host=hostFromURL(url);
  
  cbFuncPrms["host"]=host;
  cbFunc(cbFuncPrms);
  });
}

chrome.storage.local.get(null,function(d){
document.getElementById('nsfw').checked=d.nsfw;
let onEl=document.getElementById('on');
onEl.checked=d.on;
let on=d.nsfw?'./oneStoneOnNSFW.png':'./oneStoneOnSFW.png';
  if(d.on){
  onEl.nextElementSibling.firstElementChild.src=on;
  }
  else{
  onEl.nextElementSibling.firstElementChild.src='./oneStoneOff.png';
  }
});
startListen();
