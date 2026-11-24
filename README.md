# Who Made That Choice?

An interactive web experience about decision-making under incomplete information and visual emphasis.

## Concept

Each case has two parts:

1. **Part 1** presents incomplete information and subtly highlights one option visually.
2. **Part 2** presents the same options in the same order, removes the visual emphasis, and adds relevant context.

The experience then compares the two choices. It does not claim that users were manipulated or that one answer is correct. Instead, it invites reflection on how available information and interface design can shape attention.

## Cases

- **Learning — The study plan:** Choosing a study approach before and after learning what the exam emphasizes.
- **Everyday life — Saturday afternoon:** Choosing an activity before and after learning about weather, timing, travel, and comfort.
- **Work — The presentation draft:** Choosing a next step before and after learning how a client will use recently updated charts.

## Interaction and State

The project uses radio-button choices and buttons for navigation. JavaScript tracks:

- current case
- current part of the case
- first and second choices
- completed cases
- final reflection response

After a user makes a first choice, the interface moves to Part 2. After the second choice, conditional logic compares both choices and explains what changed in the information and layout.

## Run Locally

Open `index.html` in a browser, or run a static server from this folder:

```bash
python3 -m http.server 4173
```

Then visit `http://localhost:4173`.

## Files

- `index.html` — page structure
- `style.css` — responsive visual design
- `script.js` — cases, state, events, and conditional interaction logic

