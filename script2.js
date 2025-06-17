document.addEventListener('DOMContentLoaded', () => {
  // ✅ メニューバー展開処理
  const menuBtn = document.getElementById('menuButton');
  const menuNav = document.getElementById('menuNav');
  if (menuBtn && menuNav) {
    menuBtn.addEventListener('click', () => {
      menuNav.classList.toggle('open');
    });
  } else {
    console.error('menuButton または menuNav が見つかりません。');
  }

  // ✅ 戻るボタン処理
  const back = document.querySelector(".back-icon");
  if (back) {
    back.addEventListener("click", () => {
      history.back();
    });
  }

  // ✅ キャラクタークリックでセリフ表示
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


document.addEventListener('DOMContentLoaded', () => {
  const characterContainer = document.getElementById('characterContainer');
  const speechText = document.getElementById('speechText');
  const closeSpeech = document.getElementById('closeSpeech');

  if (characterContainer && speechText && closeSpeech) {
    // ページ名またはURLパスから判定
    const path = window.location.pathname;
    let message = "この画面の説明です。";

    if (path.includes("index.html")) {
      message = "ここはスタート画面だよ！";
    } else if (path.includes("index2.html")) {
      message = "モードをえらんで小説を始めよう！";
    } else if (path.includes("index3.html")) {
      message = "アイデアをふくらませる画面だよ！";
    } else if (path.includes("eraser.html")) {
      message = "てなおしモードで文章をきれいにしよう！";
    } else if (path.includes("plot.html")) {
      message = "プロットを作成する画面だよ！";
    } else if (path.includes("chat.html")) {
      message = "チャットで小説の相談ができるよ！";
    }

    speechText.textContent = message;
    characterContainer.style.display = 'block';

    closeSpeech.addEventListener('click', () => {
      characterContainer.style.display = 'none';
    });
  }
});


  
  // ✅ モード選択の画面遷移処理（要素がある場合のみ）
  const ideaBtn = document.getElementById('ideaBtn');
  const eraserBtn = document.getElementById('eraserBtn');
  const blockBtn = document.getElementById('blockBtn');

  if (ideaBtn) {
    ideaBtn.onclick = () => location.href = 'index3.html';
  }

  if (eraserBtn) {
    eraserBtn.onclick = () => location.href = 'eraser.html';
  }

  if (blockBtn) {
    blockBtn.onclick = () => location.href = 'plot.html';
  }
});

// ✅ チャット送信関数（DOM外でもOK）
function sendMessage() {
  const input = document.getElementById('userInput');
  const text = input?.value.trim();
  if (!text) return;

  const messages = document.getElementById('messages');
  const userMessage = document.createElement('div');
  userMessage.classList.add('message', 'user');
  userMessage.innerHTML = `
    <div class="bubble">${text}</div>
    <img src="user.png" alt="user">
  `;
  messages.appendChild(userMessage);
  input.value = '';

  setTimeout(() => {
    const aiMessage = document.createElement('div');
    aiMessage.classList.add('message', 'ai');
    aiMessage.innerHTML = `
      <img src="ai.png" alt="ai">
      <div class="bubble">「駆ける」とか「疾走する」って言葉が合うかも！</div>
    `;
    messages.appendChild(aiMessage);
    messages.scrollTop = messages.scrollHeight;
  }, 1000);
}
