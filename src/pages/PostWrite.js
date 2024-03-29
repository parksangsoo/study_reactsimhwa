import React from 'react';
import { Grid, Text, Button, Image, Input } from '../elements';
import Upload from "../shared/Upload";

import {useSelector, useDispatch} from 'react-redux';
import {actionCreators as postActions} from '../redux/modules/post';
import {actionCreators as imageActions } from '../redux/modules/image';

const PostWrite = (props) => {

    const dispatch = useDispatch();
    const is_login = useSelector((state) => state.user.is_login);
    const preview = useSelector((state) => state.image.preview);
    const post_list = useSelector((state) => state.post.list);


    const post_id = props.match.params.id;
    const is_edit = post_id ? true : false;

    const {history} = props;

    let _post = is_edit? post_list.find((p) => p.id === post_id) : null;

    const [contents, setContents] = React.useState(_post ? _post.contents : "")
    const [layout, setLayout] = React.useState(_post ? _post.layout_type : "")

    const layouts = [
        { name: 'A'},
        { name: 'B'},
        { name: 'C'},
      ];


    React.useEffect(() => {
        if(is_edit && !_post){
            console.log('포스트 정보가 없어요!');
            history.goBack();

            return;
        }

        if(is_edit){
            dispatch(imageActions.setPreview(_post.image_url));
        }
        
    },[]);

    const changeContents = (e) => {
        setContents(e.target.value)
    }

    const changeLayoutType = (e) => {
        console.log(e.target.value)
        setLayout(e.target.value);
      };
    

    const editPost = () => {
        dispatch(postActions.editPostFB(post_id ,{contents: contents}))
    }

    const addPost = () => {
        dispatch(postActions.addPostFB(contents, layout));
        history.replace('/');
    }

    if(!is_login){
        return(
            <Grid margin="100px 0px" padding="16px">
                <Text size="32px" bold>앗 잠깐</Text>
                <Text size="16px">로그인 후에만 글을 쑬 수 있어여</Text>
                <Button _onClick={() => {
                    history.replace("/");
                }}>로그인 하러가기</Button>
            </Grid>
        )
    }

    return (
        <div>
            <Grid padding="16px">
                <Text size="36px" bold>
                    {is_edit ? "게시글 수정":"게시글 작성"}
                </Text>
                <Upload type="file"/>
            </Grid>
            <Grid>
                <Grid padding="16px">
                    <Text margin="0px" size="24px" bold>미리보기</Text>
                </Grid>

                <Image shape="rectangle" src={preview?preview:"https://via.placeholder.com/400x300"}/>
            </Grid>

            <Grid padding="16px">
                <Input value={contents} _onChange={changeContents} label="게시글 내용" placeholder="게시글 작성" multiLine/>
            
            </Grid>
            <Grid padding="16px" is_flex>
            {layouts.map((layout) => (
        <div key={layout.name}>
          <input
            id={layout.name}
            type="radio"
            name="color-selector"
            value={layout.name} onChange={changeLayoutType}
          />
          <label htmlFor={layout.name}>{layout.name}</label>
        </div>
      ))}
            </Grid>
            <Grid padding="16px">
            {is_edit ? (<Button text="게시글 수정" _onClick={editPost}>게시글 수정</Button>
            ):(<Button text="게시글 작성" _onClick={addPost}>게시글 작성</Button>)}
                
            </Grid>
        </div>
    );
};



export default PostWrite;