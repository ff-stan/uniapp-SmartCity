
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/login/login","pages/register/register","pages/userdetails/userdetails","pages/userinfo/userinfo","pages/changepassword/changepassword","pages/feedback/feedback","pages/metro_query/index","pages/subwaydetails/subwaydetails"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8"},"tabBar":{"color":"#7A7E83","selectedColor":"#aa0000","borderStyle":"black","backgroundColor":"#ffffff","list":[{"pagePath":"pages/index/index","iconPath":"./static/tabbar/首页.png","selectedIconPath":"./static/tabbar/首页_sel.png","text":"主页"},{"pagePath":"pages/index/index","iconPath":"./static/tabbar/分类.png","selectedIconPath":"./static/tabbar/分类_sel.png","text":"全部服务"},{"pagePath":"pages/index/index","iconPath":"./static/tabbar/资讯.png","selectedIconPath":"./static/tabbar/资讯_sel.png","text":"新闻"},{"pagePath":"pages/index/index","iconPath":"./static/tabbar/活动.png","selectedIconPath":"./static/tabbar/活动_sel.png","text":"活动"},{"pagePath":"pages/userdetails/userdetails","iconPath":"./static/tabbar/我的.png","selectedIconPath":"./static/tabbar/我的_sel.png","text":"个人中心"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"SmartCity","compilerVersion":"3.6.4","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"主页"}},{"path":"/pages/login/login","meta":{},"window":{"navigationBarTitleText":"登录","enablePullDownRefresh":false}},{"path":"/pages/register/register","meta":{},"window":{"navigationBarTitleText":"注册","enablePullDownRefresh":false}},{"path":"/pages/userdetails/userdetails","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"个人中心","enablePullDownRefresh":false}},{"path":"/pages/userinfo/userinfo","meta":{},"window":{"navigationBarTitleText":"用户信息","enablePullDownRefresh":false}},{"path":"/pages/changepassword/changepassword","meta":{},"window":{"navigationBarTitleText":"修改密码","enablePullDownRefresh":false}},{"path":"/pages/feedback/feedback","meta":{},"window":{"navigationBarTitleText":"意见反馈","enablePullDownRefresh":false}},{"path":"/pages/metro_query/index","meta":{},"window":{"navigationBarTitleText":"城市地铁","enablePullDownRefresh":false}},{"path":"/pages/subwaydetails/subwaydetails","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
