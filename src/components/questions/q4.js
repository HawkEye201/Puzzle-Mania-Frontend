const Question = () => {
  return (
    <div>
      <p>
        Li Hua has a pattern of size n×n , each cell is either blue or red. He
        can perform exactly k operations. In each operation, he chooses a cell
        and changes its color from red to blue or from blue to red. Each cell
        can be chosen as many times as he wants. Is it possible to make the
        pattern, that matches its rotation by 180<sup>o</sup> ?
      </p>
      <p>Calculate for:</p>
      <p>n = 5 k = 4</p>
      <p>0 0 0 0 0</p>
      <p>0 1 1 1 1</p>
      <p>0 1 0 0 0</p>
      <p>1 1 1 1 1</p>
      <p>0 0 0 0 0</p>
      <p>
        The answer for this level is the last character of the answer of above
        question.
      </p>
    </div>
  );
};
export default Question;
