// ==UserScript==
// @name        试作
// @namespace   fishcan
// @description 惹不起，我还躲不起么
// @include     https://h.nimingban.com/*
// @version     1
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==
var blist = []
blist = GM_getValue('blist',['0'])
// 如果屏蔽列表太多，去掉一些老的
if(blist.length>100){
  blist=blist.slice(-100)
}
var allThreads = document.getElementsByClassName("h-threads-item");
for(var i = 0; i < allThreads.length; i++){
  var node = document.createElement("button");
  node.setAttribute("id",allThreads[i].getAttribute("data-threads-id"));
  var textnode = document.createTextNode("屏蔽");
  node.appendChild(textnode);
  allThreads[i].firstElementChild.appendChild(node);
  document.getElementById(allThreads[i].getAttribute("data-threads-id")).addEventListener('click', addblock, true);
}

function removeThreads(){
  for(var i = 0; i < allThreads.length; i++){
    var thisId = allThreads[i].getAttribute("data-threads-id");
    if(blist.indexOf(thisId)>-1){
      allThreads[i].remove()
    }
  }
}

function  addblock(e){
  e.stopPropagation();
  var thisId=this.getAttribute("id");
  blist.push(thisId);
  GM_setValue('blist',blist)
  removeThreads();
}

removeThreads()
