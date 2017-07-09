document.addEventListener('DOMContentLoaded', init)

function init () {
  // add event listeners to all ingredients
  buttons.forEach(function (el) {
    el.addEventListener('click', addIngredient)
  })

  // click to start timer
  startGameButton.addEventListener('click', startGame)

  serveButton.addEventListener('click', serve)

  restart.addEventListener('click', function () {
    window.location.reload()
  })

  // starts countdown, calls generateList() to make first level
  function startGame () {
    if (!gameStarted) { // ensure setInterval only fires once
      setInterval(countdown, 1000)
      generateList() // start game generates first order, subsequent order generated by serve
      setTimeout(gameOver, 90000) // cause endGameOverlay DOM
    }
    gameStarted = true
    removeStartScreen() //remove instructions
    createBoard() //create title and bottom burger in playArea
  }

function removeStartScreen() {
  startGameOverlay.innerHTML = ''
}

function createBoard () {
  var title = document.createElement('h1')
  title.innerText = 'BUILD - A - BURGER'
  playArea.appendChild(title)
  var anchor = document.createElement('div')
  anchor.className = 'ingredients'
  anchor.id = 'bottombun'
  playArea.appendChild(anchor)
}

  // DOM of orderList to match array of ingredients created with newOrder()
  function generateList () {
    var orderList = newOrder()
    orderList.forEach(function (el) {
      var newListItem = document.createElement('h3')
      if (el !== 'topbun') {
        newListItem.innerText = el
      } else newListItem.innerText = 'top bun'
      order.appendChild(newListItem)
    })
  }

  // changes timeLeft and updates timer text accordingly
  function countdown () {
    timeLeft--
    if (timeLeft >= 0) {
      time.innerText = timeLeft + ' secs'
    }
  }

  // using checkForMatch() to check if click targets right ingredient
  // updates orderList for the current ingredient (strikethrough)
  // updates playArea with the added ingredient
  function addIngredient () {
    if (gameStarted && !isGameOver) {
     // whichIngredient takes out the classnames 'cheese', 'patty' etc.
      whichIngredient = this.className.substring(5).toLowerCase()
      if (checkForMatch()) {
        // add strikethrough to list item
        var h3 = document.querySelectorAll('h3')
        h3[ingredientCounter].style.textDecoration = 'line-through'
        var newIngredient = document.createElement('div')
       // give the new element classname ingredients, which sets core css
        newIngredient.className = 'ingredients'
       // id sets background-image url and negative margins
        newIngredient.id = whichIngredient
        newIngredient.style.bottom = (60 + ingredientCounter * 20) + 'px'
        ingredientCounter++ // counts num of added ingredients so far
        // increasing z-index for overlapping look
        newIngredient.style.zIndex = ingredientCounter
        playArea.prepend(newIngredient)
      }
    }
  }

  // serve button clears playArea, clears list, increases score
  // generates new level, reset ingredientcounter to 0.
  function serve () {
    if (gameStarted && !isGameOver && ingredientCounter === level + 5) { // 4 + 1 to account for bottombun
      clearPlayArea()
      clearList()
      increaseScore()
      generateList()
      ingredientCounter = 0
      // reset current count to zero since ingredients have been cleared off playArea
    }
  }

  // empties playArea of ingredients
  function clearPlayArea () {
    // queryselect only after the divs have been added. else it only consists of bottombun
    ingredients = document.querySelectorAll('.ingredients')
    ingredients.forEach(function (el) {
      if (el.id !== 'bottombun') { // remove everything leaving bottom div
        el.parentNode.removeChild(el)
      }
    })
  }

  // empties the orderList of text
  function clearList () {
    order.innerHTML = ''
    neededIngredients = [] // reset the array for clicks to compare against
  }

  // changes text in scorebox
  // increase level by 1
  function increaseScore () {
    score.innerText = level
    level++
  }

  // expand originally collapsed overlay
  function gameOver () {
    isGameOver = true
    playArea.innerHTML = ''
    endGameScore.innerText = score.innerText
    endGameScore.style.fontSize = '300px'
    endGameScore.style.marginTop = '100px'
    endGameOverlay.style.visibility = 'visible'
  }

} // close init
