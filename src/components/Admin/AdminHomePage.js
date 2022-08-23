import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useParams } from "react-router-dom";

function AdminHomePage() {

    let params = useParams();

    return (
        <Box style={{}}>
            <Container maxWidth="lg">
                Admin Page
            </Container>
        </Box>

    )
}

export default AdminHomePage