import React from 'react';
import { AdvancedRealTimeChart } from 'react-ts-tradingview-widgets';

const Charts = () => {
  return (
    <div id="my-container" className="container rounded-3xl mt-8 pt-4 pb-6">
    <AdvancedRealTimeChart width={600} autosize symbol="ETHUSDT" theme="dark"/>
  </div>
  )
}

export default Charts;