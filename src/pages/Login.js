import React from "react";
import { Text, Input, Grid, Button } from "../elements";
import { useDispatch } from "react-redux";
import {actionCreators as userActions} from "../redux/modules/user";

const Login = (props) => {

    const dispatch = useDispatch();
  const [id, setId] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const [wa,setWa] = React.useState(false);
  
  const emailCheck = (email) => {
    let _reg = /^[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-z])*.([a-zA-Z])*/;

    return _reg.test(email);
  }
  
  const login = () => {

    console.log(id);

    if(id === "" || pwd === ""){
      window.alert("아이디 혹은 비밀번호가 공란입니다! 입력해주세요!");
      return;
    }

    if(!emailCheck(id)){
      window.alert("이메일 형식이 맞지 않습니다!");
      return;
    }

    dispatch(userActions.loginFB(id,pwd));
  };

  return (
    <React.Fragment>
      <Grid padding="16px">
        <Text size="32px" bold>
          로그인
        </Text>

        <Grid padding="16px 0px">
          <Input
            label="아이디"
            placeholder="아이디를 입력해주세요."
            _onChange={(e) => {
              if(e.target.value||pwd){
                setId(e.target.value);
                setWa(true);
              }else{
                setWa(false);
              }
            }}
          />
        </Grid>

        <Grid padding="16px 0px">
          <Input
            label="패스워드"
            placeholder="패스워드 입력해주세요."
            type="password"
            _onChange={(e) => {
              if(e.target.value||id){
                setPwd(e.target.value);
                setWa(true);
              }else{
                setPwd("");
                setWa(false);
              }
            }}
            value={pwd}
            is_submit
            onSubmit={login}
          />
        </Grid>
            {wa?( <Button
            text="로그인하기"
            _onClick={() => {
              console.log("로그인 했어!");
                login();
            }}
          ></Button>):(<Button>버튼비활성</Button>)}
           
      </Grid>
    </React.Fragment>
  );
};

export default Login;
