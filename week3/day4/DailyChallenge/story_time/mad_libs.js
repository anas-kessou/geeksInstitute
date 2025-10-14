const form = document.getElementById("libform");
const storySpan = document.getElementById("story");
const nounInput = document.getElementById("noun");
const adjectiveInput = document.getElementById("adjective");
const personInput = document.getElementById("person");
const verbInput = document.getElementById("verb");
const placeInput = document.getElementById("place");

const stories = [
  (n, a, p, v, pl) => `${p} found a ${a} ${n} while trying to ${v} in ${pl}.`,
  (n, a, p, v, pl) => `In ${pl}, ${p} saw a ${a} ${n} and decided to ${v} bravely.`,
  (n, a, p, v, pl) => `The ${a} ${n} inspired ${p} to ${v} all the way to ${pl}.`,
  (n, a, p, v, pl) => `${p} ${v} a ${a} ${n} during their trip to ${pl}.`,
  (n, a, p, v, pl) => `Nobody expected that ${p} would ${v} a ${a} ${n} in ${pl}.`
];

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const noun = nounInput.value.trim();
  const adjective = adjectiveInput.value.trim();
  const person = personInput.value.trim();
  const verb = verbInput.value.trim();
  const place = placeInput.value.trim();

  if (!noun || !adjective || !person || !verb || !place) {
    storySpan.textContent = "Please fill in all fields before generating the story!";
    return;
  }

  const randomStory = stories[Math.floor(Math.random() * stories.length)];
  storySpan.textContent = randomStory(noun, adjective, person, verb, place);
});

document.getElementById("shuffle-button").addEventListener("click", function() {
  const noun = nounInput.value.trim();
  const adjective = adjectiveInput.value.trim();
  const person = personInput.value.trim();
  const verb = verbInput.value.trim();
  const place = placeInput.value.trim();

  if (!noun || !adjective || !person || !verb || !place) {
    storySpan.textContent = "Please fill in all fields before shuffling the story!";
    return;
  }

  const randomStory = stories[Math.floor(Math.random() * stories.length)];
  storySpan.textContent = randomStory(noun, adjective, person, verb, place);
});
