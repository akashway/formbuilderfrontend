import React, { useState, useContext } from 'react'
import dashboardStyles from './dashboard.module.css'
import FormFolderModal from './FormFolderModal'
import { FormBuilderContext } from '../context/ContextProvider'


const Dashboard = () => {
    const [selectedFolder, setSelectedFolder] = useState([null])
    const [showFormFolderModal, setshowFormFolderModal] = useState(false)
    const [clickedButtonType, setClickedButtonType] = useState("")
    const {folderNames, fileNames } = useContext(FormBuilderContext)

    const createFormModal = (event) => {
        setshowFormFolderModal(!showFormFolderModal)
        setClickedButtonType(event.target.id)
    }

    const clickSelectedFolderHandler = (folder) => {
        setSelectedFolder(folder)
    }



    return (
        <div>
            <div>
                    <h1 style={{color:"white"}}>{`${localStorage.getItem("username")}'s workspace`}</h1>
            </div>
            
            <div>
                <div className={dashboardStyles['folder-container']}>
                    <div>
                        <button onClick={createFormModal} id="folder-button" className={dashboardStyles["folder-button"]}>Create a folder</button>
                    </div>

                    <div>
                        {
                            folderNames.map((folder) => <button id={selectedFolder === folder ? dashboardStyles.folderIsSelected : ""} className={`${dashboardStyles["folder-button"]} ${dashboardStyles["folder-name-button"]}`} key={folder} onClick={() => clickSelectedFolderHandler(folder)}>{folder}</button>)
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
