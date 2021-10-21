import './HomePage.css';
import bgimg from "../../Assets/tent2.jpg";
import handimg from "../../Assets/helloo.png";
import Rating from '../../components/ratingSystem/ratinSystem';
import arrow from '../../Assets/arrow.png';
import logoo from '../../Assets/logo.png';
import Button from 'react-bootstrap/Button'
import { useHistory } from "react-router-dom";




export default function HomePage() {
    let storageData = localStorage.getItem("userInfo");
    let dataNchala = JSON.parse(storageData)
    const history = useHistory();
    const redirect = () => {
        history.push('/calendar');
    }

    return (
        <div className="homePageContainer">
            
            <div className="homeImgContainer">
                <img className="iff" src={bgimg} />
                <div className="cover"></div>
            </div>
            <div className="welcomeTag">
                <img className="handImageStyle" src={handimg} />
                <div className="welcomeTxt">
                    Welcome <span className="whitetxt">{dataNchala.nom} {dataNchala.prenom} </span>
                </div>
            </div>
            <div className="animatedText">
                <span className="roul">Ça roule c'est </span> <span></span>
                <div class="dropping-texts">
                    <div>Simplicitité</div>
                    <div>Facilité</div>
                    <div>Compétence</div>
                    <div>REUSSITE!</div>
                </div>
            </div>
            <div className="ratingSpace">
                <div className="ratingText"> Rate us </div>
                <div className="ratingStars">
                    <Rating />
                </div>

            </div>
            <div className="animatedArrow1">
                <img className="arrow" src={arrow} alt='arrow' />
            </div>
           
          
      
        </div>
    )

}
