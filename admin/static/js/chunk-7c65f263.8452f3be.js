(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7c65f263"],{"4a52":function(e,t,n){"use strict";var s=n("ac8e"),r=n.n(s);r.a},ac8e:function(e,t,n){},d1fd:function(e,t,n){"use strict";n.r(t);var s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"form"},[n("el-form",{ref:"notes",staticClass:"demo-notes",attrs:{model:e.notes,rules:e.rules,"label-width":"100px"}},[n("el-form-item",{attrs:{label:"标题",prop:"name"}},[n("el-input",{model:{value:e.notes.name,callback:function(t){e.$set(e.notes,"name",t)},expression:"notes.name"}})],1),n("el-form-item",{attrs:{label:"描述",prop:"describe"}},[n("el-input",{attrs:{type:"textarea",rows:5,resize:"none"},model:{value:e.notes.describe,callback:function(t){e.$set(e.notes,"describe",t)},expression:"notes.describe"}})],1)],1),n("div",{staticStyle:{"text-align":"center"}},[n("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submit("notes")}}},[e._v("提交")]),n("el-button",{on:{click:function(t){return e.resetForm("notes")}}},[e._v("重置")])],1)],1)},r=[],a=(n("96cf"),n("3b8d")),i={name:"write",data:function(){return{html:"",notes:{name:"",describe:""},rules:{name:[{required:!0,message:"请输入标题",trigger:"blur"}]}}},methods:{submit:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(){var t,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=this.notes,e.next=3,this.$fetch.api_categories.addCategories(t);case 3:n=e.sent,200===n.code?this.$message.success(n.msg):400===n.code&&this.$message.error(n.msg);case 5:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),resetForm:function(e){this.$refs[e].resetFields()}}},o=i,c=(n("4a52"),n("2877")),u=Object(c["a"])(o,s,r,!1,null,"5d19fa1a",null);t["default"]=u.exports}}]);