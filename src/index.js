'use strict';

// アプリケーションをコントロールするモジュール
var app = require('app');
// ウィンドウを作成するモジュール
var BrowserWindow = require('browser-window');

//var Menu = require('menu');


// メインウィンドウはGCされないようにグローバル宣言
var mainWindow = null;











// 全てのウィンドウが閉じたら終了
app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// Electronの初期化完了後に実行
app.on('ready', function() {

    // メニューをアプリケーションに追加
    //Menu.setApplicationMenu(menu);


  // メイン画面の表示。ウィンドウの幅、高さを指定できる
 //mainWindow = new BrowserWindow({width: 450, height: 300});

 mainWindow = new BrowserWindow({
      // ウィンドウ作成時のオプション
      "width": 420,
      "height": 260,
      "transparent": true,    // ウィンドウの背景を透過
      "frame": false,     // 枠の無いウィンドウ
      "resizable": false  // ウィンドウのリサイズを禁止
  });



  mainWindow.loadURL('file://' + __dirname + '/main.html');

  // ウィンドウが閉じられたらアプリも終了
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});


/*

// メニュー情報の作成
var template = [
  {
    label: 'ReadUs',
    submenu: [
      {label: 'Quit', accelerator: 'Command+Q', click: function () {app.quit();}}
    ]
  }, {
    label: 'File',
    submenu: [
      {label: 'Open', accelerator: 'Command+O', click: function() {
        // 「ファイルを開く」ダイアログの呼び出し
        require('dialog').showOpenDialog({ properties: ['openDirectory']}, function (baseDir){
          if(baseDir && baseDir[0]) {
            openWindow(baseDir[0]);
          }
        });
      }}
    ]
  }, {
    label: 'View',
    submenu: [
      { label: 'Reload', accelerator: 'Command+R', click: function() { BrowserWindow.getFocusedWindow().reloadIgnoringCache(); } },
      { label: 'Toggle DevTools', accelerator: 'Alt+Command+I', click: function() { BrowserWindow.getFocusedWindow().toggleDevTools(); } }
    ]
  }
];

var menu = Menu.buildFromTemplate(template);
*/
