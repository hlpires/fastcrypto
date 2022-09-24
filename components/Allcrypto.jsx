import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const Allcrypto = () => {

    const [label, setlabel] = useState([])
    const axios = require("axios");
    const [dataCrypto, setDataCrypto] = useState()
    const [coins, setCoins] = useState()
    const [color, setColor] = useState()
    const [coinsF, setCoinsF] = useState(coins)


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
        if (dataCrypto)
            setCoins(dataCrypto.data.coins)
    }, [dataCrypto]);


    const mystyle = {
        color: color
    }

    useEffect(() => {
        if (typeof coins !== 'undefined')
            setCoinsF(coins.splice(0, 10))
    }, [coins]);

    const filter = (v) => {
        if (v)
            setCoinsF(coins.filter(({ name }) => name.toLowerCase().startsWith(v)))
        else
            setCoinsF(coins.filter(({ name }) => name.toLowerCase().startsWith(v)).splice(0, 10))

    }
    console.log(coins)


    if (typeof coins !== 'undefined' && typeof coinsF !== 'undefined')

        return (
            <div className='allCryptoHolder'>
                <div className='position'>

                    <div className='allCrypto' id='crypto'>
                        <div className='filterBox'>
                            <div className='buscar' onClick={() => filter(document.getElementById('1').value.toLowerCase())}></div> <input onChange={() => filter(document.getElementById('1').value)} id='1' placeholder=' Pesquise por Cryptos' className='input' ></input>
                        </div>
                        <div className='tittleHolder'>
                            <div className='holder1'><p className='tittleText'>Nome</p></div>
                            <div className='holder2'><p className='tittleText'>Preço / Variação em 24hrs</p></div>
                            <div className='holder3'><p className='tittleText'>Grafico</p></div>
                        </div>
                        {coinsF.map(({ iconUrl, name, change, price, sparkline }) => (

                            <div className='boxMap'>
                                <div className='imageMap' >
                                    <Image loader={() => iconUrl} width={100} height={100} src={iconUrl}></Image>
                                </div>
                                <p className='mapBoxTittle'>{name}</p>
                                <p className='mapBoxPrice'>{Number(price).toFixed(2) + ' $'}</p>
                                <p className='mapBoxChange'><span style={mystyle} className='spanTittleMap'>{change + '%'}</span></p>

                                <div className='mapGraph'><Line data={
                                    {

                                        labels: ['', '', '', '', '', ''],
                                        datasets: [
                                            {
                                                plugins: {
                                                    legend: {
                                                        display: 'false'
                                                    }
                                                },
                                                label: '',
                                                data: [...sparkline.slice(0, 7)],
                                                elements: {
                                                    line: {
                                                        tension: 0,
                                                        fill: 'start',
                                                        borderWidth: 2,
                                                        color: 'black',
                                                        borderColor: 'rgba(47,197,268,1)',
                                                        backgroundColor: 'rgba(147,297,368,0.3)'
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
                                    }
                                } width={400} height={130} /></div>


                            </div>))}

                    </div>

                </div>
            </div>
        )
}

export default Allcrypto