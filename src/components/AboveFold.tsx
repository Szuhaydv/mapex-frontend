import { RefObject, useRef, useEffect } from "react"
import { Link } from "react-router-dom"
const AboveFold = () => {

    const square1 = useRef<HTMLDivElement>(null)
    const square2 = useRef<HTMLDivElement>(null)
    const square3 = useRef<HTMLDivElement>(null)
    const square4 = useRef<HTMLDivElement>(null)
    const square5 = useRef<HTMLDivElement>(null)
    const squares: RefObject<HTMLDivElement>[] = [square1,square2,square3,square4,square5]
    let firstSquare: number = 0
    let lastSquare: number = 4

    const buttonRefs: any = useRef([])
    const addToRefs = (el: any) => {
        if(el && !buttonRefs.current.includes(el)) {
            buttonRefs.current.push(el)
        }
    }
    const textRef = useRef<HTMLParagraphElement>(null)

    let currentSelected = 0
    
    const animation = (direction: string) => {
        squares.forEach((square) => {
            if (square.current) {
                const leftPos = square.current.style.left.match(/\d+/g)
                const topPos = square.current.style.top.match(/\d+/g)
                if (leftPos && topPos && direction) {
                    if (direction === 'next') {
                        square.current.style.left = +leftPos[0] + 5 + "%"
                        square.current.style.top = +topPos[0] + 5 + "%"
                        if (+square.current.style.zIndex === 5) {
                            square.current.style.zIndex = "1"
                        }
                        else {
                            square.current.style.zIndex = (+square.current.style.zIndex + 1).toString()
                        }
                    } else if (direction === 'prev') {
                        square.current.style.left = +leftPos[0] - 5 + "%"
                        square.current.style.top = +topPos[0] - 5 + "%"
                        if (+square.current.style.zIndex === 1) {
                            square.current.style.zIndex = "5"
                        }
                        else {
                            square.current.style.zIndex = (+square.current.style.zIndex - 1).toString()
                        }
                    } // else if (direction === 'doubleBack') {
                    //     square.current.style.left = +leftPos[0] - 10 + "%"
                    //     square.current.style.top = +topPos[0] - 10 + "%"
                    //     if (+square.current.style.zIndex === 1) {
                    //         square.current.style.zIndex = "4"
                    //     }
                    //     if (+square.current.style.zIndex === 2) {
                    //         square.current.style.zIndex = "5"
                    //     }
                    //     else {
                    //         square.current.style.zIndex = (+square.current.style.zIndex - 2).toString()
                    //     }
                    // }
                }
            }
        })
        let disappearingSquare = lastSquare == 0 ? 4 : lastSquare - 1
        let appearingSquare = firstSquare == 4 ? 0 : firstSquare + 1
        let middleSquare = firstSquare == 4 ? 1 : firstSquare == 3 ? 0 : firstSquare + 2
        const firstSQ = squares[firstSquare].current
        const lastSQ = squares[lastSquare].current
        const befLastSQ = squares[disappearingSquare].current
        const aftFirstSQ = squares[appearingSquare].current
        const thirdSQ = squares[middleSquare].current
            if (firstSQ && lastSQ && befLastSQ && aftFirstSQ && thirdSQ) {
                if (direction === 'next') {
                    firstSQ.style.opacity = "1"
                    befLastSQ.style.opacity = "0"
                    lastSQ.style.left = "15%"
                    lastSQ.style.top = "15%"
                    firstSquare == 0 ? firstSquare = 4 : firstSquare -= 1
                    lastSquare == 0 ? lastSquare = 4 : lastSquare -= 1 
                } else if (direction === 'prev') {
                    aftFirstSQ.style.opacity = "0"
                    lastSQ.style.opacity = "1"
                    firstSQ.style.left = "35%"
                    firstSQ.style.top = "35%"
                    firstSquare == 4 ? firstSquare = 0 : firstSquare += 1
                    lastSquare == 4 ? lastSquare = 0 : lastSquare += 1 
                } // else if (direction === 'doubleBack') {
                //     firstSQ.style.left = "35%"
                //     firstSQ.style.top = "35%"
                //     firstSQ.style.opacity = "1"
                //     firstSQ.style.left = "30%"
                //     firstSQ.style.top = "30%"
                //     aftFirstSQ.style.opacity = "0"
                //     aftFirstSQ.style.left = "35%"
                //     aftFirstSQ.style.top = "35%"
                //     firstSquare == 4 ? firstSquare = 0 : firstSquare += 1
                //     lastSquare == 4 ? lastSquare = 0 : lastSquare += 1 
                // }
            }
            
    }
    const doubleBack = () => {
        squares.forEach( square => square.current?.classList.add('doubleMove'))
        animation('prev')
        setTimeout(() => {
            animation('prev')
        }, 500)
        setTimeout(() => {
            squares.forEach(square => square.current?.classList.remove('doubleMove'))
        }, 1000)
    }
    const doubleForward = () => {
        squares.forEach( square => square.current?.classList.add('doubleMove'))
        animation('next')
        setTimeout(() => {
            animation('next')
        }, 500)
        setTimeout(() => {
            squares.forEach(square => square.current?.classList.remove('doubleMove'))
        }, 1000)
    }

    const calcAnimation = (e: any) => {
        clearInterval(autoSlide)
        setTimeout(() => {
            autoSlide = intervalSetter()
        }, 10000)
        let clickedBtn = -1
        switch(e.target.classList[1]) {
            case 'btn1':
                clickedBtn = 0
                break
            case 'btn2':
                clickedBtn = 1
                break
            case 'btn3':
                clickedBtn = 2
                break
            case 'btn4':
                clickedBtn = 3
                break
            case 'btn5':
                clickedBtn = 4
                break
        }
        if (currentSelected === clickedBtn || clickedBtn === -1) return
        if (currentSelected < clickedBtn) {
            if (clickedBtn - currentSelected === 1) animation('next')
            if (clickedBtn - currentSelected === 2) doubleForward()
            if (clickedBtn - currentSelected === 3) doubleBack()
            if (clickedBtn - currentSelected === 4) animation('prev')
        } else if (currentSelected > clickedBtn) {
            if (currentSelected - clickedBtn === 1) animation('prev')
            if (currentSelected - clickedBtn === 2) doubleBack()
            if (currentSelected - clickedBtn === 3) doubleForward()
            if (currentSelected - clickedBtn === 4) animation('next')
        }
        if (textRef.current) {
            switch (clickedBtn) {
                case 0:
                    textRef.current.innerHTML = 'Do you have <b>travel dreams, plans</b> or <b>goals</b>?'
                    break
                case 1:
                    textRef.current.innerHTML = 'Create <b>your own world map</b> with Mapex!'
                    break
                case 2:
                    textRef.current.innerHTML = 'And start filling it with <b>all your dream places</b>...'
                    break
                case 3:
                    textRef.current.innerHTML = 'Need some <b>inspiration?</b> You can always <b>look at what’s popular</b>!'
                    break
                case 4:
                    textRef.current.innerHTML = 'Interested? <b>Set up a Mapex account</b> in a few, easy steps!'
                    break
            }
        }
        
        buttonRefs.current[clickedBtn].classList.add('selected-button')
        if ([1,2,3].includes(clickedBtn)) {
            buttonRefs.current[clickedBtn].innerText = "Step " + clickedBtn
        }
        if ([1,2,3].includes(currentSelected)) {
            buttonRefs.current[currentSelected].innerText = currentSelected.toString()
        }
        buttonRefs.current[currentSelected].classList.remove('selected-button')
        currentSelected = clickedBtn
    }
    const intervalSetter = () => {
        const autoSlide = setInterval(() => {
            currentSelected += 1
            if (currentSelected === 5) currentSelected = 0
            if (textRef.current) {
                switch (currentSelected) {
                    case 0:
                        textRef.current.innerHTML = 'Do you have <b>travel dreams, plans</b> or <b>goals</b>?'
                        break
                    case 1:
                        textRef.current.innerHTML = 'Create <b>your own world map</b> with Mapex!'
                        break
                    case 2:
                        textRef.current.innerHTML = 'And start filling it with <b>all your dream places</b>...'
                        break
                    case 3:
                        textRef.current.innerHTML = 'Need some <b>inspiration?</b> You can always <b>look at what’s popular</b>!'
                        break
                    case 4:
                        textRef.current.innerHTML = 'Interested? <b>Set up a Mapex account</b> in a few, easy steps!'
                        break
                }
                buttonRefs.current[currentSelected].classList.add('selected-button')
                if ([1,2,3].includes(currentSelected)) {
                    buttonRefs.current[currentSelected].innerText = "Step " + currentSelected
                }
                if ([1,2,3].includes(currentSelected - 1)) {
                    buttonRefs.current[currentSelected - 1].innerText = (currentSelected - 1).toString()
                }
                currentSelected === 0 ?
                    buttonRefs.current[4].classList.remove('selected-button') :
                    buttonRefs.current[currentSelected - 1].classList.remove('selected-button')
                animation('next')
            }  
        }, 5000)
        return autoSlide
    }
    let autoSlide = intervalSetter()
    
    const iconRefs = useRef<any>([])
    const addToIcons = (el: any) => {
        if(el && !iconRefs.current.includes(el)) {
            iconRefs.current.push(el)
        }
    }
    let currentMapIcon = 0
    const changeMapIcon = (number: any) => {
        if (number == currentMapIcon) return;
        iconRefs.current[number].classList.remove('bi-geo')
        iconRefs.current[number].classList.add('bi-map')
        iconRefs.current[currentMapIcon].classList.remove('bi-map')
        iconRefs.current[currentMapIcon].classList.add('bi-geo')
        currentMapIcon = number
    }
    const connectLineRefs = useRef<any>([])
    const addToLines = (el: any) => {
        if (el && !connectLineRefs.current.includes(el)) {
            connectLineRefs.current.push(el)
        }
    }
    const connectColor = (start: any, end: any, string: any) => {
        if (string === 'black') {
            connectLineRefs.current.slice(start,end).forEach((element: any) => {
                element.classList.remove('connect-line-inblack')
            })
        } else if (string === 'white') {
            connectLineRefs.current.slice(start,end).forEach((element: any) => {
                element.classList.add('connect-line-inblack')
            })
        }
    }
    useEffect(() => {
        const getSection: any = document.getElementById('home')?.offsetHeight
        const sectionHeight = getSection - 70 
        const remSize = parseFloat(getComputedStyle(document.documentElement).fontSize)
        const iconSize = 3 * remSize
        const lineSize = (sectionHeight - 70) * 0.11
        const marginSize = ((sectionHeight - 70) - (3*lineSize) - (4*iconSize)) / 2
        const topOfFirstLine = marginSize + iconSize + lineSize + remSize
        const topOfSecondLine = topOfFirstLine + iconSize + lineSize
        const topOfThirdLine = topOfSecondLine + iconSize + lineSize
        const onScroll = () => {
            let pos = window.scrollY
            if (pos < sectionHeight*0.6) {
                changeMapIcon(0)
            } else if (pos >= sectionHeight* 0.6 && pos < sectionHeight * 1.6) {
                changeMapIcon(1)
            } else if (pos >= sectionHeight * 1.6 && pos < sectionHeight * 2.6) {
                changeMapIcon(2)
            } else if (pos >= sectionHeight * 2.6) {
                changeMapIcon(3)
            }

            if (pos <= topOfFirstLine) {
                connectColor(0, 3, 'black')
            } else if (pos >= topOfFirstLine && pos < topOfSecondLine) {
                connectColor(2, 3, 'white')
                connectColor(0, 2, 'black')
            } else if (pos >= topOfSecondLine && pos < topOfThirdLine) {
                connectColor(1, 3, 'white')
                connectColor(0, 1, 'black')
            } else if (pos >= topOfThirdLine && pos < topOfFirstLine + sectionHeight) {
                connectColor(0, 3, 'white')
            } else if (pos >= topOfFirstLine + sectionHeight && pos < topOfSecondLine + sectionHeight) {
                connectColor(2, 3, 'black')
                connectColor(0, 2, 'white')
            } else if (pos >= topOfSecondLine + sectionHeight && pos < topOfThirdLine + sectionHeight) {
                connectColor(1, 3, 'black')
                connectColor(0, 1, 'white')
            } else if (pos >= topOfThirdLine + sectionHeight && pos < topOfFirstLine + 2*sectionHeight) {
                connectColor(0, 3, 'black')
            } else if (pos >= topOfFirstLine + 2*sectionHeight && pos < topOfSecondLine + 2*sectionHeight) {
                connectColor(2, 3, 'white')
                connectColor(0, 2, 'black')
            } else if (pos >= topOfSecondLine + 2*sectionHeight && pos < topOfThirdLine + 2*sectionHeight) {
                connectColor(1, 3, 'white')
                connectColor(0, 1, 'black')
            } else if (pos >= topOfThirdLine + 2*sectionHeight) {
                connectColor(0, 3, 'white')
            }
        }
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll)   
        }
    }, []);
    return (
        <div className="d-flex above-fold" id="home">
            <div className="site-sidebar">
                <a href="#home">
                    <i ref={addToIcons} className="bi bi-map map-icon h1"></i>
                </a>
                <div ref={addToLines} className="connect-line"></div>
                <a href="#popular-pinmaps">
                    <i ref={addToIcons} className="bi bi-geo h1"></i>
                </a>
                <div ref={addToLines} className="connect-line"></div>
                <a href="#blog-contact">
                    <i ref={addToIcons} className="bi bi-geo h1"></i>
                </a>
                <div ref={addToLines} className="connect-line"></div>
                <a href="#pricing">
                    <i ref={addToIcons} className="bi bi-geo h1"></i>
                </a>
            </div>
            <section className='maps position-relative'>
                <div ref={square1} style={{left:"15%", top: "15%", zIndex: "1", opacity: "0"}} className='square1 shadow-lg d-flex align-items-center position-absolute w-50'>
                    <img src="./illustration1.svg" alt="People serching up what's popular" />
                </div>
                <div ref={square2} style={{zIndex: "2", left:"20%", top: "20%"}} className='square2 d-flex shadow-lg align-items-end position-absolute w-50'>
                    <img src="./illustration2.svg" alt="Image of famous landmarks" />
                </div>
                <div ref={square3} style={{zIndex: "3", left:"25%", top: "25%"}} className='square3 shadow-lg position-absolute w-50'>
                    <img src="./illustration3.png" alt="Image of a map with the 7 wonders" />
                </div>
                <div ref={square4} style={{zIndex: "4", left:"30%", top: "30%"}} className='square4 shadow-lg position-absolute w-50'>
                    <img src="./illustration4.svg" alt="Image of people ready to travel" />
                </div>
                <div ref={square5} style={{zIndex: "5", left:"35%", top: "35%", opacity: "0"}} className='square5 shadow-lg position-absolute w-50'>
                    <img src ="./illustration5.svg" alt="Image of famous landmarks" />
                </div>
                <div className="slider-control position-absolute d-flex justify-content-center gap-4 w-50">
                    <button ref={addToRefs} onClick={(e) => calcAnimation(e)} className="btn btn1 selected-button d-flex align-items-center justify-content-center">?</button>
                    <button ref={addToRefs} onClick={(e) => calcAnimation(e)} className="btn btn2 d-flex align-items-center justify-content-center">1</button>
                    <button ref={addToRefs} onClick={(e) => calcAnimation(e)} className="btn btn3 d-flex align-items-center justify-content-center">2</button>
                    <button ref={addToRefs} onClick={(e) => calcAnimation(e)} className="btn btn4 d-flex align-items-center justify-content-center">3</button>
                    <button ref={addToRefs} onClick={(e) => calcAnimation(e)} className="btn btn5 d-flex align-items-center justify-content-center">!</button>                    
                </div>
                <div className="text-center slider-text position-absolute w-50 d-flex justify-content-center">
                    <p ref={textRef}>
                        Do you have <b>travel dreams, plans</b> or <b>goals</b>?
                    </p>
                </div>
            </section>
            <section className="hero position-relative">
                <div className="position-absolute hero-text d-flex flex-column">
                    <h1>MAPEX</h1>
                    <h3>It might have been mapped,<br/>
                    but has it been explored?</h3>
                    <Link to='/mymaps'>
                        <button className="btn btn-danger align-self-start">START MAPPING!</button>
                    </Link>
                </div>
                <div className="black-line"></div>
                <div className="black-circle"></div>
                <div className="explore-text">Explore!</div>
            </section>
        </div>
    )
}

export default AboveFold