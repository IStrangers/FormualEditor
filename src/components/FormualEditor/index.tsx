import {useState} from 'react'
import "./index.scss"
import {TokenType,FormualToken,FormualOption,parseFormual} from "util/formualPaser"
import {
    Button
} from "@mui/material";

interface PropsType{
    formual: string
    option: FormualOption
}

function FormualEditor(props: PropsType) {

    const [formual,setFormual] = useState<string>(props.formual)

    const option: FormualOption = props.option

    const [formualTokens,setFormualTokens] = useState<Array<FormualToken>>(parseFormual(formual,option))

    const formualTOkensToHtml = (formualTokens: Array<FormualToken>) : string => {
        const _formualHtml = formualTokens.map(token => {
            return (
                `<span class=${token.type} contentEditable=${token.type !== TokenType.FIELD}>${token.value}</span>`
            )
        })
        return _formualHtml.join("")
    }
    const [formualHtml,setFormualHtml] = useState<string>(formualTOkensToHtml(formualTokens))

    const editorCodeBoxInput = event => {
        const _formual: string = event.target.innerText;
        setFormual(_formual)
        const _formualTokens: Array<FormualToken> = parseFormual(_formual,option)
        setFormualTokens(_formualTokens)
        const _formualHtml: string = formualTOkensToHtml(_formualTokens)
        setFormualHtml(_formualHtml)
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
            <div className="editor-code-box" suppressContentEditableWarning contentEditable={true} onInput={editorCodeBoxInput} dangerouslySetInnerHTML={{__html:formualHtml}}></div>
        </div>
    )
}

export default FormualEditor