import React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import SnackBarContext from '../../SnackBar/SnackBarContext';
import { setMessage, setOpenSnackBar, setSeverity } from '../../SnackBar/SnackBarAction';
import { styled } from '@mui/material/styles';
import { orange } from '@mui/material/colors';

const ColorButtonOutline = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(orange[600]),
    fontWeight: 900,
    backgroundColor: 'white',
    border: '1px solid ' + orange[500],
    '&:hover': {
        border: '1px solid ' + orange[700],
    },
}));

function DeleteCart({ idAccount, idProduct, handleResetPage }) {

    const [, dispatch] = React.useContext(SnackBarContext);
    const [posts, setPosts] = React.useState([]);
    const client = axios.create({
        baseURL: "https://localhost:7253/api/Cart"
    });
    function handleClick() {
        deletePost(idAccount, idProduct);
    }
    const deletePost = (idAccount, idProduct) => {
        client.delete(`${idAccount}/${idProduct}`)
            .then((response) => {
                setPosts([response.data, ...posts]);
                dispatch(setOpenSnackBar());
                dispatch(setMessage(response.data.message));
                dispatch(setSeverity(response.data.severity));
                handleResetPage();
            });
        setPosts(
            posts.filter((post) => {
                return post.idAccount !== idAccount && post.idProduct !== idProduct;
            })
        );
    };

    return (
        <ColorButtonOutline variant='outlined'  onClick={handleClick}> Xóa </ColorButtonOutline>
    )
}

export default DeleteCart