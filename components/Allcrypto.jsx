import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const Allcrypto = () => {

    const [label, setlabel] = useState([])
    const axios = require("axios");
    const [dataCrypto, setDataCrypto] = useState()
    const [coins, setCoins] = useState()


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
        if(dataCrypto)
   setCoins(dataCrypto.data.coins)
    }, [dataCrypto]);

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
                data: [...label.slice(0, 7)],
                elements: {
                    line: {
                        tension: 0,
                        fill: 'start',
                        borderWidth: 2,
                        color: 'black',
                        borderColor: 'rgba(47,197,268,1)',
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



    console.log(coins)
    if (typeof coins !== 'undefined')
    
        return (
            <div className='allCryptoHolder'>
                <div className='position'>
                    <div className='allCrypto'>
                        
                        {coins.map(({ iconUrl, name, change, price,sparkline}) => (
                            <div className='boxMap'>
                                <div className='imageMap'>
                                    <Image loader={() => iconUrl} width={100} height={100} src={iconUrl}></Image>
                                </div>
                                <p className='mapBoxTittle'>{name}</p>
                                <p className='mapBoxTittle'>{price}</p>
                                <p className='mapBoxTittle'>{change}</p>
                                <div className = 'mapGraph'><Line data={data} width = {'250%'} height={'100%'} /></div>
                                

                        </div>))} 

                    </div>

                </div>
            </div>
        )
}

export default Allcrypto