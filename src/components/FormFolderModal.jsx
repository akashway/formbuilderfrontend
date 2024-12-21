import React, { useEffect, useState, useContext } from 'react'
import { FormBuilderContext } from '../context/ContextProvider'
import styles from './formFolderModal.module.css'
import { addFolder } from '../services/folderService'


const FormFolderModal = (props) => {
    const [inputData, setInputData] = useState("")
    const { setFolderNames, setFileNames } = useContext(FormBuilderContext)
    const { show, onShow, buttonType } = props

    let modalName = ""
    if (buttonType === 'folder-button') {
        modalName = "Folder"
    }

    if (buttonType === 'form-button') {
        modalName = "Form"
    }

    const formFolderNameSubmitHandler = async (event) => {
        event.preventDefault()
        let text = inputData
        let singleSpacedText = text.replace(/\s+/g, ' ').trim()
        if (!singleSpacedText) {
            alert("Input cannot be Empty or just whitespaces")
        }

        else {
            console.log("Note: If Input contains extra blankspace in between words we will remove")
            if (modalName === "Folder") {

                const folderData={
                    folderName:singleSpacedText
                }
                const response=await addFolder(folderData)
                let data=""

                if (response.status === 200) {
                    data = await response.json()
                    setFolderNames(prevData => {
                        return [...prevData, data]
                    })
                }

                else if(response.status === 400){
                    data = await response.json()
                    alert(data.message)
                }

                else{
                    console.log("Some error occured while adding folder")
                }

            }

            if (modalName === 'Form') {
                setFileNames(prevData => {
                    return [...prevData, singleSpacedText]
                })
            }

            onShow(false)
        }
    }
    useEffect(() => {
        if (!show) {
        }
        setInputData("")
    }, [show])

    if (!show) {
        return null
    }

    return (
        <form onSubmit={formFolderNameSubmitHandler} className={styles['form-folder-name']}>
            <h1>{`Create New ${modalName}`}</h1>
            <input
                type="text"
                name="formfolder"
                id="formfolder"
                placeholder={`Enter a ${modalName} name`}
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
            />

            <div>
                <button type="submit">Done</button>
                <button type="button" onClick={() => onShow(false)}>Cancel</button>
            </div>
        </form>
    )
}
export default FormFolderModal
