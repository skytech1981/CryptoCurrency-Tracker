import react, {useEffect,useState} from 'react';
import './App.css';
import axios from 'axios';
import Coin from './Coin';
import cryptwire from './cryptwire.png';



function App() {
const [coins,setCoins] = useState([]);
const [search,setSearch] = useState('');


  useEffect(() => {
    axios
    .get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .then(res => {
      setCoins(res.data);
    })
      .catch(error => alert('error'));
        
      },[]);
      
const handleChange = (e) => {
setSearch(e.target.value);
}
 
const filterdCoins = coins.filter(coin => 
  coin.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    )
  return (
    <div className="Coin-app">
      <img classname="logo" src={cryptwire} alt="png"/>
              <div className="coin-search">
                <h1 className="coins-text">SlayerTech Crypto Coin Tracker</h1>
                <form>
                  <input type="text" placeholder="Search" 
                  className="coin-input" onChange={handleChange}/>
                </form>
             </div>
              {filterdCoins.map(coin => {
                  return (
                      <Coin key={coin.id} 
                      name={coin.name} 
                      image={coin.image}
                      symbol={coin.symbol}
                      marketCap={coin.market_cap}
                      price={coin.current_price}
                      priceChange={coin.price_change_percentage_24h} 
                      volume={coin.total_volume}
                      />

                  )

              })}
          </div>
  );
}

export default App;
