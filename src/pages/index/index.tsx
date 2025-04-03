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
  rate: number;
  saleNum: number;
  image: string;
  actived: boolean;
};

export default function Index() {
  const [menuBtnInfo, setMenuBtnInfo] = useState<MenuBtnRect>(
    {} as MenuBtnRect
  );
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

  const [dataList, setDataList] = useState([
    {
      id: 1,
      name: "辣椒炒蛋",
      image:
        "https://storage.360buyimg.com/imgtools/e067cd5b69-07c864c0-dd02-11ed-8b2c-d7f58b17086a.png",
      saleNum: 1,
      rate: 4,
      actived: false,
    },
  ]);

  // 购物车操作
  const handleAddToCart = (item: CartItem) => {
    setShowCart(true);
    item.actived = true;
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
    if (existingItem) return;
    setCartItems([...cartItems, item]);
  };

  const handleRemoveFromCart = (item: CartItem) => {
    if (!item.actived) return;
    item.actived = false;
    setCartItems(cartItems.filter((item) => item.id !== item.id));
    if (cartItems.length === 1) {
      handleClearCar();
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

  const [footerSlide, setFooterSlide] = useState(false);
  const handleClearCar = () => {
    setIsSlidingDown(true);
    setFooterSlide(true);
    setTimeout(() => {
      setShowFooterCar(false);
      setIsSlidingDown(false);
      setFooterSlide(false);
      setShowCart(false);
      setCartItems([]);
      setDataList(dataList.map((item) => ({ ...item, actived: false })));
    }, 300);
  };

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
              {dataList.map((item) => (
                <View className="pane-item" key={item.id}>
                  <Image
                    className="item-img"
                    src={item.image}
                    onClick={() =>
                      Taro.navigateTo({
                        url: "/pages/index/components/detail/index",
                      })
                    }
                  />
                  <View className="item-info">
                    <View className="item-title fw-600">{item.name}</View>
                    <View className="item-sales">销量：{item.saleNum}</View>
                    <View className="item-rate">
                      <Rate defaultValue={item.rate} />
                    </View>
                  </View>
                  <View className="item-action">
                    <View className="item-section flex items-center justify-between">
                      <View
                        className={`section-item ${
                          !item.actived ? "active" : ""
                        }`}
                        onClick={() => handleRemoveFromCart(item)}
                      >
                        达咩
                      </View>
                      <View
                        className={`section-item ${
                          item.actived ? "active" : ""
                        }`}
                        onClick={() => handleAddToCart(item)}
                      >
                        想吃
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </Tabs.TabPane>
        <Tabs.TabPane title="开荤🍗">低阶特卖</Tabs.TabPane>
        <Tabs.TabPane title="凉菜🥗">上新日</Tabs.TabPane>
        <Tabs.TabPane title="喝汤🥘">百亿补贴</Tabs.TabPane>
        <Tabs.TabPane title="粉面🍝">今日聚超值</Tabs.TabPane>
      </Tabs>

      {showCart && (
        <View className={`home-footer ${footerSlide ? "slide-down" : ""}`}>
          {showFooterCar && (
            <View
              className={`footer-car ${isSlidingDown ? "slide-down" : ""}`}
              onClick={(e) => e.stopPropagation()}
            >
              <View className="car-header flex items-center justify-between">
                <View className="car-header__tit">
                  已选购({cartItems.length})
                </View>
                <View
                  className="car-header__clear flex items-center"
                  onClick={handleClearCar}
                >
                  <Del size={16} style={{ marginRight: "10px" }} />
                  清空购物车
                </View>
              </View>
              <View>
                <ScrollView className="car-content" scrollY scrollWithAnimation>
                  {cartItems.map((item) => (
                    <View
                      key={item.id}
                      className="car-item flex items-center justify-between"
                    >
                      <View className="car-item__info flex items-center">
                        <Image className="car-item__img" src={item.image} />
                        <View className="car-item__title">{item.name}</View>
                      </View>
                      <View className="car-item__action flex items-center">
                        <View
                          className="section-item active"
                          onClick={() => handleRemoveFromCart(item)}
                        >
                          达咩
                        </View>
                      </View>
                    </View>
                  ))}
                </ScrollView>
              </View>
            </View>
          )}
          <View className="footer-action flex items-center justify-between">
            <View className="flex items-center" onClick={handleToggleFooterCar}>
              <Image className="footer-action__img" src={DishImg}></Image>
              <View>已选购{cartItems.length}个</View>
            </View>
            <View className="footer-action__btn">选好了</View>
          </View>
        </View>
      )}
    </View>
  );
}
