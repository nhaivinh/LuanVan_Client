import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useParams } from "react-router-dom";

function PageNotFound() {

    let params = useParams();

    return (
        <Box style={{ marginTop: 150 }}>
            <Container maxWidth="lg">
                Page Not Found
            </Container>
        </Box>

    )
}

export default PageNotFound