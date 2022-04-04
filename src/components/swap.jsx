import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Select from 'react-select';
import swapSideIcon from '../imgs/swapSide.png';
import downArrow from '../imgs/downArrow.png';
import logo from '../imgs/swapAlgoLogo.png';
import algoLogo from '../imgs/algoLogo.png';
import ethLogo from '../imgs/ethLogo.png';
import bnbLogo from '../imgs/bnbLogo.png';
import '../bggradient.css';

export default function Swap() {


    const options = [
        { value: 'ALGO', label: <div><img src={algoLogo} height="30px" style={{paddingRight: '5px'}} alt=''/>ALGO </div> },
        { value: 'ETH', label: <div><img src={ethLogo} height="30px" style={{paddingRight: '5px'}} alt=''/>ETH </div> },
        { value: 'BNB', label: <div><img src={bnbLogo} height="30px" style={{paddingRight: '5px'}} alt=''/>BNB </div> }
    ];

    const [error, setError] = useState('');
    const [fromValue, setFrom] = useState(options[0]);
    const [toValue, setTo] = useState(options[1]);
    const [hoverSwap, setHoverSwap] = useState(false);
    const [outputAmount, setOutputAmount] = useState(0);

    const connect = () => {
        document.getElementById('connectButton').style.display = "none";
        document.getElementById('swapScreen').style.visibility = "visible";
        document.getElementById('screenBg').style.border = "#C6C6C6 1px solid";
        document.getElementById('screenBg').style.animation = "none";
        document.getElementById('logo').style.filter = "invert(0)";
    }

    const handleFromChange = (selectedOption) => {
        setFrom(selectedOption);
    }

    const handleToChange = (selectedOption) => {
        setTo(selectedOption);
    }

    const swapSide = () => {
        let hold = fromValue;
        setFrom(toValue);
        setTo(hold);
    }

    const swapToken = () => {
        if (fromValue.value !== toValue.value) {
            setError('');
        }
        else {
            setError('Fields cannot match.');
        }
    }

    return(
        <div align='center' style={{marginTop:'80px'}}>
        <div id='screenBg' style={{width:'450px', height:'625px', backgroundColor:'black', borderRadius:'10px'}}>
            <img id='logo' src={logo} alt='' style={{width:'240px', margin:'50px', filter: 'invert(1)'}}/>
            <div  id='connectButton'><Button onClick={connect} style={{padding:'10px', marginTop:'80px', width:'200px', backgroundColor:'#88888830', border:'white solid 1px', fontSize:'20px', color:'white'}}>Connect</Button></div>
        <div id='swapScreen' style={{visibility:'hidden'}}>
        <div className='row' style={{maxWidth:'330px'}}>
            <div className='col' style={{margin:'auto'}}>
            <Select value={fromValue} onChange={handleFromChange} options={options}/>
                <div class="row" style={{marginTop:'10px'}}>
                    <div class="col">
                        <input type="number" style={{border:'#C6C6C6 1px solid'}}/>
                    </div>
                    <div class="col">
                        <p>{fromValue.value}</p>
                    </div>
                </div>
            </div>
        </div>
        <div className='row' style={{maxWidth:'330px'}}>
            <div className='col' style={{margin:'auto'}}>
                <img src={ hoverSwap? swapSideIcon:downArrow} alt='' onClick={swapSide} style={{margin:'10px', cursor:'pointer'}} onMouseEnter={()=>setHoverSwap(true)} onMouseLeave={()=>setHoverSwap(false)} />
            </div>
        </div>
        <div className='row' style={{maxWidth:'330px'}}>
            <div className='col' style={{margin:'auto'}}>
            <Select value={toValue} onChange={handleToChange} options={options}/>
            <p style={{marginTop:'10px'}}>{outputAmount} {toValue.value}</p>
            </div>
        </div>
        <Button style={{margin:'50px', width:'280px', backgroundColor:'white', border:'#C6C6C6 1px solid', fontSize:'20px', color:'black'}} onClick={swapToken}>Swap</Button>
        </div>
        {error && <Alert variant='danger' style={{width:'230px'}}>{error}</Alert>}
        </div>
        </div>
    );
}