import { View, Text } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { NavBar, SearchBar } from '@nutui/nutui-react-taro'
import './index.scss'
import { useState } from 'react'

type MenuBtnRect = {
  width: number
  height: number
  left: number
  right: number
  top: number
  bottom: number
}
export default function Index() {
  const [menuBtnInfo, setMenuBtnInfo] = useState<MenuBtnRect>({} as MenuBtnRect)
  useLoad(() => {
    const data = Taro.getMenuButtonBoundingClientRect()
    setMenuBtnInfo(data)
  })


  return (
    <View className='home-page'>
      <View className='app-navbar flex items-center justify-center' style={{ top: menuBtnInfo.top + 'px' }}>
        <SearchBar placeholder='上京东，购好物' />
      </View>
    </View>
  )
}
