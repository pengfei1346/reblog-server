(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7342ed64"],{"598c":function(t,e,n){},"60c7":function(t,e,n){"use strict";var r=n("598c"),i=n.n(r);i.a},c09f:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"article-top"},[n("div",{staticClass:"top-container"},[n("div",{staticClass:"top-title"},[t._v(t._s(t.articleInfo.title))]),n("div",{staticClass:"top-info"},[t._v(t._s(t.articleInfo.author)+" · "+t._s(t._f("parseTime")(t.articleInfo.createdAt))+" · "+t._s(t.articleInfo.browseNum)+" 次阅读")])])]),n("div",{staticClass:"article-body"},[n("div",{domProps:{innerHTML:t._s(t.content)}})])])},i=[],a=(n("96cf"),n("1da1")),c=(n("99af"),n("c975"),n("18a5"),n("159b"),n("d4ec")),s=n("bee2"),o=n("1487"),u=n("e0c1"),l={add:function(t,e){var n="#toc".concat(e).concat(++this.index);return this.toc.push({anchor:n,level:e,text:t}),n},toHTML:function(){var t=[],e="",n=function(){e+='<ul class="anchor-ul" id="anchor-fix">'},r=function(){e+="</ul>\n"},i=function(t,n){e+='<li><a class="toc-link" href="#'+t+'">'+n+"<a></li>\n"};this.toc.forEach((function(e){var a=t.indexOf(e.level);if(-1===a)t.unshift(e.level),n(),i(e.anchor,e.text);else if(0===a)i(e.anchor,e.text);else{while(a--)t.shift(),r();i(e.anchor,e.text)}}));while(t.length)t.shift(),r();return this.toc=[],this.index=0,e},toc:[],index:0},h=function(){function t(){Object(c["a"])(this,t),this.rendererMD=new u.Renderer,this.rendererMD.heading=function(t,e,n){var r=l.add(t,e);return"<h".concat(e," id=").concat(r,">").concat(t,"</h").concat(e,">\n")},this.rendererMD.table=function(t,e){return'<table class="table" border="0" cellspacing="0" cellpadding="0">'+t+e+"</table>"},o.configure({useBR:!0}),u.setOptions({renderer:this.rendererMD,headerIds:!1,gfm:!0,tables:!0,breaks:!1,pedantic:!1,sanitize:!1,smartLists:!0,smartypants:!1,highlight:function(t){return o.highlightAuto(t).value}})}return Object(s["a"])(t,[{key:"marked",value:function(){var t=Object(a["a"])(regeneratorRuntime.mark((function t(e){var n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!e){t.next=8;break}return t.next=3,u(e);case 3:return n=t.sent,r=l.toHTML(),t.abrupt("return",{content:n,toc:r});case 8:return t.abrupt("return",null);case 9:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}()}]),t}(),f=new h,d=f,p={name:"articleDetail",data:function(){return{articleInfo:{},content:""}},computed:{id:function(){return this.$route.params.id}},created:function(){this.articleDetail()},methods:{articleDetail:function(){var t=Object(a["a"])(regeneratorRuntime.mark((function t(){var e,n,r=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.$xhr.get("/article/".concat(this.id));case 2:e=t.sent,this.articleInfo=e.data,n=d.marked(e.data.content),n.then((function(t){r.content=t.content}));case 6:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()}},v=p,b=(n("60c7"),n("2877")),m=Object(b["a"])(v,r,i,!1,null,"e45365f2",null);e["default"]=m.exports}}]);