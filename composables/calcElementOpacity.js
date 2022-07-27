export default (currentScroll, fadePoints, unit) => {
  if (currentScroll <= fadePoints.start) {
    return 0
  }
  if (currentScroll >= fadePoints.end) {
    return 1
  }
  const relCurrentScroll = currentScroll - fadePoints.start
  return (relCurrentScroll / unit)
}
