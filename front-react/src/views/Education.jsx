/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useContext } from "react";
import CardImg from "components/Card/CardImg.jsx";
import { ProgressBar } from "react-bootstrap";
import { articles } from "variables/EducationArticles.jsx";
import QuizQuestion from "components/QuizQuestion/QuizQuestion.jsx";


import MyVerticallyCenteredModal from "components/MyVerticallyCenteredModal/MyVerticallyCenteredModal.jsx";


import appDataContext from "../hooks/reducers/useContext";
import reducerz, { SET_EDU_ANSWERS, SET_EDU_PROGRESS } from "../hooks/reducers/app";






function Maps({ ...prop }) {
  const { state, dispatch } = useContext(appDataContext);

  const [modalShow, setModalShow] = React.useState(0);
  const [progress, setProgress] = React.useState(0);

  const [allAnswers, setallAnswers] = React.useState({
    1:0,
    2:0,
    3:0,
    4:0,
    5:0
  });


  function getAnswer(answer, id){
    console.log(id)
    console.log(`the answer is ${answer}`)
    setallAnswers({...allAnswers, [`${id}`]:parseInt(answer)})
    console.log(allAnswers)

  }

  function verifyAnswer(id){
    console.log(`the question is ${id}, tne answer selected is ${allAnswers[id]}`)

    if (articles[id-1].answer===allAnswers[id]){
      console.log('correct@!!')

      const isCorrect={...state.educationAnswers, 
        [`${id}`]:1 }

      dispatch({
        type: SET_EDU_ANSWERS,
        educationAnswers: isCorrect
      })
   
      console.log(state.educationAnswers)
      updateProgressBar(state.educationAnswers)
      setModalShow(false)

    } else{
      console.log('incorrect')
    }
  }

  function updateProgressBar(answers){
    const arrAnswers= Object.values(answers)
    const totalQuestions=Object.keys(answers).length
    let totalScore=arrAnswers.reduce((a, b) => a + b, 0)

    
    const score=(totalScore/totalQuestions)*100
    dispatch({
      type: SET_EDU_PROGRESS,
      eduProgress: score
    })


  }

  const progressBar = {
    width: '70%',
    height: '35px',
    marginBottom: '30px',
    margin: 'auto',
    border: 'solid 5px'
  };

  

  return (
    <div>
      <h1>🅔🅓🅤🅒🅐🅣🅘🅞🅝</h1>
 
      <div className="article-list">
        
        { 
         articles.map( element =>{
           const {title, link, image, id, question, a1, a2, a3, a4} =element

           
           return (
             <div className="article">
            <CardImg title={title} link={link} image={image} id={id} readArticle={()=>{
               console.log(`clicked ${id}`)
               setModalShow(id)
            }}/>
            

            <MyVerticallyCenteredModal
            show={modalShow===id}
            id={id}
            onHide={() => setModalShow(false)}
            verifyAnswer={verifyAnswer}
            content={ <QuizQuestion
              id={id}
              question={question}
              a1={a1}
              a2={a2}
              a3={a3}
              a4={a4}
              getAnswer={getAnswer}
            />}
            />
            </div>

           )
          
        })}
    
       
      </div>
    
      <div >
        <ProgressBar style={progressBar} now={state.eduProgress} label={state.eduProgress} />
      </div>



    </div>
  );
}

export default Maps;
