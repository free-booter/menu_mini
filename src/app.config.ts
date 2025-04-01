export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/order/index',
    'pages/user/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar:{
    color:'#8D9095',
    selectedColor:'#ffa115',
    list:[
      {
        pagePath:'pages/index/index',
        text:'菜谱',
        iconPath:'assets/images/tabbar/menu.png'
        ,selectedIconPath:'assets/images/tabbar/menu-active.png'
      },
      {
        pagePath:'pages/order/index',
        text:'订单',
        iconPath:'assets/images/tabbar/order.png',
        selectedIconPath:'assets/images/tabbar/order-active.png',
      },
      {
        pagePath:'pages/user/index',
        text:'我的',
        iconPath:'assets/images/tabbar/user.png',
        selectedIconPath:'assets/images/tabbar/user-active.png',
      }
    ]
  }
})
