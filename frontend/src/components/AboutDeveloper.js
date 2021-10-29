import Navbar from "./Screens/Navbar.js";
import Breadcrumbs from "./Screens/Breadcrumbs.js";
import '../css/AboutDev.css';

export default function AboutDeveloper() {
    return (
        <>
            <Navbar />
            <Breadcrumbs />
            <div className="dev">
                <div className="upper">
                    <img src="Background.png" className="Background" alt="BackgroundImage" />
                    <h1>About Developer</h1>
                    <p>Build Something Amazing that will reach over a billion people across more than 21% of the web</p>
                    <h2>Let's Get Started</h2>
                </div>
                <p className="few">We're the software design and engineering team that can bring it to life. We have the vision for
                    a stunning digital attendance experience. </p>

                <div className="lower">
                    <div className="bagg">
                        <img src="/Image/kj.jpeg" className="profil" alt="Photos" />
                        <h1 className="hop">Frontend Design</h1>
                        <p className="bees">We expertise is in the area of responsive design.Understaning of front-end web
                            technologies like HTML,CSS and Javascript.With every line of code, We strive to
                            make the web a beautiful place.The design of the webpages are designed by Kajal Biradar </p>
                        <div className="icon">
                            <img src="https://img.icons8.com/fluency/30/000000/instagram-new.png" alt="Instagram" />
                            <img src="https://img.icons8.com/fluency/30/000000/facebook-new.png" alt="Facebook" />
                            <img src="https://img.icons8.com/color/30/000000/linkedin.png" alt="Linkdln" />
                        </div>
                    </div>
                    <div class="bagg">
                        <img src="/Image/Shivam Gupta.jpg" className="profil" alt="Photos" />
                        <h1 class="hop">Frontend Design</h1>
                        <p class="bees">We expertise is in the area of responsive design.Understaning of front-end web
                            technologies like HTML,CSS and Javascript.With every line of code, We strive to
                            make the web a beautiful place.The design of the webpages are designed by Shivam Gupta</p>
                        <div className="icon">
                            <img src="https://img.icons8.com/fluency/30/000000/instagram-new.png" alt="Instagram" />
                            <img src="https://img.icons8.com/fluency/30/000000/facebook-new.png" alt="Facebook" />
                            <img src="https://img.icons8.com/color/30/000000/linkedin.png" alt="Linkdln" />
                        </div>
                    </div>
                    <div class="bagg">
                        <img src="/Image/FahadHasmi.jpg" class="profilly" alt="Photos" />
                        <h1 class="hop">Backend Developer</h1>
                        <p class="bees">Ability to manage a hosting environment, including database administration as well as
                            scaling applicatins to handle load
                            changes.Expereince with version control, such as Git & Bitbucket.The backend part of the project
                            includes Javascript, ReactJS, MongoDB are developed and
                            maintained by Fahad Hasmi </p>
                        <div class="fah">
                            <img src="https://img.icons8.com/fluency/30/000000/instagram-new.png" alt="Instagram" />
                            <img src="https://img.icons8.com/fluency/30/000000/facebook-new.png" alt="Facebook" />
                            <img src="https://img.icons8.com/color/30/000000/linkedin.png" alt="Linkdln" />
                        </div>
                    </div>
                    <div class="bagg">
                        <img src="/Image/Anas.jpg" class="profilly" alt="Photos" />
                        <h1 class="hop">Backend Developer</h1>
                        <p class="bees">Ability to manage a hosting environment, including database administration as well as
                            scaling applicatins to handle load
                            changes.Expereince with version control, such as Git & Bitbucket.The backend part of the project
                            includes Javascript, ReactJS, MongoDB are developed and
                            maintained by Anas Imam Mazhar</p>
                        <div class="icon">
                            <img src="https://img.icons8.com/fluency/30/000000/instagram-new.png" alt="Instagram" />
                            <img src="https://img.icons8.com/fluency/30/000000/facebook-new.png" alt="Facebook" />
                            <img src="https://img.icons8.com/color/30/000000/linkedin.png" alt="Linkdln" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}