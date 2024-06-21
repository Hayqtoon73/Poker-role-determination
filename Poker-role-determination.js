const readline = require('readline');

// カードを表すオブジェクト
class Card {
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
    }
}

// 入力カードを変換する関数
function parseCard(input) {
    const suitMap = { '0': 'S', '1': 'C', '2': 'D', '3': 'H' };
    const valueMap = {
        '01': 'A', '02': '2', '03': '3', '04': '4', '05': '5',
        '06': '6', '07': '7', '08': '8', '09': '9', '10': '10',
        '11': 'J', '12': 'Q', '13': 'K'
    };
    const [suit, value] = input.split(' ');
    return new Card(suitMap[suit], valueMap[value]);
}

// カードの役を判定する関数
function determineHand(cards) {
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

    const isFlush = Object.values(suitCounts).some(count => count === 5);
    const isStraight = values.every((val, i) => {
        if (i === 0) return true;
        const order = 'A23456789TJQK';
        return order.indexOf(val) - order.indexOf(values[i - 1]) === 1;
    });

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
}

// 入力されたカード情報を表示する関数
function displayCards(cards) {
    return cards.map(card => `${card.suit}${card.value}`).join(' ');
}

// メイン処理
function main() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const inputLines = [];

    rl.on('line', (line) => {
        inputLines.push(line);
        if (inputLines.length === 5) {
            const cards = inputLines.map(parseCard);
            const cardDisplay = displayCards(cards);
            const hand = determineHand(cards);

            console.log(cardDisplay);
            console.log(hand);

            rl.close();
        }
    });

    console.log('5枚のカードを入力してください (例: "0 01", "3 06", "3 10", "3 01", "1 01")：');
}

// 実行
main();
