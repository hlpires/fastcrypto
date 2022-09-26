import React, { useEffect, useState } from 'react'
import imageCrypto from '../img/crypto.png'
import Image from 'next/image'
import { Line } from 'react-chartjs-2';
import banner from '../img/banner.png'
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
    const [animate, setAnimate] = useState()
    const [animateShadow,setAnimateShadow] = useState()

    const myStyle = {
        color: 'red',
        fontSize: '20px',
        marginLeft: '0%',
    }

    const bitcoinArtStyle = {
        transform: animate,
        filter:animateShadow

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


useEffect(() => {

    const interval = setInterval(() => {
        if (animate === 'translate3d(0px, 0px, 0px)') {
            setAnimate('translate3d(0px, 16px, 0px)')
            setAnimateShadow('drop-shadow(6px 4px 5px rgb(15, 15, 15))')
            

        } else {
            setAnimate('translate3d(0px, 0px, 0px)')
            setAnimateShadow('drop-shadow(2px 4px 10px rgb(109, 188, 188))')
        }
    }, 1700)

    return () => clearInterval(interval)

}, [animate]);



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
                        borderColor: 'rgba(58, 226, 51)',
                        backgroundColor: 'rgba(28, 166, 91)'
                    },
                    point: {
                        color:'black',
                        radius: 7,
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
                          <div className ='banner'>
                              <div className = 'contentBox'>
                              <div className = 'tittleBox'><p className = 'tittleTextBanner'>Acompanhe agora os valores das Cryptomoedas</p></div>
                              <div className = 'subTittle'><p className = 'subTittletextBanner'>Graficos em tempo real para a analise de dados de investidores</p></div>
                              </div>
                              <div className = 'imageBanner'>
                                  <div className = 'imageBannerSize'><Image src = {banner} width={700} height={600}></Image></div>
                              </div>
                          </div>
                        </div>
                    </div>
                </div>
                <div className='bannerArtFooter'>

                </div>
                <div className ='bitcoinBox'>
                <div className ='position'>
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
                                            height={160}
                                        />
                                    </div>
                                </div>
                                <div className='bitcoinCardImage'>
                                    <div className='bitcoinArt' style={bitcoinArtStyle} ><Image height={560} width={620} src={imageCrypto}></Image></div>
                                </div>
                            </div>
                         </div>
                         </div>
            </div>

        )
}

export default Cryptos