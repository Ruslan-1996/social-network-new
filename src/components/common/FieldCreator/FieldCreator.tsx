import s from './FieldCreator.module.css'
import cn from "classnames";

export const FieldCreator = ({input, meta, typeField: TypeField = 'input', ...props}: any) => {
    return (
        <div className={cn({[s.error]: meta.touched && meta.error}, s.wrapper)}>
            <TypeField {...input} {...props} className={s.input}/>
        </div>
    )
}

export const FieldCreatorCheckbox = ({input, meta, typeField: TypeField = 'input', ...props}: any) => {
  return (
      <TypeField {...input} {...props} className={s.checkbox}/>
  )
}
