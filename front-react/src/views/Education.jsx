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
import React from "react";
import CardImg from "components/Card/CardImg.jsx";
import { ProgressBar } from "react-bootstrap";
import { articles } from "variables/EducationArticles.jsx";
import MyVerticallyCenteredModal from "components/MyVerticallyCenteredModal/MyVerticallyCenteredModal.jsx";







function Maps({ ...prop }) {
  const [modalShow, setModalShow] = React.useState(0);

  function setQuestionOne(){
    
  }

  const progressBar = {
    width: '70%',
    height: '35px',
    marginBottom: '0px',
    margin: 'auto',
    border: 'solid 5px'
  };

  let progress = 100

  return (
    <div>
      <h1>🅔🅓🅤🅒🅐🅣🅘🅞🅝</h1>
 
      <div className="article-list">
        
        { 
         articles.map( element =>{
           const {title, link, image, id} =element
           return (
             <div className="article">
            <CardImg title={title} link={link} image={image} id={id} readArticle={()=>{
               console.log(`clicked ${id}`)
               setModalShow(id)
            }}/>
            

            <MyVerticallyCenteredModal
            show={modalShow==={id}}
            onHide={() => setModalShow(false)}
            content={id}
            />
            </div>

           )
          
        })}
        
      <MyVerticallyCenteredModal
        show={modalShow===1}
        onHide={() => setModalShow(false)}
        content={
          <ol className="risk-assessment-questions" start="1" tabIndex="0">
          <li>
            <h4>How would you best describe your personality?</h4>
            <ul>
              <li>
                <label>
                  <input
                    className="risk-assessment-input"
                    name="q1"
                    type="radio"
                    value="4"
                    onChange={e => setQuestionOne(e.target.value)}
                  ></input>
                  I like to take risks whenever possible if I can get
                  rewarded
                </label>
              </li>
              <li>
                <label>
                  <input
                    className="risk-assessment-input"
                    name="q1"
                    type="radio"
                    value="3"
                    onChange={e => setQuestionOne(e.target.value)}
                  ></input>
                  I like to take risks, but only if they’re logical and
                  calculated
                </label>
              </li>
              <li>
                <label>
                  <input
                    className="risk-assessment-input"
                    name="q1"
                    type="radio"
                    value="2"
                    onChange={e => setQuestionOne(e.target.value)}
                  ></input>
                  I like to play it by the book but am occasionally open to
                  risks
                </label>
              </li>
              <li>
                <label>
                  <input
                    className="risk-assessment-input"
                    name="q1"
                    type="radio"
                    value="1"
                    onChange={e => setQuestionOne(e.target.value)}
                  ></input>
                  I like to play it safe and conservative
                </label>
              </li>
            </ul>
          </li>
        </ol>
        }
      />

      <MyVerticallyCenteredModal
        show={modalShow===2}
        onHide={() => setModalShow(false)}
        content='test 2'
      />
       <MyVerticallyCenteredModal
        show={modalShow===3}
        onHide={() => setModalShow(false)}
        content='test 3'
      />
       <MyVerticallyCenteredModal
        show={modalShow===4}
        onHide={() => setModalShow(false)}
        content='test 4'
      />
       <MyVerticallyCenteredModal
        show={modalShow===5}
        onHide={() => setModalShow(false)}
        content='test 5'
      />


       
      </div>
      <br />
      <br />
      <br />
      <br />
      <div >
        <ProgressBar style={progressBar} now={progress} label={progress} />
      </div>



    </div>
  );
}

export default Maps;
