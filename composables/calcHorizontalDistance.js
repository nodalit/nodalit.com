// recieves an element and a int referring to a horizontal position on the screen
// for example 80 refers to 80% down from the window inner top.
// returns the position of the element top relative to the horizontal position
export default (scrollStart, containerTop) => {
  const currentScrollPosition = window.scrollY
  const scrollStartPosition = window.innerHeight * (scrollStart / 100)
  // hvor langt er punktet scrollStartPosition ift. this.containerTop
  return currentScrollPosition - containerTop + scrollStartPosition
}
