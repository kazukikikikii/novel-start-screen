document.addEventListener('DOMContentLoaded', () => {
  // ✅ メニューバー展開処理
  const menuBtn = document.getElementById('menuButton');
  const menuNav = document.getElementById('menuNav');
  if (menuBtn && menuNav) {
    menuBtn.addEventListener('click', () => {
      menuNav.classList.toggle('open');
    });
  } else {
    // console.warn('menuButton または menuNav が見つかりません。'); // ページによっては存在しないため警告は不要
  }

  // ✅ 戻るボタン処理
  const back = document.querySelector(".back-icon");
  if (back) {
    back.addEventListener("click", () => {
      history.back();
    });
  }

  // ✅ キャラクタークリックでセリフ表示 (メイン画面用)
  const character = document.getElementById('character');
  const speech = document.getElementById('speech'); // index.htmlの吹き出し
  const messages = ["ようこそ！", "一緒に小説を作ろう！", "たのしんでね！"];
  let msgIndex = 0;
  if (character && speech) {
    character.addEventListener('click', () => {
      speech.innerText = messages[msgIndex];
      speech.style.display = "block";
      msgIndex = (msgIndex + 1) % messages.length;
      setTimeout(() => {
        speech.style.display = "none";
      }, 2000);
    });
  }

  // ✅ モード選択の画面遷移処理（要素がある場合のみ）
  const ideaBtn = document.getElementById('ideaBtn');
  const eraserBtn = document.getElementById('eraserBtn');
  const blockBtn = document.getElementById('blockBtn');
  const writeBtn = document.querySelector('.write-button'); // 小説を書くボタン

  if (ideaBtn) {
    ideaBtn.onclick = () => location.href = 'index3.html';
  }

  if (eraserBtn) {
    eraserBtn.onclick = () => location.href = 'eraser.html';
  }

  if (blockBtn) {
    blockBtn.onclick = () => location.href = 'plot.html';
  }

  if (writeBtn) {
    writeBtn.onclick = () => {
      // カスタムモーダル表示の例（alertの代わりに）
      const modal = document.createElement('div');
      modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background-color: rgba(0,0,0,0.5); display: flex;
        justify-content: center; align-items: center; z-index: 9999;
      `;
      modal.innerHTML = `
        <div style="background-color: white; padding: 30px; border-radius: 10px; border: 2px solid black; text-align: center; font-weight: bold;">
          <p>「小説を書く」機能はまだ準備中です！</p>
          <button onclick="this.parentElement.parentElement.remove()" style="padding: 10px 20px; margin-top: 20px; background-color: #a7d676; border: 2px solid black; cursor: pointer; font-weight: bold;">閉じる</button>
        </div>
      `;
      document.body.appendChild(modal);
    };
  }

  // ✅ ページごとのキャラクターと吹き出しの初期表示 (共通処理)
  // characterContainerとspeechElementは全てのHTMLで共通のIDを使用
  const characterContainer = document.getElementById('characterContainer');
  const speechElement = document.getElementById('speech');
  const speechText = document.getElementById('speechText');
  const closeBtn = document.getElementById('closeSpeech');

  if (characterContainer && speechElement && speechText && closeBtn) {
    const path = window.location.pathname;
    let message = "このページの説明です。"; // デフォルトメッセージ

    if (path.includes("index.html")) {
      message = "ここはスタート画面だよ！";
    } else if (path.includes("index2.html")) {
      message = "小説のモードを選んでね！";
    } else if (path.includes("index3.html")) { // アイデアモードのジャンル選択
      message = "小説のジャンルを選んで、アイデアをもらおう！";
    } else if (path.includes("eraser.html")) { // てなおしモードのジャンル選択
      message = "小説のジャンルを選んで、推敲を手伝ってもらおう！";
    } else if (path.includes("plot.html")) {
      message = "小説のプロットを作成しよう！どんなストーリーにしたい？";
    } else if (path.includes("chat.html")) {
      // chat.htmlの場合はURLパラメータからモードとジャンルを取得
      const urlParams = new URLSearchParams(window.location.search);
      const mode = urlParams.get('mode');
      const genre = urlParams.get('genre');

      if (mode === 'idea') {
        message = `アイデアが欲しい文章やテーマを教えてね！ (ジャンル: ${genre || '未設定'})`;
      } else if (mode === 'eraser') {
        message = `推敲したい文章を入力してね！ (ジャンル: ${genre || '未設定'})`;
      } else {
        message = "チャットでお話しよう！";
      }
    }

    speechText.textContent = message;
    speechElement.style.display = "flex"; // 吹き出しを表示

    closeBtn.addEventListener("click", () => {
      characterContainer.style.display = "none"; // キャラクターごと非表示
    });
  } else {
    // console.warn("キャラまたは吹き出しの要素が見つかりませんでした"); // 存在しないページもあるため警告は不要
  }
});


// ✅ チャット送信関数 (共通)
async function sendMessage() {
  const input = document.getElementById('userInput');
  const text = input?.value.trim();
  if (!text) return;

  const messagesContainer = document.getElementById('messages');

  // ユーザーメッセージを追加
  const userMessage = document.createElement('div');
  userMessage.classList.add('message', 'user');
  userMessage.innerHTML = `
    <div class="bubble">${text}</div>
    <img src="user.png" alt="user">
  `;
  messagesContainer.appendChild(userMessage);
  input.value = ''; // 入力フィールドをクリア

  // スクロールを一番下にする
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  // AI思考中のメッセージを追加
  const thinkingMessage = document.createElement('div');
  thinkingMessage.classList.add('message', 'ai');
  thinkingMessage.innerHTML = `
    <img src="ai.png" alt="ai">
    <div class="bubble">AIが考えています...</div>
  `;
  messagesContainer.appendChild(thinkingMessage);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  // 現在のモードとジャンルを取得
  const path = window.location.pathname;
  let currentMode = '';
  let currentGenre = '';

  if (path.includes("plot.html")) {
    currentMode = 'plot';
  } else if (path.includes("chat.html")) {
    const urlParams = new URLSearchParams(window.location.search);
    currentMode = urlParams.get('mode');
    currentGenre = urlParams.get('genre');
  }

  try {
    // AIの応答をシミュレート
    // 実際のAI連携の場合は、ここに fetch を使ったAPI呼び出しが入ります。
    // 例:
    // const apiKey = ""; // Canvas環境が自動的に提供
    // const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    // const response = await fetch(apiUrl, { ... });
    // const result = await response.json();
    // const aiResponseText = result.candidates[0].content.parts[0].text;
    const aiResponseText = await getSimulatedLLMResponse(text, currentMode, currentGenre);

    // 思考中のメッセージを削除し、AIの実際の応答を追加
    messagesContainer.removeChild(thinkingMessage);

    const aiMessage = document.createElement('div');
    aiMessage.classList.add('message', 'ai');
    aiMessage.innerHTML = `
      <img src="ai.png" alt="ai">
      <div class="bubble">${aiResponseText}</div>
    `;
    messagesContainer.appendChild(aiMessage);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

  } catch (error) {
    console.error("AI応答の取得中にエラーが発生しました:", error);
    // エラーメッセージを表示
    messagesContainer.removeChild(thinkingMessage);
    const errorMessage = document.createElement('div');
    errorMessage.classList.add('message', 'ai');
    errorMessage.innerHTML = `
      <img src="ai.png" alt="ai">
      <div class="bubble">エラーが発生しました。もう一度お試しください。</div>
    `;
    messagesContainer.appendChild(errorMessage);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
}

// AI応答のシミュレーション関数（実際のLLM呼び出しの代わり）
async function getSimulatedLLMResponse(prompt, mode, genre) {
  // 実際のLLM呼び出しの場合、ここにfetch APIなどを使った実際の処理が入ります。
  // 今回はデモンストレーションのため、setTimeoutで遅延をシミュレートし、
  // 渡されたmodeとgenreに基づいて応答を生成します。
  console.log(`Simulating LLM call for: "${prompt}" in mode: ${mode}, genre: ${genre}`);

  return new Promise(resolve => {
    setTimeout(() => {
      let response = "なるほど、それについてもっと詳しく教えていただけますか？"; // デフォルト応答

      if (mode === 'plot') {
        response = `「${prompt}」を元に、以下のようなプロットを提案します。\n\n**導入**: 静かな日常を過ごす主人公が、ある日突然、奇妙な現象に巻き込まれる。\n**展開**: その現象の背後には古の魔法が関わっており、主人公は仲間と出会い、真実を求めて旅に出る。\n**結末**: 幾多の困難を乗り越え、魔法の秘密を解き明かし、世界を救う。しかし、その代償として…\n\nこのプロットについて、さらに詳しく知りたいですか？`;
      } else if (mode === 'idea') {
        switch (genre) {
          case 'love':
            response = `「${prompt}」に関する恋愛小説のアイデアですね。\n\n**アイデア1**: 幼馴染との再会から始まる切ない恋の物語。\n**アイデア2**: タイムスリップした先で運命の人と出会う、甘くも悲しいラブストーリー。\n**アイデア3**: 敵対する組織のメンバー同士が秘密の恋に落ちるスリリングな展開。\n\nどれか気になるアイデアはありますか？`;
            break;
          case 'sf':
            response = `「${prompt}」に関するSF小説のアイデアです。\n\n**アイデア1**: 滅びゆく地球を脱出し、新たな惑星を目指す人類のサバイバル。\n**アイデア2**: AIが感情を持ったとき、人間社会との共存は可能か？を問うサイバーパンク。\n**アイデア3**: 量子力学を利用した時間操作で、歴史の謎を解き明かす冒険。\n\nこれらのアイデアはいかがでしょうか？`;
            break;
          case 'adventure':
            response = `「${prompt}」に関する冒険小説のアイデアです。\n\n**アイデア1**: 伝説の秘宝を求めて、未開のジャングルや古代遺跡を探索する。\n**アイデア2**: 空飛ぶ島々を渡り歩き、幻の生物と出会うファンタジー冒険。\n**アイデア3**: 深海の巨大生物や未知の文明と遭遇する、海底探査の物語。\n\n冒険の舞台はどこに興味がありますか？`;
            break;
          default: // ジャンルが指定されていない場合
            response = `「${prompt}」に関するアイデアですね。例えば、「突然現れた不思議な力」「過去からのメッセージ」といった要素を盛り込むのはどうでしょうか？`;
        }
      } else if (mode === 'eraser') {
        response = `「${prompt}」の部分ですね。この表現をもっと引き立てるために、「${prompt.replace('走る', '疾走する').replace('速い', '目にも留まらぬ速さの')}」のように、類義語やより具体的な描写を加えるのはどうでしょうか？\n\n他に気になる箇所はありますか？`;
      }
      resolve(response);
    }, 1500); // 1.5秒の遅延をシミュレート
  });
}
