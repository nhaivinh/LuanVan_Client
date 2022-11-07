import React from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Avatar } from '@mui/material';
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import { Rating } from '@mui/material';
import PropTypes from "prop-types";
import { styled } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import { Button, Tabs } from '@mui/material';
import { orange } from '@mui/material/colors';

const AntTabs = styled(Tabs)({
    '& .MuiTabs-indicator': {
        backgroundColor: orange[500],
        left: 0,
        paddingLeft: 10,
    },
});

const AntTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
    textTransform: 'none',
    minWidth: 0,
    fontSize: 16,
    [theme.breakpoints.up('sm')]: {
        minWidth: 0,
    },
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(1),
    color: theme.palette.getContrastText(orange[800]),
    '&:hover': {
        color: orange[700],
        opacity: 1,
    },
    '&.Mui-selected': {
        color: orange[400],
        fontWeight: theme.typography.fontWeightMedium,
    },
    '&.Mui-focusVisible': {
        backgroundColor: '#d1eaff',
    },
}));

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
        label: "Rất không hài lòng",
        text: <SentimentVeryDissatisfiedIcon color="error" />
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

    const [accountInfo, setAccountInfo] = React.useState([])


    React.useEffect(() => {
        axios.get(`https://localhost:7253/api/Login/getinfobyidCustomer/` + rate.id_customer)
            .then(res => {
                const Account = res.data;
                setAccountInfo(Account[0]);
            })
    }, [rate])

    return (
        <Box>     
            <Box
                style={{
                    display: 'flex',
                    margin: 5,
                    padding: 5,
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
                                    readOnly
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
        </Box>
    )
}