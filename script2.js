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
