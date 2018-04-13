

module.exports = parseDate

// e.g.: "1523549984813"
function parseDate(str) {

  if (!str) {
    return ''
  }
  let dateInt =  parseInt(str)
  let date = new Date(dateInt)
  var options = {   
      day: 'numeric',
      month: 'short', 
      year: 'numeric'
  }
  return date.toLocaleDateString('en-ZA', options)

}