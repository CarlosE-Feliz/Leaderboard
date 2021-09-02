import './styles.css';

const API_URL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/ uA2NlaBPsIQCIutIZBvP/scores';
const myList = document.getElementById('listScr');
const scores = (list, listRes) => {
  const { result } = listRes;
  const scores = [];
  for (let i = 0; i < result.length; i += 1) {
    scores.push([result[i].user, result[i].score]);
  }
  list.innerHTML = '';
  scores.forEach((score) => {
    list.innerHTML += `<li class="list-group-item">${score[0]}: ${score[1]}</li>`;
  });
  if (scores.length > 10) {
    document.getElementById('listScr').classList.add('scroll');
  }
}; const data = async () => {
  await fetch(API_URL, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((result) => scores(myList, result));
};
const posData = async (user, score) => {
  await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify({ user, score }),
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  })
    .then((response) => response.json())
    .then((json) => json);
};
const sendData = async () => {
  const sendScore = document.querySelector('#btton');
  const myForm = document.querySelector('#form');
  const inputName = document.querySelector('#name');
  const inputScore = document.querySelector('#score');
  sendScore.addEventListener('click', (e) => {
    e.preventDefault();
    posData(inputName.value, inputScore.value);
    myForm.reset();
  });
};
const refresh = document.querySelector('#refresh');
refresh.addEventListener('click', () => { data(); });
document.addEventListener('DOMContentLoaded', () => {
  data(); sendData();
});

// fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games', { method: 'POST', body: JSON.stringify({ name: 'My cool new game' }), headers: { 'Content-type': 'application/json; charset=UTF-8' } }).then((response) => response.json()).then((json) => console.log(json));