import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { styled } from '@mui/material/styles';
import { orange } from '@mui/material/colors';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Button, Stack, TextField, Typography, Rating, Box } from '@mui/material';
import PropTypes from "prop-types";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import SnackBarContext from '../../SnackBar/SnackBarContext';
import { setMessage, setOpenSnackBar, setSeverity } from '../../SnackBar/SnackBarAction';

const StyledRating = styled(Rating)(({ theme }) => ({
    "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
        color: theme.palette.action.disabled
    }
}));

const customIcons = {
    1: {
        icon: <SentimentVeryDissatisfiedIcon color="error" />,
        label: "Rất không hài lòng"
    },
    2: {
        icon: <SentimentDissatisfiedIcon color="error" />,
        label: "Không hài lòng"
    },
    3: {
        icon: <SentimentSatisfiedIcon color="warning" />,
        label: "Bình Thường"
    },
    4: {
        icon: <SentimentSatisfiedAltIcon color="success" />,
        label: "Hài Lòng"
    },
    5: {
        icon: <SentimentVerySatisfiedIcon color="success" />,
        label: "Rất hài lòng"
    }
};

function IconContainer(props) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
    value: PropTypes.number.isRequired
};

const ColorButtonContained = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(orange[500]),
    fontWeight: 900,
    backgroundColor: orange[500],
    '&:hover': {
        backgroundColor: orange[700],
    },
}));

const ColorButtonOutline = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(orange[600]),
    fontWeight: 900,
    backgroundColor: 'white',
    border: '1px solid ' + orange[500],
    '&:hover': {
        border: '1px solid ' + orange[700],
    },
}));

export default function RateProduct({ item, resetPage, handleResetPage }) {

    const [value, setValue] = React.useState(0);

    const [valueContent, setValueContent] = React.useState("");

    const [canRate, setCanRate] = React.useState(true);

    const [, dispatch] = React.useContext(SnackBarContext);

    const [posts, setPosts] = React.useState([]);

    React.useEffect(() => {
        axios.get(`https://localhost:7253/api/RateProduct/GetByIDProductAndIDOrder/` + item.id_product + '/' + item.id_order)
            .then(res => {
                const Rate = res.data;
                if (Rate.length !== 0) {
                    setValue(parseInt(Rate[0].level_rate))
                    setValueContent(Rate[0].content_rate)
                    setCanRate(false)
                }
            })
    }, [resetPage])

    function handleClickRate() {
        addPosts();
    }

    const client = axios.create({
        baseURL: "https://localhost:7253/api/RateProduct"
    });

    const addPosts = () => {
        client
            .post('', {
                "idProduct": item.id_product,
                "idCustomer": item.id_customer,
                "idOrder": item.id_order,
                "contentRate": valueContent,
                "levelRate": value,
            })
            .then((response) => {
                setPosts([response.data, ...posts]);
                dispatch(setOpenSnackBar());
                dispatch(setMessage(response.data.message));
                dispatch(setSeverity(response.data.severity));
                handleResetPage()
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
        <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell align="left" style={{ width: '10%' }}>
                {item.picture_product !== null ?
                    <img src={item.picture_product} alt="product" width='100%' />
                    :
                    <img src={"data:image/png;base64, " + item.picture_link_product} alt="product" width='100%' />
                }
            </TableCell>
            <TableCell component="th" scope="row" align="left">
                <Typography>{item.name_product}</Typography>
            </TableCell>
            <TableCell component="th" scope="row" align="left">
                {canRate === false ?
                    <StyledRating
                        disabled
                        name="highlight-selected-only"
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                        IconContainerComponent={IconContainer}
                        getLabelText={(value) => customIcons[value].label}
                        highlightSelectedOnly
                    />
                    :
                    <StyledRating
                        name="highlight-selected-only"
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                        IconContainerComponent={IconContainer}
                        getLabelText={(value) => customIcons[value].label}
                        highlightSelectedOnly
                    />
                }
                {
                    customIcons[value] !== undefined &&
                    <Box><Typography>{customIcons[value].label}</Typography></Box>
                }

            </TableCell>
            <TableCell component="th" scope="row" align="left">
                <TextField
                    id="outlined-multiline-static"
                    multiline
                    fullWidth
                    rows={2}
                    defaultValue={valueContent}
                    onChange={(event) => {
                        setValueContent(event.target.value)
                    }}
                />
            </TableCell>
            <TableCell component="th" scope="row" align="left">
                {canRate === false ?
                    <ColorButtonOutline disabled>Đánh Giá</ColorButtonOutline>
                    :
                    <ColorButtonContained onClick={handleClickRate}>Đánh Giá</ColorButtonContained>
                }

            </TableCell>
        </TableRow>
    )
}