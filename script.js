// ==============================
// カウンターのデータ
// ==============================

let counts = {

    games: 0,

    // ボーナス
    redBig: 0,
    blueBig: 0,
    reg: 0,

    // CZ・AT
    cz: 0,
    at: 0,

    // レア役
    suika: 0,
    weakCherry: 0,
    strongCherry: 0,
    chance: 0,

    // ボーナス同時当選
    kiramekiReg: 0,
    suikaReg: 0,
    chanceReg: 0,
    suikaBlueBig: 0,
    chanceBlueBig: 0,

    // 終了画面
    endDefault: 0,
    endWeak: 0,
    endStrong: 0,
    endBlue: 0,
    endRed: 0,
    endGold: 0,
    endRainbow: 0

};


// ==============================
// 各データが入力済みかどうか
// ==============================

let inputStatus = {

    redBig: false,
    blueBig: false,
    reg: false,

    cz: false,
    at: false,

    suika: false,
    weakCherry: false,
    strongCherry: false,
    chance: false,

    kiramekiReg: false,
    suikaReg: false,
    chanceReg: false,
    suikaBlueBig: false,
    chanceBlueBig: false,

    endDefault: false,
    endWeak: false,
    endStrong: false,
    endBlue: false,
    endRed: false,
    endGold: false,
    endRainbow: false

};


// ==============================
// ＋−ボタン
// ==============================

function changeCount(type, amount) {

    counts[type] += amount;


    // 0未満にはしない
    if (counts[type] < 0) {
        counts[type] = 0;
    }

    inputStatus[type] = true;

    // 数字を更新
    document.getElementById(type).value =
        counts[type];


    // レア役確率を更新
    updateRates();


    // 設定推測を更新
    updateSettingProbability();

}

// ==============================
// 数字を直接入力
// ==============================

function setCount(type, value) {

    let number = parseInt(value, 10);

    // 数字以外・空欄の場合
    if (isNaN(number) || number < 0) {
        number = 0;
    }

    counts[type] = number;

    inputStatus[type] = true;

    // 画面を更新
    document.getElementById(type).value =
        counts[type];

    // レア役確率を更新
    updateRates();

    // 設定推測を更新
    updateSettingProbability();

}


// ==============================
// 出現率の計算
// ==============================

function calculateRate(games, count) {

    if (games === 0 || count === 0) {

        return "----";

    }


    return "1/" + (games / count).toFixed(1);

}


// ==============================
// レア役確率を更新
// ==============================

function updateRates() {

    document.getElementById("suikaRate").textContent =
        calculateRate(
            counts.games,
            counts.suika
        );


    document.getElementById("weakCherryRate").textContent =
        calculateRate(
            counts.games,
            counts.weakCherry
        );


    document.getElementById("strongCherryRate").textContent =
        calculateRate(
            counts.games,
            counts.strongCherry
        );


    document.getElementById("chanceRate").textContent =
        calculateRate(
            counts.games,
            counts.chance
        );

}

// ==============================
// 設定ごとの公表値
// ==============================

const settingData = {

    1: {

        // ボーナス
        redBig: 583.0,
        blueBig: 479.0,
        reg: 621.9,

        // CZ・AT
        cz: 265.9,
        at: 359.6,

        // 青7BB 同時当選
        suikaBlueBig: 1285,
        chanceBlueBig: 2341,

        // RB 同時当選
        kiramekiReg: 7282,
        chanceReg: 2341,
        suikaReg: 2731,

        // 終了画面
        endDefault: 92.55,
        endWeak: 6.20,
        endStrong: 1.25

    },


    2: {

        redBig: 582.6,
        blueBig: 472.3,
        reg: 604.3,

        cz: 254.7,
        at: 346.8,

        suikaBlueBig: 1237,
        chanceBlueBig: 2341,

        kiramekiReg: 6554,
        chanceReg: 2341,
        suikaReg: 2521,

        endDefault: 92.55,
        endWeak: 6.20,
        endStrong: 1.25

    },


    4: {

        redBig: 584.0,
        blueBig: 440.0,
        reg: 526.3,

        cz: 207.6,
        at: 277.1,

        suikaBlueBig: 1170,
        chanceBlueBig: 1820,

        kiramekiReg: 4681,
        chanceReg: 1820,
        suikaReg: 2114,

        endDefault: 85.60,
        endWeak: 9.40,
        endStrong: 5.00

    },


    5: {

        redBig: 583.3,
        blueBig: 428.9,
        reg: 499.7,

        cz: 190.3,
        at: 255.7,

        suikaBlueBig: 1170,
        chanceBlueBig: 1638,

        kiramekiReg: 4096,
        chanceReg: 1638,
        suikaReg: 2048,

        endDefault: 84.35,
        endWeak: 9.40,
        endStrong: 6.25

    },


    6: {

        redBig: 585.8,
        blueBig: 421.8,
        reg: 465.0,

        cz: 179.5,
        at: 232.5,

        suikaBlueBig: 1150,
        chanceBlueBig: 1560,

        kiramekiReg: 3449,
        chanceReg: 1560,
        suikaReg: 1771,

        endDefault: 83.10,
        endWeak: 9.40,
        endStrong: 7.50

    }

};

// ==============================
// 実戦値を計算
// ==============================

function getActualRate(count) {

    if (counts.games === 0 || count === 0) {
        return null;
    }

    return counts.games / count;

}

// ==============================
// 設定との近さを計算
// ==============================

function calculateSettingScore(setting) {

    const data = settingData[setting];

    let score = 0;

    let count = 0;


    // 赤BIG
    if (counts.redBig > 0) {

        const actual = getActualRate(counts.redBig);

        score += Math.abs(actual - data.redBig) / data.redBig;

        count++;

    }


    // 青BIG
    if (counts.blueBig > 0) {

        const actual = getActualRate(counts.blueBig);

        score += Math.abs(actual - data.blueBig) / data.blueBig;

        count++;

    }


    // REG
    if (counts.reg > 0) {

        const actual = getActualRate(counts.reg);

        score += Math.abs(actual - data.reg) / data.reg;

        count++;

    }


    // CZ
    if (counts.cz > 0) {

        const actual = getActualRate(counts.cz);

        score += Math.abs(actual - data.cz) / data.cz;

        count++;

    }


    // AT
    if (counts.at > 0) {

        const actual = getActualRate(counts.at);

        score += Math.abs(actual - data.at) / data.at;

        count++;

    }


    if (count === 0) {
        return null;
    }


    return score / count;

}

// ==============================
// 設定推測
// ==============================

function updateSettingResult() {

    const settings = [1, 2, 4, 5, 6];

    let results = [];


    for (const setting of settings) {

        const score = calculateSettingScore(setting);

        if (score !== null) {

            results.push({
                setting: setting,
                score: score
            });

        }

    }


    if (results.length === 0) {

        document.getElementById("result").innerHTML =
            "<p>データを入力してください</p>";

        return;

    }


    // スコアが小さい順に並べる
    results.sort((a, b) => a.score - b.score);


    let html = "";


    for (const result of results) {

        html += `
            <p>
                設定${result.setting}：
                ${result.score.toFixed(3)}
            </p>
        `;

    }


    html += `
        <hr>
        <p>
            ★ 現在の最有力設定：
            <strong>設定${results[0].setting}</strong>
        </p>
    `;


    document.getElementById("result").innerHTML = html;

}

// ==============================
// 設定推定確率
// ==============================

function poissonProbability(k, lambda) {

    if (lambda <= 0) {
        return 0;
    }

    let result = Math.exp(-lambda);

    for (let i = 1; i <= k; i++) {
        result *= lambda / i;
    }

    return result;
}


// ==============================
// 各設定の尤度を計算
// ==============================

function calculateLikelihood(setting) {

    const data = settingData[setting];

    let likelihood = 1;

    let hasData = false;


        // ==============================
    // 終了画面による設定否定・確定
    // ==============================

    // 青エフェクト → 設定1を除外
    if (
        inputStatus.endBlue &&
        counts.endBlue > 0 &&
        setting < 2
    ) {
        return 0;
    }


    // 赤エフェクト → 設定1・2を除外
    if (
        inputStatus.endRed &&
        counts.endRed > 0 &&
        setting < 4
    ) {
        return 0;
    }


    // 金エフェクト → 設定1・2・4を除外
    if (
        inputStatus.endGold &&
        counts.endGold > 0 &&
        setting < 5
    ) {
        return 0;
    }


    // 虹エフェクト → 設定6確定
    if (
        inputStatus.endRainbow &&
        counts.endRainbow > 0 &&
        setting !== 6
    ) {
        return 0;
    }


    // ==============================
    // 赤BIG
    // ==============================

    if (inputStatus.redBig && counts.games > 0) {

        const expected =
            counts.games / data.redBig;

        likelihood *=
            poissonProbability(
                counts.redBig,
                expected
            );

        hasData = true;
    }


    // ==============================
    // 青BIG
    // ==============================

    if (inputStatus.blueBig && counts.games > 0) {

        const expected =
            counts.games / data.blueBig;

        likelihood *=
            poissonProbability(
                counts.blueBig,
                expected
            );

        hasData = true;
    }


    // ==============================
    // REG
    // ==============================

    if (inputStatus.reg && counts.games > 0) {

        const expected =
            counts.games / data.reg;

        likelihood *=
            poissonProbability(
                counts.reg,
                expected
            );

        hasData = true;
    }


    // ==============================
    // CZ
    // ==============================

    if (inputStatus.cz && counts.games > 0) {

        const expected =
            counts.games / data.cz;

        likelihood *=
            poissonProbability(
                counts.cz,
                expected
            );

        hasData = true;
    }


    // ==============================
    // AT
    // ==============================

    if (inputStatus.at && counts.games > 0) {

        const expected =
            counts.games / data.at;

        likelihood *=
            poissonProbability(
                counts.at,
                expected
            );

        hasData = true;
    }


    // ==============================
    // スイカ＋青BIG
    // ==============================

    if (
        inputStatus.suikaBlueBig &&
        counts.games > 0
    ) {

        const expected =
            counts.games / data.suikaBlueBig;

        likelihood *=
            poissonProbability(
                counts.suikaBlueBig,
                expected
            );

        hasData = true;
    }


    // ==============================
    // チャンス目＋青BIG
    // ==============================

    if (
        inputStatus.chanceBlueBig &&
        counts.games > 0
    ) {

        const expected =
            counts.games / data.chanceBlueBig;

        likelihood *=
            poissonProbability(
                counts.chanceBlueBig,
                expected
            );

        hasData = true;
    }


    // ==============================
    // キラめき目＋RB
    // ==============================

    if (
        inputStatus.kiramekiReg &&
        counts.games > 0
    ) {

        const expected =
            counts.games / data.kiramekiReg;

        likelihood *=
            poissonProbability(
                counts.kiramekiReg,
                expected
            );

        hasData = true;
    }


    // ==============================
    // チャンス目＋RB
    // ==============================

    if (
        inputStatus.chanceReg &&
        counts.games > 0
    ) {

        const expected =
            counts.games / data.chanceReg;

        likelihood *=
            poissonProbability(
                counts.chanceReg,
                expected
            );

        hasData = true;
    }


    // ==============================
    // スイカ＋RB
    // ==============================

    if (
        inputStatus.suikaReg &&
        counts.games > 0
    ) {

        const expected =
            counts.games / data.suikaReg;

        likelihood *=
            poissonProbability(
                counts.suikaReg,
                expected
            );

        hasData = true;
    }


    // ==============================
    // 終了画面
    // ==============================

    const endScreenCount =
    (inputStatus.endDefault ? 1 : 0) +
    (inputStatus.endWeak ? 1 : 0) +
    (inputStatus.endStrong ? 1 : 0);


    if (inputStatus.endDefault) {

        // デフォルト
        if (inputStatus.endDefault) {

            likelihood *=
                Math.pow(
                    data.endDefault / 100,
                    counts.endDefault
                );
        }


        // 高設定示唆①
        if (inputStatus.endWeak) {

            likelihood *=
                Math.pow(
                    data.endWeak / 100,
                    counts.endWeak
                );
        }


        // 高設定示唆②
        if (inputStatus.endStrong) {

            likelihood *=
                Math.pow(
                    data.endStrong / 100,
                    counts.endStrong
                );
        }

        hasData = true;
    }


    // ==============================
    // データがない場合
    // ==============================

    if (!hasData) {
        return null;
    }


    return likelihood;

}

// ==============================
// 尤度 → 推定確率
// ==============================

function updateSettingProbability() {

    const settings = [1, 2, 4, 5, 6];

    let results = [];

    let totalLikelihood = 0;


    // 各設定の尤度を計算
    for (const setting of settings) {

        const likelihood =
            calculateLikelihood(setting);

        if (likelihood !== null) {

            results.push({
                setting: setting,
                likelihood: likelihood
            });

            totalLikelihood += likelihood;
        }
    }


    // データがない場合
    if (results.length === 0) {

        document.getElementById("result").innerHTML =
            "<p>データを入力してください</p>";

        return;
    }


    // ------------------------------
    // 各設定の割合を計算
    // ------------------------------

    for (const result of results) {

        result.probability =
            result.likelihood /
            totalLikelihood *
            100;

    }


    // ------------------------------
    // 一番確率が高い設定
    // ------------------------------

    results.sort(
        (a, b) =>
            b.probability -
            a.probability
    );


    const bestSetting =
        results[0];


    // ------------------------------
    // 設定4以上
    // ------------------------------

    let setting4Plus = 0;
    let setting5Plus = 0;
    let setting6 = 0;


    for (const result of results) {

        if (result.setting >= 4) {
            setting4Plus += result.probability;
        }

        if (result.setting >= 5) {
            setting5Plus += result.probability;
        }

        if (result.setting === 6) {
            setting6 = result.probability;
        }
    }


    // ------------------------------
    // HTMLを作成
    // ------------------------------

    let html = "";

    html += "<h4>設定推定</h4>";


    for (const result of results) {

        html += `
            <p>
                設定${result.setting}
                ：
                <strong>
                    ${result.probability.toFixed(1)}%
                </strong>
            </p>
        `;

    }


    html += "<hr>";


    html += `
        <p>
            設定4以上：
            <strong>
                ${setting4Plus.toFixed(1)}%
            </strong>
        </p>
    `;


    html += `
        <p>
            設定5以上：
            <strong>
                ${setting5Plus.toFixed(1)}%
            </strong>
        </p>
    `;


    html += `
        <p>
            設定6：
            <strong>
                ${setting6.toFixed(1)}%
            </strong>
        </p>
    `;


    html += "<hr>";


    html += `
        <p>
            ★ 最有力：
            <strong>
                設定${bestSetting.setting}
            </strong>
        </p>
    `;


    document.getElementById("result").innerHTML =
        html;

}