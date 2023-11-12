import Axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [deck, setDeck] = useState([]);
  const [dealerCards, setDealerCards] = useState([]);
  const [gamblerCards, setGamblerCards] = useState([]);
  const [winner, setWinner] = useState("");

  const getDeck = async () => {
    let response = await Axios.get(
      "https://www.deckofcardsapi.com/api/deck/new/"
    );
    setDeck(response.data.deck_id);
  };

  const getDealersCards = async () => {
    let response = await Axios.get(
      `https://www.deckofcardsapi.com/api/deck/${deck}/draw/?count=2`
    );
    setDealerCards(response.data);
    console.log(response);
  };

  const getGamblerCards = async () => {
    let response = await Axios.get(
      `https://www.deckofcardsapi.com/api/deck/${deck}/draw/?count=2`
    );
    setGamblerCards(response.data);
    console.log(response);
  };

  const calculateTotal = () => {
    let dealer = dealerCards.cards.map((card) =>
      card.value === "ACE"
        ? 11
        : card.value === "JACK" ||
          card.value === "QUEEN" ||
          card.value === "KING"
        ? 10
        : Number(card.value)
    );

    let gambler = gamblerCards.cards.map((card) =>
      card.value === "ACE"
        ? 11
        : card.value === "JACK" ||
          card.value === "QUEEN" ||
          card.value === "KING"
        ? 10
        : Number(card.value)
    );
    dealer.reduce((a, b) => a + b) > gambler.reduce((a, b) => a + b)
      ? setWinner("Dealer Wins!")
      : setWinner("You Win!");

    console.log(
      "dealer",
      dealer.reduce((a, b) => a + b)
    );
    console.log(
      "gambler",
      gambler.reduce((a, b) => a + b)
    );
  };

  useEffect(() => {
    getDeck();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>BlackJack</h1>
      </header>
      <div className="game-board">
        <div className="dealers-section">
          {dealerCards &&
            dealerCards.cards?.map((card, i) => {
              return (
                <div key={i}>
                  <img src={card.image} alt={card.suit} />
                </div>
              );
            })}
          <button onClick={getDealersCards}>Get Dealer's Card</button>
        </div>
        <div className="result-container">
          {winner && (
            <>
              <h2>{winner}</h2>
            </>
          )}
          <button onClick={calculateTotal}>Find Winner</button>
        </div>
        <div className="gambler-section">
          {gamblerCards &&
            gamblerCards.cards?.map((card, i) => {
              return (
                <div key={i}>
                  <img src={card.image} alt={card.suit} />
                </div>
              );
            })}
          <button onClick={getGamblerCards}>Get Gambler's Card</button>
        </div>
      </div>
    </div>
  );
}

export default App;
