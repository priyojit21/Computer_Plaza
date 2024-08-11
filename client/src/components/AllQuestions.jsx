import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showQuestion, nextTrace } from '../features/questionReducer.js';
import { optionSelect } from '../features/resultReducer.js';
import {pushResult} from '../features/resultReducer';
import { resetAllquestion} from '../features/questionReducer';
import { resetResult } from '../features/resultReducer';
import '../styles/AllQuestions.css'
import { useNavigate } from 'react-router-dom';

export default function AllQuestions() {

    const cho = 2;

    const navigate = useNavigate();
    const [checked, setChecked] = useState(undefined);

    const { queue, trace, loading, error,chosen } = useSelector((state) => state.question);
    const { result,check,userId } = useSelector((state) => state.result);

    const dispatch = useDispatch();


    useEffect(() => {
        console.log("first time",userId);
        
        // dispatch(resetState());
        dispatch(resetResult());
        //jokn dispatch kore api call korlm queue te sob question chole elo amar
        dispatch(showQuestion());
        console.log("2nd time",userId);
        
      
        // console.log(queue);
    }, [dispatch]);


    useEffect(() => {
        if (queue.length > 0) {
            setChecked(result[trace]);
        }
    }, [queue, trace, result]);


    const filteredQuestions = queue.find((q) => q.code === chosen)?.questions || [];
    const currentQuestion = filteredQuestions[trace];

 

   

    function SelectHandler(i) {
        setChecked(i);
        dispatch(optionSelect(i));
    }

    function handleNextQuestion() {
        // if (trace < filteredQuestions.length - 1) {
            dispatch(pushResult(check));
            dispatch(nextTrace(trace));
            setChecked(undefined);
        // }
    }

    function onFinish(){
        dispatch(pushResult(check));
        dispatch(nextTrace(trace));
        console.log(result);
        console.log(trace);
        navigate("/result")
      }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }


    

    if (!currentQuestion) {
        return (
        <div>
            <div  className='formality'>Thanks for Giving the Exam</div>
            <button onClick={onFinish}>Finish test</button>    
        </div>
        );
    }

    return (
        <div className='all-questions'>
            <h2 className='current-question'>{currentQuestion?.question}</h2>
            <ul key={currentQuestion?.id}>
                {currentQuestion?.options?.map((option, index) => (
                    <li key={index}>
                        <input
                            type="radio"
                            name="options"
                            id={`q${index}-option`}
                            checked={checked === index}
                            onChange={() => SelectHandler(index)}
                        />
                        <label className='text-primary' htmlFor={`q${index}-option`}>{option}</label>
                        <div className={`check ${result[trace] === index ? 'checked' : ''}`}></div>
                    </li>
                ))}
            </ul>
            {trace < filteredQuestions.length   ? (
                <button onClick={handleNextQuestion}>Next</button>
            ) : (
                (<div></div>)
            )}
        </div>
    );
}




// import React, { useEffect, useState } from 'react'
// // import questions, { answers } from './data.js';
// import { useDispatch, useSelector } from 'react-redux';
// import {showQuestion, startExamAction } from '../features/questionReducer.js';
// import { optionSelect } from '../features/resultReducer.js';
// // styling and display of all question
// export default function AllQuestions() {

//     const [checked, setChecked] = useState(undefined);

   


//     const {queue,trace} = useSelector((state)=>state.question)

//     const{check,result} = useSelector((state)=>state.result);

//     const dispatch = useDispatch();

//     // const question = questions[trace];

//     useEffect(() => {
//         dispatch(showQuestion());
//         console.log(queue);
//     }, [])

//     useEffect(() => {
//         // dispatch(startExamAction(question[trace]));
//         dispatch(startExamAction(queue[trace]));
//         // only 1 question are in queue
//         console.log(queue);
//     }, [])

//     // useEffect(() => {
//     //     dispatch(showQuestion());
//     // },[])

    

//     function SelectHandler(i) {
//         setChecked(true);
//         dispatch(optionSelect(i));
//         // onChecked(i); //prop hisebe nebe

//     }
//     return (
//         <div className='questions'>
//             <h2 className='text-light'>{question?.question}</h2>

//             <ul key={queue?.id}>
//                 {
//                     queue.options.map((q, i) => (
//                         <li key={i}>
//                             <input
//                                 type="radio"
//                                 value={false}
//                                 name="options"
//                                 id={`q${i}-option`}
//                                 onChange={()=>SelectHandler(i)}
//                             />

//                             <label className='text-primary' htmlFor={`q${i}-option`}>{q}</label>
//                             <div className={`check ${result[trace] == i ? 'checked' : ''}`}></div>
//                         </li>
//                     ))
//                 }
//             </ul>
//         </div>
//     )
// }
