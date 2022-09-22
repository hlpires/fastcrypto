import React, { useEffect, useState } from 'react'
import imageCrypto from '../img/crypto.png'
import Image from 'next/image'
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import bannerFooterImg from '../img/banner-curve-dark.png'

const Cryptos = () => {


    const axios = require("axios");
    const [dataCrypto, setDataCrypto] = useState()
    const [bitcoinNome, setBitCoinNome] = useState()
    const [bitcoinPrice, setBitCoinPrice] = useState()
    const [label, setlabel] = useState([])
    const [bitcoinChange, setBitCoinChange] = useState()
    const [color, setColor] = useState()
    const myStyle = {
        color: 'red',
        fontSize: '20px',
        marginLeft: '0%',


    }

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
            setBitCoinChange(Number(dataCrypto.data.coins[0].change))
            setlabel(dataCrypto.data.coins[0].sparkline.map(item => Math.trunc(Number(item))))
        }
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

    console.log(...label.slice(0, 7))


    if (typeof dataCrypto !== 'undefined')
        return (
            <div>
                <div className='crypto'>
                    <div className='position'>
                        <div className='cryptoBox'>
                            <div className='bubbleBox'>
                                <div className='bubble'></div>
                                <div className='bubble2'></div>
                            </div>
                            <div className='cardCryptos'>
                                <div className='bitcoinCard'>
                                    <div className='headerTittle'>
                                        <div className='bitcoinImage'><Image loader={() => dataCrypto.data.coins[0].iconUrl} width={100} height={100} src={dataCrypto.data.coins[0].iconUrl}></Image></div>
                                        <p className='tittle'>{bitcoinNome + '\t'}
                                            <span className='spanTittle'>{bitcoinPrice + '$ '}</span>
                                            <span style={myStyle} className='spanTittle'>{bitcoinChange + '%'}</span>
                                            <span className='hora'>{' 24hr'}</span>
                                        </p>
                                    </div>

                                    <div className='headerGraph'>
                                        <Line
                                            data={data}
                                            width={400}
                                            height={220}
                                        />
                                    </div>
                                </div>
                                <div className='bitcoinCardImage'>
                                    <div className='bitcoinArt'><Image height={520} width={480} src={imageCrypto}></Image></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='bannerArtFooter'>
               
                </div>
              
    
            </div>

        )
}

export default Cryptos