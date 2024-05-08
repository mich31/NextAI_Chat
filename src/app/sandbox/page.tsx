'use client'

import { useState } from 'react';
import { readStreamableValue } from 'ai/rsc';
import { getWeather, runThread } from '../actions';

export default function Page() {
    const [weather, setWeather] = useState<any>(null);
    const [status, setStatus] = useState<any>('');
  
    return (
      <div>
        <button
          onClick={async () => {
            const weatherUI = await getWeather();
            setWeather(weatherUI);
          }}
        >
          What&#39;s the weather?
        </button>
  
        {weather}

        <br/>

        <button onClick={
            async () => {
                const { status } = await runThread();
                for await (const value of readStreamableValue(status)) {
                    console.log(value);
                    setStatus(value);
                }
            }}
        >
            Get status
        </button>
        <div>{status}</div>
      </div>
    );
}
