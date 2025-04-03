import { View, Text, ScrollView } from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
import { useState, useEffect } from "react";
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

type CartItem = {
  id: number;
  name: string;
  price: number;
  count: number;
  image: string;
};

export default function Index() {
  const [menuBtnInfo, setMenuBtnInfo] = useState<MenuBtnRect>({} as MenuBtnRect);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showFooterCar, setShowFooterCar] = useState(false);
  const [isSlidingDown, setIsSlidingDown] = useState(false);

  useLoad(() => {
    const data = Taro.getMenuButtonBoundingClientRect();
    setMenuBtnInfo(data);
  });

  const [textShort, setTextShort] = useState(
    "欢迎使用电子菜单，点击查看菜品详情，长按可添加到购物车，点击购物车可查看已选菜品。"
  );

  // 购物车操作
  const handleAddToCart = (item: CartItem) => {
    setShowCart(true);
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, count: cartItem.count + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, count: 1 }]);
    }
  };

  const handleRemoveFromCart = (itemId: number) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
    if (cartItems.length === 1) {
      handleClearCar()
    }
  };

  const handleUpdateCount = (itemId: number, count: number) => {
    if (count === 0) {
      handleRemoveFromCart(itemId);
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === itemId ? { ...item, count } : item
        )
      );
    }
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.count,
    0
  );

  const handleToggleFooterCar = (e: any) => {
    e.stopPropagation();
    if (showFooterCar) {
      setIsSlidingDown(true);
      setTimeout(() => {
        setShowFooterCar(false);
        setIsSlidingDown(false);
      }, 300);
    } else {
      setShowFooterCar(true);
    }
  };

  const handleHideFooterCar = () => {
    if (showFooterCar) {
      setIsSlidingDown(true);
      setTimeout(() => {
        setShowFooterCar(false);
        setIsSlidingDown(false);
      }, 300);
    }
  };

  const [footerSlide,setFooterSlide] = useState(false)
  const handleClearCar = () => {
    setIsSlidingDown(true);
    setFooterSlide(true);
      setTimeout(() => {
        setShowFooterCar(false);
        setIsSlidingDown(false);
        setFooterSlide(false);
        setShowCart(false);
        setCartItems([]);
      }, 300);
  }

  return (
    <View
      className="home-page"
      style={{ paddingTop: menuBtnInfo.top + menuBtnInfo.height + 10 + "px" }}
      onClick={handleHideFooterCar}
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
                  <Badge value={cartItems.find(item => item.id === 1)?.count || 0}>
                    <View className="item-add" onClick={() => handleAddToCart({
                      id: 1,
                      name: "辣椒炒蛋",
                      price: 18,
                      count: 1,
                      image: "https://storage.360buyimg.com/imgtools/e067cd5b69-07c864c0-dd02-11ed-8b2c-d7f58b17086a.png"
                    })}>
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

      {showCart && (
        <View className={`home-footer ${footerSlide ? 'slide-down' : ''}`}>
          {showFooterCar && (
            <View className={`footer-car ${isSlidingDown ? 'slide-down' : ''}`} onClick={(e) => e.stopPropagation()}>
              <View className="car-header flex items-center justify-between">
                <View className="car-header__tit">已选购（{cartItems.reduce((sum, item) => sum + item.count, 0)}件）</View>
                <View className="car-header__clear flex items-center" onClick={handleClearCar}>
                  <Del size={16} style={{ marginRight: "10px" }} />
                  清空购物车
                </View>
              </View>
              <View>
                <ScrollView className="car-content" scrollY scrollWithAnimation>
                  {cartItems.map((item) => (
                    <View key={item.id} className="car-item flex items-center justify-between">
                      <View className="car-item__info flex items-center">
                        <Image
                          className="car-item__img"
                          src={item.image}
                        />
                        <View className="car-item__title">{item.name}</View>
                      </View>
                      <View className="car-item__action flex items-center">
                        <InputNumber
                          value={item.count}
                          min={0}
                          max={99}
                          onChange={(value) => handleUpdateCount(item.id, Number(value))}
                        />
                      </View>
                    </View>
                  ))}
                </ScrollView>
              </View>
            </View>
          )}
          <View className="footer-action flex items-center justify-between" >
            <View className="flex items-center" onClick={handleToggleFooterCar}>
              <Image className="footer-action__img" src={DishImg}></Image>
              <View>
                预计支付<Text className="amount">¥{totalPrice.toFixed(2)}</Text>
              </View>
            </View>
            <View className="footer-action__btn">去结算</View>
          </View>
        </View>
      )}
    </View>
  );
}
