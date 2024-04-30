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
                <stripe-buy-button
                buy-button-id="buy_btn_1OdIQXCKp5tSawCx09bzSPcz"
                publishable-key="pk_test_51OGGa8CKp5tSawCxZps4QKwg1sh7XqGgtiU66PbgDQt2ofykONeVNR50gJjFpf2P6kRPK49r9USh89HDNg53fmZw00osx2M9Ka"
                >
                </stripe-buy-button>
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
                <stripe-buy-button
                buy-button-id="buy_btn_1OSM5NCKp5tSawCxgRU8LLbx"
                publishable-key="pk_test_51OGGa8CKp5tSawCxZps4QKwg1sh7XqGgtiU66PbgDQt2ofykONeVNR50gJjFpf2P6kRPK49r9USh89HDNg53fmZw00osx2M9Ka"
                >
                </stripe-buy-button>
                <div className="pros">
                    <div className="pro">
                        <img src="./checkmark.svg" alt="" />
                        10 maps per week
                    </div>
                    <div className="pro">
                        <img src="./checkmark.svg" alt="" />
                        5 custom icons
                    </div>
                    <div className="pro">
                        <img src="./checkmark.svg" alt="" />
                        Use of hashtags
                    </div>
                    <div className="pro">
                        <img src="./checkmark.svg" alt="" />
                        Private maps
                    </div>
                </div>
            </li>    
            <li>
                <h3>VIP Plan</h3>
                <p>Try out Mapex for free, upgrade when you feel comfortable!</p>
                <h2>5 $ / year</h2>
                <stripe-buy-button
                buy-button-id="buy_btn_1OSMDMCKp5tSawCxAcgh4DyS"
                publishable-key="pk_test_51OGGa8CKp5tSawCxZps4QKwg1sh7XqGgtiU66PbgDQt2ofykONeVNR50gJjFpf2P6kRPK49r9USh89HDNg53fmZw00osx2M9Ka"
                >
                </stripe-buy-button>
                <div className="pros">
                    <div className="pro">
                        <img src="./checkmark.svg" alt="" />
                        Unlimited maps
                    </div>
                    <div className="pro">
                        <img src="./checkmark.svg" alt="" />
                        Unlimited custom icons
                    </div>
                    <div className="pro">
                        <img src="./checkmark.svg" alt="" />
                        Private maps
                    </div>
                </div>
            </li>     
        </ul>
    </div>
  )
}

export default Pricing