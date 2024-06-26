# ポーカー役判定プログラム

このプロジェクトは、ターミナルから入力された5枚のカード情報を基にポーカーの役を判定して表示するJavaScriptプログラムです。

## 判定について

### ポーカー役判定アルゴリズムの思考過程

このポーカー役判定プログラムは、5枚のカードからポーカーの役を判定するためのアルゴリズムを実装しています。以下にその思考過程を詳しく説明します。

#### 全体の流れ

1. ユーザーから5枚のカードを入力として受け取る。
2. カード情報を適切な形式に変換する。
3. カードの役を判定する。
4. 判定結果を表示する。

#### カードの入力と変換

まず、ユーザーから5枚のカード情報を入力として受け取ります。各カードはスートと数字で表され、スートは `0`（スペード）、`1`（クラブ）、`2`（ダイヤ）、`3`（ハート）、数字は `01` から `13` までの形式です。

#### カードクラスの定義

カードを表す `Card` クラスを定義し、スートと値をプロパティとして持ちます。

```javascript
class Card {
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
    }
}
```

#### 役判定の準備

まず、カードの値とスートをそれぞれ配列に格納し、値の出現回数とスートの出現回数をカウントします。

```javascript
const values = cards.map(card => card.value).sort((a, b) => {
    const order = 'A23456789TJQK';
    return order.indexOf(a) - order.indexOf(b);
});
const suits = cards.map(card => card.suit);
const valueCounts = values.reduce((acc, val) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
}, {});
const suitCounts = suits.reduce((acc, suit) => {
    acc[suit] = (acc[suit] || 0) + 1;
    return acc;
}, {});
```

#### フラッシュとストレートの判定

フラッシュ: 同じスートのカードが5枚あるかをチェックします。
ストレート: 連続した5枚のカードであるかをチェックします。


```javascript
const isFlush = Object.values(suitCounts).some(count => count === 5);
const isStraight = values.every((val, i) => {
    if (i === 0) return true;
    const order = 'A23456789TJQK';
    return order.indexOf(val) - order.indexOf(values[i - 1]) === 1;
});
```

#### 各役の判定

以下の順序で役を判定します。

ロイヤルフラッシュ: フラッシュかつストレートで、Aが含まれている。
ストレートフラッシュ: フラッシュかつストレート。
フォーカード: 同じ値のカードが4枚。
フルハウス: 同じ値のカードが3枚と2枚。
フラッシュ: 同じスートのカードが5枚。
ストレート: 連続した5枚のカード。
スリーカード: 同じ値のカードが3枚。
ツーペア: 同じ値のカードが2枚のペアが2組。
ワンペア: 同じ値のカードが2枚。
ハイカード: 上記のどれにも該当しない。

```javascript
const counts = Object.values(valueCounts);
if (isFlush && isStraight && values.includes('A')) return 'ロイヤルフラッシュ';
if (isFlush && isStraight) return 'ストレートフラッシュ';
if (counts.includes(4)) return 'フォーカード';
if (counts.includes(3) && counts.includes(2)) return 'フルハウス';
if (isFlush) return 'フラッシュ';
if (isStraight) return 'ストレート';
if (counts.includes(3)) return 'スリーカード';
if (counts.filter(count => count === 2).length === 2) return 'ツーペア';
if (counts.includes(2)) return 'ワンペア';
return 'ハイカード（ブタ）';
```


## 前提条件

- [Node.js](https://nodejs.org/) がインストールされていること

## インストール

1. このリポジトリをクローンまたはダウンロードします。
2. 必要に応じてディレクトリを移動します。

```sh
git clone https://github.com/yourusername/poker-hand-evaluator.git
cd poker-hand-evaluator
```
