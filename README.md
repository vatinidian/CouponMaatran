# CouponMaatran
React web application to exchange coupons (This is a Learning app )
<br/>
<b>Idea</b> :
  Usually many of our coupons / vouchers will get wasted due to many factors or we dont have the required coupon which we wanted. This could be avoided if we share /exchange coupons with other coupon which we want or we can buy for money with less price (Both Buyer and Seller Profits).
  <br/>
  <br/>
  Using this application, coupons can be exchanged among the community of people or in a corporate environment, basically among the closed trustable group. So this application does not need to handle the Money Transaction or any transaction problem.
  1. Exchange Coupons with other's coupon
  2. Exchange coupons for money (Users can negotiate to buy and seller can select from best)
  3. No Monetary transactions are handled by this app.
  4. Location of the Seller / Buyer will be shared (only if allowed by the respective user) and users can select to either pick coupon or get the coupon delivered by seller. This could be possible, since this app is for closed community , people could easily meet and trust each other.
  5. Users can rate each other which will boost the trust score and users will be blocked either based on low trust score or any legal issues.
  6. Notification system to notify user about buyer interest on coupons , negotiation , bidding (?) , messaging (?).

# Current Status:
Initial Development phase. <br/>
<b> React Router Package is being used to enable page level routing. This forced me to redesign app layout structuring and move state information to store (Moved Header as Common Portion across components). Now Layout Structure Follows as below format:
  ```xml
  <Layout>
    <Header />
    <Router>
      <Route path="/" component={SearchContent} />
    </Router>
  </Layout> 
  ```
  </br>
<b> New Feature (12th Dec 2019): </br>
                 Login Feature is enabled and enforcing user to login only before taking any action like "Adding New Coupons". </br>
                 Login feature implemented using BasiAuth in Middleware- express js side along with password hasing + salt in mongoose. </br> 
  This needs to be improved further to restrict login failed attempts, keep user signed on , SignUp page, logout feature, forgot password and etc. (phww too many things !) <b> <br/> <br/>

<b>Regarding Add Coupon Form </b> : Validations are implemented before adding new coupon.</br> </br>

<i>(5th Dec 2019)-> Enhanced with REDUX store container.</i><br/>
  i.  Maintain the SubFilter Items information in Redux Store and Use it in Carousel Component.<br/>
  ii. Created the user preference reducer to store user preferences in the current session , right now implemented for Sub Filter Item Selection
  <br/>
 
  1. Simple Search page to list all coupons is finished.
  ![Alt text](CouponMaatran_BuildUp3.png?raw=true)
  
  2. Created Carousel control for filtering to get more refined result of coupons. (Filtering logic is implemented)
  ![](CarouselFilter2.png?raw=true)
  
  3. Add Coupon Modal design is changed and new design style tried out and fully functional UI ready with validations.
  ![](AddCouponForm2.png?raw=true)

# Technology Stack:
  1. UI/Client - React Js
  2. BackEnd - NodeJs/Express
  3. DB - MongoDB

