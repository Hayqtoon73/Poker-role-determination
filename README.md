# Poker-role-determination

readlineモジュールを使ってターミナルからの入力を処理します。

// カードを表すオブジェクト
  Cardクラスは、カードのスート（suit）と値（value）を保持します。スートは'♠', '♣', '♦',      '♥'を'S', 'C', 'D', 'H'で表し、値は'A', '2', ..., 'K'を入れてあります。

// 入力カードを変換する関数
  parseCard関数は、入力されたカード情報をパースして、対応するスートと値を持つCardオブジェクトを作成するようにしています。

// カードの役を判定する関数
  determineHand関数は、5枚のカードの役を判定します。役の判定は、カードの値とスートの組み合わせに基づいて行われます。まず、値とスートを数え、特定のパターンに基づいて役を決定します。

// 入力されたカード情報を表示する関数
  displayCards関数は、カード情報を適切な形式で表示します。各カードを文字列に変換し、スペースで区切って結合しています

// メイン処理
  main関数は、ターミナルからの入力を処理します。readlineインターフェースを使用して、ユーザーが5枚のカード情報を入力するまで待ちます。5枚のカード情報が入力されると、カード情報をパースして役を判定し、結果を表示します。

