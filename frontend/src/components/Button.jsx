import React from "react";
import { Button } from "@mui/material"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Buton({ name, sx, onClick }) {
    return (
        <div>
            <Button sx={sx} onClick={onClick} variant="contained" color="success"><AccountCircleIcon />{name}</Button>
        </div>
    )
}

export default Buton;