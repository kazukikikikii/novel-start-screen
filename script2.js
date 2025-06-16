document.getElementById('ideaBtn').onclick = function() {
  location.href = 'index3.html';
};



document.getElementById('eraserBtn').onclick = function() {
  location.href = 'eraser.html';
};


document.getElementById('blockBtn').onclick = function() {
  location.href = 'plot.html';
};

document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menuButton');
  const menuNav = document.getElementById('menuNav');

  if (menuBtn && menuNav) {
    menuBtn.addEventListener('click', () => {
      menuNav.classList.toggle('open');
    });
  }
});


const character = document.getElementById('character');
const speech = document.getElementById('speech');
const messages = ["ようこそ！", "一緒に小説を作ろう！", "たのしんでね！"];
let msgIndex = 0;
character.addEventListener('click', () => {
  speech.innerText = messages[msgIndex];
  speech.style.display = "block";
  msgIndex = (msgIndex + 1) % messages.length;
  setTimeout(() => {
    speech.style.display = "none";
  }, 2000);
});



document.addEventListener("DOMContentLoaded", () => {
  const back = document.querySelector(".back-icon");
  if (back) {
    back.addEventListener("click", () => {
      history.back();
    });
  }
});



function sendMessage() {
  const input = document.getElementById('userInput');
  const text = input.value.trim();
  if (text === '') return;
  const messages = document.getElementById('messages');
  // ユーザーメッセージ
  const userMessage = document.createElement('div');
  userMessage.classList.add('message', 'user');
  userMessage.innerHTML = `
    <div class="bubble">${text}</div>
    <img src="user.png" alt="user">
  `;
  messages.appendChild(userMessage);

  input.value = '';

  // AIメッセージ（例）
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



document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menuButton');
  const menuNav = document.getElementById('menuNav');

 if (menuBtn && menuNav) {
    menuBtn.addEventListener('click', () => {
      menuNav.classList.toggle('open');
    });
  } else {
    console.error('menuButton または menuNav が見つかりません。');
  }
});


