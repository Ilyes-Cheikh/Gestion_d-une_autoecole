import React from "react";
import { createGenerateClassName } from "@material-ui/core/styles";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import PageHeader from "../../components/PageHeader";
import AssignmentRoundedIcon from "@material-ui/icons/AssignmentRounded";
import SolidGameCardDemo from "../../components/card";
import Sidebar from "../../components/Sidebar/SideBarAdmin";
import SidebarCandid from '../../components/Sidebar/SideBarCandid';
const muiBaseTheme = createMuiTheme();

const generateClassName = createGenerateClassName({
  dangerouslyUseGlobalCSS: true
});

export default function Starttest() {
  return (
        
      <MuiThemeProvider
        theme={createMuiTheme({
          typography: {
            useNextVariants: true
          },

        })}
      >
                <SidebarCandid />

          <PageHeader
                        title="Test du code"
                        icon={<AssignmentRoundedIcon fontSize="large" />}
                    />
        <SolidGameCardDemo  lien="/testcode/1"/>

      </MuiThemeProvider>
    
  );
}


