import React, { useState, useEffect } from 'react';
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
import { Vortex } from 'react-loader-spinner'
export default function Swap() {


    const options = [
        { value: 'ALGO', label: <div><img src={algoLogo} height="30px" style={{paddingRight: '5px'}} alt=''/>ALGO </div> },
        { value: 'ETH', label: <div><img src={ethLogo} height="30px" style={{paddingRight: '5px'}} alt=''/>ETH </div> },
        { value: 'BSC', label: <div><img src={bnbLogo} height="30px" style={{paddingRight: '5px'}} alt=''/>BSC </div> }
    ];

    const [error, setError] = useState('');
    const [fromValue, setFrom] = useState(options[0]);
    const [toValue, setTo] = useState(options[1]);
    const [hoverSwap, setHoverSwap] = useState(false);
    const [outputAmount, setOutputAmount] = useState(0);
    const [inputAmount, setInputAmount] = useState(0);
    const [connected, setConnected] = useState(false);
    const [loading, setLoading] = useState(false);
    const [min, setMin] = useState(0);
    const [warning, setWarning] = useState(false);

    useEffect(()=> { updateInputs(inputAmount, fromValue.value, toValue.value) }, [toValue, fromValue, inputAmount])
    useEffect(async ()=> {
        const min = await getMin(fromValue.value, toValue.value);
        console.log("min is ", min);
        console.log("input amount is ", inputAmount);
        if(min > inputAmount){
            console.log("here");
            setInputAmount(min);
        }
    }, [toValue, fromValue])

    useEffect(()=>{
        if(loading){
            setWarning(false);
        }
    }, [loading])

    const connect = async () => {
        let error = false;
        try{
            let connection = await window.ethereum.request({
                method: 'wallet_enable',
                params: [{
                    wallet_snap: { 'npm:algorand': {} },
                }]
            })
        console.log(connection);
        }catch(e){
            error = true;
            console.log('error', e);
        }
        if(error){
            alert("this app requires metamask flask at the current time");
            return "failed";
        }
        setConnected(true);
        document.getElementById('connectButton').style.display = "none";
        document.getElementById('swapScreen').style.visibility = "visible";
        document.getElementById('screenBg').style.border = "#C6C6C6 1px solid";
        document.getElementById('screenBg').style.animation = "shrink 0.5s, bggradient 20s ease-in-out infinite";
        document.getElementById('screenBg').style.animationFillMode = "forwards";
        const min = await getMin(fromValue.value, toValue.value);
        console.log("min is");
        console.log(min);
        setInputAmount(min);
        /*document.getElementById('logo').style.filter = "invert(0)";*/
    }

    const handleFromChange = (selectedOption) => {
        console.log(selectedOption);
        setFrom(selectedOption);
        
    }

    const getMin = async (fromTicker, toTicker)=>{
        fromTicker = fromTicker.toLowerCase();
        toTicker = toTicker.toLowerCase();
        console.log("from ticker is", fromTicker);
        console.log("to ticker is", toTicker);
        const result = await window.ethereum.request({
            method: 'wallet_invokeSnap',
            params: ["npm:algorand", 
            {
                method: 'getMin',
                from: fromTicker,
                to: toTicker,
            }
            ]
        });
        const min = Number(result.minAmount);
        setMin(min);
        return min;
    }

    const handleToChange = (selectedOption) => {
        console.log(selectedOption);
        setTo(selectedOption);
        
    }

    const swapSide = () => {
        let hold = fromValue;
        setFrom(toValue);
        setTo(hold);
        
    }

    const handleInputValueChange = (e) =>{
        console.log(e.target.value);
        setWarning(false);
        let num = Number(e.target.value);
        if(num === 0){
            num = null;
        }
        setInputAmount(num);
    }

    const swapToken = async () => {
        await window.ethereum.request({
            method: 'wallet_invokeSnap',
            params: ["npm:algorand", 
            {
                method: 'swap',
                from: fromValue.value,
                to: toValue.value,
                amount: inputAmount
            }
            ]
        });

    }

    const updateInputs = async (inputAmount, fromTicker, toTicker) => {
        setLoading(true);
        console.log(inputAmount);
        console.log(toTicker);
        console.log(fromTicker); 
        const result = await window.ethereum.request({
            method: 'wallet_invokeSnap',
            params: ["npm:algorand", 
            {
                method: 'preSwap',
                from: fromTicker,
                to: toTicker,
                amount: inputAmount
            }
            ]
        });
        if(Number(result.body.minAmount) > Number(result.body.amount)){
            console.log("here");
            setWarning(true);
        }
        else{
            setWarning(false);
        }
        setOutputAmount(result.body.estimatedAmount);
        console.log(result);
        setLoading(false);
        
    }

    return(
        
        <div style={{width:'350px', height:'625px', backgroundColor:"white", borderRadius:'10px', border: '1px solid #c8c8c8'}}>
        <div id="screenBg" align="center" style={{width:'350px', borderRadius:'10px', zIndex:"1", position:'absolute'}}>
            <img id='logo' src={logo} alt='' style={{width:'240px', margin:'50px', filter: 'invert(1)'}}/>
            <div  id='connectButton'><Button onClick={connect} style={{padding:'10px', marginTop:'80px', width:'200px', backgroundColor:'#88888830', border:'white solid 1px', fontSize:'20px', color:'white'}}>Connect</Button></div>
        </div>

        <div align="center">
        
           
        <div id='swapScreen' style={{visibility:'hidden', marginTop: '45%'}}>
        
        {connected? <></>:null}
        {error? <Alert variant='danger' style={{width:'230px'}}>{error}</Alert>:<><br/><br/></>}
        <div className='row' style={{maxWidth:'330px'}}>
            <div className='col' style={{margin:'auto'}}>
            <Select value={fromValue} onChange={handleFromChange} options={options}/>
                <div class="row" style={{marginTop:'10px'}}>
                    <div class="col">

                        <input type="number" onChange={handleInputValueChange} value={inputAmount} style={{border:'#C6C6C6 1px solid'}}/>

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
            {
            !loading?
            <>
            {warning?null:
            <>
                <p style={{marginTop:'10px'}}>{outputAmount} {toValue.value}</p>
                <p>estimated</p>
            </>
            }
            </>
            :<Vortex
                visible={true}
                height="140"
                width="140"
                ariaLabel="vortex-loading"
                wrapperStyle={{}}
                wrapperClass="vortex-wrapper"
                colors={['#963beb', '#830bba', '#c00fb4', '#e9d596']}
            />
            }
            </div>
        </div>
        
        <br/>
        {warning?
        <div style={{"background-color":"#ccc", "margin":'auto'}}>
            <p style={{"margin":"auto"}}>Inputed amount is less<br/>than the minium amount</p>
        </div>
        :loading?null:<Button id="swapButton" style={{margin:'auto', width:'220px', fontSize:'20px'}} onClick={swapToken}>Swap</Button>
        }
        
        
        </div>
       
        </div>
        </div>
    );
}