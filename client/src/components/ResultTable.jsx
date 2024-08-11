import React from 'react';
import { useSelector } from 'react-redux';
import '../styles/ResultTable.css'

export default function ResultTable({correct,isPass,calcPoint}) {

  const { userId } = useSelector((state) => state.result);

  return (
    <div>
      <table>
        <thead className='table-header'>
          <tr className='table-row'>
            <td>Name</td>
            <td>Correct</td>
            <td>Earn Points</td>
            <td>Result</td>
          </tr>
        </thead>
        <tbody>
          <tr className='table-body'>
            <td>{userId}</td>
            <td>{correct}</td>
            <td>{calcPoint}</td>
            <td>{isPass ? 'Passed' : 'Failed'}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
