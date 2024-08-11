import React, { useEffect} from 'react';
import { Link } from 'react-router-dom';
import ResultTable from './ResultTable';
import '../styles/Result.css';
import { useDispatch, useSelector } from 'react-redux';
import { resetAllquestion, showQuestionAnswers } from '../features/questionReducer';
import { postResult, resetResult } from '../features/resultReducer';

export default function Result() {
  const { result, userId } = useSelector((state) => state.result);
  const { answers, chosen } = useSelector((state) => state.question);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showQuestionAnswers());
  }, []);

  const filteredQuestionsAnswer = answers.find((q) => q.code === chosen)?.answers || [];

  let point = 0;
  let correct = 0;
  let passFail = 0;

  const compareArrays = (arr1, arr2) => {
    if (arr1.length - 1 !== arr2.length) return false;

    for (let i = 0; i < arr2.length; i++) {
      if (arr1[i] == arr2[i]) {
        passFail++;
      }
    }
    if (arr2.length - passFail <= 2 || passFail == arr2.length) {
      return true;
    } else {
      return false;
    }
  };

  const calculatePoints = (arr1, arr2) => {
    for (let i = 0; i < arr2.length; i++) {
      if (arr1[i] == arr2[i]) {
        correct++;
        point = 6 * correct;
      }
    }
    return point;
  };

  const isPass = compareArrays(result, filteredQuestionsAnswer);
  let calcPoint = calculatePoints(result, filteredQuestionsAnswer);

  function onRestart() {
    console.log(calcPoint);
    // Save the result and username to the database
    dispatch(postResult({ username: userId, result, points: calcPoint }));
    // Reset questions and result
    dispatch(resetAllquestion());
    dispatch(resetResult());

    console.log("Restart Test");
  }



  return (
    <div className='result-container'>
      <h1 className='title text-light'>Result Component</h1>

      <div className='result flex-center'>
        <div className='flex'>
          <span>Username</span>
          <span className='bold'>{userId}</span>
        </div>
        <div className='flex'>
          <span>Total Quiz Points: </span>
          <span className='bold'>{(result.length - 1) * 6}</span>
        </div>
        <div className='flex'>
          <span>Total Questions: </span>
          <span className='bold'>{result.length - 1}</span>
        </div>
        <div className='flex'>
          <span>Total Correct: </span>
          <span className='bold'>{correct}</span>
        </div>
        <div className='flex'>
          <span>Total Points: </span>
          <span className='bold'>{calcPoint}</span>
        </div>
        <div className='flex'>
          <span>Result: </span>
          <span className='bold'>{isPass ? <p style={{ color: "green" }}>Passed</p> : <p style={{ color: "red" }}>Failed</p>}</span>
        </div>
      </div>

      <div className="start">
        <button className='btn'>
          <Link to="/" onClick={onRestart}>Home</Link>
        </button>
      </div>


      <div className="resulttable-container">
        <ResultTable calcPoint={calcPoint} isPass={isPass} correct={correct} />
      </div>
    </div>
  );
}


