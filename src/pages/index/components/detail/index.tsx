import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'

export default function IndexComponentsDetail() {

  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className='index/components/detail'>
      <Text>Hello world!</Text>
    </View>
  )
}
