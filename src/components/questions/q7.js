const Question = () => {
  return (
    <div>
      <p>
        Yet again the same problem!! Let's check if you have solved the problem
        completely or not. (The only difference is the the string for which you
        have to calculate the answer.)
      </p>
      <p>
        There was a string s which was supposed to be encrypted. For this
        reason, all 26 lowercase English letters were arranged in a circle in
        some order, afterwards, each letter in s was replaced with the one that
        follows in clockwise order, in that way the string t was obtained.
      </p>
      <p>
        You are given a string t . Determine the lexicographically smallest
        string s that could be a prototype of the given string t .
      </p>
      <p>
        A string a is lexicographically smaller than a string b of the same
        length if and only if:
      </p>
      <ul>
        <li>
          If in the first position where a and b differ, the string a has a
          letter, that appears earlier in the alphabet than the corresponding
          letter in b .
        </li>
      </ul>
      <p>Calculate for:</p>
      <p>n = 26</p>
      <p>t = abcdefghijklmnopqrstuvwxyz</p>
      <p>
        The answer for this level is the 4th character of the answer of above
        question.
      </p>
    </div>
  );
};
export default Question;
