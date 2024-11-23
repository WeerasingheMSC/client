import React,{useEffect, useState} from 'react'
import axios from "axios";
export default function MainPage() {
    const [date , setDate] = useState(null);
    const [sourceCurrency, setSourceCurrency] = useState("");
    const [targetCurrency, setTargetCurrency] = useState("");
    const [amountInSourceCurrency , setAmountInSourceCurrency] = useState(0);
    const [amountInTargetCurrency , setAmountInTargetCurrency] = useState(0);
    const [CurrencyNames , setCurrencyNames] = useState([]);
    const [loading , setLoading] = useState(true);
    const handleSubmit = async(e) =>{
        e.preventDefault();
       try{
        const responce = await axios.get("http://localhost:5001/convert" ,{ params: {
            date,
            sourceCurrency,
            targetCurrency,
            amountInSourceCurrency,
        },
    });
     setAmountInTargetCurrency(responce.data);   
     setLoading(false);
       }catch(err){
            console.error(err);
       }
    };
    useEffect(()=>{
        const getCurrencyNames = async() => {
            try{
                const responce = await axios.get(
                    "http://localhost:5001/getAllCurrencies"
                );
                 setCurrencyNames(responce.data);
            }
            catch(err){
               console.error(err); 
            }
        };
        getCurrencyNames();
    },[]);
    return (
    <div className='app  bg-slate-100 border-8 border-gray-600 border-opacity-5 border-transparent py-3 rounded-md sm:px-3 lg:mx-40 px-1 outline-4 outline-red-500'>
     <h1 className="lg:mx-20 s rounded-lg sm:font-bold sm:text-4xl lg:text-5xl lg:font-bold bg-gradient-to-r from-sky-500 to-indigo-500 bg-slate-200 px-4 text-2xl font-bold text-center">$Currency Converter$</h1>
     <p className='lg:mx-24 lg:text-xl opacity-60 py-4 font-serif sm:text-base text-xs'>
        Welcome to "Currency Converter"! This application allows you to easily converter
        currencies based on the latest exchange rates.This Currency Converter app is a simple, 
        user-friendly tool designed to help users quickly and accurately convert between multiple global currencies.
     </p>
     <div className="mt-5 flex items-center justify-center flex-col">
        <section className='w-full '>
            <form onSubmit={handleSubmit}>
                <div className='mb-4 lg:px-48'>
                    <label className='block mb-2 text-sm font-bold text-gray-900' htmlFor={date}>Date:</label>
                    <input onChange={(e) => setDate(e.target.value)} type="date" id={date} name={date} className='bg-gray-200 focus:bg-sky-100 border-2 border-gray-500 text-gray-900 text-base rounded-lg block w-full p-1 sm:p-1.5 lg:p-2.5'></input>
                </div>
                <div className='mb-4 lg:px-48'>
                    <label htmlFor={sourceCurrency} className='block mb-2 text-sm font-bold text-gray-900'>Source Currency:</label>
                    <select onChange={(e) => setSourceCurrency(e.target.value)} name={sourceCurrency} id={sourceCurrency} value={sourceCurrency} className="bg-gray-200 focus:bg-sky-100 border-2 border-gray-500 text-gray-900 text-base rounded-lg block w-full p-1 sm:p-1.5 lg:p-2.5 focus:outline-gray-900">
                        <option>Select source currency</option>
                        {Object.keys(CurrencyNames).map((currency)=>(
                            <option className=' p-1' key={currency} value={currency}>
                                {CurrencyNames[currency]}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='mb-4 lg:px-48'>
                    <label htmlFor={targetCurrency} className='block mb-2 text-sm font-bold text-gray-900'>Target Currency:</label>
                    <select onChange={(e)=> setTargetCurrency(e.target.value)} name={targetCurrency} id={targetCurrency} value={targetCurrency} className="bg-gray-200 focus:bg-sky-100 border-2 border-gray-500 text-gray-900 text-base rounded-lg block w-full p-1 sm:p-1.5 lg:p-2.5 focus:outline-gray-900">
                        <option>Select target currency</option>
                        {Object.keys(CurrencyNames).map((currency)=>(
                            <option className=' p-1' key={currency} value={currency}>
                                {CurrencyNames[currency]}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='mb-4 lg:px-48'>
                    <label htmlFor={amountInSourceCurrency} className='block mb-2 text-sm font-bold text-gray-900'>Amount in source currency:</label>
                    <input type="number" onChange={(e) => setAmountInSourceCurrency(e.target.value)} name={amountInSourceCurrency} id={amountInSourceCurrency} className='bg-gray-200 focus:bg-sky-100 border-2 border-gray-500 text-gray-900 text-base rounded-lg block w-full p-1 sm:p-1.5 lg:p-2.5 focus:outline-gray-900' placeholder='Amount in source currency'></input>
                </div>
                <button className='bg-sky-400  hover:bg-sky-700 text-white font-medium lg:mx-48 lg:w-52 sm:w-48 py-2 rounded-md w-1/2 p-1 sm:text-base text-xs lg:text-base '>Get the target Currency</button>
            </form>
        </section>
     </div>
     {!loading ? (<p className='text-1xl mt-5 lg:mx-20' >{amountInSourceCurrency} {CurrencyNames[sourceCurrency]} is equals to{" "}
     <span className='text-sky-400 font-bold'>{amountInTargetCurrency} </span>in {CurrencyNames[targetCurrency]}
    </p>):null}
    </div>
  );
}
