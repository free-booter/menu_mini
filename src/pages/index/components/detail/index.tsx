import { View, Text } from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
import "./index.scss";
import Dish from "@/assets/images/32639ef87fc454f319a00530d763136.jpg";
import { NavBar, Rate, Toast } from "@nutui/nutui-react-taro";
import { ArrowLeft } from "@nutui/icons-react-taro";
import { useState } from "react";
import useCopy from "@/hooks/useCopy";

export default function IndexComponentsDetail() {
  type MenuBtnRect = {
    width: number;
    height: number;
    left: number;
    right: number;
    top: number;
    bottom: number;
  };
  const [menuBtnInfo, setMenuBtnInfo] = useState<MenuBtnRect>(
    {} as MenuBtnRect
  );
  useLoad(() => {
    const data = Taro.getMenuButtonBoundingClientRect();
    setMenuBtnInfo(data);
  });

  return (
    <View className="detail-page">
      <NavBar
        style={{
          marginTop: menuBtnInfo.top + "px",
        }}
        fixed
        back={
          <>
            <ArrowLeft />
          </>
        }
        onBackClick={() => {
          Taro.navigateBack();
        }}
      ></NavBar>
      <View
        className="detail-cover"
        style={{ backgroundImage: `url(${Dish})` }}
      ></View>

      <View className="detail-content">
        <View className="detail-title">辣椒炒蛋</View>
        <Rate defaultValue={3} />
        <View className="detail-intro">
          这是一道非常好吃的菜，口感鲜美，营养丰富，适合各个年龄段的人群食用。
        </View>
        <View className="detail-section">
          <View className="title">💌爱情配方：</View>
          <View className="detail-ingredient">鸡蛋、辣椒、葱、盐</View>
        </View>
        <View className="detail-section">
          <View className="title">🔥升温指南：</View>
          <View className="detail-step">1. 准备食材</View>
          <View className="detail-step">2. 清洗食材</View>
          <View className="detail-step">3. 切割食材</View>
          <View className="detail-step">4. 烹饪食材</View>
          <View className="detail-step">5. 装盘</View>
        </View>
        <View className="detail-section">
          <View className="title">🌐星光通道：</View>
          <View className="detail-link">
            <Text className="link-title">小红书：</Text>
            <Text
              className="link"
              onClick={() => useCopy("https:www.baidu.com")}
            >
              https:www.baidu.com
            </Text>
          </View>
        </View>
      </View>
      <View className="detail-footer">
        <View className="footer-btn">
          <Text className="btn-text">下次约</Text>
        </View>
        <View className="footer-btn">
          <Text className="btn-text">一起尝</Text>
        </View>
      </View>
    </View>
  );
}
