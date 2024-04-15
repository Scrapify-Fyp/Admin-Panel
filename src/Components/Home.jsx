import React from 'react'
import 
{ BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill}
 from 'react-icons/bs'
 import 
 { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, Area, AreaChart } 
 from 'recharts';

function Home() {

    const data = [
        {
          name: '2015',
          NetProfitMargin: 2500,
          GrossProfitMargin: 4000,
          ReturnOnAssets: 1800,
          amt: 2400,
        },
        {
          name: '2016',
          NetProfitMargin: 2300,
          GrossProfitMargin: 5000,
          ReturnOnAssets: 1900,
          amt: 2210,
        },
        {
          name: '2017',
          NetProfitMargin: 3000,
          GrossProfitMargin: 6500,
          ReturnOnAssets: 2000,
          amt: 2290,
        },
        {
          name: '2018',
          NetProfitMargin: 1000,
          GrossProfitMargin: 4000,
          ReturnOnAssets: 500,
          amt: 2000,
        },
        {
          name: '2019',
          NetProfitMargin: 2890,
          GrossProfitMargin: 4800,
          ReturnOnAssets: 3500,
          amt: 2181,
        },
        {
          name: '2020',
          NetProfitMargin: 2390,
          GrossProfitMargin: 3800,
          ReturnOnAssets: 1590,
          amt: 2500,
        },
      ];
     

  return (
    <main className='main-container'>
        <div className='main-title'>
            <h3>DASHBOARD</h3>
        </div>

        <div className='main-cards'>
            <div className='card'>
                <div className='card-inner'>
                    <h3>PRODUCTS</h3>
                    <BsFillArchiveFill className='card_icon'/>
                </div>
                <h1>300</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>CATEGORIES</h3>
                    <BsFillGrid3X3GapFill className='card_icon'/>
                </div>
                <h1>12</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>CUSTOMERS</h3>
                    <BsPeopleFill className='card_icon'/>
                </div>
                <h1>33</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>ALERTS</h3>
                    <BsFillBellFill className='card_icon'/>
                </div>
                <h1>42</h1>
            </div>
        </div>

        <div className='charts'>
            <ResponsiveContainer width="100%" height="100%">
            <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="GrossProfitMargin" fill="#FFAE49" />
                <Bar dataKey="NetProfitMargin" fill="#44B7C2" />
                <Bar dataKey="ReturnOnAssets" fill="#024B7A" />
                </BarChart>
            </ResponsiveContainer>

            <ResponsiveContainer width="100%" height="100%">
                <AreaChart width={730} height={250} data={data}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#FFAE49" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#FFAE49" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#44B7C2" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#44B7C2" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorCv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#024B7A" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#024B7A" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area type="monotone" dataKey="GrossProfitMargin" stroke="#FFAE49" fillOpacity={1} fill="url(#colorUv)" />
                    <Area type="monotone" dataKey="NetProfitMargin" stroke="#44B7C2" fillOpacity={1} fill="url(#colorPv)" />
                    <Area type="monotone" dataKey="ReturnOnAssets" stroke="#024B7A" fillOpacity={1} fill="url(#colorCv)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    </main>
  )
}

export default Home