import { createBrowserRouter } from "react-router-dom";
import {INVITACIONCASA_URL, LISTAINVITADOSCASA_URL, LISTAINVITADOSAREACOMUN_URL,INVITACIONAREACOMUN_URL } from "./Constants.jsx";
import InvitacionCasaList from "../pages/InvitacionCasa/InvitacionCasaListPage.jsx";
import InvitacionCasaForm from "../pages/InvitacionCasa/InvitacionCasaFormPage.jsx";
import InvitacionAreacomunList from "../pages/invitacionAreaComun/invitacionAreaComunListPage.jsx";
import InvitacionAreaComun from "../pages/invitacionAreaComun/invitacionAreaComunFromPage.jsx";
import HomePage from "../pages/login/HomePage.jsx";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage/>,
    },
    {
        path: INVITACIONCASA_URL,
        element: <InvitacionCasaForm/>,
    },
    {
        path: INVITACIONCASA_URL+"/:id",
        element: <InvitacionCasaForm/>,
    },
    {
        path: LISTAINVITADOSCASA_URL,
        element: <InvitacionCasaList/>,
    },
    {
        path: INVITACIONAREACOMUN_URL+"/:id",
        element: <InvitacionAreaComun/>,
    },
    {
        path: INVITACIONAREACOMUN_URL,
        element: <InvitacionAreaComun/>,
    },
    {
        path: LISTAINVITADOSAREACOMUN_URL,
        element: <InvitacionAreacomunList/>
    }
]);