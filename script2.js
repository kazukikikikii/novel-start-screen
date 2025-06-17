// ✅ チャット送信関数（DOM外でもOK）
function sendMessage() {
  const input = document.getElementById('userInput');
  const text = input?.value.trim();
  if (!text) return;

  const messagesContainer = document.getElementById('messages');
  const userMessage = document.createElement('div');
  userMessage.classList.add('message', 'user');
  userMessage.innerHTML = `
    <div class="bubble">${text}</div>
    <img src="user.png" alt="user">
  `;
  messagesContainer.appendChild(userMessage);
  input.value = '';

  // スクロールを一番下にする
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  // AIの応答をシミュレート (実際のAI連携はバックエンドが必要)
  setTimeout(() => {
    let aiResponse = "";
    const path = window.location.pathname;

    if (path.includes("plot.html")) {
      aiResponse = "良いプロットですね！続きのアイデアを提案します。「主人公が突然異世界に転移し、そこで出会った仲間と共に強大な敵に立ち向かう」というのはどうでしょうか？";
    } else if (path.includes("chat.html")) { // アイデアモードとてなおしモードで共通のチャットページを想定
      const titleElement = document.querySelector('.top-bar .title');
      const modeTitle = titleElement ? titleElement.textContent : '';

      if (modeTitle.includes("アイデアモード")) {
        aiResponse = `「${text}」について、いくつかのアイデアを提案しますね。例えば、「過去に戻って未来を変える」「魔法の世界で冒険する」といったテーマはいかがですか？`;
      } else if (modeTitle.includes("てなおしモード")) {
        aiResponse = `「${text}」の部分ですね。より具体的に表現するために、「薄暗い森を駆ける」を「月明かりが差し込む、湿った土の香りがする森を、息を切らして駆け抜ける」のように書き換えるのはどうでしょうか？`;
      } else {
        aiResponse = "なるほど！何かお手伝いできることはありますか？";
      }
    } else {
      aiResponse = "何かご質問ですか？";
    }

    const aiMessage = document.createElement('div');
    aiMessage.classList.add('message', 'ai');
    aiMessage.innerHTML = `
      <img src="ai.png" alt="ai">
      <div class="bubble">${aiResponse}</div>
    `;
    messagesContainer.appendChild(aiMessage);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }, 1000);
}

// 既存のDOMContentLoadedイベントリスナーにチャット関連の初期化を追加
document.addEventListener('DOMContentLoaded', () => {
  // メニューバー展開処理
  const menuBtn = document.getElementById('menuButton');
  const menuNav = document.getElementById('menuNav');
  if (menuBtn && menuNav) {
    menuBtn.addEventListener('click', () => {
      menuNav.classList.toggle('open');
    });
  } else {
    console.warn('menuButton または menuNav が見つかりません。');
  }

  // 戻るボタン処理
  const back = document.querySelector(".back-icon");
  if (back) {
    back.addEventListener("click", () => {
      history.back();
    });
  }

  // キャラクタークリックでセリフ表示 (既存のコード)
  const character = document.getElementById('character');
  const speech = document.getElementById('speech');
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

  // モード選択の画面遷移処理（要素がある場合のみ）
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
    writeBtn.onclick = () => alert('小説を書く機能はまだ準備中です！'); // 仮の処理
  }


  // キャラクターと吹き出しの初期表示 (既存のコード)
  const container = document.getElementById('characterContainer');
  const speechElement = document.getElementById('speech'); // 変数名が被らないように変更
  const speechText = document.getElementById('speechText');
  const closeBtn = document.getElementById('closeSpeech');

  if (container && speechElement && speechText && closeBtn) {
    const path = window.location.pathname;
    let message = "このページの説明です。";

    if (path.includes("index.html")) {
      message = "ここはスタート画面です！";
    } else if (path.includes("index2.html")) {
      message = "モードを選んでね！";
    } else if (path.includes("plot.html")) {
      message = "プロットを作ってみよう！";
    } else if (path.includes("index3.html")) { // アイデアモードのページ
      message = "小説のジャンルを選んでね！";
    } else if (path.includes("eraser.html")) { // てなおしモードのページ
      message = "小説のジャンルを選んでね！";
    } else if (path.includes("chat.html")) { // 新しいchat.html
      const titleElement = document.querySelector('.top-bar .title');
      if (titleElement && titleElement.textContent.includes("アイデアモード")) {
        message = "アイデアが欲しい文章やテーマを教えてね！";
      } else if (titleElement && titleElement.textContent.includes("てなおしモード")) {
        message = "推敲したい文章を入力してね！";
      } else {
        message = "チャットでお話しよう！";
      }
    }


    speechText.textContent = message;
    speechElement.style.display = "flex";

    closeBtn.addEventListener("click", () => {
      container.style.display = "none";
    });
  } else {
    console.warn("キャラまたは吹き出しの要素が見つかりませんでした");
  }
});
