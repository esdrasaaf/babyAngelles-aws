export default function getAverage ( avaliations ) {
    let avg = 0;

    if (avaliations?.length === 0) return avg

    for (let i = 0; i < avaliations?.length; i++) {
      avg += avaliations[i].rating;
    }

    return avg / avaliations?.length;
}