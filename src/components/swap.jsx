import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import swapSideIcon from '../imgs/swapSide.png';

export default function Swap() {
    const [error, setError] = useState('');

    const swapSide = () => {
        let hold = document.getElementById('fromSelect').value;
        document.getElementById('fromSelect').value=document.getElementById('toSelect').value;
        document.getElementById('toSelect').value=hold;
    }

    const swapToken = () => {
        if (document.getElementById('fromSelect').value !== document.getElementById('toSelect').value) {
            setError('');
        }
        else {
            setError('Fields cannot match.');
        }
    }

    return(
        <div align='center' style={{marginTop:'50px'}}>
        <div className='row' style={{maxWidth:'270px'}}>
            <div className='col' style={{margin:'auto'}}>
            <h1 style={{fontSize:'30px', fontWeight:'normal'}}>From:</h1>
            </div>
            <div className='col' style={{margin:'auto'}}>
            <select class="form-select" aria-label="Default select example" style={{width:'120px', border:'#76F935 solid 2px'}} id='fromSelect'>
                <option value="0">ALGO</option>
                <option value="1">ETH</option>
                <option value="2">BNB</option>
            </select>
            </div>
        </div>
        <img src={swapSideIcon} alt='' onClick={swapSide} style={{margin:'10px'}} />
        <div className='row' style={{maxWidth:'270px'}}>
            <div className='col' style={{margin:'auto'}}>
            <h1 style={{fontSize:'30px', fontWeight:'normal'}}>To:</h1>
            </div>
            <div className='col' style={{margin:'auto'}}>
            <select class="form-select" aria-label="Default select example" style={{width:'120px', border:'#76F935 solid 2px'}} id='toSelect'>
                <option value="0">ALGO</option>
                <option value="1" selected>ETH</option>
                <option value="2">BNB</option>
            </select>
            </div>
        </div>
        <Button style={{margin:'30px', width:'120px', backgroundColor:'white', border:'#76F935 solid 2px', fontSize:'20px', color:'black'}} onClick={swapToken}>Swap</Button>
        {error && <Alert variant='danger' style={{width:'230px'}}>{error}</Alert>}
        </div>
    );
}