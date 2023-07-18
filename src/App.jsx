/* eslint-disable react/prop-types */
import { useState } from 'react'
import './App.css'


const Square = ({value ,onSquareClick}) =>{

 
return(
  <button className='square w-10 h-10 border-2 border-black  font-extrabold tex-md 'onClick={onSquareClick}>{value}</button>
)

}





 function Board( {xIsNext,squares,onPlay}) {
 const handleClick = (i) =>{
  if(squares[i] || calculateWinner(squares)) return
  
 const nextSquare = squares.slice()

//  if(xIsNext){
//    nextSquare[i]='X'
//   }else{
//    nextSquare[i]='O'
  
//  }

nextSquare[i]=xIsNext ? 'X':'O'



onPlay(nextSquare)
 }

 const winner = calculateWinner(squares)
let status = '';
if(winner){
  status = "Winner :" + winner
}else{
  status ='Next Player :' + (xIsNext ? 'X':'O')
}

  return (
    <>
    <div className="status mb-10 flex text-lg font-semibold">{status}</div>
    <div className="board flex flex-wrap w-32 ">

      <Square value={squares[0]} onSquareClick={ ()=>handleClick(0)} />
      <Square  value={squares[1]}  onSquareClick={ ()=>handleClick(1)}/>
      <Square value={squares[2]} onSquareClick={ ()=>handleClick(2)}/>
      <Square value={squares[3]} onSquareClick={ ()=>handleClick(3)}/>
      <Square value={squares[4]} onSquareClick={ ()=>handleClick(4)}/>
      <Square value={squares[5]} onSquareClick={ ()=>handleClick(5)}/>
      <Square value={squares[6]} onSquareClick={ ()=>handleClick(6)}/>
      <Square value={squares[7]} onSquareClick={ ()=>handleClick(7)}/>
      <Square value={squares[8]} onSquareClick={ ()=>handleClick(8)}/>
    </div>
      
    </>
  )
}

export default function Game (){

  const [history,setHistory]=useState([Array(9).fill(null)])
  const [cureentMove,setCurrentMove]=useState(0)
  const currentSquares =history[cureentMove]
  const xIsNext = cureentMove % 2 === 0;

  function jumpTO(nextMove){
    setCurrentMove(nextMove)


  }

  function handlePlay(nextSquare){
    const nextHistory=[...history.slice(0,cureentMove+1),nextSquare]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length -1)
  
  }

  
 

  const moves=history.map((squares,move)=>{
    let description=''
    if(move>0){
      description= 'Go to move #' + move
    }else{
      description='Go to game start'
    }

    return (
      <li key={move}>
        <button onClick={()=>jumpTO(move)} className='px-4  py-2 bg-slate-400 mt-2 rounded-md font-semibold'>{description}</button>
      </li>
    )
  })

  return(
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
        <div className="game-info mt-4 flex ">
          <ol>
            {moves}
            </ol>
        </div>
      </div>
    </div>
  )
}


function calculateWinner (squares){
  const lines =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];

  for(let i = 0 ;i<lines.length;i++){
    const[a,b,c]=lines[i];

    if(squares [a] && squares[a] === squares[b] && squares[c] ){
      return squares[a]
    }
  }

  return false
}
