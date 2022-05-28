import {useRef,useState} from 'react'
import "./index.scss"
import {TokenType,FormualToken,parseFormual} from "util/formualPaser"
import {
    Button
} from "@mui/material";

function FormualEditor(props) {

    const editorCodeBox = useRef(null)

    let [formual,setFormual] = useState<string>(props.formual);

    const [formualTokens,setFormualTokens] = useState<Array<FormualToken>>(parseFormual(formual))
    
    const editorCodeBoxInput = event => {
        const _formual = editorCodeBox.current.innerText;
        setFormual(_formual)
        setFormualTokens(parseFormual(_formual))
    }

    const copyFormual = () => {
        console.log(formual)
        console.log(formualTokens)
    }

    return (
        <div className="formual-editor">
            <div className="editor-head">      
                <Button variant="outlined" size="small" onClick={copyFormual}>复制</Button>
            </div>
            <div ref={editorCodeBox} className="editor-code-box" suppressContentEditableWarning contentEditable={true} onInput={editorCodeBoxInput}>
                {
                    formualTokens.map(token => {
                        return (
                            <span className={token.type} key={token.value} suppressContentEditableWarning contentEditable={token.type !== TokenType.FIELD}>
                                {token.value}
                            </span>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default FormualEditor