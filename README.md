KansaiKi
==
マップと状況に応じたな艦娘と艦載機の組み合わせを教えてくれるCUIプログラム。

## これはなに
出撃・装備・艦娘に関する希望を入力すると、それに見合った編成と装備パターンを出力します。

## ちゅうい！
* 結果は最適解であるとは限りません。あくまで意思決定を早めるツールです。ご留意ください。結果を受けてのいかなる判断・行動も利用した提督の責任です。

* 今のところ、空母(正規空母・軽空母・装甲空母)のみ正しい結果を吐けるようになっています。航空艦(航空戦艦・航空巡洋艦)は最適な調整をしていませんので、ご注意ください。

* 現在、制空戦力は艦戦のみカウントしているため、「天山一二型(友永隊)」や「彗星(江草隊)」のように対空値を持つ艦攻・艦爆はカウントされません。

* 上により、艦戦のみでは制空戦力が足りないが、艦攻・艦爆を足すと到達する、または、空母だけでは制空戦力が足りないが、航空艦の制空戦力を足すと到達するというパターンが発生します。今後の開発で修正する予定ですが、くれぐれもご留意ください。

## 開発環境・実行環境
node v0.10.26

## うごかしかた１
Node.js 環境のある人はこちらを参照してください。
環境がないけどやってみたい人は http://nodejs.jp/ とか「nodejs インストール」とか「nvm インストール」とかググッてください。

1. ダウンロードして中身を好きなディレクトリに展開
2. 展開したファイルの kansaiki.js を適当なテキストエディタで開き、/* コメント文 */の指示通り入力
3. コマンドライン等で" node kansaiki.js > result.txt "を実行
4. result.txt を開いて結果を確認

## うごかしかた２
InternetExplorer, GoogleChrome または Firefoxブラウザには、Javascriptを実行できるデバッグツールが内蔵されているので、これをnode.jsの代わりに利用します。インターネット接続は不要です。

1. ダウンロードして中身を好きなディレクトリに展開
2. 展開したファイルの kansaiki.js を適当なテキストエディタで開き、中身をすべて選択してコピー
3.  ブラウザを立ち上げ、開発者用のデバッグツールを開く。開き方はブラウザごとに異なる
 	* Internet Explorer: [F12]キー
	* Google Chrome: [Ctrl]+[Shift]+[J]キーを同時押し
	* firefox: [Ctrl]+[Shift]+[J]キーを同時押し 
4. 「console」や「コンソール」などと書かれたタブ等があればそれを開き、「> 」と表示された入力欄を探して、コピーした kansaiki.js の内容を貼り付ける
5. 実行する
	* Google Chrome と Firefox はエンターキーを押せば実行される。ただし、firefoxはセキュリティ的な配慮から「貼り付けを許可」という文字列を一度打たせる場合がある
	* Internet Explorerは緑色の右を向いた三角▲ボタンがあるので、それをクリックして実行する
6. 出力結果がどこかに表示される

※以下のバージョンのブラウザで動作確認しましたが、最近のバージョンなら問題ないかもしれません。

* Internet Explorer 11
* Google Chrome 39.0.2171.71 m
* irefox 33.1.1 
