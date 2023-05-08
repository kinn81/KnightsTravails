//2d array to store visited positions
let board = [];
//Variable to store the end cell when it's discovered
let finalMove;
//Array of offsets for avaulabe knight moves
let moveOffsetY = [1, 2, 2, 1, -1, -2, -2, -1];
let moveOffsetX = [2, 1, -1, -2, 2, 1, -1, -2];

//Initialise all positions as false/not yet visited
function initBoard() {
  for (let i = 0; i < 8; i++) {
    board[i] = [];
    for (let j = 0; j < 8; j++) {
      board[i][j] = {
        visited: false,
        neighbours: [],
        distance: undefined,
        location: [i, j],
        userView: [j, i],
      };
    }
  }
}

function printBoard() {
  let sBoard = "";
  for (let i = 7; i >= 0; i--) {
    for (let j = 0; j < 8; j++) {
      let v = board[i][j].visited == true ? "T" : "F";
      sBoard += board[i][j].userView + "," + v + "\t";
    }
    sBoard += "\n\n";
  }
  console.log(sBoard);
}
function getNeighbours(currPos) {
  let neighbours = [];
  for (let i = 0; i < 8; i++) {
    let nextX = currPos.location[0] + moveOffsetX[i];
    let nextY = currPos.location[1] + moveOffsetY[i];
    if (nextX < 0 || nextX > 7 || nextY < 0 || nextY > 7) continue; //Skip moves outside the board
    neighbours.push(board[nextX][nextY]);
  }
  return neighbours;
}
function knightMoves(start, end) {
  initBoard();
  console.log(`start = ${start} and end = ${end}`);
  let queue = [];

  //Mark starting position on board
  let startPos = board[start[1]][start[0]];
  startPos.visited = true;
  startPos.distance = 0;

  //Put starting position into the queue
  queue.push(board[start[1]][start[0]]);

  let currPos;
  let prevPos;
  //Loop until queue is empty
  while (queue.length > 0) {
    //  Pop first item off queue
    prevPos = currPos;
    currPos = queue.shift();
    //console.log(`Checking move ${currPos.location}`);

    //  If item is ending position BREAK
    if (currPos.location[0] == end[1] && currPos.location[1] == end[0]) {
      finalMove = currPos;
      console.log(
        `You made it in ${finalMove.distance} moves! Here's your path:`
      );
      break;
    }

    //Determine all neighbouring movs, mark as visited and add to the queue.
    let neighbours = getNeighbours(currPos);
    for (let i = 0; i <= neighbours.length - 1; i++) {
      if (neighbours[i].visited == true) {
        currPos.neighbours.push(neighbours[i]);
        continue;
      }
      neighbours[i].visited = true;
      neighbours[i].distance = currPos.distance + 1;
      currPos.neighbours.push(neighbours[i]);
      queue.push(neighbours[i]);
    }
  }

  //Work out the path of moves between start and end
  let path = [];
  path.push(finalMove);
  let nextMv = finalMove;

  //Get final move neighbours
  nextMv.neighbours = getNeighbours(nextMv);

  //Loop over each neighbour moving closer to origin until located.
  while (true) {
    if (nextMv.distance == 0) break;
    for (let i = 0; i <= nextMv.neighbours.length - 1; i++) {
      if (nextMv.neighbours[i].distance < nextMv.distance) {
        nextMv = nextMv.neighbours[i];
        path.push(nextMv);
        break;
      }
    }
  }

  for (let i = path.length - 1; i >= 0; i--) {
    console.log(path[i].userView);
  }
}

knightMoves([0, 7], [7, 0]);
