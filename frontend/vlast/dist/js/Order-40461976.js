webpackJsonp([3],{644:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=n(17),c=r(u),s=n(660),d=r(s),f=n(111);n(661);var m=n(662),p=r(m),_=n(652),h=r(_),g=n(85),v=n(649),y=n(663),E=n(648),b=n(650),O=r(b),k=[{lk_column_id:1,lk_column_name:"全部订单",status:"allOrder"},{lk_column_id:2,lk_column_name:"正常订单",status:"normalOrder"},{lk_column_id:3,lk_column_name:"异常订单",status:"unusualOrder"}],w=function(e){function t(e){a(this,t);var n=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={currOrder:[]},n}return l(t,e),i(t,[{key:"componentWillMount",value:function(){var e=this,t=this.props.dispatch;t((0,v.addOtherData)({title:"我的订单"})),t((0,v.addOtherData)({LoadingShow:!0})),t((0,y.getOrderList)({},function(t){e.setState({currOrder:t.data})}))}},{key:"selectTap",value:function(e,t,n){this.setState({currOrder:this.props[n]})}},{key:"getOrder",value:function(e){(0,this.props.dispatch)((0,y.getOrderList)(e))}},{key:"render",value:function(){var e=this,t=this.props.other,n=this.state.currOrder,r=O.default.getJSON("gameInfo");return c.default.createElement("div",{className:"order-main"},c.default.createElement(h.default,{render:t.title}),c.default.createElement("div",{className:"order-tab"},c.default.createElement(d.default,{data:k,selectTap:function(t,n,r){return e.selectTap(t,n,r)}}),n.length?c.default.createElement("div",{className:"item-box"},n.map(function(e,t){return c.default.createElement("div",{key:t,className:"items"},c.default.createElement("div",{className:"order-info"},c.default.createElement("div",null,c.default.createElement("div",null,c.default.createElement("img",{src:""+E.URL+r.web_game_icon})),c.default.createElement("span",null,r.web_game_name)),c.default.createElement("span",null,"订单编号：",e.lk_order_id)),c.default.createElement("div",{className:"goods-item"},c.default.createElement("div",null,c.default.createElement("div",{className:"goods-block"},c.default.createElement("img",{src:""+E.URL+e.lk_goods_file}),2===parseInt(e.lk_goods_hot)?c.default.createElement("div",{className:"hot-img"}):"",c.default.createElement("div",{className:"goods-root"},"Android"===e.lk_terrace?"仅限安卓":"仅限iOS")),c.default.createElement("span",null,e.lk_goods_name)),c.default.createElement("div",null,c.default.createElement("div",null,c.default.createElement("i",{className:"iconfont icon-yuan"}),c.default.createElement("span",null,(0,E.toFixed2)(e.lk_goods_sprice))),c.default.createElement("span",null,"x",e.lk_nummber))),c.default.createElement("div",{className:"buy-info"},c.default.createElement("span",null,"购买 ",e.lk_nummber," 件"),c.default.createElement("span",{className:"buy-count"},"合计  ",c.default.createElement("i",{className:"iconfont icon-yuan"}),c.default.createElement("span",null,(0,E.toFixed2)(e.lk_goods_sprice*e.lk_nummber)))),c.default.createElement("div",{className:"goods-info"},c.default.createElement("div",null,"选择平台：",e.lk_terrace?e.lk_terrace:"iOS"),c.default.createElement("div",null,"选择区服：",e.lk_server_name),c.default.createElement("div",null,"选择角色：",e.lk_role_name),c.default.createElement("div",null,"订单状态：",e.lk_order_status?"已支付":"未支付"),c.default.createElement("div",null,"联系电话：",e.lk_tel),c.default.createElement("div",null,"下单时间：",(0,E.formatDate)(e.lk_order_time))),c.default.createElement("div",{className:"btns-block"},c.default.createElement("a",{target:"_blank",href:"http://www.sobot.com/chat/pc/index.html?sysNum=e6efa4beafc34bcfb47fdceedc0cc132"},c.default.createElement("i",{className:"iconfont icon-kefu"}),c.default.createElement("span",null,"联系客服")),c.default.createElement("a",{href:"javascript:void(0)",onClick:function(){g.hashHistory.push({pathname:"/detail",query:{lk_goods_id:e.lk_goods_id}})}},c.default.createElement("i",{className:"iconfont icon-goumai"}),c.default.createElement("span",null,"再次购买"))))})):c.default.createElement("div",{className:"not-order"},c.default.createElement("div",{className:"no-data"},c.default.createElement("div",null,c.default.createElement("img",{className:"no-order",src:p.default})),c.default.createElement("h4",null,"您还没有相关订单！")),c.default.createElement(g.Link,{to:{pathname:"/"}},c.default.createElement("i",{className:"iconfont icon-goumai"}),c.default.createElement("span",null,"继续逛逛")))),c.default.createElement(g.Link,{className:"home-bth",to:{pathname:"/",query:{game_id:r.web_game_id}}}))}}]),t}(u.Component),D=function(e){return{other:e.other,order:e.order,list:e.order.list,loginInfo:e.login.info,allOrder:e.order.list,normalOrder:e.order.list.filter(function(e,t){return 1===parseInt(e.lk_order_status)}),unusualOrder:e.order.list.filter(function(e,t){return 0===parseInt(e.lk_order_status)})}};t.default=(0,f.connect)(D)(w)},648:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isandroid=t.userAgent=t.REDEEMTYPE=t.phoneReg=t.getRTime=t.add0=t.formatDate=t.toFixed2=t.ajaxPost=t.ajaxGet=t.URL=void 0;var r=n(263),a=function(e){return e&&e.__esModule?e:{default:e}}(r),o=n(85),l=(t.URL="",t.ajaxGet=function(e,t,n){a.default.get(e,{params:t}).then(function(e){var t=e.data;-102===t.code?o.hashHistory.push("/login"):n&&n.call(this,t)}).catch(function(e){console.log(e)})},t.ajaxPost=function(e,t,n){a.default.post(e,t).then(function(e){var t=e.data;-102===t.code?o.hashHistory.push("/login"):n&&n.call(this,t)}).catch(function(e){console.log(e)})},t.toFixed2=function(e){return Number(e).toFixed(2)},t.formatDate=function(e,t){if(!e)return 0;var n=t||"-",r=new Date(1e3*e),a=r.getFullYear(),o=r.getMonth()+1,i=r.getDate(),u=r.getHours(),c=r.getMinutes(),s=r.getSeconds();return a+n+l(o)+n+l(i)+" "+l(u)+":"+l(c)+":"+l(s)},t.add0=function(e){return e<10?"0"+e:e}),i=(t.getRTime=function(e,t){var n=0,r=0;t?(n=e,r=t):(n=(new Date).getTime()/1e3,r=e);var a=parseInt(r-n);return a>0&&{h:l(Math.floor(a/60/60)),m:l(Math.floor(a/60)%60),s:l(a%60)}},t.phoneReg=/^1(3|4|5|7|8)\d{9}$/,t.REDEEMTYPE={all:"全部",not:"未兑换",has:"已兑换"},t.userAgent=window.navigator.userAgent.toLowerCase());t.isandroid=function(){var e=!1;return i.indexOf("android")>0&&(e=!0),e}},649:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.addOtherData=t.addAlertData=t.showAlert=void 0;var r=n(62),a=(t.showAlert=function(e){return function(t){t(a(e))}},t.addAlertData=function(e){return{type:r.ADD_ALERT_DATA,data:e}});t.addOtherData=function(e){return{type:r.ADD_OTHER_DATA,data:e}}},650:function(e,t,n){var r,a;!function(o){var l=!1;if(r=o,void 0!==(a="function"==typeof r?r.call(t,n,t,e):r)&&(e.exports=a),l=!0,e.exports=o(),l=!0,!l){var i=window.Cookies,u=window.Cookies=o();u.noConflict=function(){return window.Cookies=i,u}}}(function(){function e(){for(var e=0,t={};e<arguments.length;e++){var n=arguments[e];for(var r in n)t[r]=n[r]}return t}function t(n){function r(t,a,o){var l;if("undefined"!=typeof document){if(arguments.length>1){if(o=e({path:"/"},r.defaults,o),"number"==typeof o.expires){var i=new Date;i.setMilliseconds(i.getMilliseconds()+864e5*o.expires),o.expires=i}o.expires=o.expires?o.expires.toUTCString():"";try{l=JSON.stringify(a),/^[\{\[]/.test(l)&&(a=l)}catch(e){}a=n.write?n.write(a,t):encodeURIComponent(String(a)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),t=encodeURIComponent(String(t)),t=t.replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent),t=t.replace(/[\(\)]/g,escape);var u="";for(var c in o)o[c]&&(u+="; "+c,!0!==o[c]&&(u+="="+o[c]));return document.cookie=t+"="+a+u}t||(l={});for(var s=document.cookie?document.cookie.split("; "):[],d=/(%[0-9A-Z]{2})+/g,f=0;f<s.length;f++){var m=s[f].split("="),p=m.slice(1).join("=");'"'===p.charAt(0)&&(p=p.slice(1,-1));try{var _=m[0].replace(d,decodeURIComponent);if(p=n.read?n.read(p,_):n(p,_)||p.replace(d,decodeURIComponent),this.json)try{p=JSON.parse(p)}catch(e){}if(t===_){l=p;break}t||(l[_]=p)}catch(e){}}return l}}return r.set=r,r.get=function(e){return r.call(r,e)},r.getJSON=function(){return r.apply({json:!0},[].slice.call(arguments))},r.defaults={},r.remove=function(t,n){r(t,"",e(n,{expires:-1}))},r.withConverter=t,r}return t(function(){})})},651:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.addLoginData=t.showLogin=t.addLoginQuery=t.login=void 0;var r=n(648),a=n(62),o=n(650),l=function(e){return e&&e.__esModule?e:{default:e}}(o),i=(t.login=function(e,t,n){return function(a){(0,r.ajaxGet)("/web_login",e,function(r){200===r.code?(a(u({isLogin:!0})),l.default.set("isLogin",!0),l.default.set("loginCookie",{passportName:e.passportName,password:e.password}),a(i(!1)),n&&n()):t(r.message)})}},t.addLoginQuery=function(e){return{type:a.Login.ADD_QUERY,query:e}},t.showLogin=function(e){return{type:a.Login.SHOW_LOGIN,bool:e}}),u=t.addLoginData=function(e){return{type:a.Login.LOGIN,actionData:e}}},652:function(e,t,n){"use strict";function r(){return u[u.length-1]}function a(){document.title=r()}function o(){var e=r();return u=[],e}t.__esModule=!0,t.flushTitle=o;var l=n(17),i=function(e){return e&&e.__esModule?e:{default:e}}(l),u=[],c=i.default.PropTypes,s=c.oneOfType,d=c.string,f=c.func,m=i.default.createClass({displayName:"Title",propTypes:{render:s([d,f]).isRequired},getInitialState:function(){return{index:u.push("")-1}},componentWillUnmount:function(){u.pop()},componentDidMount:a,componentDidUpdate:a,render:function(){var e=this.props.render;return u[this.state.index]="function"==typeof e?e(u[this.state.index-1]||""):e,this.props.children||null}});t.default=m},654:function(e,t){},660:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=n(17),u=function(e){return e&&e.__esModule?e:{default:e}}(i);n(654);var c=function(e){function t(){r(this,t);var e=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e.state={currIndex:0},e}return o(t,e),l(t,[{key:"selectThisTap",value:function(e,t,n,r){var a=this.props.selectTap;this.setState({currIndex:e}),a(t,n,r)}},{key:"render",value:function(){var e=this,t=this.props.data;return u.default.createElement("div",{className:"tab-main"},u.default.createElement("ul",{className:"clearfix",id:"tabUl"},t?t.map(function(t,n){return u.default.createElement("li",{key:n,className:e.state.currIndex===n?"active":"",onClick:function(){return e.selectThisTap(n,t.lk_column_id,t.lk_column_name,t.status)}},u.default.createElement("a",{href:"javascript:void(0)"},t.lk_column_name))}):""))}}]),t}(i.Component);t.default=c},661:function(e,t){},662:function(e,t,n){e.exports=n.p+"img/no-order-3e8f877f.png?"},663:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.addOrderList=t.addOrderData=t.getOrderList=void 0;var r=n(648),a=n(62),o=n(651),l=n(85),i=n(649),u=(t.getOrderList=function(e,t){return function(n){(0,r.ajaxGet)("/api_user_order",e,function(e){var r=e.data;-606===e.code&&(l.hashHistory.push("/"),n((0,o.showLogin)(!0))),200===e.code&&r?(n(u(r)),t&&t(e)):n(u([])),n((0,i.addOtherData)({LoadingShow:!1}))})}},t.addOrderData=function(e){return{type:a.Order.ADD_DATA,data:e}},t.addOrderList=function(e){return{type:a.Order.LIST_DATA,data:e}})}});