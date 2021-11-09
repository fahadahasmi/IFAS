import Navbar from "./Screens/Navbar.js";
import Breadcrumbs from "./Screens/Breadcrumbs.js";
import "../css/aboutUs.css"
const AboutUs = () => {
    return (
        <>
            <Navbar />
            <Breadcrumbs />
            <div>
                <div className="abt-contain">
                    <h1 className="big">About Us</h1>
                    <div className="para">
                        <img src="/Image/boy_ images.jpg" className="rec" alt="frs" />
                        <div className="top">
                            <h1 className="we">We Build Great Project</h1>
                            <h4>We made a project which is far far away behind the world circumstances.
                                We made this for teachers/professors to outcome from the attendance issues in online sessions.
                                It convenience to use and saves a ample amount of time.
                            </h4>
                        </div>
                        <div className="inf">
                            <div className="diff">
                                <h1 className="head">Advanced Technlogy</h1>
                                <p className="para">Advanced technology is defined as a new or developing IT innovation that still has
                                    relatively few users, yet promises to provide future, significant value.
                                    While this term differs from both advanced manufacturing and manufacturing technology,
                                    they have relationships with one another. The best definition of technology is the study and
                                    transformation of techniques, tools, and
                                    machines created by humans.
                                </p>
                            </div>
                            <div className="diff">
                                <h1 className="head">Quality Software</h1>
                                <p className="para">Software quality is defined as a field of study and practice that describes the
                                    desirable attributes of software products.The common requirements that all software applications
                                    must satisfy to be successful:
                                    user experience, availability, performance, scalability, adaptability, security, and economy.
                                </p>
                            </div>
                            <div className="diff">
                                <h1 className="head">Dedicated to Our teacher</h1>
                                <p className="para">A teacher is a great source of knowledge, prosperity and enlightenment by which
                                    anybody can be benefited.Teachers are the gifts of god who make our career and guide us towards
                                    success.
                                    Teachers make their students academically strong and they always encourage their students to do
                                    better in their life.Thank you for being such an amazing teacher!</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="contact">
                    <h1>Contact Us</h1>
                    <div className="summary">
                        <div className="chips">
                            <h1>Location</h1>
                            <p id="add">28 Sion Laxmi baugh, banana market mumbai 400022.</p>
                            <p id="Email"> Email Us:<a href>guptashivam@eng.rizvi.edu.in</a>
                                <a href>kajalbiradar@eng.rizvi.edu.in</a>
                                <a href>fahad12@eng.rizvi.edu.in</a>
                                <a href>anasimamshaikh@eng.rizvi.edu.in</a>
                            </p>
                            <div className="fcon">
                                <h2>FOLLOW US</h2>
                                <p>
                                    <img src="https://img.icons8.com/fluency/30/000000/instagram-new.png" alt="Instagram" />
                                    <img src="https://img.icons8.com/fluency/30/000000/facebook-new.png" alt="Facebook" />
                                    <img src="https://img.icons8.com/color/30/000000/linkedin.png" alt="Linkdln" />
                                </p>
                            </div>
                        </div>
                        <div className="cuff">
                            <h3>Let's Start a conversation</h3>
                            <div className="lays">
                                <form method="get">
                                    <label htmlFor="Name" />
                                    <input type="Text" id="text" name="name" placeholder="Enter Your Name" required />
                                    <label htmlFor="Email" />
                                    <input type="email" id="text" name="email" placeholder="Enter a valid email address" required />
                                    <label htmlFor="Message" />
                                    <input type="text" id="text" className="area" name="message" placeholder="Type Your Message here...." required />
                                </form></div>
                            <button type="submit" id="send" value="Submit">Send</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default AboutUs