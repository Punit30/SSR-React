import { Box, Typography } from "@mui/material";

const CMETagFormat = (props) => {
    const { data, value } = props;
    const suggestedCMEs = data.suggestedCMEs || 0;

    let bgColor = "transparent";
    if (suggestedCMEs !== 0) {
        bgColor = value === suggestedCMEs ? "#28A745" : value === 0 ? "#EF4444" : "#F5B70B";
    }

    return (
        <Box
            className="f align-center justify-center b-r28"
            padding="4px 12px"
            sx={{ background: bgColor }}
        >
            <Typography
                fontWeight="500"
                fontSize="14px"
                lineHeight="20px"
                color={bgColor === "transparent" ? "#717385" : "#FFFFFF"}
            >
                {suggestedCMEs !== 0 ? `${value}/${suggestedCMEs}` : "-"}
            </Typography>
        </Box>
    );
};

export default CMETagFormat;