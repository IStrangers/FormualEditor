import {
    createRef,
} from 'react'
import "./index.scss"
import {
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

    const option: FormualOption = props.option

    const editorCodeBox = createRef<HTMLDivElement>()

    const formualTOkensToHtml = (formualTokens: Array<FormualToken>) : string => {
        const _formualHtml = formualTokens.map(token => {
            return (
                `<span class="${token.type}" contenteditable="true">${token.value}</span>`
            )
        })
        return _formualHtml.join("")
    }

    const dirtyTagToSpanTag = children => {
        for(let i = 0; i < children.length; i++) {
            const child = children[i]
            if(child.nodeName !== "SPAN") {
                let newNode = document.createElement("span")
                newNode.textContent = child.textContent
                editorCodeBox.current.insertBefore(newNode,child)
                editorCodeBox.current.removeChild(child)
            }
        }
    }
    
    const inputHandler = (() => {
        let timer
        return (event) => {
            timer && clearTimeout(timer)
            setTimeout(() => {
                const children = editorCodeBox.current.children
                dirtyTagToSpanTag(children)
                const selection = document.getSelection()
                let { focusOffset,focusNode } = selection
                const replaceNode = focusNode.parentNode
                if(replaceNode.nodeName !== "SPAN") {
                    return
                }
                const _formual = focusNode.textContent
                const _formualTokens: Array<FormualToken> = parseFormual(_formual,option)
                const _formualHtml: string = formualTOkensToHtml(_formualTokens)
                let doc = new DOMParser().parseFromString(_formualHtml, 'text/html')
                let newNodes = doc.getElementsByTagName("span")
                if(newNodes.length > 0) {
                    while(newNodes.length > 0) {
                        const newNode = newNodes[0]
                        editorCodeBox.current.insertBefore(newNode,replaceNode)
                        if(newNode.childNodes.length <= 0) {
                            continue
                        }
                        const rangeTextNode = newNode.childNodes[0]
                        if(rangeTextNode.textContent.length < focusOffset) {
                            focusOffset -= rangeTextNode.textContent.length
                            continue
                        } else if(newNode.className === "field") {
                        }
                        const range = document.createRange()
                        range.setStart(rangeTextNode,focusOffset)
                        range.setEnd(rangeTextNode,focusOffset)
                        document.getSelection().removeAllRanges()
                        document.getSelection().addRange(range)
                    }
                    editorCodeBox.current.removeChild(replaceNode)
                }
            }, 300);
        }
    })()

    const editorCodeBoxInput = event => {
        if("insertCompositionText" === event.nativeEvent.inputType) {
            return
        }
        inputHandler(event)
    }

    const editorCodeBoxCompositionEnd = event => {
        inputHandler(event)
    }

    const copyFormual = () => {

    }

    return (
        <div className="formual-editor">
            <div className="editor-head">
                <Button variant="outlined" size="small" onClick={copyFormual}>复制</Button>
            </div>
            <div ref={editorCodeBox} className="editor-code-box" suppressContentEditableWarning 
                contentEditable={true} onInput={editorCodeBoxInput} onCompositionEnd={editorCodeBoxCompositionEnd}
                dangerouslySetInnerHTML={{__html:formualTOkensToHtml(parseFormual(props.formual,option))}}>
            </div>
        </div>
    )
}

export default FormualEditor