import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'

export default function User() {

  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className='user'>
      <Text>User pages</Text>
    </View>
  )
}
