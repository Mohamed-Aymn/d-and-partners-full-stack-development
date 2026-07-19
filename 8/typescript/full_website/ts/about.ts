const button = document.querySelector('#toggle-details');
const details = document.querySelector<HTMLElement>('#about-details');

if (button && details) {
  button.addEventListener('click', () => {
    const show = details.hidden;
    details.hidden = !show;
    button.textContent = show ? 'Hide stack details' : 'Show stack details';
  });
}
