
import ReactStars from "react-rating-stars-component";

export default function Rating(){
    const ratingStyle = {
        size: 40,
        count: 7,
        isHalf: false,
        value: 4,
        color: "#282a2c",
        activeColor: "#ecd06f",
        onChange: newValue => {
          console.log(`Example 3: new value is ${newValue}`);
        }
      };
    return(
        <ReactStars {...ratingStyle} />

    )
}