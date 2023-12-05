import React, { useEffect, useState } from "react";
import "./style.css";
import ProgressCard from "./ProgressCard";
import { HandSvg, ProgressRing, PlayBtn } from "./svg";
import Api from "../../services/Api";

export default function Home() {
  const [active, setActive] = useState({
    vocabulary: true,
    listening: false,
    reading:false
  });
  const [progress, setProgress] = useState({
    vocabulary:'',
    reading: '',
    listening: ''
  })

  useEffect(() => {
    const userId = localStorage['userId'];
    const categoryId = sessionStorage['categoryId'];
    Api.getDataForHome(userId, categoryId)
    .then(res => {
      console.log(res.data);
      let newState = {...progress};
      newState.vocabulary = res?.data.data[0];
      newState.reading = res?.data.data[1];
      newState.listening = res?.data.data[2];
      setProgress(newState);
    })
  }, []);
  const handleActiveCard = (data) => {
    const newState = { ...active };
    switch (data) {
      case "vocabulary": {
        newState.listening = false;
        newState.vocabulary = true;
         newState.reading= false
        setActive(newState);
        break;
      }

      case "listening": {
        newState.vocabulary = false;
        newState.listening = true;
        newState.reading= false
        setActive(newState);
        break;
      }
       case "reading": {
        newState.vocabulary = false;
        newState.listening = false;
        newState.reading= true
        setActive(newState);
        break;
      }
    }
  };
  return (
    <div className="home-page col-10">
      <h2 className="home-page-title">Thành tích của bạn</h2>
      <div className="progress-card-wrapper">
        <ProgressCard
          iconTitle={<HandSvg />}
          title="Vocabulary"
          step={`${progress.vocabulary?.completed || 0}/${progress.vocabulary?.total || 0}`}
          progressRing={<ProgressRing stroke1="#5DE7C0" stroke2="#E3FFF7" />}
          bgC="#00A778"
          activeCardFnc={handleActiveCard}
          activeCard={active.vocabulary}
          typeCard="vocabulary"
          nextLesson={progress.vocabulary?.next ? progress.vocabulary?.next[0]?.title : 'N/A'}
        />
        <ProgressCard
          iconTitle={<PlayBtn />}
           title="Reading"
           step={`${progress.reading?.completed || 0}/${progress.reading?.total || 0}`}
          progressRing={<ProgressRing stroke1="#FFBFBC" stroke2="#FFF9F9" />}
          bgC="#E46962"
          activeCardFnc={handleActiveCard}
          activeCard={active.reading}
          typeCard="reading"
          nextLesson={progress.reading?.next ?  progress.reading?.next[0]?.title : 'N/A'}
        />
         <ProgressCard
          iconTitle={<PlayBtn />}
           title="Listening"
           step={`${progress.listening?.completed || 0}/${progress.listening?.total || 0}`}
          progressRing={<ProgressRing stroke1="#FFBFBC" stroke2="#FFF9F9" />}
          bgC="#E46962"
          activeCardFnc={handleActiveCard}
          activeCard={active.listening}
          typeCard="listening"
          nextLesson={progress.listening?.next ? progress.listening?.next[0]?.title : 'N/A'}
        />
      </div>
    </div>
  );
}
