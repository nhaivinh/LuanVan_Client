import React from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableHead from '@mui/material/TableHead';
import { useCookies } from "react-cookie";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';
import SnackBarContext from '../../SnackBar/SnackBarContext';
import { setMessage, setOpenSnackBar, setSeverity } from '../../SnackBar/SnackBarAction';

function DeleteCart({ idAccount, idProduct }) {

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
            });
        setPosts(
            posts.filter((post) => {
                return post.idAccount !== idAccount && post.idProduct !== idProduct;
            })
        );

    };

    return (
        <Button variant='contained'  onClick={handleClick}> Xóa </Button>
    )
}

export default DeleteCart