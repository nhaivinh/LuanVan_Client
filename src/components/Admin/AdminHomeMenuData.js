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
                path :'/admin/staff'
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
                path :'/admin/product'
            },
            {
                title : 'Quản Lý Đơn Hàng',
                path :'/admin/order'
            },
            {
                title : 'Quản Lý Nhập Hàng',
                path :'/admin/import'
            },
            {
                title : 'Quản Lý Thông Tin Khách Hàng',
                path :'/admin/customer'
            },
        ]
    },
]

export {QuyenChung,};