import { PropsWithChildren } from 'react'
import { Config, useLaunch } from '@tarojs/taro'
import { ConfigProvider } from '@nutui/nutui-react-taro'
import '@nutui/nutui-react-taro/dist/style.css';
import 'uno.css'
import './assets/styles/common.scss'
import './app.scss'

function App({ children }: PropsWithChildren<any>) {

  useLaunch(() => {
    console.log('App launched.')
  })

  // children 是将要会渲染的页面
  return (
     <>
      {children}
     </>
  )
}

export default App
