import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';
import { useDispatch, useSelector } from 'react-redux';
import { setUserId } from '../features/resultReducer';


export default function Home() {

    const {queue,trace} = useSelector((state)=>state.question)
    const [users, setUsers] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

  
    const handleSubmit = (e) => {
        e.preventDefault();
        if (users.trim() === '') {
            navigate('/');
        } else {
            console.log(users);
            dispatch(setUserId(users));
            navigate('/quiz');
        }
    };

    return (
        <div className='home-container'>
            <h1 className='title text-light quizApp'>Quiz Application</h1>
            <ol>
                <li>You will be asked 10 questions one after another.</li>
                <li>10 points is awarded for the correct answer.</li>
                <li>Each question has three options. You can choose only one option.</li>
                <li>You cannot review and change answers once the quiz finishes.</li>
                <li>You cannot move to previous questions once selected.</li>
                <li>The result will be declared at the end of the quiz.</li>
            </ol>

            <form id="form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className='userid'
                    placeholder='Enter Username*'
                    value={users}
                    onChange={(e) => setUsers(e.target.value)}
                />
            </form>

            <div className='start'>
                <button className='btn' onClick={handleSubmit}>Start Quiz</button>
            </div>
        </div>
    );
}

