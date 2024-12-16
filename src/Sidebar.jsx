import React, { useState } from "react";
import './Sidebar.css';
import XIcon from '@mui/icons-material/X';
import SidebarOption from "./SidebarOption";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import Button from '@mui/material/Button';

function Sidebar() {
    const [route, setRoute] = useState("/");
    const [theme, setTheme] = useState("light"); // Состояние темы

    // Функция переключения темы
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    return (
        <div className={`sidebar ${theme}`}> {/* Применение темы */}
        
            {/* Twitter icons */}
            <XIcon className="sideBar_XIcon" />

               {/* Button -> Toggle Theme */}
               <Button
                variant="contained"
                className="sidebar__theme-toggle"
                onClick={toggleTheme}
                style={{ marginLeft: "50px" }}
            >
                {theme === "light" ? "Dark Theme" : "Light Theme"}
            </Button>

            <SidebarOption active={route === "/"} Icon={HomeRoundedIcon} text="Home" path="/" handleClick={setRoute} />
            <SidebarOption active={route === "/explore"} Icon={SearchRoundedIcon} text="Explore" path="/explore" handleClick={setRoute} />
            <SidebarOption active={route === "/notifications"} Icon={NotificationsNoneRoundedIcon} text="Notifications" path="/notifications" handleClick={setRoute} />
            <SidebarOption Icon={MailOutlineRoundedIcon} text="Messages" />
            <SidebarOption Icon={PersonOutlineRoundedIcon} text="Profile" />
            <SidebarOption Icon={XIcon} text="Theme" />
            <SidebarOption Icon={MoreHorizRoundedIcon} text="More" />

            {/* Button -> Tweet */}
            <Button variant="outlined" className="sidebar__tweet" fullWidth>
                Tweet
            </Button>

        
        </div>
    );
}

export default Sidebar;
