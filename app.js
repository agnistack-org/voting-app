const questionInput = document.getElementById("question-input");
const optionsList = document.getElementById("options-list");
const addOptionBtn = document.getElementById("add-option-btn");
const createPollBtn = document.getElementById("create-poll-btn");
const pollCreator = document.getElementById("poll-creator");
const pollView = document.getElementById("poll-view");
const pollQuestion = document.getElementById("poll-question");
const pollOptions = document.getElementById("poll-options");
const totalVotesEl = document.getElementById("total-votes");
const resetBtn = document.getElementById("reset-btn");

let votes = [];
let hasVoted = false;

addOptionBtn.addEventListener("click", () => {
  const inputs = optionsList.querySelectorAll(".option-input");
  if (inputs.length >= 6) return;
  const input = document.createElement("input");
  input.type = "text";
  input.className = "option-input";
  input.placeholder = `Option ${inputs.length + 1}`;
  input.maxLength = 60;
  optionsList.appendChild(input);
});

createPollBtn.addEventListener("click", () => {
  const question = questionInput.value.trim();
  const options = Array.from(optionsList.querySelectorAll(".option-input"))
    .map((i) => i.value.trim())
    .filter((v) => v.length > 0);

  if (!question || options.length < 2) return;

  votes = options.map(() => 0);
  hasVoted = false;

  pollQuestion.textContent = question;
  pollOptions.innerHTML = "";

  options.forEach((text, i) => {
    const div = document.createElement("div");
    div.className = "poll-option";
    div.innerHTML = `
      <div class="bar"></div>
      <div class="label">
        <span class="text">${escapeHtml(text)}</span>
        <span class="pct">0%</span>
      </div>`;
    div.addEventListener("click", () => castVote(i));
    pollOptions.appendChild(div);
  });

  updateTotalVotes();
  pollCreator.classList.add("hidden");
  pollView.classList.remove("hidden");
});

function castVote(index) {
  if (hasVoted) return;
  hasVoted = true;
  votes[index]++;
  updateResults();
}

function updateResults() {
  const total = votes.reduce((a, b) => a + b, 0);
  const optionEls = pollOptions.querySelectorAll(".poll-option");

  optionEls.forEach((el, i) => {
    const pct = total > 0 ? Math.round((votes[i] / total) * 100) : 0;
    el.classList.add("voted");
    el.querySelector(".bar").style.width = pct + "%";
    el.querySelector(".pct").textContent = pct + "%";
  });

  updateTotalVotes();
}

function updateTotalVotes() {
  const total = votes.reduce((a, b) => a + b, 0);
  totalVotesEl.textContent = total + (total === 1 ? " vote" : " votes");
}

resetBtn.addEventListener("click", () => {
  questionInput.value = "";
  optionsList.innerHTML = `
    <input type="text" class="option-input" placeholder="Option 1" maxlength="60">
    <input type="text" class="option-input" placeholder="Option 2" maxlength="60">`;
  pollView.classList.add("hidden");
  pollCreator.classList.remove("hidden");
});

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}
