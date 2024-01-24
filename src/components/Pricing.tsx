const Pricing = () => {
  return (
    <div className='pricing' id="pricing">
        <div className="line"></div>
        <h2 className="pricing-title">Pick a plan that's right for you</h2>
        <ul>
            <li>
                <h3>Starter Plan</h3>
                <p>Try out Mapex for free, upgrade when you feel comfortable!</p>
                <h2>Free</h2>
                <button className="btn btn-primary">Select Plan</button>
                <div className="pros">
                    <div className="pro">
                        <img src="./checkmark.svg" alt="" />
                        3 maps per week
                    </div>
                    <div className="pro">
                        <img src="./checkmark.svg" alt="" />
                        1 custom icon
                    </div>
                    <div className="pro">
                        <img src="./checkmark.svg" alt="" />
                        Use of hashtags
                    </div>
                </div>
            </li>    
            <li className="selected-plan">
                <h3>Advanced Plan</h3>
                <p>Try out Mapex for free, upgrade when you feel comfortable!</p>
                <h2>2 $ / year</h2>
                <button className="btn btn-primary">Select Plan</button>
                <div className="pros">
                    <div className="pro">
                        <img src="./checkmark.svg" alt="" />
                        3 maps per week
                    </div>
                    <div className="pro">
                        <img src="./checkmark.svg" alt="" />
                        1 custom icon
                    </div>
                    <div className="pro">
                        <img src="./checkmark.svg" alt="" />
                        Use of hashtags
                    </div>
                </div>
            </li>    
            <li>
                <h3>VIP Plan</h3>
                <p>Try out Mapex for free, upgrade when you feel comfortable!</p>
                <h2>5 $ / year</h2>
                <button className="btn btn-primary">Select Plan</button>
                <div className="pros">
                    <div className="pro">
                        <img src="./checkmark.svg" alt="" />
                        3 maps per week
                    </div>
                    <div className="pro">
                        <img src="./checkmark.svg" alt="" />
                        1 custom icon
                    </div>
                    <div className="pro">
                        <img src="./checkmark.svg" alt="" />
                        Use of hashtags
                    </div>
                </div>
            </li>     
        </ul>
    </div>
  )
}

export default Pricing