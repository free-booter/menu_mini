const { presetWeapp } = require('unocss-preset-weapp')
const { transformerClass } = require('unocss-preset-weapp/transformer')
const { defineConfig } = require('unocss')

module.exports = defineConfig({
  presets: [
    presetWeapp({
      whiteList: ['center', 'border-base'],
      // 指定小程序平台
      platform: 'taro',
    })
  ],
  shortcuts: [
    {
      'border-base': 'border border-gray-500/10',
      'center': 'flex justify-center items-center',
    },
  ],
  transformers: [transformerClass()],
  content: {
    pipeline: {
      // 只扫描 tsx 文件
      include: [/\.tsx$/],
      exclude: ['node_modules', '.git', 'dist']
    }
  }
})
