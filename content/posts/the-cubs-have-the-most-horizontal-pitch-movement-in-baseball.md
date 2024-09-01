---
title: "The Cubs Have the Most Horizontal Pitch Movement in Baseball"
date: 2022-08-12T17:20:08-04:00
draft: false
subtitle: "With a lot of asterisks"
---

Baseball Savant provides [pitch movement leaderboards](https://baseballsavant.mlb.com/leaderboard/pitch-movement) for each pitch type. As I was looking through the leaderboards for various pitch types, I noticed that several Cubs pitchers stand out in terms of negative horizontal movement compared to average. For instance, Justin Steele's four-seamer gets the third most cutting movement in the league, and Marcus Stroman and Rowan Wick are also both within the top 20. Having recently read a [North Side Bound article about cut-ride](https://northsidebound.com/2022/06/07/cut-ride-whirlies-could-we-see-sweeping-changes-in-cubs-prospect-pitch-design/), I was curious to see if my observations had any statistical backing.

First, I downloaded a CSV from Baseball Savant of all pitchers a pitcher has thrown at least 50 times this season. I then imported that CSV into my local database and ran a query on it to see the average absolute value of pitch movement per team across both axes. Getting the absolute value is key here so that pitches with a lot of glove-side movement aren't canceled out by those with a lot of arm-side movement.

The results show that the Cubs are the top team in terms of horizontal pitch movement, and sixth in vertical movement.

This is certainly not the most rigorous method of measuring pitching development on an organizational level. Notably, the query could be improved by using a weighted average, since this analysis didn't take into account how often specific pitches were being thrown. It's also not necessarily true that these rankings are correlated with pitching success. It does, however, back up the belief that the Cubs are prioritizing pitchers with outlier horizontal movement.

View the full spreadsheet [here](https://docs.google.com/spreadsheets/d/e/2PACX-1vTEniFs0FUco5_U9ZX5h5yagzM8wvojMzHwtkCKFVZjp4tVesyA1i8PDUjN2pZXcrr_xGKSuz5jhe4d/pubhtml). I've included the (messy) SQL query I used to calculate these values below as well as a copy of the full table for posterity.

| team_name | avg_abs_vert_mov | avg_abs_horz_mov | diff_horz_rank | diff_vert_rank | avg_rank |
| --------- | ---------------- | ---------------- | -------------- | -------------- | -------- |
| Angels    | 1.9013           | 1.8727           | 30             | 28             | 29       |
| Astros    | 2.2774           | 2.0830           | 23             | 15             | 19       |
| Athletics | 2.5662           | 2.7479           | 2              | 8              | 5        |
| Blue Jays | 2.0254           | 2.3211           | 14             | 26             | 20       |
| Braves    | 3.0091           | 2.4782           | 6              | 1              | 3.5      |
| Brewers   | 2.1029           | 2.0638           | 24             | 24             | 24       |
| Cardinals | 2.5212           | 2.2138           | 20             | 10             | 15       |
| Cubs      | 2.5918           | 3.0148           | 1              | 6              | 3.5      |
| D-backs   | 2.7515           | 1.9909           | 27             | 3              | 15       |
| Dodgers   | 1.6211           | 2.2982           | 16             | 30             | 23       |
| Giants    | 2.5911           | 2.0467           | 25             | 7              | 16       |
| Guardians | 2.3000           | 2.3055           | 15             | 14             | 14.5     |
| Mariners  | 2.0596           | 2.4731           | 7              | 25             | 16       |
| Marlins   | 2.7929           | 2.4321           | 9              | 2              | 5.5      |
| Mets      | 2.2042           | 1.9014           | 29             | 19             | 24       |
| Nationals | 1.6721           | 2.2410           | 19             | 29             | 24       |
| Orioles   | 2.2582           | 2.5582           | 3              | 16             | 9.5      |
| Padres    | 2.2052           | 2.0414           | 26             | 18             | 22       |
| Phillies  | 2.3324           | 2.1000           | 22             | 13             | 17.5     |
| Pirates   | 2.1250           | 1.9897           | 28             | 23             | 25.5     |
| Rangers   | 2.6000           | 2.3279           | 13             | 5              | 9        |
| Rays      | 2.6778           | 2.3986           | 10             | 4              | 7        |
| Red Sox   | 2.3465           | 2.1493           | 21             | 12             | 16.5     |
| Reds      | 2.1771           | 2.5000           | 5              | 21             | 13       |
| Rockies   | 1.9766           | 2.5297           | 4              | 27             | 15.5     |
| Royals    | 2.2397           | 2.3735           | 11             | 17             | 14       |
| Tigers    | 2.1972           | 2.2903           | 17             | 20             | 18.5     |
| Twins     | 2.4500           | 2.2852           | 18             | 11             | 14.5     |
| White Sox | 2.1746           | 2.3299           | 12             | 22             | 17       |
| Yankees   | 2.5431           | 2.4722           | 8              | 9              | 8.5      |

```sql
SELECT
    team_name,
    avg(abs(diff_z::float)) avg_abs_diff_z,
    avg(abs(diff_x::float)) avg_abs_diff_x,
    dense_rank() OVER (ORDER BY avg(abs(diff_x::float)) DESC) AS diff_x_rnk,
    dense_rank() OVER (ORDER BY avg(abs(diff_z::float)) DESC) AS diff_z_rnk,
    (dense_rank() OVER (ORDER BY avg(abs(diff_x::float)) DESC) + dense_rank() OVER (ORDER BY avg(abs(diff_z::float)) DESC)) / 2.0 avg_rnk
FROM
    pitch_movement
GROUP BY
    team_name
ORDER BY
    avg_rnk ASC;
```