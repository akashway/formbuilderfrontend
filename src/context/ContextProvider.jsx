import React, { createContext, useState } from 'react'

const FormBuilderContext = createContext()

const ContextProvider = ({ children }) => {
    const [selectedFolder, setSelectedFolder] = useState(null)
    const [folderNames, setFolderNames] = useState([])
    const [fileNames, setFileNames] = useState([])

    return (
        <FormBuilderContext.Provider value={{ folderNames, setFolderNames, fileNames, setFileNames,selectedFolder, setSelectedFolder }}>
            {children}
        </FormBuilderContext.Provider>
    )
}

export { FormBuilderContext }
export default ContextProvider

