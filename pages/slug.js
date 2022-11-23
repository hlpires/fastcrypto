import Cryptos from '../components/Cryptos'
import Allcrypto from '../components/Allcrypto'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2';



export default function Home() {

const data = {

  labels: ['-24', '-22', '-20', '-18', '-16' ],
  datasets: [
    {
      plugins: {
        legend: {
          display: 'false'
        }
      },
      label: '24HRSs',
      data: [10,20,30,40,50],
      lineTension: 0.3,
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

  const graphData = useState();

  return (
    <div>
      <Header />
      <div className='slug'>
        <div className='position'>
          <div className='slugBox'>
            <div className='slugGraph'>
              <Line data={data} width={400} height={300}/>
            </div>

            <div className='slugText'>
              <h1>Lorum Ipslum</h1>
              <p>Lorum IpslumLorum IpslumLorum IpslumLorum Ipslum
              Lorum IpslumLorum IpslumLorum IpslumLorum IpslumLorum Ipslum
              Lorum IpslumLorum IpslumLorum IpslumLorum Ipslum
              Lorum Ipslum Lorum IpslumLorum IpslumLorum IpslumLorum Ipslum
              Lorum IpslumLorum IpslumLorum IpslumLorum Ipslum
              </p>

            </div>
          </div>
          
        </div>
        <div className='spacer'>

        </div>
      </div>
      <Footer />
    </div>
  )
}
