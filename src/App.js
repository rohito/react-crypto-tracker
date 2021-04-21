import axios from 'axios';
import './App.css';
import {useState,useEffect} from 'react';
import Coin from './Coin'; 

// for later project
// https://api.coingecko.com/api/v3/coins/markets?vs_currency=gbp&ids=mandala-exchange-token%2Cethereum%2Cchainlink%2Cbitcoin&order=market_cap_desc&per_page=100&page=1&sparkline=false

function App() {
  const [coins,setCoins] = useState([]);
  const [search,setSearch] = useState('');

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=gbp&ids=mandala-exchange-token%2Cbitcoin%2Cethereum%2Cchainlink&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .then(res=>{
      setCoins(res.data)
    }).catch(err=> console.log(err))
    
  }, [])

  const handleChange = e =>{
    setSearch(e.target.value)
  }

  const filteredCoins = coins.filter(coin=>
      coin.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search a currency</h1>
        <form>
          <input type="text" placeholder="Search" className="coin-input" onChange={handleChange}></input>
        </form>
      </div>
      
        {filteredCoins.map(coin=>{
          return(
            <Coin key={coin.id} name={coin.name} price={coin.current_price}
             image={coin.image} symbol={coin.symbol} volume={coin.total_volume} priceChange={coin.price_change_percentage_24h}
             marketcap={coin.market_cap}/>
          )
        })}
      
    </div>
  );
}

export default App;
