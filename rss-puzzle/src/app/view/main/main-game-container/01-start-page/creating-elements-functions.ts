export function createHeading() {
  const h1 = document.createElement('h1');
  h1.className = 'description-heading';
  h1.textContent = 'English Puzzle';
  return h1;
}

export function createDescriptionText() {
  const gameDescription = document.createElement('p');
  gameDescription.className = 'description-text';
  gameDescription.textContent =
    'Click on words, collect phrases. Words can drag and drop. Select tooltips in the menu.';
  return gameDescription;
}

export function createGreeting() {
  const greeting = document.createElement('div');
  greeting.className = 'greeting';
  greeting.textContent = `Hello, ${localStorage.getItem('firstname')} ${localStorage.getItem('surname')}!`;
  return greeting;
}
