import React, { useEffect, useState } from 'react'
import './App.css'

function App() {
    const[currencies, setCurrencies] = useState([])
    const[fromCurrency, setFromCurrency] = useState('1inch')
    const[toCurrency, setToCurrency] = useState('1inch')
    const[fromValue, setFromValue] = useState(0)
    const[toValue, setToValue] = useState(0)


    useEffect(()=>{
      fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json')
      .then((response)=>response.json())
      .then((data)=>{
        setCurrencies(data)
      })
    
    }, [])

    function calculateResult(){
        fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrency}.json`)
        .then((response)=>response.json())
        .then((data)=>{
          
          setToValue(fromValue * data[fromCurrency][toCurrency])
        })
    }
    

  return (
    <>
    <div className='w-screen h-screen bg-[url(https://cdn.pixabay.com/photo/2023/03/13/16/10/banknotes-7850299_1280.jpg)] bg-no-repeat bg-cover flex justify-center items-center flex-col' id="parent">

      <div className=' rounded-2xl  ' id="first">

        <div id="first_label">
        <label className='text-white'>From</label>

        <select className='bg-white' onChange={(e)=>setFromCurrency(e.target.value)}>
          {Object.entries(currencies).map(([code , name])=> 
          <option key={code} value={code}>
            {name}
          </option>)}
        </select>  
        </div>
            

            <br/>

            <input placeholder='enter the currency amount' type='tel' className='bg-white' value={fromValue} onChange={(e)=>setFromValue(e.target.value)}></input>

            <br/>
            <button onClick={calculateResult}>Calculate</button>
      
      </div>

     
      <div id="second" className='rounded-2xl  '>
        <div id="second_label">
        <label className='text-white'>To</label>
            <select className='bg-white' onChange={(e)=>setToCurrency(e.target.value)}>
              {Object.entries(currencies).map(([code , name])=> 
              <option key={code} value={code}>
                {name}
              </option>)}
            </select>  
        </div>
        
          <br/>
          <input className='bg-white' type='tel' value={toValue} disabled></input>
      </div> 
     

    </div>
    </>
  )
}

export default App