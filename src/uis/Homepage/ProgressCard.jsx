import React from 'react'
import { useNavigate } from "react-router-dom";
 
export default function ProgressCard({ iconTitle, progressRing, bgC, typeCard, activeCardFnc, activeCard,title,step, nextLesson }) {
    const navigate = useNavigate();
    const handleActiveCard = (typeCard) => {
        activeCardFnc(typeCard)
    }
    const onClickButton = () => {
        console.log('1')
        sessionStorage['courseId'] = 1
        navigate('/dashboard/vocabulary');
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
                <div class="circle-text">
                    <p class="sc-r8akwn-7 lhiYoM">Lesson</p>
                </div>
            </div>
            <div className='next-activity-card'>
                <div class="activity-card-title">Tiếp theo dành cho bạn</div>
                <div class="activity-card-input">
                    <button class="scenarioCard-first">
                        <div className='scenarioCard-first-content'>
                            <div class="scenarioCard-content">
                                <div class="scenarioCard-content-title">
                                    <h5 class="ScenarioCardInProgress-Wrapper-title">{nextLesson}</h5>
                                </div>
                                <div data-testid="progressBar-0" class="sc-15t60mv-0 jykhnm">
                                    <div color="black" class="sc-15t60mv-1 bJnwRw">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </button>
                    <button  onClick={ onClickButton} class="scenarios-button-second">
                        <div class="scenarios-button-second-title" >Học tình huống này</div>
                    </button>
                    <button onClick={ onClickButton} class="scenarios-button-third">
                        <div class="sc-p01vsu-2 dTZeul"  >Các tình huống khác</div>
                    </button>
                </div>
            </div>
        </div>
    )
}
