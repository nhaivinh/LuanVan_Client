import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './sidebar.scss';

const sidebarNavItems = [
    {
        icon: <i className='bx bx-home'></i>,
        display : 'Quản Lý Nhân Viên',
        to :'/admin/staff'
    },
    {
        icon: <i className='bx bx-home'></i>,
        display : 'Quản Lý Sản Phẩm',
        to :'/admin/product'
    },
    {
        icon: <i className='bx bx-home'></i>,
        display : 'Quản Lý Đơn Hàng',
        to :'/admin/order'
    },
    {
        icon: <i className='bx bx-home'></i>,
        display : 'Quản Lý Nhập Hàng',
        to :'/admin/import'
    },
    {
        icon: <i className='bx bx-home'></i>,
        display : 'Quản Lý Khách Hàng',
        to :'/admin/customer'
    },
    {
        icon: <i className='bx bx-home'></i>,
        display : 'Thống kê báo cáo',
        to :'/admin/customer'
    },
]

const Sidebar = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [stepHeight, setStepHeight] = useState(0);
    const sidebarRef = useRef();
    const indicatorRef = useRef();
    const location = useLocation();

    useEffect(() => {
        setTimeout(() => {
            const sidebarItem = sidebarRef.current.querySelector('.sidebar__menu__item');
            indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
            setStepHeight(sidebarItem.clientHeight);
        }, 100);
    }, []);

    // change active index
    useEffect(() => {
         const curPath = window.location.pathname;
        const activeItem = sidebarNavItems.findIndex(item => item.to === curPath) ;
        setActiveIndex(curPath.length === 0 ? 0 : activeItem);
    }, [location]);

    return <div className='sidebar'>
        <div className="sidebar__logo">
            Linh kiện máy tính
        </div>
        <div ref={sidebarRef} className="sidebar__menu">
            <div
                ref={indicatorRef}
                className="sidebar__menu__indicator"
                style={{
                    transform: `translateX(-50%) translateY(${activeIndex * stepHeight}px)`
                }}
            ></div>
            {
                sidebarNavItems.map((item, index) => (
                    <Link to={item.to} key={index}>
                        <div className={`sidebar__menu__item ${activeIndex === index ? 'active' : ''}`}>
                            <div className="sidebar__menu__item__icon">
                                {item.icon}
                            </div>
                            <div className="sidebar__menu__item__text">
                                {item.display}
                            </div>
                        </div>
                    </Link>
                ))
            }
        </div>
    </div>;
};

export default Sidebar;