const QuyenChung = [
     
    {
        // Quản lý
        id:1,
        icon : 'fi fi-rr-layout-fluid',
        title : "Quản Trị Viên",
        // Chức năng
        child : [
            {
                title : 'Quản Lý Nhân Viên',
                path :'/admin/statistical'
            }, 
        ]
    },
    {
        // Nhân Viên
        id:2,
        icon : 'fi fi-rr-address-book',
        title : "Nhân Viên",
        // Chức năng
        child : [
            {
                title : 'Quản Lý Sản Phẩm',
                path :'/admin/productmanagement'
            },
            {
                title : 'Quản Lý Khách Hàng',
                path :''
            },
            {
                title : 'Quản Lý Nhập Hàng',
                path :''
            },
            {
                title : 'Quản Lý Đơn Hàng',
                path :''
            },
        ]
    },
]




export {QuyenChung,};