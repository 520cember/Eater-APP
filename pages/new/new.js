
const app = getApp();

const API_URL = "http://apicloud.mob.com/v1/cook/menu/search?name=%E7%BA%A2%E7%83%A7%E8%82%89&cid=0010001007&key=17113fceca309&size=15&page="

var page = {
  data: {
    caiItems: [],
    loading: false,
    windowHeight: 0,
    windowWidth: 0,
    page:1
  },
  onLoad: function( options ) {

    this.setData( {
      page: 1
    })

    this.getDataFromServer(this.data.page)
  },
  //获取网络数据的方法
  getDataFromServer: function(page){
    this.setData( {
      loading: false
    })
    //调用网络请求
    app.httpClient( API_URL+page, ( error, data ) => {

      if( data.retCode == 200 ) {
        this.setData( {
          caiItems: data.result.list,
          loading: true
        })
      } else {
        console.log( "服务器异常" )
      }

    })
  },

  //////////////////////////////////////下拉刷新上拉加载更多的代码////////////////////////////////////////////
  onShow: function( e ) {
    wx.getSystemInfo( {
      success: ( res ) => {
        this.setData( {
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      }
    })
  },
  pullDownRefresh: function( e ) {
    console.log( "下拉刷新...." )
    this.onLoad() 
  },

  pullUpLoad: function( e ) {
     this.setData( {
      page:this.data.page+1
    })

    console.log( "上拉拉加载更多...."+this.data.page)

    this.getDataFromServer(this.data.page)
  },

}
 //////////////////////////////////////下拉刷新上拉加载更多的代码////////////////////////////////////////////
Page( page )