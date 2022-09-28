import React from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
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
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
function IncreaseCart({ idAccount, idProduct, handleResetPage }) {

    const [, dispatch] = React.useContext(SnackBarContext);
    const [posts, setPosts] = React.useState([]);
    const client = axios.create({
        baseURL: "https://localhost:7253/api/Cart/putpluscart"
    });
    function handleClick() {
        addPutPlus(idAccount, idProduct);
    }
    const addPutPlus = (idAccount , idProduct) => {
        client
            .put('', {
                "idAccount": idAccount,
                "idProduct": idProduct,
            })
            .then((response) => {
                setPosts([response.data, ...posts]);
                handleResetPage();
            })
            .catch((err) => {
                if (err.response) {
                    // The client was given an error response (5xx, 4xx)
                    console.log(err.response.data);
                    console.log(err.response.status);
                    console.log(err.response.headers);
                } else if (err.request) {
                    // The client never received a response, and the request was never left
                } else {
                    // Anything else
                }
            });
    };

    return (
        <IconButton onClick={handleClick}><AddOutlinedIcon/></IconButton>
    )
}

export default IncreaseCart