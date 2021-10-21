import React from 'react' ;
import Candidats from '../../components/Candidats/Candidats'
import Sidebar from '../../components/Sidebar/SideBarAdmin';

export default function Candidat_adminpage(){
    return(
        <>
        <Sidebar/>
        <Candidats/>
        </>
    )
}
