import {
    useState,
    createRef,
    useEffect,
    memo
} from 'react'
import "./index.scss"
import {
    TokenType,
    FormualToken,
    FormualOption,
    parseFormual
} from "util/formualPaser"
import {
    Button
} from "@mui/material"

interface PropsType{
    formual: string
    option: FormualOption
}

function FormualEditor(props: PropsType) {

    const editorCodeBox = createRef<HTMLDivElement>()

    const [formual,setFormual] = useState<string>(props.formual)

    const option: FormualOption = props.option

    const [formualTokens,setFormualTokens] = useState<Array<FormualToken>>(parseFormual(formual,option))

    const formualTOkensToHtml = (formualTokens: Array<FormualToken>) : string => {
        const _formualHtml = formualTokens.map(token => {
            return (
                `<span class="${token.type}" contenteditable="${token.type !== TokenType.FIELD}">${token.value}</span>`
            )
        })
        return _formualHtml.join("")
    }
    const [formualHtml,setFormualHtml] = useState<string>(formualTOkensToHtml(formualTokens))

    useEffect(() => {
        if (formualHtml !== editorCodeBox.current.innerHTML) {
            editorCodeBox.current.innerHTML = formualHtml;
        }
    })

    const editorCodeBoxInput = event => {
        const _formual: string = editorCodeBox.current.innerText
        if(_formual.replace(/[\s\r\n]/g,"") !== formual.replace(/[\s\r\n]/g,"")){
            setFormual(_formual)
            const _formualTokens: Array<FormualToken> = parseFormual(_formual,option)
            setFormualTokens(_formualTokens)
            const _formualHtml: string = formualTOkensToHtml(_formualTokens)
            setFormualHtml(_formualHtml)
        }
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
            <div ref={editorCodeBox} className="editor-code-box" suppressContentEditableWarning contentEditable={true} onInput={editorCodeBoxInput} dangerouslySetInnerHTML={{__html:formualHtml}}></div>
        </div>
    )
}

function areEqual(prevProps, nextProps) {
    debugger
    return false
}

export default memo(FormualEditor,areEqual)