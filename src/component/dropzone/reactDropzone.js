import React from 'react'
import Dropzone from 'react-dropzone'

const ReactDropzone = ({ handleDrop, preview }) => {
    return (
        <Dropzone onDrop={handleDrop}>
            {({ getRootProps, getInputProps }) => (
                <section className='drag-wrapper'>
                    <div {...getRootProps()} className='drag-card'>
                        <input {...getInputProps()} id={name} />
                        <img src='/assets/download-icon.svg' alt="download" />
                        <p className='drag-title'>Drag 'n' drop some files here, or click to select files</p>
                    </div>
                    {preview && (
                        <img alt="" src={preview} className='img-fluid thumb-drag' />
                    )}
                </section>
            )}
        </Dropzone>
    )
}

export default ReactDropzone;