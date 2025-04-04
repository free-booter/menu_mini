import { PropsWithChildren } from 'react'
import { useLaunch } from '@tarojs/taro'
import '@nutui/nutui-react-taro/dist/style.css';
import './app.scss'
import 'uno.css'

function App({ children }: PropsWithChildren<any>) {

  useLaunch(() => {
    console.log('App launched.')
  })

  // children 是将要会渲染的页面
  return children
}

export default App
