import DropNCrop from '@synapsestudios/react-drop-n-crop';
import '@synapsestudios/react-drop-n-crop/lib/react-drop-n-crop.min.css';
import {useState} from "react";
import {changeUserPhoto} from "../../../store/profileReducer";
import s from "./CropeImage.module.css"

const CropeImage = (props) => {
  const {setEditMode} = props

  const [getImage, setGetImage] = useState(null)

  function dataURLtoFile(dataUrl, fileName) {
    let arr = dataUrl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], fileName, {type: mime});
  }

  let onChange = (value) => {
    setGetImage(value)
  }

  const onChangeAvatarMe = () => {
    if (getImage && !getImage.error) {
      const file = dataURLtoFile(getImage.result, getImage.filename);
      props.dispatch(changeUserPhoto(file))
    }
    setEditMode(false)
  }
  const onCancel = () => {
    setEditMode(false)
  }

  const instruction = (
    <div className={s.dropzoneInstructions}>
      <div>Drag-n-drop a file or click to add an image</div>
      <div>Accepted file
        types:.jpeg, .jpg, .png
      </div>
      <div>Max file
        size: 3MB
      </div>
    </div>
  )

  return (<div>
      <DropNCrop onChange={onChange} value={getImage} cropperOptions={{viewMode: 1, aspectRatio: 1}}
                 instructions={instruction} />
      <button onClick={onChangeAvatarMe} disabled={!getImage || getImage?.error} className={s.button}>change photo</button>
      <button onClick={onCancel} className={s.button}>cancel</button>
    </div>
  )
}

export default CropeImage