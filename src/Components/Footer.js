import '../App.css';

function Footer() {
  return (
  <footer className="site-footer">
  <div className="container">
    <div className="row">
      <div className="col-sm-12 col-md-6">
        <h6>About</h6>
        <p className="text-justify">Online auction is a worldwide marketplace with treasures waiting to be discovered, whether you're an avid collector or first-time visitor.

By hosting thousands of auctions in real time via the Internet, the site allows unprecedented access to remote sales, and savvy bidders can often land desired items at very desirable prices.</p>
      </div>

      <div className="col-xs-6 col-md-3">
        <h6>Categories</h6>
        <ul className="footer-links">
          <li><a href="/auctions">All Auctions</a></li>
          <li><a href="/auctions">Current Auction</a></li>
          <li><a href="/auctions">Upcoming Auction</a></li>
          <li><a href="/auctions">Closed Auction</a></li>
        </ul>
      </div>

      <div className="col-xs-6 col-md-3">
        <h6>Quick Links</h6>
        <ul className="footer-links">
        <li><a href="/">Home</a></li>
          <li><a href="/auctions">Auctions</a></li>
          <li><a href="/login">Login</a></li>
          <li><a href="/sign_up">Sign up</a></li>
        </ul>
      </div>
    </div>
    <hr/>
  </div>
  <div className="container">
    <div className="row">
      <div className="col-md-8 col-sm-6 col-xs-12">
        <p className="copyright-text">Copyright &copy; 2021 All Rights Reserved by 
     <a href="#"> Tameem Alsulmi</a>.
        </p>
      </div>

      <div className="col-md-4 col-sm-6 col-xs-12">
        <ul className="social-icons">
          <li><a className="facebook" href="#"><i className="fa fa-facebook"></i></a></li>
          <li><a className="twitter" href="#"><i className="fa fa-twitter"></i></a></li>
          <li><a className="dribbble" href="#"><i className="fa fa-instagram"></i></a></li>
          <li><a className="linkedin" href="#"><i className="fa fa-linkedin"></i></a></li>   
        </ul>
      </div>
    </div>
  </div>
</footer>
  );
}

export default Footer;
