import * as React from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import ProductImagesSlider from '../../Customers/Products/ProductImagesSlider'
import ProductManagementTechInfo from './ProductManagementTechInfo';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Thumbs } from 'swiper'
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SnackBarContext from '../../SnackBar/SnackBarContext';
import { setMessage, setOpenSnackBar, setSeverity } from '../../SnackBar/SnackBarAction';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1200,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};
const Info__style = {
    display: 'flex',
    width: 1000,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 10
};

export default function ProductManagementFormUpdateImage({ IDProduct, handleResetPage , resetPage}) {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => setOpen(false);

    const [, dispatch] = React.useContext(SnackBarContext);

    const [product, setProduct] = React.useState({})

    const [pictures, setPictures] = React.useState([])

    const [image, setImage] = React.useState(null);

    const [selectImage, setSelectImage] = React.useState(0);

    const [option, setOption] = React.useState(0);

    const [posts, setPosts] = React.useState([]);
    const client = axios.create({
        baseURL: "https://localhost:7253/api/Picture"
    });
    function handleClickDelete() {
        deletePost(selectImage);
    }
    const deletePost = (idPicture) => {
        client.delete(`${idPicture}`)
            .then((response) => {
                setPosts([response.data, ...posts]);
                dispatch(setOpenSnackBar());
                dispatch(setMessage(response.data.message));
                dispatch(setSeverity(response.data.severity));
                handleResetPage();
            });
        setPosts(
            posts.filter((post) => {
                return post.idPicture !== idPicture ;
            })
        );
    };

    const handleChangeSelectImage = (event) => {
        setSelectImage(event.target.value);
    };

    const handleChangeOption = (event) => {
        setOption(event.target.value);
    };

    const saveFile = (e) => {
        setImage(e.target.files)
    }

    function saveImage() {
        let reader = new FileReader();
        reader.readAsDataURL(image[0])

        switch (option) {
            case 0:
                reader.onload = (e) => {
                    fetch("https://localhost:7253/api/Picture", {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "idProduct": IDProduct,
                            "imageChar": e.target.result
                        })
                    })
                        .then(res => res.json())
                        .then((result) => {
                            dispatch(setOpenSnackBar());
                            dispatch(setMessage(result.message));
                            dispatch(setSeverity(result.severity));
                            handleResetPage()
                        })
                }
                break;
            case 1:
                reader.onload = (e) => {
                    fetch("https://localhost:7253/api/Picture/editImage", {
                        method: 'PUT',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "idPicture": selectImage,
                            "imageChar": e.target.result
                        })
                    })
                        .then(res => res.json())
                        .then((result) => {
                            dispatch(setOpenSnackBar());
                            dispatch(setMessage(result.message));
                            dispatch(setSeverity(result.severity));
                            handleResetPage()
                        })
                }
                break;
            default:
                break;
        }

    }

    React.useEffect(() => {
        axios.get(`https://localhost:7253/api/Product/getproductbyid/` + IDProduct)
            .then(res => {
                const Product = res.data;
                setProduct(Product[0]);
            })
        axios.get(`https://localhost:7253/api/Picture/getpicturebyid/` + IDProduct)
            .then(res => {
                const Pictures = res.data;
                setPictures(Pictures);
            })
    }, [resetPage])
    return (
        <div>
            <IconButton onClick={handleOpen} variant="text" color="success">
                <Tooltip title="Cập nhật ảnh">
                    <AddPhotoAlternateIcon
                        sx={{ color: 'var(--color7)' }}
                    />
                </Tooltip>
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                {product !== {} &&
                    <Box sx={style}>
                        <Stack direction="row" spacing={1} alignItems="flex-end" justifyContent="space-between" marginBottom={2}>
                            <Typography variant="h4">
                                Cập nhật hình ảnh cho sản phẩm
                            </Typography>
                            <IconButton variant="contained" onClick={handleClose}><CloseIcon /></IconButton>
                        </Stack>
                        <Box sx={Info__style}>
                            <Typography variant="h6" paddingBottom={2}>
                                Thông số sản phẩm:
                            </Typography>
                            <Grid container spacing={2} >
                                <Grid item xs={12}>
                                    <Typography variant="body1" style={{ paddingBottom: 20 }}>
                                        Mã sản phẩm: {product.id_product}
                                    </Typography>
                                    <Typography variant="body1" style={{ paddingBottom: 20 }}>
                                        Tên sản phẩm: {product.name_product}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Box>
                                        {pictures.length !== 0 ?
                                            <>
                                                <Typography variant="h6" paddingBottom={2}>
                                                    Hình ảnh sản phẩm:
                                                </Typography>
                                                <ProductImagesSlider images={pictures} />
                                            </>
                                            :
                                            <>
                                                <Typography variant="body1" paddingBottom={2}>
                                                    Sản phẩm chưa có hình ảnh
                                                </Typography>
                                            </>
                                        }

                                    </Box>
                                </Grid>
                                <Grid item xs={4}>
                                    <Box sx={{ minWidth: 120 }}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Phương thức</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={option}
                                                label="Phương thức"
                                                onChange={handleChangeOption}
                                            >
                                                <MenuItem value={0}>Thêm ảnh mới</MenuItem>
                                                <MenuItem value={1}>Chỉnh sửa ảnh cũ</MenuItem>
                                                <MenuItem value={2}>Xoá ảnh</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                    {option !== 0 &&
                                        <>
                                            <Box sx={{ minWidth: 120, paddingTop: 2 }}>
                                                <FormControl fullWidth>
                                                    <InputLabel id="demo-simple-select-label">Chọn ảnh</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={selectImage}
                                                        label="Chọn ảnh"
                                                        onChange={handleChangeSelectImage}
                                                    >
                                                        {pictures.map(function (picture) {
                                                            return (
                                                                <MenuItem key={picture.id_picture} value={picture.id_picture}>Ảnh {picture.id_picture}</MenuItem>
                                                            )
                                                        })}
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                            {selectImage !== 0 &&
                                                <>
                                                    {
                                                        pictures.find(element => element.id_picture === selectImage).picture_product !== null ?
                                                            <img src={pictures.find(element => element.id_picture === selectImage).picture_product} alt="product" width={"100%"} />
                                                            :
                                                            <img src={"data:image/png;base64, " + pictures.find(element => element.id_picture === selectImage).picture_link_product} alt="product" width={"100%"} />
                                                    }
                                                </>
                                            }
                                        </>
                                    }
                                </Grid>

                                <Grid item xs={5}>
                                    {option !== 2 ?
                                        <Box
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                flexDirection: 'row',
                                                paddingBottom: 30,
                                                paddingTop: 10
                                            }}>
                                            <Box
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    width: 250,
                                                    paddingLeft: 10
                                                }}
                                            >
                                                <Typography variant="body1" paddingBottom={2}>
                                                    Ảnh cập nhật
                                                </Typography>
                                                <div>
                                                    {image !== null &&
                                                        <img alt="not found" width={"100%"} src={window.URL.createObjectURL(new Blob(image, { type: "image" }))} />
                                                    }
                                                </div>
                                            </Box>

                                            <Box
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    width: 250,
                                                    paddingLeft: 10
                                                }}
                                            >
                                                <input type="file" onChange={saveFile} />
                                                <Button variant='contained' onClick={saveImage}>Cập nhật ảnh sản phẩm</Button>
                                            </Box>
                                        </Box >
                                        :
                                        <Button variant='contained' onClick={handleClickDelete}>Xoá ảnh sản phẩm</Button>
                                    }

                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                }
            </Modal>
        </div >
    );
}