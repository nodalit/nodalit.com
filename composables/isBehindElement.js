export default (frontElement, backElement) => {
  const frontTop = frontElement.getBoundingClientRect().top
  const frontBottom = frontElement.getBoundingClientRect().bottom
  const backTop = backElement.getBoundingClientRect().top
  const backBottom = backElement.getBoundingClientRect().bottom
  const frontCenter = frontBottom - frontTop
  if (backTop < frontCenter && backBottom > frontCenter) {
    return true
  } else {
    return false
  }
}
