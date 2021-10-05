import React from "react";
import { Grid, Text, Button } from "../elements";

import { history } from "../redux/configureStore";
import {useSelector} from 'react-redux';
import { actionCreators as userActions } from "../redux/modules/user";

const Header = (props) => {
  
  const is_login = useSelector((state) => state.user.is_login);
  
  return (
    <React.Fragment>
      <Grid is_flex padding="4px 16px">
        <Grid>
          <Text margin="0px" size="24px" bold>
            헬로
          </Text>
        </Grid>

        <Grid is_flex>
          <Button
            text="로그인"
            _onClick={() => {
              history.push("/login");
            }}
          ></Button>
          <Button
            text="회원가입"
            _onClick={() => {
              history.push("/signup");
            }}
          ></Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Header.defaultProps = {};

export default Header;
