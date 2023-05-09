const Question = () => {
  return (
    <div>
      <p>
        Piku and Chiku are playing a game on an array a of n positive integers.
        Piku and Chiku make alternating moves with Piku going first.
      </p>
      <p>In his/her turn, the player makes the following move:</p>
      <ul>
        <li>
          If a<sub>1</sub> = 0 , the player loses the game, otherwise:
        </li>
        <li>
          Player chooses some i with 2 ≤ i ≤ n . Then player decreases the value
          of a<sub>1</sub> by 1 and swaps a<sub>1</sub> with a<sub>i</sub> .
        </li>
      </ul>
      <p>
        Determine the winner of the game for the following if both players play
        optimally:
      </p>
      <p>n = 3</p>
      <p>a = [5, 4, 4]</p>
      <p>
        The answer for this level is the first character of the answer of above
        question.
      </p>
    </div>
  );
};
export default Question;
