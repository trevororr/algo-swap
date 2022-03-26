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

export default function Swap() {


    const options = [
        { value: 'algo', label: <div><img src={algoLogo} height="30px" style={{paddingRight: '5px'}} alt=''/>ALGO </div> },
        { value: 'eth', label: <div><img src={ethLogo} height="30px" style={{paddingRight: '5px'}} alt=''/>ETH </div> },
        { value: 'bnb', label: <div><img src={bnbLogo} height="30px" style={{paddingRight: '5px'}} alt=''/>BNB </div> }
    ];

    const [error, setError] = useState('');
    const [fromValue, setFrom] = useState(options[0]);
    const [toValue, setTo] = useState(options[1]);
    const [hoverSwap, setHoverSwap] = useState(false);

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
            <img src={logo} alt='' style={{width:'240px', marginBottom:'50px'}}/>
        <div className='row' style={{maxWidth:'330px'}}>
            <div className='col' style={{margin:'auto'}}>
            <Select value={fromValue} onChange={handleFromChange} options={options}/>
                <div class="row">
                    <div class="col">
                        <input type="number"/>
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
            </div>
        </div>
        <Button style={{margin:'50px', width:'280px', backgroundColor:'white', border:'black solid 2px', fontSize:'20px', color:'black'}} onClick={swapToken}>Swap</Button>
        {error && <Alert variant='danger' style={{width:'230px'}}>{error}</Alert>}
        </div>
    );
}