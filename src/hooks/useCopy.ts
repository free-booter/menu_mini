import Taro from "@tarojs/taro";

function useCopy(text: string) {
    Taro.setClipboardData({
      data: text,
      success: () => {
        Taro.showToast({
          title: "复制成功",
          icon: "none",
        });
      },
      fail: () => {
        Taro.showToast({
          title: "复制失败",
          icon: "none",
        });
      },
    });
}
export default useCopy;
