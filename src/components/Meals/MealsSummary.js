import classes from "./MealsSummary.module.css";

const MealsSummary = () => {
  return (
    <div className={classes.slider}>
      <div className={classes.slideTrack}>
        <div className={[classes.facilities, classes.deliver].join(" ")}>
          <p className={classes.deliverFChild}>Delicious Food </p>
          <div className={classes.deliverSChild}>
            <div className={classes.deliverTChild}>
              <p>delivered to you</p>
              <p>
                within <span>6km radius</span>
              </p>
            </div>
            <div>
              <img src="images/food.png" alt="BigCo Inc. logo" />
            </div>
          </div>
        </div>

        <div className={[classes.facilities, classes.order].join(" ")}>
          <p className={classes.orderFChild}>Order</p>
          <div className={classes.orderSChild}>
            <div className={classes.orderTChild}>
              <p>anytime</p>
              <p>
                Open <span>24X7</span>
              </p>
            </div>
            <div>
              <img src="images/twentyseven.png" alt="BigCo Inc. logo" />
            </div>
          </div>
        </div>

        <div className={[classes.facilities, classes.free].join(" ")}>
          <p className={classes.freeFChild}>Free Delivery</p>
          <div className={classes.freeSChild}>
            <div className={classes.freeTChild}>
              <p>
                Above <span> ₹199/-</span>
              </p>
            </div>
            <div>
              <img src="images/motorbike.png" alt="BigCo Inc. logo" />
            </div>
          </div>
        </div>

        <div className={[classes.facilities, classes.min].join(" ")}>
          <p className={classes.minFChild}>Super Fast</p>
          <div className={classes.minSChild}>
            <div className={classes.minTChild}>
              <p>delivery</p>
              <p>
                within <span>30 min</span>
              </p>
            </div>
            <div>
              <img src="images/thirtymin.png" alt="BigCo Inc. logo" />
            </div>
          </div>
        </div>

        <div className={[classes.facilities, classes.deliver].join(" ")}>
          <p className={classes.deliverFChild}>Delicious Food </p>
          <div className={classes.deliverSChild}>
            <div className={classes.deliverTChild}>
              <p>delivered to you</p>
              <p>
                within <span>6km radius</span>
              </p>
            </div>
            <div>
              <img src="images/food.png" alt="BigCo Inc. logo" />
            </div>
          </div>
        </div>

        <div className={[classes.facilities, classes.order].join(" ")}>
          <p className={classes.orderFChild}>Order</p>
          <div className={classes.orderSChild}>
            <div className={classes.orderTChild}>
              <p>anytime</p>
              <p>
                Open <span>24X7</span>
              </p>
            </div>
            <div>
              <img src="images/twentyseven.png" alt="BigCo Inc. logo" />
            </div>
          </div>
        </div>

        <div className={[classes.facilities, classes.free].join(" ")}>
          <p className={classes.freeFChild}>Free Delivery</p>
          <div className={classes.freeSChild}>
            <div className={classes.freeTChild}>
              <p>
                Above <span> ₹199/-</span>
              </p>
            </div>
            <div>
              <img src="images/motorbike.png" alt="BigCo Inc. logo" />
            </div>
          </div>
        </div>

        <div className={[classes.facilities, classes.min].join(" ")}>
          <p className={classes.minFChild}>Super Fast</p>
          <div className={classes.minSChild}>
            <div className={classes.minTChild}>
              <p>delivery</p>
              <p>
                within <span>30 min</span>
              </p>
            </div>
            <div>
              <img src="images/thirtymin.png" alt="BigCo Inc. logo" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealsSummary;
