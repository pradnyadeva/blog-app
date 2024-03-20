import Navbar from "../components/Navbar"
import Content from "../components/Content";
import About from "../components/About";
import Project from "../components/Project";
import Footer from "../components/Footer";


export default function App() {
    return (
        <div>
            <Navbar/>
            <section>
                    <Content/>
                    <About/>
                    <Project/>
                    <Footer/>

            </section>
        </div>
    );
}
