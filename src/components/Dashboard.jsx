import React, { useState, useContext, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import dashboardStyles from './dashboard.module.css'
import FormFolderModal from './FormFolderModal'
import { FormBuilderContext } from '../context/ContextProvider'
import { fetchFolderService } from '../services/folderService'
import { fetchFileOfSelectedFolder, fetchFileOfCurrentUser } from '../services/fileService'


const Dashboard = () => {
    const [showFormFolderModal, setshowFormFolderModal] = useState(false)
    const [clickedButtonType, setClickedButtonType] = useState("")
    const { folderNames, setFolderNames, fileNames, setFileNames, selectedFolder, setSelectedFolder } = useContext(FormBuilderContext)
    const divButtonGroupRef = useRef(null)
    const createTypeBotRef = useRef(null)

    const createFormModal = (event) => {

        setshowFormFolderModal(!showFormFolderModal)
        setClickedButtonType(event.target.id)
    }

    const clickSelectedFolderHandler = async (folder) => {
        setSelectedFolder(folder)
        const response = await fetchFileOfSelectedFolder(folder)
        if (response.status === 200) {
            const data = await response.json()
            setFileNames(data)
        }
        else {
            console.log("Some error occured while fetching folders")
        }
    }


    const handleOutsideClick = (event) => {
        if (!(divButtonGroupRef.current.contains(event.target)) && !(createTypeBotRef.current.contains(event.target))) {
            setSelectedFolder(null)
            fetchFile()

        }
    }

    const fetchFolder = async () => {
        const response = await fetchFolderService()
        if (response.status === 200) {
            const data = await response.json()
            setFolderNames(data)
        }
        else {
            console.log("Some error occured while fetching folders")
        }
    }


    const fetchFile = async () => {
        const response = await fetchFileOfCurrentUser()
        if (response.status === 200) {
            const data = await response.json()
            setFileNames(data)
        }
        else {
            console.log("Some error occured while fetching file")
        }
    }


    useEffect(() => {
        fetchFolder()
        fetchFile()
        document.addEventListener('click', handleOutsideClick)

        return () => document.removeEventListener('click', handleOutsideClick)

    }, [])


    return (
        <div>
            <div>
                <h1 style={{ color: "white" }}>{`${localStorage.getItem("username")}'s workspace`}</h1>
            </div>

            <div>
                <div className={dashboardStyles['folder-container']}>
                    <div>
                        <button onClick={createFormModal} id="folder-button" className={dashboardStyles["folder-button"]}>Create a folder</button>
                    </div>

                    <div ref={divButtonGroupRef}>
                        {
                            folderNames.map((folder) => <Link to={`/workspace/${folder.folderName}`} id={selectedFolder === folder.folderName ? dashboardStyles.folderIsSelected : ""} className={`${dashboardStyles["folder-button"]} ${dashboardStyles["folder-name-button"]}`} key={folder.folderName} onClick={() => clickSelectedFolderHandler(folder.folderName)}>{folder.folderName}</Link>)
                        }
                    </div>
                </div>
                <div className={dashboardStyles['form-container']} ref={createTypeBotRef}>
                    <div>
                        <button onClick={createFormModal} id="form-button" className={dashboardStyles["create-form-button"]}> Create a typebot
                        </button>
                    </div>
                    <FormFolderModal  show={showFormFolderModal} onShow={setshowFormFolderModal} buttonType={clickedButtonType} />

                    <div>
                        {
                            fileNames.map(file => <button key={file.fileName}>{file.fileName}</button>)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Dashboard
