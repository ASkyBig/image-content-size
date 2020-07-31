'use strict'
const { createCanvas, loadImage }  = require('canvas')

// const url = 'https://qdstatic-1252317822.image.myqcloud.com/banner/uploads/c422fc6751e9851a5d9a7c26b46ac196.png?imageMogr2/format/webp|imageMogr2/quality/80|imageMogr2/thumbnail/!366x335r'
// const url = 'https://qdstatic-1252317822.image.myqcloud.com/banner/uploads/c422fc6751e9851a5d9a7c26b46ac196.png?imageMogr2/quality/80|imageMogr2/thumbnail/!366x335r'

var getRealSize = function (url, deviation = 10) {
  console.log('url ====', url)
  const canvas = createCanvas(2000, 2000)
  const ctx = canvas.getContext('2d')
  loadImage(url)
    .then(image => {
      const height = image.height
      const width = image.width
     
      ctx.drawImage(image, 0, 0)
      const imageData = ctx.getImageData(0, 0, width - 1, height - 1)

      const positionSet = { left: 0, top: 0, right: width - 1, bottom: height -1 };
      (() => {
        for (let y = 0, h = height; y < h; y++) {
          for (let x = 0, w = width; x < w; x++) {
            let arr = ctx.getImageData(x, y, 1, 1).data
            if (arr[3] > deviation) {
              positionSet.top = y
              return
            }
          }
        }
      })();

      (() => {
        for (let x = 0, w = width; x < w; x++) {
          for (let y = 0, h = height; y < h; y++) {
            let arr = ctx.getImageData(x, y, 1, 1).data
            if (arr[3] > deviation) {
              positionSet.left = x
              return
            }
          }
        }
      })();

      (() => {
        for (let y = height; y >= 0; y--) {
          for (let x = 0, w = width; x < w; x++) {
            let arr = ctx.getImageData(x, y, 1, 1).data
            if (arr[3] > deviation) {
              positionSet.bottom = y
              return
            }
          }
        }
      })();

      (() => {
        for (let x = width - 1; x >= 0; x--) {
          for (let y = 0, h = height; y < h; y++) {
            let arr = ctx.getImageData(x, y, 1, 1).data
            if (arr[3] > deviation) {
              positionSet.right = x
              return
            }
          }
        }
      })();

      console.log('positionSet ====', positionSet)
      return positionSet
    })
    .catch(err => {
      console.log('err ===', err)
    })
}

module.exports =  getRealSize