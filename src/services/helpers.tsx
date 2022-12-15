export function fantasyPoints(s, pprValue = 1) {
  if (s) {
    let points = 0;
    points -= 2 * s.interceptions_thrown;
    //   points -= 2 * s.fumbles;
    points += 4 * s.pass_td;
    points += 0.25 * s.pass_yards;
    points += 0.1 * s.rec_yards;
    //   points += 6 * s.rec_td;
    points += pprValue * s.receptions; // PPR leagues
    points += 0.1 * s.rush_yards;
    points += 0.1 * s.rush_td;
    points += 2 * s.two_point_conversion_passes;
    points += 2 * s.two_point_conversion_receptions;
    points += 2 * s.two_point_conversion_runs;

    return points;
  }

  return 0;
}
