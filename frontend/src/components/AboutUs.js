import Navbar from "./Screens/Navbar.js";
import Breadcrumbs from "./Screens/Breadcrumbs.js";
const AboutUs = () => {
    return (
        <>
            <Navbar />
            <Breadcrumbs />
            <div class="abt-contain">
                <h1 class="big">About Us</h1>
                <div class="para">
                    <img src="boy_ images.jpg" class="rec" alt="frs" />
                    <div class ="top">
                    <h1 class ="we">We Build Great Project</h1>
                    <h2>We made a project which is far far away behind the world circumstances.
                    We made this for teachers/professors to outcome from the attendance issues in online sessions.
                    It convenience to use and saves a ample amount of time.
                    </h2>
                    </div>
                    <div class ="inf">
                    <div class ="diff">
                    <h1 class ="head">Advanced Technlogy</h1>
                    <p class ="para">Advanced technology is defined as a new or developing IT innovation that still has
                    relatively few users, yet promises to provide future, significant value.
                    While this term differs from both advanced manufacturing and manufacturing technology,
                    they have relationships with one another.The best definition of technology is the study and
                    transformation of techniques, tools, and
                    machines created by humans.
                    </p>
                    </div>
                    <div class ="diff">
                    <h1 class ="head">Quality Software</h1>
                    <p class ="para">Software quality is defined as a field of study and practice that describes the
                    desirable attributes of software products.The common requirements that all software applications
                    must satisfy to be successful:
                    user experience, availability, performance, scalability, adaptability, security, and economy.
                    </p>
                    </div>
                    <div class ="diff">
                    <h1 class ="head">Dedicated to Our teacher</h1>
                    <p class ="para">A teacher is a great source of knowledge, prosperity and enlightenment by which
                    anybody can be benefited.Teachers are the gifts of god who make our career and guide us towards
                    success.
                    Teachers make their students academically strong and they always encourage their students to do
                    better in their life.Thank you for being such an amazing teacher!</p>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AboutUs