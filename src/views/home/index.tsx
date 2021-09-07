import React from 'react';
import heic2any from "heic2any";
import travelData from 'data/travel.json';

import './index.scss';

export default function AboutView() {
  return (
    <div className="home-view">
      <div>
        {travelData.map((item: any) => {
          return (
            <div key={item.type}>
              <h2>{item.name}</h2>
              <ul>
                {item.data.map((i: string) => {
                  return <li><img key={i} src={i} alt="" loading="lazy" /></li>
                })}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  );
}
