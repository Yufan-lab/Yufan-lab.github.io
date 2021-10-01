// players
enum Player {
    X = 'x',
    O = 'o',
  }
   
  // win numbers
  let winsArr = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], 
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], 
    [0, 4, 8],
    [2, 4, 6], 
  ]
 
  let cells = document.querySelectorAll('.cell')
  
  let gameBord = document.querySelector('#bord')
  
  let message = document.querySelector('#message') as HTMLDivElement

  let winner = document.querySelector('#winner') as HTMLParagraphElement
  
  let restart = document.querySelector('#restart') as HTMLButtonElement
 
  let currentPlayer: Player
  
  let steps: number
   
  restart.addEventListener('click', startGame)
   

  startGame()
   
  function startGame() {
  
    message.style.display = 'none'
  
    steps = 0
   
    currentPlayer = Player.X
   
    gameBord.classList.remove(Player.X, Player.O)
    gameBord.classList.add(Player.X)
   
    cells.forEach(function (item) {
      let cell = item as HTMLDivElement
   
      cell.classList.remove(Player.X, Player.O)
    
      cell.removeEventListener('click', clickCell)
     
      cell.addEventListener('click', clickCell, { once: true })
    })
  }
   

   
 
  function clickCell(event: MouseEvent) {
    let target = event.target as HTMLDivElement
    target.classList.add(currentPlayer)
  
    steps++
   
    
    let isWin = checkWin(currentPlayer)
    if (isWin) {
      message.style.display = 'block'
      winner.innerText = currentPlayer + ' 赢了！'
     
      return
    }
   
    
    if (steps === 9) {
      message.style.display = 'block'
      winner.innerText = '平局~'
      return
    }
   
    
    currentPlayer = currentPlayer === Player.X ? Player.O : Player.X
    
    gameBord.classList.remove(Player.X, Player.O)
    gameBord.classList.add(currentPlayer)
  }
   
  
  function checkWin(player: Player) {
   
    return winsArr.some(function (item) {
      
      let cellIndex1 = item[0]
      let cellIndex2 = item[1]
      let cellIndex3 = item[2]
   
      
      if (
     
        hasClass(cells[cellIndex1], player) &&
        hasClass(cells[cellIndex2], player) &&
        hasClass(cells[cellIndex3], player)
      ) {
        
        return true
      }
  
      return false
    })
  }
   
  
  function hasClass(el: Element, name: string) {
    
    return el.classList.contains(name)
  }