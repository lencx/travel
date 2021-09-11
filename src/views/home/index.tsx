import React, { useState } from 'react';
import heic2any from "heic2any";
import travelData from 'data/travel.json';

import Modal from '@comps/Modal';

import './index.scss';

export default function HomeView() {
  const [currImg, setImg] = useState('');
  const handleFullScreen = async (path: string) => {
    const res = await fetch(path)
      .then((res) => res.blob())
      .then((blob) => heic2any({ blob }));

    setImg(URL.createObjectURL(res));
  };

  return (
    <div className="home-view">
      <div>
        {travelData.map((item: any) => {
          return (
            <div key={item.type}>
              <h2>{item.name}</h2>
              <ul>
                {item.data.map((i: string) => {
                  return (
                    <li key={i} onClick={() => handleFullScreen(i.replace(/^imgs/, 'pictures').replace(/.png$/, '.heic'))}>
                      <img key={i} src={i} alt="" />
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
        <Modal open={!!currImg} onClose={() => setImg('')}>
          <div className="fullscreen"><img src={currImg} /></div>
        </Modal>
      </div>
    </div>
  );
}
