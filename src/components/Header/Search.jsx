import React, {useState, ChangeEvent} from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch } from 'react-redux';
import {fetchPosts} from "../../redux/slices/posts";
//import todolistsActions from "../../redux/slices/posts"
import { postsActions } from '../../redux/slices/posts';


 function CustomizedInputBase() {
  let [itemTitle, setItemTitle] = useState("")
  const dispatch = useDispatch()

  function onChangeHandler(event) {
    const value = event.currentTarget.value
    dispatch(fetchPosts())
    if (value) {
      setItemTitle(event.currentTarget.value)
    } else {
      dispatch(fetchPosts())
      setItemTitle("")
    }
      }

const searchItemHandler = () => {
    debugger
    let taskTitleTrimmed = itemTitle.trim()
    dispatch(postsActions.searchPostAC(taskTitleTrimmed));
    
}

  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 250, height: 35}}
    >
      <InputBase
        sx={{ border: double, borderColor: 'white', ml: 1, flex: 1, color: 'dark'}}
        borderColor="white"
        placeholder=" Search . . ."
        inputProps={{ 'aria-label': 'search google maps' }}
        value={itemTitle}
        onChange={onChangeHandler}
      />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={searchItemHandler} disabled={!itemTitle}>
        <SearchIcon  />
      </IconButton>
    </Paper>
  );
}

export default CustomizedInputBase;