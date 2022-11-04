import React from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Avatar } from '@mui/material';
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import { useCookies } from "react-cookie";
import { Rating } from '@mui/material';
import PropTypes from "prop-types";
import { styled } from '@mui/material/styles';

function getFormattedDate(date) {
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    return day + '/' + month + '/' + year;
}

const customIcons = {
    1: {
        icon: <SentimentVeryDissatisfiedIcon color="error" />,
        color: "error",
        label: "Rất không hài lòng"
    },
    2: {
        icon: <SentimentDissatisfiedIcon color="error" />,
        color: "error",
        label: "Không hài lòng"
    },
    3: {
        icon: <SentimentSatisfiedIcon color="warning" />,
        color: "warning",
        label: "Bình Thường"
    },
    4: {
        icon: <SentimentSatisfiedAltIcon color="success" />,
        color: "warning",
        label: "Hài Lòng"
    },
    5: {
        icon: <SentimentVerySatisfiedIcon color="success" />,
        color: "warning",
        label: "Rất hài lòng"
    }
};

const StyledRating = styled(Rating)(({ theme }) => ({
    "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
        color: theme.palette.action.disabled
    }
}));

function IconContainer(props) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
    value: PropTypes.number.isRequired
};


export default function ShowRateProduct({ rate }) {

    const [cookies, setCookie, removeCookie] = useCookies(["user"]);

    const [accountInfo, setAccountInfo] = React.useState([])

    React.useEffect(() => {
        axios.get(`https://localhost:7253/api/Login/getinfobyid/` + cookies.Account)
            .then(res => {
                const Account = res.data;
                setAccountInfo(Account[0]);
            })
    }, [])

    return (
        <Box
            style={{
                display: 'flex',
                padding: 10,
                backgroundColor: 'white',
                borderRadius: 10
            }}
        >
            <Box
                style={{
                    display: 'flex',
                    marginTop: 5,
                }}
            >
                {accountInfo.picture_char !== null ?
                    <Avatar
                        id="basic-button"
                        src={accountInfo.picture_char}
                    >
                    </Avatar>
                    :
                    <Avatar
                        id="basic-button"
                        src={"data:image/png;base64, " + accountInfo.picture_link_avatar}
                    >
                    </Avatar>
                }
            </Box>
            <Box
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginLeft: 10,
                    width: '100%'
                }}>
                <Box
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '100%'
                    }}>
                    <Box
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                        }}>
                        <Typography><b>{accountInfo.name_customer}</b></Typography>
                        <Box
                            style={{
                                display: 'flex',
                                marginLeft: 20
                            }}>
                            <StyledRating
                                name="highlight-selected-only"
                                value={rate.level_rate}
                                IconContainerComponent={IconContainer}
                                getLabelText={(value) => customIcons[rate.level_rate].label}
                                highlightSelectedOnly
                            />
                        </Box>
                    </Box>
                    <Typography variant={'body2'}>{getFormattedDate(new Date(rate.date_rate))}</Typography>
                </Box>
                <Typography variant={'body1'}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        paddingTop: 10
                    }}>
                    {rate.content_rate}
                </Typography>
            </Box>
        </Box>
    )
}