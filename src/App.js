import Swap from './components/swap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <br/>
      <br/>
      <div style={{width:'100%'}} class="row">
        
        <div style={{color:'white', margin:'5% 10%'}} class="col">
          <h1>Swap Algo Pre-Alpha</h1>
          <br/>
          <div style={{width: '350px'}}>
            <p>This is swap algo a effortless way to swap BNB or Ether to and from ALGO. This app is still in early Development</p>
            <p>To use this app you must first download metamask flask which can be found here</p>
            <a href="https://metamask.io/flask/">https://metamask.io/flask/</a>
            <p>you can access your algorand wallet at</p>
            <a href="https://snapalgowallet.netlify.app/">https://snapalgowallet.netlify.app/</a>
            <p>this will hopefully work with metamask some time in 2023</p>
          </div>
        </div>
        <div class="col">
          <Swap/>
        </div>
      </div>
    </div>
  );
}

export default App;
