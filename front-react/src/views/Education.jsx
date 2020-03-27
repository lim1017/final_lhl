import React, { useContext, useEffect } from "react";
import CardImg from "components/Card/CardImg.jsx";
import { ProgressBar } from "react-bootstrap";
import { articles } from "variables/EducationArticles.jsx";
import QuizQuestion from "components/QuizQuestion/QuizQuestion.jsx";
import MyVerticallyCenteredModal from "components/MyVerticallyCenteredModal/MyVerticallyCenteredModal.jsx";
import appDataContext from "../hooks/reducers/useContext";
import reducerz, { SET_EDU_PROGRESS, SET_USER } from "../hooks/reducers/app";
import axios from "axios";

function Maps({ ...prop }) {
  const userId = localStorage.getItem("id");
  const { state, dispatch } = useContext(appDataContext);

  const [modalShow, setModalShow] = React.useState(0);

  const [allAnswers, setAllAnswers] = React.useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0
  });

  const [selectedAnswers, setSelectedAnswers] = React.useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0
  });

  const [answerYet, setAnswerYet] = React.useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false
  });

  useEffect(() => {
    const userId = localStorage.getItem("id");

    Promise.all([axios.get(`http://localhost:8001/api/users/${userId}`)])
      .then(response => {
        console.log(response[0].data[0]);
        setAllAnswers(response[0].data[0].eduscores);
        setAnswerYet(response[0].data[0].eduisanswered);
        updateProgressBar(response[0].data[0].eduscores);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  
  // useEffect(() => {
  //   const userId = localStorage.getItem('id');


  //   Promise.all([
  //     axios.put(`http://localhost:8001/api/users/updateliteracy`, {userId}),
  //   ])
  //     .then(res => {
        
  //       axios.get((`http://localhost:8001/api/users/${userId}`))
  //           .then(resz =>{
  //             console.log(resz, 'after file upload')
  //             console.log(resz.data[0])
  //             dispatch({
  //               type: SET_USER,
  //               users: resz.data
  //             });
  //           })

  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });

  // }, [state.eduProgress]);


  function updateLit(){
    const userId = localStorage.getItem('id');

    Promise.all([
      axios.put(`http://localhost:8001/api/users/updateliteracy`, {userId, lit:5}),
    ])
      .then(res => {
        
        axios.get((`http://localhost:8001/api/users/${userId}`))
            .then(resz =>{
              console.log(resz, 'after file upload')
              console.log(resz.data[0])
              dispatch({
                type: SET_USER,
                users: resz.data
              });
            })
      })
      .catch(error => {
        console.log(error);
      });
  }




  function recieveAnswer(answer, id){
    setSelectedAnswers({...selectedAnswers, [`${id}`]:parseInt(answer)})
 
  }

  // console.log(state.educationAnswers[1][2], 'shoukd be false')

  function verifyAnswer(id) {
    console.log(selectedAnswers, "from verified answer");

    if (articles[id - 1].answer === selectedAnswers[id]) {
      const isCorrect = { ...allAnswers, [`${id}`]: 1 };

      setAllAnswers(isCorrect);
      updateProgressBar(isCorrect);
      setModalShow(false);
      setAnswerYet({ ...answerYet, [`${id}`]: true });

      const eduUpdate = { eduscores: isCorrect, userId: userId };

      Promise.all([
        axios.put(`http://localhost:8001/api//users/updateedu`, eduUpdate)
      ])
        .then(response => {
          console.log("axios data recieved: ", response);
          if (allAnswers[id]===0){
            updateLit()
          }
          
        })
        .catch(error => {
          console.log("no go");
        });
    } else {
      setAnswerYet({ ...answerYet, [`${id}`]: true });
    }
  }

  function updateProgressBar(answers) {
    const arrAnswers = Object.values(answers);
    const totalQuestions = Object.keys(answers).length;
    let totalScore = arrAnswers.reduce((a, b) => a + b, 0);

    const score = (totalScore / totalQuestions) * 100;


    dispatch({
      type: SET_EDU_PROGRESS,
      eduProgress: score
    });
  }

  const progressBar = {
    width: "70%",
    height: "35px",
    marginBottom: "30px",
    margin: "auto",
    border: "solid 5px"
  };

  return (
    <div className="img-wrapper">
      <div className="img-container">
        <h1 className="edu-title">
          {/* {" "}
          {state.eduProgress === 100 ? (
            <img
              src="https://previews.123rf.com/images/yuliaglam/yuliaglam1403/yuliaglam140300046/26366894-vector-gold-star.jpg"
              width="40"
              height="40"
            ></img>
          ) : null} */}
        </h1>

        <div className="article-list">
          {articles.map(element => {
            const {
              title,
              link,
              image,
              id,
              question,
              a1,
              a2,
              a3,
              a4
            } = element;

            return (
              <div className="article" key={id}>
                <div>
                  <CardImg
                    className="edu-article"
                    title={title}
                    link={link}
                    image={image}
                    id={id}
                    allAnswers={allAnswers}
                    readArticle={() => {
                      setModalShow(id);
                    }}
                  />

                  <MyVerticallyCenteredModal
                    show={modalShow === id}
                    id={id}
                    onHide={() => setModalShow(false)}
                    verifyAnswer={verifyAnswer}
                    selectedAnswers={selectedAnswers}
                    answerYet={answerYet}
                    allAnswers={allAnswers}
                    content={
                      <QuizQuestion
                        id={id}
                        question={question}
                        a1={a1}
                        a2={a2}
                        a3={a3}
                        a4={a4}
                        sendAnswer={recieveAnswer}
                      />
                    }
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div>
          <ProgressBar
            style={progressBar}
            now={state.eduProgress}
            label={state.eduProgress.toFixed(2)}
          />
        </div>
      </div>
    </div>
  );
}

export default Maps;
