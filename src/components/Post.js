import React from "react";
// import Grid from "../elements/Grid";
// import Image from "../elements/Image";
// import Text from "../elements/Text";

import {Grid, Image, Text, Button} from "../elements";
import {history} from "../redux/configureStore";
import {useDispatch,useSelector} from "react-redux";
import {actionCreators as postActions} from '../redux/modules/post';
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

const Post = React.memo((props) => {

  const dispatch = useDispatch();

  const deletepost = () => {
    dispatch(postActions.delPostFB(props.id))
  }

  const like = (e) => {
    
    e.preventDefault();
    e.stopPropagation();
    dispatch(postActions.toggleLikeFB(props.id))
  }

  return (
    <React.Fragment>
      <Grid>
        <Grid is_flex padding="16px">
          <Grid is_flex width="auto">
            <Image shape="circle" src={props.image_url} />
            <Text bold>{props.user_info.user_name}</Text>
          </Grid>
          <Grid is_flex width="auto">
            <Text>{props.insert_dt}</Text>
            {props.is_me && <Button width="auto" margin="4px" padding="4px" _onClick={() => {
              history.push(`/write/${props.id}`);
            }}>수정</Button>}
            {props.is_me && <Button width="auto" margin="4px" padding="4px" _onClick={deletepost}>삭제</Button>}

          </Grid>
        </Grid>
          {props.layout_type === "A" && (
        <React.Fragment>
          <Grid padding="16px">
            <Text>{props.contents}</Text>
          </Grid>
          <Grid>
            <Image shape="rectangle" src={props.image_url} />
          </Grid>
        </React.Fragment>
        )}

        {props.layout_type === "B" && (
        <React.Fragment>
          <Grid is_flex>
              <Grid width="50%" padding="16px">
                <Text>{props.contents}</Text>
              </Grid>
              <Image shape="rectangle" src={props.image_url} />
            </Grid>
        </React.Fragment>
        )}

      {props.layout_type === "C" && (
        <React.Fragment>
          <Grid is_flex>
              <Image shape="rectangle" src={props.image_url} />
              <Grid width="50%" padding="16px">
                <Text>{props.contents}</Text>
              </Grid>
            </Grid>
        </React.Fragment>
        )}
        <Grid padding="16px" is_flex>
          <Text margin="0px" bold>좋아요! {props.comment_cnt}개</Text>
          {!props.is_like?(<FavoriteBorderIcon onClick={like}/>):(<FavoriteIcon onClick={like}/>)}
        </Grid>
      </Grid>
    </React.Fragment>
  );
});

Post.defaultProps = {
  user_info: {
    user_name: "mean0",
    user_profile: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeFqQ6iG_mac4Q8eP8DH4QN50nvrhmYEjluQ&usqp=CAU",
  },
  image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeFqQ6iG_mac4Q8eP8DH4QN50nvrhmYEjluQ&usqp=CAU",
  contents: "고양이네요!",
  comment_cnt: 10,
  insert_dt: "2021-02-27 10:00:00",
  is_me: false,
};

export default Post;