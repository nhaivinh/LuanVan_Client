import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useParams } from "react-router-dom";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
function PageNotFound() {

    let params = useParams();

    return (
        <Box style={{ marginTop: 150 }}>
            <Container maxWidth="lg">
                <Box
                    style={{ display: 'flex', height: 400 }}
                >
                    <ErrorOutlineIcon  sx={{ fontSize: 40 }}/>
                    &nbsp; 
                    <Typography variant='h4'><b> Page Not Found!</b></Typography> 
                </Box>

            </Container>
        </Box>

    )
}

export default PageNotFound