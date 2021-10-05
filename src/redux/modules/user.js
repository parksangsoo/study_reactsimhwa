import { createAction, handleActions} from "redux-actions";
import { produce } from "immer";
import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";

import { auth } from "../../shared/firebase";
import firebase from "firebase/app";

const SignUp_USER = "SignUp_USER";


const signupUser = createAction(SignUp_USER, (user_info) => ({user_info}));

const initialState = {
    user_info: null,
    is_login: false,
}

const signupFB = (id, pwd, user_name) => {
    return function (dispatch, getState, { history }) {
      auth
        .createUserWithEmailAndPassword(id, pwd)
        .then((user) => {
          console.log(user);
  
          auth.currentUser
            .updateProfile({
              displayName: user_name,
            })
            .then(() => {
              dispatch(
                signupUser({
                  user_name: user_name,
                  id: id,
                  user_profile: "",
                  uid: user.user.uid,
                })
              );
              history.push("/");
            })
            .catch((error) => {
              console.log(error);
            });
  
          // Signed in
          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
  
          console.log(errorCode, errorMessage);
          // ..
        });
    };
  };


  const loginFB = (id, pwd) => {
    return function (dispatch,getState,{history}){
      //파이어베이스 로그인 후 인증에 성공하면 
      auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then((res) => {

        auth
          .signInWithEmailAndPassword(id, pwd)
          .then((user) => {
            dispatch(
              signupUser({
                user_name: user.user.displayName,
                id: id,
                user_profile: "",
                uid: user.user.uid,
              })
            );
            history.push("/");
  
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
  
            console.log(errorCode, errorMessage);
          });
      });

    }
  }

export default handleActions(
    {
        [SignUp_USER]: (state, action) => 
            produce(state, (draft) => {
                setCookie("is_login", "success");
                draft.user_info = action.payload.user_info;
                draft.is_login = true;
            }),
        
    },
    initialState
)

const actionCreators = {
    signupFB,
    loginFB
}

export {actionCreators};