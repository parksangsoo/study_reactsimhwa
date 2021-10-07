import React from 'react';
import {Button} from "../elements";
import {useDispatch, useSelector} from 'react-redux';
import {actionCreators as imageActions} from '../redux/modules/image';

const Upload = () => {
    
    const fileInput = React.useRef();
    const dispatch = useDispatch();
    const selectFile = (e) => {

        console.log(fileInput.current.files[0]);

        const reader = new FileReader();
        const file = fileInput.current.files[0];

        reader.readAsDataURL(file);

        reader.onloadend = () => {
            console.log(reader.result);
            dispatch(imageActions.setPreview(reader.result));
            
        }
    }

    return (
        <React.Fragment>
            <input type="file" onChange={selectFile} ref={fileInput}/>
            
        </React.Fragment>
    )
};

export default Upload;