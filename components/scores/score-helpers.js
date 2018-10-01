exports.calcScore = async (predictionsList, resultList, numberOfMatches) => {
  let tally = 0;
  const matches = [...Array(numberOfMatches).keys()];
  scores = {};
  matches.forEach((match, index) => {
    const pl = Number(predictionsList.predictions[index].home_goals);
    const rl = resultList[index].home_goals;
    const pv = Number(predictionsList.predictions[index].away_goals);
    const rv = resultList[index].away_goals;

    // Sumar los puntos al total, guardar cada puntuacion en el objeto 'scores'
    if (pl === rl && pv === rv) {
      // Si se acertó el resultado EXACTO
      tally = tally + 10;
      scores[index] = 10;
    } else {
      /* En caso de que se haya acertado al resultado NO EXACTO restar un punto por la distancia
       entre la diferencia de gol de un pronóstico y la suma de la diferencia de gol del
       resultado respectivo arrancando desde 9 puntos.
       */
      const base = 9;

      if ((pl > pv && rl > rv) || (pl < pv && rl < rv)) {
        const sump = pl - pv;
        const sumr = rl - rv;
        const diff = sumr - sump;
        const total = base - Math.abs(diff);

        tally = tally + total;
        scores[index] = total;
      } else if (pl === pv && rl === rv) {
        const total = base - Math.abs(pl - rl);
        tally = tally + total;
        scores[index] = total;
      }
    }
  });
  const scoresWithDetail = [{ total: tally }, { ...scores }];
  return scoresWithDetail;
};
