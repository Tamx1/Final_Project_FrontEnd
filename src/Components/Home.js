import '../App.css';

function Home() {

  return (<>
    <header className="bg-dark py-5">
    <div className="container px-5">
      <div className="row gx-5 justify-content-center">
            <div className="col-lg-6">
                <div className="text-center my-5">
                    <h1 className="display-6 fw-bolder text-white mb-2">Online Auction Platform present your business in a whole new way</h1>
                    <p className="lead text-white-50 mb-4">The electronic auction platform allows bidders to bid electronically on the goods sold in the auction using electronic payment methods</p>
                    <div className="d-grid gap-3 d-sm-flex justify-content-sm-center">
                        <a className="btn btn-primary btn-lg px-4 me-sm-3" href="/auctions">Get Started</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</header>
<section className="py-5 border-bottom" id="features">
    <div className="container px-5 my-5">
        <div className="row gx-5">
            <div className="col-lg-4 mb-5 mb-lg-0 border-right border-dark mb-5  mt-5">
           <p className='text-center'> <i className="fa fa-laptop fa-5x" aria-hidden="true"></i></p>

                <div className="feature bg-primary bg-gradient text-white rounded-3 "><i className=""></i></div>
                <h2 className="h4 fw-bolder text-center">Participate in the remote auction</h2>
                <p className='text-center'>The bidder can participate in the auctions electronically without the need to be present on the auction site.</p>

            </div>
            <div className="col-lg-4 mb-5 mb-lg-0 border-right border-dark mb-5  mt-5">
            <p className='text-center'> <i className="fa  fa-clock-o fa-5x" aria-hidden="true"></i></p>

                <h2 className="h4 fw-bolder text-center">Bid in more than one auction at the same time</h2>
                <p className='text-center'>A bidder can participate in more than one auction at the same time without the need to attend any of them.</p>

            </div>
            <div className="col-lg-4">
                <div className="feature bg-primary bg-gradient text-white rounded-3 mb-5  mt-5"><i className="bi bi-toggles2"></i></div>
                <p className='text-center'> <i className="fa fa-money fa-5x" aria-hidden="true"></i></p>
                <h2 className="h4 fw-bolder text-center">Electronic payment methods</h2>
                <p className='text-center'>Electronic payment methods
Amounts can be paid and refunded through electronic payment methods via Visa or MasterCard, etc.</p>

            </div>
        </div>
    </div>
</section>


</>
  );
}

export default Home;
