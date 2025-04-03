import { View, Text, ScrollView } from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
import { useState } from "react";
import {
  Badge,
  Image,
  InputNumber,
  Checkbox,
  NoticeBar,
  Rate,
  SearchBar,
  Tabs,
} from "@nutui/nutui-react-taro";
import { Add, VolumeMax, Del } from "@nutui/icons-react-taro";
import DishImg from "../../assets/images/dish.png";

import "./index.scss";

type MenuBtnRect = {
  width: number;
  height: number;
  left: number;
  right: number;
  top: number;
  bottom: number;
};
export default function Index() {
  const [menuBtnInfo, setMenuBtnInfo] = useState<MenuBtnRect>(
    {} as MenuBtnRect
  );
  useLoad(() => {
    const data = Taro.getMenuButtonBoundingClientRect();
    setMenuBtnInfo(data);
  });

  const [textShort, setTextShort] = useState(
    "欢迎使用电子菜单，点击查看菜品详情，长按可添加到购物车，点击购物车可查看已选菜品。"
  );

  return (
    <View
      className="home-page"
      style={{ paddingTop: menuBtnInfo.top + menuBtnInfo.height + 10 + "px" }}
    >
      <View
        className="app-navbar flex items-center justify-start"
        style={{
          paddingTop: menuBtnInfo.top + "px",
          height: menuBtnInfo.height + "px",
        }}
      >
        <SearchBar placeholder="搜索喜欢的菜谱" />
      </View>
      <View className="home-header flex items-center justify-between w-full">
        <View className="home-header__title">电子菜单</View>
        <View className="home-header__btn">上新</View>
      </View>
      <NoticeBar content={textShort} leftIcon={<VolumeMax />} scrollable />
      <Tabs direction="vertical">
        <Tabs.TabPane title="吃菜🥦">
          <View className="pane-content">
            <View className="pane-header flex">
              <Text className="pane-header__title fw-600">吃菜🥦(10)</Text>
              <Text className="pane-header__tip">一些提示文案</Text>
            </View>
            <View className="pane-list">
              <View className="pane-item">
                <Image
                  className="item-img"
                  src="https://storage.360buyimg.com/imgtools/e067cd5b69-07c864c0-dd02-11ed-8b2c-d7f58b17086a.png"
                />
                <View className="item-info">
                  <View className="item-title fw-600">辣椒炒蛋</View>
                  <View className="item-sales">销量：1</View>
                  <View className="item-rate">
                    <Rate defaultValue={3} />
                  </View>
                </View>
                <View className="item-action">
                  {/* <View className='ball-box' >
                    <View className='ball'></View>
                  </View> */}
                  <Badge value={0}>
                    <View className="item-add">
                      <Add />
                    </View>
                  </Badge>
                </View>
              </View>
            </View>
          </View>
        </Tabs.TabPane>
        <Tabs.TabPane title="开荤🍗">低阶特卖</Tabs.TabPane>
        <Tabs.TabPane title="凉菜🥗">上新日</Tabs.TabPane>
        <Tabs.TabPane title="喝汤🥘">百亿补贴</Tabs.TabPane>
        <Tabs.TabPane title="粉面🍝">今日聚超值</Tabs.TabPane>
      </Tabs>

      <View className="home-footer">
        <View className="footer-car">
          <View className="car-header flex items-center justify-between">
            <View className="car-header__tit">已选购（2件）</View>
            <View className="car-header__clear flex items-center">
              <Del size={16} style={{ marginRight: "10px" }} />
              清空购物车
            </View>
          </View>
          <View>
            <ScrollView className="car-content" scrollY scrollWithAnimation>
              <View className="car-item flex items-center justify-between">
                <View className="car-item__info flex items-center">
                  <Image
                    className="car-item__img"
                    src="https://storage.360buyimg.com/imgtools/e067cd5b69-07c864c0-dd02-11ed-8b2c-d7f58b17086a.png"
                  />
                  <View className="car-item__title">辣椒炒蛋</View>
                </View>
                <View className="car-item__action flex items-center">
                  <InputNumber defaultValue={1} readOnly min={0} max={1} />
                </View>
              </View>
              <View className="car-item flex items-center justify-between">
                <View className="car-item__info flex items-center">
                  <Image
                    className="car-item__img"
                    src="https://storage.360buyimg.com/imgtools/e067cd5b69-07c864c0-dd02-11ed-8b2c-d7f58b17086a.png"
                  />
                  <View className="car-item__title">辣椒炒蛋</View>
                </View>
                <View className="car-item__action flex items-center">
                  <InputNumber defaultValue={1} readOnly min={0} max={1} />
                </View>
              </View>
              <View className="car-item flex items-center justify-between">
                <View className="car-item__info flex items-center">
                  <Image
                    className="car-item__img"
                    src="https://storage.360buyimg.com/imgtools/e067cd5b69-07c864c0-dd02-11ed-8b2c-d7f58b17086a.png"
                  />
                  <View className="car-item__title">辣椒炒蛋</View>
                </View>
                <View className="car-item__action flex items-center">
                  <InputNumber defaultValue={1} readOnly min={0} max={1} />
                </View>
              </View>
              <View className="car-item flex items-center justify-between">
                <View className="car-item__info flex items-center">
                  <Image
                    className="car-item__img"
                    src="https://storage.360buyimg.com/imgtools/e067cd5b69-07c864c0-dd02-11ed-8b2c-d7f58b17086a.png"
                  />
                  <View className="car-item__title">辣椒炒蛋</View>
                </View>
                <View className="car-item__action flex items-center">
                  <InputNumber defaultValue={1} readOnly min={0} max={1} />
                </View>
              </View>
              <View className="car-item flex items-center justify-between">
                <View className="car-item__info flex items-center">
                  <Image
                    className="car-item__img"
                    src="https://storage.360buyimg.com/imgtools/e067cd5b69-07c864c0-dd02-11ed-8b2c-d7f58b17086a.png"
                  />
                  <View className="car-item__title">辣椒炒蛋</View>
                </View>
                <View className="car-item__action flex items-center">
                  <InputNumber defaultValue={1} readOnly min={0} max={1} />
                </View>
              </View>
              <View className="car-item flex items-center justify-between">
                <View className="car-item__info flex items-center">
                  <Image
                    className="car-item__img"
                    src="https://storage.360buyimg.com/imgtools/e067cd5b69-07c864c0-dd02-11ed-8b2c-d7f58b17086a.png"
                  />
                  <View className="car-item__title">辣椒炒蛋</View>
                </View>
                <View className="car-item__action flex items-center">
                  <InputNumber defaultValue={1} readOnly min={0} max={1} />
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
        <View className="footer-action flex items-center justify-between">
          <View className="flex items-center">
            <Image className="footer-action__img" src={DishImg}></Image>
            <View>
              预计支付<Text className="amount">4个start</Text>
            </View>
          </View>
          <View className="footer-action__btn">去结算</View>
        </View>
      </View>
    </View>
  );
}
