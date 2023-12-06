import React from 'react'
import { useNavigate } from "react-router-dom";
 
export default function ProgressCard({ iconTitle, progressRing, bgC, typeCard, activeCardFnc, activeCard,title,step, nextLesson, nextLessonId, nextWordIds }) {
    const navigate = useNavigate();
    const handleActiveCard = (typeCard) => {
        activeCardFnc(typeCard)
    }
    const onClickButton1 = () => {
        
        sessionStorage['wordIds'] = nextWordIds;
        sessionStorage['lessonId'] = nextLessonId;
        if(typeCard === 'vocabulary'){
            sessionStorage['courseId'] = 1;
            navigate('/dashboard/vocabulary/vocabulary-lesson/');
        }
            
        else if(typeCard === 'reading'){
            sessionStorage['courseId'] = 2;
            navigate('/dashboard/reading/reading-lesson/');
        }
            
    }

    const onClickButton2 = () => {
        
        if(typeCard === 'vocabulary'){
            sessionStorage['courseId'] = 1;
            navigate('/dashboard/vocabulary');
        }
            
        else if(typeCard === 'reading'){
            sessionStorage['courseId'] = 2;
            navigate('/dashboard/reading');
        }
    }

    return (
        <div className={activeCard ? 'progress-card active-card' : 'progress-card'} style={{ background: `none ${bgC}` }} onClick={() => handleActiveCard(typeCard)}>
            <div className='circle'>
                <div className="circle-title">
                    <span className="circle-title-icon">
                        {iconTitle}
                    </span>
                    <div className="circle-title-text">{title}</div>
                </div>
                <div className="circle-progress">{step}
                    <div className="circle-progress-icon">
                        <div data-testid="progressRing" className="progressRing">
                            {progressRing}
                        </div>
                    </div>
                </div>
                <div className="circle-text">
                    <p className="sc-r8akwn-7 lhiYoM">Lesson</p>
                </div>
            </div>
            <div className='next-activity-card'>
                <div className="activity-card-title">Tiếp theo dành cho bạn</div>
                <div className="activity-card-input">
                    <button className="scenarioCard-first">
                        <div className='scenarioCard-first-content'>
                            <div className="scenarioCard-content">
                                <div className="scenarioCard-content-title">
                                    <h5 className="ScenarioCardInProgress-Wrapper-title">{nextLesson}</h5>
                                </div>
                                <div data-testid="progressBar-0" className="sc-15t60mv-0 jykhnm">
                                    <div color="black" className="sc-15t60mv-1 bJnwRw">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </button>
                    <button disabled = {((!nextLessonId || !nextWordIds)&& typeCard === 'vocabulary') || ((!nextLessonId) && typeCard==='reading')} onClick={ onClickButton1} className="scenarios-button-second">
                        <div className="scenarios-button-second-title" >Học tình huống này</div>
                    </button>
                    <button onClick={ onClickButton2} class="scenarios-button-third">
                        <div className="sc-p01vsu-2 dTZeul"  >Các tình huống khác</div>
                    </button>
                </div>
            </div>
        </div>
    )
}
