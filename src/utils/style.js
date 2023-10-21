export const getCssTagDiverRikStatus = (tagType) => {
  return {
    'tag--dark-blue': tagType === 'darkBlue',
    'tag--pale-red': tagType === 'paleRed'
  }
}
export const getCssDropDownDiverRikStatus = (tagType) => {
  return {
    'dropdown--dark-blue': tagType === 'darkBlue',
    'dropdown--pale-red': tagType === 'paleRed'
  }
}
