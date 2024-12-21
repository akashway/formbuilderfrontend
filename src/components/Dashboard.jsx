import React, { useState, useContext, useEffect } from 'react'
import dashboardStyles from './dashboard.module.css'
import FormFolderModal from './FormFolderModal'
import { FormBuilderContext } from '../context/ContextProvider'
import {fetchFolderService} from '../services/folderService'


const Dashboard = () => {
    const [selectedFolder, setSelectedFolder] = useState([null])
    const [showFormFolderModal, setshowFormFolderModal] = useState(false)
    const [clickedButtonType, setClickedButtonType] = useState("")
    const {folderNames, setFolderNames, fileNames, setFileNames } = useContext(FormBuilderContext)

    const createFormModal = (event) => {
        setshowFormFolderModal(!showFormFolderModal)
        setClickedButtonType(event.target.id)
    }

    const clickSelectedFolderHandler = (folder) => {
        setSelectedFolder(folder)
    }


    useEffect(() => {
        const fetchFolder = async () => {
            const response = await fetchFolderService()
            if (response.status === 200) {
                const data = await response.json()
                console.log(data)
                setFolderNames(data)
            }
            else{
                console.log("Some error occured while fetching folders")
            }
        }
        fetchFolder()

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

                    <div>
                        {
                            folderNames.map((folder) => <button id={selectedFolder === folder.folderName ? dashboardStyles.folderIsSelected : ""} className={`${dashboardStyles["folder-button"]} ${dashboardStyles["folder-name-button"]}`} key={folder.folderName} onClick={() => clickSelectedFolderHandler(folder.folderName)}>{folder.folderName}</button>)
                        }
                    </div>
                </div>
                <div className={dashboardStyles['form-container']}>
                    <div>
                        <button onClick={createFormModal} id="form-button" className={dashboardStyles["create-form-button"]}> Create a typebot
                        </button>
                    </div>
                    <FormFolderModal show={showFormFolderModal} onShow={setshowFormFolderModal} buttonType={clickedButtonType} />

                    <div>
                        {
                            fileNames.map(file => <button key={file}>{file}</button>)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Dashboard
