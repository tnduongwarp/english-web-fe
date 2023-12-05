import React from 'react'

export default function ProgressCard({ iconTitle, progressRing, bgC, typeCard, activeCardFnc, activeCard,title,step }) {

    const handleActiveCard = (typeCard) => {
        activeCardFnc(typeCard)
    }
    return (
        <div className={activeCard ? 'progress-card active-card' : 'progress-card'} style={{ background: `none ${bgC}` }} onClick={() => handleActiveCard(typeCard)}>
            <div className='circle'>
                <div class="circle-title">
                    <span class="circle-title-icon">
                        {iconTitle}
                    </span>
                    <div class="circle-title-text">{title}</div>
                </div>
                <div class="circle-progress">{step}
                    <div class="circle-progress-icon">
                        <div data-testid="progressRing" class="progressRing">
                            {progressRing}
                        </div>
                    </div>
                </div>
                <div class="circle-text">
                    <p class="sc-r8akwn-7 lhiYoM">từ</p>
                </div>
            </div>
            <div className='next-activity-card'>
                <div class="activity-card-title">Tiếp theo dành cho bạn</div>
                <div class="activity-card-input">
                    <button class="scenarioCard-first">
                        <div className='scenarioCard-first-content'>
                            <div class="scenarioCard-content">
                                <div class="scenarioCard-content-title">
                                    <h5 class="ScenarioCardInProgress-Wrapper-title">Chào Hỏi</h5>
                                </div>
                                <div data-testid="progressBar-0" class="sc-15t60mv-0 jykhnm">
                                    <div color="black" class="sc-15t60mv-1 bJnwRw">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </button>
                    <button class="scenarios-button-second">
                        <div class="scenarios-button-second-title">Học tình huống này</div>
                    </button>
                    <button class="scenarios-button-third">
                        <div class="sc-p01vsu-2 dTZeul">Các tình huống khác</div>
                    </button>
                </div>
            </div>
        </div>
    )
}
