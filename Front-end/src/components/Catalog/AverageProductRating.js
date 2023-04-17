import Rating from 'react-rating';
import emptyStar from '../../assets/images/emptyStar.png';
import ratingStar from '../../assets/images/ratingStar.png';

export default function AverageRatingComponent ({ productAvaliations }) {
    let average = 0;

    for (let i = 0; i < productAvaliations.length; i++) {
        average += productAvaliations[i].rating;
    }

    if (average === 0) {
        return (
            <Rating
                emptySymbol={<img src={emptyStar} className="icon" />}
                fullSymbol={<img src={ratingStar} className="icon" />}
                readonly
                fractions={2}
                initialRating={average}
            />
        )
    }

    return (
        <Rating 
            emptySymbol={<img src={emptyStar} className="icon" />}
            fullSymbol={<img src={ratingStar} className="icon" />}
            readonly
            fractions={2}
            initialRating={(average / productAvaliations.length)}
        />
    )
}
