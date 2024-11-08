let font;  // 載入字型文字
let points = [];  // 轉成點狀文字

function preload() {  // 在執行 setup() 前載入字型
    font = loadFont("Fonts/Righteous-Regular.ttf"); 
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
  
  // 將文字 "pop" 轉成點狀表示，設定位置和大小
  points = font.textToPoints("pop", 0, 0, 200, {
    sampleFactor: 0.08
  });
}

function draw() {
  background("#ffb3d9"); // 背景顏色
  
  rectMode(CENTER);  // 設置矩形的繪製模式
  
  // 計算圖形的排列
  var w = 60;
  var s_w = 80;
  var offsetX = 30;
  var offsetY = 60;
  
  var spacing = w + 150;
  var numX = floor(width / spacing);
  var numY = floor(height / (w + s_w));
  
  // 繪製背景圖案 (圓形、正方形、三角形)
  for (var row = 0; row < numY; row++) {
    for (var col = 0; col < numX; col++) {
      var x = 50 + col * spacing;
      var y = 50 + row * (w + s_w);

      // 使用滑鼠位置來動態調整顏色
      var r = map(mouseX, 0, width, 50, 255);
      var g = map(mouseY, 0, height, 50, 255);
      var b = map(mouseX + mouseY, 0, width + height, 50, 255);

      var sizeOffset = map(mouseX, 0, width, 20, 120);  

      // 畫圓形
      stroke(r, g, b);
      strokeWeight(3);
      ellipse(x, y, w + offsetX + sizeOffset);

      // 畫正方形
      stroke(255 - r, 255 - g, 255 - b);
      strokeWeight(3);
      rect(x + 120, y, w + offsetY + sizeOffset, w + offsetY + sizeOffset);

      // 畫三角形
      stroke(r, 255 - g, 255 - b);
      strokeWeight(3);
      var triangleSize = map(mouseY, 0, height, 40, 150);  
      beginShape();
      vertex(x + 180, y - 10); 
      vertex(x + 150, y + triangleSize); 
      vertex(x + 210, y + triangleSize);
      endShape(CLOSE);
    }
  }

  // 繪製靜止的文字 "pop" 完整顯示在畫布的指定位置
  push(); // 保存當前狀態
  translate(450, 300); // 設定文字的固定位置在 

  // 使用 sin 和 cos 函數來動態控制翻轉
  let flipX = sin(frameCount * 0.1) > 0 ? 1 : -1; // 水平翻轉
  let flipY = cos(frameCount * 0.1) > 0 ? 1 : -1; // 垂直翻轉

  // 水平和垂直翻轉文字
  scale(flipX, flipY);  // 根據 sin 和 cos 動態進行翻轉

  // 繪製點狀文字
  for (let i = 0; i < points.length; i++) { 
    fill("#8338ec"); // 圓充滿顏色
    noStroke(); // 圓不要框

    // 繪製連接的線
    if (i < points.length - 1) {
      strokeWeight(2); 
      stroke("#c1121f"); // 線條顏色
      line(
        points[i].x, points[i].y,
        points[i + 1].x, points[i + 1].y
      ); // 連線
    }
  }
  
  pop(); // 恢復之前的變換狀態
}
