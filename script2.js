document.getElementById('ideaBtn').onclick = function() {
  location.href = 'index3.html';
};
document.getElementById('backBtn').onclick = function() {
  location.href = 'index2.html';
};
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
