import { useEffect, useState } from 'react';
import Col from './Components/Col';
import './Sass/All.scss'
import Logo from './Assets/logo.png'
import Hand from './Components/Hand';
import FinalCol from './Components/FinalCol';
import UseDebounce from './Utils/UseDebounce'
import FireWorks from './Components/FireWorks';


function App() {
  let deck = [
    '1-1', '2-1', '3-1', '4-1', '5-1', '6-1', '7-1', '8-1', '9-1', '10-1', '11-1', '12-1', '13-1',
    '1-2', '2-2', '3-2', '4-2', '5-2', '6-2', '7-2', '8-2', '9-2', '10-2', '11-2', '12-2', '13-2',
    '1-3', '2-3', '3-3', '4-3', '5-3', '6-3', '7-3', '8-3', '9-3', '10-3', '11-3', '12-3', '13-3',
    '1-4', '2-4', '3-4', '4-4', '5-4', '6-4', '7-4', '8-4', '9-4', '10-4', '11-4', '12-4', '13-4'
  ]
  const [closed, setClosed] = useState({});

  const [opened, setOpened] = useState({});

  const [hand, setHand] = useState([]);

  const [final, setFinal] = useState({});

  const [win, setWin] = useState(false);

  //winning surprise
  useEffect(() => {
    if (final['1']) {
      var count = final['1'].length + final['2'].length + final['3'].length + final['4'].length;
      if (count === 52)
        setWin(true)
    }
  }, [final])

  //use localstorage if possible / shuffle
  useEffect(() => {
    if (localStorage.solitaire) {
      const savedData = JSON.parse(localStorage.solitaire);
      setClosed(savedData.closed)
      setOpened(savedData.opened)
      setHand(savedData.hand)
      setFinal(savedData.final)
    }
    else if (hand.length === 0 && opened === {}) {
      shuffleFunc()
    }
    else {
      shuffleFunc()
    }
  }, [])

  //set localstorage
  function changeLocalStorage() {
    let newLocalStor = { 'closed': closed, 'opened': opened, 'hand': hand, 'final': final };
    localStorage.setItem('solitaire', JSON.stringify(newLocalStor));
  }

  const debounceChange = UseDebounce(changeLocalStorage, 1000)

  useEffect(() => {
    debounceChange()
  }, [closed, opened, hand, final])

  //shuffle
  function shuffleFunc() {
    var currentIndex = deck.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = deck[currentIndex];
      deck[currentIndex] = deck[randomIndex];
      deck[randomIndex] = temporaryValue;
    }
    setClosed({
      '1': deck.slice(0, 6),
      '2': deck.slice(7, 12),
      '3': deck.slice(13, 17),
      '4': deck.slice(18, 21),
      '5': deck.slice(22, 24),
      '6': deck.slice(25, 26),
    })
    setOpened({
      '1': deck.slice(6, 7),
      '2': deck.slice(12, 13),
      '3': deck.slice(17, 18),
      '4': deck.slice(21, 22),
      '5': deck.slice(24, 25),
      '6': deck.slice(26, 27),
      '7': deck.slice(27, 28)

    }
    )
    setHand(deck.slice(28, 52));
    setFinal({
      '1': [],
      '2': [],
      '3': [],
      '4': [],
    })
    setWin(false)
  }
  const [cardMove, setCardMove] = useState('')
  const [colDrop, setColDrop] = useState('')

  function handleColMove({ card, col }) {
    if (card) {
      setCardMove(card)
    }
    if (col) {
      setColDrop(col)
    }
  }

  //column change
  useEffect(() => {
    const finalcol = colDrop.substring(4, 5);
    if (opened[finalcol] && cardMove !== colDrop && colDrop.length > 0) {
      const initCol = cardMove.substring(4, 5)
      const lastItem = opened[finalcol][opened[finalcol].length - 1];
      const differentFigure =
        (parseInt(lastItem.split('-')[1]) % 2 === 0 && !(parseInt(cardMove.split('-')[3]) % 2 === 0))
        ||
        (!(parseInt(lastItem.split('-')[1]) % 2 === 0) && parseInt(cardMove.split('-')[3]) % 2 === 0)
        || (parseInt(lastItem.split('-')[1]) === 0);

      const cardSequence = parseInt(lastItem.split('-')[0]) - 1 === parseInt(cardMove.split('-')[2]);

      if ((differentFigure && cardSequence)) {
        let losingCol = [];
        const indexOfCard = cardMove.indexOf('hand') > -1 ? (hand).indexOf(cardMove.split('card-')[1]) : (opened[initCol]).indexOf(cardMove.split('card-')[1]);
        let gainingCol = [...opened[finalcol]];
        let col = cardMove.indexOf('hand') > -1 ? hand : opened[initCol];
        col.forEach((item, index) => {
          if (index < indexOfCard && col === opened[initCol]) {
            losingCol.push(item)
          }
          else if (index !== indexOfCard && col === hand) {
            losingCol.push(item)
          }
          else {
            gainingCol = [...gainingCol, item]
          }
        })
        if (col === opened[initCol]) {
          setOpened({ ...opened, [initCol]: losingCol, [finalcol]: gainingCol })
        }
        else if (col === hand) {
          setOpened({ ...opened, [finalcol]: gainingCol })
          setHand(losingCol)
        }

      }

      setCardMove('')
      setColDrop('')
    }

  }, [cardMove, colDrop])

  //open card refill (closed to opened)
  useEffect(() => {
    Object.keys(opened).forEach((item, index) => {
      if (item < 7 && opened[item].length === 0 && closed[item].length > 0) {
        const newClosed = closed[item].filter((itm, index) => index !== closed[item].length - 1);
        const newOpened = closed[item].filter((itm, index) => index === closed[item].length - 1);
        setClosed({ ...closed, [item]: newClosed })
        setOpened({ ...opened, [item]: newOpened })
      }
      if (opened[item].length === 0 && (closed[item] === undefined || closed[item].length === 0)) {
        setOpened({ ...opened, [item]: [`14-0`] })
      }
    })
  }, [opened, closed])

  //final cols
  function handleSetFinal(card, col, fnl) {
    if (col !== 'hand' && opened[col][opened[col].length - 1] !== card) {
      return
    }
    if (final[fnl].length + 1 === parseInt(card.split('-')[0])) {
      if (col !== 'hand') {
        const newOpened = opened[col].filter(item => item !== card);
        setOpened({ ...opened, [col]: newOpened })
      }
      else {
        const newHand = hand.filter(item => item !== card);
        setHand(newHand)
      }
      const newFinal = final[fnl];
      newFinal.push(card)

      setFinal({ ...final, [fnl]: newFinal })
    }
  }

  return (
    <div className="App" >
      <div className='center'>
        <img className='logo' src={Logo}></img>
        <button onClick={() => shuffleFunc()}>Shuffle | Start</button>
      </div>
      <header>
        <Hand hand={hand} handleHandMove={handleColMove} final={final} setFinal={handleSetFinal} />

        <div className='center'>
          <img className='logo' src={Logo}></img>
          <button onClick={() => shuffleFunc()}>Shuffle | Start</button>
        </div>
        <div className='finalcols'>
          {Object.keys(final).map((item, index) => <FinalCol key={item} final={final[index + 1]} />)}
        </div>
      </header>
      <div className='gameContainer' >
        {Object.keys(opened).map((item, index) => {
          return (
            <Col key={item} id={item} opened={opened[item]} handleColMove={handleColMove} closed={closed[item]} final={final} setFinal={handleSetFinal}></Col>
          )
        })}
      </div>
      {win &&
        <FireWorks />}
    </div >
  );
}

export default App;
