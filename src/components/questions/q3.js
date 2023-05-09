const Question = () => {
  return (
    <div>
      <p>
        You are given a string s. You can apply this operation to the string
        exactly once: choose index i and move character si to the beginning of
        the string (removing it at the old position). For example, if you apply
        the operation with index i = 4 to the string "abaacd" with numbering
        from 1, you get the string "aabacd". What is the lexicographically
        minimal string you can obtain by this operation?
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
      <p>n = 8</p>
      <p>t = nnnsxrvx</p>
      <p>
        The answer for this level is the 3rd last character of the answer of
        above question.
      </p>
    </div>
  );
};
export default Question;
