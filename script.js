const cases = [
  { title: "The study plan", area: "Learning", partOne: "Your final exam is in ten days, and you have time to commit to one structured study approach. You know the deadline and how long each approach will take, but not yet what kind of thinking the exam will emphasize.", context: "The final is mostly built around applying ideas to unfamiliar examples. Your earlier quizzes show that you remember key terms well, but have found application questions more difficult.", contextDirection: "The new information makes a practice-question set a stronger fit because it lets you rehearse applying ideas to unfamiliar examples. The other approaches could still help in different ways.", question: "Which approach would you begin with?", options: ["Start a practice-question set", "Build a concept map", "Attend two review sessions"], highlighted: 1, cue: "In Part 1, the concept-map option had a softer background and stronger border. In Part 2, all three options were presented equally." },
  { title: "Saturday afternoon", area: "Everyday life", partOne: "You and a friend have one free Saturday afternoon. You know the entry cost and travel time for three plans, but not yet which practical conditions will shape the day.", context: "Rain is expected from noon onward. It takes about thirty-five minutes to reach the museum, which closes in forty minutes. Your friend’s knee is sore today. The community workshop is indoors, ten minutes away, and has seating throughout the session.", contextDirection: "The new information adds weather, timing, travel, and comfort considerations. It gives you more conditions to weigh, without deciding the best option for you.", question: "Which plan would you choose?", options: ["Visit the outdoor market", "Book the art museum", "Join a nearby community workshop"], highlighted: 0, cue: "In Part 1, the outdoor-market option had a softer background and stronger border. In Part 2, all three options were presented equally." },
  { title: "The presentation draft", area: "Work", partOne: "Your team needs to send a presentation draft to a client today. You know the deadline and how much time each next step will take, but not yet what the client will use the draft to decide.", context: "The client will use two charts in the draft to make a budget decision. Those charts were updated by outside vendors yesterday and have not yet been checked by the team.", contextDirection: "The new information adds a reason to weigh the source notes carefully: the client’s decision will rely on recently updated charts. It does not decide the order of work for you.", question: "What would you do first?", options: ["Polish the visuals", "Check the source notes", "Ask everyone for final edits"], highlighted: 2, cue: "In Part 1, the final-edits option had a softer background and stronger border. In Part 2, all three options were presented equally." }
];

const app = document.querySelector("#app");
let state;

function resetState() { state = { caseIndex: 0, part: 1, currentAnswers: [], completed: [], reflection: null }; }

function welcome() {
  app.innerHTML = `<section><h1>Who Made That Choice?</h1><div class="card welcome-card"><h2>How it works</h2><p>Each case has two parts. First, make a choice with the information available. Then revisit the same options with more context in a neutral layout.</p><ul class="plain-rules"><li>There are three cases: learning, work, and everyday life.</li><li>There are no right or wrong answers.</li><li>After any completed case, you can reflect or explore another one.</li></ul><div class="button-row"><button class="button" id="start">Start Case 1</button></div></div></section>`;
  document.querySelector("#start").addEventListener("click", renderPart);
}

function renderPart() {
  const item = cases[state.caseIndex], partTwo = state.part === 2;
  const options = item.options.map((label, index) => `<label class="option ${!partTwo && item.highlighted === index ? "salient" : ""}"><input type="radio" name="choice" value="${index}"><span><strong>${label}</strong></span></label>`).join("");
  const copy = partTwo ? `${item.partOne} <span class="added-copy"><strong>Additional context:</strong> ${item.context}</span>` : item.partOne;
  app.innerHTML = `<section><div class="progress"><span>Case ${state.caseIndex + 1} of ${cases.length} · Part ${state.part} of 2</span><span class="progress-dots" aria-label="Case progress">${cases.map((_, index) => `<span class="${index < state.caseIndex ? "done" : index === state.caseIndex ? "now" : ""}"></span>`).join("")}</span></div><p class="eyebrow">${item.area}</p><h2>${item.title}</h2><div class="card"><p class="scenario-copy">${copy}</p><p class="question">${item.question}</p><div class="options ${partTwo ? "neutral-options" : ""}">${options}</div><p class="notice" id="notice"></p><div class="button-row"><button class="button" id="confirm">${partTwo ? "Make My Second Choice" : "Make My First Choice"}</button></div></div></section>`;
  document.querySelector("#confirm").addEventListener("click", saveChoice);
}

function saveChoice() {
  const selected = document.querySelector('input[name="choice"]:checked');
  if (!selected) { document.querySelector("#notice").textContent = "Choose an option whenever you feel ready."; return; }
  state.currentAnswers.push(+selected.value);
  if (state.part === 1) { state.part = 2; renderPart(); } else { revealCase(); }
}

function revealCase() {
  const item = cases[state.caseIndex], [first, second] = state.currentAnswers, changed = first !== second;
  state.completed.push({ title: item.title, first, second, changed });
  const comparison = changed ? "Your second choice was different after the additional context appeared. That does not prove why your view changed; it shows that more context created room to reconsider." : "You made the same choice with more context. That does not mean the visual emphasis had no effect; it shows that your choice remained stable across the two parts.";
  const hasNext = state.caseIndex < cases.length - 1;
  app.innerHTML = `<section><p class="eyebrow">Case ${state.caseIndex + 1} complete</p><h2>Compare your two choices</h2><div class="card"><div class="comparison"><div><span>Part 1</span><strong>${item.options[first]}</strong></div><div><span>Part 2</span><strong>${item.options[second]}</strong></div></div><p class="comparison-note">${comparison}</p><section class="design-reveal"><p class="eyebrow">What did the new information add?</p><p>${item.contextDirection}</p></section><section class="design-reveal"><p class="eyebrow">What changed in the layout?</p><p>${item.cue}</p><p class="fine-print">The highlighted card was designed to guide attention, not to indicate the best answer. In Part 2, it was removed while the options and their order stayed the same.</p></section><div class="button-row"><button class="button secondary" id="reflect">Reflect Now</button>${hasNext ? `<button class="button" id="next-case">Explore Case ${state.caseIndex + 2}</button>` : ""}</div></div></section>`;
  document.querySelector("#reflect").addEventListener("click", finalReflection);
  document.querySelector("#next-case")?.addEventListener("click", () => { state.caseIndex++; state.part = 1; state.currentAnswers = []; renderPart(); });
}

function finalReflection() {
  const summary = state.completed.map((item, index) => `<div class="summary-item"><strong>Case ${index + 1}: ${item.title}</strong><span>${item.changed ? "Your choice changed with additional context." : "Your choice stayed the same with additional context."}</span></div>`).join("");
  app.innerHTML = `<section><p class="eyebrow">Reflection</p><h1>What Did You Notice?</h1><div class="card"><div class="summary-grid">${summary}</div><section class="reflection-choice"><h2>Which feels closest?</h2><div class="response-options">${["I noticed that more context changed how I weighed the options", "I noticed that visual emphasis guided my attention", "My choice stayed mostly the same", "I’m not sure"].map((label, index) => `<label><input type="radio" name="reflection" value="${index}"><span>${label}</span></label>`).join("")}</div></section><p class="fine-print">A choice can be shaped by the information available and by what is easiest to notice. Neither one removes your agency; noticing both gives you more room to choose deliberately.</p><details><summary>Why this matters</summary><p>People often make decisions with limited time and incomplete information. We may stop at an option that seems good enough, or focus on only a few visible cues.</p><p>Recommendation systems also sort, rank, and present options. A useful recommendation should fit the current situation, not only what looks familiar or easy to select.</p></details><div class="button-row"><button class="button" id="restart">Start Again</button></div></div></section>`;
  document.querySelectorAll('input[name="reflection"]').forEach(input => input.addEventListener("change", event => { state.reflection = +event.target.value; }));
  document.querySelector("#restart").addEventListener("click", () => { resetState(); welcome(); });
}

resetState();
welcome();
