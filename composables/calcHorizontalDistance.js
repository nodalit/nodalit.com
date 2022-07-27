// recieves an element and a int referring to a horizontal position on the screen
// for example 80 refers to 80% down from the window inner top.
// returns the position of the element top relative to the horizontal position
export default (fadeInStart, containerEl) => {
  const containerTop = containerEl.getBoundingClientRect().top
  const fadeInStartY = window.innerHeight * (fadeInStart / 100)
  // the distance between fadeInStartY and containerTop in the viewport
  return fadeInStartY - containerTop
}
