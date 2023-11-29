import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import type { ChartData, ChartOptions } from 'chart.js';

interface LineProps {
    options: ChartOptions<'line'>;
    data: ChartData<'line'>;
}

interface dataCrypto {
    method: string;
    url: string;
    params: {
        referenceCurrencyUuid: string;
        timePeriod: string;
        [key: string]: string;
    };
    headers: {
        'X-RapidAPI-Key': string;
        'X-RapidAPI-Host': string;
        [key: string]: string;
    };
}
const FixedMyReactComponent: any = Line;

const Allcrypto = () => {

    const [label, setlabel] = useState<any>([])
    const axios = require("axios");
    const [dataCrypto, setDataCrypto] = useState<any>()
    const [coins, setCoins] = useState<any>()
    const [color, setColor] = useState<any>()
    const [coinsF, setCoinsF] = useState<any>(coins)
    const [display, setDisplay] = useState<any>()


    interface RequestOptions {
        method: string;
        url: string;
        params: {
            referenceCurrencyUuid: string;
            timePeriod: string;
            [key: string]: string;
        };
        headers: {
            'X-RapidAPI-Key': string;
            'X-RapidAPI-Host': string;
            [key: string]: string;
        };
    }

    useEffect(() => {
        const options: RequestOptions = {
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
        if (dataCrypto) setCoins(dataCrypto.data.coins)
    }, [dataCrypto]);


    const mystyle = {
        color: color
    }

    const stylebutton = {
        display: display
    }

    useEffect(() => {
        if (typeof coins !== 'undefined')
            setCoinsF(coins)
    }, [coins]);
    //modificar objeto e adicionar parametro em cada um

    const filter = (v) => {
        if (v)
            setCoinsF(coins.filter(({ name }) => name.toLowerCase().startsWith(v)).splice(0, 10))
        else
            setCoinsF(coins.filter(({ name }) => name.toLowerCase().startsWith(v)).splice(0, 10))

    }
    console.log(coins)

    if (typeof coins !== 'undefined' && typeof coinsF !== 'undefined')

        return (
            <div className='allCryptoHolder' >
                <div className='position'>
                    <div className='allCrypto' id='crypto'>
                        <div className='filterBox'>
                            <div className='buscar'></div>
                            <input onChange={() => filter((document.getElementById('1') as HTMLInputElement).value)} id='1' placeholder=' Pesquise por Cryptos' className='input' ></input>
                        </div>
                        <div className='tittleHolder'>
                            <div className='holder1'><p className='tittleText'>Nome</p></div>
                            <div className='holder2'><p className='tittleText'>Preço / Variação em 24hrs</p></div>
                            <div className='holder3'><p className='tittleText'>Grafico</p></div>
                        </div>
                        {coinsF.map(({ iconUrl, name, change, price, sparkline }) => (

                            <a>
                                <div className='boxMap' key={price}>
                                    <div className='imageMap' >
                                        <Image loader={() => iconUrl} width={100} height={100} src={iconUrl}></Image>
                                    </div>
                                    <p className='mapBoxTittle'>{name}</p>
                                    <p className='mapBoxPrice' style={{ color: 'green', filter: 'brightness(2)', marginTop: '38px', fontWeight: 'bold' }}>{Number(price).toFixed(2) + ' $'}</p>
                                    <p className='mapBoxChange'>
                                        <span style={{ ...mystyle, color: change < 0 ? 'red' : 'green', fontWeight: "bold", filter: 'brightness(2)' }} className='spanTittleMap'>
                                            {change > 0 ? "+" + change + '%' : change}
                                        </span>
                                    </p>

                                    <div className='mapGraph'>
                                        <FixedMyReactComponent data={
                                            {

                                                labels: ['-24', '-22', '-20', '-18', '-16', '-12', '-10', '-8', '-4', '-2', 'agora'],
                                                datasets: [
                                                    {
                                                        label: '24HRSs',
                                                        data: [...sparkline.slice(0, 1), ...sparkline.slice(1, 10), ...sparkline.slice(1, 15), ...sparkline.slice(1, 25), price],
                                                        elements: {
                                                            line: {
                                                                tension: 0,
                                                                fill: 'start',
                                                                borderWidth: 2,
                                                                color: 'black',
                                                                borderColor: 'rgba(58, 226, 51)',
                                                                backgroundColor: 'rgba(28, 166, 91)',
                                                                lineTension: 0.3
                                                            },
                                                            point: {
                                                                radius: 0,
                                                                girRadius: 0,
                                                            }
                                                        },
                                                        responsive: true,
                                                    }
                                                ]
                                            }
                                        } options={{
                                            plugins: {
                                                legend: false
                                            },
                                        }} width={500} height={180} /> </div>


                                </div>
                            </a>
                        )
                        )}

                        <div className='addMore'>
                            {/* } <div style ={stylebutton} className = 'addMoreButton' onClick = { () => loadmore()}>
                            <p className ='buttonText'> Carregar todas</p>
                            </div> */}
                        </div>

                    </div>


                </div>
            </div>
        )
}

export default Allcrypto