import React from "react";
import "../../css/contact.css";

export default function ContactUs() {
  return (
    <div className="Contact">
      <footer id="footer">
        <div className="footer-top">
          <div className="contactUs">
            <div className="row">
              <div className="col-lg-3 col-md-6 footer-contact">
                <h3>HelpingHand</h3>
                <p>
                  14, Suhash Nagar <br />
                  Versova, Mumbai-400058
                  <br />
                  India <br />
                  <br />
                  <strong>Phone:</strong> +91 65-8402-8590
                  <br />
                  <strong>Email:</strong> info@thesparksfoundation.sg
                  <br />
                </p>
              </div>
              <div className="col-lg-8 mt-5 mt-lg-0">
                <form method="post" role="form" className="php-email-form">
                  <div className="row">
                    <div className="col-md-6 form-group">
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        id="name"
                        placeholder="Your Name"
                        required
                      />
                    </div>
                    <div className="col-md-6 form-group mt-3 mt-md-0">
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        id="email"
                        placeholder="Your Email"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group mt-3">
                    <input
                      type="text"
                      className="form-control"
                      name="subject"
                      id="subject"
                      placeholder="Subject"
                      required
                    />
                  </div>
                  <div className="form-group mt-3">
                    <textarea
                      className="form-control"
                      name="message"
                      rows={5}
                      placeholder="Message"
                      required
                      defaultValue={""}
                    />
                  </div>
                  <br />
                  <div className="Send">
                    <button type="submit">Send Message</button>
                  </div>
                </form>
              </div>
              <div className="contactUs d-md-flex py-4">
                <div className="me-md-auto text-center text-md-start">
                  <div className="copyright">
                    © Copyright{" "}
                    <strong>
                      <span>HelpingHand</span>
                    </strong>
                    . All Rights Reserved
                  </div>
                  <div className="credits">
                    Designed by <a href="#">Anas Imam Shaikh</a>
                  </div>
                </div>
                <div className="social-links text-center text-md-right pt-3 pt-md-0">
                  <a
                    target="_blank"
                    href="https://twitter.com/tsfsingapore"
                    className="twitter"
                  >
                    <i className="bx bxl-twitter" />
                  </a>
                  <a
                    target="_blank"
                    href="https://www.facebook.com/thesparksfoundation.info"
                    className="facebook"
                  >
                    <i className="bx bxl-facebook" />
                  </a>
                  <a
                    target="_blank"
                    href="https://instagram.com/thesparksfoundation.info"
                    className="instagram"
                  >
                    <i className="bx bxl-instagram" />
                  </a>
                  <a
                    target="_blank"
                    href="https://www.linkedin.com/company/the-sparks-foundation/"
                    className="linkedin"
                  >
                    <i className="bx bxl-linkedin" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
