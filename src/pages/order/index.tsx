import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'

export default function Order() {

  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className='order'>
      <Text>Order pages</Text>
    </View>
  )
}
