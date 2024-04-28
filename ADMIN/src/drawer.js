import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Button from '@mui/material/Button';


const AppDrawer = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleDrawerToggle = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const handleDrawerItemClick = () => {
        setIsDrawerOpen(false);
    };

    return (
        <>
            <Button onClick={handleDrawerToggle}>Open Drawer</Button>
            <Drawer
                anchor={'left'}
                open={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                <List>
                    {['Home', 'About', 'Contact'].map((text, index) => (
                        <ListItem key={text} disablePadding onClick={handleDrawerItemClick}>
                            <ListItemButton component={Link} to={`/${text.toLowerCase()}`}>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </>
    );
};

export default AppDrawer;
