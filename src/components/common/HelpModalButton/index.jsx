"use client";
import { setHelpModal } from "@/app/GlobalObjects/store/reducers/Modal";
import { CssBaseline, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { IoHelpOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";

const useStyles = makeStyles({
  iconButton: {
    borderRadius: "50% !important",
    color: "#FFF !important",
    backgroundColor: "#814cd6 !important",
    minWidth: "32px",
    minHeight: "32px",
    maxWidth: "32px",
    maxHeight: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    lineHeight: "0px",
  },
});

function HelpModalButton() {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <>
      <CssBaseline />
      <IconButton
        id="help_modal"
        className={`${classes.iconButton} track_button`}
        onClick={() => dispatch(setHelpModal(true))}
      >
        <IoHelpOutline />
      </IconButton>
    </>
  );
}

export default HelpModalButton;
