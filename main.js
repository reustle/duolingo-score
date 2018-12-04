const PROFILE_URL = 'https://www.duolingo.com/2017-06-30/users?username='
const USERNAME = document.location.hash.replace('#','')

function getScore(username, language, callback) {
  // Pull the score for a specific user and language

  // Handle the response
  function handleRes(res) {
    if(!res.users || !res.users.length){ return false }
    
    res = res.users[0]
    
    let langScore = null
    res.courses.forEach( course => {
      if(course.learningLanguage == language) {
        langScore = course.xp
      }
    })
    
    callback({
      streak: res.streak,
      score: langScore,
    })
  }

  // Make the API request
  fetch(PROFILE_URL + username)
    .then(res => res.json())
    .then(json => handleRes(json))

}

// TODO not JA only
getScore(USERNAME, 'ja', res => {
  if(!res){
    console.log('error')
  }
  document.getElementById('streak').innerHTML = res.streak
  document.getElementById('score').innerHTML = res.score.toLocaleString()
})

