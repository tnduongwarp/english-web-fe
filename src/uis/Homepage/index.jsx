import React, { useEffect, useState } from "react";
import "./style.css";
import ProgressCard from "./ProgressCard";
import { HandSvg, ProgressRing, PlayBtn } from "./svg";

export default function Home() {
  const [active, setActive] = useState({
    vocabulary: true,
    listen: false,
    talk:false
  });

  const handleActiveCard = (data) => {
    const newState = { ...active };
    switch (data) {
      case "vocabulary": {
        newState.listen = false;
        newState.vocabulary = true;
         newState.talk= false
        setActive(newState);
        break;
      }

      case "listen": {
        newState.vocabulary = false;
        newState.listen = true;
        newState.talk= false
        setActive(newState);
        break;
      }
       case "talk": {
        newState.vocabulary = false;
        newState.listen = false;
        newState.talk= true
        setActive(newState);
        break;
      }
    }
  };
  return (
    <div className="home-page col-10">
      <h2 className="home-page-title">Tiến độ hàng tuần</h2>
      <div className="progress-card-wrapper">
        <ProgressCard
          iconTitle={<HandSvg />}
          title="Xây dựng vốn từ vựng"
          step="0/35"
          progressRing={<ProgressRing stroke1="#5DE7C0" stroke2="#E3FFF7" />}
          bgC="#00A778"
          activeCardFnc={handleActiveCard}
          activeCard={active.vocabulary}
          typeCard="vocabulary"
        />
        <ProgressCard
          iconTitle={<PlayBtn />}
           title="Luyện tập lắng nghe"
           step="0/5"
          progressRing={<ProgressRing stroke1="#FFBFBC" stroke2="#FFF9F9" />}
          bgC="#E46962"
          activeCardFnc={handleActiveCard}
          activeCard={active.listen}
          typeCard="listen"
        />
         <ProgressCard
          iconTitle={<PlayBtn />}
           title="Luyện tập nói"
           step="0/5"
          progressRing={<ProgressRing stroke1="#FFBFBC" stroke2="#FFF9F9" />}
          bgC="#E46962"
          activeCardFnc={handleActiveCard}
          activeCard={active.talk}
          typeCard="talk"
        />
      </div>
    </div>
  );
}
