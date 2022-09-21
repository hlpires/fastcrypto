import React, { useEffect, useState } from 'react'
import imageCrypto from '../img/crypto.png'
import Image from 'next/image'
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const Cryptos = () => {


    const axios = require("axios");
    const [dataCrypto, setDataCrypto] = useState()
    const [bitcoinNome, setBitCoinNome] = useState()
    const [bitcoinPrice, setBitCoinPrice] = useState()
    const [label, setlabel] = useState([])

useEffect(() => {

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
        setDataCrypto(response.data);
    }).catch(function (error) {
        console.error(error);
    });

}, []);

useEffect(() => {
    if (dataCrypto) {
        setBitCoinNome(dataCrypto.data.coins[0].name)
        setBitCoinPrice(Math.trunc(Number(dataCrypto.data.coins[0].price)))
        setlabel(dataCrypto.data.coins[0].sparkline.map(item => Math.trunc(Number(item))))
    }
}, [dataCrypto]);

console.log(label)

    const data = {

        labels: ['', '', '', '', '', ''],
        datasets: [
            {
                plugins: {
                    legend: {
                        display: 'false'
                    }
                },
                label: '',
                data: [label[0], label[5], label[10], label[15], label[20], label[5]],
                elements: {
                    line: {
                        tension: 0,
                        fill: 'start',
                        borderWidth: 2,
                        borderColor: 'rgba(47,297,68,1)',
                        backgroundColor: 'rgba(47,297,68,0.3)'
                    },
                    point: {
                        radius: 0,
                        girRadius: 0,
                    }
                },
                responsive: true,
                scales: {
                    xAxis: {
                        display: false
                    },
                    yAxis: {
                        display: false
                    }
                }
            }
        ]
    };




    return (
        <div className='crypto'>
            <div className='position'>
                <div className='bubbleBox'>
                    <div className='bubble'></div>
                    <div className='bubble2'></div>
                </div>
                <div className='cardCryptos'>
                    <div className='bitcoinCard'>
                        <div className='headerTittle'><p className='tittle'>{bitcoinNome + ' Preço: ' + bitcoinPrice}</p></div>
                        <div className='headerGraph'>
                            <Line
                                data={data}
                                width={400}
                                height={270}
                            />
                        </div>
                    </div>
                    <div className='bitcoinCardImage'>
                        <Image src={imageCrypto}></Image>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cryptos