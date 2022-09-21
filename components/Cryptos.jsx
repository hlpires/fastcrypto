import React from 'react'
import imageCrypto from '../img/crypto.png'
import Image from 'next/image'

const Cryptos = () => {
    const axios = require("axios");

    const options = {
      method: 'GET',
      url: 'https://coinranking1.p.rapidapi.com/coins',
      params: {
        referenceCurrencyUuid: 'yhjMzLPhuIDl',
        timePeriod: '24h',
        'tiers[0]': '1',
        orderBy: 'marketCap',
        orderDirection: 'desc',
        limit: '50',
        offset: '0'
      },
      headers: {
        'X-RapidAPI-Key': 'b810cbd18bmsh9be1172c850c4d8p100877jsn2839fe298a4c',
        'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
      }
    };
    
    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });


    return (
        <div className = 'crypto'>
            <div className = 'position'>
                <div className = 'bubbleBox'>
                <div className = 'bubble'></div>
                <div className = 'bubble2'></div>
                </div>
                <div className = 'cardCryptos'>
                    <div className ='bitcoinCard'></div>
                    <div className = 'bitcoinCardImage'>
                        <Image src = {imageCrypto}></Image>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cryptos