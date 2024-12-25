import React, { useState, useContext, useEffect, useRef, useNaviagte } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import dashboardStyles from './dashboard.module.css'
import FormFolderModal from './FormFolderModal'
import { FormBuilderContext } from '../context/ContextProvider'
import { fetchFolderService } from '../services/folderService'
import { fetchFileOfSelectedFolder, fetchFileOfCurrentUser } from '../services/fileService'
import getSharedWorkspace from '../services/workspaceService'
import ShareModal from './ShareModal'


const Dashboard = () => {
    const [showFormFolderModal, setshowFormFolderModal] = useState(false)
    const [showShareModal, setshowShareModal] = useState(false)
    const [clickedButtonType, setClickedButtonType] = useState("")
    const [sharedUsersInfo, setSharedUsersInfo] = useState([])
    const [dropdownValues, setDropdownValues] = useState("")
    const { folderNames, setFolderNames, fileNames, setFileNames, selectedFolder, setSelectedFolder } = useContext(FormBuilderContext)
    const divButtonGroupRef = useRef(null)
    const createTypeBotRef = useRef(null)
    const naviagte = useNavigate()


    const dropdownValuesChangeHandler = (event) => {
        setDropdownValues(event.target.value)
    }

    if (dropdownValues === 'logout') {
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        naviagte("/")
    }

    if (sharedUsersInfo.length > 0) {
        sharedUsersInfo.map((user) => {
            if (dropdownValues === user.ownerName) {
                setFileNames(user.files)
                setFolderNames(user.folder)
            }
        })  
    }
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
            naviagte("/workspace")
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

    const fetchSharedWorkspace = async () => {
        const response = await getSharedWorkspace()
        if (response.status === 200) {
            const data = await response.json()
            let sharedUsersInfo = data.workspaces.map(item => item)
            console.log(sharedUsersInfo)
            setSharedUsersInfo(sharedUsersInfo)
        }
        else {
            console.log("Some error occured while fetching other's workspace")
        }
    }

    if (dropdownValues === "myworkspace"){
        fetchFolder()
        fetchFile()
    }


    useEffect(() => {
        fetchFolder()
        fetchFile()
        fetchSharedWorkspace()
        document.addEventListener('click', handleOutsideClick)
        return () => document.removeEventListener('click', handleOutsideClick)

    },[])


    return (
        <div>
            <div style={{ display: "inline-flex", color: "white" }}>

                <select id="worspace-dropdown" value={dropdownValues} onChange={dropdownValuesChangeHandler}>
                    <option value="myworkspace">{`${localStorage.getItem("username")}'s workspace`}</option>
                    <option value="setting">Settings</option>
                    <option value="logout">Logout</option>
                    {sharedUsersInfo.length > 0 ?
                        sharedUsersInfo.map(object => <option key={object.ownerName} value={object.ownerName}>{`${object.ownerName}'s workspace`}</option>) : ""
                    }
                </select>
                <button onClick={() => setshowShareModal(!showShareModal)}>Share</button>
            </div>


            {showShareModal && <ShareModal />}

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
                    <FormFolderModal show={showFormFolderModal} onShow={setshowFormFolderModal} buttonType={clickedButtonType} />

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
