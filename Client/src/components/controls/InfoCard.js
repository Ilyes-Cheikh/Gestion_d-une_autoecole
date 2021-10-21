import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
// material
import { alpha, styled } from '@material-ui/core/styles';
import { Card, Typography } from '@material-ui/core';
// utils

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: "2px 2px 2px grey",
  textAlign: 'center',
  width:"220px",
  borderBottom: "4px solid var(--white)",
  borderRadius:'5%',
  height:"200px"
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: "#ecd06f",
  backgroundImage: `linear-gradient(135deg, ${alpha("#00a7ff", 0)} 0%, ${alpha(
    "#ffffff",
    0.24
  )} 100%)`
  
}));

// ----------------------------------------------------------------------


export default function InfoCard(props) {
  const { number, Iconim, numberof,color,numbersize} = props;
  return (
    <RootStyle style={{  background:`${color}` }}>
      <IconWrapperStyle>
        {Iconim}
      </IconWrapperStyle>
      <Typography style={{fontWeight: "900"}} variant={numbersize||"h3"}>{number}</Typography>
      <Typography style={{fontWeight: "900"}}variant={"h6"}  sx={{ opacity: 0.72 }}>
        {numberof}
      </Typography>
    </RootStyle>
  );
}
