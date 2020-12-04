import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import AddAPhotoOutlinedIcon from '@material-ui/icons/AddAPhotoOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import HideOnScroll from '../HideOnScroll';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const useStyles = makeStyles({
  title: { flexGrow: 1 },
});

export default function TopBar({ title, id, remove }) {
  const history = useHistory();
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <HideOnScroll>
        <AppBar position={'fixed'}>
          <Toolbar>
            {!title && (
              <Typography
                variant={'h6'}
                component={'h1'}
                className={classes.title}
              >
                The Gramf
              </Typography>
            )}
            {title && (
              <IconButton
                edge={'start'}
                color={'inherit'}
                aria-label={'go back'}
                onClick={onBack}
              >
                <ArrowBackOutlinedIcon />
              </IconButton>
            )}
            {title && (
              <Typography variant="h6" className={classes.title}>
                {title}
              </Typography>
            )}
            {title && (
              <IconButton
                color={'inherit'}
                edge={'end'}
                aria-label={'edit this picture'}
                onClick={() => history.push(`/places/edit/${id}`)}
              >
                <EditOutlinedIcon />
              </IconButton>
            )}
            {!title && (
              <IconButton
                color={'inherit'}
                edge={'end'}
                aria-label={'add a picture'}
                onClick={() => history.push(`/places/new`)}
              >
                <AddAPhotoOutlinedIcon />
              </IconButton>
            )}
            {title && (
              <div>
                <IconButton
                  onClick={handleMenu}
                  aria-haspopup={true}
                  aria-controls={'more-menu'}
                  color={'inherit'}
                  edge={'end'}
                  aria-label={'display more actions'}
                >
                  <MoreVertOutlinedIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleDelete}>Löschen</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </>
  );
  function onBack() {
    history.goBack();
  }
  function handleDelete() {
    remove(id);
    history.push('/overviewlist');
  }
}
